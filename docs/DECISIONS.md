# LetsGo — Decision Record

The authoritative record of what has been decided for this project. Update it
whenever a material decision changes, recording the date, the previous choice,
the new choice, and the reason.

Labels used throughout: **Confirmed** means the project owner stated the
choice. **Proposed** means a practical answer awaiting review. **Deferred**
means planned for later. **Open** means the answer is still needed.

Last updated: 9 November 2026 — one shared repository, two independent worlds.

## Repository consolidation — 9 November 2026

**Confirmed by the project owner.** Consolidate Claude's movement project and
Codex's LetsGo racing project into `isaiasurrutia96/3D-WORLD-3`, while keeping
the actual games/worlds independent.

Previous arrangement: separate repositories, with selected movement code
copied into LetsGo. An earlier interpretation of the new request would also
have combined the playable worlds; the owner explicitly corrected that scope
before any game source was changed.

New arrangement: the existing movement/obstacle project remains at the root;
the complete racing game is imported under `apps/letsgo-racing/`, with its
history and separate dependencies, entry point, runtime and Pages subpath.
No character, physics, camera, track, obstacle or control integration is part
of this change. The reason is to let both assistants work from the same
repository without changing either game's behavior.

Firefox lap backups, personal ghost bundling, online sync and NPCs remain
deferred. Existing browser-storage keys and ghost exports stay unchanged.

## First racing NPC and shell restoration — 9 November 2026

**Confirmed by the project owner.** Implement the first step of NPC development:
one physics-driven practice opponent on the Original Circuit, based on the four
approved ghost laps. A full three-opponent Race mode, start countdown, grid and
results remain later steps. Restore the green ricochet shell alongside Nitro.

This work is confined to `apps/letsgo-racing/`. Time Trials retain their current
Nitro-only item rules and storage keys, and practice never records personal lap
times. Shells are available in free driving and NPC practice, use the existing
item controls, and slow a hit kart without forcing its heading around. Only a
derived NPC racing-line/pace profile is distributed; personal ghost exports and
leaderboards stay separate. Claude's root world and movement code are unchanged.

## Shell-hit spin — 9 November 2026

**Confirmed by the project owner.** Restore a complete kart/driver spin on a
shell hit, followed by a smooth return to the driving heading. Deliver and test
this chunk first. Bananas (cleared per lap), shields, a dodgeable homing torpedo
with a proximity warning, and a Space-bar kart jump are later chunks; none is
implemented in this delivery. The movement world remains separate.

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

**4 November 2026, fourteenth entry.** Four movement faults, diagnosed
before anything was changed.

**1. The ladder led nowhere, and the diagnosis was a probe.** The move that
takes hold of the edge above a ladder looks a fixed 0.62 metres in front of
him. The course's ladder stood ten centimetres clear of the roof it leads
to, so the look landed in open air, found nothing, and he was clamped at the
top with the stick pushed up and nothing happening. The search now takes a
second, longer look when the first finds nothing, which fixes the class of
fault rather than the one ladder; the ladder was moved flush as well.

**2. Three more things about ladders.** Jump is now checked first and from
anywhere on it, rather than after the hand-over at the top, where a press on
the frame he arrived was swallowed. Up and down come from the stick's own
axis rather than the stick rotated into camera space — on a ladder there is
only one axis that means anything, and tying it to the camera meant forward
sometimes climbed and sometimes descended. And a ladder is now only caught
in mid-air when he is travelling at it: catching anything merely near him
meant jumping off was undone on the way back down, which is indistinguishable
from being stuck to it.

**3. Swimming had him hanging rather than swimming.** The arms were held in
one pose with a small sweep on top. Both strokes now run off one clock, so
the arms and the legs are parts of the same stroke rather than two loops that
happen to be running at once: at the surface the arms alternate, one pulling
back while the other reaches forward, with a scissor kick opposite each arm;
underwater it is a breaststroke with the legs drawn up on the recovery and
driven back on the pull.

**4. Q dives in water and crouches on land.** One button for "down", since
underwater there is nothing to crouch for. The old key still works.

**5. The wall kick limit is gone.** It was four, and a nine-metre shaft asks
for exactly four — which is why the cap was invisible. Each kick still needs
a wall touched within the window just before it, so height is only gained by
actually reaching the next wall. A sixteen-metre shaft was added beside the
first, where six kicks now carry him 15.2 metres.


**4 November 2026, thirteenth entry.** The obstacle course.

