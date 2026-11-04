/**
 * A circuit, floating above the slab and joined to it by a ramp.
 *
 * It is built from a closed curve rather than placed piece by piece. The
 * curve is sampled at a fixed spacing, and at every sample the left and
 * right edges are worked out from the direction of travel; everything else —
 * road, kerbs, guard rails and the posts holding them — is a ribbon of quads
 * laid along those edges. Doing it this way means the shape of the circuit is
 * a list of corner points and nothing else, so it can be redrawn by moving
 * them.
 *
 * The kerbs alternate red and white along their length, which is what makes
 * speed and corner entry readable; without them a grey ribbon at a distance
 * gives no sense of how fast anything is moving.
 */

import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  Vector3,
} from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/** Half the width of the driving surface. */
const ROAD_HALF = 3.6;
/** Width of the striped kerb outside each edge of the road. */
const KERB_WIDTH = 1.1;
/** Length of one red or one white block of kerb. */
const KERB_BLOCK = 2.2;
/** Height of the rail above the road, and how thick it is. */
const RAIL_HEIGHT = 0.95;
const RAIL_DEPTH = 0.16;
const POST_EVERY = 4.4;
/** How far apart the curve is sampled. Smaller is smoother and heavier. */
const STEP = 1.6;
/** Thickness of the road slab, so it reads as a structure from below. */
const ROAD_THICK = 0.45;
/** How steep the ramp onto the circuit is. Walkable, and runnable up. */
const RAMP_SLOPE = (24 * Math.PI) / 180;

const ROAD_COLOUR = new Color('#23262c');
const LINE_COLOUR = new Color('#c8ccd4');
const KERB_RED = new Color('#b4352f');
const KERB_WHITE = new Color('#d9dbe0');
const RAIL_COLOUR = new Color('#767f8d');
const UNDER_COLOUR = new Color('#1b1e24');

export interface TrackWorld {
  root: Group;
  /** The parts that are solid to stand on and run into. */
  solid: Group;
  triangleCount: number;
  /** Where the ramp meets the slab, for walking up onto it. */
  rampFoot: Vector3;
  /** Where it meets the circuit. */
  rampTop: Vector3;
}

/**
 * The circuit's corner points, in metres, read off the reference layout: a
 * long straight down one side, a pair of hairpins at the far end, a sweeping
 * S through the middle and a wide loop back. Heights rise and fall gently so
 * the thing reads as a circuit rather than a flat ring.
 */
function circuitPoints(height: number): Vector3[] {
  const raw: Array<[number, number, number]> = [
    [-46, 0, -30],
    [-20, 1.4, -34],
    [6, 2.2, -33],
    [26, 1.6, -28],
    [36, 0.6, -16],
    [30, 0, -4],
    [12, -0.6, -2],
    [-2, -0.4, 4],
    [4, 0.4, 16],
    [22, 1.2, 24],
    [34, 1.0, 34],
    [22, 0.2, 42],
    [2, -0.4, 38],
    [-10, -0.2, 28],
    [-6, 0.6, 16],
    [-18, 1.2, 10],
    [-34, 1.4, 14],
    [-44, 0.8, 26],
    [-54, 0.2, 16],
    [-48, -0.2, 2],
    [-30, -0.4, -2],
    [-24, 0.2, -12],
    [-36, 0.8, -20],
  ];
  return raw.map(([x, y, z]) => new Vector3(x, height + y, z));
}

