import test from'node:test';
import assert from'node:assert/strict';
import{bakeContactPreview,contactCorners,contactEnergy}from'../src/preview/wall-contact.js';
test('proposed head-on contact stops without an automatic turn or rebound',()=>{
 const frames=bakeContactPreview('head-on'),hit=frames.find(s=>s.impactAt!==null),end=frames.at(-1);
 assert.ok(hit&&hit.impactAt>0);assert.ok(end.speed<.02);
 for(const s of frames){assert.ok(Math.abs(s.yaw-Math.PI/2)<.01);assert.ok(s.vx>-.02);}
 assert.ok(Math.abs(end.x-hit.x)<.03);assert.ok(Math.abs(end.z-hit.z)<.03);
});
test('proposed glancing contact carries along the wall with continuous rotation',()=>{
 const frames=bakeContactPreview('angled'),hit=frames.find(s=>s.impactAt!==null),end=frames.at(-1);
 assert.ok(hit);assert.ok(end.z-hit.z>8);assert.ok(end.speed<hit.speed);
 for(let i=1;i<frames.length;i++)assert.ok(Math.abs(frames[i].yaw-frames[i-1].yaw)<.035,'no snap in heading');
 assert.ok(Math.abs(end.yaw)<.25);assert.ok(frames.every(s=>s.vx>-1));
});
test('proposed contact neither penetrates the wall nor adds energy',()=>{
 for(const kind of['head-on','angled']){
  const frames=bakeContactPreview(kind);let energy=contactEnergy(frames[0]);
  for(const s of frames){
   assert.ok(Math.max(...contactCorners(s).map(p=>s.x+p.x))<1e-7);
   const next=contactEnergy(s);assert.ok(next<=energy+1e-6);energy=next;
  }
 }
});
