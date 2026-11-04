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

export class CollisionWorld {
  readonly octree = new Octree();
  readonly waters: WaterVolume[] = [];

  private readonly scratchRay = new Ray();
  private readonly scratchVector = new Vector3();

  /** Bakes every mesh under `root` into the collision octree. */
  addSolid(root: Object3D): void {
    this.octree.fromGraphNode(root);
  }

  addWater(bounds: Box3, surfaceY: number, test?: (x: number, z: number) => boolean): void {
    this.waters.push({ bounds, surfaceY, test });
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
   * Ground height and surface normal directly below `point`, or null.
   *
   * A downward ray is a far more dependable way to find the floor than the
   * contact normal of an overlapping capsule: a capsule resting across the
   * seam between two triangles of a flat surface can report a sideways
   * normal, which is right for a wall and badly wrong for a floor.
   */
  groundProbe(point: Vector3, maxDrop: number): { y: number; normal: Vector3 } | null {
    this.scratchVector.set(0, -1, 0);
    this.scratchRay.set(point, this.scratchVector);
    const hit = this.octree.rayIntersect(this.scratchRay);
    if (!hit || hit.distance > maxDrop) return null;

    const normal = hit.triangle.getNormal(new Vector3());
    // Triangles may be wound either way; the ground always faces upward.
    if (normal.y < 0) normal.negate();
    return { y: point.y - hit.distance, normal };
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
