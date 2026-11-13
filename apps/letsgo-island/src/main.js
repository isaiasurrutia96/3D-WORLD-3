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
const overheadCamera=new THREE.OrthographicCamera(-65,65,46,-46,.1,700),angledCamera=new THREE.PerspectiveCamera(29.3,1,.1,1000);
let camera=angledCamera;const controls=new OrbitControls(camera,canvas);
controls.target.set(1.2857,-1.3,0);controls.enableDamping=false;controls.enablePan=false;controls.minPolarAngle=.08;controls.maxPolarAngle=Math.PI*.7;controls.minZoom=.6;controls.maxZoom=4;controls.rotateSpeed=.65;controls.zoomSpeed=.85;
let view='angled';
let pending=false,draws=0;
function draw(){pending=false;renderer.render(scene,camera);canvas.dataset.renders=++draws;canvas.dataset.drawCalls=renderer.info.render.calls;canvas.dataset.triangles=renderer.info.render.triangles;}
function requestDraw(){if(!pending){pending=true;requestAnimationFrame(draw);}}
controls.addEventListener('change',requestDraw);
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
 angledCamera.aspect=aspect;angledCamera.fov=THREE.MathUtils.radToDeg(2*Math.atan(halfHeight*REFERENCE.angledCamera.frameScale/REFERENCE.angledCamera.distance));angledCamera.updateProjectionMatrix();requestDraw();
}
function setQuality(value,save=true){
 if(!QUALITY[value])throw new TypeError('Unknown graphics quality');
 if(software&&value!=='low')return false;
 quality=value;select.value=value;canvas.dataset.quality=value;
 if(!software){
  const settings=QUALITY[value];renderer.toneMapping=THREE.NoToneMapping;
  renderer.shadowMap.enabled=settings.shadows;renderer.shadowMap.type=THREE.PCFShadowMap;sun.shadow.radius=value==='high'?3.5:1.5;
  sun.castShadow=settings.shadows;
  sun.shadow.map?.dispose();sun.shadow.map=null;
  if(settings.shadows)sun.shadow.mapSize.set(settings.shadowSize,settings.shadowSize);
 }
 rebuild();resize();if(save)try{saveQuality(localStorage,value);}catch{}return true;
}
function setView(name){
 if(!['angled','overhead'].includes(name))throw new TypeError('Unknown reference view');
 view=name;camera=name==='angled'?angledCamera:overheadCamera;controls.object=camera;controls.minDistance=90;controls.maxDistance=600;
 const angle=(name==='angled'?REFERENCE.angledElevation:REFERENCE.overheadElevation)*Math.PI/180,target=new THREE.Vector3(name==='angled'?REFERENCE.angledCamera.targetX:1.2857,name==='angled'?REFERENCE.angledCamera.targetY:-1.3,name==='angled'?0:-4.225),distance=name==='angled'?REFERENCE.angledCamera.distance:170;
 camera.position.copy(target).add(new THREE.Vector3(0,distance*Math.sin(angle),distance*Math.cos(angle)));camera.zoom=1;controls.target.copy(target);camera.updateProjectionMatrix();controls.update();canvas.dataset.view=name;resize();requestDraw();
}
function overview(){setView('angled');}
function topView(){setView('overhead');}
window.addEventListener('resize',resize);document.getElementById('overview').addEventListener('click',overview);document.getElementById('top-view').addEventListener('click',topView);
select.addEventListener('change',()=>setQuality(select.value));
window.addEventListener('keydown',event=>{if(event.code==='KeyR'&&!event.repeat)overview();});canvas.addEventListener('contextmenu',event=>event.preventDefault());
const touch=matchMedia('(pointer:coarse)').matches;
document.getElementById('camera-hint').textContent=(software?'Compatibility view · Low graphics · ':'')+'Drag to look around · '+(touch?'Pinch':'Scroll')+' to zoom';
window.__letsgoIsland={
 world:data.world,setQuality,setView,
 referenceLandmarks(){camera.updateMatrixWorld();const plans=[...TREE_PLAN.map(p=>({...p,kind:'tree'})),...ROCK_PLAN.map(p=>({...p,kind:'rock'})),...SHRUB_PLAN.map(p=>({...p,kind:'shrub'}))];return plans.map(plan=>{const point=new THREE.Vector3(plan.x+1,surfaceHeight(plan.x,plan.z),plan.z+1).project(camera);return{id:plan.kind+':'+plan.id,sourceView:'overhead',source:plan.source,screen:[(point.x+1)*canvas.clientWidth/2,(1-point.y)*canvas.clientHeight/2]};});},
 get collisionBoxes(){return data.world.collisionBoxes();},
 setBlock(x,y,z,type){data.world.set(x,y,z,type);data.faces=prepareFaces(data.world);waterFaces=createWaterFaces(data.world);rebuild();requestDraw();},
 get stats(){return{blocks:data.world.cells.size,faces:data.faces.length,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,mode:canvas.dataset.graphics,quality,view,shadowSize:QUALITY[quality].shadowSize,pixelRatio:software?1:renderer.getPixelRatio()};}
};
setQuality(quality,false);overview();resize();draw();canvas.dataset.scene='block-island';canvas.dataset.ready='true';
