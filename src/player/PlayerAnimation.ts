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
}

const pose: Pose = createPose();
const current: Pose = createPose();
let initialised = false;

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

  rig.shoulderLeft.rotation.set(current.shoulderLeftPitch, 0, current.shoulderLeftRoll);
  rig.shoulderRight.rotation.set(current.shoulderRightPitch, 0, -current.shoulderRightRoll);
  rig.elbowLeft.rotation.x = current.elbowLeft;
  rig.elbowRight.rotation.x = current.elbowRight;

  rig.hipLeft.rotation.x = current.hipLeft;
  rig.hipRight.rotation.x = current.hipRight;
  rig.kneeLeft.rotation.x = current.kneeLeft;
  rig.kneeRight.rotation.x = current.kneeRight;
}

function buildTargetPose(input: AnimationInputs): void {
  reset(pose);

  switch (input.state) {
    case 'swim':
      poseSwim(input);
      break;
    case 'climb':
      poseClimb(input);
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
  target.shoulderLeftRoll = 0.12;
  target.shoulderRightRoll = 0.12;
  target.elbowLeft = 0;
  target.elbowRight = 0;
  target.hipLeft = 0;
  target.hipRight = 0;
  target.kneeLeft = 0;
  target.kneeRight = 0;
}

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
    pose.hipLeft = 0.55;
    pose.hipRight = -0.35;
    pose.kneeLeft = -0.5;
    pose.kneeRight = -0.2;
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
    pose.elbowLeft = -0.12;
    pose.elbowRight = -0.12;
    return;
  }

  // Stride frequency rises with speed, but not linearly: a run has longer
  // strides as well as faster ones.
  const stride = 2.6 + normalised * 5.4;
  const phase = input.time * stride;
  const swing = Math.sin(phase);
  const counterSwing = Math.sin(phase + Math.PI);

  const legAmplitude = MathUtils.lerp(0.42, 1.0, normalised);
  const armAmplitude = MathUtils.lerp(0.3, 0.95, normalised);

  pose.hipLeft = swing * legAmplitude;
  pose.hipRight = counterSwing * legAmplitude;
  // Knees only bend on the backswing, which is what stops a walk looking like
  // a pair of scissors.
  pose.kneeLeft = -Math.max(0, -swing) * legAmplitude * 1.15;
  pose.kneeRight = -Math.max(0, -counterSwing) * legAmplitude * 1.15;

  pose.shoulderLeftPitch = counterSwing * armAmplitude;
  pose.shoulderRightPitch = swing * armAmplitude;
  pose.elbowLeft = -Math.max(0, counterSwing) * armAmplitude * 0.75 - 0.18;
  pose.elbowRight = -Math.max(0, swing) * armAmplitude * 0.75 - 0.18;
  pose.shoulderLeftRoll = 0.1 + normalised * 0.06;
  pose.shoulderRightRoll = 0.1 + normalised * 0.06;

  // Lean into the run, bob twice per stride, and roll slightly with each step.
  pose.bodyPitch = normalised * 0.26;
  pose.bodyHeight = Math.abs(Math.sin(phase)) * 0.05 * normalised - 0.02 * normalised;
  pose.bodyRoll = Math.sin(phase) * 0.055 * normalised;
  pose.bodyYaw = Math.sin(phase) * 0.09 * normalised;
  pose.headPitch = -normalised * 0.12;
}

function poseAir(input: AnimationInputs): void {
  const rising = input.verticalSpeed > 0.5;

  if (rising) {
    // Take-off: arms up, knees drawn in.
    pose.shoulderLeftPitch = -2.5;
    pose.shoulderRightPitch = -2.5;
    pose.shoulderLeftRoll = 0.22;
    pose.shoulderRightRoll = 0.22;
    pose.elbowLeft = -0.35;
    pose.elbowRight = -0.35;
    pose.hipLeft = 0.72;
    pose.hipRight = 0.45;
    pose.kneeLeft = -1.0;
    pose.kneeRight = -0.6;
    pose.bodyPitch = 0.12;
    pose.bodySquash = 1.06;
    pose.headPitch = -0.1;
  } else {
    // Falling: arms out, legs reaching for the ground.
    const fall = MathUtils.clamp(-input.verticalSpeed / 16, 0, 1);
    pose.shoulderLeftPitch = -1.1 - fall * 0.5;
    pose.shoulderRightPitch = -1.1 - fall * 0.5;
    pose.shoulderLeftRoll = 0.75 + fall * 0.3;
    pose.shoulderRightRoll = 0.75 + fall * 0.3;
    pose.elbowLeft = -0.5;
    pose.elbowRight = -0.5;
    pose.hipLeft = 0.3 - fall * 0.25;
    pose.hipRight = -0.18;
    pose.kneeLeft = -0.42;
    pose.kneeRight = -0.2;
    pose.bodyPitch = -0.06 - fall * 0.08;
    pose.bodySquash = 1 + fall * 0.04;
    pose.headPitch = fall * 0.12;
  }
}

