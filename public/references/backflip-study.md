# Athletic backflip: reference and revised authoring

The main game now uses the revised one-turn athletic backflip: stand still and press Q + Space. The review page shows that same pose clip from front and side, with a stationary copy of the controller's air arc for inspection. Running, ordinary jumping, driving and the circuit remain available.

## Inspectable sources

- SM64 decompilation, revision 9921382a68bb0c865e5e45eb594d9c64db59b1af: src/game/mario_actions_airborne.c, act_backflip (line 509); src/game/mario.c, ACT_BACKFLIP (line 790). Backward velocity -16, initial vertical velocity 62; dedicated MARIO_ANIM_BACKFLIP.
- SM64 JavaScript port, revision 04c1a984117ebb8d0e7b0d5d2e3424367f69b92d: src/actors/mario/marioAnimData.js, gMarioAnimData[4]. 33 pose frames. The cyan reference skeleton uses those source channels and the body hierarchy from src/actors/mario/geo.inc.js. No original Mario mesh or textures are included.

https://github.com/n64decomp/sm64/blob/9921382a68bb0c865e5e45eb594d9c64db59b1af/src/game/mario.c#L790
https://github.com/sm64js/sm64js/blob/04c1a984117ebb8d0e7b0d5d2e3424367f69b92d/src/actors/mario/marioAnimData.js

## Why the move was reauthored

The earlier preview inherited a two-turn source rotation and looked like a pose being spun. The new move is hand-authored for the taller athlete. It keeps the soles planted through a loading crouch, swings the arms forward as both legs extend, rolls contact toward the forefeet, and leaves the ground only at the defined takeoff event. The pelvis then follows a ballistic controller arc. During flight, one backward rotation accelerates through a compact tuck and slows as the legs open. Landing compresses before returning to exact stillness.

The source animation is retained for comparison, not claimed as an exact match. Its roughly two backward turns differ from the new single turn. Joint proportions, clothing and full gameplay physics also differ. Passing checks establishes continuity/contact and controller behavior, not visual accuracy.

## Timing (seconds)

0.00–0.20: load into a crouch; feet remain planted and arms swing back.
0.20–0.32: leg extension and forward/upward arm swing; contact rolls to the forefoot.
0.32: physical takeoff event.
0.32–1.16: backward flight and one tucked rotation; open before touchdown.
1.16–1.25: absorb the landing with bent knees and controlled arm recovery.
1.25–1.46: stand back up.
1.46–1.65: neutral hold before the review repeats.

The controller and clip share timing constants. Gameplay uses the collision/support system and a backward launch; the stationary review adds the same vertical arc to the clip instead. Pose curves use continuous, shape-preserving cubic interpolation so angular velocity does not stop at every key pose. Grounded pelvis placement is derived from the skinned soles, not an arbitrary bob. The original source-data skeleton continues to display its independent two-turn reference, normalized to the review's airborne interval.
