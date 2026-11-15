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
  Matrix4,
  InstancedMesh,
  DoubleSide,
  Group,
  Mesh,
  MeshStandardMaterial,
  Scene,
  Vector3,
} from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

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

/**
 * A small NASCAR-style oval: two straights and two half-circle turns, the
 * turns banked inward. The banking is built up from blocks — stacked 43 cm
 * blocks that step up toward the outside of each turn — and a smooth road is
 * laid over them, flat on the straights and tilting into the turns, with a
 * concrete wall along the outside.
 */
export function buildOvalScene(scene: Scene): HalvingScene {
  const root = new Group();
  root.name = 'oval-scene';
  const B = TERRAIN;
  const L = 14 * B; // the straights
  const R = 6 * B; // the turns, to the middle of the road
  const WIDE = 4 * B; // the road
  const BANK = 2 * B; // how high the outside of a turn stands
  const GRASS = '#93d91e';
  const DIRT = '#da965a';
  const CONCRETE = '#c4bfb5';

  const smooth = (a: number, b: number, v: number) => {
    const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  /** How far into a turn a point is, 0 on the straights to 1 in the turns. */
  const turnAt = (x: number) => smooth(L / 2 - 1.3, L / 2 + 0.7, Math.abs(x));
  /** A point's offset across the road: −WIDE/2 at the inside edge, +WIDE/2 outside. */
  const across = (x: number, z: number) =>
    Math.abs(x) <= L / 2 ? Math.abs(z) - R : Math.hypot(Math.abs(x) - L / 2, z) - R;
  /** The road's height at a point on it. */
  const roadHeight = (x: number, z: number) =>
    turnAt(x) * BANK * Math.min(1, Math.max(0, (across(x, z) + WIDE / 2) / WIDE));

  /** Positive inside the concrete round the road, negative on the grass. */
  const concreteness = (x: number, z: number) => WIDE / 2 + B * 0.5 - Math.abs(across(x, z));
  /** Blocks the grass-to-concrete edge passes through, with the value at each corner. */
  const edgeCells: Array<[number, number, number[]]> = [];

  // ---- The dirt slab and the ground layer of blocks ----
  const halfX = Math.ceil((L / 2 + R + WIDE / 2) / B) + 1;
  const halfZ = Math.ceil((R + WIDE / 2) / B) + 1;
  const dirt: Array<[number, number, number, string]> = [];
  const ground: Array<[number, number, number, string]> = [];
  const raised: Array<[number, number, number, string]> = [];
  for (let i = -halfX; i < halfX; i += 1) {
    for (let k = -halfZ; k < halfZ; k += 1) {
      const x = (i + 0.5) * B;
      const z = (k + 0.5) * B;
      dirt.push([i, -2, k, DIRT]);
      const off = across(x, z);
      const onRoad = Math.abs(off) <= WIDE / 2 + B * 0.5;
      // A block wholly inside the concrete is concrete; one the edge passes
      // through is grass, with its concrete part laid on top further down.
      const corners = [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]].map(([dx, dz]) => concreteness((i + 0.5 + dx) * B, (k + 0.5 + dz) * B));
      const allConcrete = corners.every((v) => v > 0);
      const someConcrete = corners.some((v) => v > 0);
      ground.push([i, -1, k, allConcrete ? CONCRETE : GRASS]);
      if (someConcrete && !allConcrete) edgeCells.push([i, k, corners]);
      if (!onRoad) continue;
      // The foundation: whole blocks up to just under the road at the lowest
      // point of this cell, so none pokes through the road laid on top.
      let lowest = Infinity;
      for (const [dx, dz] of [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]]) {
        const px = x + dx * B;
        const pz = z + dz * B;
        const o = across(px, pz);
        lowest = Math.min(lowest, Math.abs(o) <= WIDE / 2 ? roadHeight(px, pz) : 0);
      }
      const layers = Math.floor(lowest / B + 1e-6);
      for (let y = 0; y < layers; y += 1) raised.push([i, y, k, CONCRETE]);
    }
  }
  blocks(root, B, dirt, 'dirt-slab');
  const inSlab = (x: number, y: number, z: number) => y === -2 && x >= -halfX && x < halfX && z >= -halfZ && z < halfZ;
  blocks(root, B, ground, 'ground', inSlab);
  const groundAt = new Set(ground.map(([x, , z]) => `${x},${z}`));
  const raisedAt = new Set(raised.map(([x, y, z]) => `${x},${y},${z}`));
  blocks(root, B, raised, 'banking-blocks', (x, y, z) => (y === -1 ? groundAt.has(`${x},${z}`) : raisedAt.has(`${x},${y},${z}`)));

  // ---- The smooth grass-to-concrete edge ----
  // Where the edge passes through a block, the concrete part of its top is
  // laid over the grass: cut along the true curve, so a block can have a
  // corner of concrete, or half of it, and the line round the track runs
  // smoothly instead of in steps.
  {
    const positions: number[] = [];
    const tint = new Color(CONCRETE);
    for (const [i, k, v] of edgeCells) {
      const pts: Array<[number, number]> = [];
      const cx = [i, i + 1, i + 1, i];
      const cz = [k, k, k + 1, k + 1];
      for (let c = 0; c < 4; c += 1) {
        const n = (c + 1) % 4;
        if (v[c] > 0) pts.push([cx[c], cz[c]]);
        if ((v[c] > 0) !== (v[n] > 0)) {
          const t = v[c] / (v[c] - v[n]);
          pts.push([cx[c] + (cx[n] - cx[c]) * t, cz[c] + (cz[n] - cz[c]) * t]);
        }
      }
      for (let t = 1; t < pts.length - 1; t += 1) {
        for (const p of [pts[0], pts[t + 1], pts[t]]) positions.push(p[0] * B, 0.003, p[1] * B);
      }
    }
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    const normals = new Float32Array(positions.length);
    for (let n = 1; n < normals.length; n += 3) normals[n] = 1;
    g.setAttribute('normal', new BufferAttribute(normals, 3));
    const m = new MeshStandardMaterial({ color: tint, roughness: 0.86, side: DoubleSide });
    m.toneMapped = false;
    const edge = new Mesh(g, m);
    edge.name = 'concrete-edge';
    edge.receiveShadow = true;
    root.add(edge);
  }

  // ---- The road: a smooth surface over the blocks, round the whole oval ----
  const P = 2 * L + 2 * Math.PI * R;
  const centre = (s: number): { x: number; z: number; nx: number; nz: number } => {
    s = ((s % P) + P) % P;
    if (s < L) return { x: -L / 2 + s, z: R, nx: 0, nz: 1 };
    s -= L;
    if (s < Math.PI * R) {
      const t = Math.PI / 2 - s / R;
      return { x: L / 2 + R * Math.cos(t), z: R * Math.sin(t), nx: Math.cos(t), nz: Math.sin(t) };
    }
    s -= Math.PI * R;
    if (s < L) return { x: L / 2 - s, z: -R, nx: 0, nz: -1 };
    s -= L;
    const t = -Math.PI / 2 - s / R;
    return { x: -L / 2 + R * Math.cos(t), z: R * Math.sin(t), nx: Math.cos(t), nz: Math.sin(t) };
  };
  const ALONG = 240;
  const ACROSS = 10;
  const road = new BufferGeometry();
  {
    const positions: number[] = [];
    const indices: number[] = [];
    for (let a = 0; a <= ALONG; a += 1) {
      const c = centre((a / ALONG) * P);
      const tf = turnAt(c.x);
      for (let b = 0; b <= ACROSS; b += 1) {
        const t = b / ACROSS; // 0 inside, 1 outside
        const off = (t - 0.5) * WIDE;
        positions.push(c.x + c.nx * off, tf * BANK * t + 0.004, c.z + c.nz * off);
      }
    }
    const row = ACROSS + 1;
    for (let a = 0; a < ALONG; a += 1) {
      for (let b = 0; b < ACROSS; b += 1) {
        const k = a * row + b;
        indices.push(k, k + 1, k + row + 1, k, k + row + 1, k + row);
      }
    }
    road.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    road.setIndex(indices);
    road.computeVertexNormals();
  }
  const asphalt = new MeshStandardMaterial({ color: '#4a4f57', roughness: 0.9, side: DoubleSide });
  asphalt.toneMapped = false;
  const roadMesh = new Mesh(road, asphalt);
  roadMesh.name = 'road';
  roadMesh.receiveShadow = true;
  root.add(roadMesh);

  // White lines just inside each edge.
  const line = (t0: number, t1: number) => {
    const positions: number[] = [];
    const indices: number[] = [];
    for (let a = 0; a <= ALONG; a += 1) {
      const c = centre((a / ALONG) * P);
      const tf = turnAt(c.x);
      for (const t of [t0, t1]) {
        const off = (t - 0.5) * WIDE;
        positions.push(c.x + c.nx * off, tf * BANK * t + 0.008, c.z + c.nz * off);
      }
      if (a > 0) {
        const k = a * 2;
        indices.push(k - 2, k - 1, k + 1, k - 2, k + 1, k);
      }
    }
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    g.setIndex(indices);
    g.computeVertexNormals();
    const m = new MeshStandardMaterial({ color: '#f2f2f2', roughness: 0.8, side: DoubleSide });
    m.toneMapped = false;
    const mesh = new Mesh(g, m);
    mesh.name = 'road-line';
    root.add(mesh);
  };
  line(0.04, 0.07);
  line(0.93, 0.96);

  // ---- The outside wall: from the ground to a lip above the road ----
  {
    const positions: number[] = [];
    const indices: number[] = [];
    const LIP = 0.22;
    for (let a = 0; a <= ALONG; a += 1) {
      const c = centre((a / ALONG) * P);
      const top = turnAt(c.x) * BANK + LIP;
      const off = WIDE / 2 + 0.03;
      const x = c.x + c.nx * off;
      const z = c.z + c.nz * off;
      positions.push(x, 0, z, x, top, z);
      if (a > 0) {
        const k = a * 2;
        indices.push(k - 2, k, k + 1, k - 2, k + 1, k - 1);
      }
    }
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    g.setIndex(indices);
    g.computeVertexNormals();
    const m = new MeshStandardMaterial({ color: '#e8e4dc', roughness: 0.9, side: DoubleSide });
    m.toneMapped = false;
    const wall = new Mesh(g, m);
    wall.name = 'wall';
    wall.castShadow = true;
    root.add(wall);
  }

  scene.add(root);
  return {
    root,
    characterAt: new Vector3(0, 0.004, R),
    centre: new Vector3(0, 0.3, 0),
    extent: { width: 2 * halfX * B, height: 2, depth: 2 * halfZ * B },
  };
}

