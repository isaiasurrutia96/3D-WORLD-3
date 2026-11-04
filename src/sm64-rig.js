import * as THREE from 'three';
import clips from './animation/sm64.json' with {type:'json'};

// Animated-part traversal and offsets from actors/mario/geo.inc.c.
// All offsets remain in the original model coordinates, with one uniform scale.
export const BONES=[
  ['root',-1,0,0,0],['pelvis',0,0,0,0],['torso',1,68,0,0],['head',2,87,0,0],
  ['left_shoulder',2,67,-10,79],['left_arm',4,0,0,0],['left_forearm',5,65,0,0],['left_hand',6,60,0,0],
  ['right_shoulder',2,68,-10,-79],['right_arm',8,0,0,0],['right_forearm',9,65,0,0],['right_hand',10,60,0,0],
  ['left_hip',1,13,-8,42],['left_thigh',12,0,0,0],['left_shin',13,89,0,0],['left_foot',14,67,0,0],
  ['right_hip',1,13,-8,-42],['right_thigh',16,0,0,0],['right_shin',17,89,0,0],['right_foot',18,67,0,0],
];
export const MODEL_SCALE=0.0075;
const radians=Math.PI/32768;
export function sampleChannel(clip,index,frame,rotation=false){
  const data=clips[clip],loop=['run','walk','idle'].includes(clip);
  const time=loop?((frame%data.frames)+data.frames)%data.frames:Math.max(0,Math.min(data.frames-1,frame));
  const first=Math.floor(time),next=loop?(first+1)%data.frames:Math.min(data.frames-1,first+1);
  const count=data.indices[index*2],offset=data.indices[index*2+1];
  const a=data.values[offset+Math.min(count-1,first)],b=data.values[offset+Math.min(count-1,next)];
  const difference=rotation?((b-a+32768)%65536+65536)%65536-32768:b-a;
  return (a+difference*(time-first))*(rotation?radians:1);
}
export function createSM64Rig(){
  const root=new THREE.Group();root.name='SM64 skeleton study';
  const model=new THREE.Group();model.scale.setScalar(MODEL_SCALE);root.add(model);
  const joints=BONES.map(([name,parent,x,y,z],index)=>{
    const joint=new THREE.Group();joint.name=name;joint.position.set(x,y,z);
    (parent<0?model:model.userData.joints[parent]).add(joint);
    (model.userData.joints??=[])[index]=joint;return joint;
  });
  const gray=new THREE.MeshLambertMaterial({color:'#929aa4'});
  const meshes=[];
  function ball(bone,position,scale){
    const mesh=new THREE.Mesh(new THREE.SphereGeometry(1,16,12),gray);
    mesh.position.set(...position);mesh.scale.set(...scale);joints[bone].add(mesh);meshes.push(mesh);return mesh;
  }
  function limb(bone,length,radius){
    const mesh=new THREE.Mesh(new THREE.CapsuleGeometry(radius,Math.max(1,length-2*radius),4,12),gray);
    mesh.rotation.z=-Math.PI/2;mesh.position.x=length/2;joints[bone].add(mesh);meshes.push(mesh);
  }
  ball(1,[4,0,0],[61,53,66]);
  const chestProfile=[ [0,-40],[55,-38],[72,-15],[82,25],[85,60],[63,78],[0,84] ];
  const chestGeometry=new THREE.LatheGeometry(chestProfile.map(([r,x])=>new THREE.Vector2(r,x)),16);
  chestGeometry.rotateZ(-Math.PI/2);
  const chest=new THREE.Mesh(chestGeometry,gray);chest.scale.y=0.72;joints[2].add(chest);meshes.push(chest);
  ball(3,[65,3,0],[71,64,65]);
  for(const [arm,forearm,hand,thigh,shin,foot] of [[5,6,7,13,14,15],[9,10,11,17,18,19]]){
    ball(arm,[0,0,0],[24,24,24]);limb(arm,65,22);ball(forearm,[0,0,0],[20,20,20]);limb(forearm,60,20);ball(hand,[13,0,0],[30,28,29]);
    ball(thigh,[0,0,0],[31,31,31]);limb(thigh,89,31);ball(shin,[0,0,0],[25,25,25]);limb(shin,67,25);ball(foot,[35,20,0],[75,30,38]);
  }
  function pose(clip,frame){
    joints[0].position.set(sampleChannel(clip,0,frame),sampleChannel(clip,1,frame),sampleChannel(clip,2,frame));
    joints.forEach((joint,bone)=>joint.rotation.set(
      sampleChannel(clip,3+bone*3,frame,true),sampleChannel(clip,4+bone*3,frame,true),sampleChannel(clip,5+bone*3,frame,true),'ZYX'));
  }
  // One constant ground alignment. No per-joint limits, retargeting, altered
  // proportions, or procedural arm/leg curves are applied to the source poses.
  let ground=Infinity;
  for(const clip of ['idle','walk','run'])for(let frame=0;frame<clips[clip].frames;frame++){
    pose(clip,frame);root.updateMatrixWorld(true);
    for(const bone of [15,19]){
      const foot=joints[bone].children[0],e=foot.matrixWorld.elements;
      ground=Math.min(ground,e[13]-Math.hypot(e[1],e[5],e[9]));
    }
  }
  model.position.y=-ground;
  pose('idle',0);
  return {root,joints,pose};
}