**1. The shape of it.** One connected route, laid out as a snake rather than
a ring so there is never a question of which way to go: each station finishes
facing the next. Thirteen stations, in the order the moves were built, which
also runs easiest to hardest — running and stopping, then jumping, then the
combo, the long jump, the backflip, the side flip, the ground pound, wall
kicks, the three ways over an edge, the ladder, carrying, the pool, and a
last one that asks for four of them in a row.

**2. Signs.** Every station has a board giving the move and the keys. The
words are drawn to a canvas and used as a texture: words in a scene are
either a font loader and a mesh per letter, or a picture of the words, and
for instruction boards the picture is the right answer.

**3. Falling costs nothing.** Everything stands on the slab, so a missed jump
lands on the floor and you walk back. Green pads mark each station, and
Backspace returns to the last one passed — shift and Backspace goes back to
the start.

**4. The pool is thirty metres across and eight deep**, with a board to dive
from, which is enough to swim about in, dive to the bottom, come up, and
climb out at an edge.

**5. Two stations were unreachable when first built, and neither was
visible by eye.** The long jump caught the edge of the backflip platform,
which had been placed on the block the long jump lands on — so it was
standing in the flight path. And the backflip clipped the corner of the step
it was meant to land on, because a step much over waist height is a wall to
hit on the way up rather than a ledge to come down on: the move rises 3.2
metres but only travels 2.1 backwards, and the first 0.9 of those are spent
below knee height. Both were found by driving the course at a fixed time
step and asking where he ended up.

**6. The tests needed somewhere else to stand.** The movement checks drive
the character in a straight line and measure how far he gets; run from the
course's start they measure the course. The first run after the course went
in reported that running covered 1.7 metres and that the braking skid did not
exist, both of which meant "there is a wall in the way". There is now a
clear patch of floor set aside for them, well away from anything built.


**4 November 2026, twelfth entry.** The floor is bare again: no walls, no
platform, no thin wall, no pool, no ladder and no crate. Just the slab and
the character.

The obstacles are not deleted. They are behind a flag on the world builder,
off by default, so bringing them back is one argument. Everything they were
for — the wall kick, the three climbs over an edge, the ladder, swimming,
carrying — is still in the controller and still works; it simply has nothing
to act on until they return.

The verification pass asks the world whether anything was built besides the
floor, and when the answer is no it skips those checks **and says that it
skipped them**. A check that silently passes because there was nothing to
fail against is worse than no check at all: it reports green for something
it never tested.


**4 November 2026, eleventh entry.** Four faults around the water and the
ladder, each a different kind of mistake.

**1. No way out of the pool.** The pool has vertical sides, so a stroke
pushed him forward into the wall and the float line then pulled him straight
back down to it — which reads as diving, not climbing. Pressing jump at the
surface now looks for an edge within reach first and takes hold of it, so
getting out of a pool is the same move as getting onto anything else: take
hold, then jump again to pull up. The upward part of a stroke at the surface
was also doubled, so pressing jump pushes him up rather than only along.

**2. Treading water looked like waving.** The arms were held out level with
the shoulders and splayed wide, which from any angle is a figure waving with
both hands. Treading water is close to the opposite shape: the upper arms
hang down and a little out, and it is the forearms that sweep.

**3. The ladder looked like semaphore.** The arms were posed at a fixed
angle, so the hands went wherever that angle put them, which was off into
the air beside the ladder. The hands are now the thing that is decided — on
a rung, one higher than the other, at the distance the ladder sits in front
of him — and the shoulder and elbow are solved backwards from that. It is
the same solver the climb over a ledge uses, which is now shared between
them.

**4. A drop at the top of every ladder.** He climbed to a little below the
top, and the move that takes hold of the edge then settled him down onto the
hang: half a metre, every time. He now climbs to exactly the hang height, so
the two numbers are the same and the hand-over moves him not at all.


**4 November 2026, tenth entry.** The ground pound moved to three presses,
and the build was given a stamp.

**1. Three presses, not a double tap.** One press of jump to leave the
ground, a second in the air for a small push upward, a third to come down
hard. Counting presses rather than timing a double tap means there is no
window to miss: each press simply does the next thing. The boost is about
half a metre, which is enough to be worth having and small enough that the
third press stays a decision rather than an accident. It was deferred in the
entry above this one and then asked for again, so it is in.

**2. The build is now stamped, and the stamp is on screen.** The panel shows
the commit and the time it was built.

