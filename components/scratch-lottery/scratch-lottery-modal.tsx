"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

const CARD_WIDTH = 220;
const CARD_HEIGHT = 120;
const REVEAL_THRESHOLD = 0.55;
const BRUSH_RADIUS = 16;
const WIN_PROBABILITY = 1 / 6;

type Prize = "win" | "lose";

function pickPrize(): Prize {
  return Math.random() < WIN_PROBABILITY ? "win" : "lose";
}

type ScratchLotteryModalProps = {
  onClose: () => void;
  score: number;
  onWin: () => void;
  onLose: () => void;
};

export function ScratchLotteryModal({
  onClose,
  score,
  onWin,
  onLose,
}: ScratchLotteryModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scratchingRef = useRef(false);
  const [prize] = useState<Prize>(() => pickPrize());
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#9ca3af";
    ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
    ctx.fillStyle = "#374151";
    ctx.font = "bold 15px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("긁어서 확인하세요", CARD_WIDTH / 2, CARD_HEIGHT / 2);
    ctx.globalCompositeOperation = "destination-out";
  }, []);

  function scratchAt(clientX: number, clientY: number) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * CARD_WIDTH;
    const y = ((clientY - rect.top) / rect.height) * CARD_HEIGHT;
    ctx.beginPath();
    ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }

  function checkProgress() {
    if (revealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { data } = ctx.getImageData(0, 0, CARD_WIDTH, CARD_HEIGHT);
    let cleared = 0;
    let sampled = 0;
    for (let i = 3; i < data.length; i += 4 * 4) {
      sampled += 1;
      if (data[i] === 0) cleared += 1;
    }

    if (sampled > 0 && cleared / sampled >= REVEAL_THRESHOLD) {
      ctx.clearRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
      setRevealed(true);
      if (prize === "win") onWin();
      else onLose();
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLCanvasElement>) {
    scratchingRef.current = true;
    scratchAt(event.clientX, event.clientY);
  }

  function handlePointerMove(event: PointerEvent<HTMLCanvasElement>) {
    if (!scratchingRef.current) return;
    scratchAt(event.clientX, event.clientY);
  }

  function handlePointerUp() {
    if (!scratchingRef.current) return;
    scratchingRef.current = false;
    checkProgress();
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

        <h2 className="text-lg font-semibold">복권긁기</h2>
        <p className="text-sm text-muted-foreground">점수: {score}</p>

        <div
          className="overflow-hidden rounded-2xl border-4 border-yellow-500 bg-gradient-to-b from-red-600 to-red-700 shadow-lg"
          style={{ width: CARD_WIDTH + 16 }}
        >
          <div className="flex items-center justify-center gap-1.5 border-b-2 border-dashed border-yellow-400 py-1.5">
            <span aria-hidden="true" className="text-xs text-yellow-300">
              ★
            </span>
            <span className="text-sm font-extrabold tracking-widest text-yellow-300 [text-shadow:0_1px_1px_rgba(0,0,0,0.5)]">
              LG복권
            </span>
            <span aria-hidden="true" className="text-xs text-yellow-300">
              ★
            </span>
          </div>

          <div className="bg-white p-2">
            <div
              className="relative overflow-hidden rounded-md border border-black/10"
              style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-yellow-100 text-lg font-bold text-yellow-900">
                {prize === "win" ? "🎉 당첨" : "꽝"}
              </div>
              <canvas
                ref={canvasRef}
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                aria-label="스크래치 복권 카드"
                className="absolute inset-0 h-full w-full touch-none cursor-pointer"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              />
            </div>
          </div>
        </div>

        {revealed && (
          <p role="status" className="text-sm font-medium">
            {prize === "win" ? "당첨되었습니다!" : "안타깝네요 다음 기회에"}
          </p>
        )}
      </div>
    </div>
  );
}
