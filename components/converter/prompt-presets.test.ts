import { describe, expect, test } from "vitest";

import {
  buildExportText,
  resolvePromptText,
  sanitizeFileName,
} from "./prompt-presets";

describe("resolvePromptText", () => {
  test("프리셋을 선택하면 해당 프리셋 문구를 반환한다", () => {
    expect(resolvePromptText("summarize", "")).toBe("다음 글을 요약해줘.");
  });

  test("직접 입력을 선택하면 입력한 문구의 앞뒤 공백을 제거해 반환한다", () => {
    expect(resolvePromptText("custom", "  번역해줘  ")).toBe("번역해줘");
  });

  test("선택하지 않으면 빈 문자열을 반환한다", () => {
    expect(resolvePromptText("none", "아무거나")).toBe("");
  });
});

describe("buildExportText", () => {
  test("프롬프트가 있으면 프롬프트와 본문 사이에 빈 줄을 두고 이어붙인다", () => {
    expect(buildExportText("요약해줘.", "본문")).toBe("요약해줘.\n\n본문");
  });

  test("프롬프트가 없으면 본문만 반환한다", () => {
    expect(buildExportText("", "본문")).toBe("본문");
  });
});

describe("sanitizeFileName", () => {
  test("파일명에 쓸 수 없는 문자를 공백으로 바꾼다", () => {
    expect(sanitizeFileName("2026:최신*버전")).toBe("2026 최신 버전");
  });

  test("빈 제목이면 기본값을 반환한다", () => {
    expect(sanitizeFileName("   ")).toBe("page");
  });
});
