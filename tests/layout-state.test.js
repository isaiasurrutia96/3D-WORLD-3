import test from 'node:test';
import assert from 'node:assert/strict';
import {GRID_SIZE,LAYOUT_STORAGE_KEY,layoutProfile,snapPosition,encodePosition,decodePosition,readLayouts,saveLayouts} from '../src/layout-state.js';

test('drag positions snap to a fine grid and remain inside the screen',()=>{
 for(const viewport of [{width:320,height:568},{width:844,height:390},{width:1280,height:800}]){
  for(const [x,y]of [[-100,-100],[56.8,121.9],[9999,9999]]){
   const p=snapPosition(x,y,84,84,viewport);assert.equal(p.x%GRID_SIZE,0);assert.equal(p.y%GRID_SIZE,0);assert.ok(p.x>=8&&p.y>=8);assert.ok(p.x+84<=viewport.width-8&&p.y+84<=viewport.height-8);
  }
 }
 assert.deepEqual(snapPosition(56.8,121.9,84,84,{width:844,height:390}),{x:56,y:120});
 const safe={width:844,height:390,safeLeft:47,safeRight:47,safeTop:0,safeBottom:21};
 assert.deepEqual(snapPosition(0,9999,84,84,safe),{x:48,y:284});
});
test('saved positions adapt to other sizes without crossing screen edges',()=>{
 const viewport={width:844,height:390},point={x:660,y:212},saved=encodePosition(point,108,140,viewport);
 assert.deepEqual(decodePosition(saved,108,140,viewport),point);
 for(const viewport of [{width:568,height:320},{width:932,height:430},{width:320,height:568}]){
  const p=decodePosition(saved,116,156,viewport);assert.ok(p.x>=8&&p.y>=8&&p.x+116<=viewport.width-8&&p.y+156<=viewport.height-8);
 }
 assert.equal(layoutProfile(844,390),'landscape');assert.equal(layoutProfile(390,844),'portrait');
});
test('portrait and landscape layouts persist separately without touching ghost records',()=>{
 const values=new Map([['letsgo.top-laps.v2','existing ghost data']]);const storage={getItem:key=>values.get(key),setItem:(key,value)=>values.set(key,value)};
 const profiles={portrait:{gas:{x:.8,y:.7}},landscape:{gas:{x:.7,y:.8},navigation:{x:.1,y:.1}}};
 assert.equal(saveLayouts(storage,profiles),true);assert.deepEqual(readLayouts(storage),profiles);assert.equal(values.get('letsgo.top-laps.v2'),'existing ghost data');
 assert.equal(values.size,2);assert.ok(values.has(LAYOUT_STORAGE_KEY));
});
test('malformed layout entries and unavailable storage fail without applying bad positions',()=>{
 assert.deepEqual(readLayouts({getItem:()=>'{broken json'}),{});
 assert.deepEqual(readLayouts({getItem:()=>JSON.stringify({version:1,portrait:{gas:{x:-1,y:.5},brake:{x:.5,y:.5},unknown:{x:.2,y:.2}}})}),{portrait:{brake:{x:.5,y:.5}}});
 assert.equal(saveLayouts(null,{}),false);assert.equal(saveLayouts({setItem:()=>{throw Error('quota');}},{}),false);assert.deepEqual(readLayouts({getItem:()=>{throw Error('blocked');}}),{});
});
