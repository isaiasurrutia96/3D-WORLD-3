import test from 'node:test';
import assert from 'node:assert/strict';
import {createMobileInput,stickDirection} from '../src/mobile-input.js';
import {readDrivingInput} from '../src/input.js';
import {createVehicleState,stepVehicle} from '../src/vehicle-controller.js';
const flat={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz)=>({x:nx,z:nz})};

test('touch stick has a dead zone and clamps diagonals to a circular range',()=>{
 assert.deepEqual(stickDirection(2,1,40),{right:0,forward:0});
 const diagonal=stickDirection(80,-80,40);assert.ok(Math.abs(Math.hypot(diagonal.right,diagonal.forward)-1)<1e-9);
 const left=stickDirection(-40,0,40);assert.ok(left.right===-1&&left.forward===0);
});
test('steering and drift fingers remain independent and a second finger cannot steal the stick',()=>{
 const input=createMobileInput();assert.equal(input.beginStick(1),true);input.moveStick(1,{right:-1,forward:.2});
 assert.equal(input.beginStick(3),false);input.moveStick(3,{right:1,forward:1});input.hold(2,'primary');
 assert.equal(input.consume().right,-1);assert.equal(input.peek().primary,true);
 input.release(1);assert.equal(input.peek().right,0);assert.equal(input.peek().primary,true);
 input.release(2);assert.equal(input.peek().primary,false);
});
test('left/right buttons release independently of drift and opposite steering',()=>{
 const input=createMobileInput();input.hold(1,'left');input.hold(2,'primary');
 assert.equal(input.peek().right,-1);assert.equal(input.peek().primary,true);
 input.hold(3,'right');assert.equal(input.peek().right,0);
 assert.equal(input.isHeld('left'),true);assert.equal(input.isHeld('right'),true);
 input.release(1);assert.equal(input.peek().right,1);assert.equal(input.peek().primary,true);
 input.release(3,true);assert.equal(input.peek().right,0);assert.equal(input.peek().primary,true);
 input.release(2,true);assert.equal(input.consume().primary,false);assert.equal(input.consume().primaryPressed,false);
});
test('multiple fingers on one steering button retain ownership until the last release',()=>{
 const input=createMobileInput();input.hold(1,'left');input.hold(2,'left');
 input.release(1);assert.equal(input.peek().right,-1);
 input.release(2,true);assert.equal(input.peek().right,0);
 input.hold(3,'right');assert.equal(input.peek().right,1);
 input.reset();assert.equal(input.peek().right,0);assert.equal(input.isHeld('right'),false);
});
test('fast Jump or Flip taps survive until a simulation step and never repeat while held',()=>{
 for(const action of ['primary','secondary']){
  const input=createMobileInput(),pressed=action+'Pressed';input.hold(4,action);input.release(4);
  assert.equal(input.consume()[pressed],true);assert.equal(input.consume()[pressed],false);
  input.hold(5,action);assert.equal(input.consume()[pressed],true);assert.equal(input.consume()[pressed],false);assert.equal(input.peek()[action],true);
 }
});
test('cancellation and home/blur reset clear held fingers and queued actions',()=>{
 const input=createMobileInput();input.hold(2,'primary');input.release(2,true);assert.equal(input.consume().primaryPressed,false);
 input.beginStick(1);input.moveStick(1,{right:1,forward:1});input.hold(2,'primary');input.hold(3,'secondary');input.reset();
 assert.deepEqual(input.consume(),{right:0,forward:0,primary:false,primaryPressed:false,secondary:false,secondaryPressed:false});
});
test('mobile auto acceleration allows keyboard braking and reverse overrides the accelerator',()=>{
 assert.equal(readDrivingInput(new Set(),{},true).throttle,1);
 assert.equal(readDrivingInput(new Set(['KeyD']),{},true).throttle,-1);
 assert.equal(readDrivingInput(new Set(['KeyE','KeyD']),{},true).throttle,0);
 assert.equal(readDrivingInput(new Set(['KeyE']),{secondary:true},true).throttle,-1);
 assert.equal(readDrivingInput(new Set()).throttle,0);
});
test('touch steering and queued drift combine with keyboard input without exceeding steering limits',()=>{
 assert.equal(readDrivingInput(new Set(['KeyF']),{right:1}).steer,1);
 assert.equal(readDrivingInput(new Set(['KeyS']),{right:1}).steer,0);
 assert.equal(readDrivingInput(new Set(),{primaryPressed:true}).drift,true);
});
test('two-finger steering and drifting drive the existing kart controller together',()=>{
 const input=createMobileInput(),kart={...createVehicleState(),speed:42};input.beginStick(1);input.moveStick(1,{right:-1,forward:0});input.hold(2,'primary');
 for(let i=0;i<90;i++)stepVehicle(kart,readDrivingInput(new Set(),input.consume(),true),1/120,flat);
 assert.equal(kart.drifting,true);assert.equal(kart.speed,42);assert.ok(kart.driftAngle<-.5);
 input.release(1);assert.equal(input.peek().primary,true);
 input.release(2);stepVehicle(kart,readDrivingInput(new Set(),input.consume(),true),1/120,flat);assert.equal(kart.drifting,false);
});
