import { cva } from "class-variance-authority"

export const tagVariants = cva("tag", {
  variants: {
    kind: {
      ai: "tag-ai",
      ui: "tag-ui",
      lang: "tag-lang",
      ed: "tag-ed",
      shell: "tag-shell",
      cask: "tag-cask",
      active: "tag-active",
      avail: "tag-avail",
    },
  },
  defaultVariants: {
    kind: "avail",
  },
})
