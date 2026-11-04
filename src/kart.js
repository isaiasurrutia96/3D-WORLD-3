import * as THREE from 'three';

// Static, unpainted chassis and simple body shell. Forward is +Z; wheel groups and the
// steering assembly are separate so a later driving rig can be built on them.
export function createKartFrame(){
 const kart=new THREE.Group();kart.name='Go-kart prototype';
 kart.userData.drivable=false;
 const material=new THREE.MeshLambertMaterial({color:'#a1a6ac'});
 const up=new THREE.Vector3(0,1,0);
 function tube(parent,a,b,radius=.035,name='frame tube'){
  const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),delta=end.clone().sub(start);
  const mesh=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,delta.length(),8),material);
  mesh.name=name;mesh.position.copy(start).add(end).multiplyScalar(.5);
  mesh.quaternion.setFromUnitVectors(up,delta.normalize());mesh.castShadow=true;parent.add(mesh);return mesh;
 }
 function loop(parent,points,radius=.035){
  points.forEach((point,i)=>tube(parent,point,points[(i+1)%points.length],radius));
 }
 const chassis=new THREE.Group();chassis.name='chassis';kart.add(chassis);
 loop(chassis,[[-.70,.30,-1.20],[.70,.30,-1.20],[.70,.30,.80],[.50,.30,1.35],[-.50,.30,1.35],[-.70,.30,.80]]);
 for(const z of [-1.0,-.55,.20,.85])tube(chassis,[-.7,.3,z],[.7,.3,z]);
 for(const side of [-1,1]){
  tube(chassis,[side*.70,.30,-1.15],[side*.76,.55,-.9]);
  tube(chassis,[side*.76,.55,-.9],[side*.76,.55,.25]);
  tube(chassis,[side*.76,.55,.25],[side*.70,.30,.6]);
 }
 const seat=new THREE.Group();seat.name='seat_frame';kart.add(seat);
 loop(seat,[[-.35,.40,-.75],[.35,.40,-.75],[.35,.40,-.12],[-.35,.40,-.12]],.03);
 loop(seat,[[-.35,.40,-.75],[.35,.40,-.75],[.35,1.02,-.94],[-.35,1.02,-.94]],.03);
 tube(seat,[-.35,.7,-.84],[.35,.7,-.84],.025);
 for(const side of [-1,1])tube(seat,[side*.35,.4,-.75],[side*.52,.3,-.95],.03);
 for(const [name,z]of [['front_axle',1.03],['rear_axle',-1.0]]){
  const axle=new THREE.Group();axle.name=name;kart.add(axle);tube(axle,[-1.05,.38,z],[1.05,.38,z],.045);
  for(const [side,sign]of [['left',-1],['right',1]]){
   const wheel=new THREE.Group();wheel.name=`${name}_${side}_wheel`;wheel.position.set(sign*1.04,.38,z);axle.add(wheel);
   for(const x of [-.10,.10]){
    const ring=new THREE.Mesh(new THREE.TorusGeometry(.35,.025,6,20),material);ring.rotation.y=Math.PI/2;ring.position.x=x;wheel.add(ring);
   }
   tube(wheel,[-.14,0,0],[.14,0,0],.06,'hub');
   for(let i=0;i<4;i++){const angle=i*Math.PI/2;tube(wheel,[0,0,0],[0,Math.cos(angle)*.35,Math.sin(angle)*.35],.02,'spoke');}
   tube(axle,[sign*.7,.3,z],[sign*.91,.38,z],.035,'axle support');
  }
 }
 const steering=new THREE.Group();steering.name='steering_assembly';kart.add(steering);
 const base=[0,.31,.63],top=[0,.94,.15];tube(steering,base,top,.03,'steering_column');
 const wheel=new THREE.Mesh(new THREE.TorusGeometry(.24,.025,6,20),material);
 wheel.name='steering_wheel';wheel.position.fromArray(top);
 wheel.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3(...top).sub(new THREE.Vector3(...base)).normalize());steering.add(wheel);
 for(const side of [-1,1])tube(steering,[0,.31,.63],[side*.80,.38,1.03],.02,'steering link');
 const body=new THREE.Group();body.name='body_panels';kart.add(body);
 const panelMaterial=new THREE.MeshLambertMaterial({color:'#a1a6ac',side:THREE.DoubleSide});
 function panel(name,sections,centerX=0){
  const vertices=[],indices=[];
  for(const [z,width,bottom,top] of sections){
   const bevel=Math.min(.06,width*.3,(top-bottom)*.25);
   for(const [x,y]of [[-width+bevel,bottom],[width-bevel,bottom],[width,bottom+bevel],[width,top-bevel],
    [width-bevel,top],[-width+bevel,top],[-width,top-bevel],[-width,bottom+bevel]])vertices.push(x+centerX,y,z);
  }
  for(let ring=0;ring<sections.length-1;ring++)for(let i=0;i<8;i++){
   const a=ring*8+i,b=ring*8+(i+1)%8;indices.push(a,b,a+8,b,b+8,a+8);
  }
  for(let i=1;i<7;i++){indices.push(0,i+1,i);const start=(sections.length-1)*8;indices.push(start,start+i,start+i+1);}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.setIndex(indices);geometry.computeVertexNormals();
  const mesh=new THREE.Mesh(geometry,panelMaterial);mesh.name=name;mesh.castShadow=true;mesh.receiveShadow=true;body.add(mesh);
 }
 // Low, broad retro-kart bodywork, all the same unpainted gray as the frame.
 panel('front_nose',[[.38,.36,.29,.49],[.74,.54,.27,.63],[1.30,.57,.27,.50],[1.49,.49,.30,.43]]);
 for(const side of [-1,1])panel(side<0?'left_side_pod':'right_side_pod',
  [[-.86,.13,.30,.46],[-.66,.23,.27,.60],[.43,.23,.27,.58],[.70,.12,.30,.43]],side*.65);
 panel('rear_shell',[[-1.38,.57,.28,.46],[-1.22,.68,.27,.61],[-.86,.65,.28,.59]]);
 panel('floor_pan',[[-1.13,.62,.265,.32],[.53,.62,.265,.32]]);
 function seatPanel(name,size,position,angle=0){
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(...size),panelMaterial);mesh.name=name;mesh.position.set(...position);mesh.rotation.x=angle;mesh.castShadow=true;body.add(mesh);
 }
 seatPanel('seat_base',[.66,.065,.63],[0,.425,-.435]);
 seatPanel('seat_back',[.66,.63,.065],[0,.72,-.845],-.30);
 for(const side of [-1,1])seatPanel(side<0?'seat_left_side':'seat_right_side',[.055,.17,.62],[side*.34,.50,-.435]);
 return kart;
}
export const KART_POSITION={x:125.5,y:0,z:-146.5};
