import * as THREE from 'three';
import {shieldActive,shieldOpacity,SHIELD_WARNING_SECONDS} from './shield.js';

export function createShieldView(kart){
 const group=new THREE.Group();group.name='Active shield';group.position.y=.9;group.scale.set(1.75,1.35,2.2);kart.add(group);
 const geometry=new THREE.SphereGeometry(1,16,10),material=new THREE.MeshBasicMaterial({color:'#7deaff',transparent:true,opacity:.14,depthWrite:false});
 const skin=new THREE.Mesh(geometry,material),lines=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:'#b6f4ff',wireframe:true,transparent:true,opacity:.2,depthWrite:false}));group.add(skin,lines);group.visible=false;
 return state=>{
  group.visible=shieldActive(state);if(!group.visible)return;
  const opacity=shieldOpacity(state),color=state.shieldHits===2?'#7deaff':'#ffd56d';
  material.color.set(color);material.opacity=opacity;lines.material.color.set(color);lines.material.opacity=Math.min(.65,opacity*1.3);
  group.scale.set(1.75,1.35,2.2).multiplyScalar(state.shieldFlash>0?1.025:1);
 };
}

export function updateShieldHud(node,state,testing){
 node.hidden=!testing&&!shieldActive(state);
 node.classList.toggle('test-active',testing);node.dataset.warning=String(shieldActive(state)&&state.shieldTime<=SHIELD_WARNING_SECONDS);
 const text=shieldActive(state)?`${state.shieldHits} hit${state.shieldHits===1?'':'s'} · ${state.shieldTime.toFixed(1)}s`:'Shield inactive';
 const output=node.querySelector('[data-shield-status]');if(output.textContent!==text)output.textContent=text;
 node.querySelector('[data-shield-time]').value=state.shieldTime??0;
}
