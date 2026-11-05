# Stage-1 source import

Repository: https://github.com/isaiasurrutia96/3D-WORLD-3
Branch: chatgpt-work
Pinned revision: b60e295cd836f830c93e9ddc28ae61e157ef2b3f

`player/PlayerModel.ts` and `player/Tuning.ts` are exact copies of their source files. `player/PlayerAnimation.ts` keeps the source animation equations, with a small adapter that stores accumulated animation state per rig in a WeakMap and exposes an explicit reset for mounting/exiting the kart. `player/Player.ts` contains only the source type contracts required by that animation module; the full source controller has not been imported.

The normal-ground branches of `Player.updateGround`, `targetSpeedFor` and `turnToward` are adapted to the existing LetsGo state/collision interface in `../on-foot/ground-movement.js`. The source input conversion is performed by the existing camera-relative E/D/S/F input layer, including the source's 0.45 keyboard walk strength.

At runtime the adapter invokes only the source ground pose with carry/climb/swim/ledge/crouch/special-jump inputs disabled. Sampling idle at time zero preserves the existing no-idle-motion preference. The native rig is used for the player, seated driver and baked ghost driver. Existing single-jump/backflip physics are retained using a temporary legacy-pose bridge until their own migration stage; no advanced Claude movement or world object is enabled yet.

Golden snapshots in `tests/fixtures/claude-ground-b60e295.json` were generated using the unmodified original `PlayerAnimation` and `Player.updateGround` methods from the pinned checkout. They verify that the ground poses and motor behavior have actually been ported, rather than replaced with another generic animation.
