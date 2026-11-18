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
      inner + "</div></div>";
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
    return '<div class="d3-kyb-wizard">' + wizTop(o.count, o.done, o.total, o.chips) +
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
    return '<div class="d1-ai d1-block d3-brh-reply"><div class="d3-brh-reply__card">' +
      '<div class="d3-brh-reply__section d3-brh-reply__head"><span class="d3-brh-reply__head-copy">' +
      '<span class="d3-rc__label text-label-sm-uppercase">Business Risk Horizon Score' + (o.run ? " · run " + o.run : "") + "</span>" +
      '<span class="d3-rc__scoreval"><b class="d3-rc__score-num">' + o.score + "</b>" +
      '<span class="d3-rc__score-label d3-rc__score-label--intermediate">' + o.label + "</span></span></span>" +
      '<div class="d3-brh-split"><button type="button" class="tds-btn tds-btn--secondary tds-btn--md d3-brh-split__main">View Latest Score</button></div></div>' +
      '<div class="d3-brh-reply__section"><span class="d3-rc__label text-label-sm-uppercase">Key findings</span>' +
      '<ul class="d3-brh-reply__list">' + list + "</ul></div>" +
      '<div class="d3-brh-reply__section d3-brh-reply__txn"><span class="d3-rc__label text-label-sm-uppercase">Transaction ID</span>' +
      '<span class="d3-brh-reply__txid text-body-xs">' + o.tx + "</span>" +
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--sm">Copy</button></div>' +
      "</div></div>";
  }

  /* The confirmation dialog, shown in place rather than as an overlay. */
  function brhDialog(again) {
    /* --inline keeps the panel in the flow instead of pinning it to the viewport. */
    return '<div class="dx-dialog tds-dialog tds-dialog--inline tds-dialog--center tds-dialog--md tds-dialog--open d3-kyb-brh-dialog">' +
      '<div class="tds-dialog__panel" role="dialog" aria-modal="true">' +
      '<header class="tds-dialog__header"><div class="tds-dialog__header-row">' +
      '<h2 class="tds-dialog__title">Run Business Risk Horizon' + (again ? " again" : "") + "?</h2>" +
      '<button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss dialog">' +
      '<span class="tds-icon-btn__icon" aria-hidden="true"><svg class="d3-fa-line" viewBox="0 0 16 16" fill="none"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="m4 4 8 8M12 4l-8 8"/></svg></span></button>' +
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
    var icon = again
      ? '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M13 8a5 5 0 1 1-1.5-3.55M13 2.75v3h-3"/></svg>'
      : '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg>';
    return '<p class="d3-rc__label text-label-sm-uppercase" style="margin:0 0 8px">Suggested Actions</p>' +
      '<button type="button" class="tds-btn tds-btn--' + (again ? "secondary" : "primary") + ' tds-btn--md d3-brh-hero-cta">' +
      '<span class="tds-btn__leading-icon" aria-hidden="true">' + icon + "</span>" + label + "</button>";
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
      '<div class="d3-ai-ident"><span class="d3-ai-ident__orb" data-orb="' + (orbMode || "idle") + '"></span>' +
      '<span class="d3-ai-ident__copy"><span class="d3-ai-ident__title">' + title + "</span>" +
      '<span class="d3-ai-ident__status"><span>' + status + "</span></span></span></div>" +
      '<div class="d3-chat-pane__tools">' +
      iconBtn(I.newChat, "New Chat", "tds-icon-btn--invisible tds-icon-btn--circular d3-chat-pane__new", " data-d3-chat-new data-d3-chat-back") +
      iconBtn(I.expand, "Expand", "tds-icon-btn--invisible tds-icon-btn--circular d3-chat-pane__expand") +
      iconBtn(I.minimize, "Minimize", "tds-icon-btn--invisible d3-chat-pane__close") +
      "</div></div>";
  }

  /* A panel with its header, for steps where the header is part of the picture. */
  function panelWithHead(title, status, orbMode, inner, attrs) {
    return '<div class="d1-shell" data-d3-chat="open" data-d3-chat-mode="kyb" data-d3-ai-orb="header"' + (attrs || "") + '>' +
      '<aside class="d3-chat-pane dx-panelbox" style="display:flex;margin:0;box-shadow:none;min-width:0;padding:16px">' +
      panelHead(title, status, orbMode) +
      '<div style="margin-top:12px">' + inner + "</div></aside></div>";
  }

  /* The portal home hero — scenery around the real home composer. The composer
     markup is the portal's own, so the layout rules in docs.css can key off it. */
  function homeHero(typed) {
    return '<div class="dx-hero"><p class="dx-hero__hello">Welcome back, Jane.</p>' +
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
      '<p class="dx-hero__note">Tru AI can make mistakes. Please double-check responses.</p></div>';
  }

  /* The result summary card under the report-ready header in the chat. */
  var RC_CHECK = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function resultCard(o) {
    var chips = (o.checks || []).map(function (c) {
      return '<span class="d3-rc__chip is-done"><span class="d3-rc__chip-icon">' + RC_CHECK + "</span>" + c + "</span>";
    }).join("");
    return '<div class="d1-report-ready" data-d1-report-action data-d3-rc>' +
      '<div class="d1-report-ready__card">' +
      '<span class="d1-report-ready__icon" aria-hidden="true"><i class="fa-regular fa-file-lines"></i></span>' +
      '<div class="d1-report-ready__meta">' +
      '<p class="d1-report-ready__name">' + o.name + "</p>" +
      '<p class="d1-report-ready__addr">' + o.addr + "</p>" +
      '<p class="d1-report-ready__reg">Reg. ' + o.reg + "</p></div>" +
      '<button type="button" class="tds-btn tds-btn--primary tds-btn--md">View</button>' +
      '<div class="d3-rc__body">' +
      '<div class="d3-rc__verdict"><span class="d1-tag d1-tag--positive">' + (o.verdict || "Verified") + "</span></div>" +
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
      "</div></div></div>";
  }

  window.DOCSX = { I: I, pane: pane, panelHead: panelHead, panelWithHead: panelWithHead, homeHero: homeHero, resultCard: resultCard, sheet: sheet, cap: cap, iconBtn: iconBtn, user: user, ai: ai,
    composer: composer, promptCard: promptCard, identRow: identRow, wizTop: wizTop,
    LEVELS: LEVELS, levelList: levelList, ADDONS: ADDONS, ADDON_NAME: ADDON_NAME,
    addonGroup: addonGroup, selector: selector, wizCard: wizCard, wizReply: wizReply, finderChoice: finderChoice, brhReplyCard: brhReplyCard, brhDialog: brhDialog, suggestedActions: suggestedActions, confirmCard: confirmCard, nextList: nextList, tabs: tabs };
})();

