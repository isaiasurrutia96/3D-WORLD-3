# SM64 motion study provenance

Reference: https://github.com/n64decomp/sm64

Revision: `9921382a68bb0c865e5e45eb594d9c64db59b1af`

Reviewed files:

- `src/game/mario_actions_moving.c`
- `src/game/mario.c`
- `src/game/rendering_graph_node.c`
- `actors/mario/geo.inc.c`
- `assets/anims/anim_72_73.inc.c`

`src/animation/run-study.json` contains derived normalized foot trajectories, arm swing/bend, torso twist and root-height channels from run clip 0x72. It does not contain the complete native animation or Mario's mesh. The runtime adapts these channels to the approved LetsGo body with constrained arms and foot contact solving.

Regenerate using a separate checkout of the pinned reference:

```sh
node tools/import-run-study.mjs /path/to/sm64/assets/anims/anim_72_73.inc.c
```

The reference repository's CC0 text is retained in `LICENSE.md`. It does not grant rights to third-party trademarks or assets beyond its stated scope.

## Full-rotation review

`src/animation/run-reference.json` retains native signed rotation channels for all 20 animated parts, translations, hierarchy offsets, and native shoe vertices used for sole-height measurements. The source is pinned to the same revision above. This review also checks `include/mario_animation_ids.h` (0x72 is RUNNING), `src/engine/math_util.c` (XYZ matrix order), `src/game/mario_misc.c` (torso tilt node) and `actors/mario/model.inc.c` (shoe axes and vertices).

`tools/import-run-reference.mjs` reproduces this data from `assets/anims/anim_72_73.inc.c` and `actors/mario/model.inc.c`. `src/animation/reference-run.js` reconstructs the reference hierarchy and transfers orientations to the existing avatar. Gameplay-derived torso lean rotates both the torso orientation and its translation, as the native intervening rotation node does.

The reference is a skeleton reconstruction, not a captured game video or a Mario mesh. The review interpolates subframes; original playback runs at 30 Hz. Runtime rendering effects, acceleration, turns, terrain alignment and collision responses are outside this steady, flat-ground review. Native shoe vertices can cross the nominal ground plane in this reconstruction. The old and rebuilt previews are phase-aligned for comparison, not a claim that their travel speeds match.
