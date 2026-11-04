/**
 * The test ground: one large floor slab, and the two walls a wall kick needs.
 *
 * Still deliberately bare. There is nothing to look at except the character,
 * so the only things being judged are how he looks and how he moves. The
 * floor is marked out in two-metre squares, which is what makes speed
 * readable — without something passing underfoot, walking and running look
 * much the same.
 *
 * The walls are here because a wall kick cannot be tried without one. There
 * are two arrangements: a narrow gap to bounce up between, and a single face
 * to kick off once. Both are well away from the middle, so the open floor is
 * still open.
 */

import {
  Box3,
  BoxGeometry,
  BufferAttribute,
  Color,
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  Scene,
  Vector3,
} from 'three';
import type { CollisionWorld } from '../physics/CollisionWorld.ts';
import { Carryable } from './Carryable.ts';
import { Water } from './Water.ts';
import { STUDIO_SUN_DIRECTION } from '../core/Engine.ts';

/** Side length of the slab, in metres. Large enough to get up to full speed. */
export const SLAB_SIZE = 80;
/** Spacing of the floor markings. */
export const GRID_SQUARE = 2;
const SLAB_THICKNESS = 1;

export const SPAWN_POSITION = new Vector3(0, 0, 10);
export const SPAWN_FACING = Math.PI;

export interface SlabWorld {
  root: Group;
  spawn: Vector3;
  spawnFacing: number;
  triangleCount: number;
  /** Things that can be picked up and carried. */
  carryables: Carryable[];
  /** The pool's surface, which needs a clock to move. Null without a pool. */
  water: Water | null;
  /** Whether anything was built besides the floor. */
  hasObstacles: boolean;
}

export interface SlabOptions {
  /**
   * Whether to build the walls, the platform, the pool, the ladder and the
   * crate, or leave the floor bare.
   *
   * Bare is the default because the floor is for judging the character, and
   * everything else in the way of that is in the way. The moves that need
   * something to climb, swim in or carry are all still in the controller;
   * they simply have nothing to act on until this is switched back on.
   */
  obstacles?: boolean;
}

/** The pool: a hole in the slab, with a basin under it. */
const POOL = { x: -22, z: 25, half: 7, depth: 3.4 };
/** The ladder, on the face of the single tall wall. */
const LADDER = { x: 14.45, z: -6, width: 0.9, top: 7.14 };

const WALL_COLOUR = new Color('#565e6c');
const WALL_TRIM = new Color('#646d7d');
/** Half the gap between the two facing walls. Narrow enough to bounce up. */
const KICK_GAP = 1.7;
const WALL_HEIGHT = 7;
const PLATFORM_SIZE = 5.5;
const PLATFORM_HEIGHT = 2.6;
const THIN_WALL_THICKNESS = 0.3;
const THIN_WALL_LENGTH = 9;
const WALL_LENGTH = 11;
const WALL_THICKNESS = 0.9;

const FLOOR_LIGHT = new Color('#4a515d');
const FLOOR_DARK = new Color('#424954');
const FLOOR_LINE = new Color('#5f6774');

