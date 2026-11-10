/**
 * The on-screen controls for playing on a phone.
 *
 * It does not know anything about the character. It turns fingers into the
 * same actions a keyboard produces and hands them to the same Input object,
 * so every move behaves exactly as it does on a desktop: the controller is
 * not told which of the two it is talking to.
 *
 * Two things govern the shape of it. A thumb cannot hold a modifier, a
 * direction and a jump at once, so the three moves that need all three on a
 * keyboard get buttons of their own. And a touch can end without anyone
 * letting go — the browser claims it for a gesture, the page is hidden, a
 * call arrives — so every path out of a press leads to the same release.
 */

import type { ActionName, Input } from '../input/Input.ts';

/** What each button sends. Order matters only in that all of it is sent. */
const BUTTONS: Array<{
  id: string;
  label: string;
  hint: string;
  actions: ActionName[];
}> = [
  {
    id: 'jump',
    label: 'JUMP',
    hint: 'Jump · again on landing for a combo · again in the air to boost, and again to pound',
    actions: ['jump'],
  },
  {
    id: 'back',
    label: 'BACK\nFLIP',
    hint: 'Backflip',
    // Straight to the move, rather than a crouch he would have to hold.
    actions: ['backflip'],
  },
  {
    id: 'side',
    label: 'SIDE',
    hint: 'Side jump',
    // On the ground it takes off and flips; in the air it adds the flip to a
    // jump already running, which is what the keyboard's own button does.
    actions: ['sideJump', 'sideFlip'],
  },
  {
    id: 'dive',
    label: 'DIVE',
    hint: 'Forward dive · in water, dive and steer by looking · lets go of a ledge',
    // Crouch goes with it: in water that is the dive, on a ledge it is the
    // way down, and on land it is the crouch there is otherwise no room for.
    actions: ['diveJump', 'crouch'],
  },
];

/** How far from its middle the stick has to move before it means anything. */
const STICK_DEAD = 0.14;

export class TouchControls {
  readonly root: HTMLDivElement;

  private readonly lookZone: HTMLDivElement;
  private readonly stickZone: HTMLDivElement;
  private readonly stickBase: HTMLDivElement;
  private readonly stickKnob: HTMLDivElement;

  /** The pointer driving the stick, and where it first went down. */
  private stickPointer: number | null = null;
  private stickOriginX = 0;
  private stickOriginY = 0;
  private stickRadius = 60;

  /** Every pointer currently holding a button, and what it holds. */
  private readonly pressed = new Map<number, { element: HTMLElement; actions: ActionName[] }>();

  /** The pointer turning the camera, and where it was last seen. */
  private lookPointer: number | null = null;
  private lookX = 0;
  private lookY = 0;

  private readonly disposers: Array<() => void> = [];

  constructor(
    private readonly input: Input,
    parent: HTMLElement,
  ) {
    this.root = document.createElement('div');
    this.root.className = 'touch';

    // Underneath everything else: whatever part of the screen is not a
    // control is somewhere to drag the camera. Movement is measured against
    // where the camera is looking and the underwater steering is the camera
    // itself, so without this half the game is unreachable on a phone.
    this.lookZone = document.createElement('div');
    this.lookZone.className = 'touch__look';
    this.root.appendChild(this.lookZone);

    this.stickZone = document.createElement('div');
    this.stickZone.className = 'touch__stick-zone';
    this.stickBase = document.createElement('div');
    this.stickBase.className = 'touch__stick-base';
    this.stickKnob = document.createElement('div');
    this.stickKnob.className = 'touch__stick-knob';
    this.stickBase.appendChild(this.stickKnob);
    this.stickZone.appendChild(this.stickBase);
    this.root.appendChild(this.stickZone);

    const pad = document.createElement('div');
    pad.className = 'touch__pad';
    for (const button of BUTTONS) {
      const element = document.createElement('button');
      element.type = 'button';
      element.className = `touch__button touch__button--${button.id}`;
      element.textContent = button.label;
      element.setAttribute('aria-label', button.hint);
      // Buttons are for fingers, not for the keyboard: a focused button would
      // swallow the space bar, which is the jump key.
      element.tabIndex = -1;
      this.bindButton(element, button.actions);
      pad.appendChild(element);
    }
    this.root.appendChild(pad);

    this.bindStick();
    this.bindLook();
    this.bindPanic();

    parent.appendChild(this.root);
  }

  dispose(): void {
    for (const dispose of this.disposers) dispose();
    this.disposers.length = 0;
    this.root.remove();
  }

  // ---- The stick -----------------------------------------------------------

