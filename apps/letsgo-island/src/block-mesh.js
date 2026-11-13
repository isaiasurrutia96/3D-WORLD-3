import {BufferGeometry,Color,Float32BufferAttribute,Group,Mesh,MeshBasicMaterial} from 'three';
import {DIRECTIONS} from './blocks.js';
import {noise} from './layout.js';
const palette={grass:'#9bd12b',earth:'#be884e',stone:'#93919b',trunk:'#99612e',leaf:'#85bd20',leafLight:'#a1ce2b',rock:'#bab7bd',path:'#d7c6a2',berry:'#8cb92b',cloud:'#ffffff'};
const corners=[[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]];
export function facePoints(face,inset=0,lift=0){
 const {n,u,v}=DIRECTIONS[face.direction];
 return corners.map(([a,b])=>[face.x+.5+n[0]*(.5+lift)+u[0]*a*(1-inset*2)+v[0]*b*(1-inset*2),face.y+.5+n[1]*(.5+lift)+u[1]*a*(1-inset*2)+v[1]*b*(1-inset*2),face.z+.5+n[2]*(.5+lift)+u[2]*a*(1-inset*2)+v[2]*b*(1-inset*2)]);
}
function shadowFactor(world,face){
 if(face.direction!==2||face.type==='cloud')return 1;let hit=0;
 for(const offset of [-.35,.35])for(let d=1;d<20;d++){
  const block=world.get(Math.floor(face.x+.5-d*.68+offset),face.y+1+d,Math.floor(face.z+.5-d*.42));
  if(block&&block.type!=='cloud'){hit++;break;}
 }
 return 1-hit*.22;
}
export function prepareFaces(world){
 return [...world.exposedFaces()].map(face=>{
  const normal=DIRECTIONS[face.direction].n;
  const light=face.type==='cloud'?[.88,.97,1,.76,.93,.89][face.direction]:[.76,.94,1,.56,.84,.9][face.direction];
  const color=new Color(palette[face.type]??'#b8b8b8').multiplyScalar(light*(.91+noise(face.x,face.y,face.z)*.18)*shadowFactor(world,face));
  return{...face,normal,points:facePoints(face),inner:facePoints(face,.065,.025),color:color.toArray(),css:color.getStyle(),rim:color.clone().multiplyScalar(.84).getStyle()};
 });
}
export function createBlockMeshes(faces){
 const group=new Group();group.name='Editable grid blocks, exposed faces only';const chunks=new Map(),material=new MeshBasicMaterial({vertexColors:true});
 for(const face of faces){
  const key=`${Math.floor(face.x/16)},${Math.floor(face.z/16)}`;
  if(!chunks.has(key))chunks.set(key,{positions:[],colors:[],indices:[]});
  const batch=chunks.get(key),base=batch.positions.length/3;batch.positions.push(...face.points.flat(),...face.inner.flat());
  for(let i=0;i<8;i++)batch.colors.push(...face.color.map(c=>c*(i<4?.82:1)));
  batch.indices.push(base+4,base+5,base+6,base+4,base+6,base+7);
  for(let i=0;i<4;i++){const j=(i+1)%4;batch.indices.push(base+i,base+j,base+4+i,base+j,base+4+j,base+4+i);}
 }
 for(const [key,batch]of chunks){
  const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(batch.positions,3));geometry.setAttribute('color',new Float32BufferAttribute(batch.colors,3));geometry.setIndex(batch.indices);geometry.computeBoundingSphere();
  const mesh=new Mesh(geometry,material);mesh.name=`Block chunk ${key}`;group.add(mesh);
 }
 group.userData.faces=faces.length;group.userData.triangles=faces.length*10;return group;
}
