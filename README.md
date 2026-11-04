# LetsGo — movement rebuild baseline

Izzy is a static, articulated character on one unbroken **260 × 460** slab. The surrounding oval track, markings, and barriers remain as scenery.

The previous character controller, running/jumping animations, swimming, ladder climbing, movement course, kart, driving physics, bubbles, checkpoints, and related controls/tests have been removed. Movement will be designed and implemented again in small, validated steps. Nothing currently moves the character.

## Run

Requires Node.js 24 and npm 11.

```sh
npm ci
npm run dev
```

Build with `npm run build`; serve that build with `npm run preview`.

## Viewing controls

- Drag to orbit Izzy. Scroll or pinch to zoom.
- **L** toggles mouse lock; **Esc** releases it. **R**, with the canvas focused, resets the camera.
- Mouse and touch camera controls work on desktop and mobile.

## Structure

- `src/avatar.js`: character geometry, outfit, cap, and named joint hierarchy; no animation.
- `src/world.js`: solid floor and static oval track; no obstacles or vehicles.
- `src/main.js`: scene lighting, camera, and rendering only.

The model keeps its current proportions, white T-shirt, charcoal trousers, white shoes, and dark fitted LA-style cap.

The only visible interface is the LetsGo logo and a bottom control chart: E forward, D backward, S left, F right, Space jump. These movement mappings are informational only; no movement has been implemented.
