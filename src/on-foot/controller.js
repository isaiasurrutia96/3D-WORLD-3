import {createRunner,stepRunner} from '../running-controller.js';
import {CHARACTER_RADIUS,CHARACTER_HEIGHT} from './avatar.js';
import {updateGroundVelocity} from './ground-movement.js';
export {STEP} from '../running-controller.js';
export function createOnFootState(){return{...createRunner(),momentum:0,braking:false,skidding:false,brakeRate:0,brakeStrength:0,inputStrength:0};}
export function stepOnFoot(state,input,dt,world){
 const jumpPressed=input.jump===true&&!state.jumpHeld;
 // Stage 2 has not been imported: preserve the existing jump/backflip physics.
 if(!state.grounded||state.backflipTime>=0||jumpPressed){
  state.braking=false;state.skidding=false;stepRunner(state,input,dt,world);return;
 }
 state.jumpHeld=input.jump===true;
 const previouslyRunning=state.sprinting;updateGroundVelocity(state,input,dt);
 if(state.sprinting&&!previouslyRunning)state.sprintStarts++;
 const oldX=state.x,oldZ=state.z,nx=oldX+state.velocityX*dt,nz=oldZ+state.velocityZ*dt;
 const next=world.resolveHorizontal(oldX,oldZ,nx,nz,state.y,CHARACTER_RADIUS,CHARACTER_HEIGHT);
 state.x=next.x;state.z=next.z;
 if(next.x!==nx)state.velocityX=(state.x-oldX)/dt;
 if(next.z!==nz)state.velocityZ=(state.z-oldZ)/dt;
 state.speed=Math.hypot(state.velocityX,state.velocityZ);
 const travelled=Math.hypot(state.x-oldX,state.z-oldZ);state.distance+=travelled;state.phase+=travelled/1.7;
 state.landingTime=Math.max(0,state.landingTime-dt);
 const support=world.supportHeight(state.x,state.z,state.y+.4);
 if(support!==null&&support>=state.y-.4){state.y=support;state.verticalVelocity=0;}
 else{state.grounded=false;state.verticalVelocity=0;state.airTime=0;}
 state.mode=!state.grounded?'fall':state.speed>.001?(state.sprinting?'sprint':'walk'):'idle';
}
