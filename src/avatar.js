import * as THREE from 'three';

// Authoring coordinates: meters, +Y up, +Z forward. These landmarks define
// the neutral model independently of any animation, controller, or game data.
const ARM_DROP = 0.05;
export const FOOT_PROFILE = Object.freeze({
  ankleHeight: 0.15, centerHeight: 0.099, forwardOffset: 0.12,
  radiusX: 0.1705, radiusY: 0.099, radiusZ: 0.297,
});
const LANDMARKS = [
  ['pelvis', null, [0, 0.91, 0]],
  ['spine', 'pelvis', [0, 1.13, 0]],
  ['chest', 'spine', [0, 1.43, 0]],
  ['neck', 'chest', [0, 1.65, 0]],
  ['head', 'neck', [0, 1.85, 0]],
];
for (const [side, sign] of [['left', -1], ['right', 1]]) {
  LANDMARKS.push(
    [`${side}_upper_arm`, 'chest', [sign * 0.38, 1.48 - ARM_DROP, 0]],
    [`${side}_forearm`, `${side}_upper_arm`, [sign * 0.47, 1.12 - ARM_DROP, 0.025]],
    [`${side}_hand`, `${side}_forearm`, [sign * 0.5, 0.83 - ARM_DROP, 0.06]],
    [`${side}_thigh`, 'pelvis', [sign * 0.165, 0.86, 0]],
    [`${side}_calf`, `${side}_thigh`, [sign * 0.165, 0.51, 0.015]],
    [`${side}_foot`, `${side}_calf`, [sign * 0.165, FOOT_PROFILE.ankleHeight, 0]],
    [`${side}_toe`, `${side}_foot`, [sign * 0.18, 0.099, 0.30]],
  );
}

