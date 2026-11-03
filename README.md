# LetsGo — Izzy's first ground

A small Three.js test scene: one floor slab and a stationary, blue-and-yellow Izzy. Drag to orbit, scroll or pinch to zoom, and use **Reset view** (or press **R** with the canvas focused) to restore the camera.

## Development

Requires Node.js 24 and npm 11.

```sh
npm ci
npm run dev
```

Build with `npm run build`; serve the result with `npm run preview`.

The model is procedural, with named pivots for the spine, neck, shoulders, elbows, wrists, hips, knees, and ankles. No movement, physics, LifeSheet integration, or game assets are included yet. The third-person orbit camera is an initial prototype, not a recreation of Super Mario 64's camera logic.
