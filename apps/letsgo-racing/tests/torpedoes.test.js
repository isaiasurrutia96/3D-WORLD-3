import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createItemSystem,useHeldItem,stepItems} from '../src/items.js';
import {TORPEDO_SPEED,TORPEDO_LIFETIME,findTorpedoTarget,torpedoWarning} from '../src/torpedoes.js';
import {createTorpedoModel} from '../src/torpedo-view.js';
import {ITEM_UNDER_TEST} from '../src/item-test-mode.js';
import {createVehicleState,stepVehicle} from '../src/vehicle-controller.js';
import {createNpcDriver,readNpcInput} from '../src/npc/driver.js';
import {createNpcPractice} from '../src/npc/practice.js';
import {coursePoint} from '../src/npc/course-line.js';
import {COURSES,ORIGINAL_COURSE} from '../src/courses.js';
import {projectRaceCourse} from '../src/race-course.js';
import {worldPhysics} from '../src/world.js';
const flat={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz)=>({x:nx,z:nz})};
const kart=extra=>({...createVehicleState(),x:0,y:0,z:0,yaw:0,...extra});
function system(courses=[]){const s=createItemSystem(undefined,Math.random,courses);s.boxes=[];return s;}
function at(course,progress,offset=0,extra={}){const p=coursePoint(course,progress,offset);return kart({...p,yaw:Math.atan2(p.fx,p.fz),...extra});}

test('the active test item replaces every normal box draw and Time Trials remain Nitro-only',()=>{
 for(const draw of [0,.3,.62,.99]){
  const s=createItemSystem(()=>draw);s.testItem=ITEM_UNDER_TEST;const box=s.boxes[0],owner=kart({x:box.x,y:box.y,z:box.z});
  stepItems(s,owner,owner,.01,flat);assert.equal(owner.heldItem,ITEM_UNDER_TEST);
  owner.heldItem=null;box.cooldown=0;s.allowShells=false;stepItems(s,owner,owner,.01,flat);assert.equal(owner.heldItem,'nitro');
 }
});

test('launch retains the item when there is no legal rival and consumes it once for a target ahead',()=>{
 const s=system(),owner=kart({heldItem:'torpedo'}),behind=kart({z:-20}),above=kart({z:50,y:8}),target=kart({z:100});
 assert.equal(useHeldItem(s,owner,flat,[]),false);assert.equal(owner.heldItem,'torpedo');assert.match(s.itemMessage,/No rival/);
 assert.equal(findTorpedoTarget(s,owner,[owner,behind,above]),null);
 assert.equal(useHeldItem(s,owner,flat,[target]),true);assert.equal(owner.heldItem,null);assert.equal(s.torpedoes.length,1);assert.equal(s.torpedoes[0].target,target);assert.equal(useHeldItem(s,owner,flat,[target]),false);
});

test('one complete hit slows the target, cancels Nitro, spins it and leaves the firing kart alone',()=>{
 const s=system(),owner=kart({heldItem:'torpedo',boostTime:1}),target=kart({z:80,speed:40,boostTime:1});useHeldItem(s,owner,flat,[target]);let hits=0;
 for(let i=0;i<200&&s.torpedoes.length;i++){stepItems(s,owner,owner,1/120,flat,[{state:target,previous:target}]);hits+=s.hits.length;}
 assert.equal(hits,1);assert.equal(s.torpedoes.length,0);assert.equal(target.spinTime,.75);assert.equal(target.boostTime,0);assert.ok(target.speed<12);assert.equal(target.yaw,0);assert.equal(owner.spinTime,0);assert.equal(owner.boostTime,1);
});

test('actual driving can juke the committed shot, which never turns back or reacquires',()=>{
 for(const dt of [1/30,1/60,1/120])for(const dodge of [false,true]){
  const s=system(),owner=kart({heldItem:'torpedo'}),target=kart({z:120,speed:50});useHeldItem(s,owner,flat,[target]);let committed=false,hits=0,heading;
  for(let i=0;i<2000&&s.torpedoes.length;i++){
   const torpedo=s.torpedoes[0];if(torpedo.phase==='committed'){committed=true;heading??=torpedo.yaw;assert.equal(torpedo.yaw,heading);}
   const previous={...target};stepVehicle(target,{throttle:1,steer:dodge&&committed?1:0},dt,flat);stepItems(s,owner,owner,dt,flat,[{state:target,previous}]);hits+=s.hits.length;
  }
  assert.equal(committed,true);assert.equal(hits,dodge?0:1);assert.equal(s.torpedoes.length,0);if(dodge)assert.equal(target.spinTime,0);
 }
});

