/**
 * The go-kart on the island, and getting in and out of it.
 *
 * The kart is the racing game's own: its model, its vehicle physics, its
 * checks for whether you can climb in or step out. This only joins those to
 * the island — a kart standing where the player can find it, the root
 * controls turned into the racing game's throttle, brake and steering, and
 * the player's character carried along with it so that the island's camera
 * follows the kart without being told anything about karts.
 *
 * While driving, the character is not simulated at all. He is hidden and
 * placed where the kart is, facing the way it faces and moving as it moves.
 * That is what the camera reads, and it is the whole of the connection.
 */

import { Group, Scene, Vector3 } from 'three';
import type { Input } from '../input/Input.ts';
import type { Player } from '../player/Player.ts';
import { worldPhysics } from './Routes.ts';
import { createKartFrame } from '../../apps/letsgo-racing/src/kart.js';
import {
  canEnterVehicle,
  createVehicleState,
  findExitPosition,
  stepVehicle,
} from '../../apps/letsgo-racing/src/vehicle-controller.js';
import { createVehicleView, speedToMph } from '../../apps/letsgo-racing/src/vehicle-view.js';
import { STEP } from '../../apps/letsgo-racing/src/running-controller.js';

export interface KartHome {
  x: number;
  y: number;
  z: number;
  yaw: number;
}

/** How a kart sees the controls: forward, back and sideways on the stick. */
const STICK_DEAD = 0.18;

export class KartMode {
  readonly model: Group;
  readonly state: ReturnType<typeof createVehicleState>;
  driving = false;
  /** Why he could not get out, for a moment after trying. */
  message = '';
  private messageUntil = 0;
  private previous: ReturnType<typeof createVehicleState>;
  private accumulator = 0;
  private readonly apply: (state: unknown) => void;
  private readonly scratch = new Vector3();

  constructor(
    scene: Scene,
    readonly home: KartHome,
  ) {
    this.model = createKartFrame();
    this.model.userData.vehicle = true;
    this.model.traverse((o) => {
      o.castShadow = true;
    });
    scene.add(this.model);
    this.apply = createVehicleView(this.model);
    this.state = createVehicleState();
    this.sendHome();
    this.previous = { ...this.state };
  }

  /** Puts the kart back where it started, stopped. */
  sendHome(): void {
    Object.assign(this.state, createVehicleState(), {
      x: this.home.x,
      y: this.home.y,
      z: this.home.z,
      yaw: this.home.yaw,
    });
    this.previous = { ...this.state };
    this.apply(this.state);
  }

  get mph(): number {
    return speedToMph(Math.hypot(this.state.speed, this.state.lateralSpeed ?? 0)) as number;
  }

  /** Whether the player is close enough, and settled enough, to climb in. */
  canEnter(player: Player): boolean {
    if (this.driving) return false;
    return canEnterVehicle(
      { grounded: player.onGround, x: player.position.x, y: player.position.y, z: player.position.z },
      this.state,
    ) as boolean;
  }

  /** Close enough to be worth offering, even if not yet settled. */
  isNear(player: Player): boolean {
    if (this.driving) return false;
    return (
      Math.hypot(player.position.x - this.state.x, player.position.z - this.state.z) < 4.5 &&
      Math.abs(player.position.y - this.state.y) < 1.5
    );
  }

  enter(player: Player): boolean {
    if (!this.canEnter(player)) return false;
    this.driving = true;
    this.previous = { ...this.state };
    this.accumulator = 0;
    player.object.visible = false;
    this.message = '';
    return true;
  }

  /** Steps out beside the kart if it is stopped and there is room. */
  exit(player: Player, now: number): boolean {
    const exit = findExitPosition(this.state, worldPhysics) as
      | { x: number; y: number; z: number; yaw: number }
      | null;
    if (!exit) {
      this.message =
        (this.state.spinTime ?? 0) > 0
          ? 'Wait for the spin to finish'
          : Math.abs(this.state.speed) > 0.75
            ? 'Stop to get out'
            : 'No room to get out here';
      this.messageUntil = now + 1500;
      return false;
    }
    this.driving = false;
    this.state.speed = 0;
    this.state.boostTime = 0;
    player.object.visible = true;
    player.teleport(this.scratch.set(exit.x, exit.y, exit.z), exit.yaw);
    return true;
  }

  /** What to tell the player about getting out, while it matters. */
  currentMessage(now: number): string {
    return now < this.messageUntil ? this.message : '';
  }

  /**
   * Drives the kart for one frame, in the racing game's fixed steps, and
   * carries the player along with it.
   */
  update(delta: number, input: Input, player: Player): void {
    // Nobody is driving: it just sits, but is still drawn where it is.
    if (!this.driving) {
      this.apply(this.state);
      return;
    }
    const y = input.move.y;
    const forward = -y > STICK_DEAD;
    const back = y > STICK_DEAD;
    const drive = {
      throttle: back ? -1 : forward ? 1 : 0,
      brake: back,
      steer: Math.abs(input.move.x) > STICK_DEAD / 2 ? Math.max(-1, Math.min(1, input.move.x)) : 0,
    };
    this.accumulator += Math.min(0.1, delta);
    while (this.accumulator >= STEP) {
      this.previous = { ...this.state };
      stepVehicle(this.state, drive, STEP, worldPhysics);
      this.accumulator -= STEP;
    }
    // Off the edge of the world: back where it started.
    if (this.state.y < -35) {
      this.sendHome();
      this.driving = false;
      player.object.visible = true;
      player.teleport(this.scratch.set(this.home.x + 4, this.home.y, this.home.z), this.home.yaw);
      return;
    }
    const alpha = this.accumulator / STEP;
    const turn = Math.atan2(
      Math.sin(this.state.yaw - this.previous.yaw),
      Math.cos(this.state.yaw - this.previous.yaw),
    );
    const pose = {
      ...this.state,
      x: this.previous.x + (this.state.x - this.previous.x) * alpha,
      y: this.previous.y + (this.state.y - this.previous.y) * alpha,
      z: this.previous.z + (this.state.z - this.previous.z) * alpha,
      yaw: this.previous.yaw + turn * alpha,
    };
    this.apply(pose);
    const vx = Math.sin(this.state.yaw) * this.state.speed;
    const vz = Math.cos(this.state.yaw) * this.state.speed;
    player.rideAlong(pose.x, pose.y, pose.z, pose.yaw, vx, vz);
  }
}
