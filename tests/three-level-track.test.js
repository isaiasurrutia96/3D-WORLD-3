import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {threeLevelTrack,threeLevelSamples,threeLevelSections as threeLevelDecks,THREE_LEVEL_ENTRY,threeLevelAccess} from '../src/three-level-track.js';
import {THREE_LEVEL_COURSE,COURSES} from '../src/courses.js';
import {worldPhysics} from '../src/world.js';
import {nearestLapEntrance} from '../src/lap-entrances.js';
import {createVehicleState,stepVehicle} from '../src/vehicle-controller.js';
import {createTimeTrial,armTimeTrial,stepTimeTrial,projectCourse,exportGhosts,importGhosts} from '../src/time-trial.js';

test('all three decks retain their source outlines with a separate entrance and exit',()=>{
 const names=['spa','zandvoort','interlagos'],scales=[1,1.25,1.15],heights=[0,32,64];
 let centerX,centerZ;
 for(let k=0;k<3;k++){
  const svg=readFileSync(new URL(`../docs/references/${names[k]}.svg`,import.meta.url),'utf8'),points=svg.match(/<polyline points="([^"]+)"/)[1].trim().split(/\s+/).map(pair=>pair.split(',').map(Number));
  const center=[0,1].map(axis=>(Math.min(...points.map(p=>p[axis]))+Math.max(...points.map(p=>p[axis])))/2),north=points.reduce((best,p)=>p[1]<best[1]?p:best);
  if(k===0){centerX=center[0]-north[0];centerZ=THREE_LEVEL_ENTRY.z+center[1]-north[1];}
  const deck=threeLevelDecks[k],distances=[0];for(let i=1;i<points.length;i++)distances.push(distances.at(-1)+Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]));
  assert.equal(deck.name,names[k]);assert.equal(deck.height,heights[k]);assert.ok(deck.points[0].distanceTo(deck.points.at(-1))>200,'each ring has an open cut for its two connectors');
  for(let i=0;i<points.length;i+=40){
   if(distances[i]<130||distances[i]>distances.at(-1)-130)continue;
   const x=(points[i][0]-center[0])*scales[k]+centerX+(k===2?100:0),z=(points[i][1]-center[1])*scales[k]+centerZ-(k===2?40:0);let nearest=Infinity;
   for(let j=0;j<deck.points.length-1;j++){const a=deck.points[j],b=deck.points[j+1],dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz)));nearest=Math.min(nearest,Math.hypot(x-a.x-dx*t,z-a.z-dz*t));}
   assert.ok(nearest<2,`${names[k]} deviates ${nearest} m from its source`);
  }
 }
});

test('one closed ribbon carries all three levels with supported and unfolded road edges',()=>{
 const segments=threeLevelTrack.segments,first=segments[0],last=segments.at(-1),planeCounts=[0,0,0];
 assert.ok(first.corners[0].distanceTo(last.corners[1])<1e-9&&first.corners[3].distanceTo(last.corners[2])<1e-9);
 assert.equal(threeLevelTrack.halfWidth,13);assert.equal(threeLevelTrack.curbWidth,1.1);
 const area=(a,b,c)=>(b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x);
 for(let i=0;i<segments.length;i++){
  const s=segments[i],[a,b,c,d]=s.corners,p=threeLevelSamples[i].point,h=worldPhysics.supportHeight(p.x,p.z,p.y+.1);
  assert.ok(h!==null&&Math.abs(h-p.y)<.005,`unsupported center at ${i}`);assert.ok(area(a,b,c)*area(a,c,d)>0,`folded edge at ${i}`);
  for(const corner of s.corners)assert.ok(worldPhysics.supportHeight(corner.x,corner.z,corner.y+.1)!==null);
  assert.ok(Math.abs(s.b.y-s.a.y)/Math.hypot(s.b.x-s.a.x,s.b.z-s.a.z)<.1,'connectors remain gentle');
  [0,32,64].forEach((height,k)=>{if(Math.abs(p.y-height)<.001)planeCounts[k]++;});
 }
 for(const count of planeCounts)assert.ok(count>500,'substantial road on every deck');
 assert.ok(Math.min(...threeLevelSamples.map(s=>s.point.z))>800,'fourth circuit stays south of the existing tracks');
});

test('projected crossings have physical clearance and distinct course progress',()=>{
 const p=threeLevelSamples,n=p.length-1;let count=0;
 for(let i=0;i<n;i++)for(let j=i+30;j<n;j++){
  if(i+n-j<30)continue;const a=p[i].point,b=p[i+1].point,c=p[j].point,d=p[j+1].point,rx=b.x-a.x,rz=b.z-a.z,sx=d.x-c.x,sz=d.z-c.z,den=rx*sz-rz*sx;if(Math.abs(den)<1e-9)continue;
  const qx=c.x-a.x,qz=c.z-a.z,t=(qx*sz-qz*sx)/den,u=(qx*rz-qz*rx)/den;if(t<=0||t>=1||u<=0||u>=1)continue;
  const x=a.x+t*rx,z=a.z+t*rz,y1=a.y+t*(b.y-a.y),y2=c.y+u*(d.y-c.y);count++;
  assert.ok(Math.abs(y1-y2)>8,'no road-level crossing or junction');
  const lower=projectCourse({x,z,y:y1},THREE_LEVEL_COURSE),upper=projectCourse({x,z,y:y2},THREE_LEVEL_COURSE);assert.ok(lower.height<.01&&upper.height<.01);assert.ok(Math.abs(lower.progress-upper.progress)>100);
 }
 assert.ok(count>10,'stacked routes really overlap in plan');
});

