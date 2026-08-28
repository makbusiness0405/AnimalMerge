import { useEffect, useRef, useState } from 'react';
import { Tile } from './Tile';
import { Direction, Tile as TileType } from '@/game/types';
import { ThemeId } from '@/game/themes';
import { BackgroundConfig } from '@/game/backgrounds';

interface Props {
  tiles: TileType[];
  onMove: (dir: Direction) => void;
  themeId: ThemeId;
  gridSize: number;
  background: BackgroundConfig;
}

const GAP_RATIO = 0.032;

export function Board({ tiles, onMove, themeId, gridSize, background }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const update = () => setSize(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const gap = size * GAP_RATIO;
  const cell = (size - (gridSize + 1) * gap) / gridSize;
  const borderRadius = gridSize === 8 ? 'rounded-lg' : 'rounded-2xl';

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    if (Math.max(absX, absY) < 24) return;
    if (absX > absY) onMove(dx > 0 ? 'right' : 'left');
    else onMove(dy > 0 ? 'down' : 'up');
    touch.current = null;
  };

  return (
    <div
      ref={ref}
      className="relative aspect-square w-full touch-none select-none rounded-3xl"
      style={{
        background: background.boardBg,
        boxShadow: background.boardShadow,
        padding: gap,
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* background cells */}
      <div
        className="absolute inset-0 grid"
        style={{
          padding: gap,
          gap,
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, i) => (
          <div key={i} className={borderRadius} style={{ background: background.cellBg }} />
        ))}
      </div>

      {/* tiles */}
      {size > 0 &&
        tiles.map((t) => <Tile key={t.id} tile={t} cell={cell} gap={gap} themeId={themeId} />)}
    </div>
  );
}
