# ghostty-theme

Personal terminal environment configs (Ghostty, Zsh, Neovim, Brew, etc.) plus an interactive setup guide.

## Terminal setup guide (web)

The guide was migrated from a single `index.html` to **Nuxt 4** with **Tailwind CSS** and **class-variance-authority (cva)**. The UI and content match the original page: same CSS tokens, layout, sections, tables, and client-side search/navigation.

Uses **[Bun](https://bun.sh)** as the package manager. Install dependencies once with `bun install`.

| Command | Purpose |
| --- | --- |
| `bun run dev` | Dev server at http://localhost:3000 |
| `bun run build` | Production build (Node server) |
| `bun run generate` | Static export to `.output/public` (GitHub Pages, etc.) |
| `bun run preview` | Preview production build |

CI should use `bun install --frozen-lockfile` so installs match the committed `bun.lock`.

**Regenerate the page from legacy HTML** (if you edit `legacy/index.html`):

```bash
node scripts/html-to-vue.mjs
```

**Stack**

- `app/pages/index.vue` — migrated markup (from `legacy/index.html`)
- `app/assets/css/terminal.css` — original styles (pixel-accurate)
- `app/composables/useTerminalGuide.ts` — section nav, search filters, mobile menu
- `app/utils/tag-variants.ts` — cva tag variants (for future `Tag` components)
- `public/` — `favicon.svg`, screenshots
- `PRODUCT.md` / `DESIGN.md` — Impeccable design context (Cyber Wave tokens, product register)

Design direction: terminal-native Cyber Wave palette, subtle grid/scanline atmosphere, inset-ring nav active states (no left accent stripes), `prefers-reduced-motion` support.

### Security

Supply-chain settings for this repo:

| Setting | Location | Value |
| --- | --- | --- |
| Minimum release age | `bunfig.toml` → `[install].minimumReleaseAge` | 7 days (604800 seconds) |
| Minimum release age (npm) | `.npmrc` → `min-release-age` | 7 days |
| Lockfile | `bun.lock` | Committed; use `bun install --frozen-lockfile` in CI |
| Package manager pin | `package.json` → `packageManager` | `bun@1.3.14` |

Bun is the primary installer; `.npmrc` mirrors the release-age policy for npm CLI 11.10+ if someone runs npm. To install a brand-new release before the cooldown (e.g. emergency patch), use `bun add <pkg>@<version> --minimum-release-age 0` or npm’s `--min-release-age=0`.

After adding or upgrading dependencies, run `bun run build` and keep `bun.lock` in version control.

---

# The Standard Repository

A template repository for creating standardized repositories over organization.

## Getting Started

1. Use this repository as a template for creating new repositories in `xxxxx` organization.
2. Add branch rulesets (not copied from the standard repository).
    * `main` and `release` branch should be protected with the following rules:
        * Require pull request reviews before merging
        * Require status checks to pass before merging
3. Invite collaborators by authorizing teams.
4. Create a new GitHub Projects board by copying 'Standard Project Template'.
    * Configure a workflow option named 'Auto-add to project' to add issues to the project automatically.
5. Edit this README.md file to fit the new repository.

Create handbook if needed.

<img width="500" height="199" alt="Screenshot 2026-05-19 at 4 25 34 PM" src="https://github.com/user-attachments/assets/611991bb-ca0d-4e2e-8010-6a0169a5d047" />
