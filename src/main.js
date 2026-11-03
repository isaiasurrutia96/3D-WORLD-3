import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';
import { createPlayer, stepPlayer, FLOOR_HALF_SIZE, MAX_SPEED, POOL, TOWER, LADDER, floorHeight, inPool } from './movement.js';

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
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
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
ground(-FLOOR_HALF_SIZE,POOL.minX,-FLOOR_HALF_SIZE,FLOOR_HALF_SIZE);
ground(POOL.maxX,FLOOR_HALF_SIZE,-FLOOR_HALF_SIZE,FLOOR_HALF_SIZE);
ground(POOL.minX,POOL.maxX,-FLOOR_HALF_SIZE,POOL.minZ);
ground(POOL.minX,POOL.maxX,POOL.maxZ,FLOOR_HALF_SIZE);
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
function worldLabel(text,position){
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=96;
  const ctx=canvas.getContext('2d');ctx.fillStyle='#101831dd';ctx.fillRect(0,0,512,96);ctx.font='bold 24px sans-serif';ctx.fillStyle='#e7edf9';ctx.textAlign='center';ctx.fillText(text,256,58);
  const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;
  const label=new THREE.Sprite(new THREE.SpriteMaterial({map,depthTest:true}));label.position.set(...position);label.scale.set(3.8,0.72,1);scene.add(label);
}
worldLabel('LADDER · WALK OR JUMP ON',[-9,6.3,-1.9]);
worldLabel('POOL · SPACE TO STROKE',[poolX,1.5,POOL.minZ-0.4]);
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
ball(pelvis,mannequin,[0,0.04,0],[0.34,0.23,0.24]);
const torso = joint(pelvis, 'spine', [0,0.25,0]);
// Broad shoulders and a rounded, tapered base match the mannequin reference.
const bodyProfile=[ [0,-0.32],[0.22,-0.31],[0.34,-0.25],[0.41,-0.12],
  [0.46,0.13],[0.47,0.38],[0.43,0.46],[0.28,0.49],[0,0.49] ];
mesh(new THREE.LatheGeometry(bodyProfile.map(([r,y])=>new THREE.Vector2(r,y)),16),
  mannequin,torso,[0,0.12,0],[0.8,0.78,0.56]);
