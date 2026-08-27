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
    <div
      className="relative w-full overflow-hidden rounded-md border border-black/10 px-2 py-6 [perspective:1100px]"
      style={{ background: "linear-gradient(to bottom, #ece6da 0%, #cfc6b7 55%, #a89d8d 100%)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[12%] top-3 h-[3px] rounded-full bg-[#fff6e0]"
        style={{ boxShadow: "0 0 22px 6px rgba(255, 244, 214, 0.85)" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.14) 0px, rgba(0,0,0,0.14) 1px, transparent 1px, transparent 26px)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-9 w-14 rounded-sm bg-[#8b8072] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
        style={{ transform: "translate(-50%, -50%) translateZ(-150px)" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-14"
        style={{
          background: "linear-gradient(to top, #7d7466, transparent)",
          transform: "rotateX(65deg)",
          transformOrigin: "bottom",
        }}
      />

      <div className="relative flex flex-col items-center gap-6">
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
                className="shrink-0 rounded-sm border-[3px] border-stone-800 bg-stone-100 p-2 shadow-[0_10px_18px_rgba(0,0,0,0.35)] transition-transform hover:scale-105"
                style={{ transform: `rotateY(${side === 0 ? ROTATE_DEG : -ROTATE_DEG}deg)` }}
              >
                <span
                  className={`flex h-14 w-20 items-center justify-center rounded-[2px] border border-black/10 text-xs font-bold sm:w-24 ${item.colorClass}`}
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
