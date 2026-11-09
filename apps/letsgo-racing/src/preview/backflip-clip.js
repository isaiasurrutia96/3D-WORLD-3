export {createBackflipClip,BACKFLIP_DURATION,TAKEOFF,TOUCHDOWN,PHASES,KEYS,sampleBackflip} from '../animation/backflip-clip.js';
import reference from '../../references/sm64-backflip.json' with {type:'json'};
// Kept only for inspecting the original two-turn reference, independently of
// the revised one-turn standing move used by the game.
export const referenceTurns=[];
for(const frame of reference.frames){let value=frame[8]/65536*360;const previous=referenceTurns.at(-1);if(previous!==undefined){while(value-previous>180)value-=360;while(value-previous< -180)value+=360;}referenceTurns.push(value);}
