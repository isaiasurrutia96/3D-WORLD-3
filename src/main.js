import {createTimeTrial,armTimeTrial,stepTimeTrial,invalidateTimeTrial,RACE_START,exportGhosts,importGhosts,MAX_GHOST_FILE_BYTES} from './time-trial.js';
import {createTimeTrialView} from './time-trial-view.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {createOnFootAvatar as createAvatar,CHARACTER_HEIGHT,CHARACTER_RADIUS} from './on-foot/avatar.js';
import {createWorld,worldPhysics,SPAWN} from './world.js';
import './style.css';
import {createOnFootState as createRunner,stepOnFoot as stepRunner,STEP} from './on-foot/controller.js';
import {createOnFootAnimator as createRunningAnimator} from './on-foot/animation.js';
import {createVehicleState,stepVehicle,canEnterVehicle,findExitPosition,resolveParkedKart} from './vehicle-controller.js';
import {createItemSystem,useHeldItem,stepItems} from './items.js';
import {createItemView} from './item-view.js';
import {createVehicleView,createSeatedPose,speedToMph} from './vehicle-view.js';
import {MOVEMENT_KEYS,DRIVING_KEYS,readMoveAxes,readDrivingInput,wantsSprint} from './input.js';
import {createMobileControls,bindPress} from './mobile-controls.js';
import {createMinimap} from './minimap.js';
import {createDrivingCameraState,updateDrivingCamera,ISO_HALF_HEIGHT,CHASE_FOLLOW_RATE} from './driving-camera.js';

