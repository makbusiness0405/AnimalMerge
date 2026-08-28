import { themeFor, ThemeId } from '@/game/themes';
import { Tile as TileType } from '@/game/types';

interface Props {
  tile: TileType;
  cell: number;
  gap: number;
  themeId: ThemeId;
}

export function Tile({ tile, cell, gap, themeId }: Props) {
  const theme = themeFor(themeId);
  const a = theme.tileBg(tile.value);
  const x = tile.col * (cell + gap);
  const y = tile.row * (cell + gap);

  const fontSize = cell > 90 ? 16 : cell > 70 ? 13 : cell > 50 ? 10 : 8;
  const borderRadius = cell > 60 ? 'rounded-2xl' : 'rounded-lg';

  return (
    <div
      className="absolute left-0 top-0 will-change-transform"
      style={{
        width: cell,
        height: cell,
        transform: `translate(${x}px, ${y}px)`,
        transition: 'transform 130ms ease, opacity 130ms ease',
        zIndex: tile.removing ? 5 : tile.mergedFrom ? 20 : tile.isNew ? 15 : 10,
        opacity: tile.removing ? 0 : 1,
      }}
    >
      <div
        className={`relative h-full w-full ${borderRadius} shadow-sm ${tile.isNew ? 'tile-pop' : ''} ${tile.mergedFrom ? 'tile-bump' : ''}`}
        style={{
          background: `linear-gradient(160deg, ${a.bg} 0%, ${a.bg2} 100%)`,
          boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.08), 0 3px 8px rgba(60,40,20,0.12)',
        }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" style={{ pointerEvents: 'none' }}>
          {theme.renderSilhouette(tile.value)}
          {theme.renderFace(tile.value)}
        </svg>
        <div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full px-1.5 font-bold leading-none"
          style={{
            fontSize,
            color: a.ink,
            background: 'rgba(255,255,255,0.78)',
            minWidth: fontSize + 6,
            textAlign: 'center',
          }}
        >
          {tile.value}
        </div>
      </div>
    </div>
  );
}
