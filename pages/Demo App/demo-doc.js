/**
 * Demo App — Document Verification product flow.
 *
 *   Capture   Doc Capture              Figma 2271:57532
 *   Report    Summary                  Figma 2255:51481
 *             Device Intelligence      Figma 2255:51891
 *             Document                 Figma 2255:52047
 *             Biometric                Figma 2255:52207
 *
 * The Device Intelligence panel is exported so the eID and EUDI reports can use
 * the same design.
 */
(function () {
  const ui = window.DA_UI;

  /* ===== Device Intelligence panel (2255:51891) ========================== */

  const DEVICE_INFO = [
    { label: "Language", value: "en-US" },
    { label: "Timezone", value: "UTC-07" },
    { label: "Battery", value: "23%" },
    { label: "First Seen", value: "2026-02-06 T05:47:53Z" },
  ];

  const RISK_INDICATORS = [
    "Trusted browser and operating system",
    "Stable location and timezone",
    "No shared-device activity",
  ];

  const RISK_OUTPUTS = [
    { check: "Automation", result: "No Risk", tone: "positive" },
    { check: "Device Risk Level", result: "High Risk", tone: "negative" },
    { check: "Fraud indicators", result: "Not detected", tone: "muted" },
    { check: "Session Risk", result: "No Risk", tone: "positive" },
  ];

  const SIGNAL_GROUPS = [
    { label: "Network & Location", count: 5 },
    { label: "Integrity & Compromise", count: 3 },
    { label: "Device Identity & History", count: 4 },
    { label: "Behavioral Biometrics", count: 2 },
    { label: "Location History", count: 2 },
  ];

  /**
   * Risk gauge, inlined from assets/doc/gauge.svg (Figma 2255:51953) so the
   * needle, the green arc and the counter can be animated when the tab opens.
   * The paths are the exported ones; only ids and classes were added.
   *
   * NEEDLE_SWEEP is the angle between the arc's zero point (87px left of the
   * 93.56,124.8 centre) and where the export bakes the needle for this value.
   */
  const NEEDLE_SWEEP = 50.5;

  function gauge(value, label) {
    return `
      <div class="da-gauge" data-gauge="${value}" data-sweep="${NEEDLE_SWEEP}">
        <svg class="da-gauge__arc" viewBox="0 0 187.12 124.8" fill="none" aria-hidden="true">
          <path class="da-gauge__track" d="M6.73041 124.8C1.62041 110.75 -0.0395892 95.67 1.92041 80.85C3.87041 66.02 9.37041 51.9 17.9404 39.65C26.5204 27.4 37.9204 17.41 51.1804 10.5C64.4404 3.6 79.1704 0 94.1204 0C109.07 0 123.8 3.6 137.06 10.5C150.32 17.4 161.72 27.4 170.3 39.65C178.88 51.9 184.37 66.03 186.32 80.85C188.27 95.68 186.62 110.75 181.51 124.8L164.04 118.44C168.13 107.2 169.45 95.14 167.89 83.29C166.33 71.43 161.93 60.13 155.07 50.33C148.21 40.54 139.09 32.53 128.48 27.01C117.87 21.49 106.09 18.61 94.1204 18.61C82.1504 18.61 70.3804 21.49 59.7604 27.01C49.1504 32.53 40.0304 40.53 33.1704 50.33C26.3104 60.12 21.9204 71.44 20.3504 83.29C18.7904 95.15 20.1104 107.21 24.2004 118.44L6.73041 124.8Z" fill="#F4F6F4"/>
          <path class="da-gauge__fill" d="M17.94 39.65C9.36 51.9 3.87 66.03 1.91 80.85C-0.0400001 95.68 1.61 110.75 6.72 124.8L24.19 118.44C20.1 107.2 18.78 95.14 20.34 83.29C21.86 71.69 26.12 60.62 32.73 50.96L18.01 39.54C18.01 39.54 17.95 39.62 17.93 39.65H17.94Z" fill="#EAF7F0"/>
          <path class="da-gauge__line" d="M18.6791 40C10.1791 52.08 4.7191 66.01 2.7891 80.62C0.8591 95.23 2.4891 110.1 7.5591 123.94" stroke-width="4" stroke-miterlimit="10" stroke="#6FB38A"/>
          <path class="da-gauge__needle" d="M27.28 48.36L31.68 60.13L32.61 62.6L43.98 48.46L41.37 48.09L28.9 46.35L26.41 46.01L27.3 48.37H27.29L27.28 48.36Z" fill="#172D2D" stroke-width="3" stroke="white"/>
        </svg>
        <span class="da-gauge__value">${value}</span>
        <span class="da-tag-positive da-tag-positive--plain da-gauge__tag">${label}</span>
      </div>`;
  }

  /**
   * `note` lets each product say why the device panel matters in its own
   * context — the document flow's copy references a face mismatch, which would
   * be wrong on the eID and EUDI reports.
   */
  function devicePanel(ctx, note) {
    const open = ctx.state.openAccordions.risk !== false; // Risk Outputs starts open

    return `
      <div class="da-report__panel da-report__panel--wide">
        <h3 class="da-report__title">Device Security Profile</h3>

        ${gauge(17, "Low Risk")}

        ${ui.announce(ctx, "positive", "circle-check", "Normal device and network", note)}

        <div class="da-report__block">
          <h4 class="da-report__heading">Risk Indicators</h4>
          <div class="da-signals da-signals--plain">
            ${RISK_INDICATORS.map(
              (s) => `<p class="da-signal da-signal--body">${ctx.icon("circle-check", 16)}<span>${ctx.esc(s)}</span></p>`
            ).join('<span class="da-signal__divider"></span>')}
          </div>
          ${ui.outlineButton(ctx, "plus", "3 more indicators")}
        </div>

        <div class="da-report__block">
          <h4 class="da-report__heading">Device Information</h4>
          ${ui.fieldList(ctx, DEVICE_INFO, "row")}
        </div>
      </div>

      <div class="da-report__panel da-report__panel--grey da-report__panel--wide">
        <div class="da-report__rowhead">
          <h4 class="da-report__heading">Signals</h4>
          ${ui.outlineButton(ctx, "filter", "Filter & Sort")}
        </div>

        ${ui.signalGroup(
          ctx,
          "Risk Outputs",
          4,
          "positive",
          open,
          ui.signalsTable(ctx, ["Signals", "Insights"], RISK_OUTPUTS)
        )}

        ${SIGNAL_GROUPS.map((g) => ui.signalGroup(ctx, g.label, g.count, "positive", false, null)).join("")}

        ${ui.outlineButton(ctx, "plus", "9 More declined")}
      </div>`;
  }

  /* ===== Capture (2271:57532) =========================================== */

  function capture(ctx) {
    return {
      scroll: `
        <div class="da-capture">
          <div class="da-capture__bar">
            <button class="da-capture__back" type="button" data-action="back" aria-label="Back">
              ${ctx.icon("arrow-left", 24)}
            </button>
            <span class="da-capture__titles">
              <span class="da-capture__title">Front of Driver&rsquo;s Licence</span>
              <span class="da-capture__step">Step 2/4</span>
            </span>
            <span class="da-capture__spacer"></span>
          </div>

          <div class="da-capture__progress">
            <span class="is-done"></span><span class="is-done"></span><span></span><span></span>
          </div>

          <button class="da-capture__stage" type="button" data-action="continue" aria-label="Capture the front of the document">
            <span class="da-capture__scan">
              <img class="da-capture__doc" src="assets/doc/licence.png" alt="">
              <span class="da-capture__corner da-capture__corner--tl"></span>
              <span class="da-capture__corner da-capture__corner--tr"></span>
              <span class="da-capture__corner da-capture__corner--bl"></span>
              <span class="da-capture__corner da-capture__corner--br"></span>
            </span>
            <span class="da-capture__hint">Position the front of your document in the box</span>
          </button>

          <div class="da-capture__foot">
            <span class="da-capture__tips">
              <img src="assets/doc/info-circle.svg" alt="" width="16" height="16">
              Capture Tips
            </span>
            <img class="da-capture__rotate" src="assets/doc/phone-rotate.svg" alt="" width="20" height="20">
          </div>
        </div>`,
      menu: null,
    };
  }

  /* ===== Report panels ================================================== */

  // Summary (2255:51481)
  const CHECKS = [
    { icon: "mobile", label: "Device Intelligence", tag: "Clear", tone: "positive", lead: "61", rest: "/100", tab: "device" },
    { icon: "id-card", label: "Document", tag: "Clear", tone: "positive", lead: "14", rest: "/14 signals passed", tab: "document" },
    { icon: "face-viewfinder", label: "Biometrics", tag: "Clear", tone: "positive", pre: "Face match: ", lead: "97%", tab: "biometric" },
    { icon: "fingerprint", label: "Electronic ID", tag: "Fallback used", tone: "intermediate", plain: "Not completed" },
    { icon: "lock", label: "eIDAS 2.0", tag: "LoA High", tone: "positive", plain: "Requirements satisfied", tab: "summary" },
  ];

  function summaryPanel(ctx) {
    const cards = CHECKS.map((c) => {
      const value = c.plain
        ? `<span class="da-check-row__value">${ctx.esc(c.plain)}</span>`
        : `<span class="da-check-row__value">${c.pre ? ctx.esc(c.pre) : ""}<em>${ctx.esc(c.lead)}</em>${
            c.rest ? ctx.esc(c.rest) : ""
          }</span>`;
      const arrow = c.tab ? ctx.icon("arrow-right", 16) : "";
      const attrs = c.tab && c.tab !== "summary" ? ` data-action="tab" data-tab="${c.tab}"` : "";
      const tag = `<span class="da-tag-${c.tone === "intermediate" ? "intermediate" : "positive"} da-tag-positive--plain">${ctx.esc(c.tag)}</span>`;

      return `
        <${c.tab && c.tab !== "summary" ? "button" : "div"} class="da-check-row"${attrs}${attrs ? ' type="button"' : ""}>
          <span class="da-check-row__head">
            <span class="da-check-row__label">${ctx.icon(c.icon, 16)}${ctx.esc(c.label)}</span>
            ${tag}
          </span>
          <span class="da-check-row__foot">${value}${arrow}</span>
        </${c.tab && c.tab !== "summary" ? "button" : "div"}>`;
    }).join("");

    return `<div class="da-report__panel"><div class="da-checks">${cards}</div></div>`;
  }

  // Document (2255:52047)
  const DOC_SUMMARY = [
    { label: "Signals checked", value: "13" },
    { label: "Pass rate", value: "100%" },
    { label: "Failed checks", value: "0" },
  ];

  const DOC_SIGNALS = [
    { check: "Document status", note: "Document verification passed", result: "Accepted", tone: "positive" },
    { check: "Expiry check", note: "Document has not expired", result: "Accepted", tone: "positive" },
    { check: "Security features", note: "Security features verified", result: "Accepted", tone: "positive" },
    { check: "Barcode integrity", note: "Barcode validated", result: "Accepted", tone: "positive" },
    { check: "Known document type", note: "Document type recognized", result: "Accepted", tone: "positive" },
  ];

  function scanCard(ctx, title, src) {
    return `
      <div class="da-scan">
        <div class="da-scan__head">
          <span class="da-scan__title">${ctx.esc(title)}</span>
          <span class="da-scan__expand">${ctx.icon("expand", 16)}</span>
        </div>
        <div class="da-scan__image"><img src="${src}" alt="${ctx.esc(title)}"></div>
      </div>`;
  }

  function documentPanel(ctx) {
    return `
      <div class="da-report__panel">
        <h3 class="da-report__heading">Summary</h3>
        ${ui.fieldList(ctx, DOC_SUMMARY, "row")}
        ${ui.truaiCard(
          ctx,
          "All document signals passed. The document itself is authentic and valid. The decline was triggered by biometric mismatch, not document issues."
        )}
        ${ui.accordion(ctx, "client", "Client Details", '<p class="da-accordion__empty">No client details were returned for this verification.</p>', ctx.state.openAccordions.client)}
        ${ui.accordion(ctx, "docinfo", "Document Information", ui.fieldList(ctx, DOC_SUMMARY, "stack"), ctx.state.openAccordions.docinfo)}
      </div>

      <div class="da-report__panel da-report__panel--grey">
        <div class="da-report__rowhead">
          <h4 class="da-report__heading">Signals</h4>
          ${ui.outlineButton(ctx, "filter", "Filter & Sort")}
        </div>
        ${ui.signalGroup(ctx, "Accepted", 13, "positive", true, ui.signalsTable(ctx, ["Check", "Results"], DOC_SIGNALS))}
        ${ui.outlineButton(ctx, "plus", "9 More declined")}

        <div class="da-report__block">
          <h4 class="da-report__heading">Driver&rsquo;s License</h4>
          ${scanCard(ctx, "Front of Document", "assets/doc/doc-front.png")}
          ${scanCard(ctx, "Back of Document", "assets/doc/doc-back.png")}
        </div>
      </div>`;
  }

  // Biometric (2255:52207)
  const BIO_SUMMARY = [
    { label: "Signals checked", value: "18" },
    { label: "Pass rate", value: "99.82%" },
    { label: "Failed checks", value: "1", tone: "negative" },
    { label: "Known face matches", value: "0" },
  ];

  function biometricPanel(ctx) {
    const summary = BIO_SUMMARY.map((r) =>
      r.tone ? { label: r.label, html: `<em class="da-value--negative">${r.value}</em>` } : r
    );

    return `
      <div class="da-report__panel">
        <h3 class="da-report__heading">Summary</h3>
        ${ui.fieldList(ctx, summary, "row")}
        ${ui.truaiCard(
          ctx,
          "Face match scored 23%, well below the 70% acceptance threshold. The selfie and document photo appear to be different individuals. Liveness passed, ruling out a spoofing attempt.",
          "What causes low face match scores?"
        )}
      </div>

      <div class="da-report__panel da-report__panel--grey">
        <div class="da-report__rowhead">
          <h4 class="da-report__heading">Signals</h4>
          ${ui.outlineButton(ctx, "filter", "Filter & Sort")}
        </div>
        ${ui.signalGroup(
          ctx,
          "Declined",
          1,
          "negative",
          true,
          ui.signalsTable(ctx, ["Check", "Result"], [
            { check: "Face match", note: "Selfie does not match the document portrait.", result: "Declined", tone: "negative" },
          ])
        )}
        ${ui.signalGroup(ctx, "Accepted", 6, "positive", false, null)}
        ${ui.signalGroup(ctx, "Not detected", 11, "neutral", false, null)}
        ${ui.signalGroup(ctx, "Know faces", "No matches", "neutral", false, null)}

        <div class="da-report__block">
          <h4 class="da-report__heading">Captured selfie</h4>
          <div class="da-selfie">
            <span class="da-scan__expand">${ctx.icon("expand", 16)}</span>
            <img src="assets/doc/selfie.png" alt="Captured selfie">
          </div>
          <p class="da-report__note">Matched against 5 faces</p>
          <div class="da-faces">
            <span class="da-face"><em>2</em><img src="assets/doc/selfie.png" alt=""></span>
            <span class="da-face"><em>2</em><img src="assets/doc/selfie.png" alt=""></span>
            <span class="da-face da-face--more">${ctx.icon("plus", 16)} 2 more</span>
          </div>
        </div>
      </div>`;
  }

  /* ===== Report (2255:51481) ============================================ */

  function report(ctx) {
    return ui.report(ctx, {
      verdict: "Accepted",
      assurance: "eIDAS 2.0 · Substantial / High assurance",
      assuranceIcon: "lock",
      cardTitle: "Sanne de Vries’ identity was verified",
      signals: [
        "Document verified authentic, meeting eIDAS's requirement for genuine identity evidence",
        "Biometric liveness and face match confirmed, binding the document to the live applicant.",
        "Verified remotely, to a standard equivalent to physical presence.",
      ],
      details: ui.DETAILS,
      tabs: [
        { id: "summary", icon: "memo", label: "Summary", panel: () => summaryPanel(ctx) },
        {
          id: "device",
          icon: "mobile",
          label: "Device Intelligence",
          panel: () =>
            devicePanel(
              ctx,
              "The device and network appear normal. The transaction was declined because of the face mismatch, not device risk."
            ),
        },
        { id: "document", icon: "id-card", label: "Document", panel: () => documentPanel(ctx) },
        { id: "biometric", icon: "smile", label: "Biometric", panel: () => biometricPanel(ctx) },
      ],
    });
  }

  window.DA_DOC = { capture, report, devicePanel };
})();
