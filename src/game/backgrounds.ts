export type BackgroundId = 'gradient' | 'wood' | 'metal' | 'sunset';

export interface BackgroundConfig {
  id: BackgroundId;
  name: string;
  description: string;
  price: number;
  free: boolean;
  /** CSS background for the board area */
  boardBg: string;
  /** CSS background for the page */
  pageBg: string;
  /** Background color for empty cells */
  cellBg: string;
  /** Box shadow for the board */
  boardShadow: string;
}

export const BACKGROUNDS: BackgroundConfig[] = [
  {
    id: 'gradient',
    name: 'Pastel',
    description: 'Soft warm gradient',
    price: 0,
    free: true,
    boardBg: 'linear-gradient(160deg, #FFF4E6 0%, #FFE9D6 100%)',
    pageBg: 'linear-gradient(170deg,#FFF7EE 0%,#FFE3D1 45%,#FFD6E8 100%)',
    cellBg: 'rgba(255,255,255,0.45)',
    boardShadow: 'inset 0 4px 14px rgba(180,120,80,0.12), 0 8px 24px rgba(180,120,80,0.14)',
  },
  {
    id: 'wood',
    name: 'Wood',
    description: 'Warm wooden tabletop',
    price: 150,
    free: false,
    boardBg: 'linear-gradient(160deg, #D4A76A 0%, #B8854A 100%)',
    pageBg: 'linear-gradient(170deg, #E8D0B0 0%, #D4A76A 50%, #B8854A 100%)',
    cellBg: 'rgba(255,255,255,0.25)',
    boardShadow: 'inset 0 4px 14px rgba(80,50,20,0.2), 0 8px 24px rgba(80,50,20,0.25)',
  },
  {
    id: 'metal',
    name: 'Metal',
    description: 'Sleek metallic finish',
    price: 150,
    free: false,
    boardBg: 'linear-gradient(160deg, #B8B8C0 0%, #8C8C96 50%, #A0A0A8 100%)',
    pageBg: 'linear-gradient(170deg, #D0D0D8 0%, #A8A8B0 50%, #8C8C96 100%)',
    cellBg: 'rgba(255,255,255,0.2)',
    boardShadow: 'inset 0 4px 14px rgba(40,40,50,0.25), 0 8px 24px rgba(40,40,50,0.2)',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Vibrant color transitions',
    price: 200,
    free: false,
    boardBg: 'linear-gradient(160deg, #FFE5B4 0%, #FFB088 50%, #FF8FA3 100%)',
    pageBg: 'linear-gradient(170deg, #FFE5B4 0%, #FFB088 40%, #FF8FA3 70%, #C896E8 100%)',
    cellBg: 'rgba(255,255,255,0.3)',
    boardShadow: 'inset 0 4px 14px rgba(150,80,60,0.15), 0 8px 24px rgba(150,80,60,0.2)',
  },
];

export function backgroundFor(id: string): BackgroundConfig {
  return BACKGROUNDS.find((b) => b.id === id) ?? BACKGROUNDS[0];
}
