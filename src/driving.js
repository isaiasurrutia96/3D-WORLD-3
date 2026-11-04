export const TRACK={radius:75,halfStraight:100,width:18};
export const KART_MAX_SPEED=32;
export function createKart(){return {x:75,z:0,yaw:0,speed:0,steer:0,wheelSpin:0,gate:0,laps:0,lapTime:0,lastLap:0,lapStarted:false};}
export function roadDistance(x,z){return Math.hypot(x,z-Math.max(-TRACK.halfStraight,Math.min(TRACK.halfStraight,z)));}
export function stepKart(kart,input,dt){
  const throttle=Math.max(0,Math.min(1,input.throttle||0)),brake=Math.max(0,Math.min(1,input.brake||0));
  if(throttle)kart.speed+=16*throttle*dt;
  else if(brake)kart.speed-=(kart.speed>0.2?28:9)*brake*dt;
  else kart.speed*=Math.exp(-0.8*dt);
  kart.speed=Math.max(-8,Math.min(KART_MAX_SPEED,kart.speed));
  if(Math.abs(kart.speed)<0.03)kart.speed=0;
  kart.steer+=(Math.max(-1,Math.min(1,input.steer||0))-kart.steer)*(1-Math.exp(-9*dt));
  const angle=kart.steer*0.6/(1+Math.abs(kart.speed)*0.065);
  kart.yaw+=kart.speed*Math.tan(angle)/2.4*dt;
  kart.x+=Math.sin(kart.yaw)*kart.speed*dt;kart.z+=Math.cos(kart.yaw)*kart.speed*dt;
  const spineZ=Math.max(-TRACK.halfStraight,Math.min(TRACK.halfStraight,kart.z));
  let nx=kart.x,nz=kart.z-spineZ;const distance=Math.hypot(nx,nz);
  const allowed=Math.max(TRACK.radius-TRACK.width/2+1.2,Math.min(TRACK.radius+TRACK.width/2-1.2,distance));
  if(Math.abs(allowed-distance)>0.001){nx/=distance||1;nz/=distance||1;kart.x=nx*allowed;kart.z=spineZ+nz*allowed;kart.speed*=Math.exp(-12*dt);}
  kart.wheelSpin+=kart.speed/0.38*dt;
  if(Math.abs(kart.speed)>0.1)kart.lapStarted=true;
  if(kart.lapStarted)kart.lapTime+=dt;
  const gates=[[0,175],[-75,0],[0,-175],[75,0]],gate=gates[kart.gate];
  if(Math.hypot(kart.x-gate[0],kart.z-gate[1])<23){
    kart.gate++;
    if(kart.gate===gates.length){kart.gate=0;kart.laps++;kart.lastLap=kart.lapTime;kart.lapTime=0;}
  }
}
