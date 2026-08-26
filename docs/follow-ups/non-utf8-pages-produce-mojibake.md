# UTF-8이 아닌 인코딩의 페이지가 깨진 텍스트로 변환된다

**Symptom**: `Content-Type: text/html; charset=euc-kr` 등 UTF-8이 아닌 인코딩으로 응답하는 페이지를 변환하면, 제목·저자·본문이 깨진 문자(mojibake)로 나올 수 있다.

**Observed evidence**: `code-review low` 자동 리뷰에서 발견 (`lib/webpage-markdown.ts`의 `response.text()` 호출). 실제 EUC-KR 페이지로 재현하지는 않음 — Fetch 표준상 `Response.text()`가 Content-Type의 charset 파라미터와 무관하게 항상 UTF-8로 디코딩한다는 사양 근거에 기반한 추정.

**Suspected cause**: `await response.text()`가 응답 바이트를 항상 UTF-8로 해석하기 때문에, 실제 인코딩이 다르면 디코딩 결과가 깨진다.

**What was tried**: 없음 — 이번 세션의 검증·리뷰 예산상 스펙이 요구하지 않은 엣지케이스 방어이므로 수정하지 않고 기록만 남김.

**Proposed next step**: 응답의 `Content-Type` 헤더에서 charset을 읽어 `TextDecoder(charset)`으로 명시적으로 디코딩하거나, `response.arrayBuffer()` 기반으로 인코딩을 감지하는 라이브러리(any-text 등) 도입을 검토.
