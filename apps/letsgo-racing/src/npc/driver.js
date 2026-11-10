import {createVehicleState,STEERING_LOCK,HELD_STEER_DELAY,HELD_STEER_RAMP,HELD_STEER_GAIN,VEHICLE_TOP_SPEED,NITRO_TOP_SPEED} from '../vehicle-controller.js';
import {projectRaceCourse} from '../race-course.js';
import {coursePoint,wrap} from './course-line.js';
import {ORIGINAL_COURSE} from '../courses.js';
import {ORIGINAL_NPC_REFERENCE} from './original-reference.js';
import {findTorpedoTarget} from '../torpedoes.js';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const angle=v=>Math.atan2(Math.sin(v),Math.cos(v));
export function referenceAt(progress,reference=ORIGINAL_NPC_REFERENCE){
 const index=wrap(progress,reference.length)/reference.length*reference.samples.length,i=Math.floor(index),a=reference.samples[i],b=reference.samples[(i+1)%reference.samples.length],t=index-i;
 return{offset:a[0]+(b[0]-a[0])*t,speed:a[1]+(b[1]-a[1])*t};
}
export function createNpcDriver({course=ORIGINAL_COURSE,reference=ORIGINAL_NPC_REFERENCE,progress=12,offset=2.8}={}){
 if(reference.course!==course.id||Math.abs(reference.length-course.length)>.01)throw Error('NPC reference belongs to a different course layout.');
 const p=coursePoint(course,progress,offset),state={...createVehicleState(),x:p.x,y:p.y,z:p.z,yaw:Math.atan2(p.fx,p.fz),heldItem:'nitro'};
 return{state,previous:{...state},course,reference,progress,startProgress:progress,lastProgress:progress,elapsed:0,finished:false,laneBias:0,passSide:0,passTime:0,stuckTime:0,reverseTime:0,torpedoCooldown:0,targetSpeed:0,lastInput:{throttle:0,steer:0,brake:false}};
}
function curvature(a,b,c){
 const ab=Math.hypot(b.x-a.x,b.z-a.z),bc=Math.hypot(c.x-b.x,c.z-b.z),ca=Math.hypot(c.x-a.x,c.z-a.z);
 return 2*Math.abs((b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x))/Math.max(.001,ab*bc*ca);
}
// The brain returns ordinary controls. Only stepVehicle moves the kart.
export function readNpcInput(driver,dt,{traffic=[],boxes=[],torpedoSystem=null}={}){
 const {state,course,reference}=driver,projection=projectRaceCourse(state,course);
 driver.torpedoCooldown=Math.max(0,(driver.torpedoCooldown??0)-dt);
 if(!projection)return{throttle:0,steer:0,brake:true,useItem:false};
 const delta=angle((projection.progress-driver.lastProgress)/course.length*Math.PI*2)/Math.PI/2*course.length;
 driver.progress+=delta;driver.lastProgress=projection.progress;if(!driver.finished)driver.elapsed+=dt;
 if(driver.progress-driver.startProgress>=course.length-.5)driver.finished=true;
 const progress=projection.progress,center=coursePoint(course,progress),ownOffset=(state.x-center.x)*center.nx+(state.z-center.z)*center.nz;
 const guide=referenceAt(progress,reference);let bias=0,leader=null,gap=Infinity;
 driver.passTime=Math.max(0,driver.passTime-dt);
 for(const kart of traffic){
  if(kart===state||Math.abs(kart.y-state.y)>2.5)continue;
  const p=projectRaceCourse(kart,course);if(!p)continue;const ahead=wrap(p.progress-progress,course.length);
  if(ahead<gap&&ahead<Math.max(55,state.speed*1.25)){leader=kart;gap=ahead;}
 }
 if(leader){
  const p=projectRaceCourse(leader,course),c=coursePoint(course,p.progress),otherOffset=(leader.x-c.x)*c.nx+(leader.z-c.z)*c.nz;
  if(Math.abs(guide.offset-otherOffset)<4.5){
   if(!driver.passTime){const candidates=[-5.5,5.5].map(v=>({v,offset:clamp(guide.offset+v,-9.5,9.5)}));candidates.sort((a,b)=>Math.abs(b.offset-otherOffset)-Math.abs(a.offset-otherOffset));driver.passSide=candidates[0].v;driver.passTime=2.5;}
  }
 }
 if(driver.passTime)bias=driver.passSide;
 // An empty slot can aim for an available box, within the normal road width.
 if(!leader&&!state.heldItem){
  let best=Infinity;
  for(const box of boxes){
   if(box.cooldown>0||Math.abs(box.y-state.y)>2.5)continue;
   const p=projectRaceCourse(box,course);if(!p)continue;const ahead=wrap(p.progress-progress,course.length);if(ahead<4||ahead>100)continue;
   const c=coursePoint(course,p.progress),off=(box.x-c.x)*c.nx+(box.z-c.z)*c.nz,difference=off-referenceAt(p.progress,reference).offset,cost=ahead+Math.abs(difference)*5;
   if(cost<best){best=cost;bias=clamp(difference,-5.5,5.5);}
  }
 }
 driver.laneBias+=(bias-driver.laneBias)*(1-Math.exp(-1.5*dt));
 const point=d=>coursePoint(course,progress+d,clamp(referenceAt(progress+d,reference).offset+driver.laneBias,-9.8,9.8));
 const look=clamp(9+Math.max(0,state.speed)*.44,11,43),target=point(look),dx=target.x-state.x,dz=target.z-state.z;
 const side=dx*Math.cos(state.yaw)-dz*Math.sin(state.yaw),wheel=-Math.atan2(2*2.03*side,Math.max(4,dx*dx+dz*dz));
 const hold=clamp((state.steerHoldTime-HELD_STEER_DELAY)/HELD_STEER_RAMP,0,1),gain=1+HELD_STEER_GAIN*hold*hold*(3-2*hold),maxSteer=STEERING_LOCK/(1+Math.abs(state.speed)/11)*gain;
 const steer=clamp(wheel/maxSteer,-1,1);
 let speed=Math.min(NITRO_TOP_SPEED,referenceAt(progress+look,reference).speed*.98),cornerSpeed=NITRO_TOP_SPEED;
 for(const distance of [0,15,35,60,95,140]){
  const k=curvature(point(distance-12),point(distance),point(distance+12)),allowed=k<1e-6?NITRO_TOP_SPEED:clamp(11*(STEERING_LOCK*.96/Math.atan(2.03*k)-1),12,NITRO_TOP_SPEED);
  cornerSpeed=Math.min(cornerSpeed,Math.sqrt(allowed*allowed+2*26*Math.max(0,distance-18)));
 }
 speed=Math.min(speed,cornerSpeed);
 if(leader&&gap<25){const c=coursePoint(course,progress),otherOffset=(leader.x-c.x)*c.nx+(leader.z-c.z)*c.nz;if(Math.abs(otherOffset-ownOffset)<3.3)speed=Math.min(speed,Math.max(0,leader.speed)+Math.max(0,gap-7)*.8);}
 const alignment=Math.abs(angle(Math.atan2(dx,dz)-state.yaw));
 if(alignment>.65)speed=Math.min(speed,20);
 if(driver.finished)speed=0;
 driver.targetSpeed=speed;
 driver.stuckTime=state.speed<2&&state.railContactTime>0?driver.stuckTime+dt:0;
 if(driver.stuckTime>1.2&&!driver.finished){driver.reverseTime=.8;driver.stuckTime=0;}
 driver.reverseTime=Math.max(0,driver.reverseTime-dt);
 const input=driver.reverseTime?{throttle:-1,steer:-steer,brake:false,useItem:false}:{throttle:state.speed<speed+.15?1:0,steer,brake:state.speed>speed+1.4,useItem:!driver.finished&&state.heldItem==='nitro'&&state.boostTime<.1&&state.speed>15&&speed>VEHICLE_TOP_SPEED+3&&alignment<.3};
 if(state.heldItem==='shell'&&!driver.finished){
  const targetKart=traffic.find(k=>k!==state&&Math.abs(k.y-state.y)<1.5&&Math.hypot(k.x-state.x,k.z-state.z)<100&&Math.cos(angle(Math.atan2(k.x-state.x,k.z-state.z)-state.yaw))>.99);
  input.useItem=!!targetKart||(!leader&&alignment<.06&&cornerSpeed>65);
 }
 if(state.heldItem==='nitro'&&input.brake)input.useItem=false;
 if(state.heldItem==='banana'&&!driver.finished)input.useItem=state.speed>12&&alignment<.2&&!input.brake;
 if(state.heldItem==='torpedo'&&!driver.finished){
  const lock=findTorpedoTarget(torpedoSystem??{courses:[course]},state,traffic);
  input.useItem=!!lock&&lock.gap>=65&&driver.torpedoCooldown===0&&state.speed>10&&alignment<.4&&!input.brake;
 }
 if(state.spinTime>0)input.useItem=false;
 if(driver.finished){input.throttle=0;input.brake=true;input.useItem=false;}
 if(input.useItem&&state.heldItem==='torpedo')driver.torpedoCooldown=5;
 driver.lastInput=input;return input;
}
