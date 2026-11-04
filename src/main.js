import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';
import {TRACK,createKart,stepKart,roadDistance} from './driving.js';
import {COURSE_SURFACES,CHECKPOINTS,createCourse,updateCourse} from './course.js';
import { createPlayer, stepPlayer, FLOOR_HALF_SIZE, FLOOR_HALF_LENGTH, MAX_SPEED, POOL, TOWER, LADDER, floorHeight, inPool } from './movement.js';

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
renderer.setPixelRatio(1);
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;
renderer.toneMappingExposure = 1.25;
const scene = new THREE.Scene();
scene.background = new THREE.Color('#080e25');
scene.fog = new THREE.Fog('#080e25', 35, 85);
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
let manualCameraUntil=0;
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 6;
controls.maxDistance = 16;
controls.minPolarAngle = 0.3;
controls.maxPolarAngle = Math.PI / 2 - 0.05;
controls.target.set(0, 1.1, 0);
function reset() {
  const position = controls.target.clone();
  camera.position.copy(position).add(new THREE.Vector3(0,3.3,-8.5));
  controls.update();
}
reset();
controls.addEventListener('start',()=>{manualCameraUntil=performance.now()+1800;});
controls.addEventListener('end',()=>{manualCameraUntil=performance.now()+1800;});
document.querySelector('#reset').addEventListener('click', reset);
canvas.addEventListener('keydown', event => {
  if (event.key.toLowerCase() === 'r') reset();
});
scene.add(new THREE.HemisphereLight('#ffffff', '#8e96ac', 1.8));
const sun = new THREE.DirectionalLight('#ffffff', 1.7);
sun.position.set(-3, 8, 5);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left:-7, right:7, top:7, bottom:-7, near:0.1, far:25 });
sun.shadow.normalBias = 0.025;
sun.shadow.bias = -0.0002;
sun.shadow.radius = 4;
scene.add(sun);
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
// Four ground pieces leave a real opening for the rectangular pool.
const groundMaterial = material('#e6e0cf');
function ground(x1,x2,z1,z2) {
  return mesh(new THREE.BoxGeometry(x2-x1,0.25,z2-z1),groundMaterial,scene,[(x1+x2)/2,-0.125,(z1+z2)/2]);
}
ground(-FLOOR_HALF_SIZE,POOL.minX,-FLOOR_HALF_LENGTH,FLOOR_HALF_LENGTH);
ground(POOL.maxX,FLOOR_HALF_SIZE,-FLOOR_HALF_LENGTH,FLOOR_HALF_LENGTH);
ground(POOL.minX,POOL.maxX,-FLOOR_HALF_LENGTH,POOL.minZ);
ground(POOL.minX,POOL.maxX,POOL.maxZ,FLOOR_HALF_LENGTH);
const tower = mesh(new THREE.BoxGeometry(6,TOWER.height,6),material('#8a819b'),scene,[-9,TOWER.height/2,-5]);
tower.name='Climbing box';
const ladderMaterial = material('#ba9461');
for(const x of [LADDER.x-0.43,LADDER.x+0.43]) {
  mesh(new THREE.CylinderGeometry(0.065,0.065,TOWER.height,8),ladderMaterial,scene,[x,TOWER.height/2,-1.9]);
}
for(let y=0.3;y<TOWER.height-0.1;y+=0.35){
  const rung=mesh(new THREE.CylinderGeometry(0.045,0.045,0.86,8),ladderMaterial,scene,[LADDER.x,y,-1.9]);
  rung.rotation.z=Math.PI/2;
}
const poolMaterial=material('#668c9b');
const poolWidth=POOL.maxX-POOL.minX, poolDepth=POOL.maxZ-POOL.minZ;
const poolX=(POOL.minX+POOL.maxX)/2, poolZ=(POOL.minZ+POOL.maxZ)/2;
mesh(new THREE.BoxGeometry(poolWidth,0.25,poolDepth),poolMaterial,scene,[poolX,POOL.bottom-0.125,poolZ]);
for(const x of [POOL.minX,POOL.maxX]) mesh(new THREE.BoxGeometry(0.2,4,poolDepth),poolMaterial,scene,[x,-2,poolZ]);
for(const z of [POOL.minZ,POOL.maxZ]) mesh(new THREE.BoxGeometry(poolWidth,4,0.2),poolMaterial,scene,[poolX,-2,z]);
const water=mesh(new THREE.PlaneGeometry(poolWidth,poolDepth),new THREE.MeshBasicMaterial({color:'#3899b5',transparent:true,opacity:0.55,side:THREE.DoubleSide,depthWrite:false}),scene,[poolX,POOL.water,poolZ]);
water.rotation.x=-Math.PI/2;
const coping=material('#a9bac1');
for(const x of [POOL.minX-0.15,POOL.maxX+0.15]) mesh(new THREE.BoxGeometry(0.3,0.12,poolDepth+0.6),coping,scene,[x,0.02,poolZ]);
for(const z of [POOL.minZ-0.15,POOL.maxZ+0.15]) mesh(new THREE.BoxGeometry(poolWidth+0.6,0.12,0.3),coping,scene,[poolX,0.02,z]);
const worldLabels=[];
function worldLabel(text,position){
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=96;
  const ctx=canvas.getContext('2d');ctx.fillStyle='#101831dd';ctx.fillRect(0,0,512,96);ctx.font='bold 24px sans-serif';ctx.fillStyle='#e7edf9';ctx.textAlign='center';ctx.fillText(text,256,58);
  const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;
  const label=new THREE.Sprite(new THREE.SpriteMaterial({map,depthTest:true}));label.position.set(...position);label.scale.set(2.8,0.53,1);scene.add(label);worldLabels.push(label);
}
worldLabel('LADDER · WALK OR JUMP ON',[-9,6.3,-1.9]);
worldLabel('POOL · SPACE TO STROKE',[poolX,1.5,POOL.minZ-0.4]);
const courseColors={step:'#ae9b79',platform:'#798b9c',ramp:'#849b87'};
const courseObstacles=[];
for(const surface of COURSE_SURFACES){
  const w=surface.maxX-surface.minX,d=surface.maxZ-surface.minZ;
  let geometry;
  if(surface.kind==='ramp'){
    geometry=new THREE.BoxGeometry(w,surface.height,d);
    const positions=geometry.attributes.position;
    for(let i=0;i<positions.count;i++)if(positions.getY(i)>0){
      const progress=(positions.getZ(i)+d/2)/d;
      positions.setY(i,surface.height*(1-progress)-surface.height/2);
    }
    geometry.computeVertexNormals();
  }else geometry=new THREE.BoxGeometry(w,surface.height,d);
  courseObstacles.push(mesh(geometry,material(courseColors[surface.kind]),scene,[(surface.minX+surface.maxX)/2,surface.height/2,(surface.minZ+surface.maxZ)/2]));
}
const checkpointMarkers=CHECKPOINTS.map((checkpoint,index)=>{
  const ring=mesh(new THREE.TorusGeometry(checkpoint.radius,0.07,5,32),material('#b28d48'),scene,[checkpoint.x,checkpoint.name==='SWIM'?POOL.water+0.03:checkpoint.y+0.07,checkpoint.z]);
  ring.rotation.x=-Math.PI/2;
  worldLabel(`${index+1} · ${checkpoint.name}`,[checkpoint.x,checkpoint.y+3.8,checkpoint.z]);
  return ring;
});
// Ground arrows make the route discoverable between the separated activities.
const route=[{x:0,z:3},...CHECKPOINTS.slice(0,3),{x:-18,z:48},{x:-18,z:1},{x:-9,z:1},CHECKPOINTS[3],{x:-9,z:3},{x:6,z:3},CHECKPOINTS[4],{x:28,z:-11},{x:0,z:-11},CHECKPOINTS[5]];
for(let i=0;i<route.length-1;i++){
  const from=route[i],to=route[i+1],distance=Math.hypot(to.x-from.x,to.z-from.z);
  for(let offset=5;offset<distance-3;offset+=5){
    const t=offset/distance,x=from.x+(to.x-from.x)*t,z=from.z+(to.z-from.z)*t;
    if(inPool(x,z))continue;
    const arrow=new THREE.Shape();arrow.moveTo(0,0.5);arrow.lineTo(-0.3,-0.35);arrow.lineTo(0,-0.1);arrow.lineTo(0.3,-0.35);arrow.closePath();
    const marker=mesh(new THREE.ShapeGeometry(arrow),material('#c4a668'),scene,[x,floorHeight(x,z)+0.02,z]);
    marker.rotation.x=-Math.PI/2;marker.rotation.z=Math.atan2(to.x-from.x,-(to.z-from.z));
  }
}
// Wide oval circuit around the movement course.
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
const roadMaterial=material('#3b4353');roadMaterial.side=THREE.DoubleSide;mesh(roadGeometry,roadMaterial,scene,[0,0,0]);
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
  });scene.add(walls);
});
const lanePoints=ovalPoints(75),laneDashes=new THREE.InstancedMesh(new THREE.BoxGeometry(0.18,0.015,2),material('#d7d7bd'),lanePoints.length/2);
lanePoints.forEach((point,index)=>{if(index%2)return;const next=lanePoints[(index+1)%lanePoints.length];instanceTransform.position.set(point.x,0.055,point.z);instanceTransform.rotation.set(0,Math.atan2(next.x-point.x,next.z-point.z),0);instanceTransform.scale.set(1,1,1);instanceTransform.updateMatrix();laneDashes.setMatrixAt(index/2,instanceTransform.matrix);});scene.add(laneDashes);
for(let x=67;x<83;x+=2)for(let z=-1;z<1;z++)mesh(new THREE.BoxGeometry(2,0.018,1),material((Math.round((x-67)/2)+z)%2?'#e8e8dd':'#121b29'),scene,[x+1,0.06,z+0.5]);
worldLabel('CIRCUIT → · VISIT KART',[43,3.2,0]);
worldLabel('H · ENTER / EXIT',[75,4,0]);
const kart=createKart(),kartModel=joint(scene,'Placeholder kart',[kart.x,0,kart.z]);
const kartBody=material('#597eaa'),kartDark=material('#1e2735'),rubber=material('#1b2028');
mesh(new THREE.BoxGeometry(1.9,0.3,2.8),kartBody,kartModel,[0,0.58,0]);
mesh(new THREE.BoxGeometry(1.7,0.3,0.8),kartBody,kartModel,[0,0.76,0.9]);
mesh(new THREE.BoxGeometry(0.85,0.5,0.9),kartDark,kartModel,[0,0.92,-0.15]);
mesh(new THREE.BoxGeometry(0.85,0.8,0.18),kartDark,kartModel,[0,1.2,-0.55]);
mesh(new THREE.BoxGeometry(2.1,0.15,0.16),kartDark,kartModel,[0,0.48,1.5]);
const wheels=[];
for(const x of [-1,1])for(const z of [-0.95,0.95]){
  const steering=joint(kartModel,'wheel_steering',[x,0.4,z]);
  const wheel=mesh(new THREE.CylinderGeometry(0.38,0.38,0.32,12),rubber,steering,[0,0,0]);wheel.rotation.z=Math.PI/2;
  wheels.push({steering,wheel,front:z>0});
}
const steeringWheel=mesh(new THREE.TorusGeometry(0.24,0.04,6,12),kartDark,kartModel,[0,1.22,0.57]);steeringWheel.rotation.x=-0.6;
// Simple era-style contact shadow, rather than modern real-time soft shadows.
const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.61, 16),
  new THREE.MeshBasicMaterial({ color: '#36333c', transparent: true, opacity: 0.22, depthWrite: false }));
