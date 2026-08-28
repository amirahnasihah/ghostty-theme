# ──────────────────────────────────────────────────────────────
#  ~/.zshrc – user amirah (macOS, Apple Silicon)
#  Clean, safe, no sudo, no shutdown
# ──────────────────────────────────────────────────────────────

# === direnv ===
eval "$(direnv hook zsh)"

# === bun ===
[ -s "$HOME/.bun/_bun" ] && source "$HOME/.bun/_bun"
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# === console-ninja ===
PATH="$HOME/.console-ninja/.bin:$PATH"


# === Herd PHP 8.4 ===
export HERD_PHP_84_INI_SCAN_DIR="$HOME/Library/Application Support/Herd/config/php/84/"
export PATH="$HOME/Library/Application Support/Herd/bin:$PATH"

# === Node Version Manager (nvm) – loaded once ===
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# === Windsurf (Codeium) ===
export PATH="$HOME/.codeium/windsurf/bin:$PATH"

# === Docker CLI completions ===
fpath=("$HOME/.docker/completions" $fpath)
autoload -Uz compinit
compinit

# === pnpm ===
export PNPM_HOME="$HOME/Library/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac

# === AWS CLI (user-only install) ===
export PATH="$HOME/bin:$PATH"

# === Optional: Pretty prompt ===
export PS1="⚡ %n@%m %1~ $ "

# ──────────────────────────────────────────────────────────────

. "$HOME/.local/bin/env"

# Added by Antigravity
export PATH="/Users/amirah/.antigravity/antigravity/bin:$PATH"
export PATH="$HOME/.cargo/bin:$PATH"

# claude-wormhole: launch Claude Code in tmux
alias cld="wormhole cld"

# OpenClaw Completion
# source "/Users/amirah/.openclaw/completions/openclaw.zsh"

export PATH="$PATH:$(go env GOPATH)/bin"
eval "$(starship init zsh)"

# Dynamic Ghostty tab title
autoload -Uz add-zsh-hook
function _set_title() {
    local dir="$(basename $PWD)"
    builtin print -rnu ${_ghostty_fd:-1} $'\e]2;amirah in osbr '"$dir"$'\a'
}
add-zsh-hook precmd _set_title
_set_title
eval "$(zoxide init zsh)"
export OLLAMA_API_KEY=your_key_here

# === lazyvim shortcut ===
alias v="nvim"

# === eza (modern ls) ===
alias ls="eza --icons"
alias ll="eza -lh --icons --git"
alias la="eza -lah --icons --git"
alias lt="eza --tree --icons"

# === yazi — quit & cd ===
function y() {
    local tmp="$(mktemp -t "yazi-cwd.XXXXXX")"
    yazi --cwd-file="$tmp" "$@"
    local cwd="$(cat -- "$tmp")"
    if [ -n "$cwd" ] && [ "$cwd" != "$PWD" ]; then
        cd -- "$cwd"
    fi
    rm -f -- "$tmp"
}
source /opt/homebrew/share/zsh-autosuggestions/zsh-autosuggestions.zsh

# === fzf ===
source <(fzf --zsh)
export FZF_DEFAULT_OPTS="
  --multi
  --preview 'bat --color=always --style=numbers {}'
  --bind 'ctrl-/:toggle-preview'
  --preview-window=right:55%:wrap
"
export FZF_CTRL_T_OPTS="--preview 'bat --color=always --style=numbers {}'"

alias ff='fastfetch'
alias zj='zellij'

# === Vercel deploy aliases ===
alias pvdeploy="vercel deploy --prod --scope team_BwP71LAsa76h6o6wbJulvAbW"
