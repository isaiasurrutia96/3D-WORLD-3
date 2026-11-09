import * as THREE from 'three';
import {ARM} from './claude/player/PlayerModel.ts';

// Solve the existing two-joint arms to grips on the actual rotating wheel.
// Avatar proportions and the on-foot animation rig are left intact.
export function createDriverView(avatar,kart){
 const rig=avatar.userData.characterRig,wheel=kart.getObjectByName('steering_wheel');
 const eyeObstructions=[rig.head,...rig.torso.children.filter(child=>child.isMesh)].map(node=>({node,visible:node.visible}));
 const arms=[{shoulder:rig.shoulderLeft,elbow:rig.elbowLeft,side:-1},{shoulder:rig.shoulderRight,elbow:rig.elbowRight,side:1}];
 const origin=new THREE.Vector3(),target=new THREE.Vector3(),direction=new THREE.Vector3(),pole=new THREE.Vector3(),joint=new THREE.Vector3(),local=new THREE.Vector3();
 const rotation=new THREE.Quaternion(),down=new THREE.Vector3(0,-1,0);
 return{
  firstPerson(enabled){for(const {node,visible}of eyeObstructions)node.visible=enabled?false:visible;},
  update(){
   kart.updateMatrixWorld(true);
   for(const {shoulder,elbow,side}of arms){
    wheel.localToWorld(target.set(side*.17,.145,0));shoulder.getWorldPosition(origin);
    direction.subVectors(target,origin);const length=direction.length();direction.normalize();
    const distance=Math.max(.001,Math.min(ARM.upper+ARM.lower-.0001,length));
    const along=(ARM.upper**2-ARM.lower**2+distance**2)/(2*distance),bend=Math.sqrt(Math.max(0,ARM.upper**2-along**2));
    shoulder.parent.getWorldQuaternion(rotation);pole.set(side*.5,-1,-.1).applyQuaternion(rotation);pole.addScaledVector(direction,-pole.dot(direction)).normalize();
    joint.copy(origin).addScaledVector(direction,along).addScaledVector(pole,bend);
    local.subVectors(joint,origin).applyQuaternion(rotation.invert()).normalize();shoulder.quaternion.setFromUnitVectors(down,local);shoulder.updateWorldMatrix(false,true);
    shoulder.getWorldQuaternion(rotation);local.copy(direction).multiplyScalar(distance).add(origin).sub(joint).applyQuaternion(rotation.invert()).normalize();
    elbow.quaternion.setFromUnitVectors(down,local);elbow.updateWorldMatrix(false,true);
   }
  },
 };
}
