import test from 'node:test';
import assert from 'node:assert/strict';
import {Mesh,MeshBasicMaterial,Raycaster,Vector3} from 'three';
import {topGeometry,cliffGeometry,pathGeometry} from '../src/terrain.js';
import {contains,outline,terrainHeight,pathCurve,golfOutline,random,TAU} from '../src/layout.js';

test('the grass and cliff meshes form a closed island with no unpaired edges',()=>{
 const top=topGeometry(),cliffs=cliffGeometry(),edges=new Map();
 const key=(p,i)=>[p.getX(i),p.getY(i),p.getZ(i)].map(n=>Math.round(n*10000)).join(',');
 for(const geometry of [top,cliffs]){
  const p=geometry.getAttribute('position'),normal=geometry.getAttribute('normal'),ids=geometry.index?.array??Array.from({length:p.count},(_,i)=>i);
  for(const n of p.array)assert.ok(Number.isFinite(n));for(const n of normal.array)assert.ok(Number.isFinite(n));
  for(let t=0;t<ids.length;t+=3){const face=[key(p,ids[t]),key(p,ids[t+1]),key(p,ids[t+2])];assert.equal(new Set(face).size,3,'no zero-area duplicate-vertex faces');for(let i=0;i<3;i++){const edge=[face[i],face[(i+1)%3]].sort().join('|');edges.set(edge,(edges.get(edge)??0)+1);}}
 }
 for(const [edge,count]of edges)assert.equal(count,2,`unpaired or non-manifold edge ${edge}`);
 top.dispose();cliffs.dispose();
});
test('grass is present across the entire interior and its collision heights agree with the rendered surface',()=>{
 const geometry=topGeometry(),mesh=new Mesh(geometry,new MeshBasicMaterial()),ray=new Raycaster(),rng=random(200);mesh.updateMatrixWorld();
 for(let i=0;i<200;i++){
  const p=outline(rng()*TAU,Math.sqrt(rng())*.98);assert.ok(contains(p.x,p.z));
  ray.set(new Vector3(p.x,20,p.z),new Vector3(0,-1,0));const hit=ray.intersectObject(mesh)[0];assert.ok(hit,'no holes in the grass surface');assert.ok(Math.abs(hit.point.y-terrainHeight(p.x,p.z))<.45);
 }
 geometry.dispose();mesh.material.dispose();
});
test('the full dirt-path width and putting-course perimeter stay inside the island',()=>{
 for(let i=0;i<=600;i++){
  const p=pathCurve.getPoint(i/600),d=pathCurve.getTangent(i/600);
  for(const side of [-1,0,1])assert.ok(contains(p.x+d.z*2.25*side,p.z-d.x*2.25*side,.015),'path cannot end off the cliff');
 }
 assert.ok(pathCurve.getPoint(0).distanceTo(pathCurve.getPoint(1))<1e-8);
 for(const p of golfOutline.getPoints(300)){assert.ok(contains(p.x,p.z,.015));assert.ok(terrainHeight(p.x,p.z)<1.35,'the putting surface must stay above the ground');assert.ok(terrainHeight(p.x,p.z)>-.65,'foundation must meet the ground');}
 const g=pathGeometry(),material=new MeshBasicMaterial(),mesh=new Mesh(g,material),ray=new Raycaster();mesh.updateMatrixWorld();
 for(const n of g.attributes.position.array)assert.ok(Number.isFinite(n));
 for(let i=0;i<600;i++){
  const p=pathCurve.getPoint((i+.5)/600);ray.set(new Vector3(p.x,20,p.z),new Vector3(0,-1,0));
  assert.ok(ray.intersectObject(mesh).length,'the dirt loop must remain continuous, including the former bridge crossing');
 }
 g.dispose();material.dispose();
});
