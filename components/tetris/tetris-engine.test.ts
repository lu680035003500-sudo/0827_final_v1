import { describe, expect, test } from "vitest";

import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  clearLines,
  createEmptyBoard,
  getShapeCells,
  isValidPosition,
  mergePiece,
  spawnPiece,
} from "./tetris-engine";

describe("isValidPosition", () => {
  test("빈 보드 위쪽 스폰 위치는 유효하다", () => {
    const board = createEmptyBoard();
    const piece = spawnPiece("T");
    expect(isValidPosition(board, piece)).toBe(true);
  });

  test("보드 왼쪽 경계를 벗어나면 유효하지 않다", () => {
    const board = createEmptyBoard();
    const piece = { type: "O" as const, rotation: 0, row: 0, col: -1 };
    expect(isValidPosition(board, piece)).toBe(false);
  });

  test("이미 채워진 칸과 겹치면 유효하지 않다", () => {
    const board = createEmptyBoard();
    board[5][3] = "#000";
    const piece = { type: "O" as const, rotation: 0, row: 4, col: 3 };
    expect(isValidPosition(board, piece)).toBe(false);
  });

  test("바닥 아래로 내려가면 유효하지 않다", () => {
    const board = createEmptyBoard();
    const piece = { type: "O" as const, rotation: 0, row: BOARD_HEIGHT - 1, col: 3 };
    expect(isValidPosition(board, piece)).toBe(false);
  });
});

describe("clearLines", () => {
  test("가득 찬 줄을 지우고 그만큼 위에 빈 줄을 채운다", () => {
    const board = createEmptyBoard();
    board[BOARD_HEIGHT - 1] = Array(BOARD_WIDTH).fill("#000");

    const { board: next, cleared } = clearLines(board);

    expect(cleared).toBe(1);
    expect(next).toHaveLength(BOARD_HEIGHT);
    expect(next[0].every((cell) => cell === null)).toBe(true);
    expect(next[BOARD_HEIGHT - 1].every((cell) => cell === null)).toBe(true);
  });

  test("가득 찬 줄이 없으면 그대로 유지한다", () => {
    const board = createEmptyBoard();
    board[BOARD_HEIGHT - 1][0] = "#000";

    const { board: next, cleared } = clearLines(board);

    expect(cleared).toBe(0);
    expect(next[BOARD_HEIGHT - 1][0]).toBe("#000");
  });
});

describe("mergePiece", () => {
  test("조각의 셀 위치에 색을 채운다", () => {
    const board = createEmptyBoard();
    const piece = { type: "O" as const, rotation: 0, row: 0, col: 0 };

    const merged = mergePiece(board, piece);

    const cells = getShapeCells(piece);
    for (const [r, c] of cells) {
      expect(merged[r][c]).not.toBeNull();
    }
    expect(board[0][0]).toBeNull();
  });
});