test('full road widths stay vertically clear at crossings and close approaches',()=>{
 const p=threeLevelSamples,n=p.length-1;
 for(let i=0;i<n;i++)for(let j=i+17;j<n;j++){
  if(i+n-j<17)continue;const a=p[i].point,b=p[j].point,dx=a.x-b.x,dz=a.z-b.z;
  if(Math.abs(dx)>29||Math.abs(dz)>29||dx*dx+dz*dz>29*29)continue;
  assert.ok(Math.abs(a.y-b.y)>6,`roads too close at ${i},${j}`);
 }
});

test('south bridge joins the slab and Spa without a gap or rail across the entry',()=>{
 for(let z=228;z<=THREE_LEVEL_ENTRY.z;z+=2)for(let x=-9;x<=9;x++)assert.equal(worldPhysics.supportHeight(x,z,.1),0,`bridge gap at ${x},${z}`);
 let x=0,z=220;for(let i=0;i<Math.ceil((THREE_LEVEL_ENTRY.z-220+35)*2);i++){const next=worldPhysics.resolveHorizontal(x,z,x,z+.5,0,1.18,1.8);x=next.x;z=next.z;assert.equal(worldPhysics.supportHeight(x,z,.1),0);}
 assert.ok(z>THREE_LEVEL_ENTRY.z,'can reach the lower race road');assert.ok(z<THREE_LEVEL_ENTRY.z+15,'far rail still blocks driving off');
 assert.equal(nearestLapEntrance({...THREE_LEVEL_COURSE.entrance,grounded:true},COURSES),THREE_LEVEL_COURSE);
 assert.equal(threeLevelAccess.maxZ,THREE_LEVEL_ENTRY.z+2);
});

function sampledLap(state){
 const {course}=state,n=course.count,pose=index=>{const i=(index+n)%n,p=course.samples[i].point,q=course.samples[i+1].point;return{x:p.x,y:p.y,z:p.z,yaw:Math.atan2(q.x-p.x,q.z-p.z),grounded:true};};
 armTimeTrial(state);let previous=pose(course.startIndex);
 for(let i=1;i<=n+1;i++){const current=pose((course.startIndex+i)%n);stepTimeTrial(state,previous,current,true,.1);assert.equal(state.status,'running',state.reason);previous=current;}
 assert.equal(state.completed,1);
}
test('combined-lap ghosts stay separate from all three existing courses',()=>{
 const data=new Map(),storage={getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)};
 const others=COURSES.filter(course=>course!==THREE_LEVEL_COURSE).map(course=>createTimeTrial(storage,course));for(const state of others)sampledLap(state);
 const snapshot=new Map(data),state=createTimeTrial(storage,THREE_LEVEL_COURSE);sampledLap(state);
 for(const other of others){assert.equal(data.get(other.course.storageKey),snapshot.get(other.course.storageKey));assert.throws(()=>importGhosts(state,exportGhosts(other)),/different track/);}
 assert.deepEqual(createTimeTrial(storage,THREE_LEVEL_COURSE).records,state.records);
});

test('real kart physics completes one lap through Spa, Zandvoort, Interlagos and the descent',()=>{
 const course=THREE_LEVEL_COURSE,state=createTimeTrial(null,course),kart={...createVehicleState(),...course.start},dt=1/120;armTimeTrial(state);let index=1,peak=0,middle=false,top=false;
 for(let frame=0;frame<230000&&state.completed===0;frame++){
  const point=course.samples[index%course.count].point;if(Math.hypot(point.x-kart.x,point.z-kart.z)<5)index++;
  const target=course.samples[(index+2)%course.count].point,desired=Math.atan2(target.x-kart.x,target.z-kart.z),error=Math.atan2(Math.sin(desired-kart.yaw),Math.cos(desired-kart.yaw)),previous={...kart};
  stepVehicle(kart,{throttle:kart.speed<21?1:0,steer:Math.max(-1,Math.min(1,-error*2)),brake:kart.speed>23},dt,worldPhysics);stepTimeTrial(state,previous,kart,frame===0,dt);peak=Math.max(peak,kart.y);
  if(Math.abs(kart.y-32)<.001)middle=true;if(Math.abs(kart.y-64)<.001)top=true;
  assert.equal(kart.grounded,true,`lost support at ${index}`);assert.equal(state.status,'running',`${state.reason}, gate ${state.passed}, index ${index}`);
 }
 assert.equal(state.completed,1);assert.ok(middle&&top&&peak>63.9);assert.ok(kart.y<.01);assert.equal(state.best.course,course.id);
});
