/**
 * The block island: a floating island built entirely of cubes, reconstructed
 * from the user's two reference pictures (an overhead view and an angled one
 * of the same island).
 *
 * How it was measured. The overhead picture is looked at from 45 degrees up,
 * with its blocks square to the screen: a block is 15 pixels wide and each
 * row of blocks 10.6 pixels deep. A grid of that pitch was laid over it and
 * the outline, the terraces, the path, the pool and every tree, bush and
 * rock were read off cell by cell; those readings are the tables below, in
 * that grid's own columns (left to right) and rows (back to front). The
 * angled picture gives what the overhead cannot: how thick the island is,
 * how its underside tapers, how tall the terraces and trees stand.
 *
 * Where the pictures do not agree or do not show something, the smallest
 * guess was made and is said here:
 *  - The two pictures draw the grid at different angles (square to the
 *    screen in one, diagonal in the other). The overhead's is used.
 *  - The back edge behind the big tree's crown, and the ground under every
 *    crown, cannot be seen; the outline is carried straight through.
 *  - Terrace heights are read from the angled picture: the low terraces are
 *    two blocks (grass over earth), the high one four.
 *  - The underside is only seen from one side. It is a broad mass of stone
 *    in two-block chunks, one chunk deep at the rim and up to eight inside
 *    (about nineteen blocks under the lawn with the earth), stepping down
 *    toward the middle, which is what its outline in the angled picture
 *    works out to.
 *
 * Everything is on one grid of 0.45 m blocks, so the character stands about
 * four blocks tall as the figure in the pictures does. The stone underside
 * is drawn as two-block cubes on that grid; rocks are cubes of three half
 * blocks, and tree crowns, bushes and berries are half blocks. Nothing is scattered at random: every feature is
 * placed by the tables.
 *
 * What is solid: the ground, tree trunks and rocks. What is not: leaves,
 * bushes, water and clouds. The pool is one block deep and is waded.
 */

import {
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  RepeatWrapping,
  Scene,
  SRGBColorSpace,
  Vector3,
} from 'three';
import type { CollisionWorld } from '../physics/CollisionWorld.ts';
import type { Carryable } from './Carryable.ts';

/** The size of one block, in metres. */
export const BLOCK = 0.45;

// ---- The layout, as read off the overhead picture ----------------------------
// Columns run left to right, rows back to front, both in blocks.

const FIRST_ROW = 7;
const LAST_ROW = 82;
/** The column and row that sit at the middle of the world. */
const MID_COL = 34;
const MID_ROW = 45;

/** Expands "from-to:value" runs into a table. */
function table(runs: Array<[number, number, number]>): Record<number, number> {
  const out: Record<number, number> = {};
  for (const [from, to, value] of runs) for (let i = from; i <= to; i += 1) out[i] = value;
  return out;
}

/** The leftmost column of the island on each row. */
const LEFT = table([
  [7, 13, 11], [14, 15, 12], [16, 20, 11], [21, 22, 10], [23, 25, 9], [26, 26, 8],
  [27, 28, 7], [29, 29, 6], [30, 30, 5], [31, 32, 4], [33, 40, 3], [41, 45, 2],
  [46, 49, 3], [50, 51, 4], [52, 53, 5], [54, 54, 6], [55, 56, 7], [57, 57, 8],
  [58, 58, 9], [59, 61, 10], [62, 62, 11], [63, 64, 12], [65, 65, 13], [66, 66, 14],
  [67, 68, 15], [69, 69, 16], [70, 71, 17], [72, 72, 18], [73, 73, 20], [74, 74, 22],
  [75, 75, 24], [76, 76, 26], [77, 77, 27], [78, 78, 28], [79, 79, 29], [80, 80, 31],
  [81, 81, 32], [82, 82, 33],
]);
/** The rightmost column on each row. */
const RIGHT = table([
  [7, 12, 51], [13, 13, 52], [14, 14, 53], [15, 15, 54], [16, 16, 55], [17, 17, 56],
  [18, 18, 57], [19, 19, 58], [20, 20, 59], [21, 21, 60], [22, 26, 61], [27, 30, 62],
  [31, 34, 63], [35, 35, 64], [36, 50, 65], [51, 53, 63], [54, 55, 62], [56, 56, 61],
  [57, 59, 60], [60, 60, 59], [61, 61, 58], [62, 63, 57], [64, 64, 56], [65, 65, 55],
  [66, 67, 51], [68, 68, 50], [69, 69, 49], [70, 70, 48], [71, 72, 47], [73, 73, 46],
  [74, 74, 45], [75, 75, 44], [76, 76, 42], [77, 77, 41], [78, 78, 39], [79, 79, 37],
  [80, 80, 36], [81, 81, 35], [82, 82, 34],
]);
/** The rearmost row of the island in each column, along the back. */
const BACK = table([
  [0, 10, 0], [11, 11, 16], [12, 15, 14], [16, 28, 13], [29, 32, 12], [33, 33, 11],
  [34, 35, 9], [36, 46, 7], [47, 49, 10], [50, 51, 12], [52, 52, 13], [53, 70, 0],
]);

