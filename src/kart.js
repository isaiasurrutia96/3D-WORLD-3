import * as THREE from 'three';

// Static, unpainted construction frame. Forward is +Z; wheel groups and the
// steering assembly are separate so a later driving rig can be built on them.
export function createKartFrame(){
 const kart=new THREE.Group();kart.name='Bare go-kart frame';
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
 return kart;
}
export const KART_POSITION={x:125.5,y:0,z:-146.5};
