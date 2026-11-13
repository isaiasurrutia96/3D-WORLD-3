# Two-reference floating voxel island

Interactive world preview at /3D-WORLD-3/island/. The two supplied images are
treated as views of ONE island. The illustrated explorer is omitted: there
is no avatar, racing, minigame logic, or gameplay HUD in this scene.

## Run

Use Node.js 24 and the root's pinned dependencies:

    npm ci
    npm run dev:island
    npm run test:island
    npm run build:island

Angled and Overhead select the reference camera presets. Drag to orbit;
scroll/pinch to zoom; R restores Angled. Graphics offers Low / Medium / High,
remembered under letsgo.island.graphics.v1. Low remains the default and a
Canvas 2D compatibility view works when WebGL cannot start. Medium/High need
working WebGL. Idle views do not render continuously.

## Reconstruction plan

src/reference-layout.js is the canonical, explicit plan: the irregular
footprint polygon, stepped rear terrace polygons and heights, all five tree
placements and crown variants, five rock clusters with enumerated blocks,
four shrubs, stone-path cells, pond polygon, narrow waterfall outlet and
authored underside layers. No random function chooses scenery placement or
feature counts. A fixed hash is used only for material colors/grain.

The more overhead image supplies horizontal placement. The angled image
guides thickness, heights, tapered rock mass, canopy silhouettes and lighting.
The Overhead camera is elevated rather than a strict 90-degree plan view,
matching the supplied image; Angled uses a mild perspective projection.
Both cameras render the same cells; switching views never rearranges them.

src/layout.js rasterizes the plan onto one integer grid. src/props.js fills
the named tree, rock and shrub plans. src/sky.js makes the three explicit
cloud groups. src/blocks.js preserves individually editable source cells,
exposed-face discovery and merged solid volumes. src/block-mesh.js batches
rounded exterior faces and cushions while keeping neighbor joins sealed.
src/water.js follows the irregular pond and its narrow, fading waterfall.
The main lawn stays flat and unobstructed.

The existing standalone games and their saved ghost keys remain separate.
This preview has no player controller; geometry tests do not prove movement
behavior for an avatar that has not been connected.

## Graphics

Low uses rounded faces, baked colors/shading, no shadow maps and pixel ratio 1.
Medium adds Lambert lighting and cached 1024-pixel shadows, ratio up to 1.5.
High uses smoother corners, rough/bump materials, softer cached 2048-pixel
shadows and ratio up to 2. Tier changes preserve the entire layout. The old
geometry/materials/shadow targets are disposed on change. Software fallback
supports the same camera projections and Low controls without WebGL.

## Inspection and comparison

window.__letsgoIsland provides world, setBlock(x,y,z,type), collisionBoxes,
setQuality(level), setView('overhead'|'angled'), stats and referenceLandmarks().
setBlock(...,null) removes one cell and rebuilds the view. No building UI is
included. referenceLandmarks() projects approximate, manually interpreted
overhead anchors; those are guides, not a full-image pixel similarity score.

See docs/two-view-comparison.md for the calibration assumptions and visual
comparison checklist. Unseen surfaces and inconsistent perspective details
require small inferences. This is not a claim of literal block-for-block
recovery from the pictures.

Validation covers deterministic reconstruction, supported/closed terrain,
the open center, feature counts, transparent water and rounded geometry.
Browser checks cover both presets, orbit/zoom, all graphics tiers, saved
selection, untouched ghost storage, phone layouts and Firefox without WebGL.

Restore point: checkpoint-before-two-view-island-2026-11-13 at 93f7199.
