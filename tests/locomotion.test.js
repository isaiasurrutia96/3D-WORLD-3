import test from 'node:test';
import assert from 'node:assert/strict';
import {createLocomotion,tickLocomotion,RUN_SPEED,WALK_SPEED} from '../src/locomotion.js';
import {sampleClip} from '../src/animation/locomotion.js';
const ticks=(state,count,input={x:0,z:1})=>{for(let i=0;i<count;i++)tickLocomotion(state,input);};
test('original flat-ground acceleration formula and 32-unit cap',()=>{
 const state=createLocomotion();tickLocomotion(state,{x:0,z:1});assert.equal(state.speed,1.1);
 tickLocomotion(state,{x:0,z:1});assert.ok(Math.abs(state.speed-(2.2-1.1/43))<1e-12);
 ticks(state,180);assert.equal(state.speed,RUN_SPEED);assert.equal(state.clip,'run');
});
test('walking transitions to the actual walk clip and slower target',()=>{
 const state=createLocomotion();ticks(state,120);ticks(state,60,{x:0,z:1,walk:true});
 assert.ok(Math.abs(state.speed-WALK_SPEED)<1.1);assert.equal(state.clip,'walk');
 ticks(state,120);assert.equal(state.clip,'run');assert.equal(state.speed,RUN_SPEED);
});
test('release brakes to idle with no residual movement',()=>{
 const state=createLocomotion();ticks(state,120);ticks(state,20,{x:0,z:0});assert.equal(state.speed,0);assert.equal(state.clip,'idle');
 const z=state.z;ticks(state,10,{x:0,z:0});assert.equal(state.z,z);
});
test('fast reversals skid before changing facing',()=>{
 const state=createLocomotion();ticks(state,120);tickLocomotion(state,{x:0,z:-1});assert.equal(state.action,'turn');assert.equal(state.yaw,0);assert.equal(state.speed,28);
 ticks(state,7,{x:0,z:-1});assert.ok(Math.abs(Math.cos(state.yaw)+1)<1e-9);assert.ok(state.speed>0);
});
test('diagonals do not exceed the forward running speed',()=>{
 const a=createLocomotion(),b=createLocomotion();ticks(a,120);ticks(b,120,{x:1,z:1});assert.equal(a.speed,b.speed);assert.ok(Math.abs(Math.hypot(b.vx,b.vz)-12)<1e-9);
});
test('slab bounds stop the character on solid ground',()=>{
 const state=createLocomotion();state.z=228.99;state.speed=32;tickLocomotion(state,{x:0,z:1});assert.equal(state.z,229);assert.equal(state.speed,0);
});
test('original animation samples decode and loop without angle discontinuities',()=>{
 assert.equal(sampleClip('run',0).y,192);assert.equal(sampleClip('walk',0).y,192);
 const a=sampleClip('run',0),b=sampleClip('run',72);
 for(let i=0;i<20;i++)assert.ok(a.rotations[i].angleTo(b.rotations[i])<1e-7);
 for(const name of ['walk','run','turn'])for(let frame=0;frame<72;frame+=0.5){
  for(const q of sampleClip(name,frame).rotations)assert.ok(Math.abs(q.length()-1)<1e-9);
 }
});
