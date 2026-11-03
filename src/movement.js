// World units are approximately meters. These are independently tuned prototype
// values, not a port of the original game's physics or animation code.
export const FLOOR_HALF_SIZE = 16;
export const MAX_SPEED = 6.4;
const approach = (value, target, step) => value < target
  ? Math.min(target, value + step) : Math.max(target, value - step);

export function createPlayer() {
  return { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, yaw: 0,
    grounded: true, jumpQueued: false, jumpHeld: false, gait: 0, landing: 0 };
}

export function stepPlayer(player, input, dt) {
  let { x, z } = input;
  const magnitude = Math.hypot(x, z);
  if (magnitude > 1) { x /= magnitude; z /= magnitude; }
  const moving = magnitude > 0.01;
  const acceleration = player.grounded ? (moving ? 22 : 27) : (moving ? 7 : 0);
  // Limit the whole velocity change, so diagonals accelerate at the same rate.
  const dx = x * MAX_SPEED - player.vx, dz = z * MAX_SPEED - player.vz;
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
  player.jumpQueued = false;
  player.x += player.vx * dt; player.z += player.vz * dt;
  const aboveFloor = Math.abs(player.x) <= FLOOR_HALF_SIZE && Math.abs(player.z) <= FLOOR_HALF_SIZE;
  if (!aboveFloor) player.grounded = false;
  if (!player.grounded) {
    // Releasing jump early increases downward acceleration for a short hop.
    player.vy -= (player.vy > 0 && !player.jumpHeld ? 42 : 24) * dt;
    player.y += player.vy * dt;
    if (aboveFloor && player.y <= 0 && player.vy <= 0) {
      player.y = 0; player.vy = 0; player.grounded = true; player.landing = 1;
    }
  }
  player.gait += Math.hypot(player.vx,player.vz) * dt * 3.7;
  player.landing = Math.max(0, player.landing - dt * 7);
  if (player.y < -12) Object.assign(player, createPlayer());
}
