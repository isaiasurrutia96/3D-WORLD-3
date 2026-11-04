import assert from 'node:assert/strict';
import * as THREE from 'three';
import {mansionToWorld,mansionToLocal,mansionDoors,stepMansion,resolveMansion,mansionSupportHeight,constrainMansionCamera,createMansion} from '../src/mansion.js';
import {worldPhysics} from '../src/world.js';
import {createRunner,stepRunner,STEP} from '../src/running-controller.js';
const world=(x,z)=>mansionToWorld(x,z);
assert.deepEqual(mansionToLocal(...Object.values(world(4,22))),{x:4,z:22});
const door=world(0,24);for(let i=0;i<120;i++)stepMansion({...door,y:.4},STEP);
assert.ok(mansionDoors[0].open>.99);assert.equal(mansionDoors[1].open,0);
const start=world(0,26),r={...createRunner(),...start,y:.4};
function go(x,z){const target=world(x,z);for(let i=0;i<2400;i++){const dx=target.x-r.x,dz=target.z-r.z;if(Math.hypot(dx,dz)<.1)return;stepMansion(r,STEP);stepRunner(r,{x:dx,z:dz,sprint:false},STEP,worldPhysics);}throw Error(`Blocked going to ${x},${z}: ${JSON.stringify(mansionToLocal(r.x,r.z))}`);}
go(0,17);go(12,17);go(12,12);go(12,-13);assert.ok(Math.abs(r.y-5.4)<.01,'Stairs reach upstairs');go(15,-14);go(19,-14);assert.ok(Math.abs(r.y-5.4)<.01,'Upper study doorway accessible');go(15,-14);go(12,-13);go(12,12);assert.ok(Math.abs(r.y-.4)<.02,'Stairs return downstairs');
const w=world(25,22),attempt=world(25,22.1),blocked=resolveMansion(w.x,w.z,attempt.x,attempt.z,.4);assert.ok(mansionToLocal(blocked.x,blocked.z).z>22.5,'Exterior wall stays solid');
const point=world(0,18),outside=world(0,30);mansionDoors[0].open=0;
const camera=constrainMansionCamera(new THREE.Vector3(point.x,2,point.z),new THREE.Vector3(outside.x,2,outside.z));assert.ok(mansionToLocal(camera.x,camera.z).z<22,'Camera respects closed exterior');
assert.equal(mansionSupportHeight(...Object.values(world(26,-12)),6),5.4);
const house=createMansion();assert.ok(house.getObjectByName('Mansion roof'));console.log('Mansion: doors, full envelope, stairs both directions, upper room access and camera passed.');
