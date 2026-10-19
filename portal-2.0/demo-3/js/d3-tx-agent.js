/* Demo 3 — Transaction Agent: grounded NL over the live UT_TRANSACTIONS table. */
(function () {
  var shell = document.querySelector(".d1-shell");
  var frame = document.querySelector("[data-d3-tx-frame]");
  var composer = document.querySelector("[data-d1-composer]");
  var thread = document.querySelector("[data-d1-thread]");
  var follow = document.querySelector("[data-d1-follow]");
  if (!shell || !composer || !thread) return;

  var pending = {};
  var reqSeq = 0;
  var busy = false;
  var historyTurns = [];
  var lastMatches = [];
  var lastIntent = null;

  var SUGGEST_FILTER = [
    { q: "Show declined transactions", intent: "declined" },
    { q: "Find high-risk transactions", intent: "high-risk" },
    { q: "Find transactions requiring review", intent: "review" }
  ];
  var SUGGEST_AFTER = [
    { q: "Summarize recent activity", intent: "summary" },
    { q: "Show verified transactions only", intent: "verified" },
    { q: "Clear filters and show all", intent: "clear" }
  ];

  function onTransactions() {
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
    if (!scroller) return;
    scroller.scrollTop = scroller.scrollHeight;
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

  function setSuggestions(list) {
    if (!follow) return;
    var rows = follow.querySelectorAll("[data-d1-suggest]");
    rows.forEach(function (btn, i) {
      var span = btn.querySelector("span");
      if (list[i] && span) {
        span.textContent = list[i].q;
        btn.setAttribute("data-d3-tx-suggest", list[i].q);
      }
    });
    follow.classList.add("is-on");
    follow.hidden = false;
  }

  function hideFollow() {
    if (follow) {
      follow.classList.remove("is-on");
      follow.hidden = true;
    }
  }

  function parkActive() {
    if (window.D3Nav) window.D3Nav.markChatActive();
    document.dispatchEvent(new CustomEvent("d3-kyb:park-composer"));
    var pane = document.querySelector("[data-d3-chat-pane]");
    if (pane) pane.classList.add("is-active");
  }

  /* ---- iframe bridge ---- */

  function frameWin() {
    return frame && frame.contentWindow ? frame.contentWindow : null;
  }

  function sendCmd(cmd, extra) {
    return new Promise(function (resolve, reject) {
      var win = frameWin();
      if (!win) {
        reject(new Error("iframe-missing"));
        return;
      }
      var id = "tx-" + (++reqSeq);
      var timer = window.setTimeout(function () {
        delete pending[id];
        reject(new Error("timeout"));
      }, 4000);
      pending[id] = { resolve: resolve, reject: reject, timer: timer };
      var payload = { type: "d3-tx-cmd", cmd: cmd, requestId: id };
      if (extra) {
        Object.keys(extra).forEach(function (k) {
          payload[k] = extra[k];
        });
      }
      win.postMessage(payload, "*");
    });
  }

  window.addEventListener("message", function (event) {
    var data = event.data;
    if (!data || !data.requestId || !pending[data.requestId]) return;
    if (
      data.type !== "d3-tx-result" &&
      data.type !== "d3-tx-state" &&
      data.type !== "d3-tx-opened" &&
      data.type !== "d3-tx-error" &&
      data.type !== "d3-tx-ready"
    ) {
      return;
    }
    var slot = pending[data.requestId];
    delete pending[data.requestId];
    window.clearTimeout(slot.timer);
    if (data.type === "d3-tx-error") slot.reject(new Error(data.error || "error"));
    else slot.resolve(data);
  });

  async function applySpec(spec) {
    try {
      var res = await sendCmd("applySpec", { spec: spec });
      return res.result;
    } catch (err) {
      /* Fallback: filter local dataset if iframe not ready. */
      return localApply(spec);
    }
  }

  async function openTrid(trid) {
    try {
      await sendCmd("openTrid", { trid: trid });
    } catch (err) {
      var row = findLocal(trid);
      if (!row) return;
      var kind = productToKind(row.product);
      document.dispatchEvent(new CustomEvent("d1-drawer:open", { detail: { kind: kind } }));
    }
  }

  function productToKind(product) {
    var p = String(product || "").toLowerCase();
    if (p.indexOf("device") !== -1) return "device";
    if (p.indexOf("bank") !== -1) return "bank";
    if (p.indexOf("kyb") !== -1 || p.indexOf("business") !== -1) return "report";
    return "kyc";
  }

  function allRows() {
    return (window.UT_TRANSACTIONS || []).slice();
  }

  function findLocal(trid) {
    var list = allRows();
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].trid === trid) return list[i];
      if (list[i].children) {
        for (var j = 0; j < list[i].children.length; j += 1) {
          if (list[i].children[j].trid === trid) return list[i].children[j];
        }
      }
    }
    return null;
  }

  function snap(item) {
    return {
      name: item.name,
      trid: item.trid || "",
      detail: item.detail || "",
      outcome: (item.outcome && item.outcome.label) || "",
      tone: (item.outcome && item.outcome.tone) || "",
      date: item.date,
      product: item.product,
      country: item.country,
      source: item.source || "",
      type: item.type || "",
      risk: riskOf(item),
      scoreLabel: (item.score && item.score.label) || "",
      scoreValue: (item.score && item.score.value) || ""
    };
  }

  function riskOf(item) {
    if (!item.score || !item.score.label) return "";
    var label = item.score.label.toLowerCase();
    if (label.indexOf("high") !== -1) return "high";
    if (label.indexOf("medium") !== -1) return "medium";
    if (label.indexOf("low") !== -1) return "low";
    return "";
  }

  function isUnsuccessful(item) {
    var outcome = item.outcome || {};
    if (outcome.tone === "negative") return true;
    var label = outcome.label || "";
    return (
      label === "Not Verified" ||
      label === "Hits Found" ||
      label === "Flagged" ||
      label === "Failed"
    );
  }

  function isReview(item) {
    var label = (item.outcome && item.outcome.label) || "";
    return label === "Review" || label === "Pending Review" || label === "In Progress";
  }

  function isVerified(item) {
    var label = (item.outcome && item.outcome.label) || "";
    return label === "Verified" || label === "No Hits Found" || label === "Clear";
  }

  function localApply(spec) {
    var rows = allRows();
    var out = rows.filter(function (item) {
      if (spec.predicate === "unsuccessful" && !isUnsuccessful(item)) return false;
      if (spec.predicate === "review" && !isReview(item)) return false;
      if (spec.predicate === "high-risk") {
        var r = riskOf(item);
        if (r !== "high" && !(item.score && item.score.tone === "negative")) return false;
      }
      if (spec.predicate === "verified" && !isVerified(item)) return false;
      if (spec.search) {
        var hay = [item.name, item.country, item.trid, item.detail, item.product]
          .join(" ")
          .toLowerCase();
        if (hay.indexOf(String(spec.search).toLowerCase()) === -1) return false;
      }
      if (spec.country && item.country !== spec.country) return false;
      if (spec.risks && spec.risks.length) {
        if (spec.risks.indexOf(riskOf(item)) === -1) return false;
      }
      if (spec.product) {
        if (item.product !== spec.product) return false;
      }
      return true;
    });
    return {
      matches: out.map(snap),
      total: rows.length,
      visibleCount: out.length,
      filters: spec
    };
  }

  /* ---- NL intent parsing (grounded only) ---- */

  function knownCountries() {
    var map = {};
    allRows().forEach(function (r) {
      if (r.country) map[r.country.toLowerCase()] = r.country;
    });
    return map;
  }

  function knownNames() {
    var map = {};
    allRows().forEach(function (r) {
      if (r.name) map[r.name.toLowerCase()] = r.name;
    });
    return map;
  }

  function parseQuery(text) {
    var q = String(text || "").trim();
    var lower = q.toLowerCase();
    var spec = { clear: true };
    var intent = "general";
    var layout = "list"; /* list | analysis | guide | text */

    if (/^(clear|reset|show all|remove filters)/i.test(lower) || /clear filters|show everything|reset (the )?table/.test(lower)) {
      return { intent: "clear", spec: { clear: true, predicate: null }, layout: "text", label: "all transactions" };
    }

    if (/summar(y|ize|ise)|overview|trends|pattern|recent activity|what('s| is) going on/.test(lower)) {
      intent = "summary";
      layout = "analysis";
      if (/7 days|week|recent/.test(lower)) spec.dateDays = 7;
      return { intent: intent, spec: spec, layout: layout, label: "recent activity" };
    }

    if (/high[- ]?risk|elevated risk|risky/.test(lower)) {
      intent = "high-risk";
      spec.predicate = "high-risk";
      spec.risks = ["high"];
      return { intent: intent, spec: spec, layout: "list", label: "high-risk transactions" };
    }

    if (/medium[- ]?risk/.test(lower)) {
      intent = "medium-risk";
      spec.risks = ["medium"];
      return { intent: intent, spec: spec, layout: "list", label: "medium-risk transactions" };
    }

    if (/low[- ]?risk/.test(lower)) {
      intent = "low-risk";
      spec.risks = ["low"];
      return { intent: intent, spec: spec, layout: "list", label: "low-risk transactions" };
    }

    if (/review|pending|in progress|needs? attention|requiring review/.test(lower)) {
      intent = "review";
      spec.predicate = "review";
      spec.outcomes = ["intermediate"];
      return { intent: intent, spec: spec, layout: "list", label: "transactions requiring review" };
    }

    if (/declin|fail|not verif|unsuccessful|negative|hit(s)? found|flagged|rejected/.test(lower)) {
      intent = "declined";
      spec.predicate = "unsuccessful";
      if (/7 days|last week|past week/.test(lower)) spec.dateDays = 7;
      return { intent: intent, spec: spec, layout: "list", label: "declined or unsuccessful verifications" };
    }

    if (/verif(ied|ication)?|positive|clear|no hits|accepted|passed/.test(lower) && !/not verif/.test(lower)) {
      intent = "verified";
      spec.outcomes = ["positive"];
      return { intent: intent, spec: spec, layout: "list", label: "verified transactions" };
    }

    if (/abandon|timed out|not completed|not started/.test(lower)) {
      intent = "not-completed";
      spec.outcomes = ["not-completed"];
      return { intent: intent, spec: spec, layout: "list", label: "incomplete transactions" };
    }

    if (/device/.test(lower)) {
      intent = "product-device";
      spec.search = "Device Intelligence";
      return { intent: intent, spec: spec, layout: "list", label: "Device Intelligence transactions" };
    }
    if (/bank/.test(lower)) {
      intent = "product-bank";
      spec.search = "Bank";
      return { intent: intent, spec: spec, layout: "list", label: "bank verification transactions" };
    }
    if (/\bkyb\b|business/.test(lower)) {
      intent = "product-kyb";
      spec.search = "Business";
      return { intent: intent, spec: spec, layout: "list", label: "business verification transactions" };
    }
    if (/\bkyc\b|document/.test(lower)) {
      intent = "product-kyc";
      spec.search = "KYC";
      return { intent: intent, spec: spec, layout: "list", label: "KYC transactions" };
    }
    if (/watchlist/.test(lower)) {
      intent = "product-watchlist";
      spec.search = "Watchlist";
      return { intent: intent, spec: spec, layout: "list", label: "watchlist screening transactions" };
    }

    if (/explain|what happened|tell me about|open |details? (for|on|about)/.test(lower)) {
      intent = "explain";
      layout = "guide";
    }

    /* Country match */
    var countries = knownCountries();
    var countryHit = null;
    Object.keys(countries).forEach(function (key) {
      if (lower.indexOf(key) !== -1) countryHit = countries[key];
    });
    if (/united states|\busa\b|\bu\.s\./.test(lower)) countryHit = countryHit || "United States";
    if (/united kingdom|\buk\b/.test(lower)) countryHit = countryHit || "United Kingdom";
    if (countryHit) {
      spec.country = countryHit;
      intent = intent === "general" || intent === "explain" ? "country" : intent;
      return {
        intent: intent,
        spec: spec,
        layout: layout === "guide" ? "list" : layout,
        label: "transactions in " + countryHit
      };
    }

    /* Exact / partial name from dataset */
    var names = knownNames();
    var nameHit = null;
    Object.keys(names).forEach(function (key) {
      if (key.length >= 3 && lower.indexOf(key) !== -1) nameHit = names[key];
    });
    var quoted = q.match(/["“](.+?)["”]/) || q.match(/'([^']+)'/);
    if (quoted) {
      var needle = quoted[1].toLowerCase();
      Object.keys(names).forEach(function (key) {
        if (key.indexOf(needle) !== -1 || needle.indexOf(key) !== -1) nameHit = names[key];
      });
      if (!nameHit) {
        spec.search = quoted[1];
        return { intent: "search", spec: spec, layout: "list", label: 'matches for "' + quoted[1] + '"' };
      }
    }
    if (nameHit) {
      spec.search = nameHit;
      return {
        intent: intent === "explain" ? "explain" : "search",
        spec: spec,
        layout: intent === "explain" ? "guide" : "list",
        label: "transactions for " + nameHit,
        focusName: nameHit
      };
    }

    if (/sort|order by/.test(lower)) {
      return {
        intent: "sort",
        spec: null,
        layout: "text",
        label: null,
        message:
          "I can filter and search the table from chat, but column sorting is available on the table headers. Click a column header (Outcome, Date, Product, Country) to sort."
      };
    }

    /* Generic search: use first meaningful token against dataset */
    if (/show|find|filter|search|list|get|where/.test(lower)) {
      var tokens = lower.replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter(function (t) {
        return t.length > 2 && !/^(show|find|filter|search|list|get|the|and|for|with|from|that|this|all|any|me|please|transactions?|verifications?)$/.test(t);
      });
      if (tokens.length) {
        spec.search = tokens.join(" ");
        return { intent: "search", spec: spec, layout: "list", label: 'matches for "' + tokens.join(" ") + '"' };
      }
    }

    return {
      intent: "help",
      spec: null,
      layout: "text",
      label: null,
      message:
        "I can answer from the transactions currently in this table. Try “Show declined transactions”, “Find high-risk transactions”, “Summarize recent activity”, or ask about a name or country that appears in the data."
    };
  }

  /* ---- response builders (grounded) ---- */

  function toneTag(tone, label) {
    var cls = "d1-tag";
    if (tone === "positive") cls += " d1-tag--positive";
    else if (tone === "negative") cls += " d1-tag--negative";
    else cls += " d1-tag--review";
    return '<span class="' + cls + '">' + esc(label) + "</span>";
  }

  function buildListHtml(matches, label, intro) {
    var n = matches.length;
    var noun = n === 1 ? "transaction" : "transactions";
    var html =
      '<div class="d3-tx-agent">' +
      '<p class="d3-tx-agent__found">Found ' +
      n +
      " " +
      noun +
      (label ? " · " + esc(label) : "") +
      "</p>" +
      "<p>" +
      esc(intro) +
      "</p>";

    if (!n) {
      html +=
        '<div class="tds-announcement tds-announcement--info d3-tx-agent__empty">' +
        '<span class="tds-announcement__icon" aria-hidden="true"><img src="assets/icons/sparkles-ai.svg" alt="" width="16" height="16"></span>' +
        '<div class="tds-announcement__content"><p class="tds-announcement__message">Nothing in the current dataset matched that request. I only use the transactions shown in this demo — I won’t invent rows.</p></div>' +
        "</div>";
      return html + "</div>";
    }

    html += '<ul class="d3-tx-agent__list">';
    matches.slice(0, 8).forEach(function (item) {
      html +=
        '<li class="d3-tx-agent__item">' +
        '<button type="button" class="d3-tx-agent__open" data-d3-tx-open="' +
        esc(item.trid) +
        '">' +
        '<span class="d3-tx-agent__name">' +
        esc(item.name) +
        "</span>" +
        toneTag(item.tone, item.outcome) +
        '<span class="d3-tx-agent__meta">' +
        esc(item.product) +
        " · " +
        esc(item.country) +
        " · " +
        esc(item.date) +
        "</span>" +
        (item.detail
          ? '<span class="d3-tx-agent__detail">' + esc(item.detail) + "</span>"
          : "") +
        (item.scoreLabel
          ? '<span class="d3-tx-agent__score">' +
            esc(item.scoreValue || "") +
            (item.scoreValue ? " · " : "") +
            esc(item.scoreLabel) +
            "</span>"
          : "") +
        "</button></li>";
    });
    html += "</ul>";
    if (n > 8) {
      html += "<p>Showing 8 of " + n + " matches. The table on the right is filtered to the full set.</p>";
    } else {
      html += "<p>The table on the right is filtered to these results. Click a row here or in the table to open details.</p>";
    }
    return html + "</div>";
  }

  function summarize(matches, total) {
    var byOutcome = {};
    var byRisk = { high: 0, medium: 0, low: 0, none: 0 };
    var byProduct = {};
    var byCountry = {};
    matches.forEach(function (m) {
      byOutcome[m.outcome] = (byOutcome[m.outcome] || 0) + 1;
      if (m.risk) byRisk[m.risk] += 1;
      else byRisk.none += 1;
      byProduct[m.product] = (byProduct[m.product] || 0) + 1;
      byCountry[m.country] = (byCountry[m.country] || 0) + 1;
    });
    var topOutcome = Object.keys(byOutcome).sort(function (a, b) {
      return byOutcome[b] - byOutcome[a];
    })[0];
    var topProduct = Object.keys(byProduct).sort(function (a, b) {
      return byProduct[b] - byProduct[a];
    })[0];
    var declined = matches.filter(isUnsuccessfulSnap).length;
    var review = matches.filter(function (m) {
      return m.outcome === "Review" || m.outcome === "Pending Review" || m.outcome === "In Progress";
    }).length;

    return {
      rows: [
        { label: "Transactions in view", value: String(matches.length) + " of " + total },
        { label: "Most common outcome", value: topOutcome ? topOutcome + " (" + byOutcome[topOutcome] + ")" : "—" },
        { label: "Unsuccessful / flagged", value: String(declined), status: declined ? "negative" : "positive" },
        { label: "Needs review", value: String(review), status: review ? "review" : "positive" },
        { label: "High risk scores", value: String(byRisk.high), status: byRisk.high ? "negative" : "positive" },
        { label: "Top product", value: topProduct || "—", status: "positive" },
        {
          label: "Overall signal",
          value: declined > matches.length / 3 ? "Elevated issues" : review ? "Some reviews pending" : "Mostly clear",
          status: declined > matches.length / 3 ? "negative" : "positive"
        }
      ],
      intro:
        "Here’s a summary grounded in the " +
        matches.length +
        " transaction" +
        (matches.length === 1 ? "" : "s") +
        " currently available in this demo dataset."
    };
  }

  function isUnsuccessfulSnap(m) {
    return (
      m.tone === "negative" ||
      m.outcome === "Not Verified" ||
      m.outcome === "Hits Found" ||
      m.outcome === "Flagged" ||
      m.outcome === "Failed"
    );
  }

  function explainMatches(matches, focusName) {
    var target = matches;
    if (focusName) {
      target = matches.filter(function (m) {
        return m.name === focusName;
      });
    }
    if (!target.length) {
      return {
        title: "No matching transaction",
        steps: [
          { text: "That name or ID is not in the demo transaction dataset.", done: false },
          { text: "Try a name visible in the table, or ask to list declined / high-risk rows.", done: false }
        ],
        intro: "I can only explain transactions that exist in this dataset."
      };
    }
    var item = target[0];
    var steps = [
      { text: "Subject: " + item.name, done: true },
      { text: "Outcome: " + item.outcome + (item.detail ? " — " + item.detail : ""), done: true },
      { text: "Product: " + item.product + " · " + item.country, done: true },
      { text: "Date: " + item.date + " · Source: " + (item.source || "—"), done: true }
    ];
    if (item.scoreLabel) {
      steps.push({
        text: "Risk score: " + (item.scoreValue ? item.scoreValue + " · " : "") + item.scoreLabel,
        done: true
      });
    }
    steps.push({
      text: "Open the full report from the button below or the matching table row.",
      done: false
    });
    return {
      title: "Transaction details — " + item.name,
      steps: steps,
      intro:
        "Based only on the table data: " +
        item.name +
        " has outcome “" +
        item.outcome +
        "” for " +
        item.product +
        ".",
      trid: item.trid
    };
  }

  /* ---- play helpers ---- */

  function sleep(ms) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, ms);
    });
  }

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
    wrap.className = "d1-ai d1-enter d3-tx-agent-wrap";
    wrap.innerHTML = html;
    place(wrap);
    return wrap;
  }

  async function playAnalysisBlock(title, rows) {
    var node = clone("analysis");
    if (!node) return;
    node.querySelector("[data-d1-analysis-title]").textContent = title;
    var container = node.querySelector("[data-d1-analysis-rows]");
    place(node);
    for (var i = 0; i < rows.length; i += 1) {
      var r = rows[i];
      var isLast = i === rows.length - 1;
      if (isLast && /overall|signal/i.test(r.label)) {
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
      await sleep(120);
    }
  }

  async function playGuideBlock(title, steps) {
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
      await sleep(100);
    }
  }

  function introFor(parsed, count) {
    var noun = count === 1 ? "transaction" : "transactions";
    if (count === 0) {
      return (
        "I checked the demo transaction dataset and didn’t find any " +
        (parsed.label || "matching transactions") +
        ". I won’t invent results that aren’t in the table."
      );
    }
    return (
      "I found " +
      count +
      " " +
      noun +
      (parsed.label ? " matching “" + parsed.label + "”" : "") +
      ". Results below are taken directly from the table, which I’ve filtered to match."
    );
  }

  async function respond(text) {
    if (busy) return;
    parkActive();
    hideFollow();
    setBusy(true);
    renderUser(text);
    historyTurns.push({ role: "user", text: text });

    var parsed = parseQuery(text);
    lastIntent = parsed.intent;

    try {
      await playTyping(480);

      if (parsed.message && !parsed.spec) {
        playHtml("<p>" + esc(parsed.message) + "</p>");
        setSuggestions(SUGGEST_FILTER);
        return;
      }

      var result;
      if (parsed.intent === "summary") {
        result = await applySpec({ clear: true, predicate: null, dateDays: parsed.spec && parsed.spec.dateDays });
        var matches = result.matches || [];
        lastMatches = matches;
        var sum = summarize(matches, result.total || matches.length);
        playHtml("<p>" + esc(sum.intro) + "</p>");
        await playAnalysisBlock("Activity summary", sum.rows);
        var notable = matches
          .filter(function (m) {
            return (
              isUnsuccessfulSnap(m) ||
              m.risk === "high" ||
              m.outcome === "Review" ||
              m.outcome === "Pending Review" ||
              m.outcome === "In Progress"
            );
          })
          .slice(0, 5);
        if (notable.length) {
          playHtml(
            buildListHtml(
              notable,
              "notable items",
              "A few rows worth a closer look (from the same dataset):"
            )
          );
        }
        setSuggestions(SUGGEST_AFTER);
        return;
      }

      if (parsed.intent === "explain") {
        result = await applySpec(parsed.spec || { clear: false });
        var explained = explainMatches(result.matches || [], parsed.focusName);
        playHtml("<p>" + esc(explained.intro) + "</p>");
        await playGuideBlock(explained.title, explained.steps);
        if (explained.trid) {
          playHtml(
            '<p><button type="button" class="tds-btn tds-btn--sm tds-btn--primary" data-d3-tx-open="' +
              esc(explained.trid) +
              '">Open transaction details</button></p>'
          );
        }
        lastMatches = result.matches || [];
        setSuggestions(SUGGEST_AFTER);
        return;
      }

      if (parsed.intent === "clear") {
        result = await applySpec({ clear: true, predicate: null });
        playHtml(
          "<p>Filters cleared. Showing all " +
            (result.total || allRows().length) +
            " transactions from the demo dataset.</p>"
        );
        lastMatches = result.matches || [];
        setSuggestions(SUGGEST_FILTER);
        return;
      }

      result = await applySpec(parsed.spec || {});
      var list = result.matches || [];
      lastMatches = list;
      var intro = introFor(parsed, list.length);

      if (parsed.layout === "analysis") {
        var s2 = summarize(list, result.total || list.length);
        playHtml("<p>" + esc(intro) + "</p>");
        await playAnalysisBlock("Filtered summary", s2.rows);
      } else {
        playHtml(buildListHtml(list, parsed.label, intro));
      }

      setSuggestions(list.length ? SUGGEST_AFTER : SUGGEST_FILTER);
      historyTurns.push({ role: "assistant", intent: parsed.intent, count: list.length });
    } catch (err) {
      playHtml(
        "<p>I couldn’t update the table just then, but I can still reason over the loaded dataset. Try the request again in a moment.</p>"
      );
      setSuggestions(SUGGEST_FILTER);
    } finally {
      setBusy(false);
      stick();
    }
  }

  /* ---- event wiring ---- */

  thread.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-d3-tx-open]");
    if (!btn || !onTransactions()) return;
    event.preventDefault();
    openTrid(btn.getAttribute("data-d3-tx-open"));
  });

  composer.addEventListener(
    "d1-composer:submit",
    function (event) {
      if (!onTransactions()) return;
      event.stopImmediatePropagation();
      var detail = event.detail || {};
      var text = detail.text || "";
      if (!text || busy) return;
      respond(text);
    },
    true
  );

  /* Follow-up chips while on transactions */
  if (follow) {
    follow.addEventListener(
      "click",
      function (event) {
        if (!onTransactions()) return;
        var btn = event.target.closest("[data-d1-suggest]");
        if (!btn) return;
        var custom = btn.getAttribute("data-d3-tx-suggest");
        var span = btn.querySelector("span");
        var text = custom || (span && span.textContent.trim()) || "";
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
      var detail = event.detail || {};
      var text = detail.text || "";
      if (!text) return;
      /* Home briefing cards set agent=tx before the view flips; accept either. */
      if (!onTransactions() && detail.agent !== "tx") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (!onTransactions() && window.D3Transactions && window.D3Transactions.open) {
        window.D3Transactions.open();
      }
      parkActive();
      respond(text);
    },
    true
  );

  document.addEventListener("d3-view:transactions", function () {
    setSuggestions(SUGGEST_FILTER);
    if (follow) {
      follow.classList.remove("is-on");
      follow.hidden = true;
    }
  });

  document.addEventListener("d3-view:home", function () {
    historyTurns = [];
    lastMatches = [];
  });

  window.D3TxAgent = {
    respond: respond,
    parseQuery: parseQuery,
    lastMatches: function () {
      return lastMatches.slice();
    }
  };
})();
