#!/usr/bin/env bash
# Real Ghostty screenshots for the site (public/images/shots/<id>.webp).
#
# For each shot: open a separate Ghostty instance with a unique title, let the
# program draw, capture that one window with `screencapture -l`, then close it.
# Runs inside the fixture repo that `pnpm capture` creates, so no personal
# files are on screen. Needs Screen Recording permission for the terminal app.
#
#   bash scripts/shoot.sh            # all shots
#   bash scripts/shoot.sh nvim yazi  # only these
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT=$PWD
DEMO="$(node -e 'console.log(require("os").tmpdir())')/ghostty-theme-capture/demo"
OUT=public/images/shots
mkdir -p "$OUT"
[ -d "$DEMO" ] || { echo "run 'pnpm capture' first (creates $DEMO)"; exit 1; }
mkdir -p "$DEMO/.cfg"
node scripts/fastfetch-shot.mjs config/fastfetch/config.jsonc "$DEMO/.cfg/fastfetch.jsonc" "$ROOT/config/fastfetch/ascii.txt"

# Shots run from a short path so path headers (yazi) stay readable.
SHOT_DIR=/tmp/ghostty-theme/demo  # own parent: yazi lists the parent dir
rm -rf "$SHOT_DIR" && mkdir -p "$SHOT_DIR" && rsync -a --no-specials "$DEMO/" "$SHOT_DIR/"
trap 'rm -rf "$(dirname "$SHOT_DIR")"' EXIT

# id | window width in cells | command run in the window (cwd = fixture repo)
SHOTS=(
  "fastfetch|150|clear; fastfetch -c .cfg/fastfetch.jsonc; sleep 60"
  "nvim|110|nvim src/app.ts"
  "lazygit|110|lazygit"
  "yazi|110|yazi"
  "btop|110|mkdir -p .cfg/btop && printf 'shown_boxes = \"cpu mem\"\\n' > .cfg/btop/btop.conf && XDG_CONFIG_HOME=\$PWD/.cfg btop"
)

window_id() { # print the CGWindow id of the Ghostty window titled $1
  osascript -l JavaScript -e '
    ObjC.import("CoreGraphics");
    function run(argv) {
      const list = ObjC.castRefToObject($.CGWindowListCopyWindowInfo($.kCGWindowListOptionOnScreenOnly, 0));
      for (let i = 0; i < list.count; i++) {
        const w = list.objectAtIndex(i);
        if (ObjC.unwrap(w.objectForKey("kCGWindowName")) === argv[0]) return ObjC.unwrap(w.objectForKey("kCGWindowNumber"));
      }
      return "";
    }' "$1"
}

for entry in "${SHOTS[@]}"; do
  IFS='|' read -r id width cmd <<< "$entry"
  if [ $# -gt 0 ] && [[ ! " $* " =~ " $id " ]]; then continue; fi

  title="$id — ghostty"  # shown in the screenshot, and how we find the window
  open -na /Applications/Ghostty.app --args \
    --title="$title" --window-save-state=never --window-width="$width" --window-height=32 \
    --working-directory="$SHOT_DIR" --confirm-close-surface=false \
    -e zsh -lc "$cmd"
  wid=""
  for _ in $(seq 20); do sleep 0.5; wid=$(window_id "$title"); [ -n "$wid" ] && break; done
  if [ -z "$wid" ]; then echo "✗ $id: window never appeared"; continue; fi
  sleep 3 # let the TUI finish drawing
  tmp="/tmp/ghostty-shot-$id.png"
  screencapture -x -l "$wid" "$tmp"
  pkill -f -- "--title=$title" || true
  magick "$tmp" -resize '1600x1600>' -quality 82 "$OUT/$id.webp"
  rm -f "$tmp"
  echo "✓ $id → $OUT/$id.webp ($(du -h "$OUT/$id.webp" | cut -f1))"
done
