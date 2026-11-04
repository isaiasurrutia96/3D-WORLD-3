import { execSync } from 'node:child_process';
import { defineConfig } from 'vite';

/**
 * A stamp for the build, shown in the panel.
 *
 * Without one there is no way to tell a page that has not changed from a
 * page that has not been deployed, or from a browser serving an old copy out
 * of its cache. Three different problems that look identical from the
 * outside, and all three have happened.
 */
function buildStamp(): string {
  try {
    const sha = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    return `${sha} ${new Date().toISOString().slice(5, 16).replace('T', ' ')}`;
  } catch {
    return new Date().toISOString().slice(5, 16).replace('T', ' ');
  }
}

export default defineConfig({
  define: {
    __BUILD_STAMP__: JSON.stringify(buildStamp()),
  },
  base: './',
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: false,
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false,
  },
});
