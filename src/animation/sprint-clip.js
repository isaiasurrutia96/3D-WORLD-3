import { bakeGaitClip, sampleCurve } from './run-clip.js';

export const SPRINT_STRIDE=6.0;
export const SPRINT_DURATION=.46;
export const SPRINT_CONTACT_END=.12;
const CONTACT_END=SPRINT_CONTACT_END,CONTACT_FORWARD=.26;
// A full left/right cycle now travels twice as far at half the old cadence.
// Short ground support and a longer flight/extension keep the feet reachable
// on this short-legged rig while preserving the existing travel speed.
const forward=[[CONTACT_END,CONTACT_FORWARD-SPRINT_STRIDE*CONTACT_END,-SPRINT_STRIDE],[.17,-.57,0],[.30,-.50,.8],[.48,-.25,2.5],[.68,.22,2],[.84,.34,0],[.95,.32,-.8],[1,CONTACT_FORWARD,-SPRINT_STRIDE]];
const lift=[[0,0,0],[CONTACT_END,0,0],[.17,.14,2],[.34,.30,0],[.54,.30,0],[.74,.23,-.3],[.88,.10,-.8],[1,0,0]];
const pitch=[[0,-.08,0],[.06,0,0],[CONTACT_END,.64,3],[.20,.65,0],[.45,.16,-1],[.72,-.12,0],[1,-.08,0]];
const compression=[[0,-.07,-.2],[.06,-.085,0],[CONTACT_END,-.006,.6],[.28,.035,0],[.5,-.07,-.2]];
// One smooth arm cycle per leg cycle, with forward drive at the opposite
// knee's peak. Reduce the old oversized/asymmetric reach that read as flailing.
export const SPRINT_DRIVE_PHASE=.24;
export function sprintArmSwing(phase){
  return -.15-.80*Math.cos(2*Math.PI*(phase-SPRINT_DRIVE_PHASE));
}
const elbow=[[0,-1.0,-.5],[.24,-1.18,0],[.49,-1.0,.5],[.74,-.85,0],[1,-1.0,-.5]];
export function sprintFootPose(phase){
  const p=((phase%1)+1)%1;
  return {forward:p<=CONTACT_END?CONTACT_FORWARD-SPRINT_STRIDE*p:sampleCurve(forward,p),
    lift:Math.max(0,sampleCurve(lift,p)),pitch:sampleCurve(pitch,p),contact:p<=CONTACT_END};
}
export function createSprintClip(avatar){
  return bakeGaitClip(avatar,{name:'Sprint',duration:SPRINT_DURATION,samples:480,compression,
    wholeLean:.20,lean:0,neck:0,footPose:sprintFootPose,armSwingAt:sprintArmSwing,elbow});
}
