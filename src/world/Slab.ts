/**
 * The movement test ground: a floor slab, a tall box with a ladder up one
 * side, and a few blocks to jump between.
 *
 * Still deliberately bare. Everything here exists to make a movement visible
 * — the floor markings show speed, the blocks show jump height and distance,
 * and the box shows climbing and topping out.
 */

import {
  BoxGeometry,
  BufferAttribute,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  Scene,
  Vector3,
} from 'three';
import type { CollisionWorld } from '../physics/CollisionWorld.ts';
import { MeshBuilder } from './MeshBuilder.ts';

/** Side length of the slab, in metres. */
export const SLAB_SIZE = 44;
/** Spacing of the floor markings. */
export const GRID_SQUARE = 2;
const SLAB_THICKNESS = 0.8;

/** The climbable box. */
const BOX_WIDTH = 6;
const BOX_HEIGHT = 4;
const BOX_DEPTH = 6;
const BOX_CENTRE = new Vector3(0, BOX_HEIGHT / 2, -10);
/** The ladder is fixed to the box's near face and faces back toward the spawn. */
const LADDER_HALF_WIDTH = 0.42;
/**
 * The ladder runs past the top of the box, the way a real one does. Stopping
 * it level with the ledge leaves the climber's feet too low to step up onto
 * it, and they drop back down instead of topping out.
 */
const LADDER_OVERRUN = 0.7;
const LADDER_HEIGHT = BOX_HEIGHT + LADDER_OVERRUN;

export const SPAWN_POSITION = new Vector3(0, 0, 5);
export const SPAWN_FACING = Math.PI;

export interface SlabWorld {
  root: Group;
  spawn: Vector3;
  spawnFacing: number;
  triangleCount: number;
  /** Where the ladder starts, for the headless test to walk to. */
  ladderFoot: Vector3;
  boxTopY: number;
}

const FLOOR_LIGHT = new Color('#4a515d');
const FLOOR_DARK = new Color('#424954');
const FLOOR_LINE = new Color('#5f6774');

export function buildSlab(scene: Scene, collision: CollisionWorld): SlabWorld {
  const root = new Group();
  root.name = 'slab-world';
  scene.add(root);

  const solid = new Group();
  solid.name = 'solid';
  root.add(solid);

  solid.add(createFloor());

  // The slab's underside is decoration only. Its triangles are forty metres
  // across, and the octree stops descending as soon as it reaches a node
  // holding triangles, so these giant ones masked everything smaller beneath
  // them — the character fell straight through the box. The floor plane above
  // is what is actually walked on.
  const body = new Mesh(
    new BoxGeometry(SLAB_SIZE, SLAB_THICKNESS, SLAB_SIZE),
    new MeshStandardMaterial({ color: new Color('#2a2f38'), roughness: 0.95 }),
  );
  body.position.y = -SLAB_THICKNESS / 2 - 0.02;
  body.receiveShadow = true;
  body.castShadow = true;
  body.name = 'slab-body';
  root.add(body);

  solid.add(createBox());
  solid.add(createJumpBlocks());

  // The ladder itself is scenery, not collision. Climbing is driven by the
  // registered surface below, and leaving the rungs out of the octree stops
  // the character catching on them while walking past.
  const ladderFaceZ = BOX_CENTRE.z + BOX_DEPTH / 2;
  root.add(createLadder(ladderFaceZ));

  collision.addSolid(solid);
  collision.addClimbableLadder(
    new Vector3(BOX_CENTRE.x, 0, ladderFaceZ),
    new Vector3(0, 0, 1),
    LADDER_HALF_WIDTH,
    LADDER_HEIGHT,
  );

  let triangleCount = 0;
  root.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    const geometry = object.geometry;
    if (geometry.index) triangleCount += geometry.index.count / 3;
    else if (geometry.attributes.position) triangleCount += geometry.attributes.position.count / 3;
  });

  return {
    root,
    spawn: SPAWN_POSITION.clone(),
    spawnFacing: SPAWN_FACING,
    triangleCount: Math.round(triangleCount),
    ladderFoot: new Vector3(BOX_CENTRE.x, 0, ladderFaceZ + 1),
    boxTopY: BOX_HEIGHT,
  };
}

