/**
 * A look at "option 2": three block sizes that nest exactly, each half the
 * last, all on one grid.
 *
 * - Terrain: 43 cm blocks.
 * - Trees, rocks, bushes: 21.5 cm blocks (eight fill one terrain block).
 * - Small things, like a cubicle: 10.75 cm blocks (sixty-four fill one).
 *
 * Every block is rounded on its own, as the owner chose, and every position
 * is a whole number of 10.75 cm steps, so all three sizes line up.
 */

import {
  BoxGeometry,
  BufferAttribute,
  Color,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Scene,
  Vector3,
} from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export const TERRAIN = 0.43;
export const OBJECT = TERRAIN / 2;
export const SMALL = TERRAIN / 4;

/** A fixed lighter-or-darker amount per block, the same every time. */
function shade(x: number, y: number, z: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return 0.92 + (s - Math.floor(s)) * 0.16;
}

const shape = (() => {
  const g = new RoundedBoxGeometry(1, 1, 1, 3, 0.1);
  const n = g.attributes.normal;
  const c = new Float32Array(n.count * 3);
  for (let i = 0; i < n.count; i += 1) {
    const nx = n.getX(i), ny = n.getY(i), nz = n.getZ(i);
    const light =
      Math.max(0, nx) * 0.86 + Math.max(0, -nx) * 0.93 + Math.max(0, ny) * 1 +
      Math.max(0, -ny) * 0.6 + Math.max(0, nz) * 0.88 + Math.max(0, -nz) * 0.8;
    const l = light / (Math.abs(nx) + Math.abs(ny) + Math.abs(nz) || 1);
    c.set([l, l, l], i * 3);
  }
  g.setAttribute('color', new BufferAttribute(c, 3));
  return g;
})();

const material = new MeshStandardMaterial({ vertexColors: true, roughness: 0.86, metalness: 0 });
material.toneMapped = false;

/** Blocks of one size: each [x, y, z, colour], in steps of that size, x/z centred. */
function blocks(root: Group, size: number, list: Array<[number, number, number, string]>, name: string): void {
  const mesh = new InstancedMesh(shape, material, list.length);
  mesh.name = name;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  const m = new Matrix4();
  list.forEach(([x, y, z, colour], i) => {
    m.makeScale(size, size, size);
    m.setPosition((x + 0.5) * size, (y + 0.5) * size, (z + 0.5) * size);
    mesh.setMatrixAt(i, m);
    mesh.setColorAt(i, new Color(colour).multiplyScalar(shade(x, y, z)));
  });
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  root.add(mesh);
}

export interface HalvingScene {
  root: Group;
  characterAt: Vector3;
  centre: Vector3;
  extent: { width: number; height: number; depth: number };
}

export function buildHalvingScene(scene: Scene): HalvingScene {
  const root = new Group();
  root.name = 'halving-scene';
  const GRASS = '#93d91e';
  const DIRT = '#da965a';

  // ---- Terrain: 8 × 8 blocks of 43 cm, grass over one layer of dirt ----
  const N = 8;
  const terrain: Array<[number, number, number, string]> = [];
  for (let x = -N / 2; x < N / 2; x += 1) {
    for (let z = -N / 2; z < N / 2; z += 1) {
      terrain.push([x, -1, z, GRASS]);
      terrain.push([x, -2, z, DIRT]);
    }
  }
  blocks(root, TERRAIN, terrain, 'terrain');
  // A solid core under the grooves so nothing shows through.
  const seal = 0.092;
  const core = new Mesh(
    new BoxGeometry((N - 2 * seal) * TERRAIN, (2 - 2 * seal) * TERRAIN, (N - 2 * seal) * TERRAIN),
    new MeshStandardMaterial({ color: new Color(DIRT).multiplyScalar(0.7), roughness: 1 }),
  );
  core.position.y = -TERRAIN;
  root.add(core);

  // ---- A tree of 21.5 cm blocks: a trunk and a round crown ----
  const tree: Array<[number, number, number, string]> = [];
  const tx = -5;
  const tz = -5;
  for (let y = 0; y < 5; y += 1) tree.push([tx, y, tz, '#a5632f']);
  for (let x = -2; x <= 2; x += 1) {
    for (let z = -2; z <= 2; z += 1) {
      for (let y = 5; y <= 7; y += 1) {
        const corner = Math.abs(x) === 2 && Math.abs(z) === 2;
        const top = y === 7 && (Math.abs(x) === 2 || Math.abs(z) === 2);
        if (corner || top) continue;
        tree.push([tx + x, y, tz + z, '#6cbf1c']);
      }
    }
  }
  blocks(root, OBJECT, tree, 'tree');

  // ---- A rock and a bush, also 21.5 cm ----
  blocks(root, OBJECT, [
    [4, 0, -4, '#a3a3a3'], [5, 0, -4, '#a3a3a3'], [4, 0, -3, '#a3a3a3'], [4, 1, -4, '#a3a3a3'],
  ], 'rock');
  blocks(root, OBJECT, [
    [-6, 0, 3, '#4fa414'], [-5, 0, 3, '#4fa414'], [-6, 0, 4, '#4fa414'], [-5, 0, 4, '#4fa414'], [-6, 1, 3, '#4fa414'],
  ], 'bush');

  // ---- A small cubicle of 10.75 cm blocks: three low walls and a desk ----
  const cubicle: Array<[number, number, number, string]> = [];
  const cx = 6;
  const cz = 2;
  const W = 8;
  for (let y = 0; y < 5; y += 1) {
    for (let i = 0; i < W; i += 1) {
      cubicle.push([cx + i, y, cz, '#d9cdb8']); // back wall
      if (i > 0) {
        cubicle.push([cx, y, cz + i, '#d9cdb8']); // left wall
        cubicle.push([cx + W - 1, y, cz + i, '#d9cdb8']); // right wall
      }
    }
  }
  // The desk along the back wall, at table height, three blocks deep.
  for (let i = 1; i < W - 1; i += 1) {
    for (let d = 1; d <= 3; d += 1) cubicle.push([cx + i, 3, cz + d, '#8a5a32']);
  }
  blocks(root, SMALL, cubicle, 'cubicle');

  scene.add(root);
  const across = N * TERRAIN;
  return {
    root,
    characterAt: new Vector3(0.3, 0, 0.6),
    centre: new Vector3(0, 0.6, 0),
    extent: { width: across, height: 2.6, depth: across },
  };
}
