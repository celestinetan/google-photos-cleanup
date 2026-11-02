---
name: "google-photos-cleanup"
description: "Organise and declutter a Google Photos library end to end in the browser - clear screenshots and forwards, build named trip and event albums, tidy and harmonise album names, fix locations, sort videos and street photography, keep the best shot of every moment, and prepare the move to another service."
---

# Google Photos cleanup and organisation – best practice (v4, created by Celestine)


Turn a messy Google Photos library into named albums with one good photo of every moment, working directly in photos.google.com. The person decides everything. Claude proposes, shows, and waits for an explicit "go ahead" before anything is trashed or deleted. Nothing is ever permanently deleted: Trash is never emptied.

This is distilled from a real project: about 120,000 photos from 2006–2026, about 330 albums, about 66,800 items trashed, about 90 new albums, over about a week of sittings. The person's own time was about 2 hours.

Say plainly before starting: this is unofficial. Since 31 March 2025 Google's Photos API only reaches content an app uploaded itself, so all of this works through the signed-in web page and can break when Google changes it.

---

## 1. Ground rules (state them in the first reply)

- **Trash, never delete.** Trash keeps items for 30 days (Google shortened this from 60; check the current figure). Never empty Trash; if asked, explain it is irreversible and get a separate yes.
- **Every Trash run waits for "go ahead"**, after the person has seen a review page.
- **One trash removes a photo everywhere**: from every album, and from phones that sync with Google Photos. Warn about phone sync before the first trash.
- **Deleting an album never deletes its photos.** Still ask before deleting albums, because shared albums' links break.
- **Never edit or delete shared albums owned by someone else.** Keep old albums that are shared with others unless the person says links may break.
- **Own mistakes immediately**, fix them, and add a guard so they cannot recur.
- **If an approval or safety check is unavailable, never work around it.** Pause, tell the person, retry later (schedule a reminder if available).

## 2. Setup and scoping

- Work in the Claude desktop app's built-in browser, signed in by the person (they type their own password). Read the built-in-browser skill first, and keep the Photos tab in front (tabs_select).
- **Keep the browser pane visible.** When the window is minimised or covered, Google Photos stops loading thumbnails, scans stall and review pages look blank. Ask the person to park the window partly visible or on a second screen. Check `document.visibilityState` and ask them to bring it back if it reads `hidden`.
- **Never open videos** to inspect them: Google autoplays them and it looks like Claude is watching. Judge from still thumbnails. If something must be opened, say why.
- Offer Google Takeout as the most thorough route but accept a "no": everything below works without it.
- **Estimate time up front** and refine after the survey. Typical figures: album building 3–5 minutes per album; screenshot review about 1 hour per 1,000; per-year photo curation about 1–2 hours per busy year. The person's own time is mostly reviewing.
- **Ask these once, early** (each answer saves a later pass):
  1. Goal: free storage, organise into albums, prepare a move, or all of these.
  2. Album granularity. Recommend trips and significant events only (more than a day, away from home, or milestones such as weddings, big birthdays, festivals, family gatherings). Google search already finds dinners, places and faces.
  3. Whether albums are in scope for cleanup, and albums to protect completely.
  4. Screenshots worth keeping (common: video calls with people, tickets, IDs).
  5. How to handle explicit or intimate photos. Usual answer: a private album with a name they choose, never Trash. Swimwear or shirtless photos are not explicit.
  6. Home base(s) over time, so trips can be told apart from home life. Family visits to the same place each year are usually not albums.

## 3. Survey (read-only)

- **Storage:** photos.google.com/quotamanagement. Note Google Photos GB, total, and the review buckets (Large photos & videos, Blurry, Screenshots, Other apps).
- **Albums:** scroll the Albums page and collect every `a[href*="album/"]` with its label (title, count, Shared). Save the list to localStorage. Flag: date-only names, camera or code names (`858HDJES`, `118_PANA`, `New folder`), multi-part albums (`Pt.1–4`), duplicates, empties, 1-item albums.
- **Timeline:** scroll the main timeline and record each day's date header, item count and Google's place label. Make the window very large first (for example 2400×3000) so each scroll covers more days. From this, list trips and events per year. Expect gaps (lost phones, unbacked-up years) and say so.
- **Unidentified big days** (hundreds of photos, no place label): open one sample photo's details or look at a few thumbnails, then **ask the person** to name or skip them. Never invent an event.
- **Google's place labels can mislead.** In the first project, a run of hallway mirror selfies was tagged "Tokyo". Look at sample thumbnails before treating a day as a trip.

