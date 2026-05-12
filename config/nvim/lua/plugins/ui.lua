return {
  {
    "LazyVim/LazyVim",
    opts = function()
      -- Insert mode navigation + delete (VSCode-style)
      local map = vim.keymap.set
      map("i", "<C-a>", "<C-o>^",  { desc = "Start of line" })
      map("i", "<C-e>", "<End>",   { desc = "End of line" })
      map("i", "<C-d>", "<C-o>dw", { desc = "Delete word forward" })
      map("i", "<M-BS>", "<C-w>",  { desc = "Delete word backward" })
      map("i", "<C-k>", "<C-o>D",  { desc = "Delete to end of line" })

      -- Autosave on focus lost / buffer leave (like VSCode)
      vim.api.nvim_create_autocmd({ "FocusLost", "BufLeave", "WinLeave" }, {
        callback = function()
          if vim.bo.modified and vim.bo.buftype == "" and vim.fn.expand("%") ~= "" then
            vim.cmd("silent! write")
          end
        end,
      })

      -- VSCode-style diagnostic signs
      vim.diagnostic.config({
        signs = {
          text = {
            [vim.diagnostic.severity.ERROR] = "",
            [vim.diagnostic.severity.WARN]  = "",
            [vim.diagnostic.severity.HINT]  = "",
            [vim.diagnostic.severity.INFO]  = "",
          },
        },
        virtual_text = {
          prefix = "",
          spacing = 2,
        },
        underline = true,
        update_in_insert = false,
        severity_sort = true,
        float = {
          border = "rounded",
          source = true,
        },
      })

      local function clear_neotree_bg()
        vim.schedule(function()
          local groups = {
            "NeoTreeNormal", "NeoTreeNormalNC", "NeoTreeEndOfBuffer",
            "NeoTreeWinSeparator", "NeoTreeStatusLine", "NeoTreeStatusLineNC",
            "NeoTreeCursorLine", "NeoTreeFloatBorder", "NeoTreeTitleBar",
            "NeoTreeDimText", "NeoTreeRootName",
          }
          for _, g in ipairs(groups) do
            vim.api.nvim_set_hl(0, g, { bg = "NONE", ctermbg = "NONE" })
          end
        end)
      end

      vim.api.nvim_create_autocmd("ColorScheme", { callback = clear_neotree_bg })
      vim.api.nvim_create_autocmd("FileType", { pattern = "neo-tree", callback = clear_neotree_bg })

      vim.api.nvim_create_autocmd("ColorScheme", {
        callback = function()
          -- Inlay hints (dim, like VSCode)
          vim.api.nvim_set_hl(0, "LspInlayHint", { fg = "#444b6a", italic = true })


          -- Diagnostic sign column highlights (VSCode colors)
          vim.api.nvim_set_hl(0, "DiagnosticSignError",   { fg = "#f44747" })
          vim.api.nvim_set_hl(0, "DiagnosticSignWarn",    { fg = "#ff8800" })
          vim.api.nvim_set_hl(0, "DiagnosticSignHint",    { fg = "#4fc1ff" })
          vim.api.nvim_set_hl(0, "DiagnosticSignInfo",    { fg = "#75beff" })

          -- Diagnostic virtual text
          vim.api.nvim_set_hl(0, "DiagnosticVirtualTextError", { fg = "#f44747", italic = true })
          vim.api.nvim_set_hl(0, "DiagnosticVirtualTextWarn",  { fg = "#ff8800", italic = true })
          vim.api.nvim_set_hl(0, "DiagnosticVirtualTextHint",  { fg = "#4fc1ff", italic = true })
          vim.api.nvim_set_hl(0, "DiagnosticVirtualTextInfo",  { fg = "#75beff", italic = true })

          -- Diagnostic underline
          vim.api.nvim_set_hl(0, "DiagnosticUnderlineError", { undercurl = true, sp = "#f44747" })
          vim.api.nvim_set_hl(0, "DiagnosticUnderlineWarn",  { undercurl = true, sp = "#ff8800" })
          vim.api.nvim_set_hl(0, "DiagnosticUnderlineHint",  { undercurl = true, sp = "#4fc1ff" })
        end,
      })
    end,
  },

  -- Git gutter signs (VSCode-style)
  {
    "lewis6991/gitsigns.nvim",
    opts = {
      signs = {
        add          = { text = "▎" },
        change       = { text = "▎" },
        delete       = { text = "" },
        topdelete    = { text = "" },
        changedelete = { text = "▎" },
        untracked    = { text = "▎" },
      },
      signs_staged = {
        add          = { text = "▎" },
        change       = { text = "▎" },
        delete       = { text = "" },
        topdelete    = { text = "" },
        changedelete = { text = "▎" },
      },
      current_line_blame = true,
      current_line_blame_opts = {
        delay = 500,
        virt_text_pos = "eol",
      },
      current_line_blame_formatter = function(name, info, _)
        local function ago(ts)
          local diff = os.time() - ts
          if diff < 60        then return "just now"
          elseif diff < 3600  then return math.floor(diff / 60)   .. "m ago"
          elseif diff < 86400 then return math.floor(diff / 3600) .. "h ago"
          elseif diff < 604800 then return math.floor(diff / 86400) .. "d ago"
          elseif diff < 2592000 then return math.floor(diff / 604800) .. "w ago"
          else return math.floor(diff / 2592000) .. "mo ago"
          end
        end
        local author = info.author == "Not Committed Yet" and "You" or info.author
        return {
          { ("  %s  %s  %s  %s"):format(info.abbrev_sha, author, ago(info.author_time), info.summary), "GitSignsCurrentLineBlame" },
        }
      end,
      on_attach = function(buf)
        local gs = package.loaded.gitsigns
        local map = function(mode, lhs, rhs, desc)
          vim.keymap.set(mode, lhs, rhs, { buffer = buf, desc = desc })
        end
        map("n", "]h", gs.next_hunk, "Next Hunk")
        map("n", "[h", gs.prev_hunk, "Prev Hunk")
        map("n", "<leader>gb", gs.toggle_current_line_blame, "Toggle Git Blame")
      end,
    },
  },
}
