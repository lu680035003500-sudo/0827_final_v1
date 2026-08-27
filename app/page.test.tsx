import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import Home from "@/app/page";

test("홈 화면은 테트리스게임하기와 행운뽑기 버튼을 보여준다", () => {
  render(<Home />);

  expect(screen.getByRole("heading", { name: "백유성의 오락실" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "테트리스게임하기" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "행운뽑기" })).toBeInTheDocument();
});
