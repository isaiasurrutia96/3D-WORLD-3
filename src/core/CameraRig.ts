/**
 * Third-person chase camera.
 *
 * It sits behind and above the character, eases toward its target rather than
 * snapping, drifts back behind the character while they run, and pulls in when
 * scenery would block the view. Nothing holds it — there is no camera operator
 * in the world.
 */

import { MathUtils, PerspectiveCamera, Vector3 } from 'three';
import type { CollisionWorld } from '../physics/CollisionWorld.ts';
import type { Player } from '../player/Player.ts';

const MIN_PITCH = -0.62;
const MAX_PITCH = 1.1;

/** Seconds of no manual input before the camera starts drifting back. */
const AUTO_FOLLOW_DELAY = 1.1;

export class CameraRig {
  yaw = Math.PI;
  pitch = 0.27;

  private distance = 7.4;
  private currentDistance = 7.4;
  private readonly focus = new Vector3();
  private readonly smoothedFocus = new Vector3();
  private readonly desiredPosition = new Vector3();
  private readonly toCamera = new Vector3();
  private manualTimer = 0;
  private initialised = false;

  constructor(
    private readonly camera: PerspectiveCamera,
    private readonly world: CollisionWorld,
  ) {}

  /** Yaw the character's movement input is measured against. */
  get movementYaw(): number {
    return this.yaw;
  }

  applyLook(deltaYaw: number, deltaPitch: number): void {
    if (deltaYaw === 0 && deltaPitch === 0) return;
    this.yaw -= deltaYaw;
    this.pitch = MathUtils.clamp(this.pitch + deltaPitch, MIN_PITCH, MAX_PITCH);
    this.manualTimer = AUTO_FOLLOW_DELAY;
  }

  update(delta: number, player: Player): void {
    if (this.manualTimer > 0) this.manualTimer -= delta;

    player.getFocusPoint(this.focus);
    // Frame a little ahead of a running character so they are not pinned to
    // the centre of the screen.
    if (player.speed > 1) {
      this.focus.x += player.velocity.x * 0.09;
      this.focus.z += player.velocity.z * 0.09;
    }

    if (!this.initialised) {
      this.smoothedFocus.copy(this.focus);
      this.yaw = player.facing + Math.PI;
      this.initialised = true;
    } else {
      // Vertical movement is smoothed harder than horizontal, so a jump does
      // not throw the whole frame up and down with it.
      const horizontalRate = 1 - Math.exp(-11 * delta);
      const verticalRate = 1 - Math.exp(-(player.state === 'air' ? 4.5 : 9) * delta);
      this.smoothedFocus.x = MathUtils.lerp(this.smoothedFocus.x, this.focus.x, horizontalRate);
      this.smoothedFocus.z = MathUtils.lerp(this.smoothedFocus.z, this.focus.z, horizontalRate);
      this.smoothedFocus.y = MathUtils.lerp(this.smoothedFocus.y, this.focus.y, verticalRate);
    }

    this.autoFollow(delta, player);

    // Pull back a little at speed and when swimming, which widens the view
    // exactly when more of it is needed.
    const speedFactor = MathUtils.clamp(player.speed / 9, 0, 1);
    this.distance = 6.9 + speedFactor * 1.5 + (player.state === 'swim' ? 0.8 : 0);

    const cosPitch = Math.cos(this.pitch);
    this.toCamera.set(
      Math.sin(this.yaw) * cosPitch,
      Math.sin(this.pitch),
      Math.cos(this.yaw) * cosPitch,
    );

    const blocked = this.distanceToObstruction(this.distance);
    // Snap inward quickly so the character is never hidden, but ease back out
    // slowly so passing a pillar does not fling the camera.
    this.currentDistance =
      blocked < this.currentDistance
        ? blocked
        : MathUtils.lerp(this.currentDistance, blocked, 1 - Math.exp(-3.2 * delta));

    this.desiredPosition
      .copy(this.smoothedFocus)
      .addScaledVector(this.toCamera, Math.max(1.6, this.currentDistance));

    this.camera.position.copy(this.desiredPosition);
    this.camera.lookAt(this.smoothedFocus);
  }

  /**
   * Eases the camera back behind the character once the player stops steering
   * it, but only while they are actually moving — standing still should not
   * make the view swing around on its own.
   */
  private autoFollow(delta: number, player: Player): void {
    if (this.manualTimer > 0) return;
    if (player.state === 'climb') return;
    if (player.speed < 2.2) return;

    const desiredYaw = player.facing + Math.PI;
    let difference = desiredYaw - this.yaw;
    while (difference > Math.PI) difference -= Math.PI * 2;
    while (difference < -Math.PI) difference += Math.PI * 2;

    const strength = MathUtils.clamp((player.speed - 2.2) / 6, 0, 1);
    this.yaw += difference * (1 - Math.exp(-1.9 * strength * delta));
  }

  /** How far the camera can sit from the focus point before hitting scenery. */
  private distanceToObstruction(preferred: number): number {
    const padding = 0.42;
    const hit = this.world.raycast(this.smoothedFocus, this.toCamera, preferred + padding);
    return Math.max(1.6, Math.min(preferred, hit - padding));
  }

  /** Places the camera immediately, used after a teleport or respawn. */
  reset(player: Player): void {
    this.initialised = false;
    this.manualTimer = 0;
    this.pitch = 0.27;
    this.update(1 / 60, player);
  }
}
