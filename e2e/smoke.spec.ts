import { expect, test } from "@playwright/test";

test("홈 화면이 열리고 테트리스게임하기·행운뽑기 버튼이 보인다", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("백유성의 프로젝트");
  await expect(page.getByRole("button", { name: "테트리스게임하기" })).toBeVisible();
  await expect(page.getByRole("button", { name: "행운뽑기" })).toBeVisible();
});
