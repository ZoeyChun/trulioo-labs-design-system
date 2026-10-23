# TruAI panel lab

Standalone Demo 3 page for comparing TruAI panel treatments. Live Meridian KYB
chat stays on the left; the right rail picks a look for each step.

## Open

- **Local:** `python3 -m http.server 8765` →  
  http://127.0.0.1:8765/portal-2.0/demo-3/ai-panel-lab/
- **GitHub Pages:**  
  https://zoeychun.github.io/trulioo-labs-design-system/portal-2.0/demo-3/ai-panel-lab/

## Layout

| Side | Contents |
|------|----------|
| **Left** | Live TruAI panel — same default size as demo-3 (`478px` / `--d3-chat-pane-w`). Resize edge, header expand (full canvas), and minimize (askbar) all work. |
| **Right** | Variation picker: Landing (large orb / floating orb), Verify business (orb: floating or header; business select: cards or city selector), Investigating (dots / loading bar), Report (clickable cards / list). |
| *(hidden)* | KYB map/report stubs off-layout for agent init. |

## How to move through the steps

Use **Go to this step** to open a step. Option chips only change the selected treatment — they do not navigate. **Restart** clears the chat and returns to landing; picker selections stay as they are.

1. **Landing** — large orb or floating orb. **Large orb** hides the title/status header (expand + close stay). **Floating orb** also stays on for verify and investigating.
2. **Verify business** — **Orb** (floating or header) and **Business select** (cards or city selector). Typing `verify meridian` still starts the live country question. User messages use the mint prompt bubble.
3. **Investigating** — **Dots** blinks through the same lines as the loading bar, then hides when the check finishes. **Loading bar** keeps the progress checklist. Choosing a business in the match list also starts it.
4. **Report** — report-ready card (business row + View), then **Clickable cards** or **List** for “Continue your investigation”. The header back chevron returns from report to investigating, from investigating to the confirm card, and from verify to the landing.

## Panel controls (same as portal)

1. **Resize** — drag the panel’s right edge (width saved in `sessionStorage`)
2. **Full canvas** — expand icon in the header (hides the overview); Esc or same icon to exit
3. **Minimize** — X collapses to the floating askbar; click askbar to reopen

## Sync caveat

`data-d1-tpl` blocks in `index.html` are copied from `../index.html`.  
Refresh via `_templates.fragment.html` when portal templates change.
