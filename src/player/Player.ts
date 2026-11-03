/**
 * The character controller.
 *
 * Four movement states — ground, air, swim and climb — share one collision
 * routine. Carrying is a modifier rather than a state, so the character can
 * walk, run and jump while holding something.
 *
 * The feel targets are momentum over instant response, an analogue range from
 * a gentle walk to a full run, a jump whose height answers how long the button
 * is held, and a turn that widens as speed rises.
 */

import { Group, MathUtils, Object3D, Vector3 } from 'three';
import { Capsule } from 'three/addons/math/Capsule.js';
import type { CollisionWorld, ClimbSurface } from '../physics/CollisionWorld.ts';
import type { Input } from '../input/Input.ts';
import type { Carryable } from '../world/Carryable.ts';
import { MAX_WALKABLE_NORMAL_Y, TUNING } from './Tuning.ts';
import { CHARACTER_HEIGHT, CHARACTER_RADIUS, createCharacterRig, type CharacterRig } from './PlayerModel.ts';
import { animateCharacter, type AnimationInputs } from './PlayerAnimation.ts';

export type MovementState = 'ground' | 'air' | 'swim' | 'climb';

export interface PlayerEvents {
  onSplash?: (position: Vector3, strength: number) => void;
  onLand?: (position: Vector3, strength: number) => void;
  onFootstep?: (position: Vector3) => void;
  onRespawn?: () => void;
}

const UP = new Vector3(0, 1, 0);

export class Player {
  readonly object: Group;
  readonly rig: CharacterRig;
  readonly velocity = new Vector3();

  state: MovementState = 'air';
  onGround = false;
  /** Surface normal of the ground the character is standing on. */
  readonly groundNormal = new Vector3(0, 1, 0);

  /** Facing angle in radians, where 0 looks down +Z. */
  facing = 0;

  carried: Carryable | null = null;

  private readonly capsule: Capsule;
  private readonly world: CollisionWorld;
  private readonly events: PlayerEvents;

  private coyoteTimer = 0;
  private jumpBufferTimer = 0;
  private jumpHeld = false;
  private landingTimer = 0;
  private skidding = false;
  private strokeTimer = 0;
  private climbSurface: ClimbSurface | null = null;
  private climbAngle = 0;
  private climbRegrabTimer = 0;
  private submerged = false;
  private atSurface = false;
  private footstepPhase = 0;
  private animationTime = 0;

  private readonly lastSafePosition = new Vector3();
  private safePositionTimer = 0;

  private readonly scratchA = new Vector3();
  private readonly scratchB = new Vector3();
  private readonly scratchMove = new Vector3();
  private readonly scratchSide = new Vector3();

  constructor(world: CollisionWorld, spawn: Vector3, events: PlayerEvents = {}) {
    this.world = world;
    this.events = events;

    this.rig = createCharacterRig();
    this.object = this.rig.root;
    this.object.position.copy(spawn);

    this.capsule = new Capsule(
      new Vector3(spawn.x, spawn.y + CHARACTER_RADIUS, spawn.z),
      new Vector3(spawn.x, spawn.y + CHARACTER_HEIGHT - CHARACTER_RADIUS, spawn.z),
      CHARACTER_RADIUS,
    );
    this.lastSafePosition.copy(spawn);
  }

  get position(): Vector3 {
    return this.object.position;
  }

  /** Eye-height point, which the camera aims at. */
  getFocusPoint(target: Vector3): Vector3 {
    return target.copy(this.object.position).addScaledVector(UP, CHARACTER_HEIGHT * 0.78);
  }

  get speed(): number {
    return Math.hypot(this.velocity.x, this.velocity.z);
  }

  get stateName(): string {
    if (this.state === 'swim') return this.atSurface ? 'swim-surface' : 'swim-under';
    if (this.state === 'climb') return 'climb';
    if (this.state === 'air') return this.velocity.y > 0.5 ? 'jump' : 'fall';
    if (this.skidding) return 'skid';
    if (this.speed > TUNING.walkSpeed + 0.6) return 'run';
    if (this.speed > 0.25) return 'walk';
    return 'idle';
  }

