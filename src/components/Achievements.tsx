import { ACHIEVEMENTS } from '@/game/achievements';
import { Check, Lock } from 'lucide-react';

interface Props {
  earnedAchievements: string[];
}

export function Achievements({ earnedAchievements }: Props) {
  const earnedSet = new Set(earnedAchievements);
  const earnedCount = ACHIEVEMENTS.filter((a) => earnedSet.has(a.id)).length;
  const totalGold = ACHIEVEMENTS.filter((a) => earnedSet.has(a.id)).reduce((sum, a) => sum + a.reward, 0);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-stone-800">Achievements</h2>
        <span className="rounded-full px-3 py-1 text-sm font-bold text-white" style={{ background: 'linear-gradient(160deg,#7FC9A0,#4FB07F)' }}>
          {earnedCount} / {ACHIEVEMENTS.length}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {ACHIEVEMENTS.map((ach) => {
          const earned = earnedSet.has(ach.id);
          const Icon = ach.icon;
          return (
            <div
              key={ach.id}
              className="flex flex-col items-center rounded-2xl p-3 text-center"
              style={{
                background: earned
                  ? 'linear-gradient(160deg,#FFF4E6,#FFE9D6)'
                  : 'rgba(255,255,255,0.4)',
                opacity: earned ? 1 : 0.6,
                boxShadow: earned ? '0 2px 6px rgba(180,120,80,0.10)' : 'none',
              }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{
                  background: earned
                    ? 'linear-gradient(160deg,#E8B547,#D4A017)'
                    : '#D5CFC8',
                }}
              >
                {earned ? (
                  <Icon size={24} className="text-white" />
                ) : (
                  <Lock size={20} className="text-stone-400" />
                )}
              </div>
              <span className="mt-2 text-sm font-bold text-stone-800">{ach.name}</span>
              <span className="text-[11px] font-medium text-stone-500">{ach.description}</span>
              <div className="mt-1.5 flex items-center gap-1 text-xs font-bold" style={{ color: earned ? '#B8860B' : '#A89C92' }}>
                {earned && <Check size={12} />}
                +{ach.reward} gold
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs font-medium text-stone-400">
        Total earned: {totalGold} gold from {earnedCount} achievements
      </p>
    </div>
  );
}
