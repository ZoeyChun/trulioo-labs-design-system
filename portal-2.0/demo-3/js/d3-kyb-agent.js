/* Demo 3 — KYB Agent: grounded NL over the Meridian US demo dataset. */
(function () {
  var shell = document.querySelector(".d1-shell");
  var composer = document.querySelector("[data-d1-composer]");
  var thread = document.querySelector("[data-d1-thread]");
  var follow = document.querySelector("[data-d1-follow]");
  if (!shell || !composer || !thread) return;

  var busy = false;
  var historyTurns = [];
  var compareIds = [];

  var SUGGEST_SEARCH = [
    { q: "Find Meridian" },
    { q: "Verify Meridian Capital LLC" },
    { q: "Who owns this business?" }
  ];
  var SUGGEST_AFTER = [
    { q: "Why is this entity high risk?" },
    { q: "Who ultimately owns this business?" },
    { q: "Has this entity ever traded?" }
  ];

  function onKyb() {
    return (
      shell.getAttribute("data-d3-chat-mode") === "kyb" ||
      shell.getAttribute("data-d3-view") === "chat"
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

  function parseQuery(text) {
    var q = String(text || "").trim();
    var lower = q.toLowerCase();

    if (/^(find|search|look up|locate)\b/.test(lower) || /^meridian$/i.test(q)) {
      var needle = q.replace(/^(find|search|look up|locate)\s+/i, "").trim() || "Meridian";
      return { intent: "find", query: needle };
    }

    if (/^verify\b|run (a )?kyb|start verification|check (this |the )?business/.test(lower)) {
      var name = q.replace(/^verify\s+/i, "").replace(/\b(please|now)\b/gi, "").trim();
      return { intent: "verify", name: name || null };
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
      return { intent: "tab", tab: /source/.test(lower) ? "sources" : "raw" };
    }

    /* Bare company name from dataset */
    var hit = window.D3KybMapSearch && window.D3KybMapSearch.findByName(q);
    if (hit && q.length > 8) {
      return { intent: "verify", name: hit.name, biz: hit };
    }

    if (/meridian/i.test(q)) {
      return { intent: "find", query: "Meridian" };
    }

    return {
      intent: "help",
      message:
        "I can search the demo KYB dataset, verify a matched business, explain ownership / UBOs, surface risk signals, or compare two Meridian entities. Try “Find Meridian” or “Verify Meridian Capital LLC”. I won’t invent businesses that aren’t in this dataset."
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

  async function playTyping(ms) {
    var node = clone("typing");
    if (!node) {
      await sleep(ms);
      return;
    }
    place(node);
    await sleep(ms);
    node.remove();
  }

  function playHtml(html) {
    var wrap = document.createElement("div");
    wrap.className = "d1-ai d1-enter d3-kyb-agent-wrap";
    wrap.innerHTML = html;
    place(wrap);
    return wrap;
  }

  function toneTag(level) {
    if (level === "high") return '<span class="d1-tag d1-tag--negative">High risk</span>';
    if (level === "medium") return '<span class="d1-tag d1-tag--review">Medium risk</span>';
    return '<span class="d1-tag d1-tag--positive">Low risk</span>';
  }

  function bizCardsHtml(list, lead) {
    var html =
      '<div class="d3-kyb-agent">' +
      (lead ? "<p>" + esc(lead) + "</p>" : "") +
      '<ul class="d3-kyb-agent__list">';
    list.forEach(function (biz) {
      html +=
        '<li class="d3-kyb-agent__item">' +
        '<article class="d3-kyb-agent__card">' +
        '<span class="d3-kyb-agent__name">' +
        esc(biz.name) +
        "</span>" +
        toneTag(biz.riskLevel || "low") +
        '<span class="d3-kyb-agent__meta">' +
        esc(biz.city) +
        " · " +
        esc(biz.reg) +
        " · " +
        esc(biz.status) +
        "</span>" +
        '<span class="d3-kyb-agent__detail">' +
        esc(biz.brief) +
        "</span>" +
        '<button type="button" class="tds-btn tds-btn--primary tds-btn--md d3-kyb-agent__cta" data-d3-kyb-select="' +
        esc(biz.id) +
        '">Verify business</button>' +
        "</article></li>";
    });
    return html + "</ul></div>";
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
      '<span class="tds-announcement__icon" aria-hidden="true"><img src="assets/icons/sparkles-ai.svg" alt="" width="16" height="16"></span>' +
      '<div class="tds-announcement__content"><p class="tds-announcement__message">Select or verify a business first. I only answer from the demo KYB dataset — try “Find Meridian”, then pick a company.</p></div></div>'
    );
  }

  /* ---- intent handlers ---- */

  async function handleFind(parsed, userText) {
    ensureKybOpen();
    parkActive();
    var map = window.D3KybMapSearch;
    if (!map) {
      playHtml("<p>Map search isn’t available yet. Refresh and try again.</p>");
      return;
    }
    /* Agent already rendered the user turn — show location, then zoom to matches. */
    var matches = map.findBusinesses(/meridian/i.test(parsed.query) ? "meridian" : parsed.query);
    if (!matches.length && /meridian/i.test(parsed.query)) matches = businesses().slice();
    if (matches.length) {
      if (typeof map.revealMatches === "function") {
        map.revealMatches(
          matches,
          matches.length === businesses().length
            ? "United States · 5 Meridian matches"
            : "Matches · " + matches.length
        );
      } else {
        map.ensureMapSurface();
        map.plotResults(
          matches,
          matches.length === businesses().length
            ? "United States · 5 Meridian matches"
            : "Matches · " + matches.length
        );
      }
    } else {
      map.ensureMapSurface();
    }
    if (!matches.length) {
      playHtml(
        "<p>No businesses in this demo dataset matched “" +
          esc(parsed.query) +
          "”. Available names include Meridian Capital LLC, Meridian Global Partners Inc., Meridian Analytics Inc., Meridian Industrial Holdings LLC, and Meridian Energy Partners LP.</p>"
      );
      setSuggestions(SUGGEST_SEARCH);
      return;
    }
    playHtml(
      bizCardsHtml(
        matches,
        "I found " +
          matches.length +
          " match" +
          (matches.length === 1 ? "" : "es") +
          " in the demo dataset. They’re plotted on the map — tap a card to start verification."
      )
    );
    compareIds = matches.map(function (b) {
      return b.id;
    });
    /* Also mirror similar cards for visual continuity */
    if (matches.length > 1 && typeof map.runSearch === "function") {
      /* suggestions already on map via plot; skip duplicate appendTurn from runSearch */
    }
    setSuggestions(SUGGEST_AFTER);
  }

  async function handleVerify(parsed) {
    ensureKybOpen();
    parkActive();
    var map = window.D3KybMapSearch;
    var biz = parsed.biz || null;
    if (!biz && parsed.name) biz = map && map.findByName(parsed.name);
    if (!biz && selected()) biz = selected();
    if (!biz && parsed.name) {
      var loose = map && map.findBusinesses(parsed.name);
      if (loose && loose.length === 1) biz = loose[0];
      else if (loose && loose.length > 1) {
        map.ensureMapSurface();
        map.plotResults(loose, "Matches · " + loose.length);
        playHtml(
          bizCardsHtml(
            loose,
            "“" +
              esc(parsed.name) +
              "” matches more than one entity. Pick the legal name to verify — I won’t guess."
          )
        );
        setSuggestions(SUGGEST_AFTER);
        return;
      }
    }
    if (!biz) {
      playHtml(
        "<p>I couldn’t match that to a business in the demo KYB dataset. Try “Find Meridian” first, then verify a specific legal name.</p>"
      );
      setSuggestions(SUGGEST_SEARCH);
      return;
    }
    playHtml(
      "<p>Starting verification for <strong>" +
        esc(biz.name) +
        "</strong>. I’ll progressively fill the report on the right as registry, ownership, and sanctions checks complete.</p>"
    );
    map.selectBusiness(biz, { skipUserTurn: true });
    /* Suggestions + Export action appear when d3-kyb:report-ready fires. */
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
      label: "Verification report is ready",
      cta: "Export",
      action: "export"
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
      label: "Verification report is ready",
      cta: "Export",
      action: "export"
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
      var all = businesses();
      playHtml(
        "<p>No business is selected yet. Here’s the demo dataset I can verify (" +
          all.length +
          " Meridian entities).</p>"
      );
      playHtml(bizCardsHtml(all, null));
      setSuggestions(SUGGEST_SEARCH);
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
      label: "Verification report is ready",
      cta: "Export",
      action: "export"
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
      label: "Verification report is ready",
      cta: "Export",
      action: "export"
    });
    setSuggestions(SUGGEST_AFTER);
  }

  function playSuggestedAction(opts) {
    opts = opts || {};
    var html =
      '<div class="d1-alert d3-kyb-agent__action" data-d1-report-action>' +
      '<img src="assets/icons/memo.svg" alt="" width="16" height="16">' +
      "<span>" +
      esc(opts.label || "Verification report is ready") +
      "</span>" +
      '<button type="button" class="tds-btn tds-btn--primary tds-btn--md d1-alert__export" data-d3-kyb-action="' +
      esc(opts.action || "export") +
      '">' +
      esc(opts.cta || "Export") +
      "</button></div>";
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

    var parsed = parseQuery(text);
    try {
      await playTyping(420);
      if (parsed.intent === "find") await handleFind(parsed, text);
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
    var exportBtn = event.target.closest("[data-d1-report-export], [data-d3-kyb-action='export'], .d1-alert__export");
    if (exportBtn && onKyb()) {
      event.preventDefault();
      var pageExport = document.querySelector("[data-d3-kyb-export]");
      if (pageExport && !pageExport.hidden) pageExport.click();
      else {
        document.dispatchEvent(new CustomEvent("d3-kyb:export", { detail: {} }));
      }
      return;
    }
    var btn = event.target.closest("[data-d3-kyb-select]");
    if (!btn || !onKyb()) return;
    event.preventDefault();
    var id = btn.getAttribute("data-d3-kyb-select");
    var biz = window.D3KybMapSearch && window.D3KybMapSearch.findById(id);
    if (!biz) return;
    respond("Verify " + biz.name);
  });

  document.addEventListener("d3-kyb:report-ready", function () {
    if (!onKyb()) return;
    setSuggestions(SUGGEST_AFTER);
    stick();
  });

  document.addEventListener("d3-kyb:export", function () {
    if (window.showToast) return;
    var el = document.createElement("div");
    el.className = "tds-announcement tds-announcement--inline tds-announcement--success d1-toast";
    el.innerHTML =
      '<span class="tds-announcement__icon" aria-hidden="true"><img src="assets/icons/circle-check.svg" alt="" width="16" height="16"></span>' +
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
    setSuggestions(SUGGEST_SEARCH);
  });

  window.D3KybAgent = {
    respond: respond,
    parseQuery: parseQuery,
    selected: selected
  };
})();