/** Whether column c, row r is part of the island. */
function inside(c: number, r: number): boolean {
  if (r < FIRST_ROW || r > LAST_ROW) return false;
  return c >= LEFT[r] && c <= RIGHT[r] && r >= BACK[c];
}

/** The high terrace (four blocks): the frontmost row it reaches in each column. */
const HIGH = table([
  [33, 33, 14], [34, 34, 15], [35, 35, 16], [36, 36, 17], [37, 38, 18], [39, 39, 19],
  [40, 42, 20], [43, 46, 21], [47, 50, 18],
]);
/** The low terrace along the back left and middle (two blocks). */
const LOW = table([
  [15, 15, 18], [16, 16, 20], [17, 22, 22], [23, 24, 20], [25, 25, 19], [26, 36, 17],
]);
/** The low lobe in front and to the right of the high terrace (two blocks). */
const LOBE = table([
  [43, 43, 22], [44, 44, 23], [45, 45, 24], [46, 48, 26], [49, 50, 25], [51, 51, 24],
  [52, 52, 22],
]);

/** How many blocks the top of a column stands above the lawn. */
function terrace(c: number, r: number): number {
  if (HIGH[c] !== undefined && r <= HIGH[c]) return 4;
  if (LOW[c] !== undefined && r <= LOW[c]) return 2;
  if (LOBE[c] !== undefined && r <= LOBE[c]) return 2;
  return 0;
}

/** The stone path at the back left: the columns it covers on each row. */
const PATH: Record<number, [number, number]> = {
  17: [14, 14], 18: [13, 14], 19: [13, 15], 20: [12, 15], 21: [12, 16], 22: [12, 16],
  23: [11, 15], 24: [11, 14], 25: [10, 14], 26: [10, 13], 27: [10, 12],
};
function onPath(c: number, r: number): boolean {
  const span = PATH[r];
  return span !== undefined && c >= span[0] && c <= span[1] && terrace(c, r) === 0;
}

/** The pool: the columns of water on each row, and the channel it spills by. */
const POOL: Record<number, [number, number]> = {
  55: [51, 54], 56: [50, 55], 57: [49, 56], 58: [48, 56], 59: [48, 56], 60: [48, 56],
  61: [48, 55], 62: [48, 54], 63: [49, 54], 64: [50, 54], 65: [53, 54],
};
function inPool(c: number, r: number): boolean {
  const span = POOL[r];
  return span !== undefined && c >= span[0] && c <= span[1];
}
/** The channel's columns and the row whose front face the water falls from. */
const FALL = { from: 53, to: 54, row: 65 };

/**
 * The five trees: the back-left corner of the two-by-two trunk, how many
 * blocks tall the trunk is, and the crown's half-widths (across, up, deep).
 */
const TREES = [
  { c: 7, r: 43, trunk: 5, crown: [5.2, 4.8, 4.7] },
  { c: 19, r: 19, trunk: 4, crown: [4.0, 3.9, 3.6] },
  { c: 43, r: 16, trunk: 5, crown: [5.4, 5.0, 4.9] },
  { c: 55, r: 23, trunk: 4, crown: [3.9, 3.9, 3.6] },
  { c: 61, r: 46, trunk: 5, crown: [4.6, 4.4, 4.2] },
] as const;

/** The four bushes: the middle of each, in blocks (halves allowed). */
const BUSHES: Array<[number, number]> = [
  [6.5, 50.5],
  [31, 15.5],
  [55.5, 49],
  [43.5, 68.5],
];

/**
 * The five rock piles. Each rock is a cube a block and a half on a side
 * (three half blocks), given by its back-left corner in half blocks and how
 * many half blocks up from the ground it sits: three on the ground and one
 * on top, as most of the picture's piles are; the one on the high terrace's
 * edge is three in a row stepping down.
 */
