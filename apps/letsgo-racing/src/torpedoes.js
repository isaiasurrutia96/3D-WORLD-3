import {projectRaceCourse} from './race-course.js';
import {coursePoint,wrap} from './npc/course-line.js';
import {startHitSpin} from './kart-hit.js';

export const TORPEDO_SPEED=110,TORPEDO_RANGE=360,TORPEDO_COMMIT_DISTANCE=32,TORPEDO_LIFETIME=12,MAX_TORPEDOES=16;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const angle=v=>Math.atan2(Math.sin(v),Math.cos(v));
const onRoad=(p,c)=>p&&p.height<1&&p.distance<c.halfWidth+c.curbWidth;

export function findTorpedoTarget(system,owner,targets){
 let best=null;
 for(const target of targets){
  if(target===owner||target.grounded===false)continue;
  if(system.courses?.length){
   for(const course of system.courses){
    const a=projectRaceCourse(owner,course),b=projectRaceCourse(target,course);
    if(!onRoad(a,course)||!onRoad(b,course))continue;
    const gap=wrap(b.progress-a.progress,course.length);
    if(gap>2.8&&gap<=TORPEDO_RANGE&&(!best||gap<best.gap))best={target,course,gap,progress:a.progress};
   }
  }else{
   const dx=target.x-owner.x,dz=target.z-owner.z,gap=Math.hypot(dx,dz);
   if(gap>2.8&&gap<=TORPEDO_RANGE&&Math.abs(target.y-owner.y)<1.1&&(dx*Math.sin(owner.yaw)+dz*Math.cos(owner.yaw))/gap>.35&&(!best||gap<best.gap))best={target,course:null,gap};
  }
 }
 return best;
}

export function launchTorpedo(system,kart,targets){
 if(kart.grounded===false)return false;
 const lock=findTorpedoTarget(system,kart,targets);
 if(!lock){system.itemMessage='No rival ahead — get behind the other kart';system.itemMessageUntil=system.time+2;return false;}
 const {target,course}=lock;let x=kart.x+Math.sin(kart.yaw)*2.8,y=kart.y,z=kart.z+Math.cos(kart.yaw)*2.8,lane=0,progress=0;
 if(course){
  const center=coursePoint(course,lock.progress);lane=clamp((kart.x-center.x)*center.nx+(kart.z-center.z)*center.nz,-11.5,11.5);
  progress=lock.progress+2.8;({x,y,z}=coursePoint(course,progress,lane));
 }
 system.torpedoes.push({id:system.nextTorpedo++,owner:kart,target,course,progress,lane,x,y,z,yaw:kart.yaw,vx:Math.sin(kart.yaw)*TORPEDO_SPEED,vz:Math.cos(kart.yaw)*TORPEDO_SPEED,age:0,phase:'homing',committedTime:0,gap:lock.gap});
 if(system.torpedoes.length>MAX_TORPEDOES)system.torpedoes.shift();
 system.itemMessage='';return true;
}

function commit(torpedo){
 const target=torpedo.target,lead=Math.min(.3,Math.hypot(target.x-torpedo.x,target.z-torpedo.z)/TORPEDO_SPEED),speed=Math.max(0,target.speed??0);
 torpedo.yaw=Math.atan2(target.x+Math.sin(target.yaw)*speed*lead-torpedo.x,target.z+Math.cos(target.yaw)*speed*lead-torpedo.z);
 torpedo.vx=Math.sin(torpedo.yaw)*TORPEDO_SPEED;torpedo.vz=Math.cos(torpedo.yaw)*TORPEDO_SPEED;
 torpedo.phase='committed';
}

