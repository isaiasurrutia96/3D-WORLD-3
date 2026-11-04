import { bakeGaitClip, sampleCurve } from './run-clip.js';

export const SPRINT_STRIDE=2.7;
export const SPRINT_DURATION=.46;
const CONTACT_END=.215,CONTACT_FORWARD=.20;
const forward=[[CONTACT_END,CONTACT_FORWARD-SPRINT_STRIDE*CONTACT_END,-SPRINT_STRIDE],[.36,-.40,.4],[.55,-.18,2.6],[.72,.12,1.6],[.86,.20,.5],[.94,.23,0],[1,CONTACT_FORWARD,-SPRINT_STRIDE]];
const lift=[[0,0,0],[CONTACT_END,0,0],[.40,.17,.9],[.54,.30,0],[.74,.28,-.3],[.84,.14,-1.3],[.92,.06,-.8],[1,0,0]];
const pitch=[[0,-.08,0],[.12,0,0],[CONTACT_END,.42,1],[.40,.55,0],[.60,.10,-1],[.82,-.20,0],[1,-.08,0]];
const compression=[[0,-.07,-.2],[.10,-.085,0],[CONTACT_END,-.010,.5],[.35,.015,0],[.5,-.07,-.2]];
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
  return bakeGaitClip(avatar,{name:'Sprint',duration:SPRINT_DURATION,compression,
    wholeLean:.20,lean:0,neck:0,footPose:sprintFootPose,armSwingAt:sprintArmSwing,elbow});
}
