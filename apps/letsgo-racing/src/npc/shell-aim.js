import {projectRaceCourse} from '../race-course.js';
import {coursePoint} from './course-line.js';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const angle=v=>Math.atan2(Math.sin(v),Math.cos(v));

// Select one aim style per held shell, not a fresh coin flip every frame.
// A shot always leaves the chassis straight ahead; this only steers the driver.
export function aimNpcShell(driver,target,input,{maxSteer,alignment,cornerSpeed}){
 const {state,course}=driver;
 if(state.heldItem!=='shell'){driver.shellAim=null;return;}
 if(!target||target===state||driver.finished||state.spinTime>0||input.brake||state.speed<5)return;
 const dx=target.x-state.x,dz=target.z-state.z,distance=Math.hypot(dx,dz),bearing=Math.atan2(dx,dz);
 if(distance<10||distance>105||Math.abs(target.y-state.y)>1.1||Math.abs(angle(bearing-state.yaw))>.28||alignment>.25||cornerSpeed<40)return;
 if(!driver.shellAim||driver.shellAim.target!==target){
  const direct=driver.random()<.5;
  driver.shellAim={target,direct,offset:direct?0:(driver.random()<.5?-1:1)*3.8};
 }
 const plan=driver.shellAim,sin=Math.sin(bearing),cos=Math.cos(bearing),aim={x:target.x+cos*plan.offset,y:target.y,z:target.z-sin*plan.offset};
 // Do not aim across the infield, a tight hairpin or a different bridge deck.
 for(let i=1,n=Math.ceil(distance/4);i<=n;i++){
  const p={x:state.x+(aim.x-state.x)*i/n,y:state.y+(aim.y-state.y)*i/n,z:state.z+(aim.z-state.z)*i/n},road=projectRaceCourse(p,course);
  if(!road||road.distance>course.halfWidth-1.2||road.height>.8)return;
 }
 const projected=projectRaceCourse(aim,course),center=coursePoint(course,projected.progress),offset=(aim.x-center.x)*center.nx+(aim.z-center.z)*center.nz;
 if(Math.abs(offset)>9.5)return;
 const ax=aim.x-state.x,az=aim.z-state.z,side=ax*Math.cos(state.yaw)-az*Math.sin(state.yaw),error=angle(Math.atan2(ax,az)-state.yaw);
 // A short steering correction puts the target (or near-miss point) in the
 // center of the kart's actual firing line without changing its yaw directly.
 input.steer=clamp(-Math.atan2(error*3.2*2.03,Math.max(5,state.speed))/maxSteer,-1,1);
 if(Math.abs(side)<.55&&Math.abs(error)<.04){
  input.useItem=true;
  driver.lastShellShot={direct:plan.direct,offset:plan.offset,yaw:state.yaw,targetX:target.x,targetZ:target.z};
  driver.shellAim=null;
 }
}