const canvas=document.querySelector('canvas');
const app=document.getElementById('app'),gameScreen=document.getElementById('game-screen'),homeScreen=document.getElementById('home-screen'),playButton=document.getElementById('play-button');
let playing=false,touchMode=false,mobileExitPending=false,gameFocused=true;
const speedometer=document.getElementById('kart-speed');
const renderer=new THREE.WebGLRenderer({canvas,antialias:false,logarithmicDepthBuffer:true});
renderer.setPixelRatio(1);
renderer.outputColorSpace=THREE.SRGBColorSpace;
const scene=new THREE.Scene();
scene.background=new THREE.Color('#080e25');
scene.fog=new THREE.Fog('#080e25',700,2500);
scene.add(new THREE.HemisphereLight('#ffffff','#8e96ac',1.8));
const sun=new THREE.DirectionalLight('#ffffff',1.7);sun.position.set(-3,8,5);scene.add(sun);
scene.add(createWorld());
const avatar=createAvatar();scene.add(avatar);
const runner=Object.assign(createRunner(),SPAWN);
const animation=createRunningAnimator(avatar);
const kart=scene.getObjectByName('Go-kart prototype');
kart.userData.drivable=true;
const kartState=createVehicleState(),applyKart=createVehicleView(kart),seatAvatar=createSeatedPose(avatar);
const itemSystem=createItemSystem(),applyItems=createItemView(scene,itemSystem,kart);
let driving=false;
let trialStorage=null;try{trialStorage=window.localStorage;}catch{}
const trial=createTimeTrial(trialStorage),applyTrial=createTimeTrialView(scene,trial);
const updateMinimap=createMinimap(document.getElementById('minimap'));
const pedestrianWorld={supportHeight:worldPhysics.supportHeight,resolveHorizontal:(x,z,nx,nz,y,radius=CHARACTER_RADIUS,height=CHARACTER_HEIGHT)=>{
 const road=worldPhysics.resolveHorizontal(x,z,nx,nz,y,radius,height);
 const parked=resolveParkedKart(road.x,road.z,y,kartState,radius,height);
 return worldPhysics.resolveHorizontal(x,z,parked.x,parked.z,y,radius,height);
}};
const walkingChart=document.querySelector('.movement-keys').innerHTML;
const walkingLabel=canvas.getAttribute('aria-label');
function setDrivingChart(){
 document.querySelector('.movement-keys').innerHTML=driving
  ? '<span><kbd>E</kbd>Accelerate</span><span><kbd>D / ↓</kbd>Brake / reverse</span><span><kbd>S / ←</kbd>Steer left</span><span><kbd>F / →</kbd>Steer right</span><span><kbd>SHIFT</kbd>Use item</span><span id="held-item" aria-live="polite">Item: —</span><span><kbd>H</kbd><span id="kart-action">Exit kart</span></span>'
  : walkingChart;
 canvas.setAttribute('aria-label',driving?'E accelerates; D or Down Arrow brakes and reverses. S/F or Left/Right Arrows steer. Shift uses the held item; H exits when stopped.':walkingLabel);
}
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);
Object.assign(sun.shadow.camera,{left:-3,right:3,top:4,bottom:-3,near:0.1,far:20});
sun.shadow.normalBias=0.015;
let camera=new THREE.PerspectiveCamera(45,1,0.1,3000);
const thirdPersonCamera=camera;
const isoCamera=new THREE.OrthographicCamera(-28,28,ISO_HALF_HEIGHT,-ISO_HALF_HEIGHT,.1,3000);
const drivingCamera=createDrivingCameraState();
let isometric=false;
const controls=new OrbitControls(camera,canvas);
controls.enableDamping=true;controls.enablePan=false;controls.minDistance=4;controls.maxDistance=1500;
controls.minPolarAngle=0.1;controls.maxPolarAngle=Math.PI/2-0.05;
function reset(){
 const focus=driving?kartState:runner;drivingCamera.lookTurn=0;
 if(driving&&!isometric){const pose=updateDrivingCamera(drivingCamera,kartState,0);controls.target.set(pose.target.x,pose.target.y,pose.target.z);camera.position.set(pose.position.x,pose.position.y,pose.position.z);}
 else{controls.target.set(focus.x,focus.y+1.2,focus.z);camera.position.copy(controls.target).add(isometric?new THREE.Vector3(28,28,28):new THREE.Vector3(-12,5,0));}
 controls.update();
}
reset();
canvas.addEventListener('keydown',event=>{if(event.code==='KeyR')reset();});
function toggleCamera(){if(!playing)return;isometric=!isometric;camera=isometric?isoCamera:thirdPersonCamera;controls.object=camera;controls.enableRotate=!isometric;controls.minZoom=.35;controls.maxZoom=4;reset();resize();const button=document.querySelector('#view-toggle');button.setAttribute('aria-pressed',String(isometric));button.setAttribute('aria-label',isometric?'Switch to third-person view':'Switch to isometric view');canvas.dataset.view=isometric?'isometric':'third-person';canvas.focus({preventScroll:true});}
bindPress(document.querySelector('#view-toggle'),toggleCamera);
window.addEventListener('keydown',event=>{if(playing&&event.code==='KeyV'&&!event.repeat&&!event.target.closest('input,textarea,select')){event.preventDefault();toggleCamera();}});
function resize(){
 const width=canvas.clientWidth,height=canvas.clientHeight,scale=Math.min(1,480/height);
 if(!width||!height)return;
 renderer.setSize(Math.round(width*scale),Math.round(height*scale),false);
 thirdPersonCamera.aspect=width/height;thirdPersonCamera.fov=width<700?55:45;thirdPersonCamera.updateProjectionMatrix();
 isoCamera.left=-ISO_HALF_HEIGHT*width/height;isoCamera.right=ISO_HALF_HEIGHT*width/height;isoCamera.updateProjectionMatrix();
 renderer.render(scene,camera);
}
window.addEventListener('resize',resize);resize();
const orbit = new THREE.Spherical();
const mouseOffset = new THREE.Vector3();
const controlHint = document.querySelector('#camera-hint');
window.addEventListener('keydown', async event => {
  if (!playing || event.code !== 'KeyL' || event.repeat || event.target.closest('input,textarea,select')) return;
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
  controls.enabled = playing && !locked;
  canvas.dataset.mouseLocked = String(locked);
  controlHint.textContent = locked
    ? 'Mouse locked · L / Esc to release'
    : 'Drag to rotate · Scroll or pinch to zoom';
});
document.addEventListener('pointerlockerror', () => {
  controlHint.textContent = 'Mouse lock blocked · Click the game and press L again';
});
document.addEventListener('mousemove', event => {
  if (!playing || document.pointerLockElement !== canvas || isometric) return;
  mouseOffset.subVectors(camera.position,controls.target);
  orbit.setFromVector3(mouseOffset);
  orbit.theta -= event.movementX*0.0025;
  orbit.phi = THREE.MathUtils.clamp(orbit.phi-event.movementY*0.0025,
    controls.minPolarAngle,controls.maxPolarAngle);
  camera.position.copy(controls.target).add(mouseOffset.setFromSpherical(orbit));
  camera.lookAt(controls.target);
  manualCameraUntil=performance.now()+1800;
  render();
});

