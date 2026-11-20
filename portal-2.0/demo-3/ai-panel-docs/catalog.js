/* TruAI docs — the catalogue.
   Everything the page shows lives here: one entry per component, one per
   scenario. `view()` returns the specimen markup for the current control
   values, so a state is a data change rather than a block of HTML.

   Checked against the running Demo 3 prototype at dd799c6 — verification
   levels carry a one-line note (no taglines, bullets or impact lines), the
   add-on is "Business Risk Horizon", and Filings is gone. */
(function () {
  "use strict";

  /* ------------------------------------------------------------- icons --- */
  var I = {
    expand: '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M9.5 2.5H13.5V6.5M6.5 13.5H2.5V9.5M13.5 2.5 9 7M2.5 13.5 7 9"/></svg>',
    collapse: '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M13.5 6.5H9.5V2.5M2.5 9.5H6.5V13.5M9.5 6.5 14 2M6.5 9.5 2 14"/></svg>',
    minimize: '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3" y="3" width="10" height="10" rx="1.75" stroke="currentColor" stroke-width="1.5"/><path stroke="currentColor" stroke-width="1.5" d="M3 9.25h10"/><path stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" d="m6.4 5.4 1.6 1.5 1.6-1.5"/></svg>',
    newChat: '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M7.5 2.75h-3A1.75 1.75 0 0 0 2.75 4.5v7a1.75 1.75 0 0 0 1.75 1.75h7a1.75 1.75 0 0 0 1.75-1.75v-3M11.9 2.1a1.15 1.15 0 0 1 1.63 1.63L8 9.25 5.75 9.75l.5-2.25L11.9 2.1Z"/></svg>',
    mic: '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M8 1.75a2.25 2.25 0 0 0-2.25 2.25v4a2.25 2.25 0 1 0 4.5 0v-4A2.25 2.25 0 0 0 8 1.75Zm-4.5 6.5a4.5 4.5 0 0 0 9 0M8 12.25V14.5"/></svg>',
    send: '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M8 13V3m0 0L4.5 6.5M8 3l3.5 3.5"/></svg>',
    plus: '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M8 3v10M3 8h10"/></svg>',
    arrow: '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M3 8h10m0 0-3.5-3.5M13 8l-3.5 3.5"/></svg>',
    chevD: '<svg class="d3-fa-line d1-chev-down" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',
    chevU: '<svg class="d3-fa-line d1-chev-up" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m4 10 4-4 4 4"/></svg>',
    pagerL: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10 3 5 8l5 5"/></svg>',
    pagerR: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M6 3l5 5-5 5"/></svg>',
    search12: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M7.90625 4.46875C7.90625 2.57812 6.35938 1.03125 4.46875 1.03125C2.57812 1.03125 1.03125 2.57812 1.03125 4.46875C1.03125 6.35938 2.57812 7.90625 4.46875 7.90625C6.35938 7.90625 7.90625 6.35938 7.90625 4.46875ZM7.24023 7.9707C6.48828 8.57227 5.52148 8.9375 4.46875 8.9375C1.99805 8.9375 0 6.93945 0 4.46875C0 1.99805 1.99805 0 4.46875 0C6.93945 0 8.9375 1.99805 8.9375 4.46875C8.9375 5.52148 8.57227 6.48828 7.9707 7.24023L10.8496 10.1191C11.043 10.3125 11.043 10.6562 10.8496 10.8496C10.6562 11.043 10.3125 11.043 10.1191 10.8496L7.24023 7.9707Z" fill="currentColor"/></svg>',
    file11: '<svg width="9" height="11" viewBox="0 0 9 11" fill="none" aria-hidden="true"><path d="M1.375 1.03125C1.18164 1.03125 1.03125 1.18164 1.03125 1.375V9.625C1.03125 9.81836 1.18164 9.96875 1.375 9.96875H6.875C7.06836 9.96875 7.21875 9.81836 7.21875 9.625V4.46875H5.32812C4.46875 4.46875 3.78125 3.78125 3.78125 2.92188V1.03125H1.375ZM4.8125 1.46094V2.92188C4.8125 3.20117 5.04883 3.4375 5.32812 3.4375H6.78906L4.8125 1.46094ZM1.375 0H4.25391C4.61914 0 4.96289 0.150391 5.2207 0.408203L7.8418 3.0293C8.09961 3.28711 8.25 3.65234 8.25 4.01758V9.625C8.25 10.377 7.62695 11 6.875 11H1.375C0.623047 11 0 10.377 0 9.625V1.375C0 0.623047 0.623047 0 1.375 0ZM2.57812 5.5H5.67188C5.95117 5.5 6.1875 5.73633 6.1875 6.01562C6.1875 6.29492 5.95117 6.53125 5.67188 6.53125H2.57812C2.29883 6.53125 2.0625 6.29492 2.0625 6.01562C2.0625 5.73633 2.29883 5.5 2.57812 5.5ZM2.57812 7.5625H5.67188C5.95117 7.5625 6.1875 7.79883 6.1875 8.07812C6.1875 8.35742 5.95117 8.59375 5.67188 8.59375H2.57812C2.29883 8.59375 2.0625 8.35742 2.0625 8.07812C2.0625 7.79883 2.29883 7.5625 2.57812 7.5625Z" fill="currentColor"/></svg>',
    lvl: {
      essentials: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 4.5 6v5.5c0 4.2 3 7.6 7.5 9.5 4.5-1.9 7.5-5.3 7.5-9.5V6L12 3Z"/><path d="m8.8 12 2.4 2.4 4-4.4"/></svg>',
      insights: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M12 8.5V12M12 12 7 15.6M12 12l5 3.6"/></svg>',
      complete: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z"/><path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5"/></svg>',
      finder: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg>',
      manual: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z"/><path d="m14.5 7.5 3 3"/></svg>'
    }
  };

  /* ------------------------------------------------------------ shells --- */

  /* A chunk of thread, inside a shell carrying the attributes the CSS reads. */
  function pane(inner, attrs, cls) {
    return '<div class="d1-shell" data-d3-chat="open" data-d3-chat-mode="kyb"' + (attrs || "") + '>' +
      '<div class="d3-chat-pane dx-panelbox' + (cls ? " " + cls : "") + '" style="display:block;margin:0;box-shadow:none;min-width:0">' +
      '<div class="d1-thread">' + inner + "</div></div></div>";
  }

  function sheet(inner) { return '<div class="dx-sheet">' + inner + "</div>"; }
  function cap(t) { return '<p class="dx-caption">' + t + "</p>"; }

  function iconBtn(icon, label, cls, attrs) {
    return '<button type="button" class="tds-icon-btn tds-icon-btn--sm ' + (cls || "tds-icon-btn--invisible") +
      '" aria-label="' + label + '"' + (attrs || "") + '><span class="tds-icon-btn__icon">' + icon + "</span></button>";
  }

  function user(text) { return '<section class="d1-turn"><div class="d1-user"><p>' + text + "</p></div></section>"; }
  function ai(text, style) { return '<div class="d1-ai"' + (style ? ' style="' + style + '"' : "") + ">" + text + "</div>"; }

  /* ---------------------------------------------------------- fragments --- */

  function composer(placeholder, voicePressed, showAttach) {
    return '<div class="d3-chat-pane__composer"><form class="d1-prompt d3-pane-idle-form" action="#" onsubmit="return false">' +
      '<div class="d1-prompt__field"><textarea class="d1-prompt__input" rows="1" placeholder="' + placeholder +
      '" aria-label="' + placeholder + '"></textarea></div>' +
      '<div class="d1-prompt__bar">' +
      iconBtn(I.plus, "Add attachment", "tds-icon-btn--invisible tds-icon-btn--circular", showAttach ? "" : " hidden") +
      '<div class="d1-prompt__actions">' +
      iconBtn(I.mic, "Voice input", "tds-icon-btn--invisible tds-icon-btn--circular", ' aria-pressed="' + (voicePressed ? "true" : "false") + '"') +
      iconBtn(I.send, "Send", "tds-icon-btn--secondary tds-icon-btn--circular") +
      "</div></div></form>" +
      '<p class="d1-composer__note">Tru AI can make mistakes. Please double-check responses.</p></div>';
  }

  function promptCard(title, desc) {
    return '<button type="button" class="d3-prompt-card"><span class="d3-prompt-card__text">' +
      '<span class="d3-prompt-card__title">' + title + "</span>" +
      '<span class="d3-prompt-card__desc">' + desc + "</span></span>" +
      '<span class="d3-prompt-card__arrow" aria-hidden="true">' + I.arrow + "</span></button>";
  }

  function identRow(title, status, icon, orbMode) {
    return '<div class="d3-ai-ident"><span class="d3-ai-ident__orb" data-orb="' + (orbMode || "idle") + '"></span>' +
      '<span class="d3-ai-ident__copy"><span class="d3-ai-ident__title">' + title + "</span>" +
      '<span class="d3-ai-ident__status"><span class="d3-ai-ident__status-icon' + (icon ? "" : " is-empty") + '"' +
      (icon ? "" : " hidden") + ' aria-hidden="true">' + (icon || "") + "</span>" +
      "<span>" + status + "</span></span></span></div>";
  }

  function wizTop(count, done, total, chips, saved) {
    if (saved) {
      return '<div class="d3-kyb-wiz__top"><div class="d3-kyb-wiz__head">' +
        '<span class="d3-kyb-wiz__count d3-kyb-wiz__count--default">' +
        '<svg class="d3-kyb-wiz__check" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="6.25"/><path d="m5.4 8.2 1.8 1.8 3.4-3.6"/></svg>' +
        'Your default product</span>' +
        '<button type="button" class="tds-btn tds-btn--sm tds-btn--secondary">Edit</button></div>' +
        '<div class="d3-kyb-wiz__chips"><span class="d3-kyb-wiz__chip is-static is-default"><span>' + saved + "</span></span></div></div>";
    }
    var dots = "";
    for (var i = 0; i < total; i++) dots += '<span class="d3-kyb-wiz__dot' + (i < done ? " is-done" : i === done ? " is-now" : "") + '"></span>';
    return '<div class="d3-kyb-wiz__top"><div class="d3-kyb-wiz__head">' +
      '<span class="d3-kyb-wiz__count">' + count + "</span>" +
      '<span class="d3-kyb-wiz__dots">' + dots + "</span></div>" +
      ((chips && chips.length)
        ? '<div class="d3-kyb-wiz__chips">' + chips.map(function (c) {
            return '<button type="button" class="d3-kyb-wiz__chip"><span>' + c + '</span><i aria-hidden="true">✎</i></button>';
          }).join("") + "</div>"
        : "") + "</div>";
  }

  /* One wizard card: top (count, dots, answered chips), body, footer. */
  function wizCard(o) {
    var foot = "";
    if (o.back || o.next) {
      foot = '<div class="d3-kyb-wiz__foot">' +
        (o.back ? '<button type="button" class="d3-kyb-wiz__back">\u2039 Back</button>' : "") +
        (o.next ? '<button type="button" class="tds-btn tds-btn--primary tds-btn--md">Continue</button>' : "") +
        "</div>";
    }
    return '<div class="d1-ai d3-kyb-agent-wrap d3-kyb-wizard">' + wizTop(o.count, o.done, o.total, o.chips) +
      '<div class="d3-kyb-wiz__body">' + o.body + "</div>" + foot + "</div>";
  }

  /* The agent's two-line reply at the top of a wizard question. */
  function wizReply(lead, sub) {
    return '<div class="ai-reply"><p class="ai-reply__lead">' + lead + "</p>" +
      (sub ? '<p class="ai-reply__sub">' + sub + "</p>" : "") + "</div>";
  }

  /* Business Finder vs manual entry — two rows, no cost lines. */
  function finderChoice(picked) {
    return '<div class="d3-ai-selector d3-kyb-choicelist"><div class="d3-ai-selector__rows">' +
      '<button type="button" class="d3-ai-selector__row' + (picked === "on" ? " is-on" : "") + '">' +
      '<span class="d3-ai-selector__mark" aria-hidden="true">' + I.lvl.finder + "</span>" +
      '<span class="d3-ai-selector__copy"><span class="ai-cand__name">Use Business Finder</span>' +
      '<span class="d3-ai-selector__addr">Search the Secretary of State business registry and choose from the matches</span>' +
      "</span></button>" +
      '<button type="button" class="d3-ai-selector__row' + (picked === "off" ? " is-on" : "") + '">' +
      '<span class="d3-ai-selector__mark" aria-hidden="true">' + I.lvl.manual + "</span>" +
      '<span class="d3-ai-selector__copy"><span class="ai-cand__name">Enter details manually</span>' +
      '<span class="d3-ai-selector__addr">Type the entity\u2019s name, number and address yourself</span>' +
      "</span></button></div></div>";
  }

  /* ---- Business Risk Horizon, added after a verification ---- */

  var BRH_ICON = {
    warn: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M8 2.5 14 13.5H2L8 2.5z"></path><path d="M8 6.5v3.5" stroke-linecap="round"></path><circle cx="8" cy="11.75" r=".6" fill="currentColor"></circle></svg>',
    info: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="8" cy="8" r="5.5"></circle><path d="M8 5v3.5" stroke-linecap="round"></path><circle cx="8" cy="11.25" r=".6" fill="currentColor"></circle></svg>',
    ok: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="8" cy="8" r="5.5"></circle><path d="m5.5 8.1 1.85 1.85 3.65-3.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
  };

  var BRH_FINDINGS = [
    ["warn", "Business Model 84/100: credit default risk + payment delinquencies"],
    ["warn", "Financial Health 68/100: recent payment delinquencies reported"],
    ["info", "Governance &amp; Compliance 52/100: offshore ownership with limited transparency"],
    ["ok", "Fraud &amp; Financial Crimes: no sanctions or watchlist matches"],
    ["ok", "Third-Party &amp; Market: no supplier or customer dispute records"]
  ];

  /* The score card the chat posts once a run is viewed. */
  function brhReplyCard(o) {
    var list = BRH_FINDINGS.map(function (f) {
      var mod = f[0] === "info" ? " kyb-tab-summary__finding-icon--intermediate"
              : f[0] === "ok" ? " kyb-tab-summary__finding-icon--positive" : "";
      return '<li class="kyb-tab-summary__finding">' +
        '<span class="kyb-tab-summary__finding-icon' + mod + '" aria-hidden="true">' + BRH_ICON[f[0]] + "</span>" +
        '<span class="kyb-tab-summary__finding-text">' + f[1] + "</span></li>";
    }).join("");
    return '<section class="d1-turn"><div class="d1-ai d1-block d3-brh-reply"><div class="d3-brh-reply__card">' +
      '<div class="d3-brh-reply__section d3-brh-reply__head"><span class="d3-brh-reply__head-copy">' +
      '<span class="d3-rc__label text-label-sm-uppercase">Business Risk Horizon Score' + (o.run ? " · run " + o.run : "") + "</span>" +
      '<span class="d3-rc__scoreval"><b class="d3-rc__score-num">' + o.score + "</b>" +
      '<span class="d3-rc__score-label d3-rc__score-label--intermediate">' + o.label + "</span></span></span>" +
      '<button type="button" class="tds-btn tds-btn--primary tds-btn--md">View</button></div>' +
      '<div class="d3-brh-reply__section"><span class="d3-rc__label text-label-sm-uppercase">Key findings</span>' +
      '<ul class="d3-brh-reply__list">' + list + "</ul></div>" +
      '<div class="d3-brh-reply__section d3-brh-reply__txn"><span class="d3-rc__label text-label-sm-uppercase">Transaction ID</span>' +
      '<span class="d3-brh-reply__txid text-body-xs">' + o.tx + "</span>" +
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--sm">Copy</button></div>' +
      "</div></div></section>";
  }

  /* The confirmation dialog, shown in place rather than as an overlay. */
  function brhDialog(again) {
    /* --inline keeps the panel in the flow instead of pinning it to the viewport. */
    return '<div class="dx-dialog tds-dialog tds-dialog--inline tds-dialog--center tds-dialog--md tds-dialog--open d3-kyb-brh-dialog">' +
      '<div class="tds-dialog__panel" role="dialog" aria-modal="true">' +
      '<header class="tds-dialog__header"><div class="tds-dialog__header-row">' +
      '<h2 class="tds-dialog__title">Run Business Risk Horizon' + (again ? " again" : "") + "?</h2>" +
      '<button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss dialog">' +
      '<span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button>' +
      '</div><div class="tds-dialog__divider" role="presentation"></div></header>' +
      '<div class="tds-dialog__body">' +
      '<p class="d3-kyb-brh-dialog__text">This runs Business Risk Horizon ' + (again ? "again " : "") +
      'for <b>Meridian Industrial Holdings LLC</b>.</p>' +
      '<ul class="d3-kyb-brh-dialog__list">' +
      (again
        ? "<li>It creates a new transaction, with a new Transaction ID. The earlier runs stay as they are.</li>" +
          "<li>Compare the new score with the earlier ones in the list of runs.</li>"
        : "<li>It runs as its own transaction, with a new Transaction ID.</li>" +
          "<li>The verification, package and add-ons already run are not run again or changed.</li>") +
      "</ul></div>" +
      '<footer class="tds-dialog__footer"><div class="tds-dialog__footer-row tds-dialog__footer-row--actions-only">' +
      '<div class="tds-dialog__footer-meta"></div><div class="tds-dialog__actions">' +
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md">Cancel</button>' +
      '<button type="button" class="tds-btn tds-btn--primary tds-btn--md">' + (again ? "Run again" : "Run Business Risk Horizon") + "</button>" +
      "</div></div></footer></div></div>";
  }

  /* The workspace Overview's Suggested Actions block. */
  function suggestedActions(label, again) {
    var cta = again
      ? '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md d3-brh-again"><span class="tds-btn__leading-icon" aria-hidden="true">' +
        '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M13 8a5 5 0 1 1-1.5-3.55M13 2.75v3h-3"/></svg></span>' + label + "</button>" +
        '<div class="d3-brh-split"><button type="button" class="tds-btn tds-btn--secondary tds-btn--md d3-brh-split__main">View Latest Score</button></div>'
      : '<button type="button" class="tds-btn tds-btn--primary tds-btn--md d3-brh-hero-cta"><span class="tds-btn__leading-icon" aria-hidden="true">' +
        '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg></span>' + label + "</button>";
    return '<div class="d3h-suggested" aria-label="Suggested actions"><p class="d3h-section-label">Suggested Actions</p>' +
      '<div class="d3h-suggested__ctas">' + cta + "</div></div>";
  }

  /* Verification levels, exactly as the product renders them now. */
  var LEVELS = [
    { id: "essentials", name: "Business Essentials", note: "Existence &amp; BRN" },
    { id: "insights", name: "Business Insights", note: "First-level UBO &amp; directors", badge: "Default" },
    { id: "complete", name: "Business Complete", note: "Deep hierarchy &amp; multi-tier traversal" }
  ];

  function levelList(selected) {
    return '<div class="d3-ai-selector d3-kyb-choicelist" role="radiogroup" aria-label="Product"><div class="d3-ai-selector__rows">' +
      LEVELS.map(function (p) {
        return '<button type="button" class="d3-ai-selector__row' + (p.id === selected ? " is-on" : "") +
          '" role="radio" aria-checked="' + (p.id === selected ? "true" : "false") + '">' +
          '<span class="d3-ai-selector__mark" aria-hidden="true">' + I.lvl[p.id] + "</span>" +
          '<span class="d3-ai-selector__copy"><span class="ai-cand__name">' + p.name +
          (p.badge ? ' <span class="d3-kyb-choicelist__badge">' + p.badge + "</span>" : "") + "</span>" +
          '<span class="d3-ai-selector__addr">' + p.note + "</span></span></button>";
      }).join("") + "</div></div>";
  }

  /* Add-ons offered per level — Essentials none, Complete drops the two
     ownership-discovery modules it already covers. */
  var ADDONS = {
    essentials: [],
    insights: ["web", "ubo", "ubopsc", "risk"],
    complete: ["web", "risk"]
  };
  var ADDON_NAME = {
    web: ["Web Insights", ""],
    ubo: ["UBO Discovery", ""],
    ubopsc: ["UBO and PSC Discovery", ""],
    risk: ["Business Risk Horizon", "5-domain AI risk scoring (Fraud, Financial Health, Digital Signals)"]
  };

  function addonGroup(level, checked) {
    var ids = ADDONS[level] || ADDONS.insights;
    var on = checked || ["risk"];
    if (!ids.length) return "";
    return '<div class="d3-kyb-gap"><div class="d3-kyb-addons" role="group" aria-label="Add-ons">' +
      '<div class="d3-kyb-addons__title">Select Add Ons</div>' +
      ids.map(function (id) {
        var a = ADDON_NAME[id];
        return '<label class="d3-kyb-addon"><input type="checkbox" class="tds-checkbox"' + (on.indexOf(id) !== -1 ? " checked" : "") + ">" +
          '<span class="d3-kyb-addon__body"><span class="d3-kyb-addon__name">' + a[0] + "</span>" +
          (a[1] ? '<span class="d3-kyb-addon__note">' + a[1] + "</span>" : "") + "</span></label>";
      }).join("") + "</div></div>";
  }

  function selector(title, chips, rows, pager) {
    /* [data-d3-ai-selector] is what the real CSS keys the row-icon hiding to. */
    return '<div class="d3-kyb-cand-panel"><div class="d3-ai-selector" data-d3-ai-selector>' +
      '<p class="d3-ai-selector__title">' + title + "</p>" +
      '<div class="d3-ai-selector__body">' +
      '<div class="d3-ai-selector__chips">' + chips.map(function (c) {
        return '<button type="button" class="d3-ai-selector__chip' + (c[2] ? " is-on" : "") + '">' + c[0] +
          '<span class="d3-ai-selector__count">' + c[1] + "</span></button>";
      }).join("") + "</div>" +
      '<div class="d3-ai-selector__rows">' + rows.map(function (r) {
        return '<button type="button" class="d3-ai-selector__row' + (r[3] ? " is-on" : "") + '">' +
          '<span class="d3-ai-selector__mark" aria-hidden="true"><i class="fa-regular fa-building"></i></span>' +
          '<span class="d3-ai-selector__copy"><span class="ai-cand__name">' + r[0] + "</span>" +
          '<span class="d3-ai-selector__addr">' + r[1] + "</span>" +
          '<span class="d3-ai-selector__reg">' + r[2] + "</span></span></button>";
      }).join("") + "</div>" +
      (pager
        ? '<div class="d3-ai-selector__pager"><span>' + pager + "</span>" +
          '<span class="d3-ai-selector__pages">' +
          '<button type="button" class="d3-ai-selector__page" disabled aria-label="Previous businesses">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10 3 5 8l5 5"/></svg></button>' +
          '<button type="button" class="d3-ai-selector__page" aria-label="Next businesses">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M6 3l5 5-5 5"/></svg></button>' +
          "</span></div>"
        : "") +
      "</div></div></div>";
  }

  function confirmCard(rows, scopeLabel) {
    return '<div class="tds-announcement tds-announcement--info d1-confirm"><div class="tds-announcement__content">' +
      '<ul class="d3-kyb-review">' + rows.map(function (r) {
        return "<li><b>" + r[0] + "</b>" + r[1] + "</li>";
      }).join("") + "</ul>" +
      '<div class="tds-announcement__actions">' +
      '<button type="button" class="tds-btn tds-btn--md tds-btn--primary">Verify</button>' +
      '<button type="button" class="tds-btn tds-btn--md tds-btn--secondary">Edit</button>' +
      '<button type="button" class="tds-btn tds-btn--md tds-btn--invisible">Cancel</button>' +
      "</div></div></div>";
  }

  function nextList(items) {
    return '<div class="d3-ai-next d3-ai-next--list" role="group" aria-label="Continue your investigation">' +
      '<div class="d3-ai-next__list">' + items.map(function (t) {
        return '<button type="button" class="d3-ai-next__btn"><span class="d3-ai-next__text">' + t + "</span>" +
          '<span class="d3-ai-next__arrow" aria-hidden="true">' + I.arrow + "</span></button>";
      }).join("") + "</div></div>";
  }

  function tabs(items, active) {
    return '<div class="d3-kyb-tabs" role="tablist">' + items.map(function (t, i) {
      return '<button type="button" class="d3-kyb-tabs__item' + (i === (active || 0) ? " is-active" : "") +
        '" role="tab" aria-selected="' + (i === (active || 0)) + '">' + t + "</button>";
    }).join("") + "</div>";
  }

  /* The panel header as the product renders it: orb, title, status, tools. */
  function panelHead(title, status, orbMode) {
    return '<div class="d3-chat-pane__head" style="margin-bottom:0">' +
      identRow(title, status, null, orbMode) +
      '<div class="d3-chat-pane__tools">' +
      iconBtn(I.newChat, "New Chat", "tds-icon-btn--invisible tds-icon-btn--circular d3-chat-pane__new", ' data-tooltip="New Chat" data-d3-chat-new data-d3-chat-back') +
      iconBtn(I.expand, "Expand", "tds-icon-btn--invisible tds-icon-btn--circular d3-chat-pane__expand", ' data-tooltip="Expand" data-d3-chat-expand aria-pressed="false"') +
      iconBtn(I.minimize, "Minimize", "tds-icon-btn--invisible d3-chat-pane__close", ' data-tooltip="Minimize" data-d3-chat-close') +
      "</div></div>";
  }

  /* ---- Transactions agent pieces, markup as js/d3-tx-agent.js builds it ---- */
  var THINK_SVG = "<svg class=\"d1-thinking__svg\" viewBox=\"0 0 48.759 40\" fill=\"currentColor\"> <circle cx=\"2.371\" cy=\"16.893\" r=\"1.456\" style=\"animation-delay:-1.180s\"/> <circle cx=\"4.527\" cy=\"11.232\" r=\"1.284\" style=\"animation-delay:-1.312s\"/> <circle cx=\"7.886\" cy=\"6.714\" r=\"1.154\" style=\"animation-delay:-1.437s\"/> <circle cx=\"12.305\" cy=\"3.384\" r=\"1.014\" style=\"animation-delay:-1.564s\"/> <circle cx=\"16.667\" cy=\"1.59\" r=\"0.766\" style=\"animation-delay:-1.675s\"/> <circle cx=\"25.191\" cy=\"1.591\" r=\"0.727\" style=\"animation-delay:-1.886s\"/> <circle cx=\"29.645\" cy=\"1.008\" r=\"0.692\" style=\"animation-delay:-1.995s\"/> <circle cx=\"34.03\" cy=\"1.591\" r=\"0.729\" style=\"animation-delay:-2.097s\"/> <circle cx=\"38.2\" cy=\"3.384\" r=\"1.012\" style=\"animation-delay:-2.198s\"/> <circle cx=\"42.263\" cy=\"6.714\" r=\"1.149\" style=\"animation-delay:-2.312s\"/> <circle cx=\"45.147\" cy=\"11.232\" r=\"1.284\" style=\"animation-delay:-2.427s\"/> <circle cx=\"46.721\" cy=\"16.893\" r=\"1.456\" style=\"animation-delay:-2.552s\"/> <circle cx=\"46.395\" cy=\"23.102\" r=\"1.455\" style=\"animation-delay:-0.067s\"/> <circle cx=\"44.236\" cy=\"28.767\" r=\"1.283\" style=\"animation-delay:-0.199s\"/> <circle cx=\"40.874\" cy=\"33.281\" r=\"1.153\" style=\"animation-delay:-0.325s\"/> <circle cx=\"36.449\" cy=\"36.609\" r=\"1.014\" style=\"animation-delay:-0.452s\"/> <circle cx=\"32.105\" cy=\"38.397\" r=\"0.769\" style=\"animation-delay:-0.562s\"/> <circle cx=\"23.571\" cy=\"38.401\" r=\"0.731\" style=\"animation-delay:-0.774s\"/> <circle cx=\"19.124\" cy=\"38.989\" r=\"0.693\" style=\"animation-delay:-0.882s\"/> <circle cx=\"14.737\" cy=\"38.401\" r=\"0.732\" style=\"animation-delay:-0.984s\"/> <circle cx=\"10.571\" cy=\"36.609\" r=\"1.012\" style=\"animation-delay:-1.085s\"/> <circle cx=\"6.497\" cy=\"33.281\" r=\"1.151\" style=\"animation-delay:-1.199s\"/> <circle cx=\"3.611\" cy=\"28.767\" r=\"1.282\" style=\"animation-delay:-1.314s\"/> <circle cx=\"2.042\" cy=\"23.105\" r=\"1.459\" style=\"animation-delay:-1.439s\"/> <circle cx=\"10.901\" cy=\"16.891\" r=\"1.413\" style=\"animation-delay:-1.221s\"/> <circle cx=\"13.062\" cy=\"11.214\" r=\"1.26\" style=\"animation-delay:-1.429s\"/> <circle cx=\"16.425\" cy=\"6.714\" r=\"1.154\" style=\"animation-delay:-1.607s\"/> <circle cx=\"20.838\" cy=\"3.381\" r=\"1.014\" style=\"animation-delay:-1.765s\"/> <circle cx=\"33.732\" cy=\"6.714\" r=\"1.151\" style=\"animation-delay:-2.159s\"/> <circle cx=\"36.625\" cy=\"11.214\" r=\"1.261\" style=\"animation-delay:-2.320s\"/> <circle cx=\"38.193\" cy=\"16.891\" r=\"1.413\" style=\"animation-delay:-2.512s\"/> <circle cx=\"37.865\" cy=\"23.097\" r=\"1.413\" style=\"animation-delay:-0.108s\"/> <circle cx=\"35.704\" cy=\"28.766\" r=\"1.261\" style=\"animation-delay:-0.316s\"/> <circle cx=\"32.34\" cy=\"33.281\" r=\"1.151\" style=\"animation-delay:-0.494s\"/> <circle cx=\"27.921\" cy=\"36.609\" r=\"1.012\" style=\"animation-delay:-0.652s\"/> <circle cx=\"15.023\" cy=\"33.281\" r=\"1.151\" style=\"animation-delay:-1.047s\"/> <circle cx=\"12.134\" cy=\"28.766\" r=\"1.261\" style=\"animation-delay:-1.208s\"/> <circle cx=\"10.574\" cy=\"23.097\" r=\"1.413\" style=\"animation-delay:-1.399s\"/> </svg>";
  var CLOCK = '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5"/>' +
    '<path d="M8 4.75V8.25L10.25 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* The panel in Transactions mode, header included. */
  function txPanel(inner, title, status, orbMode) {
    return '<div class="d1-shell" data-d3-chat="open" data-d3-chat-mode="tx" data-d3-ai-orb="header">' +
      '<aside class="d3-chat-pane dx-panelbox" style="display:flex;margin:0;box-shadow:none;min-width:0;padding:16px">' +
      panelHead(title, status, orbMode) +
      '<div class="d1-thread" style="margin-top:12px">' + inner + "</div></aside></div>";
  }

  /* The empty landing: hello, sub line, the three prompt cards, the composer. */
  function txLanding() {
    var cards = [["Show not verified transactions", "Filter the table to not verified results"],
                 ["Find high-risk transactions", "Surface high-risk rows in view"],
                 ["Summarize last 7 days activity", "Filter the table to the last 7 days"]];
    return '<div class="d1-shell" data-d3-chat="open" data-d3-chat-mode="tx" data-d3-ai-step="landing" data-d3-ai-landing="large" data-d3-ai-orb="hero">' +
      '<aside class="d3-chat-pane dx-panelbox" style="display:flex;margin:0;box-shadow:none;min-width:0;padding:16px">' +
      panelHead("TruAI", "Awaiting input", "idle").replace('d3-chat-pane__new"', 'd3-chat-pane__new" hidden') +
      '<div class="d3-chat-pane__empty"><div class="d3-ai-hero" data-hero-orb="idle"></div>' +
      '<div><p class="d3-chat-pane__hello">What would you like to investigate?</p>' +
      '<p class="d3-chat-pane__sub">Ask about failed checks, reviews, or a specific transaction.</p></div>' +
      '<div class="d3-chat-pane__prompts">' + cards.map(function (c) { return promptCard(c[0], c[1]); }).join("") + "</div></div>" +
      composer("Ask about transactions", false, false) + "</aside></div>";
  }

  function txThinking(label) {
    return '<div class="d1-thinking" role="status"><span class="d1-thinking__orb" aria-hidden="true">' + THINK_SVG +
      '</span><span class="d1-thinking__text">' + label + "</span></div>";
  }

  function txReply(html) { return '<div class="d1-ai d3-tx-agent-wrap">' + html + "</div>"; }

  /* Follow-up suggestions, the rows under the thread. */
  function txFollow(items) {
    return '<div class="d1-follow is-on" role="group" aria-label="Continue your investigation">' + items.map(function (t) {
      return '<button type="button" class="d1-suggest-row"><span>' + t + "</span>" + I.arrow + "</button>";
    }).join("") + "</div>";
  }

  /* The matches: a count line, an intro, a compact Transaction / Outcome table. */
  function txList(label, intro, rows, more) {
    var n = rows.length + (more || 0);
    var html = '<div class="d3-tx-agent"><p class="d3-tx-agent__found">Found ' + n + " " + (n === 1 ? "transaction" : "transactions") +
      (label ? " · " + label : "") + "</p><p>" + intro + "</p>";
    if (!rows.length) {
      return html + '<div class="tds-announcement tds-announcement--info d3-tx-agent__empty">' +
        '<span class="tds-announcement__icon" aria-hidden="true"><svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="m3 13 6.5-6.5M10.5 3l.7 1.8L13 5.5l-1.8.7L10.5 8l-.7-1.8L8 5.5l1.8-.7L10.5 3ZM4 4.5l.4 1 .9.4-.9.4L4 7.5l-.4-1-.9-.4.9-.4L4 4.5Z"/></svg></span>' +
        '<div class="tds-announcement__content"><p class="tds-announcement__message">Nothing in the current dataset matched that request. I only use the transactions shown in this demo — I won’t invent rows.</p></div></div></div>';
    }
    return html + '<div class="tds-data-table-container d3-tx-agent__table"><div class="tds-data-table__wrapper">' +
      '<table class="tds-data-table tds-data-table--compact"><thead><tr><th>Transaction</th><th>Outcome</th></tr></thead><tbody>' +
      rows.map(function (r) {
        var pending = r[1] === "In Progress" || r[1] === "Review" || r[1] === "Pending Review";
        var tone = pending ? "intermediate" : r[1] === "Not Verified" ? "negative" : r[1] === "Verified" ? "positive" : "neutral";
        return '<tr><td class="tds-data-table__text-cell">' + r[0] + '</td><td><span class="tds-tag tds-tag--' + tone + '">' +
          (pending ? '<span class="tds-tag__leading-visual">' + CLOCK + "</span>" : "") + r[1] + "</span></td></tr>";
      }).join("") + "</tbody></table></div></div>" +
      (more ? '<p class="d3-tx-agent__more">+' + more + " more in the table</p>" : "") +
      "<p>The table is filtered to these results. Select a row there to open the full report on the right.</p></div>";
  }

  /* The "Activity summary" card — label / value rows, toned by status. */
  function txSummary(title, rows) {
    return '<section class="d1-block"><div class="d1-card"><h3 class="d1-card__title">' + title + '</h3><div class="d1-card__body">' +
      rows.map(function (r) {
        return '<div class="tds-data-field tds-data-field--horizontal' + (r[2] ? " d1-val--" + r[2] : "") + '">' +
          '<div class="tds-data-field__label-row"><p class="tds-data-field__label">' + r[0] + "</p></div>" +
          '<div class="tds-data-field__content"><div class="tds-data-field__value-row"><p class="tds-data-field__value">' + r[1] + "</p></div></div></div>";
      }).join("") + "</div></div></section>";
  }

  /* A panel with its header, for steps where the header is part of the picture. */
  function panelWithHead(title, status, orbMode, inner, attrs) {
    return '<div class="d1-shell" data-d3-chat="open" data-d3-chat-mode="kyb" data-d3-ai-orb="header"' + (attrs || "") + '>' +
      '<aside class="d3-chat-pane dx-panelbox" style="display:flex;margin:0;box-shadow:none;min-width:0;padding:16px">' +
      panelHead(title, status, orbMode) +
      '<div class="d1-thread" style="margin-top:12px">' + inner + "</div></aside></div>";
  }

  /* The portal home hero — scenery around the real home composer. The composer
     markup is the portal's own, so the layout rules in docs.css can key off it. */
  function homeHero(typed) {
    return '<div class="dx-hero"><canvas class="dx-hero__globe" data-dx-globe aria-hidden="true"></canvas><div class="dx-hero__veil" aria-hidden="true"></div>' +
      '<div class="dx-hero__body"><p class="dx-hero__hello">Welcome back, Jane.</p>' +
      '<div class="d1-composer"><form class="d1-prompt" action="#" onsubmit="return false">' +
      '<div class="d1-prompt__field">' +
      '<span class="tds-tag tds-tag--md tds-tag--default d1-prompt__ctx" aria-hidden="true">' +
      '<span class="d1-prompt__ctx-dot"></span>KYB Verification</span>' +
      '<div class="d1-prompt__entry">' +
      '<textarea class="d1-prompt__input" rows="1" aria-label="Verify a business by name or registration number">' + typed + "</textarea>" +
      "</div></div>" +
      '<div class="d1-prompt__bar"><div class="d1-prompt__actions"><div class="d1-prompt__send-wrap">' +
      '<button type="button" class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--invisible tds-icon-btn--circular d1-prompt__mic" aria-pressed="false" aria-label="Voice input">' +
      '<span class="tds-icon-btn__icon">' + I.mic + "</span></button>" +
      '<button type="submit" class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--circular d1-prompt__send tds-icon-btn--primary" aria-label="Send">'   /* --primary is added once there is text to send */ +
      '<span class="tds-icon-btn__icon">' + I.send + "</span></button>" +
      "</div></div></div></form></div>" +
      '<p class="dx-hero__note">Tru AI can make mistakes. Please double-check responses.</p></div></div>';
  }

  /* The result summary card under the report-ready header in the chat. */
  var RC_CHECK = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var RC_OPEN = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="4.75" stroke="currentColor" stroke-width="1.5"/></svg>';

  var ACTIONS = "<div class=\"d1-actions\"><button type=\"button\" class=\"tds-icon-btn tds-icon-btn--sm tds-icon-btn--invisible tds-icon-btn--circular\" aria-label=\"Share\"><span class=\"tds-icon-btn__icon\"><svg class=\"d3-fa-line\" viewBox=\"0 0 16 16\" fill=\"none\" aria-hidden=\"true\"><path stroke=\"currentColor\" stroke-width=\"1.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7 3H4.5A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5V9M9.5 2.5H13.5V6.5M13.5 2.5 7.5 8.5\"/></svg></span></button> <button type=\"button\" class=\"tds-icon-btn tds-icon-btn--sm tds-icon-btn--invisible tds-icon-btn--circular\" aria-label=\"Copy\"><span class=\"tds-icon-btn__icon\"><svg class=\"d3-fa-line\" viewBox=\"0 0 16 16\" fill=\"none\" aria-hidden=\"true\"><path stroke=\"currentColor\" stroke-width=\"1.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M5.5 5.5v-1A1.5 1.5 0 0 1 7 3h4.5A1.5 1.5 0 0 1 13 4.5V9a1.5 1.5 0 0 1-1.5 1.5h-1M3 7A1.5 1.5 0 0 1 4.5 5.5H9A1.5 1.5 0 0 1 10.5 7v4.5A1.5 1.5 0 0 1 9 13H4.5A1.5 1.5 0 0 1 3 11.5V7Z\"/></svg></span></button> <button type=\"button\" class=\"tds-icon-btn tds-icon-btn--sm tds-icon-btn--invisible tds-icon-btn--circular\" aria-label=\"Regenerate\"><span class=\"tds-icon-btn__icon\"><svg class=\"d3-fa-line\" viewBox=\"0 0 16 16\" fill=\"none\" aria-hidden=\"true\"><path stroke=\"currentColor\" stroke-width=\"1.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13 8a5 5 0 1 1-1.2-3.25M13 3.5V6.5H10\"/></svg></span></button> <button type=\"button\" class=\"tds-icon-btn tds-icon-btn--sm tds-icon-btn--invisible tds-icon-btn--circular\" aria-pressed=\"false\" aria-label=\"Good response\"><span class=\"tds-icon-btn__icon\"><svg class=\"d3-fa-line\" viewBox=\"0 0 16 16\" fill=\"none\" aria-hidden=\"true\"><path stroke=\"currentColor\" stroke-width=\"1.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M5.5 7.25 7.6 2.9A1.3 1.3 0 0 1 10 3.5v2.25h2.6a1.2 1.2 0 0 1 1.17 1.45l-.9 4.4A1.5 1.5 0 0 1 11.4 12.8H5.5m0-5.55v5.55m0-5.55H3.5v5.55h2\"/></svg></span></button> <button type=\"button\" class=\"tds-icon-btn tds-icon-btn--sm tds-icon-btn--invisible tds-icon-btn--circular\" aria-pressed=\"false\" aria-label=\"Poor response\"><span class=\"tds-icon-btn__icon\"><svg class=\"d3-fa-line\" viewBox=\"0 0 16 16\" fill=\"none\" aria-hidden=\"true\"><path stroke=\"currentColor\" stroke-width=\"1.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M5.5 8.75 7.6 13.1A1.3 1.3 0 0 0 10 12.5v-2.25h2.6a1.2 1.2 0 0 0 1.17-1.45l-.9-4.4A1.5 1.5 0 0 0 11.4 3.2H5.5m0 5.55V3.2m0 5.55H3.5V3.2h2\"/></svg></span></button></div>";

  function resultCard(o) {
    var chips = (o.checks || []).map(function (c) {
      return '<span class="d3-rc__chip is-done"><span class="d3-rc__chip-icon">' + RC_CHECK + "</span>" + c + "</span>";
    }).join("");
    var tone = o.verdictTone || "positive";
    return '<section class="d1-block"><div><h2 class="d1-report__title">' + o.name + "</h2>" +
      '<span class="d1-tag d1-tag--' + tone + '" data-d1-report-tag>' + (o.verdict || "Verified") + "</span>" +
      '<div class="d1-report__body">' +
      (o.summary ? '<div class="d1-summary"><h3>Summary</h3><p>' + o.summary + "</p></div>" : "") +
      '<div class="d1-report-ready" data-d1-report-action data-d3-rc>' +
      '<div class="d1-report-ready__card">' +
      '<span class="d1-report-ready__icon" aria-hidden="true"><i class="fa-regular fa-file-lines"></i></span>' +
      '<div class="d1-report-ready__meta">' +
      '<p class="d1-report-ready__name">' + o.name + "</p>" +
      '<p class="d1-report-ready__addr">' + o.addr + "</p>" +
      '<p class="d1-report-ready__reg">Reg. ' + o.reg + "</p></div>" +
      '<button type="button" class="tds-btn tds-btn--primary tds-btn--md">View</button>' +
      '<div class="d3-rc__body">' +
      '<div class="d3-rc__verdict"><span class="d1-tag d1-tag--' + tone + '">' + (o.verdict || "Verified") + "</span></div>" +
      (o.score
        ? '<div class="d3-rc__row d3-rc__score"><span class="d3-rc__label text-label-sm-uppercase">Business Risk Horizon Score</span>' +
          '<span class="d3-rc__scoreval"><b class="d3-rc__score-num">' + o.score + "</b>" +
          '<span class="d3-rc__score-label d3-rc__score-label--' + (o.scoreTone || "positive") + '">' + o.scoreLabel + "</span></span></div>"
        : "") +
      '<div class="d3-rc__checks"><div class="d3-rc__row">' +
      '<span class="d3-rc__label text-label-sm-uppercase">Checks reported</span>' +
      '<span class="d3-rc__chips">' + chips + "</span></div></div>" +
      '<div class="d3-rc__receipt"><div class="d3-rc__receipt-main">' +
      '<span class="d3-rc__label text-label-sm-uppercase">Transaction ID</span>' +
      '<span class="d3-rc__receipt-id text-body-sm">' + o.tx + "</span></div>" +
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--sm">Copy</button></div>' +
      "</div></div></div></div></div>" + ACTIONS + "</section>";
  }

  /* The 24-hour case: the same report-ready shell, filled with a pending body
     instead of a result — no transaction ID, because that belongs to the result. */
  function pendingCard(name, sim, done) {
    var chip = function (label, done) {
      return '<span class="d3-rc__chip' + (done ? " is-done" : "") + '"><span class="d3-rc__chip-icon">' +
        (done ? RC_CHECK : RC_OPEN) + "</span>" + label + "</span>";
    };
    var row = function (label, chips) {
      return '<div class="d3-rc__row"><span class="d3-rc__label text-label-sm-uppercase">' + label +
        '</span><span class="d3-rc__chips">' + chips + "</span></div>";
    };
    return '<section class="d1-turn"><div class="d1-ai d3-kyb-agent-wrap' + (done ? " is-done" : "") + '" data-d3-pending-msg>' +
      '<div class="d1-report-ready d3-kyb-agent__action" data-d3-rc>' +
      '<p class="d1-report-ready__title">Verification submitted. This can take up to 24 hours. ' +
      "You can keep working and I will tell you when it is ready.</p>" +
      '<div class="d1-report-ready__card">' +
      '<span class="d1-report-ready__icon" aria-hidden="true"><i class="fa-regular fa-clock"></i></span>' +
      '<div class="d1-report-ready__meta"><p class="d1-report-ready__name">' + name + "</p>" +
      '<p class="d1-report-ready__addr">In progress</p></div>' +
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md"' + (done ? ' disabled aria-disabled="true"' : "") + '>View status</button>' +
      '<div class="d3-rc__body">' +
      '<div class="d3-rc__verdict"><span class="d1-tag d1-tag--review">In Progress</span>' +
      '<span class="d3-rc__flag">Up to 24 hours</span></div>' +
      '<div class="d3-rc__checks">' + row("Checks reported", chip("Business registry", true)) +
      row("Unresolved", chip("Screening") + chip("Adverse media") + chip("Ownership")) + "</div>" +
      "</div></div>" + (sim ? simChip() : "") + "</div></div></section>";
  }

  function simChip() {
    return '<button type="button" class="d3-sim-return">Simulate verification return ' +
      '<span class="d3-sim-return__sub">for dev team review</span></button>';
  }

  /* The alert, as it floats over whatever page the user is on. */
  function readyToast(name, shortRef) {
    return '<div class="d3-toast tds-announcement tds-announcement--info" role="status" ' +
      'style="position:static;width:min(380px,100%);margin:0 auto;animation:none">' +
      '<span class="tds-announcement__icon" aria-hidden="true"><i class="fa-regular fa-bell"></i></span>' +
      '<div class="tds-announcement__content"><p class="tds-announcement__title">Verification ready</p>' +
      '<p class="tds-announcement__message">' + name + " \u00b7 Transaction " + shortRef + "</p>" +
      '<div class="tds-announcement__actions">' +
      '<button type="button" class="tds-btn tds-btn--primary tds-btn--sm">View</button></div></div>' +
      '<button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--sm tds-announcement__dismiss" aria-label="Dismiss">' +
      '<span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" ' +
      'stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button></div>';
  }

  function summaryBlock(text) {
    return '<div class="d1-summary"><h3>Summary</h3><p>' + text + "</p></div>";
  }

  window.DOCSX = { I: I, pendingCard: pendingCard, simChip: simChip, readyToast: readyToast, summaryBlock: summaryBlock, pane: pane, panelHead: panelHead, panelWithHead: panelWithHead, homeHero: homeHero, resultCard: resultCard, sheet: sheet, cap: cap, iconBtn: iconBtn, user: user, ai: ai,
    composer: composer, promptCard: promptCard, txPanel: txPanel, txLanding: txLanding, txThinking: txThinking, txReply: txReply, txFollow: txFollow, txList: txList, txSummary: txSummary, identRow: identRow, wizTop: wizTop,
    LEVELS: LEVELS, levelList: levelList, ADDONS: ADDONS, ADDON_NAME: ADDON_NAME,
    addonGroup: addonGroup, selector: selector, wizCard: wizCard, wizReply: wizReply, finderChoice: finderChoice, brhReplyCard: brhReplyCard, brhDialog: brhDialog, suggestedActions: suggestedActions, confirmCard: confirmCard, nextList: nextList, tabs: tabs };
})();

