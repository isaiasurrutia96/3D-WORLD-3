// Usage: node tools/import-run-study.mjs /path/to/anim_72_73.inc.c
// Reconstruct the reference skeleton offline, then export a small motion study.
import fs from 'node:fs';
import * as THREE from 'three';
const source=fs.readFileSync(process.argv[2],'utf8');
function array(name,signed){
 const body=source.match(new RegExp(`anim_72_73_${name}\\[\\] = \\{([\\s\\S]*?)\\};`))[1];
 return [...body.matchAll(/0x[\da-f]+/gi)].map(([value])=>{const n=Number(value);return signed&&n>=32768?n-65536:n;});
}
const indices=array('indices',false),values=array('values',true);
const parents=[-1,0,1,2,2,4,5,6,2,8,9,10,1,12,13,14,1,16,17,18];
const offsets=[[0,0,0],[0,0,0],[68,0,0],[87,0,0],[67,-10,79],[0,0,0],[65,0,0],[60,0,0],[68,-10,-79],[0,0,0],[65,0,0],[60,0,0],[13,-8,42],[0,0,0],[89,0,0],[67,0,0],[13,-8,-42],[0,0,0],[89,0,0],[67,0,0]];
function channel(index,frame){return values[indices[index*2+1]+Math.min(indices[index*2]-1,frame)];}
const frames=[];
for(let frame=0;frame<72;frame++){
 const rotations=[],positions=[];
 for(let bone=0;bone<20;bone++){
  const angles=[0,1,2].map(axis=>channel(3+bone*3+axis,frame)*Math.PI/32768);
  const q=new THREE.Quaternion().setFromEuler(new THREE.Euler(...angles,'ZYX'));
  const position=new THREE.Vector3(...offsets[bone]);
  if(parents[bone]>=0){position.applyQuaternion(rotations[parents[bone]]).add(positions[parents[bone]]);q.premultiply(rotations[parents[bone]]);}
  else position.set(channel(0,frame),channel(1,frame),channel(2,frame));
  positions.push(position);rotations.push(q);
 }
 const legs=[[17,19],[13,15]].map(([hip,ankle])=>{
  const toe=new THREE.Vector3(1,0,0).applyQuaternion(rotations[ankle]);
  return {forward:(positions[ankle].z-positions[hip].z)/156,height:positions[ankle].y,pitch:-Math.atan2(toe.y,toe.z)};
 });
 const arms=[9,5].map(bone=>{
  const upper=new THREE.Vector3(1,0,0).applyQuaternion(rotations[bone]);
  const lower=new THREE.Vector3(1,0,0).applyQuaternion(rotations[bone+1]);
  return {swing:upper.z,bend:Math.acos(THREE.MathUtils.clamp(upper.dot(lower),-1,1))};
 });
 frames.push({root:channel(1,frame),twist:channel(9,frame)*Math.PI/32768,legs,arms});
}
for(let side=0;side<2;side++){
 const heights=frames.map(frame=>frame.legs[side].height),min=Math.min(...heights),max=Math.max(...heights);
 for(const frame of frames)frame.legs[side].height=(frame.legs[side].height-min)/(max-min);
}
for(const frame of frames)frame.root=(frame.root-189)/46;
fs.writeFileSync('src/animation/run-study.json',JSON.stringify({source:'n64decomp/sm64',revision:'9921382a68bb0c865e5e45eb594d9c64db59b1af',animation:'0x72',contactFrames:[45,9],frames},(_,value)=>typeof value==='number'?+value.toFixed(6):value)+'\n');
