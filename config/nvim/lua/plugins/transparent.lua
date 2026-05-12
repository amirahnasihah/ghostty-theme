return {
  "xiyaowong/transparent.nvim",
  opts = {
    extra_groups = {
      "NeoTreeNormal", "NeoTreeNormalNC", "NeoTreeEndOfBuffer",
      "NeoTreeVertSplit", "NeoTreeWinSeparator",
      "NeoTreeStatusLine", "NeoTreeStatusLineNC",
    },
  },
  config = function(_, opts)
    require("transparent").setup(opts)
    require("transparent").clear_prefix("NeoTree")
    vim.g.transparent_enabled = true

    local function fix_transparency()
      vim.schedule(function()
        -- Neo-tree sidebar
        local neotree = {
          "NeoTreeNormal", "NeoTreeNormalNC", "NeoTreeEndOfBuffer",
          "NeoTreeWinSeparator", "NeoTreeStatusLine", "NeoTreeStatusLineNC",
          "NeoTreeCursorLine", "NeoTreeFloatBorder", "NeoTreeTitleBar",
          "NeoTreeDimText",
        }
        for _, g in ipairs(neotree) do
          vim.cmd("highlight " .. g .. " guibg=NONE ctermbg=NONE")
        end

      end)
    end

    vim.api.nvim_create_autocmd("ColorScheme", { callback = fix_transparency })
    vim.api.nvim_create_autocmd("FileType", { pattern = "neo-tree", callback = fix_transparency })
    fix_transparency()
  end,
}
