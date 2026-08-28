import { useState } from 'react';
import { Flame, Gift } from 'lucide-react';

interface Props {
  streak: number;
  canClaim: boolean;
  onClaim: () => void;
  playerName: string;
  onNameChange: (name: string) => void;
  bestScore: number;
  bestTile: number;
  totalGames: number;
}

export function Profile({ streak, canClaim, onClaim, playerName, onNameChange, bestScore, bestTile, totalGames }: Props) {
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(playerName);

  const saveName = () => {
    onNameChange(nameInput);
    setEditing(false);
  };

  return (
    <div className="space-y-4">
      {/* Profile card */}
      <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(160deg,#FFF4E6,#FFE9D6)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ background: 'linear-gradient(160deg,#FFB59E,#FF8E6B)' }}>
              <Flame size={20} />
            </div>
            {editing ? (
              <div className="flex items-center gap-1.5">
                <input
                  autoFocus
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveName()}
                  maxLength={16}
                  className="w-28 rounded-lg border border-stone-300 px-2 py-1 text-sm font-bold text-stone-800 outline-none focus:border-amber-400"
                />
                <button onClick={saveName} className="rounded-lg px-2 py-1 text-xs font-bold text-white" style={{ background: '#4FB07F' }}>
                  Save
                </button>
              </div>
            ) : (
              <button onClick={() => { setNameInput(playerName); setEditing(true); }} className="font-display text-lg font-bold text-stone-800">
                {playerName}
              </button>
            )}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-white/60 py-2">
            <div className="text-[10px] font-bold uppercase tracking-wide text-stone-500">Best Score</div>
            <div className="font-display text-lg font-extrabold text-stone-800">{bestScore}</div>
          </div>
          <div className="rounded-xl bg-white/60 py-2">
            <div className="text-[10px] font-bold uppercase tracking-wide text-stone-500">Best Tile</div>
            <div className="font-display text-lg font-extrabold text-stone-800">{bestTile}</div>
          </div>
          <div className="rounded-xl bg-white/60 py-2">
            <div className="text-[10px] font-bold uppercase tracking-wide text-stone-500">Games</div>
            <div className="font-display text-lg font-extrabold text-stone-800">{totalGames}</div>
          </div>
        </div>
      </div>

      {/* Daily streak card */}
      <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(160deg,#FFE7C2,#FFD79A)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame size={22} className="text-orange-500" />
            <div>
              <div className="font-display text-base font-bold text-amber-900">Daily Streak</div>
              <div className="text-xs font-semibold text-amber-700">{streak} day{streak !== 1 ? 's' : ''} in a row!</div>
            </div>
          </div>
          {canClaim ? (
            <button
              onClick={onClaim}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold text-white transition-transform active:scale-95"
              style={{ background: 'linear-gradient(160deg,#FF9A3D,#F57F17)' }}
            >
              <Gift size={16} />
              Claim
            </button>
          ) : (
            <span className="rounded-xl bg-white/50 px-3 py-2 text-sm font-bold text-amber-700">
              Come back tomorrow!
            </span>
          )}
        </div>
        {/* Streak dots */}
        <div className="mt-3 flex justify-between gap-1">
          {Array.from({ length: 7 }).map((_, i) => {
            const filled = i < (streak % 7 || (streak >= 7 ? 7 : 0));
            return (
              <div
                key={i}
                className="flex-1 rounded-lg py-1.5 text-center text-xs font-bold"
                style={{
                  background: filled ? 'linear-gradient(160deg,#FF9A3D,#F57F17)' : 'rgba(255,255,255,0.5)',
                  color: filled ? '#fff' : '#C4A05A',
                }}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
