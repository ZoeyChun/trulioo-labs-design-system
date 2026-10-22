# TruAI panel lab

Standalone Demo 3 page for experimenting with AI panel UI. Live Meridian KYB
chat stays interactive on the left; a component overview fills the right.

## Open

- **Local:** `python3 -m http.server 8765` →  
  http://127.0.0.1:8765/portal-2.0/demo-3/ai-panel-lab/
- **GitHub Pages:**  
  https://zoeychun.github.io/trulioo-labs-design-system/portal-2.0/demo-3/ai-panel-lab/

## Layout

| Side | Contents |
|------|----------|
| **Left** | Live TruAI panel — same default size as demo-3 (`478px` / `--d3-chat-pane-w`). Resize edge, header expand (full canvas), and minimize (askbar) all work. |
| **Right** | Component overview grid (header, cards, composer, messages, progress, report, …). Display-only specimens. |
| *(hidden)* | KYB map/report stubs off-layout for agent init. |

## Panel controls (same as portal)

1. **Resize** — drag the panel’s right edge (width saved in `sessionStorage`)
2. **Full canvas** — expand icon in the header (hides the overview); Esc or same icon to exit
3. **Minimize** — X collapses to the floating askbar; click askbar to reopen

## Gallery specimens

Built by `lab-boot.js` from `D3AiPanel.parts.*` + `data-d1-tpl` clones (shell
`data-*` attrs stripped so they cannot steal live-panel bindings).

Editing `../components/ai-panel/parts/*` updates both the live panel and the overview.

## Sync caveat

`data-d1-tpl` blocks in `index.html` are copied from `../index.html`.  
Refresh via `_templates.fragment.html` when portal templates change.
