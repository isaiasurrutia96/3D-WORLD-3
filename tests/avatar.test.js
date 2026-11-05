import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createAvatar} from '../src/avatar.js';

test('athletic painted skinned mesh with a symmetric neutral skeleton',()=>{
  const avatar=createAvatar();
  assert.ok(avatar.isSkinnedMesh);
  assert.equal(avatar.material.map,null);assert.equal(avatar.material.vertexColors,true);
  assert.ok(avatar.getObjectByName('Cuban link chain'));assert.ok(avatar.getObjectByName('Black watch strap'));assert.ok(avatar.getObjectByName('New Era fitted crown'));
  const bones=new Map(avatar.skeleton.bones.map(bone=>[bone.name,bone]));
  assert.equal(bones.size,19);
  avatar.updateMatrixWorld(true);
  for(const part of ['upper_arm','forearm','hand','thigh','calf','foot','toe']){
    const a=bones.get(`left_${part}`).getWorldPosition(new THREE.Vector3());
    const b=bones.get(`right_${part}`).getWorldPosition(new THREE.Vector3());
    assert.ok(Math.abs(a.x+b.x)<1e-12);
    assert.ok(Math.abs(a.y-b.y)<1e-12 && Math.abs(a.z-b.z)<1e-12);
  }
  assert.ok(Math.abs(avatar.geometry.boundingBox.min.y)<1e-6);
  assert.ok(avatar.geometry.boundingBox.max.y>3.0 && avatar.geometry.boundingBox.max.y<3.2);
});

test('all vertices have finite geometry, valid indices and normalized skin weights',()=>{
  const avatar=createAvatar(),geometry=avatar.geometry;
  const positions=geometry.attributes.position,weights=geometry.attributes.skinWeight,indices=geometry.attributes.skinIndex;
  for(let i=0;i<positions.count;i++){
    assert.ok([positions.getX(i),positions.getY(i),positions.getZ(i)].every(Number.isFinite));
    let total=0;
    for(let slot=0;slot<4;slot++){
      const weight=weights.array[i*4+slot],index=indices.array[i*4+slot];
      assert.ok(weight>=0 && weight<=1);assert.ok(index<avatar.skeleton.bones.length);total+=weight;
    }
    assert.ok(Math.abs(total-1)<1e-6);
  }
  for(const index of geometry.index.array)assert.ok(index<positions.count);
  // First torso ring: positive-X side normals point out, not into the body.
  assert.ok(geometry.attributes.normal.getX(0)>0);
});

test('bind pose does not distort vertices and repeated reads do not change pose',()=>{
  const avatar=createAvatar();avatar.updateMatrixWorld(true);avatar.skeleton.update();
  const geometry=avatar.geometry.attributes.position;
  const before=avatar.skeleton.bones.map(bone=>bone.matrixWorld.toArray());
  for(let i=0;i<geometry.count;i++){
    const original=new THREE.Vector3().fromBufferAttribute(geometry,i);
    const bound=avatar.getVertexPosition(i,new THREE.Vector3());
    assert.ok(original.distanceTo(bound)<1e-6);
  }
  for(let i=0;i<60;i++){avatar.updateMatrixWorld(true);avatar.skeleton.update();}
  assert.deepEqual(avatar.skeleton.bones.map(bone=>bone.matrixWorld.toArray()),before);
});
