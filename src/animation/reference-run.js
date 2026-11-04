import * as THREE from 'three';
import data from './run-reference.json' with {type:'json'};
export {data as referenceData};
const angle = n => n * Math.PI / 32768;
const phase = frame => ((frame % data.frameCount) + data.frameCount) % data.frameCount;
export const CYCLE_SECONDS = data.frameCount / (data.nativeTickHz * data.previewSpeed / 4);
// For straight running on flat ground, tilt_body_walking adds speed*170
// (capped at 0x1555) around native torso Z, before the torso animation.
export const TORSO_LEAN = angle(Math.min(0x1555, Math.trunc(data.previewSpeed * 170)));
export function sampleReference(frame) {
  const f = phase(frame), a = data.frames[Math.floor(f)], b = data.frames[(Math.floor(f) + 1) % data.frameCount];
  const t = f % 1;
  const positions = [], rotations = [];
  for (let index = 0; index < data.parents.length; index++) {
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(...a.rotations[index].map(angle), 'ZYX'));
    const next = new THREE.Quaternion().setFromEuler(new THREE.Euler(...b.rotations[index].map(angle), 'ZYX'));
    q.slerp(next, t);
    // Unanimated torso tilt node sits between pelvis and animated torso.
    if (index === 2) q.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1), TORSO_LEAN));
    const p = new THREE.Vector3(...data.offsets[index]);
    if (index === 2) p.applyAxisAngle(new THREE.Vector3(0,0,1), TORSO_LEAN);
    const parent = data.parents[index];
    if (parent < 0) p.fromArray(a.translation.map((v, axis) => THREE.MathUtils.lerp(v,b.translation[axis],t)));
    else { p.applyQuaternion(rotations[parent]).add(positions[parent]); q.premultiply(rotations[parent]); }
    positions.push(p); rotations.push(q);
  }
  return {positions, rotations, frame:f};
}
// SM64 bones are X-aligned. Columns map avatar XYZ into native Z,X,Y
// for the torso, and Z,-X,-Y for downward authored limbs.
const basis = (x,y,z) => new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3(...x),new THREE.Vector3(...y),new THREE.Vector3(...z)));
const torsoBasis = basis([0,0,1],[1,0,0],[0,1,0]);
const limbBasis = basis([0,0,1],[-1,0,0],[0,-1,0]);
const footBasis = basis([0,0,1],[0,-1,0],[1,0,0]);
export function createReferenceRetarget(avatar) {
  const bones = new Map(avatar.skeleton.bones.map(b => [b.name,b]));
  const rest = new Map(avatar.skeleton.bones.map(b => [b.name,b.position.clone()]));
  const mapping = [
    ['pelvis',1,torsoBasis], ['spine',2,torsoBasis], ['chest',2,torsoBasis],
    ['neck',3,torsoBasis], ['head',3,torsoBasis],
    ['left_upper_arm',9,limbBasis], ['left_forearm',10,limbBasis], ['left_hand',11,limbBasis],
    ['right_upper_arm',5,limbBasis], ['right_forearm',6,limbBasis], ['right_hand',7,limbBasis],
    ['left_thigh',17,limbBasis], ['left_calf',18,limbBasis], ['left_foot',19,footBasis],
    ['right_thigh',13,limbBasis], ['right_calf',14,limbBasis], ['right_foot',15,footBasis],
  ];
  for (const entry of mapping) {
    const [name, , correction] = entry;
    if (correction !== limbBasis) continue;
    const bone = bones.get(name);
    const child = bone.children.find(child => child.isBone);
    if (child) entry[2] = correction.clone().multiply(new THREE.Quaternion().setFromUnitVectors(child.position.clone().normalize(), new THREE.Vector3(0,-1,0)));
  }
  const scale = (rest.get('left_calf').length()+rest.get('left_foot').length()) / 156;
  const desired = new Map();
  return function apply(frame) {
    const sample = sampleReference(frame);
    for (const [name,index,correction] of mapping) desired.set(name,sample.rotations[index].clone().multiply(correction));
    // All world orientations are assigned before conversion to parent-local space.
    for (const [name] of mapping) {
      const bone = bones.get(name), world = desired.get(name);
      const parent = desired.get(bone.parent?.name);
      bone.position.copy(rest.get(name));
      bone.quaternion.copy(parent ? parent.clone().invert().multiply(world) : world);
    }
    bones.get('spine').position.applyAxisAngle(new THREE.Vector3(1,0,0), TORSO_LEAN);
    // Preserve every authored segment length. Root vertical motion is copied
    // at leg scale; one fixed clearance offset is calibrated for the full cycle.
    bones.get('pelvis').position.y = rest.get('pelvis').y + (sample.positions[1].y - 189) * scale;
    avatar.updateMatrixWorld(true);
    avatar.skeleton.update();
    return sample;
  };
}
