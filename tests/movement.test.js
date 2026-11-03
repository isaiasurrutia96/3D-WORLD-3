import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlayer, stepPlayer, MAX_SPEED } from '../src/movement.js';
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
 const p=createPlayer();p.x=16.1;stepPlayer(p,{x:0,z:0},dt);assert.equal(p.grounded,false);assert.ok(p.y<0);advance(p,2);assert.equal(p.x,0);assert.equal(p.y,0);assert.equal(p.grounded,true);
});
