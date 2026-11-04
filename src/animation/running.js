import * as THREE from 'three';
import { FOOT_PROFILE } from '../avatar.js';
import { RUN_SPEED, STRIDE_LENGTH } from '../running-controller.js';
import { createAdaptedRun, measureRunClearance } from './adapted-run.js';

export function createRunningAnimator(avatar) {
  const rest = avatar.skeleton.bones.map(bone => ({
    bone, position: bone.position.clone(), quaternion: bone.quaternion.clone(),
  }));
  const apply = createAdaptedRun(avatar);
  const clearance = measureRunClearance(avatar, apply);
  const pelvis = avatar.skeleton.bones.find(bone => bone.name === 'pelvis');
  let weight = 0;
  function reset() {
    for (const item of rest) {
      item.bone.position.copy(item.position);
      item.bone.quaternion.copy(item.quaternion);
    }
    weight = 0;
  }
  reset();
  return {
    reset,
    update(state, dt) {
      weight = THREE.MathUtils.damp(weight, Math.min(1, state.speed / RUN_SPEED), 18, dt);
      if (state.speed === 0 && weight < .001) { reset(); return false; }
      const frame = 9 + state.distance / STRIDE_LENGTH * 72;
      apply(frame);
      pelvis.position.y += clearance;
      for (const item of rest) {
        item.bone.position.lerpVectors(item.position, item.bone.position.clone(), weight);
        item.bone.quaternion.slerpQuaternions(item.quaternion, item.bone.quaternion.clone(), weight);
      }
      avatar.updateMatrixWorld(true);
      // Quaternion blending can dip an oversized shoe through the floor during
      // startup/stop even when both endpoint poses clear it. Lift the pelvis
      // only for that penetration; do not replace leg angles with foot IK.
      let lowest = Infinity;
      for (const side of ['left', 'right']) {
        const foot = avatar.skeleton.bones.find(bone => bone.name === `${side}_foot`);
        const rotation = foot.getWorldQuaternion(new THREE.Quaternion());
        const center = new THREE.Vector3(side === 'left' ? -.015 : .015,
          FOOT_PROFILE.centerHeight - FOOT_PROFILE.ankleHeight, FOOT_PROFILE.forwardOffset)
          .applyQuaternion(rotation).add(foot.getWorldPosition(new THREE.Vector3()));
        const up = new THREE.Vector3(0, 1, 0).applyQuaternion(rotation.clone().invert());
        lowest = Math.min(lowest, center.y - Math.hypot(up.x * FOOT_PROFILE.radiusX, up.y * FOOT_PROFILE.radiusY, up.z * FOOT_PROFILE.radiusZ));
      }
      if (lowest < 0) { pelvis.position.y -= lowest; avatar.updateMatrixWorld(true); }
      avatar.skeleton.update();
      return true;
    },
  };
}
