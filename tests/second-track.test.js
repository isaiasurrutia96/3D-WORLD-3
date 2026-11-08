import test from 'node:test';
import assert from 'node:assert/strict';
import {skylineTrack,skylineSamples,SKYLINE_ENTRY,skylineAccess} from '../src/skyline-track.js';
import {ORIGINAL_COURSE,SKYLINE_COURSE,COURSES} from '../src/courses.js';
import {nearestLapEntrance} from '../src/lap-entrances.js';
import {worldPhysics} from '../src/world.js';
import {createVehicleState,stepVehicle} from '../src/vehicle-controller.js';
import {createTimeTrial,armTimeTrial,stepTimeTrial,exportGhosts,importGhosts,projectCourse} from '../src/time-trial.js';
const DT=1/120;
function crossings(){
 const result=[],p=skylineSamples,n=p.length-1;
 for(let i=0;i<n;i++)for(let j=i+30;j<n;j++){
  if(i+n-j<30)continue;const a=p[i].point,b=p[i+1].point,c=p[j].point,d=p[j+1].point,rx=b.x-a.x,rz=b.z-a.z,sx=d.x-c.x,sz=d.z-c.z,den=rx*sz-rz*sx;if(Math.abs(den)<1e-9)continue;
  const qx=c.x-a.x,qz=c.z-a.z,t=(qx*sz-qz*sx)/den,u=(qx*rz-qz*rx)/den;if(t>0&&t<1&&u>0&&u<1)result.push({x:a.x+t*rx,z:a.z+t*rz,y1:a.y+t*(b.y-a.y),y2:c.y+u*(d.y-c.y)});
 }
 return result;
}
test('Skyline is one closed road ribbon with support across the full route',()=>{
 assert.ok(skylineSamples[0].point.distanceTo(skylineSamples.at(-1).point)<1e-9);
 const first=skylineTrack.segments[0],last=skylineTrack.segments.at(-1);assert.ok(first.corners[0].distanceTo(last.corners[1])<1e-8&&first.corners[3].distanceTo(last.corners[2])<1e-8);
 for(const {point:p}of skylineSamples){const height=worldPhysics.supportHeight(p.x,p.z,p.y+.1);assert.ok(height!==null&&Math.abs(height-p.y)<.003,`missing or mismatched support at ${p.toArray()}`);}
 assert.equal(skylineTrack.halfWidth,13);assert.equal(skylineTrack.curbWidth,1.1);
});
test('every Skyline crossover has room for the lower kart and distinct course progress',()=>{
 const sites=crossings();assert.ok(sites.length>=4);
 for(const p of sites){assert.ok(Math.abs(p.y1-p.y2)>7,'no at-grade accidental junction');const a=projectCourse({...p,y:p.y1},SKYLINE_COURSE),b=projectCourse({...p,y:p.y2},SKYLINE_COURSE);assert.ok(a.height<.02&&b.height<.02);assert.ok(Math.abs(a.progress-b.progress)>50);}
});
test('the west bridge connects the slab to an open rail entrance without a floor gap',()=>{
 for(let x=skylineAccess.minX;x<=-120;x+=1)for(let z=-9;z<=9;z+=1)assert.equal(worldPhysics.supportHeight(x,z,.2),0);
 let x=-120,z=0;for(let i=0;i<500;i++){const p=worldPhysics.resolveHorizontal(x,z,x-.5,z,0,1.18,1.8);x=p.x;z=p.z;assert.equal(worldPhysics.supportHeight(x,z,.2),0);}
 assert.ok(x<SKYLINE_ENTRY.x+2,'kart can enter the road from the slab');assert.ok(x>SKYLINE_ENTRY.x-14,'opposite rail still blocks driving off');
});
test('entrance prompts choose the nearby course and ignore overhead or airborne players',()=>{
 for(const course of COURSES){const p={...course.entrance,grounded:true};assert.equal(nearestLapEntrance(p,COURSES),course);assert.equal(nearestLapEntrance({...p,y:10},COURSES),null);assert.equal(nearestLapEntrance({...p,grounded:false},COURSES),null);}
 assert.equal(nearestLapEntrance({x:0,y:0,z:-70},COURSES),null);
});
const memory=()=>{const data=new Map();return{getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)};};
function sampledLap(state){
 const course=state.course,n=course.count,pose=index=>{const i=((index%n)+n)%n,p=course.samples[i].point,q=course.samples[i+1].point;return{x:p.x,y:p.y,z:p.z,yaw:Math.atan2(q.x-p.x,q.z-p.z),grounded:true};};
 armTimeTrial(state);let previous=pose(course.startIndex);for(let i=1;i<=n+1;i++){const current=pose(course.startIndex+i);stepTimeTrial(state,previous,current,true,.1);assert.equal(state.status,'running',state.reason);previous=current;}assert.equal(state.completed,1);
}
test('each track saves and imports its own laps without replacing original records',()=>{
 const storage=memory(),old=createTimeTrial(storage,ORIGINAL_COURSE);sampledLap(old);const oldFile=exportGhosts(old),oldStored=storage.getItem(ORIGINAL_COURSE.storageKey);
 const second=createTimeTrial(storage,SKYLINE_COURSE);assert.equal(second.records.length,0);sampledLap(second);assert.equal(second.best.course,SKYLINE_COURSE.id);assert.equal(storage.getItem(ORIGINAL_COURSE.storageKey),oldStored);
 assert.deepEqual(createTimeTrial(storage,ORIGINAL_COURSE).records,old.records);assert.deepEqual(createTimeTrial(storage,SKYLINE_COURSE).records,second.records);assert.throws(()=>importGhosts(second,oldFile),/different track/);
 const copy=createTimeTrial(null,SKYLINE_COURSE);importGhosts(copy,exportGhosts(second));assert.deepEqual(copy.records,second.records);
});
test('real kart physics drives a complete Skyline lap through every ramp and checkpoint',()=>{
 const course=SKYLINE_COURSE,state=createTimeTrial(null,course),kart={...createVehicleState(),...course.start};armTimeTrial(state);let index=course.startIndex+1,peak=0;
 for(let frame=0;frame<140000&&state.completed===0;frame++){
  const point=course.samples[index%course.count].point;if(Math.hypot(point.x-kart.x,point.z-kart.z)<4)index++;
  const target=course.samples[(index+2)%course.count].point,desired=Math.atan2(target.x-kart.x,target.z-kart.z),error=Math.atan2(Math.sin(desired-kart.yaw),Math.cos(desired-kart.yaw)),previous={...kart};
  stepVehicle(kart,{throttle:kart.speed<11?1:0,steer:Math.max(-1,Math.min(1,-error*2)),brake:kart.speed>13},DT,worldPhysics);stepTimeTrial(state,previous,kart,frame===0,DT);peak=Math.max(peak,kart.y);
  assert.equal(kart.grounded,true,`lost road at ${index}`);assert.equal(state.status,'running',`${state.reason}, gate ${state.passed}, index ${index}`);
 }
 assert.equal(state.completed,1);assert.ok(peak>27);assert.ok(state.best.frames.length>1000);
});