  private bindStick(): void {
    const zone = this.stickZone;

    const down = (event: PointerEvent) => {
      if (this.stickPointer !== null) return;
      this.stickPointer = event.pointerId;
      zone.setPointerCapture(event.pointerId);
      // The stick appears under the thumb rather than waiting for the thumb
      // to find it, which is the difference between reaching and playing.
      const bounds = zone.getBoundingClientRect();
      this.stickOriginX = event.clientX;
      this.stickOriginY = event.clientY;
      this.stickRadius = Math.max(48, Math.min(bounds.width, bounds.height) * 0.3);
      this.stickBase.style.left = `${event.clientX - bounds.left}px`;
      this.stickBase.style.top = `${event.clientY - bounds.top}px`;
      this.stickBase.style.width = `${this.stickRadius * 2}px`;
      this.stickBase.style.height = `${this.stickRadius * 2}px`;
      this.stickBase.classList.add('is-live');
      this.moveStick(event);
      event.preventDefault();
    };

    const move = (event: PointerEvent) => {
      if (event.pointerId !== this.stickPointer) return;
      this.moveStick(event);
      event.preventDefault();
    };

    const up = (event: PointerEvent) => {
      if (event.pointerId !== this.stickPointer) return;
      this.releaseStick();
      event.preventDefault();
    };

    zone.addEventListener('pointerdown', down);
    zone.addEventListener('pointermove', move);
    zone.addEventListener('pointerup', up);
    zone.addEventListener('pointercancel', up);
    this.disposers.push(() => {
      zone.removeEventListener('pointerdown', down);
      zone.removeEventListener('pointermove', move);
      zone.removeEventListener('pointerup', up);
      zone.removeEventListener('pointercancel', up);
    });
  }

  private moveStick(event: PointerEvent): void {
    const dx = event.clientX - this.stickOriginX;
    const dy = event.clientY - this.stickOriginY;
    const distance = Math.hypot(dx, dy);
    const clamped = Math.min(1, distance / this.stickRadius);
    const nx = distance > 0 ? dx / distance : 0;
    const ny = distance > 0 ? dy / distance : 0;

    this.stickKnob.style.transform = `translate(-50%, -50%) translate(${
      nx * clamped * this.stickRadius
    }px, ${ny * clamped * this.stickRadius}px)`;

    if (clamped < STICK_DEAD) {
      this.input.setTouchStick(0, 0);
      return;
    }
    // Rescaled past the dead zone so the slowest usable push is still a walk
    // rather than a jump from nothing to half speed.
    const strength = (clamped - STICK_DEAD) / (1 - STICK_DEAD);
    // Screen down is forward, which is what the keyboard's forward key means.
    this.input.setTouchStick(nx * strength, ny * strength);
  }

  private releaseStick(): void {
    if (this.stickPointer !== null) {
      try {
        this.stickZone.releasePointerCapture(this.stickPointer);
      } catch {
        // The capture is already gone, which is the state we wanted anyway.
      }
    }
    this.stickPointer = null;
    this.stickBase.classList.remove('is-live');
    this.stickKnob.style.transform = 'translate(-50%, -50%)';
    this.input.setTouchStick(null);
  }

  // ---- Looking around ------------------------------------------------------

  private bindLook(): void {
    const zone = this.lookZone;

    const down = (event: PointerEvent) => {
      if (this.lookPointer !== null) return;
      this.lookPointer = event.pointerId;
      this.lookX = event.clientX;
      this.lookY = event.clientY;
      zone.setPointerCapture(event.pointerId);
      event.preventDefault();
    };

    const move = (event: PointerEvent) => {
      if (event.pointerId !== this.lookPointer) return;
      // In the same units a mouse move gives, so one sensitivity setting
      // covers both and neither needs a special case downstream.
      this.input.addLook((event.clientX - this.lookX) * 1.35, (event.clientY - this.lookY) * 1.35);
      this.lookX = event.clientX;
      this.lookY = event.clientY;
      event.preventDefault();
    };

    const up = (event: PointerEvent) => {
      if (event.pointerId !== this.lookPointer) return;
      this.releaseLook();
      event.preventDefault();
    };

    zone.addEventListener('pointerdown', down);
    zone.addEventListener('pointermove', move);
    zone.addEventListener('pointerup', up);
    zone.addEventListener('pointercancel', up);
    zone.addEventListener('lostpointercapture', up);
    this.disposers.push(() => {
      zone.removeEventListener('pointerdown', down);
      zone.removeEventListener('pointermove', move);
      zone.removeEventListener('pointerup', up);
      zone.removeEventListener('pointercancel', up);
      zone.removeEventListener('lostpointercapture', up);
    });
  }

