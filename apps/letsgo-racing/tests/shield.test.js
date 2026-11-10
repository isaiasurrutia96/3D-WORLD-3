import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {activateShield,stepShield,shieldActive,shieldOpacity,absorbShieldImpact,SHIELD_SECONDS} from '../src/shield.js';
import {createVehicleState,stepVehicle} from '../src/vehicle-controller.js';
import {createItemSystem,stepItems,useHeldItem} from '../src/items.js';
import {resolveKartContact} from '../src/npc/contact.js';
import {createShieldTestArea} from '../src/shield-test-area.js';
import {createShieldView} from '../src/shield-view.js';
const DT=1/120,flat={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz)=>({x:nx,z:nz})};
const car=extra=>({...createVehicleState(),x:0,y:0,z:0,yaw:0,...extra});
function impact(kind,target){
 if(kind==='collision'){stepShield(target,DT);const other=car({x:target.x,y:target.y,z:target.z+2.5});assert.equal(resolveKartContact(target,other,flat),true);return;}
 const s=createItemSystem([]),owner=car({x:target.x,y:target.y,z:target.z+(kind==='banana'?3:-15),heldItem:kind});
 assert.equal(useHeldItem(s,owner,flat,[target]),true);
 for(let i=0;i<120;i++){stepShield(target,DT);stepItems(s,target,target,DT,flat,[{state:owner,previous:owner}]);if(s.hits.length){assert.equal(s.hits.length,1);return s.hits[0];}}
 assert.fail('hazard did not reach target');
}
function noPenalty(state){assert.equal(state.speed,35);assert.equal(state.lateralSpeed,0);assert.equal(state.spinTime,0);assert.equal(state.boostTime,1);assert.equal(state.impactRecovery,0);}

test('shield expires after 12 seconds without a hit and visually warns during its last three seconds',()=>{
 const state=car(),kart=new THREE.Group(),view=createShieldView(kart);activateShield(state);assert.equal(state.shieldTime,12);assert.equal(state.shieldHits,2);
 for(let i=0;i<1000;i++)stepShield(state,.01);assert.ok(state.shieldTime<3);const opacity=shieldOpacity(state);stepShield(state,.1);assert.notEqual(shieldOpacity(state),opacity);
 view(state);assert.equal(kart.getObjectByName('Active shield').visible,true);
 for(let i=0;i<190;i++)stepShield(state,.01);view(state);assert.equal(shieldActive(state),false);assert.equal(state.shieldTime,0);assert.equal(state.shieldHits,0);assert.equal(kart.getObjectByName('Active shield').visible,false);
});

test('all nine two-standard-impact combinations block both penalties and spend exactly two charges',()=>{
 for(const first of ['shell','banana','collision'])for(const second of ['shell','banana','collision']){
  const state=car({speed:35,boostTime:1});activateShield(state);stepShield(state,2);const before=state.shieldTime;
  const hit=impact(first,state);if(hit)assert.equal(hit.absorbed,true);assert.equal(state.shieldHits,1,first);assert.ok(state.shieldTime<before&&state.shieldTime>9);noPenalty(state);
  const again=impact(second,state);if(again)assert.equal(again.absorbed,true);assert.equal(state.shieldHits,0,`${first}, ${second}`);assert.equal(state.shieldTime,0);noPenalty(state);
  impact('shell',state);assert.ok(state.speed<35);assert.ok(state.spinTime>0);
 }
});

test('a torpedo spends the entire shield before or after one standard impact with no movement penalty',()=>{
 for(const prior of [null,'shell','banana','collision']){
  const state=car({speed:35,boostTime:1});activateShield(state);stepShield(state,3);if(prior)impact(prior,state);
  const age=state.shieldAge,hit=impact('torpedo',state);assert.equal(hit.absorbed,true);assert.equal(state.shieldHits,0);assert.equal(state.shieldTime,0);assert.ok(state.shieldAge>age);noPenalty(state);
 }
});

test('one projectile token is counted once and hits never refresh the expiration timer',()=>{
 const state=car();activateShield(state);stepShield(state,5);const token={};assert.equal(absorbShieldImpact(state,'shell',token),true);const time=state.shieldTime;
 for(let i=0;i<20;i++){stepShield(state,.1);assert.equal(absorbShieldImpact(state,'shell',token),true);}
 assert.equal(state.shieldHits,1);assert.ok(Math.abs(state.shieldTime-(time-2))<1e-8);assert.equal(state.shieldImpactCount,1);
 stepShield(state,5);assert.equal(absorbShieldImpact(state,'shell',token),false);
});

