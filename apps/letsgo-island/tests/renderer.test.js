import test from 'node:test';
import assert from 'node:assert/strict';
import {createIslandRenderer} from '../src/renderer.js';
function fakeCanvas(){const node={dataset:{},copies:[],replaced:null,cloneNode(deep){assert.equal(deep,false);const copy=fakeCanvas();this.copies.push(copy);return copy;},replaceWith(copy){this.replaced=copy;}};return node;}

test('a supported renderer uses the ordinary adapter and original canvas',()=>{
 const canvas=fakeCanvas(),calls=[],renderer={};const result=createIslandRenderer(canvas,options=>{calls.push(options);return renderer;});
 assert.equal(result.renderer,renderer);assert.equal(result.canvas,canvas);assert.equal(result.compatible,false);assert.equal(calls.length,1);assert.equal(calls[0].antialias,true);assert.equal(calls[0].powerPreference,'default');assert.equal(canvas.replaced,null);
});
test('rejected multisample startup retries a fresh canvas with ordinary graphics',()=>{
 const canvas=fakeCanvas(),calls=[],renderer={};const result=createIslandRenderer(canvas,options=>{calls.push(options);if(options.antialias)throw Error('Selected attributes are not supported');return renderer;});
 assert.equal(result.compatible,true);assert.equal(result.renderer,renderer);assert.notEqual(result.canvas,canvas);assert.equal(canvas.replaced,result.canvas);assert.equal(calls.length,2);assert.equal(calls[1].antialias,false);assert.equal(calls[1].powerPreference,'default');assert.equal(calls[1].failIfMajorPerformanceCaveat,false);assert.equal(result.canvas.dataset.graphics,'compatible');
});
test('a driver can fall back to the low-power adapter without reusing failed canvases',()=>{
 const canvas=fakeCanvas(),calls=[];const result=createIslandRenderer(canvas,options=>{calls.push(options);if(options.powerPreference!=='low-power')throw Error('Adapter unavailable');return{};});
 assert.equal(calls.length,3);assert.notEqual(calls[0].canvas,calls[1].canvas);assert.notEqual(calls[1].canvas,calls[2].canvas);assert.equal(result.canvas.dataset.graphics,'low-power');assert.equal(canvas.replaced,result.canvas);
});
test('fully unavailable WebGL fails clearly and leaves the original canvas in place',()=>{
 const canvas=fakeCanvas();assert.throws(()=>createIslandRenderer(canvas,()=>{throw Error('WebGL 2 disabled');}),error=>error instanceof AggregateError&&error.errors.length===3&&error.message.includes('WebGL 2'));
 assert.equal(canvas.replaced,null);
});
