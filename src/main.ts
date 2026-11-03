import './styles.css';
import { Engine } from './core/Engine.ts';
import { loadSettings } from './core/Settings.ts';

const container = document.getElementById('app');
if (!container) throw new Error('Missing #app container');

const settings = loadSettings();
const engine = new Engine(container, settings.quality);

function frame(): void {
  requestAnimationFrame(frame);
  engine.render(engine.clock.getDelta());
}
frame();

// Surfaced so the headless verification pass can assert the renderer started.
(window as unknown as Record<string, unknown>).__letsgo = { engine };
