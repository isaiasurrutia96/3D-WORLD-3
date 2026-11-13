import {BlockWorld} from './blocks.js';
import {FOOTPRINT,TERRACES,POND_POLYGON,FALL,ROCK_LAYERS,TREE_PLAN,ROCK_PLAN,inPolygon} from './reference-layout.js';
export const HALF_X=36,HALF_Z=44;
export const POOL={minX:15,maxX:26,minZ:8,maxZ:25,level:.55,bottom:-2};
export {FALL};
export function noise(x,y,z){const n=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453;return n-Math.floor(n);}
// This hash is material grain/color only. It never places or removes scenery.
function mouthVoid(x,z){
 const dx=x+.5-FALL.x,dz=z+.5-FALL.z;
 return dx*FALL.nx+dz*FALL.nz>.05&&Math.abs(dx*FALL.nz-dz*FALL.nx)<FALL.width*.5;
}
export function contains(x,z){return inPolygon(x+.5,z+.5,FOOTPRINT)&&!mouthVoid(x,z);}
export function inPool(x,z){return inPolygon(x+.5,z+.5,POND_POLYGON);}
export function topCell(x,z){
 if(!contains(x,z))return null;
 if(inPool(x,z))return POOL.bottom;
 let height=0;for(const terrace of TERRACES)if(inPolygon(x+.5,z+.5,terrace.polygon))height=Math.max(height,terrace.height);
 return height;
}
export function surfaceHeight(x,z){const y=topCell(Math.floor(x),Math.floor(z));return y===null?null:y+1;}
export function bottomCell(x,z){
 let lowest=-3;
 for(let i=0;i<ROCK_LAYERS.length;i++){
  const [scale,shift]=ROCK_LAYERS[i];
  if(inPolygon((x+.5)/scale,(z+.5-shift)/scale,FOOTPRINT))lowest=-4-i;
 }
 return lowest;
}
export function createLand(){
 const world=new BlockWorld();
 for(let x=-HALF_X;x<HALF_X;x++)for(let z=-HALF_Z;z<HALF_Z;z++){
  const top=topCell(x,z);if(top===null)continue;
  for(let y=bottomCell(x,z);y<=top;y++)world.set(x,y,z,y===top?(inPool(x,z)?'sand':'grass'):y>=top-2?'earth':y>=-3?'earth':'stone');
  if(inPool(x,z)){world.set(x,-1,z,'water');world.set(x,0,z,'water');}
 }
 return world;
}
export const TREE_SITES=TREE_PLAN.map(tree=>[tree.x,tree.z,tree.scale]);
export const ROCK_SITES=ROCK_PLAN.map(rock=>[rock.x,rock.z]);
