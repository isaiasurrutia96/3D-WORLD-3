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
  /** Lets the foot roll through a stride instead of staying welded to the shin. */
  ankleLeft: Group;
  ankleRight: Group;
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
 *
 * Heights are laid out deliberately rather than by eye, because the head used
 * to sit inside the shirt. Reading upward from the feet:
 *
 *   0.00  soles          0.72  hip joints      1.10  shoulder joints
 *   1.24  top of chest   1.21  base of neck    1.50  centre of head
 *   1.82  top of the cap
 *
 * The chest ends below the head, and the neck bridges the gap, so no pose can
 * drive the jaw into the collar.
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

  // The torso's origin sits on the hip line, so leg offsets are read directly.
  const torso = new Group();
  torso.position.y = 0.72;
  body.add(torso);

  // ---- Torso ---------------------------------------------------------------
  // Trousers: wide and low. Local 0 is the hip line.
  torso.add(part(new CapsuleGeometry(0.29, 0.1, 4, 12), overallMaterial, [0, 0, 0]));
  // Chest: narrower, reaching up to 1.24 in world terms and no further.
  torso.add(part(new CapsuleGeometry(0.285, 0.14, 4, 12), shirtMaterial, [0, 0.16, 0]));
  // Bib across the front. A flat box read as a board strapped to the chest,
  // so it is a flattened sphere instead: it bulges out at the centre and
  // tapers back into the body at the edges, the way cloth over a chest does.
  const bib = part(new SphereGeometry(1, 16, 12), overallMaterial, [0, 0.18, 0.145]);
  bib.scale.set(0.2, 0.25, 0.185);
  torso.add(bib);
  // Straps run from the top of the bib, back and up over the shoulders. They
  // have to lean steeply, because the shoulder sits well behind the chest;
  // standing them upright left two blue posts floating in front of the body.
  for (const x of [-0.13, 0.13]) {
    const strap = part(new BoxGeometry(0.085, 0.235, 0.08), overallMaterial, [x, 0.45, 0.15]);
    strap.rotation.x = -1.02;
    torso.add(strap);

    // A shorter piece continuing down the back, so the strap does not simply
    // stop at the top of the shoulder.
    const back = part(new BoxGeometry(0.085, 0.2, 0.075), overallMaterial, [x, 0.4, -0.14]);
    back.rotation.x = 0.55;
    torso.add(back);

    torso.add(part(new SphereGeometry(0.046, 8, 6), buckleMaterial, [x, 0.345, 0.312]));
  }

  // ---- Neck ----------------------------------------------------------------
  torso.add(part(new CylinderGeometry(0.105, 0.125, 0.2, 10), skinMaterial, [0, 0.58, 0.01]));

  // ---- Head ----------------------------------------------------------------
  // The head group's origin is the centre of the head.
  const head = new Group();
  head.position.set(0, 0.78, 0);
  torso.add(head);

  head.add(part(new SphereGeometry(0.245, 16, 14), skinMaterial));

  // Cap: a dome with a brim, sitting above the eyes rather than over them.
  head.add(
    part(
      new SphereGeometry(0.253, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.52),
      shirtMaterial,
      [0, 0.085, 0],
    ),
  );
  const brim = part(
    new CylinderGeometry(0.16, 0.19, 0.045, 14, 1, false, Math.PI * 0.75, Math.PI * 1.5),
    shirtMaterial,
    [0, 0.082, 0.172],
  );
  brim.rotation.x = -0.16;
  head.add(brim);
  head.add(part(new SphereGeometry(0.05, 10, 8), gloveMaterial, [0, 0.145, 0.197]));

  // Hair at the back and sides, kept below the eyeline.
  head.add(part(new SphereGeometry(0.1, 10, 8), hairMaterial, [0, -0.07, -0.2]));
  for (const x of [-0.2, 0.2]) {
    const sideburn = part(new SphereGeometry(0.04, 8, 7), hairMaterial, [x, -0.115, 0.04]);
    sideburn.scale.set(0.8, 1.2, 1);
    head.add(sideburn);
  }

  // Face.
  // The face sits in the band of skin between the cap brim and the jaw.
  // Everything here is measured from that band rather than from the centre of
  // the head, because the cap is what decides how much face there is.
  head.add(part(new SphereGeometry(0.076, 12, 10), skinMaterial, [0, -0.05, 0.228]));

  for (const x of [-0.08, 0.08]) {
    const eye = part(new SphereGeometry(0.036, 10, 8), eyeMaterial, [x, 0.0, 0.212]);
    eye.scale.set(0.82, 1.35, 0.6);
    head.add(eye);
  }

  // Moustache: wide, and clearly below the nose.
  for (const x of [-0.076, 0.076]) {
    const lobe = part(new SphereGeometry(0.057, 10, 8), hairMaterial, [x, -0.12, 0.186]);
    lobe.scale.set(1.2, 0.52, 0.78);
    head.add(lobe);
  }

  // ---- Arms ----------------------------------------------------------------
  const buildArm = (side: -1 | 1) => {
    const shoulder = new Group();
    shoulder.position.set(0.275 * side, 0.38, 0);
    torso.add(shoulder);

    shoulder.add(part(new CapsuleGeometry(0.095, 0.18, 4, 10), shirtMaterial, [0, -0.14, 0]));

    const elbow = new Group();
    elbow.position.y = -0.29;
    shoulder.add(elbow);
    elbow.add(part(new CapsuleGeometry(0.087, 0.17, 4, 10), shirtMaterial, [0, -0.12, 0]));
    const glove = part(new SphereGeometry(0.128, 12, 10), gloveMaterial, [0, -0.28, 0]);
    glove.scale.set(1, 0.95, 1.05);
    elbow.add(glove);

    return { shoulder, elbow };
  };

  const left = buildArm(-1);
  const right = buildArm(1);

  // ---- Legs ----------------------------------------------------------------
  const buildLeg = (side: -1 | 1) => {
    const hip = new Group();
    hip.position.set(0.135 * side, 0, 0);
    torso.add(hip);
    hip.add(part(new CapsuleGeometry(0.118, 0.2, 4, 10), overallMaterial, [0, -0.16, 0]));

    const knee = new Group();
    knee.position.y = -0.32;
    hip.add(knee);
    knee.add(part(new CapsuleGeometry(0.102, 0.17, 4, 10), overallMaterial, [0, -0.12, 0]));

    const ankle = new Group();
    ankle.position.y = -0.28;
    knee.add(ankle);

    const shoe = part(new SphereGeometry(0.155, 12, 10), shoeMaterial, [0, 0, 0.05]);
    shoe.scale.set(1.0, 0.62, 1.45);
    ankle.add(shoe);

    return { hip, knee, ankle };
  };

  const legLeft = buildLeg(-1);
  const legRight = buildLeg(1);

  // Where carried objects attach: out in front, at chest height.
  const carryAnchor = new Object3D();
  carryAnchor.position.set(0, 0.26, 0.56);
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
    ankleLeft: legLeft.ankle,
    ankleRight: legRight.ankle,
    carryAnchor,
    materials,
  };
}

/** Total height of the rig in world units, used to size the collision capsule. */
export const CHARACTER_HEIGHT = 1.82;
export const CHARACTER_RADIUS = 0.34;
