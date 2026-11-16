import plan from './data/plan.json';
import components from './data/surfaces.json';
import summary from './data/mesh-summary.json';
import surfaceURL from './data/surfaces.bin?url';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {createMiniGolf} from './mini-golf.js';
import {createSoftwareRenderer,meshProjector} from './software.js';

export async function startGarden(){

const binary=await fetch(surfaceURL).then(response=>{if(!response.ok)throw new Error('The island geometry could not load.');return response.arrayBuffer();});
const scene=new THREE.Scene(),world=new THREE.Group(),land=new THREE.Group(),clouds=new THREE.Group();world.name='Floating Garden — connected material surfaces';land.name='Island terrain and five trees';clouds.name='Three merged cloud shapes';world.add(land,clouds);scene.add(world);
let renderer,software=false;
for(const options of [{antialias:true,powerPreference:'default'},{antialias:false,powerPreference:'default'},{antialias:false,powerPreference:'low-power'}]){try{renderer=new THREE.WebGLRenderer({...options,alpha:true,preserveDrawingBuffer:true,failIfMajorPerformanceCaveat:false});break;}catch{}}
if(!renderer){const data=await import('./data/compatibility-faces.json');renderer=createSoftwareRenderer(data.default);software=true;}
renderer.setPixelRatio(Math.min(devicePixelRatio,1));renderer.setSize(innerWidth,innerHeight);if(!software){renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NeutralToneMapping;renderer.toneMappingExposure=1;renderer.shadowMap.enabled=false;renderer.shadowMap.type=THREE.VSMShadowMap;}document.body.appendChild(renderer.domElement);renderer.domElement.dataset.graphics=software?'canvas':'webgl';
const camera=new THREE.OrthographicCamera(-12,12,9,-9,.1,150),controls=new OrbitControls(camera,renderer.domElement),center=new THREE.Vector3(7.74,-.25,-6.88);controls.target.copy(center);controls.enablePan=false;controls.enableDamping=false;controls.minZoom=.65;controls.maxZoom=4;controls.maxPolarAngle=Math.PI*.85;
if(!software){const room=new RoomEnvironment(),pmrem=new THREE.PMREMGenerator(renderer);scene.environment=pmrem.fromScene(room,.04).texture;scene.environmentIntensity=.4;room.dispose();pmrem.dispose();}
scene.add(new THREE.HemisphereLight('#fff8ea','#b4c8df',1.05));
const sun=new THREE.DirectionalLight('#fff0d1',2.8);sun.position.copy(center).add(new THREE.Vector3(-10,18,12));sun.target.position.copy(center);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-11,right:11,top:11,bottom:-11,near:.1,far:48});sun.shadow.normalBias=.003;sun.shadow.bias=-.000015;sun.shadow.radius=5;sun.shadow.blurSamples=8;scene.add(sun,sun.target);
const fill=new THREE.DirectionalLight('#edf7ff',.45);fill.position.copy(center).add(new THREE.Vector3(14,6,-12));scene.add(fill);
const palette={grass:'#91cb34',dirt:'#ca8e57',stone:'#a6a1ad',path:'#dcd1b9',sand:'#cbc9ad',wood:'#986332',leaf:'#76b62f',rock:'#bdb4b7',shrub:'#6ba52b',flowerPink:'#ef8644',flowerGold:'#f4c73c',flowerWhite:'#fff6dd',stem:'#5c952f',cloud:'#ffffff'};
const materials=new Map();for(const[type,color]of Object.entries(palette))materials.set(type,new THREE.MeshStandardMaterial({color,roughness:type==='cloud'?.9:.77,metalness:0}));
for(const item of components){
 let geometry,mesh;
 if(item.kind==='box'){geometry=new RoundedBoxGeometry(item.size_m,item.size_m,item.size_m,4,item.size_m*.085);mesh=new THREE.Mesh(geometry,materials.get(item.type));mesh.position.fromArray(item.position_m);}
 else{geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array(binary,item.positionOffset,item.vertexCount*3),3));geometry.setAttribute('normal',new THREE.BufferAttribute(new Float32Array(binary,item.normalOffset,item.vertexCount*3),3));geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(binary,item.indexOffset,item.indexCount),1));mesh=new THREE.Mesh(geometry,materials.get(item.type));}
 geometry.computeBoundingBox();geometry.computeBoundingSphere();mesh.name=`${item.type} — ${item.features.join(', ')} — ${item.sourceBlockIds.length} source blocks`;mesh.castShadow=item.type!=='cloud';mesh.receiveShadow=item.type!=='cloud';mesh.userData={type:item.type,features:item.features,sourceBlockIds:item.sourceBlockIds,merged:true};(item.type==='cloud'?clouds:land).add(mesh);
}
// Batch disconnected components of the same material for efficient drawing.
// This preserves their separate shapes, their bounds, and editable source IDs.
for(const parent of [land,clouds]){
 const batches=new Map();for(const mesh of [...parent.children]){const type=mesh.userData.type;if(!batches.has(type))batches.set(type,[]);batches.get(type).push(mesh);}
 for(const[type,meshes]of batches){
  const geometries=[],fitBoxes=[],parts=[];
  for(const mesh of meshes){mesh.updateMatrix();const g=mesh.geometry.clone();g.applyMatrix4(mesh.matrix);g.deleteAttribute('uv');if(!g.index)g.setIndex(Array.from({length:g.attributes.position.count},(_,i)=>i));g.computeBoundingBox();fitBoxes.push(g.boundingBox.clone());parts.push({...mesh.userData,name:mesh.name});geometries.push(g);parent.remove(mesh);mesh.geometry.dispose();}
  const geometry=mergeGeometries(geometries,false);const mesh=new THREE.Mesh(geometry,materials.get(type));mesh.name=`${type} — merged material surfaces`;mesh.castShadow=type!=='cloud';mesh.receiveShadow=type!=='cloud';mesh.userData={type,parts,merged:true};mesh.userData.fitBoxes=fitBoxes.map(b=>({min:b.min.toArray(),max:b.max.toArray()}));parent.add(mesh);for(const g of geometries)g.dispose();
 }
}

