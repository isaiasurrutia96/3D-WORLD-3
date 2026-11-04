import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createAvatar } from '../src/avatar.js';
import { createRunner, stepRunner, RUN_SPEED, STRIDE_LENGTH } from '../src/running-controller.js';
import { createRunningAnimator, sampleRun } from '../src/animation/running.js';

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
test('run bends the knees, restrains arms and keeps vertices above the floor', () => {
  const avatar = createAvatar(), runner = createRunner(), animation = createRunningAnimator(avatar);
  const bones = new Map(avatar.skeleton.bones.map(bone => [bone.name, bone]));
  const point = new THREE.Vector3();let maximumKnee = 0, contacts = 0;
  const previous = [null, null];
  for (let frame = 0; frame < 120; frame++) {
    stepRunner(runner, { x: 0, z: 1 }, 1 / 60);avatar.position.set(runner.x, 0, runner.z);
    animation.update(runner, 1 / 60);avatar.updateMatrixWorld(true);avatar.skeleton.update();
    for (let index = 0; index < avatar.geometry.attributes.position.count; index++) {
      avatar.getVertexPosition(index, point);assert.ok(point.y > -1e-5);
    }
    for (const [index, side] of ['left', 'right'].entries()) {
      const arm = bones.get(`${side}_upper_arm`), knee = bones.get(`${side}_calf`), foot = bones.get(`${side}_foot`);
      assert.ok(Math.abs(arm.rotation.x) < 0.53);maximumKnee = Math.max(maximumKnee, knee.rotation.x);
      const contactFrame = index === 0 ? 45 : 9;
      const phase = ((9 / 72 + runner.distance / STRIDE_LENGTH - contactFrame / 72) % 1 + 1) % 1;
      const position = foot.getWorldPosition(new THREE.Vector3());
      const planted = frame > 30 && phase > 0.02 && phase < 0.26;
      if (planted && previous[index]?.planted) {
        assert.ok(Math.abs(position.z - previous[index].z) < 0.01);
        assert.ok(Math.abs(position.y - 0.15) < 0.015);contacts++;
      }
      previous[index] = { z: position.z, planted };
    }
  }
  assert.ok(maximumKnee > 0.7);assert.ok(contacts > 10);
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
