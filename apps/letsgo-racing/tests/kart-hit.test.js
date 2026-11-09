import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {HIT_SPIN_SECONDS,startHitSpin,hitSpinAngle,interpolateHitSpin} from '../src/kart-hit.js';
import {createVehicleState,stepVehicle,canEnterVehicle,findExitPosition} from '../src/vehicle-controller.js';
import {createVehicleView,createSeatedPose} from '../src/vehicle-view.js';
import {createKartFrame} from '../src/kart.js';
import {createOnFootAvatar} from '../src/on-foot/avatar.js';
import {createDriverView} from '../src/driver-view.js';
import {ARM} from '../src/claude/player/PlayerModel.ts';
import {createNpcDriver,readNpcInput} from '../src/npc/driver.js';
import {createNpcPractice} from '../src/npc/practice.js';
import {worldPhysics} from '../src/world.js';
import {projectRaceCourse} from '../src/race-course.js';
const flat={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz)=>({x:nx,z:nz})};

test('the hit animation makes one full turn and settles onto the driving heading',()=>{
 const model=createKartFrame(),apply=createVehicleView(model),state={...createVehicleState(),x:0,y:0,z:0,yaw:.6,speed:0};
 startHitSpin(state);let lastAngle=0,peak=0;let previous=model.quaternion.clone();
 apply(state);previous.copy(model.quaternion);
 for(let i=0;i<90;i++){
  stepVehicle(state,{throttle:0},1/120,flat);const angle=hitSpinAngle(state);if(state.spinTime>0){assert.ok(angle>=lastAngle);lastAngle=angle;peak=Math.max(peak,angle);}
  apply(state);assert.ok(previous.angleTo(model.quaternion)<.14,'rotation stays continuous');previous.copy(model.quaternion);
 }
 assert.equal(state.spinTime,0);assert.ok(peak>Math.PI*1.999);assert.equal(state.yaw,.6);
 assert.ok(model.quaternion.angleTo(new THREE.Quaternion().setFromEuler(new THREE.Euler(0,state.yaw,0,'YXZ')))<1e-8);
});

test('spin starts and finishes gently, with a clear sideways and backward pose',()=>{
 const at=t=>hitSpinAngle({spinTime:HIT_SPIN_SECONDS*(1-t)});
 assert.equal(at(0),0);assert.ok(Math.abs(at(.5)-Math.PI)<1e-10);assert.ok(at(.01)<.001);assert.ok(Math.PI*2-at(.99)<.001);
 assert.equal(hitSpinAngle({}),0);assert.equal(hitSpinAngle({spinTime:0}),0);
});

test('input cannot accelerate or steer a spinning kart and normal control returns afterward',()=>{
 for(const dt of [1/30,1/60,1/120]){
  const state={...createVehicleState(),x:0,y:0,z:0,yaw:.4,speed:12};startHitSpin(state);let elapsed=0;
  while(state.spinTime>0){const before=state.speed;stepVehicle(state,{throttle:1,steer:1},dt,flat);elapsed+=dt;assert.ok(state.speed<=before+1e-8);assert.equal(state.yaw,.4);}
  assert.ok(elapsed>=HIT_SPIN_SECONDS-1e-8&&elapsed<=HIT_SPIN_SECONDS+dt+1e-8);
  stepVehicle(state,{throttle:1,steer:1},dt,flat);assert.ok(state.speed>0);assert.ok(state.yaw<.4);
 }
});

test('render interpolation preserves spin onset, remaining time and the final wrap',()=>{
 const a={spinTime:0},b={spinTime:HIT_SPIN_SECONDS};assert.equal(interpolateHitSpin(a,b,.1),HIT_SPIN_SECONDS);
 assert.equal(interpolateHitSpin({spinTime:.4},{spinTime:.3},.5),.35);assert.equal(interpolateHitSpin({}, {},.5),0);
 const nearEnd={spinTime:.001},done={spinTime:0},qa=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),hitSpinAngle({spinTime:interpolateHitSpin(nearEnd,done,.9)}));
 assert.ok(qa.angleTo(new THREE.Quaternion())<1e-6);assert.deepEqual(a,{spinTime:0});assert.deepEqual(b,{spinTime:HIT_SPIN_SECONDS});
});

test('another hit keeps the current turn continuous rather than restarting the pose',()=>{
 const state=createVehicleState();startHitSpin(state);stepVehicle(state,{},.3,flat);const before=hitSpinAngle(state),time=state.spinTime;
 startHitSpin(state);assert.equal(state.spinTime,time);assert.equal(hitSpinAngle(state),before);
});

test('the driver stays seated with both hands on the steering wheel throughout the spin',()=>{
 const kart=createKartFrame(),avatar=createOnFootAvatar();kart.add(avatar);createSeatedPose(avatar)();const driver=createDriverView(avatar,kart),apply=createVehicleView(kart),wheel=kart.getObjectByName('steering_wheel'),rig=avatar.userData.characterRig;
 for(const phase of [0,.2,.4,.6,.8,1]){
  apply({...createVehicleState(),x:20,y:8,z:30,yaw:.5,pitch:.08,bank:-.1,spinTime:HIT_SPIN_SECONDS*(1-phase)});driver.update();
  for(const [suffix,side]of [['Left',-1],['Right',1]]){
   const hand=rig[`elbow${suffix}`].localToWorld(new THREE.Vector3(0,-ARM.lower,0)),grip=wheel.localToWorld(new THREE.Vector3(side*.17,.145,0));assert.ok(hand.distanceTo(grip)<.001);
  }
 }
});

test('mounting and exiting wait until the spin has finished',()=>{
 const kart={...createVehicleState(),x:0,y:0,z:0,speed:0},runner={x:2,y:0,z:0,grounded:true};startHitSpin(kart);
 assert.equal(canEnterVehicle(runner,kart),false);assert.equal(findExitPosition(kart,flat),null);
 for(let i=0;i<91;i++)stepVehicle(kart,{},1/120,flat);assert.equal(canEnterVehicle(runner,kart),true);assert.ok(findExitPosition(kart,flat));
});

test('the NPC recovers from a hit on the course and continues under its own controls',()=>{
 const npc=createNpcDriver({progress:700});let struck=false;
 for(let i=0;i<12000&&!npc.finished;i++){
  if(!struck&&npc.progress>1000){npc.state.speed*=.28;npc.state.boostTime=0;npc.state.impactRecovery=.25;startHitSpin(npc.state);npc.state.heldItem='nitro';struck=true;}
  const input=readNpcInput(npc,1/120);
  if(npc.state.spinTime>0)assert.equal(input.useItem,false);
  stepVehicle(npc.state,input,1/120,worldPhysics);
  assert.equal(npc.state.grounded,true);assert.ok(projectRaceCourse(npc.state,npc.course)?.distance<14.8);
 }
 assert.ok(struck);assert.equal(npc.finished,true);assert.equal(npc.state.spinTime,0);
});

test('a hit before the practice start completes without starting the NPC lap',()=>{
 const practice=createNpcPractice(worldPhysics,{boxes:[]});practice.start();
 const npc=practice.driver;startHitSpin(npc.state);
 for(let i=0;i<100;i++)practice.step(1/120,createVehicleState(),false);
 assert.equal(npc.state.spinTime,0);assert.equal(practice.running,false);
 assert.equal(npc.elapsed,0);assert.equal(npc.state.speed,0);
});
