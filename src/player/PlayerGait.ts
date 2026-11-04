/**
 * The gait solver: where the feet go, and how the hips follow them.
 *
 * The first walk cycle here drove the hips and knees from a pair of sine
 * waves. It read as a walk, but it was never standing on anything. Two things
 * gave that away:
 *
 *   1. With both joints on sine waves the leg is longest when it hangs
 *      straight down and shorter at every other moment, so each foot dipped
 *      to the floor for a single instant and rose away again. There was no
 *      interval of contact at all, and the lowest point of the dip went
 *      through the floor.
 *
 *   2. The cycle ran at its own rate. At full speed the feet swept backwards
 *      at about four metres a second while the ground went past at over
 *      eight, so the character skated.
 *
 * This module turns the problem round. Rather than choosing joint angles and
 * hoping the feet land somewhere sensible, it chooses where each foot is — on
 * the floor and moving backwards at exactly the speed the ground is moving,
 * then arcing forward through the air — and solves the hip and knee angles
 * that put it there. Contact is then exact by construction: a planted foot
 * cannot skate, and cannot sink, because its position is the input.
 *
 * The cadence is a result rather than a setting. The leg can only sweep so
 * far before it runs out of reach, so the length of a contact is fixed by the
 * geometry, and the number of steps per second is whatever that length and
 * the character's speed require.
 */

import { Euler, MathUtils, Matrix4, Quaternion, Vector3 } from 'three';
import {
  ANKLE_TO_SOLE,
  HIP_PIVOT_HEIGHT,
  HIP_PIVOT_PLANTED,
  LEG,
  LEG_REACH,
  SHOE_SUPPORT,
  type CharacterRig,
} from './PlayerModel.ts';
import { TUNING } from './Tuning.ts';

/** Where one foot should be, in the character's own space. */
interface FootPlan {
  /** Forward of the hips; positive is in front. */
  z: number;
  /** Height of the bottom of the shoe above the floor. Zero means planted. */
  y: number;
  /** Toe-down tilt. Positive points the toe at the floor. */
  tilt: number;
  /** True while this foot is carrying the character's weight. */
  planted: boolean;
}

export interface GaitPlan {
  /** How far through the cycle, in radians. The left foot lands at zero. */
  phase: number;
  /** Fraction of the cycle each foot spends on the floor. */
  duty: number;
  /** How far a planted foot sweeps past the hips, front to back, in metres. */
  travel: number;
  /** Where the hips should sit, relative to the standing hip line. */
  bodyHeight: number;
  /** Steps per second, reported for verification rather than used. */
  cadence: number;
  left: FootPlan;
  right: FootPlan;
  /**
   * Which leg is leading, from -1 to 1. Positive means the left foot is in
   * front, so the arms swing against it.
   */
  armDrive: number;
}

const plan: GaitPlan = {
  phase: 0,
  duty: 0.5,
  travel: 0.4,
  bodyHeight: 0,
  cadence: 0,
  left: { z: 0, y: 0, tilt: 0, planted: false },
  right: { z: 0, y: 0, tilt: 0, planted: false },
  armDrive: 0,
};

/**
 * The hips stand this far above the point where a straight leg puts the sole
 * exactly on the floor. The figure as built hovers by about a centimetre and a
 * half, which is the first thing the solver has to take out.
 */
export const STANDING_CLEARANCE = HIP_PIVOT_HEIGHT - HIP_PIVOT_PLANTED;

const TWO_PI = Math.PI * 2;