/**
 * The walking surface, marked out in two-metre squares. Vertex colours rather
 * than a texture, so there is no image to load and the markings stay sharp
 * right under the character.
 */
function createFloor(): Mesh {
  const segments = SLAB_SIZE / GRID_SQUARE;
  const geometry = new PlaneGeometry(SLAB_SIZE, SLAB_SIZE, segments, segments);
  geometry.rotateX(-Math.PI / 2);

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

/** The box the ladder leads up. Flat on top, so it can be stood on. */
function createBox(): Group {
  const builder = new MeshBuilder();
  // Subdivided rather than left as six big quads. The octree sorts triangles
  // by size, and metres-wide ones end up high in the tree where they hide
  // anything smaller behind them.
  builder.add('box', new BoxGeometry(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH, 4, 3, 4), {
    position: [BOX_CENTRE.x, BOX_CENTRE.y, BOX_CENTRE.z],
  });
  // A lip around the top, set flush so it is not a ledge to trip over.
  builder.add('boxTrim', new BoxGeometry(BOX_WIDTH + 0.24, 0.2, BOX_DEPTH + 0.24, 4, 1, 4), {
    position: [BOX_CENTRE.x, BOX_HEIGHT - 0.1, BOX_CENTRE.z],
  });

  const group = new Group();
  group.name = 'climb-box';
  builder.build(
    group,
    {
      box: new MeshStandardMaterial({ color: new Color('#8d8679'), roughness: 0.92 }),
      boxTrim: new MeshStandardMaterial({ color: new Color('#a39b8c'), roughness: 0.9 }),
    },
    { castShadow: true, receiveShadow: true },
  );
  return group;
}

/** Two rails and a set of rungs, standing proud of the box's face. */
function createLadder(faceZ: number): Group {
  const builder = new MeshBuilder();
  const railZ = faceZ + 0.08;

  for (const x of [-LADDER_HALF_WIDTH, LADDER_HALF_WIDTH]) {
    builder.add('ladder', new BoxGeometry(0.09, LADDER_HEIGHT + 0.2, 0.09), {
      position: [x, (LADDER_HEIGHT + 0.2) / 2 - 0.1, railZ],
    });
  }

  const rungCount = Math.floor(LADDER_HEIGHT / 0.38);
  for (let i = 0; i <= rungCount; i += 1) {
    builder.add('ladder', new BoxGeometry(LADDER_HALF_WIDTH * 2, 0.06, 0.06), {
      position: [0, 0.18 + i * 0.38, railZ],
    });
  }

  const group = new Group();
  group.name = 'ladder';
  builder.build(
    group,
    { ladder: new MeshStandardMaterial({ color: new Color('#6f5a3c'), roughness: 0.9 }) },
    { castShadow: true, receiveShadow: true },
  );
  return group;
}

/**
 * Blocks of rising height with widening gaps, so the limits of a jump can be
 * found without being punished for finding them.
 */
function createJumpBlocks(): Group {
  const builder = new MeshBuilder();
  const material = new MeshStandardMaterial({ color: new Color('#7d8794'), roughness: 0.93 });

  const blocks: Array<[number, number, number]> = [
    // x, z, height
    [9, 3, 0.55],
    [9, -0.6, 1.1],
    [9, -5, 1.75],
    [-9, 2, 0.9],
    [-9, -3.5, 0.9],
  ];

  for (const [x, z, height] of blocks) {
    builder.add('block', new BoxGeometry(2.4, height, 2.4, 2, 1, 2), {
      position: [x, height / 2, z],
    });
  }

  const group = new Group();
  group.name = 'jump-blocks';
  builder.build(group, { block: material }, { castShadow: true, receiveShadow: true });
  return group;
}
