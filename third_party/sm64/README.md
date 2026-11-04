# SM64 skeleton and animation reference

Source: https://github.com/n64decomp/sm64
Revision: `9921382a68bb0c865e5e45eb594d9c64db59b1af`.
The reference project's CC0 dedication is preserved in `LICENSE.md`.

`src/animation/sm64.json` contains losslessly decoded signed 16-bit values and original channel indices from:

- `assets/anims/anim_72_73.inc.c`: running, 0x72, 72 frames.
- `assets/anims/anim_48.inc.c`: walking, 0x48, 77 frames.
- `assets/anims/anim_C5.inc.c`: idle reference, 0xC5.
- `assets/anims/anim_BC_BD.inc.c`: turning pose, 0xBC.
- `assets/anims/anim_0F_10.inc.c`: braking pose, 0x0F.
- `assets/anims/anim_4D_4E.inc.c`: single jump and landing, 0x4D/0x4E.
- `assets/anims/anim_56_57.inc.c`: falling pose, 0x56.

Joint traversal and translations match `actors/mario/geo.inc.c`, specifically `mario_geo_body` and its hand branches. `src/engine/math_util.c` and `src/game/rendering_graph_node.c` define the local rotation convention, represented here with Three.js ZYX Euler composition.

Animation channels drive the original X-aligned skeleton directly. No original character mesh, textures, audio or ROM is bundled. The plain gray geometry is custom, and the global scale and constant floor alignment adapt that geometry to this scene without altering local animation rotations.

The separate controller is an adapted flat-ground subset of `src/game/mario_actions_moving.c`, with 30 Hz stepping, speed-dependent animation advancement and 22/18 run/walk switching. Startup and braking are tuned, Shift supplies a walking magnitude, the jump uses an independent arc, and slab bounds stop the character. This is not a full port of the original movement engine.
