# Running comparison — review stage

Reference: [n64decomp/sm64](https://github.com/n64decomp/sm64/tree/9921382a68bb0c865e5e45eb594d9c64db59b1af), run clip 0x72. This is a reconstructed skeleton, not a recording of the game. Full rotations are read from the native signed 16-bit animation channels. Skeleton offsets come from actors/mario/geo.inc.c; XYZ matrix order was checked against src/engine/math_util.c. Native foot vertices are used only to measure reference sole height.

The steady straight run adds torso tilt from tilt_body_walking at speed 32, no turning lean, and no floor slope. Animation advances speed/4 per 30 Hz tick: 72 frames in 0.30 seconds. The viewer interpolates source frames for inspection; the original game renders at 30 Hz. Footstep sound events occur at 9 and 45; they do not define physical stance windows.

## Diagnosis of the previous run

- Torso: fixed 0.10-radian lean replaced the native torso orientation and gameplay tilt.
- Shoulders: a single world-space Z direction was converted to X swing, multiplied by 0.65 and clamped to ±0.52 radians. Sideways elevation, twist and the parent torso motion were discarded.
- Elbows: source bends were clamped to 0.55–1 radians, changing extension and timing.
- Hips/knees: generated two-bone IK replaced the source angles. The shoe target used an arbitrary 0.60 scale and +0.27 offset; a recovery envelope replaced native lift.
- Ankles: source pitch was multiplied by 0.15 and clamped; source roll/yaw were absent.
- Stride/contact: a 1.6 m cycle (versus about 1.31 m per native cycle at this leg scale) plus assumed 28% contact windows replaced the native trajectory. Sound-event frames were treated as stance boundaries without evidence.
- Root: native root height was normalized, attenuated and blended with a crouch offset.

## What this preview changes

Full native world orientations are converted to the approved avatar's bone axes and then to local joint rotations. Each limb's authored rest direction is calibrated; all segment lengths and mesh data are preserved. There are no replacement swing waves, angle clamps or foot IK in the rebuilt preview. It remains separate from game movement.

## Limits that remain visible

The native upper/lower leg lengths are 89/67; the approved avatar's are about 35/36 cm. This changes knee positions, foot spacing and contact even when orientations match. Shoe dimensions, shoulder spacing, torso spacing, head proportions and smooth skinning also differ. One fixed 14.96 cm avatar offset avoids sampled mesh penetration; it does not force each foot to touch. Native shoe geometry itself can cross the nominal floor plane in this reconstructed clip. Reference root scale is normalized to avatar total leg length. These results do not establish a match to the game's final rendered motion.

## Matching cycle frames

Angles in degrees; paired values are avatar left / right. Knee height is relative to the hip, divided by total leg length; negative means below the hip. Sole heights are cm above the nominal slab. Ankle separation is a pose measurement, not distance travelled per cycle.

### Frame 0

| Measurement | Reference | Previous | Rebuilt |
|---|---:|---:|---:|
| Torso forward lean (°) | 21.37 | 5.73 | 21.37 |
| Upper-arm swing L / R (°) | -105.51 / 95.50 | -29.32 / 14.44 | -105.51 / 95.50 |
| Arm sideways elevation L / R (°) | 42.75 / 60.20 | 12.02 / 12.31 | 42.75 / 60.20 |
| Elbow bend L / R (°) | 41.70 / 45.71 | 44.61 / 48.49 | 41.70 / 45.71 |
| Hip swing L / R (°) | 82.68 / -20.46 | 43.21 / 43.61 | 82.68 / -20.46 |
| Knee bend L / R (°) | 38.81 / 84.99 | 6.08 / 83.92 | 38.81 / 84.99 |
| Knee height above hip / leg length L / R | -0.07 / -0.53 | -0.36 / -0.36 | -0.06 / -0.46 |
| Shoe pitch L / R (°) | 39.19 / -41.81 | 2.69 / -7.23 | 39.19 / -41.81 |
| Ankle separation / leg length | 1.48 | 0.63 | 1.50 |
| Sole height above slab L / R (cm) | 30.86 / 28.14 | 12.45 / 11.31 | 55.28 / 53.81 |

### Frame 9

| Measurement | Reference | Previous | Rebuilt |
|---|---:|---:|---:|
| Torso forward lean (°) | 28.09 | 5.73 | 28.09 |
| Upper-arm swing L / R (°) | -106.10 / 75.03 | -18.04 / 6.16 | -106.10 / 75.03 |
| Arm sideways elevation L / R (°) | 64.09 / 78.08 | 13.59 / 13.60 | 64.09 / 78.08 |
| Elbow bend L / R (°) | 42.30 / 46.91 | 45.19 / 49.65 | 42.30 / 46.91 |
| Hip swing L / R (°) | 35.73 / 21.05 | 54.58 / 34.45 | 35.73 / 21.05 |
| Knee bend L / R (°) | 51.87 / 100.65 | 42.48 / 37.81 | 51.87 / 100.65 |
| Knee height above hip / leg length L / R | -0.46 / -0.53 | -0.29 / -0.41 | -0.40 / -0.46 |
| Shoe pitch L / R (°) | -26.58 / -86.03 | -3.38 / -0.00 | -26.58 / -86.03 |
| Ankle separation / leg length | 0.43 | 0.26 | 0.47 |
| Sole height above slab L / R (cm) | -4.66 / -9.42 | 8.49 / 0.00 | 5.17 / 13.25 |

### Frame 18

| Measurement | Reference | Previous | Rebuilt |
|---|---:|---:|---:|
| Torso forward lean (°) | 23.94 | 5.73 | 23.94 |
| Upper-arm swing L / R (°) | 31.27 / -81.06 | 2.16 / -14.48 | 31.27 / -81.06 |
| Arm sideways elevation L / R (°) | 83.91 / 65.00 | 13.75 / 13.73 | 83.91 / 65.00 |
| Elbow bend L / R (°) | 44.81 / 44.80 | 47.62 / 47.61 | 44.81 / 44.80 |
| Hip swing L / R (°) | 7.78 / 70.26 | 60.47 / 17.54 | 7.78 / 70.26 |
| Knee bend L / R (°) | 44.91 / 96.79 | 78.65 / 38.43 | 44.91 / 96.79 |
| Knee height above hip / leg length L / R | -0.56 / -0.19 | -0.24 / -0.47 | -0.49 / -0.17 |
| Shoe pitch L / R (°) | -61.05 / -25.38 | -9.15 / 0.00 | -61.05 / -25.38 |
| Ankle separation / leg length | 0.53 | 0.30 | 0.48 |
| Sole height above slab L / R (cm) | -13.20 / 31.38 | 12.77 / -0.00 | 4.52 / 37.97 |

### Frame 27

| Measurement | Reference | Previous | Rebuilt |
|---|---:|---:|---:|
| Torso forward lean (°) | 19.30 | 5.73 | 19.30 |
| Upper-arm swing L / R (°) | 71.87 / -89.03 | 16.11 / -28.75 | 71.87 / -89.03 |
| Arm sideways elevation L / R (°) | 62.53 / 35.72 | 12.25 / 12.16 | 62.53 / 35.72 |
| Elbow bend L / R (°) | 50.29 / 42.73 | 52.92 / 45.61 | 50.29 / 42.73 |
| Hip swing L / R (°) | -23.42 / 93.66 | 50.71 / -15.06 | -23.42 / 93.66 |
| Knee bend L / R (°) | 68.57 / 29.93 | 101.90 / 6.08 | 68.57 / 29.93 |
| Knee height above hip / leg length L / R | -0.52 / 0.04 | -0.31 / -0.48 | -0.45 / 0.03 |
| Shoe pitch L / R (°) | -53.83 / 59.43 | -11.43 / -0.00 | -53.83 / 59.43 |
| Ankle separation / leg length | 1.61 | 0.30 | 1.64 |
| Sole height above slab L / R (cm) | 29.83 / 60.93 | 19.56 / 0.62 | 51.04 / 81.18 |

### Frame 36

| Measurement | Reference | Previous | Rebuilt |
|---|---:|---:|---:|
| Torso forward lean (°) | 21.72 | 5.73 | 21.72 |
| Upper-arm swing L / R (°) | 70.70 / -88.15 | 18.46 / -27.09 | 70.70 / -88.15 |
| Arm sideways elevation L / R (°) | 58.50 / 40.14 | 11.94 / 12.18 | 58.50 / 40.14 |
| Elbow bend L / R (°) | 73.90 / 41.22 | 59.71 / 44.15 | 73.90 / 41.22 |
| Hip swing L / R (°) | -6.50 / 72.10 | 47.66 / 38.88 | -6.50 / 72.10 |
| Knee bend L / R (°) | 88.07 / 50.14 | 81.17 / 6.08 | 88.07 / 50.14 |
| Knee height above hip / leg length L / R | -0.57 / -0.17 | -0.33 / -0.38 | -0.49 / -0.15 |
| Shoe pitch L / R (°) | -61.28 / 16.31 | -7.23 / 1.13 | -61.28 / 16.31 |
| Ankle separation / leg length | 1.20 | 0.50 | 1.22 |
| Sole height above slab L / R (cm) | 13.55 / 18.51 | 10.59 / 8.97 | 36.31 / 44.48 |

### Frame 45

| Measurement | Reference | Previous | Rebuilt |
|---|---:|---:|---:|
| Torso forward lean (°) | 28.28 | 5.73 | 28.28 |
| Upper-arm swing L / R (°) | 61.37 / -87.58 | 11.05 / -14.27 | 61.37 / -87.58 |
| Arm sideways elevation L / R (°) | 70.94 / 67.91 | 13.21 / 13.61 | 70.94 / 67.91 |
| Elbow bend L / R (°) | 68.70 / 39.70 | 59.71 / 42.68 | 68.70 / 39.70 |
| Hip swing L / R (°) | 23.09 / 32.85 | 35.20 / 55.74 | 23.09 / 32.85 |
| Knee bend L / R (°) | 98.64 / 58.72 | 37.42 / 50.48 | 98.64 / 58.72 |
| Knee height above hip / leg length L / R | -0.52 / -0.48 | -0.40 / -0.28 | -0.45 / -0.41 |
| Shoe pitch L / R (°) | -54.11 / -15.70 | 0.00 / -2.00 | -54.11 / -15.70 |
| Ankle separation / leg length | 0.32 | 0.19 | 0.35 |
| Sole height above slab L / R (cm) | -5.35 / -1.55 | -0.00 / 8.57 | 14.07 / 10.29 |

### Frame 54

| Measurement | Reference | Previous | Rebuilt |
|---|---:|---:|---:|
| Torso forward lean (°) | 26.13 | 5.73 | 26.13 |
| Upper-arm swing L / R (°) | -87.10 / 116.96 | -3.65 / 0.81 | -87.10 / 116.96 |
| Arm sideways elevation L / R (°) | 86.96 / 83.42 | 14.04 / 13.90 | 86.96 / 83.42 |
| Elbow bend L / R (°) | 52.62 / 38.35 | 55.18 / 41.39 | 52.62 / 38.35 |
| Hip swing L / R (°) | 53.64 / 3.52 | 20.17 / 59.61 | 53.64 / 3.52 |
| Knee bend L / R (°) | 104.42 / 55.87 | 41.79 / 86.27 | 104.42 / 55.87 |
| Knee height above hip / leg length L / R | -0.34 / -0.57 | -0.46 / -0.25 | -0.29 / -0.49 |
| Shoe pitch L / R (°) | -43.29 / -70.75 | 0.00 / -10.62 | -43.29 / -70.75 |
| Ankle separation / leg length | 0.43 | 0.21 | 0.37 |
| Sole height above slab L / R (cm) | 12.23 / -13.87 | 0.00 / 13.07 | 26.14 / 5.03 |

### Frame 63

| Measurement | Reference | Previous | Rebuilt |
|---|---:|---:|---:|
| Torso forward lean (°) | 22.07 | 5.73 | 22.07 |
| Upper-arm swing L / R (°) | -108.18 / 116.00 | -18.42 / 6.65 | -108.18 / 116.00 |
| Arm sideways elevation L / R (°) | 64.76 / 69.59 | 13.00 / 13.03 | 64.76 / 69.59 |
| Elbow bend L / R (°) | 37.25 / 37.42 | 40.33 / 40.49 | 37.25 / 37.42 |
| Hip swing L / R (°) | 83.36 / -17.37 | -14.20 / 51.53 | 83.36 / -17.37 |
| Knee bend L / R (°) | 70.35 / 63.87 | 6.08 / 97.21 | 70.35 / 63.87 |
| Knee height above hip / leg length L / R | -0.07 / -0.54 | -0.48 / -0.31 | -0.06 / -0.47 |
| Shoe pitch L / R (°) | 8.22 / -59.92 | 0.00 / -11.43 | 8.22 / -59.92 |
| Ankle separation / leg length | 1.26 | 0.32 | 1.25 |
| Sole height above slab L / R (cm) | 38.15 / 19.06 | 0.37 / 17.44 | 60.57 / 40.85 |

All 72 source frames and all three versions are exported in `public/run-review-measurements.csv`. Regenerate with `node tools/report-run-comparison.mjs`. Numerical agreement verifies the transfer; visual approval remains outstanding.