/* ========================================================= SCENARIOS ==== */
(function () {
  "use strict";
  var X = window.DOCSX, I = X.I;

  var ENTITY = "Meridian Industrial Holdings LLC";
  var LEVEL_NAME = { essentials: "Business Essentials", insights: "Business Insights", complete: "Business Complete" };
  var SCOPE = { essentials: "Business Essentials", insights: "Business Insights + Web Insights + UBO Discovery + Business Risk Horizon",
                complete: "Business Complete + Business Risk Horizon" };
  var ECHO = { essentials: "Business Essentials · Business Finder · Meridian Capital LLC · No add-ons",
               insights: "Business Insights · Business Finder · Meridian Capital LLC · Business Risk Horizon",
               complete: "Business Complete · Business Finder · Meridian Capital LLC · Business Risk Horizon" };
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
    return '<div class="d1-activity"><button type="button" class="d1-activity__toggle' +
      (running ? " d1-activity__toggle--current" : "") + '" aria-expanded="' + (open ? "true" : "false") + '">' +
      '<span class="d1-activity__mark">' +
      (running ? '<i class="d1-spin fa-solid fa-spinner fa-spin" aria-hidden="true"></i>'
               : '<i class="fa-regular fa-circle-check" aria-hidden="true"></i>') + "</span>" +
      "<span>" + label + "</span>" + I.chevD + I.chevU + "</button>" +
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
        '<span class="tds-stepper__icon-badge">' + n + "</span></span>" +
        '<span class="tds-stepper__title">' + label + "</span></div></div></li>";
    }
    return '<ol class="tds-stepper tds-stepper--horizontal d3-kyb-formsteps" aria-label="Verification steps">' +
      item(1, "Details", onReview ? "complete" : "current", !onReview) +
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
    '<span class="d3-kyb-savedline__text"><b>Default configuration</b><span>Business Insights · BusinessInsights</span></span>' +
    '<button type="button" class="tds-btn tds-btn--md tds-btn--secondary">Edit</button></div></div>';

  var ACC = '<div class="d3-kyb-fields__acc"><button type="button" class="d3-kyb-fields__acc-head" aria-expanded="false">' +
    '<span class="d3-kyb-fields__acc-chevron" aria-hidden="true">' + I.arrow + "</span>" +
    '<span class="d3-kyb-fields__acc-title">View all fields</span></button></div>';

  function prefillRow(on) {
    return '<div class="d3-kyb-titlerow"><div class="d3-demo-prefill">' +
      '<span class="d3-demo-prefill__copy"><span class="d3-demo-prefill__label" id="dxpf' + (on ? 1 : 0) + '">Pre-fill</span>' +
      '<span class="d3-demo-prefill__sub">for dev team review</span></span>' +
      '<div class="tds-switch"><div class="tds-switch__track tds-switch__track--sm' + (on ? " tds-switch__track--on" : "") +
      '" role="switch" tabindex="-1" aria-checked="' + on + '" aria-labelledby="dxpf' + (on ? 1 : 0) + '">' +
      '<span class="tds-switch__indicator" aria-hidden="true"></span><span class="tds-switch__handle" aria-hidden="true"></span></div></div>' +
      '</div><h1 class="d3-workspace__title">KYB Verification</h1></div>' +
      '<p class="d3-workspace__lede">' + (on ? "Search for a business to start a verification yourself." : "Enter the business details to start a verification.") + "</p>";
  }

  function reportBlock(checks) {
    return '<section class="d1-block"><div><h2 class="d1-report__title">Meridian Capital LLC</h2>' +
      '<span class="d1-tag d1-tag--positive">Verified</span>' +
      '<div class="d1-report__body"><div class="d1-summary"><h3>Checks reported</h3><p>' + checks + "</p></div></div></div></section>";
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
                  "The matches arrive grouped by city, with a count on each.",
                  "Nothing about the package is asked — the contract default already answers it."],
        note: { k: "Else", text: 'No saved default → the level question comes first, <strong>Question 1 of 4</strong>. That is <a href="#s/o2b">Scenario B</a>.' },
        view: function () { return X.panelWithHead("Verify meridian, US in US", "Awaiting input", "idle",
          matchSelector(), ' data-d3-ai-verify="selector"'); } },

      { title: "Select the entity", actor: "Action", trigger: "picks the business from the search results",
        changes: ["The choice is echoed back as the user’s own message.",
                  "The confirmation card replaces the list.",
                  "The scope line is labelled <strong>Default configuration</strong> — the package came from the contract, not from a choice just made."],
        note: { k: "Or", text: '<strong>Edit</strong> instead of Verify opens every question — <a href="#s/o2b">Scenario B</a>.' },
        view: function () { return X.pane(X.user("Meridian Capital LLC") +
          '<div class="ai-reply" style="margin:16px 0"><p class="ai-reply__lead">Everything is ready. Click below to start the verification.</p></div>' +
          X.confirmCard([["Entity", "Meridian Capital LLC (Active)"],
                         ["Default configuration", SCOPE.insights]])); } },

      { title: "Verify", actor: "Action", trigger: "clicks <strong>Verify</strong> on the confirmation card",
        changes: ["The investigation runs in the chat, one step at a time, with the current step in dark text and the finished ones greyed.",
                  "The agent status follows the running step, ending on <em>Report ready</em>.",
                  "The result arrives as one card: verdict, risk score, the checks that reported, and the transaction ID."],
        view: function () { return X.pane(
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
            reg: "4417762", score: "18", scoreLabel: "Low Risk Entity", scoreTone: "positive",
            checks: ["Business registry", "Screening", "Ownership", "Web insights", "Business Risk Horizon"],
            tx: "8c2f4e7a-19bd-4f02-a6c1-77de42915b3a" }), ' data-d3-ai-step="report"'); } }
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
                  "Edit folds the confirmation back into the wizard at question 1.",
                  "The answers the contract already made come along as chips."],
        view: function () { return X.pane(
          '<div class="d3-kyb-wizard">' + X.wizTop(null, 0, 0, null, "Business Insights + Web Insights + UBO Discovery + Business Risk Horizon") + "</div>"); } },

      { num: "2a", title: "Level", actor: "Action", trigger: "selects the verification level",
        changes: function (l) { return ["The chosen level is marked as selected.",
          l === "essentials" ? "The count drops to <strong>3</strong> — Essentials offers no add-ons, so that question is removed."
                             : "The count stays at <strong>4</strong>.",
          "The answer replaces the level chip at the top of the card."]; },
        view: function (l) { return X.pane(X.wizCard({
          count: "Question 1 of 4", done: 0, total: 4,
          chips: ["Business Finder", "Web Insights, UBO Discovery, Business Risk Horizon"],
          body: X.wizReply("Got it — meridian in United States.",
                           "What level of compliance and risk verification do you need to perform today?") +
                X.levelList(l),
          next: true }), "", "dx-panelbox--wide"); } },

      { num: "2b", title: "Search mode", actor: "Action",
        trigger: "chooses <strong>Business Finder</strong> or <strong>Enter details manually</strong>",
        changes: ["Business Finder searches the registry and locks what it returns.",
                  "Manual entry leaves the entity fields to the user.",
                  "Either way the answer becomes a chip and the wizard moves on."],
        note: { k: "Else", text: "Where the registry cannot be searched — Canada and Singapore — this question is removed and the flow goes straight to manual entry." },
        view: function (l) { return X.pane(X.wizCard({
          count: "Question 2 of " + (l === "essentials" ? 3 : 4), done: 1, total: l === "essentials" ? 3 : 4,
          chips: [LEVEL_NAME[l], "Web Insights, UBO Discovery, Business Risk Horizon"],
          body: X.wizReply("Selected " + LEVEL_NAME[l] + ".",
                           "Would you like to use Business Finder? It searches the Secretary of State business registry for matching entities, so you can pick the right one instead of typing its details.") +
                X.finderChoice("on"),
          back: true, next: true }), "", "dx-panelbox--wide"); } },

      { num: "2c", title: "Business entity", actor: "Action", trigger: "picks the target business from the matches",
        changes: function (l) { return ["The matches render inside the wizard, grouped by city.",
          "Picking a row answers the question and adds the entity name as a chip.",
          l === "essentials" ? "This is the <strong>last</strong> question on Essentials."
                             : "One question left after this one."]; },
        view: function (l) { return X.pane(X.wizCard({
          count: "Question 3 of " + (l === "essentials" ? 3 : 4), done: 2, total: l === "essentials" ? 3 : 4,
          chips: [LEVEL_NAME[l], "Business Finder", "Web Insights, UBO Discovery, Business Risk Horizon"],
          body: '<p class="d3-ai-selector__title" style="margin:0 0 12px">Which “Meridian” should I investigate?</p>' +
                X.selector("", MATCH_CHIPS, MATCH_ROWS, "1-3 of 5").replace('<p class="d3-ai-selector__title"></p>', ""),
          back: true }), ' data-d3-ai-verify="selector"', "dx-panelbox--wide"); } },

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
          back: true, next: true }), "", "dx-panelbox--wide"); } },

      { num: "3", title: "Verify", actor: "Action", trigger: "clicks <strong>Verify</strong> on the updated confirmation card",
        changes: function (l) { return ["The wizard folds away and the confirmation card returns with the new scope.",
          "The checks run, then the result arrives as one card.",
          l === "essentials" ? "Checks reported: registry and screening only."
                             : "Checks reported: registry, screening, ownership, web insights and the risk score."]; },
        view: function (l) { return X.pane(
            X.ai("Everything is ready. Click below to start the verification.", "margin-bottom:16px") +
            X.confirmCard([["Entity", "Meridian Industrial Holdings LLC (Active)"],
                           ["Default configuration", SCOPE[l]]])) +
          X.cap("…and when it finishes:") +
          X.pane(X.resultCard({ name: "Meridian Industrial Holdings LLC",
            addr: "233 S Wacker Drive, Chicago, IL 60606", reg: "04581276",
            score: l === "essentials" ? "" : "47", scoreLabel: "Medium Risk Entity", scoreTone: "intermediate",
            checks: l === "essentials"
              ? ["Business registry", "Screening"]
              : ["Business registry", "Screening", "Ownership", "Web insights", "Business Risk Horizon"],
            tx: "8c2f4e7a-19bd-4f02-a6c1-77de42915b3a" }), ' data-d3-ai-step="report"'); } }
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
                  "The card carries a <strong>View Latest Score</strong> button; after a second run it gains a caret listing every run.",
                  "The suggested next actions swap to <em>View latest</em> and <em>Run again</em>, and move <em>below</em> the newest message."],
        view: function () { return X.pane(X.user("Run Business Risk Horizon Score") +
          '<p class="d3-brh-reply__lead" style="margin:16px 0">Business Risk Horizon has run for <b>' + ENTITY + "</b>.</p>" +
          X.brhReplyCard({ score: "47", label: "Medium Risk Entity", tx: "d0ac9cfc-cc91-4ae5-a2b6-83cbae02bd46" })); } },

      { num: "5", title: "The new transaction", actor: "Action", noVisual: true,
        trigger: "clicks <strong>View Latest Score</strong> on the card",
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
            checks: ["Business registry", "Screening", "Ownership", "Web insights"],
            tx: "8c2f4e7a-19bd-4f02-a6c1-77de42915b3a" }), ' data-d3-ai-step="report"') +
          X.cap("…and below it, the separate run:") +
          X.pane(X.brhReplyCard({ score: "47", label: "Medium Risk Entity", tx: "d0ac9cfc-cc91-4ae5-a2b6-83cbae02bd46" })); } },

      { num: "7", title: "Run it again", actor: "Action",
        trigger: "picks <strong>Run Business Risk Horizon again</strong> from the suggested next actions",
        changes: ["The list now carries four rows: view the latest run, run another, and the two standard follow-ups.",
                  "A repeat run makes a new transaction — earlier runs stay as they are.",
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
  { id: "o2d", group: "Option 2 · AI chat", name: "D · Long verification delays",
    line: "Some registries take up to 24 hours. The run becomes a submitted record and the result arrives later as a notification.",
    steps: [
      { title: "Start", actor: "Action", noVisual: true, trigger: "types “Verify Brightwater Holdings Ltd”",
        note: { k: "Demo", text: "<strong>Brightwater Holdings Ltd.</strong> stands in for the slow case; every other name resolves normally.", warn: true },
        changes: ["Nothing is different yet — this is whichever of Scenario A or B applies."],
        view: function () { return X.pane(X.user("Verify Brightwater Holdings Ltd")); } },

      { title: "Run", actor: "Action", noVisual: true, trigger: "confirms, and the investigation starts",
        changes: ["The investigation starts exactly as it always does.",
                  "The composer is held: “Verification in progress…”."],
        view: function () { return X.pane('<section class="d1-block"><div class="d1-progress">' +
          '<div class="d1-progress__row"><span>Investigating</span><span class="d1-progress__pct">40%</span></div>' +
          '<div class="d1-progress__track"><div class="d1-progress__fill d1-progress__fill--active" style="width:40%"></div></div></div>' +
          '<div class="d1-steps"><div class="d1-activity"><button type="button" class="d1-activity__toggle d1-activity__toggle--current" aria-expanded="false">' +
          '<span class="d1-activity__mark"><i class="d1-spin fa-solid fa-spinner fa-spin" aria-hidden="true"></i></span>' +
          "<span>Pulling business registry records…</span>" + I.chevD + I.chevU + "</button></div></div></section>"); } },

      { title: "Submitted", actor: "Panel", noVisual: true, trigger: "replaces the progress block with a submitted card",
        changes: ["The live progress block is <strong>removed</strong>, not left spinning.",
                  "A submitted card takes its place: the wait, the entity, and a way to check status.",
                  "The composer is released and the suggestions change to leaving — start another, or see recent.",
                  "The right panel shows a fuller status card; Recent transactions tags the entry <em>In Progress</em>."],
        view: function () { return X.pane('<div class="d1-ai"><div class="d1-report-ready">' +
          '<p class="d1-report-ready__title">Verification submitted. This can take up to 24 hours. You can keep working and I will tell you when it is ready.</p>' +
          '<div class="d1-report-ready__card"><span class="d1-report-ready__icon" aria-hidden="true"><i class="fa-regular fa-clock"></i></span>' +
          '<div class="d1-report-ready__meta"><p class="d1-report-ready__name">Brightwater Holdings Ltd.</p>' +
          '<p class="d1-report-ready__addr">In progress</p></div>' +
          '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md">View status</button></div>' +
          '<button type="button" class="d3-sim-return">Simulate verification return <span class="d3-sim-return__sub">for dev team review</span></button>' +
          "</div></div>"); } },

      { title: "Trigger return", actor: "Action", noVisual: true, trigger: "clicks <strong>Simulate verification return</strong>", demo: true,
        note: { k: "Demo", text: "A review affordance only. The result also comes back on its own after about 15 seconds. <strong>Not part of the product.</strong>", warn: true },
        changes: ["Nothing in the product — this button exists so the team can see the end of the flow without waiting."],
        view: function () { return X.pane('<button type="button" class="d3-sim-return">Simulate verification return ' +
          '<span class="d3-sim-return__sub">for dev team review</span></button>'); } },

      { title: "Ready", actor: "Panel", noVisual: true, trigger: "notifies wherever the user is in the portal",
        note: { k: "Rule", text: "The alert fires anywhere in the portal, not just on the KYB page — the point of the submitted state is that the user left." },
        changes: ["An alert appears with the entity, the transaction and a View action.",
                  "The submitted card stays as the record, with its buttons disabled.",
                  "The report summary is added below it, and Recent transactions turns Verified."],
        view: function () { return '<div style="width:100%;max-width:420px;margin:0 auto">' +
          '<div class="tds-announcement tds-announcement--info">' +
          '<span class="tds-announcement__icon" aria-hidden="true"><i class="fa-regular fa-bell"></i></span>' +
          '<div class="tds-announcement__content"><p class="tds-announcement__title">Verification ready</p>' +
          '<p class="tds-announcement__message">Brightwater Holdings Ltd. · Transaction 8c2f4e7a</p>' +
          '<div class="tds-announcement__actions"><button type="button" class="tds-btn tds-btn--primary tds-btn--sm">View</button></div>' +
          "</div></div></div>"; } }
    ],
    props: { name: "Timing", head: ["", ""], rows: [
      ["Product", "about a minute of live progress, then the submitted state; the result up to 24 hours"],
      ["Demo", "about 5 seconds to submitted, about 15 to the result"],
      ["Also shows in", "the right panel status card · Recent transactions, tagged In Progress · a dot on the KYB rail button"]
    ] } },

  /* ----------------------------------------------------------- option 3A */
  { id: "o3a", group: "Option 3 · Manual form", name: "A · Auto pre-fill path",
    line: "The contract includes pre-fill, so the registry fills the form and the user reviews it.",
    steps: [
      { title: "Pre-fill on", actor: "Action", noVisual: true, trigger: "checks the <strong>Pre-fill</strong> switch is ON", demo: true,
        changes: ["The landing offers a business search rather than an empty form.",
                  "In the product this comes from the contract, not a switch."],
        view: function () { return X.sheet(prefillRow(true)); } },

      { title: "Search", actor: "Action", noVisual: true, trigger: "types “meridian” and selects a result",
        changes: ["The dropdown lists matches with their jurisdiction, and says how many it is showing of how many.",
                  "Selecting one opens the form with the registry data already in it.",
                  "Each filled field is marked <strong>Pre-filled</strong>."],
        view: function () { return X.sheet('<div class="vb-search-field">' +
          '<div class="tds-select tds-select--interactive vb-search-country">' +
          '<button type="button" class="tds-select__trigger tds-select__trigger--lg">' +
          '<span class="tds-select__country-flag" aria-hidden="true"><span class="fi fi-us"></span></span>' +
          '<span class="tds-select__value vb-search-country__value">United States</span>' +
          '<span class="tds-select__trailing-group">' + CARET + "</span></button></div>" +
          '<div class="tds-combobox tds-combobox--full-width tds-combobox--open vb-combobox">' +
          '<div class="tds-combobox__field tds-combobox__field--lg vb-combobox__field">' +
          '<span class="tds-combobox__leading-visual vb-combobox__icon" aria-hidden="true">' + SEARCH + "</span>" +
          '<input class="tds-combobox__input" type="text" value="meridian" readonly aria-label="Search business"></div>' +
          '<div class="tds-combobox__menu"><div class="tds-dropdown-panel vb-combobox__panel" role="listbox">' +
          '<div class="vb-combobox__options">' +
          ["Meridian Apex Consulting Inc.", "Meridian Capital LLC", "Meridian Global Partners Inc."].map(function (n, i) {
            return '<button type="button" class="tds-action-list-item vb-combobox__option' + (i === 1 ? " tds-action-list-item--active" : "") +
              '" role="option"><span class="tds-action-list-item__content"><span class="tds-action-list-item__label">' + n + "</span>" +
              '<span class="tds-action-list-item__description">United States</span></span></button>';
          }).join("") + "</div>" +
          '<div class="vb-combobox__footer">Showing 5 of 1284 matches — keep typing to refine</div>' +
          "</div></div></div></div>"); } },

      { title: "Review fields", actor: "Action", noVisual: true, trigger: "keeps the default configuration, or clicks <strong>Edit</strong>",
        note: { k: "Shared", text: "One setting, three places — Settings, this form and the AI wizard all show the same configuration." },
        changes: ["The configuration sits above the fields as one line, with an Edit button.",
                  "Required and pre-filled fields are distinguished at a glance."],
        view: function () { return X.sheet(stepper(false) + SAVEDLINE +
          '<div class="d3-kyb-fields__grid">' +
          field("Business Name", "Meridian Capital LLC", true, true) + field("Country", "United States", false, true) +
          field("Jurisdiction Of Incorporation", "NY, United States", false, true) +
          field("Business Registration Number", "NY DOS 4417762", false, true) + "</div>"); } },

      { title: "Optional fields", actor: "Action", noVisual: true, trigger: "opens the <strong>View all fields</strong> accordion",
        changes: ["Everything beyond the required and recommended fields is collapsed by default.",
                  "Nothing in here blocks Continue."],
        view: function () { return X.sheet(ACC); } },

      { title: "Review step", actor: "Action", noVisual: true, trigger: "clicks <strong>Continue</strong>",
        changes: ["Step 2 shows business details and configuration as two groups.",
                  "The add-on list is the same one the chat wizard shows, offering the same modules."],
        view: function () { return X.sheet(stepper(true) +
          '<p class="d3-kyb-step__title">Review</p>' +
          '<p class="d3-kyb-step__hint">Check the details and choose any add-ons before you run the verification.</p>' +
          '<div class="d3-kyb-review"><div class="d3-kyb-review__group"><p class="d3-kyb-review__group-title">Business details</p>' +
          '<dl class="d3-kyb-review__grid">' +
          '<div class="d3-kyb-review__row"><dt>Business Name</dt><dd>Meridian Capital LLC</dd></div>' +
          '<div class="d3-kyb-review__row"><dt>Jurisdiction</dt><dd>NY, United States</dd></div></dl></div>' +
          '<div class="d3-kyb-review__group"><p class="d3-kyb-review__group-title">Configuration</p>' +
          '<dl class="d3-kyb-review__grid">' +
          '<div class="d3-kyb-review__row"><dt>Product</dt><dd>Business Insights</dd></div>' +
          '<div class="d3-kyb-review__row"><dt>Package</dt><dd>BusinessInsights</dd></div></dl></div></div>' +
          X.addonGroup("insights") +
          '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px">' +
          '<button type="button" class="tds-btn tds-btn--lg tds-btn--secondary">Back</button>' +
          '<button type="button" class="tds-btn tds-btn--lg tds-btn--primary">Execute verification</button></div>'); } },

      { title: "Results", actor: "Action", noVisual: true, trigger: "clicks <strong>Execute verification</strong>",
        note: { k: "Then", text: 'Risk score left unticked → <a href="#s/o2c">Scenario C</a>. Brightwater → <a href="#s/o2d">Scenario D</a>.' },
        changes: ["From here the outcome is identical to the chat path — same report, same tabs, same rules.",
                  "The panel narrates it alongside."],
        view: function () { return X.pane(reportBlock(CHECKS.insights), ' data-d3-ai-step="report"'); } }
    ],
    props: { name: "What the words mean", head: ["On screen", "Means"], rows: [
      ["Product", "the verification level — Essentials, Insights or Complete"],
      ["Package", "the billing sub-account for that level"],
      ["Verification Level", "the heading over the level cards in Settings"]
    ] } },

  /* ----------------------------------------------------------- option 3B */
  { id: "o3b", group: "Option 3 · Manual form", name: "B · Manual data entry path",
    line: "No pre-fill, so the form opens empty. Business Finder unlocks once there is enough to search with.",
    steps: [
      { title: "Pre-fill off", actor: "Action", noVisual: true, trigger: "sets the <strong>Pre-fill</strong> switch to OFF", demo: true,
        note: { k: "Knock-on", text: "The same setting drives the chat — with pre-fill off, the AI stops asking the Business Finder question too." },
        changes: ["The business search is replaced by a country selector.",
                  "The lede changes to “Enter the business details to start a verification.”"],
        view: function () { return X.sheet(prefillRow(false)); } },

      { title: "Country first", actor: "Action", noVisual: true, trigger: "selects a country to open the form",
        changes: ["The country comes first because it decides the rest — which registry, and which fields are needed.",
                  "Only then do the empty fields appear."],
        view: function () { return X.sheet('<div class="d3-kyb-countrycb"><label class="tds-field-label">Country</label>' +
          '<div class="tds-combobox tds-combobox--full-width tds-combobox--open">' +
          '<div class="tds-combobox__field tds-combobox__field--lg">' +
          '<span class="tds-combobox__leading-visual d3-cc-flag" aria-hidden="true">' + SEARCH + "</span>" +
          '<input class="tds-combobox__input" type="text" placeholder="Search country" readonly aria-label="Country">' +
          '<span class="tds-combobox__trailing-group">' + CARET + "</span></div>" +
          '<div class="tds-combobox__menu"><div class="tds-dropdown-panel d3-cc-panel" role="listbox">' +
          [["us", "United States"], ["gb", "United Kingdom"], ["ca", "Canada"], ["sg", "Singapore"]].map(function (c) {
            return '<button type="button" class="tds-combobox__option d3-cc-option" role="option">' +
              '<span class="fi fi-' + c[0] + '" aria-hidden="true"></span><span>' + c[1] + "</span></button>";
          }).join("") + "</div></div></div></div>"); } },

      { title: "Unlock Finder", actor: "Action", noVisual: true, trigger: "enters a jurisdiction and either a business name or a BRN",
        changes: ["The Business Finder button stays inert until there is enough to search with.",
                  "Its requirement is stated in words underneath, rather than discovered by clicking."],
        view: function () { return X.sheet('<div class="d3-kyb-fields__grid">' +
          field("Business Name", "", true) + field("Jurisdiction Of Incorporation", "", false, false, "Select jurisdiction") +
          field("Business Registration Number", "") + "</div>" +
          '<div class="d3-kyb-find"><button type="button" class="tds-btn tds-btn--md tds-btn--secondary d3-kyb-find__btn" aria-disabled="true">' +
          '<span class="d3-kyb-find__icon">' + SEARCH + "</span>Business Finder</button>" +
          '<p class="d3-kyb-find__hint">Business Finder needs a jurisdiction and either a business name or a BRN.</p></div>'); } },

      { title: "Search — optional", actor: "Action", noVisual: true, trigger: "clicks <strong>Business Finder</strong> and picks a match",
        changes: ["Using the finder fills and locks the registry fields, the same way the pre-fill path does.",
                  "Skipping it leaves everything as typed."],
        view: function () { return X.sheet('<div class="d3-kyb-fields__grid">' +
          field("Business Name", "Meridian", true) + field("Jurisdiction Of Incorporation", "NY, United States") + "</div>" +
          '<div class="d3-kyb-find"><button type="button" class="tds-btn tds-btn--md tds-btn--secondary d3-kyb-find__btn dx-point">' +
          '<span class="d3-kyb-find__icon">' + SEARCH + "</span>Business Finder</button>" +
          '<p class="d3-kyb-find__hint">Ready — searches the Secretary of State business registry.</p></div>'); } },

      { title: "Review &amp; execute", actor: "Action", noVisual: true, trigger: "Continue, then <strong>Execute verification</strong>",
        note: { k: "Else", text: "Where the registry does not publish owners, ownership is recorded as not disclosed unless the user supplied it." },
        changes: ["Identical to the pre-fill path from here — business details, configuration, add-ons.",
                  "Execute runs the same verification and produces the same report."],
        view: function () { return X.sheet(stepper(true) +
          '<p class="d3-kyb-step__title">Review</p>' +
          '<p class="d3-kyb-step__hint">Check the details and choose any add-ons before you run the verification.</p>' +
          X.addonGroup("insights") +
          '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px">' +
          '<button type="button" class="tds-btn tds-btn--lg tds-btn--secondary">Back</button>' +
          '<button type="button" class="tds-btn tds-btn--lg tds-btn--primary">Execute verification</button></div>'); } }
    ],
    props: { name: "Registries", head: ["Market", "Searchable", "Publishes owners"], rows: [
      ["United Kingdom · Netherlands · Sweden", "yes", "public"],
      ["United States · Australia · Germany", "yes", "private"],
      ["Canada · Singapore", "<strong>no</strong>", "private"]
    ] } }

  ] };
})();
