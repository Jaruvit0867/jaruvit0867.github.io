# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

Static single-page personal portfolio for Jaruvit Sangkaewsirikul, deployed via GitHub Pages at `jaruvit0867.github.io`. The repo name **must** stay `jaruvit0867.github.io` — GitHub Pages only serves the user-root site from this exact name.

## Stack & tooling

Pure static site — no bundler, no framework, no `package.json`, no build step, no tests. Three source files:

- `index.html` — entire page content (profile rail + workspace panels for Background, Tech Stack, Projects, Certifications)
- `styles.css` — all styling (~1150 lines, design tokens + component rules)
- `script.js` — theme toggle, footer year, scroll reveal via `IntersectionObserver`

External CDN dependencies (loaded in `index.html` `<head>`): Lucide icons (UMD), Devicon (CSS), Google Fonts (Archivo + Space Grotesk). No `node_modules` to install.

## Running locally

Open `index.html` directly in a browser, or serve the directory so asset paths resolve identically to production. The project's `.claude/settings.local.json` already allowlists `python3:*`, so the intended local server is:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deployment

Push to `main` — GitHub Pages serves from the root of `main` automatically. There is no CI, no preview branch, no manual publish step.

## Theming system

Two things must stay in sync when changing theme behavior:

1. **Inline `<head>` script** in `index.html` (lines 8–14) reads `localStorage["portfolio-theme"]` and sets `document.documentElement.dataset.theme` *before* first paint to avoid a flash. The key string `"portfolio-theme"` is duplicated — keep both occurrences identical.
2. **`script.js`** owns the toggle button (`#themeToggle`), persists to the same key, and re-renders the Lucide icon after swap. It also responds to `prefers-color-scheme` changes **only when the user has no saved preference**.

CSS tokens are defined twice under `html[data-theme="light"]` and `html[data-theme="dark"]` at the top of `styles.css` (`--accent`, `--blue`, `--surface`, `--ink`, etc.). The whole stylesheet is token-driven — to retheme, edit those blocks, not individual rules.

## Content edits

All portfolio content (experience bullets, project cards, cert links, education) lives inline in `index.html`. There is no data file or CMS. Project/cert chips use Devicon classes (e.g. `devicon-java-plain colored`) for tech logos and local PNGs in `assets/icons/` for tools Devicon doesn't cover (Claude, Ollama, Codex, Ably, PDF.js, AZ-900, TOEIC, HackerRank). PDF/PNG credentials live in `assets/`.

## Animations

Any element with class `reveal` fades in when scrolled into view (staggered by sibling index). If `IntersectionObserver` is unavailable, the script falls back to showing everything immediately — don't gate critical content on the animation.
