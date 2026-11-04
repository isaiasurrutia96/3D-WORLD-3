import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { readMoveAxes,wantsSprint } from '../src/input.js';
import { createAvatar } from '../src/avatar.js';
import { createRunner, stepRunner, RUN_SPEED,SPRINT_SPEED } from '../src/running-controller.js';
import { createRunningAnimator } from '../src/animation/running.js';
import { createSprintClip,SPRINT_DURATION,SPRINT_STRIDE,sprintArmSwing,SPRINT_CONTACT_END } from '../src/animation/sprint-clip.js';
import { createRunClip, RUN_DURATION, RUN_STRIDE } from '../src/animation/run-clip.js';

function advance(state,seconds,input,dt=1/120) {
  for(let i=0;i<Math.round(seconds/dt);i++)stepRunner(state,input,dt);
}
const pose = avatar => avatar.skeleton.bones.map(bone=>[...bone.position.toArray(),...bone.quaternion.toArray()]);

test('remembered E/D/S/F mapping uses Shift for walking and keeps Space out of directional axes',()=>{
  for(const [code,expected] of [
    ['KeyE',{forward:1,right:0}],['KeyD',{forward:-1,right:0}],
    ['KeyS',{forward:0,right:-1}],['KeyF',{forward:0,right:1}],
  ])assert.deepEqual(readMoveAxes(new Set([code])),expected);
  assert.deepEqual(readMoveAxes(new Set(['KeyE','KeyD','KeyS','KeyF','Space','ShiftLeft'])),{forward:0,right:0});
});
test('fixed-step controller normalizes diagonals, brakes to rest and switches walk/sprint and returns to grounded rest',()=>{
  const forward=createRunner(),diagonal=createRunner();
  advance(forward,1,{x:0,z:1});advance(diagonal,1,{x:1,z:1,walk:true,jump:true});
  assert.equal(forward.speed,RUN_SPEED);assert.ok(Math.abs(diagonal.speed-RUN_SPEED)<1e-10);
  assert.ok(Math.abs(Math.hypot(diagonal.x,diagonal.z)-forward.z)<1e-10);
  assert.equal(forward.mode,'walk');assert.equal(forward.y,0);assert.equal(forward.grounded,true);
  advance(forward,1,{x:0,z:0});assert.equal(forward.mode,'idle');assert.equal(forward.speed,0);
  const position=[forward.x,forward.z];advance(forward,1,{x:0,z:0});assert.deepEqual([forward.x,forward.z],position);
  const low=createRunner(),high=createRunner();advance(low,1,{x:0,z:1},1/60);advance(high,1,{x:0,z:1},1/120);
  assert.ok(Math.abs(low.z-high.z)<.03);
});
test('running is default in all four directions and either Shift key selects walking',()=>{
  assert.equal(wantsSprint(new Set(['ShiftLeft','KeyE'])),false);
  assert.equal(wantsSprint(new Set(['ShiftRight','KeyE'])),false);
  for(const key of ['KeyE','KeyD','KeyS','KeyF']){
    assert.equal(wantsSprint(new Set([key])),true);
    for(const shift of ['ShiftLeft','ShiftRight'])assert.equal(wantsSprint(new Set([shift,key])),false);
  }
  assert.equal(wantsSprint(new Set(['ShiftLeft'])),false);
  assert.equal(wantsSprint(new Set(['ShiftLeft','KeyS','KeyF'])),false);
  assert.equal(wantsSprint(new Set(['ShiftLeft','KeyE','KeyD'])),false);
  const state=createRunner();advance(state,1,{x:0,z:1,sprint:true});
  assert.ok(Math.abs(state.speed-SPRINT_SPEED)<1e-10);assert.equal(state.mode,'sprint');assert.equal(state.sprintStarts,1);
  advance(state,1,{x:0,z:1,sprint:true});assert.equal(state.sprintStarts,1);
  advance(state,1,{x:0,z:1});assert.equal(state.mode,'walk');assert.ok(Math.abs(state.speed-RUN_SPEED)<1e-10);
  advance(state,.2,{x:0,z:1,sprint:true});assert.equal(state.sprintStarts,2);
});
test('authored clip closes its loop and uses opposing arm/leg phases',()=>{
  const avatar=createAvatar(),clip=createRunClip(avatar);
  assert.ok(clip instanceof THREE.AnimationClip);assert.equal(clip.duration,RUN_DURATION);
  for(const track of [...clip.tracks,...createSprintClip(avatar).tracks]){
    const size=track.getValueSize();
    for(let i=0;i<size;i++)assert.ok(Math.abs(track.values[i]-track.values[track.values.length-size+i])<1e-7,track.name);
    for(const value of track.values)assert.ok(Number.isFinite(value));
  }
  const mixer=new THREE.AnimationMixer(avatar),action=mixer.clipAction(clip).play();
  action.time=0;mixer.update(0);
  const left=avatar.skeleton.getBoneByName('left_upper_arm').rotation.x;
  const right=avatar.skeleton.getBoneByName('right_upper_arm').rotation.x;
  assert.ok(left*right<0);
});
test('contact ankles stay anchored while the root travels and recovery clears the floor',()=>{
  const avatar=createAvatar(),animation=createRunningAnimator(avatar),point=new THREE.Vector3();
  let planted=0,maximumLift=0,previous;
  for(let frame=0;frame<240;frame++){
    const phase=frame/240,distance=phase*RUN_STRIDE;
    avatar.position.z=distance;animation.update({speed:RUN_SPEED,distance},1);
    avatar.updateMatrixWorld(true);avatar.skeleton.update();
    const foot=avatar.skeleton.getBoneByName('left_foot').getWorldPosition(new THREE.Vector3());
    if(phase>.03 && phase<.295){
      if(previous)assert.ok(Math.abs(foot.z-previous.z)<.002);
      previous=foot;planted++;
    }
    maximumLift=Math.max(maximumLift,foot.y);
    for(let i=0;i<avatar.geometry.attributes.position.count;i++){
      avatar.getVertexPosition(i,point);assert.ok(point.y>-.00001,`floor at phase ${phase}`);
    }
    const arm=avatar.skeleton.getBoneByName('left_upper_arm');
    assert.ok(Math.abs(arm.rotation.x)<.51);
    assert.ok(Math.abs(arm.rotation.z)<1e-6);
  }
  assert.ok(planted>50);assert.ok(maximumLift>.25);
});
test('start, reversal and stopping keep finite poses and restore exact stillness',()=>{
  const avatar=createAvatar(),animation=createRunningAnimator(avatar),state=createRunner(),neutral=pose(avatar);
  for(let frame=0;frame<180;frame++){
    stepRunner(state,{x:frame<90?0:1,z:frame<90?1:-1},1/60);
    avatar.position.set(state.x,0,state.z);avatar.rotation.y=state.yaw;
    animation.update(state,1/60);
    for(const values of pose(avatar))for(const value of values)assert.ok(Number.isFinite(value));
  }
  for(let frame=0;frame<120;frame++){stepRunner(state,{x:0,z:0},1/60);animation.update(state,1/60);}
  assert.deepEqual(pose(avatar),neutral);
  for(let frame=0;frame<120;frame++)animation.update(state,1/60);
  assert.deepEqual(pose(avatar),neutral);
});

