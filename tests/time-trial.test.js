import test from 'node:test';
import assert from 'node:assert/strict';
import {trackSamples} from '../src/track.js';
import {createVehicleState,stepVehicle} from '../src/vehicle-controller.js';
import {worldPhysics} from '../src/world.js';
import {createTimeTrial,armTimeTrial,stepTimeTrial,invalidateTimeTrial,sampleGhost,formatTime,RACE_START,START_INDEX,STORAGE_KEY,LEGACY_STORAGE_KEY,MAX_GHOSTS,GATES,CHECKPOINT_COUNT,projectCourse} from '../src/time-trial.js';
const count=trackSamples.length-1;
function storage(){const data=new Map();return{getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)};}
function pose(index){const n=((index%count)+count)%count,p=trackSamples[n].point,next=trackSamples[n+1].point;return{x:p.x,y:p.y,z:p.z,yaw:Math.atan2(next.x-p.x,next.z-p.z),pitch:0,bank:0,steering:0,wheelRotation:index*.2,grounded:true};}
function lap(state,dt=.1){let previous=pose(START_INDEX);armTimeTrial(state);for(let i=1;i<=count+1;i++){const current=pose(START_INDEX+i);stepTimeTrial(state,previous,current,true,dt);assert.equal(state.status,'running',state.reason);previous=current;}assert.equal(state.completed,1);}

