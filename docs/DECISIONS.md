# LetsGo — Decision Record

The authoritative record of what has been decided for this project. Update it
whenever a material decision changes, recording the date, the previous choice,
the new choice, and the reason.

Labels used throughout: **Confirmed** means Isaias stated the choice.
**Proposed** means a practical answer awaiting review. **Deferred** means
planned for later. **Open** means the answer is still needed.

Last updated: 3 November 2026.

---

## A) The project

**1. Confirmed.** LetsGo is an interactive free-roam 3D game: explore,
complete platforming challenges, drive karts, and play minigames against NPCs
or friends. Later, in-game computers may connect to LifeSheet and other online
tools.

**2. Confirmed.** Genre: a 3D free-roam platformer with kart racing and a
collection of minigames.

**3. Confirmed.** References: Super Mario 64 for movement, exploration and
camera; Mario Kart Double Dash for driving and visual style.

**4. Confirmed.** Target feeling: enjoyment, curiosity and competitiveness.

**5. Confirmed.** Platform: desktop web browser first, tested in Firefox on
Isaias's Mac.

**6. Confirmed.** Technology: Three.js with TypeScript, built by Vite, on
Node.js. Versions in use are recorded in `package.json` and pinned by
`package-lock.json`.

**7. Confirmed.** Budget: nothing beyond the existing Claude and ChatGPT
subscriptions. Any paid asset, service, hosting or API needs its own approval.

---

## B) Milestone 1 — scope as agreed on 3 November 2026

This narrows the Game Foundation section of the original questionnaire.
Isaias set this scope explicitly, and it supersedes the earlier foundation
plan for this milestone only.

**1. Confirmed, in scope.** A home menu screen.

**2. Confirmed, in scope.** Six moves: walking, running, the normal single
jump, swimming, climbing and carrying.

**3. Confirmed, in scope.** The castle and its grounds, as the world to move
around in.

**4. Confirmed, in scope.** Good graphics — explicitly asked for, rather than
a plain prototype look.

**5. Confirmed, out of scope for now.** Kart driving and the race track, moved
to a later milestone.

**6. Confirmed, out of scope for now.** All minigames, moved to later
milestones.

**7. Confirmed, out of scope for now.** Multiplayer. Still part of the
intended game, but not being built yet.

### What changed from the original foundation plan

| Item | Original plan | Milestone 1 |
| --- | --- | --- |
| Kart, race, NPC opponent | In the foundation | Moved later |
| Results and retry | In the foundation | Moved later |
| Swimming, climbing, carrying | Deferred | Brought forward |
| Multiplayer feasibility test | In the foundation | Moved later |

Reason: Isaias wanted the time spent on how movement and the world actually
feel, before any content is layered on top.

---

## C) Decisions made while building Milestone 1

These were judgement calls taken during the build. Each can be changed.

**1.** The character is an original model in the Super Mario 64 visual style —
not Nintendo's assets. Isaias said he is not selling the game and would accept
copied assets; Claude builds original models regardless. This matches the
original questionnaire, which already confirmed "original models and
environments". Changing the outfit colours, proportions or the castle is
trivial from here.

**2.** Everything visual is generated in code. There are no model, texture or
sound files in the repository, so there is no licensing to track yet.

**3.** The castle grounds include a moat, trees and a liftable crate, because
swimming needs water, climbing needs something to climb, and carrying needs
something to carry. Without them, three of the six moves could not be tested.

**4.** "Normal Mario jump" is read as the single jump only. No double jump,
triple jump, wall kick, long jump or ground pound — those belong to the full
move set, which is deferred.

**5.** Three graphics presets exist (high, medium, low) and default to medium,
because the frame rate on the Intel Iris Graphics 6100 cannot be measured from
a cloud machine. The performance panel on `F3` exists so a real reading can be
taken and reported.

**6.** The title screen is the live world with the camera orbiting the castle,
rather than a separate menu scene, so there is only one world to maintain.

**7.** There is no sound. It was not requested for this milestone, and dead
volume sliders would have been misleading, so the sound settings are not shown
yet.

---

## D) Still open

**1. Open.** Whether the game runs acceptably on the actual Mac. Nothing in
this repository has been run on real hardware yet.

**2. Open.** macOS version, Firefox version and exact RAM on the test machine.

**3. Open.** Whether the movement actually feels right. Every tuning number
lives in `src/player/Tuning.ts` and is meant to be adjusted after play.

**4. Open.** Weekly hours, working days, and any deadline for a first playable
version.

**5. Open.** Multiplayer hosting and its cost. Six-player browser multiplayer
needs a server; free tiers may cover testing, but this has not been checked.

**6. Open.** Price, commercial model and wider audience.

**7. Open.** Final character appearance, exact key bindings and controller
mappings, music and sound sources, and named testers.

---

## E) Deferred features

LifeSheet and productivity services, the floor plan editor, company events,
the full tournament system, extensive clothing, saving and progression, the
full carnival, and the complete Super Mario 64 move set.

---

## F) Change log

**3 November 2026.** Milestone 1 scope set as in section B: menu, six moves,
castle grounds, good graphics. Driving and minigames moved to later
milestones; multiplayer taken out of scope for now. Reason: Isaias asked for
the time to go into movement and world feel first.
