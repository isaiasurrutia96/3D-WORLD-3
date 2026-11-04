import * as THREE from 'three';
import { bakeGaitClip, sampleCurve } from './run-clip.js';

export const SPRINT_STRIDE=2.7;
export const SPRINT_DURATION=.46;
const CONTACT_END=.24,CONTACT_FORWARD=.28;
const forward=[[CONTACT_END,CONTACT_FORWARD-SPRINT_STRIDE*CONTACT_END,-SPRINT_STRIDE],[.38,-.45,.4],[.55,-.18,3.3],[.74,.32,2.0],[.88,.34,0],[1,CONTACT_FORWARD,-SPRINT_STRIDE]];
const lift=[[0,0,0],[CONTACT_END,0,0],[.40,.25,1.2],[.54,.40,0],[.74,.40,0],[.84,.25,-2],[.92,.10,-1.5],[1,0,0]];
const pitch=[[0,-.08,0],[.12,0,0],[CONTACT_END,.42,1],[.40,.55,0],[.60,.10,-1],[.82,-.20,0],[1,-.08,0]];
const compression=[[0,-.07,-.2],[.10,-.085,0],[.24,-.006,.5],[.35,.015,0],[.5,-.07,-.2]];
// Forward hand drive peaks with the opposite knee, at rear-leg toe-off.
const armSwing=[[0,.20,-5],[.23,-2.20,0],[.45,-.40,6],[.73,.65,0],[.90,.50,-2],[1,.20,-5]];
const elbow=[[0,-1.0,-.3],[.23,-1.20,0],[.45,-1.10,.4],[.73,-.95,0],[1,-1.0,-.3]];
export function sprintFootPose(phase){
  const p=((phase%1)+1)%1;
  return {forward:p<=CONTACT_END?CONTACT_FORWARD-SPRINT_STRIDE*p:sampleCurve(forward,p),
    lift:Math.max(0,sampleCurve(lift,p)),pitch:sampleCurve(pitch,p),contact:p<=CONTACT_END};
}
export function createSprintClip(avatar){
  return bakeGaitClip(avatar,{name:'Sprint',duration:SPRINT_DURATION,compression,
    lean:.28,neck:-.08,footPose:sprintFootPose,armSwing,elbow});
}
// Additive launch drive sits over the first planted-foot/toe-off stride. It
// fires once per Shift + movement entry, rather than repeating on every sprint cycle.
export function createSprintLaunchClip(){
  const times=[0,.06,.18,.32],values=[];
  for(const angle of [0,.13,.07,0])values.push(...new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),angle).toArray());
  return new THREE.AnimationClip('Sprint launch',.32,[new THREE.QuaternionKeyframeTrack('spine.quaternion',times,values)],THREE.AdditiveAnimationBlendMode);
}
