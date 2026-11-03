/**
 * The player character, built entirely from code — no external model files.
 *
 * Shapes are deliberately few and rounded: a low-polygon cartoon body in the
 * spirit of the reference, lit by a standard material so it still catches the
 * sun and casts a real shadow. Every limb hangs off a named pivot so the
 * animation code can pose it directly rather than playing baked clips.
 */

import {
  BoxGeometry,
  CapsuleGeometry,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  SphereGeometry,
  CylinderGeometry,
  type BufferGeometry,
  type Material,
} from 'three';

export interface CharacterRig {
  root: Group;
  /** Rotates and bobs with the gait; everything else hangs off it. */
  body: Group;
  torso: Group;
  head: Group;
  shoulderLeft: Group;
  shoulderRight: Group;
  elbowLeft: Group;
  elbowRight: Group;
  hipLeft: Group;
  hipRight: Group;
  kneeLeft: Group;
  kneeRight: Group;
  /** Where a carried object is parented. */
  carryAnchor: Object3D;
  materials: Material[];
}

const PALETTE = {
  shirt: '#d9353a',
  overalls: '#2f5fd0',
  skin: '#f3c29a',
  hair: '#4a2a18',
  glove: '#fbfbf7',
  shoe: '#6a3b1c',
  buckle: '#f2c94c',
  eye: '#2b2b33',
};

function standard(color: string, roughness = 0.72, metalness = 0): MeshStandardMaterial {
  return new MeshStandardMaterial({
    color: new Color(color),
    roughness,
    metalness,
    flatShading: false,
  });
}

function part(
  geometry: BufferGeometry,
  material: Material,
  position: [number, number, number] = [0, 0, 0],
): Mesh {
  const mesh = new Mesh(geometry, material);
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = false;
  return mesh;
}

/**
 * Builds the character facing +Z with its feet at y = 0, so the root's
 * y-rotation can be set directly from the character's facing angle.
 */
