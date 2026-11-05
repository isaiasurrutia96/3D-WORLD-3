import {createMobileInput,stickDirection} from './mobile-input.js';

// Touch actions fire on contact even when other fingers hold the joystick
// and drift. Ignore the compatibility click so one tap cannot use two items.
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
 const input=createMobileInput(),captures=new Map();
 const steer=document.getElementById('touch-steer'),primary=document.getElementById('touch-primary'),secondary=document.getElementById('touch-secondary');
 const thumb=document.getElementById('touch-stick-thumb'),item=document.getElementById('touch-item'),interact=document.getElementById('touch-kart');
 function paint(){
  const value=input.peek();
  thumb.style.setProperty('--stick-x',`${value.right*32}px`);thumb.style.setProperty('--stick-y',`${-value.forward*32}px`);
  for(const [button,active]of [[primary,value.primary],[secondary,value.secondary]]){button.classList.toggle('is-held',active);button.setAttribute('aria-pressed',String(active));}
 }
 function capture(element,event){captures.set(event.pointerId,element);try{element.setPointerCapture(event.pointerId);}catch{}}
 function finish(event,cancelled=false){
  event.stopPropagation();
  const element=captures.get(event.pointerId);captures.delete(event.pointerId);input.release(event.pointerId,cancelled);paint();
  try{if(element?.hasPointerCapture(event.pointerId))element.releasePointerCapture(event.pointerId);}catch{}
 }
 function prepare(event){if(event.button>0)return false;event.preventDefault();event.stopPropagation();if(event.pointerType==='touch')onTouch();onDriveIntent();return true;}
 function moveStick(event){const box=steer.getBoundingClientRect();input.moveStick(event.pointerId,stickDirection(event.clientX-box.x-box.width/2,event.clientY-box.y-box.height/2,box.width*.37));paint();}
 steer.addEventListener('pointerdown',event=>{if(!prepare(event)||!input.beginStick(event.pointerId))return;capture(steer,event);moveStick(event);});
 steer.addEventListener('pointermove',event=>{if(captures.get(event.pointerId)!==steer)return;event.preventDefault();moveStick(event);});
 for(const [button,action]of [[primary,'primary'],[secondary,'secondary']])button.addEventListener('pointerdown',event=>{if(!prepare(event))return;capture(button,event);input.hold(event.pointerId,action);paint();});
 for(const [button,action]of [[primary,'primary'],[secondary,'secondary']]){
  button.addEventListener('keydown',event=>{if(event.code!=='Space'&&event.code!=='Enter')return;event.preventDefault();onDriveIntent();input.hold(`key-${action}`,action);paint();});
  button.addEventListener('keyup',event=>{if(event.code!=='Space'&&event.code!=='Enter')return;event.preventDefault();input.release(`key-${action}`);paint();});
 }
 for(const element of [steer,primary,secondary]){
  element.addEventListener('pointermove',event=>event.stopPropagation());
  element.addEventListener('pointerup',event=>finish(event));
  element.addEventListener('pointercancel',event=>finish(event,true));
  element.addEventListener('lostpointercapture',event=>finish(event,true));
  element.addEventListener('contextmenu',event=>event.preventDefault());
 }
 bindPress(item,onItem);bindPress(interact,onInteract);
 function clear(){
  const pointers=[...captures];captures.clear();input.reset();paint();
  for(const [id,element]of pointers)try{if(element.hasPointerCapture(id))element.releasePointerCapture(id);}catch{}
 }
 function text(id,value){const node=document.getElementById(id);if(node.textContent!==value)node.textContent=value;}
 return{
  consume:input.consume,peek:input.peek,clear,
  update({driving,heldItem,boosting,interactionText,canInteract,canFlip}){
   text('touch-steer-label',driving?'Steer':'Move');text('touch-primary-label',driving?'Drift':'Jump');text('touch-primary-hint',driving?'E-brake':'');text('touch-secondary-label',driving?'Reverse':'Flip');
   primary.setAttribute('aria-label',driving?'Hold to drift or apply the e-brake':'Jump');secondary.setAttribute('aria-label',driving?'Hold to brake and reverse':'Standing backflip');
   secondary.setAttribute('aria-disabled',String(!driving&&!canFlip));secondary.classList.toggle('is-unavailable',!driving&&!canFlip);
   const kind=driving?(heldItem??(boosting?'boosting':'none')):'none';
   item.dataset.item=kind;item.disabled=!driving||!heldItem;
   text('touch-item-label',kind==='nitro'?'Boost':kind==='shell'?'Shell':kind==='boosting'?'Boosting':'Item');
   item.setAttribute('aria-label',kind==='nitro'?'Use Nitro boost':kind==='shell'?'Throw shell':kind==='boosting'?'Nitro boost active':'No item available');
   interact.textContent=interactionText;interact.disabled=!canInteract;
  },
 };
}
