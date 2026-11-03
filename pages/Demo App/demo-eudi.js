/**
 * Demo App — EUDI Wallet product flow.
 *
 *   Step 1   Use your EUDI Wallet                     Figma 925:16757
 *   Drawer   Connect Your Wallet (QR, slides up)      Figma 925:16837
 *   Step 2   Meridian Bank N.V. is asking for your ID Figma 925:17378
 *   Report   Report - eIDAS Wallet                    Figma 925:16682
 */
(function () {
  const ui = window.DA_UI;

  const VERIFIER = "Meridian Bank N.V.";

  const REQUESTED = [
    { attribute: "Given name", requirement: "Required" },
    { attribute: "Family name", requirement: "Required" },
    { attribute: "Over 18", requirement: "Required" },
    { attribute: "Date of birth", requirement: "Optional" },
    { attribute: "Address", requirement: "Optional" },
    { attribute: "Nationality", requirement: "Optional" },
  ];

  const SHARED = [
    { label: "Family name", value: "de Vries", note: "Required to open the account" },
    { label: "Given name", value: "Sanne", note: "Required to open the account" },
    // Figma shows "Sanne" here, which looks like a copy/paste slip on a derived
    // yes/no attribute — rendering the value the predicate actually returns.
    { label: "Over 18", value: "Yes", note: "Derived. Your date of birth stays in the wallet" },
    { label: "Date of birth", value: "1991/07/14", note: "Optional" },
    { label: "Address", value: "015 CJ Amsterdam", note: "Optional" },
    { label: "Nationality", value: "Netherlands", note: "Optional" },
  ];

  const COLLECTED = [
    { label: "Name", value: "Sanne de Vries" },
    { label: "Address", value: "Keizersgracht 123, 1015 CJ Amsterdam" },
    { label: "Gender", value: "Female" },
    { label: "Date of Birth", value: "1991/07/14" },
    { label: "Email Address", value: "sophie.berg@example.com" },
    { label: "Phone Number", value: "+31 6 1234 5678" },
    { label: "National ID", value: "AB1234567" },
    { label: "Document Number", value: "DOC-8847291" },
    { label: "Document Expiry", value: "2031/08/15" },
    { label: "Nationality", value: "Netherlands" },
  ];

  /* --- Step 1: Use your EUDI Wallet (925:16757) ------------------------- */

  function requestStep(ctx) {
    const backLabel = ctx.state.cameFromFlow ? "Select journey" : "Home";

    const intro = [
      {
        label: "Who is asking?",
        value: VERIFIER,
        valueExtra: ui.tagPositive(ctx, "circle-check", "Registered verifier"),
      },
      { label: "Purpose", value: "Opening a payment account (AMLD6)." },
      { label: "Registration certificate", value: "RP-DE-2026-04417", note: "Issued by the German registrar" },
    ];

    const rows = REQUESTED.map(
      (r) => `
      <div class="da-dt__row">
        <span class="da-dt__cell">${ctx.esc(r.attribute)}</span>
        <span class="da-dt__cell da-dt__cell--value">${ctx.esc(r.requirement)}</span>
      </div>`
    ).join("");

    return {
      scroll:
        ui.topbar(ctx, backLabel, "Step 1 of 2", 50) +
        `<div class="da-flow__bottom da-flow__bottom--flush">
          <div class="da-section">
            <h2 class="da-flow__title">Use your EUDI Wallet</h2>
            <p class="da-section__note">Your wallet already holds a government-issued ID. Nothing is scanned, you choose what to share.</p>
          </div>
          ${ui.fieldList(ctx, intro, "stack")}

          <div class="da-dt">
            <div class="da-dt__head">
              <p class="da-dt__title">What will be requested</p>
            </div>
            <div class="da-dt__columns">
              <span class="da-dt__cell">Attribute</span>
              <span class="da-dt__cell">Requirement</span>
            </div>
            ${rows}
          </div>
        </div>`,
      menu: `
        <p class="da-appmenu__note">Next : ${ctx.icon("check-double", 12)} <span>Review what to share</span></p>
        <div class="da-cta-stack">
          <button class="da-cta" type="button" data-action="continue">Open my wallet</button>
          <button class="da-cta da-cta--secondary" type="button" data-action="other-phone">
            My wallet is on another phone
            ${ctx.icon("arrow-right", 16)}
          </button>
        </div>`,
    };
  }

  /* --- Step 2: review what to share (925:17378) ------------------------- */

  function shareStep(ctx) {
    return {
      scroll:
        ui.topbar(ctx, "Use your EUDI Wallet", "Step 2 of 2", 100) +
        `<div class="da-flow__bottom da-flow__bottom--flush">
          <div class="da-section">
            <h2 class="da-flow__title">${ctx.esc(VERIFIER)} is asking for your ID</h2>
          </div>
          ${ui.fieldList(ctx, SHARED, "stack")}
          ${ui.announce(
            ctx,
            "info",
            "circle-info",
            null,
            "Sharing unlocks with Face ID inside the wallet. Meridian never sees your biometrics."
          )}
        </div>`,
      menu: `
        <p class="da-appmenu__note">Next : ${ctx.icon("memo", 12)} <span>Generate report</span></p>
        <div class="da-cta-stack">
          <button class="da-cta" type="button" data-action="accept">Accept</button>
          <button class="da-cta da-cta--secondary" type="button" data-action="decline">Decline</button>
        </div>`,
    };
  }

  /* --- Drawer: Connect Your Wallet (925:16837) -------------------------- */

  function drawer() {
    return `
      <div class="da-drawer__handle"></div>
      <p class="da-drawer__title">Connect Your Wallet</p>
      <div class="da-drawer__body">
        <img class="da-drawer__qr" src="assets/wallet-qr.svg" alt="QR code to connect your wallet" width="296" height="296">
        <p class="da-drawer__note">Scan with the wallet on your other phone. This page updates when the presentation arrives.</p>
      </div>
      <div class="da-drawer__gesture"><span></span></div>`;
  }

  /* --- Report (925:16682) ----------------------------------------------- */

  function report(ctx) {
    const summary = [
      { label: "Status", value: "Completed" },
      { label: "Scheme assurance level", value: "High" },
      { label: "Provider", value: "EUDI Wallet" },
    ];

    return ui.report(ctx, {
      assurance: "eIDAS 2.0 · Substantial / High assurance",
      assuranceIcon: "lock",
      cardTitle: "Identity confirmed with verified wallet credential",
      signals: [
        "Only the requested attributes were shared",
        "Recognized under eIDAS 2.0 as the EU's digital identity standard",
      ],
      details: ui.DETAILS,
      tabs: [
        {
          id: "product",
          icon: "wallet",
          label: "EUDI Wallet",
          panel: () =>
            `<div class="da-report__panel">
              <h3 class="da-report__heading">Summary</h3>
              ${ui.fieldList(ctx, summary, "row")}
              ${ui.truaiCard(
                ctx,
                "Identity confirmed directly by the wallet assertion. No document scan or selfie was required."
              )}
            </div>` + ui.collectedPanel(ctx, COLLECTED, false),
        },
        {
          id: "device",
          icon: "mobile",
          label: "Device Intelligence",
          panel: () =>
            window.DA_DOC.devicePanel(ctx, "The device and network appear normal. No risk signals were raised during this session."),
        },
      ],
    });
  }

  window.DA_EUDI = { requestStep, shareStep, drawer, report };
})();
