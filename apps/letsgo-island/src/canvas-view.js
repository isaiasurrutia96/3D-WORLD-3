// Software projection of the same exposed faces, for browsers with no WebGL.
// Nothing is redrawn while idle. This is a scene viewer, not a physics engine.
export function createCanvasView(original,initialFaces){
 const canvas=original.cloneNode(false),ctx=canvas.getContext('2d',{alpha:true});
 if(!ctx)throw new Error('The browser could not start a 2D graphics context.');
 original.replaceWith(canvas);canvas.dataset.graphics='canvas';
 let ratio=1,width=1,height=1,faces=initialFaces;
 const renderer={
  canvas,info:{render:{calls:0,triangles:0}},setFaces(next){faces=next;},
  setPixelRatio(value){ratio=Math.min(1.25,value);},
  setSize(w,h){width=w;height=h;canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);},
  render(_scene,camera){
   camera.updateMatrixWorld();const m=camera.matrixWorldInverse.elements,p=camera.projectionMatrix.elements,c=camera.matrixWorld.elements;
   const project=([x,y,z])=>[(p[0]*(m[0]*x+m[4]*y+m[8]*z+m[12])+p[12]+1)*width*.5,(-p[5]*(m[1]*x+m[5]*y+m[9]*z+m[13])-p[13]+1)*height*.5];
   const visible=[];
   for(const face of faces){
    const n=face.normal;if(n[0]*c[8]+n[1]*c[9]+n[2]*c[10]<=.001)continue;
    visible.push({face,depth:m[2]*(face.x+.5)+m[6]*(face.y+.5)+m[10]*(face.z+.5)+m[14]});
   }
   visible.sort((a,b)=>a.depth-b.depth);
   ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,width,height);ctx.lineWidth=.45;ctx.lineJoin='round';
   function polygon(points,color,seal=false){
    const projected=points.map(project);ctx.beginPath();projected.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=color;ctx.fill();
    if(seal){ctx.strokeStyle=color;ctx.stroke();}
   }
   for(const {face}of visible){polygon(face.points,face.rim,true);polygon(face.inner,face.css);}
   renderer.info.render.faces=visible.length;
  }
 };
 return{renderer,canvas,compatible:true};
}
