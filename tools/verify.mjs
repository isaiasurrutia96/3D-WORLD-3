/**
 * Headless verification for milestone 1: the character's body.
 *
 * Builds the page, loads it in a real browser, drives running, walking and
 * jumping, checks that movement does not depend on the frame rate, fails on
 * any console error, and writes a turnaround of the figure to tools/shots/.
 *
 * This runs on a cloud machine with software rendering, so the frame rate it
 * reports says nothing about real hardware. It answers "does it load, respond
 * and move", not "is it fast enough".
 *
 *   node tools/verify.mjs
 */

import { spawn } from 'node:child_process';
import net from 'node:net';
import { mkdirSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';

// Playwright is provided by the development environment rather than by this
// project, so it is resolved through CommonJS rather than imported directly.
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const ROOT = new URL('..', import.meta.url).pathname;
const SHOTS = new URL('./shots/', import.meta.url).pathname;
const PORT = 4173;
const BASE = `http://127.0.0.1:${PORT}/`;

rmSync(SHOTS, { recursive: true, force: true });
mkdirSync(SHOTS, { recursive: true });

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--host', '127.0.0.1'], {
  cwd: ROOT,
  stdio: ['ignore', 'pipe', 'pipe'],
});
const shutdown = () => {
  try {
    server.kill('SIGTERM');
  } catch {
    /* already gone */
  }
};
process.on('exit', shutdown);

await waitForServer(PORT, 30000);

const browser = await chromium.launch({
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--no-sandbox',
    '--no-proxy-server',
  ],
});

