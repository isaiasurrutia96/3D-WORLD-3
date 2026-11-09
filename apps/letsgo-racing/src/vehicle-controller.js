import {KART_POSITION} from './kart.js';
import {GRAVITY} from './running-controller.js';
import {moveKartAgainstRails} from './vehicle-contact.js';

export const VEHICLE_TOP_SPEED=120*.44704,REVERSE_SPEED=8,NITRO_TOP_SPEED=180*.44704;
export const VEHICLE_ACCELERATION=24,NITRO_ACCELERATION=48;
export const STEERING_LOCK=.415;
export const HELD_STEER_DELAY=.5,HELD_STEER_RAMP=.8,HELD_STEER_GAIN=.20;
const WHEELBASE=2.03,WHEEL_RADIUS=.38;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const approach=(v,target,step)=>v<target?Math.min(target,v+step):Math.max(target,v-step);
export function createVehicleState(){
 return {...KART_POSITION,yaw:Math.PI/2,speed:0,lateralSpeed:0,steering:0,steerHoldTime:0,steerHoldDirection:0,wheelRotation:0,verticalVelocity:0,grounded:true,pitch:0,bank:0,heldItem:null,boostTime:0,spinTime:0,railContactTime:0,impactYawRate:0,impactRecovery:0};
}
export function stepVehicle(state,input,dt,world){
 state.railContactTime=Math.max(0,(state.railContactTime??0)-dt);
 state.impactRecovery=Math.max(0,(state.impactRecovery??0)-dt);
 state.impactYawRate=(state.impactYawRate??0)*Math.exp(-6*dt);
 state.lateralSpeed=(state.lateralSpeed??0)*Math.exp(-7*dt);
 const boosting=state.boostTime>0,spinning=(state.spinTime??0)>0;
 const spinTime=Math.max(0,(state.spinTime??0)-dt);state.spinTime=spinTime<1e-8?0:spinTime;
 state.boostTime=Math.max(0,state.boostTime-dt);
 const rawThrottle=clamp(input.throttle??0,-1,1);
 const steer=spinning?0:clamp(input.steer??0,-1,1);
 // Only the independent brake/reverse input or the safe-exit stop can brake.
 const braking=!!input.brake;
 const throttle=boosting&&rawThrottle>=0&&!braking?1:rawThrottle;
 const topSpeed=boosting?NITRO_TOP_SPEED:VEHICLE_TOP_SPEED;
 if(state.impactRecovery>0&&rawThrottle>=0)state.speed*=Math.exp(-6*dt);
 if(spinning)state.speed=approach(state.speed,0,(braking||rawThrottle<0?36:20)*dt);
 else if(braking)state.speed=approach(state.speed,0,36*dt);
 else if(throttle>0&&state.impactRecovery<=0){
  state.speed=state.speed>topSpeed?approach(state.speed,topSpeed,12*dt):Math.min(topSpeed,state.speed+(state.speed<0?36:(boosting?NITRO_ACCELERATION:VEHICLE_ACCELERATION))*dt);
 }else if(throttle<0)state.speed=clamp(state.speed-(state.speed>0?36:8)*dt,-REVERSE_SPEED,topSpeed);
 else if(state.impactRecovery<=0)state.speed=approach(state.speed,0,(1.8+.0035*state.speed*state.speed)*dt);
 // Keep the existing tap smoothing; a continuous hold adds lock gradually.
 const heldDirection=Math.abs(steer)>.55&&state.speed>2&&state.grounded&&!braking?Math.sign(steer):0;
 if(heldDirection){state.steerHoldTime=(state.steerHoldDirection===heldDirection?state.steerHoldTime:0)+dt;state.steerHoldDirection=heldDirection;}
 else{state.steerHoldTime=0;state.steerHoldDirection=0;}
 const hold=clamp((state.steerHoldTime-HELD_STEER_DELAY)/HELD_STEER_RAMP,0,1);
 const holdGain=1+HELD_STEER_GAIN*hold*hold*(3-2*hold);
 const maxSteer=STEERING_LOCK/(1+Math.abs(state.speed)/11)*holdGain;
 const building=steer*state.steering>=0&&Math.abs(steer*maxSteer)>Math.abs(state.steering);
 state.steering+=(steer*maxSteer-state.steering)*(1-Math.exp(-(building?6.5:14)*dt));
 // Driven wheels can still turn the nose away while pushing against a rail.
 // This small steering response requires player input, never a forced yaw.
 const turnSpeed=state.railContactTime>0&&throttle>0?Math.max(state.speed,2):state.speed;
 const steeringTurn=state.grounded?-turnSpeed/WHEELBASE*Math.tan(state.steering)*dt:0;
 const travelYaw=state.yaw+steeringTurn;
 state.yaw=travelYaw+state.impactYawRate*dt;
 const oldX=state.x,oldZ=state.z,sin=Math.sin(state.yaw),cos=Math.cos(state.yaw);
 let vx=Math.sin(travelYaw)*state.speed+Math.cos(travelYaw)*state.lateralSpeed,vz=Math.cos(travelYaw)*state.speed-Math.sin(travelYaw)*state.lateralSpeed;
 const magnitude=Math.hypot(vx,vz),limit=Math.max(topSpeed,Math.abs(state.speed));
 if(magnitude>limit){vx*=limit/magnitude;vz*=limit/magnitude;}
 const velocity=moveKartAgainstRails(state,vx,vz,dt,world);
 state.speed=velocity.vx*sin+velocity.vz*cos;
 state.lateralSpeed=velocity.vx*cos-velocity.vz*sin;
 const x=state.x,z=state.z;
 const travel=(x-oldX)*sin+(z-oldZ)*cos;
 state.wheelRotation+=travel/WHEEL_RADIUS;
 const ground=world.supportHeight(x,z,state.y+.65);
 if(state.grounded&&ground!==null&&ground>=state.y-.65){state.y=ground;state.verticalVelocity=0;}
 else {
  state.grounded=false;const previousY=state.y;
  state.verticalVelocity-=GRAVITY*dt;state.y+=state.verticalVelocity*dt;
  const landing=world.supportHeight(x,z,previousY+.001);
  if(state.verticalVelocity<=0&&landing!==null&&previousY>=landing-.02&&state.y<=landing){state.y=landing;state.verticalVelocity=0;state.grounded=true;}
 }
 if(state.grounded){
  const front=world.supportHeight(x+sin*1.03,z+cos*1.03,state.y+.7);
  const back=world.supportHeight(x-sin,z-cos,state.y+.7);
  const left=world.supportHeight(x-cos*.8,z+sin*.8,state.y+.7);
  const right=world.supportHeight(x+cos*.8,z-sin*.8,state.y+.7);
  const pitch=front!==null&&back!==null?Math.atan2(back-front,WHEELBASE):0;
  const bank=left!==null&&right!==null?Math.atan2(right-left,1.6):0;
  state.pitch+=(clamp(pitch,-.4,.4)-state.pitch)*(1-Math.exp(-12*dt));
  state.bank+=(clamp(bank,-.3,.3)-state.bank)*(1-Math.exp(-12*dt));
 }
}
export function canEnterVehicle(runner,kart){
 return runner.grounded&&kart.grounded&&!(kart.spinTime>0)&&Math.hypot(runner.x-kart.x,runner.z-kart.z)<4.5&&Math.abs(runner.y-kart.y)<.7&&Math.hypot(kart.speed,kart.lateralSpeed??0)<.75;
}
export function findExitPosition(kart,world){
 if(!kart.grounded||kart.spinTime>0||Math.hypot(kart.speed,kart.lateralSpeed??0)>.75)return null;
 for(const [side,forward]of [[1.95,-.2],[-1.95,-.2],[0,-2.3],[0,2.5]]){
  const x=kart.x+Math.cos(kart.yaw)*side+Math.sin(kart.yaw)*forward;
  const z=kart.z-Math.sin(kart.yaw)*side+Math.cos(kart.yaw)*forward;
  const y=world.supportHeight(x,z,kart.y+.5);
  if(y===null||Math.abs(y-kart.y)>.5)continue;
  const resolved=world.resolveHorizontal(x,z,x,z,y);
  if(Math.hypot(resolved.x-x,resolved.z-z)<.02)return{x,y,z,yaw:kart.yaw};
 }
 return null;
}
// A parked kart also occupies space for the on-foot character.
export function resolveParkedKart(x,z,feetY,kart,radius=.42,height=2.3){
 if(feetY>kart.y+1.2||feetY+height<kart.y)return{x,z};
 const sin=Math.sin(kart.yaw),cos=Math.cos(kart.yaw),dx=x-kart.x,dz=z-kart.z;
 let localX=dx*cos-dz*sin,localZ=dx*sin+dz*cos;
 const nearestX=clamp(localX,-1.18,1.18),nearestZ=clamp(localZ,-1.5,1.5);
 let nx=localX-nearestX,nz=localZ-nearestZ,length=Math.hypot(nx,nz);
 if(length>=radius)return{x,z};
 if(length<1e-6){
  if(1.18-Math.abs(localX)<1.5-Math.abs(localZ)){localX=Math.sign(localX||1)*(1.18+radius);}
  else localZ=Math.sign(localZ||1)*(1.5+radius);
 }else{localX=nearestX+nx/length*radius;localZ=nearestZ+nz/length*radius;}
 return{x:kart.x+localX*cos+localZ*sin,z:kart.z-localX*sin+localZ*cos};
}
