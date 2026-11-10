/**
 * Procedural animation for the character rig.
 *
 * Nothing here is a baked clip: every pose is computed from the character's
 * speed, state and a running clock, then eased toward so that changes of state
 * blend instead of snapping. That keeps the character responsive — the legs
 * answer the stick immediately rather than waiting for a clip to loop.
 */

import { MathUtils } from 'three';
import { TUNING } from './Tuning.ts';
import { ARM, HIP_HEIGHT, SHOULDER_HEIGHT, type CharacterRig } from './PlayerModel.ts';
import type { ClimbMove, JumpKind, MovementState, PoundPhase } from './Player.ts';

export interface AnimationInputs {
  time: number;
  delta: number;
  state: MovementState;
  speed: number;
  maxSpeed: number;
  verticalSpeed: number;
  skidding: boolean;
  /** True while the crouch control is held on the ground. */
  crouching: boolean;
  /** True while sliding to a stop after letting go at speed. */
  braking: boolean;
  /**
   * How much of a skid it is, from 0 to 1, which follows how long he had
   * been running. A two-step dash leans; a long run digs in.
   */
  brakeStrength: number;
  /** Which jump is in the air: normal, long, backflip or wall kick. */
  jumpKind: JumpKind;
  /** True while pressed against a wall in the air. */
  againstWall: boolean;
  /** How far through a climb over a ledge he is, from 0 to 1. */
  ledgeProgress: number;
  /**
   * How far in the second press's extra push is, from nothing at the press
   * to one when it is fully behind him.
   */
  ledgeBoost: number;
  /**
   * Which way he is pointed while swimming: one straight down, minus one
   * straight up, nothing level.
   */
  swimAim: number;
  /**
   * How far a move held under a thumb is wound up, from nothing to one.
   * Nothing at all on a keyboard, which has no such thing.
   */
  windUp: number;
  /** True when the climb is onto a roof rather than over the top of a wall. */
  ledgeWide: boolean;
  /** Which placed move is running: a climb, a ladder step, or a way out of water. */
  ledgeMove: ClimbMove;
  /** True while he is holding the edge, waiting for the jump button. */
  ledgeHanging: boolean;
  /** How far through the hand-over-hand cycle he is, in whole grips. */
  ledgeGrip: number;
  /** -1, 0 or 1: which way he is shuffling along the edge, if at all. */
  ledgeShimmy: number;
  /** How far the edge he is holding is above his feet, right now. */
  ledgeLift: number;
  landing: boolean;
  carrying: boolean;
  submerged: boolean;
  /** True while the dive control is held. */
  diving: boolean;
  /** Which jump of a combo is in progress: 1, 2 or 3. */
  jumpStage: 1 | 2 | 3;
  /** How far round the triple jump's somersault is, in radians. */
  flipAngle: number;
  /** Which way he turns over: head-first, or sideways over his shoulder. */
  flipAxis: 'pitch' | 'roll';
  /** Which part of a ground pound is running. */
  poundPhase: PoundPhase;
  /** True while on a ladder. */
  climbing: boolean;
  /** How fast he is going up or down it. */
  climbSpeed: number;
  /** True only while the somersault is actually turning. */
  flipping: boolean;
  inputStrength: number;
  /** 0 at the start of a swim stroke, 1 when it has finished. */
  strokeProgress: number;
}

/** Target pose, filled fresh each frame and then eased toward. */
interface Pose {
  bodyPitch: number;
  bodyRoll: number;
  bodyYaw: number;
  bodyHeight: number;
  bodySquash: number;
  headPitch: number;
  headYaw: number;
  shoulderLeftPitch: number;
  shoulderRightPitch: number;
  shoulderLeftRoll: number;
  shoulderRightRoll: number;
  elbowLeft: number;
  elbowRight: number;
  hipLeft: number;
  hipRight: number;
  kneeLeft: number;
  kneeRight: number;
  ankleLeft: number;
  ankleRight: number;
}

const pose: Pose = createPose();
const current: Pose = createPose();
/**
 * What is actually drawn: the blended pose plus anything added on top of it
 * afterwards. Kept apart from `current` because adding to `current` feeds
 * the addition back into the next frame's blend, which quietly multiplies
 * it — a lean of five degrees became fifteen that way.
 */
const shown: Pose = createPose();
let initialised = false;

/**
 * How far through the walk cycle the character is, in radians.
 *
 * This is accumulated rather than computed as elapsed time multiplied by the
 * stride rate. The stride rate rises with speed, so multiplying jumped the
 * phase every time the speed changed: starting to run shifted the legs to a
 * completely different point in the cycle, and they appeared to scrabble for
 * a moment before settling. Adding up small steps means a change in rate
 * changes how fast the cycle advances, and nothing else.
 */
let stridePhase = 0;

/** How far through the ladder cycle he is, driven by distance climbed. */
let climbPhase = 0;

function createPose(): Pose {
  return {
    bodyPitch: 0,
    bodyRoll: 0,
    bodyYaw: 0,
    bodyHeight: 0,
    bodySquash: 1,
    headPitch: 0,
    headYaw: 0,
    shoulderLeftPitch: 0,
    shoulderRightPitch: 0,
    shoulderLeftRoll: 0,
    shoulderRightRoll: 0,
    elbowLeft: 0,
    elbowRight: 0,
    hipLeft: 0,
    hipRight: 0,
    kneeLeft: 0,
    kneeRight: 0,
    ankleLeft: 0,
    ankleRight: 0,
  };
}

export function animateCharacter(rig: CharacterRig, input: AnimationInputs): void {
  buildTargetPose(input);

  // Gathering for a move that has not been let go of yet. A layer on top of
  // whatever he is doing rather than a pose of its own, so he can still be
  // running when he lets it go, and it deepens with the wind-up rather than
  // appearing all at once. Added to the target rather than to the drawn
  // pose, because unlike the hands on a ledge this one wants to be eased
  // into — and because the blend below is what reads the target.
  gatherFor(input);

  // Blending rate: fast enough that the character never feels laggy, slow
  // enough that a state change reads as a transition rather than a jump.
  // A climb over a ledge is a short scripted move with a beginning, a middle
  // and an end, so it is eased far less than the rest: at the ordinary rate
  // the three of them smeared into one shrug.
  const rate =
    input.state === 'ledge' ? 26 : input.state === 'air' ? 16 : input.state === 'climb' ? 15 : 13;
  const blend = 1 - Math.exp(-rate * input.delta);

  if (!initialised) {
    Object.assign(current, pose);
    initialised = true;
  } else {
    for (const key of Object.keys(pose) as Array<keyof Pose>) {
      current[key] = MathUtils.lerp(current[key], pose[key], blend);
    }
  }

  // Moving along an edge is added after the blending, for the same reason
  // the somersault is: easing toward it would smear it. A hand that is
  // holding on has to be exactly still, and a pose eased toward its target
  // is by definition always a little behind it — which is precisely the
  // creep that makes hands look as though they are sliding rather than
  // gripping.
  Object.assign(shown, current);
  handOverHand(input, 1 - Math.exp(-14 * input.delta));

  // The somersault is added after blending. Easing toward it like any other
  // pose value would smooth a full rotation into almost no rotation at all.
  // A somersault and a backflip turn him head over heels; a side flip takes
  // him over his own shoulder, which is a different axis of the same body.
  const pitchFlip = input.flipAxis === 'pitch' ? input.flipAngle : 0;
  const rollFlip = input.flipAxis === 'roll' ? input.flipAngle : 0;
  rig.body.rotation.set(
    shown.bodyPitch + pitchFlip,
    shown.bodyYaw,
    shown.bodyRoll + rollFlip,
  );
  rig.body.position.y = HIP_HEIGHT + shown.bodyHeight;
  rig.body.scale.set(
    1 / Math.sqrt(shown.bodySquash),
    shown.bodySquash,
    1 / Math.sqrt(shown.bodySquash),
  );

  rig.head.rotation.set(shown.headPitch, shown.headYaw, 0);

  // Rotating a downward-hanging arm about +Z swings it toward +X, so the left
  // arm needs a negative roll and the right a positive one to move *away*
  // from the body. With the signs the other way round, every increase in roll
  // tucked both arms further into the torso.
  rig.shoulderLeft.rotation.set(shown.shoulderLeftPitch, 0, -shown.shoulderLeftRoll);
  rig.shoulderRight.rotation.set(shown.shoulderRightPitch, 0, shown.shoulderRightRoll);
  rig.elbowLeft.rotation.x = shown.elbowLeft;
  rig.elbowRight.rotation.x = shown.elbowRight;

  rig.hipLeft.rotation.x = shown.hipLeft;
  rig.hipRight.rotation.x = shown.hipRight;
  rig.kneeLeft.rotation.x = shown.kneeLeft;
  rig.kneeRight.rotation.x = shown.kneeRight;
  rig.ankleLeft.rotation.x = shown.ankleLeft;
  rig.ankleRight.rotation.x = shown.ankleRight;
}

