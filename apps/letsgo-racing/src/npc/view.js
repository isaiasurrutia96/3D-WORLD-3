import {createGhostTemplate} from '../ghost-kart.js';
import {createVehicleView} from '../vehicle-view.js';
import {createNitroExhaust} from '../item-view.js';
import {interpolatePose} from '../time-trial.js';
import {Mesh,CircleGeometry,MeshBasicMaterial} from 'three';

// Six opaque batches keep one additional driver inexpensive on phones.
export function createNpcView(scene){
 const model=createGhostTemplate({solid:true,bodyColor:'#397ee8'});model.name='NPC practice kart';model.visible=false;scene.add(model);
 const shadow=new Mesh(new CircleGeometry(1.4,24),new MeshBasicMaterial({color:'#080e18',transparent:true,opacity:.32,depthWrite:false}));shadow.name='NPC ground shadow';shadow.rotation.x=-Math.PI/2;shadow.position.y=.012;shadow.scale.y=1.15;model.add(shadow);
 const apply=createVehicleView(model),exhaust=createNitroExhaust(model);
 return{model,update(driver,alpha,time){
  model.visible=!!driver;if(!driver)return null;
  const pose={...driver.state,...interpolatePose(driver.previous,driver.state,alpha)};apply(pose);exhaust(pose,true,time);return pose;
 }};
}
