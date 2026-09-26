// Writes the real fastfetch config minus `localip` (the LAN IP would be baked
// into the screenshot pixels, where redaction can't reach it). Logo points at
// the repo's ascii.txt so the shot matches the published config.
import { readFileSync, writeFileSync } from "node:fs";

const [, , src, dest, ascii] = process.argv;
const cfg = JSON.parse(readFileSync(src, "utf8"));
cfg.modules = cfg.modules.filter((m) => (m.type ?? m) !== "localip");
cfg.logo.source = ascii;
writeFileSync(dest, JSON.stringify(cfg, null, 2));
