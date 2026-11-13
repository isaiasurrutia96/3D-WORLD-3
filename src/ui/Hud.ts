/**
 * The only interface in the movement milestones: a performance and state
 * readout, and a line of controls. No menus — there is nothing to configure.
 */

import type { QualityLevel } from '../core/Settings.ts';
import './ui.css';

export interface HudState {
  fps: number;
  quality: QualityLevel;
  drawCalls: number;
  triangles: number;
  state: string;
  speed: number;
  position: { x: number; y: number; z: number };
  gamepad: boolean;
  lastKey: string;
  lastKeyRecognised: boolean;
  pointerLocked: boolean;
  moveX: number;
  moveY: number;
  cameraYaw: number;
}

export class Hud {
  private readonly stats: HTMLDivElement;
  private readonly focusNotice: HTMLDivElement;
  /** The one-line offer shown when a button would do something here. */
  private readonly prompt: HTMLDivElement;
  private promptText = '';
  /** The speed readout shown while driving a kart. */
  private readonly kart: HTMLDivElement;
  private kartText = '';
  /** The stats panel is for working on the game; it starts hidden (F3). */
  private visible = false;
  private readonly viewButton: HTMLButtonElement;
  private readonly qualityButton: HTMLButtonElement;

  constructor(container: HTMLElement) {
    const root = document.createElement('div');
    root.className = 'ui-root';
    container.appendChild(root);

    const hud = document.createElement('div');
    hud.className = 'hud';
    root.appendChild(hud);

    this.stats = document.createElement('div');
    this.stats.className = 'hud__stats';
    this.stats.hidden = true;
    hud.appendChild(this.stats);

    // Two buttons in the top corner, for a phone as much as a keyboard: the
    // camera view and the graphics quality. Pressing one does not reach the
    // view behind it, so it never also turns the camera.
    const menu = document.createElement('div');
    menu.className = 'hud__menu';
    const button = (name: string) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `hud__menu-button hud__menu-button--${name}`;
      for (const type of ['pointerdown', 'pointerup', 'touchstart', 'touchend', 'mousedown']) {
        b.addEventListener(type, (event) => event.stopPropagation());
      }
      menu.appendChild(b);
      return b;
    };
    this.viewButton = button('view');
    this.qualityButton = button('quality');
    // On the page itself, not inside the HUD: the touch layer sits over the
    // HUD and would take the taps meant for these buttons.
    container.appendChild(menu);

    // The build stamp: it is how you tell a reloaded page from a cached one.
    const build = document.createElement('div');
    build.className = 'hud__build-line';
    build.innerHTML = `<span class="hud__build">build ${__BUILD_STAMP__}</span>`;
    hud.appendChild(build);

    this.kart = document.createElement('div');
    this.kart.className = 'hud__kart';
    this.kart.hidden = true;
    hud.appendChild(this.kart);

    this.prompt = document.createElement('div');
    this.prompt.className = 'hud__prompt';
    hud.appendChild(this.prompt);

    // The page only receives key presses while it has focus. Without this,
    // a browser that has not been clicked looks identical to broken controls.
    this.focusNotice = document.createElement('div');
    this.focusNotice.className = 'hud__focus';
    this.focusNotice.textContent = 'Click the page to give it keyboard focus';
    hud.appendChild(this.focusNotice);
  }

  /** Shows a prompt such as "G — Climb down", or clears it with null. */
  setPrompt(text: string | null): void {
    const next = text ?? '';
    if (next === this.promptText) return;
    this.promptText = next;
    this.prompt.textContent = next;
    this.prompt.classList.toggle('is-visible', next !== '');
  }

  /** Shows the kart's speed in miles an hour, or hides it with null. */
  setKart(mph: number | null): void {
    const next = mph === null ? '' : String(mph);
    if (next === this.kartText) return;
    this.kartText = next;
    this.kart.hidden = mph === null;
    this.kart.innerHTML = mph === null ? '' : `<b>${mph}</b><span>MPH</span>`;
  }

  /** What happens when each corner button is pressed. */
  onMenu(handlers: { view: () => void; quality: () => void }): void {
    this.viewButton.addEventListener('click', (event) => {
      event.preventDefault();
      handlers.view();
      this.viewButton.blur();
    });
    this.qualityButton.addEventListener('click', (event) => {
      event.preventDefault();
      handlers.quality();
      this.qualityButton.blur();
    });
  }

  /** What the corner buttons say: the view and the graphics quality in use. */
  setMenu(view: 'follow' | 'isometric', quality: string, keys: boolean): void {
    const q = quality.charAt(0).toUpperCase() + quality.slice(1);
    this.viewButton.textContent = `View: ${view === 'isometric' ? 'Isometric' : 'Follow'}${keys ? '  (V)' : ''}`;
    this.qualityButton.textContent = `Graphics: ${q}${keys ? '  (1–3)' : ''}`;
  }

  toggleStats(): void {
    this.visible = !this.visible;
    this.stats.hidden = !this.visible;
  }

  update(state: HudState): void {
    const fpsClass =
      state.fps >= 50 ? 'hud__fps--good' : state.fps >= 28 ? 'hud__fps--ok' : 'hud__fps--poor';

    const rows: Array<[string, string, string?]> = [
      ['FPS', state.fps.toFixed(0), fpsClass],
      ['Quality', state.quality],
      ['Draw calls', String(state.drawCalls)],
      ['Triangles', state.triangles.toLocaleString('en-GB')],
      ['State', state.state],
      ['Speed', `${state.speed.toFixed(1)} m/s`],
      [
        'Position',
        `${state.position.x.toFixed(0)}, ${state.position.y.toFixed(0)}, ${state.position.z.toFixed(0)}`,
      ],
      ['Gamepad', state.gamepad ? 'connected' : 'press a button'],
      ['Mouse', state.pointerLocked ? 'locked' : 'free  (L)'],
      ['Input', `${state.moveX.toFixed(2)}, ${state.moveY.toFixed(2)}`],
      ['Cam yaw', `${state.cameraYaw.toFixed(0)}°`],
      [
        'Last key',
        state.lastKey === '—'
          ? 'none yet'
          : `${state.lastKey}${state.lastKeyRecognised ? '' : '  (unused)'}`,
      ],
    ];

    this.focusNotice.hidden = document.hasFocus();

    if (!this.visible) return;
    this.stats.innerHTML = '';
    for (const [label, value, className] of rows) {
      const row = document.createElement('div');
      row.textContent = `${label.padEnd(11, ' ')}${value}`;
      if (className) row.className = className;
      this.stats.appendChild(row);
    }
  }
}
