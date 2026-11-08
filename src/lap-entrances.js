import * as THREE from 'three';

export function nearestLapEntrance(position,courses,radius=17){
 if(position.grounded===false)return null;
 let result=null,best=radius;
 for(const course of courses){const p=course.entrance,distance=Math.hypot(position.x-p.x,position.z-p.z);if(Math.abs(position.y-p.y)<=2&&distance<best){result=course;best=distance;}}
 return result;
}

export function createLapEntranceMarkers(scene,courses){
 const group=new THREE.Group();group.name='Track entrance lap markers';scene.add(group);
 const silver=new THREE.MeshLambertMaterial({color:'#a5adb8'}),dark=new THREE.MeshLambertMaterial({color:'#101b35'}),cyan=new THREE.MeshBasicMaterial({color:'#83edf2'});
 for(const course of courses){
  const node=new THREE.Group();node.name=`${course.name} entrance`;node.position.set(course.entrance.x,course.entrance.y,course.entrance.z);node.rotation.y=Math.atan2(-course.entrance.x,-course.entrance.z);group.add(node);
  const pad=new THREE.Mesh(new THREE.CylinderGeometry(4.3,4.3,.08,32),dark);pad.position.y=.04;node.add(pad);
  const ring=new THREE.Mesh(new THREE.RingGeometry(3.9,4.2,32),cyan);ring.rotation.x=-Math.PI/2;ring.position.y=.085;node.add(ring);
  for(const side of [-1,1]){const post=new THREE.Mesh(new THREE.BoxGeometry(.18,3.4,.18),silver);post.position.set(side*3.4,1.7,-4.8);node.add(post);}
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=128;const ctx=canvas.getContext('2d');ctx.fillStyle='#101b35';ctx.fillRect(0,0,512,128);ctx.fillStyle='#dfeefa';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 35px Arial';ctx.fillText(course.name,256,43);ctx.font='bold 25px Arial';ctx.fillStyle='#83edf2';ctx.fillText('START LAP',256,92);
  const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;const sign=new THREE.Mesh(new THREE.PlaneGeometry(7.4,1.85),new THREE.MeshBasicMaterial({map,side:THREE.DoubleSide}));sign.position.set(0,3.15,-4.8);node.add(sign);
 }
 return group;
}
