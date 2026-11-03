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
}

export class Hud {
  private readonly stats: HTMLDivElement;
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
      Run <b>W A S D</b> · Walk <b>hold Shift</b> · Jump <b>Space</b><br />
      Climb: walk into the ladder · <b>W</b> up, <b>S</b> down, <b>A D</b> across<br />
      Let go with <b>Space</b> · Camera <b>mouse</b> · Reset <b>R</b><br />
      Quality <b>1</b> low · <b>2</b> medium · <b>3</b> high · Panel <b>F3</b>
    `;
    hud.appendChild(hints);
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
    ];

    this.stats.innerHTML = '';
    for (const [label, value, className] of rows) {
      const row = document.createElement('div');
      row.textContent = `${label.padEnd(11, ' ')}${value}`;
      if (className) row.className = className;
      this.stats.appendChild(row);
    }
  }
}
