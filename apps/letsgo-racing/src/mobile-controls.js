import {createMobileInput,stickDirection} from './mobile-input.js';

// Touch actions fire on contact while other fingers steer and hold the gas.
// Ignore the compatibility click so one tap cannot use two items.
export function bindPress(button,action){
 let ignoreClickUntil=0;
 button.addEventListener('pointerdown',event=>{
  if(button.disabled||event.button>0||(event.pointerType!=='touch'&&event.pointerType!=='pen'))return;
  event.preventDefault();event.stopPropagation();ignoreClickUntil=performance.now()+800;try{button.setPointerCapture(event.pointerId);}catch{}action(event);
 });
 button.addEventListener('pointermove',event=>{if(event.pointerType==='touch'||event.pointerType==='pen')event.stopPropagation();});
 for(const type of ['pointerup','pointercancel'])button.addEventListener(type,event=>{if(event.pointerType==='touch'||event.pointerType==='pen'){event.stopPropagation();ignoreClickUntil=performance.now()+800;}});
 button.addEventListener('click',event=>{event.preventDefault();if(!button.disabled&&(event.detail===0||performance.now()>=ignoreClickUntil))action(event);});
}

export function createMobileControls({onDriveIntent,onItem,onInteract,onTouch}){
 const input=createMobileInput(),captures=new Map(),keyOwners=new Map();
 let drivingMode=true;
 const steer=document.getElementById('touch-steer'),primary=document.getElementById('touch-primary'),secondary=document.getElementById('touch-secondary');
 const steeringButtons=document.getElementById('touch-steering'),left=document.getElementById('touch-left'),right=document.getElementById('touch-right');
 const buttons=[[left,'left'],[right,'right'],[primary,'primary'],[secondary,'secondary']];
 const thumb=document.getElementById('touch-stick-thumb'),item=document.getElementById('touch-item'),interact=document.getElementById('touch-kart');
 function paint(){
  const value=input.peek();
  thumb.style.setProperty('--stick-x',`${value.right*32}px`);thumb.style.setProperty('--stick-y',`${-value.forward*32}px`);
  for(const [button,action]of buttons){const active=button===primary&&drivingMode?value.gas:input.isHeld(action);button.classList.toggle('is-held',active);button.setAttribute('aria-pressed',String(active));}
  text('touch-primary-label',drivingMode?'Gas':'Jump');
  text('touch-primary-hint',drivingMode?'Hold to accelerate':'');
  primary.setAttribute('aria-label',drivingMode?'Hold to accelerate':'Jump');
 }
 function capture(element,event){
  try{element.setPointerCapture(event.pointerId);}catch{}
  captures.set(event.pointerId,{element,type:event.pointerType,captured:!!element.hasPointerCapture?.(event.pointerId)});
 }
 function release(id,cancelled=false){
  const owner=captures.get(id);if(!owner)return false;
  captures.delete(id);input.release(id,cancelled);paint();
  const element=owner.element;
  try{if(element.hasPointerCapture?.(id))element.releasePointerCapture(id);}catch{}
  return true;
 }
 function finish(event,cancelled=false){if(release(event.pointerId,cancelled))event.stopPropagation();}
 function prepare(event){
  if(event.button>0)return false;
  event.preventDefault();event.stopPropagation();
  // A new contact must not inherit an ended gesture. Reclaim stale captures
  // before accepting it, so tapping again recovers from a missed end event.
  for(const [id,owner]of [...captures]){
   const hasCapture=!!owner.element.hasPointerCapture?.(id);
   if(id===event.pointerId||(event.pointerType==='touch'&&event.isPrimary&&owner.type==='touch')||(owner.captured&&!hasCapture)||(owner.element===event.currentTarget&&!hasCapture))release(id,true);
  }
  if(event.pointerType==='touch')onTouch();onDriveIntent();return true;
 }
 function clear(){
  const pointers=[...captures];captures.clear();keyOwners.clear();input.reset();paint();
  for(const [id,owner]of pointers)try{if(owner.element.hasPointerCapture?.(id))owner.element.releasePointerCapture(id);}catch{}
 }
 // Release is observed before target handlers: even a failed/retargeted
 // capture, a finger lifted off the button, or a stopped event can recover.
 document.addEventListener('pointerup',event=>finish(event),true);
 document.addEventListener('pointercancel',event=>finish(event,true),true);
 for(const type of ['touchend','touchcancel'])document.addEventListener(type,event=>{
  if(event.touches.length===0)for(const [id,owner]of [...captures])if(owner.type==='touch')release(id,type==='touchcancel');
 },{capture:true,passive:true});
 document.addEventListener('pointermove',event=>{if(event.pointerType!=='touch'&&event.buttons===0)release(event.pointerId,true);},true);
 document.addEventListener('keyup',event=>{
  for(const [id,code]of [...keyOwners])if(code===event.code){keyOwners.delete(id);input.release(id);paint();}
 },true);
 function moveStick(event){const box=steer.getBoundingClientRect();input.moveStick(event.pointerId,stickDirection(event.clientX-box.x-box.width/2,event.clientY-box.y-box.height/2,box.width*.37));paint();}
 steer.addEventListener('pointerdown',event=>{if(!prepare(event)||!input.beginStick(event.pointerId))return;capture(steer,event);moveStick(event);});
 steer.addEventListener('pointermove',event=>{if(captures.get(event.pointerId)?.element!==steer)return;event.preventDefault();moveStick(event);});
 for(const [button,action]of buttons){
  button.addEventListener('pointerdown',event=>{
   if(!prepare(event))return;
   if(button===primary&&drivingMode){if(!input.beginGas(event.pointerId))return;}
   else input.hold(event.pointerId,action);
   capture(button,event);paint();
  });
  button.addEventListener('keydown',event=>{
   if(event.code!=='Space'&&event.code!=='Enter'||event.repeat)return;
   event.preventDefault();onDriveIntent();const id=`key-${action}-${event.code}`;
   if(button===primary&&drivingMode){if(!input.beginGas(id))return;}else input.hold(id,action);
   keyOwners.set(id,event.code);paint();
  });
 }
 for(const element of [steer,...buttons.map(([button])=>button)]){
  element.addEventListener('pointermove',event=>event.stopPropagation());
  element.addEventListener('pointerup',event=>{event.stopPropagation();finish(event);});
  element.addEventListener('pointercancel',event=>{event.stopPropagation();finish(event,true);});
  element.addEventListener('lostpointercapture',event=>{
   const owner=captures.get(event.pointerId);
   // An old lost-capture notification must not cancel a newer owner.
   if(owner?.element===element&&!element.hasPointerCapture?.(event.pointerId))finish(event,true);
  });
  element.addEventListener('contextmenu',event=>event.preventDefault());
 }
 bindPress(item,onItem);bindPress(interact,onInteract);
 function text(id,value){const node=document.getElementById(id);if(node.textContent!==value)node.textContent=value;}
 paint();
 return{
  consume:input.consume,peek:input.peek,clear,
  update({driving,heldItem,boosting,interactionText,canInteract,canFlip}){
   if(drivingMode!==driving){drivingMode=driving;paint();}
   document.getElementById('touch-controls').dataset.mode=driving?'driving':'on-foot';
   steer.hidden=driving;steeringButtons.hidden=!driving;
   text('touch-steer-label',driving?'Steer':'Move');text('touch-secondary-label',driving?'Brake':'Flip');
   secondary.setAttribute('aria-label',driving?'Hold to brake and reverse':'Standing backflip');
   secondary.setAttribute('aria-disabled',String(!driving&&!canFlip));secondary.classList.toggle('is-unavailable',!driving&&!canFlip);
   const kind=driving?(heldItem??(boosting?'boosting':'none')):'none';
   item.dataset.item=kind;item.disabled=!driving||!heldItem;
   text('touch-item-label',kind==='nitro'?'Boost':kind==='shell'?'Shell':kind==='banana'?'Banana':kind==='torpedo'?'Torpedo':kind==='shield'?'Shield':kind==='boosting'?'Boosting':'Item');
   item.setAttribute('aria-label',kind==='nitro'?'Use Nitro boost':kind==='shell'?'Throw shell':kind==='banana'?'Drop banana behind kart':kind==='torpedo'?'Launch homing torpedo':kind==='shield'?'Activate shield':kind==='boosting'?'Nitro boost active':'No item available');
   interact.textContent=interactionText;interact.disabled=!canInteract;
  },
 };
}
