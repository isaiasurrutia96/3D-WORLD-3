import test from 'node:test';
import assert from 'node:assert/strict';
import {createNpcDriver,readNpcInput} from '../src/npc/driver.js';
import {ORIGINAL_NPC_REFERENCE} from '../src/npc/original-reference.js';
import {coursePoint} from '../src/npc/course-line.js';
import {createNpcPractice} from '../src/npc/practice.js';
import {resolveKartContact} from '../src/npc/contact.js';
import {createGhostTemplate} from '../src/ghost-kart.js';
import {createVehicleState,stepVehicle,NITRO_TOP_SPEED} from '../src/vehicle-controller.js';
import {createItemSystem,useHeldItem,stepItems} from '../src/items.js';
import {ORIGINAL_COURSE,SUZUKA_COURSE} from '../src/courses.js';
import {worldPhysics} from '../src/world.js';
import {projectRaceCourse} from '../src/race-course.js';
import {createTimeTrial,armTimeTrial,stepTimeTrial} from '../src/time-trial.js';
const DT=1/120,flat={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz)=>({x:nx,z:nz})};
function seeded(seed){let value=seed;return()=>{value=(value*1664525+1013904223)>>>0;return value/2**32;};}

test('the driving reference covers the current Original course and all four approved laps',()=>{
 assert.equal(ORIGINAL_NPC_REFERENCE.course,ORIGINAL_COURSE.id);assert.equal(ORIGINAL_NPC_REFERENCE.length,ORIGINAL_COURSE.length);assert.equal(ORIGINAL_NPC_REFERENCE.sourceLaps,4);
 for(const [offset,speed]of ORIGINAL_NPC_REFERENCE.samples){assert.ok(Math.abs(offset)<=9.8);assert.ok(speed>=0&&speed<=NITRO_TOP_SPEED);}
 assert.throws(()=>createNpcDriver({course:SUZUKA_COURSE}),/different course/);
});

test('the brain issues bounded controls without placing the kart along a replay',()=>{
 const npc=createNpcDriver(),before={...npc.state};npc.state.x+=1.5;const displaced={...npc.state};
 const input=readNpcInput(npc,DT);assert.deepEqual(npc.state,displaced);assert.notEqual(displaced.x,before.x);assert.ok(Math.abs(input.steer)<=1);assert.ok(input.throttle>=-1&&input.throttle<=1);
 stepVehicle(npc.state,input,DT,worldPhysics);assert.ok(Math.hypot(npc.state.x-displaced.x,npc.state.z-displaced.z)<=NITRO_TOP_SPEED*DT+.01);
});

test('actual kart physics completes laps, crosses every gate and stays grounded with varied item draws',()=>{
 for(const seed of [1,2,5]){
  const npc=createNpcDriver({progress:0}),items=createItemSystem(undefined,seeded(seed)),trial=createTimeTrial(null,ORIGINAL_COURSE);armTimeTrial(trial);let railFrames=0;
  for(let frame=0;frame<14000&&!trial.completed;frame++){
   npc.previous={...npc.state};const input=readNpcInput(npc,DT,{boxes:items.boxes});if(npc.state.heldItem==='nitro'&&input.brake)assert.equal(input.useItem,false);if(input.useItem)useHeldItem(items,npc.state);
   stepVehicle(npc.state,input,DT,worldPhysics);stepTimeTrial(trial,npc.previous,npc.state,true,DT);stepItems(items,npc.state,npc.previous,DT,worldPhysics);
   assert.equal(trial.status,'running',`${trial.reason} at ${npc.progress}`);assert.equal(npc.state.grounded,true);assert.ok(npc.state.speed<=NITRO_TOP_SPEED+.001);
   if(npc.state.railContactTime>0)railFrames++;
  }
  assert.equal(trial.completed,1);assert.equal(railFrames,0);assert.ok(trial.lastLap>48&&trial.lastLap<72,'pace follows the player references and available items');
 }
});

