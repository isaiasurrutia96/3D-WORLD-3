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
test('movement and jump fingers remain independent and a second finger cannot steal the stick',()=>{
 const input=createMobileInput();assert.equal(input.beginStick(1),true);input.moveStick(1,{right:-1,forward:.2});
 assert.equal(input.beginStick(3),false);input.moveStick(3,{right:1,forward:1});input.hold(2,'primary');
 assert.equal(input.consume().right,-1);assert.equal(input.peek().primary,true);
 input.release(1);assert.equal(input.peek().right,0);assert.equal(input.peek().primary,true);
 input.release(2);assert.equal(input.peek().primary,false);
});
test('left/right buttons release independently of jump and opposite steering',()=>{
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
 assert.deepEqual(input.consume(),{right:0,forward:0,primary:false,primaryPressed:false,secondary:false,secondaryPressed:false,gas:false});
});
test('mobile gas requires a held finger and respects keyboard braking and reverse',()=>{
 assert.equal(readDrivingInput(new Set(),{gas:true}).throttle,1);
 assert.equal(readDrivingInput(new Set(['KeyD']),{gas:true}).throttle,-1);
 assert.equal(readDrivingInput(new Set(['KeyE','KeyD']),{gas:true}).throttle,-1);
 assert.equal(readDrivingInput(new Set(['ArrowDown']),{gas:true}).throttle,-1);
 assert.equal(readDrivingInput(new Set(['KeyE']),{gas:true,secondary:true}).throttle,-1);
 assert.equal(readDrivingInput(new Set()).throttle,0);
});
test('Gas has one owner, remains independent of steering and queues no jump',()=>{
 const input=createMobileInput();assert.equal(input.beginGas(1),true);assert.equal(input.beginGas(2),false);
 input.hold(3,'left');assert.equal(input.peek().right,-1);assert.equal(input.peek().gas,true);
 input.release(3);assert.equal(input.peek().right,0);assert.equal(input.peek().gas,true);
 input.release(2);assert.equal(input.peek().gas,true);input.release(1);
 assert.equal(input.peek().gas,false);assert.equal(input.consume().primaryPressed,false);assert.equal(input.moveGas,undefined);
});
test('Gas cancellation and reset release the accelerator',()=>{
 const input=createMobileInput();input.beginGas(1);input.release(1,true);assert.equal(input.peek().gas,false);
 input.beginGas(2);input.hold(3,'right');input.reset();assert.equal(input.peek().gas,false);assert.equal(input.peek().right,0);
});
test('driving accepts gas, steering and independent brake with no drift input',()=>{
 assert.deepEqual(readDrivingInput(new Set(['KeyE','Space','KeyS'])),{throttle:1,steer:-1});
 assert.deepEqual(readDrivingInput(new Set(),{gas:true,right:1,drift:true}),{throttle:1,steer:1});
 assert.deepEqual(readDrivingInput(new Set(['ArrowDown']),{gas:true}),{throttle:-1,steer:0});
 assert.deepEqual(readDrivingInput(new Set(),{gas:true,secondary:true}),{throttle:-1,steer:0});
});
test('two-finger mobile driving matches the grip steering controller',()=>{
 const input=createMobileInput(),kart={...createVehicleState(),speed:42},reference={...kart};input.hold(1,'left');input.beginGas(2);
 for(let i=0;i<180;i++){
  stepVehicle(kart,readDrivingInput(new Set(),input.consume()),1/120,flat);
  stepVehicle(reference,{throttle:1,steer:-1},1/120,flat);
 }
 for(const key of ['x','z','yaw','speed','steering'])assert.ok(Math.abs(kart[key]-reference[key])<1e-9,key);
 input.release(1);assert.equal(input.peek().gas,true);input.release(2);assert.equal(input.peek().gas,false);
});
