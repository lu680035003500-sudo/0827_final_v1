# 웹페이지 Markdown 변환기

## Definition

웹페이지 URL을 깨끗한 Markdown으로 변환해, 다운로드하거나 ChatGPT·Claude로 즉시 넘길 수 있게 해주는 도구.

## Users and situations

읽던 웹페이지(아티클/문서)를 ChatGPT나 Claude에 넣어 요약·번역·설명을 요청하고 싶은 사람.

## Problem and current alternatives

지금은 페이지를 수동으로 복사해서 LLM에 붙여넣는데, 광고·네비게이션 등 불필요한 내용이 섞여 매번 정제가 필요하다.

## Promised change

수동 정제 없이, URL 하나로 깨끗한 본문을 즉시 LLM 대화로 이어갈 수 있게 된다.

## Core loop

URL 붙여넣기 → 본문 Markdown 변환 및 미리보기 → (선택적으로 프롬프트 선택) → 복사/다운로드 또는 ChatGPT·Claude로 바로 전달해 대화 시작.

## Capabilities and boundaries

- 단일 URL 변환에 집중한다 (배치/대량 처리 아님).
- 로그인/계정, 사용자별 저장소를 두지 않는다.
- 프롬프트는 그 자리에서만 쓰는 1회성이다 (저장하지 않음).

## Experience principles

- 간결하고 명확한 UI.

## Success signals

- 변환 후 사용자가 복사·다운로드·LLM 전달 중 하나를 실제로 완료하는 비율이 높다.

## Assumptions and unknowns

- Unknown: defuddle이 처리하지 못하는 페이지(SPA, 로그인 필요, paywall)에 대한 대응 범위.
