# LetsGo — locomotion foundation

Claude’s plain jointed avatar, walking, running and normal jump are connected to the existing slab and racing circuit. Kart driving now includes controlled drifting. Items, lap timing, saved top-four records and ghost playback retain their existing implementation.

## Controls

- The home screen contains only the LetsGo logo and **Play**. Play starts a fresh attempt seated at the start/finish line. **Home** returns to that screen, clears held input and stops the render/simulation loop. Saved top-four laps are retained.
- Click **Start in kart** or press **T** to spawn seated on the start/finish line. The clock stays at zero until **E** first accelerates. T restarts an attempt.

- E: run forward; D: run backward; S: run left; F: run right, relative to the camera.
- Running is the default. Hold either Shift key with E, D, S or F to walk. Diagonal movement is normalized; Shift alone does not move.
- Drag to orbit, scroll/pinch to zoom, L to lock the mouse, Esc to release, R to reset the view.
- H: enter the kart when nearby; H exits when stopped and a safe spot is available.
- While driving: E accelerates, D brakes/reverses, S/F or the left/right arrows steer, and a fresh Shift press uses the held item. Space is the e-brake/drift control: hold Space while steering at speed to drift, and keep E held to accelerate. Release steering to hold the current drifting arc, countersteer to progressively straighten, and release Space to regain grip. Space outside a drift strongly brakes even with E or Nitro active. The mouse changes the view without steering.
- Q + Space while standing still: a standing backflip, with a grounded load/push-off, backward launch, single tucked turn and landing absorption. Holding the chord does not repeat it.
- Space on foot: single jump from standing, walking or sprinting. Holding Space does not auto-repeat; release and press again for another jump.
- Walking, running and normal jumping use Claude’s native rig and pose animation. Idle remains still.

## Phone controls

Touch devices use a layout based on the mobile racing reference, in portrait or landscape:

- The larger bottom-left **Left / Right** buttons steer the kart. Each finger releases independently; pressing both steering buttons gives neutral steering.
- Hold the bottom-right **Gas** pad to accelerate. Slide that same finger up at least 28 CSS pixels to arm **Drift**; steering at speed starts the slide. Slide down toward the original contact point to return to gas without lifting. Lift to release gas and drift. The separate entry/release thresholds prevent finger jitter toggling drift. The kart waits for Gas before starting the lap; it no longer auto-accelerates.
- On both mobile and laptop, a short countersteer progressively unwinds the existing turn toward straight. Holding the opposite direction longer blends into a new turn. Body alignment is rate-limited while unwinding so it does not whip across the travel direction. Releasing drift eases the body into alignment over 0.55 seconds. Laptop **Space** still applies the e-brake outside an established drift; a mobile swipe keeps Gas active and can arm a drift before steering. **Reverse** brakes and reverses while held. A physical E/D key overrides the mobile accelerator when used.
- The upper-right item button shows **Boost** or **Shell** after collecting a box. One tap uses the held item, including while other fingers hold steering and drift. Holding the button cannot automatically consume a later pickup.
- **View** changes between the existing third-person and isometric cameras. The **Laps & ghosts** disclosure keeps times, replay toggle and restart accessible without covering the driving controls; it opens beside the HUD on short landscape screens.
- **Exit** brakes to a stop before using the existing safe kart exit. On foot, the left pad becomes **Move** (small movements walk, larger movements run), the right button becomes **Jump**, and the secondary button becomes a standing **Flip**. **Kart** re-enters when nearby.
- Returning Home, cancelling a touch, changing orientation, losing focus or hiding the page clears held fingers. Background/home simulation does not advance. Play starts another attempt without deleting records.

`src/mobile-input.js` owns finger state and queued taps; `src/mobile-controls.js` binds Pointer Events with pointer capture and document-level release/cancel handling, including release outside a control when capture fails. It also recovers after all touches end and ignores stale capture-loss notifications. The touch input merges into the existing keyboard/vehicle interfaces. `tests/mobile-input.test.js` covers stick limits, button/finger ownership, cancellation, queued taps, input precedence and combined steering/drift. `tests/jump-drift.test.js` checks gentle drift recovery, travel direction, retained speed and countersteering.

## Development

Use Node.js 24 and npm 11:

```sh
npm ci
npm run dev
npm test
npm run build
```

`npm run preview` serves the production build.

## Legacy movement compatibility

The following legacy modules remain as compatibility sources for the existing backflip and comparison page. Current walking, running and normal jumping use the native adapter described below:

