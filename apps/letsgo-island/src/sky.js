export function addClouds(world){
 // The two broad clouds and smaller middle cloud follow the reference silhouette.
 for(const [x,y,z,scale]of [[-47,13,-24,1],[5,16,-47,.48],[39,17,-29,1]]){
  const radius=Math.ceil(9*scale),height=Math.ceil(7*scale);
  for(let dx=-radius;dx<=radius;dx++)for(let dy=0;dy<=height;dy++)for(let dz=-3;dz<=3;dz++){
   const shape=[[-4,1.4,4,2.5],[0,2.8,4.5,4],[4,1.1,4,2.5]].some(([cx,cy,rx,ry])=>((dx-cx*scale)/(rx*scale))**2+((dy-cy*scale)/(ry*scale))**2+(dz/(3*scale+.4))**2<1);
   if(shape)world.set(x+dx,y+dy,z+dz,'cloud');
  }
 }
 return world;
}
