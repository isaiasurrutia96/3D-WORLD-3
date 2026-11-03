// World units are approximately meters. These are independently tuned prototype
// values, not a port of the original game's physics or animation code.
export const FLOOR_HALF_SIZE = 40;
export const MAX_SPEED = 10;
export const POOL = { minX: 7, maxX: 17, minZ: -6, maxZ: 6, bottom: -4, water: -0.35 };
export const TOWER = { minX: -12, maxX: -6, minZ: -8, maxZ: -2, height: 5 };
export const LADDER = { x: -9, z: -1.45, height: 5 };
export const inPool = (x,z) => x>POOL.minX && x<POOL.maxX && z>POOL.minZ && z<POOL.maxZ;
const onTower = (x,z) => x>TOWER.minX && x<TOWER.maxX && z>TOWER.minZ && z<TOWER.maxZ;
export const floorHeight = (x,z) => onTower(x,z) ? TOWER.height : inPool(x,z) ? POOL.bottom : 0;
const approach = (value, target, step) => value < target
  ? Math.min(target, value + step) : Math.max(target, value - step);

export function createPlayer() {
  return { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, yaw: 0,
    mode: 'land', interactQueued: false, grounded: true, jumpQueued: false, jumpHeld: false, gait: 0, landing: 0 };
}

export function stepPlayer(player, input, dt) {
  const nearLadder = Math.abs(player.x-LADDER.x)<0.9 && Math.abs(player.z-LADDER.z)<1.4;
  if (player.interactQueued) {
    if (player.mode==='climb') { player.mode='land'; player.z=LADDER.z+0.65; player.grounded=false; }
    else if (nearLadder && player.y>=-0.1 && player.y<=LADDER.height+0.1) {
      player.mode='climb'; player.x=LADDER.x; player.z=LADDER.z; player.vx=player.vy=player.vz=0; player.grounded=false;
    }
    player.interactQueued=false;
  }
  if (player.mode==='climb') {
    player.yaw=Math.PI;
    const climb=input.climb||0;
    player.y+=climb*1.8*dt; player.gait=player.y*Math.PI/0.35;
    if(player.jumpQueued){player.mode='land';player.vy=6;player.vz=4;player.z+=0.5;}
    else if(player.y>=LADDER.height && climb>0){player.mode='land';player.y=LADDER.height;player.z=TOWER.maxZ-0.7;player.grounded=true;}
    else if(player.y<=0 && climb<0){player.mode='land';player.y=0;player.z=LADDER.z+0.5;player.grounded=true;}
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
  const acceleration = swimming ? 8 : player.grounded ? (moving ? 34 : 40) : (moving ? 10 : 0);
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
  if(swimming && player.jumpQueued) player.vy=Math.max(player.vy,3.2);
  player.jumpQueued = false;
  player.x += player.vx * dt; player.z += player.vz * dt;
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
    if(atEdge && player.jumpHeld && moving && !input.dive){
      // A ledge exit places Izzy on the closest pool rim.
      const exits=[[Math.abs(player.x-POOL.minX),'x',POOL.minX-0.5],[Math.abs(player.x-POOL.maxX),'x',POOL.maxX+0.5],
        [Math.abs(player.z-POOL.minZ),'z',POOL.minZ-0.5],[Math.abs(player.z-POOL.maxZ),'z',POOL.maxZ+0.5]];
      exits.sort((a,b)=>a[0]-b[0]);player[exits[0][1]]=exits[0][2];player.y=0.1;player.vy=4;player.mode='land';
    }else{
      player.x=Math.max(POOL.minX+0.35,Math.min(POOL.maxX-0.35,player.x));
      player.z=Math.max(POOL.minZ+0.35,Math.min(POOL.maxZ-0.35,player.z));
      const target=POOL.water-1.05;
      const force=input.dive?-8:player.jumpHeld?5:(target-player.y)*8;
      player.vy+=(force-player.vy*3.5)*dt;
      player.y=Math.max(POOL.bottom+0.15,Math.min(POOL.water-0.55,player.y+player.vy*dt));
      if(player.y===POOL.bottom+0.15)player.vy=Math.max(0,player.vy);
      player.gait+=dt*(moving?7:2);return;
    }
  }
  const aboveFloor = Math.abs(player.x) <= FLOOR_HALF_SIZE && Math.abs(player.z) <= FLOOR_HALF_SIZE;
  const ground = floorHeight(player.x,player.z);
  if (!aboveFloor || player.y>ground+0.01) player.grounded = false;
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
