# LetsGo — locomotion foundation

One gray skinned avatar on the existing charcoal 260 × 460 slab, now connected to a floating winding circuit with red/white curbs, guardrails and a raised crossing. The avatar geometry and the approved walking/sprint clips are unchanged. The previous SM64 retargeting, animation data and comparison viewer have been removed.

## Controls

- E: run forward; D: run backward; S: run left; F: run right, relative to the camera.
- Running is the default. Hold either Shift key with E, D, S or F to walk. Diagonal movement is normalized; Shift alone does not move.
- Drag to orbit, scroll/pinch to zoom, L to lock the mouse, Esc to release, R to reset the view.
- Space: single jump from standing, walking or sprinting. Holding Space does not auto-repeat; release and press again for another jump.
- Walking and sprinting are separate clips. The avatar returns to its exact neutral pose after stopping; there is no idle animation.

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
- `src/running-controller.js` runs at a fixed 120 Hz with normalized input, capped acceleration/braking, planar velocity and bounded facing changes. It has idle/walk/sprint/jump/fall states, vertical velocity, gravity, grounded checks and one jump per press. Fast-gait speed comes directly from stride length divided by cycle duration; Shift selects the existing walking speed.
- `src/animation/run-clip.js` retains the approved walking poses and provides a shared clip baker for this avatar's own proportions: contact, compression, toe-off, recovery and passing poses. Leg authoring uses two-bone inverse kinematics to bake ordinary quaternion tracks into a Three.js AnimationClip. Contact ankle travel is matched to root travel. Arms oppose the legs with softly bent elbows and low shoulders. The torso stays upright, recovery lift is modest, and a shorter support interval allows more extended legs without changing travel speed. Ankle motion is authored rather than copied from a foreign skeleton.
- `src/animation/sprint-clip.js` authors a separate high-stride sprint with rearward leg drive, moderate recovery lift, near-straight trailing-leg extension at toe-off, and a balanced arm swing. Forward foot reach and recovery knee bend are reduced. Hips and torso lean forward together with a straight spine. The pelvis and chest stay aligned; the torso does not fold at the stomach. Each arm completes one smooth forward/backward swing per leg cycle, with reduced arm reach and leg motion kept closer underneath the body. Initial acceleration and the first planted-foot/toe-off stride provide the push-off without adding a bend at the waist. The longer 3 m stride uses a shorter support interval and matched rearward ankle travel to prevent skating.
- `src/animation/running.js` blends walking and sprinting through AnimationMixer, preserves their shared stride phase, and blends back to the original rest pose. A shoe-penetration correction protects startup/stop blends; it does not generate the gait. Once stopped, the mixer releases its bindings and the exact rest pose is restored.
- `src/animation/jump-clip.js` provides a separate airborne pose and blend back to the ground gait; there is no double jump.
- `src/track.js` builds the approved winding circuit with instanced metal rails, alternating red/white curbs, a short access bridge and a raised diagonal overpass.
- `src/world.js` supplies exact road-triangle support heights, separate upper/lower crossing levels and guardrail collision. The existing slab remains 260 × 460.
- `src/main.js` converts input into camera space, runs fixed simulation and interpolates presentation. Camera controls do not author animation poses.

Walking keeps the accepted 0.58-second, 1.7 m cycle (about 2.93 m/s); its track values were checked unchanged. Sprinting uses a 0.23-second, 3.0 m cycle (about 13.04 m/s), with higher recovery, a longer rearward extension and shorter ground contact. Running speed is exactly twice the previous 6.52 m/s. Clip cadence is doubled with it so planted-foot travel still matches the ground; travel speed is derived from stride length divided by cycle duration, with no extra speed multiplier. Acceleration and the first push-off stride start together. These are authored starting values for this stylized body, not a claim to reproduce Mario or motion capture. The body has oversized shoes and short legs, so its silhouette remains stylized.

Tests cover input mapping, diagonal normalization, acceleration/braking, loop closure, opposing limb phases, stance-foot drift, floor clearance, reversals and exact rest-pose restoration. Browser checks cover walking, default E/D/S/F running and Shift walking, launch event count, return to walking, exact stillness after stopping, and single jumping. Technical checks support stability; visual quality still requires review in motion.

## Floating circuit and jumping

The character starts near the slab's right-hand bridge, facing the circuit. Walk or sprint forward onto the circuit. Guardrails block movement at road level and may be cleared by a jump. The overpass has clearance for the character and a full jump on the lower road. Its upper road is reached through the ramps, with no snapping between levels. Falling into the void returns the character to the bridge approach. Scroll out and orbit to inspect the whole layout; R returns to the close view.

Jump speed is 7.8 m/s with 22 m/s² gravity, giving about 1.35 m of rise and 0.7 seconds airborne on a flat surface. A tap is queued until the next simulation step so quick Space presses are not missed. Surface support is sampled against the same triangles rendered by the road mesh. Rail collision is indexed spatially and accounts for the character's elevation.

Additional checks cover the slab/bridge seam, guardrail blocking/clearance, a complete circuit traversal including both crossing levels, held-key single jumps, landing on elevated track, unsupported falling, finite geometry and exact stillness after landing.

## Unpainted go-kart prototype

`src/kart.js` builds an unpainted, static go-kart construction frame beside the slab's bridge approach: tubular chassis, front/rear axles, four skeletal wheel hoops with hubs/spokes, seat outline and a steering column/wheel. Wheels and steering have separate named groups for future rigging. The frame now carries a low nose panel, side pods, rear shell, floor pan and seat shell inspired by simple retro kart proportions. All surfaces remain plain neutral gray with no paint, textures, logos or engine details. There are no driving controls. This is a visual frame study; vehicle collision and driving are not enabled yet.
