export interface Tile {
  id: number;
  row: number;
  col: number;
  value: number;
  isNew: boolean;
  mergedFrom: boolean;
  removing: boolean;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export type GameStatus = 'playing' | 'won' | 'over';

export interface MoveResult {
  tiles: Tile[];
  removed: Tile[];
  score: number;
  moved: boolean;
  won: boolean;
}
