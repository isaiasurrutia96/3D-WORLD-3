/**
 * The obstacle course: one connected route that asks for every move in turn,
 * then asks for them together.
 *
 * It is laid out as a snake rather than a ring, so there is never a question
 * of which way to go: each station finishes facing the next one, and a sign
 * at every station says what to press. The order is the order the moves were
 * built in, which also happens to run from easiest to hardest.
 *
 * Everything stands on the floor slab. There is no pit to fall into and
 * nothing to fall off into nothing: miss a jump and you land on the ground
 * and walk back. That is deliberate — a course for testing moves should cost
 * you ten seconds, not a life.
 */

import {
  BoxGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DoubleSide,
  Group,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  Vector3,
} from 'three';
import { Box3 } from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { CollisionWorld } from '../physics/CollisionWorld.ts';
import { Carryable } from './Carryable.ts';
import { Water } from './Water.ts';
import { STUDIO_SUN_DIRECTION } from '../core/Engine.ts';

/** Where the course starts, and which way it faces. */
export const COURSE_SPAWN = new Vector3(0, 0, 54);
export const COURSE_FACING = Math.PI;

/**
 * The pool, which the floor needs a hole cutting for.
 *
 * Its edges are deliberately on even metres. The floor is one plane of
 * two-metre squares and the hole is cut by dropping whole triangles, so a
 * boundary that falls in the middle of a square leaves every other half
 * triangle behind — which is what the saw-tooth fringe around the old pool
 * was. On the grid, the cut is straight.
 */
export const COURSE_POOL = { x: -35, z: 19, half: 15, depth: 8 };

const STONE = new Color('#5c6673');
const STONE_DARK = new Color('#49525e');
const TRIM = new Color('#6f7a88');
const WOOD = new Color('#8a7a63');
const ACCENT = new Color('#b4743a');
const PAD_COLOUR = new Color('#3f7f6a');

export interface CourseWorld {
  root: Group;
  solid: Group;
  carryables: Carryable[];
  water: Water;
  /** Flat markers that are safe to return to after a fall. */
  checkpoints: Vector3[];
  triangleCount: number;
}

