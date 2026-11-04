# LetsGo — Decision Record

The authoritative record of what has been decided for this project. Update it
whenever a material decision changes, recording the date, the previous choice,
the new choice, and the reason.

Labels used throughout: **Confirmed** means the project owner stated the
choice. **Proposed** means a practical answer awaiting review. **Deferred**
means planned for later. **Open** means the answer is still needed.

Last updated: 4 November 2026 — crouch, long jump, backflip, wall kick, braking skid.

---

## A) The project

**1. Confirmed.** LetsGo is an interactive free-roam 3D game: explore,
complete platforming challenges, drive karts, and play minigames against NPCs
or friends. In-game computers are intended to connect to outside services at
some later point.

**2. Confirmed.** Genre: a 3D free-roam platformer with kart racing and a
collection of minigames.

**3. Confirmed.** References: Super Mario 64 for movement, exploration and
camera; Mario Kart Double Dash for driving and visual style.

**4. Confirmed.** Target feeling: enjoyment, curiosity and competitiveness.

**5. Confirmed.** Platform: desktop web browser first, tested in Firefox.

**6. Confirmed.** Technology: Three.js with TypeScript, built by Vite, on
Node.js. Versions in use are recorded in `package.json` and pinned by
`package-lock.json`.

**7. Confirmed.** No paid asset, service, hosting or API is to be added
without approval first.

---

## B) Milestone 1 — scope as agreed on 3 November 2026

This narrows the Game Foundation section of the original questionnaire. It
was set explicitly, and supersedes the earlier foundation plan for this
milestone only.

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

Reason: the time was to be spent on how movement and the world actually feel,
before any content is layered on top.

---

## C) Decisions made while building Milestone 1

These were judgement calls taken during the build. Each can be changed.

**1.** The character is an original model in the Super Mario 64 visual style —
not Nintendo's assets. Everything visual in this project is generated in code,
and that holds regardless of how the game is eventually used. This matches the
original questionnaire, which already confirmed "original models and
environments".

**2.** Everything visual is generated in code. There are no model, texture or
sound files in the repository, so there is no licensing to track yet.

**3.** The castle grounds include a moat, trees and a liftable crate, because
swimming needs water, climbing needs something to climb, and carrying needs
something to carry. Without them, three of the six moves could not be tested.

**4.** "Normal Mario jump" is read as the single jump only. No double jump,
triple jump, wall kick, long jump or ground pound — those belong to the full
move set, which is deferred.

**5.** Three graphics presets exist (high, medium, low) and default to medium,
because frame rate on the target machine cannot be measured from a cloud
machine. The performance panel on `F3` exists so a real reading can be taken
and reported.

**6.** The title screen is the live world with the camera orbiting the castle,
rather than a separate menu scene, so there is only one world to maintain.

**7.** There is no sound. It was not requested for this milestone, and dead
volume sliders would have been misleading, so the sound settings are not shown
yet.

---

## D) The performance target

**1. Confirmed.** The game must run well on an older laptop with integrated
graphics, in Firefox. That is the machine it is developed against, and it is
deliberately modest.

**2. Measured, 3 November 2026.** The castle build ran at **60 frames per
second at Medium quality** on that machine, with 52 to 74 draw calls and
roughly 125,000 to 130,000 triangles on screen. Read from the in-game
performance panel, not estimated.

**3. Not yet measured.** Frame rate at High quality, and frame rate during
heavy particle effects.

**4.** Frame rate is also a correctness concern, not only a comfort one. A
movement bug that only appeared above about thirty frames a second went
unnoticed for several milestones because the machine the automated checks run
on renders at twenty. The verification pass now drives the character
controller at fixed time steps from 20 to 240 frames a second.

---

## E) Still open

**1. Open.** Whether the movement actually feels right. Every tuning number
lives in `src/player/Tuning.ts` and is meant to be adjusted after play.

**2. Open.** Any deadline for a first playable version.

**3. Open.** Multiplayer hosting. Six-player browser multiplayer needs a
server; free tiers may cover testing, but this has not been checked.

**4. Open.** Final character appearance, and music and sound sources.

---

## F) The world's visual style

**1. Confirmed, 3 November 2026.** The world is to be built in Super Mario 64
style: simple low-polygon shapes, basic lighting, and minimal visual effects.

**2. Confirmed.** The castle build was more polished than necessary. Effects
such as bloom, reflective water and dense scenery are to be kept out unless
there is a reason for them, so there is performance headroom as content is
added. The measured 60 frames per second is a starting budget to protect, not
a ceiling to spend.

**3. Scope.** This applies when the world is rebuilt. It does not change the
character milestones, where a neutral studio setup is being used so the form
can be judged.

---