function buildTargetPose(input: AnimationInputs): void {
  reset(pose);

  switch (input.state) {
    case 'climb':
      poseClimb(input);
      break;
    case 'ledge':
      poseLedge(input);
      break;
    case 'swim':
      poseSwim(input);
      break;
    case 'air':
      poseAir(input);
      break;
    default:
      poseGround(input);
      break;
  }

  if (input.carrying) applyCarry();
  if (input.landing) applyLandingSquash();
}

function reset(target: Pose): void {
  target.bodyPitch = 0;
  target.bodyRoll = 0;
  target.bodyYaw = 0;
  target.bodyHeight = 0;
  target.bodySquash = 1;
  target.headPitch = 0;
  target.headYaw = 0;
  target.shoulderLeftPitch = 0;
  target.shoulderRightPitch = 0;
  // The body is widest at the belly, so the arms need to hang a little clear
  // of it or they disappear into the torso.
  target.shoulderLeftRoll = 0.17;
  target.shoulderRightRoll = 0.17;
  target.elbowLeft = 0;
  target.elbowRight = 0;
  target.hipLeft = 0;
  target.hipRight = 0;
  target.kneeLeft = 0;
  target.kneeRight = 0;
  target.ankleLeft = 0;
  target.ankleRight = 0;
}

/*
 * Rotation conventions, derived once so the poses below are not guesswork.
 * The model faces +Z, and every limb hangs downward from its pivot.
 *
 *   body.rotation.x  > 0  tips the head forward, toward +Z
 *   shoulder.rotation.x < 0  swings the arm forward
 *   hip.rotation.x      > 0  swings the thigh backward
 *   knee.rotation.x     > 0  bends the heel backward, which is the only way
 *                            a knee actually bends
 */

function poseGround(input: AnimationInputs): void {
  const normalised = MathUtils.clamp(input.speed / input.maxSpeed, 0, 1);

  if (input.poundPhase === 'landed') {
    // Down on the ground where he hit it, arms braced.
    pose.bodyPitch = 0.18;
    pose.bodyHeight = -0.3;
    pose.bodySquash = 0.88;
    pose.shoulderLeftPitch = -0.9;
    pose.shoulderRightPitch = -0.9;
    pose.shoulderLeftRoll = 0.7;
    pose.shoulderRightRoll = 0.7;
    pose.elbowLeft = -0.5;
    pose.elbowRight = -0.5;
    pose.hipLeft = -1.3;
    pose.hipRight = -1.3;
    pose.kneeLeft = 2.1;
    pose.kneeRight = 2.1;
    pose.ankleLeft = -0.9;
    pose.ankleRight = -0.9;
    pose.headPitch = -0.2;
    return;
  }

  if (input.crouching) {
    // Down on his haunches, weight over his heels, hands out in front for
    // balance. Low enough to read as a crouch from any camera angle, and the
    // pose a long jump or a backflip is about to spring out of.
    pose.bodyPitch = 0.3;
    pose.bodyHeight = -0.185;
    pose.hipLeft = -1.15;
    pose.hipRight = -1.15;
    pose.kneeLeft = 1.95;
    pose.kneeRight = 1.95;
    pose.ankleLeft = -0.95;
    pose.ankleRight = -0.95;
    pose.shoulderLeftPitch = -0.75;
    pose.shoulderRightPitch = -0.75;
    pose.shoulderLeftRoll = 0.42;
    pose.shoulderRightRoll = 0.42;
    pose.elbowLeft = -0.7;
    pose.elbowRight = -0.7;
    pose.headPitch = -0.26;
    pose.bodySquash = 0.94;
    return;
  }

  if (input.braking) {
    // The braking skid: still going the way he was, heels dug in, weight
    // thrown back and arms out. One foot forward as the brake, the other
    // trailing.
    //
    // How far into that pose he goes follows how long he had been running.
    // Throwing the whole thing on for a two-step dash looked like a stumble,
    // because the pose was arriving and leaving inside a tenth of a second.
    const dig = MathUtils.lerp(0.4, 1, MathUtils.clamp(input.brakeStrength, 0, 1));
    pose.bodyPitch = -0.34 * dig;
    pose.bodyHeight = -0.025 * dig;
    pose.bodyRoll = 0.07 * dig;
    pose.shoulderLeftPitch = -1.15 * dig;
    pose.shoulderRightPitch = -0.55 * dig;
    pose.shoulderLeftRoll = MathUtils.lerp(0.17, 0.95, dig);
    pose.shoulderRightRoll = MathUtils.lerp(0.17, 0.8, dig);
    pose.elbowLeft = -0.35 * dig;
    pose.elbowRight = -0.25 * dig;
    pose.hipLeft = -0.72 * dig;
    pose.hipRight = 0.22 * dig;
    pose.kneeLeft = 0.62 * dig;
    pose.kneeRight = 1.15 * dig;
    pose.ankleLeft = 0;
    pose.ankleRight = -0.35 * dig;
    pose.headPitch = -0.12 * dig;
    return;
  }

  if (input.skidding) {
    // Heels dug in, weight thrown backwards, arms flung out for balance.
    pose.bodyPitch = -0.3;
    pose.bodyHeight = -0.11;
    pose.shoulderLeftPitch = -1.5;
    pose.shoulderRightPitch = -1.2;
    pose.shoulderLeftRoll = 0.85;
    pose.shoulderRightRoll = 0.7;
    pose.hipLeft = -0.5;
    pose.hipRight = 0.35;
    pose.kneeLeft = 0.45;
    pose.kneeRight = 0.2;
    pose.headPitch = -0.18;
    return;
  }

  if (input.speed < 0.3) {
    // Idle: a slow breath, and the head drifts as if looking around.
    const breath = Math.sin(input.time * 1.7);
    pose.bodyHeight = breath * 0.012;
    pose.bodySquash = 1 + breath * 0.008;
    pose.headYaw = Math.sin(input.time * 0.45) * 0.22;
    pose.headPitch = Math.sin(input.time * 0.33) * 0.05;
    pose.shoulderLeftPitch = 0.06;
    pose.shoulderRightPitch = -0.06;
    pose.shoulderLeftRoll = 0.2;
    pose.shoulderRightRoll = 0.2;
    pose.elbowLeft = -0.16;
    pose.elbowRight = -0.16;
    return;
  }

  // Stride frequency rises with speed, but not linearly: a run has longer
  // strides as well as faster ones.
  const stride = 2.6 + normalised * 5.4;
  stridePhase = (stridePhase + stride * input.delta) % (Math.PI * 2);
  const phase = stridePhase;
  const swing = Math.sin(phase);
  const counterSwing = Math.sin(phase + Math.PI);

  const legAmplitude = MathUtils.lerp(0.42, 1.0, normalised);
  const armAmplitude = MathUtils.lerp(0.3, 0.95, normalised);

  pose.hipLeft = swing * legAmplitude;
  pose.hipRight = counterSwing * legAmplitude;
  // The knee bends on the trailing leg only, which is what stops a walk
  // looking like a pair of scissors.
  pose.kneeLeft = Math.max(0, swing) * legAmplitude * 1.25;
  pose.kneeRight = Math.max(0, counterSwing) * legAmplitude * 1.25;

  // The foot rolls through the stride: toes point down at push-off, when the
  // thigh is furthest back, and come up again as the heel reaches forward.
  pose.ankleLeft = swing * 0.42 + 0.08;
  pose.ankleRight = counterSwing * 0.42 + 0.08;

  pose.shoulderLeftPitch = counterSwing * armAmplitude;
  pose.shoulderRightPitch = swing * armAmplitude;
  // Elbows stay slightly bent, and bend more as the arm comes forward.
  pose.elbowLeft = -0.22 - Math.max(0, -counterSwing) * armAmplitude * 0.6;
  pose.elbowRight = -0.22 - Math.max(0, -swing) * armAmplitude * 0.6;
  // Arms tuck in across the body as they come forward, rather than swinging
  // like two pendulums hung off the sides.
  pose.shoulderLeftRoll = 0.18 + normalised * 0.04 - Math.max(0, -counterSwing) * 0.1;
  pose.shoulderRightRoll = 0.18 + normalised * 0.04 - Math.max(0, -swing) * 0.1;

  // Lean into the run, bob twice per stride, and roll slightly with each step.
  pose.bodyPitch = normalised * 0.26;
  pose.bodyHeight = Math.abs(Math.sin(phase)) * 0.05 * normalised - 0.02 * normalised;
  pose.bodyRoll = Math.sin(phase) * 0.055 * normalised;
  pose.bodyYaw = Math.sin(phase) * 0.09 * normalised;
  // The shoulders twist with the stride, so the head turns back against them
  // to keep looking where the character is going.
  pose.headYaw = -pose.bodyYaw * 0.7;
  pose.headPitch = -normalised * 0.12;
}

