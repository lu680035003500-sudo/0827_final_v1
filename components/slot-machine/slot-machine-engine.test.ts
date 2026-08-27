import { describe, expect, test } from "vitest";

import { judgeGrid, type Grid } from "./slot-machine-engine";

describe("judgeGrid", () => {
  test("가운데 줄이 전부 같으면 잭팟이다", () => {
    const grid: Grid = [
      ["🐋", "🐟", "🐙"],
      ["🦀", "🦀", "🦀"],
      ["🐚", "⭐", "🐋"],
    ];
    expect(judgeGrid(grid)).toBe("jackpot");
  });

  test("위 또는 아래 줄이 전부 같으면 당첨이다", () => {
    const topMatch: Grid = [
      ["🐋", "🐋", "🐋"],
      ["🦀", "🐟", "🐙"],
      ["🐚", "⭐", "🐋"],
    ];
    const bottomMatch: Grid = [
      ["🐋", "🐟", "🐙"],
      ["🦀", "🐟", "🐙"],
      ["⭐", "⭐", "⭐"],
    ];
    expect(judgeGrid(topMatch)).toBe("win");
    expect(judgeGrid(bottomMatch)).toBe("win");
  });

  test("어느 줄도 맞지 않으면 꽝이다", () => {
    const grid: Grid = [
      ["🐋", "🐟", "🐙"],
      ["🦀", "🐚", "⭐"],
      ["🐟", "🐋", "🦀"],
    ];
    expect(judgeGrid(grid)).toBe("lose");
  });
});
