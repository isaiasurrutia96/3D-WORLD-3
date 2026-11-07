import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createVehicleState,stepVehicle,canEnterVehicle,findExitPosition,resolveParkedKart,VEHICLE_TOP_SPEED,REVERSE_SPEED,NITRO_TOP_SPEED,VEHICLE_ACCELERATION,NITRO_ACCELERATION,STEERING_LOCK} from '../src/vehicle-controller.js';
import {worldPhysics} from '../src/world.js';
import {trackSamples} from '../src/track.js';
import {createAvatar} from '../src/avatar.js';
import {createOnFootAvatar} from '../src/on-foot/avatar.js';
import {createJumpClip} from '../src/animation/jump-clip.js';
import {createSeatedPose,createVehicleView,speedToMph} from '../src/vehicle-view.js';
import {createKartFrame} from '../src/kart.js';
import {createGhostTemplate} from '../src/ghost-kart.js';
const DT=1/120;
const flat={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz)=>({x:nx,z:nz})};
test('MPH readout converts metres per second and shows reverse speed as a magnitude',()=>{
 for(const [speed,mph]of [[0,0],[25,56],[VEHICLE_TOP_SPEED,120],[NITRO_TOP_SPEED,180],[-8,18]])assert.equal(speedToMph(speed),mph);
});
function advance(state,seconds,input,world=flat){for(let i=0;i<Math.round(seconds/DT);i++)stepVehicle(state,input,DT,world);}

