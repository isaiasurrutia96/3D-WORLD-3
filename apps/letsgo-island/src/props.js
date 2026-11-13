import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {trees,rocks,terrainHeight,contains,outline,random,TAU} from './layout.js';

// Shared geometry and instancing keep the small plants and tree canopies cheap.
export class Batches{
 constructor(group){this.group=group;this.entries=new Map();this.sphere=new THREE.SphereGeometry(1,14,10);this.stone=new THREE.IcosahedronGeometry(1,0);this.trunk=new THREE.CylinderGeometry(.7,1,1,7);this.box=new RoundedBoxGeometry(1,1,1,2,.12);}
 add(kind,position,scale,color,rotation=[0,0,0]){if(!this.entries.has(kind))this.entries.set(kind,[]);const o=new THREE.Object3D();o.position.set(...position);o.scale.set(...scale);o.rotation.set(...rotation);o.updateMatrix();this.entries.get(kind).push({matrix:o.matrix.clone(),color:new THREE.Color(color)});}
 finish(){for(const [kind,rows]of this.entries){const geometry=kind==='stone'?this.stone:kind==='trunk'?this.trunk:kind==='box'?this.box:this.sphere,material=new THREE.MeshStandardMaterial({roughness:1,flatShading:kind==='stone'}),mesh=new THREE.InstancedMesh(geometry,material,rows.length);rows.forEach((r,i)=>{mesh.setMatrixAt(i,r.matrix);mesh.setColorAt(i,r.color);});mesh.castShadow=true;mesh.receiveShadow=true;mesh.name=`Island ${kind} details`;mesh.computeBoundingSphere();this.group.add(mesh);}}
}
export function addTree(batch,x,z,size=1,base=terrainHeight(x,z)){
 const y=base,h=6.2*size;
 batch.add('trunk',[x,y+h*.5,z],[.65*size,h,.7*size],'#a36a35',[0,0,-.08]);
 batch.add('trunk',[x-.9*size,y+4.4*size,z],[.34*size,3*size,.36*size],'#aa7137',[0,0,.65]);
 batch.add('trunk',[x+1*size,y+4.6*size,z],[.34*size,2.9*size,.36*size],'#ad753b',[0,0,-.6]);
 const crowns=[[-2.2,6.2,.3,2.5,'#8ec328'],[1.6,6.4,.7,2.65,'#8bbf22'],[0,8.1,0,2.7,'#a1cf2e'],[-1.3,7.4,-1.6,2.1,'#9bc82a'],[2.1,7.9,-1.1,1.9,'#a7d434'],[-.5,6.7,2.2,2.2,'#82b523']];
 for(const [dx,dy,dz,r,color]of crowns)batch.add('leaf',[x+dx*size,y+dy*size,z+dz*size],[r*size,r*.91*size,r*size],color,[0,dx,0]);
}
export function createPlants(){
 const group=new THREE.Group();group.name='Trees plants and rocks';const batch=new Batches(group),rng=random(77);
 for(const [x,z,s]of trees)addTree(batch,x,z,s);
 for(const [x,z,s]of rocks){batch.add('stone',[x,terrainHeight(x,z)+s*.58,z],[s,s*.9,s*.8],['#9b948e','#aaa09a','#9c9991'][Math.floor(rng()*3)],[rng()*.3,rng()*5,.1]);}
 // Substantial rock masses merge into the underside rather than floating below it.
 for(const [x,y,z,sx,sy,sz]of [[-29,-13,17,12,9,10],[13,-18,13,11,8,10],[28,-11,-9,11,8,11],[-9,-19,-12,13,8,12],[-43,-8,-7,8,6,10]])batch.add('stone',[x,y,z],[sx,sy,sz],'#8b8290',[.2,rng()*4,.2]);
 const palette=['#78b124','#92c332','#69a429','#a3cb3a'];
 for(let i=0;i<88;i++){
  const p=outline(rng()*TAU,.88+rng()*.08),x=p.x,z=p.z;if(!contains(x,z,.025))continue;
  const y=terrainHeight(x,z),size=.55+rng()*.7;
  for(let leaf=0;leaf<3;leaf++)batch.add('leaf',[x+(rng()-.5)*1.5,y+size*.65,z+(rng()-.5)*1.5],[size*.8,size,size*.65],palette[Math.floor(rng()*palette.length)],[0,rng()*4,(rng()-.5)*.6]);
 }
 const clumps=[[-24,12],[-13,-13],[32,5],[20,29],[-39,3],[-24,32],[43,19],[-7,-33],[38,-21],[-46,16],[8,34]];
 for(const [x,z]of clumps){
  const y=terrainHeight(x,z);for(let j=0;j<3;j++){const a=j*TAU/3;batch.add('leaf',[x+Math.cos(a)*.5,y+.43,z+Math.sin(a)*.5],[.28,.65,.35],j?'#95c82d':'#add23b',[Math.sin(a)*.5,0,Math.cos(a)*.5]);}
 }
 for(const [x,z]of [[-41,25],[-20,33],[42,23],[-2,-34],[41,-20],[-47,-9],[17,35]])for(let f=0;f<3;f++){
  const fx=x+(f-1)*.65,fz=z+Math.sin(f*3)*.55,fy=terrainHeight(fx,fz)+.17;
  for(let petal=0;petal<5;petal++){const a=petal/5*TAU;batch.add('petal',[fx+Math.cos(a)*.23,fy,fz+Math.sin(a)*.23],[.20,.08,.14],'#fff9e7',[0,-a,0]);}
  batch.add('flower',[fx,fy+.05,fz],[.14,.09,.14],'#f3bf45');
 }
 batch.finish();return group;
}
export function createSkyIslets(){
 const group=new THREE.Group();group.name='Distant floating islands';
 for(const [x,y,z,s]of [[-88,-10,-35,6],[40,-3,-70,6],[65,-10,-18,5.5],[-75,-12,8,5]]){
  const island=new THREE.Group();island.position.set(x,y,z);group.add(island);
  const stone=new THREE.Mesh(new THREE.ConeGeometry(s*.83,s*1.4,7,1),new THREE.MeshStandardMaterial({color:'#b8a39b',flatShading:true,roughness:1}));stone.rotation.z=Math.PI;stone.position.y=-s*.70;island.add(stone);
  const turf=new THREE.Mesh(new THREE.CylinderGeometry(s,s*.86,1.5,9),new THREE.MeshStandardMaterial({color:'#90c841',roughness:1}));turf.position.y=.5;island.add(turf);
  const b=new Batches(island);addTree(b,0,0,.43,1.2);addTree(b,s*.42,0,.30,1.2);b.finish();
 }
 return group;
}
