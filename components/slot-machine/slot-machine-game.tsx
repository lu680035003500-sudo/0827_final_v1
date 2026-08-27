"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  GRID_SIZE,
  createGrid,
  judgeGrid,
  randomSymbol,
  type Grid,
  type SpinResult,
} from "./slot-machine-engine";

const COLUMN_STOP_DELAYS = [600, 900, 1200];
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
  const [grid, setGrid] = useState<Grid>(() => createGrid());
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

    const finalGrid: Grid = createGrid();

    for (let col = 0; col < GRID_SIZE; col++) {
      const finalColumn = [finalGrid[0][col], finalGrid[1][col], finalGrid[2][col]];
      const tickTimer = window.setInterval(() => {
        setGrid((prev) => {
          const next = prev.map((row) => [...row]);
          for (let row = 0; row < GRID_SIZE; row++) {
            next[row][col] = randomSymbol();
          }
          return next;
        });
      }, TICK_MS);
      timerIdsRef.current.push(tickTimer);

      const stopTimer = window.setTimeout(() => {
        window.clearInterval(tickTimer);
        setGrid((prev) => {
          const next = prev.map((row) => [...row]);
          for (let row = 0; row < GRID_SIZE; row++) {
            next[row][col] = finalColumn[row];
          }
          return next;
        });

        if (col === GRID_SIZE - 1) {
          setSpinning(false);
          const spinResult = judgeGrid(finalGrid);
          setResult(spinResult);
          if (spinResult !== "lose") onWin();
        }
      }, COLUMN_STOP_DELAYS[col]);
      timerIdsRef.current.push(stopTimer);
    }
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

        <div className="grid grid-cols-3 gap-2 rounded-lg border border-border bg-background p-3">
          {grid.map((row, rowIndex) =>
            row.map((symbol, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`flex h-14 w-14 items-center justify-center rounded-md border text-2xl ${
                  rowIndex === 1 ? "border-yellow-400 bg-yellow-400/10" : "border-border bg-muted"
                }`}
              >
                {symbol}
              </div>
            ))
          )}
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
