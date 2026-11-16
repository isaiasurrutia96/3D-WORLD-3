/**
 * Mini golf on the island's putting green, played with the avatar.
 *
 * Walk up to the green and a "Play Golf" button appears. Pressing it puts
 * him on the green beside the ball with a club, and the camera rises to
 * look down over the whole hole. Drag anywhere (back, away from where the
 * ball should go) to aim: a dotted line shows the direction and how hard;
 * let go and he swings. The ball rolls, slows, bounces off the rim and
 * drops in the hole if it is not going too fast. Strokes are counted
 * against par; Exit (or the card at the end) puts him back on the lawn.
 */

import {
  BoxGeometry,
  Camera,
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Plane,
  Raycaster,
  Scene,
  SphereGeometry,
  Vector2,
  Vector3,
} from 'three';
import type { Player } from '../player/Player.ts';

/** The green, as the island describes it. */
export interface GolfCourse {
  /** Whether a point is on the playable green (inside the rim). */
  inner(x: number, z: number): boolean;
  /** Whether a point on the lawn is close enough to the green to offer a game. */
  near(x: number, z: number): boolean;
  hole: Vector3;
  tee: Vector3;
  /** The middle of the green and its size, for framing the camera. */
  centre: Vector3;
  size: { x: number; z: number };
}

const PAR = 3;
const BALL_R = 0.07;
const HOLE_R = 0.13;
/** The fastest a ball goes, at full power, in metres a second. */
const MAX_SPEED = 8.5;
/** How far the pointer is dragged across the ground for full power, in metres. */
const FULL_PULL = 3;
const SWING_TIME = 0.42;

type Phase = 'off' | 'aim' | 'swing' | 'rolling' | 'sinking' | 'done';

export class GolfGame {
  private phase: Phase = 'off';
  private strokes = 0;
  private readonly ball: Mesh;
  private readonly club: Group;
  private readonly dots: Mesh[] = [];
  private readonly velocity = new Vector3();
  private aim = new Vector3(1, 0, 0);
  private power = 0;
  private dragStart: Vector3 | null = null;
  private swingTimer = 0;
  private sinkTimer = 0;
  private returnTo = new Vector3();
  private returnFacing = 0;
  private savedFov = 50;
  private readonly ui: HTMLDivElement;
  private readonly playButton: HTMLButtonElement;
  private readonly bar: HTMLDivElement;
  private readonly card: HTMLDivElement;
  private readonly raycaster = new Raycaster();
  private readonly ground = new Plane(new Vector3(0, 1, 0), 0);

