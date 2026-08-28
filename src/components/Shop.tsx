import { useState } from 'react';
import { Check, Coins, Lock, Palette, Undo2, Zap, Sparkles, Copy, Image } from 'lucide-react';
import { THEMES, ThemeId } from '@/game/themes';
import { BACKGROUNDS, BackgroundId } from '@/game/backgrounds';
import { JOKERS } from '@/hooks/usePersistence';
import { playMenuClick } from '@/game/sounds';

type Section = 'jokers' | 'themes' | 'backgrounds';

interface Props {
  gold: number;
  ownedThemes: string[];
  activeTheme: ThemeId;
  onBuy: (themeId: ThemeId, price: number) => Promise<boolean>;
  onEquip: (themeId: ThemeId) => void;
  undoCount: number;
  multiplyCount: number;
  cloneCount: number;
  onBuyJoker: (jokerId: 'undo' | 'multiply' | 'clone', price: number) => Promise<boolean>;
  ownedBackgrounds: string[];
  activeBackground: BackgroundId;
  onBuyBackground: (bgId: BackgroundId, price: number) => Promise<boolean>;
  onEquipBackground: (bgId: BackgroundId) => void;
}

const JOKER_ICONS = { undo: Undo2, multiply: Sparkles, clone: Copy };
const JOKER_COUNTS = { undo: 'undoCount', multiply: 'multiplyCount', clone: 'cloneCount' } as const;

