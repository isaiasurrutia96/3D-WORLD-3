const clamp=value=>Math.max(-1,Math.min(1,value));

export function stickDirection(dx,dy,radius){
 const x=dx/Math.max(1,radius),y=-dy/Math.max(1,radius),length=Math.hypot(x,y);
 if(length<=.1)return{right:0,forward:0};
 const strength=Math.min(1,(length-.1)/.9);
 return{right:x/length*strength,forward:y/length*strength};
}

// Each finger owns its input until release/cancellation. A quick primary tap
// is queued so it cannot disappear between fixed simulation steps.
export function createMobileInput(){
 const held=new Map();let stick=null,right=0,forward=0,primaryPressed=false,secondaryPressed=false;
 function read(){return{right,forward,primary:[...held.values()].includes('primary'),primaryPressed,secondary:[...held.values()].includes('secondary'),secondaryPressed};}
 return{
  beginStick(id){if(stick!==null&&stick!==id)return false;stick=id;return true;},
  moveStick(id,axes){if(stick===id){right=clamp(axes.right);forward=clamp(axes.forward);}},
  hold(id,action){if(![...held.values()].includes(action)){if(action==='primary')primaryPressed=true;else if(action==='secondary')secondaryPressed=true;}held.set(id,action);},
  release(id,cancelled=false){
   if(stick===id){stick=null;right=0;forward=0;}
   const action=held.get(id);held.delete(id);
   if(cancelled&&action==='primary'&&![...held.values()].includes('primary'))primaryPressed=false;
   if(cancelled&&action==='secondary'&&![...held.values()].includes('secondary'))secondaryPressed=false;
  },
  peek:read,
  consume(){const value=read();primaryPressed=false;secondaryPressed=false;return value;},
  reset(){held.clear();stick=null;right=0;forward=0;primaryPressed=false;secondaryPressed=false;},
 };
}
