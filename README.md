# LetsGo — locomotion foundation

Claude’s plain jointed avatar, walking, running and normal jump are connected to the existing slab and four floating racing circuits. Kart driving uses grip steering; drifting has been removed. Items, lap timing, saved top-four records and ghost playback retain their existing implementation.

## Controls

- The home screen contains the LetsGo logo, **Play**, and **Settings** underneath. Play seats you in the kart on the central slab, ready to explore any circuit. **Home** returns to that screen, clears held input and stops the render/simulation loop. Saved top-four laps are retained.
- Drive or walk near a marked entrance where its access bridge meets the slab. The nearby **Start lap** prompt names that circuit; click/tap it or press **Enter** to spawn seated at its start/finish line. The clock stays at zero until **E / Gas** first accelerates. The HUD start button or **T** restarts the currently selected circuit.

- E: run forward; D: run backward; S: run left; F: run right, relative to the camera.
- Running is the default. Hold either Shift key with E, D, S or F to walk. Diagonal movement is normalized; Shift alone does not move.
- Drag to orbit, scroll/pinch to zoom, L to lock the mouse, Esc to release, R to reset the view.
- The fixed overhead minimap shows all circuits during exploration and focuses the selected circuit during a lap. Higher crossing decks draw above lower roads. The blue arrow follows your position and facing direction in the kart or on foot; the white line marks start/finish. Colored dots replay the saved top-four ghosts at the same positions as the 3D ghost karts and follow the existing **Top 4 ghosts** toggle. The slab is not drawn on the map; an off-circuit player remains indicated at the map edge. Its phone layout leaves driving and on-foot touch controls clear.
- H: enter the kart when nearby; H exits when stopped and a safe spot is available.
- While driving: E accelerates, D or Down Arrow brakes/reverses, S/F or Left/Right Arrows steer, and a fresh Shift press uses the held item. Steering uses grip with no drift mode. Space has no kart action; it remains Jump on foot. The brake overrides gas and Nitro. The mouse changes the view without steering.
- Q + Space while standing still: a standing backflip, with a grounded load/push-off, backward launch, single tucked turn and landing absorption. Holding the chord does not repeat it.
- Space on foot: single jump from standing, walking or sprinting. Holding Space does not auto-repeat; release and press again for another jump.
- Walking, running and normal jumping use Claude’s native rig and pose animation. Idle remains still.

## Phone controls

Touch devices use a layout based on the mobile racing reference, in portrait or landscape:

- The 84 px bottom-left **Left / Right** buttons steer the kart. These and the larger **Gas** pad sit farther inward and higher for comfortable thumb reach, including in landscape. Narrow portrait screens stagger Gas above the steering buttons to keep their hit areas separate. Each finger releases independently; pressing both steering buttons gives neutral steering.
- Hold the bottom-right **Gas** button to accelerate. Moving that finger does not activate another driving mode; lift to release Gas. The kart waits for Gas before starting the lap.
- The separate **↓ Brake** button, or physical **D / Down Arrow**, brakes and reverses while held; it takes priority over Gas and Nitro. Normal speed is capped at 120 MPH, Nitro at 180 MPH. Quick steering taps are softer; sustained steering has slightly more lock.
- During gameplay the full game surface prevents native pinch/double-tap webpage zoom, with Safari gesture-event guards. Intentional camera gestures on the canvas remain available; browser zoom on the home screen is unaffected.
- The upper-right item button shows **Boost** after collecting a Nitro box. One tap uses it, including while other fingers hold steering and Gas. Holding the button cannot automatically consume a later pickup. Shells and their spin-out effect have been removed.
- The camera button cycles **TPV → FPV → ISO** while driving. FPV shows the hands steering the wheel; TPV looks slightly higher and ISO shows a wider area. The **Laps & ghosts** disclosure keeps times, replay toggle and restart accessible without covering the driving controls; it opens beside the HUD on short landscape screens.
- **Exit** brakes to a stop before using the existing safe kart exit. On foot, the left pad becomes **Move** (small movements walk, larger movements run), the right button becomes **Jump**, and the secondary button becomes a standing **Flip**. **Kart** re-enters when nearby.
- Returning Home, cancelling a touch, changing orientation, losing focus or hiding the page clears held fingers. Background/home simulation does not advance. Play returns to the central slab without deleting records.

