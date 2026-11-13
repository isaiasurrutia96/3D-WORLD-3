import {BlockWorld} from './blocks.js';
export const HALF_X=39,HALF_Z=31;
export const POOL={minX:31,maxX:39,minZ:1,maxZ:10,level:.78,bottom:-2};
export function noise(x,y,z){const n=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453;return n-Math.floor(n);}
export function contains(x,z){
 const ax=Math.abs(x+.5),az=Math.abs(z+.5),corner=Math.max(0,ax-(HALF_X-6))+Math.max(0,az-(HALF_Z-6));
 const edge=.5+(Math.sin(Math.floor(x/4)*2.1)+Math.cos(Math.floor(z/4)*1.6))*.3;
 return ax<HALF_X&&az<HALF_Z&&corner<7.4+edge;
}
export function inPool(x,z){return x>=POOL.minX&&x<POOL.maxX&&z>=POOL.minZ&&z<POOL.maxZ;}
function terrace(x,z,cx,cz,rx,rz){return Math.abs((x-cx)/rx)**6+Math.abs((z-cz)/rz)**6<=1;}
export function topCell(x,z){
 if(!contains(x,z))return null;
 if(inPool(x,z))return POOL.bottom;
 if(terrace(x,z,16,-21,16,8))return 4;
 if(terrace(x,z,14,-20,22,10))return 2;
 if(x>=-12&&x<=-8&&z>=-25&&z<=-15)return 1;
 if(x>=-2&&x<=1&&z>=-24&&z<=-18)return 3;
 return 0;
}
export function surfaceHeight(x,z){const y=topCell(Math.floor(x),Math.floor(z));return y===null?null:y+1;}
export function bottomCell(x,z){
 const r=Math.max(Math.abs((x+.5)/HALF_X),Math.abs((z+.5)/HALF_Z));
 const core=22*Math.pow(Math.max(0,1-r),.85);
 const lobeA=20*Math.exp(-(((x+13)/17)**2+((z-13)/12)**2));
 const lobeB=17*Math.exp(-(((x-18)/13)**2+((z-7)/18)**2));
 const broken=3.7*noise(Math.floor(x/2),0,Math.floor(z/2))+.8*Math.sin(x*.5-z*.3);
 return-Math.round(5+Math.max(core,lobeA,lobeB)+broken);
}
export function createLand(){
 const world=new BlockWorld();
 for(let x=-HALF_X;x<HALF_X;x++)for(let z=-HALF_Z;z<HALF_Z;z++){
  const top=topCell(x,z);if(top===null)continue;
  for(let y=bottomCell(x,z);y<=top;y++)world.set(x,y,z,y===top?'grass':y>=Math.min(top-2,-3)?'earth':'stone');
  if(inPool(x,z)){world.set(x,-1,z,'water');world.set(x,0,z,'water');}
 }
 return world;
}
export const TREE_SITES=[[-29,13,1.25],[-26,-20,.88],[22,-23,1.05],[31,-7,.92],[32,21,1.12]];
export const ROCK_SITES=[[-26,23],[-22,24],[10,-23],[14,-24],[28,-15],[29,12],[30,-2]];