export function buildSlab(
  scene: Scene,
  collision: CollisionWorld,
  options: SlabOptions = {},
): SlabWorld {
  const obstacles = options.obstacles === true;
  const root = new Group();
  root.name = 'slab-world';
  scene.add(root);

  const solid = new Group();
  solid.name = 'solid';
  root.add(solid);

  solid.add(createFloor(obstacles));

  if (obstacles) {
    // A narrow gap to climb by kicking from one side to the other, off to
    // the left of the spawn.
    solid.add(createWall(-14 - KICK_GAP - WALL_THICKNESS / 2, -6));
    solid.add(createWall(-14 + KICK_GAP + WALL_THICKNESS / 2, -6));

    // And a single face, for one kick on its own.
    solid.add(createWall(15, -6));

    // A broad, low platform. At this height the top is just within reach at
    // the peak of an ordinary jump, which is the case the climb onto a roof
    // is for: hands barely on the edge, then haul.
    solid.add(createPlatform(15, 12));

    // A thin wall at the same height, too narrow to stand on, so the swing
    // over the top has something to be seen on.
    solid.add(createThinWall(4, 2));
  }

  // The slab's underside is decoration only. Its triangles are eighty metres
  // across, and the collision octree stops descending as soon as it reaches a
  // node holding triangles, so giant ones there would mask anything smaller.
  // The floor plane above is what is actually walked on.
  const body = new Mesh(
    new BoxGeometry(SLAB_SIZE, SLAB_THICKNESS, SLAB_SIZE),
    new MeshStandardMaterial({ color: new Color('#2a2f38'), roughness: 0.95 }),
  );
  body.position.y = -SLAB_THICKNESS / 2 - 0.02;
  body.receiveShadow = true;
  body.castShadow = true;
  body.name = 'slab-body';
  root.add(body);

  let water: Water | null = null;
  const carryables: Carryable[] = [];

  if (obstacles) {
    // ---- The pool --------------------------------------------------------
    // The floor has a hole cut in it above the basin, so he swims in a pool
    // rather than in a tank sitting on the ground.
    for (const wall of poolBasin()) solid.add(wall);
    collision.addWater(
      new Box3(
        new Vector3(POOL.x - POOL.half, -POOL.depth, POOL.z - POOL.half),
        new Vector3(POOL.x + POOL.half, 0, POOL.z + POOL.half),
      ),
      -0.12,
    );
    water = new Water(POOL.half * 2, -0.12, STUDIO_SUN_DIRECTION, false);
    water.position.set(POOL.x, 0, POOL.z);
    water.renderOrder = 2;
    root.add(water);

    // ---- The ladder ------------------------------------------------------
    solid.add(createLadder());
    collision.addLadder(
      new Box3(
        new Vector3(LADDER.x - LADDER.width, 0, LADDER.z - LADDER.width),
        new Vector3(LADDER.x + 0.3, LADDER.top, LADDER.z + LADDER.width),
      ),
      // He faces +x while on it, into the wall the ladder is fixed to.
      Math.PI / 2,
      LADDER.top,
      new Vector3(LADDER.x, 0, LADDER.z),
    );

    // ---- Something to pick up --------------------------------------------
    const crate = createCrate();
    crate.position.set(3, 0.3, 14);
    root.add(crate);
    carryables.push(new Carryable(crate, 0.3));
  }

  collision.addSolid(solid);

  let triangleCount = 0;
  root.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    const geometry = object.geometry;
    if (geometry.index) triangleCount += geometry.index.count / 3;
    else if (geometry.attributes.position) triangleCount += geometry.attributes.position.count / 3;
  });

  return {
    carryables,
    water,
    hasObstacles: obstacles,
    root,
    spawn: SPAWN_POSITION.clone(),
    spawnFacing: SPAWN_FACING,
    triangleCount: Math.round(triangleCount),
  };
}

/**
 * The walking surface. Vertex colours rather than a texture, so there is no
 * image to load and the markings stay sharp right under the character.
 */
/**
 * One wall, standing on the floor and running along z.
 *
 * It is divided into roughly metre-square faces rather than left as six big
 * ones. The collision octree stops descending as soon as it reaches a node
 * holding triangles, so a few enormous triangles in there would hide
 * everything smaller near them — which is exactly what the slab's underside
 * did once already.
 */
