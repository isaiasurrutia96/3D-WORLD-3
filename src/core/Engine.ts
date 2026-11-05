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
  MathUtils,
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

/**
 * Studio mode lights the character from the front rather than from the world
 * sun, which sits behind them and left the face in shadow.
 */
export const STUDIO_SUN_DIRECTION = new Vector3(-0.45, 0.8, -0.75).normalize();

/**
 * Half-width of the studio shadow box, and how far back the studio sun sits.
 *
 * The distance matters as much as the width. At nine metres along a direction
 * that is two thirds upward, the sun sat barely six metres above the
 * character — lower than the top of a seven-metre wall, so tall geometry was
 * level with the light and clipped against the shadow camera, which flickers.
 */
const STUDIO_SHADOW_HALF = 9;
const STUDIO_SUN_DISTANCE = 26;

/**
 * The two looks the scene has out of water, and the one it has under it.
 *
 * They are named here rather than written inline in three places, because
 * the crossing of the waterline mixes between them every frame and the mix
 * has to start from whichever of the two is in force.
 */
const SKY_BACKGROUND = new Color(0xbfe4f7);
const STUDIO_BACKGROUND = new Color(0x12161d);
const SKY_HEMISPHERE = new Color(0xcfe8ff);
const STUDIO_HEMISPHERE = new Color(0xa8bdd8);
const UNDERWATER_BACKGROUND = new Color(0x0f4a63);
const UNDERWATER_FOG = new Color(0x135a76);
const UNDERWATER_HEMISPHERE = new Color(0x2f90b0);
const UNDERWATER_FOG_DENSITY = 0.05;

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

  private rimLight: DirectionalLight | null = null;
  private studio = false;
  private composer: EffectComposer | null = null;
  private bloomPass: UnrealBloomPass | null = null;
  private preset: QualityPreset;
  private quality: QualityLevel;

  private underwater = false;
  /** How far across the waterline the look has travelled, 0 to 1. */
  private underwaterMix = 0;
  private wasUnderwater = false;

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

  /**
   * Strips the scene back to a character turntable: dark background, no sky,
   * no fog, and a cool rim light behind the subject so the silhouette reads
   * against the dark. Used while the character itself is what is being judged.
   */
  setStudioMode(enabled: boolean): void {
    this.studio = enabled;
    this.sky.visible = !enabled;
    this.configureShadowCamera();
    // The map size depends on which mode this is, so it has to be reapplied
    // here as well as when the quality changes.
    this.applyShadowMapSize();

    if (enabled) {
      this.scene.fog = null;
      (this.scene.background as Color).copy(STUDIO_BACKGROUND);
      this.sun.intensity = 1.9;
      this.sun.color.set(0xfff4e2);
      // Enough fill that anything standing in the key light's shadow — on the
      // far side of the box, or on the ladder — is still readable.
      this.hemisphere.intensity = 0.95;
      this.hemisphere.color.copy(STUDIO_HEMISPHERE);
      this.hemisphere.groundColor.set(0x474d58);
      this.ambient.intensity = 0.3;

      if (!this.rimLight) {
        // Behind and slightly above, pointing back toward the camera side.
        const rim = new DirectionalLight(0xbfd8ff, 1.6);
        rim.position.set(0.6, 0.5, 1).multiplyScalar(40);
        rim.castShadow = false;
        this.rimLight = rim;
        this.scene.add(rim);
      }
      this.rimLight.visible = true;
    } else {
      this.scene.fog = this.fog;
      (this.scene.background as Color).copy(SKY_BACKGROUND);
      this.sun.intensity = 2.15;
      this.hemisphere.intensity = 1.0;
      this.hemisphere.color.copy(SKY_HEMISPHERE);
      this.ambient.intensity = 0.22;
      if (this.rimLight) this.rimLight.visible = false;
    }
  }

  applyQuality(quality: QualityLevel): void {
    this.quality = quality;
    const preset = QUALITY_PRESETS[quality];
    this.preset = preset;

    this.renderer.shadowMap.enabled = preset.shadows;
    this.sun.castShadow = preset.shadows;
    this.applyShadowMapSize();
    if (this.sun.shadow.map) {
      this.sun.shadow.map.dispose();
      this.sun.shadow.map = null;
    }

    this.configureShadowCamera();

    if (!this.underwater && !this.studio) this.fog.density = preset.fogDensity;
    this.camera.far = preset.viewDistance;
    this.camera.updateProjectionMatrix();

    this.setUpComposer();
    this.resize();
  }

  /**
   * Sizes the shadow frustum to what is actually in the scene.
   *
   * A frustum wide enough for the castle spreads a 1024-pixel shadow map over
   * ninety metres, which is about a tenth of a metre per pixel. At that
   * resolution the bias needed to stop self-shadowing also pushes the shadow
   * away from whatever casts it, so a character appears to hover above their
   * own shadow. In studio mode there is one figure to light, so the frustum
   * is a few metres across and the bias can be tiny.
   */
  /**
   * The studio scene is a few thousand triangles, so it can afford a sharper
   * shadow map than the castle could — which it needs, now that the box
   * around the character is four times wider than it was.
   */
  private applyShadowMapSize(): void {
    const size = this.studio
      ? Math.min(2048, this.preset.shadowMapSize * 2)
      : this.preset.shadowMapSize;
    if (this.sun.shadow.mapSize.x === size) return;
    this.sun.shadow.mapSize.set(size, size);
    if (this.sun.shadow.map) {
      this.sun.shadow.map.dispose();
      this.sun.shadow.map = null;
    }
  }

  private configureShadowCamera(): void {
    // The studio frustum used to be a 4.4-metre box around the figure, which
    // was right when the figure was the only thing in the scene. It is not
    // any more: walls seven metres tall only partly fit inside it, so the
    // part that fell outside stopped casting and the edge of the box swept
    // across them as the character moved. That is the shadow flicker near a
    // wall. The box now covers the ground around him and the structures on
    // it.
    const half = this.studio ? STUDIO_SHADOW_HALF : this.preset.shadowDistance * 0.5;
    const shadowCamera = this.sun.shadow.camera;
    shadowCamera.left = -half;
    shadowCamera.right = half;
    shadowCamera.top = half;
    shadowCamera.bottom = -half;
    shadowCamera.near = this.studio ? 1 : 1;
    shadowCamera.far = this.studio ? STUDIO_SUN_DISTANCE * 2.4 : this.preset.shadowDistance * 3.2;
    shadowCamera.updateProjectionMatrix();

    // A wider box spreads the same map over more ground, so the bias has to
    // grow with it or the figure shadows itself.
    this.sun.shadow.bias = this.studio ? -0.0009 : -0.0012;
    this.sun.shadow.normalBias = this.studio ? 0.03 : 0.035;
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
    const direction = this.studio ? STUDIO_SUN_DIRECTION : SUN_DIRECTION;
    const distance = this.studio ? STUDIO_SUN_DISTANCE : this.preset.shadowDistance * 1.4;
    this.sun.target.position.copy(target);
    this.sun.target.updateMatrixWorld();
    this.sun.position.copy(target).addScaledVector(direction, distance);
  }

  /**
   * Says whether the *camera* is below a waterline, which is the only thing
   * that decides what the screen should look like.
   *
   * It used to be wired to the character's swimming state, and then never
   * called at all — so putting the eye under the surface showed the scene's
   * own background, which in this mode is very nearly black with the sky
   * switched off. That is where the black ceiling came from: not the water,
   * but the absence of anything behind it.
   */
  setUnderwater(underwater: boolean): void {
    this.underwater = underwater;
  }

  get isUnderwater(): boolean {
    return this.underwater;
  }

  /**
   * Eases the scene across the waterline.
   *
   * Snapping the background, the fog and the lights the instant the camera
   * crosses makes a camera bobbing on the line flash between two worlds, so
   * the whole look is carried on one number that takes about a fifth of a
   * second to travel.
   */
  private applyUnderwater(delta: number): void {
    const target = this.underwater ? 1 : 0;
    if (this.underwaterMix !== target) {
      this.underwaterMix = MathUtils.lerp(
        this.underwaterMix,
        target,
        1 - Math.exp(-9 * delta),
      );
      if (Math.abs(this.underwaterMix - target) < 0.002) this.underwaterMix = target;
    } else if (target === 0 && !this.wasUnderwater) {
      // Dry, and dry last frame too: the open-air look is already in place
      // and nothing here should be touching it.
      return;
    }
    const mix = this.underwaterMix;
    this.wasUnderwater = mix > 0;

    const airColor = this.studio ? STUDIO_BACKGROUND : SKY_BACKGROUND;
    const airSun = this.studio ? 1.9 : 2.15;
    const airHemisphere = this.studio ? 0.95 : 1.0;
    const airHemisphereColor = this.studio ? STUDIO_HEMISPHERE : SKY_HEMISPHERE;
    const airDensity = this.studio ? 0 : this.preset.fogDensity;

    (this.scene.background as Color).copy(airColor).lerp(UNDERWATER_BACKGROUND, mix);
    this.fog.color.copy(airColor).lerp(UNDERWATER_FOG, mix);
    this.fog.density = MathUtils.lerp(airDensity, UNDERWATER_FOG_DENSITY, mix);
    this.sun.intensity = MathUtils.lerp(airSun, 1.15, mix);
    this.hemisphere.intensity = MathUtils.lerp(airHemisphere, 1.35, mix);
    this.hemisphere.color.copy(airHemisphereColor).lerp(UNDERWATER_HEMISPHERE, mix);

    // Studio mode has no fog of its own, so it only gets one under water.
    const wantsFog = !this.studio || mix > 0.001;
    this.scene.fog = wantsFog ? this.fog : null;
  }

  render(delta: number): void {
    this.fpsAccumulator += delta;
    this.fpsFrames += 1;
    if (this.fpsAccumulator >= 0.5) {
      this.fps = this.fpsFrames / this.fpsAccumulator;
      this.fpsAccumulator = 0;
      this.fpsFrames = 0;
    }

    this.applyUnderwater(delta);

    this.sky.visible = this.underwaterMix < 0.5 && !this.studio;
    if (this.sky.visible) {
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
