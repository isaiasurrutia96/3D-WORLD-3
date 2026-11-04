# LetsGo — running study

One gray skinned avatar on a charcoal 260 × 460 slab. Rounded shoulder caps sit slightly below the torso top. The approved proportions, narrow stance and enlarged hands/feet remain.

E runs forward, D backward, S left and F right, relative to the camera. Running is the only locomotion mode: Shift does not enable walking and Space does not jump. Releasing movement smoothly stops the controller and restores the exact neutral pose. There is no idle animation.

Drag to orbit, scroll/pinch to zoom, L to toggle mouse lock, Esc to release it and R to reset the view.

## Development

Use Node.js 24 and npm 11:

```sh
npm ci
npm run dev
npm test
npm run build
```

`npm run preview` serves the production build. Tests cover skin weights, bind-pose stability, acceleration, diagonal speed, deterministic stepping, foot clearance, stance contacts and exact rest-pose restoration. Browser checks cover input, rendering and absence of idle motion.

## Movement assembly

Keys feed a fixed 120 Hz running controller. Travel distance drives the run phase; a separate pose generator samples source-derived motion channels and solves knees/ankles against floor contact. The final pose deforms the existing single SkinnedMesh through its 19-bone skeleton. Arms swing in a constrained forward/backward plane. Geometry is independent of animation.

- `src/avatar.js`: geometry, neutral bones and skin weights.
- `src/running-controller.js`: planar running, acceleration and turning.
- `src/animation/running.js`: pose sampling, blending and leg inverse kinematics.
- `src/animation/run-study.json`: derived SM64 run study channels.
- `src/main.js`: input, fixed simulation, camera and rendering.

The reference study examined SM64's run-state logic, animation playback and 72-frame run clip (0x72), including contact frames 9 and 45. Motion is adapted to this avatar's different proportions and bone axes; this is not an exact reproduction of Mario's skeleton, controller or animation. See `third_party/sm64/README.md` for provenance and regeneration.

The user-requested separate “animation input assembly” document was not present in the project or available skills at this stage. The input/controller/pose/mesh pipeline above is explicit so it can be reviewed independently.
