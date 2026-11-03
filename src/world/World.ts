/**
 * Assembles the playable world: terrain, castle, moat, trees, courtyard
 * obstacles and scenery, then bakes the solid parts into the collision octree.
 *
 * Placement is driven by a seeded generator, so the world is identical on
 * every load and anything the player learns about it stays true.
 */

import {
  Box3,
  BoxGeometry,
  Color,
  ConeGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Scene,
  Vector3,
} from 'three';
import { CollisionWorld } from '../physics/CollisionWorld.ts';
import { Carryable } from './Carryable.ts';
import {
  BRIDGE_HALF_WIDTH,
  BRIDGE_MAX_Z,
  BRIDGE_MIN_Z,
  createCastle,
  isOnBridge,
} from './Castle.ts';
import { MeshBuilder } from './MeshBuilder.ts';
import {
  createCrate,
  createGrass,
  createGroundDetail,
  createLampPost,
  createSignpost,
  createTrees,
  type TreePlacement,
} from './Props.ts';
import {
  ISLAND_CENTRE_Z,
  MOAT_INNER,
  MOAT_OUTER,
  MOAT_FLOOR_Y,
  TERRAIN_SIZE,
  WATER_LEVEL,
  createTerrain,
  islandDistance,
  terrainHeight,
} from './Terrain.ts';
import { Water } from './Water.ts';

export const SPAWN_POSITION = new Vector3(0, 0, 34);
/** Facing angle that looks toward the castle. */
export const SPAWN_FACING = Math.PI;

/** Deterministic generator, so the world is the same every time it loads. */
function makeRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface BuiltWorld {
  root: Group;
  water: Water;
  carryables: Carryable[];
  spawn: Vector3;
  spawnFacing: number;
  /** Total triangles in the static world, reported in the performance panel. */
  triangleCount: number;
}

export function buildWorld(
  scene: Scene,
  collision: CollisionWorld,
  sunDirection: Vector3,
  options: { foliageDensity: number; waterReflections: boolean },
): BuiltWorld {
  const root = new Group();
  root.name = 'world';
  scene.add(root);

  // Solid geometry is collected separately so only the right things end up in
  // the collision octree — foliage and grass stay walk-through.
  const solid = new Group();
  solid.name = 'solid';
  root.add(solid);

  // ---- Terrain -------------------------------------------------------------
  const terrain = createTerrain();
  solid.add(terrain);

  // ---- Castle and bridge ---------------------------------------------------
  const castle = createCastle();
  solid.add(castle.group);

  // ---- Courtyard obstacles -------------------------------------------------
  solid.add(createCourtyardObstacles());

  // ---- Water ---------------------------------------------------------------
  const water = new Water(TERRAIN_SIZE, WATER_LEVEL, sunDirection, options.waterReflections);
  root.add(water);

  collision.addWater(
    new Box3(
      new Vector3(-TERRAIN_SIZE / 2, MOAT_FLOOR_Y - 1.5, -TERRAIN_SIZE / 2),
      new Vector3(TERRAIN_SIZE / 2, WATER_LEVEL, TERRAIN_SIZE / 2),
    ),
    WATER_LEVEL,
    // The moat is a ring, so the box around it also covers the dry island.
    (x, z) => {
      const distance = islandDistance(x, z);
      return distance > MOAT_INNER * 0.4 && distance < MOAT_OUTER + 1.5;
    },
  );

  // ---- Trees ---------------------------------------------------------------
  const treePlacements = planTrees();
  const trees = createTrees(treePlacements);
  solid.add(trees.trunks);
  root.add(trees.foliage);

  for (const tree of treePlacements) {
    // The climbable section stops short of the canopy so the character lets
    // go at the top rather than disappearing into the leaves.
    collision.addClimbable(
      tree.position.clone(),
      tree.trunkRadius,
      tree.trunkHeight + 1.1,
      0.62,
    );
  }

  // ---- Scenery -------------------------------------------------------------
  const { rocks, flowers, grass } = planGroundDetail(options.foliageDensity);
  root.add(createGroundDetail(rocks, flowers));
  if (grass.length > 0) root.add(createGrass(grass));

  const signpost = createSignpost();
  signpost.position.set(7.4, terrainHeight(7.4, 28.5), 28.5);
  signpost.rotation.y = -0.65;
  solid.add(signpost);

  for (const z of [BRIDGE_MIN_Z - 3.2, BRIDGE_MAX_Z + 3.2]) {
    for (const x of [-BRIDGE_HALF_WIDTH - 1.1, BRIDGE_HALF_WIDTH + 1.1]) {
      const lamp = createLampPost();
      lamp.position.set(x, terrainHeight(x, z), z);
      solid.add(lamp);
    }
  }

  // ---- Carryable crates ----------------------------------------------------
  const carryables: Carryable[] = [];
  const cratePositions: Array<[number, number]> = [
    [6.5, 36],
    [-7.5, 8],
    [12, 6],
    [-14, 4.5],
  ];
  for (const [x, z] of cratePositions) {
    const crate = createCrate();
    crate.position.set(x, terrainHeight(x, z) + 0.8, z);
    root.add(crate);
    carryables.push(new Carryable(crate, 0.78));
  }

  // ---- Bake collision ------------------------------------------------------
  collision.addSolid(solid);

  let triangleCount = 0;
  root.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    const geometry = object.geometry;
    if (geometry.index) {
      triangleCount += geometry.index.count / 3;
    } else if (geometry.attributes.position) {
      triangleCount += geometry.attributes.position.count / 3;
    }
  });

  const spawn = SPAWN_POSITION.clone();
  spawn.y = terrainHeight(spawn.x, spawn.z) + 0.1;

  return {
    root,
    water,
    carryables,
    spawn,
    spawnFacing: SPAWN_FACING,
    triangleCount: Math.round(triangleCount),
  };
}

