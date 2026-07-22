# Unified Intelligence Home (Experimental)

Experimental Trulioo Home prototype for the Unified Intelligence experience and the **Start assessment → KYB Results** flow.

This page lives alongside the existing [`KYB Results`](../KYB%20Results/) page in the design system repo. It is not wired into production navigation yet.

## Run locally

From the **design system repo root**:

```bash
python3 -m http.server 8765
```

Then open:

- Home: [http://localhost:8765/pages/unified-intelligence-home/](http://localhost:8765/pages/unified-intelligence-home/)
- KYB Results: [http://localhost:8765/pages/KYB%20Results/index.html](http://localhost:8765/pages/KYB%20Results/index.html)

Use **Start assessment** on the home plan screen to navigate to KYB Results with the selected entity. The Home nav on KYB Results returns here.

## Notes

- Self-contained assets (`css/`, `js/`, `fonts/`, `assets/`) — no bundled design-system copy required.
- KYB Results entity hydration and Home navigation live in `../KYB Results/kyb-results.js`.
