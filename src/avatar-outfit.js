import * as THREE from 'three';

// Bone attachments follow the same bind landmarks as the painted skinned body.
export function addAthleteOutfit(avatar,bones,points){
 const mat={white:new THREE.MeshLambertMaterial({color:'#f7f5ef'}),stitch:new THREE.MeshLambertMaterial({color:'#c2d9e8'}),sole:new THREE.MeshLambertMaterial({color:'#deded8'}),black:new THREE.MeshLambertMaterial({color:'#17191e'}),gold:new THREE.MeshStandardMaterial({color:'#ddb85d',metalness:.55,roughness:.30}),dial:new THREE.MeshStandardMaterial({color:'#11151c',metalness:.35,roughness:.3}),skin:new THREE.MeshLambertMaterial({color:'#b98968'}),ink:new THREE.MeshLambertMaterial({color:'#28231f'})};
 function attach(bone,name,geometry,material,p,rotation=[0,0,0],scale=[1,1,1]){const mesh=new THREE.Mesh(geometry,material);mesh.name=name;mesh.position.copy(new THREE.Vector3(...p).sub(points.get(bone)));mesh.rotation.set(...rotation);mesh.scale.set(...scale);mesh.castShadow=true;bones.get(bone).add(mesh);return mesh;}
 function line(bone,name,path,radius,material){const curve=new THREE.CatmullRomCurve3(path.map(p=>new THREE.Vector3(...p).sub(points.get(bone))));const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,Math.max(8,path.length*4),radius,5,false),material);mesh.name=name;bones.get(bone).add(mesh);return mesh;}
 // Collar and folded, sharply separated sleeve hems.
 attach('chest','T-shirt collar',new THREE.TorusGeometry(.132,.016,6,32),mat.white,[0,2.596,0],[Math.PI/2,0,0],[1, .87,1]);
 for(const [side,sign]of [['left',-1],['right',1]]){
  attach(`${side}_upper_arm`,`${side} sleeve hem`,new THREE.TorusGeometry(.148,.009,6,20),mat.white,[sign*.54,2.232,.008],[Math.PI/2,0,0],[1,.94,1]);
  line(`${side}_thigh`,`${side} denim pocket stitch`,[[sign*.07,1.59,.204],[sign*.13,1.48,.208],[sign*.26,1.45,.198]],.006,mat.stitch);
  line(`${side}_thigh`,`${side} back pocket stitch`,[[sign*.09,1.52,-.18],[sign*.11,1.31,-.184],[sign*.25,1.29,-.18],[sign*.30,1.49,-.17]],.006,mat.stitch);
  const bone=`${side}_foot`,x=sign*.20;
  // Neutral outsole stays inside the support ellipsoid used by foot contact.
  attach(bone,`${side} high-top outsole`,new THREE.SphereGeometry(1,20,12),mat.sole,[x,.055,.16],[0,0,0],[.163,.049,.345]);
  attach(bone,`${side} sneaker tongue`,new THREE.BoxGeometry(.16,.19,.025),mat.white,[x,.33,.12],[-.15,0,0]);
  for(let i=0;i<5;i++)line(bone,`${side} lace ${i}`,[[x-.075,.25+i*.027,.23-i*.022],[x,.263+i*.027,.225-i*.022],[x+.075,.25+i*.027,.23-i*.022]],.008,mat.white);
  // Blazer-style side swoosh, painted pale gray onto the white upper.
  for(const outer of [-1,1]){
   const path=[[-.16,.22],[-.10,.16],[.01,.16],[.30,.29],[.00,.21],[-.09,.22]];
   const vertices=path.map(([z,y])=>new THREE.Vector3(x+outer*.166,y,z));const geo=new THREE.BufferGeometry();geo.setFromPoints(vertices);geo.setIndex([0,1,5,1,2,5,2,4,5,2,3,4]);geo.computeVertexNormals();const material=mat.sole.clone();material.side=THREE.DoubleSide;attach(bone,`${side} Nike swoosh`,geo,material,[0,0,0]);
  }
  // Small ears and simple painted eyes keep the adult head readable.
  attach('head',`${side} ear`,new THREE.SphereGeometry(1,12,8),mat.skin,[sign*.215,2.81,.005],[0,0,0],[.04,.07,.04]);
  attach('head',`${side} eye`,new THREE.SphereGeometry(1,10,6),mat.ink,[sign*.075,2.85,.205],[0,0,0],[.018,.023,.009]);
 }
 attach('head','Nose',new THREE.SphereGeometry(1,12,8),mat.skin,[0,2.79,.214],[0,0,0],[.04,.052,.045]);
 // Black fitted flat-brim cap, fitted around the upper head rather than floating.
 attach('head','New Era fitted crown',new THREE.SphereGeometry(.232,32,16,0,Math.PI*2,0,Math.PI/2+.12),mat.black,[0,2.905,.005],[0,0,0],[1,.90,1.02]);
 attach('head','Fitted cap band',new THREE.TorusGeometry(.229,.013,6,32),mat.black,[0,2.89,.005],[Math.PI/2,0,0],[1,1.02,1]);
 const bill=new THREE.Shape();bill.moveTo(-.22,.10);bill.bezierCurveTo(-.27,.21,-.28,.49,-.16,.53);bill.quadraticCurveTo(0,.57,.16,.53);bill.bezierCurveTo(.28,.49,.27,.21,.22,.10);bill.closePath();
 attach('head','Flat cap bill',new THREE.ExtrudeGeometry(bill,{depth:.018,bevelEnabled:true,bevelThickness:.007,bevelSize:.008,bevelSegments:2,steps:1}),mat.black,[0,2.905,.005],[Math.PI/2,0,0]);
 if(typeof document!=='undefined'){
  function label(text,w=128,h=96){const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');ctx.clearRect(0,0,w,h);ctx.fillStyle='#f6f4ed';ctx.font=`900 ${Math.round(h*.66)}px Arial`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,w/2,h*.53);const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshLambertMaterial({map,transparent:true,depthWrite:false,side:THREE.DoubleSide});}
  attach('head','LA cap embroidery',new THREE.PlaneGeometry(.16,.12),label('LA'),[0,3.003,.234],[-.45,0,0]);
  attach('head','New Era side flag',new THREE.PlaneGeometry(.065,.045),label('NE'),[-.229,2.968,.03],[0,-Math.PI/2,0]);
 }
 // Interlocking oval links drape down the T-shirt and return around the neck.
 const chain=new THREE.InstancedMesh(new THREE.TorusGeometry(.032,.010,7,14),mat.gold,48);chain.name='Cuban link chain';const dummy=new THREE.Object3D(),count=48;
 function necklace(t){return new THREE.Vector3(.29*Math.cos(t),t<=Math.PI?2.55-.30*Math.sin(t):2.55-.025*Math.sin(t),.115+.23*Math.sin(t));}
 const up=new THREE.Vector3(0,1,0),rest=points.get('chest');
 for(let i=0;i<count;i++){const t=i/count*Math.PI*2,p=necklace(t),tangent=necklace(t+.01).sub(necklace(t-.01)).normalize();dummy.position.copy(p).sub(rest);dummy.quaternion.setFromUnitVectors(up,tangent);dummy.rotateY(i%2?.65:-.65);dummy.scale.set(.78,1.24,1);dummy.updateMatrix();chain.setMatrixAt(i,dummy.matrix);}chain.instanceMatrix.needsUpdate=true;bones.get('chest').add(chain);
 const strap=attach('left_forearm','Black watch strap',new THREE.TorusGeometry(.092,.022,8,24),mat.black,[-.598,1.615,.032],[Math.PI/2,0,0],[1,.91,1]);
 strap.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3(-.03,-.45,.02).normalize());
 attach('left_forearm','Black watch case',new THREE.CylinderGeometry(.084,.084,.035,24),mat.black,[-.598,1.615,.125],[Math.PI/2,0,0]);
 attach('left_forearm','Watch dial',new THREE.CircleGeometry(.067,24),mat.dial,[-.598,1.615,.145]);
 line('left_forearm','Watch minute hand',[[-.598,1.615,.147],[-.598,1.66,.147]],.004,mat.white);line('left_forearm','Watch hour hand',[[-.598,1.615,.147],[-.628,1.598,.147]],.004,mat.white);
 avatar.userData.outfit='white tee, light blue denim, black watch, Cuban chain, black LA fitted cap, white Blazer high-tops';
}
