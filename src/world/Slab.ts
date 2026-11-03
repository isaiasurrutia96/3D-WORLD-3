/**
 * Milestone 1's world: one floor slab in the dark.
 *
 * Deliberately empty. There is no sky, no scenery and nothing to catch on, so
 * the only thing to look at is the character. Faint lines are marked across
 * the floor every two metres, which is what makes speed readable — without
 * something passing underfoot, running and walking look much the same.
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

/** Side length of the slab, in metres. */
export const SLAB_SIZE = 52;
/** Spacing of the floor markings. */
export const GRID_SQUARE = 2;
const SLAB_THICKNESS = 0.8;

export const SPAWN_POSITION = new Vector3(0, 0.1, 6);
export const SPAWN_FACING = Math.PI;

export interface SlabWorld {
  root: Group;
  spawn: Vector3;
  spawnFacing: number;
  triangleCount: number;
}

// Kept deliberately dark and desaturated. The character is the only thing in
// this scene that should hold the eye.
const FLOOR_LIGHT = new Color('#434a56');
const FLOOR_DARK = new Color('#3b414c');
const FLOOR_LINE = new Color('#59616e');

export function buildSlab(scene: Scene, collision: CollisionWorld): SlabWorld {
  const root = new Group();
  root.name = 'slab-world';
  scene.add(root);

  const solid = new Group();
  solid.name = 'solid';
  root.add(solid);

  solid.add(createFloor());

  // The body of the slab, so it reads as a solid block standing in the dark
  // rather than as a sheet of paper.
  const body = new Mesh(
    new BoxGeometry(SLAB_SIZE, SLAB_THICKNESS, SLAB_SIZE),
    new MeshStandardMaterial({ color: new Color('#262b33'), roughness: 0.95 }),
  );
  body.position.y = -SLAB_THICKNESS / 2 - 0.02;
  body.receiveShadow = true;
  body.castShadow = true;
  body.name = 'slab-body';
  solid.add(body);

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
    spawn: SPAWN_POSITION.clone(),
    spawnFacing: SPAWN_FACING,
    triangleCount: Math.round(triangleCount),
  };
}

/**
 * The walking surface. Vertex colours rather than a texture, so there is no
 * image to load and the markings stay sharp right under the character.
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
