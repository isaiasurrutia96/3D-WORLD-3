import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {createCanyonRoute,canyonFootprint,cellContours,CANYON_CELL} from './canyon-layout.js';

export function createCanyonWorld({software=false}={}){
 const group=new THREE.Group();group.name='Canyon Switchbacks — merged floating island';
 const route=createCanyonRoute(software?360:1200),batches=new Map();
 const palette={grass:'#91cb34',dirt:'#cb8b50',stone:'#a19aa9',rock:'#b9afb4',leaf:'#72b12c',wood:'#95612f',flower:'#f4c73c',asphalt:'#33373d',underside:'#515461',red:'#df4540',white:'#fff5e5',rail:'#c9d5d7',water:'#35c9da'};
 // The canyon uses inexpensive diffuse shading. Higher quality tiers add
 // resolution and shadows without needing a costly reflective world shader.
 const materials=new Map(Object.entries(palette).map(([k,color])=>[k,new THREE.MeshLambertMaterial({color,side:THREE.DoubleSide})]));
 function batch(geometry,type,matrix){if(matrix)geometry.applyMatrix4(matrix);geometry.deleteAttribute('uv');if(geometry.index)geometry=geometry.toNonIndexed();if(!batches.has(type))batches.set(type,[]);batches.get(type).push(geometry);}
 function box(x,y,z,sx,sy,sz,type,r=.12){
  const g=software||type==='rail'||sy<.1?new THREE.BoxGeometry(sx,sy,sz):new RoundedBoxGeometry(sx,sy,sz,1,Math.min(r,sx*.12,sy*.12,sz*.12));g.translate(x,y,z);batch(g,type);
 }
 function shape(points){
  const s=new THREE.Shape(),r=.55,c=points.map(([x,z],i)=>{
   const p=new THREE.Vector2(x,-z),a=new THREE.Vector2(...points[(i+points.length-1)%points.length].map((v,j)=>j?-v:v)),b=new THREE.Vector2(...points[(i+1)%points.length].map((v,j)=>j?-v:v));
   return {p,a:p.clone().add(a.sub(p).setLength(r)),b:p.clone().add(b.sub(p).setLength(r))};
  });
  s.moveTo(c[0].a.x,c[0].a.y);for(const v of c){s.lineTo(v.a.x,v.a.y);s.quadraticCurveTo(v.p.x,v.p.y,v.b.x,v.b.y);}s.closePath();return s;
 }
 function slab(cells,bottom,top,type){
  for(const loop of cellContours(cells)){
   const g=new THREE.ExtrudeGeometry(shape(loop),{depth:top-bottom-.16,bevelEnabled:true,bevelSize:.12,bevelThickness:.08,bevelSegments:software?1:2,curveSegments:software?1:3,steps:1});
   g.rotateX(-Math.PI/2);g.translate(0,bottom+.08,0);batch(g,type);
  }
 }
 const footprint=canyonFootprint(),riverCenter=z=>Math.sin((z+9)/21)*1.5;
 const banks=footprint.filter(([x,z])=>Math.abs((x+.5)*CANYON_CELL-riverCenter((z+.5)*CANYON_CELL))>8.6+1.5*(1+Math.sin((z+.5)*CANYON_CELL/14)));
 slab(footprint,-5.16,-2.58,'stone');
 slab(banks,-2.58,3.87,'stone');slab(banks,3.87,7.57,'dirt');slab(banks,7.57,8,'grass');
 for(const[inset,bottom,top]of [[4.3,-10.32,-5.16],[8.6,-17.2,-10.32],[17.2,-25.8,-17.2],[25.8,-33.54,-25.8],[35.5,-40.42,-33.54],[44,-45.58,-40.42]])slab(canyonFootprint(inset),bottom,top,'stone');
 const riverShelf=footprint.filter(([x])=>Math.abs((x+.5)*CANYON_CELL)<12.9);
 slab(riverShelf,-2.58,.86,'stone');
 // Small grass ledges at the water, and two elevated rear gardens. Neither
 // terrace enters the driving corridor.
 const shelf=footprint.filter(([x,z])=>{const px=(x+.5)*CANYON_CELL,pz=(z+.5)*CANYON_CELL;return Math.abs(px)>6.45&&Math.abs(px)<12.9&&Math.abs(pz+9)<51;});
 slab(shelf,.86,1.72,'dirt');slab(shelf,1.72,2.15,'grass');
 for(const side of [-1,1]){
  const terrace=footprint.filter(([x,z])=>{const px=(x+.5)*CANYON_CELL,pz=(z+.5)*CANYON_CELL;return px*side>15&&px*side<43&&pz<-61;});
  slab(terrace,8,10.58,'dirt');slab(terrace,10.58,11.01,'grass');
  const upper=terrace.filter(([x,z])=>Math.abs((x+.5)*CANYON_CELL)>25&&(z+.5)*CANYON_CELL<-65);
  slab(upper,11.01,12.3,'dirt');slab(upper,12.3,12.73,'grass');
 }
 // A separate flowing ribbon through the canyon, below both bridges.
 const wp=[];
 for(let i=0;i<64;i++){
  const za=-72+i*132.3/64,zb=-72+(i+1)*132.3/64,xa=riverCenter(za),xb=riverCenter(zb);
  for(const p of [[xa-3.1,1.02,za],[xb-3.1,1.02,zb],[xb+3.1,1.02,zb],[xa-3.1,1.02,za],[xb+3.1,1.02,zb],[xa+3.1,1.02,za]])wp.push(...p);
 }
 const waterGeo=new THREE.BufferGeometry();waterGeo.setAttribute('position',new THREE.Float32BufferAttribute(wp,3));waterGeo.computeVertexNormals();batch(waterGeo,'water');
 const fallGeo=new THREE.PlaneGeometry(6.2,23,software?1:4,1);fallGeo.translate(riverCenter(60.3),-10.48,60.3);batch(fallGeo,'water');
 for(let i=0;i<14;i++)box(riverCenter(60.3)+Math.sin(i*2.17)*2.4,-22-i*.36,60.3,.25,.43,.25,'white',.04);
 for(let i=0;i<18;i++)box(riverCenter(-59+i*6.3)+Math.sin(i*1.7)*1.2,1.04,-59+i*6.3,1.2,.025,.08,'white',0);

 function strip(inner,outer,height,type){
  const p=[];
  for(let i=0;i<route.count;i++){
   const a=route.samples[i],b=route.samples[i+1],offset=(s,d)=>[s.x+s.nx*d,s.y+height,s.z+s.nz*d];
   const q=[offset(a,inner),offset(b,inner),offset(b,outer),offset(a,outer)];
   for(const j of [0,2,1,0,3,2])p.push(...q[j]);
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.computeVertexNormals();batch(g,type);
 }
 const half=route.width/2,outer=half+route.curb;
 strip(-outer,outer,0,'asphalt');strip(-outer,outer,-.34,'underside');
 for(const side of [-1,1]){
  const red=[],white=[],sides=[],rails=[],poleEvery=software?8:4;let lastPole=-100;
  for(let i=0;i<route.count;i++){
   const a=route.samples[i],b=route.samples[i+1],p=(s,d,h)=>[s.x+s.nx*d,s.y+h,s.z+s.nz*d];
   const q=[p(a,side*half,.035),p(b,side*half,.035),p(b,side*outer,.035),p(a,side*outer,.035)];
   for(const j of [0,2,1,0,3,2])(Math.floor(a.distance/2.15)%2?white:red).push(...q[j]);
   const wall=[p(a,side*outer,0),p(b,side*outer,0),p(b,side*outer,-.34),p(a,side*outer,-.34)];for(const j of [0,1,2,0,2,3])sides.push(...wall[j]);
   // Continuous beams use the same route samples as the collision boundary.
   for(const h of [.53,1.04]){
    const beam=[p(a,side*(outer+.06),h-.07),p(b,side*(outer+.06),h-.07),p(b,side*(outer+.06),h+.07),p(a,side*(outer+.06),h+.07)];for(const j of [0,1,2,0,2,3])rails.push(...beam[j]);
   }
   if(a.distance-lastPole>poleEvery){lastPole=a.distance;box(a.x+a.nx*side*(outer+.06),a.y+.55,a.z+a.nz*side*(outer+.06),.16,1.18,.16,'rail',.02);}
  }
  for(const[data,type]of [[red,'red'],[white,'white'],[sides,'underside'],[rails,'rail']]){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(data,3));g.computeVertexNormals();batch(g,type);}
 }
 // One transverse chequered line on the south bridge. No rail crosses it.
 const start=route.samples[0];
 for(let x=0;x<10;x++)for(let z=0;z<2;z++)box(start.x+(z-.5)*.6,start.y+.05,start.z+(x-4.5)*route.width/10,.6,.035,route.width/10,(x+z)%2?'asphalt':'white',0);

 const scenery=[];
 function tree(x,z,y,scale=1){
  scale*=1.5;
  const before=route.nearest(x,z);if(before.distance<outer+3.3)return;
  box(x,y+2.4*scale,z,1.3*scale,4.8*scale,1.3*scale,'wood',.15);
  for(const[dx,dy,dz,s]of [[0,5.4,0,4.6],[-1.8,4.8,0,2.8],[1.7,4.9,.3,3],[.1,6.8,-.4,3],[-.5,5.1,1.8,2.8]])box(x+dx*scale,y+dy*scale,z+dz*scale,s*scale,s*.8*scale,s*scale,'leaf',.3);
  scenery.push({kind:'tree',x,z,y});
 }
 for(const[x,z,y,s]of [[-49,43,8,.95],[47,44,8,.9],[-51,-18,8,.85],[50,-19,8,.9],[-30,-67,12.73,1.15],[30,-67,12.73,1.1],[-15,45,8,.75],[16,46,8,.8],[-51,-53,8,.8],[51,-53,8,.85]])tree(x,z,y,s);
 const spots=[[-33,27],[-22,9],[-33,-9],[-22,-27],[-33,-45],[33,27],[22,9],[33,-9],[22,-27],[33,-45],[-48,8],[48,-37],[-19,-63],[19,-62]];
 for(const[i,[x,z]]of spots.entries()){
  if(route.nearest(x,z).distance<outer+1.3)continue;
  if(i<10){box(x,8.5,z,5.16,.86,5.16,'dirt',.16);box(x,9.04,z,5.16,.22,5.16,'grass',.08);}
  for(let j=0;j<3;j++)box(x+(j-1)*.9,(i<10?9.2:8.45)+j*.32,z+(j%2)*.7,1.25,1.2+j*.5,1.25,i%2?'rock':'leaf',.18);
  if(i%2===0)for(let j=0;j<3;j++)box(x+(j-1)*.65,i<10?9.85:9.1,z+.4,.35,.4,.35,'flower',.05);
 }
 for(const[type,list]of batches){
  const geometry=mergeGeometries(list,false);geometry.computeBoundingBox();geometry.computeBoundingSphere();
  const mesh=new THREE.Mesh(geometry,materials.get(type));mesh.name=`Canyon ${type} — continuous material surfaces`;mesh.castShadow=type!=='water'&&type!=='white';mesh.receiveShadow=true;group.add(mesh);for(const g of list)g.dispose();
 }
 group.userData={concept:5,grid:.43,bridgeCount:2,routeLength:route.length,trackWidth:route.width};
 return {group,route,scenery,center:new THREE.Vector3(0,1,-9),getStats:()=>({...group.userData,drawCalls:group.children.length,triangles:group.children.reduce((n,m)=>n+m.geometry.attributes.position.count/3,0)})};
}
