---
name: Terminal Setup Guide
description: Cyber Wave terminal-native reference UI for dotfiles and tool configs
colors:
  bg-deep: "#001a22"
  bg-panel: "#001f28"
  bg-raised: "#003540"
  bg-accent: "#005c57"
  teal: "#007972"
  green: "#b4fa72"
  blue: "#a5d5fe"
  red: "#ff8272"
  yellow: "#fefdc2"
  purple: "#ff8ffd"
  fg: "#e3e5e5"
  fg-dim: "#8e8e8e"
  starship-panel: "#15161e"
typography:
  body:
    fontFamily: "'Hack Nerd Font', Hack, JetBrains Mono, Fira Code, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "'Hack Nerd Font', Hack, monospace"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.1em"
  section-title:
    fontFamily: "'Hack Nerd Font', Hack, monospace"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "3px"
  md: "6px"
  lg: "8px"
spacing:
  sm: "8px"
  md: "12px"
  lg: "24px"
components:
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.fg-dim}"
    rounded: "{rounded.md}"
    padding: "7px 16px"
  nav-item-active:
    backgroundColor: "{colors.bg-raised}"
    textColor: "{colors.green}"
    rounded: "{rounded.md}"
    padding: "7px 16px"
  card:
    backgroundColor: "{colors.bg-panel}"
    textColor: "{colors.fg-dim}"
    rounded: "{rounded.md}"
    padding: "14px"
---

## Overview

Single-page reference for a personal terminal environment (Ghostty, shell, editors, git, system tools). Visual language mirrors a dark terminal session: Cyber Wave palette, powerline-style header, sidebar file-tree navigation, and monospace tables. Built with Nuxt 4; styles live in `app/assets/css/terminal.css`.

## Colors

**Strategy**: Committed — teal and green carry navigation, headings, and active states; blue marks identifiers and card titles.

| Role | Hex | Usage |
| --- | --- | --- |
| Deep bg | `#001a22` | Page canvas |
| Panel | `#001f28` | Sidebar, cards, inputs |
| Raised | `#003540` | Hover surfaces, code blocks |
| Teal | `#007972` | Borders, table headers, focus rings |
| Green | `#b4fa72` | Section titles, active nav, success |
| Blue | `#a5d5fe` | Links, first column in tables |
| Yellow | `#fefdc2` | Inline `code`, shader names |

Neutrals are blue-tinted, not pure gray. Avoid pure `#000` / `#fff`.

## Typography

- **Stack**: Hack Nerd Font (CDN) with Hack / JetBrains Mono fallbacks.
- **Scale**: 9px labels → 14px body → 17px section titles → 20px page title.
- **Prose width**: Main column capped at `920px` (~72ch at 14px).
- **Uppercase labels**: Nav groups, `h3`, cfg-card `h4` use letter-spacing, not a second font.

## Elevation

Flat panels with 1px borders (`--bg3`, `--teal`). Depth comes from border contrast and a subtle page grid, not drop shadows. Starship preview uses a darker inset panel (`#15161e`). Zellij cheatsheet uses sheet header band `#002419`.

## Components

- **Prompt header**: Segmented powerline bar (`s-teal`, `s-git`, `s-lang`, `s-time`) above page title.
- **Sidebar nav**: Group labels + emoji icons; active item uses inset ring and green text (not a left accent stripe).
- **Cards / cfg-cards**: 6px radius, hover border shifts to teal.
- **Tags**: Semantic pill variants (`tag-ai`, `tag-shell`, `tag-active`, etc.).
- **Search**: Full-width input with teal focus border; filters plugin/extension tables client-side.
- **Zellij sheet**: Bordered cheatsheet with `zj-kbd` chips.

## Do's and Don'ts

**Do**

- Keep monospace for all UI chrome and data tables.
- Use teal borders for structure; green for "you are here" and section identity.
- Add atmosphere via a faint grid on the page background, not hero gradients.

**Don't**

- Add marketing hero metrics, gradient text, or glass cards.
- Swap to Inter/system sans for "modern" feel.
- Use thick colored `border-left` accents on list items (use full inset rings or background tints instead).
- Animate layout properties or run staggered page-load sequences.
