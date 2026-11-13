/**
 * The four race circuits, where they stand around the island, and the
 * roads and bridges that join them to it.
 *
 * The circuits are not copied. They are the racing game's own — its tracks,
 * its bridge stubs, its road and rail surfaces — imported from where they
 * live, standing exactly where that game puts them: the Original circuit to
 * the north-east, Skyline to the west, Suzuka to the north and Winding to the
 * south. The racing game stood them round a floor slab; here they stand
 * round the island, and what this file adds is the part that was the slab's
 * job: a road from each side of the island to the foot of each circuit's
 * bridge.
 *
 * It is also where the one physics world is made. A kart asks two things of
 * the ground — how high is it here, and what is in the way — and the racing
 * code answers them for its circuits. This answers them for the island and
 * the connecting bridges as well, and falls back on the racing code for the
 * rest, so the kart behaves on a bridge exactly as it behaves on a track.
 *
 * Nothing here draws anything or touches the page, so it can be run and
 * tested without a browser.
 */

import { CatmullRomCurve3, Vector3 } from 'three';
import { GATES, overIsland, terrainHeight } from '../world/Landscape.ts';
import {
  accessBridges,
  createRailResolver,
  createRoadSurface,
  resolveTrackRails,
  trackRoadSurface,
} from '../../apps/letsgo-racing/src/world.js';
import { COURSES } from '../../apps/letsgo-racing/src/courses.js';

export { COURSES };

/** Half the width of a connecting bridge, matching the racing code's own. */
export const BRIDGE_HALF = 10;

/** One road and its rails, in the same form the racing code uses. */
export interface Bridge {
  name: string;
  /** Which course this leads to. */
  courseId: string;
  samples: Array<{ point: Vector3; normal: Vector3; distance: number }>;
  segments: Array<{ a: Vector3; b: Vector3; halfWidth: number; corners: Vector3[] }>;
  rails: Array<{ a: Vector3; b: Vector3 }>;
  length: number;
}

function buildBridge(name: string, courseId: string, controls: Array<[number, number]>): Bridge {
  const curve = new CatmullRomCurve3(
    controls.map(([x, z]) => new Vector3(x, 0, z)),
    false,
    'centripetal',
  );
  const length = curve.getLength();
  const count = Math.max(8, Math.ceil(length / 2));
  const samples = Array.from({ length: count + 1 }, (_, i) => {
    const point = curve.getPointAt(i / count);
    const tangent = curve.getTangentAt(i / count);
    point.y = 0;
    return {
      point,
      normal: new Vector3(-tangent.z, 0, tangent.x).normalize(),
      distance: (i / count) * length,
    };
  });
  const offset = (s: (typeof samples)[number], d: number) =>
    s.point.clone().addScaledVector(s.normal, d);
  const segments: Bridge['segments'] = [];
  const rails: Bridge['rails'] = [];
  for (let i = 0; i < count; i += 1) {
    const a = samples[i];
    const b = samples[i + 1];
    segments.push({
      a: a.point,
      b: b.point,
      halfWidth: BRIDGE_HALF,
      corners: [offset(a, -BRIDGE_HALF), offset(b, -BRIDGE_HALF), offset(b, BRIDGE_HALF), offset(a, BRIDGE_HALF)],
    });
    // Rails only once the road is off the land, so a kart can leave the
    // island onto the bridge from any side of the gate.
    for (const side of [-1, 1]) {
      const ra = offset(a, side * (BRIDGE_HALF + 0.15));
      const rb = offset(b, side * (BRIDGE_HALF + 0.15));
      if (overIsland(ra.x, ra.z, 1) || overIsland(rb.x, rb.z, 1)) continue;
      rails.push({ a: ra, b: rb });
    }
  }
  return { name, courseId, samples, segments, rails, length };
}

/**
 * The four bridges. Each ends where the racing code's own bridge begins,
 * lined up with it: Skyline's runs west along z = 0 from x = -128, Suzuka's
 * north along x = 0 from z = -228, Winding's south along x = 0 from z = 228,
 * and the Original's east along z = -150 from x = 130.
 */
export const BRIDGES: Bridge[] = [
  buildBridge('Original Circuit', 'letsgo-circuit-d4a711d-start95-v1', [
    [GATES.east.x, GATES.east.z],
    [62, -72],
    [88, -122],
    [108, -150],
    [131, -150],
  ]),
  buildBridge('Skyline Circuit', 'letsgo-skyline-v1', [
    [GATES.west.x, GATES.west.z],
    [-100, 0],
    [-129, 0],
  ]),
  buildBridge('Suzuka Circuit', 'letsgo-suzuka-v1', [
    [GATES.north.x, GATES.north.z],
    [0, -160],
    [0, -229],
  ]),
  buildBridge('Winding Circuit', 'letsgo-winding-v1', [
    [GATES.south.x, GATES.south.z],
    [0, 150],
    [0, 229],
  ]),
];

const bridgeSurface = createRoadSurface(
  BRIDGES.flatMap((b) => b.segments),
  BRIDGE_HALF + 2,
);
const bridgeRails = createRailResolver(BRIDGES.flatMap((b) => b.rails));

/**
 * How steep the land can be before a kart treats it as a wall: a rise of
 * this much over the length of the kart's body is a step it climbs, more is
 * a face it stops against.
 */
const KART_CLIMB = 0.9;

/** The ground under a point: the land, the bridges, the circuits. */
function supportHeight(x: number, z: number, maximum = Infinity): number | null {
  let height: number | null = null;
  const consider = (value: number | null) => {
    if (value !== null && value <= maximum && (height === null || value > height)) height = value;
  };
  if (overIsland(x, z)) consider(terrainHeight(x, z));
  if (maximum >= 0) {
    for (const stub of accessBridges as Array<{ minX: number; maxX: number; minZ: number; maxZ: number }>) {
      if (x >= stub.minX && x <= stub.maxX && z >= stub.minZ && z <= stub.maxZ) consider(0);
    }
  }
  consider(bridgeSurface(x, z, maximum));
  consider(trackRoadSurface(x, z, maximum));
  return height;
}

/** What is in the way: the rails of the bridges and circuits, and steep land. */
function resolveHorizontal(
  x: number,
  z: number,
  nextX: number,
  nextZ: number,
  feetY: number,
  radius = 0.48,
  height = 2.3,
): { x: number; z: number } {
  let resolved = resolveTrackRails(x, z, nextX, nextZ, feetY, radius, height) as { x: number; z: number };
  resolved = bridgeRails(x, z, resolved.x, resolved.z, feetY, radius, height) as { x: number; z: number };
  // Land that rises faster than a kart can climb is a wall. Only where
  // there is no road under the kart: on a bridge the land is not in play.
  if (overIsland(resolved.x, resolved.z) && !onRoad(resolved.x, resolved.z)) {
    const rise = terrainHeight(resolved.x, resolved.z) - feetY;
    if (rise > KART_CLIMB) {
      // Slide along whichever axis is still open, else stop where it was.
      const openX = terrainHeight(resolved.x, z) - feetY <= KART_CLIMB;
      const openZ = terrainHeight(x, resolved.z) - feetY <= KART_CLIMB;
      resolved = { x: openX ? resolved.x : x, z: openZ ? resolved.z : z };
    }
  }
  return resolved;
}

function onRoad(x: number, z: number): boolean {
  return bridgeSurface(x, z, Infinity) !== null || trackRoadSurface(x, z, Infinity) !== null;
}

/** The one world a kart drives in. */
export const worldPhysics = { supportHeight, resolveHorizontal };
