export const LANES = 6;
export const ROWS = 8;
export const MISS_LABEL = "꽝";
export const WIN_LABEL = "당첨";

export type Rungs = boolean[][]; // rungs[row][col] = true means a rung connects lane col and col+1

export function generateRungs(lanes: number = LANES, rows: number = ROWS): Rungs {
  return Array.from({ length: rows }, () => {
    const row = Array<boolean>(lanes - 1).fill(false);
    let col = 0;
    while (col < lanes - 1) {
      if (Math.random() < 0.5) {
        row[col] = true;
        col += 2;
      } else {
        col += 1;
      }
    }
    return row;
  });
}

export type TracePoint = { row: number; lane: number };

export function tracePath(rungs: Rungs, startLane: number): TracePoint[] {
  const path: TracePoint[] = [{ row: 0, lane: startLane }];
  let lane = startLane;
  for (let row = 0; row < rungs.length; row++) {
    if (lane > 0 && rungs[row][lane - 1]) {
      lane -= 1;
    } else if (lane < rungs[row].length && rungs[row][lane]) {
      lane += 1;
    }
    path.push({ row: row + 1, lane });
  }
  return path;
}

export function shuffleOutcomes(lanes: number = LANES): string[] {
  const outcomes = Array.from({ length: lanes }, (_, index) =>
    index === 0 ? WIN_LABEL : MISS_LABEL
  );
  for (let i = outcomes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = outcomes[i];
    outcomes[i] = outcomes[j];
    outcomes[j] = temp;
  }
  return outcomes;
}
