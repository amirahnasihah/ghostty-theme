# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Site rebuilt in Astro and deployed to GitHub Pages with GitHub Actions
- Real terminal output for every tool (`pnpm capture`) and real Ghostty window screenshots for TUIs (`pnpm shoot`)
- All tools catalogue generated from the Brewfile, with official links from Homebrew
- herdr and yazi sections
- Official preview images for GUI apps

- `CHANGELOG.md`
- Ghost favicon for the setup docs site
- Screenshot beautifier preview images (`ss-selection.png`, `ss-fullscreen.png`)

### Changed

- Brewfile regenerated from installed packages (herdr, awscli, flyctl, neonctl, imagemagick and more; delta, fd, dust, duf and mise removed)
- Ghostty `font-size` set to 8
- Screenshot images converted from PNG (5–7 MB) to WebP (~120 KB)

### Fixed

- Safari support for non-selectable sidebar nav items (`-webkit-user-select`)
- GitHub Actions PR creation for issue titles with spaces or quotes
- Replaced hardcoded macOS home paths with generic `$HOME` / `~` placeholders in setup docs and fastfetch config

## [2026.05.21] - 2026-05-21

### Added

- Interactive terminal setup guide (`index.html`) with Ghostty theme colors
- Config bundles for Ghostty, Zsh, Fish, Starship, Neovim, Git, lazygit, Zellij, btop, and fastfetch
- Cursor shaders for Ghostty
- `Brewfile`, `install.sh`, and GitHub workflow templates
- Issue and release automation (Start Pull Request, release drafter)

## [2026.05.12] - 2026-05-12

### Added

- Initial repository setup
