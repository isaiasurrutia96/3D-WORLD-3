/**
 * The ground: one heightfield covering the castle island, the moat that rings
 * it, the grass bank outside and the hills beyond.
 *
 * The height function is exported because props need it too — a tree has to
 * know where the ground is before it can stand on it.
 */

import {
  BufferAttribute,
  Color,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
} from 'three';

/** The castle island is a rectangle centred here. */
export const ISLAND_CENTRE_Z = -12;
export const ISLAND_HALF_X = 30;
export const ISLAND_HALF_Z = 24;

export const MOAT_INNER = 1.2;
export const MOAT_OUTER = 15;
export const MOAT_FLOOR_Y = -4.2;
export const WATER_LEVEL = -0.9;

export const TERRAIN_SIZE = 280;
const TERRAIN_SEGMENTS = 128;

/** Signed distance from the island rectangle: negative inside, positive out. */
export function islandDistance(x: number, z: number): number {
  const dx = Math.abs(x) - ISLAND_HALF_X;
  const dz = Math.abs(z - ISLAND_CENTRE_Z) - ISLAND_HALF_Z;
  const outside = Math.hypot(Math.max(dx, 0), Math.max(dz, 0));
  const inside = Math.min(Math.max(dx, dz), 0);
  return outside + inside;
}

function smoothstep(edge0: number, edge1: number, value: number): number {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** Rolling hills, from a few sine waves at different scales. */
function hillHeight(x: number, z: number): number {
  return (
    Math.sin(x * 0.031) * 2.1 +
    Math.cos(z * 0.027) * 1.9 +
    Math.sin((x + z) * 0.016) * 2.8 +
    Math.sin(x * 0.085 + z * 0.06) * 0.55
  );
}

/** How much of the moat basin applies at this point, 0 to 1. */
function moatMask(distance: number): number {
  if (distance <= MOAT_INNER) return 0;
  if (distance >= MOAT_OUTER) return 0;
  const inner = smoothstep(MOAT_INNER, MOAT_INNER + 2.6, distance);
  const outer = 1 - smoothstep(MOAT_OUTER - 3.2, MOAT_OUTER, distance);
  return Math.min(inner, outer);
}

export function terrainHeight(x: number, z: number): number {
  const distance = islandDistance(x, z);

  // Inside the island the ground is flat so the castle has somewhere level to
  // stand; outside it the hills fade in once clear of the moat.
  let base = 0;
  if (distance > 0) {
    const blend = smoothstep(MOAT_OUTER, MOAT_OUTER + 34, distance);
    // The land lifts as it leaves the moat, and never dips back below the
    // waterline, so stray hollows do not fill with water far from the castle.
    base = Math.max(0.05, (hillHeight(x, z) * 0.55 + 3.2) * blend);

    // A far rim keeps the playable area framed without an invisible wall.
    const radial = Math.hypot(x, z - ISLAND_CENTRE_Z);
    base += Math.max(0, radial - 104) * 0.5;
  }

  return base + MOAT_FLOOR_Y * moatMask(distance);
}

/** True where the ground is below the waterline. */
export function isUnderwater(x: number, z: number): boolean {
  return terrainHeight(x, z) < WATER_LEVEL;
}

const GRASS = new Color('#5f9a3f');
const GRASS_DARK = new Color('#44773a');
const SAND = new Color('#c8b280');
const MUD = new Color('#6d5a42');
const COURTYARD = new Color('#8fae63');

export function createTerrain(): Mesh {
  const geometry = new PlaneGeometry(
    TERRAIN_SIZE,
    TERRAIN_SIZE,
    TERRAIN_SEGMENTS,
    TERRAIN_SEGMENTS,
  );
  geometry.rotateX(-Math.PI / 2);

  const position = geometry.attributes.position as BufferAttribute;
  const colors = new Float32Array(position.count * 3);
  const colour = new Color();

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const y = terrainHeight(x, z);
    position.setY(i, y);

    const distance = islandDistance(x, z);

    if (y < WATER_LEVEL - 1.6) {
      colour.copy(MUD);
    } else if (y < WATER_LEVEL + 0.5) {
      // A sandy margin where the grass meets the water.
      colour.copy(SAND).lerp(GRASS, smoothstep(WATER_LEVEL - 0.4, WATER_LEVEL + 0.5, y));
    } else if (distance < 0) {
      colour.copy(COURTYARD);
    } else {
      // Break up the grass so a large field does not read as flat colour.
      const variation = (Math.sin(x * 0.41) + Math.cos(z * 0.37)) * 0.5;
      colour.copy(GRASS).lerp(GRASS_DARK, 0.5 + variation * 0.5);
    }

    colors[i * 3] = colour.r;
    colors[i * 3 + 1] = colour.g;
    colors[i * 3 + 2] = colour.b;
  }

  geometry.setAttribute('color', new BufferAttribute(colors, 3));
  geometry.computeVertexNormals();

  const material = new MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.96,
    metalness: 0,
  });

  const mesh = new Mesh(geometry, material);
  mesh.receiveShadow = true;
  mesh.castShadow = false;
  mesh.name = 'terrain';
  return mesh;
}
