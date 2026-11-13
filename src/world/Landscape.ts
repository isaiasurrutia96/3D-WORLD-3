/**
 * The shape of the island's land, as numbers.
 *
 * This is kept apart from the meshes that draw it because several things
 * need to ask the same question — how high is the ground here — and need
 * the same answer: the terrain itself, the trees that stand on it, the
 * water that laps at it, and the tests that walk it. A height function is
 * the one place they all agree.
 *
 * The island stands in the sea. Sea level is y = 0. From the water it rises
 * over a beach of sand, through low dunes, onto rolling meadow; small
 * mountains stand at the back (north), hills along the flanks, and a few
 * rocky outcrops. Under the water the land keeps going: a shallow shelf to
 * wade and swim over, then down to a sea floor ten metres deep. A few
 * meadows are left open on purpose, for things to be built on later.
 *
 * Nothing constructed is part of it. The roads and bridge gates the race
 * circuits were laid out against are kept further down, untouched, for
 * when racing comes back; the land no longer bends to them.
 */

import { Vector2 } from 'three';

/** The island's mean radius in metres. */
export const ISLAND_RADIUS = 80;

/**
 * The island's outline — the coastline, where the land meets the sea —
 * as a distance from the middle at a bearing.
 *
 * Three slow waves of different lengths so it is a lumpy blob rather than
 * a circle, with a cove cut into the south-west and a headland pushed out
 * to the east, so no two stretches of shore are alike.
 */
export function islandEdge(angle: number): number {
  const near = (centre: number, width: number) => {
    const d = Math.atan2(Math.sin(angle - centre), Math.cos(angle - centre));
    return Math.exp(-(d * d) / (2 * width * width));
  };
  return (
    ISLAND_RADIUS *
    (1 +
      0.1 * Math.sin(angle * 3 + 0.6) +
      0.06 * Math.sin(angle * 5 + 2.1) +
      0.035 * Math.sin(angle * 9 + 4) -
      0.13 * near(2.35, 0.16) +
      0.1 * near(-0.25, 0.14))
  );
}

/** Whether a point is over the island, with a margin in metres. */
export function overIsland(x: number, z: number, margin = 0): boolean {
  return Math.hypot(x, z) < islandEdge(Math.atan2(z, x)) - margin;
}

/** A repeatable pseudo-random number from two numbers, 0 to 1. */
export function hash(a: number, b: number): number {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function smoothstep(edge0: number, edge1: number, value: number): number {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// ---- The road (dormant) ------------------------------------------------------
//
// The roads and bridge gates the race circuits were connected by. Nothing on
// the island uses them now: they are kept so the racing layout in
// src/racing/ still builds, and so the routes can be laid again later.

// ---- The road --------------------------------------------------------------

/**
 * Where the four roads off the island leave it: a point just inside the
 * rim on each side, and the bearing it is at. Each is where a bridge to one
 * of the race circuits begins.
 */
function gateAt(angle: number) {
  const d = islandEdge(angle) * 0.975;
  return { x: Math.cos(angle) * d, z: Math.sin(angle) * d, angle };
}
export const GATES = {
  /** To the Suzuka circuit, due north. */
  north: gateAt(-Math.PI / 2),
  /** To the Winding circuit, due south. */
  south: gateAt(Math.PI / 2),
  /** To the Skyline circuit, due west. */
  west: gateAt(Math.PI),
  /** To the Original circuit, north-east. */
  east: gateAt(Math.atan2(-150, 128)),
};

/** Each road is a run of points from the plaza out, or from the start in. */
export const ROADS: Array<Array<[number, number]>> = [
  [[0, 53], [7, 40], [-5, 24], [-1, 10], [0, 0]],
  [[0, 0], [-14, -5], [-27, -15], [-38, -22]],
  [[0, 0], [10, -9], [21, -19], [30, -28]],
  [[0, 0], [15, 3], [30, 9], [42, 12]],
  [[0, 0], [-14, 6], [-28, 13], [-40, 14]],
  // The four roads off the island, each to the foot of a bridge. The north
  // one runs through the pass between the two big mountains.
  [[0, 0], [0, -30], [2, -60], [GATES.north.x, GATES.north.z]],
  [[0, 53], [0, 60], [GATES.south.x, GATES.south.z]],
  [[0, 0], [-30, 1], [-60, 1], [GATES.west.x, GATES.west.z]],
  [[0, 0], [14, -12], [30, -30], [44, -48], [GATES.east.x, GATES.east.z]],
];
/** Half the width of the road, in metres. */
export const ROAD_HALF = 3.4;

/** A smooth curve through a run of points, as a longer run of points. */
export function smoothRoad(points: Array<[number, number]>, spacing = 1.5): Vector2[] {
  const out: Vector2[] = [];
  const at = (i: number) => points[Math.max(0, Math.min(points.length - 1, i))];
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    const length = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
    const steps = Math.max(2, Math.ceil(length / spacing));
    for (let s = 0; s < steps; s += 1) {
      const t = s / steps;
      const t2 = t * t;
      const t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push(new Vector2(f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])));
    }
  }
  const last = points[points.length - 1];
  out.push(new Vector2(last[0], last[1]));
  return out;
}

