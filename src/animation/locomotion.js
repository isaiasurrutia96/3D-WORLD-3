import * as THREE from 'three';
import clips from './sm64-walk-run.json' with {type:'json'};

const PARENTS=[-1,0,1,2,2,4,5,6,2,8,9,10,1,12,13,14,1,16,17,18];
const radians=Math.PI/32768;
const angleEuler=new THREE.Euler(0,0,0,'ZYX');
function channel(clip,index,frame){
  const count=clip.indices[index*2],start=clip.indices[index*2+1];
  return clip.values[start+Math.min(count-1,frame)];
}
export function sampleClip(name,frame,output=Array.from({length:20},()=>new THREE.Quaternion())){
  const clip=clips[name],time=((frame%clip.frames)+clip.frames)%clip.frames;
  const first=Math.floor(time),second=(first+1)%clip.frames,fraction=time-first;
  for(let bone=0;bone<20;bone++){
    const angles=[0,1,2].map(axis=>{
      const index=3+(bone*3)+axis,a=channel(clip,index,first)*radians,b=channel(clip,index,second)*radians;
      return a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*fraction;
    });
    output[bone].setFromEuler(angleEuler.set(...angles,'ZYX'));
    if(PARENTS[bone]>=0)output[bone].premultiply(output[PARENTS[bone]]);
  }
  const y=channel(clip,1,first)*(1-fraction)+channel(clip,1,second)*fraction;
  return {rotations:output,y};
}

export function createLocomotionAnimator(avatar){
  avatar.updateMatrixWorld(true);
  // The original model's limb axes run along +X; Izzy's run along -Y.
  // Use geometric axis conversion, not an idle-pose subtraction (which would
  // incorrectly straighten the captured elbow/knee bends).
  const basis=values=>new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().set(
    ...values.slice(0,3),0,...values.slice(3,6),0,...values.slice(6,9),0,0,0,0,1));
  const bodyBasis=basis([0,1,0, 0,0,1, 1,0,0]);
  const limbBasis=basis([0,-1,0, 0,0,-1, 1,0,0]);
  const footBasis=basis([0,0,1, 0,-1,0, 1,0,0]);
  // SM64's anatomical left is +X when facing +Z; our joint names use -X.
  const mapping=[['pelvis',1,null],['spine',2,'pelvis'],['neck',3,'spine'],
    ['right_shoulder',5,'spine'],['right_elbow',6,'right_shoulder'],['right_wrist',7,'right_elbow'],
    ['left_shoulder',9,'spine'],['left_elbow',10,'left_shoulder'],['left_wrist',11,'left_elbow'],
    ['right_hip',13,'pelvis'],['right_knee',14,'right_hip'],['right_ankle',15,'right_knee'],
    ['left_hip',17,'pelvis'],['left_knee',18,'left_hip'],['left_ankle',19,'left_knee']];
  const entries=mapping.map(([name,bone,parent])=>{
    const joint=avatar.getObjectByName(name);
    const correction=name==='pelvis'||name==='spine'||name==='neck'?bodyBasis:name.endsWith('ankle')?footBasis:limbBasis;
    return {name,bone,parent,joint,rest:joint.quaternion.clone(),correction};
  });
  const desired=new Map(entries.map(entry=>[entry.name,new THREE.Quaternion()]));
  const output=Array.from({length:20},()=>new THREE.Quaternion());
  const target=new THREE.Quaternion(),parentInverse=new THREE.Quaternion();
  const pelvis=avatar.getObjectByName('pelvis'),baseHeight=pelvis.position.y;
  const feet=['left_foot_mesh','right_foot_mesh'].map(name=>avatar.getObjectByName(name));
  let weight=0;
  return function animate(state,dt,frame=state.frame){
    const pose=sampleClip(state.clip,frame,output);
    weight=THREE.MathUtils.damp(weight,state.speed>0.1?1:0,20,dt);
    for(const entry of entries){
      const world=desired.get(entry.name).copy(pose.rotations[entry.bone]).multiply(entry.correction);
      if(entry.parent)target.copy(parentInverse.copy(desired.get(entry.parent)).invert()).multiply(world);
      else target.copy(world);
      entry.joint.quaternion.copy(entry.rest).slerp(target,weight);
    }
    pelvis.position.y=baseHeight+(pose.y-189)*(baseHeight/189)*weight;
    // Preserve the captured poses while preventing retargeted shoes from sinking
    // into the floor. The original and Izzy have different limb proportions.
    avatar.updateMatrixWorld(true);
    let lowest=Infinity;
    for(const foot of feet){
      const e=foot.matrixWorld.elements;
      lowest=Math.min(lowest,e[13]-Math.hypot(e[1],e[5],e[9]));
    }
    if(lowest<0)pelvis.position.y-=lowest;
  };
}
