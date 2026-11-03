/**
 * Demo App — Electronic ID product flow.
 *
 *   Step 1   Select your bank            Figma 925:16452
 *   Step 2   Send details to Trulioo     Figma 925:16542
 *   Step 3   Fallback to document        Figma 925:16574  (only after Decline)
 *   Report   Report - eID                Figma 925:16607 (+ 925:16451 expanded)
 *
 * Builders return { scroll, menu } HTML. Interaction is delegated in demo-app.js
 * through the data-action attributes below; nothing here touches the DOM.
 */
(function () {
  const ui = window.DA_UI;

  const BANKS = [
    { id: "ing", name: "ING", logo: "assets/banks/ing.png" },
    { id: "abn", name: "ABN AMRO", logo: "assets/banks/abn-amro.png", onWhite: true },
    { id: "asn", name: "ASN Bank", logo: "assets/banks/asn.png", tile: "asn" },
    { id: "rabo", name: "Rabo Bank", logo: "assets/banks/rabobank.png", bare: true },
    { id: "itsme", name: "itsme", logo: "assets/banks/itsme.png" },
  ];

  const CONSENT_FIELDS = [
    { label: "Full name", html: "Sanne de Vries" },
    { label: "Date of birth", html: "1991/07/14" },
    { label: "Address", html: "Keizersgracht 123,<br>015 CJ Amsterdam" },
    { label: "Government Identifier", html: "*****567" },
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

  /* --- Step 1: Select your bank (925:16452) ----------------------------- */

  function bankStep(ctx) {
    const cards = BANKS.map((bank) => {
      const selected = bank.id === ctx.state.bank;
      let tile = "da-bank__logo";
      if (bank.bare) tile += " da-bank__logo--bare";
      else if (bank.onWhite) tile += " da-bank__logo--white";
      if (bank.tile) tile += ` da-bank__logo--${bank.tile}`;
      return `
        <button class="da-bank${selected ? " is-selected" : ""}" type="button"
                data-action="select-bank" data-bank="${bank.id}" aria-pressed="${selected}">
          <span class="${tile}"><img src="${bank.logo}" alt=""></span>
          <span class="da-bank__name">${ctx.esc(bank.name)}</span>
        </button>`;
    }).join("");

    // Figma labels this "Select journey" — right when the product was reached
    // from an industry journey, but the home rail has no journey behind it.
    const backLabel = ctx.state.cameFromFlow ? "Select journey" : "Home";

    return {
      scroll:
        ui.topbar(ctx, backLabel, "Step 1 of 2", 50) +
        `<div class="da-flow__bottom da-flow__bottom--flush">
          <div class="da-section">
            <h2 class="da-flow__title">Select your bank</h2>
            <p class="da-section__note">Choose your bank to authenticate with iDIN. This is a test environment. No real banking session will be initiated.</p>
            ${ui.tagPositive(ctx, "lock", "Your data is protected")}
          </div>
          <div class="da-banks">${cards}</div>
        </div>`,
      menu: `
        <p class="da-appmenu__note"><span>Next : Open banking app</span></p>
        <button class="da-cta" type="button" data-action="continue">Continue</button>`,
    };
  }

  /* --- Step 2: Send details to Trulioo (925:16542) ---------------------- */

  function consentStep(ctx) {
    const bank = BANKS.find((b) => b.id === ctx.state.bank) || BANKS[0];

    return {
      scroll:
        ui.topbar(ctx, "Select your bank", "Step 2 of 2", 100) +
        `<div class="da-flow__bottom da-flow__bottom--flush">
          <div class="da-section">
            <h2 class="da-flow__title">Send details to Trulioo</h2>
            <p class="da-section__note">If you send your details, Trulioo will know who you are. You are requesting ${ctx.esc(bank.name)} to send below details only once:</p>
            ${ui.tagPositive(ctx, "lock", "Your data is protected")}
          </div>
          ${ui.fieldList(ctx, CONSENT_FIELDS, "stack")}
        </div>`,
      menu: `
        <p class="da-appmenu__note">Next : ${ctx.icon("memo", 12)} <span>Generate report</span></p>
        <div class="da-cta-stack">
          <button class="da-cta" type="button" data-action="accept">Accept</button>
          <button class="da-cta da-cta--secondary" type="button" data-action="decline">Decline</button>
        </div>`,
    };
  }

  /* --- Step 3: fallback, only after Decline (925:16574) ----------------- */

  function fallbackStep(ctx) {
    return {
      scroll:
        ui.topbar(ctx, "Select your bank", "Step 2 of 2", 100) +
        `<div class="da-flow__bottom da-flow__bottom--white">
          ${ui.announce(
            ctx,
            "negative",
            "circle-exclamation",
            "eID could not be completed",
            "The provider returned cancelled_by_user. Nothing was shared, and your session is still valid."
          )}
          <div class="da-section">
            <h2 class="da-flow__title">No problem — use your document instead.</h2>
            <p class="da-section__note">Scanning your driver&rsquo;s licence or passport with a selfie check reaches the same eIDAS 2.0 High assurance.</p>
          </div>
          <div class="da-cta-stack">
            <button class="da-cta" type="button" data-action="use-document">Continue with document</button>
            <button class="da-cta da-cta--secondary" type="button" data-action="retry-eid">Try eID again</button>
          </div>
        </div>`,
      menu: null,
    };
  }

  /* --- Report (925:16607) ----------------------------------------------- */

  function report(ctx) {
    const bank = BANKS.find((b) => b.id === ctx.state.bank) || BANKS[0];

    const summary = [
      { label: "Status", value: "Completed" },
      { label: "Scheme assurance level", value: "Substantial" },
      { label: "Provider", value: "iDIN" },
      { label: "Bank", value: bank.name },
    ];

    return ui.report(ctx, {
      assurance: "eIDAS 2.0 · Substantial / High assurance",
      assuranceIcon: "shield-check",
      cardTitle: "Identity was verified with iDIN",
      signals: [
        "Identity confirmed by a notified national eID scheme",
        "Recognized under eIDAS 2.0 as a valid electronic identification means",
      ],
      details: ui.DETAILS,
      tabs: [
        {
          id: "product",
          icon: "memo",
          label: "Electronic ID",
          panel: () =>
            `<div class="da-report__panel">
              <h3 class="da-report__heading">Summary</h3>
              ${ui.fieldList(ctx, summary, "row")}
              ${ui.truaiCard(
                ctx,
                "Sanne de Vries’s electronic ID has been verified through iDIN. All identity signals passed with no additional steps required."
              )}
            </div>` + ui.collectedPanel(ctx, COLLECTED, true),
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

  window.DA_EID = { BANKS, bankStep, consentStep, fallbackStep, report };
})();
