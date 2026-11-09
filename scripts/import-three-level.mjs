import {readFileSync,writeFileSync} from 'node:fs';

const routes=[];
for(const [name,id]of [['spa','4.1'],['zandvoort','17.1'],['interlagos','1.1']]){
 const svg=readFileSync(new URL(`../docs/references/${name}.svg`,import.meta.url),'utf8');
 const points=svg.match(/<polyline points="([^"]+)"/)[1].trim().split(/\s+/).map(pair=>pair.split(',').map(Number));
 const distances=[0];for(let i=1;i<points.length;i++)distances.push(distances.at(-1)+Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]));
 const length=distances.at(-1)+Math.hypot(points[0][0]-points.at(-1)[0],points[0][1]-points.at(-1)[1]);
 function simplify(first,last,tolerance=.3){
  const a=points[first],b=points[last],dx=b[0]-a[0],dz=b[1]-a[1],length2=dx*dx+dz*dz;let best=tolerance,index=-1;
  for(let i=first+1;i<last;i++){const p=points[i],t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dz)/(length2||1))),distance=Math.hypot(p[0]-a[0]-dx*t,p[1]-a[1]-dz*t);if(distance>best){best=distance;index=i;}}
  return index<0?[first,last]:[...simplify(first,index,tolerance).slice(0,-1),...simplify(index,last,tolerance)];
 }
 const bounds=[0,1].map(axis=>[Math.min(...points.map(p=>p[axis])),Math.max(...points.map(p=>p[axis]))]);
 routes.push({name,source:`https://github.com/LigasAVBrasil/RaceTracksAPI/blob/e9ec550b1d641f8183d0ee9223bd15abed3fbdfa/images/track_${id}.svg`,length,center:bounds.map(([a,b])=>(a+b)/2),north:points.reduce((best,p)=>p[1]<best[1]?p:best),points:simplify(0,points.length-1).map(i=>[...points[i],distances[i]])});
}
writeFileSync(new URL('../src/data/three-level-layout.js',import.meta.url),`// Generated offline from the three reference SVGs by scripts/import-three-level.mjs.\nexport const THREE_LEVEL_LAYOUT=${JSON.stringify(routes)};\n`);
console.log(routes.map(r=>`${r.name}: ${r.points.length} control points`).join('\n'));
