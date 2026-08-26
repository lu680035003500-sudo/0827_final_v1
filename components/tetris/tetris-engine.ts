export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export type Cell = string | null;
export type Board = Cell[][];

export type PieceType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

type Shape = number[][];

const SHAPES: Record<PieceType, Shape[]> = {
  I: [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
  ],
  O: [
    [
      [1, 1],
      [1, 1],
    ],
  ],
  T: [
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  S: [
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
  ],
  Z: [
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ],
  ],
  J: [
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
  ],
  L: [
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
  ],
};

export const PIECE_COLORS: Record<PieceType, string> = {
  I: "#22d3ee",
  O: "#facc15",
  T: "#c084fc",
  S: "#4ade80",
  Z: "#f87171",
  J: "#60a5fa",
  L: "#fb923c",
};

const PIECE_TYPES: PieceType[] = ["I", "O", "T", "S", "Z", "J", "L"];

export type ActivePiece = {
  type: PieceType;
  rotation: number;
  row: number;
  col: number;
};

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array<Cell>(BOARD_WIDTH).fill(null)
  );
}

export function getShapeCells(piece: ActivePiece): Array<[number, number]> {
  const shapes = SHAPES[piece.type];
  const shape = shapes[((piece.rotation % shapes.length) + shapes.length) % shapes.length];
  const cells: Array<[number, number]> = [];
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) cells.push([piece.row + r, piece.col + c]);
    }
  }
  return cells;
}

export function isValidPosition(board: Board, piece: ActivePiece): boolean {
  return getShapeCells(piece).every(([r, c]) => {
    if (c < 0 || c >= BOARD_WIDTH || r >= BOARD_HEIGHT) return false;
    if (r < 0) return true;
    return board[r][c] === null;
  });
}

export function mergePiece(board: Board, piece: ActivePiece): Board {
  const next = board.map((row) => [...row]);
  for (const [r, c] of getShapeCells(piece)) {
    if (r >= 0 && r < BOARD_HEIGHT && c >= 0 && c < BOARD_WIDTH) {
      next[r][c] = PIECE_COLORS[piece.type];
    }
  }
  return next;
}

export function clearLines(board: Board): { board: Board; cleared: number } {
  const remaining = board.filter((row) => row.some((cell) => cell === null));
  const cleared = BOARD_HEIGHT - remaining.length;
  const emptyRows = Array.from({ length: cleared }, () =>
    Array<Cell>(BOARD_WIDTH).fill(null)
  );
  return { board: [...emptyRows, ...remaining], cleared };
}

export function randomPieceType(): PieceType {
  return PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
}

export function spawnPiece(type: PieceType): ActivePiece {
  const startCol = type === "O" ? 4 : 3;
  return { type, rotation: 0, row: -1, col: startCol };
}
