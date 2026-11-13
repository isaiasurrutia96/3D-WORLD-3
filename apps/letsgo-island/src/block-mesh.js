import {BufferGeometry,Color,DataTexture,Float32BufferAttribute,Group,InstancedMesh,Mesh,MeshBasicMaterial,MeshLambertMaterial,MeshStandardMaterial,Object3D,RepeatWrapping,RGBAFormat} from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {DIRECTIONS} from './blocks.js';
import {noise} from './layout.js';
import {QUALITY} from './quality.js';
const palette={grass:'#98d02b',earth:'#bf8b50',stone:'#9996a0',trunk:'#9f6937',leaf:'#7eb91e',leafLight:'#9dcb2b',rock:'#b9b6bd',path:'#d8cbb0',berry:'#8bb828',cloud:'#ffffff'};
const corners=[[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]];
export function facePoints(face,inset=0,lift=0){
 const {n,u,v}=DIRECTIONS[face.direction];
 return corners.map(([a,b])=>[face.x+.5+n[0]*(.5+lift)+u[0]*a*(1-inset*2)+v[0]*b*(1-inset*2),face.y+.5+n[1]*(.5+lift)+u[1]*a*(1-inset*2)+v[1]*b*(1-inset*2),face.z+.5+n[2]*(.5+lift)+u[2]*a*(1-inset*2)+v[2]*b*(1-inset*2)]);
}
function shadowFactor(world,face){
 if(face.direction!==2||face.type==='cloud')return 1;let hit=0;
 for(const offset of [-.35,.35])for(let d=1;d<24;d++){
  const block=world.get(Math.floor(face.x+.5-d*.68+offset),face.y+1+d,Math.floor(face.z+.5-d*.42));
  if(block&&!['cloud','water'].includes(block.type)){hit++;break;}
 }
 return 1-hit*.22;
}
export function prepareFaces(world){
 return [...world.exposedFaces()].filter(face=>face.type!=='water').map(face=>{
  const normal=DIRECTIONS[face.direction].n,light=[.8,.97,1,.6,.88,.93][face.direction];
  const variation=.92+noise(face.x,face.y,face.z)*.16,base=new Color(palette[face.type]??'#b8b8b8').multiplyScalar(variation);
  const color=base.clone().multiplyScalar(light*shadowFactor(world,face));
  let neighbors=0;for(let i=0;i<DIRECTIONS.length;i++){const n=DIRECTIONS[i].n,cell=world.get(face.x+n[0],face.y+n[1],face.z+n[2]);if(cell&&cell.type!=='water')neighbors|=1<<i;}
  return{...face,normal,neighbors,points:facePoints(face),inner:facePoints(face,.055,.015),color:color.toArray(),baseColor:base.toArray(),css:color.getStyle(),rim:color.clone().multiplyScalar(.88).getStyle()};
 });
}
function grain(){
 const size=64,bytes=new Uint8Array(size*size*4);
 for(let i=0;i<size*size;i++){const value=190+Math.round(noise(i%size,0,Math.floor(i/size))*65);bytes.set([value,value,value,255],i*4);}
 const texture=new DataTexture(bytes,size,size,RGBAFormat);texture.wrapS=texture.wrapT=RepeatWrapping;texture.needsUpdate=true;return texture;
}
function materialFor(level){
 if(level==='high')return new MeshStandardMaterial({vertexColors:true,roughness:.86,metalness:0,bumpMap:grain(),bumpScale:.025});
 if(level==='medium')return new MeshLambertMaterial({vertexColors:true});
 return new MeshBasicMaterial({vertexColors:true});
}
export function createBlockMeshes(faces,level='low'){
 const settings=QUALITY[level],group=new Group();group.name='Rounded editable block island';
 const chunks=new Map(),material=materialFor(level);let triangles=0;
 for(const face of faces){
  const sky=face.type==='cloud',key=Math.floor(face.x/16)+','+Math.floor(face.z/16)+(sky?',cloud':'');
  if(!chunks.has(key))chunks.set(key,{positions:[],normals:[],colors:[],uvs:[],indices:[],sky});
  const batch=chunks.get(key),{n,u,v}=DIRECTIONS[face.direction],radius=.12;
  const coordinates=settings.segments===2?[-.5,-.5+radius*.3,-.5+radius,.5-radius,.5-radius*.3,.5]:[-.5,-.5+radius,.5-radius,.5];
  const size=coordinates.length,base=batch.positions.length/3,color=level==='low'?face.color:face.baseColor;
  for(const b of coordinates)for(const a of coordinates){
   const p=n.map((axis,i)=>axis*.5+u[i]*a+v[i]*b);
   // Do not round an edge into an occupied neighbor: matching boundary vertices
   // then stay exactly on the shared cell plane instead of leaving a blue slit.
   const core=p.map((value,axis)=>{const positive=face.neighbors&(1<<(axis*2)),negative=face.neighbors&(1<<(axis*2+1));return Math.max(negative ? -.5 : -.5+radius,Math.min(positive ? .5 : .5-radius,value));});
   const delta=p.map((value,i)=>value-core[i]),length=Math.hypot(...delta),normal=delta.map(value=>value/length);
   // A shallow cushion on each face keeps the small blocks individually legible.
   // The cushion falls to zero at the shared boundary, which remains sealed.
   const fa=Math.min(1,(.5-Math.abs(a))/radius),fb=Math.min(1,(.5-Math.abs(b))/radius),height=.045*fa*fb;
   const da=Math.abs(a)>.5-radius?-.045*Math.sign(a)*fb/radius:0,db=Math.abs(b)>.5-radius?-.045*Math.sign(b)*fa/radius:0;
   const smooth=normal.map((value,i)=>value-u[i]*da-v[i]*db),normalLength=Math.hypot(...smooth);
   batch.positions.push(face.x+.5+core[0]+normal[0]*radius+n[0]*height,face.y+.5+core[1]+normal[1]*radius+n[1]*height,face.z+.5+core[2]+normal[2]*radius+n[2]*height);
   batch.normals.push(...smooth.map(value=>value/normalLength));batch.colors.push(...color);batch.uvs.push(a+.5,b+.5);
  }
  for(let j=0;j<size-1;j++)for(let i=0;i<size-1;i++){const a=base+j*size+i,b=a+1,c=a+size,d=c+1;batch.indices.push(a,b,d,a,d,c);triangles+=2;}
  // The recessed full-cell backing seals the visual grooves under rounded tops.
  const backing=batch.positions.length/3;
  batch.positions.push(...facePoints(face,0,-.16).flat());
  for(let i=0;i<4;i++){batch.normals.push(...n);batch.colors.push(...color.map(c=>c*.86));batch.uvs.push(...[corners[i][0]+.5,corners[i][1]+.5]);}
  batch.indices.push(backing,backing+1,backing+2,backing,backing+2,backing+3);triangles+=2;
 }
 for(const [key,batch]of chunks){
  const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(batch.positions,3));geometry.setAttribute('normal',new Float32BufferAttribute(batch.normals,3));geometry.setAttribute('color',new Float32BufferAttribute(batch.colors,3));geometry.setAttribute('uv',new Float32BufferAttribute(batch.uvs,2));geometry.setIndex(batch.indices);geometry.computeBoundingSphere();
  const mesh=new Mesh(geometry,material);mesh.name='Rounded block chunk '+key;mesh.castShadow=settings.shadows&&!batch.sky;mesh.receiveShadow=settings.shadows&&!batch.sky;group.add(mesh);
 }
 const berryFaces=faces.filter(face=>face.type==='berry'&&face.direction===2);
 if(berryFaces.length){
  const geometry=new RoundedBoxGeometry(.25,.22,.25,1,.06),berryMaterial=level==='low'?new MeshBasicMaterial():new MeshLambertMaterial(),berries=new InstancedMesh(geometry,berryMaterial,berryFaces.length*3),o=new Object3D();let i=0;
  for(const face of berryFaces)for(const [dx,dz,tint]of [[.22,.25,'#df7134'],[.72,.65,'#edae36'],[.65,.2,'#e76135']]){
   o.position.set(face.x+dx,face.y+1.02,face.z+dz);o.updateMatrix();berries.setMatrixAt(i,o.matrix);berries.setColorAt(i++,new Color(tint));
  }
  berries.computeBoundingSphere();berries.name='Small colored berries';group.add(berries);triangles+=geometry.attributes.position.count/3*berryFaces.length*3;
 }
 group.userData.faces=faces.length;group.userData.triangles=triangles;return group;
}
export function disposeBlockMeshes(group){
 const materials=new Set();group.traverse(object=>{if(object.isMesh){object.geometry.dispose();materials.add(object.material);}});
 for(const material of materials){material.bumpMap?.dispose();material.dispose();}
}
