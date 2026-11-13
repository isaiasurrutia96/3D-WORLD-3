/**
 * Drives a kart from the island's start pad, along its roads, over the
 * bridge and once round each of the four circuits, using the racing game's
 * own vehicle physics and the one combined world.
 *
 * It needs no browser: the kart and the ground it drives on are plain
 * numbers. Run it with
 *
 *   node --experimental-strip-types tools/racing-routes.ts
 *
 * The driver is a simple pursuit of a line of points, held to a modest
 * speed, so that a failure means the road is wrong and not the driving: if
 * this driver can get round, the road is wide enough, smooth enough and
 * joined up.
 */
import { Vector3 } from 'three';
import { BRIDGES, COURSES, worldPhysics } from '../src/racing/Routes.ts';
import { ROAD_PATHS } from '../src/world/Landscape.ts';
// @ts-ignore — plain JavaScript, checked by its own tests.
import { createVehicleState, stepVehicle } from '../apps/letsgo-racing/src/vehicle-controller.js';

const DT = 1 / 60;
const SPEED = 17;
const wrap = (a: number) => {
  let v = a;
  while (v > Math.PI) v -= Math.PI * 2;
  while (v < -Math.PI) v += Math.PI * 2;
  return v;
};

interface Report {
  course: string;
  bridgeMetres: number;
  lapMetres: number;
  seconds: number;
  fell: boolean;
  lowest: number;
  maxOff: number;
  railSeconds: number;
  groundedAlways: boolean;
  gatesPassed: number;
  gates: number;
  reachedEnd: boolean;
  stuck: boolean;
  where: string;
}

