import test from 'node:test';
import assert from 'node:assert/strict';
import {BlockWorld,DIRECTIONS} from '../src/blocks.js';
import {createLand,surfaceHeight,contains,topCell,POOL,inPool,HALF_X,HALF_Z,FALL} from '../src/layout.js';
import {TREE_PLAN,ROCK_PLAN,SHRUB_PLAN,TERRACES} from '../src/reference-layout.js';
import {createIslandData,createTerrain} from '../src/terrain.js';
import {facePoints,disposeBlockMeshes} from '../src/block-mesh.js';
import {createWaterFaces,createWaterMeshes} from '../src/water.js';

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
test('the reference footprint and terraces have supported, closed solid boundaries',()=>{
 const world=createLand(),edges=new Map(),highest=Math.max(...TERRACES.map(terrace=>terrace.height));let flat=0,upper=0;
 for(let x=-HALF_X;x<HALF_X;x++)for(let z=-HALF_Z;z<HALF_Z;z++){
  if(!contains(x,z))continue;const top=topCell(x,z);if(top===0)flat++;if(top===highest)upper++;
  assert.equal(surfaceHeight(x+.5,z+.5),top+1);assert.equal(world.get(x,top,z)?.type,inPool(x,z)?'sand':'grass');
  assert.ok(world.get(x,top-1,z),'no unsupported lawn blocks');
 }
 assert.ok(flat>1800,'large open main lawn');assert.ok(upper>100,'separate upper lawn');
 for(const face of world.exposedFaces()){
  if(face.type==='water')continue;
  const n=DIRECTIONS[face.direction].n,neighbor=world.get(face.x+n[0],face.y+n[1],face.z+n[2]);assert.ok(!neighbor||neighbor.type==='water');
  const points=facePoints(face).map(point=>point.join(','));
  for(let i=0;i<4;i++){const edge=[points[i],points[(i+1)%4]].sort().join('|');edges.set(edge,(edges.get(edge)||0)+1);}
 }
 for(const count of edges.values())assert.equal(count%2,0,'no unpaired exterior boundaries');
});
test('rounded island geometry stays finite in Low and High while the cell layout remains unchanged',()=>{
 const data=createIslandData(),group=createTerrain(data);
 assert.ok(data.world.cells.size>20000);assert.ok(data.faces.length<32000);
 assert.ok(group.children.length<=36);assert.ok(group.userData.triangles<650000);
 const revision=data.world.revision,high=createTerrain(data,'high');assert.equal(data.world.revision,revision);
 assert.ok(high.userData.triangles>group.userData.triangles);assert.ok(high.userData.triangles<1500000);
 for(const collection of [group,high])for(const mesh of collection.children){for(const attribute of ['position','normal'])for(const n of mesh.geometry.attributes[attribute].array)assert.ok(Number.isFinite(n));}
 disposeBlockMeshes(group);disposeBlockMeshes(high);
});
test('the restored pool has a solid bed, nonsolid water and a transparent fall at its outside lip',()=>{
 const world=createLand();
 for(let x=POOL.minX;x<POOL.maxX;x++)for(let z=POOL.minZ;z<POOL.maxZ;z++){
  if(!contains(x,z)||!inPool(x,z))continue;
  assert.ok(world.solidAt(x+.5,-1.5,z+.5));assert.equal(world.solidAt(x+.5,.5,z+.5),false);
 }
 const faces=createWaterFaces(world),water=createWaterMeshes(faces),material=water.children[0].material;
 assert.ok(faces.some(face=>face.points.some(point=>point[1]<-25)));
 assert.ok(faces.some(face=>face.points.some(point=>Math.hypot(point[0]-FALL.x,point[2]-FALL.z)<1.5&&point[1]===POOL.level)));
 assert.equal(material.transparent,true);assert.equal(material.depthWrite,false);
 const alpha=water.children[0].geometry.attributes.color;assert.equal(alpha.itemSize,4);
 for(let i=0;i<alpha.count;i++)assert.ok(alpha.getW(i)>0&&alpha.getW(i)<=1);
 disposeBlockMeshes(water);
});
test('the reference has five grounded trees, five rock clusters, four shrubs and an unobstructed center',()=>{
 const first=createIslandData(),second=createIslandData();
 assert.deepEqual([...first.world.cells],[...second.world.cells],'the same plan must reconstruct identical cells');
 assert.equal(TREE_PLAN.length,5);assert.equal(ROCK_PLAN.length,5);assert.equal(SHRUB_PLAN.length,4);
 for(const plan of TREE_PLAN){const base=surfaceHeight(plan.x,plan.z);assert.notEqual(base,null);assert.equal(first.world.get(plan.x,base,plan.z)?.type,'trunk');}
 for(let x=-18;x<=13;x++)for(let z=-10;z<=14;z++){
  assert.equal(topCell(x,z),0,'the central lawn stays flat');
  for(let y=1;y<12;y++)assert.equal(first.world.get(x,y,z),undefined,'no scenery in the open center');
 }
 const water=[...first.world.cells.values()].filter(cell=>cell.type==='water'&&cell.y===0);
 assert.ok(water.length>50&&water.length<120,'the pond stays compact');
});
