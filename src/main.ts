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
        let startedAfter = -1;
        let progressAtLanding = 0;
        let airborneFrames = 0;

        holding = true;
        alreadyPressed = false;
        step();
        alreadyPressed = true;

        const measure = () => {
          peak = Math.max(peak, this.player.position.y);
          // Only while actually off the ground: landing clears the
          // somersault, so reading it afterwards always says zero.
          if (!grounded()) {
            airborneFrames += 1;
            if (startedAfter < 0 && this.player.somersaultProgress > 0) {
              startedAfter = airborneFrames * dt;
            }
            progressAtLanding = this.player.somersaultProgress;
          }
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
          // How long after leaving the ground the rotation began, how long
          // the jump lasted, and how far round he was when he landed.
          startedAfter: Math.round(startedAfter * 1000) / 1000,
          airtime: Math.round(airborneFrames * dt * 1000) / 1000,
          progressAtLanding: Math.round(progressAtLanding * 100) / 100,
        };
      },

      /**
       * Drives each of the new moves at a fixed time step and reports what
       * came of it. Real key presses would depend on how fast this machine
       * renders, and these moves are decided inside a tenth of a second.
       *
       * Movement is given in world terms here (a camera yaw of zero), so the
       * numbers do not move about with the camera.
       */
      simulateMoveSet: (dt = 1 / 60) => {
        const stick = { x: 0, y: 0 };
        const held = new Set<string>();
        const pressed = new Set<string>();
        const stub = {
          move: stick,
          look: { x: 0, y: 0 },
          isDown: (action: string) => held.has(action),
          wasPressed: (action: string) => pressed.has(action),
          wasReleased: () => false,
        } as unknown as Input;

        const player = this.player;
        const step = () => {
          player.update(dt, stub, 0);
          pressed.clear();
        };
        const frames = (seconds: number) => Math.max(1, Math.round(seconds / dt));
        const tap = (action: string) => {
          held.add(action);
          pressed.add(action);
        };
        const round = (v: number, places = 2) => Math.round(v * 10 ** places) / 10 ** places;
        const reset = (x = 0, z = 10, facing = this.world.spawnFacing) => {
          held.clear();
          pressed.clear();
          stick.x = 0;
          stick.y = 0;
          player.teleport(new Vector3(x, 0, z), facing);
          for (let i = 0; i < frames(0.4); i += 1) step();
        };

        const results: Record<string, unknown> = {};

        // The lowest point of the whole figure, for the poses that hold
        // still: a crouch or a skid that buries a foot is easy to miss by
        // eye and obvious in a number.
        const floorBounds = new Box3();
        const lowestOver = (seconds: number, skip = 0) => {
          let lowest = Infinity;
          let at = '';
          for (let i = 0; i < frames(seconds); i += 1) {
            step();
            if (i < frames(skip)) continue;
            player.object.updateMatrixWorld(true);
            floorBounds.setFromObject(player.object);
            if (floorBounds.min.y < lowest) {
              lowest = floorBounds.min.y;
              at = `${player.stateName} ${round(i * dt, 2)}s`;
            }
          }
          return { lowestPart: round(lowest, 3), at };
        };

        // Crouching, and the braking skid, held still against the floor.
        reset();
        held.add('crouch');
        results.crouchFloor = lowestOver(0.8);

        reset();
        stick.y = -1;
        for (let i = 0; i < frames(4); i += 1) step();
        stick.y = 0;
        results.brakeFloor = lowestOver(0.35);
        stick.y = -1;
        for (let i = 0; i < frames(4); i += 1) step();
        stick.y = 0;
        // Once the pose has finished easing in, rather than during it.
        results.brakeSettled = lowestOver(0.35, 0.22);

        // A plain running jump, as the measure the others are read against.
        const runJump = () => {
          reset();
          stick.y = -1;
          for (let i = 0; i < frames(1.2); i += 1) step();
          const from = player.position.clone();
          tap('jump');
          step();
          let peak = player.position.y;
          for (let i = 0; i < frames(2.5); i += 1) {
            step();
            peak = Math.max(peak, player.position.y);
            if (player.stateName !== 'jump' && player.position.y <= 0.01 && i > 4) break;
          }
          held.delete('jump');
          return {
            distance: round(Math.hypot(player.position.x - from.x, player.position.z - from.z)),
            peak: round(peak),
          };
        };
        results.runningJump = runJump();

        // Long jump: crouch while running, then jump.
        {
          reset();
          stick.y = -1;
          for (let i = 0; i < frames(1.2); i += 1) step();
          const speedBefore = round(player.speed);
          held.add('crouch');
          step();
          const crouchState = player.stateName;
          const from = player.position.clone();
          tap('jump');
          step();
          const kind = player.stateName;
          let peak = player.position.y;
          for (let i = 0; i < frames(2.5); i += 1) {
            step();
            peak = Math.max(peak, player.position.y);
            if (player.position.y <= 0.01 && i > 4) break;
          }
          results.longJump = {
            crouchState,
            state: kind,
            speedBefore,
            distance: round(Math.hypot(player.position.x - from.x, player.position.z - from.z)),
            peak: round(peak),
          };
        }

        // Backflip: crouch standing still, then jump.
        {
          reset();
          held.add('crouch');
          for (let i = 0; i < frames(0.4); i += 1) step();
          const crouchState = player.stateName;
          const from = player.position.clone();
          const facing = player.facing;
          tap('jump');
          step();
          const kind = player.stateName;
          let peak = player.position.y;
          let turned = 0;
          let lowestPart = Infinity;
          const bounds = new Box3();
          for (let i = 0; i < frames(2.5); i += 1) {
            step();
            peak = Math.max(peak, player.position.y);
            turned = Math.max(turned, player.somersaultProgress);
            // Nothing should swing through the floor on the way over.
            if (player.position.y > 0.05) {
              player.object.updateMatrixWorld(true);
              bounds.setFromObject(player.object);
              lowestPart = Math.min(lowestPart, bounds.min.y);
            }
            if (player.position.y <= 0.01 && i > 4) break;
          }
          // Positive means he ended up behind where he started, in the
          // direction he was facing.
          const dx = player.position.x - from.x;
          const dz = player.position.z - from.z;
          const backwards = -(dx * Math.sin(facing) + dz * Math.cos(facing));
          results.backflip = {
            crouchState,
            state: kind,
            peak: round(peak),
            backwards: round(backwards),
            turned: round(turned),
            lowestPart: round(lowestPart, 3),
          };
        }

        // Wall kick: jump at a wall, then jump again off it.
        {
          reset(-14, -6, Math.PI / 2);
          stick.x = 1;
          for (let i = 0; i < frames(0.5); i += 1) step();
          tap('jump');
          step();
          let slid = false;
          let kickFrom = 0;
          let kickX = 0;
          let kicked = false;
          let peak = 0;
          const states: string[] = [];
          for (let i = 0; i < frames(2.5); i += 1) {
            step();
            const name = player.stateName;
            if (states[states.length - 1] !== name) states.push(name);
            if (!kicked && name === 'wall-slide') {
              slid = true;
              kickFrom = player.position.y;
              kickX = player.position.x;
              tap('jump');
              kicked = true;
              peak = player.position.y;
              continue;
            }
            if (kicked) peak = Math.max(peak, player.position.y);
            if (kicked && player.position.y <= 0.01) break;
          }
          results.wallKick = {
            touchedWall: slid,
            kicked,
            states,
            gained: round(peak - kickFrom),
            movedAway: round(Math.abs(player.position.x - kickX)),
          };
        }

        // The braking skid: let go at a run.
        {
          reset();
          stick.y = -1;
          for (let i = 0; i < frames(4); i += 1) step();
          const speedBefore = round(player.speed);
          const from = player.position.clone();
          stick.y = 0;
          const states: string[] = [];
          let stopped = 0;
          for (let i = 0; i < frames(2); i += 1) {
            step();
            const name = player.stateName;
            if (states[states.length - 1] !== name) states.push(name);
            stopped = i * dt;
            if (player.speed < 0.05) break;
          }
          results.brake = {
            speedBefore,
            states,
            slideDistance: round(
              Math.hypot(player.position.x - from.x, player.position.z - from.z),
            ),
            seconds: round(stopped),
          };
        }

        reset();
        return results;
      },

      /**
       * How far the braking skid carries him after running for various
       * lengths of time. Full speed arrives in about a third of a second, so
       * this is the only way to see whether the slide answers how long he
       * has been running or merely how fast he is going.
       */
      measureBraking: (dt = 1 / 60) => {
        const stick = { x: 0, y: 0 };
        const stub = {
          move: stick,
          look: { x: 0, y: 0 },
          isDown: () => false,
          wasPressed: () => false,
          wasReleased: () => false,
        } as unknown as Input;
        const player = this.player;
        const step = () => player.update(dt, stub, 0);
        const frames = (seconds: number) => Math.max(1, Math.round(seconds / dt));
        const round = (v: number, places = 2) => Math.round(v * 10 ** places) / 10 ** places;

        return [0.5, 1, 2, 3, 5].map((seconds) => {
          stick.x = 0;
          stick.y = 0;
          player.teleport(new Vector3(0, 0, 34), Math.PI);
          for (let i = 0; i < frames(0.6); i += 1) step();

          stick.y = -1;
          for (let i = 0; i < frames(seconds); i += 1) step();
          const speed = round(player.speed);
          const from = player.position.clone();

          stick.y = 0;
          let braked = false;
          for (let i = 0; i < frames(3); i += 1) {
            step();
            if (player.stateName === 'brake') braked = true;
            if (player.speed < 0.05) break;
          }
          return {
            ran: seconds,
            speed,
            slide: round(Math.hypot(player.position.x - from.x, player.position.z - from.z)),
            skidded: braked,
          };
        });
      },

      /**
       * The two ways over a top edge.
       *
       * Each is tried twice: dropped beside the edge with his hands at it,
       * which is the case the catch has to recognise, and approached the way
       * it would be in play — jumped at for the platform, kicked up to for
       * the wall.
       */
      simulateLedges: (dt = 1 / 60) => {
        const stick = { x: 0, y: 0 };
        const held = new Set<string>();
        const pressed = new Set<string>();
        const stub = {
          move: stick,
          look: { x: 0, y: 0 },
          isDown: (a: string) => held.has(a),
          wasPressed: (a: string) => pressed.has(a),
          wasReleased: () => false,
        } as unknown as Input;

        const player = this.player;
        const step = () => {
          player.update(dt, stub, 0);
          pressed.clear();
        };
        const frames = (seconds: number) => Math.max(1, Math.round(seconds / dt));
        const round = (v: number, places = 2) => Math.round(v * 10 ** places) / 10 ** places;
        const tap = (a: string) => {
          held.add(a);
          pressed.add(a);
        };
        const place = (x: number, y: number, z: number, facing: number) => {
          held.clear();
          pressed.clear();
          stick.x = 0;
          stick.y = 0;
          player.teleport(new Vector3(x, y, z), facing);
        };

        // Watches until he is standing still on something, or time runs out.
        const settle = (seconds: number) => {
          const states: string[] = [];
          for (let i = 0; i < frames(seconds); i += 1) {
            step();
            const name = player.stateName;
            if (states[states.length - 1] !== name) states.push(name);
          }
          return { states, landedAt: round(player.position.y), state: player.stateName };
        };

        const results: Record<string, unknown> = {};

        // Dropped beside the top of a wall, hands at the edge.
        // The corridor's right-hand wall faces -x, its face at x = -12.75.
        place(-12.7, 5.9, -6, Math.PI / 2);
        results.wallTopFromHang = settle(2);

        // Dropped beside the platform, which is 5.5 across at x 15, z 12, so
        // its near face in z is at 9.25.
        place(15, 1.5, 8.6, 0);
        results.platformFromHang = settle(2.2);

        // Jumped at the platform from the floor, which is how it would be met.
        place(15, 0, 6.2, 0);
        for (let i = 0; i < frames(0.4); i += 1) step();
        stick.y = 1;
        for (let i = 0; i < frames(0.5); i += 1) step();
        // Held, not tapped: letting go a frame later cuts the jump to a hop.
        tap('jump');
        for (let i = 0; i < frames(0.32); i += 1) step();
        held.delete('jump');
        const seen = new Set<string>();
        for (let i = 0; i < frames(2.4); i += 1) {
          step();
          seen.add(player.ledgeDiagnostics.reason);
          if (player.stateName === 'mantle' || player.stateName === 'ledge-swing') break;
        }
        stick.x = 0;
        stick.y = 0;
        const rest = settle(1.6);
        results.platformJumped = { ...rest, saw: [...seen] };

        // Kicked up the corridor to the top of a wall, alternating sides.
        place(-14, 0, -6, Math.PI / 2);
        for (let i = 0; i < frames(0.4); i += 1) step();
        stick.x = 1;
        for (let i = 0; i < frames(0.4); i += 1) step();
        tap('jump');
        for (let i = 0; i < frames(0.3); i += 1) step();
        held.delete('jump');
        const climbStates: string[] = [];
        let kicks = 0;
        let holdFor = 0;
        for (let i = 0; i < frames(6); i += 1) {
          step();
          const name = player.stateName;
          if (climbStates[climbStates.length - 1] !== name) climbStates.push(name);
          if (holdFor > 0) {
            holdFor -= 1;
            if (holdFor === 0) held.delete('jump');
          } else if (name === 'wall-slide') {
            tap('jump');
            holdFor = frames(0.3);
            kicks += 1;
            // Push toward the other wall for the next one.
            stick.x = -stick.x;
          }
          if (name === 'ledge-swing' || name === 'mantle') break;
        }
        stick.x = 0;
        stick.y = 0;
        const after = settle(1.8);
        results.wallTopByKicking = {
          kicks,
          states: [...climbStates, ...after.states],
          landedAt: after.landedAt,
          state: after.state,
        };

        place(0, 0, 10, this.world.spawnFacing);
        for (let i = 0; i < frames(0.4); i += 1) step();
        return results;
      },

      /** Looks straight down from a point, for checking where surfaces are. */
      probe: (x: number, y: number, z: number, drop = 8) => {
        const hit = this.collision.groundProbe(new Vector3(x, y, z), drop);
        return hit ? { y: Math.round(hit.y * 1000) / 1000, normalY: Math.round(hit.normal.y * 100) / 100 } : null;
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
