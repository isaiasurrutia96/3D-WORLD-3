/**
 * The castle: a plinth, a main hall, four corner towers, a central keep, an
 * arched door with a round window above it, and the bridge that reaches it.
 *
 * Everything is built from primitives and merged by material, so the whole
 * building costs a handful of draw calls.
 */

import {
  BoxGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from 'three';
import { MeshBuilder } from './MeshBuilder.ts';

export const CASTLE_FRONT_Z = -4;
export const PLINTH_HEIGHT = 1.2;
export const DOOR_POSITION = new Vector3(0, PLINTH_HEIGHT, 1.4);
export const BRIDGE_MIN_Z = 10.5;
export const BRIDGE_MAX_Z = 28.5;
export const BRIDGE_HALF_WIDTH = 4.5;
export const BRIDGE_DECK_Y = 0.55;

const MAIN_HALF_X = 18;
const MAIN_HEIGHT = 13;
const MAIN_MIN_Z = -24;
const MAIN_MAX_Z = CASTLE_FRONT_Z;

const TOWER_RADIUS = 4.5;
const TOWER_HEIGHT = 19;
const KEEP_RADIUS = 8;
const KEEP_HEIGHT = 31;

function material(color: string, roughness = 0.85, metalness = 0): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: new Color(color), roughness, metalness });
}

export function createCastleMaterials(): Record<string, MeshStandardMaterial> {
  return {
    stone: material('#ded0b0', 0.92),
    stoneDark: material('#b7a584', 0.94),
    stoneTrim: material('#f0e6cc', 0.88),
    roof: material('#c3453c', 0.78),
    roofDark: material('#9c332d', 0.8),
    wood: material('#7a4a24', 0.86),
    gold: material('#e8b93c', 0.3, 0.72),
    glass: new MeshStandardMaterial({
      color: new Color('#5bc8e8'),
      roughness: 0.18,
      metalness: 0.1,
      emissive: new Color('#1c6b8a'),
      emissiveIntensity: 0.45,
    }),
    glassWarm: new MeshStandardMaterial({
      color: new Color('#f2c14e'),
      roughness: 0.2,
      metalness: 0.05,
      emissive: new Color('#8a5a12'),
      emissiveIntensity: 0.55,
    }),
    flagRed: material('#d8453f', 0.9),
    flagBlue: material('#3a66c8', 0.9),
  };
}

/** Battlements along a straight run, returned as placements for the builder. */
function addCrenellations(
  builder: MeshBuilder,
  from: [number, number],
  to: [number, number],
  y: number,
  spacing = 3.1,
): void {
  const [x0, z0] = from;
  const [x1, z1] = to;
  const length = Math.hypot(x1 - x0, z1 - z0);
  const count = Math.max(2, Math.round(length / spacing));
  const merlon = new BoxGeometry(1.5, 1.6, 1.5);

  for (let i = 0; i <= count; i += 1) {
    const t = i / count;
    builder.add('stoneTrim', merlon, {
      position: [x0 + (x1 - x0) * t, y + 0.8, z0 + (z1 - z0) * t],
    });
  }
}

function addTower(
  builder: MeshBuilder,
  x: number,
  z: number,
  radius: number,
  height: number,
  roofKey: string,
): void {
  builder.add('stone', new CylinderGeometry(radius, radius * 1.08, height, 16), {
    position: [x, height / 2 + PLINTH_HEIGHT, z],
  });

  // A banded course near the top, which stops the cylinder reading as a pipe.
  builder.add('stoneDark', new CylinderGeometry(radius * 1.06, radius * 1.06, 0.7, 16), {
    position: [x, height + PLINTH_HEIGHT - 1.4, z],
  });

  // Battlement ring under the roof.
  const merlonCount = Math.max(8, Math.round(radius * 3));
  const merlon = new BoxGeometry(1.2, 1.4, 0.9);
  for (let i = 0; i < merlonCount; i += 1) {
    const angle = (i / merlonCount) * Math.PI * 2;
    builder.add('stoneTrim', merlon, {
      position: [
        x + Math.cos(angle) * radius * 1.02,
        height + PLINTH_HEIGHT + 0.2,
        z + Math.sin(angle) * radius * 1.02,
      ],
      rotation: [0, -angle, 0],
    });
  }

  const roofHeight = radius * 2.1;
  builder.add(roofKey, new ConeGeometry(radius * 1.25, roofHeight, 16), {
    position: [x, height + PLINTH_HEIGHT + 1 + roofHeight / 2, z],
  });

  // Finial and flagpole.
  const topY = height + PLINTH_HEIGHT + 1 + roofHeight;
  builder.add('gold', new SphereGeometry(0.42, 10, 8), { position: [x, topY + 0.2, z] });
  builder.add('wood', new CylinderGeometry(0.1, 0.1, 3.4, 6), {
    position: [x, topY + 1.9, z],
  });
  builder.add(radius > 6 ? 'flagRed' : 'flagBlue', new BoxGeometry(2.1, 1.2, 0.08), {
    position: [x + 1.05, topY + 2.9, z],
  });

  // Windows up the shaft.
  for (let level = 0; level < Math.floor(height / 6); level += 1) {
    const windowY = PLINTH_HEIGHT + 4.5 + level * 6;
    for (const angle of [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5]) {
      builder.add('glassWarm', new BoxGeometry(0.9, 1.9, 0.3), {
        position: [
          x + Math.cos(angle) * (radius + 0.02),
          windowY,
          z + Math.sin(angle) * (radius + 0.02),
        ],
        rotation: [0, -angle, 0],
      });
    }
  }
}

