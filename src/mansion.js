import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Local +Z is the front; rotating 90° makes the entrance face the track (+X).
export const MANSION={x:-25,z:-110,yaw:Math.PI/2,ground:.4,upper:5.4};
export const mansionToWorld=(x,z)=>({x:MANSION.x+z,z:MANSION.z-x});
export const mansionToLocal=(x,z)=>({x:MANSION.z-z,z:x-MANSION.x});
export const MANSION_ENTRY=mansionToWorld(0,22);
export const mansionDoors=[{x:0,z:22,y:.4,open:0},{x:0,z:22,y:5.4,open:0}];
const parts=[],solids=[],surfaces=[],cameraBoxes=[];
function bounds(x,y,z,sx,sy,sz){return{minX:x-sx/2,maxX:x+sx/2,minY:y-sy/2,maxY:y+sy/2,minZ:z-sz/2,maxZ:z+sz/2};}
function box(name,x,y,z,sx,sy,sz,material,options={}){
 const p={kind:'box',name,x,y,z,sx,sy,sz,material,...options};parts.push(p);
 const b={...bounds(x,y,z,sx,sy,sz),step:options.step??false};
 if(options.block!==false)solids.push(b);
 if(options.camera!==false)cameraBoxes.push(b);
 if(options.ceiling)b.ceiling=true;
 return p;
}
function ornament(name,x,y,z,sx,sy,sz,material){return box(name,x,y,z,sx,sy,sz,material,{block:false,camera:false});}
function cylinder(x,y,z,radius,height,material,top=radius){parts.push({kind:'cylinder',x,y,z,radius,top,height,material});}
function sphere(x,y,z,radius,material,scale=[1,1,1]){parts.push({kind:'sphere',x,y,z,radius,material,scale});}
function beam(a,b,width,material){parts.push({kind:'beam',a,b,width,material});}
function floor(x0,x1,z0,z1,y,material='wood',thickness=.24){
 surfaces.push({minX:x0,maxX:x1,minZ:z0,maxZ:z1,y});
 box('walkable floor',(x0+x1)/2,y-thickness/2,(z0+z1)/2,x1-x0,thickness,z1-z0,material,{step:true,ceiling:true});
}
function wallZ(z,y0,y1,x0,x1,openings=[]){
 let cursor=x0;
 for(const opening of [...openings].sort((a,b)=>a.lo-b.lo)){
  if(opening.lo>cursor)box('exterior wall',(cursor+opening.lo)/2,(y0+y1)/2,z,opening.lo-cursor,y1-y0,.42,'stone');
  if(opening.y0>y0)box('wall sill',(opening.lo+opening.hi)/2,(y0+opening.y0)/2,z,opening.hi-opening.lo,opening.y0-y0,.42,'stone');
  if(opening.y1<y1)box('wall header',(opening.lo+opening.hi)/2,(opening.y1+y1)/2,z,opening.hi-opening.lo,y1-opening.y1,.42,'stone');
  if(opening.glass)windowZ((opening.lo+opening.hi)/2,z,opening.y0,opening.y1,opening.hi-opening.lo);
  cursor=opening.hi;
 }
 if(cursor<x1)box('exterior wall',(cursor+x1)/2,(y0+y1)/2,z,x1-cursor,y1-y0,.42,'stone');
}
function windowZ(x,z,y0,y1,width){
 box('sealed glass window',x,(y0+y1)/2,z,width,y1-y0,.08,'glass');
 for(const side of [-1,1])ornament('window trim',x+side*(width/2+.08),(y0+y1)/2,z,.16,y1-y0+.3,.55,'trim');
 for(const y of [y0-.08,y1+.08])ornament('window trim',x,y,z,width+.32,.16,.55,'trim');
 ornament('window mullion',x,(y0+y1)/2,z,.07,y1-y0,.13,'oak');
 ornament('window mullion',x,y0+(y1-y0)*.58,z,width,.07,.13,'oak');
}
function wallX(x,y0,y1,z0,z1,doorCenters=[]){
 let cursor=z0;
 for(const center of doorCenters){const lo=center-1.9,hi=center+1.9;
  box('room partition',x,(y0+y1)/2,(cursor+lo)/2,.40,y1-y0,lo-cursor,'plaster');
  box('door lintel',x,(y0+3.7+y1)/2,center,.40,y1-y0-3.7,3.8,'plaster');
  for(const side of [-1,1])ornament('door casing',x,y0+1.85,center+side*1.98,.58,3.8,.16,'trim');
  ornament('door casing',x,y0+3.78,center,.58,.18,4.1,'trim');cursor=hi;
 }
 if(cursor<z1)box('room partition',x,(y0+y1)/2,(cursor+z1)/2,.40,y1-y0,z1-cursor,'plaster');
}
function exteriorSide(x,y0,y1){
 const openings=[-14,-5,5,14];let cursor=-22;
 for(const z of openings){const lo=z-1.7,hi=z+1.7;
  box('side wall',x,(y0+y1)/2,(cursor+lo)/2,.42,y1-y0,lo-cursor,'stone');
  box('side window sill',x,y0+.5,z,.42,1,3.4,'stone');
  box('side window header',x,(y0+4+y1)/2,z,.42,y1-y0-4,3.4,'stone');
  box('sealed side glass',x,y0+2.5,z,.08,3,3.4,'glass');
  for(const dz of [-1.8,0,1.8])ornament('side window casing',x,y0+2.5,z+dz,.55,dz===0?3:3.3,dz===0?.07:.16,dz===0?'oak':'trim');
  for(const y of [y0+.92,y0+4.08])ornament('side window casing',x,y,z,.55,.16,3.75,'trim');cursor=hi;
 }
 box('side wall',x,(y0+y1)/2,(cursor+22)/2,.42,y1-y0,22-cursor,'stone');
}
function railing(a,b,y){
 const length=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.max(1,Math.ceil(length/.75));
 for(let i=0;i<=n;i++){const t=i/n,x=a[0]+(b[0]-a[0])*t,z=a[1]+(b[1]-a[1])*t;ornament('baluster',x,y+.52,z,.12,1.04,.12,'oak');}
 beam([a[0],y+1.1,a[1]],[b[0],y+1.1,b[1]],.16,'oak');
 box('railing collision',(a[0]+b[0])/2,y+.55,(a[1]+b[1])/2,Math.abs(b[0]-a[0])+.15,1.1,Math.abs(b[1]-a[1])+.15,'oak',{render:false});
}
function rug(x,z,y,width,depth,color='rug'){
 ornament('rug border',x,y+.012,z,width,.018,depth,'gold');ornament('rug',x,y+.027,z,width-.18,.018,depth-.18,color);
}
function plant(x,z,y=.4){
 cylinder(x,y+.35,z,.45,.7,'pot',.56);cylinder(x,y+.95,z,.07,1.0,'oak');
 for(const [dx,dy,dz]of [[0,1.5,0],[-.35,1.2,.1],[.35,1.3,-.1]])sphere(x+dx,y+dy,z+dz,.65,'leaf',[.8,1,.8]);
}
function wallLamp(x,y,z){
 ornament('lamp back',x,y,z,.30,.52,.14,'gold');sphere(x,y,z+.16,.22,'glow',[.7,1.3,.7]);
}
function bookcase(x,z,y,width=6){
 box('bookcase',x,y+1.6,z,width,3.2,.75,'oak');
 for(let shelf=0;shelf<4;shelf++){
  ornament('shelf',x,y+.35+shelf*.75,z+.46,width,.10,.30,'trim');
  for(let book=0;book<Math.floor(width/.34)-2;book++){
   const h=.42+(book%3)*.08;ornament('book',x-width/2+.5+book*.34,y+.4+shelf*.75+h/2,z+.47,.23,h,.26,['bookRed','bookBlue','bookGreen','gold'][(book+shelf)%4]);
  }
 }
}
function chair(x,z,y=.4,angle=0){
 const p=box('chair',x,y+.55,z,.9,1.1,1,'oak');p.angle=angle;
 ornament('chair cushion',x,y+.62,z,.85,.16,.88,'seat');ornament('chair back',x,y+1.1,z-.43,.9,1.0,.12,'oak');
}
function table(x,z,y,width,depth){
 box('table',x,y+.83,z,width,.16,depth,'oak');
 for(const dx of [-width*.38,width*.38])for(const dz of [-depth*.35,depth*.35])ornament('table leg',x+dx,y+.4,z+dz,.16,.8,.16,'oak');
}
function bed(x,z,y){
 box('bed',x,y+.5,z,5,1,7,'oak');ornament('mattress',x,y+.95,z,4.8,.35,6.8,'linen');
 ornament('duvet',x,y+1.16,z+.5,4.75,.18,5.5,'seat');
 ornament('headboard',x,y+1.25,z-3.4,5.3,2.1,.25,'oak');
 for(const dx of [-1.2,1.2])ornament('pillow',x+dx,y+1.25,z-2.1,1.8,.3,1.1,'linen');
 for(const dx of [-3.3,3.3]){box('nightstand',x+dx,y+.65,z-2.8,1.1,1.3,1.1,'oak');sphere(x+dx,y+1.7,z-2.8,.35,'glow');}
}
function roof(name,x0,x1,z0,z1,base,rise,material='roof'){
 parts.push({kind:'roof',name,x0,x1,z0,z1,base,rise,material});
 cameraBoxes.push({...bounds((x0+x1)/2,base+rise/2,(z0+z1)/2,x1-x0,rise,z1-z0),step:false});
}
// Foundation and porch, then a complete outer envelope on both levels.
floor(-36.4,36.4,-22.4,22.4,.38,'foundation',.38);
floor(-35.8,35.8,-21.8,21.8,.4);
floor(-10,10,22,28,.4,'stone');
floor(-7,7,28,29.3,.4,'stone',.4);floor(-7,7,29.3,30.6,.2,'stone',.2);
ornament('approach paving',0,.012,52,8,.022,43,'path');
for(const y of [.4,5.4]){
 const top=y===.4?5.4:10.6;
 const windows=[-30,-21,-10.5,10.5,21,30].map(x=>({lo:x-1.55,hi:x+1.55,y0:y+1,y1:y+3.9,glass:true}));
 wallZ(22,y,top,-36,36,[...windows,{lo:-2.6,hi:2.6,y0:y,y1:y+3.7}]);
 wallZ(-22,y,top,-36,36,[-27,-9,9,27].map(x=>({lo:x-2,hi:x+2,y0:y+1,y1:y+4,glass:true})));
 exteriorSide(-36,y,top);exteriorSide(36,y,top);
 wallX(-16,y,top,-21.8,21.8,[-14,14]);wallX(16,y,top,-21.8,21.8,[-14,14]);
 for(const [lo,hi]of [[-35.8,-16.2],[16.2,35.8]])box('room dividing wall',(lo+hi)/2,(y+top)/2,0,hi-lo,top-y,.40,'plaster');
 for(const x of [-34,-18,18,34])wallLamp(x,y+2.8,21.66);
 for(const z of [-20,20])for(const x of [-14.7,14.7])plant(x,z,y);
}
// Upper wing rooms and gallery, with real openings above both stair flights.
for(const [lo,hi]of [[-35.8,-16],[16,35.8]])floor(lo,hi,-21.8,21.8,5.4);
for(const side of [-1,1]){
 const range=(a,b)=>side<0?[-b,-a]:[a,b];
 for(const [a,b,z0,z1]of [[8,10,-21.8,21.8],[14,16,-21.8,21.8],[10,14,-21.8,-11],[10,14,11,21.8]]){const [lo,hi]=range(a,b);floor(lo,hi,z0,z1,5.4);}
 railing([side*8,-14],[side*8,14],5.4);
 for(const x of [side*10,side*14])railing([x,-11],[x,11],5.4);

}
floor(-8,8,-21.8,-14,5.4);floor(-8,8,14,21.8,5.4);
railing([-8,14],[8,14],5.4);railing([-8,-14],[8,-14],5.4);
floor(-10,10,22,27.5,5.4,'stone');railing([-10,27.5],[10,27.5],5.4);
railing([-10,22],[-10,27.5],5.4);railing([10,22],[10,27.5],5.4);
for(const side of [-1,1]){
 for(let i=0;i<20;i++){
  const top=.4+(i+1)*.25,z1=11-i*1.1,z0=z1-1.1;
  floor(side*12-2,side*12+2,z0,z1,top,'stone',top-.4+.025);
  ornament('stair runner',side*12,top+.012,(z0+z1)/2,2.6,.022,1.10,'rug');
  for(const x of [side*12-2,side*12+2]){
   beam([x,top+1,z0],[x,top+1,z1],.13,'oak');
   ornament('stair baluster',x,top+.5,(z0+z1)/2,.12,1,.12,'oak');
   box('stair rail collision',x,top+.5,(z0+z1)/2,.15,1,1.10,'oak',{render:false});
  }
 }
}
// Ceilings remain present even while inside: no cutaway or disappearing roof.
box('complete upper ceiling',0,10.65,0,72,.20,44,'plaster',{ceiling:true});
for(const y of [.32,5.30,10.52]){
 ornament('front cornice',0,y,22.30,73,.22,.38,'trim');ornament('rear cornice',0,y,-22.30,73,.22,.38,'trim');
 for(const x of [-36.3,36.3])ornament('side cornice',x,y,0,.38,.22,44.8,'trim');
}
for(const x of [-7,7]){
 cylinder(x,2.85,26,.38,4.9,'trim');ornament('column plinth',x,.66,26,1.1,.5,1.1,'trim');ornament('column capital',x,5.08,26,1.1,.35,1.1,'trim');
}
for(const y of [.4,5.4])for(const side of [-1,1]){
 ornament('entrance casing',side*2.75,y+1.88,22.25,.20,3.85,.45,'trim');wallLamp(side*4.3,y+2.5,22.32);
}
// Whole pitched roof, front pediment/gables and capped chimneys.
roof('main roof',-37.1,37.1,-23.1,23.1,10.8,4.8);
for(const x of [-27,0,27]){
 const half=x===0?9:6,base=10.8,rise=x===0?4.5:3.0;
 parts.push({kind:'gable',x,half,z0:17,z1:x===0?27.8:23.7,base,rise,material:'roof'});
 for(const side of [-1,1])beam([x+side*half,base, x===0?27.85:23.75],[x,base+rise,x===0?27.85:23.75],.23,'trim');
}
for(const x of [-28,28]){
 ornament('chimney',x,15.4,-6,1.5,3.2,1.6,'stone');ornament('chimney cap',x,17.08,-6,1.85,.28,1.95,'trim');
}
// Foyer furnishings and chandelier.
rug(0,3,.4,11,13);cylinder(0,1.05,3,.28,1.1,'oak');cylinder(0,1.62,3,1.2,.15,'oak');
box('foyer table collision',0,1.05,3,2.2,1.3,2.2,'oak',{render:false,camera:false});
cylinder(0,1.94,3,.28,.5,'pot',.35);for(const [x,z]of [[0,3],[-.3,3.1],[.3,3.1]])sphere(x,2.3,z,.28,'flower');
beam([0,10.55,0],[0,8.6,0],.06,'gold');
for(let i=0;i<8;i++){
 const angle=i*Math.PI/4,x=Math.cos(angle)*2,z=Math.sin(angle)*2;
 beam([0,8.6,0],[x,8.2,z],.07,'gold');sphere(x,8.15,z,.20,'glow',[.75,1.5,.75]);
}
// Lounge, library, dining room and kitchen.
rug(-26,11,.4,13,13,'rugBlue');
for(const x of [-30,-22]){
 box('sofa',x,1.0,11,3.5,1.2,7,'seat');ornament('sofa back',x-.95,1.5,11,.35,1.4,7,'seat');
 for(const z of [8,14])ornament('sofa arm',x,1.3,z,3.5,.7,.45,'seat');
}
table(-26,11,.4,3,5);
box('fireplace surround',-35,1.9,11,1,3,5,'trim');ornament('fireplace opening',-34.45,1.35,11,.08,1.5,3.3,'dark');ornament('warm fire',-34.38,1.15,11,.08,.75,2.7,'fire');
bookcase(-26,-20.9,.4,15);bookcase(-26,-2,.4,13);table(-26,-11,.4,7,3);chair(-26,-13);rug(-26,-11,.4,13,10,'rugBlue');
ornament('desk lamp',-24,1.55,-11,.6,.8,.6,'glow');
table(26,12,.4,8,4);for(const x of [23,26,29])for(const z of [8.9,15.1])chair(x,z);
rug(26,12,.4,13,11);
for(const x of [19,22,25,28,31,34]){box('kitchen cabinet',x,1.0,-20.6,2.8,1.2,1.6,'cabinet');ornament('countertop',x,1.66,-20.6,2.9,.12,1.8,'trim');}
box('kitchen island',26,1.0,-10,7,1.2,3,'cabinet');ornament('island top',26,1.68,-10,7.2,.15,3.2,'trim');
box('refrigerator',34,1.9,-16,2.2,3,2,'metal');ornament('fridge divider',34,2.45,-14.98,2.1,.05,.04,'dark');
// Upper bedrooms, guest room and study.
bed(-26,11,5.4);rug(-26,11,5.4,13,15,'rugBlue');bed(-26,-11,5.4);
bed(26,11,5.4);rug(26,11,5.4,13,15);
bookcase(26,-20.9,5.4,15);table(26,-11,5.4,8,3);chair(26,-13,5.4);rug(26,-11,5.4,13,11,'rugBlue');
ornament('study lamp',28,6.65,-11,.6,.8,.6,'glow');sphere(23.5,7,-11,.65,'globe');cylinder(23.5,6.55,-11,.15,.6,'gold');
// Foundation landscaping stays near the house, leaving the forecourt clear.
for(const side of [-1,1])for(const x of [15,20,25,30,34]){
 box('planter',side*x,.35,24,3.9,.7,1.5,'trim');sphere(side*x,1.0,24,1,'leaf',[1.7,.7,.75]);
}
for(const x of [-8,8])plant(x,28,0);
for(const y of [.4,5.4])for(const x of [-30,30]){
 ornament('wall art frame',x,y+2.2,.25,3,2,.1,'gold');ornament('wall art',x,y+2.2,.32,2.7,1.7,.07,'art');
}
// Static solids are shared by collision and camera queries; doors are dynamic.
export function stepMansion(actor,dt){
 const p=mansionToLocal(actor.x,actor.z);
 for(const door of mansionDoors){
  const near=Math.hypot(p.x-door.x,p.z-door.z)<7&&Math.abs(actor.y-door.y)<1.2;
  door.open+=(Number(near)-door.open)*(1-Math.exp(-9*dt));
 }
}
function activeSolids(camera=false){
 const list=camera?cameraBoxes:solids;
 return [...list,...mansionDoors.filter(d=>d.open<.9).map(d=>bounds(d.x,d.y+1.85,d.z,5.2,3.7,.20))];
}
export function mansionSupportHeight(x,z,maximum){
 const p=mansionToLocal(x,z);let height=null;
 if(Math.abs(p.x)>37||p.z< -23||p.z>31)return null;
 for(const s of surfaces)if(p.x>=s.minX&&p.x<=s.maxX&&p.z>=s.minZ&&p.z<=s.maxZ&&s.y<=maximum&&(height===null||s.y>height))height=s.y;
 return height;
}
export function resolveMansion(x,z,nx,nz,feetY,radius=.48,height=2.3){
 const p=mansionToLocal(nx,nz);
 if(Math.abs(p.x)>39||p.z< -25||p.z>33)return{x:nx,z:nz};
 for(let pass=0;pass<3;pass++)for(const b of activeSolids()){
  if(feetY>=b.maxY-.015||feetY+height<=b.minY+.015||(b.step&&b.maxY<=feetY+.4))continue;
  const nearX=Math.max(b.minX,Math.min(b.maxX,p.x)),nearZ=Math.max(b.minZ,Math.min(b.maxZ,p.z));
  let dx=p.x-nearX,dz=p.z-nearZ,length=Math.hypot(dx,dz);
  if(length>=radius)continue;
  if(length<.00001){
   const options=[[Math.abs(p.x-b.minX),b.minX-radius,p.z],[Math.abs(b.maxX-p.x),b.maxX+radius,p.z],
    [Math.abs(p.z-b.minZ),p.x,b.minZ-radius],[Math.abs(b.maxZ-p.z),p.x,b.maxZ+radius]];
   options.sort((a,b)=>a[0]-b[0]);p.x=options[0][1];p.z=options[0][2];
  }else{p.x=nearX+dx/length*radius;p.z=nearZ+dz/length*radius;}
 }
 return mansionToWorld(p.x,p.z);
}
export function mansionCeilingHeight(x,z,feetY){
 const p=mansionToLocal(x,z);let ceiling=null;
 for(const b of cameraBoxes)if(b.ceiling&&b.minY>feetY+2.29&&p.x>b.minX&&p.x<b.maxX&&p.z>b.minZ&&p.z<b.maxZ&&(ceiling===null||b.minY<ceiling))ceiling=b.minY;
 return ceiling;
}
export function isInsideMansion(x,z){const p=mansionToLocal(x,z);return Math.abs(p.x)<36&&Math.abs(p.z)<22;}
function rayBox(a,b,box){
 let lo=0,hi=1;
 for(const axis of ['X','Y','Z']){
  const key=axis.toLowerCase(),delta=b[key]-a[key],min=box[`min${axis}`]-.18,max=box[`max${axis}`]+.18;
  if(Math.abs(delta)<1e-8){if(a[key]<min||a[key]>max)return null;continue;}
  let start=(min-a[key])/delta,end=(max-a[key])/delta;if(start>end)[start,end]=[end,start];lo=Math.max(lo,start);hi=Math.min(hi,end);if(lo>hi)return null;
 }
 return lo;
}
export function constrainMansionCamera(target,position){
 const ta=mansionToLocal(target.x,target.z),pa=mansionToLocal(position.x,position.z),a={x:ta.x,y:target.y,z:ta.z},b={x:pa.x,y:position.y,z:pa.z};
 let t=1;
 for(const box of activeSolids(true)){const hit=rayBox(a,b,box);if(hit!==null&&hit>0)t=Math.min(t,Math.max(0,hit-.025));}
 return position.clone().sub(target).multiplyScalar(t).add(target);
}

