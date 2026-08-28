interface Props {
  score: number;
  best: number;
  onNewGame: () => void;
  timeLeft?: number;
}

export function ScoreBoard({ score, best, onNewGame, timeLeft }: Props) {
  return (
    <div className="flex w-full items-stretch gap-3">
      <div className="flex flex-1 flex-col justify-center rounded-2xl px-4 py-2.5 text-center" style={{ background: 'linear-gradient(160deg,#FFE7C2,#FFD79A)' }}>
        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700/80">Score</span>
        <span className="font-display text-2xl font-extrabold leading-tight text-amber-900">{score}</span>
      </div>
      {timeLeft !== undefined ? (
        <div className="flex flex-1 flex-col justify-center rounded-2xl px-4 py-2.5 text-center" style={{ background: 'linear-gradient(160deg,#F0D4E8,#E0A8C8)' }}>
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700/80">Time</span>
          <span className="font-display text-2xl font-extrabold leading-tight text-purple-900" style={{ color: timeLeft <= 10 ? '#C25A4A' : '#6B2D5C' }}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
      ) : (
        <div className="flex flex-1 flex-col justify-center rounded-2xl px-4 py-2.5 text-center" style={{ background: 'linear-gradient(160deg,#FFE2EC,#FFC9DD)' }}>
          <span className="text-[11px] font-bold uppercase tracking-wider text-pink-700/80">Best</span>
          <span className="font-display text-2xl font-extrabold leading-tight text-pink-900">{best}</span>
        </div>
      )}
      <button
        onClick={onNewGame}
        className="flex items-center justify-center gap-1.5 rounded-2xl px-4 py-2.5 font-bold text-white transition-transform active:scale-95"
        style={{ background: 'linear-gradient(160deg,#7FC9A0,#4FB07F)' }}
      >
        New
      </button>
    </div>
  );
}
