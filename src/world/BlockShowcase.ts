/**
 * Blocks for comparing sizes, and nothing else: seven cubes of two by two by
 * two blocks, the top four grass and the bottom four earth, floating in the
 * sky in a row from smallest to largest, each with the character beside it
 * at his fixed height and a label saying how big its blocks are.
 *
 * The baseline block comes from the golden ratio: the character's height
 * divided by a block's edge is φ (1.618…), so a block is 1.82 / φ ≈ 1.125 m.
 * The eight sizes go up and down from it in steps of φ: 0.146×, 0.236×, 0.382×,
 * 0.618×, 1×, 1.618×, 2.618× and 4.236×. Every block stays a cube.
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
  CanvasTexture,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  Scene,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  Vector3,
} from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/** The golden ratio. */
const PHI = (1 + Math.sqrt(5)) / 2;
/** The character's height, in metres. */
export const CHARACTER_HEIGHT = 1.82;
/** One block's edge, from the golden ratio. */
export const BLOCK_SIZE = CHARACTER_HEIGHT / PHI;

// `bright` is the single block's: a strong orange that stands out against
// the blue sky on every face, lit or in shade.
const COLOURS = { grass: '#93d91e', earth: '#da965a', bright: '#ff7a14' } as const;
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

/** The eight sizes, as multiples of the baseline block, in golden-ratio steps. */
export const MULTIPLIERS = [PHI ** -4, PHI ** -3, PHI ** -2, PHI ** -1, 1, PHI, PHI ** 2, PHI ** 3];
/** The space between one group and the next, before the extra for big cubes. */
const GAP = 6;

/** What the camera frames: a middle and how big a box round it is. */
export interface ShowcaseFrame {
  centre: Vector3;
  extent: { width: number; height: number; depth: number };
}

/** One cube of eight blocks, its character and its label. */
export interface ShowcaseGroup extends ShowcaseFrame {
  /** The multiple of the baseline block, e.g. 0.236. */
  multiplier: number;
  /** The label's text for the multiple, e.g. "0.236×". */
  name: string;
  /** One block's edge, in metres. */
  blockSize: number;
  /** Where the character floats beside it, feet level with the cube's bottom. */
  characterAt: Vector3;
  /** The drawn cube. */
  cube: Mesh;
}

export interface BlockShowcase extends ShowcaseFrame {
  root: Group;
  /** The seven groups, smallest first. */
  groups: ShowcaseGroup[];
  /** The baseline (1×) group, where the controllable figure itself stands. */
  baseline: ShowcaseGroup;
  /** Where the character floats in the baseline group. */
  characterAt: Vector3;
  triangleCount: number;
}

/** A label: the multiple, large, and the block's size under it. */
function label(title: string, detail: string): Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 220;
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = 'rgba(255,255,255,0.92)';
    const r = 40;
    context.beginPath();
    context.roundRect(8, 8, 496, 204, r);
    context.fill();
    context.fillStyle = '#1d2b3a';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '700 92px system-ui, -apple-system, "Segoe UI", sans-serif';
    context.fillText(title, 256, 84);
    context.font = '500 50px system-ui, -apple-system, "Segoe UI", sans-serif';
    context.fillStyle = '#41556a';
    context.fillText(detail, 256, 164);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  const sprite = new Sprite(new SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  sprite.material.toneMapped = false;
  sprite.name = `label ${title}`;
  return sprite;
}

/** A length in metres or centimetres, whichever reads more easily. */
function length(metres: number): string {
  return metres < 1 ? `${(metres * 100).toFixed(1)} cm` : `${metres.toFixed(3)} m`;
}

/** The size the owner chose from the comparison: 0.146× the baseline. */
export const CHOSEN_MULTIPLIER = PHI ** -4;

export interface ShowcaseOptions {
  /**
   * One block on its own, at the chosen size, in the bright colour, with
   * no figure and no label. Otherwise the full comparison row.
   */
  single?: boolean;
}

