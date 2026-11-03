import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';
import { createPlayer, stepPlayer, FLOOR_HALF_SIZE, MAX_SPEED } from './movement.js';

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
const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
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
  camera.position.copy(position).add(new THREE.Vector3(6.5,3.7,9));
  controls.update();
}
reset();
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
const blue = material('#245dad');
const yellow = material('#f4c342');
const shoes = material('#50372b');
const gloves = material('#eee9db');
function paintedMaterial(draw) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  draw(canvas.getContext('2d'));
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.magFilter = THREE.NearestFilter;
  map.minFilter = THREE.NearestFilter;
  return new THREE.MeshLambertMaterial({ map });
}
const overalls = paintedMaterial(paint => {
  paint.fillStyle = '#f4c342'; paint.fillRect(0,0,128,128);
  paint.fillStyle = '#245dad'; paint.fillRect(0,78,128,50);
  for (const center of [32,96]) {
    paint.fillRect(center-16,54,32,34);
    paint.fillRect(center-16,20,6,40);
    paint.fillRect(center+10,20,6,40);
  }
});
const face = paintedMaterial(paint => {
  paint.fillStyle = '#efb483'; paint.fillRect(0,0,128,128);
  // Features are painted directly on the head; +Z is the face, -Z the back.
  for (const x of [24,40]) {
    paint.fillStyle = '#fff8e9'; paint.beginPath(); paint.ellipse(x,51,5,8,0,0,Math.PI*2); paint.fill();
    paint.fillStyle = '#3585b0'; paint.fillRect(x-1,47,3,10);
    paint.fillStyle = '#182c3d'; paint.fillRect(x,48,2,8);
    paint.fillStyle = '#47312a'; paint.fillRect(x-4,40,8,2);
  }
  paint.fillStyle = '#d68d62'; paint.beginPath(); paint.ellipse(32,65,4,4,0,0,Math.PI*2); paint.fill();
  // Narrow, small mustache in place of the earlier thick 3D lobes.
  paint.fillStyle = '#47312a';
  paint.fillRect(25,71,6,2); paint.fillRect(33,71,6,2);
  paint.fillRect(27,73,10,1);
  paint.fillStyle = '#ad7055'; paint.fillRect(29,79,6,1);
});
function mesh(geometry, mat, parent, position, scale) {
  const object = new THREE.Mesh(geometry, mat);
  object.position.set(...position);
  if (scale) object.scale.set(...scale);
  object.castShadow = true; object.receiveShadow = true;
  parent.add(object); return object;
}
function ball(parent, mat, position, scale) { return mesh(new THREE.SphereGeometry(1, 10, 8), mat, parent, position, scale); }
function joint(parent, name, position) { const group = new THREE.Group(); group.name = name; group.position.set(...position); parent.add(group); return group; }
const slab = mesh(new THREE.BoxGeometry(FLOOR_HALF_SIZE * 2, 0.25, FLOOR_HALF_SIZE * 2), material('#e6e0cf'), scene, [0, -0.125, 0]);
slab.name = 'Single floor slab';
// Simple era-style contact shadow, rather than modern real-time soft shadows.
const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.61, 16),
  new THREE.MeshBasicMaterial({ color: '#36333c', transparent: true, opacity: 0.22, depthWrite: false }));
