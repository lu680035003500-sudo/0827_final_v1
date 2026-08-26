"use client";

import { useState } from "react";

const CLOVER_COUNT = 6;
const WIN_PROBABILITY = 1 / CLOVER_COUNT;

export function LuckyDrawModal({ onClose }: { onClose: () => void }) {
  const [result, setResult] = useState<string | null>(null);

  function handlePick() {
    const won = Math.random() < WIN_PROBABILITY;
    setResult(won ? "당첨되었습니다!" : "안타깝네요 다음 기회에");
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
      <div className="relative flex w-full max-w-xs flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 text-card-foreground">
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold">행운뽑기</h2>

        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: CLOVER_COUNT }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={handlePick}
              aria-label={`네잎클로버 ${index + 1}`}
              className="flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-background text-2xl transition-transform hover:scale-105 active:scale-95"
            >
              🍀
            </button>
          ))}
        </div>

        {result && (
          <p role="status" className="text-sm font-medium">
            {result}
          </p>
        )}
      </div>
    </div>
  );
}
