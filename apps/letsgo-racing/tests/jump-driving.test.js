import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import reference from './fixtures/claude-jump-b60e295.json' with {type:'json'};
import {createOnFootAvatar} from '../src/on-foot/avatar.js';
import {createOnFootState,stepOnFoot,STEP} from '../src/on-foot/controller.js';
import {createOnFootAnimator} from '../src/on-foot/animation.js';
import {RUN_SPEED} from '../src/on-foot/ground-movement.js';
import {createVehicleState,stepVehicle} from '../src/vehicle-controller.js';
import {readDrivingInput} from '../src/input.js';
const flat={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz)=>({x:nx,z:nz})};
function advance(kart,seconds,input,world=flat){for(let i=0;i<Math.round(seconds/STEP);i++)stepVehicle(kart,input,STEP,world);}

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
test('Space cannot change kart speed, heading or steering during a full turn',()=>{
 for(const steer of [-1,0,1]){
  const plain={...createVehicleState(),speed:42},space={...plain};
  advance(plain,2,readDrivingInput(new Set(steer<0?['KeyE','KeyS']:steer>0?['KeyE','KeyF']:['KeyE'])));
  advance(space,2,readDrivingInput(new Set(steer<0?['KeyE','KeyS','Space']:steer>0?['KeyE','KeyF','Space']:['KeyE','Space'])));
  for(const field of ['x','z','yaw','steering','speed'])assert.equal(space[field],plain[field]);
  assert.equal('drifting' in space,false);assert.equal('driftAngle' in space,false);
 }
});

test('D, Down Arrow and mobile brake retain priority over Gas and Nitro',()=>{
 for(const input of [readDrivingInput(new Set(['KeyE','KeyD'])),readDrivingInput(new Set(['KeyE','ArrowDown'])),readDrivingInput(new Set(),{gas:true,secondary:true})]){
  const kart={...createVehicleState(),speed:42,boostTime:2};advance(kart,.5,input);assert.ok(Math.abs(kart.speed-24)<1e-8);
 }
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