Without it there is no way to tell a page that has not changed from a page
that has not been deployed, or from a browser serving an old copy out of its
cache. Those are three different problems that look identical from the
outside, and all three have now happened — the previous round of work was
correct and verified, and simply never reached the site, because the deploy
sat in a queue for over half an hour. Half an hour of "nothing changed" that
nobody could diagnose from the page.


**4 November 2026, ninth entry.** Three changes asked for after playing.

**1. The circuit is out of the build.** It will come back once the movement
work is done. `src/world/Track.ts` is left in place and simply not loaded, so
putting it back is one line; nothing it contains ends up in the bundle while
nothing imports it.

**2. The side flip is asked for rather than caught.** It used to come out of
a hard turn at a run, which is how the original does it and which turned out
to be very hard to do on purpose: the turn has to be sharp enough to count as
a skid, and the jump has to land inside it. It is now jump and a second
button — **A**, which nothing in the game used — within a third of a second,
**in either order**, and only from a run.

It converts a jump already on its way up rather than being a jump of its own.
That is what makes the window work in both directions, and it is why running
is checked at the moment the feet left the ground rather than at the moment
the button lands.

One thing that had to change with it: setting a fixed upward speed meant
pressing the button a tenth of a second later sent him half a metre higher,
so the same move came out anywhere between three and five metres. The height
is now the setting and the speed is worked out from where he is when the
button lands, so it tops out at three metres however it was asked for —
below the triple jump, which stays the highest thing he can do.

**3. The ground pound's three-press version is deferred**, as asked, and is
written down in section G. It stays on the double tap until then.


**4 November 2026, eighth entry.** Checkpoint 4 taken as the branch
`checkpoint-4-ledges`. Then the keys were changed and five things added.

**1. Crouch moved to Q, interact to W.** Interact had Q and nothing uses it
yet, so the swap costs nothing today.

**2. The side flip.** Turning hard at a run and jumping during the turn
throws him sideways over his own shoulder. It comes out of the skid the
controller already knew about, which is its own definition of "he is
changing his mind about which way he is going". It turns about a different
axis from the somersault and the backflip — those go head over heels, this
one goes over sideways — which is the whole reason it reads as a different
move.

**3. The ground pound, on a double tap of jump.** He stops dead, turns over,
hangs for a fifth of a second and then drives into the ground. The pause is
most of the move: dropping straight away reads as nothing more than falling
faster.

**4. A ladder on the tall wall.** A ladder is flush with its wall, so there
is nothing to stand on and nothing to push against; it is handled as a box to
be inside rather than a surface to be against. Walking into one catches it,
and so does passing near one in the air. He climbs to a little below the top
and then takes hold of the wall above in the ordinary way, so getting off the
top of a ladder is the same move as getting off the top of anything else.

**5. A pool, with a hole cut in the floor above it.** The floor is one plane
of two-metre squares, so the triangles over the pool are simply dropped. A
basin underneath and a water volume in it make it a pool set into the ground
rather than a tank standing on it.

**6. A crate to carry.** The hands were moved further out in front so a box
the size of his chest sits clear of it rather than halfway through it.
Throwing is already there — the same button throws what he is holding.

**7. The circuit.** Built from a closed curve rather than placed piece by
piece: the curve is sampled at a fixed spacing, and the road, the striped
kerbs, the guard rails and their posts are all ribbons of quads laid along
the left and right edges at each sample. The shape of the circuit is
therefore a list of corner points and nothing else. It floats thirteen metres
up and is joined to the slab by a ramp at twenty-four degrees.

Two things the ramp taught. It has to meet the *outside edge* of the
circuit, not its centre line — run to the centre line it arrived two metres
below the road, under the lip of the kerb, which is a wall to run into rather
than a way up. And the guard rail has to be left out where it joins, or the
only route onto the circuit is fenced off.

**8. A fault found on the way.** The ladder search borrowed the same scratch
vector the ground step keeps the character's horizontal velocity in, so
looking for a ladder overwrote the velocity with a position and everything
downstream went with it. Worth remembering: these vectors are reused on
purpose to avoid allocating every frame, and that only works while no two
users of one overlap.


**4 November 2026, seventh entry.** Four fixes around the climb.

**1. The shadow flicker near a wall.** In studio mode the sun sat nine metres
from the character along a direction two thirds upward, which put it barely
six metres above him — lower than the top of a seven-metre wall. The shadow
box was 4.4 metres across, sized for a scene with nothing in it but the
figure. Tall geometry was therefore level with the light and only partly
inside the box, so the part outside stopped casting and the edge of the box
swept across the walls as he moved. The sun now sits twenty-six metres back,
well above anything in the scene, the box is eighteen metres across, and the
shadow map is doubled in studio mode to keep the figure's own shadow sharp at
that width. The stray triangles of shadow on the floor near a wall are gone.

