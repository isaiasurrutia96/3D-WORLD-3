import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlayer, stepPlayer, MAX_SPEED, FLOOR_HALF_SIZE } from '../src/movement.js';
const dt=1/120;
const advance=(p,seconds,input={x:0,z:0})=>{for(let i=0;i<Math.round(seconds/dt);i++)stepPlayer(p,input,dt);};
test('accelerates, caps diagonal speed and brakes to a stop',()=>{
 const p=createPlayer();advance(p,0.1,{x:1,z:1});assert.ok(Math.hypot(p.vx,p.vz)<MAX_SPEED);
 advance(p,0.6,{x:1,z:1});assert.ok(Math.abs(Math.hypot(p.vx,p.vz)-MAX_SPEED)<1e-8);
 advance(p,0.4);assert.equal(p.vx,0);assert.equal(p.vz,0);
});
test('held jump is higher than a tap; both land exactly on the floor',()=>{
 const jump=held=>{const p=createPlayer();p.jumpQueued=true;p.jumpHeld=held;let peak=0;for(let i=0;i<240;i++){stepPlayer(p,{x:0,z:0},dt);peak=Math.max(peak,p.y);}assert.equal(p.y,0);assert.equal(p.grounded,true);return peak;};
 assert.ok(jump(true)>jump(false)+0.4);
});
test('airborne jump requests cannot trigger a second jump',()=>{
 const a=createPlayer(),b=createPlayer();a.jumpQueued=b.jumpQueued=true;a.jumpHeld=b.jumpHeld=true;advance(a,0.1);advance(b,0.1);a.jumpQueued=true;stepPlayer(a,{x:0,z:0},dt);stepPlayer(b,{x:0,z:0},dt);assert.equal(a.vy,b.vy);
});
test('running jump retains momentum without input',()=>{
 const p=createPlayer();advance(p,0.4,{x:0,z:1});p.jumpQueued=true;p.jumpHeld=true;advance(p,0.1);assert.ok(p.y>0);const speed=p.vz;advance(p,0.1);assert.equal(p.vz,speed);
});
test('walking off the slab falls and respawns',()=>{
 const p=createPlayer();p.x=FLOOR_HALF_SIZE+0.1;stepPlayer(p,{x:0,z:0},dt);assert.equal(p.grounded,false);assert.ok(p.y<0);advance(p,2);assert.equal(p.x,0);assert.equal(p.y,0);assert.equal(p.grounded,true);
});

test('ladder grabs, pauses, climbs onto roof and supports descent',async()=>{
 const { LADDER,TOWER }=await import('../src/movement.js');const p=createPlayer();p.x=LADDER.x;p.z=LADDER.z+0.3;p.interactQueued=true;stepPlayer(p,{x:0,z:0},dt);assert.equal(p.mode,'climb');
 const y=p.y;advance(p,0.2);assert.equal(p.y,y);
 advance(p,3.1,{x:0,z:0,climb:1});assert.equal(p.mode,'land');assert.equal(p.y,TOWER.height);assert.equal(p.grounded,true);
 p.interactQueued=true;stepPlayer(p,{x:0,z:0},dt);assert.equal(p.mode,'climb');advance(p,3.1,{x:0,z:0,climb:-1});assert.equal(p.y,0);assert.equal(p.mode,'land');
});
test('ladder jump lets go without reattaching',async()=>{
 const {LADDER}=await import('../src/movement.js');const p=createPlayer();p.x=LADDER.x;p.z=LADDER.z;p.interactQueued=true;stepPlayer(p,{x:0,z:0},dt);advance(p,0.5,{x:0,z:0,climb:1});p.jumpQueued=true;stepPlayer(p,{x:0,z:0},dt);assert.equal(p.mode,'land');assert.ok(p.vy>0);assert.ok(p.z>LADDER.z);
});
test('pool entry, buoyancy, diving and ledge exit',async()=>{
 const {POOL}=await import('../src/movement.js');const p=createPlayer();p.x=12;p.z=0;advance(p,2);assert.equal(p.mode,'swim');assert.ok(p.y<POOL.water);assert.ok(p.y>POOL.bottom);
 const surfaceY=p.y;advance(p,1,{x:0,z:0,dive:true});assert.ok(p.y<surfaceY-0.3);advance(p,2);assert.ok(p.y>POOL.bottom+0.2);
 p.x=POOL.minX+0.4;p.jumpHeld=true;stepPlayer(p,{x:-1,z:0},dt);assert.equal(p.mode,'land');assert.ok(p.x<POOL.minX);assert.ok(p.y>0);advance(p,1);assert.equal(p.y,0);assert.equal(p.grounded,true);
});
test('box sides are solid; roof supports a falling player',async()=>{
 const {TOWER}=await import('../src/movement.js');const p=createPlayer();p.x=-9;p.z=-1;advance(p,0.5,{x:0,z:-1});assert.ok(p.z>=TOWER.maxZ+0.34);
 p.x=-9;p.z=-5;p.y=6;p.vy=-1;p.grounded=false;advance(p,0.5);assert.equal(p.y,TOWER.height);assert.equal(p.grounded,true);
});
