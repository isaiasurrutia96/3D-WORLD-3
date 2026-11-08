import {GRID_SIZE,layoutProfile,snapPosition,encodePosition,decodePosition,readLayouts,saveLayouts} from './layout-state.js';

// Position offsets preserve each element's normal layout space, so moving the
// lap panel does not pull its neighboring item button out of place.
export function createLayoutEditor({onPreview,onClose}){
 const app=document.getElementById('app'),game=document.getElementById('game-screen'),home=document.getElementById('home-screen'),settings=document.getElementById('settings-screen'),editor=document.getElementById('layout-editor');
 const selection=document.getElementById('layout-selection'),profileLabel=document.getElementById('layout-profile');
 const items=[
  ['navigation','.game-navigation','Home / View / Exit'],['trial','.trial-panel','Time trial'],['minimap','#minimap','Minimap'],
  ['left','#touch-left','Left'],['right','#touch-right','Right'],['gas','#touch-primary','Gas'],['brake','#touch-secondary','Brake / Reverse'],
 ].map(([id,selector,label])=>({id,node:document.querySelector(selector),label}));
 let storage=null;try{storage=localStorage;}catch{}
 let saved=readLayouts(storage),draft=null,editing=false,drag=null,selected=null,resizeFrame=0;
 const viewport=()=>{
  const style=getComputedStyle(app),size={width:app.clientWidth,height:app.clientHeight};
  for(const side of ['Left','Right','Top','Bottom'])size[`safe${side}`]=parseFloat(style.getPropertyValue(`--layout-safe-${side.toLowerCase()}`))||0;
  return size;
 };
 const profile=()=>layoutProfile(app.clientWidth,app.clientHeight);
 const activeLayouts=()=>editing?draft:saved;
 const clone=value=>JSON.parse(JSON.stringify(value));
 function clearOffsets(){for(const {node}of items){node.style.removeProperty('translate');node.removeAttribute('data-custom-layout');}}
 function position(item,point,box){item.node.style.translate=`${point.x-box.x}px ${point.y-box.y}px`;item.node.dataset.customLayout='true';}
 function apply(){
  clearOffsets();const positions=activeLayouts()?.[profile()]??{},size=viewport();
  // Read before writing so all defaults come from the same unmodified layout.
  const boxes=items.map(item=>item.node.getBoundingClientRect());
  items.forEach((item,i)=>{const p=positions[item.id],box=boxes[i];if(p&&box.width&&box.height)position(item,decodePosition(p,box.width,box.height,size),box);});
  const panel=items.find(item=>item.id==='trial').node,panelBox=panel.getBoundingClientRect();
  panel.dataset.popoverSide=panelBox.x<190?'right':'left';panel.style.setProperty('--layout-popover-height',`${Math.max(48,size.height-panelBox.y-Math.max(8,size.safeBottom))}px`);
  if(editing)profileLabel.textContent=`${profile()==='portrait'?'Portrait':'Landscape'} · ${GRID_SIZE} px grid`;
 }
 function select(item){
  selected=item;for(const entry of items)entry.node.classList.toggle('layout-selected',entry===item);
  selection.textContent=item?`${item.label} · Drag or use arrow keys`:'Drag an outlined item · Arrow keys fine-tune';
 }
 function place(item,x,y){
  const size=viewport(),box=item.node.getBoundingClientRect(),point=snapPosition(x,y,box.width,box.height,size);
  const offset=item.node.style.translate.split(' ').map(parseFloat),base={x:box.x-(offset[0]||0),y:box.y-(offset[1]||0)};
  draft[profile()]??={};draft[profile()][item.id]=encodePosition(point,box.width,box.height,size);position(item,point,base);
 }
 function showSettings(){home.hidden=true;home.inert=true;settings.hidden=false;settings.inert=false;app.dataset.screen='settings';document.getElementById('customize-layout').focus({preventScroll:true});}
 function cancelDrag(){const current=drag;drag=null;if(current)try{if(current.item.node.hasPointerCapture(current.id))current.item.node.releasePointerCapture(current.id);}catch{}}
 function close(){
  editing=false;cancelDrag();editor.hidden=true;app.classList.remove('layout-editing');
  for(const {node}of items){node.classList.remove('layout-movable','layout-selected');node.removeAttribute('data-layout-label');node.removeAttribute('data-layout-id');node.removeAttribute('tabindex');}
  // Restore buttons' native keyboard focusability; only non-controls had a
  // temporary tabindex, and buttons remain keyboard accessible without one.
  game.hidden=true;game.inert=true;onClose();draft=null;apply();showSettings();
 }
 function open(){
  draft=clone(saved);editing=true;settings.hidden=true;settings.inert=true;home.hidden=true;game.hidden=false;game.inert=false;app.dataset.screen='layout';app.classList.add('layout-editing');editor.hidden=false;
  onPreview();
  for(const item of items){item.node.classList.add('layout-movable');item.node.dataset.layoutId=item.id;item.node.dataset.layoutLabel=item.label;item.node.tabIndex=0;}
  select(null);apply();document.getElementById('layout-save').focus({preventScroll:true});
 }
 document.getElementById('settings-button').addEventListener('click',showSettings);
 document.getElementById('settings-back').addEventListener('click',()=>{settings.hidden=true;settings.inert=true;home.hidden=false;home.inert=false;app.dataset.screen='home';document.getElementById('settings-button').focus({preventScroll:true});});
 document.getElementById('customize-layout').addEventListener('click',open);
 document.getElementById('layout-cancel').addEventListener('click',close);
 document.getElementById('layout-reset').addEventListener('click',()=>{draft[profile()]={};apply();select(null);});
 document.getElementById('layout-save').addEventListener('click',()=>{
  if(!saveLayouts(storage,draft)){selection.textContent='Unable to save in this browser. Your changes are still open; allow site storage and try again.';return;}
  const name=profile()==='portrait'?'Portrait':'Landscape';saved=clone(draft);close();
  const message=document.getElementById('layout-save-status');message.textContent=`${name} layout saved in this browser.`;message.hidden=false;
 });
 document.addEventListener('pointerdown',event=>{
  if(!editing||!game.contains(event.target))return;
  event.preventDefault();event.stopImmediatePropagation();
  if(event.button>0||drag)return;
  const item=items.find(item=>item.node.contains(event.target));select(item??null);if(!item)return;
  const box=item.node.getBoundingClientRect();drag={item,id:event.pointerId,x:event.clientX-box.x,y:event.clientY-box.y};
  item.node.focus({preventScroll:true});try{item.node.setPointerCapture(event.pointerId);}catch{}
 },true);
 document.addEventListener('pointermove',event=>{
  if(!editing||!drag||event.pointerId!==drag.id)return;
  event.preventDefault();event.stopImmediatePropagation();place(drag.item,event.clientX-drag.x,event.clientY-drag.y);
 },true);
 function endDrag(event){
  if(!editing||!drag||event.pointerId!==drag.id)return;
  event.preventDefault();event.stopImmediatePropagation();const {item,id}=drag;drag=null;try{if(item.node.hasPointerCapture(id))item.node.releasePointerCapture(id);}catch{}
 }
 document.addEventListener('pointerup',endDrag,true);document.addEventListener('pointercancel',endDrag,true);
 document.addEventListener('click',event=>{if(editing&&game.contains(event.target)){event.preventDefault();event.stopImmediatePropagation();}},true);
 document.addEventListener('keydown',event=>{
  if(!editing)return;
  if(event.code==='Escape'){event.preventDefault();close();return;}
  const item=items.find(item=>item.node===document.activeElement||item.node.contains(document.activeElement));
  if(!item)return;
  if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.code)){
   event.preventDefault();event.stopImmediatePropagation();select(item);const box=item.node.getBoundingClientRect();place(item,box.x+(event.code==='ArrowRight'?GRID_SIZE:event.code==='ArrowLeft'?-GRID_SIZE:0),box.y+(event.code==='ArrowDown'?GRID_SIZE:event.code==='ArrowUp'?-GRID_SIZE:0));
  }else if(event.code==='Space'||event.code==='Enter'){event.preventDefault();event.stopImmediatePropagation();select(item);}
 },true);
 for(const type of ['blur','orientationchange'])window.addEventListener(type,cancelDrag);
 function scheduleApply(){cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(apply);}
 window.addEventListener('resize',()=>{cancelDrag();scheduleApply();});
 const observer=new ResizeObserver(scheduleApply);for(const {node}of items)observer.observe(node);
 return{apply,isEditing:()=>editing};
}