function drive(index: number): Report {
  const course = COURSES[index];
  const bridge = BRIDGES[index];
  // The island roads, from the start pad to the plaza and out to the gate.
  const start = ROAD_PATHS[0];
  const roadIndex = { 0: 8, 1: 7, 2: 5, 3: 6 }[index as 0 | 1 | 2 | 3];
  const islandLeg = [...start.map((p) => new Vector3(p.x, 0, p.y))];
  // The winding road starts at the start pad already; the others go on from
  // the plaza.
  if (index !== 3) islandLeg.push(...ROAD_PATHS[roadIndex].map((p) => new Vector3(p.x, 0, p.y)));
  else {
    islandLeg.length = 0;
    islandLeg.push(...ROAD_PATHS[roadIndex].map((p) => new Vector3(p.x, 0, p.y)));
  }

  const bridgeLeg = bridge.samples.map((s) => s.point.clone());
  // Along the racing code's own bridge to where it meets the circuit.
  const access = ([ { x: 154, z: -150 }, { x: -303.5, z: 0 }, { x: 0, z: -452 }, { x: 0, z: 0 } ] as const)[index];
  const samples = course.samples as Array<{ point: Vector3; distance: number }>;
  const count = samples.length - 1;
  let end = access;
  if (index === 3) {
    // Winding's stub ends where the circuit begins.
    end = { x: samples[0].point.x, z: samples[0].point.z };
  }
  let join = 0;
  let best = Infinity;
  for (let i = 0; i < count; i += 1) {
    const d = Math.hypot(samples[i].point.x - end.x, samples[i].point.z - end.z);
    if (d < best) {
      best = d;
      join = i;
    }
  }
  const stubLeg: Vector3[] = [];
  {
    const from = bridgeLeg[bridgeLeg.length - 1];
    const to = new Vector3(end.x, 0, end.z);
    const n = Math.max(2, Math.ceil(from.distanceTo(to) / 3));
    for (let i = 1; i <= n; i += 1) stubLeg.push(from.clone().lerp(to, i / n));
  }
  // The lap: forward once round from the join, back to the join.
  const lap: Vector3[] = [];
  // A little more than once round, so the gate the lap starts at is reached
  // at the end if the road joined the circuit after it.
  for (let k = 0; k <= count + 120; k += 2) lap.push(samples[(join + k) % count].point.clone());

  const path = [...islandLeg, ...bridgeLeg, ...stubLeg, ...lap];
  const gates = course.gates as Array<{ x: number; y: number; z: number }>;
  const gateAt = new Array(gates.length).fill(false);

  const state = createVehicleState();
  state.x = islandLeg[0].x;
  state.z = islandLeg[0].z;
  state.y = 0;
  state.yaw = Math.atan2(islandLeg[1].x - islandLeg[0].x, islandLeg[1].z - islandLeg[0].z);

  let nearest = 0;
  let seconds = 0;
  let lowest = 0;
  let maxOff = 0;
  let railSeconds = 0;
  let groundedAlways = true;
  let fell = false;
  let stuck = false;
  let lastMove = 0;
  let lastProgress = 0;
  const lapStartIndex = islandLeg.length + bridgeLeg.length + stubLeg.length;
  let reachedEnd = false;

  for (let frame = 0; frame < 60 * 60 * 40; frame += 1) {
    // Where he is on the line: the nearest point ahead of the last one.
    let bestD = Infinity;
    for (let i = nearest; i < Math.min(path.length, nearest + 60); i += 1) {
      const d = Math.hypot(path[i].x - state.x, path[i].z - state.z);
      if (d < bestD) {
        bestD = d;
        nearest = i;
      }
    }
    maxOff = Math.max(maxOff, bestD);
    const speed = Math.max(0, state.speed);
    // Slow for a tight bend: look at how much the line turns ahead.
    let bend = 0;
    for (let k = 0; k < 6; k += 1) {
      const a = path[Math.min(path.length - 1, nearest + 4 + k * 4)];
      const b = path[Math.min(path.length - 1, nearest + 8 + k * 4)];
      const c = path[Math.min(path.length - 1, nearest + 12 + k * 4)];
      const h1 = Math.atan2(b.x - a.x, b.z - a.z);
      const h2 = Math.atan2(c.x - b.x, c.z - b.z);
      bend = Math.max(bend, Math.abs(wrap(h2 - h1)));
    }
    const target = bend > 0.22 ? Math.max(8, SPEED - bend * 24) : SPEED;
    const look = 7 + speed * 0.55;
    let ti = nearest;
    let travelled = 0;
    while (ti < path.length - 1 && travelled < look) {
      travelled += Math.hypot(path[ti + 1].x - path[ti].x, path[ti + 1].z - path[ti].z);
      ti += 1;
    }
    const to = path[ti];
    const error = wrap(Math.atan2(to.x - state.x, to.z - state.z) - state.yaw);
    const input = {
      throttle: speed < target ? 1 : 0,
      brake: speed > target + 3,
      steer: Math.max(-1, Math.min(1, -error * 2.4)),
    };
    stepVehicle(state, input, DT, worldPhysics);
    seconds += DT;
    if (state.railContactTime > 0) railSeconds += DT;
    if (!state.grounded) groundedAlways = false;
    lowest = Math.min(lowest, state.y);
    if (state.y < -3) {
      fell = true;
      break;
    }
    // Gates, in order, once on the circuit.
    // Every gate has to be passed, in whatever order the road meets them:
    // the bridge joins the circuit part way round, not at the start line.
    if (nearest >= lapStartIndex) {
      gates.forEach((g, i) => {
        if (Math.hypot(state.x - g.x, state.z - g.z) < 16 && Math.abs(state.y - g.y) < 3) gateAt[i] = true;
      });
    }
    // Stuck: no progress along the line for ten seconds.
    if (nearest > lastProgress + 2) {
      lastProgress = nearest;
      lastMove = seconds;
    }
    if (seconds - lastMove > 10) {
      stuck = true;
      break;
    }
    if (nearest >= path.length - 3) {
      reachedEnd = true;
      break;
    }
  }
  return {
    course: course.name,
    bridgeMetres: Math.round(bridge.length),
    lapMetres: Math.round(samples[count].distance),
    seconds: Math.round(seconds),
    fell,
    lowest: Math.round(lowest * 100) / 100,
    maxOff: Math.round(maxOff * 10) / 10,
    railSeconds: Math.round(railSeconds * 10) / 10,
    groundedAlways,
    gatesPassed: gateAt.filter(Boolean).length,
    gates: gates.length,
    reachedEnd,
    stuck,
    where: `${state.x.toFixed(0)},${state.y.toFixed(1)},${state.z.toFixed(0)} at point ${nearest}/${path.length}`,
  };
}

const only = process.argv[2] ? [Number(process.argv[2])] : [0, 1, 2, 3];
const reports = only.map(drive);
for (const r of reports) console.log(JSON.stringify(r));
const bad = reports.filter(
  (r) => r.fell || r.stuck || !r.reachedEnd || r.gatesPassed < r.gates || r.railSeconds > 3,
);
console.log(bad.length ? `FAILED: ${bad.map((r) => r.course).join(', ')}` : 'all four circuits driven from the island');
process.exit(bad.length ? 1 : 0);
