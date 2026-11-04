# SM64 locomotion reference

Reference repository: https://github.com/n64decomp/sm64
Pinned revision: `9921382a68bb0c865e5e45eb594d9c64db59b1af`.

The arrays in `src/animation/sm64-walk-run.json` are decoded from these public reference files:

- `assets/anims/anim_72_73.inc.c`: running, animation 0x72, 72 frames.
- `assets/anims/anim_48.inc.c`: walking, animation 0x48, 77 frames.
- `assets/anims/anim_C5.inc.c`: idle reference, animation 0xC5, 30 frames.
- `assets/anims/anim_4D_4E.inc.c`: single jump (0x4D) and landing (0x4E).
- `assets/anims/anim_56_57.inc.c`: general falling pose (0x56).
- `assets/anims/anim_0F_10.inc.c`: braking pose, animation 0x0F, one frame.
- `assets/anims/anim_BC_BD.inc.c`: turning pose, animation 0xBC, one frame.

Hex values were converted losslessly to signed 16-bit values. Indices preserve the original per-channel frame counts and offsets. Bone order comes from `actors/mario/geo.inc.c`; matrix order comes from `src/engine/math_util.c` and `src/game/rendering_graph_node.c`. The original project's CC0 dedication is preserved in `LICENSE.md`.

The retargeter converts the original X-aligned bone axes to Izzy's Y-aligned bones. Hip, knee, foot and torso poses are retargeted from the captured rotations. Grounded arm swing retains source phase but is constrained to a low sagittal arc with bent elbows to accommodate Izzy's raised shoulders and long arms. Jump/fall/landing retain the captured arm poses. Shoes receive a floor-clearance correction for Izzy's different proportions; pose transitions are blended briefly. No original character geometry, ROM, audio, or textures are included.

`src/locomotion.js` adapts the flat-ground behavior in `src/game/mario_actions_moving.c`: 30 Hz stepping, the original acceleration curve, tuned here to `1.55 - speed/43` for a quicker start, intended speed 32, yaw approach of 0x800 per tick, braking, and sharp-reversal deceleration. Walk/run animation switching uses the original 22/18 hysteresis and animation advancement uses `speed/4` per tick.

Scope differences: world distances are scaled, run speed is capped at 32 for this test, Shift+E supplies a lower intended magnitude of 14, interpolation smooths rendering, and slab edges clamp position. A single jump has been added with a fixed vertical arc, limited air steering, one press per takeoff, and no midair repeat. Braking uses eased deceleration and gradual reversal, and clip transitions blend. Slope handling, collisions with the static track, attacks, sounds and other actions are intentionally absent. This is not a full port of SM64's movement engine.