export function buildBlockShowcase(scene: Scene, options: ShowcaseOptions = {}): BlockShowcase {
  const single = options.single === true;
  const root = new Group();
  root.name = 'block-showcase';

  // The eight blocks, by cell: bottom layer earth, top layer grass.
  const cells = new Map<string, Kind>();
  if (single) {
    cells.set('0,0,0', 'bright');
  } else {
    for (let x = 0; x < 2; x += 1) {
      for (let z = 0; z < 2; z += 1) {
        cells.set(`${x},0,${z}`, 'earth');
        cells.set(`${x},1,${z}`, 'grass');
      }
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
            x + 0.5 + core[0] + normal[0] * RADIUS + d.n[0] * height,
            y + 0.5 + core[1] + normal[1] * RADIUS + d.n[1] * height,
            z + 0.5 + core[2] + normal[2] * RADIUS + d.n[2] * height,
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
          x + 0.5 + d.n[0] * 0.34 + d.u[0] * a + d.v[0] * b,
          y + 0.5 + d.n[1] * 0.34 + d.u[1] * a + d.v[1] * b,
          z + 0.5 + d.n[2] * 0.34 + d.u[2] * a + d.v[2] * b,
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
  if (single) {
    // A glow of its own, so a face turned from the sun stays clearly orange
    // instead of going dark; the faces still differ enough to read as a cube.
    material.emissive = new Color(COLOURS.bright);
    material.emissiveIntensity = 0.3;
  }
  // ---- The seven groups, in a row from smallest to largest ----
  // Each is the same eight blocks, scaled equally in every direction; the
  // character beside each is always 1.82 m. The gaps grow with the cubes,
  // so a big cube never crowds the group next to it.
  const groups: ShowcaseGroup[] = [];
  let cursor = 0;
  if (single) {
    const blockSize = BLOCK_SIZE * CHOSEN_MULTIPLIER;
    // A plain cube: flat faces and sharp edges, nothing rounded or raised.
    // Each face is shaded a little differently by which way it points, so
    // the edges show; the glow keeps every face clearly orange.
    // Slightly rounded: corners and edges curve over 10% of the edge.
    const box = new RoundedBoxGeometry(1, 1, 1, 5, 0.1);
    const tint = new Color(COLOURS.bright);
    const faceColours = new Float32Array(box.attributes.position.count * 3);
    const normal = box.attributes.normal;
    for (let i = 0; i < box.attributes.position.count; i += 1) {
      // Shade by which way the surface faces, blending round the curves.
      const nx = normal.getX(i), ny = normal.getY(i), nz = normal.getZ(i);
      const light =
        Math.max(0, nx) * 0.86 + Math.max(0, -nx) * 0.93 + Math.max(0, ny) * 1 +
        Math.max(0, -ny) * 0.6 + Math.max(0, nz) * 0.88 + Math.max(0, -nz) * 0.8;
      const sum = Math.abs(nx) + Math.abs(ny) + Math.abs(nz) || 1;
      const l = light / sum;
      faceColours.set([tint.r * l, tint.g * l, tint.b * l], i * 3);
    }
    box.setAttribute('color', new BufferAttribute(faceColours, 3));
    // Four blocks side by side in a flat two-by-two square, touching.
    let cube = new Mesh(box, material);
    for (const [x, z] of [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]]) {
      const block = new Mesh(box, material);
      block.name = 'showcase-blocks';
      block.castShadow = true;
      block.receiveShadow = true;
      block.scale.setScalar(blockSize);
      block.position.set(x * blockSize, 0, z * blockSize);
      root.add(block);
      cube = block;
    }
    scene.add(root);
    const frame = {
      centre: new Vector3(0, 0, 0),
      extent: { width: blockSize * 2.1, height: blockSize * 1.1, depth: blockSize * 2.1 },
    };
    const group: ShowcaseGroup = {
      multiplier: CHOSEN_MULTIPLIER,
      name: `${CHOSEN_MULTIPLIER.toFixed(3)}×`,
      blockSize,
      characterAt: new Vector3(0, -50, 0),
      cube,
      ...frame,
    };
    return { root, groups: [group], baseline: group, characterAt: group.characterAt, ...frame, triangleCount: 12 };
  }
  for (const multiplier of MULTIPLIERS) {
    const blockSize = BLOCK_SIZE * multiplier;
    const side = blockSize * 2;
    const cube = new Mesh(geometry, material);
    cube.name = 'showcase-blocks';
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.scale.setScalar(blockSize);
    cube.position.set(cursor, 0, -side / 2);
    root.add(cube);
    // Far enough that his hands stay clear of the cube from any angle.
    const characterAt = new Vector3(cursor + side + 0.8 + 0.3, 0, 0);
    const name = `${multiplier.toFixed(3)}×`;
    const tag = label(name, `block ${length(blockSize)}`);
    const tall = Math.max(side, CHARACTER_HEIGHT);
    const tagWidth = Math.max(1.6, tall * 0.75);
    tag.scale.set(tagWidth, tagWidth * (220 / 512), 1);
    tag.position.set(cursor + (side + 1.4) / 2, tall + tagWidth * 0.32 + 0.25, 0);
    root.add(tag);
    const width = side + 1.4;
    groups.push({
      multiplier,
      name,
      blockSize,
      characterAt,
      cube,
      centre: new Vector3(cursor + width / 2, tall / 2 + tagWidth * 0.2, 0),
      extent: { width: width + 0.4, height: tall + tagWidth * 0.6, depth: Math.max(side, 1) },
    });
    // Clearly apart: a wide gap, wider still after the bigger cubes.
    cursor += width + GAP + side * 0.6;
  }
  // The whole row, centred on the middle of the world.
  const shift = -(cursor - GAP) / 2;
  for (const g of groups) {
    g.cube.position.x += shift;
    g.characterAt.x += shift;
    g.centre.x += shift;
  }
  for (const child of root.children) if (child instanceof Sprite) child.position.x += shift;
  scene.add(root);

  const baseline = groups.find((g) => g.multiplier === 1) ?? groups[0];
  const tallest = groups[groups.length - 1];
  return {
    root,
    groups,
    baseline,
    characterAt: baseline.characterAt,
    centre: new Vector3(0, tallest.centre.y, 0),
    extent: { width: cursor - GAP + 0.6, height: tallest.extent.height, depth: tallest.extent.depth },
    triangleCount: (indices.length / 3) * groups.length,
  };
}
