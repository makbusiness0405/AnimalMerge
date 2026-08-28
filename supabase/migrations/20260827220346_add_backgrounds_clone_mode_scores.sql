-- Add clone joker, mode-specific best scores, backgrounds
ALTER TABLE game_state
  ADD COLUMN IF NOT EXISTS clone_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS best_score_classic integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS best_score_mega integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS best_score_time integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS active_background text DEFAULT 'gradient',
  ADD COLUMN IF NOT EXISTS owned_backgrounds text[] DEFAULT ARRAY['gradient']::text[];

-- Add mode column to scores for separate leaderboards
ALTER TABLE scores
  ADD COLUMN IF NOT EXISTS mode text DEFAULT 'classic';

-- Reset all progress
UPDATE game_state SET
  gold = 0,
  discovered = ARRAY[]::integer[],
  best_score = 0,
  best_tile = 0,
  total_games = 0,
  streak = 0,
  last_played_date = NULL,
  last_claim_date = NULL,
  earned_achievements = ARRAY[]::text[],
  owned_themes = ARRAY['animals']::text[],
  active_theme = 'animals',
  undo_count = 0,
  multiply_count = 0,
  clone_count = 0,
  best_score_classic = 0,
  best_score_mega = 0,
  best_score_time = 0,
  active_background = 'gradient',
  owned_backgrounds = ARRAY['gradient']::text[],
  updated_at = now();

-- Clear all scores
DELETE FROM scores;
