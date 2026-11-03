/**
 * Scenery that is not the castle: trees, rocks, grass, flowers, lamps, a
 * signpost, and the crates the player can pick up.
 */

import {
  BoxGeometry,
  BufferGeometry,
  Color,
  DoubleSide,
  ConeGeometry,
  CylinderGeometry,
  DodecahedronGeometry,
  Euler,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  Object3D,
  Quaternion,
  SphereGeometry,
  Vector3,
} from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { MeshBuilder } from './MeshBuilder.ts';

export interface TreePlacement {
  position: Vector3;
  trunkRadius: number;
  trunkHeight: number;
}

function material(color: string, roughness = 0.9, metalness = 0): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: new Color(color), roughness, metalness });
}

export function createPropMaterials(): Record<string, MeshStandardMaterial> {
  return {
    bark: material('#6b4a2c', 0.95),
    barkDark: material('#4e351f', 0.95),
    leaf: material('#3f8c35', 0.9),
    leafLight: material('#55a845', 0.9),
    rock: material('#8d8c88', 0.95),
    rockDark: material('#6d6c69', 0.95),
    wood: material('#8a5a2c', 0.88),
    woodDark: material('#5d3a18', 0.9),
    metal: material('#c9b075', 0.35, 0.65),
    lampGlass: new MeshStandardMaterial({
      color: new Color('#ffe9a8'),
      emissive: new Color('#ffc85a'),
      emissiveIntensity: 1.6,
      roughness: 0.3,
    }),
    petalRed: material('#e0504a', 0.85),
    petalYellow: material('#f2c94c', 0.85),
    petalWhite: material('#f7f3e8', 0.85),
  };
}

/**
 * Builds the trunks of every tree into one mesh and the foliage into another.
 * Trunks are solid and climbable; foliage is decoration the player passes
 * through, so reaching the top of a tree is possible.
 */
export function createTrees(placements: TreePlacement[]): {
  trunks: Group;
  foliage: Group;
} {
  const trunkBuilder = new MeshBuilder();
  const foliageBuilder = new MeshBuilder();
  const materials = createPropMaterials();

  placements.forEach((tree, index) => {
    const { position, trunkRadius, trunkHeight } = tree;

    trunkBuilder.add('bark', new CylinderGeometry(trunkRadius * 0.86, trunkRadius * 1.18, trunkHeight, 10), {
      position: [position.x, position.y + trunkHeight / 2, position.z],
    });
    // Root flare, so the trunk does not look pushed into the ground.
    trunkBuilder.add('barkDark', new ConeGeometry(trunkRadius * 1.75, 1.1, 10), {
      position: [position.x, position.y + 0.5, position.z],
    });

    // Canopy: overlapping lumps rather than one ball, with a little variation
    // driven by the index so no two trees are identical.
    const canopyBase = position.y + trunkHeight;
    const scale = 1 + ((index * 37) % 10) / 28;
    const blobs: Array<[number, number, number, number, string]> = [
      [0, 0.5, 0, 2.3, 'leaf'],
      [1.3, -0.2, 0.5, 1.6, 'leafLight'],
      [-1.2, 0.1, -0.6, 1.7, 'leaf'],
      [0.4, 1.4, -1.0, 1.5, 'leafLight'],
      [-0.6, 1.1, 1.1, 1.45, 'leaf'],
    ];
    for (const [dx, dy, dz, radius, key] of blobs) {
      foliageBuilder.add(key, new IcosahedronGeometry(radius * scale, 1), {
        position: [
          position.x + dx * scale,
          canopyBase + dy * scale,
          position.z + dz * scale,
        ],
      });
    }
  });

  const trunks = new Group();
  trunks.name = 'tree-trunks';
  trunkBuilder.build(trunks, materials, { castShadow: true, receiveShadow: true });

  const foliage = new Group();
  foliage.name = 'tree-foliage';
  foliageBuilder.build(foliage, materials, { castShadow: true, receiveShadow: false });

  return { trunks, foliage };
}

/** A crate the player can pick up and throw. */
export function createCrate(size = 0.78): Group {
  const builder = new MeshBuilder();
  const materials = createPropMaterials();

  builder.add('wood', new BoxGeometry(size * 2, size * 2, size * 2));
  // Corner battens.
  const batten = new BoxGeometry(size * 2.06, size * 0.26, size * 0.26);
  for (const y of [-size * 0.74, size * 0.74]) {
    for (const z of [-size, size]) {
      builder.add('woodDark', batten, { position: [0, y, z] });
    }
    for (const x of [-size, size]) {
      builder.add('woodDark', batten, { position: [x, y, 0], rotation: [0, Math.PI / 2, 0] });
    }
  }
  const upright = new BoxGeometry(size * 0.26, size * 2.06, size * 0.26);
  for (const x of [-size, size]) {
    for (const z of [-size, size]) {
      builder.add('woodDark', upright, { position: [x, 0, z] });
    }
  }

  const group = new Group();
  group.name = 'crate';
  builder.build(group, materials, { castShadow: true, receiveShadow: true });
  return group;
}