## 4. Quick wins: clutter first

Do this before building albums, so clutter never lands in them.

- **Screenshots & recordings collection.** Review every item by eye on contact sheets of about 100 numbered thumbnails. Google misfiles some camera photos into it (about 7% in the first project: photos of documents, screens, people). Keep what the person asked for (for example video calls, moved to a "Screenshots – Keep" album). **Ask about passports, IDs and documents** before trashing them.
- **"Other apps" bucket** (storage page): usually app-saved videos. Separate the person's own footage (vlogs, nights out, trips) from forwards (viral clips, news, scam warnings, influencer edits). Leave anything uncertain.
- **Forwards and WhatsApp clutter.** On iPhone there is no WhatsApp folder, so search for typical forwards: "memes", "good morning", "quotes", "flyer", plus festive greetings. Review results by eye. **Protect the person's own content** (their brand or watermark, photos they took of letters, signs, posters, menus). **Ask about event flyers**: they may be the person's own events.
- **Prevent it piling up:** WhatsApp → Settings → Chats → Save to Photos off (iPhone), or Media visibility off (Android).

## 5. Build trip and event albums

- **Propose the full list first**: one line per album with dates and highlights, grouped by year. Mention existing albums to top up rather than duplicate. Offer a trimmed list (drop trips of three days or less) and let the person choose.
- **Pilot one album, show it, get approval of the result and naming**, then continue in batches of about 5, reporting a count table after each batch.
- **Naming:** agree one format up front and apply it to every album. One that works well: `Title (details) – Month Year`, for example "Myanmar (Inle Lake & Hpa-An) – November 2015", "Friends Visiting Singapore – March & April 2012", "Malacca Trip – 2005 to 2006" (en dash, full month names, `&` for two months, `to` for ranges). Another: `Place YYYY – highlights` ("Italy 2014 – Florence, Venice & Rome").
- **Mechanics:** search the month ("February 2014"), tick each day's "Select all photos from …" header for the trip dates, then Create or add to album → Album → New album, type the title, Done. Days spanning two months are added in a second pass with Add to → existing album.
- **Gotchas:** current-year date headers omit the year; month search can miss days with only 1–6 photos; very large selections take a while to save.
- **Verify every album:** count in the albums list against the expected days, and glance at the cover and a few thumbnails. Delete and redo any album that turns out wrong.

## 6. Tidy existing albums

- **Duplicates and empties:** delete the extra copy and empty or untitled 1-item albums, after a yes.
- **Merge or rename** date-named and camera-dump albums. Ask the person:
  - **Merge:** build a combined album (event or year: "2010", "2011", "Paris 2012"), then delete the old ones. Tidier, but more deletions and broken share links.
  - **Rename only:** safer and quicker.
  - **Mix:** rename date albums, merge multi-part ones.
- **Renaming:** show a contact sheet of about 12 samples per album, then propose descriptive names: `Topic – detail (date range)`. Examples: "iPhone Camera Roll – May to Jul 2011", "Photoshoot – Set 2 (Feb 2011)", "UK & Ireland 2010 – Day 8: Cliffs of Moher". Mark guesses as guesses. Leave titles that may be a person's name, or albums someone else owns. Apply the names after approval.
- **Guard every destructive album action:** confirm the page's album title matches the intended album before clicking Delete. In the first project, a slow page load deleted the wrong album, which had to be rebuilt from its dates.
- **Google throttles bulk album deletions.** After many in a row, deletes appear to work and then the album comes back. Stop and retry later.

## 7. Curate: keep the best shot of every moment

Work album by album, year by year, newest first.

1. **Training round first.** Show 50–100 photos, propose picks, let the person correct them, and write down the rules. Calibrate again whenever they rescue a pattern.
2. **Default rules:**
   - **Best shot per moment.** In a burst, keep the sharpest one with eyes open and a good expression. Keep two or three if the poses really differ.
   - **One shot per combination of people** per scene, and **one frame per viewpoint** of scenery, plus the best panorama.
   - **Remove utility shots:** receipts, tickets, labels, menus, shopping and product shots, QR codes, notes, shipping labels.
   - **Flag sensitive items for the person:** passports, IDs, medical or skin close-ups. Do not trash these silently.
   - **Remove unrelated items:** memes, forwarded greetings, promo graphics and videos, saved images of strangers, TV-screen shots.
   - **Remove bad shots:** black, dark, blurred, pocket and floor shots, accidental videos of a second or two.
   - **Be gentler** with weddings, birthdays, important dinners and milestones. Keep more.
   - **Explicit photos** go to the private album, never Trash.
   - **WhatsApp batches** share one timestamp but show different things: judge by eye, never by time.