const problems = [];
const page = await browser.newPage({ viewport: { width: 900, height: 880 } });
page.on('console', (message) => {
  if (message.type() === 'error') problems.push(`console.error: ${message.text()}`);
  if (message.type() === 'warning' && /three|webgl|shader/i.test(message.text())) {
    problems.push(`console.warn: ${message.text()}`);
  }
});
page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`));

await page.goto(BASE, { waitUntil: 'load', timeout: 60000 });
await page.waitForFunction(() => window.__letsgo?.debug?.player !== undefined, null, {
  timeout: 60000,
});
await page.waitForTimeout(1500);

// Whether anything was built besides the floor. Everything that needs
// something to climb, swim in or carry is skipped while it is bare, and says
// so rather than quietly passing because there was nothing to fail against.
const hasObstacles = await page.evaluate(() => window.__letsgo.debug.world.hasObstacles);

// ---- Running --------------------------------------------------------------
const steps = [];
await page.screenshot({ path: `${SHOTS}01-standing.png` });

// On the clear patch, not at the course's start: this one drives real key
// presses and measures how far he gets, which measures the course instead
// if he is standing in it.
await resetPlayer(page);
const beforeRun = await playerPosition(page);
await page.keyboard.down('KeyE');
await page.waitForTimeout(1200);
const runSpeed = (await snapshot(page, 'run')).speed;
await page.screenshot({ path: `${SHOTS}02-running.png` });
await page.keyboard.up('KeyE');
steps.push(await snapshot(page, 'run'));
const afterRun = await playerPosition(page);

const travelled = Math.hypot(afterRun.x - beforeRun.x, afterRun.z - beforeRun.z);
if (travelled < 3) problems.push(`holding E moved the character only ${travelled.toFixed(1)}m`);

await resetPlayer(page);

// ---- Movement must not depend on the frame rate -------------------------
// Running used to stall completely above about thirty frames a second: the
// capsule caught on the seams between floor triangles, and the push that
// resolved it cancelled the frame's movement. A cloud machine renders this
// at twenty frames a second and never saw it.
const rateResults = [];
for (const fps of [20, 30, 60, 90, 144, 240]) {
  const result = await page.evaluate((fps) => {
    const g = window.__letsgo.debug;
    // The clear patch of floor, not the course's start.
    g.player.teleport(g.testGround.clone(), g.testFacing);
    const frames = Math.round(fps * 1.2);
    const start = g.testGround.z;
    const samples = g.simulateMove(frames, 1 / fps, 0, -1);
    const last = samples[samples.length - 1];
    return { fps, covered: start - last.z, speed: last.speed, state: last.state };
  }, fps);
  rateResults.push(result);

  // 1.2 seconds of running from a standstill covers roughly nine metres.
  const covered = result.covered;
  if (covered < 6) {
    problems.push(
      `at ${fps} frames a second, 1.2s of running covered only ${covered.toFixed(1)}m`,
    );
  }
}
await resetPlayer(page);

// ---- Backward must go backward, not round in circles --------------------
// Holding back used to spin on the spot: the character turned to face the
// way you pushed, the camera swung round behind them, and backward then
// pointed the other way.
await page.evaluate(() => {
  const player = window.__letsgo.debug.player;
  window.__spin = 0;
  window.__lastFacing = player.facing;
  window.__spinTimer = window.setInterval(() => {
    const facing = window.__letsgo.debug.player.facing;
    let delta = facing - window.__lastFacing;
    while (delta > Math.PI) delta -= Math.PI * 2;
    while (delta < -Math.PI) delta += Math.PI * 2;
    window.__spin += Math.abs(delta);
    window.__lastFacing = facing;
  }, 16);
});

const beforeBack = await playerPosition(page);
await page.keyboard.down('KeyD');
await page.waitForTimeout(2200);
await page.keyboard.up('KeyD');
const afterBack = await playerPosition(page);
const spinDegrees = await page.evaluate(() => {
  window.clearInterval(window.__spinTimer);
  return (window.__spin * 180) / Math.PI;
});
steps.push(await snapshot(page, 'backward'));

const backTravel = Math.hypot(afterBack.x - beforeBack.x, afterBack.z - beforeBack.z);
if (backTravel < 3) {
  problems.push(`holding back moved the character only ${backTravel.toFixed(1)}m`);
}
// One turn to face the new direction is expected; several is a spin.
if (spinDegrees > 260) {
  problems.push(`holding back turned the character ${spinDegrees.toFixed(0)} degrees in total`);
}

await resetPlayer(page);

// ---- Walking must be clearly slower --------------------------------------
await page.keyboard.down('ShiftLeft');
await page.keyboard.down('KeyE');
await page.waitForTimeout(1400);
const walkSpeed = (await snapshot(page, 'walk')).speed;
await page.screenshot({ path: `${SHOTS}03-walking.png` });
await page.keyboard.up('KeyE');
await page.keyboard.up('ShiftLeft');
steps.push(await snapshot(page, 'walk'));
if (!(walkSpeed > 0.5 && walkSpeed < runSpeed * 0.8)) {
  problems.push(`walk speed ${walkSpeed} is not clearly slower than run speed ${runSpeed}`);
}

await resetPlayer(page);

// ---- Jumping --------------------------------------------------------------
// The apex is recorded inside the page. Polling it over the wire missed it
// entirely, because a screenshot between samples takes longer than the jump.
await page.evaluate(() => {
  window.__peak = 0;
  window.__peakTimer = window.setInterval(() => {
    window.__peak = Math.max(window.__peak, window.__letsgo.debug.player.position.y);
  }, 16);
});
await page.keyboard.down('Space');
await waitForState(page, (state) => state === 'jump');
steps.push(await snapshot(page, 'jump'));
await page.screenshot({ path: `${SHOTS}04-jump.png` });
await page.waitForTimeout(1200);
await page.keyboard.up('Space');
const peak = await page.evaluate(() => {
  window.clearInterval(window.__peakTimer);
  return window.__peak;
});
await waitForState(page, (state) => state === 'idle');
steps.push(await snapshot(page, 'landed'));
if (peak < 1.0) problems.push(`a held jump only reached ${peak.toFixed(2)}m`);

// ---- The jump combo -----------------------------------------------------
// Driven at a fixed time step: the window to continue a combo is a quarter
// of a second, far too short to hit reliably over the wire.
const jumpPeaks = await page.evaluate(() => window.__letsgo.debug.simulateJumpCombo(1 / 60));
if (jumpPeaks.length !== 3) {
  problems.push(`expected three jumps, got ${jumpPeaks.length}`);
} else {
  const [first, second, third] = jumpPeaks;
  if (!(second > first + 0.3)) {
    problems.push(`the second jump (${second}m) is not clearly higher than the first (${first}m)`);
  }
  if (!(third > second + 0.3)) {
    problems.push(`the third jump (${third}m) is not clearly higher than the second (${second}m)`);
  }
}

await resetPlayer(page);

// ---- The third jump's somersault, tapped and held ------------------------
const flips = [];
for (const hold of [0.02, 0.06, 0.45]) {
  const result = await page.evaluate(
    (hold) => window.__letsgo.debug.simulateTripleJump(1 / 60, hold),
    hold,
  );
  flips.push({ hold, ...result });

  if (!result.completedBeforeLanding) {
    problems.push(
      `with the jump held for ${hold}s, the somersault did not come all the way round`,
    );
  }
  // Measured while airborne only. The somersault used to swing the whole
  // figure a body-length through the floor, because the rotation was centred
  // on the feet rather than the hips.
  if (result.lowestPart < -0.01) {
    problems.push(
      `with the jump held for ${hold}s, part of the body reached ` +
        `${result.lowestPart}m, below the floor`,
    );
  }
  // He has to be the right way up when he lands, not still turning.
  if (result.progressAtLanding < 0.99) {
    problems.push(
      `with the jump held for ${hold}s, he was only ` +
        `${Math.round(result.progressAtLanding * 100)}% round when he landed`,
    );
  }
  // The wait before the rotation starts has to leave most of the jump for
  // turning in, however short the jump is. A fixed wait does not: a tenth of
  // a second is nothing on a long jump and a quarter of a tapped one.
  if (result.startedAfter > result.airtime * 0.25) {
    problems.push(
      `with the jump held for ${hold}s, the somersault does not start turning ` +
        `until ${Math.round((result.startedAfter / result.airtime) * 100)}% of the way ` +
        `through the jump`,
    );
  }
}

const tapped = flips[0];
const held = flips[flips.length - 1];

// A tap must still give a lower jump than a hold.
if (!(held.peak > tapped.peak + 0.3)) {
  problems.push(
    `holding the jump (${held.peak}m) is not clearly higher than tapping it ` +
      `(${tapped.peak}m)`,
  );
}

// And the low one must start turning sooner, since it has less time to do it.
if (!(tapped.startedAfter < held.startedAfter)) {
  problems.push(
    `the tapped somersault starts turning after ${tapped.startedAfter}s, no sooner ` +
      `than the held one at ${held.startedAfter}s, though it has far less air to do it in`,
  );
}

await resetPlayer(page);

// ---- The crouch moves, the wall kick and the braking skid ---------------
const moves = await page.evaluate(() => window.__letsgo.debug.simulateMoveSet(1 / 60));

// A long jump has to be clearly longer, and clearly lower, than simply
// jumping while running. If it is not, there is no reason to press for it.
if (!(moves.longJump.distance > moves.runningJump.distance * 1.5)) {
  problems.push(
    `the long jump covers ${moves.longJump.distance}m against ${moves.runningJump.distance}m ` +
      `for an ordinary running jump, which is not enough to be worth the crouch`,
  );
}
if (!(moves.longJump.peak < moves.runningJump.peak)) {
  problems.push(
    `the long jump rises to ${moves.longJump.peak}m, no lower than an ordinary ` +
      `jump at ${moves.runningJump.peak}m`,
  );
}
if (moves.longJump.state !== 'long-jump') {
  problems.push(`crouching at a run and jumping gave "${moves.longJump.state}"`);
}

// A backflip goes up, goes backwards, and comes all the way over.
if (moves.backflip.state !== 'backflip') {
  problems.push(`crouching still and jumping gave "${moves.backflip.state}"`);
}
if (!(moves.backflip.backwards > 1)) {
  problems.push(`the backflip travelled ${moves.backflip.backwards}m backwards`);
}
if (moves.backflip.turned < 0.99) {
  problems.push(
    `the backflip only came ${Math.round(moves.backflip.turned * 100)}% of the way round`,
  );
}
if (moves.backflip.lowestPart < -0.01) {
  problems.push(`the backflip put part of the body at ${moves.backflip.lowestPart}m`);
}
// The triple jump should still be the highest thing he can do.
if (flips.length && !(flips[flips.length - 1].peak > moves.backflip.peak)) {
  problems.push(
    `the backflip reaches ${moves.backflip.peak}m, at or above the triple jump's ` +
      `${flips[flips.length - 1].peak}m`,
  );
}

// A wall kick needs a wall to be found, caught on, and pushed off.
if (hasObstacles) {
  if (!moves.wallKick.touchedWall) problems.push('the character never caught on a wall');
  if (!moves.wallKick.kicked) problems.push('the wall kick never fired');
  if (!(moves.wallKick.gained > 1)) {
    problems.push(`the wall kick gained only ${moves.wallKick.gained}m of height`);
  }
  if (!(moves.wallKick.movedAway > 1)) {
    problems.push(`the wall kick carried him only ${moves.wallKick.movedAway}m from the wall`);
  }
}

