export const CANYON_WIDTH = 8.6;
export const CANYON_CURB = .43;
export const CANYON_BLOCK = .43;
export const CANYON_BRIDGES = [{name:'North bridge',z:-54},{name:'South bridge',z:36}];

// A single authored ring, not several loops connected at junctions. The two
// canyon crossings are part of this ring. Coordinates and widths are metres.
const segments=[];
const line=(a,b)=>segments.push({length:Math.hypot(b[0]-a[0],b[1]-a[1]),point:t=>({x:a[0]+(b[0]-a[0])*t,z:a[1]+(b[1]-a[1])*t,tx:Math.sign(b[0]-a[0]),tz:0})});
const arc=(x,z,start,end)=>segments.push({length:Math.abs(end-start)*9,point:t=>{const a=start+(end-start)*t,s=Math.sign(end-start);return{x:x+9*Math.cos(a),z:z+9*Math.sin(a),tx:-Math.sin(a)*s,tz:Math.cos(a)*s};}});
line([0,36],[-33,36]);
for(let i=0;i<5;i++){
 const x=i%2?-22:-33,z=27-i*18;
 arc(x,z,Math.PI/2,i%2?-Math.PI/2:Math.PI*1.5);
 if(i<4)line([x,z-9],[i%2?-33:-22,z-9]);
}
line([-33,-54],[33,-54]);
for(let i=0;i<5;i++){
 const x=i%2?22:33,z=-45+i*18;
 arc(x,z,-Math.PI/2,i%2?-Math.PI*1.5:Math.PI/2);
 if(i<4)line([x,z+9],[i%2?33:22,z+9]);
}
line([33,36],[0,36]);

export function canyonHeight(x,z){
 const north = Math.exp(-Math.pow((z+54)/6,2));
 const south = Math.exp(-Math.pow((z-36)/6,2));
 return 8.28 + Math.exp(-x*x/180)*(3.0*north+1.6*south);
}

export function createCanyonRoute(count=960){
 const length = segments.reduce((sum,s)=>sum+s.length,0);
 const samples = Array.from({length:count+1},(_,i)=>{
  let distance=i/count*length,segment=segments[0];
  for(const s of segments){segment=s;if(distance<=s.length)break;distance-=s.length;}
  const p=segment.point(Math.min(1,distance/segment.length));
  return {...p,y:canyonHeight(p.x,p.z),nx:-p.tz,nz:p.tx,distance:i/count*length};
 });
 function nearest(x,z){
  let best=null,min=Infinity;
  for(let i=0;i<count;i++){
   const a=samples[i],b=samples[i+1],dx=b.x-a.x,dz=b.z-a.z;
   const t=Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz)));
   const px=a.x+dx*t,pz=a.z+dz*t,d2=(x-px)**2+(z-pz)**2;
   if(d2<min){min=d2;const l=Math.hypot(dx,dz);best={index:i,t,x:px,z:pz,y:a.y+(b.y-a.y)*t,tx:dx/l,tz:dz/l,nx:-dz/l,nz:dx/l,progress:(i+t)/count,distance:Math.sqrt(d2)};}
  }
  return best;
 }
 return {samples,length,count,width:CANYON_WIDTH,curb:CANYON_CURB,bridges:CANYON_BRIDGES,nearest};
}

export const CANYON_CELL=4.3;
export function canyonFootprint(inset=0){
 const cells=[];
 for(let x=-14;x<14;x++)for(let z=-18;z<15;z++){
  const px=(x+.5)*CANYON_CELL,pz=(z+.5)*CANYON_CELL;
  const dx=Math.max(0,Math.abs(px)-(42-inset)),dz=Math.max(0,Math.abs(pz+9)-(52-inset));
  const edge=52-inset*.85+3*Math.sin(pz/14)+2*Math.cos(pz/33);
  if(Math.hypot(dx,dz)<16-inset*.12&&Math.abs(px)<edge)cells.push([x,z]);
 }
 return cells;
}

// Trace only the exterior of connected cells. Internal grid edges never
// become rounded seams, so a material band is one continuous surface.
export function cellContours(cells){
 const occupied=new Set(cells.map(p=>p.join(','))),edges=new Map();
 const add=(a,b)=>edges.set(a.join(','),b);
 for(const[x,z]of cells){
  if(!occupied.has(`${x},${z-1}`))add([x,z],[x+1,z]);
  if(!occupied.has(`${x+1},${z}`))add([x+1,z],[x+1,z+1]);
  if(!occupied.has(`${x},${z+1}`))add([x+1,z+1],[x,z+1]);
  if(!occupied.has(`${x-1},${z}`))add([x,z+1],[x,z]);
 }
 const loops=[];
 while(edges.size){
  const start=edges.keys().next().value,points=[],first=start.split(',').map(Number);let p=first;
  do{const key=p.join(',');points.push(p);p=edges.get(key);edges.delete(key);if(!p)throw new Error('An island contour did not connect.');}while(p.join(',')!==start);
  const simple=points.filter((p,i)=>{const a=points[(i+points.length-1)%points.length],b=points[(i+1)%points.length];return (p[0]-a[0])*(b[1]-p[1])!==(p[1]-a[1])*(b[0]-p[0]);});
  loops.push(simple.map(([x,z])=>[x*CANYON_CELL,z*CANYON_CELL]));
 }
 return loops;
}
