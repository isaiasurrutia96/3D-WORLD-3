import {createVehicleState} from './vehicle-controller.js';
import {createItemSystem,useHeldItem,stepItems} from './items.js';
import {resetTorpedoes} from './torpedoes.js';
import {activateShield} from './shield.js';
import {resolveKartContact,resetKartContact} from './npc/contact.js';

export function createShieldTestArea(world){
 const items=createItemSystem([]),dummy=createVehicleState();
 const area={active:false,items,dummy,previous:{...dummy},message:'',
  clear(){items.shells=[];items.bananas=[];resetTorpedoes(items);},
  place(player,distance=22){Object.assign(dummy,createVehicleState(),{x:player.x+Math.sin(player.yaw)*distance,y:player.y,z:player.z+Math.cos(player.yaw)*distance,yaw:player.yaw+Math.PI});this.previous={...dummy};resetKartContact(player,dummy);},
  start(player){this.active=true;this.clear();this.place(player);activateShield(player);this.message='Choose an impact, or wait 12s to test expiry.';},
  stop(){this.active=false;this.clear();},
  restore(player){activateShield(player);this.message='Restored: 2 hits, 12 seconds.';},
  trigger(kind,player){
   if(!this.active)return;
   this.clear();this.place(player,kind==='collision'?5:22);
   if(kind==='collision'){this.message='Drive into the blue kart. Hold Gas to test contact.';return;}
   if(kind==='banana'){
    const source={...createVehicleState(),x:player.x+Math.sin(player.yaw)*7,y:player.y,z:player.z+Math.cos(player.yaw)*7,yaw:player.yaw,heldItem:'banana'};
    useHeldItem(items,source,world);this.message='Drive forward through the banana.';
   }else{dummy.heldItem=kind;useHeldItem(items,dummy,world,[player]);this.message=kind==='shell'?'Shell incoming.':'Torpedo incoming.';}
  },
  step(dt,player,previous){
   if(!this.active)return;
   const before=player.shieldImpactCount??0;this.previous={...dummy};dummy.speed=0;dummy.lateralSpeed=0;
   resolveKartContact(player,dummy,world);
   stepItems(items,player,previous,dt,world,[{state:dummy,previous:this.previous}]);
   if((player.shieldImpactCount??0)!==before){const kind=player.shieldLastImpact;this.message=`${kind[0].toUpperCase()+kind.slice(1)} absorbed · ${player.shieldHits} hit${player.shieldHits===1?'':'s'} left.`;}
   else if(items.hits.some(hit=>hit.target===player&&!hit.absorbed))this.message='Unprotected hit: normal movement penalty applied.';
  },
 };
 return area;
}
