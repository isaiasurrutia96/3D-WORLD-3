export function defineCourse({id,name,samples,startIndex,storageKey,legacyStorageKey=null,entrance,halfWidth=13,curbWidth=1.1}){
 const count=samples.length-1,length=samples.at(-1).distance,startDistance=samples[startIndex].distance;
 const course={id,name,samples,startIndex,storageKey,legacyStorageKey,entrance,halfWidth,curbWidth,count,length,startDistance,cells:new Map()};
 const wrap=value=>((value%length)+length)%length;
 const atDistance=distance=>{
  const d=wrap(startDistance+distance),i=Math.min(count-1,Math.floor(d/length*count)),a=samples[i].point,b=samples[i+1].point,t=(d-samples[i].distance)/(samples[i+1].distance-samples[i].distance),span=Math.hypot(b.x-a.x,b.z-a.z);
  return{x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,z:a.z+(b.z-a.z)*t,fx:(b.x-a.x)/span,fz:(b.z-a.z)/span,distance};
 };
 course.gates=Array.from({length:13},(_,i)=>({...atDistance(i*length/13),index:i}));
 course.start={x:course.gates[0].x,y:course.gates[0].y,z:course.gates[0].z,yaw:Math.atan2(course.gates[0].fx,course.gates[0].fz)};
 const padding=halfWidth+curbWidth+2;
 for(let i=0;i<count;i++){
  const a=samples[i].point,b=samples[i+1].point,dx=b.x-a.x,dz=b.z-a.z,segment={a,b,dx,dz,length2:dx*dx+dz*dz,distance:samples[i].distance,span:samples[i+1].distance-samples[i].distance};
  for(let x=Math.floor((Math.min(a.x,b.x)-padding)/32);x<=Math.floor((Math.max(a.x,b.x)+padding)/32);x++)for(let z=Math.floor((Math.min(a.z,b.z)-padding)/32);z<=Math.floor((Math.max(a.z,b.z)+padding)/32);z++){
   const key=`${x},${z}`;if(!course.cells.has(key))course.cells.set(key,[]);course.cells.get(key).push(segment);
  }
 }
 return course;
}

export function projectRaceCourse(p,course){
 let best=null,cost=Infinity;
 for(const s of course.cells.get(`${Math.floor(p.x/32)},${Math.floor(p.z/32)}`)??[]){
  const t=Math.max(0,Math.min(1,((p.x-s.a.x)*s.dx+(p.z-s.a.z)*s.dz)/s.length2));
  const x=s.a.x+s.dx*t,z=s.a.z+s.dz*t,y=s.a.y+(s.b.y-s.a.y)*t,distance=Math.hypot(p.x-x,p.z-z),height=Math.abs(p.y-y),score=distance*distance+height*height*9;
  if(score<cost){cost=score;best={distance,height,progress:((s.distance+s.span*t-course.startDistance)%course.length+course.length)%course.length};}
 }
 return best;
}
