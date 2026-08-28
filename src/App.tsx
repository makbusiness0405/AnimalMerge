import { useEffect, useRef, useState } from 'react';
import { Gamepad2, BookOpen, Trophy, User, ShoppingBag, Award, Undo2, Sparkles, Copy, Volume2, VolumeX } from 'lucide-react';
import { Board } from '@/components/Board';
import { ScoreBoard } from '@/components/ScoreBoard';
import { Collection } from '@/components/Collection';
import { Leaderboard } from '@/components/Leaderboard';
import { Profile } from '@/components/Profile';
import { Shop } from '@/components/Shop';
import { Achievements } from '@/components/Achievements';
import { useGame } from '@/hooks/useGame';
import { usePersistence } from '@/hooks/usePersistence';
import { ACHIEVEMENTS } from '@/game/achievements';
import { backgroundFor } from '@/game/backgrounds';
import { GameMode } from '@/lib/supabase';
import { playMenuClick, playBuy, playDailyClaim, initAudio, setMuted, isMuted } from '@/game/sounds';

type Tab = 'play' | 'collection' | 'shop' | 'achievements' | 'leaderboard' | 'profile';

function Overlay({ status, score, onNew, onContinue }: { status: 'won' | 'over'; score: number; onNew: () => void; onContinue?: () => void }) {
  const won = status === 'won';
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-3xl text-center backdrop-blur-sm" style={{ background: 'rgba(255,250,244,0.72)' }}>
      <div className="font-display text-4xl font-extrabold" style={{ color: won ? '#2E8B57' : '#C25A4A' }}>
        {won ? 'You met the Dragon!' : 'No more moves'}
      </div>
      <p className="mt-2 text-base font-semibold text-stone-600">Score: {score}</p>
      <div className="mt-5 flex gap-3">
        {won && onContinue && (
          <button onClick={onContinue} className="rounded-2xl px-5 py-2.5 font-bold text-white transition-transform active:scale-95" style={{ background: 'linear-gradient(160deg,#7FC9A0,#4FB07F)' }}>
            Keep going
          </button>
        )}
        <button onClick={onNew} className="rounded-2xl px-5 py-2.5 font-bold text-white transition-transform active:scale-95" style={{ background: 'linear-gradient(160deg,#FFB59E,#FF8E6B)' }}>
          New game
        </button>
      </div>
    </div>
  );
}

function AchievementToast({ ids, onClose }: { ids: string[]; onClose: () => void }) {
  if (ids.length === 0) return null;
  const ach = ACHIEVEMENTS.find((a) => a.id === ids[0]);
  if (!ach) return null;
  const Icon = ach.icon;
  return (
    <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2" style={{ animation: 'slide-down 0.3s ease' }}>
      <div className="flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lg" style={{ background: 'linear-gradient(160deg,#FFF4E6,#FFE9D6)', boxShadow: '0 4px 16px rgba(180,120,80,0.2)' }} onClick={onClose}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'linear-gradient(160deg,#E8B547,#D4A017)' }}>
          <Icon size={20} className="text-white" />
        </div>
        <div>
          <div className="text-xs font-bold text-amber-600">Achievement Unlocked!</div>
          <div className="font-display text-sm font-bold text-stone-800">{ach.name}</div>
          <div className="text-xs font-semibold text-amber-700">+{ach.reward} gold</div>
        </div>
      </div>
    </div>
  );
}

const MODES: { id: GameMode; label: string; color: string; colorActive: string; bg: string }[] = [
  { id: 'classic', label: 'Classic 4×4', color: '#92520A', colorActive: '#92520A', bg: 'linear-gradient(160deg,#FFE7C2,#FFD79A)' },
  { id: 'mega', label: 'Mega 8×8', color: '#0D47A1', colorActive: '#0D47A1', bg: 'linear-gradient(160deg,#D4E8FF,#A8CFFF)' },
  { id: 'time', label: 'Time Attack', color: '#6B2D5C', colorActive: '#6B2D5C', bg: 'linear-gradient(160deg,#F0D4E8,#E0A8C8)' },
];

