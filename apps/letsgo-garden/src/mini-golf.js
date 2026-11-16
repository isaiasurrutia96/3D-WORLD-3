// One small flat hole. The visible inner rail and ball collision boundary
// come from the same sampled path, so there are no invisible corner traps.
export function createMiniGolf({THREE,RoundedBoxGeometry,world,renderer,camera,onRender,onExit}){
 const origin={x:4.3,y:4.3},floorY=.12,radius=.043,cupRadius=.095;
 const tee=new THREE.Vector2(.645,.55),cup=new THREE.Vector2(3.55,1.935);
 const polygon=[[0,0],[1.29,0],[1.29,.86],[1.72,1.29],[4.3,1.29],[4.3,2.58],[0,2.58]].map(p=>new THREE.Vector2(...p));
 const group=new THREE.Group();group.name='Mini golf — Hole 1, Par 2';group.position.set(origin.x,0,-origin.y);world.add(group);
 const ui=document.querySelector('#golf-ui'),counter=document.querySelector('#golf-strokes'),message=document.querySelector('#golf-message'),powerFill=document.querySelector('#golf-power-fill');
 function roundedPath(vertices,r,Type=THREE.Shape){
  const path=new Type(),corners=vertices.map((p,i)=>{
   const prev=vertices[(i+vertices.length-1)%vertices.length],next=vertices[(i+1)%vertices.length],distance=Math.min(r,p.distanceTo(prev)*.35,p.distanceTo(next)*.35);
   return {p,a:p.clone().add(prev.clone().sub(p).normalize().multiplyScalar(distance)),b:p.clone().add(next.clone().sub(p).normalize().multiplyScalar(distance))};
  });
  path.moveTo(corners[0].a.x,corners[0].a.y);for(const c of corners){path.lineTo(c.a.x,c.a.y);path.quadraticCurveTo(c.p.x,c.p.y,c.b.x,c.b.y);}path.closePath();return path;
 }
 function expand(vertices,distance){return vertices.map((p,i)=>{
  const prev=vertices[(i+vertices.length-1)%vertices.length],next=vertices[(i+1)%vertices.length],a=p.clone().sub(prev).normalize(),b=next.clone().sub(p).normalize();
  const na=new THREE.Vector2(a.y,-a.x),nb=new THREE.Vector2(b.y,-b.x),bis=na.clone().add(nb);return p.clone().add(bis.multiplyScalar(distance/bis.dot(nb)));
 });}
 const outline=roundedPath(polygon,.16),boundary=outline.getPoints(8).filter((p,i,list)=>i===0||p.distanceTo(list[i-1])>1e-8);if(boundary[0].distanceTo(boundary.at(-1))<1e-7)boundary.pop();
 const hole=new THREE.Path();hole.absarc(cup.x,cup.y,.105,0,Math.PI*2,true);outline.holes.push(hole);
 const turfGeometry=new THREE.ExtrudeGeometry(outline,{depth:.08,bevelEnabled:true,bevelThickness:.01,bevelSize:.008,bevelSegments:3,curveSegments:16});turfGeometry.rotateX(-Math.PI/2);turfGeometry.translate(0,.03,0);
 const turf=new THREE.Mesh(turfGeometry,new THREE.MeshStandardMaterial({color:'#519d63',roughness:.94}));turf.name='One continuous putting surface with a real cup opening';turf.receiveShadow=true;turf.castShadow=true;group.add(turf);
 const rimShape=roundedPath(expand(polygon,.13),.22);rimShape.holes.push(roundedPath(polygon,.16,THREE.Path));
 const rimGeo=new THREE.ExtrudeGeometry(rimShape,{depth:.18,bevelEnabled:true,bevelThickness:.025,bevelSize:.018,bevelSegments:4,curveSegments:16});rimGeo.rotateX(-Math.PI/2);rimGeo.translate(0,.035,0);
 const rail=new THREE.Mesh(rimGeo,new THREE.MeshStandardMaterial({color:'#e1d5b5',roughness:.8}));rail.name='Continuous softly rounded stone edging';rail.castShadow=true;rail.receiveShadow=true;group.add(rail);
 const well=new THREE.Mesh(new THREE.CylinderGeometry(.096,.096,.12,32,1,true),new THREE.MeshStandardMaterial({color:'#344e40',roughness:.9,side:THREE.DoubleSide}));well.position.set(cup.x,.052,-cup.y);well.name='Cup inside wall';group.add(well);
 const bottom=new THREE.Mesh(new THREE.CircleGeometry(.096,32),new THREE.MeshStandardMaterial({color:'#253c32',roughness:1}));bottom.rotation.x=-Math.PI/2;bottom.position.set(cup.x,.012,-cup.y);bottom.name='Cup bottom';group.add(bottom);
 const teeMark=new THREE.Mesh(new THREE.CircleGeometry(.18,32),new THREE.MeshStandardMaterial({color:'#9cce8a',roughness:1}));teeMark.rotation.x=-Math.PI/2;teeMark.scale.y=.65;teeMark.position.set(tee.x,floorY+.002,-tee.y);teeMark.name='Tee marking';group.add(teeMark);
 const ball=new THREE.Mesh(new THREE.SphereGeometry(radius,24,16),new THREE.MeshStandardMaterial({color:'#fffdf5',roughness:.43}));ball.name='Golf ball';ball.castShadow=true;group.add(ball);
 const pole=new THREE.Mesh(new THREE.CylinderGeometry(.013,.018,.94,12),new THREE.MeshStandardMaterial({color:'#f5e8cb',roughness:.55}));pole.position.set(cup.x,floorY+.47,-cup.y);pole.name='Flagpole';pole.castShadow=true;group.add(pole);
 const flagShape=new THREE.Shape();flagShape.moveTo(0,0);flagShape.lineTo(.43,0);flagShape.lineTo(.34,-.13);flagShape.lineTo(.43,-.26);flagShape.lineTo(0,-.26);flagShape.closePath();
 const flag=new THREE.Mesh(new THREE.ShapeGeometry(flagShape),new THREE.MeshStandardMaterial({color:'#e85d54',side:THREE.DoubleSide,roughness:.75}));flag.position.set(cup.x,floorY+.92,-cup.y);flag.name='Red hole flag';flag.castShadow=true;group.add(flag);
 const textCanvas=document.createElement('canvas');textCanvas.width=128;textCanvas.height=128;const ctx=textCanvas.getContext('2d');ctx.fillStyle='#fffbed';ctx.font='bold 108px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('1',64,70);const texture=new THREE.CanvasTexture(textCanvas);texture.colorSpace=THREE.SRGBColorSpace;
 const number=new THREE.Mesh(new THREE.PlaneGeometry(.18,.2),new THREE.MeshBasicMaterial({map:texture,transparent:true,side:THREE.DoubleSide,depthWrite:false}));number.position.set(cup.x+.15,floorY+.79,-cup.y+.003);number.name='Flag number 1';group.add(number);
 const aim=new THREE.ArrowHelper(new THREE.Vector3(0,0,-1),new THREE.Vector3(),.7,'#fff5bf',.14,.085);aim.name='Putt aiming arrow';aim.visible=false;group.add(aim);

 const position=tee.clone(),velocity=new THREE.Vector2(),ray=new THREE.Raycaster(),pointer=new THREE.Vector2(),plane=new THREE.Plane(new THREE.Vector3(0,1,0),-floorY),hit=new THREE.Vector3();
 const friction=1.2,maxSpeed=3.9,maxPull=1.1,restitution=.57;
 let playing=false,dragPointer=null,power=0,strokeCount=0,won=false,sinking=0,frameId=0,lastTime=0;
 const launchDirection=new THREE.Vector2();
 function isInside(p){let inside=false;for(let i=0,j=boundary.length-1;i<boundary.length;j=i++){const a=boundary[i],b=boundary[j];if((a.y>p.y)!==(b.y>p.y)&&p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x)inside=!inside;}return inside;}
 const segments=boundary.map((a,i)=>{const b=boundary[(i+1)%boundary.length],d=b.clone().sub(a),inward=new THREE.Vector2(-d.y,d.x).normalize();return {a,b,d,lengthSq:d.lengthSq(),inward};});
 function projectToCourse(event){const rect=renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(pointer,camera);if(!ray.ray.intersectPlane(plane,hit))return null;return new THREE.Vector2(hit.x-origin.x,-hit.z-origin.y);}
 function syncBall(){ball.position.set(position.x,floorY+radius-(won?Math.min(1,sinking/.28)*.15:0),-position.y);ball.visible=!won||sinking<.28;}
 function updateUI(){counter.textContent=strokeCount+' '+(strokeCount===1?'stroke':'strokes');powerFill.style.width=Math.round(power*100)+'%';message.textContent=won?`In the cup! ${strokeCount===1?'Hole in one!':strokeCount+' strokes.'}`:velocity.lengthSq()>.001?'Rolling…':dragPointer!==null?'Release to putt. Pull farther for more power.':'Drag back from the ball, then release to putt.';}
 function cancelAim(){dragPointer=null;power=0;aim.visible=false;updateUI();onRender();}
 function step(dt){
  if(won){sinking=Math.min(.28,sinking+dt);syncBall();return;}
  const speed=velocity.length();if(speed<.025){velocity.set(0,0);syncBall();return;}
  const nextSpeed=Math.max(0,speed-friction*dt);velocity.multiplyScalar(nextSpeed/speed);const previous=position.clone();position.addScaledVector(velocity,dt);
  for(let iteration=0;iteration<3;iteration++){
   let touched=false;const inside=isInside(position);
   for(const s of segments){
    const t=Math.max(0,Math.min(1,position.clone().sub(s.a).dot(s.d)/s.lengthSq)),q=s.a.clone().addScaledVector(s.d,t),delta=position.clone().sub(q),distance=delta.length();
    if(distance<radius||(!inside&&distance<radius+maxSpeed*dt)){
     const normal=inside&&distance>1e-7?delta.multiplyScalar(1/distance):s.inward.clone();position.copy(q).addScaledVector(normal,radius+.0002);const incoming=velocity.dot(normal);if(incoming<0)velocity.addScaledVector(normal,-(1+restitution)*incoming);touched=true;
    }
   }if(!touched)break;
  }
  const distanceToCup=position.distanceTo(cup);if(distanceToCup<cupRadius*.83&&velocity.length()<1.9){position.copy(cup);velocity.set(0,0);won=true;sinking=0;updateUI();}
  const displacement=position.clone().sub(previous);ball.rotation.z-=displacement.x/radius;ball.rotation.x-=displacement.y/radius;syncBall();
 }
 function animate(now){
  frameId=0;if(!playing)return;const dt=lastTime?Math.min(.05,(now-lastTime)/1000):1/60;lastTime=now;let remaining=dt;while(remaining>0){const h=Math.min(1/120,remaining);step(h);remaining-=h;}updateUI();onRender();if(velocity.lengthSq()>.0001||(won&&sinking<.28))frameId=requestAnimationFrame(animate);else lastTime=0;
 }
 function startAnimation(){if(!frameId){lastTime=0;frameId=requestAnimationFrame(animate);}}
 function onDown(event){if(!playing||won||velocity.lengthSq()>.001||dragPointer!==null)return;const p=projectToCourse(event);if(!p||p.distanceTo(position)>.28)return;event.preventDefault();dragPointer=event.pointerId;renderer.domElement.setPointerCapture(event.pointerId);power=0;updateUI();}
 function onMove(event){if(event.pointerId!==dragPointer)return;event.preventDefault();const p=projectToCourse(event);if(!p)return;const pull=position.clone().sub(p);power=Math.min(1,pull.length()/maxPull);launchDirection.copy(pull).normalize();aim.visible=power>.025;aim.position.set(position.x,floorY+.025,-position.y);aim.setDirection(new THREE.Vector3(launchDirection.x,0,-launchDirection.y));aim.setLength(.3+power*1.15,.14,.085);updateUI();onRender();}
 function onUp(event){if(event.pointerId!==dragPointer)return;event.preventDefault();const shotPower=power,shotDirection=launchDirection.clone();dragPointer=null;if(renderer.domElement.hasPointerCapture(event.pointerId))renderer.domElement.releasePointerCapture(event.pointerId);aim.visible=false;if(shotPower>.035){strokeCount++;velocity.copy(shotDirection).multiplyScalar(shotPower*maxSpeed);power=0;updateUI();startAnimation();}else cancelAim();}
 const canvas=renderer.domElement;canvas.addEventListener('pointerdown',onDown);canvas.addEventListener('pointermove',onMove);canvas.addEventListener('pointerup',onUp);canvas.addEventListener('pointercancel',cancelAim);canvas.addEventListener('lostpointercapture',()=>{if(dragPointer!==null)cancelAim();});window.addEventListener('blur',cancelAim);document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAim();});
 function reset(){if(frameId)cancelAnimationFrame(frameId);frameId=0;lastTime=0;position.copy(tee);velocity.set(0,0);won=false;sinking=0;strokeCount=0;ball.visible=true;syncBall();cancelAim();updateUI();onRender();}
 function setPlaying(value){playing=value;ui.hidden=!value;document.body.classList.toggle('golf-playing',value);canvas.style.cursor=value?'crosshair':'';if(!value){if(frameId)cancelAnimationFrame(frameId);frameId=0;velocity.set(0,0);cancelAim();}updateUI();}
 document.querySelector('#golf-reset').onclick=reset;document.querySelector('#golf-exit').onclick=onExit;syncBall();updateUI();
 const coursePlan={hole:1,par:2,origin_m:origin,footprint_m:[4.3,2.58],floor_height_m:floorY,outer_polygon_m:polygon.map(p=>p.toArray()),inner_boundary_m:boundary.map(p=>p.toArray()),tee_m:tee.toArray(),cup_m:cup.toArray(),ball_radius_m:radius,cup_radius_m:cupRadius,materials:{turf:'#519d63',rim:'#e1d5b5'},features:['flat gentle bend','tee','flagged cup'],sourceGrid_m:.43};
 return {group,ball,rail,turf,coursePlan,step,reset,setPlaying,isPlaying:()=>playing,getState:()=>({position:position.toArray(),velocity:velocity.toArray(),strokes:strokeCount,won,dragging:dragPointer!==null,power}),focus:new THREE.Vector3(origin.x+2.15,.12,-origin.y-1.29),worldBall:()=>new THREE.Vector3(origin.x+position.x,floorY+radius,-origin.y-position.y)};
}