// Letting go at a run is a skid, and it is the braking one: he keeps going
// the way he was and slides to a stop.
if (!moves.brake.states.includes('brake')) {
  problems.push(`letting go at ${moves.brake.speedBefore}m/s gave ${moves.brake.states.join(' > ')}`);
}
if (!(moves.brake.slideDistance > 1 && moves.brake.slideDistance < 4)) {
  problems.push(
    `after a sustained run the braking skid slid ${moves.brake.slideDistance}m, ` +
      `which is not a skid`,
  );
}

// And the length of that skid has to answer how long he has been running.
// Full speed arrives in about a third of a second, so without this a
// two-step dash and a ten-second run ended identically, which read as
// slipping rather than braking.
const braking = await page.evaluate(() => window.__letsgo.debug.measureBraking(1 / 60));
const brief = braking[0];
const sustained = braking[braking.length - 1];
if (!(brief.slide < sustained.slide * 0.55)) {
  problems.push(
    `running for ${brief.ran}s then stopping slides ${brief.slide}m, against ` +
      `${sustained.slide}m after ${sustained.ran}s — the slide does not build`,
  );
}
for (let i = 1; i < braking.length; i += 1) {
  if (braking[i].slide < braking[i - 1].slide - 0.01) {
    problems.push(
      `running for ${braking[i].ran}s slides ${braking[i].slide}m, less than ` +
        `${braking[i - 1].slide}m after only ${braking[i - 1].ran}s`,
    );
  }
}
await resetPlayer(page);

// Neither of the two new standing poses may put a foot through the floor.
for (const [name, result] of [
  ['crouch', moves.crouchFloor],
  ['braking skid', moves.brakeSettled],
]) {
  if (result.lowestPart < -0.01) {
    problems.push(
      `the ${name} pose reaches ${result.lowestPart}m, below the floor (${result.at})`,
    );
  }
}

await resetPlayer(page);

// ---- Getting over a top edge --------------------------------------------
// Reaching the top of a wall by kicking up it used to end in a bounce off
// the last few inches and a drop all the way back down, because nothing knew
// the difference between a wall and the top of one. He now takes hold and
// waits there until the jump button says to climb.
const ledges = hasObstacles
  ? await page.evaluate(() => window.__letsgo.debug.simulateLedges(1 / 60))
  : null;
if (ledges) {

const WALL_TOP = 7.14;
const PLATFORM_TOP = 2.71;
const THIN_WALL_FAR_SIDE = 4.15;

for (const [name, result] of Object.entries(ledges)) {
  if (name === 'wallTopByKicking') continue;
  if (!result.hung) {
    problems.push(`${name}: never took hold of the edge (${result.states.join(' > ')})`);
    continue;
  }
  // Half a second of pressing nothing: he has to still be there.
  if (!result.stayed) {
    problems.push(`${name}: let go, or climbed, without the jump button being pressed`);
  }
}

const standsOn = (result, height, what) => {
  if (Math.abs(result.landedAt - height) > 0.05) {
    problems.push(
      `${what}: ended at ${result.landedAt}m rather than on top at ${height}m ` +
        `(${result.states.join(' > ')})`,
    );
  }
};

standsOn(ledges.wallTop, WALL_TOP, 'the top of a wall');
standsOn(ledges.platform, PLATFORM_TOP, 'the edge of a platform');
standsOn(ledges.platformJumped, PLATFORM_TOP, 'jumping at a platform');
standsOn(ledges.wallTopByKicking, WALL_TOP, 'kicking up a wall');

// The three climbs are different moves and the right one has to be picked:
// over a wall top he swings, onto a roof he hauls, over something too thin
// to stand on he vaults and carries on down the far side.
if (!ledges.wallTop.states.includes('ledge-swing')) {
  problems.push(`the top of a wall gave ${ledges.wallTop.states.join(' > ')}, not a swing`);
}
if (!ledges.platform.states.includes('mantle')) {
  problems.push(`a platform edge gave ${ledges.platform.states.join(' > ')}, not a haul`);
}
if (!ledges.thinWall.states.includes('ledge-vault')) {
  problems.push(`a thin wall gave ${ledges.thinWall.states.join(' > ')}, not a vault`);
}
if (!(ledges.thinWall.landedAhead > THIN_WALL_FAR_SIDE)) {
  problems.push(
    `the vault left him at ${ledges.thinWall.landedAhead}m, not past the far side of ` +
      `the wall at ${THIN_WALL_FAR_SIDE}m`,
  );
}
if (Math.abs(ledges.thinWall.landedAt) > 0.05) {
  problems.push(`the vault ended at ${ledges.thinWall.landedAt}m rather than back on the floor`);
}
if (!ledges.wallTopByKicking.reached) {
  problems.push('kicking up the gap between two walls never reached the top');
}
}

await resetPlayer(page);

// ---- The side flip, the ground pound, the ladder, the pool, the crate ---
// The last three need something to climb, swim in or carry. When the floor
// is bare they are skipped and said to be skipped, rather than quietly
// passing because there was nothing to fail against.
const extras = await page.evaluate(() => window.__letsgo.debug.simulateExtras(1 / 60));

// The side flip takes jump and the flip button within a third of a second of
// each other, in either order, and only from a run.
const flipCases = [
  ['jump then flip', extras.sideFlipJumpThenFlip, true],
  ['flip then jump', extras.sideFlipFlipThenJump, true],
  ['a quarter of a second apart', extras.sideFlipLateButInside, true],
  ['too far apart', extras.sideFlipTooLate, false],
  ['from a walk', extras.sideFlipFromAWalk, false],
];
for (const [name, result, shouldFlip] of flipCases) {
  if (result.flipped !== shouldFlip) {
    problems.push(
      shouldFlip
        ? `the side flip did not fire with ${name}`
        : `the side flip fired with ${name}, which it should not`,
    );
  }
}
// And it has to come out the same height however it was asked for, since it
// converts a jump that is already on its way up.
const flipPeaks = flipCases
  .filter(([, , shouldFlip]) => shouldFlip)
  .map(([, result]) => result.peak);
