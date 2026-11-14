// A small touch layer for the same Input/Player used by the keyboard.
export function createAvatarTouch(input,parent){
 const root=document.createElement('div');root.className='avatar-touch';root.hidden=true;
 root.innerHTML=`
  <div class="move-pad" id="island-move-pad" role="group" aria-label="Touch anywhere on the left to move"><div class="move-pad__base" hidden><span class="move-pad__knob"></span><span class="move-pad__label">Move</span></div></div>
  <div class="avatar-actions"><button type="button" data-action="crouch" tabindex="-1">Crouch</button><button type="button" data-action="jump" tabindex="-1">Jump</button></div>
  <div class="kart-touch" hidden>
   <div class="kart-touch__steering" role="group" aria-label="Kart steering buttons">
    <button type="button" data-action="driveLeft" aria-label="Steer left" tabindex="-1"><span aria-hidden="true">←</span><small>Left</small></button>
    <button type="button" data-action="driveRight" aria-label="Steer right" tabindex="-1"><span aria-hidden="true">→</span><small>Right</small></button>
   </div>
   <button type="button" class="kart-touch__brake" data-action="driveBrake" aria-label="Hold to brake and reverse" tabindex="-1"><span aria-hidden="true">↓</span>Brake / Reverse</button>
   <button type="button" class="kart-touch__gas" data-action="driveGas" aria-label="Hold to accelerate" tabindex="-1">Gas<small>Hold to accelerate</small></button>
  </div>`;
 parent.append(root);
 const pad=root.querySelector('.move-pad'),base=root.querySelector('.move-pad__base'),knob=root.querySelector('.move-pad__knob'),walkingActions=root.querySelector('.avatar-actions'),kartControls=root.querySelector('.kart-touch'),held=new Map();let stick=null,originX=0,originY=0,driving=false;
 function move(event){
  if(event.pointerId!==stick)return;
  const x=(event.clientX-originX)/42,y=(event.clientY-originY)/42,length=Math.hypot(x,y),scale=Math.max(1,length);
  knob.style.transform=`translate(${x/scale*34}px,${y/scale*34}px)`;
  if(length<.14)input.setTouchStick(0,0);
  else{const magnitude=Math.min(1,(length-.14)/.86);input.setTouchStick(x/length*magnitude,y/length*magnitude);}
  event.preventDefault();
 }
 pad.addEventListener('pointerdown',event=>{
  if(driving||stick!==null||event.button>0)return;event.preventDefault();event.stopPropagation();stick=event.pointerId;
  originX=event.clientX;originY=event.clientY;const box=pad.getBoundingClientRect();
  base.style.left=(originX-box.left)+'px';base.style.top=(originY-box.top)+'px';base.hidden=false;
  pad.setPointerCapture(stick);pad.classList.add('is-down');move(event);
 });
 pad.addEventListener('pointermove',move);
 function release(event){
  if(event.pointerId===stick){stick=null;base.hidden=true;knob.style.transform='';pad.classList.remove('is-down');input.setTouchStick(null);releaseCapture(pad,event.pointerId);}
  const action=held.get(event.pointerId);if(!action)return;held.delete(event.pointerId);input.holdAction(action,false);
  const button=root.querySelector(`[data-action="${action}"]`);button.classList.remove('is-down');button.setAttribute('aria-pressed','false');releaseCapture(button,event.pointerId);
 }
 function releaseCapture(element,id){if(element.hasPointerCapture(id))element.releasePointerCapture(id);}
 pad.addEventListener('lostpointercapture',release);
 for(const button of root.querySelectorAll('[data-action]')){
  button.setAttribute('aria-pressed','false');
  button.addEventListener('pointerdown',event=>{
   if(event.button>0)return;
   event.preventDefault();event.stopPropagation();const action=button.dataset.action;
   if([...held.values()].includes(action))return;
   held.set(event.pointerId,action);button.setPointerCapture(event.pointerId);button.classList.add('is-down');button.setAttribute('aria-pressed','true');input.holdAction(action,true);
  });
  button.addEventListener('lostpointercapture',release);
 }
 for(const event of ['pointerup','pointercancel'])document.addEventListener(event,release,true);
 function clear(){
  if(stick!==null)release({pointerId:stick});
  for(const id of [...held.keys()])release({pointerId:id});
  input.releaseTouch();input.clear();
 }
 window.addEventListener('blur',clear);window.addEventListener('pagehide',clear);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();});
 root.addEventListener('contextmenu',event=>event.preventDefault());
 return{root,clear,setVisible(visible){if(!visible)clear();root.hidden=!visible;},setDriving(value){
  if(value===driving)return;clear();driving=value;
  pad.hidden=value;walkingActions.hidden=value;kartControls.hidden=!value;
 }};
}
