import {NITRO_TOP_SPEED} from '../vehicle-controller.js';
import {projectRaceCourse} from '../race-course.js';

export function createRaceProgress(progress=0){return{progress,previousProgress:null,completed:0,passed:0,finishedAt:null};}
function crossing(gate,a,b,course){
 const before=(a.x-gate.x)*gate.fx+(a.z-gate.z)*gate.fz,after=(b.x-gate.x)*gate.fx+(b.z-gate.z)*gate.fz;
 if(before>1e-7||after<0||after-before<1e-8)return null;
 const t=Math.max(0,Math.min(1,-before/(after-before))),x=a.x+(b.x-a.x)*t-gate.x,z=a.z+(b.z-a.z)*t-gate.z;
 return Math.abs(x*gate.fz-z*gate.fx)<=course.halfWidth+course.curbWidth+.5&&Math.abs(a.y+(b.y-a.y)*t-gate.y)<1.25?t:null;
}
// Independent race scoring has no storage, ghost frames or Time Trial writes.
export function stepRaceProgress(racer,course,previous,current,dt,elapsed,laps){
 if(racer.finishedAt!==null)return;
 const a=projectRaceCourse(previous,course),b=projectRaceCourse(current,course);if(!a||!b)return;
 const old=racer.previousProgress??a.progress;racer.previousProgress=b.progress;
 let delta=b.progress-old;if(delta>course.length/2)delta-=course.length;if(delta< -course.length/2)delta+=course.length;
 const travel=Math.hypot(current.x-previous.x,current.z-previous.z);
 if(b.distance>course.halfWidth+course.curbWidth+.7||b.height>.85||current.grounded===false||travel>(NITRO_TOP_SPEED+2)*dt+.75||Math.abs(delta)>travel*2+2)return;
 racer.progress+=delta;
 const next=racer.passed<12?racer.passed+1:0,gate=course.gates[next],target=racer.completed*course.length+(next?gate.distance:course.length);
 if(Math.abs(racer.progress-target)>8)return;
 const hit=crossing(gate,previous,current,course);if(hit===null)return;
 if(next)racer.passed++;
 else{racer.completed++;racer.passed=0;if(racer.completed===laps)racer.finishedAt=elapsed+dt*hit;}
}
export function raceOrder(racers,course){
 const score=r=>Math.min(r.progress,r.completed*course.length+(r.passed+1)*course.length/13);
 return [...racers].sort((a,b)=>a.finishedAt!==null&&b.finishedAt!==null?a.finishedAt-b.finishedAt:a.finishedAt!==null?-1:b.finishedAt!==null?1:score(b)-score(a));
}
