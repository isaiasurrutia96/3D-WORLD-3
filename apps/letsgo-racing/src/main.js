import {createTimeTrial,armTimeTrial,stepTimeTrial,invalidateTimeTrial,exportGhosts,importGhosts,MAX_GHOST_FILE_BYTES} from './time-trial.js';
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
import {createDriverView} from './driver-view.js';
import {createLayoutEditor} from './layout-editor.js';
import {COURSES,ORIGINAL_COURSE,WORLD_START} from './courses.js';
import {createLapEntranceMarkers,nearestLapEntrance} from './lap-entrances.js';
import {createNpcPractice} from './npc/practice.js';
import {createNpcView} from './npc/view.js';
import {interpolateHitSpin} from './kart-hit.js';

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
createLapEntranceMarkers(scene,COURSES);
const avatar=createAvatar();scene.add(avatar);
const runner=Object.assign(createRunner(),SPAWN);
const animation=createRunningAnimator(avatar);
const kart=scene.getObjectByName('Go-kart prototype');
kart.userData.drivable=true;
const kartState=createVehicleState(),applyKart=createVehicleView(kart),seatAvatar=createSeatedPose(avatar);
const driverView=createDriverView(avatar,kart);
const itemSystem=createItemSystem(COURSES.map(course=>course.samples),Math.random,COURSES),applyItems=createItemView(scene,itemSystem,kart);
const npcPractice=createNpcPractice(worldPhysics,itemSystem),npcView=createNpcView(scene);
let driving=false;
let trialStorage=null;try{trialStorage=window.localStorage;}catch{}
const trials=new Map(COURSES.map(course=>[course.id,createTimeTrial(trialStorage,course)]));
let activeCourse=ORIGINAL_COURSE,trial=trials.get(activeCourse.id),nearEntrance=null,dismissedEntrance=null;
const applyTrial=createTimeTrialView(scene,()=>trial,COURSES,()=>npcPractice.active?npcPractice:null);
const updateMinimap=createMinimap(document.getElementById('minimap'),()=>npcPractice.active||trial.status==='ready'||trial.status==='running'?activeCourse:null);
const entrancePrompt=document.getElementById('lap-entrance'),entranceName=document.getElementById('lap-entrance-name');
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
const ISO_HALF_HEIGHT=21,TPV_FOLLOW_DISTANCE=10,TPV_HEIGHT=3.5,TPV_UP_TILT=4*Math.PI/180;
const isoCamera=new THREE.OrthographicCamera(-28,28,ISO_HALF_HEIGHT,-ISO_HALF_HEIGHT,.1,3000);
const firstPersonCamera=new THREE.PerspectiveCamera(76,1,.04,3000);firstPersonCamera.position.set(0,1.32,-.78);kart.add(firstPersonCamera);
let viewMode='third-person',fpvYaw=0,fpvPitch=0;
const fpvTarget=new THREE.Vector3(),fpvOrigin=new THREE.Vector3(),fpvDirection=new THREE.Vector3(),fpvRotation=new THREE.Quaternion(),renderRotation=new THREE.Quaternion();
const controls=new OrbitControls(camera,canvas);
controls.enableDamping=true;controls.enablePan=false;controls.minDistance=4;controls.maxDistance=1500;
controls.minPolarAngle=0.1;controls.maxPolarAngle=Math.PI/2-0.05;
function updateFirstPersonCamera(){
 kart.updateMatrixWorld(true);firstPersonCamera.getWorldPosition(fpvOrigin);kart.getWorldQuaternion(fpvRotation);
 const pitch=-.10+fpvPitch;
 fpvDirection.set(Math.sin(fpvYaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(fpvYaw)*Math.cos(pitch)).applyQuaternion(fpvRotation);
 firstPersonCamera.lookAt(fpvTarget.copy(fpvOrigin).add(fpvDirection));
}
function reset(){
 fpvYaw=0;fpvPitch=0;
 if(viewMode==='first-person'&&driving){applyKart(kartState);driverView.update();updateFirstPersonCamera();return;}
 const focus=driving?kartState:runner;controls.target.set(focus.x,focus.y+1.2,focus.z);camera.position.copy(controls.target).add(viewMode==='isometric'?new THREE.Vector3(28,28,28):driving?new THREE.Vector3(-Math.sin(focus.yaw)*TPV_FOLLOW_DISTANCE,TPV_HEIGHT,-Math.cos(focus.yaw)*TPV_FOLLOW_DISTANCE):new THREE.Vector3(-12,5,0));controls.update();
}
reset();
canvas.addEventListener('keydown',event=>{if(event.code==='KeyR')reset();});
function setCameraView(mode){
 viewMode=mode;camera=mode==='isometric'?isoCamera:mode==='first-person'?firstPersonCamera:thirdPersonCamera;
 controls.object=camera;controls.enabled=playing&&mode!=='first-person'&&document.pointerLockElement!==canvas;controls.enableRotate=mode==='third-person';controls.enableZoom=mode!=='first-person';controls.minZoom=.35;controls.maxZoom=4;
 driverView.firstPerson(driving&&mode==='first-person');
 const modes=driving?['third-person','first-person','isometric']:['third-person','isometric'],next=modes[(modes.indexOf(mode)+1)%modes.length];
 const labels={'third-person':'TPV','first-person':'FPV',isometric:'ISO'},button=document.querySelector('#view-toggle');button.textContent=labels[mode];button.setAttribute('aria-label',`Camera: ${labels[mode]}. Switch to ${labels[next]}.`);button.title=`${labels[mode]} · Press V for ${labels[next]}`;
 canvas.dataset.view=mode;updateControlHint();reset();resize();canvas.focus({preventScroll:true});
}
function toggleCamera(){if(!playing)return;const modes=driving?['third-person','first-person','isometric']:['third-person','isometric'];setCameraView(modes[(modes.indexOf(viewMode)+1)%modes.length]);}
bindPress(document.querySelector('#view-toggle'),toggleCamera);
window.addEventListener('keydown',event=>{if(playing&&event.code==='KeyV'&&!event.repeat&&!event.target.closest('input,textarea,select')){event.preventDefault();toggleCamera();}});
function resize(){
 const width=canvas.clientWidth,height=canvas.clientHeight,scale=Math.min(1,480/height);
 if(!width||!height)return;
 renderer.setSize(Math.round(width*scale),Math.round(height*scale),false);
 thirdPersonCamera.aspect=width/height;thirdPersonCamera.fov=width<700?55:45;thirdPersonCamera.updateProjectionMatrix();
 firstPersonCamera.aspect=width/height;firstPersonCamera.updateProjectionMatrix();
 isoCamera.left=-ISO_HALF_HEIGHT*width/height;isoCamera.right=ISO_HALF_HEIGHT*width/height;isoCamera.updateProjectionMatrix();
 render();
}
window.addEventListener('resize',resize);resize();
const orbit = new THREE.Spherical();
const mouseOffset = new THREE.Vector3();
const controlHint = document.querySelector('#camera-hint');
function updateControlHint(){
 controlHint.textContent=document.pointerLockElement===canvas?'Mouse locked · L / Esc to release':viewMode==='first-person'?'FPV · L to look around · R to reset':'Drag to rotate · Scroll or pinch to zoom';
}
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
  controls.enabled = playing && !locked && viewMode!=='first-person';
  canvas.dataset.mouseLocked = String(locked);
  updateControlHint();
});
document.addEventListener('pointerlockerror', () => {
  controlHint.textContent = 'Mouse lock blocked · Click the game and press L again';
});
document.addEventListener('mousemove', event => {
  if (!playing || document.pointerLockElement !== canvas || viewMode==='isometric') return;
  if(viewMode==='first-person'){
   fpvYaw=THREE.MathUtils.clamp(fpvYaw-event.movementX*.0025,-1.2,1.2);fpvPitch=THREE.MathUtils.clamp(fpvPitch-event.movementY*.0025,-.45,.45);updateFirstPersonCamera();render();return;
  }
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
for(const type of ['gesturestart','gesturechange','gestureend','dblclick'])document.addEventListener(type,event=>{if(playing||layoutEditor.isEditing())event.preventDefault();},{passive:false});
document.addEventListener('touchmove',event=>{if((playing||layoutEditor.isEditing())&&event.touches.length>1)event.preventDefault();},{passive:false});
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
function render(){
 const tilt=driving&&viewMode==='third-person';
 if(tilt){renderRotation.copy(camera.quaternion);camera.rotateX(TPV_UP_TILT);}
 renderer.render(scene,camera);
 if(tilt)camera.quaternion.copy(renderRotation);
}
controls.enableDamping=false;
let previousTime,accumulator=0,previous={...runner},previousKart={...kartState};
function toggleVehicle(){
 const hint=document.querySelector('#kart-action');
 if(!driving){
  if(!canEnterVehicle(runner,kartState)){hint.textContent=runner.grounded?'Move closer to kart':'Land before entering';return false;}
  animation.reset();driving=true;kart.add(avatar);seatAvatar();previousKart={...kartState};
 }else{
  const exit=findExitPosition(kartState,worldPhysics);
  if(!exit){hint.textContent=kartState.spinTime>0?'Wait for spin to finish':Math.abs(kartState.speed)>.75?'Stop to exit':'No safe exit here';return false;}
  invalidateTimeTrial(trial,'Left the kart — restart lap');
  stopNpcPractice();driving=false;kartState.speed=0;kartState.boostTime=0;previousKart={...kartState};scene.add(avatar);animation.reset();
  Object.assign(runner,createRunner(),exit);runner.jumpHeld=keys.has('Space');previous={...runner};
  driverView.firstPerson(false);if(viewMode==='first-person')viewMode='third-person';
 }
 mobile.clear();mobileExitPending=false;
 jumpQueued=false;itemQueued=false;manualCameraUntil=0;setDrivingChart();setCameraView(viewMode);return true;
}
function stopNpcPractice(){npcPractice.stop();npcView.update(null,0,itemSystem.time);}
function startTrial(course=activeCourse){
 if(!playing)return;
 stopNpcPractice();itemSystem.allowShells=false;itemSystem.shells=[];itemSystem.bananas=[];
 clearInputs();mobileExitPending=false;
 if(course!==activeCourse)invalidateTimeTrial(trial,'Switched tracks');
 activeCourse=course;trial=trials.get(course.id);document.getElementById('ghost-transfer-status').hidden=true;
 Object.assign(kartState,createVehicleState(),course.start,{heldItem:'nitro'});previousKart={...kartState};
 animation.reset();kart.add(avatar);seatAvatar();driving=true;
 for(const box of itemSystem.boxes)box.cooldown=0;
 itemSystem.time=0;
 armTimeTrial(trial);accumulator=0;previousTime=undefined;manualCameraUntil=0;setDrivingChart();setCameraView(viewMode);
 nearEntrance=null;entrancePrompt.hidden=true;
}
function startNpcPractice(){
 if(!playing)return;
 startTrial(ORIGINAL_COURSE);
 invalidateTimeTrial(trial,'NPC practice does not save lap times');trial.status='idle';trial.elapsed=0;
 itemSystem.allowShells=true;
 Object.assign(kartState,npcPractice.start());previousKart={...kartState};setCameraView(viewMode);
}
bindPress(document.getElementById('npc-start'),startNpcPractice);
function exploreWorld(){
 stopNpcPractice();itemSystem.allowShells=true;itemSystem.shells=[];itemSystem.bananas=[];
 clearInputs();mobileExitPending=false;dismissedEntrance=null;nearEntrance=null;entrancePrompt.hidden=true;
 armTimeTrial(trial);trial.status='idle';
 Object.assign(kartState,createVehicleState(),WORLD_START);previousKart={...kartState};animation.reset();kart.add(avatar);seatAvatar();driving=true;
 accumulator=0;previousTime=undefined;manualCameraUntil=0;setDrivingChart();setCameraView(viewMode);
}
function updateEntrancePrompt(position){
 if(dismissedEntrance&&nearestLapEntrance(position,COURSES,23)!==dismissedEntrance)dismissedEntrance=null;
 nearEntrance=npcPractice.active||trial.status==='running'?null:nearestLapEntrance(position,COURSES);
 if(nearEntrance===dismissedEntrance)nearEntrance=null;
 entrancePrompt.hidden=!nearEntrance;if(nearEntrance)entranceName.textContent=nearEntrance.name;
 canvas.dataset.nearTrack=nearEntrance?.id??'';
}
bindPress(document.getElementById('lap-entrance-start'),()=>{if(nearEntrance)startTrial(nearEntrance);});
bindPress(document.getElementById('lap-entrance-close'),()=>{dismissedEntrance=nearEntrance;nearEntrance=null;entrancePrompt.hidden=true;canvas.focus({preventScroll:true});});
window.addEventListener('keydown',event=>{if(playing&&nearEntrance&&event.code==='Enter'&&!event.repeat&&!event.target.closest('input,textarea,select,button,summary,a')){event.preventDefault();startTrial(nearEntrance);}});
bindPress(document.getElementById('trial-start'),()=>startTrial());
document.getElementById('trial-ghost').addEventListener('change',event=>{trial.showGhost=event.target.checked;canvas.focus({preventScroll:true});});
const ghostFile=document.getElementById('ghost-file'),ghostMessage=document.getElementById('ghost-transfer-status'),importButton=document.getElementById('ghost-import');
function ghostTransferMessage(text){ghostMessage.hidden=false;ghostMessage.textContent=text;}
bindPress(document.getElementById('ghost-export'),()=>{
 if(!trial.records.length)return;
 clearInputs();
 const url=URL.createObjectURL(new Blob([exportGhosts(trial)],{type:'application/json'}));
 const prefix=activeCourse===ORIGINAL_COURSE?'':`${activeCourse.name.split(' ')[0].toLowerCase()}-`;
 const link=document.createElement('a');link.href=url;link.download=`letsgo-${prefix}ghosts-${new Date().toISOString().slice(0,10)}.json`;
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
    if(itemQueued){useHeldItem(itemSystem,kartState,worldPhysics);itemQueued=false;}
    const drivingInput=readDrivingInput(keys,mobile.consume());
    if(mobileExitPending){drivingInput.throttle=0;drivingInput.steer=0;drivingInput.brake=true;}
    const startForward=drivingInput.throttle>0&&!drivingInput.brake;
    const waiting=trial.status==='ready'||npcPractice.active&&!npcPractice.running;
    if(!waiting||startForward||kartState.spinTime>0)stepVehicle(kartState,drivingInput,STEP,worldPhysics);
    if(npcPractice.active)npcPractice.step(STEP,kartState,startForward);else stepTimeTrial(trial,previousKart,kartState,startForward,STEP);
    if(mobileExitPending&&Math.abs(kartState.speed)<.75){mobileExitPending=false;toggleVehicle();}
   }else{previous={...runner};stepRunner(runner,input(),STEP,pedestrianWorld);}
   stepItems(itemSystem,driving?kartState:null,previousKart,STEP,worldPhysics,npcPractice.actors());
   accumulator-=STEP;
  }
  if(driving&&kartState.y< -35){stopNpcPractice();invalidateTimeTrial(trial,'Returned to slab — restart lap');Object.assign(kartState,createVehicleState(),WORLD_START);itemQueued=false;previousKart={...kartState};reset();}
  if(!driving&&runner.y< -35){Object.assign(runner,createRunner(),SPAWN);runner.jumpHeld=keys.has('Space');jumpQueued=false;previous={...runner};reset();}
  const alpha=accumulator/STEP;
  const kartTurn=Math.atan2(Math.sin(kartState.yaw-previousKart.yaw),Math.cos(kartState.yaw-previousKart.yaw));
  const kartPose={...kartState,spinTime:interpolateHitSpin(previousKart,kartState,alpha),x:THREE.MathUtils.lerp(previousKart.x,kartState.x,alpha),y:THREE.MathUtils.lerp(previousKart.y,kartState.y,alpha),z:THREE.MathUtils.lerp(previousKart.z,kartState.z,alpha),yaw:previousKart.yaw+kartTurn*alpha};
  applyKart(kartPose);if(driving)driverView.update();driverView.firstPerson(driving&&viewMode==='first-person');applyItems(kartPose,driving);const npcPose=npcView.update(npcPractice.driver,alpha,itemSystem.time),ghostPoses=applyTrial(alpha,STEP);
  if(!driving){
   avatar.position.set(THREE.MathUtils.lerp(previous.x,runner.x,alpha),THREE.MathUtils.lerp(previous.y,runner.y,alpha),THREE.MathUtils.lerp(previous.z,runner.z,alpha));
   const turn=Math.atan2(Math.sin(runner.yaw-previous.yaw),Math.cos(runner.yaw-previous.yaw));
   avatar.rotation.set(0,previous.yaw+turn*alpha,0);
   const distance=THREE.MathUtils.lerp(previous.distance,runner.distance,alpha);
   const phase=THREE.MathUtils.lerp(previous.phase,runner.phase,alpha);
   animation.update({...runner,distance,phase},dt);
  }
  const focus=driving?kartPose:avatar.position;
  updateEntrancePrompt(driving?kartState:runner);
  updateMinimap(focus,driving?kartPose.yaw:avatar.rotation.y,ghostPoses,npcPose?[npcPose]:[]);
  if(driving&&viewMode==='first-person')updateFirstPersonCamera();
  else{
   const target=new THREE.Vector3(focus.x,THREE.MathUtils.damp(controls.target.y,focus.y+(driving?1:1.2),10,dt),focus.z);
   const offset=target.sub(controls.target);controls.target.add(offset);camera.position.add(offset);
   if(driving&&viewMode==='third-person'&&!orbiting&&time>manualCameraUntil){
    const desired=controls.target.clone().add(new THREE.Vector3(-Math.sin(kartPose.yaw)*TPV_FOLLOW_DISTANCE,TPV_HEIGHT,-Math.cos(kartPose.yaw)*TPV_FOLLOW_DISTANCE));
    camera.position.lerp(desired,1-Math.exp(-5*dt));
   }
   controls.update();
  }
  sun.position.set(focus.x-3,focus.y+8,focus.z+5);sun.target.position.set(focus.x,focus.y,focus.z);sun.target.updateMatrixWorld();
  const itemLabel=document.querySelector('#held-item');
  if(itemLabel){const text=kartState.heldItem==='nitro'?'Item: Nitro':kartState.heldItem==='shell'?'Item: Shell':kartState.heldItem==='banana'?'Item: Banana':kartState.boostTime>0?'Nitro active':'Item: —';if(itemLabel.textContent!==text)itemLabel.textContent=text;}
  render();
  canvas.dataset.npc=npcPractice.active?(npcPractice.driver.finished?'finished':npcPractice.running?'running':'ready'):'off';canvas.dataset.npcElapsed=String(npcPractice.driver?.elapsed??0);canvas.dataset.shells=String(itemSystem.shells.length);
  canvas.dataset.course=activeCourse.id;canvas.dataset.trial=trial.status;canvas.dataset.lap=String(trial.completed+1);canvas.dataset.checkpoints=String(trial.passed);canvas.dataset.elapsed=String(trial.elapsed);
  canvas.dataset.item=kartState.heldItem??'';canvas.dataset.boost=String(kartState.boostTime);
  const state=driving?kartState:runner;canvas.dataset.mode=driving?'driving':runner.mode;
  const mph=String(driving?speedToMph(Math.hypot(kartState.speed,kartState.lateralSpeed)):0);if(speedometer.value!==mph)speedometer.value=mph;
  canvas.dataset.height=String(state.y);canvas.dataset.grounded=String(state.grounded);
  canvas.dataset.speed=String(state.speed);canvas.dataset.position=`${state.x},${state.z}`;
  mobile.update({driving,heldItem:kartState.heldItem,boosting:kartState.boostTime>0,interactionText:driving?(mobileExitPending?'Stop…':'Exit'):'Kart',canInteract:driving||canEnterVehicle(runner,kartState),canFlip:runner.grounded&&runner.speed<.65});
}

function goHome(){
 stopNpcPractice();playing=false;renderer.setAnimationLoop(null);clearInputs();mobileExitPending=false;
 nearEntrance=null;entrancePrompt.hidden=true;
 invalidateTimeTrial(trial,'Returned home — restart lap');previousTime=undefined;accumulator=0;
 if(document.pointerLockElement===canvas)document.exitPointerLock();
 controls.enabled=false;gameScreen.hidden=true;gameScreen.inert=true;homeScreen.hidden=false;app.dataset.screen='home';document.title='LetsGo';playButton.focus({preventScroll:true});
}
function playGame(){
 homeScreen.hidden=true;gameScreen.hidden=false;gameScreen.inert=false;playing=true;gameFocused=true;controls.enabled=viewMode!=='first-person';app.dataset.screen='game';document.title='LetsGo · Race';
 exploreWorld();resize();renderer.setAnimationLoop(frame);
}
bindPress(document.getElementById('home-button'),goHome);
bindPress(document.getElementById('home-logo-link'),goHome);
bindPress(playButton,playGame);
const layoutEditor=createLayoutEditor({
 onPreview(){
  clearInputs();if(document.pointerLockElement===canvas)document.exitPointerLock();controls.enabled=false;
  mobile.update({driving:true,heldItem:'nitro',boosting:false,interactionText:'Exit',canInteract:true,canFlip:false});
  resize();
 },
 onClose(){
  mobile.clear();mobile.update({driving,heldItem:kartState.heldItem,boosting:kartState.boostTime>0,interactionText:driving?'Exit':'Kart',canInteract:driving||canEnterVehicle(runner,kartState),canFlip:runner.grounded&&runner.speed<.65});
 },
});
const trialDetails=document.getElementById('trial-details');bindPress(trialDetails.querySelector('summary'),()=>{trialDetails.open=!trialDetails.open;});
setTouchMode(window.matchMedia('(pointer:coarse)').matches);
app.dataset.screen='home';controls.enabled=false;playButton.disabled=false;
