# Data attribution and modifications

Version 0.0.2 adds group-normalized candidate probabilities and Chinese collocation frequencies derived locally, retaining licensed dictionary alternatives across senses/entries without publishing subtitle text. The frozen v0.0.1 preferences remain unchanged. Candidate membership and attribution were checked at export; aggregate frequencies are not an accuracy guarantee. Local dataset originals, paired sentences, work IDs and databases are not redistributed. This extension has the same CC BY-SA 4.0 data license. The standalone schema validator under tools/ is original MIT code from the player project.

The package data and catalog are distributed under CC BY-SA 4.0:
https://creativecommons.org/licenses/by-sa/4.0/ (full text in LICENSE).

JMdict is © the Electronic Dictionary Research and Development Group (EDRDG),
used in conformance with https://www.edrdg.org/edrdg/licence.html .
Chinese derived glosses are © Y1Z / Tomoshi, CC BY-SA 4.0.
Source: https://github.com/tomoshi-app/tomoshi-dict-data
Release v2026-10-13, commit 79621e4758f9da9b696d0a9f5f3dd3baad1d9ffa.
The upstream Chinese layer includes pre-generated/model-reviewed glosses.
Retained upstream notices are in UPSTREAM-NOTICE.txt and UPSTREAM-LICENSE.txt; unrelated source tables
mentioned there are not included in this package.

Modifications by RoGent-Z (2026): select among licensed alternatives belonging
to the same dictionary sense, rank by aggregated training-corpus usage, attach
support/occurrence counts, and restructure selected entry IDs and Chinese
glosses as a browser-installable JSON package. Every v0.0.1 target was checked
against the source sense. No source subtitle lines or parallel sentences are
distributed. These modifications are also CC BY-SA 4.0.

The original local corpus is not relicensed or redistributed. Corpus frequency
is not translation accuracy. No endorsement by EDRDG, Y1Z, Tomoshi or any media
website is implied. Dictionary lookup at runtime calls no translation model.

Only original code under tools/ is MIT (LICENSE-CODE). Data remains CC BY-SA.
