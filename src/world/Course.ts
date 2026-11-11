/**
 * The yard: an obstacle course laid out as a place rather than as a row of
 * test blocks.
 *
 * It is a small working yard on the floor slab — a gate, a warehouse with
 * crates stacked against it, a mill standing an alley's width away, a row of
 * loading docks, a container yard, a perimeter wall and a basin with a high
 * dive. Every one of those is something the finished world will have, and
 * every one is here because of a move: the crates are a stair to a roof
 * edge, the alley is a pair of walls to kick between, the balconies are a
 * ladder made of ledges.
 *
 * There is no single route. The warehouse roof can be reached by the crates
 * and its edge, by the ladder on its quay side, or by kicking up the alley;
 * the mill's roof by the tall end of the alley, by the ladder from the
 * warehouse roof, or by the balconies on its far side. Height is the
 * progression: the ground, then roofs at seven metres, then fourteen.
 *
 * The districts stand well apart, so that anything can be come at from any
 * side, and everything stands on the floor: miss a jump and you land on the
 * ground and walk back.
 *
 * Nothing here is told to the controller. The yard is boxes handed to the
 * collision system, and a list of where things are (COURSE_MARKS) for the
 * tests to read, so that moving a building moves its tests with it.
 */

import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
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
 * The basin, which the floor needs a hole cutting for.
 *
 * Its edges are deliberately on even metres. The floor is one plane of
 * two-metre squares and the hole is cut by dropping whole triangles, so a
 * boundary that falls in the middle of a square leaves every other half
 * triangle behind — which is what the saw-tooth fringe around the old pool
 * was. On the grid, the cut is straight.
 */
export const COURSE_POOL = { x: -35, z: 19, half: 15, depth: 8 };

// ---- The palette -----------------------------------------------------------
// Few colours, each meaning one material, so the yard reads as one place.
const STONE = new Color('#5c6673');
const STONE_DARK = new Color('#49525e');
const CONCRETE = new Color('#7a8088');
const PLASTER = new Color('#a39c8e');
const BRICK = new Color('#8a5648');
const ROOF = new Color('#3b424c');
const TRIM = new Color('#c9c3b4');
const WOOD = new Color('#8a7a63');
const CRATE = new Color('#9a7a4b');
const ACCENT = new Color('#b4743a');
const RUST = new Color('#9c4a3c');
const TEAL = new Color('#3f7f86');
const MUSTARD = new Color('#b08d3a');
const GLASS = new Color('#2c3947');
const PAD_COLOUR = new Color('#3f7f6a');

// ---- Where things are ------------------------------------------------------
// Each building is described once, here, and both the geometry and the
// tests are made from the description.

/** The warehouse: an L of roof at seven metres, round a taller core. */
const WAREHOUSE = { x0: -9, x1: 9, z0: -8, z1: 6, top: 7 };
/** The core at its north-east corner, twice the height. */
const CORE = { x0: 4, x1: 9, z0: -8, z1: -3, top: 14 };
/** The mill, an alley's width east of the warehouse. */
const MILL = { x0: 12.6, x1: 22.6, z0: -8, z1: 6, top: 14 };
/** The loading docks, a row of low platforms running north. */
const DOCKS = { x0: 30, x1: 38 };
/** One shipping container: its height, width and length. */
const CONTAINER = { h: 2.55, w: 2.4, l: 6 };
/** The line the perimeter wall runs along. */
const WALL_Z = -32;
/** The kiosk, which stands at an angle to everything else. */
const KIOSK = { x: -34, z: -15, w: 5, d: 3.5, top: 3, turn: 0.5 };

/** How far the lighter band along a top edge stands proud of the face. */
const BAND_OUT = 0.06;

const kioskFace = (() => {
  // The middle of its long south-east face, and the way that face looks.
  const nx = Math.sin(KIOSK.turn);
  const nz = Math.cos(KIOSK.turn);
  return {
    x: KIOSK.x + nx * (KIOSK.d / 2),
    z: KIOSK.z + nz * (KIOSK.d / 2),
    nx,
    nz,
  };
})();