export function buildCourse(scene: Scene, collision: CollisionWorld): CourseWorld {
  const root = new Group();
  root.name = 'course';
  scene.add(root);

  const solid = new Group();
  solid.name = 'course-solid';
  root.add(solid);

  const decor = new Group();
  decor.name = 'course-decor';
  root.add(decor);

  const checkpoints: Vector3[] = [];
  const carryables: Carryable[] = [];

  /** Every solid box in the course, for working out where its edges run. */
  const footprints: Footprint[] = [];
  /** The ones whose top edge is to be picked out with a lighter band. */
  const banded: Footprint[] = [];

  /** A solid block, sitting on its own centre. */
  const block = (
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    colour = STONE,
  ): Mesh => {
    const mesh = new Mesh(
      new BoxGeometry(
        w,
        h,
        d,
        Math.max(1, Math.round(w)),
        Math.max(1, Math.round(h)),
        Math.max(1, Math.round(d)),
      ),
      new MeshStandardMaterial({ color: colour, roughness: 0.92 }),
    );
    mesh.position.set(x, y + h / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    solid.add(mesh);
    footprints.push({ x0: x - w / 2, x1: x + w / 2, z0: z - d / 2, z1: z + d / 2, top: y + h });
    return mesh;
  };

  /** A platform: a block whose top edge is picked out with a lighter band. */
  const platform = (x: number, top: number, z: number, w: number, d: number): Mesh => {
    const mesh = block(x, 0, z, w, top, d);
    banded.push(footprints[footprints.length - 1]);
    return mesh;
  };

  /** A flat marker on the ground, and a place to come back to. */
  const pad = (x: number, y: number, z: number, radius = 1.6): void => {
    const mesh = new Mesh(
      new CylinderGeometry(radius, radius, 0.06, 20),
      new MeshStandardMaterial({ color: PAD_COLOUR, roughness: 0.8 }),
    );
    mesh.position.set(x, y + 0.03, z);
    mesh.receiveShadow = true;
    decor.add(mesh);
    checkpoints.push(new Vector3(x, y, z));
  };

  /**
   * A sign on a post. The text is drawn to a canvas and used as a texture,
   * which is the only way to get readable words into the scene without a
   * font loader and a mesh per letter.
   */
  const sign = (
    x: number,
    y: number,
    z: number,
    facing: number,
    title: string,
    how: string,
    note = '',
  ): void => {
    const group = new Group();
    group.position.set(x, y, z);
    group.rotation.y = facing;

    const post = new Mesh(
      new CylinderGeometry(0.07, 0.07, 1.5, 8),
      new MeshStandardMaterial({ color: WOOD, roughness: 0.8 }),
    );
    post.position.y = 0.75;
    post.castShadow = true;
    group.add(post);

    const panel = new Mesh(
      new PlaneGeometry(2.6, 1.3),
      new MeshBasicMaterial({ map: signTexture(title, how, note), side: DoubleSide, transparent: true }),
    );
    panel.position.y = 2.1;
    group.add(panel);

    decor.add(group);
  };

  // =========================================================================
  // 1 — Running, and stopping
  // =========================================================================
  pad(0, 0, 54);
  sign(3.4, 0, 54, Math.PI * 0.9, '1 · RUN', 'E forward · D back · S / F sides', 'Let go at full speed to skid');
  for (let i = 0; i < 6; i += 1) {
    block(-3.2, 0, 48 - i * 3, 0.5, 0.12, 2, STONE_DARK);
    block(3.2, 0, 48 - i * 3, 0.5, 0.12, 2, STONE_DARK);
  }

  // =========================================================================
  // 2 — Jumping over things
  // =========================================================================
  sign(3.4, 0, 34, Math.PI * 0.9, '2 · JUMP', 'Space', 'Three hurdles, rising');
  block(0, 0, 32, 5, 0.6, 0.8, ACCENT);
  block(0, 0, 28.5, 5, 0.9, 0.8, ACCENT);
  block(0, 0, 25, 5, 1.2, 0.8, ACCENT);

  // =========================================================================
  // 3 — Second and third jump
  // =========================================================================
  pad(0, 0, 21);
  sign(3.6, 0, 21, Math.PI * 0.9, '3 · DOUBLE & TRIPLE JUMP', 'Space, then Space again on landing', 'Keep moving — a combo needs speed');
  // A single jump rises 1.8m, a second 2.5m and a third 3.4m. The steps are
  // spaced so the first is a hop and the next two are not.
  platform(0, 1.5, 17, 4, 4);
  platform(0, 3.1, 12.5, 4, 4);
  platform(0, 5.1, 8, 4.5, 4.5);

  // =========================================================================
  // 4 — The long jump
  // =========================================================================
  pad(0, 0, 2);
  sign(4.2, 0, 2, Math.PI * 0.9, '4 · LONG JUMP', 'Run, hold C, then Space', 'The gap is too wide for a plain jump');
  // Two steps up onto it: he walks over a lip of less than half a metre and
  // is stopped by anything taller, so a 1.1m plinth needs a way on.
  block(0, 0, 3.4, 7, 0.4, 1.6, STONE_DARK);
  block(0, 0, 2.2, 7, 0.78, 1.2, STONE_DARK);
  block(0, 0, -2, 7, 1.1, 8);
  block(0, 0, -17, 9, 1.1, 7, STONE_DARK);

  // =========================================================================
  // 5 — The backflip
  // =========================================================================
  // Off to one side of where the long jump lands, because anything built on
  // that block is in the long jump's flight path: the first version put this
  // platform there and the long jump caught its edge instead of landing.
  pad(0, 1.1, -17);
  sign(12, 0, -21.4, 0, '5 · BACKFLIP', 'Stand still, hold C, then Space', 'Face the wall — it throws you backwards');
  block(12, 0, -23, 10, 5, 1.2, STONE_DARK);
  pad(12, 0, -18.5);
  platform(12, 2.6, -15, 6, 4);

  // =========================================================================
  // 6 — The side flip
  // =========================================================================
  block(18, 0, -15, 8, 2.6, 4);
  sign(18, 2.6, -17.8, 0, '6 · SIDE FLIP', 'At a run: Space, then A', 'Either order, within a third of a second');
  platform(26, 5.1, -15, 5, 5);

  // =========================================================================
  // 7 — The ground pound
  // =========================================================================
  sign(26, 5.1, -11.8, 0, '7 · GROUND POUND', 'In the air: Space, Space again', 'A boost first, then straight down');
  const target = new Mesh(
    new CylinderGeometry(2.2, 2.2, 0.08, 24),
    new MeshStandardMaterial({ color: ACCENT, roughness: 0.75 }),
  );
  target.position.set(26, 0.04, -8);
  target.receiveShadow = true;
  decor.add(target);
  pad(26, 0, -8, 2.2);

  // =========================================================================
  // 8 — Wall kicks
  // =========================================================================
  sign(26, 0, -4, 0, '8 · WALL KICK', 'Jump at a wall, then Space again', 'Bounce side to side to the top');
  block(29.0, 0, 2, 1.2, 9, 10, STONE_DARK);
  block(33.8, 0, 2, 1.2, 9, 10, STONE_DARK);
  // The landing at the top of the gap, and the walkway on from it.
  platform(31.4, 9, 9, 7.6, 5);
  block(31.4, 0, 16, 5, 9, 10);

  // A taller pair beside it, with no top to stop at: as long as each wall is
  // reached, the kicks keep going. Four used to be the limit, and four is
  // exactly what a nine-metre shaft asks for, so the limit was invisible.
  sign(31.4, 0, -2, 0, '8b · KEEP GOING', 'Kick wall to wall, no limit', 'This one is sixteen metres');
  block(29.0, 0, -8, 1.2, 16, 8, STONE_DARK);
  block(33.8, 0, -8, 1.2, 16, 8, STONE_DARK);
  platform(31.4, 16, -14.5, 7.6, 4);
  pad(31.4, 16, -14.5, 2);

  // =========================================================================
  // 9 — Three ways over an edge
  // =========================================================================
  sign(31.4, 9, 20.4, 0, '9 · OVER THE TOP', 'Catch it, Space pulls up', 'Space twice pushes higher · S / F along it · D pushes off');
  // Thin: vaulted, landing on the far side.
  block(31.4, 9, 24, 6, 2.4, 0.35, ACCENT);
  block(31.4, 0, 27.5, 6, 9, 5);
  // A wall top: swung over and stood on.
  block(31.4, 9, 32, 6, 2.5, 1.1, ACCENT);
  block(31.4, 0, 36, 6, 9, 5);
  // A roof: hauled onto.
  block(31.4, 0, 43, 9, 11.6, 8);

  // =========================================================================
  // 10 — The ladder
  // =========================================================================
  sign(24.4, 0.6, 43, -Math.PI / 2, '10 · LADDER', 'Walk into it · E up · D down', 'Space jumps off · G climbs down from the top');
  // Down from the roof to the floor by a ramp, and back up the ladder.
  block(22, 0, 43, 6, 0.6, 8, STONE_DARK);
  // The wall's face is at x = 26.9, and the ladder hangs on the front of it
  // rather than inside it. It used to be centred on 26.95, which buried
  // every rung in the stone and left only the two rails showing as a pair
  // of lines where they happened to be coplanar with the wall.
  const ladderFace = 26.9;
  const ladderTop = 11.6;
  // The rungs are what he holds, so they are what he is placed against.
  const rungX = ladderFace - 0.145;
  buildLadder(decor, ladderFace, 43, ladderTop);
  collision.addLadder(
    new Box3(
      new Vector3(rungX - 1, 0, 43 - 1),
      new Vector3(rungX + 0.45, ladderTop, 43 + 1),
    ),
    Math.PI / 2,
    ladderTop,
    new Vector3(rungX, 0, 43),
  );
  pad(22, 0.6, 43, 2);

  // =========================================================================
  // 11 — Carrying
  // =========================================================================
  sign(31.4, 11.6, 47.4, 0, '11 · CARRY', 'R to pick up · R again to throw', 'Take the crate along the bridge');
  const crate = makeCrate();
  crate.position.set(31.4, 11.9, 46.4);
  decor.add(crate);
  carryables.push(new Carryable(crate, 0.3));
  // The bridge west, off the roof.
  block(20, 11, 49, 26, 0.6, 3.2, STONE_DARK);
  block(4, 0, 49, 8, 11.6, 6);
  pad(4, 11.6, 49, 2.2);

  // =========================================================================
  // 12 — The pool
  // =========================================================================
  sign(-15, 0, 30, Math.PI * 0.6, '12 · SWIM', 'Space strokes · Q or Ctrl dives', 'At the surface, Space climbs out');
  // A board to dive from, on the near side.
  block(-19.5, 0, 30, 4, 6, 4, STONE_DARK);
  block(-23.5, 5.4, 30, 5, 0.5, 2.2, ACCENT);
  pad(-19.5, 6, 30, 1.5);
  for (const wall of poolBasin()) solid.add(wall);
  collision.addWater(
    new Box3(
      new Vector3(COURSE_POOL.x - COURSE_POOL.half, -COURSE_POOL.depth, COURSE_POOL.z - COURSE_POOL.half),
      new Vector3(COURSE_POOL.x + COURSE_POOL.half, 0, COURSE_POOL.z + COURSE_POOL.half),
    ),
    -0.15,
  );
  // Level with the collision surface and below the deck. Setting it to 0
  // put it exactly in the plane of the floor, and two coplanar surfaces
  // fight over every pixel where they meet.
  const water = new Water(COURSE_POOL.half * 2, -0.15, STUDIO_SUN_DIRECTION, false);
  water.position.set(COURSE_POOL.x, -0.15, COURSE_POOL.z);
  water.renderOrder = 2;
  root.add(water);

  // =========================================================================
  // 13 — All of it at once
  // =========================================================================
  pad(-34, 0, 0, 2.4);
  sign(-30.5, 0, 0, Math.PI * 0.35, '13 · THE LOT', 'Long jump · wall kick · climb · pound', 'Finish on the far pad');
  // Long jump across.
  block(-34, 0, 0.6, 7, 0.4, 1.6, STONE_DARK);
  block(-34, 0, -0.6, 7, 0.78, 1.2, STONE_DARK);
  block(-34, 0, -4, 7, 1.1, 5);
  block(-34, 0, -17, 7, 1.1, 5, STONE_DARK);
  // Into a kick shaft.
  block(-36.4, 0, -24, 1.2, 10, 8, STONE_DARK);
  block(-31.6, 0, -24, 1.2, 10, 8, STONE_DARK);
  platform(-34, 10, -30, 7.6, 4);
  // A wall to climb at the end of it.
  block(-34, 10, -34.5, 7, 2.5, 1.1, ACCENT);
  block(-34, 0, -38.5, 7, 10, 6);
  // And the finish, below.
  const finish = new Mesh(
    new CylinderGeometry(3, 3, 0.1, 28),
    new MeshStandardMaterial({ color: PAD_COLOUR, roughness: 0.7 }),
  );
  finish.position.set(-24, 0.05, -38.5);
  finish.receiveShadow = true;
  decor.add(finish);
  pad(-24, 0, -38.5, 3);
  sign(-20.5, 0, -38.5, Math.PI * 0.5, 'FINISH', 'Ground pound to land on it', 'Backspace returns you to the last pad');

  // The bands go on last, once everything they have to follow exists.
  for (const strip of edgeBands(footprints, banded)) solid.add(strip);

  collision.addSolid(solid);

  let triangleCount = 0;
  root.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    const geometry = object.geometry;
    if (geometry.index) triangleCount += geometry.index.count / 3;
    else if (geometry.attributes.position) triangleCount += geometry.attributes.position.count / 3;
  });

  return { root, solid, carryables, water, checkpoints, triangleCount: Math.round(triangleCount) };
}

