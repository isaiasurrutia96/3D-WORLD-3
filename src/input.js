// Persistent movement contract. Camera-space conversion belongs to main.js;
// the controller accepts a direction and does not know about keyboard events.
export const MOVEMENT_KEYS=new Set(['KeyE','KeyD','KeyS','KeyF','ShiftLeft','ShiftRight','Space','KeyQ']);
export const DRIVING_STEERING_KEYS=new Set(['ArrowLeft','ArrowRight']);
export function readMoveAxes(keys) {
  return {
    forward:Number(keys.has('KeyE'))-Number(keys.has('KeyD')),
    right:Number(keys.has('KeyF'))-Number(keys.has('KeyS')),
  };
}

export function readDrivingInput(keys,touch={}) {
  const axes=readMoveAxes(keys);
  const left=keys.has('KeyS')||keys.has('ArrowLeft'),right=keys.has('KeyF')||keys.has('ArrowRight');
  const keyboardThrottle=keys.has('KeyE')||keys.has('KeyD');
  return {throttle:touch.secondary||touch.secondaryPressed?-1:keyboardThrottle?axes.forward:touch.gas?1:0,steer:Math.max(-1,Math.min(1,Number(right)-Number(left)+(touch.right??0))),drift:keys.has('Space')||!!touch.drift,eBrake:keys.has('Space')};
}

export function wantsSprint(keys) {
  const axes=readMoveAxes(keys);
  return (axes.forward!==0 || axes.right!==0) && !keys.has('ShiftLeft') && !keys.has('ShiftRight');
}
