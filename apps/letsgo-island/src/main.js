import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {createIslandRenderer} from './renderer.js';
import {createTerrain} from './terrain.js';
import {createPlants,createSkyIslets} from './props.js';
import {createGolf} from './golf.js';
import {createSky} from './sky.js';
import './style.css';

let canvas=document.querySelector('canvas');
const scene=new THREE.Scene();
scene.background=new THREE.Color('#9fddf2');scene.fog=new THREE.Fog('#bde9f3',200,460);
let renderer,compatible=false;
try{const startup=createIslandRenderer(canvas);renderer=startup.renderer;canvas=startup.canvas;compatible=startup.compatible;}
catch(error){
 document.getElementById('load-error').hidden=false;
 document.getElementById('camera-hint').hidden=true;
 document.getElementById('overview').disabled=true;document.getElementById('top-view').disabled=true;
 document.getElementById('retry-load').addEventListener('click',()=>location.reload());
 throw error;
}
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.98;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
scene.add(new THREE.HemisphereLight('#effbff','#b3b68a',1.5));
const sun=new THREE.DirectionalLight('#fff4d6',2.5);sun.position.set(-65,110,65);sun.castShadow=true;
const shadowSize=compatible?1024:1536;sun.shadow.mapSize.set(shadowSize,shadowSize);Object.assign(sun.shadow.camera,{left:-85,right:85,top:75,bottom:-75,near:5,far:235});sun.shadow.normalBias=.06;sun.shadow.bias=-.00008;scene.add(sun);scene.add(sun.target);
const stoneFill=new THREE.DirectionalLight('#d8def5',1.15);stoneFill.position.set(45,-35,70);scene.add(stoneFill);
scene.add(createSky());scene.add(createSkyIslets());
const island=new THREE.Group();island.name='Minigame island terrain stage';scene.add(island);
island.add(createTerrain());island.add(createPlants());const golf=createGolf();island.add(golf.group);
// Terrain, trees and lighting are static. Bake their shadows once; camera
// orbit and windmill animation do not need to redraw the whole shadow map.
renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
const camera=new THREE.OrthographicCamera(-90,90,53,-53,.5,1100),controls=new OrbitControls(camera,canvas);
controls.target.set(0,-7,0);controls.enableDamping=true;controls.dampingFactor=.065;controls.enablePan=false;controls.minPolarAngle=.03;controls.maxPolarAngle=Math.PI*.73;controls.minZoom=.55;controls.maxZoom=3.5;controls.rotateSpeed=.65;controls.zoomSpeed=.85;
function render(){renderer.render(scene,camera);}
function overview(){camera.position.set(80,94,160);camera.zoom=1;controls.target.set(0,-7,0);camera.updateProjectionMatrix();controls.update();render();}
function topView(){camera.position.set(0,190,.1);camera.zoom=1;controls.target.set(0,-7,0);camera.updateProjectionMatrix();controls.update();render();}
function resize(){
 const width=canvas.clientWidth,height=canvas.clientHeight,aspect=width/height,halfHeight=Math.max(49,76/aspect);
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,compatible?1:width<700?1.5:1.6));renderer.setSize(width,height,false);
 camera.left=-halfHeight*aspect;camera.right=halfHeight*aspect;camera.top=halfHeight;camera.bottom=-halfHeight;camera.updateProjectionMatrix();render();
}
window.addEventListener('resize',resize);document.getElementById('overview').addEventListener('click',overview);document.getElementById('top-view').addEventListener('click',topView);
window.addEventListener('keydown',event=>{if(event.code==='KeyR'&&!event.repeat)overview();});
canvas.addEventListener('contextmenu',event=>event.preventDefault());
const coarse=matchMedia('(pointer:coarse)').matches;if(coarse)document.getElementById('camera-hint').innerHTML='Drag to look around <span>·</span> Pinch to zoom';
let previousTime,elapsed=0;
function frame(time){if(document.hidden){previousTime=undefined;return;}const dt=previousTime===undefined?0:Math.min(.05,(time-previousTime)/1000);previousTime=time;elapsed+=dt;golf.update(elapsed);controls.update();render();}
document.addEventListener('visibilitychange',()=>{previousTime=undefined;});
overview();resize();canvas.dataset.scene='floating-island';canvas.dataset.ready='true';renderer.setAnimationLoop(frame);