/**
 * Getting over the top of something, in three beats: catch hold, pull, then
 * push up and stand.
 *
 * The two climbs share the beats and differ in the middle one. Onto a roof
 * he hauls himself up square, the way you get out of a swimming pool. Over
 * the top of a wall there is not enough surface to haul onto, so he tips
 * over it instead and swings a leg across.
 */
function poseLedge(input: AnimationInputs): void {
  if (input.ledgeMove === 'water-exit') {
    poseWaterExit(input);
    return;
  }
  if (input.ledgeMove === 'ladder-top') {
    poseLadderTop(input);
    return;
  }
  if (input.ledgeMove === 'ladder-mount') {
    poseLadderMount(input);
    return;
  }

  const wide = input.ledgeWide;
  const p = input.ledgeHanging ? 0 : MathUtils.clamp(input.ledgeProgress, 0, 1);

  // Which pair of beats is in play, and how far between them.
  const second = p >= 0.45;
  const raw = second ? (p - 0.45) / 0.55 : p / 0.45;
  const t = raw * raw * (3 - 2 * raw);
  const mix = (hang: number, pull: number, stand: number) =>
    second ? MathUtils.lerp(pull, stand, t) : MathUtils.lerp(hang, pull, t);

  pose.bodyPitch = mix(0.1, wide ? 0.34 : 0.52, 0.05);
  pose.bodyHeight = mix(-0.04, -0.02, 0);
  pose.bodySquash = mix(1.02, 0.97, 1);
  pose.headPitch = mix(-0.3, -0.16, 0);

  // Over a wall the legs are not symmetrical: one swings across the top
  // first, which is what makes it read as going over rather than up.
  pose.hipLeft = mix(-0.16, wide ? -1.4 : -1.75, -0.24);
  pose.hipRight = mix(-0.16, wide ? -1.4 : -0.6, -0.24);
  pose.kneeLeft = mix(0.3, wide ? 1.85 : 1.95, 0.34);
  pose.kneeRight = mix(0.3, wide ? 1.85 : 0.9, 0.34);
  pose.ankleLeft = mix(0.2, 0.24, 0);
  pose.ankleRight = mix(0.2, 0.24, 0);
  pose.bodyRoll = wide ? 0 : mix(0, 0.18, 0);

  // Pushed rather than pulled. It is added on top of whatever beat the
  // climb has reached rather than replacing it, and it comes in from
  // nothing exactly as the extra height does, so a second press at any
  // point in the window joins the movement already running instead of
  // starting one of its own. He straightens up, drives the legs down
  // underneath him and lifts his chin, which is what a push off locked
  // arms looks like.
  const drive = MathUtils.clamp(input.ledgeBoost, 0, 1);
  if (drive > 0) {
    pose.bodyPitch -= drive * 0.3;
    pose.bodyHeight += drive * 0.05;
    pose.bodySquash = MathUtils.lerp(pose.bodySquash, 1.05, drive);
    pose.headPitch += drive * 0.26;
    pose.hipLeft = MathUtils.lerp(pose.hipLeft, 0.12, drive);
    pose.hipRight = MathUtils.lerp(pose.hipRight, 0.02, drive);
    pose.kneeLeft = MathUtils.lerp(pose.kneeLeft, 0.1, drive);
    pose.kneeRight = MathUtils.lerp(pose.kneeRight, 0.22, drive);
    pose.ankleLeft = MathUtils.lerp(pose.ankleLeft, -0.3, drive);
    pose.ankleRight = MathUtils.lerp(pose.ankleRight, -0.3, drive);
  }

  reachForTheEdge(input);
}

/**
 * Out of the water and onto the deck.
 *
 * It starts from wherever he is floating, which is the whole difference
 * between this and the ledge hang: there is no drop onto a hang first, so
 * the head never goes under. Reach, plant both hands, lift the chest over
 * the hands, then bring the knees up and stand.
 */
