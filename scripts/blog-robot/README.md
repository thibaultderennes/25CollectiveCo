# Blog robot

Writes one 25CC article a week from the week's real work and research, and publishes nothing until you say so.

## The loop
1. **Friday 15:00** (launchd `com.25cc.blog-draft`): `blog.mjs draft` reads the last 7 days:
   commits in every repo under the projects folder, checklist items finished on Jarvis Central, your own
   typed messages in Claude Code sessions (where the research and the decisions are), and the past posts
   (for voice, and to avoid repeating an angle). A headless `claude -p` with no tools picks one angle and writes it.
2. The article is saved as an **unpublished Sanity draft** (`drafts.blog-robot-<date>`), so the live site is untouched.
3. It's sent to you two ways: a **Needs you** message in the Jarvis inbox (project 25CC) and an **email** copy.
4. **Every 5 minutes** (`com.25cc.blog-poll`): `blog.mjs poll` reads your replies in that Jarvis thread:
   - `publish` (or ok / yes / approve / ship it): the draft goes live and the Sanity webhook rebuilds the site.
   - `skip`: the draft is deleted.
   - anything else is taken as edit notes: the article is rewritten and the new version comes back in the thread and by email.
   Publishing or deleting it in Sanity Studio yourself also works; the robot notices and closes the thread.

## Setup (once)
1. Sanity write token: manage.sanity.io → project → API → Tokens → *Add API token*, permission **Editor**.
2. Gmail app password: myaccount.google.com/apppasswords (needs 2-step verification).
3. Put both in `~/.config/25cc-blog/env` (`SANITY_WRITE_TOKEN`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`, optional `BLOG_EMAIL_TO`).
4. `node scripts/blog-robot/blog.mjs doctor --send-test`, then `node scripts/blog-robot/blog.mjs install`.

## Privacy
The material includes private sessions. Hard rules sit in `config.json` (`private`), and the ones that would
themselves reveal something sit in `~/.config/25cc-blog/config.json`, which is never committed. Every draft
lists what was kept out ("Kept out for privacy"), so you can check before approving.

## Commands
`draft [--dry-run] [--days N] [--force]` · `poll` · `publish [week]` · `replace <week> <post.json>` (hand-edited version) · `status` · `doctor [--send-test]` · `install` · `uninstall`
Logs: `~/Library/Logs/25cc-blog.log`. State and the week's material: `~/.cache/25cc-blog/`.
Settings: `config.json` (`draft_weekday` 0-6, Sunday = 0, default 5; `draft_time` "HH:MM"; `voice`; `model`; `studio_url`).
