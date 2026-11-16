import test from 'node:test';
import assert from 'node:assert/strict';
import {createCanyonRoute,cellContours,canyonFootprint} from '../src/canyon-layout.js';
import {createCanyonState,stepCanyonKart,CANYON_KART_RADIUS} from '../src/canyon-physics.js';
import {createCanyonWorld} from '../src/canyon-world.js';

const route=createCanyonRoute(600);

test('the canyon stays within the mobile geometry budget',()=>{
 for(const software of [false,true]){
  const canyon=createCanyonWorld({software}),stats=canyon.getStats();
  assert.ok(stats.drawCalls<20);assert.ok(stats.triangles<(software?20000:65000));
  for(const mesh of canyon.group.children)assert.ok(mesh.geometry.attributes.position.array.every(Number.isFinite));
 }
});

test('Canyon Switchbacks is one closed route with full-width turns and two bridges',()=>{
 assert.equal(route.bridges.length,2);assert.equal(route.width,8.6);
 const first=route.samples[0],last=route.samples.at(-1);assert.ok(Math.hypot(first.x-last.x,first.z-last.z)<1e-8);
 let minRadius=Infinity,minSeparation=Infinity,maxGrade=0;
 for(let i=0;i<route.count;i++){
  const a=route.samples[(i+route.count-2)%route.count],b=route.samples[i],c=route.samples[(i+2)%route.count],next=route.samples[i+1];
  const ab=Math.hypot(b.x-a.x,b.z-a.z),bc=Math.hypot(c.x-b.x,c.z-b.z),ac=Math.hypot(c.x-a.x,c.z-a.z),cross=Math.abs((b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x));
  if(cross>1e-7)minRadius=Math.min(minRadius,ab*bc*ac/(2*cross));
  maxGrade=Math.max(maxGrade,Math.abs(next.y-b.y)/Math.hypot(next.x-b.x,next.z-b.z));
  for(let j=i+1;j<route.count;j++)if(Math.min(j-i,route.count-j+i)*route.length/route.count>route.width*3)minSeparation=Math.min(minSeparation,Math.hypot(b.x-route.samples[j].x,b.z-route.samples[j].z));
 }
 assert.ok(minRadius>route.width/2+1,'inside road edges must not fold over in hairpins');
 assert.ok(minSeparation>route.width+route.curb*2,'separate road sections and their rails must not intersect');
 assert.ok(maxGrade<.3,'bridge approaches must remain driveable');
 for(const bridge of route.bridges)assert.ok(route.nearest(0,bridge.z).y-1.02>7,'a bridge must clear the canyon river');
});

test('merged island outlines close and keep the grid sealed',()=>{
 for(const inset of [0,4.3,8.6,17.2,25.8,35.5]){
  const loops=cellContours(canyonFootprint(inset));assert.equal(loops.length,1);
  assert.ok(loops[0].length>=4);assert.ok(loops[0].flat().every(Number.isFinite));
 }
});

test('a driver using ordinary steering can complete the entire loop and both bridges',()=>{
 const state=createCanyonState(route);let widest=0;
 for(let i=0;i<18000&&state.lap<2;i++){
  const p=route.nearest(state.x,state.z),target=route.samples[Math.floor(((p.progress+3.4/route.length)%1)*route.count)],dx=target.x-state.x,dz=target.z-state.z;
  const angle=Math.atan2(dx,dz)-state.yaw,error=Math.atan2(Math.sin(angle),Math.cos(angle));
  const lock=.415/(1+Math.abs(state.speed)/11)*(1+.2*Math.max(0,Math.min(1,(state.hold-.5)/.8)));
  const steer=Math.atan2(2*2.03*Math.sin(error),Math.hypot(dx,dz))/lock;
  stepCanyonKart(state,{throttle:state.speed>6?-.1:1,steer:Math.max(-1,Math.min(1,steer))},1/120,route);
  widest=Math.max(widest,route.nearest(state.x,state.z).distance);
 }
 assert.equal(state.lap,2);assert.ok(state.lastLap>60);assert.ok(widest<.3,'complete the circuit without wall assistance');
});

test('gas moves the kart, brake slows it, and short taps remain smoother than held steering',()=>{
 const state=createCanyonState(route);for(let i=0;i<80;i++)stepCanyonKart(state,{throttle:1},1/120,route);
 assert.ok(state.speed>10);assert.ok(state.elapsed>0);assert.ok(Math.hypot(state.x-route.samples[4].x,state.z-route.samples[4].z)>1);
 const speed=state.speed;for(let i=0;i<25;i++)stepCanyonKart(state,{throttle:-1},1/120,route);assert.ok(state.speed<speed-5);
 const tap=createCanyonState(route),hold=createCanyonState(route);tap.speed=hold.speed=5;
 for(let i=0;i<8;i++)stepCanyonKart(tap,{steer:1,throttle:1},1/120,route);
 for(let i=0;i<100;i++)stepCanyonKart(hold,{steer:1,throttle:1},1/120,route);
 assert.ok(Math.abs(hold.yaw+Math.PI/2)>Math.abs(tap.yaw+Math.PI/2)*3);
});

test('wall impacts stay contained and never replace the chassis heading',()=>{
 const state=createCanyonState(route);state.x=-12;state.z=36;state.yaw=0;state.speed=35;
 const yaw=state.yaw;let maxEnergy=state.speed**2;
 for(let i=0;i<400;i++){
  stepCanyonKart(state,{},1/120,route);
  assert.ok(route.nearest(state.x,state.z).distance<=route.width/2-CANYON_KART_RADIUS+.001);
  const energy=state.speed**2+state.lateral**2;assert.ok(energy<=maxEnergy+.001);maxEnergy=energy;
  assert.equal(state.yaw,yaw);
 }
 assert.ok(Math.hypot(state.speed,state.lateral)<.15);
});

test('lap completion requires all four ordered course quarters',()=>{
 const state=createCanyonState(route);
 const place=p=>{const at=route.samples[Math.floor(p*route.count)];state.x=at.x;state.z=at.z;state.yaw=Math.atan2(at.tx,at.tz);state.speed=2;state.lateral=0;stepCanyonKart(state,{},1/120,route);};
 place(.99);place(.001);assert.equal(state.lap,1,'a start-line crossing alone is not a lap');
 state.nextGate=1;state.progress=.24;place(.251);assert.equal(state.nextGate,2);
 state.progress=.49;place(.501);assert.equal(state.nextGate,3);
 state.progress=.74;place(.751);assert.equal(state.nextGate,4);
 state.progress=.99;place(.001);assert.equal(state.lap,2);assert.ok(state.lastLap>0);
});
