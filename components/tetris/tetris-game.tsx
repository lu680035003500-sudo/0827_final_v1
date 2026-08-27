"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  PIECE_COLORS,
  clearLines,
  createEmptyBoard,
  getShapeCells,
  isValidPosition,
  mergePiece,
  randomPieceType,
  spawnPiece,
  type ActivePiece,
  type Board,
} from "./tetris-engine";

const TICK_MS = 600;
const LINE_SCORES = [0, 100, 300, 500, 800];

type TetrisGameProps = {
  onClose: () => void;
  onLinesCleared: (lines: number) => void;
};

export function TetrisGame({ onClose, onLinesCleared }: TetrisGameProps) {
  const [board, setBoard] = useState<Board>(() => createEmptyBoard());
  const [piece, setPiece] = useState<ActivePiece>(() => spawnPiece(randomPieceType()));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const boardRef = useRef(board);
  const pieceRef = useRef(piece);
  const gameOverRef = useRef(gameOver);
  const onLinesClearedRef = useRef(onLinesCleared);

  useEffect(() => {
    boardRef.current = board;
    pieceRef.current = piece;
    gameOverRef.current = gameOver;
    onLinesClearedRef.current = onLinesCleared;
  }, [board, piece, gameOver, onLinesCleared]);

  const lockAndSpawn = useCallback((finalPiece: ActivePiece) => {
    const merged = mergePiece(boardRef.current, finalPiece);
    const { board: cleared, cleared: lines } = clearLines(merged);
    if (lines > 0) {
      setScore((s) => s + LINE_SCORES[lines]);
      onLinesClearedRef.current(lines);
    }

    const next = spawnPiece(randomPieceType());
    setBoard(cleared);
    if (!isValidPosition(cleared, next)) {
      setGameOver(true);
      return;
    }
    setPiece(next);
  }, []);

  const move = useCallback((dCol: number) => {
    if (gameOverRef.current) return;
    const candidate = { ...pieceRef.current, col: pieceRef.current.col + dCol };
    if (isValidPosition(boardRef.current, candidate)) setPiece(candidate);
  }, []);

  const rotate = useCallback(() => {
    if (gameOverRef.current) return;
    const candidate = { ...pieceRef.current, rotation: pieceRef.current.rotation + 1 };
    if (isValidPosition(boardRef.current, candidate)) setPiece(candidate);
  }, []);

  const softDrop = useCallback(() => {
    if (gameOverRef.current) return;
    const candidate = { ...pieceRef.current, row: pieceRef.current.row + 1 };
    if (isValidPosition(boardRef.current, candidate)) {
      setPiece(candidate);
    } else {
      lockAndSpawn(pieceRef.current);
    }
  }, [lockAndSpawn]);

  const hardDrop = useCallback(() => {
    if (gameOverRef.current) return;
    let candidate = pieceRef.current;
    while (isValidPosition(boardRef.current, { ...candidate, row: candidate.row + 1 })) {
      candidate = { ...candidate, row: candidate.row + 1 };
    }
    lockAndSpawn(candidate);
  }, [lockAndSpawn]);

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(softDrop, TICK_MS);
    return () => clearInterval(timer);
  }, [softDrop, gameOver]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          move(-1);
          break;
        case "ArrowRight":
          event.preventDefault();
          move(1);
          break;
        case "ArrowDown":
          event.preventDefault();
          softDrop();
          break;
        case "ArrowUp":
          event.preventDefault();
          rotate();
          break;
        case " ":
          event.preventDefault();
          hardDrop();
          break;
        case "Escape":
          event.preventDefault();
          onClose();
          break;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move, rotate, softDrop, hardDrop, onClose]);

  const restart = useCallback(() => {
    setBoard(createEmptyBoard());
    setPiece(spawnPiece(randomPieceType()));
    setScore(0);
    setGameOver(false);
  }, []);

  const activeCells = new Map(
    getShapeCells(piece)
      .filter(([r]) => r >= 0)
      .map(([r, c]) => [`${r}-${c}`, PIECE_COLORS[piece.type]])
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-card-foreground">
        <div className="flex w-full items-center justify-between gap-6">
          <h2 className="text-lg font-semibold">테트리스</h2>
          <span className="text-sm">점수: {score}</span>
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            닫기
          </Button>
        </div>

        <div
          className="grid gap-px bg-border"
          style={{
            gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1.4rem)`,
            gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1.4rem)`,
          }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => {
              const color = activeCells.get(`${r}-${c}`) ?? cell;
              return (
                <div
                  key={`${r}-${c}`}
                  className="h-[1.4rem] w-[1.4rem]"
                  style={{ backgroundColor: color ?? "#0a0a0a" }}
                />
              );
            })
          )}
        </div>

        {gameOver ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium">게임 오버! 최종 점수 {score}</p>
            <Button type="button" onClick={restart}>
              다시 시작
            </Button>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            방향키로 이동/회전, 스페이스바로 즉시 낙하, ESC로 닫기
          </p>
        )}
      </div>
    </div>
  );
}