/**
 * Named places in the yard, for the tests.
 *
 * The tests drive him at particular walls, edges and gaps. They used to
 * carry the coordinates of those themselves, which meant the course could
 * not be changed without every number in them being wrong. They read these
 * instead, and these are made from the same descriptions the geometry is.
 */
export const COURSE_MARKS = {
  /** A long clear wall to hang from: the warehouse's west face. */
  roof: {
    /** The wall's face, which he meets travelling toward +x. */
    face: WAREHOUSE.x0,
    top: WAREHOUSE.top,
    /** A stretch of it with nothing else on it, to catch and move along. */
    z: -5,
  },
  /** The ladder on that same face, from the quay to the roof. */
  ladder: { face: WAREHOUSE.x0, z: 2, base: 0, top: WAREHOUSE.top },
  /** The alley: two facing walls to kick between, travelling along x. */
  alley: {
    x: (WAREHOUSE.x1 + MILL.x0) / 2,
    /** Where the west wall is the warehouse, and stops at its roof. */
    low: { z: 2, top: WAREHOUSE.top },
    /** Where the west wall is the core, and both go on to the top. */
    tall: { z: -5.5, top: MILL.top },
  },
  /** The gap in the loading docks that only a long jump crosses. */
  longJump: { x: (DOCKS.x0 + DOCKS.x1) / 2, top: 1.6, lip: 14.1, far: 6.6 },
  /** A dock low enough that its edge is a step and not a ledge. */
  lowStep: { face: DOCKS.x1, z: 39.6, top: 1.1 },
  /** Standing with his back to a container, to flip up onto it. */
  backflip: { x: -25, z: -19.5, top: CONTAINER.h },
  /** A run along the container tops to the stack two high. */
  sideFlip: { face: -6, z: -16, from: CONTAINER.h, top: CONTAINER.h * 2 },
  /** The crate left on the warehouse roof. */
  crate: { x: -6, y: WAREHOUSE.top, z: 2 },
  /** The fence, whose east end stops in the open. */
  fence: { x0: -14, x1: -6, face: WALL_Z + 0.175, top: 2.4 },
  /** The wall that runs into the side of the gatehouse, tops level. */
  corner: { from: 6, at: 10, face: WALL_Z + 0.55, top: 2.5 },
  /** The high dive, and the board over the water. */
  board: { x: -23.5, y: 5.9, z: 30 },
  /**
   * Faces to catch from an angle: different sizes, heights, materials and
   * directions, one of them on a building that is square to nothing.
   */
  faces: [
    { name: 'warehouse roof, west', x: WAREHOUSE.x0, z: -5, nx: -1, nz: 0, top: WAREHOUSE.top },
    { name: 'gate beam, south', x: 0, z: 48.7, nx: 0, nz: 1, top: 5 },
    { name: 'mill, in the alley', x: MILL.x0, z: 3, nx: -1, nz: 0, top: MILL.top },
    { name: 'fence, south', x: -10, z: WALL_Z + 0.175, nx: 0, nz: 1, top: 2.4 },
    { name: 'container stack, west', x: -6, z: -16, nx: -1, nz: 0, top: CONTAINER.h * 2 },
    { name: 'balcony, south', x: 23.9, z: 5.6, nx: 0, nz: 1, top: 3.2 },
    { name: 'kiosk, turned', x: kioskFace.x, z: kioskFace.z, nx: kioskFace.nx, nz: kioskFace.nz, top: KIOSK.top },
  ],
};

export interface CourseWorld {
  root: Group;
  solid: Group;
  carryables: Carryable[];
  water: Water;
  /** Flat markers that are safe to return to after a fall. */
  checkpoints: Vector3[];
  triangleCount: number;
}

/** One material for everything solid; the colour is in the vertices. */
const SOLID_MATERIAL = new MeshStandardMaterial({ vertexColors: true, roughness: 0.92 });

/** Paints a geometry one colour, with its upward faces another if asked. */
function tinted<T extends BufferGeometry>(geometry: T, colour: Color, cap?: Color): T {
  const normal = geometry.attributes.normal;
  const count = geometry.attributes.position.count;
  const colours = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const c = cap && normal.getY(i) > 0.5 ? cap : colour;
    colours[i * 3] = c.r;
    colours[i * 3 + 1] = c.g;
    colours[i * 3 + 2] = c.b;
  }
  geometry.setAttribute('color', new BufferAttribute(colours, 3));
  return geometry;
}

