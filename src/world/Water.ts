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
  // The plane's own coordinates, which is how far across this body of water
  // a point is. Depth has to come from the water, not from where the water
  // happens to sit in the world.
  varying vec2 vLocal;

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
    vLocal = position.xz;
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
  uniform vec3 uUnderColor;
  uniform vec3 uSunDirection;
  uniform float uReflectivity;
  uniform float uHalfSize;
  varying vec3 vWorldPosition;
  varying vec3 vNormalW;
  varying vec2 vLocal;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vec3 normal = normalize(vNormalW);

    // How square-on the surface is being looked at, whichever side of it the
    // eye is. Taken as an absolute so the underside has a shape of its own
    // rather than collapsing to the single value a clamp gives it.
    float facing = abs(dot(viewDirection, normal));

    // ---- How deep the water is here ----------------------------------------
    // Shallow at the rim, deepest in the middle, measured across the water's
    // own plane. This used to be the distance from the world origin, which
    // was written for a moat ringing an island that sits there — any other
    // body of water is tens of metres away from it, so the term pinned at
    // its maximum and the whole pool came out the darkest colour on the
    // ramp, every pixel of it.
    float toEdge = max(abs(vLocal.x), abs(vLocal.y)) / max(uHalfSize, 0.001);
    float deep = smoothstep(0.0, 0.72, 1.0 - clamp(toEdge, 0.0, 1.0));

    // ---- Seen from above ---------------------------------------------------
    vec3 baseColor = mix(uShallowColor, uDeepColor, deep);

    // Grazing angles reflect the sky; looking straight down shows the depth.
    float fresnel = pow(1.0 - facing, 3.0);
    vec3 above = mix(baseColor, uSkyColor, fresnel * uReflectivity);

    // Sun glitter. The wave normal varies slowly, so an unbroken highlight
    // showed up as one large white smear; fine ripples break it into glints.
    vec3 halfVector = normalize(uSunDirection + viewDirection);
    float specular = pow(max(dot(normal, halfVector), 0.0), 420.0);
    float ripple = 0.5 + 0.5 *
      sin(vWorldPosition.x * 8.3 + uTime * 2.6) *
      sin(vWorldPosition.z * 7.1 - uTime * 2.1);
    above += vec3(1.0, 0.97, 0.88) * specular * (0.25 + ripple * 0.7);

    // Fine sparkle so the surface is never completely still. Three
    // non-harmonic frequencies, so it does not settle into a visible grid.
    float sparkle =
      sin(vWorldPosition.x * 11.3 + uTime * 2.2) *
      sin(vWorldPosition.z * 9.7 - uTime * 1.8) *
      sin((vWorldPosition.x + vWorldPosition.z) * 5.1 + uTime * 1.1);
    above += vec3(0.55, 0.6, 0.62) * max(0.0, abs(sparkle) - 0.86) * 2.4;

    // ---- Seen from underneath ----------------------------------------------
    // Looking up through water is not looking down at it. Straight up there
    // is a bright window where the light comes through; toward the
    // horizontal the surface turns into a mirror of the dark water below,
    // which is what makes it read as a ceiling of water rather than as a
    // hole in the world. Without this branch it was neither, and the scene
    // behind it in this mode is very nearly black.
    float window = pow(facing, 0.75);
    vec3 under = mix(uUnderColor, uSkyColor * 0.92, window);
    float caustic = 0.5 + 0.5 *
      sin(vWorldPosition.x * 2.1 + uTime * 1.3) *
      sin(vWorldPosition.z * 1.7 - uTime * 1.1);
    under += uSkyColor * caustic * 0.07 * window;

    // Crossing the waterline is a band rather than a line. Switched on the
    // sign alone, a camera sitting on the surface flips the whole plane
    // between two different-looking materials from one frame to the next.
    //
    // Written as a plain ramp, not as smoothstep. GLSL leaves smoothstep
    // undefined when its first edge is above its second, which is how this
    // was written to get a descending blend — and undefined is exactly what
    // it gave: near the waterline the input fell between the two edges and
    // the result looked right, but a camera well above the surface produced
    // a value off the end that came back as nothing at all. The plane was
    // drawn and painted no pixels, which is why the pool read as the bare
    // basin underneath it from anywhere but a grazing angle.
    float side = clamp((vWorldPosition.y - cameraPosition.y) / 0.16 + 0.5, 0.0, 1.0);

    // Deep water hides what is under it; shallow water does not. A single
    // flat 0.74 meant the middle of the pool was three quarters of a dark
    // basin, in a scene with no sky to light either of them — which is most
    // of why it read as black rather than as blue.
    float aboveAlpha = mix(0.62, 0.86, deep);

    gl_FragColor = vec4(
      mix(above, under, side),
      mix(aboveAlpha, mix(0.9, 0.55, window), side)
    );
    #include <colorspace_fragment>
  }
`;

export class Water extends Mesh {
  private readonly uniforms: {
    uTime: { value: number };
    uShallowColor: { value: Color };
    uDeepColor: { value: Color };
    uSkyColor: { value: Color };
    uUnderColor: { value: Color };
    uHalfSize: { value: number };
    uSunDirection: { value: Vector3 };
    uReflectivity: { value: number };
  };

  constructor(size: number, level: number, sunDirection: Vector3, reflective: boolean) {
    const uniforms = {
      uTime: { value: 0 },
      // Lifted from where they were. The old pair was chosen against a lit
      // terrain under a sky; here the water lies over an unlit basin with a
      // near-black backdrop behind it, and anything this dark simply
      // disappeared into both.
      uShallowColor: { value: new Color('#5ccbd8') },
      uDeepColor: { value: new Color('#1d7f9c') },
      uSkyColor: { value: new Color('#bfe4f7') },
      // The colour the underside falls to at grazing angles: the water below
      // it, mirrored back down. Dark, but never black.
      uUnderColor: { value: new Color('#1a6079') },
      uSunDirection: { value: sunDirection.clone() },
      uReflectivity: { value: reflective ? 0.95 : 0.55 },
      uHalfSize: { value: size / 2 },
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
