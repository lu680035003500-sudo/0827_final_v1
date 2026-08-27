"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  LANES,
  ROWS,
  WIN_LABEL,
  generateRungs,
  shuffleOutcomes,
  tracePath,
  type Rungs,
  type TracePoint,
} from "./ladder-engine";

const LANE_GAP = 40;
const ROW_GAP = 26;
const TOP_PADDING = 28;
const BOTTOM_PADDING = 28;

const SVG_WIDTH = LANE_GAP * (LANES - 1) + 20;
const LADDER_HEIGHT = ROW_GAP * ROWS;
const SVG_HEIGHT = TOP_PADDING + LADDER_HEIGHT + BOTTOM_PADDING;

const REVEAL_STEP_MS = 140;

function laneX(lane: number) {
  return 10 + lane * LANE_GAP;
}

function pointsToCoords(path: TracePoint[]) {
  const coords: Array<{ x: number; y: number }> = [];
  let currentX = laneX(path[0].lane);
  coords.push({ x: currentX, y: TOP_PADDING });

  for (let i = 1; i < path.length; i++) {
    const y = TOP_PADDING + path[i].row * ROW_GAP;
    coords.push({ x: currentX, y });
    const nextX = laneX(path[i].lane);
    if (nextX !== currentX) {
      coords.push({ x: nextX, y });
      currentX = nextX;
    }
  }
  return coords;
}

type GameState = {
  rungs: Rungs;
  outcomes: string[];
};

function createGame(): GameState {
  return { rungs: generateRungs(LANES, ROWS), outcomes: shuffleOutcomes(LANES) };
}

export function LadderGame({ onClose }: { onClose: () => void }) {
  const [game, setGame] = useState<GameState>(() => createGame());
  const [selectedLane, setSelectedLane] = useState<number | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{ lane: number; label: string } | null>(null);

  const path = useMemo(
    () => (selectedLane === null ? null : tracePath(game.rungs, selectedLane)),
    [game.rungs, selectedLane]
  );
  const coords = useMemo(() => (path ? pointsToCoords(path) : []), [path]);

  function handleSelectLane(lane: number) {
    if (running) return;
    setSelectedLane(lane);
    setRevealedCount(0);
    setResult(null);
  }

  function handleStart() {
    if (running || selectedLane === null || !path) return;
    setRunning(true);
    setRevealedCount(1);

    let step = 1;
    const timer = setInterval(() => {
      step += 1;
      setRevealedCount(step);
      if (step >= coords.length) {
        clearInterval(timer);
        const endLane = path[path.length - 1].lane;
        setResult({ lane: endLane, label: game.outcomes[endLane] });
        setRunning(false);
      }
    }, REVEAL_STEP_MS);
  }

  function handleReset() {
    if (running) return;
    setGame(createGame());
    setSelectedLane(null);
    setRevealedCount(0);
    setResult(null);
  }

  const revealedCoords = coords.slice(0, revealedCount);
  const polylinePoints = revealedCoords.map((c) => `${c.x},${c.y}`).join(" ");

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
      <div className="relative flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 text-card-foreground">
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold">미니사다리 게임</h2>

        <svg
          width={SVG_WIDTH}
          height={SVG_HEIGHT}
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          role="img"
          aria-label="사다리 게임판"
        >
          {Array.from({ length: LANES }, (_, lane) => (
            <line
              key={`vline-${lane}`}
              x1={laneX(lane)}
              y1={TOP_PADDING}
              x2={laneX(lane)}
              y2={TOP_PADDING + LADDER_HEIGHT}
              stroke="var(--border)"
              strokeWidth={2}
            />
          ))}

          {game.rungs.map((row, r) =>
            row.map((hasRung, col) =>
              hasRung ? (
                <line
                  key={`rung-${r}-${col}`}
                  x1={laneX(col)}
                  y1={TOP_PADDING + (r + 1) * ROW_GAP}
                  x2={laneX(col + 1)}
                  y2={TOP_PADDING + (r + 1) * ROW_GAP}
                  stroke="var(--border)"
                  strokeWidth={2}
                />
              ) : null
            )
          )}

          {revealedCoords.length > 1 && (
            <polyline
              points={polylinePoints}
              fill="none"
              stroke="#f97316"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {Array.from({ length: LANES }, (_, lane) => (
            <text
              key={`start-label-${lane}`}
              x={laneX(lane)}
              y={TOP_PADDING - 12}
              textAnchor="middle"
              fontSize={11}
              fill="var(--muted-foreground)"
            >
              {lane + 1}
            </text>
          ))}

          {game.outcomes.map((label, lane) => {
            const isLanded = result !== null && result.lane === lane;
            return (
              <g key={`end-${lane}`}>
                <rect
                  x={laneX(lane) - 15}
                  y={TOP_PADDING + LADDER_HEIGHT + 6}
                  width={30}
                  height={18}
                  rx={3}
                  fill={isLanded ? (label === WIN_LABEL ? "#facc15" : "#94a3b8") : "var(--muted)"}
                  stroke="var(--border)"
                />
                <text
                  x={laneX(lane)}
                  y={TOP_PADDING + LADDER_HEIGHT + 19}
                  textAnchor="middle"
                  fontSize={11}
                  fill={isLanded ? "#111" : "var(--foreground)"}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: LANES }, (_, lane) => (
            <Button
              key={lane}
              type="button"
              size="sm"
              variant={selectedLane === lane ? "default" : "outline"}
              disabled={running}
              onClick={() => handleSelectLane(lane)}
            >
              {lane + 1}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button type="button" onClick={handleStart} disabled={selectedLane === null || running}>
            시작
          </Button>
          <Button type="button" variant="outline" onClick={handleReset} disabled={running}>
            다시하기
          </Button>
        </div>

        {result && (
          <p role="status" className="text-sm font-medium">
            {result.label === WIN_LABEL
              ? "당첨되었습니다!"
              : "안타깝네요 다음 기회에"}
          </p>
        )}
      </div>
    </div>
  );
}