- `src/input.js` preserves the E/D/S/F input contract.
- `src/running-controller.js` runs at a fixed 120 Hz with normalized input, capped acceleration/braking, planar velocity and bounded facing changes. It has idle/walk/sprint/jump/fall states, vertical velocity, gravity, grounded checks and one jump per press. Fast-gait speed comes directly from stride length divided by cycle duration; Shift selects the existing walking speed.
- `src/animation/run-clip.js` retains the approved walking poses and provides a shared clip baker for this avatar's own proportions: contact, compression, toe-off, recovery and passing poses. Leg authoring uses two-bone inverse kinematics to bake ordinary quaternion tracks into a Three.js AnimationClip. Contact ankle travel is matched to root travel. Arms oppose the legs with softly bent elbows and low shoulders. The torso stays upright, recovery lift is modest, and a shorter support interval allows more extended legs without changing travel speed. Ankle motion is authored rather than copied from a foreign skeleton.
- `src/animation/sprint-clip.js` authors a separate high-stride sprint with rearward leg drive, moderate recovery lift, near-straight trailing-leg extension at toe-off, and a balanced arm swing. Forward foot reach and recovery knee bend are reduced. Hips and torso lean forward together with a straight spine. The pelvis and chest stay aligned; the torso does not fold at the stomach. Each arm completes one smooth forward/backward swing per leg cycle, with reduced arm reach and leg motion kept closer underneath the body. Initial acceleration and the first planted-foot/toe-off stride provide the push-off without adding a bend at the waist. The longer 3 m stride uses a shorter support interval and matched rearward ankle travel to prevent skating.
- `src/animation/running.js` blends walking and sprinting through AnimationMixer, preserves their shared stride phase, and blends back to the original rest pose. A shoe-penetration correction protects startup/stop blends; it does not generate the gait. Once stopped, the mixer releases its bindings and the exact rest pose is restored.
- `src/animation/jump-clip.js` provides an asymmetric one-foot takeoff (one knee raised, the opposite leg extending), a separate airborne pose and blend back to the ground gait; there is no double jump.
- `src/track.js` builds the approved winding circuit with instanced metal rails, alternating red/white curbs, a short access bridge and a raised diagonal overpass.
- `src/world.js` supplies exact road-triangle support heights, separate upper/lower crossing levels and guardrail collision. The existing slab remains 260 × 460.
- `src/main.js` converts input into camera space, runs fixed simulation and interpolates presentation. Camera controls do not author animation poses.

The legacy walking clip keeps its 0.58-second, 1.7 m cycle (about 2.93 m/s). Running now uses a 0.46-second, 6.0 m left/right cycle at the same 13.04 m/s travel speed. Consecutive footfalls are about 3 m apart rather than 1.5 m, and both arm and leg cadence are halved from the previous version. Wider front/rear extension and a longer flight phase replace the previous rapid cycling. Ground-contact ankle travel remains matched to root travel; denser baked sprint keys limit interpolation drift. These are stylized authored values for this short-legged avatar, not motion capture.

Tests cover input mapping, diagonal normalization, acceleration/braking, loop closure, opposing limb phases, stance-foot drift, floor clearance, reversals and exact rest-pose restoration. Browser checks cover walking, default E/D/S/F running and Shift walking, launch event count, return to walking, exact stillness after stopping, and single jumping. Technical checks support stability; visual quality still requires review in motion.

## Floating circuit and jumping

Play starts in the kart on the circuit. Exit to explore the world on foot; the original on-foot fallback spawn remains near the slab's right-hand bridge. Guardrails block movement at road level and may be cleared by a jump. The overpass has clearance for the character and a full jump on the lower road. Its upper road is reached through the ramps, with no snapping between levels. Falling into the void returns the character to the bridge approach. Scroll out and orbit to inspect the whole layout; R resets the view.

The normal jump uses Claude’s 9.6 m/s takeoff and 27 m/s² rising gravity, with 1.42 times gravity on descent. It rises about 1.67 m in the fixed-step simulation, roughly 25% higher than the previous jump. Claude’s native ascent pose swings both arms up and tucks the legs; the falling pose opens the arms and extends the feet. A tap is queued until the next simulation step so quick Space presses are not missed. Holding Space does not repeat the jump, and airborne presses do not add extra moves. Surface support is sampled against the same triangles rendered by the road mesh. Rail collision is indexed spatially and accounts for the character's elevation.

Additional checks cover the slab/bridge seam, guardrail blocking/clearance, a complete circuit traversal including both crossing levels, held-key single jumps, landing on elevated track, unsupported falling, finite geometry and exact stillness after landing.

## Colored go-kart prototype

