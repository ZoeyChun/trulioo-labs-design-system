/* Demo 3 — TruAI panel treatments (KYB agent only).
   Applies the options picked in the AI panel lab:
     Landing         → Large orb (hero orb, no header title on the empty state)
     Verify business → Header orb + title/status, City selector for matches
     Investigating   → Loading bar (the live progress block), status in header
     Report          → List for “Continue your investigation”
   The step is inferred from the live thread, so nothing here drives the flow.
   CSS: treatments.css (scoped to data-d3-chat-mode="kyb", state in data-d3-ai-*). */
(function () {
  "use strict";

  var shell = document.querySelector(".d1-shell");
  if (!shell) return;

  var REPORT_NEXT = [
    "Why is this entity high risk?",
    "Who ultimately owns this business?",
    "Has this entity ever traded?"
  ];

  var step = "landing";
  var headerOrb = null;
  var heroOrb = null;
  var selectorCity = "";
  var selectorPage = 0;
  var selectorKey = "";
  var investigating = false;
  var nextQuestions = REPORT_NEXT.slice();
  /* Empty until the user names a jurisdiction — never assume one. */
  var lastPlace = { country: "", cc: "" };

  /* Panel modes that get these treatments. */
  function mode() {
    return shell.getAttribute("data-d3-chat-mode");
  }

  function isKyb() {
    return mode() === "kyb";
  }

  function isTreated() {
    return mode() === "kyb" || mode() === "tx";
  }

  var TX_TITLE = "Transaction Agent";

  function chatPaneActive() {
    var el = document.querySelector(".d3-chat-pane");
    return !!(el && el.classList.contains("is-active"));
  }

  function pane() {
    return document.querySelector(".d3-chat-pane");
  }

  function thread() {
    return document.querySelector("[data-d1-thread]");
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------- place + title ---------- */

  function shortPlace(label) {
    var s = String(label || "");
    if (/united kingdom|\buk\b|britain|england/i.test(s)) return "UK";
    if (/united states|\busa\b|\bu\.s\./i.test(s)) return "US";
    if (/ireland/i.test(s)) return "Ireland";
    if (/singapore/i.test(s)) return "Singapore";
    if (/australia/i.test(s)) return "Australia";
    if (/germany/i.test(s)) return "Germany";
    if (/sweden/i.test(s)) return "Sweden";
    return s.replace(/^in\s+/i, "").trim();
  }

  function rememberPlace(input) {
    if (!input) return;
    var place = null;
    if (typeof input === "object" && (input.country || input.cc)) {
      place = input;
    } else {
      var map = window.D3KybMapSearch;
      if (map && typeof map.parsePlaceQuery === "function") {
        place = map.parsePlaceQuery(String(input));
      }
      if (!place || !(place.country || place.cc)) {
        var short = shortPlace(input);
        if (short === "US") place = { country: "United States", cc: "US" };
        else if (short === "UK") place = { country: "United Kingdom", cc: "GB" };
      }
    }
    if (place && (place.country || place.cc)) {
      lastPlace = {
        country: place.country || lastPlace.country,
        cc: place.cc || lastPlace.cc
      };
    }
  }

  function verifyTitle() {
    var place = lastPlace.country || lastPlace.cc;
    var short = place ? shortPlace(place) : "";
    return short ? "Verify Meridian in " + short : "Verify Meridian";
  }

  /* The header names the conversation. A verification (search / confirm /
     report) is "Verify X in Y"; plain Q&A takes its first question, so a stale
     verification title never sits over an unrelated chat. */
  var VERIFY_SELECTOR = "[data-d1-confirm-card], .d3-kyb-cand-panel, .ai-cand, [data-d3-kyb-confirm]";

  function inVerifyFlow() {
    var ws = document.querySelector("[data-d3-workspace]");
    if (ws && ws.getAttribute("data-d3-kyb-surface") === "report") return true;
    var awaitEl = document.querySelector("[data-d3-kyb-map-await]");
    if (awaitEl && !awaitEl.hidden) return true;
    var t = thread();
    return !!(t && t.querySelector(VERIFY_SELECTOR));
  }

  function kybTitle() {
    if (inVerifyFlow()) return verifyTitle();
    var t = thread();
    var p = t && t.querySelector(".d1-user p");
    var q = p ? p.textContent.trim() : "";
    if (!q) return "KYB Agent";
    return q.length > 40 ? q.slice(0, 37) + "…" : q;
  }

  function setTitle(text) {
    var el = document.querySelector("[data-d3-ai-title]");
    if (el && text) el.textContent = text;
  }

  /* ---------- header status (orb + subtitle) ---------- */

  var ICON_SEARCH =
    '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.90625 4.46875C7.90625 2.57812 6.35938 1.03125 4.46875 1.03125C2.57812 1.03125 1.03125 2.57812 1.03125 4.46875C1.03125 6.35938 2.57812 7.90625 4.46875 7.90625C6.35938 7.90625 7.90625 6.35938 7.90625 4.46875ZM7.24023 7.9707C6.48828 8.57227 5.52148 8.9375 4.46875 8.9375C1.99805 8.9375 0 6.93945 0 4.46875C0 1.99805 1.99805 0 4.46875 0C6.93945 0 8.9375 1.99805 8.9375 4.46875C8.9375 5.52148 8.57227 6.48828 7.9707 7.24023L10.8496 10.1191C11.043 10.3125 11.043 10.6562 10.8496 10.8496C10.6562 11.043 10.3125 11.043 10.1191 10.8496L7.24023 7.9707Z" fill="currentColor"/></svg>';
  var ICON_FILE =
    '<svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M1.375 1.03125C1.18164 1.03125 1.03125 1.18164 1.03125 1.375V9.625C1.03125 9.81836 1.18164 9.96875 1.375 9.96875H6.875C7.06836 9.96875 7.21875 9.81836 7.21875 9.625V4.46875H5.32812C4.46875 4.46875 3.78125 3.78125 3.78125 2.92188V1.03125H1.375ZM4.8125 1.46094V2.92188C4.8125 3.20117 5.04883 3.4375 5.32812 3.4375H6.78906L4.8125 1.46094ZM1.375 0H4.25391C4.61914 0 4.96289 0.150391 5.2207 0.408203L7.8418 3.0293C8.09961 3.28711 8.25 3.65234 8.25 4.01758V9.625C8.25 10.377 7.62695 11 6.875 11H1.375C0.623047 11 0 10.377 0 9.625V1.375C0 0.623047 0.623047 0 1.375 0ZM2.57812 5.5H5.67188C5.95117 5.5 6.1875 5.73633 6.1875 6.01562C6.1875 6.29492 5.95117 6.53125 5.67188 6.53125H2.57812C2.29883 6.53125 2.0625 6.29492 2.0625 6.01562C2.0625 5.73633 2.29883 5.5 2.57812 5.5ZM2.57812 7.5625H5.67188C5.95117 7.5625 6.1875 7.79883 6.1875 8.07812C6.1875 8.35742 5.95117 8.59375 5.67188 8.59375H2.57812C2.29883 8.59375 2.0625 8.35742 2.0625 8.07812C2.0625 7.79883 2.29883 7.5625 2.57812 7.5625Z" fill="currentColor"/></svg>';

  function acting(label, icon) {
    return { label: label, busy: true, bubble: "acting", actingLabel: label, actingIconHtml: icon, iconHtml: icon };
  }

  function activityFromLabel(text) {
    var raw = String(text || "").replace(/[.…]+$/g, "").trim();
    if (/matched registry|pulling business registry|checking registry|business registry/i.test(raw)) {
      return acting("Checking registry", ICON_SEARCH);
    }
    if (/incorporation and ownership parsed|parsing incorporation|incorporation documents|reading ownership|ownership/i.test(raw)) {
      return acting("Reading ownership", ICON_SEARCH);
    }
    if (/no sanctions|screening directors|cross-referencing|sanctions|ofac/i.test(raw)) {
      return acting("Screening sanctions", ICON_SEARCH);
    }
    if (/generating report|writing report/i.test(raw)) {
      return acting("Generating report", ICON_FILE);
    }
    if (raw) return { label: raw, busy: true, bubble: "thinking", iconHtml: ICON_SEARCH };
    return null;
  }

  function realProgressBlock() {
    var t = thread();
    if (!t) return null;
    var blocks = t.querySelectorAll(".d1-block");
    for (var i = 0; i < blocks.length; i += 1) {
      if (blocks[i].querySelector(".d1-progress")) return blocks[i];
    }
    return null;
  }

  function currentActivityLabel(block) {
    if (!block) return "";
    var current = block.querySelector(".d1-activity__toggle--current [data-d1-activity-label]");
    if (current && current.textContent.trim()) return current.textContent.trim();
    var labels = block.querySelectorAll("[data-d1-activity-label]");
    if (!labels.length) return "";
    return (labels[labels.length - 1].textContent || "").trim();
  }

  function hasReport() {
    var t = thread();
    return !!(t && t.querySelector("[data-d1-co], .d1-report__title"));
  }

  function readPanelActivity() {
    var t = thread();
    var report = hasReport();
    var block = realProgressBlock();
    var toolsLabel = block && block.querySelector("[data-d1-tools-label]");
    var toolsText = toolsLabel ? toolsLabel.textContent.trim() : "";
    var currentText = currentActivityLabel(block);
    if (currentText && !/complete/i.test(toolsText)) {
      var mapped = activityFromLabel(currentText);
      if (mapped) return mapped;
    }
    if (/complete/i.test(toolsText) && !report) return acting("Generating report", ICON_FILE);
    if (step === "report" && report) {
      var tag = t && t.querySelector("[data-d1-report-tag]");
      var review = !!(tag && /review|needs/i.test(tag.textContent || ""));
      return {
        label: review ? "Review findings" : "Report ready",
        busy: false,
        done: true,
        attention: review,
        bubble: review ? "needs-attention" : "completed",
        iconHtml: review ? "" : ICON_FILE
      };
    }
    if (t && t.querySelector(".d1-thinking, [data-d3-kyb-starting]")) {
      if (step === "investigating") return acting("Checking registry", ICON_SEARCH);
      return { label: "Thinking", busy: true, bubble: "thinking", iconHtml: ICON_SEARCH };
    }
    if (step === "investigating") return acting("Checking registry", ICON_SEARCH);
    return { label: "Awaiting input", busy: false, bubble: "idle", iconHtml: "" };
  }

  function setStatus(label, iconHtml) {
    var el = document.querySelector("[data-d3-ai-status]");
    var mark = document.querySelector("[data-d3-ai-status-icon]");
    if (el) el.textContent = label;
    if (!mark) return;
    var html = iconHtml || "";
    mark.innerHTML = html;
    mark.hidden = !html;
    mark.classList.toggle("is-empty", !html);
  }

  function syncHeaderChrome() {
    try {
      var activity = readPanelActivity();
      setStatus(activity.label, activity.iconHtml || activity.actingIconHtml || "");
      var bubble = {
        state: activity.bubble || "idle",
        actingLabel: activity.actingLabel || "",
        actingIconHtml: activity.actingIconHtml || activity.iconHtml || ""
      };
      if (headerOrb) {
        if (typeof headerOrb.setMode === "function") headerOrb.setMode(bubble.state);
        else if (typeof headerOrb.set === "function") headerOrb.set(bubble);
      }
      if (heroOrb) {
        if (typeof heroOrb.set === "function") heroOrb.set(bubble);
        else if (typeof heroOrb.setMode === "function") heroOrb.setMode(bubble.state);
      }
    } catch (err) {
      /* Chrome sync must never break the chat. */
    }
  }

  /* ---------- step inference + attributes ---------- */

  function inferStep() {
    var t = thread();
    if (hasReport()) return "report";
    if (investigating || realProgressBlock()) return "investigating";
    /* Landing = the empty state is what the user actually sees. */
    var empty = document.querySelector(".d3-chat-pane__empty");
    var emptyShown = !!empty && !empty.hidden && getComputedStyle(empty).display !== "none";
    if (!emptyShown && t && t.children.length) return "verify";
    if (!emptyShown && chatPaneActive()) return "verify";
    return "landing";
  }

  function orbForStep() {
    /* Large orb is the empty state only; once the chat continues use the header. */
    if (step === "landing") return "hero";
    return "header";
  }

  function setPlaceholders(text) {
    /* Transactions use one fixed placeholder (the parked composer was left blank). */
    if (!isKyb()) text = "Ask about transactions";
    document.querySelectorAll(".d3-chat-pane [data-d1-input], .d3-chat-pane [data-d3-pane-input]").forEach(function (input) {
      if (input.getAttribute("placeholder") !== text) input.setAttribute("placeholder", text);
    });
  }

  function hideMatchList(hidden) {
    document.querySelectorAll(".d3-kyb-cand-panel").forEach(function (el) {
      if (el.hidden !== hidden) el.hidden = hidden;
    });
  }

  function setAttr(name, value) {
    if (shell.getAttribute(name) !== value) shell.setAttribute(name, value);
  }

  function applyChoice() {
    if (!isTreated()) return;
    var wanted = inferStep();
    if (wanted === "landing" && step !== "landing") {
      investigating = false;
      selectorCity = "";
      selectorPage = 0;
      selectorKey = "";
      lastPlace = { country: "", cc: "" };
      setTitle(isKyb() ? "Verify Meridian" : TX_TITLE);
    }
    step = wanted;
    setAttr("data-d3-ai-step", step);
    setAttr("data-d3-ai-landing", "large");
    setAttr("data-d3-ai-verify", "selector");
    setAttr("data-d3-ai-investigate", "bar");
    setAttr("data-d3-ai-report", "list");
    setAttr("data-d3-ai-orb", orbForStep());

    if (step === "investigating") {
      hideMatchList(true);
      setPlaceholders("Verification in progress…");
    } else if (step === "report") {
      hideMatchList(true);
      setPlaceholders("Ask about this verification");
    } else if (step === "verify") {
      hideMatchList(false);
      var confirming = !!document.querySelector("[data-d1-confirm-card], [data-d3-kyb-confirm='yes']");
      setPlaceholders(confirming ? "Confirm above, or ask a follow-up" : "Select a match or refine your search");
    } else {
      setPlaceholders("Ask about business verification");
    }
    if (step !== "landing") setTitle(isKyb() ? kybTitle() : TX_TITLE);
    syncReportView();
    syncHeaderChrome();
    syncBack();
    syncMatchView();
  }

  function syncBack() {
    var back = document.querySelector(".d3-chat-pane [data-d3-chat-back]");
    if (!back) return;
    /* Hide only on the empty landing. */
    var hide = step === "landing";
    if (back.hidden !== hide) back.hidden = hide;
  }

  /* ---------- report follow-ups: list ---------- */

  function readFollowQuestions() {
    var t = thread();
    if (!t) return [];
    var nodes = document.querySelectorAll(
      "[data-d3-kyb-next] [data-d3-kyb-suggest], .d1-follow [data-d3-kyb-suggest]"
    );
    var out = [];
    Array.prototype.forEach.call(nodes, function (n) {
      var q = n.getAttribute("data-d3-kyb-suggest");
      if (q && out.indexOf(q) === -1) out.push(q);
    });
    return out;
  }

  function syncReportView() {
    var t = thread();
    var stale = document.querySelector("[data-d3-ai-next]");
    if (step !== "report") {
      if (stale && stale.parentNode) stale.parentNode.removeChild(stale);
      return;
    }
    if (!t) return;
    var live = readFollowQuestions();
    if (live.length) nextQuestions = live;
    var host = t.querySelector("[data-d3-ai-next]");
    if (!host) {
      host = document.createElement("div");
      host.setAttribute("data-d3-ai-next", "");
      t.appendChild(host);
    }
    var sig = "list|" + nextQuestions.join("|");
    host.className = "d3-ai-next d3-ai-next--list";
    host.setAttribute("role", "group");
    host.setAttribute("aria-label", "Continue your investigation");
    if (host.getAttribute("data-sig") === sig) return;
    host.setAttribute("data-sig", sig);
    var arrow =
      '<span class="d3-ai-next__arrow" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M3 8h10m0 0-3.5-3.5M13 8l-3.5 3.5"/></svg></span>';
    host.innerHTML =
      '<div class="d3-ai-next__list">' +
      nextQuestions
        .map(function (q) {
          return (
            '<button type="button" class="d3-ai-next__btn" data-d3-kyb-suggest="' +
            esc(q) +
            '"><span class="d3-ai-next__text">' +
            esc(q) +
            "</span>" +
            arrow +
            "</button>"
          );
        })
        .join("") +
      "</div>";
    var scroller = document.querySelector("[data-d3-chat-thread]") || t.parentElement;
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }

  /* ---------- header chrome + hero orb ---------- */

  function ensureChrome() {
    var head = document.querySelector(".d3-chat-pane__head");
    var empty = document.querySelector(".d3-chat-pane__empty");
    if (!head) return false;
    if (head.querySelector("[data-d3-ai-ident]")) return true;
    var tools = head.querySelector(".d3-chat-pane__tools");

    var ident = document.createElement("div");
    ident.className = "d3-ai-ident";
    ident.setAttribute("data-d3-ai-ident", "");
    ident.innerHTML =
      '<span class="d3-ai-ident__orb" data-d3-ai-ident-orb></span>' +
      '<span class="d3-ai-ident__copy">' +
      '<span class="d3-ai-ident__title" data-d3-ai-title>Verify Meridian</span>' +
      '<span class="d3-ai-ident__status">' +
      '<span class="d3-ai-ident__status-icon is-empty" data-d3-ai-status-icon aria-hidden="true" hidden></span>' +
      '<span data-d3-ai-status>Awaiting input</span>' +
      "</span></span>";
    if (tools) head.insertBefore(ident, tools);
    else head.appendChild(ident);

    var hero = document.createElement("div");
    hero.className = "d3-ai-hero";
    hero.setAttribute("data-d3-ai-hero", "");
    if (empty) {
      var block = empty.querySelector("[data-d3-chat-hello]");
      var wrap = block && block.parentNode;
      if (wrap && wrap.parentNode === empty) empty.insertBefore(hero, wrap);
      else empty.insertBefore(hero, empty.firstChild);
    }

    var orbHost = ident.querySelector("[data-d3-ai-ident-orb]");
    if (window.TruAIFloat && typeof window.TruAIFloat.mountHeader === "function") {
      headerOrb = window.TruAIFloat.mountHeader(orbHost);
    }
    if (window.TruAIBubble) {
      heroOrb = window.TruAIBubble.mountPanel(hero, { state: "idle" });
      if (!headerOrb) headerOrb = window.TruAIBubble.mountPanel(orbHost, { state: "idle" });
    }
    return true;
  }

  /* ---------- verify: city selector ---------- */

  function cityLabel(city) {
    var label = String(city || "").split(",")[0].trim();
    return label || "Other";
  }

  function readMatches(panel) {
    var map = window.D3KybMapSearch;
    return Array.prototype.map.call(panel.querySelectorAll(".ai-cand"), function (card) {
      var id = card.getAttribute("data-d3-kyb-cand") || card.getAttribute("data-id") || "";
      var biz = map && typeof map.findById === "function" ? map.findById(id) : null;
      var nameEl = card.querySelector(".ai-cand__name");
      return {
        id: id,
        name: nameEl ? nameEl.textContent.trim() : "",
        city: biz && biz.city ? biz.city : "",
        addr: (biz && (biz.addr || biz.city)) || "",
        reg: (biz && biz.reg) || ""
      };
    });
  }

  function syncMatchView() {
    if (!isKyb()) return;
    var panels = document.querySelectorAll(".d3-kyb-cand-panel");
    Array.prototype.forEach.call(panels, function (panel) {
      var cands = panel.querySelector(".ai-cands");
      var host = panel.querySelector("[data-d3-ai-selector]");
      if (!cands) {
        if (host && host.parentNode) host.parentNode.removeChild(host);
        return;
      }

      var matches = readMatches(panel);
      var ids = matches
        .map(function (match) {
          return match.id;
        })
        .join("|");
      if (ids !== selectorKey) {
        selectorKey = ids;
        selectorCity = "";
        selectorPage = 0;
      }

      var cityMap = {};
      matches.forEach(function (match) {
        var label = cityLabel(match.city);
        if (!cityMap[label]) cityMap[label] = { label: label, n: 0 };
        cityMap[label].n += 1;
      });
      var chips = Object.keys(cityMap).map(function (key) {
        return cityMap[key];
      });
      chips.sort(function (a, b) {
        if (b.n !== a.n) return b.n - a.n;
        return a.label.localeCompare(b.label);
      });

      var filtered = selectorCity
        ? matches.filter(function (match) {
            return cityLabel(match.city) === selectorCity;
          })
        : matches.slice();
      var pages = Math.max(1, Math.ceil(filtered.length / 3) || 1);
      if (selectorPage > pages - 1) selectorPage = Math.max(0, pages - 1);
      if (selectorPage < 0) selectorPage = 0;
      var start = selectorPage * 3;
      var slice = filtered.slice(start, start + 3);
      var lead = panel.querySelector(".ai-reply__lead");
      var quoted = lead && String(lead.textContent || "").match(/[“"]([^”"]+)[”"]/);
      var query = quoted ? quoted[1] : "Meridian";
      var from = filtered.length ? start + 1 : 0;
      var to = start + slice.length;
      var sig = [ids, selectorCity, selectorPage, query, from, to, filtered.length].join("~");

      if (!host) {
        host = document.createElement("div");
        host.className = "d3-ai-selector";
        host.setAttribute("data-d3-ai-selector", "");
        panel.appendChild(host);
      }
      if (host.getAttribute("data-sig") === sig) return;
      host.setAttribute("data-sig", sig);

      var chipHtml = chips
        .map(function (chip) {
          var on = chip.label === selectorCity;
          return (
            '<button type="button" class="d3-ai-selector__chip' +
            (on ? " is-on" : "") +
            '" data-d3-ai-city="' +
            esc(chip.label) +
            '">' +
            esc(chip.label) +
            '<span class="d3-ai-selector__count">' +
            chip.n +
            "</span></button>"
          );
        })
        .join("");

      var rowHtml = slice
        .map(function (row) {
          return (
            '<button type="button" class="d3-ai-selector__row" data-d3-kyb-cand="' +
            esc(row.id) +
            '" data-id="' +
            esc(row.id) +
            '">' +
            '<span class="d3-ai-selector__mark" aria-hidden="true"><i class="fa-regular fa-building"></i></span>' +
            '<span class="d3-ai-selector__copy">' +
            '<span class="ai-cand__name">' +
            esc(row.name) +
            "</span>" +
            '<span class="d3-ai-selector__addr">' +
            esc(row.addr) +
            "</span>" +
            '<span class="d3-ai-selector__reg">' +
            esc(row.reg) +
            "</span></span></button>"
          );
        })
        .join("");
      if (!slice.length) rowHtml = '<p class="d3-ai-selector__empty">No businesses in this city.</p>';

      host.innerHTML =
        '<p class="d3-ai-selector__title">Which “' +
        esc(query) +
        "” should I investigate?</p>" +
        '<div class="d3-ai-selector__body">' +
        '<div class="d3-ai-selector__chips">' +
        chipHtml +
        "</div>" +
        '<div class="d3-ai-selector__rows">' +
        rowHtml +
        "</div>" +
        '<div class="d3-ai-selector__pager">' +
        "<span>" +
        (filtered.length ? from + "-" + to + " of " + filtered.length : "0 of 0") +
        "</span>" +
        '<span class="d3-ai-selector__pages">' +
        '<button type="button" class="d3-ai-selector__page" data-d3-ai-page="prev"' +
        (selectorPage <= 0 ? " disabled" : "") +
        ' aria-label="Previous businesses"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10 3 5 8l5 5"/></svg></button>' +
        '<button type="button" class="d3-ai-selector__page" data-d3-ai-page="next"' +
        (selectorPage >= pages - 1 ? " disabled" : "") +
        ' aria-label="Next businesses"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M6 3l5 5-5 5"/></svg></button>' +
        "</span></div></div>";
    });
  }

  /* Make the report visible: leave full-screen, and make sure the workspace
     is on the report surface. */
  function showReport() {
    var ns = window.D3AiPanel;
    if (shell.getAttribute("data-d3-chat-size") === "full" && ns && typeof ns.setChatFull === "function") {
      ns.setChatFull(false);
    }
    var surface = document.querySelector("[data-d3-kyb-surface]");
    var resume = window.D3KybResume;
    if (surface && surface.getAttribute("data-d3-kyb-surface") !== "report" && resume && typeof resume.setSurface === "function") {
      resume.setSurface("report");
    }
  }

  /* City chip → zoom the map to that city's matches (all matches when cleared). */
  function focusCityOnMap() {
    var map = window.D3KybMapSearch;
    var panel = document.querySelector(".d3-kyb-cand-panel [data-d3-ai-selector]");
    panel = panel && panel.closest(".d3-kyb-cand-panel");
    if (!map || typeof map.focusBusinesses !== "function" || !panel) return;
    var matches = readMatches(panel).filter(function (match) {
      return !selectorCity || cityLabel(match.city) === selectorCity;
    });
    var list = matches
      .map(function (match) {
        return typeof map.findById === "function" ? map.findById(match.id) : null;
      })
      .filter(Boolean);
    map.focusBusinesses(list, { maxZoom: selectorCity ? 12 : 6 });
  }

  /* ---------- watchers ---------- */

  function onUserText(text) {
    rememberPlace(text || "");
    if (step !== "landing" && (lastPlace.country || lastPlace.cc)) setTitle(isKyb() ? kybTitle() : verifyTitle());
  }

  function watchThread() {
    var t = thread();
    if (!t || typeof MutationObserver === "undefined") return;
    var seenUsers = 0;
    var syncing = false;
    var observer = new MutationObserver(function () {
      if (syncing || !isTreated()) return;
      syncing = true;
      try {
        var users = t.querySelectorAll(".d1-user p");
        if (users.length > seenUsers) {
          seenUsers = users.length;
          onUserText(users[users.length - 1].textContent || "");
        }
        if (!users.length) seenUsers = 0;
        applyChoice();
      } finally {
        syncing = false;
      }
    });
    observer.observe(t, { childList: true, subtree: true });
  }

  function watchPaneActive() {
    var el = pane();
    if (!el || typeof MutationObserver === "undefined") return;
    new MutationObserver(function () {
      applyChoice();
    }).observe(el, { attributes: true, attributeFilter: ["class"] });
  }

  function watchMode() {
    if (typeof MutationObserver === "undefined") return;
    new MutationObserver(function () {
      ensureChrome();
      applyChoice();
    }).observe(shell, { attributes: true, attributeFilter: ["data-d3-chat-mode"] });
  }

  function watchFlow() {
    document.addEventListener("d3-kyb:report-ready", function () {
      investigating = false;
      window.setTimeout(applyChoice, 0);
    });
    document.addEventListener(
      "d1-composer:submit",
      function (event) {
        onUserText((event.detail || {}).text || "");
      },
      true
    );
    document.addEventListener(
      "d3-chat:send",
      function (event) {
        onUserText((event.detail || {}).text || "");
      },
      true
    );

    document.addEventListener(
      "click",
      function (event) {
        if (!isKyb()) return;
        /* "View" on the report-ready card: from full-screen, shrink the panel back
           to its docked width so the report is visible beside it. */
        var viewBtn = event.target.closest(".d3-chat-pane .d1-report-ready .tds-btn");
        if (viewBtn) {
          showReport();
          return;
        }
        var cityBtn = event.target.closest("[data-d3-ai-city]");
        if (cityBtn) {
          event.preventDefault();
          event.stopPropagation();
          var label = cityBtn.getAttribute("data-d3-ai-city") || "";
          selectorCity = selectorCity === label ? "" : label;
          selectorPage = 0;
          syncMatchView();
          focusCityOnMap();
          return;
        }
        var pageBtn = event.target.closest("[data-d3-ai-page]");
        if (pageBtn) {
          event.preventDefault();
          event.stopPropagation();
          if (pageBtn.disabled) return;
          selectorPage += pageBtn.getAttribute("data-d3-ai-page") === "next" ? 1 : -1;
          syncMatchView();
          return;
        }

        var country = event.target.closest("[data-d3-kyb-country-pick]");
        if (country) {
          var place = country.getAttribute("data-d3-kyb-country-label") || "";
          if (place) {
            rememberPlace(place);
            setTitle(kybTitle());
          }
        }

        if (event.target.closest("[data-d3-kyb-confirm='yes']")) {
          investigating = true;
          applyChoice();
          return;
        }
        var cand = event.target.closest("[data-d3-kyb-cand], .ai-cand, [data-d3-kyb-select]");
        if (!cand) return;
        var candId = cand.getAttribute("data-d3-kyb-cand") || cand.getAttribute("data-id") || "";
        var map = window.D3KybMapSearch;
        if (map && candId && typeof map.findById === "function") {
          var picked = map.findById(candId);
          if (picked) rememberPlace({ country: picked.country, cc: picked.cc });
        }
        /* Picking a business keeps the confirm step: the agent shows its confirm
           card, and the investigation starts when the user confirms. */
        applyChoice();
      },
      false
    );
  }

  function init() {
    ensureChrome();
    watchThread();
    watchPaneActive();
    watchMode();
    watchFlow();
    applyChoice();
    window.requestAnimationFrame(function () {
      ensureChrome();
      applyChoice();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
