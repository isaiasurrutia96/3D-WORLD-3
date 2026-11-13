/**
 * The shape of the island's land, as numbers.
 *
 * This is kept apart from the meshes that draw it because several things
 * need to ask the same question — how high is the ground here — and need
 * the same answer: the terrain itself, the trees that stand on it, the road
 * laid across it, and the tests that walk it. A height function is the one
 * place they all agree.
 *
 * The land is mostly gentle, because he has to walk it. Hills and small
 * mountains rise toward the back of the island and at its flanks; the road
 * and the plots that things will be built on are held level, with the hills
 * easing down to meet them rather than stopping at a wall.
 */

import { Vector2 } from 'three';

/** The island's mean radius in metres. */
export const ISLAND_RADIUS = 80;

/**
 * The island's outline: how far from the middle the edge is at a bearing.
 *
 * Three slow waves of different lengths, so it is a lumpy blob rather than
 * a circle and no two sides are alike.
 */
export function islandEdge(angle: number): number {
  return (
    ISLAND_RADIUS *
    (1 +
      0.1 * Math.sin(angle * 3 + 0.6) +
      0.06 * Math.sin(angle * 5 + 2.1) +
      0.035 * Math.sin(angle * 9 + 4))
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

// ---- The level places ------------------------------------------------------

/**
 * Ground held flat at sea-level-of-the-island: where he starts, the plaza
 * the roads meet at, and one plot for each thing that will be built. They
 * are here so that building on them later never means flattening anything.
 */
export const PLOTS = {
  start: { x: 0, z: 53, r: 14 },
  plaza: { x: 0, z: 0, r: 16 },
  golf: { x: -38, z: -22, r: 22 },
  tower: { x: 30, z: -28, r: 18 },
  pond: { x: 42, z: 12, r: 20 },
  games: { x: -40, z: 14, r: 20 },
} as const;

// ---- The road --------------------------------------------------------------

/** Each road is a run of points from the plaza out, or from the start in. */
export const ROADS: Array<Array<[number, number]>> = [
  [[0, 53], [7, 40], [-5, 24], [-1, 10], [0, 0]],
  [[0, 0], [-14, -5], [-27, -15], [-38, -22]],
  [[0, 0], [10, -9], [21, -19], [30, -28]],
  [[0, 0], [15, 3], [30, 9], [42, 12]],
  [[0, 0], [-14, 6], [-28, 13], [-40, 14]],
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

/** How far a point is from the nearest part of any road. */
export function roadDistance(x: number, z: number): number {
  let best = Infinity;
  for (const path of ROAD_PATHS) {
    for (let i = 0; i < path.length - 1; i += 1) {
      const a = path[i];
      const b = path[i + 1];
      const dx = b.x - a.x;
      const dz = b.y - a.y;
      const len2 = dx * dx + dz * dz;
      const t = len2 > 0 ? Math.max(0, Math.min(1, ((x - a.x) * dx + (z - a.y) * dz) / len2)) : 0;
      best = Math.min(best, Math.hypot(x - (a.x + dx * t), z - (a.y + dz * t)));
    }
  }
  return best;
}

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
 * The land. Radii and heights are chosen together: a rise of height h over
 * radius r is steepest at 1.5 h / r, and every one of these stays under
 * about 45 degrees, short of what he can walk (52). The rocky ones are the
 * steep end and are coloured as rock where they are.
 */
export const RISES: Rise[] = [
  // The back of the island: small mountains.
  { x: -14, z: -62, r: 42, h: 30, rough: 1.4 },
  { x: 24, z: -62, r: 34, h: 24, rough: 1.2 },
  { x: -46, z: -52, r: 26, h: 16, rough: 1.1 },
  // Hills along the flanks and front, well clear of the start.
  { x: -48, z: 44, r: 28, h: 12, rough: 0.6 },
  { x: 48, z: 44, r: 26, h: 11, rough: 0.6 },
  { x: 66, z: -6, r: 26, h: 14, rough: 0.7 },
  { x: -64, z: -4, r: 22, h: 13, rough: 0.7 },
  { x: -8, z: -34, r: 20, h: 6, rough: 0.5 },
  { x: 18, z: 32, r: 15, h: 5, rough: 0.4 },
  { x: -24, z: 38, r: 16, h: 4, rough: 0.4 },
  { x: 34, z: 40, r: 14, h: 3.5, rough: 0.4 },
  // Rocky outcrops, small and steeper.
  { x: -34, z: -58, r: 15, h: 12, rough: 2.2 },
  { x: 58, z: -14, r: 13, h: 9, rough: 2.2 },
  { x: -64, z: 32, r: 12, h: 8, rough: 2 },
  { x: 8, z: -46, r: 14, h: 11, rough: 2.2 },
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

/**
 * How high the ground is allowed to stand at a point, given how close it is
 * to a place that has to be level.
 *
 * This replaced a blend that eased the hills down over a fixed distance,
 * which is fine for a small hill and a cliff for a mountain: thirty metres
 * of height brought down over eleven is a wall. A cap that grows with the
 * distance from the level ground cannot make a wall however high the land
 * behind it is — at worst the mountain's flank is cut into a ramp.
 */
function heightAllowed(x: number, z: number): number {
  let near = roadDistance(x, z) - (ROAD_HALF + 1);
  for (const plot of Object.values(PLOTS)) {
    near = Math.min(near, Math.hypot(x - plot.x, z - plot.z) - plot.r);
  }
  const d = Math.max(0, near);
  const fromPlots = 1.7 * d;
  // And off the rim: a clean lip all round, then the land free to climb. A
  // mountain rising steeply from the edge is rock and is meant to look it.
  const e = Math.max(0, islandEdge(Math.atan2(z, x)) - Math.hypot(x, z) - 4);
  return Math.min(fromPlots, 2.1 * e);
}

/** The lower of two heights, rounded off where they cross. */
function softMin(a: number, b: number, k: number): number {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - (h * h * k) / 4;
}

/** How high the ground is at a point on the island. Zero at the level places. */
export function terrainHeight(x: number, z: number): number {
  let h = 0;
  for (const r of RISES) h += rise(x, z, r);
  const capped = Math.max(0, softMin(Math.max(0, h), heightAllowed(x, z), 5));
  return capped;
}
