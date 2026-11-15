/**
 * A still preview of the clay figure reshaped to golden-ratio proportions,
 * for comparing with the figure as it is. It is built from the same rig and
 * only moved and stretched; the playable figure is not touched.
 *
 * Height stays 1.82 m. The landmarks, from the floor:
 *   knees   0.43 m  (floor : knee-to-navel = 1 : φ)
 *   navel   1.125 m (height ÷ φ)
 *   elbows  ≈ navel height, the classical canon
 *   shoulders 1.39 m, and a smaller head so the crown stays at 1.82 m
 */

import { Group, Mesh } from 'three';
import { createCharacterRig } from './PlayerModel.ts';

export function createGoldenFigure(): Group {
  const rig = createCharacterRig({ plain: true });

  // The torso stretched upward so the shoulders sit at 1.39 m (they hang
  // from the body's middle at 0.92 m) and the belly, the navel, at 1.125 m.
  const stretch = 0.47 / 0.345;
  const torsoShape = rig.torso.children.find((c) => c instanceof Mesh) as Mesh;
  torsoShape.scale.y = stretch;
  for (const shoulder of [rig.shoulderLeft, rig.shoulderRight]) shoulder.position.y = 0.47;

  // The neck and a smaller head, keeping the crown at 1.82 m.
  const neck = rig.torso.children.find((c) => c instanceof Mesh && c !== torsoShape && Math.abs(c.position.y - 0.5) < 0.01);
  if (neck) neck.position.y = 0.64;
  rig.head.scale.setScalar(0.77);
  rig.head.position.y = 0.73;

  // Longer thighs and shorter shins, so the knees come to 0.43 m.
  for (const [hip, knee, ankle] of [
    [rig.hipLeft, rig.kneeLeft, rig.ankleLeft],
    [rig.hipRight, rig.kneeRight, rig.ankleRight],
  ]) {
    const thigh = hip.children.find((c) => c instanceof Mesh) as Mesh;
    thigh.scale.y = 0.47 / 0.42;
    thigh.position.y = -0.2 * (0.47 / 0.42);
    knee.position.y = -0.47;
    const shin = knee.children.find((c) => c instanceof Mesh) as Mesh;
    shin.scale.y = 0.36 / 0.38;
    shin.position.y = -0.17 * (0.36 / 0.38);
    ankle.position.y = -0.36;
  }
  // Lifted the little the reshaping lowered his soles, so he stands on the ground.
  rig.body.position.y += 0.016;
  rig.root.name = 'golden figure';
  return rig.root;
}
