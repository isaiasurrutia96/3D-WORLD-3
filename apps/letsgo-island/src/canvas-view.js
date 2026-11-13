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
   const project=([x,y,z])=>{const vx=m[0]*x+m[4]*y+m[8]*z+m[12],vy=m[1]*x+m[5]*y+m[9]*z+m[13],vz=m[2]*x+m[6]*y+m[10]*z+m[14],w=p[3]*vx+p[7]*vy+p[11]*vz+p[15];return[((p[0]*vx+p[12])/w+1)*width*.5,(1-(p[5]*vy+p[13])/w)*height*.5];};
   const visible=[];
   for(const face of faces){
    const n=face.normal;if(n[0]*c[8]+n[1]*c[9]+n[2]*c[10]<=.001)continue;
    const center=face.points.reduce((sum,point)=>sum.map((value,i)=>value+point[i]/face.points.length),[0,0,0]);
    visible.push({face,depth:m[2]*center[0]+m[6]*center[1]+m[10]*center[2]+m[14]});
   }
   visible.sort((a,b)=>a.depth-b.depth);
   ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,width,height);ctx.lineWidth=.45;ctx.lineJoin='round';
   function polygon(points,color,seal=false,rounded=false){
    const projected=points.map(project);ctx.beginPath();
    if(rounded){
     for(let i=0;i<projected.length;i++){
      const current=projected[i],previous=projected[(i+projected.length-1)%projected.length],next=projected[(i+1)%projected.length];
      const before=current.map((value,j)=>value*.82+previous[j]*.18),after=current.map((value,j)=>value*.82+next[j]*.18);
      if(i===0)ctx.moveTo(...before);else ctx.lineTo(...before);ctx.quadraticCurveTo(...current,...after);
     }
    }else projected.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
    ctx.closePath();ctx.fillStyle=color;ctx.fill();
    if(seal){ctx.strokeStyle=color;ctx.stroke();}
   }
   for(const {face}of visible){ctx.globalAlpha=face.alpha??1;if(face.water)polygon(face.points,face.css);else{polygon(face.points,face.rim,true);polygon(face.inner,face.css,false,true);}}ctx.globalAlpha=1;
   renderer.info.render.faces=visible.length;
  }
 };
 return{renderer,canvas,compatible:true};
}