if (Math.max(...flipPeaks) - Math.min(...flipPeaks) > 0.25) {
  problems.push(`the side flip tops out anywhere from ${Math.min(...flipPeaks)}m to ${Math.max(...flipPeaks)}m`);
}
// It stays below the triple jump, which remains the highest thing he can do.
if (flips.length && !(flips[flips.length - 1].peak > Math.max(...flipPeaks))) {
  problems.push(
    `the side flip reaches ${Math.max(...flipPeaks)}m, at or above the triple jump`,
  );
}

for (const want of ['pound-hover', 'pound', 'pound-land']) {
  if (!extras.groundPound.states.includes(want)) {
    problems.push(
      `two quick presses in the air gave ${extras.groundPound.states.join(' > ')}, ` +
        `with no ${want}`,
    );
  }
}

if (hasObstacles) {
if (!extras.ladder.caught) problems.push('walking into the ladder did not catch it');
if (!(extras.ladder.to > extras.ladder.from + 4)) {
  problems.push(`the ladder carried him only ${extras.ladder.to - extras.ladder.from}m up`);
}
// And the top of it hands over to the climb onto the wall.
if (!extras.ladder.states.includes('hanging')) {
  problems.push(
    `the top of the ladder gave ${extras.ladder.states.join(' > ')} rather than taking ` +
      `hold of the wall top (${extras.ladder.why})`,
  );
}

if (!extras.pool.swam) {
  problems.push(`walking into the pool gave ${extras.pool.states.join(' > ')}`);
}
if (!(extras.pool.depth < -0.3)) {
  problems.push(`the pool left him at ${extras.pool.depth}m, which is not in it`);
}
// And there has to be a way out of it. A pool with vertical sides and no
// way to climb out is a trap: a stroke pushes him into the wall and the
// float line pulls him straight back down.
if (!extras.pool.gotOut) {
  problems.push(
    `pressing jump against the side of the pool gave ` +
      `${extras.pool.outStates.join(' > ')} and left him at ${extras.pool.endedAt}m`,
  );
}

// The top of a ladder hands over to the climb with no drop. It used to stop
// higher than the hang and then settle down onto it, half a metre at a time.
if (extras.ladder.dropAtTop > 0.02) {
  problems.push(
    `the top of the ladder drops him ${extras.ladder.dropAtTop}m before he takes hold`,
  );
}

if (!extras.crate.inReach) problems.push('the crate was never within reach');
if (!extras.crate.carrying) problems.push('pressing grab did not pick the crate up');
}

await resetPlayer(page);

// ---- The course ----------------------------------------------------------
// Each hard station driven with the inputs its own sign asks for. Two of
// them were unreachable when first built — the long jump caught the edge of
// a platform standing in its flight path, and the backflip clipped the
// corner of the step it was meant to land on — and neither was visible by
// eye.
const course = await page.evaluate(() => window.__letsgo.debug.simulateCourse(1 / 60));

// What is solid and what can be seen have to be the same thing. Collision is
// baked from the meshes the world hands over, so they can only part company
// in a few ways — a mesh that is solid but never drawn, one drawn only from
// its far side, one moved after the bake — and each of those is an invisible
// wall or a surface you walk through.
const audit = await page.evaluate(() => window.__letsgo.debug.collisionAudit());
for (const fault of audit.faults) problems.push(`collision and geometry disagree: ${fault}`);

// And the only things with any body to them that are deliberately not solid.
// Anything else appearing here is something a player would expect to stop
// them and would walk straight through.
const ALLOWED_WALK_THROUGH = ['sky', 'slab-body', 'crate'];
for (const name of Object.keys(audit.walkThrough)) {
  if (!ALLOWED_WALK_THROUGH.includes(name)) {
    problems.push(
      `"${name}" has body but is not solid — either make it solid or say why it is not`,
    );
  }
}

if (!course.longJumpGap.cleared) {
  problems.push(
    `station 4: the long jump took off at z=${course.longJumpGap.tookOffAt} as ` +
      `"${course.longJumpGap.launched}" and ended at z=${course.longJumpGap.z}, ` +
      `y=${course.longJumpGap.y} (${course.longJumpGap.endedAs}) — the gap is not cleared`,
  );
}
if (course.backflipStep.jumped !== 'backflip') {
  problems.push(`station 5: crouching and jumping gave "${course.backflipStep.jumped}"`);
}
if (!course.backflipStep.landed) {
  problems.push(
    `station 5: the backflip ended at y=${course.backflipStep.y}, not on the step`,
  );
}
if (!course.sideFlipLedge.landed) {
  problems.push(`station 6: the side flip ended at y=${course.sideFlipLedge.y}, not on the ledge`);
}
if (!course.kickShaft.reached) {
  problems.push(
    `station 8: ${course.kickShaft.kicks} kicks reached only ${course.kickShaft.highest}m`,
  );
}
// Ladders: up, off at any point, and over the top.
if (!course.ladderWork.climbedUp) {
  problems.push(
    `the ladder went from ${course.ladderWork.caughtAt}m to ` +
      `${course.ladderWork.climbedTo}m — pushing up does not climb it`,
  );
}
if (!course.ladderWork.releasedByJump) {
  problems.push(`jumping off the ladder left him "${course.ladderWork.afterJump}"`);
}
if (course.ladderWork.landedAfterJump === 'climb') {
  problems.push('jumping off the ladder was undone — it caught him again on the way down');
}
if (course.ladderWork.reattached) {
  problems.push('the ladder caught him again after he had jumped off it');
}
// Climbing over the top is the ladder's own move now. It used to hand over
// to the ledge hang, which settles onto a drop below the edge and then waits
// for a button, so the top of a ladder was somewhere to get stuck.
if (course.ladderWork.topStates.includes('hanging')) {
  problems.push(
    `the top of the ladder still hands over to the ledge hang ` +
      `(${course.ladderWork.topStates.join(' > ')})`,
  );
}
if (!course.ladderWork.gotOver) {
  problems.push(
    `climbing over the top ended at ${course.ladderWork.onTop}m ` +
      `(${course.ladderWork.topStates.join(' > ')})`,
  );
}
if (!course.ladderWork.canStillDescend) {
  problems.push(
    `pausing at the top of the ladder (${course.ladderWork.pausedAt}m, ` +
      `"${course.ladderWork.pausedOn}") and pressing back left him at ` +
      `${course.ladderWork.backedDownTo}m`,
  );
}
if (!course.ladderWork.offered) problems.push('no climb-down was offered at the top of the ladder');
if (course.ladderWork.offeredAway) {
  problems.push('the climb-down was offered from the middle of the roof, away from the ladder');
}
if (!course.ladderWork.backOn) {
  problems.push(
    `G from the platform gave ${course.ladderWork.downStates.join(' > ')} rather than ` +
      `putting him on the ladder`,
  );
}
if (!course.ladderWork.climbedDown) {
  problems.push(
    `after G he went from ${course.ladderWork.mountedAt}m to ` +
      `${course.ladderWork.descendedTo}m — back does not climb down`,
  );
}

