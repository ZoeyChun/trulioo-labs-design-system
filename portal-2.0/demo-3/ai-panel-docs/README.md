# TruAI scenarios

Step-by-step walkthroughs of the three ways into a KYB verification, for design
and product review. Pick a scenario and scroll — the steps run top to bottom,
each showing the real UI and a short list of what changed.

| | URL |
|--|--|
| GitHub Pages | [demo-3/ai-panel-docs/](https://zoeychun.github.io/trulioo-labs-design-system/portal-2.0/demo-3/ai-panel-docs/) |
| Local | `http://127.0.0.1:8765/portal-2.0/demo-3/ai-panel-docs/index.html` |

## What's on it

| Option | Scenarios |
|--|--|
| 1 · Homepage | Launch from the homepage search; hands off to the AI chat flow. |
| 2 · AI chat | **A** standard verification (contract default) · **B** customized package · **C** post-verification add-on · **D** long verification delays |
| 3 · Manual form | **A** auto pre-fill path · **B** manual data entry path |

Scenario 2B carries a **level switch** — Essentials, Insights, Complete. It
changes the number of questions, the add-ons offered, the scope line and the
report tabs, and the steps re-render as you switch.

## How a step reads

1. **Who acted** — <kbd>ACTION</kbd> for the user, <kbd>PANEL</kbd> or
   <kbd>WORKSPACE</kbd> for the product — and what they did.
2. **The UI at that moment**, rendered with the real component CSS.
3. **What changes** — a short list, in plain sentences.

A step that does not happen on the selected branch is struck through with a
note saying why, so the gap in the flow is visible rather than silent.

## Scope

No code, no class names, no file paths. Anything a developer needs beyond this
belongs in the component source.

## How it works

- `index.html` — the shell. Links the real Demo 3 CSS, so specimens are the
  live components rather than screenshots.
- `catalog.js` — **all the content.** One entry per scenario; each step has a
  title, trigger, badges, an optional note, and a `view()` that returns the UI
  for the current branch.
- `docs.js` — renderer and router. One scenario per screen at `#s/<scenario>`;
  the steps are stacked and you scroll them. The branch switch is sticky, and
  flipping it re-renders in place without losing your scroll position.
- `docs.css` — page chrome, all `dx-` prefixed.

## Keeping it true

Written against the running prototype, not the spec. When the product changes,
re-walk the affected scenario and edit `catalog.js` — the content is data in one
file, so a change lands in one place.

Things that have moved before and are worth re-checking: the add-ons offered per
level, what the level cards say, and the Product / Package / Verification Level
vocabulary.

## Adding a scenario

```js
{ id: "o2e", group: "Option 2 · AI chat", name: "E · …",
  line: "One sentence.",
  controls: [ /* optional branch switch */ ],
  steps: [
    { title: "…", actor: "Action",        // or "Panel" / "Workspace"
      trigger: "clicks <strong>Verify</strong>",
      view: function (branch) { return X.pane(/* … */); },
      changes: ["The wizard folds away.",
                "The scope line reads Scope, not Default configuration."],
      note: { k: "Else", text: "…" },     // optional; warn: true for amber
      skipOn: ["essentials"] }            // optional; strikes the step out
  ],
  props: { name: "Details", head: ["", ""], rows: [ ["…", "…"] ] }
}
```

`changes` can be a function of the branch when the outcome differs by level.
Keep the entries short and factual — they carry the meaning that badges and
paragraphs used to, and they are what most readers actually read.

`X` is the shared helper set at the top of `catalog.js` — `pane()` for chat
content, `sheet()` for the workspace panel, plus builders for the wizard,
match list, confirmation card and add-on list.
