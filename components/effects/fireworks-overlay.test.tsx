import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import { FireworksOverlay } from "./fireworks-overlay";

describe("FireworksOverlay", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test("active가 아니면 아무것도 렌더링하지 않는다", () => {
    const { container } = render(<FireworksOverlay active={false} />);
    expect(container.querySelectorAll(".animate-confetti")).toHaveLength(0);
  });

  test("active가 되면 즉시 파티클이 나타난다", () => {
    const { container } = render(<FireworksOverlay active={true} />);
    expect(container.querySelectorAll(".animate-confetti").length).toBeGreaterThan(0);
  });

  test("10초 동안 계속 새 폭죽을 터뜨린다", () => {
    vi.useFakeTimers();
    const { container } = render(<FireworksOverlay active={true} />);

    act(() => {
      vi.advanceTimersByTime(4000);
    });
    const burstsAt4s = container.querySelectorAll("[style*='left']").length;

    act(() => {
      vi.advanceTimersByTime(4000);
    });
    const burstsAt8s = container.querySelectorAll("[style*='left']").length;

    expect(burstsAt8s).toBeGreaterThanOrEqual(burstsAt4s);
    expect(container.querySelectorAll(".animate-confetti").length).toBeGreaterThan(0);
  });

  test("10초가 지나면 새 폭죽 생성을 멈춘다", () => {
    vi.useFakeTimers();
    const { container } = render(<FireworksOverlay active={true} />);

    act(() => {
      vi.advanceTimersByTime(10100);
    });
    const burstsAt10s = container.querySelectorAll("[style*='left']").length;

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    const burstsAfter = container.querySelectorAll("[style*='left']").length;

    expect(burstsAfter).toBe(burstsAt10s);
  });

  test("active가 false로 바뀌면 파티클을 정리한다", () => {
    vi.useFakeTimers();
    const { container, rerender } = render(<FireworksOverlay active={true} />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(container.querySelectorAll(".animate-confetti").length).toBeGreaterThan(0);

    rerender(<FireworksOverlay active={false} />);
    expect(container.querySelectorAll(".animate-confetti")).toHaveLength(0);
  });
});
