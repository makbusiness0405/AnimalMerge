import { useCallback, useEffect, useRef, useState } from 'react';
import { canMove, initialTiles, move, spawnTile } from '@/game/logic';
import { Direction, GameStatus, Tile } from '@/game/types';
import { GameMode } from '@/lib/supabase';
import { playSlide, playMerge, playDiscovery, playGameOver, playWin, playJoker } from '@/game/sounds';

const BEST_KEYS: Record<GameMode, string> = {
  classic: 'cute-merge-best-classic',
  mega: 'cute-merge-best-mega',
  time: 'cute-merge-best-time',
};

const TIME_ATTACK_SECONDS = 120;

export interface JokerState {
  undoCount: number;
  multiplyCount: number;
  cloneCount: number;
}

export function useGame(mode: GameMode = 'classic', jokers: JokerState = { undoCount: 0, multiplyCount: 0, cloneCount: 0 }) {
  const size = mode === 'mega' ? 8 : 4;
  const bestKey = BEST_KEYS[mode];

  const [tiles, setTiles] = useState<Tile[]>(() => initialTiles(size));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [keepPlaying, setKeepPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_ATTACK_SECONDS);
  const lockRef = useRef(false);
  const seenValuesRef = useRef<Set<number>>(new Set([2, 4]));
  const discoveredRef = useRef<Set<number>>(new Set([2, 4]));
  const recordedRef = useRef(false);
  const historyRef = useRef<{ tiles: Tile[]; score: number } | null>(null);
  const jokerUndoCountRef = useRef(jokers.undoCount);
  const jokerMultiplyCountRef = useRef(jokers.multiplyCount);
  const jokerCloneCountRef = useRef(jokers.cloneCount);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset game when mode changes
  useEffect(() => {
    setTiles(initialTiles(size));
    setScore(0);
    setStatus('playing');
    setKeepPlaying(false);
    setTimeLeft(TIME_ATTACK_SECONDS);
    lockRef.current = false;
    seenValuesRef.current = new Set([2, 4]);
    discoveredRef.current = new Set([2, 4]);
    recordedRef.current = false;
    historyRef.current = null;
    const v = Number(localStorage.getItem(bestKey) ?? '0');
    setBest(Number.isFinite(v) ? v : 0);
  }, [size, bestKey, mode]);

  // Sync joker counts from props
  useEffect(() => {
    jokerUndoCountRef.current = jokers.undoCount;
    jokerMultiplyCountRef.current = jokers.multiplyCount;
    jokerCloneCountRef.current = jokers.cloneCount;
  }, [jokers.undoCount, jokers.multiplyCount, jokers.cloneCount]);

  // Timer for time attack mode
  useEffect(() => {
    if (mode !== 'time' || status !== 'playing') {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setStatus('over');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [mode, status]);

  const persistBest = useCallback((v: number) => {
    setBest((prev) => {
      const next = Math.max(prev, v);
      localStorage.setItem(bestKey, String(next));
      return next;
    });
  }, [bestKey]);

  const handleMove = useCallback(
    (dir: Direction) => {
      if (status === 'over' || lockRef.current) return;
      if (status === 'won' && !keepPlaying) return;

      setTiles((current) => {
        const result = move(current, dir, size);
        if (!result.moved) return current;

        // Slide sound
        playSlide();

        historyRef.current = { tiles: current.filter((t) => !t.removing), score: score };

        const newTile = spawnTile(result.tiles, size);
        const withNew = newTile ? [...result.tiles, newTile] : result.tiles;
        const allRendered = [...withNew, ...result.removed];

        // Track newly discovered values and play discovery sound
        const newlyDiscovered: number[] = [];
        for (const t of withNew) {
          seenValuesRef.current.add(t.value);
          if (!discoveredRef.current.has(t.value)) {
            discoveredRef.current.add(t.value);
            newlyDiscovered.push(t.value);
          }
        }

        // Merge sound (pitched by highest merged value)
        if (result.score > 0) {
          const mergedValues = withNew.filter((t) => t.mergedFrom).map((t) => t.value);
          const highestMerge = mergedValues.length > 0 ? Math.max(...mergedValues) : 4;
          playMerge(highestMerge);
          setScore((s) => {
            const ns = s + result.score;
            persistBest(ns);
            return ns;
          });
        }

        // Discovery sound (after merge sound, slightly delayed)
        if (newlyDiscovered.length > 0) {
          setTimeout(() => playDiscovery(), 120);
        }

        lockRef.current = true;
        setTimeout(() => {
          setTiles((prev) => prev.filter((t) => !t.removing));
          lockRef.current = false;
        }, 140);

        if (result.won && !keepPlaying) {
          setStatus('won');
          setTimeout(() => playWin(), 200);
        } else if (newTile && !canMove(withNew, size)) {
          setStatus('over');
          setTimeout(() => playGameOver(), 200);
        }

        return allRendered;
      });
    },
    [status, keepPlaying, persistBest, size, score]
  );

  const newGame = useCallback(() => {
    setTiles(initialTiles(size));
    setScore(0);
    setStatus('playing');
    setKeepPlaying(false);
    setTimeLeft(TIME_ATTACK_SECONDS);
    lockRef.current = false;
    seenValuesRef.current = new Set([2, 4]);
    discoveredRef.current = new Set([2, 4]);
    recordedRef.current = false;
    historyRef.current = null;
  }, [size]);

  const continueGame = useCallback(() => {
    setKeepPlaying(true);
    setStatus('playing');
  }, []);

  const undo = useCallback((): boolean => {
    if (jokerUndoCountRef.current <= 0) return false;
    if (!historyRef.current) return false;
    if (lockRef.current) return false;

    jokerUndoCountRef.current -= 1;
    playJoker();
    setTiles(historyRef.current.tiles);
    setScore(historyRef.current.score);
    setStatus('playing');
    historyRef.current = null;
    return true;
  }, []);

  const applyMultiply = useCallback((): boolean => {
    if (jokerMultiplyCountRef.current <= 0) return false;
    if (status === 'over' || lockRef.current) return false;

    jokerMultiplyCountRef.current -= 1;
    playJoker();
    setTiles((current) => {
      const active = current.filter((t) => !t.removing);
      const doubled = active.map((t) => ({ ...t, value: t.value * 2, isNew: true, mergedFrom: false }));
      for (const t of doubled) {
        seenValuesRef.current.add(t.value);
      }
      return doubled;
    });
    return true;
  }, [status]);

  const applyClone = useCallback((): boolean => {
    if (jokerCloneCountRef.current <= 0) return false;
    if (status === 'over' || lockRef.current) return false;

    jokerCloneCountRef.current -= 1;
    playJoker();
    setTiles((current) => {
      const active = current.filter((t) => !t.removing);
      if (active.length === 0) return current;
      // Find highest value tile
      const highest = active.reduce((max, t) => t.value > max.value ? t : max, active[0]);
      // Find an empty cell
      const occupied = new Set(active.map((t) => t.row * size + t.col));
      const empty: [number, number][] = [];
      for (let i = 0; i < size * size; i++) {
        if (!occupied.has(i)) empty.push([Math.floor(i / size), i % size]);
      }
      if (empty.length === 0) return current;
      const [row, col] = empty[Math.floor(Math.random() * empty.length)];
      const cloned: Tile = {
        id: Date.now() + Math.random(),
        row,
        col,
        value: highest.value,
        isNew: true,
        mergedFrom: false,
        removing: false,
      };
      seenValuesRef.current.add(highest.value);
      return [...active, cloned];
    });
    return true;
  }, [status, size]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Direction> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        w: 'up',
        s: 'down',
        a: 'left',
        d: 'right',
      };
      const dir = map[e.key];
      if (dir) {
        e.preventDefault();
        handleMove(dir);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleMove]);

  return {
    tiles,
    score,
    best,
    status,
    handleMove,
    newGame,
    continueGame,
    seenValues: seenValuesRef.current,
    recorded: recordedRef,
    size,
    undo,
    applyMultiply,
    applyClone,
    timeLeft,
    mode,
  };
}
