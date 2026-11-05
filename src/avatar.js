import * as THREE from 'three';
import {addAthleteOutfit} from './avatar-outfit.js';

// Game units, +Y up, +Z forward. Adult athletic proportions are authored in
// the bind pose; scaling the old toy-shaped mesh would also stretch its head.
export const AVATAR_HEIGHT=3.16;
export const AVATAR_RADIUS=.62;
export const FOOT_PROFILE=Object.freeze({ankleHeight:.22,centerHeight:.13,forwardOffset:.16,radiusX:.17,radiusY:.13,radiusZ:.36});
export const LANDMARKS=[
 ['pelvis',null,[0,1.55,0]],['spine','pelvis',[0,1.82,0]],
 ['chest','spine',[0,2.23,0]],['neck','chest',[0,2.59,0]],['head','neck',[0,2.77,0]],
];
for(const [side,sign]of [['left',-1],['right',1]])LANDMARKS.push(
 [`${side}_upper_arm`,'chest',[sign*.50,2.49,0]],
 [`${side}_forearm`,`${side}_upper_arm`,[sign*.57,1.99,.015]],
 [`${side}_hand`,`${side}_forearm`,[sign*.60,1.54,.035]],
 [`${side}_thigh`,'pelvis',[sign*.20,1.48,0]],
 [`${side}_calf`,`${side}_thigh`,[sign*.20,.85,.015]],
 [`${side}_foot`,`${side}_calf`,[sign*.20,FOOT_PROFILE.ankleHeight,0]],
 [`${side}_toe`,`${side}_foot`,[sign*.20,.13,.49]],
);
export function createAvatar(){
 const bones=new Map(),indices=new Map(LANDMARKS.map(([name],i)=>[name,i])),points=new Map(LANDMARKS.map(([name,,p])=>[name,new THREE.Vector3(...p)]));
 for(const [name,parent]of LANDMARKS){const b=new THREE.Bone();b.name=name;b.position.copy(points.get(name));if(parent){b.position.sub(points.get(parent));bones.get(parent).add(b);}bones.set(name,b);}
 const positions=[],triangles=[],skinIndices=[],skinWeights=[],colors=[];
 const palette={shirt:new THREE.Color('#f4f3ef'),denim:new THREE.Color('#8ebcdd'),skin:new THREE.Color('#b98968'),shoe:new THREE.Color('#f8f7f3')};
 let paint=palette.shirt;
 function vertex(p,weights){const i=positions.length/3;positions.push(...p);colors.push(paint.r,paint.g,paint.b);const total=weights.reduce((sum,[,w])=>sum+w,0);for(let k=0;k<4;k++){skinIndices.push(weights[k]?indices.get(weights[k][0]):0);skinWeights.push(weights[k]?weights[k][1]/total:0);}return i;}
 function blend(a,b,t){t=THREE.MathUtils.clamp(t,0,1);return[[a,1-t],[b,t]];}
 function loft(rings,weight,segments=20){
  const start=positions.length/3,ascending=rings.at(-1)[1]>rings[0][1];
  for(const [x,y,z,rx,rz]of rings)for(let j=0;j<segments;j++){const a=j/segments*Math.PI*2;vertex([x+Math.cos(a)*rx,y,z+Math.sin(a)*rz],weight(y));}
  for(let r=0;r<rings.length-1;r++)for(let j=0;j<segments;j++){const a=start+r*segments+j,b=start+r*segments+(j+1)%segments;if(ascending)triangles.push(a,a+segments,b,b,a+segments,b+segments);else triangles.push(a,b,a+segments,b,b+segments,a+segments);}
  for(const [r,reverse]of [[0,false],[rings.length-1,true]]){const c=vertex(rings[r].slice(0,3),weight(rings[r][1]));for(let j=0;j<segments;j++){const a=start+r*segments+j,b=start+r*segments+(j+1)%segments;triangles.push(c,(ascending?!reverse:reverse)?b:a,(ascending?!reverse:reverse)?a:b);}}
 }
 function ellipsoid(center,scale,bone){const g=new THREE.SphereGeometry(1,20,14),p=g.attributes.position,start=positions.length/3;for(let i=0;i<p.count;i++)vertex([center[0]+p.getX(i)*scale[0],center[1]+p.getY(i)*scale[1],center[2]+p.getZ(i)*scale[2]],[[bone,1]]);for(const i of g.index.array)triangles.push(start+i);g.dispose();}
 const torsoWeight=y=>y<1.86?blend('pelvis','spine',(y-1.61)/.25):blend('spine','chest',(y-1.88)/.40);
 paint=palette.denim;loft([[0,1.39,0,.27,.19],[0,1.52,0,.33,.22],[0,1.65,0,.30,.22]],torsoWeight);
 paint=palette.shirt;loft([[0,1.65,0,.31,.23],[0,1.76,0,.32,.23],[0,1.98,0,.37,.25],[0,2.28,0,.46,.27],[0,2.48,0,.47,.25],[0,2.56,0,.38,.21],[0,2.60,0,.14,.12]],torsoWeight);
 paint=palette.skin;loft([[0,2.57,0,.115,.11],[0,2.76,0,.115,.105]],()=>[['neck',1]]);ellipsoid([0,2.81,.012],[.215,.25,.21],'head');
 for(const [side,sign]of [['left',-1],['right',1]]){
  const armWeight=y=>y>1.77?blend(`${side}_upper_arm`,`${side}_forearm`,(2.13-y)/.30):blend(`${side}_forearm`,`${side}_hand`,(1.69-y)/.15);
  paint=palette.shirt;loft([[sign*.50,2.625,0,.015,.015],[sign*.50,2.59,0,.10,.10],[sign*.51,2.52,0,.155,.155],[sign*.52,2.40,0,.165,.155],[sign*.54,2.23,.008,.15,.14]],armWeight);
  paint=palette.skin;loft([[sign*.54,2.23,.008,.142,.132],[sign*.55,2.13,.012,.145,.13],[sign*.57,1.99,.015,.115,.105],[sign*.58,1.84,.022,.125,.115],[sign*.595,1.65,.032,.09,.085],[sign*.60,1.54,.035,.075,.07]],armWeight);
  ellipsoid([sign*.605,1.415,.045],[.105,.16,.10],`${side}_hand`);
  ellipsoid([sign*.53,1.45,.10],[.052,.085,.055],`${side}_hand`);
  paint=palette.denim;loft([[sign*.20,1.59,0,.055,.06],[sign*.20,1.54,0,.17,.18],[sign*.20,1.39,0,.195,.195],[sign*.20,1.13,.008,.18,.17],[sign*.20,.85,.015,.135,.14],[sign*.20,.64,.008,.145,.13],[sign*.20,.40,0,.115,.11],[sign*.20,.32,0,.11,.105]],y=>y>.55?blend(`${side}_thigh`,`${side}_calf`,(1.06-y)/.36):blend(`${side}_calf`,`${side}_foot`,(.42-y)/.13));
  paint=palette.shoe;ellipsoid([sign*.20,FOOT_PROFILE.centerHeight,FOOT_PROFILE.forwardOffset],[FOOT_PROFILE.radiusX,FOOT_PROFILE.radiusY,FOOT_PROFILE.radiusZ],`${side}_foot`);
  loft([[sign*.20,.16,-.015,.13,.145],[sign*.20,.35,-.015,.13,.135],[sign*.20,.46,-.015,.115,.12]],()=>[[`${side}_foot`,1]]);
 }
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(skinIndices,4));geometry.setAttribute('skinWeight',new THREE.Float32BufferAttribute(skinWeights,4));geometry.setIndex(triangles);geometry.computeVertexNormals();geometry.computeBoundingBox();geometry.computeBoundingSphere();
 const mesh=new THREE.SkinnedMesh(geometry,new THREE.MeshLambertMaterial({color:'#ffffff',vertexColors:true}));mesh.name='Athletic Izzy';mesh.add(bones.get('pelvis'));mesh.bind(new THREE.Skeleton([...bones.values()]));mesh.castShadow=true;
 addAthleteOutfit(mesh,bones,points);return mesh;
}
