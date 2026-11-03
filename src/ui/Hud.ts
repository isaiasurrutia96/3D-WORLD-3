/**
 * The only interface in milestone 1: a performance and state readout, and a
 * line of controls. No menus — there is nothing yet to configure.
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
  private readonly root: HTMLDivElement;
  private readonly stats: HTMLDivElement;
  private visible = true;

  constructor(container: HTMLElement) {
    this.root = document.createElement('div');
    this.root.className = 'ui-root';
    container.appendChild(this.root);

    const hud = document.createElement('div');
    hud.className = 'hud';
    this.root.appendChild(hud);

    this.stats = document.createElement('div');
    this.stats.className = 'hud__stats';
    hud.appendChild(this.stats);

    const hints = document.createElement('div');
    hints.className = 'hud__hints';
    hints.innerHTML = `
      Walk <b>hold Shift + W A S D</b> · Run <b>W A S D</b><br />
      Jump <b>Space</b> · Camera <b>mouse</b> · Reset <b>R</b><br />
      Gamepad: <b>left stick</b> to move, <b>A</b> to jump<br />
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
