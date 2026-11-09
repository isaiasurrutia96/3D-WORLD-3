import test from 'node:test';
import assert from 'node:assert/strict';
import {createItemSystem,stepItems,useHeldItem,BOX_RESPAWN} from '../src/items.js';
import {createVehicleState,stepVehicle,VEHICLE_TOP_SPEED,NITRO_TOP_SPEED} from '../src/vehicle-controller.js';
import {worldPhysics} from '../src/world.js';
const flat={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz)=>({x:nx,z:nz})};

test('item-box rows sit on the actual track, including the elevated crossing',()=>{
 const system=createItemSystem();assert.equal(system.boxes.length,48);
 for(const box of system.boxes){const y=worldPhysics.supportHeight(box.x,box.z,box.y+.05);assert.ok(y!==null);assert.ok(Math.abs(y-box.y)<.03);}
 assert.ok(system.boxes.some(box=>box.y>7));
});
test('swept pickup grants Nitro, preserves a full slot and respawns a box',()=>{
 const system=createItemSystem(),box=system.boxes[0];
 const kart=Object.assign(createVehicleState(),{x:box.x+10,y:box.y,z:box.z});
 stepItems(system,kart,{x:box.x-10,z:box.z},.01,flat);
 assert.equal(kart.heldItem,'nitro');assert.equal(box.cooldown,BOX_RESPAWN);
 stepItems(system,kart,kart,.5,flat);assert.equal(system.boxes.filter(b=>b.cooldown>0).length,1);
 stepItems(system,null,null,BOX_RESPAWN,flat);assert.equal(box.cooldown,0);
 kart.heldItem=null;kart.x=box.x;
 stepItems(system,kart,kart,.01,flat);assert.equal(kart.heldItem,'nitro');
});
test('lower-road kart cannot collect an upper-road box',()=>{
 const system=createItemSystem(()=>0),box=system.boxes.find(b=>b.y>7);system.boxes=[box];
 const kart=Object.assign(createVehicleState(),{x:box.x,y:0,z:box.z});
 stepItems(system,kart,kart,.01,flat);assert.equal(kart.heldItem,null);assert.equal(box.cooldown,0);
});
test('nitro is consumed once, boosts past the faster base speed and wears off smoothly',()=>{
 const system=createItemSystem(),kart=Object.assign(createVehicleState(),{x:0,z:0,heldItem:'nitro',speed:VEHICLE_TOP_SPEED});
 assert.ok(VEHICLE_TOP_SPEED>32);assert.equal(useHeldItem(system,kart),true);assert.equal(kart.heldItem,null);assert.equal(useHeldItem(system,kart),false);
 for(let i=0;i<180;i++)stepVehicle(kart,{throttle:1},1/120,flat);
 assert.ok(kart.speed>VEHICLE_TOP_SPEED);assert.ok(kart.speed<=NITRO_TOP_SPEED);
 for(let i=0;i<360;i++)stepVehicle(kart,{throttle:1},1/120,flat);
 assert.equal(kart.boostTime,0);assert.ok(Math.abs(kart.speed-VEHICLE_TOP_SPEED)<1e-8);
 kart.heldItem='nitro';useHeldItem(system,kart);for(let i=0;i<180;i++)stepVehicle(kart,{brake:true},1/120,flat);assert.equal(kart.speed,0);
});
test('every pickup row now awards Nitro, including the overpass',()=>{
 const system=createItemSystem();
 for(const box of system.boxes){
  const kart={...createVehicleState(),x:box.x,y:box.y,z:box.z};stepItems(system,kart,kart,.01);
  assert.equal(kart.heldItem,'nitro');assert.equal(useHeldItem(system,kart),true);assert.ok(kart.boostTime>0);
 }
});
test('an obsolete held shell cannot launch, spin the kart or consume a Nitro boost',()=>{
 const system=createItemSystem(),kart={...createVehicleState(),heldItem:'shell',speed:20,boostTime:1},yaw=kart.yaw;
 assert.equal(useHeldItem(system,kart),false);assert.equal(kart.heldItem,null);assert.equal(kart.speed,20);assert.equal(kart.yaw,yaw);assert.equal(kart.boostTime,1);
});
