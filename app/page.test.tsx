import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import Home from "@/app/page";

test("홈 화면은 게임시작과 행운뽑기 버튼을 보여준다", () => {
  render(<Home />);

  expect(screen.getByRole("heading", { name: "백유성의 프로젝트" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "게임시작" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "행운뽑기" })).toBeInTheDocument();
});
