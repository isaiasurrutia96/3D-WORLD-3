import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createRunner,stepRunner,STEP,JUMP_SPEED,GRAVITY} from '../src/running-controller.js';
import {supportHeight,resolveHorizontal,SPAWN,worldPhysics,createWorld} from '../src/world.js';
import {trackSamples,railSegments} from '../src/track.js';
import {createAvatar} from '../src/avatar.js';
import {createRunningAnimator} from '../src/animation/running.js';

test('slab, access and circuit form a gap-free entry with a guardrail opening',()=>{
 for(let x=120;x<155;x+=.25)assert.equal(supportHeight(x,-150,.4),0);
 let state=Object.assign(createRunner(),SPAWN);
 for(let i=0;i<900;i++)stepRunner(state,{x:1,z:0,sprint:true},STEP,worldPhysics);
 assert.ok(state.x>155&&state.x<166);assert.equal(state.grounded,true);assert.equal(state.y,0);
});
test('overpass and lower road have separate support heights and passable clearance',()=>{
 const p=trackSamples.find(sample=>sample.point.y>8&&sample.point.z>60&&sample.point.z<85).point;
 assert.ok(supportHeight(p.x,p.z,.4)<.1);
 assert.ok(Math.abs(supportHeight(p.x,p.z,9)-p.y)<.02);
 assert.ok(p.y>2.4+JUMP_SPEED*JUMP_SPEED/(2*GRAVITY));
});
test('guardrails block walking at road height but can be cleared above their top',()=>{
 const rail=railSegments.find(({a,b})=>a.y===0&&b.y===0&&a.z< -210&&Math.abs(a.x-b.x)>1);
 const mid=rail.a.clone().add(rail.b).multiplyScalar(.5),delta=rail.b.clone().sub(rail.a).normalize();
 const normal=new THREE.Vector3(-delta.z,0,delta.x);
 const start=mid.clone().addScaledVector(normal,.6),target=mid.clone().addScaledVector(normal,.1);
 const blocked=resolveHorizontal(start.x,start.z,target.x,target.z,0);
 assert.ok(Math.hypot(blocked.x-target.x,blocked.z-target.z)>.3);
 const airborne=resolveHorizontal(start.x,start.z,target.x,target.z,1.3);
 assert.ok(Math.hypot(airborne.x-target.x,airborne.z-target.z)<1e-8);
});
test('full circuit traversal follows ramps and crosses both levels without falling',()=>{
 const first=trackSamples[0].point,state=Object.assign(createRunner(),{x:first.x,z:first.z});
 let index=1,peak=0;
 for(let i=0;i<110000&&index<trackSamples.length;i++){
  const p=trackSamples[index].point,dx=p.x-state.x,dz=p.z-state.z;
  if(Math.hypot(dx,dz)<1){index++;continue;}
  stepRunner(state,{x:dx,z:dz,sprint:true},STEP,worldPhysics);peak=Math.max(peak,state.y);
  assert.ok(state.y> -1);assert.equal(state.grounded,true);
 }
 assert.equal(index,trackSamples.length);assert.ok(peak>8);
});
test('one jump per press, gravity/apex, elevated landing and falling off unsupported space',()=>{
 const state=createRunner();let peak=0;
 for(let i=0;i<160;i++){stepRunner(state,{x:0,z:0,jump:true},STEP);peak=Math.max(peak,state.y);}
 assert.equal(state.jumpCount,1);assert.equal(state.grounded,true);assert.equal(state.y,0);
 assert.ok(peak>1.3&&peak<1.5);
 stepRunner(state,{x:0,z:0,jump:false},STEP);stepRunner(state,{x:0,z:0,jump:true},STEP);assert.equal(state.jumpCount,2);
 const p=trackSamples.find(sample=>sample.point.y>8&&sample.point.z>60&&sample.point.z<85).point;
 const elevated=Object.assign(createRunner(),{x:p.x,z:p.z,y:p.y});
 for(let i=0;i<150;i++)stepRunner(elevated,{x:0,z:0,jump:i<100},STEP,worldPhysics);
 assert.equal(elevated.grounded,true);assert.ok(elevated.y>8);
 const falling=Object.assign(createRunner(),{x:-150,z:-240});
 for(let i=0;i<100;i++)stepRunner(falling,{x:0,z:0},STEP,worldPhysics);
 assert.equal(falling.grounded,false);assert.ok(falling.y< -5);
});
test('jump poses clear the support plane and return to exact neutral after landing',()=>{
 const avatar=createAvatar(),animator=createRunningAnimator(avatar),state=createRunner();
 const snapshot=()=>avatar.skeleton.bones.map(bone=>[...bone.position.toArray(),...bone.quaternion.toArray()]);
 const neutral=snapshot(),v=new THREE.Vector3();
 for(let frame=0;frame<180;frame++){
  stepRunner(state,{x:0,z:0,jump:frame<80},1/60);avatar.position.y=state.y;animator.update(state,1/60);
  for(let i=0;i<avatar.geometry.attributes.position.count;i++){avatar.getVertexPosition(i,v);assert.ok(v.y>-.00001);}
 }
 assert.deepEqual(snapshot(),neutral);
 const world=createWorld();let hasRailInstances=false;
 world.traverse(object=>{if(object.isInstancedMesh)hasRailInstances=true;if(object.isMesh){const position=object.geometry.attributes.position;for(const value of position.array)assert.ok(Number.isFinite(value));}});
 assert.equal(hasRailInstances,true);
});

test('full entry railing opening has continuous visible and physical bridge support',()=>{
 for(let x=128;x<=145;x+=.25)for(let z=-159;z<=-141;z+=.25)assert.equal(supportHeight(x,z,.4),0,`Entry gap at ${x},${z}`);
 for(const z of [-158.8,-141.2]){
  const state=Object.assign(createRunner(),{x:129,z});
  for(let i=0;i<240;i++){stepRunner(state,{x:1,z:0,sprint:false},STEP,worldPhysics);assert.equal(state.grounded,true);assert.equal(state.y,0);}
 }
});
