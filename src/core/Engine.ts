/**
 * Renderer, scene, lighting and the frame loop.
 *
 * Quality is applied in one place so a change from the pause menu can be
 * applied live without rebuilding the world.
 */

import {
  ACESFilmicToneMapping,
  AmbientLight,
  Clock,
  Color,
  DirectionalLight,
  FogExp2,
  HemisphereLight,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { Vector2 } from 'three';
import { QUALITY_PRESETS, type QualityLevel, type QualityPreset } from './Settings.ts';
import { Sky } from './Sky.ts';

export const SUN_DIRECTION = new Vector3(0.55, 0.72, 0.42).normalize();

export class Engine {
  readonly renderer: WebGLRenderer;
  readonly scene = new Scene();
  readonly camera: PerspectiveCamera;
  readonly clock = new Clock();
  readonly sky: Sky;

  readonly sun: DirectionalLight;
  private readonly hemisphere: HemisphereLight;
  private readonly ambient: AmbientLight;
  private readonly fog: FogExp2;

  private composer: EffectComposer | null = null;
  private bloomPass: UnrealBloomPass | null = null;
  private preset: QualityPreset;
  private quality: QualityLevel;

  private underwater = false;

  /** Smoothed frames per second, for the on-screen performance readout. */
  fps = 0;
  private fpsAccumulator = 0;
  private fpsFrames = 0;

  constructor(container: HTMLElement, quality: QualityLevel) {
    this.quality = quality;
    this.preset = QUALITY_PRESETS[quality];

    this.renderer = new WebGLRenderer({
      antialias: this.preset.antialias,
      powerPreference: 'high-performance',
      stencil: false,
    });
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.domElement.classList.add('game-canvas');
    container.appendChild(this.renderer.domElement);

    this.camera = new PerspectiveCamera(
      62,
      window.innerWidth / Math.max(1, window.innerHeight),
      0.1,
      this.preset.viewDistance,
    );
    this.camera.position.set(0, 8, 18);

    this.fog = new FogExp2(0xbfe4f7, this.preset.fogDensity);
    this.scene.fog = this.fog;
    this.scene.background = new Color(0xbfe4f7);

    this.sky = new Sky(SUN_DIRECTION, 14);
    this.scene.add(this.sky);

    // Warm key light from the sun, cool bounce from sky and ground. The
    // hemisphere light is what keeps shadowed faces readable without the cost
    // of a second shadow-casting light.
    this.sun = new DirectionalLight(0xfff3d6, 2.15);
    this.sun.position.copy(SUN_DIRECTION).multiplyScalar(120);
    this.sun.castShadow = true;
    this.sun.shadow.bias = -0.0012;
    this.sun.shadow.normalBias = 0.035;
    this.scene.add(this.sun);
    this.scene.add(this.sun.target);

    this.hemisphere = new HemisphereLight(0xcfe8ff, 0x6f8f5a, 1.0);
    this.scene.add(this.hemisphere);

    this.ambient = new AmbientLight(0xffffff, 0.22);
    this.scene.add(this.ambient);

    this.applyQuality(quality);
    this.resize();

    window.addEventListener('resize', this.resize);
  }

  applyQuality(quality: QualityLevel): void {
    this.quality = quality;
    const preset = QUALITY_PRESETS[quality];
    this.preset = preset;

    this.renderer.shadowMap.enabled = preset.shadows;
    this.sun.castShadow = preset.shadows;
    this.sun.shadow.mapSize.set(preset.shadowMapSize, preset.shadowMapSize);
    if (this.sun.shadow.map) {
      this.sun.shadow.map.dispose();
      this.sun.shadow.map = null;
    }

    const half = preset.shadowDistance * 0.5;
    const shadowCamera = this.sun.shadow.camera;
    shadowCamera.left = -half;
    shadowCamera.right = half;
    shadowCamera.top = half;
    shadowCamera.bottom = -half;
    shadowCamera.near = 1;
    shadowCamera.far = preset.shadowDistance * 3.2;
    shadowCamera.updateProjectionMatrix();

    if (!this.underwater) this.fog.density = preset.fogDensity;
    this.camera.far = preset.viewDistance;
    this.camera.updateProjectionMatrix();

    this.setUpComposer();
    this.resize();
  }

  private setUpComposer(): void {
    if (this.composer) {
      this.composer.dispose();
      this.composer = null;
      this.bloomPass = null;
    }
    if (!this.preset.bloom) return;

    const composer = new EffectComposer(this.renderer);
    composer.addPass(new RenderPass(this.scene, this.camera));
    const bloom = new UnrealBloomPass(
      new Vector2(window.innerWidth, window.innerHeight),
      0.42, // strength: a gentle sheen on bright surfaces, not a haze
      0.72, // radius
      0.86, // threshold: only genuinely bright pixels bloom
    );
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
    this.composer = composer;
    this.bloomPass = bloom;
  }

  private resize = (): void => {
    const width = window.innerWidth;
    const height = Math.max(1, window.innerHeight);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, this.preset.pixelRatioCap);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setPixelRatio(pixelRatio * this.preset.renderScale);
    this.renderer.setSize(width, height, true);
    this.composer?.setSize(width, height);
    this.bloomPass?.resolution.set(width, height);
  };

  /** Keeps the shadow frustum centred on the player so it stays sharp. */
  focusShadowsOn(target: Vector3): void {
    this.sun.target.position.copy(target);
    this.sun.target.updateMatrixWorld();
    this.sun.position.copy(target).addScaledVector(SUN_DIRECTION, this.preset.shadowDistance * 1.4);
  }

  /**
   * Switches the scene between the open-air look and a dense blue-green
   * underwater one. Without this, putting the camera below the waterline just
   * fills the screen with the flat colour of the water surface.
   */
  setUnderwater(underwater: boolean): void {
    if (underwater === this.underwater) return;
    this.underwater = underwater;

    if (underwater) {
      this.fog.color.set(0x14566e);
      this.fog.density = 0.055;
      (this.scene.background as Color).set(0x0e4055);
      this.sun.intensity = 1.1;
      this.hemisphere.color.set(0x2f90b0);
      this.hemisphere.intensity = 1.35;
    } else {
      this.fog.color.set(0xbfe4f7);
      this.fog.density = this.preset.fogDensity;
      (this.scene.background as Color).set(0xbfe4f7);
      this.sun.intensity = 2.15;
      this.hemisphere.color.set(0xcfe8ff);
      this.hemisphere.intensity = 1.0;
    }
  }

  get isUnderwater(): boolean {
    return this.underwater;
  }

  render(delta: number): void {
    this.fpsAccumulator += delta;
    this.fpsFrames += 1;
    if (this.fpsAccumulator >= 0.5) {
      this.fps = this.fpsFrames / this.fpsAccumulator;
      this.fpsAccumulator = 0;
      this.fpsFrames = 0;
    }

    this.sky.visible = !this.underwater;
    if (!this.underwater) {
      this.sky.position.copy(this.camera.position);
      this.sky.update(delta, this.camera.position);
    }

    if (this.composer) {
      this.composer.render(delta);
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  get currentQuality(): QualityLevel {
    return this.quality;
  }

  get currentPreset(): QualityPreset {
    return this.preset;
  }

  dispose(): void {
    window.removeEventListener('resize', this.resize);
    this.composer?.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
