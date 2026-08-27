export const SYMBOLS = ["🍒", "🍋", "🍊", "🍇", "⭐", "7️⃣"] as const;
export type SlotSymbol = (typeof SYMBOLS)[number];

export type SpinResult = "jackpot" | "win" | "lose";

export function randomSymbol(): SlotSymbol {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

export function judgeSpin(reels: readonly [SlotSymbol, SlotSymbol, SlotSymbol]): SpinResult {
  const [a, b, c] = reels;
  if (a === b && b === c) return "jackpot";
  if (a === b || b === c || a === c) return "win";
  return "lose";
}