export function buildTrack(height = 13): TrackWorld {
  const root = new Group();
  root.name = 'track';
  const solid = new Group();
  solid.name = 'track-solid';
  root.add(solid);

  const curve = new CatmullRomCurve3(circuitPoints(height), true, 'catmullrom', 0.5);
  const length = curve.getLength();
  const samples = Math.max(32, Math.round(length / STEP));

  // One frame per sample: the point, and the left and right directions there.
  const points: Vector3[] = [];
  const sides: Vector3[] = [];
  const up = new Vector3(0, 1, 0);
  for (let i = 0; i < samples; i += 1) {
    const t = i / samples;
    points.push(curve.getPointAt(t));
    const tangent = curve.getTangentAt(t);
    tangent.y = 0;
    sides.push(tangent.normalize().cross(up).normalize());
  }

  const pieces: BufferGeometry[] = [];
  pieces.push(surface(points, sides, -ROAD_HALF, ROAD_HALF, 0, ROAD_COLOUR));
  // A pale line down the middle, lifted a hair so it does not fight the road.
  pieces.push(surface(points, sides, -0.12, 0.12, 0.012, LINE_COLOUR));
  // The underside, so the thing has a body when seen from below.
  pieces.push(surface(points, sides, -ROAD_HALF, ROAD_HALF, -ROAD_THICK, UNDER_COLOUR, true));
  pieces.push(skirt(points, sides, ROAD_HALF));
  pieces.push(skirt(points, sides, -ROAD_HALF));

  // Kerbs: alternating blocks along each outside edge.
  pieces.push(kerb(points, sides, ROAD_HALF, ROAD_HALF + KERB_WIDTH));
  pieces.push(kerb(points, sides, -ROAD_HALF - KERB_WIDTH, -ROAD_HALF));

  const surfaceMesh = new Mesh(
    mergeGeometries(pieces, false),
    new MeshStandardMaterial({ vertexColors: true, roughness: 0.93 }),
  );
  surfaceMesh.name = 'track-road';
  surfaceMesh.castShadow = true;
  surfaceMesh.receiveShadow = true;
  solid.add(surfaceMesh);

  // Where the ramp meets the circuit, worked out before the rails so they
  // can be left out there. A rail across the entrance would simply be a
  // fence in the way of the only route up.
  const joinIndex = nearestTo(points, new Vector3(6, 0, -6));
  const gap = Math.ceil(3 / STEP);
  const inGap = (i: number) => {
    const d = Math.abs(i - joinIndex);
    return Math.min(d, samples - d) <= gap;
  };

  // Guard rails along both outside edges, with posts.
  const rails: BufferGeometry[] = [];
  const offset = ROAD_HALF + KERB_WIDTH;
  rails.push(rail(points, sides, offset, inGap));
  rails.push(rail(points, sides, -offset, inGap));
  const postStep = Math.max(1, Math.round(POST_EVERY / STEP));
  for (let i = 0; i < samples; i += postStep) {
    if (inGap(i)) continue;
    rails.push(post(points[i], sides[i], offset));
    rails.push(post(points[i], sides[i], -offset));
  }
  const railMesh = new Mesh(
    mergeGeometries(rails, false),
    new MeshStandardMaterial({ color: RAIL_COLOUR, roughness: 0.6, metalness: 0.25 }),
  );
  railMesh.name = 'track-rails';
  railMesh.castShadow = true;
  railMesh.receiveShadow = true;
  solid.add(railMesh);

  // The ramp: a straight run from the slab up to the track. It leaves the
  // circuit heading away from the middle of it, so it cannot run back under
  // the track it is joining.
  const middle = new Vector3();
  for (const point of points) middle.add(point);
  middle.multiplyScalar(1 / points.length);
  // It has to meet the outside edge of the circuit, not its centre line.
  // Running it to the centre line put the top of the ramp two metres below
  // the road, under the lip of the kerb, which is a wall to run into rather
  // than a way up.
  const joinPoint = points[joinIndex];
  const joinSide = sides[joinIndex];
  const outwardSign =
    (joinPoint.x - middle.x) * joinSide.x + (joinPoint.z - middle.z) * joinSide.z >= 0 ? 1 : -1;
  const edgePoint = new Vector3(
    joinPoint.x + joinSide.x * outwardSign * (ROAD_HALF + KERB_WIDTH),
    joinPoint.y,
    joinPoint.z + joinSide.z * outwardSign * (ROAD_HALF + KERB_WIDTH),
  );
  const ramp = buildRamp(edgePoint, middle);
  solid.add(ramp.mesh);

  let triangleCount = 0;
  root.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    const geometry = object.geometry;
    if (geometry.index) triangleCount += geometry.index.count / 3;
    else if (geometry.attributes.position) triangleCount += geometry.attributes.position.count / 3;
  });

  return {
    root,
    solid,
    triangleCount,
    rampFoot: ramp.foot,
    rampTop: edgePoint.clone(),
  };
}

