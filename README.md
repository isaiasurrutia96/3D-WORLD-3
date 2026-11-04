# LetsGo — floor-only baseline

The 3D scene contains exactly one mesh: a solid charcoal **260 × 460** floor slab. There is no character, track, vehicle, movement controller, animation data, or simulation.

The LetsGo logo and bottom key chart remain. Movement keys shown in the chart are informational and inactive. Drag to orbit the slab, scroll or pinch to zoom, L to toggle mouse lock, Esc to release, and R with the canvas focused to reset the view.

## Development

Node.js 24 and npm 11:

```sh
npm ci
npm run dev
```

Build with `npm run build`; serve the production build with `npm run preview`.

`src/world.js` defines the one floor mesh. `src/main.js` handles lighting, viewing controls, and rendering only.
