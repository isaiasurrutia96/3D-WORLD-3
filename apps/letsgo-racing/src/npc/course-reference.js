import {ORIGINAL_COURSE} from '../courses.js';
import {NITRO_TOP_SPEED} from '../vehicle-controller.js';
import {ORIGINAL_NPC_REFERENCE} from './original-reference.js';

const references=new WeakMap();
// Keep the owner's derived driving line on Original. Other circuits follow
// their own centerline; the driver's curvature preview determines braking.
// Never stretch a recording from one layout onto a different circuit.
export function referenceForCourse(course){
 if(course===ORIGINAL_COURSE)return ORIGINAL_NPC_REFERENCE;
 if(!references.has(course))references.set(course,{course:course.id,length:course.length,sourceLaps:0,samples:[[0,NITRO_TOP_SPEED]]});
 return references.get(course);
}
