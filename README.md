# LetsGo — native skeleton motion study

A plain gray test body on a charcoal **260 × 460** slab. Only the LetsGo logo and a compact bottom control chart are shown. No track, outfit, hat, obstacles, pool or vehicles.

## Development

Node.js 24 and npm 11:

```sh
npm ci
npm run dev
```

Build with `npm run build`; serve with `npm run preview`. `npm test` checks the controller, original skeleton structure, and direct animation-channel playback.

## Controls

- E forward, D backward, S left, F right, relative to the camera.
- Hold Shift + E to walk forward; otherwise run.
- Space performs one jump. No midair repeat or automatic repeat while held.
- Drag to look, scroll/pinch to zoom, L toggles mouse lock, Esc releases it.
- R, with the canvas focused, resets the view. Touch controls the camera only.

## Why this body is different

The body is constructed around SM64's original 20 animated parts, with the exact original parent hierarchy, joint offsets and limb lengths, in original model coordinates. A single uniform scale fits the scene. Original local XYZ animation rotations are applied directly using the matching matrix convention. There is no humanoid retargeting, custom arm formula, joint-angle clamp or per-limb rescaling.

The mannequin's visible surfaces are simple custom geometry, not Mario's original mesh. A constant vertical alignment accommodates those surfaces without changing animation curves. Run, walk, idle, braking, turning and single-jump/fall/landing pose data are included. Controller acceleration and braking retain the previously tuned behavior; the complete game engine is not reproduced.

See [animation provenance](third_party/sm64/README.md).

- `src/sm64-rig.js`: native skeleton, plain body and direct clip playback.
- `src/animation/sm64.json`: original animation values and channel indices.
- `src/locomotion.js`: flat-floor controller and single jump.
- `src/world.js`: one charcoal slab.
- `src/main.js`: input, camera and rendering.
