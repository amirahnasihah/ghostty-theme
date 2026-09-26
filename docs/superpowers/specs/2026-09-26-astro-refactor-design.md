# Astro refactor + real tool output — design

Date: 2026-09-26 · Branch: `feat/astro-refactor`

## Goal

Rebuild the setup site (`index.html`, one 95 KB file) in Astro, deployed to
GitHub Pages at `https://amirahnasihah.github.io/ghostty-theme/`. The site
serves two audiences equally: me (copy-paste to set up a new Mac) and others
(see what the setup looks like and copy it).

**Core requirement:** every CLI tool shows what it actually does in the
terminal — real output captured on this Mac, not a description.

## Out of scope

- `~/term-config` repo — ignored entirely.
- Changing the visual design. Layout (sidebar + sections), Cyber Wave colours
  and Hack Nerd Font stay as they are.

## Structure

```
src/
  data/tools.ts          every tool: id, name, url, desc, tier, brew, kind,
                         demo (command), output file, image + imageSource
  components/
    Sidebar.astro
    Section.astro        featured tool: output + config + install
    ToolCard.astro       non-featured tool: name, url, desc, install, output
    TerminalOutput.astro renders captured ANSI output as a terminal window
    Screenshot.astro     image + "Source:" caption
    CodeBlock.astro      copy button
  pages/index.astro
  styles/theme.css       Cyber Wave tokens lifted from current index.html
public/
  images/                WebP screenshots (~200–400 KB each)
  favicon.svg
output/                  captured ANSI text, one file per tool (<id>.ansi)
scripts/
  capture.sh             runs each `demo` command, saves coloured output
  shoot.sh               TUI tools: open Ghostty → screencapture -l → lawa → WebP
config/                  dotfiles, unchanged except font-size
```

## Tool tiers

- **Featured** — full section: ghostty, zsh, fish, starship, nvim, lazygit,
  zellij, btop, fastfetch, herdr, yazi, atuin, git, fonts, vscode, screenshot.
- **Everything else** — a `ToolCard` per brew formula/cask, grouped by tag
  (`cli`, `dev`, `infra`, `media`, `app`).

## Output per tool (the `kind` field)

| kind | tools (examples) | how output is shown |
|---|---|---|
| `cli` | bat, eza, jq, ripgrep, zoxide, gh, httpie, tree, fzf, trash, figlet, rtk | `scripts/capture.sh` runs the demo command with colour forced, saves ANSI to `output/<id>.ansi`; rendered at build time to HTML as a terminal window (`$ command` + output). Real text, not an image. |
| `tui` | btop, lazygit, yazi, nvim, herdr, zellij, fastfetch | Real Ghostty screenshot via `scripts/shoot.sh`, piped through `lawa`, saved as WebP. |
| `official` | casks, and CLIs needing login/secrets (awscli, flyctl, neonctl, infisical) | Image from official docs/README, with a "Source:" link. No secrets are ever captured. |

Demo commands must be safe and deterministic: read-only, no network writes, no
personal data (no `~/.ssh`, no tokens, no private repo names). Captured output
is reviewed before commit.

ANSI → HTML conversion uses the `ansi_up` package at build time.

## Content updates

- Every tool links to its official site.
- `Brewfile` regenerated with `brew bundle dump` to match installed packages.
- `herdr`, `yazi` and other missing tools added.
- `config/ghostty/config`: `font-size = 8`.
- The two 5–7 MB PNGs converted to WebP.

## Deploy

- `astro.config.mjs`: `site: 'https://amirahnasihah.github.io'`,
  `base: '/ghostty-theme/'`.
- `.github/workflows/deploy.yml` using `withastro/action` + `actions/deploy-pages`.
- Pages source switched from `legacy` (main `/`) to GitHub Actions **only at
  merge time**, so the live site is untouched until then.

## Workflow

- All work on `feat/astro-refactor`, one commit per step.
- Local preview with `pnpm dev`.
- Verification: `pnpm build` succeeds; every tool in `tools.ts` has a url and
  either an output file or an image; all internal links resolve under `base`.
