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
import type { CollisionWorld, LadderVolume } from '../physics/CollisionWorld.ts';
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

export type MovementState = 'ground' | 'air' | 'swim' | 'ledge' | 'climb';

/**
 * Which jump is in the air. The arc and the pose both follow from it, and it
 * lasts until the feet are back on the ground.
 */
export type JumpKind = 'normal' | 'long' | 'back' | 'wall' | 'side';

/** Which part of a ground pound is running, if any. */
export type PoundPhase = 'none' | 'hover' | 'slam' | 'landed';

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
  /**
   * How long this particular somersault waits before it starts turning,
   * worked out from how long the jump is going to last.
   */
  private flipDelay: number = TUNING.tripleJumpFlipDelay;
  /** How far round the somersault is, 0 to 1. */
  private flipProgress = 0;
  private landingTimer = 0;
  private skidding = false;
  /** True while the crouch control is held and the character is on the ground. */
  private crouching = false;
  /**
   * True while sliding to a stop after letting go at speed. This is the
   * braking skid: heels dug in, going the way he already was. It is not the
   * same move as `skidding`, which is the turn-on-the-spot a hard reversal
   * produces.
   */
  private braking = false;
  /**
   * How much running he has built up, from 0 to 1. It decides how far a
   * braking skid carries him, which speed alone cannot: full speed arrives
   * in a third of a second, so without this a two-step dash and a long run
   * stop identically.
   */
  private momentum = 0;
  /** The braking force for the skid in progress, fixed when it begins. */
  private brakeRate = 0;
  /**
   * How much of a skid this one is, from 0 to 1. A brief dash stops with a
   * lean; a long run gets the whole dug-in pose.
   */
  private brakeStrength = 0;
  /** Which jump is in the air, which decides both the arc and the pose. */
  private jumpKind: JumpKind = 'normal';
  /** 1 turns the somersault forwards, -1 backwards for a backflip. */
  private flipDirection: 1 | -1 = 1;
  /**
   * Which way the figure turns over. A somersault and a backflip go over
   * head-first or heels-first; a side flip goes over his own shoulder, which
   * is a different axis entirely.
   */
  private flipAxis: 'pitch' | 'roll' = 'pitch';
  /**
   * How many times jump has been pressed since the feet left the ground.
   *
   * The ground pound is the third press of the same button: one to jump, a
   * second for a small push upward, a third to come down. Counting presses
   * rather than timing a double tap means there is no window to miss — each
   * press simply does the next thing.
   */
  private airPresses = 0;
  /** Seconds since the feet left the ground, and whether they left it at a run. */
  private sinceTakeOff = 99;
  private tookOffRunning = false;
  /** The height the current jump started from. */
  private takeOffY = 0;
  /** Seconds since the side flip button was last pressed. */
  private sinceSideFlipPress = 99;
  /** The ground pound, which is a hover, a drop and a moment planted. */
  private poundPhase: PoundPhase = 'none';
  private poundTimer = 0;
  /** The ladder he is on, if any. */
  private ladder: LadderVolume | null = null;
  /** The last wall touched in the air, pointing away from it. */
  private readonly wallNormal = new Vector3();
  /** Seconds since that wall was touched. Large means "not near one". */
  private wallTimer = 99;
  /** True while actually in contact with a wall this frame. */
  private againstWall = false;
  /** Kicks used since the feet last left the ground. */
  private wallKicks = 0;

  /**
   * The climb over a ledge, if one is in progress: how far through it is,
   * where it started, where it ends, and which of the two climbs it is.
   *
   * While this runs the controller places him directly rather than letting
   * physics do it. The move only exists because it has a known start and a
   * known finish; letting gravity and collision argue about it in between
   * would produce neither.
   */
  private ledgeTimer = -1;
  private ledgeSeconds = 0;
  private ledgeWide = false;
  /** True for a top too narrow to stand on, which is gone over rather than onto. */
  private ledgeVault = false;
  /** True while he is holding the edge, waiting for the jump button. */
  private ledgeHanging = false;
  /** How far the edge he is holding is above his feet. */
  private ledgeLift = 0;
  private ledgeCooldown = 0;
  private readonly ledgeFrom = new Vector3();
  private readonly ledgeTo = new Vector3();
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

  /** Why the last search for a ledge did or did not find one. */
  readonly ledgeDiagnostics = { reason: '', lip: 0, surface: 0 };

  private readonly scratchA = new Vector3();
  private readonly scratchB = new Vector3();
  private readonly scratchMove = new Vector3();
  private readonly scratchSide = new Vector3();
  /**
   * Kept separate from the rest on purpose. The ladder search runs in the
   * middle of the ground step, where scratchB is already holding the
   * character's horizontal velocity — borrowing it there overwrote the
   * velocity with a position, and everything downstream went with it.
   */
  private readonly scratchProbe = new Vector3();


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
    if (this.state === 'climb') return 'climb';
    if (this.state === 'air' && this.poundPhase === 'hover') return 'pound-hover';
    if (this.state === 'air' && this.poundPhase === 'slam') return 'pound';
    if (this.poundPhase === 'landed') return 'pound-land';
    if (this.state === 'ledge') {
      if (this.ledgeHanging) return 'hanging';
      if (this.ledgeWide) return 'mantle';
      return this.ledgeVault ? 'ledge-vault' : 'ledge-swing';
    }
    if (this.state === 'swim') return this.atSurface ? 'swim-surface' : 'swim-under';
    if (this.state === 'air') {
      // Catching on a wall comes first: a kick that has already peaked and
      // carried him onto the next wall is a slide now, not still a kick, and
      // naming it otherwise hides the one moment another kick is possible.
      if (this.againstWall && this.velocity.y < 0) return 'wall-slide';
      if (this.jumpKind === 'long') return 'long-jump';
      if (this.jumpKind === 'back') return 'backflip';
      if (this.jumpKind === 'wall' && this.velocity.y > 0) return 'wall-kick';
      if (this.jumpKind === 'side') return 'side-flip';
      if (this.velocity.y <= 0.5) return 'fall';
      return this.jumpStage === 3 ? 'triple' : this.jumpStage === 2 ? 'double' : 'jump';
    }
    if (this.crouching) return 'crouch';
    if (this.braking) return 'brake';
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
    if (this.wallTimer < 10) this.wallTimer += delta;
    if (this.ledgeCooldown > 0) this.ledgeCooldown -= delta;
    if (this.sinceTakeOff < 10) this.sinceTakeOff += delta;
    if (this.sinceSideFlipPress < 10) this.sinceSideFlipPress += delta;
    if (input.wasPressed('sideFlip')) this.sinceSideFlipPress = 0;
    if (this.poundPhase === 'landed') {
      this.poundTimer -= delta;
      if (this.poundTimer <= 0) this.poundPhase = 'none';
    }

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

    // A climb over a ledge runs on its own: it places him from where he
    // caught hold to where he ends up standing, and nothing else gets a say
    // until it is finished.
    if (this.state === 'climb') {
      this.updateClimb(delta, input, wish, strength);
      this.updateCarry(delta, input);
      this.updateRecovery(delta);
      this.syncModel(delta, strength);
      return;
    }

    if (this.state === 'ledge') {
      this.updateLedge(delta, input);
      this.updateCarry(delta, input);
      this.updateRecovery(delta);
      this.syncModel(delta, strength);
      return;
    }

    this.updateWaterState();

    switch (this.state) {
      case 'swim':
        this.updateSwim(delta, input, wish, strength);
        break;
      case 'ground':
        this.updateGround(delta, input, wish, strength);
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

  private updateGround(delta: number, input: Input, wish: Vector3, strength: number): void {
    const horizontal = this.scratchB.set(this.velocity.x, 0, this.velocity.z);
    const speed = horizontal.length();

    this.crouching = input.isDown('crouch') && this.poundPhase === 'none';

    // Walking into a ladder takes hold of it.
    if (strength > 0.001 && !this.crouching && this.tryCatchLadder(wish)) return;

    if (this.poundPhase === 'landed') {
      // Planted for a moment after the slam.
      this.braking = false;
      this.skidding = false;
      this.velocity.x = 0;
      this.velocity.z = 0;
      if (this.velocity.y < 0) this.velocity.y = -2;
      return;
    }

    if (this.crouching) {
      // A crouch at speed is a slide, not a stop. It has to carry him far
      // enough to be worth doing, because it is where the long jump comes
      // from: crouch while running, then jump.
      this.braking = false;
      this.skidding = false;
      if (strength > 0.001) this.turnToward(wish, delta, speed, TUNING.crouchTurnRate);

      const target = strength > 0.001 ? TUNING.crouchSpeed : 0;
      const newSpeed =
        speed > target
          ? Math.max(target, speed - TUNING.crouchDeceleration * delta)
          : Math.min(target, speed + TUNING.acceleration * 0.35 * delta);

      if (speed > 0.001) {
        horizontal.multiplyScalar(newSpeed / speed);
      } else if (newSpeed > 0) {
        horizontal.copy(this.forwardVector(this.scratchMove)).multiplyScalar(newSpeed);
      }
    } else if (strength > 0.001) {
      this.braking = false;
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

      // Letting go at a run is a skid, not a slowdown: he digs his heels in
      // and slides to a stop, still going the way he was. Below the
      // threshold it is an ordinary stop, so a walk does not end in a
      // dramatic halt.
      if (!this.braking && speed > TUNING.brakeMinSpeed) {
        this.braking = true;
        // How far this skid should carry him, and from that the force that
        // does it. Working from the distance rather than a fixed force is
        // what lets the length be chosen: a short burst of running stops
        // almost at once, a sustained one slides as far as it always did.
        const earned = Math.pow(this.momentum, TUNING.brakeMomentumCurve);
        const slide = MathUtils.lerp(TUNING.brakeSlideShort, TUNING.brakeSlideLong, earned);
        this.brakeRate = (speed * speed) / (2 * Math.max(0.1, slide));
        this.brakeStrength = earned;
      }
      if (this.braking && speed < TUNING.brakeEndSpeed) this.braking = false;

      const decel = (this.braking ? this.brakeRate : TUNING.deceleration) * delta;
      const newSpeed = Math.max(0, speed - decel);
      if (speed > 0.001) horizontal.multiplyScalar(newSpeed / speed);
    }

    this.velocity.x = horizontal.x;
    this.velocity.z = horizontal.z;

    // Running builds momentum; anything slower loses it again. It is kept
    // through a jump, so a run-up is not thrown away by leaving the ground.
    const nowSpeed = Math.hypot(horizontal.x, horizontal.z);
    if (nowSpeed > TUNING.brakeMinSpeed && !this.braking) {
      this.momentum = Math.min(1, this.momentum + delta / TUNING.brakeMomentumBuild);
    } else if (!this.braking) {
      this.momentum = Math.max(0, this.momentum - delta / TUNING.brakeMomentumFade);
    }

    // Hold the character against the ground so slopes do not launch them.
    if (this.velocity.y < 0) this.velocity.y = -2;

    if (this.jumpBufferTimer > 0 && this.coyoteTimer > 0) {
      this.performJump();
      return;
    }

  }

  private updateAir(delta: number, input: Input, wish: Vector3, strength: number): void {
    this.skidding = false;
    this.braking = false;
    this.crouching = false;

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

    // A ground pound in progress owns the character completely.
    if (this.poundPhase === 'hover' || this.poundPhase === 'slam') {
      this.updateGroundPound(delta);
      return;
    }

    // A jump turned into a side flip, if the other button landed inside the
    // window. Checked before anything else in the air, because it is a
    // continuation of the take-off rather than a new decision.
    if (this.canSideFlip()) {
      this.performSideFlip();
      return;
    }

    // A ladder passed within reach is caught, which is what makes jumping at
    // one work rather than bouncing off the wall it is on.
    if (this.tryCatchLadder()) return;

    // A top edge within reach takes priority over everything else in the
    // air: without it, kicking up to the top of a wall ends in a bounce off
    // the last few inches and a drop all the way back down.
    if (this.tryCatchLedge()) return;

    // Pressed against a wall and falling, he catches on it and slides rather
    // than dropping, which is what gives time to kick off it.
    if (this.againstWall && this.velocity.y < -TUNING.wallSlideSpeed) {
      this.velocity.y = -TUNING.wallSlideSpeed;
    }

    // A kick off a wall touched a moment ago. The window matters: without it
    // the button would have to be pressed on the one frame of contact.
    if (
      this.jumpBufferTimer > 0 &&
      this.wallTimer < TUNING.wallKickWindow &&
      this.wallKicks < TUNING.wallKickLimit
    ) {
      this.performWallKick();
      return;
    }

    // Each press of jump in the air does the next thing: the first gives a
    // push upward, the second brings him down hard. Checked after the wall
    // kick, because a wall is the more specific thing to be doing.
    if (input.wasPressed('jump')) {
      this.airPresses += 1;
      if (this.airPresses === 1) {
        this.velocity.y = Math.max(this.velocity.y, 0) + TUNING.airBoostVelocity;
        this.jumpHeld = true;
        this.jumpBufferTimer = 0;
        return;
      }
      if (this.airPresses >= 2) {
        this.startGroundPound();
        return;
      }
    }

    if (strength > 0.001) {
      // A long jump keeps almost none of its steering, so it goes where it
      // was aimed instead of being flown.
      const control = this.jumpKind === 'long' ? TUNING.longJumpAirControl : 1;
      this.turnToward(wish, delta, 0, TUNING.airTurnRate * control);
      const target = this.targetSpeedFor(strength);
      const horizontal = this.scratchB.set(this.velocity.x, 0, this.velocity.z);
      horizontal.addScaledVector(wish, TUNING.airAcceleration * control * delta);
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

  /**
   * Looks for a top edge within reach and catches hold of it.
   *
   * Reaching the top of a wall by kicking up it used to end with a bounce
   * off the last few inches and a drop all the way back down, because
   * nothing in the controller knew the difference between a wall and the top
   * of a wall. This is that difference: a surface he can stand on, within
   * arm's length in front, somewhere between his chest and just over his
   * head.
   *
   * It also decides which of the two climbs it is. If the surface carries on
   * well past the edge it is a roof, and he hauls himself onto it the way
   * you get out of a swimming pool. If it stops almost at once it is the top
   * of a wall, and he swings over it instead.
   */
  private tryCatchLedge(): boolean {
    const why = (reason: string) => {
      this.ledgeDiagnostics.reason = reason;
      return false;
    };
    if (this.ledgeCooldown > 0) return why('cooldown');
    if (this.velocity.y > TUNING.ledgeGrabRise) return why('rising');

    // Toward the wall if he is against one, otherwise simply ahead.
    const forward = this.againstWall
      ? this.scratchA.copy(this.wallNormal).negate()
      : this.forwardVector(this.scratchA);
    if (forward.lengthSq() < 1e-6) return why('no direction');

    const feet = this.object.position.y;
    const top = this.ledgeSurfaceAt(forward, TUNING.ledgeReach, feet);
    if (top === null) return why('nothing in front');

    const lip = top - feet;
    this.ledgeDiagnostics.lip = Math.round(lip * 100) / 100;
    this.ledgeDiagnostics.surface = Math.round(top * 100) / 100;
    if (lip < TUNING.ledgeGrabLow || lip > TUNING.ledgeGrabHigh) return why('out of reach');

    // How far the surface carries on past the edge decides which of the
    // three it is: somewhere to stand just past the edge, somewhere to stand
    // well past it, or nothing at all — a top too thin to stand on, which is
    // gone over rather than onto.
    const justPast = this.ledgeSurfaceAt(
      forward,
      TUNING.ledgeReach + TUNING.ledgeStandNarrow,
      feet,
    );
    const wellPast = this.ledgeSurfaceAt(
      forward,
      TUNING.ledgeReach + TUNING.ledgeWideDepth,
      feet,
    );
    const standable = justPast !== null && Math.abs(justPast - top) < 0.25;
    this.ledgeWide = standable && wellPast !== null && Math.abs(wellPast - top) < 0.25;
    this.ledgeVault = !standable;

    const stand = this.ledgeWide
      ? TUNING.ledgeStandWide
      : this.ledgeVault
        ? TUNING.ledgeVaultOver
        : TUNING.ledgeStandNarrow;
    this.ledgeFrom.copy(this.object.position);
    this.ledgeTo.set(
      this.object.position.x + forward.x * (TUNING.ledgeReach + stand),
      top,
      this.object.position.z + forward.z * (TUNING.ledgeReach + stand),
    );

    // Settle him onto the hang rather than leaving him at whatever height he
    // caught at, so the edge is over his head and his arms reach up to it.
    const hangY = MathUtils.clamp(
      top - TUNING.ledgeHangLift,
      feet - TUNING.ledgeSettleDown,
      feet + TUNING.ledgeSettleUp,
    );
    this.ledgeFrom.y = hangY;
    this.object.position.y = hangY;
    this.syncCapsuleFromPosition();

    this.facing = Math.atan2(forward.x, forward.z);
    this.velocity.set(0, 0, 0);
    this.ledgeTimer = 0;
    this.ledgeLift = top - hangY;
    // He holds the edge and waits. Nothing happens until the jump button
    // says so, which is what makes it a hold rather than an escalator.
    this.ledgeHanging = true;
    this.ledgeSeconds = this.ledgeWide
      ? TUNING.ledgeMantleSeconds
      : this.ledgeVault
        ? TUNING.ledgeVaultSeconds
        : TUNING.ledgeSwingSeconds;
    this.againstWall = false;
    this.wallTimer = 99;
    this.state = 'ledge';
    this.ledgeDiagnostics.reason = 'caught';
    return true;
  }

  /**
   * The height of a surface he could stand on, `distance` in front of him.
   * The ray starts above the highest catchable ledge and looks down, so it
   * finds the top of a wall rather than its face.
   */
  private ledgeSurfaceAt(forward: Vector3, distance: number, feet: number): number | null {
    const from = this.scratchB.set(
      this.object.position.x + forward.x * distance,
      feet + TUNING.ledgeGrabHigh + 0.4,
      this.object.position.z + forward.z * distance,
    );
    const ground = this.world.groundProbe(from, TUNING.ledgeGrabHigh + 0.4);
    if (!ground) return null;
    if (ground.normal.y < MAX_WALKABLE_NORMAL_Y) return null;
    return ground.y;
  }

  /**
   * Runs the climb. He goes up first and across second, rather than along a
   * straight line between the two points, because a straight line would take
   * him through the very edge he is climbing over.
   */
  private updateLedge(delta: number, input: Input): void {
    if (this.ledgeHanging) {
      // Held still on the edge. Jump climbs; crouch lets go, because hanging
      // with no way down would be a trap.
      this.object.position.copy(this.ledgeFrom);
      this.object.rotation.y = this.facing;
      this.syncCapsuleFromPosition();

      if (input.wasPressed('jump')) {
        this.ledgeHanging = false;
        this.ledgeTimer = 0;
        this.jumpBufferTimer = 0;
      } else if (input.isDown('crouch')) {
        this.ledgeHanging = false;
        this.ledgeTimer = -1;
        this.ledgeCooldown = TUNING.ledgeCooldown;
        this.velocity.set(0, 0, 0);
        this.state = 'air';
      }
      return;
    }

    this.ledgeTimer += delta;
    const progress = MathUtils.clamp(this.ledgeTimer / this.ledgeSeconds, 0, 1);

    // The rise is finished well before the move is, so the last part of it
    // is him stepping forward onto the surface rather than still climbing.
    const rise = MathUtils.clamp(progress / (this.ledgeWide ? 0.62 : 0.55), 0, 1);
    const across = MathUtils.clamp((progress - 0.34) / 0.66, 0, 1);

    const up = rise * rise * (3 - 2 * rise);
    const over = across * across * (3 - 2 * across);

    this.object.position.set(
      MathUtils.lerp(this.ledgeFrom.x, this.ledgeTo.x, over),
      MathUtils.lerp(this.ledgeFrom.y, this.ledgeTo.y, up),
      MathUtils.lerp(this.ledgeFrom.z, this.ledgeTo.z, over),
    );
    this.object.rotation.y = this.facing;
    this.syncCapsuleFromPosition();

    this.ledgeLift = this.ledgeTo.y - this.object.position.y;

    if (progress >= 1) {
      this.ledgeTimer = -1;
      this.ledgeCooldown = TUNING.ledgeCooldown;
      this.wallKicks = 0;
      this.jumpKind = 'normal';
      this.onGround = true;
      this.coyoteTimer = TUNING.coyoteTime;
      this.state = 'ground';
    }
  }

  /**
   * Press jump a second time quickly in the air and he stops dead, turns
   * over, and drives himself into the ground.
   *
   * The pause before the drop is most of the move. Falling straight away
   * would read as nothing more than falling faster; hanging there for a
   * fifth of a second is what makes the drop afterwards look deliberate.
   */
  private startGroundPound(): void {
    this.velocity.set(0, 0, 0);
    this.poundPhase = 'hover';
    this.poundTimer = TUNING.groundPoundHover;
    this.jumpKind = 'normal';
    this.jumpStage = 1;
    this.flipTimer = -1;
    this.flipProgress = 0;
    this.jumpBufferTimer = 0;
  }

  private updateGroundPound(delta: number): void {
    if (this.poundPhase === 'hover') {
      this.poundTimer -= delta;
      this.velocity.set(0, 0, 0);
      if (this.poundTimer <= 0) this.poundPhase = 'slam';
      return;
    }
    if (this.poundPhase === 'slam') {
      this.velocity.x = 0;
      this.velocity.z = 0;
      this.velocity.y = -TUNING.groundPoundSpeed;
    }
  }

  /**
   * Catches a ladder when he comes close to one, and climbs it.
   *
   * A ladder is flush with its wall, so there is nothing to stand on and
   * nothing to push against: it is handled as a box to be inside rather than
   * a surface to be against. He is held at a fixed distance off the face
   * while on it, which is also what stops him sinking into the wall.
   */
  private tryCatchLadder(towards?: Vector3): boolean {
    if (this.state === 'ledge' || this.poundPhase !== 'none') return false;
    const found = this.world.ladderAt(
      this.capsuleCentre(this.scratchProbe),
      TUNING.ladderSnagDistance,
    );
    if (!found) return false;
    // Not straight after climbing off the top of it.
    if (this.object.position.y > found.topY - 0.2) return false;

    // From the ground he has to be going at it; in the air, being near it is
    // enough, since that is the moment a ladder is worth catching.
    if (towards) {
      const into = this.scratchSide.set(Math.sin(found.facing), 0, Math.cos(found.facing));
      if (towards.dot(into) < 0.3) return false;
    }

    this.ladder = found;
    this.facing = found.facing;
    this.velocity.set(0, 0, 0);
    this.state = 'climb';
    this.snapToLadder(found);
    return true;
  }

  /** Holds him square to the ladder, a fixed distance off its face. */
  private snapToLadder(ladder: LadderVolume): void {
    const into = this.forwardVector(this.scratchMove);
    this.object.position.x = ladder.anchor.x - into.x * TUNING.ladderStandOff;
    this.object.position.z = ladder.anchor.z - into.z * TUNING.ladderStandOff;
    this.object.rotation.y = this.facing;
    this.syncCapsuleFromPosition();
  }

  private updateClimb(delta: number, input: Input, wish: Vector3, strength: number): void {
    const ladder = this.ladder;
    if (!ladder) {
      this.state = 'air';
      return;
    }

    // Up and down from the stick, measured along the way he is facing, so
    // pushing toward the ladder climbs it.
    const into = this.forwardVector(this.scratchMove);
    const push = strength > 0.001 ? wish.x * into.x + wish.z * into.z : 0;
    this.velocity.set(0, push * TUNING.ladderSpeed, 0);

    // He climbs to exactly the height he would hang at, and no further.
    //
    // It used to stop a little higher than that, and the move that takes
    // hold of the edge then settled him down onto the hang — a visible drop
    // of half a metre at the top of every ladder. Stopping at the hang
    // height means there is nothing left to settle: the two heights are the
    // same number, so the hand-over moves him not at all.
    const highest = ladder.topY - TUNING.ledgeHangLift;
    this.object.position.y = MathUtils.clamp(
      this.object.position.y + this.velocity.y * delta,
      ladder.bounds.min.y - 0.2,
      highest,
    );
    this.snapToLadder(ladder);

    // At the top, the climb hands over to the move that gets him onto it:
    // he takes hold of the edge and waits there, the same as any other.
    if (this.object.position.y >= highest - 0.01 && push > 0.2) {
      const previous = this.ladder;
      this.ladder = null;
      if (this.tryCatchLedge()) return;
      this.ladder = previous;
    }

    // Jump pushes him off backwards; dropping to the bottom lets go.
    if (input.wasPressed('jump')) {
      this.ladder = null;
      this.state = 'air';
      this.velocity.set(
        -into.x * TUNING.ladderJumpOff,
        TUNING.jumpVelocity * 0.75,
        -into.z * TUNING.ladderJumpOff,
      );
      this.jumpHeld = true;
      this.jumpKind = 'normal';
      return;
    }
    if (this.object.position.y <= ladder.bounds.min.y - 0.19) {
      this.ladder = null;
      this.state = 'air';
    }
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

    // At the surface, jump first looks for an edge to climb out by. Without
    // this there is no way out of a pool with vertical sides: a stroke
    // pushes him forward into the wall, and the float line then pulls him
    // straight back down, which reads as diving rather than climbing.
    if (input.wasPressed('jump') && this.atSurface && this.tryCatchLedge()) {
      this.submerged = false;
      this.diving = false;
      return;
    }

    // Strokes give the swimming its rhythm: a press is a push, not a hold.
    if (input.wasPressed('jump') && this.strokeTimer <= 0) {
      this.strokeTimer = TUNING.strokeCooldown;
      const forward = this.forwardVector(this.scratchMove);
      const lift = this.atSurface ? 0.55 : 0.55;
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
    // Wall contact is worked out fresh every frame by the resolution below,
    // so whatever was touched last frame is cleared first.
    this.againstWall = false;

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
        if (this.poundPhase === 'slam') {
          this.poundPhase = 'landed';
          this.poundTimer = TUNING.groundPoundRecovery;
          this.landingTimer = 0.17;
          this.events.onLand?.(this.object.position, 1);
        } else if (this.poundPhase !== 'landed') {
          this.poundPhase = 'none';
        }
        this.flipTimer = -1;
        this.flipProgress = 0;
        this.flipDirection = 1;
        this.jumpKind = 'normal';
        this.wallKicks = 0;
        this.againstWall = false;
        this.wallTimer = 99;
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
      this.airPresses = 0;
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

      // Remember the wall so a kick off it has something to push against.
      // The normal points away from the surface, which is the direction the
      // kick sends him.
      if (this.state === 'air') {
        this.scratchA.set(hit.normal.x, 0, hit.normal.z);
        if (this.scratchA.lengthSq() > 1e-6) {
          this.wallNormal.copy(this.scratchA).normalize();
          this.wallTimer = 0;
          this.againstWall = true;
        }
      }

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
    // A jump out of a crouch is a different move entirely, and which one it
    // is depends only on whether he is still travelling.
    if (this.crouching) {
      if (this.speed >= TUNING.longJumpMinSpeed) {
        this.performLongJump();
        return;
      }
      if (this.speed <= TUNING.backflipMaxSpeed) {
        this.performBackflip();
        return;
      }
    }

    this.jumpKind = 'normal';
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
    this.flipDelay = TUNING.tripleJumpFlipDelay;
    this.flipProgress = 0;

    this.flipDirection = 1;
    this.flipAxis = 'pitch';
    this.takeOff();
  }

  /**
   * Crouch while running, then jump: low, fast and a long way forward.
   *
   * The distance is in the speed rather than the height. It leaves the ground
   * at well over running pace and keeps almost none of its air control, so it
   * commits to the arc it started with — which is what makes it a move you
   * aim rather than one you steer.
   */
  private performLongJump(): void {
    const forward = this.forwardVector(this.scratchMove);
    this.velocity.x = forward.x * TUNING.longJumpSpeed;
    this.velocity.z = forward.z * TUNING.longJumpSpeed;
    this.velocity.y = TUNING.longJumpVelocity;

    this.jumpKind = 'long';
    this.jumpStage = 1;
    this.flipTimer = -1;
    this.flipProgress = 0;
    this.flipDirection = 1;
    this.flipAxis = 'pitch';
    this.takeOff();
  }

  /**
   * Thrown sideways over his own shoulder: jump at a run, then the flip
   * button, or the other way round, within a third of a second.
   *
   * It is a jump already in the air being turned into something else rather
   * than a jump of its own. That is what makes the window forgiving in both
   * directions — press the two in either order and it still reads as one
   * move — and it is why running is checked at the moment the feet left the
   * ground rather than now.
   *
   * The rotation is about a different axis from the somersault and the
   * backflip: those go over head-first or heels-first, this one goes over
   * sideways, which is the whole reason it looks like a different move.
   */
  private canSideFlip(): boolean {
    if (this.state !== 'air') return false;
    if (this.jumpKind !== 'normal') return false;
    if (this.poundPhase !== 'none') return false;
    if (!this.tookOffRunning) return false;
    return (
      this.sinceTakeOff <= TUNING.sideFlipWindow &&
      this.sinceSideFlipPress <= TUNING.sideFlipWindow
    );
  }

  private performSideFlip(): void {
    const forward = this.forwardVector(this.scratchMove);
    this.velocity.x = forward.x * TUNING.sideFlipSpeed;
    this.velocity.z = forward.z * TUNING.sideFlipSpeed;

    // However far up the jump already is, finish at the same height.
    const remaining = this.takeOffY + TUNING.sideFlipApex - this.object.position.y;
    this.velocity.y = Math.max(
      TUNING.sideFlipLeastVelocity,
      Math.sqrt(Math.max(0, 2 * TUNING.gravity * remaining)),
    );

    this.jumpKind = 'side';
    this.jumpStage = 1;
    this.flipTimer = 0;
    this.flipDelay = TUNING.tripleJumpFlipDelay;
    this.flipProgress = 0;
    this.flipDirection = 1;
    this.flipAxis = 'roll';
    this.jumpHeld = true;
    this.sinceSideFlipPress = 99;
    this.sinceTakeOff = 99;
  }

  /** Crouch standing still, then jump: high, backwards, turning over. */
  private performBackflip(): void {
    const forward = this.forwardVector(this.scratchMove);
    this.velocity.x = -forward.x * TUNING.backflipSpeed;
    this.velocity.z = -forward.z * TUNING.backflipSpeed;
    this.velocity.y = TUNING.backflipVelocity;

    this.jumpKind = 'back';
    this.jumpStage = 1;
    // The same rotation the triple jump uses, turned the other way: it paces
    // itself to the time in the air and comes round before landing.
    this.flipTimer = 0;
    this.flipDelay = TUNING.tripleJumpFlipDelay;
    this.flipProgress = 0;
    this.flipDirection = -1;
    this.flipAxis = 'pitch';
    this.takeOff();
  }

  /**
   * Jump again while against a wall and he kicks off it, away from the wall
   * and upward, turning to face the way he is now going.
   */
  private performWallKick(): void {
    this.velocity.x = this.wallNormal.x * TUNING.wallKickSpeed;
    this.velocity.z = this.wallNormal.z * TUNING.wallKickSpeed;
    this.velocity.y = TUNING.wallKickVelocity;
    this.facing = Math.atan2(this.wallNormal.x, this.wallNormal.z);

    this.wallKicks += 1;
    this.wallTimer = 99;
    this.againstWall = false;

    this.jumpKind = 'wall';
    this.jumpStage = 1;
    this.flipTimer = -1;
    this.flipProgress = 0;
    this.flipDirection = 1;
    this.flipAxis = 'pitch';
    this.takeOff();
  }

  /** What every jump does, whichever one it is. */
  private takeOff(): void {
    this.airPresses = 0;
    this.sinceTakeOff = 0;
    this.takeOffY = this.object.position.y;
    this.tookOffRunning = this.speed > TUNING.walkSpeed + 0.6;
    this.poundPhase = 'none';
    this.comboWindow = 0;
    this.jumpHeld = true;
    this.jumpBufferTimer = 0;
    this.coyoteTimer = 0;
    this.onGround = false;
    this.crouching = false;
    this.braking = false;
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
    //
    // How long to rise for is a share of the whole jump rather than a fixed
    // wait. A tenth of a second is barely noticeable on a jump held to full
    // height, but it is a fifth of a tapped one, and spending it there left
    // the low somersault too little air to finish turning in. The whole jump
    // is the time already spent plus the time still to come, which is re-read
    // every frame: let go of the button early and the jump is cut short, the
    // estimate drops with it, and the rotation starts almost at once.
    const toLand = this.predictTimeToLand();
    const airborne = this.flipTimer + toLand;
    this.flipDelay = MathUtils.clamp(
      (airborne - TUNING.tripleJumpFlipMinAirtime) * TUNING.tripleJumpFlipDelayShare,
      TUNING.tripleJumpFlipDelayMin,
      TUNING.tripleJumpFlipDelay,
    );
    if (this.flipTimer < this.flipDelay) return;

    const airtime = toLand - TUNING.tripleJumpLandMargin;
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
    return this.flipTimer >= this.flipDelay && this.flipProgress < 1;
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
      flipAngle:
        this.flipTimer < 0 ? 0 : this.flipProgress * Math.PI * 2 * this.flipDirection,
      flipAxis: this.flipAxis,
      poundPhase: this.poundPhase,
      climbing: this.state === 'climb',
      climbSpeed: this.state === 'climb' ? this.velocity.y : 0,
      flipping: this.flipping,
      crouching: this.crouching,
      braking: this.braking,
      brakeStrength: this.braking ? this.brakeStrength : 0,
      jumpKind: this.jumpKind,
      againstWall: this.againstWall,
      ledgeProgress:
        this.ledgeTimer < 0 ? 0 : Math.min(1, this.ledgeTimer / this.ledgeSeconds),
      ledgeWide: this.ledgeWide,
      ledgeHanging: this.ledgeHanging,
      ledgeLift: this.ledgeLift,
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
