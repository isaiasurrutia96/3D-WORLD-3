export const COURSE_SURFACES = [
  ...Array.from({length:8},(_,index)=>({
    kind:'step',minX:-3,maxX:3,minZ:8+index,maxZ:9+index,height:(index+1)*0.3,
  })),
  {kind:'platform',minX:-3,maxX:3,minZ:16,maxZ:20,height:2.4},
  {kind:'platform',minX:-3,maxX:3,minZ:23,maxZ:27,height:2.4},
  {kind:'platform',minX:-3,maxX:3,minZ:30,maxZ:34,height:2.4},
  {kind:'ramp',minX:-3,maxX:3,minZ:34,maxZ:46,height:2.4,endHeight:0},
];
export const contains=(surface,x,z)=>x>=surface.minX && x<=surface.maxX && z>=surface.minZ && z<=surface.maxZ;
export function surfaceHeight(surface,z){
  return surface.kind==='ramp'
    ? surface.height+(surface.endHeight-surface.height)*Math.max(0,Math.min(1,(z-surface.minZ)/(surface.maxZ-surface.minZ)))
    : surface.height;
}
export const CHECKPOINTS=[
  {name:'STAIRS',x:0,z:18.5,y:2.4,radius:2.2},
  {name:'GAP JUMPS',x:0,z:32,y:2.4,radius:2.2},
  {name:'RAMP',x:0,z:48,y:0,radius:2.4},
  {name:'LADDER',x:-9,z:-5,y:5,radius:2.2},
  {name:'SWIM',x:17,z:0,y:-1.8,radius:7},
  {name:'FINISH',x:0,z:-6,y:0,radius:2.2},
];
export function createCourse(){return {next:0,elapsed:0,started:false,finished:false};}
export function updateCourse(course,player,dt){
  if(course.finished)return;
  if(Math.hypot(player.vx,player.vz)>0.5)course.started=true;
  if(course.started)course.elapsed+=dt;
  const checkpoint=CHECKPOINTS[course.next];
  const correctMode=checkpoint.name==='SWIM'?player.mode==='swim':player.grounded;
  if(correctMode && Math.hypot(player.x-checkpoint.x,player.z-checkpoint.z)<checkpoint.radius && Math.abs(player.y-checkpoint.y)<0.8){
    course.next++;if(course.next===CHECKPOINTS.length)course.finished=true;
  }
}
