"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DogMascot } from "./dog-mascot";
import { TetrisGame } from "@/components/tetris/tetris-game";
import { LuckyDrawModal } from "@/components/lucky-draw/lucky-draw-modal";
import { LadderGame } from "@/components/ladder-game/ladder-game";

export function Converter() {
  const [showGame, setShowGame] = useState(false);
  const [showLuckyDraw, setShowLuckyDraw] = useState(false);
  const [showLadderGame, setShowLadderGame] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-12">
      <header className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              백유성의 프로젝트
            </h1>
            <DogMascot />
          </div>
        </div>
        <ThemeToggle />
      </header>

      <Button type="button" variant="secondary" onClick={() => setShowGame(true)}>
        테트리스게임하기
      </Button>

      <Button
        type="button"
        variant="secondary"
        className="bg-sky-400 text-black hover:bg-sky-500"
        onClick={() => setShowLuckyDraw(true)}
      >
        행운뽑기
      </Button>

      <Button type="button" variant="secondary" onClick={() => setShowLadderGame(true)}>
        미니사다리 게임
      </Button>

      {showGame && <TetrisGame onClose={() => setShowGame(false)} />}
      {showLuckyDraw && <LuckyDrawModal onClose={() => setShowLuckyDraw(false)} />}
      {showLadderGame && <LadderGame onClose={() => setShowLadderGame(false)} />}
    </div>
  );
}
