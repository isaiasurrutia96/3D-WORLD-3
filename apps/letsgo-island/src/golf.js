import * as THREE from 'three';
import {Batches} from './props.js';
import {golfOutline,terrainHeight} from './layout.js';
export function createGolf(){
 const group=new THREE.Group();group.name='Small decorative golf course';const y=1.35,points=golfOutline.getPoints(120),shape=new THREE.Shape(points.map(p=>new THREE.Vector2(p.x,-p.z)));
 const textureCanvas=document.createElement('canvas');textureCanvas.width=128;textureCanvas.height=128;const ctx=textureCanvas.getContext('2d');ctx.fillStyle='#59b969';ctx.fillRect(0,0,128,128);ctx.fillStyle='#65c273';ctx.fillRect(0,0,64,64);ctx.fillRect(64,64,64,64);const checker=new THREE.CanvasTexture(textureCanvas);checker.colorSpace=THREE.SRGBColorSpace;checker.wrapS=checker.wrapT=THREE.RepeatWrapping;checker.repeat.set(.24,.24);checker.anisotropy=4;
 const green=new THREE.Mesh(new THREE.ShapeGeometry(shape),new THREE.MeshStandardMaterial({map:checker,roughness:1}));green.rotation.x=-Math.PI/2;green.position.y=y+.025;green.receiveShadow=true;green.name='Connected putting green';group.add(green);
 // A shallow solid foundation keeps the green attached to the rolling ground.
 const foundation=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:2.0,bevelEnabled:false}),new THREE.MeshStandardMaterial({color:'#75a548',roughness:1}));foundation.rotation.x=-Math.PI/2;foundation.position.y=y-2.0;foundation.name='Putting green foundation';group.add(foundation);
 const b=new Batches(group),n=84;
 for(let i=0;i<n;i++){const p=golfOutline.getPoint(i/n),d=golfOutline.getTangent(i/n),q=golfOutline.getPoint((i+1)/n);if(p.x> -39&&p.x< -33&&p.z> -14.4)continue;b.add('box',[p.x,y+.22,p.z],[Math.hypot(q.x-p.x,q.z-p.z)+.06,.6,.65],i%4?'#d8a662':'#e7b572',[0,Math.atan2(-d.z,d.x),0]);}
 for(let i=0;i<7;i++){const z=-9.8-i*.47,t=i/6;b.add('box',[-36,terrainHeight(-36,-10)*(1-t)+(y-.06)*t,z],[3.8,.18,.43],'#e5bc7e');}
 b.finish();
 const hole=new THREE.Mesh(new THREE.CircleGeometry(.48,28),new THREE.MeshBasicMaterial({color:'#1b5546'}));hole.rotation.x=-Math.PI/2;hole.position.set(-23,y+.015,-24);group.add(hole);
 const pole=new THREE.Mesh(new THREE.CylinderGeometry(.055,.065,4.3,8),new THREE.MeshStandardMaterial({color:'#f5ebbf',roughness:1}));pole.position.set(-23,y+2.15,-24);pole.castShadow=true;group.add(pole);
 const flagGeometry=new THREE.BufferGeometry();flagGeometry.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,2,-.4,.1,0,-1.2,0],3));flagGeometry.computeVertexNormals();const flag=new THREE.Mesh(flagGeometry,new THREE.MeshStandardMaterial({color:'#f4cf42',side:THREE.DoubleSide,roughness:1}));flag.position.set(-22.94,y+4.2,-24);group.add(flag);
 const windmill=new THREE.Group();windmill.name='Golf windmill';windmill.position.set(-38,y,-20.5);windmill.rotation.y=.25;group.add(windmill);
 const tower=new THREE.Mesh(new THREE.CylinderGeometry(1.25,1.7,4.2,5),new THREE.MeshStandardMaterial({color:'#f1dfbb',roughness:1}));tower.position.y=2.1;tower.castShadow=true;windmill.add(tower);
 const roof=new THREE.Mesh(new THREE.ConeGeometry(2.2,2.0,4),new THREE.MeshStandardMaterial({color:'#dd6e64',roughness:1}));roof.position.y=5;roof.rotation.y=Math.PI/4;roof.castShadow=true;windmill.add(roof);
 const doorShape=new THREE.Shape();doorShape.moveTo(-.57,0);doorShape.lineTo(.57,0);doorShape.lineTo(.57,.9);doorShape.absarc(0,.9,.57,0,Math.PI,false);doorShape.lineTo(-.57,0);
 const door=new THREE.Mesh(new THREE.ShapeGeometry(doorShape),new THREE.MeshBasicMaterial({color:'#6a6649',side:THREE.DoubleSide}));door.position.set(0,.06,1.62);windmill.add(door);
 const rotor=new THREE.Group();rotor.position.set(0,4.2,1.7);rotor.rotation.z=.55;windmill.add(rotor);
 const bladeMaterial=new THREE.MeshStandardMaterial({color:'#f8e7ae',roughness:1}),trimMaterial=new THREE.MeshStandardMaterial({color:'#ce7550',roughness:1});
 for(let i=0;i<4;i++){const blade=new THREE.Group();blade.rotation.z=i*Math.PI/2;rotor.add(blade);const trim=new THREE.Mesh(new THREE.BoxGeometry(.85,3.3,.16),trimMaterial);trim.position.y=1.8;trim.castShadow=false;blade.add(trim);const inset=new THREE.Mesh(new THREE.BoxGeometry(.64,2.94,.18),bladeMaterial);inset.position.set(0,1.8,.025);blade.add(inset);}
 const hub=new THREE.Mesh(new THREE.SphereGeometry(.37,12,8),new THREE.MeshStandardMaterial({color:'#e5b34d',roughness:1}));hub.scale.z=.5;hub.position.z=.2;rotor.add(hub);
 return{group,update(time){rotor.rotation.z=.55+time*.24;}};
}
