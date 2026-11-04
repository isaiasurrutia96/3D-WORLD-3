import * as THREE from 'three';

export const ENTRY={x:150,z:-150};
export const TRACK_HALF_WIDTH=13;
export const CURB_WIDTH=1.1;
const OUTER=TRACK_HALF_WIDTH+CURB_WIDTH;
const SCALE=1.2,OFFSET_X=92.4,OFFSET_Z=-270;
// Winding closed circuit from the approved concept. The diagonal rises over
// the lower straight; these paths never form a four-way intersection.
const layout=[
 [50,85,0],[85,45,0],[155,40,0],[540,40,0],[580,60,0],[590,95,0],[575,120,0],[510,120,0],
 [465,118,0],[435,92,0],[405,85,0],[155,85,0],[115,90,0],[100,115,0],[98,140,0],
 [113,163,0],[155,170,0],[245,170,0],[275,180,0],[300,210,2],[305,240,7],[287,270,8],
 [205,355,8],[185,390,4],[195,425,0],[222,442,0],[245,432,0],[252,403,0],
 [268,373,0],[300,363,0],[423,363,0],[449,376,0],[465,424,0],[487,442,0],
 [525,445,0],[562,424,0],[586,389,0],[602,351,0],[598,306,0],[580,267,0],
 [553,239,0],[520,225,0],[485,230,0],[450,253,0],[422,276,0],[390,283,0],
 [170,283,0],[137,301,0],[118,315,0],[89,311,0],[65,294,0],[50,270,0],[48,100,0],
];
const path=new THREE.CatmullRomCurve3(layout.map(([x,z,y])=>new THREE.Vector3(x*SCALE+OFFSET_X,y,z*SCALE+OFFSET_Z)),true,'centripetal');
const COUNT=1200;
export const trackSamples=Array.from({length:COUNT+1},(_,i)=>{
 const point=path.getPointAt(i/COUNT),tangent=path.getTangentAt(i/COUNT);
 const normal=new THREE.Vector3(-tangent.z,0,tangent.x).normalize();
 return {point,normal,distance:i/COUNT*path.getLength()};
});
export const access={minX:128,maxX:154,minZ:ENTRY.z-10,maxZ:ENTRY.z+10,height:0};
const offset=(sample,d,y=0)=>sample.point.clone().addScaledVector(sample.normal,d).add(new THREE.Vector3(0,y,0));
const opening=p=>p.x<145 && Math.abs(p.z-ENTRY.z)<9;
export const trackSegments=[],railSegments=[];
for(let i=0;i<COUNT;i++){
 const a=trackSamples[i],b=trackSamples[i+1];
 trackSegments.push({a:a.point,b:b.point,halfWidth:OUTER,corners:[offset(a,-OUTER),offset(b,-OUTER),offset(b,OUTER),offset(a,OUTER)]});
 for(const side of [-1,1]){
  const start=offset(a,side*(OUTER+.15)),end=offset(b,side*(OUTER+.15));
  if(!opening(start)&&!opening(end))railSegments.push({a:start,b:end});
 }
}
railSegments.push({a:new THREE.Vector3(130,0,access.minZ),b:new THREE.Vector3(136,0,access.minZ)},
 {a:new THREE.Vector3(130,0,access.maxZ),b:new THREE.Vector3(136,0,access.maxZ)});

