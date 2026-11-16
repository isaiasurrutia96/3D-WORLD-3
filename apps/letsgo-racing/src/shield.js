// One charge, shared by projectile protection and offensive kart contact.
// Protection ends on the first impact or after 15 seconds, whichever is first.
export const SHIELD_SECONDS=15,SHIELD_WARNING_SECONDS=3,SHIELD_POP_SECONDS=.22;
export const shieldActive=state=>(state.shieldHits??0)>0&&(state.shieldTime??0)>0;

export function activateShield(state){
 if(shieldActive(state))return false;
 state.shieldHits=1;state.shieldTime=SHIELD_SECONDS;state.shieldFlash=0;return true;
}
export function consumeShield(state){
 if(!shieldActive(state))return false;
 state.shieldHits=0;state.shieldTime=0;state.shieldFlash=SHIELD_POP_SECONDS;return true;
}
export function stepShield(state,dt){
 state.shieldFlash=Math.max(0,(state.shieldFlash??0)-dt);
 if((state.shieldHits??0)>0){
  state.shieldTime=Math.max(0,(state.shieldTime??0)-dt);
  if(state.shieldTime<1e-8){state.shieldHits=0;state.shieldTime=0;state.shieldFlash=SHIELD_POP_SECONDS;}
 }
}
