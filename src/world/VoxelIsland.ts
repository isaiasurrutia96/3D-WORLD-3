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
  BoxGeometry,
  CanvasTexture,
  CircleGeometry,
  CylinderGeometry,
  PlaneGeometry,
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

const FIRST_ROW = 8;
const LAST_ROW = 69;
/** The column and row that sit at the middle of the world. */
const MID_COL = 34;
const MID_ROW = 45;

/**
 * The island's outline (columns, rows), seen from above: a broad, blunt
 * five-sided shape, as the golf-island picture shows it from its front
 * corner. The cells along its slanted sides step, as the picture's do.
 */
const OUTLINE: Array<[number, number]> = [
  [10, 65], [60, 69], [66, 59], [67, 22], [60, 10], [30, 9], [18, 12], [6, 30], [5, 53],
];
function inside(c: number, r: number): boolean {
  if (r < FIRST_ROW || r > LAST_ROW) return false;
  const x = c + 0.5;
  const y = r + 0.5;
  let odd = false;
  for (let i = 0, j = OUTLINE.length - 1; i < OUTLINE.length; j = i, i += 1) {
    const [xi, yi] = OUTLINE[i];
    const [xj, yj] = OUTLINE[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) odd = !odd;
  }
  return odd;
}

/** The front edge of the raised strip along the back, in each stretch of columns. */
function backLine(c: number): number {
  if (c < 14) return 27;
  if (c < 26) return 25;
  if (c < 35) return 22;
  if (c < 44) return 20;
  return 22;
}
/** The stairs up to the back strip: columns, on the row in front of it. */
const STAIRS = { from: 14, to: 17 };

/** How many blocks the top of a column stands above the lawn. */
function terrace(c: number, r: number): number {
  // The higher step at the back right.
  if ((c >= 44 && r <= 15) || (c >= 50 && r <= 17)) return 4;
  if (r <= backLine(c)) return 2;
  if (c >= STAIRS.from && c <= STAIRS.to && r === backLine(c) + 1) return 1;
  return 0;
}

/** The sand path: across the back strip, down the stairs and onto the lawn. */
const PATH: Record<number, [number, number]> = {
  16: [19, 20], 17: [18, 20], 18: [18, 19], 19: [17, 19], 20: [17, 19], 21: [16, 18],
  22: [16, 18], 23: [15, 18], 24: [15, 17], 25: [14, 17], 26: [14, 17], 27: [14, 17],
  28: [13, 16], 29: [13, 15],
};
function onPath(c: number, r: number): boolean {
  const span = PATH[r];
  return span !== undefined && c >= span[0] && c <= span[1];
}

/** The pool near the front corner: its water on each row, and the channel it spills by. */
const POOL: Record<number, [number, number]> = {
  57: [53, 57], 58: [52, 58], 59: [51, 59], 60: [51, 59], 61: [51, 59], 62: [52, 58],
  63: [52, 57], 64: [52, 55], 65: [52, 53], 66: [52, 53], 67: [52, 53],
};
function inPool(c: number, r: number): boolean {
  const span = POOL[r];
  return span !== undefined && c >= span[0] && c <= span[1] && inside(c, r);
}
/** The channel's columns and the row whose front face the water falls from. */
const FALL = { from: 52, to: 53, row: 67 };

/** The putting green: an L of short dark grass with a raised cream rim. */
function inGreen(c: number, r: number): boolean {
  return (c >= 20 && c <= 44 && r >= 33 && r <= 39) || (c >= 20 && c <= 27 && r >= 39 && r <= 48);
}
/** Where the hole and its flag are, and the tee at the other end. */
const HOLE = { c: 41, r: 36 };
const TEE = { c: 23, r: 45 };

/**
 * The five trees: the back-left corner of the two-by-two trunk, how many
 * blocks tall the trunk is, and the crown's half-widths (across, up, deep).
 */
