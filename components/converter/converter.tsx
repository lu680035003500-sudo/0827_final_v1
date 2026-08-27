"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DogMascot } from "./dog-mascot";
import { TetrisGame } from "@/components/tetris/tetris-game";
import { LuckyDrawModal } from "@/components/lucky-draw/lucky-draw-modal";
import { LadderGame } from "@/components/ladder-game/ladder-game";
import { ArcadeCabinet } from "@/components/arcade/arcade-cabinet";
import { RpsGame } from "@/components/rps/rps-game";

type Scores = {
  tetris: number;
  luckyDraw: number;
  ladder: number;
  rps: number;
};

export function Converter() {
  const [showGame, setShowGame] = useState(false);
  const [showLuckyDraw, setShowLuckyDraw] = useState(false);
  const [showLadderGame, setShowLadderGame] = useState(false);
  const [showRps, setShowRps] = useState(false);
  const [scores, setScores] = useState<Scores>({ tetris: 0, luckyDraw: 0, ladder: 0, rps: 0 });
  const totalScore = scores.tetris + scores.luckyDraw + scores.ladder + scores.rps;

  function addTetrisScore(lines: number) {
    setScores((prev) => ({ ...prev, tetris: prev.tetris + lines * 10 }));
  }

  function addLuckyDrawScore() {
    setScores((prev) => ({ ...prev, luckyDraw: prev.luckyDraw + 10 }));
  }

  function addLadderScore() {
    setScores((prev) => ({ ...prev, ladder: prev.ladder + 10 }));
  }

  function addRpsWinScore() {
    setScores((prev) => ({ ...prev, rps: prev.rps + 10 }));
  }

  function addRpsLoseScore() {
    setScores((prev) => ({ ...prev, rps: prev.rps - 10 }));
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-12">
      <header className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              백유성의 오락실
            </h1>
            <DogMascot />
          </div>
        </div>
        <ThemeToggle />
      </header>

      <ArcadeCabinet score={totalScore}>
        <Button
          type="button"
          variant="secondary"
          className="rounded-full border-2 border-black/30 bg-red-500 text-white shadow-[0_4px_0_rgba(0,0,0,0.45),inset_0_2px_2px_rgba(255,255,255,0.35)] hover:bg-red-500 hover:brightness-110 active:translate-y-1 active:shadow-none"
          onClick={() => setShowGame(true)}
        >
          테트리스게임하기
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="rounded-full border-2 border-black/30 bg-sky-400 text-black shadow-[0_4px_0_rgba(0,0,0,0.45),inset_0_2px_2px_rgba(255,255,255,0.5)] hover:bg-sky-400 hover:brightness-110 active:translate-y-1 active:shadow-none"
          onClick={() => setShowLuckyDraw(true)}
        >
          행운뽑기
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="rounded-full border-2 border-black/30 bg-green-500 text-white shadow-[0_4px_0_rgba(0,0,0,0.45),inset_0_2px_2px_rgba(255,255,255,0.35)] hover:bg-green-500 hover:brightness-110 active:translate-y-1 active:shadow-none"
          onClick={() => setShowLadderGame(true)}
        >
          미니사다리 게임
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="rounded-full border-2 border-black/30 bg-purple-500 text-white shadow-[0_4px_0_rgba(0,0,0,0.45),inset_0_2px_2px_rgba(255,255,255,0.35)] hover:bg-purple-500 hover:brightness-110 active:translate-y-1 active:shadow-none"
          onClick={() => setShowRps(true)}
        >
          가위바위보
        </Button>
      </ArcadeCabinet>

      {showGame && (
        <TetrisGame onClose={() => setShowGame(false)} onLinesCleared={addTetrisScore} />
      )}
      {showLuckyDraw && (
        <LuckyDrawModal
          onClose={() => setShowLuckyDraw(false)}
          score={scores.luckyDraw}
          onWin={addLuckyDrawScore}
        />
      )}
      {showLadderGame && (
        <LadderGame
          onClose={() => setShowLadderGame(false)}
          score={scores.ladder}
          onWin={addLadderScore}
        />
      )}
      {showRps && (
        <RpsGame
          onClose={() => setShowRps(false)}
          score={scores.rps}
          onWin={addRpsWinScore}
          onLose={addRpsLoseScore}
        />
      )}
    </div>
  );
}