// The water surface is one continuous mesh over the planned pond and outlet.
const Q=.1075,pondPositions=[],pondNormals=[];
for(const[x,y]of plan.pond_cells){const x0=x*.43,x1=x0+.43,z0=-y*.43,z1=z0-.43,h=-Q;pondPositions.push(x0,h,z0,x1,h,z0,x1,h,z1,x0,h,z0,x1,h,z1,x0,h,z1);for(let i=0;i<6;i++)pondNormals.push(0,1,0);}
const pondGeometry=new THREE.BufferGeometry();pondGeometry.setAttribute('position',new THREE.Float32BufferAttribute(pondPositions,3));pondGeometry.setAttribute('normal',new THREE.Float32BufferAttribute(pondNormals,3));
const waterMaterial=new THREE.MeshPhysicalMaterial({color:'#28c9de',roughness:.24,clearcoat:.8,clearcoatRoughness:.22,transparent:true,opacity:.88,depthWrite:false});
const pond=new THREE.Mesh(pondGeometry,waterMaterial);pond.name='Pond and connected waterfall outlet';pond.receiveShadow=true;pond.renderOrder=2;land.add(pond);
const pondCells=new Set(plan.pond_cells.map(([x,y])=>x+','+y)),waveMaterial=new THREE.MeshBasicMaterial({color:'#e3ffff',transparent:true,opacity:.58});
for(const [i,[x,y]]of plan.pond_cells.entries())if(i%2===0){
 const cx=(x+.5)*.43,cz=-(y+.5)*.43,curve=new THREE.QuadraticBezierCurve3(new THREE.Vector3(cx-.12,-Q+.006,cz),new THREE.Vector3(cx,-Q+.006,cz-.035),new THREE.Vector3(cx+.12,-Q+.006,cz));
 const wave=new THREE.Mesh(new THREE.TubeGeometry(curve,10,.006,4,false),waveMaterial);wave.name='Pond ripple';wave.renderOrder=3;land.add(wave);
}

