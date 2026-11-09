const wrap=(v,length)=>((v%length)+length)%length;
export function coursePoint(course,progress,offset=0){
 const d=wrap(course.startDistance+progress,course.length),i=Math.min(course.count-1,Math.floor(d/course.length*course.count)),a=course.samples[i],b=course.samples[i+1],t=(d-a.distance)/(b.distance-a.distance);
 let nx=a.normal.x+(b.normal.x-a.normal.x)*t,nz=a.normal.z+(b.normal.z-a.normal.z)*t;const n=Math.hypot(nx,nz);nx/=n;nz/=n;
 return{x:a.point.x+(b.point.x-a.point.x)*t+nx*offset,y:a.point.y+(b.point.y-a.point.y)*t,z:a.point.z+(b.point.z-a.point.z)*t+nz*offset,nx,nz,fx:nz,fz:-nx};
}
export {wrap};
