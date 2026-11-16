import {trackSamples} from './track.js';
import {startHitSpin} from './kart-hit.js';
import {dropBanana,stepBananas,clearFinishedBananas} from './bananas.js';
import {launchTorpedo,stepTorpedoes,trackTorpedoPositions} from './torpedoes.js';

export const BOX_RESPAWN=8,NITRO_SECONDS=2,SHELL_LIFETIME=8;
export function createItemSystem(tracks=[trackSamples],random=Math.random,courses=[]){
 if(typeof tracks==='function'){random=tracks;tracks=[trackSamples];}
 if(!Array.isArray(tracks))tracks=[trackSamples];
 const boxes=[];
 for(const samples of tracks)for(let row=0;row<16;row++){
  const count=samples.length-1,index=(Math.floor(count*.985)+row*Math.floor(count/16))%count,sample=samples[index];
  for(const lane of [-6,0,6])boxes.push({id:boxes.length,x:sample.point.x+sample.normal.x*lane,y:sample.point.y,z:sample.point.z+sample.normal.z*lane,cooldown:0});
 }
 return{boxes,shells:[],bananas:[],torpedoes:[],torpedoBursts:[],torpedoPositions:new WeakMap(),torpedoAnchors:new Map(),courses,time:0,nextShell:0,nextBanana:0,nextTorpedo:0,random,allowShells:true,testItem:null,itemMessage:'',itemMessageUntil:0,hits:[]};
}
function sweptDistance(a,b,x,z){
 const dx=b.x-a.x,dz=b.z-a.z,denominator=dx*dx+dz*dz,t=denominator?Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/denominator)):0;
 return Math.hypot(x-a.x-dx*t,z-a.z-dz*t);
}
export function useHeldItem(system,kart,world,targets=[]){
 const item=kart.heldItem;if(!['nitro','shell','banana','torpedo'].includes(item)){kart.heldItem=null;return false;}
 if(item==='banana'&&!dropBanana(system,kart,world))return false;
 if(item==='torpedo'&&!launchTorpedo(system,kart,targets))return false;
 kart.heldItem=null;
 if(item==='nitro'){kart.boostTime=NITRO_SECONDS;kart.speed=Math.max(0,kart.speed);}
 else if(item==='shell'){
  const sin=Math.sin(kart.yaw),cos=Math.cos(kart.yaw),speed=110+Math.max(0,kart.speed)*.25;
  system.shells.push({id:system.nextShell++,owner:kart,x:kart.x+sin*2,y:kart.y,z:kart.z+cos*2,vx:sin*speed,vz:cos*speed,age:0,bounces:0});
 }
 return true;
}
function pickup(system,kart,previous){
 if(!kart||kart.heldItem)return;
 for(const box of system.boxes){
  if(box.cooldown>0||Math.abs(kart.y-box.y)>1.4)continue;
  if(sweptDistance(previous??kart,kart,box.x,box.z)<2.1){
   box.cooldown=BOX_RESPAWN;const draw=system.allowShells?system.random():0;
   kart.heldItem=system.allowShells&&system.testItem?system.testItem:draw<.5?'nitro':draw<.75?'banana':'shell';break;
  }
 }
}
// Advance one shared clock for both drivers. Rivals use the same boxes and rules.
export function stepItems(system,kart,previous,dt,world,rivals=[]){
 system.time+=dt;system.hits=[];
 for(const box of system.boxes)box.cooldown=Math.max(0,box.cooldown-dt);
 const actors=[...(kart?[{state:kart,previous:previous??kart}]:[]),...rivals];
 trackTorpedoPositions(system,actors.map(actor=>actor.state));
 clearFinishedBananas(system,previous,kart);
 for(const actor of actors)pickup(system,actor.state,actor.previous);
 stepBananas(system,actors,dt,world);
 stepTorpedoes(system,actors,dt,world);
 const alive=[];
 for(const shell of system.shells){
  shell.age+=dt;if(shell.age>SHELL_LIFETIME||shell.bounces>12||!world)continue;
  let removed=false;const steps=Math.max(1,Math.ceil(Math.hypot(shell.vx,shell.vz)*dt/.25));
  for(let part=0;part<steps;part++){
   const old={x:shell.x,z:shell.z},nx=shell.x+shell.vx*dt/steps,nz=shell.z+shell.vz*dt/steps;
   const resolved=world.resolveHorizontal(shell.x,shell.z,nx,nz,shell.y+.12,.45,.6),pushX=resolved.x-nx,pushZ=resolved.z-nz,length=Math.hypot(pushX,pushZ);
   if(length>.0001){const normalX=pushX/length,normalZ=pushZ/length,dot=shell.vx*normalX+shell.vz*normalZ;if(dot<0){shell.vx-=2*dot*normalX;shell.vz-=2*dot*normalZ;shell.bounces++;}}
   shell.x=resolved.x;shell.z=resolved.z;
   const height=world.supportHeight(shell.x,shell.z,shell.y+.7);
   if(height===null||height<shell.y-1){removed=true;break;}
   shell.y=height;
   for(const actor of actors){
    const target=actor.state;if(target===shell.owner&&(shell.age<.65||shell.bounces===0))continue;
    const start=actor.previous??target,t0=part/steps,t1=(part+1)/steps;
    const a={x:old.x-(start.x+(target.x-start.x)*t0),z:old.z-(start.z+(target.z-start.z)*t0)},b={x:shell.x-(start.x+(target.x-start.x)*t1),z:shell.z-(start.z+(target.z-start.z)*t1)};
    if(Math.abs(shell.y-target.y)<1.4&&sweptDistance(a,b,0,0)<1.7){
     target.speed*=.28;target.boostTime=0;target.impactRecovery=Math.max(target.impactRecovery??0,.25);startHitSpin(target);
     system.hits.push({target,owner:shell.owner});removed=true;break;
    }
   }
   if(removed)break;
  }
  if(!removed)alive.push(shell);
 }
 system.shells=alive;
}
