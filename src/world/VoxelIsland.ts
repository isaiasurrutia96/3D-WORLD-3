/**
 * The block island: a small floating island built entirely of cubes, laid
 * out to match the reference picture the user chose.
 *
 * The scale is the picture's: a block is 0.45 m, so the character (1.82 m)
 * stands about four blocks tall, as the figure in the picture does. That
 * makes the island about 22 m by 18 m, which is small on purpose: it is for
 * testing the world itself, and will be expanded later.
 *
 * What it is made of, top to bottom: one block of grass, three of earth,
 * then grey stone narrowing in steps to a ragged point underneath. On top
 * there is a wide open lawn, a raised terrace along the back (two blocks)
 * with a higher step in its middle (three), a short stone path at the back left, five trees, four
 * berry bushes, five rock piles, and a pool in the front right corner that
 * spills over the edge as a waterfall. Block clouds float round it.
 *
 * What is solid: the ground blocks, tree trunks and rocks. What is not: the
 * leaves, bushes, water and clouds.
 *
 * Every block is a cell in a grid. The ground is drawn as one mesh of only
 * the faces that can be seen, each exactly on its cell, so what is drawn and
 * what is solid are the same surface with no gaps between blocks. The dark
 * line round each face is painted on, not a gap.
 */

import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshStandardMaterial,
  NearestFilter,
  LinearMipmapLinearFilter,
  RepeatWrapping,
  Scene,
  SRGBColorSpace,
  Vector3,
} from 'three';
import type { CollisionWorld } from '../physics/CollisionWorld.ts';
import type { Carryable } from './Carryable.ts';

/** The size of one block, in metres. */
export const BLOCK = 0.45;
/** Blocks across (left to right, as the picture is looked at). */
export const WIDTH = 48;
/** Blocks deep (back to front). */
export const DEPTH = 40;

type Kind =
  | 'grass'
  | 'dirt'
  | 'stone'
  | 'path'
  | 'wood'
  | 'leaf'
  | 'leafDark'
  | 'berry'
  | 'rock'
  | 'cloud';

const COLOURS: Record<Kind, string> = {
  grass: '#7bd23a',
  dirt: '#c97a45',
  stone: '#9a979a',
  path: '#b4b0aa',
  wood: '#8a5a32',
  leaf: '#7fcf3a',
  leafDark: '#5daa2c',
  berry: '#d8443a',
  rock: '#bdbbbd',
  cloud: '#ffffff',
};

