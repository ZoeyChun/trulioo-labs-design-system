# Unified Intelligence Home (Experimental)

Labs catalog and related product previews for the Unified Intelligence experience.

## One Home story

| Surface | URL | Role |
|--------|-----|------|
| **Portal Home** | `portal-2.0/demo-3/index.html` (`data-d3-view="home"`) | Canonical returning-customer home (composer + briefing). Rail **Home** goes here. |
| **Labs catalog** | `labs.html` | Product catalog (filters + cards). Experimental sidenav treats this as **Home**. Portal **Labs** embeds `labs.html?embed=1`. |
| **Marketing index** | `index.html` | Standalone marketing / assessment entry. Also counts as Home in experimental sidenav. |

Do not call the old Agent hub “Home”. Agent hub is retired; Labs + TruAI prompts are the product entry from the Portal rail.

## Run locally

From the **design system repo root**:

```bash
python3 -m http.server 8765
```

Then open:

- Labs catalog: [http://localhost:8765/pages/unified-intelligence-home/labs.html](http://localhost:8765/pages/unified-intelligence-home/labs.html)
- Marketing index: [http://localhost:8765/pages/unified-intelligence-home/](http://localhost:8765/pages/unified-intelligence-home/)
- Portal Demo 3: [http://localhost:8765/portal-2.0/demo-3/](http://localhost:8765/portal-2.0/demo-3/)

## Share

- Labs: https://zoeychun.github.io/trulioo-labs-design-system/pages/unified-intelligence-home/labs.html
- Portal Demo 3: https://zoeychun.github.io/trulioo-labs-design-system/portal-2.0/demo-3/

## Notes

- Self-contained assets (`css/`, `js/`, `fonts/`, `assets/`) — no bundled design-system copy required.
- Static Labs cards without a URL or `portalAction` render as **Coming soon**.
- KYB Verification from Labs posts `d3-labs-open` into Portal Demo 3 when embedded.
