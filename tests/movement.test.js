import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlayer, stepPlayer, MAX_SPEED, FLOOR_HALF_SIZE } from '../src/movement.js';
const dt=1/120;
const advance=(p,seconds,input={x:0,z:0})=>{for(let i=0;i<Math.round(seconds/dt);i++)stepPlayer(p,input,dt);};
test('accelerates, caps diagonal speed and brakes to a stop',()=>{
 const p=createPlayer();advance(p,0.1,{x:1,z:1});assert.ok(Math.hypot(p.vx,p.vz)<MAX_SPEED);
 advance(p,0.6,{x:1,z:1});assert.ok(Math.abs(Math.hypot(p.vx,p.vz)-MAX_SPEED)<1e-8);
 advance(p,0.4);assert.equal(p.vx,0);assert.equal(p.vz,0);
});
test('held jump is higher than a tap; both land exactly on the floor',()=>{
 const jump=held=>{const p=createPlayer();p.jumpQueued=true;p.jumpHeld=held;let peak=0;for(let i=0;i<240;i++){stepPlayer(p,{x:0,z:0},dt);peak=Math.max(peak,p.y);}assert.equal(p.y,0);assert.equal(p.grounded,true);return peak;};
 assert.ok(jump(true)>jump(false)+0.4);
});
test('airborne jump requests cannot trigger a second jump',()=>{
 const a=createPlayer(),b=createPlayer();a.jumpQueued=b.jumpQueued=true;a.jumpHeld=b.jumpHeld=true;advance(a,0.1);advance(b,0.1);a.jumpQueued=true;stepPlayer(a,{x:0,z:0},dt);stepPlayer(b,{x:0,z:0},dt);assert.equal(a.vy,b.vy);
});
test('running jump retains momentum without input',()=>{
 const p=createPlayer();advance(p,0.4,{x:0,z:1});p.jumpQueued=true;p.jumpHeld=true;advance(p,0.1);assert.ok(p.y>0);const speed=p.vz;advance(p,0.1);assert.equal(p.vz,speed);
});
test('walking off the slab falls and respawns',()=>{
 const p=createPlayer();p.x=FLOOR_HALF_SIZE+0.1;stepPlayer(p,{x:0,z:0},dt);assert.equal(p.grounded,false);assert.ok(p.y<0);advance(p,2);assert.equal(p.x,0);assert.equal(p.y,0);assert.equal(p.grounded,true);
});

test('ladder grabs, pauses, climbs onto roof and supports descent',async()=>{
 const { LADDER,TOWER }=await import('../src/movement.js');const p=createPlayer();p.x=LADDER.x;p.z=LADDER.z+0.3;p.interactQueued=true;stepPlayer(p,{x:0,z:0},dt);assert.equal(p.mode,'climb');
 const y=p.y;advance(p,0.2);assert.equal(p.y,y);
 advance(p,3.1,{x:0,z:0,climb:1});assert.equal(p.mode,'land');assert.equal(p.y,TOWER.height);assert.equal(p.grounded,true);
 p.interactQueued=true;stepPlayer(p,{x:0,z:0},dt);assert.equal(p.mode,'climb');advance(p,3.1,{x:0,z:0,climb:-1});assert.equal(p.y,0);assert.equal(p.mode,'land');
});
test('ladder jump lets go without reattaching',async()=>{
 const {LADDER}=await import('../src/movement.js');const p=createPlayer();p.x=LADDER.x;p.z=LADDER.z;p.interactQueued=true;stepPlayer(p,{x:0,z:0},dt);advance(p,0.5,{x:0,z:0,climb:1});p.jumpQueued=true;stepPlayer(p,{x:0,z:0},dt);assert.equal(p.mode,'land');assert.ok(p.vy>0);assert.ok(p.z>LADDER.z);
});
test('pool entry, buoyancy, diving and ledge exit',async()=>{
 const {POOL}=await import('../src/movement.js');const p=createPlayer();p.x=12;p.z=0;advance(p,2);assert.equal(p.mode,'swim');assert.ok(p.y<POOL.water);assert.ok(p.y>POOL.bottom);
 const surfaceY=p.y;advance(p,1,{x:0,z:0,dive:true});assert.ok(p.y<surfaceY-0.3);advance(p,2);assert.ok(p.y>POOL.bottom+0.2);
 p.x=POOL.minX+0.4;p.jumpQueued=true;stepPlayer(p,{x:0,z:0},dt);assert.equal(p.mode,'exitPool');const startX=p.x;advance(p,0.25);assert.equal(p.x,startX);assert.ok(p.y<0);advance(p,1.2);assert.equal(p.mode,'land');assert.ok(p.x<POOL.minX);assert.equal(p.y,0);assert.equal(p.grounded,true);
});
test('box sides are solid; roof supports a falling player',async()=>{
 const {TOWER}=await import('../src/movement.js');const p=createPlayer();p.x=-10.5;p.z=-1;advance(p,0.5,{x:0,z:-1});assert.ok(p.z>=TOWER.maxZ+0.34);
 p.x=-9;p.z=-5;p.y=6;p.vy=-1;p.grounded=false;advance(p,0.5);assert.equal(p.y,TOWER.height);assert.equal(p.grounded,true);
});