// Hanging off an edge: along it, up off it, and away from it.
if (!course.ledgeWork.hung) problems.push('dropping onto the roof edge did not catch it');
if (!course.ledgeWork.wentRight) {
  problems.push(
    `right on the edge moved him from z=${course.ledgeWork.caughtZ} to ` +
      `z=${course.ledgeWork.shimmiedZ}`,
  );
}
if (!course.ledgeWork.wentLeft) {
  problems.push(
    `left on the edge moved him from z=${course.ledgeWork.shimmiedZ} to ` +
      `z=${course.ledgeWork.backZ}`,
  );
}
if (!course.ledgeWork.stillHanging) problems.push('shuffling along the edge let go of it');
if (!course.ledgeWork.heldForwardDidNothing) {
  problems.push('holding jump pulled him up without a fresh press of it');
}
if (!course.ledgeWork.pulledUp) {
  problems.push(`pressing jump on the edge ended at ${course.ledgeWork.endedAt}m`);
}
if (!course.ledgeWork.jumpedOff) {
  problems.push(`back on the edge left him "${course.ledgeWork.afterLedgeJump}"`);
}
if (!course.ledgeWork.pushedBack) {
  problems.push('pushing off the edge did not move him away from the wall');
}

// One press of jump pulls him up; a second inside the window pushes him
// clear of the edge, and has to join the movement already running rather
// than restart it.
if (!course.ledgePush.pullsUp) {
  problems.push(
    `one press of jump on the edge ended as "${course.ledgePush.plain?.state}" at ` +
      `${course.ledgePush.plain?.ended}m`,
  );
}
if (!course.ledgePush.pushesHigher) {
  problems.push(
    `a second press did not push him clear — plain peaked at ` +
      `${course.ledgePush.plain?.peak}m against ${course.ledgePush.sameFrame?.peak}m ` +
      `double-tapped, ${course.ledgePush.middle?.peak}m mid-window and ` +
      `${course.ledgePush.late?.peak}m late`,
  );
}
if (!course.ledgePush.windowCloses) {
  problems.push(
    `a press well after the window still pushed him to ${course.ledgePush.tooLate?.peak}m`,
  );
}
if (!course.ledgePush.smooth) {
  const worst = Math.max(
    ...[course.ledgePush.sameFrame, course.ledgePush.middle, course.ledgePush.late]
      .filter(Boolean)
      .map((r) => r.biggestStep),
  );
  problems.push(
    `the second press restarted the climb rather than joining it — ${worst}m ` +
      `of movement in one frame`,
  );
}

// Hands on the edge, not on air. The search reaches further than his arms,
// so a catch at full stretch must still bring him in to the wall.
if (!course.ledgeGap.handsOnIt) {
  problems.push(
    `caught the edge from a stretch and stayed there — close in he ended ` +
      `${course.ledgeGap.near.gap}m from the wall, at full stretch ` +
      `${course.ledgeGap.far.gap}m`,
  );
}

// Square to the wall however he arrives at it, and along it without
// wandering in or out of the face.
if (!course.angledLedges.caughtAll) {
  problems.push('an edge approached at an angle was not caught at all');
}
if (!course.angledLedges.heldAll) {
  problems.push('moving along an edge let go of it on one of the test walls');
}
if (!course.angledLedges.squaresUp) {
  problems.push(
    `catching an edge left him up to ${course.angledLedges.worstFacing}° off square ` +
      `to the wall, and moving along it wandered ${course.angledLedges.worstDrift}m ` +
      `in or out of the face`,
  );
}

// Where an edge runs out, and where it runs into something else.
if (!course.ledgeEnds.stopsAtTheEnd) {
  problems.push(
    `moving along the beam did not stop at its free end — ended at ` +
      `${JSON.stringify(course.ledgeEnds.offTheEnd)}`,
  );
}
if (!course.ledgeEnds.stopsAtTheCorner) {
  problems.push(
    `moving along an edge went through the structure it runs into — ended at ` +
      `${JSON.stringify(course.ledgeEnds.intoTheCorner)}`,
  );
}

// Nothing solid can be fallen through, however coarse the frame.
if (!course.fallThrough.allCaught) {
  const missed = course.fallThrough.rows.filter((r) => !r.landed);
  problems.push(
    `fell through solid ground: ` +
      missed
        .map((r) => `${r.thickness}m slab at ${r.top}m, ${r.rate}fps, ended at ${r.ended}m`)
        .join('; '),
  );
}

// And moving along it is hand over hand: one holding, one travelling.
if (!course.gripHands.alternates) {
  problems.push(
    `the hands did not take turns on the edge — of ${course.gripHands.steps} frames, ` +
      `one hand was still for ${course.gripHands.heldStill}, the other covered ground ` +
      `for ${course.gripHands.reached}, and both drifted together for ` +
      `${course.gripHands.together}`,
  );
}

// A one metre plinth is a step, not a ledge: he lands on it and walks up.
if (course.lowStep.grabbed) {
  problems.push(
    `a low step was caught as a ledge — falling beside it gave ` +
      `${course.lowStep.dropped.states.join(' > ')}, a side flip past it gave ` +
      `${course.lowStep.flipped.states.join(' > ')}`,
  );
}

// C crouches on land; Q dives in water.
if (course.crouchKey.onLand !== 'crouch') {
  problems.push(`C on land gave "${course.crouchKey.onLand}" rather than a crouch`);
}
if (!course.crouchKey.dives) {
  problems.push(
    `Q in the water took him from ${course.crouchKey.floatedAt}m to ` +
      `${course.crouchKey.divedTo}m — it is not diving`,
  );
}

// The second press of jump in the air lifts him.
if (!course.airBoost.lifts) {
  problems.push(
    `the air boost took the jump from ${course.airBoost.plain}m to ` +
      `${course.airBoost.boosted}m, which is not a lift`,
  );
}

// Wall kicks have no limit: four was the old cap, and a nine metre shaft
// asks for exactly four, which is how the cap stayed invisible.
if (!course.manyKicks.pastFour) {
  problems.push(
    `the tall shaft allowed only ${course.manyKicks.kicks} kicks, reaching ` +
      `${course.manyKicks.highest}m`,
  );
}

