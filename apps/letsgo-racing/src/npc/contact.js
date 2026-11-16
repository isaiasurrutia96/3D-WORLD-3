const OFFSETS=[-.35,.35],RADIUS=1.18;
function velocity(state){return{x:Math.sin(state.yaw)*state.speed+Math.cos(state.yaw)*(state.lateralSpeed??0),z:Math.cos(state.yaw)*state.speed-Math.sin(state.yaw)*(state.lateralSpeed??0)};}
function setVelocity(state,v){state.speed=v.x*Math.sin(state.yaw)+v.z*Math.cos(state.yaw);state.lateralSpeed=v.x*Math.cos(state.yaw)-v.z*Math.sin(state.yaw);}
function constrain(state,old,world){
 for(let i=0;i<2;i++)for(const offset of OFFSETS){const dx=Math.sin(state.yaw)*offset,dz=Math.cos(state.yaw)*offset,p=world.resolveHorizontal(old.x+dx,old.z+dz,state.x+dx,state.z+dz,state.y,RADIUS,1.8);state.x=p.x-dx;state.z=p.z-dz;}
}
// Equal-mass, damped contact. Headings stay under the drivers' control.
export function resolveKartContact(a,b,world){
 if(Math.abs(a.y-b.y)>1.6)return false;
 const va=velocity(a),vb=velocity(b);let touched=false;
 for(let iteration=0;iteration<4;iteration++){
  let deepest=null;
  for(const oa of OFFSETS)for(const ob of OFFSETS){
   const dx=a.x+Math.sin(a.yaw)*oa-b.x-Math.sin(b.yaw)*ob,dz=a.z+Math.cos(a.yaw)*oa-b.z-Math.cos(b.yaw)*ob,length=Math.hypot(dx,dz),depth=2*RADIUS-length;
   if(depth>1e-6&&(!deepest||depth>deepest.depth))deepest={nx:length>1e-6?dx/length:1,nz:length>1e-6?dz/length:0,depth};
  }
  if(!deepest)break;touched=true;
  const {nx,nz,depth}=deepest,oldA={x:a.x,z:a.z},oldB={x:b.x,z:b.z};
  a.x+=nx*(depth+.0001)*.5;a.z+=nz*(depth+.0001)*.5;b.x-=nx*(depth+.0001)*.5;b.z-=nz*(depth+.0001)*.5;
  constrain(a,oldA,world);constrain(b,oldB,world);
  const closing=(va.x-vb.x)*nx+(va.z-vb.z)*nz;
  if(closing<0){const impulse=-closing*.525;va.x+=nx*impulse;va.z+=nz*impulse;vb.x-=nx*impulse;vb.z-=nz*impulse;}
 }
 if(touched){setVelocity(a,va);setVelocity(b,vb);}
 return touched;
}
