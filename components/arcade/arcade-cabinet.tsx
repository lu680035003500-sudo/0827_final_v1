import type { ReactNode } from "react";

import { SideUfo } from "./side-ufo";

type ArcadeCabinetProps = {
  children: ReactNode;
  score: number;
};

export function ArcadeCabinet({ children, score }: ArcadeCabinetProps) {
  return (
    <div
      id="arcade-cabinet"
      className="relative z-10 rounded-2xl border-4 border-neutral-800 bg-gradient-to-b from-neutral-700 via-neutral-800 to-black p-3 shadow-[inset_0_2px_8px_rgba(255,255,255,0.08),0_10px_28px_rgba(0,0,0,0.45)] sm:p-4"
    >
      <SideUfo side="left" />
      <SideUfo side="right" />
      <div className="mb-3 flex items-center gap-2 sm:mb-4">
        <div className="flex w-full items-center justify-between gap-2 rounded-lg border-2 border-neutral-700 bg-black px-3 py-2 sm:w-2/3 sm:gap-3 sm:px-4 sm:py-3">
          <span className="text-xs font-bold tracking-[0.2em] text-red-500 [text-shadow:0_0_8px_rgba(239,68,68,0.85)] sm:text-sm sm:tracking-[0.3em]">
            GAME ZONE
          </span>
          <span className="text-xs font-bold tracking-wide text-yellow-400 [text-shadow:0_0_8px_rgba(250,204,21,0.85)] sm:text-sm sm:tracking-wider">
            SCORE : {score}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 rounded-lg border border-black/30 bg-neutral-600/50 p-3 sm:grid-cols-3">
        {children}
      </div>
    </div>
  );
}
