"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DogMascot } from "./dog-mascot";

import {
  PROMPT_PRESETS,
  buildExportText,
  resolvePromptText,
  sanitizeFileName,
  type PromptChoice,
} from "./prompt-presets";

type ConvertedPage = {
  title: string;
  author: string;
  markdown: string;
};

type Status = "idle" | "loading" | "error" | "success";

export function Converter() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState<ConvertedPage | null>(null);
  const [promptChoice, setPromptChoice] = useState<PromptChoice>("none");
  const [customPrompt, setCustomPrompt] = useState("");
  const [notice, setNotice] = useState("");

  const resolvedPrompt = resolvePromptText(promptChoice, customPrompt);

  async function handleConvert() {
    if (status === "loading") return;
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return;

    setStatus("loading");
    setErrorMessage("");
    setNotice("");

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmedUrl }),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "변환에 실패했습니다.");
        return;
      }

      setPage(data);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("변환 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  }

  function handleClear() {
    setUrl("");
    setPage(null);
    setStatus("idle");
    setErrorMessage("");
    setPromptChoice("none");
    setCustomPrompt("");
    setNotice("");
  }

  async function handleCopy() {
    if (!page) return;
    try {
      await navigator.clipboard.writeText(page.markdown);
      setNotice("클립보드에 복사했습니다.");
    } catch {
      setNotice("클립보드 복사에 실패했습니다. 브라우저 권한을 확인해 주세요.");
    }
  }

  function handleDownload() {
    if (!page) return;
    const blob = new Blob([page.markdown], { type: "text/markdown;charset=utf-8" });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = `${sanitizeFileName(page.title)}.md`;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  }

  async function handleOpenIn(service: "chatgpt" | "claude") {
    if (!page) return;
    const target = service === "chatgpt" ? "https://chatgpt.com/" : "https://claude.ai/new";
    try {
      await navigator.clipboard.writeText(buildExportText(resolvedPrompt, page.markdown));
      setNotice("클립보드에 복사했습니다. 새 탭에서 붙여넣기(Ctrl+V) 해주세요.");
    } catch {
      setNotice("클립보드 복사에 실패했습니다. 새 탭에 직접 붙여넣어 주세요.");
    }
    window.open(target, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-12">
      <header className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              웹페이지 Markdown 변환기
            </h1>
            <DogMascot />
          </div>
          <p className="text-sm text-muted-foreground">
            URL을 넣으면 본문만 깔끔한 Markdown으로 바꿔드려요.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <div className="flex gap-2">
        <Input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleConvert();
          }}
          placeholder="https://example.com/article"
          aria-label="웹페이지 URL"
        />
        <Button onClick={handleConvert} disabled={status === "loading" || !url.trim()}>
          {status === "loading" ? "변환 중..." : "변환"}
        </Button>
        <Button type="button" variant="outline" onClick={handleClear}>
          지우기
        </Button>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      )}

      {page && (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-border bg-purple-950 p-4 text-yellow-400">
            <h2 className="text-lg font-medium">{page.title}</h2>
            {page.author && (
              <p className="text-sm text-yellow-400/80">{page.author}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">LLM에 보낼 프롬프트</span>
            {PROMPT_PRESETS.map((preset) => (
              <Button
                key={preset.id}
                type="button"
                size="sm"
                variant={promptChoice === preset.id ? "default" : "outline"}
                onClick={() =>
                  setPromptChoice(promptChoice === preset.id ? "none" : preset.id)
                }
              >
                {preset.label}
              </Button>
            ))}
            <Button
              type="button"
              size="sm"
              variant={promptChoice === "custom" ? "default" : "outline"}
              onClick={() =>
                setPromptChoice(promptChoice === "custom" ? "none" : "custom")
              }
            >
              직접 입력
            </Button>
          </div>

          {promptChoice === "custom" && (
            <Input
              value={customPrompt}
              onChange={(event) => setCustomPrompt(event.target.value)}
              placeholder="프롬프트를 입력하세요"
              aria-label="직접 입력한 프롬프트"
            />
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={handleCopy}>
              복사하기
            </Button>
            <Button type="button" variant="outline" onClick={handleDownload}>
              .md 다운로드
            </Button>
            <Button type="button" variant="outline" onClick={() => handleOpenIn("chatgpt")}>
              ChatGPT로 열기
            </Button>
            <Button type="button" variant="outline" onClick={() => handleOpenIn("claude")}>
              Claude로 열기
            </Button>
          </div>

          {notice && (
            <p role="status" className="text-sm text-muted-foreground">
              {notice}
            </p>
          )}

          <article
            className="max-w-none space-y-4 rounded-lg border border-border p-4
              [&_a]:text-primary [&_a]:underline
              [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground
              [&_code]:font-mono [&_code]:text-sm
              [&_h1]:text-xl [&_h1]:font-semibold
              [&_h2]:text-lg [&_h2]:font-semibold
              [&_h3]:text-base [&_h3]:font-semibold
              [&_ol]:list-decimal [&_ol]:pl-5
              [&_p]:leading-7
              [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-muted [&_pre]:p-3
              [&_table]:w-full [&_table]:border-collapse
              [&_td]:border [&_td]:border-border [&_td]:p-2
              [&_th]:border [&_th]:border-border [&_th]:p-2
              [&_ul]:list-disc [&_ul]:pl-5"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.markdown}</ReactMarkdown>
          </article>
        </div>
      )}
    </div>
  );
}
