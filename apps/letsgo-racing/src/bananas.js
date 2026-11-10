import {startHitSpin} from './kart-hit.js';
import {projectRaceCourse} from './race-course.js';
import {absorbShieldImpact} from './shield.js';

export const BANANA_OWNER_GRACE=.65,MAX_BANANAS=64;

export function dropBanana(system,kart,world){
 if(kart.grounded===false)return false;
 const x=kart.x-Math.sin(kart.yaw)*3,z=kart.z-Math.cos(kart.yaw)*3;
 const y=world?world.supportHeight(x,z,kart.y+1.5):kart.y;
 if(y===null||Math.abs(y-kart.y)>1.5)return false;
 const course=(system.courses??[]).find(c=>{const p=projectRaceCourse({x,y,z},c);return p&&p.height<.8&&p.distance<c.halfWidth+c.curbWidth;});
 system.bananas.push({id:system.nextBanana++,owner:kart,x,y,z,age:0,course:course?.id??null});
 if(system.bananas.length>MAX_BANANAS)system.bananas.shift();
 return true;
}

export function startBananaSlip(kart,side){
 const speed=Math.hypot(kart.speed,kart.lateralSpeed??0);
 kart.speed*=.65;kart.lateralSpeed=(Math.sign(side)||1)*Math.min(7,speed*.18);
 kart.boostTime=0;kart.impactRecovery=Math.max(kart.impactRecovery??0,.12);
 startHitSpin(kart);
}

// Hazard cleanup follows the player's forward finish crossing, without writing
// any lap/ghost records or treating a start-line crossing as a scored lap.
export function clearFinishedBananas(system,previous,current){
 if(!previous||!current)return;
 for(const course of system.courses??[]){
  const gate=course.gates[0],before=(previous.x-gate.x)*gate.fx+(previous.z-gate.z)*gate.fz,after=(current.x-gate.x)*gate.fx+(current.z-gate.z)*gate.fz;
  if(before>=-1e-7||after<0)continue;
  const t=-before/(after-before),x=previous.x+(current.x-previous.x)*t-gate.x,z=previous.z+(current.z-previous.z)*t-gate.z,y=previous.y+(current.y-previous.y)*t;
  if(Math.abs(x*gate.fz-z*gate.fx)<=course.halfWidth+course.curbWidth&&Math.abs(y-gate.y)<1.25)system.bananas=system.bananas.filter(b=>b.course!==course.id);
 }
}

export function stepBananas(system,actors,dt,world){
 system.bananas=system.bananas.filter(banana=>{
  banana.age+=dt;
  const ground=world?.supportHeight(banana.x,banana.z,banana.y+.3);
  if(world&&(ground===null||Math.abs(ground-banana.y)>.3))return false;
  for(const actor of actors){
   const kart=actor.state,previous=actor.previous??kart;
   if(kart.grounded===false||kart===banana.owner&&banana.age<BANANA_OWNER_GRACE)continue;
   const dx=kart.x-previous.x,dz=kart.z-previous.z,span=dx*dx+dz*dz;
   const t=span?Math.max(0,Math.min(1,((banana.x-previous.x)*dx+(banana.z-previous.z)*dz)/span)):0;
   const previousY=previous.y??kart.y,x=previous.x+dx*t,z=previous.z+dz*t,y=previousY+(kart.y-previousY)*t;
   if(Math.abs(y-banana.y)>1.1||Math.hypot(x-banana.x,z-banana.z)>1.5)continue;
   const side=(x-banana.x)*Math.cos(kart.yaw)-(z-banana.z)*Math.sin(kart.yaw);
   const absorbed=absorbShieldImpact(kart,'banana',banana);
   if(!absorbed)startBananaSlip(kart,side||kart.steering);
   system.hits.push({target:kart,owner:banana.owner,item:'banana',absorbed});
   return false;
  }
  return true;
 });
}