3. **Aids for large volumes:**
   - **Candidates:** same timestamp, aspect ratio within 0.03 and lower pixel count than the largest (smaller copy, keep the highest resolution); frames under 10 s apart (burst).
   - **Screenshots outside the collection:** exact phone-screen sizes (640x1136, 750x1334, 1242x2208, 1125x2436, 828x1792, 1242x2688, 1170x2532, 1284x2778, 1179x2556, 1290x2796, 1206x2622, 1320x2868, 1080x2340, 1080x2400, 1440x3200, 1440x2960, 1080x2280) AND no camera make or model. 1080x1920 alone is never enough. Give them their own review page.
   - **Visual check:** compare 16×16 greyscale thumbnails before calling two photos the same. Start the mean-difference threshold around 12 (of 255) and calibrate on borderline pairs with the person.
   - **Keeper:** score sharpness as the variance of a Laplacian over a 256 px thumbnail. Say plainly when a keeper was chosen by rule rather than by eye.
   - **Contact sheets:** about 100 thumbnails at about 60 px, numbered. Zoom to 180–250 px whenever a frame is ambiguous. Small thumbnails hide closed eyes and slight blur, so offer smaller batches to people who want more care.
4. **Photos in several albums:** trash a photo only if it is a repeat in **every** album it belongs to. When a photo should leave one album but lives in another, use **Remove from album**, not Trash. In the first project, about 6,000 photos had to be restored from Trash because year passes ignored people and camera-roll albums.

## 8. Group loose photos into new event albums

Photos outside any album often hide events.

- Cluster loose photos by day and place, rank days by count, and show a contact sheet per cluster.
- Propose an album name per cluster (for example "Beach Weekend – Tioman 2014", "28th Birthday Party", "Portrait Photoshoot – 2019", "Family Trip – Vietnam 2025"). Ask about people's names you can't infer.
- Create them after approval, then curate them like any album.

## 8a. Split catch-all albums into events

Big "Unsorted", camera-roll or year albums hide events.

- Cluster by day (gap over about 8 hours starts a new group) and by place; show a contact sheet per cluster and propose names in the agreed format. Groups too small or too ordinary stay behind.
- Create the event albums, verify each count, **then** remove those photos from the catch-all (Remove from album, never Trash). Rename what's left "Everyday – YEAR".
- Recount the catch-all afterwards against the plan. In the first project the removal half-failed silently (round-number gaps of 100–200 remained); a second pass fixed it.
- Photos from a trip that already has an album go into that album instead of a new one.

## 8b. Album hygiene at scale

- **Harmonise names** in one pass: build the full rename table (old → new) in the agreed format, show it, apply after "go" with `SVP9Xd`. Shared albums owned by someone else can't be renamed; list them and leave them.
- **Vague names** ("Photos", "New album", dates, camera codes): look at samples and propose a descriptive name; mark guesses.
- **Duplicate albums** (same trip twice, "Part 2", "(1)"): merge into the better-named one, verify the count, then delete the empty copy.
- **Empty and tiny albums:** delete empties (no photos are touched). For 1–5-photo albums, merge related ones (for example several dinner albums from one year into "Food & Friends – … 2010") and trash pure food or product shots after "go". Leave shared albums alone.
- **Album descriptions** add little when titles already carry who, where and when; offer them only for a few special albums.

## 8c. Locations (geotags)

- **Check placement:** read each photo's coordinates and place name (`fDcn4b`), compute each album's median location, and flag photos far from it. Move strays to the album they belong in, and remove home-base photos that slipped into trip albums. Show the list first.
- **Fill missing locations** in two phases:
  1. Albums with some GPS photos: give each untagged photo the location of the nearest tagged photo **in the same album within 6 hours**; failing that, the album's dominant place.
  2. Albums with no GPS but a place in the title: one place for the whole album, the most specific the title supports (a landmark beats a city beats a country). Skip albums that mix several cities, and event albums with no place in the title.
