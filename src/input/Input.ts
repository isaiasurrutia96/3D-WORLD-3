/**
 * Unified input for keyboard + mouse and a Bluetooth gamepad.
 *
 * Movement is reported as an analogue vector so the character controller can
 * tell a gentle walk from a full run. The keyboard reports full deflection and
 * uses Shift as an explicit walk modifier; a stick reports its real magnitude.
 *
 * Browsers only expose a gamepad after the player presses a button on it, so
 * `gamepadConnected` can start false and become true mid-session.
 */

import { Vector2 } from 'three';

export type ActionName =
  | 'jump'
  | 'grab'
  | 'interact'
  | 'pause'
  | 'dive'
  | 'crouch'
  | 'sideFlip'
  | 'climbDown'
  /**
   * The forward key as a button rather than as an axis.
   *
   * Pulling up off a ledge has to answer a fresh press. Reading the movement
   * axis instead meant that anyone still holding forward from the run-up was
   * hauled over the edge the instant they caught it, with no hang at all.
   */
  | 'forward'
  | 'togglePointerLock';

const STICK_DEADZONE = 0.22;
const MAX_MOUSE_DELTA = 180;
const TRIGGER_THRESHOLD = 0.5;

export class Input {
  readonly move = new Vector2();
  readonly look = new Vector2();

  gamepadConnected = false;
  /**
   * The `code` of the most recent key the page received, and whether the game
   * recognised it. Shown in the readout: if a key never appears here, the
   * browser is not delivering it to the page at all, which is a different
   * problem from the game ignoring it.
   */
  lastKey = '—';
  lastKeyRecognised = false;
  /** True while the most recent meaningful input came from a gamepad. */
  usingGamepad = false;

  private readonly keys = new Set<string>();
  private readonly held = new Set<ActionName>();

  // Presses arrive from DOM events between frames, so they are queued here and
  // swapped into the per-frame sets at the start of update(). Clearing the
  // per-frame sets directly would discard any press that landed between two
  // frames, which is most of them.
  private readonly pendingPresses = new Set<ActionName>();
  private readonly pendingReleases = new Set<ActionName>();
  private readonly pressedThisFrame = new Set<ActionName>();
  private readonly releasedThisFrame = new Set<ActionName>();

  private readonly mouseDelta = new Vector2();
  private pointerLocked = false;
  private pointerLockWanted = false;
  /**
   * The first mousemove after pointer lock engages often carries the jump from
   * the cursor's old position to the centre of the screen, which would whip
   * the camera around. It is discarded.
   */
  private discardNextMouseMove = false;

  private previousButtons: boolean[] = [];
  private element: HTMLElement | null = null;
  private disposers: Array<() => void> = [];

  attach(element: HTMLElement): void {
    this.element = element;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      this.keys.add(event.code);
      this.lastKey = event.code;
      this.lastKeyRecognised =
        MOVEMENT_KEYS.has(event.code) ||
        KEY_ACTIONS[event.code] !== undefined ||
        event.code === 'ShiftLeft' ||
        event.code === 'ShiftRight';
      this.usingGamepad = false;
      const action = KEY_ACTIONS[event.code];
      if (action) {
        this.press(action);
        if (action !== 'pause') event.preventDefault();
      }
      if (MOVEMENT_KEYS.has(event.code)) event.preventDefault();
    };

    const onKeyUp = (event: KeyboardEvent) => {
      this.keys.delete(event.code);
      const action = KEY_ACTIONS[event.code];
      if (action) this.release(action);
    };

    const onBlur = () => this.clear();

    const onMouseMove = (event: MouseEvent) => {
      if (!this.pointerLocked) return;
      if (this.discardNextMouseMove) {
        this.discardNextMouseMove = false;
        return;
      }
      // Clamp each event so a spurious jump cannot spin the view; a genuine
      // fast flick still arrives as several events in the same frame.
      this.mouseDelta.x += clampDelta(event.movementX);
      this.mouseDelta.y += clampDelta(event.movementY);
      this.usingGamepad = false;
    };

    const onPointerLockChange = () => {
      const locked = document.pointerLockElement === this.element;
      if (locked && !this.pointerLocked) {
        this.discardNextMouseMove = true;
        this.mouseDelta.set(0, 0);
      }
      this.pointerLocked = locked;
    };

    const onMouseDown = () => {
      if (this.pointerLockWanted && !this.pointerLocked) this.requestPointerLock();
    };