/** The walls and bottom of the pool, set into the hole cut in the floor. */
/** One run of band: its geometry, already in world coordinates, and where. */
interface BandRun {
  geometry: BoxGeometry;
  box: Box3;
}

/** A solid box's footprint and the height of its top. */
interface Footprint {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
  top: number;
}

/** How far the band stands proud of the face it runs along. */
const BAND_OUT = 0.06;
/** How deep it is, top to bottom. */
const BAND_DEEP = 0.16;
/** How far below the top it sits. */
const BAND_DROP = 0.01;

/**
 * The lighter band along the top edge of a platform.
 *
 * It used to be a single box the size of the platform, which is right only
 * when the platform stands alone. Several are not: a run of obstacles is
 * made continuous by building the next one flush against the last, and two
 * boxes of the same height standing against each other read as one surface.
 * The band then stopped dead half way along that surface — which is the
 * ledge that looked half missing at station 5, where the backflip platform
 * meets the side flip's run-up.
 *
 * So the band is not a property of one box any more. Everything a banded
 * box is joined to at the same height is gathered up, however indirectly,
 * and the band follows the outline of the whole of it — along the parts
 * that are actually open, and not along the seams where one piece meets
 * the next. It is told nothing about which structures these are, so it
 * holds for whatever gets built next.
 */
