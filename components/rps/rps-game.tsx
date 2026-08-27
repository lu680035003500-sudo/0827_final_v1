"use client";

import { useState } from "react";

import {
  CHOICES,
  CHOICE_EMOJI,
  CHOICE_LABELS,
  judge,
  randomChoice,
  type Choice,
  type Outcome,
} from "./rps-engine";

const OUTCOME_TEXT: Record<Outcome, string> = {
  win: "이겼습니다!",
  lose: "졌습니다",
  draw: "비겼습니다",
};

type RpsGameProps = {
  onClose: () => void;
  score: number;
  onWin: () => void;
  onLose: () => void;
};

export function RpsGame({ onClose, score, onWin, onLose }: RpsGameProps) {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  function handlePlay(choice: Choice) {
    const computer = randomChoice();
    const result = judge(choice, computer);
    setPlayerChoice(choice);
    setComputerChoice(computer);
    setOutcome(result);
    if (result === "win") onWin();
    if (result === "lose") onLose();
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

        <h2 className="text-lg font-semibold">가위바위보</h2>
        <p className="text-sm text-muted-foreground">점수: {score}</p>

        <div className="flex gap-3">
          {CHOICES.map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => handlePlay(choice)}
              aria-label={CHOICE_LABELS[choice]}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background text-2xl transition-transform hover:scale-105 active:scale-95"
            >
              {CHOICE_EMOJI[choice]}
            </button>
          ))}
        </div>

        {playerChoice && computerChoice && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              나: {CHOICE_EMOJI[playerChoice]} {CHOICE_LABELS[playerChoice]}
            </span>
            <span>
              상대: {CHOICE_EMOJI[computerChoice]} {CHOICE_LABELS[computerChoice]}
            </span>
          </div>
        )}

        {outcome && (
          <p role="status" className="text-sm font-medium">
            {OUTCOME_TEXT[outcome]}
          </p>
        )}
      </div>
    </div>
  );
}