shadow.rotation.x = -Math.PI / 2;
shadow.position.y = 0.004;
shadow.scale.y = 0.7;
scene.add(shadow);
const LIMB_LENGTH=1.65;
const ARM_LENGTH=LIMB_LENGTH*1.08;
const STANDING_HIP_HEIGHT=0.15+0.54*LIMB_LENGTH+0.21;
const izzy = joint(scene, 'Izzy', [0,0,0]);
// Limb pivots drive the run cycle and airborne pose.
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
  ball(ankle,sneakers,[0,-0.08,0.11],[0.23,0.13,0.36]);
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
function resize() {
  const width = canvas.clientWidth, height = canvas.clientHeight;
  const renderScale = Math.min(1, 480 / height);
  renderer.setSize(Math.round(width * renderScale),Math.round(height * renderScale),false);
  camera.aspect=width/height;
  camera.fov = width < 700 ? 55 : 45;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize',resize); resize();
const orbit = new THREE.Spherical();
const mouseOffset = new THREE.Vector3();
const controlHint = document.querySelector('.controls div>span');
window.addEventListener('keydown', async event => {
  if (event.code !== 'KeyL' || event.repeat || event.target.closest('input,textarea,select')) return;
  event.preventDefault();
  if (document.pointerLockElement === canvas) { document.exitPointerLock(); return; }
  try {
    if (!canvas.requestPointerLock) throw new Error('Pointer lock unavailable');
    await canvas.requestPointerLock();
  } catch {
    controlHint.textContent = 'Mouse lock unavailable · Drag to orbit';
  }
});
document.addEventListener('pointerlockchange', () => {
  const locked = document.pointerLockElement === canvas;
  controls.enabled = !locked;
  canvas.dataset.mouseLocked = String(locked);
  controlHint.textContent = locked
    ? 'Mouse locked · Move mouse to look · L / Esc to release'
    : 'Hold Space for height · L locks mouse · Drag to orbit';
});
document.addEventListener('pointerlockerror', () => {
  controlHint.textContent = 'Mouse lock blocked · Click the game and press L again';
});
document.addEventListener('mousemove', event => {
  if (document.pointerLockElement !== canvas) return;
  manualCameraUntil=performance.now()+1800;
  mouseOffset.subVectors(camera.position,controls.target);
  orbit.setFromVector3(mouseOffset);
  orbit.theta -= event.movementX*0.0025;
  orbit.phi = THREE.MathUtils.clamp(orbit.phi-event.movementY*0.0025,
    controls.minPolarAngle,controls.maxPolarAngle);
  camera.position.copy(controls.target).add(mouseOffset.setFromSpherical(orbit));
  camera.lookAt(controls.target);
});
const player = createPlayer();
const course=createCourse();
function kartSidePosition(){
  let x=kart.x+Math.cos(kart.yaw)*2.5,z=kart.z-Math.sin(kart.yaw)*2.5;
  if(roadDistance(x,z)<66.7||roadDistance(x,z)>83.3){x=kart.x-Math.cos(kart.yaw)*2.5;z=kart.z+Math.sin(kart.yaw)*2.5;}
  return {x,z};
}
function nearKart(){return player.mode==='land'&&player.grounded&&Math.hypot(player.x-kart.x,player.z-kart.z)<3.6;}
function toggleKart(){
  if(player.mode==='drive'){
    if(Math.abs(kart.speed)>1){document.querySelector('#drive-status').textContent='Brake to a stop before getting out';return;}
    Object.assign(player,{mode:'land',...kartSidePosition(),y:0,vx:0,vy:0,vz:0,grounded:true});
  }else if(nearKart()){player.mode='drive';player.jumpQueued=false;player.interactQueued=false;}
  clearInput();manualCameraUntil=0;
}
document.querySelector('#enter-kart').addEventListener('click',toggleKart);
document.querySelector('#visit-kart').addEventListener('click',()=>{
  if(player.mode==='drive')return;
  Object.assign(player,createPlayer(),kartSidePosition());
  clearInput();controls.target.set(player.x,1.3,player.z);reset();
});
document.querySelector('#restart').addEventListener('click',()=>{
  Object.assign(player,createPlayer());Object.assign(course,createCourse());clearInput();
  controls.target.set(0,1.3,0);reset();
});
const keys = new Set();
const joystickInput={x:0,y:0};
const inputCodes = new Set(['KeyE','KeyD','KeyA','KeyF','ArrowUp','ArrowLeft','ArrowDown','ArrowRight','Space','KeyC','KeyH']);
function press(code) {
  if(code==='KeyH'&&!keys.has(code)){toggleKart();return;}
  if (code === 'Space' && !keys.has(code)) player.jumpQueued = true;
  if (code === 'KeyC' && !keys.has(code) && player.mode!=='swim' && player.mode!=='exitPool') player.interactQueued = true;
  keys.add(code); player.jumpHeld = keys.has('Space');
}
function release(code) { keys.delete(code); player.jumpHeld = keys.has('Space'); }
window.addEventListener('keydown', event => {
  if (!inputCodes.has(event.code) || event.target.closest('input,textarea,select')) return;
  event.preventDefault();
  if (!event.repeat) press(event.code);
});
window.addEventListener('keyup', event => { if (inputCodes.has(event.code)) { event.preventDefault(); release(event.code); } });
function clearInput() { keys.clear(); player.jumpHeld = false; player.jumpQueued = false; player.interactQueued=false; joystickInput.x=joystickInput.y=0; document.querySelector('.joystick-stick').style.transform='translate(-50%,-50%)'; }
window.addEventListener('blur',clearInput);
for (const button of document.querySelectorAll('[data-key]')) {
  button.addEventListener('pointerdown', event => { event.preventDefault(); button.setPointerCapture(event.pointerId); press(button.dataset.key); });
  for (const type of ['pointerup','pointercancel','lostpointercapture']) button.addEventListener(type, () => release(button.dataset.key));
}
const joystick=document.querySelector('.joystick');
const stick=joystick.querySelector('.joystick-stick');
let joystickPointer=null;
function updateJoystick(event){
  const rect=joystick.getBoundingClientRect();
  const max=rect.width*0.32;
  let x=(event.clientX-rect.left-rect.width/2)/max,y=(event.clientY-rect.top-rect.height/2)/max;
  const distance=Math.hypot(x,y);if(distance>1){x/=distance;y/=distance;}
  joystickInput.x=Math.abs(x)<0.12?0:x;joystickInput.y=Math.abs(y)<0.12?0:y;
  stick.style.transform=`translate(calc(-50% + ${x*max}px),calc(-50% + ${y*max}px))`;
}
joystick.addEventListener('pointerdown',event=>{if(joystickPointer!==null)return;event.preventDefault();joystickPointer=event.pointerId;joystick.setPointerCapture(event.pointerId);updateJoystick(event);});
joystick.addEventListener('pointermove',event=>{if(event.pointerId===joystickPointer)updateJoystick(event);});
for(const eventName of ['pointerup','pointercancel','lostpointercapture'])joystick.addEventListener(eventName,event=>{
  if(event.pointerId!==joystickPointer)return;joystickPointer=null;joystickInput.x=joystickInput.y=0;stick.style.transform='translate(-50%,-50%)';
});
// Camera-relative movement: E follows the horizontal viewing direction.
const moveForward = new THREE.Vector3(), moveRight = new THREE.Vector3(), moveDirection = new THREE.Vector3();
function inputDirection() {
  moveForward.subVectors(controls.target,camera.position).setY(0).normalize();
  moveRight.crossVectors(moveForward,camera.up).normalize();
  const horizontal = Number(keys.has('KeyF')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft'))+joystickInput.x;
  const vertical = Number(keys.has('KeyE')||keys.has('ArrowUp'))-Number(keys.has('KeyD')||keys.has('ArrowDown'))-joystickInput.y;
  moveDirection.copy(moveForward).multiplyScalar(vertical).addScaledVector(moveRight,horizontal);
  return { x:moveDirection.x, z:moveDirection.z, climb:vertical, dive:keys.has('KeyC') };
}
const limbs = ['left','right'].map(side => Object.fromEntries(
  ['hip','knee','ankle','shoulder','elbow','wrist'].map(name => [name,izzy.getObjectByName(`${side}_${name}`)])));
function animatePlayer(dt) {
  const amount = Math.min(1, Math.hypot(player.vx,player.vz)/MAX_SPEED);
  const blend = 1-Math.exp(-18*dt);
  const pose = (joint, value) => joint.rotation.x = THREE.MathUtils.lerp(joint.rotation.x,value,blend);
  if(player.mode==='exitPool') {
    const t=player.poolExit.time/player.poolExit.duration;
    const release=THREE.MathUtils.smoothstep(t,0.32,0.75);
    limbs.forEach((limb,index)=>{
      // Two-link arm reach toward the rim, then release as the torso clears it.
      const shoulderHeight=player.y+THREE.MathUtils.lerp(0.68,STANDING_HIP_HEIGHT,release)+0.68;
      const dy=0.12-shoulderHeight, dz=0.36;
      const upper=0.29*ARM_LENGTH, lower=0.23*ARM_LENGTH+0.07;
      const distance=THREE.MathUtils.clamp(Math.hypot(dy,dz),0.08,upper+lower-0.001);
      const shoulderAngle=Math.atan2(-dz,-dy)+Math.acos(THREE.MathUtils.clamp((upper*upper+distance*distance-lower*lower)/(2*upper*distance),-1,1));
      const elbowAngle=-Math.acos(THREE.MathUtils.clamp((distance*distance-upper*upper-lower*lower)/(2*upper*lower),-1,1));
      pose(limb.shoulder,THREE.MathUtils.lerp(shoulderAngle,0,release));
      pose(limb.elbow,THREE.MathUtils.lerp(elbowAngle,0,release));
      pose(limb.wrist,THREE.MathUtils.lerp(-0.7,0,release));
      pose(limb.hip,(index===0?-0.85:-0.25)*(1-release));
      pose(limb.knee,(index===0?1.2:0.55)*(1-release));
      pose(limb.ankle,-0.25*(1-release));
    });
    pelvis.rotation.x=THREE.MathUtils.lerp(pelvis.rotation.x,0,blend);
    pelvis.position.y=THREE.MathUtils.lerp(0.68,STANDING_HIP_HEIGHT,release);
    torso.rotation.x=0.3*(1-release);torso.rotation.y=0;
    return;
  }
  if(player.mode==='climb' || player.mode==='swim') {
    const climbing=player.mode==='climb';
    limbs.forEach((limb,index)=>{
      const stroke=Math.sin(player.gait+index*Math.PI);
      pose(limb.shoulder,climbing ? -2.3+stroke*0.45 : -1.5+stroke*1.1);
      pose(limb.elbow,climbing ? -0.4-stroke*0.25 : -0.45);
      pose(limb.wrist,climbing ? -0.25 : 0);
      pose(limb.hip,climbing ? -0.55-stroke*0.35 : stroke*0.4);
      pose(limb.knee,climbing ? 0.75+stroke*0.45 : 0.2+Math.max(0,-stroke)*0.45);
      pose(limb.ankle,climbing ? -0.2 : 0.25);
    });
    pelvis.rotation.x=THREE.MathUtils.lerp(pelvis.rotation.x,climbing ? 0 : 1.05,blend);
    pelvis.position.y=STANDING_HIP_HEIGHT;
    torso.rotation.x=0;torso.rotation.y=0;
    return;
  }
  pelvis.rotation.x=THREE.MathUtils.lerp(pelvis.rotation.x,0,blend);
  limbs.forEach((limb,index) => {
    const phase = player.gait+index*Math.PI;
    const stride = Math.sin(phase);
    const recovery = Math.max(0,-Math.cos(phase));
    const running = player.grounded;
    pose(limb.hip,running ? stride*1.25*amount : (index===0 ? -0.65 : 0.3));
    pose(limb.knee,running ? (0.12+recovery*1.35)*amount : 0.85);
    // Counter-rotate the ankle against the thigh and shin. Keep the sole
    // near level in stance, roll off the toe, then lift the toes in recovery.
    const footPitch = (recovery > 0 ? -0.18 : Math.max(0,stride)*0.5)*amount;
    const anklePitch = THREE.MathUtils.clamp(footPitch-limb.hip.rotation.x-limb.knee.rotation.x,-1.3,0.9);
    pose(limb.ankle,running ? anklePitch : (player.vy>0 ? 0.25 : -0.2));
    pose(limb.shoulder,running ? -stride*1.15*amount : -1.1);
    pose(limb.elbow,running ? -(0.9+stride*0.2)*amount : -0.6);
    pose(limb.wrist,0);
  });
  pelvis.position.y = STANDING_HIP_HEIGHT + (player.grounded ? Math.abs(Math.sin(player.gait))*0.14*amount-player.landing*0.09 : 0);
  torso.rotation.x = player.grounded ? amount*0.24 : -0.06;
  torso.rotation.y = player.grounded ? Math.sin(player.gait)*0.12*amount : 0;
}
// Reuse a small pool of bubble meshes; no per-frame particle allocations.
const bubbleGeometry=new THREE.SphereGeometry(1,6,4);
const bubbleMaterial=new THREE.MeshBasicMaterial({color:'#c4f2ff',transparent:true,opacity:0.55,wireframe:true,depthWrite:false});
const bubbles=Array.from({length:36},()=>{
  const mesh=new THREE.Mesh(bubbleGeometry,bubbleMaterial);mesh.visible=false;scene.add(mesh);
  return {mesh,life:0,speed:0,wobble:0};
});
let bubbleTimer=0;
const bubbleOrigin=new THREE.Vector3();
function updateBubbles(dt){
  if(player.mode==='swim'){
    bubbleTimer+=dt;
    if(bubbleTimer>0.09){
      bubbleTimer=0;
      const bubble=bubbles.find(b=>b.life<=0);
      if(bubble){
        head.updateWorldMatrix(true,false);bubbleOrigin.set(0,0.26,0);head.localToWorld(bubbleOrigin);
        bubble.mesh.position.copy(bubbleOrigin);bubble.mesh.position.y=Math.min(POOL.water-0.1,bubbleOrigin.y);
        bubble.mesh.position.x+=(Math.random()-0.5)*0.22;bubble.mesh.position.z+=(Math.random()-0.5)*0.22;
        bubble.life=2.5;bubble.speed=0.6+Math.random()*0.5;bubble.wobble=Math.random()*6.28;
        bubble.mesh.scale.setScalar(0.025+Math.random()*0.045);bubble.mesh.visible=true;
      }
    }
  }else bubbleTimer=0;
  for(const bubble of bubbles){
    if(bubble.life<=0)continue;
    bubble.life-=dt;bubble.wobble+=dt*3;
    bubble.mesh.position.y+=bubble.speed*dt;
    bubble.mesh.position.x+=Math.sin(bubble.wobble)*dt*0.08;
    if(bubble.life<=0||bubble.mesh.position.y>=POOL.water){bubble.life=0;bubble.mesh.visible=false;}
  }
}
const chaseOffset=new THREE.Vector3(), chaseSpherical=new THREE.Spherical();
const cameraRay=new THREE.Raycaster(), cameraRayDirection=new THREE.Vector3();
let previousTime, accumulator = 0;
const fixedStep = 1/120;
document.addEventListener('visibilitychange', () => { clearInput(); previousTime=undefined; accumulator=0; });
renderer.setAnimationLoop(time => {
  const dt = previousTime === undefined ? 0 : Math.min((time-previousTime)/1000,0.1);
  previousTime = time; accumulator += dt;
  while (accumulator >= fixedStep) {
    if(player.mode==='drive'){
      const throttle=Number(keys.has('KeyE')||keys.has('ArrowUp'));
      const brake=Number(keys.has('KeyD')||keys.has('ArrowDown'));
      const steer=Number(keys.has('KeyF')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft'))+joystickInput.x;
      stepKart(kart,{throttle,brake,steer},fixedStep);
      Object.assign(player,{x:kart.x,z:kart.z,y:0,yaw:kart.yaw,vx:Math.sin(kart.yaw)*kart.speed,vz:Math.cos(kart.yaw)*kart.speed});
    }else{stepPlayer(player,inputDirection(),fixedStep);updateCourse(course,player,fixedStep);}
    accumulator-=fixedStep;
  }
  izzy.position.set(player.x,player.y,player.z); izzy.rotation.y=player.yaw;
  kartModel.position.set(kart.x,0,kart.z);kartModel.rotation.y=kart.yaw;
  wheels.forEach(({steering,wheel,front})=>{steering.rotation.y=front?kart.steer*0.4:0;wheel.rotation.x=kart.wheelSpin;});
  const driving=player.mode==='drive';
  izzy.scale.setScalar(driving?0.7:1);
  izzy.position.y=driving?0.48:player.y;
  if(driving){
    pelvis.position.y=0.9;pelvis.rotation.x=0;torso.rotation.x=0.1;torso.rotation.y=0;
    limbs.forEach(limb=>{limb.hip.rotation.x=-1.25;limb.knee.rotation.x=1.4;limb.ankle.rotation.x=-0.15;limb.shoulder.rotation.x=-1.2;limb.elbow.rotation.x=-0.6;limb.wrist.rotation.x=0;});
  }else animatePlayer(dt);
  document.body.classList.toggle('driving',driving);
  document.querySelector('.controls div').firstChild.nodeValue=driving?'E gas · D brake / reverse · A/F steer · H exit':'E/D/A/F move · Space jump/swim/exit · C dive · Auto ladder';
  document.querySelector('#enter-kart').hidden=!driving&&!nearKart();
  document.querySelector('#enter-kart').textContent=driving?(Math.abs(kart.speed)>1?'Stop to exit':'Exit kart · H'):'Drive · H';
  document.querySelector('#enter-kart').disabled=driving&&Math.abs(kart.speed)>1;
  document.querySelector('#drive-status').hidden=!driving;
  if(driving)document.querySelector('#drive-status').textContent=`${Math.round(Math.abs(kart.speed)*3.6)} km/h · LAP ${kart.laps+1} · ${kart.lapTime.toFixed(1)}s · E gas / D brake / A F steer`;
  document.querySelector('[data-key="Space"]').hidden=driving;
  document.querySelectorAll('.pedal').forEach(button=>button.hidden=!driving);
  updateBubbles(dt);
  const diveButton=document.querySelector('[data-key="KeyC"]');
  diveButton.hidden=player.mode!=='swim';
  document.querySelector('#course-progress').textContent=course.finished
    ? `COURSE COMPLETE · ${course.elapsed.toFixed(1)}s`
    : `${course.next}/${CHECKPOINTS.length} · NEXT: ${CHECKPOINTS[course.next].name} · ${course.elapsed.toFixed(1)}s`;
  checkpointMarkers.forEach((marker,index)=>marker.material.color.set(index<course.next?'#76ba8a':index===course.next?'#f1c45d':'#7c899b'));
  shadow.position.set(player.x,floorHeight(player.x,player.z)+0.004,player.z);
  shadow.visible = !inPool(player.x,player.z) && player.mode!=='climb' && Math.abs(player.x)<=FLOOR_HALF_SIZE && Math.abs(player.z)<=FLOOR_HALF_LENGTH;
  shadow.material.opacity=0.22/(1+Math.max(0,player.y)*0.5);
  shadow.scale.setScalar(1+Math.max(0,player.y)*0.12); shadow.scale.y*=0.7;
  const target = new THREE.Vector3(player.x,player.y+(player.mode==='drive'?1.2:player.mode==='swim'?1.0:1.3),player.z);
  const offset = target.sub(controls.target);
  controls.target.add(offset); camera.position.add(offset);
  controls.update();
  // Settle behind the character, preserving manual orbit/zoom for a short time.
  chaseOffset.subVectors(camera.position,controls.target);
  chaseSpherical.setFromVector3(chaseOffset);
  const travelling=Math.hypot(player.vx,player.vz)>0.5 || player.mode==='climb' || player.mode==='swim' || player.mode==='drive';
  if(time> manualCameraUntil && travelling){
    const heading=player.yaw+Math.PI;
    const difference=Math.atan2(Math.sin(heading-chaseSpherical.theta),Math.cos(heading-chaseSpherical.theta));
    chaseSpherical.theta+=difference*(1-Math.exp(-2.5*dt));
    chaseSpherical.phi=THREE.MathUtils.lerp(chaseSpherical.phi,player.mode==='drive'?1.30:player.mode==='swim' ? 1.43 : 1.18,1-Math.exp(-2*dt));
    camera.position.copy(controls.target).add(chaseOffset.setFromSpherical(chaseSpherical));
  }
  // Keep the chase camera in front of the climbing box rather than inside it.
  cameraRayDirection.subVectors(camera.position,controls.target);
  const desiredDistance=cameraRayDirection.length();
  cameraRay.set(controls.target,cameraRayDirection.normalize());cameraRay.far=desiredDistance;
  const obstruction=cameraRay.intersectObjects([tower,...courseObstacles])[0];
  if(obstruction)camera.position.copy(controls.target).addScaledVector(cameraRayDirection,Math.max(0.6,obstruction.distance-0.25));
  // Let the lens descend with Izzy and keep it within the pool walls/bottom.
  if(player.mode==='swim' && camera.position.y<0){
    camera.position.x=THREE.MathUtils.clamp(camera.position.x,POOL.minX+0.3,POOL.maxX-0.3);
    camera.position.z=THREE.MathUtils.clamp(camera.position.z,POOL.minZ+0.3,POOL.maxZ-0.3);
    camera.position.y=Math.max(POOL.bottom+0.3,camera.position.y);
  }
  const submerged=inPool(camera.position.x,camera.position.z)&&camera.position.y<POOL.water;
  scene.fog.color.set(submerged ? '#174957' : '#080e25');
  scene.fog.near=submerged?4:player.mode==='drive'?70:35;scene.fog.far=submerged?30:player.mode==='drive'?260:160;
  camera.lookAt(controls.target);
  worldLabels.forEach(label=>{label.visible=label.position.distanceTo(camera.position)>7;});
  renderer.render(scene,camera);
  canvas.dataset.state = player.mode==='land' ? (player.grounded ? 'grounded' : 'airborne') : player.mode;
  const label=document.querySelector('.scene-label');
  label.textContent=player.mode==='drive' ? 'E GAS · D BRAKE / REVERSE · A F STEER · H EXIT WHEN STOPPED' : player.mode==='exitPool' ? 'PULLING UP · PUSHING ONTO THE EDGE' : player.mode==='climb' ? 'CLIMBING · E UP / D DOWN · SPACE LET GO' : player.mode==='swim' ? 'SWIMMING · SPACE STROKE / C DIVE · TAP SPACE AT EDGE TO CLIMB OUT' : 'LADDER: WALK OR JUMP ON · E UP / D DOWN';
  canvas.dataset.position = `${player.x.toFixed(3)},${player.y.toFixed(3)},${player.z.toFixed(3)}`;
});