function poseWaterExit(input: AnimationInputs): void {
  const p = MathUtils.clamp(input.ledgeProgress, 0, 1);
  const second = p >= 0.5;
  const raw = second ? (p - 0.5) / 0.5 : p / 0.5;
  const t = raw * raw * (3 - 2 * raw);
  const mix = (reach: number, plant: number, out: number) =>
    second ? MathUtils.lerp(plant, out, t) : MathUtils.lerp(reach, plant, t);

  // Chin up throughout. The old version inherited the hang, which tipped him
  // forward and down before anything else happened.
  pose.bodyPitch = mix(0.26, 0.52, 0.06);
  pose.bodyHeight = mix(0.04, -0.02, 0);
  pose.bodySquash = mix(1.01, 0.96, 1);
  pose.headPitch = mix(-0.38, -0.22, 0);

  // Legs trailing in the water, then folded up underneath him.
  pose.hipLeft = mix(0.3, -1.5, -0.22);
  pose.hipRight = mix(0.22, -1.1, -0.22);
  pose.kneeLeft = mix(0.25, 1.9, 0.3);
  pose.kneeRight = mix(0.2, 1.4, 0.3);
  pose.ankleLeft = mix(-0.3, 0.2, 0);
  pose.ankleRight = mix(-0.3, 0.2, 0);

  reachForTheEdge(input);
}

/**
 * The step off the top of a ladder onto what it leads to.
 *
 * He is already holding the rungs at chest height, so there is nothing to
 * catch: one hand stays, the other goes flat on the surface, and a knee
 * comes up over the edge.
 */
function poseLadderTop(input: AnimationInputs): void {
  const p = MathUtils.clamp(input.ledgeProgress, 0, 1);
  const t = p * p * (3 - 2 * p);

  pose.bodyPitch = MathUtils.lerp(0.22, 0.08, t);
  pose.bodyHeight = MathUtils.lerp(-0.02, 0, t);
  pose.headPitch = MathUtils.lerp(-0.28, -0.05, t);
  pose.bodyRoll = Math.sin(p * Math.PI) * 0.1;

  // One leg drives up over the edge ahead of the other.
  pose.hipLeft = MathUtils.lerp(-1.5, -0.24, t);
  pose.hipRight = MathUtils.lerp(-0.35, -0.24, t);
  pose.kneeLeft = MathUtils.lerp(1.7, 0.3, t);
  pose.kneeRight = MathUtils.lerp(0.75, 0.3, t);
  pose.ankleLeft = MathUtils.lerp(0.2, 0, t);
  pose.ankleRight = MathUtils.lerp(0.25, 0, t);

  reachForTheEdge(input);
}

/**
 * Getting onto a ladder from the platform above it.
 *
 * The reverse of the step off the top, and it has to read as deliberate: he
 * turns, crouches at the edge, puts both hands on it and lowers his feet to
 * the rungs. The controller turns him through the move, so all this has to
 * do is the crouch and the hands.
 */
function poseLadderMount(input: AnimationInputs): void {
  const p = MathUtils.clamp(input.ledgeProgress, 0, 1);
  const crouch = Math.sin(MathUtils.clamp(p * 1.35, 0, 1) * Math.PI);

  pose.bodyPitch = 0.16 + crouch * 0.3;
  pose.bodyHeight = -crouch * 0.16;
  pose.headPitch = -0.1 - crouch * 0.2;

  pose.hipLeft = -crouch * 1.0;
  pose.hipRight = -crouch * 1.25;
  pose.kneeLeft = crouch * 1.5;
  pose.kneeRight = crouch * 1.85;
  pose.ankleLeft = -crouch * 0.5;
  pose.ankleRight = -crouch * 0.5;

  // Hands down on the edge he is lowering himself over, then onto the rungs.
  const hand = solveArm(
    MathUtils.lerp(-0.35, TUNING.ladderHandHigh, p),
    TUNING.ladderStandOff,
  );
  pose.shoulderLeftPitch = hand.shoulder;
  pose.shoulderRightPitch = hand.shoulder;
  pose.elbowLeft = hand.elbow;
  pose.elbowRight = hand.elbow;
  pose.shoulderLeftRoll = 0.26;
  pose.shoulderRightRoll = 0.26;
}

/**
 * Puts the hands on the edge and leaves them there.
 *
 * The arms used to be posed by angle like everything else, which meant the
 * hands travelled upward with the shoulders: he rose and his hands rose with
 * him, as though the edge were coming along too. Here the hand is the thing
 * that is decided — it stays where the edge is — and the shoulder and elbow
 * are worked out backwards from it. As the body climbs past its own hands
 * the arms straighten downward on their own, and once the shoulders are
 * higher than the edge by more than the length of an arm there is nothing
 * left to reach for and they come down to his sides. That is the release,
 * and it needs no separate animation.
 */
function reachForTheEdge(input: AnimationInputs): void {
  // Where the edge is, measured from the shoulder.
  const shoulderAboveFeet = SHOULDER_HEIGHT + pose.bodyHeight;
  const up = input.ledgeLift - shoulderAboveFeet;
  const ahead = TUNING.ledgeHandForward;

  const span = Math.hypot(up, ahead);
  const reach = ARM.upper + ARM.lower;
  if (span > reach - 0.01) {
    // Out of reach: the hands have left the edge, so the arms simply hang.
    const released = MathUtils.clamp((span - reach) / 0.3, 0, 1);
    pose.shoulderLeftPitch = MathUtils.lerp(pose.shoulderLeftPitch, -0.3, released);
    pose.shoulderRightPitch = MathUtils.lerp(pose.shoulderRightPitch, -0.3, released);
    pose.elbowLeft = MathUtils.lerp(pose.elbowLeft, -0.28, released);
    pose.elbowRight = MathUtils.lerp(pose.elbowRight, -0.28, released);
    if (released >= 1) return;
  }

  // Hands a little wider than the shoulders, as they would be on an edge.
  const solved = solveArmTo(TUNING.ledgeHandOut, up, ahead);
  pose.shoulderLeftPitch = solved.shoulder;
  pose.shoulderRightPitch = solved.shoulder;
  pose.elbowLeft = solved.elbow;
  pose.elbowRight = solved.elbow;
  pose.shoulderLeftRoll = solved.roll;
  pose.shoulderRightRoll = solved.roll;
}

/** How much of the hand-over-hand is showing: 0 at rest, 1 moving. */
let gripGain = 0;

/**
 * Moving along an edge, one hand at a time.
 *
 * Both hands used to slide along it together. The attempt after that lifted
 * the free hand and rolled the shoulder out, which reads as reaching
 * *upward*: an arm posed by angle alone can swing forward and back, so the
 * one direction the hand could not go was the direction he was travelling.
 *
 * This decides where each hand has to be — out along the edge — and solves
 * all three joints for it. One hand holds while the other lets go, drops
 * clear, travels a stride the way he is going and takes hold again; then
 * they swap. The holding hand is given a position that slides back along
 * his body exactly as fast as his body slides forward, so it stands
 * perfectly still on the edge while he moves underneath it. That stillness
 * is the whole thing: a hand that creeps is a hand that is not holding
 * anything.
 *
 * It writes to the blended pose rather than to the target, so nothing eases
 * the hands away from where they have to be. What does ease is how much of
 * it shows, which is what keeps starting and stopping from snapping.
 */
