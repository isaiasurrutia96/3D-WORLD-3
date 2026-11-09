import {trackSamples} from './track.js';
import {skylineSamples} from './skyline-track.js';
import {suzukaSamples} from './suzuka-track.js';
import {windingSamples} from './winding-track.js';
import {defineCourse} from './race-course.js';

export const ORIGINAL_COURSE=defineCourse({id:'letsgo-circuit-d4a711d-start95-v1',name:'Original Circuit',samples:trackSamples,startIndex:95,storageKey:'letsgo.top-laps.v2',legacyStorageKey:'letsgo.best-lap.v1',entrance:{x:113,y:0,z:-150}});
export const SKYLINE_COURSE=defineCourse({id:'letsgo-skyline-v1',name:'Skyline Circuit',samples:skylineSamples,startIndex:30,storageKey:'letsgo.skyline.top-laps.v1',entrance:{x:-113,y:0,z:0}});
export const SUZUKA_COURSE=defineCourse({id:'letsgo-suzuka-v1',name:'Suzuka Circuit',samples:suzukaSamples,startIndex:0,storageKey:'letsgo.suzuka.top-laps.v1',entrance:{x:0,y:0,z:-213}});
// A new route gets its own records; both retired three-level storage keys stay intact.
export const WINDING_COURSE=defineCourse({id:'letsgo-winding-v1',name:'Winding Circuit',samples:windingSamples,startIndex:0,storageKey:'letsgo.winding.top-laps.v1',entrance:{x:0,y:0,z:213}});
export const COURSES=[ORIGINAL_COURSE,SKYLINE_COURSE,SUZUKA_COURSE,WINDING_COURSE];
export const WORLD_START={x:0,y:0,z:-70,yaw:Math.PI/2};
