# Google Photos web calls used by this skill

These are Google Photos' own undocumented web calls, worked out from the signed-in page. Google can change them at any time. `scripts/gp-helpers.js` wraps every call below; run `GP.selfTest()` before a sweep. Last verified: 12 November 2026.

## How a call is sent

- `POST /_/PhotosUi/data/batchexecute?rpcids=<ID>&source-path=%2F&f.sid=<FdrFJe>&bl=<cfb2h>&hl=en&soc-app=165&soc-platform=1&soc-device=1&rt=c`
- Body: `f.req=` + URL-encoded `[[[ID, JSON.stringify(params), null, "generic"]]]` + `&at=` + `SNlM0e` token.
- The three tokens come from `window.WIZ_global_data` (`SNlM0e`, `FdrFJe`, `cfb2h`).
- The reply is several lines. The one starting `[["wrb.fr"` holds the result: element `[2]` is a JSON string with the data; if `[2]` is null and `[5]` is set (for example `[3]`), the call was refused (invalid argument or not allowed).

## Two ids

| Id | Looks like | Used by |
| :- | :- | :- |
| Media id | `AF1Qip…` (44 characters) | item details, albums, descriptions |
| Dedup key | 27 characters, no prefix | Trash, locations |

Both come back from every listing. Item details called with a dedup key return null.

## Reading

| Call | Helper | Params | Reply |
| :- | :- | :- | :- |
| `Z5xsfc` | `GP.albums()` | `[pageToken, null, null, null, 1]` | `[0]` = albums, `[1]` = next token. Per album: `[0]` id; last element `{"72930366": [1, title, [times…], count, …]}` |
| `snAcKc` | `GP.albumItems(albumId)` | `[albumId, pageToken, null, null, 1]` | `[1]` = items, `[2]` = next token. Per item: `[0]` media id, `[1]` = `[thumbUrl, width, height, …]`, `[2]` timestamp (ms), `[3]` dedup key |
| `lcxiM` | `GP.library(onItem)` | `[pageToken, null, null, null, 1]` | `[0]` = items (same shape as above), `[1]` = next token. The item's last element is an object: key `76647426` is present on videos (`[durationMs, null, w, h, …]`); key `129168200` holds the location, starting `[[latE7, lngE7]…` |
| `fDcn4b` | `GP.info(mediaId)` | `[mediaId]` | `[0]` = details: `[1]` description, `[2]` filename, `[3]` timestamp, `[6]` width, `[7]` height, `[9]` = `[[latE7, lngE7], …]` or null, `[11]` dedup key, `[13]` place name (nested), `[20]` albums. Camera make and model appear as `["Make","Model",null,…`; the owner tuple has the same shape, so skip pairs whose first value starts `AF1Qip` |
| `zy0IHe` | `GP.inTrash(keys)` | `[pageToken, 1]` | `[0]` = Trash items, `[1]` = next token |
| `EzkLib` | none | search | Not wrapped; reply shape not documented here |

## Writing

| Call | Helper | Params | Notes |
| :- | :- | :- | :- |
| `OXvT9d` | `GP.createAlbum(title, mediaIds)` | `[title, null, 1, mediaIds.map(id => [[id]])]` | Reply `[0][0]` = new album id |
| `E1Cajb` | `GP.addToAlbum(mediaIds, albumId)` | `[mediaIds, albumId]` | Batches of 100 |
| `ycV3Nd` | `GP.removeFromAlbum(albumItemIds)` | `[[ids]]` | Use the ids that the album's own listing returned. Never trashes. Batches of 50. Recount afterwards: a batch can fail silently |
| `SVP9Xd` | `GP.renameAlbum(albumId, title, oldTitle)` | `[albumId, title]` | Refused for albums someone else owns |
| `nV6Qv` | `GP.deleteAlbum(albumId)` | `[[albumId]]` | Photos stay in the library. Refused (`[3]`) for albums someone else owns. Google throttles many deletes in a row |
| `XwAOJf` | `GP.trash(dedupKeys)` | `[null, 1, dedupKeys, 3]` | Acts on every copy of the photo, in every album and on synced phones. Batches of 100. Restore from the Trash page |
| `AQNOFd` | `GP.setDescription(mediaId, text, oldText)` | `[mediaId, text]` | Overwrites; log the old text first |
| `EtUHOe` | `GP.setLocation(dedupKeys, place)` | `[keys.map(k => [null, k]), [2, [latE7, lngE7], null, [null, null, typeEnum], "ChIJ…"]]` | Needs a Places id starting `ChIJ` (the `0x…` id is refused). Batches of 50. Google refuses a small share of writes: read back |
| `EtUHOe` | `GP.clearLocation(dedupKeys)` | `[keys.map(k => [null, k]), [1]]` | Removes the location |

`typeEnum` for locations: locality 1, administrative area 2, country 3, point of interest 4, premise 5, natural feature 6, neighbourhood 7, street address 8.

## Places

`GP.findPlace(query, bias)` uses the Maps library already loaded on the page: `google.maps.places.AutocompleteService().getPlacePredictions` for the place id, then `PlacesService.getDetails({placeId, fields: ['geometry']})` for coordinates. The Geocoder and the newer Places classes are denied on this page.

## Thumbnails

Append a size to the thumbnail URL: `=w110-h110-c` (square crop), `=w250-h250` (preview), `=w96-h96-c` (fingerprints), `=w256-h256` (sharpness). For pixel data use `fetch(url, {credentials: 'include'})` and `createImageBitmap`; an `Image()` with `crossOrigin` returns a placeholder.

## Page limits

- Trusted Types blocks `innerHTML`, and blocks `eval` after an `await`. Build overlays with `createElement`; `eval(localStorage.__gp)` must be the first statement of a call.
- A tool call ends after about 45 seconds. Use `GP.job` for anything longer and poll `GP.jobs.<name>`.
- The page's own requests cannot be observed from script, so new calls have to be worked out from the page's code, one test item at a time.