export function stepTorpedoes(system,actors,dt,world){
 const present=new Set(actors.map(a=>a.state));
 system.torpedoes=system.torpedoes.filter(torpedo=>{
  torpedo.age+=dt;if(torpedo.age>TORPEDO_LIFETIME||!present.has(torpedo.target)||!world)return false;
  const target=torpedo.target,projection=torpedo.course?projectRaceCourse(target,torpedo.course):null;
  if(torpedo.phase==='homing'){
   if(torpedo.course&&!onRoad(projection,torpedo.course))return false;
   const gap=torpedo.course?wrap(projection.progress-torpedo.progress,torpedo.course.length):Math.hypot(target.x-torpedo.x,target.z-torpedo.z);
   torpedo.gap=gap;if(gap>TORPEDO_RANGE+100)return false;
   if(gap<=TORPEDO_COMMIT_DISTANCE)commit(torpedo);
  }
  const count=Math.max(1,Math.ceil(TORPEDO_SPEED*dt/.3)),step=dt/count;
  for(let i=0;i<count;i++){
   const old={x:torpedo.x,y:torpedo.y,z:torpedo.z};let nx,nz,expectedY=torpedo.y;
   if(torpedo.phase==='homing'&&torpedo.course){
    const c=coursePoint(torpedo.course,projection.progress),offset=clamp((target.x-c.x)*c.nx+(target.z-c.z)*c.nz,-11.5,11.5);
    torpedo.lane+=clamp(offset-torpedo.lane,-10*step,10*step);torpedo.progress+=TORPEDO_SPEED*step;
    const p=coursePoint(torpedo.course,torpedo.progress,torpedo.lane);nx=p.x;nz=p.z;expectedY=p.y;torpedo.yaw=Math.atan2(nx-old.x,nz-old.z);
    torpedo.vx=Math.sin(torpedo.yaw)*TORPEDO_SPEED;torpedo.vz=Math.cos(torpedo.yaw)*TORPEDO_SPEED;
   }else{
    if(torpedo.phase==='homing'){
     const desired=Math.atan2(target.x-torpedo.x,target.z-torpedo.z);torpedo.yaw+=clamp(angle(desired-torpedo.yaw),-2.8*step,2.8*step);
     torpedo.vx=Math.sin(torpedo.yaw)*TORPEDO_SPEED;torpedo.vz=Math.cos(torpedo.yaw)*TORPEDO_SPEED;
    }else{torpedo.committedTime+=step;if(torpedo.committedTime>1.2)return false;}
    nx=old.x+torpedo.vx*step;nz=old.z+torpedo.vz*step;
   }
   const resolved=world.resolveHorizontal(old.x,old.z,nx,nz,old.y+.2,.35,.8);
   if(Math.hypot(resolved.x-nx,resolved.z-nz)>.001)return false;
   const height=world.supportHeight(nx,nz,expectedY+.9);
   if(height===null||Math.abs(height-expectedY)>1)return false;
   torpedo.x=nx;torpedo.y=height;torpedo.z=nz;
   for(const actor of actors){
    const kart=actor.state;if(kart===torpedo.owner)continue;
    const previous=actor.previous??kart,a=i/count,b=(i+1)/count;
    const ax=old.x-(previous.x+(kart.x-previous.x)*a),az=old.z-(previous.z+(kart.z-previous.z)*a),bx=nx-(previous.x+(kart.x-previous.x)*b),bz=nz-(previous.z+(kart.z-previous.z)*b),dx=bx-ax,dz=bz-az,span=dx*dx+dz*dz;
    const t=span?clamp(-(ax*dx+az*dz)/span,0,1):0,y=old.y+(height-old.y)*t,kartY=(previous.y??kart.y)+(kart.y-(previous.y??kart.y))*(a+(b-a)*t);
    if(Math.hypot(ax+dx*t,az+dz*t)>1.6||Math.abs(y-kartY)>1.1)continue;
    kart.speed*=.28;kart.boostTime=0;kart.impactRecovery=Math.max(kart.impactRecovery??0,.25);startHitSpin(kart);
    system.hits.push({target:kart,owner:torpedo.owner,item:'torpedo'});return false;
   }
  }
  return true;
 });
}

export function torpedoWarning(system,kart){
 let closest=null;
 for(const torpedo of system.torpedoes){
  if(torpedo.target!==kart)continue;
  const dx=torpedo.x-kart.x,dz=torpedo.z-kart.z;
  if(torpedo.phase==='committed'&&torpedo.vx*dx+torpedo.vz*dz>=0)continue;
  const distance=torpedo.phase==='homing'?torpedo.gap:Math.hypot(dx,dz);
  if(distance>160||closest&&distance>=closest.distance)continue;
  const bearing=angle(Math.atan2(dx,dz)-kart.yaw),arrow=Math.abs(bearing)<Math.PI/4?'↑':Math.abs(bearing)>Math.PI*3/4?'↓':bearing>0?'→':'←';
  closest={distance,arrow,committed:torpedo.phase==='committed'};
 }
 return closest;
}
