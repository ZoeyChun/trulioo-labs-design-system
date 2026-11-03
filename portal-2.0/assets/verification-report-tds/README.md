# Verification Module — TDS forks

Sandbox copies of Verification Module **V2** (stacked cards) and **V3** (editorial board) wired to Trulioo Design System components and tokens.

Original baselines stay untouched under:

- `portal-2.0/assets/verification-report-v2/`
- `portal-2.0/assets/verification-report-v3/`
- `portal-2.0/assets/verification-report-v4/`

## Open locally

- V2 TDS: [`v2/index.html`](v2/index.html)
- V3 TDS: [`v3/index.html`](v3/index.html)

Serve from the repo root (or open the HTML files directly). Relative links reach `tokens/`, `Components/`, Demo shell CSS, and V1 KYB sample data under `verification-report/`.

## What changed vs baselines

Custom pills, badges, chips, status labels, and metric/field pairs use TDS classes (`tds-btn`, `tds-tag`, `tds-data-field`, `tds-segmented-control`, `tds-ai-tag`) instead of version-local control styles. Layout IA for each version is preserved (V2 stack + expand; V3 board grid).