/** Which sample is closest to a point on the ground. */
function nearestTo(points: Vector3[], target: Vector3): number {
  let best = 0;
  let bestDistance = Infinity;
  for (let i = 0; i < points.length; i += 1) {
    const dx = points[i].x - target.x;
    const dz = points[i].z - target.z;
    const distance = dx * dx + dz * dz;
    if (distance < bestDistance) {
      bestDistance = distance;
      best = i;
    }
  }
  return best;
}

/**
 * A flat ribbon between two offsets from the centre line, closed back on
 * itself. `lift` moves it up or down; `flip` turns it over so an underside
 * faces the right way.
 */
function surface(
  points: Vector3[],
  sides: Vector3[],
  from: number,
  to: number,
  lift: number,
  colour: Color,
  flip = false,
): BufferGeometry {
  const count = points.length;
  const position: number[] = [];
  const colours: number[] = [];

  for (let i = 0; i < count; i += 1) {
    const j = (i + 1) % count;
    const a = edge(points[i], sides[i], from, lift);
    const b = edge(points[i], sides[i], to, lift);
    const c = edge(points[j], sides[j], from, lift);
    const d = edge(points[j], sides[j], to, lift);
    if (flip) quad(position, a, c, d, b);
    else quad(position, a, b, d, c);
    for (let k = 0; k < 6; k += 1) colours.push(colour.r, colour.g, colour.b);
  }
  return fromArrays(position, colours);
}

/** The vertical side of the road slab, from the surface down to its underside. */
function skirt(points: Vector3[], sides: Vector3[], at: number): BufferGeometry {
  const count = points.length;
  const position: number[] = [];
  const colours: number[] = [];
  const outward = at > 0;
  for (let i = 0; i < count; i += 1) {
    const j = (i + 1) % count;
    const top1 = edge(points[i], sides[i], at, 0);
    const top2 = edge(points[j], sides[j], at, 0);
    const low1 = edge(points[i], sides[i], at, -ROAD_THICK);
    const low2 = edge(points[j], sides[j], at, -ROAD_THICK);
    if (outward) quad(position, top1, low1, low2, top2);
    else quad(position, top1, top2, low2, low1);
    for (let k = 0; k < 6; k += 1) colours.push(UNDER_COLOUR.r, UNDER_COLOUR.g, UNDER_COLOUR.b);
  }
  return fromArrays(position, colours);
}

/** A kerb: the same ribbon, but coloured in alternating blocks along it. */
function kerb(points: Vector3[], sides: Vector3[], from: number, to: number): BufferGeometry {
  const count = points.length;
  const position: number[] = [];
  const colours: number[] = [];
  let run = 0;
  let red = true;

  for (let i = 0; i < count; i += 1) {
    const j = (i + 1) % count;
    run += points[i].distanceTo(points[j]);
    if (run >= KERB_BLOCK) {
      run -= KERB_BLOCK;
      red = !red;
    }
    const colour = red ? KERB_RED : KERB_WHITE;

    const a = edge(points[i], sides[i], from, 0.04);
    const b = edge(points[i], sides[i], to, 0.04);
    const c = edge(points[j], sides[j], from, 0.04);
    const d = edge(points[j], sides[j], to, 0.04);
    quad(position, a, b, d, c);
    for (let k = 0; k < 6; k += 1) colours.push(colour.r, colour.g, colour.b);
  }
  return fromArrays(position, colours);
}

