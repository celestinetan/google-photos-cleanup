# Google Photos Cleanup – a Claude skill

Created by [Celestine Tan](https://www.linkedin.com/in/celestinetan/) · Last tested: 19 October 2026

A Claude skill that turns a messy Google Photos library into a tidy one before you move somewhere else, such as Proton Drive. Claude clears screenshots and forwarded clutter, builds named albums for your trips and events, tidies old albums, and keeps the best photo of every moment.

**New to this? Start with the [beginner's guide](GUIDE.md):** plain-words explanations, a 10-step walkthrough, an FAQ and a checklist for moving to Proton Drive.

You make every keep-or-delete decision on a review page. Nothing is permanently deleted: removed photos sit in Google's Trash for 30 days, and the skill never empties Trash.

> **Unofficial tool, use at your own risk.** Google doesn't offer a public way to clean a whole library. Since March 2025 its official Photos API only reaches photos an app uploaded itself. This skill works through Google Photos' own web page while you're signed in, and it can stop working whenever Google changes that page. Please read the [Disclaimer & Terms of Use](#disclaimer--terms-of-use) before using it.

## What it does

1. Asks a few starting questions: your goal, which trips and events deserve an album, which screenshots to keep, and which albums to protect.
2. Surveys your storage, albums and timeline. Nothing changes yet.
3. Clears screenshots, forwarded memes, greetings and clips, batch by batch, after you've seen them.
4. Proposes one album per trip or event, builds one as a pilot, then does the rest.
5. Tidies old albums: duplicates, empty albums and code names like `118_PANA`.
6. Curates moment by moment after a short training round on your taste, so the best shot of each moment stays.
7. Trashes only after a test batch and your "go ahead", then recounts every album.
8. Finds hidden events among photos outside any album.
9. Hands you a checklist for moving to Proton Drive.

Results from the first real cleanup: about 66,800 repeats removed, storage down from about 287 GB to 229.7 GB, about 90 new albums, about 2 hours of the owner's time, and no moments lost.

## Requirements

- The **Claude desktop app** (it uses the app's built-in browser; the web and phone apps won't work).
- **No extra connector or MCP needed.** It uses the desktop app's built-in browser, which comes with the app.
- You, **signed in to Google Photos** in that built-in browser.
- A few evenings. Claude works in the background; your part is mostly reviewing.

## Install

**Option A – upload the ZIP (easiest)**

1. Download `google-photos-cleanup.zip` from the [Releases](../../releases) page.
2. In Claude, open **Settings → Capabilities → Skills** and upload the ZIP.

**Option B – copy and paste**

1. Open [`google-photos-cleanup/SKILL.md`](google-photos-cleanup/SKILL.md) and copy everything.
2. In a Claude chat, say "Save this as a skill", paste it in, and save the card Claude shows you.

Then start a new chat and say: *"Use the google-photos-cleanup skill to organise my Google Photos."*

## Before you start

- **Back up** anything you can't afford to lose.
- **Phone sync:** if your phone backs up to Google Photos, photos you trash also leave your phone.
- **Keep the Claude window visible:** if it's covered or your computer sleeps, the review page can look blank.

## Feedback

Found a problem, or did Google change its page? Please [open an issue](../../issues).

## Disclaimer & Terms of Use

This guide and the Claude skill in it are shared free of charge, for general information only, and are provided "as is" without warranty of any kind. They come with no promise that they are accurate, complete, or fit for any particular purpose.

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

## Licence

[MIT](LICENSE) © 2026 Celestine Tan
