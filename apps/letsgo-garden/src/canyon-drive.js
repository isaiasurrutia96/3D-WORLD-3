import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {createCanyonState,stepCanyonKart} from './canyon-physics.js';

export function createCanyonDrive({route,scene,camera,software,onRender,onExit}){
 const group=new THREE.Group();group.name='Canyon kart — independent driving';scene.add(group);
 const body=new THREE.Group();group.add(body);
 const paints={red:'#e75d40',dark:'#343c44',black:'#242831',silver:'#d1d9d5',seat:'#684c39',lamp:'#fff1ba'};
 const mat=Object.fromEntries(Object.entries(paints).map(([key,color])=>[key,new THREE.MeshStandardMaterial({color,roughness:.68})]));
 function box(parent,x,y,z,sx,sy,sz,type,r=.08){const geometry=software?new THREE.BoxGeometry(sx,sy,sz):new RoundedBoxGeometry(sx,sy,sz,2,r);const mesh=new THREE.Mesh(geometry,mat[type]);mesh.position.set(x,y,z);mesh.castShadow=true;parent.add(mesh);return mesh;}
 box(body,0,.4,0,1.3,.24,2.15,'dark');box(body,0,.65,.65,1.25,.34,.9,'red');box(body,0,.57,-.88,1.3,.38,.5,'red');
 box(body,0,.61,-.25,.72,.18,.66,'seat');box(body,0,.91,-.58,.72,.65,.18,'seat');
 box(body,0,.35,1.15,1.7,.16,.16,'silver',.04);box(body,0,.35,-1.15,1.7,.16,.16,'silver',.04);
 box(body,0,.7,.05,.13,.36,.13,'silver',.035);
 const steering=new THREE.Mesh(new THREE.TorusGeometry(.23,.035,5,16),mat.dark);steering.position.set(0,.97,.15);steering.rotation.x=-.7;body.add(steering);
 const wheels=[],front=[];
 for(const x of [-.88,.88])for(const z of [-.77,.77]){
  const pivot=new THREE.Group();pivot.position.set(x,.34,z);body.add(pivot);if(z>0)front.push(pivot);
  const spin=new THREE.Group();pivot.add(spin);wheels.push(spin);
  const tire=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.3,software?8:14),mat.black);tire.rotation.z=Math.PI/2;tire.castShadow=true;spin.add(tire);
  const hub=new THREE.Mesh(new THREE.CylinderGeometry(.17,.17,.315,8),mat.silver);hub.rotation.z=Math.PI/2;spin.add(hub);
 }
 let state=createCanyonState(route),playing=false,frame=0,last=0;
 const keys=new Set(),touches=new Map(),capture=new Map(),ui=document.querySelector('#drive-ui'),touchUI=document.querySelector('#drive-controls');
 const known=new Set(['KeyE','KeyD','KeyS','KeyF','ArrowUp','ArrowDown','ArrowLeft','ArrowRight']);
 function input(){const held=key=>keys.has(key),touch=name=>[...touches.values()].includes(name);return {throttle:held('KeyD')||held('ArrowDown')||touch('brake')?-1:held('KeyE')||held('ArrowUp')||touch('gas')?1:0,steer:Number(held('KeyF')||held('ArrowRight')||touch('right'))-Number(held('KeyS')||held('ArrowLeft')||touch('left'))};}
 function release(){keys.clear();touches.clear();for(const[id,button]of capture){if(button.hasPointerCapture(id))button.releasePointerCapture(id);}capture.clear();for(const b of touchUI.querySelectorAll('button'))b.classList.remove('pressed');}
 window.addEventListener('keydown',event=>{if(!playing||!known.has(event.code))return;event.preventDefault();keys.add(event.code);});
 window.addEventListener('keyup',event=>keys.delete(event.code));
 for(const button of touchUI.querySelectorAll('[data-drive]')){
  button.addEventListener('pointerdown',event=>{if(!playing)return;event.preventDefault();touches.set(event.pointerId,button.dataset.drive);capture.set(event.pointerId,button);button.setPointerCapture(event.pointerId);button.classList.add('pressed');});
  const up=event=>{touches.delete(event.pointerId);capture.delete(event.pointerId);button.classList.toggle('pressed',[...touches.values()].includes(button.dataset.drive));};
  for(const type of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(type,up);
  button.addEventListener('contextmenu',event=>event.preventDefault());
 }
 for(const type of ['blur','pagehide','resize'])window.addEventListener(type,release);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)release();});
 const target=new THREE.Vector3(),desired=new THREE.Vector3();
 function syncCamera(dt=1){
  const sx=Math.sin(state.yaw),cz=Math.cos(state.yaw);
  desired.set(state.x-sx*10,state.y+5.8,state.z-cz*10);camera.position.lerp(desired,1-Math.exp(-7*dt));
  target.set(state.x+sx*7,state.y+.6,state.z+cz*7);camera.lookAt(target);
  camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();
 }
 function syncModel(){group.position.set(state.x,state.y+.03,state.z);group.rotation.y=state.yaw;body.rotation.x=state.pitch;for(const w of wheels)w.rotation.x=state.wheel;for(const p of front)p.rotation.y=state.steering;steering.rotation.z=-state.steering*2;}
 function time(seconds){const minutes=Math.floor(seconds/60),s=(seconds%60).toFixed(2).padStart(5,'0');return `${minutes}:${s}`;}
 function syncUI(){document.querySelector('#drive-speed').textContent=Math.round(Math.abs(state.speed)/.44704);document.querySelector('#drive-time').textContent=time(state.elapsed);document.querySelector('#drive-lap').textContent=`Lap ${state.lap}`;document.querySelector('#drive-last').textContent=state.lastLap===null?(state.started?'Follow the full loop':'Move forward to start your lap'):`Last lap ${time(state.lastLap)}`;}
 function animate(now){frame=0;if(!playing)return;let remaining=last?Math.min(.05,(now-last)/1000):1/60;last=now;while(remaining>0){const dt=Math.min(1/120,remaining);stepCanyonKart(state,input(),dt,route);remaining-=dt;}syncModel();syncCamera(1/60);syncUI();onRender();frame=requestAnimationFrame(animate);}
 function reset(){release();state=createCanyonState(route);syncModel();syncUI();if(playing)syncCamera();onRender();}
 function setDriving(value){playing=value;ui.hidden=!value;touchUI.hidden=!value||navigator.maxTouchPoints===0;document.body.classList.toggle('canyon-driving',value);release();if(frame)cancelAnimationFrame(frame);frame=0;last=0;if(value){syncCamera();frame=requestAnimationFrame(animate);}syncUI();}
 document.querySelector('#drive-reset').onclick=reset;document.querySelector('#drive-exit').onclick=()=>{setDriving(false);onExit();};
 syncModel();syncUI();
 return {group,camera,reset,setDriving,syncCamera,release,isDriving:()=>playing,getState:()=>({...state,input:input()}),step:(input,dt)=>{stepCanyonKart(state,input,dt,route);syncModel();syncUI();},place:(progress)=>{const p=route.samples[Math.floor(progress*route.count)%route.count];state.x=p.x;state.y=p.y;state.z=p.z;state.yaw=Math.atan2(p.tx,p.tz);state.speed=0;state.lateral=0;state.progress=progress;syncModel();},frontWheels:front};
}
