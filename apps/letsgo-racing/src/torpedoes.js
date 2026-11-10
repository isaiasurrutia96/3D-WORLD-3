import {projectRaceCourse} from './race-course.js';
import {coursePoint,wrap} from './npc/course-line.js';
import {startHitSpin} from './kart-hit.js';
import {absorbShieldImpact} from './shield.js';

export const TORPEDO_SPEED=200*.44704,TORPEDO_LIFETIME=30,TORPEDO_CRUISE_LIFETIME=20,TORPEDO_BURST_SECONDS=.35,MAX_TORPEDOES=16;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const angle=v=>Math.atan2(Math.sin(v),Math.cos(v));
const signedGap=(v,length)=>wrap(v+length/2,length)-length/2;
const onRoad=(p,c)=>p&&p.height<1&&p.distance<c.halfWidth+c.curbWidth;
const laneLimit=c=>c.halfWidth+c.curbWidth-.5;

export function resetTorpedoes(system){
 system.torpedoes=[];system.torpedoBursts=[];system.torpedoPositions=new WeakMap();system.torpedoAnchors=new Map();
}

// Unwrap race progress so a driver crossing the finish line remains ahead,
// and a distant leader does not become a target behind as the gap grows.
export function trackTorpedoPositions(system,states){
 system.torpedoPositions??=new WeakMap();system.torpedoAnchors??=new Map();
 for(const state of states){
  let positions=system.torpedoPositions.get(state);
  if(!positions){positions=new Map();system.torpedoPositions.set(state,positions);}
  for(const course of system.courses??[]){
   const p=projectRaceCourse(state,course);if(!onRoad(p,course))continue;
   if(!system.torpedoAnchors.has(course.id))system.torpedoAnchors.set(course.id,p.progress);
   const old=positions.get(course.id),distance=old?old.distance+signedGap(p.progress-old.progress,course.length):signedGap(p.progress-system.torpedoAnchors.get(course.id),course.length);
   positions.set(course.id,{progress:p.progress,distance});
  }
 }
}

function locate(system,state){
 let best=null;
 for(const course of system.courses??[]){const p=projectRaceCourse(state,course);if(onRoad(p,course)&&(!best||p.distance<best.distance))best={...p,course};}
 return best;
}

export function findTorpedoTarget(system,owner,targets){
 trackTorpedoPositions(system,[owner,...targets]);let best=null;
 for(const target of targets){
  if(target===owner||target.grounded===false)continue;
  if(system.courses?.length){
   for(const course of system.courses){
    const a=projectRaceCourse(owner,course),b=projectRaceCourse(target,course);
    if(!onRoad(a,course)||!onRoad(b,course))continue;
    const own=system.torpedoPositions.get(owner).get(course.id),other=system.torpedoPositions.get(target).get(course.id),ahead=other.distance-own.distance,gap=wrap(b.progress-a.progress,course.length);
    if(ahead>2.8&&(!best||ahead<best.ahead))best={target,course,gap,ahead,progress:a.progress};
   }
  }else{
   const dx=target.x-owner.x,dz=target.z-owner.z,gap=Math.hypot(dx,dz);
   if(gap>2.8&&Math.abs(target.y-owner.y)<1.1&&(dx*Math.sin(owner.yaw)+dz*Math.cos(owner.yaw))/gap>.35&&(!best||gap<best.gap))best={target,course:null,gap};
  }
 }
 return best;
}

export function launchTorpedo(system,kart,targets){
 if(kart.grounded===false)return false;
 const lock=findTorpedoTarget(system,kart,targets),road=lock??locate(system,kart),course=road?.course??null;
 let x=kart.x+Math.sin(kart.yaw)*2.8,y=kart.y,z=kart.z+Math.cos(kart.yaw)*2.8,lane=0,progress=0;
 if(course){
  const center=coursePoint(course,road.progress);lane=clamp((kart.x-center.x)*center.nx+(kart.z-center.z)*center.nz,-laneLimit(course),laneLimit(course));
  progress=road.progress+2.8;({x,y,z}=coursePoint(course,progress,lane));
 }
 system.torpedoes.push({id:system.nextTorpedo++,owner:kart,target:lock?.target??null,course,progress,lane,x,y,z,yaw:kart.yaw,vx:Math.sin(kart.yaw)*TORPEDO_SPEED,vz:Math.cos(kart.yaw)*TORPEDO_SPEED,age:0,phase:lock?'homing':'cruising',gap:lock?.gap??Infinity});
 if(system.torpedoes.length>MAX_TORPEDOES)system.torpedoes.shift();
 system.itemMessage='';return true;
}

function explode(system,torpedo,reason){
 system.torpedoBursts.push({id:torpedo.id,x:torpedo.x,y:torpedo.y+.6,z:torpedo.z,age:0,reason});
 if(system.torpedoBursts.length>MAX_TORPEDOES*2)system.torpedoBursts.shift();
 return false;
}

