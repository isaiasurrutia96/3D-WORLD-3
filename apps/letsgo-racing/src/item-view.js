import * as THREE from 'three';

function questionFace(color){
 const canvas=document.createElement('canvas');canvas.width=128;canvas.height=128;
 const context=canvas.getContext('2d');context.fillStyle=color;context.fillRect(0,0,128,128);
 context.strokeStyle='rgba(255,255,255,.8)';context.lineWidth=5;context.strokeRect(4,4,120,120);
 context.font='bold 100px Arial';context.textAlign='center';context.textBaseline='middle';context.lineWidth=6;
 context.strokeStyle='#17304d';context.strokeText('?',64,70);context.fillStyle='#ffffff';context.fillText('?',64,70);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
 return new THREE.MeshLambertMaterial({map:texture});
}
export function createItemView(scene,system,kart){
 const root=new THREE.Group();root.name='Nitro pickup boxes';scene.add(root);
 const faces=['#33b9e4','#a75bdf','#efaf32','#48bf97','#e76b9e','#4b8ae5'].map(questionFace);
 const cubeGeometry=new THREE.BoxGeometry(1.5,1.5,1.5),edgeGeometry=new THREE.EdgesGeometry(cubeGeometry);
 const boxes=system.boxes.map(box=>{
  const pivot=new THREE.Group();pivot.position.set(box.x,box.y+1.15,box.z);root.add(pivot);
  const cube=new THREE.Mesh(cubeGeometry,faces);pivot.add(cube,new THREE.LineSegments(edgeGeometry,new THREE.LineBasicMaterial({color:'#e8faff'})));return pivot;
 });
 const flames=new THREE.Group();flames.name='Nitro exhaust';kart.add(flames);
 for(const side of [-1,1]){
  const flame=new THREE.Mesh(new THREE.ConeGeometry(.20,.85,8),new THREE.MeshBasicMaterial({color:'#168cff',transparent:true,opacity:.85}));
  flame.rotation.x=-Math.PI/2;flame.position.set(side*.4,.4,-1.8);flames.add(flame);
  const core=new THREE.Mesh(new THREE.ConeGeometry(.11,.62,8),new THREE.MeshBasicMaterial({color:'#baf8ff'}));
  core.rotation.x=-Math.PI/2;core.position.set(side*.4,.4,-1.72);flames.add(core);
 }
 return function update(state,driving){
  system.boxes.forEach((box,i)=>{const node=boxes[i];node.visible=box.cooldown<=0;node.position.y=box.y+1.15+Math.sin(system.time*2+i)*.12;node.rotation.set(.12,system.time*1.1+i,.12);});
  flames.visible=driving&&state.boostTime>0&&state.speed>3;
  flames.scale.z=.9+.15*Math.sin(system.time*32);
 };
}
