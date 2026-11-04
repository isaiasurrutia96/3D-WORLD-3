import { RUN_DURATION, RUN_STRIDE } from './animation/run-clip.js';
export const RUN_SPEED=RUN_STRIDE/RUN_DURATION;
export const STRIDE_LENGTH=RUN_STRIDE;
export const STEP=1/120;
const ACCELERATION=18, BRAKING=24, TURN_RATE=14;
export function createRunner() {
  return {x:0,z:0,yaw:0,speed:0,distance:0,velocityX:0,velocityZ:0,mode:'idle'};
}
export function stepRunner(state,input,dt=STEP) {
  const magnitude=Math.hypot(input.x,input.z),moving=magnitude>.01;
  const targetX=moving?input.x/magnitude*RUN_SPEED:0;
  const targetZ=moving?input.z/magnitude*RUN_SPEED:0;
  const dx=targetX-state.velocityX,dz=targetZ-state.velocityZ;
  const change=Math.hypot(dx,dz),limit=(moving?ACCELERATION:BRAKING)*dt;
  const fraction=change>limit?limit/change:1;
  const oldSpeed=state.speed;
  state.velocityX+=dx*fraction;state.velocityZ+=dz*fraction;
  const oldX=state.x,oldZ=state.z;
  state.x=Math.max(-129,Math.min(129,state.x+state.velocityX*dt));
  state.z=Math.max(-229,Math.min(229,state.z+state.velocityZ*dt));
  if(state.x===oldX)state.velocityX=0;
  if(state.z===oldZ)state.velocityZ=0;
  state.speed=Math.hypot(state.velocityX,state.velocityZ);
  if(state.speed>.001){
    const desired=Math.atan2(state.velocityX,state.velocityZ);
    const turn=Math.atan2(Math.sin(desired-state.yaw),Math.cos(desired-state.yaw));
    state.yaw=oldSpeed<.001?desired:state.yaw+Math.max(-TURN_RATE*dt,Math.min(TURN_RATE*dt,turn));
  }
  state.distance+=Math.hypot(state.x-oldX,state.z-oldZ);
  state.mode=state.speed>.001?'run':'idle';
}