interface BlockOptions {
  /** Pick the top edge out with a lighter band: this is a ledge. */
  band?: boolean;
  /** A different colour for the top, for a roof. */
  cap?: Color;
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

  /**
   * The structure being built. Its boxes are drawn as one mesh, so a
   * building of a dozen pieces costs what a single box does; the boxes
   * themselves are kept on that mesh for the tests that reason about them.
   */
  let parts: BufferGeometry[] = [];
  let boxes: Box3[] = [];
  let structureName = '';
  const finish = (): void => {
    if (parts.length === 0) return;
    const merged = mergeGeometries(parts);
    for (const part of parts) part.dispose();
    if (merged) {
      const mesh = new Mesh(merged, SOLID_MATERIAL);
      mesh.name = structureName;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData.blocks = boxes;
      solid.add(mesh);
    }
    parts = [];
    boxes = [];
  };
  const structure = (name: string): void => {
    finish();
    structureName = name;
  };

  /** A solid block, by where its base sits and how big it is. */
  const block = (
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    colour = STONE,
    options: BlockOptions = {},
  ): void => {
    const geometry = new BoxGeometry(
      w,
      h,
      d,
      Math.max(1, Math.round(w)),
      Math.max(1, Math.round(h)),
      Math.max(1, Math.round(d)),
    ).translate(x, y + h / 2, z);
    parts.push(tinted(geometry, colour, options.cap));
    boxes.push(
      new Box3(new Vector3(x - w / 2, y, z - d / 2), new Vector3(x + w / 2, y + h, z + d / 2)),
    );
    const footprint = { x0: x - w / 2, x1: x + w / 2, z0: z - d / 2, z1: z + d / 2, top: y + h };
    footprints.push(footprint);
    if (options.band) banded.push(footprint);
  };

  /** The same, by its extents, which is how a building is thought of. */
  const span = (
    x0: number,
    x1: number,
    y0: number,
    y1: number,
    z0: number,
    z1: number,
    colour = STONE,
    options: BlockOptions = {},
  ): void => block((x0 + x1) / 2, y0, (z0 + z1) / 2, x1 - x0, y1 - y0, z1 - z0, colour, options);

  /**
   * Something painted on a wall: a window, a door. Four centimetres proud
   * of the face and not solid, which at that depth is the same thing.
   */
  const painted: BufferGeometry[] = [];
  const detail = (
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    facing: number,
    colour = GLASS,
  ): void => {
    painted.push(
      tinted(
        new BoxGeometry(width, height, 0.04).rotateY(facing).translate(x, y + height / 2, z),
        colour,
      ),
    );
  };
  /** A row of windows along a wall that faces along x or along z. */
  const windows = (
    axis: 'x' | 'z',
    at: number,
    out: number,
    from: number,
    to: number,
    y: number,
    count: number,
    width = 1.2,
    height = 1.4,
  ): void => {
    for (let i = 0; i < count; i += 1) {
      const along = from + ((i + 0.5) * (to - from)) / count;
      if (axis === 'x') detail(along, y, at + out * 0.02, width, height, 0);
      else detail(at + out * 0.02, y, along, width, height, Math.PI / 2);
    }
  };

  /**
   * A flat marker on the ground, and a place to come back to. All of them
   * are drawn as one mesh, and so are the posts the signs stand on.
   */
  const markers: BufferGeometry[] = [];
  const posts: BufferGeometry[] = [];
  const disc = (x: number, y: number, z: number, radius: number, colour: Color): void => {
    markers.push(
      tinted(new CylinderGeometry(radius, radius, 0.06, 24).translate(x, y + 0.03, z), colour),
    );
  };
  const pad = (x: number, y: number, z: number, radius = 1.6): void => {
    disc(x, y, z, radius, PAD_COLOUR);
    checkpoints.push(new Vector3(x, y, z));
  };

