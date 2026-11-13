/**
 * What the racing side of the world looks like: the four circuits as the
 * racing game draws them, the bridges that join them to the island, and a
 * gateway where each bridge leaves the land.
 *
 * The circuits are the racing game's own meshes, made by its own functions;
 * the bridges are made here in the same materials, since they are the one
 * thing the racing game never had to draw — its circuits stood on a slab.
 */

import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  InstancedMesh,
  Mesh,
  MeshLambertMaterial,
  MeshStandardMaterial,
  Object3D,
  DoubleSide,
  Vector3,
} from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { GATES } from '../world/Landscape.ts';
import { BRIDGES, BRIDGE_HALF, COURSES, type Bridge } from './Routes.ts';
import { createTrack } from '../../apps/letsgo-racing/src/track.js';
import { createSkylineTrack } from '../../apps/letsgo-racing/src/skyline-track.js';
import { createSuzukaTrack } from '../../apps/letsgo-racing/src/suzuka-track.js';
import { createWindingTrack } from '../../apps/letsgo-racing/src/winding-track.js';

/** How far off a circuit is still drawn at all, in metres. */
export const CIRCUIT_RANGE = 700;

export interface RacingScene {
  /** Everything to draw. */
  root: Group;
  /**
   * Draws only the circuits near enough to be seen. Each is hundreds of
   * thousands of triangles and a kilometre across, so the renderer's own
   * culling — which only asks whether a circuit's bounding box is in view —
   * never leaves any of them out; this does.
   */
  update(x: number, z: number, range: number): void;
  /** The bridge decks, which a character on foot can walk across. */
  solid: Group;
  triangleCount: number;
}

// A shade lighter than the racing game's own, which reads as black under the
// island's sun: the kerbs and rails give it away as a road all the same.
const ASPHALT = '#3b3f46';
const SIDE = '#555b65';
const RAIL = '#a5adb8';
const RED = new Color('#dc2828');
const WHITE = new Color('#f4f3ef');

/** A bridge's deck: a road on top, and a slab under it, 0.65m thick. */
function deckGeometry(bridge: Bridge): { top: BufferGeometry; body: BufferGeometry } {
  const topPositions: number[] = [];
  const bodyPositions: number[] = [];
  const THICK = 0.65;
  const push = (target: number[], ...points: Vector3[]) => {
    for (const p of points) target.push(p.x, p.y, p.z);
  };
  for (const { corners } of bridge.segments) {
    const [a, b, c, d] = corners;
    push(topPositions, a, c, b, a, d, c);
    const down = (p: Vector3) => p.clone().add(new Vector3(0, -THICK, 0));
    push(bodyPositions, down(a), down(b), down(c), down(a), down(c), down(d));
    // The two sides.
    push(bodyPositions, a, b, down(b), a, down(b), down(a));
    push(bodyPositions, d, down(c), c, d, down(d), down(c));
  }
  const make = (positions: number[], up = false) => {
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    g.computeVertexNormals();
    if (up) {
      // The top is lit as a road: facing up, whichever way it was wound.
      const n = g.attributes.normal as BufferAttribute;
      for (let i = 0; i < n.count; i += 1) n.setXYZ(i, 0, 1, 0);
    }
    return g;
  };
  return { top: make(topPositions, true), body: make(bodyPositions) };
}

/** Red and white kerbs along both edges of a bridge. */
function kerbGeometry(bridge: Bridge): BufferGeometry {
  const parts: BufferGeometry[] = [];
  const width = 0.9;
  for (let i = 0; i < bridge.samples.length - 1; i += 1) {
    const colour = Math.floor(bridge.samples[i].distance / 3) % 2 ? WHITE : RED;
    const a = bridge.samples[i];
    const b = bridge.samples[i + 1];
    for (const side of [-1, 1]) {
      const p = (s: typeof a, d: number) => s.point.clone().addScaledVector(s.normal, d).add(new Vector3(0, 0.04, 0));
      const inner = side * (BRIDGE_HALF - width);
      const outer = side * BRIDGE_HALF;
      const q = [p(a, inner), p(b, inner), p(b, outer), p(a, outer)];
      const order = side > 0 ? [0, 2, 1, 0, 3, 2] : [0, 1, 2, 0, 2, 3];
      const positions = order.flatMap((k) => q[k].toArray());
      const colours = order.flatMap(() => [colour.r, colour.g, colour.b]);
      const g = new BufferGeometry();
      g.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
      g.setAttribute('color', new BufferAttribute(new Float32Array(colours), 3));
      g.setAttribute('normal', new BufferAttribute(new Float32Array(order.flatMap(() => [0, 1, 0])), 3));
      parts.push(g);
    }
  }
  return mergeGeometries(parts) ?? parts[0];
}

/** Rails and posts, instanced, the way the racing game draws its own. */
function railMeshes(bridge: Bridge): Object3D[] {
  const material = new MeshLambertMaterial({ color: RAIL });
  const beams = new InstancedMesh(new BoxGeometry(0.16, 0.16, 1), material, bridge.rails.length * 2);
  const posts = new InstancedMesh(new BoxGeometry(0.18, 1.18, 0.18), material, Math.ceil(bridge.rails.length / 3));
  const dummy = new Object3D();
  const axis = new Vector3(0, 0, 1);
  let beam = 0;
  let post = 0;
  bridge.rails.forEach(({ a, b }, i) => {
    const delta = b.clone().sub(a);
    for (const height of [0.55, 1.08]) {
      dummy.position.copy(a).add(b).multiplyScalar(0.5);
      dummy.position.y += height;
      dummy.quaternion.setFromUnitVectors(axis, delta.clone().normalize());
      dummy.scale.set(1, 1, delta.length() + 0.04);
      dummy.updateMatrix();
      beams.setMatrixAt(beam++, dummy.matrix);
    }
    if (i % 3 === 0) {
      dummy.position.copy(a);
      dummy.position.y += 0.59;
      dummy.quaternion.identity();
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      posts.setMatrixAt(post++, dummy.matrix);
    }
  });
  beams.count = beam;
  posts.count = post;
  beams.instanceMatrix.needsUpdate = true;
  posts.instanceMatrix.needsUpdate = true;
  beams.frustumCulled = false;
  posts.frustumCulled = false;
  return [beams, posts];
}

