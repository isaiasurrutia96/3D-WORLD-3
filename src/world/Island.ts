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
  LinearMipmapLinearFilter,
  Mesh,
  MeshStandardMaterial,
  NearestFilter,
  PlaneGeometry,
  RepeatWrapping,
  Scene,
  SRGBColorSpace,
  Vector3,
} from 'three';
import type { CollisionWorld } from '../physics/CollisionWorld.ts';
import type { Carryable } from './Carryable.ts';

/** The island's mean radius in metres. */
export const ISLAND_RADIUS = 80;
/** How far below the grass the sea lies. */
export const SEA_LEVEL = -64;
/** How many segments the outline is cut into. */
const SEGMENTS = 120;
/** Metres per repeat of the grass texture: two squares of the check. */
const GRASS_TILE = 6;

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

/** A repeatable pseudo-random number from two integers, 0 to 1. */
function hash(a: number, b: number): number {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

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
}

/** The top, from the rim in. Flat, with the grass rolling over the edge. */
const TOP_RINGS: Ring[] = [
  { rho: 0, y: 0 },
  { rho: 0.2, y: 0 },
  { rho: 0.4, y: 0 },
  { rho: 0.6, y: 0 },
  { rho: 0.8, y: 0 },
  { rho: 0.9, y: 0 },
  { rho: 0.96, y: 0 },
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
    return new Vector3(
      Math.cos(angle) * edge,
      ring.y + rough * (hash(j, rowSeed + 40) - 0.5) * 2.4,
      Math.sin(angle) * edge,
    );
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
        const p = new Vector3(0, ring.y, 0);
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

  // ---- The grass ----------------------------------------------------------
  const GRASS = new Color('#ffffff');
  const LIP = new Color('#d9f2b0');
  const FRINGE = new Color('#8fb85a');
  const top = shell(
    TOP_RINGS,
    0,
    (row) => (row >= 9 ? FRINGE : row >= 7 ? LIP : GRASS),
    (p) => [p.x / GRASS_TILE, p.z / GRASS_TILE],
  );
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
  texture.repeat.set(60, 60);
  texture.anisotropy = 4;
  const mesh = new Mesh(
    new PlaneGeometry(2400, 2400).rotateX(-Math.PI / 2),
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