test('ready timer holds until forward input and remains separate from camera/on-foot time',()=>{
 const state=createTimeTrial();armTimeTrial(state);const start={...RACE_START,grounded:true};
 for(let i=0;i<100;i++)stepTimeTrial(state,start,start,false,.1);
 assert.equal(state.status,'ready');assert.equal(state.elapsed,0);
 stepTimeTrial(state,start,start,true,1/120);assert.equal(state.status,'running');assert.equal(state.elapsed,1/120);
 invalidateTimeTrial(state,'Left kart');stepTimeTrial(state,start,start,true,1);assert.equal(state.elapsed,1/120);assert.equal(state.best,null);
});
test('ordered complete lap records an interpolated finish and persists a replay',()=>{
 const memory=storage(),state=createTimeTrial(memory);lap(state);
 assert.ok(Math.abs(state.lastLap-120)<.01);assert.equal(state.lastWasBest,true);assert.equal(state.passed,0);assert.ok(state.elapsed<.11);assert.ok(state.persisted);
 assert.ok(state.best.frames.length>3500);assert.equal(state.best.frames[0][0],0);assert.equal(state.best.frames.at(-1)[0],state.best.duration);
 const restored=createTimeTrial(memory);assert.equal(restored.best.duration,state.best.duration);assert.deepEqual(restored.best.frames,state.best.frames);
 const halfway=sampleGhost(restored.best,60);assert.ok(halfway&&Number.isFinite(halfway.x));assert.equal(sampleGhost(restored.best,121),null);
});
test('slower laps preserve the ghost and faster laps replace it; restart preserves best',()=>{
 const state=createTimeTrial(storage());lap(state,.1);const first=state.best;
 lap(state,.12);assert.equal(state.best,first);assert.equal(state.lastWasBest,false);
 lap(state,.095);assert.ok(state.best.duration<first.duration);assert.equal(state.lastWasBest,true);armTimeTrial(state);assert.equal(state.elapsed,0);assert.ok(state.best);assert.equal(state.ghostBest,state.best);
});
test('finish-line oscillation, reverse laps, teleporting and off-course shortcuts cannot set a best',()=>{
 const state=createTimeTrial();armTimeTrial(state);let previous={...RACE_START,grounded:true};
 for(let i=0;i<20;i++){const s=i%2?-1:1,current={...previous,x:RACE_START.x+GATES[0].fx*s,z:RACE_START.z+GATES[0].fz*s};stepTimeTrial(state,previous,current,true,.1);previous=current;}
 assert.equal(state.completed,0);assert.equal(state.best,null);
 armTimeTrial(state);previous=pose(START_INDEX);for(let i=1;i<=count+1;i++){const current=pose(START_INDEX-i);stepTimeTrial(state,previous,current,true,.1);previous=current;}assert.equal(state.completed,0);assert.equal(state.best,null);
 armTimeTrial(state);stepTimeTrial(state,pose(START_INDEX),pose(START_INDEX+100),true,.1);assert.equal(state.status,'invalid');
 armTimeTrial(state);stepTimeTrial(state,pose(START_INDEX),{...pose(START_INDEX),z:-1000},true,.1);assert.equal(state.status,'invalid');assert.equal(state.best,null);
});
test('overpass progress and checkpoint heights distinguish the road below',()=>{
 const p=trackSamples.find(s=>s.point.y>8&&s.point.z>60&&s.point.z<85).point;
 const upper=projectCourse(p),lower=projectCourse({...p,y:0});assert.ok(upper.height<.02);assert.ok(lower.height<.1);assert.ok(Math.abs(upper.progress-lower.progress)>200);
 assert.equal(GATES.length,CHECKPOINT_COUNT+1);
});
test('corrupt storage and quota errors never prevent a session best or racing',()=>{
 assert.equal(createTimeTrial({getItem:()=>'{bad'}).best,null);
 const state=createTimeTrial({getItem:()=>null,setItem:()=>{throw Error('quota');}});lap(state);assert.ok(state.best);assert.equal(state.persisted,false);
 const bad=JSON.parse(JSON.stringify(state.best));bad.frames[0][1]=null;
 assert.equal(createTimeTrial({getItem:()=>JSON.stringify(bad)}).best,null);
});
test('ghost interpolation wraps headings and formatted times do not overwrite source poses',()=>{
 const a=[0,1,2,3,Math.PI-.1,0,0,0,0],b=[1,3,4,5,-Math.PI+.1,.2,.1,.4,2],best={duration:1,frames:[a,b]},result=sampleGhost(best,.5);
 assert.equal(result.x,2);assert.ok(Math.abs(result.yaw-Math.PI)<1e-8);assert.equal(result.steering,.2);assert.equal(a[1],1);assert.equal(formatTime(65.123),'01:05.123');assert.equal(formatTime(null),'--:--.---');
});
test('real kart physics completes ordered checkpoints and a timed lap across both road levels',()=>{
 const state=createTimeTrial(),kart={...createVehicleState(),...RACE_START};armTimeTrial(state);let index=START_INDEX+1,peak=0;
 for(let frame=0;frame<100000&&state.completed===0;frame++){
  const targetIndex=index%count,waypoint=trackSamples[targetIndex].point;
  if(Math.hypot(waypoint.x-kart.x,waypoint.z-kart.z)<5)index++;
  const target=trackSamples[(index+2)%count].point,desired=Math.atan2(target.x-kart.x,target.z-kart.z),error=Math.atan2(Math.sin(desired-kart.yaw),Math.cos(desired-kart.yaw));
  const previous={...kart};stepVehicle(kart,{throttle:kart.speed<12?1:0,steer:Math.max(-1,Math.min(1,-error*2)),brake:kart.speed>14},1/120,worldPhysics);
  stepTimeTrial(state,previous,kart,frame===0,1/120);peak=Math.max(peak,kart.y);assert.equal(state.status,'running',`${state.reason}, gate ${state.passed}`);
 }
 assert.equal(state.completed,1);assert.ok(peak>8);assert.ok(state.best.duration>200&&state.best.duration<500);
});

