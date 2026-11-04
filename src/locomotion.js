// Flat-ground subset of SM64's 30 Hz locomotion. No jumping or other actions.
// Source and deliberate scope differences are documented in third_party/sm64.
export const TICK=1/30;
export const WORLD_SCALE=0.0125;
export const RUN_SPEED=32;
export const WALK_SPEED=14;
const wrap=angle=>Math.atan2(Math.sin(angle),Math.cos(angle));
export function createLocomotion(){
  return {x:0,z:0,yaw:0,speed:0,vx:0,vz:0,action:'idle',clip:'idle',frame:0};
}
export function tickLocomotion(state,input){
  let {x=0,z=0}=input;
  const length=Math.hypot(x,z);
  if(length>1){x/=length;z/=length;}
  const moving=length>0.01;
  const target=moving?(input.walk?WALK_SPEED:RUN_SPEED):0;
  const desired=moving?Math.atan2(x,z):state.yaw;
  const difference=wrap(desired-state.yaw);
  const previousClip=state.clip;
  if(moving && Math.abs(difference)>Math.PI*100/180 && (state.speed>=16||state.action==='turn')){
    state.action='turn';state.speed=Math.max(0,state.speed-4);
    if(state.speed===0){state.yaw=desired;state.speed=8;state.action='move';}
  }else if(moving){
    state.action='move';
    if(state.speed<=target)state.speed+=1.1-state.speed/43;
    else state.speed-=1;
    state.speed=Math.max(0,Math.min(RUN_SPEED,state.speed));
    state.yaw+=Math.max(-Math.PI/16,Math.min(Math.PI/16,difference));
  }else{
    state.action=state.speed>=16||state.action==='brake'?'brake':state.speed>0?'decelerate':'idle';
    state.speed=Math.max(0,state.speed-(state.action==='brake'?4:1));
    if(state.speed===0)state.action='idle';
  }
  if(state.action==='turn')state.clip='turn';
  else if(state.action==='brake')state.clip='brake';
  else if(state.speed===0)state.clip='idle';
  else if(state.clip==='run' && state.speed>=18)state.clip='run';
  else state.clip=Math.max(target,state.speed)>22?'run':'walk';
  // Original walk/run animation advancement: forward speed / 4 per 30 Hz tick.
  const frames={run:72,walk:77,idle:30,turn:1,brake:1};
  state.frame=state.clip!==previousClip?0:(state.frame+Math.max(4,state.speed)/4)%frames[state.clip];
  state.vx=Math.sin(state.yaw)*state.speed*WORLD_SCALE/TICK;
  state.vz=Math.cos(state.yaw)*state.speed*WORLD_SCALE/TICK;
  state.x+=state.vx*TICK;state.z+=state.vz*TICK;
  // Temporary safety bounds on the empty slab; no collision course is enabled.
  const xLimit=129,zLimit=229;
  if(Math.abs(state.x)>xLimit||Math.abs(state.z)>zLimit){
    state.x=Math.max(-xLimit,Math.min(xLimit,state.x));state.z=Math.max(-zLimit,Math.min(zLimit,state.z));state.speed=state.vx=state.vz=0;
  }
}
