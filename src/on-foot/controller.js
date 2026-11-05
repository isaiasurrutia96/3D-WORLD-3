import {createRunner,stepRunner} from '../running-controller.js';
import {CHARACTER_RADIUS,CHARACTER_HEIGHT} from './avatar.js';
import {updateGroundVelocity} from './ground-movement.js';
import {TUNING} from '../claude/player/Tuning.ts';
export {STEP} from '../running-controller.js';
export function createOnFootState(){return{...createRunner(),momentum:0,braking:false,skidding:false,brakeRate:0,brakeStrength:0,inputStrength:0};}
export function stepOnFoot(state,input,dt,world){
 const jumpPressed=input.jump===true&&!state.jumpHeld;
 // Keep the existing standing backflip separate. Normal jumps now use the
 // source takeoff/air tuning instead of the old, lower legacy jump.
 const startsBackflip=jumpPressed&&input.backflip===true&&state.grounded&&state.speed<.65&&Math.hypot(input.x,input.z)<.1;
 if(state.backflipTime>=0||startsBackflip){
  state.braking=false;state.skidding=false;stepRunner(state,input,dt,world);return;
 }
 state.jumpHeld=input.jump===true;
 state.landingTime=Math.max(0,state.landingTime-dt);
 const previouslyRunning=state.sprinting;
 if(state.grounded)updateGroundVelocity(state,input,dt);
 else updateAirVelocity(state,input,dt);
 if(state.sprinting&&!previouslyRunning)state.sprintStarts++;
 if(jumpPressed&&state.grounded){
  state.verticalVelocity=TUNING.jumpVelocity;state.grounded=false;state.airTime=0;state.jumpCount++;
  state.braking=false;state.skidding=false;
 }
 const oldX=state.x,oldZ=state.z,nx=oldX+state.velocityX*dt,nz=oldZ+state.velocityZ*dt;
 const next=world.resolveHorizontal(oldX,oldZ,nx,nz,state.y,CHARACTER_RADIUS,CHARACTER_HEIGHT);
 state.x=next.x;state.z=next.z;
 if(next.x!==nx)state.velocityX=(state.x-oldX)/dt;
 if(next.z!==nz)state.velocityZ=(state.z-oldZ)/dt;
 state.speed=Math.hypot(state.velocityX,state.velocityZ);
 const travelled=Math.hypot(state.x-oldX,state.z-oldZ);state.distance+=travelled;state.phase+=travelled/1.7;
 if(state.grounded){
  const support=world.supportHeight(state.x,state.z,state.y+.4);
  if(support!==null&&support>=state.y-.4){state.y=support;state.verticalVelocity=0;}
  else{state.grounded=false;state.verticalVelocity=0;state.airTime=0;}
 }
 if(!state.grounded){
  const previousY=state.y,gravity=TUNING.gravity*(state.verticalVelocity>0?1:TUNING.fallGravityMultiplier);
  state.airTime+=dt;state.verticalVelocity=Math.max(-TUNING.terminalVelocity,state.verticalVelocity-gravity*dt);state.y+=state.verticalVelocity*dt;
  const support=world.supportHeight(state.x,state.z,previousY+.001);
  if(state.verticalVelocity<=0&&support!==null&&previousY>=support-.02&&state.y<=support){
   state.y=support;state.verticalVelocity=0;state.grounded=true;state.airTime=0;state.landingTime=.14;
  }
 }
 state.mode=!state.grounded?(state.verticalVelocity>0?'jump':'fall'):state.speed>.001?(state.sprinting?'sprint':'walk'):'idle';
}

// The normal branch of Claude's updateAir: retain takeoff momentum, steer
// toward the input and cap air acceleration at the existing movement speed.
// Extra jump presses, combo jumps and early-release height cuts stay disabled.
function updateAirVelocity(state,input,dt){
 state.braking=false;state.skidding=false;
 const magnitude=Math.hypot(input.x,input.z),moving=magnitude>.001;
 state.inputStrength=moving?(input.sprint===true?1:.45):0;state.sprinting=moving&&input.sprint===true;
 if(moving){
  const wx=input.x/magnitude,wz=input.z/magnitude,target=Math.atan2(wx,wz);
  const turn=Math.atan2(Math.sin(target-state.yaw),Math.cos(target-state.yaw)),limit=TUNING.airTurnRate*dt;
  state.yaw+=Math.max(-limit,Math.min(limit,turn));
  const cap=Math.max(state.speed,state.sprinting?TUNING.runSpeed:TUNING.walkSpeed*.45/.55);
  state.velocityX+=wx*TUNING.airAcceleration*dt;state.velocityZ+=wz*TUNING.airAcceleration*dt;
  const speed=Math.hypot(state.velocityX,state.velocityZ);
  if(speed>cap){state.velocityX*=cap/speed;state.velocityZ*=cap/speed;}
 }else{
  const drag=Math.max(0,1-TUNING.airDeceleration*dt);state.velocityX*=drag;state.velocityZ*=drag;
 }
}
