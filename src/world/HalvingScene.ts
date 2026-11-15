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
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  Scene,
  Vector3,
} from 'three';

export const TERRAIN = 0.43;
/** How round each block's edges are, as a part of the block. */
const ROUND = 0.1;

/** A fixed lighter-or-darker amount per block, the same every time. */
function shade(x: number, y: number, z: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return 0.92 + (s - Math.floor(s)) * 0.16;
}



const merged = new MeshStandardMaterial({ vertexColors: true, roughness: 0.86, metalness: 0 });
merged.toneMapped = false;

/**
 * Blocks of one size, each [x, y, z, colour] in steps of that size, merged
 * into one solid shape: faces between blocks are left out, and edges and
 * corners are rounded only where they face the open air, so the blocks read
 * as one big rounded block, each still its own slight shade.
 */
function blocks(root: Group, size: number, list: Array<[number, number, number, string]>, name: string): void {
  const cells = new Map<string, Color>();
  for (const [x, y, z, colour] of list) cells.set(`${x},${y},${z}`, new Color(colour).multiplyScalar(shade(x, y, z)));
  const at = (x: number, y: number, z: number) => cells.has(`${x},${y},${z}`);
  const R = ROUND;
  const steps = [-0.5, -0.5 + R * 0.35, -0.5 + R, 0.5 - R, 0.5 - R * 0.35, 0.5];
  const SIDES: Array<{ n: [number, number, number]; u: [number, number, number]; v: [number, number, number] }> = [
    { n: [1, 0, 0], u: [0, 0, -1], v: [0, 1, 0] },
    { n: [-1, 0, 0], u: [0, 0, 1], v: [0, 1, 0] },
    { n: [0, 1, 0], u: [1, 0, 0], v: [0, 0, -1] },
    { n: [0, -1, 0], u: [1, 0, 0], v: [0, 0, 1] },
    { n: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0] },
    { n: [0, 0, -1], u: [-1, 0, 0], v: [0, 1, 0] },
  ];
  const positions: number[] = [];
  const normals: number[] = [];
  const colours: number[] = [];
  const indices: number[] = [];
  for (const [key, tint] of cells) {
    const [x, y, z] = key.split(',').map(Number);
    const occupied = [
      [at(x - 1, y, z), at(x + 1, y, z)],
      [at(x, y - 1, z), at(x, y + 1, z)],
      [at(x, y, z - 1), at(x, y, z + 1)],
    ];
    for (const side of SIDES) {
      if (at(x + side.n[0], y + side.n[1], z + side.n[2])) continue;
      const base = positions.length / 3;
      for (const b of steps) {
        for (const a of steps) {
          const p = [0, 1, 2].map((i) => side.n[i] * 0.5 + side.u[i] * a + side.v[i] * b);
          // Toward a neighbour the edge stays square, so the blocks meet flush.
          const core = p.map((value, i) =>
            Math.max(occupied[i][0] ? -0.5 : -0.5 + R, Math.min(occupied[i][1] ? 0.5 : 0.5 - R, value)),
          );
          const off = p.map((value, i) => value - core[i]);
          const len = Math.hypot(off[0], off[1], off[2]) || 1;
          const n = off.map((value) => value / len);
          positions.push(
            (x + 0.5 + core[0] + n[0] * R) * size,
            (y + 0.5 + core[1] + n[1] * R) * size,
            (z + 0.5 + core[2] + n[2] * R) * size,
          );
          normals.push(n[0], n[1], n[2]);
          const light =
            Math.max(0, n[0]) * 0.86 + Math.max(0, -n[0]) * 0.93 + Math.max(0, n[1]) * 1 +
            Math.max(0, -n[1]) * 0.6 + Math.max(0, n[2]) * 0.88 + Math.max(0, -n[2]) * 0.8;
          const l = light / (Math.abs(n[0]) + Math.abs(n[1]) + Math.abs(n[2]) || 1);
          colours.push(tint.r * l, tint.g * l, tint.b * l);
        }
      }
      const row = steps.length;
      for (let j = 0; j < row - 1; j += 1) {
        for (let i = 0; i < row - 1; i += 1) {
          const k = base + j * row + i;
          indices.push(k, k + 1, k + row + 1, k, k + row + 1, k + row);
        }
      }
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3));
  geometry.setAttribute('color', new BufferAttribute(new Float32Array(colours), 3));
  geometry.setIndex(indices);
  const mesh = new Mesh(geometry, merged);
  mesh.name = name;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  root.add(mesh);
}

