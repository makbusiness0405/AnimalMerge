interface AnimalConfig {
  name: string;
  bg: string;
  bg2: string;
  ink: string;
  badge: string;
}

export const ANIMALS: Record<number, AnimalConfig> = {
  2: { name: 'Chick', bg: '#FFE894', bg2: '#FFD93D', ink: '#8B6914', badge: '#FFFFFF' },
  4: { name: 'Bunny', bg: '#F5F0EB', bg2: '#E8DDD3', ink: '#8B6F47', badge: '#FFFFFF' },
  8: { name: 'Kitty', bg: '#C8C8D0', bg2: '#B0B0BC', ink: '#4A4A55', badge: '#FFFFFF' },
  16: { name: 'Puppy', bg: '#E8C49C', bg2: '#D4A574', ink: '#6B4423', badge: '#FFFFFF' },
  32: { name: 'Panda', bg: '#FAFAFA', bg2: '#EBEBEF', ink: '#2B2B33', badge: '#FFFFFF' },
  64: { name: 'Fox', bg: '#FF8847', bg2: '#E66A2A', ink: '#7A2E0A', badge: '#FFFFFF' },
  128: { name: 'Bear', bg: '#A87850', bg2: '#8B5E3C', ink: '#3D2410', badge: '#FFFFFF' },
  256: { name: 'Koala', bg: '#B5B8BD', bg2: '#9CA0A6', ink: '#3D4248', badge: '#FFFFFF' },
  512: { name: 'Tiger', bg: '#FF9A3D', bg2: '#F57F17', ink: '#5C2E05', badge: '#FFFFFF' },
  1024: { name: 'Lion', bg: '#E8B547', bg2: '#D4A017', ink: '#6B4A05', badge: '#FFFFFF' },
  2048: { name: 'Dragon', bg: '#5FCE8A', bg2: '#2DA866', ink: '#0F4A2E', badge: '#FFFFFF' },
  4096: { name: 'Phoenix', bg: '#FF6B3D', bg2: '#E63E17', ink: '#5C1E08', badge: '#FFFFFF' },
  8192: { name: 'Unicorn', bg: '#E0B0FF', bg2: '#C488E8', ink: '#4A1A6B', badge: '#FFFFFF' },
  16384: { name: 'Kraken', bg: '#4ECDC4', bg2: '#26A69A', ink: '#003D33', badge: '#FFFFFF' },
  32768: { name: 'Griffin', bg: '#D4A76A', bg2: '#B8860B', ink: '#3D2B00', badge: '#FFFFFF' },
  65536: { name: 'Qilin', bg: '#FFD700', bg2: '#FFA000', ink: '#3D2B00', badge: '#FFFFFF' },
  131072: { name: 'Celestial', bg: '#7B68EE', bg2: '#483D8B', ink: '#1A0A3D', badge: '#FFFFFF' },
};

export function animalFor(value: number): AnimalConfig {
  return ANIMALS[value] ?? { name: 'Mystic', bg: '#5FCE8A', bg2: '#2DA866', ink: '#0F4A2E', badge: '#FFFFFF' };
}

function Eyes({ ink }: { ink: string }) {
  return (
    <>
      <circle cx="38" cy="50" r="5.2" fill={ink} />
      <circle cx="62" cy="50" r="5.2" fill={ink} />
      <circle cx="40" cy="48" r="1.7" fill="#fff" />
      <circle cx="64" cy="48" r="1.7" fill="#fff" />
    </>
  );
}

function Cheeks() {
  return (
    <>
      <ellipse cx="28" cy="60" rx="5" ry="3.4" fill="#FF9DB7" opacity="0.55" />
      <ellipse cx="72" cy="60" rx="5" ry="3.4" fill="#FF9DB7" opacity="0.55" />
    </>
  );
}