  update(delta: number, input: Input, cameraYaw: number): void {
    this.animationTime += delta;
    if (this.climbRegrabTimer > 0) this.climbRegrabTimer -= delta;
    if (this.strokeTimer > 0) this.strokeTimer -= delta;
    if (this.landingTimer > 0) this.landingTimer -= delta;

    // Movement intent, rotated from stick space into camera space. Pushing up
    // on the stick always means "away from the camera".
    const wish = this.scratchA.set(input.move.x, 0, input.move.y);
    const strength = Math.min(1, wish.length());
    if (strength > 0.001) {
      wish.normalize().applyAxisAngle(UP, cameraYaw);
    } else {
      wish.set(0, 0, 0);
    }

    this.updateJumpTimers(delta, input);
    this.updateWaterState();

    switch (this.state) {
      case 'climb':
        this.updateClimb(delta, input, wish, strength);
        break;
      case 'swim':
        this.updateSwim(delta, input, wish, strength);
        break;
      case 'ground':
        this.updateGround(delta, wish, strength);
        break;
      default:
        this.updateAir(delta, input, wish, strength);
        break;
    }

    if (this.state !== 'climb') this.integrate(delta);

    this.updateCarry(delta, input);
    this.updateRecovery(delta);
    this.syncModel(delta, strength);
  }

  // -------------------------------------------------------------------------
  // States
  // -------------------------------------------------------------------------

  private updateGround(delta: number, wish: Vector3, strength: number): void {
    const horizontal = this.scratchB.set(this.velocity.x, 0, this.velocity.z);
    const speed = horizontal.length();

    if (strength > 0.001) {
      const targetSpeed = this.targetSpeedFor(strength);

      // A hard reversal at speed is a skid rather than a turn: the character
      // sheds speed first, then accepts the new direction.
      const alignment =
        speed > 0.01 ? wish.dot(this.scratchSide.copy(horizontal).divideScalar(speed)) : 1;
      this.skidding = speed > TUNING.skidMinSpeed && alignment < TUNING.skidDotThreshold;

      if (this.skidding) {
        const newSpeed = Math.max(0, speed - TUNING.skidDeceleration * delta);
        if (speed > 0.001) horizontal.multiplyScalar(newSpeed / speed);
      } else {
        this.turnToward(wish, delta, speed);
        const forward = this.forwardVector(this.scratchMove);

        // Speed is tracked along the facing direction. Anything sideways is
        // momentum left over from a turn, and is bled off separately so the
        // character arcs into the new heading instead of sliding sideways.
        const along = horizontal.dot(forward);
        const newAlong =
          along < targetSpeed
            ? Math.min(targetSpeed, along + TUNING.acceleration * delta)
            : Math.max(targetSpeed, along - TUNING.deceleration * delta);

        const sideways = this.scratchSide
          .copy(horizontal)
          .addScaledVector(forward, -along)
          .multiplyScalar(Math.max(0, 1 - TUNING.deceleration * 1.8 * delta));

        horizontal.copy(forward).multiplyScalar(newAlong).add(sideways);
      }
    } else {
      this.skidding = false;
      const decel = TUNING.deceleration * delta;
      const newSpeed = Math.max(0, speed - decel);
      if (speed > 0.001) horizontal.multiplyScalar(newSpeed / speed);
    }

    this.velocity.x = horizontal.x;
    this.velocity.z = horizontal.z;

    // Hold the character against the ground so slopes do not launch them.
    if (this.velocity.y < 0) this.velocity.y = -2;

    if (this.jumpBufferTimer > 0 && this.coyoteTimer > 0) {
      this.performJump();
      return;
    }

    // Walking into a tree trunk grabs it, which is how the move is found
    // without being told about it.
    this.tryGrabClimbable(wish, strength);
  }

  private updateAir(delta: number, input: Input, wish: Vector3, strength: number): void {
    this.skidding = false;

    const gravity =
      this.velocity.y > 0 ? TUNING.gravity : TUNING.gravity * TUNING.fallGravityMultiplier;
    this.velocity.y -= gravity * delta;
    this.velocity.y = Math.max(this.velocity.y, -TUNING.terminalVelocity);

    // Releasing the button early cuts the rise, which is what makes jump
    // height answer how long the button is held.
    if (this.jumpHeld && !input.isDown('jump') && this.velocity.y > 0) {
      this.velocity.y *= TUNING.jumpCutMultiplier;
      this.jumpHeld = false;
    }

    if (strength > 0.001) {
      this.turnToward(wish, delta, 0, TUNING.airTurnRate);
      const target = this.targetSpeedFor(strength);
      const horizontal = this.scratchB.set(this.velocity.x, 0, this.velocity.z);
      horizontal.addScaledVector(wish, TUNING.airAcceleration * delta);
      if (horizontal.length() > Math.max(target, this.speed)) {
        horizontal.setLength(Math.max(target, this.speed));
      }
      this.velocity.x = horizontal.x;
      this.velocity.z = horizontal.z;
    } else {
      const drag = Math.max(0, 1 - TUNING.airDeceleration * delta);
      this.velocity.x *= drag;
      this.velocity.z *= drag;
    }

    // A jump buffered just before landing fires the moment the feet touch.
    if (this.jumpBufferTimer > 0 && this.coyoteTimer > 0) this.performJump();

    this.tryGrabClimbable(wish, strength);
  }

