import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {createMiniGolf} from '../src/mini-golf.js';

function fixture(){
 const elements=new Map(),listeners=new Map(),globalListeners=new Map(),captures=new Set();
 const element=id=>{if(!elements.has(id))elements.set(id,{style:{},hidden:false,textContent:'',classList:{toggle(){}}});return elements.get(id);};
 globalThis.document={querySelector:element,body:{classList:{toggle(){}}},addEventListener(){},createElement:()=>({width:0,height:0,getContext:()=>({fillText(){}})})};
 globalThis.window={addEventListener:(name,fn)=>globalListeners.set(name,fn)};
 globalThis.requestAnimationFrame=()=>1;globalThis.cancelAnimationFrame=()=>{};
 const canvas={style:{},addEventListener:(name,fn)=>listeners.set(name,fn),getBoundingClientRect:()=>({left:0,top:0,width:1000,height:800}),setPointerCapture:id=>captures.add(id),hasPointerCapture:id=>captures.has(id),releasePointerCapture:id=>captures.delete(id)};
 const camera=new THREE.OrthographicCamera(-4,4,3.2,-3.2,.1,100);camera.position.set(8.25,5.92,.11);camera.lookAt(6.45,.12,-5.59);camera.updateProjectionMatrix();camera.updateMatrixWorld();
 const golf=createMiniGolf({THREE,RoundedBoxGeometry,world:new THREE.Group(),renderer:{domElement:canvas},camera,onRender(){},onExit(){}});golf.setPlaying(true);
 function point(x,y){const p=new THREE.Vector3(4.3+x,.12,-4.3-y).project(camera);return{clientX:(p.x+1)*500,clientY:(1-p.y)*400,pointerId:1,preventDefault(){}};}
 const send=(event,x,y)=>listeners.get(event)(point(x,y));
 function putt(pullX,pullY){const p=golf.getState().position;send('pointerdown',...p);send('pointermove',p[0]+pullX,p[1]+pullY);send('pointerup',p[0]+pullX,p[1]+pullY);}
 function advance(n=700){for(let i=0;i<n;i++)golf.step(1/120);return golf.getState();}
 return {golf,putt,advance,send,globalListeners};
}

test('the starter hole can be completed in two controlled putts and reset',()=>{
 const {golf,putt,advance}=fixture();putt(0,-.517);const bend=advance();assert.equal(bend.strokes,1);assert.ok(Math.abs(bend.position[1]-1.935)<.1);putt(-.745,0);const finish=advance();assert.equal(finish.won,true);assert.equal(finish.strokes,2);golf.reset();assert.equal(golf.getState().won,false);assert.equal(golf.getState().strokes,0);assert.deepEqual(golf.getState().position,[.645,.55]);
});

test('a hard bank shot stays contained and never gains energy from the rail',()=>{
 const {golf,putt}=fixture();putt(1.1,0);let previous=Infinity;
 for(let i=0;i<900;i++){golf.step(1/120);const s=golf.getState(),speed=Math.hypot(...s.velocity);assert.ok(speed<=previous+.00001);assert.ok(s.position[0]>=.04&&s.position[0]<=4.3);assert.ok(s.position[1]>=.04&&s.position[1]<=2.58);previous=speed;}
 assert.equal(Math.hypot(...golf.getState().velocity),0);
});

test('cancelled touches and blur clear aim without creating a putt',()=>{
 const {golf,send,globalListeners}=fixture();send('pointerdown',.645,.55);send('pointermove',.3,.55);send('pointercancel',.3,.55);send('pointerup',.3,.55);assert.equal(golf.getState().dragging,false);assert.equal(golf.getState().strokes,0);
 send('pointerdown',.645,.55);send('pointermove',.2,.55);globalListeners.get('blur')();send('pointerup',.2,.55);assert.equal(golf.getState().power,0);assert.equal(golf.getState().strokes,0);
});
