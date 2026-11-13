/**
 * The island: the ground the real game stands on.
 *
 * Only nature for now. The land rises out of the sea over a sand beach,
 * through dunes, onto meadow, up to hills, rocky outcrops and the small
 * mountains at the back; there are woods and open meadows, a pond, palms
 * along the shore, rocks in the surf and an islet to swim out to. Nothing is
 * built on it: the roads, the race circuits and their bridges, and the kart
 * are kept in the code (src/racing/ and the dormant part of Landscape.ts)
 * for later, and are not put in the scene.
 *
 * It is made to be looked at the way the old Mario worlds were: saturated
 * flat colour, a grass top with a chunky two-tone check that does not blur
 * when you get close, faceted rock, and a bright sea.
 *
 * It is big. Everything on it is meant to dwarf the character, so the
 * island is about a hundred and sixty metres across against a figure under
 * two metres tall.
 *
 * What is solid: the ground (grass, sand, rock and sea floor), tree trunks,
 * palm trunks, boulders, shore rocks and sea stacks. What is not: leaves,
 * palm fronds, bushes and flowers, which he passes through as in the old
 * worlds, and the water, which he swims in.
 */

import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CircleGeometry,
  Color,
  CylinderGeometry,
  DoubleSide,
  Group,
  IcosahedronGeometry,
  LinearMipmapLinearFilter,
  Box3,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  NearestFilter,
  PlaneGeometry,
  Quaternion,
  RepeatWrapping,
  Scene,
  SRGBColorSpace,
  Vector3,
} from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { CollisionWorld } from '../physics/CollisionWorld.ts';
import type { Carryable } from './Carryable.ts';
import {
  BEACH_TOP,
  ISLAND_RADIUS,
  MEADOWS,
  POND,
  RISES,
  SEA_LIMIT,
  hash,
  inland,
  islandEdge,
  keptOpen,
  overIsland,
  slopeAt,
  terrainHeight,
} from './Landscape.ts';

export { ISLAND_RADIUS, islandEdge, overIsland, terrainHeight };

/** The sea's surface. Everything else is measured from it. */
export const SEA_LEVEL = 0;
/** How deep the open sea floor lies. */
const SEA_FLOOR = -10;
/** How many segments each ring of the land is cut into. */
const SEGMENTS = 192;
/** Metres per repeat of the grass and sand textures: two squares of the check. */
const GRASS_TILE = 6;

export interface IslandWorld {
  root: Group;
  solid: Group;
  /** Nothing to carry yet. */
  carryables: Carryable[];
  /** The sea and the pond, which need a clock to move. */
  water: { update(time: number): void };
  /** Places that are safe to return to after a fall. */
  checkpoints: Vector3[];
  /** Where he starts, and which way he faces. */
  spawn: Vector3;
  spawnFacing: number;
  /** How far out he can swim before the current turns him back. */
  seaLimit: number;
  triangleCount: number;
}

/**
 * A grass texture with a two-tone check and a scatter of darker specks.
 * Small and unfiltered when magnified, so the squares stay square.
 */
function grassTexture(): CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (context) {
    const half = size / 2;
    for (let y = 0; y < 2; y += 1) {
      for (let x = 0; x < 2; x += 1) {
        context.fillStyle = (x + y) % 2 === 0 ? '#66c643' : '#72d04b';
        context.fillRect(x * half, y * half, half, half);
      }
    }
    // A few tufts, small and close in colour to the square they are on, so
    // the ground has a grain without looking like it is covered in litter.
    for (let i = 0; i < 26; i += 1) {
      const x = Math.floor(hash(i, 1) * (size - 4));
      const y = Math.floor(hash(i, 2) * (size - 4));
      const onDark = (Math.floor(x / half) + Math.floor(y / half)) % 2 === 0;
      context.fillStyle = onDark ? '#5db93c' : '#69c744';
      context.fillRect(x, y, 3, 2);
    }
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.magFilter = NearestFilter;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.anisotropy = 4;
  return texture;
}