/** A repeatable pseudo-random number from three numbers, 0 to 1. */
function hash(a: number, b: number, c = 0): number {
  const s = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

/** A set of cubes on one grid: where they are and what they are. */
class Cells {
  private readonly map = new Map<string, Kind>();
  constructor(
    /** The size of a cube, in metres. */
    readonly size: number,
    /** Where cell 0,0,0's lowest corner is. */
    readonly origin: Vector3,
  ) {}
  private key(x: number, y: number, z: number) {
    return `${x},${y},${z}`;
  }
  set(x: number, y: number, z: number, kind: Kind | null) {
    if (kind) this.map.set(this.key(x, y, z), kind);
    else this.map.delete(this.key(x, y, z));
  }
  get(x: number, y: number, z: number): Kind | undefined {
    return this.map.get(this.key(x, y, z));
  }
  *entries(): Generator<[number, number, number, Kind]> {
    for (const [k, kind] of this.map) {
      const [x, y, z] = k.split(',').map(Number);
      yield [x, y, z, kind];
    }
  }
  get count() {
    return this.map.size;
  }
}

/**
 * The faces of a set of cubes that can be seen, as one geometry: a face is
 * left out where another cube of the same set is against it. Each face has
 * its own corners, a flat normal, a 0–1 texture square for the painted
 * outline, and its cube's colour, a little lighter or darker per cube so
 * the blocks read one by one.
 */
function facesOf(cells: Cells, only?: (kind: Kind) => boolean): BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const colours: number[] = [];
  const s = cells.size;
  const o = cells.origin;
  // Each side: its normal, and its four corners in the cube's 0–1 space,
  // wound so the face looks outward.
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
    colour.set(COLOURS[kind]);
    // Each cube a shade of its own.
    colour.multiplyScalar(0.9 + hash(x, y, z) * 0.18);
    for (const side of SIDES) {
      const [nx, ny, nz] = side.n;
      const neighbour = cells.get(x + nx, y + ny, z + nz);
      if (neighbour && (!only || only(neighbour))) continue;
      // Undersides a little darker, as the light comes from above.
      const shade = ny < 0 ? 0.72 : ny > 0 ? 1 : 0.88;
      const quad = side.c.map(([cx, cy, cz]) => [
        o.x + (x + cx) * s,
        o.y + (y + cy) * s,
        o.z + (z + cz) * s,
      ]);
      const square: Array<[number, number]> = [[0, 0], [1, 0], [1, 1], [0, 1]];
      for (const i of [0, 1, 2, 0, 2, 3]) {
        positions.push(...quad[i]);
        normals.push(nx, ny, nz);
        uvs.push(...square[i]);
        colours.push(colour.r * shade, colour.g * shade, colour.b * shade);
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

/**
 * The face of one block: white with a soft darker rim, multiplied by the
 * block's colour, so each block has the bevelled outline the picture's do.
 */
function blockTexture(): CanvasTexture {
  const size = 16;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, size, size);
    // A bright top-left edge and a dark bottom-right one: a bevel.
    context.fillStyle = 'rgba(255,255,255,0.9)';
    context.fillRect(0, 0, size, 1);
    context.fillRect(0, 0, 1, size);
    context.fillStyle = 'rgba(0,0,0,0.22)';
    context.fillRect(0, size - 1, size, 1);
    context.fillRect(size - 1, 0, 1, size);
    context.fillStyle = 'rgba(0,0,0,0.08)';
    context.fillRect(1, size - 2, size - 2, 1);
    context.fillRect(size - 2, 1, 1, size - 2);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.magFilter = NearestFilter;
  texture.minFilter = LinearMipmapLinearFilter;
  return texture;
}

/** Water: pale cyan blocks with lighter edges, scrolled to make it run. */
function waterTexture(): CanvasTexture {
  const size = 16;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = '#5fd6ee';
    context.fillRect(0, 0, size, size);
    context.fillStyle = '#9cebf8';
    context.fillRect(0, 0, size, 2);
    context.fillRect(0, 0, 2, size);
    context.fillStyle = '#c8f6ff';
    context.fillRect(3, 4, 4, 2);
    context.fillRect(9, 10, 3, 2);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.magFilter = NearestFilter;
  return texture;
}

// ---- The layout -------------------------------------------------------------

/**
 * Whether column x, z is part of the island. A rectangle with its corners
 * rounded off in steps (more at the back left, where the path is) and a few
 * blocks missing along each edge, so the outline is as uneven as the
 * picture's.
 */
function inside(x: number, z: number): boolean {
  if (x < 0 || z < 0 || x >= WIDTH || z >= DEPTH) return false;
  const corner = (cx: number, cz: number, r: number) => {
    const dx = cx === 0 ? x : WIDTH - 1 - x;
    const dz = cz === 0 ? z : DEPTH - 1 - z;
    if (dx >= r || dz >= r) return false;
    return (r - dx - 0.5) ** 2 + (r - dz - 0.5) ** 2 > r * r;
  };
  if (corner(0, 0, 6) || corner(1, 0, 4) || corner(0, 1, 3) || corner(1, 1, 3)) return false;
  const NOTCHES: Array<[number, number]> = [
    [12, 39], [13, 39], [27, 39],
    [0, 20], [0, 21], [0, 9],
    [47, 9], [47, 10], [47, 24],
    [38, 0], [39, 0], [20, 0],
  ];
  return !NOTCHES.some(([nx, nz]) => nx === x && nz === z);
}

/** How many blocks a column of the top stands above the lawn. */
function terrace(x: number, z: number): number {
  // The higher step in the middle of the back.
  if (x >= 24 && x <= 37 && z <= 3 - (x === 24 || x === 37 ? 1 : 0)) return 3;
  // The terrace along the back, its front edge a little uneven.
  const front = 5 + (x % 7 === 3 ? 1 : 0) - (x % 9 === 0 ? 1 : 0);
  if (x >= 11 && x <= 45 && z <= front) return 2;
  return 0;
}

/** The short stone path at the back left, leading up to the terrace. */
function onPath(x: number, z: number): boolean {
  return z >= 3 && z <= 10 && x >= 5 && x <= 13 && Math.abs(x - (5 + (z - 3) * 0.9)) <= 1.2;
}

/** The pool in the front right corner, and the channel it spills over by. */
function inPool(x: number, z: number): boolean {
  if (x >= 37 && x <= 43 && z >= 31 && z <= 36) return !(x === 37 && z === 31) && !(x === 43 && z === 36);
  return x >= 40 && x <= 42 && z >= 37;
}

/** How far a column is from the edge, in blocks, up to a limit. */
function edgeDistance(x: number, z: number, limit = 12): number {
  for (let d = 1; d <= limit; d += 1) {
    for (let k = -d; k <= d; k += 1) {
      if (
        !inside(x + k, z - d) ||
        !inside(x + k, z + d) ||
        !inside(x - d, z + k) ||
        !inside(x + d, z + k)
      ) {
        return d;
      }
    }
  }
  return limit;
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
  /** Where the trees stand and how tall their trunks are, for tests. */
  trunks: Array<{ x: number; z: number; base: number; height: number }>;
  /** Half the island's size in metres, x and z. */
  halfSize: { x: number; z: number };
}

export function buildVoxelIsland(scene: Scene, collision: CollisionWorld): VoxelIslandWorld {
  const root = new Group();
  root.name = 'block-island';
  scene.add(root);
  const solid = new Group();
  solid.name = 'block-island-solid';
  root.add(solid);

  // Cell 0,0,0 has its lowest corner here: the island centred on the
  // origin, with the top of the lawn at y = 0.
  const origin = new Vector3((-WIDTH / 2) * BLOCK, -BLOCK, (-DEPTH / 2) * BLOCK);
  const ground = new Cells(BLOCK, origin);
  // Tree trunks and rocks: on the same grid, drawn and made solid apart from
  // the ground so a test can tell them apart.
  const props = new Cells(BLOCK, origin);
  // Leaves, bushes and berries are finer: half a block.
  const fine = new Cells(BLOCK / 2, origin);
  const topY: number[][] = [];

  // ---- The ground ----
  for (let x = 0; x < WIDTH; x += 1) {
    topY[x] = [];
    for (let z = 0; z < DEPTH; z += 1) {
      topY[x][z] = -Infinity;
      if (!inside(x, z)) continue;
      const pool = inPool(x, z);
      const up = pool ? 0 : terrace(x, z);
      // The top block, then earth, then stone.
      const top = pool ? -1 : up;
      // A raised column is grass on top and earth down its sides, as the
      // terraces in the picture are.
      for (let y = top; y >= 0; y -= 1) {
        if (y === top) ground.set(x, y, z, onPath(x, z) && up === 0 ? 'path' : 'grass');
        else ground.set(x, y, z, 'dirt');
      }
      // Earth: three blocks, and now and then a fourth hanging lower.
      const dirtBottom = -3 - (hash(x, z, 1) > 0.7 ? 1 : 0);
      for (let y = -1; y >= dirtBottom; y -= 1) ground.set(x, y, z, 'dirt');
      // Stone, deeper toward the middle, ragged underneath.
      const d = edgeDistance(x, z);
      const stoneBottom = dirtBottom - 2 - Math.min(18, Math.floor(d * 1.25 + hash(z, x, 2) * 3));
      for (let y = dirtBottom - 1; y >= stoneBottom; y -= 1) ground.set(x, y, z, 'stone');
      // The top of what can be stood on in this column.
      // (In metres: the lawn is 0, a terrace step +BLOCK, the pool floor -BLOCK.)
      topY[x][z] = (pool ? 0 : up + 1) * BLOCK - BLOCK;
    }
  }
  const worldX = (x: number) => origin.x + (x + 0.5) * BLOCK;
  const worldZ = (z: number) => origin.z + (z + 0.5) * BLOCK;
  /** The cell the top of column x, z is, so things can stand on it. */
  const topCell = (x: number, z: number) => Math.round(topY[x][z] / BLOCK);

  // ---- Trees ----
  // Where the picture has them: big at the front left, then the back left,
  // the middle of the high step, the back right and the right side.
  const TREES: Array<{ x: number; z: number; trunk: number; crown: number }> = [
    { x: 5, z: 14, trunk: 6, crown: 9 },
    { x: 14, z: 2, trunk: 5, crown: 7 },
    { x: 30, z: 1, trunk: 5, crown: 8 },
    { x: 42, z: 5, trunk: 5, crown: 7 },
    { x: 45, z: 16, trunk: 5, crown: 7.5 },
  ];
  const trunks: VoxelIslandWorld['trunks'] = [];
  TREES.forEach((tree, n) => {
    const base = topCell(tree.x, tree.z) + 1;
    // A trunk two blocks square.
    for (let y = 0; y < tree.trunk; y += 1) {
      for (const [dx, dz] of [[0, 0], [1, 0], [0, 1], [1, 1]]) props.set(tree.x + dx, base + y, tree.z + dz, 'wood');
    }
    // Roots: a block out at the foot on a few sides.
    for (const [dx, dz] of [[-1, 0], [2, 1], [0, 2], [1, -1]]) {
      if (hash(n, dx, dz) > 0.35 && inside(tree.x + dx, tree.z + dz)) {
        props.set(tree.x + dx, topCell(tree.x + dx, tree.z + dz) + 1, tree.z + dz, 'wood');
      }
    }
    trunks.push({
      x: worldX(tree.x) + BLOCK / 2,
      z: worldZ(tree.z) + BLOCK / 2,
      base: base * BLOCK - BLOCK + origin.y + BLOCK,
      height: tree.trunk * BLOCK,
    });
    // The crown: a lumpy ball of half blocks, lighter on top, sitting on the
    // trunk's top with the trunk running up into it.
    const cx = (tree.x + 1) * 2;
    const cz = (tree.z + 1) * 2;
    const r = tree.crown;
    const cy = (base + tree.trunk) * 2 + Math.round(r * 0.45);
    for (let x = -r - 1; x <= r + 1; x += 1) {
      for (let y = -r; y <= r; y += 1) {
        for (let z = -r - 1; z <= r + 1; z += 1) {
          // Squashed a little: wider than it is tall.
          const d = Math.hypot(x, y * 1.25, z);
          const lumps = 1.3 * hash(Math.floor((x + 40) / 3), Math.floor((y + 40) / 3), Math.floor((z + 40) / 3) + n * 7);
          if (d > r - lumps) continue;
          if (d < r - 2.5) continue;
          fine.set(cx + x, cy + y, cz + z, y > r * 0.15 || hash(x, y, z + n) > 0.6 ? 'leaf' : 'leafDark');
        }
      }
    }
  });

  // ---- Bushes, with red berries ----
  const BUSHES: Array<[number, number]> = [
    [2, 23],
    [22, 2],
    [41, 20],
    [34, 33],
  ];
  BUSHES.forEach(([bx, bz], n) => {
    const base = (topCell(bx, bz) + 1) * 2;
    const cx = bx * 2 + 1;
    const cz = bz * 2 + 1;
    const r = 2.6;
    for (let x = -3; x <= 3; x += 1) {
      for (let y = 0; y <= 4; y += 1) {
        for (let z = -3; z <= 3; z += 1) {
          const d = Math.hypot(x, (y - 1.2) * 1.15, z);
          if (d > r + hash(x, y, z + n) * 0.5) continue;
          if (d < r - 1.6) continue;
          const berry = hash(x + n, y, z) > 0.82 && y > 0;
          fine.set(cx + x, base + y, cz + z, berry ? 'berry' : y > 2 ? 'leaf' : 'leafDark');
        }
      }
    }
  });

  // ---- Rock piles: two or three blocks, and one on top ----
  const ROCKS: Array<[number, number]> = [
    [4, 25],
    [26, 1],
    [34, 5],
    [44, 21],
    [36, 32],
  ];
  ROCKS.forEach(([rx, rz], n) => {
    const base = topCell(rx, rz) + 1;
    props.set(rx, base, rz, 'rock');
    props.set(rx + 1, topCell(rx + 1, rz) + 1, rz, 'rock');
    if (hash(n, 3) > 0.4 && inside(rx, rz + 1)) props.set(rx, topCell(rx, rz + 1) + 1, rz + 1, 'rock');
    props.set(rx, base + 1, rz, 'rock');
  });

  // ---- Clouds: big blocks of white, well away from the island ----
  const sky = new Cells(1.4, new Vector3(0, 0, 0));
  // Behind the island as it is first looked at, and a few round the sides:
  // each a flat-bottomed heap, longest in the middle.
  const CLOUDS: Array<[number, number, number, number]> = [
    [-13, 3, -27, 4],
    [-1, 5, -31, 2],
    [12, 3, -26, 4],
    [20, 3, 2, 3],
    [-20, 3, 6, 3],
    [4, 5, 22, 3],
  ];
  CLOUDS.forEach(([cx, cy, cz, len], n) => {
    for (let x = -len - 1; x <= len + 1; x += 1) {
      for (let z = -2; z <= 2; z += 1) {
        const across = Math.abs(x) / (len + 1);
        const height = Math.max(0, Math.round(3 * (1 - across * across) - Math.abs(z) * 0.8 + hash(x, z, n) * 0.8));
        for (let y = 0; y < height; y += 1) sky.set(cx + x, cy + y, cz + z, 'cloud');
      }
    }
  });

  // ---- Meshes ----
  const texture = blockTexture();
  const material = new MeshStandardMaterial({ map: texture, vertexColors: true, roughness: 1 });
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
  mesh('block-rocks', facesOf(props, (k) => k === 'rock'), solid);
  // Leaves and bushes: he passes through them, as with the trees before.
  const foliage = mesh('foliage', facesOf(fine), root);
  // Each piece is half a block; the box round all of them is not.
  foliage.userData.thickest = BLOCK / 2;
  const clouds = mesh('clouds', facesOf(sky), root, false);
  clouds.userData.thickest = 0;

  // ---- The pool and the waterfall ----
  const waterTex = waterTexture();
  const fallTex = waterTex.clone();
  fallTex.needsUpdate = true;
  const waterMaterial = new MeshStandardMaterial({
    map: waterTex,
    transparent: true,
    opacity: 0.85,
    roughness: 0.3,
    side: DoubleSide,
    depthWrite: false,
  });
  const fallMaterial = waterMaterial.clone();
  fallMaterial.map = fallTex;
  {
    // The surface: one square per pool block, a little below the lawn.
    const positions: number[] = [];
    const uvs: number[] = [];
    const level = -BLOCK * 0.2;
    for (let x = 0; x < WIDTH; x += 1) {
      for (let z = 0; z < DEPTH; z += 1) {
        if (!inside(x, z) || !inPool(x, z)) continue;
        const x0 = origin.x + x * BLOCK;
        const z0 = origin.z + z * BLOCK;
        const q = [
          [x0, level, z0 + BLOCK],
          [x0 + BLOCK, level, z0 + BLOCK],
          [x0 + BLOCK, level, z0],
          [x0, level, z0],
        ];
        const square = [[0, 0], [1, 0], [1, 1], [0, 1]];
        for (const i of [0, 1, 2, 0, 2, 3]) {
          positions.push(...q[i]);
          uvs.push(square[i][0], square[i][1]);
        }
      }
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
    geometry.computeVertexNormals();
    const surface = new Mesh(geometry, waterMaterial);
    surface.name = 'pool';
    root.add(surface);
  }
  {
    // The fall: a sheet of water blocks down the front of the island from
    // the channel, past the bottom, thinning to drops.
    const positions: number[] = [];
    const uvs: number[] = [];
    const front = origin.z + DEPTH * BLOCK + 0.02;
    const top = -BLOCK * 0.2;
    const rows = 26;
    for (let x = 40; x <= 42; x += 1) {
      for (let row = 0; row < rows; row += 1) {
        // Further down, more of the blocks are missing: the stream breaks up.
        if (row > 16 && hash(x, row) < (row - 16) / 10) continue;
        const x0 = origin.x + x * BLOCK;
        const y1 = top - row * BLOCK;
        const y0 = y1 - BLOCK;
        const q = [
          [x0, y0, front],
          [x0 + BLOCK, y0, front],
          [x0 + BLOCK, y1, front],
          [x0, y1, front],
        ];
        const square = [[0, 0], [1, 0], [1, 1], [0, 1]];
        for (const i of [0, 1, 2, 0, 2, 3]) {
          positions.push(...q[i]);
          uvs.push(square[i][0], square[i][1] + row);
        }
      }
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
    geometry.computeVertexNormals();
    const fall = new Mesh(geometry, fallMaterial);
    fall.name = 'waterfall';
    root.add(fall);
  }

  collision.addSolid(solid);

  // ---- Where he starts: the front left, where the figure in the picture stands ----
  const sx = 9;
  const sz = 31;
  const spawn = new Vector3(worldX(sx), topY[sx][sz] + 0.05, worldZ(sz));

  const topAt = (x: number, z: number): number | null => {
    const cx = Math.floor((x - origin.x) / BLOCK);
    const cz = Math.floor((z - origin.z) / BLOCK);
    if (cx < 0 || cz < 0 || cx >= WIDTH || cz >= DEPTH) return null;
    const t = topY[cx][cz];
    return Number.isFinite(t) ? t : null;
  };
  const columns: VoxelIslandWorld['columns'] = [];
  for (let x = 0; x < WIDTH; x += 1) {
    for (let z = 0; z < DEPTH; z += 1) {
      if (Number.isFinite(topY[x][z])) columns.push({ x: worldX(x), z: worldZ(z), top: topY[x][z] });
    }
  }

  let triangleCount = 0;
  root.traverse((object) => {
    if (object instanceof Mesh) triangleCount += object.geometry.attributes.position.count / 3;
  });

  return {
    root,
    solid,
    carryables: [],
    water: {
      update(time: number) {
        waterTex.offset.set(time * 0.15, time * 0.08);
        fallTex.offset.set(0, time * 1.6);
      },
    },
    checkpoints: [spawn.clone()],
    spawn,
    spawnFacing: Math.PI,
    triangleCount: Math.round(triangleCount),
    topAt,
    columns,
    trunks,
    halfSize: { x: (WIDTH / 2) * BLOCK, z: (DEPTH / 2) * BLOCK },
  };
}
