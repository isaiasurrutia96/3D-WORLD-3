/**
 * Eight blocks and nothing else: a cube of two by two by two, the top four
 * grass and the bottom four earth, floating in the sky, for comparing the
 * size of a block with the size of the character.
 *
 * The size comes from the golden ratio: the character's height divided by a
 * block's edge is φ (1.618…), so a block is 1.82 / φ ≈ 1.125 m and the cube
 * stands 2.25 m.
 *
 * The blocks are drawn the way the island preview (apps/letsgo-island) draws
 * its blocks, which the owner prefers: each face has a shallow cushion that
 * rises in its middle and falls back to the block's border, so every block
 * reads on its own even where blocks touch; the edges that face open sky are
 * rounded; each block's colour varies a little from the next; and a recessed,
 * darker backing sits under every face so nothing shows through the creases.
 * The technique is redone here rather than imported, since the two worlds keep
 * their code apart.
 */

import {
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  Scene,
  Vector3,
} from 'three';

/** The golden ratio. */
const PHI = (1 + Math.sqrt(5)) / 2;
/** The character's height, in metres. */
export const CHARACTER_HEIGHT = 1.82;
/** One block's edge, from the golden ratio. */
export const BLOCK_SIZE = CHARACTER_HEIGHT / PHI;

const COLOURS = { grass: '#93d91e', earth: '#da965a' } as const;
type Kind = keyof typeof COLOURS;

/** The six directions: normal, and the two axes across the face. */
const DIRECTIONS: Array<{ n: [number, number, number]; u: [number, number, number]; v: [number, number, number]; light: number }> = [
  { n: [1, 0, 0], u: [0, 0, -1], v: [0, 1, 0], light: 0.86 },
  { n: [-1, 0, 0], u: [0, 0, 1], v: [0, 1, 0], light: 0.93 },
  { n: [0, 1, 0], u: [1, 0, 0], v: [0, 0, -1], light: 1 },
  { n: [0, -1, 0], u: [1, 0, 0], v: [0, 0, 1], light: 0.6 },
  { n: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0], light: 0.88 },
  { n: [0, 0, -1], u: [-1, 0, 0], v: [0, 1, 0], light: 0.8 },
];

/** A fixed lighter-or-darker amount per block, the same every time. */
function variation(x: number, y: number, z: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return 0.92 + (s - Math.floor(s)) * 0.16;
}

export interface BlockShowcase {
  root: Group;
  /** Where the character floats, beside the cube, feet level with its bottom. */
  characterAt: Vector3;
  /** The middle of everything, for the camera to look at. */
  centre: Vector3;
  /** How wide and tall the whole group is, in metres, for framing it. */
  extent: { width: number; height: number; depth: number };
  triangleCount: number;
}

