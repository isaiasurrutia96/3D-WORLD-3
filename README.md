# LetsGo — Izzy's first ground

A small Three.js test scene: a 80 × 80 floor slab and a blue-and-yellow Izzy with running, jumping, swimming, and ladder climbing. Drag to orbit, scroll or pinch to zoom, and use **Reset view** (or press **R** with the canvas focused) to restore the camera.

## Development

Requires Node.js 24 and npm 11.

```sh
npm ci
npm run dev
```

Build with `npm run build`; serve the result with `npm run preview`. Run the movement tests with `npm test`.

## Controls

- E forward, D back, A left, F right (or arrow keys): camera-relative running, with acceleration and braking.
- Space: jump. Hold for a higher jump; release early for a short hop.
- Drag: orbit the following camera. Scroll/pinch: zoom.
- L: lock/unlock the mouse for mouse-look. Escape also releases it.
- Maximum running speed: 13 world units/second.
- Walk or jump toward the ladder to grab automatically. E climbs up; D climbs down. Space jumps away; C optionally releases. Approach the roof edge and press D to descend.
- Walk into the rectangular pool to swim. E/D/A/F steer; Space strokes upward; Ctrl dives. Hold Space while moving near an edge to climb out.
- Touch devices have directional, jump/swim, grab, and dive buttons.

Mouse/trackpad orbit changes the movement direction: E runs toward where the camera looks, D goes back, and A/F strafe relative to the view. The run cycle has a forward lean, higher knees, bent elbows, larger arm/leg swings, ankle compensation with toe-off and recovery flex, and a midnight blue sky.

Momentum carries through jumps, with limited air steering. Walking off the slab causes a fall and respawn at the center. Movement uses a fixed 120 Hz physics step.

The model has painted overalls and facial features, a backward yellow cap, white gloves, brown shoes, and raised overall buttons. It is procedural, with named pivots for the spine, neck, shoulders, elbows, wrists, hips, knees, and ankles. The joints animate during running, jumping, swimming, and climbing. Arms and legs are 18% longer, with the standing height adjusted to keep the soles on the floor. The pool is 20 × 20 units. The ladder is attached to the purple box to the left of spawn; the pool is to the right. The box has solid sides and a walkable roof; the pool is an actual opening with a bottom and walls. Climbing alternates arms and legs with a phase tied to rung spacing; swimming tilts the body and adds alternating strokes and kicks. This is independently tuned movement inspired by Super Mario 64, not an exact port of its mechanics or animations. LifeSheet integration, breath/health systems, and other moves are not included.
