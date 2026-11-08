import {ORIGINAL_COURSE} from './courses.js';
import {projectRaceCourse} from './race-course.js';
import {NITRO_TOP_SPEED} from './vehicle-controller.js';

export const COURSE_ID=ORIGINAL_COURSE.id;
export const STORAGE_KEY=ORIGINAL_COURSE.storageKey;
export const LEGACY_STORAGE_KEY=ORIGINAL_COURSE.legacyStorageKey;
export const MAX_GHOSTS=4;
export const MAX_GHOST_FILE_BYTES=16000000;
export const GHOST_COLORS=Object.freeze(['#8deafa','#d7a2ff','#ffc578','#8cf0a3']);
export const START_INDEX=ORIGINAL_COURSE.startIndex,CHECKPOINT_COUNT=12,GHOST_HZ=30,MAX_LAP_SECONDS=1800;
export const COURSE_LENGTH=ORIGINAL_COURSE.length,GATES=ORIGINAL_COURSE.gates,RACE_START=ORIGINAL_COURSE.start;
const MAX_LEGAL_SPEED=NITRO_TOP_SPEED+2;
const angle=(a,b,t)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*t;
const lerp=(a,b,t)=>a+(b-a)*t;
const courseOf=state=>state.course??ORIGINAL_COURSE;
export const projectCourse=(p,course=ORIGINAL_COURSE)=>projectRaceCourse(p,course);

