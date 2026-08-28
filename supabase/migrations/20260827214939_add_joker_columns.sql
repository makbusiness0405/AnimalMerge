ALTER TABLE game_state
  ADD COLUMN IF NOT EXISTS undo_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS multiply_count integer DEFAULT 0;
