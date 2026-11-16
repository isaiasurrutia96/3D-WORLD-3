# Floating Garden

Codex's independent floating-island worlds, at
`/3D-WORLD-3/garden/`. It has its own scene, cameras, controls, assets and ball
simulation. It imports no runtime from the movement world, racing game or
older island app.

The default world is **Canyon Switchbacks**, concept 5 from the
[selected concept sheet](docs/six-floating-island-race-track-concepts.png).
It has a 503-metre closed circuit, a consistent 8.6-metre road, ten flowing
hairpins, two arched bridges, red-and-white curbs and continuous guardrails.
The canyon separates two grassy banks above a shared tapered stone island,
with raised rear gardens, trees, rocks and a river spilling off the front.
This is a buildable interpretation of the concept with validated road
connections and turning radii.

Choose **Drive track** to start at the chequered line. E or Up accelerates;
S/F or Left/Right steers; D or Down brakes and reverses. On touch screens,
use separate steering, gas and brake buttons. The clock starts on movement;
a lap requires all four course quarters in order. **Restart lap** resets the
kart and clock. **Overview** returns to orbit controls. **Garden & golf**
opens the preserved original island and golf hole.

`canyon-layout.js` authors the one-piece route, 43-cm source grid and merged
cell contours. `canyon-world.js` builds the terrain, bridges, road, railings
and scenery in material batches. `canyon-physics.js` owns driving, damped
rail response and ordered lap gates. `canyon-drive.js` owns the kart, wheel
animation, chase camera and keyboard/multi-touch input. Other games' physics
and browser records are unaffected.

The approved five-tree island uses the third building method: connected
blocks of the same material become seamless, softly rounded surfaces. Grass,
dirt, stone, wood and foliage stay separate. The original 43 cm terrain and
21.5 / 10.75 cm detail blocks remain recorded in `src/data/blocks.json`.
`surfaces.bin` and `surfaces.json` are the simplified material meshes;
`plan.json` records the footprint, elevations, pond and scenery anchors.

Choose **Play golf**, drag back from the white ball and release. Pull farther
for more power. Hole 1 is par 2 with one flat bend, a real cup, a stroke counter
and a reset button. Mouse, pen and touch use the same input. Cancellation,
lost capture and blur release the aim. Reset clears the score and returns
the ball to the tee. Back to island restores the overview controls.

From the repository root:

```
npm run dev:garden
npm run test:garden
npm run build:garden
```

Low is the default graphics tier. A Canvas 2D compatibility view keeps the
island and first golf hole usable when WebGL cannot start; it uses simplified
shading while preserving the same course, controls, scoring and world layout.

The root's existing Three.js and Vite dependencies are used without upgrades.
The garden is also included in `npm run build:all` and the Pages deployment.
Its source data and runtime are independent of the other worlds and their
browser storage, lap times and ghosts.