function handOverHand(input: AnimationInputs, ease: number): void {
  const wanted = input.state === 'ledge' && input.ledgeHanging && input.ledgeShimmy !== 0 ? 1 : 0;
  gripGain = MathUtils.lerp(gripGain, wanted, ease);
  if (gripGain < 0.002) {
    gripGain = 0;
    return;
  }

  // Where the edge is, measured from the shoulder, as the hang has it.
  const up = input.ledgeLift - (SHOULDER_HEIGHT + shown.bodyHeight);
  const ahead = TUNING.ledgeHandForward;

  // Which way along his own body he is going. His right is -x, so going to
  // his right is going toward -x.
  const travel = -Math.sign(input.ledgeShimmy) || 1;
  const cycle = input.ledgeGrip - Math.floor(input.ledgeGrip);

  // The weight hangs from whichever hand is holding, and crosses over as
  // they swap. Positive body roll tips him toward -x, so leaning onto the
  // hand at +x is a negative roll. Worked out before the hands, because
  // leaning the body swings them along the edge too, and a hand that is
  // supposed to be holding still cannot afford it: half of the creep left
  // in the first version of this was his own lean carrying his hands about.
  const weight = travel * Math.cos(cycle * Math.PI * 2) * gripGain;
  shown.bodyRoll -= weight * 0.085;
  const lean = Math.sin(shown.bodyRoll) * (ARM.shoulderY + up);
  // A quarter of a stride either side of the resting hold. Over half a
  // cycle his body covers exactly twice that, which is what lets a planted
  // hand stay put.
  const half = (TUNING.ledgeGripStride / 4) * gripGain;

  for (const sideX of [-1, 1] as const) {
    // The hand on the side he is heading for leads; the other follows it.
    const lead = sideX === travel;
    const u = lead ? cycle : (cycle + 0.5) % 1;
    const reaching = u >= 0.5;
    const t = reaching ? (u - 0.5) * 2 : u * 2;
    const ramp = t * t * (3 - 2 * t);

    // Where it sits along the edge, measured from its resting hold. Holding
    // on, it drifts back through his body at the speed his body advances;
    // reaching, it crosses a whole stride to its next hold.
    const along = half * (reaching ? -1 + 2 * ramp : 1 - 2 * t);
    // And how far off the edge it is while it travels.
    const clear = reaching ? Math.sin(t * Math.PI) * gripGain : 0;

    const solved = solveArmTo(
      // Sideways from the shoulder, measured away from his centre line,
      // and put back wherever the lean has just taken it.
      TUNING.ledgeHandOut + sideX * (travel * along + lean),
      up - clear * TUNING.ledgeGripLift,
      ahead - clear * TUNING.ledgeGripLift * 0.45,
    );
    if (sideX < 0) {
      shown.shoulderLeftPitch = solved.shoulder;
      shown.shoulderLeftRoll = solved.roll;
      shown.elbowLeft = solved.elbow;
    } else {
      shown.shoulderRightPitch = solved.shoulder;
      shown.shoulderRightRoll = solved.roll;
      shown.elbowRight = solved.elbow;
    }
  }

  // He turns a little into the way he is going, and looks that way.
  shown.bodyYaw += travel * 0.05 * gripGain;
  shown.headYaw += travel * 0.2 * gripGain;

  // And the legs hang and sway rather than staying still underneath him.
  const sway = Math.sin(cycle * Math.PI * 2) * gripGain;
  shown.hipLeft -= 0.09 * gripGain + sway * 0.07;
  shown.hipRight -= 0.09 * gripGain - sway * 0.07;
  shown.kneeLeft += 0.1 * gripGain - sway * 0.06;
  shown.kneeRight += 0.1 * gripGain + sway * 0.06;
}

/**
 * The crouch a move is wound up out of.
 *
 * The same shape the keyboard's own crouch has, because that is already the
 * pose a long jump and a backflip spring from, mixed in by how far the
 * button has been held. At nothing it changes nothing at all, so a tap looks
 * exactly as it always did.
 */
function gatherFor(input: AnimationInputs): void {
  const gather = MathUtils.clamp(input.windUp, 0, 1);
  if (gather <= 0.001) return;
  // Eased so the last part of the wind-up reads as settling rather than as
  // still going down.
  const d = gather * gather * (3 - 2 * gather) * 0.86;
  const to = (from: number, crouched: number) => MathUtils.lerp(from, crouched, d);

  pose.bodyPitch = to(pose.bodyPitch, 0.34);
  pose.bodyHeight = to(pose.bodyHeight, -0.2);
  pose.bodySquash = to(pose.bodySquash, 0.93);
  pose.headPitch = to(pose.headPitch, -0.3);
  pose.hipLeft = to(pose.hipLeft, -1.2);
  pose.hipRight = to(pose.hipRight, -1.2);
  pose.kneeLeft = to(pose.kneeLeft, 2);
  pose.kneeRight = to(pose.kneeRight, 2);
  pose.ankleLeft = to(pose.ankleLeft, -0.98);
  pose.ankleRight = to(pose.ankleRight, -0.98);
  // Arms back, ready to throw forward with the launch.
  pose.shoulderLeftPitch = to(pose.shoulderLeftPitch, 0.62);
  pose.shoulderRightPitch = to(pose.shoulderRightPitch, 0.62);
  pose.elbowLeft = to(pose.elbowLeft, -0.5);
  pose.elbowRight = to(pose.elbowRight, -0.5);
  pose.shoulderLeftRoll = to(pose.shoulderLeftRoll, 0.3);
  pose.shoulderRightRoll = to(pose.shoulderRightRoll, 0.3);
}

const solvedArm = { shoulder: 0, elbow: 0 };

/**
 * The shoulder and elbow that put the hand `up` above the shoulder and
 * `ahead` in front of it.
 *
 * Posing an arm by angle and hoping the hand lands somewhere useful is what
 * made the ladder look like semaphore: the arms were put at a fixed angle
 * and the rungs were simply wherever they were. Decide where the hand goes
 * and the angles follow from it.
 */
function solveArm(up: number, ahead: number): typeof solvedArm {
  const reach = ARM.upper + ARM.lower;
  const distance = MathUtils.clamp(Math.hypot(up, ahead), 0.1, reach - 0.012);

  // Direction from the shoulder to the hand, in the measure the joints use:
  // zero hangs straight down, and a negative angle swings the arm forward.
  const direction = Math.atan2(-ahead, -up);

  const atShoulder = Math.acos(
    MathUtils.clamp(
      (ARM.upper * ARM.upper + distance * distance - ARM.lower * ARM.lower) /
        (2 * ARM.upper * distance),
      -1,
      1,
    ),
  );
  const atElbow = Math.acos(
    MathUtils.clamp(
      (ARM.upper * ARM.upper + ARM.lower * ARM.lower - distance * distance) /
        (2 * ARM.upper * ARM.lower),
      -1,
      1,
    ),
  );

  // The elbow bends the opposite way to a knee, so the triangle is closed
  // from the other side.
  solvedArm.shoulder = direction + atShoulder;
  solvedArm.elbow = -(Math.PI - atElbow);
  return solvedArm;
}

const solvedArm3 = { shoulder: 0, roll: 0, elbow: 0 };

/**
 * The same, with the third direction: the shoulder, its roll and the elbow
 * that put the hand `out` to the side of the shoulder, `up` above it and
 * `ahead` in front of it.
 *
 * `out` is measured away from his centre line, so the same positive number
 * means "outward" for either arm — the rig already flips the roll between
 * them. The rig rolls the shoulder first and swings it second, so the roll
 * is read off the sideways distance and the swing off whatever is left.
 */
