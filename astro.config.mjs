// @ts-check
import { defineConfig } from "astro/config";

// Served from GitHub Pages as a project site: amirahnasihah.github.io/ghostty-theme/
export default defineConfig({
  site: "https://amirahnasihah.github.io",
  base: "/ghostty-theme/",
  trailingSlash: "ignore",
});
