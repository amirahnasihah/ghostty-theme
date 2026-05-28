import { readFileSync, writeFileSync } from "node:fs"

const html = readFileSync("index.html", "utf8")
const bodyMatch = html.match(/<body>\s*([\s\S]*?)\s*<script>/)
if (!bodyMatch) throw new Error("Could not find body content")

let template = bodyMatch[1]
  .replace(/onclick="toggleMenu\(\)"/g, '@click="toggleMenu()"')
  .replace(
    /onclick="show\('([^']+)',this\)"/g,
    'data-section="$1" @click="show(\'$1\', $event.currentTarget)"',
  )
  .replace(
    /oninput="filterPlugins\(this\.value\)"/g,
    ':value="pluginQuery" @input="onPluginInput(($event.target as HTMLInputElement).value)"',
  )
  .replace(
    /oninput="filterExt\(this\.value\)"/g,
    ':value="extQuery" @input="onExtInput(($event.target as HTMLInputElement).value)"',
  )
  .replace(/src="images\//g, 'src="/images/')
  .replace(/<img([^>]*)(?<!\/)>/g, "<img$1 />")
  .replace(/<hr class="sp-divider">/g, '<hr class="sp-divider" />')

const vue = `<script setup lang="ts">
import { onMounted } from "vue"
import { useTerminalGuide } from "~/composables/useTerminalGuide"

const {
  pluginQuery,
  extQuery,
  toggleMenu,
  show,
  onPluginInput,
  onExtInput,
  restoreSection,
} = useTerminalGuide()

onMounted(() => {
  restoreSection()
})
</script>

<template>
${template}
</template>
`

writeFileSync("app/pages/index.vue", vue)
console.log("Wrote app/pages/index.vue")