function createWall(x: number, z: number): Mesh {
  const geometry = new BoxGeometry(
    WALL_THICKNESS,
    WALL_HEIGHT,
    WALL_LENGTH,
    1,
    WALL_HEIGHT,
    WALL_LENGTH,
  );
  const mesh = new Mesh(
    geometry,
    new MeshStandardMaterial({ color: WALL_COLOUR, roughness: 0.92 }),
  );
  mesh.position.set(x, WALL_HEIGHT / 2, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.name = 'wall';

  // A band along the top edge, so height is readable while climbing one.
  const cap = new Mesh(
    new BoxGeometry(WALL_THICKNESS + 0.12, 0.24, WALL_LENGTH + 0.12, 1, 1, WALL_LENGTH),
    new MeshStandardMaterial({ color: WALL_TRIM, roughness: 0.85 }),
  );
  cap.position.y = WALL_HEIGHT / 2 + 0.02;
  cap.castShadow = true;
  cap.receiveShadow = true;
  mesh.add(cap);

  return mesh;
}

/**
 * A broad block to climb onto, as opposed to a wall to climb over. Low
 * enough that the top is within reach at the peak of a normal jump, and deep
 * enough that there is somewhere to haul onto once he is up.
 */
/**
 * A wall too thin to stand on top of, so getting over it has to be a vault
 * rather than a climb. Same height as the platform, so the difference
 * between the two moves is the only thing that varies.
 */
/**
 * The walls and bottom of the pool. The floor above has a matching hole cut
 * in it, so what is left is a basin set into the ground rather than a tank
 * standing on it.
 */
function poolBasin(): Mesh[] {
  const material = new MeshStandardMaterial({ color: new Color('#3a4350'), roughness: 0.9 });
  const size = POOL.half * 2;
  const parts: Mesh[] = [];

  const bottom = new Mesh(
    new PlaneGeometry(size, size, POOL.half, POOL.half).rotateX(-Math.PI / 2),
    material,
  );
  bottom.position.set(POOL.x, -POOL.depth, POOL.z);
  bottom.receiveShadow = true;
  parts.push(bottom);

  // Four walls, each a thin box standing in the hole.
  const sides: Array<[number, number, number, number]> = [
    [POOL.x, POOL.z - POOL.half, size, 0.4],
    [POOL.x, POOL.z + POOL.half, size, 0.4],
    [POOL.x - POOL.half, POOL.z, 0.4, size],
    [POOL.x + POOL.half, POOL.z, 0.4, size],
  ];
  for (const [x, z, width, depth] of sides) {
    const wall = new Mesh(
      new BoxGeometry(width, POOL.depth, depth, Math.ceil(width), POOL.depth, Math.ceil(depth)),
      material,
    );
    wall.position.set(x, -POOL.depth / 2, z);
    wall.receiveShadow = true;
    wall.castShadow = true;
    parts.push(wall);
  }
  return parts;
}

/** A ladder: two rails and a run of rungs, flush against the wall. */
function createLadder(): Group {
  const group = new Group();
  group.name = 'ladder';
  const material = new MeshStandardMaterial({ color: new Color('#8a7a63'), roughness: 0.8 });
  const rise = LADDER.top - 0.1;

  for (const side of [-1, 1]) {
    const rail = new Mesh(new BoxGeometry(0.1, rise, 0.1, 1, Math.ceil(rise), 1), material);
    rail.position.set(LADDER.x, rise / 2, LADDER.z + side * 0.34);
    rail.castShadow = true;
    rail.receiveShadow = true;
    group.add(rail);
  }
  for (let y = 0.35; y < rise; y += 0.42) {
    const rung = new Mesh(new CylinderGeometry(0.045, 0.045, 0.76, 8), material);
    rung.rotation.x = Math.PI / 2;
    rung.position.set(LADDER.x, y, LADDER.z);
    rung.castShadow = true;
    group.add(rung);
  }
  return group;
}

/** A crate to pick up, carry and put down. */
function createCrate(): Mesh {
  const crate = new Mesh(
    new BoxGeometry(0.52, 0.52, 0.52, 2, 2, 2),
    new MeshStandardMaterial({ color: new Color('#9a7a4b'), roughness: 0.82 }),
  );
  crate.castShadow = true;
  crate.receiveShadow = true;
  crate.name = 'crate';
  return crate;
}

function createThinWall(x: number, z: number): Mesh {
  const mesh = new Mesh(
    new BoxGeometry(
      THIN_WALL_THICKNESS,
      PLATFORM_HEIGHT,
      THIN_WALL_LENGTH,
      1,
      PLATFORM_HEIGHT,
      THIN_WALL_LENGTH,
    ),
    new MeshStandardMaterial({ color: WALL_COLOUR, roughness: 0.92 }),
  );
  mesh.position.set(x, PLATFORM_HEIGHT / 2, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.name = 'thin-wall';

  const cap = new Mesh(
    new BoxGeometry(THIN_WALL_THICKNESS + 0.08, 0.16, THIN_WALL_LENGTH + 0.08, 1, 1, THIN_WALL_LENGTH),
    new MeshStandardMaterial({ color: WALL_TRIM, roughness: 0.85 }),
  );
  cap.position.y = PLATFORM_HEIGHT / 2 - 0.08;
  cap.castShadow = true;
  cap.receiveShadow = true;
  mesh.add(cap);

  return mesh;
}

function createPlatform(x: number, z: number): Mesh {
  const mesh = new Mesh(
    new BoxGeometry(
      PLATFORM_SIZE,
      PLATFORM_HEIGHT,
      PLATFORM_SIZE,
      PLATFORM_SIZE,
      PLATFORM_HEIGHT,
      PLATFORM_SIZE,
    ),
    new MeshStandardMaterial({ color: WALL_COLOUR, roughness: 0.92 }),
  );
  mesh.position.set(x, PLATFORM_HEIGHT / 2, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.name = 'platform';

  const cap = new Mesh(
    new BoxGeometry(PLATFORM_SIZE + 0.1, 0.2, PLATFORM_SIZE + 0.1, PLATFORM_SIZE, 1, PLATFORM_SIZE),
    new MeshStandardMaterial({ color: WALL_TRIM, roughness: 0.85 }),
  );
  cap.position.y = PLATFORM_HEIGHT / 2 + 0.01;
  cap.castShadow = true;
  cap.receiveShadow = true;
  mesh.add(cap);

  return mesh;
}

/**
 * Removes the floor triangles that sit over the pool.
 *
 * The floor is one plane divided into two-metre squares, so cutting a hole in
 * it is a matter of dropping the triangles whose middle falls inside the
 * pool. Anything else — a second plane with a gap, or a pool standing proud
 * of the ground — either leaves a seam or stops it reading as a pool.
 */
function cutPool(geometry: PlaneGeometry): void {
  const index = geometry.index;
  const position = geometry.attributes.position as BufferAttribute;
  if (!index) return;

  const kept: number[] = [];
  for (let i = 0; i < index.count; i += 3) {
    let x = 0;
    let z = 0;
    for (let k = 0; k < 3; k += 1) {
      const v = index.getX(i + k);
      x += position.getX(v);
      z += position.getZ(v);
    }
    x /= 3;
    z /= 3;
    const inside =
      Math.abs(x - POOL.x) < POOL.half - 0.01 && Math.abs(z - POOL.z) < POOL.half - 0.01;
    if (inside) continue;
    kept.push(index.getX(i), index.getX(i + 1), index.getX(i + 2));
  }
  geometry.setIndex(kept);
}

function createFloor(withPool: boolean): Mesh {
  const segments = SLAB_SIZE / GRID_SQUARE;
  const geometry = new PlaneGeometry(SLAB_SIZE, SLAB_SIZE, segments, segments);
  geometry.rotateX(-Math.PI / 2);

  if (withPool) cutPool(geometry);

  const position = geometry.attributes.position as BufferAttribute;
  const colors = new Float32Array(position.count * 3);
  const colour = new Color();

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const z = position.getZ(i);

    const square = Math.floor(x / GRID_SQUARE) + Math.floor(z / GRID_SQUARE);
    colour.copy(square % 2 === 0 ? FLOOR_LIGHT : FLOOR_DARK);

    const onLine = Math.abs(x % GRID_SQUARE) < 0.01 || Math.abs(z % GRID_SQUARE) < 0.01;
    if (onLine) colour.lerp(FLOOR_LINE, 0.6);

    colors[i * 3] = colour.r;
    colors[i * 3 + 1] = colour.g;
    colors[i * 3 + 2] = colour.b;
  }

  geometry.setAttribute('color', new BufferAttribute(colors, 3));
  geometry.computeVertexNormals();

  const mesh = new Mesh(
    geometry,
    new MeshStandardMaterial({ vertexColors: true, roughness: 0.94, metalness: 0 }),
  );
  mesh.name = 'floor';
  mesh.receiveShadow = true;
  mesh.castShadow = false;
  return mesh;
}
