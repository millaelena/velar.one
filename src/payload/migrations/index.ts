import * as migration_20260930_111711_initial from './20260930_111711_initial';

export const migrations = [
  {
    up: migration_20260930_111711_initial.up,
    down: migration_20260930_111711_initial.down,
    name: '20260930_111711_initial'
  },
];