  /**
   * A sign on a post. The text is drawn to a canvas and used as a texture,
   * which is the only way to get readable words into the scene without a
   * font loader and a mesh per letter.
   *
   * They name moves rather than keys. The same board is read by someone at
   * a keyboard and someone holding a phone, and "Jump" is on both.
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
    posts.push(
      tinted(new CylinderGeometry(0.07, 0.07, 1.5, 8).translate(x, y + 0.75, z), WOOD),
    );

    // Two faces, back to back, so the board reads from either side. A
    // single face seen from behind shows its words in a mirror, and in a
    // yard with no set route there is no "behind".
    const board = mergeGeometries([
      new PlaneGeometry(2.6, 1.3),
      new PlaneGeometry(2.6, 1.3).rotateY(Math.PI),
    ]);
    if (!board) return;
    const panel = new Mesh(
      board,
      new MeshBasicMaterial({ map: signTexture(title, how, note), transparent: true }),
    );
    panel.name = 'sign';
    panel.position.set(x, y + 2.1, z);
    panel.rotation.y = facing;
    decor.add(panel);
  };

  /**
   * A ladder on a wall. `(x, z)` is a point on the wall's face and `facing`
   * is the way a climber looks, which is into the wall.
   */
  const ladder = (x: number, z: number, base: number, top: number, facing: number): void => {
    const into = { x: Math.sin(facing), z: Math.cos(facing) };
    const across = { x: into.z, z: -into.x };
    decor.add(buildLadder(x, z, base, top, facing));
    // The rungs are what he holds, so they are what he is placed against.
    const rung = { x: x - into.x * 0.145, z: z - into.z * 0.145 };
    const bounds = new Box3();
    for (const depth of [-1, 0.45]) {
      for (const side of [-1, 1]) {
        bounds.expandByPoint(
          new Vector3(
            rung.x + into.x * depth + across.x * side,
            base,
            rung.z + into.z * depth + across.z * side,
          ),
        );
      }
    }
    bounds.max.y = top;
    collision.addLadder(bounds, facing, top, new Vector3(rung.x, base, rung.z));
  };

  /** Something to pick up and throw. */
  const crate = (x: number, y: number, z: number): void => {
    const mesh = makeCrate();
    mesh.position.set(x, y + 0.3, z);
    decor.add(mesh);
    carryables.push(new Carryable(mesh, 0.3));
  };

  // =========================================================================
  // The gate and the forecourt — running, stopping, and the first jumps
  // =========================================================================
  pad(0, 0, 54);
  sign(2.6, 0, 46.2, 0, 'THE YARD', 'Run, jump, climb — any way you like', 'Every roof can be reached more than one way');

  structure('gate');
  // Two posts and a beam across them, with a length of wall either side.
  block(-5.7, 0, 48, 1.4, 4.2, 1.4, STONE_DARK);
  block(5.7, 0, 48, 1.4, 4.2, 1.4, STONE_DARK);
  block(0, 4.2, 48, 12.8, 0.8, 1.4, STONE, { band: true, cap: ROOF });
  block(-10.4, 0, 48, 8, 2.4, 0.8, STONE, { band: true });
  block(10.4, 0, 48, 8, 2.4, 0.8, STONE, { band: true });

  structure('hurdles');
  // Three low walls across the way in, each higher than the last.
  block(0, 0, 42, 5, 0.6, 0.8, ACCENT);
  block(0, 0, 38.5, 5, 0.9, 0.8, ACCENT);
  block(0, 0, 35, 5, 1.2, 0.8, ACCENT);
  crate(-3.4, 0, 45.5);

  // =========================================================================
  // The steps to the high dive — a second and a third jump, heading west
  // =========================================================================
  pad(0, 0, 30);
  sign(1.4, 0, 27.4, Math.PI * 0.5, 'THE STEPS', 'Jump, and jump again as you land', 'Three in a row and the third is a flip · the ladder is the easy way up');
  structure('steps');
  // A single jump rises 1.7m, a second 2.5m and a third 3.4m. The steps are
  // spaced so the first is a hop and the next two are not.
  block(-4, 0, 30, 4, 1.5, 4, STONE, { band: true });
  block(-8.5, 0, 30, 4, 3.1, 4, STONE, { band: true });
  block(-13, 0, 30, 4.5, 5.1, 4.5, STONE, { band: true });

