# Backflip review: reference and adaptation

This page is isolated from the game. No controller, gameplay camera, world, avatar geometry, gait, or gameplay jump file is changed.

## Inspectable sources

- SM64 decompilation, revision 9921382a68bb0c865e5e45eb594d9c64db59b1af: src/game/mario_actions_airborne.c, act_backflip (line 509); src/game/mario.c, ACT_BACKFLIP (line 790). Backward velocity -16, initial vertical velocity 62; dedicated MARIO_ANIM_BACKFLIP.
- SM64 JavaScript port, revision 04c1a984117ebb8d0e7b0d5d2e3424367f69b92d: src/actors/mario/marioAnimData.js, gMarioAnimData[4]. 33 pose frames. Joint channels extracted to references/sm64-backflip.json for inspection, not the entire animation library.
- Same port, src/actors/mario/geo.inc.js: mario_geo_body supplies the source skeleton offsets and hierarchy for the cyan line reference. No original Mario mesh or textures are included.

https://github.com/n64decomp/sm64/blob/9921382a68bb0c865e5e45eb594d9c64db59b1af/src/game/mario.c#L790
https://github.com/sm64js/sm64js/blob/04c1a984117ebb8d0e7b0d5d2e3424367f69b92d/src/actors/mario/marioAnimData.js

## Observations before authoring

The source body channel must be unwrapped: it moves from about +68 degrees to -649 degrees, approximately two backward turns. A shortest-path quaternion between the endpoints would lose those turns. The knees progressively fold from about 45 degrees to over 110 degrees. The source's arms sweep over a large range; copying its local Euler angles into our different joint axes would not reproduce the same pose.

## Preview timing (seconds)

0.00–0.10: exact neutral hold, no idle bob.
0.10–0.26: authored crouch, arms move back.
0.26–0.40: extend knees, sweep arms up, push off.
0.40–1.50: source body rotation and sagittal leg timing adapted to the current avatar, with extra hip/knee folding for the longer limbs; stationary preview air arc, with final extension blended for contact.
1.50–1.60: authored landing compression.
1.60–1.85: authored recovery to neutral.
1.85–2.25: hold neutral before replay.

## Limits and review criteria

This is a source-data reference and an adapted keyframed study, not a recorded side-by-side gameplay capture. Original-game camera, mesh proportions, floor movement and full physics are not reproduced. The cyan reference displays source bone data using the stated hierarchy; the preview air arc is added to make the airborne poses readable. Preparation, arm sweep, landing and the stationary arc are authored, not extracted from footage. The original stationary backflip has backward travel; this review stays centered as requested. Both normal and quarter-speed playback use the same clip. Scrub to inspect the soles, tuck, hand/head clearance and landing continuity. Passing tests cannot establish visual accuracy. Gameplay integration is deliberately deferred for review.
