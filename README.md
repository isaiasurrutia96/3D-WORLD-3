# LetsGo — locomotion foundation

One gray skinned avatar on the existing charcoal 260 × 460 slab. The avatar geometry and world are unchanged; the compact control chart lists walking and sprinting. The previous SM64 retargeting, animation data and comparison viewer have been removed.

## Controls

- E: walk forward; D: walk backward; S: walk left; F: walk right, relative to the camera.
- Hold either Shift key with E, D, S or F to sprint in that direction. Diagonal combinations also work at the same speed. Release Shift to return to walking; Shift alone does not move.
- Drag to orbit, scroll/pinch to zoom, L to lock the mouse, Esc to release, R to reset the view.
- Walking and sprinting are separate clips. Space does not jump. The avatar returns to its exact neutral pose after stopping; there is no idle animation.

## Development

Use Node.js 24 and npm 11:

```sh
npm ci
npm run dev
npm test
npm run build
```

`npm run preview` serves the production build.

## Foundation

Input, planar movement, authored poses and animation playback are separate:

- `src/input.js` preserves the E/D/S/F input contract.
- `src/running-controller.js` runs at a fixed 120 Hz with normalized input, capped acceleration/braking, planar velocity and bounded facing changes. It has idle/walk/sprint states and a single launch event per sprint entry. There is no jumping controller.
- `src/animation/run-clip.js` retains the approved walking poses and provides a shared clip baker for this avatar's own proportions: contact, compression, toe-off, recovery and passing poses. Leg authoring uses two-bone inverse kinematics to bake ordinary quaternion tracks into a Three.js AnimationClip. Contact ankle travel is matched to root travel. Arms oppose the legs with softly bent elbows and low shoulders. The torso stays upright, recovery lift is modest, and a shorter support interval allows more extended legs without changing travel speed. Ankle motion is authored rather than copied from a foreign skeleton.
- `src/animation/sprint-clip.js` authors a separate high-stride sprint with higher knee drive, brief flight, near-straight trailing-leg extension at toe-off, forward lean and head-height hand drive timed with the opposite knee. A 0.32-second additive launch clip adds the initial forward drive once per sprint entry.
- `src/animation/running.js` blends walking and sprinting through AnimationMixer, preserves their shared stride phase, and blends back to the original rest pose. A shoe-penetration correction protects startup/stop blends; it does not generate the gait. Once stopped, the mixer releases its bindings and the exact rest pose is restored.
- `src/main.js` converts input into camera space, runs fixed simulation and interpolates presentation. Camera controls do not author animation poses.

Walking keeps the accepted 0.58-second, 1.7 m cycle (about 2.93 m/s); its track values were checked unchanged. Sprinting uses a 0.46-second, 2.7 m cycle (about 5.87 m/s), with higher recovery, a longer rearward extension and shorter ground contact. Cadence remains unchanged; travel speed is derived from stride length divided by cycle duration, with no extra speed multiplier. Acceleration and launch drive start together. These are authored starting values for this stylized body, not a claim to reproduce Mario or motion capture. The body has oversized shoes and short legs, so its silhouette remains stylized.

Tests cover input mapping, diagonal normalization, acceleration/braking, loop closure, opposing limb phases, stance-foot drift, floor clearance, reversals and exact rest-pose restoration. Browser checks cover walking, Shift plus E/D/S/F sprinting, launch event count, return to walking, exact stillness after stopping, and inactive jumping. Technical checks support stability; visual quality still requires review in motion.
