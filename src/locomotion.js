import clips from './animation/sm64-walk-run.json' with {type:'json'};
// 30 Hz flat-ground controller with a single airborne action.
export const TICK=1/30;
export const WORLD_SCALE=0.0125;
export const RUN_SPEED=32;
export const WALK_SPEED=14;
export const CLIP_LENGTHS=Object.fromEntries(Object.entries(clips).map(([name,clip])=>[name,clip.frames]));
const wrap=angle=>Math.atan2(Math.sin(angle),Math.cos(angle));
export function createLocomotion(){
  return {x:0,y:0,z:0,yaw:0,speed:0,vx:0,vy:0,vz:0,grounded:true,jumpWasDown:false,brake:0,landing:0,action:'idle',clip:'idle',frame:0};
}
export function tickLocomotion(state,input){
  let {x=0,z=0}=input;
  const length=Math.hypot(x,z);
  if(length>1){x/=length;z/=length;}
  const moving=length>0.01,target=moving?(input.walk?WALK_SPEED:RUN_SPEED):0;
  const desired=moving?Math.atan2(x,z):state.yaw,difference=wrap(desired-state.yaw);
  const previousClip=state.clip;
  const jumpPressed=!!input.jump&&!state.jumpWasDown;
  state.jumpWasDown=!!input.jump;
  state.landing=Math.max(0,state.landing-TICK);
  if(state.grounded){
    if(moving && Math.abs(difference)>Math.PI*100/180 && (state.speed>=16||state.action==='turn')){
      state.action='turn';
      state.brake+=(Math.max(0.6,Math.min(2.7,state.speed*0.11))-state.brake)*0.35;
      state.speed=Math.max(0,state.speed-state.brake);
      // Blend the final turn through a small arc, rather than a single-frame flip.
      if(state.speed<8)state.yaw+=Math.max(-Math.PI/10,Math.min(Math.PI/10,difference));
      if(state.speed<0.3){state.speed=0;state.action='move';state.brake=0;}
    }else if(moving){
      state.action='move';state.brake=0;
      if(state.speed<=target)state.speed=Math.min(target,state.speed+1.55-state.speed/43);
      else state.speed=Math.max(target,state.speed-1.2);
      state.speed=Math.max(0,Math.min(RUN_SPEED,state.speed));
      state.yaw+=Math.max(-Math.PI/16,Math.min(Math.PI/16,difference));
    }else{
      state.action=state.speed>0?'brake':'idle';
      state.brake+=(Math.max(0.45,Math.min(2.7,state.speed*0.11))-state.brake)*0.35;
      state.speed=Math.max(0,state.speed-state.brake);
      if(state.speed<0.2){state.speed=0;state.action='idle';state.brake=0;}
    }
    if(jumpPressed){state.grounded=false;state.vy=10.2;state.landing=0;}
  }else{
    state.brake=0;
    if(moving){
      state.yaw+=Math.max(-Math.PI/48,Math.min(Math.PI/48,difference));
      state.speed+=Math.max(-0.25,Math.min(0.25,target-state.speed));
    }
  }
  state.vx=Math.sin(state.yaw)*state.speed*WORLD_SCALE/TICK;
  state.vz=Math.cos(state.yaw)*state.speed*WORLD_SCALE/TICK;
  state.x+=state.vx*TICK;state.z+=state.vz*TICK;
  if(!state.grounded){
    state.vy-=26*TICK;state.y+=state.vy*TICK;state.action=state.vy>0?'jump':'fall';
    if(state.y<=0&&state.vy<0){state.y=0;state.vy=0;state.grounded=true;state.landing=0.16;state.action='land';}
  }
  if(!state.grounded)state.clip=state.vy>0?'jump':'fall';
  else if(state.landing>0)state.clip='land';
  else if(state.action==='turn')state.clip='turn';
  else if(state.action==='brake')state.clip='brake';
  else if(state.speed===0)state.clip='idle';
  else if(state.clip==='run' && state.speed>=18)state.clip='run';
  else state.clip=Math.max(target,state.speed)>22?'run':'walk';
  const step=['run','walk'].includes(state.clip)?Math.max(4,state.speed)/4:1;
  if(state.clip!==previousClip)state.frame=clips[state.clip].start||0;
  else if(['jump','fall','land'].includes(state.clip))state.frame=Math.min(CLIP_LENGTHS[state.clip]-1,state.frame+step);
  else state.frame=(state.frame+step)%CLIP_LENGTHS[state.clip];
  const xLimit=129,zLimit=229;
  if(Math.abs(state.x)>xLimit||Math.abs(state.z)>zLimit){
    state.x=Math.max(-xLimit,Math.min(xLimit,state.x));state.z=Math.max(-zLimit,Math.min(zLimit,state.z));state.speed=state.vx=state.vz=0;
  }
}