  private updateSwim(delta: number, input: Input, wish: Vector3, strength: number): void {
    this.skidding = false;
    const water = this.world.waterAt(this.capsuleCentre(this.scratchB));
    if (!water) {
      this.state = 'air';
      return;
    }

    // The character floats with head and shoulders clear of the water.
    const floatLine = water.surfaceY - CHARACTER_HEIGHT * TUNING.floatSubmersion;
    const toFloatLine = floatLine - this.object.position.y;
    this.atSurface = Math.abs(toFloatLine) < 0.35;

    const diving = input.isDown('dive');
    if (diving) {
      this.velocity.y -= TUNING.diveAcceleration * delta;
    } else if (toFloatLine > 0) {
      // Rising: stronger the deeper the character is, capped so a deep dive
      // does not fire them out of the water.
      this.velocity.y += Math.min(TUNING.buoyancy, toFloatLine * 7) * delta;
    } else {
      // Settling back down onto the float line.
      this.velocity.y += Math.max(-TUNING.swimGravity, toFloatLine * 5) * delta;
    }

    // Strokes give the swimming its rhythm: a press is a push, not a hold.
    if (input.wasPressed('jump') && this.strokeTimer <= 0) {
      this.strokeTimer = TUNING.strokeCooldown;
      const forward = this.forwardVector(this.scratchMove);
      const lift = this.atSurface ? 0.25 : 0.55;
      this.velocity.addScaledVector(forward, TUNING.strokeImpulse);
      this.velocity.y += TUNING.strokeImpulse * lift;
    }

    if (strength > 0.001) {
      this.turnToward(wish, delta, 0, 5.5);
      this.velocity.addScaledVector(wish, TUNING.swimAcceleration * strength * delta);
    }

    const drag = Math.max(0, 1 - TUNING.swimDrag * delta);
    this.velocity.multiplyScalar(drag);
    const horizontalSpeed = Math.hypot(this.velocity.x, this.velocity.z);
    if (horizontalSpeed > TUNING.swimSpeed) {
      const scale = TUNING.swimSpeed / horizontalSpeed;
      this.velocity.x *= scale;
      this.velocity.z *= scale;
    }

    this.tryGrabClimbable(wish, strength);
  }

  private updateClimb(delta: number, input: Input, wish: Vector3, strength: number): void {
    const surface = this.climbSurface;
    if (!surface) {
      this.state = 'air';
      return;
    }

    this.velocity.set(0, 0, 0);

    // Forward and back on the stick climb; left and right circle the post.
    const forwardAmount = -input.move.y;
    const sideAmount = input.move.x;

    this.object.position.y += forwardAmount * TUNING.climbSpeed * delta;
    this.climbAngle += sideAmount * TUNING.climbRotateSpeed * delta;

    const minY = surface.base.y - 0.1;
    const maxY = surface.base.y + surface.height - CHARACTER_HEIGHT * 0.55;
    this.object.position.y = MathUtils.clamp(this.object.position.y, minY, maxY);

    // Hug the post at a fixed distance, facing inward.
    const holdRadius = surface.radius + CHARACTER_RADIUS * 1.05;
    this.object.position.x = surface.base.x + Math.sin(this.climbAngle) * holdRadius;
    this.object.position.z = surface.base.z + Math.cos(this.climbAngle) * holdRadius;
    this.facing = this.climbAngle + Math.PI;

    this.syncCapsuleFromPosition();

    // Reaching the top pulls the character up onto it rather than sticking.
    if (this.object.position.y >= maxY - 0.01 && forwardAmount > 0.4) {
      this.releaseClimb();
      this.velocity.y = TUNING.climbDismountLift * 0.8;
      const outward = this.scratchB
        .set(Math.sin(this.climbAngle), 0, Math.cos(this.climbAngle))
        .multiplyScalar(-2.4);
      this.velocity.x = outward.x;
      this.velocity.z = outward.z;
      return;
    }

    if (input.wasPressed('jump')) {
      this.releaseClimb();
      const away = this.scratchB
        .set(Math.sin(this.climbAngle), 0, Math.cos(this.climbAngle))
        .multiplyScalar(TUNING.climbDismountPush);
      this.velocity.set(away.x, TUNING.climbDismountLift, away.z);
      this.facing = Math.atan2(away.x, away.z);
      this.jumpHeld = true;
      return;
    }

    if (strength > 0.001 && wish.lengthSq() > 0) {
      // Pushing directly away from the post lets go.
      const outward = this.scratchB.set(
        this.object.position.x - surface.base.x,
        0,
        this.object.position.z - surface.base.z,
      );
      if (outward.lengthSq() > 0.0001 && wish.dot(outward.normalize()) > 0.82) {
        this.releaseClimb();
      }
    }
  }