  constructor(
    scene: Scene,
    private readonly camera: PerspectiveCamera,
    private readonly canvas: HTMLElement,
    private readonly player: Player,
    private readonly course: GolfCourse,
    private readonly hooks: { onStart(): void; onEnd(): void },
  ) {
    this.ball = new Mesh(new SphereGeometry(BALL_R, 20, 14), new MeshStandardMaterial({ color: '#ffffff', roughness: 0.35 }));
    this.ball.name = 'golf ball';
    this.ball.castShadow = true;
    this.ball.visible = false;
    scene.add(this.ball);

    // The club: a shaft from his hands down to a head by the ball.
    this.club = new Group();
    this.club.name = 'golf club';
    const shaftLength = 0.92;
    const shaft = new Mesh(new CylinderGeometry(0.014, 0.014, shaftLength, 8), new MeshStandardMaterial({ color: '#c9ced6', metalness: 0.6, roughness: 0.35 }));
    const tilt = Math.atan2(0.3, 0.86);
    shaft.position.set(0, -Math.cos(tilt) * shaftLength / 2, Math.sin(tilt) * shaftLength / 2);
    shaft.rotation.x = tilt;
    const grip = new Mesh(new CylinderGeometry(0.022, 0.022, 0.22, 8), new MeshStandardMaterial({ color: '#2b2b33', roughness: 0.8 }));
    grip.position.set(0, -Math.cos(tilt) * 0.11, Math.sin(tilt) * 0.11);
    grip.rotation.x = tilt;
    const head = new Mesh(new BoxGeometry(0.16, 0.05, 0.07), new MeshStandardMaterial({ color: '#8f97a3', metalness: 0.7, roughness: 0.3 }));
    head.position.set(0.04, -Math.cos(tilt) * shaftLength, Math.sin(tilt) * shaftLength);
    this.club.add(shaft, grip, head);
    this.club.position.set(0, 0.92, -0.3);
    this.club.visible = false;
    for (const part of [shaft, grip, head]) part.castShadow = true;
    player.object.add(this.club);

    // The aim line: dots along the shot.
    const dotGeometry = new SphereGeometry(0.045, 10, 8);
    for (let i = 0; i < 12; i += 1) {
      const dot = new Mesh(dotGeometry, new MeshStandardMaterial({ color: '#ffffff', emissive: '#ffffff', emissiveIntensity: 0.4 }));
      dot.visible = false;
      dot.name = 'aim dot';
      scene.add(dot);
      this.dots.push(dot);
    }

    // ---- The buttons and the score ----
    const style = document.createElement('style');
    style.textContent = `
      .golf { position: fixed; inset: 0; pointer-events: none; z-index: 30; font: 700 16px/1.2 system-ui, sans-serif; }
      .golf button { pointer-events: auto; border: 0; cursor: pointer; font: inherit; }
      .golf__play { position: absolute; left: 50%; top: calc(76px + env(safe-area-inset-top)); transform: translateX(-50%);
        padding: 16px 30px; border-radius: 999px; background: #ec4b47; color: #fff; font-size: 20px;
        box-shadow: 0 6px 0 #b8312e, 0 10px 24px rgba(0,0,0,.25); display: none; }
      .golf__play:active { transform: translateX(-50%) translateY(4px); box-shadow: 0 2px 0 #b8312e; }
      .golf__bar { position: absolute; left: 50%; top: calc(14px + env(safe-area-inset-top)); transform: translateX(-50%);
        display: none; gap: 10px; align-items: center; padding: 8px 10px 8px 16px; border-radius: 999px;
        background: rgba(20, 40, 60, .78); color: #fff; white-space: nowrap; }
      .golf__bar button { padding: 8px 14px; border-radius: 999px; background: #fff; color: #183048; }
      .golf__hint { position: absolute; left: 50%; bottom: calc(26px + env(safe-area-inset-bottom)); transform: translateX(-50%);
        color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,.45); display: none; text-align: center; padding: 0 16px; }
      .golf__card { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); display: none;
        flex-direction: column; align-items: center; gap: 14px; padding: 24px 28px; border-radius: 22px;
        background: #fff; color: #183048; box-shadow: 0 12px 40px rgba(0,0,0,.3); min-width: 240px; text-align: center; }
      .golf__card h2 { margin: 0; font-size: 30px; color: #ec4b47; }
      .golf__card p { margin: 0; font-weight: 600; }
      .golf__card div { display: flex; gap: 10px; }
      .golf__card button { padding: 12px 18px; border-radius: 999px; background: #58c26e; color: #fff; }
      .golf__card button.golf__exit { background: #e3e7ee; color: #183048; }
      body.is-golf .touch, body.is-golf .hud__prompt, body.is-golf .hud__menu, body.is-golf .hud__build-line { display: none !important; }
    `;
    document.head.appendChild(style);
    this.ui = document.createElement('div');
    this.ui.className = 'golf';
    this.playButton = document.createElement('button');
    this.playButton.className = 'golf__play';
    this.playButton.textContent = '⛳ Play Golf';
    this.playButton.addEventListener('click', () => this.start());
    this.bar = document.createElement('div');
    this.bar.className = 'golf__bar';
    this.card = document.createElement('div');
    this.card.className = 'golf__card';
    const hint = document.createElement('div');
    hint.className = 'golf__hint';
    hint.textContent = 'Drag back to aim, let go to swing';
    this.ui.append(this.playButton, this.bar, hint, this.card);
    document.body.appendChild(this.ui);

    // Aiming: anywhere on the game view, while it is his shot.
    window.addEventListener('pointerdown', this.onDown, true);
    window.addEventListener('pointermove', this.onMove, true);
    window.addEventListener('pointerup', this.onUp, true);
    window.addEventListener('pointercancel', this.onUp, true);
  }