test('a lap with repeated drifts still validates and records the sideways kart pose for replay',()=>{
 const state=createTimeTrial(),kart={...createVehicleState(),...RACE_START},dt=1/120;armTimeTrial(state);
 let index=START_INDEX+1,driftTime=0,rest=0,driftTicks=0,peak=0,sample=null;
 for(let frame=0;frame<100000&&state.completed===0;frame++){
  const waypoint=trackSamples[index%count].point;
  if(Math.hypot(waypoint.x-kart.x,waypoint.z-kart.z)<5)index++;
  const target=trackSamples[(index+2)%count].point,desired=Math.atan2(target.x-kart.x,target.z-kart.z);
  const error=Math.atan2(Math.sin(desired-kart.yaw-kart.driftAngle),Math.cos(desired-kart.yaw-kart.driftAngle)),steer=Math.max(-1,Math.min(1,-error*2));
  rest=Math.max(0,rest-dt);driftTime=Math.max(0,driftTime-dt);
  if(rest===0&&kart.speed>12&&Math.abs(steer)>.2){driftTime=.3;rest=5;}
  const previous={...kart};stepVehicle(kart,{throttle:kart.speed<13?1:0,steer,brake:kart.speed>15,drift:driftTime>0},dt,worldPhysics);
  stepTimeTrial(state,previous,kart,frame===0,dt);peak=Math.max(peak,kart.y);
  if(kart.drifting){driftTicks++;if(!sample&&Math.abs(kart.driftAngle)>.15)sample={time:state.elapsed,...kart};}
  assert.equal(state.status,'running',state.reason);assert.equal(kart.grounded,true);
 }
 assert.equal(state.completed,1);assert.ok(driftTicks>500&&peak>8);assert.ok(sample);
 const replay=sampleGhost(state.best,sample.time);
 assert.ok(Math.hypot(replay.x-sample.x,replay.z-sample.z)<.02);
 assert.ok(Math.abs(Math.atan2(Math.sin(replay.yaw-sample.yaw),Math.cos(replay.yaw-sample.yaw)))<.01);
});

test('rolling laps restart the clock at the finish without losing checkpoint order',()=>{
 const state=createTimeTrial();armTimeTrial(state);let previous=pose(START_INDEX);
 for(let i=1;i<=count*2+1;i++){const current=pose(START_INDEX+i);stepTimeTrial(state,previous,current,true,.1);assert.equal(state.status,'running');previous=current;}
 assert.equal(state.completed,2);assert.ok(Math.abs(state.lastLap-120)<.01);assert.ok(state.elapsed<.11);assert.ok(state.best);
});


test('four fastest distinct completed laps are sorted, replayed and persisted',()=>{
 const memory=storage(),state=createTimeTrial(memory);
 for(const dt of [.1,.12,.095,.105])lap(state,dt);
 assert.equal(state.records.length,MAX_GHOSTS);const prior=state.records.slice();
 lap(state,.13);assert.deepEqual(state.records,prior);assert.equal(state.lastRank,null);
 lap(state,.11);assert.equal(state.lastRank,4);assert.equal(state.records.length,4);
 state.records.forEach((record,i)=>assert.ok(Math.abs(record.duration-[114,120,126,132][i])<.01));
 armTimeTrial(state);assert.deepEqual(state.ghostRecords,state.records);for(const record of state.ghostRecords)assert.ok(sampleGhost(record,10));
 const loaded=createTimeTrial(memory);assert.deepEqual(loaded.records,state.records);assert.equal(loaded.best,loaded.records[0]);assert.equal(JSON.parse(memory.getItem(STORAGE_KEY)).version,2);
});

test('existing single-best ghost migrates without losing its replay or creating duplicates',()=>{
 const old=createTimeTrial();lap(old);const memory=storage();memory.setItem(LEGACY_STORAGE_KEY,JSON.stringify(old.best));
 const migrated=createTimeTrial(memory);assert.equal(migrated.records.length,1);assert.deepEqual(migrated.best,old.best);assert.ok(memory.getItem(STORAGE_KEY));assert.equal(memory.getItem(LEGACY_STORAGE_KEY),null);
 assert.equal(createTimeTrial(memory).records.length,1);
 const failed=createTimeTrial({getItem:key=>key===LEGACY_STORAGE_KEY?JSON.stringify(old.best):null,setItem:()=>{throw Error('quota');}});assert.equal(failed.records.length,1);assert.deepEqual(failed.best,old.best);
});
