import {STEERING_LOCK} from './vehicle-controller.js';

export const ISO_HALF_HEIGHT=21,CHASE_FOLLOW_RATE=8;
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
export function createDrivingCameraState(){return{lookTurn:0};}
export function updateDrivingCamera(state,kart,dt){
 const speed=Math.abs(kart.speed),maxSteer=STEERING_LOCK/(1+speed/11);
 const moving=clamp((speed-1)/12,0,1);
 const turn=clamp(kart.steering/maxSteer,-1,1)*moving*Math.sign(kart.speed);
 state.lookTurn+=(turn-state.lookTurn)*(1-Math.exp(-5*dt));
 const sin=Math.sin(kart.yaw),cos=Math.cos(kart.yaw),peek=state.lookTurn*2.4;
 // Positive steering turns toward decreasing yaw in the vehicle motor.
 // Keep the kart in frame while showing a little more of the inside edge.
 const followYaw=kart.yaw-state.lookTurn*.08;
 return{
  target:{x:kart.x+sin*1.3-cos*peek,y:kart.y+1.6,z:kart.z+cos*1.3+sin*peek},
  position:{x:kart.x-Math.sin(followYaw)*11,y:kart.y+5.5,z:kart.z-Math.cos(followYaw)*11},
 };
}
