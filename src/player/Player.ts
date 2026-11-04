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
import type { CollisionWorld } from '../physics/CollisionWorld.ts';
import type { Input } from '../input/Input.ts';
import type { Carryable } from '../world/Carryable.ts';
import { MAX_WALKABLE_NORMAL_Y, TUNING } from './Tuning.ts';
import {
  CHARACTER_HEIGHT,
  CHARACTER_RADIUS,
  createCharacterRig,
  type CharacterRig,
  type RigOptions,
} from './PlayerModel.ts';
import { animateCharacter, type AnimationInputs } from './PlayerAnimation.ts';

export type MovementState = 'ground' | 'air' | 'swim';

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
  /** 1, 2 or 3 — which jump of a combo the character is in. */
  private jumpStage: 1 | 2 | 3 = 1;
  /** Counts down after landing; a jump within it continues the combo. */
  private comboWindow = 0;
  /** Time since a triple jump took off, or -1 when there is no somersault. */
  private flipTimer = -1;
  /** How far round the somersault is, 0 to 1. */
  private flipProgress = 0;
  private landingTimer = 0;
  private skidding = false;
  private strokeTimer = 0;
  private submerged = false;
  private atSurface = false;
  private diving = false;
  private footstepPhase = 0;
  private animationTime = 0;

  private readonly lastSafePosition = new Vector3();
  private safePositionTimer = 0;

  /** Counters from the last frame, for diagnosing movement problems. */
  readonly diagnostics = {
    collisions: 0,
    lastNormalY: 0,
    lastDepth: 0,
  };

  private readonly scratchA = new Vector3();
  private readonly scratchB = new Vector3();
  private readonly scratchMove = new Vector3();
  private readonly scratchSide = new Vector3();


  constructor(
    world: CollisionWorld,
    spawn: Vector3,
    events: PlayerEvents = {},
    rigOptions: RigOptions = {},
  ) {
    this.world = world;
    this.events = events;

    this.rig = createCharacterRig(rigOptions);
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

  /** True while swimming below the surface, rather than treading on it. */
  get isSubmerged(): boolean {
    return this.state === 'swim' && !this.atSurface && this.submerged;
  }

  get stateName(): string {
    if (this.state === 'swim') return this.atSurface ? 'swim-surface' : 'swim-under';
    if (this.state === 'air') {
      if (this.velocity.y <= 0.5) return 'fall';
      return this.jumpStage === 3 ? 'triple' : this.jumpStage === 2 ? 'double' : 'jump';
    }
    if (this.skidding) return 'skid';
    if (this.speed > TUNING.walkSpeed + 0.6) return 'run';
    if (this.speed > 0.25) return 'walk';
    return 'idle';
  }

  update(delta: number, input: Input, cameraYaw: number): void {
    this.animationTime += delta;
    if (this.strokeTimer > 0) this.strokeTimer -= delta;
    if (this.landingTimer > 0) this.landingTimer -= delta;
    if (this.comboWindow > 0) this.comboWindow -= delta;
    if (this.flipTimer >= 0) this.flipTimer += delta;

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

    this.integrate(delta);

    this.updateFlip(delta);
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

    this.submerged = true;
    const diving = input.isDown('dive');
    this.diving = diving;
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

    this.diagnostics.collisions = 0;
    this.onGround = false;

    for (let step = 0; step < steps; step += 1) {
      this.moveHorizontally(stepDelta, wasOnGround);
      this.moveVertically(stepDelta);
    }

    // Ground contact is decided here, by probing downward, and only while
    // the character is not moving upward. Walking down a slope follows it
    // rather than launching off, because the probe reaches a little below
    // the feet.
    if (this.velocity.y <= 0.1) {
      const reach = wasOnGround ? TUNING.groundSnapDistance : 0.04;
      this.settleOnGround(reach);
    }

    if (this.onGround) {
      if (!wasOnGround) {
        this.flipTimer = -1;
        this.flipProgress = 0;
        // A third jump ends the combo: the next one starts again from one.
        this.comboWindow = this.jumpStage < 3 ? TUNING.jumpComboWindow : 0;
        if (this.jumpStage >= 3) this.jumpStage = 1;

        if (previousFallSpeed < -4) {
          this.landingTimer = 0.17;
          this.events.onLand?.(this.object.position, Math.min(1, -previousFallSpeed / 22));
        }
      }
      this.coyoteTimer = TUNING.coyoteTime;
      if (this.state === 'air') this.state = 'ground';
    } else if (this.state === 'ground') {
      this.state = 'air';
    }

    this.syncPositionFromCapsule();
  }

  /**
   * Horizontal movement, with the capsule lifted clear of whatever it is
   * standing on.
   *
   * The lift is what makes this work. A capsule resting on a tiled floor is
   * always slightly inside it, and when its lower sphere crosses the seam
   * between two triangles the collision resolution can push it back the way
   * it came — the character runs on the spot. It only appeared at higher
   * frame rates, where each step is short enough to stay on one seam.
   *
   * Lifting clear of the floor for the sideways move means floor seams are
   * never touched, and it gives stepping over for free: anything shorter
   * than the lift is simply walked onto.
   */
  private moveHorizontally(stepDelta: number, onGround: boolean): void {
    const move = this.scratchMove.set(
      this.velocity.x * stepDelta,
      0,
      this.velocity.z * stepDelta,
    );
    if (Math.hypot(move.x, move.z) < 1e-6) return;

    const lift = onGround ? TUNING.stepHeight : 0;
    if (lift > 0) this.capsule.translate(this.scratchSide.set(0, lift, 0));

    this.capsule.translate(move);
    this.resolveWalls();

    if (lift > 0) this.capsule.translate(this.scratchSide.set(0, -lift, 0));
  }

  private moveVertically(stepDelta: number): void {
    this.capsule.translate(this.scratchMove.set(0, this.velocity.y * stepDelta, 0));
    this.resolveVertical();
  }

  /**
   * Pushes the capsule out of walls, horizontally only. Floors and ceilings
   * are left to the vertical pass, so a floor contact can never deflect the
   * character sideways.
   */
  private resolveWalls(): void {
    for (let iteration = 0; iteration < 4; iteration += 1) {
      const hit = this.world.capsuleIntersect(this.capsule);
      if (!hit) break;
      if (Math.abs(hit.normal.y) > 0.7) break;

      const push = this.scratchB.copy(hit.normal).multiplyScalar(hit.depth);
      push.y = 0;
      if (push.lengthSq() < 1e-10) break;

      this.diagnostics.collisions += 1;
      this.diagnostics.lastNormalY = hit.normal.y;
      this.diagnostics.lastDepth = hit.depth;
      this.capsule.translate(push);

      // Remove only the velocity pushing into the wall, so the character
      // slides along it rather than sticking.
      const into = this.velocity.x * hit.normal.x + this.velocity.z * hit.normal.z;
      if (into < 0) {
        this.velocity.x -= hit.normal.x * into;
        this.velocity.z -= hit.normal.z * into;
      }
    }
  }

  /**
   * Settles the capsule onto the ground, or stops it against a ceiling.
   *
   * Only the vertical part of the push is applied. The two passes each own
   * one axis: a floor contact can never move the character sideways, and a
   * wall contact can never move them up or down. Mixing the two is what let
   * a floor seam cancel a frame of running.
   */
  private resolveVertical(): void {
    for (let iteration = 0; iteration < 4; iteration += 1) {
      const hit = this.world.capsuleIntersect(this.capsule);
      if (!hit) break;
      // Nearly horizontal: that is a wall, and the horizontal pass owns it.
      if (Math.abs(hit.normal.y) < 0.25) break;

      const lift = hit.normal.y * hit.depth;
      if (Math.abs(lift) < 1e-6) break;

      this.diagnostics.collisions += 1;
      this.diagnostics.lastNormalY = hit.normal.y;
      this.diagnostics.lastDepth = hit.depth;
      this.capsule.translate(this.scratchB.set(0, lift, 0));

      if (hit.normal.y < -0.5 && this.velocity.y > 0) this.velocity.y = 0;
    }
  }

  /**
   * Places the feet on the ground below, if it is within `reach`.
   *
   * Only the vertical position changes. Deciding ground contact from the
   * capsule's own contact normal used to undo a frame of running whenever
   * the character crossed the seam between two floor triangles, because the
   * push to resolve that contact pointed sideways.
   */
  private settleOnGround(reach: number): boolean {
    const feetY = this.capsule.start.y - CHARACTER_RADIUS;
    const origin = this.scratchSide.set(
      this.capsule.start.x,
      feetY + 0.25,
      this.capsule.start.z,
    );
    const ground = this.world.groundProbe(origin, 0.25 + reach);
    if (!ground || ground.normal.y < MAX_WALKABLE_NORMAL_Y) return false;

    this.capsule.translate(this.scratchMove.set(0, ground.y - feetY, 0));
    this.onGround = true;
    this.groundNormal.copy(ground.normal);
    if (this.velocity.y < 0) this.velocity.y = 0;
    return true;
  }

  private updateJumpTimers(delta: number, input: Input): void {
    if (this.coyoteTimer > 0) this.coyoteTimer -= delta;
    if (this.jumpBufferTimer > 0) this.jumpBufferTimer -= delta;
    if (input.wasPressed('jump')) this.jumpBufferTimer = TUNING.jumpBufferTime;
  }

  /**
   * Takes off, continuing a combo if one is running.
   *
   * A combo continues only if the jump comes soon after landing the previous
   * one and the character is still moving, which is what makes it a running
   * move rather than something to do on the spot.
   */
  private performJump(): void {
    const continuing = this.comboWindow > 0 && this.speed >= TUNING.jumpComboMinSpeed;
    this.jumpStage = continuing ? (Math.min(3, this.jumpStage + 1) as 1 | 2 | 3) : 1;

    this.velocity.y =
      this.jumpStage === 3
        ? TUNING.tripleJumpVelocity
        : this.jumpStage === 2
          ? TUNING.doubleJumpVelocity
          : TUNING.jumpVelocity;

    // The third jump comes with a somersault.
    this.flipTimer = this.jumpStage === 3 ? 0 : -1;
    this.flipProgress = 0;

    this.comboWindow = 0;
    this.jumpHeld = true;
    this.jumpBufferTimer = 0;
    this.coyoteTimer = 0;
    this.onGround = false;
    this.state = 'air';
  }

  /**
   * Advances the somersault so that it finishes just before landing.
   *
   * The rotation cannot run on a fixed clock. A tapped third jump is much
   * lower than a held one, and a fixed rotation either leaves the character
   * turning as they hit the ground or spins them long after they land. The
   * remaining airtime is worked out from the current height and vertical
   * speed each frame, and the rotation is paced to fit it, so a short hop
   * turns quickly and a full jump turns slowly.
   */
  private updateFlip(delta: number): void {
    if (this.flipTimer < 0) return;

    // Landing ends it, whatever it was doing.
    if (this.state !== 'air') {
      this.flipTimer = -1;
      this.flipProgress = 0;
      return;
    }

    // Rise first. Rotating from the instant the feet leave the ground reads
    // as a trip rather than a jump.
    if (this.flipTimer < TUNING.tripleJumpFlipDelay) return;

    const airtime = this.predictTimeToLand() - TUNING.tripleJumpLandMargin;
    // Floored at one frame, not at some fixed fraction of a second. Floored
    // higher, the rotation only ever covers a fraction of what is left each
    // frame and approaches the end without reaching it, so the character
    // lands still turning.
    const remaining = Math.max(delta, airtime);
    const rate = (1 - this.flipProgress) / remaining;
    this.flipProgress = Math.min(1, this.flipProgress + rate * delta);
  }

  /**
   * Seconds until the character is predicted to touch down, from where they
   * are and how fast they are moving. Gravity differs on the way up and the
   * way down, so the two halves are worked out separately.
   */
  private predictTimeToLand(): number {
    const probe = this.scratchSide.set(
      this.object.position.x,
      this.object.position.y + 0.3,
      this.object.position.z,
    );
    const ground = this.world.groundProbe(probe, 80);
    if (!ground) return Infinity;

    let height = Math.max(0, this.object.position.y - ground.y);
    const rising = TUNING.gravity;
    const falling = TUNING.gravity * TUNING.fallGravityMultiplier;

    let seconds = 0;
    let vertical = this.velocity.y;
    if (vertical > 0) {
      seconds += vertical / rising;
      height += (vertical * vertical) / (2 * rising);
      vertical = 0;
    }

    const descending = -vertical;
    seconds +=
      (-descending + Math.sqrt(descending * descending + 2 * falling * height)) / falling;
    return seconds;
  }

  /** True only while the somersault is actually turning. */
  private get flipping(): boolean {
    return this.flipTimer >= TUNING.tripleJumpFlipDelay && this.flipProgress < 1;
  }

  /** How far round the somersault is, 0 to 1. Exposed for the tests. */
  get somersaultProgress(): number {
    return this.flipTimer < 0 ? 0 : this.flipProgress;
  }

  private updateWaterState(): void {
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
      this.diving = false;
    }
  }

  // -------------------------------------------------------------------------
  // Carrying
  // -------------------------------------------------------------------------

  /** Objects the player may pick up; set by the world each frame. */
  carryables: Carryable[] = [];

  /**
   * The object the character would pick up right now, or null.
   *
   * The on-screen prompt and the pick-up itself both call this, so the prompt
   * can never offer something that the button will then refuse to lift.
   */
  findCarryTarget(): Carryable | null {
    if (this.carried) return null;

    let best: Carryable | null = null;
    let bestScore = Infinity;
    const forward = this.forwardVector(this.scratchMove);

    for (const candidate of this.carryables) {
      if (candidate.held || candidate.pickupCooldown > 0) continue;

      const offset = this.scratchSide.copy(candidate.position).sub(this.object.position);
      const vertical = Math.abs(offset.y);
      offset.y = 0;
      const distance = offset.length();

      if (distance > TUNING.carryReach + candidate.radius) continue;
      if (vertical > CHARACTER_HEIGHT) continue;

      // Facing is a preference, not a requirement: only something clearly
      // behind the character is ignored.
      const facing = distance > 0.001 ? forward.dot(offset.divideScalar(distance)) : 1;
      if (facing < -0.35) continue;

      const score = distance - facing * 0.5;
      if (score < bestScore) {
        bestScore = score;
        best = candidate;
      }
    }
    return best;
  }

  private updateCarry(_delta: number, input: Input): void {
    if (!input.wasPressed('grab')) return;

    if (this.carried) {
      this.throwCarried();
      return;
    }

    const target = this.findCarryTarget();
    if (!target) return;

    target.pickUp();
    this.carried = target;
    this.rig.carryAnchor.add(target.object3d);
    target.object3d.position.set(0, 0, 0);
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
      diving: this.diving && this.state === 'swim',
      jumpStage: this.jumpStage,
      flipAngle: this.flipTimer < 0 ? 0 : this.flipProgress * Math.PI * 2,
      flipping: this.flipping,
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