const fall=new THREE.Group();fall.name='Waterfall — continuous curved lip and falling sheet';land.add(fall);
const fallX=(plan.waterfall.x_min_q+plan.waterfall.x_max_q)*Q/2,fallZ=-plan.waterfall.edge_y_q*Q,fallWidth=(plan.waterfall.x_max_q-plan.waterfall.x_min_q)*Q,drop=3.3;
function fallPoint(u,t){
 const bend=.15;let y,z;if(t<bend){const a=t/bend*Math.PI/2;y=-Q-.18*(1-Math.cos(a));z=fallZ+.18*Math.sin(a);}else{y=-Q-.18-(t-bend)/(1-bend)*(drop-.18);z=fallZ+.18+.045*Math.sin((t-bend)*4);}
 const width=fallWidth*(1-.28*t);return new THREE.Vector3(fallX+u*width/2+.014*Math.sin(t*30+u*3),y,z+.008*Math.cos(u*9+t*18));
}
const fp=[],uv=[],fi=[],columns=12,rows=48;
for(let r=0;r<=rows;r++)for(let c=0;c<=columns;c++){const p=fallPoint(c/columns*2-1,r/rows);fp.push(p.x,p.y,p.z);uv.push(c/columns,r/rows);}
for(let r=0;r<rows;r++)for(let c=0;c<columns;c++){const a=r*(columns+1)+c,b=a+1,d=a+columns+1,e=d+1;fi.push(a,d,b,b,d,e);}
const fallGeometry=new THREE.BufferGeometry();fallGeometry.setAttribute('position',new THREE.Float32BufferAttribute(fp,3));fallGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));fallGeometry.setIndex(fi);fallGeometry.computeVertexNormals();
const sheet=new THREE.Mesh(fallGeometry,new THREE.MeshPhysicalMaterial({color:'#38d2e7',roughness:.27,clearcoat:.65,transparent:true,opacity:.7,side:THREE.DoubleSide,depthWrite:false}));sheet.renderOrder=3;sheet.name='Flowing water sheet';fall.add(sheet);
const streakMaterial=new THREE.LineBasicMaterial({color:'#efffff',transparent:true,opacity:.66,depthWrite:false});
for(const [i,u]of [-.8,-.4,.04,.44,.8].entries()){
 const points=[];for(let s=0;s<30;s++){const t=.025+s/29*(.72+i*.035),p=fallPoint(u,t);p.z+=.009;points.push(p);}const geo=new THREE.BufferGeometry().setFromPoints(points);const line=new THREE.Line(geo,streakMaterial);line.renderOrder=4;line.name='Waterfall highlight';fall.add(line);
}
const droplets=new THREE.InstancedMesh(new RoundedBoxGeometry(.055,.085,.055,2,.012),new THREE.MeshBasicMaterial({color:'#e4fbff',transparent:true,opacity:.72}),26),dummy=new THREE.Object3D();
for(let i=0;i<26;i++){const t=i/25;dummy.position.set(fallX+Math.sin(i*2.37)*.28*(1-t),-Q-drop-.08-i*.031,fallZ+.23+Math.cos(i*1.73)*.08);dummy.scale.setScalar(.45+(i%4)*.16);dummy.updateMatrix();droplets.setMatrixAt(i,dummy.matrix);}droplets.name='Waterfall droplets';fall.add(droplets);

