// Every tool on the site. `url`/`desc` fall back to src/data/brew.json (Homebrew's
// own homepage + description), so only override them when brew's are wrong.
//
// demo  — the command shown on the site. Captured by scripts/capture.mjs, run
//         inside scripts/demo/ so output never contains personal files.
// run   — optional: what actually executes when it differs from `demo`
//         (e.g. a privacy-safe config), so the site still shows the plain command.
// cleanup — optional: runs after the capture to remove anything the demo left
//         behind (e.g. zellij sessions that outlive the pane)
// mode  — "cli": run and save coloured stdout
//         "tui": run inside a detached tmux pane and snapshot the screen
//         (omit when there is nothing safe to run — the card links to the docs)
// section — featured tools that also have a full section in the sidebar

export const groups = [
  { id: "shell", label: "Shell & Prompt" },
  { id: "files", label: "Files & Search" },
  { id: "git", label: "Git" },
  { id: "ai", label: "AI & Agents" },
  { id: "dev", label: "Dev & Languages" },
  { id: "infra", label: "Cloud & Infra" },
  { id: "media", label: "Media & Docs" },
  { id: "system", label: "System" },
  { id: "apps", label: "Apps (cask)" },
];

export const tools = [
  // ── shell ─────────────────────────────────────────────
  { id: "starship", group: "shell", section: "starship", mode: "cli",
    demo: "starship prompt",
    run: "starship prompt --status=0 --cmd-duration=1234 --terminal-width=90 | sed -E 's/%\\{|%\\}//g'" },
  { id: "zoxide", group: "shell", mode: "cli",
    demo: "zoxide add src docs && zoxide query --list --score" },
  { id: "fzf", group: "shell", mode: "tui",
    demo: "fzf --preview 'bat --color=always --style=numbers {}'",
    run: "git ls-files | fzf --preview 'bat --color=always --style=numbers {}'" },
  { id: "direnv", group: "shell", mode: "cli",
    demo: "cd api && direnv allow . && direnv exec . sh -c 'echo $GREETING'" },
  { id: "zsh-autosuggestions", group: "shell" },
  { id: "zsh-syntax-highlighting", group: "shell" },
  { id: "tmux", group: "shell", mode: "tui", demo: "tmux new \"eza --tree --icons\" \; split-window -h \"bat src/app.ts\"",
    run: "tmux -L ghostty-demo -f /dev/null new 'eza --tree --icons; sleep 99' \; set status-style bg=#007972 \; split-window -h 'bat --paging=never src/app.ts; sleep 99'" },
  { id: "sesh", group: "shell", mode: "cli", demo: "sesh --help" },
  { id: "zellij", group: "shell", section: "zellij", mode: "tui", demo: "zellij --layout compact",
    // fixed name so `cleanup` can delete it — zellij sessions outlive the tmux pane
    run: "zellij --layout compact options --session-name ghostty-capture --show-startup-tips false",
    cleanup: "zellij kill-session ghostty-capture; zellij delete-session --force ghostty-capture" },
  { id: "atuin", group: "shell", section: "atuin", type: "curl",
    url: "https://atuin.sh", desc: "Magical shell history — sync, search and stats",
    install: "curl --proto '=https' --tlsv1.2 -LsSf https://setup.atuin.sh | sh",
    mode: "cli", demo: "atuin --help" },
  { id: "figlet", group: "shell", mode: "cli", demo: "figlet -f slant ghostty" },

  // ── files ─────────────────────────────────────────────
  { id: "eza", group: "files", mode: "cli", demo: "eza -lah --icons --git --color=always --no-user --no-time" },
  { id: "bat", group: "files", mode: "cli", demo: "bat --color=always --style=full --paging=never src/app.ts" },
  { id: "ripgrep", group: "files", mode: "cli", demo: "rg --color=always --heading -n TODO" },
  { id: "tree", group: "files", mode: "cli", demo: "tree -C -a -I .git" },
  { id: "yazi", group: "files", section: "yazi", mode: "tui", demo: "yazi" },
  { id: "trash", group: "files", mode: "cli", demo: "touch old-notes.txt && trash -v old-notes.txt" },
  { id: "jq", group: "files", mode: "cli", demo: "jq -C '{theme, font, shaders: (.shaders | length)}' data.json" },
  { id: "rclone", group: "files", mode: "cli", demo: "rclone version" },

  // ── git ───────────────────────────────────────────────
  { id: "gh", group: "git", mode: "cli", demo: "gh repo view amirahnasihah/ghostty-theme | head -20" },
  { id: "lazygit", group: "git", section: "lazygit", mode: "tui", demo: "lazygit", keys: ["Escape"] },
  { id: "git-lfs", group: "git", mode: "cli", demo: "git lfs version" },
  { id: "git-filter-repo", group: "git", mode: "cli", demo: "git filter-repo --help | head -20" },
  { id: "gitkraken-cli", group: "git", mode: "cli", demo: "gk --help | head -25" },

  // ── ai ────────────────────────────────────────────────
  { id: "herdr", group: "ai", section: "herdr", mode: "tui", demo: "herdr",
    // own config dir + --no-session: a fresh instance that can never attach to
    // the real server, so no real workspaces or agent sessions end up on the site
    run: "mkdir -p .cfg/herdr && cp ~/.config/herdr/config.toml .cfg/herdr/ && XDG_CONFIG_HOME=$PWD/.cfg herdr --no-session" },
  { id: "rtk", group: "ai", mode: "cli", demo: "rtk gain" },
  { id: "ollama", group: "ai", mode: "cli", demo: "ollama list" },
  { id: "codex", group: "ai", mode: "cli", demo: "codex --help | head -25" },
  { id: "whisper.cpp", group: "ai", mode: "cli", demo: "whisper-cli --help 2>&1 | head -20" },

  // ── dev ───────────────────────────────────────────────
  { id: "neovim", group: "dev", section: "nvim", mode: "tui", demo: "nvim src/app.ts" },
  { id: "biome", group: "dev", mode: "cli", demo: "biome format --colors=force src/ugly.ts 2>&1" },
  { id: "pnpm", group: "dev", mode: "cli", demo: "pnpm --help | head -25" },
  { id: "nodebrew", group: "dev", mode: "cli", demo: "nodebrew ls" },
  { id: "go", group: "dev", mode: "cli", demo: "go version && go env GOOS GOARCH" },
  { id: "golangci-lint", group: "dev", mode: "cli", demo: "golangci-lint --version" },
  { id: "python@3.12", group: "dev", mode: "cli", demo: "python3.12 -c 'import sys; print(sys.version)'" },
  { id: "python@3.13", group: "dev", mode: "cli", demo: "python3.13 -c 'import sys; print(sys.version)'" },
  { id: "python@3.14", group: "dev", mode: "cli", demo: "python3.14 -c 'import sys; print(sys.version)'" },
  { id: "pipx", group: "dev", mode: "cli", demo: "pipx --help | head -20" },
  { id: "php", group: "dev", mode: "cli", demo: "php -r 'echo \"PHP \" . PHP_VERSION . PHP_EOL;'" },
  { id: "composer", group: "dev", mode: "cli", demo: "composer --version" },
  { id: "cmake", group: "dev", mode: "cli", demo: "cmake --version" },
  { id: "platformio", group: "dev", mode: "cli", demo: "pio --help | head -25" },
  { id: "httpie", group: "dev", mode: "cli", demo: "http --pretty=all --print=hb GET https://httpbin.org/json" },
  { id: "wget", group: "dev", mode: "cli", demo: "wget -O /dev/null https://example.com 2>&1" },
  { id: "cliclick", group: "dev", mode: "cli", demo: "cliclick p:.", run: "cliclick p:. 2>/dev/null" },
  { id: "postgresql@14", group: "dev", mode: "cli", demo: "psql --version" },

  // ── infra ─────────────────────────────────────────────
  { id: "docker", group: "infra", mode: "cli", demo: "docker --help | head -25" },
  { id: "terraform", group: "infra", mode: "cli", demo: "terraform -help | head -25" },
  { id: "awscli", group: "infra", mode: "cli", demo: "aws --version" },
  { id: "flyctl", group: "infra", mode: "cli", demo: "fly --help | head -25" },
  { id: "cloudflared", group: "infra", mode: "cli", demo: "cloudflared --version" },
  { id: "neonctl", group: "infra", mode: "cli", demo: "neonctl --help | head -25" },
  { id: "supabase", group: "infra", mode: "cli", demo: "supabase --help | head -25" },
  { id: "infisical", group: "infra", mode: "cli", demo: "infisical --help | head -25" },
  { id: "daytona", group: "infra", mode: "cli", demo: "daytona --help | head -25" },
  { id: "gcloud-cli", group: "infra", mode: "cli", demo: "gcloud --version" },
  { id: "session-manager-plugin", group: "infra", mode: "cli", demo: "session-manager-plugin --version" },
  { id: "ngrok", group: "infra", mode: "cli", demo: "ngrok --help | head -25" },

  // ── media ─────────────────────────────────────────────
  { id: "ffmpeg", group: "media", mode: "cli",
    demo: "ffmpeg -hide_banner -f lavfi -i testsrc=duration=1:size=320x240:rate=10 -y /tmp/ghostty-demo.mp4 2>&1 | tail -6" },
  { id: "imagemagick", group: "media", mode: "cli",
    demo: "magick -size 400x120 'gradient:#007972-#001a22' /tmp/ghostty-demo.png && magick identify /tmp/ghostty-demo.png" },
  { id: "gifsicle", group: "media", mode: "cli",
    demo: "magick -size 60x60 xc:'#007972' xc:'#b4fa72' -loop 0 /tmp/ghostty-demo.gif && gifsicle --info /tmp/ghostty-demo.gif" },
  { id: "poppler", group: "media", mode: "cli",
    demo: "magick -size 400x200 xc:'#001a22' /tmp/ghostty-demo.pdf && pdfinfo /tmp/ghostty-demo.pdf" },
  { id: "qpdf", group: "media", mode: "cli",
    demo: "magick -size 400x200 xc:'#001a22' /tmp/ghostty-demo.pdf && qpdf --check /tmp/ghostty-demo.pdf" },
  { id: "tectonic", group: "media", mode: "cli", demo: "tectonic --help | head -20" },
  { id: "asciinema", group: "media", mode: "cli", demo: "asciinema --help | head -20" },

  // ── system ────────────────────────────────────────────
  { id: "btop", group: "system", section: "btop", mode: "tui", demo: "btop",
    // process list can leak argv (tokens, paths) — show cpu/mem only (net shows the local IP)
    run: "mkdir -p .cfg/btop && printf 'shown_boxes = \"cpu mem\"\\n' > .cfg/btop/btop.conf && XDG_CONFIG_HOME=$PWD/.cfg btop" },
  { id: "fastfetch", group: "system", section: "fastfetch", mode: "cli",
    demo: "fastfetch --pipe false -s title:separator:os:kernel:uptime:packages:cpu:gpu:memory:break:colors" },

  // ── apps (casks without a CLI) ────────────────────────
  { id: "ghostty", group: "apps", section: "ghostty", mode: "cli",
    demo: "ghostty +show-config",
    run: "ghostty +show-config | grep -vE '^(keybind|palette)' | head -30" },
  { id: "cursor", group: "apps" },
  { id: "visual-studio-code", group: "apps", section: "vscode" },
  { id: "docker-desktop", group: "apps" },
  { id: "dbeaver-community", group: "apps" },
  { id: "rectangle", group: "apps" },
  { id: "tailscale-app", group: "apps" },
  { id: "rustdesk", group: "apps" },
  { id: "xnapper", group: "apps" },
  { id: "blackhole-2ch", group: "apps" },
  { id: "microsoft-excel", group: "apps" },
  { id: "font-hack-nerd-font", group: "apps", section: "fonts", url: "https://www.nerdfonts.com/font-downloads",
    desc: "Hack patched with Nerd Font icons — the active terminal font" },
  { id: "font-jetbrains-mono-nerd-font", group: "apps", section: "fonts", url: "https://www.nerdfonts.com/font-downloads",
    desc: "JetBrains Mono patched with Nerd Font icons" },
];