if (!course.crate.carrying) problems.push('station 11: the crate would not be picked up');
if (!(course.pool.deepest < -6)) {
  problems.push(`station 12: diving only reached ${course.pool.deepest}m of an eight metre pool`);
}
if (!course.pool.surfaced) problems.push('station 12: he never came back to the surface');
if (!course.pool.usedWaterExit) {
  problems.push('station 12: getting out of the pool did not use the water exit move');
}
// And it must not begin by pulling him under. The old way out ran the ledge
// hang, which settles onto a fixed drop below the edge — from the surface
// that put his head under before he climbed, so jump looked like dive.
if (!course.pool.neverDucked) {
  problems.push(
    `station 12: climbing out dropped him from ${course.pool.floatedAt}m to ` +
      `${course.pool.dippedTo}m before he rose`,
  );
}
if (!course.pool.out) problems.push('station 12: there is no way out of the pool');
// Space in water is a stroke, however many times it is pressed. It is not a
// jump, so it cannot become the boost or the ground pound that follow one.
for (const [where, result] of [
  ['at the surface', course.strokeSpam.surface],
  ['underwater', course.strokeSpam.under],
]) {
  if (!result.stayedWet) {
    problems.push(
      `eight presses of Space ${where} gave ${result.states.join(' > ')}`,
    );
  }
}
// The height check belongs to the surface alone. Underwater, strokes are
// meant to carry him up — that is how you come back from the bottom — and
// the test starts him down there, so a four metre rise is the right answer.
if (course.strokeSpam.surface.rose > 0.6) {
  problems.push(
    `eight presses of Space at the surface lifted him ` +
      `${course.strokeSpam.surface.rose}m, out of the water`,
  );
}
// Held to wind a move up, let go to launch it: four buttons, each its own,
// each going higher the longer it is held, and none of them going anywhere
// while it is still held.
if (!course.charging.higherWhenHeld) {
  const rows = Object.entries(course.charging.rows)
    .map(([name, r]) => `${name} ${r.tap}m tapped against ${r.full}m held`)
    .join(', ');
  problems.push(`holding a jump button did not go higher than tapping it — ${rows}`);
}
if (!course.charging.staysDown) {
  problems.push(
    `winding up launched him — he gathered to ${course.charging.waited.gathered} and rose ` +
      `${course.charging.waited.rose}m without the button being let go of`,
  );
}
if (!course.charging.waitsForRelease) {
  problems.push(
    `a full wind-up did not launch on release — it gave ${course.charging.released.peak}m ` +
      `as "${course.charging.released.kind}"`,
  );
}
if (!course.charging.cancelClears) {
  problems.push(
    `a wind-up taken away left him charging — ${course.charging.cancelled.windUp} still wound ` +
      `up, "${course.charging.cancelled.state}"`,
  );
}

// The boost and the pound are the second and third presses of one button,
// and under a thumb one press often arrives twice. They have to be kept
// apart in time as well as in count.
if (!course.boostThenPound.lifts) {
  problems.push('the first press of jump in the air no longer lifts him');
}
if (!course.boostThenPound.ignoresFastSecond) {
  problems.push(
    `a second press straight after the boost still ground-pounded — same frame ` +
      `"${course.boostThenPound.sameFrame.pound}", 0.08s "${course.boostThenPound.tooSoon.pound}", ` +
      `0.14s "${course.boostThenPound.justInside.pound}"`,
  );
}
if (!course.boostThenPound.poundsLater) {
  problems.push(
    `a deliberate second press did not ground pound — it gave ` +
      `"${course.boostThenPound.deliberate.pound}"`,
  );
}

// Swimming where he looks: C takes him under, the camera steers, and the
// forward key is what turns looking into going.
if (!course.lookSwim.dives) {
  problems.push('one press of C in the water did not take him under');
}
if (!course.lookSwim.steers) {
  problems.push(
    `looking did not steer him — down gave ${course.lookSwim.down.dy}m and up gave ` +
      `${course.lookSwim.up.dy}m`,
  );
}
if (!course.lookSwim.turns) {
  problems.push(
    `looking sideways did not turn him — he went ${course.lookSwim.across.dx}m across ` +
      `and ${course.lookSwim.across.dz}m along`,
  );
}
if (!course.lookSwim.needsAKey) {
  problems.push(
    `looking around underwater propelled him on its own — ${course.lookSwim.idle.dx}m, ` +
      `${course.lookSwim.idle.dy}m, ${course.lookSwim.idle.dz}m with nothing held`,
  );
}
if (!course.lookSwim.surfaceIsFree) {
  problems.push(
    `looking down at the surface pulled him ${course.lookSwim.surfaceDrop}m under`,
  );
}

// And floating still is floating still: coming up from the bottom with
// nothing pressed must leave him treading water, not snatched onto the side.
if (!course.floating.treads) {
  problems.push(
    `station 12: rising from the bottom left him "${course.floating.state}" at ` +
      `${course.floating.at}m, then "${course.floating.stayed}"`,
  );
}

await resetPlayer(page);

// ---- A turnaround of the figure, for judging the body -------------------
await resetPlayer(page);
await page.waitForTimeout(400);
await page.evaluate(() => window.__letsgo.debug.freeze());
await page.waitForTimeout(200);
await page.evaluate(() => {
  document.querySelector('.hud__stats')?.setAttribute('hidden', '');
  document.querySelector('.hud__hints')?.setAttribute('hidden', '');
});

for (const [name, dx, dy, dz, lookHeight] of [
  ['front', 0, 1.0, -2.1, 0.92],
  ['three-quarter', -1.45, 1.05, -1.55, 0.92],
  ['side', 2.1, 1.0, 0, 0.92],
  ['back', 0, 1.0, 2.1, 0.92],
]) {
  await page.evaluate(
    ([dx, dy, dz, lookHeight]) => window.__letsgo.debug.renderFrom(dx, dy, dz, lookHeight),
    [dx, dy, dz, lookHeight],
  );
  await page.screenshot({ path: `${SHOTS}body-${name}.png` });
}

const report = await page.evaluate(() => {
  const engine = window.__letsgo.debug.engine;
  return {
    fps: Math.round(engine.fps),
    drawCalls: engine.renderer.info.render.calls,
    triangles: engine.renderer.info.render.triangles,
    worldTriangles: window.__letsgo.debug.world.triangleCount,
  };
});

