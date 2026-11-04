import test from 'node:test';
import assert from 'node:assert/strict';
import {createLocomotion,tickLocomotion,RUN_SPEED,WALK_SPEED} from '../src/locomotion.js';
import {createSM64Rig,BONES,sampleChannel} from '../src/sm64-rig.js';
const ticks=(state,count,input={x:0,z:1})=>{for(let i=0;i<count;i++)tickLocomotion(state,input);};
test('quicker eased acceleration retains the 32-unit top speed',()=>{
 const state=createLocomotion();tickLocomotion(state,{x:0,z:1});assert.equal(state.speed,1.55);
 tickLocomotion(state,{x:0,z:1});assert.ok(Math.abs(state.speed-(3.1-1.55/43))<1e-12);
 ticks(state,30);assert.equal(state.speed,RUN_SPEED);assert.equal(state.clip,'run');
});
test('walking transitions to the actual walk clip and slower target',()=>{
 const state=createLocomotion();ticks(state,120);ticks(state,60,{x:0,z:1,walk:true});
 assert.ok(Math.abs(state.speed-WALK_SPEED)<1.1);assert.equal(state.clip,'walk');
 ticks(state,120);assert.equal(state.clip,'run');assert.equal(state.speed,RUN_SPEED);
});
test('release brakes to idle with no residual movement',()=>{
 const state=createLocomotion();ticks(state,120);ticks(state,60,{x:0,z:0});assert.equal(state.speed,0);assert.equal(state.clip,'idle');
 const z=state.z;ticks(state,10,{x:0,z:0});assert.equal(state.z,z);
});
test('reversals ease speed down and turn without a single-frame facing flip',()=>{
 const state=createLocomotion();ticks(state,120);tickLocomotion(state,{x:0,z:-1});assert.equal(state.action,'turn');assert.equal(state.yaw,0);assert.ok(state.speed>30&&state.speed<32);
 for(let i=0;i<60;i++){const old=state.yaw;tickLocomotion(state,{x:0,z:-1});assert.ok(Math.abs(Math.atan2(Math.sin(state.yaw-old),Math.cos(state.yaw-old)))<=Math.PI/10+1e-9);}
 assert.ok(Math.abs(Math.cos(state.yaw)+1)<1e-9);
});
test('diagonals do not exceed the forward running speed',()=>{
 const a=createLocomotion(),b=createLocomotion();ticks(a,120);ticks(b,120,{x:1,z:1});assert.equal(a.speed,b.speed);assert.ok(Math.abs(Math.hypot(b.vx,b.vz)-12)<1e-9);
});
test('slab bounds stop the character on solid ground',()=>{
 const state=createLocomotion();state.z=228.99;state.speed=32;tickLocomotion(state,{x:0,z:1});assert.equal(state.z,229);assert.equal(state.speed,0);
});
test('braking eases in and settles without a velocity snap',()=>{
 const state=createLocomotion();ticks(state,120);let old=state.speed;
 tickLocomotion(state,{x:0,z:0});assert.ok(old-state.speed<1.1);
 for(let i=0;i<60;i++){old=state.speed;tickLocomotion(state,{x:0,z:0});assert.ok(state.speed<=old);assert.ok(old-state.speed<3);}
 assert.equal(state.speed,0);
});
test('single jump rises, falls and lands exactly on the slab',()=>{
 const state=createLocomotion();tickLocomotion(state,{x:0,z:0,jump:true});assert.equal(state.grounded,false);assert.equal(state.clip,'jump');
 let peak=state.y,fall=false;
 for(let i=0;i<60;i++){tickLocomotion(state,{x:0,z:0,jump:true});peak=Math.max(peak,state.y);fall ||=state.clip==='fall';}
 assert.ok(peak>1.7&&peak<2.2);assert.ok(fall);assert.equal(state.y,0);assert.equal(state.grounded,true);assert.equal(state.clip,'idle');
});
test('pressing jump in midair cannot add a second jump',()=>{
 const a=createLocomotion(),b=createLocomotion();
 tickLocomotion(a,{jump:true});tickLocomotion(b,{jump:true});ticks(a,4,{jump:false});ticks(b,4,{jump:false});tickLocomotion(a,{jump:true});tickLocomotion(b,{jump:false});assert.equal(a.vy,b.vy);assert.equal(a.y,b.y);
});
test('running jumps retain horizontal momentum when movement is released',()=>{
 const state=createLocomotion();ticks(state,60);tickLocomotion(state,{x:0,z:1,jump:true});const speed=state.speed,z=state.z;ticks(state,5,{x:0,z:0,jump:false});assert.equal(state.speed,speed);assert.ok(state.z>z);assert.ok(state.y>0);
});

test('native skeleton has original traversal, parents and limb lengths',()=>{
 const rig=createSM64Rig();assert.equal(rig.joints.length,20);
 for(let index=1;index<20;index++){
  const [name,parent,x,y,z]=BONES[index];assert.equal(rig.joints[index].name,name);assert.equal(rig.joints[index].parent,rig.joints[parent]);assert.deepEqual(rig.joints[index].position.toArray(),[x,y,z]);
 }
 assert.equal(rig.joints[6].position.x,65);assert.equal(rig.joints[14].position.x,89);assert.equal(rig.joints[15].position.x,67);
});
test('original running channels directly drive every local joint rotation',()=>{
 const rig=createSM64Rig();rig.pose('run',18.5);
 for(let bone=0;bone<20;bone++){
  const rotation=rig.joints[bone].rotation;
  assert.equal(rotation.order,'ZYX');
  for(const [axis,offset] of [['x',0],['y',1],['z',2]])assert.ok(Math.abs(rotation[axis]-sampleChannel('run',3+bone*3+offset,18.5,true))<1e-12);
 }
});
test('run loops exactly and walking has a distinct source sequence',()=>{
 const rig=createSM64Rig();rig.pose('run',0);const first=rig.joints.map(j=>j.quaternion.clone());rig.pose('run',72);
 rig.joints.forEach((j,i)=>assert.ok(j.quaternion.angleTo(first[i])<1e-7));
 assert.equal(sampleChannel('run',1,0),192);rig.pose('walk',0);assert.ok(rig.joints.some((j,i)=>j.quaternion.angleTo(first[i])>0.1));
});