/** Every road, already smoothed. */
export const ROAD_PATHS: Vector2[][] = ROADS.map((road) => smoothRoad(road));

/**
 * How far past which the distance to a road no longer matters to the land:
 * the height cap grows with distance and is above the tallest mountain well
 * before this.
 */
const ROAD_FAR = 36;
const ROAD_CELL = 12;

interface RoadSegment {
  ax: number;
  az: number;
  dx: number;
  dz: number;
  len2: number;
}

/**
 * Every road segment, filed under each cell of a grid it is within
 * ROAD_FAR of, so asking how far a point is from a road looks at a handful
 * of segments and not at all of them. The land asks this several million
 * times when the island is built, and on an older machine that was most of
 * the wait.
 */
const roadCells = new Map<string, RoadSegment[]>();
for (const path of ROAD_PATHS) {
  for (let i = 0; i < path.length - 1; i += 1) {
    const a = path[i];
    const b = path[i + 1];
    const segment = { ax: a.x, az: a.y, dx: b.x - a.x, dz: b.y - a.y, len2: (b.x - a.x) ** 2 + (b.y - a.y) ** 2 };
    const x0 = Math.floor((Math.min(a.x, b.x) - ROAD_FAR) / ROAD_CELL);
    const x1 = Math.floor((Math.max(a.x, b.x) + ROAD_FAR) / ROAD_CELL);
    const z0 = Math.floor((Math.min(a.y, b.y) - ROAD_FAR) / ROAD_CELL);
    const z1 = Math.floor((Math.max(a.y, b.y) + ROAD_FAR) / ROAD_CELL);
    for (let cx = x0; cx <= x1; cx += 1) {
      for (let cz = z0; cz <= z1; cz += 1) {
        const key = `${cx},${cz}`;
        const list = roadCells.get(key);
        if (list) list.push(segment);
        else roadCells.set(key, [segment]);
      }
    }
  }
}

/**
 * How far a point is from the nearest part of any road, or ROAD_FAR if no
 * road is that close.
 */
export function roadDistance(x: number, z: number): number {
  const list = roadCells.get(`${Math.floor(x / ROAD_CELL)},${Math.floor(z / ROAD_CELL)}`);
  let best = ROAD_FAR;
  if (!list) return best;
  for (const s of list) {
    const t = s.len2 > 0 ? Math.max(0, Math.min(1, ((x - s.ax) * s.dx + (z - s.az) * s.dz) / s.len2)) : 0;
    const d = Math.hypot(x - (s.ax + s.dx * t), z - (s.az + s.dz * t));
    if (d < best) best = d;
  }
  return best;
}

// ---- The open meadows ----------------------------------------------------------

/**
 * Ground left open on purpose: wide, gentle meadows with no trees or rocks
 * on them and no hill rising out of them, for activities and buildings to
 * go on later. They are not flattened — the meadow keeps its gentle roll —
 * so building on one later means levelling only what is built on.
 */
export const MEADOWS = {
  /** Where he starts, just up from the south beach. */
  start: { x: 0, z: 50, r: 13 },
  /** The middle of the island. */
  middle: { x: 0, z: 2, r: 17 },
  west: { x: -38, z: -20, r: 18 },
  east: { x: 32, z: -26, r: 15 },
  southWest: { x: -36, z: 18, r: 15 },
} as const;

/** The pond: still fresh water in a hollow on the east side. */
export const POND = { x: 44, z: 14, r: 11, surface: 2.2 };

// ---- The hills -------------------------------------------------------------

interface Rise {
  x: number;
  z: number;
  r: number;
  h: number;
  /** How rough the ground is on it: grass hills are soft, outcrops are not. */
  rough: number;
}

/**
 * The land that stands up out of the meadow. Radii and heights are chosen
 * together: a rise of height h over radius r is steepest at 1.5 h / r, and
 * the hills stay under about 40 degrees, short of what he can walk (52).
 * The mountains and outcrops are steeper and are rock where they are; they
 * are scenery to look at, and nothing asks him to climb them.
 */
export const RISES: Rise[] = [
  // The back of the island: small mountains, whose feet run into the sea
  // as rocky shore.
  { x: -14, z: -60, r: 42, h: 30, rough: 1.4 },
  { x: 24, z: -60, r: 34, h: 24, rough: 1.2 },
  { x: -48, z: -48, r: 26, h: 16, rough: 1.1 },
  // Hills along the flanks and front, clear of the start.
  { x: -60, z: 36, r: 18, h: 8, rough: 0.6 },
  { x: 50, z: 42, r: 22, h: 8, rough: 0.6 },
  { x: 64, z: -8, r: 24, h: 11, rough: 0.7 },
  { x: -64, z: -2, r: 22, h: 10, rough: 0.7 },
  { x: -6, z: -32, r: 18, h: 5, rough: 0.5 },
  { x: 20, z: 30, r: 14, h: 4, rough: 0.4 },
  { x: -22, z: 38, r: 14, h: 3.5, rough: 0.4 },
  // Rocky outcrops, small and steeper.
  { x: -32, z: -56, r: 14, h: 11, rough: 2.2 },
  { x: 56, z: -18, r: 12, h: 8, rough: 2.2 },
  { x: -62, z: 26, r: 11, h: 7, rough: 2 },
  { x: 8, z: -44, r: 13, h: 10, rough: 2.2 },
  // Out in the water: a sandy islet to swim to, off the south-east shore.
  { x: 76, z: 76, r: 15, h: 8, rough: 0.5 },
];