const ROCKS: Array<Array<[number, number, number]>> = [
  [[16, 106, 0], [19, 106, 0], [17, 109, 0], [17, 107, 3]],
  [[68, 24, 0], [71, 24, 0], [69, 27, 0], [69, 25, 3]],
  [[114, 100, 0], [117, 100, 0], [115, 103, 0], [115, 101, 3]],
  [[90, 132, 0], [93, 132, 0], [91, 135, 0], [91, 133, 3]],
  [[98, 38, 0], [95, 40, 0], [92, 43, 0]],
];

/** Where the figure in the pictures stands: the game starts here. */
const START = { c: 15, r: 62 };

// ---- Colours, sampled from the pictures ----------------------------------------

type Kind =
  | 'grass'
  | 'dirt'
  | 'stone'
  | 'path'
  | 'wood'
  | 'leafTop'
  | 'leaf'
  | 'leafLow'
  | 'bush'
  | 'bushLow'
  | 'berry'
  | 'rock'
  | 'cloud';

const COLOURS: Record<Kind, string> = {
  grass: '#a2dc10',
  dirt: '#e88a4c',
  stone: '#b3a9bd',
  path: '#f0e4d2',
  wood: '#a5632f',
  leafTop: '#c2ee22',
  leaf: '#a2da16',
  leafLow: '#6cae10',
  bush: '#7ccc1c',
  bushLow: '#4fa414',
  berry: '#f4622a',
  rock: '#d8ccd4',
  cloud: '#ffffff',
};

// ---- Cubes -----------------------------------------------------------------

/** A set of cubes on one grid: where they are and what they are. */
class Cells {
  private readonly map = new Map<number, Kind>();
  constructor(
    /** The size of a cube, in metres. */
    readonly size: number,
    /** Where cell 0,0,0's lowest corner is. */
    readonly origin: Vector3,
  ) {}
  private key(x: number, y: number, z: number) {
    return (x + 512) * 1048576 + (y + 512) * 1024 + (z + 512);
  }
  set(x: number, y: number, z: number, kind: Kind) {
    this.map.set(this.key(x, y, z), kind);
  }
  get(x: number, y: number, z: number): Kind | undefined {
    return this.map.get(this.key(x, y, z));
  }
  *entries(): Generator<[number, number, number, Kind]> {
    for (const [k, kind] of this.map) {
      const z = (k % 1024) - 512;
      const y = (Math.floor(k / 1024) % 1024) - 512;
      const x = Math.floor(k / 1048576) - 512;
      yield [x, y, z, kind];
    }
  }
}

/**
 * The faces of a set of cubes that can be seen, as one geometry: a face is
 * left out where another cube of the set is against it. Each face is
 * exactly on its cell and has a flat normal and its kind's colour, the same
 * on every cube: neighbouring faces that lie in one plane are one even,
 * matte colour, with no line between them. Only which way a face is turned
 * changes its shade, which is what shows the island's edges and steps.
 */
function facesOf(cells: Cells, only?: (kind: Kind) => boolean): BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const colours: number[] = [];
  const s = cells.size;
  const o = cells.origin;
  // Each side: its normal, and its four corners in the cube's 0–1 space
  // wound to face outward.
  const SIDES: Array<{ n: [number, number, number]; c: Array<[number, number, number]> }> = [
    { n: [1, 0, 0], c: [[1, 0, 1], [1, 0, 0], [1, 1, 0], [1, 1, 1]] },
    { n: [-1, 0, 0], c: [[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]] },
    { n: [0, 1, 0], c: [[0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0]] },
    { n: [0, -1, 0], c: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]] },
    { n: [0, 0, 1], c: [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]] },
    { n: [0, 0, -1], c: [[1, 0, 0], [0, 0, 0], [0, 1, 0], [1, 1, 0]] },
  ];
  const colour = new Color();
  for (const [x, y, z, kind] of cells.entries()) {
    if (only && !only(kind)) continue;
    // The painted face this replaced was a shade under white; the same
    // brightness is kept without it.
    colour.set(COLOURS[kind]).multiplyScalar(0.93);
    for (const side of SIDES) {
      const [nx, ny, nz] = side.n;
      const neighbour = cells.get(x + nx, y + ny, z + nz);
      if (neighbour && (!only || only(neighbour))) continue;
      // How the picture shades a cube: brightest on top, the side toward
      // the sun (the left) next, the front, then the sides turned away.
      const lit = ny > 0 ? 1 : ny < 0 ? 0.55 : nx < 0 ? 0.9 : nz > 0 ? 0.8 : nx > 0 ? 0.68 : 0.72;
      // A grass block's sides are a deeper green than its top, which is
      // what makes each terrace step stand out from the lawn above it.
      const grassSide = ny === 0 && kind === 'grass' ? 0.78 : 1;
      for (const i of [0, 1, 2, 0, 2, 3]) {
        const corner = side.c[i];
        positions.push(o.x + (x + corner[0]) * s, o.y + (y + corner[1]) * s, o.z + (z + corner[2]) * s);
        normals.push(nx, ny, nz);
        colours.push(colour.r * lit * grassSide, colour.g * lit * grassSide, colour.b * lit * grassSide);
      }
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3));
  geometry.setAttribute('color', new BufferAttribute(new Float32Array(colours), 3));
  return geometry;
}

