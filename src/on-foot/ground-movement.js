import {TUNING} from '../claude/player/Tuning.ts';
// Ground movement ported from Player.updateGround / targetSpeedFor /
// turnToward in 3D-WORLD-3@b60e295. Input is already in world space here;
// our existing track surface/collision queries replace its capsule octree.
export const WALK_SPEED=TUNING.walkSpeed*(.45/.55),RUN_SPEED=TUNING.runSpeed;
export function updateGroundVelocity(state,input,dt){
 const magnitude=Math.hypot(input.x,input.z),moving=magnitude>.001;
 const wx=moving?input.x/magnitude:0,wz=moving?input.z/magnitude:0;
 const speed=Math.hypot(state.velocityX,state.velocityZ);
 let vx=state.velocityX,vz=state.velocityZ;
 state.inputStrength=moving?(input.sprint===true?1:.45):0;
 state.sprinting=moving&&input.sprint===true;
 if(moving){
  state.braking=false;
  const strength=state.inputStrength,targetSpeed=strength<=.55?TUNING.walkSpeed*strength/.55:TUNING.walkSpeed+(TUNING.runSpeed-TUNING.walkSpeed)*(strength-.55)/.45;
  const alignment=speed>.01?(wx*vx+wz*vz)/speed:1;
  state.skidding=speed>TUNING.skidMinSpeed&&alignment<TUNING.skidDotThreshold;
  if(state.skidding){const next=Math.max(0,speed-TUNING.skidDeceleration*dt);if(speed>.001){vx*=next/speed;vz*=next/speed;}}
  else{
   const target=Math.atan2(wx,wz),rate=TUNING.turnRateSlow+(TUNING.turnRateFast-TUNING.turnRateSlow)*Math.min(1,speed/TUNING.runSpeed);
   const difference=Math.atan2(Math.sin(target-state.yaw),Math.cos(target-state.yaw));state.yaw+=Math.max(-rate*dt,Math.min(rate*dt,difference));
   const fx=Math.sin(state.yaw),fz=Math.cos(state.yaw),along=vx*fx+vz*fz;
   const next=along<targetSpeed?Math.min(targetSpeed,along+TUNING.acceleration*dt):Math.max(targetSpeed,along-TUNING.deceleration*dt);
   const lateral=Math.max(0,1-TUNING.deceleration*1.8*dt);
   vx=fx*next+(vx-fx*along)*lateral;vz=fz*next+(vz-fz*along)*lateral;
  }
 }else{
  state.skidding=false;
  if(!state.braking&&speed>TUNING.brakeMinSpeed){
   state.braking=true;const earned=Math.pow(state.momentum,TUNING.brakeMomentumCurve);
   const slide=TUNING.brakeSlideShort+(TUNING.brakeSlideLong-TUNING.brakeSlideShort)*earned;
   state.brakeRate=speed*speed/(2*Math.max(.1,slide));state.brakeStrength=earned;
  }
  if(state.braking&&speed<TUNING.brakeEndSpeed)state.braking=false;
  const next=Math.max(0,speed-(state.braking?state.brakeRate:TUNING.deceleration)*dt);
  if(speed>.001){vx*=next/speed;vz*=next/speed;}
 }
 state.velocityX=vx;state.velocityZ=vz;state.speed=Math.hypot(vx,vz);
 if(state.speed>TUNING.brakeMinSpeed&&!state.braking)state.momentum=Math.min(1,state.momentum+dt/TUNING.brakeMomentumBuild);
 else if(!state.braking)state.momentum=Math.max(0,state.momentum-dt/TUNING.brakeMomentumFade);
}
