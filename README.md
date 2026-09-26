# ghostty-theme

My terminal setup — Ghostty (Cyber Wave), zsh + starship, Neovim, zellij, herdr
and every CLI tool in the `Brewfile` — with the real output of each tool.

**Site:** https://amirahnasihah.github.io/ghostty-theme/

## Use the dotfiles

```bash
git clone https://github.com/amirahnasihah/ghostty-theme.git
cd ghostty-theme
./install.sh          # brew bundle + symlinks into ~/.config
```

## Work on the site

Astro, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```bash
pnpm install
pnpm dev              # http://localhost:4321/ghostty-theme/
pnpm build            # checks every tool, then builds to dist/
```

| Command | What it does |
|---|---|
| `pnpm brew-data` | Refresh `src/data/brew.json` (official URL + description) from Homebrew |
| `pnpm capture [id…]` | Run each tool's demo and save its real coloured output to `output/<id>.ansi` |
| `pnpm shoot [id…]` | Take real Ghostty window screenshots → `public/images/shots/` (needs Screen Recording permission) |
| `pnpm check` | Every Brewfile package has an entry, a URL and captured output |

### Adding a tool

1. `brew install <tool>` and `brew bundle dump --force --file=Brewfile`
2. `pnpm brew-data`
3. Add an entry to `src/data/tools.mjs` with a `demo` command
4. `pnpm capture <id>` and check `output/<id>.ansi` before committing

Demos run inside a throwaway fixture repo (`scripts/demo/`), and `capture.mjs`
redacts home paths, hostname and private IPs — and refuses to save output that
still contains them.
