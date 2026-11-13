# KYB Report module (standalone)

Self-contained verification report for **any portal-2.0 demo**. It does **not** need the Demo 3 shell, chat, map, or nav.

## Preview

- Default: [http://127.0.0.1:8765/portal-2.0/modules/kyb-report/?version=default](http://127.0.0.1:8765/portal-2.0/modules/kyb-report/?version=default)
- MVP: [http://127.0.0.1:8765/portal-2.0/modules/kyb-report/?version=mvp](http://127.0.0.1:8765/portal-2.0/modules/kyb-report/?version=mvp)

Use the **Version** switcher in the preview header.

## Named versions

Not `v1` / `v2` — use labels in [`js/versions.js`](js/versions.js):

| Version | BRH | Notes |
|---------|-----|--------|
| `default` | on | Full baseline report (includes Trulioo Sources on Match Signals) |
| `mvp-brh` | on | MVP lane with BRH on; no Trulioo Sources; Owners & UBOs table-first; custom ownership network |
| `mvp-no-brh` | off | Same MVP features; Risk Analysis tab hidden; Overview shows flat Verified + Ownership bullets |

`mvp` still resolves to `mvp-brh` for backwards compatibility.

```js
KybReportModule.mount(host, { version: "mvp-brh" });
KybReportModule.mount(host, { version: "mvp-no-brh" });
KybReportModule.versions();
// [{ id: "default", label: "Default" }, { id: "mvp-brh", label: "MVP BRH" }, { id: "mvp-no-brh", label: "MVP No BRH" }]
```

To add another name, copy an entry in `js/versions.js` and change `tabs` / `features`.

## What it depends on

| Dependency | Required? | Notes |
|------------|-----------|--------|
| TDS `tokens/` + `Components/` | Yes | Via `css/tds-deps.css` + score-gauge / dialog / dropdown-panel JS |
| Demo 3 shell / workspace / chat | **No** | |
| Network | No | Static HTML/CSS/JS |

Vendored copies of the Demo 3 report panels live under `vendor/` (synced, not live-linked). Layout chrome uses TDS tokens only (`css/chrome.css`).

### TDS components used

Button, Icon button, Tag, Score gauge, Data field, Data table, Accordion, Filter tab, AI tag, Counter label, Dialog, Announcement, Segmented control, Checkbox, Action list item, Filter button, Caret, Dropdown panel.

## Embed in any demo

From a page under `portal-2.0/demo-X/` (one level deep):

```html
<link rel="stylesheet" href="../modules/kyb-report/css/tds-deps.css">
<link rel="stylesheet" href="../modules/kyb-report/css/chrome.css">
<link rel="stylesheet" href="../modules/kyb-report/vendor/css/d3-kyb-findings.css">
<link rel="stylesheet" href="../modules/kyb-report/vendor/css/d3-kyb-report-panels.css">
<link rel="stylesheet" href="../modules/kyb-report/vendor/css/d3-kyb-result-tabs.css">
<link rel="stylesheet" href="../modules/kyb-report/vendor/css/d3-kyb-ubo-graph.css">
<link rel="stylesheet" href="../modules/kyb-report/vendor/ubo-graph-dist/kyb-ubo-graph-react.css">
<link rel="stylesheet" href="../modules/kyb-report/vendor/css/d3-kyb-raw-dialog.css">

<div id="report"></div>

<script src="../../Components/score-gauge/score-gauge.js"></script>
<script src="../../Components/dialog/dialog.js"></script>
<script src="../../Components/_shared/dropdown-panel/dropdown-panel.js"></script>
<script src="../modules/kyb-report/vendor/ubo-graph-dist/ubo-graph.bundle.js"></script>
<script src="../modules/kyb-report/vendor/js/d3-kyb-ubo-graph.js"></script>
<script src="../modules/kyb-report/vendor/js/d3-kyb-report-panels-data.js"></script>
<script src="../modules/kyb-report/vendor/js/d3-kyb-report-panels.js"></script>
<script src="../modules/kyb-report/vendor/js/d3-kyb-result-tabs.js"></script>
<script src="../modules/kyb-report/vendor/js/dialogs-markup.js"></script>
<script src="../modules/kyb-report/js/versions.js"></script>
<script src="../modules/kyb-report/js/mvp-ownership-graph.js"></script>
<script src="../modules/kyb-report/js/data.js"></script>
<script src="../modules/kyb-report/js/dialogs.js"></script>
<script src="../modules/kyb-report/js/raw.js"></script>
<script src="../modules/kyb-report/js/overview-enhance.js"></script>
<script src="../modules/kyb-report/js/shell.js"></script>
<script src="../modules/kyb-report/js/mount.js"></script>
<script>
  KybReportModule.mount(document.getElementById("report"), { version: "mvp-brh" });
</script>
```

Adjust `../` depth if the host page is nested differently.

## Tab modules (edit here / sync from Demo 3)

| Tab | Source |
|-----|--------|
| Overview | `js/overview-enhance.js` + vendored `vendor/js/d3-kyb-report-panels*.js` |
| Risk Analysis | vendored `d3-kyb-report-panels.js` (`signals` panel) + score breakdown dialog |
| Match Signals / Web / Additional | vendored `d3-kyb-result-tabs.js` |
| Owners & UBOs | vendored `d3-kyb-ubo-graph.js` + `ubo-graph.bundle.js` |
| Raw Data | `js/raw.js` + dialog markup |
| Versions | `js/versions.js` |
| Chrome | `css/chrome.css` (TDS tokens) |
| TDS deps | `css/tds-deps.css` |
| Sample data | `js/data.js` |

## Sync from Demo 3

After Demo 3 report CSS/JS changes:

```bash
node portal-2.0/modules/kyb-report/sync.mjs
```

That refreshes `vendor/` only. Module-owned files (`js/`, `css/`) stay under your control.
