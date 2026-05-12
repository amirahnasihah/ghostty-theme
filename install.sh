#!/bin/bash
set -e

DOTFILES="$(cd "$(dirname "$0")" && pwd)"

echo "→ Setting up dotfiles from $DOTFILES"

# Install Homebrew if not present
if ! command -v brew &>/dev/null; then
  echo "→ Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install all brew packages
echo "→ Installing brew packages..."
brew bundle --file="$DOTFILES/Brewfile"

# Create symlinks for ~/.config/* entries
CONFIGS=(nvim ghostty fish lazygit zellij btop fastfetch)

mkdir -p ~/.config

for dir in "${CONFIGS[@]}"; do
  src="$DOTFILES/config/$dir"
  dest="$HOME/.config/$dir"

  if [ -e "$dest" ] && [ ! -L "$dest" ]; then
    echo "  ! Backing up existing $dest → $dest.bak"
    mv "$dest" "$dest.bak"
  fi

  ln -sfn "$src" "$dest"
  echo "  ✓ $dest → $src"
done

# starship.toml
ln -sf "$DOTFILES/config/starship.toml" ~/.config/starship.toml
echo "  ✓ ~/.config/starship.toml"

echo ""
echo "Done! Restart your terminal."
