import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {createIslandRenderer} from './renderer.js';
import {createCanvasView} from './canvas-view.js';
import {createIslandData,createTerrain} from './terrain.js';
import {prepareFaces,disposeBlockMeshes} from './block-mesh.js';
import {createWaterFaces,createWaterMeshes} from './water.js';
import {QUALITY,readQuality,saveQuality} from './quality.js';
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
const skyLight=new THREE.HemisphereLight('#fbfff4','#9eb6d0',1.5);
const sun=new THREE.DirectionalLight('#fff8e6',3);sun.position.set(-55,90,-40);sun.target.position.set(0,-5,0);
Object.assign(sun.shadow.camera,{left:-65,right:65,top:65,bottom:-65,near:2,far:220});sun.shadow.bias=-.00012;sun.shadow.normalBias=.035;
const fill=new THREE.DirectionalLight('#dfefff',.65);fill.position.set(50,18,70);scene.add(skyLight,sun,sun.target,fill);
if(!software){renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor(0,0);renderer.shadowMap.autoUpdate=false;}
const camera=new THREE.OrthographicCamera(-65,65,46,-46,.1,700),controls=new OrbitControls(camera,canvas);
controls.target.set(0,-3,0);controls.enableDamping=false;controls.enablePan=false;controls.minPolarAngle=.08;controls.maxPolarAngle=Math.PI*.7;controls.minZoom=.6;controls.maxZoom=4;controls.rotateSpeed=.65;controls.zoomSpeed=.85;
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
 const width=canvas.clientWidth,height=canvas.clientHeight,aspect=width/height,halfHeight=Math.max(44,65/aspect);
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,compatible?1:QUALITY[quality].pixelRatio));renderer.setSize(width,height,false);
 camera.left=-halfHeight*aspect;camera.right=halfHeight*aspect;camera.top=halfHeight;camera.bottom=-halfHeight;camera.updateProjectionMatrix();requestDraw();
}
function setQuality(value,save=true){
 if(!QUALITY[value])throw new TypeError('Unknown graphics quality');
 if(software&&value!=='low')return false;
 quality=value;select.value=value;canvas.dataset.quality=value;
 if(!software){
  const settings=QUALITY[value];renderer.toneMapping=value==='low'?THREE.NoToneMapping:THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.8;
  renderer.shadowMap.enabled=settings.shadows;renderer.shadowMap.type=value==='high'?THREE.PCFSoftShadowMap:THREE.PCFShadowMap;
  sun.castShadow=settings.shadows;
  sun.shadow.map?.dispose();sun.shadow.map=null;
  if(settings.shadows)sun.shadow.mapSize.set(settings.shadowSize,settings.shadowSize);
 }
 rebuild();resize();if(save)try{saveQuality(localStorage,value);}catch{}return true;
}
function overview(){camera.position.set(78,72,112);camera.zoom=1;controls.target.set(0,-3,0);camera.updateProjectionMatrix();controls.update();requestDraw();}
function topView(){camera.position.set(0,180,.1);camera.zoom=1;controls.target.set(0,-3,0);camera.updateProjectionMatrix();controls.update();requestDraw();}
window.addEventListener('resize',resize);document.getElementById('overview').addEventListener('click',overview);document.getElementById('top-view').addEventListener('click',topView);
select.addEventListener('change',()=>setQuality(select.value));
window.addEventListener('keydown',event=>{if(event.code==='KeyR'&&!event.repeat)overview();});canvas.addEventListener('contextmenu',event=>event.preventDefault());
const touch=matchMedia('(pointer:coarse)').matches;
document.getElementById('camera-hint').textContent=(software?'Compatibility view · Low graphics · ':'')+'Drag to look around · '+(touch?'Pinch':'Scroll')+' to zoom';
window.__letsgoIsland={
 world:data.world,setQuality,
 get collisionBoxes(){return data.world.collisionBoxes();},
 setBlock(x,y,z,type){data.world.set(x,y,z,type);data.faces=prepareFaces(data.world);waterFaces=createWaterFaces(data.world);rebuild();requestDraw();},
 get stats(){return{blocks:data.world.cells.size,faces:data.faces.length,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,mode:canvas.dataset.graphics,quality,shadowSize:QUALITY[quality].shadowSize,pixelRatio:software?1:renderer.getPixelRatio()};}
};
setQuality(quality,false);overview();resize();draw();canvas.dataset.scene='block-island';canvas.dataset.ready='true';
