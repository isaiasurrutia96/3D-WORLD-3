import test from 'node:test';
import assert from 'node:assert/strict';
import {windingTrack,windingSamples,WINDING_ENTRY,windingAccess} from '../src/winding-track.js';
import {WINDING_COURSE,COURSES} from '../src/courses.js';
import {worldPhysics} from '../src/world.js';
import {nearestLapEntrance} from '../src/lap-entrances.js';
import {createVehicleState,stepVehicle} from '../src/vehicle-controller.js';
import {createTimeTrial,armTimeTrial,stepTimeTrial,projectCourse,exportGhosts,importGhosts} from '../src/time-trial.js';

test('the fourth course is a shorter winding route with the existing road width',()=>{
 assert.equal(COURSES.length,4);assert.equal(COURSES[3],WINDING_COURSE);
 assert.ok(windingSamples.at(-1).distance>6000&&windingSamples.at(-1).distance<7000);
 assert.equal(windingTrack.halfWidth,13);assert.equal(windingTrack.curbWidth,1.1);
 assert.ok(Math.min(...windingSamples.map(s=>s.point.z))>800,'new road stays south of all other circuits');
});

test('one closed ribbon has continuous support across its full width and curved slopes',()=>{
 const segments=windingTrack.segments,first=segments[0],last=segments.at(-1),levels=[0,0,0];
 assert.ok(first.corners[0].distanceTo(last.corners[1])<1e-9&&first.corners[3].distanceTo(last.corners[2])<1e-9);
 const area=(a,b,c)=>(b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x);
 for(let i=0;i<segments.length;i++){
  const s=segments[i],[a,b,c,d]=s.corners,p=windingSamples[i].point,h=worldPhysics.supportHeight(p.x,p.z,p.y+.1);
  assert.ok(h!==null&&Math.abs(h-p.y)<.005,`unsupported center at ${i}`);
  assert.ok(area(a,b,c)*area(a,c,d)>0,`folded road at ${i}`);
  for(const corner of s.corners){const height=worldPhysics.supportHeight(corner.x,corner.z,corner.y+.1);assert.ok(height!==null&&Math.abs(height-corner.y)<.005,`unsupported edge at ${i}`);}
  assert.ok(Math.abs(s.b.y-s.a.y)/Math.hypot(s.b.x-s.a.x,s.b.z-s.a.z)<.15,'slopes remain continuous and drivable');
  [0,16,32].forEach((height,k)=>{if(Math.abs(p.y-height)<.001)levels[k]++;});
 }
 for(const count of levels)assert.ok(count>100,'all three elevations carry substantial road');
});

test('every overpass has clearance and height-aware checkpoint projection',()=>{
 const p=windingSamples,n=p.length-1;let crossings=0;
 for(let i=0;i<n;i++)for(let j=i+30;j<n;j++){
  if(i+n-j<30)continue;
  const a=p[i].point,b=p[i+1].point,c=p[j].point,d=p[j+1].point,rx=b.x-a.x,rz=b.z-a.z,sx=d.x-c.x,sz=d.z-c.z,den=rx*sz-rz*sx;
  if(Math.abs(den)<1e-9)continue;
  const qx=c.x-a.x,qz=c.z-a.z,t=(qx*sz-qz*sx)/den,u=(qx*rz-qz*rx)/den;
  if(t<=0||t>=1||u<=0||u>=1)continue;
  const x=a.x+t*rx,z=a.z+t*rz,y1=a.y+t*(b.y-a.y),y2=c.y+u*(d.y-c.y);crossings++;
  assert.ok(Math.abs(y1-y2)>15,'no at-grade junction or low overpass');
  const lower=projectCourse({x,z,y:y1},WINDING_COURSE),upper=projectCourse({x,z,y:y2},WINDING_COURSE);
  assert.ok(lower.height<.01&&upper.height<.01);assert.ok(Math.abs(lower.progress-upper.progress)>100);
 }
 assert.equal(crossings,7);
});

test('full road corridors stay clear at crossings and close parallel approaches',()=>{
 const p=windingSamples,n=p.length-1,skip=Math.ceil(65/(p.at(-1).distance/n));
 for(let i=0;i<n;i++)for(let j=i+skip;j<n;j++){
  if(i+n-j<skip)continue;
  const a=p[i].point,b=p[j].point,dx=a.x-b.x,dz=a.z-b.z;
  if(Math.abs(dx)>29||Math.abs(dz)>29||dx*dx+dz*dz>29*29)continue;
  assert.ok(Math.abs(a.y-b.y)>6,`road corridors too close at ${i},${j}`);
 }
});

