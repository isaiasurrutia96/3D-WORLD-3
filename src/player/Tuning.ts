/**
 * Movement tuning, gathered in one place so the feel can be adjusted without
 * reading the controller.
 *
 * World units are metres, but the numbers are game-feel numbers rather than
 * physical ones: gravity is far stronger than reality so jumps are snappy, and
 * running speed is faster than a person can run because the reference it is
 * matched against is.
 */

export const TUNING = {
  // ---- Ground movement ---------------------------------------------------
  /** Speed at full stick deflection. */
  runSpeed: 8.6,
  /** Speed at the stick position where the character stops jogging. */
  walkSpeed: 3.1,
  /** How hard the character accelerates toward the desired speed. */
  acceleration: 32,
  /** Deceleration when the stick is released. Lower feels slippery. */
  deceleration: 26,
  /** Extra deceleration when input opposes current motion, i.e. a skid. */
  skidDeceleration: 46,
  /** Dot product below which input counts as "reversing" and triggers a skid. */
  skidDotThreshold: -0.55,
  /** Speed above which a reversal is a skid rather than a simple turn. */
  skidMinSpeed: 5.2,

  /** Turn rate when nearly stationary, radians per second. */
  turnRateSlow: 13,
  /** Turn rate at full speed. Slower, so fast running arcs rather than snaps. */
  turnRateFast: 5.2,

  // ---- Gait --------------------------------------------------------------
  /**
   * Fraction of a stride cycle each foot spends on the floor. Walking keeps
   * both feet down for part of the time, so it is over a half; running has a
   * moment with neither foot down, so it is well under.
   */
  gaitDutyWalk: 0.6,
  gaitDutyRun: 0.22,
  /**
   * How far the hips sit below standing height while a leg is taking the
   * weight. Crouching is what lets the leg sweep further, so a deeper stance
   * means a longer stride and fewer steps per second.
   */
  gaitCrouchWalk: 0.05,
  gaitCrouchRun: 0.072,
  /** How far the hips fall and rise within each step. */
  gaitBobWalk: 0.012,
  gaitBobRun: 0.042,
  /**
   * How far ahead the foot reaches at the top of its swing, as a multiple of
   * how far it sweeps while planted. The two are separate on purpose: the
   * sweep is limited by the leg's reach, the swing is not, and it is the
   * swing that makes a stride look long.
   */
  gaitSwingReach: 1.85,
  /** How high the shoe lifts off the floor as the leg swings through. */
  gaitLiftWalk: 0.055,
  gaitLiftRun: 0.3,
  /**
   * How much a planted foot is allowed to slide, as a fraction of the
   * character's speed. Zero pins the foot to the ground exactly, at the cost
   * of a faster stride; a little slip buys a calmer one.
   */
  gaitFootSlip: 0.1,
  /** Upper limit on stride cycles per second, as a safety rail. */
  gaitMaxCadence: 4,

  // ---- Jumping and air ---------------------------------------------------
  gravity: 27,
  /** Gravity multiplier while falling, which tightens the top of the arc. */
  fallGravityMultiplier: 1.42,
  /** Upward speed at take-off. Height is roughly v^2 / (2 * gravity). */
  jumpVelocity: 9.6,
  /**
   * The second and third jumps of a combo. Press jump again shortly after
   * landing from one, while still moving, and the next is higher.
   */
  doubleJumpVelocity: 11.5,
  tripleJumpVelocity: 13.5,
  /** How long after landing a combo jump can be continued. */
  jumpComboWindow: 0.26,
  /** Below this speed the combo will not continue; it is a running move. */
  jumpComboMinSpeed: 2.6,
  /**
   * How long the character rises before the somersault begins. Starting it
   * the instant the feet leave the ground looks like a trip rather than a
   * jump.
   */
  tripleJumpFlipDelay: 0.13,
  /**
   * The somersault finishes this long before landing, so the character comes
   * down on their feet rather than mid-rotation.
   */
  tripleJumpLandMargin: 0.07,
  /** Velocity retained when the jump button is released early. */
  jumpCutMultiplier: 0.42,
  terminalVelocity: 34,
  /** Horizontal acceleration available in the air. */
  airAcceleration: 14,
  /** Air drag applied when there is no input. */
  airDeceleration: 2.2,
  /** Turn rate in the air, which is deliberately tighter than full ground speed. */
  airTurnRate: 6.0,
  /** Grace period after walking off an edge during which a jump still works. */
  coyoteTime: 0.11,
  /** A jump pressed this long before landing is remembered and fires on landing. */
  jumpBufferTime: 0.14,

  // ---- Slopes ------------------------------------------------------------
  /** Surfaces steeper than this are walls, not floors. */
  maxWalkableSlopeDegrees: 52,
  /** How far down the character searches for ground when walking downhill. */
  groundSnapDistance: 0.42,
  /**
   * The tallest lip the character walks straight over instead of being
   * stopped by it. Kerbs, step edges and the seams between pieces of
   * scenery all fall under this, so ordinary ground never needs a jump.
   */
  stepHeight: 0.45,

  // ---- Swimming ----------------------------------------------------------
  swimSpeed: 3.4,
  swimAcceleration: 9,
  swimDrag: 2.6,
  /** Upward acceleration applied while submerged. */
  buoyancy: 9.5,
  /** Gravity while in water, before buoyancy. */
  swimGravity: 7.5,
  /** Impulse from one stroke of the jump button. */
  strokeImpulse: 4.6,
  /** Seconds before another stroke can be taken. */
  strokeCooldown: 0.52,
  /** Downward acceleration while the dive button is held. */
  diveAcceleration: 11,
  /**
   * Fraction of the character's height that sits below the waterline while
   * treading water, so head and shoulders stay clear.
   */
  floatSubmersion: 0.62,
  /** Vertical speed above which entering water makes a splash. */
  splashSpeed: 6,

  // ---- Carrying ----------------------------------------------------------
  /** Speed multiplier while holding something. */
  carrySpeedMultiplier: 0.82,
  /** How far in front the character can reach to pick something up. */
  carryReach: 1.9,
  /** Forward speed given to a thrown object. */
  throwSpeed: 11,
  throwLift: 4.2,

  // ---- Recovery ----------------------------------------------------------
  /** Falling below this height returns the character to the last safe spot. */
  killPlaneY: -45,
} as const;

export const MAX_WALKABLE_NORMAL_Y = Math.cos(
  (TUNING.maxWalkableSlopeDegrees * Math.PI) / 180,
);
