/**
 * Headless verification for milestone 1: the character's body.
 *
 * Builds the page, loads it in a real browser, drives running, walking,
 * jumping and climbing the ladder onto the box, fails on any console error,
 * and writes screenshots to tools/shots/.
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
    const samples = g.simulateMove(frames, 1 / fps, 0, -1);
    const last = samples[samples.length - 1];
    return { fps, z: last.z, speed: last.speed, state: last.state };
  }, fps);
  rateResults.push(result);

  // 1.2 seconds of running from a standstill covers roughly eight metres.
  const covered = 5 - result.z;
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

// ---- Climbing the ladder and topping out ---------------------------------
await resetPlayer(page);
await page.keyboard.down('KeyE');
await waitForState(page, (state) => state === 'ladder', 30000);
steps.push(await snapshot(page, 'grabbed'));
await page.screenshot({ path: `${SHOTS}05-ladder.png` });

// Keep holding forward until the character leaves the ladder, then stop, or they
// simply carry on running across the top of the box and off the far side.
const boxTopY = await page.evaluate(() => window.__letsgo.debug.world.boxTopY);
await page.evaluate(() => {
  window.__climbPeak = 0;
  window.__climbTimer = window.setInterval(() => {
    window.__climbPeak = Math.max(window.__climbPeak, window.__letsgo.debug.player.position.y);
  }, 16);
});

let toppedOut = false;
try {
  await page.waitForFunction(() => window.__letsgo.debug.player.stateName !== 'ladder', null, {
    timeout: 40000,
    polling: 60,
  });
  toppedOut = true;
} catch {
  problems.push('the character never left the ladder');
}
await page.keyboard.up('KeyE');
await page.waitForTimeout(1200);

const climbPeak = await page.evaluate(() => {
  window.clearInterval(window.__climbTimer);
  return window.__climbPeak;
});

steps.push(await snapshot(page, toppedOut ? 'on-box' : 'stuck'));
await page.screenshot({ path: `${SHOTS}06-on-box.png` });

const standing = await playerPosition(page);
if (climbPeak < boxTopY - 0.4) {
  problems.push(`climbing only reached ${climbPeak.toFixed(2)}m, below the box top ${boxTopY}`);
}
if (Math.abs(standing.y - boxTopY) > 0.5) {
  problems.push(
    `came to rest at y=${standing.y.toFixed(2)} rather than on the box top ${boxTopY}`,
  );
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
console.log(
  `\n run ${runSpeed} m/s, walk ${walkSpeed} m/s, ` +
    `jump peak ${peak.toFixed(2)}m, climb peak ${climbPeak.toFixed(2)}m`,
);
console.log(` distance covered holding E: ${travelled.toFixed(1)}m`);
console.log(
  ` holding back: ${backTravel.toFixed(1)}m travelled, ` +
    `${spinDegrees.toFixed(0)} degrees of turning`,
);

console.log('\n--- frame rate ---');
for (const r of rateResults) {
  console.log(` ${String(r.fps).padStart(3)} fps: covered ${(5 - r.z).toFixed(1)}m in 1.2s`);
}

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