test('kart accelerates, coasts, brakes and reverses with bounded speed',()=>{
 const state=createVehicleState();advance(state,4,{throttle:1});assert.equal(state.speed,VEHICLE_TOP_SPEED);
 assert.ok(state.x>150);assert.ok(state.wheelRotation>0);
 advance(state,.5,{});assert.ok(state.speed<VEHICLE_TOP_SPEED&&state.speed>20);
 advance(state,2,{brake:true});assert.equal(state.speed,0);
 advance(state,2,{throttle:-1});assert.equal(state.speed,-REVERSE_SPEED);
 const stopped=createVehicleState();advance(stopped,1,{steer:1});assert.equal(stopped.yaw,Math.PI/2);
});
test('stronger acceleration moves the kart farther and reaches both unchanged speed caps sooner',()=>{
 const normal={...createVehicleState(),x:0,z:0},boosted={...normal,boostTime:2};
 advance(normal,1,{throttle:1});advance(boosted,1,{throttle:1});
 assert.ok(Math.abs(normal.speed-24)<1e-8);assert.ok(Math.abs(boosted.speed-48)<1e-8);
 assert.ok(normal.x>12&&normal.x<12.2,'actual distance increases from about 8 m to 12 m in the first second');
 assert.ok(boosted.x>24&&boosted.x<24.4);
 advance(normal,1.25,{throttle:1});advance(boosted,.7,{throttle:1});
 assert.ok(Math.abs(normal.speed-VEHICLE_TOP_SPEED)<1e-8);assert.ok(Math.abs(boosted.speed-NITRO_TOP_SPEED)<1e-8);
 assert.equal(speedToMph(normal.speed),120);assert.equal(speedToMph(boosted.speed),180);
 assert.equal(VEHICLE_ACCELERATION,24);assert.equal(NITRO_ACCELERATION,48);
});
test('left/right steering is mirrored, smooth and independent of camera',()=>{
 const left=createVehicleState(),right=createVehicleState();
 advance(left,1,{throttle:1,steer:-1});advance(right,1,{throttle:1,steer:1});
 assert.ok(left.yaw>Math.PI/2);assert.ok(right.yaw<Math.PI/2);
 assert.ok(Math.abs((left.yaw-Math.PI/2)+(right.yaw-Math.PI/2))<1e-10);
 const angle=right.steering;advance(right,.5,{});assert.ok(Math.abs(right.steering)<Math.abs(angle));
});
test('entry requires proximity and grounded states; exit requires a safe stopped position',()=>{
 const kart=createVehicleState(),runner={x:kart.x-2,y:0,z:kart.z,grounded:true};
 assert.equal(canEnterVehicle(runner,kart),true);assert.equal(canEnterVehicle({...runner,x:0},kart),false);
 assert.equal(canEnterVehicle({...runner,grounded:false},kart),false);
 const exit=findExitPosition(kart,worldPhysics);assert.ok(exit);assert.equal(exit.y,0);
 assert.equal(findExitPosition({...kart,speed:5},worldPhysics),null);
 assert.equal(findExitPosition({...kart,speed:0,lateralSpeed:5},worldPhysics),null);
 const parked=resolveParkedKart(kart.x,kart.z,0,kart);assert.ok(Math.hypot(parked.x-kart.x,parked.z-kart.z)>1.5);
});
test('kart crosses the access bridge, respects rails and uses elevated ramp surfaces',()=>{
 const kart=createVehicleState();let peak=kart.x,rebounded=false,maxTurn=0,previousYaw=kart.yaw;
 for(let i=0;i<720;i++){stepVehicle(kart,{throttle:1},DT,worldPhysics);peak=Math.max(peak,kart.x);if(kart.railContactTime>0&&kart.speed<-.1)rebounded=true;maxTurn=Math.max(maxTurn,Math.abs(kart.yaw-previousYaw));previousYaw=kart.yaw;assert.ok(kart.y>-.01);}
 assert.ok(peak>150&&peak<166);assert.ok(rebounded,'small rebound at the actual outer rail');assert.ok(maxTurn<.01,'no instant heading change');assert.ok(Math.abs(kart.yaw-Math.PI/2)<.15,'near-head-on impact stays approximately facing the rail');assert.equal(kart.grounded,true);
 const sample=trackSamples.find(s=>s.point.y>8&&s.point.z>60&&s.point.z<85).point;
 const above=Object.assign(createVehicleState(),{x:sample.x,y:sample.y,z:sample.z});advance(above,.5,{brake:true},worldPhysics);
 assert.ok(above.y>8);assert.equal(above.grounded,true);
 const below=Object.assign(createVehicleState(),{x:sample.x,y:0,z:sample.z});advance(below,.5,{brake:true},worldPhysics);assert.ok(below.y<.1);
 const ramp=trackSamples.find(s=>s.point.y>3&&s.point.y<5).point;
 const slope=Object.assign(createVehicleState(),{x:ramp.x,y:ramp.y,z:ramp.z});advance(slope,1,{brake:true},worldPhysics);
 assert.ok(Number.isFinite(slope.pitch));assert.ok(Math.abs(slope.pitch)+Math.abs(slope.bank)>.01);
});
test('kart wheels roll/steer, driver pose is finite and jump takeoff is asymmetric',()=>{
 const kart=createKartFrame(),view=createVehicleView(kart),state=createVehicleState();advance(state,.5,{throttle:1,steer:1});view(state);
 assert.notEqual(kart.getObjectByName('front_axle_left_wheel').rotation.x,0);
 assert.notEqual(kart.getObjectByName('front_axle_left_wheel').rotation.y,0);
 const avatar=createAvatar();kart.add(avatar);createSeatedPose(avatar)();
 for(const bone of avatar.skeleton.bones)for(const value of bone.quaternion.toArray())assert.ok(Number.isFinite(value));
 const jumping=createAvatar(),mixer=new THREE.AnimationMixer(jumping),action=mixer.clipAction(createJumpClip(jumping)).play();action.time=.05;mixer.update(0);jumping.updateMatrixWorld(true);
 const left=jumping.skeleton.getBoneByName('left_foot').getWorldPosition(new THREE.Vector3());
 const right=jumping.skeleton.getBoneByName('right_foot').getWorldPosition(new THREE.Vector3());assert.ok(left.y>right.y+.03);
});

test('a driven lap can traverse every curve and both overpass levels',()=>{
 const first=trackSamples[0].point,next=trackSamples[1].point;
 const state=Object.assign(createVehicleState(),{x:first.x,y:first.y,z:first.z,yaw:Math.atan2(next.x-first.x,next.z-first.z)});
 let index=1,peak=0;
 for(let frame=0;frame<150000&&index<trackSamples.length;frame++){
  const waypoint=trackSamples[index].point;
  if(Math.hypot(waypoint.x-state.x,waypoint.z-state.z)<5){index++;continue;}
  const target=trackSamples[Math.min(index+2,trackSamples.length-1)].point;
  const desired=Math.atan2(target.x-state.x,target.z-state.z);
  const error=Math.atan2(Math.sin(desired-state.yaw),Math.cos(desired-state.yaw));
  stepVehicle(state,{throttle:state.speed<12?1:0,steer:Math.max(-1,Math.min(1,-error*2)),brake:state.speed>14},DT,worldPhysics);
  peak=Math.max(peak,state.y);assert.equal(state.grounded,true);assert.ok(state.y> -1);
 }
 assert.equal(index,trackSamples.length);assert.ok(peak>8);
});

