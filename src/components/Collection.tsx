import { ANIMALS, AnimalFace, AnimalSilhouette, animalFor } from '@/game/animals';

interface Props {
  discovered: number[];
}

const ALL_VALUES = Object.keys(ANIMALS).map(Number).sort((a, b) => a - b);

export function Collection({ discovered }: Props) {
  const discoveredSet = new Set(discovered);
  const count = ALL_VALUES.filter((v) => discoveredSet.has(v)).length;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-stone-800">Animal Collection</h2>
        <span className="rounded-full px-3 py-1 text-sm font-bold text-white" style={{ background: 'linear-gradient(160deg,#7FC9A0,#4FB07F)' }}>
          {count} / {ALL_VALUES.length}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
        {ALL_VALUES.map((value) => {
          const found = discoveredSet.has(value);
          const a = animalFor(value);
          return (
            <div
              key={value}
              className="relative flex flex-col items-center rounded-2xl p-2 transition-transform"
              style={{
                background: found
                  ? `linear-gradient(160deg, ${a.bg} 0%, ${a.bg2} 100%)`
                  : 'linear-gradient(160deg, #F0EAE4 0%, #E5DDD6 100%)',
                opacity: found ? 1 : 0.7,
                boxShadow: found ? 'inset 0 -3px 0 rgba(0,0,0,0.06), 0 2px 6px rgba(60,40,20,0.10)' : 'none',
              }}
            >
              <svg viewBox="0 0 100 100" className="h-14 w-14">
                {found ? (
                  <>
                    <AnimalSilhouette value={value} />
                    <AnimalFace value={value} />
                  </>
                ) : (
                  <g opacity="0.35">
                    <ellipse cx="50" cy="56" rx="26" ry="24" fill="#C4B8AE" />
                    <text x="50" y="62" textAnchor="middle" fontSize="28" fill="#A89C92" fontWeight="bold">?</text>
                  </g>
                )}
              </svg>
              <span
                className="mt-1 text-xs font-bold"
                style={{ color: found ? a.ink : '#A89C92' }}
              >
                {found ? a.name : '???'}
              </span>
              <span
                className="text-[10px] font-semibold"
                style={{ color: found ? a.ink : '#B8ACA2' }}
              >
                {value}
              </span>
            </div>
          );
        })}
      </div>
      {count === ALL_VALUES.length && (
        <p className="mt-3 text-center text-sm font-bold" style={{ color: '#2E8B57' }}>
          You discovered all animals! Legendary!
        </p>
      )}
    </div>
  );
}
