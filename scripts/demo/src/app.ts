// Tiny demo file used for the terminal output captures on the site.
type Theme = { name: string; bg: string; accent: string };

const cyberWave: Theme = { name: "Cyber Wave", bg: "#001a22", accent: "#007972" };

export function greet(theme: Theme): string {
  // TODO: support light themes
  return `ghostty ✦ ${theme.name} (${theme.accent})`;
}

console.log(greet(cyberWave));
