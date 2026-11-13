import {BufferGeometry,Color,Float32BufferAttribute,Group,Mesh,MeshBasicMaterial,DoubleSide} from 'three';
import {POOL,FALL} from './layout.js';
const color=new Color();
function panel(points,normal,tint,alpha=1,back=false){
 color.set(tint);return{points,inner:points,normal,x:points[0][0],y:points[0][1],z:points[0][2],css:color.getStyle(),rim:color.getStyle(),color:color.toArray(),alpha,water:true,back};
}
export function createWaterFaces(world){
 const faces=[],y=POOL.level;
 function line(a,b,width,tint,alpha=.75){
  const dx=b[0]-a[0],dz=b[1]-a[1],length=Math.hypot(dx,dz),nx=-dz/length*width*.5,nz=dx/length*width*.5;
  faces.push(panel([[a[0]+nx,y+.012,a[1]+nz],[b[0]+nx,y+.012,b[1]+nz],[b[0]-nx,y+.012,b[1]-nz],[a[0]-nx,y+.012,a[1]-nz]],[0,1,0],tint,alpha));
 }
 for(const cell of world.cells.values()){
  if(cell.type!=='water'||cell.y!==0)continue;const {x,z}=cell;
  faces.push(panel([[x,y,z+1],[x+1,y,z+1],[x+1,y,z],[x,y,z]],[0,1,0],(x+z)%3===0?'#21c6df':'#15bad6',.94));
  // Fixed repeating caustic cells; these never alter the pond outline.
  const pattern=[[.15,.05],[.75,.05],[1,.45],[.7,.96],[.1,.8],[-.02,.4]];
  for(let i=0;i<pattern.length-1;i++)line(pattern[i].map((v,j)=>v+(j?z:x)),pattern[i+1].map((v,j)=>v+(j?z:x)),.026,'#d6fcff',.65);
 }
 const u=[FALL.nz,-FALL.nx],point=(s,t,height)=>[FALL.x+u[0]*s+FALL.nx*t,height,FALL.z+u[1]*s+FALL.nz*t];
 faces.push(panel([point(-1.1,-.8,y),point(1.1,-.8,y),point(1.1,.02,y),point(-1.1,.02,y)],[0,1,0],'#60dfec',.86));
 for(let strand=0;strand<3;strand++){
  const left=-FALL.width*.5+strand*FALL.width/3,right=left+FALL.width/3-.035;
  for(let row=0;row<23;row++){
   const top=y-row*1.04,bottom=top-1.07,t=.2*Math.sin(row/23*Math.PI*.5),normal=[FALL.nx,0,FALL.nz],alpha=.76*(1-row/29);
   const points=[point(left,t,top),point(left,t,bottom),point(right,t,bottom),point(right,t,top)];
   faces.push(panel(points,normal,strand===1?'#72e0ef':'#3ecbe7',alpha));
   faces.push(panel([...points].reverse(),normal.map(value=>-value),'#71e2ee',alpha*.65,true));
   if(strand!==1)faces.push(panel([point(left+.09,t+.012,top),point(left+.09,t+.012,bottom),point(left+.16,t+.012,bottom),point(left+.16,t+.012,top)],normal,'#eeffff',alpha*.9));
  }
 }
 for(const [s,depth,size]of [[-.75,24,.3],[.25,24.5,.25],[.75,25,.25],[-.25,25.5,.2],[-.5,26,.2],[.5,26.5,.15],[0,27.5,.15],[-.25,28,.1]]){
  const top=y-depth;faces.push(panel([point(s,.25,top),point(s,.25,top-size),point(s+size,.25,top-size),point(s+size,.25,top)],[FALL.nx,0,FALL.nz],'#c6f8ff',.7));
 }
 return faces;
}
export function createWaterMeshes(faces){
 const positions=[],colors=[],indices=[];
 for(const face of faces){if(face.back)continue;const base=positions.length/3;positions.push(...face.points.flat());for(let i=0;i<4;i++)colors.push(...face.color,face.alpha);indices.push(base,base+1,base+2,base,base+2,base+3);}
 const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(positions,3));geometry.setAttribute('color',new Float32BufferAttribute(colors,4));geometry.setIndex(indices);
 const material=new MeshBasicMaterial({vertexColors:true,transparent:true,depthWrite:false,side:DoubleSide}),mesh=new Mesh(geometry,material),group=new Group();mesh.name='Reference pond and narrow waterfall';group.add(mesh);return group;
}
