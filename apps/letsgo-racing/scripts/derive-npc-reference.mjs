// Derive a compact, distance-indexed driving guide from an approved export.
// The source JSON stays outside the repository. This does not seed lap records.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {ORIGINAL_COURSE as course} from '../src/courses.js';
import {createTimeTrial,importGhosts} from '../src/time-trial.js';
import {projectRaceCourse} from '../src/race-course.js';
import {coursePoint} from '../src/npc/course-line.js';
import {NITRO_TOP_SPEED} from '../src/vehicle-controller.js';
const input=process.argv[2];
if(!input)throw Error('Pass the Original Circuit ghost JSON export as the first argument.');
const source=fs.readFileSync(input,'utf8'),trial=createTimeTrial(null,course);importGhosts(trial,source);
const count=Math.ceil(course.length/6),step=course.length/count,lines=[];
for(const lap of trial.records){
 let last=0,total=0;
 const trace=lap.frames.map((f,i,frames)=>{
  const position={x:f[1],y:f[2],z:f[3]},p=projectRaceCourse(position,course);if(!p||p.height>1||p.distance>14.8)throw Error('Reference leaves the current Original Circuit.');
  const delta=((p.progress-last+course.length*1.5)%course.length)-course.length*.5;
  if(delta<-.3)throw Error('Reference reverses on the course.');total+=delta;last=p.progress;
  const center=coursePoint(course,p.progress),offset=(position.x-center.x)*center.nx+(position.z-center.z)*center.nz;
  const a=frames[Math.max(0,i-1)],b=frames[Math.min(frames.length-1,i+1)],dt=b[0]-a[0];
  return{distance:total,offset:Math.max(-9.8,Math.min(9.8,offset)),speed:dt?Math.min(NITRO_TOP_SPEED,Math.hypot(b[1]-a[1],b[3]-a[3])/dt):0};
 });
 if(total<course.length-2)throw Error('Reference does not cover a complete lap.');
 let j=0;const samples=Array.from({length:count},(_,i)=>{
  const distance=i*step;while(j<trace.length-2&&trace[j+1].distance<distance)j++;
  const a=trace[j],b=trace[j+1],t=Math.max(0,Math.min(1,(distance-a.distance)/(b.distance-a.distance||1)));
  return{offset:a.offset+(b.offset-a.offset)*t,speed:a.speed+(b.speed-a.speed)*t};
 });
 lines.push(samples);
}
const blended=Array.from({length:count},(_,i)=>({offset:lines.reduce((v,line)=>v+line[i].offset,0)/lines.length,speed:lines.map(line=>line[i].speed).sort((a,b)=>a-b)[Math.floor((lines.length-1)/2)]}));
// Periodic smoothing removes input jitter and closes the reference's seam.
const smooth=blended.map((_,i)=>{
 let offset=0,speed=0,weight=0;for(let k=-5;k<=5;k++){const w=Math.exp(-.5*(k/2.2)**2),p=blended[(i+k+count)%count];offset+=p.offset*w;speed+=p.speed*w;weight+=w;}
 return[+(offset/weight).toFixed(4),+(speed/weight).toFixed(4)];
});
const reference={course:course.id,length:course.length,sourceSha256:createHash('sha256').update(source).digest('hex'),sourceLaps:lines.length,samples:smooth};
const output=process.argv[3]??fileURLToPath(new URL('../src/npc/original-reference.js',import.meta.url));
fs.writeFileSync(output,`// Derived racing line and pace; no personal lap table or time-indexed replay.\nexport const ORIGINAL_NPC_REFERENCE=${JSON.stringify(reference)};\n`);
console.log(JSON.stringify({output,samples:smooth.length,sourceLaps:lines.length,length:course.length}));