test('walking or jumping toward the ladder grabs without an interaction key',async()=>{
 const {LADDER}=await import('../src/movement.js');
 for(const height of [0,1.4]){
  const p=createPlayer();Object.assign(p,{x:LADDER.x,z:LADDER.z+0.45,y:height,grounded:height===0,vy:3});
  stepPlayer(p,{x:0,z:-1,climb:1},dt);assert.equal(p.mode,'climb');assert.equal(p.z,LADDER.z);assert.equal(p.vy,0);
 }
});
test('ladder release cooldown prevents immediate automatic reattachment',async()=>{
 const {LADDER}=await import('../src/movement.js');const p=createPlayer();Object.assign(p,{x:LADDER.x,z:LADDER.z+0.4});stepPlayer(p,{x:0,z:-1},dt);p.jumpQueued=true;stepPlayer(p,{x:0,z:0},dt);assert.equal(p.mode,'land');stepPlayer(p,{x:0,z:-1},dt);assert.equal(p.mode,'land');assert.ok(p.ladderCooldown>0);
});
test('merely standing near the ladder or moving away does not grab',async()=>{
 const {LADDER}=await import('../src/movement.js');const p=createPlayer();Object.assign(p,{x:LADDER.x,z:LADDER.z+0.4});stepPlayer(p,{x:0,z:0},dt);assert.equal(p.mode,'land');stepPlayer(p,{x:0,z:1},dt);assert.equal(p.mode,'land');
});

test('pool pull-up works at every edge without directional input',async()=>{
 const {POOL,inPool}=await import('../src/movement.js');
 for(const [x,z] of [[POOL.minX+0.4,0],[POOL.maxX-0.4,0],[17,POOL.minZ+0.4],[17,POOL.maxZ-0.4]]){
  const p=createPlayer();Object.assign(p,{x,z,y:POOL.water-1.05,mode:'swim',grounded:false,jumpQueued:true});stepPlayer(p,{x:0,z:0},dt);assert.equal(p.mode,'exitPool');advance(p,1.3);assert.equal(p.mode,'land');assert.equal(p.y,0);assert.equal(p.grounded,true);assert.equal(inPool(p.x,p.z),false);
 }
});
test('jumping from deep water does not teleport onto the deck',async()=>{
 const {POOL}=await import('../src/movement.js');const p=createPlayer();Object.assign(p,{x:POOL.minX+0.4,z:0,y:POOL.bottom+0.5,mode:'swim',grounded:false,jumpQueued:true});stepPlayer(p,{x:0,z:0},dt);assert.equal(p.mode,'swim');assert.ok(p.y<-2);
});