function App() {
  const [tab, setTab] = useState<Tab>('play');
  const [mode, setMode] = useState<GameMode>('classic');
  const [leaderboardMode, setLeaderboardMode] = useState<GameMode>('classic');
  const [soundOn, setSoundOn] = useState(true);
  const persistence = usePersistence();

  const jokerState = { undoCount: persistence.undoCount, multiplyCount: persistence.multiplyCount, cloneCount: persistence.cloneCount };
  const { tiles, score, best, status, handleMove, newGame, continueGame, seenValues, recorded, size, undo, applyMultiply, applyClone, timeLeft, mode: gameMode } = useGame(mode, jokerState);

  const bg = backgroundFor(persistence.activeBackground);

  useEffect(() => {
    initAudio();
  }, []);

  useEffect(() => {
    setMuted(!soundOn);
  }, [soundOn]);

  const handleTabChange = (id: Tab) => {
    if (id !== tab) playMenuClick();
    setTab(id);
  };

  const handleModeChange = (m: GameMode) => {
    if (m !== mode) playMenuClick();
    setMode(m);
  };

  const handleNewGame = () => {
    playMenuClick();
    newGame();
  };

  const handleContinue = () => {
    playMenuClick();
    continueGame();
  };

  useEffect(() => {
    if (status === 'over' && !recorded.current && score >= 0) {
      recorded.current = true;
      const seen = Array.from(seenValues);
      const ht = tiles.filter((t) => !t.removing).reduce((max, t) => Math.max(max, t.value), 0);
      persistence.recordGame(gameMode, score, ht, seen);
    }
  }, [status, score, seenValues, tiles, recorded, persistence, gameMode]);

  const handleUndo = () => { if (undo()) persistence.consumeJoker('undo'); };
  const handleMultiply = () => { if (applyMultiply()) persistence.consumeJoker('multiply'); };
  const handleClone = () => { if (applyClone()) persistence.consumeJoker('clone'); };

  const tabs: { id: Tab; label: string; icon: typeof Gamepad2 }[] = [
    { id: 'play', label: 'Play', icon: Gamepad2 },
    { id: 'collection', label: 'Animals', icon: BookOpen },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'achievements', label: 'Badges', icon: Award },
    { id: 'leaderboard', label: 'Ranks', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ background: bg.pageBg }}>
      <div className="w-full max-w-[460px]">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: 'linear-gradient(160deg,#FFE08A,#FFC94D)' }}>
              <svg viewBox="0 0 100 100" className="h-7 w-7">
                <ellipse cx="50" cy="56" rx="26" ry="24" fill="#FFE08A" />
                <circle cx="38" cy="50" r="5.2" fill="#7A5B12" />
                <circle cx="62" cy="50" r="5.2" fill="#7A5B12" />
                <path d="M50 60 l-5 5 l5 4 l5 -4 z" fill="#FF9A3D" />
              </svg>
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold leading-none text-stone-800">Animal 2048</h1>
              <p className="text-xs font-semibold text-stone-500">Combine cute critters to meet the Dragon!</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {persistence.streak > 0 && (
              <div className="flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-bold text-white" style={{ background: 'linear-gradient(160deg,#FF9A3D,#F57F17)' }}>
                <span className="text-base">{persistence.streak}</span>
                <span className="text-xs">streak</span>
              </div>
            )}
            <div className="flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-bold text-white" style={{ background: 'linear-gradient(160deg,#E8B547,#D4A017)' }}>
              <span className="text-base">{persistence.gold}</span>
              <span className="text-xs">gold</span>
            </div>
            <button onClick={() => setSoundOn(s => !s)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/40 transition-transform active:scale-90">
              {soundOn ? <Volume2 size={16} className="text-stone-600" /> : <VolumeX size={16} className="text-stone-400" />}
            </button>
          </div>
        </header>

        {/* Tab navigation */}
        <nav className="mb-4 flex gap-1 rounded-2xl bg-white/40 p-1.5">
          {tabs.map(({ id, label, icon: Icon }) => {
            const active = tab === id;
            return (
              <button key={id} onClick={() => handleTabChange(id)} className="flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 transition-all" style={{ background: active ? 'linear-gradient(160deg,#FFE7C2,#FFD79A)' : 'transparent', boxShadow: active ? '0 2px 6px rgba(180,120,80,0.12)' : 'none' }}>
                <Icon size={18} className={active ? 'text-amber-700' : 'text-stone-400'} />
                <span className={`text-[10px] font-bold ${active ? 'text-amber-800' : 'text-stone-400'}`}>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Tab content */}
        {tab === 'play' && (
          <>
            {/* Mode selector */}
            <div className="mb-3 flex gap-2">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleModeChange(m.id)}
                  className="flex-1 rounded-xl py-2 text-xs font-bold transition-all"
                  style={{
                    background: mode === m.id ? m.bg : 'rgba(255,255,255,0.4)',
                    color: mode === m.id ? m.colorActive : '#A8A29E',
                    boxShadow: mode === m.id ? '0 2px 6px rgba(180,120,80,0.12)' : 'none',
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <ScoreBoard score={score} best={best} onNewGame={handleNewGame} timeLeft={mode === 'time' ? timeLeft : undefined} />
            </div>

            {/* Joker buttons */}
            <div className="mb-3 flex gap-2">
              <button onClick={handleUndo} disabled={persistence.undoCount <= 0} className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold transition-all active:scale-95 disabled:opacity-40 disabled:active:scale-100" style={{ background: persistence.undoCount > 0 ? 'linear-gradient(160deg,#FFE7C2,#FFD79A)' : 'rgba(255,255,255,0.3)', color: persistence.undoCount > 0 ? '#92520A' : '#A8A29E' }}>
                <Undo2 size={16} />
                Undo
                {persistence.undoCount > 0 && <span className="rounded-full bg-amber-200 px-1.5 text-xs font-bold text-amber-800">x{persistence.undoCount}</span>}
              </button>
              <button onClick={handleMultiply} disabled={persistence.multiplyCount <= 0} className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold transition-all active:scale-95 disabled:opacity-40 disabled:active:scale-100" style={{ background: persistence.multiplyCount > 0 ? 'linear-gradient(160deg,#D4E8FF,#A8CFFF)' : 'rgba(255,255,255,0.3)', color: persistence.multiplyCount > 0 ? '#0D47A1' : '#A8A29E' }}>
                <Sparkles size={16} />
                Double
                {persistence.multiplyCount > 0 && <span className="rounded-full bg-blue-200 px-1.5 text-xs font-bold text-blue-800">x{persistence.multiplyCount}</span>}
              </button>
              <button onClick={handleClone} disabled={persistence.cloneCount <= 0} className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold transition-all active:scale-95 disabled:opacity-40 disabled:active:scale-100" style={{ background: persistence.cloneCount > 0 ? 'linear-gradient(160deg,#D4E8D4,#A8D4A8)' : 'rgba(255,255,255,0.3)', color: persistence.cloneCount > 0 ? '#2E5C2E' : '#A8A29E' }}>
                <Copy size={16} />
                Clone
                {persistence.cloneCount > 0 && <span className="rounded-full bg-green-200 px-1.5 text-xs font-bold text-green-800">x{persistence.cloneCount}</span>}
              </button>
            </div>

            <div className="relative">
              <Board tiles={tiles} onMove={handleMove} themeId={persistence.activeTheme} gridSize={size} background={bg} />
              {(status === 'won' || status === 'over') && (
                <Overlay status={status} score={score} onNew={handleNewGame} onContinue={status === 'won' ? handleContinue : undefined} />
              )}
            </div>
            <p className="mt-4 text-center text-sm font-medium text-stone-500">
              {mode === 'mega' ? 'Mega mode: 8×8 grid with tiles up to 131072!' : mode === 'time' ? 'Time Attack: score as high as you can in 2 minutes!' : 'Swipe or use arrow keys / WASD to merge matching animals.'}
            </p>
          </>
        )}

        {tab === 'collection' && (
          <div className="rounded-3xl bg-white/40 p-4">
            <Collection discovered={persistence.discovered} />
          </div>
        )}

        {tab === 'shop' && (
          <div className="rounded-3xl bg-white/40 p-4">
            <Shop
              gold={persistence.gold}
              ownedThemes={persistence.ownedThemes}
              activeTheme={persistence.activeTheme}
              onBuy={(themeId, price) => { return persistence.buyTheme(themeId, price).then(ok => { if (ok) playBuy(); return ok; }); }}
              onEquip={(themeId) => { playMenuClick(); persistence.setActiveTheme(themeId); }}
              undoCount={persistence.undoCount}
              multiplyCount={persistence.multiplyCount}
              cloneCount={persistence.cloneCount}
              onBuyJoker={(jokerId, price) => { return persistence.buyJoker(jokerId, price).then(ok => { if (ok) playBuy(); return ok; }); }}
              ownedBackgrounds={persistence.ownedBackgrounds}
              activeBackground={persistence.activeBackground}
              onBuyBackground={(bgId, price) => { return persistence.buyBackground(bgId, price).then(ok => { if (ok) playBuy(); return ok; }); }}
              onEquipBackground={(bgId) => { playMenuClick(); persistence.setActiveBackground(bgId); }}
            />
          </div>
        )}

        {tab === 'achievements' && (
          <div className="rounded-3xl bg-white/40 p-4">
            <Achievements earnedAchievements={persistence.earnedAchievements} />
          </div>
        )}

        {tab === 'leaderboard' && (
          <div className="rounded-3xl bg-white/40 p-4">
            <Leaderboard leaderboard={persistence.leaderboard} myRank={persistence.myRank} myScore={persistence.bestScoreByMode[leaderboardMode]} onLoadMode={(m) => { setLeaderboardMode(m); persistence.loadLeaderboard(m); }} />
          </div>
        )}

        {tab === 'profile' && (
          <div className="rounded-3xl bg-white/40 p-4">
            <Profile
              streak={persistence.streak}
              canClaim={persistence.canClaimDaily}
              onClaim={() => { persistence.claimDaily().then(() => playDailyClaim()); }}
              playerName={persistence.playerName}
              onNameChange={persistence.setPlayerName}
              bestScore={persistence.bestScore}
              bestTile={persistence.bestTile}
              totalGames={persistence.totalGames}
            />
          </div>
        )}
      </div>

      <AchievementToast ids={persistence.newlyEarnedAchievements} onClose={persistence.clearNewAchievements} />
    </div>
  );
}

export default App;
