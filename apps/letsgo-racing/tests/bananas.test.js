import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createItemSystem,useHeldItem,stepItems} from '../src/items.js';
import {clearFinishedBananas,MAX_BANANAS} from '../src/bananas.js';
import {createBananaModel} from '../src/banana-view.js';
import {createVehicleState,stepVehicle} from '../src/vehicle-controller.js';
import {createNpcDriver,readNpcInput} from '../src/npc/driver.js';
import {ORIGINAL_COURSE,SUZUKA_COURSE} from '../src/courses.js';
const flat={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz)=>({x:nx,z:nz})};
const driver=extra=>({...createVehicleState(),x:0,y:0,z:0,yaw:0,...extra});
const items=()=>{const system=createItemSystem();system.boxes=[];return system;};

test('boxes award bananas in combat modes while Time Trials remain Nitro-only',()=>{
 const system=createItemSystem(()=>.62),box=system.boxes[0],kart=driver({x:box.x,y:box.y,z:box.z});
 stepItems(system,kart,kart,.01);assert.equal(kart.heldItem,'banana');
 kart.heldItem=null;box.cooldown=0;system.allowShells=false;stepItems(system,kart,kart,.01);assert.equal(kart.heldItem,'nitro');
});

test('drop places a single banana behind the kart and does not immediately hit its owner',()=>{
 const system=items(),kart=driver({heldItem:'banana',speed:40,boostTime:1});
 assert.equal(useHeldItem(system,kart,flat),true);assert.equal(kart.heldItem,null);assert.equal(useHeldItem(system,kart,flat),false);
 assert.equal(system.bananas.length,1);assert.equal(system.bananas[0].z,-3);assert.equal(system.bananas[0].owner,kart);
 stepItems(system,kart,kart,.01,flat);assert.equal(kart.spinTime,0);assert.equal(kart.speed,40);assert.equal(kart.boostTime,1);
});

test('unsupported or airborne drops retain the item, and peel geometry stays bounded',()=>{
 const system=items(),kart=driver({heldItem:'banana',grounded:false});assert.equal(useHeldItem(system,kart,flat),false);
 kart.grounded=true;assert.equal(useHeldItem(system,kart,{...flat,supportHeight:()=>null}),false);assert.equal(kart.heldItem,'banana');assert.equal(system.bananas.length,0);
 const model=createBananaModel(),bounds=new THREE.Box3().setFromObject(model);assert.equal(model.children.length,2);assert.ok(bounds.min.y>=0);assert.ok(bounds.max.y<.8);assert.ok(bounds.max.x-bounds.min.x<1.7);
 model.traverse(node=>{if(node.isMesh)for(const value of node.geometry.attributes.position.array)assert.ok(Number.isFinite(value));});
});

test('a high-speed crossing consumes one peel and causes one slip/spin for either driver',()=>{
 for(const targetIsPlayer of [true,false]){
  const system=items(),owner=driver({heldItem:'banana'});useHeldItem(system,owner,flat);
  const target=driver({x:.3,z:6,speed:45,boostTime:1}),previous={...target,z:-12};
  stepItems(system,targetIsPlayer?target:owner,targetIsPlayer?previous:owner,1/120,flat,targetIsPlayer?[]:[{state:target,previous}]);
  assert.equal(system.bananas.length,0);assert.equal(system.hits.length,1);assert.equal(system.hits[0].item,'banana');assert.equal(target.spinTime,.75);assert.equal(target.boostTime,0);assert.equal(target.yaw,0);assert.ok(target.lateralSpeed>0);assert.ok(target.speed<45);
  stepItems(system,targetIsPlayer?target:owner,targetIsPlayer?target:owner,.1,flat,targetIsPlayer?[]:[{state:target,previous:target}]);assert.equal(system.hits.length,0);
 }
});

test('the physical skid loses energy, moves sideways, settles and returns control at different frame rates',()=>{
 for(const dt of [1/30,1/60,1/120]){
  const system=items(),owner=driver({heldItem:'banana'});useHeldItem(system,owner,flat);
  const kart=driver({x:.2,z:-3,speed:50}),energy=kart.speed**2;stepItems(system,kart,kart,dt,flat);
  assert.ok(kart.speed**2+kart.lateralSpeed**2<energy);const startX=kart.x;
  while(kart.spinTime>0)stepVehicle(kart,{throttle:1},dt,flat);
  assert.ok(kart.x-startX>.7&&kart.x-startX<1.1);assert.ok(Math.abs(kart.lateralSpeed)<.04);assert.equal(kart.yaw,0);assert.equal(kart.grounded,true);
  const speed=kart.speed;stepVehicle(kart,{throttle:1,steer:1},dt,flat);assert.ok(kart.speed>speed);assert.notEqual(kart.yaw,0);
 }
});

test('overpass height and owner grace protect the other deck, then the owner can hit its peel later',()=>{
 const system=items(),owner=driver({heldItem:'banana',y:8});useHeldItem(system,owner);
 const bridge={...flat,supportHeight:(x,z,max)=>max>=8?8:0},lower=driver({z:-3,speed:40});
 stepItems(system,lower,lower,.7,bridge);assert.equal(lower.spinTime,0);assert.equal(system.bananas.length,1);
 owner.z=-3;stepItems(system,owner,owner,1/120,bridge);assert.equal(owner.spinTime,.75);assert.equal(system.bananas.length,0);
});

test('finish cleanup removes only that circuit, only on a forward crossing at the correct height',()=>{
 const system=createItemSystem(undefined,Math.random,[ORIGINAL_COURSE,SUZUKA_COURSE]),gate=ORIGINAL_COURSE.gates[0];
 const at=d=>driver({x:gate.x+gate.fx*d,y:gate.y,z:gate.z+gate.fz*d});
 system.bananas=[{course:ORIGINAL_COURSE.id},{course:SUZUKA_COURSE.id}];
 clearFinishedBananas(system,at(2),at(-2));assert.equal(system.bananas.length,2);
 clearFinishedBananas(system,{...at(-2),y:gate.y+8},{...at(2),y:gate.y+8});assert.equal(system.bananas.length,2);
 clearFinishedBananas(system,at(-2),at(2));assert.deepEqual(system.bananas,[{course:SUZUKA_COURSE.id}]);
});

test('the NPC drops a held banana through the normal item action and waits while spinning',()=>{
 const npc=createNpcDriver({progress:35});Object.assign(npc.state,{speed:45,heldItem:'banana'});
 assert.equal(readNpcInput(npc,1/120).useItem,true);npc.state.spinTime=.5;assert.equal(readNpcInput(npc,1/120).useItem,false);
});

test('a long session keeps a bounded hazard count and removes unsupported peels',()=>{
 const system=items(),kart=driver();
 for(let i=0;i<MAX_BANANAS+10;i++){kart.heldItem='banana';useHeldItem(system,kart,flat);}
 assert.equal(system.bananas.length,MAX_BANANAS);assert.equal(system.bananas[0].id,10);
 stepItems(system,null,null,.1,{...flat,supportHeight:()=>null});assert.equal(system.bananas.length,0);
});
