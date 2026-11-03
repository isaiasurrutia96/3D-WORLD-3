# LetsGo — Izzy's first ground

A small Three.js test scene: a 80 × 80 floor slab and a plain gray mannequin Izzy with running, jumping, swimming, and ladder climbing. Drag to orbit, scroll or pinch to zoom, and use **Reset view** (or press **R** with the canvas focused) to restore the camera.

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
- The chase camera eases behind Izzy while moving and tracks his actual depth when swimming/diving, with underwater fog and rising bubbles. Drag or use locked mouse-look to look around; automatic recentering resumes after a short pause. Scroll/pinch zooms.
- L: lock/unlock the mouse for mouse-look. Escape also releases it.
- Maximum running speed: 13 world units/second.
- Walk or jump toward the ladder to grab automatically. E climbs up; D climbs down. Space jumps away; C optionally releases. Approach the roof edge and press D to descend.
- Walk into the rectangular pool to swim. E/D/A/F steer; Space strokes upward; C dives. Tap Space near the surface at an edge to start a staged pull-up onto the deck; Izzy plants his arms, lifts his body, brings a knee up, and stands.
- Touch devices have directional, jump/swim, grab, and dive buttons.

Mouse/trackpad orbit changes the movement direction: E runs toward where the camera looks, D goes back, and A/F strafe relative to the view. The run cycle has a forward lean, higher knees, bent elbows, larger arm/leg swings, ankle compensation with toe-off and recovery flex, and a midnight blue sky.

Momentum carries through jumps, with limited air steering. Walking off the slab causes a fall and respawn at the center. Movement uses a fixed 120 Hz physics step.

The model matches the gray mannequin reference: round featureless head, visible neck, broad rounded torso, capsule-shaped limb segments, simple hands and rounded feet, with no hat, face, painted clothing, or buttons. It is procedural, with named pivots for the spine, neck, shoulders, elbows, wrists, hips, knees, and ankles. The joints animate during running, jumping, swimming, and climbing. Arms and legs use 1.65× the original segment lengths, keeping hands and shoes their original size. Standing height and pool-exit reach adapt to the longer limbs. The pool is 20 × 20 units. The ladder is attached to the purple box to the left of spawn; the pool is to the right. The box has solid sides and a walkable roof; the pool is an actual opening with a bottom and walls. Climbing alternates arms and legs with a phase tied to rung spacing; swimming tilts the body and adds alternating strokes and kicks. This is independently tuned movement inspired by Super Mario 64, not an exact port of its mechanics or animations. LifeSheet integration, breath/health systems, and other moves are not included.