/**
 * Blocks, steps and a ramp in the courtyard, placed so the first things the
 * player meets after the bridge are a jump they can clear and a climb they
 * can measure themselves against.
 */
function createCourtyardObstacles(): Object3D {
  const builder = new MeshBuilder();
  const materials: Record<string, MeshStandardMaterial> = {
    block: new MeshStandardMaterial({ color: new Color('#c9bda0'), roughness: 0.93 }),
    blockDark: new MeshStandardMaterial({ color: new Color('#a1947b'), roughness: 0.95 }),
    ramp: new MeshStandardMaterial({ color: new Color('#8fae63'), roughness: 0.96 }),
  };

  // A rising staircase on the left of the approach.
  for (let step = 0; step < 5; step += 1) {
    const height = 0.55 + step * 0.72;
    builder.add('block', new BoxGeometry(4.2, height, 3.4), {
      position: [-22 + step * 0.4, height / 2, 9.5 - step * 3.6],
    });
    // Flush with the step's top face, not standing proud of it.
    builder.add('blockDark', new BoxGeometry(4.4, 0.16, 3.6), {
      position: [-22 + step * 0.4, height - 0.08, 9.5 - step * 3.6],
    });
  }

  // Spaced pillars on the right: the gaps widen, so the player can find the
  // edge of their jump without being punished for it.
  const gaps = [3.0, 3.8, 4.6, 5.4];
  let z = 10;
  for (let i = 0; i < gaps.length; i += 1) {
    const height = 1.4 + (i % 2) * 0.8;
    builder.add('block', new BoxGeometry(2.6, height, 2.6), {
      position: [15, height / 2, z],
    });
    builder.add('blockDark', new BoxGeometry(2.8, 0.16, 2.8), {
      position: [15, height - 0.08, z],
    });
    z -= gaps[i];
  }

  // A gentle stone ramp onto the castle plinth, shallow enough to walk up.
  builder.add('block', new BoxGeometry(6, 0.5, 9.4), {
    position: [-27, 0.5, 5],
    rotation: [-0.128, 0, 0],
  });

  // A grassy mound steep enough that the character slides back down it, so
  // the limit on what can be walked up is something they can see.
  builder.add('ramp', new ConeGeometry(4.2, 6.2, 14), {
    position: [26, 2.6, 6],
  });

  const group = new Group();
  group.name = 'courtyard-obstacles';
  builder.build(group, materials, { castShadow: true, receiveShadow: true });
  return group;
}

