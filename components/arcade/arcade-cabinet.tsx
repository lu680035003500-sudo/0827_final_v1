import type { ReactNode } from "react";

import { MiniBear } from "./mini-bear";
import { TeddyBear } from "./teddy-bear";

type ArcadeCabinetProps = {
  children: ReactNode;
  score: number;
};

export function ArcadeCabinet({ children, score }: ArcadeCabinetProps) {
  return (
    <div className="rounded-2xl border-4 border-neutral-800 bg-gradient-to-b from-neutral-700 via-neutral-800 to-black p-4 shadow-[inset_0_2px_8px_rgba(255,255,255,0.08),0_10px_28px_rgba(0,0,0,0.45)]">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex gap-1">
          <MiniBear delay="0s" />
          <MiniBear delay="0.15s" />
        </div>

        <div className="flex flex-1 items-center justify-between gap-3 rounded-lg border-2 border-neutral-700 bg-black px-4 py-3">
          <span className="text-sm font-bold tracking-[0.3em] text-red-500 [text-shadow:0_0_8px_rgba(239,68,68,0.85)]">
            GAME ZONE
          </span>
          <span className="text-sm font-bold tracking-wider text-yellow-400 [text-shadow:0_0_8px_rgba(250,204,21,0.85)]">
            SCORE : {score}
          </span>
        </div>

        <MiniBear delay="0.3s" />
      </div>
      <div className="flex items-end gap-3 rounded-lg border border-black/30 bg-neutral-600/50 p-3">
        <TeddyBear className="h-32 w-auto shrink-0" />

        <div className="flex min-w-0 flex-1 flex-col items-center gap-2 rounded-lg border-2 border-neutral-800 bg-gradient-to-b from-slate-900 to-neutral-800 p-2">
          <div className="flex w-full flex-col items-center gap-2 rounded-sm bg-neutral-700/60 p-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
