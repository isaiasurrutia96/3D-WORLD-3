/**
 * All on-screen interface: the loading bar, the title menu over the live
 * scene, the pause menu, and the in-game readouts.
 *
 * Menus are navigable with the mouse, the keyboard and a gamepad, because the
 * game is meant to be played with either and a menu that needs a mouse breaks
 * that straight away.
 */

import type { QualityLevel, UserSettings } from '../core/Settings.ts';
import './ui.css';

export type Screen = 'loading' | 'title' | 'playing' | 'paused';

export interface InterfaceCallbacks {
  onStart: () => void;
  onResume: () => void;
  onReturnToTitle: () => void;
  onQualityChange: (quality: QualityLevel) => void;
  onSettingsChange: (settings: UserSettings) => void;
}

type ItemKind = 'button' | 'option';

interface MenuItem {
  id: string;
  label: string;
  kind: ItemKind;
  primary?: boolean;
  /** True when the value wraps round, so repeated clicks cycle through it. */
  cycle?: boolean;
  value?: () => string;
  activate?: () => void;
  adjust?: (direction: -1 | 1) => void;
  element?: HTMLElement;
  valueElement?: HTMLSpanElement;
}

const QUALITY_ORDER: QualityLevel[] = ['low', 'medium', 'high'];

const QUALITY_LABEL: Record<QualityLevel, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

const CONTROLS: Array<[string, string]> = [
  ['Move', 'W A S D  /  Left stick'],
  ['Camera', 'Mouse  /  Right stick'],
  ['Run', 'Push the stick fully'],
  ['Walk', 'Hold Shift  /  ease the stick'],
  ['Jump', 'Space  /  A'],
  ['Pick up, throw', 'E  /  X'],
  ['Dive, swim down', 'Ctrl  /  B'],
  ['Swim stroke', 'Space  /  A'],
  ['Climb', 'Walk into a tree trunk'],
  ['Pause', 'Esc  /  Start'],
];

export class Interface {
  private readonly root: HTMLDivElement;
  private readonly loader: HTMLDivElement;
  private readonly loaderFill: HTMLDivElement;
  private readonly loaderLabel: HTMLDivElement;
  private readonly titleMenu: HTMLDivElement;
  private readonly pauseMenu: HTMLDivElement;
  private readonly hud: HTMLDivElement;
  private readonly stats: HTMLDivElement;
  private readonly hints: HTMLDivElement;
  private readonly prompt: HTMLDivElement;
  private readonly underwaterTint: HTMLDivElement;

  private titleItems: MenuItem[] = [];
  private pauseItems: MenuItem[] = [];
  private activeIndex = 0;
  private screen: Screen = 'loading';

  private previousButtons: boolean[] = [];
  private axisLatch = 0;
  private keyHandler: ((event: KeyboardEvent) => void) | null = null;

  /**
   * `getSettings` reads the live settings from the game rather than keeping a
   * copy here. Two copies previously drifted apart, so the menu and the
   * performance panel could disagree about the active quality level.
   */
  constructor(
    container: HTMLElement,
    private readonly getSettings: () => UserSettings,
    private readonly callbacks: InterfaceCallbacks,
  ) {
    this.root = document.createElement('div');
    this.root.className = 'ui-root';
    container.appendChild(this.root);

    this.loader = this.buildLoader();
    this.loaderFill = this.loader.querySelector('.loader__fill') as HTMLDivElement;
    this.loaderLabel = this.loader.querySelector('.loader__label') as HTMLDivElement;

    this.titleMenu = this.buildTitleMenu();
    this.pauseMenu = this.buildPauseMenu();

    const hud = this.buildHud();
    this.hud = hud.root;
    this.stats = hud.stats;
    this.hints = hud.hints;
    this.prompt = hud.prompt;

    this.underwaterTint = document.createElement('div');
    this.underwaterTint.className = 'ui-root__underwater';
    this.root.appendChild(this.underwaterTint);

    this.attachKeyboard();
    this.setScreen('loading');
  }

  // -------------------------------------------------------------------------
  // Construction
  // -------------------------------------------------------------------------

