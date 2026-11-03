/**
 * An object the player can pick up, carry and throw.
 *
 * It runs its own small physics step when loose: gravity, a ground check
 * against the collision octree, a little bounce, and floating if it lands in
 * water. That is enough for a crate to behave believably without a rigid-body
 * engine.
 */

import { Object3D, Vector3 } from 'three';
import type { CollisionWorld } from '../physics/CollisionWorld.ts';

const GRAVITY = 26;
const BOUNCE = 0.28;
const GROUND_FRICTION = 7.5;
const AIR_DRAG = 0.25;
const WATER_DRAG = 3.4;
const WATER_BUOYANCY = 22;

export class Carryable {
  readonly object3d: Object3D;
  readonly velocity = new Vector3();
  readonly radius: number;

  /** True while the player is holding it; physics is suspended. */
  held = false;
  /** Cleared a moment after a throw so it cannot be instantly re-grabbed. */
  pickupCooldown = 0;

  private resting = false;
  private readonly spawnPosition = new Vector3();
  private spin = 0;

  constructor(object3d: Object3D, radius: number) {
    this.object3d = object3d;
    this.radius = radius;
    this.spawnPosition.copy(object3d.position);
  }

  get position(): Vector3 {
    return this.object3d.position;
  }

  update(delta: number, world: CollisionWorld): void {
    if (this.pickupCooldown > 0) this.pickupCooldown -= delta;
    if (this.held) {
      this.resting = false;
      return;
    }

    const water = world.waterAt(this.position);
    if (water) {
      // Float: push toward the surface, with heavy drag so it bobs rather
      // than shooting out of the water.
      const submersion = Math.min(1, (water.surfaceY - this.position.y) / (this.radius * 2));
      this.velocity.y += WATER_BUOYANCY * submersion * delta;
      this.velocity.y -= GRAVITY * delta;
      this.velocity.multiplyScalar(Math.max(0, 1 - WATER_DRAG * delta));
    } else if (!this.resting) {
      this.velocity.y -= GRAVITY * delta;
      this.velocity.x *= Math.max(0, 1 - AIR_DRAG * delta);
      this.velocity.z *= Math.max(0, 1 - AIR_DRAG * delta);
    }

    if (this.resting && !water) {
      this.spin *= Math.max(0, 1 - GROUND_FRICTION * delta);
      return;
    }

    this.position.addScaledVector(this.velocity, delta);

    // Ground contact, found by probing straight down from just above the object.
    const probeOrigin = new Vector3(this.position.x, this.position.y + this.radius, this.position.z);
    const groundY = world.groundHeightBelow(probeOrigin, 8);
    if (Number.isFinite(groundY) && this.position.y - this.radius <= groundY) {
      this.position.y = groundY + this.radius;
      if (this.velocity.y < -1.2) {
        this.velocity.y = -this.velocity.y * BOUNCE;
      } else {
        this.velocity.y = 0;
        this.velocity.x *= Math.max(0, 1 - GROUND_FRICTION * delta);
        this.velocity.z *= Math.max(0, 1 - GROUND_FRICTION * delta);
        if (this.velocity.lengthSq() < 0.02) {
          this.velocity.set(0, 0, 0);
          this.resting = true;
        }
      }
    }

    // A thrown crate tumbles; a settled one stops.
    if (!this.resting) {
      this.spin = Math.min(12, this.velocity.length() * 0.9);
      this.object3d.rotation.x += this.spin * delta * 0.6;
      this.object3d.rotation.z += this.spin * delta * 0.35;
    }

    if (this.position.y < -80) this.respawn();
  }

  pickUp(): void {
    this.held = true;
    this.velocity.set(0, 0, 0);
    this.object3d.rotation.set(0, 0, 0);
  }

  release(velocity: Vector3): void {
    this.held = false;
    this.resting = false;
    this.velocity.copy(velocity);
    this.pickupCooldown = 0.4;
  }

  respawn(): void {
    this.held = false;
    this.resting = false;
    this.velocity.set(0, 0, 0);
    this.object3d.position.copy(this.spawnPosition);
    this.object3d.rotation.set(0, 0, 0);
  }
}
