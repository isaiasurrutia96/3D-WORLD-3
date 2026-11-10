import {absorbShieldImpact,shieldActive} from '../shield.js';

const OFFSETS=[-.35,.35],RADIUS=1.18;
const pairs=new WeakMap();
function contact(a,b){
 let map=pairs.get(a);if(!map){map=new WeakMap();pairs.set(a,map);}
 let pair=map.get(b);if(!pair){pair={token:{},blocked:new WeakMap()};map.set(b,pair);let reverse=pairs.get(b);if(!reverse){reverse=new WeakMap();pairs.set(b,reverse);}reverse.set(a,pair);}
 return pair;
}
function gap(a,b){
 let result=Infinity;
 for(const oa of OFFSETS)for(const ob of OFFSETS)result=Math.min(result,Math.hypot(a.x+Math.sin(a.yaw)*oa-b.x-Math.sin(b.yaw)*ob,a.z+Math.cos(a.yaw)*oa-b.z-Math.cos(b.yaw)*ob)-2*RADIUS);
 return result;
}
export function resetKartContact(a,b){const pair=contact(a,b);pair.token={};pair.blocked=new WeakMap();}
function velocity(state){return{x:Math.sin(state.yaw)*state.speed+Math.cos(state.yaw)*(state.lateralSpeed??0),z:Math.cos(state.yaw)*state.speed-Math.sin(state.yaw)*(state.lateralSpeed??0)};}
function setVelocity(state,v){state.speed=v.x*Math.sin(state.yaw)+v.z*Math.cos(state.yaw);state.lateralSpeed=v.x*Math.cos(state.yaw)-v.z*Math.sin(state.yaw);}
function constrain(state,old,world){
 for(let i=0;i<2;i++)for(const offset of OFFSETS){const dx=Math.sin(state.yaw)*offset,dz=Math.cos(state.yaw)*offset,p=world.resolveHorizontal(old.x+dx,old.z+dz,state.x+dx,state.z+dz,state.y,RADIUS,1.8);state.x=p.x-dx;state.z=p.z-dz;}
}
// Equal-mass, damped contact. Headings stay under the drivers' control.
export function resolveKartContact(a,b,world){
 const pair=contact(a,b);
 if(Math.abs(a.y-b.y)>1.6||gap(a,b)>.25){pair.token={};pair.blocked=new WeakMap();return false;}
 const protectedByContact=state=>pair.blocked.has(state)&&(shieldActive(state)||(state.shieldAge??0)+1e-8<pair.blocked.get(state));
 const va=velocity(a),vb=velocity(b);let touched=false;
 for(let iteration=0;iteration<4;iteration++){
  let deepest=null;
  for(const oa of OFFSETS)for(const ob of OFFSETS){
   const dx=a.x+Math.sin(a.yaw)*oa-b.x-Math.sin(b.yaw)*ob,dz=a.z+Math.cos(a.yaw)*oa-b.z-Math.cos(b.yaw)*ob,length=Math.hypot(dx,dz),depth=2*RADIUS-length;
   if(depth>1e-6&&(!deepest||depth>deepest.depth))deepest={nx:length>1e-6?dx/length:1,nz:length>1e-6?dz/length:0,depth};
  }
  if(!deepest)break;touched=true;
  const {nx,nz,depth}=deepest,oldA={x:a.x,z:a.z},oldB={x:b.x,z:b.z};
  const closing=(va.x-vb.x)*nx+(va.z-vb.z)*nz;
  if(closing< -3)for(const state of [a,b])if(!protectedByContact(state)){
   const until=(state.shieldAge??0)+(state.shieldTime??0);
   if(absorbShieldImpact(state,'collision',pair.token))pair.blocked.set(state,until);
  }
  // Yield the unprotected body first. If a rail pins it, geometry still has
  // to separate the shielded body; protection never permits penetration.
  const pa=protectedByContact(a),pb=protectedByContact(b),wa=pa&&!pb?(iteration?1:0):pb&&!pa?(iteration?0:1):.5,wb=1-wa;
  a.x+=nx*(depth+.0001)*wa;a.z+=nz*(depth+.0001)*wa;b.x-=nx*(depth+.0001)*wb;b.z-=nz*(depth+.0001)*wb;
  constrain(a,oldA,world);constrain(b,oldB,world);
  if(closing<0){
   const ia=pa?0:1,ib=pb?0:1;
   if(ia+ib){const impulse=-closing*(pa||pb?1:1.05)/(ia+ib);va.x+=nx*impulse*ia;va.z+=nz*impulse*ia;vb.x-=nx*impulse*ib;vb.z-=nz*impulse*ib;}
  }
 }
 if(touched){setVelocity(a,va);setVelocity(b,vb);}
 return touched;
}
