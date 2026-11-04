import * as THREE from 'three';
import { bakeGaitClip, sampleCurve } from './run-clip.js';

export const SPRINT_STRIDE=2.4;
export const SPRINT_DURATION=.46;
const CONTACT_END=.24,CONTACT_FORWARD=.28;
const forward=[[CONTACT_END,-.296,-SPRINT_STRIDE],[.38,-.37,.4],[.55,-.15,3],[.74,.24,2.5],[.88,.34,0],[1,CONTACT_FORWARD,-SPRINT_STRIDE]];
const lift=[[0,0,0],[CONTACT_END,0,0],[.40,.21,1.2],[.54,.33,0],[.8,.22,-.8],[.92,.10,-1.5],[1,0,0]];
const pitch=[[0,-.08,0],[.12,0,0],[CONTACT_END,.30,1],[.40,.55,0],[.60,.10,-1],[.82,-.20,0],[1,-.08,0]];
const compression=[[0,-.07,-.2],[.10,-.085,0],[.24,-.02,.5],[.35,.015,0],[.5,-.07,-.2]];
const armSwing=[[0,.65,-.4],[.2,.25,-2.5],[.45,-.68,0],[.60,-.62,1],[.83,.35,2],[1,.65,-.4]];
const elbow=[[0,-.95,-.3],[.25,-1.10,-.3],[.5,-1.25,0],[.75,-1.05,.5],[1,-.95,-.3]];
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
// fires once per Shift+E entry, rather than repeating on every sprint cycle.
export function createSprintLaunchClip(){
  const times=[0,.06,.18,.32],values=[];
  for(const angle of [0,.13,.07,0])values.push(...new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),angle).toArray());
  return new THREE.AnimationClip('Sprint launch',.32,[new THREE.QuaternionKeyframeTrack('spine.quaternion',times,values)],THREE.AdditiveAnimationBlendMode);
}