  structure('high-dive');
  block(-19.5, 0, 30, 4, 6, 4, STONE_DARK, { band: true });
  // The board, out over the water.
  block(-23.5, 5.4, 30, 5, 0.5, 2.2, ACCENT);
  pad(-19.5, 6, 30, 1.5);
  ladder(-19.5, 32, 0, 6, Math.PI);

  // =========================================================================
  // The warehouse — crates to its roof edge, along it, and up
  // =========================================================================
  pad(0, 0, 14);
  sign(5.2, 0, 11.5, Math.PI * 0.9, 'THE WAREHOUSE', 'Up the crates, jump for the roof edge', 'Hang · move along it · Jump pulls you up, twice pushes higher');

  structure('warehouse');
  // An L of roof round the core, so the core's own walls go on up from it.
  span(WAREHOUSE.x0, CORE.x0, 0, WAREHOUSE.top, WAREHOUSE.z0, WAREHOUSE.z1, PLASTER, { band: true, cap: ROOF });
  span(CORE.x0, WAREHOUSE.x1, 0, WAREHOUSE.top, CORE.z1, WAREHOUSE.z1, PLASTER, { band: true, cap: ROOF });
  span(CORE.x0, CORE.x1, 0, CORE.top, CORE.z0, CORE.z1, STONE, { band: true, cap: ROOF });
  // A skylight to hop over on the way across the roof.
  block(-3.5, WAREHOUSE.top, -2.5, 4, 1, 3, STONE_DARK, { cap: GLASS });

  // The big door, and a row of windows high on each open wall.
  detail(6.4, 0, WAREHOUSE.z1 + 0.02, 3.4, 3.4, 0, STONE_DARK);
  windows('x', WAREHOUSE.z1, 1, -8, 4, 4.6, 4);
  windows('z', WAREHOUSE.x0, -1, -7, -1, 4.2, 3);
  windows('x', WAREHOUSE.z0, -1, -8, 3, 4.2, 4);
  windows('z', CORE.x0, -1, CORE.z0, CORE.z1, 10.4, 1);
  windows('x', CORE.z0, -1, CORE.x0, CORE.x1, 10.4, 2);

  // The quay ladder up the west wall, and another from the roof up the core.
  ladder(COURSE_MARKS.ladder.face, COURSE_MARKS.ladder.z, 0, WAREHOUSE.top, Math.PI / 2);
  ladder(CORE.x0, -5.5, WAREHOUSE.top, CORE.top, Math.PI / 2);
  pad(-3, WAREHOUSE.top, 3, 2);
  pad(6.5, CORE.top, -5.5, 1.6);
  crate(COURSE_MARKS.crate.x, WAREHOUSE.top, COURSE_MARKS.crate.z);

  structure('crates');
  // Stacked against the south wall, one, two and three crates high. From
  // the last, the roof edge is a jump and a catch.
  block(-6.8, 0, 7.3, 2.6, 1.2, 2.6, CRATE, { band: true });
  block(-3.4, 0, 7.4, 2.8, 1.2, 2.8, CRATE, { band: true });
  block(-3.4, 1.2, 7.2, 2.4, 1.2, 2.4, CRATE, { band: true });
  block(0.2, 0, 7.4, 3, 2.4, 2.8, CRATE, { band: true });
  block(0.2, 2.4, 7.2, 2.4, 1.2, 2.4, CRATE, { band: true });

  // =========================================================================
  // The alley and the mill — wall kicks, and a ladder made of ledges
  // =========================================================================
  pad(COURSE_MARKS.alley.x, 0, 10);
  sign(14.6, 0, 9.4, Math.PI * 0.9, 'THE ALLEY', 'Jump at a wall, Jump again to kick off', 'Near end: the warehouse roof · far end: all the way up');

