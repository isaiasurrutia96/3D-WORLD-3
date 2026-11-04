import * as THREE from 'three';
import { createAvatar, FOOT_PROFILE } from '../avatar.js';
import { createRunningAnimator } from './running.js';
import { RUN_SPEED, STRIDE_LENGTH } from '../running-controller.js';
import { sampleReference, createReferenceRetarget, referenceData, CYCLE_SECONDS } from './reference-run.js';

export const LEG_LENGTH = Math.hypot(.35, .015) + Math.hypot(.36, .015);
export const REFERENCE_SCALE = LEG_LENGTH / 156;
export const metricLabels = [
  'Torso forward lean (°)', 'Upper-arm swing L / R (°)',
  'Arm sideways elevation L / R (°)', 'Elbow bend L / R (°)',
  'Hip swing L / R (°)', 'Knee bend L / R (°)',
  'Knee height above hip / leg length L / R', 'Shoe pitch L / R (°)',
  'Ankle separation / leg length', 'Sole height above slab L / R (cm)',
];
const deg = radians => radians * 180 / Math.PI;
const direction = (a, b) => b.clone().sub(a).normalize();
const pair = callback => [0, 1].map(callback);
function measurements(points, toes, soles) {
  const torso = direction(points.torsoBase, points.torsoTop);
  const upper = pair(i => direction(points.shoulder[i], points.elbow[i]));
  const thigh = pair(i => direction(points.thigh[i], points.knee[i]));
  const bend = (a, b) => deg(Math.acos(THREE.MathUtils.clamp(a.dot(b), -1, 1)));
  return [
    deg(Math.atan2(torso.z, torso.y)),
    pair(i => deg(Math.atan2(upper[i].z, -upper[i].y))),
    pair(i => deg(Math.asin(Math.abs(upper[i].x)))),
    pair(i => bend(upper[i], direction(points.elbow[i], points.hand[i]))),
    pair(i => deg(Math.atan2(thigh[i].z, -thigh[i].y))),
    pair(i => bend(thigh[i], direction(points.knee[i], points.ankle[i]))),
    pair(i => (points.knee[i].y - points.thigh[i].y) / LEG_LENGTH),
    pair(i => deg(Math.atan2(toes[i].y, Math.hypot(toes[i].x, toes[i].z)))),
    Math.abs(points.ankle[0].z - points.ankle[1].z) / LEG_LENGTH,
    soles.map(height => height * 100),
  ];
}
export function measureReference(sample) {
  const p = sample.positions.map(point => point.clone().multiplyScalar(REFERENCE_SCALE));
  const indices = [19, 15];
  const soles = ['left', 'right'].map((side, k) => Math.min(...referenceData.feet[side].map(vertex =>
    new THREE.Vector3(...vertex).applyQuaternion(sample.rotations[indices[k]])
      .add(sample.positions[indices[k]]).y * REFERENCE_SCALE)));
  return measurements({
    torsoBase: p[2], torsoTop: p[3], shoulder: [p[9], p[5]], elbow: [p[10], p[6]],
    hand: [p[11], p[7]], thigh: [p[17], p[13]], knee: [p[18], p[14]], ankle: [p[19], p[15]],
  }, indices.map(i => new THREE.Vector3(1, 0, 0).applyQuaternion(sample.rotations[i])), soles);
}
export function measureAvatar(model) {
  model.updateMatrixWorld(true);
  const bones = new Map(model.skeleton.bones.map(bone => [bone.name, bone]));
  const p = name => bones.get(name).getWorldPosition(new THREE.Vector3());
  const both = part => ['left', 'right'].map(side => p(`${side}_${part}`));
  const soles = [], toes = [];
  for (const side of ['left', 'right']) {
    const bone = bones.get(`${side}_foot`);
    const rotation = bone.getWorldQuaternion(new THREE.Quaternion());
    toes.push(new THREE.Vector3(0, 0, 1).applyQuaternion(rotation));
    // Exact support function of the unchanged ellipsoidal shoe.
    const center = new THREE.Vector3(side === 'left' ? -.015 : .015,
      FOOT_PROFILE.centerHeight - FOOT_PROFILE.ankleHeight, FOOT_PROFILE.forwardOffset)
      .applyQuaternion(rotation).add(p(`${side}_foot`));
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(rotation.clone().invert());
    soles.push(center.y - Math.hypot(up.x * FOOT_PROFILE.radiusX, up.y * FOOT_PROFILE.radiusY, up.z * FOOT_PROFILE.radiusZ));
  }
  return measurements({
    torsoBase: p('spine'), torsoTop: p('chest'), shoulder: both('upper_arm'), elbow: both('forearm'),
    hand: both('hand'), thigh: both('thigh'), knee: both('calf'), ankle: both('foot'),
  }, toes, soles);
}
export function createComparison() {
  const old = createAvatar(), rebuilt = createAvatar();
  const oldAnimator = createRunningAnimator(old), applyRebuilt = createReferenceRetarget(rebuilt);
  const oldFrames = [];
  // Bake the previous moving run with its real world-space foot anchors, then
  // remove root travel. Two warm-up cycles eliminate startup blending.
  for (let f = -144; f < 72; f++) {
    const distance = (f / 72 - 9 / 72) * STRIDE_LENGTH;
    old.position.z = distance;
    oldAnimator.update({ speed: RUN_SPEED, distance }, CYCLE_SECONDS / 72);
    if (f >= 0) oldFrames.push(old.skeleton.bones.map(b => ({ p: b.position.clone(), q: b.quaternion.clone() })));
  }
  old.position.set(0, 0, 0);
  // A constant clearance preserves the shape of all source motion curves.
  // Half-frame samples bound the interpolated review cycle as well as keys.
  const vertex = new THREE.Vector3();
  let minimum = Infinity;
  for (let f = 0; f < 72; f += .5) {
    applyRebuilt(f);
    for (let i = 0; i < rebuilt.geometry.attributes.position.count; i++) {
      vertex.fromBufferAttribute(rebuilt.geometry.attributes.position, i);
      rebuilt.applyBoneTransform(i, vertex);
      minimum = Math.min(minimum, vertex.y);
    }
  }
  const clearance = Math.max(0, -minimum) + .002;
  rebuilt.position.y = clearance;
  function apply(frame) {
    const sample = applyRebuilt(frame);
    const f = sample.frame, a = oldFrames[Math.floor(f)], b = oldFrames[(Math.floor(f) + 1) % 72];
    old.skeleton.bones.forEach((bone, i) => {
      bone.position.lerpVectors(a[i].p, b[i].p, f % 1);
      bone.quaternion.slerpQuaternions(a[i].q, b[i].q, f % 1);
    });
    old.updateMatrixWorld(true); old.skeleton.update();
    return { sample, metrics: [measureReference(sample), measureAvatar(old), measureAvatar(rebuilt)] };
  }
  return { old, rebuilt, clearance, apply };
}
