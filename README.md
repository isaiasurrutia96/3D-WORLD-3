# LetsGo — Izzy's first ground

A small Three.js test scene: a 200 × 200 floor slab and a mannequin Izzy wearing a white T-shirt, charcoal chinos, white shoes, and a dark LA cap with running, jumping, swimming, and ladder climbing. Drag to orbit, scroll or pinch to zoom, and use **Reset view** (or press **R** with the canvas focused) to restore the camera.

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
- Maximum running speed: 11.5 world units/second.
- Walk or jump toward the ladder to grab automatically. E climbs up; D climbs down. Space jumps away; C optionally releases. Approach the roof edge and press D to descend.
- Walk into the rectangular pool to swim. E/D/A/F steer; Space strokes upward; C dives. Tap Space near the surface at an edge to start a staged pull-up onto the deck; Izzy plants his arms, lifts his body, brings a knee up, and stands.
- Phones/tablets: drag the left joystick to move, hold Jump/swim or Dive on the right, and drag the scene with another finger to look around. Pinch zooms. Both portrait and landscape layouts respect device safe areas.

Mouse/trackpad orbit changes the movement direction: E runs toward where the camera looks, D goes back, and A/F strafe relative to the view. The run cycle has a forward lean, higher knees, bent elbows, larger arm/leg swings, ankle compensation with toe-off and recovery flex, and a midnight blue sky.

Momentum carries through jumps, with limited air steering. Walking off the slab causes a fall and respawn at the center. Movement uses a fixed 120 Hz physics step.

The model matches the gray mannequin reference: round featureless head, visible neck, broad rounded torso, capsule-shaped limb segments, simple hands and rounded feet, with a blank face, painted short sleeves, white T-shirt and shoes, charcoal chinos, and a snug, structured six-panel 59FIFTY-inspired LA cap with a flat brim. It is procedural, with named pivots for the spine, neck, shoulders, elbows, wrists, hips, knees, and ankles. The joints animate during running, jumping, swimming, and climbing. Arms and legs use 1.65× the original segment lengths, keeping hands and shoes their original size. Standing height and pool-exit reach adapt to the longer limbs. The pool is 20 × 20 units. The ladder is attached to the purple box to the left of spawn; the pool is to the right. The box has solid sides and a walkable roof; the pool is an actual opening with a bottom and walls. Climbing alternates arms and legs with a phase tied to rung spacing; swimming tilts the body and adds alternating strokes and kicks. This is independently tuned movement inspired by Super Mario 64, not an exact port of its mechanics or animations. LifeSheet integration, breath/health systems, and other moves are not included.

## Movement course

Follow the numbered gold rings in order: stairs, gap-jump platforms, down the ramp, ladder roof, pool, finish. The course timer begins when you move; passed rings turn green. Tap Space for shorter hops across the gaps, or hold it to jump higher. **Restart course** resets Izzy, the camera, timer, and progress. The slab is 200 × 200 units.

Sleeves have a hard color boundary, the cap tilts back slightly to raise its brim, Dive appears only while swimming, and the pool pull-up takes 0.65 seconds. No car or driving mode is included.
