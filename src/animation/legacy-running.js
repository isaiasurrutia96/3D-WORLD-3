import * as THREE from 'three';
import study from './run-study.json' with { type: 'json' };
import { RUN_SPEED, STRIDE_LENGTH } from '../running-controller.js';
import { FOOT_PROFILE } from '../avatar.js';

const clamp = THREE.MathUtils.clamp;
const smooth = (value) => THREE.MathUtils.smoothstep(value, 0, 1);
const unit = (value) => ((value % 1) + 1) % 1;

export function sampleRun(phase) {
  const frame = unit(phase) * study.frames.length;
  const a = study.frames[Math.floor(frame)], b = study.frames[(Math.floor(frame) + 1) % study.frames.length];
  const blend = (x, y) => THREE.MathUtils.lerp(x, y, frame % 1);
  return {
    root: blend(a.root, b.root), twist: blend(a.twist, b.twist),
    legs: a.legs.map((leg, side) => ({
      forward: blend(leg.forward, b.legs[side].forward),
      height: blend(leg.height, b.legs[side].height),
      pitch: blend(leg.pitch, b.legs[side].pitch),
    })),
    arms: a.arms.map((arm, side) => ({
      swing: blend(arm.swing, b.arms[side].swing), bend: blend(arm.bend, b.arms[side].bend),
    })),
  };
}

export function createRunningAnimator(avatar) {
  const bones = new Map(avatar.skeleton.bones.map(bone => [bone.name, bone]));
  const rest = avatar.skeleton.bones.map(bone => ({ bone, position: bone.position.clone(), quaternion: bone.quaternion.clone() }));
  const pelvis = bones.get('pelvis'), spine = bones.get('spine'), chest = bones.get('chest');
  const hips = ['left', 'right'].map((side, index) => {
    const hip = bones.get(`${side}_thigh`), knee = bones.get(`${side}_calf`), foot = bones.get(`${side}_foot`);
    return {
      hip, knee, foot, side: index, contact: study.contactFrames[index] / 72,
      upperLength: knee.position.length(), lowerLength: foot.position.length(),
      upperRestAngle: Math.atan2(knee.position.z, -knee.position.y),
      lowerRestAngle: Math.atan2(foot.position.z, -foot.position.y),
      hipHeight: pelvis.position.y + hip.position.y,
      planted: false, anchor: new THREE.Vector3(), releaseZ: 0, lastForward: 0, lastLift: 0, lastPitch: 0,
    };
  });
  const arms = ['left', 'right'].map(side => ({
    shoulder: bones.get(`${side}_upper_arm`), elbow: bones.get(`${side}_forearm`), hand: bones.get(`${side}_hand`),
  }));
  let weight = 0;

  function reset() {
    for (const item of rest) {
      item.bone.position.copy(item.position);
      item.bone.quaternion.copy(item.quaternion);
    }
    for (const leg of hips) { leg.planted = false; leg.releaseZ = leg.lastForward = leg.lastLift = leg.lastPitch = 0; }
    weight = 0;
  }

  function solveLeg(leg, height, forward, pitch, hipHeight) {
    const down = height - hipHeight;
    const upper = leg.upperLength, lower = leg.lowerLength;
    const distance = clamp(Math.hypot(down, forward), 0.05, upper + lower - 0.001);
    const heading = Math.atan2(forward, -down);
    const thighAngle = heading + Math.acos(clamp((upper * upper + distance * distance - lower * lower) / (2 * upper * distance), -1, 1));
    const kneeBend = Math.acos(clamp((distance * distance - upper * upper - lower * lower) / (2 * upper * lower), -1, 1));
    leg.hip.rotation.x = leg.upperRestAngle - thighAngle;
    leg.knee.rotation.x = leg.lowerRestAngle - leg.upperRestAngle + kneeBend;
    leg.foot.rotation.x = pitch - leg.hip.rotation.x - leg.knee.rotation.x;
  }

  return {
    reset,
    update(state, dt) {
      weight = THREE.MathUtils.damp(weight, Math.min(1, state.speed / RUN_SPEED), 18, dt);
      if (state.speed === 0 && weight < 0.001) { reset(); return false; }
      const phase = unit(9 / 72 + state.distance / STRIDE_LENGTH);
      const pose = sampleRun(phase);
      const bob = (pose.root * 0.035 - 0.05) * weight;
      pelvis.position.y = rest[0].position.y + bob;
      // Lean and twist affect the upper body only, leaving grounded leg IK stable.
      spine.rotation.x = 0.10 * weight;
      chest.rotation.y = clamp(pose.twist * 0.18, -0.1, 0.1) * weight;
      arms.forEach((arm, side) => {
        arm.shoulder.rotation.x = clamp(-pose.arms[side].swing * 0.65, -0.52, 0.52) * weight;
        arm.elbow.rotation.x = -clamp(pose.arms[side].bend, 0.55, 1.0) * weight;
        arm.hand.rotation.x = -0.05 * weight;
      });
      const sin = Math.sin(avatar.rotation.y), cos = Math.cos(avatar.rotation.y);
      hips.forEach((leg, side) => {
        const localPhase = unit(phase - leg.contact);
        const contact = localPhase < 0.28 && weight > 0.05 && state.speed > 0.01;
        let forward = (pose.legs[side].forward * (leg.upperLength + leg.lowerLength) * 0.60 + 0.27) * weight;
        let lift = 0, pitch = 0;
        if (contact) {
          if (!leg.planted) {
            const step = forward;
            leg.anchor.set(avatar.position.x + sin * step, 0, avatar.position.z + cos * step);
          }
          forward = (leg.anchor.x - avatar.position.x) * sin + (leg.anchor.z - avatar.position.z) * cos;
          leg.releaseZ = forward;
        } else {
          const recovery = clamp((localPhase - 0.28) / 0.72, 0, 1);
          const envelope = 4 * recovery * (1 - recovery);
          lift = (0.10 + 0.18 * pose.legs[side].height) * envelope * weight;
          pitch = clamp(pose.legs[side].pitch * 0.15, -0.18, 0.22) * envelope * weight;
          if (recovery < 0.18) forward = THREE.MathUtils.lerp(leg.releaseZ, forward, smooth(recovery / 0.18));
        }
        leg.planted = contact;
        if (state.speed === 0) {
          forward = THREE.MathUtils.damp(leg.lastForward, 0, 18, dt);
          lift = THREE.MathUtils.damp(leg.lastLift, 0, 18, dt);
          pitch = THREE.MathUtils.damp(leg.lastPitch, 0, 18, dt);
        }
        leg.lastForward = forward; leg.lastLift = lift; leg.lastPitch = pitch;
        // Exact vertical support of the approved ellipsoidal foot at this pitch.
        const sole = (FOOT_PROFILE.ankleHeight - FOOT_PROFILE.centerHeight) * Math.cos(pitch)
          + FOOT_PROFILE.forwardOffset * Math.sin(pitch)
          + Math.hypot(FOOT_PROFILE.radiusY * Math.cos(pitch), FOOT_PROFILE.radiusZ * Math.sin(pitch));
        solveLeg(leg, sole + lift, forward, pitch, leg.hipHeight + bob);

      });
      return true;
    },
  };
}
