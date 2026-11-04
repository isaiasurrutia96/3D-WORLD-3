import * as THREE from 'three';
import {createAvatar} from './avatar.js';
import {createWorld} from './world.js';
import {referenceData,CYCLE_SECONDS} from './animation/reference-run.js';
import {createComparison,metricLabels,REFERENCE_SCALE} from './animation/run-comparison.js';
import './run-review.css';
const root=document.querySelector('.comparison');
const comparison=createComparison();
const meshes={old:comparison.old,rebuilt:comparison.rebuilt};
const legScale=REFERENCE_SCALE;
document.querySelector('#clearance').textContent=`Fixed avatar clearance offset: ${(comparison.clearance*100).toFixed(1)} cm. This exposes the remaining contact-height mismatch rather than hiding it with a foot solver.`;
const cycle=Array.from({length:72},(_,frame)=>comparison.apply(frame).metrics);
const heights=cycle.flatMap(versions=>versions.flatMap(values=>values[9]));
const low=Math.floor(Math.min(0,...heights)/10)*10,high=Math.ceil(Math.max(...heights)/10)*10;
const chartX=frame=>30+frame/72*310,chartY=value=>110-(value-low)/(high-low)*90;
document.querySelector('#contact-charts').innerHTML=['Reference','Previous','Rebuilt'].map((title,index)=>{
 const paths=[0,1].map(side=>cycle.map((versions,frame)=>`${frame?'L':'M'}${chartX(frame).toFixed(2)},${chartY(versions[index][9][side]).toFixed(2)}`).join(' '));
 return `<figure><figcaption>${title}</figcaption><svg viewBox="0 0 360 135" role="img" aria-label="${title} sole height across 72 frames">
 <path d="M30 ${chartY(0)} H340" stroke="#71819c"/><text x="0" y="${chartY(0)-3}">0 cm</text>
 ${[9,45].map(frame=>`<path d="M${chartX(frame)} 15 V110" stroke="#586781" stroke-dasharray="3 3"/><text x="${chartX(frame)+3}" y="12">${frame}</text>`).join('')}
 ${paths.map((path,side)=>`<path d="${path}" stroke="${side?'#ffd078':'#68e2ed'}" fill="none" stroke-width="2"/>`).join('')}
 <path class="chart-cursor" d="M${chartX(9)} 15 V110" stroke="white"/><text x="30" y="130">Frame 0</text><text x="305" y="130">71</text></svg></figure>`;
}).join('');
const panels=[];
for(const view of ['Front','Side'])for(const type of ['reference','old','rebuilt']){
 const figure=document.createElement('figure');figure.className='panel';
 const names={reference:'SM64 reference skeleton',old:'Previous run',rebuilt:'Rebuilt run'};
 figure.innerHTML=`<figcaption>${names[type]}<span class="view">${view}</span></figcaption><canvas aria-label="${names[type]}, ${view.toLowerCase()} view"></canvas>`;root.append(figure);
 const canvas=figure.querySelector('canvas'),renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));
 const scene=new THREE.Scene();scene.background=new THREE.Color('#10192c');scene.add(new THREE.HemisphereLight('#ffffff','#606e87',2));const light=new THREE.DirectionalLight('#ffffff',2);light.position.set(-3,6,5);scene.add(light);scene.add(createWorld());
 const groundPoints=view==='Front'?[new THREE.Vector3(-5,0,0),new THREE.Vector3(5,0,0)]:[new THREE.Vector3(0,0,-5),new THREE.Vector3(0,0,5)];
 scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(groundPoints),new THREE.LineBasicMaterial({color:'#53627c'})));
 const camera=new THREE.OrthographicCamera(-1.65,1.65,1.475,-1.475,.1,30);
 camera.position.set(view==='Front'?0:-6,1.325,view==='Front'?6:0);camera.lookAt(0,1.325,0);
 let model,helper,reference;
 if(type!=='reference'){
  model=createAvatar();scene.add(model);helper=new THREE.SkeletonHelper(model);helper.visible=false;scene.add(helper);
 }else{
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(new Float32Array(19*6),3));
  const lines=new THREE.LineSegments(geometry,new THREE.LineBasicMaterial({color:'#68e2ed'}));scene.add(lines);
  const joints=Array.from({length:20},()=>{const joint=new THREE.Mesh(new THREE.SphereGeometry(.025,8,6),new THREE.MeshBasicMaterial({color:'#68e2ed'}));scene.add(joint);return joint;});
  const toes=[15,19].map(()=>{const arrow=new THREE.ArrowHelper(new THREE.Vector3(0,0,1),new THREE.Vector3(),.24,'#ffd078',.06,.04);scene.add(arrow);return arrow;});
  reference={lines,joints,toes};
 }
 panels.push({type,view,renderer,scene,camera,canvas,model,helper,reference});
}
function copyPose(from,to){from.skeleton.bones.forEach((b,i)=>{to.skeleton.bones[i].position.copy(b.position);to.skeleton.bones[i].quaternion.copy(b.quaternion);});to.position.copy(from.position);to.updateMatrixWorld(true);}
function dimensions(panel){const w=panel.canvas.clientWidth,h=panel.canvas.clientHeight;panel.renderer.setSize(w,h,false);const half=2.95/2;panel.camera.left=-half*w/h;panel.camera.right=half*w/h;panel.camera.updateProjectionMatrix();}
function draw(frame){
 const {sample,metrics:all}=comparison.apply(frame);
 for(const panel of panels){
  if(panel.model){copyPose(meshes[panel.type],panel.model);panel.helper.visible=document.querySelector('#bones').checked;}
  else{
   const {lines,joints,toes}=panel.reference;const attr=lines.geometry.attributes.position;let cursor=0;
   for(let i=0;i<20;i++){
    const point=sample.positions[i].clone().multiplyScalar(legScale);joints[i].position.copy(point);
    if(i){const parent=sample.positions[referenceData.parents[i]].clone().multiplyScalar(legScale);attr.setXYZ(cursor++,parent.x,parent.y,parent.z);attr.setXYZ(cursor++,point.x,point.y,point.z);}
   }
   attr.needsUpdate=true;lines.geometry.computeBoundingSphere();
   [15,19].forEach((i,k)=>{toes[k].position.copy(sample.positions[i]).multiplyScalar(legScale);toes[k].setDirection(new THREE.Vector3(1,0,0).applyQuaternion(sample.rotations[i]));});
  }
  panel.renderer.render(panel.scene,panel.camera);
 }
 const format=(v,i)=>Array.isArray(v)?v.map(n=>n.toFixed(i===6?2:1)).join(' / '):v.toFixed(i===8?2:1);
 document.querySelector('#metrics').innerHTML=metricLabels.map((label,i)=>`<tr><td>${label}</td>${all.map(values=>`<td>${format(values[i],i)}</td>`).join('')}</tr>`).join('');
 document.querySelector('#frame-label').textContent=`${Math.floor(frame)} / 71`;
 document.querySelector('#frame').value=Math.floor(frame);
 document.querySelector('#event').textContent=[9,45].includes(Math.floor(frame))?'SM64 footstep sound event at this frame.':'Full cycle: frames 0–71. Footstep sound events: 9 and 45.';
 document.querySelectorAll('.chart-cursor').forEach(cursor=>cursor.setAttribute('d',`M${chartX(frame)} 15 V110`));
 document.body.dataset.frame=String(frame);
}
let frame=Number(new URLSearchParams(location.search).get('frame')??9)%72,playing=false,last;
function setPlaying(value){playing=value;document.querySelector('#play').textContent=value?'Pause':'Play cycle';last=undefined;}
document.querySelector('#play').onclick=()=>setPlaying(!playing);
document.querySelector('#frame').oninput=e=>{setPlaying(false);frame=Number(e.target.value);draw(frame);};
for(const [id,delta] of [['previous',-1],['next',1]])document.querySelector(`#${id}`).onclick=()=>{setPlaying(false);frame=(Math.floor(frame)+delta+72)%72;draw(frame);};
document.querySelector('#bones').onchange=()=>draw(frame);
window.addEventListener('resize',()=>{panels.forEach(dimensions);draw(frame);});panels.forEach(dimensions);draw(frame);
function animate(time){if(playing){if(last!==undefined)frame=(frame+Math.min(.05,(time-last)/1000)*72/CYCLE_SECONDS*Number(document.querySelector('#speed').value))%72;draw(frame);}last=time;requestAnimationFrame(animate);}requestAnimationFrame(animate);