export function AnimalSilhouette({ value }: { value: number }) {
  const fill = 'rgba(255,255,255,0.5)';
  const stroke = 'rgba(255,255,255,0.7)';
  const sw = 2.4;

  const shape = (() => {
    switch (value) {
      case 2: // Chick
        return (
          <g>
            <path d="M40 33 q4 -8 10 -4" stroke={fill} strokeWidth="6" fill="none" strokeLinecap="round" />
            <ellipse cx="50" cy="56" rx="28" ry="26" fill={fill} stroke={stroke} strokeWidth={sw} />
          </g>
        );
      case 4: // Bunny
        return (
          <g>
            <ellipse cx="40" cy="24" rx="9" ry="18" fill={fill} stroke={stroke} strokeWidth={sw} />
            <ellipse cx="60" cy="24" rx="9" ry="18" fill={fill} stroke={stroke} strokeWidth={sw} />
            <ellipse cx="50" cy="58" rx="26" ry="24" fill={fill} stroke={stroke} strokeWidth={sw} />
          </g>
        );
      case 8: // Kitty
        return (
          <g>
            <path d="M30 36 L24 16 L44 30 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            <path d="M70 36 L76 16 L56 30 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            <ellipse cx="50" cy="58" rx="26" ry="24" fill={fill} stroke={stroke} strokeWidth={sw} />
          </g>
        );
      case 16: // Puppy
        return (
          <g>
            <ellipse cx="28" cy="48" rx="11" ry="16" fill={fill} stroke={stroke} strokeWidth={sw} transform="rotate(-18 28 48)" />
            <ellipse cx="72" cy="48" rx="11" ry="16" fill={fill} stroke={stroke} strokeWidth={sw} transform="rotate(18 72 48)" />
            <ellipse cx="50" cy="58" rx="26" ry="24" fill={fill} stroke={stroke} strokeWidth={sw} />
          </g>
        );
      case 32: // Panda
        return (
          <g>
            <circle cx="30" cy="34" r="11" fill={fill} stroke={stroke} strokeWidth={sw} />
            <circle cx="70" cy="34" r="11" fill={fill} stroke={stroke} strokeWidth={sw} />
            <ellipse cx="50" cy="58" rx="27" ry="25" fill={fill} stroke={stroke} strokeWidth={sw} />
          </g>
        );
      case 64: // Fox
        return (
          <g>
            <path d="M28 36 L22 14 L46 32 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            <path d="M72 36 L78 14 L54 32 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            <ellipse cx="50" cy="58" rx="26" ry="24" fill={fill} stroke={stroke} strokeWidth={sw} />
          </g>
        );
      case 128: // Bear
        return (
          <g>
            <circle cx="30" cy="34" r="11" fill={fill} stroke={stroke} strokeWidth={sw} />
            <circle cx="70" cy="34" r="11" fill={fill} stroke={stroke} strokeWidth={sw} />
            <ellipse cx="50" cy="58" rx="27" ry="25" fill={fill} stroke={stroke} strokeWidth={sw} />
          </g>
        );
      case 256: // Koala
        return (
          <g>
            <circle cx="26" cy="44" r="13" fill={fill} stroke={stroke} strokeWidth={sw} />
            <circle cx="74" cy="44" r="13" fill={fill} stroke={stroke} strokeWidth={sw} />
            <ellipse cx="50" cy="58" rx="26" ry="24" fill={fill} stroke={stroke} strokeWidth={sw} />
          </g>
        );
      case 512: // Tiger
        return (
          <g>
            <circle cx="30" cy="34" r="11" fill={fill} stroke={stroke} strokeWidth={sw} />
            <circle cx="70" cy="34" r="11" fill={fill} stroke={stroke} strokeWidth={sw} />
            <ellipse cx="50" cy="58" rx="27" ry="25" fill={fill} stroke={stroke} strokeWidth={sw} />
          </g>
        );
      case 1024: // Lion (mane)
        return (
          <g>
            <circle cx="50" cy="58" r="37" fill={fill} stroke={stroke} strokeWidth={sw} />
          </g>
        );
      case 2048: // Dragon
        return (
          <g>
            <path d="M34 30 L26 14 L44 26 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            <path d="M66 30 L74 14 L58 26 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            <ellipse cx="50" cy="58" rx="27" ry="25" fill={fill} stroke={stroke} strokeWidth={sw} />
          </g>
        );
      case 4096: // Phoenix
        return (
          <g>
            <path d="M50 14 L38 28 L50 24 L62 28 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            <ellipse cx="50" cy="58" rx="27" ry="25" fill={fill} stroke={stroke} strokeWidth={sw} />
            <path d="M30 70 L20 80 M70 70 L80 80" stroke={fill} strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        );
      case 8192: // Unicorn
        return (
          <g>
            <path d="M50 10 L46 28 L54 28 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            <ellipse cx="50" cy="58" rx="26" ry="24" fill={fill} stroke={stroke} strokeWidth={sw} />
          </g>
        );
      case 16384: // Kraken
        return (
          <g>
            <ellipse cx="50" cy="56" rx="24" ry="22" fill={fill} stroke={stroke} strokeWidth={sw} />
            <path d="M26 64 q-8 4 -14 0 M36 70 q-6 6 -12 4 M50 72 q0 8 -4 12 M64 70 q6 6 12 4 M74 64 q8 4 14 0" stroke={fill} strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        );
      case 32768: // Griffin
        return (
          <g>
            <path d="M30 36 L20 18 L42 30 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            <path d="M70 36 L80 18 L58 30 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            <ellipse cx="50" cy="58" rx="27" ry="25" fill={fill} stroke={stroke} strokeWidth={sw} />
            <path d="M50 82 L44 90 L56 90 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          </g>
        );
      case 65536: // Qilin
        return (
          <g>
            <circle cx="50" cy="58" r="34" fill={fill} stroke={stroke} strokeWidth={sw} />
            <path d="M50 24 L46 14 L54 18 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          </g>
        );
      case 131072: // Celestial
        return (
          <g>
            <circle cx="50" cy="58" r="30" fill={fill} stroke={stroke} strokeWidth={sw} />
            <circle cx="50" cy="58" r="38" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="2 3" />
          </g>
        );
      default:
        return <ellipse cx="50" cy="58" rx="27" ry="25" fill={fill} stroke={stroke} strokeWidth={sw} />;
    }
  })();

  return <g transform="translate(50 57) scale(1.08) translate(-50 -57)">{shape}</g>;
}

