/**
 * Procedural animation for the character rig.
 *
 * Nothing here is a baked clip: every pose is computed from the character's
 * speed, state and a running clock, then eased toward so that changes of state
 * blend instead of snapping. That keeps the character responsive — the legs
 * answer the stick immediately rather than waiting for a clip to loop.
 */

import { MathUtils } from 'three';
import { HIP_HEIGHT, type CharacterRig } from './PlayerModel.ts';
import {
  STANDING_CLEARANCE,
  applyGaitLegs,
  lowestSole,
  planGait,
  type GaitPlan,
} from './PlayerGait.ts';
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
  /** Which jump of a combo is in progress: 1, 2 or 3. */
  jumpStage: 1 | 2 | 3;
  /** How far round the triple jump's somersault is, in radians. */
  flipAngle: number;
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
  /**
   * An extra drop added on top of whatever is setting the hip height, so a
   * landing can crouch without having to fight the gait for control of it.
   * With the feet solved against the floor, dropping the hips bends the knees
   * and the landing absorbs itself.
   */
  bodyDrop: number;
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
 * Whether this frame's pose wants the gait solver to own the legs, and how
 * much of the way there the hand-over has got.
 *
 * Walking and running do not pose their legs at all: the solver places the
 * feet and works the joints out backwards, so a planted foot stays planted.
 * Every other pose — idle, skidding, airborne, swimming — is still posed by
 * hand, and the weight eases between the two so a hand-over reads as a
 * transition rather than a snap.
 */
let gaitWanted = false;
let gaitWeight = 0;
let gaitPlan: GaitPlan | null = null;

function createPose(): Pose {
  return {
    bodyPitch: 0,
    bodyRoll: 0,
    bodyYaw: 0,
    bodyHeight: 0,
    bodyDrop: 0,
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
  gaitWanted = false;
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

  gaitWeight = MathUtils.lerp(gaitWeight, gaitWanted ? 1 : 0, blend);

  // The somersault is added after blending. Easing toward it like any other
  // pose value would smooth a full rotation into almost no rotation at all.
  rig.body.rotation.set(current.bodyPitch + input.flipAngle, current.bodyYaw, current.bodyRoll);

  // The hips skip the easing while the gait owns them, for the same reason.
  // The dip within a step happens about five times a second, and easing
  // toward it flattened it to under half its depth and left it late. That
  // mattered for more than the look: the solver sizes the stride to the
  // depth of the stance crouch, so hips that had not got down there yet put
  // the foot beyond the leg's reach, and the foot slid to make up for it.
  const hipHeight =
    gaitWeight > 0.001 && gaitPlan !== null
      ? MathUtils.lerp(current.bodyHeight, gaitPlan.bodyHeight, gaitWeight)
      : current.bodyHeight;
  rig.body.position.y = HIP_HEIGHT + hipHeight + current.bodyDrop;
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

  applyLegs(rig, input);
}

/**
 * Puts the legs where they belong, from whichever source owns them, and then
 * makes sure neither shoe has ended up under the floor.
 */
function applyLegs(rig: CharacterRig, input: AnimationInputs): void {
  applyGaitLegs(rig, gaitPlan, gaitWeight, current);

  // On the ground, nothing is allowed through the floor. The solved gait
  // already lands the sole exactly on it, so this only ever bites on the
  // poses that are still built by hand.
  if (input.state === 'ground') {
    const lowest = lowestSole(rig);
    if (lowest < 0) rig.body.position.y -= lowest;
  }
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
  target.bodyDrop = 0;
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
    // The breath is in the chest, not in the hips: raising the whole body
    // lifted both feet clear of the floor twice a second.
    pose.bodyHeight = -STANDING_CLEARANCE;
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

  // The legs are not posed here any more. Where the feet go is decided in
  // PlayerGait and the joints are solved backwards from that, which is the
  // only way a planted foot can be genuinely planted. What is left for this
  // function is everything about a run that has nothing to do with the floor.
  const gait = planGait(input.speed, input.maxSpeed, input.delta);
  gaitWanted = true;
  gaitPlan = gait;

  const armAmplitude = MathUtils.lerp(0.3, 0.95, normalised);
  // Positive means the left foot is leading, so the left arm is the one going
  // back. Arms swing against the legs, which is what the sign flip is for.
  const lead = gait.armDrive;
  const forwardLeft = Math.max(0, -lead);
  const forwardRight = Math.max(0, lead);

  pose.bodyHeight = gait.bodyHeight;
  pose.shoulderLeftPitch = lead * armAmplitude;
  pose.shoulderRightPitch = -lead * armAmplitude;
  // Elbows stay slightly bent, and bend more as the arm comes forward.
  pose.elbowLeft = -0.22 - forwardLeft * armAmplitude * 0.6;
  pose.elbowRight = -0.22 - forwardRight * armAmplitude * 0.6;
  // Arms tuck in across the body as they come forward, rather than swinging
  // like two pendulums hung off the sides.
  pose.shoulderLeftRoll = 0.18 + normalised * 0.04 - forwardLeft * 0.1;
  pose.shoulderRightRoll = 0.18 + normalised * 0.04 - forwardRight * 0.1;

  // Lean into the run, and roll and twist once per step. The lean is gentler
  // than it was: the legs no longer inherit it, so what used to read as the
  // whole figure tipping into the run now reads as a stoop at the waist.
  pose.bodyPitch = normalised * 0.14;
  pose.bodyRoll = lead * 0.055 * normalised;
  pose.bodyYaw = lead * 0.09 * normalised;
  // The shoulders twist with the stride, so the head turns back against them
  // to keep looking where the character is going.
  pose.headYaw = -pose.bodyYaw * 0.7;
  // Head held level against the lean, so he looks where he is going.
  pose.headPitch = -pose.bodyPitch * 0.8;
}

function poseAir(input: AnimationInputs): void {
  const rising = input.verticalSpeed > 0.5;

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
  pose.bodyDrop = -0.12;
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
