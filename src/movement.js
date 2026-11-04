import {roadDistance} from './driving.js';
import { COURSE_SURFACES, contains, surfaceHeight } from './course.js';
// World units are approximately meters. These are independently tuned prototype
// values, not a port of the original game's physics or animation code.
export const FLOOR_HALF_SIZE = 130;
export const FLOOR_HALF_LENGTH = 230;
export const MAX_SPEED = 11.5;
export const POOL = { minX: 7, maxX: 27, minZ: -10, maxZ: 10, bottom: -4, water: -0.35 };
export const TOWER = { minX: -12, maxX: -6, minZ: -8, maxZ: -2, height: 5 };
export const LADDER = { x: -9, z: -1.45, height: 5 };
export const inPool = (x,z) => x>POOL.minX && x<POOL.maxX && z>POOL.minZ && z<POOL.maxZ;
const onTower = (x,z) => x>TOWER.minX && x<TOWER.maxX && z>TOWER.minZ && z<TOWER.maxZ;
export const floorHeight = (x,z) => {
  let height=onTower(x,z)?TOWER.height:inPool(x,z)?POOL.bottom:0;
  for(const surface of COURSE_SURFACES)if(contains(surface,x,z))height=Math.max(height,surfaceHeight(surface,z));
  return height;
};
const approach = (value, target, step) => value < target
  ? Math.min(target, value + step) : Math.max(target, value - step);

export function createPlayer() {
  return { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, yaw: 0,
    mode: 'land', ladderCooldown: 0, interactQueued: false, grounded: true, jumpQueued: false, jumpHeld: false, gait: 0, landing: 0 };
}

