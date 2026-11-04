import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {createAvatar} from './avatar.js';
import {createWorld} from './world.js';
import './style.css';

const canvas=document.querySelector('canvas');
const renderer=new THREE.WebGLRenderer({canvas,antialias:false,logarithmicDepthBuffer:true});
renderer.setPixelRatio(1);
renderer.outputColorSpace=THREE.SRGBColorSpace;
const scene=new THREE.Scene();
scene.background=new THREE.Color('#080e25');
scene.fog=new THREE.Fog('#080e25',350,1200);
scene.add(new THREE.HemisphereLight('#ffffff','#8e96ac',1.8));
const sun=new THREE.DirectionalLight('#ffffff',1.7);sun.position.set(-3,8,5);scene.add(sun);
scene.add(createWorld());
const izzy=createAvatar();scene.add(izzy);
const shadow=new THREE.Mesh(new THREE.CircleGeometry(0.61,16),new THREE.MeshBasicMaterial({color:'#36333c',transparent:true,opacity:0.22,depthWrite:false}));
shadow.rotation.x=-Math.PI/2;shadow.position.y=0.004;shadow.scale.y=0.7;scene.add(shadow);
const camera=new THREE.PerspectiveCamera(45,1,0.1,1500);
const controls=new OrbitControls(camera,canvas);
controls.enableDamping=true;controls.enablePan=false;controls.minDistance=4;controls.maxDistance=900;
controls.minPolarAngle=0.1;controls.maxPolarAngle=Math.PI/2-0.05;
function reset(){controls.target.set(0,1.3,0);camera.position.set(4,3.3,7);controls.update();}
reset();
canvas.addEventListener('keydown',event=>{if(event.code==='KeyR')reset();});
function resize(){
 const width=canvas.clientWidth,height=canvas.clientHeight,scale=Math.min(1,480/height);
 renderer.setSize(Math.round(width*scale),Math.round(height*scale),false);
 camera.aspect=width/height;camera.fov=width<700?55:45;camera.updateProjectionMatrix();
}
window.addEventListener('resize',resize);resize();
const orbit = new THREE.Spherical();
const mouseOffset = new THREE.Vector3();
const controlHint = document.querySelector('#camera-hint');
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
    ? 'Mouse locked · L / Esc to release'
    : 'Drag to rotate · Scroll or pinch to zoom';
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

// Render only: no controller, simulation, or animation loop remains.
renderer.setAnimationLoop(()=>{controls.update();renderer.render(scene,camera);});
