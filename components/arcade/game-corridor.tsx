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
    <div className="relative w-full overflow-hidden rounded-md border border-black/40 bg-gradient-to-b from-stone-800 via-stone-900 to-black px-2 py-6 [perspective:1100px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.45) 0px, rgba(0,0,0,0.45) 2px, transparent 2px, transparent 16px), repeating-linear-gradient(90deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 2px, transparent 2px, transparent 30px)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-14 rounded-sm bg-black shadow-[inset_0_0_10px_rgba(0,0,0,0.9)]"
        style={{ transform: "translate(-50%, -50%) translateZ(-150px)" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-stone-950 via-stone-900/70 to-transparent"
        style={{ transform: "rotateX(65deg)", transformOrigin: "bottom" }}
      />

      <div className="relative flex flex-col items-center gap-6">
        {rows.map((pair, depth) => (
          <div
            key={depth}
            className="flex w-full items-center justify-center gap-3"
            style={{
              transform: `translateZ(${-depth * DEPTH_STEP_PX}px) scale(${1 - depth * SCALE_STEP})`,
            }}
          >
            <span aria-hidden="true" className="text-base opacity-90 [text-shadow:0_0_8px_rgba(251,146,60,0.9)]">
              🔥
            </span>

            <div className="flex items-center justify-center gap-8 sm:gap-10">
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

            <span aria-hidden="true" className="text-base opacity-90 [text-shadow:0_0_8px_rgba(251,146,60,0.9)]">
              🔥
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
