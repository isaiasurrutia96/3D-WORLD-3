import {Color,Vector3} from 'three';

// Project the actual meshes in the no-WebGL renderer. Transform buffers and
// triangle objects are reused; hidden seated/standing rigs are not drawn.
export function createCanvasMesh(root){
 const entries=[],point=new Vector3(),ab=new Vector3(),ac=new Vector3();
 root.traverse(mesh=>{
  if(!mesh.isMesh)return;const position=mesh.geometry.getAttribute('position'),index=mesh.geometry.index;
  const color=mesh.material.color??new Color('#b9b2a6'),shades=Array.from({length:32},(_,i)=>color.clone().multiplyScalar(.55+i/31*.65).getStyle());
  const vertices=Array.from({length:position.count},()=>[0,0,0]),triangles=[];
  for(let i=0;i<(index?.count??position.count);i+=3){
   const ids=[0,1,2].map(j=>index?index.getX(i+j):i+j),face={points:ids.map(id=>vertices[id]),normal:[0,0,0],avatar:true,css:shades[20],alpha:1};triangles.push(face);
  }
  entries.push({mesh,position,vertices,triangles,shades});
 });
 return()=>{
  root.updateWorldMatrix(true,true);const faces=[];
  for(const {mesh,position,vertices,triangles,shades}of entries){
   let shown=true;for(let parent=mesh;parent;parent=parent.parent)if(!parent.visible){shown=false;break;}if(!shown)continue;
   for(let i=0;i<position.count;i++){point.fromBufferAttribute(position,i).applyMatrix4(mesh.matrixWorld);point.toArray(vertices[i]);}
   for(const face of triangles){
    ab.fromArray(face.points[1]).sub(point.fromArray(face.points[0]));ac.fromArray(face.points[2]).sub(point);ab.cross(ac).normalize().toArray(face.normal);
    const light=Math.max(0,Math.min(1,.45+face.normal[1]*.4-face.normal[0]*.22-face.normal[2]*.16));face.css=shades[Math.round(light*31)];
   }
   faces.push(...triangles);
  }
  return faces;
 };
}
export function createCanvasAvatar(avatar){
 const body=createCanvasMesh(avatar.player.object),point=new Vector3();
 const shadow={points:Array.from({length:16},()=>[0,0,0]),normal:[0,1,0],avatar:true,css:'#29452b',alpha:.18};
 return()=>{
  avatar.root.updateMatrixWorld(true);const faces=body();if(!avatar.shadow.visible)return faces;
  for(let i=0;i<16;i++){const angle=i/16*Math.PI*2;point.set(Math.cos(angle)*.65,Math.sin(angle)*.65,0).applyMatrix4(avatar.shadow.matrixWorld);point.toArray(shadow.points[i]);}
  shadow.alpha=avatar.shadow.material.opacity*.6;return[...faces,shadow];
 };
}
