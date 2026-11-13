# LetsGo

This is the shared **`isaiasurrutia96/3D-WORLD-3`** repository for the
independent movement game, racing game and island terrain preview.
The repository is consolidated; the worlds are not combined.

| Project | Source | Run locally | GitHub Pages path |
| --- | --- | --- | --- |
| Claude's movement and obstacle world | Root `src/`, `index.html` | `npm run dev` | `/3D-WORLD-3/` |
| LetsGo kart racing | `apps/letsgo-racing/` | `npm run dev:racing` | `/3D-WORLD-3/racing/` |
| Floating minigame-island terrain | `apps/letsgo-island/` | `npm run dev:island` | `/3D-WORLD-3/island/` |

Use **Node.js 24**. Install each project's pinned dependencies separately:

```bash
npm ci
npm ci --prefix apps/letsgo-racing
```

The games keep their own package files, Three.js/Vite versions, entry points,
worlds, controls, cameras and saved-game behavior. There is no shared runtime
or movement/world integration. Open the local address printed by the command
for the game being tested; racing defaults to port 5174.

`npm run build` builds only the movement world into `dist/`.
`npm run build:racing` builds only racing into `apps/letsgo-racing/dist/`.
`npm run test:racing` runs the existing racing checks.
`npm run build:all` checks the root TypeScript project and builds all three
pages into `dist/`, with racing isolated under `dist/racing/` and the island
under `dist/island/`. The Pages workflow publishes that folder. The island uses
the root library dependencies with its own scene and entry point.
Run `npm run test:island` for terrain geometry checks.
Building/loading one world does not load the others.
The [island README](apps/letsgo-island/README.md) describes its terrain-only scope.

Racing was imported unchanged from
[`isaiasurrutia96/LetsGo@029984f`](https://github.com/isaiasurrutia96/LetsGo/commit/029984f1c4d9a857c93b8a4a8105f1540dd73778),
including its Git history, assets, previews, tests and lockfile. Its own
[README](apps/letsgo-racing/README.md) documents the tracks and controls.
The original LetsGo repository and playable link remain available; no lap
recordings have been copied, deleted, or uploaded as part of this consolidation.
Racing retains its existing storage keys and ghost import/export format.

Claude and Codex should make future changes in this shared repository, in the
appropriate project directory. See [AGENTS.md](AGENTS.md) for the boundary
between the worlds. Restore point before consolidation:
`checkpoint-before-repo-consolidation-2026-11-09` at `844871f`.

The existing documentation below describes the movement-world project at the
repository root.

---

A browser-based 3D world for free exploration and platforming, built with
Three.js, TypeScript and Vite.

This repository currently holds **Milestone 1: the castle grounds** — a home
menu, a playable character with six moves, and the castle and its grounds to
move around in. Kart driving, minigames and multiplayer are planned for later
milestones and are not built yet.

## A) Running it

**1.** You need Node.js installed. Check it with:

```bash
node --version
```

**2.** Install the dependencies. You only ever need to do this once, or again
after the dependency list changes:

```bash
npm install
```

**3.** Start the game:

```bash
npm run dev
```

**4.** The terminal prints a local address, usually `http://localhost:5173`.
Open that in Firefox. Click **Start**.

To stop the game, press `Ctrl` and `C` together in the terminal.

## B) Controls

| Action | Keyboard and mouse | Gamepad |
| --- | --- | --- |
| Move | `W` `A` `S` `D` | Left stick |
| Walk instead of run | Hold `Shift` | Ease the stick |
| Camera | Mouse | Right stick |
| Jump | `Space` | A |
| Pick up, throw | `E` | X |
| Dive, swim down | `Ctrl` | B |
| Swim stroke | `Space` | A |
| Climb | Walk into a tree trunk | Walk into a tree trunk |
| Respawn | `R` | — |
| Pause | `Esc` | Start |
| Performance panel | `F3` | — |

A browser only detects a gamepad after a button is pressed on it, so press any
button once if the controller seems unresponsive.

These bindings are fixed for now. Making them configurable is a planned
feature; the input layer already maps physical keys to named actions in
`src/input/Input.ts`, so changing them is a matter of editing one table.

## C) Graphics quality

Three presets are selectable from the title screen and the pause menu, and the
choice is remembered.

**1. High** — full shadow resolution, antialiasing, bloom, and a more
reflective water surface.

**2. Medium** — the default. Shadows at half resolution, no antialiasing, no
bloom. Chosen as the default for the Intel Iris Graphics 6100 test machine.

**3. Low** — no shadows, reduced render scale, shorter view distance and less
scenery.

The performance panel on `F3` reports frame rate, draw calls and triangle
count. The target is an older laptop with integrated graphics running Firefox,
where the castle build measured **60 frames per second at Medium quality**.

## D) Project layout

```
src/
  core/      renderer, lighting, sky, camera rig, quality settings
  input/     keyboard, mouse and gamepad, unified into one analogue input
  physics/   collision octree, water volumes, climbable surfaces
  player/    character controller, model, animation, movement tuning
  world/     terrain, castle, water, props, particle effects, assembly
  ui/        loading, title and pause menus, in-game readouts
tools/
  verify.mjs headless browser check — see below
docs/
  DECISIONS.md  the authoritative record of what has been decided
```

## E) Checking a change

`tools/verify.mjs` builds the game, loads it in a real headless browser, drives
it through every movement state, and fails if anything logs an error. It also
writes screenshots to `tools/shots/`.

```bash
node tools/verify.mjs
```

It needs Playwright available in the environment and is used during
development rather than by players. The frame rate it reports comes from
software rendering and says nothing about real hardware.

## F) What is not here yet

Kart driving, the race track, minigames, multiplayer, sound, saving and
clothing unlocks are all planned for later milestones. See `docs/DECISIONS.md`
for what has been decided and what is still open.

## G) Assets

Every model, texture and effect in this project is generated in code. There
are no imported art assets, and nothing from any existing game is used.
