import * as THREE from 'three';
import {createKartFrame,KART_POSITION} from './kart.js';
import {createTrack,trackSegments,railSegments,access,TRACK_HALF_WIDTH,CURB_WIDTH} from './track.js';
export const FLOOR_WIDTH=260,FLOOR_LENGTH=460;
export const SPAWN={x:120,y:0,z:-150,yaw:Math.PI/2};
const CELL=24;
function spatialIndex(segments,padding){
 const cells=new Map();
 for(const segment of segments){
  const minX=Math.floor((Math.min(segment.a.x,segment.b.x)-padding)/CELL),maxX=Math.floor((Math.max(segment.a.x,segment.b.x)+padding)/CELL);
  const minZ=Math.floor((Math.min(segment.a.z,segment.b.z)-padding)/CELL),maxZ=Math.floor((Math.max(segment.a.z,segment.b.z)+padding)/CELL);
  for(let x=minX;x<=maxX;x++)for(let z=minZ;z<=maxZ;z++){const key=`${x},${z}`;if(!cells.has(key))cells.set(key,[]);cells.get(key).push(segment);}
 }
 return (x,z)=>cells.get(`${Math.floor(x/CELL)},${Math.floor(z/CELL)}`)??[];
}
const nearbyRoad=spatialIndex(trackSegments,TRACK_HALF_WIDTH+CURB_WIDTH+1),nearbyRails=spatialIndex(railSegments,1);
function projection(segment,x,z){
 const dx=segment.b.x-segment.a.x,dz=segment.b.z-segment.a.z;
 const rawT=((x-segment.a.x)*dx+(z-segment.a.z)*dz)/(dx*dx+dz*dz);
 const t=Math.max(0,Math.min(1,rawT));
 const px=segment.a.x+dx*t,pz=segment.a.z+dz*t;
 return {rawT,x:px,z:pz,y:segment.a.y+(segment.b.y-segment.a.y)*t,distance:Math.hypot(x-px,z-pz)};
}
function triangleHeight(x,z,a,b,c){
 const denominator=(b.z-c.z)*(a.x-c.x)+(c.x-b.x)*(a.z-c.z);
 if(Math.abs(denominator)<1e-10)return null;
 const u=((b.z-c.z)*(x-c.x)+(c.x-b.x)*(z-c.z))/denominator;
 const v=((c.z-a.z)*(x-c.x)+(a.x-c.x)*(z-c.z))/denominator;
 const w=1-u-v;
 return u>=-1e-7&&v>=-1e-7&&w>=-1e-7?u*a.y+v*b.y+w*c.y:null;
}
export function supportHeight(x,z,maximum=Infinity){
 let height=null;
 if(Math.abs(x)<=FLOOR_WIDTH/2&&Math.abs(z)<=FLOOR_LENGTH/2&&maximum>=0)height=0;
 if(x>=access.minX&&x<=access.maxX&&z>=access.minZ&&z<=access.maxZ&&maximum>=0)height=0;
 for(const segment of nearbyRoad(x,z)){
  const [a,b,c,d]=segment.corners;
  const roadY=triangleHeight(x,z,a,b,c)??triangleHeight(x,z,a,c,d);
  if(roadY!==null&&roadY<=maximum&&(height===null||roadY>height))height=roadY;
 }
 return height;
}
export function resolveHorizontal(x,z,nextX,nextZ,feetY,radius=.48,height=2.3){
 for(let iteration=0;iteration<3;iteration++)for(const segment of nearbyRails(nextX,nextZ)){
  const p=projection(segment,nextX,nextZ);
  if(feetY>=p.y+1.2||feetY+height<p.y||p.distance>=radius)continue;
  let dx=nextX-p.x,dz=nextZ-p.z,length=Math.hypot(dx,dz);
  if(length<.00001){dx=x-p.x;dz=z-p.z;length=Math.hypot(dx,dz)||1;}
  nextX=p.x+dx/length*radius;nextZ=p.z+dz/length*radius;
 }
 return {x:nextX,z:nextZ};
}
export const worldPhysics={supportHeight,resolveHorizontal};
export function createWorld(){
 const group=new THREE.Group();group.name='Floating slab and circuit';
 const floor=new THREE.Mesh(new THREE.BoxGeometry(FLOOR_WIDTH,.25,FLOOR_LENGTH),new THREE.MeshLambertMaterial({color:'#303238'}));
 floor.name='Charcoal floor slab';floor.receiveShadow=true;floor.position.y=-.125;
 const kart=createKartFrame();kart.position.set(KART_POSITION.x,KART_POSITION.y,KART_POSITION.z);kart.rotation.y=Math.PI/2;
 group.add(floor,createTrack(),kart);return group;
}
