import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {suzukaTrack,suzukaSamples,SUZUKA_ENTRY,suzukaAccess} from '../src/suzuka-track.js';
import {SUZUKA_COURSE,COURSES} from '../src/courses.js';
import {worldPhysics} from '../src/world.js';
import {createVehicleState,stepVehicle} from '../src/vehicle-controller.js';
import {createTimeTrial,armTimeTrial,stepTimeTrial,projectCourse,exportGhosts,importGhosts} from '../src/time-trial.js';

function crossovers(){
 const result=[],p=suzukaSamples,n=p.length-1;
 for(let i=0;i<n;i++)for(let j=i+30;j<n;j++){
  if(i+n-j<30)continue;const a=p[i].point,b=p[i+1].point,c=p[j].point,d=p[j+1].point,rx=b.x-a.x,rz=b.z-a.z,sx=d.x-c.x,sz=d.z-c.z,den=rx*sz-rz*sx;if(Math.abs(den)<1e-9)continue;
  const qx=c.x-a.x,qz=c.z-a.z,t=(qx*sz-qz*sx)/den,u=(qx*rz-qz*rx)/den;
  if(t>0&&t<1&&u>0&&u<1)result.push({x:a.x+t*rx,z:a.z+t*rz,lower:a.y+t*(b.y-a.y),upper:c.y+u*(d.y-c.y)});
 }
 return result;
}

test('Suzuka follows the reference map rather than reusing either existing route',()=>{
 const svg=readFileSync(new URL('../docs/references/suzuka.svg',import.meta.url),'utf8');
 const source=svg.match(/<polyline points="([^"]+)"/)[1].trim().split(/\s+/).map(pair=>pair.split(',').map(Number));
 const entry=source.reduce((best,p)=>p[1]>best[1]?p:best);
 for(let i=0;i<source.length;i+=16){
  const x=source[i][0]-entry[0],z=source[i][1]-entry[1]+SUZUKA_ENTRY.z;
  let nearest=Infinity;
  for(const s of suzukaTrack.segments){const dx=s.b.x-s.a.x,dz=s.b.z-s.a.z,t=Math.max(0,Math.min(1,((x-s.a.x)*dx+(z-s.a.z)*dz)/(dx*dx+dz*dz)));nearest=Math.min(nearest,Math.hypot(x-s.a.x-dx*t,z-s.a.z-dz*t));}
  assert.ok(nearest<1.2,`route deviates from reference by ${nearest} m`);
 }
 assert.ok(Math.abs(suzukaSamples.at(-1).distance-5757.05)<3);
 assert.ok(Math.max(...suzukaSamples.map(s=>s.point.z))< -440,'third circuit stays beyond the north side');
});

test('Suzuka closes cleanly with matching road support, width and non-folded edges',()=>{
 const first=suzukaTrack.segments[0],last=suzukaTrack.segments.at(-1);
 assert.ok(first.corners[0].distanceTo(last.corners[1])<1e-9&&first.corners[3].distanceTo(last.corners[2])<1e-9);
 assert.equal(suzukaTrack.halfWidth,13);assert.equal(suzukaTrack.curbWidth,1.1);
 const area=(a,b,c)=>(b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x);
 for(let i=0;i<suzukaTrack.segments.length;i++){
  const segment=suzukaTrack.segments[i],[a,b,c,d]=segment.corners,p=suzukaSamples[i].point;
  assert.ok(area(a,b,c)*area(a,c,d)>0,`folded ribbon at ${i}`);
  assert.ok(Math.abs(worldPhysics.supportHeight(p.x,p.z,p.y+.1)-p.y)<.003);
  for(const corner of segment.corners)assert.ok(worldPhysics.supportHeight(corner.x,corner.z,corner.y+.1)!==null);
  assert.ok(Math.abs(segment.b.y-segment.a.y)/Math.hypot(segment.b.x-segment.a.x,segment.b.z-segment.a.z)<.08,'no steep jump ramp added');
 }
});

