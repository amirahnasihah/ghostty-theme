#!/usr/bin/env node
// Every tool must link to an official site, and must show something real:
// captured output, an official image, or (fonts/zsh plugins) nothing to run.
import { existsSync } from "node:fs";
import brew from "../src/data/brew.json" with { type: "json" };
import { tools } from "../src/data/tools.mjs";

const byId = Object.fromEntries(brew.map((b) => [b.id, b]));
const problems = [];

for (const t of tools) {
  if (!(t.url ?? byId[t.id]?.url)) problems.push(`${t.id}: no url`);
  if (t.mode && t.demo && !existsSync(`output/${t.id}.ansi`)) problems.push(`${t.id}: no output — run pnpm capture ${t.id}`);
}
for (const b of brew) {
  if (!tools.some((t) => t.id === b.id)) problems.push(`${b.id}: in Brewfile but not in src/data/tools.mjs`);
}

if (problems.length) {
  console.error(problems.map((p) => `✗ ${p}`).join("\n"));
  process.exit(1);
}
console.log(`✓ ${tools.length} tools: all linked, all captured outputs present`);
