import * as THREE from 'three';
import {createKartFrame} from './kart.js';
import {createOnFootAvatar} from './on-foot/avatar.js';
import {createSeatedPose,createVehicleView} from './vehicle-view.js';
import {bakeContactPreview} from './preview/wall-contact.js';
import './wall-contact-preview.css';

const stage=document.querySelector('.preview-stage'),canvas=stage.querySelector('canvas');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setScissorTest(true);
function makeScene(panel){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#10192d');
 scene.add(new THREE.HemisphereLight('#eaf5ff','#7b8494',2));
 const sun=new THREE.DirectionalLight('#fff4dd',2.1);sun.position.set(-6,12,-4);scene.add(sun);
 const floor=new THREE.Mesh(new THREE.BoxGeometry(26,.15,64),new THREE.MeshLambertMaterial({color:'#30353f'}));floor.position.set(-8,-.075,0);scene.add(floor);
 const wallMaterial=new THREE.MeshLambertMaterial({color:'#b5beca'});
 const wall=new THREE.Mesh(new THREE.BoxGeometry(.65,1.55,64),wallMaterial);wall.position.set(.325,.775,0);scene.add(wall);
 const top=new THREE.Mesh(new THREE.BoxGeometry(.74,.1,64),new THREE.MeshLambertMaterial({color:'#d8dee7'}));top.position.set(.325,1.55,0);scene.add(top);
 for(let z=-32;z<32;z+=2){
  const curb=new THREE.Mesh(new THREE.BoxGeometry(.5,.035,2),new THREE.MeshLambertMaterial({color:(z/2)%2?'#e8e8e3':'#c72e35'}));curb.position.set(-.25,.018,z+1);scene.add(curb);
  if(z%4===0){const dash=new THREE.Mesh(new THREE.BoxGeometry(.1,.012,1.8),new THREE.MeshBasicMaterial({color:'#aeb8c5'}));dash.position.set(-7,.009,z);scene.add(dash);}
 }
 const kart=createKartFrame(),avatar=createOnFootAvatar();kart.add(avatar);createSeatedPose(avatar)();scene.add(kart);
 const shadow=new THREE.Mesh(new THREE.CircleGeometry(1.7,24),new THREE.MeshBasicMaterial({color:'#080d18',transparent:true,opacity:.38,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=.012;scene.add(shadow);
 const camera=new THREE.OrthographicCamera(-10,10,8,-8,.1,120);
 return{scene,camera,panel,frames:bakeContactPreview(panel.dataset.case),apply:createVehicleView(kart),shadow,phase:panel.querySelector('.contact-phase')};
}
const views=[...document.querySelectorAll('.preview-panel')].map(makeScene);
const duration=6.8,leadIn=.4,step=1/120,timeline=document.getElementById('timeline'),pause=document.getElementById('play-pause');
let elapsed=0,rate=1,playing=true,previousTime;
function sample(frames,time){
 const frame=Math.max(0,Math.min(frames.length-1,time/step)),index=Math.floor(frame),a=frames[index],b=frames[Math.min(index+1,frames.length-1)],t=frame-index;
 const out={...a};for(const key of ['x','z','yaw','wheelRotation'])out[key]=a[key]+(b[key]-a[key])*t;return out;
}
function render(){
 const bounds=canvas.getBoundingClientRect();renderer.setScissorTest(false);renderer.clear();renderer.setScissorTest(true);
 for(const view of views){
  const box=view.panel.getBoundingClientRect(),x=box.left-bounds.left,y=bounds.bottom-box.bottom;
  renderer.setViewport(x,y,box.width,box.height);renderer.setScissor(x,y,box.width,box.height);
  const state=sample(view.frames,Math.max(0,elapsed-leadIn));view.apply(state);view.shadow.position.set(state.x,.012,state.z);
  view.camera.left=-8*box.width/box.height;view.camera.right=8*box.width/box.height;view.camera.updateProjectionMatrix();
  view.camera.position.set(-15,18,state.z+14);view.camera.lookAt(-4,0,state.z);
  view.phase.value=elapsed<leadIn?'Ready':state.impactAt===null?'Approaching':state.speed<.1?'Stopped':view.panel.dataset.case==='head-on'?'Contact':'Scraping · slowing down';
  renderer.render(view.scene,view.camera);
 }
 timeline.value=elapsed.toFixed(2);document.getElementById('preview-time').value=`${elapsed.toFixed(1)} s`;
}
function tick(now){const dt=previousTime===undefined?0:(now-previousTime)/1000;previousTime=now;elapsed=(elapsed+dt*rate)%duration;render();}
function setPlaying(value){playing=value;previousTime=undefined;pause.textContent=playing?'Pause':'Play';renderer.setAnimationLoop(playing?tick:null);render();}
document.getElementById('replay').addEventListener('click',()=>{elapsed=0;setPlaying(true);});
pause.addEventListener('click',()=>setPlaying(!playing));
document.getElementById('playback-rate').addEventListener('change',event=>{rate=Number(event.target.value);previousTime=undefined;});
timeline.addEventListener('input',()=>{elapsed=Number(timeline.value);setPlaying(false);});
function resize(){renderer.setSize(stage.clientWidth,stage.clientHeight,false);render();}
window.addEventListener('resize',resize);document.addEventListener('visibilitychange',()=>{previousTime=undefined;});resize();setPlaying(true);
