export function addClouds(world){
 // The block clouds are background scenery and never become solid colliders.
 for(const [x,y,z,r]of [[-47,13,-24,5],[5,14,-47,3],[39,16,-29,5]]){
  for(let dx=-r;dx<=r;dx++)for(let dy=0;dy<=3;dy++)for(let dz=-2;dz<=2;dz++){
   if((dx/(r+.5))**2+(dy/3.6)**2+(dz/2.8)**2<1)world.set(x+dx,y+dy,z+dz,'cloud');
  }
 }
 return world;
}
