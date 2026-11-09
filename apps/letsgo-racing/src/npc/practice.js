import {createNpcDriver,readNpcInput} from './driver.js';
import {coursePoint} from './course-line.js';
import {stepVehicle} from '../vehicle-controller.js';
import {useHeldItem} from '../items.js';
import {resolveKartContact} from './contact.js';
import {ORIGINAL_COURSE} from '../courses.js';

export function createNpcPractice(world,items){
 return{
  active:false,running:false,driver:null,
  start(){
   this.active=true;this.running=false;this.driver=createNpcDriver();
   const p=coursePoint(ORIGINAL_COURSE,0,-2.8);
   return{x:p.x,y:p.y,z:p.z,yaw:Math.atan2(p.fx,p.fz)};
  },
  stop(){this.active=false;this.running=false;this.driver=null;},
  step(dt,player,startForward){
   if(!this.active)return;
   const npc=this.driver;npc.previous={...npc.state};
   if(startForward)this.running=true;
   if(!this.running){
    if(npc.state.spinTime>0)stepVehicle(npc.state,{},dt,world);
    return;
   }
   const input=readNpcInput(npc,dt,{traffic:[player],boxes:items.boxes});
   if(input.useItem)useHeldItem(items,npc.state);
   stepVehicle(npc.state,input,dt,world);resolveKartContact(player,npc.state,world);
  },
  actors(){return this.active?[{state:this.driver.state,previous:this.driver.previous}]:[];},
 };
}
