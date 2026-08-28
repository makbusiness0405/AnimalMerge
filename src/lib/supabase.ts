import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false },
});

export type GameMode = 'classic' | 'mega' | 'time';

export interface ScoreRow {
  id: string;
  player_name: string;
  score: number;
  highest_tile: number;
  played_at: string;
  mode: GameMode;
}

export interface GameStateRow {
  id: number;
  player_name: string;
  discovered: number[];
  best_score: number;
  best_tile: number;
  total_games: number;
  streak: number;
  last_played_date: string | null;
  last_claim_date: string | null;
  updated_at: string;
  gold: number;
  owned_themes: string[];
  active_theme: string;
  earned_achievements: string[];
  undo_count: number;
  multiply_count: number;
  clone_count: number;
  best_score_classic: number;
  best_score_mega: number;
  best_score_time: number;
  active_background: string;
  owned_backgrounds: string[];
}