/** The same check in sand, a little paler and warmer. */
function sandTexture(): CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (context) {
    const half = size / 2;
    for (let y = 0; y < 2; y += 1) {
      for (let x = 0; x < 2; x += 1) {
        context.fillStyle = (x + y) % 2 === 0 ? '#f2dc9b' : '#f7e4a8';
        context.fillRect(x * half, y * half, half, half);
      }
    }
    for (let i = 0; i < 30; i += 1) {
      const x = Math.floor(hash(i, 11) * (size - 3));
      const y = Math.floor(hash(i, 12) * (size - 3));
      context.fillStyle = hash(i, 13) > 0.5 ? '#e6cd8a' : '#fff0c2';
      context.fillRect(x, y, 2, 2);
    }
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.magFilter = NearestFilter;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.anisotropy = 4;
  return texture;
}

/**
 * The rings the land is drawn with, as fractions of the coastline's distance
 * at each bearing: close together (two metres or so) over the island, the
 * shore and the shallows where there is something to see, and wider apart
 * further out where the sea floor is flat and deep.
 */
function landRings(): number[] {
  const rings: number[] = [];
  for (let i = 1; i <= 58; i += 1) rings.push((i / 58) * 1.62);
  for (let rho = 1.74; rho <= 2.35; rho += 0.12) rings.push(rho);
  return rings;
}

