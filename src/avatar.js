import * as THREE from 'three';

const material = color => new THREE.MeshLambertMaterial({ color });
const mannequin = material('#88939f');
const shirt=material('#f5f4ee'), chinos=material('#34363a'), sneakers=material('#f6f5f0'), capFabric=material('#141b29');
function mesh(geometry, mat, parent, position, scale) {
  const object = new THREE.Mesh(geometry, mat);
  object.position.set(...position);
  if (scale) object.scale.set(...scale);
  object.castShadow = true; object.receiveShadow = true;
  parent.add(object); return object;
}
function ball(parent, mat, position, scale) { return mesh(new THREE.SphereGeometry(1, 10, 8), mat, parent, position, scale); }
function joint(parent, name, position) { const group = new THREE.Group(); group.name = name; group.position.set(...position); parent.add(group); return group; }

// Articulated model, animated separately by the locomotion retargeter.
export function createAvatar(){
const LIMB_LENGTH=1.65;
const ARM_LENGTH=LIMB_LENGTH*1.08;
const STANDING_HIP_HEIGHT=0.15+0.54*LIMB_LENGTH+0.21;
const izzy = new THREE.Group();
izzy.name='Izzy';
// Named pivots remain available for a future animation system.
const pelvis = joint(izzy, 'pelvis', [0,STANDING_HIP_HEIGHT,0]);
ball(pelvis,chinos,[0,0.04,0],[0.34,0.23,0.24]);
const torso = joint(pelvis, 'spine', [0,0.25,0]);
// Broad shoulders and a rounded, tapered base match the mannequin reference.
const bodyProfile=[ [0,-0.32],[0.22,-0.31],[0.34,-0.25],[0.41,-0.12],
  [0.46,0.13],[0.47,0.38],[0.43,0.46],[0.28,0.49],[0,0.49] ];
mesh(new THREE.LatheGeometry(bodyProfile.map(([r,y])=>new THREE.Vector2(r,y)),16),
  shirt,torso,[0,0.12,0],[0.8,0.78,0.56]);
function segment(parent,position,radius,length,mat=mannequin){
  return mesh(new THREE.CapsuleGeometry(radius,length,4,12),mat,parent,position);
}
for (const side of [-1,1]) {
  const hip = joint(pelvis, `${side<0?'left':'right'}_hip`, [side*0.23,-0.15,0]);
  segment(hip,[0,-0.145*LIMB_LENGTH,0],0.195,0.29*LIMB_LENGTH-0.2,chinos);
  const knee = joint(hip,`${side<0?'left':'right'}_knee`,[0,-0.29*LIMB_LENGTH,0]);
  segment(knee,[0,-0.125*LIMB_LENGTH,0],0.155,0.25*LIMB_LENGTH-0.17,chinos);
  const ankle = joint(knee,`${side<0?'left':'right'}_ankle`,[0,-0.25*LIMB_LENGTH,0]);
  const foot=ball(ankle,sneakers,[0,-0.08,0.11],[0.23,0.13,0.36]);
  foot.name=`${side<0?'left':'right'}_foot_mesh`;
  const shoulder = joint(torso,`${side<0?'left':'right'}_shoulder`,[side*0.35,0.43,0]);
  shoulder.rotation.z = side*0.16;
  const upperArm=segment(shoulder,[side*0.025,-0.145*ARM_LENGTH,0],0.16,0.29*ARM_LENGTH-0.21);
  // Split vertices at the sleeve hem so colors cannot blend across triangles.
  const sleeveRadius=0.16,sleeveLength=0.29*ARM_LENGTH-0.21;
  const armProfile=[];
  for(let ring=0;ring<=4;ring++){
    const angle=-Math.PI/2+ring*Math.PI/8;
    armProfile.push(new THREE.Vector2(sleeveRadius*Math.cos(angle),-sleeveLength/2+sleeveRadius*Math.sin(angle)));
  }
  armProfile.push(new THREE.Vector2(sleeveRadius,-0.035),new THREE.Vector2(sleeveRadius,sleeveLength/2));
  for(let ring=1;ring<=4;ring++){
    const angle=ring*Math.PI/8;
    armProfile.push(new THREE.Vector2(sleeveRadius*Math.cos(angle),sleeveLength/2+sleeveRadius*Math.sin(angle)));
  }
  const sleeveGeometry=new THREE.LatheGeometry(armProfile,12).toNonIndexed();
  const sleevePositions=sleeveGeometry.attributes.position,sleeveColors=[];
  for(let vertex=0;vertex<sleevePositions.count;vertex+=3){
    const centerY=(sleevePositions.getY(vertex)+sleevePositions.getY(vertex+1)+sleevePositions.getY(vertex+2))/3;
    const color=centerY>-0.035?shirt.color:mannequin.color;
    for(let corner=0;corner<3;corner++)sleeveColors.push(color.r,color.g,color.b);
  }
  upperArm.geometry.dispose();upperArm.geometry=sleeveGeometry;
  upperArm.geometry.setAttribute('color',new THREE.Float32BufferAttribute(sleeveColors,3));
  upperArm.material=new THREE.MeshLambertMaterial({vertexColors:true});
  const elbow = joint(shoulder,`${side<0?'left':'right'}_elbow`,[side*0.07,-0.29*ARM_LENGTH,0]);
  segment(elbow,[0,-0.115*ARM_LENGTH,0.02],0.145,0.23*ARM_LENGTH-0.16);
  const wrist = joint(elbow,`${side<0?'left':'right'}_wrist`,[0,-0.23*ARM_LENGTH,0.03]);
  ball(wrist,mannequin,[0,-0.075,0.025],[0.205,0.20,0.18]);
}
const head = joint(torso,'neck',[0,0.66,0]);
mesh(new THREE.CylinderGeometry(0.135,0.17,0.23,12),mannequin,head,[0,-0.065,0]);
mesh(new THREE.SphereGeometry(0.34,20,16),mannequin,head,[0,0.26,0]);
// A structured six-panel fitted cap: snug band, tall crown, flat bill.
const cap=joint(head,'la_cap',[0,0.40,0]);
cap.rotation.x=-0.10;
const crownProfile=[[0.315,0],[0.331,0.045],[0.337,0.16],[0.318,0.25],[0.235,0.315],[0,0.345]];
mesh(new THREE.LatheGeometry(crownProfile.map(([r,y])=>new THREE.Vector2(r,y)),24),capFabric,cap,[0,0,0],[1,1,0.98]);
const billShape=new THREE.Shape();
billShape.moveTo(-0.265,0.19);billShape.quadraticCurveTo(-0.37,0.4,-0.30,0.59);
billShape.quadraticCurveTo(0,0.72,0.30,0.59);billShape.quadraticCurveTo(0.37,0.4,0.265,0.19);billShape.closePath();
const bill=mesh(new THREE.ExtrudeGeometry(billShape,{depth:0.025,bevelEnabled:false,curveSegments:8}),capFabric,cap,[0,0.012,0]);
bill.rotation.x=Math.PI/2;
const seamMaterial=new THREE.LineBasicMaterial({color:'#303949'});
for(let panel=0;panel<6;panel++){
  const angle=(panel/6)*Math.PI*2+Math.PI/6;
  const points=crownProfile.map(([r,y])=>new THREE.Vector3((r+0.002)*Math.sin(angle),y+0.002,(r+0.002)*Math.cos(angle)*0.98));
  cap.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),seamMaterial));
}
ball(cap,capFabric,[0,0.345,0],[0.035,0.018,0.035]);
const logoCanvas=document.createElement('canvas');logoCanvas.width=logoCanvas.height=128;
const logoPaint=logoCanvas.getContext('2d');logoPaint.fillStyle='#ffffff';logoPaint.font='bold 74px Arial';
logoPaint.fillText('L',24,83);logoPaint.fillText('A',52,103);
const logoMap=new THREE.CanvasTexture(logoCanvas);logoMap.colorSpace=THREE.SRGBColorSpace;
mesh(new THREE.PlaneGeometry(0.20,0.17),new THREE.MeshLambertMaterial({map:logoMap,transparent:true,depthWrite:false}),cap,[0,0.15,0.333]);

return izzy;
}
