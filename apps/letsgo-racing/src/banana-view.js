import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

export function createBananaModel(){
 const group=new THREE.Group();group.name='Banana peel';
 const yellow=new THREE.MeshLambertMaterial({color:'#ffdc35',side:THREE.DoubleSide}),brown=new THREE.MeshLambertMaterial({color:'#725025'});
 const positions=[],indices=[];
 for(let i=0;i<=10;i++){
  const t=i/10,r=.06+.75*t,y=.5*(1-t)*(1-t)+.035,width=.22*Math.sqrt(Math.sin(Math.PI*t));
  positions.push(r,y,-width,r,y,width);
  if(i<10){const a=i*2;indices.push(a,a+1,a+2,a+1,a+3,a+2);}
 }
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();
 const parts=Array.from({length:3},(_,i)=>geometry.clone().rotateY(i*Math.PI*2/3));
 parts.push(new THREE.CylinderGeometry(.065,.10,.28,6).translate(0,.59,0));
 for(const part of parts)part.deleteAttribute('uv');
 group.add(new THREE.Mesh(mergeGeometries(parts),yellow));
 for(const part of parts)part.dispose();geometry.dispose();
 const tip=new THREE.Mesh(new THREE.CylinderGeometry(.07,.065,.045,6),brown);tip.position.y=.75;group.add(tip);
 return group;
}
