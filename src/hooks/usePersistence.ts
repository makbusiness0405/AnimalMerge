import { useCallback, useEffect, useState } from 'react';
import { GameStateRow, GameMode, ScoreRow, supabase } from '@/lib/supabase';
import { ACHIEVEMENTS, AchievementStats, checkAchievements } from '@/game/achievements';
import { ANIMALS } from '@/game/animals';
import { ThemeId } from '@/game/themes';
import { BackgroundId } from '@/game/backgrounds';

const NAME_KEY = 'animal2048-name';
const ACTIVE_THEME_KEY = 'animal2048-active-theme';
const ACTIVE_BG_KEY = 'animal2048-active-bg';

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db.getTime() - da.getTime()) / 86400000);
}

// Base: 100 gold per 1000 score in classic mode
const GOLD_PER_1000: Record<GameMode, number> = {
  classic: 100,
  mega: 50,
  time: 150,
};

export interface JokerDef {
  id: 'undo' | 'multiply' | 'clone';
  name: string;
  description: string;
  price: number;
}

export const JOKERS: JokerDef[] = [
  { id: 'undo', name: 'Undo', description: 'Revert your last move', price: 100 },
  { id: 'multiply', name: 'Double Tiles', description: 'Double every tile on the board', price: 150 },
  { id: 'clone', name: 'Clone', description: 'Clone your highest tile onto an empty cell', price: 200 },
];

export interface Persistence {
  playerName: string;
  discovered: number[];
  bestScore: number;
  bestTile: number;
  totalGames: number;
  streak: number;
  lastPlayedDate: string | null;
  canClaimDaily: boolean;
  gold: number;
  ownedThemes: string[];
  activeTheme: ThemeId;
  earnedAchievements: string[];
  newlyEarnedAchievements: string[];
  undoCount: number;
  multiplyCount: number;
  cloneCount: number;
  ownedBackgrounds: string[];
  activeBackground: BackgroundId;
  bestScoreByMode: Record<GameMode, number>;
  setPlayerName: (name: string) => void;
  recordGame: (mode: GameMode, score: number, highestTile: number, seenValues: number[]) => Promise<void>;
  claimDaily: () => Promise<void>;
  buyTheme: (themeId: ThemeId, price: number) => Promise<boolean>;
  setActiveTheme: (themeId: ThemeId) => void;
  buyBackground: (bgId: BackgroundId, price: number) => Promise<boolean>;
  setActiveBackground: (bgId: BackgroundId) => void;
  clearNewAchievements: () => void;
  buyJoker: (jokerId: 'undo' | 'multiply' | 'clone', price: number) => Promise<boolean>;
  consumeJoker: (jokerId: 'undo' | 'multiply' | 'clone') => void;
  loadLeaderboard: (mode: GameMode) => Promise<void>;
  leaderboard: ScoreRow[];
  myRank: number | null;
}

