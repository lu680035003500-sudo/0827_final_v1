import { describe, expect, test } from "vitest";

import { judgeSpin } from "./slot-machine-engine";

describe("judgeSpin", () => {
  test("세 개가 모두 같으면 잭팟이다", () => {
    expect(judgeSpin(["🍒", "🍒", "🍒"])).toBe("jackpot");
  });

  test("두 개만 같으면 당첨이다", () => {
    expect(judgeSpin(["🍒", "🍒", "🍋"])).toBe("win");
    expect(judgeSpin(["🍒", "🍋", "🍒"])).toBe("win");
    expect(judgeSpin(["🍋", "🍒", "🍒"])).toBe("win");
  });

  test("모두 다르면 꽝이다", () => {
    expect(judgeSpin(["🍒", "🍋", "🍊"])).toBe("lose");
  });
});
