import {trackSamples,TRACK_HALF_WIDTH,CURB_WIDTH,access} from './track.js';
import {FLOOR_WIDTH,FLOOR_LENGTH} from './world.js';
import {RACE_START} from './time-trial.js';

// The map shares the actual world geometry; it stays fixed as the camera
// turns. Only the player marker changes each frame, with no extra 3D render.
export function createMinimap(container){
 const width=180,height=150,padding=12,outer=TRACK_HALF_WIDTH+CURB_WIDTH;
 const points=trackSamples.map(sample=>sample.point);
 const minX=Math.min(-FLOOR_WIDTH/2,...points.map(p=>p.x-outer));
 const maxX=Math.max(FLOOR_WIDTH/2,...points.map(p=>p.x+outer));
 const minZ=Math.min(-FLOOR_LENGTH/2,...points.map(p=>p.z-outer));
 const maxZ=Math.max(FLOOR_LENGTH/2,...points.map(p=>p.z+outer));
 const scale=Math.min((width-padding*2)/(maxX-minX),(height-padding*2)/(maxZ-minZ));
 const left=(width-(maxX-minX)*scale)/2,top=(height-(maxZ-minZ)*scale)/2;
 const project=p=>({x:left+(p.x-minX)*scale,y:top+(p.z-minZ)*scale});
 const xy=p=>{const q=project(p);return`${q.x.toFixed(2)},${q.y.toFixed(2)}`;};
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 svg.setAttribute('viewBox',`0 0 ${width} ${height}`);svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');container.append(svg);
 function add(tag,attributes,parent=svg){
  const node=document.createElementNS(svg.namespaceURI,tag);
  for(const [key,value]of Object.entries(attributes))node.setAttribute(key,String(value));
  parent.append(node);return node;
 }
 function rectangle(minX,minZ,maxX,maxZ,attributes){
  const a=project({x:minX,z:minZ}),b=project({x:maxX,z:maxZ});
  add('rect',{x:a.x,y:a.y,width:b.x-a.x,height:b.y-a.y,...attributes});
 }
 rectangle(-FLOOR_WIDTH/2,-FLOOR_LENGTH/2,FLOOR_WIDTH/2,FLOOR_LENGTH/2,{fill:'#26354a',stroke:'#526681','stroke-width':.7,'stroke-dasharray':'2 2'});
 rectangle(access.minX,access.minZ,access.maxX,access.maxZ,{fill:'#a4b6cb'});
 const roadWidth=Math.max(3,outer*2*scale),road=`M${points.map(xy).join(' L')} Z`;
 const style={fill:'none','stroke-linejoin':'round','stroke-linecap':'round'};
 add('path',{d:road,...style,stroke:'#080e25','stroke-width':roadWidth+2.5});
 add('path',{d:road,...style,stroke:'#b8c7da','stroke-width':roadWidth});
 // Draw the elevated stretch last so its crossing reads as a bridge,
 // rather than a junction that a driver could turn into.
 let raised='',section=[];
 for(let i=0;i<points.length;i++){
  if(points[i].y>1){if(!section.length&&i>0)section.push(points[i-1]);section.push(points[i]);}
  else if(section.length){section.push(points[i]);raised+=`M${section.map(xy).join(' L')} `;section=[];}
 }
 if(section.length)raised+=`M${section.map(xy).join(' L')}`;
 add('path',{d:raised,...style,stroke:'#080e25','stroke-width':roadWidth+3});
 add('path',{d:raised,...style,stroke:'#e1ebf8','stroke-width':roadWidth});
 const dx=Math.cos(RACE_START.yaw)*(outer+2),dz=-Math.sin(RACE_START.yaw)*(outer+2);
 const start=`M${xy({x:RACE_START.x-dx,z:RACE_START.z-dz})} L${xy({x:RACE_START.x+dx,z:RACE_START.z+dz})}`;
 add('path',{d:start,stroke:'#080e25','stroke-width':3.5});
 add('path',{d:start,stroke:'#fff','stroke-width':1.8});
 const marker=add('g',{'data-minimap-player':''});
 add('circle',{r:6,fill:'#080e25','fill-opacity':.8},marker);
 const arrow=add('path',{d:'M0 -7 L5 5 L0 2 L-5 5 Z',fill:'#8df5ff',stroke:'#10233b','stroke-width':1,'stroke-linejoin':'round'},marker);
 return function update(position,yaw){
  const point=project(position);
  marker.setAttribute('transform',`translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
  // SVG points up at zero degrees; the game's zero yaw faces world +Z.
  arrow.setAttribute('transform',`rotate(${(180-yaw*180/Math.PI).toFixed(2)})`);
 };
}
