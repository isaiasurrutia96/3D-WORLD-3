export const HIT_SPIN_SECONDS=.75;

export function startHitSpin(state){
 // A second hit must not snap an in-progress turn back to its first pose.
 if(!(state.spinTime>0))state.spinTime=HIT_SPIN_SECONDS;
}
export function hitSpinAngle(state){
 const remaining=state.spinTime??0;if(remaining<=0)return 0;
 const t=Math.max(0,Math.min(1,1-remaining/HIT_SPIN_SECONDS));
 return Math.PI*2*t*t*t*(t*(t*6-15)+10);
}
export function interpolateHitSpin(previous,current,alpha){
 const a=previous.spinTime??0,b=current.spinTime??0;
 return b>a?b:a+(b-a)*alpha;
}
