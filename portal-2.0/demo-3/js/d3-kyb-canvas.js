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

  /* Until a business AND a country are identified there is nothing to put on a
     map. From the first message until then the right panel shows a skeleton of
     the "Search in progress" card; it resolves into the real card (name /
     country needed) or, once there are matches, the map. */
  function watchResolving() {
    var ws = document.querySelector("[data-d3-workspace]");
    var awaitEl = document.querySelector("[data-d3-kyb-map-await]");
    var thread = document.querySelector("[data-d1-thread]");
    var composer = document.querySelector("[data-d1-composer]");
    if (!ws || !awaitEl || !thread) return;

    var busy = false;
    var sawBusy = false;
    var failsafe = 0;
    var RESOLVING = "data-d3-kyb-resolving";

    function stop() {
      window.clearTimeout(failsafe);
      failsafe = 0;
      ws.removeAttribute(RESOLVING);
    }

    function sync() {
      if (!thread.querySelector(".d1-user")) {
        busy = false;
        sawBusy = false;
        ws.removeAttribute("data-d3-map-ready");
        stop();
        return;
      }
      if (ws.getAttribute("data-d3-kyb-surface") !== "map") return stop();
      if (!awaitEl.hidden) {
        /* The waiting card replaces the map: nothing is ready until matches come. */
        ws.removeAttribute("data-d3-map-ready");
        return stop();
      }
      if (ws.hasAttribute("data-d3-map-ready")) return stop();
      if (busy || !sawBusy) {
        if (!ws.hasAttribute(RESOLVING)) {
          ws.setAttribute(RESOLVING, "");
          /* Never leave the skeleton up for good (e.g. a search with no hits). */
          failsafe = window.setTimeout(function () {
            ws.setAttribute("data-d3-map-ready", "1");
            stop();
          }, 12000);
        }
        return;
      }
      /* The agent finished and still knows no business / country (plain Q&A):
         keep the map away and show what it is waiting for. */
      stop();
      if (window.D3KybMapSearch && window.D3KybMapSearch.setAwaitingCountry) {
        window.D3KybMapSearch.setAwaitingCountry(true, "");
      }
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
    new MutationObserver(sync).observe(thread, { childList: true });
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