export function stepPlayer(player, input, dt) {
  if(player.mode==='exitPool') {
    const exit=player.poolExit;exit.time=Math.min(exit.duration,exit.time+dt);
    const t=exit.time/exit.duration;
    const smooth=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);};
    const across=smooth((t-0.48)/0.52);
    player.x=exit.x+(exit.toX-exit.x)*across;player.z=exit.z+(exit.toZ-exit.z)*across;
    player.y=t<0.7 ? exit.y+(0.18-exit.y)*smooth(t/0.7) : 0.18*(1-smooth((t-0.7)/0.3));
    player.vx=player.vy=player.vz=0;player.jumpQueued=false;player.interactQueued=false;
    if(t>=1){player.mode='land';player.y=0;player.grounded=true;player.landing=0.4;player.poolExit=null;}
    return;
  }
  player.ladderCooldown=Math.max(0,player.ladderCooldown-dt);
  const nearLadder = Math.abs(player.x-LADDER.x)<0.9 && Math.abs(player.z-LADDER.z)<1.4;
  const touchingFront=Math.abs(player.x-LADDER.x)<0.65 && player.z>LADDER.z-0.25 && player.z<LADDER.z+0.6;
  const approachingFront=touchingFront && input.z<-0.05 && player.y<LADDER.height-0.1;
  const descendingFromRoof=nearLadder && player.y>=LADDER.height-0.1 && (input.climb||0)<0;
  if(player.mode==='land' && player.ladderCooldown===0 && player.y>=-0.1 && player.y<=LADDER.height+0.1 && (approachingFront||descendingFromRoof)){
    player.mode='climb';player.x=LADDER.x;player.z=LADDER.z;player.vx=player.vy=player.vz=0;player.grounded=false;
    player.jumpQueued=false;
  }
  if (player.interactQueued) {
    if (player.mode==='climb') { player.mode='land'; player.z=LADDER.z+0.65; player.grounded=false; player.ladderCooldown=0.65; }
    else if (nearLadder && player.y>=-0.1 && player.y<=LADDER.height+0.1) {
      player.mode='climb'; player.x=LADDER.x; player.z=LADDER.z; player.vx=player.vy=player.vz=0; player.grounded=false;
    }
    player.interactQueued=false;
  }
  if (player.mode==='climb') {
    player.yaw=Math.PI;
    const climb=input.climb||0;
    player.y+=climb*1.8*dt; player.gait=player.y*Math.PI/0.35;
    if(player.jumpQueued){player.mode='land';player.vy=6;player.vz=4;player.z+=0.5;player.ladderCooldown=0.65;}
    else if(player.y>=LADDER.height && climb>0){player.mode='land';player.y=LADDER.height;player.z=TOWER.maxZ-0.7;player.grounded=true;player.ladderCooldown=0.65;}
    else if(player.y<=0 && climb<0){player.mode='land';player.y=0;player.z=LADDER.z+0.5;player.grounded=true;player.ladderCooldown=0.65;}
    player.jumpQueued=false;
    return;
  }
  const swimming=inPool(player.x,player.z) && player.y<POOL.water-0.5;
  player.mode=swimming?'swim':'land';
  if(swimming) player.grounded=false;
  let { x, z } = input;
  const magnitude = Math.hypot(x, z);
  if (magnitude > 1) { x /= magnitude; z /= magnitude; }
  const moving = magnitude > 0.01;
  const acceleration = swimming ? 8 : player.grounded ? (moving ? 44 : 48) : (moving ? 10 : 0);
  // Limit the whole velocity change, so diagonals accelerate at the same rate.
  const speed = swimming ? 3.7 : MAX_SPEED;
  const dx = x * speed - player.vx, dz = z * speed - player.vz;
  const delta = Math.hypot(dx, dz);
  const factor = delta ? Math.min(1, acceleration * dt / delta) : 0;
  player.vx += dx * factor; player.vz += dz * factor;
  if (moving) {
    const desiredYaw = Math.atan2(x, z);
    const difference = Math.atan2(Math.sin(desiredYaw-player.yaw), Math.cos(desiredYaw-player.yaw));
    player.yaw += approach(0, difference, (player.grounded ? 11 : 4) * dt);
  }
  if (player.jumpQueued && player.grounded) {
    player.vy = 8.5 + Math.min(Math.hypot(player.vx,player.vz) * 0.12, 0.7);
    player.grounded = false;
  }
  const jumpPressed=player.jumpQueued;
  if(swimming && player.jumpQueued) player.vy=Math.max(player.vy,3.2);
  player.jumpQueued = false;
  const previousX=player.x,previousZ=player.z;
  player.x += player.vx * dt; player.z += player.vz * dt;
  // Low circuit barriers can be jumped; the infield gate remains open.
  if(player.y<0.7){
    const before=roadDistance(previousX,previousZ),after=roadDistance(player.x,player.z);
    const gate=player.x>60&&Math.abs(player.z)<10;
    let boundary=null;
    if(!gate && before<66 && after>65.4)boundary=65.4;
    else if(!gate && before>=66 && before<=84 && after<66.6)boundary=66.6;
    if(before<=84 && before>=66 && after>83.4)boundary=83.4;
    else if(before>84 && after<84.6)boundary=84.6;
    if(boundary!==null){
      const spine=Math.max(-100,Math.min(100,player.z)),distance=roadDistance(player.x,player.z);
      player.x=player.x/distance*boundary;player.z=spine+(player.z-spine)/distance*boundary;player.vx=player.vz=0;
    }
  }
  // Small stair risers are walkable; raised platform sides block entry.
  for(const surface of COURSE_SURFACES){
    if(!contains(surface,player.x,player.z))continue;
    const height=surfaceHeight(surface,player.z);
    const canStep=player.grounded && height-player.y<=0.34;
    if(height>player.y+0.04 && !canStep){
      player.x=previousX;player.z=previousZ;player.vx=player.vz=0;
      break;
    }
  }
  // Solid tower sides; the roof is a walkable landing surface.
  if(player.y<TOWER.height-0.05 && player.y+2.4>0 &&
    player.x>TOWER.minX-0.35 && player.x<TOWER.maxX+0.35 && player.z>TOWER.minZ-0.35 && player.z<TOWER.maxZ+0.35){
    const sides=[ [Math.abs(player.x-(TOWER.minX-0.35)),'x',TOWER.minX-0.35],
      [Math.abs(player.x-(TOWER.maxX+0.35)),'x',TOWER.maxX+0.35],
      [Math.abs(player.z-(TOWER.minZ-0.35)),'z',TOWER.minZ-0.35],
      [Math.abs(player.z-(TOWER.maxZ+0.35)),'z',TOWER.maxZ+0.35] ];
    sides.sort((a,b)=>a[0]-b[0]);player[sides[0][1]]=sides[0][2];player[sides[0][1]==='x'?'vx':'vz']=0;
  }
  if(swimming){
    const atEdge=player.x<POOL.minX+0.5||player.x>POOL.maxX-0.5||player.z<POOL.minZ+0.5||player.z>POOL.maxZ-0.5;
    if(atEdge && jumpPressed && !input.dive && player.y>=POOL.water-1.65){
      const exits=[[Math.abs(player.x-POOL.minX),'x',POOL.minX-0.75,-1,0],[Math.abs(player.x-POOL.maxX),'x',POOL.maxX+0.75,1,0],
        [Math.abs(player.z-POOL.minZ),'z',POOL.minZ-0.75,0,-1],[Math.abs(player.z-POOL.maxZ),'z',POOL.maxZ+0.75,0,1]];
      exits.sort((a,b)=>a[0]-b[0]);const edge=exits[0];
      player.poolExit={time:0,duration:0.65,x:player.x,y:player.y,z:player.z,toX:edge[1]==='x'?edge[2]:player.x,toZ:edge[1]==='z'?edge[2]:player.z};
      player.yaw=Math.atan2(edge[3],edge[4]);player.mode='exitPool';player.grounded=false;player.vx=player.vy=player.vz=0;
      return;
    }else{
      player.x=Math.max(POOL.minX+0.35,Math.min(POOL.maxX-0.35,player.x));
      player.z=Math.max(POOL.minZ+0.35,Math.min(POOL.maxZ-0.35,player.z));
      const target=POOL.water-1.5;
      const force=input.dive?-8:player.jumpHeld?5:(target-player.y)*8;
      player.vy+=(force-player.vy*3.5)*dt;
      player.y=Math.max(POOL.bottom+0.15,Math.min(POOL.water-0.95,player.y+player.vy*dt));
      if(player.y===POOL.bottom+0.15)player.vy=Math.max(0,player.vy);
      player.gait+=dt*(moving?7:2);return;
    }
  }
  const aboveFloor = Math.abs(player.x) <= FLOOR_HALF_SIZE && Math.abs(player.z) <= FLOOR_HALF_LENGTH;
  const ground = floorHeight(player.x,player.z);
  if(player.grounded && aboveFloor && ground-player.y<=0.34 && player.y-ground<=0.5)player.y=ground;
  else if (!aboveFloor || player.y>ground+0.01) player.grounded = false;
  if (!player.grounded) {
    // Releasing jump early increases downward acceleration for a short hop.
    player.vy -= (player.vy > 0 && !player.jumpHeld ? 42 : 24) * dt;
    player.y += player.vy * dt;
    if (aboveFloor && player.y <= ground && player.vy <= 0) {
      player.y = ground; player.vy = 0; player.grounded = true; player.landing = 1;
    }
  }
  // A readable running cadence instead of rapidly shuffling through tiny steps.
  player.gait += Math.min(18, Math.hypot(player.vx,player.vz) * 2.3) * dt;
  player.landing = Math.max(0, player.landing - dt * 7);
  if (player.y < -12) Object.assign(player, createPlayer());
}
