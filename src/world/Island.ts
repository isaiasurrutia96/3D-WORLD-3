/**
 * The island: the ground the real game stands on.
 *
 * This is only the foundation — the land itself, the sea round it and the
 * place you start. Nothing is built on it yet. Everything that goes on it
 * later (the golf course, the tower, the pond, the plots for mini games)
 * stands on this floor, and only needs to know where the floor is.
 *
 * It is made to be looked at the way the old Mario worlds were: saturated
 * flat colour, a grass top with a chunky two-tone check that does not blur
 * when you get close, faceted rock, and a blue sky with the sea far below.
 * No texture is smoother than the geometry under it.
 *
 * It is big. Everything on it is meant to dwarf the character, so the
 * island is a hundred and sixty metres across against a figure under two
 * metres tall, and the radius below is the one number that sets that.
 */

import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  Group,
  IcosahedronGeometry,
  LinearMipmapLinearFilter,
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
  ISLAND_RADIUS,
  PLOTS,
  RISES,
  ROAD_HALF,
  ROAD_PATHS,
  hash,
  islandEdge,
  overIsland,
  roadDistance,
  terrainHeight,
} from './Landscape.ts';

export { ISLAND_RADIUS, islandEdge, overIsland, terrainHeight };

/** How far below the grass the sea lies. */
export const SEA_LEVEL = -64;
/** How many segments the outline is cut into. */
const SEGMENTS = 192;
/** Metres per repeat of the grass texture: two squares of the check. */
const GRASS_TILE = 6;

