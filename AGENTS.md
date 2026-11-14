# Shared repository, independent worlds

The user explicitly requested repository consolidation **without combining
the worlds**. The projects belong in this repository, with separate runtimes.

- The repository root (`src/`, `index.html`, `vite.config.ts`) is Claude's
  movement and obstacle world. Preserve its avatar, movements and world.
- `apps/letsgo-racing/` is the complete LetsGo racing game. Its entry point,
  cameras, kart physics, tracks, UI, items, lap timing and ghosts stay separate.
- `apps/letsgo-island/` is the separate floating minigame-island terrain preview.
  It uses the root library dependencies but has its own entry point, scene and
  orbit camera at `/island/`; do not import runtime code from the other games.
  The user approved the block-island reference with an expanded flat lawn and
  larger rear terraces. Current scope is modular block terrain and scenery,
  with continuous solid cell volumes, efficient exposed-face batches and a
  Canvas 2D fallback for older laptops. The latest request restores the small
  turquoise pool and waterfall from the reference. Low/Medium/High graphics
  change rounding detail, lighting, shadows and resolution, never block layout.
  The open lawn replaces the earlier decorative golf and dirt loop.
  The latest refinement treats the two supplied reference images as one
  canonical island: explicit footprint/terrace/feature plans are in
  `apps/letsgo-island/src/reference-layout.js`. Keep its five trees, five
  rock clusters, four shrubs and clear central lawn. Angled and Overhead
  are camera presets for the same cells; do not rearrange objects per view.
  Do not use randomness to choose scenery placements or infer literal
  block-for-block accuracy from passing geometry tests.
  The owner has now approved adding the existing clay avatar and movement
  to this island. Reuse only the pure Player/Input/model/animation/collision
  modules from root, without importing its startup, world or HUD. The island
  remains its own scene and URL. Keep the approved terrain unchanged; the
  checkpoint is `checkpoint-island-approved-before-avatar-2026-11-13`.
  Keep Explore, Angled and Overhead views, keyboard/touch controls, Low graphics
  and the no-WebGL avatar projection working. No minigames or new arena yet.
  The owner now requests one existing floating circuit and kart connected by
  a bridge. `track-link.js` reuses Original Circuit geometry with a fitted
  horizontal footprint and full original vertical clearance; `island-kart.js`
  reuses the existing vehicle model, physics and wheel animation. No racing
  startup, slab, items, NPCs, timing or ghost storage is brought into this app.
  Preserve the standalone game and saved records. The touch stick now spawns
  at each initial contact anywhere on the left half; menus stay above its
  touch zone. Cancel, blur and page-hide must always release held controls.
- Scope changes to the requested project. Do not connect scenes, share player
  controllers, move obstacles/tracks between games, or replace one game's
  startup code with the other unless the user explicitly requests that work.
- Keep the two package manifests and lockfiles independent. In particular,
  do not flatten or upgrade their different Three.js/Vite versions as part of
  routine work. Node.js 24 runs all projects.
- Root commands are `npm run dev`, `npm run build`, `npm run typecheck`.
  Racing commands are `npm run dev:racing`, `npm run build:racing`,
  `npm run preview:racing`, and `npm run test:racing`.
- Install with `npm ci` and `npm ci --prefix apps/letsgo-racing`.
  `npm run build:all` builds the movement site at `dist/` and racing at
  `dist/racing/`, plus the island at `dist/island/`, for one Pages deployment
  with three separate URLs. Island commands are `npm run dev:island`,
  `npm run build:island` and `npm run test:island`.
- Preserve racing course IDs, storage keys and ghost format. The user is
  recording laps in Firefox. Preserve those browser records; backups and
  cross-browser syncing remain separate. The user approved the uploaded
  Original Circuit exports as references for the first NPC practice driver.
  A derived line/pace profile may be bundled for that driver; raw exports and
  personal leaderboard tables must not be bundled or seeded into storage.
- Start from current `main` and review concurrent changes before pushing.
  Keep the original LetsGo site available; do not delete or redirect it as
  part of this consolidation.
- The user's latest shield-testing instruction restores the full mystery-box
  pool in free driving/NPC racing: Nitro, shell, banana, torpedo and shield,
  equally likely. Keep `src/item-test-mode.js` set to null unless explicitly
  asked for a single-item test again. Scored Time Trials retain their separate
  Nitro-only rules and ghost format. Keep the controlled shield test area
  available as an optional tool rather than forcing Play into it.
- The Original Circuit NPC entry now runs three laps with three opponents. Race
  scoring is independent of saved Time Trials. NPC shells use an equal direct/
  near-miss aim choice and real chassis steering; fired shells never home.
- World and NPC race starts/restarts have no held item, active shield or boost.
  NPC racers also start empty and collect from boxes. Keep scored Time Trials
  with their existing starter Nitro and the shield test area with its test shield.

The import commit retains both Git histories. LetsGo's old provenance and
project notes inside its folder describe its original development history;
new work should use this repository as the shared source.

- **13 November 2026 — racing is being brought into the island world.** The
  user has explicitly asked for the four circuits and the kart to be part of
  the root island world, so the rule above against connecting the two games
  is lifted for that work only. It is being done by reuse: `src/racing/`
  imports the racing app's own track, vehicle and course code rather than
  copying it, and the root build deduplicates `three` so one copy serves
  both. The racing app still builds and tests on its own. The only change to
  it so far is that `apps/letsgo-racing/src/world.js` now exports the
  helpers (`createRoadSurface`, `createRailResolver`, `trackRoadSurface`,
  `resolveTrackRails`, `accessBridges`) that the island uses; its behaviour
  is unchanged and its tests pass. Review `src/racing/` before changing those.

- **13 November 2026 — the root game's world is now a block island.** The
  owner asked for a small block island built to a reference picture, at the
  picture's scale, in the root game (`src/world/VoxelIsland.ts`), as a
  separate build from apps/letsgo-island. The old root island and the racing
  integration (`src/racing/`) are kept in the code but no longer built into
  the scene; `tools/racing-routes.ts` is not run by `tools/verify.mjs` while
  they are out.

- **14 November 2026 — one circuit beside the block island.** At the owner's
  request the Original Circuit floats east of the root block island, joined
  to it by a plank bridge built in `src/world/VoxelIsland.ts`. It is placed
  by `src/racing/SkyCircuit.ts`, which imports the racing app's own
  `createTrack()` and only moves it; the racing app is unchanged. The kart
  is not yet in the root scene.