  // -------------------------------------------------------------------------
  // Shared movement
  // -------------------------------------------------------------------------

  private integrate(delta: number): void {
    // Sub-step so fast movement cannot pass through thin geometry.
    const distance = this.velocity.length() * delta;
    const steps = Math.min(6, Math.max(1, Math.ceil(distance / (CHARACTER_RADIUS * 0.75))));
    const stepDelta = delta / steps;

    const wasOnGround = this.onGround;
    const previousFallSpeed = this.velocity.y;

    for (let step = 0; step < steps; step += 1) {
      this.capsule.translate(this.scratchMove.copy(this.velocity).multiplyScalar(stepDelta));
      this.resolveCollisions();
    }

    if (this.onGround) {
      if (!wasOnGround && previousFallSpeed < -4) {
        this.landingTimer = 0.17;
        this.events.onLand?.(this.object.position, Math.min(1, -previousFallSpeed / 22));
      }
      this.coyoteTimer = TUNING.coyoteTime;
      if (this.state === 'air') this.state = 'ground';
    } else if (wasOnGround && this.state === 'ground') {
      // Walking down a slope should follow it rather than launching off it.
      if (this.velocity.y <= 0.1 && this.snapToGround()) {
        this.coyoteTimer = TUNING.coyoteTime;
      } else {
        this.state = 'air';
      }
    } else if (this.state === 'ground') {
      this.state = 'air';
    }

    this.syncPositionFromCapsule();
  }

  private resolveCollisions(): void {
    this.onGround = false;

    for (let iteration = 0; iteration < 4; iteration += 1) {
      const hit = this.world.capsuleIntersect(this.capsule);
      if (!hit) break;

      this.capsule.translate(this.scratchMove.copy(hit.normal).multiplyScalar(hit.depth));

      if (hit.normal.y >= MAX_WALKABLE_NORMAL_Y) {
        this.onGround = true;
        this.groundNormal.copy(hit.normal);
        if (this.velocity.y < 0) this.velocity.y = 0;
      } else {
        // Walls and steep slopes remove only the velocity pushing into them,
        // so the character slides along rather than sticking.
        const into = this.velocity.dot(hit.normal);
        if (into < 0) this.velocity.addScaledVector(hit.normal, -into);
      }
    }
  }

  /** Probes a short distance downward; returns true if the feet found ground. */
  private snapToGround(): boolean {
    const probe = this.scratchMove.set(0, -TUNING.groundSnapDistance, 0);
    this.capsule.translate(probe);
    const hit = this.world.capsuleIntersect(this.capsule);
    if (hit && hit.normal.y >= MAX_WALKABLE_NORMAL_Y) {
      this.capsule.translate(this.scratchB.copy(hit.normal).multiplyScalar(hit.depth));
      this.onGround = true;
      this.groundNormal.copy(hit.normal);
      this.velocity.y = 0;
      return true;
    }
    this.capsule.translate(probe.multiplyScalar(-1));
    return false;
  }

  private updateJumpTimers(delta: number, input: Input): void {
    if (this.coyoteTimer > 0) this.coyoteTimer -= delta;
    if (this.jumpBufferTimer > 0) this.jumpBufferTimer -= delta;
    if (input.wasPressed('jump')) this.jumpBufferTimer = TUNING.jumpBufferTime;
  }

  private performJump(): void {
    this.velocity.y = TUNING.jumpVelocity;
    this.jumpHeld = true;
    this.jumpBufferTimer = 0;
    this.coyoteTimer = 0;
    this.onGround = false;
    this.state = 'air';
  }

