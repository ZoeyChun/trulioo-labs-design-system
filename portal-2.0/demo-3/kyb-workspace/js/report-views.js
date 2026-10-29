/* ============================================================
   Demo 3 — KYB report: progressive generation + view options
   ============================================================
   The report no longer arrives whole. Only the Overview is generated
   when it loads; Ownership & UBO, Match Signals & Sources, Additional
   Data and Web & Social Insights are offered as stubs the user asks
   for, one at a time.

   GENERATION RIDES THE CHAT. Asking for a section dispatches the same
   `d3-chat:send` the suggested-action buttons use, so the left panel
   shows the prompt, the agent's thinking state and its reply — the
   real path, not a simulation of one. js/d3-kyb-agent.js answers those
   prompts and calls D3KybReport.selectTab(), which is wrapped below:
   that call is what marks a section generated. The timeout is only a
   floor, for the case where the agent answers without selecting.

   Four views over the same panels, differing in how the ungenerated
   sections are offered:

     feed   stubs stacked under the overview; the page scrolls
     nodes  a canvas of connected cards, root plus four children
     rail   a persistent index down the left, one section at a time
     focus  one section at a time, full width, with a pager

   Styling: css/report-views.css.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var card = document.querySelector("[data-kw-view]");
  if (!card) return;

  /* Overview is not here: it is generated with the report. Order is
     the order sections are offered in. `prompt` has to be a phrasing
     js/d3-kyb-agent.js routes to the matching tab — see parseQuery. */
  var SECTIONS = [
    {
      key: "ownership",
      label: "Ownership & UBO",
      blurb: "Beneficial owners, shareholders and the people behind the entity.",
      prompt: "Who are the beneficial owners?",
      icon: "fa-regular fa-sitemap"
    },
    {
      key: "signals",
      label: "Match Signals & Sources",
      blurb: "What matched, what did not, and which sources each field came from.",
      prompt: "Open signals",
      icon: "fa-regular fa-shield-check"
    },
    {
      key: "web",
      label: "Web & Social Insights",
      blurb: "Digital footprint — site, listings and social presence.",
      prompt: "Show web & social insights",
      icon: "fa-regular fa-globe"
    },
    {
      key: "additional",
      label: "Additional Data",
      blurb: "Secondary registry fields and anything else the check returned.",
      prompt: "Show additional data",
      icon: "fa-regular fa-layer-group"
    }
  ];

  var VIEWS = ["feed", "nodes", "rail", "focus"];

  /* key → "idle" | "running" | "done". Overview is implicit. */
  var state = {};
  SECTIONS.forEach(function (s) { state[s.key] = "idle"; });

  var body = card.querySelector(".d3-kyb-resume__body");
  var tabs = card.querySelector(".d3-kyb-tabs");

  function panel(key) {
    return card.querySelector('.d3-kyb-panel[data-d3-kyb-panel="' + key + '"]');
  }

  function stub(key) {
    return card.querySelector('[data-kw-stub="' + key + '"]');
  }

  function view() {
    return card.getAttribute("data-kw-view") || "feed";
  }

  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ----------------------------------------------------------------
     Stubs — the offer for an ungenerated section
     ---------------------------------------------------------------- */
  function buildStubs() {
    SECTIONS.forEach(function (s) {
      if (stub(s.key)) return;
      var p = panel(s.key);
      if (!p) return;

      var el = document.createElement("section");
      el.className = "kw-stub";
      el.setAttribute("data-kw-stub", s.key);
      el.innerHTML =
        '<div class="kw-stub__head">' +
        '<span class="kw-stub__icon" aria-hidden="true"><i class="' + s.icon + '"></i></span>' +
        '<div class="kw-stub__text">' +
        '<h3 class="kw-stub__title">' + esc(s.label) + "</h3>" +
        '<p class="kw-stub__blurb">' + esc(s.blurb) + "</p>" +
        "</div>" +
        "</div>" +
        '<button type="button" class="kw-stub__cta" data-kw-generate="' + s.key + '">' +
        '<span class="kw-stub__plus" aria-hidden="true">+</span>' +
        "<span>Generate this section</span>" +
        "</button>" +
        '<p class="kw-stub__progress" role="status" aria-live="polite">' +
        '<span class="kw-stub__spinner" aria-hidden="true"></span>' +
        "Generating " + esc(s.label) + "…</p>";

      /* Immediately before its panel, so every view gets the stub and
         the real section in the same place in the document. */
      p.parentNode.insertBefore(el, p);
    });
  }

  /* ----------------------------------------------------------------
     State
     ---------------------------------------------------------------- */
  function paint() {
    var v = view();
    var current = card.getAttribute("data-kw-current") || "overview";

    SECTIONS.forEach(function (s) {
      var p = panel(s.key);
      var el = stub(s.key);
      if (!p || !el) return;

      el.setAttribute("data-kw-state", state[s.key]);
      p.setAttribute("data-kw-state", state[s.key]);

      /* The report's own tab script owns `hidden`; these views never
         want it doing that, so it is cleared once and the CSS decides
         what shows from data-kw-state and the view. */
      p.hidden = false;

      var selected = s.key === current;
      p.classList.toggle("is-selected", selected);
      el.classList.toggle("is-selected", selected);
    });

    var overview = panel("overview");
    if (overview) {
      overview.hidden = false;
      overview.classList.toggle("is-selected", current === "overview");
    }

    card.setAttribute("data-kw-generated", String(countDone()));
    paintIndex();
  }

  function countDone() {
    return SECTIONS.filter(function (s) { return state[s.key] === "done"; }).length;
  }

  function setState(key, next) {
    if (!(key in state)) return;
    state[key] = next;
    paint();
  }

  /* ----------------------------------------------------------------
     Generation
     ---------------------------------------------------------------- */
  /* How long the generating state is held open at minimum. The agent
     calls selectTab() early in its handler — before it has written the
     answer — so without a floor the progress line flashes and is gone,
     and the section appears to have been there all along. */
  var MIN_RUN_MS = 1500;
  var startedAt = {};

  function generate(key) {
    var spec = SECTIONS.filter(function (s) { return s.key === key; })[0];
    if (!spec || state[key] !== "idle") return;

    startedAt[key] = Date.now();
    setState(key, "running");

    /* The real chat path: the agent renders the user turn, its own
       thinking state and a reply, and selects the matching tab. */
    document.dispatchEvent(
      new CustomEvent("d3-chat:send", {
        detail: { text: spec.prompt, agent: "kyb" },
        cancelable: true
      })
    );

    /* Floor, not the mechanism — selectTab below is what normally
       completes it. This only covers an answer that never selects. */
    window.setTimeout(function () {
      if (state[key] === "running") finish(key);
    }, 4200);
  }

  function finish(key) {
    if (state[key] === "done") return;

    var waited = Date.now() - (startedAt[key] || 0);
    if (state[key] === "running" && waited < MIN_RUN_MS) {
      window.setTimeout(function () { finish(key); }, MIN_RUN_MS - waited);
      return;
    }

    setState(key, "done");
    show(key);
  }

  function show(key) {
    card.setAttribute("data-kw-current", key);
    paint();

    var target = state[key] === "done" ? panel(key) : stub(key);
    if (target && view() === "feed") {
      window.setTimeout(function () {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    }
  }

  /* D3KybReport.selectTab is the agent's "I have produced this
     section" signal. Wrapping it keeps generation tied to the answer
     rather than to a timer. */
  function wrapSelectTab() {
    var api = window.D3KybReport;
    if (!api || typeof api.selectTab !== "function" || api.__kwWrapped) return false;

    var inner = api.selectTab;
    api.selectTab = function (name) {
      var out = inner.apply(this, arguments);
      if (name && name in state) finish(name);
      else if (name === "overview") { card.setAttribute("data-kw-current", "overview"); paint(); }
      return out;
    };
    api.__kwWrapped = true;
    return true;
  }

  /* ----------------------------------------------------------------
     Rail index — the persistent list the rail view navigates by
     ---------------------------------------------------------------- */
  var index = null;

  function buildIndex() {
    if (index || !body) return;
    index = document.createElement("nav");
    index.className = "kw-index";
    index.setAttribute("aria-label", "Report sections");
    index.innerHTML =
      '<button type="button" class="kw-index__item" data-kw-goto="overview">' +
      '<span class="kw-index__dot is-done" aria-hidden="true"></span>' +
      '<span class="kw-index__label">Overview</span></button>' +
      SECTIONS.map(function (s) {
        return (
          '<button type="button" class="kw-index__item" data-kw-goto="' + s.key + '">' +
          '<span class="kw-index__dot" aria-hidden="true"></span>' +
          '<span class="kw-index__label">' + esc(s.label) + "</span>" +
          '<span class="kw-index__state"></span></button>'
        );
      }).join("");
    body.insertBefore(index, tabs || body.firstChild);
  }

  function paintIndex() {
    if (!index) return;
    var current = card.getAttribute("data-kw-current") || "overview";
    Array.prototype.forEach.call(index.querySelectorAll("[data-kw-goto]"), function (btn) {
      var key = btn.getAttribute("data-kw-goto");
      var st = key === "overview" ? "done" : state[key];
      btn.classList.toggle("is-active", key === current);
      btn.setAttribute("data-kw-state", st);
      var label = btn.querySelector(".kw-index__state");
      if (label) {
        label.textContent =
          st === "done" ? "" : st === "running" ? "Generating…" : "Generate";
      }
      var dot = btn.querySelector(".kw-index__dot");
      if (dot) dot.className = "kw-index__dot" + (st === "done" ? " is-done" : "");
    });
  }

  /* ----------------------------------------------------------------
     Wiring
     ---------------------------------------------------------------- */
  function setView(name) {
    if (VIEWS.indexOf(name) === -1) return;
    card.setAttribute("data-kw-view", name);
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-kw-raxis="view"] [data-kw-ropt]'),
      function (btn) {
        var on = btn.getAttribute("data-kw-ropt") === name;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-pressed", String(on));
      }
    );
    paint();
  }

  function reset() {
    SECTIONS.forEach(function (s) { state[s.key] = "idle"; });
    card.setAttribute("data-kw-current", "overview");
    paint();
  }

  function bind() {
    /* Generate buttons, index entries and node headers all route here. */
    card.addEventListener("click", function (event) {
      var gen = event.target.closest("[data-kw-generate]");
      if (gen) {
        generate(gen.getAttribute("data-kw-generate"));
        return;
      }
      var goto_ = event.target.closest("[data-kw-goto]");
      if (goto_) {
        var key = goto_.getAttribute("data-kw-goto");
        if (key !== "overview" && state[key] === "idle") generate(key);
        else show(key);
      }
    });

    /* The report's own tab bar is hidden in every view, but keep it in
       step so nothing downstream reads a stale active tab. */
    var lab = document.querySelector("[data-kw-report-lab]");
    if (lab) {
      lab.addEventListener("click", function (event) {
        if (event.target.closest("[data-kw-reset]")) { reset(); return; }
        var opt = event.target.closest("[data-kw-ropt]");
        if (opt) setView(opt.getAttribute("data-kw-ropt"));
      });
    }
  }

  /* The card is rendered by the report pipeline after this script
     runs, so wait for it to go live before taking it over. */
  function ready() {
    return card.classList.contains("is-live") && !!panel("overview");
  }

  function boot(attempt) {
    if (!ready()) {
      if (attempt > 80) return;
      window.setTimeout(function () { boot(attempt + 1); }, 100);
      return;
    }
    buildStubs();
    buildIndex();
    bind();
    wrapSelectTab();
    card.setAttribute("data-kw-current", "overview");
    paint();

    /* selectTab may not exist yet on the first pass. */
    var tries = 0;
    var t = window.setInterval(function () {
      if (wrapSelectTab() || ++tries > 40) window.clearInterval(t);
    }, 150);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(0); });
  } else {
    boot(0);
  }
})();
