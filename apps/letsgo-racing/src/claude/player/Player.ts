// Type-only contracts extracted from 3D-WORLD-3 Player.ts at b60e295.
// The full advanced controller is deliberately not enabled in stage 1.
export type MovementState = 'ground' | 'air' | 'swim' | 'ledge' | 'climb';
export type JumpKind = 'normal' | 'long' | 'back' | 'wall' | 'side';
export type PoundPhase = 'none' | 'hover' | 'slam' | 'landed';
export type ClimbMove = 'mantle' | 'vault' | 'swing' | 'ladder-top' | 'ladder-mount' | 'water-exit';
