export const LAYOUT_STORAGE_KEY='letsgo.control-layout.v1';
export const GRID_SIZE=4;
export const LAYOUT_IDS=['navigation','trial','minimap','left','right','gas','brake','boost'];
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
export const layoutProfile=(width,height)=>width>height?'landscape':'portrait';

export function snapPosition(x,y,width,height,viewport,inset=8){
 const minX=Math.ceil(Math.max(inset,viewport.safeLeft??0)/GRID_SIZE)*GRID_SIZE,minY=Math.ceil(Math.max(inset,viewport.safeTop??0)/GRID_SIZE)*GRID_SIZE;
 const maxX=Math.max(minX,Math.floor((viewport.width-width-Math.max(inset,viewport.safeRight??0))/GRID_SIZE)*GRID_SIZE);
 const maxY=Math.max(minY,Math.floor((viewport.height-height-Math.max(inset,viewport.safeBottom??0))/GRID_SIZE)*GRID_SIZE);
 return{x:clamp(Math.round(x/GRID_SIZE)*GRID_SIZE,minX,maxX),y:clamp(Math.round(y/GRID_SIZE)*GRID_SIZE,minY,maxY)};
}
export function encodePosition(position,width,height,viewport){
 return{x:clamp(position.x/Math.max(1,viewport.width-width),0,1),y:clamp(position.y/Math.max(1,viewport.height-height),0,1)};
}
export function decodePosition(position,width,height,viewport){
 return snapPosition(position.x*Math.max(0,viewport.width-width),position.y*Math.max(0,viewport.height-height),width,height,viewport);
}
export function readLayouts(storage){
 try{
  const data=JSON.parse(storage?.getItem(LAYOUT_STORAGE_KEY)??'null');
  if(data?.version!==1)return{};
  const profiles={};
  for(const profile of ['portrait','landscape']){
   if(!data[profile]||typeof data[profile]!=='object')continue;
   profiles[profile]={};
   for(const id of LAYOUT_IDS){const point=data[profile][id];if(point&&Number.isFinite(point.x)&&Number.isFinite(point.y)&&point.x>=0&&point.x<=1&&point.y>=0&&point.y<=1)profiles[profile][id]={x:point.x,y:point.y};}
  }
  return profiles;
 }catch{return{};}
}
export function saveLayouts(storage,profiles){
 try{if(!storage)return false;storage.setItem(LAYOUT_STORAGE_KEY,JSON.stringify({version:1,...profiles}));return true;}catch{return false;}
}
