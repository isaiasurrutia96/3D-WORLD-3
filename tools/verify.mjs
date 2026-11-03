/**
 * Headless verification for milestone 1: the character on a slab.
 *
 * Builds the game, loads it in a real browser, drives walking, running and
 * jumping, fails on any console error, and writes screenshots to tools/shots/.
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

const steps = [];
await page.screenshot({ path: `${SHOTS}01-standing.png` });
steps.push(await snapshot(page, 'idle'));

// ---- Running: W alone must move the character forward --------------------
const beforeRun = await position(page);
await page.keyboard.down('KeyW');
await page.waitForTimeout(2600);
const runSpeed = (await snapshot(page, 'run')).speed;
await page.screenshot({ path: `${SHOTS}02-running.png` });
await page.keyboard.up('KeyW');
const afterRun = await position(page);
steps.push(await snapshot(page, 'run'));

const travelled = Math.hypot(afterRun.x - beforeRun.x, afterRun.z - beforeRun.z);
if (travelled < 4) {
  problems.push(`holding W moved the character only ${travelled.toFixed(1)}m`);
}

await resetPlayer(page);

// ---- Walking: Shift must be slower than running --------------------------
await page.keyboard.down('ShiftLeft');
await page.keyboard.down('KeyW');
await page.waitForTimeout(2200);
const walkSpeed = (await snapshot(page, 'walk')).speed;
await page.screenshot({ path: `${SHOTS}03-walking.png` });
await page.keyboard.up('KeyW');
await page.keyboard.up('ShiftLeft');
steps.push(await snapshot(page, 'walk'));

if (!(walkSpeed > 0.5 && walkSpeed < runSpeed * 0.8)) {
  problems.push(`walk speed ${walkSpeed} is not clearly slower than run speed ${runSpeed}`);
}

await resetPlayer(page);

// ---- Jumping --------------------------------------------------------------
await page.keyboard.down('Space');
await waitForState(page, (state) => state === 'jump');
steps.push(await snapshot(page, 'jump'));
await page.screenshot({ path: `${SHOTS}04-jump.png` });
await page.keyboard.up('Space');
await waitForState(page, (state) => state === 'idle');
steps.push(await snapshot(page, 'landed'));

// ---- Character turnaround, for looking at the model ----------------------
await resetPlayer(page);
await page.waitForTimeout(400);

// The frame loop drives the chase camera every frame, so it has to stop
// before a fixed capture camera will survive to the screenshot.
await page.evaluate(() => window.__letsgo.debug.freeze());
await page.waitForTimeout(200);

const angles = [
  ['front', 0, 1.0, -2.1, 0.92],
  ['three-quarter', -1.45, 1.05, -1.55, 0.92],
  ['side', 2.1, 1.0, 0, 0.92],
  ['back', 0, 1.0, 2.1, 0.92],
];

for (const [name, dx, dy, dz, lookHeight] of angles) {
  await page.evaluate(
    ([dx, dy, dz, lookHeight]) => window.__letsgo.debug.renderFrom(dx, dy, dz, lookHeight),
    [dx, dy, dz, lookHeight],
  );
  await page.screenshot({ path: `${SHOTS}05-${name}.png` });
}

// Again with the readouts hidden, for a clean look at the model.
await page.evaluate(() => {
  document.querySelector('.hud__stats')?.setAttribute('hidden', '');
  document.querySelector('.hud__hints')?.setAttribute('hidden', '');
});
for (const [name, dx, dy, dz, lookHeight] of angles) {
  await page.evaluate(
    ([dx, dy, dz, lookHeight]) => window.__letsgo.debug.renderFrom(dx, dy, dz, lookHeight),
    [dx, dy, dz, lookHeight],
  );
  await page.screenshot({ path: `${SHOTS}06-clean-${name}.png` });
}

const report = await page.evaluate(() => {
  const engine = window.__letsgo.debug.engine;
  return {
    fps: Math.round(engine.fps),
    drawCalls: engine.renderer.info.render.calls,
    triangles: engine.renderer.info.render.triangles,
    quality: engine.currentQuality,
  };
});

await browser.close();
shutdown();

console.log('\n--- movement ---');
for (const step of steps) {
  console.log(
    ` ${step.label.padEnd(8)} state=${String(step.state).padEnd(6)} ` +
      `speed=${step.speed} pos=(${step.position.x}, ${step.position.y}, ${step.position.z})`,
  );
}
console.log(`\n distance covered holding W: ${travelled.toFixed(1)}m`);
console.log(` run ${runSpeed} m/s, walk ${walkSpeed} m/s`);

console.log('\n--- report ---');
console.log(JSON.stringify(report, null, 2));

if (problems.length) {
  console.log('\n--- problems ---');
  for (const problem of problems) console.log(' •', problem);
  process.exitCode = 1;
} else {
  console.log('\nNo console errors or uncaught exceptions.');
}

process.exit(process.exitCode ?? 0);

// ---------------------------------------------------------------------------

async function position(page) {
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