/**
 * Nature in the block world: a typical tree, a fruit tree, a bush and a
 * flowering bush on a patch of grass. Trunks are 21.5 cm blocks and solid;
 * leaves and bushes are 21.5 cm blocks, one green in slightly different
 * shades block by block, and are walked through; fruit and flowers are
 * 10.75 cm blocks set on their surface.
 */
export function buildNatureScene(scene: Scene): HalvingScene {
  const root = new Group();
  root.name = 'nature-scene';
  const OBJ = TERRAIN / 2;
  const SM = TERRAIN / 4;
  const GRASS = '#93d91e';
  const DIRT = '#da965a';
  const LEAF = '#6fbf1f';
  const BUSH = '#5cae1a';
  const BARK = '#9a5e2c';

  // ---- The ground: a dirt slab and grass on it ----
  const W = 16;
  const D = 6;
  const dirt: Array<[number, number, number, string]> = [];
  const grass: Array<[number, number, number, string]> = [];
  for (let i = -W / 2 - 1; i < W / 2 + 1; i += 1) {
    for (let k = -D / 2 - 1; k < D / 2 + 1; k += 1) {
      dirt.push([i, -2, k, DIRT]);
      if (i >= -W / 2 && i < W / 2 && k >= -D / 2 && k < D / 2) grass.push([i, -1, k, GRASS]);
    }
  }
  blocks(root, TERRAIN, dirt, 'dirt-slab');
  blocks(root, TERRAIN, grass, 'grass', (x, y, z) => y === -2 && x >= -W / 2 - 1 && x < W / 2 + 1 && z >= -D / 2 - 1 && z < D / 2 + 1);

  /** A fixed scatter, the same every time. */
  const rand = (a: number, b: number) => {
    const v = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
    return v - Math.floor(v);
  };

  /** A round, lumpy mass of blocks: its cells, in steps of `OBJ`. */
  const lump = (cx: number, cy: number, cz: number, rx: number, ry: number, rz: number, seed: number) => {
    const cells: Array<[number, number, number]> = [];
    for (let x = -Math.ceil(rx); x <= Math.ceil(rx); x += 1) {
      for (let y = -Math.ceil(ry); y <= Math.ceil(ry); y += 1) {
        for (let z = -Math.ceil(rz); z <= Math.ceil(rz); z += 1) {
          const d = Math.hypot(x / rx, y / ry, z / rz);
          // Lumps: a little more or less in places, in a fixed pattern.
          if (d <= 1 + (rand(x * 3 + seed, y * 5 + z * 7) - 0.5) * 0.28) cells.push([cx + x, cy + y, cz + z]);
        }
      }
    }
    return cells;
  };

  /**
   * Small blocks set on the outside of a lump: one on every `every`th
   * outward face, in a fixed pattern.
   */
  const dots = (cells: Array<[number, number, number]>, every: number, colours: string[], seed: number) => {
    const has = new Set(cells.map((c) => c.join(',')));
    const out: Array<[number, number, number, string]> = [];
    let n = 0;
    for (const [x, y, z] of cells) {
      for (const [dx, dy, dz] of [[1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1], [0, 1, 0]]) {
        if (has.has(`${x + dx},${y + dy},${z + dz}`)) continue;
        n += 1;
        if ((n * 7 + seed) % every !== 0) continue;
        // In small-block steps: two per object block; just outside that face.
        const sx = 2 * x + (dx > 0 ? 2 : dx < 0 ? -1 : 0) + (dx === 0 ? Math.floor(rand(n, seed) * 2) : 0);
        const sy = 2 * y + (dy > 0 ? 2 : 0) + (dy === 0 ? Math.floor(rand(seed, n) * 2) : 0);
        const sz = 2 * z + (dz > 0 ? 2 : dz < 0 ? -1 : 0) + (dz === 0 ? Math.floor(rand(n + 3, seed) * 2) : 0);
        out.push([sx, sy, sz, colours[n % colours.length]]);
      }
    }
    return out;
  };

  /** A tree: a trunk two blocks square, and a crown round its top. */
  const tree = (x: number, z: number, fruit: boolean, seed: number) => {
    const trunk: Array<[number, number, number, string]> = [];
    const height = 6;
    for (let y = 0; y < height; y += 1) {
      for (const [dx, dz] of [[0, 0], [1, 0], [0, 1], [1, 1]]) trunk.push([x + dx, y, z + dz, BARK]);
    }
    blocks(root, OBJ, trunk, 'tree-trunk');
    const crown = lump(x, height + 2, z, 3.4, 2.7, 3.2, seed).map(([a, b, c]) => [a + 0.5 > x ? a : a, b, c] as [number, number, number]);
    blocks(root, OBJ, crown.map(([a, b, c]) => [a, b, c, LEAF]), 'foliage');
    if (fruit) blocks(root, SM, dots(crown, 9, ['#e8332a', '#d42a22'], seed), 'fruit');
  };

  /**
   * A bush: a full, low dome, wider than it is tall, its rim coming right
   * down to the ground, with flowers if asked.
   */
  const bush = (x: number, z: number, flowers: boolean, seed: number) => {
    const cells: Array<[number, number, number]> = [];
    // About 1.4 m across, 1.2 deep and 0.6 high.
    const RX = 3.3;
    const RY = 3.0;
    const RZ = 3.0;
    for (let a = -4; a < 4; a += 1) {
      for (let b = 0; b <= 3; b += 1) {
        for (let c = -3; c < 3; c += 1) {
          // A dome on the ground, measured from the middle of each block.
          const d = Math.hypot((a + 0.5) / RX, (b + 0.5) / RY, (c + 0.5) / RZ);
          if (d <= 1 + (rand(a * 3 + seed, b * 5 + c * 7) - 0.5) * 0.08) cells.push([x + a, b, z + c]);
        }
      }
    }
    blocks(root, OBJ, cells.filter(([, y]) => y >= 0).map(([a, b, c]) => [a, b, c, BUSH]), 'foliage');
    if (flowers) blocks(root, SM, dots(cells.filter(([, y]) => y >= 0), 5, ['#ff7eb6', '#ffffff', '#ffd23f'], seed), 'flowers');
  };

  tree(-11, -1, false, 3);
  tree(-4, -1, true, 11);
  bush(6, 0, true, 5);
  bush(13, 0, false, 9);

  scene.add(root);
  return {
    root,
    characterAt: new Vector3(0.2, 0, 0.75),
    centre: new Vector3(0, 0.9, 0),
    extent: { width: (W + 2) * TERRAIN, height: 2.6, depth: (D + 2) * TERRAIN },
  };
}