export function createAvatar() {
  const bones = new Map();
  const indices = new Map(LANDMARKS.map(([name], index) => [name, index]));
  const points = new Map(LANDMARKS.map(([name, , point]) => [name, new THREE.Vector3(...point)]));
  for (const [name, parent] of LANDMARKS) {
    const bone = new THREE.Bone();
    bone.name = name;
    bone.position.copy(points.get(name));
    if (parent) {
      bone.position.sub(points.get(parent));
      bones.get(parent).add(bone);
    }
    bones.set(name, bone);
  }

  const positions = [], triangles = [], skinIndices = [], skinWeights = [];
  function vertex(point, weights) {
    const index = positions.length / 3;
    positions.push(...point);
    const total = weights.reduce((sum, [, weight]) => sum + weight, 0);
    for (let slot = 0; slot < 4; slot++) {
      skinIndices.push(weights[slot] ? indices.get(weights[slot][0]) : 0);
      skinWeights.push(weights[slot] ? weights[slot][1] / total : 0);
    }
    return index;
  }
  function blend(a, b, amount) {
    const t = THREE.MathUtils.clamp(amount, 0, 1);
    return [[a, 1 - t], [b, t]];
  }
  // Closed ring surfaces form continuous limbs. Shared ring vertices and
  // normalized weights let a later animation deform elbows/knees instead of
  // rotating disconnected primitive objects. No pose is evaluated here.
  function loft(rings, weightsAtHeight, segments = 16) {
    const start = positions.length / 3;
    const ascending = rings.at(-1)[1] > rings[0][1];
    for (const [x, y, z, radiusX, radiusZ] of rings) {
      for (let segment = 0; segment < segments; segment++) {
        const angle = segment / segments * Math.PI * 2;
        vertex([x + Math.cos(angle) * radiusX, y, z + Math.sin(angle) * radiusZ], weightsAtHeight(y));
      }
    }
    for (let ring = 0; ring < rings.length - 1; ring++) {
      for (let segment = 0; segment < segments; segment++) {
        const a = start + ring * segments + segment;
        const b = start + ring * segments + (segment + 1) % segments;
        if (ascending) triangles.push(a, a + segments, b, b, a + segments, b + segments);
        else triangles.push(a, b, a + segments, b, b + segments, a + segments);
      }
    }
    for (const [ring, reverse] of [[0, false], [rings.length - 1, true]]) {
      const center = vertex(rings[ring].slice(0, 3), weightsAtHeight(rings[ring][1]));
      for (let segment = 0; segment < segments; segment++) {
        const a = start + ring * segments + segment;
        const b = start + ring * segments + (segment + 1) % segments;
        const reverseWinding = ascending ? reverse : !reverse;
        triangles.push(center, reverseWinding ? b : a, reverseWinding ? a : b);
      }
    }
  }
  function ellipsoid(center, scale, bone) {
    const sphere = new THREE.SphereGeometry(1, 20, 14);
    const source = sphere.attributes.position;
    const start = positions.length / 3;
    for (let index = 0; index < source.count; index++) {
      vertex([
        center[0] + source.getX(index) * scale[0],
        center[1] + source.getY(index) * scale[1],
        center[2] + source.getZ(index) * scale[2],
      ], [[bone, 1]]);
    }
    for (const index of sphere.index.array) triangles.push(start + index);
    sphere.dispose();
  }

  loft([
    [0, 0.82, 0, 0.23, 0.18], [0, 0.9, 0, 0.29, 0.21],
    [0, 1.12, 0, 0.33, 0.22], [0, 1.4, 0, 0.36, 0.22],
    [0, 1.5, 0, 0.33, 0.2], [0, 1.58, 0, 0.17, 0.13],
  ], y => y < 1.16 ? blend('pelvis', 'spine', (y - 0.95) / 0.21) : blend('spine', 'chest', (y - 1.16) / 0.27));
  loft([[0, 1.56, 0, 0.12, 0.11], [0, 1.76, 0, 0.11, 0.1]], () => [['neck', 1]]);
  ellipsoid([0, 2.0, 0], [0.33, 0.36, 0.3], 'head');
  for (const [side, sign] of [['left', -1], ['right', 1]]) {
    loft([
      [sign * 0.38, 1.60 - ARM_DROP, 0, 0.008, 0.008],
      [sign * 0.38, 1.59 - ARM_DROP, 0, 0.05, 0.05],
      [sign * 0.38, 1.565 - ARM_DROP, 0, 0.085, 0.085],
      [sign * 0.385, 1.53 - ARM_DROP, 0, 0.115, 0.115],
      [sign * 0.39, 1.48 - ARM_DROP, 0, 0.127, 0.127],
      [sign * 0.40, 1.40 - ARM_DROP, 0.005, 0.13, 0.13],
      [sign * 0.42, 1.32 - ARM_DROP, 0.01, 0.125, 0.125],
      [sign * 0.47, 1.12 - ARM_DROP, 0.025, 0.105, 0.105],
      [sign * 0.49, 0.98 - ARM_DROP, 0.045, 0.11, 0.105],
      [sign * 0.5, 0.83 - ARM_DROP, 0.06, 0.085, 0.085],
    ], y => {
      const authoredY = y + ARM_DROP;
      return authoredY > 0.98
        ? blend(`${side}_upper_arm`, `${side}_forearm`, (1.28 - authoredY) / 0.3)
        : blend(`${side}_forearm`, `${side}_hand`, (0.92 - authoredY) / 0.13);
    });
    ellipsoid([sign * 0.51, 0.735 - ARM_DROP, 0.075], [0.132, 0.1595, 0.132], `${side}_hand`);
    loft([
      [sign * 0.165, 0.98, 0, 0.015, 0.015],
      [sign * 0.165, 0.96, 0, 0.085, 0.085],
      [sign * 0.165, 0.93, 0, 0.125, 0.125],
      [sign * 0.165, 0.88, 0, 0.155, 0.155],
      [sign * 0.165, 0.72, 0.005, 0.16, 0.15],
      [sign * 0.165, 0.51, 0.015, 0.115, 0.12],
      [sign * 0.165, 0.34, 0.01, 0.13, 0.12],
      [sign * 0.165, 0.15, 0, 0.09, 0.095],
    ], y => y > 0.31 ? blend(`${side}_thigh`, `${side}_calf`, (0.65 - y) / 0.28) : blend(`${side}_calf`, `${side}_foot`, (0.27 - y) / 0.12));
    ellipsoid([sign * 0.18, FOOT_PROFILE.centerHeight, FOOT_PROFILE.forwardOffset], [FOOT_PROFILE.radiusX, FOOT_PROFILE.radiusY, FOOT_PROFILE.radiusZ], `${side}_foot`);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
  geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));
  geometry.setIndex(triangles);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  const mesh = new THREE.SkinnedMesh(geometry, new THREE.MeshLambertMaterial({ color: '#919aa4' }));
  mesh.name = 'Static avatar';
  mesh.add(bones.get('pelvis'));
  const skeleton = new THREE.Skeleton([...bones.values()]);
  mesh.bind(skeleton);
  mesh.castShadow = true;
  return mesh;
}