- **Never overwrite** a photo that already has a location.
- **Resolve places** with Google Maps' AutocompleteService (`getPlacePredictions`) and PlacesService `getDetails` for coordinates, both available on the page. Check every match against the album's other photos or the expected country; short or odd queries go wrong (in the first project "8" resolved to Mexico City). Drop anything further than about 60 km from the reference, or rerun with `locationBias`.
- **Verify by reading back** a sample (or all) photos afterwards. Google refuses a small share of writes; report the count rather than retrying forever.

## 8d. Videos

- **Never play them.** Read metadata instead: duration, width and height, filename, place and date.
- **Downloads and reposts:** filenames that are UUIDs or start with `copy_`, `export_`, `FinalVideo`, plus a 960 or 1024 px longest side (TikTok saves). Show a sheet, trash after "go".
- **Repeats:** clips from the same spot within minutes that only differ by camera movement; keep the best one per spot and place. Very short junk clips (pocket, floor, under 2 s) go too.
- **Descriptions:** write `Place · Month Year` (plus the event or album name when known) into each video's description with `AQNOFd`, so search and the info panel make sense.
- **Albums:** add videos to the trip or event album their date and place match; the rest go to "Videos – Everyday & Day Trips – YEAR".

## 8e. Street photography (or any camera-specific set)

- **Use camera data, not guesses.** Ask which cameras the person shoots with; make and model come from `fDcn4b`. Native sizes help when camera data is missing (for example Sony a6400 6000×4000, Panasonic GF1 4000×2672).
- **Edited exports are a separate set:** colour-graded exports often have camera data stripped and a fixed export size (in the first project about 4898×3265). Ask whether the person has a curated, edited set and keep it apart from raw camera files.
- One album per trip: "Street Photography – Place (details) – Month Year". A "Best Of" album picks the strongest frames in the person's latest editing style, with no repeats across albums.

## 9. Review, trash and verify

