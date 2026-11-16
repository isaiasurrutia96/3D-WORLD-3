# Floating Garden

Codex's independent floating island and one-hole mini golf game, at
`/3D-WORLD-3/garden/`. It has its own scene, cameras, controls, assets and ball
simulation. It imports no runtime from the movement world, racing game or
older island app.

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
