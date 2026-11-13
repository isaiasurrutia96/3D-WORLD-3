import {TREE_SITES,ROCK_SITES,surfaceHeight,noise,inPool} from './layout.js';
function cuboid(world,x,y,z,sx,sy,sz,type){for(let a=0;a<sx;a++)for(let b=0;b<sy;b++)for(let c=0;c<sz;c++)world.set(x+a,y+b,z+c,type);}
function tree(world,x,z,scale){
 const base=surfaceHeight(x,z),h=Math.round(7*scale);
 cuboid(world,x,base,z,2,h,2,'trunk');
 for(const [dx,dz]of [[-1,0],[2,0],[0,-1],[0,2]])cuboid(world,x+dx,base,z+dz,1,1,1,'trunk');
 for(let t=0;t<4;t++){world.set(x-1,base+h-4+t,z,'trunk');world.set(x+2,base+h-3+t,z+1,'trunk');}
 // Intersecting crowns reproduce the reference's lobed, irregular tree silhouettes.
 const crowns=[[-2.2,0,.3,2.7,2.4,2.8],[2,0,1,2.9,2.5,2.7],[0,2.2,0,3,2.6,2.8],[-1.5,1.2,-2.2,2.7,2.4,2.5],[2.3,1.4,-1.7,2.4,2.1,2.5],[-.3,-.7,2.4,2.5,2.1,2.4]];
 for(let dx=-7;dx<=7;dx++)for(let dy=-4;dy<=7;dy++)for(let dz=-7;dz<=7;dz++){
  const inside=crowns.some(([cx,cy,cz,rx,ry,rz])=>((dx-.5-cx*scale)/(rx*scale))**2+((dy-cy*scale)/(ry*scale))**2+((dz-.5-cz*scale)/(rz*scale))**2<1);
  if(inside)world.set(x+dx,base+h+dy,z+dz,noise(x+dx,dy,z+dz)>.73?'leafLight':'leaf');
 }
}
function rockPile(world,x,z){
 const y=surfaceHeight(x,z);if(y===null)return;
 for(const [dx,dy,dz]of [[0,0,0],[1,0,0],[0,0,1],[1,0,1],[0,1,0],[1,1,0],[2,0,1]])world.set(x+dx,y+dy,z+dz,'rock');
}
function shrub(world,x,z){
 const y=surfaceHeight(x,z);if(y===null||inPool(x,z))return;
 for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){
  world.set(x+dx,y,z+dz,'leaf');if(dx*dx+dz*dz<=1)world.set(x+dx,y+1,z+dz,'leafLight');
 }
 for(const [dx,dz]of [[-1,0],[1,1],[0,-1]])world.set(x+dx,y+1,z+dz,'berry');
}
export function addScenery(world){
 for(const [x,z,s]of TREE_SITES)tree(world,x,z,s);
 for(const [x,z]of ROCK_SITES)rockPile(world,x,z);
 for(const [x,z]of [[-32,24],[-31,-8],[-5,-25],[29,26],[28,5],[4,-26]])shrub(world,x,z);
 // The little stone walkway bends toward the rear terrace, as in the reference.
 for(let x=-29;x<=-14;x++)for(let w=0;w<3;w++){
  const z=-16+Math.floor((x+29)*.12)+w,y=surfaceHeight(x,z);
  if(y!==null&&noise(x,0,z)>.1)world.set(x,y-1,z,'path');
 }
 return world;
}
