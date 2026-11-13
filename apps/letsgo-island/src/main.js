import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {createIslandRenderer} from './renderer.js';
import {createCanvasView} from './canvas-view.js';
import {createIslandData,createTerrain} from './terrain.js';
import {prepareFaces,disposeBlockMeshes} from './block-mesh.js';
import {createWaterFaces,createWaterMeshes} from './water.js';
import {QUALITY,readQuality,saveQuality} from './quality.js';
import {REFERENCE,TREE_PLAN,ROCK_PLAN,SHRUB_PLAN} from './reference-layout.js';
import {surfaceHeight} from './layout.js';
import {createIslandAvatar} from './avatar-world.js';
import {createAvatarTouch} from './avatar-touch.js';
import {createCanvasAvatar} from './canvas-avatar.js';
import {wantsTouchControls,suppressPageGestures} from '../../../src/ui/TouchControls.ts';
import './style.css';

let canvas=document.querySelector('canvas');
const scene=new THREE.Scene(),data=createIslandData();let waterFaces=createWaterFaces(data.world);
const select=document.getElementById('graphics-quality');
let startup,meshes,water;
try{startup=createIslandRenderer(canvas);}
catch(graphicsError){
 try{startup=createCanvasView(canvas,[...data.faces,...waterFaces]);}
 catch(error){
  document.getElementById('load-error').hidden=false;document.getElementById('camera-hint').hidden=true;
  document.querySelectorAll('nav button,nav select').forEach(button=>button.disabled=true);
  document.getElementById('retry-load').addEventListener('click',()=>location.reload());
  throw new AggregateError([graphicsError,error],'Neither graphics view could start.');
 }
}
const {renderer,compatible}=startup;canvas=startup.canvas;
const software=canvas.dataset.graphics==='canvas';let quality='low';
try{quality=software?'low':readQuality(localStorage);}catch{}
if(software){select.title='Medium and High need 3D graphics support. Low works in compatibility view.';for(const option of select.options)if(option.value!=='low')option.disabled=true;}
const skyLight=new THREE.HemisphereLight('#fbfff4','#9eb6d0',1.2);
const sun=new THREE.DirectionalLight('#fff8e6',2.5);sun.position.set(-55,90,-40);sun.target.position.set(0,-5,0);
Object.assign(sun.shadow.camera,{left:-65,right:65,top:65,bottom:-65,near:2,far:220});sun.shadow.bias=-.00012;sun.shadow.normalBias=.035;
const fill=new THREE.DirectionalLight('#dfefff',.9);fill.position.set(50,18,70);scene.add(skyLight,sun,sun.target,fill);
if(!software){renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor(0,0);renderer.shadowMap.autoUpdate=false;}

const avatar=createIslandAvatar(data.world);scene.add(avatar.root);
if(software)renderer.setActors(createCanvasAvatar(avatar));
const input=avatar.input;input.attach(canvas);input.setPointerLockWanted(false);canvas.tabIndex=0;
const touch=wantsTouchControls(),touchControls=touch?createAvatarTouch(input,document.getElementById('island')):null;
if(touch){document.body.classList.add('has-touch');suppressPageGestures();}

const overheadCamera=new THREE.OrthographicCamera(-65,65,46,-46,.1,700);
const angledCamera=new THREE.PerspectiveCamera(29.3,1,.1,1000);
// Controls keep the desired follow distance. A separate render camera can pull
// in at a wall without destroying that distance or changing the player's yaw.
const followOrbitCamera=new THREE.PerspectiveCamera(58,1,.1,700),walkCamera=new THREE.PerspectiveCamera(58,1,.1,700);
let camera=walkCamera,view='walk',simulating=false;
const controls=new OrbitControls(followOrbitCamera,canvas);
controls.enableDamping=false;controls.enablePan=false;controls.minZoom=.6;controls.maxZoom=4;controls.rotateSpeed=.65;controls.zoomSpeed=.85;
let pending=false,draws=0,loop=null,lastTime=0,awakeUntil=0,lastActorDraw=0;
const focus=new THREE.Vector3(),shift=new THREE.Vector3(),offset=new THREE.Vector3();