function solveArmTo(out: number, up: number, ahead: number): typeof solvedArm3 {
  const reach = ARM.upper + ARM.lower;
  const distance = MathUtils.clamp(Math.hypot(out, up, ahead), 0.1, reach - 0.012);

  // How far away the hand is decides the elbow, exactly as it does in the
  // plane: the two bones and the line to the hand are a triangle.
  const atElbow = Math.acos(
    MathUtils.clamp(
      (ARM.upper * ARM.upper + ARM.lower * ARM.lower - distance * distance) /
        (2 * ARM.upper * ARM.lower),
      -1,
      1,
    ),
  );
  const elbow = -(Math.PI - atElbow);

  // With the elbow bent that far, the hand sits `down` below the shoulder
  // and `out of line` behind it, before the shoulder has turned at all.
  const down = -(ARM.upper - ARM.lower * Math.cos(atElbow));
  const back = ARM.lower * Math.sin(atElbow);

  // Roll takes it sideways...
  const roll = Math.asin(MathUtils.clamp(out / Math.max(-down, 1e-4), -1, 1));
  // ...and the swing puts what is left of it where it has to be.
  const level = down * Math.cos(roll);

  solvedArm3.roll = roll;
  solvedArm3.elbow = elbow;
  solvedArm3.shoulder = Math.atan2(ahead, up) - Math.atan2(back, level);
  return solvedArm3;
}

/**
 * On a ladder: opposite hand and foot together, the way anyone climbs, with
 * the cycle driven by how far he has gone up it rather than by a clock. Stop
 * halfway and he stops halfway, which is the whole point of driving it by
 * distance.
 */
function poseClimb(input: AnimationInputs): void {
  climbPhase += input.climbSpeed * input.delta * 2.6;
  const reach = Math.sin(climbPhase);

  // He leans in and out of each pull, and the hips swing with whichever
  // hand is reaching, so it reads as pushing up the ladder rather than
  // sliding up it.
  pose.bodyPitch = 0.12 + Math.abs(reach) * 0.06;
  pose.headPitch = -0.24;
  pose.bodyRoll = reach * 0.11;
  pose.bodyYaw = reach * 0.14;
  pose.bodyHeight = -0.04 + Math.abs(reach) * 0.05;

  // The hands are put on rungs rather than the arms put at angles. One is
  // always higher than the other, both at the distance the ladder sits in
  // front of him, and the shoulder and elbow follow from there. Posed by
  // angle instead, the arms pointed off into open air beside the ladder.
  const ahead = TUNING.ladderStandOff;
  const swap = (reach + 1) * 0.5;
  const left = solveArm(
    MathUtils.lerp(TUNING.ladderHandLow, TUNING.ladderHandHigh, swap),
    ahead,
  );
  pose.shoulderLeftPitch = left.shoulder;
  pose.elbowLeft = left.elbow;
  const right = solveArm(
    MathUtils.lerp(TUNING.ladderHandHigh, TUNING.ladderHandLow, swap),
    ahead,
  );
  pose.shoulderRightPitch = right.shoulder;
  pose.elbowRight = right.elbow;
  // Hands out on the rails rather than together in the middle.
  pose.shoulderLeftRoll = 0.26;
  pose.shoulderRightRoll = 0.26;

  // Feet on the rungs, opposite to the hands: the leg under the reaching
  // arm drives straight while the other folds up to the next rung.
  pose.hipLeft = -0.34 - Math.max(0, -reach) * 1.15;
  pose.hipRight = -0.34 - Math.max(0, reach) * 1.15;
  pose.kneeLeft = 0.34 + Math.max(0, -reach) * 1.4;
  pose.kneeRight = 0.34 + Math.max(0, reach) * 1.4;
  pose.ankleLeft = 0.3 - Math.max(0, reach) * 0.35;
  pose.ankleRight = 0.3 - Math.max(0, -reach) * 0.35;
}

function poseAir(input: AnimationInputs): void {
  const rising = input.verticalSpeed > 0.5;

  if (input.againstWall && !rising) {
    // Caught on a wall and sliding down it, facing out, one leg braced
    // against the surface.
    pose.bodyPitch = -0.1;
    pose.shoulderLeftPitch = -0.5;
    pose.shoulderRightPitch = -0.5;
    pose.shoulderLeftRoll = 1.0;
    pose.shoulderRightRoll = 1.0;
    pose.elbowLeft = -0.9;
    pose.elbowRight = -0.9;
    pose.hipLeft = -0.85;
    pose.hipRight = -0.2;
    pose.kneeLeft = 0.9;
    pose.kneeRight = 0.3;
    pose.ankleLeft = 0.1;
    pose.ankleRight = 0.1;
    pose.headPitch = -0.12;
    return;
  }

  if (input.poundPhase === 'hover') {
    // Hanging still, turned over, knees coming up under him before the drop.
    pose.bodyPitch = 0.5;
    pose.shoulderLeftPitch = -2.3;
    pose.shoulderRightPitch = -2.3;
    pose.shoulderLeftRoll = 0.9;
    pose.shoulderRightRoll = 0.9;
    pose.elbowLeft = -1.1;
    pose.elbowRight = -1.1;
    pose.hipLeft = -1.7;
    pose.hipRight = -1.7;
    pose.kneeLeft = 2;
    pose.kneeRight = 2;
    pose.bodySquash = 0.94;
    pose.headPitch = -0.3;
    return;
  }

  if (input.poundPhase === 'slam') {
    // Sitting on the way down, legs out in front, which is what puts his
    // weight where the landing happens.
    pose.bodyPitch = -0.55;
    pose.bodyHeight = -0.05;
    pose.shoulderLeftPitch = -1.5;
    pose.shoulderRightPitch = -1.5;
    pose.shoulderLeftRoll = 0.75;
    pose.shoulderRightRoll = 0.75;
    pose.elbowLeft = -0.4;
    pose.elbowRight = -0.4;
    pose.hipLeft = -1.95;
    pose.hipRight = -1.95;
    pose.kneeLeft = 0.5;
    pose.kneeRight = 0.5;
    pose.ankleLeft = -0.3;
    pose.ankleRight = -0.3;
    pose.bodySquash = 1.06;
    pose.headPitch = 0.15;
    return;
  }

  if (input.jumpKind === 'side') {
    // Tucked for the side flip, arms in, so the rotation over his shoulder
    // is readable rather than a figure waving its limbs.
    pose.shoulderLeftPitch = -1.3;
    pose.shoulderRightPitch = -1.3;
    pose.shoulderLeftRoll = 0.55;
    pose.shoulderRightRoll = 0.55;
    pose.elbowLeft = -1.5;
    pose.elbowRight = -1.5;
    pose.hipLeft = -1.25;
    pose.hipRight = -1.25;
    pose.kneeLeft = 1.6;
    pose.kneeRight = 1.6;
    pose.ankleLeft = 0.3;
    pose.ankleRight = 0.3;
    pose.bodySquash = 1.03;
    return;
  }

  if (input.jumpKind === 'long') {
    // Stretched out flat and reaching, legs trailing. The silhouette is the
    // whole point of a long jump: it should be unmistakable from a distance
    // that this is the fast low one and not an ordinary hop.
    pose.bodyPitch = 0.92;
    pose.bodyHeight = -0.06;
    pose.shoulderLeftPitch = -2.5;
    pose.shoulderRightPitch = -2.5;
    pose.shoulderLeftRoll = 0.16;
    pose.shoulderRightRoll = 0.16;
    pose.elbowLeft = -0.12;
    pose.elbowRight = -0.12;
    pose.hipLeft = 0.55;
    pose.hipRight = 0.42;
    pose.kneeLeft = 0.5;
    pose.kneeRight = 0.68;
    pose.ankleLeft = 0.42;
    pose.ankleRight = 0.42;
    pose.headPitch = -0.55;
    pose.bodySquash = 1.03;
    return;
  }

  if (input.jumpKind === 'back') {
    // Tucked for the backflip, but arms thrown up rather than wrapped round
    // the knees, so it reads as going over backwards rather than curling up.
    pose.shoulderLeftPitch = 1.9;
    pose.shoulderRightPitch = 1.9;
    pose.shoulderLeftRoll = 0.3;
    pose.shoulderRightRoll = 0.3;
    pose.elbowLeft = -0.5;
    pose.elbowRight = -0.5;
    pose.hipLeft = -1.5;
    pose.hipRight = -1.5;
    pose.kneeLeft = 1.75;
    pose.kneeRight = 1.75;
    pose.ankleLeft = 0.3;
    pose.ankleRight = 0.3;
    pose.headPitch = 0.2;
    pose.bodySquash = 1.05;
    return;
  }

  if (input.jumpKind === 'wall' && rising) {
    // Coming off the wall: one knee driven up, the other leg still extended
    // from the push, arms wide.
    pose.bodyPitch = 0.16;
    pose.shoulderLeftPitch = -1.9;
    pose.shoulderRightPitch = -0.9;
    pose.shoulderLeftRoll = 0.6;
    pose.shoulderRightRoll = 0.75;
    pose.elbowLeft = -0.5;
    pose.elbowRight = -0.3;
    pose.hipLeft = -1.3;
    pose.hipRight = 0.45;
    pose.kneeLeft = 1.35;
    pose.kneeRight = 0.25;
    pose.ankleLeft = 0.2;
    pose.ankleRight = 0.4;
    pose.headPitch = -0.1;
    return;
  }


  // The third jump of a combo is a somersault. The rotation itself is applied
  // to the rig separately; this is the tuck that goes with it.
  if (input.flipping) {
    pose.shoulderLeftPitch = -2.75;
    pose.shoulderRightPitch = -2.75;
    pose.shoulderLeftRoll = 0.15;
    pose.shoulderRightRoll = 0.15;
    pose.elbowLeft = -1.5;
    pose.elbowRight = -1.5;
    pose.hipLeft = -1.3;
    pose.hipRight = -1.3;
    pose.kneeLeft = 1.9;
    pose.kneeRight = 1.9;
    pose.ankleLeft = 0.5;
    pose.ankleRight = 0.5;
    pose.bodySquash = 1.04;
    return;
  }

  if (rising) {
    // Take-off: arms up, thighs drawn forward, heels tucked up behind. The
    // second jump of a combo throws the arms higher and tucks harder.
    const emphasis = input.jumpStage === 2 ? 1.25 : 1;
    pose.shoulderLeftPitch = -2.5 * emphasis;
    pose.shoulderRightPitch = -2.5 * emphasis;
    pose.shoulderLeftRoll = 0.22;
    pose.shoulderRightRoll = 0.22;
    pose.elbowLeft = -0.35 * emphasis;
    pose.elbowRight = -0.35 * emphasis;
    pose.hipLeft = -0.55 * emphasis;
    pose.hipRight = -0.3 * emphasis;
    pose.kneeLeft = 1.05 * emphasis;
    pose.kneeRight = 0.6 * emphasis;
    pose.ankleLeft = 0.5;
    pose.ankleRight = 0.42;
    pose.bodyPitch = 0.12;
    pose.bodySquash = 1.06;
    pose.headPitch = -0.1;
  } else {
    // Falling: arms out for balance, legs reaching for the ground.
    const fall = MathUtils.clamp(-input.verticalSpeed / 16, 0, 1);
    pose.shoulderLeftPitch = -1.1 - fall * 0.5;
    pose.shoulderRightPitch = -1.1 - fall * 0.5;
    pose.shoulderLeftRoll = 0.75 + fall * 0.3;
    pose.shoulderRightRoll = 0.75 + fall * 0.3;
    pose.elbowLeft = -0.5;
    pose.elbowRight = -0.5;
    pose.hipLeft = -0.26 + fall * 0.2;
    pose.hipRight = 0.16;
    pose.kneeLeft = 0.4;
    pose.kneeRight = 0.18;
    // Toes come up to meet the ground on the way down.
    pose.ankleLeft = -0.22;
    pose.ankleRight = -0.18;
    pose.bodyPitch = -0.06 - fall * 0.08;
    pose.bodySquash = 1 + fall * 0.04;
    pose.headPitch = fall * 0.12;
  }
}

