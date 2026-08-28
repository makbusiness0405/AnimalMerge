interface Palette { bg: string; bg2: string; ink: string; body: string; bodyDark: string; }

export const ALIEN_PALETTES: Record<number, Palette> = {
  2: { bg: '#1B2D5C', bg2: '#0F1A3A', ink: '#1A1A2E', body: '#7B9FFF', bodyDark: '#4A6BCC' },
  4: { bg: '#0D3B3B', bg2: '#062020', ink: '#0A2A2A', body: '#5EFFB0', bodyDark: '#2EBF7A' },
  8: { bg: '#2D1B5C', bg2: '#170D33', ink: '#1A0D3A', body: '#B89FFF', bodyDark: '#8B6BCC' },
  16: { bg: '#4A1B3C', bg2: '#240D1E', ink: '#2A0D1E', body: '#FF7BC4', bodyDark: '#CC4A9B' },
  32: { bg: '#0D3B4A', bg2: '#062028', ink: '#0A2A35', body: '#7BE8FF', bodyDark: '#4AB8CC' },
  64: { bg: '#4A3B0D', bg2: '#241D06', ink: '#2A2008', body: '#FFD75E', bodyDark: '#CC9B2E' },
  128: { bg: '#4A2D0D', bg2: '#241606', ink: '#2A1808', body: '#FFA05E', bodyDark: '#CC7A2E' },
  256: { bg: '#2D0D4A', bg2: '#170624', ink: '#1A0D2A', body: '#9E7BFF', bodyDark: '#6B4BCC' },
  512: { bg: '#4A0D2D', bg2: '#240617', ink: '#2A0617', body: '#FF7B8B', bodyDark: '#CC4A5B' },
  1024: { bg: '#0D2D4A', bg2: '#061724', ink: '#0A1A2A', body: '#7BC4FF', bodyDark: '#4A8BCC' },
  2048: { bg: '#0D4A2D', bg2: '#062417', ink: '#0A2A17', body: '#7BFFB0', bodyDark: '#2EBF7A' },
  4096: { bg: '#4A0D0D', bg2: '#240606', ink: '#2A0808', body: '#FF8B5E', bodyDark: '#CC5B2E' },
  8192: { bg: '#1B0D4A', bg2: '#0D0624', ink: '#0D0A2A', body: '#C47BFF', bodyDark: '#8B4BCC' },
  16384: { bg: '#0D4A4A', bg2: '#062424', ink: '#0A2A2A', body: '#5EFFE0', bodyDark: '#2EBFB0' },
  32768: { bg: '#4A3B0D', bg2: '#241D06', ink: '#2A2008', body: '#FFE05E', bodyDark: '#CCB52E' },
  65536: { bg: '#2D4A0D', bg2: '#172406', ink: '#1A2A08', body: '#C4FF5E', bodyDark: '#8BCC2E' },
  131072: { bg: '#0D0D4A', bg2: '#060624', ink: '#0A0A2A', body: '#5E7BFF', bodyDark: '#2E4BCC' },
};

export function alienPalette(value: number): Palette {
  return ALIEN_PALETTES[value] ?? { bg: '#0D2D4A', bg2: '#061724', ink: '#0A1A2A', body: '#7BC4FF', bodyDark: '#4A8BCC' };
}

