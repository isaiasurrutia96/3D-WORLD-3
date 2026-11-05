import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import reference from './fixtures/claude-jump-b60e295.json' with {type:'json'};
import {createOnFootAvatar} from '../src/on-foot/avatar.js';
import {createOnFootState,stepOnFoot,STEP} from '../src/on-foot/controller.js';
import {createOnFootAnimator} from '../src/on-foot/animation.js';
import {RUN_SPEED} from '../src/on-foot/ground-movement.js';
import {createVehicleState,stepVehicle,VEHICLE_TOP_SPEED} from '../src/vehicle-controller.js';
import {readDrivingInput} from '../src/input.js';
const flat={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz)=>({x:nx,z:nz})};
function advance(kart,seconds,input,world=flat){for(let i=0;i<Math.round(seconds/STEP);i++)stepVehicle(kart,input,STEP,world);}
const angle=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));

test('normal jump rises higher, stays single per press and preserves the ground run speed',()=>{
 const state=createOnFootState();let apex=0;
 for(let i=0;i<240;i++){
  stepOnFoot(state,{x:0,z:1,sprint:true,jump:true},STEP,flat);
  apex=Math.max(apex,state.y);assert.ok(state.speed<=RUN_SPEED+1e-9);
 }
 assert.ok(apex>1.65&&apex<1.72,`source-tuned jump apex: ${apex}`);
 assert.equal(state.grounded,true);assert.equal(state.jumpCount,1);
 // Repeated airborne Space presses do not add boosts, flips or pounds.
 const repeated=createOnFootState();
 for(let i=0;i<100;i++)stepOnFoot(repeated,{x:0,z:0,jump:i===0||i===20||i===40},STEP,flat);
 assert.equal(repeated.jumpCount,1);assert.equal(repeated.grounded,true);
});

test('jump arms, tucked legs and landing blend match snapshots from Claude’s original animation',()=>{
 const avatar=createOnFootAvatar(),rig=avatar.userData.characterRig,animation=createOnFootAnimator(avatar);
 for(const sample of reference.samples){
  const state={...createOnFootState(),grounded:sample.state==='ground',verticalVelocity:sample.verticalSpeed};
  for(let i=0;i<sample.ticks;i++)animation.update(state,reference.delta);
  for(const [name,expected]of Object.entries(sample.pose)){
   const actual=[...rig[name].position.toArray(),...rig[name].quaternion.toArray(),...rig[name].scale.toArray()];
   actual.forEach((value,i)=>assert.ok(Math.abs(value-expected[i])<1e-9,`${sample.state}: ${name}[${i}]`));
  }
 }
 animation.reset();for(let i=0;i<8;i++)animation.update({...createOnFootState(),grounded:false,verticalVelocity:6},1/60);
 avatar.updateMatrixWorld(true);
 for(const side of ['Left','Right']){
  const hand=rig[`elbow${side}`].localToWorld(new THREE.Vector3(0,-.34,0));
  assert.ok(hand.y>rig.head.getWorldPosition(new THREE.Vector3()).y,'hands swing above the head during ascent');
 }
});

test('drift requires speed and steering; brake, reverse, airborne and spin states cancel it',()=>{
 for(const settings of [{speed:0},{speed:6},{speed:20,grounded:false},{speed:-8},{speed:25,spinTime:.5}]){
  const kart={...createVehicleState(),...settings};stepVehicle(kart,{throttle:0,steer:1,drift:true},STEP,flat);assert.equal(kart.drifting,false);
 }
 const kart={...createVehicleState(),speed:25};advance(kart,.2,{throttle:1,drift:true});assert.equal(kart.drifting,false);
 advance(kart,.2,{throttle:1,steer:1,drift:true});assert.equal(kart.drifting,true);
 stepVehicle(kart,{throttle:1,steer:1,drift:true,brake:true},STEP,flat);assert.equal(kart.drifting,false);
 stepVehicle(kart,{throttle:-1,steer:1,drift:true},STEP,flat);assert.equal(kart.drifting,false);
});