test('a displaced driver recovers through steering while staying on the road',()=>{
 const npc=createNpcDriver({progress:300,offset:7}),p=coursePoint(npc.course,300,9);Object.assign(npc.state,{x:p.x,z:p.z,speed:35});
 for(let i=0;i<1800;i++){const input=readNpcInput(npc,DT);stepVehicle(npc.state,input,DT,worldPhysics);assert.equal(npc.state.grounded,true);assert.ok(projectRaceCourse(npc.state,npc.course)?.distance<14);}
 assert.ok(npc.progress>900);
});

test('a blocked driver selects a passing line rather than following a fixed ghost path',()=>{
 const npc=createNpcDriver({progress:0,offset:0}),p=coursePoint(npc.course,45,0),leader={...createVehicleState(),x:p.x,y:p.y,z:p.z,speed:0};let closest=Infinity;
 for(let i=0;i<2400&&npc.progress<60;i++){const input=readNpcInput(npc,DT,{traffic:[leader]});stepVehicle(npc.state,input,DT,worldPhysics);closest=Math.min(closest,Math.hypot(npc.state.x-leader.x,npc.state.z-leader.z));}
 assert.ok(npc.progress>=60);assert.ok(closest>3.2);assert.ok(Math.abs(npc.laneBias)>3);
});

test('practice waits for Gas and restores a separate fresh opponent on restart',()=>{
 const items=createItemSystem(),practice=createNpcPractice(worldPhysics,items),player={...createVehicleState(),...practice.start()},initial={...practice.driver.state};
 for(let i=0;i<120;i++)practice.step(DT,player,false);assert.equal(practice.running,false);assert.deepEqual(practice.driver.state,initial);
 for(let i=0;i<120;i++)practice.step(DT,player,true);assert.equal(practice.running,true);assert.ok(Math.hypot(practice.driver.state.x-initial.x,practice.driver.state.z-initial.z)>5);
 practice.start();assert.equal(practice.running,false);assert.equal(practice.driver.elapsed,0);practice.stop();assert.equal(practice.active,false);assert.deepEqual(practice.actors(),[]);
});

test('kart contact dissipates energy and does not snap either heading',()=>{
 const a={...createVehicleState(),x:0,y:0,z:0,yaw:0,speed:40},b={...createVehicleState(),x:0,y:0,z:2,yaw:0,speed:10},energy=a.speed*a.speed+b.speed*b.speed;
 assert.ok(resolveKartContact(a,b,flat));assert.equal(a.yaw,0);assert.equal(b.yaw,0);assert.ok(a.speed>0&&a.speed<40);assert.ok(a.speed*a.speed+b.speed*b.speed<=energy+.001);assert.ok(Math.hypot(a.x-b.x,a.z-b.z)>3.05);
 const oldA={...a},oldB={...b};for(let i=0;i<120;i++)resolveKartContact(a,b,flat);assert.deepEqual(a,oldA);assert.deepEqual(b,oldB);
});

test('kart contact respects separate decks and keeps cars inside a nearby guardrail',()=>{
 const a={...createVehicleState(),x:12.7,y:0,z:0,yaw:0,speed:0},b={...createVehicleState(),x:11,y:8,z:0,yaw:0,speed:0};assert.equal(resolveKartContact(a,b,flat),false);
 b.y=0;const rail={...flat,resolveHorizontal:(x,z,nx,nz,y,r)=>({x:Math.min(nx,14.25-r),z:nz})};for(let i=0;i<30;i++)resolveKartContact(a,b,rail);assert.ok(a.x<=13.071&&b.x<=13.071);assert.equal(a.yaw,0);
});

test('one opaque NPC reuses batched geometry and keeps moving wheel assemblies',()=>{
 const model=createGhostTemplate({solid:true,bodyColor:'#397ee8'});let meshes=0;
 model.traverse(node=>{if(node.isMesh){meshes++;assert.equal(node.material.transparent,false);assert.ok(node.geometry.attributes.color);for(const value of node.geometry.attributes.position.array)assert.ok(Number.isFinite(value));}});
 assert.equal(meshes,6);for(const name of ['front_axle_left_wheel','front_axle_right_wheel','rear_axle_left_wheel','rear_axle_right_wheel','steering_wheel'])assert.ok(model.getObjectByName(name));
});