test('the single figure-eight crossing separates the back straight and lower road',()=>{
 const sites=crossovers();assert.equal(sites.length,1);const p=sites[0];
 assert.equal(p.lower,0);assert.equal(p.upper,12);
 assert.ok(Math.abs(worldPhysics.supportHeight(p.x,p.z,.1))<.001);
 assert.ok(Math.abs(worldPhysics.supportHeight(p.x,p.z,12.1)-12)<.001);
 const lower=projectCourse({...p,y:p.lower},SUZUKA_COURSE),upper=projectCourse({...p,y:p.upper},SUZUKA_COURSE);
 assert.ok(lower.height<.001&&upper.height<.001);assert.ok(Math.abs(lower.progress-upper.progress)>1000);
});

test('the north entrance bridge has continuous support and an open junction',()=>{
 for(let z=suzukaAccess.minZ;z<=-225;z++)for(let x=-9;x<=9;x++)assert.equal(worldPhysics.supportHeight(x,z,.1),0,`gap at ${x},${z}`);
 let x=0,z=-220;
 for(let i=0;i<500;i++){const next=worldPhysics.resolveHorizontal(x,z,x,z-.5,0,1.18,1.8);x=next.x;z=next.z;assert.equal(worldPhysics.supportHeight(x,z,.1),0);}
 assert.ok(z<SUZUKA_ENTRY.z,'can drive from slab onto track');assert.ok(z>SUZUKA_ENTRY.z-14,'opposite rail remains intact');
});

function sampledLap(state){
 const {course}=state,n=course.count,pose=index=>{const i=(index+n)%n,p=course.samples[i].point,q=course.samples[i+1].point;return{x:p.x,y:p.y,z:p.z,yaw:Math.atan2(q.x-p.x,q.z-p.z),grounded:true};};
 armTimeTrial(state);let previous=pose(course.startIndex);
 for(let i=1;i<=n+1;i++){const current=pose((course.startIndex+i)%n);stepTimeTrial(state,previous,current,true,.1);assert.equal(state.status,'running',state.reason);previous=current;}
 assert.equal(state.completed,1);
}
test('Suzuka lap records cannot replace or import either existing track’s ghosts',()=>{
 const data=new Map(),storage={getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)};
 const others=COURSES.filter(course=>course!==SUZUKA_COURSE).map(course=>createTimeTrial(storage,course));for(const state of others)sampledLap(state);
 const snapshot=new Map(data),state=createTimeTrial(storage,SUZUKA_COURSE);sampledLap(state);
 for(const other of others){assert.equal(data.get(other.course.storageKey),snapshot.get(other.course.storageKey));assert.throws(()=>importGhosts(state,exportGhosts(other)),/different track/);}
 assert.deepEqual(createTimeTrial(storage,SUZUKA_COURSE).records,state.records);
});

test('real kart physics completes all Suzuka checkpoints and the overpass without leaving the road',()=>{
 const course=SUZUKA_COURSE,state=createTimeTrial(null,course),kart={...createVehicleState(),...course.start},dt=1/120;armTimeTrial(state);let index=course.startIndex+1,peak=0;
 for(let frame=0;frame<140000&&state.completed===0;frame++){
  const point=course.samples[index%course.count].point;if(Math.hypot(point.x-kart.x,point.z-kart.z)<4)index++;
  const target=course.samples[(index+2)%course.count].point,desired=Math.atan2(target.x-kart.x,target.z-kart.z),error=Math.atan2(Math.sin(desired-kart.yaw),Math.cos(desired-kart.yaw)),previous={...kart};
  stepVehicle(kart,{throttle:kart.speed<11?1:0,steer:Math.max(-1,Math.min(1,-error*2)),brake:kart.speed>13},dt,worldPhysics);stepTimeTrial(state,previous,kart,frame===0,dt);peak=Math.max(peak,kart.y);
  assert.equal(kart.grounded,true,`lost support at ${index}`);assert.equal(state.status,'running',`${state.reason}, gate ${state.passed}, index ${index}`);
 }
 assert.equal(state.completed,1);assert.ok(peak>11.9);assert.equal(state.best.course,course.id);
});