`src/mobile-input.js` owns finger state and queued taps; `src/mobile-controls.js` binds Pointer Events with pointer capture and document-level release/cancel handling, including release outside a control when capture fails. It also recovers after all touches end and ignores stale capture-loss notifications. The touch input merges into the existing keyboard/vehicle interfaces. `tests/mobile-input.test.js` covers stick limits, button/finger ownership, cancellation, queued taps, input precedence and combined steering/Gas. `tests/jump-driving.test.js` checks the jump, independent brakes and inert Space input while driving.

### Customize Layout

Open **Settings → Customize Layout** from Home. The game stays paused while the actual HUD and driving buttons appear over a fine 4 px grid. Drag the lap panel, minimap, Left, Right, Gas, Brake/Reverse or Boost/Item individually; Home/View/Exit moves as one navigation group. Select an item and use arrow keys for 4 px adjustments. Moving an item does not activate its game action. Positions stay within the screen and reported device safe areas. Boost uses the existing layout storage version, so adding its saved position preserves all previously customized controls.

**Save Changes** stores the layout in this browser. Portrait and landscape layouts are separate; rotate while editing to adjust either one. Saved coordinates adapt to screen size and widget dimensions, with grid snapping and edge clamping. **Reset** restores defaults for the current orientation in the draft; **Cancel** leaves saved settings intact. Storage errors keep the editor open rather than discarding changes. The separate `letsgo.control-layout.v1` storage key does not modify lap/ghost records. On-foot Jump/Flip use the saved positions of their shared Gas/Brake controls.

`src/layout-editor.js` handles the paused editor, grouped navigation, pointer capture and applying offsets without moving neighboring HUD items. `src/layout-state.js` validates persisted positions, keeps orientation profiles separate and performs grid/safe-area bounds calculations. The editor shows touch controls on a laptop for editing; normal desktop play keeps them hidden.

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

Play starts in the kart on the central slab. Choose a lap at an entrance or exit to explore on foot; the original on-foot fallback spawn remains near the slab's right-hand bridge. Guardrails block movement at road level and may be cleared by a jump. The overpass has clearance for the character and a full jump on the lower road. Its upper road is reached through the ramps, with no snapping between levels. Falling into the void returns the character to the bridge approach. Scroll out and orbit to inspect the whole layout; R resets the view.

The normal jump uses Claude’s 9.6 m/s takeoff and 27 m/s² rising gravity, with 1.42 times gravity on descent. It rises about 1.67 m in the fixed-step simulation, roughly 25% higher than the previous jump. Claude’s native ascent pose swings both arms up and tucks the legs; the falling pose opens the arms and extends the feet. A tap is queued until the next simulation step so quick Space presses are not missed. Holding Space does not repeat the jump, and airborne presses do not add extra moves. Surface support is sampled against the same triangles rendered by the road mesh. Rail collision is indexed spatially and accounts for the character's elevation.

Additional checks cover the slab/bridge seam, guardrail blocking/clearance, a complete circuit traversal including both crossing levels, held-key single jumps, landing on elevated track, unsupported falling, finite geometry and exact stillness after landing.

## Skyline Circuit and entrance starts

The second circuit is based on the user-approved straight slot-car-style [reference image](docs/skyline-reference.png), placed west of the slab, opposite the Original Circuit. It retains the charcoal road, red/white curbs, silver double rails and floating appearance without support pillars. The broad outer sweep, central U, diagonal bridges and lower loop form one closed route; this is an adaptation of the image rather than a surveyed replica.

`src/skyline-track.js` defines the ordered route and west-side access bridge. `src/track-builder.js` uses one closed set of 1,800 samples for road geometry, support triangles and rails, with exactly matching seam vertices. Crossing decks occupy separate levels; a sampled centerline check finds a minimum 12.16 m separation and a maximum grade of about 19.4%. Tests also drive an actual kart through the complete loop, with all 12 ordered checkpoints, without losing road support. The original `src/track.js` geometry is unchanged.

`src/courses.js` registers the circuit names, start lines, entrances and separate storage keys. `src/race-course.js` supplies per-course gates and height-aware projection. `src/lap-entrances.js` builds the entrance markers and checks grounded proximity within 17 m; `src/main.js` handles the prompt, course selection and mounting. Dismissing a prompt suppresses it until you leave that entrance’s area. Starting a lap grants the existing starter Nitro; exploration on the slab does not start a timer.

`tests/second-track.test.js` covers loop closure, crossing clearance, access-bridge support and rail openings, prompt proximity, isolated ghost storage/imports and a full driven lap. Restore point before this change: tag `checkpoint-before-second-circuit-2026-11-08`, commit `80b265f`.

