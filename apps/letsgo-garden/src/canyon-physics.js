export const CANYON_TOP_SPEED=120*.44704;
export const CANYON_KART_RADIUS=1.25;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const approach=(v,target,step)=>v<target?Math.min(target,v+step):Math.max(target,v-step);

export function createCanyonState(route){
 const p=route.samples[Math.ceil(route.count*3/route.length)];
 return {x:p.x,y:p.y,z:p.z,yaw:Math.atan2(p.tx,p.tz),speed:0,lateral:0,steering:0,hold:0,holdDirection:0,wheel:0,pitch:0,contact:0,elapsed:0,lastLap:null,lap:1,nextGate:1,progress:route.nearest(p.x,p.z).progress,started:false};
}

export function stepCanyonKart(state,input,dt,route){
 const steer=clamp(input.steer||0,-1,1),throttle=clamp(input.throttle||0,-1,1);
 state.contact=Math.max(0,state.contact-dt);
 if(throttle>0)state.speed=Math.min(CANYON_TOP_SPEED,state.speed+(state.speed<0?32:24)*dt);
 else if(throttle<0)state.speed=Math.max(-6,state.speed-(state.speed>0?34:8)*dt);
 else state.speed=approach(state.speed,0,(1.8+.0035*state.speed*state.speed)*dt);
 if(steer&&Math.sign(steer)===state.holdDirection)state.hold+=dt;else{state.hold=0;state.holdDirection=Math.sign(steer);}
 const held=clamp((state.hold-.5)/.8,0,1),lock=.415/(1+Math.abs(state.speed)/11)*(1+.2*held*held*(3-2*held));
 const target=steer*lock,building=target*state.steering>=0&&Math.abs(target)>Math.abs(state.steering);
 state.steering+=(target-state.steering)*(1-Math.exp(-(building?6.5:14)*dt));
 const turnSpeed=state.contact>0&&throttle>0?Math.max(2,state.speed):state.speed;
 state.yaw+=turnSpeed/2.03*Math.tan(state.steering)*dt;
 state.lateral*=Math.exp(-8*dt);
 const sx=Math.sin(state.yaw),cz=Math.cos(state.yaw);
 let vx=sx*state.speed+cz*state.lateral,vz=cz*state.speed-sx*state.lateral;
 state.x+=vx*dt;state.z+=vz*dt;
 const road=route.nearest(state.x,state.z),limit=route.width/2-CANYON_KART_RADIUS;
 if(road.distance>limit){
  const nx=(state.x-road.x)/road.distance,nz=(state.z-road.z)/road.distance,incoming=vx*nx+vz*nz;
  state.x=road.x+nx*limit;state.z=road.z+nz*limit;
  if(incoming>0){
   const bounce=state.contact<=0&&incoming>2?.08:0;
   vx-=(1+bounce)*incoming*nx;vz-=(1+bounce)*incoming*nz;
   const along=vx*road.tx+vz*road.tz,friction=Math.exp(-1.2*dt);
   vx+=road.tx*along*(friction-1);vz+=road.tz*along*(friction-1);state.contact=.14;
  }
 }
 state.speed=vx*sx+vz*cz;state.lateral=vx*cz-vz*sx;state.y=road.y;state.wheel+=state.speed*dt/.34;
 const front=route.nearest(state.x+sx,state.z+cz),back=route.nearest(state.x-sx,state.z-cz);
 state.pitch+=(-Math.atan2(front.y-back.y,2)-state.pitch)*(1-Math.exp(-10*dt));
 if(!state.started&&Math.abs(state.speed)>.5)state.started=true;
 if(state.started)state.elapsed+=dt;
 const delta=(road.progress-state.progress+1)%1;
 if(state.started&&delta<.1){
  const gate=state.nextGate/4;
  if(state.nextGate<4&&state.progress<gate&&road.progress>=gate)state.nextGate++;
  if(state.nextGate===4&&state.progress>.9&&road.progress<.1){state.lastLap=state.elapsed;state.elapsed=0;state.lap++;state.nextGate=1;}
 }
 state.progress=road.progress;
}
