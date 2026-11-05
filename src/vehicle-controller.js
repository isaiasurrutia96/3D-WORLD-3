import {KART_POSITION} from './kart.js';
import {GRAVITY} from './running-controller.js';

export const VEHICLE_TOP_SPEED=42,REVERSE_SPEED=8,NITRO_TOP_SPEED=66;
export const STEERING_LOCK=.39;
const WHEELBASE=2.03,WHEEL_RADIUS=.38;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const approach=(v,target,step)=>v<target?Math.min(target,v+step):Math.max(target,v-step);
export function createVehicleState(){
 return {...KART_POSITION,yaw:Math.PI/2,speed:0,steering:0,wheelRotation:0,verticalVelocity:0,grounded:true,pitch:0,bank:0,heldItem:null,boostTime:0,spinTime:0,railContactTime:0};
}
export function stepVehicle(state,input,dt,world){
 const previousYaw=state.yaw;
 state.railContactTime=Math.max(0,(state.railContactTime??0)-dt);
 const boosting=state.boostTime>0,spinning=state.spinTime>0;
 state.boostTime=Math.max(0,state.boostTime-dt);
 if(spinning){const spinStep=Math.min(dt,state.spinTime);state.yaw+=spinStep*Math.PI*2/.75;state.spinTime=Math.max(0,state.spinTime-dt);}
 const rawThrottle=clamp(input.throttle??0,-1,1);
 const throttle=boosting&&rawThrottle>=0&&!input.brake?1:rawThrottle;
 const steer=spinning?0:clamp(input.steer??0,-1,1);
 const topSpeed=boosting?NITRO_TOP_SPEED:VEHICLE_TOP_SPEED;
 if(spinning)state.speed=approach(state.speed,0,20*dt);
 else if(input.brake)state.speed=approach(state.speed,0,36*dt);
 else if(throttle>0){
  state.speed=state.speed>topSpeed?approach(state.speed,topSpeed,12*dt):Math.min(topSpeed,state.speed+(state.speed<0?36:(boosting?36:16))*dt);
 }else if(throttle<0)state.speed=clamp(state.speed-(state.speed>0?36:8)*dt,-REVERSE_SPEED,topSpeed);
 else state.speed=approach(state.speed,0,(1.8+.0035*state.speed*state.speed)*dt);
 const maxSteer=STEERING_LOCK/(1+Math.abs(state.speed)/11);
 state.steering+=(steer*maxSteer-state.steering)*(1-Math.exp(-9*dt));
 if(state.grounded&&!spinning)state.yaw-=state.speed/WHEELBASE*Math.tan(state.steering)*dt;
 const oldX=state.x,oldZ=state.z,sin=Math.sin(state.yaw),cos=Math.cos(state.yaw);
 let x=oldX+sin*state.speed*dt,z=oldZ+cos*state.speed*dt;
 const proposedX=x,proposedZ=z;
 // A short capsule approximates the kart's width/length, including the tires.
 for(const offset of [-.35,.35]){
  const oldPX=oldX+Math.sin(previousYaw)*offset,oldPZ=oldZ+Math.cos(previousYaw)*offset;
  const targetX=x+sin*offset,targetZ=z+cos*offset;
  const resolved=world.resolveHorizontal(oldPX,oldPZ,targetX,targetZ,state.y,1.18,1.8);
  x+=resolved.x-targetX;z+=resolved.z-targetZ;
 }
 if(Math.hypot(x-proposedX,z-proposedZ)>.001){
  // Remove inward motion and guide the kart along the rail, with only a
  // tiny outward bias. Reflection made glancing hits fling it across the road.
  const correctionX=x-proposedX,correctionZ=z-proposedZ,length=Math.hypot(correctionX,correctionZ);
  const nx=correctionX/length,nz=correctionZ/length,vx=sin*state.speed,vz=cos*state.speed;
  if(vx*nx+vz*nz<0){
   const tx=-nz,tz=nx,incoming=Math.abs(state.speed),along=vx*tx+vz*tz;
   // A direct hit has no meaningful tangent. Use the requested turn (or a
   // consistent default) so holding forward cannot pin the nose to the wall.
   const direction=Math.abs(along)>incoming*.08?Math.sign(along):-(Math.sign(steer)||1);
   const loss=state.railContactTime>0?Math.exp(-.10*dt):.96;
   const speed=incoming*loss,away=.018,sign=Math.sign(state.speed)||1;
   const dx=tx*direction+nx*away,dz=tz*direction+nz*away;
   state.speed=speed*sign;state.yaw=Math.atan2(dx*sign,dz*sign);
   x+=nx*.015;z+=nz*.015;state.steering*=.7;state.railContactTime=.22;
  }
 }
 state.x=x;state.z=z;
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
 return runner.grounded&&kart.grounded&&Math.hypot(runner.x-kart.x,runner.z-kart.z)<4.5&&Math.abs(runner.y-kart.y)<.7&&Math.abs(kart.speed)<.75;
}
export function findExitPosition(kart,world){
 if(!kart.grounded||Math.abs(kart.speed)>.75)return null;
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
export function resolveParkedKart(x,z,feetY,kart){
 if(feetY>kart.y+1.2||feetY+2.3<kart.y)return{x,z};
 const sin=Math.sin(kart.yaw),cos=Math.cos(kart.yaw),dx=x-kart.x,dz=z-kart.z;
 let localX=dx*cos-dz*sin,localZ=dx*sin+dz*cos;
 const nearestX=clamp(localX,-1.18,1.18),nearestZ=clamp(localZ,-1.5,1.5);
 let nx=localX-nearestX,nz=localZ-nearestZ,length=Math.hypot(nx,nz);
 if(length>=.42)return{x,z};
 if(length<1e-6){
  if(1.18-Math.abs(localX)<1.5-Math.abs(localZ)){localX=Math.sign(localX||1)*1.60;}
  else localZ=Math.sign(localZ||1)*1.92;
 }else{localX=nearestX+nx/length*.42;localZ=nearestZ+nz/length*.42;}
 return{x:kart.x+localX*cos+localZ*sin,z:kart.z-localX*sin+localZ*cos};
}
