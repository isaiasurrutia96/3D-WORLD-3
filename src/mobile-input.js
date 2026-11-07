const clamp=value=>Math.max(-1,Math.min(1,value));
export const GAS_DRIFT_SWIPE=52;
const GAS_DRIFT_RELEASE=24;

export function stickDirection(dx,dy,radius){
 const x=dx/Math.max(1,radius),y=-dy/Math.max(1,radius),length=Math.hypot(x,y);
 if(length<=.1)return{right:0,forward:0};
 const strength=Math.min(1,(length-.1)/.9);
 return{right:x/length*strength,forward:y/length*strength};
}

// Each finger owns its input until release/cancellation. A quick primary tap
// is queued so it cannot disappear between fixed simulation steps.
export function createMobileInput(){
 const held=new Map();let stick=null,pedal=null,right=0,forward=0,primaryPressed=false,secondaryPressed=false;
 const isHeld=action=>[...held.values()].includes(action);
 function read(){return{right:clamp(right+Number(isHeld('right'))-Number(isHeld('left'))),forward,primary:isHeld('primary'),primaryPressed,secondary:isHeld('secondary'),secondaryPressed,gas:pedal!==null,drift:pedal?.drift??false};}
 return{
  isHeld,
  beginStick(id){if(stick!==null&&stick!==id)return false;stick=id;return true;},
  moveStick(id,axes){if(stick===id){right=clamp(axes.right);forward=clamp(axes.forward);}},
  beginGas(id,y){if(pedal!==null)return false;pedal={id,y,drift:false};return true;},
  moveGas(id,y){
   if(pedal?.id!==id)return;
   // Separate entry/release thresholds prevent finger jitter toggling drift.
   const rise=pedal.y-y;
   if(rise>=GAS_DRIFT_SWIPE)pedal.drift=true;
   else if(rise<=GAS_DRIFT_RELEASE)pedal.drift=false;
  },
  hold(id,action){if(![...held.values()].includes(action)){if(action==='primary')primaryPressed=true;else if(action==='secondary')secondaryPressed=true;}held.set(id,action);},
  release(id,cancelled=false){
   if(stick===id){stick=null;right=0;forward=0;}
   if(pedal?.id===id)pedal=null;
   const action=held.get(id);held.delete(id);
   if(cancelled&&action==='primary'&&![...held.values()].includes('primary'))primaryPressed=false;
   if(cancelled&&action==='secondary'&&![...held.values()].includes('secondary'))secondaryPressed=false;
  },
  peek:read,
  consume(){const value=read();primaryPressed=false;secondaryPressed=false;return value;},
  reset(){held.clear();stick=null;pedal=null;right=0;forward=0;primaryPressed=false;secondaryPressed=false;},
 };
}
