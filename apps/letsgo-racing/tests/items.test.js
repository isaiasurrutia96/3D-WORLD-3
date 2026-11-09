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
 const system=createItemSystem(()=>0),box=system.boxes[0];
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
test('time-trial pickup rows retain Nitro even when the item draw would be a shell',()=>{
 const system=createItemSystem(()=>.99);system.allowShells=false;
 for(const box of system.boxes){
  const kart={...createVehicleState(),x:box.x,y:box.y,z:box.z};stepItems(system,kart,kart,.01);
  assert.equal(kart.heldItem,'nitro');assert.equal(useHeldItem(system,kart),true);assert.ok(kart.boostTime>0);
 }
});
test('free-drive boxes can award shells without replacing a full slot',()=>{
 const system=createItemSystem(()=>.99),box=system.boxes[0],kart={...createVehicleState(),x:box.x,y:box.y,z:box.z};
 stepItems(system,kart,kart,.01);assert.equal(kart.heldItem,'shell');
 assert.equal(useHeldItem(system,kart),true);assert.equal(kart.heldItem,null);assert.equal(system.shells.length,1);
 kart.heldItem='nitro';box.cooldown=0;stepItems(system,kart,kart,.01,flat);assert.equal(kart.heldItem,'nitro');
});
test('firing a shell preserves an active boost and the firing kart heading',()=>{
 const system=createItemSystem(),kart={...createVehicleState(),heldItem:'shell',speed:80,boostTime:1,yaw:.4},yaw=kart.yaw;
 assert.equal(useHeldItem(system,kart),true);assert.equal(kart.heldItem,null);assert.equal(kart.speed,80);assert.equal(kart.yaw,yaw);assert.equal(kart.boostTime,1);
 assert.ok(Math.hypot(system.shells[0].vx,system.shells[0].vz)>kart.speed);
});
test('a shell hits an NPC, cancels boost, slows it down and leaves its heading intact',()=>{
 const system=createItemSystem(),owner={...createVehicleState(),x:0,y:0,z:0,yaw:0,heldItem:'shell'},target={...createVehicleState(),x:0,y:0,z:16,yaw:.7,speed:40,boostTime:1};
 system.boxes=[];useHeldItem(system,owner);let hits=0;
 for(let i=0;i<40;i++){stepItems(system,owner,owner,1/120,flat,[{state:target,previous:target}]);hits+=system.hits.length;}
 assert.equal(hits,1);assert.equal(system.shells.length,0);assert.ok(target.speed<12);assert.equal(target.boostTime,0);assert.equal(target.yaw,.7);assert.equal(owner.speed,0);
});
test('swept shell hits detect a moving kart crossing between frames',()=>{
 const system=createItemSystem(),owner={...createVehicleState(),x:0,y:0,z:0,yaw:0,heldItem:'shell'},target={...createVehicleState(),x:5,y:0,z:7.5,speed:40},previous={...target,x:-5};
 system.boxes=[];useHeldItem(system,owner);stepItems(system,owner,owner,.1,flat,[{state:target,previous}]);assert.equal(system.hits.length,1);assert.ok(target.speed<12);
});
test('shells ricochet off a rail and can hit their owner after the launch grace',()=>{
 const system=createItemSystem(),owner={...createVehicleState(),x:0,y:0,z:0,yaw:0,heldItem:'shell',speed:30};system.boxes=[];
 const wall={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz,y,r)=>({x:nx,z:Math.min(nz,80-r)})};
 useHeldItem(system,owner);let bounced=false;
 for(let i=0;i<240&&system.shells.length;i++){stepItems(system,owner,owner,1/120,wall);if(system.shells[0]?.bounces)bounced=true;}
 assert.ok(bounced);assert.equal(system.shells.length,0);assert.ok(owner.speed<9);assert.equal(owner.yaw,0);
});
test('an upper-road shell cannot hit a lower-road kart',()=>{
 const system=createItemSystem(),owner={...createVehicleState(),x:0,y:8,z:0,yaw:0,heldItem:'shell'},target={...createVehicleState(),x:0,y:0,z:16,speed:40};system.boxes=[];
 const bridge={...flat,supportHeight:(x,z,maximum)=>maximum>=8?8:0};useHeldItem(system,owner);
 for(let i=0;i<40;i++)stepItems(system,owner,owner,1/120,bridge,[{state:target,previous:target}]);assert.equal(target.speed,40);
});
test('shells expire or disappear at unsupported edges',()=>{
 const system=createItemSystem(),owner={...createVehicleState(),x:0,y:0,z:0,yaw:0,heldItem:'shell'};system.boxes=[];useHeldItem(system,owner);
 stepItems(system,owner,owner,.1,{...flat,supportHeight:(x,z)=>z>4?null:0});assert.equal(system.shells.length,0);
 owner.heldItem='shell';useHeldItem(system,owner);for(let i=0;i<1000;i++)stepItems(system,null,null,.01,flat);assert.equal(system.shells.length,0);
});