export function usePersistence(): Persistence {
  const [state, setState] = useState<GameStateRow | null>(null);
  const [leaderboard, setLeaderboard] = useState<ScoreRow[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [newlyEarned, setNewlyEarned] = useState<string[]>([]);

  const playerName = state?.player_name ?? localStorage.getItem(NAME_KEY) ?? 'Anonymous';
  const activeTheme = (state?.active_theme ?? localStorage.getItem(ACTIVE_THEME_KEY) ?? 'animals') as ThemeId;
  const activeBackground = (state?.active_background ?? localStorage.getItem(ACTIVE_BG_KEY) ?? 'gradient') as BackgroundId;

  const setPlayerName = useCallback((name: string) => {
    const trimmed = name.trim().slice(0, 16) || 'Anonymous';
    localStorage.setItem(NAME_KEY, trimmed);
    setState((prev) => prev ? { ...prev, player_name: trimmed } : prev);
    supabase.from('game_state').update({ player_name: trimmed, updated_at: new Date().toISOString() }).eq('id', 1).then();
  }, []);

  const loadState = useCallback(async () => {
    const { data } = await supabase.from('game_state').select('*').eq('id', 1).maybeSingle();
    if (data) {
      setState(data as GameStateRow);
      if (data.player_name && data.player_name !== 'Anonymous') {
        localStorage.setItem(NAME_KEY, data.player_name);
      }
    } else {
      const { data: inserted } = await supabase.from('game_state').insert({ id: 1 }).select('*').single();
      if (inserted) setState(inserted as GameStateRow);
    }
  }, []);

  const loadLeaderboard = useCallback(async (mode: GameMode = 'classic') => {
    const { data } = await supabase.from('scores').select('*').eq('mode', mode).order('score', { ascending: false }).limit(20);
    if (data) setLeaderboard(data as ScoreRow[]);
  }, []);

  useEffect(() => {
    loadState();
    loadLeaderboard('classic');
  }, [loadState, loadLeaderboard]);

  const canClaimDaily = (() => {
    if (!state) return false;
    if (!state.last_claim_date) return true;
    return daysBetween(state.last_claim_date, todayStr()) >= 1;
  })();

  const bestScoreByMode: Record<GameMode, number> = {
    classic: state?.best_score_classic ?? 0,
    mega: state?.best_score_mega ?? 0,
    time: state?.best_score_time ?? 0,
  };

  const recordGame = useCallback(async (mode: GameMode, score: number, highestTile: number, seenValues: number[]) => {
    const today = todayStr();
    const name = localStorage.getItem(NAME_KEY) || 'Anonymous';

    const { data: existing } = await supabase.from('game_state').select('*').eq('id', 1).maybeSingle();
    const prev = existing as GameStateRow | null;
    if (!prev) return;

    const newDiscovered = Array.from(new Set([...prev.discovered, ...seenValues])).sort((a, b) => a - b);
    const newBestTile = Math.max(prev.best_tile, highestTile);
    const newTotal = prev.total_games + 1;

    // Mode-specific best
    const modeBestCol = `best_score_${mode}` as keyof GameStateRow;
    const prevModeBest = prev[modeBestCol] as number;
    const newModeBest = Math.max(prevModeBest, score);
    const newOverallBest = Math.max(prev.best_score, score);

    // Gold: proportional to score, rate depends on mode
    const goldEarned = Math.floor((score / 1000) * GOLD_PER_1000[mode]);

    let newStreak = prev.streak;
    if (!prev.last_played_date) {
      newStreak = 1;
    } else {
      const diff = daysBetween(prev.last_played_date, today);
      if (diff === 0) {
        // same day
      } else if (diff === 1) {
        newStreak = prev.streak + 1;
      } else {
        newStreak = 1;
      }
    }

    const stats: AchievementStats = {
      bestScore: newOverallBest,
      bestTile: newBestTile,
      totalGames: newTotal,
      streak: newStreak,
      discoveredCount: newDiscovered.length,
      totalAnimals: Object.keys(ANIMALS).length,
    };
    const newAchIds = checkAchievements(stats, prev.earned_achievements);
    const allAchievements = [...prev.earned_achievements, ...newAchIds];
    const achievementGold = newAchIds.reduce((sum, id) => {
      const ach = ACHIEVEMENTS.find((a) => a.id === id);
      return sum + (ach?.reward ?? 0);
    }, 0);
    const newGold = prev.gold + goldEarned + achievementGold;

    if (newAchIds.length > 0) setNewlyEarned(newAchIds);

    const updates: Record<string, unknown> = {
      player_name: name,
      discovered: newDiscovered,
      best_score: newOverallBest,
      best_tile: newBestTile,
      total_games: newTotal,
      streak: newStreak,
      last_played_date: today,
      gold: newGold,
      earned_achievements: allAchievements,
      [modeBestCol]: newModeBest,
      updated_at: new Date().toISOString(),
    };

    const { data: updated } = await supabase.from('game_state').update(updates).eq('id', 1).select('*').single();
    if (updated) setState(updated as GameStateRow);

    if (score > 0) {
      const { data: scoreRow } = await supabase.from('scores').insert({
        player_name: name,
        score,
        highest_tile: highestTile,
        mode,
      }).select('*').single();
      if (scoreRow) {
        const { count } = await supabase.from('scores').select('*', { count: 'exact', head: true }).eq('mode', mode).gt('score', score);
        setMyRank(count !== null ? count + 1 : null);
        loadLeaderboard(mode);
      }
    }
  }, [loadLeaderboard]);

  const claimDaily = useCallback(async () => {
    const today = todayStr();
    const reward = 20;
    const updates: Partial<GameStateRow> = {
      last_claim_date: today,
      gold: (state?.gold ?? 0) + reward,
      updated_at: new Date().toISOString(),
    };
    const { data: updated } = await supabase.from('game_state').update(updates).eq('id', 1).select('*').single();
    if (updated) setState(updated as GameStateRow);
  }, [state]);

  const buyTheme = useCallback(async (themeId: ThemeId, price: number): Promise<boolean> => {
    if (!state) return false;
    if (state.owned_themes.includes(themeId)) return true;
    if (state.gold < price) return false;

    const newOwned = [...state.owned_themes, themeId];
    const newGold = state.gold - price;
    const updates: Partial<GameStateRow> = {
      owned_themes: newOwned,
      gold: newGold,
      active_theme: themeId,
      updated_at: new Date().toISOString(),
    };
    const { data: updated } = await supabase.from('game_state').update(updates).eq('id', 1).select('*').single();
    if (updated) {
      setState(updated as GameStateRow);
      localStorage.setItem(ACTIVE_THEME_KEY, themeId);
      return true;
    }
    return false;
  }, [state]);

  const setActiveTheme = useCallback((themeId: ThemeId) => {
    localStorage.setItem(ACTIVE_THEME_KEY, themeId);
    setState((prev) => prev ? { ...prev, active_theme: themeId } : prev);
    supabase.from('game_state').update({ active_theme: themeId, updated_at: new Date().toISOString() }).eq('id', 1).then();
  }, []);

  const buyBackground = useCallback(async (bgId: BackgroundId, price: number): Promise<boolean> => {
    if (!state) return false;
    if (state.owned_backgrounds.includes(bgId)) return true;
    if (state.gold < price) return false;

    const newOwned = [...state.owned_backgrounds, bgId];
    const newGold = state.gold - price;
    const updates: Partial<GameStateRow> = {
      owned_backgrounds: newOwned,
      gold: newGold,
      active_background: bgId,
      updated_at: new Date().toISOString(),
    };
    const { data: updated } = await supabase.from('game_state').update(updates).eq('id', 1).select('*').single();
    if (updated) {
      setState(updated as GameStateRow);
      localStorage.setItem(ACTIVE_BG_KEY, bgId);
      return true;
    }
    return false;
  }, [state]);

  const setActiveBackground = useCallback((bgId: BackgroundId) => {
    localStorage.setItem(ACTIVE_BG_KEY, bgId);
    setState((prev) => prev ? { ...prev, active_background: bgId } : prev);
    supabase.from('game_state').update({ active_background: bgId, updated_at: new Date().toISOString() }).eq('id', 1).then();
  }, []);

  const buyJoker = useCallback(async (jokerId: 'undo' | 'multiply' | 'clone', price: number): Promise<boolean> => {
    if (!state) return false;
    if (state.gold < price) return false;

    const newGold = state.gold - price;
    const colMap = { undo: 'undo_count', multiply: 'multiply_count', clone: 'clone_count' };
    const column = colMap[jokerId];
    const currentCount = (state as unknown as Record<string, unknown>)[column] as number;
    const newCount = currentCount + 1;
    const updates: Record<string, unknown> = {
      gold: newGold,
      [column]: newCount,
      updated_at: new Date().toISOString(),
    };
    const { data: updated } = await supabase.from('game_state').update(updates).eq('id', 1).select('*').single();
    if (updated) {
      setState(updated as GameStateRow);
      return true;
    }
    return false;
  }, [state]);

  const consumeJoker = useCallback((jokerId: 'undo' | 'multiply' | 'clone') => {
    const colMap = { undo: 'undo_count', multiply: 'multiply_count', clone: 'clone_count' };
    const column = colMap[jokerId];
    setState((prev) => {
      if (!prev) return prev;
      const currentCount = (prev as unknown as Record<string, unknown>)[column] as number;
      if (currentCount <= 0) return prev;
      const newCount = currentCount - 1;
      const updates: Record<string, unknown> = {
        [column]: newCount,
        updated_at: new Date().toISOString(),
      };
      supabase.from('game_state').update(updates).eq('id', 1).then();
      return { ...prev, [column]: newCount } as GameStateRow;
    });
  }, []);

  const clearNewAchievements = useCallback(() => {
    setNewlyEarned([]);
  }, []);

  return {
    playerName,
    discovered: state?.discovered ?? [],
    bestScore: state?.best_score ?? 0,
    bestTile: state?.best_tile ?? 0,
    totalGames: state?.total_games ?? 0,
    streak: state?.streak ?? 0,
    lastPlayedDate: state?.last_played_date ?? null,
    canClaimDaily,
    gold: state?.gold ?? 0,
    ownedThemes: state?.owned_themes ?? ['animals'],
    activeTheme,
    earnedAchievements: state?.earned_achievements ?? [],
    newlyEarnedAchievements: newlyEarned,
    undoCount: state?.undo_count ?? 0,
    multiplyCount: state?.multiply_count ?? 0,
    cloneCount: state?.clone_count ?? 0,
    ownedBackgrounds: state?.owned_backgrounds ?? ['gradient'],
    activeBackground,
    bestScoreByMode,
    setPlayerName,
    recordGame,
    claimDaily,
    buyTheme,
    setActiveTheme,
    buyBackground,
    setActiveBackground,
    buyJoker,
    consumeJoker,
    clearNewAchievements,
    loadLeaderboard,
    leaderboard,
    myRank,
  };
}