export function AlienSilhouette({ value }: { value: number }) {
  const fill = 'rgba(255,255,255,0.5)';
  const stroke = 'rgba(255,255,255,0.7)';
  const sw = 2.4;

  switch (value) {
    case 2:
      return (
        <g>
          <circle cx="50" cy="50" r="14" fill={fill} stroke={stroke} strokeWidth={sw} />
          <path d="M50 64 q3 8 -2 16" stroke={fill} strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      );
    case 4:
      return <ellipse cx="50" cy="56" rx="26" ry="24" fill={fill} stroke={stroke} strokeWidth={sw} />;
    case 8:
      return (
        <g>
          <ellipse cx="50" cy="48" rx="24" ry="20" fill={fill} stroke={stroke} strokeWidth={sw} />
          <path d="M30 66 q-2 8 2 14 M42 68 q0 8 3 12 M50 68 q0 8 -3 12 M58 68 q0 8 3 12 M70 66 q2 8 -2 14" stroke={fill} strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      );
    case 16:
      return (
        <g>
          <ellipse cx="50" cy="64" rx="30" ry="9" fill={fill} stroke={stroke} strokeWidth={sw} />
          <path d="M30 60 Q50 38 70 60" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    case 32:
      return (
        <g>
          <ellipse cx="50" cy="48" rx="22" ry="28" fill={fill} stroke={stroke} strokeWidth={sw} />
          <ellipse cx="50" cy="74" rx="14" ry="10" fill={fill} stroke={stroke} strokeWidth={sw} />
        </g>
      );
    case 64:
      return (
        <g>
          <ellipse cx="50" cy="55" rx="22" ry="18" fill={fill} stroke={stroke} strokeWidth={sw} />
          <path d="M28 55 L14 48 M28 62 L12 64 M72 55 L86 48 M72 62 L88 64" stroke={fill} strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      );
    case 128:
      return (
        <g>
          <ellipse cx="50" cy="56" rx="24" ry="22" fill={fill} stroke={stroke} strokeWidth={sw} />
          <path d="M30 40 L24 26 L36 34 M70 40 L76 26 L64 34 M50 32 L50 18 M40 34 L34 22 M60 34 L66 22" stroke={fill} strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      );
    case 256:
      return (
        <g>
          <path d="M50 26 L74 50 L50 84 L26 50 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M26 50 L74 50 M50 26 L50 84" stroke={stroke} strokeWidth="1.5" />
        </g>
      );
    case 512:
      return (
        <g>
          <path d="M26 50 Q26 28 50 28 Q74 28 74 50 Q74 72 50 74 Q26 72 26 50 Z" fill={fill} stroke={stroke} strokeWidth={sw} />
          <path d="M30 42 Q38 36 46 42 Q52 48 58 42 Q64 36 70 42 M30 52 Q38 46 46 52 Q52 58 58 52 Q64 46 70 52 M30 62 Q38 56 46 62 Q52 68 58 62 Q64 56 70 62" stroke={stroke} strokeWidth="1.5" fill="none" />
        </g>
      );
    case 1024:
      return (
        <g>
          <ellipse cx="50" cy="58" rx="24" ry="26" fill={fill} stroke={stroke} strokeWidth={sw} />
          <path d="M34 34 L38 20 L44 30 L50 18 L56 30 L62 20 L66 34" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </g>
      );
    case 2048:
      return (
        <g>
          <circle cx="50" cy="56" r="28" fill={fill} stroke={stroke} strokeWidth={sw} />
          <circle cx="50" cy="56" r="36" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="3 4" />
          <path d="M50 22 L46 10 L54 14 L50 4" stroke={fill} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      );
    case 4096:
      return (
        <g>
          <ellipse cx="50" cy="56" rx="28" ry="24" fill={fill} stroke={stroke} strokeWidth={sw} />
          <path d="M30 40 L22 24 L36 34 M70 40 L78 24 L64 34 M50 30 L50 14 M38 32 L30 18 M62 32 L70 18" stroke={fill} strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      );
    case 8192:
      return (
        <g>
          <path d="M26 56 Q26 30 50 30 Q74 30 74 56 Q74 82 50 82 Q26 82 26 56 Z" fill={fill} stroke={stroke} strokeWidth={sw} />
          <circle cx="50" cy="56" r="36" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="2 4" />
        </g>
      );
    case 16384:
      return (
        <g>
          <circle cx="50" cy="56" r="28" fill={fill} stroke={stroke} strokeWidth={sw} />
          <path d="M22 56 L14 48 M22 56 L14 64 M78 56 L86 48 M78 56 L86 64" stroke={fill} strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      );
    case 32768:
      return (
        <g>
          <path d="M50 24 L76 56 L50 84 L24 56 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <circle cx="50" cy="56" r="40" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="2 3" />
        </g>
      );
    case 65536:
      return (
        <g>
          <circle cx="50" cy="56" r="30" fill={fill} stroke={stroke} strokeWidth={sw} />
          <circle cx="50" cy="56" r="22" fill="none" stroke={stroke} strokeWidth="1.5" />
          <circle cx="50" cy="56" r="14" fill="none" stroke={stroke} strokeWidth="1.5" />
          <circle cx="50" cy="56" r="6" fill="none" stroke={stroke} strokeWidth="1.5" />
        </g>
      );
    case 131072:
      return (
        <g>
          <circle cx="50" cy="56" r="30" fill={fill} stroke={stroke} strokeWidth={sw} />
          <circle cx="50" cy="56" r="40" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="1 4" />
          <circle cx="50" cy="56" r="48" fill="none" stroke={stroke} strokeWidth="1" strokeDasharray="1 6" />
        </g>
      );
    default:
      return (
        <g>
          <circle cx="50" cy="56" r="30" fill={fill} stroke={stroke} strokeWidth={sw} />
          <circle cx="50" cy="56" r="20" fill="none" stroke={stroke} strokeWidth="1.5" />
          <circle cx="50" cy="56" r="10" fill="none" stroke={stroke} strokeWidth="1.5" />
        </g>
      );
  }
}

export function AlienFace({ value }: { value: number }) {
  const p = alienPalette(value);

  switch (value) {
    case 2:
      return (
        <g>
          <circle cx="50" cy="50" r="14" fill={p.body} stroke={p.bodyDark} strokeWidth="1.5" />
          <circle cx="50" cy="48" r="5" fill={p.bodyDark} opacity="0.5" />
          <circle cx="50" cy="47" r="2.5" fill={p.bodyDark} />
          <circle cx="48" cy="46" r="1" fill="#fff" />
          <path d="M50 64 q3 8 -2 16" stroke={p.bodyDark} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      );
    case 4:
      return (
        <g>
          <ellipse cx="50" cy="56" rx="26" ry="24" fill={p.body} />
          <ellipse cx="50" cy="54" rx="12" ry="14" fill={p.bodyDark} opacity="0.4" />
          <circle cx="50" cy="52" r="5" fill="#fff" />
          <circle cx="52" cy="50" r="2.5" fill={p.bodyDark} />
          <path d="M44 66 q6 4 12 0" stroke={p.bodyDark} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      );
    case 8:
      return (
        <g>
          <ellipse cx="50" cy="48" rx="24" ry="20" fill={p.body} />
          <circle cx="42" cy="46" r="5" fill={p.bodyDark} />
          <circle cx="58" cy="46" r="5" fill={p.bodyDark} />
          <circle cx="43" cy="44" r="1.5" fill="#fff" />
          <circle cx="59" cy="44" r="1.5" fill="#fff" />
          <path d="M30 66 q-2 8 2 14 M42 68 q0 8 3 12 M50 68 q0 8 -3 12 M58 68 q0 8 3 12 M70 66 q2 8 -2 14" stroke={p.bodyDark} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M44 56 q6 3 12 0" stroke={p.bodyDark} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      );
    case 16:
      return (
        <g>
          <ellipse cx="50" cy="64" rx="30" ry="9" fill={p.bodyDark} />
          <path d="M30 60 Q50 38 70 60" fill={p.body} stroke={p.bodyDark} strokeWidth="1.5" />
          <ellipse cx="50" cy="56" rx="14" ry="10" fill={p.body} opacity="0.7" />
          <circle cx="40" cy="64" r="2.5" fill={p.bodyDark} />
          <circle cx="50" cy="66" r="2.5" fill={p.bodyDark} />
          <circle cx="60" cy="64" r="2.5" fill={p.bodyDark} />
          <ellipse cx="50" cy="50" rx="8" ry="6" fill={p.bodyDark} opacity="0.35" />
          <circle cx="48" cy="48" r="2" fill="#fff" />
        </g>
      );
    case 32:
      return (
        <g>
          <ellipse cx="50" cy="48" rx="22" ry="28" fill={p.body} />
          <ellipse cx="50" cy="74" rx="14" ry="10" fill={p.bodyDark} />
          <ellipse cx="38" cy="50" rx="6" ry="10" fill={p.bodyDark} transform="rotate(-15 38 50)" />
          <ellipse cx="62" cy="50" rx="6" ry="10" fill={p.bodyDark} transform="rotate(15 62 50)" />
          <circle cx="40" cy="46" r="1.5" fill="#fff" />
          <circle cx="60" cy="46" r="1.5" fill="#fff" />
          <ellipse cx="50" cy="62" rx="2" ry="1.5" fill={p.bodyDark} />
          <path d="M46 66 q4 2 8 0" stroke={p.bodyDark} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
      );
    case 64:
      return (
        <g>
          <ellipse cx="50" cy="55" rx="22" ry="18" fill={p.body} />
          <path d="M28 55 L14 48 M28 62 L12 64 M72 55 L86 48 M72 62 L88 64" stroke={p.bodyDark} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M30 50 L20 42 M70 50 L80 42" stroke={p.bodyDark} strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="42" cy="52" r="5" fill={p.bodyDark} />
          <circle cx="58" cy="52" r="5" fill={p.bodyDark} />
          <circle cx="43" cy="50" r="1.5" fill="#fff" />
          <circle cx="59" cy="50" r="1.5" fill="#fff" />
          <path d="M44 62 q6 3 12 0" stroke={p.bodyDark} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      );
    case 128:
      return (
        <g>
          <ellipse cx="50" cy="56" rx="24" ry="22" fill={p.body} />
          <path d="M30 40 L24 26 L36 34 M70 40 L76 26 L64 34 M50 32 L50 18 M40 34 L34 22 M60 34 L66 22" stroke={p.bodyDark} strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="42" cy="54" r="5" fill={p.bodyDark} />
          <circle cx="58" cy="54" r="5" fill={p.bodyDark} />
          <circle cx="43" cy="52" r="1.5" fill="#fff" />
          <circle cx="59" cy="52" r="1.5" fill="#fff" />
          <path d="M44 64 q6 4 12 0" stroke={p.bodyDark} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M46 62 l4 3 l4 -3" fill={p.bodyDark} />
        </g>
      );
    case 256:
      return (
        <g>
          <path d="M50 26 L74 50 L50 84 L26 50 Z" fill={p.body} stroke={p.bodyDark} strokeWidth="2" strokeLinejoin="round" />
          <path d="M26 50 L74 50 M50 26 L50 84 M36 40 L64 60 M64 40 L36 60" stroke={p.bodyDark} strokeWidth="1" opacity="0.4" />
          <circle cx="50" cy="50" r="7" fill={p.bodyDark} />
          <circle cx="51" cy="48" r="2.5" fill="#fff" />
        </g>
      );
    case 512:
      return (
        <g>
          <path d="M26 50 Q26 28 50 28 Q74 28 74 50 Q74 72 50 74 Q26 72 26 50 Z" fill={p.body} />
          <path d="M30 42 Q38 36 46 42 Q52 48 58 42 Q64 36 70 42" stroke={p.bodyDark} strokeWidth="2" fill="none" />
          <path d="M30 52 Q38 46 46 52 Q52 58 58 52 Q64 46 70 52" stroke={p.bodyDark} strokeWidth="2" fill="none" />
          <path d="M30 62 Q38 56 46 62 Q52 68 58 62 Q64 56 70 62" stroke={p.bodyDark} strokeWidth="2" fill="none" />
          <circle cx="40" cy="50" r="4" fill={p.bodyDark} />
          <circle cx="60" cy="50" r="4" fill={p.bodyDark} />
          <circle cx="41" cy="48" r="1.2" fill="#fff" />
          <circle cx="61" cy="48" r="1.2" fill="#fff" />
        </g>
      );
    case 1024:
      return (
        <g>
          <ellipse cx="50" cy="58" rx="24" ry="26" fill={p.body} />
          <path d="M34 34 L38 20 L44 30 L50 18 L56 30 L62 20 L66 34" fill={p.bodyDark} stroke={p.bodyDark} strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="50" cy="24" r="2.5" fill={p.bodyDark} />
          <ellipse cx="38" cy="54" rx="5" ry="8" fill={p.bodyDark} transform="rotate(-15 38 54)" />
          <ellipse cx="62" cy="54" rx="5" ry="8" fill={p.bodyDark} transform="rotate(15 62 54)" />
          <circle cx="40" cy="50" r="1.5" fill="#fff" />
          <circle cx="60" cy="50" r="1.5" fill="#fff" />
          <path d="M44 66 q6 4 12 0" stroke={p.bodyDark} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      );
    case 2048:
      return (
        <g>
          <circle cx="50" cy="56" r="28" fill={p.body} />
          <circle cx="50" cy="56" r="36" fill="none" stroke={p.bodyDark} strokeWidth="1.5" strokeDasharray="3 4" opacity="0.5" />
          <path d="M50 22 L46 10 L54 14 L50 4" stroke={p.bodyDark} strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="38" cy="52" rx="6" ry="9" fill={p.bodyDark} transform="rotate(-10 38 52)" />
          <ellipse cx="62" cy="52" rx="6" ry="9" fill={p.bodyDark} transform="rotate(10 62 52)" />
          <circle cx="40" cy="48" r="2" fill="#fff" />
          <circle cx="60" cy="48" r="2" fill="#fff" />
          <path d="M42 64 q8 5 16 0" stroke={p.bodyDark} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M38 70 L34 80 M62 70 L66 80 M50 72 L50 84" stroke={p.bodyDark} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      );
    case 4096:
      return (
        <g>
          <ellipse cx="50" cy="56" rx="28" ry="24" fill={p.body} />
          <path d="M30 40 L22 24 L36 34 M70 40 L78 24 L64 34 M50 30 L50 14 M38 32 L30 18 M62 32 L70 18" stroke={p.bodyDark} strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="42" cy="54" r="5" fill={p.bodyDark} />
          <circle cx="58" cy="54" r="5" fill={p.bodyDark} />
          <circle cx="43" cy="52" r="1.5" fill="#fff" />
          <circle cx="59" cy="52" r="1.5" fill="#fff" />
          <path d="M44 64 q6 4 12 0" stroke={p.bodyDark} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      );
    case 8192:
      return (
        <g>
          <path d="M26 56 Q26 30 50 30 Q74 30 74 56 Q74 82 50 82 Q26 82 26 56 Z" fill={p.body} />
          <circle cx="50" cy="56" r="36" fill="none" stroke={p.bodyDark} strokeWidth="1.5" strokeDasharray="2 4" opacity="0.4" />
          <circle cx="50" cy="56" r="8" fill={p.bodyDark} opacity="0.5" />
          <circle cx="50" cy="56" r="3" fill="#fff" />
        </g>
      );
    case 16384:
      return (
        <g>
          <circle cx="50" cy="56" r="28" fill={p.body} />
          <path d="M22 56 L14 48 M22 56 L14 64 M78 56 L86 48 M78 56 L86 64" stroke={p.bodyDark} strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="50" cy="56" r="10" fill={p.bodyDark} opacity="0.5" />
          <circle cx="50" cy="56" r="4" fill="#fff" />
        </g>
      );
    case 32768:
      return (
        <g>
          <path d="M50 24 L76 56 L50 84 L24 56 Z" fill={p.body} stroke={p.bodyDark} strokeWidth="2" strokeLinejoin="round" />
          <circle cx="50" cy="56" r="40" fill="none" stroke={p.bodyDark} strokeWidth="1.5" strokeDasharray="2 3" opacity="0.4" />
          <circle cx="50" cy="56" r="8" fill={p.bodyDark} />
          <circle cx="51" cy="54" r="3" fill="#fff" />
        </g>
      );
    case 65536:
      return (
        <g>
          <circle cx="50" cy="56" r="30" fill={p.body} />
          <circle cx="50" cy="56" r="22" fill="none" stroke={p.bodyDark} strokeWidth="1.5" opacity="0.5" />
          <circle cx="50" cy="56" r="14" fill="none" stroke={p.bodyDark} strokeWidth="1.5" opacity="0.4" />
          <circle cx="50" cy="56" r="6" fill={p.bodyDark} opacity="0.5" />
          <circle cx="50" cy="56" r="2" fill="#fff" />
        </g>
      );
    case 131072:
      return (
        <g>
          <circle cx="50" cy="56" r="30" fill={p.body} />
          <circle cx="50" cy="56" r="40" fill="none" stroke={p.bodyDark} strokeWidth="1.5" strokeDasharray="1 4" opacity="0.5" />
          <circle cx="50" cy="56" r="48" fill="none" stroke={p.bodyDark} strokeWidth="1" strokeDasharray="1 6" opacity="0.3" />
          <circle cx="50" cy="56" r="6" fill={p.bodyDark} />
          <circle cx="50" cy="56" r="2" fill="#fff" />
        </g>
      );
    default:
      return (
        <g>
          <circle cx="50" cy="56" r="30" fill={p.body} />
          <circle cx="50" cy="56" r="20" fill="none" stroke={p.bodyDark} strokeWidth="1.5" opacity="0.6" />
          <circle cx="50" cy="56" r="10" fill={p.bodyDark} opacity="0.3" />
          <circle cx="50" cy="56" r="4" fill={p.bodyDark} />
          <circle cx="35" cy="44" r="1.5" fill="#fff" />
          <circle cx="65" cy="48" r="1.5" fill="#fff" />
          <circle cx="60" cy="68" r="1" fill="#fff" />
          <circle cx="38" cy="66" r="1" fill="#fff" />
          <circle cx="50" cy="38" r="1.5" fill="#fff" />
        </g>
      );
  }
}
