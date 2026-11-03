# 25CollectiveCo (25CC)

The studio's public site: portfolio of projects + blog. Jarvis project id: `25cc`.

## Stack
- Astro 5, static output, deployed on Vercel (`main` deploys).
- Blog posts live in Sanity (project `ae0tgdfg`, dataset `production`); schema in `sanity-schemas/post.ts`,
  Studio in `25CollectiveCo-studio/`. Publishing in Sanity triggers a webhook → Vercel rebuild.
- `src/pages/index.astro` holds the portfolio (Projects section). Keep project names as the projects' PRDs state them
  (retired names never appear: Kernl → WADEE, Elbo → KAKEE).

## Blog robot
`scripts/blog-robot/` writes a weekly draft and publishes only on the owner's "publish". See its README.
If an inbox message on Jarvis is a reply in a "Blog robot" thread, the robot's poll job handles it: don't answer it yourself.

## Rules
- The repo is public. Nothing private in it: no secrets, no family or client details, no personal paths in config.
  Private rules and tokens go in `~/.config/25cc-blog/`.
- BDLX-P is described publicly only as an image story generator focused on character consistency.
