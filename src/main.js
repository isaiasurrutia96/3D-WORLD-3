import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {createAvatar} from './avatar.js';
import {createWorld} from './world.js';
import './style.css';
import {createRunner,stepRunner,STEP} from './running-controller.js';
import {createRunningAnimator} from './animation/running.js';

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
const avatar=createAvatar();scene.add(avatar);
const runner=createRunner();
const animation=createRunningAnimator(avatar);
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);
Object.assign(sun.shadow.camera,{left:-3,right:3,top:4,bottom:-3,near:0.1,far:20});
sun.shadow.normalBias=0.015;
const camera=new THREE.PerspectiveCamera(45,1,0.1,1500);
const controls=new OrbitControls(camera,canvas);
controls.enableDamping=true;controls.enablePan=false;controls.minDistance=4;controls.maxDistance=900;
controls.minPolarAngle=0.1;controls.maxPolarAngle=Math.PI/2-0.05;
function reset(){controls.target.set(runner.x,1.2,runner.z);camera.position.copy(controls.target).add(new THREE.Vector3(3.5,1.4,5.5));controls.update();}
reset();
canvas.addEventListener('keydown',event=>{if(event.code==='KeyR')reset();});
function resize(){
 const width=canvas.clientWidth,height=canvas.clientHeight,scale=Math.min(1,480/height);
 renderer.setSize(Math.round(width*scale),Math.round(height*scale),false);
 camera.aspect=width/height;camera.fov=width<700?55:45;camera.updateProjectionMatrix();
 renderer.render(scene,camera);
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
  render();
});

const keys=new Set();
const directionKeys=new Set(['KeyE','KeyD','KeyS','KeyF']);
window.addEventListener('keydown',event=>{
  if(event.target.closest('input,textarea,select'))return;
  if(directionKeys.has(event.code)){event.preventDefault();keys.add(event.code);}
  if(event.code==='Space')event.preventDefault(); // Jump is deliberately inactive.
});
window.addEventListener('keyup',event=>keys.delete(event.code));
window.addEventListener('blur',()=>keys.clear());
const forward=new THREE.Vector3(),right=new THREE.Vector3(),direction=new THREE.Vector3();
function input(){
  forward.subVectors(controls.target,camera.position).setY(0).normalize();
  right.crossVectors(forward,camera.up).normalize();
  const vertical=Number(keys.has('KeyE'))-Number(keys.has('KeyD'));
  const horizontal=Number(keys.has('KeyF'))-Number(keys.has('KeyS'));
  direction.copy(forward).multiplyScalar(vertical).addScaledVector(right,horizontal);
  return {x:direction.x,z:direction.z};
}
function render(){renderer.render(scene,camera);}
controls.enableDamping=false;
let previousTime,accumulator=0,previous={...runner};
document.addEventListener('visibilitychange',()=>{keys.clear();previousTime=undefined;accumulator=0;previous={...runner};});
renderer.setAnimationLoop(time=>{
  const dt=previousTime===undefined?0:Math.min(0.1,(time-previousTime)/1000);
  previousTime=time;accumulator+=dt;
  while(accumulator>=STEP){previous={...runner};stepRunner(runner,input());accumulator-=STEP;}
  const alpha=accumulator/STEP;
  avatar.position.set(THREE.MathUtils.lerp(previous.x,runner.x,alpha),0,THREE.MathUtils.lerp(previous.z,runner.z,alpha));
  const turn=Math.atan2(Math.sin(runner.yaw-previous.yaw),Math.cos(runner.yaw-previous.yaw));
  avatar.rotation.y=previous.yaw+turn*alpha;
  const distance=THREE.MathUtils.lerp(previous.distance,runner.distance,alpha);
  animation.update({...runner,distance},dt);
  const target=new THREE.Vector3(avatar.position.x,1.2,avatar.position.z);
  const offset=target.sub(controls.target);controls.target.add(offset);camera.position.add(offset);
  sun.position.copy(avatar.position).add(new THREE.Vector3(-3,8,5));sun.target.position.copy(avatar.position);sun.target.updateMatrixWorld();
  controls.update();render();
  canvas.dataset.speed=String(runner.speed);canvas.dataset.position=`${runner.x},${runner.z}`;
});
