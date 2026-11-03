/**
 * LetsGo — Milestone 1: the character's body.
 *
 * A small floor slab and the figure standing on it, in one neutral clay
 * material. No clothing, no face, no colour and no movement — only the form,
 * so proportion and silhouette can be judged without anything else helping.
 *
 * The joints are all present and correctly parented, so the same rig animates
 * later without being rebuilt: neck, shoulders, elbows, hips, knees, ankles.
 *
 * Drag to orbit him. Scroll to move closer or further away.
 */

import './styles.css';
import { Group, MathUtils } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Engine } from './core/Engine.ts';
import { loadSettings } from './core/Settings.ts';
import { CollisionWorld } from './physics/CollisionWorld.ts';
import { createCharacterRig, CHARACTER_HEIGHT, type CharacterRig } from './player/PlayerModel.ts';
import { buildSlab, type SlabWorld } from './world/Slab.ts';

const container = document.getElementById('app');
if (!container) throw new Error('Missing #app container');

/**
 * The resting pose. Not an animation — a single set of joint angles, so he
 * stands like a person rather than like a diagram with its arms welded to its
 * sides. Every value here is one the animation system will later drive.
 */
const STANDING_POSE = {
  shoulderPitch: 0.04,
  shoulderRoll: 0.17,
  elbow: -0.16,
  hip: -0.02,
  knee: 0.03,
  ankle: 0.02,
};

class Viewer {
  private readonly engine: Engine;
  private readonly controls: OrbitControls;
  private readonly rig: CharacterRig;
  private readonly world: SlabWorld;
  private readonly subject = new Group();

  constructor() {
    const settings = loadSettings();
    this.engine = new Engine(container as HTMLElement, settings.quality);
    this.engine.setStudioMode(true);

    // The collision world is not used here, but building the slab through it
    // keeps this scene on the same path the playable ones use.
    this.world = buildSlab(this.engine.scene, new CollisionWorld());

    this.rig = createCharacterRig({ plain: true });
    this.subject.add(this.rig.root);
    this.subject.position.copy(this.world.spawn);
    this.engine.scene.add(this.subject);

    this.applyStandingPose();

    this.engine.camera.position.set(2.2, 1.35, 2.9);
    this.controls = new OrbitControls(this.engine.camera, this.engine.renderer.domElement);
    this.controls.target.set(0, CHARACTER_HEIGHT * 0.52, 0);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 1.4;
    this.controls.maxDistance = 9;
    // Stop the camera going under the floor or directly overhead.
    this.controls.minPolarAngle = 0.2;
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.update();

    this.addHint();
    this.engine.clock.start();
    requestAnimationFrame(this.frame);
  }

  /** Sets each joint once. Nothing moves after this. */
  private applyStandingPose(): void {
    const p = STANDING_POSE;
    this.rig.shoulderLeft.rotation.set(p.shoulderPitch, 0, -p.shoulderRoll);
    this.rig.shoulderRight.rotation.set(p.shoulderPitch, 0, p.shoulderRoll);
    this.rig.elbowLeft.rotation.x = p.elbow;
    this.rig.elbowRight.rotation.x = p.elbow;
    this.rig.hipLeft.rotation.x = p.hip;
    this.rig.hipRight.rotation.x = p.hip;
    this.rig.kneeLeft.rotation.x = p.knee;
    this.rig.kneeRight.rotation.x = p.knee;
    this.rig.ankleLeft.rotation.x = p.ankle;
    this.rig.ankleRight.rotation.x = p.ankle;
  }

  private addHint(): void {
    const hint = document.createElement('div');
    hint.className = 'viewer-hint';
    hint.innerHTML = `
      <b>Drag</b> to orbit · <b>Scroll</b> to zoom<br />
      Height ${CHARACTER_HEIGHT.toFixed(2)}m ·
      ${(CHARACTER_HEIGHT / 0.43).toFixed(1)} heads tall
    `;
    (container as HTMLElement).appendChild(hint);
  }

  private frame = (): void => {
    requestAnimationFrame(this.frame);
    const delta = Math.min(1 / 20, this.engine.clock.getDelta());
    this.controls.update();
    this.engine.focusShadowsOn(this.subject.position);
    this.engine.render(delta);
  };

  /** Read-only handles for the headless verification pass. */
  get debug() {
    return {
      engine: this.engine,
      rig: this.rig,
      controls: this.controls,

      /** Renders one frame from a fixed angle around the character. */
      viewFrom: (degrees: number, elevation: number, distance: number): void => {
        const radians = MathUtils.degToRad(degrees);
        const camera = this.engine.camera;
        camera.position.set(
          Math.sin(radians) * distance,
          elevation,
          Math.cos(radians) * distance,
        );
        camera.lookAt(0, CHARACTER_HEIGHT * 0.52, 0);
        camera.updateMatrixWorld();
        this.engine.render(1 / 60);
      },
    };
  }
}

const viewer = new Viewer();

// Surfaced so the headless verification pass can inspect the running scene.
(window as unknown as Record<string, unknown>).__letsgo = viewer;
