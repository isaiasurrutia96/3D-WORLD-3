// The same terrain and animated figure, projected without WebGL.
export function createCanvasView(original,initialFaces){
 const canvas=original.cloneNode(false),ctx=canvas.getContext('2d',{alpha:true});
 if(!ctx)throw new Error('The browser could not start a 2D graphics context.');
 original.replaceWith(canvas);canvas.dataset.graphics='canvas';
 let ratio=1,width=1,height=1,faces=initialFaces,actors=()=>[];
 const renderer={
  canvas,info:{render:{calls:0,triangles:0}},setFaces(next){faces=next;},setActors(provider){actors=provider;},
  setPixelRatio(value){ratio=Math.min(1.25,value);},
  setSize(w,h){width=w;height=h;canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);},
  render(_scene,camera){
   camera.updateMatrixWorld();const m=camera.matrixWorldInverse.elements,p=camera.projectionMatrix.elements,c=camera.matrixWorld.elements,near=-camera.near;
   const viewPoint=([x,y,z])=>[m[0]*x+m[4]*y+m[8]*z+m[12],m[1]*x+m[5]*y+m[9]*z+m[13],m[2]*x+m[6]*y+m[10]*z+m[14]];
   function project(points){
    const source=points.map(viewPoint),clipped=[];
    // A walking camera can sit beside/inside a tree. Clip against its near
    // plane before dividing by W so surfaces behind it cannot fill the screen.
    for(let i=0;i<source.length;i++){
     const a=source[i],b=source[(i+1)%source.length],inside=a[2]<=near,nextInside=b[2]<=near;
     if(inside)clipped.push(a);
     if(inside!==nextInside){const t=(near-a[2])/(b[2]-a[2]);clipped.push(a.map((value,j)=>value+(b[j]-value)*t));}
    }
    return clipped.map(([x,y,z])=>{const w=p[3]*x+p[7]*y+p[11]*z+p[15];return[((p[0]*x+p[12])/w+1)*width*.5,(1-(p[5]*y+p[13])/w)*height*.5];});
   }
   const visible=[];
   for(const face of [...faces,...actors()]){
    const n=face.normal,center=face.avatar?face.points.reduce((sum,point)=>sum.map((value,i)=>value+point[i]/face.points.length),[0,0,0]):face.center??(face.center=face.points.reduce((sum,point)=>sum.map((value,i)=>value+point[i]/face.points.length),[0,0,0]));
    const front=camera.isPerspectiveCamera?n[0]*(c[12]-center[0])+n[1]*(c[13]-center[1])+n[2]*(c[14]-center[2]):n[0]*c[8]+n[1]*c[9]+n[2]*c[10];
    if(front<=.00001)continue;
    const projected=project(face.points);if(projected.length<3)continue;
    const xs=projected.map(point=>point[0]),ys=projected.map(point=>point[1]);
    if(Math.max(...xs)<0||Math.min(...xs)>width||Math.max(...ys)<0||Math.min(...ys)>height)continue;
    visible.push({face,projected,depth:m[2]*center[0]+m[6]*center[1]+m[10]*center[2]+m[14]});
   }
   visible.sort((a,b)=>a.depth-b.depth);
   ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,width,height);ctx.lineWidth=.45;ctx.lineJoin='round';
   function polygon(projected,color,seal=false,rounded=false){
    if(projected.length<3)return;ctx.beginPath();
    if(rounded){
     for(let i=0;i<projected.length;i++){
      const current=projected[i],previous=projected[(i+projected.length-1)%projected.length],next=projected[(i+1)%projected.length];
      const before=current.map((value,j)=>value*.82+previous[j]*.18),after=current.map((value,j)=>value*.82+next[j]*.18);
      if(i===0)ctx.moveTo(...before);else ctx.lineTo(...before);ctx.quadraticCurveTo(...current,...after);
     }
    }else projected.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
    ctx.closePath();ctx.fillStyle=color;ctx.fill();if(seal){ctx.strokeStyle=color;ctx.stroke();}
   }
   for(const {face,projected}of visible){
    ctx.globalAlpha=face.alpha??1;
    if(face.water||face.avatar)polygon(projected,face.css,face.avatar&&face.alpha===1);
    else{polygon(projected,face.rim,true);polygon(project(face.inner),face.css,false,true);}
   }
   ctx.globalAlpha=1;renderer.info.render.faces=visible.length;
  }
 };
 return{renderer,canvas,compatible:true};
}
