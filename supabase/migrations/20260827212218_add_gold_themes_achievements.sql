/*
# Add gold, themes, and achievements to game_state

## Purpose
Support the shop economy (gold currency, owned/active themes) and achievement tracking.

## Changes to game_state table
- `gold` (integer, default 0) — currency earned by playing, spent in the shop
- `owned_themes` (text[], default '{animals}') — theme IDs the player owns
- `active_theme` (text, default 'animals') — currently equipped theme
- `earned_achievements` (text[], default '{}') — IDs of earned achievements

## Security
- No policy changes. Existing anon+authenticated CRUD policies on game_state cover these columns.

## Notes
1. 'animals' is the default free theme, pre-owned for all players.
2. Gold is earned per game based on score (score / 10, rounded).
3. Themes are purchased with gold in the shop.
*/

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'game_state' AND column_name = 'gold') THEN
    ALTER TABLE game_state ADD COLUMN gold integer NOT NULL DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'game_state' AND column_name = 'owned_themes') THEN
    ALTER TABLE game_state ADD COLUMN owned_themes text[] NOT NULL DEFAULT '{animals}';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'game_state' AND column_name = 'active_theme') THEN
    ALTER TABLE game_state ADD COLUMN active_theme text NOT NULL DEFAULT 'animals';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'game_state' AND column_name = 'earned_achievements') THEN
    ALTER TABLE game_state ADD COLUMN earned_achievements text[] NOT NULL DEFAULT '{}';
  END IF;
END $$;
