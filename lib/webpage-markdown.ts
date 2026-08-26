import { Defuddle } from "defuddle/node";

export type ConvertedPage = {
  title: string;
  author: string;
  markdown: string;
};

export class ConversionError extends Error {}

function parseHttpUrl(input: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    throw new ConversionError("올바른 URL 형식이 아닙니다.");
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new ConversionError("http 또는 https URL만 지원합니다.");
  }
  return parsed;
}

export async function convertUrlToMarkdown(
  input: string
): Promise<ConvertedPage> {
  const url = parseHttpUrl(input);

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; WebpageToMarkdownBot/1.0)",
        Accept: "text/html",
      },
    });
  } catch {
    throw new ConversionError("페이지를 불러오지 못했습니다.");
  }

  if (!response.ok) {
    throw new ConversionError(
      `페이지를 불러오지 못했습니다. (상태 코드 ${response.status})`
    );
  }

  const html = await response.text();

  const result = await Defuddle(html, url.toString(), { markdown: true });

  if (!result.content || !result.content.trim()) {
    throw new ConversionError("이 페이지에서 본문을 추출하지 못했습니다.");
  }

  return {
    title: result.title || url.hostname,
    author: result.author || "",
    markdown: result.content,
  };
}
