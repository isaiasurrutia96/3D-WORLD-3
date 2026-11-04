import * as THREE from 'three';
import {createAvatar} from '../avatar.js';
import {createBackflipClip,BACKFLIP_DURATION,TAKEOFF,TOUCHDOWN,PHASES} from './backflip-clip.js';
import reference from '../../references/sm64-backflip.json';
import './backflip.css';
const scenes=[];
function view(id,side){
 const canvas=document.getElementById(id),renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene();scene.background=new THREE.Color('#19212e');
 scene.add(new THREE.HemisphereLight('#e6f1ff','#3c4657',2));const light=new THREE.DirectionalLight('#fff2dc',2.5);light.position.set(-3,6,4);scene.add(light);
 const ground=new THREE.Mesh(new THREE.PlaneGeometry(30,30),new THREE.MeshLambertMaterial({color:'#303a49'}));ground.rotation.x=-Math.PI/2;ground.position.y=-.014;scene.add(ground);
 const grid=new THREE.GridHelper(16,32,'#64758b','#414e61');grid.position.y=-.01;scene.add(grid);
 const camera=new THREE.OrthographicCamera(-3,3,4.3,-1,.1,100);camera.position.set(side?-9:0,2.4,side?0:9);camera.lookAt(0,1.9,0);
 function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;renderer.setSize(w,h,false);camera.left=-2.65*w/h;camera.right=2.65*w/h;camera.top=2.65;camera.bottom=-2.65;camera.updateProjectionMatrix();}
 const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
 const result={renderer,scene,camera,canvas};scenes.push(result);return result;
}
const avatars=[];
for(const [id,side]of [['front',false],['side',true]]){
 const stage=view(id,side),avatar=createAvatar();stage.scene.add(avatar);const mixer=new THREE.AnimationMixer(avatar),clip=createBackflipClip(avatar),action=mixer.clipAction(clip);action.setLoop(THREE.LoopOnce,1);action.clampWhenFinished=true;action.play();avatars.push({avatar,mixer,action});
}
const source=view('reference',true);
// Hierarchy and offsets from sm64js/src/actors/mario/geo.inc.js, body branch.
const nodes=[[-1,0,0,0],[0,0,0,0],[1,68,0,0],[2,87,0,0],[2,67,-10,79],[4,0,0,0],[5,65,0,0],[6,60,0,0],[2,68,-10,-79],[8,0,0,0],[9,65,0,0],[10,60,0,0],[1,13,-8,42],[12,0,0,0],[13,89,0,0],[14,67,0,0],[1,13,-8,-42],[16,0,0,0],[17,89,0,0],[18,67,0,0]];
const root=new THREE.Group();root.scale.setScalar(.0065);source.scene.add(root);
const joints=nodes.map(([parent,x,y,z],i)=>{const joint=new THREE.Group();joint.position.set(x,y,z);if(parent<0)root.add(joint);else source.scene.add(joint);return joint;});
nodes.forEach(([parent],i)=>{if(parent>=0)joints[parent].add(joints[i]);});
const lineGeometry=new THREE.BufferGeometry();lineGeometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array((nodes.length-1)*6),3));const lines=new THREE.LineSegments(lineGeometry,new THREE.LineBasicMaterial({color:'#7cdef2'}));source.scene.add(lines);
const dots=joints.map((_,i)=>{const dot=new THREE.Mesh(new THREE.SphereGeometry(i===3?.16:.045,12,8),new THREE.MeshBasicMaterial({color:i===3?'#c5f4ff':'#7cdef2'}));source.scene.add(dot);return dot;});
const sourceWorld=new THREE.Vector3();
function referencePose(time){
 const u=THREE.MathUtils.clamp((time-TAKEOFF)/(TOUCHDOWN-TAKEOFF),0,1),frame=u*32,lo=Math.floor(frame),hi=Math.min(32,lo+1),f=frame-lo;
 function value(ch,rotation=false){let a=reference.frames[lo][ch],b=reference.frames[hi][ch];if(rotation){while(b-a>32768)b-=65536;while(b-a< -32768)b+=65536;}return THREE.MathUtils.lerp(a,b,f);}
 joints.forEach((joint,i)=>joint.rotation.set(value(3+i*3,true)*Math.PI/32768,value(4+i*3,true)*Math.PI/32768,value(5+i*3,true)*Math.PI/32768,'ZXY'));
 joints[0].position.set(value(0),value(1),value(2));root.position.y=(time>TAKEOFF&&time<TOUCHDOWN)?4*1.9*u*(1-u):0;root.updateMatrixWorld(true);
 const attr=lineGeometry.attributes.position;let slot=0;
 joints.forEach((joint,i)=>{joint.getWorldPosition(sourceWorld);dots[i].position.copy(sourceWorld);const parent=nodes[i][0];if(parent>=0){const p=new THREE.Vector3();joints[parent].getWorldPosition(p);attr.setXYZ(slot++,p.x,p.y,p.z);attr.setXYZ(slot++,sourceWorld.x,sourceWorld.y,sourceWorld.z);}});attr.needsUpdate=true;lineGeometry.computeBoundingSphere();
 document.getElementById('reference-frame').value=`Source frame ${frame.toFixed(1)} / 32${time<TAKEOFF||time>TOUCHDOWN?' · held outside air phase':''}`;
}
let playing=true,speed=1,time=0,last;
const play=document.getElementById('play'),timeline=document.getElementById('timeline');
play.addEventListener('click',()=>{playing=!playing;play.textContent=playing?'Pause':'Play';});
document.getElementById('restart').addEventListener('click',()=>{time=0;playing=true;play.textContent='Pause';});
document.querySelectorAll('[data-speed]').forEach(button=>button.addEventListener('click',()=>{speed=Number(button.dataset.speed);document.querySelectorAll('[data-speed]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));
function seek(t){time=t;playing=false;play.textContent='Play';draw();}
timeline.addEventListener('input',()=>seek(Number(timeline.value)));
const inspectTimes=[0,.26,.36,.91,.66,1.43,1.60,1.85];
for(const [index,phase]of PHASES.entries()){const button=document.createElement('button');button.textContent=phase.label;button.addEventListener('click',()=>seek(inspectTimes[index]));document.getElementById('poses').append(button);}
function draw(){
 for(const {mixer,action}of avatars){action.reset().play();mixer.setTime(time);}
 referencePose(time);timeline.value=String(time);document.getElementById('time').value=`${time.toFixed(2)} s`;
 document.getElementById('phase').value=[...PHASES].reverse().find(p=>time>=p.time)?.label??'Neutral';
 for(const {renderer,scene,camera}of scenes)renderer.render(scene,camera);
}
function frame(now){const dt=last===undefined?0:Math.min((now-last)/1000,.05);last=now;if(playing)time=(time+dt*speed)%BACKFLIP_DURATION;draw();requestAnimationFrame(frame);}requestAnimationFrame(frame);
// Read-only inspection surface for frame capture and review automation.
window.backflipReview={seek,get time(){return time;},get speed(){return speed;},get playing(){return playing;},avatars,scenes};
