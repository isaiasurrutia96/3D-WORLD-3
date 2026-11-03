/**
 * Collects many small geometries, grouped by material, and merges each group
 * into a single mesh.
 *
 * A castle built from a few hundred separate boxes would be a few hundred draw
 * calls. Merged by material it is a handful, which matters a great deal on the
 * integrated graphics this is aimed at.
 */

import {
  BufferGeometry,
  Euler,
  Group,
  Material,
  Matrix4,
  Mesh,
  Object3D,
  Quaternion,
  Vector3,
} from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export interface PlacementOptions {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
}

export class MeshBuilder {
  private readonly groups = new Map<string, BufferGeometry[]>();
  private readonly matrix = new Matrix4();
  private readonly quaternion = new Quaternion();
  private readonly euler = new Euler();
  private readonly positionVector = new Vector3();
  private readonly scaleVector = new Vector3();

  add(materialKey: string, geometry: BufferGeometry, options: PlacementOptions = {}): void {
    const clone = geometry.clone();

    const [px, py, pz] = options.position ?? [0, 0, 0];
    const [rx, ry, rz] = options.rotation ?? [0, 0, 0];
    const scale = options.scale ?? 1;
    const [sx, sy, sz] = typeof scale === 'number' ? [scale, scale, scale] : scale;

    this.euler.set(rx, ry, rz, 'XYZ');
    this.quaternion.setFromEuler(this.euler);
    this.positionVector.set(px, py, pz);
    this.scaleVector.set(sx, sy, sz);
    this.matrix.compose(this.positionVector, this.quaternion, this.scaleVector);
    clone.applyMatrix4(this.matrix);

    const existing = this.groups.get(materialKey);
    if (existing) {
      existing.push(clone);
    } else {
      this.groups.set(materialKey, [clone]);
    }
  }

  /**
   * Merges each material group into one mesh and adds it to `parent`.
   * Material keys with no geometry are skipped.
   */
  build(
    parent: Object3D,
    materials: Record<string, Material>,
    options: { castShadow?: boolean; receiveShadow?: boolean } = {},
  ): Group {
    const group = new Group();
    for (const [key, geometries] of this.groups) {
      const material = materials[key];
      if (!material || geometries.length === 0) continue;

      const merged =
        geometries.length === 1 ? geometries[0] : mergeGeometries(geometries, false);
      if (!merged) continue;
      merged.computeVertexNormals();

      const mesh = new Mesh(merged, material);
      mesh.name = key;
      mesh.castShadow = options.castShadow ?? true;
      mesh.receiveShadow = options.receiveShadow ?? true;
      group.add(mesh);
    }
    parent.add(group);
    this.groups.clear();
    return group;
  }
}
