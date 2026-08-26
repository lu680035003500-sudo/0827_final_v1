import { expect, test } from "@playwright/test";

test("홈 화면이 열리고 URL 입력창이 보인다", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("웹페이지 Markdown 변환기");
  await expect(page.getByRole("textbox", { name: "웹페이지 URL" })).toBeVisible();
  await expect(page.getByRole("button", { name: "변환" })).toBeVisible();
});
