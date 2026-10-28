# Package and catalog contract

## v2 matrix extension (package 0.0.2, minimum player 0.1.5)

Numeric schema `version: 2` retains v1 entries/glosses and requires package metadata plus `matrix`. The independent schema validator is `tools/local-matrix-schema.mjs`, synchronized with player v0.1.5. It validates structure, not license membership; the local export checks every candidate against the pinned licensed dictionary.

Matrix revision 1 contains `status` (experimental/stable), sparse `translation` rows (source and candidates with entryId, target, probability, support, mass), `unigrams` (target, probability, support), and `transitions` (from, to, probability, support). Probability distributions sum to 1 within 1e-5. Supports count independent content groups; per-group normalized translation mass cannot exceed support. Missing transitions use interpolated unigram backoff. Candidate strings are licensed dictionary alternatives; source scripts and aligned sentences are excluded.

Parameters: beamWidth=16, maxOperations 1000..200000, maxSegmentLength 16..512, minSupport >=2, minMargin 0..100, transitionMix 0..1, and nonnegative finite translation/transition/evidence/prior/unknown weights. The player enforces protected semantics, frozen unknown spans, full-cue budget fallback and evidence/margin gates. Relative softmax scores compare weighted alternatives; they are not probabilities of translation correctness.

The v1 catalog gains optional `experimentalReleases`, separate from recommended `releases`. Each new descriptor declares schemaVersion=2 and minAppVersion>=0.1.5; experiments are labeled channel=experimental after parsing. Old clients ignore the separate array. The payload status and channel must agree. v0.0.1 remains first in the stable list; no automatic installation of the experimental package.

The package is at most 8 MiB. Limits: 10000 source rows, 32 candidates per row / 80000 total, 50000 unigrams, 100000 transitions. Actual v0.0.2 is 2,955,493 bytes, 1 source / 4 candidates / 20000 unigrams / 15000 transitions. The 878 monolingual training groups do not imply 878 parallel groups (only 2 parallel groups and 2 pairs entered translation training).

## Retained v1 contract

`kind: asmr-local-phrase-pack`, numeric `version: 1` is the data schema.
`package` contains `id: rogent-asmr-ja-zh`, semantic `version` (e.g. `0.0.1`),
`dictionaryVersion: ja-zh-v1-20261013`, `license: CC-BY-SA-4.0`.

`entries`: exact full-cue memories with `source`, `target`, `support` >=2 and
`occurrences` >=support; max10,000. No approximate match. Empty in v0.0.1.
`glosses`: `entryId` (dictionary numeric string), `target` (Chinese alternative),
`support` >=5 and `occurrences` >=support; max10,000. First release uses >=10
independent work/content groups and stronger frequency margins. Targets must be
verified against permitted dictionary candidates before publication.

Catalog: `kind: asmr-translation-pack-catalog`, numeric `version: 1`, same `id`,
`releases` max100 unique stable semantic versions. Each release declares
`version`, `minAppVersion`, `dictionaryVersion`, UTF-8 `bytes`, lowercase
`sha256`, `phrases`, `glosses`, and a fixed repository tag raw `url`:
`https://raw.githubusercontent.com/RoGent-Z/asmr-zh-translation-pack/refs/tags/vVERSION/packs/asmr-ja-zh.json`.

Only stable X.Y.Z versions are accepted. The client compares numbers, checks
minimum app and exact dictionary version, downloads at most8MiB without cookies,
then verifies byte count, hash, schema and identity/counts before storage. An
existing unversioned local file remains importable. Package install replaces the
current optional package; it does not merge experimental preferences silently.

## Publishing the next version

1. Prepare and audit the new package, bump `package.version`, preserve notices.
2. Compute bytes/hash of the exact LF file; append a release descriptor without
   removing old descriptors. Update CHANGELOG and run `node tools/verify.mjs`.
3. Commit, create new immutable `vX.Y.Z` tag, push tag and create GitHub Release
   attaching `asmr-ja-zh.json`. Do not move existing tags.
4. Verify anonymous tag URL/hash before pushing the updated main catalog.
5. Check updates and install in a real browser, including a prior-version
   cache and network failure. Record evidence outside this repository.

This order avoids advertising a version before its pinned file exists. A new
dictionary ID system, schema or client requirement needs a website update first.
