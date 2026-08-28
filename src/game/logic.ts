import { Direction, MoveResult, Tile } from './types';

let nextId = 1;

export function resetIds() {
  nextId = 1;
}

function makeTile(row: number, col: number, value: number, isNew = true): Tile {
  return { id: nextId++, row, col, value, isNew, mergedFrom: false, removing: false };
}

export function initialTiles(size = 4): Tile[] {
  resetIds();
  const tiles: Tile[] = [];
  tiles.push(makeTile(randEmpty(tiles, size)[0], randEmpty(tiles, size)[1], randomValue()));
  tiles.push(makeTile(randEmpty(tiles, size)[0], randEmpty(tiles, size)[1], randomValue()));
  return tiles;
}

function randomValue(): number {
  return Math.random() < 0.9 ? 2 : 4;
}

function emptyCells(tiles: Tile[], size: number): [number, number][] {
  const occupied = new Set(tiles.map((t) => t.row * size + t.col));
  const cells: [number, number][] = [];
  for (let i = 0; i < size * size; i++) {
    if (!occupied.has(i)) cells.push([Math.floor(i / size), i % size]);
  }
  return cells;
}

function randEmpty(tiles: Tile[], size: number): [number, number] {
  const cells = emptyCells(tiles, size);
  return cells[Math.floor(Math.random() * cells.length)];
}

export function spawnTile(tiles: Tile[], size = 4): Tile | null {
  const cells = emptyCells(tiles, size);
  if (cells.length === 0) return null;
  const [row, col] = cells[Math.floor(Math.random() * cells.length)];
  return makeTile(row, col, randomValue());
}

const VECTORS: Record<Direction, { r: number; c: number }> = {
  up: { r: -1, c: 0 },
  down: { r: 1, c: 0 },
  left: { r: 0, c: -1 },
  right: { r: 0, c: 1 },
};

export function move(tiles: Tile[], dir: Direction, size = 4, winValue = 2048): MoveResult {
  const grid: (Tile | null)[][] = Array.from({ length: size }, () => Array(size).fill(null));
  for (const t of tiles) {
    grid[t.row][t.col] = { ...t, isNew: false, mergedFrom: false, removing: false };
  }

  const v = VECTORS[dir];
  const rows = Array.from({ length: size }, (_, i) => i);
  const cols = Array.from({ length: size }, (_, i) => i);
  if (v.r === 1) rows.reverse();
  if (v.c === 1) cols.reverse();

  const mergedFlag: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
  const removed: Tile[] = [];
  let score = 0;
  let moved = false;
  let won = false;

  for (const r of rows) {
    for (const c of cols) {
      const tile = grid[r][c];
      if (!tile) continue;

      let nr = r;
      let nc = c;
      while (true) {
        const tr = nr + v.r;
        const tc = nc + v.c;
        if (tr < 0 || tr >= size || tc < 0 || tc >= size) break;
        if (grid[tr][tc] !== null) break;
        nr = tr;
        nc = tc;
      }

      const mr = nr + v.r;
      const mc = nc + v.c;
      if (mr >= 0 && mr < size && mc >= 0 && mc < size) {
        const next = grid[mr][mc];
        if (next && next.value === tile.value && !mergedFlag[mr][mc]) {
          const newValue = next.value * 2;
          grid[mr][mc] = { ...next, value: newValue, mergedFrom: true, isNew: false, removing: false };
          grid[r][c] = null;
          mergedFlag[mr][mc] = true;
          score += newValue;
          moved = true;
          if (newValue >= winValue) won = true;
          removed.push({ ...tile, row: mr, col: mc, removing: true });
          continue;
        }
      }

      if (nr !== r || nc !== c) {
        grid[nr][nc] = { ...tile, row: nr, col: nc, isNew: false, mergedFrom: false, removing: false };
        grid[r][c] = null;
        moved = true;
      }
    }
  }

  const result: Tile[] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const t = grid[r][c];
      if (t) result.push({ ...t, row: r, col: c });
    }
  }

  return { tiles: result, removed, score, moved, won };
}

export function canMove(tiles: Tile[], size = 4): boolean {
  if (tiles.length < size * size) return true;
  const grid: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
  for (const t of tiles) grid[t.row][t.col] = t.value;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const v = grid[r][c];
      if (c < size - 1 && grid[r][c + 1] === v) return true;
      if (r < size - 1 && grid[r + 1][c] === v) return true;
    }
  }
  return false;
}