function poseSwim(input: AnimationInputs): void {
  if (input.submerged) {
    // Face-down and horizontal, with a breaststroke tied to the stroke timer.
    pose.bodyPitch = -1.28;
    pose.bodyHeight = 0.42;

    const stroke = MathUtils.clamp(input.strokeProgress, 0, 1);
    // Pull out and back, then recover forward.
    const pull = Math.sin(stroke * Math.PI);
    pose.shoulderLeftPitch = -2.3 + pull * 1.9;
    pose.shoulderRightPitch = -2.3 + pull * 1.9;
    pose.shoulderLeftRoll = 0.3 + pull * 0.95;
    pose.shoulderRightRoll = 0.3 + pull * 0.95;
    pose.elbowLeft = -0.3 - pull * 0.8;
    pose.elbowRight = -0.3 - pull * 0.8;

    // Legs kick continuously, a little behind the arms.
    const kick = Math.sin(input.time * 4.2);
    pose.hipLeft = kick * 0.42;
    pose.hipRight = -kick * 0.42;
    pose.kneeLeft = -Math.max(0, kick) * 0.75;
    pose.kneeRight = -Math.max(0, -kick) * 0.75;

    pose.headPitch = 0.65;
  } else {
    // Treading at the surface: upright, head clear of the water.
    pose.bodyPitch = -0.34;
    pose.bodyHeight = 0.08;

    const paddle = Math.sin(input.time * 3.4);
    pose.shoulderLeftPitch = -1.35 + paddle * 0.42;
    pose.shoulderRightPitch = -1.35 - paddle * 0.42;
    pose.shoulderLeftRoll = 0.95;
    pose.shoulderRightRoll = 0.95;
    pose.elbowLeft = -0.95;
    pose.elbowRight = -0.95;

    const kick = Math.sin(input.time * 2.8);
    pose.hipLeft = 0.5 + kick * 0.3;
    pose.hipRight = 0.5 - kick * 0.3;
    pose.kneeLeft = -0.7 - Math.max(0, kick) * 0.4;
    pose.kneeRight = -0.7 - Math.max(0, -kick) * 0.4;

    pose.headPitch = -0.16;
  }
}

function poseClimb(input: AnimationInputs): void {
  // Hugging the post: arms reach above, legs grip below, alternating as the
  // character moves. The cycle is driven by time only while actually climbing.
  const climbing = input.inputStrength > 0.15;
  const phase = climbing ? input.time * 4.4 : 0;
  const swing = Math.sin(phase);

  pose.bodyPitch = 0.1;
  pose.shoulderLeftPitch = -2.65 + swing * 0.5;
  pose.shoulderRightPitch = -2.65 - swing * 0.5;
  pose.shoulderLeftRoll = 0.3;
  pose.shoulderRightRoll = 0.3;
  pose.elbowLeft = -0.55 + swing * 0.3;
  pose.elbowRight = -0.55 - swing * 0.3;

  pose.hipLeft = 0.85 - swing * 0.35;
  pose.hipRight = 0.85 + swing * 0.35;
  pose.kneeLeft = -1.15 + swing * 0.3;
  pose.kneeRight = -1.15 - swing * 0.3;

  pose.headPitch = -0.22;
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
  pose.hipLeft = 0.62;
  pose.hipRight = 0.62;
  pose.kneeLeft = -1.05;
  pose.kneeRight = -1.05;
  pose.shoulderLeftPitch = -0.45;
  pose.shoulderRightPitch = -0.45;
  pose.shoulderLeftRoll = 0.55;
  pose.shoulderRightRoll = 0.55;
}
