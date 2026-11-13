import test from 'node:test';
import assert from 'node:assert/strict';
import {Vector3} from 'three';
import {createIslandData} from '../src/terrain.js';
import {createIslandAvatar,METRES_PER_CELL,AVATAR_SPAWN} from '../src/avatar-world.js';
const world=createIslandData().world;
const point=(x,y,z)=>new Vector3(x,y,z).multiplyScalar(METRES_PER_CELL);
function advance(avatar,frames){for(let i=0;i<frames;i++){avatar.input.update(1,false);avatar.step(1/120,0);}}

test('the existing avatar walks across voxel seams without changing the approved island',()=>{
 const before=[...world.cells.values()].map(cell=>({...cell})),avatar=createIslandAvatar(world);
 avatar.player.teleport(point(-15,1.01,0),Math.PI);advance(avatar,45);
 const start=avatar.position.x;avatar.input.setTouchStick(1,0);
 for(let i=0;i<120;i++){
  advance(avatar,1);assert.ok(avatar.player.onGround,'continuous lawn contact');
  assert.ok(Math.abs(avatar.position.y-1)<.002,'no block-edge bumps or sinking');
 }
 assert.ok(avatar.position.x-start>13,'running traverses the small voxel seams');
 avatar.input.setTouchStick(null);advance(avatar,180);assert.ok(avatar.player.speed<.02);
 assert.deepEqual([...world.cells.values()],before,'avatar never edits terrain/scenery');
});
test('the original jump and pose work, and the avatar can land on the raised rear terrace',()=>{
 const avatar=createIslandAvatar(world);advance(avatar,60);
 const start=avatar.position.y,arm=avatar.player.rig.shoulderLeft.rotation.x;
 avatar.input.holdAction('jump',true);advance(avatar,20);
 assert.ok(avatar.position.y>start+.5);assert.notEqual(avatar.player.rig.shoulderLeft.rotation.x,arm);
 avatar.input.holdAction('jump',false);advance(avatar,240);assert.ok(avatar.player.onGround);
 avatar.player.teleport(point(-8,1.01,-26.5),Math.PI);advance(avatar,60);
 avatar.input.setTouchStick(0,-.5);avatar.input.holdAction('jump',true);advance(avatar,60);
 avatar.input.setTouchStick(null);avatar.input.holdAction('jump',false);advance(avatar,240);
 assert.ok(avatar.player.onGround);assert.ok(Math.abs(avatar.position.y-3)<.002,'land on the terrace rather than its side');
 assert.ok(avatar.position.z<-28);
});
test('falling off recovers to solid land, and reset returns to the island spawn',()=>{
 const avatar=createIslandAvatar(world);advance(avatar,60);
 avatar.player.teleport(point(-60,3,0),Math.PI);avatar.player.setSafePosition(point(...AVATAR_SPAWN));advance(avatar,720);
 assert.ok(avatar.player.onGround);assert.ok(Math.abs(avatar.position.x-AVATAR_SPAWN[0])<.01);
 avatar.input.setTouchStick(1,0);advance(avatar,60);avatar.reset();advance(avatar,120);
 assert.ok(Math.abs(avatar.position.x-AVATAR_SPAWN[0])<.01);assert.ok(Math.abs(avatar.position.z-AVATAR_SPAWN[2])<.01);
 assert.ok(avatar.player.onGround);
});
test('the irregular pond has water only inside its actual outline, above a solid floor',()=>{
 const avatar=createIslandAvatar(world),water=[...world.cells.values()].find(cell=>cell.type==='water'&&cell.y===0);
 const p=point(water.x+.5,0,water.z+.5);assert.ok(avatar.collision.waterAt(p));
 assert.equal(avatar.collision.waterAt(point(0,0,0)),null);
 const floor=avatar.collision.groundHeightBelow(point(water.x+.5,1,water.z+.5));assert.ok(Math.abs(floor+METRES_PER_CELL)<.001);
});