function rise(x: number, z: number, r: Rise): number {
  const d = Math.hypot(x - r.x, z - r.z);
  if (d >= r.r) return 0;
  // A round, broad top rather than a point: it is the shape the mountains
  // were liked in, and a plateau can be walked on where a peak cannot.
  const t = smoothstep(0, 1, 1 - d / r.r);
  // A little grain, strongest where the ground is roughest, and fading to
  // nothing at the foot so the rise meets the ground without a seam.
  const grain =
    (Math.sin(x * 0.23 + Math.sin(z * 0.19) * 1.7) + Math.sin(z * 0.29 - x * 0.11 + 1.3)) * 0.5;
  return r.h * t + grain * r.rough * 0.7 * t;
}

// ---- The ground between them ------------------------------------------------

/** How high the top of the beach is: the sand gives way to grass here. */
export const BEACH_TOP = 1.35;

/** How far inland the sand runs at a bearing, in metres. */
export function beachWidth(angle: number): number {
  return 11 + 4 * Math.sin(angle * 2 + 1) + 2 * Math.sin(angle * 5 + 0.3);
}

/** How far a point is inside the coastline (negative out to sea). */
export function inland(x: number, z: number): number {
  return islandEdge(Math.atan2(z, x)) - Math.hypot(x, z);
}

/**
 * The ground with no hills on it: the sea floor, the shelf, the beach, the
 * dunes and the meadow, by how far inland a point is. It crosses sea level
 * on a slope rather than flat, so the waterline is a clean line.
 */
function baseHeight(x: number, z: number): number {
  const d = inland(x, z);
  if (d < 0) {
    // A shallow shelf to wade and swim over, then down to the sea floor.
    return -3 * (1 - Math.exp(d / 14)) - 7 * smoothstep(-15, -55, d);
  }
  const bw = beachWidth(Math.atan2(z, x));
  const beach = BEACH_TOP * (1 - Math.exp((-d * 0.14) / BEACH_TOP));
  const dunes = 1.9 * smoothstep(bw * 0.8, bw + 22, d);
  // The meadow rolls a little, more so further from the shore.
  const roll =
    (Math.sin(x * 0.07 + 0.5) * Math.sin(z * 0.06 - 1.1) + 0.5 * Math.sin((x - z) * 0.09 + 2)) *
    0.9 *
    smoothstep(bw, bw + 25, d);
  return beach + dunes + roll;
}

/**
 * How high hills may stand at a point, given how close it is to an open
 * meadow: they ease down to meet it as a ramp rather than rising out of it.
 */
function riseAllowed(x: number, z: number): number {
  let near = Infinity;
  for (const m of Object.values(MEADOWS)) near = Math.min(near, Math.hypot(x - m.x, z - m.z) - m.r);
  return 1.6 * Math.max(0, near);
}

/** The lower of two heights, rounded off where they cross. */
function softMin(a: number, b: number, k: number): number {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - (h * h * k) / 4;
}

/** The pond's hollow: a bowl under its surface, a gentle bank round it. */
function pondHollow(x: number, z: number): number {
  const d = Math.hypot(x - POND.x, z - POND.z);
  if (d < POND.r) return POND.surface - 2.4 * (1 - (d / POND.r) ** 2) - 0.15;
  return POND.surface - 0.15 + 0.28 * (d - POND.r);
}

/** How high the ground is at a point, anywhere: on the island or under the sea. */
export function terrainHeight(x: number, z: number): number {
  let hills = 0;
  for (const r of RISES) hills += rise(x, z, r);
  const h = baseHeight(x, z) + Math.max(0, softMin(hills, riseAllowed(x, z), 4));
  return softMin(h, pondHollow(x, z), 1.2);
}

/** How steep the ground is at a point, as rise over run. */
export function slopeAt(x: number, z: number): number {
  const e = 1.2;
  const dx = terrainHeight(x + e, z) - terrainHeight(x - e, z);
  const dz = terrainHeight(x, z + e) - terrainHeight(x, z - e);
  return Math.hypot(dx, dz) / (2 * e);
}

/** Whether a point is inside an open meadow or the pond, with a margin. */
export function keptOpen(x: number, z: number, margin = 0): boolean {
  if (Math.hypot(x - POND.x, z - POND.z) < POND.r + 3 + margin) return true;
  return Object.values(MEADOWS).some((m) => Math.hypot(x - m.x, z - m.z) < m.r + margin);
}

/** How far out the sea can be swum before the current turns him back. */
export const SEA_LIMIT = 150;
