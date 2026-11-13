import * as THREE from 'three';
import {outline,terrainHeight,EDGE_SEGMENTS,TAU,pathCurve,riverDistance} from './layout.js';

export function topGeometry(){
 const segments=EDGE_SEGMENTS,rings=32,positions=[0,terrainHeight(0,0),0],colors=[],indices=[];
 const green=new THREE.Color();
 function color(x,z){const variation=.008*Math.sin(x*.18+z*.12)+.005*Math.cos(x*.16-z*.26);green.set('#86c32b').offsetHSL(variation*.15,variation*.3,variation);colors.push(green.r,green.g,green.b);}
 color(0,0);
 for(let ring=1;ring<=rings;ring++)for(let i=0;i<segments;i++){const p=outline(i/segments*TAU,ring/rings);positions.push(p.x,terrainHeight(p.x,p.z),p.z);color(p.x,p.z);}
 for(let i=0;i<segments;i++)indices.push(0,1+(i+1)%segments,1+i);
 for(let ring=1;ring<rings;ring++)for(let i=0;i<segments;i++){const a=1+(ring-1)*segments+i,b=1+(ring-1)*segments+(i+1)%segments,c=a+segments,d=b+segments;indices.push(a,b,c,c,b,d);}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}
export function cliffGeometry(){
 const levels=[[1,0,'#86c32b'],[1.004,-.28,'#79b32b'],[.994,-.9,'#5d9225'],[.994,-1.02,'#edb14b'],[.987,-3.5,'#e3a04b'],[.96,-6.5,'#cd8944'],[.94,-8.8,'#9a919e'],[.94,-15,'#8e8790'],[.84,-22,'#857d89'],[.65,-28,'#78727e'],[.27,-31,'#726b78']],positions=[],colors=[],n=EDGE_SEGMENTS;
 const point=(level,i)=>{const [scale,y]=levels[level],a=i/n*TAU,p=outline(a,scale),w=level<4?0:(level<7?.25:1.15)*Math.sin(a*9+level*.7),rough=level<7?1:1+.055*Math.sin(a*17+level);return[p.x*rough,terrainHeight(outline(a).x,outline(a).z)+y+w,p.z*rough];};
 function face(a,b,c,color,shade){const col=new THREE.Color(color).multiplyScalar(shade);positions.push(...a,...b,...c);for(let j=0;j<3;j++)colors.push(col.r,col.g,col.b);}
 for(let band=0;band<levels.length-1;band++)for(let i=0;i<n;i++){
  const j=(i+1)%n,a=point(band,i),b=point(band,j),c=point(band+1,i),d=point(band+1,j),shade=1+.055*Math.sin(Math.floor(i/2)*13.7+band*4.3);
  // The first three rings round the turf lip; earth and stone use broad facets.
  const color=levels[band][2];face(a,b,c,color,shade);face(b,d,c,color,shade*.985);
 }
 for(let i=0;i<n;i++)face(point(levels.length-1,i),point(levels.length-1,(i+1)%n),[0,-32.5,0],'#726b78',.92);
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.computeVertexNormals();return g;
}
export function pathGeometry(curve=pathCurve,width=4.5,{bridgeGap=true}={}){
 const count=480,positions=[],indices=[],uv=[];
 for(let i=0;i<=count;i++){
  const p=curve.getPoint(i/count),d=curve.getTangent(i/count),nx=d.z,nz=-d.x;
  for(const side of [-1,1]){const x=p.x+nx*width*.5*side,z=p.z+nz*width*.5*side;positions.push(x,terrainHeight(x,z)+.045,z);uv.push(i/6,side*.5+.5);}
  if(i){const mid=curve.getPoint((i-.5)/count);if(!bridgeGap||riverDistance(mid.x,mid.z)>4.2){const a=(i-1)*2,b=i*2;indices.push(a,b,a+1,a+1,b,b+1);}}
 }
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();return g;
}
export function createTerrain(){
 const group=new THREE.Group();group.name='Floating island terrain';
 const top=new THREE.Mesh(topGeometry(),new THREE.MeshStandardMaterial({vertexColors:true,roughness:1}));top.name='Continuous grass surface';top.receiveShadow=true;group.add(top);
 const cliffs=new THREE.Mesh(cliffGeometry(),new THREE.MeshStandardMaterial({vertexColors:true,roughness:1,flatShading:true}));cliffs.name='Layered earth and rocky underside';cliffs.receiveShadow=true;cliffs.castShadow=true;group.add(cliffs);
 const material=new THREE.MeshStandardMaterial({color:'#e5bd77',roughness:1}),path=new THREE.Mesh(pathGeometry(),material);path.name='Connected dirt loop';path.receiveShadow=true;group.add(path);
 const spur=new THREE.CatmullRomCurve3([new THREE.Vector3(-35,0,-4),new THREE.Vector3(-35.5,0,-8),new THREE.Vector3(-36,0,-12)]);
 const entry=new THREE.Mesh(pathGeometry(spur,3.8,{bridgeGap:false}),material);entry.name='Golf access path';entry.receiveShadow=true;group.add(entry);
 return group;
}
