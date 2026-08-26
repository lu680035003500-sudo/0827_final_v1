# /api/convert가 예상 밖 오류를 로그 없이 삼킨다

**Symptom**: `convertUrlToMarkdown`이 `ConversionError`가 아닌 예외(예: Defuddle/linkedom 내부 오류)를 던지면, API는 일반적인 500 응답만 반환하고 원래 오류나 스택은 어디에도 남기지 않는다.

**Observed evidence**: `code-review low` 자동 리뷰에서 발견 (`app/api/convert/route.ts`의 catch 블록, 실제 운영 중 재현된 사례는 아직 없음).

**Suspected cause**: catch 블록이 `ConversionError`만 분기 처리하고, 그 외 예외는 `console.error` 등 서버 로그 없이 바로 일반 500 메시지로 변환한다.

**What was tried**: 없음 — 이번 세션의 검증·리뷰 예산(스펙 수용 기준을 깨거나 주 경로가 실제로 깨지는 것만 수정)에 해당하지 않아 수정하지 않고 기록만 남김.

**Proposed next step**: catch 블록에서 `ConversionError`가 아닌 예외를 `console.error`로 로깅한 뒤 동일한 500 응답을 반환하도록 한 줄 추가.