/* ========================================================= SCENARIOS ==== */
(function () {
  "use strict";
  var X = window.DOCSX, I = X.I;

  var ENTITY = "Meridian Industrial Holdings LLC";
  var BW = "Brightwater Holdings Ltd.";
  var APEX = "Meridian Apex Consulting Inc.";
  var LEVEL_NAME = { essentials: "Business Essentials", insights: "Business Insights", complete: "Business Complete" };
  var SCOPE = { essentials: "Business Essentials", insights: "Business Insights + Web Insights + UBO Discovery + Business Risk Horizon",
                complete: "Business Complete + Web Insights + Business Risk Horizon" };
  var ADDON_CHIP = { essentials: null, insights: "Web Insights, UBO Discovery, Business Risk Horizon", complete: "Web Insights, Business Risk Horizon" };
  var ECHO = { essentials: "Business Essentials · Business Finder · Meridian Industrial Holdings LLC · No add-ons",
               insights: "Business Insights · Business Finder · Meridian Industrial Holdings LLC · Web Insights + UBO Discovery + Business Risk Horizon",
               complete: "Business Complete · Business Finder · Meridian Industrial Holdings LLC · Web Insights + Business Risk Horizon" };
  var TABS = { essentials: ["Overview", "Business Details", "Match Signals"],
               insights: ["Overview", "Business Details", "Business Risk Horizon", "Match Signals"],
               complete: ["Overview", "Business Details", "Business Risk Horizon", "Match Signals", "Owners &amp; UBOs", "Web Insights"] };
  var CHECKS = { essentials: "Business registry · Screening",
                 insights: "Business registry · Screening · Business Risk Horizon",
                 complete: "Business registry · Screening · Business Risk Horizon" };

  var levelBranch = { key: "level", label: "Level", start: 1, options: [
    { id: "essentials", label: "Essentials" }, { id: "insights", label: "Insights · default" }, { id: "complete", label: "Complete" }] };

  var MATCH_ROWS = [
    ["Meridian Capital LLC", "200 Vesey Street, New York, NY 10281", "NY DOS 4417762", false],
    ["Meridian Global Partners Inc.", "1209 Orange Street, Wilmington, DE 19801", "DE File 5582014", false],
    ["Meridian Analytics Inc.", "525 Market Street, San Francisco, CA 94105", "CA SOS C4129087", false]];
  var MATCH_CHIPS = [["Chicago", 1, false], ["Dallas", 1, false], ["New York", 1, false],
                     ["San Francisco", 1, false], ["Wilmington", 1, false]];

  function activityRow(label, running, open, detail) {
    return '<div class="d1-activity' + (detail ? "" : " is-bare") + '"><button type="button" class="d1-activity__toggle' +
      (running ? " d1-activity__toggle--current" : "") + '" aria-expanded="' + (open ? "true" : "false") + '">' +
      '<span class="d1-activity__mark">' +
      (running ? '<i class="d1-spin fa-solid fa-spinner fa-spin" aria-hidden="true"></i>'
               : '<i class="fa-regular fa-circle-check" aria-hidden="true"></i>') + "</span>" +
      "<span>" + label + "</span>" + (detail ? I.chevD + I.chevU : "") + "</button>" +
      '<div class="d1-activity__body"' + (open ? "" : " hidden") + '>' +
      '<div class="d1-activity__rail"><img src="../assets/icons/divider.svg" alt="" width="1" height="68"></div>' +
      '<div class="d1-activity__detail">' + (detail || "") + "</div></div></div>";
  }

  function matchSelector() {
    return X.selector("Which “Meridian” should I investigate?", MATCH_CHIPS, MATCH_ROWS, "1-3 of 5");
  }

  var CHECK_SVG = '<svg viewBox="0 0 11 12" fill="none"><path d="M5.5 11.375C2.4707 11.375 0 8.9043 0 5.875C0 2.8457 2.4707 0.375 5.5 0.375C8.5293 0.375 11 2.8457 11 5.875C11 8.9043 8.5293 11.375 5.5 11.375ZM7.98047 4.85938C8.19922 4.64062 8.19922 4.28516 7.98047 4.06641C7.76172 3.84766 7.40625 3.84766 7.1875 4.06641L4.8125 6.44141L3.8125 5.44141C3.59375 5.22266 3.23828 5.22266 3.01953 5.44141C2.80078 5.66016 2.80078 6.01562 3.01953 6.23438L4.41797 7.63281C4.63672 7.85156 4.99219 7.85156 5.21094 7.63281L7.98047 4.85938Z" fill="currentColor"/></svg>';
  var SEARCH = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="4.5"></circle><path d="M10.5 10.5 14 14"></path></svg>';
  var CARET = '<span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="currentColor"><path d="M4 0l3.5 4h-7L4 0z"></path><path d="M4 11L.5 7h7L4 11z"></path></svg></span>';

  function stepper(onReview) {
    function item(n, label, state, cur) {
      return '<li class="tds-stepper__item tds-stepper__item--' + state + '"' + (cur ? ' aria-current="step"' : "") + '>' +
        '<div class="tds-stepper__line" aria-hidden="true"></div><div class="tds-stepper__content">' +
        '<div class="tds-stepper__label-row"><span class="tds-stepper__icon" aria-hidden="true">' +
        (state === "completed" ? STEP_CHECK : '<span class="tds-stepper__icon-badge">' + n + "</span>") + "</span>" +
        '<span class="tds-stepper__title">' + label + "</span></div></div></li>";
    }
    return '<ol class="tds-stepper tds-stepper--horizontal d3-kyb-formsteps" aria-label="Verification steps">' +
      item(1, "Details", onReview ? "completed" : "current", !onReview) +
      item(2, "Review", onReview ? "current" : "incomplete", onReview) + "</ol>";
  }

  function field(label, value, req, pre, ph) {
    return '<div class="' + (pre ? "tds-text-input tds-text-input--success" : "tds-text-input") + '">' +
      '<label class="tds-field-label">' + label + (req ? ' <span class="d3-kyb-fields__req" aria-hidden="true">*</span>' : "") + "</label>" +
      '<div class="tds-text-input__field tds-text-input__field--lg">' +
      '<input class="tds-text-input__native" type="text" readonly' + (value ? ' value="' + value + '"' : "") +
      (ph ? ' placeholder="' + ph + '"' : "") + "></div>" +
      (pre ? '<span class="tds-field-validation tds-field-validation--success"><span class="tds-field-validation__icon" aria-hidden="true">' + CHECK_SVG + "</span><span>Pre-filled</span></span>" : "") +
      "</div>";
  }

  var SAVEDLINE = '<div class="d3-kyb-defaultcfg"><div class="d3-kyb-savedline">' +
    '<span class="d3-kyb-savedline__text"><b>Default configuration</b><span>Business Insights \u00b7 BusinessInsights</span></span>' +
    '<button type="button" class="tds-btn tds-btn--md tds-btn--secondary">Edit</button></div></div>';

  var STEP_CHECK = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.707 7.293-5.5 5.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414L8.5 10.586l4.793-4.793a1 1 0 0 1 1.414 1.414z"/></svg>';
  var FIELD_CHEVRON = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>';

  function acc(open, body) {
    return '<div class="d3-kyb-fields__acc' + (open ? " is-open" : "") + '">' +
      '<button type="button" class="d3-kyb-fields__acc-head" aria-expanded="' + (open ? "true" : "false") + '">' +
      '<span class="d3-kyb-fields__acc-chevron" aria-hidden="true">' + FIELD_CHEVRON + "</span>" +
      '<span class="d3-kyb-fields__acc-title">View all fields</span></button>' +
      '<div class="d3-kyb-fields__acc-body"><div class="d3-kyb-fields__list">' + (body || "") + "</div></div></div>";
  }

  var ACC = acc(false);

  /* A zone of the form, as the real renderer wraps it. */
  function zone(id, title, inner) {
    return '<section class="d3-kyb-fields__zone" data-d3-zone="' + id + '" aria-label="' + title + '"><div class="d3-kyb-fields__grid">' + inner + "</div></section>";
  }

  var ADDRESS_EMPTY = zone("address", "Registered address",
    field("Address Line 1", "") + field("Address Line 2", "") + field("City", "") + field("Postal Code", ""));

  var SECOND_ADDRESS = ["Second Address 1", "Second Unit Number", "Second Building Number", "Second Building Name", "Second Street Name",
                        "Second Street Type", "Second City", "Second Suburb", "Second County", "Second State", "Second Postal Code"];
  var PSC = '<div class="d3-kyb-fields__group"><p class="d3-kyb-fields__group-title">Persons of Significant Control (PSC)</p>' +
    '<div class="d3-kyb-fields__psc"><div class="d3-kyb-fields__psc-head"><p class="d3-kyb-fields__group-sub">PSC 1</p></div>' +
    '<div class="d3-kyb-fields__grid">' + ["First Name", "Last Name", "Full Name", "Business Name"].map(function (l) { return field(l, ""); }).join("") + "</div></div>" +
    '<button type="button" class="tds-btn tds-btn--sm tds-btn--secondary d3-kyb-fields__psc-add">Add another PSC</button></div>';

  /* One group inside View all fields: a title and a grid of empty optional fields. */
  function fieldGroup(title, labels, filled) {
    return '<div class="d3-kyb-fields__group"><p class="d3-kyb-fields__group-title">' + title + "</p>" +
      '<div class="d3-kyb-fields__grid">' + labels.map(function (l) {
        return field(l, (filled && filled[l]) || "", false, !!(filled && filled[l]));
      }).join("") + "</div></div>";
  }

  /* The three verification levels as the radio cards the manual form draws. */
  function levelCards(current) {
    return '<div class="vb-prefill dx-noanim"><div class="d3-kyb-defaultcfg"><div class="d3-kyb-defaultcfg__edit">' +
      '<p class="d3-kyb-defaultcfg__title">Default configuration</p>' +
      '<div class="d3-kyb-pkg"><div class="d3-kyb-addons__title">Select Verification Level</div>' +
      '<div class="d3-kyb-pkgcards" role="radiogroup" aria-label="Verification level">' +
      X.LEVELS.map(function (p) {
        var on = p.id === current;
        return '<span class="tds-radio-card' + (on ? " tds-radio-card--selected" : "") + '" role="radio" aria-checked="' + on + '">' +
          '<input type="radio" class="tds-radio"' + (on ? " checked" : "") + ' aria-hidden="true" readonly>' +
          '<span class="tds-radio-card__content">' +
          '<span class="tds-radio-card__label-row"><span class="tds-radio-card__label">' + p.name + "</span>" +
          (p.badge ? ' <span class="tds-tag tds-tag--sm tds-tag--positive">' + p.badge + "</span>" : "") + "</span>" +
          '<span class="tds-radio-card__description">' + p.note + "</span>" +
          (on ? subSelect("BusinessInsights") : "") + "</span></span>";
      }).join("") + "</div></div>" +
      '<button type="button" class="tds-btn tds-btn--md tds-btn--primary d3-kyb-defaultcfg__done">Done</button></div></div></div>';
  }

  function subSelect(value) {
    return '<span class="d3-kyb-pkgcards__sub"><span class="d3-kyb-pkgcards__sublabel">Package</span>' +
      '<span class="tds-select tds-select--interactive">' +
      '<button type="button" class="tds-select__trigger tds-select__trigger--md" aria-haspopup="listbox" aria-expanded="false">' +
      '<span class="tds-select__value">' + value + "</span>" +
      '<span class="tds-select__trailing-group">' + CARET + "</span></button></span></span>";
  }

  /* Business Finder: the button, and the candidate list it opens. */
  function finder(ready) {
    return '<div class="d3-kyb-find">' +
      '<button type="button" class="tds-btn tds-btn--md tds-btn--secondary d3-kyb-find__btn"' +
      (ready ? "" : ' aria-disabled="true"') + '>' +
      '<span class="d3-kyb-find__icon">' + SEARCH + "</span>Business Finder</button>" +
      (ready ? "" : '<p class="d3-kyb-find__hint">Business Finder needs a jurisdiction and either a business name or a BRN.</p>') + "</div>";
  }

  function finderResults(total, rows, from, to) {
    return '<div class="d3-kyb-find"><button type="button" class="tds-btn tds-btn--md tds-btn--secondary d3-kyb-find__btn">' +
      '<span class="d3-kyb-find__icon">' + SEARCH + "</span>Business Finder</button>" +
      '<div class="d3-kyb-find__results">' +
      '<div class="d3-kyb-find__head"><span>' + total + ' matches</span>' +
      '<button type="button" class="d3-kyb-find__close">Hide</button></div>' +
      rows.map(function (r) {
        return '<button type="button" class="d3-kyb-find__card">' +
          '<span class="d3-kyb-find__name">' + r[0] + "</span>" +
          '<span class="d3-kyb-find__line">' + r[1] + "</span>" +
          '<span class="d3-kyb-find__line">' + r[2] + "</span></button>";
      }).join("") +
      '<div class="d3-ai-selector__pager"><span>' + from + "-" + to + " of " + total + "</span>" +
      '<span class="d3-ai-selector__pages">' +
      '<button type="button" class="d3-ai-selector__page" disabled aria-label="Previous matches">' + I.pagerL + "</button>" +
      '<button type="button" class="d3-ai-selector__page" aria-label="Next matches">' + I.pagerR + "</button></span></div>" +
      '<p class="d3-kyb-find__more">Not here? Add the full business name or the BRN to narrow it down, ' +
      "or keep entering the details below.</p></div></div>";
  }

  /* The country combobox the form shows when nothing is pre-filled. */
  function countryCombo(open) {
    var COUNTRIES = [["us", "United States"], ["gb", "United Kingdom"], ["ca", "Canada"], ["au", "Australia"],
                     ["de", "Germany"], ["nl", "Netherlands"], ["sg", "Singapore"], ["se", "Sweden"]];
    return '<div data-d3-prefill="off"><div class="d3-kyb-countrycb"><label class="tds-field-label">Country</label>' +
      '<div class="tds-combobox tds-combobox--full-width' + (open ? " tds-combobox--open" : "") + '">' +
      '<div class="tds-combobox__field tds-combobox__field--lg">' +
      '<span class="tds-combobox__leading-visual d3-cc-flag" aria-hidden="true">' + GLOBE + "</span>" +
      '<input class="tds-combobox__input" type="text" placeholder="Search country" readonly aria-label="Country">' +
      '<span class="tds-combobox__trailing-group">' + CARET + "</span></div>" +
      '<div class="tds-combobox__menu"><div class="tds-dropdown-panel d3-cc-panel" role="listbox" aria-label="Country">' +
      COUNTRIES.map(function (c) {
        return '<button type="button" class="tds-combobox__option d3-cc-option" role="option">' +
          '<span class="fi fi-' + c[0] + '" aria-hidden="true"></span><span>' + c[1] + "</span></button>";
      }).join("") + "</div></div></div></div></div>";
  }

  /* Jurisdiction is a pick, not a text field. */
  function jurField(value) {
    return '<div class="tds-combobox tds-combobox--full-width d3-kyb-jur">' +
      '<label class="tds-field-label">Jurisdiction Of Incorporation</label>' +
      '<div class="tds-combobox__field tds-combobox__field--lg">' +
      '<span class="tds-combobox__leading-visual" aria-hidden="true">' + SEARCH + "</span>" +
      '<input class="tds-combobox__input" type="text" placeholder="Select jurisdiction" readonly value="' + (value || "") + '">' +
      '<span class="tds-combobox__trailing-group">' + CARET + "</span></div></div>";
  }

  var GLOBE = '<svg class="d3-fa-line d3-cc-globe" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
    '<circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.25"/>' +
    '<path d="M1.75 8h12.5M8 1.75c1.7 1.7 2.6 3.8 2.6 6.25S9.7 12.55 8 14.25M8 1.75C6.3 3.45 5.4 5.55 5.4 8s.9 4.55 2.6 6.25" ' +
    'stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>';

  /* The landing search: a country select and a combobox sharing one field. With
     no `names` it is the closed header row of a picked business. */
  function searchField(names, activeIndex, value) {
    var open = !!names;
    return '<div class="vb-search-field">' +
      '<div class="tds-select tds-select--interactive vb-search-country">' +
      '<button type="button" class="tds-select__trigger tds-select__trigger--lg" aria-label="Country, United States">' +
      '<span class="tds-select__country-flag" aria-hidden="true"><span class="fi fi-us"></span></span>' +
      '<span class="tds-select__value vb-search-country__value">United States</span>' +
      '<span class="tds-select__trailing-group">' + CARET + "</span></button></div>" +
      '<div class="vb-search-field__divider" aria-hidden="true"></div>' +
      '<div class="tds-combobox tds-combobox--full-width' + (open ? " tds-combobox--open" : "") + ' vb-combobox">' +
      '<div class="tds-combobox__field tds-combobox__field--lg vb-combobox__field">' +
      '<span class="tds-combobox__leading-visual vb-combobox__icon" aria-hidden="true">' + SEARCH + "</span>" +
      '<input class="tds-combobox__input" type="text" value="' + (value || "meridian") + '" readonly aria-label="Search by business name"></div>' +
      (open
        ? '<div class="tds-combobox__menu"><div class="tds-dropdown-panel vb-combobox__panel" role="listbox">' +
          '<div class="vb-combobox__options">' +
          names.map(function (n, i) {
            return '<button type="button" class="tds-action-list-item vb-combobox__option' +
              (i === activeIndex ? " tds-action-list-item--active" : "") + '" role="option">' +
              '<span class="tds-action-list-item__content"><span class="tds-action-list-item__label">' + n + "</span>" +
              '<span class="tds-action-list-item__description">United States</span></span></button>';
          }).join("") + "</div>" +
          '<div class="vb-combobox__footer">Showing ' + names.length + ' of 1284 matches \u2014 keep typing to refine</div>' +
          "</div></div>"
        : "") + "</div></div>";
  }

  /* The form's footer: Continue on step 1, Back + Execute on step 2. */
  function formActions(label, withBack) {
    return '<div class="vb-prefill__actions">' +
      (withBack ? '<button type="button" class="tds-btn tds-btn--invisible tds-btn--lg">Back</button>' : "") +
      '<button type="button" class="tds-btn tds-btn--primary tds-btn--lg">' + label + "</button></div>";
  }

  function reviewGroup(title, rows) {
    return '<div class="d3-kyb-review__group">' +
      '<p class="d3-kyb-review__group-title text-label-sm-uppercase">' + title + "</p>" +
      '<dl class="d3-kyb-review__grid">' + rows.map(function (r) {
        return '<div class="d3-kyb-review__row"><dt>' + r[0] + "</dt><dd>" + r[1] + "</dd></div>";
      }).join("") + "</dl></div>";
  }

  /* The portal's own rail nav-top, markup copied from the real shell. */
  var RAIL_NAV = {"messages": "<button type=\"button\" class=\"d1-nav-btn d1-nav-btn--lg\" data-d3-nav=\"messages\" aria-label=\"Chats\" aria-expanded=\"false\"><svg class=\"d1-nav-btn__icon d1-nav-btn__icon--line\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4.5 6.75A2.25 2.25 0 0 1 6.75 4.5h10.5A2.25 2.25 0 0 1 19.5 6.75v7.5a2.25 2.25 0 0 1-2.25 2.25H9.3L5.4 19.6a.75.75 0 0 1-1.2-.6v-2.5A2.25 2.25 0 0 1 4.5 14.25v-7.5Z\"/></svg><svg class=\"d1-nav-btn__icon d1-nav-btn__icon--fill\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M6.75 3.75A2.25 2.25 0 0 0 4.5 6v8.25c0 .6.24 1.17.66 1.59L4.5 18.9a.75.75 0 0 0 1.2.6l3.3-2.48h7.95A2.25 2.25 0 0 0 19.2 14.77V6A2.25 2.25 0 0 0 16.95 3.75H6.75Z\"/></svg><span class=\"d1-nav-tip\" aria-hidden=\"true\">Chats</span></button>", "home": "<button type=\"button\" class=\"d1-nav-btn\" data-d3-nav=\"home\" aria-label=\"Home\"><svg class=\"d1-nav-btn__icon d1-nav-btn__icon--line\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5.5v-5.5h-5V21H4a1 1 0 0 1-1-1v-9.5Z\"/></svg><svg class=\"d1-nav-btn__icon d1-nav-btn__icon--fill\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5.5v-5.5h-5V21H4a1 1 0 0 1-1-1v-9.5Z\"/></svg><span class=\"d1-nav-tip\" aria-hidden=\"true\">Home</span></button>", "kyb": "<button type=\"button\" class=\"d1-nav-btn\" data-d3-nav=\"kyb\" aria-label=\"KYB Verification\"><svg class=\"d1-nav-btn__icon d1-nav-btn__icon--line\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4.5 21V5a1.5 1.5 0 0 1 1.5-1.5h8A1.5 1.5 0 0 1 15.5 5v16M15.5 9.5H18a1.5 1.5 0 0 1 1.5 1.5v10M3 21h18M8 7.5h3.5M8 11.5h3.5M8 15.5h3.5\"/></svg><svg class=\"d1-nav-btn__icon d1-nav-btn__icon--fill\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M6 3a2 2 0 0 0-2 2v15.25H3a.75.75 0 0 0 0 1.5h18a.75.75 0 0 0 0-1.5h-1V11a2 2 0 0 0-2-2h-2V5a2 2 0 0 0-2-2H6Zm1.75 3.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Zm0 4a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Zm0 4a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z\" fill-rule=\"evenodd\"/></svg><span class=\"d1-nav-tip\" aria-hidden=\"true\">KYB Verification</span></button>", "transactions": "<button type=\"button\" class=\"d1-nav-btn\" data-d3-nav=\"transactions\" aria-label=\"Transactions\"><svg class=\"d1-nav-btn__icon d1-nav-btn__icon--line\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"8.25\" stroke=\"currentColor\" stroke-width=\"1.5\"/><path stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 7.5V12l3.25 2\"/></svg><svg class=\"d1-nav-btn__icon d1-nav-btn__icon--fill\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M12 2.25a9.75 9.75 0 1 1 0 19.5 9.75 9.75 0 0 1 0-19.5Zm-.75 5.25a.75.75 0 0 0-1.5 0v5c0 .3.18.57.46.69l4.25 1.75a.75.75 0 1 0 .56-1.4L11.25 11.7V7.5Z\"/></svg><span class=\"d1-nav-tip\" aria-hidden=\"true\">Transactions</span></button>", "labs": "<button type=\"button\" class=\"d1-nav-btn\" data-d3-nav=\"labs\" aria-label=\"Labs\"><svg class=\"d1-nav-btn__icon d1-nav-btn__icon--line\" viewBox=\"0 0 16 16\" fill=\"none\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M10.6593 0C10.8256 0 10.986 0.0659699 11.1036 0.18359C11.221 0.30117 11.2872 0.46076 11.2872 0.62695C11.2872 0.79313 11.221 0.95272 11.1036 1.07031C10.986 1.18793 10.8256 1.2539 10.6593 1.2539H10.0323V5.71679L14.8692 13.7802H14.8712C14.9853 13.9706 15.0471 14.1882 15.0499 14.4101C15.0526 14.6319 14.9961 14.8508 14.8868 15.0439C14.7776 15.2366 14.6192 15.397 14.4278 15.5087C14.2362 15.6204 14.0178 15.6796 13.796 15.6796H1.25207C1.03035 15.6793 0.812606 15.6197 0.621206 15.5078C0.429926 15.3959 0.271286 15.2357 0.162216 15.0429C0.0531262 14.8498 -0.00277409 14.6308 0.000105914 14.4091C0.00298591 14.1874 0.0647559 13.9704 0.178816 13.7802L5.01476 5.71679V1.2539H4.38781C4.22148 1.2539 4.06207 1.18791 3.94445 1.07031C3.82683 0.95268 3.76085 0.79329 3.76085 0.62695C3.76088 0.46064 3.82685 0.30119 3.94445 0.18359C4.06206 0.0660399 4.22152 0 4.38781 0H10.6593ZM6.26962 1.2539V5.89064C6.26992 6.00414 6.23842 6.11564 6.17982 6.21284L4.26183 9.41404C5.3726 9.45254 6.55962 9.78694 7.80672 10.4179C9.58462 11.3178 10.9226 11.3966 11.8634 11.2109L8.86732 6.21284C8.80872 6.11574 8.77832 6.00404 8.77842 5.89064V1.2539H6.26962Z\"/></svg><svg class=\"d1-nav-btn__icon d1-nav-btn__icon--fill\" viewBox=\"0 0 16 16\" fill=\"none\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M10.6593 0C10.8256 0 10.986 0.0659699 11.1036 0.18359C11.221 0.30117 11.2872 0.46076 11.2872 0.62695C11.2872 0.79313 11.221 0.95272 11.1036 1.07031C10.986 1.18793 10.8256 1.2539 10.6593 1.2539H10.0323V5.71679L14.8692 13.7802H14.8712C14.9853 13.9706 15.0471 14.1882 15.0499 14.4101C15.0526 14.6319 14.9961 14.8508 14.8868 15.0439C14.7776 15.2366 14.6192 15.397 14.4278 15.5087C14.2362 15.6204 14.0178 15.6796 13.796 15.6796H1.25207C1.03035 15.6793 0.812606 15.6197 0.621206 15.5078C0.429926 15.3959 0.271286 15.2357 0.162216 15.0429C0.0531262 14.8498 -0.00277409 14.6308 0.000105914 14.4091C0.00298591 14.1874 0.0647559 13.9704 0.178816 13.7802L5.01476 5.71679V1.2539H4.38781C4.22148 1.2539 4.06207 1.18791 3.94445 1.07031C3.82683 0.95268 3.76085 0.79329 3.76085 0.62695C3.76088 0.46064 3.82685 0.30119 3.94445 0.18359C4.06206 0.0660399 4.22152 0 4.38781 0H10.6593ZM6.26962 1.2539V5.89064C6.26992 6.00414 6.23842 6.11564 6.17982 6.21284L4.26183 9.41404C5.3726 9.45254 6.55962 9.78694 7.80672 10.4179C9.58462 11.3178 10.9226 11.3966 11.8634 11.2109L8.86732 6.21284C8.80872 6.11574 8.77832 6.00404 8.77842 5.89064V1.2539H6.26962Z\"/></svg><span class=\"d1-nav-tip\" aria-hidden=\"true\">Labs</span></button>"};
  function railNav(active, chatsOpen) {
    function on(html, key) {
      return key === active ? html.replace('class="d1-nav-btn', 'class="d1-nav-btn is-active').replace(">", ' aria-current="page">') : html;
    }
    var chats = RAIL_NAV.messages.replace('aria-expanded="false"', 'aria-expanded="' + (chatsOpen ? "true" : "false") + '"');
    return '<div class="d1-rail__nav-top"><div class="d1-fly d1-fly--chats">' + chats + "</div>" +
      '<hr class="d3-rail__rule" aria-hidden="true">' +
      on(RAIL_NAV.home, "home") + on(RAIL_NAV.kyb, "kyb") + on(RAIL_NAV.transactions, "transactions") + on(RAIL_NAV.labs, "labs") + "</div>";
  }

  /* The Chats dock, beside the rail it opens from — the portal's own nav, not a stand-in. */
  function chatDock(live) {
    var DOCK_HIDE = '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none"><rect x="2.5" y="3" width="11" height="10" rx="1.5" stroke="currentColor" stroke-width="1.25"/>' +
      '<path d="M6.5 3v10" stroke="currentColor" stroke-width="1.25"/>' +
      '<path d="M11 6.25 9.25 8 11 9.75" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return '<div class="d1-shell dx-dock" data-d3-chatdock="open"' + (live ? ' data-d3-chat-ongoing="true"' : "") + '>' +
      '<aside class="d1-rail dx-dock__rail" aria-label="Primary">' +
      '<div class="d1-rail__header"><button type="button" class="d1-logo" aria-label="Trulioo home">' +
      '<img src="../assets/logo-mark.svg" alt="" width="29.9995" height="24.6107"></button></div>' +
      '<nav class="d1-rail__nav" aria-label="Primary">' + railNav("kyb", true) + "</nav></aside>" +
      '<aside class="d3-chatdock">' +
      '<header class="d3-chatdock__head"><h2 class="d3-chatdock__title">Chats</h2>' +
      '<button type="button" class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--invisible tds-icon-btn--circular d3-chatdock__hide" aria-label="Hide chats">' +
      '<span class="tds-icon-btn__icon" aria-hidden="true">' + DOCK_HIDE + "</span></button></header>" +
      '<div class="d3-chatdock__list" role="menu" aria-label="All chats">' +
      '<button type="button" class="d1-chat-row d3-chat-row d1-chat-row--current' +
      (live ? " d1-chat-row--live" : "") + '" role="menuitem">' +
      '<span class="d3-chat-row__title">Verify Meridian Capital in US</span></button>' +
      "</div></aside></div>";
  }

  /* Expanded: data-d3-chat-size="full" — the panel takes the whole canvas beside
     the rail and the workspace hides. Drawn at a real 1440x820 desktop and scaled
     down to fit (docs.js fitDesktops), so the proportions are the product's. */
  function expandedPanel() {
    var head = '<div class="d3-chat-pane__head">' +
      X.identRow("Verify Meridian Capital in US", "Awaiting input", null, "idle") +
      '<div class="d3-chat-pane__tools">' +
      X.iconBtn(I.newChat, "New Chat", "tds-icon-btn--invisible tds-icon-btn--circular d3-chat-pane__new", " data-d3-chat-new") +
      X.iconBtn(I.collapse, "Collapse", "tds-icon-btn--invisible tds-icon-btn--circular d3-chat-pane__expand", ' aria-pressed="true"') +
      X.iconBtn(I.minimize, "Minimize", "tds-icon-btn--invisible d3-chat-pane__close") +
      "</div></div>";
    return '<div class="dx-desktop-wrap"><div class="dx-desktop d1-shell" data-d3-chat="open" data-d3-chat-mode="kyb" ' +
      'data-d3-ai-orb="header" data-d3-chat-size="full" data-d3-view="kyb">' +
      railStub() +
      '<aside class="d3-chat-pane is-active">' + head +
      '<div class="d3-chat-pane__body"><div class="d3-chat-pane__thread"><div class="d1-thread">' +
      X.user("verify meridian, US") +
      '<div class="d1-ai"><div class="ai-reply"><p class="ai-reply__lead">Got it — meridian in United States.</p>' +
      '<p class="ai-reply__sub">What level of compliance and risk verification do you need to perform today?</p></div></div>' +
      X.levelList("insights") +
      "</div></div>" + X.composer("Select a match or refine your search", false, false).replace(" d3-pane-idle-form", "") + "</div></aside></div></div>";
  }

  /* The rail the panel sits against. */
  function railStub() {
    return '<aside class="d1-rail dx-dock__rail" aria-label="Primary">' +
      '<div class="d1-rail__header"><button type="button" class="d1-logo" aria-label="Trulioo home">' +
      '<img src="../assets/logo-mark.svg" alt="" width="29.9995" height="24.6107"></button></div>' +
      '<nav class="d1-rail__nav" aria-label="Primary">' + railNav("kyb", false) + "</nav></aside>";
  }

  /* The panel at its smallest: one bar that reopens the panel. The bar
     is revealed by the shell being closed on a non-home view, so the specimen
     carries those attributes or it stays at opacity 0. */
  function askBar(text) {
    return '<div class="d1-shell dx-askbar-stage" data-d3-chat="closed" data-d3-view="transactions">' +
      '<button type="button" class="d3-askbar" data-d3-askbar aria-controls="d3-chat-pane" aria-expanded="false" tabindex="-1">' +
      '<span class="d3-askbar__text" data-d3-askbar-text>' + text + "</span>" +
      '<span class="d3-askbar__send" aria-hidden="true">' + I.send + "</span></button></div>";
  }

  /* One live orb and the states to put it in — the same shape as the
     component's own experiments page, so the transitions can be watched
     rather than inferred from four stills. */
  function orbPlayer(states, initial) {
    return '<div class="dx-orbplay">' +
      '<div class="dx-orbplay__stage" data-orb-player="' + initial + '"></div>' +
      '<div class="dx-orbplay__ident"><p class="dx-orbplay__title">TruAI</p><p class="dx-orbplay__status"></p></div>' +
      '<div class="dx-orbplay__states" role="radiogroup" aria-label="Orb state">' +
      states.map(function (st) {
        return '<button type="button" class="dx-orbplay__btn' + (st[0] === initial ? " is-on" : "") +
          '" role="radio" aria-checked="' + (st[0] === initial) + '" data-dx-orb-state="' + st[0] + '">' +
          st[1] + "</button>";
      }).join("") + "</div>" +
      '<p class="dx-orbplay__hint">Completed holds for about 1.5s, then settles back to idle on its own.</p>' +
      "</div>";
  }

  function prefillRow(on) {
    return '<div class="dx-landing"><div class="d3-workspace__hero"><div class="d3-kyb-titlerow"><div class="d3-demo-prefill">' +
      '<span class="d3-demo-prefill__copy"><span class="d3-demo-prefill__label" id="dxpf' + (on ? 1 : 0) + '">Pre-fill</span>' +
      '<span class="d3-demo-prefill__sub">for dev team review</span></span>' +
      '<div class="tds-switch"><div class="tds-switch__track tds-switch__track--sm' + (on ? " tds-switch__track--on" : "") +
      '" role="switch" tabindex="-1" aria-checked="' + on + '" aria-labelledby="dxpf' + (on ? 1 : 0) + '">' +
      '<span class="tds-switch__indicator" aria-hidden="true"></span><span class="tds-switch__handle" aria-hidden="true"></span></div></div>' +
      '</div><h1 class="d3-workspace__title">KYB Verification</h1></div>' +
      '<p class="d3-workspace__lede">' + (on ? "Search for a business to start a verification yourself." : "Enter the business details to start a verification.") + "</p></div></div>";
  }

  window.DOCS = { scenarios: [

  /* ------------------------------------------------------------ option 1 */
  { id: "o1", group: "Option 1 · Homepage", name: "Verification via homepage",
    line: "An alternative entry point. It redirects into the AI chat flow.",
    steps: [
      { title: "Launch", actor: "Action", trigger: "types “verify meridian, US” in the homepage search field and sends",
        changes: ["The TruAI panel opens from the left.",
                  "The homepage composer is hidden — there is only ever one composer on screen.",
                  "The panel header swaps its brand title for the agent identity."],
        view: function () { return X.homeHero("verify meridian, US"); } },
      { title: "Hand off", actor: "Panel", trigger: "resolves the query and lists the matches", noVisual: true,
        note: { k: "Goes to", text: 'Option 2 · Scenario A — <a href="#s/o2a">selecting the business entity</a>.' },
        changes: ["The matches arrive grouped by city, with a count on each.",
                  "The agent status settles from <em>Thinking</em> to <em>Awaiting input</em>."],
        view: function () { return X.panelWithHead("Verify meridian, US in US", "Awaiting input", "idle",
          matchSelector(), ' data-d3-ai-verify="selector"'); } }
    ],
    props: { name: "Notes", head: ["", ""], rows: [
      ["No separate flow", "The homepage search is the same composer as the one in the panel, parked on the home screen."],
      ["One composer", "On submit the homepage one is hidden rather than duplicated."]
    ] } },

  /* ----------------------------------------------------------- option 2A */
  { id: "o2a", group: "Option 2 · AI chat", name: "A · Standard verification",
    line: "The contract default product is saved, so TruAI asks one question: which business.",
    steps: [
      { title: "Ask", actor: "Action", trigger: "types “verify meridian, US” in the AI chat",
        changes: ["The panel header takes the conversation title and shows the agent as <em>Awaiting input</em>.",
                  "TruAI replies <em>Pick a business below…</em>, and the default product sits above the list with an Edit button and the scope chip.",
                  "The matches arrive grouped by city, with a count on each.",
                  "Nothing about the package is asked — the contract default already answers it."],
        note: { k: "Else", text: 'No saved default → the level question comes first, <strong>Question 1 of 4</strong>. That is <a href="#s/o2b">Scenario B</a>.' },
        view: function () { return X.panelWithHead("Verify meridian, US in US", "Awaiting input", "idle",
          X.user("verify meridian, US") +
          X.ai('<div class="ai-reply"><p class="ai-reply__lead">Pick a business below and I’ll verify it with your default product — nothing else to set up.</p></div>') +
          '<div class="d1-ai d3-kyb-agent-wrap d3-kyb-wizard">' + X.wizTop(null, 0, 0, null, SCOPE.insights) +
          '<div class="d3-kyb-wiz__body"><div class="d3-kyb-cand-panel d3-kyb-agent-wrap">' + matchSelector() + "</div></div></div>",
          ' data-d3-ai-verify="selector"'); } },

      { title: "Select the entity", actor: "Action", trigger: "picks the business from the search results",
        changes: ["The choice is echoed back as the user’s own message.",
                  "The list card is locked and faded; the confirmation card arrives below the echo.",
                  "The scope line is labelled <strong>Default configuration</strong> — the package came from the contract, not from a choice just made."],
        note: { k: "Or", text: '<strong>Edit</strong> instead of Verify opens every question — <a href="#s/o2b">Scenario B</a>.' },
        view: function () { return X.pane(X.user("Meridian Capital LLC") +
          '<div class="d1-ai d3-kyb-agent-wrap d3-kyb-cand-panel"><div class="ai-reply"><p class="ai-reply__lead">Everything is ready. Click below to start the verification.</p></div>' +
          X.confirmCard([["Entity", "Meridian Capital LLC (Active)"],
                         ["Default configuration", SCOPE.insights]]) + "</div>"); } },

      { title: "Verify", actor: "Action", trigger: "clicks <strong>Verify</strong> on the confirmation card",
        changes: ["The investigation runs in the chat, one step at a time, with the current step in dark text and the finished ones greyed.",
                  "The agent status follows the running step, ending on <em>Report ready</em>.",
                  "The result arrives as one card: verdict, risk score, the checks that reported, and the transaction ID."],
        view: function () { return X.pane(X.user("Verify") +
            '<section class="d1-block"><div class="d1-progress">' +
            '<div class="d1-progress__row"><span>Investigating</span><span class="d1-progress__pct">55%</span>' +
            '<i class="fa-regular fa-circle-check" aria-hidden="true"></i></div>' +
            '<div class="d1-progress__track"><div class="d1-progress__fill d1-progress__fill--active" style="width:55%"></div></div></div>' +
            '<div class="d1-steps">' +
            activityRow("Matched registry records", false, false, "") +
            activityRow("Incorporation and ownership parsed", false, false, "") +
            activityRow("Screening directors against OFAC, UN, and EU…", true, true, "<p>OFAC — clear</p>") +
            "</div></section>") +
          X.cap("…and when it finishes:") +
          X.pane(X.resultCard({ name: "Meridian Capital LLC", addr: "200 Vesey Street, New York, NY 10281",
            reg: "4417762", summary: "Meridian Capital LLC matched an active New York DOS filing with clear sanctions and adverse-media screens.", score: "18", scoreLabel: "Low Risk Entity", scoreTone: "positive",
            checks: ["Business registry", "Screening", "Ownership", "Web insights", "Business Risk Horizon"],
            tx: "8c2f4e7a-19bd-4f02-a6c1-77de42915b3a" }) + X.nextList(["What contributed to this verification result?", "Who ultimately owns this business?"]), ' data-d3-ai-step="report"'); } }
    ],
    props: { name: "What the default answers", head: ["Question", "Answered by"], rows: [
      ["Verification level", "the saved contract default"], ["Search mode", "the saved contract default"],
      ["Add-ons", "the saved contract default"], ["Which business", "<strong>the user</strong> — the only question left"]
    ] } },

  /* ----------------------------------------------------------- option 2B */
  { id: "o2b", group: "Option 2 · AI chat", name: "B · Customized package",
    line: "<strong>Edit</strong> on the confirmation card reopens every question. Switch the level — the flow changes with it.",
    controls: [levelBranch],
    steps: [
      { num: "1", title: "Edit the default", actor: "Action",
        trigger: "enters the prompt, then clicks <strong>Edit</strong> on the confirmation card",
        changes: ["The saved contract default is shown as one line with an Edit button.",
                  "Edit on the confirmation card is echoed, then opens a new wizard at question 1.",
                  "The answers the contract already made come along as chips."],
        view: function () { return X.pane(X.user("Edit") +
          '<div class="d1-ai d3-kyb-agent-wrap d3-kyb-wizard">' + X.wizTop(null, 0, 0, null, "Business Insights + Web Insights + UBO Discovery + Business Risk Horizon") + "</div>"); } },

      { num: "2a", title: "Level", actor: "Action", trigger: "selects the verification level",
        changes: function (l) { return ["The chosen level is marked as selected.",
          l === "essentials" ? "The count drops to <strong>3</strong> — Essentials offers no add-ons, so that question is removed."
                             : "The count stays at <strong>4</strong>.",
          "The answer replaces the level chip at the top of the card."]; },
        view: function (l) { return X.pane(X.wizCard({
          count: "Question 1 of 4", done: 0, total: 4,
          chips: ["Business Finder", ADDON_CHIP[l]].filter(Boolean),
          body: X.wizReply("Got it — meridian in United States.",
                           "What level of compliance and risk verification do you need to perform today?") +
                X.levelList(l),
          next: true })); } },

      { num: "2b", title: "Search mode", actor: "Action",
        trigger: "chooses <strong>Business Finder</strong> or <strong>Enter details manually</strong>",
        changes: ["Business Finder searches the registry and locks what it returns.",
                  "Manual entry leaves the entity fields to the user.",
                  "Either way the answer becomes a chip and the wizard moves on."],
        note: { k: "Else", text: "Where the registry cannot be searched — Canada and Singapore — this question is removed and the flow goes straight to manual entry." },
        view: function (l) { return X.pane(X.wizCard({
          count: "Question 2 of " + (l === "essentials" ? 3 : 4), done: 1, total: l === "essentials" ? 3 : 4,
          chips: [LEVEL_NAME[l], ADDON_CHIP[l]].filter(Boolean),
          body: X.wizReply("Selected " + LEVEL_NAME[l] + ".",
                           "Would you like to use Business Finder? It searches the Secretary of State business registry for matching entities, so you can pick the right one instead of typing its details.") +
                X.finderChoice("on"),
          back: true, next: true })); } },

      { num: "2c", title: "Business entity", actor: "Action", trigger: "picks the target business from the matches",
        changes: function (l) { return ["The matches render inside the wizard, grouped by city.",
          "Picking a row answers the question and adds the entity name as a chip.",
          l === "essentials" ? "This is the <strong>last</strong> question on Essentials."
                             : "One question left after this one."]; },
        view: function (l) { return X.pane(X.wizCard({
          count: "Question 3 of " + (l === "essentials" ? 3 : 4), done: 2, total: l === "essentials" ? 3 : 4,
          chips: [LEVEL_NAME[l], "Business Finder", ADDON_CHIP[l]].filter(Boolean),
          body: X.selector("Which “Meridian” should I investigate?", MATCH_CHIPS, MATCH_ROWS, "1-3 of 5"),
          back: true }), ' data-d3-ai-verify="selector"'); } },

      { num: "2d", title: "Add-ons", actor: "Action", trigger: "configures the optional risk modules",
        skipOn: ["essentials"],
        changes: function (l) { return l === "complete"
          ? ["Two modules are offered — Complete already covers ownership, so the two discovery modules drop out.",
             "The contract default arrives pre-ticked; untick anything not wanted."]
          : ["Four modules are offered, including both ownership-discovery ones.",
             "The contract default arrives pre-ticked — Web Insights, UBO Discovery and Business Risk Horizon.",
             "Continue reads <em>Continue without add-ons</em> if everything is unticked."]; },
        note: function (l) { return l === "essentials"
          ? { k: "Why", text: "Essentials has no add-ons at all, so the question never appears. The summary still records <em>No add-ons</em>." }
          : null; },
        view: function (l) { return X.pane(X.wizCard({
          count: "Question 4 of 4", done: 3, total: 4,
          chips: [LEVEL_NAME[l], "Business Finder", "Meridian Industrial Holdings LLC"],
          body: X.wizReply("Selected " + LEVEL_NAME[l] + ".",
                           "Would you like to attach any add-ons to this verification?") +
                X.addonGroup(l, ["web", "ubo", "risk"]),
          back: true, next: true })); } },

      { num: "3", title: "Verify", actor: "Action", trigger: "clicks <strong>Verify</strong> on the updated confirmation card",
        changes: function (l) { return ["The wizard card locks and fades; your answers are echoed as one message, then the confirmation card arrives with the new scope.",
          "The checks run, then the result arrives as one card.",
          l === "essentials" ? "Checks reported: registry and screening only."
                             : "Checks reported: registry, screening, ownership, web insights and the risk score."]; },
        view: function (l) { return X.pane(X.user(ECHO[l]) +
            '<div class="d1-ai d3-kyb-agent-wrap d3-kyb-cand-panel"><div class="ai-reply"><p class="ai-reply__lead">Everything is ready. Click below to start the verification.</p></div>' +
            X.confirmCard([["Entity", "Meridian Industrial Holdings LLC (Active)"],
                           ["Scope", SCOPE[l]]]) + "</div>") +
          X.cap("…and when it finishes:") +
          X.pane(X.user("Verify") + X.resultCard({ name: "Meridian Industrial Holdings LLC",
            addr: "233 S Wacker Drive, Chicago, IL 60606", reg: "04581276",
            summary: "Meridian Industrial Holdings LLC is active in Illinois. One trust membership layer needs follow-up for full UBO clarity.",
            score: l === "essentials" ? "" : "47", scoreLabel: "Medium Risk Entity", scoreTone: "intermediate",
            checks: l === "essentials"
              ? ["Business registry", "Screening"]
              : ["Business registry", "Screening", "Ownership", "Web insights", "Business Risk Horizon"],
            tx: "8c2f4e7a-19bd-4f02-a6c1-77de42915b3a" }) + X.nextList(["What contributed to this verification result?", "Who ultimately owns this business?"]), ' data-d3-ai-step="report"'); } }
    ],
    props: { name: "What the level decides", head: ["", "Essentials", "Insights", "Complete"], rows: [
      ["Questions asked", "<strong>3</strong>", "<strong>4</strong>", "<strong>4</strong>"],
      ["Add-ons offered", "none — the step is removed", "Web Insights · UBO Discovery · UBO and PSC Discovery · Business Risk Horizon", "Web Insights · Business Risk Horizon"],
      ["Card copy", "Existence &amp; BRN", "First-level UBO &amp; directors", "Deep hierarchy &amp; multi-tier traversal"],
      ["Report tabs", "Overview · Match Signals", "+ Additional Data", "+ Owners &amp; UBOs · Web &amp; Social"],
      ["Owners &amp; UBOs tab", "never", "only with a UBO add-on", "always"],
      ["Risk Horizon tab", "only with the add-on", "only with the add-on", "only with the add-on"],
      ["Add the score later", "no", "yes", "yes"]
    ] } },

  /* ----------------------------------------------------------- option 2C */
  { id: "o2c", group: "Option 2 · AI chat", name: "C · Post-verification add-on",
    line: "A verification ran without the risk score. It is added as its own transaction; the original report is untouched.",
    steps: [
      { num: "1", title: "Find the offer", actor: "Panel",
        trigger: "puts the offer at the top of the suggested next actions — and in the workspace",
        note: { k: "Only on", text: "Insights and Complete. Essentials has no add-ons, so the score is never offered afterwards.", warn: true },
        changes: ["<strong>Run Business Risk Horizon Score</strong> is added above the two standard follow-ups.",
                  "The workspace Overview offers the same thing as a primary button.",
                  "The verification report itself is untouched."],
        view: function () { return X.pane(X.nextList(["Run Business Risk Horizon Score",
            "What contributed to this verification result?", "Who ultimately owns this business?"]),
            ' data-d3-ai-step="report" data-d3-ai-report="list"') +
          X.cap("…or from the workspace Overview:") +
          X.sheet(X.suggestedActions("Run Business Risk Horizon", false)); } },

      { num: "2", title: "Ask to run it", actor: "Action", noVisual: true,
        trigger: "clicks <strong>Run Business Risk Horizon</strong>, from either place",
        changes: ["Nothing runs yet — the click opens a confirmation first.",
                  "The chat stays quiet until the run is confirmed."],
        view: function () { return X.pane('<div class="d3-ai-next d3-ai-next--list"><div class="d3-ai-next__list">' +
          '<button type="button" class="d3-ai-next__btn dx-point"><span class="d3-ai-next__text">Run Business Risk Horizon Score</span>' +
          '<span class="d3-ai-next__arrow" aria-hidden="true">' + I.arrow + "</span></button></div></div>",
          ' data-d3-ai-step="report" data-d3-ai-report="list"'); } },

      { num: "3", title: "Confirm in the workspace", actor: "Action",
        trigger: "clicks <strong>Run Business Risk Horizon</strong> in the dialog",
        changes: ["The dialog states the two things that matter before paying for it.",
                  "It runs as its own transaction, with its own Transaction ID.",
                  "The verification already run is not repeated or changed."],
        view: function () { return X.brhDialog(false); } },

      { num: "4", title: "The score card", actor: "Panel",
        trigger: "waits — the run answers in the chat by itself",
        changes: ["The request is echoed, then the chat confirms the run finished.",
                  "The score card follows straight after, with no click to reveal it: the score and its band, the key findings behind it, and the new transaction ID.",
                  "The card carries a <strong>View</strong> button that opens that run. <em>View Latest Score</em>, with a caret listing every run after a second one, lives in the workspace Suggested Actions.",
                  "The suggested next actions swap to <em>View latest</em> and <em>Run again</em>, and move <em>below</em> the newest message."],
        view: function () { return X.pane(X.user("Run Business Risk Horizon Score") +
          '<section class="d1-turn"><div class="d1-ai d1-block d3-brh-reply"><p class="d3-brh-reply__lead">Business Risk Horizon has run for <b>' + ENTITY + "</b>.</p></div></section>" +
          X.brhReplyCard({ score: "47", label: "Medium Risk Entity", tx: "d0ac9cfc-cc91-4ae5-a2b6-83cbae02bd46" }) +
          X.nextList(["View latest Business Risk Horizon", "Run Business Risk Horizon again",
            "What contributed to this verification result?", "Who ultimately owns this business?"]),
          ' data-d3-ai-step="report" data-d3-ai-report="list"'); } },

      { num: "5", title: "The new transaction", actor: "Action", noVisual: true,
        trigger: "clicks <strong>View</strong> on the card",
        changes: ["A <strong>Business Risk Horizon</strong> tab joins the tab row.",
                  "The Overview leads with the score and its risk band.",
                  "The offer rows disappear on this version — they belong to the report as it was run."],
        view: function () { return X.cap("The report as it was run:") +
          X.sheet(X.tabs(["Overview", "Business Details", "Match Signals", "Owners &amp; UBOs", "Web Insights"])) +
          X.cap("The version that includes the score:") +
          X.sheet(X.tabs(["Overview", "Business Details", "Business Risk Horizon", "Match Signals", "Owners &amp; UBOs", "Web Insights"], 2)); } },

      { num: "6", title: "Two records, side by side", actor: "Panel", noVisual: true,
        trigger: "leaves both summaries in the chat",
        note: { k: "Rule", text: "The verification summary is <strong>not</strong> rewritten — the score is a second transaction, not an amendment to the first." },
        changes: ["The verification summary stays exactly as it was: no score, and no risk check in its list.",
                  "The score card sits below it with its own transaction ID.",
                  "Together they are the record of what was bought, and when."],
        view: function () { return X.pane(X.resultCard({ name: ENTITY,
            addr: "233 S Wacker Drive, Chicago, IL 60606", reg: "04581276",
            summary: "Meridian Industrial Holdings LLC is active in Illinois. One trust membership layer needs follow-up for full UBO clarity.",
            checks: ["Business registry", "Screening", "Ownership", "Web insights"],
            tx: "8c2f4e7a-19bd-4f02-a6c1-77de42915b3a" }), ' data-d3-ai-step="report"') +
          X.cap("…and below it, the separate run:") +
          X.pane(X.brhReplyCard({ score: "47", label: "Medium Risk Entity", tx: "d0ac9cfc-cc91-4ae5-a2b6-83cbae02bd46" })); } },

      { num: "7", title: "Run it again", actor: "Action",
        trigger: "picks <strong>Run Business Risk Horizon again</strong> from the suggested next actions",
        changes: ["The list now carries four rows: view the latest run, run another, and the two standard follow-ups.",
                  "A repeat run makes a new transaction — earlier runs stay as they are. In the workspace, <em>View Latest Score</em> joins <em>Run again</em>.",
                  "The dialog changes wording to match: <em>Run again</em>."],
        view: function () { return X.pane(X.nextList(["View latest Business Risk Horizon",
            "Run Business Risk Horizon again",
            "What contributed to this verification result?", "Who ultimately owns this business?"]),
            ' data-d3-ai-step="report" data-d3-ai-report="list"') +
          X.cap("…and the workspace offers the same:") +
          X.sheet(X.suggestedActions("Run Business Risk Horizon again", true)); } }
    ],
    props: { name: "Rules", head: ["", ""], rows: [
      ["Offered when", "the level supports the risk score but it was not ticked"],
      ["Never offered", "Business Essentials — it has no add-ons"],
      ["Billing", "its own transaction, with its own Transaction ID"],
      ["The original report", "not re-run and not changed"],
      ["Repeat runs", "each is a new transaction; earlier runs are kept for comparison"]
    ] } },

  /* ----------------------------------------------------------- option 2D */
  { id: "o2d", group: "Option 2 \u00b7 AI chat", name: "D \u00b7 Long verification delays",
    line: "Some registries take up to 24 hours. The run becomes a submitted record and the result arrives later as a notification.",
    steps: [
      { num: "1", title: "Start", actor: "Action", noVisual: true,
        trigger: "types \u201cVerify Brightwater Holdings Ltd\u201d",
        note: { k: "Demo", text: "<strong>Brightwater Holdings Ltd.</strong> stands in for the slow case; every other name resolves normally.", warn: true },
        changes: ["Nothing is different yet \u2014 this is whichever of Scenario A or B applies."] },

      { num: "2", title: "Confirm and run", actor: "Action",
        trigger: "clicks <strong>Verify</strong> on the confirmation card",
        changes: ["The confirmation card is the ordinary one \u2014 nothing warns that this entity is slow.",
                  "The scope reads <strong>Default configuration</strong>, so the package came from the contract.",
                  "Business Risk Horizon is part of that default here, which is why the result later carries a score."],
        view: function () { return X.pane('<div class="d3-kyb-cand-panel"><p class="ai-said">' + BW + "</p>" +
          '<div class="ai-reply"><p class="ai-reply__lead">Everything is ready. Click below to start the verification.</p></div>' +
          X.confirmCard([["Entity", BW + " (Active)"],
                         ["Default configuration", "Business Insights + Business Risk Horizon"]]) + "</div>"); } },

      { num: "3", title: "Submitted", actor: "Panel",
        trigger: "replaces the progress block with a submitted card",
        note: { k: "Rule", text: "No transaction ID yet \u2014 that belongs to the result, not to the request." },
        changes: ["The live progress block is <strong>removed</strong>, not left spinning.",
                  "The card states the wait up front and promises the alert: <em>I will tell you when it is ready</em>.",
                  "<strong>In Progress</strong> and <em>Up to 24 hours</em> sit where the verdict normally goes.",
                  "Checks split in two: <em>Business registry</em> has reported; Screening, Adverse media and Ownership are listed as unresolved, with hollow circles instead of ticks.",
                  "The composer is released and the suggestions change to leaving \u2014 start another, or see recent.",
                  "Recent transactions tags the entry <em>In Progress</em>."],
        view: function () { return X.pane(X.pendingCard(BW)); } },

      { num: "4", title: "Trigger the return", actor: "Action", demo: true,
        trigger: "clicks <strong>Simulate verification return</strong>",
        note: { k: "Demo", text: "A review affordance only. It sits directly under the submitted card, and the result also comes back on its own after about 15 seconds. <strong>Not part of the product.</strong>", warn: true },
        changes: ["Nothing in the product \u2014 this button exists so the team can see the end of the flow without waiting.",
                  "Its dashed outline and the <em>for dev team review</em> sub-label mark it as scaffolding."],
        view: function () { return X.pane(X.pendingCard(BW, true)); } },

      { num: "5", title: "Ready", actor: "Panel",
        trigger: "notifies wherever the user is in the portal",
        note: { k: "Rule", text: "The alert fires anywhere in the portal, not just on the KYB page \u2014 the point of the submitted state is that the user left." },
        changes: ["An alert floats in with the entity, a short transaction reference and a <strong>View</strong> action; it dismisses itself after 20 seconds, or on the \u00d7.",
                  "In the chat, the submitted card stays as the record and the summary is added below it.",
                  "The result card is the ordinary one: verdict, score, every check now ticked, and the full transaction ID.",
                  "Recent transactions turns <em>Verified</em>."],
        view: function () { return X.cap("The alert, over whatever page the user is on:") +
          X.readyToast(BW, "266bedcd") +
          X.cap("\u2026and the summary, back in the chat:") +
          X.pane(X.pendingCard(BW, false, true) +
            X.resultCard({ name: BW, addr: "1000 N West Street, Wilmington, DE 19801", reg: "7310022",
              summary: BW + " is an active Delaware holding company; the full report is still being prepared.",
              score: "18", scoreLabel: "Low Risk Entity", scoreTone: "positive",
              checks: ["Business registry", "Screening", "Business Risk Horizon"],
              tx: "8c2f4e7a-19bd-4f02-a6c1-77de42915b3a" }), ' data-d3-ai-step="report"'); } }
    ],
    props: { name: "Timing", head: ["", ""], rows: [
      ["Product", "about a minute of live progress, then the submitted state; the result up to 24 hours"],
      ["Demo", "about 5 seconds to submitted, about 15 to the result"],
      ["Also shows in", "the right panel status card \u00b7 Recent transactions, tagged In Progress \u00b7 a dot on the KYB rail button"]
    ] } },

  /* ----------------------------------------------------------- option 3A */
  { id: "o3a", group: "Option 3 · Manual form", name: "A · Auto pre-fill path",
    line: "The contract includes pre-fill, so the registry fills the form and the user reviews it.",
    steps: [
      { num: "1", title: "Pre-fill on", actor: "Action", demo: true,
        trigger: "checks the <strong>Pre-fill</strong> switch is ON",
        note: { k: "Demo", text: "A review affordance. In the product this comes from the contract, not a switch. <strong>Not part of the product.</strong>", warn: true },
        changes: ["The switch sits above the <em>KYB Verification</em> title, centred, in a dashed outline like the other demo controls.",
                  "With it on, the page offers a business search rather than an empty form.",
                  "The lede reads <em>Search for a business to start a verification yourself.</em>"],
        view: function () { return X.sheet(prefillRow(true)); } },

      { num: "2", title: "Search and pick", actor: "Action",
        trigger: "types “meridian” and selects an entity",
        changes: ["The field pairs a country select with the search box — the country decides which registry is searched.",
                  "Matches list the name and the country; the footer says how many of how many are shown.",
                  "Picking one opens the two-step form with the registry data already in it.",
                  "Every field the registry filled is marked <strong>Pre-filled</strong> in green; what it had nothing for stays empty."],
        view: function () { return X.cap("Typing opens the matches:") +
          '<div class="dx-sheet dx-sheet--menu"><div class="dx-landing"><div class="vb-lookup">' +
          searchField(["Meridian Apex Consulting Inc.", "Meridian Capital LLC", "Meridian Global Partners Inc.",
                       "Meridian Analytics Inc.", "Meridian Industrial Holdings LLC"], 0) + "</div></div></div>" +
          X.cap("…and picking one fills the form:") +
          X.sheet('<div class="dx-landing"><div class="vb-lookup vb-lookup--filled">' + searchField(null, 0, APEX) +
            '<div class="vb-prefill dx-noanim">' + stepper(false) + SAVEDLINE +
            '<div class="d3-kyb-fields">' +
            zone("identity", "Business identity", field("Business Name", APEX, true, true) + field("Country", "United States", false, true) +
              field("Jurisdiction Of Incorporation", "CA, United States", false, true) +
              field("Business Registration Number", "US-8891-INC", false, true)) +
            zone("address", "Registered address", field("Address Line 1", "50 Fremont St", false, true) + field("Address Line 2", "") +
              field("City", "San Francisco", false, true) + field("Postal Code", "94105", false, true)) +
            ACC + "</div>" + formActions("Continue") + "</div></div></div>"); } },

      { num: "3", title: "Configuration or fields", actor: "Action",
        trigger: "keeps the default configuration, or clicks <strong>Edit</strong> to change it",
        note: { k: "Shared", text: "One setting, three places — Settings, this form and the AI wizard all read the same configuration." },
        changes: ["The configuration sits above the fields as one line: the product and the package it bills to.",
                  "<strong>Edit</strong> opens the three levels as radio cards under <em>Select Verification Level</em>.",
                  "Only the selected card carries a <strong>Package</strong> select — the billing sub-account for that level.",
                  "Business Insights is tagged <em>Default</em>; <strong>Done</strong> closes the editor back to the one-line summary."],
        view: function () { return X.cap("Closed, as one line:") + X.sheet(SAVEDLINE) +
          X.cap("Open, after Edit:") + X.sheet(levelCards("insights")); } },

      { num: "4", title: "Optional fields", actor: "Action",
        trigger: "opens the <strong>View all fields</strong> accordion",
        changes: ["Everything beyond the required and recommended fields is collapsed by default.",
                  "Inside, the optional fields are grouped — Business, Address, Second Address, Additional, Other, and Persons of Significant Control (PSC).",
                  "Pre-fill reaches in here too: <em>State Province</em> is filled and marked, the rest are empty.",
                  "Nothing in this accordion blocks <strong>Continue</strong>."],
        view: function () { return X.sheet(acc(true,
          fieldGroup("Business", ["Tax ID Number", "Tradestyle Name", "Communication", "KYB Monitoring Callback URL",
                                  "KYB Monitoring Fields", "KYB Monitoring Frequency"]) +
          fieldGroup("Address", ["State Province", "Unit Number", "Building Number", "Building Name",
                                 "Street Name", "Street Type", "Suburb", "County"], { "State Province": "CA" }) +
          fieldGroup("Second Address", SECOND_ADDRESS) +
          fieldGroup("Additional", ["DUNS Number"]) + fieldGroup("Other", ["Website"]) + PSC)); } },

      { num: "5", title: "Review", actor: "Action",
        trigger: "clicks <strong>Continue</strong>",
        note: { k: "Rule", text: "The add-ons are chosen here, on the last step — not with the level. Same modules the chat wizard offers." },
        changes: ["Step 1 turns to a green check; step 2 becomes current.",
                  "The entered details are restated as two read-only groups: <strong>Business details</strong> and <strong>Configuration</strong>.",
                  "Configuration names the country, the <em>Product</em> and the <em>Package</em> — three different things.",
                  "The add-ons sit at the bottom: Business Risk Horizon is ticked by default; Web Insights, UBO Discovery and UBO and PSC Discovery start unticked.",
                  "<strong>Execute verification</strong> replaces Continue, with <strong>Back</strong> beside it."],
        view: function () { return X.sheet('<div class="vb-prefill dx-noanim">' + stepper(true) +
          '<div class="d3-kyb-step"><p class="d3-kyb-step__title">Review</p>' +
          '<p class="d3-kyb-step__hint">Check the details and choose any add-ons before you run the verification.</p>' +
          '<div class="d3-kyb-review">' +
          reviewGroup("Business details", [["Business Name", APEX], ["Jurisdiction Of Incorporation", "CA, United States"],
            ["Business Registration Number", "US-8891-INC"], ["Address Line 1", "50 Fremont St"],
            ["City", "San Francisco"], ["Postal Code", "94105"], ["State Province", "CA"]]) +
          reviewGroup("Configuration", [["Country", "United States"], ["Product", "Business Insights"],
            ["Package", "BusinessInsights"]]) + "</div>" +
          X.addonGroup("insights", ["risk"]) + "</div>" + formActions("Execute verification", true) + "</div>"); } },

      { num: "6", title: "Results", actor: "Action", noVisual: true,
        trigger: "clicks <strong>Execute verification</strong>",
        note: { k: "Then", text: 'Risk score left unticked → <a href="#s/o2c">Scenario C</a>. Brightwater → <a href="#s/o2d">Scenario D</a>.' },
        changes: ["From here the outcome is identical to the chat path — same report, same tabs, same rules.",
                  "The panel narrates it alongside."] }
    ],
    props: { name: "What the words mean", head: ["On screen", "Means"], rows: [
      ["Product", "the verification level — Essentials, Insights or Complete"],
      ["Package", "the billing sub-account for that level, e.g. BusinessInsights"],
      ["Verification Level", "the heading over the level cards, here and in Settings"]
    ] } },

  /* ----------------------------------------------------------- option 3B */
  { id: "o3b", group: "Option 3 · Manual form", name: "B · Manual data entry path",
    line: "No pre-fill, so the form opens empty. Business Finder unlocks once there is enough to search with.",
    steps: [
      { num: "1", title: "Pre-fill off", actor: "Action", demo: true,
        trigger: "sets the <strong>Pre-fill</strong> switch to OFF",
        note: { k: "Knock-on", text: "The same setting drives the chat — with pre-fill off, the AI stops assuming the Business Finder step too." },
        changes: ["The switch loses its fill and the handle moves left.",
                  "The business search is replaced by a country selector.",
                  "The lede changes to <em>Enter the business details to start a verification.</em>"],
        view: function () { return X.sheet(prefillRow(false)); } },

      { num: "2", title: "Country first", actor: "Action",
        trigger: "selects a country to open the form",
        changes: ["The country comes first because it decides the rest — which registry, and which fields are needed.",
                  "A globe stands where the flag will be, so the field never looks like it is missing something.",
                  "Only after a country is chosen do the empty fields appear."],
        view: function () { return '<div class="dx-sheet dx-sheet--menu"><div class="dx-landing"><div class="vb-lookup">' + countryCombo(true) + "</div></div></div>"; } },

      { num: "3", title: "Unlock the Finder", actor: "Action",
        trigger: "enters a jurisdiction and either a business name or a BRN",
        changes: ["The fields open empty — nothing is marked <em>Pre-filled</em> on this path.",
                  "Jurisdiction is a searchable pick, not free text.",
                  "<strong>Business Finder</strong> stays inert until there is a jurisdiction and either a name or a BRN.",
                  "Once both are in, the button wakes up."],
        view: function () { return X.cap("Empty — the Finder is inert:") +
          X.sheet('<div class="vb-prefill dx-noanim"><div class="d3-kyb-fields">' +
            zone("identity", "Business identity", field("Business Name", "", true) + jurField("") + field("Business Registration Number", "")) +
            finder(false) + ADDRESS_EMPTY + "</div></div>") +
          X.cap("…and once a name and a jurisdiction are in:") +
          X.sheet('<div class="vb-prefill dx-noanim"><div class="d3-kyb-fields">' +
            zone("identity", "Business identity", field("Business Name", "meridian", true) + jurField("Alabama") + field("Business Registration Number", "")) +
            finder(true) + ADDRESS_EMPTY + "</div></div>"); } },

      { num: "4", title: "Search — optional", actor: "Action",
        trigger: "clicks <strong>Business Finder</strong> and picks a match",
        note: { k: "Optional", text: "Skipping the Finder costs nothing — the fields below stay open and typed values are kept." },
        changes: ["The results open under the button: a count, a <strong>Hide</strong> control, and a card per candidate.",
                  "Each card carries the name, the registered address, and the registration number with its status.",
                  "Five are listed at a time, with a pager and a line on how to narrow the search.",
                  "Picking one fills the business name, the BRN and the address — marked <em>Auto-filled by Business Finder</em>, not <em>Pre-filled</em>."],
        view: function () { return X.sheet(finderResults(9, [
            ["Meridian Capital LLC", "200 Vesey Street, New York, NY, 10281", "NY DOS 4417762 · Active"],
            ["Meridian Global Partners Inc.", "1209 Orange Street, Wilmington, DE, 19801", "DE File 5582014 · Active"],
            ["Meridian Analytics Inc.", "525 Market Street, San Francisco, CA, 94105", "CA SOS C4129087 · Active"],
            ["Meridian Industrial Holdings LLC", "233 S Wacker Drive, Chicago, IL, 60606", "IL SOS 04581276 · Active"],
            ["Meridian Partners Inc.", "200 California St, San Francisco, CA, 94111", "US-7731-INC · Active"]
          ], 1, 5)); } },

      { num: "5", title: "Optional fields", actor: "Action", noVisual: true,
        trigger: "opens the <strong>View all fields</strong> accordion",
        changes: ["The same accordion as the pre-fill path, but every field inside opens empty.",
                  "Nothing in it blocks <strong>Continue</strong>."] },

      { num: "6", title: "Review", actor: "Action", noVisual: true,
        trigger: "clicks <strong>Continue</strong>",
        changes: ["Identical to the pre-fill path — business details, configuration, add-ons.",
                  "Only what was actually entered is listed, so this group is usually shorter."] },

      { num: "7", title: "Results", actor: "Action", noVisual: true,
        trigger: "clicks <strong>Execute verification</strong>",
        note: { k: "Else", text: "Where the registry does not publish owners, ownership is recorded as not disclosed unless the user supplied it." },
        changes: ["The same verification runs and produces the same report as every other path."] }
    ],
    props: { name: "Business Finder", head: ["", ""], rows: [
      ["Needs", "a country, a jurisdiction, and either a business name (3+ characters) or a BRN"],
      ["Lists", "five candidates at a time, paged, with the total"],
      ["On pick", "fills name, BRN and address — labelled Auto-filled by Business Finder"],
      ["Skipping it", "costs nothing; the fields below stay open"]
    ] } },

  /* ------------------------------------------------------------ option 4 */
  { id: "o4", group: "Option 4 · Transactions", name: "Filtering transactions in chat",
    line: "On the Transactions page the panel answers about the table in front of it — every answer also filters the table.",
    steps: [
      { num: "1", title: "Open the panel on Transactions", actor: "Panel",
        trigger: "opens TruAI while the workspace is showing Transactions",
        note: { k: "Scope", text: "A different agent from the KYB one. It answers only from the rows in this table — asked for something it cannot see, it says so rather than inventing rows." },
        changes: ["The panel opens on <em>What would you like to investigate?</em> with three cards: <em>Show not verified transactions</em>, <em>Find high-risk transactions</em>, <em>Summarize last 7 days activity</em>. The composer reads <em>Ask about transactions</em>.",
                  "A KYB request typed here (verify, KYB, a business name…) switches the workspace to KYB Verification and is answered there by the KYB agent."],
        view: function () { return X.txLanding(); } },

      { num: "2", title: "Ask", actor: "Action",
        trigger: "picks a suggested action, or types the request in their own words",
        note: { k: "Rule", text: "The cards are a shortcut, not the only route — the wording is parsed, so “risky”, “elevated risk” and “high risk” all reach the same filter." },
        changes: ["The request is echoed as the user’s own message.",
                  "The panel shows <em>Reviewing verification activity…</em> while it works.",
                  "The suggested actions hide until the answer has landed."],
        view: function () { return X.txPanel(X.user("Find high-risk transactions") + X.txThinking("Reviewing verification activity…"),
          "Find high-risk transactions", "Thinking", "thinking"); } },

      { num: "3a", title: "Summarize last 7 days", actor: "Panel",
        trigger: "“Summarize last 7 days activity”",
        changes: ["Existing filters are <strong>cleared</strong> first, then the table is scoped to the last 7 days.",
                  "The answer is an activity summary, not a row list: transactions in view, most common outcome, unsuccessful / flagged, needs review, high risk scores, top product.",
                  "A zero count reads positive (green); a non-zero unsuccessful / flagged or high-risk count reads negative, and needs-review reads review.",
                  "Under it, a list headed <em>Found N transactions · notable items</em> (up to five rows of anything unsuccessful, high-risk, or awaiting review).",
                  "The suggested actions change to the after-set: <em>Summarize last 7 days activity</em>, <em>Show verified transactions only</em>, <em>Clear filters and show all</em>."],
        view: function () { return X.txPanel(X.user("Summarize last 7 days activity") +
          X.txReply("<p>Here’s a summary grounded in the 24 transactions currently available in this demo dataset.</p>") +
          X.txSummary("Activity summary", [["Transactions in view", "24 of 24"], ["Most common outcome", "Verified (15)"],
            ["Unsuccessful / flagged", "4", "negative"], ["Needs review", "5", "review"], ["High risk scores", "3", "negative"], ["Top product", "Business Insights", "positive"]]) +
          X.txReply(X.txList("notable items", "A few rows worth a closer look (from the same dataset):", [["Kestrel Freight GmbH", "In Progress"], ["Harbor Point Capital Partners International Holdings LLC", "Not Verified"], ["Apex Dynamics LLC", "Review"]], 0)) +
          X.txFollow(["Summarize last 7 days activity", "Show verified transactions only", "Clear filters and show all"]), "Summarize last 7 days activity", "Awaiting input", "idle"); } },

      { num: "3b", title: "Find high-risk", actor: "Panel",
        trigger: "“Find high-risk transactions”",
        changes: ["The workspace table is filtered to high risk — a real filter, not a highlight.",
                  "The chat leads with the count: <em>Found N transactions · high-risk transactions</em>.",
                  "The matches follow as a compact two-column table — Transaction and Outcome — capped at five rows.",
                  "Rows in chat are read-only; the closing line says <em>Select a row there to open the full report on the right</em>. Beyond five matches the table ends with <em>+N more in the table</em>.",
                  "With matches, the suggested actions switch to the after-set (Summarize / Show verified only / Clear); with none they return to the three filters.",
                  "Medium and low risk are separate intents, reached the same way."],
        view: function () { return X.txPanel(X.user("Find high-risk transactions") +
          X.txReply(X.txList("high-risk transactions", "I found 8 transactions matching “high-risk transactions”. I’ve filtered the table to match.", [["Kestrel Freight GmbH", "In Progress"], ["Harbor Point Capital Partners International Holdings LLC", "Not Verified"], ["Apex Dynamics LLC", "Review"], ["Meridian Capital LLC", "Verified"], ["Northwind Traders Ltd.", "Not Verified"]], 3)) +
          X.txFollow(["Summarize last 7 days activity", "Show verified transactions only", "Clear filters and show all"]), "Find high-risk transactions", "Awaiting input", "idle"); } },

      { num: "3c", title: "Show not verified", actor: "Panel",
        trigger: "“Show not verified transactions”",
        note: { k: "Wording", text: "The product says <strong>not verified</strong>, not “declined” — in the prompt card, in the agent’s copy, and on the outcome tag." },
        changes: ["The table is filtered to unsuccessful outcomes.",
                  "Same shape of answer as high-risk: a count line, then the matching rows with the table’s own outcome tag — red <em>Not Verified</em>, amber (with a clock) for Review, Pending Review and In Progress.",
                  "<em>Find transactions requiring review</em> is the third filter, covering Review, Pending Review and In Progress."],
        view: function () { return X.txPanel(X.user("Show not verified transactions") +
          X.txReply(X.txList("not verified transactions", "I found 3 transactions matching “not verified transactions”. I’ve filtered the table to match.", [["Harbor Point Capital Partners International Holdings LLC", "Not Verified"], ["Apex Dynamics LLC", "Not Verified"], ["Vanguard Global Shipping", "Not Verified"]], 0)) +
          X.txFollow(["Summarize last 7 days activity", "Show verified transactions only", "Clear filters and show all"]), "Show not verified transactions", "Awaiting input", "idle"); } },

      { num: "4", title: "Nothing matched", actor: "Panel",
        trigger: "the request is understood but no row matches",
        changes: ["The reply still leads with <em>Found 0 transactions · …</em> and a line saying nothing was found; an info announcement stands in for the table.",
                  "It says plainly that the agent only uses the transactions shown, and will not invent rows.",
                  "A request the agent cannot parse at all gets a plain help message with example prompts instead.",
                  "The suggested filters come back so the user has somewhere to go."],
        view: function () { return X.txPanel(X.user("Show not verified transactions from Norway") +
          X.txReply(X.txList("not verified transactions", "I checked the demo transaction dataset and didn’t find any not verified transactions. I won’t invent results that aren’t in the table.", [], 0)) +
          X.txFollow(["Show not verified transactions", "Find high-risk transactions", "Find transactions requiring review"]), "Show not verified transactions from Norway", "Awaiting input", "idle"); } },

      { num: "5", title: "Clear", actor: "Action",
        trigger: "“Clear filters and show all”",
        changes: ["Every filter the agent applied is removed and the full table returns: <em>Filters cleared. Showing all N transactions from the demo dataset.</em>",
                  "The suggested actions return to the three filters."],
        view: function () { return X.txPanel(X.user("Clear filters and show all") +
          X.txReply("<p>Filters cleared. Showing all 24 transactions from the demo dataset.</p>") +
          X.txFollow(["Show not verified transactions", "Find high-risk transactions", "Find transactions requiring review"]), "Clear filters and show all", "Awaiting input", "idle"); } }
    ],
    props: { name: "The three cards", head: ["Prompt", "What it does"], rows: [
      ["Summarize last 7 days activity", "clears filters, scopes to 7 days, answers with a summary plus notable rows"],
      ["Find high-risk transactions", "filters the table to high risk; lists the matches"],
      ["Show not verified transactions", "filters the table to unsuccessful outcomes; lists the matches"],
      ["Find transactions requiring review", "a follow-up chip, not a landing card — Review, Pending Review and In Progress"],
      ["Show verified transactions only", "offered after a filter is on"],
      ["Clear filters and show all", "removes every filter the agent applied"]
    ] } },

  /* ------------------------------------------------- key considerations */
  { id: "kc", group: "Across every option", name: "Key considerations", notes: true,
    line: "How the panel behaves between the flows — what persists, what follows the user around, and what the orb is saying.",
    steps: [
      { title: "Persistence and chat history",
        line: "A conversation stays live until the user starts a new one; what came before is kept.",
        changes: ["The thread keeps going across pages and flows; each page is put back the way the conversation left it when the user returns to it.",
                  "<strong>New Chat</strong> in the panel header is the only thing that ends it.",
                  "The header names the chat and its state: the title is drawn from the conversation, the line under it says where it stands.",
                  "Earlier conversations are listed under <strong>Chats</strong>, newest first (the last 12), and reopening one restores its thread and takes the user back to the page it was last on.",
                  "Chats are held in memory for the session only — a page reload starts fresh."],
        view: function () { return X.cap("The header, with New Chat:") +
          X.panelWithHead("Verify Meridian Capital in US", "Awaiting input", "idle", "") +
          X.cap("…and the saved chats:") +
          X.sheet(chatDock(false)); } },

      { title: "Ongoing chat notifications",
        line: "A chat minimized while it is still going says so, rather than going quiet.",
        changes: ["A green dot sits on the <strong>Chats</strong> button in the rail while the panel is minimized with a conversation in it; it clears when the panel is reopened.",
                  "The same dot marks the live row at the top of the Chats list (or the stored row, if that chat is already saved); clicking it reopens the panel.",
                  "It tracks whether the panel is minimized over an open conversation — not unread messages."],
        view: function () { return X.sheet(chatDock(true)); } },

      { title: "Global context awareness",
        line: "The panel follows the subject across pages, and marks the seam when it changes.",
        changes: ["Ask about the other subject and the panel takes the workspace there — a business request on Transactions opens KYB Verification; a transactions or history question in KYB opens Transactions — then the owning agent answers.",
                  "The workspace page changes with the panel; the thread does not.",
                  "Where the conversation crosses from one to the other, a labelled rule marks it: <em>Continued in KYB Verification</em>, or <em>Continued in Transactions</em>.",
                  "Only the latest crossing is marked — older rules are dropped so the thread does not fill with them.",
                  "Scope is the MVP's: verifying businesses and retrieving transactions. Outside it, the panel says so rather than guessing."],
        view: function () { return X.pane(X.user("Show not verified transactions") +
          '<div class="d1-ai d3-tx-agent-wrap"><div class="d3-tx-agent"><p class="d3-tx-agent__found">Found 3 transactions · not verified transactions</p>' +
          "<p>I found 3 transactions matching “not verified transactions”. I’ve filtered the table to match — " +
          "open a row there to view the full report.</p>" +
          '<div class="tds-data-table-container d3-tx-agent__table"><div class="tds-data-table__wrapper">' +
          '<table class="tds-data-table tds-data-table--compact">' +
          "<thead><tr><th>Transaction</th><th>Outcome</th></tr></thead><tbody>" +
          [["Harbor Point Capital Partners International Holdings LLC"], ["Apex Dynamics LLC"],
           ["Vanguard Global Shipping"]].map(function (r) {
            return '<tr><td class="tds-data-table__text-cell">' + r[0] + '</td><td><span class="tds-tag tds-tag--negative">Not Verified</span></td></tr>';
          }).join("") + "</tbody></table></div></div>" +
          "<p>The table is filtered to these results. Select a row there to open the full report on the right.</p></div></div>" +
          '<div class="d3-chat-divider" role="separator"><span>Continued in KYB Verification</span></div>' +
          X.user("meridian us") +
          '<div class="d3-kyb-cand-panel"><div class="ai-reply">' +
          '<p class="ai-reply__lead">Pick a business below and I’ll verify it with your default product — nothing else to set up.</p>' +
          "</div></div>"); } },

      { title: "Expand and minimize",
        line: "The panel has three sizes, and the controls for them sit together in its header.",
        changes: ["Three controls sit together in the header: <strong>New Chat</strong>, <strong>Expand</strong>, <strong>Minimize</strong>. The panel is also drag-resizable.",
                  "<strong>Expand</strong> sets <code>data-d3-chat-size=\"full\"</code>: the panel takes the whole canvas beside the rail, and its icon flips to a collapse arrow.",
                  "Expanded is for reading — a long answer, a wide table — and the thread is unchanged by it.",
                  "<strong>Minimize</strong> collapses it to the ask bar: a single bar showing the page’s prompt. Clicking it reopens the panel where it was.",
                  "Minimized is not closed: a conversation left running keeps running, and the rail dot says so.",
                  "The bar’s text follows the page — <em>Ask about transactions</em> on Transactions, <em>Ask about business verification</em> in KYB. The in-panel composer is the one that follows the step, e.g. <em>Select a match or refine your search</em>.",
                  "<strong>Esc</strong> exits Expanded first; a second Esc minimizes. On Home, Minimize just closes the panel."],
        view: function () { return X.cap("Panel — the default, beside the workspace:") +
          X.panelWithHead("Verify Meridian Capital in US", "Awaiting input", "idle", "") +
          X.cap("Expanded — the whole canvas, and the icon flips to collapse:") +
          expandedPanel() +
          X.cap("Minimized — the ask bar:") +
          X.sheet(askBar("Ask about transactions")); } },

      { title: "AI visual reactions",
        line: "One component, four states — the orb says what the assistant is doing without a line of copy.",
        note: { k: "Reference", text: 'The states in isolation: <a href="https://zoeychun.github.io/trulioo-labs-design-system/portal-2.0/Misc/Loader/experiments/truai-bubble/" target="_blank" rel="noopener">the TruAI bubble experiments page</a>.' },
        changes: ["<strong>Idle</strong> — waiting, a slow drift.",
                  "<strong>Thinking</strong> — the agent is working out a reply, including a transactions answer (<em>Reviewing verification activity…</em>).",
                  "<strong>Acting</strong> — a KYB step is running (<em>Checking registry</em>, <em>Reading ownership</em>, <em>Screening sanctions</em>, <em>Generating report</em>); the status line names it.",
                  "<strong>Completed</strong> — a report is ready (<em>Report ready</em>). The panel’s large orb eases back to idle after about 1.5s; the header orb stays until the status changes.",
                  "The orb appears large on the panel’s empty landing and small beside the title once a conversation starts; the Home hero has its own orb.",
                  "The picker above runs the real component — switch states to watch it move between them, not just land on them."],
        view: function () { return orbPlayer([["idle", "Idle"], ["thinking", "Thinking"],
          ["acting", "Acting"], ["completed", "Completed"]], "idle"); } }
    ],
    props: { name: "Where the state lives", head: ["Behaviour", "Driven by"], rows: [
      ["Conversation continues", "the thread is kept until New Chat is pressed"],
      ["Rail dot", "<code>data-d3-chat-ongoing</code> on the shell"],
      ["Live row in Chats", "the row's own live state, inside the Chats dock"],
      ["Page-change rule", "added when the answering agent changes; only the latest is kept"],
      ["Panel size", "<code>data-d3-chat-size</code> — expanded, panel, or the ask bar"],
      ["Orb state", "idle · thinking · acting · completed"]
    ] } }

  ] };
})();
