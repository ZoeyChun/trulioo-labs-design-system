/* Demo 3 — one shared KYB session for both panels.

   The AI panel (js/d3-kyb-agent.js) and the right-panel manual search
   (js/d3-kyb-manual-search.js) both read and write this, so whichever panel the
   user works in, the other follows.

   The flow it describes, after a business has been picked:

     package    Essentials / Insights / Complete          (what to verify)
     add-ons    BAV, adverse media, monitoring            (optional modules)
     inputs     only what the registry does not hold and the choices above
                make necessary: the entity itself (a registry with no automated
                search), the UBO (a registry that hides owners), bank details
                for BAV
     review     one summary, one click to run

   Every choice says up front how many extra fields it adds ("dynamic impact").

     D3KybSession.get() / set(patch, source) / reset(source)
     D3KybSession.packages / .addons / .countries
     D3KybSession.requirements()   which inputs are needed, and how many
     D3KybSession.inputsComplete() are they all filled in?
     D3KybSession.applyInputs(biz) the business with what the user supplied
     D3KybSession.tabAllowed(pkg, tab, addons)

   `set` emits "d3-kyb:session-change" ({ state, changed, source }). Nothing
   here touches the DOM. */
(function () {
  "use strict";

  /* The one list of jurisdictions. `ubo`: whether the registry publishes
     ownership ("public") or not ("private" → a gap the user fills in). */
  var COUNTRIES = [
    { cc: "us", name: "United States", registry: "Secretary of State business registry", the: "the Secretary of State business registry", ubo: "private", finder: true },
    { cc: "gb", name: "United Kingdom", registry: "Companies House", the: "Companies House", ubo: "public", finder: true },
    { cc: "ca", name: "Canada", registry: "Corporations Canada", the: "Corporations Canada", ubo: "private", finder: false },
    { cc: "au", name: "Australia", registry: "ASIC business registry", the: "the ASIC business registry", ubo: "private", finder: true },
    { cc: "de", name: "Germany", registry: "Handelsregister", the: "the Handelsregister", ubo: "private", finder: true },
    { cc: "nl", name: "Netherlands", registry: "KVK business registry", the: "the KVK business registry", ubo: "public", finder: true },
    { cc: "sg", name: "Singapore", registry: "ACRA business registry", the: "the ACRA business registry", ubo: "private", finder: false },
    { cc: "se", name: "Sweden", registry: "Bolagsverket", the: "Bolagsverket", ubo: "public", finder: true }
  ];

  /* What each package puts in the report. Tabs are the report's own tab ids. */
  var PACKAGES = [
    {
      id: "essentials",
      label: "Essentials",
      name: "Business Essentials",
      note: "Existence, active status and registration data",
      tagline: "Baseline entity verification",
      bullets: [
        "Registry active status check",
        "Global sanctions & watchlist screening"
      ],
      tabs: ["overview", "signals"]
    },
    {
      id: "insights",
      label: "Insights",
      name: "Business Insights",
      note: "Adds owners, UBOs and additional data",
      tagline: "Required for standard underwriting & merchant onboarding",
      bullets: [
        "All Essentials features included",
        "Beneficial ownership (UBO) discovery & corporate graph",
        "Financial solvency indicator & filing history"
      ],
      recommended: true,
      tabs: ["overview", "signals", "ownership", "additional"]
    },
    {
      id: "complete",
      label: "Complete",
      name: "Business Complete",
      note: "Adds web and social insights",
      tagline: "Full due diligence for higher-risk onboarding",
      bullets: [
        "All Insights features included",
        "Web & social insights"
      ],
      tabs: ["overview", "signals", "ownership", "additional", "web"]
    }
  ];
  var DEFAULT_PACKAGE = "essentials";

  /* Optional risk modules. `fields` is what each one asks the user for. */
  var ADDONS = [
    { id: "filings", name: "Filings", short: "Filings", note: "Additional information on the business such as Judgements, Bankruptcies, Insolvencies etc.", fields: 0, impact: "" },
    { id: "web", name: "Web Insights", short: "Web Insights", note: "", fields: 0, impact: "" },
    { id: "ubo", name: "UBO Discovery", short: "UBO Discovery", note: "", fields: 0, impact: "", privateOnly: true },
    { id: "ubopsc", name: "UBO and PSC Discovery", short: "UBO and PSC Discovery", note: "", fields: 0, impact: "", privateOnly: true }
  ];

  /* Which add-ons a package offers: Essentials has none; Insights gets the full
     list (with the two ownership discovery modules); Complete already covers
     ownership, so those two drop out. */
  function addonsFor(packageId) {
    var id = packageId || state.package;
    if (id === "essentials") return [];
    return ADDONS.filter(function (a) { return !(id === "complete" && a.privateOnly); });
  }

  /* A few real ABA routing numbers, so the demo can name the bank. */
  var BANKS = {
    "021000021": "JPMorgan Chase",
    "026009593": "Bank of America",
    "121000248": "Wells Fargo",
    "021000089": "Citibank",
    "011401533": "TD Bank",
    "322271627": "JPMorgan Chase"
  };

  var EVENT = "d3-kyb:session-change";

  function blankState() {
    return {
      country: null,
      query: "",
      package: DEFAULT_PACKAGE,
      packageChosen: false,
      addons: [],
      addonsChosen: false,
      entity: null, // { id, name, cc } — the business picked so far
      finderEnabled: true, // the user's Business Finder switch (a registry without search ignores it)
      profile: { name: "", regNo: "", address: "", taxId: "" }, // typed in when the registry has no automated search
      profileDoc: false, // a certificate was dropped to auto-fill it
      profileDone: false, // the AI panel has already collected the entity details
      ubo: { name: "", title: "", pct: "", email: "" }, // the primary beneficial owner
      extraUbos: [], // more owners: [{ name, title, pct }]
      uboRoute: "email", // identity check: "email" invite or "docs" collected by the user
      uboProof: false, // a cap table / share register was attached
      bank: { routing: "", account: "", type: "" },
      ownershipSkipped: false,
      inputsDone: false
    };
  }

  var state = blankState();

  function copy(o) {
    return JSON.parse(JSON.stringify(o));
  }

  function clone() {
    return copy(state);
  }

  function pkg(id) {
    for (var i = 0; i < PACKAGES.length; i += 1) {
      if (PACKAGES[i].id === id) return PACKAGES[i];
    }
    return null;
  }

  function addon(id) {
    for (var i = 0; i < ADDONS.length; i += 1) {
      if (ADDONS[i].id === id) return ADDONS[i];
    }
    return null;
  }

  function country(cc) {
    var code = String(cc || "").toLowerCase();
    for (var i = 0; i < COUNTRIES.length; i += 1) {
      if (COUNTRIES[i].cc === code) return COUNTRIES[i];
    }
    return null;
  }

  /* The Web & Social tab also opens for the Web Insights add-on. */
  function tabAllowed(id, tab, addons) {
    var row = pkg(id) || pkg(DEFAULT_PACKAGE);
    if (row.tabs.indexOf(tab) !== -1) return true;
    return tab === "web" && (addons || []).indexOf("web") !== -1;
  }

  /* "run insights", "with the Complete package", "Business Essentials". A bare
     "complete" or "insights" is ordinary English, so it needs a cue word —
     unless it is the whole message. */
  function packageFromText(text) {
    var t = String(text || "").toLowerCase();
    var named = /\bbusiness\s+(essentials|insights|complete)\b/.exec(t);
    if (named) return named[1];
    var cued = /\b(?:use|run|with|switch(?:\s+to)?|change(?:\s+to)?|set(?:\s+to)?|upgrade(?:\s+to)?|choose|pick|select|go\s+with)\s+(?:the\s+)?(essentials|insights|complete)\b/.exec(t);
    if (cued) return cued[1];
    var trailing = /\b(essentials|insights|complete)\s+(?:package|tier|plan)\b/.exec(t);
    if (trailing) return trailing[1];
    var bare = /^\s*(essentials|insights|complete)\s*[.!]?\s*$/.exec(t);
    return bare ? bare[1] : null;
  }

  function normalise(patch) {
    var next = {};
    if ("country" in patch) {
      var row = patch.country ? country(patch.country) : null;
      next.country = row ? row.cc : null;
    }
    if ("query" in patch) next.query = String(patch.query || "").trim();
    if ("package" in patch) next.package = pkg(patch.package) ? patch.package : DEFAULT_PACKAGE;
    if ("packageChosen" in patch) next.packageChosen = !!patch.packageChosen;
    if ("addons" in patch) {
      next.addons = (Array.isArray(patch.addons) ? patch.addons : []).filter(function (id, i, all) {
        return addon(id) && all.indexOf(id) === i;
      });
    }
    /* A package change drops add-ons it does not offer. */
    if ("addons" in patch || "package" in patch) {
      var offered = addonsFor("package" in next ? next.package : state.package).map(function (a) { return a.id; });
      next.addons = ("addons" in next ? next.addons : state.addons).filter(function (id) { return offered.indexOf(id) !== -1; });
    }
    if ("addonsChosen" in patch) next.addonsChosen = !!patch.addonsChosen;
    if ("entity" in patch) {
      var e = patch.entity;
      next.entity = e && e.id ? { id: String(e.id), name: String(e.name || ""), cc: String(e.cc || "").toLowerCase() } : null;
    }
    if ("finderEnabled" in patch) next.finderEnabled = !!patch.finderEnabled;
    if ("profile" in patch) {
      var pr = patch.profile || {};
      next.profile = {
        name: String(pr.name || ""),
        regNo: String(pr.regNo || ""),
        address: String(pr.address || ""),
        taxId: String(pr.taxId || "")
      };
    }
    if ("profileDoc" in patch) next.profileDoc = !!patch.profileDoc;
    if ("profileDone" in patch) next.profileDone = !!patch.profileDone;
    if ("ubo" in patch) {
      var u = patch.ubo || {};
      next.ubo = {
        name: String(u.name || ""),
        title: String(u.title || ""),
        pct: String(u.pct || ""),
        email: String(u.email || "")
      };
    }
    if ("extraUbos" in patch) {
      next.extraUbos = (Array.isArray(patch.extraUbos) ? patch.extraUbos : []).slice(0, 3).map(function (o) {
        return { name: String((o && o.name) || ""), title: String((o && o.title) || ""), pct: String((o && o.pct) || "") };
      });
    }
    if ("uboRoute" in patch) next.uboRoute = patch.uboRoute === "docs" ? "docs" : "email";
    if ("uboProof" in patch) next.uboProof = !!patch.uboProof;
    if ("bank" in patch) {
      var b = patch.bank || {};
      next.bank = {
        routing: String(b.routing || "").replace(/\D/g, "").slice(0, 9),
        account: String(b.account || "").replace(/\D/g, "").slice(0, 17),
        type: String(b.type || "")
      };
    }
    if ("ownershipSkipped" in patch) next.ownershipSkipped = !!patch.ownershipSkipped;
    if ("inputsDone" in patch) next.inputsDone = !!patch.inputsDone;
    return next;
  }

  function set(patch, source) {
    patch = patch || {};
    var next = normalise(patch);
    var changed = [];

    /* Choosing — even the value already selected — is a decision; the AI panel
       only asks until one has been made. */
    if ("package" in patch && !("packageChosen" in next)) next.packageChosen = true;
    if ("addons" in patch && !("addonsChosen" in next)) next.addonsChosen = true;

    /* A different business starts the questions over. */
    if ("entity" in next) {
      var was = state.entity && state.entity.id;
      var now = next.entity && next.entity.id;
      if (was !== now) {
        var blank = blankState();
        /* The typed-in entity profile belongs to a hand-entered business: creating
           that business must not wipe what was typed to create it. */
        var keepProfile = !was && /^manual:/.test(now || "");
        if (!keepProfile) {
          if (!("profile" in next)) next.profile = blank.profile;
          if (!("profileDoc" in next)) next.profileDoc = false;
          if (!("profileDone" in next)) next.profileDone = false;
        }
        if (!("ubo" in next)) next.ubo = blank.ubo;
        if (!("extraUbos" in next)) next.extraUbos = [];
        if (!("uboRoute" in next)) next.uboRoute = "email";
        if (!("uboProof" in next)) next.uboProof = false;
        if (!("bank" in next)) next.bank = blank.bank;
        if (!("ownershipSkipped" in next)) next.ownershipSkipped = false;
        if (!("inputsDone" in next)) next.inputsDone = false;
      }
    }

    Object.keys(next).forEach(function (key) {
      if (JSON.stringify(state[key]) !== JSON.stringify(next[key])) {
        state[key] = next[key];
        changed.push(key);
      }
    });
    if (!changed.length) return false;
    document.dispatchEvent(
      new CustomEvent(EVENT, { detail: { state: clone(), changed: changed, source: source || "" } })
    );
    return true;
  }

  function reset(source) {
    var blank = blankState();
    set(
      {
        country: null,
        query: "",
        finderEnabled: true,
        package: blank.package,
        packageChosen: false,
        addons: [],
        addonsChosen: false,
        entity: null,
        profile: blank.profile,
        profileDoc: false,
        profileDone: false,
        ubo: blank.ubo,
        extraUbos: [],
        uboRoute: "email",
        uboProof: false,
        bank: blank.bank,
        ownershipSkipped: false,
        inputsDone: false
      },
      source || "reset"
    );
  }

  /* Does this entity + package hit a registry that hides ownership?
       none     Essentials, or no business picked yet
       public   the registry publishes owners — they are shown, not asked
       private  it does not — the user supplies the UBO (a gap) */
  function ownershipMode() {
    if (!state.entity || !tabAllowed(state.package, "ownership", [])) return "none";
    var row = country(state.entity.cc);
    return row && row.ubo === "public" ? "public" : "private";
  }

  /* Does this country's registry support automated search? When it does not,
     the user types the entity in by hand (the "manual fallback"). */
  function finderSupported(cc) {
    var row = country(cc);
    return !row || row.finder !== false;
  }

  /* On only when the registry supports it AND the user left the switch on. */
  function finderOn(cc) {
    return finderSupported(cc) && state.finderEnabled;
  }

  /* What the user still has to provide, given the registry, the package and the
     add-ons — and how many fields that is. Nothing is asked that the registry
     already holds, and a registry that publishes its owners asks nothing about
     them.
       profile  the entity itself (no automated search): name, number, address
       ubo      "private": the owner the registry hides  ("public": nothing)
       bank     routing + account number (BAV) */
  function requirements() {
    var mode = ownershipMode();
    var ubo = mode;
    if (mode === "private" && state.ownershipSkipped) ubo = "skipped";
    var profile = !!state.entity && !finderOn(state.entity.cc) && !state.profileDone;
    var bank = false; // bank details are no longer asked for
    var uboFields = ubo === "private" ? (state.uboRoute === "email" ? 3 : 2) : 0;
    return {
      ubo: ubo,
      profile: profile,
      bank: bank,
      fields: (profile ? 3 : 0) + uboFields + (bank ? 2 : 0)
    };
  }

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
  }

  function validAba(v) {
    var d = String(v || "");
    if (!/^\d{9}$/.test(d)) return false;
    var n = d.split("").map(Number);
    return (3 * (n[0] + n[3] + n[6]) + 7 * (n[1] + n[4] + n[7]) + (n[2] + n[5] + n[8])) % 10 === 0;
  }

  function bankName(routing) {
    return validAba(routing) ? BANKS[routing] || "" : "";
  }

  function validPct(v) {
    var n = parseFloat(v);
    return !isNaN(n) && n >= 1 && n <= 100;
  }

  function inputsComplete() {
    var r = requirements();
    if (r.profile && (!state.profile.name.trim() || !state.profile.regNo.trim() || !state.profile.address.trim())) return false;
    if (r.ubo === "private") {
      if (!state.ubo.name.trim() || !validPct(state.ubo.pct)) return false;
      if (state.uboRoute === "email" && !validEmail(state.ubo.email)) return false;
      /* An extra owner is optional, but once started it must be finished. */
      for (var i = 0; i < state.extraUbos.length; i += 1) {
        var o = state.extraUbos[i];
        if ((o.name.trim() || o.pct) && (!o.name.trim() || !validPct(o.pct))) return false;
      }
    }
    if (r.bank && (!validAba(state.bank.routing) || state.bank.account.length < 4)) return false;
    return true;
  }

  /* "Total: 3 sections | 9 inputs | 2 file uploads" — what the form in front of
     the user actually holds right now. */
  function formSummary() {
    var r = requirements();
    var sections = 0;
    var inputs = 0;
    var uploads = 0;
    if (r.profile) {
      sections += 1;
      inputs += 4;
      uploads += 1; // certificate to auto-fill
    }
    if (r.ubo === "private") {
      sections += 1;
      inputs += 3 + state.extraUbos.length * 3 + (state.uboRoute === "email" ? 1 : 0); // name, title, %, + email
      uploads += 1; // cap table / share register
    }
    if (r.bank) {
      sections += 1;
      inputs += 3; // routing, account, account type
    }
    return { sections: sections, inputs: inputs, uploads: uploads };
  }

  /* "Business Insights + Adverse Media + Bank Account Check" */
  function scopeLabel() {
    var parts = [(pkg(state.package) || pkg(DEFAULT_PACKAGE)).name];
    state.addons.forEach(function (id) {
      parts.push(addon(id).short);
    });
    return parts.join(" + ");
  }

  /* The report reads biz.ownership. What it should show depends on what the
     registry holds and what the user supplied:
       private + owners typed in   the owners they named
       private + skipped           "ownership not disclosed"
       otherwise                   the demo dataset as it is */
  function applyInputs(biz) {
    if (!biz) return biz;
    var r = requirements();
    if (r.ubo !== "private" && r.ubo !== "skipped") return biz;
    var out = {};
    Object.keys(biz).forEach(function (k) { out[k] = biz[k]; });
    /* A ready-made graph from the dataset would win over what the user typed. */
    delete out.ownershipGraph;
    if (r.ubo === "skipped") {
      out.ownership = [];
      out.ownershipUndisclosed = true;
    } else {
      var owners = [{ name: state.ubo.name, title: state.ubo.title, pct: state.ubo.pct }]
        .concat(state.extraUbos)
        .filter(function (o) { return o.name.trim() && validPct(o.pct); });
      out.ownership = owners.map(function (o) {
        return {
          name: o.name.trim(),
          type: "person",
          role: o.title ? o.title : "Beneficial owner",
          pct: parseFloat(o.pct) + "%",
          flagged: false,
          note: "Provided by you — the registry does not disclose ownership."
        };
      });
      out.ownershipUserProvided = true;
    }
    return out;
  }

  window.D3KybSession = {
    EVENT: EVENT,
    countries: COUNTRIES,
    packages: PACKAGES,
    addons: ADDONS,
    addonsFor: addonsFor,
    package: pkg,
    addon: addon,
    packageFromText: packageFromText,
    tabAllowed: tabAllowed,
    ownershipMode: ownershipMode,
    requirements: requirements,
    finderOn: finderOn,
    finderSupported: finderSupported,
    formSummary: formSummary,
    validPct: validPct,
    inputsComplete: inputsComplete,
    scopeLabel: scopeLabel,
    bankName: bankName,
    validAba: validAba,
    validEmail: validEmail,
    applyInputs: applyInputs,
    country: country,
    get: clone,
    set: set,
    reset: reset
  };
})();