/**
 * How far through the swimming cycle he is, and how much he is actually
 * swimming rather than treading.
 *
 * Both are carried between frames rather than computed from the clock. The
 * phase is accumulated so that the rate can change — a stroke speeds it up —
 * without the arms jumping to a different point in the cycle. The drive is
 * eased so that starting and stopping is a swimmer settling into a stroke
 * rather than two poses swapping over.
 */
let swimPhase = 0;
let swimDrive = 0;

/**
 * One arm of an alternating stroke, as a shoulder, an elbow and a roll.
 *
 * The cycle is in two halves. The first is the pull: the hand enters ahead
 * of the head and sweeps through to the hip, which in this rig means the
 * shoulder swinging from nearly all the way forward back to hanging. The
 * second is the recovery, which goes back the other way with the elbow high
 * and the arm carried out to the side, clear of the water.
 */
const strokeArm = { shoulder: 0, elbow: 0, roll: 0 };
function armStroke(phase: number, width: number): typeof strokeArm {
  const cycle = phase - Math.floor(phase);
  if (cycle < 0.5) {
    const s = cycle / 0.5;
    const ease = s * s * (3 - 2 * s);
    strokeArm.shoulder = MathUtils.lerp(-2.78, -0.18, ease);
    strokeArm.elbow = -0.95 * Math.sin(s * Math.PI);
    strokeArm.roll = 0.2 + Math.sin(s * Math.PI) * 0.2 * width;
  } else {
    const r = (cycle - 0.5) / 0.5;
    const ease = r * r * (3 - 2 * r);
    strokeArm.shoulder = MathUtils.lerp(-0.18, -2.78, ease);
    // High elbow, arm carried wide: that is what makes a recovery read as a
    // recovery rather than as the pull running backwards.
    strokeArm.elbow = -1.35 * Math.sin(r * Math.PI);
    strokeArm.roll = 0.26 + Math.sin(r * Math.PI) * (0.78 * width);
  }
  return strokeArm;
}

/**
 * Three ways of being in water, blended by how hard he is swimming.
 *
 * At the surface and moving it is a front crawl: alternating arms, a bent
 * elbow over the water on the recovery, and a flutter kick underneath.
 * Submerged it is a butterfly: both arms together, the body undulating and
 * the legs kicking as one. Still at the surface he treads water, hands by
 * his hips sculling downward and his head clear of it.
 */
