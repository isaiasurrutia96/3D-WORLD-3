import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=name=>JSON.parse(readFileSync(new URL('../src/data/'+name,import.meta.url),'utf8'));
const plan=read('plan.json'),blocks=read('blocks.json'),surfaces=read('surfaces.json');

test('the approved island keeps its five trees, pool, waterfall and source grid',()=>{
 assert.equal(plan.tree_count,5);
 assert.deepEqual(plan.features.filter(f=>f.id.startsWith('T')).map(f=>f.id),['T1','T2','T3','T4','T5']);
 assert.equal(plan.track,false);assert.equal(plan.pond_cells.length,24);assert.ok(plan.waterfall);
 assert.equal(blocks.length,6555);assert.ok(blocks.every(b=>[1,2,4].includes(b.size)&&[b.x,b.y,b.h].every(Number.isInteger)));
});

test('every editable block is covered once and matching materials alone merge',()=>{
 assert.deepEqual(surfaces.flatMap(s=>s.sourceBlockIds).sort((a,b)=>a-b),blocks.map(b=>b.id));
 const canonical={earth:'dirt',trunk:'wood',leafLight:'leaf'};
 for(const component of surfaces){assert.ok(component.sourceBlockIds.every(id=>(canonical[blocks[id].type]||blocks[id].type)===component.type));}
});

test('all rendered mesh indices and positions are valid and compact',()=>{
 const file=readFileSync(new URL('../src/data/surfaces.bin',import.meta.url)),buffer=file.buffer.slice(file.byteOffset,file.byteOffset+file.byteLength);
 let triangles=0;
 for(const item of surfaces){
  if(item.kind!=='mesh')continue;
  const positions=new Float32Array(buffer,item.positionOffset,item.vertexCount*3),normals=new Float32Array(buffer,item.normalOffset,item.vertexCount*3),indices=new Uint32Array(buffer,item.indexOffset,item.indexCount);
  assert.ok(positions.every(Number.isFinite));assert.ok(normals.every(Number.isFinite));assert.ok(indices.every(i=>i<item.vertexCount));assert.equal(indices.length%3,0);triangles+=indices.length/3;
 }
 assert.ok(triangles<110000,'the full island stays within the approved lightweight mesh budget');
});

test('the small golf footprint fits on the main flat lawn clear of water',()=>{
 const heights=new Map(plan.heightmap.map(c=>[c.x+','+c.y,c]));
 for(let x=10;x<20;x++)for(let y=10;y<16;y++){
  const cell=heights.get(x+','+y);assert.ok(cell);assert.equal(cell.surface_cm,0);assert.notEqual(cell.bed_or_surface,'pond_bed');
 }
});