test('sprint has higher recovery and longer stride without curling the back',()=>{
  const avatar=createAvatar(),animation=createRunningAnimator(avatar),state=createRunner(),point=new THREE.Vector3();
  let maximumFoot=0,maximumKnee=0,maximumLean=0;
  for(let frame=0;frame<180;frame++){
    stepRunner(state,{x:0,z:1,sprint:frame<120},1/60);
    avatar.position.z=state.z;animation.update(state,1/60);
    avatar.updateMatrixWorld(true);avatar.skeleton.update();
    maximumFoot=Math.max(maximumFoot,avatar.skeleton.getBoneByName('left_foot').getWorldPosition(new THREE.Vector3()).y);
    maximumKnee=Math.max(maximumKnee,avatar.skeleton.getBoneByName('left_calf').rotation.x);
    maximumLean=Math.max(maximumLean,avatar.skeleton.getBoneByName('spine').rotation.x);
    for(let i=0;i<avatar.geometry.attributes.position.count;i++){
      avatar.getVertexPosition(i,point);assert.ok(point.y>-.00001,`sprint floor at ${frame}`);
    }
  }
  assert.ok(maximumFoot>.45);assert.ok(maximumKnee>1.6);assert.ok(maximumLean<.05);
  assert.equal(state.mode,'walk');
});

test('faster run extends the rear leg while keeping diagonal speed normalized',()=>{
  assert.equal(SPRINT_DURATION,.46);
  assert.equal(SPRINT_SPEED,SPRINT_STRIDE/SPRINT_DURATION);
  const avatar=createAvatar(),animation=createRunningAnimator(avatar);
  animation.update({speed:SPRINT_SPEED,phase:SPRINT_CONTACT_END,distance:0,sprinting:true,sprintStarts:1},1);
  avatar.updateMatrixWorld(true);
  const ankle=avatar.skeleton.getBoneByName('left_foot').getWorldPosition(new THREE.Vector3());
  assert.ok(ankle.z<-.35);assert.ok(avatar.skeleton.getBoneByName('left_calf').rotation.x<.6);
  const straight=createRunner(),diagonal=createRunner();
  advance(straight,1,{x:0,z:1,sprint:true});advance(diagonal,1,{x:1,z:1,sprint:true});
  assert.ok(Math.abs(straight.speed-diagonal.speed)<1e-10);
});

