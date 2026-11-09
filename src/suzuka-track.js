import * as THREE from 'three';
import {SUZUKA_LAYOUT} from './data/suzuka-layout.js';
import {buildTrackData,createTrackRibbon} from './track-builder.js';

// Keep the published figure-eight route. Only its back-straight crossover is
// raised; jump ramps and airborne vehicle changes are outside this milestone.
export const SUZUKA_ENTRY={x:0,y:0,z:-450};
// The bridge overlaps the road; its rails stop before the junction so both
// race directions stay open.
export const suzukaAccess={axis:'z',minX:-10,maxX:10,minZ:SUZUKA_ENTRY.z-2,maxZ:-228,height:0,railStartZ:SUZUKA_ENTRY.z+14.25,railEndZ:-228};
export const suzukaTrack=buildTrackData({
 name:'Suzuka floating circuit',count:2400,arcLengthDivisions:14400,
 points:SUZUKA_LAYOUT.points.map(([x,z,y])=>new THREE.Vector3(x-SUZUKA_LAYOUT.entry[0],y,z-SUZUKA_LAYOUT.entry[1]+SUZUKA_ENTRY.z)),
 access:suzukaAccess,opening:p=>p.z<SUZUKA_ENTRY.z+15&&p.z>SUZUKA_ENTRY.z+7&&Math.abs(p.x)<10,
});
export const suzukaSamples=suzukaTrack.samples;
export const createSuzukaTrack=()=>createTrackRibbon(suzukaTrack);
