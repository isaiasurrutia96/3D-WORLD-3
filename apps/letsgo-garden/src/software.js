import {Vector3} from 'three';

// Canvas-only view of this garden's authored surfaces. It keeps the course
// playable if a laptop cannot create a WebGL context.
export function createSoftwareRenderer(faces){
 const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d',{alpha:true});
 if(!ctx)throw new Error('A drawing context is unavailable.');
 canvas.dataset.graphics='canvas';let width=1,height=1,ratio=1,actors=()=>[],baseFaces=faces,showClouds=()=>true,last=0,timer=null,pendingCamera=null;
 const renderer={domElement:canvas,info:{render:{calls:0,triangles:0}},shadowMap:{enabled:false},
  setActorProvider(provider,clouds){actors=provider;showClouds=clouds;},
  setBaseFaces(value){baseFaces=value??faces;},
  setPixelRatio(value){ratio=Math.min(value,1);},getPixelRatio(){return ratio;},
  setSize(w,h){width=w;height=h;canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);canvas.style.width=w+'px';canvas.style.height=h+'px';},
  render(scene,camera){pendingCamera=camera;const remaining=50-(performance.now()-last);if(remaining>0){if(timer===null)timer=setTimeout(()=>{timer=null;paint(pendingCamera);},remaining);return;}paint(camera);}
 };
 function paint(camera){
  last=performance.now();camera.updateMatrixWorld();const view=camera.matrixWorldInverse.elements,projection=camera.projectionMatrix.elements,world=camera.matrixWorld.elements;
  function project(points){
   const source=points.map(([x,y,z])=>[view[0]*x+view[4]*y+view[8]*z+view[12],view[1]*x+view[5]*y+view[9]*z+view[13],view[2]*x+view[6]*y+view[10]*z+view[14]]),clipped=[];
   for(let i=0;i<source.length;i++){const a=source[i],b=source[(i+1)%source.length],inside=a[2]<=-camera.near,next=b[2]<=-camera.near;if(inside)clipped.push(a);if(inside!==next){const t=(-camera.near-a[2])/(b[2]-a[2]);clipped.push(a.map((v,j)=>v+(b[j]-v)*t));}}
   return clipped.map(([x,y,z])=>{const w=projection[3]*x+projection[7]*y+projection[11]*z+projection[15];return[((projection[0]*x+projection[12])/w+1)*width/2,(1-(projection[5]*y+projection[13])/w)*height/2];});
  }
  function drawBatch(batch){
   const visible=[];
   for(const face of batch){if(face.cloud&&!showClouds())continue;const center=face.center??(face.center=face.points.reduce((a,p)=>a.map((v,i)=>v+p[i]/face.points.length),[0,0,0])),n=face.normal;
    const facing=camera.isPerspectiveCamera?n.reduce((v,a,i)=>v+a*(world[12+i]-center[i]),0):n[0]*world[8]+n[1]*world[9]+n[2]*world[10];if(facing<=0&&!face.doubleSided)continue;
    const p=project(face.points);if(p.length<3)continue;const xs=p.map(v=>v[0]),ys=p.map(v=>v[1]);if(Math.max(...xs)<0||Math.min(...xs)>width||Math.max(...ys)<0||Math.min(...ys)>height)continue;
    visible.push({face,p,z:view[2]*center[0]+view[6]*center[1]+view[10]*center[2]+view[14]});
   }
   visible.sort((a,b)=>(a.face.layer??0)-(b.face.layer??0)||a.z-b.z);
   for(const{face,p}of visible){ctx.globalAlpha=face.alpha??1;ctx.beginPath();for(let i=0;i<p.length;i++)i?ctx.lineTo(...p[i]):ctx.moveTo(...p[i]);ctx.closePath();ctx.fillStyle=face.color;ctx.fill();if((face.alpha??1)===1){ctx.strokeStyle=face.color;ctx.stroke();}}
   return visible.length;
  }
  ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,width,height);ctx.lineWidth=.5;ctx.lineJoin='round';const count=drawBatch(baseFaces)+drawBatch(actors());ctx.globalAlpha=1;renderer.info.render.calls=1;renderer.info.render.triangles=count*2;
 }
 return renderer;
}

export function meshProjector(root){
 const entries=[],p=new Vector3(),ab=new Vector3(),ac=new Vector3(),course=root.name.startsWith('Mini golf'),canyon=root.name.startsWith('Canyon Switchbacks');
 root.traverse(mesh=>{if(!mesh.isMesh||mesh.isInstancedMesh||mesh.material.map)return;
  const position=mesh.geometry.attributes.position,index=mesh.geometry.index,vertices=Array.from({length:position.count},()=>[0,0,0]),triangles=[];
  let layer=!course?0:mesh.name.includes('putting surface')?10:mesh.name.includes('Tee marking')?11:mesh.name.startsWith('Cup')?12:mesh.name.includes('stone edging')?20:30;
  // A Canvas painter cannot depth-test the large terrain triangles against
  // the much smaller road strips. Draw the authored surface layers in order
  // so bridge undersides and cliffs never paint over the driving surface.
  if(canyon){const type=mesh.name.split(' ')[1];layer=({water:1,underside:2,asphalt:10,white:12,red:12,rail:20,wood:25,leaf:25,rock:25,flower:25})[type]??0;}
  for(let i=0;i<(index?.count??position.count);i+=3){const ids=[0,1,2].map(j=>index?index.getX(i+j):i+j);triangles.push({points:ids.map(id=>vertices[id]),normal:[0,0,0],color:mesh.material.color?.getStyle()||'#ffffff',alpha:mesh.material.opacity??1,doubleSided:mesh.material.side===2,layer});}
  entries.push({mesh,position,vertices,triangles});
 });
 return()=>{root.updateWorldMatrix(true,true);const faces=[];for(const entry of entries){let visible=true;for(let n=entry.mesh;n;n=n.parent)if(!n.visible){visible=false;break;}if(!visible)continue;
  for(let i=0;i<entry.position.count;i++)p.fromBufferAttribute(entry.position,i).applyMatrix4(entry.mesh.matrixWorld).toArray(entry.vertices[i]);
  for(const f of entry.triangles){ab.fromArray(f.points[1]).sub(p.fromArray(f.points[0]));ac.fromArray(f.points[2]).sub(p);ab.cross(ac).normalize().toArray(f.normal);f.center=undefined;}faces.push(...entry.triangles);
 }return faces;};
}