test('sprint balances opposite arm/knee drive with a straight leaning torso and extended push-off',()=>{
  const avatar=createAvatar(),animation=createRunningAnimator(avatar);
  const bones=avatar.skeleton;
  for(const [side,phase] of [['left',SPRINT_CONTACT_END],['right',SPRINT_CONTACT_END+.5]]){
    animation.update({speed:SPRINT_SPEED,phase,distance:0,sprinting:true},1);
    avatar.updateMatrixWorld(true);
    const point=name=>bones.getBoneByName(name).getWorldPosition(new THREE.Vector3());
    const hip=point(`${side}_thigh`),knee=point(`${side}_calf`),ankle=point(`${side}_foot`);
    const bend=knee.clone().sub(hip).angleTo(ankle.clone().sub(knee));
    assert.ok(bend<.20 && bend>.04,`push-off bend ${bend}`);
    const opposite=side==='left'?'right':'left';
    assert.ok(point(`${opposite}_foot`).z-point(`${opposite}_thigh`).z<.39,'recovery reach stays bounded');
    const hand=bones.getBoneByName(`${side}_hand`).localToWorld(new THREE.Vector3(side==='left'?-.01:.01,-.095,.015));
    const head=bones.getBoneByName('head').localToWorld(new THREE.Vector3(0,.15,0));
    assert.ok(hand.y<head.y-.15,'arm range stays below the old exaggerated head-height reach');
    const pelvisAxis=point('spine').sub(point('pelvis')).normalize();
    const chestAxis=point('neck').sub(point('spine')).normalize();
    assert.ok(pelvisAxis.dot(chestAxis)>.9999,'pelvis and chest remain aligned');
    assert.ok(pelvisAxis.z>.18 && pelvisAxis.z<.22,'hips and torso lean forward together');
    assert.ok(Math.abs(bones.getBoneByName('spine').rotation.x)<.0001);
  }
});

test('sprint arms have one smooth forward/backward swing per leg cycle',()=>{
  let minima=0,maxima=0;
  for(let i=0;i<200;i++){
    const phase=i/200,a=sprintArmSwing(phase-.005),b=sprintArmSwing(phase),c=sprintArmSwing(phase+.005);
    if(b<a&&b<c)minima++;
    if(b>a&&b>c)maxima++;
    assert.ok(Math.abs(c-a)<.051,'no rushed arm angle jump');
  }
  assert.equal(minima,1);assert.equal(maxima,1);
  assert.ok(Math.abs(sprintArmSwing(.24)+.95)<1e-10);
  assert.ok(Math.abs(sprintArmSwing(.74)-.65)<1e-10);
});

test('sprint reduces forward reach and recovery knee bend across the complete cycle',()=>{
  const avatar=createAvatar(),animation=createRunningAnimator(avatar),bones=avatar.skeleton;
  let maximumReach=0,maximumBend=0;
  for(let i=0;i<240;i++){
    animation.update({speed:SPRINT_SPEED,phase:i/240,distance:0,sprinting:true},1);
    avatar.updateMatrixWorld(true);
    const p=name=>bones.getBoneByName(name).getWorldPosition(new THREE.Vector3());
    for(const side of ['left','right']){
      const hip=p(`${side}_thigh`),knee=p(`${side}_calf`),ankle=p(`${side}_foot`);
      maximumReach=Math.max(maximumReach,ankle.z-hip.z);
      maximumBend=Math.max(maximumBend,knee.clone().sub(hip).angleTo(ankle.clone().sub(knee)));
    }
  }
  assert.ok(maximumReach<.39);assert.ok(maximumBend<2.3);
});

test('faster default run keeps the planted ankle fixed through the longer stride',()=>{
  const avatar=createAvatar(),animation=createRunningAnimator(avatar);let previous,contacts=0;
  for(let frame=0;frame<480;frame++){
    const phase=frame/480;avatar.position.z=phase*SPRINT_STRIDE;
    animation.update({speed:SPRINT_SPEED,phase,distance:phase*SPRINT_STRIDE,sprinting:true},1);
    avatar.updateMatrixWorld(true);
    const ankle=avatar.skeleton.getBoneByName('left_foot').getWorldPosition(new THREE.Vector3());
    if(phase>.01&&phase<SPRINT_CONTACT_END-.001){if(previous)assert.ok(Math.abs(ankle.z-previous.z)<.001);previous=ankle;contacts++;}
  }
  assert.ok(contacts>30);assert.ok(Math.abs(SPRINT_SPEED-3/.23)<1e-10);assert.equal(SPRINT_DURATION,.46);assert.equal(SPRINT_STRIDE,6);
});
