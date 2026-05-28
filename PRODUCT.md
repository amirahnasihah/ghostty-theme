# Product context: ghostty-theme

## Register

**product** — A reference tool for one developer's terminal stack. Design serves fast lookup of configs, aliases, and packages; it is not a marketing surface.

## Users & purpose

- **Who**: Amirah, and anyone cloning or browsing this dotfiles repo.
- **When**: Glancing at Ghostty beside the browser while tuning Zsh, Neovim, Brew, or multiplexer settings.
- **Job**: Find a specific tool's settings, keybinds, or package list without opening ten config files.

## Brand personality

Precise, terminal-native, quietly confident. Feels like documentation rendered inside a session, not a startup landing page.

## Anti-references

- Purple-on-white SaaS gradients and glassmorphism hero blocks
- Generic "developer portfolio" card grids with icon + title + blurb
- Inter/Roboto marketing typography on a config reference site
- Modal-heavy or wizard-style onboarding for static docs

## Strategic principles

1. **Monospace truth**: Body and UI chrome stay in Nerd Font / monospace; hierarchy uses size and weight, not a second display family.
2. **Cyber Wave is canonical**: Dark teal base (`#001a22`), green accents, blue for identifiers; do not drift toward navy-gold fintech or neon crypto palettes.
3. **Density is a feature**: Tables, KV grids, and cheatsheets stay scannable; whitespace is rhythmic, not sparse for its own sake.
4. **Motion = feedback**: Short transitions on nav, sections, and focus only; no page-load choreography.
5. **Content is frozen unless edited in data**: Section copy and tables reflect real configs; visual polish must not change facts.

## Accessibility

- Visible `:focus-visible` on all interactive controls
- Respect `prefers-reduced-motion` for section fades and sidebar slide
- Maintain contrast on teal/green accents against dark backgrounds (WCAG AA target for body text)