/**
 * The gateway where a bridge leaves the island: two stone pillars and a
 * beam across, standing just clear of the kerbs so a kart passes between
 * them with room either side.
 */
function gateway(gate: { x: number; z: number; angle: number }, bridge: Bridge): Group {
  const group = new Group();
  const first = bridge.samples[0];
  const next = bridge.samples[3];
  const heading = Math.atan2(next.point.x - first.point.x, next.point.z - first.point.z);
  group.position.set(gate.x, 0, gate.z);
  group.rotation.y = heading;
  const stone = new MeshStandardMaterial({ color: '#6d7480', roughness: 0.9 });
  const trim = new MeshStandardMaterial({ color: '#c9c3b4', roughness: 0.85 });
  const clear = BRIDGE_HALF + 2.2;
  for (const side of [-1, 1]) {
    const pillar = new Mesh(new BoxGeometry(2.2, 8, 2.2), stone);
    pillar.position.set(side * clear, 4, 0);
    pillar.castShadow = true;
    group.add(pillar);
    const cap = new Mesh(new BoxGeometry(2.8, 0.5, 2.8), trim);
    cap.position.set(side * clear, 8.25, 0);
    group.add(cap);
  }
  const beam = new Mesh(new BoxGeometry(clear * 2 + 2.8, 1.4, 1.8), trim);
  beam.position.set(0, 9.2, 0);
  beam.castShadow = true;
  group.add(beam);
  return group;
}

/** How close a circuit's rails are drawn from, in metres. */
const RAIL_RANGE = 150;

export function buildRacingScene(): RacingScene {
  const root = new Group();
  root.name = 'racing';
  const solid = new Group();
  solid.name = 'racing-bridges';

  // The circuits, as the racing game draws them.
  const circuits: Group[] = [];
  for (const make of [createTrack, createSkylineTrack, createSuzukaTrack, createWindingTrack]) {
    const track: Group = make();
    // Their geometry is huge and mostly far away; the renderer's own
    // culling does the rest.
    track.userData.distanceCulled = true;
    track.traverse((o) => {
      if (o instanceof Mesh) {
        o.castShadow = false;
        // The circuits are driven on by the racing code's own physics and
        // are not part of what a character walks on; they are named so a
        // check of what is solid can say so.
        o.name = o.name.includes('access bridge') ? 'circuit-access' : 'circuit';
      }
    });
    // The short bridge at the foot of each circuit is walkable, so a
    // character crossing from the island can step onto it.
    const stubs: Object3D[] = [];
    track.traverse((o) => {
      if (o.name === 'circuit-access') stubs.push(o);
    });
    for (const stub of stubs) {
      stub.name = 'circuit bridge';
      solid.add(stub);
    }
    root.add(track);
    circuits.push(track);
  }

  const asphalt = new MeshLambertMaterial({ color: ASPHALT, side: DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  const body = new MeshLambertMaterial({ color: SIDE, side: DoubleSide });
  const kerb = new MeshLambertMaterial({ vertexColors: true, side: DoubleSide, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 });
  const gates = [GATES.east, GATES.west, GATES.north, GATES.south];
  BRIDGES.forEach((bridge, i) => {
    const { top, body: slab } = deckGeometry(bridge);
    const deck = new Mesh(top, asphalt);
    deck.name = `${bridge.name} bridge`;
    deck.receiveShadow = true;
    solid.add(deck);
    const under = new Mesh(slab, body);
    under.name = `${bridge.name} bridge underside`;
    solid.add(under);
    const kerbs = new Mesh(kerbGeometry(bridge), kerb);
    kerbs.name = `${bridge.name} kerbs`;
    root.add(kerbs);
    for (const rail of railMeshes(bridge)) root.add(rail);
    // Solid, so a character cannot walk through a pillar.
    solid.add(gateway(gates[i], bridge));
  });
  root.add(solid);

  let triangleCount = 0;
  root.traverse((object) => {
    if (!(object instanceof Mesh) && !(object instanceof InstancedMesh)) return;
    const g = (object as Mesh).geometry;
    const tris = g.index ? g.index.count / 3 : (g.attributes.position?.count ?? 0) / 3;
    triangleCount += tris * (object instanceof InstancedMesh ? object.count : 1);
  });
  let last = -1e9;
  const update = (x: number, z: number, range: number) => {
    // Twice a second is plenty: nothing moves faster than a kart.
    const now = performance.now();
    if (now - last < 400) return;
    last = now;
    circuits.forEach((circuit, i) => {
      const samples = (COURSES[i].samples as Array<{ point: Vector3 }>);
      let nearest = Infinity;
      for (let k = 0; k < samples.length; k += 4) {
        const p = samples[k].point;
        nearest = Math.min(nearest, Math.hypot(p.x - x, p.z - z));
      }
      circuit.visible = nearest < range;
      // The rails are nine tenths of a circuit's triangles — a box per beam,
      // thousands of beams — and are only worth drawing close enough to see
      // them as rails. Further off the road alone says where it goes.
      const railsOn = nearest < RAIL_RANGE;
      for (const child of circuit.children) {
        if (child instanceof InstancedMesh) child.visible = railsOn;
      }
    });
  };
  return { root, solid, update, triangleCount: Math.round(triangleCount) };
}
