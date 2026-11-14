/**
 * One race circuit, floating in the sky beside the block island and joined
 * to it by the island's bridge.
 *
 * It is the racing game's own Original Circuit — its "floating winding
 * circuit" — made by that game's own function, not copied. All that is done
 * here is to stand it where the island's bridge ends: the whole circuit is
 * moved so that the west end of its entry ramp meets the bridge, at the same
 * height as the lawn.
 *
 * The road, its edges and the ramp are made solid, so the character can walk
 * from the island across the bridge and onto the circuit. The rails stay
 * as the racing game draws them, and are not solid: they are thin, and a
 * walker who steps off the circuit falls and is put back.
 */

import { Group, InstancedMesh, Mesh, Scene, Vector3 } from 'three';
import type { CollisionWorld } from '../physics/CollisionWorld.ts';
import { access, createTrack, ENTRY, trackSamples } from '../../apps/letsgo-racing/src/track.js';

export interface SkyCircuit {
  /** Everything drawn. */
  root: Group;
  /** The road, its edges and the entry ramp: what a character stands on. */
  solid: Group;
  /** How far the circuit was moved from where the racing game puts it. */
  offset: Vector3;
  /** A point in the middle of the road, near the entry, for tests. */
  roadPoint: { x: number; z: number };
  triangleCount: number;
}

/**
 * Builds the circuit with its entry ramp's west end at `anchor` (the far end
 * of the island's bridge), level with the island's lawn.
 */
export function buildSkyCircuit(
  scene: Scene,
  collision: CollisionWorld,
  anchor: { x: number; z: number },
): SkyCircuit {
  // The racing game's ramp runs east from access.minX along z = ENTRY.z.
  const offset = new Vector3(anchor.x - access.minX, 0, anchor.z - ENTRY.z);

  const root = new Group();
  root.name = 'sky-circuit';
  root.position.copy(offset);
  const solid = new Group();
  solid.name = 'sky-circuit-solid';
  solid.position.copy(offset);

  const track: Group = createTrack();
  // The racing game's meshes, sorted: the instanced rails are drawn only;
  // everything else (road, edges, underside, kerbs, ramp) is solid.
  const pieces = [...track.children];
  for (const piece of pieces) {
    piece.castShadow = false;
    if (piece instanceof InstancedMesh) {
      piece.name = 'circuit rails';
      root.add(piece);
    } else if (piece instanceof Mesh) {
      piece.name = 'circuit road';
      piece.receiveShadow = true;
      solid.add(piece);
    } else {
      root.add(piece);
    }
  }
  root.add(solid);
  scene.add(root);
  // The solid group sits inside the moved root; it is placed at the root's
  // origin so the two are not moved twice.
  solid.position.set(0, 0, 0);
  root.updateMatrixWorld(true);
  collision.addSolid(solid);

  // The middle of the road a little way along from the ramp.
  const near = trackSamples.reduce(
    (best: { d: number; p: Vector3 }, sample: { point: Vector3 }) => {
      const d = Math.hypot(sample.point.x - ENTRY.x, sample.point.z - (ENTRY.z + 30));
      return d < best.d ? { d, p: sample.point } : best;
    },
    { d: Infinity, p: new Vector3() },
  ).p;

  let triangleCount = 0;
  root.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    const g = object.geometry;
    const tris = g.index ? g.index.count / 3 : (g.attributes.position?.count ?? 0) / 3;
    triangleCount += tris * (object instanceof InstancedMesh ? object.count : 1);
  });

  return {
    root,
    solid,
    offset,
    roadPoint: { x: near.x + offset.x, z: near.z + offset.z },
    triangleCount: Math.round(triangleCount),
  };
}
