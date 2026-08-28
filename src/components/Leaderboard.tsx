import { useState } from 'react';
import { ScoreRow, GameMode } from '@/lib/supabase';
import { animalFor } from '@/game/animals';
import { Trophy } from 'lucide-react';
import { playMenuClick } from '@/game/sounds';

interface Props {
  leaderboard: ScoreRow[];
  myRank: number | null;
  myScore: number;
  onLoadMode: (mode: GameMode) => void;
}

const MODE_LABELS: { id: GameMode; label: string }[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'mega', label: 'Mega' },
  { id: 'time', label: 'Time Attack' },
];

export function Leaderboard({ leaderboard, myRank, myScore, onLoadMode }: Props) {
  const [mode, setMode] = useState<GameMode>('classic');

  const handleModeChange = (m: GameMode) => {
    if (m !== mode) playMenuClick();
    setMode(m);
    onLoadMode(m);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-stone-800">Leaderboard</h2>
        {myRank !== null && (
          <span className="rounded-full px-3 py-1 text-sm font-bold text-white" style={{ background: 'linear-gradient(160deg,#E8B547,#D4A017)' }}>
            Your rank: #{myRank}
          </span>
        )}
      </div>

      {/* Mode tabs */}
      <div className="mb-3 flex gap-1.5">
        {MODE_LABELS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleModeChange(id)}
            className="flex-1 rounded-xl py-2 text-xs font-bold transition-all"
            style={{
              background: mode === id ? 'linear-gradient(160deg,#FFE7C2,#FFD79A)' : 'rgba(255,255,255,0.4)',
              color: mode === id ? '#92520A' : '#A8A29E',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {leaderboard.length === 0 ? (
        <div className="rounded-2xl bg-white/50 p-6 text-center text-sm font-semibold text-stone-500">
          No scores yet for this mode. Be the first!
        </div>
      ) : (
        <div className="space-y-1.5">
          {leaderboard.map((row, i) => {
            const a = animalFor(row.highest_tile);
            const isTop3 = i < 3;
            const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
            return (
              <div
                key={row.id}
                className="flex items-center gap-3 rounded-2xl px-3 py-2.5"
                style={{
                  background: isTop3 ? `linear-gradient(160deg, ${medalColors[i]}22, ${medalColors[i]}11)` : 'rgba(255,255,255,0.5)',
                }}
              >
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-extrabold"
                  style={{
                    background: isTop3 ? medalColors[i] : '#E5DDD6',
                    color: isTop3 ? '#fff' : '#8A7E72',
                  }}
                >
                  {i + 1}
                </div>
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: `linear-gradient(160deg, ${a.bg}, ${a.bg2})` }}>
                  <svg viewBox="0 0 100 100" className="h-7 w-7">
                    <ellipse cx="50" cy="56" rx="26" ry="24" fill={a.bg} />
                    <circle cx="38" cy="50" r="5" fill={a.ink} />
                    <circle cx="62" cy="50" r="5" fill={a.ink} />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate font-bold text-stone-800">{row.player_name}</div>
                  <div className="text-xs font-semibold text-stone-500">Top tile: {row.highest_tile}</div>
                </div>
                <div className="flex items-center gap-1 font-display text-lg font-extrabold text-stone-800">
                  {isTop3 && <Trophy size={14} style={{ color: medalColors[i] }} />}
                  {row.score.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {myScore > 0 && myRank === null && (
        <p className="mt-3 text-center text-xs font-semibold text-stone-500">
          Your best: {myScore.toLocaleString()}
        </p>
      )}
    </div>
  );
}
