import test from 'node:test';
import assert from 'node:assert/strict';
import {BlockWorld,DIRECTIONS} from '../src/blocks.js';
import {createLand,surfaceHeight,contains,topCell} from '../src/layout.js';
import {createIslandData,createTerrain} from '../src/terrain.js';
import {facePoints} from '../src/block-mesh.js';

test('blocks edit independently on an exact grid, with no internal faces between neighbors',()=>{
 const world=new BlockWorld();world.set(0,0,0,'grass').set(1,0,0,'grass');
 assert.equal([...world.exposedFaces()].length,10);
 assert.deepEqual(world.snap(-.01,.5,1),{x:-1,y:0,z:1});
 assert.equal(world.solidAt(.999999,.5,.5),true);assert.equal(world.solidAt(1.000001,.5,.5),true);
 assert.throws(()=>world.set(.5,0,0,'stone'),TypeError);
 world.remove(1,0,0);assert.equal(world.get(0,0,0).type,'grass');assert.equal([...world.exposedFaces()].length,6);
});
test('merged collision volumes cover each solid cell exactly once and rebuild after editing',()=>{
 const world=new BlockWorld();
 for(let x=-3;x<9;x++)for(let z=-4;z<8;z++)world.set(x,0,z,'grass');
 let boxes=world.collisionBoxes();assert.deepEqual(boxes,[{min:[-3,0,-4],max:[9,1,8]}]);
 world.set(0,1,0,'rock');world.remove(1,0,1);world.set(0,10,0,'cloud');boxes=world.collisionBoxes();
 const counts=new Map();for(const {min,max}of boxes)for(let x=min[0];x<max[0];x++)for(let y=min[1];y<max[1];y++)for(let z=min[2];z<max[2];z++){const key=[x,y,z].join();counts.set(key,(counts.get(key)||0)+1);}
 for(const [key,count]of counts){assert.equal(count,1);assert.notEqual(world.cells.get(key)?.type,'cloud');assert.ok(world.cells.has(key));}
 for(const [key,cell]of world.cells)if(cell.type!=='cloud')assert.equal(counts.get(key),1);
 assert.equal(world.solidAt(1.5,.5,1.5),false);assert.equal(world.solidAt(.5,1.5,.5),true);
});
test('the enlarged main lawn and upper terrace are supported by closed sealed terrain',()=>{
 const world=createLand(),edges=new Map();let flat=0,upper=0;
 for(let x=-39;x<39;x++)for(let z=-31;z<31;z++){
  if(!contains(x,z))continue;const top=topCell(x,z);if(top===0)flat++;if(top===4)upper++;
  assert.equal(surfaceHeight(x+.5,z+.5),top+1);assert.equal(world.get(x,top,z)?.type,'grass');
  assert.ok(world.get(x,top-1,z),'no unsupported lawn blocks');
 }
 assert.ok(flat>3500,'generous main flat lawn');assert.ok(upper>=400,'large upper lawn');
 for(const face of world.exposedFaces()){
  const n=DIRECTIONS[face.direction].n;assert.equal(world.get(face.x+n[0],face.y+n[1],face.z+n[2]),undefined);
  const points=facePoints(face).map(point=>point.join(','));
  for(let i=0;i<4;i++){const edge=[points[i],points[(i+1)%4]].sort().join('|');edges.set(edge,(edges.get(edge)||0)+1);}
 }
 for(const count of edges.values())assert.equal(count%2,0,'no unpaired exterior boundaries');
});
test('the complete block island stays within its rendering budget and has no water materials',()=>{
 const data=createIslandData(),group=createTerrain(data);
 assert.ok(data.world.cells.size>50000);assert.ok(data.faces.length<32000);
 assert.ok(group.children.length<=32);assert.ok(group.userData.triangles<320000);
 for(const cell of data.world.cells.values())assert.ok(!['water','foam','river'].includes(cell.type));
 for(const mesh of group.children){for(const n of mesh.geometry.attributes.position.array)assert.ok(Number.isFinite(n));mesh.geometry.dispose();}
 group.children[0].material.dispose();
});
