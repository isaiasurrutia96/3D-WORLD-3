import {BufferGeometry,Color,Float32BufferAttribute,Group,Mesh,MeshBasicMaterial,DoubleSide} from 'three';
import {POOL,noise} from './layout.js';
const color=new Color();
function panel(points,normal,tint,alpha=1){
 color.set(tint);return{points,inner:points,normal,x:points[0][0],y:points[0][1],z:points[0][2],css:color.getStyle(),rim:color.getStyle(),color:color.toArray(),alpha,water:true};
}
export function createWaterFaces(world){
 const faces=[];
 for(let x=POOL.minX;x<POOL.maxX;x++)for(let z=POOL.minZ;z<POOL.maxZ;z++){
  if(world.get(x,0,z)?.type!=='water')continue;
  const y=POOL.level;
  faces.push(panel([[x,y,z+1],[x+1,y,z+1],[x+1,y,z],[x,y,z]],[0,1,0],noise(x,0,z)>.5?'#43c9e1':'#33bddb',.91));
  if(noise(x,1,z)>.42)faces.push(panel([[x+.12,y+.012,z+.24],[x+.65,y+.012,z+.24],[x+.65,y+.012,z+.15],[x+.12,y+.012,z+.15]],[0,1,0],'#e0fbff',.8));
 }
 // Separate transparent ribbons and small trailing blocks match the reference's
 // pixel-like waterfall. No opaque black underside or reflective water shader.
 for(let z=POOL.minZ;z<POOL.maxZ;z++){
  faces.push(panel([[38.98,POOL.level,z+.06],[39.14,POOL.level,z+.06],[39.14,POOL.level,z+.94],[38.98,POOL.level,z+.94]],[0,1,0],'#a0eff5',.8));
  for(let step=0;step<23;step++){
   const top=POOL.level-step*1.18,bottom=top-1.22,x=POOL.maxX+.12+Math.sin(step/23*Math.PI)*.45;
   const alpha=.68*(1-step/28),points=[[x,top,z+.06],[x,bottom,z+.06],[x,bottom,z+.94],[x,top,z+.94]];
   faces.push(panel(points,[1,0,0],z%2?'#64d6ed':'#9de8f5',alpha));
   faces.push(panel([...points].reverse(),[-1,0,0],'#6bdbec',alpha*.65));
   if(z%2===0)faces.push(panel([[x+.012,top,z+.18],[x+.012,bottom,z+.18],[x+.012,bottom,z+.3],[x+.012,top,z+.3]],[1,0,0],'#f0fdff',alpha*.85));
  }
  for(let drop=0;drop<4;drop++){
   const y=-27-drop*1.6-noise(z,drop,0),x=POOL.maxX+.3+noise(z,0,drop)*.5,size=.45-drop*.065;
   faces.push(panel([[x,y,z+.3],[x,y-size,z+.3],[x,y-size,z+.3+size],[x,y,z+.3+size]],[1,0,0],'#a8eeff',.42-drop*.09));
  }
 }
 return faces;
}
export function createWaterMeshes(faces){
 const positions=[],colors=[],indices=[];
 for(const face of faces){if(face.normal[0]===-1)continue;const base=positions.length/3;positions.push(...face.points.flat());for(let i=0;i<4;i++)colors.push(...face.color,face.alpha);indices.push(base,base+1,base+2,base,base+2,base+3);}
 const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(positions,3));geometry.setAttribute('color',new Float32BufferAttribute(colors,4));geometry.setIndex(indices);
 const material=new MeshBasicMaterial({vertexColors:true,transparent:true,depthWrite:false,side:DoubleSide}),mesh=new Mesh(geometry,material),group=new Group();mesh.name='Turquoise pool and transparent waterfall';group.add(mesh);return group;
}