  get active(): boolean {
    return this.phase !== 'off';
  }

  /** Shows the Play Golf button while he stands close to the green. */
  offer(near: boolean): void {
    this.playButton.style.display = near && this.phase === 'off' ? 'block' : 'none';
  }

  start(again = false): void {
    if (this.phase !== 'off') return;
    if (!again) {
      this.returnTo.copy(this.player.position);
      this.returnFacing = this.player.object.rotation.y;
      this.savedFov = this.camera.fov;
    }
    this.strokes = 0;
    this.ball.position.set(this.course.tee.x, BALL_R, this.course.tee.z);
    this.ball.visible = true;
    this.club.visible = true;
    this.aim.copy(this.course.hole).sub(this.ball.position).setY(0).normalize();
    this.standAtBall();
    this.phase = 'aim';
    document.body.classList.add('is-golf');
    this.playButton.style.display = 'none';
    this.bar.style.display = 'flex';
    (this.ui.querySelector('.golf__hint') as HTMLElement).style.display = 'block';
    this.card.style.display = 'none';
    this.updateBar();
    this.hooks.onStart();
  }

  end(): void {
    if (this.phase === 'off') return;
    this.phase = 'off';
    this.ball.visible = false;
    this.club.visible = false;
    for (const dot of this.dots) dot.visible = false;
    this.dragStart = null;
    this.player.rig.torso.rotation.set(0, 0, 0);
    this.camera.fov = this.savedFov;
    this.camera.updateProjectionMatrix();
    this.player.teleport(this.returnTo.clone().setY(this.returnTo.y + 0.05), this.returnFacing);
    document.body.classList.remove('is-golf');
    this.bar.style.display = 'none';
    (this.ui.querySelector('.golf__hint') as HTMLElement).style.display = 'none';
    this.card.style.display = 'none';
    this.hooks.onEnd();
  }

  update(delta: number): void {
    if (this.phase === 'off') return;
    this.player.poseStanding(delta);
    this.poseSwing();

    if (this.phase === 'swing') {
      this.swingTimer += delta;
      // The club meets the ball two thirds of the way through the swing.
      if (this.swingTimer >= SWING_TIME * 0.62 && this.velocity.lengthSq() === 0) {
        this.velocity.copy(this.aim).multiplyScalar(this.power * MAX_SPEED);
        this.strokes += 1;
        this.updateBar();
      }
      if (this.swingTimer >= SWING_TIME) this.phase = 'rolling';
    }
    if (this.phase === 'swing' || this.phase === 'rolling') this.roll(delta);
    if (this.phase === 'rolling' && this.velocity.lengthSq() === 0) {
      this.standAtBall();
      this.phase = 'aim';
    }
    if (this.phase === 'sinking') {
      this.sinkTimer += delta;
      this.ball.position.y = BALL_R - Math.min(1, this.sinkTimer / 0.25) * BALL_R * 2.2;
      if (this.sinkTimer > 0.6) {
        this.phase = 'done';
        this.ball.visible = false;
        this.showCard();
      }
    }
    this.frameCamera();
  }

  // ---- The ball ----------------------------------------------------------

