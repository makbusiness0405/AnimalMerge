/*
# Create scores and game_state tables for Animal 2048

## Purpose
Persistence layer for retention features: global leaderboard, animal collection tracking, and daily streak.

## New Tables

### scores
- `id` (uuid, primary key)
- `player_name` (text, not null — display name for leaderboard, defaults to 'Anonymous')
- `score` (integer, not null — final game score)
- `highest_tile` (integer, not null — highest tile value reached, e.g. 256)
- `played_at` (timestamptz, default now() — when the game ended)

### game_state
- `id` (int, primary key, always 1 — single-row table for the local player)
- `player_name` (text, default 'Anonymous')
- `discovered` (integer array, default '{}' — list of tile values the player has ever seen, e.g. [2,4,8,16])
- `best_score` (integer, default 0)
- `best_tile` (integer, default 0)
- `total_games` (integer, default 0)
- `streak` (integer, default 0 — consecutive days played)
- `last_played_date` (date, nullable — last date the player played)
- `last_claim_date` (date, nullable — last date the daily reward was claimed)
- `updated_at` (timestamptz, default now())

## Security
- RLS enabled on both tables.
- This is a no-auth single-tenant app: policies use `TO anon, authenticated` with `USING (true)` / `WITH CHECK (true)` because the data is intentionally public/shared (leaderboard is global, game state is local to the device).
- The single-row game_state table (id=1) acts as the local player's persistent profile.

## Notes
1. `scores` is a global leaderboard — all inserts are visible to everyone.
2. `game_state` stores the local player's collection and streak data. The `discovered` integer array tracks which animals have been unlocked.
3. Both tables allow anon access because the app has no sign-in screen.
*/

CREATE TABLE IF NOT EXISTS scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL DEFAULT 'Anonymous',
  score integer NOT NULL,
  highest_tile integer NOT NULL,
  played_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_scores" ON scores;
CREATE POLICY "anon_select_scores" ON scores FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_scores" ON scores;
CREATE POLICY "anon_insert_scores" ON scores FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_scores" ON scores;
CREATE POLICY "anon_delete_scores" ON scores FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS game_state (
  id integer PRIMARY KEY DEFAULT 1,
  player_name text NOT NULL DEFAULT 'Anonymous',
  discovered integer[] NOT NULL DEFAULT '{}',
  best_score integer NOT NULL DEFAULT 0,
  best_tile integer NOT NULL DEFAULT 0,
  total_games integer NOT NULL DEFAULT 0,
  streak integer NOT NULL DEFAULT 0,
  last_played_date date,
  last_claim_date date,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

ALTER TABLE game_state ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_game_state" ON game_state;
CREATE POLICY "anon_select_game_state" ON game_state FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_game_state" ON game_state;
CREATE POLICY "anon_insert_game_state" ON game_state FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_game_state" ON game_state;
CREATE POLICY "anon_update_game_state" ON game_state FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_scores_score_desc ON scores (score DESC);
CREATE INDEX IF NOT EXISTS idx_scores_played_at_desc ON scores (played_at DESC);
