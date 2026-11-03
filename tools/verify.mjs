/**
 * Headless verification pass.
 *
 * Builds the game, serves it, loads it in a real browser, drives it through
 * the title screen and a short gameplay script, fails on any console error or
 * uncaught exception, and writes screenshots to tools/shots/.
 *
 * This runs on a cloud machine with software rendering, so the frame rate it
 * reports is NOT representative of real hardware. It answers "does it load,
 * render and respond without errors", not "is it fast enough".
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
const page = await browser.newPage({ viewport: { width: 1280, height: 760 } });
page.on('console', (message) => {
  if (message.type() === 'error') problems.push(`console.error: ${message.text()}`);
  if (message.type() === 'warning' && /three|webgl|shader/i.test(message.text())) {
    problems.push(`console.warn: ${message.text()}`);
  }
});
page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`));

await page.goto(BASE, { waitUntil: 'load', timeout: 60000 });

// ---- Title screen ---------------------------------------------------------
await page.waitForFunction(() => window.__letsgo?.debug?.player !== undefined, null, {
  timeout: 60000,
});
await page.waitForTimeout(2500);
await page.screenshot({ path: `${SHOTS}01-title.png` });

// ---- Start the game -------------------------------------------------------
await page.click('.menu-item--primary');
await page.waitForTimeout(1200);
await page.screenshot({ path: `${SHOTS}02-spawn.png` });

const steps = [];

// ---- Run forward, toward the castle --------------------------------------
await hold(page, 'KeyW', 1400);
steps.push(await snapshot(page, 'run'));
await page.screenshot({ path: `${SHOTS}03-running.png` });

// ---- Jump: held, so the full height is used ------------------------------
await page.keyboard.down('KeyW');
await page.keyboard.down('Space');
await waitForState(page, (state) => state === 'jump');
steps.push(await snapshot(page, 'jump'));
await page.screenshot({ path: `${SHOTS}04-jump.png` });
await page.keyboard.up('Space');
await waitForState(page, (state) => state !== 'jump' && state !== 'fall');
steps.push(await snapshot(page, 'landed'));
await page.keyboard.up('KeyW');

// ---- Drop into the moat, clear of the bridge ------------------------------
await teleport(page, 18, 3, 20);
await waitForState(page, (state) => state.startsWith('swim'));
await page.waitForTimeout(900);
steps.push(await snapshot(page, 'swim-float'));
await page.screenshot({ path: `${SHOTS}05-swim.png` });

// Diving should take the character under the surface.
await page.keyboard.down('ControlLeft');
await page.waitForTimeout(2000);
steps.push(await snapshot(page, 'swim-dive'));
await page.keyboard.up('ControlLeft');

// ---- Climb a tree: stand south of it and walk into the trunk -------------
await teleport(page, -9.5, 1, 39.5);
await page.waitForTimeout(500);
await page.keyboard.down('KeyW');
await waitForState(page, (state) => state === 'climb', 15000);
await page.waitForTimeout(1500);
steps.push(await snapshot(page, 'climb'));
await page.screenshot({ path: `${SHOTS}06-climb.png` });
await page.keyboard.up('KeyW');

// ---- Pick up a crate, then throw it --------------------------------------
await teleport(page, 6.5, 1, 37.8);
await page.waitForTimeout(700);
await page.keyboard.press('KeyE');
await page.waitForTimeout(500);
steps.push(await snapshot(page, 'carry'));
await page.screenshot({ path: `${SHOTS}07-carry.png` });

await page.keyboard.press('KeyE');
await page.waitForTimeout(700);
steps.push(await snapshot(page, 'after-throw'));

// ---- Pause menu -----------------------------------------------------------
await page.keyboard.press('Escape');
await page.waitForTimeout(600);
await page.screenshot({ path: `${SHOTS}08-pause.png` });

const report = await page.evaluate(() => {
  const game = window.__letsgo;
  const engine = game.debug.engine;
  return {
    fps: Math.round(engine.fps),
    drawCalls: engine.renderer.info.render.calls,
    triangles: engine.renderer.info.render.triangles,
    worldTriangles: game.debug.world.triangleCount,
    screen: game.debug.ui.currentScreen,
    carryables: game.debug.world.carryables.length,
  };
});

await browser.close();
shutdown();

console.log('\n--- gameplay steps ---');
for (const step of steps) {
  console.log(
    ` ${step.label.padEnd(14)} state=${String(step.state).padEnd(12)} ` +
      `pos=(${step.position.x}, ${step.position.y}, ${step.position.z}) ` +
      `speed=${step.speed} carrying=${step.carrying}`,
  );
}

console.log('\n--- verification report ---');
console.log(JSON.stringify(report, null, 2));

if (problems.length) {
  console.log('\n--- problems ---');
  for (const problem of problems) console.log(' •', problem);
  process.exitCode = 1;
} else {
  console.log('\nNo console errors or uncaught exceptions.');
}

// The preview server keeps the event loop alive, so exit explicitly.
process.exit(process.exitCode ?? 0);

// ---------------------------------------------------------------------------

/** Waits until the player's state satisfies `predicate`, or gives up. */
async function waitForState(page, predicate, timeout = 10000) {
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

async function hold(page, key, milliseconds) {
  await page.keyboard.down(key);
  await page.waitForTimeout(milliseconds);
  await page.keyboard.up(key);
}

async function teleport(page, x, y, z) {
  await page.evaluate(
    ([tx, ty, tz]) => {
      const player = window.__letsgo.debug.player;
      player.teleport(new (player.position.constructor)(tx, ty, tz), Math.PI);
    },
    [x, y, z],
  );
}

async function snapshot(page, label) {
  const data = await page.evaluate(() => {
    const player = window.__letsgo.debug.player;
    return {
      state: player.stateName,
      speed: Math.round(player.speed * 10) / 10,
      carrying: player.carried !== null,
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
