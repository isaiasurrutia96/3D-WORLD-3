// One charge, shared by projectile protection and offensive kart contact.
// There is no timed expiry: the next distinct impact spends the shield.
export const SHIELD_POP_SECONDS=.22;
export const shieldActive=state=>(state.shieldHits??0)>0;

export function activateShield(state){
 if(shieldActive(state))return false;
 state.shieldHits=1;state.shieldFlash=0;return true;
}
export function consumeShield(state){
 if(!shieldActive(state))return false;
 state.shieldHits=0;state.shieldFlash=SHIELD_POP_SECONDS;return true;
}
export function stepShield(state,dt){
 state.shieldFlash=Math.max(0,(state.shieldFlash??0)-dt);
}