await browser.close();
shutdown();

console.log('\n--- movement ---');
for (const step of steps) {
  console.log(
    ` ${step.label.padEnd(9)} state=${String(step.state).padEnd(7)} ` +
      `speed=${step.speed} pos=(${step.position.x}, ${step.position.y}, ${step.position.z})`,
  );
}
console.log(`\n run ${runSpeed} m/s, walk ${walkSpeed} m/s, jump peak ${peak.toFixed(2)}m`);
console.log(` jump combo heights: ${jumpPeaks.map((h) => `${h}m`).join(', ')}`);
for (const f of flips) {
  console.log(
    ` somersault held ${f.hold}s: peak ${f.peak}m, turns after ${f.startedAfter}s of ` +
      `${f.airtime}s in the air, ${Math.round(f.progressAtLanding * 100)}% round on landing, ` +
      `lowest part ${f.lowestPart}m, ` +
      `completed ${f.completedBeforeLanding}`,
  );
}
console.log(` distance covered holding E: ${travelled.toFixed(1)}m`);
console.log(
  ` holding back: ${backTravel.toFixed(1)}m travelled, ` +
    `${spinDegrees.toFixed(0)} degrees of turning`,
);

console.log('\n--- frame rate ---');
for (const r of rateResults) {
  console.log(` ${String(r.fps).padStart(3)} fps: covered ${r.covered.toFixed(1)}m in 1.2s`);
}

console.log('\n--- the crouch moves, the wall kick and the skid ---');
console.log(
  ` running jump   ${moves.runningJump.distance}m long, ${moves.runningJump.peak}m high`,
);
console.log(
  ` long jump      ${moves.longJump.distance}m long, ${moves.longJump.peak}m high ` +
    `(${(moves.longJump.distance / moves.runningJump.distance).toFixed(1)}x the distance)`,
);
console.log(
  ` backflip       ${moves.backflip.peak}m high, ${moves.backflip.backwards}m back, ` +
    `${Math.round(moves.backflip.turned * 100)}% round`,
);
console.log(
  ` wall kick      ${moves.wallKick.gained}m gained, ${moves.wallKick.movedAway}m off the wall ` +
    `(${moves.wallKick.states.join(' > ')})`,
);
console.log(
  ` braking skid   ${moves.brake.slideDistance}m in ${moves.brake.seconds}s from ` +
    `${moves.brake.speedBefore}m/s`,
);
console.log(
  `                after running ` +
    braking.map((b) => `${b.ran}s: ${b.slide}m`).join(', '),
);
console.log(
  ` floor          crouch ${moves.crouchFloor.lowestPart}m, skid ${moves.brakeSettled.lowestPart}m`,
);

console.log('\n--- over a top edge ---');
if (ledges) {
  for (const [name, result] of Object.entries(ledges)) {
    console.log(` ${name.padEnd(18)} ends at ${result.landedAt}m  ${result.states.join(' > ')}`);
  }
} else {
  console.log(' skipped: the floor is bare, so there is nothing to climb');
}

console.log('\n--- the newest moves ---');
for (const [name, result, shouldFlip] of flipCases) {
  console.log(
    ` side flip      ${String(name).padEnd(28)} ${result.flipped ? 'fires' : 'does not'}` +
      `${shouldFlip === result.flipped ? '' : '  <-- wrong'}  ${result.peak}m`,
  );
}
console.log(` ground pound   ${extras.groundPound.states.join(' > ')}`);
if (hasObstacles) {
  console.log(
    ` ladder         ${extras.ladder.from}m to ${extras.ladder.to}m, drop at the top ` +
      `${extras.ladder.dropAtTop}m  ${extras.ladder.states.join(' > ')}`,
  );
  console.log(` pool           down to ${extras.pool.depth}m, out again ${extras.pool.gotOut}`);
  console.log(`                ${extras.pool.outStates.join(' > ')}`);
  console.log(
    ` crate          in reach ${extras.crate.inReach}, carried ${extras.crate.carrying}`,
  );
} else {
  console.log(' ladder, pool, crate, wall kick: skipped, the floor is bare');
}

