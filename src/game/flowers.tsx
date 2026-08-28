interface Palette { bg: string; bg2: string; ink: string; }

export const FLOWER_PALETTES: Record<number, Palette> = {
  2: { bg: '#FFF0F5', bg2: '#FFD6E8', ink: '#C2185B' },
  4: { bg: '#FFF3E0', bg2: '#FFE0B2', ink: '#E65100' },
  8: { bg: '#F3E5F5', bg2: '#E1BEE7', ink: '#6A1B9A' },
  16: { bg: '#E8F5E9', bg2: '#C8E6C9', ink: '#2E7D32' },
  32: { bg: '#E0F7FA', bg2: '#B2EBF2', ink: '#006064' },
  64: { bg: '#FFF8E1', bg2: '#FFECB3', ink: '#FF6F00' },
  128: { bg: '#FCE4EC', bg2: '#F8BBD0', ink: '#AD1457' },
  256: { bg: '#EDE7F6', bg2: '#D1C4E9', ink: '#4527A0' },
  512: { bg: '#E0F2F1', bg2: '#B2DFDB', ink: '#004D40' },
  1024: { bg: '#FFFDE7', bg2: '#FFF9C4', ink: '#F57F17' },
  2048: { bg: '#F1F8E9', bg2: '#DCEDC8', ink: '#33691E' },
  4096: { bg: '#FBE9E7', bg2: '#FFCCBC', ink: '#BF360C' },
  8192: { bg: '#F3E5F5', bg2: '#CE93D8', ink: '#4A148C' },
  16384: { bg: '#E0F7FA', bg2: '#80DEEA', ink: '#006064' },
  32768: { bg: '#FFF8E1', bg2: '#FFE082', ink: '#FF6F00' },
  65536: { bg: '#F1F8E9', bg2: '#AED581', ink: '#33691E' },
  131072: { bg: '#FCE4EC', bg2: '#F48FB1', ink: '#880E4F' },
};

export function flowerPalette(value: number): Palette {
  return FLOWER_PALETTES[value] ?? { bg: '#F1F8E9', bg2: '#DCEDC8', ink: '#33691E' };
}

function RadialPetals({ count, distance, rx, ry, fill, stroke, sw }: { count: number; distance: number; rx: number; ry: number; fill: string; stroke?: string; sw?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (360 / count) * i;
        const rad = (angle * Math.PI) / 180;
        const cx = 50 + Math.cos(rad) * distance;
        const cy = 56 + Math.sin(rad) * distance;
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill={fill}
            stroke={stroke}
            strokeWidth={sw}
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        );
      })}
    </>
  );
}

