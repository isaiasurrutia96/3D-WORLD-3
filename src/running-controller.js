import { RUN_DURATION, RUN_STRIDE } from './animation/run-clip.js';
import { SPRINT_DURATION, SPRINT_STRIDE } from './animation/sprint-clip.js';
export const WALK_SPEED=RUN_STRIDE/RUN_DURATION;
export const SPRINT_SPEED=SPRINT_STRIDE/SPRINT_DURATION;
export const RUN_SPEED=WALK_SPEED;
export const STRIDE_LENGTH=RUN_STRIDE;
export const STEP=1/120;
const ACCELERATION=18, BRAKING=24, TURN_RATE=14;
export function createRunner() {
  return {x:0,z:0,yaw:0,speed:0,distance:0,velocityX:0,velocityZ:0,mode:'idle',phase:0,sprinting:false,sprintStarts:0};
}
export function stepRunner(state,input,dt=STEP) {
  const magnitude=Math.hypot(input.x,input.z),moving=magnitude>.01;
  const sprinting=moving && input.sprint===true;
  if(sprinting && !state.sprinting){state.sprintStarts++;if(state.speed<.01)state.phase=0;}
  state.sprinting=sprinting;
  const targetSpeed=sprinting?SPRINT_SPEED:WALK_SPEED;
  const targetX=moving?input.x/magnitude*targetSpeed:0;
  const targetZ=moving?input.z/magnitude*targetSpeed:0;
  const dx=targetX-state.velocityX,dz=targetZ-state.velocityZ;
  const change=Math.hypot(dx,dz),limit=(moving?(sprinting?24:ACCELERATION):BRAKING)*dt;
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
  const travelled=Math.hypot(state.x-oldX,state.z-oldZ);
  state.distance+=travelled;
  const ratio=Math.max(0,Math.min(1,(state.speed-WALK_SPEED)/(SPRINT_SPEED-WALK_SPEED)));
  state.phase+=travelled/(RUN_STRIDE+(SPRINT_STRIDE-RUN_STRIDE)*ratio);
  state.mode=state.speed>.001?(sprinting?'sprint':'walk'):'idle';
}