export function buildBlockShowcase(scene: Scene): BlockShowcase {
  const root = new Group();
  root.name = 'block-showcase';

  // The eight blocks, by cell: bottom layer earth, top layer grass.
  const cells = new Map<string, Kind>();
  for (let x = 0; x < 2; x += 1) {
    for (let z = 0; z < 2; z += 1) {
      cells.set(`${x},0,${z}`, 'earth');
      cells.set(`${x},1,${z}`, 'grass');
    }
  }
  const at = (x: number, y: number, z: number) => cells.has(`${x},${y},${z}`);

  const positions: number[] = [];
  const normals: number[] = [];
  const colours: number[] = [];
  const indices: number[] = [];
  const RADIUS = 0.19;
  // A little shallower than the island preview's, as these blocks are more
  // than twice the size and the cushion would otherwise look puffy.
  const CUSHION = 0.05;
  const steps = [-0.5, -0.5 + RADIUS * 0.3, -0.5 + RADIUS, 0.5 - RADIUS, 0.5 - RADIUS * 0.3, 0.5];

  for (const [key, kind] of cells) {
    const [x, y, z] = key.split(',').map(Number);
    const tint = new Color(COLOURS[kind]).multiplyScalar(variation(x, y, z));
    // Which neighbours are there: an edge toward a neighbour is not rounded,
    // so touching blocks meet exactly on their shared plane.
    const occupied = [
      [at(x - 1, y, z), at(x + 1, y, z)],
      [at(x, y - 1, z), at(x, y + 1, z)],
      [at(x, y, z - 1), at(x, y, z + 1)],
    ];
    for (const d of DIRECTIONS) {
      if (at(x + d.n[0], y + d.n[1], z + d.n[2])) continue;
      const c = tint.clone().multiplyScalar(d.light);
      const base = positions.length / 3;
      for (const b of steps) {
        for (const a of steps) {
          const p = [0, 1, 2].map((i) => d.n[i] * 0.5 + d.u[i] * a + d.v[i] * b);
          const core = p.map((value, i) => {
            const lo = occupied[i][0] ? -0.5 : -0.5 + RADIUS;
            const hi = occupied[i][1] ? 0.5 : 0.5 - RADIUS;
            return Math.max(lo, Math.min(hi, value));
          });
          const delta = p.map((value, i) => value - core[i]);
          const length = Math.hypot(...delta) || 1;
          const normal = delta.map((value) => value / length);
          // The cushion: highest in the middle of the face, nothing at its
          // border, so neighbouring blocks still meet.
          const fa = Math.min(1, (0.5 - Math.abs(a)) / RADIUS);
          const fb = Math.min(1, (0.5 - Math.abs(b)) / RADIUS);
          const height = CUSHION * fa * fb;
          const da = Math.abs(a) > 0.5 - RADIUS ? (-CUSHION * Math.sign(a) * fb) / RADIUS : 0;
          const db = Math.abs(b) > 0.5 - RADIUS ? (-CUSHION * Math.sign(b) * fa) / RADIUS : 0;
          const smooth = normal.map((value, i) => value - d.u[i] * da - d.v[i] * db);
          const sl = Math.hypot(...smooth) || 1;
          positions.push(
            (x + 0.5 + core[0] + normal[0] * RADIUS + d.n[0] * height) * BLOCK_SIZE,
            (y + 0.5 + core[1] + normal[1] * RADIUS + d.n[1] * height) * BLOCK_SIZE,
            (z + 0.5 + core[2] + normal[2] * RADIUS + d.n[2] * height) * BLOCK_SIZE,
          );
          normals.push(smooth[0] / sl, smooth[1] / sl, smooth[2] / sl);
          colours.push(c.r, c.g, c.b);
        }
      }
      const size = steps.length;
      for (let j = 0; j < size - 1; j += 1) {
        for (let i = 0; i < size - 1; i += 1) {
          const a = base + j * size + i;
          indices.push(a, a + 1, a + size + 1, a, a + size + 1, a + size);
        }
      }
      // The darker backing, a little below the face, under the creases.
      // Pulled in from any edge that is rounded, so it never pokes out past
      // the rounded edge.
      const backing = positions.length / 3;
      const axisOf = (dir: [number, number, number]) => dir.findIndex((v) => v !== 0);
      const ua = axisOf(d.u);
      const va = axisOf(d.v);
      const limit = (axis: number, dir: [number, number, number], end: number) => {
        // Which neighbour lies off this end of the face, along this axis.
        const positive = dir[axis] * end > 0;
        return occupied[axis][positive ? 1 : 0] ? 0.5 : 0.5 - RADIUS;
      };
      for (const [sa, sb] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
        const a = sa * limit(ua, d.u, sa);
        const b = sb * limit(va, d.v, sb);
        positions.push(
          (x + 0.5 + d.n[0] * 0.34 + d.u[0] * a + d.v[0] * b) * BLOCK_SIZE,
          (y + 0.5 + d.n[1] * 0.34 + d.u[1] * a + d.v[1] * b) * BLOCK_SIZE,
          (z + 0.5 + d.n[2] * 0.34 + d.u[2] * a + d.v[2] * b) * BLOCK_SIZE,
        );
        normals.push(...d.n);
        colours.push(c.r * 0.86, c.g * 0.86, c.b * 0.86);
      }
      indices.push(backing, backing + 1, backing + 2, backing, backing + 2, backing + 3);
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3));
  geometry.setAttribute('color', new BufferAttribute(new Float32Array(colours), 3));
  geometry.setIndex(indices);
  const material = new MeshStandardMaterial({ vertexColors: true, roughness: 0.86, metalness: 0 });
  material.toneMapped = false;
  const blocks = new Mesh(geometry, material);
  blocks.name = 'showcase-blocks';
  blocks.castShadow = true;
  blocks.receiveShadow = true;
  // Centred on the origin across, standing up from y = 0.
  blocks.position.set(-BLOCK_SIZE, 0, -BLOCK_SIZE);
  root.add(blocks);
  scene.add(root);

  const cube = BLOCK_SIZE * 2;
  // Far enough that his hands stay clear of the cube from any angle.
  const gap = 0.8;
  const characterAt = new Vector3(cube / 2 + gap + 0.3, 0, 0);
  return {
    root,
    characterAt,
    centre: new Vector3((characterAt.x + 0.4 - cube / 2) / 2, cube / 2, 0),
    extent: { width: cube + gap + 0.9, height: cube, depth: cube },
    triangleCount: indices.length / 3,
  };
}