function edgeBands(all: Footprint[], banded: Footprint[]): Mesh[] {
  const material = new MeshStandardMaterial({ color: TRIM, roughness: 0.85 });
  const strips: Mesh[] = [];
  const taken = new Set<Footprint>();

  const joined = (a: Footprint, b: Footprint) =>
    Math.abs(a.top - b.top) < 0.002 &&
    a.x0 < b.x1 + 0.002 &&
    b.x0 < a.x1 + 0.002 &&
    a.z0 < b.z1 + 0.002 &&
    b.z0 < a.z1 + 0.002;

  for (const seed of banded) {
    if (taken.has(seed)) continue;
    const group: Footprint[] = [seed];
    taken.add(seed);
    for (let i = 0; i < group.length; i += 1) {
      for (const other of all) {
        if (taken.has(other) || !joined(group[i], other)) continue;
        taken.add(other);
        group.push(other);
      }
    }
    const runs = outlineOf(group);
    if (runs.length === 0) continue;
    // One mesh for the whole run, not one per piece of it. A long open edge
    // can be twenty separate strips, and twenty draw calls for a decorative
    // band is twenty too many on the machine this is played on.
    const merged = mergeGeometries(runs.map((run) => run.geometry));
    if (!merged) continue;
    const mesh = new Mesh(merged, material);
    mesh.name = 'edge-band';
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    // The pieces it was made of, so a test can ask whether the band really
    // does cover the whole of the edge it is meant to mark.
    mesh.userData.bands = runs.map((run) => run.box);
    strips.push(mesh);
    for (const run of runs) run.geometry.dispose();
  }
  return strips;
}

