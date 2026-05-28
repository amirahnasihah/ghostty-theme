import { ref } from "vue"

const STORAGE_KEY = "tc-section"

export const useTerminalGuide = () => {
  const pluginQuery = ref("")
  const extQuery = ref("")

  const toggleMenu = () => {
    if (!import.meta.client) return
    document.querySelector(".sidebar")?.classList.toggle("open")
    document.querySelector(".sidebar-overlay")?.classList.toggle("open")
  }

  const show = (id: string, el: EventTarget | null) => {
    if (!import.meta.client || !(el instanceof HTMLElement)) return
    document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"))
    document.querySelectorAll(".nav-item").forEach((n) => n.classList.remove("active"))
    document.getElementById(`section-${id}`)?.classList.add("active")
    el.classList.add("active")
    document.querySelector(".sidebar")?.classList.remove("open")
    document.querySelector(".sidebar-overlay")?.classList.remove("open")
    localStorage.setItem(STORAGE_KEY, id)
  }

  const restoreSection = () => {
    if (!import.meta.client) return
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return
    const sec = document.getElementById(`section-${saved}`)
    const nav = document.querySelector(`.nav-item[data-section="${saved}"]`)
    if (!sec || !nav) return
    document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"))
    document.querySelectorAll(".nav-item").forEach((n) => n.classList.remove("active"))
    sec.classList.add("active")
    nav.classList.add("active")
  }

  const filterPlugins = (q: string) => {
    if (!import.meta.client) return
    const query = q.toLowerCase()
    document.querySelectorAll(".plugin-cards .card").forEach((card) => {
      const text = `${(card as HTMLElement).dataset.tags ?? ""} ${card.textContent?.toLowerCase() ?? ""}`
      ;(card as HTMLElement).style.display = text.includes(query) ? "" : "none"
    })
    document.querySelectorAll("#section-nvim h3").forEach((h3) => {
      const cards = h3.nextElementSibling
      if (!cards?.classList.contains("plugin-cards")) return
      const visible = [...cards.querySelectorAll(".card")].some(
        (c) => (c as HTMLElement).style.display !== "none",
      )
      ;(h3 as HTMLElement).style.display = visible ? "" : "none"
      ;(cards as HTMLElement).style.display = visible ? "" : "none"
    })
  }

  const filterExt = (q: string) => {
    if (!import.meta.client) return
    const query = q.toLowerCase()
    document.querySelectorAll(".ext-table tbody tr").forEach((row) => {
      const text = `${(row as HTMLElement).dataset.ext ?? ""} ${row.textContent?.toLowerCase() ?? ""}`
      ;(row as HTMLElement).style.display = text.includes(query) ? "" : "none"
    })
    document.querySelectorAll(".ext-section").forEach((sec) => {
      const rows = [...sec.querySelectorAll("tbody tr")]
      const anyVisible = rows.some((r) => (r as HTMLElement).style.display !== "none")
      ;(sec as HTMLElement).style.display = anyVisible ? "" : "none"
    })
  }

  const onPluginInput = (value: string) => {
    pluginQuery.value = value
    filterPlugins(value)
  }

  const onExtInput = (value: string) => {
    extQuery.value = value
    filterExt(value)
  }

  const setupNavA11y = () => {
    if (!import.meta.client) return
    document.querySelectorAll<HTMLElement>(".nav-item[data-section]").forEach((item) => {
      item.tabIndex = 0
      item.setAttribute("role", "button")
      item.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return
        event.preventDefault()
        const id = item.dataset.section
        if (id) show(id, item)
      })
    })
    const menuBtn = document.querySelector<HTMLButtonElement>(".hamburger")
    if (menuBtn) menuBtn.setAttribute("aria-label", "Toggle navigation menu")
  }

  return {
    pluginQuery,
    extQuery,
    toggleMenu,
    show,
    onPluginInput,
    onExtInput,
    restoreSection,
    setupNavA11y,
  }
}
