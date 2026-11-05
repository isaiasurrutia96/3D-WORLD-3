import * as THREE from 'three';
import {FOOT_PROFILE} from '../avatar.js';
import {BACKFLIP_DURATION,TAKEOFF,TOUCHDOWN,sampleBackflip} from './backflip-motion.js';
export {BACKFLIP_DURATION,TAKEOFF,TOUCHDOWN,PHASES,KEYS,sampleBackflip} from './backflip-motion.js';

export function createBackflipClip(avatar,{includeFlight=true}={}){
 const bones=avatar.skeleton.bones,rest=bones.map(b=>({position:b.position.clone(),quaternion:b.quaternion.clone()}));
 const times=[],positions=[],rotations=new Map(bones.map(b=>[b.name,[]])),v=new THREE.Vector3(),pelvis=avatar.skeleton.getBoneByName('pelvis');
 const footBones=new Set(bones.flatMap((b,i)=>/_foot$|_toe$/.test(b.name)?[i]:[])),footVertices=[],skin=avatar.geometry.attributes.skinIndex,weights=avatar.geometry.attributes.skinWeight;
 for(let i=0;i<skin.count;i++)if([0,1,2,3].some(k=>weights.array[i*4+k]>.001&&footBones.has(skin.array[i*4+k])))footVertices.push(i);
 const steps=Math.ceil(BACKFLIP_DURATION*120);
 // Include both event boundaries exactly, rather than approximating contact
 // from the nearest sample on the controller's fixed update grid.
 const timeline=[...new Set([...Array.from({length:steps+1},(_,i)=>i/steps*BACKFLIP_DURATION),TAKEOFF,TOUCHDOWN])].sort((a,b)=>a-b);
 let launch,landing;
 for(const t of timeline){
  const p=sampleBackflip(t);times.push(t);
  bones.forEach((b,i)=>{b.position.copy(rest[i].position);b.quaternion.copy(rest[i].quaternion);});
  pelvis.rotation.x=THREE.MathUtils.degToRad(p.pitch);avatar.skeleton.getBoneByName('chest').rotation.x=THREE.MathUtils.degToRad(p.chest);
  for(const [side,sign]of [['left',1],['right',-1]]){
   const set=(part,x,z=0)=>avatar.skeleton.getBoneByName(`${side}_${part}`).rotation.set(THREE.MathUtils.degToRad(x),0,THREE.MathUtils.degToRad(z));
   set('thigh',p.hip);set('calf',p.knee);set('foot',p.ankle);set('upper_arm',p.shoulder,sign*p.spread);set('forearm',p.elbow);
  }
  avatar.updateMatrixWorld(true);avatar.skeleton.update();let low=Infinity,contactZ=0,contactCount=0;
  for(const i of footVertices){avatar.getVertexPosition(i,v);low=Math.min(low,v.y);}
  for(const i of footVertices){avatar.getVertexPosition(i,v);if(v.y<low+.004){contactZ+=v.z;contactCount++;}}
  // Hold the soles during loading, then roll contact toward the forefoot.
  // Pelvis translation comes from the planted feet, not an arbitrary bob.
  const toeRoll=t<=TAKEOFF?THREE.MathUtils.smoothstep(t,.26,TAKEOFF):0;
  const anchorZ=FOOT_PROFILE.forwardOffset+.22*toeRoll;
  pelvis.position.y-=low;pelvis.position.z+=anchorZ-contactZ/Math.max(1,contactCount);
  if(t===TAKEOFF)launch=pelvis.position.clone();if(t===TOUCHDOWN)landing=pelvis.position.clone();
  positions.push(...pelvis.position.toArray());for(const b of bones)rotations.get(b.name).push(...b.quaternion.toArray());
 }
 for(let i=0;i<times.length;i++){
  const p=sampleBackflip(times[i]);if(!p.airborne)continue;
  positions[i*3+1]=THREE.MathUtils.lerp(launch.y,landing.y,p.u)+(includeFlight?p.height:0);
  positions[i*3+2]=THREE.MathUtils.lerp(launch.z,landing.z,p.u);
 }
 bones.forEach((b,i)=>{b.position.copy(rest[i].position);b.quaternion.copy(rest[i].quaternion);});avatar.updateMatrixWorld(true);avatar.skeleton.update();
 const tracks=[new THREE.VectorKeyframeTrack('pelvis.position',times,positions)];for(const [name,values]of rotations)tracks.push(new THREE.QuaternionKeyframeTrack(`${name}.quaternion`,times,values));
 return new THREE.AnimationClip(includeFlight?'Standing backflip preview':'Standing backflip',BACKFLIP_DURATION,tracks);
}