shadow.rotation.x = -Math.PI / 2;
shadow.position.y = 0.004;
shadow.scale.y = 0.7;
scene.add(shadow);
const izzy = joint(scene, 'Izzy', [0,0,0]);
// Limb pivots drive the run cycle and airborne pose.
const pelvis = joint(izzy, 'pelvis', [0,0.9,0]);
ball(pelvis,blue, [0,0.1,0], [0.43,0.4,0.29]);
const torso = joint(pelvis, 'spine', [0,0.25,0]);
ball(torso, overalls, [0,0.15,0], [0.45,0.48,0.3]);
for (const side of [-1,1]) {
  const button = mesh(new THREE.CylinderGeometry(0.047,0.047,0.028,10), yellow, torso, [side*0.23,0.24,0.258]);
  button.name = `${side<0?'left':'right'}_overall_button`;
  button.rotation.x = Math.PI/2;
  const hip = joint(pelvis, `${side<0?'left':'right'}_hip`, [side*0.23,-0.15,0]);
  ball(hip,blue,[0,-0.13,0],[0.205,0.29,0.21]);
  const knee = joint(hip,`${side<0?'left':'right'}_knee`,[0,-0.29,0]);
  ball(knee,blue,[0,-0.12,0],[0.18,0.22,0.18]);
  const ankle = joint(knee,`${side<0?'left':'right'}_ankle`,[0,-0.25,0]);
  ball(ankle,shoes,[0,-0.08,0.11],[0.23,0.13,0.36]);
  const shoulder = joint(torso,`${side<0?'left':'right'}_shoulder`,[side*0.43,0.32,0]);
  shoulder.rotation.z = side*0.16;
  ball(shoulder,yellow,[side*0.045,-0.14,0],[0.17,0.25,0.18]);
  const elbow = joint(shoulder,`${side<0?'left':'right'}_elbow`,[side*0.07,-0.29,0]);
  ball(elbow,yellow,[0,-0.095,0.02],[0.14,0.18,0.15]);
  const wrist = joint(elbow,`${side<0?'left':'right'}_wrist`,[0,-0.23,0.03]);
  ball(wrist,gloves,[0,-0.055,0],[0.17,0.19,0.16]);
  ball(wrist,gloves,[-side*0.13,-0.10,0.09],[0.075,0.10,0.085]);
}
const head = joint(torso,'neck',[0,0.77,0]);
ball(head,face,[0,0.12,0.025],[0.41,0.4,0.33]);
// The cap follows the head. Its bill points behind Izzy, along -Z.
const cap = joint(head,'backward_hat',[0,0.32,0.025]);
mesh(new THREE.SphereGeometry(1,10,4,0,Math.PI*2,0,Math.PI/2),yellow,cap,[0,0,0],[0.42,0.20,0.345]);
ball(cap,yellow,[0,-0.005,-0.28],[0.34,0.03,0.24]);
function resize() {
  const width = canvas.clientWidth, height = canvas.clientHeight;
  const renderScale = Math.min(1, 480 / height);
  renderer.setSize(Math.round(width * renderScale),Math.round(height * renderScale),false);
  camera.aspect=width/height;
  camera.fov = width < 700 ? 55 : 36;
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
const inputCodes = new Set(['KeyE','KeyD','KeyA','KeyF','ArrowUp','ArrowLeft','ArrowDown','ArrowRight','Space']);
function press(code) {
  if (code === 'Space' && !keys.has(code)) player.jumpQueued = true;
  keys.add(code); player.jumpHeld = keys.has('Space');
}
function release(code) { keys.delete(code); player.jumpHeld = keys.has('Space'); }
window.addEventListener('keydown', event => {
  if (!inputCodes.has(event.code) || event.target.closest('input,textarea,select')) return;
  event.preventDefault();
  if (!event.repeat) press(event.code);
});
window.addEventListener('keyup', event => { if (inputCodes.has(event.code)) { event.preventDefault(); release(event.code); } });
function clearInput() { keys.clear(); player.jumpHeld = false; player.jumpQueued = false; }
window.addEventListener('blur',clearInput);
for (const button of document.querySelectorAll('[data-key]')) {
  button.addEventListener('pointerdown', event => { event.preventDefault(); button.setPointerCapture(event.pointerId); press(button.dataset.key); });
  for (const type of ['pointerup','pointercancel','lostpointercapture']) button.addEventListener(type, () => release(button.dataset.key));
}
// Fixed world directions: rotating the camera never changes movement heading.
function inputDirection() {
  return {
    x: Number(keys.has('KeyF')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft')),
    z: Number(keys.has('KeyD')||keys.has('ArrowDown'))-Number(keys.has('KeyE')||keys.has('ArrowUp')),
  };
}
const limbs = ['left','right'].map(side => Object.fromEntries(
  ['hip','knee','ankle','shoulder','elbow','wrist'].map(name => [name,izzy.getObjectByName(`${side}_${name}`)])));
function animatePlayer(dt) {
  const amount = Math.min(1, Math.hypot(player.vx,player.vz)/MAX_SPEED);
  const blend = 1-Math.exp(-18*dt);
  const pose = (joint, value) => joint.rotation.x = THREE.MathUtils.lerp(joint.rotation.x,value,blend);
  limbs.forEach((limb,index) => {
    const stride = Math.sin(player.gait+index*Math.PI);
    const running = player.grounded;
    pose(limb.hip,running ? stride*1.25*amount : (index===0 ? -0.65 : 0.3));
    pose(limb.knee,running ? (0.18+Math.max(0,-stride)*1.45)*amount : 0.85);
    pose(limb.ankle,running ? -stride*0.35*amount : 0.2);
    pose(limb.shoulder,running ? -stride*1.15*amount : -1.1);
    pose(limb.elbow,running ? -(0.9+stride*0.2)*amount : -0.6);
    pose(limb.wrist,0);
  });
  pelvis.position.y = 0.9 + (player.grounded ? Math.abs(Math.sin(player.gait))*0.14*amount-player.landing*0.09 : 0);
  torso.rotation.x = player.grounded ? amount*0.24 : -0.06;
  torso.rotation.y = player.grounded ? Math.sin(player.gait)*0.12*amount : 0;
}
let previousTime, accumulator = 0;
const fixedStep = 1/120;
document.addEventListener('visibilitychange', () => { clearInput(); previousTime=undefined; accumulator=0; });
renderer.setAnimationLoop(time => {
  const dt = previousTime === undefined ? 0 : Math.min((time-previousTime)/1000,0.1);
  previousTime = time; accumulator += dt;
  while (accumulator >= fixedStep) { stepPlayer(player,inputDirection(),fixedStep); accumulator-=fixedStep; }
  izzy.position.set(player.x,player.y,player.z); izzy.rotation.y=player.yaw;
  animatePlayer(dt);
  shadow.position.set(player.x,0.004,player.z);
  shadow.visible = Math.abs(player.x)<=FLOOR_HALF_SIZE && Math.abs(player.z)<=FLOOR_HALF_SIZE;
  shadow.material.opacity=0.22/(1+Math.max(0,player.y)*0.5);
  shadow.scale.setScalar(1+Math.max(0,player.y)*0.12); shadow.scale.y*=0.7;
  const target = new THREE.Vector3(player.x,Math.max(0,player.y)*0.55+1.1,player.z);
  const offset = target.sub(controls.target);
  controls.target.add(offset); camera.position.add(offset);
  controls.update(); renderer.render(scene,camera);
  canvas.dataset.state = player.grounded ? 'grounded' : 'airborne';
  canvas.dataset.position = `${player.x.toFixed(3)},${player.y.toFixed(3)},${player.z.toFixed(3)}`;
});