console.log('\n--- the course ---');
console.log(
  ` 4  long jump   off at z=${course.longJumpGap.tookOffAt}, down at z=${course.longJumpGap.z} ` +
    `— cleared ${course.longJumpGap.cleared}`,
);
console.log(` 5  backflip    up to ${course.backflipStep.y}m — landed ${course.backflipStep.landed}`);
console.log(` 6  side flip   up to ${course.sideFlipLedge.y}m — landed ${course.sideFlipLedge.landed}`);
console.log(` 8  wall kicks  ${course.kickShaft.kicks} kicks, ${course.kickShaft.highest}m`);
console.log(
  ` 10 ladder      ${course.ladderWork.caughtAt}m to ${course.ladderWork.climbedTo}m, off by ` +
    `jump "${course.ladderWork.afterJump}" then "${course.ladderWork.landedAfterJump}", ` +
    `caught again ${course.ladderWork.reattached}`,
);
console.log(
  `                over the top: ${course.ladderWork.topStates.join(' > ')} at ` +
    `${course.ladderWork.onTop}m · paused at ${course.ladderWork.pausedAt}m and backed ` +
    `down to ${course.ladderWork.backedDownTo}m`,
);
console.log(
  `                G from above: offered ${course.ladderWork.offered}, away from it ` +
    `${course.ladderWork.offeredAway}, ${course.ladderWork.downStates.join(' > ')} at ` +
    `${course.ladderWork.mountedAt}m, down to ${course.ladderWork.descendedTo}m`,
);
console.log(
  ` 3  low step    falling beside it: ${course.lowStep.dropped.states.join(' > ')} · ` +
    `side flip past it: ${course.lowStep.flipped.states.join(' > ')}`,
);
console.log(
  ` 9  hanging     along the edge z=${course.ledgeWork.caughtZ} to ` +
    `z=${course.ledgeWork.shimmiedZ} to z=${course.ledgeWork.backZ}, holding Space did ` +
    `nothing ${course.ledgeWork.heldForwardDidNothing}, Space pulled up ` +
    `${course.ledgeWork.pulledUp}, D gave "${course.ledgeWork.afterLedgeJump}"`,
);
console.log(
  `                one press tops out at ${course.ledgePush.plain?.peak}m · two: ` +
    `${course.ledgePush.sameFrame?.peak}m same frame, ${course.ledgePush.early?.peak}m ` +
    `early, ${course.ledgePush.middle?.peak}m mid, ${course.ledgePush.late?.peak}m late, ` +
    `${course.ledgePush.tooLate?.peak}m too late · worst single frame ` +
    `${course.ledgePush.late?.biggestStep}m`,
);
console.log(
  `                caught it at ${course.ledgeGap.far.gap}m from the wall from a stretch ` +
    `and ${course.ledgeGap.near.gap}m from close in · hand over hand: one still for ` +
    `${course.gripHands.heldStill} of ${course.gripHands.steps} frames, the other ` +
    `travelling for ${course.gripHands.reached}, both together for ` +
    `${course.gripHands.together}`,
);
console.log(
  ` angled grabs   ${course.angledLedges.rows.length} on five walls, worst ` +
    `${course.angledLedges.worstFacing}° off square, wandering ` +
    `${course.angledLedges.worstDrift}m in or out of the face`,
);
console.log(
  ` edge ends      off the end of the beam: stopped at x=${course.ledgeEnds.offTheEnd?.x} ` +
    `still hanging · into the corner at station 8: stopped at ` +
    `z=${course.ledgeEnds.intoTheCorner?.z}, the platform starts at 6.5`,
);
console.log(
  ` solid ground   ${course.fallThrough.tried} free-standing slabs, thinnest ` +
    `${course.fallThrough.thinnest}m, dropped onto at 60/30/20/15fps — all caught ` +
    `${course.fallThrough.allCaught}`,
);
console.log(
  ` collision      ${audit.solidMeshes} solid meshes, ${audit.solidTriangles} triangles, ` +
    `${audit.faults.length} disagreeing with what is drawn · walk-through: ` +
    `${Object.keys(audit.walkThrough).join(', ') || 'nothing'}`,
);
console.log(
  ` wind-up        tapped against held: ` +
    Object.entries(course.charging.rows)
      .map(([name, r]) => `${name} ${r.tap}/${r.full}m`)
      .join(' · ') +
    ` · held at full for 2s: rose ${course.charging.waited.rose}m, then ` +
    `${course.charging.released.peak}m on release`,
);
console.log(
  ` boost / pound  a second press at 0s, 0.08s and 0.14s after the boost gives ` +
    `"${course.boostThenPound.sameFrame.pound}", "${course.boostThenPound.tooSoon.pound}", ` +
    `"${course.boostThenPound.justInside.pound}" · at 0.3s "${course.boostThenPound.deliberate.pound}"`,
);
console.log(
  ` boost          plain ${course.airBoost.plain}m, boosted ${course.airBoost.boosted}m ` +
    `(+${course.airBoost.gain}m)`,
);
console.log(
  ` 8b kicks       ${course.manyKicks.kicks} alternating, up to ${course.manyKicks.highest}m`,
);
console.log(
  ` C / Q          C on land "${course.crouchKey.onLand}", Q in water ${course.crouchKey.floatedAt}m ` +
    `down to ${course.crouchKey.divedTo}m`,
);
console.log(` 11 crate       carried ${course.crate.carrying}`);
console.log(
  ` 12 pool        down to ${course.pool.deepest}m, surfaced ${course.pool.surfaced}, ` +
    `out ${course.pool.out}`,
);
console.log(
  `                out of it: ${course.pool.outStates.join(' > ')}, floating at ` +
    `${course.pool.floatedAt}m and never below ${course.pool.dippedTo}m`,
);
console.log(
  `                floating still: "${course.floating.state}" at ${course.floating.at}m, ` +
    `then "${course.floating.stayed}"`,
);
console.log(
  `                C then look: down ${course.lookSwim.down.dy}m, up ` +
    `${course.lookSwim.up.dy}m, across ${course.lookSwim.across.dx}m · looking alone ` +
    `${course.lookSwim.idle.dx}/${course.lookSwim.idle.dy}/${course.lookSwim.idle.dz}m · ` +
    `at the surface ${course.lookSwim.surfaceDrop}m`,
);
console.log(
  `                8x Space at the surface: rose ${course.strokeSpam.surface.rose}m, ` +
    `${course.strokeSpam.surface.states.join(' > ')}`,
);
console.log(
  `                8x Space underwater:     rose ${course.strokeSpam.under.rose}m, ` +
    `${course.strokeSpam.under.states.join(' > ')}`,
);

console.log('\n--- report ---');
console.log(JSON.stringify(report, null, 2));

if (problems.length) {
  console.log('\n--- problems ---');
  for (const problem of problems) console.log(' •', problem);
  process.exitCode = 1;
} else {
  console.log('\nNo console errors or uncaught exceptions.');
}

async function playerPosition(page) {
  return page.evaluate(() => {
    const p = window.__letsgo.debug.player.position;
    return { x: p.x, y: p.y, z: p.z };
  });
}

async function resetPlayer(page) {
  await page.evaluate(() => {
    const g = window.__letsgo.debug;
    // The clear patch of floor, not the course's start.
    g.player.teleport(g.testGround.clone(), g.testFacing);
  });
  await page.waitForTimeout(500);
}

async function waitForState(page, predicate, timeout = 15000) {
  try {
    await page.waitForFunction(
      (source) => {
        const test = new Function('state', `return (${source})(state);`);
        return test(window.__letsgo.debug.player.stateName);
      },
      predicate.toString(),
      { timeout, polling: 60 },
    );
  } catch {
    problems.push(`timed out waiting for state: ${predicate.toString()}`);
  }
}

async function snapshot(page, label) {
  const data = await page.evaluate(() => {
    const player = window.__letsgo.debug.player;
    return {
      state: player.stateName,
      speed: Math.round(player.speed * 10) / 10,
      position: {
        x: Math.round(player.position.x * 10) / 10,
        y: Math.round(player.position.y * 10) / 10,
        z: Math.round(player.position.z * 10) / 10,
      },
    };
  });
  return { label, ...data };
}

process.exit(process.exitCode ?? 0);

// ---------------------------------------------------------------------------

/**
 * Waits for the preview server by opening a TCP connection rather than by
 * fetching, so an HTTP proxy in the environment cannot intercept the check.
 */
async function waitForServer(port, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const open = await new Promise((resolve) => {
      const socket = net.connect({ host: '127.0.0.1', port }, () => {
        socket.end();
        resolve(true);
      });
      socket.on('error', () => resolve(false));
      socket.setTimeout(1000, () => {
        socket.destroy();
        resolve(false);
      });
    });
    if (open) return;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Server did not start on port ${port}`);
}
