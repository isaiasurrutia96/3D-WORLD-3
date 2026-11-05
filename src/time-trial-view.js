import * as THREE from 'three';
import {createKartFrame} from './kart.js';
import {createAvatar} from './avatar.js';
import {createVehicleView,createSeatedPose} from './vehicle-view.js';
import {GATES,CHECKPOINT_COUNT,sampleGhost,formatTime} from './time-trial.js';
import {TRACK_HALF_WIDTH} from './track.js';

export function createTimeTrialView(scene,state){
 const group=new THREE.Group();group.name='Time trial start and checkpoints';scene.add(group);
 const white=new THREE.MeshLambertMaterial({color:'#f4f2e8'}),dark=new THREE.MeshLambertMaterial({color:'#182235'}),aqua=new THREE.MeshBasicMaterial({color:'#5ee2e7'});
 const gateNodes=[];
 function label(text){const canvas=document.createElement('canvas');canvas.width=256;canvas.height=64;const ctx=canvas.getContext('2d');ctx.fillStyle='#162237';ctx.fillRect(0,0,256,64);ctx.fillStyle='#eaf9ff';ctx.font='bold 33px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,128,34);const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshBasicMaterial({map,side:THREE.DoubleSide});}
 for(const gate of GATES){
  const node=new THREE.Group();node.position.set(gate.x,gate.y,gate.z);node.rotation.y=Math.atan2(gate.fx,gate.fz);group.add(node);
  if(gate.index===0){
   const positions=[],colors=[];
   for(let i=0;i<26;i++)for(let row=0;row<3;row++){
    const x=i-13,z=row-1.5,points=[[x,.025,z],[x+1,.025,z],[x+1,.025,z+1],[x,.025,z+1]],color=(i+row)%2?white.color:dark.color;
    for(const index of [0,2,1,0,3,2]){positions.push(...points[index]);colors.push(color.r,color.g,color.b);}
   }
   const paint=new THREE.BufferGeometry();paint.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));paint.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
   node.add(new THREE.Mesh(paint,new THREE.MeshBasicMaterial({vertexColors:true})));
   for(const side of [-1,1]){const post=new THREE.Mesh(new THREE.BoxGeometry(.22,7.1,.22),white);post.position.set(side*(TRACK_HALF_WIDTH+1.8),3.55,0);node.add(post);}
   const banner=new THREE.Mesh(new THREE.BoxGeometry(30,.7,.16),dark);banner.position.y=7.4;node.add(banner);
   const sign=new THREE.Mesh(new THREE.PlaneGeometry(7,.8),label('START / FINISH'));sign.position.set(0,7.42,-.10);sign.rotation.y=Math.PI;node.add(sign);
  }else{
   const highlights=[];
   for(const side of [-1,1]){
    const marker=new THREE.Mesh(new THREE.BoxGeometry(.25,3.2,.25),aqua);marker.position.set(side*(TRACK_HALF_WIDTH+1.4),1.6,0);node.add(marker);highlights.push(marker);
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(2.6,.7),label(`GATE ${gate.index}`));sign.position.set(side*(TRACK_HALF_WIDTH+1.4),3.4,0);sign.rotation.y=Math.PI;node.add(sign);
   }
   const ribbon=new THREE.Mesh(new THREE.PlaneGeometry(TRACK_HALF_WIDTH*2,.24),new THREE.MeshBasicMaterial({color:'#67e9e9',transparent:true,opacity:.33,depthWrite:false,side:THREE.DoubleSide}));ribbon.rotation.x=-Math.PI/2;ribbon.position.y=.03;node.add(ribbon);highlights.push(ribbon);
   const arrow=new THREE.Mesh(new THREE.ConeGeometry(.75,2.1,3),aqua);arrow.rotation.x=Math.PI/2;arrow.position.set(0,.045,2.3);arrow.scale.z=.04;node.add(arrow);highlights.push(arrow);
   gateNodes.push({node,highlights,index:gate.index});
  }
 }
 const ghost=createKartFrame();ghost.name='Best lap ghost';const driver=createAvatar();ghost.add(driver);createSeatedPose(driver)();
 const ghostMaterial=new THREE.MeshBasicMaterial({color:'#8deafa',transparent:true,opacity:.28,depthWrite:false});
 ghost.traverse(node=>{if(node.isMesh){node.material=ghostMaterial;node.castShadow=false;node.receiveShadow=false;}});scene.add(ghost);ghost.visible=false;
 const applyGhost=createVehicleView(ghost),timer=document.getElementById('trial-time'),best=document.getElementById('trial-best'),lap=document.getElementById('trial-lap'),status=document.getElementById('trial-status'),last=document.getElementById('trial-last'),button=document.getElementById('trial-start'),toggle=document.getElementById('trial-ghost');
 let message='';
 return function update(alpha,step){
  const active=state.status==='ready'||state.status==='running';
  for(const gate of gateNodes){const expected=state.passed<CHECKPOINT_COUNT?state.passed+1:0;gate.node.visible=active&&gate.index===expected;for(const part of gate.highlights)part.visible=gate.index===expected;}
  const time=state.status==='running'?Math.max(0,state.elapsed-(1-alpha)*step):0;
  const pose=active&&state.showGhost?sampleGhost(state.ghostBest,time):null;ghost.visible=!!pose;if(pose)applyGhost(pose);
  timer.value=formatTime(state.elapsed);best.value=formatTime(state.best?.duration);lap.textContent=`Lap ${state.completed+1}`;
  last.textContent=state.lastLap==null?'':`${state.lastWasBest?'New best':'Last lap'} ${formatTime(state.lastLap)}`;
  button.textContent=state.status==='idle'?'Start in kart · T':'Restart lap · T';toggle.disabled=!state.best;toggle.checked=state.showGhost;
  const text=state.status==='ready'?'Press E to start the clock':state.status==='running'?`Checkpoints ${state.passed}/${CHECKPOINT_COUNT}${state.passed===CHECKPOINT_COUNT?' · Cross the finish line':''}`:state.status==='invalid'?state.reason:'Complete a lap to record your ghost';
  if(text!==message){status.textContent=text;message=text;}
 };
}
