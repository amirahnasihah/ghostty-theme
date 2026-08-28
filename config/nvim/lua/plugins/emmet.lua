return {
  "mattn/emmet-vim",
  ft = { "html", "css", "vue", "jsx", "tsx", "svelte", "astro" },
  init = function()
    vim.g.user_emmet_leader_key = "<C-y>"
  end,
}
