import * as THREE from 'three';
import { RUN_SPEED } from '../running-controller.js';
import { createRunClip, RUN_DURATION, RUN_STRIDE } from './run-clip.js';
import { FOOT_PROFILE } from '../avatar.js';

export function createRunningAnimator(avatar) {
  const rest=avatar.skeleton.bones.map(bone=>({bone,position:bone.position.clone(),quaternion:bone.quaternion.clone()}));
  const mixer=new THREE.AnimationMixer(avatar);
  const action=mixer.clipAction(createRunClip(avatar));
  const pelvis=avatar.skeleton.bones.find(bone=>bone.name==='pelvis');
  const feet=['left','right'].map(side=>avatar.skeleton.bones.find(bone=>bone.name===`${side}_foot`));
  let weight=0;
  function reset() {
    action.stop(); weight=0;
    for (const item of rest) {item.bone.position.copy(item.position);item.bone.quaternion.copy(item.quaternion);}
  }
  function update(state,dt) {
    weight=THREE.MathUtils.damp(weight,Math.min(1,state.speed/RUN_SPEED),22,dt);
    if (state.speed===0 && weight<.001) {reset();return false;}
    action.play(); action.setEffectiveWeight(weight);
    action.time=((state.distance/RUN_STRIDE)%1)*RUN_DURATION;
    mixer.update(0);
    avatar.updateMatrixWorld(true);
    // Preserve the authored leg pose during a rest/run blend. Only correct
    // penetration of the large shoes; there is no per-frame stance solver.
    let minimum=0;
    for (const foot of feet) {
      const q=foot.getWorldQuaternion(new THREE.Quaternion());
      const up=new THREE.Vector3(0,1,0).applyQuaternion(q.clone().invert());
      const center=new THREE.Vector3(foot.name.startsWith('left')?-.015:.015,
        FOOT_PROFILE.centerHeight-FOOT_PROFILE.ankleHeight,FOOT_PROFILE.forwardOffset)
        .applyQuaternion(q).add(foot.getWorldPosition(new THREE.Vector3()));
      minimum=Math.min(minimum,center.y-Math.hypot(up.x*FOOT_PROFILE.radiusX,up.y*FOOT_PROFILE.radiusY,up.z*FOOT_PROFILE.radiusZ));
    }
    if (minimum<0) {pelvis.position.y-=minimum;avatar.updateMatrixWorld(true);}
    avatar.skeleton.update();return true;
  }
  reset();
  return {reset,update};
}
