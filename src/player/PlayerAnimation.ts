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
import type { JumpKind, MovementState, PoundPhase } from './Player.ts';

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
  /** True when the climb is onto a roof rather than over the top of a wall. */
  ledgeWide: boolean;
  /** True while he is holding the edge, waiting for the jump button. */
  ledgeHanging: boolean;
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

  // The somersault is added after blending. Easing toward it like any other
  // pose value would smooth a full rotation into almost no rotation at all.
  // A somersault and a backflip turn him head over heels; a side flip takes
  // him over his own shoulder, which is a different axis of the same body.
  const pitchFlip = input.flipAxis === 'pitch' ? input.flipAngle : 0;
  const rollFlip = input.flipAxis === 'roll' ? input.flipAngle : 0;
  rig.body.rotation.set(
    current.bodyPitch + pitchFlip,
    current.bodyYaw,
    current.bodyRoll + rollFlip,
  );
  rig.body.position.y = HIP_HEIGHT + current.bodyHeight;
  rig.body.scale.set(
    1 / Math.sqrt(current.bodySquash),
    current.bodySquash,
    1 / Math.sqrt(current.bodySquash),
  );

  rig.head.rotation.set(current.headPitch, current.headYaw, 0);

  // Rotating a downward-hanging arm about +Z swings it toward +X, so the left
  // arm needs a negative roll and the right a positive one to move *away*
  // from the body. With the signs the other way round, every increase in roll
  // tucked both arms further into the torso.
  rig.shoulderLeft.rotation.set(current.shoulderLeftPitch, 0, -current.shoulderLeftRoll);
  rig.shoulderRight.rotation.set(current.shoulderRightPitch, 0, current.shoulderRightRoll);
  rig.elbowLeft.rotation.x = current.elbowLeft;
  rig.elbowRight.rotation.x = current.elbowRight;

  rig.hipLeft.rotation.x = current.hipLeft;
  rig.hipRight.rotation.x = current.hipRight;
  rig.kneeLeft.rotation.x = current.kneeLeft;
  rig.kneeRight.rotation.x = current.kneeRight;
  rig.ankleLeft.rotation.x = current.ankleLeft;
  rig.ankleRight.rotation.x = current.ankleRight;
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

  reachForTheEdge(input);
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

  const distance = MathUtils.clamp(span, 0.1, reach - 0.012);
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
  const shoulderPitch = direction + atShoulder;
  const elbowBend = -(Math.PI - atElbow);

  pose.shoulderLeftPitch = shoulderPitch;
  pose.shoulderRightPitch = shoulderPitch;
  pose.elbowLeft = elbowBend;
  pose.elbowRight = elbowBend;
  // Hands a little wider than the shoulders, as they would be on an edge.
  pose.shoulderLeftRoll = 0.14;
  pose.shoulderRightRoll = 0.14;
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

  pose.bodyPitch = 0.06;
  pose.headPitch = -0.2;
  pose.bodyRoll = reach * 0.04;

  // Arms overhead on the rungs, one higher than the other.
  pose.shoulderLeftPitch = -2.55 + reach * 0.3;
  pose.shoulderRightPitch = -2.55 - reach * 0.3;
  pose.shoulderLeftRoll = 0.3;
  pose.shoulderRightRoll = 0.3;
  pose.elbowLeft = -0.55 - Math.max(0, reach) * 0.5;
  pose.elbowRight = -0.55 - Math.max(0, -reach) * 0.5;

  // Legs opposite to the hands.
  pose.hipLeft = -0.45 - Math.max(0, -reach) * 0.65;
  pose.hipRight = -0.45 - Math.max(0, reach) * 0.65;
  pose.kneeLeft = 0.55 + Math.max(0, -reach) * 0.75;
  pose.kneeRight = 0.55 + Math.max(0, reach) * 0.75;
  pose.ankleLeft = 0.2;
  pose.ankleRight = 0.2;
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

function poseSwim(input: AnimationInputs): void {
  if (input.submerged) {
    // Prone and face-down. A quarter turn (1.57) is exactly horizontal, so
    // swimming forward sits just under it and a dive goes past it, angling
    // the head downward in the direction the character is actually moving.
    pose.bodyPitch = input.diving ? 1.85 : 1.26;
    pose.bodyHeight = 0.26;

    // A breaststroke that runs continuously, so the character is always
    // swimming rather than drifting with their arms held still. Taking a
    // stroke takes over the cycle and deepens it.
    const stroking = input.strokeProgress < 1;
    const cycle = stroking ? input.strokeProgress : (input.time * 0.72) % 1;
    const amplitude = stroking ? 1 : 0.5;
    const pull = Math.sin(cycle * Math.PI) * amplitude;

    // Arms reach forward, sweep out and back, then recover.
    pose.shoulderLeftPitch = -2.45 + pull * 1.5;
    pose.shoulderRightPitch = -2.45 + pull * 1.5;
    pose.shoulderLeftRoll = 0.28 + pull * 1.0;
    pose.shoulderRightRoll = 0.28 + pull * 1.0;
    pose.elbowLeft = -0.25 - pull * 0.85;
    pose.elbowRight = -0.25 - pull * 0.85;

    // Legs flutter continuously, a little behind the arms.
    const kick = Math.sin(input.time * 4.6);
    pose.hipLeft = kick * 0.4;
    pose.hipRight = -kick * 0.4;
    pose.kneeLeft = Math.max(0, kick) * 0.8;
    pose.kneeRight = Math.max(0, -kick) * 0.8;

    // Looking ahead along the direction of travel rather than at the bottom.
    pose.headPitch = -0.62;
  } else {
    // Treading water: upright, head and shoulders clear, arms sculling.
    pose.bodyPitch = 0.16;
    pose.bodyHeight = 0.05;

    const scull = Math.sin(input.time * 3.2);
    pose.shoulderLeftPitch = -1.3 + scull * 0.4;
    pose.shoulderRightPitch = -1.3 - scull * 0.4;
    pose.shoulderLeftRoll = 0.9;
    pose.shoulderRightRoll = 0.9;
    pose.elbowLeft = -0.9 - Math.max(0, scull) * 0.3;
    pose.elbowRight = -0.9 - Math.max(0, -scull) * 0.3;

    // A slow scissor kick underneath.
    const kick = Math.sin(input.time * 2.6);
    pose.hipLeft = -0.55 + kick * 0.3;
    pose.hipRight = -0.55 - kick * 0.3;
    pose.kneeLeft = 0.75 + Math.max(0, kick) * 0.4;
    pose.kneeRight = 0.75 + Math.max(0, -kick) * 0.4;

    pose.headPitch = -0.1;
  }
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
