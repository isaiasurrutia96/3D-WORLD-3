import * as THREE from 'three';

export const FLOOR_WIDTH=260;
export const FLOOR_LENGTH=460;
const TRACK={radius:75,halfStraight:100,width:18};
const material=color=>new THREE.MeshLambertMaterial({color});
function mesh(geometry,mat,parent,position,scale){
 const object=new THREE.Mesh(geometry,mat);object.position.set(...position);
 if(scale)object.scale.set(...scale);parent.add(object);return object;
}
export function createWorld(){
 const world=new THREE.Group();world.name='Empty slab and static track';
 const floor=mesh(new THREE.BoxGeometry(FLOOR_WIDTH,0.25,FLOOR_LENGTH),material('#e6e0cf'),world,[0,-0.125,0]);
 floor.name='Unbroken floor slab';
// Retained static oval circuit around the empty infield.
function ovalPoints(radius){
  const points=[];
  for(let i=0;i<40;i++)points.push(new THREE.Vector3(radius,0,-100+i*5));
  for(let i=0;i<64;i++){const angle=i/64*Math.PI;points.push(new THREE.Vector3(Math.cos(angle)*radius,0,100+Math.sin(angle)*radius));}
  for(let i=0;i<40;i++)points.push(new THREE.Vector3(-radius,0,100-i*5));
  for(let i=0;i<64;i++){const angle=Math.PI+i/64*Math.PI;points.push(new THREE.Vector3(Math.cos(angle)*radius,0,-100+Math.sin(angle)*radius));}
  return points;
}
const outer=ovalPoints(TRACK.radius+TRACK.width/2),inner=ovalPoints(TRACK.radius-TRACK.width/2);
const roadVertices=[],roadIndices=[];
for(let i=0;i<outer.length;i++){roadVertices.push(outer[i].x,0.035,outer[i].z,inner[i].x,0.035,inner[i].z);const next=(i+1)%outer.length;roadIndices.push(i*2,next*2,i*2+1,next*2,next*2+1,i*2+1);}
const roadGeometry=new THREE.BufferGeometry();roadGeometry.setAttribute('position',new THREE.Float32BufferAttribute(roadVertices,3));roadGeometry.setIndex(roadIndices);roadGeometry.computeVertexNormals();
const roadMaterial=material('#3b4353');roadMaterial.side=THREE.DoubleSide;mesh(roadGeometry,roadMaterial,world,[0,0,0]);
const barrierGeometry=new THREE.BoxGeometry(1,0.7,1),barrierMaterials=[material('#bfc9d5'),material('#47647a')];
const barrierInstances=[[],[]];
for(const radius of [66,84]){
  const points=ovalPoints(radius);
  points.forEach((point,index)=>{
    if(radius===66 && point.x>60 && point.z>=-10 && point.z<10)return;
    const next=points[(index+1)%points.length];
    barrierInstances[Math.floor(index/3)%2].push({x:(point.x+next.x)/2,z:(point.z+next.z)/2,length:point.distanceTo(next)+0.06,yaw:Math.atan2(next.x-point.x,next.z-point.z)});
  });
}
const instanceTransform=new THREE.Object3D();
barrierInstances.forEach((instances,color)=>{
  const walls=new THREE.InstancedMesh(barrierGeometry,barrierMaterials[color],instances.length);
  instances.forEach((part,index)=>{
    instanceTransform.position.set(part.x,0.35,part.z);instanceTransform.rotation.set(0,part.yaw,0);instanceTransform.scale.set(0.45,1,part.length);instanceTransform.updateMatrix();walls.setMatrixAt(index,instanceTransform.matrix);
  });world.add(walls);
});
const lanePoints=ovalPoints(75),laneDashes=new THREE.InstancedMesh(new THREE.BoxGeometry(0.18,0.015,2),material('#d7d7bd'),lanePoints.length/2);
lanePoints.forEach((point,index)=>{if(index%2)return;const next=lanePoints[(index+1)%lanePoints.length];instanceTransform.position.set(point.x,0.055,point.z);instanceTransform.rotation.set(0,Math.atan2(next.x-point.x,next.z-point.z),0);instanceTransform.scale.set(1,1,1);instanceTransform.updateMatrix();laneDashes.setMatrixAt(index/2,instanceTransform.matrix);});world.add(laneDashes);
for(let x=67;x<83;x+=2)for(let z=-1;z<1;z++)mesh(new THREE.BoxGeometry(2,0.018,1),material((Math.round((x-67)/2)+z)%2?'#e8e8dd':'#121b29'),world,[x+1,0.06,z+0.5]);

return world;
}