test('drifting creates mirrored sideways travel and release restores grip without a boost',()=>{
 const right={...createVehicleState(),x:0,z:0,yaw:0,speed:30},left={...right};
 advance(right,.7,{throttle:1,steer:1,drift:true});advance(left,.7,{throttle:1,steer:-1,drift:true});
 assert.ok(right.drifting&&left.drifting);assert.ok(right.driftAngle>.4&&left.driftAngle<-.4);
 assert.ok(Math.abs(right.x+left.x)<1e-9&&Math.abs(right.z-left.z)<1e-9);assert.ok(Math.abs(right.yaw+left.yaw)<1e-9);
 const previous={...right};stepVehicle(right,{throttle:1,steer:1,drift:true},STEP,flat);
 const travelYaw=Math.atan2(right.x-previous.x,right.z-previous.z);
 assert.ok(Math.abs(angle(travelYaw,right.yaw))>.4,'body is visibly angled into the slide');
 const slip=right.driftAngle;stepVehicle(right,{throttle:1},STEP,flat);
 assert.ok(!right.drifting&&right.driftAngle<slip&&right.driftAngle>slip*.9,'grip returns smoothly');
 advance(right,1.2,{throttle:1});assert.ok(Math.abs(right.driftAngle)<.001);assert.equal(right.speed,VEHICLE_TOP_SPEED);assert.equal(right.boostTime,0);
});

test('countersteering progressively opens a held drift and retains the corrected arc',()=>{
 const tight={...createVehicleState(),x:0,z:0,yaw:0,speed:30};advance(tight,.25,{throttle:1,steer:1,drift:true});
 const open={...tight},startYaw=tight.yaw;
 advance(tight,.5,{throttle:1,steer:1,drift:true});advance(open,.5,{throttle:1,steer:-1,drift:true});
 assert.equal(open.driftDirection,1);assert.ok(open.driftAngle>0&&open.driftAngle<tight.driftAngle);
 assert.ok(Math.abs(open.yaw-startYaw)<Math.abs(tight.yaw-startYaw)*.8,'the arc opens progressively rather than changing direction instantly');
 const correction=open.driftTurn;assert.ok(correction<.11);
 advance(open,.6,{throttle:1,drift:true});assert.equal(open.driftTurn,correction);
 assert.ok(open.steering>0&&open.steering<tight.steering*.15,'corrected curve is retained without flipping into the opposite turn');
 advance(open,.3,{throttle:1,steer:-1,drift:true});advance(open,.8,{throttle:1,drift:true});
 assert.equal(open.driftTurn,0);assert.ok(Math.abs(open.steering)<.0001&&Math.abs(open.driftAngle)<.001,'longer countersteer straightens the slide');
});

test('Space is the kart e-brake/drift input and A no longer activates it',()=>{
 assert.deepEqual(readDrivingInput(new Set(['KeyE','KeyS','Space'])),{throttle:1,steer:-1,drift:true});
 assert.deepEqual(readDrivingInput(new Set(['KeyE','KeyF','KeyA'])),{throttle:1,steer:1,drift:false});
 assert.deepEqual(readDrivingInput(new Set(['KeyD','Space'])),{throttle:-1,steer:0,drift:true});
 assert.deepEqual(readDrivingInput(new Set(['KeyE','Space'])),{throttle:1,steer:0,drift:true});
 assert.deepEqual(readDrivingInput(new Set(['KeyE','ArrowLeft','Space'])),{throttle:1,steer:-1,drift:true});
 assert.deepEqual(readDrivingInput(new Set(['KeyE','KeyS','ArrowLeft'])),{throttle:1,steer:-1,drift:false});
 assert.deepEqual(readDrivingInput(new Set(['KeyE','ArrowRight'])),{throttle:1,steer:1,drift:false});
 assert.deepEqual(readDrivingInput(new Set(['KeyS','ArrowRight'])),{throttle:0,steer:0,drift:false});
});

test('releasing steering preserves the established drift arc in either direction',()=>{
 for(const direction of [-1,1]){
  const kart={...createVehicleState(),x:0,z:0,yaw:0,speed:VEHICLE_TOP_SPEED};
  advance(kart,.8,{throttle:1,steer:direction,drift:true});
  assert.ok(Math.abs(kart.driftAngle)>.54,'stronger full-steer slide than the previous 0.44 rad maximum');
  const fullSteering=Math.abs(kart.steering),fullSlip=Math.abs(kart.driftAngle),turn=kart.driftTurn;
  stepVehicle(kart,{throttle:1,drift:true},STEP,flat);
  assert.ok(Math.abs(kart.driftAngle-fullSlip*direction)<.03,'no abrupt grip change when steering is released');
  advance(kart,1.2,{throttle:1,drift:true});
  assert.equal(kart.drifting,true);assert.equal(kart.driftDirection,direction);
  assert.equal(kart.driftTurn,turn);assert.ok(Math.abs(kart.driftAngle)>.55,'neutral input retains the existing slide');
  assert.ok(Math.abs(kart.steering)>fullSteering*.99&&Math.abs(kart.steering)<fullSteering*1.01,'neutral input retains the existing curve');
  const yaw=kart.yaw;advance(kart,.5,{throttle:1,drift:true});
  assert.ok(Math.abs(kart.yaw-yaw)>.9&&Math.abs(kart.yaw-yaw)<1,'continues the established turning arc');
 }
});

