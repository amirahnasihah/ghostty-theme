import type { Config } from "tailwindcss"

export default {
  content: [
    "./app/components/**/*.{vue,js,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        "term-bg": "#001a22",
        "term-bg2": "#001f28",
        "term-bg3": "#003540",
        "term-bg4": "#005c57",
        "term-teal": "#007972",
        "term-green": "#b4fa72",
        "term-blue": "#a5d5fe",
        "term-red": "#ff8272",
        "term-yellow": "#fefdc2",
        "term-purple": "#ff8ffd",
        "term-fg": "#e3e5e5",
        "term-fg-dim": "#8e8e8e",
      },
    },
  },
} satisfies Config