function draw(){pending=false;renderer.render(scene,camera);canvas.dataset.renders=++draws;canvas.dataset.drawCalls=renderer.info.render.calls;canvas.dataset.triangles=renderer.info.render.triangles;}
function requestDraw(){if(!pending){pending=true;requestAnimationFrame(draw);}}
function syncFollowCamera(){
 if(view!=='walk')return;
 offset.copy(followOrbitCamera.position).sub(controls.target);
 const distance=offset.length(),hit=avatar.cameraDistance(controls.target,followOrbitCamera.position);
 walkCamera.position.copy(controls.target).addScaledVector(offset,distance>.001?Math.min(distance,Math.max(.8,hit-.45))/distance:1);
 walkCamera.quaternion.copy(followOrbitCamera.quaternion);walkCamera.zoom=followOrbitCamera.zoom;walkCamera.updateProjectionMatrix();
}
controls.addEventListener('change',()=>{syncFollowCamera();if(!simulating)requestDraw();});
function rebuild(){
 if(software){renderer.setFaces([...data.faces,...waterFaces]);return;}
 if(meshes){scene.remove(meshes);disposeBlockMeshes(meshes);}
 if(water){scene.remove(water);disposeBlockMeshes(water);}
 meshes=createTerrain(data,quality);water=createWaterMeshes(waterFaces);scene.add(meshes,water);renderer.shadowMap.needsUpdate=true;
}
function resize(){
 const width=canvas.clientWidth,height=canvas.clientHeight,aspect=width/height,halfHeight=Math.max(36.5714,54.8571/aspect);
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,compatible?1:QUALITY[quality].pixelRatio));renderer.setSize(width,height,false);
 overheadCamera.left=-halfHeight*aspect;overheadCamera.right=halfHeight*aspect;overheadCamera.top=halfHeight;overheadCamera.bottom=-halfHeight;overheadCamera.updateProjectionMatrix();
 angledCamera.aspect=aspect;angledCamera.fov=THREE.MathUtils.radToDeg(2*Math.atan(halfHeight*REFERENCE.angledCamera.frameScale/REFERENCE.angledCamera.distance));angledCamera.updateProjectionMatrix();
 for(const follow of [followOrbitCamera,walkCamera]){follow.aspect=aspect;follow.fov=aspect<.8?66:58;follow.updateProjectionMatrix();}
 syncFollowCamera();requestDraw();
}
function setQuality(value,save=true){
 if(!QUALITY[value])throw new TypeError('Unknown graphics quality');
 if(software&&value!=='low')return false;
 quality=value;select.value=value;canvas.dataset.quality=value;avatar.setQuality(value);
 if(!software){
  const settings=QUALITY[value];renderer.toneMapping=THREE.NoToneMapping;
  renderer.shadowMap.enabled=settings.shadows;renderer.shadowMap.type=THREE.PCFShadowMap;sun.shadow.radius=value==='high'?3.5:1.5;
  sun.castShadow=settings.shadows;sun.shadow.map?.dispose();sun.shadow.map=null;
  if(settings.shadows)sun.shadow.mapSize.set(settings.shadowSize,settings.shadowSize);
 }
 rebuild();resize();if(save)try{saveQuality(localStorage,value);}catch{}return true;
}
function followAvatar(delta){
 avatar.focus(focus);shift.copy(focus).sub(controls.target);
 if(shift.length()>18)controls.target.copy(focus);
 else controls.target.addScaledVector(shift,1-Math.exp(-10*delta));
 // Translate by the actual change of target, retaining the orbit and zoom.
 offset.copy(followOrbitCamera.position).sub(previousTarget);
 followOrbitCamera.position.copy(controls.target).add(offset);
 controls.update();syncFollowCamera();
}
const previousTarget=new THREE.Vector3();
const actionNames=['jump','crouch','dive','sideFlip','climbDown','backflip','sideJump','diveJump'];
function frame(now){
 loop=null;if(view!=='walk'||document.hidden)return;
 const delta=Math.min(.05,lastTime?(now-lastTime)/1000:1/60);lastTime=now;input.update(1,false);
 const requested=input.moveStrength>.001||input.look.lengthSq()>.00001||actionNames.some(action=>input.isDown(action)||input.wasPressed(action));
 if(requested||avatar.player.state!=='ground'||avatar.player.speed>.02)awakeUntil=now+650;
 if(now<awakeUntil){
  simulating=true;previousTarget.copy(controls.target);
  if(input.look.lengthSq()>.00001){
   offset.copy(followOrbitCamera.position).sub(controls.target);
   const azimuth=controls.getAzimuthalAngle()-input.look.x,polar=THREE.MathUtils.clamp(controls.getPolarAngle()+input.look.y,.08,Math.PI*.48);
   offset.setFromSphericalCoords(offset.length(),polar,azimuth);followOrbitCamera.position.copy(controls.target).add(offset);controls.update();
  }
  avatar.step(delta,controls.getAzimuthalAngle(),Math.PI/2-controls.getPolarAngle());followAvatar(delta);simulating=false;
  const interval=1000/(software?15:quality==='low'?30:60);
  if(now-lastActorDraw>=interval){lastActorDraw=now;requestDraw();}
 }
 loop=requestAnimationFrame(frame);
}
function startLoop(){if(loop===null&&!document.hidden){lastTime=0;awakeUntil=performance.now()+700;loop=requestAnimationFrame(frame);}}
function setView(name){
 if(!['walk','angled','overhead'].includes(name))throw new TypeError('Unknown island view');
 if(loop!==null){cancelAnimationFrame(loop);loop=null;}input.releaseTouch();input.clear();
 view=name;camera=name==='walk'?walkCamera:name==='angled'?angledCamera:overheadCamera;
 controls.object=name==='walk'?followOrbitCamera:camera;
 controls.minDistance=name==='walk'?5:90;controls.maxDistance=name==='walk'?70:600;
 controls.minPolarAngle=.08;controls.maxPolarAngle=name==='walk'?Math.PI*.48:Math.PI*.7;
 if(name==='walk'){
  avatar.focus(controls.target);followOrbitCamera.position.copy(controls.target).add(new THREE.Vector3(0,11,19));followOrbitCamera.zoom=1;
 }else{
  const angle=(name==='angled'?REFERENCE.angledElevation:REFERENCE.overheadElevation)*Math.PI/180;
  const target=new THREE.Vector3(name==='angled'?REFERENCE.angledCamera.targetX:1.2857,name==='angled'?REFERENCE.angledCamera.targetY:-1.3,name==='angled'?0:-4.225),distance=name==='angled'?REFERENCE.angledCamera.distance:170;
  camera.position.copy(target).add(new THREE.Vector3(0,distance*Math.sin(angle),distance*Math.cos(angle)));camera.zoom=1;controls.target.copy(target);camera.updateProjectionMatrix();
 }
 controls.update();canvas.dataset.view=name;document.body.dataset.view=name;touchControls?.setVisible(name==='walk');
 for(const [id,target]of [['explore','walk'],['overview','angled'],['top-view','overhead']])document.getElementById(id).setAttribute('aria-pressed',String(name===target));
 document.getElementById('reset-avatar').hidden=name!=='walk';
 document.getElementById('camera-hint').textContent=name==='walk'?(touch?'Left pad: move · Jump / Crouch · Drag to look': 'E/D/S/F or arrows: move · Space: jump · Shift: walk · C: crouch · Drag / scroll: camera · Backspace: reset'):
  (software?'Compatibility view · ':'')+'Drag to orbit · '+(touch?'Pinch':'Scroll')+' to zoom · R: angled view';
 resize();requestDraw();if(name==='walk')startLoop();
}
function resetAvatar(){avatar.reset();setView('walk');canvas.focus({preventScroll:true});}
window.addEventListener('resize',resize);
for(const [id,name]of [['explore','walk'],['overview','angled'],['top-view','overhead']])document.getElementById(id).addEventListener('click',()=>{setView(name);canvas.focus({preventScroll:true});});
document.getElementById('reset-avatar').addEventListener('click',resetAvatar);
select.addEventListener('change',()=>{setQuality(select.value);canvas.focus({preventScroll:true});});
window.addEventListener('keydown',event=>{
 if(event.target instanceof HTMLSelectElement)return;
 if(event.code==='Backspace'&&view==='walk'){event.preventDefault();if(!event.repeat)resetAvatar();}
 else if(event.code==='KeyR'&&view!=='walk'&&!event.repeat)setView('angled');
});
canvas.addEventListener('contextmenu',event=>event.preventDefault());
document.addEventListener('visibilitychange',()=>{
 input.releaseTouch();input.clear();touchControls?.clear();
 if(document.hidden&&loop!==null){cancelAnimationFrame(loop);loop=null;}else if(view==='walk')startLoop();
});
window.__letsgoIsland={
 world:data.world,avatar,setQuality,setView,resetAvatar,
 referenceLandmarks(){camera.updateMatrixWorld();const plans=[...TREE_PLAN.map(p=>({...p,kind:'tree'})),...ROCK_PLAN.map(p=>({...p,kind:'rock'})),...SHRUB_PLAN.map(p=>({...p,kind:'shrub'}))];return plans.map(plan=>{const point=new THREE.Vector3(plan.x+1,surfaceHeight(plan.x,plan.z),plan.z+1).project(camera);return{id:plan.kind+':'+plan.id,sourceView:'overhead',source:plan.source,screen:[(point.x+1)*canvas.clientWidth/2,(1-point.y)*canvas.clientHeight/2]};});},
 get collisionBoxes(){return data.world.collisionBoxes();},
 setBlock(x,y,z,type){data.world.set(x,y,z,type);data.faces=prepareFaces(data.world);waterFaces=createWaterFaces(data.world);avatar.rebuildCollision();rebuild();awakeUntil=performance.now()+1000;requestDraw();},
 get stats(){return{blocks:data.world.cells.size,faces:data.faces.length,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,mode:canvas.dataset.graphics,quality,view,shadowSize:QUALITY[quality].shadowSize,pixelRatio:software?1:renderer.getPixelRatio()};}
};
setQuality(quality,false);setView('walk');draw();canvas.dataset.scene='block-island';canvas.dataset.ready='true';
