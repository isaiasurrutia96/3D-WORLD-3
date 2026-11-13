import {TREE_SITES,ROCK_SITES,surfaceHeight,noise} from './layout.js';
function cuboid(world,x,y,z,sx,sy,sz,type){for(let a=0;a<sx;a++)for(let b=0;b<sy;b++)for(let c=0;c<sz;c++)world.set(x+a,y+b,z+c,type);}
function tree(world,x,z,scale){
 const base=surfaceHeight(x,z),h=Math.round(7*scale),radius=Math.round(4*scale);
 cuboid(world,x,base,z,2,h,2,'trunk');
 for(const [dx,dz]of [[-1,0],[2,0],[0,-1],[0,2]])cuboid(world,x+dx,base,z+dz,1,1,1,'trunk');
 for(let dy=-2;dy<=3;dy++)for(let dx=-radius-1;dx<=radius+1;dx++)for(let dz=-radius-1;dz<=radius+1;dz++){
  const shape=((dx-.5)/(radius+.4))**2+((dz-.5)/(radius+.1))**2+((dy-.3)/(radius*.8))**2;
  if(shape<1+noise(x+dx,dy,z+dz)*.15)world.set(x+dx,base+h+dy,z+dz,noise(dx,dy,dz)>.78?'leafLight':'leaf');
 }
 cuboid(world,x-radius,base+h-2,z,2,2,3,'leaf');
 cuboid(world,x+radius-1,base+h-1,z-1,2,2,2,'leafLight');
}
function rockPile(world,x,z){
 const y=surfaceHeight(x,z);if(y===null)return;
 for(const [dx,dy,dz]of [[0,0,0],[1,0,0],[0,0,1],[1,0,1],[0,1,0],[2,0,1]])world.set(x+dx,y+dy,z+dz,'rock');
}
function shrub(world,x,z){
 const y=surfaceHeight(x,z);if(y===null)return;
 for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){
  world.set(x+dx,y,z+dz,'leaf');if(dx*dx+dz*dz<=1)world.set(x+dx,y+1,z+dz,'leafLight');
 }
 for(const [dx,dz]of [[-1,0],[1,1],[0,-1]])world.set(x+dx,y+1,z+dz,'berry');
}
export function addScenery(world){
 for(const [x,z,s]of TREE_SITES)tree(world,x,z,s);
 for(const [x,z]of ROCK_SITES)rockPile(world,x,z);
 for(const [x,z]of [[-32,24],[-31,-8],[-5,-25],[29,26],[34,8],[4,-26]])shrub(world,x,z);
 // Keep the center open; the short stone path follows the back-left edge.
 for(let x=-29;x<=-16;x++)for(let z=-16;z<=-14;z++)if(noise(x,0,z)>.15){const y=surfaceHeight(x,z);if(y!==null)world.set(x,y-1,z,'path');}
 return world;
}
