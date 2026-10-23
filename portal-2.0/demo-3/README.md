# Portal 2.0 — Demo 3

Returning-customer journey with redesigned sidebar and left-aligned TruAI chat.

Figma: [Demo 3](https://www.figma.com/design/qtvqgc1fWEw0znhl4b8xPF/Portal-2.0-Design---2026?node-id=1274-15402)

## Run

From repo root (`trulioo-labs-ds`):

```bash
python3 -m http.server 8765
```

**Start here (always show sign-in):** [demo-3/sign-in/?fresh=1](https://zoeychun.github.io/trulioo-labs-design-system/portal-2.0/demo-3/sign-in/index.html?fresh=1)  
Local: http://127.0.0.1:8765/portal-2.0/demo-3/sign-in/index.html?fresh=1  

Without `?fresh=1`, an existing `d3-signed-in` session skips straight to the portal.  
Unsigned visits to `demo-3/` or `demo-3/index.html` redirect to `sign-in/index.html`.

## TruAI panel lab

Isolated AI panel for UI experiments (no full portal shell, **no sign-in**).
Meridian KYB conversation (verify → progress → results) still runs in the panel.

| | URL |
|--|--|
| GitHub Pages | [demo-3/ai-panel-lab/](https://zoeychun.github.io/trulioo-labs-design-system/portal-2.0/demo-3/ai-panel-lab/) |
| Local | http://127.0.0.1:8765/portal-2.0/demo-3/ai-panel-lab/ |

`data-d1-tpl` message templates are copied into `ai-panel-lab/index.html` from the portal — keep them in sync when portal templates change.

## KYB workspace canvas

Fork reduced to **KYB Verification only**, re-cast as a two-column workspace:
TruAI docked on the left, a `surface-neutral-02` dot canvas on the right with
the content on a centred 600px white sheet. Opens straight on KYB Verification;
Home, Transactions, Labs and Chats are gone from its rail. The landing and
waiting-for-country are done, each with a lab panel of design options; the map
and report surfaces render but haven't had a design pass. No sign-in.

| | URL |
|--|--|
| GitHub Pages | [demo-3/kyb-workspace/](https://zoeychun.github.io/trulioo-labs-design-system/portal-2.0/demo-3/kyb-workspace/) |
| Local | http://127.0.0.1:8765/portal-2.0/demo-3/kyb-workspace/index.html |

See [`kyb-workspace/README.md`](kyb-workspace/README.md). It shares `css/` and
`js/` with this page via `<base href="../">` — nothing was duplicated, so portal
changes land there too.

## Auth file map

```
demo-3/
  sign-in/              # Sign-in UI only
    index.html
    sign-in.js
    sign-in.css
    assets/
  components/
    ai-panel/           # TruAI chat chrome (mount + CSS + prompts)
  ai-panel-lab/         # Standalone panel lab (no auth)
  js/
    auth-gate.js        # Session gate + post-login loader
  css/
    loader.css          # Loader + shell reveal
  index.html            # Portal shell (mounts ai-panel)
```

Session keys: `d3-signed-in`, `d3-from-signin` (Demo 3 only). Demo 1 keeps its own `d1-signed-in`.

## Flow

1. **Sign in** — `sign-in/index.html`
2. **Loading** — returning-customer lines after a fresh sign-in
3. **Portal Home** — Welcome back + composer + briefing cards (`data-d3-view="home"`); default look is Home 4 (globe)
4. **Sidebar** — Home · KYB Verification · Transactions · Labs · Dev Dashboard · Chats · Settings · Account
5. **Left chat** — TruAI panel for KYB / TX / KYC (Labs + Org Admin are workspace-only); close collapses to the floating ask bar

### Home story (one canonical map)

| Label | Where | Notes |
|-------|--------|--------|
| Home 1 (dark) | [`home-1/`](home-1/) or `?home=1` (`dark` alias) | Figma `1609:50255` |
| Home 2 (light) | [`home-2/`](home-2/) or `?home=2` (`light` alias) | Prior light orb + teal dots experiment |
| Home 3 (full-bleed) | [`home-3/`](home-3/) or `?home=3` | Figma `1626:93274` — edge-to-edge hero |
| **Home 4 (globe) — main** | [`home-4/`](home-4/) or `?home=4`, or no param | Rotating dot globe, composer at its centre. Default home; change `DEFAULT_HOME` in `js/d3-home-skin.js`. |
| Home 5 (globe at side) | [`home-5/`](home-5/) or `?home=5` | Figma `1626:93274` (updated) — gradient hero, copy left, composer right |
| Labs | Labs rail → `labs.html?embed=1` | Catalog; not “Agent hub” |
| Labs catalog Home | `pages/…/labs.html` sidenav | Experimental nav only |

Add the next option as `home-6/` + `?home=6` (register it in `LAYOUTS` in `js/d3-home-skin.js` if it needs CSS/JS).

Agent hub is retired. KYB is a top-level rail item (crumbs: **KYB Verification [/ entity]**).

### Drawer motion

Transactions entity drawer **snaps** open/close (0ms). Other views keep the 420ms shell tween.

## Notes

Built as a fork of Demo 1 under `demo-3/`. Demo 1’s `sign-in/` is separate and unchanged.
