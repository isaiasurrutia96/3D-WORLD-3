import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createItemSystem,useHeldItem,stepItems} from '../src/items.js';
import {TORPEDO_SPEED,TORPEDO_LIFETIME,TORPEDO_CRUISE_LIFETIME,TORPEDO_BURST_SECONDS,findTorpedoTarget,torpedoWarning,trackTorpedoPositions,resetTorpedoes} from '../src/torpedoes.js';
import {createTorpedoModel,createTorpedoBursts} from '../src/torpedo-view.js';
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

test('forward launch consumes the item once even with no opponent ahead',()=>{
 const s=system(),owner=kart({heldItem:'torpedo'}),behind=kart({z:-20}),above=kart({z:50,y:8}),target=kart({z:100});
 assert.equal(findTorpedoTarget(s,owner,[owner,behind,above]),null);
 assert.equal(useHeldItem(s,owner,flat,[behind]),true);assert.equal(owner.heldItem,null);assert.equal(s.torpedoes[0].target,null);assert.equal(s.torpedoes[0].phase,'cruising');assert.ok(s.torpedoes[0].vz>0);
 assert.equal(useHeldItem(s,owner,flat,[target]),false);owner.heldItem='torpedo';assert.equal(useHeldItem(s,owner,flat,[target]),true);assert.equal(s.torpedoes[1].target,target);
});

test('one complete hit slows the target, cancels Nitro, spins it and leaves the firing kart alone',()=>{
 const s=system(),owner=kart({heldItem:'torpedo',boostTime:1}),target=kart({z:80,speed:40,boostTime:1});useHeldItem(s,owner,flat,[target]);let hits=0;
 for(let i=0;i<200&&s.torpedoes.length;i++){stepItems(s,owner,owner,1/120,flat,[{state:target,previous:target}]);hits+=s.hits.length;}
 assert.equal(hits,1);assert.equal(s.torpedoes.length,0);assert.equal(target.spinTime,.75);assert.equal(target.boostTime,0);assert.ok(target.speed<12);assert.equal(target.yaw,0);assert.equal(owner.spinTime,0);assert.equal(owner.boostTime,1);
});