export interface IslandWorld {
  root: Group;
  solid: Group;
  /** Nothing to carry yet. */
  carryables: Carryable[];
  /** The sea, which needs a clock to move. */
  water: { update(time: number): void };
  /** Flat markers that are safe to return to after a fall. */
  checkpoints: Vector3[];
  /** Where he starts, and which way he faces. */
  spawn: Vector3;
  spawnFacing: number;
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

/** One ring of the island's shell, as a fraction of the edge and a height. */
interface Ring {
  rho: number;
  y: number;
  /** On the land: its height is the ground's, not a fixed one. */
  land?: boolean;
}

/**
 * The top, from the middle out. The rings are close enough together — two
 * and a half metres or so — to follow a hill, and the last three roll the
 * grass over the edge.
 */
const LAND_RINGS = 36;
const TOP_RINGS: Ring[] = [
  { rho: 0, y: 0, land: true },
  ...Array.from({ length: LAND_RINGS }, (_, i) => ({
    rho: ((i + 1) / LAND_RINGS) * 0.96,
    y: 0,
    land: true,
  })),
  { rho: 0.985, y: -0.18 },
  { rho: 1.0, y: -0.8 },
  { rho: 1.005, y: -1.7 },
];

/** The underside: the cliff, then a taper to a ragged point far below. */
const ROCK_RINGS: Ring[] = [
  { rho: 1.005, y: -1.7 },
  { rho: 1.0, y: -4 },
  { rho: 0.995, y: -12 },
  { rho: 0.97, y: -21 },
  { rho: 0.86, y: -29 },
  { rho: 0.66, y: -37 },
  { rho: 0.4, y: -44 },
  { rho: 0.22, y: -51 },
  { rho: 0.08, y: -56 },
  { rho: 0, y: -58 },
];

export function buildIsland(scene: Scene, collision: CollisionWorld): IslandWorld {
  const root = new Group();
  root.name = 'island';
  scene.add(root);

  const solid = new Group();
  solid.name = 'island-solid';
  root.add(solid);

  /** The position of a ring's vertex at a bearing. */
  const place = (ring: Ring, i: number, rowSeed: number, rough: number): Vector3 => {
    const angle = (i / SEGMENTS) * Math.PI * 2;
    // Ragged where it is rock: pushed in and out and up and down a little,
    // by amounts that repeat round the seam so the ends meet.
    const j = i % SEGMENTS;
    // Only ever inward. The rock is never wider than the grass above it, so
    // there is no ledge sticking out of the cliff to land on and be left
    // standing on, below the island, as the place to be put back to.
    const shake = rough * Math.abs(hash(j, rowSeed) - 0.5);
    const rho = ring.rho === 0 ? 0 : ring.rho * (1 - shake * 0.22);
    const edge = islandEdge(angle) * rho;
    const x = Math.cos(angle) * edge;
    const z = Math.sin(angle) * edge;
    if (ring.land) return new Vector3(x, terrainHeight(x, z), z);
    return new Vector3(x, ring.y + rough * (hash(j, rowSeed + 40) - 0.5) * 2.4, z);
  };

  /** A shell between rings: positions, indices and a colour per vertex. */
  const shell = (
    rings: Ring[],
    rough: number,
    colourOf: (row: number, i: number, p: Vector3) => Color,
    uvOf?: (p: Vector3) => [number, number],
  ): BufferGeometry => {
    const positions: number[] = [];
    const colours: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const rows: number[] = [];

    rings.forEach((ring, row) => {
      if (ring.rho === 0) {
        const p = new Vector3(0, ring.land ? terrainHeight(0, 0) : ring.y, 0);
        positions.push(p.x, p.y, p.z);
        const c = colourOf(row, 0, p);
        colours.push(c.r, c.g, c.b);
        if (uvOf) uvs.push(...uvOf(p));
        rows.push(1);
        return;
      }
      // The first and last ring of a shell are shared with their neighbours
      // and are left smooth, so the grass meets the rock without a seam.
      const edgeRing = row === 0 || row === rings.length - 1;
      // And the rock is smooth where it leaves the grass and ragged only
      // further down, where nobody can reach it.
      const roughHere = rough * Math.min(1, row / 4);
      for (let i = 0; i < SEGMENTS; i += 1) {
        const p = place(ring, i, row + Math.round(rings[0].y * 3), edgeRing ? 0 : roughHere);
        positions.push(p.x, p.y, p.z);
        const c = colourOf(row, i, p);
        colours.push(c.r, c.g, c.b);
        if (uvOf) uvs.push(...uvOf(p));
      }
      rows.push(SEGMENTS);
    });

    // Stitch ring to ring. A single vertex (the middle, or the bottom
    // point) fans out to the ring beside it.
    let start = 0;
    for (let row = 0; row < rings.length - 1; row += 1) {
      const a = start;
      const b = start + rows[row];
      for (let i = 0; i < SEGMENTS; i += 1) {
        const n = (i + 1) % SEGMENTS;
        if (rows[row] === 1) {
          indices.push(a, b + n, b + i);
        } else if (rows[row + 1] === 1) {
          indices.push(a + i, a + n, b);
        } else {
          indices.push(a + i, a + n, b + i, a + n, b + n, b + i);
        }
      }
      start = b;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('color', new BufferAttribute(new Float32Array(colours), 3));
    if (uvOf) geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  };

  // ---- The land ---------------------------------------------------------------
  // One shell for the whole top, then each triangle goes to the grass or to
  // the bare rock according to how steep it is: grass where he would walk,
  // rock where it is too steep for anything to grow and the colour says so.
  // The split is a hard edge, which is how the old worlds did it.
  const GRASS = new Color('#ffffff');
  const LIP = new Color('#d9f2b0');
  const FRINGE = new Color('#8fb85a');
  const landRows = TOP_RINGS.length - 3;
  const top = shell(
    TOP_RINGS,
    0,
    (row, _i, p) => {
      if (row > landRows + 1) return FRINGE;
      if (row > landRows) return LIP;
      // Higher ground is a touch brighter, as if nearer the sun.
      const lift = 0.9 + Math.min(0.14, p.y / 90);
      return GRASS.clone().multiplyScalar(lift);
    },
    (p) => [p.x / GRASS_TILE, p.z / GRASS_TILE],
  );
  const rowOf = (v: number) => (v === 0 ? 0 : 1 + Math.floor((v - 1) / SEGMENTS));
  const position = top.attributes.position as BufferAttribute;
  const grassIndex: number[] = [];
  const bareFaces: Array<[number, number, number]> = [];
  {
    const index = top.index as BufferAttribute;
    const a = new Vector3();
    const b = new Vector3();
    const c = new Vector3();
    for (let t = 0; t < index.count; t += 3) {
      const i0 = index.getX(t);
      const i1 = index.getX(t + 1);
      const i2 = index.getX(t + 2);
      a.fromBufferAttribute(position, i0);
      b.fromBufferAttribute(position, i1);
      c.fromBufferAttribute(position, i2);
      const normalY = Math.abs(
        b.clone().sub(a).cross(c.clone().sub(a)).normalize().y,
      );
      const averageY = (a.y + b.y + c.y) / 3;
      const lip = Math.max(rowOf(i0), rowOf(i1), rowOf(i2)) > landRows;
      if (!lip && (normalY < 0.78 || averageY > 21)) bareFaces.push([i0, i1, i2]);
      else grassIndex.push(i0, i1, i2);
    }
  }
  top.setIndex(grassIndex);
  const grass = new Mesh(
    top,
    new MeshStandardMaterial({
      map: grassTexture(),
      vertexColors: true,
      roughness: 1,
    }),
  );
  grass.name = 'island-grass';
  grass.receiveShadow = true;
  grass.castShadow = true;
  solid.add(grass);

  // The bare rock, flat shaded face by face, banded by height, and white
  // on the highest tops.
  {
    const ROCK = ['#92857a', '#7d7168', '#9d9082', '#6f655c'].map((c) => new Color(c));
    const SNOW = new Color('#f1f5fa');
    const positions: number[] = [];
    const colours: number[] = [];
    bareFaces.forEach(([i0, i1, i2], face) => {
      const ys = [i0, i1, i2].map((i) => position.getY(i));
      const averageY = (ys[0] + ys[1] + ys[2]) / 3;
      const colour =
        averageY > 23.5
          ? SNOW.clone()
          : ROCK[Math.floor(averageY / 2.2 + hash(face % 7, 2)) % ROCK.length].clone();
      colour.multiplyScalar(0.9 + hash(face, 5) * 0.2);
      for (const i of [i0, i1, i2]) {
        positions.push(position.getX(i), position.getY(i), position.getZ(i));
        colours.push(colour.r, colour.g, colour.b);
      }
    });
    if (positions.length > 0) {
      const geometry = new BufferGeometry();
      geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
      geometry.setAttribute('color', new BufferAttribute(new Float32Array(colours), 3));
      geometry.computeVertexNormals();
      const bare = new Mesh(
        geometry,
        new MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true }),
      );
      bare.name = 'island-bare-rock';
      bare.receiveShadow = true;
      bare.castShadow = true;
      solid.add(bare);
    }
  }