function planTrees(): TreePlacement[] {
  const random = makeRandom(20261103);
  const placements: TreePlacement[] = [];

  const accept = (x: number, z: number): boolean => {
    if (isOnBridge(x, z)) return false;
    const distance = islandDistance(x, z);
    // Keep clear of the moat itself and of its banks.
    if (distance > MOAT_INNER - 2 && distance < MOAT_OUTER + 3.5) return false;
    // Keep the castle's own footprint clear.
    if (distance < 0 && Math.abs(x) < 26 && z < 2) return false;
    // Leave the spawn and the approach to the bridge open.
    if (Math.abs(x) < 7 && z > 28) return false;
    const ground = terrainHeight(x, z);
    if (ground < WATER_LEVEL + 0.6) return false;
    for (const existing of placements) {
      if (existing.position.distanceTo(new Vector3(x, ground, z)) < 6.5) return false;
    }
    return true;
  };

  // Two climbing trees right by the spawn, so the move is discoverable.
  for (const [x, z] of [
    [-9.5, 36.5],
    [10.5, 30],
  ] as Array<[number, number]>) {
    placements.push({
      position: new Vector3(x, terrainHeight(x, z), z),
      trunkRadius: 0.42,
      trunkHeight: 7.4,
    });
  }

  // A small grove in the courtyard corners.
  for (const [x, z] of [
    [-27, 9.5],
    [27, 10],
  ] as Array<[number, number]>) {
    if (!accept(x, z)) continue;
    placements.push({
      position: new Vector3(x, terrainHeight(x, z), z),
      trunkRadius: 0.46,
      trunkHeight: 6.2,
    });
  }

  // The rest scattered around the outer bank.
  let attempts = 0;
  while (placements.length < 52 && attempts < 1400) {
    attempts += 1;
    const angle = random() * Math.PI * 2;
    const radius = 34 + random() * 62;
    const x = Math.cos(angle) * radius;
    const z = ISLAND_CENTRE_Z + Math.sin(angle) * radius;
    if (!accept(x, z)) continue;

    placements.push({
      position: new Vector3(x, terrainHeight(x, z), z),
      trunkRadius: 0.4 + random() * 0.22,
      trunkHeight: 5 + random() * 3.4,
    });
  }

  return placements;
}

function planGroundDetail(density: number): {
  rocks: Array<{ position: Vector3; scale: number }>;
  flowers: Array<{ position: Vector3; colorKey: string }>;
  grass: Array<{ position: Vector3; scale: number; rotation: number; tint: number }>;
} {
  const random = makeRandom(981237);
  const rocks: Array<{ position: Vector3; scale: number }> = [];
  const flowers: Array<{ position: Vector3; colorKey: string }> = [];
  const grass: Array<{ position: Vector3; scale: number; rotation: number; tint: number }> = [];

  const onGrass = (x: number, z: number): number | null => {
    if (isOnBridge(x, z)) return null;
    const distance = islandDistance(x, z);
    if (distance > MOAT_INNER - 1 && distance < MOAT_OUTER + 1.5) return null;
    if (distance < 0 && Math.abs(x) < 25 && z < 1) return null;
    const ground = terrainHeight(x, z);
    if (ground < WATER_LEVEL + 0.45) return null;
    return ground;
  };

  const grassTarget = Math.round(5200 * density);
  let attempts = 0;
  while (grass.length < grassTarget && attempts < grassTarget * 7) {
    attempts += 1;
    // Concentrated around the castle rather than spread thinly to the rim,
    // so the ground near the player actually looks grassy.
    const angle = random() * Math.PI * 2;
    const radius = 16 + Math.sqrt(random()) * 58;
    const x = Math.cos(angle) * radius;
    const z = ISLAND_CENTRE_Z + Math.sin(angle) * radius;
    const ground = onGrass(x, z);
    if (ground === null) continue;
    grass.push({
      position: new Vector3(x, ground, z),
      scale: 0.85 + random() * 0.95,
      rotation: random() * Math.PI * 2,
      tint: random(),
    });
  }

  const rockTarget = Math.round(70 * Math.max(0.4, density));
  attempts = 0;
  while (rocks.length < rockTarget && attempts < rockTarget * 12) {
    attempts += 1;
    const x = (random() - 0.5) * 200;
    const z = ISLAND_CENTRE_Z + (random() - 0.5) * 200;
    const ground = onGrass(x, z);
    if (ground === null) continue;
    rocks.push({ position: new Vector3(x, ground, z), scale: 0.3 + random() * 0.95 });
  }

  const flowerKeys = ['petalRed', 'petalYellow', 'petalWhite'];
  const flowerTarget = Math.round(160 * Math.max(0.3, density));
  attempts = 0;
  while (flowers.length < flowerTarget && attempts < flowerTarget * 12) {
    attempts += 1;
    const x = (random() - 0.5) * 190;
    const z = ISLAND_CENTRE_Z + (random() - 0.5) * 190;
    const ground = onGrass(x, z);
    if (ground === null) continue;
    flowers.push({
      position: new Vector3(x, ground, z),
      colorKey: flowerKeys[Math.floor(random() * flowerKeys.length)],
    });
  }

  return { rocks, flowers, grass };
}