test('south access joins the slab and race road with an open near rail and intact far rail',()=>{
 for(let z=228;z<=WINDING_ENTRY.z;z+=2)for(let x=-9;x<=9;x++)assert.equal(worldPhysics.supportHeight(x,z,.1),0,`bridge gap at ${x},${z}`);
 for(const lane of [-8,0,8]){
  let x=lane,z=220;
  for(let i=0;i<Math.ceil((WINDING_ENTRY.z-220+40)*2);i++){
   const next=worldPhysics.resolveHorizontal(x,z,x,z+.5,0,1.18,1.8);x=next.x;z=next.z;assert.equal(worldPhysics.supportHeight(x,z,.1),0);
  }
  assert.ok(z>WINDING_ENTRY.z,'near rail admits the kart');assert.ok(z<WINDING_ENTRY.z+18,'far rail prevents driving off');
 }
 assert.equal(nearestLapEntrance({...WINDING_COURSE.entrance,grounded:true},COURSES),WINDING_COURSE);
 assert.equal(windingAccess.maxZ,WINDING_ENTRY.z+2);
});

function sampledLap(state){
 const {course}=state,n=course.count,pose=index=>{const i=(index+n)%n,p=course.samples[i].point,q=course.samples[i+1].point;return{x:p.x,y:p.y,z:p.z,yaw:Math.atan2(q.x-p.x,q.z-p.z),grounded:true};};
 armTimeTrial(state);let previous=pose(course.startIndex);
 for(let i=1;i<=n+1;i++){const current=pose((course.startIndex+i)%n);stepTimeTrial(state,previous,current,true,.1);assert.equal(state.status,'running',state.reason);previous=current;}
 assert.equal(state.completed,1);
}
test('new lap records are isolated from the other tracks and both retired layouts',()=>{
 const data=new Map(),storage={getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)};
 const archives=['letsgo.three-level.top-laps.v1','letsgo.three-level.compact.top-laps.v1'];
 for(const key of archives)data.set(key,JSON.stringify({archive:key,laps:[]}));
 const others=COURSES.filter(course=>course!==WINDING_COURSE).map(course=>createTimeTrial(storage,course));
 for(const state of others)sampledLap(state);
 const snapshot=new Map(data),state=createTimeTrial(storage,WINDING_COURSE);sampledLap(state);
 for(const [key,value] of snapshot)assert.equal(data.get(key),value,`existing recordings changed: ${key}`);
 for(const other of others)assert.throws(()=>importGhosts(state,exportGhosts(other)),/different track/);
 assert.deepEqual(createTimeTrial(storage,WINDING_COURSE).records,state.records);
 assert.ok(!archives.includes(WINDING_COURSE.storageKey));
});

test('the actual kart completes a lap through every bend, overpass and checkpoint',()=>{
 const course=WINDING_COURSE,state=createTimeTrial(null,course),kart={...createVehicleState(),...course.start},dt=1/120;
 armTimeTrial(state);let index=1,middle=false,top=false;
 for(let frame=0;frame<120000&&state.completed===0;frame++){
  const point=course.samples[index%course.count].point;if(Math.hypot(point.x-kart.x,point.z-kart.z)<4)index++;
  const target=course.samples[(index+2)%course.count].point,desired=Math.atan2(target.x-kart.x,target.z-kart.z),error=Math.atan2(Math.sin(desired-kart.yaw),Math.cos(desired-kart.yaw)),previous={...kart};
  stepVehicle(kart,{throttle:kart.speed<11?1:0,steer:Math.max(-1,Math.min(1,-error*2)),brake:kart.speed>13},dt,worldPhysics);
  stepTimeTrial(state,previous,kart,frame===0,dt);
  if(Math.abs(kart.y-16)<.001)middle=true;if(Math.abs(kart.y-32)<.001)top=true;
  assert.equal(kart.grounded,true,`lost support at ${index}`);assert.equal(state.status,'running',`${state.reason}, gate ${state.passed}, index ${index}`);
 }
 assert.equal(state.completed,1);assert.ok(middle&&top);assert.ok(kart.y<.01);assert.equal(state.best.course,course.id);
});
