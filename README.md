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

`npm run preview` serves the production build. Tests cover skin weights, bind-pose stability, acceleration, diagonal speed, deterministic stepping, foot clearance, arm placement, shoe alignment and exact rest-pose restoration. Browser checks cover input, rendering and absence of idle motion.

## Movement assembly

Keys feed a fixed 120 Hz running controller. Travel distance drives the run phase; a separate pose generator retargets the native run clip, tucks the arms beside the ribs and softens shoe pitch. The final pose deforms the existing single SkinnedMesh through its 19-bone skeleton. Arms swing in a constrained forward/backward plane. Geometry is independent of animation.

- `src/avatar.js`: geometry, neutral bones and skin weights.
- `src/running-controller.js`: planar running, acceleration and turning.
- `src/animation/running.js`: adapted clip playback and rest-pose blending.
- `src/animation/adapted-run.js`: rib-level arm placement and softened shoe rotation.
- `src/animation/run-reference.json`: native SM64 run channels.
- `src/animation/legacy-running.js`: previous animation retained only for comparison.
- `src/main.js`: input, fixed simulation, camera and rendering.

The reference study examined SM64's run-state logic, animation playback and 72-frame run clip (0x72), including footstep sound events at frames 9 and 45. Motion is adapted to this avatar's different proportions and bone axes; this is not an exact reproduction of Mario's skeleton, controller or animation. See `third_party/sm64/README.md` for provenance and regeneration.

The user-requested separate “animation input assembly” document was not present in the project or available skills at this stage. The input/controller/pose/mesh pipeline above is explicit so it can be reviewed independently.

## Running comparison and connected animation

Open `run-review.html` for synchronized front/side views of the native reference skeleton, previous run and rebuilt run. It starts paused at frame 9. Play, quarter speed, frame stepping and a 0–71 scrubber review one stationary cycle. Optional bone lines and full-cycle sole-height charts expose transfer and contact differences. E/D/S/F, Shift and Space have no movement action on this page.

The rebuild uses the full native clip channels plus the steady straight-running torso-tilt node, with explicit bone-axis conversion. It does not use the old procedural swing/IK path. The adjusted animation is now connected to the existing E/D/S/F controller after the user requested arms near the ribs and approved proceeding. Native torso/hip/knee motion remains; arm positioning and shoe pitch are deliberately adapted. The runtime restores the exact neutral pose after stopping and corrects shoe penetration during blending. Avatar construction and the world have not changed.

See [the diagnosis and matching-frame comparison](docs/running-comparison.md). All 72 frames of measurements are downloadable from the preview. Direction/angle agreement verifies retargeting, not visual fidelity to the rendered game. Different body and shoe proportions leave contact-height and silhouette differences; the preview discloses a fixed clearance offset.

Regenerate the reference and report:

```sh
node tools/import-run-reference.mjs /path/to/sm64/assets/anims/anim_72_73.inc.c /path/to/sm64/actors/mario/model.inc.c
node tools/report-run-comparison.mjs
```
