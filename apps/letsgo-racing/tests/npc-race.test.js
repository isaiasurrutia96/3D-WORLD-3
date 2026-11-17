import test from 'node:test';
import assert from 'node:assert/strict';
import {createNpcDriver,readNpcInput} from '../src/npc/driver.js';
import {createNpcRace,RACE_LAPS} from '../src/npc/race.js';
import {createRaceProgress,stepRaceProgress,raceOrder} from '../src/npc/race-progress.js';
import {coursePoint} from '../src/npc/course-line.js';
import {COURSES} from '../src/courses.js';
import {worldPhysics} from '../src/world.js';
import {createVehicleState,stepVehicle,NITRO_TOP_SPEED} from '../src/vehicle-controller.js';
import {createItemSystem,useHeldItem,stepItems} from '../src/items.js';
import {activateShield} from '../src/shield.js';
const DT=1/120;
function seeded(seed){let value=seed;return()=>{value=(value*1664525+1013904223)>>>0;return value/2**32;};}

test('each track starts four distinct opponents, waits for Gas and resets the whole grid empty',()=>{
 const items=createItemSystem(COURSES.map(c=>c.samples),seeded(1),COURSES),race=createNpcRace(worldPhysics,items),player=createVehicleState();
 for(const course of COURSES){
  Object.assign(player,race.start(player,course));
  assert.equal(race.laps,3);assert.equal(race.course,course);assert.equal(race.drivers.length,4);assert.equal(race.racers.length,5);
  assert.equal(new Set(race.drivers.map(d=>d.color)).size,4);
  const states=[player,...race.drivers.map(d=>d.state)];
  for(let a=0;a<5;a++)for(let b=a+1;b<5;b++)assert.ok(Math.hypot(states[a].x-states[b].x,states[a].z-states[b].z)>6);
  for(const state of states){assert.equal(state.heldItem,null);assert.equal(state.shieldHits,0);assert.equal(state.shieldTime,0);assert.equal(state.boostTime,0);}
  const initial=race.drivers.map(d=>({...d.state}));
  for(let i=0;i<120;i++)race.step(DT,player,player,false);
  assert.equal(race.elapsed,0);assert.equal(race.running,false);assert.deepEqual(race.drivers.map(d=>d.state),initial);
  race.step(DT,player,player,true);assert.equal(race.running,true);assert.ok(race.elapsed>0);
  activateShield(player);player.heldItem='shell';player.boostTime=2;
 }
 race.stop();assert.equal(race.active,false);assert.deepEqual(race.actors(),[]);
});

test('all tracks require twelve ordered checkpoints and three valid forward finish crossings',()=>{
 for(const course of COURSES){
  const p=d=>({...createVehicleState(),...coursePoint(course,d,0)}),r=createRaceProgress();
  stepRaceProgress(r,course,p(-1),p(1),.1,0,RACE_LAPS);assert.equal(r.completed,0);
  stepRaceProgress(r,course,p(1),p(course.length-1),.1,0,RACE_LAPS);assert.equal(r.passed,0);
  const scored=createRaceProgress();let elapsed=0,previous=p(0);
  for(let d=2;d<=course.length*RACE_LAPS+2;d+=2){const current=p(d);stepRaceProgress(scored,course,previous,current,.1,elapsed,RACE_LAPS);previous=current;elapsed+=.1;if(scored.completed<3)assert.equal(scored.finishedAt,null);}
  assert.equal(scored.completed,3,course.name);assert.ok(scored.finishedAt>0);
  const finish=scored.finishedAt;stepRaceProgress(scored,course,p(0),p(2),.1,999,RACE_LAPS);assert.equal(scored.finishedAt,finish);
  const elevated=createRaceProgress(course.gates[1].distance-1),a=p(course.gates[1].distance-1),b=p(course.gates[1].distance+1);a.y+=8;b.y+=8;stepRaceProgress(elevated,course,a,b,.1,0,RACE_LAPS);assert.equal(elevated.passed,0);
  const order=raceOrder([{...createRaceProgress(),id:'later',finishedAt:2.1},{...createRaceProgress(),id:'first',finishedAt:2.01},{...createRaceProgress(4000),id:'active'}],course);assert.deepEqual(order.map(r=>r.id),['first','later','active']);
 }
});

test('all five shields share one 15-second item clock, including while waiting at the grid',()=>{
 const course=COURSES[0],items=createItemSystem([],seeded(5),[course]),race=createNpcRace(worldPhysics,items),player=createVehicleState();
 Object.assign(player,race.start(player,course));
 const states=[player,...race.drivers.map(d=>d.state)];states.forEach(activateShield);
 for(let frame=0;frame<120*14;frame++){race.step(DT,player,player,false);stepItems(items,player,player,DT,worldPhysics,race.actors());}
 for(const state of states){assert.equal(state.shieldHits,1);assert.ok(state.shieldTime>.99&&state.shieldTime<1.01);}
 for(let frame=0;frame<121;frame++){race.step(DT,player,player,false);stepItems(items,player,player,DT,worldPhysics,race.actors());}
 assert.ok(states.every(state=>state.shieldHits===0));
});

test('five real karts complete three laps on every course with mixed items and no saved Time Trial writes',()=>{
 for(const [index,course] of COURSES.entries()){
  const items=createItemSystem([course.samples],seeded(index+8),[course]),race=createNpcRace(worldPhysics,items),player=createVehicleState();Object.assign(player,race.start(player,course));
  const pilot=createNpcDriver({course,progress:0,offset:-3.3,laps:null});pilot.state=player;
  const frameLimit=120*Math.max(400,course.length/12*RACE_LAPS);
  for(let frame=0;frame<frameLimit&&!race.racers.every(r=>r.finishedAt!==null);frame++){
   const previous={...player},traffic=race.actors().map(a=>a.state),input=readNpcInput(pilot,DT,{traffic,boxes:items.boxes,torpedoSystem:items});
   if(race.player.finishedAt!==null){input.throttle=0;input.steer=0;input.brake=true;input.useItem=false;}
   if(input.useItem)useHeldItem(items,player,worldPhysics,traffic);
   stepVehicle(player,input,DT,worldPhysics);race.step(DT,player,previous,true);stepItems(items,player,previous,DT,worldPhysics,race.actors());
   for(const d of race.drivers){assert.equal(d.state.grounded,true,`${course.name}: ${d.name} left its deck`);assert.ok(d.state.speed<=NITRO_TOP_SPEED+.01);}
  }
  assert.ok(race.racers.every(r=>r.completed===3),`${course.name}: ${JSON.stringify(race.racers.map(r=>[r.name,r.completed,r.passed,Math.round(r.progress),Math.round(r.state.speed)]))}`);
  assert.equal(race.order().length,5);console.log(`${course.name}: all five finished in ${race.elapsed.toFixed(1)}s`);
 }
});