/** Eases in and out with zero speed at both ends. */
function smoother(t: number): number {
  const x = MathUtils.clamp(t, 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

/**
 * How far the hips are below their standing height at a given point in the
 * cycle. They are lowest in the middle of a contact, where the knee is most
 * bent, and highest between steps. That is the right way round: a runner's
 * hips fall as the leg takes the weight and rise as it pushes off.
 */
function hipDip(phase: number, duty: number, depth: number): number {
  return depth * (0.5 + 0.5 * Math.cos(2 * (phase - Math.PI * duty)));
}

/**
 * The sweep a planted foot can manage without the knee locking straight.
 *
 * A leg with its hip h above the ankle and a total length of L can reach
 * sqrt(L^2 - h^2) to either side. Crouching lowers h and buys sweep, which is
 * why runners are never upright: the deeper the stance, the longer the stride
 * and the fewer steps per second it takes to cover the ground.
 */
function sweepFor(shortening: number): number {
  const vertical = Math.max(0.2, LEG_REACH - shortening);
  const reach = Math.sqrt(Math.max(0, LEG_REACH * LEG_REACH - vertical * vertical));
  return 2 * reach * 0.94;
}

/** The plan as it stands, for the verification pass to measure. */
export function currentGaitPlan(): GaitPlan {
  return plan;
}

/**
 * Advances the cycle and works out where both feet belong this frame.
 *
 * `speed` is the character's horizontal speed in metres per second.
 */
export function planGait(speed: number, maxSpeed: number, delta: number): GaitPlan {
  const normalised = MathUtils.clamp(speed / maxSpeed, 0, 1);

  const duty = MathUtils.lerp(
    TUNING.gaitDutyWalk,
    TUNING.gaitDutyRun,
    Math.pow(normalised, 0.7),
  );
  const crouch = MathUtils.lerp(
    TUNING.gaitCrouchWalk,
    TUNING.gaitCrouchRun,
    Math.sqrt(normalised),
  );
  const bob = MathUtils.lerp(TUNING.gaitBobWalk, TUNING.gaitBobRun, normalised);
  const lift = MathUtils.lerp(TUNING.gaitLiftWalk, TUNING.gaitLiftRun, normalised);

  // The sweep has to fit the shortest the leg gets while it is planted, which
  // is at the two ends of the contact, where the hips have not yet dropped
  // all the way.
  const dipAtHandover = hipDip(0, duty, bob);
  const travel = sweepFor(crouch + dipAtHandover);

  // Cadence falls out of the geometry: a contact lasts as long as it takes the
  // ground to move the length of the sweep, and a contact is `duty` of a
  // cycle. A little slip is allowed at speed, which trades a trace of skating
  // for a calmer stride.
  const slip = TUNING.gaitFootSlip * Math.pow(normalised, 1.5);
  const groundSpeed = speed * (1 - slip);
  const cycleRate = MathUtils.clamp((groundSpeed * duty) / travel, 0, TUNING.gaitMaxCadence);

  plan.phase = (plan.phase + cycleRate * TWO_PI * delta) % TWO_PI;
  plan.duty = duty;
  plan.travel = travel;
  plan.cadence = cycleRate * 2;
  plan.bodyHeight = -STANDING_CLEARANCE - crouch - hipDip(plan.phase, duty, bob);

  planFoot(plan.left, plan.phase, duty, travel, lift);
  planFoot(plan.right, (plan.phase + Math.PI) % TWO_PI, duty, travel, lift);
  plan.armDrive = (plan.left.z - plan.right.z) / travel;

  return plan;
}

function planFoot(
  foot: FootPlan,
  phase: number,
  duty: number,
  travel: number,
  lift: number,
): void {
  const half = travel * 0.5;
  const through = phase / TWO_PI;

  if (through < duty) {
    // Planted. The foot slides straight backwards at ground speed, flat on
    // the floor. This is the whole point of the module: during this window
    // the foot is a fixed point in the world, not an animation.
    const t = through / duty;
    foot.z = half - t * travel;
    foot.y = 0;
    foot.tilt = 0;
    foot.planted = true;
    return;
  }

  const t = (through - duty) / (1 - duty);

  // How far the foot swings forward in the air is deliberately not the same
  // as how far it sweeps along the ground. A planted foot can only travel as
  // far as the leg reaches without the knee locking, which is a short
  // distance; a foot in the air can reach much further ahead, and does, which
  // is what makes a running stride look long. Tying the two together was what
  // made the first version of this look like a scuttle.
  const ahead = half * TUNING.gaitSwingReach;

  // Hangs back while the heel folds up behind, reaches its furthest forward
  // at about three quarters through, then pulls back a little before it
  // lands. That last pull back is what makes the footfall look deliberate
  // rather than dropped.
  foot.z =
    -half +
    (ahead + half) * smoother((t - 0.12) / 0.62) -
    (ahead - half) * smoother((t - 0.74) / 0.26);
  foot.y = lift * Math.sin(Math.PI * Math.pow(t, 0.78));
  foot.planted = false;

  // The toe points down through the push-off and comes up again before the
  // heel lands, but only once the shoe is clear of the floor — tilting it
  // while it is still down there would dig the toe in.
  const clearance = MathUtils.clamp(foot.y / 0.05, 0, 1);
  const push = Math.max(0, 1 - t / 0.45);
  const strike = Math.max(0, (t - 0.62) / 0.38);
  foot.tilt = clearance * (0.6 * push - 0.22 * strike);
}

// ---- Solving the legs ------------------------------------------------------

const hipPivot = new Vector3();
const swing = new Quaternion();
const posedRotation = new Quaternion();
const bodyInverse = new Quaternion();
const solvedRotation = new Quaternion();
const euler = new Euler();
const X_AXIS = new Vector3(1, 0, 0);

export interface PosedLegs {
  hipLeft: number;
  hipRight: number;
  kneeLeft: number;
  kneeRight: number;
  ankleLeft: number;
  ankleRight: number;
}

/**
 * Puts both legs where the plan asks, easing between the solved gait and
 * whatever the hand-built poses want by `weight`.
 *
 * The body's own lean is cancelled at the hip rather than inherited, which is
 * what lets the legs be solved against the world instead of against the
 * torso. It matters most for the roll: the hip joint here swings forward and
 * back and nothing else, so a torso that rolled three degrees dragged the
 * planted foot five centimetres sideways with it — a skate as large as the
 * one the whole exercise was meant to remove, just across the character
 * rather than along the ground. With the lean cancelled, the torso can lean
 * and twist as much as it likes and the feet stay where they were put.
 */
export function applyGaitLegs(
  rig: CharacterRig,
  gait: GaitPlan | null,
  weight: number,
  posed: PosedLegs,
): void {
  if (gait === null || weight <= 0.001) {
    setPosed(rig.hipLeft, posed.hipLeft);
    setPosed(rig.hipRight, posed.hipRight);
    rig.kneeLeft.rotation.x = posed.kneeLeft;
    rig.kneeRight.rotation.x = posed.kneeRight;
    rig.ankleLeft.rotation.x = posed.ankleLeft;
    rig.ankleRight.rotation.x = posed.ankleRight;
    return;
  }

  rig.body.updateMatrix();
  bodyInverse.copy(rig.body.quaternion).invert();

  solveLeg(rig, -1, gait.left, weight, posed.hipLeft, posed.kneeLeft, posed.ankleLeft);
  solveLeg(rig, 1, gait.right, weight, posed.hipRight, posed.kneeRight, posed.ankleRight);
}

function setPosed(joint: { rotation: { set(x: number, y: number, z: number): void } }, angle: number): void {
  joint.rotation.set(angle, 0, 0);
}

function solveLeg(
  rig: CharacterRig,
  side: -1 | 1,
  foot: FootPlan,
  weight: number,
  posedHip: number,
  posedKnee: number,
  posedAnkle: number,
): void {
  const hip = side === -1 ? rig.hipLeft : rig.hipRight;
  const knee = side === -1 ? rig.kneeLeft : rig.kneeRight;
  const ankle = side === -1 ? rig.ankleLeft : rig.ankleRight;

  // Where this hip pivot has actually ended up, once the body's lean, twist
  // and bob are accounted for. The foot is placed below that point.
  hipPivot.set(LEG.hipOffsetX * side, LEG.hipOffsetY, 0).applyMatrix4(rig.body.matrix);

  const dy = ANKLE_TO_SOLE + foot.y - hipPivot.y;
  const dz = foot.z - hipPivot.z;
  const distance = MathUtils.clamp(Math.hypot(dy, dz), 0.14, LEG_REACH - 0.006);

  // Direction from hip to ankle in the same measure the joints use: zero
  // hangs straight down, and a positive angle swings the limb backwards.
  const direction = Math.atan2(-dz, -dy);

  const thigh = LEG.thigh;
  const shin = LEG.shin;
  const atHip = Math.acos(
    MathUtils.clamp(
      (thigh * thigh + distance * distance - shin * shin) / (2 * thigh * distance),
      -1,
      1,
    ),
  );
  const atKnee = Math.acos(
    MathUtils.clamp(
      (thigh * thigh + shin * shin - distance * distance) / (2 * thigh * shin),
      -1,
      1,
    ),
  );

  const hipAngle = direction - atHip;
  const kneeAngle = Math.PI - atKnee;

  // Cancel the body's orientation, then swing the leg. Everything below the
  // hip then works in world-upright terms.
  swing.setFromAxisAngle(X_AXIS, hipAngle);
  posedRotation.setFromEuler(euler.set(posedHip, 0, 0));
  solvedRotation.copy(bodyInverse).multiply(swing);
  hip.quaternion.copy(posedRotation).slerp(solvedRotation, weight);

  knee.rotation.x = MathUtils.lerp(posedKnee, kneeAngle, weight);
  // Flat on the floor, plus whatever roll the plan asks for. The chain above
  // is already upright, so there is no lean left to take out.
  ankle.rotation.x = MathUtils.lerp(
    posedAnkle,
    -(hipAngle + kneeAngle) + foot.tilt,
    weight,
  );
}

// ---- Measuring the soles ---------------------------------------------------

const chain = new Matrix4();
const shoeCentre = new Vector3();

/**
 * The height of the lowest point of either shoe above the floor.
 *
 * This is a safety net for the poses that are still posed by hand — the skid,
 * the landing crouch, the idle — rather than solved. Any of them can put a
 * foot through the floor if a joint angle changes, and rather than hand-check
 * each one, the body is simply lifted until the lower shoe rests on the
 * ground.
 */
export function lowestSole(rig: CharacterRig): number {
  rig.body.updateMatrix();
  rig.torso.updateMatrix();
  return Math.min(
    soleHeight(rig, rig.hipLeft, rig.kneeLeft, rig.ankleLeft),
    soleHeight(rig, rig.hipRight, rig.kneeRight, rig.ankleRight),
  );
}

function soleHeight(
  rig: CharacterRig,
  hip: { updateMatrix(): void; matrix: Matrix4 },
  knee: { updateMatrix(): void; matrix: Matrix4 },
  ankle: { updateMatrix(): void; matrix: Matrix4 },
): number {
  hip.updateMatrix();
  knee.updateMatrix();
  ankle.updateMatrix();

  chain
    .copy(rig.body.matrix)
    .multiply(rig.torso.matrix)
    .multiply(hip.matrix)
    .multiply(knee.matrix)
    .multiply(ankle.matrix);

  shoeCentre.set(0, SHOE_SUPPORT.offsetY, SHOE_SUPPORT.offsetZ).applyMatrix4(chain);

  // The lowest point of a transformed ellipsoid sits one "vertical radius"
  // below its centre, and that radius is the length of the middle row of the
  // transform once each axis has been scaled by its own semi-axis.
  const e = chain.elements;
  const vertical = Math.hypot(
    e[1] * SHOE_SUPPORT.semiX,
    e[5] * SHOE_SUPPORT.semiY,
    e[9] * SHOE_SUPPORT.semiZ,
  );
  return shoeCentre.y - vertical;
}
