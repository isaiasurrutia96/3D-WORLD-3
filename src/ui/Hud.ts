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
  private visible = true;

  constructor(container: HTMLElement) {
    const root = document.createElement('div');
    root.className = 'ui-root';
    container.appendChild(root);

    const hud = document.createElement('div');
    hud.className = 'hud';
    root.appendChild(hud);

    this.stats = document.createElement('div');
    this.stats.className = 'hud__stats';
    hud.appendChild(this.stats);

    const hints = document.createElement('div');
    hints.className = 'hud__hints';
    hints.innerHTML = `
      Forward <b>E</b> · Back <b>D</b> · Left <b>S</b> · Right <b>F</b> ·
      Walk <b>hold Shift</b> · Jump <b>Space</b><br />
      Jump again on landing for a higher second and third jump · at a run,
      <b>Space</b> then <b>A</b> for a <b>side flip</b><br />
      <b>C</b> crouches on land — crouch running then jump for a <b>long
      jump</b>, crouch still then jump for a <b>backflip</b><br />
      <b>Space</b> again in the air for a boost, and <b>again</b> to <b>ground
      pound</b> · kick off walls as long as you keep reaching them<br />
      Ladder: <b>E</b>/<b>D</b> up and down · <b>Space</b> jumps off ·
      <b>G</b> climbs down from the top<br />
      Hanging: <b>S</b>/<b>F</b> along the edge · <b>E</b> pulls up ·
      <b>Space</b> jumps off · <b>C</b> lets go<br />
      Water: <b>Space</b> strokes and climbs out · <b>Q</b> or <b>Ctrl</b>
      dives<br />
      <b>R</b> pick up and throw · let go at a run to <b>skid</b> ·
      Mouse lock <b>L</b> · Reset <b>Backspace</b> · Panel <b>F3</b> ·
      Quality <b>1</b>/<b>2</b>/<b>3</b><br />
      <span class="hud__build">build ${__BUILD_STAMP__}</span>
    `;
    hud.appendChild(hints);

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

    this.stats.innerHTML = '';
    for (const [label, value, className] of rows) {
      const row = document.createElement('div');
      row.textContent = `${label.padEnd(11, ' ')}${value}`;
      if (className) row.className = className;
      this.stats.appendChild(row);
    }
  }
}