**2. He hangs until told to climb.** Taking hold of an edge no longer runs
the climb by itself: he holds there until the jump button is pressed. Crouch
lets go, because hanging with no way down would be a trap. He is also settled
onto the hang rather than left at whatever height he caught at, which was
often with the edge level with his shoulders — arms out in front, reading as
standing beside the thing rather than hanging off it.

**3. A thin wall to vault.** The walls are 0.9 metres thick and the platform
5.5, so there was nothing a top too narrow to stand on. There is now a wall
0.3 thick at the same height as the platform, and a third climb to go with
it: over the top and down the far side, rather than onto it.

**4. The hands stay on the edge.** The arms were posed by angle like
everything else, so the hands rose with the shoulders — as though the edge
were coming up too. The hand is now the thing that is decided: it stays where
the edge is, and the shoulder and elbow are worked out backwards from it. As
the body climbs past its own hands the arms straighten downward on their own,
and once the shoulders are more than an arm's length above the edge there is
nothing left to reach for and they fall to his sides. The release needs no
separate animation.


**4 November 2026, sixth entry.** The slide's figures were set to the ones
asked for, and getting over a top edge was added.

**1. The slide, as asked.** Half a second of running now slides 0.76 metres,
one second 0.91, two seconds 1.37, and three or more 1.95.

**2. Why getting over an edge was needed.** Kicking up to the top of a wall
ended in a bounce off the last few inches and a drop all the way back down,
because nothing in the controller knew the difference between a wall and the
top of a wall.

**3. What was added.** A search, run every frame he is in the air, for a
surface he could stand on within arm's length in front and somewhere between
his chest and just over his head. When it finds one he catches hold, and the
controller places him from where he caught to where he ends up standing. It
is placed rather than pushed because the move only exists by having a known
start and a known finish; letting gravity and collision argue about it in
between would produce neither. He rises first and moves across second, since
a straight line between the two points would pass through the very edge he
is getting over.

**4. Two climbs, chosen by what is beyond the edge.** If the surface carries
on well past it, it is a roof, and he hauls himself onto it the way you get
out of a swimming pool — slower, square on, both legs together. If it stops
almost at once it is the top of a wall, and he tips over it and swings a leg
across instead. This is a ledge transition only; there is still no climbing
up a wall face, which was never wanted.

**5. A platform added to the test ground.** The walls are 0.9 metres thick,
which is only ever the swing. The haul needed something broad to haul onto,
so there is now a block 5.5 metres across and 2.6 tall — high enough that the
top is just within reach at the peak of an ordinary jump, which is the case
the move is for.

**6. A state-naming fault found on the way.** A wall kick kept the name
"wall kick" for the whole flight, so when it carried him onto the next wall
the slide down that one was still being called a kick. Catching on a wall now
takes precedence, which is also the only moment another kick is possible.

**Measured.** Dropped beside the top of a wall he swings over and stands at
7.14 metres. Dropped beside the platform, and jumped at it from the floor, he
hauls up and stands at 2.71. Kicking up the gap between the two walls takes
two kicks and ends standing on top.


**4 November 2026, fifth entry.** Checkpoint 3 taken as the branch
`checkpoint-3-crouch-moves`. Then the braking skid was made to answer how
long he has been running rather than only how fast he is going.

**1. Why it needed changing.** Acceleration is 32 metres per second squared,
so full speed arrives in about a third of a second. The skid's length came
from the speed alone, which meant a two-step dash and a ten-second run ended
in exactly the same slide. That reads as slipping rather than braking.

**2. What was added.** A momentum value that builds while running above the
skid threshold and fades again when he is not. The skid now works from a
distance rather than a braking force — short 0.35 metres, long 2 — and the
force that achieves it is worked out from the speed he is carrying when he
lets go. The distance follows the momentum through a curve, so the first
second of running adds little and the later ones add most.

**3. Measured.** Half a second of running slides 0.36 metres, one second
0.59, two seconds 1.19, three seconds 1.92, and anything longer 1.92 — the
same as before the change, which was the part that was asked to be kept.

**4. The pose follows it too.** How far into the dug-in skid he goes now
follows the same momentum. Throwing the whole pose on for a two-step dash
looked like a stumble, because it was arriving and leaving inside a tenth of
a second; a brief stop is now a lean, and a long run is still the full thing.


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