  private buildLoader(): HTMLDivElement {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
      <div class="loader__label">Building the castle grounds</div>
      <div class="loader__bar"><div class="loader__fill"></div></div>
    `;
    this.root.appendChild(loader);
    return loader;
  }

  private buildTitleMenu(): HTMLDivElement {
    const menu = document.createElement('div');
    menu.className = 'menu menu--title';
    menu.hidden = true;

    const title = document.createElement('h1');
    title.className = 'menu__title';
    title.textContent = 'LetsGo';
    menu.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'menu__subtitle';
    subtitle.textContent = 'Castle Grounds · Milestone 1';
    menu.appendChild(subtitle);

    const panel = document.createElement('div');
    panel.className = 'menu__panel';
    menu.appendChild(panel);

    this.titleItems = [
      {
        id: 'start',
        label: 'Start',
        kind: 'button',
        primary: true,
        activate: () => this.callbacks.onStart(),
      },
      this.qualityItem(),
      this.sensitivityItem(),
      this.invertItem(),
    ];
    this.renderItems(this.titleItems, panel);

    const controls = document.createElement('div');
    controls.className = 'controls';
    for (const [action, key] of CONTROLS) {
      const row = document.createElement('div');
      row.className = 'controls__row';
      row.innerHTML = `<span class="controls__action"></span><span class="controls__key"></span>`;
      (row.children[0] as HTMLElement).textContent = action;
      (row.children[1] as HTMLElement).textContent = key;
      controls.appendChild(row);
    }
    menu.appendChild(controls);

    const note = document.createElement('p');
    note.className = 'menu__note';
    note.textContent =
      'Press a button on your controller once to wake it up — browsers only detect a gamepad after an input. There is no sound yet.';
    menu.appendChild(note);

    this.root.appendChild(menu);
    return menu;
  }

  private buildPauseMenu(): HTMLDivElement {
    const menu = document.createElement('div');
    menu.className = 'menu';
    menu.hidden = true;

    const heading = document.createElement('h2');
    heading.className = 'menu__heading';
    heading.textContent = 'Paused';
    menu.appendChild(heading);

    const panel = document.createElement('div');
    panel.className = 'menu__panel';
    menu.appendChild(panel);

    this.pauseItems = [
      {
        id: 'resume',
        label: 'Resume',
        kind: 'button',
        primary: true,
        activate: () => this.callbacks.onResume(),
      },
      this.qualityItem(),
      this.sensitivityItem(),
      this.invertItem(),
      {
        id: 'title',
        label: 'Back to title',
        kind: 'button',
        activate: () => this.callbacks.onReturnToTitle(),
      },
    ];
    this.renderItems(this.pauseItems, panel);

    const note = document.createElement('p');
    note.className = 'menu__note';
    note.textContent = 'Changing graphics quality applies immediately.';
    menu.appendChild(note);

    this.root.appendChild(menu);
    return menu;
  }

  private buildHud(): {
    root: HTMLDivElement;
    stats: HTMLDivElement;
    hints: HTMLDivElement;
    prompt: HTMLDivElement;
  } {
    const root = document.createElement('div');
    root.className = 'hud';
    root.hidden = true;

    const stats = document.createElement('div');
    stats.className = 'hud__stats';
    root.appendChild(stats);

    const hints = document.createElement('div');
    hints.className = 'hud__hints';
    hints.innerHTML = `
      Move <b>W A S D</b> · Jump <b>Space</b><br />
      Pick up <b>E</b> · Dive <b>Ctrl</b> · Pause <b>Esc</b><br />
      Performance panel <b>F3</b>
    `;
    root.appendChild(hints);

    const prompt = document.createElement('div');
    prompt.className = 'hud__prompt';
    root.appendChild(prompt);

    this.root.appendChild(root);
    return { root, stats, hints, prompt };
  }

  private qualityItem(): MenuItem {
    return {
      id: 'quality',
      label: 'Graphics',
      kind: 'option',
      cycle: true,
      value: () => QUALITY_LABEL[this.getSettings().quality],
      adjust: (direction) => {
        const current = this.getSettings().quality;
        const index = QUALITY_ORDER.indexOf(current);
        // Wraps round. Without this, clicking the row only ever stepped
        // upward and stuck at High with no way back to Low.
        const next =
          QUALITY_ORDER[(index + direction + QUALITY_ORDER.length) % QUALITY_ORDER.length];
        if (next === current) return;
        this.callbacks.onQualityChange(next);
        this.refreshValues();
      },
    };
  }

  private sensitivityItem(): MenuItem {
    return {
      id: 'sensitivity',
      label: 'Camera sensitivity',
      kind: 'option',
      value: () => `${this.getSettings().cameraSensitivity.toFixed(1)}×`,
      adjust: (direction) => {
        const current = this.getSettings();
        const next = Math.min(
          3,
          Math.max(0.2, Math.round((current.cameraSensitivity + direction * 0.1) * 10) / 10),
        );
        if (next === current.cameraSensitivity) return;
        this.callbacks.onSettingsChange({ ...current, cameraSensitivity: next });
        this.refreshValues();
      },
    };
  }

  private invertItem(): MenuItem {
    return {
      id: 'invert',
      label: 'Invert camera Y',
      kind: 'option',
      cycle: true,
      value: () => (this.getSettings().invertCameraY ? 'On' : 'Off'),
      adjust: () => {
        const current = this.getSettings();
        this.callbacks.onSettingsChange({ ...current, invertCameraY: !current.invertCameraY });
        this.refreshValues();
      },
    };
  }

  private renderItems(items: MenuItem[], panel: HTMLElement): void {
    items.forEach((item, index) => {
      const focus = () => {
        this.activeIndex = index;
        this.highlight();
      };

      if (item.kind === 'button') {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `menu-item${item.primary ? ' menu-item--primary' : ''}`;
        button.textContent = item.label;
        button.addEventListener('click', () => {
          focus();
          item.activate?.();
        });
        button.addEventListener('mouseenter', focus);
        item.element = button;
        panel.appendChild(button);
        return;
      }

      // Option rows carry their own arrow buttons, so a value can be stepped
      // in either direction with the mouse as well as with a key or a stick.
      const row = document.createElement('div');
      row.className = 'menu-item menu-item--option';
      row.addEventListener('mouseenter', focus);

      const label = document.createElement('span');
      label.className = 'menu-item__label';
      label.textContent = item.label;
      row.appendChild(label);

      const controls = document.createElement('div');
      controls.className = 'menu-item__controls';

      const makeArrow = (direction: -1 | 1, glyph: string, title: string) => {
        const arrow = document.createElement('button');
        arrow.type = 'button';
        arrow.className = 'menu-item__arrow';
        arrow.textContent = glyph;
        arrow.setAttribute('aria-label', `${title} ${item.label}`);
        arrow.addEventListener('click', (event) => {
          event.stopPropagation();
          focus();
          item.adjust?.(direction);
        });
        return arrow;
      };

      const value = document.createElement('span');
      value.className = 'menu-item__value';
      value.textContent = item.value ? item.value() : '';
      item.valueElement = value;

      controls.appendChild(makeArrow(-1, '\u25C0', 'Decrease'));
      controls.appendChild(value);
      controls.appendChild(makeArrow(1, '\u25B6', 'Increase'));
      row.appendChild(controls);

      // Clicking the row itself steps forward, but only where the value wraps,
      // so a slider cannot be driven to its end and left stuck there.
      if (item.cycle) {
        row.addEventListener('click', () => {
          focus();
          item.adjust?.(1);
        });
        row.classList.add('menu-item--clickable');
      }

      item.element = row;
      panel.appendChild(row);
    });
  }

  // -------------------------------------------------------------------------
  // Navigation
  // -------------------------------------------------------------------------

  private get currentItems(): MenuItem[] {
    if (this.screen === 'title') return this.titleItems;
    if (this.screen === 'paused') return this.pauseItems;
    return [];
  }

  private attachKeyboard(): void {
    this.keyHandler = (event: KeyboardEvent) => {
      const items = this.currentItems;
      if (items.length === 0) return;

      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.move(-1);
          event.preventDefault();
          break;
        case 'ArrowDown':
        case 'KeyS':
          this.move(1);
          event.preventDefault();
          break;
        case 'ArrowLeft':
        case 'KeyA':
          items[this.activeIndex]?.adjust?.(-1);
          event.preventDefault();
          break;
        case 'ArrowRight':
        case 'KeyD':
          items[this.activeIndex]?.adjust?.(1);
          event.preventDefault();
          break;
        case 'Enter':
        case 'Space': {
          const item = items[this.activeIndex];
          if (item?.kind === 'option') item.adjust?.(1);
          else item?.activate?.();
          event.preventDefault();
          break;
        }
        default:
          break;
      }
    };
    window.addEventListener('keydown', this.keyHandler);
  }

  /** Polls the gamepad for menu navigation; called every frame while a menu is up. */
  update(): void {
    const items = this.currentItems;
    if (items.length === 0) {
      this.previousButtons = [];
      return;
    }

    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    let pad: Gamepad | null = null;
    for (const candidate of pads) {
      if (candidate && candidate.connected) {
        pad = candidate;
        break;
      }
    }
    if (!pad) {
      this.previousButtons = [];
      return;
    }

    const buttons = pad.buttons.map((button) => button.pressed || button.value > 0.5);
    const pressed = (index: number) =>
      buttons[index] === true && this.previousButtons[index] !== true;

    if (pressed(12)) this.move(-1);
    if (pressed(13)) this.move(1);
    if (pressed(14)) items[this.activeIndex]?.adjust?.(-1);
    if (pressed(15)) items[this.activeIndex]?.adjust?.(1);
    if (pressed(0)) {
      const item = items[this.activeIndex];
      if (item?.kind === 'option') item.adjust?.(1);
      else item?.activate?.();
    }
    if (pressed(1) && this.screen === 'paused') this.callbacks.onResume();

    // The stick repeats only once it has returned to centre, so a held stick
    // does not race through the menu.
    const vertical = pad.axes[1] ?? 0;
    const horizontal = pad.axes[0] ?? 0;
    if (Math.abs(vertical) < 0.3 && Math.abs(horizontal) < 0.3) {
      this.axisLatch = 0;
    } else if (this.axisLatch === 0) {
      if (vertical < -0.5) {
        this.move(-1);
        this.axisLatch = 1;
      } else if (vertical > 0.5) {
        this.move(1);
        this.axisLatch = 1;
      } else if (horizontal < -0.5) {
        items[this.activeIndex]?.adjust?.(-1);
        this.axisLatch = 1;
      } else if (horizontal > 0.5) {
        items[this.activeIndex]?.adjust?.(1);
        this.axisLatch = 1;
      }
    }

    this.previousButtons = buttons;
  }

  private move(direction: number): void {
    const items = this.currentItems;
    if (items.length === 0) return;
    this.activeIndex = (this.activeIndex + direction + items.length) % items.length;
    this.highlight();
  }

  private highlight(): void {
    const items = this.currentItems;
    items.forEach((item, index) => {
      item.element?.classList.toggle('is-active', index === this.activeIndex);
    });
  }

  private refreshValues(): void {
    for (const item of [...this.titleItems, ...this.pauseItems]) {
      if (item.valueElement && item.value) item.valueElement.textContent = item.value();
    }
  }

  // -------------------------------------------------------------------------
  // Screens
  // -------------------------------------------------------------------------

  setScreen(screen: Screen): void {
    this.screen = screen;
    this.activeIndex = 0;

    this.loader.hidden = screen !== 'loading';
    this.titleMenu.hidden = screen !== 'title';
    this.pauseMenu.hidden = screen !== 'paused';
    this.hud.hidden = screen !== 'playing' && screen !== 'paused';

    this.refreshValues();
    this.highlight();
  }

  get currentScreen(): Screen {
    return this.screen;
  }

  setLoadingProgress(fraction: number, label?: string): void {
    this.loaderFill.style.width = `${Math.round(Math.min(1, Math.max(0, fraction)) * 100)}%`;
    if (label) this.loaderLabel.textContent = label;
  }

  async finishLoading(): Promise<void> {
    this.loader.classList.add('is-fading');
    await new Promise((resolve) => setTimeout(resolve, 430));
    this.loader.classList.remove('is-fading');
  }

  /** Re-reads the live settings into every menu row. */
  refresh(): void {
    this.refreshValues();
  }

  // -------------------------------------------------------------------------
  // In-game readouts
  // -------------------------------------------------------------------------

  setStats(lines: Array<[string, string, string?]>): void {
    this.stats.innerHTML = '';
    for (const [label, value, className] of lines) {
      const row = document.createElement('div');
      row.textContent = `${label.padEnd(11, ' ')}${value}`;
      if (className) row.className = className;
      this.stats.appendChild(row);
    }
  }

  setStatsVisible(visible: boolean): void {
    this.stats.hidden = !visible;
  }

  get statsVisible(): boolean {
    return !this.stats.hidden;
  }

  setPrompt(text: string | null): void {
    if (text) {
      this.prompt.textContent = text;
      this.prompt.classList.add('is-visible');
    } else {
      this.prompt.classList.remove('is-visible');
    }
  }

  /** Tints the whole view while the camera is below the waterline. */
  setUnderwater(underwater: boolean): void {
    this.underwaterTint.classList.toggle('is-visible', underwater);
  }

  setHintsVisible(visible: boolean): void {
    this.hints.hidden = !visible;
  }

  dispose(): void {
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler);
    this.root.remove();
  }
}