    const onGamepadConnected = () => {
      this.gamepadConnected = true;
    };
    const onGamepadDisconnected = () => {
      this.gamepadConnected = navigator.getGamepads().some((pad) => pad !== null);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('pointerlockchange', onPointerLockChange);
    element.addEventListener('mousedown', onMouseDown);
    window.addEventListener('gamepadconnected', onGamepadConnected);
    window.addEventListener('gamepaddisconnected', onGamepadDisconnected);

    this.disposers = [
      () => window.removeEventListener('keydown', onKeyDown),
      () => window.removeEventListener('keyup', onKeyUp),
      () => window.removeEventListener('blur', onBlur),
      () => document.removeEventListener('mousemove', onMouseMove),
      () => document.removeEventListener('pointerlockchange', onPointerLockChange),
      () => element.removeEventListener('mousedown', onMouseDown),
      () => window.removeEventListener('gamepadconnected', onGamepadConnected),
      () => window.removeEventListener('gamepaddisconnected', onGamepadDisconnected),
    ];
  }

  dispose(): void {
    for (const dispose of this.disposers) dispose();
    this.disposers = [];
    this.clear();
  }

  /** Called once per frame, before the character controller reads input. */
  update(sensitivity: number, invertY: boolean): void {
    this.pressedThisFrame.clear();
    this.releasedThisFrame.clear();
    for (const action of this.pendingPresses) this.pressedThisFrame.add(action);
    for (const action of this.pendingReleases) this.releasedThisFrame.add(action);
    this.pendingPresses.clear();
    this.pendingReleases.clear();

    this.move.set(0, 0);
    this.look.set(0, 0);

    // ---- Keyboard movement -------------------------------------------------
    // E S D F, with the arrow keys kept as an alternative.
    let kx = 0;
    let kz = 0;
    if (this.keys.has('KeyE') || this.keys.has('ArrowUp')) kz -= 1;
    if (this.keys.has('KeyD') || this.keys.has('ArrowDown')) kz += 1;
    if (this.keys.has('KeyS') || this.keys.has('ArrowLeft')) kx -= 1;
    if (this.keys.has('KeyF') || this.keys.has('ArrowRight')) kx += 1;
    if (kx !== 0 || kz !== 0) {
      this.move.set(kx, kz).normalize();
      // Shift walks. Without it the keyboard commits to a full run, which is
      // what a digital key should mean.
      if (this.keys.has('ShiftLeft') || this.keys.has('ShiftRight')) {
        this.move.multiplyScalar(0.45);
      }
    }

    // ---- Mouse / keyboard camera ------------------------------------------
    this.look.x += this.mouseDelta.x * 0.0022 * sensitivity;
    this.look.y += this.mouseDelta.y * 0.0022 * sensitivity * (invertY ? -1 : 1);
    this.mouseDelta.set(0, 0);

    const keyLookSpeed = 0.035 * sensitivity;
    if (this.keys.has('KeyJ')) this.look.x -= keyLookSpeed;
    if (this.keys.has('KeyL')) this.look.x += keyLookSpeed;
    if (this.keys.has('KeyI')) this.look.y -= keyLookSpeed * (invertY ? -1 : 1);
    if (this.keys.has('KeyK')) this.look.y += keyLookSpeed * (invertY ? -1 : 1);

    this.pollGamepad(sensitivity, invertY);
  }

  private pollGamepad(sensitivity: number, invertY: boolean): void {
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

    this.gamepadConnected = true;

    const moveX = applyDeadzone(pad.axes[0] ?? 0);
    const moveY = applyDeadzone(pad.axes[1] ?? 0);
    if (moveX !== 0 || moveY !== 0) {
      // The stick's real magnitude drives walk-versus-run, which is the whole
      // reason analogue input matters for this movement style.
      const magnitude = Math.min(1, Math.hypot(moveX, moveY));
      const length = Math.hypot(moveX, moveY) || 1;
      this.move.set((moveX / length) * magnitude, (moveY / length) * magnitude);
      this.usingGamepad = true;
    }

    const lookX = applyDeadzone(pad.axes[2] ?? 0);
    const lookY = applyDeadzone(pad.axes[3] ?? 0);
    if (lookX !== 0 || lookY !== 0) {
      this.look.x += lookX * 0.045 * sensitivity;
      this.look.y += lookY * 0.035 * sensitivity * (invertY ? -1 : 1);
      this.usingGamepad = true;
    }

    const buttons = pad.buttons.map(
      (button) => button.pressed || button.value > TRIGGER_THRESHOLD,
    );
    for (const [indexText, action] of Object.entries(GAMEPAD_ACTIONS)) {
      const index = Number(indexText);
      const now = buttons[index] === true;
      const before = this.previousButtons[index] === true;
      if (now && !before) {
        if (!this.held.has(action)) this.pressedThisFrame.add(action);
        this.held.add(action);
        this.usingGamepad = true;
      } else if (!now && before) {
        if (this.held.delete(action)) this.releasedThisFrame.add(action);
      }
    }
    this.previousButtons = buttons;
  }

