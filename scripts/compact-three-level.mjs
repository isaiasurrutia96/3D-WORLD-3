import * as THREE from 'three';
import {writeFileSync} from 'node:fs';
import {longThreeLevelPlan,longThreeLevelSections as threeLevelSections} from './three-level-reference.mjs';
const baseline=new THREE.CatmullRomCurve3(longThreeLevelPlan,true,'centripetal');baseline.arcLengthDivisions=57600;
const originalLength=baseline.getLength();
const original=Array.from({length:7201},(_,i)=>{const point=baseline.getPointAt(i/7200);point.y=Math.max(0,point.y);return {point,distance:i/7200*originalLength};});
const old=original.slice(0,-1).map(s=>s.point),n=old.length,scale=.55;
// Shorten each segment while retaining enough arc length at tight bends to
// keep the existing road width. Spread the small closure error around the lap.
const radius=(a,b,c)=>{const ab=Math.hypot(b.x-a.x,b.z-a.z),bc=Math.hypot(c.x-b.x,c.z-b.z),ca=Math.hypot(c.x-a.x,c.z-a.z),area=Math.abs((b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x));return ab*bc*ca/(2*area);};
const radii=old.map((p,i)=>radius(old[(i+n-1)%n],p,old[(i+1)%n]));
const p=[old[0].clone().multiply(new THREE.Vector3(scale,1,scale))];
for(let i=0;i<n;i++){const a=old[i],b=old[(i+1)%n],weight=Math.max(scale,Math.min(1,18.5/Math.min(radii[i],radii[(i+1)%n])));p.push(new THREE.Vector3(p.at(-1).x+(b.x-a.x)*weight,b.y,p.at(-1).z+(b.z-a.z)*weight));}
const drift=p[n].clone().sub(p[0]);p.forEach((q,i)=>{q.x-=drift.x*i/n;q.z-=drift.z*i/n;});p.pop();
// Separate only nearby road corridors that cannot safely pass above one
// another. Smooth the offsets over 25 m so the recognizable turns stay smooth.
const step=original.at(-1).distance*scale/n,skip=Math.ceil(65/step),sigma=25/step,range=Math.ceil(sigma*3),kernel=Array.from({length:range*2+1},(_,i)=>Math.exp(-.5*((i-range)/sigma)**2)),weightSum=kernel.reduce((a,b)=>a+b);
for(let pass=0;pass<24;pass++){
 const cells=new Map(),fx=new Float64Array(n),fz=new Float64Array(n),penetrations=new Float64Array(n);
 for(let i=0;i<n;i++){const key=`${Math.floor(p[i].x/36)},${Math.floor(p[i].z/36)}`;if(!cells.has(key))cells.set(key,[]);cells.get(key).push(i);}
 let minDistance=Infinity,pairs=0;
 for(let i=0;i<n;i++){
  const a=p[i],cx=Math.floor(a.x/36),cz=Math.floor(a.z/36);
  for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++)for(const j of cells.get(`${cx+dx},${cz+dz}`)??[]){
   if(j<=i||j-i<skip||n-j+i<skip||Math.abs(a.y-p[j].y)>6.5)continue;
   const x=a.x-p[j].x,z=a.z-p[j].z,distance=Math.hypot(x,z);if(distance>=34)continue;minDistance=Math.min(minDistance,distance);pairs++;
   const depth=(34-distance)/2;if(depth>penetrations[i]){penetrations[i]=depth;fx[i]=x/distance*depth;fz[i]=z/distance*depth;}if(depth>penetrations[j]){penetrations[j]=depth;fx[j]=-x/distance*depth;fz[j]=-z/distance*depth;}
  }
 }
 for(let i=0;i<n;i++){let x=0,z=0;for(let d=-range;d<=range;d++){const j=(i+d+n)%n,w=kernel[d+range];x+=fx[j]*w;z+=fz[j]*w;}p[i].x+=x/weightSum*.8;p[i].z+=z/weightSum*.8;}
 if(pass%6===0)console.log({pass,minDistance,pairs});
}
let minRadius=Infinity,length=0,unsafe=[],minVertical=Infinity;
for(let i=0;i<n;i++){minRadius=Math.min(minRadius,radius(p[(i+n-1)%n],p[i],p[(i+1)%n]));length+=p[i].distanceTo(p[(i+1)%n]);for(let j=i+skip;j<n;j++){if(n-j+i<skip)continue;const a=p[i],b=p[j],x=a.x-b.x,z=a.z-b.z;if(x*x+z*z>29*29)continue;minVertical=Math.min(minVertical,Math.abs(a.y-b.y));if(Math.abs(a.y-b.y)<6&&unsafe.length<8)unsafe.push({i,j,d:Math.hypot(x,z),dy:Math.abs(a.y-b.y)});}}
const nearest=q=>old.reduce((best,p,i)=>p.distanceToSquared(q)<old[best].distanceToSquared(q)?i:best,0),sections=threeLevelSections.map(s=>({name:s.name,height:s.height,first:nearest(s.points[0]),last:nearest(s.points.at(-1))}));
if(unsafe.length||!Number.isFinite(minRadius)||minRadius<15)throw Error('Compaction failed the road-width or bend-clearance checks.');
const first=sections[0].first,last=sections[0].last;let entry=first;for(let i=first;i<=last;i++)if(p[i].z<p[entry].z)entry=i;
const shiftX=-p[entry].x,shiftZ=850-Math.min(...p.map(q=>q.z));for(const q of p){q.x+=shiftX;q.z+=shiftZ;}
writeFileSync(new URL('../src/data/three-level-compact.js',import.meta.url), '// Generated offline by scripts/compact-three-level.mjs; keep the road width independent of the centerline.\nexport const THREE_LEVEL_COMPACT='+JSON.stringify({scale,originalLength,length,entry:p[entry].toArray(),sections,points:p.map(q=>q.toArray().map(v=>Number(v.toFixed(6))))})+';\n');
console.log(JSON.stringify({length,minRadius,minVertical,unsafe,entry:p[entry].toArray(),sections},null,2));
