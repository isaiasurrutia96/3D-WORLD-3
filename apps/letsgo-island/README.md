# LetsGo block island — terrain stage

A separate island scene at /3D-WORLD-3/island/, rebuilt around the approved
block reference. It has a larger open main lawn, two broad rear terraces,
block trees and shrubs, rock piles, a short stone path, layered earth and
a tapered stone underside. Block clouds complete the background. There is
no water or waterfall. The previous decorative golf and loop path give way
to the open lawn in the new reference. No avatar or playable minigames are
connected to this terrain viewer yet.

## Run

Use Node.js 24 and the root's existing pinned dependencies:

    npm ci
    npm run dev:island
    npm run test:island
    npm run build:island

Drag to orbit, scroll/pinch to zoom, Overview / Top view to reset, or press R.
npm run build:all preserves the independent movement and racing sites and
adds this scene at dist/island/.

## Blocks and solidity

src/blocks.js owns integer cell positions and block types. Blocks remain
individually editable; touching cells have no internal exposed faces.
collisionBoxes() merges full cell volumes into non-overlapping solid boxes;
visual bevels do not create gaps in those volumes. The data is ready for
future integration, but the viewer has no player controller yet, so this
delivery does not claim to verify avatar movement or physics recovery.

src/layout.js sets the expanded footprint, two terraces and solid underside.
src/props.js adds trees, shrubs, rock piles and the short stone path.
src/sky.js adds clouds. src/terrain.js assembles the block data.

src/block-mesh.js emits only exterior faces, with small sealed face bevels,
deterministic color variation and precomputed directional / occlusion shading.
There is one mesh per horizontal chunk, no mesh or physics body per block,
no live shadow maps, no textures, no postprocessing and no animation loop.
An idle scene does not continually render. The initial full scene has about
100,000 source blocks, 22,000 exposed faces and 27 drawing batches.

The development inspection API is window.__letsgoIsland:
- world.get(x,y,z), world.snap(x,y,z), world.cells
- setBlock(x,y,z,type), with null removing a cell and refreshing the visible view
- collisionBoxes (fresh merged volumes), stats

Direct world edits are data-only; use setBlock() to refresh the displayed scene.
The building UI and partial-chunk editing optimization are future work.

## Older laptops and Firefox

The default WebGL request uses the ordinary adapter. Compatibility retries
disable antialiasing and then request the low-power adapter. Pixel ratio is
capped at 1.25 (1 in compatibility mode). Materials use precomputed colors.

If Firefox cannot create WebGL at all, src/canvas-view.js projects the same
block faces into Canvas 2D. Overview, Top view, drag and zoom remain available.
It needs no WebGL or GPU driver override. It draws on demand and keeps the
same source blocks and collision data; it is a software scene viewer, not a
replacement game renderer. CPU speed still affects interaction performance.

Tests cover exact snapping/editing, hidden-face removal, merged collision
volume coverage, supported lawn area, sealed terrain boundaries, scene budget,
and renderer retries. Browser checks also force WebGL unavailable to exercise
the actual Canvas fallback. Exact performance on the user's Mac is not measured.

Restore point: checkpoint-before-block-island-2026-11-13 at ade23f4.
