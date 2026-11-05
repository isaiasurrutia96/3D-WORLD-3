import {resetRig,HIP_HEIGHT} from './on-foot/avatar.js';
import * as THREE from 'three';

export function createVehicleView(model){
 const wheels=[];
 for(const axle of ['front_axle','rear_axle'])for(const side of ['left','right'])wheels.push({node:model.getObjectByName(`${axle}_${side}_wheel`),front:axle==='front_axle'});
 const steering=model.getObjectByName('steering_wheel'),steeringRest=steering.quaternion.clone();
 const spin=new THREE.Quaternion(),axis=new THREE.Vector3(0,0,1);
 return function apply(state){
  model.position.set(state.x,state.y,state.z);model.rotation.set(state.pitch,state.yaw,state.bank,'YXZ');
  for(const wheel of wheels)wheel.node.rotation.set(state.wheelRotation,wheel.front?-state.steering:0,0,'YXZ');
  steering.quaternion.copy(steeringRest).multiply(spin.setFromAxisAngle(axis,-state.steering*2.5));
 };
}
export function createSeatedPose(avatar){
 const rig=avatar.userData.characterRig;
 if(rig)return function apply(){
  resetRig(rig);rig.torso.rotation.x=.05;
  for(const [side,sign]of [['Left',-1],['Right',1]]){
   rig[`hip${side}`].rotation.x=-1.60;rig[`knee${side}`].rotation.x=.22;rig[`ankle${side}`].rotation.x=1.38;
   rig[`shoulder${side}`].rotation.set(-.95,0,-sign*.25);rig[`elbow${side}`].rotation.x=-1.30;
  }
  avatar.position.set(0,.59-HIP_HEIGHT,-.45);avatar.rotation.set(0,0,0);avatar.updateMatrixWorld(true);
 };

 const bones=new Map(avatar.skeleton.bones.map(bone=>[bone.name,bone]));
 const rest=avatar.skeleton.bones.map(bone=>({bone,position:bone.position.clone(),quaternion:bone.quaternion.clone()}));
 return function apply(){
  for(const item of rest){item.bone.position.copy(item.position);item.bone.quaternion.copy(item.quaternion);}
  bones.get('spine').rotation.x=.05;
  for(const [side,sign]of [['left',-1],['right',1]]){
   bones.get(`${side}_thigh`).rotation.x=-1.60;
   bones.get(`${side}_calf`).rotation.x=.22;
   bones.get(`${side}_foot`).rotation.x=1.38;
   bones.get(`${side}_upper_arm`).rotation.set(-.80,0,-sign*.45);
   bones.get(`${side}_forearm`).rotation.x=-1.15;
   bones.get(`${side}_hand`).rotation.x=-.1;
  }
  avatar.position.set(0,-.32,-.45);avatar.rotation.set(0,0,0);avatar.updateMatrixWorld(true);avatar.skeleton.update();
 };
}
