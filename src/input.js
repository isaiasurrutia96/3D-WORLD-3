// Persistent movement contract. Camera-space conversion belongs to main.js;
// the controller accepts a direction and does not know about keyboard events.
export const MOVEMENT_KEYS=new Set(['KeyE','KeyD','KeyS','KeyF','ShiftLeft','ShiftRight','Space','KeyQ']);
export const DRIVING_KEYS=new Set(['ArrowLeft','ArrowRight','ArrowDown']);
export function readMoveAxes(keys) {
  return {
    forward:Number(keys.has('KeyE'))-Number(keys.has('KeyD')),
    right:Number(keys.has('KeyF'))-Number(keys.has('KeyS')),
  };
}

export function readDrivingInput(keys,touch={}) {
  const left=keys.has('KeyS')||keys.has('ArrowLeft'),right=keys.has('KeyF')||keys.has('ArrowRight');
  const brake=keys.has('KeyD')||keys.has('ArrowDown')||touch.secondary||touch.secondaryPressed;
  return {throttle:brake?-1:keys.has('KeyE')||touch.gas?1:0,steer:Math.max(-1,Math.min(1,Number(right)-Number(left)+(touch.right??0))),drift:keys.has('Space')||!!touch.drift};
}

export function wantsSprint(keys) {
  const axes=readMoveAxes(keys);
  return (axes.forward!==0 || axes.right!==0) && !keys.has('ShiftLeft') && !keys.has('ShiftRight');
}