export function Shop({ gold, ownedThemes, activeTheme, onBuy, onEquip, undoCount, multiplyCount, cloneCount, onBuyJoker, ownedBackgrounds, activeBackground, onBuyBackground, onEquipBackground }: Props) {
  const [buying, setBuying] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [section, setSection] = useState<Section>('jokers');

  const jokerCounts = { undo: undoCount, multiply: multiplyCount, clone: cloneCount };

  const handleBuy = async (id: string, price: number, buyer: () => Promise<boolean>) => {
    setError(null);
    setBuying(id);
    const ok = await buyer();
    if (!ok) setError('Not enough gold!');
    setBuying(null);
  };

  const sections: { id: Section; label: string; icon: typeof Zap }[] = [
    { id: 'jokers', label: 'Jokers', icon: Zap },
    { id: 'themes', label: 'Themes', icon: Palette },
    { id: 'backgrounds', label: 'Boards', icon: Image },
  ];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-stone-800">Shop</h2>
        <div className="flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold text-white" style={{ background: 'linear-gradient(160deg,#E8B547,#D4A017)' }}>
          <Coins size={16} />
          {gold.toLocaleString()}
        </div>
      </div>

      {error && (
        <div className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-center text-sm font-bold text-red-600">
          {error}
        </div>
      )}

      {/* Section tabs */}
      <div className="mb-4 flex gap-1.5">
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { if (section !== id) playMenuClick(); setSection(id); }}
            className="flex flex-1 items-center justify-center gap-1 rounded-xl py-2.5 text-xs font-bold transition-all"
            style={{
              background: section === id ? 'linear-gradient(160deg,#FFE7C2,#FFD79A)' : 'rgba(255,255,255,0.4)',
              color: section === id ? '#92520A' : '#A8A29E',
            }}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Jokers */}
      {section === 'jokers' && (
        <div className="space-y-3">
          {JOKERS.map((joker) => {
            const count = jokerCounts[joker.id];
            const canAfford = gold >= joker.price;
            const Icon = JOKER_ICONS[joker.id];
            return (
              <div key={joker.id} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.5)', boxShadow: count > 0 ? '0 2px 8px rgba(180,120,80,0.12)' : 'none' }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: 'linear-gradient(160deg,#FFE7C2,#FFD79A)' }}>
                    <Icon size={26} className="text-amber-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-base font-bold text-stone-800">{joker.name}</span>
                      {count > 0 && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">x{count}</span>}
                    </div>
                    <p className="text-xs font-medium text-stone-500">{joker.description}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleBuy(joker.id, joker.price, () => onBuyJoker(joker.id, joker.price))}
                    disabled={buying === joker.id || !canAfford}
                    className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold text-white transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                    style={{ background: canAfford ? 'linear-gradient(160deg,#E8B547,#D4A017)' : '#C4B8AE' }}
                  >
                    {canAfford ? <Coins size={16} /> : <Lock size={16} />}
                    {joker.price}
                  </button>
                </div>
              </div>
            );
          })}
          <p className="mt-2 text-center text-xs font-medium text-stone-400">
            Jokers are consumed when used during a game. Buy extras anytime!
          </p>
        </div>
      )}

      {/* Themes */}
      {section === 'themes' && (
        <div className="space-y-3">
          {THEMES.map((theme) => {
            const owned = ownedThemes.includes(theme.id);
            const active = activeTheme === theme.id;
            const canAfford = gold >= theme.price;
            return (
              <div key={theme.id} className="rounded-2xl p-4" style={{ background: active ? 'linear-gradient(160deg,#FFF4E6,#FFE9D6)' : 'rgba(255,255,255,0.5)', boxShadow: active ? '0 2px 8px rgba(180,120,80,0.12)' : 'none' }}>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[2, 8, 64, 2048].map((v) => (
                      <div key={v} className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: `linear-gradient(160deg, ${theme.tileBg(v).bg} 0%, ${theme.tileBg(v).bg2} 100%)` }}>
                        <svg viewBox="0 0 100 100" className="h-9 w-9">
                          {theme.renderSilhouette(v)}
                          {theme.renderFace(v)}
                        </svg>
                      </div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <Palette size={14} className="text-stone-500" />
                      <span className="font-display text-base font-bold text-stone-800">{theme.name}</span>
                    </div>
                    <p className="text-xs font-medium text-stone-500">{theme.description}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-end gap-2">
                  {active ? (
                    <div className="flex items-center gap-1.5 rounded-xl bg-green-100 px-3 py-2 text-sm font-bold text-green-700">
                      <Check size={16} /> Equipped
                    </div>
                  ) : owned ? (
                    <button onClick={() => onEquip(theme.id)} className="rounded-xl px-4 py-2 text-sm font-bold text-white transition-transform active:scale-95" style={{ background: 'linear-gradient(160deg,#7FC9A0,#4FB07F)' }}>
                      Equip
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBuy(theme.id, theme.price, () => onBuy(theme.id, theme.price))}
                      disabled={buying === theme.id || !canAfford}
                      className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold text-white transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                      style={{ background: canAfford ? 'linear-gradient(160deg,#E8B547,#D4A017)' : '#C4B8AE' }}
                    >
                      {canAfford ? <Coins size={16} /> : <Lock size={16} />}
                      {theme.price}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Backgrounds */}
      {section === 'backgrounds' && (
        <div className="space-y-3">
          {BACKGROUNDS.map((bg) => {
            const owned = ownedBackgrounds.includes(bg.id);
            const active = activeBackground === bg.id;
            const canAfford = gold >= bg.price;
            return (
              <div key={bg.id} className="rounded-2xl p-4" style={{ background: active ? 'linear-gradient(160deg,#FFF4E6,#FFE9D6)' : 'rgba(255,255,255,0.5)', boxShadow: active ? '0 2px 8px rgba(180,120,80,0.12)' : 'none' }}>
                <div className="flex items-center gap-3">
                  {/* Preview */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: bg.boardBg, boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.1)' }}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: bg.cellBg }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <Image size={14} className="text-stone-500" />
                      <span className="font-display text-base font-bold text-stone-800">{bg.name}</span>
                    </div>
                    <p className="text-xs font-medium text-stone-500">{bg.description}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-end gap-2">
                  {active ? (
                    <div className="flex items-center gap-1.5 rounded-xl bg-green-100 px-3 py-2 text-sm font-bold text-green-700">
                      <Check size={16} /> Active
                    </div>
                  ) : owned ? (
                    <button onClick={() => onEquipBackground(bg.id)} className="rounded-xl px-4 py-2 text-sm font-bold text-white transition-transform active:scale-95" style={{ background: 'linear-gradient(160deg,#7FC9A0,#4FB07F)' }}>
                      Apply
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBuy(bg.id, bg.price, () => onBuyBackground(bg.id, bg.price))}
                      disabled={buying === bg.id || !canAfford}
                      className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold text-white transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                      style={{ background: canAfford ? 'linear-gradient(160deg,#E8B547,#D4A017)' : '#C4B8AE' }}
                    >
                      {canAfford ? <Coins size={16} /> : <Lock size={16} />}
                      {bg.price}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-4 text-center text-xs font-medium text-stone-400">
        Earn gold by playing games and unlocking achievements!
      </p>
    </div>
  );
}