  private press(action: ActionName): void {
    if (!this.held.has(action)) this.pendingPresses.add(action);
    this.held.add(action);
  }

  private release(action: ActionName): void {
    if (this.held.delete(action)) this.pendingReleases.add(action);
  }

  isDown(action: ActionName): boolean {
    return this.held.has(action);
  }

  wasPressed(action: ActionName): boolean {
    return this.pressedThisFrame.has(action);
  }

  wasReleased(action: ActionName): boolean {
    return this.releasedThisFrame.has(action);
  }

  /** Magnitude of the movement stick, 0 to 1. */
  get moveStrength(): number {
    return Math.min(1, this.move.length());
  }

  setPointerLockWanted(wanted: boolean): void {
    this.pointerLockWanted = wanted;
    if (!wanted && this.pointerLocked) document.exitPointerLock();
  }

  /** Locks the pointer if it is free, and frees it if it is locked. */
  togglePointerLock(): void {
    if (this.pointerLocked) {
      this.pointerLockWanted = false;
      document.exitPointerLock();
    } else {
      this.pointerLockWanted = true;
      this.requestPointerLock();
    }
  }

  requestPointerLock(): void {
    if (!this.element || this.pointerLocked) return;
    const result = this.element.requestPointerLock() as unknown;
    // Safari returns undefined here while Firefox and Chrome return a promise.
    if (result && typeof (result as Promise<void>).catch === 'function') {
      (result as Promise<void>).catch(() => {
        /* The browser may refuse without a recent user gesture. */
      });
    }
  }

  get isPointerLocked(): boolean {
    return this.pointerLocked;
  }

  clear(): void {
    this.keys.clear();
    this.held.clear();
    this.pendingPresses.clear();
    this.pendingReleases.clear();
    this.pressedThisFrame.clear();
    this.releasedThisFrame.clear();
    this.mouseDelta.set(0, 0);
    this.move.set(0, 0);
    this.look.set(0, 0);
    this.discardNextMouseMove = true;
  }
}

/** Caps a single mouse event's movement, in pixels. */
function clampDelta(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(-MAX_MOUSE_DELTA, Math.min(MAX_MOUSE_DELTA, value));
}

function applyDeadzone(value: number): number {
  if (Math.abs(value) < STICK_DEADZONE) return 0;
  const sign = Math.sign(value);
  // Rescale so the usable range still reaches full deflection.
  return sign * ((Math.abs(value) - STICK_DEADZONE) / (1 - STICK_DEADZONE));
}

const KEY_ACTIONS: Record<string, ActionName | undefined> = {
  Space: 'jump',
  KeyR: 'grab',
  // C crouches on land. Q dives in water, where there is nothing to crouch
  // for, and Ctrl still does the same.
  KeyC: 'crouch',
  KeyQ: 'dive',
  ControlLeft: 'dive',
  KeyL: 'togglePointerLock',
  Escape: 'pause',
  KeyW: 'interact',
  KeyA: 'sideFlip',
  KeyG: 'climbDown',
  // Also a movement key; the two readings do not interfere, because movement
  // is taken from the held-key set and this from the press queue.
  KeyE: 'forward',
  ArrowUp: 'forward',
};

const GAMEPAD_ACTIONS: Record<number, ActionName> = {
  0: 'jump', // A / cross
  2: 'grab', // X / square
  3: 'sideFlip', // Y / triangle
  1: 'dive', // B / circle
  6: 'crouch', // left trigger
  9: 'pause', // start
};

const MOVEMENT_KEYS = new Set([
  'KeyE',
  'KeyS',
  'KeyD',
  'KeyF',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
]);
