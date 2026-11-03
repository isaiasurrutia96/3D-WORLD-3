/**
 * Small particle bursts: a splash when the character hits the water, and a
 * puff of dust when they land hard.
 *
 * One pooled Points object covers both, so the whole system is a single draw
 * call and allocates nothing while the game is running.
 */

import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  NormalBlending,
  Points,
  PointsMaterial,
  Scene,
  Vector3,
} from 'three';

const MAX_PARTICLES = 220;
const GRAVITY = 18;

/** A soft round dot, generated rather than loaded, so there is no asset file. */
function createDotTexture(): CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (context) {
    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.45, 'rgba(255,255,255,0.75)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  }
  return new CanvasTexture(canvas);
}

export class ParticleEffects {
  private readonly points: Points;
  private readonly positions: Float32Array;
  private readonly colors: Float32Array;
  /** Colour at full brightness; the live colour is this scaled by remaining life. */
  private readonly baseColors: Float32Array;
  private readonly velocities: Float32Array;
  private readonly lifetimes: Float32Array;
  private readonly maxLifetimes: Float32Array;
  private next = 0;

  constructor(scene: Scene) {
    this.positions = new Float32Array(MAX_PARTICLES * 3);
    this.colors = new Float32Array(MAX_PARTICLES * 3);
    this.baseColors = new Float32Array(MAX_PARTICLES * 3);
    this.velocities = new Float32Array(MAX_PARTICLES * 3);
    this.lifetimes = new Float32Array(MAX_PARTICLES);
    this.maxLifetimes = new Float32Array(MAX_PARTICLES);

    // Park every particle far below the world until it is used.
    for (let i = 0; i < MAX_PARTICLES; i += 1) this.positions[i * 3 + 1] = -9999;

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(this.positions, 3));
    geometry.setAttribute('color', new BufferAttribute(this.colors, 3));

    const material = new PointsMaterial({
      size: 0.42,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
      blending: NormalBlending,
      map: createDotTexture(),
    });

    this.points = new Points(geometry, material);
    this.points.name = 'particles';
    this.points.frustumCulled = false;
    this.points.renderOrder = 20;
    scene.add(this.points);
  }

  /** A ring of droplets thrown up from the waterline. */
  splash(position: Vector3, strength: number): void {
    const count = Math.round(14 + strength * 26);
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
      const speed = 1.6 + Math.random() * 3.4 * (0.5 + strength);
      this.emit(
        position.x + Math.cos(angle) * 0.3,
        position.y + 0.1,
        position.z + Math.sin(angle) * 0.3,
        Math.cos(angle) * speed * 0.55,
        3.2 + Math.random() * 3.6 * (0.5 + strength),
        Math.sin(angle) * speed * 0.55,
        0.55,
        0.86,
        0.98,
        0.5 + Math.random() * 0.4,
      );
    }
  }

  /** A low puff of dust kicked out sideways on a hard landing. */
  dust(position: Vector3, strength: number): void {
    const count = Math.round(8 + strength * 14);
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.6;
      const speed = 1.1 + Math.random() * 2.3 * (0.4 + strength);
      this.emit(
        position.x + Math.cos(angle) * 0.25,
        position.y + 0.12,
        position.z + Math.sin(angle) * 0.25,
        Math.cos(angle) * speed,
        0.7 + Math.random() * 1.1,
        Math.sin(angle) * speed,
        0.82,
        0.76,
        0.6,
        0.35 + Math.random() * 0.3,
      );
    }
  }

  private emit(
    x: number,
    y: number,
    z: number,
    vx: number,
    vy: number,
    vz: number,
    r: number,
    g: number,
    b: number,
    life: number,
  ): void {
    const index = this.next;
    this.next = (this.next + 1) % MAX_PARTICLES;

    this.positions[index * 3] = x;
    this.positions[index * 3 + 1] = y;
    this.positions[index * 3 + 2] = z;
    this.velocities[index * 3] = vx;
    this.velocities[index * 3 + 1] = vy;
    this.velocities[index * 3 + 2] = vz;
    this.baseColors[index * 3] = r;
    this.baseColors[index * 3 + 1] = g;
    this.baseColors[index * 3 + 2] = b;
    this.colors[index * 3] = r;
    this.colors[index * 3 + 1] = g;
    this.colors[index * 3 + 2] = b;
    this.lifetimes[index] = life;
    this.maxLifetimes[index] = life;
  }

  update(delta: number): void {
    let active = false;

    for (let i = 0; i < MAX_PARTICLES; i += 1) {
      if (this.lifetimes[i] <= 0) continue;
      active = true;

      this.lifetimes[i] -= delta;
      if (this.lifetimes[i] <= 0) {
        this.positions[i * 3 + 1] = -9999;
        continue;
      }

      this.velocities[i * 3 + 1] -= GRAVITY * delta;
      this.positions[i * 3] += this.velocities[i * 3] * delta;
      this.positions[i * 3 + 1] += this.velocities[i * 3 + 1] * delta;
      this.positions[i * 3 + 2] += this.velocities[i * 3 + 2] * delta;

      // Particles fade by dimming toward black rather than by alpha, which
      // keeps the whole system on one material with no per-particle alpha.
      const fade = this.lifetimes[i] / this.maxLifetimes[i];
      const eased = fade * fade;
      this.colors[i * 3] = this.baseColors[i * 3] * eased;
      this.colors[i * 3 + 1] = this.baseColors[i * 3 + 1] * eased;
      this.colors[i * 3 + 2] = this.baseColors[i * 3 + 2] * eased;
    }

    if (active) {
      (this.points.geometry.attributes.position as BufferAttribute).needsUpdate = true;
      (this.points.geometry.attributes.color as BufferAttribute).needsUpdate = true;
    }
  }

  dispose(): void {
    this.points.geometry.dispose();
    (this.points.material as PointsMaterial).map?.dispose();
    (this.points.material as PointsMaterial).dispose();
    this.points.removeFromParent();
  }
}