const wall={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz,y,r)=>({x:Math.min(nx,10-r),z:nz})};
test('head-on impacts rebound a little, settle without turning and stay still under Gas',()=>{
 for(const speed of [8,40,NITRO_TOP_SPEED])for(const throttle of [0,1]){
  const kart={...createVehicleState(),x:7,z:0,speed};let contactX=null,minX=Infinity,reboundStarts=0,wasBacking=false;
  for(let i=0;i<600;i++){
   stepVehicle(kart,{throttle},DT,wall);
   assert.ok(kart.x<=8.470001);assert.ok(Math.abs(kart.yaw-Math.PI/2)<1e-9);
   if(contactX===null&&kart.railContactTime>0){contactX=kart.x;assert.ok(kart.speed<-.1&&kart.speed>=-1.500001);}
   if(contactX!==null){minX=Math.min(minX,kart.x);const backing=kart.speed<-.05;if(backing&&!wasBacking)reboundStarts++;wasBacking=backing;}
  }
  assert.ok(contactX!==null);assert.equal(reboundStarts,1);assert.ok(contactX-minX>.01&&contactX-minX<.5);assert.ok(Math.hypot(kart.speed,kart.lateralSpeed)<.001);
 }
});
test('oblique impacts preserve along-rail motion with a small rebound and gradual corner rotation',()=>{
 const loss=[];
 for(const degrees of [10,30,60]){
  const yaw=degrees*Math.PI/180,kart={...createVehicleState(),x:7,z:0,yaw,speed:40};let impact=null,maxYawStep=0,previousYaw=yaw,stepsAfterContact=0;
  for(let i=0;i<400&&stepsAfterContact<90;i++){
   const before={...kart};stepVehicle(kart,{},DT,wall);maxYawStep=Math.max(maxYawStep,Math.abs(kart.yaw-previousYaw));previousYaw=kart.yaw;
   if(kart.railContactTime>0&&!impact){impact={...kart};const vx=Math.sin(kart.yaw)*kart.speed+Math.cos(kart.yaw)*kart.lateralSpeed;assert.ok(vx<0&&vx>-2,'small outward rebound');assert.ok(Math.abs(kart.yaw-before.yaw)<.01,'no tangent snap');loss.push(1-Math.hypot(kart.speed,kart.lateralSpeed)/Math.hypot(before.speed,before.lateralSpeed));}
   if(impact)stepsAfterContact++;
   for(const offset of [-.35,.35])assert.ok(kart.x+Math.sin(kart.yaw)*offset<=8.82001,'capsule stays outside the rail');
  }
  assert.ok(impact);assert.ok(kart.z>impact.z+1);assert.ok(maxYawStep<.01);assert.ok(Math.abs(kart.yaw-yaw)<.3,'small, damped chassis rotation');
 }
 assert.ok(loss[0]<loss[1]&&loss[1]<loss[2],'steeper hits lose more speed');
});
test('player steering can leave a head-on rail contact in either direction',()=>{
 for(const steer of [-1,1]){
  const kart={...createVehicleState(),x:7,z:0,speed:40};advance(kart,3,{throttle:1},wall);assert.ok(kart.railContactTime>0);
  advance(kart,4,{throttle:1,steer},wall);assert.ok(kart.x<7);assert.ok(Math.abs(kart.z)>5);assert.ok(kart.speed>5);assert.equal(kart.railContactTime,0);
 }
});
test('coasting rail impacts do not create kinetic energy, even in a two-wall corner',()=>{
 const corner={...wall,resolveHorizontal:(x,z,nx,nz,y,r)=>({x:Math.min(nx,10-r),z:Math.min(nz,10-r)})};
 const energy=k=>k.speed*k.speed+k.lateralSpeed*k.lateralSpeed+k.impactYawRate*k.impactYawRate/.65;
 for(const yaw of [Math.PI/2,Math.PI/3,Math.PI/4,Math.PI/6]){
  const kart={...createVehicleState(),x:7,z:7,yaw,speed:NITRO_TOP_SPEED};let previous=energy(kart);
  for(let i=0;i<360;i++){stepVehicle(kart,{},DT,corner);const next=energy(kart);assert.ok(next<=previous+1e-5,`energy increased: ${previous} -> ${next}`);previous=next;assert.ok(kart.x<8.83&&kart.z<8.83);}
 }
});
test('quick steering taps are softer while holding slightly improves handling',()=>{
 function legacyTurn(seconds,tap){let yaw=0,wheel=0;const speed=40+VEHICLE_ACCELERATION*DT;for(let i=0;i<Math.round(seconds/DT);i++){const target=i*DT<tap?.39/(1+speed/11):0;wheel+=(target-wheel)*(1-Math.exp(-9*DT));yaw-=speed/2.03*Math.tan(wheel)*DT;}return Math.abs(yaw);}
 function newTurn(seconds,tap){const kart={...createVehicleState(),yaw:0,speed:40};for(let i=0;i<Math.round(seconds/DT);i++){kart.speed=40;stepVehicle(kart,{throttle:1,steer:i*DT<tap?1:0},DT,flat);}return Math.abs(kart.yaw);}
 for(const duration of [.025,.05,.1]){
  assert.ok(newTurn(.5,duration)<legacyTurn(.5,duration)*.8,'quick tap turns less than before at matching speed');
 }
 const ratio=newTurn(1.5,1.5)/legacyTurn(1.5,1.5);assert.ok(ratio>1&&ratio<1.08,'held turn is only slightly stronger');assert.ok(STEERING_LOCK>.39&&STEERING_LOCK<.43);
 const boosted={...createVehicleState(),speed:VEHICLE_TOP_SPEED,boostTime:2};advance(boosted,1,{throttle:1});assert.ok(Math.abs(boosted.speed-NITRO_TOP_SPEED)<1e-8);assert.equal(speedToMph(boosted.speed),180);
});