test('homing follows the actual curves and road heights on all four circuits',()=>{
 for(const course of COURSES)for(const fraction of [.12,.32,.52,.72]){
  const progress=course.length*fraction,s=system([course]),owner=at(course,progress,2,{heldItem:'torpedo'}),target=at(course,progress+240,-2);
  assert.equal(useHeldItem(s,owner,worldPhysics,[target]),true);
  for(let i=0;i<60;i++){
   stepItems(s,owner,owner,1/120,worldPhysics,[{state:target,previous:target}]);assert.equal(s.torpedoes.length,1,`${course.name} at ${fraction}`);
   const t=s.torpedoes[0],p=projectRaceCourse(t,course);assert.equal(t.phase,'homing');assert.ok(p.distance<4);assert.ok(p.height<.05);
  }
 }
});

test('the proximity warning belongs only to the target and shows decreasing distance and commitment',()=>{
 const s=system(),owner=kart({heldItem:'torpedo'}),target=kart({z:120});useHeldItem(s,owner,flat,[target]);assert.equal(torpedoWarning(s,owner),null);
 const first=torpedoWarning(s,target);assert.ok(first.distance>100);assert.equal(first.arrow,'↓');assert.equal(first.committed,false);
 for(let i=0;i<100&&s.torpedoes[0]?.phase!=='committed';i++)stepItems(s,owner,owner,1/120,flat,[{state:target,previous:target}]);
 const last=torpedoWarning(s,target);assert.ok(last.distance<first.distance);assert.equal(last.committed,true);
 const t=s.torpedoes[0];t.z=target.z+5;assert.equal(torpedoWarning(s,target),null,'a missed shot moving away stops warning');
});

test('a shot cannot hit the other overpass deck or pass through a guardrail',()=>{
 const s=system(),owner=kart({heldItem:'torpedo',y:8}),target=kart({z:80,y:8}),lower=kart({z:30,speed:40}),bridge={...flat,supportHeight:(x,z,max)=>max>=8?8:0};useHeldItem(s,owner,bridge,[target]);
 for(let i=0;i<40;i++)stepItems(s,owner,owner,1/120,bridge,[{state:target,previous:target},{state:lower,previous:lower}]);assert.equal(lower.spinTime,0);assert.equal(lower.speed,40);
 const blocked=system(),shooter=kart({heldItem:'torpedo'}),rival=kart({z:60});useHeldItem(blocked,shooter,flat,[rival]);
 const wall={...flat,resolveHorizontal:(x,z,nx,nz)=>({x:nx,z:Math.min(20,nz)})};for(let i=0;i<100&&blocked.torpedoes.length;i++)stepItems(blocked,shooter,shooter,1/120,wall,[{state:rival,previous:rival}]);assert.equal(blocked.torpedoes.length,0);assert.equal(rival.spinTime,0);
});

test('lost targets, unsupported road and lifetime expiration remove the projectile',()=>{
 for(const reason of ['target','road','age']){
  const s=system(),owner=kart({heldItem:'torpedo'}),target=kart({z:100});useHeldItem(s,owner,flat,[target]);if(reason==='age')s.torpedoes[0].age=TORPEDO_LIFETIME;
  stepItems(s,owner,owner,.01,reason==='road'?{...flat,supportHeight:()=>null}:flat,reason==='target'?[]:[{state:target,previous:target}]);assert.equal(s.torpedoes.length,0);
 }
});

test('NPC practice starts both item tests without Nitro and fires only with a useful warning gap',()=>{
 const s=system([ORIGINAL_COURSE]);s.testItem='torpedo';const practice=createNpcPractice(worldPhysics,s);practice.start();assert.equal(practice.driver.state.heldItem,'torpedo');
 const npc=createNpcDriver({progress:35});Object.assign(npc.state,{speed:45,heldItem:'torpedo'});const target=at(ORIGINAL_COURSE,150,0,{speed:40});
 assert.equal(readNpcInput(npc,1/120,{traffic:[target]}).useItem,true);assert.equal(readNpcInput(npc,1/120,{traffic:[target]}).useItem,false);
 npc.torpedoCooldown=0;npc.state.spinTime=.5;assert.equal(readNpcInput(npc,1/120,{traffic:[target]}).useItem,false);
});

test('the shared torpedo model is finite and compact for mobile rendering',()=>{
 const model=createTorpedoModel();assert.equal(model.children.length,3);const bounds=new THREE.Box3().setFromObject(model);assert.ok(bounds.max.z-bounds.min.z<3);
 model.traverse(node=>{if(node.isMesh)for(const value of node.geometry.attributes.position.array)assert.ok(Number.isFinite(value));});assert.ok(TORPEDO_SPEED>80);
});
