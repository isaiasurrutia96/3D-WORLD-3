import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {torpedoWarning} from './torpedoes.js';

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
 return kart=>{
  const threat=kart?torpedoWarning(system,kart):null,notice=kart&&system.itemMessage&&system.time<system.itemMessageUntil;
  node.hidden=!threat&&!notice;if(node.hidden)return;
  const kind=threat?(threat.committed?'committed':'incoming'):'notice',text=threat?(threat.committed?'DODGE — LINE LOCKED':'TORPEDO INCOMING'):system.itemMessage,detail=threat?`${threat.arrow} ${Math.ceil(threat.distance)} m`:'';
  node.dataset.kind=kind;if(label.textContent!==text)label.textContent=text;if(distance.textContent!==detail)distance.textContent=detail;
 };
}
