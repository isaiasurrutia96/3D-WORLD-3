/**
 * Procedural animation for the character rig.
 *
 * Nothing here is a baked clip: every pose is computed from the character's
 * speed, state and a running clock, then eased toward so that changes of state
 * blend instead of snapping. That keeps the character responsive — the legs
 * answer the stick immediately rather than waiting for a clip to loop.
 */

import { MathUtils } from 'three';
import type { CharacterRig } from './PlayerModel.ts';
import type { MovementState } from './Player.ts';

export interface AnimationInputs {
  time: number;
  delta: number;
  state: MovementState;
  speed: number;
  maxSpeed: number;
  verticalSpeed: number;
  skidding: boolean;
  landing: boolean;
  carrying: boolean;
  submerged: boolean;
  /** True while the dive control is held. */
  diving: boolean;
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
  const rate = input.state === 'air' ? 16 : 13;
  const blend = 1 - Math.exp(-rate * input.delta);

  if (!initialised) {
    Object.assign(current, pose);
    initialised = true;
  } else {
    for (const key of Object.keys(pose) as Array<keyof Pose>) {
      current[key] = MathUtils.lerp(current[key], pose[key], blend);
    }
  }

  rig.body.rotation.set(current.bodyPitch, current.bodyYaw, current.bodyRoll);
  rig.body.position.y = current.bodyHeight;
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

function poseAir(input: AnimationInputs): void {
  const rising = input.verticalSpeed > 0.5;

  if (rising) {
    // Take-off: arms up, thighs drawn forward, heels tucked up behind.
    pose.shoulderLeftPitch = -2.5;
    pose.shoulderRightPitch = -2.5;
    pose.shoulderLeftRoll = 0.22;
    pose.shoulderRightRoll = 0.22;
    pose.elbowLeft = -0.35;
    pose.elbowRight = -0.35;
    pose.hipLeft = -0.55;
    pose.hipRight = -0.3;
    pose.kneeLeft = 1.05;
    pose.kneeRight = 0.6;
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