## Suzuka Circuit

A third circuit connects to the north edge of the slab, opposite its open south side. Approach the **Suzuka Circuit** marker near the north edge and use **Start lap / Enter**. Its start line, 12 checkpoints, Nitro boxes, focused minimap and top-four ghosts use the existing racing systems. Times and traces save independently under `letsgo.suzuka.top-laps.v1`; neither existing course identifier nor either older storage key changes.

The route comes from the same [Suzuka SVG](docs/references/suzuka.svg) used in the map comparison, pinned to [RaceTracksAPI commit e9ec550b](https://github.com/LigasAVBrasil/RaceTracksAPI/blob/e9ec550b1d641f8183d0ee9223bd15abed3fbdfa/images/track_8.1.svg). `scripts/import-suzuka.mjs` reduces the published 3,585 route vertices to 300 control points with a 0.3 m simplification tolerance and generates `src/data/suzuka-layout.js`. Run `node scripts/import-suzuka.mjs` to reproduce that file offline.

`src/suzuka-track.js` positions the route north of the slab and supplies 2,400 closed road samples. The imported route is about 5.758 km in-game; it is a layout adaptation rather than a surveyed recreation of Suzuka’s terrain. The back straight passes 12 m above the lower road at the single figure-eight crossing, joined by gentle slopes. All other road stays flat. It uses the same 26 m asphalt width, red/white curbs and silver rails as the existing circuits, with no supporting pillars. Additional jump ramps, banking and airborne handling are deferred; the vehicle controller is unchanged.

`src/track-builder.js` supports a north/south access bridge in addition to the existing east/west bridges. Tests compare the route to the independent source SVG, check ribbon closure and unfolded edges, sample road and bridge support, verify both crossover levels and isolated ghost storage, and complete a lap with the actual kart physics. Restore point: `checkpoint-before-suzuka-2026-11-09`, commit `5ce2395`.

## Three-Level Circuit: Spa, Zandvoort and Interlagos

The fourth entrance is on the slab’s **south side**, at **Three-Level Circuit**. Start there with **Enter / Start lap**. One lap follows Spa on the bottom, climbs to Zandvoort in the middle, climbs to Interlagos at the top, then follows the outside descent back to Spa. There is one start/finish line and one ordered set of 12 checkpoints for the entire combined lap. The former closure of each source circuit is removed so there are no optional forks between independently closed loops.

`src/three-level-track.js` builds one continuous closed road ribbon from the three imported outlines and three smooth connectors. The main decks sit at 0, 32 and 64 m. Zandvoort and Interlagos are scaled slightly to accommodate the existing 26 m road width, with small offsets that keep the three outlines stacked. The combined adaptation is approximately 31.3 km including its connecting roads. Maximum connector grade is about 8.7%; projected crossings have at least 9 m of centerline separation, and nearby full-width road corridors remain more than 6 m apart vertically. It retains the existing charcoal pavement, red/white curbs and silver rails without structural support pillars. The access bridge joins the south slab edge to the bottom road.

The sources are [Spa](docs/references/spa.svg), [Zandvoort](docs/references/zandvoort.svg), and [Interlagos](docs/references/interlagos.svg), from the same pinned RaceTracksAPI map collection used above. `node scripts/import-three-level.mjs` regenerates `src/data/three-level-layout.js` offline. These are layout adaptations, with authored deck elevations and connections rather than replicas of the facilities’ terrain.

Lap times and ghosts use `letsgo.three-level.top-laps.v1`, isolated from all three existing courses. Item boxes, cameras, controls, avatar and driving physics use the existing systems. The minimap draws height layers through the new top deck so upper roads remain above lower roads. Tests compare all three deck outlines to their source maps, verify the open ports, closed ribbon and full-width clearances, traverse the access bridge, preserve older ghost records and drive a complete combined lap with actual kart physics.

Restore checkpoint: `checkpoint-before-three-level-circuit-2026-11-09`, commit `cf2e6f2`.

## Colored go-kart prototype

`src/kart.js` builds a static retro go-kart beside the bridge approach. It has cherry-red nose/side/rear panels, a dark navy seat, exposed silver chassis, four full black rubber tires and silver rims with dark hubs. The old skeletal wheel hoops have been replaced. Wheels and steering retain separate named groups for future rigging. The design uses flat material colors without textures or logos. The kart is now drivable. The avatar is seated while mounted; the wheels roll, front wheels steer and the steering wheel turns. H mounts/exits, with proximity and safe-ground checks.

## Driving foundation

`src/vehicle-controller.js` implements fixed-step arcade kart movement separately from character locomotion: acceleration/coasting, brake-before-reverse, bounded forward/reverse speed, speed-sensitive steering, guardrail capsule collision and terrain height/pitch/bank. Base forward speed is capped at 53.6448 m/s (120 MPH), with 24 m/s² acceleration (up from 16); reverse is 8 m/s. Nitro raises the temporary cap to 80.4672 m/s (180 MPH), with 48 m/s² acceleration (up from 36) for the existing two-second burst. From rest, those caps take about 2.24 seconds normally and 1.68 seconds under Nitro on a straight clear road. Steering lock is 0.415 radians, with the existing build/release rates of 6.5/14 per second. A same-direction steering hold above 55% input, while grounded and moving forward above 2 m/s without braking, adds up to 20% steering lock: the first 0.5 seconds preserve the existing tap response, then a smooth 0.8-second ramp adds lock. Releasing, countersteering, braking or leaving the ground resets the hold timer; the actual wheel continues smoothing. The timing and gain are exported tuning constants. D or Down Arrow brakes/reverses; Space has no kart action. There are no CPU opponents or vehicle jumps.

The kart follows its facing direction with speed-sensitive grip steering and smooth wheel input. There is no player-activated drift state, gesture or key binding. Only collisions introduce brief lateral velocity and a damped angular response. Saved replay fields and course identifiers are unchanged, so existing lap records are preserved. Time-trial speed validation accommodates the new legal boosted cap.

`src/vehicle-contact.js` substeps capsule motion in increments of at most 0.22 m and resolves rail contact without assigning a new heading. Fresh impacts rebound at 7.5% of normal approach speed, capped at 1.5 m/s; resting contact has zero restitution. A short recovery damps the rebound before forward drive resumes, and continued contact suppresses repeated bounces. Load-dependent friction reduces tangential momentum more in steeper hits. Contact-point impulses supply a small angular response, damped over time; tiny sustained drive forces do not keep rotating the chassis. Steering remains available when pushing against a rail. Safe entry/exit uses total planar speed, including rebound motion.

The compact top-right lap/ghost panel also displays kart speed in **MPH**, converted from metres per second and rounded to a whole number. Reverse shows speed magnitude; on foot the kart readout is zero. The timer starts when E or Gas supplies forward input.

`src/vehicle-view.js` applies the vehicle pose, wheel roll, steering angle and the seated driver pose. Its front tires use inner/outer steering angles calculated from the controller's 2.03 m wheelbase and the model's 2.08 m front axle width; both tires turn around the same point. Roll remains independent on the axle, rear tires do not steer, and the steering-wheel/hand connection remains intact. This does not alter handling. `src/driver-view.js` solves the existing shoulder/elbow joints to two grips on the rotating wheel without changing avatar proportions. FPV hides the local head and torso surfaces that obstruct the eye, restoring their previous visibility when leaving that view. The chase camera follows the kart's heading with its previous position and follow rate; only its rendered pitch is raised by 2°. Mouse orbit temporarily overrides automatic recentering. On-foot controls and animation are restored when exiting. A parked kart blocks the walking character; safe exits are checked against road support and rails. Falling into the void respawns the occupied kart on the central slab and invalidates the attempt.

Tests cover acceleration, reverse/braking, mirrored steering, entry/exit safety, wheel animation, asymmetric jump takeoff and a complete driven lap over the crossing. Browser checks cover approaching/mounting, steering, braking, reverse, safe dismount and returning to on-foot jumping.

## Item boxes

`src/items.js` handles 48 boxes in 16 rows around each circuit, including elevated sections. The original circuit retains its previous box positions. Driving through an available box awards Nitro, with one inventory slot. A full slot is not overwritten. Boxes respawn after eight seconds. Swept pickup checks prevent fast karts skipping boxes; elevation checks prevent picking up a box through the overpass. Shell pickup, launching, collision, rendering and the resulting spin-out are removed.

While driving, press either Shift key once to use the held item. Holding Shift does not auto-use a later pickup. Each fresh time-trial attempt (entrance start or restart) begins with one Nitro in the normal item slot; rolling over the finish line does not grant another. The existing mobile item button also uses it. Activating this Nitro while waiting does not start the clock or consume boost time; E/Gas starts both the simulation and the lap. On foot, Shift continues to mean walking. The compact control chart shows the current item.

- Nitro lasts two seconds, accelerates toward a 180 MPH cap, and shows blue exhaust. The cap is reached once sufficient speed has built; it does not instantly set speed. Braking still works, and boosted speed eases back toward the normal 120 MPH cap after expiry.

`src/item-view.js` renders the rotating multicolor question boxes and exhaust using local procedural geometry and textures. No external image assets are required. Tests cover Nitro-only collection/respawn, inventory limits, separate road levels, expiry/braking, and rejection of obsolete held items. Browser checks exercise actual box pickup and Shift activation.

Camera views: press **V** or tap the camera button to cycle **TPV → FPV → ISO** while driving; on foot, it switches between TPV and ISO. FPV is anchored to the kart at the driver's eye, with visible hands on the actual steering wheel. Locked mouse movement looks around without steering; **R** resets that look. TPV keeps the restored chase behavior and looks 2° higher. ISO retains its fixed angle and expands the default vertical span from 36 m to 42 m, showing more track ahead and behind. Scroll/pinch adjusts TPV/ISO zoom; **R** resets the selected view. The track entrance bridge covers the entire guardrail opening. Kart contacts use the damped rebound and scrape response described above; neither direct nor oblique hits choose a forced tangent heading.

### Backflip animation review (separate page)

Open [`backflip.html`](./backflip.html) for synchronized front/side previews using the existing avatar, normal and quarter-speed playback, pause/restart, a timeline scrubber and inspectable pose buttons. A source-data skeleton and reference/limitation notes appear below. The revised clip is shared with gameplay: its physical root arc is handled by the fixed-step controller, while the skeleton supplies the planted-foot preparation, tuck and landing. See `public/references/backflip-study.md` for the pinned SM64 sources and adaptation decisions. The original SM64 skeleton remains an inspectable reference, clearly distinguished from the authored single-turn move.

## Time trial and top-four ghosts

Each entrance's **Start lap** prompt selects its circuit and places the player in the existing kart on that circuit’s checkered start/finish line, facing the correct direction. The HUD start button or **T** restarts the selected circuit. **E** starts the clock on the first forward acceleration. Waiting, steering or pressing reverse before starting does not run the clock or move the kart. Existing steering, brake and item controls remain available during the trial.

Pass all **12 ordered checkpoints**, then cross the finish line forward. The next lap begins immediately when crossing the line. Leaving the course or the kart invalidates that attempt; restart with the button or T. Moving back and forth across the line, reversing around the course or skipping portions cannot set a valid lap. Progress queries account for height so the overpass and road underneath remain distinct.

Each circuit has its own four fastest valid laps and 30 Hz kart pose traces. The Original Circuit keeps the exact `letsgo.top-laps.v2` storage key and course identifier; Skyline uses `letsgo.skyline.top-laps.v1`, Suzuka uses `letsgo.suzuka.top-laps.v1`, and the combined Three-Level Circuit uses `letsgo.three-level.top-laps.v1`. Switching circuits does not overwrite the other circuit’s records. Imports must match the selected circuit. Existing `letsgo.best-lap.v1` records migrate automatically; the old entry is retired only after a successful new save. Qualifying laps fill the table, sorted fastest first, and a new top-four lap replaces only the slowest entry. The original best is preserved during migration.

Ghosts are local to the browser/device, so switching between Firefox, a phone browser or an in-app browser does not transfer them automatically. Use **Export ghosts** under **Laps & ghosts** in the original browser, transfer the downloaded JSON file, then use **Import ghosts** in the destination browser. The file contains the original times and full pose traces, so older-speed ghosts replay exactly as recorded. Import validates the course and recordings, merges the fastest four without duplicating laps or replacing faster local records, and retains the existing storage format and key. Keep the export to retain older comparison laps even after newer laps replace them in the top four. No example/test laps are installed as personal records.

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

## Wall-contact review

Open [the wall-contact preview](wall-contact-preview.html) to compare head-on and shallow-angle impacts using the current kart and avatar. Replay, pause, slow playback and timeline seeking are available. A [short MP4](public/previews/wall-contact.mp4) is included.

This earlier zero-restitution study remains isolated in `src/preview/wall-contact.js`. The live track now uses the separately tuned slight-rebound response in `src/vehicle-contact.js`; the old preview is not an exact demonstration of the current live physics. Neither includes damage simulation.

Next requested tuning, after reviewing wall contact: **increase kart speed and improve handling**. See [TODO.md](TODO.md).