  private roll(delta: number): void {
    const steps = 6;
    const dt = delta / steps;
    const p = this.ball.position;
    for (let i = 0; i < steps; i += 1) {
      const speed = this.velocity.length();
      if (speed === 0) break;
      // Rolling resistance: a steady drag and a little more when fast.
      const slowed = Math.max(0, speed - (0.9 + 0.35 * speed) * dt);
      if (slowed < 0.04) {
        this.velocity.set(0, 0, 0);
        break;
      }
      this.velocity.multiplyScalar(slowed / speed);
      // Moves one way, then the other; the rim turns it back.
      const nx = p.x + this.velocity.x * dt;
      if (this.free(nx, p.z)) p.x = nx;
      else this.velocity.x *= -0.78;
      const nz = p.z + this.velocity.z * dt;
      if (this.free(p.x, nz)) p.z = nz;
      else this.velocity.z *= -0.78;
      // The hole: in if it is not going too fast, over the lip if it is.
      const dx = p.x - this.course.hole.x;
      const dz = p.z - this.course.hole.z;
      const d = Math.hypot(dx, dz);
      if (d < HOLE_R - BALL_R * 0.3) {
        if (slowed < 3.2) {
          p.x = this.course.hole.x;
          p.z = this.course.hole.z;
          this.velocity.set(0, 0, 0);
          this.phase = 'sinking';
          this.sinkTimer = 0;
          return;
        }
        // Too fast: it rattles over, a little slower and knocked aside.
        this.velocity.multiplyScalar(0.75);
        this.velocity.x += (dz / (d || 1)) * 0.3;
        this.velocity.z -= (dx / (d || 1)) * 0.3;
      }
    }
    // It spins as it rolls.
    this.ball.rotation.x += this.velocity.z * delta / BALL_R;
    this.ball.rotation.z -= this.velocity.x * delta / BALL_R;
  }

  private free(x: number, z: number): boolean {
    const r = BALL_R;
    const g = this.course;
    return g.inner(x - r, z - r) && g.inner(x + r, z - r) && g.inner(x - r, z + r) && g.inner(x + r, z + r);
  }

  // ---- Him and his club --------------------------------------------------

  /**
   * Stands him beside the ball, side on to the shot, as a right-handed
   * golfer stands: the ball in front of him, the hole to his left.
   */
  private standAtBall(): void {
    // The model looks along its own -z, its left is -x: his left along
    // the aim, his front to the ball.
    const facing = this.facing();
    const front = new Vector3(-Math.sin(facing), 0, -Math.cos(facing));
    const at = this.ball.position.clone().addScaledVector(front, -0.62).setY(0);
    this.player.teleport(at, facing);
    this.player.object.rotation.y = facing;
  }

  private facing(): number {
    return Math.atan2(this.aim.z, -this.aim.x);
  }

  /** Arms down to the grip, and the club through its swing. */
  private poseSwing(): void {
    const rig = this.player.rig;
    rig.shoulderLeft.rotation.set(0.62, 0, 0.32);
    rig.shoulderRight.rotation.set(0.62, 0, -0.32);
    rig.elbowLeft.rotation.x = 0;
    rig.elbowRight.rotation.x = 0;
    let swing = 0;
    if (this.phase === 'aim') {
      // Drawn back as far as the shot is hard.
      swing = this.dragStart ? -this.power * 1.5 : 0;
    } else if (this.phase === 'swing') {
      const t = Math.min(1, this.swingTimer / SWING_TIME);
      // Down through the ball and on into the follow-through.
      swing = -this.power * 1.5 + t * (this.power * 1.5 + 1.2);
    }
    // Turned to his front (the model's -z).
    this.club.rotation.set(0, Math.PI, swing);
    rig.torso.rotation.set(0, swing * 0.35, 0);
    rig.shoulderLeft.rotation.z += swing * 0.5;
    rig.shoulderRight.rotation.z += swing * 0.5;
    this.player.object.rotation.y = this.facing();
  }

  // ---- Aiming ------------------------------------------------------------

  private groundAt(event: PointerEvent): Vector3 | null {
    const rect = this.canvas.getBoundingClientRect();
    const ndc = new Vector2(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.camera as Camera);
    const hit = new Vector3();
    return this.raycaster.ray.intersectPlane(this.ground, hit) ? hit : null;
  }

  private onDown = (event: PointerEvent): void => {
    if (this.phase !== 'aim') return;
    if ((event.target as HTMLElement | null)?.closest?.('button')) return;
    const at = this.groundAt(event);
    if (!at) return;
    this.dragStart = at;
    this.power = 0;
    event.preventDefault();
    event.stopPropagation();
  };

  private onMove = (event: PointerEvent): void => {
    if (this.phase !== 'aim' || !this.dragStart) return;
    const at = this.groundAt(event);
    if (!at) return;
    // Pulled back, like a catapult: the shot goes the other way.
    const pull = this.dragStart.clone().sub(at).setY(0);
    const length = pull.length();
    this.power = Math.min(1, length / FULL_PULL);
    if (length > 0.05) this.aim.copy(pull).normalize();
    this.showAim();
    event.preventDefault();
    event.stopPropagation();
  };

