import {trackSamples} from './track.js';

export const BOX_RESPAWN=8,NITRO_SECONDS=2,SHELL_LIFETIME=8;
export function createItemSystem(random=Math.random){
 const boxes=[];
 // Rows cover both directions of travel, including the straight after entry.
 for(let row=0;row<16;row++){
  const index=(1182+row*75)%1200,sample=trackSamples[index];
  for(const lane of [-6,0,6])boxes.push({id:boxes.length,x:sample.point.x+sample.normal.x*lane,
   y:sample.point.y,z:sample.point.z+sample.normal.z*lane,cooldown:0});
 }
 return {boxes,shells:[],time:0,nextShell:0,random};
}
function sweptDistance(a,b,x,z){
 const dx=b.x-a.x,dz=b.z-a.z,denominator=dx*dx+dz*dz;
 const t=denominator?Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/denominator)):0;
 return Math.hypot(x-a.x-dx*t,z-a.z-dz*t);
}
export function useHeldItem(system,kart){
 if(!kart.heldItem)return false;
 const item=kart.heldItem;kart.heldItem=null;
 if(item==='nitro'){
  kart.boostTime=NITRO_SECONDS;kart.speed=Math.max(0,kart.speed);
 }else if(item==='shell'){
  const sin=Math.sin(kart.yaw),cos=Math.cos(kart.yaw),speed=58+Math.max(0,kart.speed)*.15;
  system.shells.push({id:system.nextShell++,x:kart.x+sin,y:kart.y,z:kart.z+cos,
   vx:sin*speed,vz:cos*speed,age:0,bounces:0});
 }
 return true;
}
export function stepItems(system,kart,previous,dt,world){
 system.time+=dt;
 for(const box of system.boxes)box.cooldown=Math.max(0,box.cooldown-dt);
 if(kart&&!kart.heldItem){
  for(const box of system.boxes){
   if(box.cooldown>0||Math.abs(kart.y-box.y)>1.4)continue;
   if(sweptDistance(previous??kart,kart,box.x,box.z)<2.1){
    box.cooldown=BOX_RESPAWN;kart.heldItem=system.random()<.5?'nitro':'shell';break;
   }
  }
 }
 const alive=[];
 for(const shell of system.shells){
  shell.age+=dt;if(shell.age>SHELL_LIFETIME||shell.bounces>12)continue;
  let removed=false;
  const steps=Math.max(1,Math.ceil(Math.hypot(shell.vx,shell.vz)*dt/.25));
  for(let part=0;part<steps;part++){
   const old={x:shell.x,z:shell.z},nx=shell.x+shell.vx*dt/steps,nz=shell.z+shell.vz*dt/steps;
   const resolved=world.resolveHorizontal(shell.x,shell.z,nx,nz,shell.y+.12,.45,.6);
   const pushX=resolved.x-nx,pushZ=resolved.z-nz,length=Math.hypot(pushX,pushZ);
   if(length>.0001){
    const normalX=pushX/length,normalZ=pushZ/length,dot=shell.vx*normalX+shell.vz*normalZ;
    if(dot<0){shell.vx-=2*dot*normalX;shell.vz-=2*dot*normalZ;shell.bounces++;}
   }
   shell.x=resolved.x;shell.z=resolved.z;
   const height=world.supportHeight(shell.x,shell.z,shell.y+.7);
   if(height===null||height<shell.y-1){removed=true;break;}
   shell.y=height;
   if(kart&&shell.bounces>0&&shell.age>.6&&Math.abs(shell.y-kart.y)<1.4&&sweptDistance(old,shell,kart.x,kart.z)<1.7){
    kart.speed*=.2;kart.boostTime=0;kart.spinTime=.75;removed=true;break;
   }
  }
  if(removed)continue;
  alive.push(shell);
 }
 system.shells=alive;
}