export function buildIsland(scene: Scene, collision: CollisionWorld): IslandWorld {
  const root = new Group();
  root.name = 'island';
  scene.add(root);

  const solid = new Group();
  solid.name = 'island-solid';
  root.add(solid);

  // ---- The land ---------------------------------------------------------------
  // One heightfield, from the middle of the island out to the deep sea floor,
  // laid on rings round the coastline so the shore is followed closely
  // wherever it bends. Then each triangle goes to the sand, the grass or the
  // bare rock by how high and how steep it is. The splits are hard edges,
  // which is how the old worlds did it.
  const rings = landRings();
  const positions: number[] = [0, terrainHeight(0, 0), 0];
  const uvs: number[] = [0, 0];
  for (const rho of rings) {
    for (let i = 0; i < SEGMENTS; i += 1) {
      const angle = (i / SEGMENTS) * Math.PI * 2;
      const d = islandEdge(angle) * rho;
      const x = Math.cos(angle) * d;
      const z = Math.sin(angle) * d;
      positions.push(x, terrainHeight(x, z), z);
      uvs.push(x / GRASS_TILE, z / GRASS_TILE);
    }
  }
  const indices: number[] = [];
  for (let i = 0; i < SEGMENTS; i += 1) indices.push(0, 1 + ((i + 1) % SEGMENTS), 1 + i);
  for (let r = 0; r < rings.length - 1; r += 1) {
    const a = 1 + r * SEGMENTS;
    const b = a + SEGMENTS;
    for (let i = 0; i < SEGMENTS; i += 1) {
      const n = (i + 1) % SEGMENTS;
      indices.push(a + i, a + n, b + i, a + n, b + n, b + i);
    }
  }
  const land = new BufferGeometry();
  land.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
  land.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
  land.setIndex(indices);
  land.computeVertexNormals();

  // Colour per vertex, multiplied into the texture: grass a touch brighter
  // higher up, as if nearer the sun; sand darkening and cooling as it goes
  // under the water.
  {
    const p = land.attributes.position as BufferAttribute;
    const colours = new Float32Array(p.count * 3);
    const deep = new Color('#7fa7a0');
    for (let i = 0; i < p.count; i += 1) {
      const y = p.getY(i);
      const c = new Color('#ffffff');
      if (y < 0) c.lerp(deep, Math.min(1, -y / 8));
      else c.multiplyScalar(0.9 + Math.min(0.14, y / 90));
      colours.set([c.r, c.g, c.b], i * 3);
    }
    land.setAttribute('color', new BufferAttribute(colours, 3));
  }

  // Each triangle goes to the rock, the sand or the grass. Where one meets
  // another the triangle is cut along the line between them, so the edge of
  // a beach or the foot of a cliff is a clean line across the ground rather
  // than the saw-tooth that whole triangles make. The pieces are the same
  // surface, so what is drawn and what is solid stay one thing.
  type Vertex = { p: number[]; n: number[]; uv: number[]; c: number[] };
  type Tri = [Vertex, Vertex, Vertex];
  const vertexOf = (i: number): Vertex => {
    const pos = land.attributes.position as BufferAttribute;
    const nor = land.attributes.normal as BufferAttribute;
    const uv = land.attributes.uv as BufferAttribute;
    const col = land.attributes.color as BufferAttribute;
    return {
      p: [pos.getX(i), pos.getY(i), pos.getZ(i)],
      n: [nor.getX(i), nor.getY(i), nor.getZ(i)],
      uv: [uv.getX(i), uv.getY(i)],
      c: [col.getX(i), col.getY(i), col.getZ(i)],
    };
  };
  const mix = (a: Vertex, b: Vertex, t: number): Vertex => {
    const l = (x: number[], y: number[]) => x.map((v, k) => v + (y[k] - v) * t);
    return { p: l(a.p, b.p), n: l(a.n, b.n), uv: l(a.uv, b.uv), c: l(a.c, b.c) };
  };
  /** Cuts a triangle where `value` crosses zero: [below zero, at or above]. */
  const cut = (tri: Tri, value: (v: Vertex) => number): [Tri[], Tri[]] => {
    const s = tri.map(value);
    const neg = s.map((v) => v < 0);
    const count = neg.filter(Boolean).length;
    if (count === 3) return [[tri], []];
    if (count === 0) return [[], [tri]];
    // The vertex alone on its side, first, keeping the winding.
    const lone = neg.findIndex((v) => (count === 1 ? v : !v));
    const a = tri[lone];
    const b = tri[(lone + 1) % 3];
    const c = tri[(lone + 2) % 3];
    const sa = s[lone];
    const sb = s[(lone + 1) % 3];
    const sc = s[(lone + 2) % 3];
    const ab = mix(a, b, sa / (sa - sb));
    const ac = mix(a, c, sa / (sa - sc));
    const alone: Tri[] = [[a, ab, ac]];
    const rest: Tri[] = [
      [ab, b, c],
      [ab, c, ac],
    ];
    return count === 1 ? [alone, rest] : [rest, alone];
  };
  // Rock where the ground is too steep for anything to grow, and on the
  // highest tops; judged on the smooth slope at each corner.
  const softness = (v: Vertex) => Math.min(Math.abs(v.n[1]) - 0.8, (21 - v.p[1]) / 20);
  // Sand below a beach line that wanders a little, and round the pond.
  const sandiness = (v: Vertex) => {
    const [x, y, z] = v.p;
    const top = BEACH_TOP + 0.3 * Math.sin(x * 0.21 + z * 0.13) + 0.2 * Math.sin(z * 0.27 - x * 0.08);
    const pond = Math.max(
      y - (POND.surface + 0.35),
      Math.hypot(x - POND.x, z - POND.z) - (POND.r + 2.5),
    );
    return -Math.min(y - top, pond);
  };
  const grassTris: Tri[] = [];
  const sandTris: Tri[] = [];
  const rockTris: Tri[] = [];
  for (let t = 0; t < indices.length; t += 3) {
    const tri: Tri = [vertexOf(indices[t]), vertexOf(indices[t + 1]), vertexOf(indices[t + 2])];
    const [rock, soft] = cut(tri, softness);
    rockTris.push(...rock);
    for (const piece of soft) {
      const [grass, sand] = cut(piece, sandiness);
      grassTris.push(...grass);
      sandTris.push(...sand);
    }
  }
  const geometryOf = (tris: Tri[], colourOf?: (tri: Tri, index: number) => Color) => {
    const positions: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const colours: number[] = [];
    tris.forEach((tri, index) => {
      const face = colourOf?.(tri, index);
      for (const v of tri) {
        positions.push(...v.p);
        normals.push(...v.n);
        uvs.push(...v.uv);
        colours.push(...(face ? [face.r, face.g, face.b] : v.c));
      }
    });
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3));
    geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
    geometry.setAttribute('color', new BufferAttribute(new Float32Array(colours), 3));
    return geometry;
  };
  const surface = (name: string, geometry: BufferGeometry, material: MeshStandardMaterial) => {
    const mesh = new Mesh(geometry, material);
    mesh.name = name;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    solid.add(mesh);
  };
  surface(
    'island-grass',
    geometryOf(grassTris),
    new MeshStandardMaterial({ map: grassTexture(), vertexColors: true, roughness: 1 }),
  );
  surface(
    'island-sand',
    geometryOf(sandTris),
    new MeshStandardMaterial({ map: sandTexture(), vertexColors: true, roughness: 1 }),
  );
  // The bare rock, flat shaded face by face, banded by height, and white
  // on the highest tops.
  {
    const ROCK = ['#92857a', '#7d7168', '#9d9082', '#6f655c'].map((c) => new Color(c));
    const SNOW = new Color('#f1f5fa');
    const geometry = geometryOf(rockTris, (tri, face) => {
      const y = (tri[0].p[1] + tri[1].p[1] + tri[2].p[1]) / 3;
      const colour =
        y > 23.5
          ? SNOW.clone()
          : ROCK[Math.floor(Math.abs(y) / 2.2 + hash(face % 7, 2)) % ROCK.length].clone();
      colour.multiplyScalar(0.9 + hash(face, 5) * 0.2);
      if (y < 0) colour.multiplyScalar(0.8);
      return colour;
    });
    geometry.deleteAttribute('uv');
    surface(
      'island-bare-rock',
      geometry,
      new MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true }),
    );
  }

  // Past the last ring the sea floor carries on, flat, under the open sea.
  // Only looked at, through the water: the current turns him back long
  // before he could reach it.
  {
    // The same sand, tinted the way the deepest of the land is, so there is
    // no seam where the one gives way to the other.
    const texture = sandTexture();
    texture.repeat.set(9000 / GRASS_TILE, 9000 / GRASS_TILE);
    const floor = new Mesh(
      new PlaneGeometry(9000, 9000).rotateX(-Math.PI / 2),
      new MeshStandardMaterial({ map: texture, color: '#7fa7a0', roughness: 1 }),
    );
    floor.name = 'sea-floor';
    floor.position.y = SEA_FLOOR - 0.3;
    root.add(floor);
  }

  // ---- Where he starts ------------------------------------------------------
  // In the meadow just up from the south beach, looking inland toward the
  // mountains, with the sea behind him.
  const spawn = new Vector3(
    MEADOWS.start.x,
    terrainHeight(MEADOWS.start.x, MEADOWS.start.z) + 0.05,
    MEADOWS.start.z,
  );

  // ---- Trees, palms, bushes, rocks, flowers -----------------------------------
  // Scattered by rule rather than placed by hand, so reshaping the land
  // reshapes where they stand: on ground that suits each, never on the open
  // meadows or in the pond, and in drifts rather than evenly.
  {
    const tint = (geometry: BufferGeometry, colour: Color, jitter = 0.1, seed = 0) => {
      const g = geometry.index ? geometry.toNonIndexed() : geometry;
      g.deleteAttribute('uv');
      const n = g.attributes.position.count;
      const colours = new Float32Array(n * 3);
      for (let f = 0; f < n / 3; f += 1) {
        const shade = 1 + (hash(f, seed) - 0.5) * jitter * 2;
        for (let v = 0; v < 3; v += 1) {
          colours.set([colour.r * shade, colour.g * shade, colour.b * shade], (f * 3 + v) * 3);
        }
      }
      g.setAttribute('color', new BufferAttribute(colours, 3));
      return g;
    };
    const move = (
      g: BufferGeometry,
      x: number,
      y: number,
      z: number,
      sx = 1,
      sy = sx,
      sz = sx,
      spin = 0,
      tilt?: Quaternion,
    ) => {
      const q = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), spin);
      if (tilt) q.premultiply(tilt);
      return g.applyMatrix4(new Matrix4().compose(new Vector3(x, y, z), q, new Vector3(sx, sy, sz)));
    };
    /** Downhill at a point, as a unit vector on the ground. */
    const downhill = (x: number, z: number) => {
      const dx = terrainHeight(x + 1, z) - terrainHeight(x - 1, z);
      const dz = terrainHeight(x, z + 1) - terrainHeight(x, z - 1);
      const l = Math.hypot(dx, dz) || 1;
      return { x: -dx / l, z: -dz / l };
    };

    const trunks: BufferGeometry[] = [];
    const foliage: BufferGeometry[] = [];
    const boulders: BufferGeometry[] = [];
    const flowers: BufferGeometry[] = [];
    const LEAVES = ['#3fae3a', '#4cbc43', '#35a047', '#58c24a'].map((c) => new Color(c));
    const PINES = ['#2a8a4c', '#34a05a', '#277a47'].map((c) => new Color(c));
    const FRONDS = ['#3db54a', '#4cc455', '#36a443'].map((c) => new Color(c));
    const BUSHES = ['#3a9e3c', '#46ad44', '#5bbd4c'].map((c) => new Color(c));
    const BARK = new Color('#7b5532');
    const PALM_BARK = new Color('#a27a4c');
    const STONE = ['#9b9a98', '#8a8987', '#a8a6a2'].map((c) => new Color(c));

    // Where the woods are: a slow wave over the island, so there are stands
    // of trees with meadow between them rather than an even sprinkle.
    const wood = (x: number, z: number) =>
      Math.sin(x * 0.045 + 1.2) * Math.sin(z * 0.05 - 0.4) + 0.35 * Math.sin((x + z) * 0.11);
    const onGrass = (y: number) => y > BEACH_TOP + 0.45;

    // Broadleaf trees and pines.
    let n = 0;
    for (let gx = -ISLAND_RADIUS * 1.3; gx <= ISLAND_RADIUS * 1.3; gx += 4.6) {
      for (let gz = -ISLAND_RADIUS * 1.3; gz <= ISLAND_RADIUS * 1.3; gz += 4.6) {
        const x = gx + (hash(gx, gz) - 0.5) * 3.6;
        const z = gz + (hash(gz, gx) - 0.5) * 3.6;
        const y = terrainHeight(x, z);
        if (!onGrass(y) || y > 17 || keptOpen(x, z, 6)) continue;
        if (wood(x, z) < 0.12 || hash(x, z) < 0.35) continue;
        if (slopeAt(x, z) > 0.55) continue;
        const pine = y > 6 || hash(z, x) > 0.72;
        const size = 0.85 + hash(n, 3) * 0.55;
        const spin = hash(n, 8) * 6.28;
        trunks.push(
          tint(move(new CylinderGeometry(0.42, 0.55, 3, 7), x, y + 1.3 * size, z, size), BARK, 0.06, n),
        );
        if (pine) {
          const c = PINES[n % PINES.length];
          for (let k = 0; k < 3; k += 1) {
            const r = (3.2 - k * 0.8) * size;
            foliage.push(
              tint(
                move(new CylinderGeometry(0, r, 3.4 * size, 7), x, y + (3.6 + k * 1.9) * size, z, 1, 1, 1, spin),
                c,
                0.07,
                n + k,
              ),
            );
          }
        } else {
          const c = LEAVES[n % LEAVES.length];
          foliage.push(
            tint(move(new IcosahedronGeometry(2.9, 1), x, y + 5.0 * size, z, size, size * 0.9, size, spin), c, 0.08, n),
          );
          foliage.push(
            tint(move(new IcosahedronGeometry(2.0, 1), x + 1.4 * size, y + 3.6 * size, z + 0.6 * size, size), c, 0.08, n + 1),
          );
        }
        n += 1;
      }
    }

    // Palms along the back of the beaches and on the islet, leaning out
    // toward the water the way palms do.
    let palms = 0;
    for (let gx = -150; gx <= 150; gx += 5.2) {
      for (let gz = -150; gz <= 150; gz += 5.2) {
        const x = gx + (hash(gx, gz + 9) - 0.5) * 4;
        const z = gz + (hash(gz + 9, gx) - 0.5) * 4;
        const y = terrainHeight(x, z);
        // By the shore: the back of a beach, or anywhere on a scrap of land
        // out in the sea.
        const offshore = inland(x, z) < 0;
        if (y < 0.55 || y > (offshore ? 5 : BEACH_TOP + 1.1) || keptOpen(x, z, 3)) continue;
        if (!offshore && inland(x, z) > 24) continue;
        if (slopeAt(x, z) > (offshore ? 0.6 : 0.32) || hash(x + 3, z) < (offshore ? 0.4 : 0.74)) continue;
        const lean = downhill(x, z);
        const size = 0.9 + hash(palms, 21) * 0.35;
        const segments = 6;
        let px = x;
        let py = y - 0.2;
        let pz = z;
        for (let k = 0; k < segments; k += 1) {
          // Each piece leans a little more than the one below: a gentle curve.
          const bend = 0.05 + k * 0.045;
          const length = 1.15 * size;
          const dir = new Vector3(lean.x * bend, 1, lean.z * bend).normalize();
          const tilt = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), dir);
          const r = (0.36 - k * 0.03) * size;
          const piece = new CylinderGeometry(r * 0.9, r, length, 6);
          trunks.push(
            tint(
              move(piece, px + dir.x * length * 0.5, py + dir.y * length * 0.5, pz + dir.z * length * 0.5, 1, 1, 1, 0, tilt),
              PALM_BARK.clone().multiplyScalar(k % 2 ? 0.92 : 1.05),
              0.05,
              palms + k,
            ),
          );
          px += dir.x * length;
          py += dir.y * length;
          pz += dir.z * length;
        }
        // The fronds: long flattened leaves drooping from the crown.
        const c = FRONDS[palms % FRONDS.length];
        for (let k = 0; k < 7; k += 1) {
          const yaw = (k / 7) * Math.PI * 2 + hash(palms, k) * 0.4;
          const leaf = new CylinderGeometry(0.02, 0.55, 3.4 * size, 4);
          leaf.translate(0, 1.7 * size, 0);
          leaf.scale(1, 1, 0.22);
          const droop = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), 1.25 + hash(k, palms) * 0.35);
          const turn = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), yaw);
          leaf.applyQuaternion(droop).applyQuaternion(turn).translate(px, py, pz);
          foliage.push(tint(leaf, c, 0.08, palms * 7 + k));
        }
        foliage.push(tint(move(new IcosahedronGeometry(0.45 * size, 0), px, py - 0.1, pz), new Color('#6b8f2e'), 0.05, palms));
        palms += 1;
      }
    }

    // Bushes, round the edges of the woods and along the back of the beach.
    // Waist high and soft: he pushes through them.
    let bushes = 0;
    for (let gx = -ISLAND_RADIUS * 1.2; gx <= ISLAND_RADIUS * 1.2; gx += 3.7) {
      for (let gz = -ISLAND_RADIUS * 1.2; gz <= ISLAND_RADIUS * 1.2; gz += 3.7) {
        const x = gx + (hash(gx + 5, gz) - 0.5) * 3;
        const z = gz + (hash(gz, gx + 5) - 0.5) * 3;
        const y = terrainHeight(x, z);
        if (!onGrass(y) || y > 15 || keptOpen(x, z, 2) || slopeAt(x, z) > 0.6) continue;
        const w = wood(x, z);
        const edgeOfWood = w > -0.05 && w < 0.25;
        const backOfBeach = inland(x, z) < 26;
        if (!(edgeOfWood || backOfBeach) || hash(x, z + 7) < 0.78) continue;
        const c = BUSHES[bushes % BUSHES.length];
        const size = 0.7 + hash(bushes, 2) * 0.6;
        foliage.push(tint(move(new IcosahedronGeometry(1, 0), x, y + 0.45 * size, z, size * 1.2, size * 0.8, size * 1.1, hash(bushes, 4) * 6), c, 0.1, bushes));
        foliage.push(tint(move(new IcosahedronGeometry(0.7, 0), x + 0.7 * size, y + 0.35 * size, z + 0.3 * size, size), c, 0.1, bushes + 1));
        bushes += 1;
      }
    }

    // Boulders, rocks in the surf and sea stacks.
    const boulder = (x: number, z: number, r: number, seed: number, sink = 0.35) => {
      const y = terrainHeight(x, z);
      boulders.push(
        tint(
          move(new IcosahedronGeometry(r, 0), x, y + r * sink, z, 1, 0.75 + hash(seed, 1) * 0.3, 1, hash(seed, 2) * 6.28),
          STONE[seed % STONE.length],
          0.1,
          seed,
        ),
      );
    };
    const clearFor = (x: number, z: number, size: number) =>
      !keptOpen(x, z, size + 1.5) && Math.hypot(x - spawn.x, z - spawn.z) > 10;
    RISES.filter((r) => r.rough > 1.5).forEach((r, k) => {
      for (let m = 0; m < 7; m += 1) {
        const a = hash(k, m) * 6.28;
        const d = r.r * (0.35 + hash(m, k) * 0.45);
        const x = r.x + Math.cos(a) * d;
        const z = r.z + Math.sin(a) * d;
        const size = 1.2 + hash(m, k + 4) * 2.2;
        if (clearFor(x, z, size)) boulder(x, z, size, k * 10 + m);
      }
    });
    for (let m = 0; m < 46; m += 1) {
      const a = hash(m, 77) * 6.28;
      const d = Math.sqrt(hash(m, 78)) * ISLAND_RADIUS * 0.85;
      const x = Math.cos(a) * d;
      const z = Math.sin(a) * d;
      const size = 0.9 + hash(m, 79) * 1.4;
      if (onGrass(terrainHeight(x, z)) && clearFor(x, z, size) && slopeAt(x, z) < 0.6) boulder(x, z, size, 100 + m);
    }
    // In the surf: half in the water where the shore is steepest, so the
    // rocky stretches read as rocky and the sandy ones stay clear.
    for (let m = 0; m < 260; m += 1) {
      const angle = hash(m, 91) * Math.PI * 2;
      const d = islandEdge(angle) * (0.94 + hash(m, 92) * 0.14);
      const x = Math.cos(angle) * d;
      const z = Math.sin(angle) * d;
      const y = terrainHeight(x, z);
      if (y < -1.4 || y > 0.8) continue;
      if (slopeAt(x, z) < 0.22 && hash(m, 93) > 0.12) continue;
      const size = 0.8 + hash(m, 94) * 1.5;
      if (clearFor(x, z, size)) boulder(x, z, size, 200 + m, 0.2);
    }
    // Sea stacks: tall pillars of rock standing in the water off the cliffs
    // at the back of the island.
    for (let m = 0; m < 6; m += 1) {
      const angle = -Math.PI / 2 + (m - 2.5) * 0.32 + (hash(m, 51) - 0.5) * 0.15;
      let x = 0;
      let z = 0;
      // Out to where the water is a few metres deep.
      for (let r = islandEdge(angle); r < 170; r += 1) {
        x = Math.cos(angle) * r;
        z = Math.sin(angle) * r;
        if (terrainHeight(x, z) < -3.5 - hash(m, 52) * 2) break;
      }
      const base = terrainHeight(x, z);
      const height = -base + 4 + hash(m, 53) * 6;
      const width = 2.2 + hash(m, 54) * 1.4;
      const pieces = 3;
      for (let k = 0; k < pieces; k += 1) {
        const w = width * (1 - k * 0.2);
        const h = height / pieces;
        const g = new IcosahedronGeometry(1, 0);
        boulders.push(
          tint(
            move(g, x + (hash(m, k) - 0.5) * 0.6, base + h * (k + 0.5), z + (hash(k, m) - 0.5) * 0.6, w, h * 0.75, w * 0.9, hash(m, k + 9) * 6),
            STONE[(m + k) % STONE.length].clone().multiplyScalar(0.92),
            0.12,
            300 + m * 5 + k,
          ),
        );
      }
    }

    // Flowers, in handfuls across the grass.
    const BLOOM = ['#ffffff', '#ffe14d', '#ff7aa8'].map((c) => new Color(c));
    for (let m = 0; m < 460; m += 1) {
      const a = hash(m, 31) * 6.28;
      const d = Math.sqrt(hash(m, 32)) * ISLAND_RADIUS * 0.95;
      const x = Math.cos(a) * d;
      const z = Math.sin(a) * d;
      if (!onGrass(terrainHeight(x, z)) || slopeAt(x, z) > 0.45) continue;
      if (Math.hypot(x - POND.x, z - POND.z) < POND.r + 3) continue;
      for (let k = 0; k < 3; k += 1) {
        const fx = x + (hash(m, k) - 0.5) * 2.4;
        const fz = z + (hash(k, m) - 0.5) * 2.4;
        flowers.push(
          tint(move(new IcosahedronGeometry(0.11, 0), fx, terrainHeight(fx, fz) + 0.1, fz), BLOOM[(m + k) % 3], 0.05, m),
        );
      }
    }

    const material = new MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true });
    const add = (name: string, parts: BufferGeometry[], target: Group, shadows: boolean) => {
      if (parts.length === 0) return;
      const merged = mergeGeometries(parts);
      for (const part of parts) part.dispose();
      if (!merged) return;
      const mesh = new Mesh(merged, material);
      mesh.name = name;
      mesh.castShadow = shadows;
      mesh.receiveShadow = true;
      target.add(mesh);
    };
    // Trunks and rocks stop him; leaves, fronds, bushes and flowers do not.
    add('tree-trunks', trunks, solid, true);
    add('boulders', boulders, solid, true);
    add('foliage', foliage, root, true);
    add('flowers', flowers, root, false);
    // Each flower is a few centimetres across; the box round all of them is not.
    const flowerMesh = root.children.find((c) => c.name === 'flowers');
    if (flowerMesh) flowerMesh.userData.thickest = 0.22;
  }

  // ---- The water ------------------------------------------------------------
  // The pond first: its bottom dips a little below sea level, and the water
  // asked for there is the pond's, not the sea's.
  const pond = buildPond();
  root.add(pond.mesh);
  collision.addWater(
    new Box3(
      new Vector3(POND.x - POND.r - 2, POND.surface - 4, POND.z - POND.r - 2),
      new Vector3(POND.x + POND.r + 2, POND.surface, POND.z + POND.r + 2),
    ),
    POND.surface,
    (x, z) => Math.hypot(x - POND.x, z - POND.z) < POND.r + 1.2,
  );
  const sea = buildSea();
  root.add(sea.mesh);
  collision.addWater(
    new Box3(
      new Vector3(-SEA_LIMIT - 30, SEA_FLOOR - 4, -SEA_LIMIT - 30),
      new Vector3(SEA_LIMIT + 30, SEA_LEVEL, SEA_LIMIT + 30),
    ),
    SEA_LEVEL,
  );
  const water = {
    update(time: number) {
      sea.update(time);
      pond.update(time);
    },
  };

  collision.addSolid(solid);

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
    carryables: [],
    water,
    checkpoints: [spawn.clone()],
    spawn,
    spawnFacing: Math.PI,
    seaLimit: SEA_LIMIT,
    triangleCount: Math.round(triangleCount),
  };
}