test('holding contact does not drain twice; separating and slamming again consumes the second charge',()=>{
 const a=car({speed:35,boostTime:1}),b=car({z:2.5});activateShield(a);
 for(let i=0;i<120;i++){
  stepShield(a,DT);b.z=a.z+2.5;b.speed=0;b.lateralSpeed=0;resolveKartContact(a,b,flat);noPenalty(a);
 }
 assert.equal(a.shieldHits,1);assert.equal(a.shieldImpactCount,1);
 b.z=a.z+8;resolveKartContact(a,b,flat);b.z=a.z+2.5;b.speed=0;resolveKartContact(a,b,flat);assert.equal(a.shieldHits,0);assert.equal(a.shieldImpactCount,2);noPenalty(a);
 for(let i=0;i<20;i++){stepShield(a,DT);b.z=a.z+2.5;b.speed=0;b.lateralSpeed=0;resolveKartContact(a,b,flat);noPenalty(a);}
});

test('gentle contact spends nothing and normal unshielded kart contact remains damped',()=>{
 const a=car({speed:1}),b=car({z:2.5});activateShield(a);resolveKartContact(a,b,flat);assert.equal(a.shieldHits,2);
 const c=car({speed:35}),d=car({z:2.5});resolveKartContact(c,d,flat);assert.ok(c.speed<35);assert.ok(d.speed>0);
});

test('expired protection cannot block any impact, while manual restoration gives a fresh two-hit shield',()=>{
 for(const kind of ['shell','banana','torpedo','collision']){
  const state=car({speed:35,boostTime:1});activateShield(state);stepShield(state,SHIELD_SECONDS);impact(kind,state);assert.ok(state.speed<35,kind);
  activateShield(state);assert.equal(state.shieldHits,2);assert.equal(state.shieldTime,12);
 }
});

test('the shield test area uses real hazards, clears old shots, and restores only on request',()=>{
 const stage=createShieldTestArea(flat),state=car();stage.start(state);assert.equal(state.shieldHits,2);stage.trigger('shell',state);assert.equal(stage.items.shells.length,1);
 for(let i=0;i<120&&state.shieldHits===2;i++){stepShield(state,DT);stage.step(DT,state,state);}
 assert.equal(state.shieldHits,1);const remaining=state.shieldTime;stage.trigger('torpedo',state);assert.equal(stage.items.torpedoes.length,1);assert.equal(state.shieldTime,remaining);
 for(let i=0;i<120&&state.shieldHits===1;i++){stepShield(state,DT);stage.step(DT,state,state);}
 assert.equal(state.shieldHits,0);assert.equal(state.spinTime,0);stage.restore(state);assert.equal(state.shieldHits,2);assert.equal(state.shieldTime,12);
 stage.trigger('banana',state);for(let i=0;i<100&&state.shieldHits===2;i++){const previous={...state};stepShield(state,DT);stepVehicle(state,{throttle:1},DT,flat);stage.step(DT,state,previous);}
 assert.equal(state.shieldHits,1);assert.equal(state.spinTime,0);assert.equal(state.lateralSpeed,0);stage.stop();assert.equal(stage.items.bananas.length,0);assert.equal(stage.active,false);
});

test('shielded contact stays outside rails and stops protecting the old contact when its timer expires',()=>{
 const rail={...flat,resolveHorizontal:(x,z,nx,nz,y,r)=>({x:Math.min(nx,14.25-r),z:nz})};
 const a=car({x:11,yaw:Math.PI/2,speed:35}),b=car({x:12.7});activateShield(a);resolveKartContact(a,b,rail);
 assert.ok(b.x<=13.071);assert.ok(b.x-a.x>2.6);assert.equal(a.speed,35);assert.equal(a.shieldHits,1);
 stepShield(a,12);a.x=b.x-2;a.speed=35;a.lateralSpeed=0;b.speed=0;b.lateralSpeed=0;resolveKartContact(a,b,rail);assert.ok(a.speed<35);
});