const golf=createMiniGolf({THREE,RoundedBoxGeometry,world,renderer,camera,onRender:()=>render(),onExit:()=>setupView('front')});
if(software){const course=meshProjector(golf.group),waterfall=meshProjector(fall);renderer.setActorProvider(()=>[...waterfall(),...course()],()=>clouds.visible);document.querySelector('footer').textContent='Compatibility view · Drag to orbit · Scroll or pinch to zoom';for(const option of document.querySelector('#quality').options)if(option.value!=='low')option.disabled=true;}
let currentView='front',quality='low';
const directions={front:new THREE.Vector3(10,10.5,20),back:new THREE.Vector3(-18,12,-19),low:new THREE.Vector3(11,6,23),top:new THREE.Vector3(0,40,.001)};
function render(){renderer.render(scene,camera);}
function fitCamera(){
 camera.updateMatrixWorld(true);world.updateMatrixWorld(true);const inverse=camera.matrixWorldInverse,p=new THREE.Vector3(),matrix=new THREE.Matrix4();let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
 world.traverse(o=>{if(!o.isMesh||!o.visible||!o.parent.visible)return;if(!o.geometry.boundingBox)o.geometry.computeBoundingBox();const box=o.geometry.boundingBox;
  function include(transform,bounds=box){for(const x of[bounds.min.x,bounds.max.x])for(const y of[bounds.min.y,bounds.max.y])for(const z of[bounds.min.z,bounds.max.z]){p.set(x,y,z).applyMatrix4(transform).applyMatrix4(inverse);minX=Math.min(minX,p.x);maxX=Math.max(maxX,p.x);minY=Math.min(minY,p.y);maxY=Math.max(maxY,p.y);}}
  if(o.userData.fitBoxes){for(const b of o.userData.fitBoxes)include(o.matrixWorld,new THREE.Box3(new THREE.Vector3().fromArray(b.min),new THREE.Vector3().fromArray(b.max)));return;}
  if(o.isInstancedMesh){for(let i=0;i<o.count;i++){o.getMatrixAt(i,matrix);include(new THREE.Matrix4().multiplyMatrices(o.matrixWorld,matrix));}}else include(o.matrixWorld);
 });
 const aspect=innerWidth/innerHeight,half=Math.max((maxY-minY)/2,(maxX-minX)/(2*aspect))*1.09,mx=(minX+maxX)/2,my=(minY+maxY)/2;camera.left=mx-half*aspect;camera.right=mx+half*aspect;camera.top=my+half;camera.bottom=my-half;camera.updateProjectionMatrix();
}
function setupView(view){
 if(view==='golf'){setupGolf();return;}
 golf.setPlaying(false);controls.enabled=true;
 currentView=view;clouds.visible=view!=='top';camera.up.set(0,1,0);camera.zoom=1;camera.position.copy(center).add(directions[view]);controls.target.copy(center);camera.lookAt(center);controls.enableRotate=view!=='top';controls.update();fitCamera();render();
}
function setupGolf(){currentView='golf';clouds.visible=false;controls.enabled=false;golf.setPlaying(true);camera.up.set(0,1,0);camera.zoom=1;camera.position.copy(golf.focus).add(new THREE.Vector3(1.8,5.8,5.7));camera.lookAt(golf.focus);const aspect=innerWidth/innerHeight,span=Math.max(4.8,5.8/aspect);camera.left=-span*aspect/2;camera.right=span*aspect/2;camera.top=span/2;camera.bottom=-span/2;camera.updateProjectionMatrix();render();}
function setQuality(value){
 if(software&&value!=='low')return false;
 quality=value;const config={low:{ratio:1,shadow:0},good:{ratio:1.5,shadow:1024},excellent:{ratio:2,shadow:2048}}[value];renderer.setPixelRatio(Math.min(devicePixelRatio,config.ratio));renderer.shadowMap.enabled=config.shadow>0;
 if(config.shadow){sun.shadow.mapSize.set(config.shadow,config.shadow);if(sun.shadow.map){sun.shadow.map.dispose();sun.shadow.map=null;}if(sun.shadow.mapPass){sun.shadow.mapPass.dispose();sun.shadow.mapPass=null;}}
 renderer.setSize(innerWidth,innerHeight);document.querySelector('#quality').value=value;try{localStorage.setItem('letsgo.garden.graphics.v1',value);}catch{}render();
}
for(const b of document.querySelectorAll('[data-view]'))b.onclick=()=>setupView(b.dataset.view);document.querySelector('#play-golf').onclick=setupGolf;document.querySelector('#quality').onchange=e=>setQuality(e.target.value);controls.addEventListener('change',render);window.addEventListener('resize',()=>{renderer.setSize(innerWidth,innerHeight);setupView(currentView);});
try{const saved=localStorage.getItem('letsgo.garden.graphics.v1');if(['low','good','excellent'].includes(saved))setQuality(saved);}catch{}setupView('front');document.querySelector('#loading').remove();
window.referenceIsland={world,land,clouds,fall,pond,golf,renderer,scene,camera,controls,plan,summary,components,setupView,setQuality,render,clean:()=>document.body.classList.add('clean'),getQuality:()=>quality};window.referenceIslandReady=true;window.__letsgoGarden=window.referenceIsland;renderer.domElement.dataset.ready='true';
}
