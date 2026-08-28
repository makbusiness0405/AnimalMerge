import { AnimalFace, AnimalSilhouette, ANIMALS, animalFor } from './animals';
import { AlienFace, AlienSilhouette, alienPalette } from './aliens';
import { FlowerFace, FlowerSilhouette, flowerPalette } from './flowers';

export type ThemeId = 'animals' | 'aliens' | 'flowers';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  price: number;
  free: boolean;
  tileBg: (value: number) => { bg: string; bg2: string; ink: string };
  renderFace: (value: number) => React.ReactNode;
  renderSilhouette: (value: number) => React.ReactNode;
  renderBadge: (value: number) => React.ReactNode;
}

// --- Theme registry ---
export const THEMES: ThemeConfig[] = [
  {
    id: 'animals',
    name: 'Animals',
    description: 'The classic cute critters',
    price: 0,
    free: true,
    tileBg: (v) => animalFor(v),
    renderFace: (v) => <AnimalFace value={v} />,
    renderSilhouette: (v) => <AnimalSilhouette value={v} />,
    renderBadge: (v) => {
      const a = animalFor(v);
      return (
        <svg viewBox="0 0 100 100" className="h-12 w-12">
          <ellipse cx="50" cy="56" rx="26" ry="24" fill={a.bg} />
          <circle cx="38" cy="50" r="5" fill={a.ink} />
          <circle cx="62" cy="50" r="5" fill={a.ink} />
        </svg>
      );
    },
  },
  {
    id: 'aliens',
    name: 'Aliens',
    description: 'Cosmic creatures from outer space',
    price: 200,
    free: false,
    tileBg: (v) => alienPalette(v),
    renderFace: (v) => <AlienFace value={v} />,
    renderSilhouette: (v) => <AlienSilhouette value={v} />,
    renderBadge: (v) => {
      const p = alienPalette(v);
      return (
        <svg viewBox="0 0 100 100" className="h-12 w-12">
          <rect x="10" y="10" width="80" height="80" rx="16" fill={p.bg} />
          <circle cx="50" cy="50" r="22" fill={p.body} />
          <ellipse cx="50" cy="46" rx="10" ry="12" fill={p.bodyDark} opacity="0.7" />
          <circle cx="50" cy="44" r="3" fill="#fff" />
        </svg>
      );
    },
  },
  {
    id: 'flowers',
    name: 'Flowers',
    description: 'Soft botanical pastel tones',
    price: 200,
    free: false,
    tileBg: (v) => flowerPalette(v),
    renderFace: (v) => <FlowerFace value={v} />,
    renderSilhouette: (v) => <FlowerSilhouette value={v} />,
    renderBadge: (v) => {
      const p = flowerPalette(v);
      return (
        <svg viewBox="0 0 100 100" className="h-12 w-12">
          <g transform="translate(0 6)">
            {[0, 72, 144, 216, 288].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const cx = 50 + Math.cos(rad) * 14;
              const cy = 50 + Math.sin(rad) * 14;
              return (
                <ellipse key={angle} cx={cx} cy={cy} rx="10" ry="6" fill={p.bg} transform={`rotate(${angle} ${cx} ${cy})`} />
              );
            })}
            <circle cx="50" cy="50" r="7" fill={p.ink} />
          </g>
        </svg>
      );
    },
  },
];

export function themeFor(id: ThemeId): ThemeConfig {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

export { ANIMALS };
