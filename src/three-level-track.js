import * as THREE from 'three';
import {THREE_LEVEL_COMPACT} from './data/three-level-compact.js';
import {buildTrackData,createTrackRibbon} from './track-builder.js';

// Compact only the centerline. Asphalt width, curbs and rails keep their
// existing dimensions; the offline design keeps bends and crossings clear.
const points=THREE_LEVEL_COMPACT.points.map(p=>new THREE.Vector3(...p));
export const THREE_LEVEL_ENTRY=new THREE.Vector3(...THREE_LEVEL_COMPACT.entry);
export const threeLevelAccess={axis:'z',minX:-10,maxX:10,minZ:228,maxZ:THREE_LEVEL_ENTRY.z+2,height:0,railStartZ:228,railEndZ:THREE_LEVEL_ENTRY.z-14.25};
export const threeLevelTrack=buildTrackData({
 name:'Three-level floating circuit',points,count:5000,arcLengthDivisions:40000,access:threeLevelAccess,
 opening:p=>p.y<.05&&p.z<THREE_LEVEL_ENTRY.z-6&&p.z>THREE_LEVEL_ENTRY.z-15&&Math.abs(p.x)<10,
});
export const threeLevelSamples=threeLevelTrack.samples;
export const threeLevelSections=THREE_LEVEL_COMPACT.sections.map((section,i)=>({
 name:section.name,height:section.height,points:points.slice(section.first,section.last+1),
 connector:points.slice(section.last+1,THREE_LEVEL_COMPACT.sections[i+1]?.first??points.length),
}));
export const createThreeLevelTrack=()=>createTrackRibbon(threeLevelTrack);