## G) Deferred features

**1. Further control customisation.** Movement is bound to E, D, S and F, with
R and Q reserved for picking up and interacting. Remaining bindings are to be
specified in a later milestone; until then the defaults in the README stand. The input layer already maps physical keys and gamepad buttons to
named actions, so remapping is a matter of editing that one table rather
than touching the character controller.

**2. Climbing.** Removed entirely on 4 November 2026, having been built and
then found unwanted for now. Nothing of it remains in the code. If it returns
it will be rebuilt as its own movement state, the way it was before: the
controller is a small state machine and adding one more state is not a
restructuring job.

**3. Still deferred from the original plan.** Connected outside services, the
floor plan editor, the full tournament system, extensive clothing, saving and
progression, the full carnival, and the complete Super Mario 64 move set.

---

## H) Not built, and not planned

**1. Mobile and touch controls.** None exist. The game is keyboard, mouse and
gamepad only, matching the confirmed decision that the first version targets a
desktop browser. Nothing has been removed — there was never a touch control
layer to preserve.

**2. Sound.** Still none.

---

## I) How the work is structured, from 3 November 2026

**1. Confirmed.** Milestones are small — thirty to sixty minutes of work — and
each one ends with the owner playing it before anything is built on top.

**2. Confirmed.** Each milestone keeps what came before and adds to it. The
character controller from milestone 1 is the same one the world is later built
around; nothing is rebuilt twice.

**3. Confirmed.** The castle, the moat and the title screen are kept. That
look was approved. They are not loaded during the character milestones, but
they remain in the repository and return once the character is settled.

**4. Reason for the change.** The first attempt delivered the menu, six moves,
the whole castle and the graphics in one go. Every one of the automated checks
passed while the character was swimming backwards, wearing its head inside its
shirt, and unable to get onto the bridge without jumping. A script can confirm
that something works; it cannot tell that something looks or feels wrong.

---

## J) Checkpoints

A checkpoint is a named, permanent marker on a commit that was played and
approved by the owner. It can always be returned to, whatever is built
afterwards. Each one is kept as a branch rather than a tag, because this
working environment is not permitted to push tags; a branch that is never
moved serves the same purpose and is easier to open on GitHub.

**1. Branch `checkpoint-1-jumps` — 4 November 2026, commit `c7d2a40`.** Approved by the
owner with "wow i love it". It contains the floor slab, the avatar's body and
rig, walking, running, the single jump, the double jump and the triple jump
with its somersault, the orbit and chase cameras, and the GitHub Pages
deployment.

**2. What is known to be imperfect at this checkpoint, and was accepted
anyway.** The feet dip a few centimetres through the floor during the ordinary
run cycle, so the contact with the ground does not read as solidly as it
should. The upper body has not yet been reduced in size as requested. Neither
was changed before the checkpoint was taken, because the gait was approved as
it stands.

---

## K) Change log

**4 November 2026, fourth entry.** Checkpoint 2 taken as the branch
`checkpoint-2-body-and-jumps`: the slimmer body and the three jumps with the
adaptive somersault. Then four moves added on top of it.

**1. Crouch, on W.** Holding it on the ground drops him into a crouch. At
speed it is a slide rather than a stop, which it has to be, because that is
where the long jump comes from. The movement keys are E, D, S and F, so W was
free.

**2. The long jump.** Crouch while running, then jump. It covers 10.8 metres
against 5.9 for an ordinary running jump, and rises to 1.4 metres against
1.8, so it is both clearly longer and clearly lower. It keeps a quarter of
its usual air control, so it commits to the arc it left with and is aimed
rather than flown.

**3. The backflip.** Crouch standing still, then jump. It reaches 3.2 metres
and travels 2.1 backwards, turning over once on the way. It uses the same
rotation the triple jump's somersault does, turned the other way, so it paces
itself to the time in the air and comes round before landing. Its height is
deliberately under the triple jump's 3.4 metres, so the triple jump remains
the highest thing he can do.

**4. The wall kick.** Pressed against a wall in the air he catches on it and
slides instead of dropping, and jumping again kicks him off it, away from the
wall and up, turning him to face the way he is now going. One kick gains 2.4
metres of height and carries him 2 metres clear. Four kicks are allowed per
trip through the air, so a wall is not a ladder.

**5. Walls added to the test ground.** A wall kick cannot be tried without a
wall. There are now two: a narrow gap to bounce up between, and a single face
to kick off once. Both are well away from the middle, so the open floor is
still open.

**6. The braking skid.** Letting go of the stick above 5.4 metres a second is
a skid rather than a slowdown: he digs his heels in and slides, still going
the way he was, stopping in 2 metres and just under half a second from a full
run. Below that threshold it is an ordinary stop, so a walk does not end
dramatically.