/** Water: bright cyan with pale lines like light on its surface. */
function waterTexture(): CanvasTexture {
  const size = 32;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = '#12dff4';
    context.fillRect(0, 0, size, size);
    context.strokeStyle = 'rgba(210,252,255,0.85)';
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(2, 9);
    context.quadraticCurveTo(9, 3, 16, 9);
    context.quadraticCurveTo(23, 15, 30, 9);
    context.moveTo(0, 24);
    context.quadraticCurveTo(8, 18, 16, 24);
    context.quadraticCurveTo(24, 30, 32, 24);
    context.stroke();
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  return texture;
}

// ---- The island -------------------------------------------------------------

export interface VoxelIslandWorld {
  root: Group;
  solid: Group;
  carryables: Carryable[];
  water: { update(time: number): void };
  checkpoints: Vector3[];
  spawn: Vector3;
  spawnFacing: number;
  triangleCount: number;
  /** How high the top of the solid ground is at a point, or null off the island. */
  topAt(x: number, z: number): number | null;
  /** The middle of each column of the island, for tests. */
  columns: Array<{ x: number; z: number; top: number }>;
  /** Where the trees stand, for tests. */
  trunks: Array<{ x: number; z: number }>;
  /** Named places a test walks between, as points on the ground. */
  marks: Record<string, { x: number; z: number }>;
  /** Places near the edge and the way out over it from each, for tests. */
  edgeRuns: Array<{ x: number; z: number; dx: number; dz: number }>;
  /** The box the island's top fits in, in metres. */
  bounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  /** The two reference views: where to look from, at what, and how wide. */
  views: Record<'overhead' | 'angled', { from: Vector3; at: Vector3; fov: number }>;
  /** Where the light comes from in the pictures. */
  sunDirection: Vector3;
}