test('stairs can be climbed and descended without jumping',()=>{
 const p=createPlayer();p.z=7;advance(p,0.95,{x:0,z:1});assert.ok(p.z>16);assert.equal(p.y,2.4);assert.equal(p.grounded,true);
 advance(p,1.5,{x:0,z:-1});assert.ok(p.z<8);assert.equal(p.y,0);assert.equal(p.grounded,true);
});
test('ramp supports grounded movement up and down',()=>{
 const p=createPlayer();p.z=45;advance(p,0.6,{x:0,z:-1});assert.ok(p.y>1);assert.equal(p.grounded,true);
 advance(p,1.5,{x:0,z:1});assert.ok(p.z>46);assert.equal(p.y,0);assert.equal(p.grounded,true);
});
test('platform sides block ground entry, but jumps land on top',()=>{
 const p=createPlayer();p.x=4;p.z=25;advance(p,0.6,{x:-1,z:0});assert.ok(p.x>=3);
 Object.assign(p,{x:0,z:25,y:3.2,vy:-1,grounded:false,vx:0,vz:0});advance(p,0.5);assert.equal(p.y,2.4);assert.equal(p.grounded,true);
});
test('timed short hops can cross both platform gaps',()=>{
 const p=createPlayer();Object.assign(p,{z:19,y:2.4,vz:MAX_SPEED,grounded:true});
 for(const landing of [25,32]){
  p.jumpQueued=true;p.jumpHeld=false;
  let airborne=false;
  for(let frame=0;frame<150;frame++){
   stepPlayer(p,{x:0,z:1},dt);if(!p.grounded)airborne=true;else if(airborne)break;
  }
  assert.equal(p.y,2.4);assert.equal(p.grounded,true);assert.ok(Math.abs(p.z-landing)<2);
 }
});
test('course requires ordered checkpoints, then records completion',async()=>{
 const {createCourse,updateCourse,CHECKPOINTS}=await import('../src/course.js');const course=createCourse(),p=createPlayer();
 Object.assign(p,CHECKPOINTS.at(-1));updateCourse(course,p,dt);assert.equal(course.next,0);
 for(const checkpoint of CHECKPOINTS){Object.assign(p,{x:checkpoint.x,y:checkpoint.y,z:checkpoint.z,mode:checkpoint.name==='SWIM'?'swim':'land',grounded:true,vx:1});updateCourse(course,p,dt);}
 assert.equal(course.finished,true);assert.equal(course.next,CHECKPOINTS.length);const time=course.elapsed;updateCourse(course,p,1);assert.equal(course.elapsed,time);
});

test('kart accelerates, brakes, reverses, and cannot steer while stopped',async()=>{
 const {createKart,stepKart,KART_MAX_SPEED}=await import('../src/driving.js');const kart=createKart();
 for(let i=0;i<360;i++)stepKart(kart,{throttle:1},dt);assert.equal(kart.speed,KART_MAX_SPEED);
 for(let i=0;i<240;i++)stepKart(kart,{brake:1},dt);assert.ok(kart.speed<0);assert.ok(kart.speed>=-8);
 Object.assign(kart,{speed:0,yaw:0});stepKart(kart,{steer:1},dt);assert.equal(kart.yaw,0);
});
test('kart steering changes heading and circuit walls contain it',async()=>{
 const {createKart,stepKart,roadDistance}=await import('../src/driving.js');const kart=createKart();
 for(let i=0;i<1200;i++){stepKart(kart,{throttle:1,steer:0.7},dt);const d=roadDistance(kart.x,kart.z);assert.ok(d>=67.19&&d<=82.81);}
 assert.ok(Math.abs(kart.yaw)>0.5);
});
test('lap counting requires every gate in order',async()=>{
 const {createKart,stepKart}=await import('../src/driving.js');const kart=createKart();stepKart(kart,{},dt);assert.equal(kart.laps,0);
 for(const [x,z] of [[0,175],[-75,0],[0,-175],[75,0]]){Object.assign(kart,{x,z});stepKart(kart,{},dt);}
 assert.equal(kart.laps,1);assert.equal(kart.gate,0);
});

test('the complete oval is drivable at speed and records a lap',async()=>{
 const {createKart,stepKart}=await import('../src/driving.js');const kart=createKart(),r=75,L=400+2*Math.PI*r;
 const point=s=>{s=((s%L)+L)%L;if(s<200)return [r,s-100];s-=200;if(s<Math.PI*r)return [Math.cos(s/r)*r,100+Math.sin(s/r)*r];s-=Math.PI*r;if(s<200)return [-r,100-s];s-=200;return [Math.cos(Math.PI+s/r)*r,-100+Math.sin(Math.PI+s/r)*r];};
 for(let i=0;i<6000 && kart.laps===0;i++){
  let progress;if(kart.z>100)progress=200+Math.atan2(kart.z-100,kart.x)*r;
  else if(kart.z< -100){let angle=Math.atan2(kart.z+100,kart.x);if(angle<0)angle+=Math.PI*2;progress=400+Math.PI*r+(angle-Math.PI)*r;}
  else progress=kart.x>=0?kart.z+100:200+Math.PI*r+100-kart.z;
  const [tx,tz]=point(progress+18),dx=tx-kart.x,dz=tz-kart.z;
  const desired=Math.atan2(dx,dz),error=Math.atan2(Math.sin(desired-kart.yaw),Math.cos(desired-kart.yaw));
  const curvature=2*Math.sin(error)/Math.hypot(dx,dz);
  stepKart(kart,{throttle:1,steer:Math.atan(curvature*2.4)*(1+Math.abs(kart.speed)*0.065)/0.6},dt);
 }
 assert.equal(kart.laps,1);assert.ok(kart.lastLap>20);assert.ok(kart.speed>25);
});
