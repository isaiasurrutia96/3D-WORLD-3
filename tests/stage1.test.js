import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fixture from './fixtures/claude-ground-b60e295.json' with {type:'json'};
import {createOnFootAvatar} from '../src/on-foot/avatar.js';
import {createOnFootState,stepOnFoot,STEP} from '../src/on-foot/controller.js';
import {updateGroundVelocity,RUN_SPEED,WALK_SPEED} from '../src/on-foot/ground-movement.js';
import {animateCharacter,resetCharacterAnimation} from '../src/claude/player/PlayerAnimation.ts';
import {createOnFootAnimator} from '../src/on-foot/animation.js';
import {createSeatedPose} from '../src/vehicle-view.js';
import {worldPhysics,SPAWN} from '../src/world.js';
const flat={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz)=>({x:nx,z:nz})};
const pose=rig=>Object.fromEntries(Object.keys(fixture.poses[0].pose).map(name=>[name,[...rig[name].position.toArray(),...rig[name].quaternion.toArray(),...rig[name].scale.toArray()]]));
function close(a,b,message){assert.ok(Math.abs(a-b)<1e-9,`${message}: ${a} vs ${b}`);}

test('visible avatar uses the actual Claude rig, plain form and source proportions',()=>{
 const avatar=createOnFootAvatar();assert.ok(avatar.isGroup);const rig=avatar.userData.characterRig;assert.equal(rig.root,avatar);assert.ok(rig.shoulderLeft&&rig.ankleRight);
 const box=new THREE.Box3().setFromObject(avatar,true);assert.ok(box.max.y>1.82&&box.max.y<1.83);assert.ok(box.min.y>=0);assert.equal(rig.materials.length,1);assert.equal(rig.materials[0].color.getHexString(),'b9b2a6');
});
test('native gait matches pose snapshots generated from the original b60e295 animation',()=>{
 const rig=createOnFootAvatar().userData.characterRig,other=createOnFootAvatar().userData.characterRig;
 for(const sample of fixture.poses){for(let i=0;i<sample.ticks;i++){animateCharacter(rig,sample.input);animateCharacter(other,{...fixture.poses[0].input,speed:4.7});}const actual=pose(rig);for(const [name,values]of Object.entries(sample.pose))values.forEach((v,i)=>close(actual[name][i],v,name));}
});
test('ground motor matches original acceleration, turning, reversal and stopping snapshots',()=>{
 const state=createOnFootState();
 for(const sample of fixture.motor){for(let i=0;i<sample.ticks;i++)updateGroundVelocity(state,{x:sample.x,z:sample.z,sprint:sample.run},STEP);close(state.velocityX,sample.velocity[0],'vx');close(state.velocityZ,sample.velocity[2],'vz');close(state.yaw,sample.yaw,'yaw');close(state.momentum,sample.momentum,'momentum');assert.equal(state.skidding,sample.skidding);assert.equal(state.braking,sample.braking);}
});
test('run and Shift-walk retain source speeds with normalized diagonal input',()=>{
 for(const sprint of [false,true]){const a=createOnFootState(),b=createOnFootState();for(let i=0;i<240;i++){stepOnFoot(a,{x:0,z:1,sprint},STEP,flat);stepOnFoot(b,{x:1,z:1,sprint},STEP,flat);}close(a.speed,sprint?RUN_SPEED:WALK_SPEED,'speed');close(b.speed,a.speed,'diagonal speed');assert.equal(a.grounded,true);}
});
test('animation state is per rig and mounting/exiting restores a still native pose',()=>{
 const a=createOnFootAvatar(),b=createOnFootAvatar(),animation=createOnFootAnimator(a);const initial=pose(a.userData.characterRig);
 for(let i=0;i<90;i++)animation.update({...createOnFootState(),speed:RUN_SPEED,sprinting:true},1/60);
 const before=pose(a.userData.characterRig);animateCharacter(b.userData.characterRig,{...fixture.poses[0].input,speed:0});assert.deepEqual(pose(a.userData.characterRig),before);
 createSeatedPose(a)();assert.ok(a.userData.characterRig.hipLeft.rotation.x< -1);a.position.set(0,0,0);animation.reset();assert.deepEqual(pose(a.userData.characterRig),initial);
 for(let i=0;i<60;i++)animation.update(createOnFootState(),1/60);assert.deepEqual(pose(a.userData.characterRig),initial);resetCharacterAnimation(b.userData.characterRig);
});
test('pre-existing single jump and backflip remain available without enabling advanced Claude actions',()=>{
 const avatar=createOnFootAvatar(),animation=createOnFootAnimator(avatar),state=createOnFootState();let airborne=false;
 for(let i=0;i<230;i++){stepOnFoot(state,{x:0,z:0,jump:true},STEP,flat);avatar.position.set(state.x,state.y,state.z);animation.update(state,STEP);airborne ||= !state.grounded;}
 assert.ok(airborne);assert.equal(state.jumpCount,1);assert.equal(state.grounded,true);
 stepOnFoot(state,{x:0,z:0,jump:false},STEP,flat);stepOnFoot(state,{x:0,z:0,jump:true,backflip:true},STEP,flat);assert.equal(state.mode,'backflip');
 for(let i=0;i<240;i++){stepOnFoot(state,{x:0,z:0},STEP,flat);avatar.position.set(state.x,state.y,state.z);animation.update(state,STEP);}
 assert.equal(state.grounded,true);assert.equal(state.mode,'idle');assert.equal(state.jumpCount,2);
 for(const part of Object.values(pose(avatar.userData.characterRig)))for(const value of part)assert.ok(Number.isFinite(value));
});
test('the imported ground controller can enter the existing circuit without falling through the join',()=>{
 const state={...createOnFootState(),...SPAWN};for(let i=0;i<900;i++)stepOnFoot(state,{x:1,z:0,sprint:true},STEP,worldPhysics);assert.ok(state.x>155&&state.x<166);assert.equal(state.grounded,true);assert.equal(state.y,0);
});

test('native locomotion traverses both levels of the existing circuit',async()=>{
 const {trackSamples}=await import('../src/track.js');const p=trackSamples[0].point,q=trackSamples[1].point,state={...createOnFootState(),x:p.x,z:p.z,y:p.y,yaw:Math.atan2(q.x-p.x,q.z-p.z)};let index=1,peak=0;
 for(let i=0;i<100000&&index<trackSamples.length;i++){
  const target=trackSamples[index].point,dx=target.x-state.x,dz=target.z-state.z;if(Math.hypot(dx,dz)<1){index++;continue;}
  stepOnFoot(state,{x:dx,z:dz,sprint:true},STEP,worldPhysics);peak=Math.max(peak,state.y);assert.equal(state.grounded,true);assert.ok(state.y> -1);
 }
 assert.equal(index,trackSamples.length);assert.ok(peak>8);
});
