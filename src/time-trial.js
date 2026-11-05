import {trackSamples,TRACK_HALF_WIDTH,CURB_WIDTH} from './track.js';

export const COURSE_ID='letsgo-circuit-d4a711d-start95-v1';
export const STORAGE_KEY='letsgo.top-laps.v2';
export const LEGACY_STORAGE_KEY='letsgo.best-lap.v1';
export const MAX_GHOSTS=4;
export const START_INDEX=95,CHECKPOINT_COUNT=12,GHOST_HZ=30,MAX_LAP_SECONDS=1800;
export const COURSE_LENGTH=trackSamples.at(-1).distance;
const COUNT=trackSamples.length-1,START_DISTANCE=trackSamples[START_INDEX].distance;
const wrap=value=>((value%COURSE_LENGTH)+COURSE_LENGTH)%COURSE_LENGTH;
const angle=(a,b,t)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*t;
const lerp=(a,b,t)=>a+(b-a)*t;
function atDistance(distance){
 const d=wrap(START_DISTANCE+distance),index=Math.min(COUNT-1,Math.floor(d/COURSE_LENGTH*COUNT));
 const a=trackSamples[index].point,b=trackSamples[index+1].point,t=(d-trackSamples[index].distance)/(trackSamples[index+1].distance-trackSamples[index].distance),length=Math.hypot(b.x-a.x,b.z-a.z);
 return{x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t),z:lerp(a.z,b.z,t),fx:(b.x-a.x)/length,fz:(b.z-a.z)/length,distance};
}
export const GATES=Array.from({length:CHECKPOINT_COUNT+1},(_,i)=>({...atDistance(i*COURSE_LENGTH/(CHECKPOINT_COUNT+1)),index:i}));
export const RACE_START={x:GATES[0].x,y:GATES[0].y,z:GATES[0].z,yaw:Math.atan2(GATES[0].fx,GATES[0].fz)};