const keys=new Set();
let jumpQueued=false,interactionQueued=false,itemQueued=false;
const mobile=createMobileControls({
 onTouch:()=>setTouchMode(true),
 onDriveIntent:()=>{if(playing&&driving)mobileExitPending=false;},
 onItem:()=>{if(playing&&driving&&kartState.heldItem)itemQueued=true;canvas.focus({preventScroll:true});},
 onInteract:()=>{
  if(!playing)return;
  if(driving)mobileExitPending=true;else interactionQueued=true;
  canvas.focus({preventScroll:true});
 },
});
function clearInputs(){keys.clear();mobile.clear();jumpQueued=false;interactionQueued=false;itemQueued=false;}
function setTouchMode(enabled){
 if(touchMode===enabled)return;
 touchMode=enabled;app.classList.toggle('touch-mode',enabled);document.getElementById('trial-details').open=!enabled;
}
window.addEventListener('pointerdown',event=>{if(event.pointerType==='touch')setTouchMode(true);if(playing&&!gameFocused){gameFocused=true;previousTime=undefined;}},{capture:true,passive:true});
window.addEventListener('orientationchange',()=>mobile.clear());
let orbiting=false,manualCameraUntil=0;
controls.addEventListener('start',()=>{orbiting=true;});
controls.addEventListener('end',()=>{orbiting=false;manualCameraUntil=performance.now()+1800;});
const directionKeys=MOVEMENT_KEYS;
window.addEventListener('keydown',event=>{
  if(!playing||event.target.closest('input,textarea,select,button,summary,a'))return;
  if(driving&&event.code==='Space'){event.preventDefault();return;}
  if(directionKeys.has(event.code)||(driving&&DRIVING_KEYS.has(event.code))){event.preventDefault();keys.add(event.code);}
  if(event.code==='Space'){event.preventDefault();if(!event.repeat)jumpQueued=true;}
  if(event.code==='KeyH'){event.preventDefault();if(!event.repeat)interactionQueued=true;}
  if(driving&&(event.code==='ShiftLeft'||event.code==='ShiftRight')&&!event.repeat)itemQueued=true;
});
window.addEventListener('keyup',event=>keys.delete(event.code));
window.addEventListener('blur',()=>{gameFocused=false;clearInputs();previousTime=undefined;accumulator=0;});
window.addEventListener('focus',()=>{gameFocused=true;previousTime=undefined;});
// Keep browser zoom gestures out of gameplay. Pointer Events still reach
// OrbitControls for intentional camera gestures on the canvas.
for(const type of ['gesturestart','gesturechange','gestureend','dblclick'])document.addEventListener(type,event=>{if(playing)event.preventDefault();},{passive:false});
document.addEventListener('touchmove',event=>{if(playing&&event.touches.length>1)event.preventDefault();},{passive:false});
const forward=new THREE.Vector3(),right=new THREE.Vector3(),direction=new THREE.Vector3();
function input(){
  forward.subVectors(controls.target,camera.position).setY(0).normalize();
  right.crossVectors(forward,camera.up).normalize();
  const virtual=mobile.consume(),axes=readMoveAxes(keys);
  const vertical=Math.max(-1,Math.min(1,axes.forward+virtual.forward)),horizontal=Math.max(-1,Math.min(1,axes.right+virtual.right));
  direction.copy(forward).multiplyScalar(vertical).addScaledVector(right,horizontal);
  const touchFlip=virtual.secondaryPressed&&runner.grounded&&runner.speed<.65;
  const jump=jumpQueued||keys.has('Space')||virtual.primary||virtual.primaryPressed||touchFlip;jumpQueued=false;
  const sprint=axes.forward||axes.right?wantsSprint(keys):Math.hypot(virtual.forward,virtual.right)>.55;
  return {x:direction.x,z:direction.z,sprint,jump,backflip:keys.has('KeyQ')||touchFlip};
}
function render(){renderer.render(scene,camera);}
controls.enableDamping=false;
let previousTime,accumulator=0,previous={...runner},previousKart={...kartState};
function toggleVehicle(){
 const hint=document.querySelector('#kart-action');
 if(!driving){
  if(!canEnterVehicle(runner,kartState)){hint.textContent=runner.grounded?'Move closer to kart':'Land before entering';return false;}
  animation.reset();driving=true;kart.add(avatar);seatAvatar();previousKart={...kartState};
 }else{
  const exit=findExitPosition(kartState,worldPhysics);
  if(!exit){hint.textContent=Math.abs(kartState.speed)>.75?'Stop to exit':'No safe exit here';return false;}
  invalidateTimeTrial(trial,'Left the kart — restart lap');
  driving=false;kartState.speed=0;kartState.boostTime=0;previousKart={...kartState};scene.add(avatar);animation.reset();
  Object.assign(runner,createRunner(),exit);runner.jumpHeld=keys.has('Space');previous={...runner};
 }
 mobile.clear();mobileExitPending=false;
 jumpQueued=false;itemQueued=false;manualCameraUntil=0;setDrivingChart();reset();return true;
}
function startTrial(){
 if(!playing)return;
 clearInputs();mobileExitPending=false;
 Object.assign(kartState,createVehicleState(),RACE_START,{heldItem:'nitro'});previousKart={...kartState};
 animation.reset();kart.add(avatar);seatAvatar();driving=true;
 for(const box of itemSystem.boxes)box.cooldown=0;
 itemSystem.time=0;
 armTimeTrial(trial);accumulator=0;previousTime=undefined;manualCameraUntil=0;setDrivingChart();reset();canvas.focus({preventScroll:true});
}
bindPress(document.getElementById('trial-start'),startTrial);
document.getElementById('trial-ghost').addEventListener('change',event=>{trial.showGhost=event.target.checked;canvas.focus({preventScroll:true});});
const ghostFile=document.getElementById('ghost-file'),ghostMessage=document.getElementById('ghost-transfer-status'),importButton=document.getElementById('ghost-import');
function ghostTransferMessage(text){ghostMessage.hidden=false;ghostMessage.textContent=text;}
bindPress(document.getElementById('ghost-export'),()=>{
 if(!trial.records.length)return;
 clearInputs();
 const url=URL.createObjectURL(new Blob([exportGhosts(trial)],{type:'application/json'}));
 const link=document.createElement('a');link.href=url;link.download=`letsgo-ghosts-${new Date().toISOString().slice(0,10)}.json`;
 document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
 ghostTransferMessage('Ghost file saved. Import it in your other browser.');
 canvas.focus({preventScroll:true});
});
bindPress(importButton,()=>{clearInputs();ghostFile.value='';ghostFile.click();});
ghostFile.addEventListener('change',async()=>{
 const file=ghostFile.files?.[0];if(!file)return;
 importButton.disabled=true;
 try{
  if(file.size>MAX_GHOST_FILE_BYTES)throw Error('This ghost file is too large.');
  const result=importGhosts(trial,await file.text());
  ghostTransferMessage(result.added?(result.persisted?`Imported ${result.added} ghost${result.added===1?'':'s'}. Your top four are ready.`:'Ghosts loaded for this session. Use Export to keep a copy.'):'Your saved top four are unchanged.');
 }catch(error){ghostTransferMessage(error.message);}
 finally{importButton.disabled=false;ghostFile.value='';if(playing)canvas.focus({preventScroll:true});}
});
ghostFile.addEventListener('cancel',()=>{if(playing)canvas.focus({preventScroll:true});});
window.addEventListener('keydown',event=>{if(playing&&event.code==='KeyT'&&!event.repeat&&!event.target.closest('input,textarea,select')){event.preventDefault();startTrial();}});
document.addEventListener('visibilitychange',()=>{clearInputs();if(!document.hidden)gameFocused=true;previousTime=undefined;accumulator=0;previous={...runner};previousKart={...kartState};});
function frame(time){
  if(!playing||!gameFocused||document.hidden){previousTime=undefined;return;}
  const dt=previousTime===undefined?0:Math.min(0.1,(time-previousTime)/1000);
  previousTime=time;accumulator+=dt;
  while(accumulator>=STEP){
   if(interactionQueued){interactionQueued=false;toggleVehicle();}
   if(driving){
    previousKart={...kartState};jumpQueued=false;
    if(itemQueued){useHeldItem(itemSystem,kartState);itemQueued=false;}
    const drivingInput=readDrivingInput(keys,mobile.consume());
    if(mobileExitPending){drivingInput.throttle=0;drivingInput.steer=0;drivingInput.brake=true;}
    const startForward=drivingInput.throttle>0&&!drivingInput.brake;
    if(trial.status!=='ready'||startForward)stepVehicle(kartState,drivingInput,STEP,worldPhysics);
    stepTimeTrial(trial,previousKart,kartState,startForward,STEP);
    if(mobileExitPending&&Math.abs(kartState.speed)<.75){mobileExitPending=false;toggleVehicle();}
   }else{previous={...runner};stepRunner(runner,input(),STEP,pedestrianWorld);}
   stepItems(itemSystem,driving?kartState:null,previousKart,STEP);
   accumulator-=STEP;
  }
  if(driving&&kartState.y< -35){Object.assign(kartState,createVehicleState());itemQueued=false;previousKart={...kartState};reset();}
  if(!driving&&runner.y< -35){Object.assign(runner,createRunner(),SPAWN);runner.jumpHeld=keys.has('Space');jumpQueued=false;previous={...runner};reset();}
  const alpha=accumulator/STEP;
  const kartTurn=Math.atan2(Math.sin(kartState.yaw-previousKart.yaw),Math.cos(kartState.yaw-previousKart.yaw));
  const kartPose={...kartState,x:THREE.MathUtils.lerp(previousKart.x,kartState.x,alpha),y:THREE.MathUtils.lerp(previousKart.y,kartState.y,alpha),z:THREE.MathUtils.lerp(previousKart.z,kartState.z,alpha),yaw:previousKart.yaw+kartTurn*alpha};
  applyKart(kartPose);applyItems(kartPose,driving);const ghostPoses=applyTrial(alpha,STEP);
  if(!driving){
   avatar.position.set(THREE.MathUtils.lerp(previous.x,runner.x,alpha),THREE.MathUtils.lerp(previous.y,runner.y,alpha),THREE.MathUtils.lerp(previous.z,runner.z,alpha));
   const turn=Math.atan2(Math.sin(runner.yaw-previous.yaw),Math.cos(runner.yaw-previous.yaw));
   avatar.rotation.set(0,previous.yaw+turn*alpha,0);
   const distance=THREE.MathUtils.lerp(previous.distance,runner.distance,alpha);
   const phase=THREE.MathUtils.lerp(previous.phase,runner.phase,alpha);
   animation.update({...runner,distance,phase},dt);
  }
  const focus=driving?kartPose:avatar.position;
  updateMinimap(focus,driving?kartPose.yaw:avatar.rotation.y,ghostPoses);
  const automaticChase=driving&&!isometric&&!orbiting&&time>manualCameraUntil;
  const framing=driving?updateDrivingCamera(drivingCamera,kartPose,dt):null;
  const look=automaticChase?framing.target:{x:focus.x,y:focus.y+1.2,z:focus.z};
  const target=new THREE.Vector3(look.x,THREE.MathUtils.damp(controls.target.y,look.y,10,dt),look.z);
  const offset=target.sub(controls.target);controls.target.add(offset);camera.position.add(offset);
  if(automaticChase){
   const desired=new THREE.Vector3(framing.position.x,framing.position.y,framing.position.z);
   camera.position.lerp(desired,1-Math.exp(-CHASE_FOLLOW_RATE*dt));
  }
  sun.position.set(focus.x-3,focus.y+8,focus.z+5);sun.target.position.set(focus.x,focus.y,focus.z);sun.target.updateMatrixWorld();
  const itemLabel=document.querySelector('#held-item');
  if(itemLabel){const text=kartState.heldItem==='nitro'?'Item: Nitro':kartState.boostTime>0?'Nitro active':'Item: —';if(itemLabel.textContent!==text)itemLabel.textContent=text;}
  controls.update();render();
  canvas.dataset.trial=trial.status;canvas.dataset.lap=String(trial.completed+1);canvas.dataset.checkpoints=String(trial.passed);canvas.dataset.elapsed=String(trial.elapsed);
  canvas.dataset.item=kartState.heldItem??'';canvas.dataset.boost=String(kartState.boostTime);
  const state=driving?kartState:runner;canvas.dataset.mode=driving?'driving':runner.mode;
  const mph=String(driving?speedToMph(Math.hypot(kartState.speed,kartState.lateralSpeed)):0);if(speedometer.value!==mph)speedometer.value=mph;
  canvas.dataset.height=String(state.y);canvas.dataset.grounded=String(state.grounded);
  canvas.dataset.speed=String(state.speed);canvas.dataset.position=`${state.x},${state.z}`;
  mobile.update({driving,heldItem:kartState.heldItem,boosting:kartState.boostTime>0,interactionText:driving?(mobileExitPending?'Stop…':'Exit'):'Kart',canInteract:driving||canEnterVehicle(runner,kartState),canFlip:runner.grounded&&runner.speed<.65});
}

function goHome(){
 playing=false;renderer.setAnimationLoop(null);clearInputs();mobileExitPending=false;
 invalidateTimeTrial(trial,'Returned home — restart lap');previousTime=undefined;accumulator=0;
 if(document.pointerLockElement===canvas)document.exitPointerLock();
 controls.enabled=false;gameScreen.hidden=true;gameScreen.inert=true;homeScreen.hidden=false;app.dataset.screen='home';document.title='LetsGo';playButton.focus({preventScroll:true});
}
function playGame(){
 homeScreen.hidden=true;gameScreen.hidden=false;gameScreen.inert=false;playing=true;gameFocused=true;controls.enabled=true;app.dataset.screen='game';document.title='LetsGo · Race';
 startTrial();resize();renderer.setAnimationLoop(frame);
}
bindPress(document.getElementById('home-button'),goHome);
bindPress(document.getElementById('home-logo-link'),goHome);
bindPress(playButton,playGame);
const trialDetails=document.getElementById('trial-details');bindPress(trialDetails.querySelector('summary'),()=>{trialDetails.open=!trialDetails.open;});
setTouchMode(window.matchMedia('(pointer:coarse)').matches);
app.dataset.screen='home';controls.enabled=false;playButton.disabled=false;
