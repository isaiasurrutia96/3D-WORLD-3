import * as THREE from 'three';
import {riverCurve,riverPoints,waterHeight,groundHeight,FALL,pathCurve,riverDistance} from './layout.js';
import {Batches} from './props.js';

function flowingMaterial(fall=false){return new THREE.ShaderMaterial({side:THREE.DoubleSide,toneMapped:false,uniforms:{time:{value:0},fall:{value:fall?1:0}},vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform float time;uniform float fall;varying vec2 vUv;void main(){float flow=vUv.y*14.+time*2.2;float streak=pow(.5+.5*sin(vUv.x*22.+sin(flow*.5)*.7),5.);float ripple=(.5+.5*sin(flow*1.7+vUv.x*9.))*.025;vec3 blue=mix(vec3(.008,.40,.66),vec3(.025,.68,.78),vUv.x);blue=mix(blue,vec3(.78,.98,1.),streak*.38+ripple);float lip=fall*smoothstep(.92,1.,vUv.y);blue=mix(blue,vec3(.86,1.,1.),lip*.7);gl_FragColor=vec4(blue,1.);#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}`.replace('1.);#include','1.);\n#include')});}
export function waterfallGeometry(){
 const positions=[],uv=[],indices=[],columns=18,rows=24,end=riverCurve.getPoint(1),direction=riverCurve.getTangent(1),tx=direction.z,tz=-direction.x;
 for(let j=0;j<=rows;j++)for(let i=0;i<=columns;i++){
  const t=j/rows,s=(i/columns-.5),spread=FALL.width*(1+.10*t),out=Math.sin(t*Math.PI*.8)*1.2;
  const lipX=end.x+tx*s*FALL.width,lipZ=end.z+tz*s*FALL.width,lip=waterHeight(lipX,lipZ);
  positions.push(end.x+tx*s*spread+FALL.nx*out,lip+(FALL.bottom-lip)*t,end.z+tz*s*spread+FALL.nz*out);uv.push(i/columns,1-t);
  if(j&&i){const a=(j-1)*(columns+1)+i-1,b=a+1,c=a+columns+1,d=c+1;indices.push(a,b,c,b,d,c);}
 }
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();return g;
}
export function streamGeometry(){
 const positions=[],uv=[],indices=[],n=120;
 for(let i=0;i<=n;i++){
  const p=riverCurve.getPoint(i/n),d=riverCurve.getTangent(i/n),w=FALL.width*.5+(i<18?Math.cos(i/18*Math.PI/2)*.8:0);
  for(const side of [-1,1]){const x=p.x+d.z*w*side,z=p.z-d.x*w*side;positions.push(x,waterHeight(x,z),z);uv.push((side+1)/2,1-i/n);}
  if(i){const a=(i-1)*2,b=i*2;indices.push(a,b,a+1,a+1,b,b+1);}
 }
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();return g;
}
export function createWater(){
 const group=new THREE.Group();group.name='Continuous stream and waterfall';const streamMaterial=flowingMaterial(),fallMaterial=flowingMaterial(true);
 const stream=new THREE.Mesh(streamGeometry(),streamMaterial);stream.name='Stream to cliff edge';group.add(stream);
 const p=riverPoints[0],pond=new THREE.Mesh(new THREE.CircleGeometry(3.35,40),streamMaterial);pond.rotation.x=-Math.PI/2;pond.scale.x=1.1;pond.position.set(p.x,waterHeight(p.x,p.z)+.01,p.z);pond.name='Waterfall spring';group.add(pond);
 const fall=new THREE.Mesh(waterfallGeometry(),fallMaterial);fall.name='Flowing waterfall';group.add(fall);
 const foam=new Batches(group);
 for(let i=0;i<13;i++){const a=i*.47,r=2.6+(i%3)*.7;foam.add('foam',[FALL.x+Math.cos(a)*r,FALL.bottom+.2+(i%3)*.35,FALL.z+Math.sin(a)*r],[1.6,1,1.5],'#f4fcff');}
 for(const side of [-1,1])foam.add('stone',[FALL.x+FALL.nz*side*3.8,groundHeight(FALL.x,FALL.z)+.3,FALL.z-FALL.nx*side*3.8],[1.7,2,1.8],'#a19a92',[.2,side,.2]);
 for(const [dx,dz,s]of [[0,0,2.2],[-1.7,.3,1.8],[1.6,.5,2]])foam.add('foam',[FALL.x+dx,FALL.bottom+.15,FALL.z+dz],[s,1.05,s],'#f4fcff');
 foam.finish();
 // The path and stream share this sampled crossing, so the bridge spans the
 // actual cut in the dirt path rather than an unrelated decorative location.
 let best=null;
 for(let i=0;i<500;i++){const t=i/500,p=pathCurve.getPoint(t),distance=riverDistance(p.x,p.z);if(!best||distance<best.distance)best={t,p,distance};}
 const center=best.p,d=pathCurve.getTangent(best.t),deck=new Batches(group),y=groundHeight(center.x,center.z)+.11;
 for(let i=0;i<13;i++){const along=(i-6)*.69;deck.add('box',[center.x+d.x*along,y,center.z+d.z*along],[4.8,.25,.63],i%3?'#d7aa68':'#e7bd7d',[0,Math.atan2(d.x,d.z),0]);}
 deck.finish();group.userData.bridge={x:center.x,z:center.z};
 return{group,update(time){streamMaterial.uniforms.time.value=time;fallMaterial.uniforms.time.value=time;}};
}
