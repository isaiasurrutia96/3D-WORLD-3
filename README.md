# LetsGo — static avatar review

One plain gray avatar, standing still on the charcoal **260 × 460** slab. The small key chart and LetsGo logo remain. Movement keys in the chart are informational and inactive.

There are no idle, breathing, bobbing, running, walking or jumping animations. There is no movement controller, animation sampler, imported clip data, track, vehicle, course or pool. Rendering occurs only when the viewing camera or viewport changes.

## Development

Node.js 24 and npm 11:

```sh
npm ci
npm run dev
```

`npm run build` produces the application; `npm run preview` serves that build. `npm test` verifies geometry, skin weights, the neutral skeleton and bind-pose stability.

## Model construction

`src/avatar.js` creates one indexed `SkinnedMesh` in a fixed neutral pose. Body dimensions and joint landmarks are authored in meters, with +Y up and +Z forward. The left/right landmarks are symmetric. The arms and legs use continuous ring surfaces with normalized skin weights across elbows and knees, rather than detached primitives driven by animation data. The soles rest at Y=0.

The neutral skeleton and visible geometry are defined without an animation source. This is a new review model, not a claim to reproduce Mario's mesh or skeleton. Any future motion must be a separate, explicitly requested step, validated against this approved neutral pose and ground contact before enabling a controller.

## Viewing

Drag to orbit, scroll/pinch to zoom, L to toggle mouse lock and Esc to release it. R, with the canvas focused, resets the view. Camera movement never changes the model's pose.

- `src/avatar.js`: static body geometry, neutral bones and bind weights.
- `src/world.js`: charcoal floor.
- `src/main.js`: lighting and event-driven viewing only; no simulation loop.

Model refinement: rounded shoulder/thigh caps, a narrower stance with a small upper-thigh gap, and hands/feet enlarged about 10%. The skeleton and skin weights remain in a fixed neutral pose.

Before any future movement work, read the animation input assembly requested by the user. That review and all animation work are deferred until the movement stage.
