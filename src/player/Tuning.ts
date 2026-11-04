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
   *
   * This is the longest that wait is ever allowed to be, reached on a jump
   * held to full height. On a short one it is cut right down, because the
   * pause is taken as a share of the whole time in the air rather than as a
   * fixed number of seconds: a tenth of a second is nothing on a long jump
   * and a fifth of a short one.
   */
  tripleJumpFlipDelay: 0.13,
  /**
   * The wait is this share of however much time in the air there is beyond
   * the bare minimum below. A jump with barely any air to spare gets no
   * wait worth having; one held to full height gets all of it.
   */
  tripleJumpFlipDelayShare: 0.3,
  /** Air below this is all needed for turning, so none of it is spent rising. */
  tripleJumpFlipMinAirtime: 0.45,
  /** The shortest that wait can be, so the lowest flip is still not a trip. */
  tripleJumpFlipDelayMin: 0.035,
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
