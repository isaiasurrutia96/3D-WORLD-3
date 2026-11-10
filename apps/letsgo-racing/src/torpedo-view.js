import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {torpedoWarning,TORPEDO_BURST_SECONDS} from './torpedoes.js';

export function createTorpedoModel(){
 const group=new THREE.Group();group.name='Homing torpedo';
 const body=new THREE.Mesh(new THREE.CapsuleGeometry(.28,1.05,4,8),new THREE.MeshLambertMaterial({color:'#ed5836',flatShading:true}));body.rotation.x=Math.PI/2;group.add(body);
 const fins=Array.from({length:4},(_,i)=>new THREE.BoxGeometry(.12,.62,.48).translate(0,.25,-.62).rotateZ(i*Math.PI/2));
 group.add(new THREE.Mesh(mergeGeometries(fins),new THREE.MeshLambertMaterial({color:'#d6e0ec'})));for(const fin of fins)fin.dispose();
 const flame=new THREE.Mesh(new THREE.ConeGeometry(.18,.65,6),new THREE.MeshBasicMaterial({color:'#7ad9ff'}));flame.rotation.x=-Math.PI/2;flame.position.z=-1.1;group.add(flame);
 return group;
}

export function createTorpedoWarning(node,system){
 const label=node.ownerDocument.createElement('strong'),distance=node.ownerDocument.createElement('span');distance.setAttribute('aria-hidden','true');node.append(label,distance);
 return (kart,currentSystem=system)=>{
  const threat=kart?torpedoWarning(currentSystem,kart):null,notice=kart&&currentSystem.itemMessage&&currentSystem.time<currentSystem.itemMessageUntil;
  node.hidden=!threat&&!notice;if(node.hidden)return;
  const kind=threat?(threat.imminent?'imminent':'incoming'):'notice',text=threat?(threat.imminent?'IMPACT IMMINENT':'TORPEDO LOCKED'):currentSystem.itemMessage,detail=threat?`${threat.arrow} ${Math.ceil(threat.distance)} m`:'';
  node.dataset.kind=kind;if(label.textContent!==text)label.textContent=text;if(distance.textContent!==detail)distance.textContent=detail;
 };
}

export function createTorpedoBursts(root,system){
 const geometry=new THREE.SphereGeometry(1,10,6),nodes=new Map();
 return()=>{
  const active=new Set();
  for(const burst of system.torpedoBursts){
   active.add(burst.id);
   if(!nodes.has(burst.id)){const node=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:'#ffb451',transparent:true,depthWrite:false}));node.name='Torpedo explosion';root.add(node);nodes.set(burst.id,node);}
   const node=nodes.get(burst.id),t=burst.age/TORPEDO_BURST_SECONDS;
   node.position.set(burst.x,burst.y,burst.z);node.scale.setScalar(.15+1.2*t);node.material.opacity=.8*(1-t);
  }
  for(const [id,node]of nodes)if(!active.has(id)){root.remove(node);node.material.dispose();nodes.delete(id);}
 };
}