function crossing(gate,a,b,course){
 const before=(a.x-gate.x)*gate.fx+(a.z-gate.z)*gate.fz,after=(b.x-gate.x)*gate.fx+(b.z-gate.z)*gate.fz;
 if(before>1e-7||after<0||after-before<1e-8)return null;
 const t=Math.max(0,Math.min(1,-before/(after-before))),x=lerp(a.x,b.x,t)-gate.x,z=lerp(a.z,b.z,t)-gate.z;
 return Math.abs(x*gate.fz-z*gate.fx)<=course.halfWidth+course.curbWidth+.5&&Math.abs(lerp(a.y,b.y,t)-gate.y)<1.25?t:null;
}
const fields=['x','y','z','yaw','pitch','bank','steering','wheelRotation'];
export function interpolatePose(a,b,t){const p={};for(const key of fields)p[key]=key==='yaw'?angle(a[key]??0,b[key]??0,t):lerp(a[key]??0,b[key]??0,t);return p;}
function frame(time,pose){return[time,...fields.map(key=>(Math.round((pose[key]??0)*10000)/10000)||0)];}
function fromFrame(row){return Object.fromEntries(fields.map((key,i)=>[key,row[i+1]]));}
function validBest(data,course){
 if(!data||data.course!==course.id||!Number.isFinite(data.duration)||data.duration<course.length/MAX_LEGAL_SPEED||data.duration>MAX_LAP_SECONDS||!Array.isArray(data.frames)||data.frames.length<2||data.frames.length>MAX_LAP_SECONDS*GHOST_HZ+3)return false;
 let previous=-1;
 for(const row of data.frames){if(!Array.isArray(row)||row.length!==9||!row.every(Number.isFinite)||row[0]<=previous||row[0]>data.duration+.001)return false;previous=row[0];}
 return data.frames[0][0]===0&&Math.abs(data.frames.at(-1)[0]-data.duration)<.001;
}
function saveRecords(state){
 const course=courseOf(state);
 if(!state.storage)return false;
 try{
  state.storage.setItem(course.storageKey,JSON.stringify({version:2,course:course.id,laps:state.records}));
  // Only retire the old single-best entry after the new table is safely saved.
  try{course.legacyStorageKey&&state.storage.removeItem?.(course.legacyStorageKey);}catch{}
  return true;
 }catch{return false;}
}
export function exportGhosts(state){
 return JSON.stringify({version:2,course:courseOf(state).id,laps:state.records});
}
export function importGhosts(state,text){
 const course=courseOf(state);
 if(typeof text!=='string'||text.length>MAX_GHOST_FILE_BYTES)throw Error('This ghost file is too large.');
 let data;try{data=JSON.parse(text);}catch{throw Error('Choose a valid LetsGo ghost JSON file.');}
 if(!data||data.course!==course.id)throw Error('This ghost file belongs to a different track.');
 const laps=data.version===2?data.laps:[data];
 if(!Array.isArray(laps)||!laps.length||laps.length>MAX_GHOSTS||!laps.every(lap=>validBest(lap,course)))throw Error('This ghost file is incomplete or damaged.');
 // Exact pose traces and times are retained; importing never resimulates an
 // older lap with the new physics or replaces a faster existing record.
 const signature=lap=>JSON.stringify([lap.duration,lap.frames]);
 const unique=new Map(state.records.map(lap=>[signature(lap),lap]));
 const incoming=[];
 for(const lap of laps){const key=signature(lap);if(!unique.has(key)){unique.set(key,lap);incoming.push(lap);}}
 const records=[...unique.values()].sort((a,b)=>a.duration-b.duration).slice(0,MAX_GHOSTS);
 const added=incoming.filter(lap=>records.includes(lap)).length;
 if(added){
  state.records=records;state.best=records[0];state.ghostBest=state.best;state.ghostRecords=records.slice();state.showGhost=true;
  state.persisted=saveRecords(state);
 }
 return{added,total:state.records.length,persisted:state.persisted};
}
export function createTimeTrial(storage=null,course=ORIGINAL_COURSE){
 let records=[],migrated=false;
 try{
  const raw=storage?.getItem(course.storageKey);
  if(raw&&raw.length<16000000){
   const data=JSON.parse(raw);
   if(data.version===2&&data.course===course.id&&Array.isArray(data.laps)&&data.laps.length<=MAX_GHOSTS)records=data.laps.filter(lap=>validBest(lap,course)).sort((a,b)=>a.duration-b.duration);
  }
 }catch{}
 if(!records.length&&course.legacyStorageKey)try{
  const raw=storage?.getItem(course.legacyStorageKey);
  if(raw&&raw.length<8000000){const legacy=JSON.parse(raw);if(validBest(legacy,course)){records=[legacy];migrated=true;}}
 }catch{}
 const state={course,storage,records,best:records[0]??null,status:'idle',elapsed:0,completed:0,lastLap:null,lastWasBest:false,lastRank:null,passed:0,progress:0,previousProgress:0,frames:[],nextSample:1/GHOST_HZ,ghostBest:records[0]??null,ghostRecords:records.slice(),showGhost:true,reason:'',persisted:!!records.length};
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
 const course=courseOf(state);
 if(state.frames.at(-1)[0]<duration-1e-8)state.frames.push(frame(duration,finish));else state.frames[state.frames.length-1]=frame(duration,finish);
 state.lastLap=duration;state.lastWasBest=!state.best||duration<state.best.duration;
 const entry={course:course.id,duration,frames:state.frames},ranked=[...state.records,entry].sort((a,b)=>a.duration-b.duration),rank=ranked.indexOf(entry);
 state.lastRank=rank<MAX_GHOSTS?rank+1:null;
 if(state.lastRank!==null){
  state.records=ranked.slice(0,MAX_GHOSTS);state.best=state.records[0];state.persisted=saveRecords(state);
 }
 state.completed++;state.ghostBest=state.best;state.ghostRecords=state.records.slice();state.frames=[frame(0,finish)];state.nextSample=1/GHOST_HZ;state.passed=0;
}
export function stepTimeTrial(state,previous,current,forward,dt){
 const course=courseOf(state);
 if(state.status==='ready'&&forward){state.status='running';state.frames=[frame(0,previous)];state.previousProgress=projectCourse(previous,course)?.progress??0;}
 if(state.status!=='running')return;
 const road=projectCourse(current,course),travel=Math.hypot(current.x-previous.x,current.z-previous.z);
 if(!road||road.distance>course.halfWidth+course.curbWidth+.7||road.height>.85||current.grounded===false||travel>MAX_LEGAL_SPEED*dt+.30){invalidateTimeTrial(state);return;}
 let delta=road.progress-state.previousProgress;
 if(delta>course.length/2)delta-=course.length;if(delta< -course.length/2)delta+=course.length;
 if(Math.abs(delta)>travel*2+2){invalidateTimeTrial(state,'Course skipped — restart lap');return;}
 state.progress+=delta;state.previousProgress=road.progress;
 const oldTime=state.elapsed,endTime=oldTime+dt;
 if(endTime>MAX_LAP_SECONDS){invalidateTimeTrial(state,'Attempt ended — restart lap');return;}
 const next=state.passed<CHECKPOINT_COUNT?state.passed+1:0,gate=course.gates[next],target=next===0?course.length:gate.distance;
 const hit=state.progress>=target-6&&state.progress<=target+6?crossing(gate,previous,current,course):null;
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
