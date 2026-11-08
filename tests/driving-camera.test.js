import test from 'node:test';
import assert from 'node:assert/strict';
import {createDrivingCameraState,updateDrivingCamera} from '../src/driving-camera.js';
import {STEERING_LOCK} from '../src/vehicle-controller.js';
const pose={x:0,y:0,z:0,yaw:0,speed:40,steering:0};
function settle(kart,dt=1/120){const state=createDrivingCameraState();let frame;for(let i=0;i<Math.round(2/dt);i++)frame=updateDrivingCamera(state,kart,dt);return{state,frame};}
test('straight chase view looks slightly higher while keeping the same following distance',()=>{
 const {frame}=settle(pose),dx=frame.target.x-frame.position.x,dy=frame.target.y-frame.position.y,dz=frame.target.z-frame.position.z;
 const pitch=Math.atan2(dy,Math.hypot(dx,dz)),previousPitch=Math.atan2(-4.5,11);
 assert.ok(pitch>previousPitch&&pitch<previousPitch+.13);assert.equal(Math.hypot(frame.position.x,frame.position.z),11);
});
test('right and left steering show the inside of their respective corners and ease back to center',()=>{
 const steer=STEERING_LOCK/(1+pose.speed/11),right=settle({...pose,steering:steer}),left=settle({...pose,steering:-steer});
 assert.ok(right.frame.target.x<0);assert.ok(left.frame.target.x>0);assert.ok(Math.abs(right.frame.target.x+left.frame.target.x)<1e-10);
 const before=right.state.lookTurn;updateDrivingCamera(right.state,pose,1/60);assert.ok(right.state.lookTurn>0&&right.state.lookTurn<before);
 for(let i=0;i<240;i++)updateDrivingCamera(right.state,pose,1/120);assert.ok(right.state.lookTurn<.0001);
});
test('peek remains bounded, is frame-rate independent and does not move while parked',()=>{
 const kart={...pose,steering:1},a=settle(kart,1/60),b=settle(kart,1/120);
 assert.ok(Math.abs(a.state.lookTurn-b.state.lookTurn)<1e-12);assert.ok(a.state.lookTurn<=1);assert.ok(Math.abs(a.frame.target.x)<=2.4);
 const parked=settle({...kart,speed:0});assert.equal(parked.state.lookTurn,0);assert.equal(parked.frame.target.x,0);
});
test('crossing the yaw wrap and traveling on an overpass keep camera offsets continuous',()=>{
 const a=settle({...pose,yaw:Math.PI-1e-7}).frame,b=settle({...pose,yaw:-Math.PI+1e-7}).frame;
 assert.ok(Math.hypot(a.position.x-b.position.x,a.position.z-b.position.z)<.00001);
 const high=settle({...pose,y:12}).frame,low=settle(pose).frame;assert.equal(high.position.y-low.position.y,12);assert.equal(high.target.y-low.target.y,12);
});
