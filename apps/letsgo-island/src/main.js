import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {createIslandRenderer} from './renderer.js';
import {createCanvasView} from './canvas-view.js';
import {createIslandData,createTerrain} from './terrain.js';
import {prepareFaces} from './block-mesh.js';
import './style.css';

let canvas=document.querySelector('canvas');
const scene=new THREE.Scene(),data=createIslandData();
let startup,meshes;
try{startup=createIslandRenderer(canvas);}
catch(graphicsError){
 try{startup=createCanvasView(canvas,data.faces);}
 catch(error){
  document.getElementById('load-error').hidden=false;
  document.getElementById('camera-hint').hidden=true;
  document.querySelectorAll('nav button').forEach(button=>button.disabled=true);
  document.getElementById('retry-load').addEventListener('click',()=>location.reload());
  throw new AggregateError([graphicsError,error],'The island could not start either graphics view.');
 }
}
const {renderer,compatible}=startup;canvas=startup.canvas;
const software=canvas.dataset.graphics==='canvas';
if(!software){
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NoToneMapping;
 renderer.setClearColor(0,0);renderer.shadowMap.enabled=false;
 meshes=createTerrain(data);scene.add(meshes);
}
const camera=new THREE.OrthographicCamera(-65,65,46,-46,.1,700);
const controls=new OrbitControls(camera,canvas);
controls.target.set(0,-2,0);controls.enableDamping=false;controls.enablePan=false;
controls.minPolarAngle=.08;controls.maxPolarAngle=Math.PI*.7;controls.minZoom=.6;controls.maxZoom=4;
controls.rotateSpeed=.65;controls.zoomSpeed=.85;
let pending=false,draws=0;
function draw(){
 pending=false;renderer.render(scene,camera);
 canvas.dataset.renders=++draws;
 canvas.dataset.drawCalls=renderer.info.render.calls;
 canvas.dataset.triangles=renderer.info.render.triangles;
}
function requestDraw(){if(!pending){pending=true;requestAnimationFrame(draw);}}
controls.addEventListener('change',requestDraw);
function overview(){camera.position.set(95,83,120);camera.zoom=1;controls.target.set(0,-2,0);camera.updateProjectionMatrix();controls.update();requestDraw();}
function topView(){camera.position.set(0,180,.1);camera.zoom=1;controls.target.set(0,-2,0);camera.updateProjectionMatrix();controls.update();requestDraw();}
function resize(){
 const width=canvas.clientWidth,height=canvas.clientHeight,aspect=width/height,halfHeight=Math.max(43,64/aspect);
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,compatible?1:1.25));renderer.setSize(width,height,false);
 camera.left=-halfHeight*aspect;camera.right=halfHeight*aspect;camera.top=halfHeight;camera.bottom=-halfHeight;camera.updateProjectionMatrix();requestDraw();
}
window.addEventListener('resize',resize);document.getElementById('overview').addEventListener('click',overview);document.getElementById('top-view').addEventListener('click',topView);
window.addEventListener('keydown',event=>{if(event.code==='KeyR'&&!event.repeat)overview();});
canvas.addEventListener('contextmenu',event=>event.preventDefault());
const touch=matchMedia('(pointer:coarse)').matches;
document.getElementById('camera-hint').textContent=(software?'Compatibility view · ':'')+'Drag to look around · '+(touch?'Pinch':'Scroll')+' to zoom';
window.__letsgoIsland={
 world:data.world,
 get collisionBoxes(){return data.world.collisionBoxes();},
 setBlock(x,y,z,type){
  data.world.set(x,y,z,type);data.faces=prepareFaces(data.world);
  if(software)renderer.setFaces(data.faces);
  else{
   scene.remove(meshes);meshes.traverse(o=>{if(o.isMesh)o.geometry.dispose();});
   meshes.children[0]?.material.dispose();meshes=createTerrain(data);scene.add(meshes);
  }
  requestDraw();
 },
 get stats(){return{blocks:data.world.cells.size,faces:data.faces.length,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,mode:canvas.dataset.graphics};}
};
overview();resize();draw();canvas.dataset.scene='block-island';canvas.dataset.ready='true';