export function createCastle(): { group: Group; solid: Object3D } {
  const group = new Group();
  group.name = 'castle';
  const builder = new MeshBuilder();
  const materials = createCastleMaterials();

  // ---- Plinth --------------------------------------------------------------
  builder.add('stoneDark', new BoxGeometry(46, PLINTH_HEIGHT, 28), {
    position: [0, PLINTH_HEIGHT / 2, -14],
  });
  builder.add('stone', new BoxGeometry(44.4, 0.3, 26.4), {
    position: [0, PLINTH_HEIGHT, -14],
  });

  // ---- Main hall -----------------------------------------------------------
  const mainDepth = MAIN_MAX_Z - MAIN_MIN_Z;
  const mainCentreZ = (MAIN_MAX_Z + MAIN_MIN_Z) / 2;
  builder.add('stone', new BoxGeometry(MAIN_HALF_X * 2, MAIN_HEIGHT, mainDepth), {
    position: [0, MAIN_HEIGHT / 2 + PLINTH_HEIGHT, mainCentreZ],
  });

  // String course dividing the two storeys.
  builder.add('stoneDark', new BoxGeometry(MAIN_HALF_X * 2 + 0.6, 0.6, mainDepth + 0.6), {
    position: [0, PLINTH_HEIGHT + 6.4, mainCentreZ],
  });

  // Battlements along the front and sides of the hall.
  const parapetY = MAIN_HEIGHT + PLINTH_HEIGHT;
  addCrenellations(builder, [-MAIN_HALF_X, MAIN_MAX_Z], [MAIN_HALF_X, MAIN_MAX_Z], parapetY);
  addCrenellations(builder, [-MAIN_HALF_X, MAIN_MIN_Z], [-MAIN_HALF_X, MAIN_MAX_Z], parapetY);
  addCrenellations(builder, [MAIN_HALF_X, MAIN_MIN_Z], [MAIN_HALF_X, MAIN_MAX_Z], parapetY);

  // ---- Entrance projection -------------------------------------------------
  builder.add('stone', new BoxGeometry(12, 10, 5), {
    position: [0, 5 + PLINTH_HEIGHT, MAIN_MAX_Z + 2.5],
  });
  addCrenellations(builder, [-6, MAIN_MAX_Z + 5], [6, MAIN_MAX_Z + 5], PLINTH_HEIGHT + 10, 2.6);

  // Arched doorway, cut as a recess of wood framed by stone.
  const doorZ = MAIN_MAX_Z + 5.05;
  builder.add('stoneTrim', new BoxGeometry(6.4, 7.2, 0.5), {
    position: [0, PLINTH_HEIGHT + 3.6, doorZ],
  });
  builder.add('stoneTrim', new CylinderGeometry(3.2, 3.2, 0.5, 18, 1, false, 0, Math.PI), {
    position: [0, PLINTH_HEIGHT + 7.2, doorZ],
    rotation: [Math.PI / 2, 0, 0],
  });
  builder.add('wood', new BoxGeometry(5.2, 6.6, 0.3), {
    position: [0, PLINTH_HEIGHT + 3.3, doorZ + 0.2],
  });
  builder.add('wood', new CylinderGeometry(2.6, 2.6, 0.3, 18, 1, false, 0, Math.PI), {
    position: [0, PLINTH_HEIGHT + 6.6, doorZ + 0.2],
    rotation: [Math.PI / 2, 0, 0],
  });
  // Door furniture.
  for (const x of [-1.5, 1.5]) {
    builder.add('gold', new TorusGeometry(0.42, 0.1, 6, 14), {
      position: [x, PLINTH_HEIGHT + 3.2, doorZ + 0.42],
    });
  }
  builder.add('wood', new BoxGeometry(5.2, 0.28, 0.42), {
    position: [0, PLINTH_HEIGHT + 5.1, doorZ + 0.3],
  });

  // ---- Round window above the door ----------------------------------------
  const windowY = PLINTH_HEIGHT + 12.4;
  builder.add('glass', new CylinderGeometry(2.5, 2.5, 0.3, 20), {
    position: [0, windowY, doorZ + 0.05],
    rotation: [Math.PI / 2, 0, 0],
  });
  builder.add('gold', new TorusGeometry(2.6, 0.22, 8, 24), {
    position: [0, windowY, doorZ + 0.12],
  });
  // Leading across the glass.
  for (let i = 0; i < 4; i += 1) {
    builder.add('gold', new BoxGeometry(5, 0.14, 0.14), {
      position: [0, windowY, doorZ + 0.18],
      rotation: [0, 0, (i / 4) * Math.PI],
    });
  }

  // ---- Steps up to the door ------------------------------------------------
  const stepCount = 4;
  for (let i = 0; i < stepCount; i += 1) {
    const height = PLINTH_HEIGHT * ((i + 1) / stepCount);
    const depth = 1.1;
    builder.add('stoneDark', new BoxGeometry(9 - i * 0.4, height, depth), {
      position: [0, height / 2, doorZ + 0.9 + (stepCount - 1 - i) * depth],
    });
  }

  // ---- Windows along the hall front ---------------------------------------
  for (const x of [-13.5, -9, 9, 13.5]) {
    for (const y of [PLINTH_HEIGHT + 3.4, PLINTH_HEIGHT + 9.4]) {
      builder.add('stoneTrim', new BoxGeometry(2.4, 3.4, 0.35), {
        position: [x, y, MAIN_MAX_Z + 0.02],
      });
      builder.add('glassWarm', new BoxGeometry(1.7, 2.7, 0.2), {
        position: [x, y, MAIN_MAX_Z + 0.2],
      });
    }
  }

  // ---- Towers --------------------------------------------------------------
  addTower(builder, -MAIN_HALF_X, MAIN_MAX_Z, TOWER_RADIUS, TOWER_HEIGHT, 'roof');
  addTower(builder, MAIN_HALF_X, MAIN_MAX_Z, TOWER_RADIUS, TOWER_HEIGHT, 'roof');
  addTower(builder, -MAIN_HALF_X, MAIN_MIN_Z, TOWER_RADIUS, TOWER_HEIGHT, 'roof');
  addTower(builder, MAIN_HALF_X, MAIN_MIN_Z, TOWER_RADIUS, TOWER_HEIGHT, 'roof');
  addTower(builder, 0, -17, KEEP_RADIUS, KEEP_HEIGHT, 'roofDark');

  builder.build(group, materials, { castShadow: true, receiveShadow: true });

  // ---- Bridge --------------------------------------------------------------
  const bridgeBuilder = new MeshBuilder();
  const deckLength = BRIDGE_MAX_Z - BRIDGE_MIN_Z;
  const deckCentre = (BRIDGE_MAX_Z + BRIDGE_MIN_Z) / 2;

  bridgeBuilder.add('wood', new BoxGeometry(BRIDGE_HALF_WIDTH * 2, 0.4, deckLength), {
    position: [0, BRIDGE_DECK_Y, deckCentre],
  });
  // Plank seams.
  const plankCount = Math.round(deckLength / 1.5);
  for (let i = 0; i < plankCount; i += 1) {
    bridgeBuilder.add('stoneDark', new BoxGeometry(BRIDGE_HALF_WIDTH * 2 + 0.05, 0.06, 0.1), {
      position: [0, BRIDGE_DECK_Y + 0.22, BRIDGE_MIN_Z + (i + 0.5) * (deckLength / plankCount)],
    });
  }

  // Posts and rails down both sides.
  const postCount = 7;
  for (let i = 0; i <= postCount; i += 1) {
    const z = BRIDGE_MIN_Z + (i / postCount) * deckLength;
    for (const x of [-BRIDGE_HALF_WIDTH + 0.25, BRIDGE_HALF_WIDTH - 0.25]) {
      bridgeBuilder.add('wood', new BoxGeometry(0.45, 1.5, 0.45), {
        position: [x, BRIDGE_DECK_Y + 0.95, z],
      });
      bridgeBuilder.add('gold', new SphereGeometry(0.26, 8, 6), {
        position: [x, BRIDGE_DECK_Y + 1.78, z],
      });
    }
  }
  for (const x of [-BRIDGE_HALF_WIDTH + 0.25, BRIDGE_HALF_WIDTH - 0.25]) {
    bridgeBuilder.add('wood', new BoxGeometry(0.3, 0.28, deckLength), {
      position: [x, BRIDGE_DECK_Y + 1.5, deckCentre],
    });
    bridgeBuilder.add('wood', new BoxGeometry(0.22, 0.2, deckLength), {
      position: [x, BRIDGE_DECK_Y + 0.85, deckCentre],
    });
  }

  // Stone abutments where the bridge meets each bank.
  for (const z of [BRIDGE_MIN_Z - 0.4, BRIDGE_MAX_Z + 0.4]) {
    bridgeBuilder.add('stoneDark', new BoxGeometry(BRIDGE_HALF_WIDTH * 2 + 1.6, 2.2, 2.4), {
      position: [0, BRIDGE_DECK_Y - 0.9, z],
    });
  }

  bridgeBuilder.build(group, materials, { castShadow: true, receiveShadow: true });

  // Everything in the castle group is solid.
  const solid = group;
  return { group, solid };
}

/** True if a point is on the bridge deck, used to keep props off it. */
export function isOnBridge(x: number, z: number): boolean {
  return Math.abs(x) <= BRIDGE_HALF_WIDTH + 1 && z >= BRIDGE_MIN_Z - 2 && z <= BRIDGE_MAX_Z + 2;
}

export type CastleMesh = Mesh;
