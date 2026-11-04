import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createAvatar } from '../src/avatar.js';
import { sampleReference, createReferenceRetarget, referenceData as data, TORSO_LEAN } from '../src/animation/reference-run.js';

// Independent transcription of mtxf_rotate_xyz_and_translate from the pinned
// SM64 math_util.c. This checks native rotation order, not the retarget itself.
function nativeMatrix(angles, offset) {
  const [x,y,z]=angles.map(n=>n*Math.PI/32768);
  const sx=Math.sin(x),cx=Math.cos(x),sy=Math.sin(y),cy=Math.cos(y),sz=Math.sin(z),cz=Math.cos(z);
  return new THREE.Matrix4().set(
    cy*cz, sx*sy*cz-cx*sz, cx*sy*cz+sx*sz, offset[0],
    cy*sz, sx*sy*sz+cx*cz, cx*sy*sz-sx*cz, offset[1],
    -sy, sx*cy, cx*cy, offset[2],
    0,0,0,1,
  );
}
test('all 72 source frames reconstruct the native XYZ matrix hierarchy',()=>{
  for(let frame=0;frame<72;frame++){
    const sample=sampleReference(frame),matrices=[];
    for(let i=0;i<20;i++){
      const local=nativeMatrix(data.frames[frame].rotations[i],i?data.offsets[i]:data.frames[frame].translation);
      if(i===2)local.premultiply(new THREE.Matrix4().makeRotationZ(TORSO_LEAN));
      const world=data.parents[i]<0?local:matrices[data.parents[i]].clone().multiply(local);
      matrices.push(world);
      assert.ok(new THREE.Vector3().setFromMatrixPosition(world).distanceTo(sample.positions[i])<1e-9);
      for(const axis of [new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0),new THREE.Vector3(0,0,1)]){
        assert.ok(axis.clone().transformDirection(world).distanceTo(axis.clone().applyQuaternion(sample.rotations[i]))<1e-9);
      }
    }
  }
});
test('retarget preserves 3D limb directions, elbow/knee planes and shoe axes over a full cycle',()=>{
  const avatar=createAvatar(),apply=createReferenceRetarget(avatar);
  const bones=new Map(avatar.skeleton.bones.map(b=>[b.name,b]));
  const segments=[['left_upper_arm','left_forearm',9],['left_forearm','left_hand',10],['right_upper_arm','right_forearm',5],['right_forearm','right_hand',6],['left_thigh','left_calf',17],['left_calf','left_foot',18],['right_thigh','right_calf',13],['right_calf','right_foot',14],['spine','chest',2]];
  for(let frame=0;frame<72;frame+=.5){
    const sample=apply(frame);
    for(const [name,child,index]of segments){
      const actual=bones.get(child).getWorldPosition(new THREE.Vector3()).sub(bones.get(name).getWorldPosition(new THREE.Vector3())).normalize();
      const expected=new THREE.Vector3(1,0,0).applyQuaternion(sample.rotations[index]);
      assert.ok(actual.distanceTo(expected)<1e-9,`${name} at ${frame}`);
    }
    for(const [name,index]of [['left_foot',19],['right_foot',15]]){
      const actual=new THREE.Vector3(0,0,1).applyQuaternion(bones.get(name).getWorldQuaternion(new THREE.Quaternion()));
      assert.ok(actual.distanceTo(new THREE.Vector3(1,0,0).applyQuaternion(sample.rotations[index]))<1e-9);
    }
  }
});
test('preview preserves geometry, authored segment lengths and root location; sampling wraps and has no history',()=>{
  const avatar=createAvatar(),apply=createReferenceRetarget(avatar);
  const geometry=avatar.geometry.attributes.position.array.slice();
  const lengths=avatar.skeleton.bones.map(b=>b.position.length());
  const pose=()=>avatar.skeleton.bones.map(b=>[...b.position.toArray(),...b.quaternion.toArray()]);
  apply(9);const initial=pose();apply(61);apply(9);assert.deepEqual(pose(),initial);
  for(let f=0;f<72;f++){
    apply(f);avatar.skeleton.bones.forEach((b,i)=>{if(i)assert.ok(Math.abs(b.position.length()-lengths[i])<1e-12);});
    assert.deepEqual(avatar.position.toArray(),[0,0,0]);
  }
  assert.deepEqual(avatar.geometry.attributes.position.array,geometry);
  apply(0);const start=pose();apply(72);assert.deepEqual(pose(),start);
});
