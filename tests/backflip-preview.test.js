import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createAvatar} from '../src/avatar.js';
import {createBackflipClip,BACKFLIP_DURATION,TAKEOFF,TOUCHDOWN,referenceTurns} from '../src/preview/backflip-clip.js';

function setup(){const avatar=createAvatar(),mixer=new THREE.AnimationMixer(avatar),clip=createBackflipClip(avatar),action=mixer.clipAction(clip);action.setLoop(THREE.LoopOnce,1);action.clampWhenFinished=true;action.play();return{avatar,mixer,clip,at(time){action.reset().play();mixer.setTime(time);avatar.updateMatrixWorld(true);avatar.skeleton.update();}};}
test('reference retains both backward revolutions rather than shortest-path rotation',()=>{
 assert.equal(referenceTurns.length,33);assert.ok(referenceTurns[0]-referenceTurns.at(-1)>700);assert.ok(referenceTurns[0]-referenceTurns.at(-1)<730);
 for(let i=1;i<referenceTurns.length;i++)assert.ok(Math.abs(referenceTurns[i]-referenceTurns[i-1])<40);
});
test('preview returns to neutral without moving the avatar or modifying its geometry',()=>{
 const avatar=createAvatar(),positions=avatar.geometry.attributes.position.array.slice(),bones=avatar.skeleton.bones.map(b=>[...b.position.toArray(),...b.quaternion.toArray()]);
 const clip=createBackflipClip(avatar);assert.equal(clip.duration,BACKFLIP_DURATION);assert.deepEqual(avatar.geometry.attributes.position.array,positions);
 assert.deepEqual(avatar.skeleton.bones.map(b=>[...b.position.toArray(),...b.quaternion.toArray()]),bones);assert.deepEqual(avatar.position.toArray(),[0,0,0]);
 const preview=setup();preview.at(0);const neutral=preview.avatar.skeleton.bones.map(b=>b.matrixWorld.clone());preview.at(BACKFLIP_DURATION);
 preview.avatar.skeleton.bones.forEach((b,i)=>b.matrixWorld.elements.forEach((v,j)=>assert.ok(Math.abs(v-neutral[i].elements[j])<1e-5)));
});
test('posed geometry clears the floor and takeoff/landing remain continuous',()=>{
 const p=setup(),v=new THREE.Vector3();let previous;
 for(let frame=0;frame<=270;frame++){
  const time=frame/120;p.at(time);let low=Infinity;
  for(let i=0;i<p.avatar.geometry.attributes.position.count;i++){p.avatar.getVertexPosition(i,v);assert.ok(Number.isFinite(v.y));low=Math.min(low,v.y);}
  assert.ok(low>-.0001,`Floor penetration at ${time}: ${low}`);
  if(time<=TAKEOFF||time>=TOUCHDOWN)assert.ok(Math.abs(low)<.001,`Ground contact at ${time}: ${low}`);
  const pelvis=p.avatar.skeleton.getBoneByName('pelvis');if(previous!==undefined)assert.ok(Math.abs(pelvis.position.y-previous)<.09,`Pelvis pop at ${time}`);previous=pelvis.position.y;
 }
});
