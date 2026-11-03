import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
renderer.setPixelRatio(1);
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;
renderer.toneMappingExposure = 1.25;
const scene = new THREE.Scene();
scene.background = new THREE.Color('#dbe6ed');
scene.fog = new THREE.Fog('#dbe6ed', 22, 50);
const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 6;
controls.maxDistance = 16;
controls.minPolarAngle = 0.3;
controls.maxPolarAngle = Math.PI / 2 - 0.05;
controls.target.set(0, 1.1, 0);
function reset() { camera.position.set(6.5, 4.8, 9); controls.target.set(0, 1.1, 0); controls.update(); }
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
const slab = mesh(new THREE.BoxGeometry(4.4, 0.25, 3.7), material('#e6e0cf'), scene, [0, -0.125, 0]);
slab.name = 'Single floor slab';
// Simple era-style contact shadow, rather than modern real-time soft shadows.
const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.61, 16),
  new THREE.MeshBasicMaterial({ color: '#36333c', transparent: true, opacity: 0.22, depthWrite: false }));
shadow.rotation.x = -Math.PI / 2;
shadow.position.y = 0.004;
shadow.scale.y = 0.7;
scene.add(shadow);
const izzy = joint(scene, 'Izzy', [0,0,0]);
// Every limb has a pivot hierarchy for later animation. The pose remains static.
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
const cap = joint(head,'backward_hat',[0,0.39,0.025]);
mesh(new THREE.SphereGeometry(1,10,4,0,Math.PI*2,0,Math.PI/2),yellow,cap,[0,0,0],[0.44,0.22,0.36]);
ball(cap,yellow,[0,-0.005,-0.30],[0.37,0.035,0.27]);
function resize() {
  const width = canvas.clientWidth, height = canvas.clientHeight;
  const renderScale = Math.min(1, 480 / height);
  renderer.setSize(Math.round(width * renderScale),Math.round(height * renderScale),false);
  camera.aspect=width/height;
  camera.fov = width < 700 ? 55 : 36;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize',resize); resize();
renderer.setAnimationLoop(() => { controls.update(); renderer.render(scene,camera); });
