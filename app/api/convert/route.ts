import { NextResponse } from "next/server";

import { ConversionError, convertUrlToMarkdown } from "@/lib/webpage-markdown";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const url = typeof body?.url === "string" ? body.url.trim() : "";

  if (!url) {
    return NextResponse.json({ error: "URL을 입력해 주세요." }, { status: 400 });
  }

  try {
    const page = await convertUrlToMarkdown(url);
    return NextResponse.json(page);
  } catch (error) {
    if (error instanceof ConversionError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }
    return NextResponse.json(
      { error: "변환 중 알 수 없는 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
