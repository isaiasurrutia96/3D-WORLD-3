import * as THREE from 'three';
import {buildTrackData,createTrackRibbon} from './track-builder.js';

// A single ordered centerline traced from docs/winding-reference.png. The six
// sections are consecutive parts of ONE lap, never independently closed loops.
// Plan coordinates retain the reference's landmarks; heights are authored
// separately so a drawing overlap becomes a bridge rather than a junction.
const planSections=[
// Foreground curl and the lower chicane, starting at the finish line.
[[980,790],[860,820],[780,890],[680,930],[550,935],[460,910],[430,870],[450,825],[490,810],[550,825],[610,835],[650,815],[665,775],[650,745],[670,710],[730,700],[800,710],[850,690],[880,650],[870,610],[830,580],[750,555],[660,535]],
// Lower-left hairpin.
[[550,570],[440,640],[370,700],[335,760],[300,805],[250,825],[200,812],[160,775],[150,735],[170,700],[220,670],[285,650]],
// Left inner curl and upper-left return.
[[340,620],[380,565],[440,530],[470,490],[460,455],[410,430],[350,410],[280,380],[230,340],[210,290],[210,245],[240,190],[300,150],[370,125],[440,125],[480,145],[480,170],[440,195],[390,215],[375,245],[400,265],[455,270],[520,250],[590,220]],
// Broad right-hand outer bend, then the middle bridge.
[[650,235],[710,260],[765,280],[825,280],[900,255],[960,230],[1010,205],[1065,160],[1140,140],[1210,150],[1280,185],[1335,225],[1385,290],[1425,370],[1420,430],[1390,470],[1340,490],[1280,485],[1220,450],[1160,420],[1095,390],[1035,380],[995,395],[980,425],[1000,475],[975,500],[910,500],[840,500],[805,492],[791,470]],
// Central alternating hairpins.
[[799,442],[825,405],[850,360],[835,330],[800,310],[745,305],[695,315],[655,340],[645,370],[670,398],[717,417],[738,444],[725,469],[680,483],[630,480],[575,490],[550,515],[570,540],[610,552]],
// Lower sweep, left outer bend, upper loop and right inner return.
[[670,560],[750,590],[820,625],[830,655],[805,675],[750,680],[680,670],[610,660],[540,660],[470,650],[410,610],[350,580],[280,580],[210,580],[160,565],[130,535],[140,495],[175,460],[240,425],[320,395],[400,365],[480,330],[550,290],[590,240],[620,200],[670,180],[725,180],[765,165],[780,130],[780,105],[810,80],[860,75],[915,90],[940,115],[930,145],[900,165],[895,185],[925,210],[980,235],[1025,270],[1065,325],[1105,345],[1135,335],[1165,305],[1190,280],[1230,290],[1265,320],[1275,355],[1255,395],[1220,425],[1160,455],[1120,500],[1110,540],[1135,575],[1180,600],[1230,630],[1255,670],[1245,700],[1200,740],[1105,775]],
];

const plan=planSections.flat();
const design=new THREE.CatmullRomCurve3(plan.map(([x,z])=>new THREE.Vector3((x-980)*.65,0,(950-z)*.85+850)),true,'centripetal');
design.arcLengthDivisions=32768;
const designLength=design.getLength(),count=2400;
const raw=Array.from({length:count},(_,i)=>design.getPointAt(i/count));

// Round local spline kinks before offsetting the full-width road. A periodic
// Gaussian preserves the closed seam and gives the hairpins room for both curbs.
const sigma=23/(designLength/count),radius=Math.ceil(sigma*3);
const kernel=Array.from({length:2*radius+1},(_,i)=>({offset:i-radius,weight:Math.exp(-.5*((i-radius)/sigma)**2)}));
const weight=kernel.reduce((sum,k)=>sum+k.weight,0);
const points=raw.map((_,i)=>kernel.reduce((p,k)=>p.addScaledVector(raw[(i+k.offset+count)%count],k.weight/weight),new THREE.Vector3()));

// Flat approaches at every crossover; four curved elevation transitions use
// zero-slope, zero-acceleration endpoints. No jump ramps or disconnected decks.
const elevationKeys=[
 [[980,790],0],[[1210,150],0],[[1420,430],16],
 [[1160,420],16],[[799,442],32],[[820,625],32],
 [[470,650],16],[[1065,325],16],[[1220,425],0],[[1105,775],0],
];
const lengths=design.getLengths(design.arcLengthDivisions);
const heights=elevationKeys.map(([[x,z],height])=>{
 const index=plan.findIndex(p=>p[0]===x&&p[1]===z);
 return{u:lengths[Math.round(index/plan.length*design.arcLengthDivisions)]/designLength,height};
});
heights.push({u:1,height:0});
const entryX=points[0].x;
let section=0;
for(let i=0;i<count;i++){
 const u=i/count;
 while(u>heights[section+1].u)section++;
 const a=heights[section],b=heights[section+1],t=(u-a.u)/(b.u-a.u);
 const ease=t*t*t*(t*(t*6-15)+10);
 points[i].x-=entryX;
 points[i].y=a.height+(b.height-a.height)*ease;
}
export const WINDING_ENTRY=points[0].clone();
export const windingAccess={axis:'z',minX:-10,maxX:10,minZ:228,maxZ:WINDING_ENTRY.z+2,height:0,railStartZ:228,railEndZ:WINDING_ENTRY.z-18};
export const windingTrack=buildTrackData({
 name:'Winding floating circuit',points,count:2400,arcLengthDivisions:24000,access:windingAccess,
 opening:p=>p.y<.05&&p.z<WINDING_ENTRY.z-5&&p.z>WINDING_ENTRY.z-30&&Math.abs(p.x)<10,
});
export const windingSamples=windingTrack.samples;
export const createWindingTrack=()=>createTrackRibbon(windingTrack);
