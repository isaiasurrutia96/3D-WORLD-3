import {createNpcDriver,readNpcInput} from './driver.js';
import {coursePoint} from './course-line.js';
import {createRaceProgress,stepRaceProgress,raceOrder} from './race-progress.js';
import {NPC_NAMES,NPC_COLORS} from './colors.js';
import {stepVehicle} from '../vehicle-controller.js';
import {useHeldItem} from '../items.js';
import {resolveKartContact} from './contact.js';
import {ORIGINAL_COURSE} from '../courses.js';
import {stepShield} from '../shield.js';
export const RACE_LAPS=5;

export function createNpcRace(world,items,{random=Math.random}={}){
 const course=ORIGINAL_COURSE;
 return{
  active:false,running:false,elapsed:0,laps:RACE_LAPS,drivers:[],racers:[],player:null,
  start(player){
   this.active=true;this.running=false;this.elapsed=0;
   this.player={...createRaceProgress(0),id:'player',name:'You',state:player};
   this.drivers=NPC_NAMES.map((name,i)=>{
    const progress=i? -8:0,offset=i===1?-3.3:3.3;
    const driver=createNpcDriver({progress,offset,laps:null,pace:[1,.985,1.01][i],random});
    if(items.testItem)driver.state.heldItem=items.testItem;
    driver.id=`npc-${i+1}`;driver.name=name;driver.color=NPC_COLORS[i];
    driver.race={...createRaceProgress(progress),id:driver.id,name,state:driver.state};return driver;
   });
   this.racers=[this.player,...this.drivers.map(d=>d.race)];
   const p=coursePoint(course,0,-3.3);return{x:p.x,y:p.y,z:p.z,yaw:Math.atan2(p.fx,p.fz)};
  },
  stop(){this.active=false;this.running=false;this.elapsed=0;this.drivers=[];this.racers=[];this.player=null;},
  order(){return raceOrder(this.racers,course);},
  step(dt,player,previous,startForward){
   if(!this.active)return;
   if(startForward)this.running=true;
   const states=[player,...this.drivers.map(d=>d.state)];
   for(const driver of this.drivers){
    driver.previous={...driver.state};stepShield(driver.state,dt);
    if(!this.running){if(driver.state.spinTime>0)stepVehicle(driver.state,{},dt,world);continue;}
    const traffic=states.filter(s=>s!==driver.state),input=readNpcInput(driver,dt,{traffic,boxes:items.boxes,torpedoSystem:items,shellTarget:player});
    if(input.useItem)useHeldItem(items,driver.state,world,traffic);
    stepVehicle(driver.state,input,dt,world);
   }
   if(!this.running)return;
   for(let a=0;a<states.length;a++)for(let b=a+1;b<states.length;b++)resolveKartContact(states[a],states[b],world);
   stepRaceProgress(this.player,course,previous,player,dt,this.elapsed,this.laps);
   for(const driver of this.drivers){stepRaceProgress(driver.race,course,driver.previous,driver.state,dt,this.elapsed,this.laps);driver.finished=driver.race.finishedAt!==null;}
   if(this.racers.some(r=>r.finishedAt===null))this.elapsed+=dt;
  },
  actors(){return this.drivers.map(d=>({state:d.state,previous:d.previous}));},
 };
}
