# Beginner's guide: clean up Google Photos before you move

Created by [Celestine Tan](https://www.linkedin.com/in/celestinetan/) · Last tested: 19 October 2026

This guide and the Claude skill in this repository turn a messy Google Photos library into a tidy one before you move somewhere else, such as Proton Drive. Claude clears screenshots and forwarded clutter, builds named albums for your trips and events, tidies old albums, and keeps the best photo of every moment. You end up with clear albums, no lost moments, and far fewer files to move.

It's written for beginners. Claude does the sorting; you make every keep-or-delete decision on a review page, and anything removed sits in Google's Trash for 30 days.

> **Unofficial tool, use at your own risk.** Google doesn't offer a public way to clean a whole library. Since March 2025 its official Photos API only reaches photos an app uploaded itself. This skill works through Google Photos' own web page while you're signed in, and it can stop working whenever Google changes that page. Please read the [Disclaimer & Terms of Use](#disclaimer--terms-of-use) before you start.

## Contents

- [Key ideas in plain words](#key-ideas-in-plain-words)
- [Before you start](#before-you-start)
- [Step by step](#step-by-step)
- [What gets removed and what always stays](#what-gets-removed-and-what-always-stays)
- [Real results from the first cleanup](#real-results-from-the-first-cleanup)
- [Moving to Proton Drive](#moving-to-proton-drive)
- [FAQ](#faq)
- [For skill builders: how it works](#for-skill-builders-how-it-works)
- [Disclaimer & Terms of Use](#disclaimer--terms-of-use)

## Key ideas in plain words

- **Library and albums.** Every photo lives once in your library. An album is a list pointing at library photos, so one photo can be in several albums without using extra space.
- **Trash.** Deleting moves a photo to Trash for 30 days. You can restore it until then.
- **One delete removes every copy.** Trashing a photo takes it out of every album, and off phones that sync with Google Photos.
- **Moment.** Photos taken within a few seconds of each other.
- **Burst.** Several near-identical shots of one moment. You usually need one.
- **Smaller copy.** The same shot saved twice, for example once full size and once shrunk by WhatsApp. Keep the sharper one.
- **Screenshot.** A picture of a phone screen, recognisable by its exact screen size and missing camera details.
- **"High quality" uploads.** Photos uploaded before June 2021 on Google's free "High quality" setting never counted towards your storage. Removing them makes your move lighter but frees little storage.

## Before you start

You need:

- The **Claude desktop app** on a computer, with your chat linked to that computer.
- **No extra connector or MCP needed.** It uses the desktop app's built-in browser, which comes with the app.
- To be **signed in to Google Photos** in Claude's built-in browser (the browser pane in the app).
- The skill saved in Claude. See [Install in the README](README.md#install).
- A few evenings. Claude works in the background; your part is about 2 hours of reviewing.

Check these first:

- **Phone sync.** If your phone backs up to Google Photos, photos you trash also leave your phone. Make sure anything precious is backed up elsewhere.
- **Shared albums.** Photos other people added to a shared album belong to them and are left alone.
- **Expectations.** On an older library, the main gain is a lighter export. Storage savings can be modest.
- **Keep Claude in front.** If the Claude window is covered or your computer sleeps, the review page can look blank.

## Step by step

1. **Start.** In a new Claude chat, say: "Use the google-photos-cleanup skill to organise my Google Photos."
2. **Answer the starting questions.** Your goal, which trips and events deserve an album, which screenshots to keep, how to handle private photos, and which albums to protect.
3. **Let Claude survey.** It reads your storage, albums and timeline, and lists the trips and events it finds. It asks you to name big days it can't identify. Nothing changes yet.
4. **Clear the clutter.** Screenshots, forwarded memes, greetings, flyers and clips. You see each batch before it goes.
5. **Approve the album plan.** Claude proposes one album per trip or event with dates and a name, builds one as a pilot, then does the rest in batches.
6. **Tidy old albums.** Duplicates and empty albums go; code-named albums like "118_PANA" get clear names; date albums can be merged. You approve the list first.
7. **Curate, moment by moment.** After a short training round on your taste, Claude marks repeats, blurry shots and utility photos such as receipts and tickets. Each review page shows the photo kept beside the ones going. Tap to keep anything.
8. **Check a test batch, then say "go ahead".** Claude trashes the rest in batches and recounts every album.
9. **Find hidden events.** Photos outside any album are grouped by day, and Claude suggests new albums for real events.
10. **Move, and leave Trash alone.** Follow the Proton checklist below. Trash empties itself after 30 days; emptying it sooner can't be undone.

## What gets removed and what always stays

| Kind | Removed | Kept |
| :- | :- | :- |
| Burst | Extra frames of the same moment, confirmed to look alike | The sharpest frame (you can pick another) |
| Smaller copy | Lower-resolution copies of the same shot, confirmed to look alike | The highest-resolution copy |
| Screenshot | Images at exact phone-screen sizes with no camera details | Anything in an album you protect |
| Forwards | Memes, greetings, flyers, viral clips | Your own content and anything uncertain |
| Utility shots | Receipts, tickets, labels, menus, product shots | Anything you tap |
| Bad shots | Black, blurred, pocket and accidental shots | — |
| Sensitive items | Never trashed silently | Passports, IDs and medical photos are shown to you first; explicit photos go to a private album |

These are always kept:

- Anything you tap on a review page.
- A photo that is also in another album, unless it's a repeat in every album it's in.
- Photos that share a time but show different things, such as a batch received on WhatsApp.
- Everything in albums you protect.

**Safety check:** before anything is trashed, Claude confirms every removed photo has a kept photo of the same moment in each of its albums. Screenshots are the only exception.

## Real results from the first cleanup

The first cleanup, on a library going back to the mid-2000s, sent about 66,800 repeats to Trash over about a week.

| Measure | Before | After |
| :- | :- | :- |
| Google Photos storage | About 287 GB | 229.7 GB |
| Photos in albums (257 albums) | About 37,900 | About 26,000 |
| Owner's time spent | — | About 2 hours (an estimated 100 hours of manual sorting) |
| Moments lost | — | None: every moment kept at least one photo |

That project also built about 90 trip and event albums, renamed and merged old ones, and found new events among loose photos. Its lessons are built into the skill:

- **Check every album before trashing.** One pass ignored other albums, and about 6,000 photos had to be restored from Trash. Photos that belong elsewhere are now removed from the album, not trashed.
- **Check the page before deleting an album.** A slow page once deleted the wrong album, which had to be rebuilt.
- **Review when you're fresh.** Long review pages late at night got no rescues at all.
- **Keep the window visible.** Hidden windows stall the work.

## Moving to Proton Drive

Proton imports from a Google Takeout download, through the Proton Drive web app or its Windows app. Album folders become albums on Windows.

- [ ] Go to Google Takeout, select only Google Photos, and choose the largest file size so each year stays in one part.
- [ ] Download every part within a week; Google's links expire after that.
- [ ] Unzip all parts into one folder.
- [ ] Web: open Proton Drive's Photos tab and drag in the folders. Windows: Photos import → Import from Google Photos.
- [ ] Open a few old photos in Proton and check their dates are right.
- [ ] Leave Google Photos as it is until you're happy everything arrived.

Proton skips photos it already has, so running the import twice is safe.

## FAQ

**Can I undo a deletion?** Yes, for 30 days. Open Trash in Google Photos, select the photos and choose Restore.

**Will this delete photos from my phone?** If your phone syncs with Google Photos, yes. Back up anything precious first.

**Why didn't my storage drop much?** Older photos on the free "High quality" setting never counted towards storage.

**Will my albums be emptied?** No. Every moment in every album keeps at least one photo, and photos in protected albums are never touched.

**The review page is blank.** Bring the Claude window to the front, wake your computer, and ask Claude to reopen the page.

**It stopped working.** Google may have changed its page. Check the "last tested" date at the top, and [open an issue](../../issues) so it can be fixed.

## For skill builders: how it works

- **Access.** It runs in the Claude desktop app's built-in browser, signed in to photos.google.com, through Google Photos' own web requests from that page. A one-item test runs first; clicking the page is the fallback.
- **Survey.** It reads the albums list, scrolls the timeline for date headers and place labels, and proposes trips and events.
- **Albums.** It builds albums by searching each month and selecting whole days, and renames old albums from a sample contact sheet.
- **Finding repeats.** Candidates come from time and size, and are confirmed by comparing small grey thumbnails. The keeper is the sharpest frame unless you pick another.
- **Album safety.** A photo is trashed only if it's a repeat in every album it's in. Trashing works on the photo itself, so it leaves all albums at once.
- **Long jobs.** Browser tool calls end after about 45 seconds, so scans and trashing run as background loops, with progress saved in the browser and in a plan file.
- **Checks.** A dry-run report, a test batch, batches of 100, recounts after every batch, and a Trash audit against every album before the 30 days run out.
- **Limits.** Rename and delete-album steps click English-language labels, and Google throttles bulk album deletions.

The full instructions are in [`google-photos-cleanup/SKILL.md`](google-photos-cleanup/SKILL.md).

## Disclaimer & Terms of Use

This guide and the Claude skill are shared free of charge, for general information only, and are provided "as is" without warranty of any kind. They come with no promise that they are accurate, complete, or fit for any particular purpose.

- **Use at your own risk.** You are responsible for your own photos, accounts and decisions. Before you start, back up anything you can't afford to lose.
- **No liability.** To the fullest extent the law allows, the author accepts no liability for any loss of photos, data, access or storage, or any other direct or indirect damage, arising from using or relying on this guide or skill.
- **Indemnity.** By using this guide or skill, you agree to hold the author harmless from, and not to bring any claim against the author for, any loss or claim arising from your use of it, including claims by third parties such as Google.
- **Unofficial.** This guide is not affiliated with, endorsed by, or supported by Google, Proton, Anthropic or any other company named in it. All trademarks belong to their owners.
- **Third-party terms.** The skill automates Google Photos through its web page rather than an official API. This may not be permitted under Google's terms of service. Check the terms that apply to your account before you use it.
- **Things change.** Google, Proton and Claude can change at any time without notice, which may stop steps from working or change their effects. The "last tested" date shows when it last worked as described.
- **AI can make mistakes.** Claude proposes; you decide. Review every page before you approve anything for deletion.
- **Not professional advice.** Nothing here is legal, technical or professional advice.
- **Sharing.** You may share this guide and skill freely, but keep this section with it and don't present a changed version as the author's.

**By using this guide or the skill, you accept these terms.**

## Sources

- [Google: Updates to the Google Photos APIs (Library API changes from 31 March 2025)](https://developers.googleblog.com/en/google-photos-picker-api-launch-and-library-api-updates/)
- [Proton: How to import from Google Photos](https://proton.me/support/how-to-import-from-google-photos)
