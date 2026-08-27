import { describe, expect, test } from "vitest";

import {
  MISS_LABEL,
  WIN_LABEL,
  generateRungs,
  shuffleOutcomes,
  tracePath,
} from "./ladder-engine";

describe("generateRungs", () => {
  test("각 행에서 인접한 두 칸이 동시에 연결되지 않는다", () => {
    const rungs = generateRungs(6, 20);

    for (const row of rungs) {
      for (let col = 0; col < row.length - 1; col++) {
        expect(row[col] && row[col + 1]).toBe(false);
      }
    }
  });

  test("지정한 행·열 개수를 만든다", () => {
    const rungs = generateRungs(4, 5);
    expect(rungs).toHaveLength(5);
    expect(rungs[0]).toHaveLength(3);
  });
});

describe("tracePath", () => {
  test("가로줄이 없으면 시작한 레인 그대로 끝난다", () => {
    const rungs = [
      [false, false, false, false, false],
      [false, false, false, false, false],
    ];
    const path = tracePath(rungs, 2);
    expect(path[path.length - 1]).toEqual({ row: 2, lane: 2 });
  });

  test("가로줄을 만나면 레인이 바뀐다", () => {
    const rungs = [[true, false, false, false, false]];
    const path = tracePath(rungs, 0);
    expect(path[path.length - 1].lane).toBe(1);
  });

  test("오른쪽에서 왼쪽으로도 가로줄을 타고 이동한다", () => {
    const rungs = [[true, false, false, false, false]];
    const path = tracePath(rungs, 1);
    expect(path[path.length - 1].lane).toBe(0);
  });
});

describe("shuffleOutcomes", () => {
  test("당첨 1개와 꽝 5개로 구성된다", () => {
    const outcomes = shuffleOutcomes(6);
    expect(outcomes.filter((o) => o === WIN_LABEL)).toHaveLength(1);
    expect(outcomes.filter((o) => o === MISS_LABEL)).toHaveLength(5);
  });
});
