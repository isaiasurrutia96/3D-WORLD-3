/**
 * LetsGo — Milestone: movement.
 *
 * The same figure as the last milestone, still in one neutral material, now
 * running, jumping and climbing on a bare test ground. Nothing here is
 * decoration: the floor markings show speed, the blocks show jump height and
 * distance, and the ladder up the box shows climbing and topping out.
 */

import './styles.css';
import { Box3, Vector3 } from 'three';
import { Engine } from './core/Engine.ts';
import { CameraRig } from './core/CameraRig.ts';
import { loadSettings, saveSettings, type UserSettings } from './core/Settings.ts';
import { Input } from './input/Input.ts';
import { CollisionWorld } from './physics/CollisionWorld.ts';
import { Player } from './player/Player.ts';
import { currentGaitPlan, lowestSole } from './player/PlayerGait.ts';
import { ANKLE_TO_SOLE } from './player/PlayerModel.ts';
import { ParticleEffects } from './world/Effects.ts';
import { buildSlab, type SlabWorld } from './world/Slab.ts';
import { Hud } from './ui/Hud.ts';

const container = document.getElementById('app');
if (!container) throw new Error('Missing #app container');

/** Caps the step so a stall cannot teleport the character through the floor. */
const MAX_DELTA = 1 / 20;

class Game {
  private settings: UserSettings = loadSettings();
  private readonly engine: Engine;
  private readonly hud: Hud;
  private readonly input = new Input();
  private readonly collision = new CollisionWorld();
  private readonly effects: ParticleEffects;

  private readonly world: SlabWorld;
  private readonly player: Player;
  private readonly cameraRig: CameraRig;

  private running = true;

  constructor() {
    this.engine = new Engine(container as HTMLElement, this.settings.quality);
    this.engine.setStudioMode(true);
    this.effects = new ParticleEffects(this.engine.scene);

    this.world = buildSlab(this.engine.scene, this.collision);

    this.player = new Player(
      this.collision,
      this.world.spawn,
      {
        onLand: (position, strength) => {
          if (strength > 0.25) this.effects.dust(position, strength);
        },
      },
      // Still the plain clay figure: the form is settled, the movement is not.
      { plain: true },
    );
    this.player.facing = this.world.spawnFacing;
    this.engine.scene.add(this.player.object);

    this.cameraRig = new CameraRig(this.engine.camera, this.collision);
    this.cameraRig.reset(this.player);

    this.hud = new Hud(container as HTMLElement);
    this.input.attach(this.engine.renderer.domElement);
    this.input.setPointerLockWanted(true);

    window.addEventListener('keydown', this.onGlobalKey);

    // Take keyboard focus straight away. A page that has never been clicked
    // receives no key presses at all, which looks exactly like broken
    // controls.
    const canvas = this.engine.renderer.domElement;
    canvas.tabIndex = 0;
    canvas.style.outline = 'none';
    window.focus();
    canvas.focus();

    this.engine.clock.start();
    requestAnimationFrame(this.frame);
  }

  private onGlobalKey = (event: KeyboardEvent): void => {
    if (event.code === 'F3') {
      event.preventDefault();
      this.hud.toggleStats();
    }
    // R is reserved for picking things up, so resetting moved off it.
    if (event.code === 'Backspace') {
      event.preventDefault();
      this.player.teleport(this.world.spawn, this.world.spawnFacing);
      this.cameraRig.reset(this.player);
    }
    if (event.code === 'Digit1' || event.code === 'Digit2' || event.code === 'Digit3') {
      const quality = (
        { Digit1: 'low', Digit2: 'medium', Digit3: 'high' } as const
      )[event.code as 'Digit1' | 'Digit2' | 'Digit3'];
      this.settings = { ...this.settings, quality };
      this.engine.applyQuality(quality);
      this.engine.setStudioMode(true);
      saveSettings(this.settings);
    }
  };

