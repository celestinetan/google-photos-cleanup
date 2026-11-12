# Changelog

## v5 – 12 November 2026
- Added a helper script (`scripts/gp-helpers.js`) and a call reference (`references/rpc.md`), so sessions no longer work out Google's page calls from scratch. Direct calls are now the main method; clicking through the page is the fallback.
- New rule: record the old value before any bulk rename, description or location change, and offer the change log as a file.
- New rule: clear the skill's working data from the browser at the end.
- Camera-specific sets: search the whole library at any photo size, then check files with no camera data by eye, and say what was not searched. The earlier method missed resized copies.
- Sections renumbered 1 to 15. Examples replaced with invented ones.
- Docs: corrected the install steps, the Proton duplicate note and the first-cleanup figures; the disclaimer no longer adds terms on top of the MIT licence.
- Added automatic checks for links, script syntax, matching "last tested" dates and release contents.

## v4 – 2 November 2026
- Splitting catch-all albums into events, with a recount after removal.
- Album hygiene at scale: one naming format for every album, vague names, duplicate-album merges, empty and tiny albums.
- Locations: checking photos against their album's location, and filling in missing locations (nearest tagged photo within 6 hours, then the place in the album title), with a read-back check.
- Videos: spotting downloads and reposts, same-spot repeats, place-and-date descriptions, filing into albums.
- Camera-specific sets (for example street photography) from camera data, keeping edited exports apart.
- More technical notes on the web page's internals, and on resuming jobs after the computer sleeps.

## 19 October 2026
- Added the beginner's guide (GUIDE.md) and linked it from the README.

## v3 – 19 October 2026
- Full best-practice workflow from a real cleanup: survey, clutter first, trip and event albums, album tidy-up, moment-by-moment curation, hidden events, review and verify, move to Proton Drive.
- Safety guards: every album checked before trashing, page title checked before deleting an album, test batch, recounts after every batch, Trash audit.

## v2
- Visual check of repeats, sharpness-based keeper, grouped review page, test batch.

## v1
- First version: bursts, smaller copies and screenshots.
