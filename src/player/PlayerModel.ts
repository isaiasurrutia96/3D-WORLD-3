/**
 * The player character, built entirely from code — no external model files.
 *
 * Shapes are deliberately few and rounded: a low-polygon cartoon body in the
 * spirit of the reference, lit by a standard material so it still catches the
 * sun and casts a real shadow. Every limb hangs off a named pivot so the
 * animation code can pose it directly rather than playing baked clips.
 */

import {
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  SphereGeometry,
  CylinderGeometry,
  LatheGeometry,
  Vector2,
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
  clay: '#b9b2a6',
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
 * A limb segment: a tube that tapers from one radius to the other, with
 * rounded ends. Built as a surface of revolution rather than as a capsule,
 * because a capsule cannot taper, and uniform tubes are what made the arms
 * and legs read as sausages.
 */
function taperedLimb(topRadius: number, bottomRadius: number, length: number): LatheGeometry {
  const points: Vector2[] = [];
  const half = length / 2;
  const steps = 5;

  // Rounded bottom cap.
  for (let i = 0; i <= steps; i += 1) {
    const angle = (Math.PI / 2) * (i / steps);
    points.push(new Vector2(Math.sin(angle) * bottomRadius, -half - Math.cos(angle) * bottomRadius));
  }
  // Straight taper up the shaft.
  points.push(new Vector2(topRadius, half));
  // Rounded top cap.
  for (let i = 1; i <= steps; i += 1) {
    const angle = (Math.PI / 2) * (i / steps);
    points.push(new Vector2(Math.cos(angle) * topRadius, half + Math.sin(angle) * topRadius));
  }

  return new LatheGeometry(points, 14);
}

/**
 * The torso, as a profile spun around its own axis.
 *
 * The profile is the whole point: hips, a round belly, a waist, a broad
 * chest and shoulders that taper into the neck. A capsule gave none of that
 * and the result was a tube in a shirt.
 *
 * Proportions sit between Mario's stocky build and Luigi's taller, leaner
 * one — roughly four and a quarter heads tall, with a belly that is present
 * but not dominant.
 */
const TORSO_PROFILE: Array<[number, number]> = [
  [0.0, -0.2],
  [0.108, -0.195],
  [0.186, -0.168],
  [0.238, -0.108],
  [0.26, -0.03],
  [0.268, 0.056], // belly: present, but no longer the widest point
  [0.264, 0.136],
  [0.256, 0.192], // waist
  [0.272, 0.248],
  [0.286, 0.3], // chest, the widest point
  [0.29, 0.345], // the shoulder shelf the arms hang from
  [0.272, 0.388],
  [0.206, 0.424], // shoulders turning in toward the neck
  [0.124, 0.448],
  [0.0, 0.46],
];

/**
 * How much narrower the upper body is than the profile above describes.
 *
 * It is applied to the radii only, never to the heights, so the shoulder
 * line, the base of the neck and the head all stay exactly where they were.
 * The arms and the buckles move in by the same amount so they stay on the
 * surface rather than hovering off it. Narrowing the whole profile by one
 * figure keeps the shape — belly, waist, chest — and only takes the bulk
 * out.
 */
const UPPER_BODY_SCALE = 0.93;

function torsoProfile(): LatheGeometry {
  return new LatheGeometry(
    TORSO_PROFILE.map(([radius, height]) => new Vector2(radius * UPPER_BODY_SCALE, height)),
    20,
  );
}

/**
 * The trousers, as the lower part of the same profile pushed out very
 * slightly. Following the body's own shape is the only way the waistline
 * lands where it should; a sphere left the hips showing through underneath.
 */
function trouserProfile(waistHeight: number): LatheGeometry {
  const points: Vector2[] = [];
  for (const [radius, height] of TORSO_PROFILE) {
    if (height > waistHeight) break;
    points.push(new Vector2(radius * UPPER_BODY_SCALE * 1.035, height));
  }
  // Close the top of the shape off at the waist.
  const last = points[points.length - 1];
  points.push(new Vector2(last.x * 0.97, waistHeight));
  points.push(new Vector2(0, waistHeight));
  return new LatheGeometry(points, 20);
}

/**
 * Builds the character facing +Z with its feet at y = 0, so the root's
 * y-rotation can be set directly from the character's facing angle.
 *
 * Heights are laid out deliberately rather than by eye. Reading upward from
 * the feet:
 *
 *   0.00  soles        0.50  knees        0.92  hips
 *   1.27  shoulders    1.38  base of neck 1.61  centre of head
 *   1.83  crown
 *
 * The torso used to hang down to 0.50, which left barely a third of the
 * figure's height as visible leg and read as a bowling pin. Its lower edge
 * now sits at 0.68 and the hips are higher, so the proportions are closer to
 * four and a quarter heads with legs that look like legs.
 */
export interface RigOptions {
  /**
   * One neutral material, no clothing and no face. Everything is reduced to
   * its form, which is the only way to judge proportion and silhouette
   * without colour doing the work.
   */
  plain?: boolean;
}

export function createCharacterRig(options: RigOptions = {}): CharacterRig {
  const materials: MeshStandardMaterial[] = [];
  const make = (color: string, roughness?: number, metalness?: number) => {
    const material = standard(color, roughness, metalness);
    materials.push(material);
    return material;
  };

  const plain = options.plain === true;
  const clay = plain ? make(PALETTE.clay, 0.78) : null;

  const shirtMaterial = clay ?? make(PALETTE.shirt, 0.78);
  const overallMaterial = clay ?? make(PALETTE.overalls, 0.74);
  const skinMaterial = clay ?? make(PALETTE.skin, 0.68);
  const gloveMaterial = clay ?? make(PALETTE.glove, 0.66);
  const shoeMaterial = clay ?? make(PALETTE.shoe, 0.7);
  const buckleMaterial = clay ?? make(PALETTE.buckle, 0.35, 0.55);

  const root = new Group();
  // The body group sits on the hip line, so rotating it turns the figure
  // about its middle rather than about its feet.
  const body = new Group();
  body.position.y = HIP_HEIGHT;
  root.add(body);

  // Leg offsets are measured from the hip line, so the torso sits at the
  // body group's own origin.
  const torso = new Group();
  body.add(torso);

  // ---- Torso ---------------------------------------------------------------
  // One continuous shape. The outfit will be painted onto this later, which
  // is why it is a single surface rather than a shirt stacked on trousers.
  torso.add(part(torsoProfile(), shirtMaterial));

  if (!plain) {
    // Until the outfit is painted, the trousers are a second shape over the
    // lower torso so the silhouette can still be judged in two colours.
    torso.add(part(trouserProfile(0.16), overallMaterial));

    for (const x of [-0.125, 0.125]) {
      torso.add(
        part(new SphereGeometry(0.05, 10, 8), buckleMaterial, [
          x * UPPER_BODY_SCALE,
          0.21,
          0.27 * UPPER_BODY_SCALE,
        ]),
      );
    }
  }

  // ---- Neck ----------------------------------------------------------------
  torso.add(part(taperedLimb(0.094, 0.118, 0.15), skinMaterial, [0, 0.5, 0.004]));

  // ---- Head ----------------------------------------------------------------
  const head = new Group();
  head.position.set(0, 0.685, 0);
  torso.add(head);

  head.add(part(new SphereGeometry(0.22, 20, 18), skinMaterial));

  if (!plain) {
    // Cap: a dome with a brim.
    head.add(
      part(
        new SphereGeometry(0.228, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.52),
        shirtMaterial,
        [0, 0.07, 0],
      ),
    );
    const brim = part(
      new CylinderGeometry(0.14, 0.168, 0.04, 14, 1, false, Math.PI * 0.75, Math.PI * 1.5),
      shirtMaterial,
      [0, 0.068, 0.152],
    );
    brim.rotation.x = -0.16;
    head.add(brim);

    // The nose: without it the head is a ball and the facing is unreadable.
    head.add(part(new SphereGeometry(0.068, 12, 10), skinMaterial, [0, -0.045, 0.2]));
  }

  // ---- Arms ----------------------------------------------------------------
  const buildArm = (side: -1 | 1) => {
    const shoulder = new Group();
    shoulder.position.set(0.282 * UPPER_BODY_SCALE * side, 0.345, 0);
    torso.add(shoulder);

    shoulder.add(part(taperedLimb(0.1, 0.11, 0.14), shirtMaterial, [0, -0.16, 0]));

    const elbow = new Group();
    elbow.position.y = -0.32;
    shoulder.add(elbow);
    elbow.add(part(taperedLimb(0.096, 0.104, 0.17), shirtMaterial, [0, -0.17, 0]));

    // Big round gloves: one of the most recognisable things about him.
    const glove = part(new SphereGeometry(0.142, 14, 12), gloveMaterial, [0, -0.34, 0]);
    // Flattened front to back, so it reads as a hand rather than a ball.
    glove.scale.set(1.08, 1.0, 0.82);
    elbow.add(glove);

    return { shoulder, elbow };
  };

  const left = buildArm(-1);
  const right = buildArm(1);

  // ---- Legs ----------------------------------------------------------------
  const buildLeg = (side: -1 | 1) => {
    const hip = new Group();
    hip.position.set(0.158 * side, -0.02, 0);
    torso.add(hip);
    hip.add(part(taperedLimb(0.128, 0.148, 0.2), overallMaterial, [0, -0.2, 0]));

    const knee = new Group();
    knee.position.y = -0.42;
    hip.add(knee);
    knee.add(part(taperedLimb(0.115, 0.128, 0.18), overallMaterial, [0, -0.17, 0]));

    const ankle = new Group();
    ankle.position.y = -0.38;
    knee.add(ankle);

    // Big shoes, for the same reason as the gloves.
    // Narrowed across their width and set on wider hips, so the two shoes
    // stand with a visible gap between them rather than meeting at the
    // centre line, which made them look like one block.
    const shoe = part(new SphereGeometry(0.172, 14, 12), shoeMaterial, [0, 0.014, 0.05]);
    shoe.scale.set(0.82, 0.58, 1.44);
    ankle.add(shoe);

    return { hip, knee, ankle };
  };

  const legLeft = buildLeg(-1);
  const legRight = buildLeg(1);

  // Where carried objects attach: out in front, at chest height.
  const carryAnchor = new Object3D();
  carryAnchor.position.set(0, 0.24, 0.52);
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

/**
 * Height of the hip line, and the point the whole figure rotates about.
 *
 * The body group used to sit at the character's feet, so a somersault swung
 * the head a full body-length below the ground. Putting the group on the hip
 * line means the figure turns about its own middle, the way a person does.
 */
export const HIP_HEIGHT = 0.92;
export const CHARACTER_RADIUS = 0.34;
