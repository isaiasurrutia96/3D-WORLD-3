import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {createKartFrame} from './kart.js';
import {createAvatar} from './avatar.js';
import {createSeatedPose} from './vehicle-view.js';

// Four replays share a baked chassis/driver and five moving assemblies instead
// of rendering every frame tube and re-skinning four static seated avatars.
export function createGhostTemplate(){
 const source=createKartFrame(),driver=createAvatar();source.add(driver);createSeatedPose(driver)();source.updateMatrixWorld(true);driver.skeleton.update();
 const names=['front_axle_left_wheel','front_axle_right_wheel','rear_axle_left_wheel','rear_axle_right_wheel','steering_wheel'];
 const roots=new Set(names.map(name=>source.getObjectByName(name))),batches=new Map([[source,[]],...[...roots].map(root=>[root,[]])]);
 const point=new THREE.Vector3();
 source.traverse(mesh=>{
  if(!mesh.isMesh)return;
  let root=mesh;while(root!==source&&!roots.has(root))root=root.parent;
  let geometry=mesh.geometry.clone();
  if(mesh.isSkinnedMesh){const positions=geometry.attributes.position;for(let i=0;i<positions.count;i++){mesh.getVertexPosition(i,point);positions.setXYZ(i,point.x,point.y,point.z);}geometry.computeVertexNormals();}
  if(geometry.index){const indexed=geometry;geometry=indexed.toNonIndexed();indexed.dispose();}
  for(const name of Object.keys(geometry.attributes))if(name!=='position'&&name!=='normal')geometry.deleteAttribute(name);
  geometry.applyMatrix4(new THREE.Matrix4().copy(root.matrixWorld).invert().multiply(mesh.matrixWorld));batches.get(root).push(geometry);
 });
 const template=new THREE.Group(),material=new THREE.MeshBasicMaterial();
 for(const [root,geometries]of batches){
  const mesh=new THREE.Mesh(mergeGeometries(geometries),material);mesh.name=root===source?'Ghost chassis and seated driver':'Ghost moving assembly';
  if(root===source)template.add(mesh);
  else{const group=new THREE.Group();group.name=root.name;root.matrixWorld.decompose(group.position,group.quaternion,group.scale);group.add(mesh);template.add(group);}
  geometries.forEach(g=>g.dispose());
 }
 const sourceGeometries=new Set(),sourceMaterials=new Set();source.traverse(node=>{if(node.isMesh){sourceGeometries.add(node.geometry);for(const m of Array.isArray(node.material)?node.material:[node.material])sourceMaterials.add(m);}});sourceGeometries.forEach(g=>g.dispose());sourceMaterials.forEach(m=>m.dispose());driver.skeleton.dispose();
 return template;
}
