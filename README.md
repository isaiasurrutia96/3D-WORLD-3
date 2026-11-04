# LetsGo — movement lab

Izzy runs, walks, and single-jumps on a solid **260 × 460** slab. The perimeter track is scenery; the old course, swimming, climbing and driving remain removed.

## Run

Node.js 24 and npm 11:

```sh
npm ci
npm run dev
```

`npm run build` makes the production build. `npm run preview` serves it. `npm test` runs locomotion and animation-decoding checks.

## Controls

- **E** forward, **D** backward, **S** left, **F** right, relative to the camera.
- Run by default. Hold **Shift + E** for walking while moving forward.
- Drag to orbit; scroll/pinch to zoom. The camera follows Izzy's position.
- **L** locks/unlocks mouse-look; **Esc** releases it.
- **R**, with the canvas focused, resets the view.
- **Space** performs one standard jump. Holding it does not repeat; no double/triple or midair jump is enabled.

Only the logo and bottom key chart are shown. No touch movement controls are added in this keyboard-focused milestone; touch still controls the camera.

## Animation and controller

Running and walking play the original SM64 frame data, retargeted onto Izzy's articulated model, rather than the deleted procedural sine-wave gait. The controller uses a fixed 30 Hz update with source-based animation timing and yaw limits. Startup acceleration is tuned higher, stopping/reversal deceleration eases in, and the final reversal turn is gradual. Rendering interpolates between ticks. Shift supplies the walking-speed input that an analog stick would normally provide.

Izzy has different proportions and geometry, so its silhouette and foot reach differ from Mario's. The retargeter converts bone axes and corrects shoe penetration against the floor. Grounded arm movement is constrained to a low forward/backward arc with bent elbows, while keeping the original animation phase. Clip changes blend briefly instead of snapping. Single jumps use original takeoff/fall/landing poses with a separate vertical arc and limited air steering. This is not a complete recreation of the game's physics.

See [source provenance and differences](third_party/sm64/README.md).

- `src/avatar.js`: character geometry, outfit, cap and named joints.
- `src/world.js`: slab and static oval circuit.
- `src/locomotion.js`: fixed-step flat-ground locomotion.
- `src/animation/locomotion.js`: source animation sampling and retargeting.
- `src/main.js`: input, camera, interpolation and rendering.