export function FlowerSilhouette({ value }: { value: number }) {
  const fill = 'rgba(255,255,255,0.5)';
  const stroke = 'rgba(255,255,255,0.7)';
  const sw = 2.4;

  switch (value) {
    case 2:
      return (
        <g>
          <path d="M50 82 L50 56" stroke={fill} strokeWidth="4" fill="none" strokeLinecap="round" />
          <ellipse cx="42" cy="62" rx="8" ry="5" fill={fill} stroke={stroke} strokeWidth={sw} transform="rotate(-30 42 62)" />
          <ellipse cx="58" cy="62" rx="8" ry="5" fill={fill} stroke={stroke} strokeWidth={sw} transform="rotate(30 58 62)" />
          <circle cx="50" cy="50" r="6" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    case 4:
      return (
        <g>
          <RadialPetals count={5} distance={16} rx={11} ry={7} fill={fill} stroke={stroke} sw={sw} />
          <circle cx="50" cy="56" r="8" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    case 8:
      return <path d="M28 52 Q28 34 50 34 Q72 34 72 52 Q72 68 50 72 Q28 68 28 52 Z" fill={fill} stroke={stroke} strokeWidth={sw} />;
    case 16:
      return (
        <g>
          <RadialPetals count={5} distance={15} rx={11} ry={8} fill={fill} stroke={stroke} sw={sw} />
          <circle cx="50" cy="56" r="7" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    case 32:
      return (
        <g>
          <RadialPetals count={12} distance={18} rx={10} ry={4} fill={fill} stroke={stroke} sw={sw} />
          <circle cx="50" cy="56" r="12" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    case 64:
      return (
        <g>
          <circle cx="50" cy="56" r="26" fill={fill} stroke={stroke} strokeWidth={sw} />
          <path d="M38 50 Q50 40 62 50 Q62 60 50 62 Q38 60 38 50" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    case 128:
      return (
        <g>
          <RadialPetals count={6} distance={18} rx={12} ry={5} fill={fill} stroke={stroke} sw={sw} />
          <circle cx="50" cy="56" r="8" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    case 256:
      return (
        <g>
          <path d="M30 70 Q30 40 50 30 Q70 40 70 70 Q60 72 50 66 Q40 72 30 70 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M36 68 Q36 48 50 40 Q64 48 64 68" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    case 512:
      return (
        <g>
          <ellipse cx="50" cy="42" rx="22" ry="14" fill={fill} stroke={stroke} strokeWidth={sw} />
          <RadialPetals count={3} distance={16} rx={14} ry={8} fill={fill} stroke={stroke} sw={sw} />
          <circle cx="50" cy="56" r="8" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    case 1024:
      return (
        <g>
          <RadialPetals count={12} distance={22} rx={12} ry={5} fill={fill} stroke={stroke} sw={sw} />
          <circle cx="50" cy="56" r="16" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    case 2048:
      return (
        <g>
          <RadialPetals count={8} distance={20} rx={14} ry={7} fill={fill} stroke={stroke} sw={sw} />
          <RadialPetals count={8} distance={12} rx={10} ry={5} fill={fill} stroke={stroke} sw={sw} />
          <circle cx="50" cy="56" r="8" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    case 4096:
      return (
        <g>
          <RadialPetals count={16} distance={24} rx={14} ry={5} fill={fill} stroke={stroke} sw={sw} />
          <circle cx="50" cy="56" r="14" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    case 8192:
      return (
        <g>
          <RadialPetals count={6} distance={20} rx={16} ry={8} fill={fill} stroke={stroke} sw={sw} />
          <RadialPetals count={6} distance={10} rx={10} ry={5} fill={fill} stroke={stroke} sw={sw} />
          <circle cx="50" cy="56" r="6" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    case 16384:
      return (
        <g>
          <path d="M28 50 Q28 32 50 32 Q72 32 72 50 Q72 72 50 76 Q28 72 28 50 Z" fill={fill} stroke={stroke} strokeWidth={sw} />
          <RadialPetals count={8} distance={18} rx={12} ry={5} fill={fill} stroke={stroke} sw={sw} />
        </g>
      );
    case 32768:
      return (
        <g>
          <RadialPetals count={20} distance={22} rx={14} ry={4} fill={fill} stroke={stroke} sw={sw} />
          <RadialPetals count={12} distance={14} rx={10} ry={4} fill={fill} stroke={stroke} sw={sw} />
          <circle cx="50" cy="56" r="10" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    case 65536:
      return (
        <g>
          <RadialPetals count={8} distance={22} rx={16} ry={8} fill={fill} stroke={stroke} sw={sw} />
          <RadialPetals count={8} distance={14} rx={12} ry={6} fill={fill} stroke={stroke} sw={sw} />
          <RadialPetals count={8} distance={8} rx={8} ry={4} fill={fill} stroke={stroke} sw={sw} />
          <circle cx="50" cy="56" r="6" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    case 131072:
      return (
        <g>
          <RadialPetals count={24} distance={26} rx={14} ry={4} fill={fill} stroke={stroke} sw={sw} />
          <RadialPetals count={16} distance={16} rx={10} ry={4} fill={fill} stroke={stroke} sw={sw} />
          <RadialPetals count={12} distance={8} rx={8} ry={3} fill={fill} stroke={stroke} sw={sw} />
          <circle cx="50" cy="56" r="8" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    default:
      return (
        <g>
          <RadialPetals count={16} distance={24} rx={14} ry={5} fill={fill} stroke={stroke} sw={sw} />
          <RadialPetals count={12} distance={14} rx={10} ry={4} fill={fill} stroke={stroke} sw={sw} />
          <circle cx="50" cy="56" r="10" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
  }
}

export function FlowerFace({ value }: { value: number }) {
  const p = flowerPalette(value);

  switch (value) {
    case 2:
      return (
        <g>
          <path d="M50 82 L50 56" stroke="#7CB342" strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="42" cy="62" rx="8" ry="5" fill="#A5D6A7" transform="rotate(-30 42 62)" />
          <ellipse cx="58" cy="62" rx="8" ry="5" fill="#A5D6A7" transform="rotate(30 58 62)" />
          <circle cx="50" cy="50" r="6" fill={p.bg} stroke={p.ink} strokeWidth="1" />
          <circle cx="50" cy="49" r="3" fill={p.ink} opacity="0.4" />
        </g>
      );
    case 4:
      return (
        <g>
          <RadialPetals count={5} distance={16} rx={11} ry={7} fill={p.bg} stroke={p.bg2} sw={1.5} />
          <circle cx="50" cy="56" r="8" fill={p.ink} />
          <circle cx="50" cy="56" r="4" fill={p.bg2} />
        </g>
      );
    case 8:
      return (
        <g>
          <path d="M28 52 Q28 34 50 34 Q72 34 72 52 Q72 68 50 72 Q28 68 28 52 Z" fill={p.bg} stroke={p.bg2} strokeWidth="1.5" />
          <path d="M50 34 Q42 46 44 56 M50 34 Q58 46 56 56" stroke={p.ink} strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M36 52 Q50 48 64 52" stroke={p.ink} strokeWidth="1.5" fill="none" opacity="0.4" />
        </g>
      );
    case 16:
      return (
        <g>
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (360 / 5) * i;
            const rad = (angle * Math.PI) / 180;
            const cx = 50 + Math.cos(rad) * 15;
            const cy = 56 + Math.sin(rad) * 15;
            return (
              <path
                key={i}
                d={`M${cx} ${cy} L${cx - 6} ${cy - 4} L${cx} ${cy - 8} L${cx + 6} ${cy - 4} Z`}
                fill={p.bg}
                stroke={p.bg2}
                strokeWidth="1.5"
                transform={`rotate(${angle} ${cx} ${cy})`}
              />
            );
          })}
          <circle cx="50" cy="56" r="7" fill={p.ink} />
          <circle cx="50" cy="56" r="3.5" fill={p.bg2} />
        </g>
      );
    case 32:
      return (
        <g>
          <RadialPetals count={12} distance={18} rx={10} ry={4} fill={p.bg} stroke={p.bg2} sw={1} />
          <circle cx="50" cy="56" r="12" fill={p.ink} />
          <circle cx="50" cy="56" r="9" fill={p.bg2} />
          <circle cx="46" cy="53" r="1.5" fill={p.ink} opacity="0.5" />
          <circle cx="54" cy="58" r="1.5" fill={p.ink} opacity="0.5" />
          <circle cx="52" cy="52" r="1" fill={p.ink} opacity="0.5" />
        </g>
      );
    case 64:
      return (
        <g>
          <circle cx="50" cy="56" r="26" fill={p.bg} stroke={p.bg2} strokeWidth="1.5" />
          <path d="M38 50 Q50 40 62 50 Q62 60 50 62 Q38 60 38 50" fill={p.bg2} />
          <path d="M44 52 Q50 48 56 52 Q56 57 50 57 Q44 57 44 52" fill={p.ink} opacity="0.3" />
          <path d="M40 46 Q50 42 60 46" stroke={p.ink} strokeWidth="1.5" fill="none" opacity="0.4" />
        </g>
      );
    case 128:
      return (
        <g>
          <RadialPetals count={6} distance={18} rx={12} ry={5} fill={p.bg} stroke={p.bg2} sw={1.5} />
          <circle cx="50" cy="56" r="8" fill={p.ink} />
          <path d="M46 54 L50 50 L54 54 L50 60 Z" fill={p.bg2} />
        </g>
      );
    case 256:
      return (
        <g>
          <path d="M30 70 Q30 40 50 30 Q70 40 70 70 Q60 72 50 66 Q40 72 30 70 Z" fill={p.bg} stroke={p.bg2} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M36 68 Q36 48 50 40 Q64 48 64 68" fill={p.bg2} />
          <path d="M42 64 Q42 52 50 48 Q58 52 58 64" fill={p.ink} opacity="0.25" />
        </g>
      );
    case 512:
      return (
        <g>
          <ellipse cx="50" cy="42" rx="22" ry="14" fill={p.bg} stroke={p.bg2} strokeWidth="1.5" />
          {Array.from({ length: 3 }).map((_, i) => {
            const angle = 60 + i * 60;
            const rad = (angle * Math.PI) / 180;
            const cx = 50 + Math.cos(rad) * 16;
            const cy = 56 + Math.sin(rad) * 16;
            return (
              <ellipse key={i} cx={cx} cy={cy} rx={14} ry={8} fill={p.bg} stroke={p.bg2} strokeWidth="1.5" transform={`rotate(${angle} ${cx} ${cy})`} />
            );
          })}
          <circle cx="50" cy="56" r="8" fill={p.ink} />
          <circle cx="50" cy="56" r="4" fill={p.bg2} />
        </g>
      );
    case 1024:
      return (
        <g>
          <RadialPetals count={12} distance={22} rx={12} ry={5} fill={p.bg} stroke={p.bg2} sw={1.5} />
          <circle cx="50" cy="56" r="16" fill={p.ink} />
          <circle cx="50" cy="56" r="12" fill={p.bg2} />
          <circle cx="46" cy="52" r="3" fill={p.bg} />
          <circle cx="54" cy="52" r="3" fill={p.bg} />
          <circle cx="47" cy="51" r="1" fill={p.ink} />
          <circle cx="55" cy="51" r="1" fill={p.ink} />
          <path d="M44 60 q6 5 12 0" stroke={p.ink} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      );
    case 2048:
      return (
        <g>
          <RadialPetals count={8} distance={20} rx={14} ry={7} fill={p.bg} stroke={p.bg2} sw={1.5} />
          <RadialPetals count={8} distance={12} rx={10} ry={5} fill={p.bg2} />
          <circle cx="50" cy="56" r="8" fill={p.ink} />
          <circle cx="50" cy="56" r="4" fill="#FFF9C4" />
        </g>
      );
    case 4096:
      return (
        <g>
          <RadialPetals count={16} distance={24} rx={14} ry={5} fill={p.bg} stroke={p.bg2} sw={1.5} />
          <circle cx="50" cy="56" r="14" fill={p.ink} />
          <circle cx="50" cy="56" r="10" fill={p.bg2} />
          <circle cx="46" cy="52" r="3" fill={p.bg} />
          <circle cx="54" cy="52" r="3" fill={p.bg} />
          <circle cx="47" cy="51" r="1" fill={p.ink} />
          <circle cx="55" cy="51" r="1" fill={p.ink} />
          <path d="M44 60 q6 5 12 0" stroke={p.ink} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      );
    case 8192:
      return (
        <g>
          <RadialPetals count={6} distance={20} rx={16} ry={8} fill={p.bg} stroke={p.bg2} sw={1.5} />
          <RadialPetals count={6} distance={10} rx={10} ry={5} fill={p.bg2} />
          <circle cx="50" cy="56" r="6" fill={p.ink} />
          <circle cx="50" cy="56" r="3" fill="#FFF9C4" />
        </g>
      );
    case 16384:
      return (
        <g>
          <path d="M28 50 Q28 32 50 32 Q72 32 72 50 Q72 72 50 76 Q28 72 28 50 Z" fill={p.bg} stroke={p.bg2} strokeWidth="1.5" />
          <RadialPetals count={8} distance={18} rx={12} ry={5} fill={p.bg2} />
          <circle cx="50" cy="56" r="8" fill={p.ink} />
          <circle cx="50" cy="56" r="4" fill="#FFF9C4" />
        </g>
      );
    case 32768:
      return (
        <g>
          <RadialPetals count={20} distance={22} rx={14} ry={4} fill={p.bg} stroke={p.bg2} sw={1.5} />
          <RadialPetals count={12} distance={14} rx={10} ry={4} fill={p.bg2} />
          <circle cx="50" cy="56" r="10" fill={p.ink} />
          <circle cx="50" cy="56" r="6" fill="#FFF9C4" />
        </g>
      );
    case 65536:
      return (
        <g>
          <RadialPetals count={8} distance={22} rx={16} ry={8} fill={p.bg} stroke={p.bg2} sw={1.5} />
          <RadialPetals count={8} distance={14} rx={12} ry={6} fill={p.bg2} />
          <RadialPetals count={8} distance={8} rx={8} ry={4} fill={p.bg} />
          <circle cx="50" cy="56" r="6" fill={p.ink} />
          <circle cx="50" cy="56" r="3" fill="#FFF9C4" />
        </g>
      );
    case 131072:
      return (
        <g>
          <RadialPetals count={24} distance={26} rx={14} ry={4} fill={p.bg} stroke={p.bg2} sw={1.5} />
          <RadialPetals count={16} distance={16} rx={10} ry={4} fill={p.bg2} />
          <RadialPetals count={12} distance={8} rx={8} ry={3} fill={p.bg} />
          <circle cx="50" cy="56" r="8" fill={p.ink} />
          <circle cx="50" cy="56" r="4" fill="#FFF9C4" />
        </g>
      );
    default:
      return (
        <g>
          <RadialPetals count={16} distance={24} rx={14} ry={5} fill={p.bg} stroke={p.bg2} sw={1.5} />
          <RadialPetals count={12} distance={14} rx={10} ry={4} fill={p.bg2} />
          <circle cx="50" cy="56" r="10" fill={p.ink} />
          <circle cx="50" cy="56" r="5" fill="#FFF9C4" />
        </g>
      );
  }
}
