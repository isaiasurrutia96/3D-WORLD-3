# LetsGo reference block island — terrain viewer

Standalone at /3D-WORLD-3/island/. This revision follows the supplied island
picture more closely: rounded grass/earth/stone blocks, lobed tree crowns,
irregular rock columns underneath, broad rear terraces, berry shrubs, a short
stone walkway, a turquoise side pool and a transparent segmented waterfall.
The earlier enlarged main lawn and upper ground remain. The source picture
does not expose a complete 3D grid, so the hidden sides/underside are inferred;
this is not a verified exact block-for-block reconstruction of the image.
No avatar or playable minigames are connected to this viewer yet.

## Run

Use Node.js 24 and the repository's pinned root dependencies:

    npm ci
    npm run dev:island
    npm run test:island
    npm run build:island

Drag to orbit, scroll/pinch to zoom, use Overview / Top view, or press R.
npm run build:all preserves the separate movement and racing sites and adds
this viewer at dist/island/.

## Graphics menu

The Graphics selector applies changes without reloading:
- Low (default): rounded exterior faces, baked colors/shading, pixel ratio
  capped at 1, no shadow maps.
- Medium: rounded faces with Lambert lighting, cached 1024-pixel shadow map,
  pixel ratio capped at 1.5.
- High: smoother rounded corners, standard rough materials with fine bump
  detail, cached soft 2048-pixel shadows, pixel ratio capped at 2.

All levels use identical block data, pool dimensions, scenery placement and
solid volumes. Changing quality disposes old geometry/materials/shadow targets.
The selector remembers its preference under letsgo.island.graphics.v1;
racing ghost keys and other game storage are not changed. Unsupported storage
does not prevent loading.

WebGL initialization retains ordinary-adapter and low-power retries. When no
WebGL context can be created, Canvas 2D projects the same island into the
interactive Low compatibility view. Medium/High are disabled there because
their lighting needs 3D graphics support. The view controls still work.
There is no continuous animation loop; idle views do not keep rendering.
Exact speed on the user's Mac has not been measured.

## Source and editing

- src/blocks.js: integer grid, individual editing, exposed-face discovery and
  merged solid collision volumes. Water and background clouds are nonsolid.
- src/layout.js: expanded land, soft stepped terraces, pool cutout and rock lobes.
- src/props.js: clustered tree crowns, roots, rock piles, shrubs and walkway.
- src/sky.js: block-cloud scenery.
- src/block-mesh.js: rounded exterior face patches, smooth normals, recessed
  sealing faces, per-block colors, material tiers and tiny berry details.
  Connected neighbor faces keep matching boundary coordinates; they are not
  independently rounded inward into open seams.
- src/water.js: transparent RGBA pool, ripples, connected lip and fall ribbons.
  Water uses double-sided faces with no opaque reflective underside.
- src/quality.js: tier settings and isolated preference persistence.
- src/main.js: scene lighting, graphics menu, camera and on-demand drawing.
- src/canvas-view.js: software scene projection for unavailable WebGL.

The inspection API is window.__letsgoIsland:
- world.get(x,y,z), world.snap(x,y,z), world.cells
- setBlock(x,y,z,type), null removes a cell and rebuilds the displayed scene
- setQuality('low'|'medium'|'high')
- collisionBoxes (fresh merged full volumes), stats

Visual rounding does not change solid cell coverage. The viewer has no player
controller, so geometry tests do not prove an avatar will never snag. A building
UI, partial-chunk edit optimization, swimming and player integration are future
work. All content is procedural/local; there are no remote asset dependencies.

## Validation

Unit checks cover exact cell editing, hidden internal faces, merged volume
coverage, supported land and sealed exterior boundaries, finite rounded
positions/normals across tiers, pool solidity and transparent water geometry.
Browser checks cover all graphics tiers, persisted selection, unchanged block
data/ghost storage, responsive controls, and Firefox with WebGL disabled.

Restore point: checkpoint-before-island-quality-2026-11-13 at c4dbea5.
