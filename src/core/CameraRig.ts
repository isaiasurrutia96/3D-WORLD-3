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

/** How long the camera takes to level out as the swimmer goes under. */
const LEVEL_SECONDS = 0.9;

/** Seconds of no manual input before the camera starts drifting back. */
const AUTO_FOLLOW_DELAY = 1.1;

/**
 * The isometric view: looking down at the true isometric angle (35.26
 * degrees), from far off through a long lens so that lines stay nearly
 * parallel, as an isometric drawing's do. It still follows him.
 */
const ISO_PITCH = Math.atan(1 / Math.SQRT2);
const ISO_FOV = 18;
/** Far enough that about thirty metres of ground fit top to bottom. */
const ISO_DISTANCE = 96;
/** And at least this many metres across, so a phone held upright sees as wide. */
const ISO_MIN_WIDTH = 26;
/** The diagonal it starts on: from the front left. */
const ISO_YAW = -Math.PI / 4;

export class CameraRig {
  yaw = Math.PI;
  pitch = 0.33;

  private distance = 8.6;
  private currentDistance = 8.6;
  private readonly focus = new Vector3();
  private readonly smoothedFocus = new Vector3();
  private readonly desiredPosition = new Vector3();
  private readonly toCamera = new Vector3();
  private manualTimer = 0;
  private initialised = false;
  /** Counts down through the levelling-out that going under starts. */
  private levelTimer = 0;
  private wasSubmerged = false;

  /**
   * Upper limit on the camera's height, used to take it under the water with
   * a diving character. Without it the camera stays in the air and the player
   * watches their own character through an almost opaque surface.
   */
  ceilingY: number | null = null;

  /** Whether the isometric view is on. Switched with setIsometric. */
  private iso = false;
  /** The lens the chase camera uses, to go back to after the isometric one. */
  private readonly followFov: number;

  constructor(
    private readonly camera: PerspectiveCamera,
    private readonly world: CollisionWorld,
  ) {
    this.followFov = camera.fov;
  }

  get isometric(): boolean {
    return this.iso;
  }

  /**
   * Turns the isometric view on or off. On, the camera swings to the
   * diagonal and its tilt is fixed; dragging the view still turns it round
   * him. Off, it is the chase camera again, behind him.
   */
  setIsometric(on: boolean, player?: Player): void {
    if (on === this.iso) return;
    this.iso = on;
    if (on) {
      this.yaw = ISO_YAW;
      this.pitch = ISO_PITCH;
    } else {
      this.pitch = 0.33;
      if (player) this.yaw = player.facing + Math.PI;
    }
    this.camera.fov = on ? ISO_FOV : this.followFov;
    this.camera.updateProjectionMatrix();
    this.levelTimer = 0;
  }

  /** Yaw the character's movement input is measured against. */
  get movementYaw(): number {
    return this.yaw;
  }

  /**
   * How far the camera is tilted. Positive looks down at him from above.
   * Swimming underwater is steered by where the camera is pointed, so the
   * controller needs this as well as the yaw.
   */
  get lookPitch(): number {
    return this.pitch;
  }

  /** Current yaw in degrees, for the on-screen readout. */
  get yawDegrees(): number {
    return ((MathUtils.radToDeg(this.yaw) % 360) + 360) % 360;
  }

  applyLook(deltaYaw: number, deltaPitch: number): void {
    if (deltaYaw === 0 && deltaPitch === 0) return;
    this.yaw -= deltaYaw;
    // In the isometric view the tilt is the view; only turning is allowed.
    if (!this.iso) this.pitch = MathUtils.clamp(this.pitch + deltaPitch, MIN_PITCH, MAX_PITCH);
    this.manualTimer = AUTO_FOLLOW_DELAY;
    // A hand on the view has it. Whatever the camera was doing to its own
    // tilt, it stops.
    this.levelTimer = 0;
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
      if (!this.iso) this.yaw = player.facing + Math.PI;
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

    if (this.iso) {
      this.updateIsometric();
      return;
    }

    this.autoFollow(delta, player);

    // Going below the surface, the camera levels out: looking down on a
    // swimmer from above shows only the top of their head.
    //
    // Once, as he goes under, and not after. It used to do this for as long
    // as he was down there, on every frame — which was harmless while the
    // view was only a view, and stopped being harmless when the view became
    // the steering. Look down to swim down and the camera began levelling
    // itself straight away, so the dive flattened out under a held key and
    // the only way to keep going was to keep dragging against it.
    const submerged = player.isSubmerged;
    if (submerged && !this.wasSubmerged) this.levelTimer = LEVEL_SECONDS;
    if (!submerged) this.levelTimer = 0;
    this.wasSubmerged = submerged;
    if (this.levelTimer > 0) {
      this.levelTimer -= delta;
      this.pitch = MathUtils.lerp(this.pitch, 0.06, 1 - Math.exp(-4.5 * delta));
    }

    // Pull back a little at speed and when swimming, which widens the view
    // exactly when more of it is needed.
    const speedFactor = MathUtils.clamp(player.speed / 9, 0, 1);
    this.distance = 8.2 + speedFactor * 1.8 + (player.state === 'swim' ? 1 : 0);

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

    if (this.ceilingY !== null && this.desiredPosition.y > this.ceilingY) {
      this.desiredPosition.y = this.ceilingY;
    }

    this.camera.position.copy(this.desiredPosition);
    this.camera.lookAt(this.smoothedFocus);
  }

  /**
   * The isometric view: no drifting round behind him, no levelling under
   * water and no pulling in past scenery — it looks over the world, not
   * through it.
   */
  private updateIsometric(): void {
    this.pitch = ISO_PITCH;
    if (this.camera.fov !== ISO_FOV) {
      this.camera.fov = ISO_FOV;
      this.camera.updateProjectionMatrix();
    }
    const cosPitch = Math.cos(this.pitch);
    this.toCamera.set(Math.sin(this.yaw) * cosPitch, Math.sin(this.pitch), Math.cos(this.yaw) * cosPitch);
    // Pulled further back on a narrow screen, so the view is as wide there.
    const across = 2 * Math.tan(MathUtils.degToRad(ISO_FOV / 2)) * Math.max(0.2, this.camera.aspect);
    const distance = Math.max(ISO_DISTANCE, ISO_MIN_WIDTH / across);
    this.currentDistance = distance;
    this.camera.position.copy(this.smoothedFocus).addScaledVector(this.toCamera, distance);
    this.camera.lookAt(this.smoothedFocus);
  }

  /**
   * Eases the camera back behind the character once the player stops steering
   * it, but only while they are actually moving — standing still should not
   * make the view swing around on its own.
   */
  private autoFollow(delta: number, player: Player): void {
    if (this.manualTimer > 0) return;
    if (player.speed < 2.2) return;

    // Only swing round when the character is running *away* from the camera.
    //
    // Without this test, holding backward spins on the spot forever: the
    // character turns to face the way you pushed, the camera follows them
    // round, and once it is behind them "backward" points the other way, so
    // they turn again. Leaving the camera where it is means backward stays
    // backward.
    const awayX = this.smoothedFocus.x - this.camera.position.x;
    const awayZ = this.smoothedFocus.z - this.camera.position.z;
    const awayLength = Math.hypot(awayX, awayZ);
    if (awayLength > 0.001) {
      const movingAway =
        (player.velocity.x * awayX + player.velocity.z * awayZ) / awayLength;
      if (movingAway < player.speed * 0.35) return;
    }

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
    this.levelTimer = 0;
    this.wasSubmerged = false;
    this.pitch = this.iso ? ISO_PITCH : 0.33;
    this.update(1 / 60, player);
  }
}