  private updateWaterState(): void {
    if (this.state === 'climb') return;

    const wasSwimming = this.state === 'swim';

    // Entering takes the midpoint going under; leaving takes the feet coming
    // clear. Without that gap, treading water with the head out would flip
    // between swimming and falling on alternate frames.
    const probeHeight = wasSwimming ? CHARACTER_HEIGHT * 0.12 : CHARACTER_HEIGHT * 0.5;
    const probe = this.scratchB.set(
      this.object.position.x,
      this.object.position.y + probeHeight,
      this.object.position.z,
    );
    const water = this.world.waterAt(probe);

    if (water && !wasSwimming) {
      const entrySpeed = -this.velocity.y;
      this.state = 'swim';
      this.submerged = true;
      // Entering water kills most of the fall, so a long drop does not
      // continue to the bottom of the moat.
      this.velocity.y *= 0.22;
      this.velocity.x *= 0.65;
      this.velocity.z *= 0.65;
      if (entrySpeed > TUNING.splashSpeed) {
        this.events.onSplash?.(
          new Vector3(this.object.position.x, water.surfaceY, this.object.position.z),
          Math.min(1, entrySpeed / 18),
        );
      }
    } else if (!water && wasSwimming) {
      this.state = this.onGround ? 'ground' : 'air';
      this.submerged = false;
      this.atSurface = false;
    }
  }

  private tryGrabClimbable(wish: Vector3, strength: number): void {
    if (this.climbRegrabTimer > 0 || strength < 0.3) return;

    const surface = this.world.climbableAt(this.object.position, CHARACTER_HEIGHT);
    if (!surface) return;

    // Only grab when actually pushing toward the post.
    const toward = this.scratchB
      .set(surface.base.x - this.object.position.x, 0, surface.base.z - this.object.position.z);
    if (toward.lengthSq() < 0.0001) return;
    if (wish.dot(toward.normalize()) < 0.45) return;

    this.climbSurface = surface;
    this.climbAngle = Math.atan2(
      this.object.position.x - surface.base.x,
      this.object.position.z - surface.base.z,
    );
    this.state = 'climb';
    this.velocity.set(0, 0, 0);
    this.skidding = false;
  }

  private releaseClimb(): void {
    this.climbSurface = null;
    this.climbRegrabTimer = TUNING.climbRegrabDelay;
    this.state = 'air';
  }

  // -------------------------------------------------------------------------
  // Carrying
  // -------------------------------------------------------------------------

  /** Objects the player may pick up; set by the world each frame. */
  carryables: Carryable[] = [];

  private updateCarry(_delta: number, input: Input): void {
    if (!input.wasPressed('grab')) return;

    if (this.carried) {
      this.throwCarried();
      return;
    }
    if (this.state === 'climb') return;

    let best: Carryable | null = null;
    let bestScore = Infinity;
    const forward = this.forwardVector(this.scratchMove);

    for (const candidate of this.carryables) {
      if (candidate.held || candidate.pickupCooldown > 0) continue;
      const offset = this.scratchB.copy(candidate.position).sub(this.object.position);
      const vertical = Math.abs(offset.y);
      offset.y = 0;
      const distance = offset.length();
      if (distance > TUNING.carryReach + candidate.radius || vertical > CHARACTER_HEIGHT) continue;
      // Prefer what is in front of the character over what is merely nearby.
      const facingBonus = distance > 0.001 ? forward.dot(offset.clone().normalize()) : 1;
      if (facingBonus < -0.1) continue;
      const score = distance - facingBonus;
      if (score < bestScore) {
        bestScore = score;
        best = candidate;
      }
    }

    if (best) {
      best.pickUp();
      this.carried = best;
      this.rig.carryAnchor.add(best.object3d);
      best.object3d.position.set(0, 0, 0);
    }
  }

  private throwCarried(): void {
    const carried = this.carried;
    if (!carried) return;

    // Hand the object back to the scene at its current world position so it
    // does not jump when it stops being parented to the character.
    const worldPosition = carried.object3d.getWorldPosition(new Vector3());
    const parent = this.object.parent;
    this.rig.carryAnchor.remove(carried.object3d);
    parent?.add(carried.object3d);
    carried.object3d.position.copy(worldPosition);

    const forward = this.forwardVector(this.scratchMove);
    const throwVelocity = new Vector3()
      .addScaledVector(forward, TUNING.throwSpeed)
      .add(new Vector3(this.velocity.x * 0.4, TUNING.throwLift, this.velocity.z * 0.4));
    carried.release(throwVelocity);
    this.carried = null;
  }

  dropCarried(): void {
    if (this.carried) this.throwCarried();
  }

  // -------------------------------------------------------------------------
  // Recovery
  // -------------------------------------------------------------------------

