"use client";

import { useState } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DogMascot } from "./dog-mascot";
import { TetrisGame } from "@/components/tetris/tetris-game";
import { LuckyDrawModal } from "@/components/lucky-draw/lucky-draw-modal";
import { LadderGame } from "@/components/ladder-game/ladder-game";
import { ArcadeCabinet } from "@/components/arcade/arcade-cabinet";
import { GameCorridor, type CorridorButton } from "@/components/arcade/game-corridor";
import { RpsGame } from "@/components/rps/rps-game";
import { ScratchLotteryModal } from "@/components/scratch-lottery/scratch-lottery-modal";
import { SlotMachineGame } from "@/components/slot-machine/slot-machine-game";

type Scores = {
  tetris: number;
  luckyDraw: number;
  ladder: number;
  rps: number;
  scratchLottery: number;
  slotMachine: number;
};

export function Converter() {
  const [showGame, setShowGame] = useState(false);
  const [showLuckyDraw, setShowLuckyDraw] = useState(false);
  const [showLadderGame, setShowLadderGame] = useState(false);
  const [showRps, setShowRps] = useState(false);
  const [showScratchLottery, setShowScratchLottery] = useState(false);
  const [showSlotMachine, setShowSlotMachine] = useState(false);
  const [scores, setScores] = useState<Scores>({
    tetris: 0,
    luckyDraw: 0,
    ladder: 0,
    rps: 0,
    scratchLottery: 0,
    slotMachine: 0,
  });
  const totalScore =
    scores.tetris +
    scores.luckyDraw +
    scores.ladder +
    scores.rps +
    scores.scratchLottery +
    scores.slotMachine;

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

  function addScratchLotteryWinScore() {
    setScores((prev) => ({ ...prev, scratchLottery: prev.scratchLottery + 50 }));
  }

  function addScratchLotteryLoseScore() {
    setScores((prev) => ({ ...prev, scratchLottery: prev.scratchLottery - 10 }));
  }

  function addSlotMachineScore() {
    setScores((prev) => ({ ...prev, slotMachine: prev.slotMachine + 50 }));
  }

  const corridorItems: CorridorButton[] = [
    { key: "tetris", label: "테트리스", colorClass: "bg-red-500 text-white", onClick: () => setShowGame(true) },
    {
      key: "luckyDraw",
      label: "행운뽑기",
      colorClass: "bg-sky-400 text-black",
      onClick: () => setShowLuckyDraw(true),
    },
    {
      key: "ladder",
      label: "미니사다리",
      colorClass: "bg-green-500 text-white",
      onClick: () => setShowLadderGame(true),
    },
    {
      key: "rps",
      label: "가위바위보",
      colorClass: "bg-purple-500 text-white",
      onClick: () => setShowRps(true),
    },
    {
      key: "scratch",
      label: "복권긁기",
      colorClass: "bg-amber-500 text-white",
      onClick: () => setShowScratchLottery(true),
    },
    {
      key: "slot",
      label: "슬롯머신",
      colorClass: "bg-indigo-500 text-white",
      onClick: () => setShowSlotMachine(true),
    },
  ];

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
        <GameCorridor items={corridorItems} />
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
      {showScratchLottery && (
        <ScratchLotteryModal
          onClose={() => setShowScratchLottery(false)}
          score={scores.scratchLottery}
          onWin={addScratchLotteryWinScore}
          onLose={addScratchLotteryLoseScore}
        />
      )}
      {showSlotMachine && (
        <SlotMachineGame
          onClose={() => setShowSlotMachine(false)}
          score={scores.slotMachine}
          onWin={addSlotMachineScore}
        />
      )}
    </div>
  );
}