function stripGeometry(inner,outer,height=0,colored=false,skipOpening=false){
 const vertices=[],colors=[];
 for(let i=0;i<COUNT;i++){
  const a=trackSamples[i],b=trackSamples[i+1];
  if(skipOpening&&opening(offset(a,outer)))continue;
  const points=[offset(a,inner,height),offset(b,inner,height),offset(b,outer,height),offset(a,outer,height)];
  const color=new THREE.Color(Math.floor(a.distance/3)%2?'#f4f3ef':'#dc2828');
  for(const index of (outer>inner?[0,2,1,0,3,2]:[0,1,2,0,2,3])){vertices.push(...points[index].toArray());if(colored)colors.push(color.r,color.g,color.b);}
 }
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
 if(colored)geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
 geometry.computeVertexNormals();return geometry;
}
export function createTrack(){
 const group=new THREE.Group();group.name='Floating winding circuit';
 const roadMaterial=new THREE.MeshLambertMaterial({color:'#25272b',side:THREE.DoubleSide});
 const road=new THREE.Mesh(stripGeometry(-OUTER,OUTER),roadMaterial);road.receiveShadow=true;group.add(road);
 const sides=[];
 for(let i=0;i<COUNT;i++)for(const side of [-1,1]){
  const a=offset(trackSamples[i],side*OUTER),b=offset(trackSamples[i+1],side*OUTER);
  const quad=[a,b,b.clone().add(new THREE.Vector3(0,-.65,0)),a.clone().add(new THREE.Vector3(0,-.65,0))];
  for(const k of [0,1,2,0,2,3])sides.push(...quad[k].toArray());
 }
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(sides,3));geometry.computeVertexNormals();
 group.add(new THREE.Mesh(geometry,new THREE.MeshLambertMaterial({color:'#555b65',side:THREE.DoubleSide})));
 const bottom=new THREE.Mesh(stripGeometry(-OUTER,OUTER,-.65),new THREE.MeshLambertMaterial({color:'#424750',side:THREE.DoubleSide}));group.add(bottom);
 const curbMaterial=new THREE.MeshLambertMaterial({vertexColors:true,side:THREE.DoubleSide});
 for(const side of [-1,1])group.add(new THREE.Mesh(stripGeometry(side*TRACK_HALF_WIDTH,side*OUTER,.04,true,true),curbMaterial));
 const bridge=new THREE.Mesh(new THREE.BoxGeometry(access.maxX-access.minX,.65,access.maxZ-access.minZ),roadMaterial);
 bridge.position.set((access.minX+access.maxX)/2,-.325,ENTRY.z);bridge.receiveShadow=true;group.add(bridge);
 // Access curbs meet the opening in the outside rail, leaving a clear T junction.
 for(const side of [-1,1])for(let x=128;x<136;x+=2){
  const curb=new THREE.Mesh(new THREE.BoxGeometry(2,.06,.9),new THREE.MeshLambertMaterial({color:(x/2)%2?'#f4f3ef':'#dc2828'}));
  curb.position.set(x+1,.03,ENTRY.z+side*9.55);group.add(curb);
 }
 const railMaterial=new THREE.MeshLambertMaterial({color:'#a5adb8'});
 const rails=new THREE.InstancedMesh(new THREE.BoxGeometry(.16,.16,1),railMaterial,railSegments.length*2);
 const posts=new THREE.InstancedMesh(new THREE.BoxGeometry(.18,1.18,.18),railMaterial,Math.ceil(railSegments.length/3));
 const dummy=new THREE.Object3D(),axis=new THREE.Vector3(0,0,1);let beam=0,post=0;
 for(let i=0;i<railSegments.length;i++){
  const {a,b}=railSegments[i],delta=b.clone().sub(a);
  for(const height of [.55,1.08]){
   dummy.position.copy(a).add(b).multiplyScalar(.5);dummy.position.y+=height;
   dummy.quaternion.setFromUnitVectors(axis,delta.clone().normalize());dummy.scale.set(1,1,delta.length()+.04);dummy.updateMatrix();rails.setMatrixAt(beam++,dummy.matrix);
  }
  if(i%3===0){dummy.position.copy(a);dummy.position.y+=.59;dummy.quaternion.identity();dummy.scale.set(1,1,1);dummy.updateMatrix();posts.setMatrixAt(post++,dummy.matrix);}
 }
 rails.instanceMatrix.needsUpdate=true;posts.count=post;posts.instanceMatrix.needsUpdate=true;group.add(rails,posts);
 return group;
}
