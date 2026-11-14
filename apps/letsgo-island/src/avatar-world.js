// Reuse the settled figure and movement, not the other game's scene/startup.
import {Box3,BufferGeometry,DataTexture,Float32BufferAttribute,Group,Mesh,MeshBasicMaterial,MeshLambertMaterial,PlaneGeometry,RGBAFormat,Vector3} from 'three';
import {CollisionWorld} from '../../../src/physics/CollisionWorld.ts';
import {Player} from '../../../src/player/Player.ts';
import {Input} from '../../../src/input/Input.ts';
import {DIRECTIONS} from './blocks.js';
import {POOL,surfaceHeight} from './layout.js';

// One island cell corresponds to the existing controller's 45 cm blocks.
// The approved island's cells, meshes and reference cameras are never rescaled.
export const METRES_PER_CELL=.45,AVATAR_SCALE=1/METRES_PER_CELL;
export const AVATAR_SPAWN=[-16,1.005,14];
const solid=type=>!['water','cloud'].includes(type);
const dot=(point,axis)=>point.reduce((sum,value,i)=>sum+value*axis[i],0);

export function createIslandCollision(world){
 const planes=new Map(),positions=[];
 // Greedy exterior rectangles eliminate tiny collision edges across a lawn or
 // wall. Rounded visual cushions do not become obstacles under the feet.
 for(const face of world.exposedFaces()){
  if(!solid(face.type))continue;
  const {n,u,v}=DIRECTIONS[face.direction],center=[face.x+.5,face.y+.5,face.z+.5];
  const plane=dot(center,n)+.5,key=face.direction+','+plane;
  if(!planes.has(key))planes.set(key,{n,u,v,plane,tiles:new Map()});
  const a=dot(center,u)-.5,b=dot(center,v)-.5;
  planes.get(key).tiles.set(a+','+b,[a,b]);
 }
 for(const {n,u,v,plane,tiles}of planes.values())for(const [key,[a,b]]of tiles){
  if(!tiles.has(key))continue;let width=1,height=1;
  while(tiles.has((a+width)+','+b))width++;
  const row=y=>{for(let x=a;x<a+width;x++)if(!tiles.has(x+','+y))return false;return true;};
  while(row(b+height))height++;
  for(let x=a;x<a+width;x++)for(let y=b;y<b+height;y++)tiles.delete(x+','+y);
  const points=[[a,b],[a+width,b],[a+width,b+height],[a,b+height]].map(([x,y])=>n.map((value,i)=>(value*plane+u[i]*x+v[i]*y)*METRES_PER_CELL));
  for(const index of [0,1,2,0,2,3])positions.push(...points[index]);
 }
 const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(positions,3));
 const mesh=new Mesh(geometry,new MeshBasicMaterial()),collision=new CollisionWorld();
 mesh.name='Seamless island collision surfaces';collision.addSolid(mesh);
 collision.addWater(new Box3(new Vector3(POOL.minX,POOL.bottom+1,POOL.minZ).multiplyScalar(METRES_PER_CELL),new Vector3(POOL.maxX,POOL.level,POOL.maxZ).multiplyScalar(METRES_PER_CELL)),POOL.level*METRES_PER_CELL,
  (x,z)=>world.get(Math.floor(x/METRES_PER_CELL),0,Math.floor(z/METRES_PER_CELL))?.type==='water');
 return{collision,mesh,triangles:positions.length/9,revision:world.revision};
}

function shadowTexture(){
 const size=32,bytes=new Uint8Array(size*size*4);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const radius=Math.hypot((x+.5)/size*2-1,(y+.5)/size*2-1),alpha=Math.max(0,1-radius)**1.8;
  bytes.set([255,255,255,Math.round(alpha*255)],(y*size+x)*4);
 }
 const texture=new DataTexture(bytes,size,size,RGBAFormat);texture.needsUpdate=true;return texture;
}