function poseSwim(input: AnimationInputs): void {
  // How much of a swimmer he is this frame. A stroke counts as swimming
  // even before he has picked up any speed, so the first stroke from a
  // standstill is a stroke rather than a twitch of the treading pose.
  const stroking = input.strokeProgress < 1;
  const moving = MathUtils.clamp(input.speed / 1.5, 0, 1);
  // Underwater it is how fast he is going in any direction, straight up and
  // down included. It used to be simply "one" down there, because he was
  // never still: something was always floating him. Now he can hang at a
  // depth, and a man hanging at a depth is not doing the butterfly.
  const going = MathUtils.clamp(Math.hypot(input.speed, input.verticalSpeed) / 1.5, 0, 1);
  const target = Math.max(input.submerged ? going : moving, stroking ? 1 : 0);
  swimDrive = MathUtils.lerp(swimDrive, target, 1 - Math.exp(-6 * input.delta));

  // One accumulated clock. A stroke drives it along faster, which is what
  // ties the push the controller gives to the arm that appears to give it.
  const rate = (input.submerged ? 0.62 : 0.72) + swimDrive * 0.5 + (stroking ? 0.85 : 0);
  swimPhase += input.delta * rate;

  if (input.submerged) {
    poseButterfly(input);
    return;
  }

  // Treading and crawling are posed together and mixed, rather than swapped,
  // so that pushing off from a float is one movement.
  const d = swimDrive;
  const mix = (tread: number, crawl: number) => MathUtils.lerp(tread, crawl, d);

  // ---- Treading ----------------------------------------------------------
  // Small sculling figures-of-eight by his hips, not sideways arm pumps.
  const scull = Math.sin(swimPhase * Math.PI * 2.6);
  const treadShoulder = -0.52 - scull * 0.1;
  const treadElbow = -1.2 - Math.abs(scull) * 0.16;
  const treadRoll = 0.5 + scull * 0.07;
  const eggbeater = Math.sin(swimPhase * Math.PI * 2);

  // ---- Front crawl -------------------------------------------------------
  const left = armStroke(swimPhase, 1);
  const leftShoulder = left.shoulder;
  const leftElbow = left.elbow;
  const leftRoll = left.roll;
  const right = armStroke(swimPhase + 0.5, 1);
  const flutter = Math.sin(swimPhase * Math.PI * 6);

  // Upright and low when treading, and angled rather than flat when
  // swimming: head out of the water, chest under it, feet trailing well
  // below. Flat out at 1.3 he planed across the surface like a board with
  // his legs at the top of it, which is not how anyone swims and not what
  // the water looks like it should do to him.
  pose.bodyPitch = mix(0.1, 1.02);
  pose.bodyHeight = mix(0.02, 0.36);
  pose.bodyRoll = mix(0, Math.sin(swimPhase * Math.PI * 2) * 0.22);
  // Chin up. He is lower in the water now, so keeping his face out of it is
  // the difference between swimming and drowning quietly.
  pose.headPitch = mix(-0.3, -0.66);

  pose.shoulderLeftPitch = mix(treadShoulder, leftShoulder);
  pose.shoulderRightPitch = mix(treadShoulder, right.shoulder);
  pose.elbowLeft = mix(treadElbow, leftElbow);
  pose.elbowRight = mix(treadElbow, right.elbow);
  pose.shoulderLeftRoll = mix(treadRoll, leftRoll);
  pose.shoulderRightRoll = mix(treadRoll, right.roll);

  // Legs down, not tucked. Treading with the knees up by the chest reads as
  // curling into a ball; the kick that actually holds a person up is taken
  // with the thighs hanging and the shins sweeping under them.
  pose.hipLeft = mix(-0.46 - eggbeater * 0.26, -0.12 + flutter * 0.3);
  pose.hipRight = mix(-0.46 + eggbeater * 0.26, -0.12 - flutter * 0.3);
  pose.kneeLeft = mix(0.72 + Math.max(0, eggbeater) * 0.45, 0.2 + Math.max(0, -flutter) * 0.3);
  pose.kneeRight = mix(0.72 + Math.max(0, -eggbeater) * 0.45, 0.2 + Math.max(0, flutter) * 0.3);
  pose.ankleLeft = mix(0.26, -0.32);
  pose.ankleRight = mix(0.26, -0.32);
}

/**
 * Underwater: a butterfly, both arms together and the legs kicking as one.
 *
 * The body undulates with the kick rather than holding still, because the
 * undulation is the stroke — arms moving in front of a rigid body is the
 * thing that reads as waving rather than swimming.
 */
function poseButterfly(input: AnimationInputs): void {
  const arm = armStroke(swimPhase, 0.55);
  const wave = Math.sin(swimPhase * Math.PI * 2);
  const kick = Math.sin(swimPhase * Math.PI * 2 - 0.7);

  // Swimming, against holding still. Still, he hangs in the water a little
  // head-up with his arms out in front of him sculling and his legs barely
  // ticking over; the stroke comes in as he picks up speed and goes out as
  // he loses it, so setting off and stopping are the same pose doing more
  // or less rather than one pose swapped for another.
  const d = swimDrive;
  const mix = (still: number, swim: number) => MathUtils.lerp(still, swim, d);
  const scull = Math.sin(swimPhase * Math.PI * 2.4);

  // A quarter turn is exactly horizontal, so level swimming sits just under
  // it and he tips either side of that to point the way he is actually
  // travelling: nose down into a dive, nose up on the way back to the
  // surface. It used to be one of two fixed angles depending on whether the
  // dive button was held, which said nothing about where he was going as
  // soon as where he was going became a thing you could steer.
  const aim = MathUtils.clamp(input.swimAim, -1, 1);
  pose.bodyPitch = mix(1.02 + wave * 0.03, 1.3 + aim * 0.62 + wave * 0.14);
  pose.bodyHeight = 0.26;
  pose.bodyRoll = 0;

  pose.shoulderLeftPitch = mix(-1.25 - scull * 0.06, arm.shoulder);
  pose.shoulderRightPitch = mix(-1.25 + scull * 0.06, arm.shoulder);
  pose.elbowLeft = mix(-0.55 - Math.abs(scull) * 0.12, arm.elbow);
  pose.elbowRight = mix(-0.55 - Math.abs(scull) * 0.12, arm.elbow);
  pose.shoulderLeftRoll = mix(0.72 + scull * 0.16, arm.roll);
  pose.shoulderRightRoll = mix(0.72 + scull * 0.16, arm.roll);

  // Dolphin kick: the legs stay together and the whole lower body drives.
  pose.hipLeft = mix(0.32 + kick * 0.1, 0.1 + kick * 0.42);
  pose.hipRight = mix(0.32 - kick * 0.1, 0.1 + kick * 0.42);
  pose.kneeLeft = mix(0.5 + Math.max(0, -kick) * 0.2, 0.25 + Math.max(0, -kick) * 0.85);
  pose.kneeRight = mix(0.5 + Math.max(0, kick) * 0.2, 0.25 + Math.max(0, -kick) * 0.85);
  pose.ankleLeft = mix(-0.35, -0.3 - kick * 0.2);
  pose.ankleRight = mix(-0.35, -0.3 - kick * 0.2);

  // Chin toward where he is going, within reason.
  pose.headPitch = mix(-0.32, -0.5 - wave * 0.1 - aim * 0.12);
}

function applyCarry(): void {
  // Both arms come forward and stay there; the gait keeps going underneath.
  pose.shoulderLeftPitch = -1.52;
  pose.shoulderRightPitch = -1.52;
  pose.shoulderLeftRoll = 0.3;
  pose.shoulderRightRoll = 0.3;
  pose.elbowLeft = -0.35;
  pose.elbowRight = -0.35;
  pose.bodyPitch = Math.max(pose.bodyPitch, 0) + 0.06;
}

function applyLandingSquash(): void {
  pose.bodySquash = 0.82;
  pose.bodyHeight = -0.12;
  pose.hipLeft = -0.6;
  pose.hipRight = -0.6;
  pose.kneeLeft = 1.05;
  pose.kneeRight = 1.05;
  pose.ankleLeft = -0.3;
  pose.ankleRight = -0.3;
  pose.shoulderLeftPitch = -0.45;
  pose.shoulderRightPitch = -0.45;
  pose.shoulderLeftRoll = 0.55;
  pose.shoulderRightRoll = 0.55;
}
