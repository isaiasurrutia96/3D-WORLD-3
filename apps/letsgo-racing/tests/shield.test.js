import test from 'node:test';
import assert from 'node:assert/strict';
import {createVehicleState} from '../src/vehicle-controller.js';
import {createItemSystem,useHeldItem,stepItems} from '../src/items.js';
import {activateShield,consumeShield,shieldActive} from '../src/shield.js';
import {resolveKartContact} from '../src/npc/contact.js';
import {createNpcDriver,readNpcInput} from '../src/npc/driver.js';

const flat={supportHeight:()=>0,resolveHorizontal:(x,z,nx,nz)=>({x:nx,z:nz})};
const kart=extra=>({...createVehicleState(),x:0,y:0,z:0,yaw:0,...extra});
const system=()=>{const s=createItemSystem();s.boxes=[];return s;};

test('mixed boxes offer every weapon, Nitro and a single-hit shield',()=>{
 const counts=new Map();
 for(let i=0;i<100;i++){
  const s=createItemSystem(()=>(i+.5)/100),b=s.boxes[0],k=kart({x:b.x,y:b.y,z:b.z});
  stepItems(s,k,k,.01,flat);counts.set(k.heldItem,(counts.get(k.heldItem)??0)+1);
 }
 assert.deepEqual([...counts],[['nitro',20],['shell',20],['banana',20],['torpedo',20],['shield',20]]);
 const s=createItemSystem(()=>.99),b=s.boxes[0],k=kart({x:b.x,y:b.y,z:b.z});s.allowShells=false;stepItems(s,k,k,.01,flat);assert.equal(k.heldItem,'nitro');
});

test('activation holds one charge until impact, and a fresh start has no shield',()=>{
 const s=system(),k=kart({heldItem:'shield',speed:30,boostTime:1});
 assert.equal(useHeldItem(s,k,flat),true);assert.equal(k.heldItem,null);assert.equal(k.shieldHits,1);
 stepItems(s,k,k,60,flat);assert.ok(shieldActive(k));assert.equal(k.speed,30);assert.equal(k.boostTime,1);
 k.heldItem='shield';assert.equal(useHeldItem(s,k,flat),false);assert.equal(k.heldItem,'shield');assert.equal(k.shieldHits,1);
 consumeShield(k);assert.equal(useHeldItem(s,k,flat),true);assert.equal(k.shieldHits,1);
 assert.equal(shieldActive(createVehicleState()),false);
});

for(const item of ['shell','banana','torpedo'])for(const playerTarget of [false,true])test(`${item} consumes one shield and protects the ${playerTarget?'player':'NPC'} without a movement penalty`,()=>{
 const s=system(),target=kart({z:18,speed:40,lateralSpeed:2,boostTime:1}),owner=kart({z:item==='banana'?21:0,heldItem:item});activateShield(target);
 assert.equal(useHeldItem(s,owner,flat,[target]),true);
 let hit=null;
 for(let i=0;i<240&&!hit;i++){
  stepItems(s,playerTarget?target:owner,playerTarget?target:owner,1/120,flat,[{state:playerTarget?owner:target,previous:playerTarget?owner:target}]);
  hit=s.hits.find(h=>h.target===target);
 }
 assert.ok(hit);assert.equal(hit.absorbed,true);assert.equal(target.shieldHits,0);assert.equal(target.speed,40);assert.equal(target.lateralSpeed,2);assert.equal(target.boostTime,1);assert.equal(target.spinTime,0);assert.ok(target.shieldFlash>0);
 assert.equal(item==='shell'?s.shells.length:item==='banana'?s.bananas.length:s.torpedoes.length,0);
});

test('a second real impact in the same frame is not protected by the pop animation',()=>{
 const s=system(),owner=kart({heldItem:'shell'}),target=kart({z:10,speed:40,boostTime:1});activateShield(target);
 useHeldItem(s,owner,flat);owner.heldItem='shell';useHeldItem(s,owner,flat);
 stepItems(s,owner,owner,.12,flat,[{state:target,previous:target}]);
 assert.equal(s.hits.length,2);assert.equal(s.hits.filter(h=>h.absorbed).length,1);assert.equal(target.shieldHits,0);assert.equal(target.spinTime,.75);assert.ok(target.speed<12);assert.equal(target.boostTime,0);
});

for(const reverse of [false,true])test(`a shield ram spends the shield and spins/slows the unshielded kart (${reverse?'NPC attacks':'player attacks'})`,()=>{
 const attacker=kart({speed:40,boostTime:1}),victim=kart({z:2,speed:25,boostTime:1});activateShield(attacker);
 assert.ok(reverse?resolveKartContact(victim,attacker,flat):resolveKartContact(attacker,victim,flat));
 assert.equal(attacker.shieldHits,0);assert.equal(attacker.speed,40);assert.equal(attacker.boostTime,1);assert.equal(attacker.spinTime,0);
 assert.equal(victim.spinTime,.75);assert.ok(Math.abs(victim.speed-7)<1e-8);assert.equal(victim.boostTime,0);assert.equal(victim.yaw,0);
 victim.spinTime=.3;for(let i=0;i<120;i++)resolveKartContact(attacker,victim,flat);assert.equal(victim.spinTime,.3,'resting contact cannot repeatedly trigger a spin');
});

test('two shields block each other and both are spent; separated decks spend neither',()=>{
 const a=kart({speed:40}),b=kart({z:2,speed:25});activateShield(a);activateShield(b);
 resolveKartContact(a,b,flat);assert.equal(a.shieldHits,0);assert.equal(b.shieldHits,0);assert.equal(a.spinTime,0);assert.equal(b.spinTime,0);assert.equal(a.speed,40);assert.equal(b.speed,25);
 activateShield(a);activateShield(b);b.y=8;assert.equal(resolveKartContact(a,b,flat),false);assert.equal(a.shieldHits,1);assert.equal(b.shieldHits,1);
});

test('NPCs activate collected shields but retain a spare while already protected',()=>{
 const npc=createNpcDriver({progress:40});npc.state.heldItem='shield';
 assert.equal(readNpcInput(npc,1/120).useItem,true);activateShield(npc.state);
 assert.equal(readNpcInput(npc,1/120).useItem,false);
});
