#!/usr/bin/env node
// Runs every tool's `demo` command on this Mac and saves the real, coloured
// terminal output to output/<id>.ansi — the site renders these as terminal windows.
//
//   node scripts/capture.mjs            # capture everything
//   node scripts/capture.mjs bat eza    # only these ids
//
// cli tools run under `script` so they see a TTY and keep their colours.
// tui tools run in a detached tmux pane on a private socket; after they settle
// we snapshot the pane with `capture-pane -e` (escape codes included).
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { homedir, hostname, tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tools } from "../src/data/tools.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "output");
const COLS = 100;
const ROWS = 30;
const TUI_SETTLE_MS = 3500;

// Fresh copy of the fixture each run, so demos that write (trash, direnv) stay idempotent.
// Own parent dir, so file managers (yazi) show only "demo" in the parent column.
const demoDir = join(tmpdir(), "ghostty-theme-capture", "demo");
rmSync(dirname(demoDir), { recursive: true, force: true });
mkdirSync(dirname(demoDir), { recursive: true });
execFileSync("cp", ["-R", join(root, "scripts/demo"), demoDir]);
const gitEnv = {
  ...process.env,
  GIT_AUTHOR_NAME: "amirah", GIT_AUTHOR_EMAIL: "demo@example.com", GIT_AUTHOR_DATE: "2026-09-26T12:00:00+08:00",
  GIT_COMMITTER_NAME: "amirah", GIT_COMMITTER_EMAIL: "demo@example.com", GIT_COMMITTER_DATE: "2026-09-26T12:00:00+08:00",
};
const git = (...args) => execFileSync("git", args, { cwd: demoDir, env: gitEnv });
git("init", "-q", "-b", "main");
git("add", "README.md", "data.json");
git("commit", "-q", "-m", "chore: add demo fixture");
git("add", "src", "docs", "api");
git("commit", "-q", "-m", "feat: greet with the Cyber Wave theme");
writeFileSync(join(demoDir, ".git/info/exclude"), ".zoxide/\n.cfg/\n");

// Drop multiplexer vars so demos don't think they're nested (herdr refuses to start).
const inherited = Object.fromEntries(
  Object.entries(process.env).filter(([k]) => !/^(HERDR_|TMUX|ZELLIJ|TERM_PROGRAM)/.test(k)),
);

const env = {
  ...inherited,
  PATH: `/Applications/Ghostty.app/Contents/MacOS:${process.env.PATH}`,
  TERM: "xterm-256color",
  COLORTERM: "truecolor",
  COLUMNS: String(COLS),
  LINES: String(ROWS),
  FORCE_COLOR: "1",
  CLICOLOR_FORCE: "1",
  _ZO_DATA_DIR: join(demoDir, ".zoxide"),
};

// Hostname, also when a status bar truncates it (tmux shows "…-MacBook-Ai").
const host = hostname().replace(/\.local$/, "");
const hostRe = new RegExp(host.slice(0, 12).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[\\w.-]*", "g");

function isPrivateIp(ip) {
  const [a, b] = ip.split(".").map(Number);
  return a === 10 || (a === 192 && b === 168) || (a === 172 && b >= 16 && b <= 31) || (a === 100 && b >= 64 && b <= 127);
}

// Never publish anything that identifies this machine beyond what's already public.
function redact(text) {
  return text
    .replaceAll("\r\n", "\n")
    .replaceAll("\r", "")
    .replace(/\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)/g, "") // OSC: titles, colour queries
    .replace(/\x1b\[[0-9;?<>=]*[A-Za-ln-z]/g, "") // every CSI except colours (…m)
    .replace(/\x1b[=>]/g, "")
    .replace(/^\^D\x08\x08/gm, "")
    .replaceAll(`/private${demoDir}`, "~/demo")
    .replaceAll(demoDir, "~/demo")
    .replaceAll(homedir(), "~")
    .replace(hostRe, "macbook")
    .replace(/\bosbr\b/g, "work")
    // Private/Tailscale IPs, also when colour codes sit between the octets (btop).
    // Public IPs and 4-part version numbers (1.2.707.0) are left alone.
    .replace(/(?<![\d.])\d{1,3}(?:(?:\x1b\[[0-9;]*m)*\.(?:\x1b\[[0-9;]*m)*\d{1,3}){3}(?![\d.])/g, (m) => (isPrivateIp(m.replace(/\x1b\[[0-9;]*m/g, "")) ? "x.x.x.x" : m));
}

function captureCli(cmd) {
  const r = spawnSync("script", ["-q", "/dev/null", "bash", "-c", cmd], {
    cwd: demoDir, env, encoding: "utf8", timeout: 30_000,
    stdio: ["ignore", "pipe", "pipe"],
  });
  return (r.stdout || "") + (r.stderr || "");
}

function captureTui(cmd, keys = []) {
  const tmux = (...args) => spawnSync("tmux", ["-L", "ghostty-capture", "-f", "/dev/null", ...args], {
    cwd: demoDir, env, encoding: "utf8",
  });
  tmux("kill-server");
  tmux("new-session", "-d", "-s", "cap", "-x", String(COLS), "-y", String(ROWS), "-c", demoDir, cmd);
  tmux("set", "-g", "status", "off");
  execFileSync("sleep", [String(TUI_SETTLE_MS / 1000)]);
  if (keys.length) {
    for (const k of keys) tmux("send-keys", "-t", "cap", k);
    execFileSync("sleep", ["1.5"]);
  }
  const shot = tmux("capture-pane", "-e", "-p", "-t", "cap").stdout;
  tmux("kill-server");
  spawnSync("tmux", ["-L", "ghostty-demo", "kill-server"]); // the tmux demo's own server
  return shot;
}

// Last line of defence: anything that still looks like a local path or this
// machine's name — even wrapped across lines by a TUI — blocks the write.
function leaks(text) {
  const flat = text.replace(/\x1b\[[0-9;]*m/g, "").replace(/[\n│┃|]/g, "").replace(/\s+/g, "");
  return ["/Users/", "/var/folders", "/private/var", host.slice(0, 12)].filter((s) => flat.includes(s.replace(/\s+/g, "")));
}

const only = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
let failed = 0;

for (const t of tools) {
  if (!t.demo || !t.mode) continue;
  if (only.length && !only.includes(t.id)) continue;
  const raw = t.mode === "tui" ? captureTui(t.run ?? t.demo, t.keys) : captureCli(t.run ?? t.demo);
  if (t.cleanup) spawnSync("bash", ["-c", t.cleanup], { cwd: demoDir, env, stdio: "ignore" });
  const text = redact(raw).replace(/\s+$/, "") + "\n";
  const found = leaks(text);
  if (found.length) {
    console.error(`✗   ${t.id.padEnd(30)} not saved — output contains ${found.join(", ")}`);
    failed++;
    continue;
  }
  writeFileSync(join(outDir, `${t.id}.ansi`), text);
  const lines = text.split("\n").length;
  console.log(`${t.mode.padEnd(3)} ${t.id.padEnd(30)} ${lines} lines`);
}

if (failed) process.exit(1);
