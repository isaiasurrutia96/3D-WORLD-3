import {CatmullRomCurve3,Vector3} from 'three';
export const TAU=Math.PI*2,ISLAND_X=61,ISLAND_Z=43,EDGE_SEGMENTS=128;
export function random(seed=9427){let n=seed;return()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};}
export function outlineRadius(a){return 1+.075*Math.cos(4*a-.65)+.035*Math.sin(3*a+.3)+.018*Math.sin(7*a-.8);}
export function outline(a,scale=1){const r=outlineRadius(a)*scale;return{x:Math.cos(a)*ISLAND_X*r,z:Math.sin(a)*ISLAND_Z*r};}
export function contains(x,z,margin=0){const a=Math.atan2(z/ISLAND_Z,x/ISLAND_X);return Math.hypot(x/ISLAND_X,z/ISLAND_Z)<outlineRadius(a)-margin;}
export function groundHeight(x,z){return .65+.38*Math.sin(x*.045+z*.04)+.28*Math.cos(z*.065-x*.015)+1.1*Math.exp(-((x-34)**2+(z+19)**2)/390)+.65*Math.exp(-((x+41)**2+(z-12)**2)/190);}
const v=(x,z)=>new Vector3(x,0,z);
export const pathCurve=new CatmullRomCurve3([v(-36,-4),v(-17,-8),v(8,-20),v(33,-19),v(43,-5),v(38,14),v(29,27),v(8,30),v(-16,29),v(-36,18),v(-41,8)],true,'centripetal');
const angle=1.10,edge=outline(angle),a=outline(angle-.001),b=outline(angle+.001),length=Math.hypot(b.x-a.x,b.z-a.z);
export const FALL={x:edge.x,z:edge.z,nx:(b.z-a.z)/length,nz:-(b.x-a.x)/length,width:5.1,bottom:-30};
export const riverCurve=new CatmullRomCurve3([v(edge.x-FALL.nx*20-1,edge.z-FALL.nz*20),v(edge.x-FALL.nx*13-2,edge.z-FALL.nz*13),v(edge.x-FALL.nx*6+.3,edge.z-FALL.nz*6),v(edge.x+.10*FALL.nx,edge.z+.10*FALL.nz)],false,'centripetal');
export const riverPoints=riverCurve.getPoints(90);
export function riverDistance(x,z){let best=Infinity;for(let i=0;i<riverPoints.length-1;i++){const a=riverPoints[i],b=riverPoints[i+1],dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz)));best=Math.min(best,Math.hypot(x-a.x-dx*t,z-a.z-dz*t));}return best;}
export function terrainHeight(x,z){const river=riverDistance(x,z),pond=riverPoints[0],distance=Math.hypot((x-pond.x)/1.1,z-pond.z);return groundHeight(x,z)-.78*Math.max(Math.exp(-Math.pow(river/3,4)),Math.exp(-Math.pow(distance/3.5,4)));}
export function waterHeight(x,z){return groundHeight(x,z)-.46;}
export const golfOutline=new CatmullRomCurve3([v(-44,-17),v(-43,-22),v(-38,-24),v(-31,-24),v(-28,-29),v(-21,-29),v(-17,-25),v(-17,-21),v(-20,-18),v(-29,-18),v(-32,-12),v(-39,-12),v(-43,-13)],true,'centripetal');
export const trees=[[-49,-8,1],[-45,15,1.06],[-37,28,.83],[-11,-37,1.02],[-5,-38,.91],[36,-28,.95],[49,-8,1.03],[46,15,1.10],[15,36,.76],[-48,-17,.77],[-24,-34,.72]];
export const rocks=[[-46,23,2.3],[-43,27,1.1],[-51,6,1.2],[-39,-29,1.6],[-4,-34,2.1],[44,-17,1.7],[49,20,2],[38,28,1.5],[FALL.x-5,FALL.z-2,2.1],[FALL.x+5,FALL.z-1,1.7],[-23,34,1.5]];