/**
 * One tree in the style of the reference pictures, looked at closely:
 * - a short, thick trunk (43 cm square) flaring at its foot, with four
 *   buttress roots stepping down to the ground at the corners;
 * - two thick branches angling out of the top of the trunk into the crown;
 * - a wide, dome-shaped crown, wider than it is tall and flat-ish beneath,
 *   starting low, made of many small leaf cubes (10.75 cm, about four to the
 *   trunk's width), separate and softly rounded, in clumps: a big dome on
 *   top and lumpy clumps round its sides, one green in slightly different
 *   shades, a little darker toward the bottom.
 */
export function buildTreeScene(scene: Scene): HalvingScene {
  const root = new Group();
  root.name = 'tree-scene';
  const OBJ = TERRAIN / 2;
  const SM = TERRAIN / 4;
  const GRASS = '#93d91e';
  const DIRT = '#da965a';
  const BARK = '#bb7843';
  const LEAF = '#b2e830';

  // ---- Ground ----
  const W = 14;
  const dirt: Array<[number, number, number, string]> = [];
  const grass: Array<[number, number, number, string]> = [];
  for (let i = -W / 2 - 1; i < W / 2 + 1; i += 1) {
    for (let k = -W / 2 - 1; k < W / 2 + 1; k += 1) {
      dirt.push([i, -2, k, DIRT]);
      if (Math.abs(i + 0.5) < W / 2 && Math.abs(k + 0.5) < W / 2) grass.push([i, -1, k, GRASS]);
    }
  }
  blocks(root, TERRAIN, dirt, 'dirt-slab');
  blocks(root, TERRAIN, grass, 'grass', (x, y, z) => y === -2 && Math.abs(x + 0.5) < W / 2 + 1 && Math.abs(z + 0.5) < W / 2 + 1);

  const rand = (a: number, b: number) => {
    const v = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
    return v - Math.floor(v);
  };
  const unique = (list: Array<[number, number, number, string]>) => {
    const seen = new Set<string>();
    return list.filter((c) => {
      const k = `${c[0]},${c[1]},${c[2]}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  };

  // ---- Trunk: 21.5 cm blocks, 3 × 3 (65 cm), short and thick ----
  // In 21.5 cm steps the trunk is x and z −1..1, centred on x = z = 0.1075.
  const C = OBJ / 2; // the tree's middle, across
  const TRUNK = 10; // 2.15 m, its top inside the crown
  const trunk: Array<[number, number, number, string]> = [];
  for (let y = 0; y < TRUNK; y += 1) {
    for (let dx = -1; dx <= 1; dx += 1) for (let dz = -1; dz <= 1; dz += 1) trunk.push([dx, y, dz, BARK]);
  }
  blocks(root, OBJ, unique(trunk), 'tree-trunk');

  // ---- Roots: 21.5 cm blocks, two out of each side of the trunk ----
  // The trunk is a plain 3 × 3 column. From each side, at its two outer
  // blocks, a root reaches out two blocks: two high against the trunk, one
  // high beyond that.
  const roots: Array<[number, number, number, string]> = [];
  for (const [ax, az] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    for (const w of [-1, 1]) {
      for (const [k, high] of [[2, 2], [3, 1]] as const) {
        for (let y = 0; y < high; y += 1) {
          const x = ax !== 0 ? ax * k : w;
          const z = az !== 0 ? az * k : w;
          roots.push([x, y, z, BARK]);
        }
      }
    }
  }
  blocks(root, OBJ, unique(roots), 'tree-roots', (x, y, z) => y === -1 && Math.abs(x + 0.5) < W / 2 && Math.abs(z + 0.5) < W / 2);

  // ---- Two thick branches angling out of the top of the trunk ----
  const branches: Array<[number, number, number, string]> = [];
  for (const side of [-1, 1]) {
    for (let k = 0; k <= 7; k += 1) {
      const x = (side > 0 ? 4 : -3) + side * k;
      const y = 13 + Math.floor(k * 0.75);
      const thick = k < 4 ? [-1, 0, 1, 2] : [0, 1];
      for (const b of thick) for (let h = 0; h < (k < 4 ? 3 : 2); h += 1) branches.push([x, y + h, b, BARK]);
    }
  }
  blocks(root, SM, unique(branches), 'tree-branches');

  // ---- The crown: leaf cubes of 21.5 cm, in clumps ----
  const clumps: Array<[number, number, number, number, number]> = [
    [C, 3.17, C, 1.55, 0.85], // the big dome on top
    [C - 1.45, 2.52, C + 0.1, 0.95, 0.65],
    [C + 1.45, 2.54, C - 0.1, 0.95, 0.65],
    [C + 0.15, 2.50, C + 1.35, 0.92, 0.62],
    [C - 0.1, 2.52, C - 1.35, 0.92, 0.62],
    [C + 1.0, 2.77, C + 0.95, 0.78, 0.58],
    [C - 1.0, 2.80, C - 0.95, 0.78, 0.58],
    [C - 0.95, 2.74, C + 1.0, 0.75, 0.56],
    [C + 0.95, 2.80, C - 1.0, 0.75, 0.56],
  ];
  const FLOOR = 1.94; // the crown's underside, flat-ish
  const leaves = new Set<string>();
  clumps.forEach(([cx, cy, cz, r, ry], n) => {
    const lo = (v: number, rr: number) => Math.floor((v - rr - OBJ) / OBJ);
    const hi = (v: number, rr: number) => Math.ceil((v + rr + OBJ) / OBJ);
    for (let x = lo(cx, r); x <= hi(cx, r); x += 1) {
      for (let y = lo(cy, ry); y <= hi(cy, ry); y += 1) {
        for (let z = lo(cz, r); z <= hi(cz, r); z += 1) {
          const px = (x + 0.5) * OBJ;
          const py = (y + 0.5) * OBJ;
          const pz = (z + 0.5) * OBJ;
          if (py < FLOOR) continue;
          // Lumpy, cube by cube, so single cubes stand proud as in the picture.
          const lumpy = (rand(x * 7 + n, y * 3 + z * 5) - 0.5) * 0.3;
          const d = Math.hypot((px - cx) / r, (py - cy) / ry, (pz - cz) / r);
          if (d <= 1 + lumpy) leaves.add(`${x},${y},${z}`);
        }
      }
    }
  });
  const surface: Array<[number, number, number]> = [];
  for (const key of leaves) {
    const [x, y, z] = key.split(',').map(Number);
    const hidden = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]].every(([a, b, c]) => leaves.has(`${x + a},${y + b},${z + c}`));
    if (!hidden) surface.push([x, y, z]);
  }
  {
    const cube = new RoundedBoxGeometry(1, 1, 1, 2, 0.16);
    const n = cube.attributes.normal;
    const light = new Float32Array(n.count * 3);
    for (let i = 0; i < n.count; i += 1) {
      const nx = n.getX(i), ny = n.getY(i), nz = n.getZ(i);
      // Bright tops, as the sun catches them in the picture.
      const l0 =
        Math.max(0, nx) * 0.84 + Math.max(0, -nx) * 0.92 + Math.max(0, ny) * 1.1 +
        Math.max(0, -ny) * 0.62 + Math.max(0, nz) * 0.9 + Math.max(0, -nz) * 0.8;
      const l = l0 / (Math.abs(nx) + Math.abs(ny) + Math.abs(nz) || 1);
      light.set([l, l, l], i * 3);
    }
    cube.setAttribute('color', new BufferAttribute(light, 3));
    const mat = new MeshStandardMaterial({ vertexColors: true, roughness: 0.9, metalness: 0 });
    mat.toneMapped = false;
    const mesh = new InstancedMesh(cube, mat, surface.length);
    mesh.name = 'foliage';
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const m = new Matrix4();
    const top = 4.0;
    surface.forEach(([x, y, z], i) => {
      m.makeScale(OBJ, OBJ, OBJ);
      m.setPosition((x + 0.5) * OBJ, (y + 0.5) * OBJ, (z + 0.5) * OBJ);
      mesh.setMatrixAt(i, m);
      const height = Math.min(1, Math.max(0, ((y + 0.5) * OBJ - FLOOR) / (top - FLOOR)));
      const shade = (0.92 + rand(x * 13 + z, y * 17) * 0.14) * (0.84 + 0.18 * height);
      mesh.setColorAt(i, new Color(LEAF).multiplyScalar(shade));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    root.add(mesh);
  }

  scene.add(root);
  return {
    root,
    characterAt: new Vector3(2.3, 0, 1.3),
    centre: new Vector3(0.3, 2.0, 0),
    extent: { width: 5.4, height: 4.2, depth: 4.4 },
  };
}
