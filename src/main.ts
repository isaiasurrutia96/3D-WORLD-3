/**
 * LetsGo — Milestone: movement.
 *
 * The same figure as the last milestone, still in one neutral material, now
 * running, jumping and climbing on a bare test ground. Nothing here is
 * decoration: the floor markings show speed, the blocks show jump height and
 * distance, and the ladder up the box shows climbing and topping out.
 */

import './styles.css';
import { Box3, Mesh, Object3D, Vector3 } from 'three';
import { Engine } from './core/Engine.ts';
import { CameraRig } from './core/CameraRig.ts';
import { loadSettings, saveSettings, type UserSettings } from './core/Settings.ts';
import { Input, type ActionName } from './input/Input.ts';
import { CollisionWorld } from './physics/CollisionWorld.ts';
import { Player } from './player/Player.ts';
import { TUNING } from './player/Tuning.ts';
import {
  TouchControls,
  suppressPageGestures,
  wantsTouchControls,
} from './ui/TouchControls.ts';
import { ARM } from './player/PlayerModel.ts';
import { ParticleEffects } from './world/Effects.ts';
import { TEST_FACING, TEST_GROUND, buildSlab } from './world/Slab.ts';
import type { VoxelIslandWorld } from './world/VoxelIsland.ts';
import type { SkyCircuit } from './racing/SkyCircuit.ts';
import { buildBlockShowcase, type BlockShowcase, type ShowcaseFrame } from './world/BlockShowcase.ts';
import { buildRacingScene, CIRCUIT_RANGE } from './racing/RacingScene.ts';
import { KartMode } from './racing/KartMode.ts';
import {
  COURSE_MARKS,
  COURSE_POOL,
  COURSE_SPAWN,
  COURSE_FACING,
  buildCourse,
  type CourseWorld,
} from './world/Course.ts';
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
  /** Whether this is being played with fingers rather than a keyboard. */
  private touch = false;
  private touchControls: TouchControls | null = null;
  private releaseGestures: (() => void) | null = null;
  private readonly collision = new CollisionWorld();
  private readonly effects: ParticleEffects;

  /**
   * The island is the game. The yard on a bare slab is kept, behind
   * `?arena`, as the place the movement tests run: it has the walls, edges,
   * ladders and gaps those tests are written against, and the verification
   * pass opens it that way. Nobody playing sees it.
   */
  private readonly arena = new URLSearchParams(window.location.search).has('arena');
  private readonly world: { triangleCount: number; hasObstacles?: boolean };
  private readonly course: Pick<CourseWorld, 'carryables' | 'checkpoints' | 'triangleCount'> & {
    water: { update(time: number): void };
  };
  private racingScene: ReturnType<typeof buildRacingScene> | null = null;
  /** The go-kart. Not in the scene for now; kept for when racing returns. */
  private kartMode: KartMode | null = null;
  /** The block island, when it is the world. */
  private voxel: VoxelIslandWorld | null = null;
  /** The race circuit beside the island, reached by its bridge. */
  private circuit: SkyCircuit | null = null;
  /** The eight blocks and the character beside them, when that is the world. */
  private showcase: BlockShowcase | null = null;
  /** Which way the showcase camera looks from, round the blocks. */
  private showcaseYaw = 0.12;
  private showcasePitch = 0.22;
  /** How far out the showcase camera is: 1 just fits everything. */
  private showcaseZoom = 1;
  /** The group the camera is on, or null for all of them. */
  private showcaseFocus: ShowcaseFrame | null = null;
  /** Whether the copies of him beside the other groups have been made. */
  private showcaseCopies = false;
  /**
   * `?view=overhead` or `?view=angled` holds the camera where one of the
   * two reference pictures was taken from, to compare the island with it.
   */
  private readonly fixedView = new URLSearchParams(window.location.search).get('view');
  private readonly spawn: Vector3;
  private readonly spawnFacing: number;
  private readonly player: Player;
  private readonly cameraRig: CameraRig;

  private running = true;
  private booted = false;

  constructor() {
    this.engine = new Engine(container as HTMLElement, this.settings.quality);
    this.engine.setStudioMode(this.arena);
    this.effects = new ParticleEffects(this.engine.scene);

    if (this.arena) {
      this.world = buildSlab(this.engine.scene, this.collision, {
        holes: [{ x: COURSE_POOL.x, z: COURSE_POOL.z, half: COURSE_POOL.half }],
      });
      this.course = buildCourse(this.engine.scene, this.collision);
      this.spawn = COURSE_SPAWN;
      this.spawnFacing = COURSE_FACING;
    } else {
      // Eight blocks and the character beside them, for comparing sizes.
      // Nothing else: the block island (world/VoxelIsland.ts), its bridge
      // and the circuit (racing/SkyCircuit.ts) are kept in the code and not
      // put in the scene; to bring them back, build them here as before with
      // buildVoxelIsland and buildSkyCircuit.
      // One block at the chosen size (0.146×), on its own. The comparison row
      // of eight sizes is buildBlockShowcase(scene) without { single: true }.
      // `?blocks=rounded` shows every block fully rounded, for comparing.
      const allRounded = new URLSearchParams(window.location.search).get('blocks') === 'rounded';
      const showcase = buildBlockShowcase(this.engine.scene, { single: true, allRounded });
      this.showcase = showcase;
      // A three-quarter view from a little above, so the top and two sides
      // all show and it reads as a cube.
      this.showcaseYaw = 0.62;
      this.showcasePitch = 0.5;
      // A narrower lens from further off: up close a wide one bends a small
      // block so its bottom looks narrower than its top.
      this.engine.camera.fov = 28;
      this.engine.camera.updateProjectionMatrix();
      this.engine.setFogScale(0);
      this.engine.sky.setLook({ top: '#4aa6fb', horizon: '#7cc4fc', bottom: '#8ccefc' });
      this.engine.sky.setCloudsVisible(false);
      this.engine.setSunDirection(new Vector3(-0.5, 0.75, 0.42));
      this.world = { triangleCount: showcase.triangleCount };
      this.course = {
        carryables: [],
        checkpoints: [showcase.characterAt.clone()],
        triangleCount: showcase.triangleCount,
        water: { update() {} },
      };
      this.spawn = showcase.characterAt.clone();
      // Facing the camera, so he is seen from the front beside the blocks.
      this.spawnFacing = 0.35;
    }

    this.player = new Player(
      this.collision,
      this.spawn,
      {
        onLand: (position, strength) => {
          if (strength > 0.25) this.effects.dust(position, strength);
        },
      },
      // Still the plain clay figure: the form is settled, the movement is not.
      { plain: true },
    );
    this.player.facing = this.spawnFacing;
    this.player.carryables = this.course.carryables;
    this.engine.scene.add(this.player.object);

    this.cameraRig = new CameraRig(this.engine.camera, this.collision);
    this.cameraRig.reset(this.player);

    this.hud = new Hud(container as HTMLElement);
    this.input.attach(this.engine.renderer.domElement);

    // On a phone the controls are on the glass, the keyboard chart is of no
    // use to anyone, and there is no pointer to lock.
    // The showcase has nothing to steer: no touch controls, no corner menu,
    // no keyboard message.
    if (this.showcase) {
      document.body.classList.add('is-showcase');
      this.attachShowcaseLook(this.engine.renderer.domElement);
      if (this.showcase.groups.length > 1) this.attachShowcaseSizes(container as HTMLElement);
    }
    this.touch = wantsTouchControls() && !this.showcase;
    if (this.touch) {
      document.documentElement.classList.add('is-touch');
      document.body.classList.add('is-touch');
      this.touchControls = new TouchControls(this.input, container as HTMLElement);
      this.releaseGestures = suppressPageGestures();
    } else if (!this.showcase) {
      this.input.setPointerLockWanted(true);
    }

    window.addEventListener('keydown', this.onGlobalKey);

    // The corner buttons: the camera view and the graphics quality.
    if (this.settings.cameraView === 'isometric') this.cameraRig.setIsometric(true, this.player);
    this.hud.onMenu({
      view: () => this.toggleView(),
      quality: () => {
        const order = ['low', 'medium', 'high'] as const;
        this.setQuality(order[(order.indexOf(this.settings.quality) + 1) % order.length]);
      },
    });
    this.refreshMenu();

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

  /**
   * The marked pad he last stood on, which is where a retry puts him.
   *
   * The last one, not the furthest one. The course used to be a single
   * route, so a pad further along it was always progress; the yard has no
   * order to it, and coming back to somewhere he has already been is as
   * much a place to be put back to as anywhere new.
   */
  private reachedPad = 0;

  /**
   * The boxes everything solid is built from.
   *
   * A building is drawn as one mesh however many pieces it has, so the
   * mesh's own box is the building's and says nothing about where its
   * walls are. The pieces are kept on the mesh for this.
   */
  private solidBoxes(): Box3[] {
    const out: Box3[] = [];
    for (const root of this.collision.solids) {
      root.traverse((object) => {
        if (!(object instanceof Mesh)) return;
        const pieces =
          (object.userData.blocks as Box3[] | undefined) ??
          (object.userData.bands as Box3[] | undefined);
        if (pieces) out.push(...pieces);
        else out.push(new Box3().setFromObject(object));
      });
    }
    return out;
  }

  private lastPad(): Vector3 {
    return this.course.checkpoints[this.reachedPad] ?? this.spawn;
  }

  private trackProgress(): void {
    const pads = this.course.checkpoints;
    for (let i = 0; i < pads.length; i += 1) {
      if (i === this.reachedPad) continue;
      const pad = pads[i];
      const reach =
        Math.abs(this.player.position.y - pad.y) < 1.5 &&
        Math.hypot(this.player.position.x - pad.x, this.player.position.z - pad.z) < 2.4;
      if (reach) this.reachedPad = i;
    }
  }

  private onGlobalKey = (event: KeyboardEvent): void => {
    if (event.code === 'F3') {
      event.preventDefault();
      this.hud.toggleStats();
    }
    // R is reserved for picking things up, so resetting moved off it.
    //
    // Plain Backspace returns to the last marked pad passed, which is what
    // makes a missed jump cost a few seconds rather than the whole run.
    // Holding shift goes back to the very start instead.
    if (event.code === 'Backspace') {
      event.preventDefault();
      // From the kart, Backspace brings it home and puts him on his feet.
      if (this.kartMode?.driving) {
        this.kartMode.sendHome();
        this.kartMode.driving = false;
        this.player.object.visible = true;
      }
      const target = event.shiftKey ? this.spawn : this.lastPad();
      this.player.teleport(target, event.shiftKey ? this.spawnFacing : this.player.facing);
      this.cameraRig.reset(this.player);
    }
    if (event.code === 'Digit1' || event.code === 'Digit2' || event.code === 'Digit3') {
      this.setQuality(({ Digit1: 'low', Digit2: 'medium', Digit3: 'high' } as const)[event.code as 'Digit1' | 'Digit2' | 'Digit3']);
    }
    if (event.code === 'KeyV' && !event.repeat) this.toggleView();
  };

  /** Changes the graphics quality, keeps it for next time, and says so. */
  private setQuality(quality: 'low' | 'medium' | 'high'): void {
    this.settings = { ...this.settings, quality };
    this.engine.applyQuality(quality);
    this.engine.setStudioMode(this.arena);
    saveSettings(this.settings);
    this.refreshMenu();
  }

  /** Swaps between the chase camera and the isometric view, and keeps it. */
  private toggleView(): void {
    const cameraView = this.cameraRig.isometric ? 'follow' : 'isometric';
    this.cameraRig.setIsometric(cameraView === 'isometric', this.player);
    this.settings = { ...this.settings, cameraView };
    saveSettings(this.settings);
    this.refreshMenu();
  }

  private refreshMenu(): void {
    this.hud.setMenu(this.cameraRig.isometric ? 'isometric' : 'follow', this.settings.quality, !this.touch);
  }

  /**
   * Moves whoever is being played this frame: the character on foot, or the
   * kart he is driving. The one button that does both jobs — climb in, get
   * out — is read here, before either of them sees it, so a single press can
   * never both step out of the kart and pick up a crate.
   */
  private updateMovement(delta: number): void {
    const kart = this.kartMode;
    if (!kart) {
      this.player.update(delta, this.input, this.cameraRig.movementYaw, this.cameraRig.lookPitch);
      return;
    }
    const now = performance.now();
    let swapped = false;
    if (this.input.wasPressed('grab')) {
      if (kart.driving) {
        swapped = kart.exit(this.player, now);
      } else if (!this.player.carried && kart.isNear(this.player)) {
        swapped = kart.enter(this.player);
        if (!swapped) {
          kart.message = this.player.onGround ? 'Come closer to the kart' : 'Land before getting in';
        }
      }
    }
    if (kart.driving) {
      kart.update(delta, this.input, this.player);
    } else {
      if (!swapped) {
        this.player.update(delta, this.input, this.cameraRig.movementYaw, this.cameraRig.lookPitch);
      }
      kart.update(delta, this.input, this.player);
    }
    this.hud.setKart(kart.driving ? kart.mph : null);
    this.touchControls?.setDriving(kart.driving);
  }

  /**
   * Looking round the showcase: drag with a finger or the mouse to turn the
   * camera round the blocks and tilt it; pinch or scroll to come closer or
   * go further out. Nothing else on the page moves.
   */
  private attachShowcaseLook(element: HTMLElement): void {
    element.style.touchAction = 'none';
    element.style.cursor = 'grab';
    this.releaseGestures = suppressPageGestures();
    const pointers = new Map<number, { x: number; y: number }>();
    let pinch = 0;
    const turn = (dx: number, dy: number) => {
      // A drag across the whole width of the screen turns half way round.
      const perPixel = Math.PI / Math.max(320, Math.min(window.innerWidth, 1400));
      this.showcaseYaw -= dx * perPixel;
      this.showcasePitch = Math.max(-0.4, Math.min(1.45, this.showcasePitch + dy * perPixel));
    };
    const zoomBy = (factor: number) => {
      // Close enough to see the creases, far enough to see the pair small.
      this.showcaseZoom = Math.max(0.62, Math.min(2.4, this.showcaseZoom * factor));
    };
    const spread = () => {
      const [a, b] = [...pointers.values()];
      return Math.hypot(a.x - b.x, a.y - b.y);
    };
    element.addEventListener('pointerdown', (event) => {
      element.setPointerCapture?.(event.pointerId);
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (pointers.size === 2) pinch = spread();
      element.style.cursor = 'grabbing';
      event.preventDefault();
    });
    element.addEventListener('pointermove', (event) => {
      const last = pointers.get(event.pointerId);
      if (!last) return;
      const now = { x: event.clientX, y: event.clientY };
      if (pointers.size === 1) {
        turn(now.x - last.x, now.y - last.y);
      }
      pointers.set(event.pointerId, now);
      if (pointers.size === 2) {
        const d = spread();
        if (pinch > 0 && d > 0) zoomBy(pinch / d);
        pinch = d;
      }
      event.preventDefault();
    });
    const up = (event: PointerEvent) => {
      pointers.delete(event.pointerId);
      if (pointers.size < 2) pinch = 0;
      if (pointers.size === 0) element.style.cursor = 'grab';
    };
    element.addEventListener('pointerup', up);
    element.addEventListener('pointercancel', up);
    element.addEventListener('lostpointercapture', up);
    element.addEventListener(
      'wheel',
      (event) => {
        zoomBy(Math.exp(event.deltaY * 0.0012));
        event.preventDefault();
      },
      { passive: false },
    );
  }

  /**
   * A row of buttons across the top: All, and one per size, each pointing
   * the camera at that group. Dragging and zooming then work round it.
   */
  private attachShowcaseSizes(container: HTMLElement): void {
    const show = this.showcase;
    if (!show) return;
    const bar = document.createElement('div');
    bar.className = 'showcase-sizes';
    const choices: Array<{ name: string; frame: ShowcaseFrame | null }> = [
      { name: 'All', frame: null },
      ...show.groups.map((g) => ({ name: g.name, frame: g as ShowcaseFrame })),
    ];
    const buttons: HTMLButtonElement[] = [];
    for (const choice of choices) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'showcase-sizes__button';
      button.textContent = choice.name;
      // Acted on the moment the finger or the mouse goes down, not on the
      // click that follows: a phone drops a click whenever the finger moves
      // even slightly, which made a button need several taps.
      const choose = (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        this.showcaseFocus = choice.frame;
        this.showcaseZoom = 1;
        for (const b of buttons) b.classList.toggle('is-on', b === button);
      };
      button.addEventListener('pointerdown', choose);
      // A keyboard (Enter or Space on a focused button) still works.
      button.addEventListener('click', (event) => {
        if ((event as MouseEvent).detail === 0) choose(event);
      });
      buttons.push(button);
      bar.appendChild(button);
    }
    buttons[0].classList.add('is-on');
    container.appendChild(bar);
  }

  /**
   * Points the camera at the showcase from its current angle, far enough
   * off that the blocks and the character both fit on any screen shape.
   */
  private frameShowcase(zoom = 1): void {
    if (!this.showcase) return;
    const show = this.showcaseFocus ?? this.showcase;
    const camera = this.engine.camera;
    // Fit a ball round everything inside the narrower of the two angles of
    // view, so it fits from any direction on any screen shape.
    const e = show.extent;
    const radius = Math.hypot(e.width, e.height, e.depth) / 2;
    const vertical = (camera.fov * Math.PI) / 360;
    const horizontal = Math.atan(Math.tan(vertical) * Math.max(0.2, camera.aspect));
    const distance = (radius / Math.sin(Math.min(vertical, horizontal))) * 1.08 * zoom;
    const cp = Math.cos(this.showcasePitch);
    camera.position.set(
      show.centre.x + Math.sin(this.showcaseYaw) * cp * distance,
      show.centre.y + Math.sin(this.showcasePitch) * distance,
      show.centre.z + Math.cos(this.showcaseYaw) * cp * distance,
    );
    camera.lookAt(show.centre);
    camera.updateMatrixWorld();
  }

  /** Holds the camera at one of the reference views, if one was asked for. */
  private applyFixedView(name: string | null = this.fixedView): boolean {
    const view = name === 'overhead' || name === 'angled' ? this.voxel?.views[name] : undefined;
    if (!view) return false;
    const camera = this.engine.camera;
    camera.fov = view.fov;
    camera.position.copy(view.from);
    camera.lookAt(view.at);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    return true;
  }

  private frame = (): void => {
    if (!this.running) return;
    requestAnimationFrame(this.frame);

    const delta = Math.min(MAX_DELTA, this.engine.clock.getDelta());

    this.input.update(this.settings.cameraSensitivity, this.settings.invertCameraY);
    if (this.input.wasPressed('togglePointerLock')) this.input.togglePointerLock();
    this.cameraRig.applyLook(this.input.look.x, this.input.look.y);
    if (this.showcase) {
      // He stands still where he floats; the camera frames him and the
      // blocks, and dragging the view turns it round them.
      this.player.poseStanding(delta);
      // With one block on its own there is no figure to compare it with.
      if (this.showcase.groups.length === 1) this.player.object.visible = false;
      // An identical figure beside every other group: copies of him, made
      // once he has taken his standing pose, so all seven stand the same.
      if (!this.showcaseCopies && this.engine.clock.elapsedTime > 0.25) {
        this.showcaseCopies = true;
        for (const group of this.showcase.groups) {
          if (group === this.showcase.baseline) continue;
          const copy = this.player.object.clone(true);
          copy.name = `figure beside ${group.name}`;
          copy.position.copy(group.characterAt);
          copy.rotation.y = this.spawnFacing;
          this.engine.scene.add(copy);
        }
      }
      this.showcaseYaw -= this.input.look.x;
      this.showcasePitch = Math.max(-0.4, Math.min(1.35, this.showcasePitch + this.input.look.y));
      this.frameShowcase(this.showcaseZoom);
    } else {
      this.updateMovement(delta);
      this.cameraRig.update(delta, this.player);
    }
    const held = this.applyFixedView();
    // Only the circuits near enough to be seen are drawn.
    this.racingScene?.update(
      this.player.position.x,
      this.player.position.z,
      Math.min(CIRCUIT_RANGE, this.engine.camera.far),
    );
    this.trackProgress();

    for (const carryable of this.course.carryables) carryable.update(delta, this.collision);
    this.course.water.update(this.engine.clock.elapsedTime);
    this.effects.update(delta);
    // From a reference view the whole island is in the picture, so the
    // shadows are centred on it and not on him.
    const view = held && (this.fixedView === 'overhead' || this.fixedView === 'angled') ? this.voxel?.views[this.fixedView] : undefined;
    const showcaseAt = this.showcase ? (this.showcaseFocus ?? this.showcase).centre : null;
    this.engine.focusShadowsOn(view ? view.at : (showcaseAt ?? this.player.position));

    // What the screen looks like follows the camera, not the character. He
    // can be treading water with his head out while the camera sits below
    // the surface behind him, and it is the camera that has to be underwater
    // for the scene to look like it.
    this.engine.setUnderwater(
      this.collision.waterAt(this.engine.camera.position) !== null,
    );
    this.engine.render(delta);
    // The first frame is up: the message that stood in for it can go.
    if (!this.booted) {
      this.booted = true;
      document.getElementById('boot')?.remove();
    }

    const offer = this.currentOffer();
    // At a keyboard the prompt names the key. The throw is left off it:
    // with something in his arms the whole time, it would never go away.
    this.hud.setPrompt(offer && offer.label !== 'Throw' ? `${offer.key} — ${offer.label}` : null);
    // On a phone there is no key to name, so the offer is a button.
    this.touchControls?.setContext(offer?.action ?? null, offer?.label ?? '');

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

  /**
   * The one thing a button would do here, if there is one.
   *
   * Only ever an offer. The ladder below an edge is the case that needs it:
   * attaching him to it because he walked near the top would make the edge
   * beside a ladder impossible to simply walk off.
   */
  private currentOffer(): { action: ActionName; key: string; label: string } | null {
    const kart = this.kartMode;
    if (kart?.driving) {
      const said = kart.currentMessage(performance.now());
      const stopped = Math.abs(kart.state.speed) <= 0.75;
      return { action: 'grab', key: 'R', label: said || (stopped ? 'Get out' : 'Stop to get out') };
    }
    if (kart && !this.player.carried && kart.isNear(this.player)) {
      const said = kart.currentMessage(performance.now());
      return { action: 'grab', key: 'R', label: said || 'Drive' };
    }
    if (this.player.ladderToClimbDown()) return { action: 'climbDown', key: 'G', label: 'Climb down' };
    if (this.player.carried) return { action: 'grab', key: 'R', label: 'Throw' };
    if (this.player.findCarryTarget()) return { action: 'grab', key: 'R', label: 'Pick up' };
    return null;
  }

  /** Read-only handles, plus capture helpers, for the verification pass. */
  get debug() {
    return {
      engine: this.engine,
      player: this.player,
      input: this.input,
      cameraRig: this.cameraRig,
      kart: this.kartMode,
      showcase: this.showcase,
      showcaseView: () => ({ yaw: this.showcaseYaw, pitch: this.showcasePitch, zoom: this.showcaseZoom }),
      spawn: this.spawn,
      touch: this.touch,
      touchControls: this.touchControls,
      /** Lets go of the page's gesture handling, for a test that wants to. */
      releaseGestures: this.releaseGestures,
      testGround: TEST_GROUND,
      testFacing: TEST_FACING,
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
          // No thumb here: these drive the controller as a keyboard does.
          chargeOf: () => null,
          chargingAction: () => null,
          chargeNow: () => 0,
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
          // No thumb here: these drive the controller as a keyboard does.
          chargeOf: () => null,
          chargingAction: () => null,
          chargeNow: () => 0,
        } as unknown as Input;

        const yaw = this.cameraRig.movementYaw;
        const frames = (seconds: number) => Math.max(1, Math.round(seconds / dt));
        const step = () => this.player.update(dt, stub, yaw);
        const grounded = () =>
          ['idle', 'walk', 'run', 'skid'].includes(this.player.stateName);

        this.player.teleport(TEST_GROUND.clone(), TEST_FACING);
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
          // No thumb here: these drive the controller as a keyboard does.
          chargeOf: () => null,
          chargingAction: () => null,
          chargeNow: () => 0,
        } as unknown as Input;

        const yaw = this.cameraRig.movementYaw;
        const frames = (seconds: number) => Math.max(1, Math.round(seconds / dt));
        const step = () => this.player.update(dt, stub, yaw);
        const grounded = () =>
          ['idle', 'walk', 'run', 'skid'].includes(this.player.stateName);

        this.player.teleport(TEST_GROUND.clone(), TEST_FACING);
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
       * The block island: that he stands where the game starts, that every
       * column of it is solid exactly at its top, that past its edge there is
       * nothing, that he can get up onto the terrace and the high step and
       * back down, that
       * tree trunks and rocks stop him, that he can step down into the pool
       * and back out, and that running off the edge puts him back on his
       * feet on the island. Read from the island's own description.
       */
      simulateIsland: (dt = 1 / 60) => {
        const island = this.voxel;
        if (!island) return { error: 'not the block island' };
        const stick = { x: 0, y: 0 };
        const held = new Set<string>();
        const pressed = new Set<string>();
        const stub = {
          move: stick,
          look: { x: 0, y: 0 },
          isDown: (a: string) => held.has(a),
          wasPressed: (a: string) => pressed.has(a),
          wasReleased: () => false,
          chargeOf: () => null,
          chargingAction: () => null,
          chargeNow: () => 0,
        } as unknown as Input;
        const player = this.player;
        const frames = (seconds: number) => Math.max(1, Math.round(seconds / dt));
        const step = () => {
          player.update(dt, stub, 0);
          pressed.clear();
        };
        const round = (v: number, places = 2) => Math.round(v * 10 ** places) / 10 ** places;
        const results: Record<string, unknown> = {};
        const down = (x: number, z: number, from = 6) => this.collision.groundProbe(new Vector3(x, from, z), from + 30);
        const put = (x: number, z: number, facing = 0) => {
          held.clear();
          stick.x = 0;
          stick.y = 0;
          player.teleport(new Vector3(x, (island.topAt(x, z) ?? 0) + 0.05, z), facing);
          for (let i = 0; i < frames(0.4); i += 1) step();
        };
        /** Walks at a point, jumping when told to; true if he got within 0.3 m. */
        const walkTo = (x: number, z: number, seconds: number, jumpEvery = 0) => {
          let highest = player.position.y;
          for (let i = 0; i < frames(seconds); i += 1) {
            const dx = x - player.position.x;
            const dz = z - player.position.z;
            const far = Math.hypot(dx, dz);
            if (far < 0.3) {
              stick.x = 0;
              stick.y = 0;
              return { arrived: true, highest };
            }
            const pace = Math.min(1, far / 1.5);
            stick.x = (dx / far) * pace;
            stick.y = (dz / far) * pace;
            if (jumpEvery && i % frames(jumpEvery) === 0 && player.onGround) {
              held.add('jump');
              pressed.add('jump');
            } else if (jumpEvery && i % frames(jumpEvery) === frames(0.25)) {
              held.delete('jump');
            }
            step();
            highest = Math.max(highest, player.position.y);
          }
          stick.x = 0;
          stick.y = 0;
          held.clear();
          return { arrived: false, highest };
        };

        // Standing where the game starts.
        player.teleport(this.spawn.clone(), this.spawnFacing);
        for (let i = 0; i < frames(1.2); i += 1) step();
        results.start = {
          state: player.stateName,
          y: round(player.position.y),
          onSpot: Math.hypot(player.position.x - this.spawn.x, player.position.z - this.spawn.z) < 0.3,
          onGround: player.onGround,
        };

        // Every column solid at its top (or higher, where a trunk or a rock
        // stands on it), and nothing past the edge.
        {
          let holes = 0;
          let low = 0;
          const lowAt: string[] = [];
          for (const c of island.columns) {
            const hit = down(c.x, c.z);
            if (!hit) {
              holes += 1;
              continue;
            }
            if (hit.y < c.top - 0.02) {
              low += 1;
              if (lowAt.length < 4) lowAt.push(`${round(c.x)},${round(c.z)}: ${round(hit.y)} vs ${round(c.top)}`);
            }
          }
          let beyond = 0;
          let beyondTried = 0;
          const box = island.bounds;
          for (let x = box.minX - 1.6; x <= box.maxX + 1.6; x += 0.45) {
            for (let z = box.minZ - 1.6; z <= box.maxZ + 1.6; z += 0.45) {
              if (island.topAt(x, z) !== null) continue;
              // The bridge to the circuit is ground past the edge on purpose.
              const b = island.bridge;
              if (x > b.minX - 0.6 && x < b.maxX + 0.6 && z > b.minZ - 0.6 && z < b.maxZ + 0.6) continue;
              // Clear of the edge by more than his own width.
              if (
                island.topAt(x + 0.3, z) !== null ||
                island.topAt(x - 0.3, z) !== null ||
                island.topAt(x, z + 0.3) !== null ||
                island.topAt(x, z - 0.3) !== null
              ) {
                continue;
              }
              beyondTried += 1;
              if (down(x, z, 4)) beyond += 1;
            }
          }
          results.ground = { columns: island.columns.length, holes, low, lowAt, beyond, beyondTried };
        }

        // Up onto the low terrace from the lawn, from there up onto the high
        // one, and back down to the lawn: walking first, then with a jump.
        {
          const m = island.marks;
          const climb = (from: { x: number; z: number }, to: { x: number; z: number }) => {
            const target = island.topAt(to.x, to.z) ?? 0;
            put(from.x, from.z, Math.PI);
            const walked = walkTo(to.x, to.z, 4);
            if (walked.arrived && player.position.y > target - 0.1) return { target: round(target), walked: true, jumped: false };
            put(from.x, from.z, Math.PI);
            const jumped = walkTo(to.x, to.z, 8, 0.9);
            return { target: round(target), walked: false, jumped: jumped.arrived && player.position.y > target - 0.1 };
          };
          results.terrace = climb(m.lawnBeforeTerrace, m.terrace);
          results.highStep = climb(m.terraceBeforeHigh, m.high);
          put(m.high.x, m.high.z, 0);
          const off = walkTo(m.lawnBelowHigh.x, m.lawnBelowHigh.z, 6);
          // Coming down four blocks he can arrive still in the air; let him land.
          for (let i = 0; i < frames(0.8); i += 1) step();
          results.backDown = { arrived: off.arrived, y: round(player.position.y) };
        }

        // Tree trunks stop him. Walked at from each side where the ground is
        // level with the trunk's foot, so a step or a root on the way is not
        // what stops him.
        {
          const rows = island.trunks.map((t) => {
            const foot = island.topAt(t.x - 0.2, t.z - 0.2);
            let nearest = Infinity;
            let tried = 0;
            for (let k = 0; k < 8; k += 1) {
              const a = (k / 8) * Math.PI * 2;
              const sx = t.x + Math.cos(a) * 2;
              const sz = t.z + Math.sin(a) * 2;
              if (island.topAt(sx, sz) !== foot) continue;
              tried += 1;
              put(sx, sz, 0);
              walkTo(t.x, t.z, 3);
              nearest = Math.min(nearest, Math.hypot(player.position.x - t.x, player.position.z - t.z));
            }
            return { at: `${round(t.x)},${round(t.z)}`, tried, nearest: round(nearest), solid: tried > 0 && nearest > 0.5 };
          });
          results.trunks = { rows, allSolid: rows.every((r) => r.solid) };
        }

        // Down into the pool and back out.
        {
          const m = island.marks;
          put(m.besidePool.x, m.besidePool.z, 0);
          const into = walkTo(m.inPool.x, m.inPool.z, 5);
          const floor = round(player.position.y);
          const out = walkTo(m.besidePool.x, m.besidePool.z, 8, 0.9);
          results.pool = { into: into.arrived, floor, out: out.arrived && player.position.y > -0.1 };
        }

        // Across the bridge and onto the circuit: from the lawn at the
        // bridge's foot, along the deck, over the circuit's ramp and onto the
        // middle of its road.
        if (this.circuit) {
          const b = island.bridge;
          const mid = (b.minZ + b.maxZ) / 2;
          put(b.minX - 1.5, mid, 0);
          let lowest = player.position.y;
          const legs = [
            { x: b.maxX - 0.5, z: mid },
            { x: this.circuit.roadPoint.x, z: mid },
            { x: this.circuit.roadPoint.x, z: this.circuit.roadPoint.z },
          ];
          let arrived = true;
          for (const leg of legs) {
            const r = walkTo(leg.x, leg.z, 25);
            if (!r.arrived) arrived = false;
            lowest = Math.min(lowest, player.position.y);
          }
          for (let i = 0; i < frames(0.5); i += 1) step();
          results.bridge = {
            arrived,
            lowest: round(lowest),
            endedAt: `${round(player.position.x, 1)},${round(player.position.y, 2)},${round(player.position.z, 1)} ${player.stateName}`,
            onGround: player.onGround,
            y: round(player.position.y),
          };
        }

        // Off the edge at eight places round the island: he falls, and is put
        // back on the island on his feet.
        {
          const rows: unknown[] = [];
          let allBack = true;
          for (const run of island.edgeRuns) {
            const l = Math.hypot(run.dx, run.dz);
            put(run.x, run.z, 0);
            let wentOver = false;
            let lowest = 0;
            for (let i = 0; i < frames(12); i += 1) {
              stick.x = wentOver ? 0 : run.dx / l;
              stick.y = wentOver ? 0 : run.dz / l;
              step();
              lowest = Math.min(lowest, player.position.y);
              if (player.position.y < -3) wentOver = true;
            }
            stick.x = 0;
            stick.y = 0;
            const back = island.topAt(player.position.x, player.position.z) !== null && player.onGround;
            if (!(wentOver && back)) allBack = false;
            rows.push({
              from: `${round(run.x, 1)},${round(run.z, 1)}`,
              wentOver,
              fellTo: round(lowest, 1),
              back,
              endedAt: `${round(player.position.x, 1)},${round(player.position.y, 1)},${round(player.position.z, 1)} ${player.stateName}`,
            });
          }
          results.falling = { rows, allBack };
        }

        player.teleport(this.spawn.clone(), this.spawnFacing);
        return results;
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
          // No thumb here: these drive the controller as a keyboard does.
          chargeOf: () => null,
          chargingAction: () => null,
          chargeNow: () => 0,
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
        const reset = (x = TEST_GROUND.x, z = TEST_GROUND.z, facing = TEST_FACING) => {
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
          // No thumb here: these drive the controller as a keyboard does.
          chargeOf: () => null,
          chargingAction: () => null,
          chargeNow: () => 0,
        } as unknown as Input;
        const player = this.player;
        const step = () => player.update(dt, stub, 0);
        const frames = (seconds: number) => Math.max(1, Math.round(seconds / dt));
        const round = (v: number, places = 2) => Math.round(v * 10 ** places) / 10 ** places;

        return [0.5, 1, 2, 3, 5].map((seconds) => {
          stick.x = 0;
          stick.y = 0;
          player.teleport(new Vector3(TEST_GROUND.x, 0, TEST_GROUND.z - 8), TEST_FACING);
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
          // No thumb here: these drive the controller as a keyboard does.
          chargeOf: () => null,
          chargingAction: () => null,
          chargeNow: () => 0,
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

        /**
         * Waits for him to take hold, checks he stays there without being
         * asked to climb, then presses jump and watches the climb out.
         */
        const hangThenClimb = (waitFor: number, after: number) => {
          const states: string[] = [];
          const note = () => {
            const name = player.stateName;
            if (states[states.length - 1] !== name) states.push(name);
          };
          let caught = -1;
          for (let i = 0; i < frames(waitFor); i += 1) {
            step();
            note();
            if (player.stateName === 'hanging') {
              caught = i;
              break;
            }
          }
          if (caught < 0) {
            return { hung: false, heldFor: 0, states, landedAt: round(player.position.y) };
          }

          // Half a second of doing nothing: he must still be there.
          const hangY = player.position.y;
          for (let i = 0; i < frames(0.5); i += 1) step();
          const stayed = player.stateName === 'hanging' && Math.abs(player.position.y - hangY) < 0.01;

          // Jump pulls up. Back is what pushes him off the wall now.
          tap('jump');
          for (let i = 0; i < frames(0.2); i += 1) step();
          held.delete('jump');
          for (let i = 0; i < frames(after); i += 1) {
            step();
            note();
          }
          return {
            hung: true,
            stayed,
            states,
            hangLift: round(player.ledgeDiagnostics.lip),
            landedAt: round(player.position.y),
            landedAhead: round(player.position.x),
          };
        };

        const results: Record<string, unknown> = {};

        // The top of a corridor wall, whose face is at x = -12.3.
        place(-12.7, 5.9, -6, Math.PI / 2);
        results.wallTop = hangThenClimb(1, 2);

        // The platform, 5.5 across at x 15, z 12: near face at z = 9.25.
        place(15, 1.5, 8.6, 0);
        results.platform = hangThenClimb(1, 2.4);

        // The thin wall at x 4, 0.3 thick: near face at x = 3.85.
        place(3.3, 1.3, 2, Math.PI / 2);
        results.thinWall = hangThenClimb(1, 2.4);

        // Jumped at the platform from the floor, which is how it is met.
        place(15, 0, 6.2, 0);
        for (let i = 0; i < frames(0.4); i += 1) step();
        stick.y = 1;
        for (let i = 0; i < frames(0.5); i += 1) step();
        tap('jump');
        for (let i = 0; i < frames(0.32); i += 1) step();
        held.delete('jump');
        stick.y = 0;
        results.platformJumped = hangThenClimb(1.6, 2);

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
        let reached = false;
        for (let i = 0; i < frames(6); i += 1) {
          step();
          const name = player.stateName;
          if (climbStates[climbStates.length - 1] !== name) climbStates.push(name);
          if (name === 'hanging') {
            reached = true;
            break;
          }
          if (holdFor > 0) {
            holdFor -= 1;
            if (holdFor === 0) held.delete('jump');
          } else if (name === 'wall-slide') {
            tap('jump');
            holdFor = frames(0.3);
            kicks += 1;
            stick.x = -stick.x;
          }
        }
        stick.x = 0;
        stick.y = 0;
        let topped = { landedAt: round(player.position.y) };
        if (reached) {
          tap('jump');
          for (let i = 0; i < frames(0.2); i += 1) step();
          held.delete('jump');
          for (let i = 0; i < frames(1.6); i += 1) {
            step();
            const name = player.stateName;
            if (climbStates[climbStates.length - 1] !== name) climbStates.push(name);
          }
          topped = { landedAt: round(player.position.y) };
        }
        results.wallTopByKicking = { kicks, reached, states: climbStates, ...topped };

        place(TEST_GROUND.x, 0, TEST_GROUND.z, TEST_FACING);
        for (let i = 0; i < frames(0.4); i += 1) step();
        return results;
      },

      /** The moves added last: side flip, ground pound, ladder, pool, crate. */
      simulateExtras: (dt = 1 / 60) => {
        const stick = { x: 0, y: 0 };
        const stickRef = stick;
        const held = new Set<string>();
        const pressed = new Set<string>();
        const stub = {
          move: stick,
          look: { x: 0, y: 0 },
          isDown: (a: string) => held.has(a),
          wasPressed: (a: string) => pressed.has(a),
          wasReleased: () => false,
          // No thumb here: these drive the controller as a keyboard does.
          chargeOf: () => null,
          chargingAction: () => null,
          chargeNow: () => 0,
        } as unknown as Input;

        const player = this.player;
        // Where the camera is looking. Movement is camera-relative, so a
        // test that leaves this at zero while the character faces along +x
        // is pressing "right" into the wall, not along it.
        const camera = { yaw: 0, pitch: 0 };
        const step = () => {
          player.update(dt, stub, camera.yaw, camera.pitch);
          pressed.clear();
        };
        const frames = (s: number) => Math.max(1, Math.round(s / dt));
        const round = (v: number, n = 2) => Math.round(v * 10 ** n) / 10 ** n;
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
          for (let i = 0; i < frames(0.3); i += 1) step();
        };
        const watch = (seconds: number, stop?: (name: string) => boolean) => {
          const states: string[] = [];
          for (let i = 0; i < frames(seconds); i += 1) {
            step();
            const name = player.stateName;
            if (states[states.length - 1] !== name) states.push(name);
            if (stop?.(name)) break;
          }
          return states;
        };

        const results: Record<string, unknown> = {};

        // Side flip: at a run, jump and the flip button inside the window.
        // Tried four ways, because the window is meant to be forgiving: the
        // two buttons in either order, and from a walk, which must not work.
        const tryFlip = (gapSeconds: number, flipFirst: boolean, stick: number) => {
          place(TEST_GROUND.x, 0, TEST_GROUND.z - 12, TEST_FACING);
          stickRef.y = -stick;
          for (let i = 0; i < frames(1.2); i += 1) step();
          const runningAt = round(player.speed);

          // Measured from the moment the first button goes down, and with
          // jump held the way it would be, since letting go cuts the rise.
          let peak = player.position.y;
          let flipped = false;
          const watchFrames = (count: number) => {
            for (let i = 0; i < count; i += 1) {
              step();
              peak = Math.max(peak, player.position.y);
              if (player.stateName === 'side-flip') flipped = true;
            }
          };

          if (flipFirst) {
            tap('sideFlip');
            watchFrames(frames(gapSeconds));
            held.delete('sideFlip');
            tap('jump');
          } else {
            tap('jump');
            watchFrames(frames(gapSeconds));
            tap('sideFlip');
          }
          watchFrames(frames(0.4));
          held.clear();
          watchFrames(frames(2));
          return { runningAt, flipped, peak: round(peak) };
        };

        results.sideFlipJumpThenFlip = tryFlip(0.12, false, 1);
        results.sideFlipFlipThenJump = tryFlip(0.12, true, 1);
        results.sideFlipLateButInside = tryFlip(0.26, false, 1);
        results.sideFlipTooLate = tryFlip(0.55, false, 1);
        results.sideFlipFromAWalk = tryFlip(0.12, false, 0.4);

        // Ground pound: three presses of jump. One to go up, one for the
        // boost, one to come down. Each is held briefly, the way a person
        // presses a button, and the height after each is recorded so the
        // middle press can be seen to do something.
        place(TEST_GROUND.x, 0, TEST_GROUND.z - 12, TEST_FACING);
        tap('jump');
        for (let i = 0; i < frames(0.3); i += 1) step();
        held.delete('jump');
        for (let i = 0; i < frames(0.18); i += 1) step();
        const beforeBoost = round(player.position.y);
        tap('jump');
        for (let i = 0; i < frames(0.12); i += 1) step();
        held.delete('jump');
        let boostPeak = player.position.y;
        for (let i = 0; i < frames(0.3); i += 1) {
          step();
          boostPeak = Math.max(boostPeak, player.position.y);
        }
        tap('jump');
        step();
        held.delete('jump');
        results.groundPound = {
          beforeBoost,
          boostPeak: round(boostPeak),
          states: watch(2.5, (n) => n === 'idle'),
        };

        // And a single press in the air must not pound by itself.
        place(TEST_GROUND.x, 0, TEST_GROUND.z - 12, TEST_FACING);
        tap('jump');
        for (let i = 0; i < frames(0.3); i += 1) step();
        held.delete('jump');
        for (let i = 0; i < frames(0.18); i += 1) step();
        tap('jump');
        step();
        held.delete('jump');
        results.oneExtraPress = { states: watch(2.5, (n) => n === 'idle') };

        // The ladder, on the single wall: walk into it.
        place(12.6, 0, -6, Math.PI / 2);
        stick.x = 1;
        const ladderStates = watch(0.8, (n) => n === 'climb');
        const caught = player.stateName === 'climb';
        const bottom = round(player.position.y);
        // The height just before the hand-over, and just after, so a drop at
        // the top of the ladder shows up as a number.
        let beforeHandOver = player.position.y;
        const climbed: string[] = [];
        let drop = 0;
        for (let i = 0; i < frames(3); i += 1) {
          const was = player.position.y;
          const wasClimbing = player.stateName === 'climb';
          step();
          const name = player.stateName;
          if (climbed[climbed.length - 1] !== name) climbed.push(name);
          if (wasClimbing && name !== 'climb') {
            beforeHandOver = was;
            drop = Math.max(drop, was - player.position.y);
          }
        }
        void beforeHandOver;
        results.ladder = {
          caught,
          from: bottom,
          to: round(player.position.y),
          states: [...ladderStates, ...climbed],
          why: player.ledgeDiagnostics.reason,
          lip: player.ledgeDiagnostics.lip,
          dropAtTop: round(drop, 3),
        };

        // The pool: walk in from the side, then climb back out.
        place(-22, 0, 36, Math.PI);
        stick.x = 0;
        stick.y = -1;
        const swimStates = watch(2.5, (n) => n.startsWith('swim'));
        const swamAt = round(player.position.y);
        // Swim up against the near wall, which is the case that matters:
        // pressed against the side, pressing jump to get out.
        stick.x = 0;
        stick.y = 1;
        for (let i = 0; i < frames(2.2); i += 1) step();
        const outStates: string[] = [];
        let gotOut = false;
        for (let attempt = 0; attempt < 6 && !gotOut; attempt += 1) {
          tap('jump');
          for (let i = 0; i < frames(0.4); i += 1) {
            step();
            const name = player.stateName;
            if (outStates[outStates.length - 1] !== name) outStates.push(name);
          }
          held.delete('jump');
          if (player.stateName === 'hanging') {
            tap('jump');
            for (let i = 0; i < frames(0.2); i += 1) step();
            held.delete('jump');
            for (let i = 0; i < frames(1.4); i += 1) {
              step();
              const name = player.stateName;
              if (outStates[outStates.length - 1] !== name) outStates.push(name);
            }
            gotOut = player.position.y > -0.1;
          }
        }
        results.pool = {
          swam: swimStates.some((n) => n.startsWith('swim')),
          states: swimStates,
          depth: swamAt,
          gotOut,
          outStates,
          endedAt: round(player.position.y),
        };

        // The crate: walk to it and pick it up.
        place(3, 0, 16.4, Math.PI);
        stick.x = 0;
        stick.y = -0.4;
        for (let i = 0; i < frames(0.55); i += 1) step();
        stick.y = 0;
        for (let i = 0; i < frames(0.3); i += 1) step();
        const target = player.findCarryTarget();
        tap('grab');
        step();
        held.delete('grab');
        for (let i = 0; i < frames(0.5); i += 1) step();
        results.crate = {
          inReach: target !== null,
          carrying: player.carried !== null,
        };

        place(TEST_GROUND.x, 0, TEST_GROUND.z, TEST_FACING);
        return results;
      },

      /**
       * Walks the hard parts of the course, to find out whether they can be
       * done rather than assuming the numbers were right. Each one is driven
       * at a fixed time step with the inputs its sign asks for.
       */
      simulateCourse: (dt = 1 / 60) => {
        const stick = { x: 0, y: 0 };
        const held = new Set<string>();
        const pressed = new Set<string>();
        // A press that arrived from a thumb carries how far it was wound up;
        // one from a key carries nothing, which is what null means.
        const charges = new Map<string, number>();
        // And a move being wound up right now, for the stance it puts him in.
        const winding = { action: null as string | null, level: 0 };
        const stub = {
          move: stick,
          look: { x: 0, y: 0 },
          isDown: (a: string) => held.has(a),
          wasPressed: (a: string) => pressed.has(a),
          wasReleased: () => false,
          chargeOf: (a: string) => charges.get(a) ?? null,
          chargingAction: () => winding.action,
          chargeNow: () => winding.level,
        } as unknown as Input;

        const player = this.player;
        // Where the camera is looking. Movement is camera-relative, so a
        // test that leaves this at zero while the character faces along +x
        // is pressing "right" into the wall, not along it.
        const camera = { yaw: 0, pitch: 0 };
        const step = () => {
          player.update(dt, stub, camera.yaw, camera.pitch);
          pressed.clear();
          charges.clear();
        };
        const frames = (s: number) => Math.max(1, Math.round(s / dt));
        const round = (v: number, n = 2) => Math.round(v * 10 ** n) / 10 ** n;
        const tap = (a: string) => {
          held.add(a);
          pressed.add(a);
        };
        /** A press let go of by a thumb, wound up as far as `level`. */
        const tapCharged = (a: string, level: number) => {
          charges.set(a, level);
          pressed.add(a);
        };
        const place = (x: number, y: number, z: number, facing: number) => {
          held.clear();
          pressed.clear();
          stick.x = 0;
          stick.y = 0;
          player.teleport(new Vector3(x, y, z), facing);
          for (let i = 0; i < frames(0.3); i += 1) step();
        };
        const where = () => ({
          x: round(player.position.x),
          y: round(player.position.y),
          z: round(player.position.z),
        });

        const results: Record<string, unknown> = {};

        const M = COURSE_MARKS;

        // The docks — the long jump, over a gap too wide for a plain jump.
        place(M.longJump.x, M.longJump.top, M.longJump.lip + 6.2, Math.PI);
        stick.y = -1;
        // Along the dock to the lip, which is where a long jump has to be
        // taken from: it covers 10.8m and the gap is 7.5m.
        for (let i = 0; i < frames(0.5); i += 1) step();
        // Crouch as soon as the lip is close, and jump the moment he is
        // still on it. Where he takes off from is the whole move.
        held.add('crouch');
        let tookOffAt = 99;
        let tookOffState = '';
        for (let i = 0; i < frames(1.2); i += 1) {
          step();
          if (player.position.z < M.longJump.lip + 1.6 && player.stateName === 'crouch') {
            tookOffAt = player.position.z;
            tookOffState = player.stateName;
            tap('jump');
            break;
          }
        }
        for (let i = 0; i < frames(0.35); i += 1) step();
        const launched = player.stateName;
        held.clear();
        stick.y = 0;
        for (let i = 0; i < frames(2.5); i += 1) step();
        results.longJumpGap = {
          ...where(),
          tookOffAt: round(tookOffAt),
          tookOffState,
          launched,
          endedAs: player.stateName,
          cleared: player.position.z < M.longJump.far && player.position.y > M.longJump.top - 0.1,
        };

        // The containers — the backflip, up and behind onto one.
        place(M.backflip.x, 0, M.backflip.z, Math.PI);
        held.add('crouch');
        for (let i = 0; i < frames(0.4); i += 1) step();
        const crouched = player.stateName;
        tap('jump');
        step();
        const jumped = player.stateName;
        for (let i = 0; i < frames(0.5); i += 1) step();
        held.clear();
        for (let i = 0; i < frames(2.5); i += 1) step();
        results.backflipStep = {
          ...where(),
          crouched,
          jumped,
          landed: player.position.y > M.backflip.top - 0.2,
        };

        // The side flip, along the container tops and up onto the stack.
        place(M.sideFlip.face - 8.5, M.sideFlip.from, M.sideFlip.z, Math.PI / 2);
        stick.x = 1;
        for (let i = 0; i < frames(0.9); i += 1) step();
        tap('jump');
        for (let i = 0; i < frames(0.1); i += 1) step();
        tap('sideFlip');
        for (let i = 0; i < frames(0.4); i += 1) step();
        held.delete('jump');
        held.delete('sideFlip');
        stick.x = 0;
        for (let i = 0; i < frames(2.5); i += 1) step();
        results.sideFlipLedge = { ...where(), landed: player.position.y > M.sideFlip.top - 0.2 };

        // The alley — kicking up between the warehouse and the mill.
        place(M.alley.x, 0, M.alley.low.z, Math.PI / 2);
        stick.x = 1;
        for (let i = 0; i < frames(0.35); i += 1) step();
        tap('jump');
        let holdFor = frames(0.3);
        let kicks = 0;
        let highest = 0;
        for (let i = 0; i < frames(7); i += 1) {
          step();
          highest = Math.max(highest, player.position.y);
          if (holdFor > 0) {
            holdFor -= 1;
            if (holdFor === 0) held.delete('jump');
          } else if (player.stateName === 'wall-slide') {
            tap('jump');
            holdFor = frames(0.3);
            kicks += 1;
            stick.x = -stick.x;
          }
          if (player.stateName === 'hanging') break;
          // Or over the top and standing on the roof, which is as good.
          if (player.position.y > M.alley.low.top - 0.05 && Math.abs(player.velocity.y) < 0.01) break;
        }
        stick.x = 0;
        results.kickShaft = {
          kicks,
          highest: round(highest),
          endedAs: player.stateName,
          reached: highest > M.alley.low.top - 1.5,
        };

        // The basin — in off the board, down to the bottom, and out.
        place(M.board.x, M.board.y, M.board.z, Math.PI * 0.5);
        stick.x = -1;
        for (let i = 0; i < frames(1.4); i += 1) step();
        let deepest = 0;
        held.add('dive');
        for (let i = 0; i < frames(3); i += 1) {
          step();
          deepest = Math.min(deepest, player.position.y);
        }
        held.delete('dive');
        stick.x = 0;
        // Nothing brings him back up from a dive but swimming there.
        held.add('jump');
        for (let i = 0; i < frames(6); i += 1) {
          step();
          if (player.stateName === 'swim-surface') break;
        }
        held.delete('jump');
        for (let i = 0; i < frames(1.5); i += 1) step();
        const surfaced = player.stateName === 'swim-surface';

        // Out along the pool first, clear of the diving tower, which stands
        // in the water at z 28 to 32 and whose roof is six metres up: a
        // swimmer under it has nothing to climb out onto, correctly.
        stick.x = 0;
        stick.y = -1;
        for (let i = 0; i < frames(4); i += 1) {
          step();
          if (player.position.z < 22) break;
        }
        // Then to the east wall and out of it. What is being measured is
        // that he never goes *down* on the way: the old way out ran the
        // ledge hang, which settles onto a fixed drop below the edge and so
        // began by pulling him under.
        stick.y = 0;
        stick.x = 1;
        for (let i = 0; i < frames(8); i += 1) {
          step();
          if (player.position.x > -21.3) break;
        }
        stick.x = 0;
        for (let i = 0; i < frames(0.5); i += 1) step();
        const floatedAt = player.position.y;
        const pressedAt = round(player.position.x);
        const pressedFacing = round(player.facing);
        const pressedState = player.stateName;
        let lowest = floatedAt;
        let usedWaterExit = false;
        const outStates: string[] = [];
        tap('jump');
        for (let i = 0; i < frames(2.4); i += 1) {
          step();
          held.delete('jump');
          lowest = Math.min(lowest, player.position.y);
          const name = player.stateName;
          if (outStates[outStates.length - 1] !== name) outStates.push(name);
          if (name === 'water-exit') usedWaterExit = true;
        }
        stick.x = 0;
        stick.y = 0;
        results.pool = {
          deepest: round(deepest),
          surfaced,
          floatedAt: round(floatedAt),
          dippedTo: round(lowest),
          neverDucked: lowest > floatedAt - 0.06,
          usedWaterExit,
          pressedAt,
          pressedFacing,
          pressedState,
          outStates,
          out: player.position.y > -0.1,
          ...where(),
        };

        // Treading water with nothing pressed, having come up from the
        // bottom. Rising fast used to throw him out of the swimming state
        // for a frame, and the ledge search caught the poolside and pulled
        // him down onto a hang a metre under the surface.
        place(-35, -7.5, 12, 0);
        for (let i = 0; i < frames(6); i += 1) step();
        const floatState = player.stateName;
        const floatY2 = round(player.position.y);
        for (let i = 0; i < frames(3); i += 1) step();
        const floatStayed = player.stateName;
        // Space pressed over and over in the water: it must stay a stroke.
        // It used to walk him up out of the pool and then hand the next
        // press to the land combo — a boost, and then a ground pound.
        {
          const hammer = (start: number, dive: boolean) => {
            place(-35, start, 12, 0);
            for (let i = 0; i < frames(1.6); i += 1) step();
            if (dive) {
              held.add('dive');
              for (let i = 0; i < frames(1.5); i += 1) step();
              held.delete('dive');
            }
            const from = player.position.y;
            const states: string[] = [];
            let highest = from;
            for (let press = 0; press < 8; press += 1) {
              tap('jump');
              for (let i = 0; i < frames(0.18); i += 1) {
                step();
                // Down for a tenth of a second, which is what a tap is.
                if (i >= frames(0.1) - 1) held.delete('jump');
                highest = Math.max(highest, player.position.y);
                const name = player.stateName;
                if (states[states.length - 1] !== name) states.push(name);
              }
            }
            held.clear();
            return {
              from: round(from),
              highest: round(highest),
              rose: round(highest - from),
              states,
              stayedWet: states.every((n) => n.startsWith('swim')),
            };
          };
          results.strokeSpam = { surface: hammer(1, false), under: hammer(1, true) };
        }

        results.floating = {
          state: floatState,
          at: floatY2,
          stayed: floatStayed,
          treads: floatState === 'swim-surface' && floatStayed === 'swim-surface',
        };

        // The ladder, every way on and off it: climb it, jump off partway
        // without being caught again, climb over the top onto the roof, and
        // get back onto it from above with G.
        {
          const toLadder = () => {
            place(M.ladder.face - 3.4, M.ladder.base, M.ladder.z, Math.PI / 2);
            stick.x = 1;
            for (let i = 0; i < frames(3); i += 1) {
              step();
              if (player.stateName === 'climb') break;
            }
            stick.x = 0;
          };

          // Up it, using only the stick's own up axis.
          toLadder();
          const caughtAt = round(player.position.y);
          stick.y = -1;
          for (let i = 0; i < frames(1.3); i += 1) step();
          const climbedTo = round(player.position.y);
          stick.y = 0;

          // Jump off from halfway. It has to hand control back and it has to
          // stay handed back: the ladder used to take him again on the way
          // down, which is indistinguishable from never having let go.
          tap('jump');
          for (let i = 0; i < frames(0.25); i += 1) step();
          held.delete('jump');
          const afterJump = player.stateName;
          let reattached = false;
          for (let i = 0; i < frames(2.2); i += 1) {
            step();
            if (player.stateName === 'climb') reattached = true;
          }
          const landedAfterJump = player.stateName;

          // All the way to the top and over it, with nothing pressed but up.
          toLadder();
          stick.y = -1;
          const topStates: string[] = [];
          for (let i = 0; i < frames(11); i += 1) {
            step();
            const name = player.stateName;
            if (topStates[topStates.length - 1] !== name) topStates.push(name);
            if (name === 'idle' && player.position.y > M.ladder.top - 0.6) break;
          }
          stick.y = 0;
          const onTop = round(player.position.y);
          const gotOver =
            player.position.y > M.ladder.top - 0.2 && player.position.x > M.ladder.face + 0.1;

          // Pausing at the top and pressing back must still climb down,
          // rather than the top being a one-way door.
          toLadder();
          stick.y = -1;
          for (let i = 0; i < frames(5.5); i += 1) {
            step();
            if (player.position.y > M.ladder.top - 1.2) break;
          }
          stick.y = 0;
          for (let i = 0; i < frames(0.3); i += 1) step();
          const pausedAt = round(player.position.y);
          const pausedOn = player.stateName;
          stick.y = 1;
          for (let i = 0; i < frames(1.2); i += 1) step();
          const backedDownTo = round(player.position.y);
          stick.y = 0;

          // And onto it from the roof above, by the prompt rather than by
          // walking near the edge.
          place(M.ladder.face + 1, M.ladder.top, M.ladder.z, Math.PI / 2);
          for (let i = 0; i < frames(0.5); i += 1) step();
          const offered = player.ladderToClimbDown() !== null;
          const offeredAway = (() => {
            const saved = player.position.clone();
            player.teleport(
              new Vector3(M.ladder.face + 4.5, M.ladder.top, M.ladder.z),
              Math.PI / 2,
            );
            for (let i = 0; i < frames(0.3); i += 1) step();
            const far = player.ladderToClimbDown() !== null;
            player.teleport(saved, Math.PI / 2);
            for (let i = 0; i < frames(0.3); i += 1) step();
            return far;
          })();
          tap('climbDown');
          const downStates: string[] = [];
          for (let i = 0; i < frames(1.4); i += 1) {
            step();
            held.delete('climbDown');
            const name = player.stateName;
            if (downStates[downStates.length - 1] !== name) downStates.push(name);
          }
          const mountedAt = round(player.position.y);
          const backOn = player.stateName === 'climb';
          stick.y = 1;
          for (let i = 0; i < frames(1.5); i += 1) step();
          const descendedTo = round(player.position.y);
          stick.y = 0;
          stick.x = 0;
          held.clear();

          results.ladderWork = {
            caughtAt,
            climbedTo,
            climbedUp: climbedTo > caughtAt + 2,
            afterJump,
            landedAfterJump,
            releasedByJump: afterJump !== 'climb',
            reattached,
            topStates,
            onTop,
            gotOver,
            pausedAt,
            pausedOn,
            backedDownTo,
            canStillDescend: backedDownTo < pausedAt - 1,
            offered,
            offeredAway,
            downStates,
            mountedAt,
            backOn,
            descendedTo,
            climbedDown: descendedTo < mountedAt - 1.5,
          };
        }

        // Hanging off an edge: along it, up off it, and away from it.
        {
          // Camera behind him, looking at the wall he is facing, which is
          // how anyone meets this edge.
          camera.yaw = -Math.PI / 2;
          const catchTheRoof = (z: number) => {
            place(M.roof.face - 0.65, M.roof.top - 1.65, z, Math.PI / 2);
            for (let i = 0; i < frames(1.4); i += 1) {
              step();
              if (player.stateName === 'hanging') break;
            }
            return player.stateName === 'hanging';
          };

          const hung = catchTheRoof(M.roof.z);
          const caughtZ = round(player.position.z);
          // Along the edge in both directions. Facing the wall along +x,
          // his right runs toward +z, where the roof carries on.
          stick.x = 1;
          // Watch the gloves themselves while he goes: hand over hand means
          // the hand that is holding does not move, and the hand that is
          // free covers a whole stride while it is in the air. Both sliding
          // along together is the thing this is here to catch.
          const glove = (elbow: { localToWorld(v: Vector3): Vector3 }) =>
            elbow.localToWorld(new Vector3(0, -ARM.lower, 0));
          const hands: Array<{ left: number; right: number; body: number }> = [];
          for (let i = 0; i < frames(1.2); i += 1) {
            step();
            hands.push({
              left: glove(player.rig.elbowLeft).z,
              right: glove(player.rig.elbowRight).z,
              body: player.position.z,
            });
          }
          stick.x = 0;
          {
            // How far each glove travelled between frames, against how far
            // his body did.
            let bodyWent = 0;
            let heldStill = 0;
            let reached = 0;
            let together = 0;
            for (let i = 1; i < hands.length; i += 1) {
              const body = hands[i].body - hands[i - 1].body;
              const moves = [
                hands[i].left - hands[i - 1].left,
                hands[i].right - hands[i - 1].right,
              ].sort((a, b) => a - b);
              bodyWent += body;
              // The slower glove should be still, and the quicker one
              // should be covering the ground for both of them.
              if (Math.abs(moves[0]) < body * 0.35) heldStill += 1;
              if (moves[1] > body * 1.4) reached += 1;
              if (Math.abs(moves[0] - moves[1]) < body * 0.5) together += 1;
            }
            const steps = hands.length - 1;
            results.gripHands = {
              bodyWent: round(bodyWent),
              heldStill,
              reached,
              together,
              steps,
              // One hand holding and the other covering ground, most of the
              // time, and never both drifting along at the same rate.
              alternates: heldStill > steps * 0.55 && reached > steps * 0.55 && together < steps * 0.2,
            };
          }
          const shimmiedZ = round(player.position.z);
          const wentRight = shimmiedZ > caughtZ + 0.6;
          stick.x = -1;
          for (let i = 0; i < frames(1.2); i += 1) step();
          stick.x = 0;
          const backZ = round(player.position.z);
          const wentLeft = backZ < shimmiedZ - 0.6;
          const stillHanging = player.stateName === 'hanging';

          // Holding jump must not pull him up; only a fresh press does.
          held.add('jump');
          for (let i = 0; i < frames(0.6); i += 1) step();
          const heldForwardDidNothing = player.stateName === 'hanging';
          held.delete('jump');
          tap('jump');
          for (let i = 0; i < frames(1.6); i += 1) step();
          held.delete('jump');
          const pulledUp = player.position.y > M.roof.top - 0.2;

          // And off it: back pushes him away rather than up.
          const hung2 = catchTheRoof(M.roof.z + 1);
          const fromY = player.position.y;
          const fromX = player.position.x;
          tap('back');
          for (let i = 0; i < frames(0.35); i += 1) step();
          held.delete('back');
          const afterLedgeJump = player.stateName;
          for (let i = 0; i < frames(2.2); i += 1) step();
          const pushedBack = player.position.x < fromX - 0.8;
          stick.x = 0;
          held.clear();

          camera.yaw = 0;
          results.ledgeWork = {
            hung,
            caughtZ,
            shimmiedZ,
            backZ,
            wentRight,
            wentLeft,
            movedAlong: wentRight && wentLeft,
            stillHanging,
            heldForwardDidNothing,
            pulledUp,
            hung2,
            fromY: round(fromY),
            afterLedgeJump,
            jumpedOff: afterLedgeJump !== 'hanging',
            pushedBack,
            endedAt: round(player.position.y),
          };
        }

        // Low steps are not ledges. A side flip past the one metre plinth at
        // station 4, and a plain fall beside it, both used to end with him
        // dangling off it with his toes almost on the floor.
        {
          const beside = (how: 'fall' | 'sideflip') => {
            place(M.lowStep.face + 1.1, M.lowStep.top + 1.1, M.lowStep.z, Math.PI / 2);
            if (how === 'sideflip') {
              stick.x = -1;
              for (let i = 0; i < frames(0.5); i += 1) step();
              tap('jump');
              for (let i = 0; i < frames(0.1); i += 1) step();
              tap('sideFlip');
            }
            const states: string[] = [];
            for (let i = 0; i < frames(2.6); i += 1) {
              step();
              held.clear();
              const name = player.stateName;
              if (states[states.length - 1] !== name) states.push(name);
            }
            stick.x = 0;
            held.clear();
            return { states, ended: player.stateName, y: round(player.position.y) };
          };
          const dropped = beside('fall');
          const flipped = beside('sideflip');
          results.lowStep = {
            dropped,
            flipped,
            grabbed: dropped.states.includes('hanging') || flipped.states.includes('hanging'),
          };
        }

        // Hands on the edge rather than on air. The search for a ledge
        // reaches a good deal further than his arms do, and nothing used to
        // bring him in afterwards: caught at full stretch he hung a arm's
        // length clear of the wall, holding nothing. That is what being
        // "stuck in midair" beside the ground pound platform was.
        {
          // The west face of the station 7 platform, lip included, and the
          // height of its top.
          const FACE = M.sideFlip.face - 0.06;
          const grabFrom = (offset: number) => {
            place(FACE - offset, M.sideFlip.top + 1.5, M.sideFlip.z, Math.PI / 2);
            for (let i = 0; i < frames(2.5); i += 1) {
              step();
              if (player.stateName === 'hanging') break;
            }
            const caught = player.stateName === 'hanging';
            const out = {
              caught,
              gap: caught ? round(FACE - player.position.x) : null,
              y: round(player.position.y),
            };
            held.clear();
            return out;
          };
          const near = grabFrom(0.45);
          const far = grabFrom(1.0);
          results.ledgeGap = {
            near,
            far,
            // Whatever the stretch it was caught at, the edge ends up the
            // same short distance in front of him.
            handsOnIt:
              near.caught &&
              far.caught &&
              Math.abs((near.gap ?? 9) - (far.gap ?? 0)) < 0.08 &&
              Math.abs((far.gap ?? 9) - 0.36) < 0.12,
          };
        }

        // Catching an edge square to it however he arrives, and moving
        // along it without walking into the wall. Five faces, different
        // sizes and orientations, each approached head on and leaning a
        // third of a turn either way. Nothing here is specific to any of
        // them: the controller is told none of these numbers.
        {
          const faces = M.faces;
          const wrap = (a: number) => {
            let v = a;
            while (v > Math.PI) v -= Math.PI * 2;
            while (v < -Math.PI) v += Math.PI * 2;
            return v;
          };
          const degrees = (r: number) => Math.round((r * 180) / Math.PI);
          const rows: unknown[] = [];
          let worstFacing = 0;
          let worstDrift = 0;
          let caughtAll = true;
          let heldAll = true;

          for (const face of faces) {
            // The heading that looks straight at this wall.
            const square = Math.atan2(-face.nx, -face.nz);
            // Distance out from the face, along its own normal.
            const out = () =>
              (player.position.x - face.x) * face.nx + (player.position.z - face.z) * face.nz;
            for (const lean of [-0.6, 0, 0.6]) {
              place(
                face.x + face.nx * 0.45,
                face.top - 0.5,
                face.z + face.nz * 0.45,
                square + lean,
              );
              for (let i = 0; i < frames(1.4); i += 1) {
                step();
                if (player.stateName === 'hanging') break;
              }
              const caught = player.stateName === 'hanging';
              if (!caught) {
                caughtAll = false;
                rows.push({ face: face.name, lean: degrees(lean), caught });
                continue;
              }
              const facingOff = Math.abs(degrees(wrap(player.facing - square)));
              const gap = round(out());

              // Along the edge both ways, watching how far he wanders in
              // toward the wall or out away from it.
              camera.yaw = square + Math.PI;
              let nearest = gap;
              let furthest = gap;
              const travel = (towards: number) => {
                stick.x = towards;
                for (let i = 0; i < frames(1); i += 1) {
                  step();
                  if (player.stateName !== 'hanging') break;
                  nearest = Math.min(nearest, out());
                  furthest = Math.max(furthest, out());
                }
                stick.x = 0;
              };
              travel(1);
              travel(-1);
              const stillHanging = player.stateName === 'hanging';
              if (!stillHanging) heldAll = false;
              const drift = round(Math.max(furthest - gap, gap - nearest));
              worstFacing = Math.max(worstFacing, facingOff);
              worstDrift = Math.max(worstDrift, drift);
              rows.push({
                face: face.name,
                lean: degrees(lean),
                caught,
                facingOff,
                gap,
                drift,
                held: stillHanging,
              });
              camera.yaw = 0;
            }
          }
          stick.x = 0;
          held.clear();
          camera.yaw = 0;
          results.angledLedges = {
            rows,
            caughtAll,
            heldAll,
            worstFacing,
            worstDrift,
            // Square to the wall within a couple of degrees however he
            // arrived, and never wandering a hand's width in or out of it.
            squaresUp: caughtAll && worstFacing <= 3 && worstDrift <= 0.12,
          };
        }

        // The pull-up, and the push that a second press of jump turns it
        // into. What matters is not only that the second press lifts him
        // higher, but that it joins the movement already running: nothing
        // restarted, nothing snapped, whenever in the window it lands.
        {
          const pullUp = (secondAfter: number | null) => {
            place(M.roof.face - 0.65, M.roof.top - 1.65, M.roof.z, Math.PI / 2);
            for (let i = 0; i < frames(1.4); i += 1) {
              step();
              if (player.stateName === 'hanging') break;
            }
            if (player.stateName !== 'hanging') return null;

            tap('jump');
            step();
            held.delete('jump');
            let last = player.position.y;
            let lastPitch = player.rig.body.rotation.x;
            let biggestStep = 0;
            let biggestTurn = 0;
            let peak = player.position.y;
            const wait = secondAfter === null ? -1 : Math.round(secondAfter / dt);
            for (let i = 0; i < frames(2.6); i += 1) {
              if (i === wait) tap('jump');
              step();
              held.delete('jump');
              biggestStep = Math.max(biggestStep, Math.abs(player.position.y - last));
              biggestTurn = Math.max(biggestTurn, Math.abs(player.rig.body.rotation.x - lastPitch));
              last = player.position.y;
              lastPitch = player.rig.body.rotation.x;
              peak = Math.max(peak, player.position.y);
            }
            const out = {
              peak: round(peak),
              ended: round(player.position.y),
              state: player.stateName,
              // The largest the body moved, and the largest the pose
              // turned, between two frames. A restart would show here.
              biggestStep: round(biggestStep, 3),
              biggestTurn: round(biggestTurn, 3),
            };
            held.clear();
            return out;
          };

          const plain = pullUp(null);
          const sameFrame = pullUp(0);
          const oneFrame = pullUp(dt);
          const early = pullUp(0.08);
          const middle = pullUp(0.18);
          const late = pullUp(0.3);
          const tooLate = pullUp(0.5);
          const boosted = [sameFrame, oneFrame, early, middle, late];

          results.ledgePush = {
            plain,
            sameFrame,
            oneFrame,
            early,
            middle,
            late,
            tooLate,
            // A plain pull-up leaves him standing on the edge.
            pullsUp: !!plain && plain.state === 'idle' && plain.ended > M.roof.top - 0.2,
            // Every second press inside the window lifts him clear of it.
            pushesHigher:
              boosted.every((r) => !!r && r.peak > (plain?.peak ?? 0) + 0.45) &&
              boosted.every((r) => !!r && r.ended > M.roof.top - 0.2 && r.state === 'idle'),
            // And one outside it changes nothing.
            windowCloses: !!tooLate && Math.abs(tooLate.peak - (plain?.peak ?? 0)) < 0.05,
            // Nothing jumped: at a sixtieth of a second the climb covers a
            // few centimetres a frame, and a reset to the hang would be a
            // metre of it in one.
            smooth:
              [plain, ...boosted, tooLate].every(
                (r) => !!r && r.biggestStep < 0.2 && r.biggestTurn < 0.25,
              ),
          };
        }

        // Where an edge runs out, and where it runs into something else.
        //
        // Two different endings. The beam at station 9 stops in mid air, so
        // there is nothing to hold and nothing to hit: he should simply
        // stop. The kick wall at station 8 runs into the side of the
        // platform beside it, and the two tops are level — so the search
        // for somewhere to hold goes on finding one, around a corner that
        // his shoulder cannot follow.
        {
          // His own body against the world, without needing his capsule:
          // the boxes everything solid is built from.
          const solids = this.solidBoxes();
          const buried = () => {
            const chest = player.position.y + 0.9;
            return solids.some(
              (b) =>
                player.position.x > b.min.x + 0.05 &&
                player.position.x < b.max.x - 0.05 &&
                player.position.z > b.min.z + 0.05 &&
                player.position.z < b.max.z - 0.05 &&
                chest > b.min.y &&
                chest < b.max.y,
            );
          };

          const run = (
            x: number,
            y: number,
            z: number,
            facing: number,
            towards: number,
            seconds: number,
          ) => {
            place(x, y, z, facing);
            // Drop onto the edge from just under its top.
            for (let i = 0; i < frames(1.4); i += 1) {
              step();
              if (player.stateName === 'hanging') break;
            }
            if (player.stateName !== 'hanging') return null;
            camera.yaw = facing + Math.PI;
            stick.x = towards;
            for (let i = 0; i < frames(seconds); i += 1) {
              step();
              if (player.stateName !== 'hanging') break;
            }
            stick.x = 0;
            camera.yaw = 0;
            const out = {
              ...where(),
              hanging: player.stateName === 'hanging',
              inside: buried(),
            };
            held.clear();
            return out;
          };

          // The fence's east end, which stops in the open. Facing -z to
          // catch its south face, his right is +x, so the stick goes right
          // to travel toward the end.
          const offTheEnd = run(
            M.fence.x1 - 2,
            M.fence.top - 0.5,
            M.fence.face + 0.45,
            Math.PI,
            1,
            5,
          );
          // The wall beside it, the same way: it runs into the side of the
          // gatehouse, which stands forward of it with its roof level.
          const intoTheCorner = run(
            M.corner.from,
            M.corner.top - 0.5,
            M.corner.face + 0.45,
            Math.PI,
            1,
            5,
          );

          results.ledgeEnds = {
            offTheEnd,
            intoTheCorner,
            // Stopped on the beam rather than sliding off the end of it...
            stopsAtTheEnd:
              !!offTheEnd &&
              offTheEnd.hanging &&
              offTheEnd.x < M.fence.x1 + 0.2 &&
              offTheEnd.x > M.fence.x1 - 0.7 &&
              !offTheEnd.inside,
            // ...and stopped at the corner rather than inside the platform.
            stopsAtTheCorner:
              !!intoTheCorner &&
              intoTheCorner.x < M.corner.at + 0.2 &&
              intoTheCorner.x > M.corner.at - 1 &&
              !intoTheCorner.inside,
          };
        }

        // Nothing solid can be fallen through, however coarse the frame.
        //
        // Movement is sub-stepped so that a fast frame cannot teleport him
        // past a thin surface, and a ground pound is the fastest thing in
        // the game. The slabs to try are measured out of the world rather
        // than named: the thinnest few that have air under them are the
        // ones with the least to catch him.
        {
          const every = this.solidBoxes();
          const holds = (x: number, y: number, z: number) =>
            every.some(
              (b) =>
                x > b.min.x && x < b.max.x && y > b.min.y && y < b.max.y && z > b.min.z && z < b.max.z,
            );
          const slabs: Array<{ top: number; thickness: number; x: number; z: number }> = [];
          const size = new Vector3();
          for (const box of every) {
            box.getSize(size);
            // Flat, broad enough to aim at, and standing above the floor.
            if (size.y > 1.2 || size.x < 1.5 || size.z < 1) continue;
            if (box.max.y < 2) continue;
            const x = (box.min.x + box.max.x) / 2;
            const z = (box.min.z + box.max.z) / 2;
            // And with air under it, so that going through it really is
            // going through: a lip on top of a block is caught by the block
            // whether the lip itself works or not.
            if (holds(x, box.min.y - 0.1, z)) continue;
            // And its top really is where its box says. A box is only a
            // guide to where a mesh is; a band around an edge is a shell,
            // and the middle of its box is open air.
            const surface = this.collision.groundProbe(new Vector3(x, box.max.y + 0.5, z), 1);
            if (!surface || Math.abs(surface.y - box.max.y) > 0.05) continue;
            slabs.push({ top: box.max.y, thickness: size.y, x, z });
          }
          slabs.sort((a, b) => a.thickness - b.thickness);
          const tried = slabs.slice(0, 4);

          const rows: unknown[] = [];
          let allCaught = true;
          for (const slab of tried) {
            for (const rate of [60, 30, 20, 15]) {
              const d = 1 / rate;
              player.teleport(new Vector3(slab.x, slab.top + 24, slab.z), Math.PI);
              held.clear();
              pressed.clear();
              stick.x = 0;
              stick.y = 0;
              let lowest = slab.top + 24;
              for (let i = 0; i < Math.round(4 / d); i += 1) {
                player.update(d, stub, 0);
                pressed.clear();
                lowest = Math.min(lowest, player.position.y);
                if (player.stateName === 'idle' || player.stateName === 'pound-land') break;
              }
              const landed = player.position.y > slab.top - 0.2;
              if (!landed) allCaught = false;
              rows.push({
                thickness: round(slab.thickness),
                top: round(slab.top),
                rate,
                ended: round(player.position.y),
                lowest: round(lowest),
                landed,
              });
            }
          }
          stick.x = 0;
          stick.y = 0;
          held.clear();
          results.fallThrough = {
            rows,
            thinnest: tried.length ? round(tried[0].thickness) : null,
            tried: tried.length,
            allCaught,
          };
        }

        // C crouches on land. Q dives in water, where there is nothing to
        // crouch for.
        place(TEST_GROUND.x, 0, TEST_GROUND.z, TEST_FACING);
        held.add('crouch');
        for (let i = 0; i < frames(0.4); i += 1) step();
        const crouchOnLand = player.stateName;
        held.clear();

        place(-35, 0, 12, Math.PI);
        for (let i = 0; i < frames(2); i += 1) step();
        const floatY = player.position.y;
        held.add('dive');
        for (let i = 0; i < frames(2); i += 1) step();
        const divedTo = round(player.position.y);
        held.clear();
        results.crouchKey = {
          onLand: crouchOnLand,
          floatedAt: round(floatY),
          divedTo,
          dives: divedTo < floatY - 1,
        };

        // The plain jump answers the press rather than the release, and
        // keeps climbing while the button is held. Measured as frames from
        // the press to his feet leaving the ground, and as how high each
        // length of hold takes him.
        {
          const jumpHeld = (holdSeconds: number) => {
            place(TEST_GROUND.x, 0, TEST_GROUND.z, TEST_FACING);
            const from = player.position.y;
            tap('jump');
            let offAfter = -1;
            let peak = from;
            const holdFrames = frames(holdSeconds);
            for (let i = 0; i < frames(2); i += 1) {
              if (i >= holdFrames) held.delete('jump');
              step();
              pressed.clear();
              if (offAfter < 0 && player.position.y > from + 0.02) offAfter = i + 1;
              peak = Math.max(peak, player.position.y);
            }
            held.clear();
            for (let i = 0; i < frames(0.6); i += 1) step();
            return { frames: offAfter, peak: round(peak - from) };
          };

          const tapped = jumpHeld(1 / 60);
          const short = jumpHeld(0.1);
          const full = jumpHeld(0.4);
          results.jumpTiming = {
            tapped,
            short,
            full,
            // Off the ground on the frame after the press, whatever the hold.
            answersThePress: tapped.frames <= 2 && full.frames <= 2,
            // And still higher the longer it is held.
            higherWhenHeld: full.peak > short.peak + 0.2 && short.peak > tapped.peak + 0.2,
          };
        }

        // Tapping jump and then the side flip, with no pause between the
        // two. The second tap regularly lands in the frames before his feet
        // have left the ground, where there is no jump yet to turn into a
        // flip, so it has to be kept and spent on the first frame it can be.
        {
          const sequence = (gap: number, running: boolean) => {
            place(TEST_GROUND.x, 0, TEST_GROUND.z, TEST_FACING);
            if (running) {
              stick.y = -1;
              for (let i = 0; i < frames(1); i += 1) step();
            }
            const before = round(player.speed);
            // The Side button winds up while it is held, which is what
            // arms the flip; pressing it is holding it down.
            const pressSide = () => {
              winding.action = 'sideJump';
              winding.level = 0;
            };
            const letSideGo = () => {
              winding.action = null;
            };
            // Negative gap: the flip asked for before the jump button.
            if (gap < 0) {
              pressSide();
              step();
              held.clear();
              for (let i = 0; i < -gap - 1; i += 1) {
                step();
                held.clear();
              }
              tap('jump');
              step();
              held.clear();
            } else {
              tap('jump');
              step();
              held.clear();
              for (let i = 0; i < gap; i += 1) {
                step();
                held.clear();
              }
              pressSide();
              step();
              held.clear();
            }
            let move = 'normal';
            let carried = 0;
            let flipFrames = 0;
            for (let i = 0; i < frames(1.4); i += 1) {
              // The finger comes off a few frames later, as a tap does.
              if (i === 4) letSideGo();
              step();
              held.clear();
              if (player.stateName === 'side-flip') {
                move = 'side';
                flipFrames += 1;
                // Read a few frames in, not on the first: on the frame the
                // flip is set up he is still carrying the speed he had, so
                // the first reading says nothing about what the move did
                // with it.
                if (flipFrames === frames(0.15)) carried = round(player.speed);
              }
            }
            stick.y = 0;
            held.clear();
            letSideGo();
            for (let i = 0; i < frames(1.2); i += 1) step();
            return { move, before, carried: round(carried) };
          };

          const rows: Record<string, { move: string; before: number; carried: number }> = {};
          // The flip one frame before the jump, on the same frame, and one,
          // three and eight frames after it — standing still and at a run.
          for (const gap of [-1, 0, 1, 3, 8]) {
            rows[`run${gap}`] = sequence(gap, true);
            rows[`still${gap}`] = sequence(gap, false);
          }
          const every = Object.values(rows);
          results.sideFlipSequence = {
            rows,
            // Every one of them turns into a side flip, however the two taps
            // fall against each other and whether or not he was running.
            alwaysFlips: every.every((r) => r.move === 'side'),
            // And a flip out of a run carries the run with it rather than
            // being dropped to the move's own speed — which is what the
            // same flip from a standstill is left with.
            keepsMomentum: rows.run1.carried > rows.still1.carried + 1.5,
          };
        }

        // Held to wind a move up, let go to launch it: the three moves that
        // have a button of their own, each going higher the longer it was
        // held, and none of them going anywhere while it is still held,
        // however long that is.
        {
          const launch = (action: string, level: number) => {
            place(TEST_GROUND.x, 0, TEST_GROUND.z, TEST_FACING);
            for (let i = 0; i < frames(0.3); i += 1) step();
            const from = player.position.y;
            tapCharged(action, level);
            let peak = from;
            let move = 'normal';
            for (let i = 0; i < frames(2.4); i += 1) {
              step();
              held.clear();
              peak = Math.max(peak, player.position.y);
              // Taken while he is in the air: the kind goes back to normal
              // the moment he lands, so reading it afterwards reads nothing.
              if (player.position.y > from + 0.1) move = player.jumpInfo.kind;
            }
            const out = { peak: round(peak - from), kind: move };
            for (let i = 0; i < frames(0.8); i += 1) step();
            return out;
          };

          const rows: Record<string, { tap: number; full: number; kind: string }> = {};
          let allHigher = true;
          // Jump is not among them any more: it answers the press and
          // climbs while held, which jumpTiming covers.
          for (const action of ['backflip', 'sideJump', 'diveJump']) {
            const tapped = launch(action, 0);
            const wound = launch(action, 1);
            rows[action] = { tap: tapped.peak, full: wound.peak, kind: wound.kind };
            if (!(wound.peak > tapped.peak + 0.25)) allHigher = false;
          }

          // Held at full wind-up and never let go of: he gathers, and he
          // stays exactly where he is.
          place(TEST_GROUND.x, 0, TEST_GROUND.z, TEST_FACING);
          winding.action = 'backflip';
          winding.level = 0;
          const standing = player.position.y;
          let gather = 0;
          let highest = standing;
          for (let i = 0; i < frames(2); i += 1) {
            winding.level = Math.min(1, i / frames(0.42));
            step();
            gather = Math.max(gather, player.windUpShowing);
            highest = Math.max(highest, player.position.y);
          }
          const waited = {
            gathered: round(gather),
            rose: round(highest - standing),
            state: player.stateName,
          };
          // And then let go of, from exactly that.
          winding.action = null;
          winding.level = 0;
          tapCharged('backflip', 1);
          let afterPeak = player.position.y;
          let afterKind = 'normal';
          for (let i = 0; i < frames(2); i += 1) {
            step();
            held.clear();
            afterPeak = Math.max(afterPeak, player.position.y);
            if (player.position.y > standing + 0.1) afterKind = player.jumpInfo.kind;
          }
          const released = { peak: round(afterPeak - standing), kind: afterKind };

          // Given up on rather than let go of: no move, and no crouching
          // over one that is never coming.
          place(TEST_GROUND.x, 0, TEST_GROUND.z, TEST_FACING);
          winding.action = 'backflip';
          winding.level = 1;
          for (let i = 0; i < frames(0.5); i += 1) step();
          winding.action = null;
          winding.level = 0;
          let afterCancel = player.position.y;
          for (let i = 0; i < frames(1); i += 1) {
            step();
            afterCancel = Math.max(afterCancel, player.position.y);
          }
          const cancelled = {
            rose: round(afterCancel - standing),
            windUp: round(player.windUpShowing),
            state: player.stateName,
          };

          results.charging = {
            rows,
            waited,
            released,
            cancelled,
            // Longer hold, higher move, on every one of the four.
            higherWhenHeld: allHigher,
            // Winding up is a stance, not a launch.
            staysDown: waited.rose < 0.05 && waited.gathered > 0.95,
            // And a full wind-up waits to be let go of rather than firing.
            waitsForRelease: released.peak > 2.5 && released.kind === 'back',
            // Giving up leaves him standing.
            cancelClears: cancelled.rose < 0.05 && cancelled.windUp === 0,
          };
        }

        // The boost and the pound are the second and third presses of one
        // button, and under a thumb one press often arrives twice. They are
        // kept apart in time as well as in count, so the pair cannot both
        // happen by accident.
        {
          const inTheAir = (gap: number) => {
            place(TEST_GROUND.x, 0, TEST_GROUND.z, TEST_FACING);
            tap('jump');
            for (let i = 0; i < frames(0.25); i += 1) {
              step();
              held.clear();
            }
            // The press that lifts him.
            tap('jump');
            step();
            held.clear();
            const boosted = player.jumpInfo.airPresses;
            // And the one after it, however long after it.
            for (let i = 0; i < frames(gap); i += 1) {
              step();
              held.clear();
            }
            tap('jump');
            step();
            held.clear();
            const out = {
              boosted,
              presses: player.jumpInfo.airPresses,
              pound: player.jumpInfo.pound,
              state: player.stateName,
            };
            for (let i = 0; i < frames(2); i += 1) {
              step();
              held.clear();
            }
            return out;
          };

          const sameFrame = inTheAir(0);
          const tooSoon = inTheAir(0.08);
          const justInside = inTheAir(0.14);
          const deliberate = inTheAir(0.3);
          results.boostThenPound = {
            sameFrame,
            tooSoon,
            justInside,
            deliberate,
            lifts: sameFrame.boosted === 1,
            // Anything inside the window is the same tap arriving twice.
            ignoresFastSecond:
              sameFrame.pound === 'none' && tooSoon.pound === 'none' && justInside.pound === 'none',
            // Past it, it is a second decision.
            poundsLater: deliberate.pound !== 'none',
          };
        }

        // Underwater. Once he has dived he stays at the depth he is left
        // at, steers by the camera in every direction, and comes back to the
        // surface only by swimming to it. Each of those is driven here the
        // way a player would: go under, let go, and see what he does.
        {
          const pool = { x: -35, z: 12 };
          const run = (seconds: number, each?: () => void) => {
            for (let i = 0; i < frames(seconds); i += 1) {
              step();
              each?.();
            }
          };
          const quiet = () => {
            held.clear();
            stick.x = 0;
            stick.y = 0;
          };
          /** Floating at the surface, facing along -z, camera level. */
          const float = () => {
            camera.yaw = 0;
            camera.pitch = 0;
            place(pool.x, 0, pool.z, Math.PI);
            run(2.5);
            return player.position.y;
          };
          /** Under by one of the three ways there are, then everything let go. */
          const goUnder = (how: 'tap C' | 'hold C' | 'hold Q', seconds = 1) => {
            const floatY = float();
            if (how === 'tap C') {
              tap('crouch');
              run(0.08);
              held.delete('crouch');
            } else {
              tap(how === 'hold C' ? 'crouch' : 'dive');
              run(seconds);
            }
            quiet();
            // Long enough for the glide to have run out.
            run(1.6);
            return floatY;
          };

          // ---- Holding depth with nothing pressed ----
          const holds = (['tap C', 'hold C', 'hold Q'] as const).map((how) => {
            const floatY = goUnder(how);
            const from = { ...where() };
            let highest = from.y;
            let lowest = from.y;
            const states = new Set<string>();
            // Ten seconds, with the camera swung about the whole time: a
            // glance is a glance, and must not move him either.
            let t = 0;
            run(10, () => {
              t += dt;
              camera.pitch = Math.sin(t * 1.7) * 0.9;
              camera.yaw = Math.sin(t * 0.9) * 1.4;
              highest = Math.max(highest, player.position.y);
              lowest = Math.min(lowest, player.position.y);
              states.add(player.stateName);
            });
            const to = { ...where() };
            camera.pitch = 0;
            camera.yaw = 0;
            return {
              how,
              depth: round(floatY - from.y),
              rose: round(highest - from.y, 3),
              sank: round(from.y - lowest, 3),
              slid: round(Math.hypot(to.x - from.x, to.z - from.z), 3),
              states: [...states],
            };
          });

          // ---- Steering, each way in turn from a standstill ----
          // Started deep for the ones that go up and shallow for the ones
          // that go down, so that neither the surface nor the floor of the
          // pool gets in the way of what is being measured.
          const push = (
            set: () => void,
            under = 0.8,
            seconds = 1,
          ): { dx: number; dy: number; dz: number } => {
            goUnder('hold C', under);
            const from = { ...where() };
            set();
            run(seconds);
            const to = { ...where() };
            quiet();
            camera.pitch = 0;
            camera.yaw = 0;
            return {
              dx: round(to.x - from.x),
              dy: round(to.y - from.y),
              dz: round(to.z - from.z),
            };
          };
          const steer = {
            forward: push(() => { stick.y = -1; }),
            back: push(() => { stick.y = 1; }),
            right: push(() => { stick.x = 1; }),
            left: push(() => { stick.x = -1; }),
            lookDown: push(() => { camera.pitch = 0.95; stick.y = -1; }, 0.35),
            lookUp: push(() => { camera.pitch = -0.55; stick.y = -1; }, 1.3),
            lookAside: push(() => { camera.yaw = Math.PI / 2; stick.y = -1; }),
            upButton: push(() => { held.add('jump'); }, 1.3),
            downButton: push(() => { held.add('crouch'); }, 0.35),
            downKey: push(() => { held.add('dive'); }, 0.35),
            // Two at once: along and up together, as a thumb on each side does.
            alongAndUp: push(() => { stick.y = -1; held.add('jump'); }, 1.3),
          };
          // Right has to mean the same thing under the water as on top of it.
          float();
          const surfaceFrom = { ...where() };
          stick.x = 1;
          run(1);
          const surfaceRight = round(where().x - surfaceFrom.x);
          quiet();

          // ---- How quickly it answers, and how gently ----
          const speedNow = () =>
            Math.hypot(player.velocity.x, player.velocity.y, player.velocity.z);
          const answer = (amount: number) => {
            goUnder('hold C', 1.2);
            stick.y = -amount;
            let toHalf = -1;
            let toMost = -1;
            let sharpest = 0;
            let last = speedNow();
            let t = 0;
            run(1.5, () => {
              t += dt;
              const now = speedNow();
              sharpest = Math.max(sharpest, Math.abs(now - last) / dt);
              last = now;
              if (toHalf < 0 && now >= 0.5 * amount * TUNING.swimSpeed) toHalf = t;
              if (toMost < 0 && now >= 0.9 * amount * TUNING.swimSpeed) toMost = t;
            });
            const cruise = speedNow();
            // Let go, and see how far he carries on.
            const at = { ...where() };
            quiet();
            let rest = -1;
            t = 0;
            run(3, () => {
              t += dt;
              if (rest < 0 && speedNow() === 0) rest = t;
            });
            const stopped = { ...where() };
            return {
              amount,
              cruise: round(cruise),
              toHalf: round(toHalf, 3),
              toMost: round(toMost, 3),
              sharpest: round(sharpest, 1),
              glide: round(Math.hypot(stopped.x - at.x, stopped.y - at.y, stopped.z - at.z)),
              rest: round(rest, 2),
            };
          };
          const response = [1, 0.5, 0.15].map(answer);

          // A nudge: the stick held for a tenth of a second and let go.
          goUnder('hold C', 1.2);
          const nudgeFrom = { ...where() };
          stick.y = -1;
          run(0.1);
          quiet();
          run(2);
          const nudge = round(Math.hypot(where().x - nudgeFrom.x, where().z - nudgeFrom.z));

          // Turning round: full ahead, then full astern.
          goUnder('hold C', 1.2);
          stick.y = -1;
          run(1.2);
          stick.y = 1;
          let reversed = -1;
          {
            let t = 0;
            run(1.5, () => {
              t += dt;
              if (reversed < 0 && player.velocity.z > 0) reversed = t;
            });
          }
          quiet();

          // ---- Coming back up, on purpose ----
          const surface = (set: () => void) => {
            const floatY = goUnder('hold C', 1.2);
            const depth = round(floatY - player.position.y);
            set();
            const states: string[] = [];
            let highest = -Infinity;
            let took = -1;
            let t = 0;
            run(6, () => {
              t += dt;
              const name = player.stateName;
              if (states[states.length - 1] !== name) states.push(name);
              highest = Math.max(highest, player.position.y);
              if (took < 0 && name === 'swim-surface') took = t;
            });
            // And then left alone at the top: it must keep him.
            quiet();
            camera.pitch = 0;
            run(3, () => {
              const name = player.stateName;
              if (states[states.length - 1] !== name) states.push(name);
              highest = Math.max(highest, player.position.y);
            });
            return {
              depth,
              took: round(took, 2),
              endedAt: round(player.position.y - floatY, 3),
              overshot: round(highest - floatY, 3),
              states,
              surfaced:
                player.stateName === 'swim-surface' &&
                Math.abs(player.position.y - floatY) < 0.05 &&
                states.every((n) => n.startsWith('swim')),
            };
          };
          const surfacing = {
            button: surface(() => { held.add('jump'); }),
            looking: surface(() => { camera.pitch = -0.9; stick.y = -1; }),
          };

          // At the surface, looking down and pushing is only swimming along.
          const surfaceY = float();
          camera.pitch = 0.95;
          stick.y = -1;
          run(1.6);
          const surfaceDrop = round(player.position.y - surfaceY);
          quiet();
          camera.pitch = 0;

          const still = (h: { rose: number; sank: number; slid: number }) =>
            h.rose < 0.02 && h.sank < 0.02 && h.slid < 0.02;
          results.underwater = {
            holds,
            steer,
            surfaceRight,
            response,
            nudge,
            reversed: round(reversed, 2),
            surfacing,
            surfaceDrop,
            // Every way under ends properly under, and stays exactly there.
            dives: holds.every((h) => h.depth > 0.6),
            holdsDepth:
              holds.every(still) && holds.every((h) => h.states.join() === 'swim-under'),
            // Each direction goes its own way and not another.
            steers:
              steer.forward.dz < -1.5 && Math.abs(steer.forward.dy) < 0.05 &&
              steer.back.dz > 1.5 &&
              steer.right.dx > 1.5 && Math.abs(steer.right.dy) < 0.05 &&
              steer.left.dx < -1.5 &&
              steer.lookDown.dy < -1.2 &&
              steer.lookUp.dy > 0.8 &&
              Math.abs(steer.lookAside.dx) > 1.5 &&
              Math.abs(steer.lookAside.dx) > Math.abs(steer.lookAside.dz) * 5,
            buttons:
              steer.upButton.dy > 1.5 && Math.hypot(steer.upButton.dx, steer.upButton.dz) < 0.02 &&
              steer.downButton.dy < -1.5 && steer.downKey.dy < -1.5 &&
              steer.alongAndUp.dy > 1 && steer.alongAndUp.dz < -1,
            rightIsRight: Math.sign(surfaceRight) === Math.sign(steer.right.dx),
            // Half a push is half the speed, and a touch is a touch.
            proportional: response.every(
              (r) => Math.abs(r.cruise - r.amount * TUNING.swimSpeed) < 0.05,
            ),
            quick: response[0].toHalf < 0.15 && response[0].toMost < 0.4,
            comesToRest: response.every((r) => r.rest > 0 && r.rest < 2),
            comesUp: surfacing.button.surfaced && surfacing.looking.surfaced,
            surfaceIsFree: Math.abs(surfaceDrop) < 0.35,
          };
        }

        // The boost: a jump on its own against the same jump with a second
        // press of the button at the top of it.
        {
          const peakOf = (boost: boolean) => {
            place(TEST_GROUND.x, 0, TEST_GROUND.z, TEST_FACING);
            const hold = frames(0.32);
            tap('jump');
            let peak = 0;
            let boosted = false;
            for (let i = 0; i < frames(2.6); i += 1) {
              step();
              peak = Math.max(peak, player.position.y);
              if (i === hold) held.delete('jump');
              // Boosted at the top of the rise, and held through it, which
              // is what a player does: a tapped boost is cut like any other.
              if (boost && !boosted && i > hold && player.velocity.y < 0.5) {
                tap('jump');
                boosted = true;
              }
            }
            held.clear();
            return round(peak);
          };
          const plain = peakOf(false);
          const boosted = peakOf(true);
          results.airBoost = { plain, boosted, gain: round(boosted - plain), lifts: boosted > plain + 0.7 };
        }

        // Kicks beyond the old limit of four, in the sixteen metre shaft.
        place(M.alley.x, 0, M.alley.tall.z, Math.PI / 2);
        stick.x = 1;
        for (let i = 0; i < frames(0.35); i += 1) step();
        tap('jump');
        let hold = frames(0.3);
        let many = 0;
        let top = 0;
        for (let i = 0; i < frames(12); i += 1) {
          step();
          top = Math.max(top, player.position.y);
          if (hold > 0) {
            hold -= 1;
            if (hold === 0) held.delete('jump');
          } else if (player.stateName === 'wall-slide') {
            tap('jump');
            hold = frames(0.3);
            many += 1;
            stick.x = -stick.x;
          }
          if (player.stateName === 'hanging') break;
        }
        stick.x = 0;
        held.clear();
        results.manyKicks = { kicks: many, highest: round(top), pastFour: many > 4 };

        // The crate on the warehouse roof.
        place(M.crate.x, M.crate.y, M.crate.z + 2, Math.PI);
        stick.y = -0.35;
        for (let i = 0; i < frames(0.8); i += 1) step();
        stick.y = 0;
        for (let i = 0; i < frames(0.4); i += 1) step();
        tap('grab');
        step();
        held.delete('grab');
        for (let i = 0; i < frames(0.4); i += 1) step();
        results.crate = { carrying: player.carried !== null };

        // The yard climbed the way a player would climb it: from the
        // ground, by the stick and the buttons, with nothing placed in
        // mid-air. The tests above each start him where a move begins;
        // these start him on the floor and ask whether the place itself
        // can be got up.
        {
          camera.yaw = 0;
          camera.pitch = 0;
          const settle = (seconds = 0.3) => {
            for (let i = 0; i < frames(seconds); i += 1) step();
          };
          const quiet = () => {
            stick.x = 0;
            stick.y = 0;
          };
          /** Walks to a point, easing off as he gets there. */
          const walkTo = (x: number, z: number, seconds = 4) => {
            for (let i = 0; i < frames(seconds); i += 1) {
              const dx = x - player.position.x;
              const dz = z - player.position.z;
              const far = Math.hypot(dx, dz);
              if (far < 0.1) break;
              const pace = Math.min(1, Math.max(0.3, far / 1.2));
              stick.x = (dx / far) * pace;
              stick.y = (dz / far) * pace;
              step();
            }
            quiet();
            settle();
          };
          /**
           * Runs at a point and jumps to it, taking `lead` seconds of run
           * before leaving the ground. True if he ends standing at `top`.
           */
          const hopTo = (x: number, z: number, top: number, lead = 0) => {
            // Turn to face it first, as anyone would: setting off at a run
            // while still facing the other way goes round in an arc, and on
            // top of a crate there is no room for an arc.
            for (let i = 0; i < frames(0.6); i += 1) {
              const want = Math.atan2(x - player.position.x, z - player.position.z);
              let off = want - player.facing;
              while (off > Math.PI) off -= Math.PI * 2;
              while (off < -Math.PI) off += Math.PI * 2;
              if (Math.abs(off) < 0.15) break;
              stick.x = Math.sin(want) * 0.2;
              stick.y = Math.cos(want) * 0.2;
              step();
            }
            let hold = -1;
            for (let i = 0; i < frames(2.4 + lead); i += 1) {
              const dx = x - player.position.x;
              const dz = z - player.position.z;
              const far = Math.hypot(dx, dz);
              // Full ahead until he is nearly over it, then easing off, so
              // that he comes down on a crate rather than running off it.
              const pace = Math.min(1, far / 1.2);
              stick.x = far > 0.1 ? (dx / far) * pace : 0;
              stick.y = far > 0.1 ? (dz / far) * pace : 0;
              if (i === frames(lead) - (lead > 0 ? 0 : 1)) {
                tap('jump');
                hold = frames(0.3);
              }
              step();
              if (hold > 0) {
                hold -= 1;
                if (hold === 0) held.delete('jump');
              }
              if (hold === 0 && player.onGround) break;
              if (player.stateName === 'hanging') break;
            }
            held.delete('jump');
            quiet();
            // Short of it, and holding on by the edge instead: pull up. That
            // is what the edge is for, and what anyone would do.
            if (player.stateName === 'hanging') {
              settle(0.2);
              tap('jump');
              step();
              held.delete('jump');
              for (let i = 0; i < frames(2.4); i += 1) {
                step();
                if (player.onGround) break;
              }
            }
            settle();
            return Math.abs(player.position.y - top) < 0.1;
          };
          /**
           * Jumps at an edge and catches it, moves along it if asked, and
           * pulls up. The whole of "reach the ledge, grab it, traverse,
           * pull yourself onto the roof".
           */
          const catchAndClimb = (dirX: number, dirZ: number, top: number, along = 0) => {
            const fromY = player.position.y;
            stick.x = dirX;
            stick.y = dirZ;
            tap('jump');
            let hold = frames(0.35);
            let caught = false;
            for (let i = 0; i < frames(1.8); i += 1) {
              step();
              if (hold > 0) {
                hold -= 1;
                if (hold === 0) held.delete('jump');
              }
              if (player.stateName === 'hanging') {
                caught = true;
                break;
              }
            }
            held.delete('jump');
            quiet();
            if (!caught) {
              settle(1);
              return { caught, moved: 0, up: false, from: round(fromY), y: round(player.position.y) };
            }
            const at = { x: player.position.x, z: player.position.z };
            if (along !== 0) {
              camera.yaw = player.facing + Math.PI;
              stick.x = along;
              for (let i = 0; i < frames(1.2); i += 1) step();
              quiet();
              camera.yaw = 0;
            }
            const moved = Math.hypot(player.position.x - at.x, player.position.z - at.z);
            const stillOn = player.stateName === 'hanging';
            tap('jump');
            step();
            held.delete('jump');
            for (let i = 0; i < frames(2.4); i += 1) {
              step();
              if (player.onGround && player.position.y > top - 0.1) break;
            }
            settle();
            return {
              caught,
              moved: round(moved),
              stillOn,
              up: player.onGround && Math.abs(player.position.y - top) < 0.1,
              from: round(fromY),
              y: round(player.position.y),
            };
          };

          // The crates against the warehouse, the roof edge, along it, up.
          place(-6.8, 0, 11.5, Math.PI);
          settle();
          const crate1 = hopTo(-6.8, 7.3, 1.2, 0.15);
          // From the near edge of the crate, standing: with the whole of
          // it to run along he clears the next stack altogether and catches
          // the one after it by its edge. Which is a perfectly good way up,
          // but it is not the one being measured.
          walkTo(-5.95, 7.2);
          const crate2 = hopTo(-3.8, 7.2, 2.4);
          walkTo(-2.6, 7.2);
          const crate3 = hopTo(-0.4, 7.2, 3.6);
          walkTo(0.2, 6.6);
          const roofEdge = catchAndClimb(0, -1, M.roof.top, 1);
          const crates = {
            crate1,
            crate2,
            crate3,
            roofEdge,
            climbed: crate1 && crate2 && crate3 && roofEdge.up && roofEdge.moved > 1,
          };

          // The balconies up the mill: four catches and the roof.
          place(23.9, 0, 6.6, Math.PI);
          settle();
          const steps: Array<ReturnType<typeof catchAndClimb>> = [];
          steps.push(catchAndClimb(0, -1, 3.2));
          walkTo(23.9, 3.45);
          steps.push(catchAndClimb(0, -1, 6.2));
          walkTo(23.9, 0.05);
          steps.push(catchAndClimb(0, -1, 9));
          walkTo(23.9, -3.35);
          steps.push(catchAndClimb(0, -1, 11.6));
          walkTo(23.4, -5.9);
          steps.push(catchAndClimb(-1, 0, M.alley.tall.top));
          const balconies = { steps, climbed: steps.every((s) => s.up) };

          // The gate: its wall, and from the wall the beam.
          place(8, 0, 49.5, Math.PI);
          settle();
          const gateWall = catchAndClimb(0, -1, 2.4);
          walkTo(7, 48);
          const gateBeam = catchAndClimb(-1, 0, 5);
          const gate = { gateWall, gateBeam, climbed: gateWall.up && gateBeam.up };

          // The two ladders the ladder test does not use: one that faces
          // another way, and one that starts on a roof.
          const ladderUp = (
            x: number,
            y: number,
            z: number,
            facing: number,
            top: number,
          ) => {
            place(x, y, z, facing);
            settle();
            stick.x = Math.sin(facing);
            stick.y = Math.cos(facing);
            let on = false;
            for (let i = 0; i < frames(3); i += 1) {
              step();
              if (player.stateName === 'climb') {
                on = true;
                break;
              }
            }
            quiet();
            // Up is the stick's own up, whichever way the ladder faces.
            stick.y = -1;
            for (let i = 0; i < frames(8); i += 1) {
              step();
              if (player.onGround && player.position.y > top - 0.1) break;
            }
            quiet();
            settle();
            return { on, y: round(player.position.y), up: player.onGround && Math.abs(player.position.y - top) < 0.1 };
          };
          const ladders = {
            highDive: ladderUp(-19.5, 0, 34.5, Math.PI, 6),
            core: ladderUp(1.5, M.roof.top, -5.5, Math.PI / 2, M.alley.tall.top),
          };

          held.clear();
          quiet();
          results.routes = {
            crates,
            balconies,
            gate,
            ladders,
            allClimbed:
              crates.climbed &&
              balconies.climbed &&
              gate.climbed &&
              ladders.highDive.up &&
              ladders.core.up,
          };
        }

        place(0, 0, 54, Math.PI);
        return results;
      },

      /**
       * Steps the controller with a fixed stick and a set of buttons held,
       * so a pose can be driven to a known point and photographed. Only for
       * the verification pass: the game itself never calls it.
       */
      drive: (
        seconds: number,
        stick: { x: number; y: number } = { x: 0, y: 0 },
        keys: string[] = [],
        dt = 1 / 60,
        // Where the camera is looking. Movement is camera-relative, so
        // driving "right" with this left at zero while he faces along +x
        // presses into the wall rather than along it.
        yaw = 0,
        // Buttons tapped on the first step of this call, for driving a move
        // that answers a press rather than a hold.
        presses: string[] = [],
        // Where the camera is tilted, for the one move steered by looking.
        pitch = 0,
      ) => {
        const held = new Set(keys);
        const pressed = new Set(presses);
        const stub = {
          move: stick,
          look: { x: 0, y: 0 },
          isDown: (a: string) => held.has(a) || pressed.has(a),
          wasPressed: (a: string) => pressed.has(a),
          wasReleased: () => false,
          // No thumb here: these drive the controller as a keyboard does.
          chargeOf: () => null,
          chargingAction: () => null,
          chargeNow: () => 0,
        } as unknown as Input;
        for (let i = 0; i < Math.max(1, Math.round(seconds / dt)); i += 1) {
          this.player.update(dt, stub, yaw, pitch);
          pressed.clear();
        }
        return {
          state: this.player.stateName,
          y: Math.round(this.player.position.y * 100) / 100,
          speed: Math.round(this.player.speed * 100) / 100,
        };
      },

      /**
       * Checks that what is solid and what can be seen are the same thing.
       *
       * Collision is baked from the meshes handed to `addSolid`, so the two
       * can only part company in a handful of ways, and each of them is
       * worth catching rather than assuming away: a mesh that is solid but
       * never drawn is an invisible wall; one drawn only from the far side
       * is an invisible wall from this one; one that was moved after the
       * bake leaves its collision behind where it used to be; and anything
       * added to the scene after the bake is a surface you walk through.
       *
       * It reports rather than judges, so a deliberate difference — a sign,
       * a marker, a ladder, something to pick up — shows as what it is.
       */
      collisionAudit: () => {
        const solidRoots = this.collision.solids;
        const inSolid = new Set<Object3D>();
        let solidMeshes = 0;
        let solidTriangles = 0;
        const faults: string[] = [];
        const tris = (mesh: Mesh) => {
          const g = mesh.geometry;
          if (g.index) return g.index.count / 3;
          return (g.attributes.position?.count ?? 0) / 3;
        };
        const describe = (mesh: Mesh) => {
          const p = mesh.getWorldPosition(new Vector3());
          const round1 = (v: number) => Math.round(v * 10) / 10;
          return `${mesh.name || mesh.geometry.type} at ${round1(p.x)}, ${round1(p.y)}, ${round1(p.z)}`;
        };

        for (const root of solidRoots) {
          root.updateWorldMatrix(true, true);
          root.traverse((object) => {
            inSolid.add(object);
            if (!(object instanceof Mesh)) return;
            solidMeshes += 1;
            solidTriangles += tris(object);
            // Solid but never drawn, or drawn see-through: an invisible wall.
            let hidden = !object.visible;
            for (let a: Object3D | null = object.parent; a; a = a.parent) {
              // A circuit left out because it is far away is not an invisible wall.
              if (!a.visible && !a.userData.distanceCulled) hidden = true;
            }
            if (hidden) faults.push(`solid but not drawn: ${describe(object)}`);
            const material = object.material as { transparent?: boolean; opacity?: number; side?: number } | undefined;
            if (material?.transparent && (material.opacity ?? 1) < 0.9) {
              faults.push(`solid but see-through: ${describe(object)}`);
            }
            // THREE.BackSide is 1: drawn only from behind, so from in front
            // it is a wall you cannot see.
            if (material?.side === 1) faults.push(`solid but inside-out: ${describe(object)}`);
            // Moved since the bake: its collision stayed where it was.
            const baked = (object.userData.bakedAt as Vector3 | undefined) ?? null;
            const here = object.getWorldPosition(new Vector3());
            if (baked && baked.distanceTo(here) > 0.001) {
              faults.push(`moved since it was made solid: ${describe(object)}`);
            }
          });
        }

        // Everything else that is drawn, so a deliberate difference can be
        // read off rather than guessed at. The ones worth naming are the
        // ones with enough body to walk into: a sign panel, a painted
        // marker or a ladder rung is thin enough that passing through it
        // is not what anyone would call a solid surface, while a crate is
        // not, and has to be a deliberate choice rather than an oversight.
        const loose: Record<string, number> = {};
        const walkThrough: Record<string, number> = {};
        const box = new Box3();
        this.engine.scene.traverse((object) => {
          if (!(object instanceof Mesh)) return;
          if (inSolid.has(object)) return;
          if (this.player.rig.root.getObjectById(object.id)) return;
          // The kart is something he climbs into, not something he stands on.
          for (let a: Object3D | null = object.parent; a; a = a.parent) {
            if (a.userData.vehicle) return;
          }
          const name = object.name || object.geometry.type;
          loose[name] = (loose[name] ?? 0) + 1;
          // Measured on the geometry itself rather than on a world box: a
          // flat board turned at an angle has a fat world box and no body
          // at all, and a board is not something anyone expects to stop
          // them.
          object.geometry.computeBoundingBox();
          box.copy(object.geometry.boundingBox ?? box.makeEmpty());
          const size = box.getSize(new Vector3()).multiply(object.getWorldScale(new Vector3()));
          // Many flat pieces drawn as one mesh say how thick the thickest
          // of them is, since the box round all of them cannot.
          const thickest =
            (object.userData.thickest as number | undefined) ?? Math.min(size.x, size.y, size.z);
          if (thickest > 0.3) {
            walkThrough[name] = (walkThrough[name] ?? 0) + 1;
          }
        });

        // The lighter band along a top edge has to run the whole way along
        // the surface it marks. Where two structures are built flush at the
        // same height they read as one, and a band that belongs to only one
        // of them stops dead half way along — which is what made the ledge
        // at station 5 look half missing. So: gather every run of solid
        // that joins up at one height, walk its open edge, and if any of
        // that edge carries a band then all of it has to.
        const bandFaults: string[] = [];
        {
          const blocks: Box3[] = [];
          const bands: Box3[] = [];
          for (const root of solidRoots) {
            root.traverse((object) => {
              if (!(object instanceof Mesh)) return;
              if (object.name === 'edge-band') {
                // A band is one mesh covering many separate runs of edge,
                // so its own bounding box says nothing useful; the runs it
                // was built from are kept on it for exactly this.
                for (const run of (object.userData.bands ?? []) as Box3[]) bands.push(run);
                return;
              }
              const pieces = object.userData.blocks as Box3[] | undefined;
              if (pieces) blocks.push(...pieces);
              else blocks.push(new Box3().setFromObject(object));
            });
          }
          const joined = (a: Box3, b: Box3) =>
            Math.abs(a.max.y - b.max.y) < 0.02 &&
            a.min.x < b.max.x + 0.01 &&
            b.min.x < a.max.x + 0.01 &&
            a.min.z < b.max.z + 0.01 &&
            b.min.z < a.max.z + 0.01;

          const taken = new Set<Box3>();
          for (const seed of blocks) {
            if (taken.has(seed)) continue;
            const group = [seed];
            taken.add(seed);
            for (let i = 0; i < group.length; i += 1) {
              for (const other of blocks) {
                if (taken.has(other) || !joined(group[i], other)) continue;
                taken.add(other);
                group.push(other);
              }
            }
            const top = seed.max.y;
            const covered = (x: number, z: number) =>
              group.some(
                (b) => x > b.min.x + 0.01 && x < b.max.x - 0.01 && z > b.min.z + 0.01 && z < b.max.z - 0.01,
              );
            let open = 0;
            let marked = 0;
            for (const b of group) {
              const sides = [
                { axis: 'x', from: b.min.x, to: b.max.x, at: b.min.z, out: -1 },
                { axis: 'x', from: b.min.x, to: b.max.x, at: b.max.z, out: 1 },
                { axis: 'z', from: b.min.z, to: b.max.z, at: b.min.x, out: -1 },
                { axis: 'z', from: b.min.z, to: b.max.z, at: b.max.x, out: 1 },
              ] as const;
              for (const side of sides) {
                const span = side.to - side.from;
                const steps = Math.max(1, Math.round(span / 0.5));
                for (let i = 0; i < steps; i += 1) {
                  const middle = side.from + ((i + 0.5) * span) / steps;
                  const beyond = side.at + side.out * 0.1;
                  const x = side.axis === 'x' ? middle : beyond;
                  const z = side.axis === 'x' ? beyond : middle;
                  if (covered(x, z)) continue;
                  open += 1;
                  const on = side.at + side.out * 0.02;
                  const bx = side.axis === 'x' ? middle : on;
                  const bz = side.axis === 'x' ? on : middle;
                  const y = top - 0.08;
                  if (
                    bands.some(
                      (band) =>
                        bx > band.min.x - 0.02 &&
                        bx < band.max.x + 0.02 &&
                        bz > band.min.z - 0.02 &&
                        bz < band.max.z + 0.02 &&
                        y > band.min.y - 0.02 &&
                        y < band.max.y + 0.02,
                    )
                  ) {
                    marked += 1;
                  }
                }
              }
            }
            if (marked > 0 && marked < open) {
              bandFaults.push(
                `the band at ${Math.round(top * 10) / 10}m covers ${marked} of ${open} ` +
                  `open steps of one joined surface`,
              );
            }
          }
        }
        for (const fault of bandFaults) faults.push(fault);

        return {
          solidRoots: solidRoots.length,
          solidMeshes,
          solidTriangles,
          faults,
          loose,
          walkThrough,
        };
      },

      /** How high the island's ground is at a point, from its description. */
      groundHeight: (x: number, z: number) => this.voxel?.topAt(x, z) ?? 0,

      /** Looks straight down from a point, for checking where surfaces are. */
      probe: (x: number, y: number, z: number, drop = 8) => {
        const hit = this.collision.groundProbe(new Vector3(x, y, z), drop);
        return hit ? { y: Math.round(hit.y * 1000) / 1000, normalY: Math.round(hit.normal.y * 100) / 100 } : null;
      },

      /**
       * The showcase from an angle round it (yaw and pitch in radians) and
       * how far out (1 is just fitting everything), for screenshots.
       */
      viewShowcase: (yaw: number, pitch: number, zoom = 1, group: number | null = null): void => {
        this.showcaseFocus = group === null ? null : (this.showcase?.groups[group] ?? null);
        this.showcaseYaw = yaw;
        this.showcasePitch = pitch;
        this.showcaseZoom = zoom;
        this.frameShowcase(zoom);
        this.engine.focusShadowsOn((this.showcaseFocus ?? this.showcase)?.centre ?? this.player.position);
        this.engine.render(1 / 60);
      },
      /** Draws one frame from a reference view, with or without the figure. */
      renderView: (name: string, showPlayer = false): boolean => {
        const view = name === 'overhead' || name === 'angled' ? this.voxel?.views[name] : undefined;
        if (!view || !this.applyFixedView(name)) return false;
        this.player.object.visible = showPlayer;
        this.engine.focusShadowsOn(view.at);
        this.engine.render(1 / 60);
        this.player.object.visible = true;
        return true;
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
