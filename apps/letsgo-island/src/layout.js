import {BlockWorld} from './blocks.js';
export const HALF_X=39,HALF_Z=31;
export function noise(x,y,z){const n=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453;return n-Math.floor(n);}
export function contains(x,z){
 const ax=Math.abs(x+.5),az=Math.abs(z+.5);
 return ax<HALF_X&&az<HALF_Z&&Math.max(0,ax-(HALF_X-6))+Math.max(0,az-(HALF_Z-6))<8;
}
// The larger upper lawn sits behind the broad open main lawn.
export function topCell(x,z){
 if(!contains(x,z))return null;
 if(x>=2&&x<=32&&z>=-28&&z<=-16)return 4;
 if(x>=-7&&x<=35&&z>=-29&&z<=-11)return 2;
 if(x>=-12&&x<=-8&&z>=-25&&z<=-15)return 1;
 if(x>=-2&&x<=1&&z>=-25&&z<=-18)return 3;
 return 0;
}
export function surfaceHeight(x,z){const y=topCell(Math.floor(x),Math.floor(z));return y===null?null:y+1;}
export function bottomCell(x,z){
 const r=Math.max(Math.abs((x+.5)/HALF_X),Math.abs((z+.5)/HALF_Z));
 const taper=Math.max(0,1-r),fold=.7*Math.sin(x*.32)+.8*Math.cos(z*.27);
 return-Math.round(7+29*Math.pow(taper,.85)+fold+noise(x,0,z)*1.5);
}
export function createLand(){
 const world=new BlockWorld();
 for(let x=-HALF_X;x<HALF_X;x++)for(let z=-HALF_Z;z<HALF_Z;z++){
  const top=topCell(x,z);if(top===null)continue;
  for(let y=bottomCell(x,z);y<=top;y++)world.set(x,y,z,y===top?'grass':y>=Math.min(top-2,-3)?'earth':'stone');
 }
 return world;
}
export const TREE_SITES=[[-29,13,1.2],[-26,-20,.85],[22,-23,1.02],[31,-7,.87],[32,18,1.08]];
export const ROCK_SITES=[[-26,23],[-21,24],[11,-23],[15,-24],[28,-15],[33,25],[-32,-8]];