test('boosted-speed impacts stay outside segmented curved rails on both road levels',()=>{
 for(const index of [20,180,350,500,670,840,1040])for(const side of [-1,1]){
  const sample=trackSamples[index],next=trackSamples[index+1].point,dx=next.x-sample.point.x,dz=next.z-sample.point.z,length=Math.hypot(dx,dz);
  const kart={...createVehicleState(),...sample.point,yaw:Math.atan2(dx/length+side*sample.normal.x*.35,dz/length+side*sample.normal.z*.35),speed:NITRO_TOP_SPEED,boostTime:3};let contact=false;
  for(let i=0;i<240;i++){
   const previousYaw=kart.yaw;stepVehicle(kart,{throttle:1},DT,worldPhysics);contact||=kart.railContactTime>0;assert.equal(kart.grounded,true);assert.ok(Math.abs(kart.yaw-previousYaw)<.01);
   for(const offset of [-.35,.35]){const x=kart.x+Math.sin(kart.yaw)*offset,z=kart.z+Math.cos(kart.yaw)*offset,resolved=worldPhysics.resolveHorizontal(x,z,x,z,kart.y,1.18,1.8);assert.ok(Math.hypot(resolved.x-x,resolved.z-z)<.001,'no unresolved penetration at rail joints');}
  }
  assert.ok(contact,'test reaches the rail');
 }
});


test('four replay models can share a baked seated kart with six render meshes',()=>{
 const template=createGhostTemplate(),source=createKartFrame(),driver=createOnFootAvatar();source.add(driver);createSeatedPose(driver)();source.updateMatrixWorld(true);driver.skeleton?.update();
 const expected=new THREE.Box3().setFromObject(source,true),actual=new THREE.Box3().setFromObject(template,true);
 assert.ok(expected.min.distanceTo(actual.min)<1e-5&&expected.max.distanceTo(actual.max)<1e-5,'baked pose matches the seated kart');
 let meshes=0;template.traverse(node=>{if(node.isMesh){meshes++;assert.equal(node.isSkinnedMesh,undefined);for(const value of node.geometry.attributes.position.array)assert.ok(Number.isFinite(value));}});assert.equal(meshes,6);
 const copy=template.clone();assert.equal(copy.children[0].geometry,template.children[0].geometry);
 const apply=createVehicleView(copy);apply({...createVehicleState(),steering:.1,wheelRotation:2});assert.equal(copy.getObjectByName('front_axle_left_wheel').rotation.x,2);
});