  private updateRecovery(delta: number): void {
    // Remember a spot that is safe to return to: on the ground, not in water,
    // and standing still enough to be a sensible landing place.
    this.safePositionTimer -= delta;
    if (
      this.safePositionTimer <= 0 &&
      this.state === 'ground' &&
      this.onGround &&
      this.speed < 7
    ) {
      this.safePositionTimer = 0.45;
      this.lastSafePosition.copy(this.object.position);
    }

    if (this.object.position.y < TUNING.killPlaneY) this.respawn();
  }

  respawn(): void {
    this.dropCarried();
    this.object.position.copy(this.lastSafePosition);
    this.object.position.y += 0.2;
    this.velocity.set(0, 0, 0);
    this.state = 'air';
    this.climbSurface = null;
    this.syncCapsuleFromPosition();
    this.events.onRespawn?.();
  }

  setSafePosition(position: Vector3): void {
    this.lastSafePosition.copy(position);
  }

  teleport(position: Vector3, facing = this.facing): void {
    this.dropCarried();
    this.object.position.copy(position);
    this.facing = facing;
    this.velocity.set(0, 0, 0);
    this.state = 'air';
    this.climbSurface = null;
    this.lastSafePosition.copy(position);
    this.syncCapsuleFromPosition();
  }

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

  private targetSpeedFor(strength: number): number {
    // A gentle push walks, a full push runs, with a smooth range between.
    const base =
      strength <= 0.55
        ? MathUtils.lerp(0, TUNING.walkSpeed, strength / 0.55)
        : MathUtils.lerp(TUNING.walkSpeed, TUNING.runSpeed, (strength - 0.55) / 0.45);
    return this.carried ? base * TUNING.carrySpeedMultiplier : base;
  }

  private turnToward(direction: Vector3, delta: number, speed: number, override?: number): void {
    if (direction.lengthSq() < 0.0001) return;
    const target = Math.atan2(direction.x, direction.z);
    const rate =
      override ??
      MathUtils.lerp(
        TUNING.turnRateSlow,
        TUNING.turnRateFast,
        MathUtils.clamp(speed / TUNING.runSpeed, 0, 1),
      );
    let difference = target - this.facing;
    while (difference > Math.PI) difference -= Math.PI * 2;
    while (difference < -Math.PI) difference += Math.PI * 2;
    const step = MathUtils.clamp(difference, -rate * delta, rate * delta);
    this.facing += step;
  }

  private forwardVector(target: Vector3): Vector3 {
    return target.set(Math.sin(this.facing), 0, Math.cos(this.facing));
  }

  private capsuleCentre(target: Vector3): Vector3 {
    return target
      .copy(this.capsule.start)
      .add(this.capsule.end)
      .multiplyScalar(0.5);
  }

  private syncPositionFromCapsule(): void {
    this.object.position.set(
      this.capsule.start.x,
      this.capsule.start.y - CHARACTER_RADIUS,
      this.capsule.start.z,
    );
  }

  private syncCapsuleFromPosition(): void {
    const p = this.object.position;
    this.capsule.start.set(p.x, p.y + CHARACTER_RADIUS, p.z);
    this.capsule.end.set(p.x, p.y + CHARACTER_HEIGHT - CHARACTER_RADIUS, p.z);
  }

  private syncModel(delta: number, inputStrength: number): void {
    this.object.rotation.y = this.facing;

    // Footstep timing follows distance covered rather than a fixed clock, so
    // the sound matches the stride at any speed.
    if (this.state === 'ground' && this.speed > 0.6) {
      this.footstepPhase += this.speed * delta;
      if (this.footstepPhase > 1.6) {
        this.footstepPhase = 0;
        this.events.onFootstep?.(this.object.position);
      }
    } else {
      this.footstepPhase = 0;
    }

    const animation: AnimationInputs = {
      time: this.animationTime,
      delta,
      state: this.state,
      speed: this.speed,
      maxSpeed: TUNING.runSpeed,
      verticalSpeed: this.velocity.y,
      skidding: this.skidding,
      landing: this.landingTimer > 0,
      carrying: this.carried !== null,
      submerged: this.submerged && !this.atSurface,
      inputStrength,
      strokeProgress:
        this.strokeTimer > 0 ? 1 - this.strokeTimer / TUNING.strokeCooldown : 1,
    };
    animateCharacter(this.rig, animation);
  }

  /** Exposed so the world can parent carried objects correctly. */
  get carryAnchor(): Object3D {
    return this.rig.carryAnchor;
  }
}