export function createIslandAvatar(world){
 let collider=createIslandCollision(world),quality='',cheapMaterials=[];const extraSolids=[];
 const spawn=new Vector3(...AVATAR_SPAWN).multiplyScalar(METRES_PER_CELL);
 const player=new Player(collider.collision,spawn,{}, {plain:true}),input=new Input(),root=new Group();
 player.facing=Math.PI;root.name='Existing clay avatar';root.scale.setScalar(AVATAR_SCALE);root.position.y=.1;root.add(player.object);
 const originals=new Map();player.object.traverse(object=>{if(object.isMesh)originals.set(object,object.material);});
 const shadow=new Mesh(new PlaneGeometry(1.6,1.6),new MeshBasicMaterial({color:'#29452b',map:shadowTexture(),transparent:true,opacity:.32,depthWrite:false}));
 shadow.name='Soft avatar contact shadow';shadow.userData.avatarShadow=true;shadow.rotation.x=-Math.PI/2;root.add(shadow);
 const focus=new Vector3(),down=new Vector3(0,-1,0);
 const api={
  root,player,input,shadow,
  get collision(){return collider.collision;},
  get colliderTriangles(){return collider.triangles;},
  addCollision(mesh){extraSolids.push(mesh);collider.collision.addSolid(mesh);},
  get position(){return player.position.clone().multiplyScalar(AVATAR_SCALE);},
  focus(target=new Vector3()){return player.getFocusPoint(target).multiplyScalar(AVATAR_SCALE).add(root.position);},
  step(delta,yaw,pitch=0){
   player.update(delta,input,yaw,pitch);
   focus.copy(player.position);focus.y+=.3;
   const ground=collider.collision.groundHeightBelow(focus,7),drop=Math.max(0,player.position.y-ground);
   shadow.visible=Number.isFinite(ground)&&drop<6&&player.state!=='swim';
   if(shadow.visible){shadow.position.set(player.position.x,ground+.018,player.position.z);shadow.material.opacity=.32/(1+drop*.4);shadow.scale.setScalar(1+drop*.08);}
  },
  reset(){input.clear();input.releaseTouch();player.teleport(spawn,Math.PI);},
  setQuality(level){
   if(level===quality)return;quality=level;
   for(const material of cheapMaterials)material.dispose();cheapMaterials=[];
   const replacements=new Map();
   for(const [mesh,original]of originals){
    if(level==='high')mesh.material=original;
    else{if(!replacements.has(original)){const material=new MeshLambertMaterial({color:original.color});replacements.set(original,material);cheapMaterials.push(material);}mesh.material=replacements.get(original);}
    // Environment shadows stay cached on old hardware; the moving avatar uses
    // the inexpensive projected contact shadow instead of rebaking the island.
    mesh.castShadow=false;mesh.receiveShadow=level!=='low';
   }
  },
  cameraDistance(from,to){
   focus.copy(from).multiplyScalar(METRES_PER_CELL);down.copy(to).sub(from);
   const distance=down.length();if(distance<.001)return distance;
   down.normalize();return collider.collision.raycast(focus,down,distance*METRES_PER_CELL)*AVATAR_SCALE;
  },
  // Editing remains possible through the inspection API. Rebuild the same
  // CollisionWorld object the controller already holds, rather than a stale one.
  rebuildCollision(){
   const next=createIslandCollision(world),existing=collider.collision;
   existing.octree.clear();existing.solids.length=0;
   for(const mesh of [next.mesh,...extraSolids])existing.addSolid(mesh);
   existing.waters.splice(0,existing.waters.length,...next.collision.waters);
   collider.mesh.geometry.dispose();collider.mesh.material.dispose();collider={...next,collision:existing};
   const p=player.position.clone().multiplyScalar(AVATAR_SCALE),height=surfaceHeight(p.x,p.z);
   if(height!==null&&p.y<height)api.reset();
  }
 };
 api.setQuality('low');return api;
}
