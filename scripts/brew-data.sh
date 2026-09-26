#!/usr/bin/env bash
# Snapshot name/homepage/description of every package in the Brewfile into
# src/data/brew.json, so the site's official URLs come straight from Homebrew.
set -euo pipefail
cd "$(dirname "$0")/.."

formulae=$(grep -E '^brew "' Brewfile | sed -E 's/^brew "([^"]+)".*/\1/')
casks=$(grep -E '^cask "' Brewfile | sed -E 's/^cask "([^"]+)".*/\1/')

# shellcheck disable=SC2086
brew info --json=v2 $formulae $casks | jq '
  [ (.formulae[] | {id: .name, type: "formula", url: .homepage, desc: .desc}),
    (.casks[]    | {id: .token, type: "cask",   url: .homepage, desc: (.desc // "")}) ]
  | sort_by(.id)' > src/data/brew.json

echo "wrote $(jq length src/data/brew.json) packages → src/data/brew.json"
