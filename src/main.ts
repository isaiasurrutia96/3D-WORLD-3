/**
 * LetsGo — entry point.
 *
 * Boots the renderer, builds the castle grounds, and runs the frame loop.
 * The title screen is the live world with the camera orbiting the castle, so
 * there is no separate menu scene to keep in step with the game.
 */

import './styles.css';
import { Vector3 } from 'three';
import { Engine, SUN_DIRECTION } from './core/Engine.ts';
import { CameraRig } from './core/CameraRig.ts';
import { loadSettings, saveSettings, QUALITY_PRESETS, type UserSettings } from './core/Settings.ts';
import { Input } from './input/Input.ts';
import { CollisionWorld } from './physics/CollisionWorld.ts';
import { Player } from './player/Player.ts';
import { Interface } from './ui/Interface.ts';
import { ParticleEffects } from './world/Effects.ts';
import { buildWorld, type BuiltWorld } from './world/World.ts';

const container = document.getElementById('app');
if (!container) throw new Error('Missing #app container');

/** Caps the step so a stall cannot teleport the character through the world. */
const MAX_DELTA = 1 / 20;

class Game {
  private settings: UserSettings = loadSettings();
  private readonly engine: Engine;
  private readonly ui: Interface;
  private readonly input = new Input();
  private readonly collision = new CollisionWorld();
  private readonly effects: ParticleEffects;

  private world!: BuiltWorld;
  private player!: Player;
  private cameraRig!: CameraRig;

  private elapsed = 0;
  private titleAngle = 0.5;
  private running = false;

  constructor() {
    this.engine = new Engine(container as HTMLElement, this.settings.quality);
    this.effects = new ParticleEffects(this.engine.scene);

    this.ui = new Interface(container as HTMLElement, this.settings, {
      onStart: () => this.startPlaying(),
      onResume: () => this.resume(),
      onReturnToTitle: () => this.returnToTitle(),
      onQualityChange: (quality) => this.applyQuality(quality),
      onSettingsChange: (settings) => {
        this.settings = settings;
        saveSettings(settings);
      },
    });

    this.input.attach(this.engine.renderer.domElement);
    window.addEventListener('keydown', this.onGlobalKey);
  }

  async boot(): Promise<void> {
    this.ui.setLoadingProgress(0.08, 'Shaping the ground');
    await nextFrame();

    const preset = QUALITY_PRESETS[this.settings.quality];
    this.world = buildWorld(this.engine.scene, this.collision, SUN_DIRECTION, {
      foliageDensity: preset.foliageDensity,
      waterReflections: preset.waterReflections,
    });

    this.ui.setLoadingProgress(0.72, 'Working out what is solid');
    await nextFrame();

    this.player = new Player(this.collision, this.world.spawn, {
      onSplash: (position, strength) => this.effects.splash(position, strength),
      onLand: (position, strength) => {
        if (strength > 0.25) this.effects.dust(position, strength);
      },
    });
    this.player.facing = this.world.spawnFacing;
    this.player.carryables = this.world.carryables;
    this.engine.scene.add(this.player.object);

    this.cameraRig = new CameraRig(this.engine.camera, this.collision);

    this.ui.setLoadingProgress(1, 'Ready');
    await nextFrame();
    await this.ui.finishLoading();

    this.ui.setScreen('title');
    this.running = true;
    this.engine.clock.start();
    requestAnimationFrame(this.frame);
  }

  // -------------------------------------------------------------------------
  // Screens
  // -------------------------------------------------------------------------

  private startPlaying(): void {
    this.player.teleport(this.world.spawn, this.world.spawnFacing);
    this.cameraRig.reset(this.player);
    this.ui.setScreen('playing');
    this.input.clear();
    this.input.setPointerLockWanted(true);
    this.input.requestPointerLock();
  }

  private pause(): void {
    if (this.ui.currentScreen !== 'playing') return;
    this.ui.setScreen('paused');
    this.input.setPointerLockWanted(false);
    this.input.clear();
  }

  private resume(): void {
    this.ui.setScreen('playing');
    this.input.clear();
    this.input.setPointerLockWanted(true);
    this.input.requestPointerLock();
  }

  private returnToTitle(): void {
    this.ui.setScreen('title');
    this.input.setPointerLockWanted(false);
    this.input.clear();
    this.titleAngle = 0.5;
  }

