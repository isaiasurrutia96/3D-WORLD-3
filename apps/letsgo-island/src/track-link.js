// One existing course, fitted beside the island. No racing startup, slab,
// opponents, weapons, timing or ghost storage is imported.
import {BoxGeometry,BufferGeometry,DoubleSide,Float32BufferAttribute,Group,Mesh,MeshLambertMaterial,Vector3} from 'three';
import {createTrack,trackSamples,trackSegments,railSegments,access,TRACK_HALF_WIDTH,CURB_WIDTH} from '../../letsgo-racing/src/track.js';
import {createRoadSurface,createRailResolver} from '../../letsgo-racing/src/world.js';
import {makeCapsule} from '../../../src/physics/CollisionWorld.ts';
import {METRES_PER_CELL as M,AVATAR_SCALE} from './avatar-world.js';

// Fit the intact horizontal route beside the small island. Vertical clearance
// and kart dimensions/tuning remain unchanged; the standalone course is intact.
export const TRACK_LINK={name:'Original Circuit',horizontalScale:.4,offset:{x:28-128*.4,y:M,z:150*.4-9*M},bridge:{minX:13.8,maxX:30,halfWidth:2.6,z:-9*M,y:M},home:{x:21,y:M,z:-9*M,yaw:Math.PI/2}};
const offset=new Vector3(TRACK_LINK.offset.x,TRACK_LINK.offset.y,TRACK_LINK.offset.z);
const S=TRACK_LINK.horizontalScale,shift=point=>new Vector3(point.x*S,point.y,point.z*S).add(offset);
const up=new Vector3(0,1,0);
export function createTrackLink(blocks){
 const root=new Group();root.name='Original Circuit and island bridge';root.scale.setScalar(AVATAR_SCALE);
 const track=createTrack();track.position.copy(offset);track.scale.set(S,1,S);root.add(track);
 const sourceSegments=trackSegments.map(s=>({...s,a:shift(s.a),b:shift(s.b),halfWidth:s.halfWidth*S,corners:s.corners.map(shift)}));
 const rails=railSegments.map(s=>({a:shift(s.a),b:shift(s.b)}));
 const bridge=TRACK_LINK.bridge,sourceAccess={minX:access.minX*S+offset.x,maxX:access.maxX*S+offset.x,minZ:access.minZ*S+offset.z,maxZ:access.maxZ*S+offset.z,y:offset.y};
 for(const side of [-1,1])rails.push({a:new Vector3(bridge.minX+.4,bridge.y,bridge.z+side*bridge.halfWidth),b:new Vector3(bridge.maxX,bridge.y,bridge.z+side*bridge.halfWidth)});
 const road=createRoadSurface(sourceSegments,(TRACK_HALF_WIDTH+CURB_WIDTH)*S+1),resolveRails=createRailResolver(rails),collisionPositions=[],faces=[];
 const asphalt=new MeshLambertMaterial({color:'#30343b'}),metal=new MeshLambertMaterial({color:'#a5adb8'}),red=new MeshLambertMaterial({color:'#dc2828'}),white=new MeshLambertMaterial({color:'#f4f3ef'});
 function box(size,position,material,name){const mesh=new Mesh(new BoxGeometry(...size),material);mesh.position.set(...position);mesh.name=name;root.add(mesh);return mesh;}
 box([bridge.maxX-bridge.minX,.65,bridge.halfWidth*2],[(bridge.minX+bridge.maxX)/2,bridge.y-.325,bridge.z],asphalt,'Island bridge deck');
 for(const side of [-1,1]){
  for(let x=bridge.minX;x<bridge.maxX;x+=2){const width=Math.min(2,bridge.maxX-x);box([width,.06,.4],[x+width/2,bridge.y+.03,bridge.z+side*(bridge.halfWidth-.2)],Math.floor((x-bridge.minX)/2)%2?white:red,'Bridge red-white curb');}
  for(const height of [.55,1.08])box([bridge.maxX-bridge.minX-.4,.16,.16],[(bridge.minX+.4+bridge.maxX)/2,bridge.y+height,bridge.z+side*bridge.halfWidth],metal,'Bridge guardrail');
  for(let x=bridge.minX+.4;x<=bridge.maxX;x+=2)box([.18,1.18,.18],[x,bridge.y+.59,bridge.z+side*bridge.halfWidth],metal,'Bridge rail post');
 }
 function collisionQuad(points,normal=null,both=false){
  let q=points;
  if(normal){const n=new Vector3().subVectors(q[1],q[0]).cross(new Vector3().subVectors(q[2],q[0]));if(n.dot(normal)<0)q=[...q].reverse();}
  for(const i of [0,1,2,0,2,3])collisionPositions.push(...q[i].toArray());
  if(both)for(const i of [2,1,0,3,2,0])collisionPositions.push(...q[i].toArray());
 }
 function visibleQuad(points,tint){
  const q=points.map(p=>p.clone().multiplyScalar(AVATAR_SCALE).toArray()),normal=new Vector3().subVectors(points[1],points[0]).cross(new Vector3().subVectors(points[2],points[0])).normalize().toArray();
  faces.push({points:q,normal,css:tint,alpha:1,surface:true,doubleSided:true});
 }
 function roadBody(corners){
  collisionQuad(corners,up);const bottom=corners.map(p=>p.clone().add(new Vector3(0,-.65,0)));collisionQuad(bottom,up.clone().negate());
  visibleQuad(corners,'#343840');visibleQuad(bottom,'#454b54');
  for(const [a,b]of [[0,1],[3,2]]){const q=[corners[a],corners[b],bottom[b],bottom[a]];collisionQuad(q,null,true);visibleQuad(q,'#555b65');}
 }
 for(const segment of sourceSegments)roadBody(segment.corners);
 for(const b of [{...bridge,minZ:bridge.z-bridge.halfWidth,maxZ:bridge.z+bridge.halfWidth},sourceAccess]){
  roadBody([new Vector3(b.minX,b.y,b.minZ),new Vector3(b.minX,b.y,b.maxZ),new Vector3(b.maxX,b.y,b.maxZ),new Vector3(b.maxX,b.y,b.minZ)]);
 }
 const outer=TRACK_HALF_WIDTH+CURB_WIDTH;
 for(let i=0;i<trackSamples.length-1;i++)for(const side of [-1,1]){
  const a=trackSamples[i],b=trackSamples[i+1];
  const point=(s,d)=>shift(s.point.clone().addScaledVector(s.normal,d)).add(new Vector3(0,.04,0));
  const edge=point(a,side*outer);if((edge.x-offset.x)/S<145&&Math.abs((edge.z-offset.z)/S+150)<9)continue;
  visibleQuad([point(a,side*TRACK_HALF_WIDTH),point(b,side*TRACK_HALF_WIDTH),point(b,side*outer),edge],Math.floor(a.distance/3)%2?'#f4f3ef':'#dc2828');
 }
 for(const [index,rail]of rails.entries()){
  const topA=rail.a.clone().add(new Vector3(0,1.2,0)),topB=rail.b.clone().add(new Vector3(0,1.2,0));
  collisionQuad([rail.a,rail.b,topB,topA],null,true);
  for(const height of [.55,1.08])visibleQuad([rail.a.clone().add(new Vector3(0,height-.08,0)),rail.b.clone().add(new Vector3(0,height-.08,0)),rail.b.clone().add(new Vector3(0,height+.08,0)),rail.a.clone().add(new Vector3(0,height+.08,0))],'#b4becb');
  if(index%6===0)visibleQuad([rail.a.clone().add(new Vector3(-.09,0,0)),rail.a.clone().add(new Vector3(.09,0,0)),topA.clone().add(new Vector3(.09,0,0)),topA.clone().add(new Vector3(-.09,0,0))],'#a5adb8');
 }
 // The bridge curbs use the same alternating strips in software mode.
 for(const side of [-1,1])for(let x=bridge.minX;x<bridge.maxX;x+=2){const end=Math.min(x+2,bridge.maxX),z=bridge.z+side*(bridge.halfWidth-.2);visibleQuad([new Vector3(x,bridge.y+.06,z-.2),new Vector3(end,bridge.y+.06,z-.2),new Vector3(end,bridge.y+.06,z+.2),new Vector3(x,bridge.y+.06,z+.2)],Math.floor((x-bridge.minX)/2)%2?'#dc2828':'#f4f3ef');}
 const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(collisionPositions,3));const solid=new Mesh(geometry,new MeshLambertMaterial({side:DoubleSide}));solid.name='Walkable Original Circuit, bridge and rails';
 let islandCollision=null;
 const inside=(x,z,b)=>x>=b.minX&&x<=b.maxX&&z>=b.minZ&&z<=b.maxZ;
 const bridgeBounds={...bridge,minZ:bridge.z-bridge.halfWidth,maxZ:bridge.z+bridge.halfWidth};
 function terrainSupport(x,z,maximum){
  const gx=Math.floor(x/M),gz=Math.floor(z/M);if(Math.abs(gx)>36||Math.abs(gz)>44)return null;
  const ceiling=Number.isFinite(maximum)?Math.min(60,Math.floor(maximum/M-1+1e-6)):60;
  for(let y=ceiling;y>=-26;y--){const cell=blocks.get(gx,y,gz),above=blocks.get(gx,y+1,gz);if(cell&&!['water','cloud'].includes(cell.type)&&(!above||['water','cloud'].includes(above.type)))return(y+1)*M;}
  return null;
 }
 const physics={
  supportHeight(x,z,maximum=Infinity){
   let result=terrainSupport(x,z,maximum);const trackY=road(x,z,maximum);
   if(trackY!==null&&(result===null||trackY>result))result=trackY;
   for(const b of [bridgeBounds,sourceAccess])if(inside(x,z,b)&&b.y<=maximum&&(result===null||b.y>result))result=b.y;
   return result;
  },
  resolveHorizontal(x,z,nextX,nextZ,y,radius=.48,height=2.3){
   const resolved=resolveRails(x,z,nextX,nextZ,y,radius,height);
   if(islandCollision&&Math.abs(resolved.x)<17&&Math.abs(resolved.z)<21){
    const capsule=makeCapsule(new Vector3(resolved.x,y+.035,resolved.z),height,radius),hit=islandCollision.capsuleIntersect(capsule);
    if(hit&&Math.abs(hit.normal.y)<.65){resolved.x+=hit.normal.x*hit.depth;resolved.z+=hit.normal.z*hit.depth;}
   }
   return resolved;
  }
 };
 root.traverse(object=>{if(object.isMesh){object.castShadow=false;object.receiveShadow=false;}});
 const bounds={minX:Infinity,maxX:-Infinity,minZ:Infinity,maxZ:-Infinity};for(const s of sourceSegments)for(const p of s.corners){bounds.minX=Math.min(bounds.minX,p.x);bounds.maxX=Math.max(bounds.maxX,p.x);bounds.minZ=Math.min(bounds.minZ,p.z);bounds.maxZ=Math.max(bounds.maxZ,p.z);}
 return{root,solid,faces,physics,segments:sourceSegments,rails,bounds,plan:TRACK_LINK,connect(avatar){avatar.addCollision(solid);islandCollision=avatar.collision;}};
}