export function buildVoxelIsland(scene: Scene, collision: CollisionWorld): VoxelIslandWorld {
  const root = new Group();
  root.name = 'block-island';
  scene.add(root);
  const solid = new Group();
  solid.name = 'block-island-solid';
  root.add(solid);

  // Cell (MID_COL, 0, MID_ROW) has its lowest corner at x = 0, z = 0, and
  // the top of the lawn (the top of the cells at y = 0) is at height 0.
  const origin = new Vector3(-MID_COL * BLOCK, -BLOCK, -MID_ROW * BLOCK);
  const ground = new Cells(BLOCK, origin);
  const props = new Cells(BLOCK, origin);
  const fine = new Cells(BLOCK / 2, origin);
  const crowns = new Cells(BLOCK / 2, origin);
  const worldX = (c: number) => origin.x + (c + 0.5) * BLOCK;
  const worldZ = (r: number) => origin.z + (r + 0.5) * BLOCK;

  // How far each column is from the edge, in blocks: 1 at the rim.
  const edge = new Map<string, number>();
  {
    let frontier: Array<[number, number]> = [];
    for (let r = FIRST_ROW; r <= LAST_ROW; r += 1) {
      for (let c = 0; c < 70; c += 1) {
        if (!inside(c, r)) continue;
        if (!inside(c - 1, r) || !inside(c + 1, r) || !inside(c, r - 1) || !inside(c, r + 1)) {
          edge.set(`${c},${r}`, 1);
          frontier.push([c, r]);
        }
      }
    }
    for (let d = 2; frontier.length > 0; d += 1) {
      const next: Array<[number, number]> = [];
      for (const [c, r] of frontier) {
        for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const k = `${c + dc},${r + dr}`;
          if (!inside(c + dc, r + dr) || edge.has(k)) continue;
          edge.set(k, d);
          next.push([c + dc, r + dr]);
        }
      }
      frontier = next;
    }
  }
  const edgeOf = (c: number, r: number) => edge.get(`${c},${r}`) ?? 0;

  // ---- The ground ----
  /** The cell that is the top of column c, r: 0 on the lawn. */
  const topCell = new Map<string, number>();
  const columns: VoxelIslandWorld['columns'] = [];
  for (let r = FIRST_ROW; r <= LAST_ROW; r += 1) {
    for (let c = 0; c < 70; c += 1) {
      if (!inside(c, r)) continue;
      const pool = inPool(c, r);
      const top = pool ? -1 : terrace(c, r);
      // Grass on top (the path where it runs, earth under the water), earth
      // under it down to three blocks below the lawn — two at the very rim,
      // where the picture shows it thinner.
      ground.set(c, top, r, pool ? 'dirt' : onPath(c, r) ? 'path' : 'grass');
      const d = edgeOf(c, r);
      const dirtBottom = d <= 1 ? -2 : -3;
      for (let y = top - 1; y >= dirtBottom; y -= 1) ground.set(c, y, r, 'dirt');
      // Stone under that, in two-block chunks: one chunk at the rim, deeper
      // toward the middle, each chunk's depth set by where it is.
      const gc = Math.floor(c / 2);
      const gr = Math.floor(r / 2);
      let near = Infinity;
      for (const [dc, dr] of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
        const e = edgeOf(gc * 2 + dc, gr * 2 + dr);
        near = Math.min(near, e);
      }
      // A fixed stagger so neighbouring chunks do not end level.
      const stagger = ((gc * 7 + gr * 13) % 5) / 5;
      const chunks = near <= 1 ? 1 : Math.min(8, Math.max(1, Math.round(1 + near * 0.19 + stagger * 0.9)));
      const stoneTop = dirtBottom - 1;
      const stoneBottom = -2 - chunks * 2;
      for (let y = stoneTop; y >= stoneBottom; y -= 1) ground.set(c, y, r, 'stone');
      topCell.set(`${c},${r}`, top);
      columns.push({ x: worldX(c), z: worldZ(r), top: (top + 1) * BLOCK - BLOCK });
    }
  }
  const topOf = (c: number, r: number) => topCell.get(`${c},${r}`) ?? 0;

  // ---- Trees ----
  const trunks: VoxelIslandWorld['trunks'] = [];
  for (const tree of TREES) {
    const base = topOf(tree.c, tree.r) + 1;
    // The trunk, two blocks square.
    for (let y = 0; y < tree.trunk; y += 1) {
      for (const [dc, dr] of [[0, 0], [1, 0], [0, 1], [1, 1]]) props.set(tree.c + dc, base + y, tree.r + dr, 'wood');
    }
    // Roots flaring at its foot: one block out on each side, the front
    // pair a block further still, as the picture's trunks stand.
    for (const [dc, dr] of [[-1, 1], [2, 0], [0, 2], [1, -1], [-1, 2], [2, 2]]) {
      const c = tree.c + dc;
      const r = tree.r + dr;
      if (inside(c, r) && topOf(c, r) === base - 1) props.set(c, base, r, 'wood');
    }
    // And spreading into two short boughs under the crown.
    const fork = base + tree.trunk;
    props.set(tree.c - 1, fork - 1, tree.r, 'wood');
    props.set(tree.c + 2, fork - 1, tree.r + 1, 'wood');
    props.set(tree.c - 1, fork, tree.r, 'wood');
    props.set(tree.c + 2, fork, tree.r + 1, 'wood');
    trunks.push({ x: origin.x + (tree.c + 1) * BLOCK, z: origin.z + (tree.r + 1) * BLOCK });

    // The crown: a round, lumpy mass of half blocks — a middle and lobes
    // round it, each a ball — lightest on top, as the picture's are.
    const [rx, ry, rz] = tree.crown;
    const cx = (tree.c + 1) * 2;
    const cz = (tree.r + 1) * 2;
    const cy = (fork + ry * 0.4) * 2;
    const lobes: Array<[number, number, number, number]> = [
      [0, 0.05, 0, 0.66],
      [-0.58, -0.28, 0.1, 0.44],
      [0.58, -0.24, -0.1, 0.44],
      [0.06, -0.3, 0.58, 0.44],
      [-0.1, -0.24, -0.58, 0.44],
      [-0.34, 0.36, -0.22, 0.44],
      [0.34, 0.42, 0.24, 0.44],
      [0.42, -0.32, 0.42, 0.36],
      [-0.42, -0.32, -0.42, 0.36],
      [-0.2, 0.52, 0.3, 0.36],
      [0.44, 0.12, -0.44, 0.34],
      [-0.48, 0.08, 0.44, 0.34],
    ];
    const ex = rx * 2;
    const ey = ry * 2;
    const ez = rz * 2;
    for (let x = -Math.ceil(ex) - 1; x <= Math.ceil(ex) + 1; x += 1) {
      for (let y = -Math.ceil(ey) - 1; y <= Math.ceil(ey) + 1; y += 1) {
        for (let z = -Math.ceil(ez) - 1; z <= Math.ceil(ez) + 1; z += 1) {
          // How deep inside the crown this half block is: 0 at the surface.
          let inside = -Infinity;
          for (const [lx, ly, lz, lr] of lobes) {
            const d = Math.hypot((x + 0.5) / ex - lx, (y + 0.5) / ey - ly, (z + 0.5) / ez - lz);
            inside = Math.max(inside, lr - d);
          }
          // Lumps a block across stand out of the surface in a fixed
          // pattern, the clustered look of the picture's crowns.
          const lump = ((Math.floor((x + 64) / 2) * 5 + Math.floor((y + 64) / 2) * 3 + Math.floor((z + 64) / 2) * 7) % 4) * 0.035;
          inside += lump - 0.05;
          // Only a shell is kept: the inside of a crown is never seen.
          if (inside < 0 || inside > 0.22) continue;
          const height = (y + 0.5) / ey;
          crowns.set(cx + x, Math.round(cy) + y, cz + z, height > 0.2 ? 'leafTop' : height > -0.3 ? 'leaf' : 'leafLow');
        }
      }
    }
  }

  // ---- Bushes: a low ball of half blocks, with berries set in a pattern ----
  for (const [bc, br] of BUSHES) {
    const base = (topOf(Math.floor(bc), Math.floor(br)) + 1) * 2;
    const cx = Math.round(bc * 2);
    const cz = Math.round(br * 2);
    const R = 3.7;
    for (let x = -4; x <= 4; x += 1) {
      for (let y = 0; y <= 6; y += 1) {
        for (let z = -4; z <= 4; z += 1) {
          const d = Math.hypot(x + 0.5, (y - 2) * 1.05, z + 0.5);
          if (d > R) continue;
          const surface = d > R - 1.1;
          const berry = surface && y >= 1 && (x * 3 + y * 5 + z * 7 + 70) % 9 === 0;
          fine.set(cx + x, base + y, cz + z, berry ? 'berry' : y >= 3 ? 'bush' : 'bushLow');
        }
      }
    }
  }

  // ---- Rocks: cubes three half blocks on a side ----
  const rocks = new Cells(BLOCK / 2, origin);
  for (const pile of ROCKS) {
    for (const [hc, hr, up] of pile) {
      const base = (topOf(Math.floor(hc / 2), Math.floor(hr / 2)) + 1) * 2 + up;
      for (let x = 0; x < 3; x += 1) {
        for (let y = 0; y < 3; y += 1) {
          for (let z = 0; z < 3; z += 1) rocks.set(hc + x, base + y, hr + z, 'rock');
        }
      }
    }
  }

  // ---- Clouds: three heaps of white blocks, as in the pictures — a large
  // one to the left, a small one in the middle, a large one to the right.
  // They hang over the back of the island, well above the trees; that is
  // where they have to be to sit where they do in both pictures at once.
  const sky = new Cells(BLOCK, origin);
  const CLOUDS: Array<{ c: number; y: number; r: number; half: number; tall: number }> = [
    { c: -3, y: 17, r: 24, half: 8, tall: 7 },
    { c: 33, y: 19, r: 10, half: 3, tall: 3 },
    { c: 71, y: 17, r: 24, half: 8, tall: 7 },
  ];
  for (const cloud of CLOUDS) {
    for (let x = -cloud.half; x <= cloud.half; x += 1) {
      for (let z = -2; z <= 2; z += 1) {
        const across = Math.abs(x + 1.5) / (cloud.half + 1);
        // Flat underneath, heaped on top, highest left of the middle.
        const height = Math.round(cloud.tall * (1 - across ** 1.5) - Math.abs(z) * 0.8 + ((x + 40) % 3 === 0 ? 0.6 : 0));
        for (let y = 0; y < height; y += 1) sky.set(cloud.c + x, cloud.y + y, cloud.r + z, 'cloud');
      }
    }
  }

  // ---- Meshes ----
  // Drawn with the colours as they are, not passed through the film curve
  // the rest of the game uses: the pictures are bright and saturated, and
  // that curve greys them.
  // Matte and untextured: each surface is its colour and its light, nothing
  // painted on.
  const material = new MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0 });
  material.toneMapped = false;
  const mesh = (name: string, geometry: BufferGeometry, parent: Group, shadows = true) => {
    const m = new Mesh(geometry, material);
    m.name = name;
    m.castShadow = shadows;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  };
  mesh('block-ground', facesOf(ground), solid);
  mesh('block-trunks', facesOf(props, (k) => k === 'wood'), solid);
  mesh('block-rocks', facesOf(rocks), solid);
  // Leaves and bushes: he passes through them. Named for what they are, so
  // the check for things with body that are not solid can say why.
  const crownMesh = mesh('foliage', facesOf(crowns), root);
  crownMesh.userData.thickest = BLOCK / 2;
  const bushes = mesh('foliage', facesOf(fine), root);
  bushes.userData.thickest = BLOCK / 2;
  const clouds = mesh('clouds', facesOf(sky), root, false);
  clouds.userData.thickest = 0;
  // The clouds are a long way off and should not grey out with distance.
  const cloudMaterial = material.clone();
  cloudMaterial.fog = false;
  cloudMaterial.toneMapped = false;
  cloudMaterial.emissive = new Color('#c9d2f6');
  cloudMaterial.emissiveIntensity = 0.3;
  clouds.material = cloudMaterial;

  // ---- Light ----
  // The pictures are lit softly from every side as well as by the sun: the
  // faces turned away from it are still bright. The game's own lights are a
  // sun and a little sky; these fill in the rest for this world.
  const fill = new AmbientLight('#ffffff', 1.0);
  fill.name = 'block-island-fill';
  root.add(fill);
  const front = new DirectionalLight('#fff6e6', 0.6);
  front.name = 'block-island-front';
  front.position.set(-12, 14, 40);
  root.add(front);
  root.add(front.target);

  // ---- The pool and the waterfall ----
  const waterTex = waterTexture();
  const fallTex = waterTexture();
  // Unlit, so it is the same bright cyan in sun and in shade, as it is in
  // the pictures.
  const waterMaterial = new MeshBasicMaterial({
    map: waterTex,
    transparent: true,
    opacity: 0.94,
    side: DoubleSide,
    depthWrite: false,
  });
  waterMaterial.toneMapped = false;
  const fallMaterial = waterMaterial.clone();
  fallMaterial.map = fallTex;
  fallMaterial.opacity = 0.82;
  const quads = (list: number[][][]) => {
    const positions: number[] = [];
    const uvs: number[] = [];
    for (const q of list) {
      for (const i of [0, 1, 2, 0, 2, 3]) {
        positions.push(q[i][0], q[i][1], q[i][2]);
        uvs.push(q[i][3], q[i][4]);
      }
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
    geometry.computeVertexNormals();
    return geometry;
  };
  const level = -BLOCK * 0.3;
  {
    // The surface: one square per pool block, a third of a block below the
    // lawn, as the picture's water sits in its banks.
    const list: number[][][] = [];
    for (const [row, [from, to]] of Object.entries(POOL)) {
      const r = Number(row);
      for (let c = from; c <= to; c += 1) {
        const x0 = origin.x + c * BLOCK;
        const z0 = origin.z + r * BLOCK;
        list.push([
          [x0, level, z0 + BLOCK, c / 2, (r + 1) / 2],
          [x0 + BLOCK, level, z0 + BLOCK, (c + 1) / 2, (r + 1) / 2],
          [x0 + BLOCK, level, z0, (c + 1) / 2, r / 2],
          [x0, level, z0, c / 2, r / 2],
        ]);
      }
    }
    const surface = new Mesh(quads(list), waterMaterial);
    surface.name = 'pool';
    root.add(surface);
  }
  {
    // The fall: a sheet two blocks wide down the front of the island from
    // the channel, thinning to separate drops below.
    const list: number[][][] = [];
    const front = origin.z + (FALL.row + 1) * BLOCK + 0.03;
    const x0 = origin.x + FALL.from * BLOCK;
    const width = (FALL.to - FALL.from + 1) * BLOCK;
    const sheet = 6;
    list.push([
      [x0, level - sheet * BLOCK, front, 0, 0],
      [x0 + width, level - sheet * BLOCK, front, 1, 0],
      [x0 + width, level, front, 1, sheet / 2],
      [x0, level, front, 0, sheet / 2],
    ]);
    // The drops: half-block squares in a fixed pattern, fewer the lower.
    const DROPS: Array<[number, number]> = [
      [0.2, 6.3], [1.3, 6.6], [0.8, 7.2], [1.6, 7.7], [0.3, 8.1], [1.0, 8.8],
      [0.5, 9.5], [1.4, 10.0], [0.9, 10.8], [0.7, 11.8], [1.1, 13.0],
    ];
    for (const [dx, down] of DROPS) {
      const xa = x0 + dx * BLOCK;
      const ya = level - down * BLOCK;
      const h = BLOCK * 0.45;
      list.push([
        [xa, ya - h, front, 0, 0],
        [xa + h, ya - h, front, 0.25, 0],
        [xa + h, ya, front, 0.25, 0.25],
        [xa, ya, front, 0, 0.25],
      ]);
    }
    const fall = new Mesh(quads(list), fallMaterial);
    fall.name = 'waterfall';
    root.add(fall);
  }

  collision.addSolid(solid);

  const cell = (c: number, r: number) => ({ x: worldX(c), z: worldZ(r) });
  const spawn = new Vector3(worldX(START.c), 0.05, worldZ(START.r));
  const topAt = (x: number, z: number): number | null => {
    const c = Math.floor((x - origin.x) / BLOCK);
    const r = Math.floor((z - origin.z) / BLOCK);
    if (!inside(c, r)) return null;
    return topOf(c, r) * BLOCK;
  };

  let triangleCount = 0;
  root.traverse((object) => {
    if (object instanceof Mesh) triangleCount += object.geometry.attributes.position.count / 3;
  });

  // The middle of the island's top, which both reference views look at.
  const middle = new Vector3(worldX(34), 0, worldZ(44));
  const from = (elevation: number, distance: number, target: Vector3) => {
    const e = (elevation * Math.PI) / 180;
    return target.clone().add(new Vector3(0, Math.sin(e) * distance, Math.cos(e) * distance));
  };
  const overheadAt = middle.clone().add(new Vector3(0, 0, 0.6));
  const angledAt = middle.clone().add(new Vector3(0, -2.2, 0));

  return {
    root,
    solid,
    carryables: [],
    water: {
      update(time: number) {
        waterTex.offset.set(time * 0.04, time * 0.025);
        fallTex.offset.set(0, time * 0.9);
      },
    },
    checkpoints: [spawn.clone()],
    spawn,
    spawnFacing: Math.PI,
    triangleCount: Math.round(triangleCount),
    topAt,
    columns,
    trunks,
    marks: {
      lawnBeforeTerrace: cell(27, 21),
      terrace: cell(27, 15),
      terraceBeforeHigh: cell(34, 17),
      high: cell(38, 17),
      lawnBelowHigh: cell(38, 24),
      besidePool: cell(51, 51),
      inPool: cell(51, 59),
    },
    edgeRuns: [
      { ...cell(7, 36), dx: -1, dz: 0 },
      { ...cell(14, 60), dx: -1, dz: 1 },
      { ...cell(26, 73), dx: -1, dz: 1 },
      { ...cell(33, 78), dx: 0, dz: 1 },
      { ...cell(41, 73), dx: 1, dz: 1 },
      { ...cell(58, 56), dx: 1, dz: 0 },
      { ...cell(59, 30), dx: 1, dz: 0 },
      { ...cell(22, 68), dx: -1, dz: 1 },
    ],
    bounds: {
      minX: origin.x + 2 * BLOCK,
      maxX: origin.x + 66 * BLOCK,
      minZ: origin.z + FIRST_ROW * BLOCK,
      maxZ: origin.z + (LAST_ROW + 1) * BLOCK,
    },
    views: {
      // The overhead picture: from 45 degrees up, far enough off that the
      // blocks stay square to the screen.
      overhead: { from: from(45, 150, overheadAt), at: overheadAt, fov: 12.1 },
      // The angled picture: lower and closer.
      angled: { from: from(18, 64, angledAt), at: angledAt, fov: 26 },
    },
    // From high up to the left and behind, where the sun glows at the top
    // left of both pictures: shadows fall to the right and toward the front.
    sunDirection: new Vector3(-0.5, 0.75, -0.42).normalize(),
  };
}
