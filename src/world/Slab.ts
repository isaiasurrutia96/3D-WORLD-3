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
}

const WALL_COLOUR = new Color('#565e6c');
const WALL_TRIM = new Color('#646d7d');
/** Half the gap between the two facing walls. Narrow enough to bounce up. */
const KICK_GAP = 1.7;
const WALL_HEIGHT = 7;
const WALL_LENGTH = 11;
const WALL_THICKNESS = 0.9;

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

  // A narrow gap to climb by kicking from one side to the other, off to the
  // left of the spawn.
  solid.add(createWall(-14 - KICK_GAP - WALL_THICKNESS / 2, -6));
  solid.add(createWall(-14 + KICK_GAP + WALL_THICKNESS / 2, -6));

  // And a single face, for one kick on its own.
  solid.add(createWall(15, -6));

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
