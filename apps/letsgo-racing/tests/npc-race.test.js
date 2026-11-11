import test from 'node:test';
import assert from 'node:assert/strict';
import {createNpcDriver,readNpcInput} from '../src/npc/driver.js';
import {createNpcRace,RACE_LAPS} from '../src/npc/race.js';
import {aimNpcShell} from '../src/npc/shell-aim.js';
import {createRaceProgress,stepRaceProgress,raceOrder} from '../src/npc/race-progress.js';
import {coursePoint} from '../src/npc/course-line.js';
import {ORIGINAL_COURSE as course} from '../src/courses.js';
import {worldPhysics} from '../src/world.js';
import {createVehicleState,stepVehicle,NITRO_TOP_SPEED} from '../src/vehicle-controller.js';
import {createItemSystem,useHeldItem,stepItems} from '../src/items.js';
import {stepShield} from '../src/shield.js';
const DT=1/120,flat={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz)=>({x:nx,z:nz})};
const context={maxSteer:.1,alignment:0,cornerSpeed:80};
function seeded(seed){let value=seed;return()=>{value=(value*1664525+1013904223)>>>0;return value/2**32;};}
function armed(random=()=>0){const d=createNpcDriver({progress:0,offset:0,random});Object.assign(d.state,{speed:40,heldItem:'shell'});return d;}
function attack(d,t){const i={steer:0,brake:false,useItem:false};aimNpcShell(d,t,i,context);return i;}

test('each held shell chooses direct or nearby aim with one 50/50 draw, without rerolling while lining up',()=>{
 for(const draw of [0,.499999,.5,.999999]){
  const d=armed(()=>draw),t=coursePoint(course,80,0),before={...d.state};attack(d,t);assert.deepEqual(d.state,before);
  const aim=d.shellAim??d.lastShellShot;assert.equal(aim.direct,draw<.5);assert.equal(Math.abs(aim.offset),draw<.5?0:3.8);
 }
 const d=armed(()=>.8),t=coursePoint(course,80,0);attack(d,t);const plan=d.shellAim;d.random=()=>{throw Error('must not reroll an existing aim');};
 for(let i=0;i<60;i++){attack(d,t);assert.equal(d.shellAim,plan);}
 const random=seeded(7);let direct=0;
 for(let i=0;i<2000;i++){const d=armed(random);attack(d,t);if((d.shellAim??d.lastShellShot).direct)direct++;}
 assert.ok(direct>930&&direct<1070,`50/50 draw produced ${direct}/2000 direct aims`);
});

test('the NPC steers to line up a nearby shot and fires through its real forward heading',()=>{
 const d=armed(()=>.9),target={...createVehicleState(),...coursePoint(course,80,0)};let fired=false,turned=false;
 for(let i=0;i<240;i++){
  const before={...d.state},input=readNpcInput(d,DT,{traffic:[target],shellTarget:target});assert.deepEqual(d.state,before);
  if(input.useItem){assert.equal(d.lastShellShot.direct,false);const s=createItemSystem([]);assert.ok(useHeldItem(s,d.state,flat,[target]));const shell=s.shells[0];assert.ok(Math.abs(shell.vx/Math.hypot(shell.vx,shell.vz)-Math.sin(d.state.yaw))<1e-10);assert.ok(Math.abs(shell.vz/Math.hypot(shell.vx,shell.vz)-Math.cos(d.state.yaw))<1e-10);fired=true;break;}
  stepVehicle(d.state,input,DT,worldPhysics);if(Math.abs(d.state.yaw-before.yaw)>1e-5)turned=true;
 }
 assert.ok(turned);assert.ok(fired,'nearby shot lines up using normal controls');
});

test('direct shells hit a stationary target but remain dodgeable and never home after launch',()=>{
 for(const dodge of [false,true]){
  const d=armed(),target={...createVehicleState(),...coursePoint(course,80,0)};assert.equal(attack(d,target).useItem,true);
  const s=createItemSystem([]);useHeldItem(s,d.state,flat,[target]);const shell=s.shells[0],velocity=[shell.vx,shell.vz];
  if(dodge){target.x+=Math.cos(d.state.yaw)*7;target.z-=Math.sin(d.state.yaw)*7;}
  let hit=false;for(let i=0;i<160;i++){stepItems(s,d.state,d.state,DT,flat,[{state:target,previous:target}]);if(s.shells.length)assert.deepEqual([shell.vx,shell.vz],velocity);if(s.hits.some(h=>h.target===target))hit=true;}
  assert.equal(hit,!dodge);
 }
});

test('NPCs hold shells for targets behind, on another deck, during spins or around obstructing corners',()=>{
 for(const t of [coursePoint(course,-60,0),{...coursePoint(course,80,0),y:8},coursePoint(course,500,0)])assert.equal(attack(armed(),t).useItem,false);
 const d=armed();d.state.spinTime=.4;assert.equal(attack(d,coursePoint(course,80,0)).useItem,false);
});

