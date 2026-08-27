"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  SYMBOLS,
  judgeSpin,
  randomSymbol,
  type SlotSymbol,
  type SpinResult,
} from "./slot-machine-engine";

const REEL_STOP_DELAYS = [600, 900, 1200];
const TICK_MS = 80;

const RESULT_TEXT: Record<SpinResult, string> = {
  jackpot: "🎉 잭팟!!",
  win: "당첨!",
  lose: "안타깝네요 다음 기회에",
};

type SlotMachineGameProps = {
  onClose: () => void;
  score: number;
  onWin: () => void;
};

export function SlotMachineGame({ onClose, score, onWin }: SlotMachineGameProps) {
  const [reels, setReels] = useState<SlotSymbol[]>([SYMBOLS[0], SYMBOLS[0], SYMBOLS[0]]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<SpinResult | null>(null);
  const timerIdsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timerIdsRef.current.forEach((id) => {
        window.clearInterval(id);
        window.clearTimeout(id);
      });
    };
  }, []);

  function handleSpin() {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const finalReels: [SlotSymbol, SlotSymbol, SlotSymbol] = [
      randomSymbol(),
      randomSymbol(),
      randomSymbol(),
    ];

    [0, 1, 2].forEach((reelIndex) => {
      const spinTimer = window.setInterval(() => {
        setReels((prev) => {
          const next = [...prev];
          next[reelIndex] = randomSymbol();
          return next;
        });
      }, TICK_MS);
      timerIdsRef.current.push(spinTimer);

      const stopTimer = window.setTimeout(() => {
        window.clearInterval(spinTimer);
        setReels((prev) => {
          const next = [...prev];
          next[reelIndex] = finalReels[reelIndex];
          return next;
        });
        if (reelIndex === 2) {
          setSpinning(false);
          const spinResult = judgeSpin(finalReels);
          setResult(spinResult);
          if (spinResult !== "lose") onWin();
        }
      }, REEL_STOP_DELAYS[reelIndex]);
      timerIdsRef.current.push(stopTimer);
    });
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

        <h2 className="text-lg font-semibold">슬롯머신</h2>
        <p className="text-sm text-muted-foreground">점수: {score}</p>

        <div className="flex gap-2 rounded-lg border border-border bg-background p-3">
          {reels.map((symbol, index) => (
            <div
              key={index}
              className="flex h-16 w-16 items-center justify-center rounded-md border border-border bg-muted text-3xl"
            >
              {symbol}
            </div>
          ))}
        </div>

        <Button type="button" onClick={handleSpin} disabled={spinning}>
          {spinning ? "돌아가는 중..." : "스핀"}
        </Button>

        {result && (
          <p role="status" className="text-sm font-medium">
            {RESULT_TEXT[result]}
          </p>
        )}
      </div>
    </div>
  );
}