export function createCharacterRig(): CharacterRig {
  const materials: MeshStandardMaterial[] = [];
  const make = (color: string, roughness?: number, metalness?: number) => {
    const material = standard(color, roughness, metalness);
    materials.push(material);
    return material;
  };

  const shirtMaterial = make(PALETTE.shirt, 0.78);
  const overallMaterial = make(PALETTE.overalls, 0.74);
  const skinMaterial = make(PALETTE.skin, 0.68);
  const hairMaterial = make(PALETTE.hair, 0.8);
  const gloveMaterial = make(PALETTE.glove, 0.66);
  const shoeMaterial = make(PALETTE.shoe, 0.7);
  const buckleMaterial = make(PALETTE.buckle, 0.35, 0.55);
  const eyeMaterial = make(PALETTE.eye, 0.4);

  const root = new Group();
  const body = new Group();
  root.add(body);

  // ---- Torso ---------------------------------------------------------------
  const torso = new Group();
  torso.position.y = 0.92;
  body.add(torso);

  // Overalls bib and trousers read as one rounded mass.
  torso.add(part(new CapsuleGeometry(0.3, 0.26, 4, 12), overallMaterial, [0, -0.06, 0]));
  // Shirt across the chest and shoulders.
  torso.add(part(new CapsuleGeometry(0.295, 0.1, 4, 12), shirtMaterial, [0, 0.22, 0]));
  // Straps.
  for (const x of [-0.14, 0.14]) {
    torso.add(part(new BoxGeometry(0.075, 0.3, 0.055), overallMaterial, [x, 0.21, 0.225]));
    torso.add(part(new SphereGeometry(0.045, 8, 6), buckleMaterial, [x, 0.1, 0.258]));
  }

  // ---- Head ----------------------------------------------------------------
  const head = new Group();
  head.position.y = 0.42;
  torso.add(head);

  head.add(part(new SphereGeometry(0.265, 16, 14), skinMaterial, [0, 0.07, 0]));
  // Slight jaw so the profile is not a plain ball.
  head.add(part(new SphereGeometry(0.2, 12, 10), skinMaterial, [0, -0.04, 0.03]));

  // Cap: a dome with a brim.
  const capDome = part(new SphereGeometry(0.278, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.52), shirtMaterial, [0, 0.11, 0]);
  head.add(capDome);
  const brim = part(new CylinderGeometry(0.17, 0.2, 0.045, 14, 1, false, Math.PI * 0.75, Math.PI * 1.5), shirtMaterial, [0, 0.1, 0.17]);
  brim.rotation.x = -0.18;
  head.add(brim);
  // Cap badge.
  head.add(part(new SphereGeometry(0.075, 10, 8), gloveMaterial, [0, 0.16, 0.225]));

  // Sideburns keep the silhouette readable from behind.
  for (const x of [-0.22, 0.22]) {
    head.add(part(new SphereGeometry(0.07, 8, 7), hairMaterial, [x, -0.02, 0.02]));
  }
  head.add(part(new SphereGeometry(0.12, 10, 8), hairMaterial, [0, -0.02, -0.21]));

  // Face.
  head.add(part(new SphereGeometry(0.085, 12, 10), skinMaterial, [0, 0.0, 0.245]));
  for (const x of [-0.095, 0.095]) {
    const eye = part(new SphereGeometry(0.042, 10, 8), eyeMaterial, [x, 0.085, 0.215]);
    eye.scale.set(0.8, 1.25, 0.6);
    head.add(eye);
  }
  // Moustache, as two soft lobes under the nose.
  for (const x of [-0.085, 0.085]) {
    const lobe = part(new SphereGeometry(0.072, 10, 8), hairMaterial, [x, -0.07, 0.205]);
    lobe.scale.set(1.15, 0.62, 0.78);
    head.add(lobe);
  }

  // ---- Arms ----------------------------------------------------------------
  const buildArm = (side: -1 | 1) => {
    const shoulder = new Group();
    shoulder.position.set(0.3 * side, 0.235, 0);
    torso.add(shoulder);

    shoulder.add(part(new CapsuleGeometry(0.093, 0.17, 4, 10), shirtMaterial, [0, -0.13, 0]));

    const elbow = new Group();
    elbow.position.y = -0.255;
    shoulder.add(elbow);
    elbow.add(part(new CapsuleGeometry(0.085, 0.14, 4, 10), shirtMaterial, [0, -0.1, 0]));
    const glove = part(new SphereGeometry(0.125, 12, 10), gloveMaterial, [0, -0.23, 0]);
    glove.scale.set(1, 0.95, 1.05);
    elbow.add(glove);

    return { shoulder, elbow };
  };

  const left = buildArm(-1);
  const right = buildArm(1);

  // ---- Legs ----------------------------------------------------------------
  const buildLeg = (side: -1 | 1) => {
    const hip = new Group();
    hip.position.set(0.135 * side, -0.3, 0);
    torso.add(hip);
    hip.add(part(new CapsuleGeometry(0.115, 0.17, 4, 10), overallMaterial, [0, -0.13, 0]));

    const knee = new Group();
    knee.position.y = -0.26;
    hip.add(knee);
    knee.add(part(new CapsuleGeometry(0.1, 0.14, 4, 10), overallMaterial, [0, -0.1, 0]));

    const shoe = part(new SphereGeometry(0.15, 12, 10), shoeMaterial, [0, -0.225, 0.045]);
    shoe.scale.set(1.0, 0.62, 1.45);
    knee.add(shoe);

    return { hip, knee };
  };

  const legLeft = buildLeg(-1);
  const legRight = buildLeg(1);

  // Where carried objects attach: out in front, at chest height.
  const carryAnchor = new Object3D();
  carryAnchor.position.set(0, 0.07, 0.52);
  torso.add(carryAnchor);

  root.traverse((object) => {
    if (object instanceof Mesh) {
      object.castShadow = true;
      object.receiveShadow = false;
    }
  });

  return {
    root,
    body,
    torso,
    head,
    shoulderLeft: left.shoulder,
    shoulderRight: right.shoulder,
    elbowLeft: left.elbow,
    elbowRight: right.elbow,
    hipLeft: legLeft.hip,
    hipRight: legRight.hip,
    kneeLeft: legLeft.knee,
    kneeRight: legRight.knee,
    carryAnchor,
    materials,
  };
}

/** Total height of the rig in world units, used to size the collision capsule. */
export const CHARACTER_HEIGHT = 1.72;
export const CHARACTER_RADIUS = 0.34;
