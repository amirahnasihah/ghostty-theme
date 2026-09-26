// Joins the hand-written tool list with Homebrew metadata and the captured
// terminal output, so components get one complete record per tool.
import { AnsiUp } from "ansi_up";
import brew from "../data/brew.json";
import { groups, tools as rawTools } from "../data/tools.mjs";

const outputs = import.meta.glob("/output/*.ansi", { query: "?raw", import: "default", eager: true });

const ansi = new AnsiUp();
ansi.use_classes = true; // base 16 colours → .ansi-*-fg classes themed with the Ghostty palette

const brewById = Object.fromEntries(brew.map((b) => [b.id, b]));

function installCommand(t, b) {
  if (t.install) return t.install;
  if (!b) return null;
  return b.type === "cask" ? `brew install --cask ${t.id}` : `brew install ${t.id}`;
}

export const tools = rawTools.map((t) => {
  const b = brewById[t.id];
  const raw = outputs[`/output/${t.id}.ansi`];
  return {
    ...t,
    name: t.name ?? t.id,
    url: t.url ?? b?.url,
    desc: t.desc ?? b?.desc ?? "",
    type: t.type ?? b?.type ?? "formula",
    install: installCommand(t, b),
    outputHtml: raw ? ansi.ansi_to_html(raw) : null,
  };
});

export const toolById = Object.fromEntries(tools.map((t) => [t.id, t]));

export const toolsByGroup = groups.map((g) => ({ ...g, tools: tools.filter((t) => t.group === g.id) }));