test('a three-lap race starts all four karts without items or shields, waits for Gas and resets cleanly',()=>{
 const items=createItemSystem(),race=createNpcRace(worldPhysics,items),player=createVehicleState();Object.assign(player,race.start(player));
 assert.equal(race.laps,3);assert.equal(race.drivers.length,3);assert.equal(new Set(race.drivers.map(d=>d.color)).size,3);assert.equal(race.racers.length,4);
 const states=[player,...race.drivers.map(d=>d.state)];for(let a=0;a<4;a++)for(let b=a+1;b<4;b++)assert.ok(Math.hypot(states[a].x-states[b].x,states[a].z-states[b].z)>6);
 for(const state of states){assert.equal(state.heldItem,null);assert.equal(state.shieldHits,0);assert.equal(state.shieldTime,0);assert.equal(state.boostTime,0);}
 const initial=race.drivers.map(d=>({...d.state}));for(let i=0;i<120;i++)race.step(DT,player,player,false);assert.equal(race.elapsed,0);assert.equal(race.running,false);assert.deepEqual(race.drivers.map(d=>d.state),initial);
 race.step(DT,player,player,true);assert.equal(race.running,true);assert.ok(race.elapsed>0);Object.assign(player,{heldItem:'shell',shieldHits:2,shieldTime:12,shieldRunning:true,boostTime:2});Object.assign(player,race.start(player));assert.equal(player.heldItem,null);assert.equal(player.shieldHits,0);assert.equal(player.shieldTime,0);assert.equal(player.shieldRunning,false);assert.equal(player.boostTime,0);assert.ok(race.drivers.every(d=>d.state.heldItem===null&&d.state.shieldHits===0));assert.equal(race.running,false);assert.equal(race.elapsed,0);assert.ok(race.racers.every(r=>r.completed===0));race.stop();assert.deepEqual(race.actors(),[]);assert.equal(race.active,false);
});

test('lap scoring requires twelve ordered checkpoints and three forward finish crossings at the correct height',()=>{
 const p=d=>({...createVehicleState(),...coursePoint(course,d,0)}),r=createRaceProgress();
 stepRaceProgress(r,course,p(-1),p(1),.1,0,RACE_LAPS);assert.equal(r.completed,0);
 stepRaceProgress(r,course,p(1),p(course.length-1),.1,0,RACE_LAPS);assert.equal(r.passed,0);assert.equal(r.completed,0);
 const scored=createRaceProgress();let elapsed=0,previous=p(0),second=false;
 for(let d=2;d<=course.length*RACE_LAPS+2;d+=2){const current=p(d);stepRaceProgress(scored,course,previous,current,.1,elapsed,RACE_LAPS);previous=current;elapsed+=.1;if(scored.completed===RACE_LAPS-1){second=true;assert.equal(scored.finishedAt,null);}}
 assert.ok(second);assert.equal(scored.completed,3);assert.ok(scored.finishedAt>0);
 const stopped=scored.finishedAt;stepRaceProgress(scored,course,p(0),p(2),.1,999,RACE_LAPS);assert.equal(scored.finishedAt,stopped);
 const elevated=createRaceProgress(course.gates[1].distance-1);const a=p(course.gates[1].distance-1),b=p(course.gates[1].distance+1);a.y+=8;b.y+=8;stepRaceProgress(elevated,course,a,b,.1,0,RACE_LAPS);assert.equal(elevated.passed,0);
 const order=raceOrder([{...createRaceProgress(),id:'later',finishedAt:2.1},{...createRaceProgress(),id:'first',finishedAt:2.01},{...createRaceProgress(4000),id:'active'}],course);assert.deepEqual(order.map(r=>r.id),['first','later','active']);
});

test('four real karts complete three laps with shared mixed items, hits, overtaking and checkpoint scoring',()=>{
 for(const seed of [2,8]){
  const random=seeded(seed),items=createItemSystem([course.samples],random,[course]),race=createNpcRace(worldPhysics,items,{random}),player=createVehicleState();Object.assign(player,race.start(player));
  const pilot=createNpcDriver({progress:0,offset:-3.3,laps:null,random});pilot.state=player;let hits=0,shellShots=0;
  for(let frame=0;frame<120*350&&!race.racers.every(r=>r.finishedAt!==null);frame++){
   const previous={...player};stepShield(player,DT);const traffic=race.actors().map(a=>a.state),input=readNpcInput(pilot,DT,{traffic,boxes:items.boxes,torpedoSystem:items});
   if(race.player.finishedAt!==null){input.throttle=0;input.steer=0;input.brake=true;input.useItem=false;}
   if(input.useItem)useHeldItem(items,player,worldPhysics,traffic);stepVehicle(player,input,DT,worldPhysics);race.step(DT,player,previous,true);stepItems(items,player,previous,DT,worldPhysics,race.actors());hits+=items.hits.length;
   for(const d of race.drivers){if(d.lastShellShot&&!d.lastShellShot.counted){shellShots++;d.lastShellShot.counted=true;}assert.equal(d.state.grounded,true);assert.ok(d.state.speed<=NITRO_TOP_SPEED+.01);}
   if(frame===120*90)assert.ok(race.drivers.every(d=>!d.finished),'opponents continue after their first lap');
  }
  assert.ok(race.racers.every(r=>r.completed===3),`seed ${seed}: ${JSON.stringify(race.racers.map(r=>[r.name,r.completed,r.passed,r.progress]))}`);assert.equal(race.order().length,4);assert.ok(race.elapsed<350);assert.ok(hits>0);assert.ok(shellShots>0);
 }
});
