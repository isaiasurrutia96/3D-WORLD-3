/**
 * Collision, water volumes and climbable surfaces.
 *
 * Solid geometry is baked into an octree of triangles once the world is built,
 * which keeps capsule queries cheap enough to run several times per frame for
 * sub-stepped movement. Water and climbing are handled as explicit volumes
 * rather than as geometry, because the character needs to know it is *in* them
 * rather than merely touching them.
 */

import { Box3, Line3, Object3D, Ray, Vector3 } from 'three';
import { Capsule } from 'three/addons/math/Capsule.js';
import { Octree } from 'three/addons/math/Octree.js';

export interface CapsuleHit {
  normal: Vector3;
  depth: number;
}

export interface WaterVolume {
  /** Horizontal extent and floor of the water. */
  bounds: Box3;
  /** World height of the water surface. */
  surfaceY: number;
  /**
   * Optional extra test for water that is not a simple box — a moat is a ring,
   * so the box around it also covers the dry island in the middle.
   */
  test?: (x: number, z: number) => boolean;
}

/** A round post, such as a tree trunk: the character circles it as they climb. */
export interface PostClimbSurface {
  kind: 'post';
  /** Centre of the post in world space, at its base. */
  base: Vector3;
  radius: number;
  height: number;
  /** How far outside the radius the character can still grab on. */
  grabMargin: number;
}

/** A flat ladder on a wall: the character faces it and moves up, down and across. */
export interface LadderClimbSurface {
  kind: 'ladder';
  /** Centre of the ladder's foot, on the face of the wall. */
  base: Vector3;
  /** Horizontal unit vector pointing out of the wall, toward the climber. */
  normal: Vector3;
  /** Horizontal unit vector across the ladder, normal rotated a quarter turn. */
  right: Vector3;
  halfWidth: number;
  height: number;
  /** How far out from the wall the character can still grab on. */
  grabMargin: number;
}

export type ClimbSurface = PostClimbSurface | LadderClimbSurface;

export class CollisionWorld {
  readonly octree = new Octree();
  readonly waters: WaterVolume[] = [];
  readonly climbables: ClimbSurface[] = [];

  private readonly scratchRay = new Ray();
  private readonly scratchVector = new Vector3();

  /** Bakes every mesh under `root` into the collision octree. */
  addSolid(root: Object3D): void {
    this.octree.fromGraphNode(root);
  }

  addWater(bounds: Box3, surfaceY: number, test?: (x: number, z: number) => boolean): void {
    this.waters.push({ bounds, surfaceY, test });
  }

  addClimbablePost(base: Vector3, radius: number, height: number, grabMargin = 0.55): void {
    this.climbables.push({ kind: 'post', base: base.clone(), radius, height, grabMargin });
  }

  /**
   * Registers a ladder. `normal` points out of the wall the ladder is fixed
   * to, so the character grabs it from that side and climbs facing the wall.
   */
  addClimbableLadder(
    base: Vector3,
    normal: Vector3,
    halfWidth: number,
    height: number,
    grabMargin = 0.9,
  ): void {
    const outward = normal.clone().setY(0).normalize();
    this.climbables.push({
      kind: 'ladder',
      base: base.clone(),
      normal: outward,
      right: new Vector3(-outward.z, 0, outward.x),
      halfWidth,
      height,
      grabMargin,
    });
  }

  /** Resolves a capsule against world geometry, or returns null if it is clear. */
  capsuleIntersect(capsule: Capsule): CapsuleHit | null {
    const result = this.octree.capsuleIntersect(capsule);
    if (!result) return null;
    return { normal: result.normal, depth: result.depth };
  }

  /**
   * Distance from `origin` along `direction` to the first surface, or
   * `maxDistance` if nothing was hit. Used for camera pull-in and for the
   * shadow-blob projection under the character.
   */
  raycast(origin: Vector3, direction: Vector3, maxDistance: number): number {
    this.scratchRay.set(origin, direction);
    const hit = this.octree.rayIntersect(this.scratchRay);
    if (!hit || hit.distance > maxDistance) return maxDistance;
    return hit.distance;
  }

  /** The water the given point is inside, if any. */
  waterAt(point: Vector3): WaterVolume | null {
    for (const water of this.waters) {
      if (
        point.x >= water.bounds.min.x &&
        point.x <= water.bounds.max.x &&
        point.z >= water.bounds.min.z &&
        point.z <= water.bounds.max.z &&
        point.y >= water.bounds.min.y &&
        point.y <= water.surfaceY &&
        (!water.test || water.test(point.x, point.z))
      ) {
        return water;
      }
    }
    return null;
  }

  /**
   * The climbable surface the character can grab from `point`, if any.
   * Returns the nearest candidate so dense clusters behave sensibly.
   */
  climbableAt(point: Vector3, characterHeight: number): ClimbSurface | null {
    let best: ClimbSurface | null = null;
    let bestDistance = Infinity;

    for (const climbable of this.climbables) {
      const top = climbable.base.y + climbable.height;
      // The feet may be below the surface's base while the hands are on it,
      // so the vertical test uses the character's midpoint with some slack.
      if (point.y + characterHeight < climbable.base.y) continue;
      if (point.y > top) continue;

      let distance: number;

      if (climbable.kind === 'post') {
        const dx = point.x - climbable.base.x;
        const dz = point.z - climbable.base.z;
        distance = Math.hypot(dx, dz);
        if (distance > climbable.radius + climbable.grabMargin) continue;
      } else {
        // A ladder is only grabbable from in front of its wall, and only
        // within its width.
        const offsetX = point.x - climbable.base.x;
        const offsetZ = point.z - climbable.base.z;
        const outward = offsetX * climbable.normal.x + offsetZ * climbable.normal.z;
        if (outward < -0.25 || outward > climbable.grabMargin) continue;

        const lateral = offsetX * climbable.right.x + offsetZ * climbable.right.z;
        if (Math.abs(lateral) > climbable.halfWidth + 0.35) continue;

        distance = Math.hypot(outward, lateral);
      }

      if (distance < bestDistance) {
        bestDistance = distance;
        best = climbable;
      }
    }
    return best;
  }

  /**
   * Height of the ground directly below `point`, or -Infinity if the ray
   * escapes. Used for the soft shadow blob and for respawn safety checks.
   */
  groundHeightBelow(point: Vector3, maxDrop = 200): number {
    this.scratchVector.set(0, -1, 0);
    this.scratchRay.set(point, this.scratchVector);
    const hit = this.octree.rayIntersect(this.scratchRay);
    if (!hit || hit.distance > maxDrop) return -Infinity;
    return point.y - hit.distance;
  }

  reset(): void {
    this.waters.length = 0;
    this.climbables.length = 0;
  }
}

/** Convenience: a vertical capsule of the given height and radius at a position. */
export function makeCapsule(position: Vector3, height: number, radius: number): Capsule {
  const start = position.clone();
  start.y += radius;
  const end = position.clone();
  end.y += height - radius;
  return new Capsule(start, end, radius);
}

export { Capsule, Line3 };