export function AnimalFace({ value }: { value: number }) {
  const a = animalFor(value);
  const ink = a.ink;

  switch (value) {
    case 2: // Chick
      return (
        <g>
          <ellipse cx="50" cy="56" rx="26" ry="24" fill={a.bg} />
          <ellipse cx="50" cy="58" rx="26" ry="24" fill="none" />
          <path d="M40 33 q4 -8 10 -4" stroke={a.bg2} strokeWidth="3" fill="none" strokeLinecap="round" />
          <Eyes ink={ink} />
          <path d="M46 64 q4 5 8 0" stroke={ink} strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M50 60 l-5 5 l5 4 l5 -4 z" fill="#FF9A3D" stroke={ink} strokeWidth="1" />
          <Cheeks />
        </g>
      );
    case 4: // Bunny
      return (
        <g>
          <ellipse cx="40" cy="24" rx="7" ry="16" fill={a.bg} />
          <ellipse cx="60" cy="24" rx="7" ry="16" fill={a.bg} />
          <ellipse cx="40" cy="25" rx="3.4" ry="11" fill="#FFA0BC" />
          <ellipse cx="60" cy="25" rx="3.4" ry="11" fill="#FFA0BC" />
          <ellipse cx="50" cy="58" rx="24" ry="22" fill={a.bg} />
          <Eyes ink={ink} />
          <path d="M47 66 q3 4 6 0" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <ellipse cx="50" cy="63" rx="2.6" ry="1.8" fill="#FF6E97" />
          <Cheeks />
        </g>
      );
    case 8: // Kitty
      return (
        <g>
          <path d="M30 36 L26 18 L42 30 Z" fill={a.bg} />
          <path d="M70 36 L74 18 L58 30 Z" fill={a.bg} />
          <path d="M31 33 L29 24 L38 31 Z" fill="#FF9DB7" />
          <path d="M69 33 L71 24 L62 31 Z" fill="#FF9DB7" />
          <ellipse cx="50" cy="58" rx="24" ry="22" fill={a.bg} />
          <Eyes ink={ink} />
          <path d="M47 66 q3 3 6 0" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M50 63 l-3 2 l3 2 l3 -2 z" fill="#FF8FB0" />
          <g stroke={ink} strokeWidth="1.3" strokeLinecap="round">
            <line x1="34" y1="64" x2="22" y2="62" />
            <line x1="34" y1="68" x2="22" y2="70" />
            <line x1="66" y1="64" x2="78" y2="62" />
            <line x1="66" y1="68" x2="78" y2="70" />
          </g>
          <Cheeks />
        </g>
      );
    case 16: // Puppy
      return (
        <g>
          <ellipse cx="28" cy="48" rx="9" ry="14" fill="#C9A06A" transform="rotate(-18 28 48)" />
          <ellipse cx="72" cy="48" rx="9" ry="14" fill="#C9A06A" transform="rotate(18 72 48)" />
          <ellipse cx="50" cy="58" rx="24" ry="22" fill={a.bg} />
          <ellipse cx="50" cy="66" rx="13" ry="10" fill="#F3E2D0" />
          <Eyes ink={ink} />
          <ellipse cx="50" cy="64" rx="3.2" ry="2.4" fill={ink} />
          <path d="M50 66 q0 6 -4 6 q4 2 8 0 q-4 0 -4 -6" fill={ink} />
          <Cheeks />
        </g>
      );
    case 32: // Panda
      return (
        <g>
          <circle cx="30" cy="34" r="9" fill={ink} />
          <circle cx="70" cy="34" r="9" fill={ink} />
          <ellipse cx="50" cy="58" rx="25" ry="23" fill="#FAFAFA" />
          <ellipse cx="38" cy="55" rx="7" ry="9" fill={ink} transform="rotate(-18 38 55)" />
          <ellipse cx="62" cy="55" rx="7" ry="9" fill={ink} transform="rotate(18 62 55)" />
          <circle cx="39" cy="54" r="2.6" fill="#fff" />
          <circle cx="61" cy="54" r="2.6" fill="#fff" />
          <ellipse cx="50" cy="65" rx="4" ry="3" fill={ink} />
          <path d="M50 68 v3 m0 0 q-5 3 -8 0 m8 0 q5 3 8 0" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      );
    case 64: // Fox
      return (
        <g>
          <path d="M28 36 L24 18 L44 32 Z" fill={a.bg} />
          <path d="M72 36 L76 18 L56 32 Z" fill={a.bg} />
          <path d="M30 33 L28 25 L40 32 Z" fill="#FFFFFF" />
          <path d="M70 33 L72 25 L60 32 Z" fill="#FFFFFF" />
          <ellipse cx="50" cy="58" rx="24" ry="22" fill={a.bg} />
          <path d="M50 70 q-14 0 -18 -12 q14 6 18 6 q4 0 18 -6 q-4 12 -18 12 z" fill="#FFFFFF" />
          <Eyes ink={ink} />
          <ellipse cx="50" cy="66" rx="3.4" ry="2.4" fill={ink} />
          <Cheeks />
        </g>
      );
    case 128: // Bear
      return (
        <g>
          <circle cx="30" cy="34" r="9" fill={a.bg2} />
          <circle cx="70" cy="34" r="9" fill={a.bg2} />
          <circle cx="30" cy="34" r="4.5" fill="#D4B598" />
          <circle cx="70" cy="34" r="4.5" fill="#D4B598" />
          <ellipse cx="50" cy="58" rx="25" ry="23" fill={a.bg} />
          <ellipse cx="50" cy="66" rx="13" ry="10" fill="#EFD9BC" />
          <Eyes ink={ink} />
          <ellipse cx="50" cy="63" rx="3.4" ry="2.6" fill={ink} />
          <path d="M50 65 q0 6 -4 5 m4 1 q4 1 4 -5" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
          <Cheeks />
        </g>
      );
    case 256: // Koala
      return (
        <g>
          <circle cx="26" cy="44" r="11" fill={a.bg2} />
          <circle cx="74" cy="44" r="11" fill={a.bg2} />
          <circle cx="26" cy="44" r="6" fill={a.bg} />
          <circle cx="74" cy="44" r="6" fill={a.bg} />
          <ellipse cx="50" cy="58" rx="24" ry="22" fill={a.bg} />
          <ellipse cx="50" cy="66" rx="12" ry="9" fill="#E2E4E8" />
          <Eyes ink={ink} />
          <ellipse cx="50" cy="63" rx="4" ry="3" fill={ink} />
          <path d="M50 66 v3 m0 0 q-5 3 -8 0 m8 0 q5 3 8 0" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      );
    case 512: // Tiger
      return (
        <g>
          <circle cx="30" cy="34" r="9" fill={a.bg} />
          <circle cx="70" cy="34" r="9" fill={a.bg} />
          <ellipse cx="50" cy="58" rx="25" ry="23" fill={a.bg} />
          <g stroke={ink} strokeWidth="2.4" strokeLinecap="round">
            <path d="M35 42 q4 4 0 8" fill="none" />
            <path d="M65 42 q-4 4 0 8" fill="none" />
            <path d="M50 38 v8" />
            <path d="M30 58 q6 -3 10 0" fill="none" />
            <path d="M70 58 q-6 -3 -10 0" fill="none" />
          </g>
          <ellipse cx="50" cy="66" rx="11" ry="8" fill="#FFF1D6" />
          <Eyes ink={ink} />
          <ellipse cx="50" cy="63" rx="3.4" ry="2.6" fill={ink} />
          <path d="M50 66 q0 5 -4 4 m4 1 q4 1 4 -4" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      );
    case 1024: // Lion
      return (
        <g>
          <g fill={a.bg2}>
            <circle cx="50" cy="24" r="9" />
            <circle cx="28" cy="32" r="9" />
            <circle cx="72" cy="32" r="9" />
            <circle cx="22" cy="52" r="9" />
            <circle cx="78" cy="52" r="9" />
            <circle cx="28" cy="74" r="9" />
            <circle cx="72" cy="74" r="9" />
            <circle cx="50" cy="84" r="9" />
          </g>
          <ellipse cx="50" cy="58" rx="23" ry="21" fill={a.bg} />
          <ellipse cx="50" cy="66" rx="12" ry="9" fill="#FFE9B8" />
          <circle cx="30" cy="38" r="6" fill={a.bg} />
          <circle cx="70" cy="38" r="6" fill={a.bg} />
          <Eyes ink={ink} />
          <ellipse cx="50" cy="63" rx="3.4" ry="2.6" fill={ink} />
          <path d="M50 66 q0 6 -4 5 m4 1 q4 1 4 -5" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      );
    case 2048: // Dragon
      return (
        <g>
          <path d="M34 30 L26 16 L42 26 Z" fill={a.bg2} />
          <path d="M66 30 L74 16 L58 26 Z" fill={a.bg2} />
          <ellipse cx="50" cy="58" rx="25" ry="23" fill={a.bg} />
          <ellipse cx="50" cy="68" rx="14" ry="10" fill="#D4F5E2" />
          <Eyes ink={ink} />
          <ellipse cx="44" cy="66" rx="2.2" ry="1.6" fill={ink} />
          <ellipse cx="56" cy="66" rx="2.2" ry="1.6" fill={ink} />
          <path d="M50 70 q-6 4 -10 0 m10 0 q6 4 10 0" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M40 72 l-3 4 l3 1 z M60 72 l3 4 l-3 1 z" fill={ink} />
          <Cheeks />
        </g>
      );
    case 4096: // Phoenix
      return (
        <g>
          <path d="M50 14 L38 28 L50 24 L62 28 Z" fill={a.bg2} stroke={ink} strokeWidth="1" strokeLinejoin="round" />
          <ellipse cx="50" cy="58" rx="25" ry="23" fill={a.bg} />
          <Eyes ink={ink} />
          <path d="M44 66 q6 5 12 0" stroke={ink} strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M30 70 L20 80 M70 70 L80 80" stroke={a.bg2} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      );
    case 8192: // Unicorn
      return (
        <g>
          <path d="M50 10 L46 28 L54 28 Z" fill={a.bg2} stroke={ink} strokeWidth="1" strokeLinejoin="round" />
          <ellipse cx="50" cy="58" rx="24" ry="22" fill={a.bg} />
          <Eyes ink={ink} />
          <path d="M44 66 q6 4 12 0" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <ellipse cx="50" cy="63" rx="3" ry="2" fill={ink} />
          <Cheeks />
        </g>
      );
    case 16384: // Kraken
      return (
        <g>
          <ellipse cx="50" cy="56" rx="22" ry="20" fill={a.bg} />
          <Eyes ink={ink} />
          <path d="M44 64 q6 3 12 0" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M26 64 q-8 4 -14 0 M36 70 q-6 6 -12 4 M50 72 q0 8 -4 12 M64 70 q6 6 12 4 M74 64 q8 4 14 0" stroke={a.bg2} strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      );
    case 32768: // Griffin
      return (
        <g>
          <path d="M30 36 L20 18 L42 30 Z" fill={a.bg2} />
          <path d="M70 36 L80 18 L58 30 Z" fill={a.bg2} />
          <ellipse cx="50" cy="58" rx="25" ry="23" fill={a.bg} />
          <Eyes ink={ink} />
          <path d="M47 66 q3 4 6 0" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M50 82 L44 90 L56 90 Z" fill={a.bg2} stroke={ink} strokeWidth="1" strokeLinejoin="round" />
        </g>
      );
    case 65536: // Qilin
      return (
        <g>
          <circle cx="50" cy="58" r="30" fill={a.bg} />
          <path d="M50 24 L46 14 L54 18 Z" fill={a.bg2} stroke={ink} strokeWidth="1" strokeLinejoin="round" />
          <Eyes ink={ink} />
          <path d="M44 66 q6 5 12 0" stroke={ink} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </g>
      );
    case 131072: // Celestial
      return (
        <g>
          <circle cx="50" cy="58" r="28" fill={a.bg} />
          <circle cx="50" cy="58" r="36" fill="none" stroke={ink} strokeWidth="1.5" strokeDasharray="2 3" opacity="0.5" />
          <Eyes ink={ink} />
          <path d="M42 66 q8 6 16 0" stroke={ink} strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <circle cx="35" cy="44" r="1.5" fill="#fff" />
          <circle cx="65" cy="48" r="1.5" fill="#fff" />
          <circle cx="60" cy="70" r="1" fill="#fff" />
          <circle cx="38" cy="68" r="1" fill="#fff" />
        </g>
      );
    default:
      return (
        <g>
          <ellipse cx="50" cy="58" rx="25" ry="23" fill={a.bg} />
          <Eyes ink={ink} />
          <path d="M44 66 q6 6 12 0" stroke={ink} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </g>
      );
  }
}
