import * as THREE from 'three';
import { FOOT_PROFILE } from '../avatar.js';

export const RUN_STRIDE = 1.7;
export const RUN_DURATION = .58;

// Authored contact, compression, toe-off, recovery and passing poses. This
// curve is in avatar meters, not borrowed from a differently proportioned rig.
// Each entry is [cycle phase, value, tangent per cycle].
// Shorter support time permits a taller, more extended leg pose without
// moving the planted ankle faster than the unchanged root travel.
const CONTACT_END = .30;
const CONTACT_FORWARD = .245;
const swingForward = [[CONTACT_END,-.265,-RUN_STRIDE],[.46,-.30,.7],[.63,-.05,2.4],[.82,.23,.8],[.92,.30,-.1],[1,CONTACT_FORWARD,-RUN_STRIDE]];
const lift = [[0,0,0],[CONTACT_END,0,0],[.48,.09,.8],[.64,.12,0],[.80,.08,-.4],[1,0,0]];
const pitch = [[0,-.06,0],[.10,0,0],[.22,0,0],[CONTACT_END,.14,1],[.48,.25,0],[.67,.04,-.7],[.85,-.10,0],[1,-.06,0]];
const compression = [[0,-.055,-.10],[.125,-.060,0],[.25,-.040,.18],[.375,-.025,0],[.5,-.055,-.10]];
// Open elbows and let the arms sweep behind the hips instead of holding
// forearms horizontally in front of the chest.
const armSwing = [[0,.48,-.4],[.18,.24,-1.7],[.4,-.24,-.8],[.56,-.30,.5],[.8,.22,1.6],[1,.48,-.4]];
const elbow = [[0,-.38,-.1],[.25,-.46,0],[.5,-.28,.2],[.75,-.32,-.2],[1,-.38,-.1]];
const wrap = value => ((value % 1) + 1) % 1;

function curve(keys, phase) {
  let index = 0;
  while (index < keys.length - 2 && phase > keys[index + 1][0]) index++;
  const [a, va, ma] = keys[index], [b, vb, mb] = keys[index + 1];
  const span = b - a, t = THREE.MathUtils.clamp((phase - a) / span, 0, 1);
  return (2*t*t*t-3*t*t+1)*va + (t*t*t-2*t*t+t)*span*ma
    + (-2*t*t*t+3*t*t)*vb + (t*t*t-t*t)*span*mb;
}
export function footPose(phase) {
  const p = wrap(phase);
  return {
    forward: p <= CONTACT_END ? CONTACT_FORWARD - RUN_STRIDE * p : curve(swingForward, p),
    lift: Math.max(0, curve(lift, p)),
    pitch: curve(pitch, p),
    contact: p <= CONTACT_END,
  };
}
function ankleSupport(angle) {
  return (FOOT_PROFILE.ankleHeight - FOOT_PROFILE.centerHeight) * Math.cos(angle)
    + FOOT_PROFILE.forwardOffset * Math.sin(angle)
    + Math.hypot(FOOT_PROFILE.radiusY * Math.cos(angle), FOOT_PROFILE.radiusZ * Math.sin(angle));
}

// Bake two-bone leg authoring into ordinary quaternion keyframe tracks. The
// runtime plays a clip through AnimationMixer; it does not solve a new gait.
export function createRunClip(avatar) {
  const bones = new Map(avatar.skeleton.bones.map(bone => [bone.name, bone]));
  const times = [], rotations = new Map(avatar.skeleton.bones.map(b => [b.name, []]));
  const pelvisHeights = [];
  const quaternion = new THREE.Quaternion(), euler = new THREE.Euler();
  function rotation(name, x=0, y=0, z=0) {
    quaternion.setFromEuler(euler.set(x,y,z));
    rotations.get(name).push(...quaternion.toArray());
  }
  const pelvis = bones.get('pelvis');
  const legs = ['left', 'right'].map(side => {
    const hip=bones.get(`${side}_thigh`), knee=bones.get(`${side}_calf`), foot=bones.get(`${side}_foot`);
    return { side, upper:knee.position.length(), lower:foot.position.length(),
      upperRest:Math.atan2(knee.position.z,-knee.position.y),
      lowerRest:Math.atan2(foot.position.z,-foot.position.y), hipHeight:pelvis.position.y+hip.position.y };
  });
  const authored = new Set(['pelvis','spine','chest','neck','head']);
  for (const side of ['left','right']) for (const part of ['thigh','calf','foot','upper_arm','forearm','hand']) authored.add(`${side}_${part}`);
  for (let frame=0; frame<=120; frame++) {
    const phase=frame/120;
    const bob=curve(compression,(phase % .5));
    times.push(phase*RUN_DURATION); pelvisHeights.push(pelvis.position.y+bob);
    rotation('pelvis'); rotation('spine',.045);
    const torsoTwist=.035*Math.cos(phase*Math.PI*2);
    rotation('chest',0,torsoTwist); rotation('neck',-.02); rotation('head');
    legs.forEach((leg,index) => {
      const p=wrap(phase+index*.5), pose=footPose(p);
      const down=ankleSupport(pose.pitch)+pose.lift-(leg.hipHeight+bob);
      const distance=THREE.MathUtils.clamp(Math.hypot(down,pose.forward),.05,leg.upper+leg.lower-.001);
      const heading=Math.atan2(pose.forward,-down);
      const thigh=heading+Math.acos(THREE.MathUtils.clamp((leg.upper**2+distance**2-leg.lower**2)/(2*leg.upper*distance),-1,1));
      const knee=Math.acos(THREE.MathUtils.clamp((distance**2-leg.upper**2-leg.lower**2)/(2*leg.upper*leg.lower),-1,1));
      const hipAngle=leg.upperRest-thigh, kneeAngle=leg.lowerRest-leg.upperRest+knee;
      rotation(`${leg.side}_thigh`,hipAngle);
      rotation(`${leg.side}_calf`,kneeAngle);
      rotation(`${leg.side}_foot`,pose.pitch-hipAngle-kneeAngle);
      rotation(`${leg.side}_upper_arm`,curve(armSwing,p));
      rotation(`${leg.side}_forearm`,curve(elbow,p));
      rotation(`${leg.side}_hand`,-.04);
    });
    for (const bone of avatar.skeleton.bones) if (!authored.has(bone.name)) rotation(bone.name);
  }
  const tracks=[new THREE.NumberKeyframeTrack('pelvis.position[y]',times,pelvisHeights)];
  for (const [name,values] of rotations) tracks.push(new THREE.QuaternionKeyframeTrack(`${name}.quaternion`,times,values));
  return new THREE.AnimationClip('Natural run',RUN_DURATION,tracks);
}
