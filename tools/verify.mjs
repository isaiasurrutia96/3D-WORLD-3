/**
 * Headless verification pass.
 *
 * Builds the game, serves it, loads it in a real browser, fails on any console
 * error or uncaught exception, and writes screenshots to tools/shots/.
 *
 * This runs on a cloud machine with software rendering, so the frame rate it
 * reports is NOT representative of real hardware. It answers "does it load and
 * render without errors", not "is it fast enough".
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

const SHOTS = new URL('./shots/', import.meta.url).pathname;
const PORT = 4173;
const BASE = `http://127.0.0.1:${PORT}/`;

rmSync(SHOTS, { recursive: true, force: true });
mkdirSync(SHOTS, { recursive: true });

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--host', '127.0.0.1'], {
  cwd: new URL('..', import.meta.url).pathname,
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
  if (message.type() === 'warning' && /three|webgl/i.test(message.text())) {
    problems.push(`console.warn: ${message.text()}`);
  }
});
page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`));

await page.goto(BASE, { waitUntil: 'load', timeout: 30000 });
await page.waitForTimeout(2500);

const steps = process.argv.slice(2).length ? process.argv.slice(2) : ['default'];
for (const step of steps) {
  await runStep(page, step);
}

const report = await page.evaluate(() => {
  const api = window.__letsgo;
  if (!api) return { ready: false };
  return {
    ready: true,
    fps: api.engine ? Math.round(api.engine.fps) : null,
    drawCalls: api.engine ? api.engine.renderer.info.render.calls : null,
    triangles: api.engine ? api.engine.renderer.info.render.triangles : null,
    state: api.player ? api.player.stateName : null,
    position: api.player
      ? {
          x: Math.round(api.player.position.x * 10) / 10,
          y: Math.round(api.player.position.y * 10) / 10,
          z: Math.round(api.player.position.z * 10) / 10,
        }
      : null,
  };
});

await browser.close();
shutdown();

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

async function runStep(page, step) {
  if (step === 'default') {
    await page.screenshot({ path: `${SHOTS}load.png` });
    return;
  }
  await page.screenshot({ path: `${SHOTS}${step}.png` });
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