/** Scattered rocks and flowers, merged into one group of decoration. */
export function createGroundDetail(
  rocks: Array<{ position: Vector3; scale: number }>,
  flowers: Array<{ position: Vector3; colorKey: string }>,
): Group {
  const builder = new MeshBuilder();
  const materials = createPropMaterials();

  rocks.forEach((rock, index) => {
    builder.add(index % 3 === 0 ? 'rockDark' : 'rock', new DodecahedronGeometry(1, 0), {
      position: [rock.position.x, rock.position.y + rock.scale * 0.35, rock.position.z],
      rotation: [index * 0.7, index * 1.3, index * 0.4],
      scale: [rock.scale, rock.scale * 0.72, rock.scale * 0.9],
    });
  });

  flowers.forEach((flower, index) => {
    const { position } = flower;
    builder.add('leaf', new CylinderGeometry(0.03, 0.04, 0.42, 5), {
      position: [position.x, position.y + 0.21, position.z],
    });
    for (let petal = 0; petal < 5; petal += 1) {
      const angle = (petal / 5) * Math.PI * 2 + index;
      builder.add(flower.colorKey, new SphereGeometry(0.085, 6, 5), {
        position: [
          position.x + Math.cos(angle) * 0.1,
          position.y + 0.45,
          position.z + Math.sin(angle) * 0.1,
        ],
        scale: [1, 0.55, 1],
      });
    }
    builder.add('petalYellow', new SphereGeometry(0.06, 6, 5), {
      position: [position.x, position.y + 0.47, position.z],
    });
  });

  const group = new Group();
  group.name = 'ground-detail';
  builder.build(group, materials, { castShadow: false, receiveShadow: true });
  return group;
}

/**
 * Grass tufts as a single instanced mesh. Purely decorative — the player walks
 * straight through them — so they are never added to the collision world.
 */
export function createGrass(
  placements: Array<{ position: Vector3; scale: number; rotation: number; tint: number }>,
): InstancedMesh {
  // One tuft is three tapered blades arranged in a fan, merged into a single
  // geometry so the whole field can be drawn as one instanced mesh.
  const blades: BufferGeometry[] = [];
  const transform = new Matrix4();
  const euler = new Euler();
  const bladeQuaternion = new Quaternion();
  const bladePosition = new Vector3();
  const bladeScale = new Vector3(1, 1, 1);

  for (let i = 0; i < 3; i += 1) {
    const angle = (i / 3) * Math.PI * 2;
    // Open-ended, so each blade is three triangles and nothing more.
    const blade = new ConeGeometry(0.038, 0.34, 3, 1, true);
    // Splayed outward, so a tuft reads as blades rather than a spike.
    euler.set(Math.cos(angle) * 0.46, angle, Math.sin(angle) * 0.46, 'XYZ');
    bladeQuaternion.setFromEuler(euler);
    bladePosition.set(Math.cos(angle) * 0.035, 0.17, Math.sin(angle) * 0.035);
    transform.compose(bladePosition, bladeQuaternion, bladeScale);
    blade.applyMatrix4(transform);
    blades.push(blade);
  }

  const tuft = mergeGeometries(blades, false);
  if (!tuft) throw new Error('Failed to merge grass tuft geometry');
  tuft.computeVertexNormals();

  const grassMaterial = material('#5aa24a', 0.95);
  grassMaterial.side = DoubleSide;
  const mesh = new InstancedMesh(tuft, grassMaterial, placements.length);
  mesh.name = 'grass';
  mesh.castShadow = false;
  mesh.receiveShadow = false;

  const matrix = new Matrix4();
  const position = new Vector3();
  const quaternion = new Quaternion();
  const scale = new Vector3();
  const colour = new Color();
  const axis = new Vector3(0, 1, 0);

  placements.forEach((placement, index) => {
    position.copy(placement.position);
    quaternion.setFromAxisAngle(axis, placement.rotation);
    scale.set(placement.scale, placement.scale * (0.8 + placement.tint * 0.5), placement.scale);
    matrix.compose(position, quaternion, scale);
    mesh.setMatrixAt(index, matrix);
    colour.setHSL(0.255 + placement.tint * 0.04, 0.5, 0.42 + placement.tint * 0.16);
    mesh.setColorAt(index, colour);
  });

  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  return mesh;
}

/** A signpost pointing the way, used to orient the player at the spawn. */
export function createSignpost(): Object3D {
  const builder = new MeshBuilder();
  const materials = createPropMaterials();

  builder.add('woodDark', new CylinderGeometry(0.075, 0.09, 1.7, 8), { position: [0, 0.85, 0] });
  builder.add('wood', new BoxGeometry(1.35, 0.32, 0.08), {
    position: [0.42, 1.4, 0],
    rotation: [0, 0, -0.04],
  });
  builder.add('wood', new BoxGeometry(1.05, 0.27, 0.08), {
    position: [-0.3, 0.98, 0],
    rotation: [0, 0, 0.05],
  });
  builder.add('metal', new SphereGeometry(0.1, 8, 6), { position: [0, 1.76, 0] });

  const group = new Group();
  group.name = 'signpost';
  builder.build(group, materials, { castShadow: true, receiveShadow: true });
  return group;
}

/** A lamp post; the glass is emissive so it reads at dusk and under bloom. */
export function createLampPost(): Object3D {
  const builder = new MeshBuilder();
  const materials = createPropMaterials();

  builder.add('metal', new CylinderGeometry(0.1, 0.16, 3.4, 8), { position: [0, 1.7, 0] });
  builder.add('metal', new BoxGeometry(0.42, 0.14, 0.42), { position: [0, 3.42, 0] });
  builder.add('lampGlass', new SphereGeometry(0.3, 10, 8), { position: [0, 3.72, 0] });
  builder.add('metal', new ConeGeometry(0.42, 0.42, 8), { position: [0, 4.06, 0] });

  const group = new Group();
  group.name = 'lamp-post';
  builder.build(group, materials, { castShadow: true, receiveShadow: true });
  return group;
}
