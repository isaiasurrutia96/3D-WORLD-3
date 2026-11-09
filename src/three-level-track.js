import * as THREE from 'three';
import {THREE_LEVEL_LAYOUT} from './data/three-level-layout.js';
import {buildTrackData,createTrackRibbon} from './track-builder.js';

const CUT=120,STEP=8;
const smooth=t=>t*t*(3-2*t);
const source=THREE_LEVEL_LAYOUT[0],centerX=source.center[0]-source.north[0];

function makeLevel(layout,height,scale=1,dx=0,dz=0){
 const points=layout.points.map(([x,z])=>new THREE.Vector3((x-layout.center[0])*scale+dx,height,(z-layout.center[1])*scale+dz));
 const curve=new THREE.CatmullRomCurve3(points,true,'centripetal');curve.arcLengthDivisions=18000;
 const length=curve.getLength(),start=curve.getPointAt(CUT/length),end=curve.getPointAt(1-CUT/length),forwardStart=curve.getTangentAt(CUT/length).normalize(),forwardEnd=curve.getTangentAt(1-CUT/length).normalize();
 let area=0;for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length];area+=a.x*b.z-b.x*a.z;}
 const outward=f=>new THREE.Vector3(-f.z,0,f.x).multiplyScalar(-Math.sign(area));
 const road=[];for(let distance=CUT;distance<length-CUT-4;distance+=STEP)road.push(curve.getPointAt(distance/length));road.push(end);
 return{name:layout.name,height,curve,length,start,end,forwardStart,forwardEnd,outwardStart:outward(forwardStart),outwardEnd:outward(forwardEnd),road};
}

const levels=[makeLevel(THREE_LEVEL_LAYOUT[0],0),makeLevel(THREE_LEVEL_LAYOUT[1],32,1.25),makeLevel(THREE_LEVEL_LAYOUT[2],64,1.15,100,-40)];

function sampled(curve){const count=Math.ceil(curve.getLength()/STEP);return Array.from({length:count+1},(_,i)=>curve.getPointAt(i/count));}
function connect(from,to,waypoints){
 const a=from.end.clone().addScaledVector(from.forwardEnd,50).addScaledVector(from.outwardEnd,180);
 const b=to.start.clone().addScaledVector(to.forwardStart,-50).addScaledVector(to.outwardStart,180);
 const lead=new THREE.CubicBezierCurve3(from.end,from.end.clone().addScaledVector(from.forwardEnd,90),a.clone().addScaledVector(from.outwardEnd,-70),a);
 const tail=new THREE.CubicBezierCurve3(b,b.clone().addScaledVector(to.outwardStart,-70),to.start.clone().addScaledVector(to.forwardStart,-90),to.start);
 const middle=new THREE.CatmullRomCurve3([a.clone().setY(0),a.clone().addScaledVector(from.outwardEnd,180).setY(0),...waypoints.map(([x,z])=>new THREE.Vector3(x,0,z)),b.clone().addScaledVector(to.outwardStart,180).setY(0),b.clone().setY(0)],false,'centripetal');middle.arcLengthDivisions=4000;
 const mid=sampled(middle);mid.forEach((p,i)=>{const t=i/(mid.length-1),rise=.5*smooth(Math.min(1,t/.2))+.5*smooth(Math.max(0,(t-.9)/.1));p.y=from.height+(to.height-from.height)*rise;});
 return[...sampled(lead).slice(1,-1),...mid,...sampled(tail).slice(1,-1)];
}

const connectors=[
 connect(levels[0],levels[1],[[-100,1000],[1100,1000],[1200,300]]),
 connect(levels[1],levels[2],[[1250,150],[1250,-900],[-900,-900]]),
 connect(levels[2],levels[0],[[-1400,-900],[-1700,0],[-1500,900],[-100,1200]]),
];
const plan=levels.flatMap((level,i)=>[...level.road,...connectors[i]]);
// Keep the entire fourth circuit south of the existing three circuits.
const shiftZ=850-Math.min(...plan.map(p=>p.z));
const toWorld=p=>new THREE.Vector3(p.x+centerX,p.y,p.z+shiftZ);
export const THREE_LEVEL_ENTRY=toWorld(new THREE.Vector3(source.north[0]-source.center[0],0,source.north[1]-source.center[1]));
export const threeLevelAccess={axis:'z',minX:-10,maxX:10,minZ:228,maxZ:THREE_LEVEL_ENTRY.z+2,height:0,railStartZ:228,railEndZ:THREE_LEVEL_ENTRY.z-14.25};
export const threeLevelTrack=buildTrackData({
 name:'Three-level floating circuit',points:plan.map(toWorld),count:7200,arcLengthDivisions:57600,access:threeLevelAccess,
 opening:p=>p.y<.05&&p.z<THREE_LEVEL_ENTRY.z-6&&p.z>THREE_LEVEL_ENTRY.z-15&&Math.abs(p.x)<10,
});
export const threeLevelSamples=threeLevelTrack.samples;
export const threeLevelSections=levels.map((level,i)=>({name:level.name,height:level.height,points:level.road.map(toWorld),connector:connectors[i].map(toWorld)}));
export const createThreeLevelTrack=()=>createTrackRibbon(threeLevelTrack);
