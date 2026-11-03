/**
 * Demo App — pieces shared by every product flow.
 *
 * The eID and EUDI Wallet screens are the same template with different content:
 * a progress back bar, stacked data fields, announcements, accordions, and a
 * report. Those live here so each product file only carries its own copy.
 *
 * Every builder is pure — it returns an HTML string and never touches the DOM.
 * `ctx` supplies { icon, esc, state }.
 */
(function () {
  function topbar(ctx, backLabel, stepLabel, progress) {
    return `
      <div class="da-topbar da-topbar--progress">
        <button class="da-back" type="button" data-action="back">
          ${ctx.icon("chevron-left", 12)}
          ${ctx.esc(backLabel)}
        </button>
        <span class="da-topbar__step">${ctx.esc(stepLabel)}</span>
        <span class="da-topbar__bar" style="width:${progress}%"></span>
      </div>`;
  }

  function tagPositive(ctx, iconName, label) {
    return `<span class="da-tag-positive">${ctx.icon(iconName, 16)}${ctx.esc(label)}</span>`;
  }

  /**
   * layout "stack": label above value, optional `note` underneath.
   * layout "row":   label left, value pushed right.
   * `html` on an item bypasses escaping for values that carry a <br>.
   */
  function fieldList(ctx, items, layout) {
    const rows = items
      .map((f) => {
        const value = f.html || ctx.esc(f.value);
        const note = f.note ? `<span class="da-field-row__note">${ctx.esc(f.note)}</span>` : "";
        const extra = f.valueExtra || "";
        return `
        <div class="da-field-row da-field-row--${layout}">
          <span class="da-field-row__label">${ctx.esc(f.label)}</span>
          <span class="da-field-row__value">${value}${extra}</span>
          ${note}
        </div>`;
      })
      .join('<span class="da-field-row__divider"></span>');
    return `<div class="da-fields">${rows}</div>`;
  }

  function accordion(ctx, id, title, bodyHTML, open) {
    return `
      <div class="da-accordion${open ? " is-open" : ""}" data-accordion="${id}">
        <button class="da-accordion__head" type="button" data-action="accordion" aria-expanded="${!!open}">
          <span class="da-accordion__title">${ctx.esc(title)}</span>
          ${ctx.icon("chevron-down", 16)}
        </button>
        <div class="da-accordion__body">${bodyHTML}</div>
      </div>`;
  }

  function announce(ctx, tone, iconName, title, body) {
    return `
      <div class="da-announce da-announce--${tone}">
        ${ctx.icon(iconName, 16)}
        <span class="da-announce__content">
          ${title ? `<span class="da-announce__title">${ctx.esc(title)}</span>` : ""}
          <span class="da-announce__body">${ctx.esc(body)}</span>
        </span>
      </div>`;
  }

  function truaiCard(ctx, text, chip) {
    return `
      <div class="da-truai">
        <div class="da-truai__block">
          <p class="da-truai__who"><img src="assets/truai-sparkle.svg" alt="" width="12" height="12"> TruAI:</p>
          <p class="da-truai__text">${ctx.esc(text)}</p>
        </div>
        <div class="da-truai__block">
          <p class="da-truai__ask">Ask TruAI:</p>
          <span class="da-truai__chip"><img src="assets/truai-sparkle.svg" alt="" width="12" height="12"> ${ctx.esc(
            chip || "View full signal breakdown"
          )}</span>
        </div>
      </div>`;
  }

  /**
   * Report shell — Figma 925:16607 (eID), 925:16682 (EUDI), 2255:51481 (document).
   * Identical from the verdict down to the tab rail; each product supplies its
   * own tabs and the panel behind each one.
   *
   * config: { verdict, assurance, assuranceIcon, cardTitle, signals[], details[],
   *           tabs: [{ id, icon, label, panel() }] }
   */
  function report(ctx, config) {
    const tabRail = `
      <div class="da-rtabs" role="tablist">
        ${config.tabs
          .map(
            (t) => `
          <button class="da-rtab" type="button" role="tab" data-action="tab" data-tab="${t.id}"
                  aria-selected="${ctx.state.reportTab === t.id}">
            ${ctx.icon(t.icon, 16)}${ctx.esc(t.label)}
          </button>`
          )
          .join("")}
      </div>`;

    const active = config.tabs.find((t) => t.id === ctx.state.reportTab) || config.tabs[0];

    return {
      scroll: `
        <div class="da-verdict">
          <div class="da-verdict__head">
            ${ctx.icon("circle-check", 24)}
            <span class="da-verdict__label">${ctx.esc(config.verdict || "Completed")}</span>
          </div>
          <span class="da-tag-neutral">${ctx.icon(config.assuranceIcon, 16)} ${ctx.esc(config.assurance)}</span>

          <div class="da-verdict__card">
            <p class="da-verdict__card-title">${ctx.esc(config.cardTitle)}</p>
            <div class="da-signals">
              ${config.signals
                .map((s) => `<p class="da-signal">${ctx.icon("circle-check", 16)}<span>${ctx.esc(s)}</span></p>`)
                .join('<span class="da-signal__divider"></span>')}
            </div>
          </div>

          ${accordion(ctx, "details", "View details", fieldList(ctx, config.details, "stack"), ctx.state.openAccordions.details)}
        </div>

        ${tabRail}
        ${active.panel()}`,
      menu: null,
    };
  }

  /** The "Identity Data Collected" panel the eID and EUDI reports share. */
  function collectedPanel(ctx, collected, extras) {
    return `
      <div class="da-report__panel da-report__panel--grey">
        <h3 class="da-report__heading">Identity Data Collected</h3>
        ${fieldList(ctx, collected, "stack")}
        ${
          extras
            ? accordion(
                ctx,
                "extra",
                "Additional Details",
                '<p class="da-accordion__empty">No additional details were returned for this verification.</p>',
                ctx.state.openAccordions.extra
              )
            : ""
        }
      </div>`;
  }

  // Shared by both reports — the transaction metadata behind "View details".
  const DETAILS = [
    { label: "Name", value: "Sanne de Vries" },
    { label: "Country / Jurisdiction", value: "Netherlands (NL)" },
    { label: "Date", value: "17 Jun 2026, 2:14 PM" },
    { label: "Transaction ID", value: "8c2f4e7a-19bd-4f02-a6c1-77de42915b3a" },
  ];

  /* --- Signals table (Figma 2255:52001 and the Document/Biometric variants) -- */

  const TONE_ICON = { positive: "circle-check", negative: "circle-xmark", muted: "circle-minus" };

  function signalsTable(ctx, columns, rows) {
    return `
      <div class="da-stable">
        <div class="da-stable__columns">
          ${columns.map((c) => `<span class="da-stable__cell">${ctx.esc(c)}</span>`).join("")}
        </div>
        ${rows
          .map(
            (r) => `
          <div class="da-stable__row">
            <span class="da-stable__cell">
              ${ctx.esc(r.check)}
              ${r.note ? `<span class="da-stable__note">${ctx.esc(r.note)}</span>` : ""}
            </span>
            <span class="da-stable__cell da-stable__result da-stable__result--${r.tone}">
              ${ctx.icon(TONE_ICON[r.tone], 16)}${ctx.esc(r.result)}
            </span>
          </div>`
          )
          .join("")}
      </div>`;
  }

  /** A collapsed signal group — "NETWORK & LOCATION (5)" and friends. */
  function signalGroup(ctx, label, count, tone, open, bodyHTML) {
    return `
      <div class="da-sgroup${open ? " is-open" : ""}">
        <p class="da-sgroup__head">
          ${ctx.icon(open ? "chevron-down" : "chevron-right", 16)}
          <span class="da-sgroup__label">${ctx.esc(label)}</span>
          <span class="da-count da-count--${tone || "neutral"}">${ctx.esc(count)}</span>
        </p>
        ${open && bodyHTML ? bodyHTML : ""}
      </div>`;
  }

  function outlineButton(ctx, iconName, label) {
    return `<span class="da-obtn">${ctx.icon(iconName, 16)}${ctx.esc(label)}</span>`;
  }

  window.DA_UI = {
    topbar,
    tagPositive,
    fieldList,
    accordion,
    announce,
    report,
    truaiCard,
    collectedPanel,
    signalsTable,
    signalGroup,
    outlineButton,
    DETAILS,
  };
})();
