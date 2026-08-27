import { describe, expect, test } from "vitest";

import { judge } from "./rps-engine";

describe("judge", () => {
  test("바위는 가위를 이긴다", () => {
    expect(judge("rock", "scissors")).toBe("win");
  });

  test("가위는 보를 이긴다", () => {
    expect(judge("scissors", "paper")).toBe("win");
  });

  test("보는 바위를 이긴다", () => {
    expect(judge("paper", "rock")).toBe("win");
  });

  test("같은 것을 내면 비긴다", () => {
    expect(judge("rock", "rock")).toBe("draw");
    expect(judge("paper", "paper")).toBe("draw");
    expect(judge("scissors", "scissors")).toBe("draw");
  });

  test("상대가 이기는 조합이면 진다", () => {
    expect(judge("scissors", "rock")).toBe("lose");
    expect(judge("rock", "paper")).toBe("lose");
    expect(judge("paper", "scissors")).toBe("lose");
  });
});