**7. What was not done.** The pivot skid — the turn-on-the-spot a hard
reversal produces — already existed before this and has been left alone. It
is a separate move from the braking skid and can be taken out if it is not
wanted.


**4 November 2026, third entry.** Two changes, both asked for.

**1. The upper body is 7 per cent narrower.** Applied to the torso's radii
only, never to its heights, so the shoulder line, the base of the neck and
the head are all exactly where they were. The arms and the buckles move in by
the same amount so they stay on the surface. Scaling the whole profile by one
figure keeps the shape it was given — belly, waist, chest — and takes out
only the bulk.

**2. The third jump's somersault starts turning sooner on a short jump.**
The wait before the rotation begins used to be a fixed tenth of a second,
which is barely noticeable on a jump held to full height and is a quarter of
a tapped one, so the low somersault had to cram a whole turn into what was
left. The wait is now a share of however much air there is beyond the bare
minimum, re-read every frame: let go of the button early, the jump is cut
short, the estimate drops with it and the rotation starts almost at once.
Measured at sixty frames a second: the shortest tap now turns after 0.05
seconds of a 0.43 second jump, where it used to wait 0.13; a jump held to
full height still waits 0.13 of 0.88, exactly as before. Every hold length
and frame rate tested comes all the way round before landing, and the heights
and the clearance above the floor are unchanged.


**4 November 2026, second entry.** Two attempts at making the feet hold the
ground were built, measured and then reverted at the owner's request. The
code is back to exactly what checkpoint 1 holds. What was learned is kept
here so neither is rebuilt by accident.

**1. Why the feet sink.** The legs are driven by two sine waves, one for the
hip and one for the knee. A leg built that way is at its longest when it
hangs straight down, which is also the moment the hips are at their lowest
and the toe is tipped down a little. All three line up at the instant the
foot should be planting, so the sole goes under: measured at up to 4.7
centimetres walking and 1.6 running. The skid, which is a hand-built pose,
buries a foot by about eight. Standing still the figure hovers about a
centimetre and a half clear of the ground, which is simply how the rig is
built.

**2. Why the feet slide.** The stride runs on its own clock rather than on
the ground. At a full run the feet sweep backwards at under half the speed
the ground goes past, so a foot that is down is still sliding.

**3. The small fix, reverted.** Lifting the body by however much the lower
shoe is below the floor removes all of the sinking and changes no joint
angle at all. It grows and fades over about fifteen frames and moves at most
1.4 centimetres between frames, so it does not read as a twitch. It cannot
be applied through a skid, because the skid flag flickers on and off as the
character slows past the speed that triggers it and the correction then makes
the body jump by up to seven centimetres.

**4. The full fix, reverted.** Solving the hip and knee angles backwards from
where each foot has to be removes the sinking and the sliding completely. The
cost is that the solver decides the stride, the posture and the cadence, and
what it produces is a sprinter's crouch with fast legs, because the character
covers 8.6 metres a second on legs under a metre long. It only becomes the
right answer if the run speed comes down to around 6 metres a second.

**5. Decision.** The run as it stands at checkpoint 1 is preferred to either.
Neither is to be applied again without being asked for.


**3 November 2026.** Milestone 1 scope set as in section B: menu, six moves,
castle grounds, good graphics. Driving and minigames moved to later
milestones; multiplayer taken out of scope for now. Reason: the time was asked to go into movement and world feel first.

**4 November 2026.** Climbing removed completely. The test ground reduced to
a bare floor slab, enlarged to eighty metres, with every other object taken
out so the character is the only thing to judge. The walk cycle's phase is
now accumulated rather than recomputed from elapsed time, which stops the
legs scrabbling at the moment movement starts. Body proportions revised: a
chest that is wider than the belly, a shoulder shelf for the arms to hang
from, a visible neck, longer legs and flatter hands.

**3 November 2026, fifth entry.** Super Mario 64 visual style confirmed for
the world, as in section F. Character proportions moved toward a chunkier,
rounder reference.

**3 November 2026, fourth entry.** Milestone 1 restarted as the body alone: a
small floor slab, the figure standing in one neutral material with no
clothing, face, colour or movement, and an orbit camera to inspect it. The
joints are all present so the same rig animates later without being rebuilt.

**3 November 2026, third entry.** Work restructured into small milestones, as
in section H. Milestone 1 is the character alone on a floor slab: walking,
running and jumping, no sky, scenery or menu.

**3 November 2026, later.** Test machine specification recorded, and 60 frames
per second measured on it at Medium quality. Custom key bindings and ladder
climbing recorded as deferred. A round of bug fixes applied after the build
was played; they are listed in the commit for that change.
