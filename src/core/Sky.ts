/**
 * A stylised gradient sky dome with drifting cartoon clouds.
 *
 * A shader dome costs one draw call and no texture memory, which suits the
 * target hardware far better than a cubemap, and the flat banded gradient is
 * closer to the look being matched than a physically based sky would be.
 */

import {
  BackSide,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  ShaderMaterial,
  SphereGeometry,
} from 'three';

const SKY_VERTEX = /* glsl */ `
  varying vec3 vWorldDirection;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldDirection = normalize(worldPosition.xyz - cameraPosition);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position.z = gl_Position.w; // keep the dome pinned to the far plane
  }
`;

const SKY_FRAGMENT = /* glsl */ `
  uniform vec3 topColor;
  uniform vec3 horizonColor;
  uniform vec3 bottomColor;
  uniform vec3 sunDirection;
  uniform vec3 sunColor;
  varying vec3 vWorldDirection;

  void main() {
    vec3 dir = normalize(vWorldDirection);
    float h = dir.y;

    // Two soft bands: ground haze below the horizon, sky above it.
    vec3 color = mix(horizonColor, topColor, smoothstep(0.0, 0.55, h));
    color = mix(bottomColor, color, smoothstep(-0.25, 0.02, h));

    // A broad warm glow around the sun, plus a small bright disc.
    float sun = max(dot(dir, normalize(sunDirection)), 0.0);
    color += sunColor * pow(sun, 14.0) * 0.32;
    color += sunColor * pow(sun, 900.0) * 1.6;

    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;

export class Sky extends Group {
  private readonly clouds: Mesh[] = [];
  private readonly material: ShaderMaterial;

  constructor(sunDirection: { x: number; y: number; z: number }, cloudCount: number) {
    super();

    const material = (this.material = new ShaderMaterial({
      uniforms: {
        topColor: { value: new Color('#2f7fe0') },
        horizonColor: { value: new Color('#bfe4f7') },
        bottomColor: { value: new Color('#a9d8f4') },
        sunDirection: { value: sunDirection },
        sunColor: { value: new Color('#fff6d8') },
      },
      vertexShader: SKY_VERTEX,
      fragmentShader: SKY_FRAGMENT,
      side: BackSide,
      depthWrite: false,
    }));

    const dome = new Mesh(new SphereGeometry(1, 24, 16), material);
    // Named so that the check for things you can walk through can say what
    // this one is, rather than reporting an unexplained sphere.
    dome.name = 'sky';
    dome.frustumCulled = false;
    dome.renderOrder = -1000;
    this.add(dome);

    const cloudMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      fog: false,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });

    for (let i = 0; i < cloudCount; i += 1) {
      const cloud = new Mesh(createCloudGeometry(i), cloudMaterial);
      const angle = (i / cloudCount) * Math.PI * 2 + i * 0.37;
      const radius = 260 + ((i * 53) % 150);
      cloud.position.set(
        Math.cos(angle) * radius,
        110 + ((i * 29) % 70),
        Math.sin(angle) * radius,
      );
      const scale = 14 + ((i * 17) % 20);
      cloud.scale.setScalar(scale);
      cloud.renderOrder = -900;
      cloud.userData.drift = 0.6 + ((i * 13) % 10) * 0.08;
      this.clouds.push(cloud);
      this.add(cloud);
    }
  }

  /**
   * Changes where the sun is and what colours the sky runs through, for a
   * world that is lit and coloured its own way.
   */
  setLook(look: { sun?: { x: number; y: number; z: number }; top?: string; horizon?: string; bottom?: string }): void {
    const u = this.material.uniforms;
    if (look.sun) u.sunDirection.value = look.sun;
    if (look.top) (u.topColor.value as Color).set(look.top);
    if (look.horizon) (u.horizonColor.value as Color).set(look.horizon);
    if (look.bottom) (u.bottomColor.value as Color).set(look.bottom);
  }

  /** Shows or hides the drawn clouds, for a world that brings its own. */
  setCloudsVisible(visible: boolean): void {
    for (const cloud of this.clouds) cloud.visible = visible;
  }

  update(delta: number, cameraPosition: { x: number; z: number }): void {
    for (const cloud of this.clouds) {
      const drift = cloud.userData.drift as number;
      cloud.position.x += drift * delta;
      // Wrap the clouds around the player so the sky never empties out.
      const dx = cloud.position.x - cameraPosition.x;
      if (dx > 420) cloud.position.x -= 840;
      cloud.lookAt(cameraPosition.x, cloud.position.y, cameraPosition.z);
    }
  }
}

/**
 * Clouds are flat clusters of overlapping discs: cheap, and they read as
 * hand-drawn rather than photographic, which is the look being matched.
 */
function createCloudGeometry(seed: number): BufferGeometry {
  const positions: number[] = [];
  const blobCount = 4 + (seed % 3);
  let random = seed * 9301 + 49297;
  const next = () => {
    random = (random * 9301 + 49297) % 233280;
    return random / 233280;
  };

  for (let b = 0; b < blobCount; b += 1) {
    const cx = (b - (blobCount - 1) / 2) * 0.62 + (next() - 0.5) * 0.25;
    const cy = (next() - 0.5) * 0.22;
    const radius = 0.42 + next() * 0.3;
    const segments = 10;
    for (let s = 0; s < segments; s += 1) {
      const a0 = (s / segments) * Math.PI * 2;
      const a1 = ((s + 1) / segments) * Math.PI * 2;
      positions.push(cx, cy, 0);
      positions.push(cx + Math.cos(a0) * radius, cy + Math.sin(a0) * radius * 0.72, 0);
      positions.push(cx + Math.cos(a1) * radius, cy + Math.sin(a1) * radius * 0.72, 0);
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  return geometry;
}
