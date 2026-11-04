import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {createAvatar} from './avatar.js';
import {createWorld} from './world.js';
import './style.css';
import {createLocomotion,tickLocomotion,TICK,CLIP_LENGTHS} from './locomotion.js';
import {createLocomotionAnimator} from './animation/locomotion.js';

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
const animate=createLocomotionAnimator(izzy);
const player=createLocomotion();
const shadow=new THREE.Mesh(new THREE.CircleGeometry(0.61,16),new THREE.MeshBasicMaterial({color:'#36333c',transparent:true,opacity:0.22,depthWrite:false}));
shadow.rotation.x=-Math.PI/2;shadow.position.y=0.004;shadow.scale.y=0.7;scene.add(shadow);
const camera=new THREE.PerspectiveCamera(45,1,0.1,1500);
const controls=new OrbitControls(camera,canvas);
controls.enableDamping=true;controls.enablePan=false;controls.minDistance=4;controls.maxDistance=900;
controls.minPolarAngle=0.1;controls.maxPolarAngle=Math.PI/2-0.05;
function reset(){controls.target.set(player.x,1.3,player.z);camera.position.copy(controls.target).add(new THREE.Vector3(4,2,7));controls.update();}
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

const keys=new Set();
const moveCodes=new Set(['KeyE','KeyD','KeyS','KeyF','ShiftLeft','ShiftRight','Space']);
window.addEventListener('keydown',event=>{
 if(!moveCodes.has(event.code)||event.target.closest('input,textarea,select'))return;
 event.preventDefault();keys.add(event.code);
});
window.addEventListener('keyup',event=>{if(moveCodes.has(event.code)){event.preventDefault();keys.delete(event.code);}});
window.addEventListener('blur',()=>keys.clear());
const forward=new THREE.Vector3(),right=new THREE.Vector3(),direction=new THREE.Vector3();
function movementInput(){
 forward.subVectors(controls.target,camera.position).setY(0).normalize();right.crossVectors(forward,camera.up).normalize();
 const vertical=Number(keys.has('KeyE'))-Number(keys.has('KeyD'));
 const horizontal=Number(keys.has('KeyF'))-Number(keys.has('KeyS'));
 direction.copy(forward).multiplyScalar(vertical).addScaledVector(right,horizontal);
 return {x:direction.x,z:direction.z,jump:keys.has('Space'),walk:keys.has('KeyE')&&!keys.has('KeyD')&&(keys.has('ShiftLeft')||keys.has('ShiftRight'))};
}
let previousTime,accumulator=0,previous={...player};
document.addEventListener('visibilitychange',()=>{keys.clear();previousTime=undefined;accumulator=0;previous={...player};});
renderer.setAnimationLoop(time=>{
 const dt=previousTime===undefined?0:Math.min((time-previousTime)/1000,0.1);previousTime=time;accumulator+=dt;
 while(accumulator>=TICK){previous={...player};tickLocomotion(player,movementInput());accumulator-=TICK;}
 const alpha=accumulator/TICK;
 izzy.position.set(THREE.MathUtils.lerp(previous.x,player.x,alpha),THREE.MathUtils.lerp(previous.y,player.y,alpha),THREE.MathUtils.lerp(previous.z,player.z,alpha));
 const yawDelta=Math.atan2(Math.sin(player.yaw-previous.yaw),Math.cos(player.yaw-previous.yaw));
 izzy.rotation.y=previous.yaw+yawDelta*alpha;
 const length=CLIP_LENGTHS[player.clip];
 const frame=previous.clip===player.clip ? (['jump','fall','land'].includes(player.clip)?THREE.MathUtils.lerp(previous.frame,player.frame,alpha):(previous.frame+((player.frame-previous.frame+length)%length)*alpha)%length) : player.frame;
 animate(player,dt,frame);
 shadow.position.set(izzy.position.x,0.004,izzy.position.z);
 shadow.material.opacity=0.22/(1+player.y*0.6);shadow.scale.set(1+player.y*0.12,(1+player.y*0.12)*0.7,1);
 const target=new THREE.Vector3(izzy.position.x,1.3+izzy.position.y*0.55,izzy.position.z),offset=target.sub(controls.target);
 controls.target.add(offset);camera.position.add(offset);controls.update();renderer.render(scene,camera);
 canvas.dataset.action=player.action;canvas.dataset.clip=player.clip;canvas.dataset.speed=String(player.speed);canvas.dataset.grounded=String(player.grounded);canvas.dataset.height=String(player.y);
 canvas.dataset.position=`${player.x.toFixed(4)},${player.z.toFixed(4)}`;
});
