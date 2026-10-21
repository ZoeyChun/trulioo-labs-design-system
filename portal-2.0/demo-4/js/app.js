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
  var chatSlot = document.querySelector("[data-d4-composer-chat]");
  var titleEl = document.querySelector("[data-d4-title]");
  if (!stage || !composer || !thread || !feed) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------- scenario */

  var APEX = {
    id: "apex",
    short: "Meridian Apex",
    name: "Meridian Apex Consulting Ltd.",
    country: "United Kingdom",
    status: "Active",
    reg: "Companies House 11876542",
    addr: "Suite 400, 1 King Street, London",
    brief: "Shell profile · Virtual office · £1 capital",
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
      { q: "Show me the 3 connections" },
      { q: "Why wouldn't you onboard it?" },
      { q: "What's in the verification report?" }
    ]
  };

  var TRADE = {
    id: "trade",
    short: "Meridian Trade Holdings",
    name: "Meridian Trade Holdings Ltd.",
    country: "United Kingdom",
    status: "Active",
    reg: "Companies House 11204887",
    addr: "25 Bank Street, Canary Wharf",
    brief: "Operating company · Canary Wharf trading address",
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
    country: "United States",
    status: "Active",
    reg: "NY DOS 4417762",
    addr: "200 Vesey Street, New York",
    brief: "Investment firm · Incorporated 2013 · New York DOS filing",
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

  var MERIDIANS = [APEX, TRADE, CAPITAL];

  /* Figma 1479:84168 — multi-match list. Chip counts = businesses per country. */
  var MATCH_PAGE_SIZE = 3;
  var MATCH_COUNTRY_ORDER = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Ireland"
  ];
  /* Street-level facade thumbs per hit; Figma 1512:91345 building icon if missing. */
  var MATCH_THUMB_FALLBACK = "assets/cand/match-fallback.png";

  function matchTone(score) {
    if (score >= 85) return "positive";
    if (score >= 70) return "intermediate";
    return "negative";
  }

  function makeHit(id, companyId, name, addr, reg, country, city, region, score, thumb) {
    return {
      id: id,
      companyId: companyId || null,
      name: name,
      addr: addr,
      reg: reg,
      country: country,
      city: city,
      region: region,
      match: score,
      tone: matchTone(score),
      thumb: thumb || MATCH_THUMB_FALLBACK
    };
  }

  var MATCH_HITS = [
    makeHit("hit-austin", "capital", "Meridian Apex LLC", "800 Market St, Austin, US", "Reg. TX-462913", "United States", "Austin", "Texas", 94, "assets/cand/match-austin.jpg"),
    makeHit("hit-nyc", "capital", "Meridian Capital LLC", "200 Vesey St, New York, US", "Reg. NY-4417762", "United States", "New York", "New York", 91, "assets/cand/match-nyc.jpg"),
    makeHit("hit-chicago", null, "Meridian Partners Inc.", "233 S Wacker Dr, Chicago, US", "Reg. IL-880214", "United States", "Chicago", "Illinois", 88, "assets/cand/match-chicago.jpg"),
    makeHit("hit-seattle", null, "Meridian Holdings LLC", "1201 2nd Ave, Seattle, US", "Reg. WA-551902", "United States", "Seattle", "Washington", 76, "assets/cand/match-seattle.jpg"),
    makeHit("hit-miami", null, "Meridian Group LLC", "100 SE 2nd St, Miami, US", "Reg. FL-339441", "United States", "Miami", "Florida", 71, "assets/cand/match-miami.jpg"),
    makeHit("hit-vancouver", null, "Meridian North Inc.", "555 Burrard St, Vancouver, CA", "Reg. BC-771204", "Canada", "Vancouver", "British Columbia", 68, "assets/cand/match-vancouver.jpg"),
    makeHit("hit-toronto", "trade", "Meridian Apex Co.", "22 King Rd, Toronto, CA", "Reg. ON-462913", "Canada", "Toronto", "Ontario", 62, "assets/cand/match-toronto.jpg"),
    makeHit("hit-montreal", null, "Meridian Bay Ltd.", "1250 René-Lévesque, Montréal, CA", "Reg. QC-229088", "Canada", "Montréal", "Quebec", 55, "assets/cand/match-montreal.jpg"),
    makeHit("hit-london", "apex", "Meridian Apex Consulting Ltd.", "1 King Street, London, GB", "Reg. 11876542", "United Kingdom", "London", "England", 85, "assets/cand/match-london.jpg"),
    makeHit("hit-canary", "trade", "Meridian Trade Holdings Ltd.", "25 Bank Street, London, GB", "Reg. 11204887", "United Kingdom", "London", "England", 79, "assets/cand/match-canary.jpg"),
    makeHit("hit-sydney", null, "Meridian Pacific Pty Ltd", "1 Macquarie Pl, Sydney, AU", "Reg. ACN-604881", "Australia", "Sydney", "New South Wales", 73, "assets/cand/match-sydney.jpg"),
    makeHit("hit-dublin", "apex", "Meridian Apex LTD", "14 Harbour St, Dublin, IE", "Reg. 462913", "Ireland", "Dublin", "Leinster", 81, "assets/cand/match-dublin.jpg")
  ].sort(function (a, b) {
    return b.match - a.match;
  });

  var MATCH_FACETS = MATCH_COUNTRY_ORDER.map(function (country) {
    var n = MATCH_HITS.filter(function (h) {
      return h.country === country;
    }).length;
    return { id: "cc:" + country, label: country, n: n, country: country };
  }).filter(function (f) {
    return f.n > 0;
  });
  var MATCH_TOTAL = MATCH_HITS.length;

  var MATCH_INTRO =
    "“Meridian” matches multiple unrelated businesses, so I need to resolve the legal entity before running the KYB check; otherwise ownership, registration, and sanctions results could be attached to the wrong company.";

  /* Figma 1512:91348 — ready-state follow-ups. */
  var READY_SUGGESTIONS = [
    { q: "Show me the 3 connections" },
    { q: "Why wouldn't you onboard it?" },
    { q: "What's in the verification report?" }
  ];

  var convo = {
    entity: null,
    linksShown: false,
    pendingLinks: false,
    awaitingCountry: false,
    country: null,
    searchPurpose: "kyb"
  };

  var COUNTRY_MATCHERS = [
    { id: "United States", re: /(?:^|\b)(?:united states|u\.s\.a\.?|u\.s\.?|usa|america|us)(?=$|\b)/i },
    { id: "United Kingdom", re: /(?:^|\b)(?:united kingdom|u\.k\.?|great britain|britain|england|uk)(?=$|\b)/i },
    { id: "Canada", re: /\bcanada\b/i },
    { id: "Australia", re: /\baustralia\b/i },
    { id: "Ireland", re: /\bireland\b/i }
  ];

  function countryFromText(text) {
    var raw = String(text || "");
    for (var i = 0; i < COUNTRY_MATCHERS.length; i += 1) {
      if (COUNTRY_MATCHERS[i].re.test(raw)) return COUNTRY_MATCHERS[i].id;
    }
    return null;
  }

  function hitsInCountry(country) {
    return MATCH_HITS.filter(function (hit) {
      return hit.country === country;
    });
  }

  function askCountryPlan(again) {
    return {
      log: { title: "Resolve “Meridian”", detail: "Waiting for a country", hold: true },
      parts: [
        say(
          again
            ? "I didn't catch a country. Which country should I search?"
            : "Which country should I search?"
        )
      ],
      suggestions: []
    };
  }
  var candState = {
    root: null,
    list: [],
    filterIds: [],
    mode: "list",
    pending: null,
    selectedHit: null,
    purpose: "kyb",
    page: 0,
    useDotsLoad: false
  };

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function investigatePlan(company) {
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

  function meridianPlan(purpose, country) {
    return {
      log: { title: "Resolve “Meridian”", detail: "Waiting for you to confirm the entity", hold: true },
      parts: [
        say(
          "Here are the " +
            country +
            " matches. Filter by city or state, then pick the business."
        ),
        {
          t: "candidates",
          list: hitsInCountry(country),
          purpose: purpose || "kyb",
          country: country
        }
      ],
      suggestions: []
    };
  }

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

  function linksPlan(company) {
    var linked = company.id === "apex";
    return {
      log: {
        title: linked ? "Check linked transactions" : "Search transaction history",
        detail: linked ? LINK_CALLS[0].panel : "Searching your history",
        done: linked ? "Found 3 connections" : "No connected transactions"
      },
      parts: linked
        ? [
            say("Pulling the records that share a name, device, or account with " + company.name + "."),
            { t: "tools", label: "Looking for connected transactions", doneLabel: "3 connections found", calls: LINK_CALLS },
            { t: "table", lead: "Three transactions are connected to " + company.name + ". Open a row for the KYC, device, or bank result.", note: "Jane Doe's document passed. The device is linked to other identities, and the bank account name does not match " + company.name + "." }
          ]
        : [say("I didn't find transactions that share a person, device, or account with " + company.name + ".")],
      suggestions: linked ? LINK_SUGGESTIONS : company.suggestions
    };
  }

  function planReply(text) {
    if (convo.awaitingCountry) {
      var picked = countryFromText(text);
      if (!picked) return askCountryPlan(true);
      convo.awaitingCountry = false;
      convo.country = picked;
      return meridianPlan(convo.searchPurpose || "kyb", picked);
    }

    var company = namedCompany(text);
    var intent = intentOf(text);
    var inlineCountry = countryFromText(text);

    /* A new business name asks for country before any entity is locked. */
    if (company && (!convo.entity || company.id !== convo.entity.id) && intent !== "compare") {
      convo.entity = null;
      convo.linksShown = false;
      convo.searchPurpose = convo.pendingLinks || intent === "links" ? "links" : "kyb";
      convo.pendingLinks = convo.searchPurpose === "links";
      if (inlineCountry) {
        convo.country = inlineCountry;
        return meridianPlan(convo.searchPurpose, inlineCountry);
      }
      convo.awaitingCountry = true;
      return askCountryPlan(false);
    }

    if (intent === "links") {
      if (!convo.entity) {
        convo.pendingLinks = true;
        convo.searchPurpose = "links";
        if (inlineCountry) {
          convo.country = inlineCountry;
          return meridianPlan("links", inlineCountry);
        }
        convo.awaitingCountry = true;
        return askCountryPlan(false);
      }
      convo.linksShown = true;
      return linksPlan(convo.entity);
    }

    /* Ambiguous brand — ask country, then city/state filters (not a country chip row). */
    if (!convo.entity && /meridian/i.test(text) && !company) {
      convo.pendingLinks = intent === "links";
      convo.searchPurpose = intent === "links" ? "links" : "kyb";
      if (inlineCountry) {
        convo.country = inlineCountry;
        return meridianPlan(convo.searchPurpose, inlineCountry);
      }
      convo.awaitingCountry = true;
      return askCountryPlan(false);
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

  var ICON_SEARCH =
    '<img src="assets/icons/magnifying-glass.svg" alt="" width="12" height="12">';
  var ICON_DOC =
    '<img src="assets/icons/file-lines.svg" alt="" width="9" height="11">';
  /* Figma 1523:92474 — Awaiting input. */
  var ICON_AWAIT =
    '<img src="assets/icons/hand-pointer.svg" alt="" width="10" height="11">';

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
    setTruAIBoth({ state: "completed" });
    renderFeed();
  }

  function iconMarkup(kind, spinning) {
    if (spinning) {
      return '<span class="d4-act__icon"><img class="d4-spin" src="assets/icons/spinner.svg" alt="" width="16" height="16"></span>';
    }
    if (kind === "memo") {
      return '<span class="d4-act__icon d4-act__icon--badge"><img class="d4-act__report" src="assets/icons/memo.svg" alt="" width="12" height="16"></span>';
    }
    if (kind === "check") {
      return '<span class="d4-act__icon d4-act__icon--badge"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM2.5 8a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Zm7.9-1.4a.75.75 0 0 1 0 1.06l-2.7 2.7a.75.75 0 0 1-1.06 0l-1.3-1.3a.75.75 0 1 1 1.06-1.06l.77.77 2.17-2.17a.75.75 0 0 1 1.06 0Z"/></svg></span>';
    }
    if (kind === "user") {
      return '<span class="d4-act__icon d4-act__icon--badge"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 2.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM6.75 4.5a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0ZM4.1 12.2c.35-1.5 1.7-2.7 3.9-2.7s3.55 1.2 3.9 2.7c.12.5-.27 1.05-.8 1.05H4.9c-.53 0-.92-.55-.8-1.05Z"/></svg></span>';
    }
    return '<span class="d4-act__icon"><span class="d4-dot"></span></span>';
  }

  function chatHeaderTitle() {
    return titleEl ? String(titleEl.textContent || "").trim() : "";
  }

  function renderItems(items, live) {
    return items.map(function (item, index) {
      var last = index === items.length - 1;
      var line = last ? "" : '<span class="d4-act__line"></span>';
      var time = !live && item.time ? '<p class="d4-act__time">' + item.time + "</p>" : "";
      /* Live spinner: chat header title only — no dynamic subtext. */
      var title = live ? chatHeaderTitle() || item.title : item.title;
      var detailHtml =
        live || !item.detail ? "" : '<p class="d4-act__detail">' + item.detail + "</p>";
      return (
        '<div class="d4-act">' +
        '<div class="d4-act__rail">' +
        iconMarkup(item.icon, live) +
        line +
        "</div>" +
        '<div class="d4-act__body"><p class="d4-act__title">' +
        title +
        "</p>" +
        detailHtml +
        time +
        "</div></div>"
      );
    }).join("");
  }

  function chatIsAwaiting() {
    if (busy) return false;
    if (suggest && suggest.classList.contains("is-on")) return true;
    if (candState.root && candState.mode === "list") return true;
    if (!working) return false;
    var waitText = ((working.detail || "") + " " + (working.title || "")).toLowerCase();
    return /waiting|confirm|resolve|start a new|continue/.test(waitText);
  }

  function ensureAwaitingInput(opts) {
    opts = opts || {};
    beginWork({
      title: opts.title || "Awaiting input",
      detail: opts.detail || "Waiting for you to continue",
      hold: true,
      drop: opts.drop !== false
    });
  }

  /** Short TruAI label from what’s visible in chat (≤2 words). */
  function resolveBubbleStatus() {
    if (document.querySelector("[data-d4-dots-load], [data-d4-kyb-starting]")) {
      return { label: "Investigating", iconHtml: ICON_SEARCH };
    }
    var doc = reportDoc();
    var workText = working
      ? ((working.detail || "") + " " + (working.title || "")).toLowerCase()
      : "";
    if (doc && doc.classList.contains("is-loading")) {
      /* Dots path already mapped to Investigating; tools rows keep step labels. */
      if (!thread.querySelector(".d1-activity__toggle--current") || /report|generat|writing/.test(workText)) {
        return { label: "Generating report", iconHtml: ICON_DOC };
      }
    }
    if (chatIsAwaiting()) {
      return { label: "Awaiting input", iconHtml: ICON_AWAIT };
    }
    if (!working) {
      return { label: "", iconHtml: "", idle: true };
    }
    if (/waiting|confirm|resolve|start a new|continue/.test(workText)) {
      return { label: "Awaiting input", iconHtml: ICON_AWAIT };
    }
    if (/report|generat|writing/.test(workText)) {
      return { label: "Generating report", iconHtml: ICON_DOC };
    }
    if (/companies house|registry|dos|matching/.test(workText)) {
      return { label: "Browsing sources", iconHtml: ICON_SEARCH };
    }
    if (/capital|filing|filings|virtual office|address|vesey|canary/.test(workText)) {
      return { label: "Reviewing filings", iconHtml: ICON_SEARCH };
    }
    if (/ofac|sanction|screening/.test(workText)) {
      return { label: "Screening lists", iconHtml: ICON_SEARCH };
    }
    if (/transaction|device|account|people|connections|links|history|kyc|bank/.test(workText)) {
      return { label: "Scanning history", iconHtml: ICON_SEARCH };
    }
    if (/ownership|bvi|holding/.test(workText)) {
      return { label: "Reviewing ownership", iconHtml: ICON_SEARCH };
    }
    if (/investigate/.test(workText)) {
      return { label: "Investigating", iconHtml: ICON_SEARCH };
    }
    if (/answer|follow-up|checking/.test(workText)) {
      return { label: "Answering", iconHtml: ICON_SEARCH };
    }
    return { label: "Working", iconHtml: ICON_SEARCH };
  }

  function miniLabel() {
    var status = resolveBubbleStatus();
    if (status.idle) return "Idle";
    return status.label || "Idle";
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
    syncTruAIBubble();
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
    labs: "../../pages/unified-intelligence-home/labs.html?embed=1&shell=d4&v=7",
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

  function syncComposerHeight() {
    if (!input) return;
    var inChat = chatSlot && composer.parentElement === chatSlot;
    if (!inChat) {
      input.style.height = "";
      return;
    }
    /* Compact single-row chat composer (Figma 1512:90269) grows with typed lines. */
    input.style.height = "22px";
    input.style.height = Math.min(input.scrollHeight, 132) + "px";
  }

  function showChat() {
    hidePages();
    stage.setAttribute("data-d4-stage", "chat");
    if (app) app.setAttribute("data-d4-view", "chat");
    setNav("");
    homeView.hidden = true;
    chatView.hidden = false;
    if (chatSlot && composer.parentElement !== chatSlot) chatSlot.appendChild(composer);
    syncComposerHeight();
    syncPanelToggle();
    stick(true);
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
    setChatTitle("Chat");
    convo.awaitingCountry = false;
    syncComposerHeight();
  }

  var threadFollows = true;
  var threadScrolling = false;

  function threadAtBottom() {
    if (!thread) return true;
    return thread.scrollHeight - thread.scrollTop - thread.clientHeight <= 48;
  }

  function stick(force) {
    if (!thread) return;
    if (force) threadFollows = true;
    if (!threadFollows) return;
    threadScrolling = true;
    thread.scrollTop = thread.scrollHeight;
    requestAnimationFrame(function () {
      if (!thread || !threadFollows) {
        threadScrolling = false;
        return;
      }
      thread.scrollTop = thread.scrollHeight;
      requestAnimationFrame(function () {
        threadScrolling = false;
      });
    });
  }

  if (thread) {
    thread.addEventListener("scroll", function () {
      if (threadScrolling) return;
      threadFollows = threadAtBottom();
    }, { passive: true });
    thread.addEventListener("load", function (event) {
      if (event.target && event.target.tagName === "IMG") stick();
    }, true);
    if (window.ResizeObserver) {
      new ResizeObserver(function () {
        if (threadFollows) stick();
      }).observe(thread);
    }
  }

  function setChatTitle(label) {
    if (!titleEl || !label) return;
    titleEl.textContent = label;
    if (working) renderFeed();
  }

  /** Header title from prompt + plan context (Figma: “Verify Meridian Apex…”). */
  function updateChatTitle(text, plan) {
    if (!titleEl) return;
    plan = plan || { parts: [], log: {} };
    var linksPlanHit = plan.log && /linked|transaction history/i.test(plan.log.title || "");
    var cand = null;
    for (var i = 0; i < (plan.parts || []).length; i += 1) {
      if (plan.parts[i].t === "candidates") {
        cand = plan.parts[i];
        break;
      }
    }

    if (convo.entity) {
      setChatTitle(
        convo.linksShown || linksPlanHit
          ? "Linked transactions — " + convo.entity.short
          : "Verify " + convo.entity.name
      );
      return;
    }

    if (cand) {
      setChatTitle(cand.purpose === "links" ? "Search transaction history" : "Verify Meridian");
      return;
    }

    if (plan.log && plan.log.title === "Start a new verification") {
      setChatTitle("Start a new verification");
      return;
    }

    var company = namedCompany(text || "");
    var intent = intentOf(text || "");
    if (company) {
      setChatTitle(intent === "links" ? "Linked transactions — " + company.short : "Verify " + company.name);
      return;
    }
    if (/meridian/i.test(text || "")) {
      setChatTitle(intent === "links" || /transaction/i.test(text) ? "Search transaction history" : "Verify Meridian");
      return;
    }
    if (intent === "links" || /transaction history/i.test(text || "")) {
      setChatTitle("Search transaction history");
      return;
    }

    var cleaned = String(text || "").replace(/\s+/g, " ").trim();
    if (!cleaned) return;
    setChatTitle(cleaned.length > 52 ? cleaned.slice(0, 49) + "…" : cleaned);
  }

  function clone(name) {
    var tpl = document.querySelector('[data-d4-tpl="' + name + '"]');
    return tpl ? tpl.content.firstElementChild.cloneNode(true) : null;
  }

  function place(node) {
    /* Keep “Continue your investigation” at the end of the thread. */
    if (suggest && suggest.parentElement === thread) {
      thread.insertBefore(node, suggest);
    } else {
      thread.appendChild(node);
    }
    stick();
    return node;
  }

  function addUser(text) {
    var node = clone("user");
    if (!node) return;
    node.querySelector("p").textContent = text;
    place(node);
    stick(true);
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

  function playStartingVerification(company) {
    var name = (company && company.name) || "this business";
    var node = clone("typing");
    if (!node) return;
    var label = node.querySelector("[data-d1-thinking-label]");
    if (label) label.innerHTML = "Start verification for <strong>" + esc(name) + "</strong>";
    node.setAttribute("data-d4-kyb-starting", "");
    place(node);
  }

  function settleStartingVerification() {
    document.querySelectorAll("[data-d4-kyb-starting]").forEach(function (node) {
      var orb = node.querySelector(".d1-thinking__orb");
      if (orb) orb.remove();
      node.removeAttribute("data-d4-kyb-starting");
      node.removeAttribute("role");
      node.removeAttribute("aria-live");
    });
  }

  function prepareReadyThread() {
    /* Keep prior chat (user, AI, match row) for scrollback — only drop loaders. */
    thread.querySelectorAll(".d4-dots-load, .d1-thinking, [data-d4-kyb-starting]").forEach(function (el) {
      el.remove();
    });
  }

  function addReport(company) {
    reportCompany = company;
    settleStartingVerification();
    var hit = candState.selectedHit;
    prepareReadyThread();
    finishReportSkeleton();
    var node = clone("report");
    if (!node) return;
    node.querySelector("[data-d4-co]").textContent = company.name;
    var readyName = node.querySelector("[data-d4-ready-name]");
    var readyAddr = node.querySelector("[data-d4-ready-addr]");
    var readyReg = node.querySelector("[data-d4-ready-reg]");
    if (readyName) readyName.textContent = hit ? hit.name : company.name;
    if (readyAddr) readyAddr.textContent = hit ? hit.addr : company.addr;
    if (readyReg) readyReg.textContent = hit ? hit.reg : company.reg;
    node.querySelector("[data-d4-sum-a]").textContent = company.sumA;
    node.querySelector("[data-d4-sum-b]").textContent = company.sumB;
    place(node);
    if (!drawer || drawer.hidden) openDrawer("report");
    else {
      syncReportHead();
      syncReadyCard();
    }
    if (suggest && suggest.classList.contains("is-on")) mountSuggestionsHost();
    stick();
  }

  function addTable(part) {
    var node = clone("table");
    if (!node) return;
    node.querySelector("[data-d4-table-lead]").textContent = part.lead || "";
    node.querySelector("[data-d4-table-note]").textContent = part.note || "";
    place(node);
  }

  function companyById(id) {
    for (var i = 0; i < MERIDIANS.length; i += 1) {
      if (MERIDIANS[i].id === id) return MERIDIANS[i];
    }
    return null;
  }

  function hitById(id) {
    for (var i = 0; i < MATCH_HITS.length; i += 1) {
      if (MATCH_HITS[i].id === id) return MATCH_HITS[i];
    }
    return null;
  }

  function mockCompanyFromHit(hit) {
    var short = hit.name.replace(
      /\s+(LLC|LTD|Ltd\.?|Inc\.?|Co\.?|Pty Ltd)\.?$/i,
      ""
    );
    var strong = hit.match >= 85;
    return {
      id: hit.id,
      short: short || hit.name,
      name: hit.name,
      country: hit.country,
      status: "Active",
      reg: hit.reg,
      addr: hit.addr,
      brief: hit.match + "% name match · " + hit.country,
      lead:
        hit.name +
        " is a registry match in " +
        hit.country +
        " — " +
        hit.reg +
        ", filed at " +
        hit.addr +
        ".",
      ask: "I'll run the full KYB check on that entity now.",
      sumA: hit.name + " is an active " + hit.country + " company.",
      sumB: strong
        ? "Nothing in your other transactions ties this entity to Daniel Reyes, the shared device, or account ••4417."
        : "The name match is only moderate — confirm the registration number before you treat this as the same business.",
      tag: strong ? "Verified" : "Needs review",
      tone: strong ? "positive" : "review",
      done: strong ? "Verified — registry match" : "Needs review — confirm entity",
      calls: [
        {
          label: "Matching against the " + hit.country + " registry",
          done: "Matched on " + hit.reg,
          panel: "Matching " + hit.reg,
          ms: 1300,
          detail: [hit.reg + " — status active", "Filed at " + hit.addr]
        },
        {
          label: "Confirming the filed address",
          done: "Filed address matches",
          panel: hit.addr,
          ms: 1200,
          detail: [hit.addr]
        },
        {
          label: "Scanning your transaction history for links",
          done: "No connected transactions",
          panel: "No link to Daniel Reyes or account ••4417",
          ms: 1400,
          detail: ["No connection to Daniel Reyes, device 235252021, or account ••4417"]
        }
      ],
      facts: {
        director: "The local filing lists its own officers. None of them overlap with Meridian Apex Consulting Ltd. in the demo dataset.",
        onboard: strong
          ? "This record looks clean in the demo dataset. Standard documentation would be enough."
          : "Before onboarding, confirm the registration number and request proof that this is the entity on the application.",
        address: hit.addr + " — the filed address on this match.",
        sanctions: "No officer returned a sanctions match."
      },
      suggestions: [
        { q: "How is this different from Meridian Apex?" },
        { q: "Who is the listed director?" },
        { q: "What should I request before onboarding?" }
      ]
    };
  }

  function companyFromHit(hit) {
    if (!hit) return null;
    var base = hit.companyId ? companyById(hit.companyId) : null;
    if (base) {
      return Object.assign({}, base, {
        name: hit.name,
        country: hit.country,
        reg: hit.reg,
        addr: hit.addr,
        short: hit.name.replace(/\s+(LLC|LTD|Ltd\.?|Inc\.?|Co\.?|Pty Ltd)\.?$/i, "") || base.short
      });
    }
    return mockCompanyFromHit(hit);
  }

  function hitMatchesPlace(hit, fid) {
    if (fid.indexOf("city:") === 0) return hit.city === fid.slice(5);
    if (fid.indexOf("region:") === 0) return hit.region === fid.slice(7);
    return false;
  }

  function facetsFromHits(hits) {
    var cityN = {};
    var regionN = {};
    hits.forEach(function (hit) {
      if (hit.city) cityN[hit.city] = (cityN[hit.city] || 0) + 1;
      if (hit.region) regionN[hit.region] = (regionN[hit.region] || 0) + 1;
    });
    var facets = [];
    Object.keys(regionN).sort().forEach(function (region) {
      facets.push({
        id: "region:" + region,
        label: cityN[region] ? region + " (state)" : region,
        n: regionN[region]
      });
    });
    Object.keys(cityN).sort().forEach(function (city) {
      facets.push({
        id: "city:" + city,
        label: city,
        n: cityN[city]
      });
    });
    return facets;
  }

  function visibleCandidates() {
    var list = candState.list.slice();
    if (!candState.filterIds.length) return list;
    return list.filter(function (hit) {
      return candState.filterIds.some(function (fid) {
        return hitMatchesPlace(hit, fid);
      });
    });
  }

  function matchRowHtml(hit, opts) {
    opts = opts || {};
    var tag = opts.staticRow ? "div" : "button";
    var open =
      "<" +
      tag +
      (opts.staticRow
        ? ' class="d4-match__row d4-match__row--static"'
        : ' type="button" class="d4-match__row" data-d4-cand="' + esc(hit.id) + '"') +
      ">";
    return (
      open +
      '<img class="d4-match__thumb" src="' + esc(hit.thumb) + '" alt="" width="54" height="54"' +
      ' onerror="this.onerror=null;this.src=\'' + MATCH_THUMB_FALLBACK + "'\">" +
      '<span class="d4-match__meta">' +
      '<span class="d4-match__name">' + esc(hit.name) + "</span>" +
      '<span class="d4-match__addr">' + esc(hit.addr) + "</span>" +
      '<span class="d4-match__reg">' + esc(hit.reg) + "</span>" +
      "</span>" +
      '<span class="d4-match__badge d4-match__badge--' + esc(hit.tone) + '">' +
      esc(String(hit.match)) + "% match</span>" +
      "</" + tag + ">"
    );
  }

  function paintCandidateList() {
    if (!candState.root) return;
    candState.mode = "list";
    candState.pending = null;
    candState.selectedHit = null;
    candState.useDotsLoad = false;
    var list = visibleCandidates();
    var pageCount = Math.max(1, Math.ceil(list.length / MATCH_PAGE_SIZE));
    if (candState.page >= pageCount) candState.page = pageCount - 1;
    if (candState.page < 0) candState.page = 0;
    var start = candState.page * MATCH_PAGE_SIZE;
    var pageRows = list.slice(start, start + MATCH_PAGE_SIZE);
    var rangeStart = list.length ? start + 1 : 0;
    var rangeEnd = start + pageRows.length;
    var totalLabel = candState.filterIds.length ? list.length : candState.list.length;
    var facets = candState.facets || [];

    var chips = facets.map(function (f) {
      var on = candState.filterIds.indexOf(f.id) !== -1;
      return (
        '<button type="button" class="d4-match__chip' + (on ? " is-on" : "") +
        '" data-d4-cand-filter="' + esc(f.id) + '">' +
        '<span class="d4-match__chip-label">' + esc(f.label) + "</span>" +
        '<span class="d4-match__chip-n">' + f.n + "</span>" +
        "</button>"
      );
    }).join("");

    var rows =
      pageRows.length > 0
        ? pageRows.map(function (hit) {
            return matchRowHtml(hit);
          }).join("")
        : '<p class="d4-match__empty">No matches in this city or state. Clear a filter to see results again.</p>';

    var prevDisabled = candState.page <= 0;
    var nextDisabled = candState.page >= pageCount - 1;

    candState.root.innerHTML =
      '<div class="d4-match">' +
      '<div class="d4-match__orb" aria-hidden="true"></div>' +
      '<div class="d4-match__card">' +
      '<p class="d4-match__title">Which “Meridian” should I investigate?</p>' +
      '<div class="d4-match__chips">' + chips + "</div>" +
      '<div class="d4-match__list">' + rows + "</div>" +
      '<div class="d4-match__foot">' +
      '<p class="d4-match__range">' + rangeStart + "-" + rangeEnd + " of " + totalLabel + "</p>" +
      '<div class="d4-match__pager">' +
      '<button type="button" class="d4-match__page" data-d4-cand-page="-1"' +
      (prevDisabled ? " disabled" : "") +
      ' aria-label="Previous page">' +
      '<img src="assets/icons/chevron-left.svg" alt="" width="16" height="16">' +
      "</button>" +
      '<button type="button" class="d4-match__page d4-match__page--next" data-d4-cand-page="1"' +
      (nextDisabled ? " disabled" : "") +
      ' aria-label="Next page">' +
      '<img src="assets/icons/chevron-left.svg" alt="" width="16" height="16">' +
      "</button>" +
      "</div></div></div></div>";
    stick();
  }

  /* Figma 1479:84540 — selected business: title + Change + single row. */
  function paintSelectedCandidate(hit) {
    if (!candState.root || !hit) return;
    candState.mode = "selected";
    candState.selectedHit = hit;
    candState.pending = companyFromHit(hit);
    candState.root.innerHTML =
      '<div class="d4-match d4-match--selected">' +
      '<div class="d4-match__card">' +
      '<div class="d4-match__head">' +
      '<p class="d4-match__title">Which “Meridian” should I investigate?</p>' +
      '<button type="button" class="d4-match__change" data-d4-cand-change>Change</button>' +
      "</div>" +
      '<div class="d4-match__list">' + matchRowHtml(hit, { staticRow: true }) + "</div>" +
      "</div></div>";
    stick();
  }

  function clearAfterCandidates() {
    if (!candState.root) return;
    var el = candState.root.nextElementSibling;
    while (el) {
      var next = el.nextElementSibling;
      if (
        el.classList.contains("d1-turn") ||
        el.classList.contains("d4-dots-load") ||
        el.classList.contains("d1-thinking") ||
        el.classList.contains("d1-block") ||
        el.hasAttribute("data-d4-dots-load")
      ) {
        el.remove();
        el = next;
        continue;
      }
      break;
    }
  }

  function changeSelectedCandidate() {
    runId += 1;
    setBusy(false);
    clearAfterCandidates();
    if (working && working.title && working.title.indexOf("Investigate") === 0) {
      archiveWorking();
    }
    var doc = reportDoc();
    if (doc) {
      doc.classList.remove("is-loading");
      doc.querySelectorAll("[data-d4-reveal]").forEach(function (el) {
        el.classList.remove("is-in");
      });
    }
    closeDrawer();
    paintCandidateList();
    ensureAwaitingInput({
      title: "Resolve “Meridian”",
      detail: "Waiting for you to confirm the entity",
      drop: false
    });
  }

  function addCandidates(part) {
    var wrap = document.createElement("div");
    wrap.className = "d1-enter d4-cand-panel";
    place(wrap);
    candState.root = wrap;
    candState.list = (part.list || MATCH_HITS).slice();
    candState.facets = facetsFromHits(candState.list);
    candState.filterIds = [];
    candState.country = part.country || "";
    candState.purpose = part.purpose || "kyb";
    candState.pending = null;
    candState.selectedHit = null;
    candState.useDotsLoad = false;
    candState.mode = "list";
    candState.page = 0;
    paintCandidateList();
  }

  async function playPlan(plan, id) {
    for (var i = 0; i < plan.parts.length; i += 1) {
      var part = plan.parts[i];
      if (part.t === "text") {
        /* Match-select flow: user bubble → dots loader → report (Figma 1479:84540). */
        if (candState.useDotsLoad) continue;
        /* Starting-verification row already carries the orb — don't stack another. */
        var ok;
        if (document.querySelector("[data-d4-kyb-starting]")) {
          ok = await wait(reduced ? 40 : 900, id);
        } else {
          ok = await showTyping(id);
        }
        if (!ok) return false;
        addText(part);
      } else if (part.t === "tools") {
        var finished = candState.useDotsLoad
          ? await playDotsLoad(part, id)
          : await playTools(part, id);
        if (!finished) return false;
      } else if (part.t === "report") {
        beginWork({
          title: "Generate verification report",
          detail: "Writing the verification report",
          icon: "memo"
        });
        addReport(part.company);
        finishWork("Created for " + part.company.short, "memo");
        plan.log.settled = true;
      } else if (part.t === "table") {
        addTable(part);
      } else if (part.t === "candidates") {
        var searched = await showTyping(id, reduced ? 40 : 1800);
        if (!searched) return false;
        addCandidates(part);
      }
    }
    return true;
  }

  async function selectCandidate(hit) {
    var company = companyFromHit(hit);
    if (!company || busy || !hit) return;
    paintSelectedCandidate(hit);
    addUser(company.name);
    await runConfirmedCompany(company, { fromMatch: true });
  }

  async function runConfirmedCompany(company, opts) {
    if (!company || busy) return;
    opts = opts || {};
    setSuggestions([]);
    if (working && working.title.indexOf("Resolve") === 0) {
      finishWork("Confirmed with you");
    }
    var fromMatch = !!opts.fromMatch && !!candState.root;
    if (!fromMatch && candState.root) {
      candState.root.remove();
      candState.root = null;
      candState.pending = null;
      candState.selectedHit = null;
      candState.mode = "list";
      candState.useDotsLoad = false;
    }
    convo.entity = company;
    var wantLinks = convo.pendingLinks || candState.purpose === "links";
    convo.pendingLinks = false;
    var plan;
    if (wantLinks) {
      convo.linksShown = true;
      plan = linksPlan(company);
    } else {
      convo.linksShown = false;
      plan = investigatePlan(company);
    }
    setChatTitle(wantLinks ? "Linked transactions — " + company.short : "Verify " + company.name);
    var id = ++runId;
    setBusy(true);
    setTruAIBoth({ state: "thinking" });
    candState.useDotsLoad = fromMatch;
    if (!fromMatch) playStartingVerification(company);
    beginWork(plan.log);
    try {
      var ok = await playPlan(plan, id);
      if (!ok || id !== runId) return;
      if (!plan.log.hold && !plan.log.settled) finishWork(plan.log.done);
      setSuggestions(fromMatch ? READY_SUGGESTIONS : plan.suggestions);
    } finally {
      settleStartingVerification();
      document.querySelectorAll("[data-d4-dots-load]").forEach(function (node) {
        node.remove();
      });
      candState.useDotsLoad = false;
      if (id === runId) {
        setBusy(false);
        syncTruAIBubble();
      }
    }
  }

  async function showTyping(id, ms, labelText) {
    var node = clone("typing");
    if (!node) return true;
    var label = node.querySelector("[data-d1-thinking-label]");
    if (label && labelText) label.textContent = labelText;
    place(node);
    /* Thinking orb needs ~1.8s+ to read; keep short interstitial beats. */
    var duration = ms || 800;
    if (!reduced && duration >= 600) duration = Math.max(duration, 1800);
    var ok = await wait(reduced ? 40 : duration, id);
    node.remove();
    return ok;
  }

  /* Soft organic dots grid (replaces progress bar after match select). */
  function dotsLoadHtml() {
    var cols = 14;
    var rows = 10;
    var cx = (cols - 1) / 2;
    var cy = (rows - 1) / 2;
    var dots = "";
    var r;
    var c;
    for (r = 0; r < rows; r += 1) {
      for (c = 0; c < cols; c += 1) {
        /* Soft ellipse mask — denser center, feathered edges. */
        var nx = (c - cx) / (cx + 0.01);
        var ny = (r - cy) / (cy + 0.01);
        var dist = Math.sqrt(nx * nx * 0.72 + ny * ny);
        if (dist > 1.05) continue;
        var edge = Math.max(0, Math.min(1, (1.05 - dist) / 0.45));
        var delay = (r * 0.7 + c) * 0.04 + dist * 0.12;
        dots +=
          '<span class="d4-dots-load__dot" style="grid-column:' +
          (c + 1) +
          ";grid-row:" +
          (r + 1) +
          ";--edge:" +
          edge.toFixed(3) +
          ";animation-delay:-" +
          delay.toFixed(2) +
          's"></span>';
      }
    }
    return (
      '<div class="d4-match__orb" aria-hidden="true"></div>' +
      '<div class="d4-dots-load__stage" aria-hidden="true">' +
      '<div class="d4-dots-load__grid" style="--cols:' +
      cols +
      ";--rows:" +
      rows +
      '">' +
      dots +
      "</div></div>"
    );
  }

  async function playDotsLoad(part, id) {
    settleStartingVerification();
    document.querySelectorAll("[data-d4-dots-load]").forEach(function (n) {
      n.remove();
    });
    var node = document.createElement("div");
    node.className = "d4-dots-load d1-enter";
    node.setAttribute("role", "status");
    node.setAttribute("aria-live", "polite");
    node.setAttribute("aria-label", part.label || "Investigating");
    node.setAttribute("data-d4-dots-load", "");
    node.innerHTML = dotsLoadHtml();
    place(node);

    if (convo.entity) startReportSkeleton(convo.entity);
    syncTruAIBubble();

    var calls = part.calls || [];
    var totalMs = 0;
    calls.forEach(function (c) {
      totalMs += c.ms || 1100;
    });
    var revealRun = revealReportDuring(totalMs, id);

    for (var i = 0; i < calls.length; i += 1) {
      noteWork(calls[i].panel || calls[i].label);
      var ok = await wait(reduced ? 40 : calls[i].ms || 1100, id);
      if (!ok) {
        node.remove();
        return false;
      }
    }
    var revealed = await revealRun;
    if (!revealed) {
      node.remove();
      return false;
    }
    finishReportSkeleton();
    node.remove();
    return true;
  }

  async function playTools(part, id) {
    settleStartingVerification();
    if (convo.entity && part.label === "Investigating") {
      startReportSkeleton(convo.entity);
    }
    var node = clone("tools");
    if (!node) return false;
    var label = node.querySelector("[data-d4-tools-label]");
    var pct = node.querySelector(".d1-progress__pct");
    var fill = node.querySelector(".d1-progress__fill");
    var check = node.querySelector("[data-d4-tools-check]");
    var steps = node.querySelector("[data-d4-steps]");
    label.textContent = part.label;
    place(node);

    var doc = reportDoc();
    var revealFields = doc
      ? Array.prototype.slice.call(doc.querySelectorAll("[data-d4-reveal]"))
      : [];
    var revealAt = 0;
    function revealNext() {
      if (revealAt < revealFields.length) {
        revealFields[revealAt].classList.add("is-in");
        revealAt += 1;
      }
    }

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
      revealNext();

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
        revealNext();
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

    while (revealAt < revealFields.length) {
      revealNext();
      var more = await wait(reduced ? 20 : 300, id);
      if (!more) return false;
    }
    if (convo.entity && part.label === "Investigating") finishReportSkeleton();

    label.textContent = part.doneLabel || "Investigation complete";
    fill.classList.add("d1-progress__fill--done");
    if (check) check.hidden = false;
    stick();
    return true;
  }

  function mountSuggestionsHost() {
    if (!suggest || !thread) return;
    /* Figma 1523:92602 — suggestions sit inside the ready column (32px gap). */
    var ready = thread.querySelector(".d4-report-ready");
    var host = ready || thread;
    if (suggest.parentElement !== host) host.appendChild(suggest);
  }

  function setSuggestions(items, headingText) {
    if (!suggest) return;
    suggest.innerHTML = "";
    if (!items || !items.length) {
      suggest.classList.remove("is-on");
      if (suggest.parentElement !== thread) thread.appendChild(suggest);
      syncTruAIBubble();
      return;
    }
    var heading = document.createElement("h2");
    heading.textContent = headingText || "Continue your investigation";
    suggest.appendChild(heading);
    items.forEach(function (item) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "d1-suggest-row";
      var label = document.createElement("span");
      label.textContent = item.q;
      btn.appendChild(label);
      var iconWrap = document.createElement("span");
      iconWrap.className = "d1-suggest-row__icon";
      iconWrap.setAttribute("aria-hidden", "true");
      var icon = document.createElement("img");
      icon.src = "assets/icons/arrow-right.svg";
      icon.alt = "";
      icon.width = 16;
      icon.height = 16;
      iconWrap.appendChild(icon);
      btn.appendChild(iconWrap);
      suggest.appendChild(btn);
    });
    suggest.classList.add("is-on");
    mountSuggestionsHost();
    stick();
    /* Report is done — don’t start another Working now spinner. */
    if (thread && thread.querySelector(".d4-report-ready")) {
      if (working) {
        working = null;
        renderFeed();
      } else {
        syncTruAIBubble();
      }
      return;
    }
    ensureAwaitingInput({
      detail: "Waiting for you to continue",
      drop: true
    });
  }

  async function respond(text) {
    var plan = planReply(text);
    updateChatTitle(text, plan);
    var id = ++runId;
    setBusy(true);
    setSuggestions([]);
    setTruAIBoth({ state: "thinking" });
    if (working && working.title.indexOf("Resolve") === 0 && plan.log.title.indexOf("Investigate") === 0) {
      finishWork("Confirmed with you");
    }
    if (working && working.title.indexOf("Resolve") === 0 && plan.log.title.indexOf("Check linked") === 0) {
      finishWork("Confirmed with you");
    }
    if (working && working.title.indexOf("Resolve") === 0 && plan.log.title.indexOf("Search transaction") === 0) {
      finishWork("Confirmed with you");
    }
    beginWork(plan.log);
    try {
      var ok = await playPlan(plan, id);
      if (!ok || id !== runId) return;
      if (!plan.log.hold && !plan.log.settled) finishWork(plan.log.done);
      setSuggestions(plan.suggestions, plan.suggestHeading);
    } finally {
      if (id === runId) {
        setBusy(false);
        syncTruAIBubble();
      }
    }
  }

  function submitText(text) {
    var value = (text || "").trim();
    if (!value || busy) return;
    showChat();
    addUser(value);
    input.value = "";
    syncComposerHeight();
    send.disabled = true;
    respond(value);
  }

  /* ----------------------------------------------------------------- chrome */

  var mini = document.querySelector("[data-d4-mini]");
  var truaiBubbleHost = document.querySelector("[data-d4-truai-bubble]");
  var truaiPanelHost = document.querySelector("[data-d4-panel-truai]");
  var truaiBubble = null;
  var truaiPanel = null;
  var bubbleThinkTimer = null;

  /** Map chat phase → TruAI acting props (icon + ≤2-word label). */
  function bubbleActingFromMini() {
    var status = resolveBubbleStatus();
    if (status.idle || !status.label) {
      return { actingLabel: "", iconHtml: "", idle: true };
    }
    return {
      actingLabel: status.label,
      actingIconHtml: status.iconHtml,
      idle: false
    };
  }

  function setTruAIBoth(props) {
    if (truaiBubble) truaiBubble.set(props);
    if (truaiPanel) truaiPanel.set(props);
  }

  function truaiState() {
    if (truaiBubble) return truaiBubble.getState();
    if (truaiPanel) return truaiPanel.getState();
    return "idle";
  }

  function syncTruAIBubble() {
    if (!truaiBubble && !truaiPanel) return;
    var acting = bubbleActingFromMini();
    /* Don’t clobber the completed hold unless chat already needs a new status. */
    if (truaiState() === "completed" && acting.idle) return;
    if (acting.idle) {
      if (bubbleThinkTimer) {
        clearTimeout(bubbleThinkTimer);
        bubbleThinkTimer = null;
      }
      setTruAIBoth({ state: "idle", actingLabel: "", actingIconHtml: "" });
      return;
    }
    /* Keep a short Thinking… beat before swapping to the acting label. */
    if (truaiState() === "thinking") {
      if (!bubbleThinkTimer) {
        bubbleThinkTimer = setTimeout(function () {
          bubbleThinkTimer = null;
          if (truaiState() === "completed") return;
          var next = bubbleActingFromMini();
          if (next.idle) {
            setTruAIBoth({ state: "idle", actingLabel: "", actingIconHtml: "" });
            return;
          }
          setTruAIBoth({
            state: "acting",
            actingLabel: next.actingLabel,
            actingIconHtml: next.actingIconHtml
          });
        }, reduced ? 40 : 550);
      }
      return;
    }
    setTruAIBoth({
      state: "acting",
      actingLabel: acting.actingLabel,
      actingIconHtml: acting.actingIconHtml
    });
  }

  if (window.TruAIBubble) {
    if (truaiBubbleHost) {
      truaiBubble = window.TruAIBubble.mount(truaiBubbleHost, {
        state: "idle",
        onCompletedEnd: function () {
          syncTruAIBubble();
        }
      });
    }
    if (truaiPanelHost && window.TruAIBubble.mountPanel) {
      truaiPanel = window.TruAIBubble.mountPanel(truaiPanelHost, {
        state: "idle",
        onCompletedEnd: function () {
          syncTruAIBubble();
        }
      });
    }
  }

  function syncPanelToggle() {
    var open = !panel.hidden;
    if (mini) mini.hidden = open;
    positionMini();
    document.querySelectorAll("[data-d4-panel-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", open ? "true" : "false");
    });
    /* Mini was [hidden] while panel open — remasure pill text after it returns. */
    if (!open && truaiBubble && typeof truaiBubble.refresh === "function") {
      requestAnimationFrame(function () {
        if (mini && !mini.hidden) truaiBubble.refresh();
      });
    }
  }

  function setPanel(open) {
    /* Report and the TruAI panel never share the stage — opening one closes the other. */
    if (open && drawer && !drawer.hidden) closeDrawer();
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
    syncComposerHeight();
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
    setChatTitle("Start a new verification");
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
    var pageBtn = event.target.closest("[data-d4-cand-page]");
    if (pageBtn && candState.root && candState.root.contains(pageBtn) && !pageBtn.disabled) {
      candState.page += Number(pageBtn.getAttribute("data-d4-cand-page")) || 0;
      paintCandidateList();
      return;
    }
    var filterBtn = event.target.closest("[data-d4-cand-filter]");
    if (filterBtn && candState.root && candState.root.contains(filterBtn)) {
      var fid = filterBtn.getAttribute("data-d4-cand-filter");
      /* Single country chip — toggle on/off. */
      candState.filterIds = candState.filterIds[0] === fid ? [] : [fid];
      candState.page = 0;
      paintCandidateList();
      return;
    }
    var changeBtn = event.target.closest("[data-d4-cand-change]");
    if (changeBtn && candState.root && candState.root.contains(changeBtn)) {
      changeSelectedCandidate();
      return;
    }
    var candBtn = event.target.closest("[data-d4-cand]");
    if (candBtn && candState.root && candState.root.contains(candBtn)) {
      selectCandidate(hitById(candBtn.getAttribute("data-d4-cand")));
      return;
    }
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
    if (event.target.closest(".d1-alert__view, [data-d4-alert-view]")) {
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
    /* Figma 1512:91348 ready report uses Verified on the drawer. */
    var readyView = !!thread.querySelector(".d4-report-ready");
    var positive = readyView || company.tone === "positive";
    if (docTag) {
      docTag.className = "d1-tag d1-tag--icon d1-tag--" + (positive ? "positive" : "review");
    }
    if (docTagIcon) {
      docTagIcon.src = positive ? "assets/icons/circle-check.svg" : "assets/icons/warning-amber.svg";
    }
    if (docTagLabel) docTagLabel.textContent = positive ? "Verified" : company.tag;
    var countryEl = document.querySelector("[data-d4-doc-country]");
    if (countryEl) countryEl.textContent = company.country || "United Kingdom";
  }

  function reportDoc() {
    return document.querySelector('[data-d4-drawer-view="report"]');
  }

  function startReportSkeleton(company) {
    reportCompany = company;
    var doc = reportDoc();
    if (doc) {
      doc.classList.add("is-loading");
      doc.querySelectorAll("[data-d4-reveal]").forEach(function (el) {
        el.classList.remove("is-in");
      });
    }
    openDrawer("report");
    if (drawer && !reduced) {
      drawer.classList.remove("is-revealing");
      void drawer.offsetWidth;
      drawer.classList.add("is-revealing");
      window.setTimeout(function () {
        if (drawer) drawer.classList.remove("is-revealing");
      }, 500);
    }
    syncTruAIBubble();
  }

  function finishReportSkeleton() {
    var doc = reportDoc();
    if (!doc) return;
    doc.querySelectorAll("[data-d4-reveal]").forEach(function (el) {
      el.classList.add("is-in");
    });
    /* Let the last crossfades settle, then show tag/export. */
    window.setTimeout(
      function () {
        doc.classList.remove("is-loading");
        syncReportHead();
        syncTruAIBubble();
      },
      reduced ? 0 : 320
    );
  }

  async function revealReportDuring(totalMs, id) {
    var doc = reportDoc();
    if (!doc) return true;
    var fields = Array.prototype.slice.call(doc.querySelectorAll("[data-d4-reveal]"));
    if (!fields.length) return true;
    /* Balanced pace: readable crossfades without dragging. */
    var duration = Math.max(6500, Math.floor((totalMs || 2400) * 1.55));
    var step = Math.max(380, Math.floor(duration / fields.length));
    var i;
    for (i = 0; i < fields.length; i += 1) {
      /* Double rAF so the browser paints the skeleton before crossfade. */
      await new Promise(function (resolve) {
        requestAnimationFrame(function () {
          requestAnimationFrame(resolve);
        });
      });
      fields[i].classList.add("is-in");
      var ok = await wait(reduced ? 20 : step, id);
      if (!ok) return false;
    }
    /* Hold so the final field’s fade can finish before chrome appears. */
    return wait(reduced ? 0 : 360, id);
  }

  function showDrawerView(id) {
    document.querySelectorAll("[data-d4-drawer-view]").forEach(function (view) {
      view.hidden = view.getAttribute("data-d4-drawer-view") !== id;
    });
    if (id === "report") {
      setDocTab("overview");
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

  function reportDrawerOpen() {
    return !!(drawer && !drawer.hidden && drawerMode === "report");
  }

  function syncReadyCard() {
    var viewing = reportDrawerOpen();
    thread.querySelectorAll(".d4-report-ready").forEach(function (card) {
      var entity = card.querySelector(".d4-ready__entity");
      var btn = card.querySelector("[data-d4-alert-view]");
      if (entity) entity.classList.toggle("is-viewing", viewing);
      if (btn) {
        btn.textContent = viewing ? "Viewing" : "View";
        btn.setAttribute("aria-pressed", viewing ? "true" : "false");
      }
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
    /* Collapsed bubble while the report is open. */
    setPanel(false);
    syncReadyCard();
    window.dispatchEvent(new Event("resize"));
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
    syncReadyCard();
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

  function setDocTab(id) {
    document.querySelectorAll("[data-d4-doc-tab]").forEach(function (tab) {
      var on = tab.getAttribute("data-d4-doc-tab") === id;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.classList.toggle("tds-tab-item--active", on);
    });
    var overview = document.querySelector("[data-d4-doc-panel='overview']");
    var empty = document.querySelector("[data-d4-doc-panel='empty']");
    var showOverview = id === "overview";
    if (overview) overview.hidden = !showOverview;
    if (empty) empty.hidden = showOverview;
  }

  document.querySelectorAll("[data-d4-doc-tab]").forEach(function (tab) {
    tab.addEventListener("click", function () {
      setDocTab(tab.getAttribute("data-d4-doc-tab"));
    });
  });

  function initDocTabsScroll() {
    document.querySelectorAll("[data-d4-doc-tabs], [data-tabs-scrollable]").forEach(function (tabs) {
      var list = tabs.querySelector(".tds-tabs__list");
      var leftBtn = tabs.querySelector('[data-tabs-scroll="left"]');
      var rightBtn = tabs.querySelector('[data-tabs-scroll="right"]');
      if (!list || !leftBtn || !rightBtn) return;

      function updateOverflowButtons() {
        var canScrollLeft = list.scrollLeft > 1;
        var canScrollRight = list.scrollLeft + list.clientWidth < list.scrollWidth - 1;
        leftBtn.classList.toggle("tds-tabs__overflow-btn--visible", canScrollLeft);
        rightBtn.classList.toggle("tds-tabs__overflow-btn--visible", canScrollRight);
        leftBtn.tabIndex = canScrollLeft ? 0 : -1;
        rightBtn.tabIndex = canScrollRight ? 0 : -1;
      }

      leftBtn.addEventListener("click", function () {
        list.scrollBy({ left: -list.clientWidth * 0.6, behavior: "smooth" });
      });
      rightBtn.addEventListener("click", function () {
        list.scrollBy({ left: list.clientWidth * 0.6, behavior: "smooth" });
      });
      list.addEventListener("scroll", updateOverflowButtons, { passive: true });
      window.addEventListener("resize", updateOverflowButtons);
      if (typeof ResizeObserver !== "undefined") {
        new ResizeObserver(updateOverflowButtons).observe(list);
      }
      updateOverflowButtons();
    });
  }

  var drawerClose = document.querySelector("[data-d4-drawer-close]");
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (expandBtn) expandBtn.addEventListener("click", toggleDrawerExpand);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && drawer && !drawer.hidden) closeDrawer();
  });

  initDocTabsScroll();
  renderFeed();
  syncPanelToggle();
})();