function segment(parent,position,radius,length){
  return mesh(new THREE.CapsuleGeometry(radius,length,4,12),mannequin,parent,position);
}
for (const side of [-1,1]) {
  const hip = joint(pelvis, `${side<0?'left':'right'}_hip`, [side*0.23,-0.15,0]);
  segment(hip,[0,-0.145*LIMB_LENGTH,0],0.195,0.29*LIMB_LENGTH-0.2);
  const knee = joint(hip,`${side<0?'left':'right'}_knee`,[0,-0.29*LIMB_LENGTH,0]);
  segment(knee,[0,-0.125*LIMB_LENGTH,0],0.155,0.25*LIMB_LENGTH-0.17);
  const ankle = joint(knee,`${side<0?'left':'right'}_ankle`,[0,-0.25*LIMB_LENGTH,0]);
  ball(ankle,mannequin,[0,-0.08,0.11],[0.23,0.13,0.36]);
  const shoulder = joint(torso,`${side<0?'left':'right'}_shoulder`,[side*0.35,0.31,0]);
  shoulder.rotation.z = side*0.16;
  segment(shoulder,[side*0.025,-0.145*ARM_LENGTH,0],0.16,0.29*ARM_LENGTH-0.21);
  const elbow = joint(shoulder,`${side<0?'left':'right'}_elbow`,[side*0.07,-0.29*ARM_LENGTH,0]);
  segment(elbow,[0,-0.115*ARM_LENGTH,0.02],0.145,0.23*ARM_LENGTH-0.16);
  const wrist = joint(elbow,`${side<0?'left':'right'}_wrist`,[0,-0.23*ARM_LENGTH,0.03]);
  ball(wrist,mannequin,[0,-0.075,0.025],[0.205,0.20,0.18]);
}
const head = joint(torso,'neck',[0,0.66,0]);
mesh(new THREE.CylinderGeometry(0.135,0.17,0.23,12),mannequin,head,[0,-0.065,0]);
mesh(new THREE.SphereGeometry(0.34,20,16),mannequin,head,[0,0.26,0]);
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
const keys = new Set();
const inputCodes = new Set(['KeyE','KeyD','KeyA','KeyF','ArrowUp','ArrowLeft','ArrowDown','ArrowRight','Space','KeyC']);
function press(code) {
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
function clearInput() { keys.clear(); player.jumpHeld = false; player.jumpQueued = false; player.interactQueued=false; }
window.addEventListener('blur',clearInput);
for (const button of document.querySelectorAll('[data-key]')) {
  button.addEventListener('pointerdown', event => { event.preventDefault(); button.setPointerCapture(event.pointerId); press(button.dataset.key); });
  for (const type of ['pointerup','pointercancel','lostpointercapture']) button.addEventListener(type, () => release(button.dataset.key));
}
// Camera-relative movement: E follows the horizontal viewing direction.
const moveForward = new THREE.Vector3(), moveRight = new THREE.Vector3(), moveDirection = new THREE.Vector3();
function inputDirection() {
  moveForward.subVectors(controls.target,camera.position).setY(0).normalize();
  moveRight.crossVectors(moveForward,camera.up).normalize();
  const horizontal = Number(keys.has('KeyF')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft'));
  const vertical = Number(keys.has('KeyE')||keys.has('ArrowUp'))-Number(keys.has('KeyD')||keys.has('ArrowDown'));
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
      const shoulderHeight=player.y+THREE.MathUtils.lerp(0.68,STANDING_HIP_HEIGHT,release)+0.56;
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
  while (accumulator >= fixedStep) { stepPlayer(player,inputDirection(),fixedStep); accumulator-=fixedStep; }
  izzy.position.set(player.x,player.y,player.z); izzy.rotation.y=player.yaw;
  animatePlayer(dt);
  updateBubbles(dt);
  shadow.position.set(player.x,floorHeight(player.x,player.z)+0.004,player.z);
  shadow.visible = !inPool(player.x,player.z) && player.mode!=='climb' && Math.abs(player.x)<=FLOOR_HALF_SIZE && Math.abs(player.z)<=FLOOR_HALF_SIZE;
  shadow.material.opacity=0.22/(1+Math.max(0,player.y)*0.5);
  shadow.scale.setScalar(1+Math.max(0,player.y)*0.12); shadow.scale.y*=0.7;
  const target = new THREE.Vector3(player.x,player.y+(player.mode==='swim' ? 1.0 : 1.3),player.z);
  const offset = target.sub(controls.target);
  controls.target.add(offset); camera.position.add(offset);
  controls.update();
  // Settle behind the character, preserving manual orbit/zoom for a short time.
  chaseOffset.subVectors(camera.position,controls.target);
  chaseSpherical.setFromVector3(chaseOffset);
  const travelling=Math.hypot(player.vx,player.vz)>0.5 || player.mode==='climb' || player.mode==='swim';
  if(time> manualCameraUntil && travelling){
    const heading=player.yaw+Math.PI;
    const difference=Math.atan2(Math.sin(heading-chaseSpherical.theta),Math.cos(heading-chaseSpherical.theta));
    chaseSpherical.theta+=difference*(1-Math.exp(-2.5*dt));
    chaseSpherical.phi=THREE.MathUtils.lerp(chaseSpherical.phi,player.mode==='swim' ? 1.43 : 1.18,1-Math.exp(-2*dt));
    camera.position.copy(controls.target).add(chaseOffset.setFromSpherical(chaseSpherical));
  }
  // Keep the chase camera in front of the climbing box rather than inside it.
  cameraRayDirection.subVectors(camera.position,controls.target);
  const desiredDistance=cameraRayDirection.length();
  cameraRay.set(controls.target,cameraRayDirection.normalize());cameraRay.far=desiredDistance;
  const obstruction=cameraRay.intersectObject(tower)[0];
  if(obstruction)camera.position.copy(controls.target).addScaledVector(cameraRayDirection,Math.max(0.6,obstruction.distance-0.25));
  // Let the lens descend with Izzy and keep it within the pool walls/bottom.
  if(player.mode==='swim' && camera.position.y<0){
    camera.position.x=THREE.MathUtils.clamp(camera.position.x,POOL.minX+0.3,POOL.maxX-0.3);
    camera.position.z=THREE.MathUtils.clamp(camera.position.z,POOL.minZ+0.3,POOL.maxZ-0.3);
    camera.position.y=Math.max(POOL.bottom+0.3,camera.position.y);
  }
  const submerged=inPool(camera.position.x,camera.position.z)&&camera.position.y<POOL.water;
  scene.fog.color.set(submerged ? '#174957' : '#080e25');
  scene.fog.near=submerged ? 4 : 35;scene.fog.far=submerged ? 30 : 85;
  camera.lookAt(controls.target);
  renderer.render(scene,camera);
  canvas.dataset.state = player.mode==='land' ? (player.grounded ? 'grounded' : 'airborne') : player.mode;
  const label=document.querySelector('.scene-label');
  label.textContent=player.mode==='exitPool' ? 'PULLING UP · PUSHING ONTO THE EDGE' : player.mode==='climb' ? 'CLIMBING · E UP / D DOWN · SPACE LET GO' : player.mode==='swim' ? 'SWIMMING · SPACE STROKE / C DIVE · TAP SPACE AT EDGE TO CLIMB OUT' : 'LADDER: WALK OR JUMP ON · E UP / D DOWN';
  canvas.dataset.position = `${player.x.toFixed(3)},${player.y.toFixed(3)},${player.z.toFixed(3)}`;
});
