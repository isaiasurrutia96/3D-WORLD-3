import {COURSES} from './courses.js';
import {MAX_GHOSTS,GHOST_COLORS} from './time-trial.js';

// Explore with both circuits visible; focus the selected route during a lap.
// Ghost dots use the same sampled poses as the visible replay karts.
export function createMinimap(container,getFocusedCourse=()=>COURSES[0]){
 const width=180,height=150,padding=12,ns='http://www.w3.org/2000/svg';
 const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox',`0 0 ${width} ${height}`);svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');container.append(svg);
 let key=null,project,marker,arrow,ghostMarkers=[];
 function add(tag,attributes,parent=svg){const node=document.createElementNS(ns,tag);for(const [name,value]of Object.entries(attributes))node.setAttribute(name,String(value));parent.append(node);return node;}
 function rebuild(focused){
  const courses=focused?[focused]:COURSES,points=courses.flatMap(c=>c.samples.map(s=>s.point)),outer=14.1;
  const minX=Math.min(...points.map(p=>p.x))-outer,maxX=Math.max(...points.map(p=>p.x))+outer,minZ=Math.min(...points.map(p=>p.z))-outer,maxZ=Math.max(...points.map(p=>p.z))+outer;
  const scale=Math.min((width-padding*2)/(maxX-minX),(height-padding*2)/(maxZ-minZ)),left=(width-(maxX-minX)*scale)/2,top=(height-(maxZ-minZ)*scale)/2;
  project=p=>({x:left+(p.x-minX)*scale,y:top+(p.z-minZ)*scale});
  const xy=p=>{const q=project(p);return`${q.x.toFixed(2)},${q.y.toFixed(2)}`;},style={fill:'none','stroke-linejoin':'round','stroke-linecap':'round'};
  svg.replaceChildren();svg.dataset.course=focused?.id??'world';
  for(const course of courses){
   const points=course.samples.map(s=>s.point),roadWidth=Math.max(2.5,(course.halfWidth+course.curbWidth)*2*scale),d=`M${points.map(xy).join(' L')} Z`;
   add('path',{d,...style,stroke:'#080e25','stroke-width':roadWidth+2.5});add('path',{d,...style,stroke:'#b8c7da','stroke-width':roadWidth});
   // Draw successive deck levels from low to high so bridge crossings read
   // in the same order as the physical roads, including the third level.
   for(const level of [1,11,21]){
    let raised='',section=[];
    for(let i=0;i<points.length;i++){
     if(points[i].y>level){if(!section.length&&i)section.push(points[i-1]);section.push(points[i]);}
     else if(section.length){section.push(points[i]);raised+=`M${section.map(xy).join(' L')} `;section=[];}
    }
    if(section.length)raised+=`M${section.map(xy).join(' L')}`;
    if(raised){add('path',{d:raised,...style,stroke:'#080e25','stroke-width':roadWidth+3});add('path',{d:raised,...style,stroke:'#e1ebf8','stroke-width':roadWidth});}
   }
   const p=course.start,dx=Math.cos(p.yaw)*(outer+2),dz=-Math.sin(p.yaw)*(outer+2),start=`M${xy({x:p.x-dx,z:p.z-dz})} L${xy({x:p.x+dx,z:p.z+dz})}`;
   add('path',{d:start,stroke:'#080e25','stroke-width':3.5});add('path',{d:start,stroke:'#fff','stroke-width':1.8});
  }
  ghostMarkers=Array.from({length:MAX_GHOSTS},(_,i)=>add('circle',{'data-minimap-ghost':i+1,r:3.8,fill:GHOST_COLORS[i],stroke:'#080e25','stroke-width':1.2,visibility:'hidden'}));
  marker=add('g',{'data-minimap-player':''});add('circle',{r:6,fill:'#080e25','fill-opacity':.35},marker);arrow=add('path',{d:'M0 -7 L5 5 L0 2 L-5 5 Z',fill:'#8df5ff',stroke:'#10233b','stroke-width':1,'stroke-linejoin':'round'},marker);
 }
 return function update(position,yaw,ghostPoses=[]){
  const focused=getFocusedCourse(),next=focused?.id??'world';if(key!==next){key=next;rebuild(focused);}
  const p=project(position);p.x=Math.max(padding,Math.min(width-padding,p.x));p.y=Math.max(padding,Math.min(height-padding,p.y));marker.setAttribute('transform',`translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})`);arrow.setAttribute('transform',`rotate(${(180-yaw*180/Math.PI).toFixed(2)})`);
  ghostMarkers.forEach((node,i)=>{const pose=ghostPoses[i];node.setAttribute('visibility',pose?'visible':'hidden');if(pose){const p=project(pose);node.setAttribute('cx',p.x.toFixed(2));node.setAttribute('cy',p.y.toFixed(2));}});
 };
}
