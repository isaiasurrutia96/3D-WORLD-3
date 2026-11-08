import {trackSamples} from './track.js';
import {skylineSamples} from './skyline-track.js';
import {defineCourse} from './race-course.js';

export const ORIGINAL_COURSE=defineCourse({id:'letsgo-circuit-d4a711d-start95-v1',name:'Original Circuit',samples:trackSamples,startIndex:95,storageKey:'letsgo.top-laps.v2',legacyStorageKey:'letsgo.best-lap.v1',entrance:{x:113,y:0,z:-150}});
export const SKYLINE_COURSE=defineCourse({id:'letsgo-skyline-v1',name:'Skyline Circuit',samples:skylineSamples,startIndex:30,storageKey:'letsgo.skyline.top-laps.v1',entrance:{x:-113,y:0,z:0}});
export const COURSES=[ORIGINAL_COURSE,SKYLINE_COURSE];
export const WORLD_START={x:0,y:0,z:-70,yaw:Math.PI/2};
