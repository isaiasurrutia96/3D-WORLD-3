import {trackSamples} from './track.js';

export const BOX_RESPAWN=8,NITRO_SECONDS=2;
export function createItemSystem(){
 const boxes=[];
 // Rows cover both directions of travel, including the straight after entry.
 for(let row=0;row<16;row++){
  const index=(1182+row*75)%1200,sample=trackSamples[index];
  for(const lane of [-6,0,6])boxes.push({id:boxes.length,x:sample.point.x+sample.normal.x*lane,
   y:sample.point.y,z:sample.point.z+sample.normal.z*lane,cooldown:0});
 }
 return {boxes,time:0};
}
function sweptDistance(a,b,x,z){
 const dx=b.x-a.x,dz=b.z-a.z,denominator=dx*dx+dz*dz;
 const t=denominator?Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/denominator)):0;
 return Math.hypot(x-a.x-dx*t,z-a.z-dz*t);
}
export function useHeldItem(system,kart){
 if(kart.heldItem!=='nitro'){kart.heldItem=null;return false;}
 kart.heldItem=null;kart.boostTime=NITRO_SECONDS;kart.speed=Math.max(0,kart.speed);
 return true;
}
export function stepItems(system,kart,previous,dt){
 system.time+=dt;
 for(const box of system.boxes)box.cooldown=Math.max(0,box.cooldown-dt);
 if(kart&&!kart.heldItem){
  for(const box of system.boxes){
   if(box.cooldown>0||Math.abs(kart.y-box.y)>1.4)continue;
   if(sweptDistance(previous??kart,kart,box.x,box.z)<2.1){
    box.cooldown=BOX_RESPAWN;kart.heldItem='nitro';break;
   }
  }
 }
}
