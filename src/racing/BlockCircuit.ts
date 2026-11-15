/**
 * The race circuit beside the block island, built of blocks.
 *
 * Same shape and size as the racing game's Original Circuit (its own
 * centre line, width, kerbs and the overpass that climbs over the lower
 * straight), but made the way the island is made:
 *
 *  - Blocks on the island's own grid (the same size and the same lines), so
 *    the bridge runs straight into the track, block for block, its wooden
 *    rails turning into the track's rails with nothing out of line.
 *  - A slab two blocks thick under the road, and a rail one block high
 *    round both edges, a post standing a block higher every few blocks,
 *    in the racing game's grey.
 *  - Blocks merge into one solid; only edges facing the open air are
 *    rounded. Each block is a slightly different shade.
 *  - Where the road climbs, each block's top is cut on the slope (a wedge),
 *    so the climb is smooth to walk or drive and still made of blocks.
 *  - The road, the kerbs and their stripes are coloured across the block
 *    tops along smooth lines, so the curves are smooth and not stepped.
 */

import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DataTexture,
  Group,
  LinearFilter,
  Mesh,
  MeshStandardMaterial,
  RGBAFormat,
  Scene,
  UnsignedByteType,
  Vector3,
} from 'three';
import type { CollisionWorld } from '../physics/CollisionWorld.ts';
import { access, CURB_WIDTH, ENTRY, TRACK_HALF_WIDTH, trackSamples } from '../../apps/letsgo-racing/src/track.js';

export interface BlockCircuit {
  root: Group;
  /** What a character stands on (the same blocks, without the rounding). */
  solid: Group;
  offset: Vector3;
  roadPoint: { x: number; z: number };
  triangleCount: number;
}

/** The island's grid, and its bridge, which the circuit continues. */
export interface IslandGrid {
  origin: Vector3;
  block: number;
  bridge: { firstCol: number; length: number; from: number; to: number };
  anchor: { x: number; z: number };
}

const CURB_EDGE = TRACK_HALF_WIDTH + CURB_WIDTH;
/** A cell is road when its middle is this close to the centre line. */
/** How thick the rails are: two of the smallest blocks. */
const RAIL_W = 0.45 / 2;
const SLAB_REACH = CURB_EDGE + RAIL_W + 0.34;
const ROUND = 0.1;

const ROAD = new Color('#50545c');
const CURB_RED = new Color('#dc2828');
const CURB_WHITE = new Color('#f4f3ef');
const SLAB_SIDE = new Color('#7b8089');
/** The narrow ledge of slab outside the rails. */
const LEDGE = new Color('#9aa0a8');
const STONE = new Color('#b3a9bd');
// The rails' grey, as the racing game's own rails are.
const RAIL = new Color('#a5adb8');

// Kinds of flat block.
const EMPTY = 0;
const K_ROAD = 1;
const K_STONE = 2;

/** How a face is lit, as the island lights its blocks. */
function lit(nx: number, ny: number, nz: number): number {
  const l =
    Math.max(0, ny) * 1 + Math.max(0, -ny) * 0.55 + Math.max(0, -nx) * 0.9 + Math.max(0, nz) * 0.8 +
    Math.max(0, nx) * 0.68 + Math.max(0, -nz) * 0.72;
  return l / (Math.abs(nx) + Math.abs(ny) + Math.abs(nz) || 1);
}

interface Slope {
  part: 0 | 1;
  bottom: number;
  /** Top corner heights: (c,r), (c+1,r), (c+1,r+1), (c,r+1). */
  top: [number, number, number, number];
  rail: boolean;
}

