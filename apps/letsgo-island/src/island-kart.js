import {MeshLambertMaterial,Vector3} from 'three';
import {createKartFrame} from '../../letsgo-racing/src/kart.js';
import {createVehicleState,stepVehicle,canEnterVehicle,findExitPosition,resolveParkedKart} from '../../letsgo-racing/src/vehicle-controller.js';
import {createVehicleView,createSeatedPose,speedToMph} from '../../letsgo-racing/src/vehicle-view.js';
import {STEP} from '../../letsgo-racing/src/running-controller.js';
import {createCharacterRig} from '../../../src/player/PlayerModel.ts';

export function createIslandKart(link,avatar=null){
 const model=createKartFrame(),state=createVehicleState(),driver=createCharacterRig({plain:true});
 driver.root.userData.characterRig=driver;driver.root.visible=false;model.add(driver.root);
 const sit=createSeatedPose(driver.root),apply=createVehicleView(model);let driving=false,accumulator=0,previous={...state},message='';
 // Use one inexpensive clay material for the driver, like Low island graphics.
 const clay=new MeshLambertMaterial({color:'#b9b2a6'});driver.root.traverse(o=>{if(o.isMesh)o.material=clay;});
 model.traverse(o=>{o.castShadow=false;o.receiveShadow=false;});link.root.add(model);
 const home={...link.plan.home},scratch=new Vector3();
 if(avatar){
  const intersect=avatar.collision.capsuleIntersect.bind(avatar.collision);
  avatar.collision.capsuleIntersect=capsule=>{
   const hit=intersect(capsule);if(hit||driving)return hit;
   const x=capsule.start.x,z=capsule.start.z,feet=capsule.start.y-capsule.radius,height=capsule.end.y-capsule.start.y+capsule.radius*2;
   const position=resolveParkedKart(x,z,feet,state,capsule.radius,height),dx=position.x-x,dz=position.z-z,depth=Math.hypot(dx,dz);
   return depth>1e-7?{normal:new Vector3(dx/depth,0,dz/depth),depth}:null;
  };
 }
 function sendHome(){Object.assign(state,createVehicleState(),home);state.heldItem=null;state.shieldTime=0;state.boostTime=0;previous={...state};accumulator=0;apply(state);}
 function followPlayer(avatar,pose){
  const vx=Math.sin(state.yaw)*state.speed+Math.cos(state.yaw)*(state.lateralSpeed??0),vz=Math.cos(state.yaw)*state.speed-Math.sin(state.yaw)*(state.lateralSpeed??0);
  avatar.player.rideAlong(pose.x,pose.y,pose.z,pose.yaw,vx,vz);avatar.shadow.visible=false;
 }
 const api={
  model,state,driver,home,
  get driving(){return driving;},get message(){return message;},get mph(){return speedToMph(Math.hypot(state.speed,state.lateralSpeed??0));},
  near(avatar){return !driving&&Math.hypot(avatar.player.position.x-state.x,avatar.player.position.z-state.z)<4.5&&Math.abs(avatar.player.position.y-state.y)<1;},
  toggle(avatar){
   message='';
   if(driving){
    const exit=findExitPosition(state,link.physics);
    if(!exit){message=Math.abs(state.speed)>.75?'Stop to get out':'No safe place to get out';return false;}
    driving=false;state.speed=0;state.lateralSpeed=0;driver.root.visible=false;avatar.player.object.visible=true;
    avatar.player.teleport(scratch.set(exit.x,exit.y+.005,exit.z),exit.yaw);avatar.input.releaseTouch();avatar.input.clear();return true;
   }
   const p=avatar.player.position;
   if(!canEnterVehicle({grounded:avatar.player.onGround,x:p.x,y:p.y,z:p.z},state))return false;
   driving=true;accumulator=0;previous={...state};driver.root.visible=true;avatar.player.object.visible=false;avatar.shadow.visible=false;sit();
   avatar.input.releaseTouch();avatar.input.clear();followPlayer(avatar,state);return true;
  },
  update(delta,input,avatar){
   if(!driving)return;
   const back=input.move.y>.18||input.isDown('driveBrake'),forward=input.move.y<-.18||input.isDown('driveGas');
   const drive={throttle:back?-1:forward?1:0,brake:back&&state.speed>.4,steer:Math.abs(input.move.x)>.08?input.move.x:0};
   accumulator+=Math.min(.1,delta);
   while(accumulator>=STEP){previous={...state};stepVehicle(state,drive,STEP,link.physics);accumulator-=STEP;}
   if(state.y<-35){api.reset(avatar);return;}
   const alpha=accumulator/STEP,turn=Math.atan2(Math.sin(state.yaw-previous.yaw),Math.cos(state.yaw-previous.yaw));
   const pose={...state,x:previous.x+(state.x-previous.x)*alpha,y:previous.y+(state.y-previous.y)*alpha,z:previous.z+(state.z-previous.z)*alpha,yaw:previous.yaw+turn*alpha};
   apply(pose);sit();driver.shoulderLeft.rotation.z-=state.steering*.3;driver.shoulderRight.rotation.z-=state.steering*.3;
   followPlayer(avatar,pose);
  },
  reset(avatar){driving=false;driver.root.visible=false;avatar.player.object.visible=true;sendHome();avatar.reset();message='';}
 };
 sendHome();return api;
}