export interface HalvingScene {
  root: Group;
  characterAt: Vector3;
  centre: Vector3;
  extent: { width: number; height: number; depth: number };
}

/**
 * The block sizes for the two options: halving (everything nests) or the
 * golden ratio (43 / 26.6 / 16.4 cm: the proportions, but no nesting).
 */
export const SIZES = {
  halving: { object: TERRAIN / 2, small: TERRAIN / 4 },
  golden: { object: TERRAIN / 1.6180339887, small: TERRAIN / 1.6180339887 ** 2 },
};

export function buildHalvingScene(scene: Scene, option: keyof typeof SIZES = 'halving'): HalvingScene {
  const { object: OBJ, small: SM } = SIZES[option];
  /** A place given in metres, as a whole number of steps of a block size. */
  const step = (metres: number, size: number) => Math.round(metres / size);
  const root = new Group();
  root.name = 'halving-scene';
  const GRASS = '#93d91e';
  const DIRT = '#da965a';

  // ---- Terrain: 8 × 8 blocks of 43 cm, grass over one layer of dirt ----
  const N = 8;
  const terrain: Array<[number, number, number, string]> = [];
  // The outer ring of grass is left off, so the dirt steps out one block.
  for (let x = -N / 2; x < N / 2; x += 1) {
    for (let z = -N / 2; z < N / 2; z += 1) {
      const outer = x === -N / 2 || x === N / 2 - 1 || z === -N / 2 || z === N / 2 - 1;
      if (!outer) terrain.push([x, -1, z, GRASS]);
      terrain.push([x, -2, z, DIRT]);
    }
  }
  blocks(root, TERRAIN, terrain, 'terrain');
  // Merged, there are no grooves to seal.

  // ---- A tree of 21.5 cm blocks: a trunk and a round crown ----
  const tree: Array<[number, number, number, string]> = [];
  const tx = step(-1.075, OBJ);
  const tz = step(-1.075, OBJ);
  const trunk = step(1.075, OBJ);
  for (let y = 0; y < trunk; y += 1) tree.push([tx, y, tz, '#a5632f']);
  for (let x = -2; x <= 2; x += 1) {
    for (let z = -2; z <= 2; z += 1) {
      for (let y = trunk; y <= trunk + 2; y += 1) {
        const corner = Math.abs(x) === 2 && Math.abs(z) === 2;
        const top = y === trunk + 2 && (Math.abs(x) === 2 || Math.abs(z) === 2);
        if (corner || top) continue;
        tree.push([tx + x, y, tz + z, '#6cbf1c']);
      }
    }
  }
  blocks(root, OBJ, tree, 'tree');

  // ---- A rock and a bush, also 21.5 cm ----
  {
    const rx = step(0.86, OBJ);
    const rz = step(0.645, OBJ);
    blocks(root, OBJ, [
      [rx, 0, rz, '#a3a3a3'], [rx + 1, 0, rz, '#a3a3a3'], [rx, 0, rz + 1, '#a3a3a3'], [rx, 1, rz, '#a3a3a3'],
    ], 'rock');
    const bx = step(-1.29, OBJ);
    const bz = step(0.645, OBJ);
    blocks(root, OBJ, [
      [bx, 0, bz, '#4fa414'], [bx + 1, 0, bz, '#4fa414'], [bx, 0, bz + 1, '#4fa414'], [bx + 1, 0, bz + 1, '#4fa414'], [bx, 1, bz, '#4fa414'],
    ], 'bush');
  }

  // ---- A small cubicle of 10.75 cm blocks: three low walls and a desk ----
  const cubicle: Array<[number, number, number, string]> = [];
  // On the grass, at the back right, its open side to the front.
  const cx = step(0.215, SM);
  const cz = step(-1.075, SM);
  const W = step(0.86, SM);
  const wallHigh = step(0.54, SM);
  const deskAt = step(0.33, SM);
  for (let y = 0; y < wallHigh; y += 1) {
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
    for (let d = 1; d <= step(0.32, SM); d += 1) cubicle.push([cx + i, deskAt, cz + d, '#8a5a32']);
  }
  blocks(root, SM, cubicle, 'cubicle');

  scene.add(root);
  const across = N * TERRAIN;
  return {
    root,
    characterAt: new Vector3(0.3, 0, 0.6),
    centre: new Vector3(0, 0.6, 0),
    extent: { width: across, height: 2.6, depth: across },
  };
}
