import * as THREE from 'three';
import {buildTrackData,createTrackRibbon} from './track-builder.js';

// Ordered route traced from the approved slot-car-style preview, not the
// subsequent curvy concept. It is a single loop with three road levels.
const layout=[
 [410,220,0],[410,460,0],[420,700,0],[430,850,0],[420,920,0],[370,970,0],[300,970,0],[260,930,0],
 [250,860,0],[280,800,0],[330,770,0],[410,810,12],[480,820,12],[540,780,12],[555,710,12],[520,650,16],
 [360,490,28],[230,340,28],[110,210,28],[70,160,28],[70,120,28],[100,90,28],[150,90,28],
 [210,120,28],[350,220,28],[460,300,28],[500,340,24],[500,390,18],[470,430,14],[400,480,14],
 [200,680,14],[110,750,6],[50,750,0],[20,700,0],[20,630,0],[40,480,6],[65,340,12],[100,280,12],
 [140,250,12],[210,230,12],[260,250,8],[290,300,0],[290,500,0],[270,550,0],[210,570,0],
 [160,550,0],[140,510,0],[145,350,0],[165,200,0],[170,90,0],[210,50,0],[270,40,0],
 [330,60,0],[370,100,0],[400,160,0],
];
export const SKYLINE_ENTRY={x:-301.5,y:0,z:0};
export const skylineAccess={minX:SKYLINE_ENTRY.x-2,maxX:-128,minZ:-10,maxZ:10,height:0,railStartX:SKYLINE_ENTRY.x+14.25};
export const skylineTrack=buildTrackData({name:'Skyline floating circuit',points:layout.map(([x,z,y])=>new THREE.Vector3(-650+x*.85,y,z*.85-187)),access:skylineAccess,opening:p=>p.x>SKYLINE_ENTRY.x+8&&Math.abs(p.z)<9});
export const skylineSamples=skylineTrack.samples;
export const createSkylineTrack=()=>createTrackRibbon(skylineTrack);