test('continuous homing catches real steering dodges and keeps the same target',()=>{
 for(const dt of [1/30,1/60,1/120])for(const maneuver of ['straight','late turn','weave']){
  const s=system(),owner=kart({heldItem:'torpedo'}),target=kart({z:120,speed:50});useHeldItem(s,owner,flat,[target]);let hits=0,elapsed=0,close=false;
  for(let i=0;i<2000&&s.torpedoes.length;i++){
   const t=s.torpedoes[0];assert.equal(t.phase,'homing');assert.equal(t.target,target);if(t.gap<32)close=true;
   const previous={...target},steer=maneuver==='weave'?Math.sign(Math.sin(elapsed*9)):maneuver==='late turn'&&close?1:0;
   stepVehicle(target,{throttle:1,steer},dt,flat);stepItems(s,owner,owner,dt,flat,[{state:target,previous}]);hits+=s.hits.length;elapsed+=dt;
  }
  assert.equal(hits,1,`${maneuver} at ${dt}`);assert.equal(s.torpedoes.length,0);assert.equal(target.spinTime,.75);
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

test('the target warning follows distance and becomes imminent without a dodge prompt',()=>{
 const s=system(),owner=kart({heldItem:'torpedo'}),target=kart({z:120});useHeldItem(s,owner,flat,[target]);assert.equal(torpedoWarning(s,owner),null);
 const first=torpedoWarning(s,target);assert.ok(first.distance>100);assert.equal(first.arrow,'↓');assert.equal(first.imminent,false);
 for(let i=0;i<200&&s.torpedoes[0]?.gap>30;i++)stepItems(s,owner,owner,1/120,flat,[{state:target,previous:target}]);
 const last=torpedoWarning(s,target);assert.ok(last.distance<first.distance);assert.equal(last.imminent,true);assert.equal(s.torpedoes[0].target,target);
});

test('a shot cannot hit the other overpass deck or pass through a guardrail',()=>{
 const s=system(),owner=kart({heldItem:'torpedo',y:8}),target=kart({z:80,y:8}),lower=kart({z:30,speed:40}),bridge={...flat,supportHeight:(x,z,max)=>max>=8?8:0};useHeldItem(s,owner,bridge,[target]);
 for(let i=0;i<40;i++)stepItems(s,owner,owner,1/120,bridge,[{state:target,previous:target},{state:lower,previous:lower}]);assert.equal(lower.spinTime,0);assert.equal(lower.speed,40);
 const blocked=system(),shooter=kart({heldItem:'torpedo'}),rival=kart({z:60});useHeldItem(blocked,shooter,flat,[rival]);
 const wall={...flat,resolveHorizontal:(x,z,nx,nz)=>({x:nx,z:Math.min(20,nz)})};for(let i=0;i<100;i++)stepItems(blocked,shooter,shooter,1/120,wall,[{state:rival,previous:rival}]);assert.equal(blocked.torpedoes.length,1);assert.ok(blocked.torpedoes[0].z<=20);assert.equal(rival.spinTime,0);blocked.torpedoes[0].age=TORPEDO_LIFETIME;stepItems(blocked,shooter,shooter,.01,wall,[{state:rival,previous:rival}]);assert.equal(blocked.torpedoes.length,0);
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


test('200 MPH changes actual straight travel to 89.408 metres per second',()=>{
 const s=system(),owner=kart({heldItem:'torpedo'});useHeldItem(s,owner,flat);const start=s.torpedoes[0].z;
 for(let i=0;i<120;i++)stepItems(s,owner,owner,1/120,flat);
 assert.ok(Math.abs(TORPEDO_SPEED/.44704-200)<1e-10);assert.ok(Math.abs(s.torpedoes[0].z-start-89.408)<1e-8);
});

test('a target beyond the old 360-metre range is followed and caught before the 30-second limit',()=>{
 const s=system([ORIGINAL_COURSE]),owner=at(ORIGINAL_COURSE,0,0,{heldItem:'torpedo'}),npc=createNpcDriver({progress:1000});npc.state.heldItem=null;
 assert.equal(useHeldItem(s,owner,worldPhysics,[npc.state]),true);let hits=0,elapsed=0;
 while(s.torpedoes.length&&elapsed<31){
  const previous={...npc.state};stepVehicle(npc.state,readNpcInput(npc,1/120),1/120,worldPhysics);stepItems(s,owner,owner,1/120,worldPhysics,[{state:npc.state,previous}]);hits+=s.hits.length;elapsed+=1/120;
 }
 assert.equal(hits,1);assert.ok(elapsed>10&&elapsed<30);assert.equal(npc.state.spinTime,.75);
});

test('unwrapped race order keeps a very distant leader ahead across the finish',()=>{
 const c=ORIGINAL_COURSE,s=system([c]),owner=at(c,0),leader=at(c,12);trackTorpedoPositions(s,[owner,leader]);
 for(let d=100;d<=c.length+100;d+=100){Object.assign(leader,at(c,d));trackTorpedoPositions(s,[owner,leader]);}
 const lock=findTorpedoTarget(s,owner,[leader]);assert.equal(lock.target,leader);assert.ok(lock.ahead>c.length);assert.equal(findTorpedoTarget(s,leader,[owner]),null);
});

test('an untargeted shot follows the circuit forward for 20 seconds, ignores the driver behind and explodes',()=>{
 const c=ORIGINAL_COURSE,s=system([c]),owner=at(c,300,2,{heldItem:'torpedo'}),behind=at(c,270),start=300+2.8;
 useHeldItem(s,owner,worldPhysics,[behind]);assert.equal(s.torpedoes[0].target,null);
 for(let i=0;i<1200;i++){
  stepItems(s,owner,owner,1/60,worldPhysics,[{state:behind,previous:behind}]);
  if(i<1199){assert.equal(s.torpedoes.length,1);const t=s.torpedoes[0],p=projectRaceCourse(t,c);assert.equal(t.phase,'cruising');assert.ok(p.height<.1&&p.distance<3);assert.ok(Math.abs(t.y-worldPhysics.supportHeight(t.x,t.z,t.y+.01))<1e-6);assert.ok(t.progress>start);}
 }
 assert.equal(TORPEDO_CRUISE_LIFETIME,20);assert.equal(s.torpedoes.length,0);assert.equal(s.torpedoBursts.at(-1).reason,'expired');assert.equal(behind.spinTime,0);
});

test('a locked shot has a fixed 30-second limit and expiry does not damage a nearby kart',()=>{
 const s=system(),owner=kart({heldItem:'torpedo'}),target=kart({z:5000,speed:80});useHeldItem(s,owner,flat,[target]);
 s.torpedoes[0].age=20;stepItems(s,owner,owner,.01,flat,[{state:target,previous:target}]);assert.equal(s.torpedoes.length,1);
 s.torpedoes[0].age=TORPEDO_LIFETIME;stepItems(s,owner,owner,.01,flat,[{state:target,previous:target}]);assert.equal(s.torpedoes.length,0);assert.equal(s.torpedoBursts.length,1);assert.equal(target.spinTime,0);
});

test('explosions dispose their materials, and restart clears shots, bursts and race history',()=>{
 const s=system(),owner=kart({heldItem:'torpedo'});useHeldItem(s,owner,flat);s.torpedoes[0].age=TORPEDO_CRUISE_LIFETIME;stepItems(s,owner,owner,.01,flat);
 const root=new THREE.Group(),update=createTorpedoBursts(root,s);update();assert.equal(root.children.length,1);let disposed=false;root.children[0].material.addEventListener('dispose',()=>disposed=true);
 stepItems(s,owner,owner,TORPEDO_BURST_SECONDS,flat);update();assert.equal(root.children.length,0);assert.equal(disposed,true);
 owner.heldItem='torpedo';useHeldItem(s,owner,flat);resetTorpedoes(s);assert.equal(s.torpedoes.length,0);assert.equal(s.torpedoBursts.length,0);assert.equal(s.torpedoAnchors.size,0);
});
