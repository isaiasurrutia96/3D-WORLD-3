import test from 'node:test';
import assert from 'node:assert/strict';
import {Raycaster,Vector3} from 'three';
import {createIslandData} from '../src/terrain.js';
import {createIslandAvatar,AVATAR_SCALE} from '../src/avatar-world.js';
import {createTrackLink,TRACK_LINK} from '../src/track-link.js';
import {createIslandKart} from '../src/island-kart.js';
import {createVehicleState,stepVehicle} from '../../letsgo-racing/src/vehicle-controller.js';
const data=createIslandData(),link=createTrackLink(data.world);
const step=(a,n)=>{for(let i=0;i<n;i++){a.input.update(1,false);a.step(1/120,0);}};

test('the existing circuit stays closed and its visible road agrees with support at every segment',()=>{
 const first=link.segments[0].a,last=link.segments.at(-1).b;assert.ok(first.distanceTo(last)<.00001);
 link.root.updateMatrixWorld(true);const renderedRoad=link.root.children[0].children[0],ray=new Raycaster();
 for(const segment of link.segments){
  const point=segment.a.clone().add(segment.b).multiplyScalar(.5);
  ray.set(new Vector3(point.x,point.y+.2,point.z).multiplyScalar(AVATAR_SCALE),new Vector3(0,-1,0));ray.far=.4*AVATAR_SCALE;
  const hit=ray.intersectObject(renderedRoad,false)[0];assert.ok(hit,'the visible ribbon has no centerline gap');
  const expected=hit.point.y/AVATAR_SCALE,height=link.physics.supportHeight(point.x,point.z,expected+.001);
  assert.notEqual(height,null);assert.ok(Math.abs(height-expected)<.001,'support follows actual rendered road triangles, including curved ramps');
 }
 assert.ok(link.segments.some(segment=>segment.a.y>7),'original overpass height is retained');
});
test('the island, bridge, entrance stub and track join at one continuous supported height',()=>{
 const {bridge}=TRACK_LINK;
 for(let x=12;x<39;x+=.1)assert.ok(Math.abs(link.physics.supportHeight(x,bridge.z,.46)-bridge.y)<.001,'no gap along the access route at '+x);
 const actor=createIslandAvatar(data.world);link.connect(actor);actor.player.teleport(new Vector3(12,.455,bridge.z));step(actor,60);actor.input.setTouchStick(1,0);
 for(let i=0;i<300;i++){step(actor,1);assert.ok(actor.player.onGround,'no seam fall while walking onto the track');assert.ok(Math.abs(actor.player.position.y-bridge.y)<.003);}
 assert.ok(actor.player.position.x>30,'walk through the bridge and entrance opening');
});
test('kart entry, native acceleration, braking, safe exit and reset work without race items',()=>{
 const actor=createIslandAvatar(data.world);link.connect(actor);const kart=createIslandKart(link,actor);
 actor.player.teleport(new Vector3(17,.455,TRACK_LINK.home.z));step(actor,60);actor.input.setTouchStick(1,0);step(actor,180);
 assert.ok(actor.player.position.x<20&&actor.player.position.x>18,'the parked kart blocks walking through its body');
 actor.input.setTouchStick(null);step(actor,120);assert.ok(kart.toggle(actor));assert.equal(actor.player.object.visible,false);
 const baseline=Object.assign(createVehicleState(),TRACK_LINK.home),flat={supportHeight:()=>TRACK_LINK.home.y,resolveHorizontal:(_x,_z,x,z)=>({x,z})};
 actor.input.holdAction('driveGas',true);
 for(let i=0;i<60;i++){actor.input.update(1,false);kart.update(1/120,actor.input,actor);stepVehicle(baseline,{throttle:1,steer:0},1/120,flat);}
 assert.ok(Math.abs(kart.state.speed-baseline.speed)<1e-6,'acceleration is the existing physics, not a display number');assert.ok(Math.abs(kart.state.x-baseline.x)<1e-6);
 assert.equal(kart.state.heldItem,null);assert.equal(kart.state.shieldTime,0);assert.equal(kart.state.boostTime,0);
 assert.equal(kart.toggle(actor),false,'cannot get out at speed');
 actor.input.holdAction('driveGas',false);actor.input.holdAction('driveBrake',true);
 for(let i=0;i<120&&kart.state.speed>.4;i++){actor.input.update(1,false);kart.update(1/120,actor.input,actor);}
 actor.input.holdAction('driveBrake',false);assert.ok(kart.toggle(actor));assert.equal(actor.player.object.visible,true);step(actor,120);assert.ok(actor.player.onGround);
 kart.reset(actor);step(actor,120);assert.equal(kart.driving,false);assert.equal(kart.state.x,TRACK_LINK.home.x);assert.ok(Math.abs(actor.position.x+16)<.01);
});
test('track and kart construction preserve the approved island cells',()=>{
 const revision=data.world.revision,cells=[...data.world.cells.values()].map(c=>({...c}));createIslandKart(link);
 assert.equal(data.world.revision,revision);assert.deepEqual([...data.world.cells.values()],cells);
});