export function createMansion(){
 const group=new THREE.Group();group.name='Mansion';group.position.set(MANSION.x,0,MANSION.z);group.rotation.y=MANSION.yaw;
 const colors={stone:'#d9c7a3',trim:'#f3e5c9',glass:'#a9c9d0',oak:'#59402b',plaster:'#e8dcc7',wood:'#98734d',foundation:'#9e978c',gold:'#bd9951',rug:'#7d3038',rugBlue:'#344e62',pot:'#94704e',leaf:'#304b37',seat:'#626f76',linen:'#eee9d9',glow:'#ffdb8a',flower:'#d18c99',roof:'#283441',path:'#797a76',dark:'#25242a',fire:'#ff962f',bookRed:'#883b40',bookBlue:'#395d78',bookGreen:'#526a50',cabinet:'#b7c0b5',metal:'#a6adb0',globe:'#50788b',art:'#537175'};
 const materials=Object.fromEntries(Object.entries(colors).map(([key,color])=>[key,new THREE.MeshLambertMaterial({color,side:THREE.DoubleSide,...(key==='glass'?{transparent:true,opacity:.24,depthWrite:false}:{}),...(['glow','fire'].includes(key)?{emissive:color,emissiveIntensity:.8}:{})})]));
 const batches=new Map();
 function add(geometry,material,matrix=new THREE.Matrix4()){
  let g=geometry.index?geometry.toNonIndexed():geometry;g.applyMatrix4(matrix);if(!g.attributes.uv)g.setAttribute('uv',new THREE.BufferAttribute(new Float32Array(g.attributes.position.count*2),2));
  if(!batches.has(material))batches.set(material,[]);batches.get(material).push(g);
 }
 function triangles(vertices,material){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vertices.flat(2),3));g.computeVertexNormals();add(g,material);}
 for(const p of parts){
  if(p.render===false)continue;
  if(p.kind==='roof'){
   const {x0:a,x1:b,z0:c,z1:d,base:y,rise:r}=p,m=(c+d)/2;
   triangles([[a,y,c],[b,y,c],[b,y+r,m],[a,y,c],[b,y+r,m],[a,y+r,m],[a,y+r,m],[b,y+r,m],[b,y,d],[a,y+r,m],[b,y,d],[a,y,d]],p.material);
   triangles([[a,y,c],[a,y+r,m],[a,y,d],[b,y,d],[b,y+r,m],[b,y,c]],'stone');continue;
  }
  if(p.kind==='gable'){
   const {x,half:h,z0:a,z1:b,base:y,rise:r}=p;
   triangles([[x-h,y,a],[x,y+r,a],[x,y+r,b],[x-h,y,a],[x,y+r,b],[x-h,y,b],[x,y+r,a],[x+h,y,a],[x+h,y,b],[x,y+r,a],[x+h,y,b],[x,y+r,b]],'roof');
   triangles([[x-h,y,b],[x,y+r,b],[x+h,y,b]],'stone');continue;
  }
  let geometry,position=new THREE.Vector3(p.x??0,p.y??0,p.z??0),rotation=new THREE.Quaternion(),scale=new THREE.Vector3(1,1,1);
  if(p.kind==='box'){geometry=new THREE.BoxGeometry(p.sx,p.sy,p.sz);rotation.setFromAxisAngle(new THREE.Vector3(0,1,0),p.angle??0);}
  if(p.kind==='cylinder')geometry=new THREE.CylinderGeometry(p.top,p.radius,p.height,12);
  if(p.kind==='sphere'){geometry=new THREE.SphereGeometry(p.radius,12,8);scale.fromArray(p.scale);}
  if(p.kind==='beam'){const a=new THREE.Vector3(...p.a),b=new THREE.Vector3(...p.b),delta=b.clone().sub(a);geometry=new THREE.CylinderGeometry(p.width/2,p.width/2,delta.length(),6);position.copy(a).add(b).multiplyScalar(.5);rotation.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());}
  add(geometry,p.material,new THREE.Matrix4().compose(position,rotation,scale));
 }
 for(const [key,geometries]of batches){const mesh=new THREE.Mesh(mergeGeometries(geometries),materials[key]);mesh.name=`Mansion ${key}`;mesh.castShadow=key!=='glass';mesh.receiveShadow=true;group.add(mesh);for(const g of geometries)g.dispose();}
 const pivots=[];
 for(const door of mansionDoors)for(const side of [-1,1]){
  const pivot=new THREE.Group();pivot.position.set(side*2.6,door.y,22);group.add(pivot);
  const leaf=new THREE.Mesh(new THREE.BoxGeometry(2.6,3.7,.18),materials.oak);leaf.position.set(-side*1.3,1.85,0);pivot.add(leaf);
  const inset=new THREE.Mesh(new THREE.BoxGeometry(2.12,2.65,.20),door.y>1?materials.glass:materials.cabinet);inset.position.set(-side*1.3,2.05,.015);pivot.add(inset);
  const handle=new THREE.Mesh(new THREE.SphereGeometry(.10,8,6),materials.gold);handle.position.set(-side*2.32,1.65,.18);pivot.add(handle);pivots.push({pivot,side,door});
 }
 for(const [x,y,z,intensity,distance]of [[0,8,0,75,26],[-26,3,11,35,23],[26,3,-11,35,23],[-26,8,-11,35,23],[26,8,11,35,23]]){const light=new THREE.PointLight('#ffd79a',intensity,distance,1.5);light.position.set(x,y,z);group.add(light);}
 group.userData.update=()=>{for(const {pivot,side,door}of pivots)pivot.rotation.y=side*Math.PI*.49*door.open;};
 return group;
}
