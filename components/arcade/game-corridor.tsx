"use client";

export type CorridorButton = {
  key: string;
  label: string;
  colorClass: string;
  onClick: () => void;
};

const ROTATE_DEG = 26;
const DEPTH_STEP_PX = 34;
const SCALE_STEP = 0.09;

export function GameCorridor({ items }: { items: CorridorButton[] }) {
  const rows: CorridorButton[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  return (
    <div className="w-full py-1 [perspective:1100px]">
      <div className="flex flex-col items-center gap-6">
        {rows.map((pair, depth) => (
          <div
            key={depth}
            className="flex w-full items-center justify-center gap-8 sm:gap-10"
            style={{
              transform: `translateZ(${-depth * DEPTH_STEP_PX}px) scale(${1 - depth * SCALE_STEP})`,
            }}
          >
            {pair.map((item, side) => (
              <button
                key={item.key}
                type="button"
                onClick={item.onClick}
                className="shrink-0 rounded-md border-[6px] border-amber-800 bg-gradient-to-b from-amber-700 to-amber-900 p-1.5 shadow-[0_12px_20px_rgba(0,0,0,0.55)] transition-transform hover:scale-105"
                style={{ transform: `rotateY(${side === 0 ? ROTATE_DEG : -ROTATE_DEG}deg)` }}
              >
                <span
                  className={`flex h-14 w-20 items-center justify-center rounded-sm border border-black/20 text-xs font-bold sm:w-24 ${item.colorClass}`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
