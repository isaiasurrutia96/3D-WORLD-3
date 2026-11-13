# LetsGo floating island — terrain stage

A separate, orbitable 3D terrain preview at `/3D-WORLD-3/island/`. It does not
load or modify either the movement game or the kart-racing game. This stage
contains the island's grass surface, rounded turf edge, golden earth strata,
faceted stone underside, a connected dirt loop and golf access path, trees,
bushes, flowers, scattered rocks, small background islands/clouds, and a spring
feeding a stream and animated waterfall. A wooden footbridge spans the stream.
The small putting course and turning windmill are scenery, with no golf rules
or ball controls yet. Other areas remain grass. No avatar, new movement system,
obstacle course, arena, racing, weapons, scoring, or additional minigames are
part of this terrain-only delivery.

## Run and review

Use Node.js 24 and the repository root's pinned Three.js/Vite dependencies:

```sh
npm ci
npm run dev:island
npm run test:island
npm run build:island
```

The preview defaults to `http://127.0.0.1:5275/`. Drag to orbit, scroll/pinch to
zoom, select **Overview** or **Top view**, or press R to reset the overview.
Orbiting below the horizon exposes the rocky underside. Desktop and mobile
use the same camera controls; the complete island fits the starting viewport.

`npm run build:all` builds the existing movement and racing pages first, then
adds the island at `dist/island/`. The island uses root library dependencies
but has its own HTML, scene, geometry, camera and lifecycle; it imports no
runtime code from the other games. No extra package installation or versions
are introduced. All scenery is local procedural geometry; there are no remote
textures, external assets, online services or storage writes.

## Source

- `src/layout.js`: deterministic island outline, terrain heights, path, river,
  golf perimeter, trees and rocks. Ground and river use the same layout.
- `src/terrain.js`: continuous grass mesh, sealed faceted underside, turf/earth
  layers and dirt ribbons. The stream crossing opens only beneath the bridge.
- `src/props.js`: instanced vegetation, rocks and small background islands.
- `src/water.js`: connected stream/waterfall geometry, flowing-water shaders,
  foam, bank rocks and the footbridge at the sampled path/stream intersection.
- `src/golf.js`: contained putting surface, grounded foundation, brick border,
  access ramp, hole/flag and decorative windmill.
- `src/sky.js`: sky gradient and cloud clusters.
- `src/main.js`: standalone renderer, light, orbit camera and resize lifecycle.
- `tests/terrain.test.js`: closed island topology, finite geometry, sampled
  surface support, full path/course containment and stream-to-fall continuity.

Restore point: `checkpoint-before-island-terrain-2026-11-13` at `141de23`.


## Firefox graphics startup

The standard path retains the original antialiasing and high-performance
request, including on mobile. If a browser/driver rejects that context,
`src/renderer.js` retries without antialiasing using the default adapter, then
the low-power adapter. Each retry uses a fresh canvas because a rejected
constructor can leave a diagnostic context attached to its first canvas.
Compatibility mode uses a 1x pixel ratio and a 1024-pixel shadow map to reduce
GPU memory pressure; terrain, materials, cameras and animation stay the same.

If WebGL 2 is unavailable in every mode, show an actionable Firefox graphics
message with a Retry button. Do not present that condition as a missing world
file. The site cannot override a browser's disabled/blocked graphics support.
`tests/renderer.test.js` verifies supported startup, both fallback paths,
fresh-canvas handling and fully unavailable graphics.
Restore point: `checkpoint-before-island-startup-fix-2026-11-13` at `17b25e5`.
