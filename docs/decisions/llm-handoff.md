# LLM handoff

## Decisions

- Sending converted content to ChatGPT/Claude happens via copy-to-clipboard + open a new tab to the service, not via a URL parameter that auto-starts a prefilled conversation.

## Boundaries

- Applies to the "ChatGPT·Claude로 열기" export action only. Does not apply to the in-app copy/download actions, which already deliver content directly.
- Does not authorize building or depending on unofficial browser extensions to achieve auto-prefill; that stays out of scope per PRODUCT.md.

## Why

Neither service currently offers an official, stable way to open a new conversation with a prefilled prompt+content that starts automatically:

- Claude.ai: `claude.ai/new?q=` existed but was removed around October 2025; the surviving prefill deep links are for Claude Code/Desktop, not the general web chat.
- ChatGPT: prefilling a new conversation via URL query parameter has never been officially supported; it remains an open community feature request, with only unofficial extension-based workarounds available.

## Reconsider when

- Anthropic or OpenAI ships an official, documented URL parameter (or other API) for opening a new chat pre-populated with text that starts the conversation without a manual paste.

## Evidence worth preserving

- Anthropic help center docs describe `claude.ai/new?q=` as no longer supported for the general web chat (prefill survives only for Claude Code / Desktop deep links).
- OpenAI developer community threads (as of the check) confirm no official ChatGPT web query parameter for prefilling a new conversation exists; only third-party/extension workarounds were found.
