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

// ---- Running --------------------------------------------------------------
const steps = [];
await page.screenshot({ path: `${SHOTS}01-standing.png` });

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
    g.player.teleport(g.world.spawn.clone(), g.world.spawnFacing);
    const frames = Math.round(fps * 1.2);
    const start = g.world.spawn.z;
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
if (!moves.wallKick.touchedWall) problems.push('the character never caught on a wall');
if (!moves.wallKick.kicked) problems.push('the wall kick never fired');
if (!(moves.wallKick.gained > 1)) {
  problems.push(`the wall kick gained only ${moves.wallKick.gained}m of height`);
}
if (!(moves.wallKick.movedAway > 1)) {
  problems.push(`the wall kick carried him only ${moves.wallKick.movedAway}m from the wall`);
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
const ledges = await page.evaluate(() => window.__letsgo.debug.simulateLedges(1 / 60));

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

await resetPlayer(page);

// ---- The side flip, the ground pound, the ladder, the pool, the crate ---
const extras = await page.evaluate(() => window.__letsgo.debug.simulateExtras(1 / 60));

if (!extras.sideFlip.sawSkid) {
  problems.push('turning hard at a run no longer produces a skid to flip out of');
}
if (!extras.sideFlip.states.includes('side-flip')) {
  problems.push(`jumping out of a skid gave ${extras.sideFlip.states.join(' > ')}`);
}
if (!(extras.sideFlip.peak > 2.2)) {
  problems.push(`the side flip only reached ${extras.sideFlip.peak}m`);
}

for (const want of ['pound-hover', 'pound', 'pound-land']) {
  if (!extras.groundPound.states.includes(want)) {
    problems.push(
      `two quick presses in the air gave ${extras.groundPound.states.join(' > ')}, ` +
        `with no ${want}`,
    );
  }
}

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

if (!extras.crate.inReach) problems.push('the crate was never within reach');
if (!extras.crate.carrying) problems.push('pressing grab did not pick the crate up');

// The ramp has to lead all the way onto the circuit, not into the side of it.
if (!(extras.ramp.reached >= extras.ramp.trackHeight - 0.1)) {
  problems.push(
    `running up the ramp reached ${extras.ramp.reached}m against a track at ` +
      `${extras.ramp.trackHeight}m — it stops short of the road`,
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
for (const [name, result] of Object.entries(ledges)) {
  console.log(` ${name.padEnd(18)} ends at ${result.landedAt}m  ${result.states.join(' > ')}`);
}

console.log('\n--- the newest moves ---');
console.log(` side flip      ${extras.sideFlip.peak}m high  ${extras.sideFlip.states.join(' > ')}`);
console.log(` ground pound   ${extras.groundPound.states.join(' > ')}`);
console.log(
  ` ladder         ${extras.ladder.from}m to ${extras.ladder.to}m  ` +
    `${extras.ladder.states.join(' > ')}`,
);
console.log(` pool           down to ${extras.pool.depth}m  ${extras.pool.states.join(' > ')}`);
console.log(
  ` crate          in reach ${extras.crate.inReach}, carried ${extras.crate.carrying}`,
);
console.log(
  ` ramp           up to ${extras.ramp.reached}m, circuit at ${extras.ramp.trackHeight}m`,
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
    g.player.teleport(g.world.spawn.clone(), g.world.spawnFacing);
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