  private onUp = (event: PointerEvent): void => {
    if (this.phase !== 'aim' || !this.dragStart) return;
    this.dragStart = null;
    for (const dot of this.dots) dot.visible = false;
    event.stopPropagation();
    if (this.power < 0.04) {
      this.power = 0;
      return;
    }
    this.velocity.set(0, 0, 0);
    this.swingTimer = 0;
    this.phase = 'swing';
  };

  private showAim(): void {
    const length = 0.4 + this.power * 4.2;
    // Green when gentle, through yellow, to red at full power.
    const colour = this.power < 0.5 ? [0.35 + this.power * 1.3, 0.85, 0.3] : [1, 0.85 - (this.power - 0.5) * 1.5, 0.25];
    this.dots.forEach((dot, i) => {
      const t = (i + 1) / this.dots.length;
      dot.visible = true;
      dot.position.copy(this.ball.position).addScaledVector(this.aim, t * length).setY(0.06);
      const m = dot.material as MeshStandardMaterial;
      m.color.setRGB(colour[0], colour[1], colour[2]);
      m.emissive.setRGB(colour[0] * 0.4, colour[1] * 0.4, colour[2] * 0.4);
      dot.scale.setScalar(1 - t * 0.45);
    });
  }

  // ---- The camera, the score and the end ---------------------------------

  /** Looks down over the whole green, the long way along the screen. */
  private frameCamera(): void {
    const cam = this.camera;
    if (cam.fov !== 42) {
      cam.fov = 42;
      cam.updateProjectionMatrix();
    }
    const portrait = cam.aspect < 1;
    const target = this.course.centre.clone().lerp(this.ball.position.clone().setY(0), 0.25);
    const along = portrait ? this.course.size.z : this.course.size.x;
    const across = portrait ? this.course.size.x : this.course.size.z;
    const v = (cam.fov * Math.PI) / 360;
    const h = Math.atan(Math.tan(v) * cam.aspect);
    const need = Math.max(along / 2 / Math.tan(h), across / 2 / Math.tan(v)) * 1.25 + 2;
    const elevation = 1.0;
    // From the south on a wide screen; from the east on a tall one.
    const dir = portrait ? new Vector3(1, 0, 0) : new Vector3(0, 0, 1);
    cam.position.copy(target).addScaledVector(dir, Math.cos(elevation) * need).setY(Math.sin(elevation) * need);
    cam.lookAt(target);
    cam.updateMatrixWorld();
  }

  private updateBar(): void {
    this.bar.textContent = '';
    const text = document.createElement('span');
    text.textContent = `Hole 1 · Par ${PAR} · Strokes ${this.strokes}`;
    const exit = document.createElement('button');
    exit.textContent = 'Exit';
    exit.addEventListener('click', () => this.end());
    this.bar.append(text, exit);
  }

  private showCard(): void {
    const names: Record<number, string> = { [-2]: 'Eagle!', [-1]: 'Birdie!', 0: 'Par', 1: 'Bogey' };
    const diff = this.strokes - PAR;
    const title = this.strokes === 1 ? 'Hole in one!' : (names[diff] ?? `+${diff}`);
    this.card.textContent = '';
    const h = document.createElement('h2');
    h.textContent = title;
    const p = document.createElement('p');
    p.textContent = `${this.strokes} stroke${this.strokes === 1 ? '' : 's'} · Par ${PAR}`;
    const row = document.createElement('div');
    const again = document.createElement('button');
    again.textContent = 'Play again';
    again.addEventListener('click', () => {
      this.phase = 'off';
      this.start(true);
    });
    const exit = document.createElement('button');
    exit.className = 'golf__exit';
    exit.textContent = 'Exit';
    exit.addEventListener('click', () => this.end());
    row.append(again, exit);
    this.card.append(h, p, row);
    this.card.style.display = 'flex';
    (this.ui.querySelector('.golf__hint') as HTMLElement).style.display = 'none';
  }
}
