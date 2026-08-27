"use client";

import { useState, type CSSProperties } from "react";

const CLOVER_COUNT = 6;
const WIN_PROBABILITY = 1 / CLOVER_COUNT;
const PARTICLE_COUNT = 28;
const PARTICLE_COLORS = ["#f87171", "#facc15", "#4ade80", "#60a5fa", "#c084fc", "#fb923c"];

type Particle = {
  id: number;
  dx: number;
  dy: number;
  color: string;
  delay: number;
};

function createBurst(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 90;
    return {
      id: index,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      color: PARTICLE_COLORS[index % PARTICLE_COLORS.length],
      delay: Math.random() * 0.15,
    };
  });
}

export function LuckyDrawModal({ onClose }: { onClose: () => void }) {
  const [result, setResult] = useState<string | null>(null);
  const [burst, setBurst] = useState<Particle[] | null>(null);
  const [burstKey, setBurstKey] = useState(0);

  function handlePick() {
    const won = Math.random() < WIN_PROBABILITY;
    setResult(won ? "당첨되었습니다!" : "안타깝네요 다음 기회에");
    if (won) {
      setBurst(createBurst());
      setBurstKey((key) => key + 1);
    } else {
      setBurst(null);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
      <div className="relative flex w-full max-w-xs flex-col items-center gap-4 overflow-hidden rounded-xl border border-border bg-card p-6 text-card-foreground">
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

        {burst && (
          <div
            key={burstKey}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            {burst.map((particle) => (
              <span
                key={particle.id}
                className="absolute h-2 w-2 rounded-full animate-confetti"
                style={
                  {
                    backgroundColor: particle.color,
                    animationDelay: `${particle.delay}s`,
                    "--dx": `${particle.dx}px`,
                    "--dy": `${particle.dy}px`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