export function buildBlockCircuit(scene: Scene, collision: CollisionWorld, grid: IslandGrid): BlockCircuit {
  const B = grid.block;
  const ox = grid.origin.x;
  const oz = grid.origin.z;
  const offset = new Vector3(grid.anchor.x - access.minX, 0, grid.anchor.z - ENTRY.z);

  // ---- The centre line, in world space, in two parts: the overpass (where
  // the road leaves the ground) and the rest. Where it crosses the lower
  // straight there are two roads in the same place, one above the other.
  const samples = trackSamples.map((s: { point: Vector3; distance: number }) => ({
    x: s.point.x + offset.x,
    y: Math.max(0, s.point.y),
    z: s.point.z + offset.z,
    s: s.distance,
  }));
  const count = samples.length - 1;
  let first = -1;
  let last = -1;
  for (let i = 0; i <= count; i += 1) {
    if (samples[i].y > 0.001) {
      if (first < 0) first = i;
      last = i;
    }
  }
  const MARGIN = 12;
  const inPart = (part: number, i: number) =>
    part === 1 ? i >= first - MARGIN && i <= last + MARGIN : i <= first || i >= last;

  // ---- The grid: island columns c and rows r; cell (c, r) spans
  // x = ox + c·B … +B, z = oz + r·B … +B. Values are kept at the corners.
  let minX = Infinity;
  let maxX = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;
  for (const p of samples) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minZ = Math.min(minZ, p.z);
    maxZ = Math.max(maxZ, p.z);
  }
  const REACH = CURB_EDGE + 2;
  const c0 = Math.floor((Math.min(minX - REACH, grid.anchor.x - 1) - ox) / B);
  const r0 = Math.floor((minZ - REACH - oz) / B);
  const W = Math.ceil((maxX + REACH - ox) / B) - c0 + 1;
  const D = Math.ceil((maxZ + REACH - oz) / B) - r0 + 1;
  const CW = W + 1;
  const CD = D + 1;
  const corner = (c: number, r: number) => (r - r0) * CW + (c - c0);
  const cellAt = (c: number, r: number) => (r - r0) * W + (c - c0);
  const inGrid = (c: number, r: number) => c >= c0 && c < c0 + W && r >= r0 && r < r0 + D;

  // Distance from the centre line, height and kerb stripe, at every corner,
  // for each part.
  const dist = [new Float32Array(CW * CD).fill(1e9), new Float32Array(CW * CD).fill(1e9)];
  const height = [new Float32Array(CW * CD), new Float32Array(CW * CD)];
  const along = [new Float32Array(CW * CD), new Float32Array(CW * CD)];
  // Where the nearest point is the very end of a part: the other part carries on there.
  const cap = [new Uint8Array(CW * CD), new Uint8Array(CW * CD)];
  const ends = [
    { start: last, stop: first },
    { start: first - MARGIN, stop: last + MARGIN },
  ];
  for (let i = 0; i < count; i += 1) {
    const a = samples[i];
    const b = samples[i + 1];
    const abx = b.x - a.x;
    const abz = b.z - a.z;
    const len2 = abx * abx + abz * abz || 1;
    const lo = { c: Math.floor((Math.min(a.x, b.x) - REACH - ox) / B), r: Math.floor((Math.min(a.z, b.z) - REACH - oz) / B) };
    const hi = { c: Math.ceil((Math.max(a.x, b.x) + REACH - ox) / B), r: Math.ceil((Math.max(a.z, b.z) + REACH - oz) / B) };
    for (const part of [0, 1]) {
      if (!inPart(part, i)) continue;
      const dp = dist[part];
      for (let r = Math.max(lo.r, r0); r <= Math.min(hi.r, r0 + D); r += 1) {
        const pz = oz + r * B;
        for (let c = Math.max(lo.c, c0); c <= Math.min(hi.c, c0 + W); c += 1) {
          const px = ox + c * B;
          let t = ((px - a.x) * abx + (pz - a.z) * abz) / len2;
          t = t < 0 ? 0 : t > 1 ? 1 : t;
          const dx = px - (a.x + abx * t);
          const dz = pz - (a.z + abz * t);
          const d = Math.sqrt(dx * dx + dz * dz);
          const k = corner(c, r);
          if (d < dp[k]) {
            dp[k] = d;
            cap[part][k] = (i === ends[part].stop && t >= 1) || (i === ends[part].start && t <= 0) ? 1 : 0;
            height[part][k] = a.y + (b.y - a.y) * t;
            along[part][k] = a.s + (b.s - a.s) * t;
          }
        }
      }
    }
  }
  const cellDist = (part: number, c: number, r: number) =>
    (dist[part][corner(c, r)] + dist[part][corner(c + 1, r)] + dist[part][corner(c + 1, r + 1)] + dist[part][corner(c, r + 1)]) / 4;
  const cornerTops = (part: number, c: number, r: number): [number, number, number, number] => [
    height[part][corner(c, r)],
    height[part][corner(c + 1, r)],
    height[part][corner(c + 1, r + 1)],
    height[part][corner(c, r + 1)],
  ];
  const mean = (t: number[]) => (t[0] + t[1] + t[2] + t[3]) / 4;
  const capAt = (part: number, c: number, r: number) =>
    cap[part][corner(c, r)] || cap[part][corner(c + 1, r)] || cap[part][corner(c + 1, r + 1)] || cap[part][corner(c, r + 1)];

  // ---- Which cells are road, and how high ----
  // Flat road (the ground-level circuit, the access, flat rails) is kept as
  // ordinary blocks in four layers: y = -1 (stone), 0 (road), 1 (rail),
  // 2 (post). The top of layer y is at y·B. Road that is off the ground is
  // kept as columns with sloped tops.
  const layers = [-1, 0, 1, 2].map(() => new Uint8Array(W * D));
  const L = (y: number) => layers[y + 1];
  const fieldPart = new Uint8Array(W * D); // 1, 2: kerbs of that part; 3: plain road
  const slopes = new Map<number, Slope[]>();
  const addSlope = (c: number, r: number, s: Slope) => {
    const k = cellAt(c, r);
    const list = slopes.get(k);
    if (list) list.push(s);
    else slopes.set(k, [s]);
  };
  const isFlat = (t: number[]) => t[0] < 0.01 && t[1] < 0.01 && t[2] < 0.01 && t[3] < 0.01;
  const bottomOf = (t: number[]) => Math.floor(Math.min(t[0], t[1], t[2], t[3]) / B + 1e-6) * B - 2 * B;

  for (let r = r0; r < r0 + D; r += 1) {
    for (let c = c0; c < c0 + W; c += 1) {
      const d0 = cellDist(0, c, r);
      const d1 = cellDist(1, c, r);
      const on0 = d0 <= SLAB_REACH && !capAt(0, c, r);
      const on1 = d1 <= SLAB_REACH && !capAt(1, c, r);
      if (!on0 && !on1) continue;
      const t0 = cornerTops(0, c, r);
      const t1 = cornerTops(1, c, r);
      const parts: Array<0 | 1> = [];
      if (on0 && on1 && Math.abs(mean(t0) - mean(t1)) < 1.5) parts.push(d0 <= d1 ? 0 : 1);
      else {
        if (on0) parts.push(0);
        if (on1) parts.push(1);
      }
      for (const part of parts) {
        const t = part === 0 ? t0 : t1;
        if (isFlat(t)) {
          const k = cellAt(c, r);
          L(0)[k] = K_ROAD;
          L(-1)[k] = K_STONE;
          fieldPart[k] = part + 1;
        } else {
          addSlope(c, r, { part, bottom: bottomOf(t), top: t, rail: false });
        }
      }
    }
  }

  // ---- The entry: the bridge carried on to the track ----
  // The same rows as the bridge, its deck and its two wooden rails, from
  // the island's side to the road. The track's own rail is left open
  // between them, so the two rails run into it and join.
  const br = grid.bridge;
  const bridgeEnd = br.firstCol + br.length; // first column past the bridge
  const entryLimit = Math.floor((ENTRY.x + offset.x - ox) / B);
  const opening = (c: number, r: number) => c < entryLimit && r > br.from && r < br.to;

  // The entry road itself, column by column toward the track, until it
  // meets the track's road.
  let entryEnd = bridgeEnd;
  for (let r = br.from; r <= br.to; r += 1) {
    for (let c = bridgeEnd; c < entryLimit; c += 1) {
      const k = cellAt(c, r);
      if (L(0)[k] === K_ROAD && fieldPart[k] !== 3) break;
      L(0)[k] = K_ROAD;
      L(-1)[k] = K_STONE;
      fieldPart[k] = 3;
      entryEnd = Math.max(entryEnd, c + 1);
    }
  }

  // ---- Rails, of the smallest blocks (a quarter of a block on a side) ----
  // Two small blocks thick, a block high, standing just outside the kerb
  // line, so they follow the curve closely and sit flush along the kerbs.
  // A post a block higher every few metres. On the overpass they stand on
  // the slope. Small cell (sc, sr) spans x = ox + sc·b, z = oz + sr·b.
  const b = B / 4;
  const flatRails = new Map<number, number>(); // key → height
  const slopeRails = new Map<number, { part: number; h: number }>();
  const SROW = (c0 + W) * 4 + 8;
  const skey = (sc: number, sr: number) => sr * SROW + sc;
  const lerp4 = (arr: Float32Array, c: number, r: number, fx: number, fz: number) =>
    arr[corner(c, r)] * (1 - fx) * (1 - fz) + arr[corner(c + 1, r)] * fx * (1 - fz) +
    arr[corner(c + 1, r + 1)] * fx * fz + arr[corner(c, r + 1)] * (1 - fx) * fz;
  const postAt = (part: number, c: number, r: number, fx: number, fz: number) => lerp4(along[part], c, r, fx, fz) % 1.8 < 2 * b;
  for (let r = r0; r < r0 + D - 1; r += 1) {
    for (let c = c0; c < c0 + W - 1; c += 1) {
      for (const part of [0, 1]) {
        const dp = dist[part];
        const lo = Math.min(dp[corner(c, r)], dp[corner(c + 1, r)], dp[corner(c + 1, r + 1)], dp[corner(c, r + 1)]);
        const hi = Math.max(dp[corner(c, r)], dp[corner(c + 1, r)], dp[corner(c + 1, r + 1)], dp[corner(c, r + 1)]);
        if (hi < CURB_EDGE - 0.1 || lo > CURB_EDGE + RAIL_W + 0.1 || capAt(part, c, r)) continue;
        const other = 1 - part;
        for (let j = 0; j < 4; j += 1) {
          for (let i = 0; i < 4; i += 1) {
            const fx = (i + 0.5) / 4;
            const fz = (j + 0.5) / 4;
            const d = lerp4(dp, c, r, fx, fz);
            if (d < CURB_EDGE || d >= CURB_EDGE + RAIL_W) continue;
            const h = lerp4(height[part], c, r, fx, fz);
            // Not where the other part's road carries on at this height.
            if (lerp4(dist[other], c, r, fx, fz) < CURB_EDGE && Math.abs(lerp4(height[other], c, r, fx, fz) - h) < 1) continue;
            if (opening(c, r)) continue;
            const key = skey(c * 4 + i, r * 4 + j);
            const tall = postAt(part, c, r, fx, fz) ? 2 * B : B;
            const t = cornerTops(part, c, r);
            if (isFlat(t)) flatRails.set(key, Math.max(tall, flatRails.get(key) ?? 0));
            else slopeRails.set(key, { part, h: tall });
          }
        }
      }
    }
  }
  // The entry's rails: the bridge's rails carried on, the same size and
  // shape, built of small blocks, until they meet the track's rail.
  for (const r of [br.from, br.to]) {
    for (let c = bridgeEnd; c < entryEnd; c += 1) {
      const tall = (c - br.firstCol) % 4 === 0 ? 2 * B : B;
      for (let j = 0; j < 4; j += 1) for (let i = 0; i < 4; i += 1) flatRails.set(skey(c * 4 + i, r * 4 + j), tall);
    }
    for (let j = 0; j < 4; j += 1) {
      for (let sc = entryEnd * 4; sc < entryLimit * 4; sc += 1) {
        const key = skey(sc, r * 4 + j);
        if (flatRails.has(key)) break;
        flatRails.set(key, B);
      }
    }
  }
  /** The bridge's own rails, against the entry's: how tall, or 0. */
  const bridgeRail = (sc: number, sr: number) => {
    const c = Math.floor(sc / 4);
    const r = Math.floor(sr / 4);
    if (c < br.firstCol || c >= bridgeEnd || (r !== br.from && r !== br.to)) return 0;
    return (c - br.firstCol) % 4 === 0 ? 2 * B : B;
  };
  const railHeight = (sc: number, sr: number) => flatRails.get(skey(sc, sr)) ?? slopeRails.get(skey(sc, sr))?.h ?? bridgeRail(sc, sr);

  /** The island's bridge blocks, against the entry: they count as there. */
  const bridgeAt = (c: number, y: number, r: number) => {
    if (c < br.firstCol || c >= bridgeEnd || r < br.from || r > br.to) return false;
    const edge = r === br.from || r === br.to;
    if (y === 0) return true;
    if (y === -1) return !edge;
    if (y === 1) return edge;
    if (y === 2) return edge && (c - br.firstCol) % 4 === 0;
    return false;
  };

  // ---- Geometry ----
  const slopeNear = (c: number, r: number, h: number): Slope | null => {
    if (!inGrid(c, r)) return null;
    let best: Slope | null = null;
    let gap = 1.2;
    for (const s of slopes.get(cellAt(c, r)) ?? []) {
      const g = Math.abs(mean(s.top) - h);
      if (g < gap) {
        gap = g;
        best = s;
      }
    }
    return best;
  };
  /** Is the space of flat block (c, y, r) filled, by any block? */
  const filled = (c: number, y: number, r: number): boolean => {
    if (y >= -1 && y <= 2 && inGrid(c, r) && L(y)[cellAt(c, r)] !== EMPTY) return true;
    if (bridgeAt(c, y, r)) return true;
    if (!inGrid(c, r)) return false;
    for (const s of slopes.get(cellAt(c, r)) ?? []) {
      if (s.bottom <= (y - 1) * B + 1e-4 && Math.min(...s.top) >= y * B - 0.02) return true;
    }
    return false;
  };

  const build = (round: boolean) => {
    const R = round ? ROUND : 0;
    const pos: number[] = [];
    const nor: number[] = [];
    const col: number[] = [];
    const fld: number[] = [];
    const vertex = (x: number, y: number, z: number, n: number[], colour: Color, l: number, field: number) => {
      pos.push(x, y, z);
      nor.push(n[0], n[1], n[2]);
      col.push(colour.r * l, colour.g * l, colour.b * l);
      fld.push(field);
    };
    const WHITE = new Color(1, 1, 1);
    const quad = (p: number[][], n: number[], colour: Color, field: number) => {
      const l = lit(n[0], n[1], n[2]);
      // Wound to face along n.
      const e1 = [p[1][0] - p[0][0], p[1][1] - p[0][1], p[1][2] - p[0][2]];
      const e2 = [p[2][0] - p[0][0], p[2][1] - p[0][1], p[2][2] - p[0][2]];
      const cx = e1[1] * e2[2] - e1[2] * e2[1];
      const cy = e1[2] * e2[0] - e1[0] * e2[2];
      const cz = e1[0] * e2[1] - e1[1] * e2[0];
      const order = cx * n[0] + cy * n[1] + cz * n[2] >= 0 ? [0, 1, 2, 0, 2, 3] : [0, 2, 1, 0, 3, 2];
      for (const i of order) vertex(p[i][0], p[i][1], p[i][2], n, colour, l, field);
    };
    const flatColour = (kind: number, side: boolean) =>
      kind === K_ROAD ? (side ? SLAB_SIDE : WHITE) : STONE;

    const SIDES = [
      { n: [1, 0, 0], u: [0, 0, -1], v: [0, 1, 0] },
      { n: [-1, 0, 0], u: [0, 0, 1], v: [0, 1, 0] },
      { n: [0, 1, 0], u: [1, 0, 0], v: [0, 0, -1] },
      { n: [0, -1, 0], u: [1, 0, 0], v: [0, 0, 1] },
      { n: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0] },
      { n: [0, 0, -1], u: [-1, 0, 0], v: [0, 1, 0] },
    ];
    const steps = (lowRound: boolean, highRound: boolean) => {
      const out = [-0.5];
      if (R > 0 && lowRound) out.push(-0.5 + R);
      if (R > 0 && highRound) out.push(0.5 - R);
      out.push(0.5);
      return out;
    };

    // Runs of plain road top (and of stone underside) are drawn as one
    // long face each; everything else block by block.
    for (let y = -1; y <= 2; y += 1) {
      const layer = L(y);
      for (let r = r0; r < r0 + D; r += 1) {
        let runStart = -1;
        let runField = 0;
        const flushTop = (end: number) => {
          if (runStart < 0) return;
          const x0 = ox + runStart * B;
          const x1 = ox + end * B;
          const z0 = oz + r * B;
          const z1 = z0 + B;
          const yy = y * B;
          quad([[x0, yy, z0], [x1, yy, z0], [x1, yy, z1], [x0, yy, z1]], [0, 1, 0], WHITE, runField);
          runStart = -1;
        };
        let botStart = -1;
        const flushBottom = (end: number) => {
          if (botStart < 0) return;
          const x0 = ox + botStart * B;
          const x1 = ox + end * B;
          const z0 = oz + r * B;
          const yy = (y - 1) * B;
          quad([[x0, yy, z0], [x1, yy, z0], [x1, yy, z0 + B], [x0, yy, z0 + B]], [0, -1, 0], STONE, 0);
          botStart = -1;
        };
        for (let c = c0; c < c0 + W; c += 1) {
          const k = cellAt(c, r);
          const kind = layer[k];
          let plainTop = false;
          let plainBottom = false;
          if (kind !== EMPTY) {
            const around = [filled(c + 1, y, r), filled(c - 1, y, r), filled(c, y, r + 1), filled(c, y, r - 1)];
            const all = around.every(Boolean);
            const above = filled(c, y + 1, r);
            const below = filled(c, y - 1, r);
            plainTop = kind === K_ROAD && all && !above;
            plainBottom = kind === K_STONE && all && !below;
            const occupied = [
              [around[1], around[0]],
              [below, above],
              [around[3], around[2]],
            ];
            const x = ox + c * B;
            const z = oz + r * B;
            const yb = (y - 1) * B;
            // Where a block sits on this one and has an open side, its
            // rounded upright edges would leave small openings down to this
            // block's top: that top is drawn there, flat.
            if (R > 0 && above && y < 2 && L(y + 1)[k] !== EMPTY) {
              const openAbove = !filled(c + 1, y + 1, r) || !filled(c - 1, y + 1, r) || !filled(c, y + 1, r + 1) || !filled(c, y + 1, r - 1);
              if (openAbove) {
                const yy = y * B + 0.002;
                quad([[x, yy, z], [x + B, yy, z], [x + B, yy, z + B], [x, yy, z + B]], [0, 1, 0], flatColour(kind, false), kind === K_ROAD ? fieldPart[k] : 0);
              }
            }
            for (const side of SIDES) {
              const nb = filled(c + side.n[0], y + side.n[1], r + side.n[2]);
              if (nb) continue;
              if (side.n[1] === 1 && plainTop) continue;
              if (side.n[1] === -1 && plainBottom) continue;
              const ua = side.u.findIndex((v) => v !== 0);
              const va = side.v.findIndex((v) => v !== 0);
              const roundAt = (axis: number, sign: number) => !occupied[axis][sign > 0 ? 1 : 0];
              const us = steps(roundAt(ua, -side.u[ua]), roundAt(ua, side.u[ua]));
              const vs = steps(roundAt(va, -side.v[va]), roundAt(va, side.v[va]));
              const top = side.n[1] === 1;
              const colour = flatColour(kind, !top);
              const field = top && kind === K_ROAD ? fieldPart[k] : 0;
              const point = (a: number, b: number) => {
                const p = [0, 1, 2].map((i) => side.n[i] * 0.5 + side.u[i] * a + side.v[i] * b);
                const core = p.map((value, i) =>
                  Math.max(occupied[i][0] || R === 0 ? -0.5 : -0.5 + R, Math.min(occupied[i][1] || R === 0 ? 0.5 : 0.5 - R, value)),
                );
                const off = p.map((value, i) => value - core[i]);
                const len = Math.hypot(off[0], off[1], off[2]);
                const n = len > 1e-6 ? off.map((value) => value / len) : side.n;
                const q = len > 1e-6 ? core.map((value, i) => value + n[i] * R) : p;
                return {
                  p: [x + (q[0] + 0.5) * B, yb + (q[1] + 0.5) * B, z + (q[2] + 0.5) * B],
                  n,
                };
              };
              const cell = (a0: number, a1: number, b0: number, b1: number) => {
                const pts = [point(a0, b0), point(a1, b0), point(a1, b1), point(a0, b1)];
                const e1 = pts[1].p.map((v, i) => v - pts[0].p[i]);
                const e2 = pts[2].p.map((v, i) => v - pts[0].p[i]);
                const cx = e1[1] * e2[2] - e1[2] * e2[1];
                const cy = e1[2] * e2[0] - e1[0] * e2[2];
                const cz = e1[0] * e2[1] - e1[1] * e2[0];
                const flip = cx * side.n[0] + cy * side.n[1] + cz * side.n[2] < 0;
                for (const i of flip ? [0, 2, 1, 0, 3, 2] : [0, 1, 2, 0, 2, 3]) {
                  const v = pts[i];
                  vertex(v.p[0], v.p[1], v.p[2], v.n, colour, lit(v.n[0], v.n[1], v.n[2]), field);
                }
              };
              for (let j = 0; j < vs.length - 1; j += 1) {
                for (let i = 0; i < us.length - 1; i += 1) cell(us[i], us[i + 1], vs[j], vs[j + 1]);
              }
            }
          }
          const f = fieldPart[k];
          if (plainTop && runStart >= 0 && f === runField) {
            // carry on
          } else {
            flushTop(c);
            if (plainTop) {
              runStart = c;
              runField = f;
            }
          }
          if (plainBottom) {
            if (botStart < 0) botStart = c;
          } else flushBottom(c);
        }
        flushTop(c0 + W);
        flushBottom(c0 + W);
      }
    }

    // Columns with sloped tops (the overpass and its climbs).
    const level: Array<{ r: number; c: number; y: number; f: number }> = [];
    const under: Array<{ r: number; c: number; y: number; f: number }> = [];
    for (const [k, list] of slopes) {
      const r = Math.floor(k / W) + r0;
      const c = (k % W) + c0;
      const x0 = ox + c * B;
      const z0 = oz + r * B;
      const xs = [x0, x0 + B, x0 + B, x0];
      const zs = [z0, z0, z0 + B, z0 + B];
      for (const s of list) {
        const t = s.top;
        const colour = s.rail ? RAIL : WHITE;
        const field = s.rail ? 0 : s.part + 1;
        // The top, cut on the slope: two triangles. Level tops and the
        // undersides are gathered into long faces below.
        if (Math.abs(t[0] - t[1]) < 1e-4 && Math.abs(t[0] - t[2]) < 1e-4 && Math.abs(t[0] - t[3]) < 1e-4) {
          level.push({ r, c, y: t[0], f: field });
        } else {
          const n = new Vector3(t[0] - t[1], B, t[0] - t[3]).normalize();
          quad(
            [0, 1, 2, 3].map((i) => [xs[i], t[i], zs[i]]),
            [n.x, n.y, n.z],
            colour,
            field,
          );
        }
        under.push({ r, c, y: s.bottom, f: 0 });
        // Sides: only what no neighbour covers.
        const edges: Array<{ n: number[]; a: number; b: number; dc: number; dr: number; na: number; nb: number }> = [
          { n: [0, 0, -1], a: 0, b: 1, dc: 0, dr: -1, na: 3, nb: 2 },
          { n: [1, 0, 0], a: 1, b: 2, dc: 1, dr: 0, na: 0, nb: 3 },
          { n: [0, 0, 1], a: 2, b: 3, dc: 0, dr: 1, na: 1, nb: 0 },
          { n: [-1, 0, 0], a: 3, b: 0, dc: -1, dr: 0, na: 2, nb: 1 },
        ];
        for (const e of edges) {
          const nc = c + e.dc;
          const nr = r + e.dr;
          const h = mean(t);
          let nTop: [number, number] | null = null;
          let nBottom = 0;
          const ns = slopeNear(nc, nr, h);
          if (ns) {
            nTop = [ns.top[e.na], ns.top[e.nb]];
            nBottom = ns.bottom;
          } else {
            let topLayer = -99;
            for (let y = 2; y >= -1; y -= 1) {
              if ((inGrid(nc, nr) && L(y)[cellAt(nc, nr)] !== EMPTY) || bridgeAt(nc, y, nr)) {
                topLayer = y;
                break;
              }
            }
            if (topLayer > -99 && Math.abs(topLayer * B - h) < 1.2) {
              nTop = [topLayer * B, topLayer * B];
              nBottom = -2 * B;
            }
          }
          const pa = (y: number) => [xs[e.a], y, zs[e.a]];
          const pb = (y: number) => [xs[e.b], y, zs[e.b]];
          const sideColour = s.rail ? RAIL : SLAB_SIDE;
          if (!nTop) {
            quad([pa(s.bottom), pb(s.bottom), pb(t[e.b]), pa(t[e.a])], e.n, sideColour, 0);
            continue;
          }
          if (t[e.a] > nTop[0] + 0.005 || t[e.b] > nTop[1] + 0.005) {
            const la = Math.min(t[e.a], nTop[0]);
            const lb = Math.min(t[e.b], nTop[1]);
            quad([pa(la), pb(lb), pb(t[e.b]), pa(t[e.a])], e.n, sideColour, 0);
          }
          if (s.bottom < nBottom - 0.005) {
            const up = Math.min(nBottom, Math.min(t[e.a], t[e.b]));
            quad([pa(s.bottom), pb(s.bottom), pb(up), pa(up)], e.n, STONE, 0);
          }
        }
      }
    }

    for (const [list, up] of [[level, true], [under, false]] as const) {
      list.sort((p, q) => p.r - q.r || p.y - q.y || p.f - q.f || p.c - q.c);
      let i = 0;
      while (i < list.length) {
        let j = i;
        while (
          j + 1 < list.length && list[j + 1].r === list[i].r && list[j + 1].y === list[i].y &&
          list[j + 1].f === list[i].f && list[j + 1].c === list[j].c + 1
        ) j += 1;
        const x0 = ox + list[i].c * B;
        const x1 = ox + (list[j].c + 1) * B;
        const z0 = oz + list[i].r * B;
        const y = list[i].y;
        quad([[x0, y, z0], [x1, y, z0], [x1, y, z0 + B], [x0, y, z0 + B]], [0, up ? 1 : -1, 0], up ? WHITE : STONE, list[i].f);
        i = j + 1;
      }
    }

    // ---- The rails: small blocks, as long faces where they line up ----
    {
      const SMALL = 5; // shaded small block by small block
      const rows = new Map<number, number[]>();
      const cols = new Map<number, number[]>();
      for (const key of flatRails.keys()) {
        const sr = Math.floor(key / SROW);
        const sc = key - sr * SROW;
        (rows.get(sr) ?? rows.set(sr, []).get(sr)!).push(sc);
        (cols.get(sc) ?? cols.set(sc, []).get(sc)!).push(sr);
      }
      const runs = (list: number[], span: (at: number) => [number, number] | null, emit: (a: number, z: number, y0: number, y1: number) => void) => {
        list.sort((p, q) => p - q);
        let start = 0;
        let prev = -9;
        let cur: [number, number] | null = null;
        const flush = () => {
          if (cur) emit(start, prev, cur[0], cur[1]);
          cur = null;
        };
        for (const at of list) {
          const sp = span(at);
          if (cur && sp && at === prev + 1 && sp[0] === cur[0] && sp[1] === cur[1]) {
            prev = at;
            continue;
          }
          flush();
          if (sp) {
            cur = sp;
            start = at;
          }
          prev = at;
        }
        flush();
      };
      const sideSpan = (h: number, nh: number): [number, number] | null => (h > nh + 1e-6 ? [nh, h] : null);
      for (const [sr, list] of rows) {
        const z0 = oz + sr * b;
        const z1 = z0 + b;
        runs(list, (sc) => [flatRails.get(skey(sc, sr))!, 0], (a, e, y) => {
          const x0 = ox + a * b;
          const x1 = ox + (e + 1) * b;
          quad([[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]], [0, 1, 0], RAIL, SMALL);
        });
        for (const dir of [1, -1]) {
          const z = dir > 0 ? z1 : z0;
          runs(list, (sc) => sideSpan(flatRails.get(skey(sc, sr))!, railHeight(sc, sr + dir)), (a, e, y0, y1) => {
            const x0 = ox + a * b;
            const x1 = ox + (e + 1) * b;
            quad([[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]], [0, 0, dir], RAIL, SMALL);
          });
        }
      }
      for (const [sc, list] of cols) {
        for (const dir of [1, -1]) {
          const x = ox + (dir > 0 ? sc + 1 : sc) * b;
          runs(list, (sr) => sideSpan(flatRails.get(skey(sc, sr))!, railHeight(sc + dir, sr)), (a, e, y0, y1) => {
            const za = oz + a * b;
            const zb = oz + (e + 1) * b;
            quad([[x, y0, za], [x, y0, zb], [x, y1, zb], [x, y1, za]], [dir, 0, 0], RAIL, SMALL);
          });
        }
      }
      // On the slope, block by block, standing on the road's slope.
      for (const [key, rail] of slopeRails) {
        const sr = Math.floor(key / SROW);
        const sc = key - sr * SROW;
        const c = Math.floor(sc / 4);
        const r = Math.floor(sr / 4);
        const i = sc - c * 4;
        const j = sr - r * 4;
        const base = (di: number, dj: number) => lerp4(height[rail.part], c, r, (i + di) / 4, (j + dj) / 4) - 0.01;
        const bs = [base(0, 0), base(1, 0), base(1, 1), base(0, 1)];
        const xs = [ox + sc * b, ox + (sc + 1) * b, ox + (sc + 1) * b, ox + sc * b];
        const zs = [oz + sr * b, oz + sr * b, oz + (sr + 1) * b, oz + (sr + 1) * b];
        const top = bs.map((v) => v + rail.h);
        const n = new Vector3(top[0] - top[1], b, top[0] - top[3]).normalize();
        quad([0, 1, 2, 3].map((q) => [xs[q], top[q], zs[q]]), [n.x, n.y, n.z], RAIL, SMALL);
        const edges = [
          { n: [0, 0, -1], a: 0, e: 1, dc: 0, dr: -1 },
          { n: [1, 0, 0], a: 1, e: 2, dc: 1, dr: 0 },
          { n: [0, 0, 1], a: 2, e: 3, dc: 0, dr: 1 },
          { n: [-1, 0, 0], a: 3, e: 0, dc: -1, dr: 0 },
        ];
        for (const ed of edges) {
          const nh = railHeight(sc + ed.dc, sr + ed.dr);
          if (nh >= rail.h - 1e-6) continue;
          quad(
            [
              [xs[ed.a], bs[ed.a] + nh, zs[ed.a]],
              [xs[ed.e], bs[ed.e] + nh, zs[ed.e]],
              [xs[ed.e], top[ed.e], zs[ed.e]],
              [xs[ed.a], top[ed.a], zs[ed.a]],
            ],
            ed.n,
            RAIL,
            SMALL,
          );
        }
      }
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(pos), 3));
    geometry.setAttribute('normal', new BufferAttribute(new Float32Array(nor), 3));
    geometry.setAttribute('color', new BufferAttribute(new Float32Array(col), 3));
    geometry.setAttribute('aField', new BufferAttribute(new Float32Array(fld), 1));
    geometry.computeBoundingSphere();
    return geometry;
  };

  // ---- The road's colours, as a texture of the corner values ----
  const tex = new Uint8Array(CW * CD * 4);
  const enc = (d: number) => Math.max(0, Math.min(255, Math.round(((d - 11) / 5) * 255)));
  for (let k = 0; k < CW * CD; k += 1) {
    tex[k * 4] = enc(dist[0][k]);
    tex[k * 4 + 1] = Math.floor(along[0][k] / 3) % 2 ? 255 : 0;
    tex[k * 4 + 2] = enc(dist[1][k]);
    tex[k * 4 + 3] = Math.floor(along[1][k] / 3) % 2 ? 255 : 0;
  }
  const field = new DataTexture(tex, CW, CD, RGBAFormat, UnsignedByteType);
  field.magFilter = LinearFilter;
  field.minFilter = LinearFilter;
  field.generateMipmaps = false;
  field.needsUpdate = true;

  const material = new MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0 });
  material.toneMapped = false;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uField = { value: field };
    shader.uniforms.uGrid = { value: [ox + c0 * B, oz + r0 * B, CW, CD] };
    shader.uniforms.uBlock = { value: B };
    shader.uniforms.uRoad = { value: ROAD };
    shader.uniforms.uRed = { value: CURB_RED };
    shader.uniforms.uWhite = { value: CURB_WHITE };
    shader.uniforms.uLedge = { value: LEDGE };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aField;\nvarying float vField;\nvarying vec3 vWPos;\nvarying vec3 vWNor;')
      .replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\nvField = aField;\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvWNor = normalize(mat3(modelMatrix) * objectNormal);',
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        '#include <common>\nvarying float vField;\nvarying vec3 vWPos;\nvarying vec3 vWNor;\nuniform sampler2D uField;\nuniform vec4 uGrid;\nuniform float uBlock;\nuniform vec3 uRoad;\nuniform vec3 uRed;\nuniform vec3 uWhite;\nuniform vec3 uLedge;',
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        if (vField > 0.5 && vField < 4.5) {
          vec2 g = (vWPos.xz - uGrid.xy) / uBlock + 0.5;
          vec4 f = texture2D(uField, g / uGrid.zw);
          bool upper = vField > 1.5;
          float d = 11.0 + 5.0 * (upper ? f.b : f.r);
          float stripe = upper ? f.a : f.g;
          vec3 c = uRoad;
          if (vField < 2.5 && d > ${TRACK_HALF_WIDTH.toFixed(2)} && d < ${CURB_EDGE.toFixed(2)}) c = stripe > 0.5 ? uWhite : uRed;
          if (vField < 2.5 && d >= ${CURB_EDGE.toFixed(2)}) c = uLedge;
          diffuseColor.rgb = c * vColor;
        }
        {
          float bs = vField > 4.5 ? uBlock * 0.25 : uBlock;
          vec3 cell = floor((vWPos - vWNor * 0.01) / bs + 0.0001);
          float h = fract(sin(dot(cell, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
          diffuseColor.rgb *= 0.92 + h * 0.16;
        }`,
      );
  };

  /**
   * What he walks on and against: the road's top and the rails, following
   * the same lines as the blocks (within a small block), as a few long
   * faces, so collision is quick to set up.
   */
  function collisionGeometry(): BufferGeometry {
    const pos: number[] = [];
    const face = (p: number[][], n: number[]) => {
      const e1 = [p[1][0] - p[0][0], p[1][1] - p[0][1], p[1][2] - p[0][2]];
      const e2 = [p[2][0] - p[0][0], p[2][1] - p[0][1], p[2][2] - p[0][2]];
      const cx = e1[1] * e2[2] - e1[2] * e2[1];
      const cy = e1[2] * e2[0] - e1[0] * e2[2];
      const cz = e1[0] * e2[1] - e1[1] * e2[0];
      const order = cx * n[0] + cy * n[1] + cz * n[2] >= 0 ? [0, 1, 2, 0, 2, 3] : [0, 2, 1, 0, 3, 2];
      for (const i of order) pos.push(p[i][0], p[i][1], p[i][2]);
    };
    const normals = trackSamples.map((t: { normal: Vector3 }) => t.normal);
    const at = (i: number, d: number, up = 0) => [samples[i].x + normals[i].x * d, samples[i].y + up, samples[i].z + normals[i].z * d];
    const inOpening = (p: number[]) => {
      const c = Math.floor((p[0] - ox) / B);
      const r = Math.floor((p[2] - oz) / B);
      return opening(c, r) || (c < entryLimit && r >= br.from && r <= br.to);
    };
    const OUT = CURB_EDGE + RAIL_W;
    for (let i = 0; i < count; i += 1) {
      for (const part of [0, 1]) {
        if (!inPart(part, i)) continue;
        if (part === 0 && inPart(1, i) && samples[i].y > 0) continue;
        face([at(i, -OUT), at(i + 1, -OUT), at(i + 1, OUT), at(i, OUT)], [0, 1, 0]);
        for (const side of [-1, 1]) {
          const a0 = at(i, side * CURB_EDGE);
          const b0 = at(i + 1, side * CURB_EDGE);
          if (inOpening(a0) || inOpening(b0)) continue;
          const a1 = at(i, side * OUT);
          const b1 = at(i + 1, side * OUT);
          const up = (p: number[]) => [p[0], p[1] + B, p[2]];
          const inward = [-normals[i].x * side, 0, -normals[i].z * side];
          face([a0, b0, up(b0), up(a0)], inward);
          face([a1, b1, up(b1), up(a1)], inward.map((v) => -v));
          face([up(a0), up(b0), up(b1), up(a1)], [0, 1, 0]);
        }
      }
    }
    // The entry: its road, and its two rails.
    const ex0 = ox + bridgeEnd * B;
    const ex1 = ox + entryLimit * B;
    const ez0 = oz + br.from * B;
    const ez1 = oz + (br.to + 1) * B;
    face([[ex0, 0, ez0], [ex1, 0, ez0], [ex1, 0, ez1], [ex0, 0, ez1]], [0, 1, 0]);
    for (const r of [br.from, br.to]) {
      const z0 = oz + r * B;
      const z1 = z0 + B;
      const x1 = ox + entryEnd * B + 1;
      face([[ex0, 0, z0], [x1, 0, z0], [x1, B, z0], [ex0, B, z0]], [0, 0, -1]);
      face([[ex0, 0, z1], [x1, 0, z1], [x1, B, z1], [ex0, B, z1]], [0, 0, 1]);
      face([[ex0, B, z0], [x1, B, z0], [x1, B, z1], [ex0, B, z1]], [0, 1, 0]);
    }
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(new Float32Array(pos), 3));
    return g;
  }

  const root = new Group();
  root.name = 'block-circuit';
  const visual = new Mesh(build(true), material);
  visual.name = 'circuit blocks';
  visual.castShadow = true;
  visual.receiveShadow = true;
  root.add(visual);
  scene.add(root);

  // What he stands on: the same blocks, square, not drawn.
  const solid = new Group();
  solid.name = 'block-circuit-solid';
  const solidMesh = new Mesh(collisionGeometry());
  solidMesh.name = 'circuit road';
  solid.add(solidMesh);
  solid.updateMatrixWorld(true);
  collision.addSolid(solid);

  // The middle of the road a little way along from the entry.
  let roadPoint = { x: ENTRY.x + offset.x, z: ENTRY.z + offset.z + 30 };
  let best = Infinity;
  for (const p of samples) {
    const d = Math.hypot(p.x - roadPoint.x, p.z - roadPoint.z);
    if (d < best && p.y === 0) {
      best = d;
      roadPoint = { x: p.x, z: p.z };
    }
  }
  roadPoint = { x: roadPoint.x, z: roadPoint.z };

  return {
    root,
    solid,
    offset,
    roadPoint,
    triangleCount: Math.round((visual.geometry.attributes.position.count as number) / 3),
  };
}
