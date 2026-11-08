import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createOnFootAvatar,resetRig} from '../src/on-foot/avatar.js';
import {createKartFrame} from '../src/kart.js';
import {createVehicleState} from '../src/vehicle-controller.js';
import {createSeatedPose,createVehicleView,frontWheelAngles} from '../src/vehicle-view.js';
import {createDriverView} from '../src/driver-view.js';
import {ARM} from '../src/claude/player/PlayerModel.ts';

test('front tires follow the steering radius while wheel roll stays on the axle',()=>{
 const kart=createKartFrame(),apply=createVehicleView(kart);
 for(const steering of [-.4,-.08,0,.08,.4]){
  const angles=frontWheelAngles(steering);apply({...createVehicleState(),steering,wheelRotation:2.4});
  for(const side of ['left','right']){
   const front=kart.getObjectByName(`front_axle_${side}_wheel`),rear=kart.getObjectByName(`rear_axle_${side}_wheel`);
   assert.equal(front.rotation.y,angles[side]);assert.equal(front.rotation.x,2.4);assert.equal(rear.rotation.y,0);assert.equal(rear.rotation.x,2.4);
   if(steering)assert.equal(Math.sign(angles[side]),-Math.sign(steering));
  }
  if(steering){
   const inner=steering>0?'left':'right',outer=steering>0?'right':'left';assert.ok(Math.abs(angles[inner])>Math.abs(angles[outer]));
   const innerRadius=2.03/Math.tan(Math.abs(angles[inner]))+1.04,outerRadius=2.03/Math.tan(Math.abs(angles[outer]))-1.04;
   assert.ok(Math.abs(innerRadius-outerRadius)<1e-9,'both tires turn around the same point');
  }else assert.deepEqual(angles,{left:0,right:0});
 }
});

test('both driver hands follow the actual wheel through steering, heading, pitch and bank',()=>{
 const kart=createKartFrame(),avatar=createOnFootAvatar();kart.add(avatar);createSeatedPose(avatar)();
 const rig=avatar.userData.characterRig,driver=createDriverView(avatar,kart),apply=createVehicleView(kart),wheel=kart.getObjectByName('steering_wheel');
 for(const steering of [0,-.42,.42,-.09,.09]){
  apply({...createVehicleState(),x:25,y:6,z:-30,yaw:1,pitch:.1,bank:-.12,steering});driver.update();
  for(const [suffix,side]of [['Left',-1],['Right',1]]){
   const shoulder=rig[`shoulder${suffix}`],elbow=rig[`elbow${suffix}`];
   const hand=elbow.localToWorld(new THREE.Vector3(0,-ARM.lower,0)),grip=wheel.localToWorld(new THREE.Vector3(side*.17,.145,0));
   assert.ok(hand.distanceTo(grip)<.001,'hand stays attached to wheel grip');
   assert.ok(Math.abs(shoulder.getWorldPosition(new THREE.Vector3()).distanceTo(elbow.getWorldPosition(new THREE.Vector3()))-ARM.upper)<1e-10,'upper arm length is preserved');
   for(const value of [...shoulder.quaternion.toArray(),...elbow.quaternion.toArray()])assert.ok(Number.isFinite(value));
  }
 }
 const originalShoulder=rig.shoulderLeft.position.clone(),originalElbow=rig.elbowLeft.position.clone();
 resetRig(rig);assert.ok(rig.shoulderLeft.position.equals(originalShoulder));assert.ok(rig.elbowLeft.position.equals(originalElbow));
 assert.ok(rig.shoulderLeft.quaternion.angleTo(new THREE.Quaternion())<1e-10);assert.ok(rig.elbowLeft.quaternion.angleTo(new THREE.Quaternion())<1e-10);
});

test('first-person visibility clears the eye while preserving arms and restoring the avatar',()=>{
 const kart=createKartFrame(),avatar=createOnFootAvatar();kart.add(avatar);const rig=avatar.userData.characterRig;
 const torsoMeshes=rig.torso.children.filter(child=>child.isMesh),hiddenBefore=torsoMeshes[0];hiddenBefore.visible=false;
 const driver=createDriverView(avatar,kart);driver.firstPerson(true);
 assert.equal(rig.head.visible,false);assert.ok(torsoMeshes.every(mesh=>!mesh.visible));assert.equal(rig.shoulderLeft.visible,true);assert.equal(rig.shoulderRight.visible,true);
 driver.firstPerson(false);assert.equal(rig.head.visible,true);assert.equal(hiddenBefore.visible,false);assert.ok(torsoMeshes.slice(1).every(mesh=>mesh.visible));
});
