import * as THREE from 'three';

export const FLOOR_WIDTH=260;
export const FLOOR_LENGTH=460;

export function createWorld(){
  const floor=new THREE.Mesh(
    new THREE.BoxGeometry(FLOOR_WIDTH,0.25,FLOOR_LENGTH),
    new THREE.MeshLambertMaterial({color:'#303238'}),
  );
  floor.name='Charcoal floor slab';
  floor.receiveShadow=true;
  floor.position.y=-0.125;
  return floor;
}