- **Dry-run report first:** a table per album (now, to Trash, left) and the categories cut, in plain words.
- **Review page:** a full-screen overlay of everything marked for Trash, grouped by album and moment, keeper beside the photos going. At most 600 thumbnails per page, with Prev/Next; thousands on one page freeze the pane. Tap to rescue (green); long-press or double-tap to swap the keeper. Persist rescues in localStorage.
- **Safety check before trashing:** every marked photo, except screenshots and utility shots, must have a kept photo of the same moment within about 20 s in each of its albums. Report any orphans and keep them.
- **First run on a new account:** trash 1 item through the web call, confirm it appears in Trash, and restore it if the person wants. If the web calls fail, fall back to the normal page: select, then Move to trash.
- **Test batch:** trash about 20 mixed items first and ask the person to check them in Trash.
- **Trash the rest in batches of 100** in a background loop tracking `{done, ok, errors}`, recounting each affected album after each batch. Stop on any mismatch. Finish by re-scanning Trash and confirming every planned item is there or was rescued.
- **Audit before the 30 days run out:** list Trash and compare it with every album's contents. Restore anything that left an album it should have stayed in. Ask per album when it's personal (for example a partner's album).
- **Report:**
  - Storage from the Manage storage page, not summed file sizes.
  - Items trashed and albums before and after.
  - The person's time.
  - Older photos uploaded before June 2021 on the free "High quality" setting never counted towards storage, so the main gain may be a lighter export rather than freed space.
- **A zero rescue rate is a warning sign, not a success.** It may mean the review was too long to check properly. Suggest a quick scroll through Trash before it empties.

## 10. Wrap up and hand off

- Give a short summary: albums created, renamed, merged and deleted; items trashed; what's on hold (unnamed days, shared albums, gaps).
- **Moving to Proton Drive or similar:** Google Takeout with only Google Photos selected and the largest file size; download all parts within a week; unzip into one folder; import via Proton Drive's web Photos tab or the Windows app (Photos import → Import from Google Photos; folders become albums); check dates on a sample; keep Google Photos until satisfied. Proton skips duplicates it already has.
- **Habits that keep the library clean:**
  - Delete bursts the same day.
  - Make one album per trip on return.
  - Turn off auto-saving of chat media.
  - Archive screenshots.
- Offer a short, generic best-practice guide the person can share, with no personal photos or names unless they ask to be credited.

---

## Technical notes (photos.google.com internals; may change without notice)

- **Batch endpoint:** `/_/PhotosUi/data/batchexecute`, with tokens from `WIZ_global_data` (`SNlM0e`, `FdrFJe`, `cfb2h`). RPC ids seen:
  - `snAcKc`: list album items, paginated. Each item gives media key, thumbnail URL, width, height, timestamp and dedup key.
  - `XwAOJf`: move to Trash. Params `[null, 1, [dedupKeys], 3]`. It acts on every copy of the photo. Test with one item first; the reply can list more media keys than were sent.
  - `zy0IHe`: list Trash, paginated. Use it for audits and restore lists.
  - `lcxiM`: library listing. Video entries carry key `76647426` = `[durationMs, null, w, h, …]`.
  - `Z5xsfc`: album list, paginated `[token, null, null, null, 1]`. Each album's last element holds `{"72930366": [1, title, [times…], count, …]}`.
  - `OXvT9d`: create album. `E1Cajb`: add to album. `ycV3Nd`: remove from album, params `[[mediaIds]]` (the AF1Qip… ids, batches of 50 work). `nV6Qv`: delete album. `SVP9Xd`: rename album, `[albumId, name]`.
  - `AQNOFd`: set an item's description, `[mediaId, text]`.
  - `fDcn4b`: item info, params `[mediaId]` (the AF1Qip… id, **not** the dedup key, which returns null). Result `z[0]`: `[9]` = coordinates `[[latE7, lngE7], …]`, `[13]` holds the place name, `[20]` the albums; camera make and model match `\["(Make)","(Model)",null`.
  - `EzkLib`: search.
  - `EtUHOe`: edit location. Params `[dedupKeys.map(k => [null, k]), [2, [latE7, lngE7], null, [null, null, typeEnum], "ChIJ…placeId"]]`. It needs a Places `ChIJ…` id (the `0x…` feature id is rejected). `typeEnum`: locality 1, admin area 2, country 3, point of interest 4, premise 5, natural feature 6, neighbourhood 7, street address 8. Remove a location with `[1]` in place of the second element. A reply of `[3]` means invalid argument. Batches of 50 work.
- **Real thumbnails for fingerprints:** `fetch(url + '=w96-h96-c', {credentials: 'include'})` then `createImageBitmap`. Loading through `Image()` with crossOrigin returns a placeholder.
- **Trusted Types also blocks `innerHTML`/`insertAdjacentHTML`;** build overlays with `createElement`.
- **Thumbnails:** `=w110-h110-c` square crop, `=w250-h250` preview, `=w16-h16-s` for similarity checks, `=w256-h256` for sharpness.
- **UI flows:**
  - Add to album: select → Create or add to album → Album → pick it or New album.
  - Remove from album: photo → More options → Remove from album.
  - Rename: album page → "Click to edit title" → Done.
  - Delete album: More options → Delete album → Delete.
  - These click English labels; on other languages, tell the person and skip.
- **URLs:** use `/album/<id>` (`/lr/album/<id>` falsely says "can't access"). Read live titles by fetching `/album/<id>` and parsing `<title>`, decoding HTML entities. Saved album lists go stale, so recheck before acting.
- **Script hygiene:**
  - Tool calls end after about 45 s. Run long jobs as background async loops that update `window` progress variables, and poll them with short calls.
  - Store helper code in localStorage and `eval` it **at the start** of each call; Trusted Types blocks it after an `await`. Window variables are lost on navigation, so persist plans and picks to localStorage (for example `__pend_<name>`, `__rescue_<name>`) after every batch, and also to a plan file with a progress log the person can read.
  - Before acting on any saved plan, recheck the live library (album exists, title, count).
- **Keep the pane visible:** hidden or covered windows stop rendering and stall everything.

## Communication

- Short updates: one table plus a few bullets of what was cut and why.
- Mention running totals now and then, and remind the person that Trash keeps items for 30 days.
- Before any trash or delete step: what, how many, which albums, how to undo.
- Explain anything that might look alarming (a video playing, a page reloading) before the person asks.

- **If the computer sleeps,** the browser tools disconnect and background jobs stop. Save progress to localStorage after each batch so a job can resume from where it stopped.

Last tested: 2 November 2026 (sections 8a–8e added after the second round: about 11,000 videos described and sorted, 5,800 junk or repeat videos trashed, 343 albums renamed, 44 duplicate albums merged, 47 event albums split out of catch-alls and about 10,000 photos given locations). Earlier, 19 October 2026: Sections 2–6 and the by-eye curation in section 7 were used in the first project. The visual check, sharpness keeper, grouped review page and test batch are newer: calibrate them on the first run.