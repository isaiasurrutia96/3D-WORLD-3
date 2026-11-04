# LetsGo — locomotion foundation

One gray skinned avatar on the existing charcoal 260 × 460 slab. The avatar geometry, world and compact control chart are unchanged. The previous SM64 retargeting, animation data and comparison viewer have been removed.

## Controls

- E: forward; D: backward; S: left; F: right, relative to the camera.
- Drag to orbit, scroll/pinch to zoom, L to lock the mouse, Esc to release, R to reset the view.
- Running is the only locomotion mode. Shift and Space do not activate walking or jumping. The avatar returns to its exact neutral pose after stopping; there is no idle animation.

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
- `src/running-controller.js` runs at a fixed 120 Hz with normalized input, capped acceleration/braking, planar velocity and bounded facing changes. It has only idle/run states. No jumping or walking controller is present.
- `src/animation/run-clip.js` authors a run for this avatar's own proportions: contact, compression, toe-off, recovery and passing poses. Leg authoring uses two-bone inverse kinematics to bake ordinary quaternion tracks into a Three.js AnimationClip. Contact ankle travel is matched to root travel. Arms oppose the legs; elbows remain bent and shoulders stay low. Ankle motion is authored rather than copied from a foreign skeleton.
- `src/animation/running.js` plays that clip through AnimationMixer, synchronizes its phase with distance travelled and blends it with the original rest pose. A shoe-penetration correction protects startup/stop blends; it does not generate the gait. Once stopped, the mixer releases its bindings and the exact rest pose is restored.
- `src/main.js` converts input into camera space, runs fixed simulation and interpolates presentation. Camera controls do not author animation poses.

The cycle is 0.58 seconds for a 1.7 m stride, yielding about 2.93 m/s. These are authored starting values for this stylized body, not a claim to reproduce Mario or motion capture. The body has oversized shoes and short legs, so its silhouette remains stylized.

Tests cover input mapping, diagonal normalization, acceleration/braking, loop closure, opposing limb phases, stance-foot drift, floor clearance, reversals and exact rest-pose restoration. Browser checks cover the visible run, controls, lack of idle motion and inactive walking/jumping. Technical checks support stability; visual quality still requires review in motion.
