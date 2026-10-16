/* Chat stage.
   The thread is rendered from data, never from pre-placed markup: a reply is a
   list of parts (text / tools / report / table), and the player walks that list
   appending fresh nodes. Reply text appears in full; waits are held on a
   cancellable Run so Stop still halts a reply mid-flight. */
(function () {
  var stage = document.querySelector("[data-d1-stage]");
  var title = document.querySelector("[data-d1-title]");
  var back = document.querySelector("[data-d1-back]");
  var composer = document.querySelector("[data-d1-composer]");
  var thread = document.querySelector("[data-d1-thread]");
  var follow = document.querySelector("[data-d1-follow]");
  var sidebar = document.querySelector("[data-d1-sidebar]");
  var sidebarItems = document.querySelector("[data-d1-sidebar-items]");
  var home = stage;
  if (!stage || !composer || !thread) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- data */

  var APEX = {
    id: "apex",
    name: "Meridian Apex Consulting Ltd.",
    lead: "Meridian Apex Consulting Ltd. is a real, active UK company — Companies House 11876542, incorporated 1 Feb 2019, registered at a virtual office at Suite 400, 1 King Street, London.",
    ask: "I'll run the full KYB check on that entity now.",
    sumA: "Meridian Apex Consulting is a real, active UK company, but I wouldn't onboard it yet.",
    sumB: "It has 0 employees, £1 in capital, and a virtual office address. I also found 3 connections to your other transactions that change the picture.",
    tag: "Needs review",
    tone: "review",
    calls: [
      { label: "Matching against the UK registry", done: "Matched on Companies House 11876542", ms: 1150, detail: ["Companies House 11876542 — status active", "Incorporated 1 Feb 2019"] },
      { label: "Pulling filings, officers, and capital", done: "Found a shell-company profile", ms: 1400, detail: ["0 employees declared on the latest return", "£1 issued share capital", "Registered office is a virtual office"], hit: 2 },
      { label: "Cross-referencing officers against sanctions lists", done: "No sanctions match", ms: 1250, detail: ["Checked OFAC, UN, and EU consolidated lists", "No listed officer returned a match"] },
      { label: "Scanning your transaction history for links", done: "Found 3 connected transactions", ms: 1600, detail: ["Searched people, devices, and accounts", "Found 3 connections to other transactions"], hit: 1 }
    ],
    facts: {
      director: "The filing lists three officers. One is a corporate shareholder registered in the BVI, which is why no natural person sits behind the ownership chain.",
      onboard: "Before onboarding, ask for proof of trading, evidence of a staffed office, and the identity of the person behind the BVI shareholder.",
      address: "The registered office is a virtual office at Suite 400, 1 King Street, London. It is a mail-forwarding address, not trading premises.",
      sanctions: "No officer matched OFAC, UN, or EU consolidated lists. The sanctions result is clean — the risk here is the shell profile, not sanctions."
    },
    suggestions: [
      { q: "Show me transactions connected to this business", intent: "links" },
      { q: "Who is behind the BVI holding company?", intent: "bvi" },
      { q: "What should I request before onboarding?", intent: "onboard" }
    ]
  };

  var NORDIC = {
    id: "nordic",
    name: "Apex Nordic Logistics",
    lead: "Apex Nordic Logistics is an active United Kingdom company. This is fictional demo data — no live registry was called.",
    ask: "Running the KYB check on that record now.",
    sumA: "Registry matched. Apex Nordic Logistics is an active United Kingdom company.",
    sumB: "The registered office matches the application. I also found 3 transactions connected to this business — a KYC document, a device check, and a bank account.",
    tag: "Verified",
    tone: "positive",
    calls: [
      { label: "Matching against the UK registry", done: "Matched Apex Nordic Logistics", ms: 1100, detail: ["Registered name matches the application", "Jurisdiction is the United Kingdom"] },
      { label: "Confirming the registered office", done: "Registered office matches", ms: 1050, detail: ["Registry address matches the address on the application"] },
      { label: "Scanning your transaction history for links", done: "Found 3 connected transactions", ms: 1550, detail: ["Searched people, devices, and accounts", "Found 3 connections to other transactions"], hit: 1 }
    ],
    facts: {
      director: "The UK filing lists one director for Apex Nordic Logistics. Jane Doe is the person on the connected KYC document, not the named director on that filing.",
      onboard: "Ask for a recent proof of address, and open the three connected transactions before you onboard. The device check is the one I'd look at first — it scored high risk.",
      address: "The registered office on the UK filing matches the address on the application. Nothing to flag there.",
      sanctions: "No officer on the Apex Nordic Logistics filing matched OFAC, UN, or EU consolidated lists."
    },
    suggestions: [
      { q: "Show me transactions connected to this business", intent: "links" },
      { q: "Who is the listed director?", intent: "director" },
      { q: "What should I request before onboarding?", intent: "onboard" }
    ]
  };

  var TRADE = {
    id: "trade",
    name: "Meridian Trade Holdings Ltd.",
    lead: "Meridian Trade Holdings Ltd. is a distinct UK company from Meridian Apex — Companies House 11204887, incorporated 2018, at 25 Bank Street, Canary Wharf.",
    ask: "Running the KYB check on this entity instead.",
    sumA: "Meridian Trade Holdings Ltd. is active and filed at a Canary Wharf address.",
    sumB: "I didn't find the zero-employee, £1-capital pattern, or the three transaction links that sit on Meridian Apex.",
    tag: "Verified",
    tone: "positive",
    calls: [
      { label: "Matching against the UK registry", done: "Matched on Companies House 11204887", ms: 1100, detail: ["Companies House 11204887 — status active", "Incorporated 2018"] },
      { label: "Pulling filings, officers, and capital", done: "No shell-company pattern", ms: 1300, detail: ["Trading address at 25 Bank Street, Canary Wharf", "No shell-company pattern in the filings"] },
      { label: "Scanning your transaction history for links", done: "No connected transactions", ms: 1200, detail: ["No connected transactions found in your history"] }
    ],
    facts: {
      director: "The officers on Meridian Trade Holdings do not overlap with the Meridian Apex filing. Different people, different ownership chain.",
      onboard: "Nothing is blocking here. Standard proof of address and a recent filing would be enough for this record.",
      address: "25 Bank Street, Canary Wharf — a real commercial address, not a mail-forwarding office.",
      sanctions: "No officer returned a sanctions match."
    },
    suggestions: [
      { q: "How is this different from Meridian Apex?", intent: "compare" },
      { q: "Who is the listed director?", intent: "director" },
      { q: "What should I request before onboarding?", intent: "onboard" }
    ]
  };

  var CAPITAL = {
    id: "capital",
    name: "Meridian Capital LLC",
    lead: "Meridian Capital LLC is a New York entity — NY DOS 4417762, incorporated 2013, at 200 Vesey Street. This is not the UK consulting company.",
    ask: "I'll verify this LLC on its own record.",
    sumA: "Meridian Capital LLC is an active United States company.",
    sumB: "Nothing in your other transactions ties this LLC to Daniel Reyes, the shared device, or account ••4417.",
    tag: "Verified",
    tone: "positive",
    calls: [
      { label: "Matching against the NY registry", done: "Matched on NY DOS 4417762", ms: 1150, detail: ["NY DOS 4417762 — status active", "Incorporated 2013"] },
      { label: "Confirming the filed address", done: "Filed address matches", ms: 1000, detail: ["200 Vesey Street, New York"] },
      { label: "Scanning your transaction history for links", done: "No connected transactions", ms: 1300, detail: ["No connection to Daniel Reyes, device 235252021, or account ••4417"] }
    ],
    facts: {
      director: "The NY filing lists its own members. None of them appear on the Meridian Apex UK filing.",
      onboard: "This record is clean in the demo dataset. Standard documentation would be enough.",
      address: "200 Vesey Street, New York — the filed address matches the application.",
      sanctions: "No member returned a sanctions match."
    },
    suggestions: [
      { q: "How is this different from Meridian Apex?", intent: "compare" },
      { q: "Who is the listed director?", intent: "director" },
      { q: "What should I request before onboarding?", intent: "onboard" }
    ]
  };

  var NORTHSTAR = {
    id: "northstar",
    name: "Northstar Trading Ltd.",
    lead: "Northstar Trading Ltd. is a United States company. The address on the application does not match the registry address.",
    ask: "I'll flag it for review rather than mark it verified.",
    sumA: "Address mismatch. This demo record needs review before onboarding.",
    sumB: "The registry address and the application address are not the same.",
    tag: "Needs review",
    tone: "review",
    calls: [
      { label: "Matching against the US registry", done: "Matched Northstar Trading Ltd.", ms: 1100, detail: ["Registered name matches the application", "Status active"] },
      { label: "Comparing the filed address to the application", done: "Address mismatch found", ms: 1450, detail: ["Registry address and application address do not match", "Flagged for manual review"], hit: 1 }
    ],
    facts: {
      director: "The US filing lists its officers, but the address mismatch is the open item on this record.",
      onboard: "Resolve the address mismatch first. Ask for a utility bill or lease at the address on the application.",
      address: "That's the problem — the registry address and the address on the application are different. This is why I flagged it rather than verifying it.",
      sanctions: "No officer returned a sanctions match. The open item is the address, not sanctions."
    },
    suggestions: [
      { q: "Why does the address not match?", intent: "address" },
      { q: "What should I request before onboarding?", intent: "onboard" },
      { q: "Who is the listed director?", intent: "director" }
    ]
  };

  var LINK_CALLS = [
    { label: "Searching records tied to this business", done: "Found 3 matching records", ms: 1150, detail: ["Matched on name, device, and account number"] },
    { label: "Comparing KYC, device, and bank results", done: "1 passed, 2 need attention", ms: 1550, detail: ["Jane Doe — driver's license and selfie matched", "Device 3045489E05849546 — score 92, high risk", "Account ••4417 — business name did not match"], hit: 2 }
  ];

  var LINK_SUGGESTIONS = [
    { q: "Why is this device high risk?", intent: "device" },
    { q: "Did Jane Doe's document match?", intent: "document" },
    { q: "What failed on the bank account?", intent: "bank" }
  ];

  /* Answers that don't depend on which company is open. */
  var GLOBAL_FACTS = {
    device: "Device 3045489E05849546 scored 92 out of 100. It is linked to 3 identities and a previously declined transaction, and its IP reputation is high. VPN and proxy were not detected.",
    document: "Yes. Jane Doe's California driver's license D1234567 is valid through 20 Mar 2028, the selfie matches the portrait, and liveness passed. Open her row for the full KYC document result.",
    bank: "Account ••4417 is a business account and it did not verify. The name on the account does not match the business on the application.",
    daniel: "Daniel Reyes was declined on 1 Mar 2026 in KYC Documents. The same device, 235252021, and account ••4417 also show up on the Meridian Apex application — that overlap is why he surfaced here.",
    bvi: "The BVI holding company is still unnamed. The filings list a corporate shareholder and no natural person behind it, so the ownership chain stops at the BVI entity.",
    jane: "Jane Doe's document and selfie match. This is fictional KYC demo data for Canada — no live check was run.",
    compare: "The difference is the shell profile. Meridian Apex has 0 employees, £1 in capital, a virtual office, and 3 links into your other transactions. This record has none of those."
  };

  /* ---------------------------------------------- repeat-customer account */

  /* The numbers the home-page briefing shows. The chat reads the same object
     so a card and an answer can never disagree. */
  var OPS = { processed: 47, flagged: 12, pending: 6, approved: 29, average: 8 };

  var OPS_SUGGESTIONS = [
    { q: "Investigate why failures increased", intent: "failures" },
    { q: "Why are the 6 reviews pending?", intent: "pending" },
    { q: "Identify patterns in recent verification activity", intent: "patterns" }
  ];

  var FAILURE_SUGGESTIONS = [
    { q: "Re-run the 9 BC verifications", intent: "rerun" },
    { q: "Show me the 3 unrelated failures", intent: "flagged" },
    { q: "What should I tell the BC team?", intent: "bcteam" }
  ];

  var FAILURE_CALLS = [
    { label: "Pulling yesterday's failed verifications", done: "Pulled the 12 failed verifications", ms: 1200, detail: ["Compared against a 7-day average of 8 failures", "Volume was flat, so this is a rate change, not a load change"] },
    { label: "Grouping failures by jurisdiction and reason", done: "Grouped 12 failures into 2 clusters", ms: 1450, detail: ["9 of 12 are British Columbia registered entities", "All 9 failed the same check: registered address mismatch"], hit: 1 },
    { label: "Checking the BC registry feed for changes", done: "Found a format change on 13 Oct", ms: 1500, detail: ["BC Registry changed its address format on 13 Oct", "Unit numbers now lead the street line", "Our matcher is still comparing the old format"], hit: 2 }
  ];

  var PATTERN_CALLS = [
    { label: "Reviewing the last 7 days of verifications", done: "Reviewed 47 verifications", ms: 1250, detail: ["29 approved, 12 flagged, 6 pending review"] },
    { label: "Clustering by product, jurisdiction, and outcome", done: "British Columbia stands out", ms: 1400, detail: ["British Columbia is 38% of volume but 75% of failures", "Every other jurisdiction sits inside its normal range"], hit: 0 },
    { label: "Checking what the 6 pending reviews are waiting on", done: "4 of 6 share one blocker", ms: 1350, detail: ["4 of 6 are blocked on the same registry source", "Average wait is 2.5 days, up from 0.8"], hit: 0 }
  ];

  /* One-line answers about the account. Everything here is fictional demo
     data for the repeat-customer story. */
  var OPS_FACTS = {
    summary: "In the last 7 days you've processed 47 verifications — 29 approved, 12 flagged, and 6 pending review. The failure rate is up 40% against the 7-day average of 8.",
    flagged: "12 verifications are flagged. 9 are British Columbia entities that failed on registered address mismatch. The other 3 are unrelated: two expired documents and one genuine name mismatch.",
    pending: "6 verifications are pending review. Four of them are blocked on the same registry source, which is averaging 2.5 days against a normal 0.8. Two of the four are Summit Peak Advisors.",
    approved: "29 verifications were approved. Outside British Columbia your approval rate is unchanged at 94%, so the drop is confined to one jurisdiction.",
    cascade: "The Cascade Financial Group check was auto-approved — low risk, clean registry match, and no adverse media. Nothing there is waiting on you.",
    summit: "Summit Peak Advisors has additional registry data pulled and is waiting for your review. It's one of the four verifications blocked on the slow registry source.",
    rerun: "I'd hold off. Re-running the 9 British Columbia verifications now would fail the same way, because the matcher still compares the old address format. Re-run them once it handles unit-number-first addresses.",
    bcteam: "Tell them BC Registry changed its address format on 13 Oct so unit numbers now lead the street line. Until the matcher is updated, British Columbia address checks will keep failing regardless of the entity."
  };

  /* Keyword sets. Multi-word entries score double so phrases beat stray words. */
  var INTENTS = [
    { id: "links", keys: ["connected", "connected transactions", "transactions connected", "linked transaction", "connection", "connections", "linked", "links", "related", "related transactions", "show me transactions", "tied to"] },
    { id: "device", keys: ["device", "high risk device", "why is this device", "fingerprint", "3045489e05849546"] },
    { id: "document", keys: ["document", "selfie", "licence", "license", "liveness", "did jane", "jane doe document", "id check"] },
    { id: "bank", keys: ["bank", "account", "4417", "bank account", "what failed on the bank"] },
    { id: "daniel", keys: ["daniel", "reyes", "declined", "march"] },
    { id: "bvi", keys: ["bvi", "holding company", "beneficial owner", "ultimate owner", "who owns", "ownership"] },
    { id: "director", keys: ["director", "officer", "officers", "runs", "run by", "in charge", "who runs", "who is the listed", "management", "principal", "signatory"] },
    { id: "onboard", keys: ["onboard", "onboarding", "request", "before onboarding", "next step", "what should i", "recommend", "should i accept"] },
    { id: "address", keys: ["address", "office", "registered office", "premises", "located", "mismatch"] },
    { id: "sanctions", keys: ["sanction", "sanctions", "ofac", "watchlist", "pep", "screening"] },
    { id: "compare", keys: ["different", "difference", "compare", "versus", "vs", "how is this different"] },
    { id: "failures", keys: ["failure", "failures", "failed", "spike", "spiked", "increase", "increased", "failing", "failure rate", "why did", "jump", "jumped", "worse", "root cause"] },
    { id: "patterns", keys: ["pattern", "patterns", "trend", "trends", "cluster", "identify patterns", "anything in common"] },
    { id: "summary", keys: ["summary", "how many", "overview", "last 7 days", "this week", "how are we doing", "verifications processed", "numbers", "volume", "how did we do"] },
    { id: "flagged", keys: ["flagged", "flags"] },
    { id: "pending", keys: ["pending", "pending review", "blocked", "waiting on", "review", "reviews", "stuck", "held up", "taking so long"] },
    { id: "approved", keys: ["approved", "approval", "approval rate", "passed", "went through"] },
    { id: "cascade", keys: ["cascade", "cascade financial"] },
    { id: "summit", keys: ["summit", "summit peak", "peak advisors"] },
    { id: "rerun", keys: ["re run", "rerun", "run again", "retry", "re-run"] },
    { id: "bcteam", keys: ["bc team", "tell them", "notify", "notify the team", "what should i tell", "let them know", "inform the team", "send a message"] },
    { id: "flag", keys: ["flag", "flag for review", "flag this", "mark for review", "send to review", "put in review"] },
    { id: "approve", keys: ["approve", "approve this", "accept this", "clear this", "mark approved", "mark as approved", "greenlight"] },
    { id: "escalate", keys: ["escalate", "escalate this", "raise this", "urgent review", "priority review"] },
    { id: "analyze", keys: ["analyze", "analysis", "break down", "breakdown", "drill down", "deep dive", "risk profile", "risk breakdown", "risk analysis"] },
    { id: "guide", keys: ["guide", "guide me", "walk me through", "checklist", "action plan", "action items", "what now", "what do i do next", "how do i proceed", "recommended steps", "what are my options"] }
  ];

  /* ------------------------------------------------------------- run token */

  /* Every wait in a reply is registered here, so cancel() unwinds the whole
     chain at once instead of leaving orphaned timers firing into a dead thread. */
  function Run() {
    this.cancelled = false;
    this.waits = [];
    this.ticks = [];
    this.enders = [];
  }

  /* Anything holding a promise that cancel() would otherwise strand registers
     here, so a stopped reply always unwinds instead of hanging the composer. */
  Run.prototype.onCancel = function (fn) {
    this.enders.push(fn);
  };

  Run.prototype.sleep = function (ms) {
    var self = this;
    return new Promise(function (resolve) {
      if (self.cancelled) { resolve(); return; }
      var wait = { resolve: resolve, id: 0 };
      wait.id = window.setTimeout(function () {
        var at = self.waits.indexOf(wait);
        if (at !== -1) self.waits.splice(at, 1);
        resolve();
      }, reduced ? Math.min(ms, 40) : ms);
      self.waits.push(wait);
    });
  };

  /* Streaming ticks run on timers, not requestAnimationFrame: rAF stops firing
     in a hidden tab, which would freeze a reply mid-sentence until the user
     came back. Timers only throttle, and the stream reads its position from
     elapsed time, so one late tick catches straight up. */
  Run.prototype.tick = function (fn) {
    var id = window.setTimeout(fn, 16);
    this.ticks.push(id);
  };

  Run.prototype.cancel = function () {
    if (this.cancelled) return;
    this.cancelled = true;
    this.waits.forEach(function (wait) {
      window.clearTimeout(wait.id);
      wait.resolve();
    });
    this.waits = [];
    this.ticks.forEach(window.clearTimeout);
    this.ticks = [];
    this.enders.forEach(function (fn) { fn(); });
    this.enders = [];
  };

  var run = null;

  /* --------------------------------------------------------------- scroll */

  var scroller = null;

  function findScroller() {
    var node = thread.parentElement;
    while (node && node !== document.body) {
      var style = window.getComputedStyle(node);
      if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight) return node;
      node = node.parentElement;
    }
    return document.scrollingElement || document.documentElement;
  }

  /* Only follow the stream while the reader is already at the bottom, so
     scrolling up to re-read an earlier turn isn't yanked back down. */
  function stick() {
    if (!scroller || scroller.scrollHeight <= scroller.clientHeight) scroller = findScroller();
    if (!scroller) return;
    var slack = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
    if (slack < 160) scroller.scrollTop = scroller.scrollHeight;
  }

  /* ------------------------------------------------------------ rendering */

  function clone(name) {
    var tpl = document.querySelector('[data-d1-tpl="' + name + '"]');
    if (!tpl) return null;
    return tpl.content.firstElementChild.cloneNode(true);
  }

  function place(node) {
    thread.appendChild(node);
    stick();
    return node;
  }

  function renderUser(text) {
    var node = clone("user");
    if (!node) return;
    node.querySelector("p").textContent = text;
    place(node);
  }

  function showText(el, text) {
    el.textContent = text;
    stick();
  }

  async function playText(part, token) {
    var node = clone("ai");
    if (!node) return;
    place(node);
    for (var i = 0; i < part.body.length; i += 1) {
      if (token.cancelled) return;
      var line = part.body[i];
      var p = document.createElement("p");
      if (line.ask) p.className = "d1-ai__ask";
      node.appendChild(p);
      showText(p, line.text);
    }
  }

  async function playTools(part, token) {
    var node = clone("tools");
    if (!node) return;
    var label = node.querySelector("[data-d1-tools-label]");
    var pct = node.querySelector(".d1-progress__pct");
    var fill = node.querySelector(".d1-progress__fill");
    var check = node.querySelector("[data-d1-tools-check]");
    var steps = node.querySelector("[data-d1-steps]");
    label.textContent = part.label;
    place(node);

    var calls = part.calls;
    var rows = [];

    for (var i = 0; i < calls.length; i += 1) {
      if (token.cancelled) break;
      var call = calls[i];

      /* Collapse the row that was running before this one. */
      rows.forEach(function (prev) {
        prev.toggle.classList.remove("d1-activity__toggle--current");
        prev.toggle.setAttribute("aria-expanded", "false");
        prev.body.hidden = true;
      });

      var row = clone("activity");
      var toggle = row.querySelector(".d1-activity__toggle");
      var body = row.querySelector(".d1-activity__body");
      var detail = row.querySelector("[data-d1-activity-detail]");
      row.querySelector("[data-d1-activity-label]").textContent = call.label;
      if (!call.detail || !call.detail.length) {
        row.classList.add("is-bare");
        body.hidden = true;
      }
      steps.appendChild(row);
      rows.push({ toggle: toggle, body: body });
      stick();

      pct.textContent = Math.round((i / calls.length) * 100) + "%";
      fill.style.width = Math.round((i / calls.length) * 100) + "%";

      /* Detail lines land while the call is still running, not all at once. */
      var lines = call.detail || [];
      var slice = lines.length ? call.ms / (lines.length + 1) : call.ms;
      for (var j = 0; j < lines.length; j += 1) {
        await token.sleep(slice);
        if (token.cancelled) break;
        var p = document.createElement("p");
        p.textContent = lines[j];
        if (call.hit === j) p.className = "d1-activity__hit";
        detail.appendChild(p);
        stick();
      }
      await token.sleep(slice);
      if (token.cancelled) break;

      var running = row.querySelector('[data-d1-mark="run"]');
      var finished = row.querySelector('[data-d1-mark="done"]');
      if (running) running.hidden = true;
      if (finished) finished.hidden = false;

      /* The label is written in flight ("Pulling\u2026"); once the call lands it
         is replaced with what the call actually found. */
      if (call.done) row.querySelector("[data-d1-activity-label]").textContent = call.done;

      pct.textContent = Math.round(((i + 1) / calls.length) * 100) + "%";
      fill.style.width = Math.round(((i + 1) / calls.length) * 100) + "%";
    }

    if (token.cancelled) {
      label.textContent = "Stopped";
      rows.forEach(function (prev) {
        var spin = prev.toggle.querySelector(".d1-spin");
        if (spin) spin.classList.remove("d1-spin");
      });
      return;
    }

    label.textContent = part.doneLabel || "Investigation complete";
    fill.classList.remove("d1-progress__fill--active");
    fill.classList.add("d1-progress__fill--done");
    if (check) check.hidden = false;
    stick();
  }

  async function playReport(part, token) {
    var node = clone("report");
    if (!node) return;
    var company = part.company;
    node.querySelector("[data-d1-co]").textContent = company.name;
    var tag = node.querySelector("[data-d1-report-tag]");
    tag.textContent = company.tag || "Verified";
    tag.className = "d1-tag d1-tag--" + (company.tone === "review" ? "review" : "positive");
    place(node);
    showText(node.querySelector("[data-d1-sum-a]"), company.sumA);
    if (token.cancelled) return;
    var sumB = node.querySelector("[data-d1-sum-b]");
    if (company.sumB && sumB) {
      sumB.hidden = false;
      showText(sumB, company.sumB);
    } else if (sumB) {
      sumB.hidden = true;
    }
  }

  async function playTable(part, token) {
    var node = clone("table");
    if (!node) return;
    place(node);
    showText(node.querySelector("[data-d1-table-lead]"), part.lead);
  }

  async function playTyping(part, token) {
    var node = clone("typing");
    if (!node) return;
    place(node);
    await token.sleep(part.ms);
    node.remove();
  }

  /* ---- confirm + toast ---- */

  function showToast(text, warn) {
    var el = document.createElement("div");
    el.className = "tds-announcement tds-announcement--inline d1-toast" + (warn ? " tds-announcement--warning" : " tds-announcement--success");
    var iconWrap = document.createElement("span");
    iconWrap.className = "tds-announcement__icon";
    iconWrap.setAttribute("aria-hidden", "true");
    var icon = document.createElement("img");
    icon.src = warn ? "assets/icons/warning-amber.svg" : "assets/icons/circle-check.svg";
    icon.alt = "";
    icon.width = 16;
    icon.height = 16;
    iconWrap.appendChild(icon);
    el.appendChild(iconWrap);
    var content = document.createElement("div");
    content.className = "tds-announcement__content";
    var msg = document.createElement("p");
    msg.className = "tds-announcement__message";
    msg.textContent = text;
    content.appendChild(msg);
    el.appendChild(content);
    document.body.appendChild(el);
    window.setTimeout(function () { if (el.parentNode) el.remove(); }, 3200);
  }

  async function playConfirm(part, token) {
    var node = clone("confirm");
    if (!node) return;
    node.querySelector("[data-d1-confirm-action]").textContent = part.action;
    node.querySelector("[data-d1-confirm-detail]").textContent = part.detail;
    var yesBtn = node.querySelector("[data-d1-confirm-yes]");
    var noBtn = node.querySelector("[data-d1-confirm-no]");
    var card = node.querySelector("[data-d1-confirm-card]");
    if (part.yes) yesBtn.textContent = part.yes;
    if (part.warn) {
      card.classList.remove("tds-announcement--info");
      card.classList.add("tds-announcement--warning");
    }
    place(node);

    var confirmed = await new Promise(function (resolve) {
      yesBtn.addEventListener("click", function () { resolve(true); });
      noBtn.addEventListener("click", function () { resolve(false); });
      token.onCancel(function () { resolve(false); });
    });

    var buttons = node.querySelector("[data-d1-confirm-buttons]");
    buttons.style.display = "none";
    var content = card.querySelector(".tds-announcement__content");
    var result = document.createElement("div");
    result.className = "d1-confirm__result";

    if (confirmed) {
      card.classList.remove("tds-announcement--info", "tds-announcement--warning");
      card.classList.add("tds-announcement--success");
      var iconEl = node.querySelector("[data-d1-confirm-icon] img");
      if (iconEl) iconEl.src = "assets/icons/circle-check.svg";
      result.classList.add("d1-confirm__result--done");
      var img = document.createElement("img");
      img.src = "assets/icons/circle-check.svg";
      img.alt = "";
      img.width = 16;
      img.height = 16;
      result.appendChild(img);
      var span = document.createElement("span");
      span.textContent = part.toast || "Done";
      result.appendChild(span);
      content.appendChild(result);
      showToast(part.toast || "Done", false);
    } else {
      result.classList.add("d1-confirm__result--cancelled");
      result.textContent = "Cancelled";
      content.appendChild(result);
    }
    stick();
  }

  /* ---- analysis / compare / guide ---- */

  async function playAnalysis(part, token) {
    var node = clone("analysis");
    if (!node) return;
    node.querySelector("[data-d1-analysis-title]").textContent = part.title;
    var container = node.querySelector("[data-d1-analysis-rows]");
    place(node);
    for (var i = 0; i < part.rows.length; i += 1) {
      if (token.cancelled) return;
      var r = part.rows[i];
      var isLast = i === part.rows.length - 1;
      if (isLast && /overall|risk/i.test(r.label)) {
        var sentiment = r.status === "positive" ? "positive" : "negative";
        var sc = document.createElement("div");
        sc.className = "tds-stat-card tds-stat-card--" + sentiment;
        var scLabel = document.createElement("p");
        scLabel.className = "tds-stat-card__label";
        scLabel.textContent = r.label;
        sc.appendChild(scLabel);
        var scGroup = document.createElement("div");
        scGroup.className = "tds-stat-card__value-group";
        var scVal = document.createElement("p");
        scVal.className = "tds-stat-card__value";
        scVal.textContent = r.value;
        scGroup.appendChild(scVal);
        sc.appendChild(scGroup);
        container.appendChild(sc);
      } else {
        var field = document.createElement("div");
        field.className = "tds-data-field tds-data-field--horizontal" + (r.status ? " d1-val--" + r.status : "");
        var labelRow = document.createElement("div");
        labelRow.className = "tds-data-field__label-row";
        var label = document.createElement("p");
        label.className = "tds-data-field__label";
        label.textContent = r.label;
        labelRow.appendChild(label);
        field.appendChild(labelRow);
        var content = document.createElement("div");
        content.className = "tds-data-field__content";
        var valueRow = document.createElement("div");
        valueRow.className = "tds-data-field__value-row";
        var value = document.createElement("p");
        value.className = "tds-data-field__value";
        value.textContent = r.value;
        valueRow.appendChild(value);
        content.appendChild(valueRow);
        field.appendChild(content);
        container.appendChild(field);
      }
      stick();
      await token.sleep(160);
    }
  }

  async function playCompare(part, token) {
    var node = clone("compare");
    if (!node) return;
    node.querySelector("[data-d1-compare-left]").textContent = part.left;
    node.querySelector("[data-d1-compare-right]").textContent = part.right;
    var container = node.querySelector("[data-d1-compare-rows]");
    place(node);
    for (var i = 0; i < part.rows.length; i += 1) {
      if (token.cancelled) return;
      var r = part.rows[i];
      var tr = document.createElement("tr");
      var th = document.createElement("td");
      th.textContent = r.label;
      var tdL = document.createElement("td");
      tdL.className = r.hl === "left" ? "d1-cell--negative" : r.hl === "right" ? "d1-cell--positive" : "";
      tdL.textContent = r.l;
      var tdR = document.createElement("td");
      tdR.className = r.hl === "right" ? "d1-cell--negative" : r.hl === "left" ? "d1-cell--positive" : "";
      tdR.textContent = r.r;
      tr.appendChild(th);
      tr.appendChild(tdL);
      tr.appendChild(tdR);
      container.appendChild(tr);
      stick();
      await token.sleep(160);
    }
  }

  async function playGuide(part, token) {
    var node = clone("guide");
    if (!node) return;
    node.querySelector("[data-d1-guide-title]").textContent = part.title;
    var list = node.querySelector("[data-d1-guide-steps]");
    place(node);
    for (var i = 0; i < part.steps.length; i += 1) {
      if (token.cancelled) return;
      var s = part.steps[i];
      var row = document.createElement("label");
      row.className = "d1-check-row" + (s.done ? " is-checked" : "");
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.className = "tds-checkbox";
      cb.checked = !!s.done;
      var span = document.createElement("span");
      span.className = "d1-check-row__text";
      span.textContent = s.text;
      row.appendChild(cb);
      row.appendChild(span);
      list.appendChild(row);
      (function (theRow, theCb) {
        theCb.addEventListener("change", function () {
          if (theCb.checked) theRow.classList.add("is-checked");
          else theRow.classList.remove("is-checked");
        });
      })(row, cb);
      stick();
      await token.sleep(180);
    }
  }

  async function play(parts, token) {
    for (var i = 0; i < parts.length; i += 1) {
      if (token.cancelled) return;
      var part = parts[i];
      if (part.t === "typing") await playTyping(part, token);
      else if (part.t === "text") await playText(part, token);
      else if (part.t === "tools") await playTools(part, token);
      else if (part.t === "report") await playReport(part, token);
      else if (part.t === "table") await playTable(part, token);
      else if (part.t === "confirm") await playConfirm(part, token);
      else if (part.t === "analysis") await playAnalysis(part, token);
      else if (part.t === "compare") await playCompare(part, token);
      else if (part.t === "guide") await playGuide(part, token);
      if (!token.cancelled && i < parts.length - 1) await token.sleep(part.t === "typing" ? 0 : 320);
    }
  }

  /* ------------------------------------------------------- follow-up rail */

  var activeSuggestions = [];

  function setSuggestions(items) {
    activeSuggestions = items || [];
    var rows = follow ? follow.querySelectorAll("[data-d1-suggest]") : [];
    for (var i = 0; i < rows.length; i += 1) {
      var item = activeSuggestions[i];
      if (item) {
        rows[i].hidden = false;
        rows[i].querySelector("span").textContent = item.q;
      } else {
        rows[i].hidden = true;
      }
    }
  }

  function showFollow() {
    if (follow) follow.classList.add("is-on");
  }

  function hideFollow() {
    if (follow) follow.classList.remove("is-on");
  }

  /* -------------------------------------------------------- context sidebar */

  var sidebarOpen = false;

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
    if (sidebar) sidebar.hidden = !sidebarOpen;
    if (home) {
      if (sidebarOpen) home.classList.add("has-sidebar");
      else home.classList.remove("has-sidebar");
    }
    document.querySelectorAll("[data-d1-sidebar-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", sidebarOpen ? "true" : "false");
    });
  }

  function closeSidebar() {
    sidebarOpen = false;
    if (sidebar) sidebar.hidden = true;
    if (sidebarItems) sidebarItems.innerHTML = "";
    if (home) home.classList.remove("has-sidebar");
    document.querySelectorAll("[data-d1-sidebar-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", "false");
    });
  }

  function selectSidebarItem(kind) {
    if (!sidebarItems) return;
    var items = sidebarItems.querySelectorAll(".d1-sidebar__item");
    for (var i = 0; i < items.length; i += 1) {
      var on = items[i].getAttribute("data-d1-sidebar-item") === kind;
      items[i].classList.toggle("is-active", on);
      items[i].setAttribute("aria-current", on ? "true" : "false");
    }
  }

  function updateSidebar(entity, hasLinks) {
    if (!sidebarItems) return;
    sidebarItems.innerHTML = "";
    if (!entity) return;

    var reportItem = document.createElement("button");
    reportItem.type = "button";
    reportItem.className = "d1-sidebar__item";
    reportItem.setAttribute("data-d1-sidebar-item", "report");
    reportItem.setAttribute("aria-current", "false");
    reportItem.textContent = "KYB Report for " + entity.name;
    reportItem.addEventListener("click", function () {
      selectSidebarItem("report");
      document.dispatchEvent(new CustomEvent("d1-drawer:open", { detail: { kind: "report" } }));
    });
    sidebarItems.appendChild(reportItem);

    if (hasLinks) {
      var txItem = document.createElement("button");
      txItem.type = "button";
      txItem.className = "d1-sidebar__item";
      txItem.setAttribute("data-d1-sidebar-item", "links");
      txItem.setAttribute("aria-current", "false");
      txItem.textContent = "Connected transactions";
      txItem.addEventListener("click", function () {
        selectSidebarItem("links");
        document.dispatchEvent(new CustomEvent("d1-drawer:close"));
        var table = thread.querySelector(".d1-table:last-of-type");
        if (table) table.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
      });
      sidebarItems.appendChild(txItem);
      selectSidebarItem("links");
    } else {
      selectSidebarItem("report");
    }
  }

  document.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-d1-sidebar-toggle]");
    if (btn) toggleSidebar();
  });

  /* Keep Summary selection in sync when the thread opens a report or row. */
  if (thread) {
    thread.addEventListener("click", function (event) {
      if (event.target.closest(".d1-alert__view")) selectSidebarItem("report");
      else if (event.target.closest("tr[data-d1-tx]")) selectSidebarItem("links");
    });
  }

  /* --------------------------------------------------------------- intent */

  function normalize(text) {
    return " " + text.toLowerCase().replace(/[^a-z0-9•]+/g, " ").trim() + " ";
  }

  function scoreIntent(flat, keys) {
    var hits = 0;
    keys.forEach(function (key) {
      if (flat.indexOf(" " + key.toLowerCase() + " ") !== -1) hits += key.indexOf(" ") !== -1 ? 3 : 1;
      else if (key.indexOf(" ") === -1 && flat.indexOf(" " + key.toLowerCase()) !== -1) hits += 1;
    });
    return hits;
  }

  function resolveIntent(text) {
    var flat = normalize(text);
    var best = null;
    var bestScore = 0;
    INTENTS.forEach(function (intent) {
      var score = scoreIntent(flat, intent.keys);
      if (score > bestScore) {
        bestScore = score;
        best = intent.id;
      }
    });
    return bestScore > 0 ? best : null;
  }

  function namedCompany(text) {
    if (/northstar/i.test(text)) return NORTHSTAR;
    if (/trade holdings/i.test(text)) return TRADE;
    if (/apex consulting|meridian apex/i.test(text)) return APEX;
    if (/meridian capital|capital llc/i.test(text)) return CAPITAL;
    if (/nordic|apex/i.test(text)) return NORDIC;
    return null;
  }

  function isPerson(text, agent) {
    return agent === "kyc" || /jane doe|verify this person|verify a person|verify jane/i.test(text);
  }

  /* --------------------------------------------------------- conversation */

  var convo = { entity: null, linksShown: false, lastUser: "", started: false };

  /* --------------------------------------------------------- chat history */

  var history = [];
  var activeId = null;
  var nextId = 1;
  var chatList = document.querySelector("[data-d1-chat-list]");

  function freshConvo() {
    return { entity: null, linksShown: false, lastUser: "", started: false };
  }

  function saveActive() {
    if (!activeId) return;
    var entry = history.find(function (h) { return h.id === activeId; });
    if (entry) {
      entry.html = thread.innerHTML;
      entry.convo = JSON.parse(JSON.stringify(convo));
      entry.suggestions = activeSuggestions;
    }
  }

  function renderChatList() {
    if (!chatList) return;
    chatList.innerHTML = "";
    if (!history.length) return;
    var label = document.createElement("p");
    label.className = "d1-fly__label";
    label.textContent = "Recent";
    chatList.appendChild(label);
    history.forEach(function (entry) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "d1-chat-row" + (entry.id === activeId ? " d1-chat-row--current" : "");
      btn.setAttribute("role", "menuitem");
      btn.setAttribute("data-d1-chat-id", entry.id);
      btn.innerHTML = '<img src="assets/icons/chat-dot.svg" alt="" width="5" height="5">';
      btn.appendChild(document.createTextNode(entry.title));
      chatList.appendChild(btn);
    });
  }

  function loadChat(id) {
    var entry = history.find(function (h) { return h.id === id; });
    if (!entry) return;
    if (run) run.cancel();
    saveActive();
    activeId = id;
    thread.innerHTML = entry.html;
    convo = JSON.parse(JSON.stringify(entry.convo));
    scroller = null;
    stage.setAttribute("data-d1-stage", "chat");
    if (title) title.textContent = entry.title;
    setBusy(false);
    setSuggestions(entry.suggestions || []);
    hideFollow();
    showFollow();
    renderChatList();
    document.dispatchEvent(new CustomEvent("d1-drawer:close"));
    if (convo.entity) {
      updateSidebar(convo.entity, convo.linksShown);
      if (!sidebarOpen) toggleSidebar();
    } else {
      closeSidebar();
    }
  }

  function startNewChat() {
    if (run) run.cancel();
    saveActive();
    activeId = null;
    convo = freshConvo();
    thread.replaceChildren();
    scroller = null;
    setBusy(false);
    hideFollow();
    closeSidebar();
    stage.setAttribute("data-d1-stage", "home");
    document.dispatchEvent(new CustomEvent("d1-drawer:close"));
    if (title) title.textContent = "Chat heading/title";
    renderChatList();
  }

  if (chatList) {
    chatList.addEventListener("click", function (event) {
      var row = event.target.closest("[data-d1-chat-id]");
      if (row) loadChat(Number(row.getAttribute("data-d1-chat-id")));
    });
  }

  /* Thinking time tracks the size of the answer, so a one-line reply never
     takes as long as a full investigation. */
  function thinkFor(text) {
    return Math.round(420 + Math.min(text.length, 420) * 2.1 + Math.random() * 280);
  }

  function say(text, ask) {
    return { t: "text", body: ask ? [{ text: text }, { text: ask, ask: true }] : [{ text: text }] };
  }

  function investigationPlan(company) {
    return [
      { t: "typing", ms: thinkFor(company.lead) },
      say(company.lead, company.ask),
      { t: "tools", label: "Investigating", doneLabel: "Investigation complete", calls: company.calls },
      { t: "report", company: company }
    ];
  }

  function linksPlan(company) {
    return [
      { t: "typing", ms: 700 },
      say("Pulling the records that share a name, device, or account with " + company.name + "."),
      { t: "tools", label: "Looking for connected transactions", doneLabel: "3 connections found", calls: LINK_CALLS },
      { t: "table", lead: "Three transactions are connected to " + company.name + ". Open a row for the KYC, device, or bank result." }
    ];
  }

  function askWhichPlan(text) {
    var meridian = /meridian/i.test(text);
    var lead = meridian
      ? "“Meridian” matches multiple unrelated businesses, so I need to resolve the legal entity before running the KYB check; otherwise ownership, registration, and sanctions results could be attached to the wrong company."
      : "I can run a demo check, but I need the record to use. Nothing here calls a live registry.";
    var ask = meridian
      ? "Which should I investigate — Meridian Apex Consulting Ltd., Meridian Trade Holdings Ltd., or Meridian Capital LLC?"
      : "Which should I open — Apex Nordic Logistics, Northstar Trading Ltd., or a person such as Jane Doe?";
    return {
      parts: [{ t: "typing", ms: thinkFor(lead) }, say(lead, ask)],
      suggestions: meridian
        ? [{ q: "Meridian Apex Consulting Ltd." }, { q: "Meridian Trade Holdings Ltd." }, { q: "Meridian Capital LLC" }]
        : [{ q: "Apex Nordic Logistics" }, { q: "Northstar Trading Ltd." }, { q: "Verify Jane Doe" }]
    };
  }

  function personPlan(text) {
    var jane = !/daniel|reyes/i.test(text);
    var body = jane ? GLOBAL_FACTS.jane : GLOBAL_FACTS.daniel;
    var ask = jane
      ? "Say the word if you want me to compare her against the Meridian Apex transactions."
      : "The same device (235252021) and account ••4417 also appear on Meridian Apex Consulting Ltd.";
    return {
      parts: [{ t: "typing", ms: thinkFor(body) }, say(body, ask)],
      suggestions: [
        { q: "Why was Daniel Reyes declined in March?", intent: "daniel" },
        { q: "Did Jane Doe's document match?", intent: "document" },
        { q: "Show me transactions connected to this business", intent: "links" }
      ]
    };
  }

  function fallbackText(text) {
    var asked = text.trim();
    if (asked.length > 64) asked = asked.slice(0, 61).replace(/\s+\S*$/, "") + "…";
    if (!convo.entity) {
      return "I don't have an answer for “" + asked + "” yet — I haven't opened a record. Name a business such as Apex Nordic Logistics or Northstar Trading Ltd., or a person such as Jane Doe, and I'll run the check.";
    }
    return "“" + asked + "” isn't in this demo dataset. For " + convo.entity.name + " I can cover the registry match, the registered office, the listed director, sanctions screening, the connected transactions, or what to request before onboarding.";
  }

  /* Turns one message into a reply plan. A real model would emit the same
     part list; only this function would be replaced. */
  /* Sign-in decides which story this session tells. The repeat customer has
     an account history behind them, so the agent answers about the account
     before it offers to open a new record. */
  function isRepeat() {
    var home = document.querySelector(".d1-home");
    return !!home && home.getAttribute("data-d1-repeat") === "true";
  }

  function failuresPlan() {
    var lead = "A jump this size is usually one cause rather than twelve separate ones. I'll start with what the 12 have in common.";
    var found = "Found it. 9 of the 12 failures are British Columbia entities, and every one of them failed the same check: registered address mismatch. All 9 ran after 13 Oct, the day BC Registry changed its address format so unit numbers lead the street line. I'd confirm that on one of the 9 before acting on all of them.";
    var next = "The other 3 are unrelated \u2014 two expired documents and one genuine name mismatch. Two things worth doing: hold the BC re-runs until the matcher handles the new format, and get the format change in front of whoever owns the matcher.";
    return {
      parts: [
        { t: "typing", ms: thinkFor(lead) },
        say(lead, "Pulling the failed verifications now."),
        { t: "tools", label: "Investigating the failure spike", doneLabel: "Root cause found", calls: FAILURE_CALLS },
        { t: "typing", ms: 520 },
        say(found, next)
      ],
      suggestions: FAILURE_SUGGESTIONS
    };
  }

  function patternsPlan() {
    var lead = "I'll look across all 47 verifications from the last 7 days, not just yesterday's failures.";
    var found = "Three patterns stand out. British Columbia is 38% of your volume but 75% of your failures. Four of the six pending reviews are blocked on the same registry source. And outside British Columbia your approval rate is unchanged at 94%.";
    var next = "The first two share a cause \u2014 the BC address format change. The third says the rest of your pipeline is healthy.";
    return {
      parts: [
        { t: "typing", ms: thinkFor(lead) },
        say(lead, "Scanning your recent activity now."),
        { t: "tools", label: "Scanning recent activity", doneLabel: "3 patterns found", calls: PATTERN_CALLS },
        { t: "typing", ms: 520 },
        say(found, next)
      ],
      suggestions: OPS_SUGGESTIONS
    };
  }

  /* Returns a plan when the message is about the account rather than about a
     single record, otherwise null so the record flow takes over. */
  function planOps(text, intent) {
    if (intent === "failures") return failuresPlan();
    if (intent === "patterns") return patternsPlan();
    if (intent && OPS_FACTS[intent]) {
      var fact = OPS_FACTS[intent];
      var after = (intent === "flagged" || intent === "rerun" || intent === "bcteam") ? FAILURE_SUGGESTIONS : OPS_SUGGESTIONS;
      return { parts: [{ t: "typing", ms: thinkFor(fact) }, say(fact)], suggestions: after };
    }
    return null;
  }

  /* A repeat customer who asks something off-dataset is pointed at their own
     briefing, not told to name a record first. */
  function opsMissPlan(text) {
    var asked = text.trim();
    if (asked.length > 64) asked = asked.slice(0, 61).replace(/\s+\S*$/, "") + "\u2026";
    var miss = "\u201c" + asked + "\u201d isn't in this demo dataset. I can explain the failure spike, the 12 flagged verifications, the 6 pending reviews, or what is in your recent activity \u2014 or name a business and I'll run a fresh check.";
    return { parts: [{ t: "typing", ms: thinkFor(miss) }, say(miss)], suggestions: OPS_SUGGESTIONS };
  }

  /* ---- action plans (confirm → toast) ---- */

  function flagPlan() {
    var name = convo.entity ? convo.entity.name : "this entity";
    return {
      parts: [
        { t: "typing", ms: 600 },
        say("I'll flag " + name + " for manual review and add it to your compliance team's queue."),
        { t: "confirm", action: "Flag " + name + " for review", detail: "Adds to the manual review queue and notifies the compliance team.", yes: "Flag for review", toast: name + " flagged for review" }
      ],
      suggestions: convo.entity ? convo.entity.suggestions : activeSuggestions
    };
  }

  function approvePlan() {
    var name = convo.entity ? convo.entity.name : "this entity";
    var clean = convo.entity && convo.entity.tone === "positive";
    if (!clean && convo.entity) {
      return {
        parts: [
          { t: "typing", ms: 800 },
          say(name + " still has open items — " + (convo.entity.tag === "Needs review" ? "it’s flagged for review" : "there are unresolved findings") + ". I’d resolve those before approving.", "You can approve anyway, but the open items will carry forward."),
          { t: "confirm", action: "Approve " + name + " anyway", detail: "Open items remain. Approval will note that findings were acknowledged.", yes: "Approve anyway", toast: name + " approved with open items", warn: true }
        ],
        suggestions: convo.entity.suggestions
      };
    }
    return {
      parts: [
        { t: "typing", ms: 600 },
        say("Registry matched and no sanctions flags. " + name + " is ready to approve."),
        { t: "confirm", action: "Approve " + name, detail: "Marks the verification as approved. No further review required.", yes: "Approve", toast: name + " approved" }
      ],
      suggestions: convo.entity ? convo.entity.suggestions : activeSuggestions
    };
  }

  function escalatePlan() {
    var name = convo.entity ? convo.entity.name : "the current case";
    return {
      parts: [
        { t: "typing", ms: 600 },
        say("I'll escalate " + name + " to your senior compliance officer for priority review."),
        { t: "confirm", action: "Escalate " + name, detail: "Moves to priority queue. Senior compliance officer is notified immediately.", yes: "Escalate", toast: name + " escalated" }
      ],
      suggestions: convo.entity ? convo.entity.suggestions : activeSuggestions
    };
  }

  function rerunPlan() {
    return {
      parts: [
        { t: "typing", ms: 800 },
        say("The matcher still compares the old address format, so all 9 British Columbia verifications would fail the same way.", "Re-run them once the format is updated — or go ahead now if you want a fresh timestamp on the failures."),
        { t: "confirm", action: "Re-run 9 BC verifications", detail: "These will likely fail again until the address matcher handles unit-number-first addresses.", yes: "Re-run anyway", toast: "9 verifications queued for re-run", warn: true }
      ],
      suggestions: FAILURE_SUGGESTIONS
    };
  }

  function notifyTeamPlan() {
    return {
      parts: [
        { t: "typing", ms: 700 },
        say("I'll send the BC team a summary of the address format change and its impact on the 9 failed verifications."),
        { t: "confirm", action: "Notify BC Registry team", detail: "“BC Registry changed its address format on 13 Oct — unit numbers now lead the street line. 9 verifications failed on this since the change.”", yes: "Send notification", toast: "Notification sent to BC Registry team" }
      ],
      suggestions: FAILURE_SUGGESTIONS
    };
  }

  function planAction(text, intent) {
    if (intent === "flag" && convo.entity) return flagPlan();
    if (intent === "approve" && convo.entity) return approvePlan();
    if (intent === "escalate") return escalatePlan();
    if (isRepeat()) {
      if (intent === "rerun") return rerunPlan();
      if (intent === "bcteam") return notifyTeamPlan();
    }
    return null;
  }

  /* ---- strategy plans (analyze / compare / guide) ---- */

  function analyzeEntityPlan() {
    var e = convo.entity;
    var rows;
    if (e === APEX) {
      rows = [
        { label: "Registry match", value: "No match found", status: "negative" },
        { label: "Employees", value: "0 reported", status: "warn" },
        { label: "Share capital", value: "£1", status: "warn" },
        { label: "Registered office", value: "Virtual — Regus serviced", status: "warn" },
        { label: "Beneficial owner", value: "BVI holding company (unnamed)", status: "negative" },
        { label: "Sanctions / PEP", value: "Clear", status: "positive" },
        { label: "Connected transactions", value: "3 flagged", status: "negative" },
        { label: "Overall risk", value: "High — shell indicators", status: "negative" }
      ];
    } else if (e === NORDIC) {
      rows = [
        { label: "Registry match", value: "Matched", status: "positive" },
        { label: "Registered office", value: "Verified", status: "positive" },
        { label: "Director", value: "Listed", status: "positive" },
        { label: "Sanctions / PEP", value: "Clear", status: "positive" },
        { label: "Connected transactions", value: "3 (1 passed, 2 need review)", status: "neutral" },
        { label: "Overall risk", value: "Low", status: "positive" }
      ];
    } else if (e === NORTHSTAR) {
      rows = [
        { label: "Registry match", value: "Matched", status: "positive" },
        { label: "Registered address", value: "Mismatch", status: "negative" },
        { label: "Sanctions / PEP", value: "Clear", status: "positive" },
        { label: "Overall risk", value: "Medium — address mismatch", status: "warn" }
      ];
    } else {
      rows = [
        { label: "Registry match", value: e.tone === "positive" ? "Matched" : "Needs review", status: e.tone === "positive" ? "positive" : "warn" },
        { label: "Sanctions / PEP", value: "Clear", status: "positive" },
        { label: "Overall risk", value: e.tone === "positive" ? "Low" : "Needs review", status: e.tone === "positive" ? "positive" : "warn" }
      ];
    }
    return {
      parts: [
        { t: "typing", ms: 700 },
        say("Here’s the risk breakdown for " + e.name + "."),
        { t: "analysis", title: "Risk Analysis — " + e.name, rows: rows }
      ],
      suggestions: e.suggestions
    };
  }

  function analyzeOpsPlan() {
    return {
      parts: [
        { t: "typing", ms: 700 },
        say("Here’s the breakdown of your 47 verifications over the last 7 days."),
        { t: "analysis", title: "Verification Breakdown — Last 7 Days", rows: [
          { label: "Total processed", value: "47", status: "neutral" },
          { label: "Approved", value: "29 (62%)", status: "positive" },
          { label: "Flagged", value: "12 (26%)", status: "negative" },
          { label: "Pending review", value: "6 (13%)", status: "warn" },
          { label: "Approval rate (excl. BC)", value: "94%", status: "positive" },
          { label: "Approval rate (BC only)", value: "0%", status: "negative" },
          { label: "Avg. review turnaround", value: "2.5 days (was 0.8)", status: "warn" },
          { label: "Root cause", value: "BC address format change", status: "negative" }
        ]}
      ],
      suggestions: OPS_SUGGESTIONS
    };
  }

  function comparePlan() {
    return {
      parts: [
        { t: "typing", ms: 700 },
        say("Here’s how the two stack up side by side."),
        { t: "compare", left: "Meridian Apex", right: "Apex Nordic", rows: [
          { label: "Status", l: "Needs review", r: "Verified", hl: "left" },
          { label: "Registry", l: "No match found", r: "Matched", hl: "left" },
          { label: "Employees", l: "0 reported", r: "12", hl: "left" },
          { label: "Share capital", l: "£1", r: "SEK 500 000", hl: "left" },
          { label: "Registered office", l: "Virtual (Regus)", r: "Physical address", hl: "left" },
          { label: "Sanctions", l: "Clear", r: "Clear" },
          { label: "Connected txns", l: "3 flagged", r: "3 (1 passed)", hl: "left" },
          { label: "Risk profile", l: "Shell indicators", r: "Clean", hl: "left" }
        ]}
      ],
      suggestions: convo.entity ? convo.entity.suggestions : [
        { q: "Flag Meridian Apex for review", intent: "flag" },
        { q: "Approve Apex Nordic", intent: "approve" }
      ]
    };
  }

  function guideEntityPlan() {
    var e = convo.entity;
    var steps;
    if (e.tone === "positive") {
      steps = [
        { text: "Registry match confirmed", done: true },
        { text: "Sanctions screening clear", done: true },
        { text: "Review connected transactions (3 found)", done: false },
        { text: "Request proof of address and recent filing", done: false },
        { text: "Approve the entity", done: false }
      ];
    } else if (e === APEX) {
      steps = [
        { text: "Investigate the registry mismatch", done: true },
        { text: "Review the BVI ownership chain", done: false },
        { text: "Check the 3 connected transactions", done: false },
        { text: "Request proof of trading and staffed office", done: false },
        { text: "Identify the person behind the BVI shareholder", done: false },
        { text: "Flag or escalate based on findings", done: false }
      ];
    } else {
      steps = [
        { text: "Resolve the address mismatch", done: false },
        { text: "Request a utility bill or lease at the application address", done: false },
        { text: "Confirm sanctions screening is clear", done: true },
        { text: "Review any connected transactions", done: false },
        { text: "Approve or flag based on findings", done: false }
      ];
    }
    return {
      parts: [
        { t: "typing", ms: 600 },
        say("Here’s what I’d work through for " + e.name + ". Check items off as you go."),
        { t: "guide", title: "Recommended Steps — " + e.name, steps: steps }
      ],
      suggestions: e.suggestions
    };
  }

  function guideOpsPlan() {
    return {
      parts: [
        { t: "typing", ms: 600 },
        say("Based on your current verification activity, here’s the action plan."),
        { t: "guide", title: "Recommended Actions", steps: [
          { text: "Confirm BC Registry address format change on one of the 9 failures", done: false },
          { text: "Notify the BC team about the format change", done: false },
          { text: "Hold BC re-runs until the matcher is updated", done: false },
          { text: "Review the 3 unrelated failures (2 expired docs, 1 name mismatch)", done: false },
          { text: "Clear the 4 pending reviews blocked on the slow registry source", done: false },
          { text: "Check Summit Peak Advisors — additional data pulled, waiting for review", done: false }
        ]}
      ],
      suggestions: OPS_SUGGESTIONS
    };
  }

  function planStrategy(text, intent) {
    if (intent === "analyze") {
      if (convo.entity) return analyzeEntityPlan();
      if (isRepeat()) return analyzeOpsPlan();
      return null;
    }
    if (intent === "compare") return comparePlan();
    if (intent === "guide") {
      if (convo.entity) return guideEntityPlan();
      if (isRepeat()) return guideOpsPlan();
      return null;
    }
    return null;
  }

  function planReply(text, agent) {
    var company = namedCompany(text);
    var intent = resolveIntent(text);

    if (company && (!convo.entity || company.id !== convo.entity.id || intent === null) && !(intent === "compare" && convo.entity)) {
      convo.entity = company;
      convo.linksShown = false;
      return { parts: investigationPlan(company), suggestions: company.suggestions };
    }

    if (isPerson(text, agent) && !company) return personPlan(text);

    var action = planAction(text, intent);
    if (action) return action;

    var strategy = planStrategy(text, intent);
    if (strategy) return strategy;

    if (isRepeat() && !convo.entity) {
      var ops = planOps(text, intent);
      if (ops) return ops;
    }

    if (intent === "links" && convo.entity) {
      if (convo.linksShown) {
        var repeat = "Those three are already in the table above: Jane Doe's KYC document, device 3045489E05849546, and account ••4417. Open a row to see the result.";
        return { parts: [{ t: "typing", ms: thinkFor(repeat) }, say(repeat)], suggestions: LINK_SUGGESTIONS };
      }
      convo.linksShown = true;
      return { parts: linksPlan(convo.entity), suggestions: LINK_SUGGESTIONS };
    }

    if (intent === "daniel") {
      return { parts: [{ t: "typing", ms: thinkFor(GLOBAL_FACTS.daniel) }, say(GLOBAL_FACTS.daniel)], suggestions: LINK_SUGGESTIONS };
    }

    if (intent && GLOBAL_FACTS[intent] && (!convo.entity || !convo.entity.facts[intent])) {
      var global = GLOBAL_FACTS[intent];
      return { parts: [{ t: "typing", ms: thinkFor(global) }, say(global)], suggestions: activeSuggestions };
    }

    if (intent && convo.entity && convo.entity.facts[intent]) {
      var fact = convo.entity.facts[intent];
      return { parts: [{ t: "typing", ms: thinkFor(fact) }, say(fact)], suggestions: convo.entity.suggestions };
    }

    if (!convo.entity && isRepeat()) return opsMissPlan(text);

    if (!convo.entity) return askWhichPlan(text);

    var miss = fallbackText(text);
    return { parts: [{ t: "typing", ms: thinkFor(miss) }, say(miss)], suggestions: convo.entity.suggestions };
  }

  /* ------------------------------------------------------------- dispatch */

  function setBusy(busy) {
    composer.dispatchEvent(new CustomEvent("d1-composer:state", { detail: { busy: busy } }));
  }

  async function respond(text, agent) {
    var plan = planReply(text, agent);
    updateSidebar(convo.entity, convo.linksShown);
    if (convo.entity && !sidebarOpen) toggleSidebar();
    var token = new Run();
    run = token;
    setBusy(true);
    hideFollow();
    try {
      await play(plan.parts, token);
    } finally {
      /* A cancelled reply unwinds after the next one has already taken over;
         only the live run is allowed to close out the composer. */
      if (run === token) {
        setBusy(false);
        setSuggestions(plan.suggestions && plan.suggestions.length ? plan.suggestions : activeSuggestions);
        showFollow();
        stick();
        saveActive();
      }
    }
  }

  composer.addEventListener("d1-composer:submit", function (event) {
    var detail = event.detail || {};
    var file = detail.attachments && detail.attachments[0];
    var text = detail.text || (file && file.name) || "";
    if (!text) return;

    if (run) run.cancel();
    stage.setAttribute("data-d1-stage", "chat");
    if (!convo.started) {
      var chatTitle = text.length > 50 ? text.slice(0, 47) + "..." : text;
      if (title) title.textContent = chatTitle;
      convo.started = true;
      var id = nextId++;
      activeId = id;
      history.unshift({ id: id, title: chatTitle, html: "", convo: JSON.parse(JSON.stringify(convo)), suggestions: [] });
      renderChatList();
    }
    convo.lastUser = text;
    scroller = null;
    renderUser(text);
    respond(text, detail.agent);
  });

  composer.addEventListener("d1-composer:stop", function () {
    if (run) run.cancel();
  });

  /* --------------------------------------------------------- thread chrome */

  /* Delegated: every block in the thread is cloned at runtime, so listeners
     bound at load would miss them. */
  thread.addEventListener("click", function (event) {
    var toggle = event.target.closest("[data-d1-activity]");
    if (toggle) {
      var body = toggle.parentElement.querySelector(".d1-activity__body");
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      if (body) body.hidden = open;
      return;
    }

    var copy = event.target.closest("[data-d1-copy]");
    if (copy) {
      var block = copy.closest(".d1-block");
      if (block && navigator.clipboard) navigator.clipboard.writeText(block.innerText);
      return;
    }

    var regen = event.target.closest("[data-d1-regen]");
    if (regen && convo.lastUser) {
      if (run) run.cancel();
      respond(convo.lastUser, null);
      return;
    }

    var vote = event.target.closest("[data-d1-vote]");
    if (vote) {
      var pressed = vote.getAttribute("aria-pressed") === "true";
      vote.closest(".d1-actions").querySelectorAll("[data-d1-vote]").forEach(function (other) {
        other.setAttribute("aria-pressed", "false");
      });
      vote.setAttribute("aria-pressed", pressed ? "false" : "true");
    }
  });

  function sendText(text) {
    var input = composer.querySelector("[data-d1-input]");
    var form = composer.querySelector("[data-d1-form]");
    if (!input || !form) return;
    input.value = text;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    form.requestSubmit();
  }

  document.querySelectorAll("[data-d1-demo]").forEach(function (button) {
    button.addEventListener("click", function () {
      var option = composer.querySelector('[data-d1-agent-option][data-agent="' + button.getAttribute("data-agent") + '"]');
      if (option) option.click();
      sendText(button.getAttribute("data-prompt") || "");
    });
  });

  if (follow) {
    follow.querySelectorAll("[data-d1-suggest]").forEach(function (row) {
      row.addEventListener("click", function () {
        var label = row.querySelector("span");
        if (label) sendText(label.textContent.trim());
      });
    });
  }

  document.querySelectorAll("[data-d1-new-chat]").forEach(function (button) {
    button.addEventListener("click", function () {
      startNewChat();
    });
  });

  var logo = document.querySelector(".d1-logo");
  if (logo) {
    logo.addEventListener("click", function () {
      startNewChat();
    });
  }

  if (back) {
    back.addEventListener("click", function () {
      startNewChat();
    });
  }
})();
