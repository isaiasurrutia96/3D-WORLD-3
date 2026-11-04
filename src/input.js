// Persistent movement contract. Camera-space conversion belongs to main.js;
// the controller accepts a direction and does not know about keyboard events.
export const MOVEMENT_KEYS=new Set(['KeyE','KeyD','KeyS','KeyF','ShiftLeft','ShiftRight']);
export function readMoveAxes(keys) {
  return {
    forward:Number(keys.has('KeyE'))-Number(keys.has('KeyD')),
    right:Number(keys.has('KeyF'))-Number(keys.has('KeyS')),
  };
}

export function wantsSprint(keys) {
  return keys.has('KeyE') && !keys.has('KeyD') && (keys.has('ShiftLeft') || keys.has('ShiftRight'));
}