  private applyQuality(quality: UserSettings['quality']): void {
    this.settings = { ...this.settings, quality };
    this.engine.applyQuality(quality);
    this.world.water.setReflective(QUALITY_PRESETS[quality].waterReflections);
    saveSettings(this.settings);
  }

  private onGlobalKey = (event: KeyboardEvent): void => {
    if (event.code === 'F3') {
      event.preventDefault();
      this.ui.setStatsVisible(!this.ui.statsVisible);
    }
    if (event.code === 'KeyR' && this.ui.currentScreen === 'playing') {
      this.player.respawn();
    }
  };

  // -------------------------------------------------------------------------
  // Frame
  // -------------------------------------------------------------------------

  private frame = (): void => {
    if (!this.running) return;
    requestAnimationFrame(this.frame);

    const delta = Math.min(MAX_DELTA, this.engine.clock.getDelta());
    this.elapsed += delta;

    const screen = this.ui.currentScreen;
    this.input.update(this.settings.cameraSensitivity, this.settings.invertCameraY);

    if (screen === 'playing') {
      this.updatePlaying(delta);
    } else {
      this.ui.update();
      if (screen === 'title') this.updateTitleCamera(delta);
    }

    if (screen === 'playing' && this.input.wasPressed('pause')) this.pause();

    for (const carryable of this.world.carryables) carryable.update(delta, this.collision);
    this.effects.update(delta);
    this.world.water.update(this.elapsed);
    this.engine.focusShadowsOn(this.player.position);
    this.engine.render(delta);

    if (screen === 'playing' || screen === 'paused') this.updateStats();
  };

  private updatePlaying(delta: number): void {
    this.cameraRig.applyLook(this.input.look.x, this.input.look.y);
    this.player.update(delta, this.input, this.cameraRig.movementYaw);
    this.cameraRig.update(delta, this.player);
    this.updatePrompt();
  }

  /** On the title screen the camera circles the castle on its own. */
  private updateTitleCamera(delta: number): void {
    this.titleAngle += delta * 0.085;
    const radius = 78;
    const centre = new Vector3(0, 9, -12);
    this.engine.camera.position.set(
      centre.x + Math.sin(this.titleAngle) * radius,
      centre.y + 17 + Math.sin(this.titleAngle * 0.7) * 5,
      centre.z + Math.cos(this.titleAngle) * radius,
    );
    this.engine.camera.lookAt(centre.x, centre.y + 4, centre.z);
  }

  private updatePrompt(): void {
    if (this.player.carried) {
      this.ui.setPrompt('E — throw');
      return;
    }
    for (const carryable of this.world.carryables) {
      if (carryable.held || carryable.pickupCooldown > 0) continue;
      if (carryable.position.distanceTo(this.player.position) < 2.1) {
        this.ui.setPrompt('E — pick up');
        return;
      }
    }
    this.ui.setPrompt(null);
  }

  private updateStats(): void {
    const fps = this.engine.fps;
    const fpsClass =
      fps >= 50 ? 'hud__fps--good' : fps >= 28 ? 'hud__fps--ok' : 'hud__fps--poor';
    const info = this.engine.renderer.info.render;
    const position = this.player.position;

    this.ui.setStats([
      ['FPS', fps.toFixed(0), fpsClass],
      ['Quality', this.settings.quality],
      ['Draw calls', String(info.calls)],
      ['Triangles', info.triangles.toLocaleString('en-GB')],
      ['State', this.player.stateName],
      ['Speed', `${this.player.speed.toFixed(1)} m/s`],
      [
        'Position',
        `${position.x.toFixed(0)}, ${position.y.toFixed(0)}, ${position.z.toFixed(0)}`,
      ],
      ['Gamepad', this.input.gamepadConnected ? 'connected' : 'press a button'],
    ]);
  }

  /** Read-only handles for the headless verification pass. */
  get debug() {
    return {
      engine: this.engine,
      player: this.player,
      world: this.world,
      ui: this.ui,
      settings: this.settings,
    };
  }
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

const game = new Game();
void game.boot();

// Surfaced so the headless verification pass can inspect the running game.
(window as unknown as Record<string, unknown>).__letsgo = game;
