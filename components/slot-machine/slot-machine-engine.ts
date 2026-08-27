export const SYMBOLS = ["🐋", "🐟", "🐙", "🦀", "🐚", "⭐"] as const;
export type SlotSymbol = (typeof SYMBOLS)[number];

export const GRID_SIZE = 3;
export type Grid = SlotSymbol[][];

export type SpinResult = "jackpot" | "win" | "lose";

export function randomSymbol(): SlotSymbol {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

export function createGrid(): Grid {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => randomSymbol())
  );
}

function isRowMatch(row: SlotSymbol[]): boolean {
  return row.every((symbol) => symbol === row[0]);
}

export function judgeGrid(grid: Grid): SpinResult {
  const [top, middle, bottom] = grid;
  if (isRowMatch(middle)) return "jackpot";
  if (isRowMatch(top) || isRowMatch(bottom)) return "win";
  return "lose";
}
