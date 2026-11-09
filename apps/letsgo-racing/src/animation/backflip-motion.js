// One standing backflip. Timing is shared by the controller and the authored
// pose clip: the feet leave only after extension, and recover after contact.
export const BACKFLIP_DURATION=1.65;
export const TAKEOFF=.32,TOUCHDOWN=1.16;
export const BACKFLIP_GRAVITY=22;
export const BACKFLIP_LAUNCH_SPEED=BACKFLIP_GRAVITY*(TOUCHDOWN-TAKEOFF)/2;
export const BACKFLIP_BACK_SPEED=1.25;
export const PHASES=[{time:0,label:'Neutral'},{time:.08,label:'Crouch'},{time:.22,label:'Push-off'},{time:.43,label:'Tuck'},{time:.57,label:'Backward rotation'},{time:.94,label:'Extension'},{time:1.16,label:'Landing'},{time:1.46,label:'Neutral'}];
// time, whole-body pitch, hip, knee, ankle, shoulder, elbow, arm spread, chest
export const KEYS=[
 [0,0,0,0,0,0,0,0,0],
 [.08,5,-30,56,-26,24,-15,3,3],
 [.20,12,-62,115,-53,55,-28,6,4],
 [.26,4,-34,60,-26,-65,-20,7,1],
 [.32,-8,-4,10,20,-155,-15,8,0],
 [.43,-35,-20,50,-20,-140,-55,9,-3],
 [.55,-105,-85,135,-40,-65,-110,10,-6],
 [.74,-195,-105,145,-45,-35,-120,9,-8],
 [.92,-285,-70,115,-45,-45,-95,9,-4],
 [1.05,-342,-28,60,-32,-55,-40,11,0],
 [1.16,-360,-15,30,-15,-40,-30,11,0],
 [1.25,-360,-48,90,-42,-26,-40,7,4],
 [1.46,-360,0,0,0,0,0,0,0],
 [1.65,-360,0,0,0,0,0,0,0],
];
// Shape-preserving cubic interpolation. Unlike an ease at every key, this
// retains angular momentum through the tuck while avoiding joint overshoot.
function slope(index,channel){
 if(index===0||index===KEYS.length-1)return 0;
 const a=KEYS[index-1],b=KEYS[index],c=KEYS[index+1],h0=b[0]-a[0],h1=c[0]-b[0],d0=(b[channel]-a[channel])/h0,d1=(c[channel]-b[channel])/h1;
 if(d0*d1<=0)return 0;const w0=2*h1+h0,w1=h1+2*h0;return(w0+w1)/(w0/d0+w1/d1);
}
function channel(time,n){let i=0;while(i<KEYS.length-2&&time>KEYS[i+1][0])i++;const a=KEYS[i],b=KEYS[i+1],h=b[0]-a[0],t=Math.max(0,Math.min(1,(time-a[0])/h));return(2*t**3-3*t*t+1)*a[n]+(t**3-2*t*t+t)*h*slope(i,n)+(-2*t**3+3*t*t)*b[n]+(t**3-t*t)*h*slope(i+1,n);}
export function backflipHeight(time){const t=Math.max(0,Math.min(TOUCHDOWN-TAKEOFF,time-TAKEOFF));return Math.max(0,BACKFLIP_LAUNCH_SPEED*t-.5*BACKFLIP_GRAVITY*t*t);}
export function sampleBackflip(time){const t=Math.max(0,Math.min(BACKFLIP_DURATION,time)),u=Math.max(0,Math.min(1,(t-TAKEOFF)/(TOUCHDOWN-TAKEOFF)));return{t,u,airborne:t>TAKEOFF&&t<TOUCHDOWN,pitch:channel(t,1),hip:channel(t,2),knee:channel(t,3),ankle:channel(t,4),shoulder:channel(t,5),elbow:channel(t,6),spread:channel(t,7),chest:channel(t,8),height:backflipHeight(t)};}
