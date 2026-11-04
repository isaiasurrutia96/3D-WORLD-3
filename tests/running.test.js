import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createAvatar } from '../src/avatar.js';
import { createRunner, stepRunner, RUN_SPEED, STRIDE_LENGTH } from '../src/running-controller.js';
import { createRunningAnimator } from '../src/animation/running.js';
import { sampleRun } from '../src/animation/legacy-running.js';

function advance(state, seconds, input, dt = 1 / 120) {
  for (let i = 0; i < Math.round(seconds / dt); i++) stepRunner(state, input, dt);
}
test('running accelerates, stays level, and normalizes diagonal speed', () => {
  const forward = createRunner(), diagonal = createRunner();
  advance(forward, 0.1, { x: 0, z: 1 });assert.ok(forward.speed > 0 && forward.speed < RUN_SPEED);
  advance(forward, 1, { x: 0, z: 1 });advance(diagonal, 1.1, { x: 1, z: 1 });
  assert.equal(forward.speed, RUN_SPEED);assert.equal(diagonal.speed, RUN_SPEED);
  assert.ok(Math.abs(Math.hypot(diagonal.x, diagonal.z) - forward.z) < 1e-8);
  assert.equal('y' in forward, false);
});
test('no walk or jump action is exposed; release stops without drifting', () => {
  const a = createRunner(), b = createRunner();
  advance(a, 1, { x: 0, z: 1, walk: true, jump: true });advance(b, 1, { x: 0, z: 1 });assert.deepEqual(a, b);
  advance(a, 1, { x: 0, z: 0 });assert.equal(a.speed, 0);
  const position = [a.x, a.z];advance(a, 1, { x: 0, z: 0 });assert.deepEqual([a.x, a.z], position);
});
test('source study loops and keeps opposite left/right contact timing', () => {
  assert.deepEqual(sampleRun(0), sampleRun(1));
  assert.notDeepEqual(sampleRun(0).legs[0], sampleRun(0).legs[1]);
  const a = createRunner(), b = createRunner();advance(a, 1, { x: 0, z: 1 }, 1 / 60);advance(b, 1, { x: 0, z: 1 });
  assert.ok(Math.abs(a.z - b.z) < 0.03);
});
test('adapted running tucks elbows near ribs, softens shoes, and stays level when turning', () => {
  const avatar = createAvatar(), runner = createRunner(), animation = createRunningAnimator(avatar);
  const bones = new Map(avatar.skeleton.bones.map(bone => [bone.name, bone]));
  const point = new THREE.Vector3();
  let maximumKnee = 0;
  for (let frame = 0; frame < 180; frame++) {
    stepRunner(runner, { x: frame < 90 ? 0 : 1, z: 1 }, 1 / 60);
    avatar.position.set(runner.x, 0, runner.z); avatar.rotation.y = runner.yaw;
    animation.update(runner, 1 / 60);
    avatar.updateMatrixWorld(true); avatar.skeleton.update();
    for (let index = 0; index < avatar.geometry.attributes.position.count; index++) {
      avatar.getVertexPosition(index, point); assert.ok(point.y > -1e-5, `floor at frame ${frame}: ${point.y}`);
    }
    const inverseChest = bones.get('chest').getWorldQuaternion(new THREE.Quaternion()).invert();
    const inverseRoot = avatar.getWorldQuaternion(new THREE.Quaternion()).invert();
    for (const side of ['left', 'right']) {
      const shoulder = bones.get(`${side}_upper_arm`).getWorldPosition(new THREE.Vector3());
      const elbow = bones.get(`${side}_forearm`).getWorldPosition(new THREE.Vector3());
      const arm = elbow.sub(shoulder).normalize().applyQuaternion(inverseChest);
      assert.ok(Math.abs(arm.x) < .26); assert.ok(arm.y < -.65);
      const foot = bones.get(`${side}_foot`);
      const toe = new THREE.Vector3(0, 0, 1).applyQuaternion(foot.getWorldQuaternion(new THREE.Quaternion())).applyQuaternion(inverseRoot);
      assert.ok(Math.abs(toe.x) < (frame > 30 ? .01 : .15)); assert.ok(toe.z > .6);
      maximumKnee = Math.max(maximumKnee, Math.abs(bones.get(`${side}_calf`).rotation.x));
    }
    assert.equal(avatar.position.y, 0);
  }
  assert.ok(maximumKnee > 1);
});
test('after stopping the exact neutral pose is restored and stays unchanged', () => {
  const avatar = createAvatar(), runner = createRunner(), animation = createRunningAnimator(avatar);
  const snapshot = () => avatar.skeleton.bones.map(bone => [...bone.position.toArray(), ...bone.quaternion.toArray()]);
  const neutral = snapshot();
  for (let frame = 0; frame < 60; frame++) {stepRunner(runner, { x: 0, z: 1 }, 1 / 60);avatar.position.z = runner.z;animation.update(runner, 1 / 60);}
  for (let frame = 0; frame < 120; frame++) {stepRunner(runner, { x: 0, z: 0 }, 1 / 60);avatar.position.z = runner.z;animation.update(runner, 1 / 60);}
  assert.deepEqual(snapshot(), neutral);
  for (let frame = 0; frame < 120; frame++) animation.update(runner, 1 / 60);
  assert.deepEqual(snapshot(), neutral);
});