/** The pond's surface: still, clearer and greener than the sea. */
function buildPond(): { mesh: Mesh; update(time: number): void } {
  const material = new MeshStandardMaterial({
    color: '#4fb8c9',
    roughness: 0.3,
    transparent: true,
    opacity: 0.78,
    side: DoubleSide,
    depthWrite: false,
  });
  const mesh = new Mesh(new CircleGeometry(POND.r + 1.6, 48).rotateX(-Math.PI / 2), material);
  mesh.name = 'pond';
  mesh.position.set(POND.x, POND.surface, POND.z);
  return {
    mesh,
    update(time: number) {
      material.opacity = 0.76 + Math.sin(time * 0.8) * 0.02;
    },
  };
}

/**
 * The sea: one big flat plane of bright blue with lighter wave lines that
 * drift slowly across it, a little see-through so the sand shows under the
 * shallows and the shore fades into the deep. A texture rather than a shader, because at this
 * distance a texture is all it can be, and a shader on a plane this large
 * shimmers into rings.
 */
function buildSea(): { mesh: Mesh; update(time: number): void } {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = '#2f9be3';
    context.fillRect(0, 0, size, size);
    context.strokeStyle = '#6cc4f5';
    context.lineWidth = 3;
    context.lineCap = 'round';
    for (let i = 0; i < 9; i += 1) {
      const x = hash(i, 5) * size;
      const y = hash(i, 6) * size;
      context.beginPath();
      context.moveTo(x - 10, y);
      context.quadraticCurveTo(x, y - 5, x + 10, y);
      context.quadraticCurveTo(x + 20, y + 5, x + 30, y);
      context.stroke();
    }
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(225, 225);
  texture.anisotropy = 4;
  const mesh = new Mesh(
    new PlaneGeometry(9000, 9000).rotateX(-Math.PI / 2),
    new MeshStandardMaterial({
      map: texture,
      roughness: 0.55,
      metalness: 0,
      transparent: true,
      opacity: 0.74,
      side: DoubleSide,
      depthWrite: false,
    }),
  );
  mesh.name = 'sea';
  mesh.position.y = SEA_LEVEL;
  mesh.receiveShadow = false;
  return {
    mesh,
    update(time: number) {
      texture.offset.set(time * 0.004, time * 0.0025);
    },
  };
}