// Index the road in X/Z, then compare height as well. The bridge and the road
// below it must never count as the same checkpoint or progress segment.
const CELL=32,cells=new Map();
for(let i=0;i<COUNT;i++){
 const a=trackSamples[i].point,b=trackSamples[i+1].point,dx=b.x-a.x,dz=b.z-a.z,padding=TRACK_HALF_WIDTH+CURB_WIDTH+2;
 const segment={a,b,dx,dz,length2:dx*dx+dz*dz,distance:trackSamples[i].distance,span:trackSamples[i+1].distance-trackSamples[i].distance};
 for(let x=Math.floor((Math.min(a.x,b.x)-padding)/CELL);x<=Math.floor((Math.max(a.x,b.x)+padding)/CELL);x++)for(let z=Math.floor((Math.min(a.z,b.z)-padding)/CELL);z<=Math.floor((Math.max(a.z,b.z)+padding)/CELL);z++){
  const key=`${x},${z}`;if(!cells.has(key))cells.set(key,[]);cells.get(key).push(segment);
 }
}
export function projectCourse(p){
 let best=null,cost=Infinity;
 for(const s of cells.get(`${Math.floor(p.x/CELL)},${Math.floor(p.z/CELL)}`)??[]){
  const t=Math.max(0,Math.min(1,((p.x-s.a.x)*s.dx+(p.z-s.a.z)*s.dz)/s.length2));
  const x=s.a.x+s.dx*t,z=s.a.z+s.dz*t,y=lerp(s.a.y,s.b.y,t),distance=Math.hypot(p.x-x,p.z-z),height=Math.abs(p.y-y),score=distance*distance+height*height*9;
  if(score<cost){cost=score;best={distance,height,progress:wrap(s.distance+s.span*t-START_DISTANCE)};}
 }
 return best;
}
function crossing(gate,a,b){
 const before=(a.x-gate.x)*gate.fx+(a.z-gate.z)*gate.fz,after=(b.x-gate.x)*gate.fx+(b.z-gate.z)*gate.fz;
 if(before>1e-7||after<0||after-before<1e-8)return null;
 const t=Math.max(0,Math.min(1,-before/(after-before))),x=lerp(a.x,b.x,t)-gate.x,z=lerp(a.z,b.z,t)-gate.z;
 return Math.abs(x*gate.fz-z*gate.fx)<=TRACK_HALF_WIDTH+CURB_WIDTH+.5&&Math.abs(lerp(a.y,b.y,t)-gate.y)<1.25?t:null;
}
const fields=['x','y','z','yaw','pitch','bank','steering','wheelRotation'];
export function interpolatePose(a,b,t){const p={};for(const key of fields)p[key]=key==='yaw'?angle(a[key]??0,b[key]??0,t):lerp(a[key]??0,b[key]??0,t);return p;}
function frame(time,pose){return[time,...fields.map(key=>(Math.round((pose[key]??0)*10000)/10000)||0)];}
function fromFrame(row){return Object.fromEntries(fields.map((key,i)=>[key,row[i+1]]));}
function validBest(data){
 if(!data||data.course!==COURSE_ID||!Number.isFinite(data.duration)||data.duration<COURSE_LENGTH/80||data.duration>MAX_LAP_SECONDS||!Array.isArray(data.frames)||data.frames.length<2||data.frames.length>MAX_LAP_SECONDS*GHOST_HZ+3)return false;
 let previous=-1;
 for(const row of data.frames){if(!Array.isArray(row)||row.length!==9||!row.every(Number.isFinite)||row[0]<=previous||row[0]>data.duration+.001)return false;previous=row[0];}
 return data.frames[0][0]===0&&Math.abs(data.frames.at(-1)[0]-data.duration)<.001;
}
function saveRecords(state){
 if(!state.storage)return false;
 try{
  state.storage.setItem(STORAGE_KEY,JSON.stringify({version:2,course:COURSE_ID,laps:state.records}));
  // Only retire the old single-best entry after the new table is safely saved.
  try{state.storage.removeItem?.(LEGACY_STORAGE_KEY);}catch{}
  return true;
 }catch{return false;}
}
export function createTimeTrial(storage=null){
 let records=[],migrated=false;
 try{
  const raw=storage?.getItem(STORAGE_KEY);
  if(raw&&raw.length<16000000){
   const data=JSON.parse(raw);
   if(data.version===2&&data.course===COURSE_ID&&Array.isArray(data.laps)&&data.laps.length<=MAX_GHOSTS)records=data.laps.filter(validBest).sort((a,b)=>a.duration-b.duration);
  }
 }catch{}
 if(!records.length)try{
  const raw=storage?.getItem(LEGACY_STORAGE_KEY);
  if(raw&&raw.length<8000000){const legacy=JSON.parse(raw);if(validBest(legacy)){records=[legacy];migrated=true;}}
 }catch{}
 const state={storage,records,best:records[0]??null,status:'idle',elapsed:0,completed:0,lastLap:null,lastWasBest:false,lastRank:null,passed:0,progress:0,previousProgress:0,frames:[],nextSample:1/GHOST_HZ,ghostBest:records[0]??null,ghostRecords:records.slice(),showGhost:true,reason:'',persisted:!!records.length};
 if(migrated)saveRecords(state);
 return state;
}
export function armTimeTrial(state){
 Object.assign(state,{status:'ready',elapsed:0,completed:0,lastLap:null,lastWasBest:false,lastRank:null,passed:0,progress:0,previousProgress:0,frames:[],nextSample:1/GHOST_HZ,ghostBest:state.best,ghostRecords:state.records.slice(),reason:''});
}
export function invalidateTimeTrial(state,reason='Off course — restart lap'){
 if(state.status==='running'||state.status==='ready'){state.status='invalid';state.reason=reason;state.frames=[];}
}
function record(state,start,end,a,b,step){
 while(state.nextSample<=end+1e-9){const t=Math.max(0,Math.min(1,(state.nextSample-start)/step));state.frames.push(frame(state.nextSample,interpolatePose(a,b,t)));state.nextSample+=1/GHOST_HZ;}
}
function complete(state,duration,finish){
 if(state.frames.at(-1)[0]<duration-1e-8)state.frames.push(frame(duration,finish));else state.frames[state.frames.length-1]=frame(duration,finish);
 state.lastLap=duration;state.lastWasBest=!state.best||duration<state.best.duration;
 const entry={course:COURSE_ID,duration,frames:state.frames},ranked=[...state.records,entry].sort((a,b)=>a.duration-b.duration),rank=ranked.indexOf(entry);
 state.lastRank=rank<MAX_GHOSTS?rank+1:null;
 if(state.lastRank!==null){
  state.records=ranked.slice(0,MAX_GHOSTS);state.best=state.records[0];state.persisted=saveRecords(state);
 }
 state.completed++;state.ghostBest=state.best;state.ghostRecords=state.records.slice();state.frames=[frame(0,finish)];state.nextSample=1/GHOST_HZ;state.passed=0;
}
export function stepTimeTrial(state,previous,current,forward,dt){
 if(state.status==='ready'&&forward){state.status='running';state.frames=[frame(0,previous)];state.previousProgress=projectCourse(previous)?.progress??0;}
 if(state.status!=='running')return;
 const road=projectCourse(current),travel=Math.hypot(current.x-previous.x,current.z-previous.z);
 if(!road||road.distance>TRACK_HALF_WIDTH+CURB_WIDTH+.7||road.height>.85||current.grounded===false||travel>80*dt+.30){invalidateTimeTrial(state);return;}
 let delta=road.progress-state.previousProgress;
 if(delta>COURSE_LENGTH/2)delta-=COURSE_LENGTH;if(delta< -COURSE_LENGTH/2)delta+=COURSE_LENGTH;
 if(Math.abs(delta)>travel*2+2){invalidateTimeTrial(state,'Course skipped — restart lap');return;}
 state.progress+=delta;state.previousProgress=road.progress;
 const oldTime=state.elapsed,endTime=oldTime+dt;
 if(endTime>MAX_LAP_SECONDS){invalidateTimeTrial(state,'Attempt ended — restart lap');return;}
 const next=state.passed<CHECKPOINT_COUNT?state.passed+1:0,gate=GATES[next],target=next===0?COURSE_LENGTH:gate.distance;
 const hit=state.progress>=target-6&&state.progress<=target+6?crossing(gate,previous,current):null;
 if(hit!==null&&next===0){
  const finishTime=oldTime+dt*hit,finishPose=interpolatePose(previous,current,hit);
  record(state,oldTime,finishTime,previous,current,dt);complete(state,finishTime,finishPose);
  state.elapsed=dt*(1-hit);state.progress=delta*(1-hit);
  if(state.elapsed>0)record(state,0,state.elapsed,finishPose,current,state.elapsed);
 }else{
  if(hit!==null)state.passed++;
  record(state,oldTime,endTime,previous,current,dt);state.elapsed=endTime;
 }
}
export function sampleGhost(best,time){
 if(!best||time<0||time>best.duration)return null;
 const rows=best.frames;let lo=0,hi=rows.length-1;
 while(lo+1<hi){const mid=(lo+hi)>>1;if(rows[mid][0]<=time)lo=mid;else hi=mid;}
 const a=rows[lo],b=rows[hi],t=Math.max(0,Math.min(1,(time-a[0])/(b[0]-a[0])));
 return interpolatePose(fromFrame(a),fromFrame(b),t);
}
export function formatTime(seconds){
 if(seconds==null)return'--:--.---';const ms=Math.max(0,Math.floor(seconds*1000+1e-5));return`${String(Math.floor(ms/60000)).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')}.${String(ms%1000).padStart(3,'0')}`;
}
