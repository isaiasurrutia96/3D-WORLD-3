import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createVehicleState,stepVehicle,canEnterVehicle,findExitPosition,resolveParkedKart,VEHICLE_TOP_SPEED,REVERSE_SPEED} from '../src/vehicle-controller.js';
import {worldPhysics} from '../src/world.js';
import {trackSamples} from '../src/track.js';
import {createAvatar} from '../src/avatar.js';
import {createJumpClip} from '../src/animation/jump-clip.js';
import {createSeatedPose,createVehicleView} from '../src/vehicle-view.js';
import {createKartFrame} from '../src/kart.js';
const DT=1/120;
const flat={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz)=>({x:nx,z:nz})};
function advance(state,seconds,input,world=flat){for(let i=0;i<Math.round(seconds/DT);i++)stepVehicle(state,input,DT,world);}

test('kart accelerates, coasts, brakes and reverses with bounded speed',()=>{
 const state=createVehicleState();advance(state,4,{throttle:1});assert.equal(state.speed,VEHICLE_TOP_SPEED);
 assert.ok(state.x>150);assert.ok(state.wheelRotation>0);
 advance(state,.5,{});assert.ok(state.speed<VEHICLE_TOP_SPEED&&state.speed>20);
 advance(state,2,{brake:true});assert.equal(state.speed,0);
 advance(state,2,{throttle:-1});assert.equal(state.speed,-REVERSE_SPEED);
 const stopped=createVehicleState();advance(stopped,1,{steer:1});assert.equal(stopped.yaw,Math.PI/2);
});
test('left/right steering is mirrored, smooth and independent of camera',()=>{
 const left=createVehicleState(),right=createVehicleState();
 advance(left,1,{throttle:1,steer:-1});advance(right,1,{throttle:1,steer:1});
 assert.ok(left.yaw>Math.PI/2);assert.ok(right.yaw<Math.PI/2);
 assert.ok(Math.abs((left.yaw-Math.PI/2)+(right.yaw-Math.PI/2))<1e-10);
 const angle=right.steering;advance(right,.5,{});assert.ok(Math.abs(right.steering)<Math.abs(angle));
});
test('entry requires proximity and grounded states; exit requires a safe stopped position',()=>{
 const kart=createVehicleState(),runner={x:kart.x-2,y:0,z:kart.z,grounded:true};
 assert.equal(canEnterVehicle(runner,kart),true);assert.equal(canEnterVehicle({...runner,x:0},kart),false);
 assert.equal(canEnterVehicle({...runner,grounded:false},kart),false);
 const exit=findExitPosition(kart,worldPhysics);assert.ok(exit);assert.equal(exit.y,0);
 assert.equal(findExitPosition({...kart,speed:5},worldPhysics),null);
 const parked=resolveParkedKart(kart.x,kart.z,0,kart);assert.ok(Math.hypot(parked.x-kart.x,parked.z-kart.z)>1.5);
});
test('kart crosses the access bridge, respects rails and uses elevated ramp surfaces',()=>{
 const kart=createVehicleState();let peak=kart.x,bounced=false;
 for(let i=0;i<720;i++){stepVehicle(kart,{throttle:1},DT,worldPhysics);peak=Math.max(peak,kart.x);if(kart.x>150&&Math.sin(kart.yaw)<0)bounced=true;assert.ok(kart.y>-.01);}
 assert.ok(peak>150&&peak<166);assert.ok(bounced,'Kart rebounds away from the outer rail');assert.ok(kart.x<peak-10,'Holding throttle continues away from the wall');assert.equal(kart.grounded,true);
 const sample=trackSamples.find(s=>s.point.y>8&&s.point.z>60&&s.point.z<85).point;
 const above=Object.assign(createVehicleState(),{x:sample.x,y:sample.y,z:sample.z});advance(above,.5,{brake:true},worldPhysics);
 assert.ok(above.y>8);assert.equal(above.grounded,true);
 const below=Object.assign(createVehicleState(),{x:sample.x,y:0,z:sample.z});advance(below,.5,{brake:true},worldPhysics);assert.ok(below.y<.1);
 const ramp=trackSamples.find(s=>s.point.y>3&&s.point.y<5).point;
 const slope=Object.assign(createVehicleState(),{x:ramp.x,y:ramp.y,z:ramp.z});advance(slope,1,{brake:true},worldPhysics);
 assert.ok(Number.isFinite(slope.pitch));assert.ok(Math.abs(slope.pitch)+Math.abs(slope.bank)>.01);
});
test('kart wheels roll/steer, driver pose is finite and jump takeoff is asymmetric',()=>{
 const kart=createKartFrame(),view=createVehicleView(kart),state=createVehicleState();advance(state,.5,{throttle:1,steer:1});view(state);
 assert.notEqual(kart.getObjectByName('front_axle_left_wheel').rotation.x,0);
 assert.notEqual(kart.getObjectByName('front_axle_left_wheel').rotation.y,0);
 const avatar=createAvatar();kart.add(avatar);createSeatedPose(avatar)();
 for(const bone of avatar.skeleton.bones)for(const value of bone.quaternion.toArray())assert.ok(Number.isFinite(value));
 const jumping=createAvatar(),mixer=new THREE.AnimationMixer(jumping),action=mixer.clipAction(createJumpClip(jumping)).play();action.time=.05;mixer.update(0);jumping.updateMatrixWorld(true);
 const left=jumping.skeleton.getBoneByName('left_foot').getWorldPosition(new THREE.Vector3());
 const right=jumping.skeleton.getBoneByName('right_foot').getWorldPosition(new THREE.Vector3());assert.ok(left.y>right.y+.03);
});

test('a driven lap can traverse every curve and both overpass levels',()=>{
 const first=trackSamples[0].point,next=trackSamples[1].point;
 const state=Object.assign(createVehicleState(),{x:first.x,y:first.y,z:first.z,yaw:Math.atan2(next.x-first.x,next.z-first.z)});
 let index=1,peak=0;
 for(let frame=0;frame<150000&&index<trackSamples.length;frame++){
  const waypoint=trackSamples[index].point;
  if(Math.hypot(waypoint.x-state.x,waypoint.z-state.z)<5){index++;continue;}
  const target=trackSamples[Math.min(index+2,trackSamples.length-1)].point;
  const desired=Math.atan2(target.x-state.x,target.z-state.z);
  const error=Math.atan2(Math.sin(desired-state.yaw),Math.cos(desired-state.yaw));
  stepVehicle(state,{throttle:state.speed<12?1:0,steer:Math.max(-1,Math.min(1,-error*2)),brake:state.speed>14},DT,worldPhysics);
  peak=Math.max(peak,state.y);assert.equal(state.grounded,true);assert.ok(state.y> -1);
 }
 assert.equal(index,trackSamples.length);assert.ok(peak>8);
});

test('head-on and oblique wall impacts rebound rather than pinning the kart',()=>{
 const wall={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz)=>({x:Math.min(nx,8),z:nz})};
 for(const yaw of [Math.PI/2,Math.PI/3]){
  const kart={...createVehicleState(),x:0,z:0,yaw,speed:25};let bounced=false;
  for(let i=0;i<120;i++){stepVehicle(kart,{throttle:1},DT,wall);if(Math.sin(kart.yaw)<0)bounced=true;}
  assert.ok(bounced);assert.ok(kart.x<5);assert.ok(kart.speed>5);
 }
});
