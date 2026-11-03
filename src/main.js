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
const blue = material('#245dad'), yellow = material('#f4c342'), skin = material('#efb483');
const brown = material('#47312a'), hair = material('#36251e'), white = material('#fff8e9');
const black = material('#182c3d'), iris = material('#3585b0');
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
ball(pelvis, blue, [0,0.1,0], [0.43,0.4,0.29]);
const torso = joint(pelvis, 'spine', [0,0.25,0]);
// A tiny painted texture supplies the overalls, straps and buttons on one body mesh.
const outfitCanvas = document.createElement('canvas');
outfitCanvas.width = outfitCanvas.height = 64;
const paint = outfitCanvas.getContext('2d');
paint.fillStyle = '#f4c342'; paint.fillRect(0,0,64,64);
paint.fillStyle = '#245dad'; paint.fillRect(0,38,64,26);
for (const center of [16,48]) {
  paint.fillRect(center-8,25,16,20);
  paint.fillRect(center-8,10,3,25);
  paint.fillRect(center+5,10,3,25);
  paint.fillStyle = '#ffe15b';
  paint.fillRect(center-8,26,3,3); paint.fillRect(center+5,26,3,3);
  paint.fillStyle = '#245dad';
}
const outfitTexture = new THREE.CanvasTexture(outfitCanvas);
outfitTexture.colorSpace = THREE.SRGBColorSpace;
outfitTexture.magFilter = THREE.NearestFilter;
outfitTexture.minFilter = THREE.NearestFilter;
const outfit = new THREE.MeshLambertMaterial({ map: outfitTexture });
ball(torso, outfit, [0,0.15,0], [0.45,0.48,0.3]);
for (const side of [-1,1]) {
  const hip = joint(pelvis, `${side<0?'left':'right'}_hip`, [side*0.23,-0.15,0]);
  ball(hip,blue,[0,-0.13,0],[0.205,0.29,0.21]);
  const knee = joint(hip,'knee',[0,-0.29,0]);
  ball(knee,blue,[0,-0.12,0],[0.18,0.22,0.18]);
  const ankle = joint(knee,'ankle',[0,-0.25,0]);
  ball(ankle,brown,[0,-0.08,0.11],[0.23,0.13,0.36]);
  const shoulder = joint(torso,`${side<0?'left':'right'}_shoulder`,[side*0.43,0.32,0]);
  shoulder.rotation.z = side*0.16;
  ball(shoulder,yellow,[side*0.045,-0.14,0],[0.17,0.25,0.18]);
  const elbow = joint(shoulder,'elbow',[side*0.07,-0.29,0]);
  ball(elbow,yellow,[0,-0.095,0.02],[0.14,0.18,0.15]);
  const wrist = joint(elbow,'wrist',[0,-0.23,0.03]);
  ball(wrist,white,[0,-0.055,0],[0.17,0.19,0.16]);
  ball(wrist,white,[-side*0.12,0,0.07],[0.08,0.12,0.09]);
}
const head = joint(torso,'neck',[0,0.77,0]);
ball(head,hair,[0,0.14,-0.045],[0.43,0.43,0.34]);
ball(head,skin,[0,0.12,0.055],[0.41,0.4,0.33]);
for(const side of [-1,1]) {
  ball(head,skin,[side*0.405,0.12,0],[0.1,0.15,0.1]);
  ball(head,hair,[side*0.33,0.2,0.12],[0.065,0.19,0.08]);
  ball(head,white,[side*0.15,0.21,0.325],[0.105,0.145,0.036]);
  ball(head,iris,[side*0.13,0.2,0.355],[0.047,0.077,0.017]);
  ball(head,black,[side*0.125,0.2,0.369],[0.024,0.053,0.008]);
  ball(head,white,[side*0.125-0.012,0.225,0.378],[0.012,0.018,0.006]);
  const brow=ball(head,hair,[side*0.15,0.355,0.31],[0.12,0.035,0.025]); brow.rotation.z=side*-0.12;
  for(let n=0;n<3;n++) ball(head,hair,[side*(0.065+n*0.061),-0.025,0.34],[0.085,0.067,0.044]);
}
ball(head,skin,[0,0.095,0.4],[0.14,0.125,0.16]);
ball(head,skin,[0,-0.15,0.24],[0.18,0.08,0.08]);
ball(head,yellow,[0,0.44,-0.015],[0.445,0.23,0.36]);
ball(head,yellow,[0,0.345,0.29],[0.44,0.055,0.29]);
ball(head,white,[0,0.47,0.315],[0.115,0.105,0.022]);
// A small raised I gives Izzy his own cap mark.
mesh(new THREE.BoxGeometry(0.028,0.11,0.012),blue,head,[0,0.47,0.34]);
mesh(new THREE.BoxGeometry(0.075,0.022,0.012),blue,head,[0,0.52,0.34]);
mesh(new THREE.BoxGeometry(0.075,0.022,0.012),blue,head,[0,0.42,0.34]);
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