/**
 * The band around one joined group, as a strip per open run of edge.
 *
 * Each side of each box is walked in short steps, and a step is kept when
 * the ground just outside it belongs to nothing else in the group. Runs of
 * kept steps become one strip each, so a straight open edge is one box
 * however many pieces it was built from.
 */
function outlineOf(group: Footprint[]): BandRun[] {
  const STEP = 0.25;
  const strips: BandRun[] = [];
  const covered = (x: number, z: number) =>
    group.some((b) => x > b.x0 + 0.002 && x < b.x1 - 0.002 && z > b.z0 + 0.002 && z < b.z1 - 0.002);

  for (const box of group) {
    const sides = [
      { axis: 'x' as const, from: box.x0, to: box.x1, at: box.z0, out: -1 },
      { axis: 'x' as const, from: box.x0, to: box.x1, at: box.z1, out: 1 },
      { axis: 'z' as const, from: box.z0, to: box.z1, at: box.x0, out: -1 },
      { axis: 'z' as const, from: box.z0, to: box.z1, at: box.x1, out: 1 },
    ];

    for (const side of sides) {
      const span = side.to - side.from;
      const steps = Math.max(1, Math.round(span / STEP));
      const length = span / steps;
      let runFrom: number | null = null;

      const close = (runTo: number) => {
        if (runFrom === null) return;
        // Reach around the corner where the run meets the end of the side,
        // so the four sides of an open corner join up.
        const a = runFrom - (Math.abs(runFrom - side.from) < 0.001 ? BAND_OUT : 0);
        const b = runTo + (Math.abs(runTo - side.to) < 0.001 ? BAND_OUT : 0);
        strips.push(bandStrip(side.axis, a, b, side.at, box.top));
        runFrom = null;
      };

      for (let i = 0; i < steps; i += 1) {
        const from = side.from + i * length;
        const middle = from + length / 2;
        const outside = side.at + side.out * (BAND_OUT + 0.02);
        const open =
          side.axis === 'x' ? !covered(middle, outside) : !covered(outside, middle);
        if (open) {
          if (runFrom === null) runFrom = from;
        } else {
          close(from);
        }
      }
      close(side.to);
    }
  }
  return strips;
}