`src/kart.js` builds a static retro go-kart beside the bridge approach. It has cherry-red nose/side/rear panels, a dark navy seat, exposed silver chassis, four full black rubber tires and silver rims with dark hubs. The old skeletal wheel hoops have been replaced. Wheels and steering retain separate named groups for future rigging. The design uses flat material colors without textures or logos. The kart is now drivable. The avatar is seated while mounted; the wheels roll, front wheels steer and the steering wheel turns. H mounts/exits, with proximity and safe-ground checks.

## Driving foundation

`src/vehicle-controller.js` implements fixed-step arcade kart movement separately from character locomotion: acceleration/coasting, brake-before-reverse, bounded forward/reverse speed, slightly reduced speed-sensitive steering (0.39 low-speed lock), guardrail capsule collision and terrain height/pitch/bank. Base forward speed is capped at 42 m/s (previously 32), with 16 m/s² forward acceleration and speed-adjusted steering; reverse is 8 m/s. Nitro raises the temporary cap to 66 m/s, with 36 m/s² boosted acceleration for the existing two-second burst. Space is the e-brake/drift control. There are no CPU opponents or vehicle jumps.

Hold **Space + S/F** (or **Space + left/right arrow**) above 12 m/s to start a controlled drift. Full steering produces a sideways slide up to about 32 degrees. Releasing steering while holding Space keeps the slide but carries a substantially gentler curve. Countersteering directly steers the travel path in the requested direction and rapidly unwinds the stored drift; a brief correction widens the arc, a longer correction straightens it, and releasing countersteer retains that correction. Steering into the original direction tightens it again. Changes to the sideways body angle preserve the travel heading, so straightening the body cannot add an unintended turn. All steering/slip changes ease continuously; releasing Space restores grip. **E + Space** maintains acceleration only during an established drift. Outside a drift, Space overrides E/Nitro with a 48 m/s² e-brake; D retains the existing brake/reverse behavior. Coasting drifts still lose speed naturally. Braking, reversing, low speed, airborne travel and shell spins cancel drifting. Rail contact behavior is unchanged in this stage: it cancels the slide and requires releasing Space before starting another drift. Drifting adds no speed boost or mini-turbo. Actual position and body heading are already in the ghost trace, so drifted laps replay without changing stored-record formats or course identifiers.

The compact top-right lap/ghost panel also displays kart speed in **MPH**, converted from metres per second and rounded to a whole number. Reverse shows speed magnitude; on foot the kart readout is zero. The timer stays ready while E is held against the e-brake, and starts when forward acceleration is actually available.

`src/vehicle-view.js` applies the vehicle pose, wheel roll, steering angle and the seated driver pose. The chase camera follows the kart's heading, while mouse orbit temporarily overrides automatic recentering. On-foot controls and animation are restored when exiting. A parked kart blocks the walking character; safe exits are checked against road support and rails. Falling into the void respawns the occupied kart near the bridge approach.

Tests cover acceleration, reverse/braking, mirrored steering, entry/exit safety, wheel animation, asymmetric jump takeoff and a complete driven lap over the crossing. Browser checks cover approaching/mounting, steering, braking, reverse, safe dismount and returning to on-foot jumping.

## Item boxes

`src/items.js` handles 48 boxes in 16 rows around the track, including elevated sections. Driving through an available box randomly awards Nitro or a green turtle shell, with one inventory slot. A full slot is not overwritten. Boxes respawn after eight seconds. Swept pickup checks prevent fast karts skipping boxes; elevation checks prevent picking up a box through the overpass.

While driving, press either Shift key once to use the held item. Holding Shift does not auto-use a later pickup. On foot, Shift continues to mean walking. The compact control chart shows the current item.

- Nitro lasts two seconds, accelerates to a 66 m/s cap, and shows blue exhaust. Braking still works, and boosted speed eases back toward the normal cap after expiry.
- Green shells slide forward, follow the road, ricochet off guardrails and disappear after eight seconds or when leaving the road. Substeps prevent collision tunneling. A ricochet can hit the occupied kart after its initial launch grace period, slowing it into a brief spin-out.

`src/item-view.js` renders the rotating multicolor question boxes, shell models and exhaust using local procedural geometry and textures. No external image assets are required. Tests cover collection/respawn, inventory limits, separate road levels, nitro expiry/braking and shell reflection/hits/lifetime. Browser checks exercise actual box pickup and Shift activation.

Camera views: press **V** or tap the camera button in the bottom control chart to switch between the wider third-person view and a fixed-angle orthographic isometric view. Scroll/pinch adjusts zoom; **R** resets the selected view. The track entrance bridge covers the entire guardrail opening. Kart rail contacts guide velocity along the barrier with a tiny outward bias, a 4% initial speed loss and gentle sustained scrape drag. Direct hits choose a tangent so holding forward does not pin the kart.

