import {surfaceHeight} from './layout.js';
import {TREE_PLAN,ROCK_PLAN,SHRUB_PLAN,PATH_CELLS} from './reference-layout.js';
const CROWNS={
 broad:[[-2.2,0,.3,2.7,2.4,2.8],[2,0,1,2.9,2.5,2.7],[0,2.2,0,3,2.6,2.8],[-1.5,1.2,-2.2,2.7,2.4,2.5],[2.3,1.4,-1.7,2.4,2.1,2.5],[-.3,-.7,2.4,2.5,2.1,2.4]],
 small:[[-1.7,0,0,2.8,2.8,2.5],[1.7,.2,.4,2.8,2.4,2.6],[0,2.2,-.7,2.5,2.8,2.5],[0,-1,2,2.1,1.8,2.1]],
 tall:[[-2.1,.4,0,2.7,3,2.6],[2.2,.1,.5,2.9,2.8,2.8],[0,3,-.5,2.7,3.1,2.8],[-1.4,1.7,-2,2.5,2.5,2.5],[1.8,2.3,-1.8,2.5,2.7,2.5],[0,-1.5,2.6,2.1,2,2]],
 'small-right':[[-1.7,.1,.5,2.7,2.5,2.4],[1.8,0,0,2.6,2.6,2.6],[0,2.2,-.5,2.5,2.9,2.5],[.4,-1.1,2,2.1,1.8,2.1]],
 round:[[-2,0,0,2.7,2.7,2.7],[2,0,.5,2.8,2.7,2.8],[0,2.3,0,2.9,2.8,2.7],[-1,1,-2.2,2.4,2.2,2.4],[1.8,1.5,-1.8,2.3,2.4,2.3],[0,-1,2.2,2.5,2.1,2.4]],
};
function tree(world,plan){
 const {x,z,scale,trunk:h,crown,vertical=1,canopyBack=0}=plan,base=surfaceHeight(x,z);
 if(base===null)throw new Error('Tree outside land: '+plan.id);
 for(let a=0;a<2;a++)for(let b=0;b<h;b++)for(let c=0;c<2;c++)world.set(x+a,base+b,z+c,'trunk');
 for(const [dx,dz]of [[-1,0],[2,0],[0,-1],[0,2]])world.set(x+dx,base,z+dz,'trunk');
 for(const [dx,dy,dz]of [[-1,h-4,0],[-1,h-3,0],[-2,h-2,0],[2,h-3,1],[2,h-2,1],[3,h-1,1]])world.set(x+dx,base+dy,z+dz,'trunk');
 for(let dx=-7;dx<=7;dx++)for(let dy=-4;dy<=8;dy++)for(let dz=-7;dz<=7;dz++){
  if(CROWNS[crown].some(([cx,cy,cz,rx,ry,rz])=>((dx-.5-cx*scale)/(rx*scale))**2+((dy-cy*scale*vertical)/(ry*scale*vertical))**2+((dz-.5-cz*scale+canopyBack)/(rz*scale))**2<1))
   world.set(x+dx,base+h+dy,z+dz,(dx+2*dy+dz)%5===0?'leafLight':'leaf');
 }
}
function shrub(world,{x,z}){
 const base=surfaceHeight(x,z);
 for(const [dx,dy,dz]of [[0,0,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,0],[1,1,0],[-1,1,0],[0,1,1],[0,1,-1],[0,2,0]])
  world.set(x+dx,base+dy,z+dz,dy>0?'leafLight':'leaf');
 for(const [dx,dy,dz]of [[-1,1,0],[1,1,0],[0,1,1],[0,2,0]])world.set(x+dx,base+dy,z+dz,'berry');
}
export function addScenery(world){
 for(const plan of TREE_PLAN)tree(world,plan);
 for(const plan of ROCK_PLAN){
  const base=surfaceHeight(plan.x,plan.z);
  if(base===null)throw new Error('Rock outside land: '+plan.id);
  for(const [dx,dy,dz]of plan.cells)world.set(plan.x+dx,base+dy,plan.z+dz,'rock');
 }
 for(const plan of SHRUB_PLAN)shrub(world,plan);
 for(const [x,z]of PATH_CELLS){const y=surfaceHeight(x,z);if(y!==null)world.set(x,y-1,z,'path');}
 return world;
}