  structure('mill');
  span(MILL.x0, MILL.x1, 0, MILL.top, MILL.z0, MILL.z1, BRICK, { band: true, cap: ROOF });
  // Balconies up its east wall, each one a jump and a catch above the last.
  const balcony = (top: number, z0: number): void =>
    span(MILL.x1, MILL.x1 + 2.6, top - 0.4, top, z0, z0 + 2.6, CONCRETE, { band: true });
  balcony(3.2, 3);
  balcony(6.2, -0.4);
  balcony(9, -3.8);
  balcony(11.6, -7.2);
  windows('x', MILL.z1, 1, MILL.x0, MILL.x1, 3.4, 3);
  windows('x', MILL.z1, 1, MILL.x0, MILL.x1, 7.4, 3);
  windows('x', MILL.z1, 1, MILL.x0, MILL.x1, 11.2, 3);
  windows('x', MILL.z0, -1, MILL.x0, MILL.x1, 5, 3);
  windows('x', MILL.z0, -1, MILL.x0, MILL.x1, 9.6, 3);
  pad(17.6, MILL.top, -1, 2.4);
  sign(17.6, MILL.top, 2.6, 0, 'THE TOP', 'In the air: Jump to boost, Jump again to pound', 'The target is off the north edge');
  sign(27.4, 0, 6.2, Math.PI * 0.75, 'THE BALCONIES', 'Jump and catch each one, then pull up', 'Four of them, then the roof');

  // The way down: a target to ground pound onto, off the north edge.
  disc(17.6, 0.02, -13.5, 2.6, ACCENT);
  checkpoints.push(new Vector3(17.6, 0, -13.5));

  // =========================================================================
  // The loading docks — gaps that get wider, ending in a long jump
  // =========================================================================
  const dockX = (DOCKS.x0 + DOCKS.x1) / 2;
  pad(dockX, 0, 48);
  sign(dockX + 5.4, 0, 46.5, Math.PI * 0.9, 'THE DOCKS', 'Each gap is wider than the last', 'The last one needs a long jump: run, hold Dive, then Jump');
  structure('docks');
  // Two steps up onto the first: he walks over a lip of less than half a
  // metre and is stopped by anything taller.
  block(dockX, 0, 45.4, 6, 0.4, 1.6, STONE_DARK);
  block(dockX, 0, 44.2, 6, 0.78, 1.2, STONE_DARK);
  span(DOCKS.x0, DOCKS.x1, 0, 1.1, 35.6, 43.6, CONCRETE, { band: true });
  span(DOCKS.x0, DOCKS.x1, 0, 1.1, 26.6, 32.6, CONCRETE, { band: true });
  span(DOCKS.x0, DOCKS.x1, 0, 1.6, COURSE_MARKS.longJump.lip, 22.1, CONCRETE, { band: true });
  span(DOCKS.x0, DOCKS.x1, 0, 1.6, -1.4, COURSE_MARKS.longJump.far, CONCRETE, { band: true });
  // And a shed at the end of the row, a storey higher.
  span(DOCKS.x0, DOCKS.x1, 0, 3, -11.4, -4.4, PLASTER, { band: true, cap: ROOF });
  windows('z', DOCKS.x0, -1, -11.4, -4.4, 1.1, 2, 1.1, 1.1);
  pad(dockX, 1.6, 2.6, 2);

  // =========================================================================
  // The container yard — a backflip, a side flip, and a stack to catch
  // =========================================================================
  pad(-20, 0, -8, 2);
  sign(-20, 0, -10.6, 0, 'THE CONTAINERS', 'Backflip: stand still, hold Dive, Jump', 'Side flip: at a run, Jump then Side · it reaches the stack');
  structure('containers');
  // One on its own, end on, to flip up onto backwards.
  block(COURSE_MARKS.backflip.x, 0, -15, CONTAINER.w, CONTAINER.h, CONTAINER.l, TEAL, { band: true });
  // A crate to get up by, two end to end to run along, and a stack of four.
  block(-19.2, 0, -16, 1.6, 1.3, 1.6, CRATE, { band: true });
  block(-15, 0, -16, CONTAINER.l, CONTAINER.h, CONTAINER.w, RUST, { band: true });
  block(-9, 0, -16, CONTAINER.l, CONTAINER.h, CONTAINER.w, MUSTARD, { band: true });
  block(-3, 0, -16, CONTAINER.l, CONTAINER.h, CONTAINER.w, TEAL, { band: true });
  block(-3, CONTAINER.h, -16, CONTAINER.l, CONTAINER.h, CONTAINER.w, RUST, { band: true });
  block(-3, 0, -18.4, CONTAINER.l, CONTAINER.h, CONTAINER.w, MUSTARD, { band: true });
  block(-3, CONTAINER.h, -18.4, CONTAINER.l, CONTAINER.h, CONTAINER.w, TEAL, { band: true });
  pad(-3, CONTAINER.h * 2, -17.2, 1.8);

