import * as THREE from 'three';

// One sampled closed ribbon supplies both the visible road and collision
// triangles. Access openings affect the outside curb/rail only.
export function buildTrackData({name,points,count=1800,halfWidth=13,curbWidth=1.1,access,opening,arcLengthDivisions}){
 const path=new THREE.CatmullRomCurve3(points,true,'centripetal');if(arcLengthDivisions)path.arcLengthDivisions=arcLengthDivisions;
 const length=path.getLength(),outer=halfWidth+curbWidth;
 const samples=Array.from({length:count+1},(_,i)=>{
  const point=path.getPointAt(i/count),tangent=path.getTangentAt(i/count);point.y=Math.max(0,point.y);
  return{point,normal:new THREE.Vector3(-tangent.z,0,tangent.x).normalize(),distance:i/count*length};
 });
 samples[count].point.copy(samples[0].point);samples[count].normal.copy(samples[0].normal);
 const offset=(s,d,y=0)=>s.point.clone().addScaledVector(s.normal,d).add(new THREE.Vector3(0,y,0));
 const segments=[],rails=[];
 for(let i=0;i<count;i++){
  const a=samples[i],b=samples[i+1];segments.push({a:a.point,b:b.point,halfWidth:outer,corners:[offset(a,-outer),offset(b,-outer),offset(b,outer),offset(a,outer)]});
  for(const side of [-1,1]){const a=offset(samples[i],side*(outer+.15)),b=offset(samples[i+1],side*(outer+.15));if(!opening(a)&&!opening(b))rails.push({a,b});}
 }
 if(access.axis==='z')for(const x of [access.minX,access.maxX])rails.push({a:new THREE.Vector3(x,0,access.railStartZ),b:new THREE.Vector3(x,0,access.railEndZ)});
 else for(const z of [access.minZ,access.maxZ])rails.push({a:new THREE.Vector3(access.railStartX,0,z),b:new THREE.Vector3(access.maxX,0,z)});
 return{name,samples,segments,rails,halfWidth,curbWidth,outer,access,opening,offset};
}

export function createTrackRibbon(data){
 const {samples,rails,outer,halfWidth,access,opening,offset}=data,count=samples.length-1;
 const group=new THREE.Group();group.name=data.name;
 function strip(inner,edge,height=0,colored=false,skipOpening=false){
  const positions=[],colors=[];
  for(let i=0;i<count;i++){
   const a=samples[i],b=samples[i+1];if(skipOpening&&opening(offset(a,edge)))continue;
   const quad=[offset(a,inner,height),offset(b,inner,height),offset(b,edge,height),offset(a,edge,height)],color=new THREE.Color(Math.floor(a.distance/3)%2?'#f4f3ef':'#dc2828');
   for(const k of(edge>inner?[0,2,1,0,3,2]:[0,1,2,0,2,3])){positions.push(...quad[k].toArray());if(colored)colors.push(color.r,color.g,color.b);}
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));if(colored)geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.computeVertexNormals();return geometry;
 }
 const asphalt=new THREE.MeshLambertMaterial({color:'#25272b',side:THREE.DoubleSide}),curb=new THREE.MeshLambertMaterial({vertexColors:true,side:THREE.DoubleSide});
 const road=new THREE.Mesh(strip(-outer,outer),asphalt);road.name=`${data.name} road surface`;road.receiveShadow=true;group.add(road);
 group.add(new THREE.Mesh(strip(-outer,outer,-.65),new THREE.MeshLambertMaterial({color:'#424750',side:THREE.DoubleSide})));
 const sides=[];
 for(let i=0;i<count;i++)for(const side of [-1,1]){
  const a=offset(samples[i],side*outer),b=offset(samples[i+1],side*outer),quad=[a,b,b.clone().add(new THREE.Vector3(0,-.65,0)),a.clone().add(new THREE.Vector3(0,-.65,0))];
  for(const k of [0,1,2,0,2,3])sides.push(...quad[k].toArray());
 }
 const sideGeometry=new THREE.BufferGeometry();sideGeometry.setAttribute('position',new THREE.Float32BufferAttribute(sides,3));sideGeometry.computeVertexNormals();group.add(new THREE.Mesh(sideGeometry,new THREE.MeshLambertMaterial({color:'#555b65',side:THREE.DoubleSide})));
 for(const side of [-1,1])group.add(new THREE.Mesh(strip(side*halfWidth,side*outer,.04,true,true),curb));
 const bridge=new THREE.Mesh(new THREE.BoxGeometry(access.maxX-access.minX,.65,access.maxZ-access.minZ),asphalt);bridge.name=`${data.name} access bridge`;bridge.position.set((access.minX+access.maxX)/2,-.325,(access.minZ+access.maxZ)/2);bridge.receiveShadow=true;group.add(bridge);
 const alongZ=access.axis==='z',curbStart=alongZ?access.railStartZ:access.railStartX,curbEnd=alongZ?access.railEndZ:access.maxX;
 const accessCurbs=new THREE.InstancedMesh(new THREE.BoxGeometry(1,.06,.9),new THREE.MeshLambertMaterial({color:'#ffffff'}),Math.ceil((curbEnd-curbStart)/3)*2),curbDummy=new THREE.Object3D();let curbIndex=0;
 for(const side of [-1,1])for(let position=curbStart;position<curbEnd;position+=3){
  const width=Math.min(3,curbEnd-position);
  if(alongZ){curbDummy.position.set(side<0?access.minX+.45:access.maxX-.45,.03,position+width/2);curbDummy.rotation.y=Math.PI/2;}
  else curbDummy.position.set(position+width/2,.03,side<0?access.minZ+.45:access.maxZ-.45);
  curbDummy.scale.set(width,1,1);curbDummy.updateMatrix();accessCurbs.setMatrixAt(curbIndex,curbDummy.matrix);accessCurbs.setColorAt(curbIndex++,new THREE.Color(Math.floor((position-curbStart)/3)%2?'#dc2828':'#f4f3ef'));
 }
 accessCurbs.count=curbIndex;accessCurbs.instanceMatrix.needsUpdate=true;group.add(accessCurbs);
 const material=new THREE.MeshLambertMaterial({color:'#a5adb8'}),beams=new THREE.InstancedMesh(new THREE.BoxGeometry(.16,.16,1),material,rails.length*2),posts=new THREE.InstancedMesh(new THREE.BoxGeometry(.18,1.18,.18),material,Math.ceil(rails.length/3));
 const dummy=new THREE.Object3D(),axis=new THREE.Vector3(0,0,1);let beam=0,post=0;
 for(let i=0;i<rails.length;i++){
  const {a,b}=rails[i],delta=b.clone().sub(a);
  for(const height of [.55,1.08]){dummy.position.copy(a).add(b).multiplyScalar(.5);dummy.position.y+=height;dummy.quaternion.setFromUnitVectors(axis,delta.clone().normalize());dummy.scale.set(1,1,delta.length()+.04);dummy.updateMatrix();beams.setMatrixAt(beam++,dummy.matrix);}
  if(i%3===0){dummy.position.copy(a);dummy.position.y+=.59;dummy.quaternion.identity();dummy.scale.set(1,1,1);dummy.updateMatrix();posts.setMatrixAt(post++,dummy.matrix);}
 }
 posts.count=post;beams.instanceMatrix.needsUpdate=true;posts.instanceMatrix.needsUpdate=true;group.add(beams,posts);return group;
}
