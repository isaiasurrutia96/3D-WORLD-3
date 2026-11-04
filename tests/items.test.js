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
test('swept pickup grants one random item, preserves a full slot and respawns a box',()=>{
 let calls=0;const system=createItemSystem(()=>{calls++;return 0;}),box=system.boxes[0];
 const kart=Object.assign(createVehicleState(),{x:box.x+10,y:box.y,z:box.z});
 stepItems(system,kart,{x:box.x-10,z:box.z},.01,flat);
 assert.equal(kart.heldItem,'nitro');assert.equal(calls,1);assert.equal(box.cooldown,BOX_RESPAWN);
 stepItems(system,kart,kart,.5,flat);assert.equal(calls,1);assert.equal(system.boxes.filter(b=>b.cooldown>0).length,1);
 stepItems(system,null,null,BOX_RESPAWN,flat);assert.equal(box.cooldown,0);
 system.random=()=>.99;kart.heldItem=null;kart.x=box.x;
 stepItems(system,kart,kart,.01,flat);assert.equal(kart.heldItem,'shell');
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
test('shells launch forward, ricochet without tunneling, expire and leave the road',()=>{
 const system=createItemSystem(),kart=Object.assign(createVehicleState(),{x:0,y:0,z:0,yaw:Math.PI/2,heldItem:'shell'});
 useHeldItem(system,kart);assert.equal(system.shells.length,1);assert.ok(system.shells[0].vx>50);
 const wall={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz,y,r)=>({x:Math.min(nx,10-r),z:nz})};
 for(let i=0;i<40;i++)stepItems(system,null,null,.01,wall);
 assert.equal(system.shells[0].bounces,1);assert.ok(system.shells[0].vx<0);
 stepItems(system,null,null,9,wall);assert.equal(system.shells.length,0);
 kart.heldItem='shell';useHeldItem(system,kart);stepItems(system,null,null,.01,{...flat,supportHeight:()=>null});assert.equal(system.shells.length,0);
});
test('a ricochet can hit the kart, consume the shell and cause a short spin-out',()=>{
 const system=createItemSystem();system.boxes=[];
 system.shells.push({id:0,x:-1,y:0,z:0,vx:58,vz:0,age:1,bounces:1});
 const kart=Object.assign(createVehicleState(),{x:0,y:0,z:0,speed:20,boostTime:1});
 stepItems(system,kart,kart,.02,flat);assert.equal(system.shells.length,0);assert.equal(kart.speed,4);assert.equal(kart.boostTime,0);assert.ok(kart.spinTime>0);
 const yaw=kart.yaw;for(let i=0;i<120;i++)stepVehicle(kart,{throttle:1},1/120,flat);assert.equal(kart.spinTime,0);assert.ok(kart.yaw>yaw+6);
});
