import * as THREE from 'three';
import { createReferenceRetarget } from './reference-run.js';

// User-approved departures from the raw reference: upper arms beside the ribs,
// and softer shoe pitch on this avatar's substantially longer, rounder shoes.
export function createAdaptedRun(avatar) {
  const applyReference = createReferenceRetarget(avatar);
  const bones = new Map(avatar.skeleton.bones.map(bone => [bone.name, bone]));
  const arms = ['left', 'right'].map((side, index) => ({
    upper: bones.get(`${side}_upper_arm`),
    forearm: bones.get(`${side}_forearm`),
    hand: bones.get(`${side}_hand`),
    restDirection: bones.get(`${side}_forearm`).position.clone().normalize(),
    source: index === 0 ? 9 : 5,
    sign: index === 0 ? -1 : 1,
  }));
  const feet = ['left', 'right'].map((side, index) => ({
    bone: bones.get(`${side}_foot`), source: index === 0 ? 19 : 15,
  }));

  return function apply(frame) {
    const sample = applyReference(frame);
    const torsoInverse = sample.rotations[2].clone().invert();
    for (const arm of arms) {
      const sourceUpper = new THREE.Vector3(1, 0, 0).applyQuaternion(sample.rotations[arm.source]);
      const sourceLower = new THREE.Vector3(1, 0, 0).applyQuaternion(sample.rotations[arm.source + 1]);
      const bend = Math.acos(THREE.MathUtils.clamp(sourceUpper.dot(sourceLower), -1, 1));
      const sourceSwing = sourceUpper.clone().applyQuaternion(torsoInverse).z;
      // Keep the native timing and elbow bend, with modest forward/backward
      // travel and a small outward clearance from the torso in chest space.
      const z = sourceSwing * .65;
      const x = arm.sign * .20;
      const direction = new THREE.Vector3(x, -Math.sqrt(1 - x * x - z * z), z);
      arm.upper.quaternion.setFromUnitVectors(arm.restDirection, direction);
      arm.forearm.rotation.set(-bend, 0, 0);
      arm.hand.rotation.set(-.05, 0, 0);
    }
    avatar.updateMatrixWorld(true);
    const avatarRotation = avatar.getWorldQuaternion(new THREE.Quaternion());
    for (const foot of feet) {
      const sourceToe = new THREE.Vector3(1, 0, 0).applyQuaternion(sample.rotations[foot.source]);
      const pitch = Math.atan2(sourceToe.y, Math.hypot(sourceToe.x, sourceToe.z));
      // Smoothly soften extreme toe-up/toe-down angles; remove shoe roll/yaw.
      const desired = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -.85 * Math.tanh(pitch / .85));
      desired.premultiply(avatarRotation);
      foot.bone.quaternion.copy(foot.bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(desired));
    }
    avatar.updateMatrixWorld(true);
    avatar.skeleton.update();
    return sample;
  };
}

// Sample one fixed correction per cycle rather than changing contacts per frame.
// The animation's root and knee curves remain untouched.
export function measureRunClearance(avatar, apply) {
  const vertex = new THREE.Vector3();
  let minimum = 0;
  for (let frame = 0; frame < 72; frame += .5) {
    apply(frame);
    for (let index = 0; index < avatar.geometry.attributes.position.count; index++) {
      vertex.fromBufferAttribute(avatar.geometry.attributes.position, index);
      avatar.applyBoneTransform(index, vertex);
      minimum = Math.min(minimum, vertex.y);
    }
  }
  return -minimum + .002;
}