  private frame = (): void => {
    if (!this.running) return;
    requestAnimationFrame(this.frame);

    const delta = Math.min(MAX_DELTA, this.engine.clock.getDelta());

    this.input.update(this.settings.cameraSensitivity, this.settings.invertCameraY);
    if (this.input.wasPressed('togglePointerLock')) this.input.togglePointerLock();
    this.cameraRig.applyLook(this.input.look.x, this.input.look.y);
    this.player.update(delta, this.input, this.cameraRig.movementYaw);
    this.cameraRig.update(delta, this.player);

    this.effects.update(delta);
    this.engine.focusShadowsOn(this.player.position);
    this.engine.render(delta);

    this.hud.update({
      fps: this.engine.fps,
      quality: this.settings.quality,
      drawCalls: this.engine.renderer.info.render.calls,
      triangles: this.engine.renderer.info.render.triangles,
      state: this.player.stateName,
      speed: this.player.speed,
      position: this.player.position,
      gamepad: this.input.gamepadConnected,
      lastKey: this.input.lastKey,
      lastKeyRecognised: this.input.lastKeyRecognised,
      pointerLocked: this.input.isPointerLocked,
      moveX: this.input.move.x,
      moveY: this.input.move.y,
      cameraYaw: this.cameraRig.yawDegrees,
    });
  };

