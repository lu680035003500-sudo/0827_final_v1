export const PROMPT_PRESETS = [
  { id: "summarize", label: "요약해줘", text: "다음 글을 요약해줘." },
  { id: "translate", label: "한국어로 번역해줘", text: "다음 글을 한국어로 번역해줘." },
  { id: "explain", label: "쉽게 설명해줘", text: "다음 글을 쉽게 설명해줘." },
] as const;

export type PresetId = (typeof PROMPT_PRESETS)[number]["id"];
export type PromptChoice = PresetId | "custom" | "none";

export function resolvePromptText(
  choice: PromptChoice,
  customPrompt: string
): string {
  if (choice === "none") return "";
  if (choice === "custom") return customPrompt.trim();
  return PROMPT_PRESETS.find((preset) => preset.id === choice)?.text ?? "";
}

export function buildExportText(prompt: string, markdown: string): string {
  return prompt ? `${prompt}\n\n${markdown}` : markdown;
}

export function sanitizeFileName(name: string): string {
  const cleaned = name.replace(/[\\/:*?"<>|]+/g, " ").trim().slice(0, 80);
  return cleaned || "page";
}
