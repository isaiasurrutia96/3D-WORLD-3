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
function blocks(
  root: Group,
  size: number,
  list: Array<[number, number, number, string]>,
  name: string,
  /** What these blocks sit on: it counts as there underneath, so they sit flat and square on it. */
  restsOn?: (x: number, y: number, z: number) => boolean,
): void {
  const cells = new Map<string, Color>();
  for (const [x, y, z, colour] of list) cells.set(`${x},${y},${z}`, new Color(colour).multiplyScalar(shade(x, y, z)));
  const at = (x: number, y: number, z: number) => cells.has(`${x},${y},${z}`);
  const below = (x: number, y: number, z: number) => at(x, y - 1, z) || (restsOn?.(x, y - 1, z) ?? false);
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
      [below(x, y, z), at(x, y + 1, z)],
      [at(x, y, z - 1), at(x, y, z + 1)],
    ];
    for (const side of SIDES) {
      if (at(x + side.n[0], y + side.n[1], z + side.n[2])) continue;
      // Its underside, where it sits on what it rests on, is not seen.
      if (side.n[1] === -1 && below(x, y, z)) continue;
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

  // ---- Terrain: a complete dirt slab first, then grass laid on top ----
  // The slab is a finished solid on its own: its whole top, its sides, its
  // rounded outer edges. The grass is a separate layer sitting flat and
  // square on it (the outer ring left off, so the dirt steps out), so
  // wherever the grass rounds off, what is underneath is the slab's own top.
  const N = 8;
  const dirt: Array<[number, number, number, string]> = [];
  const grass: Array<[number, number, number, string]> = [];
  for (let x = -N / 2; x < N / 2; x += 1) {
    for (let z = -N / 2; z < N / 2; z += 1) {
      dirt.push([x, -2, z, DIRT]);
      const outer = x === -N / 2 || x === N / 2 - 1 || z === -N / 2 || z === N / 2 - 1;
      if (!outer) grass.push([x, -1, z, GRASS]);
    }
  }
  blocks(root, TERRAIN, dirt, 'dirt-slab');
  const onSlab = (x: number, y: number, z: number) => y === -2 && x >= -N / 2 && x < N / 2 && z >= -N / 2 && z < N / 2;
  blocks(root, TERRAIN, grass, 'grass', onSlab);

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

/**
 * A ramp: a wedge `long` cells along `dir` and `wide` cells across, rising
 * one block from its low end to its high end. Corner (x0, z0) is the cell
 * corner it starts at; it stands on height y0 (metres).
 */
function ramp(
  root: Group,
  size: number,
  x0: number,
  z0: number,
  y0: number,
  wide: number,
  long: number,
  /** Which way it rises: toward −z or +z. */
  rises: -1 | 1,
  colour: string,
): void {
  const X0 = x0 * size;
  const X1 = (x0 + wide) * size;
  const zLow = (rises === -1 ? z0 + long : z0) * size;
  const zHigh = (rises === -1 ? z0 : z0 + long) * size;
  const top = y0 + size;
  const tint = new Color(colour);
  const positions: number[] = [];
  const colours: number[] = [];
  const face = (pts: number[][], light: number) => {
    for (const p of pts) {
      positions.push(p[0], p[1], p[2]);
      colours.push(tint.r * light, tint.g * light, tint.b * light);
    }
  };
  const a = [X0, y0, zLow];
  const b = [X1, y0, zLow];
  const c = [X1, top, zHigh];
  const d = [X0, top, zHigh];
  const e = [X0, y0, zHigh];
  const f = [X1, y0, zHigh];
  // The slope, then the two sides and the high end.
  const slope = rises === -1 ? [a, b, c, a, c, d] : [b, a, d, b, d, c];
  face(slope, 0.97);
  face(rises === -1 ? [a, d, e] : [a, e, d], 0.93);
  face(rises === -1 ? [b, f, c] : [b, c, f], 0.86);
  face(rises === -1 ? [e, d, c, e, c, f] : [f, c, d, f, d, e], 0.8);
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute('color', new BufferAttribute(new Float32Array(colours), 3));
  geometry.computeVertexNormals();
  const mesh = new Mesh(geometry, merged);
  mesh.name = 'ramp';
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  root.add(mesh);
}

/**
 * A tiny race track of blocks, to see how a track with levels looks: a loop
 * two blocks wide round a grass field, its back straight raised one block,
 * a ramp up on the left and down on the right, a rail of small red and
 * white blocks along the raised part, and a white start line.
 */
export function buildTrackScene(scene: Scene): HalvingScene {
  const root = new Group();
  root.name = 'track-scene';
  const GRASS = '#93d91e';
  const DIRT = '#da965a';
  const ROAD = '#5a5f68';
  const W = 14;
  const D = 10;
  const ix = (i: number) => i - W / 2;
  const iz = (j: number) => j - D / 2;
  const onTrack = (i: number, j: number) => i < 2 || i >= W - 2 || j < 2 || j >= D - 2;
  const isRamp = (i: number, j: number) => (i < 2 || i >= W - 2) && (j === 2 || j === 3);

  // The dirt slab, one block bigger all round.
  const dirt: Array<[number, number, number, string]> = [];
  for (let i = -1; i <= W; i += 1) for (let j = -1; j <= D; j += 1) dirt.push([ix(i), -2, iz(j), DIRT]);
  blocks(root, TERRAIN, dirt, 'dirt-slab');
  const onSlab = (x: number, y: number, z: number) => y === -2 && x >= ix(-1) && x <= ix(W) && z >= iz(-1) && z <= iz(D);

  // The ground layer: grass in the middle, road round it, a white start line.
  const ground: Array<[number, number, number, string]> = [];
  for (let i = 0; i < W; i += 1) {
    for (let j = 0; j < D; j += 1) {
      const road = onTrack(i, j);
      const start = road && j >= D - 2 && i === 5;
      ground.push([ix(i), -1, iz(j), start ? '#f2f2f2' : road ? ROAD : GRASS]);
    }
  }
  blocks(root, TERRAIN, ground, 'ground', onSlab);
  const onGround = (x: number, y: number, z: number) => y === -1 && x >= ix(0) && x < ix(W) && z >= iz(0) && z < iz(D);

  // The raised back straight, one block up.
  const raised: Array<[number, number, number, string]> = [];
  for (let i = 0; i < W; i += 1) for (let j = 0; j < 2; j += 1) raised.push([ix(i), 0, iz(j), ROAD]);
  blocks(root, TERRAIN, raised, 'raised-road', onGround);

  // Ramps: up on the left, down on the right, each two blocks long.
  ramp(root, TERRAIN, ix(0), iz(2), 0, 2, 2, -1, ROAD);
  ramp(root, TERRAIN, ix(W - 2), iz(2), 0, 2, 2, -1, ROAD);
  void isRamp;

  // A rail of small blocks, red and white, along the back of the raised part.
  const rail: Array<[number, number, number, string]> = [];
  for (let k = 0; k < W * 4; k += 1) {
    const colour = Math.floor(k / 2) % 2 ? '#f2f2f2' : '#dc2828';
    rail.push([ix(0) * 4 + k, 4, iz(0) * 4, colour]);
  }
  blocks(root, SMALL_FOR_TRACK, rail, 'rail');

  scene.add(root);
  return {
    root,
    characterAt: new Vector3(0.3, 0, iz(D - 1) * TERRAIN),
    centre: new Vector3(0, 0.4, 0),
    extent: { width: (W + 2) * TERRAIN, height: 2.2, depth: (D + 2) * TERRAIN },
  };
}

const SMALL_FOR_TRACK = TERRAIN / 4;
