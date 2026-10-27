/* Demo 3 — KYB Agent: grounded NL over the multi-jurisdiction Meridian demo dataset. */
(function () {
  var shell = document.querySelector(".d1-shell");
  var composer = document.querySelector("[data-d1-composer]");
  var thread = document.querySelector("[data-d1-thread]");
  var follow = document.querySelector("[data-d1-follow]");
  if (!shell || !composer || !thread) return;

  var busy = false;
  var historyTurns = [];
  var compareIds = [];
  /* Demo-2-style candidate panel state (chips → cards → confirm). */
  var candState = {
    list: [],
    filterIds: [],
    queryLabel: "Meridian",
    root: null,
    mode: "list" /* country | list | confirm */,
    pending: null
  };

  var SUGGEST_SEARCH = [
    { q: "Find Meridian" },
    { q: "Meridian, United States" },
    { q: "Verify Meridian Capital LLC" }
  ];

  /* Supported markets for this demo — product config, not search-result facets. */
  var DEMO_JURISDICTIONS = [
    { id: "us", cc: "US", label: "United States" },
    { id: "gb", cc: "GB", label: "United Kingdom" },
    { id: "sg", cc: "SG", label: "Singapore" },
    { id: "se", cc: "SE", label: "Sweden" },
    { id: "de", cc: "DE", label: "Germany" },
    { id: "au", cc: "AU", label: "Australia" }
  ];
  var SUGGEST_AFTER = [
    { q: "Why is this entity high risk?" },
    { q: "Who ultimately owns this business?" },
    { q: "Has this entity ever traded?" }
  ];

  /* Pane / parked composer copy — keep in sync with the active KYB step. */
  var PLACEHOLDER = {
    search: "Business name and country",
    country: "Country of registration, e.g. United States",
    list: "Select a match or refine your search",
    confirm: "Confirm above, or ask a follow-up",
    running: "Verification in progress…",
    report: "Ask about this verification"
  };

  function composerInputs() {
    var pane = document.querySelector(".d3-chat-pane");
    var found = [];
    var seen = typeof WeakSet !== "undefined" ? new WeakSet() : null;
    function add(el) {
      if (!el || (seen && seen.has(el))) return;
      if (seen) seen.add(el);
      found.push(el);
    }
    if (pane) {
      pane.querySelectorAll("[data-d1-input], [data-d3-pane-input]").forEach(add);
    }
    if (!found.length) add(document.querySelector("[data-d3-pane-input]"));
    return found;
  }

  function setComposerPlaceholder(text) {
    var next = text || PLACEHOLDER.search;
    composerInputs().forEach(function (input) {
      input.placeholder = next;
      input.setAttribute("aria-label", next);
    });
    var rotator = document.querySelector(".d3-chat-pane [data-d1-ph-rotator]");
    if (rotator) {
      rotator.hidden = true;
      rotator.classList.add("is-hidden");
    }
  }

  var CAND_GO_SVG =
    '<svg viewBox="0 0 24 24" fill="none"><path d="M13.47 4.72a.75.75 0 0 1 1.06 0l6.75 6.75a.75.75 0 0 1 0 1.06l-6.75 6.75a.75.75 0 1 1-1.06-1.06l5.47-5.47H3.75a.75.75 0 0 1 0-1.5h15.19l-5.47-5.47a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>';

  function onKyb() {
    /* Only while KYB workspace is the active view — never hijack Home
       just because chat-mode is still "kyb" from a prior visit. */
    return (
      shell.getAttribute("data-d3-view") === "chat" &&
      shell.getAttribute("data-d3-chat-mode") === "kyb"
    );
  }

  function onTx() {
    return shell.getAttribute("data-d3-view") === "transactions";
  }

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function clone(name) {
    var tpl = document.querySelector('[data-d1-tpl="' + name + '"]');
    if (!tpl) return null;
    return tpl.content.firstElementChild.cloneNode(true);
  }

  function stick() {
    var pane = document.querySelector("[data-d3-chat-thread]");
    var scroller = pane || thread.parentElement;
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }

  function place(node) {
    thread.appendChild(node);
    stick();
    return node;
  }

  function setBusy(on) {
    busy = on;
    composer.dispatchEvent(new CustomEvent("d1-composer:state", { detail: { busy: on } }));
  }

  function parkActive() {
    document.dispatchEvent(new CustomEvent("d3-kyb:park-composer"));
    if (window.D3Nav) window.D3Nav.markChatActive();
    var pane = document.querySelector("[data-d3-chat-pane]");
    if (pane) pane.classList.add("is-active");
  }

  function setSuggestions(list) {
    if (!follow) return;
    var rows = follow.querySelectorAll("[data-d1-suggest]");
    rows.forEach(function (btn, i) {
      var span = btn.querySelector("span");
      if (list[i] && span) {
        span.textContent = list[i].q;
        btn.setAttribute("data-d3-kyb-suggest", list[i].q);
      }
    });
    follow.classList.add("is-on");
    follow.hidden = false;
  }

  function hideFollow() {
    if (!follow) return;
    follow.classList.remove("is-on");
    follow.hidden = true;
  }

  function sleep(ms) {
    return new Promise(function (r) {
      window.setTimeout(r, ms);
    });
  }

  function businesses() {
    return (window.D3KybMapSearch && window.D3KybMapSearch.businesses) || [];
  }

  function selected() {
    if (window.D3KybReport && window.D3KybReport.getCurrent()) {
      return window.D3KybReport.getCurrent();
    }
    if (window.D3KybMapSearch && window.D3KybMapSearch.getSelected()) {
      return window.D3KybMapSearch.getSelected();
    }
    return null;
  }

  function ensureKybOpen() {
    if (!onKyb() && window.D3Nav && window.D3Nav.openKybChat) {
      window.D3Nav.openKybChat({ resume: true });
    }
  }

  /* ---- NL parsing ---- */

  function placeFromText(text) {
    if (window.D3KybMapSearch && typeof window.D3KybMapSearch.parsePlaceQuery === "function") {
      return window.D3KybMapSearch.parsePlaceQuery(text);
    }
    return { raw: String(text || "").trim(), nameQuery: String(text || "").trim(), country: null, cc: null };
  }

  function withPlace(result, place) {
    if (!result || !place) return result;
    if (place.country) result.country = place.country;
    if (place.cc) result.cc = place.cc;
    return result;
  }

  function parseQuery(text) {
    var q = String(text || "").trim();
    var lower = q.toLowerCase();
    var place = placeFromText(q);
    var scopedName = place.nameQuery || q;

    /* Idle prompt cards — synced from demo-2/verify-business TruAI suggestions */
    if (/what information do i need|fields and documents|required to start/.test(lower)) {
      return { intent: "faq", topic: "info" };
    }
    if (/which countries are supported|jurisdictions available|countries supported/.test(lower)) {
      return { intent: "faq", topic: "countries" };
    }
    if (/how does verification work|steps from search|verified report/.test(lower)) {
      return { intent: "faq", topic: "how" };
    }

    if (/^(find|search|look up|locate)\b/.test(lower) || /^meridian$/i.test(scopedName)) {
      var needle =
        scopedName.replace(/^(find|search|look up|locate)\s+/i, "").trim() || "Meridian";
      return withPlace({ intent: "find", query: needle }, place);
    }

    if (/^verify\b|run (a )?kyb|start verification|check (this |the )?business/.test(lower)) {
      var name = scopedName
        .replace(/^verify\s+/i, "")
        .replace(/\b(please|now)\b/gi, "")
        .trim();
      /* “Verify Meridian” is a search, not a single-entity pick — same-name
         brands must disambiguate across jurisdictions first (demo-2). */
      if (
        !name ||
        /^meridian$/i.test(name) ||
        !/\b(llc|inc\.?|ltd\.?|lp|gmbh|pte\.?|ab|pty|partners|holdings|capital|analytics|industrial|energy|consulting|resources|handels|nordic|pacific|trade|logistics|apex|global)\b/i.test(
          name
        )
      ) {
        var brandHits =
          window.D3KybMapSearch &&
          window.D3KybMapSearch.findBusinesses(name || "Meridian", {
            country: place.country,
            cc: place.cc
          });
        if (brandHits && brandHits.length > 1) {
          return withPlace({ intent: "find", query: name || "Meridian" }, place);
        }
      }
      return withPlace({ intent: "verify", name: name || null }, place);
    }

    if (/who (owns|are the (owners|ubos?))|ownership|beneficial owner|ubo|ultimate owner|who ultimately owns/.test(lower)) {
      return { intent: "ownership", flaggedOnly: /flagged/.test(lower) };
    }

    if (/why .{0,40}(flag|risk|fail|review)|flagged|high risk|risk signal|what('s| is) wrong|sanctions|shell/.test(lower)) {
      return { intent: "risk" };
    }

    if (/ever traded|active trading|trading presence|employees|operations/.test(lower)) {
      return { intent: "trading" };
    }

    if (/compare/.test(lower)) {
      return { intent: "compare", text: q };
    }

    if (/summar(y|ize|ise)|overview|what do we know|tell me about/.test(lower)) {
      return { intent: "summary" };
    }

    if (/open (the )?(report|overview)|show (the )?report|go to overview/.test(lower)) {
      return { intent: "tab", tab: "overview" };
    }
    if (/web|social/.test(lower) && /insight|signal|tab|show|open/.test(lower)) {
      return { intent: "tab", tab: "web" };
    }
    if (/match signal|signals tab|open signals/.test(lower)) {
      return { intent: "tab", tab: "signals" };
    }
    if (/raw data|sources/.test(lower)) {
      return { intent: "tab", tab: /source/.test(lower) ? "signals" : "raw" };
    }

    /* “Meridian Capital LLC, United States” / “Acme Inc United Kingdom” */
    if (place.country && scopedName) {
      var placed =
        window.D3KybMapSearch &&
        window.D3KybMapSearch.findBusinesses(place, {
          country: place.country,
          cc: place.cc
        });
      if (placed && placed.length === 1) {
        return withPlace(
          { intent: "verify", name: placed[0].name, biz: placed[0] },
          place
        );
      }
      if (placed && placed.length > 1) {
        return withPlace({ intent: "find", query: scopedName }, place);
      }
      if (/meridian/i.test(scopedName)) {
        return withPlace({ intent: "find", query: "Meridian" }, place);
      }
      return withPlace({ intent: "find", query: scopedName }, place);
    }

    /* Bare company name from dataset */
    var hit = window.D3KybMapSearch && window.D3KybMapSearch.findByName(scopedName);
    if (hit && scopedName.length > 8) {
      return withPlace({ intent: "verify", name: hit.name, biz: hit }, place);
    }

    if (/meridian/i.test(scopedName || q)) {
      return withPlace({ intent: "find", query: "Meridian" }, place);
    }

    return {
      intent: "help",
      message:
        "I can search the demo KYB dataset, verify a matched business, explain ownership / UBOs, surface risk signals, or compare two Meridian entities. Try “Find Meridian” or “Meridian Capital LLC, United States”. I won’t invent businesses that aren’t in this dataset."
    };
  }

  function resolveCompareNames(text) {
    var list = businesses();
    var found = [];
    list.forEach(function (biz) {
      if (text.toLowerCase().indexOf(biz.name.toLowerCase()) !== -1) found.push(biz);
    });
    if (found.length >= 2) return found.slice(0, 2);
    /* Fall back to Capital vs Global if user said "these two" / generic compare */
    if (/capital/.test(text.toLowerCase()) && /global/.test(text.toLowerCase())) {
      return [
        list.filter(function (b) { return b.id === "us-cap"; })[0],
        list.filter(function (b) { return b.id === "us-global"; })[0]
      ].filter(Boolean);
    }
    if (compareIds.length >= 2) {
      return compareIds
        .slice(0, 2)
        .map(function (id) {
          return list.filter(function (b) { return b.id === id; })[0];
        })
        .filter(Boolean);
    }
    var sel = selected();
    var last = (window.D3KybMapSearch && window.D3KybMapSearch.getLastResults()) || [];
    if (sel && last.length) {
      var other = last.filter(function (b) { return b.id !== sel.id; })[0];
      if (other) return [sel, other];
    }
    return [];
  }

  /* ---- render helpers ---- */

  function renderUser(text) {
    var node = clone("user");
    if (!node) {
      node = document.createElement("section");
      node.className = "d1-turn d1-enter";
      node.innerHTML = '<div class="d1-user"><p></p></div>';
    }
    node.querySelector("p").textContent = text;
    place(node);
  }

  async function playTyping(ms, label) {
    var node = clone("typing");
    if (!node) {
      await sleep(ms);
      return;
    }
    var text = node.querySelector("[data-d1-thinking-label]");
    if (text) text.textContent = label || "Searching business registries…";
    place(node);
    var wait = ms || 1800;
    if (wait >= 600) wait = Math.max(wait, 1800);
    await sleep(wait);
    node.remove();
  }

  function playHtml(html) {
    var wrap = document.createElement("div");
    wrap.className = "d1-ai d1-enter d3-kyb-agent-wrap";
    wrap.innerHTML = html;
    place(wrap);
    return wrap;
  }

  function bizCountry(biz) {
    return biz.country || "United States";
  }

  function bizCc(biz) {
    return (biz.cc || "US").toUpperCase();
  }

  function showAwaitingCountry(queryLabel) {
    var map = window.D3KybMapSearch;
    if (!map) return;
    if (typeof map.ensureMapSurface === "function") map.ensureMapSurface();
    if (typeof map.setAwaitingCountry === "function") {
      map.setAwaitingCountry(true, queryLabel);
    }
  }

  function buildCandFilters(list) {
    var byCc = {};
    list.forEach(function (c) {
      var cc = bizCc(c);
      if (!byCc[cc]) {
        byCc[cc] = {
          id: cc.toLowerCase(),
          label: bizCountry(c),
          group: "country",
          cc: cc,
          n: 0,
          test: (function (code) {
            return function (x) {
              return bizCc(x) === code;
            };
          })(cc)
        };
      }
      byCc[cc].n += 1;
    });
    var countries = Object.keys(byCc)
      .map(function (k) {
        return byCc[k];
      })
      .sort(function (a, b) {
        return b.n - a.n || a.label.localeCompare(b.label);
      });
    return countries.concat([
      {
        id: "active",
        label: "Active only",
        group: "status",
        test: function (c) {
          return c.status === "Active";
        }
      }
    ]);
  }

  function isCountryFilter(f) {
    return f.group === "country";
  }

  function activeFilters(defs) {
    var ids = candState.filterIds || [];
    return (defs || buildCandFilters(candState.list)).filter(function (f) {
      return ids.indexOf(f.id) !== -1;
    });
  }

  function applyCandFilters(list, filters) {
    var countryFs = filters.filter(isCountryFilter);
    var otherFs = filters.filter(function (f) {
      return !isCountryFilter(f);
    });
    return list.filter(function (c) {
      var countryOk = !countryFs.length || countryFs.some(function (f) {
        return f.test(c);
      });
      var otherOk = otherFs.every(function (f) {
        return f.test(c);
      });
      return countryOk && otherOk;
    });
  }

  function facetCount(f, list, defs) {
    var others = activeFilters(defs).filter(function (g) {
      return g.id !== f.id;
    });
    if (isCountryFilter(f)) {
      var nonCountry = others.filter(function (g) {
        return !isCountryFilter(g);
      });
      return list.filter(function (c) {
        return f.test(c) && nonCountry.every(function (g) {
          return g.test(c);
        });
      }).length;
    }
    var countryFs = others.filter(isCountryFilter);
    return list.filter(function (c) {
      var countryOk = !countryFs.length || countryFs.some(function (g) {
        return g.test(c);
      });
      return countryOk && f.test(c);
    }).length;
  }

  function candidateCardHtml(c) {
    var statusOk = c.status === "Active";
    return (
      '<button type="button" class="ai-cand" data-id="' +
      esc(c.id) +
      '" data-d3-kyb-cand="' +
      esc(c.id) +
      '">' +
      '<span class="ai-cand__head">' +
      '<span class="ai-cand__name">' +
      esc(c.name) +
      "</span>" +
      '<span class="ai-cand__go" aria-hidden="true">' +
      CAND_GO_SVG +
      "</span>" +
      "</span>" +
      '<span class="ai-cand__facts">' +
      '<span class="ai-cand__fact"><b>Jurisdiction</b>' +
      esc(bizCountry(c)) +
      "</span>" +
      '<span class="ai-cand__fact"><b>Status</b>' +
      '<span class="ai-cand__status ai-cand__status--' +
      (statusOk ? "ok" : "off") +
      '">' +
      esc(c.status || "—") +
      "</span></span>" +
      '<span class="ai-cand__fact ai-cand__fact--wide"><b>Registration</b>' +
      esc(c.reg) +
      "</span>" +
      '<span class="ai-cand__fact ai-cand__fact--wide"><b>Address</b>' +
      esc(c.addr || c.city || "—") +
      "</span>" +
      "</span>" +
      (c.brief ? '<span class="ai-cand__note">' + esc(c.brief) + "</span>" : "") +
      "</button>"
    );
  }

  function visibleCandidates() {
    return applyCandFilters(candState.list, activeFilters());
  }

  function syncMapToVisible() {
    var map = window.D3KybMapSearch;
    if (!map || typeof map.plotResults !== "function") return;
    var list = visibleCandidates();
    if (!list.length) {
      map.plotResults([], "No matches");
      return;
    }
    var countries = {};
    list.forEach(function (c) {
      countries[bizCountry(c)] = 1;
    });
    var n = Object.keys(countries).length;
    var caption =
      list.length +
      " match" +
      (list.length === 1 ? "" : "es") +
      " in " +
      n +
      (n === 1 ? " country" : " countries");
    if (window.D3KybMapSearch && typeof window.D3KybMapSearch.matchCaption === "function") {
      caption = window.D3KybMapSearch.matchCaption(list);
    } else if (n === 1) {
      caption = Object.keys(countries)[0] + " · " + list.length + " Meridian matches";
    } else {
      caption = list.length + " Meridian matches · " + n + " countries";
    }
    map.plotResults(list, caption);
  }

  function restoreMapList() {
    syncMapToVisible();
    if (window.D3KybMapSearch && window.D3KybMapSearch.highlightMarker) {
      window.D3KybMapSearch.highlightMarker(null);
    }
  }

  function focusCandOnMap(biz) {
    var map = window.D3KybMapSearch;
    if (!map || !biz) return;
    if (typeof map.plotResults === "function") {
      map.plotResults([biz], (biz.country || biz.city || "Selected") + " · 1 selected", {
        skipFit: true
      });
    }
    if (typeof map.focusBusiness === "function") {
      map.focusBusiness(biz, { zoom: 11, holdMs: 200, duration: 0.85 });
    } else if (typeof map.highlightMarker === "function") {
      map.highlightMarker(biz.id);
    }
  }

  function paintCandidateList() {
    if (!candState.root) return;
    candState.mode = "list";
    candState.pending = null;
    setComposerPlaceholder(PLACEHOLDER.list);
    var filters = buildCandFilters(candState.list);
    var list = visibleCandidates();
    var countries = {};
    list.forEach(function (c) {
      countries[bizCountry(c)] = 1;
    });
    var nCountries = Object.keys(countries).length;
    var filtered = candState.filterIds.length > 0;

    var chips = filters
      .map(function (f) {
        var on = candState.filterIds.indexOf(f.id) !== -1;
        var n = facetCount(f, candState.list, filters);
        return (
          '<button type="button" class="ai-chip' +
          (on ? " ai-chip--on" : "") +
          '" data-d3-kyb-filter="' +
          esc(f.id) +
          '"' +
          (n === 0 && !on ? " disabled" : "") +
          ">" +
          esc(f.label) +
          '<span class="ai-chip__n">' +
          n +
          "</span></button>"
        );
      })
      .join("");

    var lead =
      list.length === 0
        ? "No matches for these filters."
        : list.length === 1
          ? "One match left."
          : filtered
            ? list.length +
              " matches across " +
              nCountries +
              (nCountries === 1 ? " country" : " countries") +
              "."
            : "Which “Meridian” should I check?";

    var sub =
      list.length === 0
        ? "Clear a filter to see candidates again."
        : list.length === 1
          ? "Open it to run the KYB check."
          : filtered
            ? "Narrow further, or open a card to run the KYB check."
            : list.length +
              " legal entities share this name across " +
              nCountries +
              (nCountries === 1 ? " country" : " countries") +
              ". They are unrelated companies, so picking the wrong one would attach " +
              "ownership, registration and sanctions results to the wrong business.";

    candState.root.innerHTML =
      '<div class="ai-reply">' +
      '<p class="ai-reply__lead">' +
      lead +
      "</p>" +
      '<p class="ai-reply__sub">' +
      sub +
      "</p>" +
      "</div>" +
      '<div class="ai-chips">' +
      chips +
      "</div>" +
      '<div class="ai-cands">' +
      list.map(candidateCardHtml).join("") +
      "</div>";

    syncMapToVisible();
    stick();
  }

  function showChatBack() {
    if (window.D3KybResume && window.D3KybResume.syncChatBack) {
      window.D3KybResume.syncChatBack(true);
    }
  }

  /* Name without country — ask in chat only. No country filter chips (those
     imply result facets). Map stays blank until a jurisdiction is named. */
  /* “verify a business” names no business at all. Strip the request words and
     the generic nouns; if nothing is left there is no name to look up yet. */
  function cleanName(label) {
    return String(label || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s&.'-]/g, " ")
      .replace(
        /\b(please|can|could|you|i|we|want|wants|would|like|to|need|help|me|with|let'?s|lets|verify|verification|check|find|search|look|up|for|run|do|a|an|the|my|our|some|this|that|new|another|one|kyb|kyc|business|businesses|company|companies|entity|entities|organi[sz]ation|firm|corporation|customer|client)\b/g,
        " "
      )
      .replace(/\s+/g, " ")
      .trim();
  }

  function playNameAsk() {
    hideFollow();
    showChatBack();
    candState.list = [];
    candState.filterIds = [];
    candState.queryLabel = "";
    candState.pending = null;
    candState.mode = "name";
    compareIds = [];

    showAwaitingCountry("");

    var wrap = playHtml("");
    wrap.classList.add("d3-kyb-cand-panel");
    candState.root = wrap;
    wrap.innerHTML =
      '<div class="ai-reply">' +
      '<p class="ai-reply__lead">Which business would you like to verify?</p>' +
      '<p class="ai-reply__sub">Tell me the legal business name — and the country if you know it, for example <strong>Meridian</strong> or “Meridian, United Kingdom”.</p>' +
      "</div>";
    stick();

    setComposerPlaceholder(PLACEHOLDER.search);
    var input = composerInputs()[0];
    if (input) {
      try {
        input.focus();
      } catch (e) {}
    }
    return wrap;
  }

  function playCountryAsk(queryLabel) {
    if (!cleanName(queryLabel)) return playNameAsk();
    hideFollow();
    showChatBack();
    candState.list = [];
    candState.filterIds = [];
    candState.queryLabel = queryLabel || "Meridian";
    candState.pending = null;
    candState.mode = "country";
    compareIds = [];

    showAwaitingCountry(candState.queryLabel);

    var wrap = playHtml("");
    wrap.classList.add("d3-kyb-cand-panel");
    candState.root = wrap;
    wrap.innerHTML =
      '<div class="ai-reply">' +
      '<p class="ai-reply__lead">Which country is this business registered in?</p>' +
      '<p class="ai-reply__sub">I can search for “' +
      esc(candState.queryLabel) +
      "” once I know the jurisdiction. Reply with the country of registration — for example <strong>United States</strong> or “" +
      esc(candState.queryLabel) +
      ', United Kingdom”.</p>' +
      "</div>";
    stick();

    setComposerPlaceholder(PLACEHOLDER.country);
    var input = composerInputs()[0];
    if (input) {
      try {
        input.focus();
      } catch (e) {}
    }
    return wrap;
  }

  function applyCountryPick(cc, countryLabel) {
    var code = String(cc || "").toUpperCase();
    var label = countryLabel || "";
    if (!code && !label) {
      var known = DEMO_JURISDICTIONS.filter(function (j) {
        return j.id === String(cc || "").toLowerCase() || j.label === label;
      })[0];
      if (known) {
        code = known.cc;
        label = known.label;
      }
    }
    if (!code && label) {
      var byLabel = DEMO_JURISDICTIONS.filter(function (j) {
        return j.label === label;
      })[0];
      if (byLabel) code = byLabel.cc;
    }
    if (!label && code) {
      var byCc = DEMO_JURISDICTIONS.filter(function (j) {
        return j.cc === code;
      })[0];
      if (byCc) label = byCc.label;
    }
    if (!code && !label) return false;

    var scope = {
      cc: code.toLowerCase(),
      country: label || code
    };
    var map = window.D3KybMapSearch;
    if (!map || typeof map.findBusinesses !== "function") return false;

    var needle = /meridian/i.test(candState.queryLabel || "")
      ? "meridian"
      : candState.queryLabel;
    var scoped = map.findBusinesses(needle, scope);
    if (!scoped.length && /meridian/i.test(candState.queryLabel || "")) {
      scoped = map.findBusinesses("meridian", scope);
    }

    if (!scoped.length) {
      if (map.setAwaitingCountry) map.setAwaitingCountry(false);
      if (map.plotResults) map.plotResults([], scope.country + " · no matches");
      playHtml(
        "<p>No businesses matching “" +
          esc(candState.queryLabel) +
          "” in <strong>" +
          esc(scope.country) +
          "</strong> in this demo. Try another country, or “Meridian, United States”.</p>"
      );
      candState.mode = "country";
      showAwaitingCountry(candState.queryLabel);
      setComposerPlaceholder(PLACEHOLDER.country);
      setSuggestions(SUGGEST_SEARCH);
      return true;
    }

    if (map.setAwaitingCountry) map.setAwaitingCountry(false);
    revealScopedMatches(scoped, scope);
    playCandidateResults(scoped, candState.queryLabel || "Meridian", scope);
    return true;
  }

  function showConfirmStep(biz) {
    if (!biz) return;
    ensureKybOpen();
    parkActive();
    hideFollow();
    showChatBack();
    if (!candState.root || !candState.root.isConnected) {
      candState.root = playHtml("");
      candState.root.classList.add("d3-kyb-cand-panel", "d3-kyb-agent-wrap");
    }
    candState.mode = "confirm";
    candState.pending = biz;
    setComposerPlaceholder(PLACEHOLDER.confirm);
    focusCandOnMap(biz);
    var addr = biz.addr || biz.city || "";
    var detail =
      esc(bizCountry(biz)) +
      " · " +
      esc(biz.reg) +
      (addr ? "<br>" + esc(addr) : "");
    /* Same chrome as data-d1-tpl="confirm" — mint announcement + sparkle icon. */
    candState.root.innerHTML =
      '<p class="ai-said">' +
      esc(biz.name) +
      "</p>" +
      '<div class="tds-announcement tds-announcement--info d1-confirm" data-d1-confirm-card>' +
      '<span class="tds-announcement__icon" data-d1-confirm-icon aria-hidden="true">' +
      '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
      '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="m3 13 6.5-6.5M10.5 3l.7 1.8L13 5.5l-1.8.7L10.5 8l-.7-1.8L8 5.5l1.8-.7L10.5 3ZM4 4.5l.4 1 .9.4-.9.4L4 7.5l-.4-1-.9-.4.9-.4L4 4.5Z"/>' +
      "</svg></span>" +
      '<div class="tds-announcement__content">' +
      '<p class="tds-announcement__title" data-d1-confirm-action>Run a KYB check on ' +
      esc(biz.name) +
      "?</p>" +
      '<p class="tds-announcement__message" data-d1-confirm-detail>' +
      detail +
      "</p>" +
      '<div class="tds-announcement__actions" data-d1-confirm-buttons>' +
      '<button type="button" class="tds-btn tds-btn--sm tds-btn--primary" data-d3-kyb-confirm="yes">Confirm</button>' +
      '<button type="button" class="tds-btn tds-btn--sm tds-btn--secondary" data-d3-kyb-confirm="no">Cancel</button>' +
      "</div></div></div>";
    stick();
  }

  function playCandidateResults(matches, queryLabel, opts) {
    opts = opts || {};
    hideFollow();
    candState.list = matches.slice();
    candState.filterIds = [];
    /* Pre-select the named country chip so the list + map stay scoped. */
    if (opts.cc || opts.country) {
      var defs = buildCandFilters(candState.list);
      var wantCc = String(opts.cc || "").toLowerCase();
      var chip = null;
      for (var i = 0; i < defs.length; i += 1) {
        if (!isCountryFilter(defs[i])) continue;
        if (wantCc && defs[i].id === wantCc) {
          chip = defs[i];
          break;
        }
        if (opts.country && defs[i].label === opts.country) {
          chip = defs[i];
          break;
        }
      }
      if (chip) candState.filterIds = [chip.id];
    }
    candState.queryLabel = queryLabel || "Meridian";
    candState.pending = null;
    candState.mode = "list";
    compareIds = matches.map(function (b) {
      return b.id;
    });
    var wrap = playHtml("");
    wrap.classList.add("d3-kyb-cand-panel");
    candState.root = wrap;
    showChatBack();
    paintCandidateList();
    syncMapToVisible();
    return wrap;
  }

  function confirmSelect(biz) {
    if (!biz) return;
    if (!candState.list.length) {
      candState.list = [biz];
      candState.filterIds = [];
      candState.queryLabel = biz.name;
    }
    showConfirmStep(biz);
  }

  function playStartingVerification(biz) {
    var name = (biz && biz.name) || "this business";
    var copy = "Start verification for <strong>" + esc(name) + "</strong>";
    showChatBack();
    setComposerPlaceholder(PLACEHOLDER.running);
    var node = clone("typing");
    if (!node) {
      playHtml("<p>" + copy + "</p>");
      return;
    }
    var label = node.querySelector("[data-d1-thinking-label]");
    if (label) label.innerHTML = copy;
    node.setAttribute("data-d3-kyb-starting", "");
    place(node);
  }

  function settleStartingVerification() {
    document.querySelectorAll("[data-d3-kyb-starting]").forEach(function (node) {
      var orb = node.querySelector(".d1-thinking__orb");
      if (orb) orb.remove();
      node.removeAttribute("data-d3-kyb-starting");
      node.removeAttribute("role");
      node.removeAttribute("aria-live");
    });
  }

  function runConfirmedVerify(biz) {
    var map = window.D3KybMapSearch;
    if (!biz || !map) return;
    playStartingVerification(biz);
    map.selectBusiness(biz, { skipUserTurn: true, confirmed: true });
  }

  async function playAnalysis(title, rows) {
    var node = clone("analysis");
    if (!node) return;
    node.querySelector("[data-d1-analysis-title]").textContent = title;
    var container = node.querySelector("[data-d1-analysis-rows]");
    place(node);
    for (var i = 0; i < rows.length; i += 1) {
      var r = rows[i];
      var isLast = i === rows.length - 1 && /overall|signal|verdict/i.test(r.label);
      if (isLast) {
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
        field.className =
          "tds-data-field tds-data-field--horizontal" + (r.status ? " d1-val--" + r.status : "");
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
      await sleep(100);
    }
  }

  async function playGuide(title, steps) {
    var node = clone("guide");
    if (!node) return;
    node.querySelector("[data-d1-guide-title]").textContent = title;
    var list = node.querySelector("[data-d1-guide-steps]");
    place(node);
    for (var i = 0; i < steps.length; i += 1) {
      var s = steps[i];
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
      stick();
      await sleep(90);
    }
  }

  async function playCompare(left, right) {
    var node = clone("compare");
    if (!node) {
      playHtml(
        "<p>" +
          esc(left.name) +
          " vs " +
          esc(right.name) +
          " — comparison components unavailable.</p>"
      );
      return;
    }
    node.querySelector("[data-d1-compare-left]").textContent = left.name;
    node.querySelector("[data-d1-compare-right]").textContent = right.name;
    var container = node.querySelector("[data-d1-compare-rows]");
    place(node);
    var rows = [
      { label: "Status", l: left.status, r: right.status },
      { label: "City", l: left.city, r: right.city },
      { label: "Risk", l: left.riskLevel || "low", r: right.riskLevel || "low", hl: riskHl(left, right) },
      {
        label: "Employees",
        l: sizingShort(left),
        r: sizingShort(right)
      },
      {
        label: "Flagged UBOs",
        l: String(flaggedCount(left)),
        r: String(flaggedCount(right)),
        hl: flaggedCount(left) === flaggedCount(right) ? "" : flaggedCount(left) > flaggedCount(right) ? "left" : "right"
      },
      {
        label: "Address type",
        l: isAgentAddr(left) ? "Registered agent" : "Operating",
        r: isAgentAddr(right) ? "Registered agent" : "Operating",
        hl: isAgentAddr(left) === isAgentAddr(right) ? "" : isAgentAddr(left) ? "left" : "right"
      }
    ];
    for (var i = 0; i < rows.length; i += 1) {
      var r = rows[i];
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
      await sleep(100);
    }
  }

  function riskHl(a, b) {
    var rank = { low: 0, medium: 1, high: 2 };
    var la = rank[a.riskLevel || "low"] || 0;
    var lb = rank[b.riskLevel || "low"] || 0;
    if (la === lb) return "";
    return la > lb ? "left" : "right";
  }

  function flaggedCount(biz) {
    return (biz.ownership || []).filter(function (o) {
      return o.flagged;
    }).length;
  }

  function isAgentAddr(biz) {
    return /1209 Orange|registered.agent/i.test(biz.addr + " " + ((biz.risks || []).map(function (r) { return r.id; }).join(" ")));
  }

  function sizingShort(biz) {
    var s = (biz.report && biz.report.sizing) || "";
    var m = s.match(/(\d+)\s*employees?/i);
    return m ? m[1] + " employees" : s || "—";
  }

  function needSelectionHtml() {
    return (
      '<div class="tds-announcement tds-announcement--info">' +
      '<span class="tds-announcement__icon" aria-hidden="true"><svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="m3 13 6.5-6.5M10.5 3l.7 1.8L13 5.5l-1.8.7L10.5 8l-.7-1.8L8 5.5l1.8-.7L10.5 3ZM4 4.5l.4 1 .9.4-.9.4L4 7.5l-.4-1-.9-.4.9-.4L4 4.5Z"/></svg></span>' +
      '<div class="tds-announcement__content"><p class="tds-announcement__message">Select or verify a business first. I only answer from the demo KYB dataset — try “Find Meridian”, then pick a company.</p></div></div>'
    );
  }

  /* ---- intent handlers ---- */

  async function handleFaq(parsed) {
    var html;
    if (parsed.topic === "info") {
      html =
        "<p><strong>What you’ll need to start a check</strong></p>" +
        "<ul>" +
        "<li>Legal business name (as registered)</li>" +
        "<li>Country / jurisdiction</li>" +
        "<li>Optional: registration number, address, or website to narrow matches</li>" +
        "</ul>" +
        "<p>No documents are required for this demo — search by name, then confirm the entity to run verification.</p>";
    } else if (parsed.topic === "countries") {
      html =
        "<p><strong>Supported jurisdictions (demo)</strong></p>" +
        "<p>This Meridian search spans <strong>United States, United Kingdom, Singapore, Sweden, Germany, and Australia</strong>. Name a country with the business (e.g. “Meridian, United States”), or I’ll ask which country to search before opening the map. The live product covers many more markets.</p>";
    } else {
      html =
        "<p><strong>How verification works</strong></p>" +
        "<ol>" +
        "<li>Search by business name — then pick a country if it wasn’t named</li>" +
        "<li>Confirm the correct legal entity from the matches</li>" +
        "<li>Run KYB — the report fills in overview, ownership / UBOs, and risk signals</li>" +
        "<li>Export when you need a shareable copy of the verified report</li>" +
        "</ol>";
    }
    playHtml(html);
    setSuggestions(SUGGEST_SEARCH);
  }

  function revealScopedMatches(matches, scope) {
    var map = window.D3KybMapSearch;
    if (!map || !matches || !matches.length) return;
    var caption =
      typeof map.matchCaption === "function"
        ? map.matchCaption(matches)
        : scope && scope.country
          ? scope.country + " · " + matches.length + " matches"
          : "Matches · " + matches.length;
    if (typeof map.revealMatches === "function") {
      map.revealMatches(matches, caption);
    } else {
      map.ensureMapSurface && map.ensureMapSurface();
      map.plotResults(matches, caption);
    }
  }

  async function handleFind(parsed, userText) {
    ensureKybOpen();
    parkActive();
    var map = window.D3KybMapSearch;
    if (!map) {
      playHtml("<p>Map search isn’t available yet. Refresh and try again.</p>");
      return;
    }
    var scope = { country: parsed.country || null, cc: parsed.cc || null };
    /* No jurisdiction yet — don't run a cross-border search; ask for country. */
    if (!scope.country && !scope.cc) {
      playCountryAsk(parsed.query || "Meridian");
      hideFollow();
      return;
    }
    var needle = /meridian/i.test(parsed.query || "") ? "meridian" : parsed.query;
    var matches = map.findBusinesses(needle, scope);
    if (!matches.length && /meridian/i.test(parsed.query || "")) {
      matches = map.findBusinesses("meridian", scope);
    }
    if (!matches.length) {
      map.ensureMapSurface();
      playHtml(
        "<p>No businesses in this demo dataset matched “" +
          esc(parsed.query) +
          "” in " +
          esc(scope.country) +
          ". Try another country, or “Meridian, United States”.</p>"
      );
      setSuggestions(SUGGEST_SEARCH);
      return;
    }
    revealScopedMatches(matches, scope);
    playCandidateResults(matches, parsed.query || "Meridian", scope);
    hideFollow();
  }

  async function handleVerify(parsed) {
    ensureKybOpen();
    parkActive();
    var map = window.D3KybMapSearch;
    var biz = parsed.biz || null;
    var scope = { country: parsed.country || null, cc: parsed.cc || null };
    /* Prefer multi-match disambiguation before any single findByName hit —
       “Meridian” must never auto-lock one US entity. */
    if (!biz && parsed.name && map) {
      if (!scope.country && !scope.cc) {
        playCountryAsk(parsed.name || "Meridian");
        hideFollow();
        return;
      }
      var loose = map.findBusinesses(parsed.name, scope);
      if (loose && loose.length > 1) {
        revealScopedMatches(loose, scope);
        playCandidateResults(loose, parsed.name || "Meridian", scope);
        hideFollow();
        return;
      }
      if (loose && loose.length === 1) biz = loose[0];
      else biz = map.findByName(parsed.name);
    }
    if (!biz && selected()) biz = selected();
    if (!biz) {
      playHtml(
        "<p>I couldn’t match that to a business in the demo KYB dataset. Try “Find Meridian” first, then verify a specific legal name.</p>"
      );
      setSuggestions(SUGGEST_SEARCH);
      return;
    }
    /* Exact unique legal name → confirm step (demo-2). */
    confirmSelect(biz);
  }

  async function handleOwnership(parsed) {
    var biz = selected();
    if (!biz) {
      playHtml(needSelectionHtml());
      setSuggestions(SUGGEST_SEARCH);
      return;
    }
    if (window.D3KybReport && window.D3KybReport.selectTab) {
      window.D3KybReport.selectTab("ownership");
    }
    var owners = biz.ownership || [];
    var list = parsed.flaggedOnly
      ? owners.filter(function (o) {
          return o.flagged;
        })
      : owners;
    if (!owners.length) {
      playHtml(
        "<p>No ownership / UBO records are attached to " +
          esc(biz.name) +
          " in this demo dataset.</p>"
      );
      setSuggestions(SUGGEST_AFTER);
      return;
    }
    if (parsed.flaggedOnly && !list.length) {
      playHtml(
        "<p>None of the ownership parties for " +
          esc(biz.name) +
          " are flagged in this dataset.</p>"
      );
      setSuggestions(SUGGEST_AFTER);
      return;
    }
    playHtml(
      "<p>Ownership for <strong>" +
        esc(biz.name) +
        "</strong> — I’ve opened the Ownership / UBO tab. Values below come from the demo filing extract.</p>"
    );
    var steps = list.map(function (o) {
      return {
        text:
          o.name +
          " · " +
          o.role +
          " · " +
          o.pct +
          (o.flagged ? " · Flagged — " + o.note : o.note ? " — " + o.note : ""),
        done: !o.flagged
      };
    });
    await playGuide("Beneficial owners", steps);
    playSuggestedAction({
      label: "Business Verification Report is ready",
      cta: "View",
      action: "view"
    });
    setSuggestions(SUGGEST_AFTER);
  }

  async function handleRisk() {
    var biz = selected();
    if (!biz) {
      playHtml(needSelectionHtml());
      setSuggestions(SUGGEST_SEARCH);
      return;
    }
    if (window.D3KybReport && window.D3KybReport.selectTab) {
      window.D3KybReport.selectTab(biz.risks && biz.risks.length ? "signals" : "overview");
    }
    var risks = biz.risks || [];
    if (!risks.length) {
      playHtml(
        "<p>" +
          esc(biz.name) +
          " has no elevated risk signals in this demo dataset. Sanctions / adverse-media screens are clear on the report.</p>"
      );
      await playAnalysis("Risk snapshot — " + biz.name, [
        { label: "Risk level", value: "Low", status: "positive" },
        { label: "Flagged UBOs", value: String(flaggedCount(biz)), status: "positive" },
        { label: "Sanctions", value: (biz.alerts && biz.alerts.sanctions) || "None found", status: "positive" },
        { label: "Overall signal", value: "Clear", status: "positive" }
      ]);
      setSuggestions(SUGGEST_AFTER);
      return;
    }
    playHtml(
      "<p>" +
        esc(biz.name) +
        " is flagged for review based on the evidence below. I’ve opened Match Signals on the report.</p>"
    );
    var rows = risks.map(function (r) {
      return {
        label: r.label,
        value: r.evidence,
        status: r.severity === "high" ? "negative" : "review"
      };
    });
    rows.push({
      label: "Overall signal",
      value: biz.riskLevel === "high" ? "Needs review" : "Review notes",
      status: "negative"
    });
    await playAnalysis("Why " + biz.name + " is flagged", rows);
    playSuggestedAction({
      label: "Business Verification Report is ready",
      cta: "View",
      action: "view"
    });
    setSuggestions(SUGGEST_AFTER);
  }

  async function handleCompare(parsed) {
    var pair = resolveCompareNames(parsed.text || "");
    if (pair.length < 2) {
      playHtml(
        "<p>I need two businesses from the demo dataset to compare. Try “Compare Meridian Capital and Meridian Global”, or find Meridian and verify two entities first.</p>"
      );
      setSuggestions(SUGGEST_SEARCH);
      return;
    }
    playHtml(
      "<p>Comparing <strong>" +
        esc(pair[0].name) +
        "</strong> and <strong>" +
        esc(pair[1].name) +
        "</strong> using only fields present in this KYB demo dataset.</p>"
    );
    await playCompare(pair[0], pair[1]);
    setSuggestions(SUGGEST_AFTER);
  }

  async function handleSummary() {
    var biz = selected();
    if (!biz) {
      playHtml(
        "<p>No business is selected yet. Tell me a company name and country to start a KYB search.</p>"
      );
      playCountryAsk("Meridian");
      hideFollow();
      return;
    }
    if (window.D3KybReport && window.D3KybReport.selectTab) {
      window.D3KybReport.selectTab("overview");
    }
    var r = biz.report || {};
    playHtml(
      "<p>" +
        esc(r.sumA || biz.name + " — summary from the demo filing extract.") +
        "</p>"
    );
    await playAnalysis("Summary — " + biz.name, [
      { label: "Status", value: biz.status, status: "positive" },
      { label: "Industry", value: r.industry || "—", status: "positive" },
      { label: "Address", value: biz.addr, status: isAgentAddr(biz) ? "review" : "positive" },
      { label: "Risk level", value: biz.riskLevel || "low", status: biz.riskLevel === "high" ? "negative" : biz.riskLevel === "medium" ? "review" : "positive" },
      { label: "Flagged UBOs", value: String(flaggedCount(biz)), status: flaggedCount(biz) ? "negative" : "positive" },
      {
        label: "Overall signal",
        value: biz.riskLevel === "high" ? "Needs review" : "Verified",
        status: biz.riskLevel === "high" ? "negative" : "positive"
      }
    ]);
    playSuggestedAction({
      label: "Business Verification Report is ready",
      cta: "View",
      action: "view"
    });
    setSuggestions(SUGGEST_AFTER);
  }

  async function handleTab(parsed) {
    var biz = selected();
    if (!biz) {
      playHtml(needSelectionHtml());
      setSuggestions(SUGGEST_SEARCH);
      return;
    }
    if (window.D3KybReport && window.D3KybReport.selectTab) {
      window.D3KybReport.selectTab(parsed.tab);
    }
    playHtml(
      "<p>Opened the <strong>" +
        esc(parsed.tab) +
        "</strong> section for " +
        esc(biz.name) +
        " on the report.</p>"
    );
    if (parsed.tab === "ownership") return handleOwnership({ flaggedOnly: false });
    if (parsed.tab === "signals") return handleRisk();
    setSuggestions(SUGGEST_AFTER);
  }

  async function handleTrading() {
    var biz = selected();
    if (!biz) {
      playHtml(needSelectionHtml());
      setSuggestions(SUGGEST_SEARCH);
      return;
    }
    if (window.D3KybReport && window.D3KybReport.selectTab) {
      window.D3KybReport.selectTab("overview");
    }
    var sizing = (biz.report && biz.report.sizing) || "";
    var employees = sizing.match(/(\d+)\s*employees?/i);
    var count = employees ? Number(employees[1]) : null;
    var traded = count != null ? count > 0 : !/0 employees|shell/i.test(sizing);
    playHtml(
      "<p>" +
        (traded
          ? esc(biz.name) +
            " shows operating signals in this dataset: " +
            esc(sizing) +
            " Evidence of staffing is on the Overview tab."
          : esc(biz.name) +
            " does not show trading activity in this demo extract (" +
            esc(sizing || "0 employees / shell profile") +
            "). That is a filing-based signal, not proof of inactivity outside the registry.") +
        "</p>"
    );
    playSuggestedAction({
      label: "Business Verification Report is ready",
      cta: "View",
      action: "view"
    });
    setSuggestions(SUGGEST_AFTER);
  }

  function playSuggestedAction(opts) {
    opts = opts || {};
    var biz = opts.biz || selected() || {};
    var regRaw = String(biz.reg || (biz.report && biz.report.regNumber) || "").trim();
    var regDigits = regRaw.match(/(\d[\d\s-]*\d|\d+)/);
    var regLabel = regDigits
      ? "Reg. " + regDigits[1].replace(/\s+/g, "")
      : regRaw;
    var addr = biz.addr || (biz.report && biz.report.address) || "";
    var html =
      '<div class="d1-report-ready d3-kyb-agent__action" data-d1-report-action>' +
      '<p class="d1-report-ready__title">' +
      esc(opts.label || "Business Verification Report is ready") +
      "</p>" +
      '<div class="d1-report-ready__card">' +
      '<span class="d1-report-ready__icon" aria-hidden="true"><i class="fa-regular fa-file-lines"></i></span>' +
      '<div class="d1-report-ready__meta">' +
      '<p class="d1-report-ready__name" data-d1-report-ready-name>' +
      esc(biz.name || "Verification report") +
      "</p>" +
      (addr
        ? '<p class="d1-report-ready__addr" data-d1-report-ready-addr>' +
          esc(addr) +
          "</p>"
        : "") +
      (regLabel
        ? '<p class="d1-report-ready__reg" data-d1-report-ready-reg>' +
          esc(regLabel) +
          "</p>"
        : "") +
      "</div>" +
      '<button type="button" class="tds-btn tds-btn--primary tds-btn--md">' +
      esc(opts.cta || "View") +
      "</button></div></div>";
    return playHtml(html);
  }

  async function respond(text) {
    if (busy || onTx()) return;
    if (!onKyb()) {
      /* Promote into KYB when user sends from agents hub with kyb intent */
      ensureKybOpen();
    }
    parkActive();
    hideFollow();
    setBusy(true);
    renderUser(text);
    historyTurns.push({ role: "user", text: text });

    try {
      /* Follow-up while waiting on a country: “United States” / “Germany”. */
      if (candState.mode === "country" && candState.list.length) {
        var placeReply = placeFromText(text);
        if (placeReply.country || placeReply.cc) {
          await playTyping(1200, "Scoping to " + (placeReply.country || "that country") + "…");
          if (
            applyCountryPick(
              placeReply.cc || "",
              placeReply.country || ""
            )
          ) {
            historyTurns.push({ role: "assistant", intent: "find" });
            return;
          }
        }
      }

      var parsed = parseQuery(text);
      await playTyping(2000, "Searching business registries…");
      if (parsed.intent === "faq") await handleFaq(parsed);
      else if (parsed.intent === "find") await handleFind(parsed, text);
      else if (parsed.intent === "verify") await handleVerify(parsed);
      else if (parsed.intent === "ownership") await handleOwnership(parsed);
      else if (parsed.intent === "risk") await handleRisk();
      else if (parsed.intent === "trading") await handleTrading();
      else if (parsed.intent === "compare") await handleCompare(parsed);
      else if (parsed.intent === "summary") await handleSummary();
      else if (parsed.intent === "tab") await handleTab(parsed);
      else {
        playHtml("<p>" + esc(parsed.message || "I can help with KYB search and verification.") + "</p>");
        setSuggestions(SUGGEST_SEARCH);
      }
      historyTurns.push({ role: "assistant", intent: parsed.intent });
    } catch (err) {
      playHtml("<p>Something went wrong handling that KYB request. Try again in a moment.</p>");
      setSuggestions(SUGGEST_SEARCH);
    } finally {
      setBusy(false);
      stick();
    }
  }

  /* ---- wiring ---- */

  thread.addEventListener("click", function (event) {
    if (!onKyb()) return;

    var exportBtn = event.target.closest("[data-d1-report-export], [data-d3-kyb-action='export'], .d1-alert__export");
    if (exportBtn) {
      event.preventDefault();
      var pageExport = document.querySelector("[data-d3-kyb-export]");
      if (pageExport && !pageExport.hidden) pageExport.click();
      else {
        document.dispatchEvent(new CustomEvent("d3-kyb:export", { detail: {} }));
      }
      return;
    }

    var confirmBtn = event.target.closest("[data-d3-kyb-confirm]");
    if (confirmBtn) {
      event.preventDefault();
      var answer = confirmBtn.getAttribute("data-d3-kyb-confirm");
      if (answer === "yes" && candState.pending) {
        var chosen = candState.pending;
        candState.pending = null;
        runConfirmedVerify(chosen);
      } else {
        paintCandidateList();
        restoreMapList();
      }
      return;
    }

    var countryPick = event.target.closest("[data-d3-kyb-country-pick]");
    if (countryPick) {
      event.preventDefault();
      applyCountryPick(
        countryPick.getAttribute("data-d3-kyb-country-pick") || "",
        countryPick.getAttribute("data-d3-kyb-country-label") || ""
      );
      return;
    }

    var filterBtn = event.target.closest("[data-d3-kyb-filter]");
    if (filterBtn && !filterBtn.disabled) {
      event.preventDefault();
      var fid = filterBtn.getAttribute("data-d3-kyb-filter");
      var idx = candState.filterIds.indexOf(fid);
      if (idx === -1) candState.filterIds.push(fid);
      else candState.filterIds.splice(idx, 1);
      paintCandidateList();
      return;
    }

    var cand = event.target.closest("[data-d3-kyb-cand], .ai-cand");
    if (cand) {
      event.preventDefault();
      var candId = cand.getAttribute("data-d3-kyb-cand") || cand.getAttribute("data-id");
      var candBiz = window.D3KybMapSearch && window.D3KybMapSearch.findById(candId);
      if (candBiz) showConfirmStep(candBiz);
      return;
    }

    var btn = event.target.closest("[data-d3-kyb-select]");
    if (!btn) return;
    event.preventDefault();
    var id = btn.getAttribute("data-d3-kyb-select");
    var biz = window.D3KybMapSearch && window.D3KybMapSearch.findById(id);
    if (!biz) return;
    confirmSelect(biz);
  });

  thread.addEventListener("mouseover", function (event) {
    if (!onKyb() || candState.mode !== "list") return;
    var card = event.target.closest(".ai-cand");
    if (!card || !thread.contains(card)) return;
    var id = card.getAttribute("data-id");
    thread.querySelectorAll(".ai-cand").forEach(function (el) {
      el.classList.toggle("ai-cand--on", el === card);
    });
    if (window.D3KybMapSearch && window.D3KybMapSearch.highlightMarker) {
      window.D3KybMapSearch.highlightMarker(id);
    }
  });

  thread.addEventListener("mouseout", function (event) {
    if (!onKyb() || candState.mode !== "list") return;
    var card = event.target.closest(".ai-cand");
    if (!card || !thread.contains(card)) return;
    var related = event.relatedTarget;
    if (related && card.contains(related)) return;
    card.classList.remove("ai-cand--on");
    if (window.D3KybMapSearch && window.D3KybMapSearch.highlightMarker) {
      window.D3KybMapSearch.highlightMarker(null);
    }
  });

  document.addEventListener("d3-kyb:report-ready", function () {
    if (!onKyb()) return;
    setComposerPlaceholder(PLACEHOLDER.report);
    setSuggestions(SUGGEST_AFTER);
    stick();
  });

  document.addEventListener("d3-kyb:export", function () {
    if (window.showToast) return;
    var el = document.createElement("div");
    el.className = "tds-announcement tds-announcement--inline tds-announcement--success d1-toast";
    el.innerHTML =
      '<span class="tds-announcement__icon" aria-hidden="true"><i class="fa-regular fa-circle-check" aria-hidden="true"></i></span>' +
      '<div class="tds-announcement__content"><p class="tds-announcement__message">Export started for the verification report.</p></div>';
    document.body.appendChild(el);
    window.setTimeout(function () {
      if (el.parentNode) el.remove();
    }, 2800);
  });

  composer.addEventListener(
    "d1-composer:submit",
    function (event) {
      if (onTx()) return;
      if (!onKyb()) return;
      event.stopImmediatePropagation();
      var detail = event.detail || {};
      var text = detail.text || "";
      if (!text || busy) return;
      respond(text);
    },
    true
  );

  if (follow) {
    follow.addEventListener(
      "click",
      function (event) {
        if (onTx() || !onKyb()) return;
        var btn = event.target.closest("[data-d1-suggest]");
        if (!btn) return;
        var text =
          btn.getAttribute("data-d3-kyb-suggest") ||
          (btn.querySelector("span") && btn.querySelector("span").textContent.trim()) ||
          "";
        if (!text) return;
        event.stopImmediatePropagation();
        respond(text);
      },
      true
    );
  }

  document.addEventListener(
    "d3-chat:send",
    function (event) {
      if (onTx()) return;
      var detail = event.detail || {};
      if (detail.agent && detail.agent !== "kyb") return;
      /* Only hijack when already in KYB mode, or agent explicitly kyb. */
      if (!onKyb() && detail.agent !== "kyb") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      var text = detail.text || "";
      if (!text) return;
      ensureKybOpen();
      respond(text);
    },
    true
  );

  document.addEventListener("d3-view:kyb", function () {
    setComposerPlaceholder(PLACEHOLDER.search);
    setSuggestions(SUGGEST_SEARCH);
  });

  /* Drop the starting orb once the report chrome / business match is on screen. */
  document.addEventListener("d3-kyb:verify-ui-ready", settleStartingVerification);

  window.D3KybAgent = {
    respond: respond,
    parseQuery: parseQuery,
    selected: selected,
    confirmSelect: confirmSelect,
    showMatches: playCandidateResults,
    askCountry: playCountryAsk,
    setComposerPlaceholder: setComposerPlaceholder,
    PLACEHOLDER: PLACEHOLDER,
    /* Chat history (js/d3-chat-history.js): serialise / re-attach the candidate
       panel state so a restored thread's Confirm / filter chips still work. */
    getState: function () {
      return {
        mode: candState.mode,
        queryLabel: candState.queryLabel,
        filterIds: (candState.filterIds || []).slice(),
        listIds: (candState.list || []).map(function (b) { return b.id; }),
        pendingId: candState.pending ? candState.pending.id : null,
        turns: historyTurns.slice(-12)
      };
    },
    restoreState: function (st) {
      if (!st) return;
      var find = window.D3KybMapSearch && window.D3KybMapSearch.findById;
      var panels = thread.querySelectorAll(".d3-kyb-cand-panel");
      candState.root = panels.length ? panels[panels.length - 1] : null;
      candState.list = (st.listIds || []).map(function (id) { return find ? find(id) : null; }).filter(Boolean);
      candState.filterIds = (st.filterIds || []).slice();
      candState.queryLabel = st.queryLabel || "Meridian";
      candState.mode = st.mode || "list";
      candState.pending = st.pendingId && find ? find(st.pendingId) : null;
      historyTurns = (st.turns || []).slice();
      busy = false;
    }
  };
})();