  // The kiosk: square to nothing, because the world will not be either.
  finish();
  solid.add(turnedBlock(KIOSK.x, KIOSK.z, KIOSK.w, KIOSK.top, KIOSK.d, KIOSK.turn, PLASTER, ROOF));

  // =========================================================================
  // The perimeter wall — three kinds of edge, and two ways an edge can end
  // =========================================================================
  pad(0, 0, -24, 2);
  sign(-3.6, 0, -26.5, 0, 'THE WALL', 'Thin: you vault it · thick: you stand on it', 'Hang and move along — an edge can stop, or meet a corner');
  structure('wall');
  span(-30, -16, 0, 2.5, WALL_Z - 0.55, WALL_Z + 0.55, STONE, { band: true });
  // A gateway, then a fence too thin to stand on, with both its ends open.
  span(COURSE_MARKS.fence.x0, COURSE_MARKS.fence.x1, 0, COURSE_MARKS.fence.top, WALL_Z - 0.175, WALL_Z + 0.175, WOOD, { band: true });
  span(-2, COURSE_MARKS.corner.at, 0, 2.5, WALL_Z - 0.55, WALL_Z + 0.55, STONE, { band: true });
  // The gatehouse stands forward of the wall, with its roof level with it.
  span(COURSE_MARKS.corner.at, 17, 0, 2.5, WALL_Z - 3, WALL_Z + 3, STONE_DARK, { band: true, cap: ROOF });
  span(12, 15, 2.5, 4.7, WALL_Z - 2, WALL_Z + 1, STONE, { band: true, cap: ROOF });
  span(17, 29, 0, 2.5, WALL_Z - 0.55, WALL_Z + 0.55, STONE, { band: true });
  detail(13.5, 0, WALL_Z + 3.02, 1.6, 2.1, 0, STONE);
  finish();

  // =========================================================================
  // The basin — diving, swimming, and climbing out
  // =========================================================================
  pad(-15, 0, 22, 2);
  sign(-15, 0, 19.4, Math.PI * 0.6, 'THE BASIN', 'Dive goes under, and you stay there', 'Under: swim where you look · Jump up · Dive down');
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

  // The bands go on last, once everything they have to follow exists.
  const bands = edgeBands(footprints, banded);
  if (bands) solid.add(bands);

  // The markers on the ground, and the posts the signs stand on.
  for (const [name, pieces, shadow] of [
    ['markers', markers, false],
    ['sign-posts', posts, true],
  ] as const) {
    const merged = mergeGeometries(pieces);
    for (const piece of pieces) piece.dispose();
    if (!merged) continue;
    const mesh = new Mesh(merged, SOLID_MATERIAL);
    mesh.name = name;
    mesh.castShadow = shadow;
    mesh.receiveShadow = true;
    mesh.userData.thickest = 0.14;
    decor.add(mesh);
  }