  private releaseLook(): void {
    if (this.lookPointer !== null) {
      try {
        this.lookZone.releasePointerCapture(this.lookPointer);
      } catch {
        // Already gone, which is where we were headed.
      }
    }
    this.lookPointer = null;
  }

  // ---- The buttons ---------------------------------------------------------

  private bindButton(element: HTMLElement, actions: ActionName[]): void {
    const down = (event: PointerEvent) => {
      if (this.pressed.has(event.pointerId)) return;
      element.setPointerCapture(event.pointerId);
      this.pressed.set(event.pointerId, { element, actions });
      element.classList.add('is-down');
      for (const action of actions) this.input.holdAction(action, true);
      event.preventDefault();
      event.stopPropagation();
    };

    const up = (event: PointerEvent) => {
      const held = this.pressed.get(event.pointerId);
      if (!held || held.element !== element) return;
      this.releaseButton(event.pointerId);
      event.preventDefault();
      event.stopPropagation();
    };

    element.addEventListener('pointerdown', down);
    element.addEventListener('pointerup', up);
    element.addEventListener('pointercancel', up);
    // A finger that slides off the button lets go of it. With the pointer
    // captured this only fires when the capture itself is taken away, which
    // is exactly the case that used to leave a button stuck on.
    element.addEventListener('lostpointercapture', up);
    // And a button must never be a link or a text selection.
    const swallow = (event: Event) => event.preventDefault();
    element.addEventListener('contextmenu', swallow);
    element.addEventListener('dragstart', swallow);

    this.disposers.push(() => {
      element.removeEventListener('pointerdown', down);
      element.removeEventListener('pointerup', up);
      element.removeEventListener('pointercancel', up);
      element.removeEventListener('lostpointercapture', up);
      element.removeEventListener('contextmenu', swallow);
      element.removeEventListener('dragstart', swallow);
    });
  }

  private releaseButton(pointerId: number): void {
    const held = this.pressed.get(pointerId);
    if (!held) return;
    this.pressed.delete(pointerId);
    held.element.classList.remove('is-down');
    for (const action of held.actions) this.input.holdAction(action, false);
  }

  // ---- Letting go of everything -------------------------------------------

  private bindPanic(): void {
    const releaseAll = () => {
      for (const pointerId of Array.from(this.pressed.keys())) this.releaseButton(pointerId);
      this.releaseStick();
      this.releaseLook();
      // And anything the two of them between them failed to account for.
      this.input.releaseTouch();
    };

    const onHidden = () => {
      if (document.visibilityState === 'hidden') releaseAll();
    };

    document.addEventListener('visibilitychange', onHidden);
    window.addEventListener('blur', releaseAll);
    window.addEventListener('pagehide', releaseAll);
    this.disposers.push(() => {
      document.removeEventListener('visibilitychange', onHidden);
      window.removeEventListener('blur', releaseAll);
      window.removeEventListener('pagehide', releaseAll);
    });
  }
}

/**
 * Whether this is a device to show the touch layout on.
 *
 * Asked of the pointer rather than of the user agent, because what matters is
 * whether there is a thumb on the glass and not what the browser calls
 * itself. `?touch=1` and `?touch=0` force it either way, which is how it gets
 * tested without a phone in hand.
 */
export function wantsTouchControls(): boolean {
  const forced = new URLSearchParams(window.location.search).get('touch');
  if (forced === '1' || forced === 'true') return true;
  if (forced === '0' || forced === 'false') return false;
  if (navigator.maxTouchPoints > 0 && window.matchMedia('(pointer: coarse)').matches) return true;
  return false;
}

/**
 * Stops the page behaving like a page: no scrolling it, no pinching it, no
 * double tap to zoom into it. Touching the controls has to be playing the
 * game and nothing else.
 */
export function suppressPageGestures(): () => void {
  const stop = (event: Event) => {
    if (event.cancelable) event.preventDefault();
  };

  // A single finger is movement; a second one is a pinch, and neither is a
  // scroll. The listener has to be non-passive to be allowed to say so.
  const onTouchMove = (event: TouchEvent) => {
    if (event.cancelable) event.preventDefault();
  };

  // Safari does its own thing with pinch, under its own events.
  document.addEventListener('gesturestart', stop);
  document.addEventListener('gesturechange', stop);
  document.addEventListener('gestureend', stop);
  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('dblclick', stop);

  return () => {
    document.removeEventListener('gesturestart', stop);
    document.removeEventListener('gesturechange', stop);
    document.removeEventListener('gestureend', stop);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('dblclick', stop);
  };
}
