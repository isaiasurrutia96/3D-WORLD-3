# Two-reference floating voxel island

Interactive island at /3D-WORLD-3/island/. The two supplied images are treated
as views of ONE island. The approved terrain is preserved, with the existing
clay avatar and movement controller now connected for walking and jumping.
The existing Original Circuit floats alongside it with a walkable bridge and
drivable kart. No race session, NPCs, weapons, timing or ghosts are loaded here.

## Run

Use Node.js 24 and the root's pinned dependencies:

    npm ci
    npm run dev:island
    npm run test:island
    npm run build:island

Explore follows the avatar. E/D/S/F or arrows move, Space jumps, Shift walks,
C crouches, and Backspace/Reset returns to the lawn spawn. On phones, touch
anywhere on the left half to place the pad under your thumb, then slide to
move. Lifting or cancelling hides/releases it. Right buttons jump/crouch.
Drag to orbit; scroll/pinch to zoom.
Angled and Overhead retain the reference presets and pause movement while
inspecting the island. R restores Angled in those inspection views.
Cross the east bridge to the parked kart. R/Drive kart gets in; R/Exit kart
gets out when stopped. E/Up accelerates, D/Down brakes and reverses, and
S/F or Left/Right steers. Phones use separate Left, Right, Gas and
Brake/Reverse buttons in the kart. The floating stick and Jump/Crouch buttons
are for walking only and return when you exit. Reset returns both player and
kart home. Track shows the full course.
Graphics offers Low / Medium / High,
remembered under letsgo.island.graphics.v1. Low remains the default and a
Canvas 2D compatibility view works when WebGL cannot start. Medium/High need
working WebGL. Idle views stop drawing after the avatar settles; Low and
software mode cap their moving render rates. Environment shadows stay cached.

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
Only reusable Player, model/animation, Input and CollisionWorld modules are
imported from root; its startup, world and HUD are never imported.
src/avatar-world.js merges exposed solid faces into collision rectangles in
the controller's metre space (0.45 metres per island cell). The avatar is
drawn at the inverse scale, without rescaling or editing the approved world.
The pond uses its actual water-cell outline; falls return to safe ground.
Movement tests cover lawn seams, the original jump, landing on a terrace,
fall recovery and the irregular pond. Touch controls release on cancellation,
lost capture, blur, page hide and visibility changes.

src/track-link.js imports Original Circuit's existing mesh builder and road/
rail data. Its X/Z footprint is fitted at 40% beside the island, preserving
the complete route and original vertical clearance. A new level bridge meets
its original access stub without a gap or railing across the opening. The
kart model, dimensions, acceleration, steering and rail response are reused
unchanged from the standalone game via src/island-kart.js. The standalone
course and its records are unchanged. Vite deduplicates Three.js for this
combined scene without changing either project's pinned dependencies.

## Graphics

Low uses rounded faces, baked colors/shading, no shadow maps and pixel ratio 1.
Medium adds Lambert lighting and cached 1024-pixel shadows, ratio up to 1.5.
High uses smoother corners, rough/bump materials, softer cached 2048-pixel
shadows and ratio up to 2. Tier changes preserve the entire layout. The old
geometry/materials/shadow targets are disposed on change. Software fallback
supports the same camera projections, animated avatar, movement and Low
controls without WebGL. src/canvas-avatar.js projects the actual rig rather
than a placeholder. Near-plane clipping handles scenery beside the camera.

## Inspection and comparison

window.__letsgoIsland provides world, setBlock(x,y,z,type), collisionBoxes,
setQuality(level), setView('walk'|'overhead'|'angled'|'track'), avatar, kart,
trackLink, resetAvatar(),
stats and referenceLandmarks().
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

Approved terrain checkpoint before the avatar:
checkpoint-island-approved-before-avatar-2026-11-13 at 3ca2853.
Checkpoint before the connected track: checkpoint-island-avatar-before-track.
Earlier reconstruction checkpoint: checkpoint-before-two-view-island-2026-11-13
at 93f7199.
