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

  // ---- Crouching, and the jumps that come out of it -----------------------
  /**
   * How hard a crouch sheds speed. Crouching while running is a slide, not a
   * stop: it has to last long enough to turn into a long jump.
   */
  crouchDeceleration: 11,
  /** Top speed while crouched, so a crouch cannot be used to run around in. */
  crouchSpeed: 1.6,
  /** Turn rate while crouched, in radians per second. */
  crouchTurnRate: 3.4,

  /** Above this speed, a jump from a crouch is a long jump. */
  longJumpMinSpeed: 4.2,
  /** Forward speed a long jump leaves the ground with. */
  longJumpSpeed: 17.5,
  /** Upward speed of a long jump. Low: the distance comes from the speed. */
  longJumpVelocity: 8.6,
  /** Air control is cut during a long jump, so it commits to its arc. */
  longJumpAirControl: 0.25,

  /** At or below this speed, a jump from a crouch is a backflip. */
  backflipMaxSpeed: 3,
  /** Upward speed of a backflip. */
  backflipVelocity: 13,
  /** How fast a backflip travels backwards. */
  backflipSpeed: 5.4,

  // ---- Wall kicks ---------------------------------------------------------
  /**
   * How long after touching a wall a kick off it still works. Without a
   * window, the kick would have to be pressed on the exact frame of contact.
   */
  wallKickWindow: 0.18,
  /** Upward speed a wall kick leaves with. */
  wallKickVelocity: 11.2,
  /** Speed away from the wall. */
  wallKickSpeed: 8.4,
  /** How many kicks one trip through the air allows, so walls are not ladders. */
  wallKickLimit: 4,
  /** Downward speed while sliding against a wall, which slows the fall. */
  wallSlideSpeed: 3.4,

  // ---- The side flip -------------------------------------------------------
  /**
   * Turning hard at a run and jumping during the turn throws him sideways
   * over his own shoulder. It is the one jump that comes out of a skid, and
   * it exists because a hard reversal is already a distinct thing the
   * controller knows about.
   */
  /**
   * How high the side flip tops out above where the jump started.
   *
   * Written as a height rather than a speed because the flip converts a jump
   * already in the air: setting a fixed speed meant pressing the button a
   * tenth of a second later sent him half a metre higher, so the same move
   * came out at anything between three and five metres. The speed needed is
   * worked out from where he is when the button lands. It sits below the
   * triple jump on purpose — that stays the highest thing he can do.
   */
  sideFlipApex: 3,
  /** The least it can give, so a late press is still a boost. */
  sideFlipLeastVelocity: 4.5,
  /** How fast it carries him in the new direction. */
  sideFlipSpeed: 5,
  /**
   * How far apart the jump and the flip button may be and still count as one
   * move, in either order.
   *
   * It used to come out of a hard turn at a run, which is how the original
   * does it and which turned out to be very hard to ask for on purpose: the
   * turn has to be sharp enough to count as a skid and the jump has to land
   * inside it. A button and a window are something you can aim at.
   */
  sideFlipWindow: 0.3,

  // ---- The ground pound ----------------------------------------------------
  /**
   * Press jump twice quickly in the air and he stops dead, turns over, and
   * drives himself into the ground. This is the window between the two
   * presses.
   */
  groundPoundWindow: 0.32,
  /** How long he hangs before the drop. The pause is most of the move. */
  groundPoundHover: 0.22,
  /** How fast he comes down. Far quicker than falling. */
  groundPoundSpeed: 34,
  /** How long he is planted on landing before he can move again. */
  groundPoundRecovery: 0.3,

  // ---- Ladders -------------------------------------------------------------
  /** How far from a ladder he will catch hold of it. */
  ladderSnagDistance: 0.85,
  /** How fast he goes up and down one. */
  ladderSpeed: 2.8,
  /** How far he stands off the face of the ladder while on it. */
  ladderStandOff: 0.42,
  /** Push away from the ladder when he jumps off backwards. */
  ladderJumpOff: 4.5,
  /**
   * How far below the top of a ladder he stops climbing, so the edge above
   * is within the band the climb over it can reach.
   */
  ladderTopGap: 1.2,

  // ---- Getting over a ledge ------------------------------------------------
  /**
   * How far in front of him the search for a ledge reaches. A little over
   * the width of his body, so the surface has to be within arm's length.
   */
  ledgeReach: 0.62,
  /**
   * The band, measured from his feet, in which a ledge can be caught. The
   * low figure is about chest height and the high one is just over his head:
   * below the first he would step up rather than climb, and above the second
   * his hands would not reach.
   */
  ledgeGrabLow: 0.75,
  ledgeGrabHigh: 1.95,
  /** Rising faster than this, he is still going up and does not grab. */
  ledgeGrabRise: 3,
  /**
   * How far past the edge the surface has to carry on before the climb is
   * treated as getting onto a roof rather than over a wall.
   */
  ledgeWideDepth: 1.15,
  /** Where he ends up, measured past the edge, for each of the climbs. */
  ledgeStandNarrow: 0.5,
  ledgeStandWide: 0.95,
  /**
   * And for a top too narrow to stand on, where he is carried to instead. A
   * thin wall is vaulted rather than climbed: he goes over it and down the
   * far side rather than balancing on the top.
   */
  ledgeVaultOver: 1.15,
  /**
   * How far in front of his centre line his hands are while he holds the
   * edge. Used to work out the shoulder and elbow that keep them there.
   */
  ledgeHandForward: 0.36,
  /**
   * How far above his feet the edge sits once he has taken hold.
   *
   * Without settling him onto a hang, he keeps whatever height he happened
   * to catch at, which is often with the edge level with his shoulders — so
   * his arms reach out in front rather than up, and it reads as standing
   * beside the thing rather than hanging off it. His shoulders are 1.27
   * above his feet and his arms are 0.66 long, so an edge about this far up
   * is one he hangs from with his hands over his head.
   */
  ledgeHangLift: 1.72,
  /** The most he is allowed to be settled down, and up, onto that hang. */
  ledgeSettleDown: 0.8,
  ledgeSettleUp: 0.25,
  /** How long each climb takes. Hauling onto a roof is the slower of the two. */
  ledgeSwingSeconds: 0.52,
  ledgeMantleSeconds: 0.8,
  ledgeVaultSeconds: 0.5,
  /** How long after a climb before another one can start. */
  ledgeCooldown: 0.25,

  // ---- Braking ------------------------------------------------------------
  /**
   * Above this speed, letting go of the stick is a skid rather than a
   * slowdown: he digs his heels in and slides to a stop.
   */
  brakeMinSpeed: 5.4,
  /** Below this speed the skid is over and he is simply standing. */
  brakeEndSpeed: 1.2,
  /**
   * How far the skid carries him, from a short burst of running to a
   * sustained one.
   *
   * It is written as a distance rather than a braking force because the
   * distance is the thing being judged by eye, and because the force that
   * produces it depends on the speed he is carrying. The short figure is
   * deliberately small: a couple of steps and a stop should not look like a
   * skid on ice.
   */
  brakeSlideShort: 0.762,
  brakeSlideLong: 2.03,
  /**
   * How long he has to keep running before the full slide is earned.
   *
   * Speed alone cannot carry this, because full speed is reached in about a
   * third of a second: by that measure a two-step dash and a ten-second run
   * end identically, which is what made the stop look like slipping rather
   * than braking.
   */
  brakeMomentumBuild: 2.83,
  /** How long it takes to lose that again once he is no longer running. */
  brakeMomentumFade: 1.2,
  /**
   * Shapes how the slide follows the momentum. Above one, the first second
   * of running adds little and the later ones add most, which is what makes
   * a brief burst stop short while a long run still slides as it did.
   */
  brakeMomentumCurve: 1.45,

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
