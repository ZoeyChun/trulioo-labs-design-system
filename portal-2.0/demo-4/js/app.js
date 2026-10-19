/* Demo 4 — Meridian Apex scenario from Demo 1, on the recurring-user layout.
   The right-hand feed records each step the user takes. */
(function () {
  var stage = document.querySelector("[data-d4-stage]");
  var homeView = document.querySelector("[data-d4-home-view]");
  var chatView = document.querySelector("[data-d4-chat]");
  var thread = document.querySelector("[data-d4-thread]");
  var suggest = document.querySelector("[data-d4-suggest]");
  var composer = document.querySelector("[data-d4-composer]");
  var input = document.querySelector("[data-d4-input]");
  var send = document.querySelector("[data-d4-send]");
  var feed = document.querySelector("[data-d4-feed]");
  var panel = document.querySelector("[data-d4-panel]");
  var status = document.querySelector("[data-d4-status]");
  var statusLabel = document.querySelector("[data-d4-status-label]");
  var chatSlot = document.querySelector("[data-d4-composer-chat]");
  if (!stage || !composer || !thread || !feed) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------- scenario */

  var APEX = {
    id: "apex",
    short: "Meridian Apex",
    name: "Meridian Apex Consulting Ltd.",
    lead: "Meridian Apex Consulting Ltd. is a real, active UK company — Companies House 11876542, incorporated 1 Feb 2019, registered at a virtual office at Suite 400, 1 King Street, London.",
    ask: "I'll run the full KYB check on that entity now.",
    sumA: "Meridian Apex Consulting is a real, active UK company, but I wouldn't onboard it yet.",
    sumB: "It has 0 employees, £1 in capital, and a virtual office address. I also found 3 connections to your other transactions that change the picture.",
    tag: "Needs review",
    tone: "review",
    done: "Needs review — shell profile",
    calls: [
      { label: "Matching against the UK registry", done: "Matched on Companies House 11876542", panel: "Matching Companies House 11876542", ms: 1100, detail: ["Companies House 11876542 — status active", "Incorporated 1 Feb 2019"] },
      { label: "Pulling filings, officers, and capital", done: "Found a shell-company profile", panel: "0 employees, £1 capital, virtual office", ms: 1300, detail: ["0 employees declared on the latest return", "£1 issued share capital", "Registered office is a virtual office"], hit: 2 },
      { label: "Cross-referencing officers against sanctions lists", done: "No sanctions match", panel: "Comparing an 87% OFAC match", ms: 1200, detail: ["Checked OFAC, UN, and EU consolidated lists", "No listed officer returned a match"] },
      { label: "Scanning your transaction history for links", done: "Found 3 connected transactions", panel: "Scanning people, devices, and accounts", ms: 1400, detail: ["Searched people, devices, and accounts", "Found 3 connections to other transactions"], hit: 1 }
    ],
    facts: {
      director: "The filing lists three officers. One is a corporate shareholder registered in the BVI, which is why no natural person sits behind the ownership chain.",
      onboard: "Before onboarding, ask for proof of trading, evidence of a staffed office, and the identity of the person behind the BVI shareholder.",
      address: "The registered office is a virtual office at Suite 400, 1 King Street, London. It is a mail-forwarding address, not trading premises.",
      sanctions: "No officer matched OFAC, UN, or EU consolidated lists. The sanctions result is clean — the risk here is the shell profile, not sanctions."
    },
    suggestions: [
      { q: "Show me transactions connected to this business" },
      { q: "Who is behind the BVI holding company?" },
      { q: "What should I request before onboarding?" }
    ]
  };

  var TRADE = {
    id: "trade",
    short: "Meridian Trade Holdings",
    name: "Meridian Trade Holdings Ltd.",
    lead: "Meridian Trade Holdings Ltd. is a distinct UK company from Meridian Apex — Companies House 11204887, incorporated 2018, at 25 Bank Street, Canary Wharf.",
    ask: "Running the KYB check on this entity instead.",
    sumA: "Meridian Trade Holdings Ltd. is active and filed at a Canary Wharf address.",
    sumB: "I didn't find the zero-employee, £1-capital pattern, or the three transaction links that sit on Meridian Apex.",
    tag: "Verified",
    tone: "positive",
    done: "Verified — no shell pattern",
    calls: [
      { label: "Matching against the UK registry", done: "Matched on Companies House 11204887", panel: "Matching Companies House 11204887", ms: 1100, detail: ["Companies House 11204887 — status active", "Incorporated 2018"] },
      { label: "Pulling filings, officers, and capital", done: "No shell-company pattern", panel: "Trading address at Canary Wharf", ms: 1200, detail: ["Trading address at 25 Bank Street, Canary Wharf", "No shell-company pattern in the filings"] },
      { label: "Scanning your transaction history for links", done: "No connected transactions", panel: "No links to your other transactions", ms: 1100, detail: ["No connected transactions found in your history"] }
    ],
    facts: {
      director: "The officers on Meridian Trade Holdings do not overlap with the Meridian Apex filing. Different people, different ownership chain.",
      onboard: "Nothing is blocking here. Standard proof of address and a recent filing would be enough for this record.",
      address: "25 Bank Street, Canary Wharf — a real commercial address, not a mail-forwarding office.",
      sanctions: "No officer returned a sanctions match."
    },
    suggestions: [
      { q: "How is this different from Meridian Apex?" },
      { q: "Who is the listed director?" },
      { q: "What should I request before onboarding?" }
    ]
  };

  var CAPITAL = {
    id: "capital",
    short: "Meridian Capital",
    name: "Meridian Capital LLC",
    lead: "Meridian Capital LLC is a New York entity — NY DOS 4417762, incorporated 2013, at 200 Vesey Street. This is not the UK consulting company.",
    ask: "I'll verify this LLC on its own record.",
    sumA: "Meridian Capital LLC is an active United States company.",
    sumB: "Nothing in your other transactions ties this LLC to Daniel Reyes, the shared device, or account ••4417.",
    tag: "Verified",
    tone: "positive",
    done: "Verified — no shared links",
    calls: [
      { label: "Matching against the NY registry", done: "Matched on NY DOS 4417762", panel: "Matching NY DOS 4417762", ms: 1100, detail: ["NY DOS 4417762 — status active", "Incorporated 2013"] },
      { label: "Confirming the filed address", done: "Filed address matches", panel: "200 Vesey Street, New York", ms: 1000, detail: ["200 Vesey Street, New York"] },
      { label: "Scanning your transaction history for links", done: "No connected transactions", panel: "No link to Daniel Reyes or account ••4417", ms: 1200, detail: ["No connection to Daniel Reyes, device 235252021, or account ••4417"] }
    ],
    facts: {
      director: "The NY filing lists its own members. None of them appear on the Meridian Apex UK filing.",
      onboard: "This record is clean in the demo dataset. Standard documentation would be enough.",
      address: "200 Vesey Street, New York — the filed address matches the application.",
      sanctions: "No member returned a sanctions match."
    },
    suggestions: [
      { q: "How is this different from Meridian Apex?" },
      { q: "Who is the listed director?" },
      { q: "What should I request before onboarding?" }
    ]
  };

  var LINK_CALLS = [
    { label: "Searching records tied to this business", done: "Found 3 matching records", panel: "Searching name, device, and account", ms: 1100, detail: ["Matched on name, device, and account number"] },
    { label: "Comparing KYC, device, and bank results", done: "1 passed, 2 need attention", panel: "Comparing KYC, device, and bank results", ms: 1400, detail: ["Jane Doe — driver's license and selfie matched", "Device 3045489E05849546 — score 92, high risk", "Account ••4417 — business name did not match"], hit: 2 }
  ];

  var FACTS = {
    device: "Device 3045489E05849546 scored 92 out of 100. It is linked to 3 identities and a previously declined transaction, and its IP reputation is high.",
    document: "Yes. Jane Doe's California driver's license D1234567 is valid through 20 Mar 2028, the selfie matches the portrait, and liveness passed.",
    bank: "Account ••4417 is a business account and it did not verify. The name on the account does not match the business on the application.",
    daniel: "Daniel Reyes was declined on 1 Mar 2026 in KYC Documents. The same device, 235252021, and account ••4417 also show up on the Meridian Apex application.",
    bvi: "The BVI holding company is still unnamed. The filings list a corporate shareholder and no natural person behind it, so the ownership chain stops at the BVI entity.",
    compare: "The difference is the shell profile. Meridian Apex has 0 employees, £1 in capital, a virtual office, and 3 links into your other transactions. This record has none of those."
  };

  var LINK_SUGGESTIONS = [
    { q: "Why is this device high risk?" },
    { q: "Did Jane Doe's document match?" },
    { q: "What failed on the bank account?" }
  ];

  var convo = { entity: null, linksShown: false };

  function namedCompany(text) {
    if (/trade holdings/i.test(text)) return TRADE;
    if (/apex consulting|meridian apex/i.test(text)) return APEX;
    if (/meridian capital|capital llc/i.test(text)) return CAPITAL;
    return null;
  }

  function intentOf(text) {
    var t = " " + text.toLowerCase().replace(/[^a-z0-9•]+/g, " ").trim() + " ";
    var table = [
      ["links", ["connected", "transaction history", "transactions", "past checks"]],
      ["device", ["device", "high risk", "fingerprint"]],
      ["document", ["document", "selfie", "jane doe"]],
      ["bank", ["bank", "4417", "account"]],
      ["daniel", ["daniel", "reyes"]],
      ["bvi", ["bvi", "holding company", "beneficial", "who owns", "ownership"]],
      ["director", ["director", "officer", "who runs", "who is the listed"]],
      ["onboard", ["onboard", "request", "before onboarding", "what should i"]],
      ["address", ["address", "office", "mismatch"]],
      ["sanctions", ["sanction", "ofac", "watchlist"]],
      ["compare", ["different", "compare", "versus"]]
    ];
    for (var i = 0; i < table.length; i += 1) {
      var keys = table[i][1];
      for (var k = 0; k < keys.length; k += 1) {
        if (t.indexOf(keys[k]) !== -1) return table[i][0];
      }
    }
    return null;
  }

  function say(text, ask) {
    return { t: "text", body: text, ask: ask || "" };
  }

  function planReply(text) {
    var company = namedCompany(text);
    var intent = intentOf(text);

    if (company && (!convo.entity || company.id !== convo.entity.id) && intent !== "compare") {
      convo.entity = company;
      convo.linksShown = false;
      return {
        log: { title: "Investigate " + company.short, detail: company.calls[0].panel, done: company.done },
        parts: [
          say(company.lead, company.ask),
          { t: "tools", label: "Investigating", doneLabel: "Investigation complete", calls: company.calls },
          { t: "report", company: company }
        ],
        suggestions: company.suggestions
      };
    }

    if (intent === "links") {
      if (!convo.entity) {
        return {
          log: { title: "Resolve “Meridian”", detail: "Waiting for you to confirm the entity", hold: true },
          parts: [say(
            "“Meridian” matches multiple unrelated businesses, so I need to resolve the legal entity before I search your transaction history.",
            "Which should I investigate — Meridian Apex Consulting Ltd., Meridian Trade Holdings Ltd., or Meridian Capital LLC?"
          )],
          suggestions: [
            { q: "Meridian Apex Consulting Ltd." },
            { q: "Meridian Trade Holdings Ltd." },
            { q: "Meridian Capital LLC" }
          ]
        };
      }
      convo.linksShown = true;
      var linked = convo.entity.id === "apex";
      return {
        log: {
          title: linked ? "Check linked transactions" : "Search transaction history",
          detail: linked ? LINK_CALLS[0].panel : "Searching your history",
          done: linked ? "Found 3 connections" : "No connected transactions"
        },
        parts: linked
          ? [
              say("Pulling the records that share a name, device, or account with " + convo.entity.name + "."),
              { t: "tools", label: "Looking for connected transactions", doneLabel: "3 connections found", calls: LINK_CALLS },
              { t: "table", lead: "Three transactions are connected to " + convo.entity.name + ". Open a row for the KYC, device, or bank result.", note: "Jane Doe's document passed. The device is linked to other identities, and the bank account name does not match " + convo.entity.name + "." }
            ]
          : [say("I didn't find transactions that share a person, device, or account with " + convo.entity.name + ".")],
        suggestions: linked ? LINK_SUGGESTIONS : convo.entity.suggestions
      };
    }

    if (!convo.entity && /meridian/i.test(text)) {
      return {
        log: { title: "Resolve “Meridian”", detail: "Waiting for you to confirm the entity", hold: true },
        parts: [say(
          "“Meridian” matches multiple unrelated businesses, so I need to resolve the legal entity before running the KYB check; otherwise ownership, registration, and sanctions results could be attached to the wrong company.",
          "Which should I investigate — Meridian Apex Consulting Ltd., Meridian Trade Holdings Ltd., or Meridian Capital LLC?"
        )],
        suggestions: [
          { q: "Meridian Apex Consulting Ltd." },
          { q: "Meridian Trade Holdings Ltd." },
          { q: "Meridian Capital LLC" }
        ]
      };
    }

    if (intent === "bvi") {
      return {
        log: { title: "Review the BVI holding company", detail: "Reading the ownership filing", done: "Ownership stops at an unnamed shareholder" },
        parts: [say(FACTS.bvi)],
        suggestions: convo.entity ? convo.entity.suggestions : APEX.suggestions
      };
    }

    if (intent && FACTS[intent]) {
      return factPlan(intent, FACTS[intent]);
    }

    if (intent && convo.entity && convo.entity.facts[intent]) {
      return factPlan(intent, convo.entity.facts[intent]);
    }

    if (!convo.entity) {
      return {
        log: { title: "Start a new verification", detail: "Waiting for a business or person", hold: true, drop: true },
        parts: [say("Which business or person should I verify?")],
        suggestions: []
      };
    }

    return {
      log: { title: "Answer a follow-up", detail: "Checking " + convo.entity.short, done: "Answered from the open record" },
      parts: [say("That isn't in this demo dataset. For " + convo.entity.name + " I can cover the registry match, the registered office, the listed director, sanctions screening, the connected transactions, or what to request before onboarding.")],
      suggestions: convo.entity.suggestions
    };
  }

  function factPlan(intent, text) {
    var titles = {
      director: ["Check listed officers", "Reading the filing", "Officers don't match a natural-person owner"],
      onboard: ["List onboarding requests", "Drafting what to ask for", "Proof of trading, office, and the BVI owner"],
      address: ["Check the registered office", "Comparing the filed address", "Virtual office on King Street"],
      sanctions: ["Compare the OFAC match", "Comparing an 87% OFAC match", "No sanctions match"],
      compare: ["Compare with Meridian Apex", "Lining up the two filings", "Shell profile is the difference"],
      device: ["Check linked devices", "Reading device 3045489E05849546", "High risk — linked to 3 identities"],
      document: ["Review Jane Doe's document", "Comparing the licence and selfie", "Document and selfie matched"],
      bank: ["Check the bank account", "Comparing account ••4417", "Business name did not match"],
      daniel: ["Look up Daniel Reyes", "Searching declined transactions", "Declined 1 Mar 2026 — shared device"]
    };
    var row = titles[intent] || ["Answer a follow-up", "Checking the open record", "Answered"];
    var after = (intent === "device" || intent === "document" || intent === "bank" || intent === "daniel")
      ? LINK_SUGGESTIONS
      : (convo.entity ? convo.entity.suggestions : APEX.suggestions);
    return {
      log: { title: row[0], detail: row[1], done: row[2] },
      parts: [say(text)],
      suggestions: after
    };
  }

  /* -------------------------------------------------------------- activity */

  var working = null;

  var today = [];

  var yesterday = [
    { title: "Process daily verifications", detail: "29 approved, 12 flagged", time: "6:00 pm" },
    { title: "Explain failure spike", detail: "Traced to BC document mismatches", time: "10:41 am" },
    { title: "Generate verification report", detail: "Created for ABC Company", time: "10:38 am", icon: "memo" },
    { title: "Resolve “ABC Company”", detail: "Confirmed the right company with you", time: "10:36 am", icon: "check" }
  ];

  function clockTime() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var ap = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return h + ":" + (m < 10 ? "0" : "") + m + " " + ap;
  }

  function archiveWorking() {
    if (!working) return;
    today.unshift({
      title: working.title,
      detail: working.detail,
      time: clockTime(),
      icon: working.icon || ""
    });
    working = null;
  }

  function beginWork(entry) {
    if (working && (!working.live || working.drop)) working = null;
    if (working && working.title === entry.title) {
      working.detail = entry.detail;
      working.live = true;
      working.icon = entry.icon || "";
      working.drop = !!entry.drop;
    } else {
      archiveWorking();
      working = {
        title: entry.title,
        detail: entry.detail,
        live: true,
        icon: entry.icon || "",
        drop: !!entry.drop
      };
    }
    renderFeed();
  }

  function noteWork(detail) {
    if (!working) return;
    working.detail = detail;
    renderFeed();
  }

  function finishWork(detail, icon) {
    if (!working) return;
    today.unshift({
      title: working.title,
      detail: detail || working.detail,
      time: clockTime(),
      icon: icon || working.icon || ""
    });
    working = null;
    renderFeed();
  }

  function iconMarkup(kind, spinning) {
    if (spinning) {
      return '<span class="d4-act__icon"><img class="d4-spin" src="assets/icons/spinner.svg" alt="" width="16" height="16"></span>';
    }
    if (kind === "memo") {
      return '<span class="d4-act__icon d4-act__icon--badge"><svg class="d4-act__report" width="12" height="16" viewBox="0 0 12 16" fill="none" aria-hidden="true"><path d="M2 1.5C1.71875 1.5 1.5 1.71875 1.5 2V14C1.5 14.2812 1.71875 14.5 2 14.5H10C10.2812 14.5 10.5 14.2812 10.5 14V2C10.5 1.71875 10.2812 1.5 10 1.5H2ZM0 2C0 0.90625 0.90625 0 2 0H10C11.0938 0 12 0.90625 12 2V14C12 15.0938 11.0938 16 10 16H2C0.90625 16 0 15.0938 0 14V2ZM3.75 4H8.25C8.65625 4 9 4.34375 9 4.75C9 5.15625 8.65625 5.5 8.25 5.5H3.75C3.34375 5.5 3 5.15625 3 4.75C3 4.34375 3.34375 4 3.75 4ZM3.75 7H8.25C8.65625 7 9 7.34375 9 7.75C9 8.15625 8.65625 8.5 8.25 8.5H3.75C3.34375 8.5 3 8.15625 3 7.75C3 7.34375 3.34375 7 3.75 7ZM3.75 10H5.25C5.65625 10 6 10.3438 6 10.75C6 11.1562 5.65625 11.5 5.25 11.5H3.75C3.34375 11.5 3 11.1562 3 10.75C3 10.3438 3.34375 10 3.75 10Z" fill="#526660"/></svg></span>';
    }
    if (kind === "check") {
      return '<span class="d4-act__icon d4-act__icon--badge"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM2.5 8a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Zm7.9-1.4a.75.75 0 0 1 0 1.06l-2.7 2.7a.75.75 0 0 1-1.06 0l-1.3-1.3a.75.75 0 1 1 1.06-1.06l.77.77 2.17-2.17a.75.75 0 0 1 1.06 0Z"/></svg></span>';
    }
    if (kind === "user") {
      return '<span class="d4-act__icon d4-act__icon--badge"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 2.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM6.75 4.5a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0ZM4.1 12.2c.35-1.5 1.7-2.7 3.9-2.7s3.55 1.2 3.9 2.7c.12.5-.27 1.05-.8 1.05H4.9c-.53 0-.92-.55-.8-1.05Z"/></svg></span>';
    }
    return '<span class="d4-act__icon"><span class="d4-dot"></span></span>';
  }

  function renderItems(items, live) {
    return items.map(function (item, index) {
      var last = index === items.length - 1;
      var line = last ? "" : '<span class="d4-act__line"></span>';
      var time = item.time ? '<p class="d4-act__time">' + item.time + "</p>" : "";
      return '<div class="d4-act">' +
        '<div class="d4-act__rail">' + iconMarkup(item.icon, live) + line + "</div>" +
        '<div class="d4-act__body"><p class="d4-act__title">' + item.title + "</p>" +
        '<p class="d4-act__detail">' + item.detail + "</p>" + time + "</div></div>";
    }).join("");
  }

  function miniLabel() {
    if (!working) return "Idle";
    var text = ((working.detail || "") + " " + (working.title || "")).toLowerCase();
    if (/waiting|confirm|resolve|start a new/.test(text)) return "Awaiting input";
    if (/companies house|registry|dos|matching/.test(text)) return "Browsing sources";
    if (/capital|filing|filings|virtual office|address|vesey|canary/.test(text)) return "Reviewing filings";
    if (/ofac|sanction|screening/.test(text)) return "Screening lists";
    if (/transaction|device|account|people|connections|links|history|kyc|bank/.test(text)) return "Scanning history";
    if (/ownership|bvi|holding/.test(text)) return "Reviewing ownership";
    if (/report/.test(text)) return "Writing report";
    if (/investigate/.test(text)) return "Investigating";
    if (/answer|follow-up|checking/.test(text)) return "Answering";
    return "Working";
  }

  function renderFeed() {
    var top = feed.scrollTop;
    var html = "";
    if (working) {
      html += '<section class="d4-group"><h2>Working now</h2>' + renderItems([working], true) + "</section>";
    }
    if (today.length) {
      html += '<section class="d4-group"><h2>Today</h2>' + renderItems(today, false) + "</section>";
    }
    html += '<section class="d4-group"><h2>Yesterday</h2>' + renderItems(yesterday, false) + "</section>";
    feed.innerHTML = html;
    feed.scrollTop = top;
    var count = working ? 1 : 0;
    status.classList.toggle("is-idle", !working);
    statusLabel.textContent = count ? "Working on " + count + " task" : "Idle";
    if (miniStatus) miniStatus.textContent = miniLabel();
  }

  /* ---------------------------------------------------------------- thread */

  var runId = 0;
  var busy = false;

  function wait(ms, id) {
    var delay = reduced ? 40 : ms;
    return new Promise(function (resolve) {
      setTimeout(function () { resolve(id === runId); }, delay);
    });
  }

  function setBusy(on) {
    busy = on;
    send.disabled = on ? false : !input.value.trim();
    send.setAttribute("aria-label", on ? "Stop" : "Send");
  }

  var app = document.querySelector(".d4-app");
  var PAGE_SRC = {
    labs: "../../pages/unified-intelligence-home/labs.html?embed=1&v=6",
    transactions: "transactions-view/embed.html",
    settings: "organization-admin/index.html?embed=1"
  };

  function setNav(view) {
    document.querySelectorAll("[data-d4-nav]").forEach(function (btn) {
      var on = btn.getAttribute("data-d4-nav") === view;
      btn.classList.toggle("is-active", on);
      if (on) btn.setAttribute("aria-current", "page");
      else btn.removeAttribute("aria-current");
    });
  }

  function hidePages() {
    document.querySelectorAll("[data-d4-page]").forEach(function (el) {
      el.hidden = true;
    });
  }

  function ensurePageFrame(view) {
    var frame = document.querySelector('[data-d4-frame="' + view + '"]');
    var src = PAGE_SRC[view];
    if (!frame || !src) return;
    if (frame.getAttribute("src") !== src) frame.setAttribute("src", src);
  }

  function showPage(view) {
    if (!PAGE_SRC[view]) return;
    runId += 1;
    setBusy(false);
    closeDrawer();
    homeView.hidden = true;
    chatView.hidden = true;
    stage.setAttribute("data-d4-stage", view);
    if (app) app.setAttribute("data-d4-view", view);
    document.querySelectorAll("[data-d4-page]").forEach(function (el) {
      el.hidden = el.getAttribute("data-d4-page") !== view;
    });
    ensurePageFrame(view);
    setNav(view);
    /* Labs + Transactions keep Demo 4 TruAI (replaces Demo 3 chat pane).
       Settings stays page-only. */
    if (view === "settings") setPanel(false);
    else setPanel(true);
    syncPanelToggle();
    positionMini();
  }

  function showChat() {
    hidePages();
    stage.setAttribute("data-d4-stage", "chat");
    if (app) app.setAttribute("data-d4-view", "chat");
    setNav("");
    homeView.hidden = true;
    chatView.hidden = false;
    if (chatSlot && composer.parentElement !== chatSlot) chatSlot.appendChild(composer);
    syncPanelToggle();
  }

  function showHome() {
    runId += 1;
    setBusy(false);
    closeDrawer();
    hidePages();
    stage.setAttribute("data-d4-stage", "home");
    if (app) app.setAttribute("data-d4-view", "home");
    setNav("home");
    chatView.hidden = true;
    homeView.hidden = false;
    if (composer.parentElement !== homeView) {
      var cards = homeView.querySelector(".d4-cards");
      homeView.insertBefore(composer, cards);
    }
  }

  function stick() {
    thread.scrollTop = thread.scrollHeight;
  }

  var titleEl = document.querySelector("[data-d4-title]");

  function clone(name) {
    var tpl = document.querySelector('[data-d4-tpl="' + name + '"]');
    return tpl ? tpl.content.firstElementChild.cloneNode(true) : null;
  }

  function place(node) {
    thread.appendChild(node);
    stick();
    return node;
  }

  function addUser(text) {
    var node = clone("user");
    if (!node) return;
    node.querySelector("p").textContent = text;
    place(node);
    if (titleEl && titleEl.textContent === "Chat") {
      titleEl.textContent = text.length > 48 ? text.slice(0, 45) + "…" : text;
    }
  }

  function addText(part) {
    var node = clone("ai");
    if (!node) return;
    var p = document.createElement("p");
    p.textContent = part.body;
    node.appendChild(p);
    if (part.ask) {
      var ask = document.createElement("p");
      ask.className = "d1-ai__ask";
      ask.textContent = part.ask;
      node.appendChild(ask);
    }
    place(node);
  }

  var reportCompany = null;

  function addReport(company) {
    reportCompany = company;
    var node = clone("report");
    if (!node) return;
    node.querySelector("[data-d4-co]").textContent = company.name;
    var tag = node.querySelector("[data-d4-report-tag]");
    tag.textContent = company.tag;
    tag.className = "d1-tag d1-tag--" + (company.tone === "positive" ? "positive" : "review");
    node.querySelector("[data-d4-sum-a]").textContent = company.sumA;
    node.querySelector("[data-d4-sum-b]").textContent = company.sumB;
    place(node);
  }

  function addTable(part) {
    var node = clone("table");
    if (!node) return;
    node.querySelector("[data-d4-table-lead]").textContent = part.lead || "";
    node.querySelector("[data-d4-table-note]").textContent = part.note || "";
    place(node);
  }

  async function showTyping(id) {
    var node = clone("typing");
    if (!node) return true;
    place(node);
    var ok = await wait(reduced ? 40 : 520, id);
    node.remove();
    return ok;
  }

  async function playTools(part, id) {
    var node = clone("tools");
    if (!node) return false;
    var label = node.querySelector("[data-d4-tools-label]");
    var pct = node.querySelector(".d1-progress__pct");
    var fill = node.querySelector(".d1-progress__fill");
    var check = node.querySelector("[data-d4-tools-check]");
    var steps = node.querySelector("[data-d4-steps]");
    label.textContent = part.label;
    place(node);

    var rows = [];
    for (var i = 0; i < part.calls.length; i += 1) {
      var call = part.calls[i];
      rows.forEach(function (prev) {
        prev.toggle.classList.remove("d1-activity__toggle--current");
        prev.toggle.setAttribute("aria-expanded", "false");
        prev.body.hidden = true;
      });

      var row = clone("activity");
      var toggle = row.querySelector(".d1-activity__toggle");
      var body = row.querySelector(".d1-activity__body");
      var detail = row.querySelector("[data-d4-activity-detail]");
      row.querySelector("[data-d4-activity-label]").textContent = call.label;
      if (!call.detail || !call.detail.length) {
        row.classList.add("is-bare");
        body.hidden = true;
      }
      steps.appendChild(row);
      rows.push({ toggle: toggle, body: body });
      noteWork(call.panel || call.label);
      pct.textContent = Math.round((i / part.calls.length) * 100) + "%";
      fill.style.width = pct.textContent;
      stick();

      var lines = call.detail || [];
      var slice = lines.length ? call.ms / (lines.length + 1) : call.ms;
      for (var j = 0; j < lines.length; j += 1) {
        var stepped = await wait(slice, id);
        if (!stepped) return false;
        var line = document.createElement("p");
        line.textContent = lines[j];
        if (call.hit === j) line.className = "d1-activity__hit";
        detail.appendChild(line);
        stick();
      }
      var doneWait = await wait(slice, id);
      if (!doneWait) return false;

      var running = row.querySelector('[data-d4-mark="run"]');
      var finished = row.querySelector('[data-d4-mark="done"]');
      if (running) running.hidden = true;
      if (finished) finished.hidden = false;
      if (call.done) row.querySelector("[data-d4-activity-label]").textContent = call.done;
      pct.textContent = Math.round(((i + 1) / part.calls.length) * 100) + "%";
      fill.style.width = pct.textContent;
      stick();
    }

    label.textContent = part.doneLabel || "Investigation complete";
    fill.classList.add("d1-progress__fill--done");
    if (check) check.hidden = false;
    stick();
    return true;
  }

  function setSuggestions(items) {
    suggest.innerHTML = "";
    if (!items || !items.length) {
      suggest.classList.remove("is-on");
      return;
    }
    var heading = document.createElement("h2");
    heading.textContent = "Continue your investigation";
    suggest.appendChild(heading);
    items.forEach(function (item) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "d1-suggest-row";
      var label = document.createElement("span");
      label.textContent = item.q;
      btn.appendChild(label);
      var icon = document.createElement("img");
      icon.src = "assets/icons/arrow-right.svg";
      icon.alt = "";
      icon.width = 16;
      icon.height = 16;
      btn.appendChild(icon);
      suggest.appendChild(btn);
    });
    suggest.classList.add("is-on");
  }

  async function respond(text) {
    var plan = planReply(text);
    var id = ++runId;
    setBusy(true);
    setSuggestions([]);
    if (working && working.title.indexOf("Resolve") === 0 && plan.log.title.indexOf("Investigate") === 0) {
      finishWork("Confirmed with you");
    }
    beginWork(plan.log);
    try {
      for (var i = 0; i < plan.parts.length; i += 1) {
        var part = plan.parts[i];
        if (part.t === "text") {
          var ok = await showTyping(id);
          if (!ok) return;
          addText(part);
        } else if (part.t === "tools") {
          var finished = await playTools(part, id);
          if (!finished) return;
        } else if (part.t === "report") {
          addReport(part.company);
          finishWork(plan.log.done);
          today.unshift({
            title: "Generate verification report",
            detail: "Created for " + part.company.short,
            time: clockTime(),
            icon: "memo"
          });
          renderFeed();
          plan.log.settled = true;
        } else if (part.t === "table") {
          addTable(part);
        }
      }
      if (id !== runId) return;
      if (!plan.log.hold && !plan.log.settled) finishWork(plan.log.done);
      setSuggestions(plan.suggestions);
    } finally {
      if (id === runId) setBusy(false);
    }
  }

  function submitText(text) {
    var value = (text || "").trim();
    if (!value || busy) return;
    showChat();
    addUser(value);
    input.value = "";
    send.disabled = true;
    respond(value);
  }

  /* ------------------------------------------------------------------ orb */

  function paintOrb() {
    document.querySelectorAll("[data-d4-orb]").forEach(function (canvas) {
    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var grid = [
      [[1, 0.82, 0.4], [0.62, 0.88, 0.72], [0.35, 0.78, 0.79], [1, 0.82, 0.4]],
      [[0.62, 0.88, 0.72], [0.62, 0.88, 0.72], [0.62, 0.88, 0.72], [0.09, 0.4, 0.2]],
      [[0.09, 0.4, 0.2], [0.35, 0.65, 0.65], [0.2, 0.65, 0.55], [0.1, 0.55, 0.7]],
      [[0.02, 0.84, 0.63], [0.1, 0.7, 0.65], [0.27, 0.7, 0.79], [0.07, 0.54, 0.7]]
    ];
    var size = canvas.width;
    var image = ctx.createImageData(size, size);
    var data = image.data;
    for (var y = 0; y < size; y += 1) {
      for (var x = 0; x < size; x += 1) {
        var dx = x - size / 2;
        var dy = y - size / 2;
        var i = (y * size + x) * 4;
        if (dx * dx + dy * dy > (size / 2) * (size / 2)) {
          data[i + 3] = 0;
          continue;
        }
        var u = (x / (size - 1)) * 3;
        var v = (y / (size - 1)) * 3;
        var x0 = Math.min(2, Math.floor(u));
        var y0 = Math.min(2, Math.floor(v));
        var tx = u - x0;
        var ty = v - y0;
        var c00 = grid[y0][x0];
        var c10 = grid[y0][x0 + 1];
        var c01 = grid[y0 + 1][x0];
        var c11 = grid[y0 + 1][x0 + 1];
        for (var c = 0; c < 3; c += 1) {
          var a = c00[c] * (1 - tx) + c10[c] * tx;
          var b = c01[c] * (1 - tx) + c11[c] * tx;
          data[i + c] = Math.round((a * (1 - ty) + b * ty) * 255);
        }
        data[i + 3] = 255;
      }
    }
    ctx.putImageData(image, 0, 0);
    });
  }

  /* ----------------------------------------------------------------- chrome */

  var mini = document.querySelector("[data-d4-mini]");
  var miniStatus = document.querySelector("[data-d4-mini-status]");

  function syncPanelToggle() {
    var open = !panel.hidden;
    if (mini) mini.hidden = open;
    positionMini();
    document.querySelectorAll("[data-d4-panel-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", open ? "true" : "false");
    });
  }

  function setPanel(open) {
    panel.hidden = !open;
    syncPanelToggle();
  }

  /* Collapsed TruAI bubble centers on the chat container, not the page. */
  function positionMini() {
    if (!mini || mini.hidden) return;
    var left = "50%";
    var onChat = !chatView.hidden && stage.classList.contains("is-report") && !stage.classList.contains("is-report-full");
    if (onChat) {
      var chatRect = chatView.getBoundingClientRect();
      var stageRect = stage.getBoundingClientRect();
      if (chatRect.width > 0) {
        left = Math.round(chatRect.left - stageRect.left + chatRect.width / 2) + "px";
      }
    }
    mini.style.left = left;
  }

  if (window.ResizeObserver) {
    var miniObserver = new ResizeObserver(positionMini);
    miniObserver.observe(stage);
    miniObserver.observe(chatView);
  }
  window.addEventListener("resize", positionMini);

  input.addEventListener("input", function () {
    if (!busy) send.disabled = !input.value.trim();
  });

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (busy) {
        runId += 1;
        setBusy(false);
        return;
      }
      submitText(input.value);
    }
  });

  composer.addEventListener("submit", function (event) {
    event.preventDefault();
    if (busy) {
      runId += 1;
      setBusy(false);
      return;
    }
    submitText(input.value);
  });

  function startNewVerification() {
    if (busy) return;
    showChat();
    if (titleEl && titleEl.textContent === "Chat") titleEl.textContent = "Start a new verification";
    addText(say("Which business or person should I verify?"));
    beginWork({
      title: "Start a new verification",
      detail: "Waiting for a business or person",
      drop: true
    });
    setSuggestions([]);
    input.focus();
  }

  document.querySelectorAll("[data-d4-prompt]").forEach(function (card) {
    card.addEventListener("click", function () {
      submitText(card.getAttribute("data-d4-prompt"));
    });
  });

  document.querySelectorAll("[data-d4-start='new']").forEach(function (card) {
    card.addEventListener("click", startNewVerification);
  });

  suggest.addEventListener("click", function (event) {
    var btn = event.target.closest("button");
    var label = btn && btn.querySelector("span");
    if (label) submitText(label.textContent);
  });

  thread.addEventListener("click", function (event) {
    var toggle = event.target.closest("[data-d4-activity]");
    if (toggle) {
      var body = toggle.parentElement.querySelector(".d1-activity__body");
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      if (body && !toggle.parentElement.classList.contains("is-bare")) body.hidden = open;
      return;
    }
    var copy = event.target.closest("[data-d4-copy]");
    if (copy) {
      var block = copy.closest(".d1-block");
      if (block && navigator.clipboard) navigator.clipboard.writeText(block.innerText);
      return;
    }
    var vote = event.target.closest("[data-d4-vote]");
    if (vote) {
      var pressed = vote.getAttribute("aria-pressed") === "true";
      vote.closest(".d1-actions").querySelectorAll("[data-d4-vote]").forEach(function (other) {
        other.setAttribute("aria-pressed", "false");
      });
      vote.setAttribute("aria-pressed", pressed ? "false" : "true");
      return;
    }
    if (event.target.closest(".d1-alert__view")) {
      openDrawer("report");
      return;
    }
    var row = event.target.closest("tr[data-d4-tx]");
    if (row) openDrawer(row.getAttribute("data-d4-tx"));
  });

  thread.addEventListener("keydown", function (event) {
    var row = event.target.closest("tr[data-d4-tx]");
    if (!row || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    openDrawer(row.getAttribute("data-d4-tx"));
  });

  document.querySelectorAll("[data-d4-home]").forEach(function (btn) {
    btn.addEventListener("click", showHome);
  });

  document.querySelectorAll("[data-d4-nav='labs']").forEach(function (btn) {
    btn.addEventListener("click", function () { showPage("labs"); });
  });
  document.querySelectorAll("[data-d4-nav='transactions']").forEach(function (btn) {
    btn.addEventListener("click", function () { showPage("transactions"); });
  });
  document.querySelectorAll("[data-d4-nav='settings']").forEach(function (btn) {
    btn.addEventListener("click", function () { showPage("settings"); });
  });

  document.querySelectorAll("[data-d4-panel-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setPanel(panel.hidden);
    });
  });

  var panelClose = document.querySelector("[data-d4-panel-close]");
  if (panelClose) panelClose.addEventListener("click", function () { setPanel(false); });
  var miniOpen = document.querySelector("[data-d4-mini-open]");
  if (miniOpen) miniOpen.addEventListener("click", function () { setPanel(true); });

  /* ------------------------------------------------------------- report drawer */

  var drawer = document.querySelector("[data-d4-drawer]");
  var drawerTabs = document.querySelector("[data-d4-drawer-tabs]");
  var expandBtn = document.querySelector("[data-d4-drawer-expand]");
  var expandIcon = document.querySelector("[data-d4-drawer-expand-icon]");
  var docName = document.querySelector("[data-d4-doc-name]");
  var docTag = document.querySelector("[data-d4-doc-tag]");
  var docTagIcon = document.querySelector("[data-d4-doc-tag-icon]");
  var docTagLabel = document.querySelector("[data-d4-doc-tag-label]");
  var drawerMode = null;
  var drawerTabsOpen = [];
  var drawerExpanded = false;

  var drawerLabels = {
    report: "Business Verification Report",
    kyc: "KYC Documents",
    device: "Device Risk",
    bank: "Bank Verification"
  };

  function syncReportHead() {
    var company = reportCompany;
    if (!company || !docName) return;
    docName.textContent = company.name;
    var positive = company.tone === "positive";
    docTag.className = "d1-tag d1-tag--icon d1-tag--" + (positive ? "positive" : "review");
    docTagIcon.src = positive ? "assets/icons/circle-check.svg" : "assets/icons/warning-amber.svg";
    docTagLabel.textContent = company.tag;
  }

  function showDrawerView(id) {
    document.querySelectorAll("[data-d4-drawer-view]").forEach(function (view) {
      view.hidden = view.getAttribute("data-d4-drawer-view") !== id;
    });
    if (id === "report") {
      document.querySelectorAll("[data-d4-doc-tab]").forEach(function (tab) {
        tab.setAttribute("aria-selected", tab.getAttribute("data-d4-doc-tab") === "overview" ? "true" : "false");
      });
      var overview = document.querySelector("[data-d4-doc-panel='overview']");
      var empty = document.querySelector("[data-d4-doc-panel='empty']");
      if (overview) overview.hidden = false;
      if (empty) empty.hidden = true;
    }
    thread.querySelectorAll("tr[data-d4-tx]").forEach(function (tr) {
      if (tr.getAttribute("data-d4-tx") === id) tr.setAttribute("aria-current", "true");
      else tr.removeAttribute("aria-current");
    });
  }

  function renderDrawerTabs(active) {
    if (!drawerTabs) return;
    drawerTabs.replaceChildren();
    drawerTabsOpen.forEach(function (item) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "d1-drawer__tab";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", item.id === active ? "true" : "false");
      btn.textContent = item.label;
      btn.addEventListener("click", function () {
        renderDrawerTabs(item.id);
        showDrawerView(item.id);
      });
      drawerTabs.appendChild(btn);
    });
  }

  function openDrawer(kind) {
    if (!drawer) return;
    kind = kind || "report";
    if (kind === "report") {
      drawerMode = "report";
      drawerTabsOpen = [{ id: "report", label: drawerLabels.report }];
      syncReportHead();
    } else {
      if (drawerMode !== "rows") {
        drawerMode = "rows";
        drawerTabsOpen = [];
      }
      if (!drawerTabsOpen.some(function (item) { return item.id === kind; })) {
        drawerTabsOpen.push({ id: kind, label: drawerLabels[kind] || kind });
      }
    }
    renderDrawerTabs(kind);
    showDrawerView(kind);
    drawer.hidden = false;
    drawer.setAttribute("aria-hidden", "false");
    stage.classList.add("is-report");
    positionMini();
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.hidden = true;
    drawer.setAttribute("aria-hidden", "true");
    stage.classList.remove("is-report", "is-report-full");
    positionMini();
    drawerExpanded = false;
    drawerMode = null;
    drawerTabsOpen = [];
    if (drawerTabs) drawerTabs.replaceChildren();
    if (expandBtn) expandBtn.setAttribute("aria-pressed", "false");
    if (expandIcon) expandIcon.src = "assets/icons/expand.svg";
    thread.querySelectorAll("tr[data-d4-tx]").forEach(function (tr) {
      tr.removeAttribute("aria-current");
    });
  }

  function toggleDrawerExpand() {
    if (!drawer || drawer.hidden) return;
    drawerExpanded = !drawerExpanded;
    stage.classList.toggle("is-report-full", drawerExpanded);
    positionMini();
    if (expandBtn) {
      expandBtn.setAttribute("aria-pressed", drawerExpanded ? "true" : "false");
      expandBtn.setAttribute("aria-label", drawerExpanded ? "Collapse" : "Expand");
    }
    if (expandIcon) expandIcon.src = drawerExpanded ? "assets/icons/compress.svg" : "assets/icons/expand.svg";
  }

  document.querySelectorAll("[data-d4-doc-tab]").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var showOverview = tab.getAttribute("data-d4-doc-tab") === "overview";
      document.querySelectorAll("[data-d4-doc-tab]").forEach(function (other) {
        other.setAttribute("aria-selected", other === tab ? "true" : "false");
      });
      var overview = document.querySelector("[data-d4-doc-panel='overview']");
      var empty = document.querySelector("[data-d4-doc-panel='empty']");
      if (overview) overview.hidden = !showOverview;
      if (empty) empty.hidden = showOverview;
    });
  });

  var drawerClose = document.querySelector("[data-d4-drawer-close]");
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (expandBtn) expandBtn.addEventListener("click", toggleDrawerExpand);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && drawer && !drawer.hidden) closeDrawer();
  });

  paintOrb();
  renderFeed();
  syncPanelToggle();
})();
