/* Demo 3 — KYB right-panel canvas.
   Three small jobs, none of which touch a shared demo-3 script:
     1. Paint the dot ground (styled/shown by css/d3-kyb-canvas.css).
     2. Mirror the business name into the "Name set" step.
     3. Wire the "View all" link to the Transactions rail item. */
(function () {
  "use strict";

  var DOTS = {
    style: "static",
    formation: "grid",
    spacing: 18,
    size: 1.2,
    sizeVary: 0,
    color: "#587965",
    opacity: 0.4,
    shape: "full",
    clear: 0,
    fade: 1.3,
    intensity: 0,
    speed: 0
  };

  function mountDots() {
    var canvas = document.getElementById("d3-kyb-dots");
    if (!canvas || !window.TruDotField) return;
    window.TruDotField.mount(canvas, DOTS);
  }

  function watchBusinessName() {
    var source = document.querySelector("[data-d3-kyb-map-await-query]");
    var target = document.querySelector("[data-d3-kyb-step-name]");
    if (!source || !target) return;

    function sync() {
      var text = source.textContent.trim();
      target.textContent = text && text !== "—" ? text : "Business name";
    }

    sync();
    new MutationObserver(sync).observe(source, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  /* The panel follows what the user has actually told us. js/d3-kyb-map-search.js
     sets data-d3-await-stage on [data-d3-kyb-map-await]:
       name     no business named yet  → "Business name needed" is the open step
       country  a name, no jurisdiction → "Name set" done, "Country needed" open */
  var CHECK =
    '<svg viewBox="0 0 12 12" fill="none"><path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="m2.5 6.2 2.3 2.3L9.5 3.8"/></svg>';

  function step(state, label, note, extra) {
    return (
      '<li class="d3-kyb-steps__item is-' + state + '"' + (state === "current" ? ' aria-current="step"' : "") + ">" +
      '<span class="d3-kyb-steps__mark" aria-hidden="true">' + (state === "done" ? CHECK : "") + "</span>" +
      '<span class="d3-kyb-steps__text"><b class="d3-kyb-steps__label">' + label + "</b>" +
      '<em class="d3-kyb-steps__note"' + (extra || "") + ">" + note + "</em></span></li>"
    );
  }

  function watchAwaitStage() {
    var panel = document.querySelector("[data-d3-kyb-map-await]");
    if (!panel) return;
    var eyebrow = panel.querySelector("[data-d3-await-eyebrow]");
    var lead = panel.querySelector("[data-d3-await-lead]");
    var steps = panel.querySelector("[data-d3-await-steps]");
    var hint = panel.querySelector("[data-d3-await-hint]");
    if (!eyebrow || !lead || !steps || !hint) return;
    var country = {
      eyebrow: eyebrow.textContent,
      lead: lead.innerHTML,
      steps: steps.innerHTML,
      hint: hint.innerHTML
    };
    var name = {
      eyebrow: "Waiting for business name",
      lead: "Tell TruAI which business you\u2019d like to verify in chat to continue.",
      steps:
        step("current", "Business name needed", "Reply in chat to continue") +
        step("todo", "Country needed", "Where it\u2019s registered") +
        step("todo", "Business matches", "Pick the right entity"),
      hint: "Example: <span>Meridian</span> or <span>Meridian, United Kingdom</span>"
    };
    var shown = "country";

    function apply() {
      var stage = panel.getAttribute("data-d3-await-stage") === "name" ? "name" : "country";
      if (stage === shown) return;
      shown = stage;
      var c = stage === "name" ? name : country;
      eyebrow.textContent = c.eyebrow;
      lead.innerHTML = c.lead;
      steps.innerHTML = c.steps;
      hint.innerHTML = c.hint;
      if (stage === "country") {
        var q = lead.querySelector("[data-d3-kyb-map-await-query]");
        if (q) q.textContent = panel.getAttribute("data-d3-await-query") || "this business";
        watchBusinessName();
      }
    }

    new MutationObserver(apply).observe(panel, { attributes: true, attributeFilter: ["data-d3-await-stage"] });
    /* The query is written in the same tick as the stage; if the stage did not
       change, the strong already carries it. */
    apply();
  }

  /* The KYB flow never shows a map. The right panel is the dotted ground with a
     card on it, following what the user has told us so far:

       no name / no country   "Waiting for …" card         (watchAwaitStage)
       agent working          skeleton of that card
       several matches        "Several businesses share this name"  (Figma 1811:73412)
       one picked, to confirm  the same card for that business
       verifying              skeleton, until the report opens

     Nothing here touches the thread; it only reads it and the agent's state. */
  function watchResolving() {
    var ws = document.querySelector("[data-d3-workspace]");
    var awaitEl = document.querySelector("[data-d3-kyb-map-await]");
    var thread = document.querySelector("[data-d1-thread]");
    var composer = document.querySelector("[data-d1-composer]");
    var panel = document.querySelector("[data-d3-kyb-choice-panel]");
    if (!ws || !awaitEl || !thread) return;

    var busy = false;
    var sawBusy = false;
    var failsafe = 0;
    var RESOLVING = "data-d3-kyb-resolving";
    var CHOICE = "data-d3-kyb-choice";

    function stop() {
      window.clearTimeout(failsafe);
      failsafe = 0;
      ws.removeAttribute(RESOLVING);
    }

    function fact(label, value) {
      return '<div class="d3-kyb-choice__fact"><dt>' + label + "</dt><dd>" + value + "</dd></div>";
    }

    function esc(v) {
      return String(v == null ? "" : v)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    /* "New York, NY" → NY. The match list is one country at a time. */
    function regionOf(biz) {
      var m = /,\s*([A-Za-z]{2,})\s*$/.exec(biz.city || "");
      return m ? m[1].toUpperCase() : biz.city || "";
    }

    function fill(tag, title, lead, facts) {
      if (!panel) return;
      var set = function (sel, html) {
        var el = panel.querySelector(sel);
        if (el && el.innerHTML !== html) el.innerHTML = html;
      };
      set("[data-kc-tag]", esc(tag));
      set("[data-kc-title]", esc(title));
      set("[data-kc-lead]", esc(lead));
      set("[data-kc-facts]", facts);
    }

    function showChoice(kind, maps, agentState) {
      var facts = "";
      if (kind === "confirm") {
        var biz = maps && maps.findById ? maps.findById(agentState.pendingId) : null;
        if (!biz) return false;
        fill(
          "Waiting for your confirmation",
          biz.name,
          "Confirm in chat to run the verification on this business.",
          fact("Registered in", esc(biz.city || biz.country)) +
            fact("Registration number", esc(biz.reg || "—")) +
            fact("Status", esc(biz.status || "—"))
        );
      } else {
        var list = (maps && maps.getLastResults && maps.getLastResults()) || [];
        var n = list.length;
        var regions = {};
        list.forEach(function (b) {
          regions[regionOf(b)] = true;
        });
        var k = Object.keys(regions).length;
        var active = list.filter(function (b) {
          return /^active$/i.test(b.status || "");
        }).length;
        var us = list.length && list.every(function (b) { return b.cc === "US"; });
        var unit = us ? (k === 1 ? "state" : "states") : k === 1 ? "region" : "regions";
        if (!n) {
          fill(
            "No matches yet",
            "No businesses match",
            "Try another country or a different name.",
            fact("Exact name matches", "0")
          );
        } else if (n === 1) {
          fill(
            "Waiting for your choice",
            "One business matches",
            "Select it to continue with the verification.",
            fact("Exact name matches", "1") + fact("Registered in", esc(list[0].city || list[0].country)) + fact("Currently active", active + " of 1")
          );
        } else {
          fill(
            "Waiting for your choice",
            "Several businesses share this name",
            "Verifying the wrong one would give the wrong result, so a choice is needed.",
            fact("Exact name matches", String(n)) + fact("Registered in", k + " " + unit) + fact("Currently active", active + " of " + n)
          );
        }
      }
      ws.setAttribute(CHOICE, kind);
      return true;
    }

    function skeleton(withFailsafe) {
      ws.removeAttribute(CHOICE);
      if (ws.hasAttribute(RESOLVING)) return;
      ws.setAttribute(RESOLVING, "");
      if (!withFailsafe) return;
      /* Never leave the skeleton up for good (e.g. a search with no hits). */
      failsafe = window.setTimeout(function () {
        stop();
        if (window.D3KybMapSearch && window.D3KybMapSearch.setAwaitingCountry) {
          window.D3KybMapSearch.setAwaitingCountry(true, "");
        }
      }, 12000);
    }

    function sync() {
      if (!thread.querySelector(".d1-user")) {
        busy = false;
        sawBusy = false;
        ws.removeAttribute("data-d3-map-ready");
        ws.removeAttribute(CHOICE);
        stop();
        return;
      }
      if (ws.getAttribute("data-d3-kyb-surface") !== "map") {
        ws.removeAttribute(CHOICE);
        return stop();
      }
      if (!awaitEl.hidden) {
        /* The waiting card replaces everything: nothing is ready until matches come. */
        ws.removeAttribute("data-d3-map-ready");
        ws.removeAttribute(CHOICE);
        return stop();
      }
      if (!ws.hasAttribute("data-d3-map-ready")) {
        if (busy || !sawBusy) return skeleton(true);
        /* The agent finished and still knows no business / country (plain Q&A):
           show what it is waiting for. */
        stop();
        ws.removeAttribute(CHOICE);
        if (window.D3KybMapSearch && window.D3KybMapSearch.setAwaitingCountry) {
          window.D3KybMapSearch.setAwaitingCountry(true, "");
        }
        return;
      }
      /* There are matches: what the card says depends on where the agent is. */
      var agent = window.D3KybAgent && window.D3KybAgent.getState ? window.D3KybAgent.getState() : null;
      var maps = window.D3KybMapSearch;
      var mode = agent && agent.mode;
      stop();
      if (mode === "list" && showChoice("matches", maps, agent)) return;
      if (mode === "confirm" && agent.pendingId && showChoice("confirm", maps, agent)) return;
      /* Verifying (confirmed) or between steps: skeleton until the report opens. */
      skeleton(false);
    }

    if (composer) {
      composer.addEventListener("d1-composer:state", function (event) {
        var on = !!(event.detail && event.detail.busy);
        busy = on;
        if (on) sawBusy = true;
        sync();
      });
    }
    new MutationObserver(sync).observe(ws, {
      attributes: true,
      attributeFilter: ["data-d3-kyb-surface", "data-d3-map-ready"]
    });
    new MutationObserver(sync).observe(awaitEl, { attributes: true, attributeFilter: ["hidden"] });
    /* subtree: the candidate panel repaints in place when a chip is toggled or a
       match is picked. */
    new MutationObserver(sync).observe(thread, { childList: true, subtree: true });
    sync();
  }

  function bindViewAll() {
    var btn = document.querySelector("[data-d3-kyb-view-all]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var nav = document.querySelector('[data-d3-nav="transactions"]');
      if (nav) nav.click();
    });
  }

  function boot() {
    mountDots();
    watchBusinessName();
    watchAwaitStage();
    watchResolving();
    bindViewAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