/** The rail itself: a band standing on edge, following the same line. */
function rail(
  points: Vector3[],
  sides: Vector3[],
  at: number,
  skip: (i: number) => boolean,
): BufferGeometry {
  const count = points.length;
  const position: number[] = [];
  for (let i = 0; i < count; i += 1) {
    if (skip(i)) continue;
    const j = (i + 1) % count;
    const low1 = edge(points[i], sides[i], at, RAIL_HEIGHT - RAIL_DEPTH);
    const low2 = edge(points[j], sides[j], at, RAIL_HEIGHT - RAIL_DEPTH);
    const high1 = edge(points[i], sides[i], at, RAIL_HEIGHT);
    const high2 = edge(points[j], sides[j], at, RAIL_HEIGHT);
    // Both faces, so it is visible and solid from either side.
    quad(position, low1, high1, high2, low2);
    quad(position, low1, low2, high2, high1);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(position), 3));
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * One post holding the rail up. Returned without an index, because the rails
 * it is merged with are built as loose triangles and the two cannot be
 * combined otherwise.
 */
function post(point: Vector3, side: Vector3, at: number): BufferGeometry {
  const geometry = new BoxGeometry(0.14, RAIL_HEIGHT, 0.14);
  const base = edge(point, side, at, RAIL_HEIGHT / 2);
  geometry.translate(base.x, base.y, base.z);
  const loose = geometry.toNonIndexed();
  geometry.dispose();
  // Only position survives: the rails it merges with carry nothing else,
  // and every geometry in a merge has to have the same set of attributes.
  loose.deleteAttribute('uv');
  loose.deleteAttribute('normal');
  loose.computeVertexNormals();
  return loose;
}

function buildRamp(top: Vector3, middle: Vector3): { mesh: Mesh; foot: Vector3 } {
  // Away from the middle of the circuit, and long enough that running up it
  // is running rather than climbing.
  const outward = new Vector3(top.x - middle.x, 0, top.z - middle.z).normalize();
  const run = top.y / Math.tan(RAMP_SLOPE);
  const foot = new Vector3(top.x + outward.x * run, 0, top.z + outward.z * run);

  const half = ROAD_HALF * 1.25;
  const across = new Vector3(-outward.z, 0, outward.x).multiplyScalar(half);
  const position: number[] = [];
  const colours: number[] = [];
  const a = new Vector3(top.x - across.x, top.y, top.z - across.z);
  const b = new Vector3(top.x + across.x, top.y, top.z + across.z);
  const c = new Vector3(foot.x - across.x, foot.y, foot.z - across.z);
  const d = new Vector3(foot.x + across.x, foot.y, foot.z + across.z);
  quad(position, a, b, d, c);
  for (let k = 0; k < 6; k += 1) colours.push(ROAD_COLOUR.r, ROAD_COLOUR.g, ROAD_COLOUR.b);

  const mesh = new Mesh(
    fromArrays(position, colours),
    new MeshStandardMaterial({ vertexColors: true, roughness: 0.93, side: 2 }),
  );
  mesh.name = 'track-ramp';
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return { mesh, foot };
}

function edge(point: Vector3, side: Vector3, at: number, lift: number): Vector3 {
  return new Vector3(point.x + side.x * at, point.y + lift, point.z + side.z * at);
}

function quad(out: number[], a: Vector3, b: Vector3, c: Vector3, d: Vector3): void {
  out.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
  out.push(a.x, a.y, a.z, c.x, c.y, c.z, d.x, d.y, d.z);
}

function fromArrays(position: number[], colours: number[]): BufferGeometry {
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(position), 3));
  geometry.setAttribute('color', new BufferAttribute(new Float32Array(colours), 3));
  geometry.computeVertexNormals();
  return geometry;
}
