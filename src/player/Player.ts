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
import type { CollisionWorld, LadderVolume, WaterVolume } from '../physics/CollisionWorld.ts';
import type { ActionName, Input } from '../input/Input.ts';
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

/**
 * Which placed move is running, when one is.
 *
 * All six are driven by the same timer and the same pair of points, which is
 * the only thing they have in common. They are kept apart by name because
 * they used not to be: getting out of a pool and stepping off the top of a
 * ladder both ran the ledge hang, and both inherited its one real
 * assumption — that he is dangling off the edge by his hands — which is
 * false for either of them.
 */
export type ClimbMove =
  | 'mantle'
  | 'vault'
  | 'swing'
  | 'ladder-top'
  | 'ladder-mount'
  | 'water-exit';

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
  /**
   * How far wound up a move held under a thumb is, from nothing to one, and
   * nothing at all when none is being held. Only the pose uses it; the
   * height it is worth arrives with the press that lets it go.
   */
  private windUp = 0;
  /** What the buffered jump press was worth, and whether it came from a thumb. */
  private jumpPower = 1;
  private jumpFromThumb = false;
  /** What the last move that left the ground was launched at. */
  private lastPower = 1;
  /**
   * Time since the airborne boost, so the ground pound cannot be part of the
   * same tap. Starts long ago, which is what makes the very first press in
   * the air a boost rather than nothing.
   */
  private sinceAirBoost = 10;
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
  /**
   * A side flip asked for on its own button and not yet spent. Counts down,
   * and is cleared the moment the flip happens.
   */
  private sideBuffer = 0;
  /** The ground pound, which is a hover, a drop and a moment planted. */
  private poundPhase: PoundPhase = 'none';
  private poundTimer = 0;
  /** The ladder he is on, if any. */
  private ladder: LadderVolume | null = null;
  /**
   * Seconds before another ladder can be caught. Without it, jumping off one
   * is caught again by the same one on the very next frame, which looks
   * exactly like being stuck to it.
   */
  private ladderCooldown = 0;
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
  /** Which of the placed moves is running. */
  private climbMove: ClimbMove = 'mantle';
  /** The facing the move ends on, turned toward across the move itself. */
  private ledgeFacingFrom = 0;
  /** The ladder a 'ladder-mount' move is getting him onto. */
  private pendingLadder: LadderVolume | null = null;
  /** True while he is holding the edge, waiting for the jump button. */
  private ledgeHanging = false;
  /** How far the edge he is holding is above his feet. */
  private ledgeLift = 0;
  private ledgeCooldown = 0;
  /**
   * How far through the hand-over-hand cycle he is, and which way he is
   * going along the edge (0 when he is holding still with both hands).
   */
  /** How far past the edge this climb ends, kept for moving along it. */
  private ledgeStand = 0;
  /** Whether the second press of jump landed, turning the pull into a push. */
  private ledgeBoosted = false;
  /** How far into the climb that press was, so the push starts from there. */
  private ledgeBoostAt = 0;
  private gripPhase = 0;
  private gripMoving = 0;
  private readonly ledgeFrom = new Vector3();
  private readonly ledgeTo = new Vector3();
  private strokeTimer = 0;
  /**
   * The water he is in, decided once a frame.
   *
   * It used to be asked for twice with two different questions: the state
   * machine tested a point a fifth of a metre above his feet, and the
   * swimming itself tested the middle of his capsule, nearly a metre higher.
   * Rising quickly from a dive, the second said "not in water" while the
   * first still said he was, and he was dropped into the air a metre below
   * the surface — where the search for a ledge promptly caught the poolside
   * and settled him onto a hang well under it. That is the lurch downward
   * at the pool edge, and it needed no button at all.
   */
  private waterVolume: WaterVolume | null = null;
  private submerged = false;
  private atSurface = false;
  /** Where the camera is pointed this frame. */
  private lookYaw = 0;
  private lookPitch = 0;
  /**
   * Under the water on purpose, and staying there.
   *
   * Entered by the dive button and left only by swimming back up to the
   * surface. While it is set nothing floats him: he holds whatever depth he
   * is left at, and the stick steers by where the camera looks. At the
   * surface it is clear, so that looking around up there is only ever a
   * camera movement — which is what it has to be, or every glance would
   * shove him somewhere.
   */
  private dived = false;
  /** Counts down through the plunge that one tap of the dive button gives. */
  private plungeTimer = 0;
  private readonly scratchLook = new Vector3();
  /** Counts down after leaving water; see updateAir. */
  private leftWaterTimer = 0;
  private diving = false;
  private footstepPhase = 0;
  private animationTime = 0;

  private readonly lastSafePosition = new Vector3();
  /** The flattest floor the foot touched this frame, as a normal's height. */
  private floorNormalY = 1;
  private safePositionTimer = 0;

  /** Counters from the last frame, for diagnosing movement problems. */
  readonly diagnostics = {
    collisions: 0,
    lastNormalY: 0,
    lastDepth: 0,
  };

  /** How far a move held under a thumb is wound up, for tests and the HUD. */
  get windUpShowing(): number {
    return this.windUp;
  }

  /** Why the last search for a ledge did or did not find one. */
  readonly ledgeDiagnostics = { reason: '', lip: 0, surface: 0 };

  /**
   * Which jump he is in, how far through a combo, and whether a pound is
   * running. `stateName` names most moves but cannot tell a first jump from
   * a third, which is the one thing a test of a combo has to see.
   */
  get jumpInfo(): {
    stage: number;
    kind: JumpKind;
    pound: PoundPhase;
    airPresses: number;
    power: number;
    fromThumb: boolean;
  } {
    return {
      stage: this.jumpStage,
      kind: this.jumpKind,
      pound: this.poundPhase,
      airPresses: this.airPresses,
      power: this.lastPower,
      fromThumb: this.jumpFromThumb,
    };
  }

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
  /**
   * And one for the ledge search, for the same reason. It used to borrow
   * scratchA, which in the air is holding the movement intent for that
   * frame — so every frame the search found nothing, which is most of them,
   * it left the character's own facing in place of the stick, and steering
   * in the air quietly did nothing at all.
   */
  private readonly scratchLedge = new Vector3();


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
      if (this.climbMove === 'water-exit') return 'water-exit';
      if (this.climbMove === 'ladder-top') return 'ladder-top';
      if (this.climbMove === 'ladder-mount') return 'ladder-mount';
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

  update(delta: number, input: Input, cameraYaw: number, cameraPitch = 0): void {
    // Where the camera is pointed, kept for the one move that is steered by
    // looking rather than by the stick.
    this.lookYaw = cameraYaw;
    this.lookPitch = cameraPitch;
    this.animationTime += delta;
    if (this.strokeTimer > 0) this.strokeTimer -= delta;
    if (this.landingTimer > 0) this.landingTimer -= delta;
    if (this.comboWindow > 0) this.comboWindow -= delta;
    if (this.flipTimer >= 0) this.flipTimer += delta;
    if (this.wallTimer < 10) this.wallTimer += delta;
    if (this.ledgeCooldown > 0) this.ledgeCooldown -= delta;
    if (this.ladderCooldown > 0) this.ladderCooldown -= delta;
    if (this.leftWaterTimer > 0) this.leftWaterTimer -= delta;
    if (this.sinceTakeOff < 10) this.sinceTakeOff += delta;
    if (this.sinceAirBoost < 10) this.sinceAirBoost += delta;
    if (this.sinceSideFlipPress < 10) this.sinceSideFlipPress += delta;
    if (input.wasPressed('sideFlip')) this.sinceSideFlipPress = 0;
    if (this.sideBuffer > 0) this.sideBuffer -= delta;
    // Asked for on the button that exists for it, and kept rather than
    // spent: tapped one after the other, this one regularly arrives in the
    // frames before his feet have left the ground. It stays armed for as
    // long as the button is down, so holding it and then jumping is the
    // same request as jumping and then pressing it.
    //
    // Only that button. The key pairing is the keyboard's own move, with
    // its own rule about having been running, and nothing here changes it.
    if (input.chargingAction() === 'sideJump' || input.wasPressed('sideJump')) {
      this.sideBuffer = TUNING.sideFlipBuffer;
    }
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

    // How far a move held under a thumb is wound up. Only read for the pose:
    // nothing is launched until the button is let go of, so holding it at
    // full wind-up simply waits.
    const winding = input.chargingAction();
    this.windUp =
      winding && this.onGround && this.poundPhase === 'none' ? input.chargeNow(winding) : 0;

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
      this.updateLedge(delta, input, wish);
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

    // Standing at the top of a ladder, asking to go down it.
    if (input.wasPressed('climbDown')) {
      const below = this.ladderToClimbDown();
      if (below) {
        this.startLadderMount(below);
        return;
      }
    }

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

    // The three moves that a keyboard asks for with a modifier and a run-up,
    // as buttons of their own. Nothing on the keyboard presses these, so
    // crouch-and-jump is untouched; they exist because a thumb cannot hold a
    // modifier and a direction and a jump at once. Each one does exactly what
    // it says whatever he happens to be doing, which is the point of having
    // a button for it.
    //
    // Under a thumb these fire when the button is let go of rather than when
    // it is pressed, and how long it was held decides how high the move
    // goes. The press therefore carries its own wind-up, and the button that
    // is still down shows as a gathering crouch rather than as anything
    // happening yet.
    if (this.coyoteTimer > 0 && this.poundPhase === 'none') {
      if (input.wasPressed('backflip')) {
        const fromThumb = input.chargeOf('backflip') !== null;
        this.performBackflip(this.charged(input, 'backflip'));
        if (fromThumb) this.jumpHeld = false;
        return;
      }
      if (input.wasPressed('diveJump')) {
        const fromThumb = input.chargeOf('diveJump') !== null;
        this.performLongJump(this.charged(input, 'diveJump'));
        if (fromThumb) this.jumpHeld = false;
        return;
      }
      if (input.wasPressed('sideJump')) {
        // The side flip is normally added to a jump already in the air, so
        // from the ground he has to leave it first; the flip then overwrites
        // the velocity it would otherwise have had.
        const power = this.charged(input, 'sideJump');
        const fromThumb = input.chargeOf('sideJump') !== null;
        this.takeOff();
        this.performSideFlip(power);
        if (fromThumb) this.jumpHeld = false;
        return;
      }
    }

    if (this.jumpBufferTimer > 0 && this.coyoteTimer > 0) {
      // A wound-up jump has already decided its height, so letting go of the
      // button — which is what launched it — must not then cut it short on
      // top of that.
      if (this.jumpFromThumb) {
        this.performJump(this.jumpPower);
        this.jumpHeld = false;
      } else {
        this.performJump();
      }
      return;
    }

  }

  /**
   * What a press of this move is worth, from the smallest version of it to
   * the whole thing.
   *
   * A key is always the whole thing — the keyboard's own way of asking for
   * less is to let go early, and that still works. A thumb asks by how long
   * it holds the button down.
   */
  private charged(input: Input, action: ActionName): number {
    const level = input.chargeOf(action);
    this.lastPower = level === null ? 1 : MathUtils.lerp(TUNING.chargeLeastPower, 1, level);
    return this.lastPower;
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
    // And the same move asked for on its own button, which is forgiving in
    // the ways the key pairing cannot be: it does not care whether he was
    // running when he left the ground, and it will have been waiting since
    // before he did.
    if (this.wantsBufferedSideFlip()) {
      this.sideBuffer = 0;
      this.performSideFlip(1, true);
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
    // No limit on how many. Each one still needs a wall touched within the
    // window just before it, so height is only gained by actually reaching
    // the next wall — which is the thing that makes it a skill rather than a
    // free lift.
    if (this.jumpBufferTimer > 0 && this.wallTimer < TUNING.wallKickWindow) {
      this.performWallKick();
      return;
    }

    // Each press of jump in the air does the next thing: the first gives a
    // push upward, the second brings him down hard. Checked after the wall
    // kick, because a wall is the more specific thing to be doing.
    //
    // Not straight out of water, though. These are the second and third
    // presses of a jump, and surfacing is not a jump: a stroke taken just
    // before his head cleared the water used to be counted as one of them,
    // which is how pressing the stroke button repeatedly ended in a boost
    // and then a ground pound.
    //
    // And the two are kept apart in time, not only in count. On a keyboard a
    // double tap is deliberate; under a thumb it is what one press often
    // looks like, and the boost followed instantly by the pound is the one
    // sequence nobody means. So the press that brings him down has to come a
    // clear moment after the one that lifted him: anything sooner is read as
    // the same tap arriving twice and ignored, and the boost stands.
    if (input.wasPressed('jump') && this.leftWaterTimer <= 0) {
      if (this.airPresses === 0) {
        this.airPresses = 1;
        this.sinceAirBoost = 0;
        this.velocity.y = Math.max(this.velocity.y, 0) + TUNING.airBoostVelocity;
        this.jumpHeld = true;
        this.jumpBufferTimer = 0;
        return;
      }
      if (this.sinceAirBoost >= TUNING.airPoundDelay) {
        this.airPresses += 1;
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
    // Not out of water. Getting out of a pool is its own move, on its own
    // button; catching the side by simply drifting near it is what pulled
    // him under without being asked.
    if (this.waterVolume) return why('in water');

    // Toward the wall if he is against one, otherwise simply ahead.
    const forward = this.againstWall
      ? this.scratchLedge.copy(this.wallNormal).negate()
      : this.forwardVector(this.scratchLedge);
    if (forward.lengthSq() < 1e-6) return why('no direction');

    const feet = this.object.position.y;
    const top = this.ledgeSurfaceAt(forward, TUNING.ledgeReach, feet);
    if (top === null) return why('nothing in front');

    const lip = top - feet;
    this.ledgeDiagnostics.lip = Math.round(lip * 100) / 100;
    this.ledgeDiagnostics.surface = Math.round(top * 100) / 100;
    if (lip < TUNING.ledgeGrabLow || lip > TUNING.ledgeGrabHigh) return why('out of reach');

    // And there has to be something to hang over. A lip at chest height is
    // just as true of a kerb as of a rooftop, and he was catching both: a
    // side flip past a one-metre slab left him dangling off it with his toes
    // almost on the floor. What tells them apart is the drop underneath.
    const floor = this.world.groundProbe(
      this.scratchProbe.set(this.object.position.x, feet + 0.15, this.object.position.z),
      TUNING.ledgeMinDrop + 0.15,
    );
    if (floor && top - floor.y < TUNING.ledgeMinDrop) return why('only a step');

    // Square up to the wall before anything else is measured against it.
    //
    // He used to keep whatever heading he arrived on. Reaching an edge at an
    // angle therefore left him hanging at that angle — and since "along the
    // edge" is worked out from the way he faces, shuffling sideways then
    // carried him diagonally into the stone. It also measured the top along
    // that diagonal, which is longer than the wall is thick, so a wall met
    // at an angle could be taken for somewhere to stand. The wall itself
    // knows which way it faces, so ask it: the face under the edge gives a
    // normal, and he is turned square to it. Nothing here knows or cares
    // which wall it is.
    const squared = this.ledgeWallFacing(forward, top);
    if (squared !== null) {
      this.facing = squared;
      this.forwardVector(forward);
    }

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
    this.climbMove = this.ledgeWide ? 'mantle' : this.ledgeVault ? 'vault' : 'swing';

    const stand = this.ledgeWide
      ? TUNING.ledgeStandWide
      : this.ledgeVault
        ? TUNING.ledgeVaultOver
        : TUNING.ledgeStandNarrow;
    this.ledgeStand = stand;

    // Come in to the edge before taking hold of it.
    //
    // The search reaches a good deal further than his arms do — it has to,
    // or a surface that begins a hand's width past the first probe is missed
    // — but nothing used to bring him in afterwards. Caught at full stretch
    // he stayed exactly where he was and the hands were drawn at their usual
    // place in front of his chest, holding nothing: a metre of clear air
    // between him and the wall, which is what hanging in midair beside the
    // ground pound platform was. So find where the edge actually is and put
    // him at arm's length from it, which is the one distance at which the
    // drawn hands and the real edge are the same place.
    const edge = this.ledgeEdgeDistance(forward, top, feet);
    const pullIn = edge - TUNING.ledgeHandForward;
    this.object.position.x += forward.x * pullIn;
    this.object.position.z += forward.z * pullIn;

    this.ledgeFrom.copy(this.object.position);
    this.ledgeTo.set(
      this.object.position.x + forward.x * (TUNING.ledgeHandForward + stand),
      top,
      this.object.position.z + forward.z * (TUNING.ledgeHandForward + stand),
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
    this.ledgeFacingFrom = this.facing;
    this.velocity.set(0, 0, 0);
    this.ledgeTimer = 0;
    this.ledgeBoosted = false;
    this.ledgeLift = top - hangY;
    // He holds the edge and waits. Nothing happens until the jump button
    // says so, which is what makes it a hold rather than an escalator.
    this.ledgeHanging = true;
    // Both hands go on together, so the cycle starts from the top.
    this.gripPhase = 0;
    this.gripMoving = 0;
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
    // Two looks rather than one. A single probe at a fixed distance misses a
    // surface that begins a hand's width beyond it, and misses it silently:
    // the ladder on the course stood ten centimetres off the roof it leads
    // to, so the search found open air and he was left clamped at the top of
    // it with nowhere to go.
    for (const reach of [distance, distance + TUNING.ledgeReachExtra]) {
      const from = this.scratchB.set(
        this.object.position.x + forward.x * reach,
        feet + TUNING.ledgeGrabHigh + 0.4,
        this.object.position.z + forward.z * reach,
      );
      const ground = this.world.groundProbe(from, TUNING.ledgeGrabHigh + 0.4);
      if (!ground) continue;
      if (ground.normal.y < MAX_WALKABLE_NORMAL_Y) continue;
      return ground.y;
    }
    return null;
  }

  /**
   * How far in front of him the edge he is about to catch actually is.
   *
   * `ledgeSurfaceAt` answers how high the surface is, not how far away: it
   * takes two looks at fixed distances and returns the first that lands on
   * something. That is enough to decide whether there is a ledge, and no use
   * at all for putting his hands on it. This walks outward from his chest
   * until the surface appears, so the answer is the near edge of it rather
   * than wherever a probe happened to fall.
   */
  private ledgeEdgeDistance(forward: Vector3, top: number, feet: number): number {
    const far = TUNING.ledgeReach + TUNING.ledgeReachExtra;
    for (let at = TUNING.ledgeEdgeStep; at <= far; at += TUNING.ledgeEdgeStep) {
      const from = this.scratchB.set(
        this.object.position.x + forward.x * at,
        feet + TUNING.ledgeGrabHigh + 0.4,
        this.object.position.z + forward.z * at,
      );
      const ground = this.world.groundProbe(from, TUNING.ledgeGrabHigh + 0.4);
      if (!ground) continue;
      if (ground.normal.y < MAX_WALKABLE_NORMAL_Y) continue;
      if (Math.abs(ground.y - top) > 0.12) continue;
      return at;
    }
    // Nothing found walking out, which should not happen when a surface was
    // just found: leave him where he is rather than shunt him anywhere.
    return TUNING.ledgeHandForward;
  }

  /**
   * The heading that squares him up to the wall beneath an edge, or null if
   * there is no wall there to square up to.
   *
   * It looks at the face a little way below the top, at three depths, and
   * takes the first that answers with something upright. Three rather than
   * one because an edge is not always a clean right angle: a lip stands
   * proud of the wall it belongs to, and a sloped or stepped face can miss
   * a single probe entirely.
   */
  private ledgeWallFacing(forward: Vector3, top: number): number | null {
    const reach = TUNING.ledgeReach + TUNING.ledgeReachExtra + TUNING.ledgeWallProbe;
    for (const drop of TUNING.ledgeWallDrops) {
      const from = this.scratchProbe.set(
        this.object.position.x,
        top - drop,
        this.object.position.z,
      );
      const hit = this.world.surfaceProbe(from, forward, reach);
      if (!hit) continue;
      const flat = Math.hypot(hit.normal.x, hit.normal.z);
      // Upright enough to be a wall rather than a floor or a soffit.
      if (flat < TUNING.ledgeWallUpright) continue;
      return Math.atan2(-hit.normal.x / flat, -hit.normal.z / flat);
    }
    return null;
  }

  /**
   * Hanging off an edge, waiting to be told what to do.
   *
   * Three answers, and they are kept apart on purpose. Sideways moves him
   * along the edge, but only onto edge that is actually there. Jump pulls
   * him up, and only on a fresh press of it: taken from the movement axis
   * instead, anyone still holding forward from the run-up was hauled over
   * the moment they caught hold, so there was no hang to speak of. A second
   * press of it while he is on the way up turns the pull into a push, which
   * updateLedge deals with. Back pushes him off the wall instead.
   */
  private updateLedgeHang(delta: number, input: Input, wish: Vector3): void {
    this.object.position.copy(this.ledgeFrom);
    this.object.rotation.y = this.facing;
    this.syncCapsuleFromPosition();

    // Up and over, on a press rather than a hold. A second press inside the
    // window turns it into a harder push; that is updateLedge's business.
    if (input.wasPressed('jump')) {
      this.ledgeHanging = false;
      this.ledgeTimer = 0;
      this.ledgeBoosted = false;
      this.ledgeBoostAt = 0;
      this.jumpBufferTimer = 0;
      return;
    }

    // Off the edge, backwards and up, and not caught again on the way down.
    if (input.wasPressed('back')) {
      const away = this.forwardVector(this.scratchMove);
      this.ledgeHanging = false;
      this.ledgeTimer = -1;
      this.ledgeCooldown = TUNING.ledgeCooldown;
      this.ladderCooldown = TUNING.ladderCooldown;
      this.velocity.set(
        -away.x * TUNING.ledgeJumpOff,
        TUNING.jumpVelocity * TUNING.ledgeJumpUp,
        -away.z * TUNING.ledgeJumpOff,
      );
      this.jumpHeld = true;
      this.jumpKind = 'normal';
      this.jumpBufferTimer = 0;
      this.airPresses = 0;
      this.state = 'air';
      return;
    }

    // Crouch lets go and drops, because hanging with no way down is a trap.
    if (input.isDown('crouch')) {
      this.ledgeHanging = false;
      this.ledgeTimer = -1;
      this.ledgeCooldown = TUNING.ledgeCooldown;
      this.velocity.set(0, 0, 0);
      this.state = 'air';
      return;
    }

    // Along the edge, in whichever direction the stick is actually pointing
    // once the camera has had its say. Taken from the raw stick instead, the
    // edge and the screen disagree as soon as the camera comes round, and
    // pressing right stops moving him right.
    const side = this.edgeSide(this.scratchSide);
    const sideways = MathUtils.clamp(wish.x * side.x + wish.z * side.z, -1, 1);
    if (Math.abs(sideways) > 0.2) this.shimmy(sideways, delta);
    else this.settleGrip(delta);
  }

  /**
   * Lets a hand already on its way finish its reach.
   *
   * Stopping used to freeze whichever hand was in the air halfway to its
   * next hold, hanging off nothing. Nobody stops like that: the hand that is
   * moving arrives and takes hold, and only then does everything stand
   * still. So the cycle carries on to the next change-over — the body does
   * not move, only the hand — and stops there.
   */
  private settleGrip(delta: number): void {
    if (this.gripMoving === 0) return;
    const rate = (TUNING.ledgeShimmySpeed / TUNING.ledgeGripStride) * delta;
    const ahead = this.gripPhase * 2 * this.gripMoving;
    const target = (Math.ceil(ahead - 1e-6) / 2) * this.gripMoving;
    const left = (target - this.gripPhase) * this.gripMoving;
    if (left <= rate) {
      this.gripPhase = target;
      this.gripMoving = 0;
      return;
    }
    this.gripPhase += rate * this.gripMoving;
  }

  /**
   * The way the camera is pointed, as a direction to swim along.
   *
   * The camera sits behind him on a yaw and a pitch, so where it looks is
   * the opposite of where it sits. Pitch is positive looking down at him
   * from above, which is also the direction a dive goes.
   */
  private lookDirection(target: Vector3): Vector3 {
    // A view that is nearly level counts as level. The camera rests a touch
    // above him rather than dead behind, and without this "forward" was
    // very slightly "down": a quarter of a metre lost over four swum, which
    // is not holding a depth.
    const tilt =
      Math.sign(this.lookPitch) * Math.max(0, Math.abs(this.lookPitch) - TUNING.lookLevelBand);
    const flat = Math.cos(tilt);
    return target
      .set(-Math.sin(this.lookYaw) * flat, -Math.sin(tilt), -Math.cos(this.lookYaw) * flat)
      .normalize();
  }

  /** His right along the edge: the way he is facing, crossed with up. */
  private edgeSide(target: Vector3): Vector3 {
    const forward = this.forwardVector(this.scratchMove);
    return target.set(-forward.z, 0, forward.x);
  }

  /**
   * Shuffles him along the edge he is holding, if the edge carries on.
   *
   * The check is the point. Without it he slides off the end of a wall and
   * hangs in mid-air by nothing, so each step looks a shoulder's width ahead
   * for a surface at the same height as the one in his hands.
   */
  private shimmy(direction: number, delta: number): void {
    const side = this.edgeSide(this.scratchSide);
    // scratchMove holds the facing direction, which edgeSide just put there
    // and ledgeSurfaceAt is about to read.
    const forward = this.scratchMove;

    const step = direction * TUNING.ledgeShimmySpeed * delta;
    const edgeY = this.ledgeFrom.y + this.ledgeLift;
    const stop = () => {
      this.object.position.copy(this.ledgeFrom);
      this.syncCapsuleFromPosition();
      this.gripMoving = 0;
    };

    // Look where the hand is going before the body follows it.
    const probeAt = Math.sign(step) * TUNING.ledgeShimmyProbe;
    this.object.position.x = this.ledgeFrom.x + side.x * probeAt;
    this.object.position.z = this.ledgeFrom.z + side.z * probeAt;
    const ahead = this.ledgeSurfaceAt(forward, TUNING.ledgeReach, this.object.position.y);
    if (ahead === null || Math.abs(ahead - edgeY) > 0.2) {
      stop();
      return;
    }

    // Take the step, then put right what taking it changed. The edge is not
    // promised to be straight, and anything that is not straight slowly
    // walks him into the wall or out of reach of it.
    this.object.position.x = this.ledgeFrom.x + side.x * step;
    this.object.position.z = this.ledgeFrom.z + side.z * step;

    // Square up to the face again, in case the edge has turned under him.
    const squared = this.ledgeWallFacing(forward, edgeY);
    if (squared !== null) {
      this.facing = this.turnThrough(
        this.facing,
        squared,
        Math.min(1, TUNING.ledgeSquareRate * delta),
      );
      this.forwardVector(forward);
    }

    // And hold the same arm's length from it, measured afresh rather than
    // assumed: this is what keeps a hand on the edge all the way along one,
    // and what stops a corner dragging him through the stone.
    const gap = this.ledgeEdgeDistance(forward, edgeY, this.object.position.y);
    const correct = gap - TUNING.ledgeHandForward;
    this.object.position.x += forward.x * correct;
    this.object.position.z += forward.z * correct;

    // Last of all, ask the world. Nothing above can see a second wall
    // meeting this one, and an inside corner is exactly where sliding along
    // a face puts a shoulder into stone.
    this.syncCapsuleFromPosition();
    const hit = this.world.capsuleIntersect(this.capsule);
    if (hit && hit.depth > TUNING.ledgeClipAllow) {
      stop();
      return;
    }

    // The hands take turns, and the cycle is driven by how far he has
    // actually travelled rather than by a clock — stop halfway and a hand
    // stops halfway to its next hold.
    this.gripPhase += step / TUNING.ledgeGripStride;
    this.gripMoving = Math.sign(step);

    this.ledgeFrom.copy(this.object.position);
    this.ledgeTo.set(
      this.object.position.x + forward.x * (TUNING.ledgeHandForward + this.ledgeStand),
      edgeY,
      this.object.position.z + forward.z * (TUNING.ledgeHandForward + this.ledgeStand),
    );
  }

  /**
   * Runs the climb. He goes up first and across second, rather than along a
   * straight line between the two points, because a straight line would take
   * him through the very edge he is climbing over.
   */
  private updateLedge(delta: number, input: Input, wish: Vector3): void {
    if (this.ledgeHanging) {
      this.updateLedgeHang(delta, input, wish);
      return;
    }

    // A second press of jump while he is on his way up turns the pull-up
    // into a push, and it has to carry on from wherever the first one has
    // got to. So nothing is restarted and nothing is moved: the push is an
    // extra rise added on top of the climb already running, beginning at
    // nothing at the instant of the press and easing in from there. Tapped
    // as fast as the keyboard will repeat or taken at the far end of the
    // window, it is the same code and the same smooth join.
    const climbing =
      this.climbMove === 'mantle' || this.climbMove === 'vault' || this.climbMove === 'swing';
    if (
      climbing &&
      !this.ledgeBoosted &&
      input.wasPressed('jump') &&
      this.ledgeTimer <= TUNING.ledgeBoostWindow
    ) {
      this.ledgeBoosted = true;
      this.ledgeBoostAt = this.ledgeTimer;
    }

    this.ledgeTimer += delta;
    const progress = MathUtils.clamp(this.ledgeTimer / this.ledgeSeconds, 0, 1);

    // When the vertical part of the move happens, and when the horizontal
    // one does. Going up, the rise leads and the step forward follows, so
    // that he is never carried through the edge he is climbing over. Getting
    // onto a ladder from the platform above is the same move backwards: he
    // steps out over the drop first and lowers himself afterwards.
    const down = this.climbMove === 'ladder-mount';
    const riseSpan = down ? 0.6 : this.ledgeWide ? 0.62 : 0.55;
    const riseStart = down ? 0.4 : 0;
    const acrossStart = down ? 0 : 0.34;
    const acrossSpan = down ? 0.55 : 0.66;

    const rise = MathUtils.clamp((progress - riseStart) / riseSpan, 0, 1);
    const across = MathUtils.clamp((progress - acrossStart) / acrossSpan, 0, 1);

    const up = rise * rise * (3 - 2 * rise);
    const over = across * across * (3 - 2 * across);

    this.object.position.set(
      MathUtils.lerp(this.ledgeFrom.x, this.ledgeTo.x, over),
      MathUtils.lerp(this.ledgeFrom.y, this.ledgeTo.y, up),
      MathUtils.lerp(this.ledgeFrom.z, this.ledgeTo.z, over),
    );
    this.object.position.y += this.boostLift();
    // Turning is part of the move rather than something that happens to him
    // before it: getting onto a ladder means turning to face it.
    this.object.rotation.y = this.turnThrough(this.ledgeFacingFrom, this.facing, over);
    this.syncCapsuleFromPosition();

    this.ledgeLift = this.ledgeTo.y - this.object.position.y;

    if (progress >= 1) {
      this.ledgeTimer = -1;
      this.ledgeCooldown = TUNING.ledgeCooldown;
      this.wallKicks = 0;
      this.jumpKind = 'normal';
      this.velocity.set(0, 0, 0);

      // Pushed rather than pulled, he leaves the edge still going up, and
      // lands on it a moment later. That is what makes the second press
      // worth having: it clears the edge rather than stopping on it.
      if (this.ledgeBoosted) {
        this.ledgeBoosted = false;
        this.pendingLadder = null;
        this.velocity.y = TUNING.ledgeBoostVelocity;
        this.jumpHeld = true;
        this.airPresses = 0;
        this.jumpBufferTimer = 0;
        this.state = 'air';
        return;
      }

      // Onto a ladder rather than onto the ground: the move was the way on.
      if (this.climbMove === 'ladder-mount' && this.pendingLadder) {
        this.ladder = this.pendingLadder;
        this.pendingLadder = null;
        this.facing = this.ladder.facing;
        this.state = 'climb';
        this.snapToLadder(this.ladder);
        return;
      }

      this.pendingLadder = null;
      this.onGround = true;
      this.coyoteTimer = TUNING.coyoteTime;
      this.state = 'ground';
    }
  }

  /**
   * How much of the extra push is showing, in metres.
   *
   * Zero at the instant of the second press, whenever in the climb that
   * falls, and easing to its full height over a quarter of a second. Being
   * zero at the press is the whole point: it is added to wherever the climb
   * has already carried him, so there is no step to see.
   */
  private boostLift(): number {
    if (!this.ledgeBoosted) return 0;
    const t = MathUtils.clamp(
      (this.ledgeTimer - this.ledgeBoostAt) / TUNING.ledgeBoostRise,
      0,
      1,
    );
    return t * t * (3 - 2 * t) * TUNING.ledgeBoostLift;
  }

  /**
   * Which way he is pointed while swimming, as a number from one pointing
   * straight down to minus one pointing straight up.
   *
   * Taken from where he is actually going rather than from which button is
   * held, so steering underwater by eye tips him over with the turn instead
   * of swimming level while the view says otherwise. Below a crawl it is
   * nothing: drifting is not aiming.
   */
  private swimAim(): number {
    const speed = Math.hypot(this.velocity.x, this.velocity.y, this.velocity.z);
    if (speed < 0.4) return 0;
    return MathUtils.clamp(-this.velocity.y / speed, -1, 1);
  }

  /** How far in the extra push is, as a fraction, for the pose to drive on. */
  private boostShowing(): number {
    return TUNING.ledgeBoostLift > 0 ? this.boostLift() / TUNING.ledgeBoostLift : 0;
  }

  /** The angle `t` of the way round from `from` to `to`, by the short way. */
  private turnThrough(from: number, to: number, t: number): number {
    let difference = to - from;
    while (difference > Math.PI) difference -= Math.PI * 2;
    while (difference < -Math.PI) difference += Math.PI * 2;
    return from + difference * t;
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
    if (this.ladderCooldown > 0) return false;
    const found = this.world.ladderAt(
      this.capsuleCentre(this.scratchProbe),
      TUNING.ladderSnagDistance,
    );
    if (!found) return false;
    // Not straight after climbing off the top of it.
    if (this.object.position.y > found.topY - 0.2) return false;

    const into = this.scratchSide.set(Math.sin(found.facing), 0, Math.cos(found.facing));

    // From the ground he has to be walking at it.
    if (towards && towards.dot(into) < 0.3) return false;

    // In the air he has to be travelling at it. Catching anything merely
    // near him meant jumping off a ladder was undone on the way back down:
    // he left it, fell past it, and it took him again.
    if (!towards) {
      const closing = this.velocity.x * into.x + this.velocity.z * into.z;
      if (closing < 0.5) return false;
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

  private updateClimb(delta: number, input: Input, _wish: Vector3, _strength: number): void {
    const ladder = this.ladder;
    if (!ladder) {
      this.state = 'air';
      return;
    }

    // Jump comes first, and from anywhere on the ladder. It used to be
    // checked after the hand-over at the top, so a press on the frame he
    // reached the top was swallowed by it.
    if (input.wasPressed('jump')) {
      this.leaveLadder();
      const away = this.forwardVector(this.scratchMove);
      this.velocity.set(
        -away.x * TUNING.ladderJumpOff,
        TUNING.jumpVelocity * 0.75,
        -away.z * TUNING.ladderJumpOff,
      );
      this.jumpHeld = true;
      this.jumpKind = 'normal';
      return;
    }

    // Up and down come from the stick itself rather than from the stick
    // rotated into camera space. On a ladder there is only one axis that
    // means anything, and tying it to where the camera happens to be
    // pointing meant forward sometimes climbed and sometimes descended.
    const climb = MathUtils.clamp(-input.move.y, -1, 1);
    this.velocity.set(0, climb * TUNING.ladderSpeed, 0);

    // He climbs until his feet are a step below the top, which puts his
    // hands over the edge. That is where the step onto the platform starts
    // from, and it is also simply the top of the ladder: resting there and
    // then pressing back climbs down again, because nothing has happened yet.
    const highest = ladder.topY - TUNING.ladderTopFeet;
    const next = this.object.position.y + this.velocity.y * delta;
    this.object.position.y = MathUtils.clamp(next, ladder.bounds.min.y - 0.2, highest);
    this.snapToLadder(ladder);

    // Still asking to go up with no ladder left: step off the top onto
    // whatever is up there. This used to hand over to the ledge hang, which
    // is a move for catching an edge in mid-air and has no idea what a
    // ladder is — it settled him onto a hang below the edge and then waited
    // for a button he had no reason to think of pressing.
    if (next >= highest && climb > 0.2 && this.startLadderTop(ladder)) return;

    // Off the bottom.
    if (this.object.position.y <= ladder.bounds.min.y - 0.19) this.leaveLadder();
  }

  /**
   * The step from the top of a ladder onto the platform it leads to.
   *
   * It looks for the surface rather than assuming one: a ladder that leads
   * nowhere simply has a top, and he stays on it rather than being thrown
   * into the air by a move that cannot finish.
   */
  private startLadderTop(ladder: LadderVolume): boolean {
    const into = this.scratchMove.set(Math.sin(ladder.facing), 0, Math.cos(ladder.facing));
    const feet = this.object.position.y;

    let surface: number | null = null;
    let hitReach = 0;
    for (const reach of [
      TUNING.ladderStandOff + 0.35,
      TUNING.ladderStandOff + 0.8,
      TUNING.ladderStandOff + 1.25,
    ]) {
      const from = this.scratchProbe.set(
        this.object.position.x + into.x * reach,
        ladder.topY + 1.2,
        this.object.position.z + into.z * reach,
      );
      const ground = this.world.groundProbe(from, 1.2 + TUNING.ladderTopFeet + 0.9);
      if (!ground || ground.normal.y < MAX_WALKABLE_NORMAL_Y) continue;
      if (ground.y < feet - 0.25) continue;
      surface = ground.y;
      hitReach = reach;
      break;
    }
    if (surface === null) return false;

    this.ladder = null;
    this.pendingLadder = null;
    this.climbMove = 'ladder-top';
    this.ledgeWide = true;
    this.ledgeVault = false;
    this.ledgeHanging = false;
    this.ledgeFrom.copy(this.object.position);
    this.ledgeTo.set(
      this.object.position.x + into.x * (hitReach + TUNING.ladderTopStand),
      surface,
      this.object.position.z + into.z * (hitReach + TUNING.ladderTopStand),
    );
    this.ledgeFacingFrom = this.facing;
    this.facing = ladder.facing;
    this.ledgeLift = surface - feet;
    this.ledgeSeconds = TUNING.ladderTopSeconds;
    this.ledgeTimer = 0;
    this.ledgeBoosted = false;
    this.ledgeCooldown = 0;
    this.ladderCooldown = TUNING.ladderCooldown;
    this.velocity.set(0, 0, 0);
    this.state = 'ledge';
    return true;
  }

  /**
   * The ladder he could climb down from where he is standing, or null.
   *
   * This is offered, not taken. An edge with a ladder below it that grabs
   * anyone who walks near it is worse than no ladder at all, so the prompt
   * asks and the button answers.
   */
  ladderToClimbDown(): LadderVolume | null {
    if (this.state !== 'ground' || !this.onGround) return null;
    const feet = this.object.position.y;
    for (const ladder of this.world.ladders) {
      if (Math.abs(ladder.topY - feet) > TUNING.ladderMountDrop) continue;
      const flat = Math.hypot(
        this.object.position.x - ladder.anchor.x,
        this.object.position.z - ladder.anchor.z,
      );
      if (flat > TUNING.ladderMountReach) continue;
      return ladder;
    }
    return null;
  }

  /** Turns him round, steps him out over the drop and lowers him onto it. */
  private startLadderMount(ladder: LadderVolume): void {
    const into = this.scratchMove.set(Math.sin(ladder.facing), 0, Math.cos(ladder.facing));
    this.ledgeFrom.copy(this.object.position);
    this.ledgeTo.set(
      ladder.anchor.x - into.x * TUNING.ladderStandOff,
      ladder.topY - TUNING.ladderTopFeet,
      ladder.anchor.z - into.z * TUNING.ladderStandOff,
    );
    this.climbMove = 'ladder-mount';
    this.ledgeWide = false;
    this.ledgeVault = false;
    this.ledgeHanging = false;
    this.ledgeFacingFrom = this.facing;
    this.facing = ladder.facing;
    this.pendingLadder = ladder;
    this.ledgeSeconds = TUNING.ladderMountSeconds;
    this.ledgeTimer = 0;
    this.ledgeBoosted = false;
    this.ledgeLift = ladder.topY - this.ledgeTo.y;
    this.ledgeCooldown = 0;
    this.ladderCooldown = 0;
    this.velocity.set(0, 0, 0);
    this.onGround = false;
    this.crouching = false;
    this.state = 'ledge';
  }

  /** Lets go of the ladder and hands control back to the air. */
  private leaveLadder(): void {
    this.ladder = null;
    this.ladderCooldown = TUNING.ladderCooldown;
    this.state = 'air';
    this.velocity.set(0, 0, 0);
  }

  private updateSwim(delta: number, input: Input, wish: Vector3, strength: number): void {
    this.skidding = false;
    const water = this.waterVolume;
    if (!water) {
      this.state = 'air';
      return;
    }

    // The character floats with head and shoulders clear of the water.
    const floatLine = water.surfaceY - CHARACTER_HEIGHT * TUNING.floatSubmersion;
    const toFloatLine = floatLine - this.object.position.y;
    this.atSurface = Math.abs(toFloatLine) < 0.35;

    this.submerged = true;

    // Either button takes him under: C, which crouches on land, or Q. A tap
    // is a plunge of a fixed length rather than a shove, so that it puts
    // him properly below the surface whatever else is held at the time.
    if (this.plungeTimer > 0) this.plungeTimer -= delta;
    const pressedDown = input.wasPressed('crouch') || input.wasPressed('dive');
    const heldDown = input.isDown('crouch') || input.isDown('dive');
    if (!this.dived && (pressedDown || heldDown)) {
      this.dived = true;
      if (pressedDown) this.plungeTimer = TUNING.divePlunge;
    }
    const sinking = heldDown || this.plungeTimer > 0;
    this.diving = sinking;

    // Once under he stays under, and the only way back is to swim there.
    // He is back when his head would be out of the water again and he is
    // not on his way down — at which point the surface takes him the last
    // little way, as it does anyone.
    if (
      this.dived &&
      !sinking &&
      toFloatLine < this.surfaceBand &&
      this.velocity.y > -TUNING.surfaceSettle
    ) {
      this.dived = false;
    }

    if (this.dived) {
      this.swimUnder(delta, input, sinking);
      return;
    }

    if (toFloatLine > 0) {
      // Rising: stronger the deeper the character is, capped so that
      // falling in deep does not fire them out of the water again. This is
      // only ever someone who went in without diving — fell, jumped, or was
      // just let back up by the surface.
      this.velocity.y += Math.min(TUNING.buoyancy, toFloatLine * 7) * delta;
    } else {
      // Settling back down onto the float line.
      this.velocity.y += Math.max(-TUNING.swimGravity, toFloatLine * 5) * delta;
    }

    // At the surface, jump first looks for a poolside to climb out onto.
    // Without this there is no way out of a pool with vertical sides: a
    // stroke pushes him into the wall and the float line pulls him straight
    // back down.
    if (input.wasPressed('jump') && this.atSurface && this.tryClimbOutOfWater()) return;

    // Strokes give the swimming its rhythm: a press is a push, not a hold.
    if (input.wasPressed('jump') && this.strokeTimer <= 0) {
      this.strokeTimer = TUNING.strokeCooldown;
      const forward = this.forwardVector(this.scratchMove);
      const lift = this.atSurface ? TUNING.strokeLiftSurface : TUNING.strokeLiftUnder;
      this.velocity.addScaledVector(forward, TUNING.strokeImpulse);
      this.velocity.y += TUNING.strokeImpulse * lift;
    }

    if (strength > 0.001) {
      this.turnToward(wish, delta, 0, 5.5);
      this.velocity.addScaledVector(wish, TUNING.swimAcceleration * strength * delta);
    }

    // However he got here, he does not come out of the water under his own
    // rising. Capped at the surface only, so a dive still rises freely until
    // it gets there.
    if (this.atSurface && this.velocity.y > TUNING.swimSurfaceRise) {
      this.velocity.y = TUNING.swimSurfaceRise;
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

  /**
   * How far below where he floats his head is only just under the water.
   * Shallower than this he is at the surface whether he likes it or not.
   */
  private get surfaceBand(): number {
    return CHARACTER_HEIGHT * (1 - TUNING.floatSubmersion) + TUNING.surfaceBandMargin;
  }

  /**
   * Swimming underwater, once he has dived.
   *
   * Nothing here pushes him anywhere he did not ask to go. There is no
   * float and no sink: what he is asked for is a velocity, and he eases
   * onto it. Ask for nothing and the velocity asked for is none, so he
   * comes to rest where he is and stays at that depth until told otherwise.
   *
   * It used to be forces — a push from the stick against a drag, with a
   * share of the buoyancy left on underneath — which is why it felt like
   * being argued with. Letting go did not stop him, it handed him to the
   * buoyancy, and a small push on the stick had to out-wrestle it before it
   * showed. A velocity that follows the stick has neither problem: half a
   * push is half the speed, straight away, and none is none.
   *
   * The stick steers by the camera in all three directions: forward is the
   * way it is looking, up and down included, and sideways is across it.
   * The jump button is straight up and the dive button straight down, so
   * the same thing can be done with a thumb and without looking.
   */
  private swimUnder(delta: number, input: Input, sinking: boolean): void {
    const forward = -input.move.y;
    const across = input.move.x;
    const lift = (input.isDown('jump') ? 1 : 0) - (sinking ? 1 : 0);

    const look = this.lookDirection(this.scratchLook);
    const want = this.scratchMove
      .set(Math.cos(this.lookYaw), 0, -Math.sin(this.lookYaw))
      .multiplyScalar(across)
      .addScaledVector(look, forward);

    // He faces the way the stick sends him, as he does on land. Taken
    // before the buttons are added, since straight up is not a way to face.
    if (want.x * want.x + want.z * want.z > 0.0004) this.turnToward(want, delta, 0, 5.5);

    want.y += lift;
    const asked = want.length();
    if (asked > 1) want.multiplyScalar(1 / asked);
    want.multiplyScalar(TUNING.swimSpeed);

    // The arms pull when he sets off upward, so a tap of the button is a
    // stroke to look at as well as a rise.
    if (input.wasPressed('jump') && this.strokeTimer <= 0) {
      this.strokeTimer = TUNING.strokeCooldown;
    }

    // Quicker onto a speed than off one: answering at once is the point,
    // but stopping dead from a swim looks like hitting something.
    const rate = asked > 0.001 ? TUNING.underResponse : TUNING.underGlide;
    this.velocity.lerp(want, 1 - Math.exp(-rate * delta));
    if (asked <= 0.001 && this.velocity.lengthSq() < TUNING.underRest * TUNING.underRest) {
      this.velocity.set(0, 0, 0);
    }
  }

  /**
   * Climbs out of the water onto the poolside.
   *
   * Deliberately not the ledge hang, which is what it used to be. That move
   * settles him onto a fixed drop below the edge before it begins, so from
   * the surface of a pool it started by pulling him three quarters of a
   * metre downward and putting his head under — pressing jump looked exactly
   * like pressing dive. This one starts from wherever he is floating and
   * only ever goes up: reach, plant, lift, and out.
   */
  private tryClimbOutOfWater(): boolean {
    const forward = this.forwardVector(this.scratchMove);
    const feet = this.object.position.y;

    let surface: number | null = null;
    let hitReach = 0;
    for (const reach of [TUNING.waterExitReach, TUNING.waterExitReach + 0.5]) {
      const from = this.scratchProbe.set(
        this.object.position.x + forward.x * reach,
        feet + TUNING.waterExitHigh + 0.4,
        this.object.position.z + forward.z * reach,
      );
      const ground = this.world.groundProbe(from, TUNING.waterExitHigh + 0.4);
      if (!ground || ground.normal.y < MAX_WALKABLE_NORMAL_Y) continue;
      const lift = ground.y - feet;
      if (lift < TUNING.waterExitLow || lift > TUNING.waterExitHigh) continue;
      surface = ground.y;
      hitReach = reach;
      break;
    }
    if (surface === null) return false;

    this.climbMove = 'water-exit';
    this.ledgeWide = true;
    this.ledgeVault = false;
    this.ledgeHanging = false;
    this.pendingLadder = null;
    this.ledgeFrom.copy(this.object.position);
    this.ledgeTo.set(
      this.object.position.x + forward.x * (hitReach + TUNING.waterExitStand),
      surface,
      this.object.position.z + forward.z * (hitReach + TUNING.waterExitStand),
    );
    this.ledgeFacingFrom = this.facing;
    this.ledgeLift = surface - feet;
    this.ledgeSeconds = TUNING.waterExitSeconds;
    this.ledgeTimer = 0;
    this.ledgeBoosted = false;
    this.ledgeCooldown = 0;
    this.velocity.set(0, 0, 0);
    this.submerged = false;
    this.atSurface = false;
    this.diving = false;
    this.dived = false;
    this.plungeTimer = 0;
    this.state = 'ledge';
    return true;
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
    this.floorNormalY = 1;

    for (let step = 0; step < steps; step += 1) {
      this.moveHorizontally(stepDelta, wasOnGround);
      this.moveVertically(stepDelta);
    }

    // Ground contact is decided here, by probing downward, and only while
    // the character is not moving upward. Walking down a slope follows it
    // rather than launching off, because the probe reaches a little below
    // the feet.
    if (this.velocity.y <= 0.1) {
      // Falling onto a slope, the reach has to cover how far a capsule comes
      // to rest above it. A rounded foot touches a slope beside the point
      // under it, so it stops higher than the ground at its own centre — by
      // the radius times (1/cos of the slope - 1): 3cm on a gentle slope,
      // 8cm on a hillside, 21cm on the steepest he can walk. The reach used
      // to be 4cm flat, so dropping straight onto a hillside held him a few
      // centimetres up, falling at full speed and never landing.
      //
      // Only when the foot really is touching a slope, and by as much as
      // that slope needs. Widening it everywhere shortened every landing and
      // took frames off the window for the move that follows a jump.
      const slope = Math.max(this.floorNormalY, MAX_WALKABLE_NORMAL_Y);
      const reach = wasOnGround
        ? TUNING.groundSnapDistance
        : 0.04 + CHARACTER_RADIUS * (1 / slope - 1);
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
      if (hit.normal.y > 0.25) this.floorNormalY = Math.min(this.floorNormalY, hit.normal.y);

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
    if (input.wasPressed('jump')) {
      this.jumpBufferTimer = TUNING.jumpBufferTime;
      // Taken now rather than when the jump happens: a press is buffered for
      // a few frames, and by the time it is spent the wind-up it arrived
      // with has long since been cleared away.
      this.jumpPower = this.charged(input, 'jump');
      this.jumpFromThumb = input.chargeOf('jump') !== null;
    }
  }

  /**
   * Takes off, continuing a combo if one is running.
   *
   * A combo continues only if the jump comes soon after landing the previous
   * one and the character is still moving, which is what makes it a running
   * move rather than something to do on the spot.
   */
  private performJump(power = 1): void {
    // A jump out of a crouch is a different move entirely, and which one it
    // is depends only on whether he is still travelling.
    if (this.crouching) {
      if (this.speed >= TUNING.longJumpMinSpeed) {
        this.performLongJump(power);
        return;
      }
      if (this.speed <= TUNING.backflipMaxSpeed) {
        this.performBackflip(power);
        return;
      }
    }

    this.jumpKind = 'normal';
    const continuing = this.comboWindow > 0 && this.speed >= TUNING.jumpComboMinSpeed;
    this.jumpStage = continuing ? (Math.min(3, this.jumpStage + 1) as 1 | 2 | 3) : 1;

    this.velocity.y =
      power *
      (this.jumpStage === 3
        ? TUNING.tripleJumpVelocity
        : this.jumpStage === 2
          ? TUNING.doubleJumpVelocity
          : TUNING.jumpVelocity);

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
  private performLongJump(power = 1): void {
    const forward = this.forwardVector(this.scratchMove);
    this.velocity.x = forward.x * TUNING.longJumpSpeed;
    this.velocity.z = forward.z * TUNING.longJumpSpeed;
    this.velocity.y = TUNING.longJumpVelocity * power;

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
  /**
   * Whether a side flip asked for on its own button can happen now.
   *
   * Everything the key pairing asks for except having been running, which
   * that button does not require on the ground either, and with the press
   * allowed to have arrived before he was airborne at all — spent on the
   * first frame there is a jump to turn into a flip.
   */
  private wantsBufferedSideFlip(): boolean {
    if (this.sideBuffer <= 0) return false;
    if (this.state !== 'air') return false;
    if (this.jumpKind !== 'normal') return false;
    if (this.poundPhase !== 'none') return false;
    return this.sinceTakeOff <= TUNING.sideFlipWindow;
  }

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

  /**
   * `keepMomentum` leaves him going as fast as he already was when that is
   * faster than the flip's own speed, rather than dropping him to it. A flip
   * turned out of a jump in mid-air is a continuation of that jump, and
   * taking three metres a second off it mid-flight is a stumble, not a move.
   * The key pairing does not pass it, so the keyboard move is as it was.
   */
  private performSideFlip(power = 1, keepMomentum = false): void {
    const forward = this.forwardVector(this.scratchMove);
    const going = Math.hypot(this.velocity.x, this.velocity.z);
    // Already travelling faster than the move would give him: his heading
    // and his speed are both left exactly as they are.
    if (!keepMomentum || going <= TUNING.sideFlipSpeed) {
      this.velocity.x = forward.x * TUNING.sideFlipSpeed;
      this.velocity.z = forward.z * TUNING.sideFlipSpeed;
    }

    // However far up the jump already is, finish at the same height.
    const remaining = this.takeOffY + TUNING.sideFlipApex - this.object.position.y;
    this.velocity.y =
      Math.max(
        TUNING.sideFlipLeastVelocity,
        Math.sqrt(Math.max(0, 2 * TUNING.gravity * remaining)),
      ) * power;

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
  private performBackflip(power = 1): void {
    const forward = this.forwardVector(this.scratchMove);
    this.velocity.x = -forward.x * TUNING.backflipSpeed;
    this.velocity.z = -forward.z * TUNING.backflipSpeed;
    this.velocity.y = TUNING.backflipVelocity * power;

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
    this.waterVolume = water;

    if (water && !wasSwimming) {
      const entrySpeed = -this.velocity.y;
      this.state = 'swim';
      this.submerged = true;
      // Going in is not diving. Whoever falls or jumps in comes back up,
      // unless the dive button is down as they arrive.
      this.dived = false;
      this.plungeTimer = 0;
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
      this.dived = false;
    this.plungeTimer = 0;
      // Nothing pressed in the water carries over onto land.
      this.leftWaterTimer = TUNING.waterExitGrace;
      this.airPresses = 0;
      this.jumpBufferTimer = 0;
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
      this.speed < 7 &&
      this.groundUnderCentre()
    ) {
      this.safePositionTimer = 0.45;
      this.lastSafePosition.copy(this.object.position);
    }

    if (this.object.position.y < TUNING.killPlaneY) this.respawn();
  }

  /**
   * Whether there is ground straight under the middle of him, and not only
   * under the edge of his feet. Standing on the very lip of a drop counts as
   * on the ground, but it is no place to put him back to: set down there, he
   * slides off and falls again, over and over.
   */
  private groundUnderCentre(): boolean {
    const p = this.object.position;
    const probe = new Vector3(p.x, p.y + 0.3, p.z);
    const hit = this.world.groundProbe(probe, 0.6);
    return hit !== null && Math.abs(hit.y - p.y) < 0.2 && hit.normal.y > 0.6;
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

  /**
   * Rides along with something he is driving: put where it is, turned the way
   * it is turned and moving as it moves, and not simulated at all. This is
   * all the camera reads of him, so it is all that has to be kept true.
   */
  rideAlong(x: number, y: number, z: number, facing: number, vx: number, vz: number): void {
    this.object.position.set(x, y, z);
    this.facing = facing;
    this.velocity.set(vx, 0, vz);
    this.state = 'ground';
    this.syncCapsuleFromPosition();
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
      ledgeMove: this.climbMove,
      ledgeHanging: this.ledgeHanging,
      ledgeGrip: this.gripPhase,
      ledgeShimmy: this.gripMoving,
      ledgeLift: this.ledgeLift,
      ledgeBoost: this.boostShowing(),
      swimAim: this.swimAim(),
      windUp: this.windUp,
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
