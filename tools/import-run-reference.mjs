// Offline, pinned-reference import. No invented motion curves or amplitude clamps.
// Usage: node tools/import-run-reference.mjs /path/to/anim_72_73.inc.c /path/to/mario/model.inc.c
import fs from 'node:fs';
const source = fs.readFileSync(process.argv[2], 'utf8');
function array(name, signed) {
  const match = source.match(new RegExp(`anim_72_73_${name}\\[\\] = \\{([\\s\\S]*?)\\};`));
  if (!match) throw new Error(`Missing ${name}`);
  return [...match[1].matchAll(/0x[\da-f]+/gi)].map(([text]) => {
    const n = Number(text); return signed && n >= 32768 ? n - 65536 : n;
  });
}
const indices = array('indices', false), values = array('values', true);
const channel = (index, frame) => values[indices[index * 2 + 1] + Math.min(indices[index * 2] - 1, frame)];
const parents = [-1,0,1,2,2,4,5,6,2,8,9,10,1,12,13,14,1,16,17,18];
const offsets = [[0,0,0],[0,0,0],[68,0,0],[87,0,0],[67,-10,79],[0,0,0],[65,0,0],[60,0,0],[68,-10,-79],[0,0,0],[65,0,0],[60,0,0],[13,-8,42],[0,0,0],[89,0,0],[67,0,0],[13,-8,-42],[0,0,0],[89,0,0],[67,0,0]];
const model = fs.readFileSync(process.argv[3], 'utf8');
function footVertices(name) {
  return [...model.matchAll(new RegExp(`static const Vtx ${name}_vertex_group\\d+\\[\\] = \\{([\\s\\S]*?)\\};`, 'g'))]
    .flatMap(match => [...match[1].matchAll(/\{\{\{\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)/g)].map(v => v.slice(1).map(Number)));
}
const feet = {left:footVertices('mario_right_foot_dl'), right:footVertices('mario_left_foot_shared_dl')};
if (!feet.left.length || !feet.right.length) throw new Error('Missing native foot vertices');
const frames = Array.from({length:72}, (_, frame) => ({
  translation: [0,1,2].map(axis => channel(axis, frame)),
  // Original signed 16-bit rotations, not flattened directions.
  rotations: parents.map((_, bone) => [0,1,2].map(axis => channel(3 + bone * 3 + axis, frame))),
}));
fs.writeFileSync('src/animation/run-reference.json', JSON.stringify({
  source: 'https://github.com/n64decomp/sm64', revision:'9921382a68bb0c865e5e45eb594d9c64db59b1af',
  clip:'0x72', frameCount:72, nativeTickHz:30, previewSpeed:32,
  // Sound events, not an assertion that a physical foot is planted for a window.
  footstepEvents:[9,45], parents, offsets, feet, frames,
}) + '\n');
