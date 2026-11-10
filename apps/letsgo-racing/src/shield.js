export const SHIELD_SECONDS=12,SHIELD_HITS=2,SHIELD_WARNING_SECONDS=3;
const events=new WeakMap();

export function shieldActive(state){return state.shieldTime>0&&state.shieldHits>0;}
export function activateShield(state){
 state.shieldTime=SHIELD_SECONDS;state.shieldHits=SHIELD_HITS;state.shieldAge=0;state.shieldFlash=0;state.shieldRunning=true;
 events.set(state,new WeakMap());
}
export function stepShield(state,dt){
 if(!state.shieldRunning)return;
 state.shieldAge=(state.shieldAge??0)+dt;
 state.shieldTime=Math.max(0,(state.shieldTime??0)-dt);
 if(state.shieldTime<1e-8){state.shieldTime=0;state.shieldHits=0;}
 state.shieldFlash=Math.max(0,(state.shieldFlash??0)-dt);
 if(state.shieldAge>=SHIELD_SECONDS-1e-8){state.shieldAge=SHIELD_SECONDS;state.shieldRunning=false;}
}
// Tokens identify real projectiles or one sustained kart contact. A consumed
// shield still absorbs the remainder of that same impact, until its old expiry.
export function absorbShieldImpact(state,kind,token){
 let seen=events.get(state);if(!seen){seen=new WeakMap();events.set(state,seen);}
 if(token&&seen.has(token))return (state.shieldAge??0)+1e-8<seen.get(token);
 if(!shieldActive(state))return false;
 if(token)seen.set(token,(state.shieldAge??0)+state.shieldTime);
 state.shieldHits=kind==='torpedo'?0:Math.max(0,state.shieldHits-1);
 if(!state.shieldHits)state.shieldTime=0;
 state.shieldFlash=.3;state.shieldLastImpact=kind;state.shieldImpactCount=(state.shieldImpactCount??0)+1;
 return true;
}

export function shieldOpacity(state){
 if(!shieldActive(state))return 0;
 const warning=state.shieldTime<=SHIELD_WARNING_SECONDS;
 return state.shieldFlash>0?.45:warning?.04+.19*(.5+.5*Math.sin(state.shieldTime*18)):.14;
}