### Backflip animation review (separate page)

Open [`backflip.html`](./backflip.html) for synchronized front/side previews using the existing avatar, normal and quarter-speed playback, pause/restart, a timeline scrubber and inspectable pose buttons. A source-data skeleton and reference/limitation notes appear below. The revised clip is shared with gameplay: its physical root arc is handled by the fixed-step controller, while the skeleton supplies the planted-foot preparation, tuck and landing. See `public/references/backflip-study.md` for the pinned SM64 sources and adaptation decisions. The original SM64 skeleton remains an inspectable reference, clearly distinguished from the authored single-turn move.

## Time trial and top-four ghosts

The start button (or **T**) places the player in the existing kart on the circuit's checkered start/finish line, facing the correct direction. **E** starts the clock on the first forward acceleration. Waiting, steering or pressing reverse before starting does not run the clock or move the kart. Existing steering, brake and item controls remain available during the trial.

Pass all **12 ordered checkpoints**, then cross the finish line forward. The next lap begins immediately when crossing the line. Leaving the course or the kart invalidates that attempt; restart with the button or T. Moving back and forth across the line, reversing around the course or skipping portions cannot set a valid lap. Progress queries account for height so the overpass and road underneath remain distinct.

The four fastest valid laps save their times and 30 Hz kart pose traces in this browser's local storage under `letsgo.top-laps.v2`, with the same versioned course identifier. Existing `letsgo.best-lap.v1` records migrate automatically; the old entry is retired only after a successful new save. Qualifying laps fill the table, sorted fastest first, and a new top-four lap replaces only the slowest entry. The original best is preserved during migration.

Up to four translucent ghosts replay together against the current timer: cyan #1, purple #2, amber #3 and green #4. Their steering, wheel rotation, road pitch/bank and exact recorded paths are retained. Ghosts cannot collide or interact with items. Toggle **Top 4 ghosts** to show/hide the group. They fade in after the clock starts. Records survive restarts and reloads in the same browser; unavailable storage still permits session records. The seated ghost geometry is baked once and shared, with only six render meshes per kart so four ghosts do not require four live skeletons.

`src/time-trial.js` owns ordered-gate validation, timing, trace sampling, interpolation and storage. `src/time-trial-view.js` owns the line/markers, compact HUD and separate ghost models. Tests cover complete laps with actual kart physics, rolling laps, top-four sorting/replacement, single-best migration, persistence/failure handling, wrong-way and shortcut rejection, overpass separation and replay interpolation.


## Stage 1: Claude avatar, walking and running

Source: `isaiasurrutia96/3D-WORLD-3`, branch `chatgpt-work`, pinned commit `b60e295cd836f830c93e9ddc28ae61e157ef2b3f`. That repository is not modified. See `src/claude/README.md` for provenance and adapter boundaries.

- `src/claude/player/PlayerModel.ts` and `Tuning.ts` are copied from that source unchanged. The model is the plain clay variant with named joint groups.
- `src/claude/player/PlayerAnimation.ts` retains the original pose equations. Its accumulated state is isolated per rig and resettable for mounting/exiting. Ground and normal first-jump inputs are enabled through the adapter. Idle is sampled at time zero to preserve stillness.
- `src/on-foot/ground-movement.js` ports the source’s normal-ground acceleration, speed-sensitive turning, reversal skid, momentum and stopping behavior. E/D/S/F runs at 8.6 units/s; Shift uses the original keyboard scaling, about 2.536 units/s.
- `src/on-foot/controller.js` connects that motor and the normal jump to the existing track support/collision API and fixed simulation. `src/on-foot/animation.js` applies the native ground/air animation. Only the standing backflip still uses the temporary legacy pose adapter; Claude’s advanced jumps, ladders, ledges, pool and obstacle course are not enabled in this stage.
- `src/vehicle-view.js` seats the imported rig. `src/ghost-kart.js` bakes that seated model into the existing shared ghost geometry. Recorded kart coordinates and storage keys are unchanged, so saved lap traces still replay.

`tests/fixtures/claude-ground-b60e295.json` contains ground-pose and motor snapshots generated from the original source, not from this adapter. `tests/stage1.test.js` compares against them and checks source proportions, input speeds, state isolation, mount/reset, retained aerial moves and traversal of both circuit levels. Browser checks cover the visible figure, run/Shift-walk, jump/backflip, kart entry/exit and trial startup.