  // And everything painted on a wall, as one mesh.
  const paint = mergeGeometries(painted);
  if (paint) {
    const mesh = new Mesh(paint, SOLID_MATERIAL);
    mesh.name = 'painted-detail';
    mesh.receiveShadow = true;
    // Many flat pieces on many walls: its own box says nothing about how
    // much body any one of them has, so that is recorded instead.
    mesh.userData.thickest = 0.04;
    decor.add(mesh);
  }
  for (const part of painted) part.dispose();

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

/**
 * A block turned about its own centre, with its band.
 *
 * Everything else in the yard is square to the grid, which is convenient
 * and is also exactly the assumption a ledge system must not be allowed to
 * make. This one is not, and it is built from the same box and the same
 * band as the rest: it is the building that is turned, not the method.
 */
function turnedBlock(
  x: number,
  z: number,
  w: number,
  h: number,
  d: number,
  turn: number,
  colour: Color,
  cap: Color,
): Mesh {
  const y = h - BAND_DROP - BAND_DEEP / 2;
  const thick = BAND_OUT * 2;
  const pieces = [
    tinted(
      new BoxGeometry(w, h, d, Math.round(w), Math.round(h), Math.round(d)).translate(0, h / 2, 0),
      colour,
      cap,
    ),
    ...[-1, 1].map((side) =>
      tinted(new BoxGeometry(w + thick, BAND_DEEP, thick).translate(0, y, (side * d) / 2), TRIM),
    ),
    ...[-1, 1].map((side) =>
      tinted(new BoxGeometry(thick, BAND_DEEP, d + thick).translate((side * w) / 2, y, 0), TRIM),
    ),
  ];
  const merged = mergeGeometries(pieces) ?? pieces[0];
  merged.rotateY(turn).translate(x, 0, z);
  const mesh = new Mesh(merged, SOLID_MATERIAL);
  mesh.name = 'kiosk';
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  // No boxes to offer: it is not square to the axes, and a box drawn round
  // it would claim the corners of air it does not fill.
  mesh.userData.blocks = [];
  return mesh;
}

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
function edgeBands(all: Footprint[], banded: Footprint[]): Mesh | null {
  const runs: BandRun[] = [];
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
    runs.push(...outlineOf(group));
  }
  if (runs.length === 0) return null;

  // One mesh for all of it, not one per piece. A long open edge can be
  // twenty separate strips, and a draw call each for a decorative band is
  // more than the machine this is played on should be asked for.
  const merged = mergeGeometries(runs.map((run) => tinted(run.geometry, TRIM)));
  for (const run of runs) run.geometry.dispose();
  if (!merged) return null;
  const mesh = new Mesh(merged, SOLID_MATERIAL);
  mesh.name = 'edge-band';
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  // The pieces it was made of, so a test can ask whether the band really
  // does cover the whole of the edge it is meant to mark.
  mesh.userData.bands = runs.map((run) => run.box);
  return mesh;
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
 * A ladder standing on the face of a wall. `(x, z)` is a point on that face
 * and `facing` is the way a climber looks: into the wall.
 *
 * It is built into the decoration rather than the collision. A ladder is
 * handled by the controller as a volume to be inside, not a surface to be
 * against, so making the rungs solid only gives the climber something to
 * snag on a hand's width in front of where he is meant to stand.
 *
 * Made facing along +z and then turned, so one description serves a ladder
 * on any wall.
 */
function buildLadder(x: number, z: number, base: number, top: number, facing: number): Mesh {
  const height = top - base;
  const pieces: BufferGeometry[] = [];

  // Rails flat against the wall.
  for (const side of [-1, 1]) {
    pieces.push(
      new BoxGeometry(0.11, height - 0.1, 0.11, 1, Math.ceil(height), 1).translate(
        side * 0.34,
        base + (height - 0.1) / 2,
        -0.055,
      ),
    );
  }
  // Rungs proud of the rails, so there is visibly something to hold.
  for (let y = base + 0.36; y < top - 0.12; y += 0.4) {
    pieces.push(
      new CylinderGeometry(0.055, 0.055, 0.78, 8).rotateZ(Math.PI / 2).translate(0, y, -0.145),
    );
  }

  const merged = mergeGeometries(pieces.map((piece) => tinted(piece, WOOD))) ?? pieces[0];
  merged.rotateY(facing).translate(x, 0, z);
  const mesh = new Mesh(merged, SOLID_MATERIAL);
  mesh.name = 'ladder';
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function makeCrate(): Mesh {
  const crate = new Mesh(
    new BoxGeometry(0.52, 0.52, 0.52, 2, 2, 2),
    new MeshStandardMaterial({ color: CRATE, roughness: 0.82 }),
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
