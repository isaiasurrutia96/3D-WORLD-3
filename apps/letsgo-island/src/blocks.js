// Integer cells are the source of truth. Bevels never determine solidity.
export const CELL_SIZE=1;
export const DIRECTIONS=[
 {n:[1,0,0],u:[0,0,-1],v:[0,1,0]},
 {n:[-1,0,0],u:[0,0,1],v:[0,1,0]},
 {n:[0,1,0],u:[1,0,0],v:[0,0,-1]},
 {n:[0,-1,0],u:[1,0,0],v:[0,0,1]},
 {n:[0,0,1],u:[1,0,0],v:[0,1,0]},
 {n:[0,0,-1],u:[-1,0,0],v:[0,1,0]},
];
const key=(x,y,z)=>`${x},${y},${z}`;
export class BlockWorld{
 constructor(){this.cells=new Map();this.revision=0;}
 get(x,y,z){return this.cells.get(key(x,y,z));}
 set(x,y,z,type){
  if(![x,y,z].every(Number.isInteger))throw new TypeError('Block coordinates must be integer grid cells.');
  if(type===null)this.cells.delete(key(x,y,z));else this.cells.set(key(x,y,z),{x,y,z,type});
  this.revision++;return this;
 }
 remove(x,y,z){return this.set(x,y,z,null);}
 snap(x,y,z){return{x:Math.floor(x/CELL_SIZE),y:Math.floor(y/CELL_SIZE),z:Math.floor(z/CELL_SIZE)};}
 solidAt(x,y,z){const p=this.snap(x,y,z),cell=this.get(p.x,p.y,p.z);return!!cell&&!['cloud','water'].includes(cell.type);}
 *exposedFaces(){
  for(const cell of this.cells.values())for(let direction=0;direction<DIRECTIONS.length;direction++){
   const {n}=DIRECTIONS[direction],neighbor=this.get(cell.x+n[0],cell.y+n[1],cell.z+n[2]);if(!neighbor||(cell.type!=='water'&&neighbor.type==='water'))yield{...cell,direction};
  }
 }
 // Merge solid cell volumes; there is no separate physics body per block.
 collisionBoxes(){
  const remaining=new Set([...this.cells.values()].filter(c=>!['cloud','water'].includes(c.type)).map(c=>key(c.x,c.y,c.z))),boxes=[];
  const has=(x,y,z)=>remaining.has(key(x,y,z));
  for(const {x,y,z}of this.cells.values()){
   if(!has(x,y,z))continue;let maxX=x+1,maxY=y+1,maxZ=z+1;
   while(has(maxX,y,z))maxX++;
   const plane=(py,pz)=>{for(let px=x;px<maxX;px++)if(!has(px,py,pz))return false;return true;};
   while(plane(y,maxZ))maxZ++;
   const layer=py=>{for(let pz=z;pz<maxZ;pz++)if(!plane(py,pz))return false;return true;};
   while(layer(maxY))maxY++;
   for(let py=y;py<maxY;py++)for(let pz=z;pz<maxZ;pz++)for(let px=x;px<maxX;px++)remaining.delete(key(px,py,pz));
   boxes.push({min:[x,y,z],max:[maxX,maxY,maxZ]});
  }
  return boxes;
 }
}
