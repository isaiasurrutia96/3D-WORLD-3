/**
 * Headless verification for milestone 1: the character's body.
 *
 * Builds the page, loads it in a real browser, checks that every joint of the
 * rig is present, fails on any console error, and writes a turnaround of the
 * figure to tools/shots/.
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
await page.waitForFunction(() => window.__letsgo?.debug?.rig !== undefined, null, {
  timeout: 60000,
});
await page.waitForTimeout(1500);

// ---- The scene must load and build the rig -------------------------------
const rigJoints = await page.evaluate(() => {
  const rig = window.__letsgo.debug.rig;
  return Object.keys(rig).filter((key) => key !== 'materials');
});

const expectedJoints = [
  'root', 'body', 'torso', 'head',
  'shoulderLeft', 'shoulderRight', 'elbowLeft', 'elbowRight',
  'hipLeft', 'hipRight', 'kneeLeft', 'kneeRight',
  'ankleLeft', 'ankleRight', 'carryAnchor',
];
for (const joint of expectedJoints) {
  if (!rigJoints.includes(joint)) problems.push(`rig is missing the ${joint} joint`);
}

// ---- Turnaround ----------------------------------------------------------
const angles = [
  ['front', 0],
  ['front-quarter', 45],
  ['side', 90],
  ['back-quarter', 135],
  ['back', 180],
];

for (const [name, degrees] of angles) {
  await page.evaluate(
    ([degrees]) => window.__letsgo.debug.viewFrom(degrees, 1.15, 3.1),
    [degrees],
  );
  await page.screenshot({ path: `${SHOTS}${name}.png` });
}

// A closer look at the upper body and at the legs.
await page.evaluate(() => window.__letsgo.debug.viewFrom(35, 1.5, 1.9));
await page.screenshot({ path: `${SHOTS}detail-upper.png` });
await page.evaluate(() => window.__letsgo.debug.viewFrom(35, 0.55, 1.9));
await page.screenshot({ path: `${SHOTS}detail-lower.png` });

const report = await page.evaluate(() => {
  const engine = window.__letsgo.debug.engine;
  return {
    fps: Math.round(engine.fps),
    drawCalls: engine.renderer.info.render.calls,
    triangles: engine.renderer.info.render.triangles,
    joints: Object.keys(window.__letsgo.debug.rig).length,
  };
});

await browser.close();
shutdown();

console.log('\n--- rig ---');
console.log(` joints present: ${rigJoints.join(', ')}`);

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
