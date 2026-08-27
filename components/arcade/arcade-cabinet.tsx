import type { ReactNode } from "react";

export function ArcadeCabinet({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border-4 border-neutral-800 bg-gradient-to-b from-neutral-700 via-neutral-800 to-black p-4 shadow-[inset_0_2px_8px_rgba(255,255,255,0.08),0_10px_28px_rgba(0,0,0,0.45)]">
      <div className="mb-4 rounded-lg border-2 border-neutral-700 bg-black px-4 py-3 text-center">
        <span className="text-sm font-bold tracking-[0.3em] text-red-500 [text-shadow:0_0_8px_rgba(239,68,68,0.85)]">
          GAME ZONE
        </span>
      </div>
      <div className="flex flex-col gap-3 rounded-lg border border-black/30 bg-neutral-600/50 p-3">
        {children}
      </div>
    </div>
  );
}
