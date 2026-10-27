# Package and catalog contract

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