/**
 * One run of band, straddling the face it marks: half of it standing proud
 * of the face and half buried in the block behind, so what shows is the
 * same band as before and the corners of two runs meet without a gap.
 */
function bandStrip(
  axis: 'x' | 'z',
  from: number,
  to: number,
  at: number,
  top: number,
): BandRun {
  const run = Math.max(0.01, to - from);
  const thick = BAND_OUT * 2;
  const width = axis === 'x' ? run : thick;
  const depth = axis === 'x' ? thick : run;
  const middle = (from + to) / 2;
  // Sitting just under the top rather than flush with it. Flush, the band's
  // upper face and the platform's own occupy the same plane, and two
  // coplanar faces fight over every pixel between them: it came out as a
  // mottled patchwork of triangles in two colours, which is what gave
  // station 5 its strange lighter roof.
  const y = top - BAND_DROP - BAND_DEEP / 2;
  const x = axis === 'x' ? middle : at;
  const z = axis === 'x' ? at : middle;
  const geometry = new BoxGeometry(
    width,
    BAND_DEEP,
    depth,
    Math.max(1, Math.round(width)),
    1,
    Math.max(1, Math.round(depth)),
  ).translate(x, y, z);
  return {
    geometry,
    box: new Box3(
      new Vector3(x - width / 2, y - BAND_DEEP / 2, z - depth / 2),
      new Vector3(x + width / 2, y + BAND_DEEP / 2, z + depth / 2),
    ),
  };
}

function poolBasin(): Mesh[] {
  const material = new MeshStandardMaterial({ color: new Color('#3a4350'), roughness: 0.9 });
  const size = COURSE_POOL.half * 2;
  const parts: Mesh[] = [];

  const bottom = new Mesh(
    new PlaneGeometry(size, size, COURSE_POOL.half, COURSE_POOL.half).rotateX(-Math.PI / 2),
    material,
  );
  bottom.position.set(COURSE_POOL.x, -COURSE_POOL.depth, COURSE_POOL.z);
  bottom.receiveShadow = true;
  parts.push(bottom);

  const sides: Array<[number, number, number, number]> = [
    [COURSE_POOL.x, COURSE_POOL.z - COURSE_POOL.half, size, 0.5],
    [COURSE_POOL.x, COURSE_POOL.z + COURSE_POOL.half, size, 0.5],
    [COURSE_POOL.x - COURSE_POOL.half, COURSE_POOL.z, 0.5, size],
    [COURSE_POOL.x + COURSE_POOL.half, COURSE_POOL.z, 0.5, size],
  ];
  for (const [x, z, width, depth] of sides) {
    const wall = new Mesh(
      new BoxGeometry(width, COURSE_POOL.depth, depth, Math.ceil(width), COURSE_POOL.depth, Math.ceil(depth)),
      material,
    );
    wall.position.set(x, -COURSE_POOL.depth / 2, z);
    wall.receiveShadow = true;
    wall.castShadow = true;
    parts.push(wall);
  }
  return parts;
}

