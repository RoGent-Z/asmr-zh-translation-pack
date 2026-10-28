# Changelog

## v0.0.2 experimental — 2026-10-29

- Schema v2; minimum player v0.1.5. Stable recommendation remains v0.0.1.
- Retains 5433 frozen gloss preferences; adds 1 source form / 4 licensed candidates, 20000 unigram frequencies and 15000 sparse collocation transitions.
- Group-normalized local statistics, beam16 runtime with semantic/unknown protection, evidence/margin/operation fallback and optional scoring diagnostics.
- Dataset gate not met: 971 parallel pairs across 5 groups; training 2 pairs/2 groups; development 924/2; test 45/1. Baseline and matrix outputs unchanged on development and heldout sets; no demonstrated quality improvement.
- No source scripts, audio, aligned sentences or private databases included. 2,955,493 bytes, SHA-256 396a3cef93fb37cd613cc976d0d4ff2b39a1286306951a1df02f42a5066d4b8c.

## v0.0.1 — 2026-10-27

- First versioned package: 5,433 licensed same-sense gloss preferences, no exact sentence memories.
- Compatible with player v0.1.3 and dictionary ja-zh-v1-20261013.
- Version catalog, pinned tag download, SHA-256, browser installation/update contract.
- Local corpus originals excluded. Experimental word preferences are not a measured translation-accuracy improvement.