const TREES = [
  { c: 11, r: 43, trunk: 5, crown: [3.8, 3.4, 3.8] },
  { c: 22, r: 13, trunk: 5, crown: [3.8, 3.4, 3.8] },
  { c: 47, r: 10, trunk: 5, crown: [3.8, 3.4, 3.8] },
  { c: 61, r: 25, trunk: 5, crown: [3.8, 3.4, 3.8] },
  { c: 58, r: 46, trunk: 5, crown: [3.8, 3.4, 3.8] },
] as const;

/** The four flower bushes: the middle of each, in blocks (halves allowed). */
const BUSHES: Array<[number, number]> = [
  [9, 50],
  [38.5, 14],
  [48.5, 61],
  [57.5, 53],
];

/** White daisies dotted on the lawn: the half-block cells of each. */
const DAISIES: Array<[number, number]> = [
  [18, 116], [26, 120], [34, 124], [36, 46], [122, 124], [124, 100], [40, 66], [90, 50],
];

/**
 * The four rocks, each a pair of cubes a block and a half on a side (three
 * half blocks) with a third on top of one: given by back-left corners in
 * half blocks and how many half blocks up each sits.
 */
const ROCKS: Array<Array<[number, number, number]>> = [
  [[14, 104, 0], [17, 104, 0], [17, 104, 3]],
  [[82, 30, 0], [85, 30, 0], [85, 30, 3]],
  [[94, 118, 0], [97, 118, 0], [97, 118, 3]],
  [[108, 100, 0], [111, 100, 0], [111, 100, 3]],
];

/** Where the game starts: on the lawn in front of the green. */
const START = { c: 32, r: 54 };

/**
 * The bridge to the race circuit: a deck of planks off the east edge, from
 * the first column past the island for LENGTH blocks, across rows FROM to
 * TO, with a low rail along each side. Its far end is where the circuit's
 * own entry ramp begins. The rows are clear of the tree and the rock pile
 * on that side.
 */
const BRIDGE = { firstCol: 66, length: 48, from: 35, to: 45 };

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
  | 'green'
  | 'curb'
  | 'daisy'
  | 'rock'
  | 'cloud'
  | 'plank';

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
  plank: '#c98f55',
  green: '#58c26e',
  curb: '#f3dfb2',
  daisy: '#ffffff',
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
 * How many grid cells across one drawn cube is, for kinds bigger than their
 * grid: a rock is three half blocks.
 */
const CUBE_CELLS: Partial<Record<Kind, number>> = { rock: 3 };

/** How round a block's exposed edges and corners are, as a part of a block. */
const ROUND = 0.3;

/**
 * Which material group a kind belongs to. Each group is one continuous,
 * rounded shape: where it meets a different group (grass on dirt, dirt on
 * stone) both are rounded, so the groups read as separate soft layers.
 */
function groupOf(kind: Kind): string {
  if (kind === 'path') return 'grass';
  if (kind === 'plank') return 'wood';
  return kind;
}


/**
 * The faces of a set of cubes that can be seen, as one geometry: a face is
 * left out where another cube of the set is against it.
 *
 * Every block is rounded where it is exposed. Where two of its faces that
 * can both be seen meet — the edge of a terrace, the rim of the island, the
 * corner of a rock — the edge and the corner really curve: the face is cut
 * finer near that edge and each point is pulled onto a rounded cube, so the
 * outline of the island is made of soft blocks. Two neighbouring faces round
 * the same edge onto the same curve, so they meet with no gap. Where a block
 * lies flat against another the faces stay flat and meet, so the blocks
 * read as one solid; each block is told apart only by its slight shade.
 */
