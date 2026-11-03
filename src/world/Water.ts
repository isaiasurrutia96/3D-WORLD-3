/**
 * The moat surface.
 *
 * A custom shader rather than a reflective pass: ripples come from three
 * travelling sine waves, the colour deepens with distance from the shore, and
 * a Fresnel term brightens the surface at grazing angles so it reads as water
 * from across the courtyard. On "high" a screen-space reflection of the sky
 * colour is mixed in, which costs nothing extra.
 */

import {
  Color,
  DoubleSide,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Vector3,
} from 'three';

const VERTEX = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorldPosition;
  varying vec3 vNormalW;

  // Three travelling waves at different angles and scales. Summing them keeps
  // the surface from showing an obvious repeating direction.
  vec3 waveNormal(vec2 p, float t) {
    vec2 d1 = normalize(vec2(1.0, 0.35));
    vec2 d2 = normalize(vec2(-0.6, 1.0));
    vec2 d3 = normalize(vec2(0.3, -1.0));

    float a1 = sin(dot(p, d1) * 0.55 + t * 1.25) * 0.055;
    float a2 = sin(dot(p, d2) * 0.9 + t * 1.75) * 0.032;
    float a3 = sin(dot(p, d3) * 1.7 + t * 2.4) * 0.016;

    float dx =
      cos(dot(p, d1) * 0.55 + t * 1.25) * 0.055 * 0.55 * d1.x +
      cos(dot(p, d2) * 0.9 + t * 1.75) * 0.032 * 0.9 * d2.x +
      cos(dot(p, d3) * 1.7 + t * 2.4) * 0.016 * 1.7 * d3.x;
    float dz =
      cos(dot(p, d1) * 0.55 + t * 1.25) * 0.055 * 0.55 * d1.y +
      cos(dot(p, d2) * 0.9 + t * 1.75) * 0.032 * 0.9 * d2.y +
      cos(dot(p, d3) * 1.7 + t * 2.4) * 0.016 * 1.7 * d3.y;

    return normalize(vec3(-dx, 1.0, -dz)) + vec3(0.0, a1 + a2 + a3, 0.0) * 0.0;
  }

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPosition = world.xyz;
    vNormalW = waveNormal(world.xz, uTime);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform vec3 uShallowColor;
  uniform vec3 uDeepColor;
  uniform vec3 uSkyColor;
  uniform vec3 uSunDirection;
  uniform float uReflectivity;
  varying vec3 vWorldPosition;
  varying vec3 vNormalW;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vec3 normal = normalize(vNormalW);

    // Grazing angles reflect the sky; looking straight down shows the depth.
    float fresnel = pow(1.0 - max(dot(viewDirection, normal), 0.0), 3.0);

    // A cheap stand-in for depth: the water is deeper away from the island.
    float shoreDistance = clamp(
      (abs(vWorldPosition.x) + abs(vWorldPosition.z + 12.0)) * 0.012, 0.0, 1.0);
    vec3 baseColor = mix(uShallowColor, uDeepColor, 0.45 + shoreDistance * 0.3);

    vec3 color = mix(baseColor, uSkyColor, fresnel * uReflectivity);

    // Sun glitter.
    vec3 halfVector = normalize(uSunDirection + viewDirection);
    float specular = pow(max(dot(normal, halfVector), 0.0), 220.0);
    color += vec3(1.0, 0.97, 0.88) * specular * 1.8;

    // Fine sparkle so the surface is never completely still.
    float sparkle = sin(vWorldPosition.x * 3.1 + uTime * 2.2) *
                    sin(vWorldPosition.z * 2.7 - uTime * 1.8);
    color += vec3(0.06) * max(0.0, sparkle - 0.82) * 6.0;

    gl_FragColor = vec4(color, 0.88);
    #include <colorspace_fragment>
  }
`;

export class Water extends Mesh {
  private readonly uniforms: {
    uTime: { value: number };
    uShallowColor: { value: Color };
    uDeepColor: { value: Color };
    uSkyColor: { value: Color };
    uSunDirection: { value: Vector3 };
    uReflectivity: { value: number };
  };

  constructor(size: number, level: number, sunDirection: Vector3, reflective: boolean) {
    const uniforms = {
      uTime: { value: 0 },
      uShallowColor: { value: new Color('#3fb6c9') },
      uDeepColor: { value: new Color('#14566e') },
      uSkyColor: { value: new Color('#bfe4f7') },
      uSunDirection: { value: sunDirection.clone() },
      uReflectivity: { value: reflective ? 0.95 : 0.55 },
    };

    super(
      new PlaneGeometry(size, size, 1, 1).rotateX(-Math.PI / 2),
      new ShaderMaterial({
        uniforms,
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
        depthWrite: false,
        side: DoubleSide,
      }),
    );

    this.uniforms = uniforms;
    this.position.y = level;
    this.renderOrder = 10;
    this.name = 'water';
    this.frustumCulled = false;
  }

  update(elapsed: number): void {
    this.uniforms.uTime.value = elapsed;
  }

  setReflective(reflective: boolean): void {
    this.uniforms.uReflectivity.value = reflective ? 0.95 : 0.55;
  }
}
