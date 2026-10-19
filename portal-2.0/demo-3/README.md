# Portal 2.0 — Demo 3

Returning-customer journey with redesigned sidebar and left-aligned TruAI chat.

Figma: [Demo 3](https://www.figma.com/design/qtvqgc1fWEw0znhl4b8xPF/Portal-2.0-Design---2026?node-id=1274-15402)

## Run

From repo root (`trulioo-labs-ds`):

```bash
python3 -m http.server 8765
```

**Start here:** [demo-3/sign-in/index.html](https://zoeychun.github.io/trulioo-labs-design-system/portal-2.0/demo-3/sign-in/index.html)  
Local: http://127.0.0.1:8765/portal-2.0/demo-3/sign-in/index.html  

Unsigned visits to `demo-3/` or `demo-3/index.html` redirect to `sign-in/index.html`.

## Auth file map

```
demo-3/
  sign-in/              # Sign-in UI only
    index.html
    sign-in.js
    sign-in.css
    assets/
  js/
    auth-gate.js        # Session gate + post-login loader
  css/
    loader.css          # Loader + shell reveal
  index.html            # Portal (links auth-gate + loader)
```

Session keys: `d3-signed-in`, `d3-from-signin` (Demo 3 only). Demo 1 keeps its own `d1-signed-in`.

## Flow

1. **Sign in** — `sign-in/index.html`
2. **Loading** — returning-customer lines after a fresh sign-in
3. **Portal Home** — Welcome back + composer + briefing cards (`data-d3-view="home"`)
4. **Sidebar** — Home · KYB Verification · Transactions · Labs · Dev Dashboard · Chats · Settings · Account
5. **Left chat** — TruAI panel for KYB / TX / KYC (Labs + Org Admin are workspace-only); close collapses to the floating ask bar

### Home story (one canonical map)

| Label | Where | Notes |
|-------|--------|--------|
| Portal Home | This shell, Home rail | Returning-customer composer |
| Labs | Labs rail → `labs.html?embed=1` | Catalog; not “Agent hub” |
| Labs catalog Home | `pages/…/labs.html` sidenav | Experimental nav only |

Agent hub is retired. KYB is a top-level rail item (crumbs: **KYB Verification [/ entity]**).

### Drawer motion

Transactions entity drawer **snaps** open/close (0ms). Other views keep the 420ms shell tween.

## Notes

Built as a fork of Demo 1 under `demo-3/`. Demo 1’s `sign-in/` is separate and unchanged.