export function stepTorpedoes(system,actors,dt,world){
 system.torpedoBursts=(system.torpedoBursts??[]).filter(b=>{b.age+=dt;return b.age<TORPEDO_BURST_SECONDS;});
 const present=new Set(actors.map(a=>a.state));
 system.torpedoes=system.torpedoes.filter(torpedo=>{
  torpedo.age+=dt;
  if(torpedo.age>=(torpedo.target?TORPEDO_LIFETIME:TORPEDO_CRUISE_LIFETIME)-1e-8)return explode(system,torpedo,'expired');
  if(!world||torpedo.target&&!present.has(torpedo.target))return explode(system,torpedo,'lost target');
  const target=torpedo.target,projection=target&&torpedo.course?projectRaceCourse(target,torpedo.course):null;
  if(target&&torpedo.course&&!onRoad(projection,torpedo.course))return explode(system,torpedo,'off course');
  const count=Math.max(1,Math.ceil(TORPEDO_SPEED*dt/.3)),step=dt/count;
  for(let i=0;i<count;i++){
   const old={x:torpedo.x,y:torpedo.y,z:torpedo.z};let nx,nz,expectedY=torpedo.y;
   if(torpedo.course){
    const course=torpedo.course;let gap=Infinity,offset=0;
    if(target){
     gap=wrap(projection.progress-torpedo.progress,course.length);
     // Once alongside, keep following a target that brakes or reverses too.
     if(gap>course.length-32)gap-=course.length;
     const c=coursePoint(course,projection.progress);offset=clamp((target.x-c.x)*c.nx+(target.z-c.z)*c.nz,-laneLimit(course),laneLimit(course));
     torpedo.gap=Math.abs(gap);
    }
    const forward=clamp(gap,-20,20),side=offset-torpedo.lane,factor=Math.min(1,TORPEDO_SPEED*step/Math.max(.000001,Math.hypot(forward,side)));
    torpedo.progress+=forward*factor;torpedo.lane+=side*factor;
    const p=coursePoint(course,torpedo.progress,torpedo.lane);nx=p.x;nz=p.z;expectedY=p.y;
   }else if(target){
    const dx=target.x-old.x,dz=target.z-old.z,distance=Math.hypot(dx,dz),factor=Math.min(1,TORPEDO_SPEED*step/Math.max(.000001,distance));
    nx=old.x+dx*factor;nz=old.z+dz*factor;torpedo.gap=distance;
   }else{nx=old.x+Math.sin(torpedo.yaw)*TORPEDO_SPEED*step;nz=old.z+Math.cos(torpedo.yaw)*TORPEDO_SPEED*step;}
   const resolved=world.resolveHorizontal(old.x,old.z,nx,nz,old.y+.2,.35,.8),contact=Math.hypot(resolved.x-nx,resolved.z-nz)>.001;
   if(contact&&!target)return explode(system,torpedo,'rail');
   nx=resolved.x;nz=resolved.z;
   const height=world.supportHeight(nx,nz,expectedY+.9);
   if(height===null||Math.abs(height-expectedY)>1)return explode(system,torpedo,'unsupported road');
   const travel=Math.hypot(nx-old.x,nz-old.z);
   if(travel>1e-7)torpedo.yaw=Math.atan2(nx-old.x,nz-old.z);
   torpedo.vx=(nx-old.x)/step;torpedo.vz=(nz-old.z)/step;
   torpedo.x=nx;torpedo.y=height;torpedo.z=nz;
   if(contact&&torpedo.course){const p=projectRaceCourse(torpedo,torpedo.course);torpedo.progress=p.progress;const c=coursePoint(torpedo.course,p.progress);torpedo.lane=(nx-c.x)*c.nx+(nz-c.z)*c.nz;}
   for(const actor of actors){
    const kart=actor.state;if(kart===torpedo.owner||target&&kart!==target)continue;
    const previous=actor.previous??kart,a=i/count,b=(i+1)/count;
    const ax=old.x-(previous.x+(kart.x-previous.x)*a),az=old.z-(previous.z+(kart.z-previous.z)*a),bx=nx-(previous.x+(kart.x-previous.x)*b),bz=nz-(previous.z+(kart.z-previous.z)*b),dx=bx-ax,dz=bz-az,span=dx*dx+dz*dz;
    const t=span?clamp(-(ax*dx+az*dz)/span,0,1):0,y=old.y+(height-old.y)*t,kartY=(previous.y??kart.y)+(kart.y-(previous.y??kart.y))*(a+(b-a)*t);
    if(Math.hypot(ax+dx*t,az+dz*t)>1.6||Math.abs(y-kartY)>1.1)continue;
    const absorbed=absorbShieldImpact(kart,'torpedo',torpedo);
    if(!absorbed){kart.speed*=.28;kart.boostTime=0;kart.impactRecovery=Math.max(kart.impactRecovery??0,.25);startHitSpin(kart);}
    system.hits.push({target:kart,owner:torpedo.owner,item:'torpedo',absorbed});return explode(system,torpedo,absorbed?'shield':'hit');
   }
  }
  return true;
 });
}

export function torpedoWarning(system,kart){
 let closest=null;
 for(const torpedo of system.torpedoes){
  if(torpedo.target!==kart)continue;
  const dx=torpedo.x-kart.x,dz=torpedo.z-kart.z,distance=torpedo.gap;
  if(distance>160||closest&&distance>=closest.distance)continue;
  const bearing=angle(Math.atan2(dx,dz)-kart.yaw),arrow=Math.abs(bearing)<Math.PI/4?'↑':Math.abs(bearing)>Math.PI*3/4?'↓':bearing>0?'→':'←';
  closest={distance,arrow,imminent:distance<=32};
 }
 return closest;
}