/**
 * A ladder standing on the face of a wall, `face` being the wall's surface.
 *
 * It is built into the decoration rather than the collision. A ladder is
 * handled by the controller as a volume to be inside, not a surface to be
 * against, so making the rungs solid only gives the climber something to
 * snag on a hand's width in front of where he is meant to stand.
 */
function buildLadder(group: Group, face: number, z: number, top: number): void {
  const material = new MeshStandardMaterial({ color: WOOD, roughness: 0.8 });

  // Rails flat against the wall.
  for (const side of [-1, 1]) {
    const rail = new Mesh(
      new BoxGeometry(0.11, top - 0.1, 0.11, 1, Math.ceil(top), 1),
      material,
    );
    rail.position.set(face - 0.055, (top - 0.1) / 2, z + side * 0.34);
    rail.castShadow = true;
    rail.receiveShadow = true;
    group.add(rail);
  }

  // Rungs proud of the rails, so there is visibly something to hold.
  for (let y = 0.36; y < top - 0.12; y += 0.4) {
    const rung = new Mesh(new CylinderGeometry(0.055, 0.055, 0.78, 8), material);
    rung.rotation.x = Math.PI / 2;
    rung.position.set(face - 0.145, y, z);
    rung.castShadow = true;
    group.add(rung);
  }
}

function makeCrate(): Mesh {
  const crate = new Mesh(
    new BoxGeometry(0.52, 0.52, 0.52, 2, 2, 2),
    new MeshStandardMaterial({ color: new Color('#9a7a4b'), roughness: 0.82 }),
  );
  crate.castShadow = true;
  crate.receiveShadow = true;
  crate.name = 'crate';
  return crate;
}

/**
 * Draws a sign's text to a canvas and hands back a texture.
 *
 * Words in a 3D scene are either a font loader and a mesh for every letter,
 * or a picture of the words. For a handful of instruction boards the picture
 * is the right answer: no font to load, no geometry, and it reads at any
 * distance the player is likely to stand.
 */
function signTexture(title: string, how: string, note: string): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = 'rgba(22, 27, 35, 0.94)';
    roundedBox(context, 8, 8, canvas.width - 16, canvas.height - 16, 26);
    context.fill();
    context.strokeStyle = '#8b96a6';
    context.lineWidth = 6;
    roundedBox(context, 8, 8, canvas.width - 16, canvas.height - 16, 26);
    context.stroke();

    context.textAlign = 'center';
    context.fillStyle = '#ffd9a0';
    context.font = 'bold 76px system-ui, -apple-system, Segoe UI, sans-serif';
    context.fillText(title, canvas.width / 2, 132);

    context.fillStyle = '#f2f5fa';
    context.font = '600 62px system-ui, -apple-system, Segoe UI, sans-serif';
    wrap(context, how, canvas.width / 2, 236, canvas.width - 90, 70);

    if (note) {
      context.fillStyle = '#9fb0c4';
      context.font = '46px system-ui, -apple-system, Segoe UI, sans-serif';
      wrap(context, note, canvas.width / 2, 400, canvas.width - 110, 54);
    }
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  return texture;
}

function roundedBox(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

function wrap(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): void {
  const words = text.split(' ');
  let line = '';
  let row = y;
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width > maxWidth && line) {
      context.fillText(line, x, row);
      line = word;
      row += lineHeight;
    } else {
      line = candidate;
    }
  }
  if (line) context.fillText(line, x, row);
}
