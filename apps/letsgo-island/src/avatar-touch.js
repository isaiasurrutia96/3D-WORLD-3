// A small touch layer for the same Input/Player used by the keyboard.
export function createAvatarTouch(input,parent){
 const root=document.createElement('div');root.className='avatar-touch';root.hidden=true;
 root.innerHTML='<div class="move-pad" id="island-move-pad" role="group" aria-label="Movement joystick"><span class="move-pad__knob"></span><span class="move-pad__label">Move</span></div><div class="avatar-actions"><button type="button" data-action="crouch" tabindex="-1">Crouch</button><button type="button" data-action="jump" tabindex="-1">Jump</button></div>';
 parent.append(root);
 const pad=root.querySelector('.move-pad'),knob=root.querySelector('.move-pad__knob'),held=new Map();let stick=null;
 function move(event){
  if(event.pointerId!==stick)return;
  const box=pad.getBoundingClientRect(),x=(event.clientX-box.left-box.width/2)/42,y=(event.clientY-box.top-box.height/2)/42,length=Math.hypot(x,y),scale=Math.max(1,length);
  knob.style.transform=`translate(${x/scale*34}px,${y/scale*34}px)`;
  if(length<.14)input.setTouchStick(0,0);
  else{const magnitude=Math.min(1,(length-.14)/.86);input.setTouchStick(x/length*magnitude,y/length*magnitude);}
  event.preventDefault();
 }
 pad.addEventListener('pointerdown',event=>{
  if(stick!==null)return;event.preventDefault();event.stopPropagation();stick=event.pointerId;pad.setPointerCapture(stick);pad.classList.add('is-down');move(event);
 });
 pad.addEventListener('pointermove',move);
 function release(event){
  if(event.pointerId===stick){stick=null;knob.style.transform='';pad.classList.remove('is-down');input.setTouchStick(null);}
  const action=held.get(event.pointerId);if(!action)return;held.delete(event.pointerId);input.holdAction(action,false);
  root.querySelector(`[data-action="${action}"]`).classList.remove('is-down');
 }
 pad.addEventListener('lostpointercapture',release);
 for(const button of root.querySelectorAll('[data-action]')){
  button.addEventListener('pointerdown',event=>{
   event.preventDefault();event.stopPropagation();const action=button.dataset.action;
   if([...held.values()].includes(action))return;
   held.set(event.pointerId,action);button.setPointerCapture(event.pointerId);button.classList.add('is-down');input.holdAction(action,true);
  });
  button.addEventListener('lostpointercapture',release);
 }
 for(const event of ['pointerup','pointercancel'])window.addEventListener(event,release);
 function clear(){
  if(stick!==null)release({pointerId:stick});
  for(const id of [...held.keys()])release({pointerId:id});
  input.releaseTouch();input.clear();
 }
 window.addEventListener('blur',clear);window.addEventListener('pagehide',clear);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();});
 root.addEventListener('contextmenu',event=>event.preventDefault());
 return{root,clear,setVisible(visible){if(!visible)clear();root.hidden=!visible;}};
}
