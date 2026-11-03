# LetsGo

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
count, so a real reading can be taken on real hardware.

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