test('E plus Space preserves speed during established and neutral drifts without adding boost',()=>{
 const kart={...createVehicleState(),x:0,z:0,yaw:0,speed:VEHICLE_TOP_SPEED};
 advance(kart,.5,{throttle:1,steer:1,drift:true});
 for(let i=0;i<1200;i++){
  stepVehicle(kart,{throttle:1,steer:i<240?1:0,drift:true},STEP,flat);
  assert.equal(kart.speed,VEHICLE_TOP_SPEED);assert.equal(kart.boostTime,0);
 }
 const boosted={...createVehicleState(),speed:42,boostTime:2};
 advance(boosted,1,{throttle:1,steer:1,drift:true});assert.equal(boosted.speed,66);assert.equal(boosted.drifting,true);
});

test('straight-line Space braking overrides E and nitro, with no acceleration from rest',()=>{
 const braking={...createVehicleState(),speed:30},coasting={...braking};
 advance(braking,.5,{drift:true});advance(coasting,.5,{});
 assert.ok(braking.speed<13&&coasting.speed>27);advance(braking,.5,{drift:true});assert.equal(braking.speed,0);
 for(const boostTime of [0,2]){
  const powered={...createVehicleState(),speed:42,boostTime};advance(powered,.5,{throttle:1,drift:true});
  assert.ok(powered.speed>17.9&&powered.speed<18.1,'e-brake overcomes engine power');advance(powered,.5,{throttle:1,drift:true});assert.equal(powered.speed,0);
 }
 const launch=createVehicleState();advance(launch,1,{throttle:1,drift:true});assert.equal(launch.speed,0);assert.equal(launch.drifting,false);
});

test('a brief countersteer makes a smaller lasting correction than holding it longer',()=>{
 for(const direction of [-1,1]){
  const original={...createVehicleState(),speed:42};advance(original,.8,{throttle:1,steer:direction,drift:true});
  const brief={...original},long={...original};
  advance(brief,.1,{throttle:1,steer:-direction,drift:true});advance(long,.3,{throttle:1,steer:-direction,drift:true});
  const briefTurn=brief.driftTurn,longTurn=long.driftTurn;
  assert.ok(briefTurn>longTurn&&longTurn>0);
  advance(brief,.5,{throttle:1,drift:true});advance(long,.5,{throttle:1,drift:true});
  assert.equal(brief.driftTurn,briefTurn);assert.equal(long.driftTurn,longTurn);assert.ok(Math.abs(brief.steering)>Math.abs(long.steering));
 }
});

test('a drifting rail contact cancels the slide and keeps moving along the barrier',()=>{
 const wall={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz)=>({x:Math.min(nx,8),z:nz})};
 const kart={...createVehicleState(),x:0,z:0,yaw:Math.PI/2,speed:30};let contact=false,contactZ=0;
 for(let i=0;i<180;i++){
  const previous={...kart};stepVehicle(kart,{throttle:1,steer:1,drift:!contact},STEP,wall);
  if(!contact&&kart.railContactTime>0){contact=true;contactZ=kart.z;assert.ok(kart.speed>previous.speed*.93);assert.equal(kart.drifting,false);assert.equal(kart.driftAngle,0);}
  if(contact)assert.equal(kart.drifting,false,'releasing Space after contact keeps the slide cancelled');
 }
 assert.ok(contact);assert.ok(kart.x<=8);assert.ok(Math.abs(kart.z-contactZ)>15);assert.ok(kart.speed>30);
 stepVehicle(kart,{throttle:1},STEP,flat);stepVehicle(kart,{throttle:1,steer:-1,drift:true},STEP,flat);assert.equal(kart.drifting,true);
});