  /** Read-only handles, plus capture helpers, for the verification pass. */
  get debug() {
    return {
      engine: this.engine,
      player: this.player,
      world: this.world,
      settings: this.settings,
      rig: this.player.rig,

      freeze: (): void => {
        this.running = false;
      },

      /**
       * Steps the character controller directly, at a fixed time step and
       * with a fixed movement input, independent of how fast this machine can
       * render. Frame-rate dependent movement bugs do not show up otherwise:
       * a cloud machine runs this at twenty frames a second, and a real one
       * at sixty.
       */
      simulateMove: (frames: number, dt: number, x: number, y: number) => {
        const stub = {
          move: { x, y },
          look: { x: 0, y: 0 },
          isDown: () => false,
          wasPressed: () => false,
          wasReleased: () => false,
        } as unknown as Input;

        const samples: Array<{ x: number; z: number; speed: number; state: string }> = [];
        const yaw = this.cameraRig.movementYaw;
        for (let i = 0; i < frames; i += 1) {
          this.player.update(dt, stub, yaw);
          samples.push({
            x: Math.round(this.player.position.x * 1000) / 1000,
            z: Math.round(this.player.position.z * 1000) / 1000,
            speed: Math.round(this.player.speed * 100) / 100,
            state: this.player.stateName,
          });
        }
        return samples;
      },

      /**
       * Runs a three-jump combo at a fixed time step and returns the height
       * reached by each jump. Driving it with real key presses would depend
       * on how fast this machine renders, and the window to continue a combo
       * is a quarter of a second.
       */
      simulateJumpCombo: (dt = 1 / 60): number[] => {
        let holding = false;
        let alreadyPressed = false;
        const stub = {
          move: { x: 0, y: -1 },
          look: { x: 0, y: 0 },
          isDown: (action: string) => action === 'jump' && holding,
          wasPressed: (action: string) => action === 'jump' && holding && !alreadyPressed,
          wasReleased: () => false,
        } as unknown as Input;

        const yaw = this.cameraRig.movementYaw;
        const frames = (seconds: number) => Math.max(1, Math.round(seconds / dt));
        const step = () => this.player.update(dt, stub, yaw);
        const grounded = () =>
          ['idle', 'walk', 'run', 'skid'].includes(this.player.stateName);

        this.player.teleport(this.world.spawn.clone(), this.world.spawnFacing);
        for (let i = 0; i < frames(1); i += 1) step();

        const peaks: number[] = [];
        for (let jump = 0; jump < 3; jump += 1) {
          holding = true;
          alreadyPressed = false;
          step();
          alreadyPressed = true;

          let peak = this.player.position.y;
          for (let i = 0; i < frames(0.4); i += 1) {
            step();
            peak = Math.max(peak, this.player.position.y);
          }

          holding = false;
          alreadyPressed = false;
          for (let i = 0; i < frames(2); i += 1) {
            step();
            peak = Math.max(peak, this.player.position.y);
            if (grounded()) break;
          }
          peaks.push(Math.round(peak * 100) / 100);

          // Press again promptly, which is what continues the combo.
          for (let i = 0; i < 3; i += 1) step();
        }
        return peaks;
      },

      /**
       * Runs a combo through to the third jump, holding the button for
       * `holdSeconds`, and reports what the somersault did. A tap and a hold
       * give very different airtimes, and the rotation has to fit both.
       */
      simulateTripleJump: (dt = 1 / 60, holdSeconds = 0.4) => {
        let holding = false;
        let alreadyPressed = false;
        const stub = {
          move: { x: 0, y: -1 },
          look: { x: 0, y: 0 },
          isDown: (action: string) => action === 'jump' && holding,
          wasPressed: (action: string) => action === 'jump' && holding && !alreadyPressed,
          wasReleased: () => false,
        } as unknown as Input;

        const yaw = this.cameraRig.movementYaw;
        const frames = (seconds: number) => Math.max(1, Math.round(seconds / dt));
        const step = () => this.player.update(dt, stub, yaw);
        const grounded = () =>
          ['idle', 'walk', 'run', 'skid'].includes(this.player.stateName);

        this.player.teleport(this.world.spawn.clone(), this.world.spawnFacing);
        for (let i = 0; i < frames(1); i += 1) step();

        // The first two jumps of the combo, both held.
        for (let jump = 0; jump < 2; jump += 1) {
          holding = true;
          alreadyPressed = false;
          step();
          alreadyPressed = true;
          for (let i = 0; i < frames(0.4); i += 1) step();
          holding = false;
          for (let i = 0; i < frames(2); i += 1) {
            step();
            if (grounded()) break;
          }
          for (let i = 0; i < 3; i += 1) step();
        }

        // The third, held for the requested time.
        const bounds = new Box3();
        let peak = this.player.position.y;
        let lowestPart = Infinity;
        let lowestAt = { y: 0, progress: 0, state: '', frame: 0 };
        let frame = 0;
        let completedBeforeLanding = false;

        holding = true;
        alreadyPressed = false;
        step();
        alreadyPressed = true;

        const measure = () => {
          peak = Math.max(peak, this.player.position.y);
          this.player.object.updateMatrixWorld(true);
          bounds.setFromObject(this.player.object);
          frame += 1;
          if (!grounded() && bounds.min.y < lowestPart) {
            lowestPart = bounds.min.y;
            lowestAt = {
              y: Math.round(this.player.position.y * 1000) / 1000,
              progress: Math.round(this.player.somersaultProgress * 100) / 100,
              state: this.player.stateName,
              frame,
            };
          }
          if (this.player.somersaultProgress >= 1) completedBeforeLanding = true;
        };

        for (let i = 0; i < frames(holdSeconds); i += 1) {
          step();
          measure();
        }
        holding = false;
        for (let i = 0; i < frames(3); i += 1) {
          step();
          measure();
          if (grounded()) break;
        }

        return {
          stage: this.player.stateName,
          peak: Math.round(peak * 100) / 100,
          lowestPart: Math.round(lowestPart * 1000) / 1000,
          lowestAt,
          completedBeforeLanding,
        };
      },

      /**
       * Measures how well the feet keep hold of the ground.
       *
       * Three numbers matter. The lowest the sole gets, which should never go
       * below zero. How fast a planted foot slides across the world, which
       * should be near zero — anything else is the character skating. And the
       * cadence, so a fix for the skating cannot quietly turn the legs into a
       * blur.
       */
      measureGait: (dt = 1 / 60, seconds = 2, stick = 1) => {
        const stub = {
          move: { x: 0, y: -stick },
          look: { x: 0, y: 0 },
          isDown: () => false,
          wasPressed: () => false,
          wasReleased: () => false,
        } as unknown as Input;

        const yaw = this.cameraRig.movementYaw;
        const rig = this.player.rig;
        this.player.teleport(this.world.spawn.clone(), this.world.spawnFacing);

        const step = () => {
          this.player.update(dt, stub, yaw);
          this.player.object.updateMatrixWorld(true);
        };

        // Long enough to reach full speed and for the legs to be fully in the
        // solver's hands before anything is recorded.
        for (let i = 0; i < Math.round(1.5 / dt); i += 1) step();

        let lowest = Infinity;
        let worstSlip = 0;
        let slipTotal = 0;
        let slipFrames = 0;
        let kneeForward = Infinity;
        let placeError = 0;
        let contactFrames = 0;
        const previous: Record<string, Vector3 | null> = { left: null, right: null };
        const point = new Vector3();
        const hipPoint = new Vector3();
        const kneePoint = new Vector3();
        const anklePoint = new Vector3();

        const frames = Math.round(seconds / dt);
        for (let i = 0; i < frames; i += 1) {
          step();
          lowest = Math.min(lowest, this.player.position.y + lowestSole(rig));

          const gait = currentGaitPlan();
          for (const side of ['left', 'right'] as const) {
            const foot = side === 'left' ? gait.left : gait.right;
            const ankle = side === 'left' ? rig.ankleLeft : rig.ankleRight;
            if (!foot.planted) {
              previous[side] = null;
              continue;
            }
            contactFrames += 1;
            ankle.getWorldPosition(point);

            const hip = side === 'left' ? rig.hipLeft : rig.hipRight;
            const knee = side === 'left' ? rig.kneeLeft : rig.kneeRight;
            hip.getWorldPosition(hipPoint);
            knee.getWorldPosition(kneePoint);
            anklePoint.copy(point);
            // Measured in the character's own space, because the figure can
            // be facing any direction: the model looks along its own +Z.
            rig.root.worldToLocal(hipPoint);
            rig.root.worldToLocal(kneePoint);
            rig.root.worldToLocal(anklePoint);
            // A knee that bends the wrong way sits behind the line from the
            // hip to the ankle instead of in front of it.
            kneeForward = Math.min(
              kneeForward,
              kneePoint.z - (hipPoint.z + anklePoint.z) * 0.5,
            );

            // How far the foot ended up from where the plan asked for it.
            placeError = Math.max(
              placeError,
              Math.hypot(anklePoint.z - foot.z, anklePoint.y - ANKLE_TO_SOLE - foot.y),
            );

            const last = previous[side];
            if (last) {
              const slip = Math.hypot(point.x - last.x, point.z - last.z) / dt;
              worstSlip = Math.max(worstSlip, slip);
              slipTotal += slip;
              slipFrames += 1;
            }
            previous[side] = point.clone();
          }
        }

        const round = (value: number, places = 3) => {
          const scale = 10 ** places;
          return Math.round(value * scale) / scale;
        };

        return {
          speed: round(this.player.speed, 2),
          lowestSole: round(lowest),
          worstSlip: round(worstSlip, 2),
          averageSlip: round(slipFrames > 0 ? slipTotal / slipFrames : 0, 2),
          stepsPerSecond: round(currentGaitPlan().cadence, 2),
          strideSweep: round(currentGaitPlan().travel),
          contactShare: round(contactFrames / (frames * 2), 2),
          kneeForward: round(kneeForward),
          placeError: round(placeError, 4),
        };
      },

      /**
       * Checks that the poses still built by hand — the idle, the skid, the
       * landing crouch — keep both shoes on top of the floor rather than
       * through it. The skid used to put a foot ten centimetres under.
       */
      measureFloor: (dt = 1 / 60) => {
        let jumpHeld = false;
        const stick = { x: 0, y: 0 };
        const stub = {
          move: stick,
          look: { x: 0, y: 0 },
          isDown: (action: string) => action === 'jump' && jumpHeld,
          wasPressed: (action: string) => action === 'jump' && jumpHeld,
          wasReleased: () => false,
        } as unknown as Input;

        const yaw = this.cameraRig.movementYaw;
        const rig = this.player.rig;
        const run = (frames: number) => {
          let worst = Infinity;
          const states = new Set<string>();
          for (let i = 0; i < frames; i += 1) {
            this.player.update(dt, stub, yaw);
            this.player.object.updateMatrixWorld(true);
            states.add(this.player.stateName);
            if (this.player.stateName !== 'jump' && this.player.stateName !== 'fall') {
              worst = Math.min(worst, this.player.position.y + lowestSole(rig));
            }
          }
          return { worst: Math.round(worst * 10000) / 10000, states: [...states] };
        };

        const results: Record<string, unknown> = {};

        this.player.teleport(this.world.spawn.clone(), this.world.spawnFacing);
        stick.y = 0;
        results.idle = run(Math.round(1 / dt));

        stick.y = -1;
        run(Math.round(1.2 / dt));
        stick.y = 1;
        results.skid = run(Math.round(0.8 / dt));

        this.player.teleport(this.world.spawn.clone(), this.world.spawnFacing);
        stick.y = 0;
        run(Math.round(0.4 / dt));
        jumpHeld = true;
        run(3);
        jumpHeld = false;
        results.landing = run(Math.round(2 / dt));

        return results;
      },

      renderFrom: (dx: number, dy: number, dz: number, lookHeight: number): void => {
        const camera = this.engine.camera;
        const target = this.player.position;
        camera.position.set(target.x + dx, target.y + dy, target.z + dz);
        camera.lookAt(target.x, target.y + lookHeight, target.z);
        camera.updateMatrixWorld();
        this.engine.focusShadowsOn(target);
        this.engine.render(1 / 60);
      },
    };
  }
}

const game = new Game();

// Surfaced so the headless verification pass can inspect the running game.
(window as unknown as Record<string, unknown>).__letsgo = game;
