// @vitest-environment node
import { afterEach, describe, expect, test, vi } from "vitest";

import { ConversionError, convertUrlToMarkdown } from "./webpage-markdown";

const SAMPLE_HTML = `
<!doctype html>
<html>
  <head>
    <title>테스트 기사 제목</title>
    <meta name="author" content="홍길동" />
  </head>
  <body>
    <nav>메뉴 1 메뉴 2 메뉴 3</nav>
    <article>
      <h1>테스트 기사 제목</h1>
      <p>이 문단은 기사 본문입니다. 광고나 메뉴와 달리 실제로 의미 있는 내용을 담고 있습니다.</p>
      <p>두 번째 문단도 충분한 길이의 실제 본문 내용을 담고 있어야 추출기가 이 영역을 본문으로 인식합니다.</p>
    </article>
    <footer>저작권 2026</footer>
  </body>
</html>
`;

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("convertUrlToMarkdown", () => {
  test("올바르지 않은 URL이면 ConversionError를 던진다", async () => {
    await expect(convertUrlToMarkdown("not-a-url")).rejects.toBeInstanceOf(
      ConversionError
    );
  });

  test("http/https가 아닌 URL이면 ConversionError를 던진다", async () => {
    await expect(
      convertUrlToMarkdown("ftp://example.com/file")
    ).rejects.toBeInstanceOf(ConversionError);
  });

  test("페이지를 불러오지 못하면 ConversionError를 던진다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("", { status: 404 }))
    );

    await expect(
      convertUrlToMarkdown("https://example.com/missing")
    ).rejects.toBeInstanceOf(ConversionError);
  });

  test("본문을 Markdown과 제목·저자로 변환한다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(SAMPLE_HTML, { status: 200 }))
    );

    const result = await convertUrlToMarkdown("https://example.com/article");

    expect(result.title).toBe("테스트 기사 제목");
    expect(result.author).toBe("홍길동");
    expect(result.markdown).toContain("기사 본문입니다");
    expect(result.markdown).not.toContain("메뉴 1");
  });
});