  // ---- The rock -------------------------------------------------------------
  // Strata of a few browns, banded by depth and broken up by bearing, with
  // a brightness jitter per face so every facet catches the light on its own.
  const STRATA = ['#b9784a', '#a96a40', '#c98a58', '#946036'].map((c) => new Color(c));
  const rockGeometry = shell(ROCK_RINGS, 1, (row, i) => {
    if (row === 0) return FRINGE;
    const band = (Math.floor(i / 6) + row * 2) % STRATA.length;
    const colour = STRATA[band].clone();
    // Darker as it falls away from the light, never black.
    colour.multiplyScalar(1 - Math.min(0.45, row * 0.05));
    return colour;
  }).toNonIndexed();
  {
    const c = rockGeometry.attributes.color as BufferAttribute;
    for (let face = 0; face < c.count / 3; face += 1) {
      const shade = 0.88 + hash(face, 9) * 0.24;
      for (let v = 0; v < 3; v += 1) {
        const k = face * 3 + v;
        c.setXYZ(k, c.getX(k) * shade, c.getY(k) * shade, c.getZ(k) * shade);
      }
    }
  }
  rockGeometry.computeVertexNormals();
  const rock = new Mesh(
    rockGeometry,
    new MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true }),
  );
  rock.name = 'island-rock';
  rock.receiveShadow = true;
  rock.castShadow = true;
  solid.add(rock);

  // ---- Where he starts ------------------------------------------------------
  // On the south side, looking in toward the middle of the island.
  const southAngle = Math.PI / 2;
  const spawn = new Vector3(0, 0, islandEdge(southAngle) * 0.62);
  const pad = new Mesh(
    new CylinderGeometry(3, 3, 0.08, 28),
    new MeshStandardMaterial({ color: '#3fbf8a', roughness: 0.8 }),
  );
  pad.name = 'start-pad';
  pad.position.set(spawn.x, 0.04, spawn.z);
  pad.receiveShadow = true;
  root.add(pad);

  // ---- The road ---------------------------------------------------------------
  // Laid on the level ground it was cut into: a darker edge, a lighter
  // surface on it, and a plaza where the roads meet. Drawn a few
  // centimetres up and pulled toward the camera, so that it never flickers
  // against the grass underneath from far away.
  {
    const ribbons: BufferGeometry[] = [];
    const EDGE = new Color('#b08a52');
    const SURFACE = new Color('#e2c68a');
    const strip = (path: typeof ROAD_PATHS[number], half: number, y: number, colour: Color) => {
      const positions: number[] = [];
      const colours: number[] = [];
      const indices: number[] = [];
      path.forEach((point, i) => {
        const before = path[Math.max(0, i - 1)];
        const after = path[Math.min(path.length - 1, i + 1)];
        const dx = after.x - before.x;
        const dz = after.y - before.y;
        const length = Math.hypot(dx, dz) || 1;
        const nx = -dz / length;
        const nz = dx / length;
        for (const side of [-1, 1]) {
          positions.push(point.x + nx * half * side, y, point.y + nz * half * side);
          colours.push(colour.r, colour.g, colour.b);
        }
        if (i > 0) {
          const k = i * 2;
          indices.push(k - 2, k - 1, k, k - 1, k + 1, k);
        }
      });
      const geometry = new BufferGeometry();
      geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
      geometry.setAttribute('color', new BufferAttribute(new Float32Array(colours), 3));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();
      // Facing up whichever way the strip happened to be wound.
      const normal = geometry.attributes.normal as BufferAttribute;
      for (let i = 0; i < normal.count; i += 1) normal.setXYZ(i, 0, 1, 0);
      return geometry;
    };
    for (const path of ROAD_PATHS) {
      ribbons.push(strip(path, ROAD_HALF + 0.55, 0.05, EDGE));
      ribbons.push(strip(path, ROAD_HALF - 0.1, 0.07, SURFACE));
    }
    const disc = (radius: number, y: number, colour: Color) => {
      const geometry = new CylinderGeometry(radius, radius, 0.02, 40).toNonIndexed();
      geometry.translate(PLOTS.plaza.x, y, PLOTS.plaza.z);
      const n = geometry.attributes.position.count;
      const colours = new Float32Array(n * 3);
      for (let i = 0; i < n; i += 1) colours.set([colour.r, colour.g, colour.b], i * 3);
      geometry.setAttribute('color', new BufferAttribute(colours, 3));
      return geometry;
    };
    // Ribbons are indexed and the discs are not, so everything is brought
    // to one form before being joined.
    const parts = [
      ...ribbons.map((g) => g.toNonIndexed()),
      disc(10.5, 0.05, EDGE),
      disc(9.6, 0.07, SURFACE),
    ].map((g) => {
      g.deleteAttribute('uv');
      return g;
    });
    const merged = mergeGeometries(parts);
    if (merged) {
      const material = new MeshStandardMaterial({
        vertexColors: true,
        roughness: 1,
        polygonOffset: true,
        polygonOffsetFactor: -3,
        polygonOffsetUnits: -3,
      });
      const road = new Mesh(merged, material);
      road.name = 'road';
      road.receiveShadow = true;
      root.add(road);
    }
  }

  // ---- Trees, boulders, flowers -------------------------------------------------
  // Scattered by a rule rather than placed by hand, so reshaping the land
  // reshapes where they stand: on ground that is not steep, off the road
  // and off the level places, in drifts rather than evenly.
  {
    const slopeAt = (x: number, z: number) => {
      const e = 1.2;
      const dx = terrainHeight(x + e, z) - terrainHeight(x - e, z);
      const dz = terrainHeight(x, z + e) - terrainHeight(x, z - e);
      return Math.hypot(dx, dz) / (2 * e);
    };
    const clear = (x: number, z: number, margin: number) => {
      if (!overIsland(x, z, 9)) return false;
      if (roadDistance(x, z) < ROAD_HALF + margin) return false;
      for (const plot of Object.values(PLOTS)) {
        if (Math.hypot(x - plot.x, z - plot.z) < plot.r + margin) return false;
      }
      return true;
    };
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
    const move = (g: BufferGeometry, x: number, y: number, z: number, sx = 1, sy = sx, sz = sx, spin = 0) => {
      const m = new Matrix4().compose(
        new Vector3(x, y, z),
        new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), spin),
        new Vector3(sx, sy, sz),
      );
      return g.applyMatrix4(m);
    };

    const trunks: BufferGeometry[] = [];
    const foliage: BufferGeometry[] = [];
    const boulders: BufferGeometry[] = [];
    const flowers: BufferGeometry[] = [];
    const LEAVES = ['#3fae3a', '#4cbc43', '#35a047', '#58c24a'].map((c) => new Color(c));
    const PINES = ['#2a8a4c', '#34a05a', '#277a47'].map((c) => new Color(c));
    const BARK = new Color('#7b5532');
    const STONE = ['#9b9a98', '#8a8987', '#a8a6a2'].map((c) => new Color(c));
    const trees: Array<[number, number, boolean]> = [];

    for (let gx = -ISLAND_RADIUS; gx <= ISLAND_RADIUS; gx += 4.6) {
      for (let gz = -ISLAND_RADIUS; gz <= ISLAND_RADIUS; gz += 4.6) {
        const x = gx + (hash(gx, gz) - 0.5) * 3.6;
        const z = gz + (hash(gz, gx) - 0.5) * 3.6;
        if (!clear(x, z, 7)) continue;
        // Drifts: a slow wave decides where there is wood and where meadow.
        const wood = Math.sin(x * 0.045 + 1.2) * Math.sin(z * 0.05 - 0.4) + 0.35 * Math.sin((x + z) * 0.11);
        if (wood < 0.12 || hash(x, z) < 0.35) continue;
        if (slopeAt(x, z) > 0.55) continue;
        const y = terrainHeight(x, z);
        if (y > 17) continue;
        trees.push([x, z, y > 6 || hash(z, x) > 0.72]);
      }
    }
    trees.forEach(([x, z, pine], n) => {
      const y = terrainHeight(x, z);
      const size = 0.85 + hash(n, 3) * 0.55;
      const spin = hash(n, 8) * 6.28;
      trunks.push(
        tint(move(new CylinderGeometry(0.42, 0.55, 3, 7), x, y + 1.5 * size, z, size), BARK, 0.06, n),
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
    });

    // Boulders: ringed round the outcrops, and a few on the open ground.
    const boulder = (x: number, z: number, r: number, seed: number) => {
      const y = terrainHeight(x, z);
      const g = new IcosahedronGeometry(r, 0);
      boulders.push(
        tint(
          move(g, x, y + r * 0.35, z, 1, 0.75 + hash(seed, 1) * 0.3, 1, hash(seed, 2) * 6.28),
          STONE[seed % STONE.length],
          0.1,
          seed,
        ),
      );
    };
    RISES.filter((r) => r.rough > 1.5).forEach((r, k) => {
      for (let n = 0; n < 7; n += 1) {
        const a = hash(k, n) * 6.28;
        const d = r.r * (0.35 + hash(n, k) * 0.45);
        const x = r.x + Math.cos(a) * d;
        const z = r.z + Math.sin(a) * d;
        const size = 1.2 + hash(n, k + 4) * 2.2;
        // Clear of the level places by its own width, so no boulder leans in.
        if (clear(x, z, size + 1.5)) boulder(x, z, size, k * 10 + n);
      }
    });
    for (let n = 0; n < 40; n += 1) {
      const a = hash(n, 77) * 6.28;
      const d = Math.sqrt(hash(n, 78)) * ISLAND_RADIUS * 0.82;
      const x = Math.cos(a) * d;
      const z = Math.sin(a) * d;
      const size = 0.9 + hash(n, 79) * 1.4;
      if (clear(x, z, size + 1.5) && slopeAt(x, z) < 0.6) boulder(x, z, size, 100 + n);
    }

    // Flowers, in handfuls beside the roads and across the meadows.
    const BLOOM = ['#ffffff', '#ffe14d', '#ff7aa8'].map((c) => new Color(c));
    for (let n = 0; n < 420; n += 1) {
      const a = hash(n, 31) * 6.28;
      const d = Math.sqrt(hash(n, 32)) * ISLAND_RADIUS * 0.88;
      const x = Math.cos(a) * d;
      const z = Math.sin(a) * d;
      if (!overIsland(x, z, 6) || roadDistance(x, z) < ROAD_HALF + 1 || slopeAt(x, z) > 0.45) continue;
      for (let k = 0; k < 3; k += 1) {
        const fx = x + (hash(n, k) - 0.5) * 2.4;
        const fz = z + (hash(k, n) - 0.5) * 2.4;
        flowers.push(
          tint(move(new IcosahedronGeometry(0.11, 0), fx, terrainHeight(fx, fz) + 0.1, fz), BLOOM[(n + k) % 3], 0.05, n),
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
    // Trunks and boulders can be walked into; the leaves overhead and the
    // flowers underfoot cannot, which is how the old worlds did it too.
    add('tree-trunks', trunks, solid, true);
    add('boulders', boulders, solid, true);
    add('foliage', foliage, root, true);
    add('flowers', flowers, root, false);
    // Each flower is a few centimetres across; the box round all of them is not.
    const flowerMesh = root.children.find((c) => c.name === 'flowers');
    if (flowerMesh) flowerMesh.userData.thickest = 0.22;
  }

  // ---- The sea ------------------------------------------------------------
  // Far below, and a long way out in every direction. It is only ever
  // looked at, since falling to it hits the floor of the world first and
  // puts him back on his feet at the last pad.
  const sea = buildSea();
  root.add(sea.mesh);
  const water = sea;

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
    triangleCount: Math.round(triangleCount),
  };
}

/**
 * The sea: one big flat plane of bright blue with lighter wave lines that
 * drift slowly across it. A texture rather than a shader, because at this
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
    new MeshStandardMaterial({ map: texture, roughness: 0.55, metalness: 0 }),
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