function facesOf(
  cells: Cells,
  only?: (kind: Kind) => boolean,
  round = true,
  curveSteps = 2,
  /** Blocks built elsewhere that join these (the circuit's entry): they count as there. */
  beyond?: (x: number, y: number, z: number) => boolean,
): BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const colours: number[] = [];
  const uvs: number[] = [];
  const s = cells.size;
  const o = cells.origin;
  const r = round ? ROUND : 0;
  let group = '';
  let level = 0;
  // A different material counts as there beside a block (the layers run on
  // level, square), but not above or below it: where one material sits on
  // another, each is rounded, so the layers show as separate soft bands.
  const solidAt = (x: number, y: number, z: number) => {
    const k = cells.get(x, y, z);
    if (k === undefined) return beyond?.(x, y, z) ?? false;
    return (!only || only(k)) && (y === level || groupOf(k) === group);
  };
  // Each side: its normal axis and sign, and the two axes across it.
  const SIDES: Array<{ a: number; sign: 1 | -1; u: number; v: number }> = [
    { a: 0, sign: 1, u: 2, v: 1 },
    { a: 0, sign: -1, u: 2, v: 1 },
    { a: 1, sign: 1, u: 0, v: 2 },
    { a: 1, sign: -1, u: 0, v: 2 },
    { a: 2, sign: 1, u: 0, v: 1 },
    { a: 2, sign: -1, u: 0, v: 1 },
  ];
  /**
   * Where to cut a face across one axis: finer toward each rounded edge.
   * Two steps round a big block smoothly; one is enough for small ones
   * (leaves, bushes, clouds), whose curve is lit smoothly either way.
   */
  const cuts = (low: boolean, high: boolean) => {
    const band = curveSteps >= 2 ? [0.4, 1] : [1];
    const out = [0];
    if (low) for (const b of band) out.push(b * r);
    if (high) for (const b of [...band].reverse()) out.push(1 - b * r);
    out.push(1);
    return out;
  };
  const colour = new Color();
  const p = [0, 0, 0];
  const q = [0, 0, 0];
  for (const [x, y, z, kind] of cells.entries()) {
    if (only && !only(kind)) continue;
    group = groupOf(kind);
    level = y;
    const across = CUBE_CELLS[kind] ?? 1;
    colour.set(COLOURS[kind]);
    const cell = [x, y, z];
    // Which of the block's six sides can be seen: those are the ones it is
    // rounded toward.
    const open = [
      [!solidAt(x - 1, y, z), !solidAt(x + 1, y, z)],
      [!solidAt(x, y - 1, z), !solidAt(x, y + 1, z)],
      [!solidAt(x, y, z - 1), !solidAt(x, y, z + 1)],
    ];
    /**
     * A hidden side of this block, against a neighbour, can still show a
     * sliver at a corner: where the neighbour rounds off an edge that runs
     * into this block and this block does not round the same way (an inner
     * corner of a stepped outline). That corner of the hidden side is drawn,
     * a square as wide as the rounding, so there is no gap to see through.
     */
    const fillCorners = (side: (typeof SIDES)[number]) => {
      if (r <= 0) return;
      const step = [0, 0, 0];
      step[side.a] = side.sign;
      const n = [x + step[0], y + step[1], z + step[2]];
      for (const su of [0, 1]) {
        for (const sv of [0, 1]) {
          const du = [0, 0, 0];
          const dv = [0, 0, 0];
          du[side.u] = su ? 1 : -1;
          dv[side.v] = sv ? 1 : -1;
          const neighbourOpenU = !solidAt(n[0] + du[0], n[1] + du[1], n[2] + du[2]);
          const neighbourOpenV = !solidAt(n[0] + dv[0], n[1] + dv[1], n[2] + dv[2]);
          if (!neighbourOpenU || !neighbourOpenV) continue;
          if (open[side.u][su] && open[side.v][sv]) continue;
          const u0 = su ? 1 - r : 0;
          const u1 = su ? 1 : r;
          const v0 = sv ? 1 - r : 0;
          const v1 = sv ? 1 : r;
          const at = (pu: number, pv: number) => {
            const c = [0, 0, 0];
            c[side.a] = side.sign > 0 ? 1 : 0;
            c[side.u] = pu;
            c[side.v] = pv;
            return [o.x + (x + c[0]) * s, o.y + (y + c[1]) * s, o.z + (z + c[2]) * s];
          };
          const a = at(u0, v0);
          const b = at(u1, v0);
          const c = at(u1, v1);
          const d = at(u0, v1);
          const uxv = side.u === (side.a + 1) % 3 ? 1 : -1;
          const order = uxv * side.sign < 0 ? [a, c, b, a, d, c] : [a, b, c, a, c, d];
          const nx = side.a === 0 ? side.sign : 0;
          const ny = side.a === 1 ? side.sign : 0;
          const nz = side.a === 2 ? side.sign : 0;
          const lit = ny > 0 ? 1 : ny < 0 ? 0.55 : nx < 0 ? 0.9 : nz > 0 ? 0.8 : nx > 0 ? 0.68 : 0.72;
          for (const v of order) {
            positions.push(v[0], v[1], v[2]);
            normals.push(nx, ny, nz);
            uvs.push(0.5, 0.5);
            colours.push(colour.r * lit, colour.g * lit, colour.b * lit);
          }
        }
      }
    };
    for (const side of SIDES) {
      if (!open[side.a][side.sign > 0 ? 1 : 0]) {
        fillCorners(side);
        continue;
      }
      const nx = side.a === 0 ? side.sign : 0;
      const ny = side.a === 1 ? side.sign : 0;
      const nz = side.a === 2 ? side.sign : 0;
      // How the picture shades a cube: brightest on top, the side toward
      // the sun (the left) next, the front, then the sides turned away.
      const lit = ny > 0 ? 1 : ny < 0 ? 0.55 : nx < 0 ? 0.9 : nz > 0 ? 0.8 : nx > 0 ? 0.68 : 0.72;
      // A grass block's sides are a deeper green than its top, which is
      // what makes each terrace step stand out from the lawn above it.
      const grassSide = ny === 0 && kind === 'grass' ? 0.78 : 1;
      const cr = colour.r * lit * grassSide;
      const cg = colour.g * lit * grassSide;
      const cb = colour.b * lit * grassSide;
      const us = cuts(open[side.u][0], open[side.u][1]);
      const vs = cuts(open[side.v][0], open[side.v][1]);
      /** One point of the face, pulled onto the rounded block. */
      const point = (su: number, sv: number) => {
        p[side.a] = side.sign > 0 ? 1 : 0;
        p[side.u] = su;
        p[side.v] = sv;
        let dx = 0;
        let dy = 0;
        let dz = 0;
        for (let k = 0; k < 3; k += 1) {
          q[k] = p[k];
          if (r > 0 && p[k] > 1 - r && open[k][1]) q[k] = 1 - r;
          if (r > 0 && p[k] < r && open[k][0]) q[k] = r;
        }
        dx = p[0] - q[0];
        dy = p[1] - q[1];
        dz = p[2] - q[2];
        const l = Math.hypot(dx, dy, dz);
        let px = p[0];
        let py = p[1];
        let pz = p[2];
        let mx = nx;
        let my = ny;
        let mz = nz;
        if (l > 1e-6) {
          mx = dx / l;
          my = dy / l;
          mz = dz / l;
          px = q[0] + mx * r;
          py = q[1] + my * r;
          pz = q[2] + mz * r;
        }
        return {
          pos: [o.x + (x + px) * s, o.y + (y + py) * s, o.z + (z + pz) * s],
          normal: [mx, my, mz],
          uv: [(cell[side.u] + su) / across, (cell[side.v] + sv) / across],
        };
      };
      for (let i = 0; i < us.length - 1; i += 1) {
        for (let j = 0; j < vs.length - 1; j += 1) {
          const a = point(us[i], vs[j]);
          const b = point(us[i + 1], vs[j]);
          const c = point(us[i + 1], vs[j + 1]);
          const d = point(us[i], vs[j + 1]);
          // Wound to face outward: u × v points along the normal for some
          // sides and against it for others.
          const uxv = [0, 0, 0];
          uxv[side.a] = (side.u === (side.a + 1) % 3 ? 1 : -1);
          const flip = uxv[side.a] * side.sign < 0;
          const order = flip ? [a, c, b, a, d, c] : [a, b, c, a, c, d];
          for (const v of order) {
            positions.push(v.pos[0], v.pos[1], v.pos[2]);
            normals.push(v.normal[0], v.normal[1], v.normal[2]);
            uvs.push(v.uv[0], v.uv[1]);
            colours.push(cr, cg, cb);
          }
        }
      }
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3));
  geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
  geometry.setAttribute('color', new BufferAttribute(new Float32Array(colours), 3));
  return geometry;
}

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
  /** The bridge to the circuit: its deck's outline in metres, and its top. */
  bridge: { minX: number; maxX: number; minZ: number; maxZ: number; top: number };
  /** Where the far end of the bridge meets the circuit's entry ramp. */
  circuitAnchor: { x: number; z: number };
  /** The island's block grid and its bridge, which the circuit carries on. */
  grid: { origin: Vector3; block: number; bridge: { firstCol: number; length: number; from: number; to: number } };
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
      const green = inGreen(c, r);
      const rim = green && (!inGreen(c - 1, r) || !inGreen(c + 1, r) || !inGreen(c, r - 1) || !inGreen(c, r + 1));
      ground.set(c, top, r, pool ? 'dirt' : onPath(c, r) ? 'path' : rim ? 'curb' : green ? 'green' : 'grass');
      // The green's rim stands a half block proud of the lawn.
      if (rim) for (const [dx, dz] of [[0, 0], [1, 0], [0, 1], [1, 1]]) fine.set(c * 2 + dx, (top + 1) * 2, r * 2 + dz, 'curb');
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

  // No bridge: the golf island stands on its own.

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
          crowns.set(cx + x, Math.round(cy) + y, cz + z, 'leaf');
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

  // ---- Daisies: a white half block each, two side by side ----
  for (const [hc, hr] of DAISIES) {
    const base = (topOf(Math.floor(hc / 2), Math.floor(hr / 2)) + 1) * 2;
    fine.set(hc, base, hr, 'daisy');
    fine.set(hc + 1, base, hr + 1, 'daisy');
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
  // Matte; blocks merge, rounded only where an edge faces the open air.
  const material = new MeshStandardMaterial({
    vertexColors: true,
    roughness: 1,
    metalness: 0,
  });
  material.toneMapped = false;
  const mesh = (name: string, geometry: BufferGeometry, parent: Group, shadows = true) => {
    const m = new Mesh(geometry, material);
    m.name = name;
    m.castShadow = shadows;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  };
  // The circuit's entry carries the bridge on, block for block: the end of
  // the bridge is not rounded off, so the two meet flush.
  const entryAt = (c: number, y: number, r: number) => {
    if (c < BRIDGE.firstCol + BRIDGE.length || r < BRIDGE.from || r > BRIDGE.to) return false;
    const edge = r === BRIDGE.from || r === BRIDGE.to;
    return y === 0 || y === -1 || (edge && y === 1) || (edge && y === 2 && (c - BRIDGE.firstCol) % 4 === 0);
  };
  // The circuit is not built now, so nothing joins the bridge's far end:
  // it is rounded off like any other open edge. Pass entryAt to bring it back.
  void entryAt;
  mesh('block-ground', facesOf(ground), solid);
  mesh('block-trunks', facesOf(props, (k) => k === 'wood'), solid);
  mesh('block-rocks', facesOf(rocks), solid);
  // Leaves and bushes: he passes through them. Named for what they are, so
  // the check for things with body that are not solid can say why.
  // The crowns are one solid green, with no lines between their blocks:
  // their roundness shows in the light alone.
  const crownMesh = mesh('foliage', facesOf(crowns, undefined, true, 1), root);
  const crownMaterial = material.clone();
  crownMaterial.map = null;
  crownMaterial.normalMap = null;
  crownMaterial.toneMapped = false;
  crownMesh.material = crownMaterial;
  crownMesh.userData.thickest = BLOCK / 2;
  const bushes = mesh('foliage', facesOf(fine, undefined, true, 1), root);
  bushes.userData.thickest = BLOCK / 2;
  const clouds = mesh('clouds', facesOf(sky, undefined, true, 1), root, false);
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

  // ---- The hole, its flag and the tee ----
  {
    const hx = worldX(HOLE.c);
    const hz = worldZ(HOLE.r);
    const hole = new Mesh(new CircleGeometry(0.13, 20), new MeshBasicMaterial({ color: '#1d1f22' }));
    hole.rotation.x = -Math.PI / 2;
    hole.position.set(hx, 0.006, hz);
    hole.name = 'golf hole';
    root.add(hole);
    const pole = new Mesh(new CylinderGeometry(0.025, 0.025, 1.7, 8), new MeshStandardMaterial({ color: '#f4f1ea', roughness: 0.6 }));
    pole.position.set(hx, 0.85, hz);
    pole.castShadow = true;
    pole.name = 'flag pole';
    root.add(pole);
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 80;
    const g = canvas.getContext('2d');
    if (g) {
      g.fillStyle = '#ec4b47';
      g.fillRect(0, 0, 128, 80);
      g.fillStyle = '#ffffff';
      g.font = 'bold 54px system-ui, sans-serif';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText('1', 50, 42);
    }
    const flagTex = new CanvasTexture(canvas);
    flagTex.colorSpace = SRGBColorSpace;
    const flagMat = new MeshBasicMaterial({ map: flagTex, side: DoubleSide });
    flagMat.toneMapped = false;
    const flag = new Mesh(new PlaneGeometry(0.62, 0.38), flagMat);
    flag.position.set(hx + 0.33, 1.5, hz);
    flag.name = 'flag';
    root.add(flag);
    const tee = new Mesh(new BoxGeometry(0.34, 0.03, 0.34), new MeshStandardMaterial({ color: '#f4f1ea', roughness: 0.8 }));
    tee.position.set(worldX(TEE.c), 0.015, worldZ(TEE.r));
    tee.name = 'golf tee';
    root.add(tee);
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
  const middle = new Vector3(worldX(36), 0, worldZ(40));
  // Seen from the front corner (south-east), as the picture is.
  const from = (elevation: number, distance: number, target: Vector3) => {
    const e = (elevation * Math.PI) / 180;
    const yaw = Math.PI / 4;
    const flat = Math.cos(e) * distance;
    return target.clone().add(new Vector3(Math.sin(yaw) * flat, Math.sin(e) * distance, Math.cos(yaw) * flat));
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
      lawnBeforeTerrace: cell(30, 25),
      terrace: cell(30, 17),
      terraceBeforeHigh: cell(46, 19),
      high: cell(54, 14),
      lawnBelowHigh: cell(54, 27),
      besidePool: cell(49, 56),
      inPool: cell(55, 60),
    },
    edgeRuns: [
      { ...cell(7, 40), dx: -1, dz: 0 },
      { ...cell(9, 60), dx: -1, dz: 1 },
      { ...cell(30, 66), dx: 0, dz: 1 },
      { ...cell(62, 66), dx: 1, dz: 1 },
      { ...cell(65, 40), dx: 1, dz: 0 },
      { ...cell(64, 16), dx: 1, dz: -1 },
    ],
    bridge: {
      minX: origin.x + BRIDGE.firstCol * BLOCK,
      maxX: origin.x + (BRIDGE.firstCol + BRIDGE.length) * BLOCK,
      minZ: origin.z + BRIDGE.from * BLOCK,
      maxZ: origin.z + (BRIDGE.to + 1) * BLOCK,
      top: 0,
    },
    grid: { origin: origin.clone(), block: BLOCK, bridge: { ...BRIDGE } },
    circuitAnchor: {
      x: origin.x + (BRIDGE.firstCol + BRIDGE.length) * BLOCK,
      z: origin.z + ((BRIDGE.from + BRIDGE.to + 1) / 2) * BLOCK,
    },
    bounds: {
      minX: origin.x + 2 * BLOCK,
      maxX: origin.x + 68 * BLOCK,
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
