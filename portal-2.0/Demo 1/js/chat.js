/* Chat stage.
   The thread is rendered from data, never from pre-placed markup: a reply is a
   list of parts (text / tools / report / table), and the player walks that list
   appending fresh nodes. Text streams word by word and every wait is held on a
   cancellable Run, so Stop halts a reply mid-flight. */
(function () {
  var stage = document.querySelector("[data-d1-stage]");
  var title = document.querySelector("[data-d1-title]");
  var back = document.querySelector("[data-d1-back]");
  var composer = document.querySelector("[data-d1-composer]");
  var thread = document.querySelector("[data-d1-thread]");
  var follow = document.querySelector("[data-d1-follow]");
  if (!stage || !composer || !thread) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Streaming speed. Real models land around 80-110 chars/sec on screen. */
  var CPS = 92;

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
      { label: "Matched Meridian Apex Consulting on the UK registry", ms: 1150, detail: ["Companies House 11876542 — status active", "Incorporated 1 Feb 2019"] },
      { label: "Pulled filings, officers, and capital", ms: 1400, detail: ["0 employees declared on the latest return", "£1 issued share capital", "Registered office is a virtual office"], hit: 2 },
      { label: "Cross-referenced officers against sanctions lists", ms: 1250, detail: ["Checked OFAC, UN, and EU consolidated lists", "No listed officer returned a match"] },
      { label: "Scanned your transaction history for links", ms: 1600, detail: ["Searched people, devices, and accounts", "Found 3 connections to other transactions"], hit: 1 }
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
      { label: "Matched Apex Nordic Logistics on the UK registry", ms: 1100, detail: ["Registered name matches the application", "Jurisdiction is the United Kingdom"] },
      { label: "Confirmed the registered office", ms: 1050, detail: ["Registry address matches the address on the application"] },
      { label: "Scanned your transaction history for links", ms: 1550, detail: ["Searched people, devices, and accounts", "Found 3 connections to other transactions"], hit: 1 }
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
      { label: "Matched Meridian Trade Holdings on the UK registry", ms: 1100, detail: ["Companies House 11204887 — status active", "Incorporated 2018"] },
      { label: "Pulled filings, officers, and capital", ms: 1300, detail: ["Trading address at 25 Bank Street, Canary Wharf", "No shell-company pattern in the filings"] },
      { label: "Scanned your transaction history for links", ms: 1200, detail: ["No connected transactions found in your history"] }
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
      { label: "Matched Meridian Capital LLC on the NY registry", ms: 1150, detail: ["NY DOS 4417762 — status active", "Incorporated 2013"] },
      { label: "Confirmed the filed address", ms: 1000, detail: ["200 Vesey Street, New York"] },
      { label: "Scanned your transaction history for links", ms: 1300, detail: ["No connection to Daniel Reyes, device 235252021, or account ••4417"] }
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
      { label: "Matched Northstar Trading on the US registry", ms: 1100, detail: ["Registered name matches the application", "Status active"] },
      { label: "Compared the filed address to the application", ms: 1450, detail: ["Registry address and application address do not match", "Flagged for manual review"], hit: 1 }
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
    { label: "Searched records tied to this business", ms: 1150, detail: ["Matched on name, device, and account number"] },
    { label: "Comparing KYC, device, and bank results", ms: 1550, detail: ["Jane Doe — driver's license and selfie matched", "Device 3045489E05849546 — score 92, high risk", "Account ••4417 — business name did not match"], hit: 2 }
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

  /* Keyword sets. Multi-word entries score double so phrases beat stray words. */
  var INTENTS = [
    { id: "links", keys: ["connected transaction", "transactions connected", "linked transaction", "connection", "connections", "linked", "links", "related transactions", "show me transactions"] },
    { id: "device", keys: ["device", "high risk device", "why is this device", "fingerprint", "3045489e05849546"] },
    { id: "document", keys: ["document", "selfie", "licence", "license", "liveness", "did jane", "jane doe document", "id check"] },
    { id: "bank", keys: ["bank", "account", "4417", "bank account", "what failed on the bank"] },
    { id: "daniel", keys: ["daniel", "reyes", "declined", "march"] },
    { id: "bvi", keys: ["bvi", "holding company", "beneficial owner", "ultimate owner", "who owns", "ownership"] },
    { id: "director", keys: ["director", "officer", "officers", "runs", "run by", "in charge", "who runs", "who is the listed", "management", "principal", "signatory"] },
    { id: "onboard", keys: ["onboard", "onboarding", "request", "before onboarding", "next step", "what should i", "recommend", "should i accept"] },
    { id: "address", keys: ["address", "office", "registered office", "premises", "located", "mismatch"] },
    { id: "sanctions", keys: ["sanction", "sanctions", "ofac", "watchlist", "pep", "screening"] },
    { id: "compare", keys: ["different", "difference", "compare", "versus", "vs", "how is this different"] }
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

  function streamText(el, text, token) {
    return new Promise(function (resolve) {
      if (reduced || token.cancelled) {
        el.textContent = text;
        stick();
        resolve();
        return;
      }
      var words = text.match(/\S+\s*/g) || [text];
      var schedule = [];
      var at = 0;
      words.forEach(function (word) {
        at += (word.length / CPS) * 1000 * (0.82 + Math.random() * 0.36);
        if (/[.!?]["')\]]?\s*$/.test(word)) at += 150;
        else if (/[,;:—]\s*$/.test(word)) at += 70;
        schedule.push(at);
      });

      var start = window.performance.now();
      var shown = 0;
      var ended = false;
      el.classList.add("is-streaming");

      function finish() {
        if (ended) return;
        ended = true;
        el.classList.remove("is-streaming");
        resolve();
      }

      /* Stop snaps the paragraph to its full text rather than leaving a
         half-written sentence on screen. */
      token.onCancel(function () {
        el.textContent = text;
        stick();
        finish();
      });

      function step() {
        if (token.cancelled) {
          el.textContent = text;
          stick();
          finish();
          return;
        }
        var elapsed = window.performance.now() - start;
        var before = shown;
        while (shown < words.length && schedule[shown] <= elapsed) shown += 1;
        if (shown !== before) {
          el.textContent = words.slice(0, shown).join("");
          stick();
        }
        if (shown >= words.length) { finish(); return; }
        token.tick(step);
      }

      token.tick(step);
    });
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
      await streamText(p, line.text, token);
      if (i < part.body.length - 1) await token.sleep(180);
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
    await streamText(node.querySelector("[data-d1-sum-a]"), company.sumA, token);
    if (token.cancelled) return;
    await streamText(node.querySelector("[data-d1-sum-b]"), company.sumB, token);
  }

  async function playTable(part, token) {
    var node = clone("table");
    if (!node) return;
    place(node);
    await streamText(node.querySelector("[data-d1-table-lead]"), part.lead, token);
  }

  async function playTyping(part, token) {
    var node = clone("typing");
    if (!node) return;
    place(node);
    await token.sleep(part.ms);
    node.remove();
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
  function planReply(text, agent) {
    var company = namedCompany(text);
    var intent = resolveIntent(text);

    if (company && (!convo.entity || company.id !== convo.entity.id || intent === null)) {
      convo.entity = company;
      convo.linksShown = false;
      return { parts: investigationPlan(company), suggestions: company.suggestions };
    }

    if (isPerson(text, agent) && !company) return personPlan(text);

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
    if (!convo.started && title) {
      title.textContent = text;
      convo.started = true;
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
      if (back) back.click();
    });
  });

  var logo = document.querySelector(".d1-logo");
  if (logo) {
    logo.addEventListener("click", function () {
      if (back) back.click();
    });
  }

  if (back) {
    back.addEventListener("click", function () {
      if (run) run.cancel();
      setBusy(false);
      thread.replaceChildren();
      convo = { entity: null, linksShown: false, lastUser: "", started: false };
      scroller = null;
      hideFollow();
      stage.setAttribute("data-d1-stage", "home");
      var main = document.querySelector(".d1-main");
      if (main) main.setAttribute("data-d1-drawer", "closed");
      if (title) title.textContent = "Chat heading/title";
    });
  }
})();
