export const RUN_SPEED = 5.5;
export const STEP = 1 / 120;
export const STRIDE_LENGTH = 1.6;
const approach = (value, target, amount) => value < target
  ? Math.min(target, value + amount) : Math.max(target, value - amount);

export function createRunner() {
  return { x: 0, z: 0, yaw: 0, speed: 0, distance: 0 };
}

// Running is the only locomotion state. Shift and Space are not inputs here.
export function stepRunner(state, input, dt = STEP) {
  const magnitude = Math.hypot(input.x, input.z);
  const moving = magnitude > 0.01;
  const desired = moving ? Math.atan2(input.x, input.z) : state.yaw;
  let difference = Math.atan2(Math.sin(desired - state.yaw), Math.cos(desired - state.yaw));
  if (moving && state.speed < 0.02) {
    state.yaw = desired;
    difference = 0;
  }
  const target = moving ? RUN_SPEED * Math.max(0.15, Math.cos(difference / 2)) : 0;
  state.speed = approach(state.speed, target, (moving ? 18 : 20) * dt);
  state.yaw += Math.max(-8 * dt, Math.min(8 * dt, difference));
  const previousX = state.x, previousZ = state.z;
  state.x = Math.max(-129, Math.min(129, state.x + Math.sin(state.yaw) * state.speed * dt));
  state.z = Math.max(-229, Math.min(229, state.z + Math.cos(state.yaw) * state.speed * dt));
  const travelled = Math.hypot(state.x - previousX, state.z - previousZ);
  state.distance += travelled;
  if (moving && travelled < state.speed * dt * 0.1) state.speed = 0;
}
