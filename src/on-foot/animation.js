import * as THREE from 'three';
import {animateCharacter,resetCharacterAnimation} from '../claude/player/PlayerAnimation.ts';
import {TUNING} from '../claude/player/Tuning.ts';
import {createAvatar as createLegacyAvatar} from '../avatar.js';
import {createRunningAnimator} from '../animation/running.js';
import {resetRig,HIP_HEIGHT} from './avatar.js';
export function groundAnimationInput(state,dt){
 return{time:0,delta:dt,state:'ground',speed:state.speed,maxSpeed:TUNING.runSpeed,verticalSpeed:0,skidding:!!state.skidding,braking:!!state.braking,brakeStrength:state.brakeStrength??0,crouching:false,jumpKind:'normal',againstWall:false,ledgeProgress:0,ledgeWide:false,ledgeMove:'mantle',ledgeHanging:false,ledgeLift:0,landing:false,carrying:false,submerged:false,diving:false,jumpStage:1,flipAngle:0,flipAxis:'pitch',poundPhase:'none',climbing:false,climbSpeed:0,flipping:false,inputStrength:state.inputStrength??0,strokeProgress:1};
}
export function createOnFootAnimator(avatar){
 const rig=avatar.userData.characterRig;
 // Only the existing backflip still needs the hidden legacy pose bridge.
 // Walking, running and normal jumps use Claude's native rig/poses directly.
 const legacy=createLegacyAvatar(),aerial=createRunningAnimator(legacy),restPelvis=legacy.skeleton.getBoneByName('pelvis').position.y;
 const map={shoulderLeft:'left_upper_arm',shoulderRight:'right_upper_arm',elbowLeft:'left_forearm',elbowRight:'right_forearm',hipLeft:'left_thigh',hipRight:'right_thigh',kneeLeft:'left_calf',kneeRight:'right_calf',ankleLeft:'left_foot',ankleRight:'right_foot'};
 let legacyPose=false;
 function reset(){aerial.reset();resetRig(rig);resetCharacterAnimation(rig);animateCharacter(rig,groundAnimationInput({speed:0},0));legacyPose=false;}
 function update(state,dt){
  if((state.backflipPoseTime??-1)<0){
   if(legacyPose){resetRig(rig);resetCharacterAnimation(rig);legacyPose=false;}
   rig.body.position.z=0;rig.torso.rotation.set(0,0,0);
   const input=groundAnimationInput(state,dt);
   if(state.grounded===false){input.state='air';input.verticalSpeed=state.verticalVelocity;input.skidding=false;input.braking=false;}
   animateCharacter(rig,input);return state.grounded===false||state.speed>.001;
  }
  legacyPose=true;legacy.position.copy(avatar.position);legacy.rotation.copy(avatar.rotation);aerial.update(state,dt);
  const alpha=1-Math.exp(-25*dt),bone=name=>legacy.skeleton.getBoneByName(name);
  rig.body.position.y=THREE.MathUtils.lerp(rig.body.position.y,HIP_HEIGHT+bone('pelvis').position.y-restPelvis,alpha);rig.body.position.z=THREE.MathUtils.lerp(rig.body.position.z,bone('pelvis').position.z,alpha);rig.body.scale.set(1,1,1);if(state.backflipPoseTime>=0)rig.body.quaternion.copy(bone('pelvis').quaternion);else rig.body.quaternion.slerp(bone('pelvis').quaternion,alpha);
  rig.torso.quaternion.copy(bone('spine').quaternion).multiply(bone('chest').quaternion);rig.head.quaternion.copy(bone('neck').quaternion).multiply(bone('head').quaternion);
  for(const [name,source]of Object.entries(map))rig[name].quaternion.slerp(bone(source).quaternion,alpha);
  return true;
 }
 reset();return{reset,update};
}
