import * as THREE from 'three';
import reference from '../../references/sm64-backflip.json' with {type:'json'};

export const BACKFLIP_DURATION=2.25;
export const TAKEOFF=.40,TOUCHDOWN=1.50;
export const PHASES=[{time:0,label:'Neutral'},{time:.12,label:'Crouch'},{time:.30,label:'Push-off'},{time:.46,label:'Tuck'},{time:.66,label:'Backward rotation'},{time:1.27,label:'Extension'},{time:1.50,label:'Landing'},{time:1.85,label:'Neutral'}];
// Deliberately posed preparation, arm sweep, opening and recovery. No gait,
// controller, random motion, IK run generator or gameplay action is involved.
// All angles below are degrees in the existing avatar's local joint axes.
export const KEYS=[
 // time, pelvis pitch, hip, knee, ankle, shoulder, elbow, upper-arm spread, chest
 [0,0,0,0,0,0,0,0,0],
 [.10,0,0,0,0,0,0,0,0],
 [.26,12,-68,112,-44,48,-36,7,5],
 [.32,8,-40,75,-35,0,-46,9,3],
 [.40,-22,-2,45,-52,-132,-35,12,0],
 [.52,-22,-7,49,-44,-145,-55,14,-8],
 [.70,-22,-22,64,-39,-108,-90,15,-12],
 [.92,-22,-43,87,-42,-75,-112,14,-10],
 [1.14,-22,-57,105,-48,-48,-100,12,-6],
 [1.30,-22,-58,114,-63,-30,-75,10,-3],
 [1.43,-22,-45,107,-68,-24,-48,14,0],
 [1.50,-720,-28,65,-37,-30,-40,14,2],
 [1.60,-720,-48,85,-37,-26,-42,10,5],
 [1.85,-720,0,0,0,0,0,0,0],
 [2.25,-720,0,0,0,0,0,0,0],
];
const radians=THREE.MathUtils.degToRad;
function channel(t,index){
 let i=0;while(i<KEYS.length-2&&t>KEYS[i+1][0])i++;
 const a=KEYS[i],b=KEYS[i+1],u=THREE.MathUtils.clamp((t-a[0])/(b[0]-a[0]),0,1),smooth=u*u*(3-2*u);
 return THREE.MathUtils.lerp(a[index],b[index],smooth);
}
// Preserve full rotations when decoding 16-bit angles: quaternion interpolation
// between only the first/last poses would incorrectly erase the somersaults.
export const referenceTurns=[];
for(const frame of reference.frames){let value=frame[8]/65536*360;const previous=referenceTurns.at(-1);if(previous!==undefined){while(value-previous>180)value-=360;while(value-previous< -180)value+=360;}referenceTurns.push(value);}
function referenceChannel(frame,channel){const lo=Math.floor(frame),hi=Math.min(reference.frames.length-1,lo+1);return THREE.MathUtils.lerp(reference.frames[lo][channel],reference.frames[hi][channel],frame-lo)/65536*360;}
export function sampleBackflip(t){
 t=THREE.MathUtils.clamp(t,0,BACKFLIP_DURATION);
 const airborne=t>TAKEOFF&&t<TOUCHDOWN,u=THREE.MathUtils.clamp((t-TAKEOFF)/(TOUCHDOWN-TAKEOFF),0,1);
 let pitch=channel(t,1),hip=channel(t,2),knee=channel(t,3),ankle=channel(t,4);
 if(t>=TAKEOFF&&t<=TOUCHDOWN){
  const frame=u*32,lo=Math.floor(frame),hi=Math.min(32,lo+1);
  pitch=THREE.MathUtils.lerp(referenceTurns[lo],referenceTurns[hi],frame-lo)-90;
  // Reference sagittal leg chain: the original hip socket points -90°,
  // whereas this avatar's neutral leg already points down its local -Y.
  hip=referenceChannel(frame,41)+referenceChannel(frame,44)+180;
  knee=referenceChannel(frame,47);ankle=referenceChannel(frame,50);
  // Longer limbs need extra folding to retain a compact silhouette rather
  // than copying Mario's short-leg pose into a stretched horizontal layout.
  const tuck=Math.sin(Math.PI*u);
  hip=hip*(1+.65*tuck)-15*tuck;knee=knee*(1+.25*tuck)+15*tuck;
  // Open the legs before contact rather than importing the source's airborne
  // last frame directly into a different skeleton's landing.
  const blend=THREE.MathUtils.smoothstep(u,.76,1);
  hip=THREE.MathUtils.lerp(hip,-28,blend);knee=THREE.MathUtils.lerp(knee,65,blend);ankle=THREE.MathUtils.lerp(ankle,-37,blend);
  pitch=THREE.MathUtils.lerp(pitch,-720,THREE.MathUtils.smoothstep(u,.88,1));
 }
 return {t,airborne,u,pitch,hip,knee,ankle,shoulder:channel(t,5),elbow:channel(t,6),spread:channel(t,7),chest:channel(t,8),height:airborne?4*1.9*u*(1-u):0};
}
export function createBackflipClip(avatar){
 const bones=avatar.skeleton.bones,times=[],positions=[],rotations=new Map(bones.map(b=>[b.name,[]]));
 const rest=new Map(bones.map(b=>[b.name,b.position.clone()])),v=new THREE.Vector3();
 const footIndices=[];const skin=avatar.geometry.attributes.skinIndex;
 const feet=new Set(['left_foot','right_foot','left_toe','right_toe'].map(name=>bones.indexOf(avatar.skeleton.getBoneByName(name))));
 for(let i=0;i<skin.count;i++)if([skin.getX(i),skin.getY(i),skin.getZ(i),skin.getW(i)].some(index=>feet.has(index)))footIndices.push(i);
 const count=Math.ceil(BACKFLIP_DURATION*120);
 for(let frame=0;frame<=count;frame++){
  const t=frame/count*BACKFLIP_DURATION,p=sampleBackflip(t);times.push(t);
  for(const b of bones){b.position.copy(rest.get(b.name));b.rotation.set(0,0,0);}
  avatar.skeleton.getBoneByName('pelvis').rotation.x=radians(p.pitch);
  avatar.skeleton.getBoneByName('chest').rotation.x=radians(p.chest);
  for(const [side,sign]of [['left',1],['right',-1]]){
   const set=(name,x,z=0)=>avatar.skeleton.getBoneByName(`${side}_${name}`).rotation.set(radians(x),0,radians(z));
   set('thigh',p.hip,sign*Math.min(2,p.spread));set('calf',p.knee);set('foot',p.ankle);
   set('upper_arm',p.shoulder,sign*p.spread);set('forearm',p.elbow);
  }
  // Grounded poses use the actual skinned soles, not guessed pelvis heights.
  // The air arc remains separate from limb posing and is preview-only.
  avatar.updateMatrixWorld(true);avatar.skeleton.update();let lowest=Infinity;
  for(const index of footIndices){avatar.getVertexPosition(index,v);lowest=Math.min(lowest,v.y);}
  const pelvis=avatar.skeleton.getBoneByName('pelvis');
  if(!p.airborne)pelvis.position.y-=lowest;
  else pelvis.position.y+=p.height;
  positions.push(...pelvis.position.toArray());
  for(const bone of bones)rotations.get(bone.name).push(...bone.quaternion.toArray());
 }
 // Anchor the airborne pelvis arc to the actual posed takeoff/landing heights,
 // avoiding a vertical pop when switching between sole contact and flight.
 const launchY=positions[Math.round(TAKEOFF/BACKFLIP_DURATION*count)*3+1];
 const landingY=positions[Math.round(TOUCHDOWN/BACKFLIP_DURATION*count)*3+1];
 for(let i=0;i<times.length;i++){const p=sampleBackflip(times[i]);if(p.airborne)positions[i*3+1]=THREE.MathUtils.lerp(launchY,landingY,p.u)+p.height;}
 for(const bone of bones){bone.position.copy(rest.get(bone.name));bone.rotation.set(0,0,0);}
 avatar.updateMatrixWorld(true);avatar.skeleton.update();
 const tracks=[new THREE.VectorKeyframeTrack('pelvis.position',times,positions)];
 for(const [name,values]of rotations)tracks.push(new THREE.QuaternionKeyframeTrack(`${name}.quaternion`,times,values));
 return new THREE.AnimationClip('Backflip review only',BACKFLIP_DURATION,tracks);
}
