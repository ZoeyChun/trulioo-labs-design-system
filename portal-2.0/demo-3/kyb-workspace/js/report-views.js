/* ============================================================
   Demo 3 — KYB report: progressive generation + view options
   ============================================================
   The report no longer arrives whole. Only Findings is generated when
   it loads — it is the verdict, and the one section that is worth
   having before you know what you are looking for. Business Info,
   Owners & UBOs, Match Signals & Sources, Additional Data and Web &
   Social Insights are offered as stubs the user asks for, one at a
   time.

   GENERATION RIDES THE CHAT. Asking for a section dispatches the same
   `d3-chat:send` the suggested-action buttons use, so the left panel
   shows the prompt, the agent's thinking state and its reply — the
   real path, not a simulation of one. js/d3-kyb-agent.js answers those
   prompts and calls D3KybReport.selectTab(), which is wrapped below:
   that call is what marks a section generated. The timeout is only a
   floor, for the case where the agent answers without selecting.

   Four views over the same panels, differing in how the ungenerated
   sections are offered:

     feed   stubs stacked under Findings; the page scrolls
     nodes  a pannable canvas: report → sections → the open one
     rail   a persistent index down the left, one section at a time
     focus  one section at a time, full width, with a pager

   Styling: css/report-views.css.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var card = document.querySelector("[data-kw-view]");
  if (!card) return;

  /* Order is the order sections are offered in. `prompt` has to be a
     phrasing js/d3-kyb-agent.js routes to the matching tab — see
     parseQuery. `seeded` marks the one that arrives with the report.

     Findings is seeded because it is the verdict: upstream made it the
     report's first tab, and a report that opens on "here is what we
     concluded" is the whole premise of generating the rest on demand.
     Business Info is a section like any other now. */
  var SECTIONS = [
    {
      key: "findings",
      label: "Findings",
      seeded: true,
      blurb: "The verdict, what needs attention, and what was verified.",
      prompt: "Show the findings",
      icon: "<svg viewBox='0 0 16 16' fill='none' aria-hidden='true'><path stroke='currentColor' stroke-width='1.3' stroke-linejoin='round' d='M8 1.75 13.25 4v4.1c0 3.05-2.1 5.5-5.25 6.4-3.15-.9-5.25-3.35-5.25-6.4V4L8 1.75Z'/><path stroke='currentColor' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round' d='m5.9 8.1 1.5 1.5 3-3'/></svg>"
    },
    {
      key: "overview",
      label: "Business Info",
      blurb: "Registry record, address and the fields the check returned.",
      prompt: "Show business info",
      icon: "<svg viewBox='0 0 16 16' fill='none' aria-hidden='true'><rect x='2.25' y='2.25' width='11.5' height='11.5' rx='2' stroke='currentColor' stroke-width='1.3'/><path stroke='currentColor' stroke-width='1.3' stroke-linecap='round' d='M5.25 6.25h5.5M5.25 9h5.5M5.25 11.25h3'/></svg>"
    },
    {
      key: "ownership",
      label: "Owners & UBOs",
      blurb: "Beneficial owners, shareholders and the people behind the entity.",
      prompt: "Who are the beneficial owners?",
      icon: "<svg viewBox='0 0 16 16' fill='none' aria-hidden='true'><rect x='5.75' y='1.5' width='4.5' height='3.5' rx='1' stroke='currentColor' stroke-width='1.3'/><rect x='1.5' y='11' width='4' height='3.5' rx='1' stroke='currentColor' stroke-width='1.3'/><rect x='10.5' y='11' width='4' height='3.5' rx='1' stroke='currentColor' stroke-width='1.3'/><path stroke='currentColor' stroke-width='1.3' stroke-linecap='round' d='M8 5v3M3.5 11V8.5h9V11'/></svg>"
    },
    {
      key: "signals",
      label: "Match Signals & Sources",
      blurb: "What matched, what did not, and which sources each field came from.",
      prompt: "Open signals",
      icon: "<svg viewBox='0 0 16 16' fill='none' aria-hidden='true'><path stroke='currentColor' stroke-width='1.3' stroke-linecap='round' d='M2.75 13.25v-3.5M6.25 13.25V6.5M9.75 13.25V8.75M13.25 13.25v-10'/></svg>"
    },
    {
      key: "web",
      label: "Web & Social Insights",
      blurb: "Digital footprint — site, listings and social presence.",
      prompt: "Show web & social insights",
      icon: "<svg viewBox='0 0 16 16' fill='none' aria-hidden='true'><circle cx='8' cy='8' r='6.25' stroke='currentColor' stroke-width='1.3'/><path stroke='currentColor' stroke-width='1.3' d='M1.75 8h12.5'/><path stroke='currentColor' stroke-width='1.3' d='M8 1.75c1.7 1.9 2.6 4 2.6 6.25S9.7 12.35 8 14.25C6.3 12.35 5.4 10.25 5.4 8S6.3 3.65 8 1.75Z'/></svg>"
    },
    {
      key: "additional",
      label: "Additional Data",
      blurb: "Secondary registry fields and anything else the check returned.",
      prompt: "Show additional data",
      icon: "<svg viewBox='0 0 16 16' fill='none' aria-hidden='true'><path stroke='currentColor' stroke-width='1.3' stroke-linejoin='round' d='M8 1.75 14.25 5 8 8.25 1.75 5 8 1.75Z'/><path stroke='currentColor' stroke-width='1.3' stroke-linejoin='round' d='m1.75 8 6.25 3.25L14.25 8'/><path stroke='currentColor' stroke-width='1.3' stroke-linejoin='round' d='m1.75 11 6.25 3.25L14.25 11'/></svg>"
    }
  ];

  var VIEWS = ["feed", "nodes", "rail", "focus"];

  /* What a node card says about itself. The Figma shows content-derived
     tags here ("1 item", "Matched") — those are not available for a
     section that has not been generated yet, which is the state the tag
     exists to communicate, so it reports generation instead. */
  var TAG = { idle: "Not generated", running: "Generating", done: "Ready" };

  /* key → "idle" | "running" | "done". */
  var SEED = SECTIONS.filter(function (s) { return s.seeded; })[0].key;

  var state = {};
  SECTIONS.forEach(function (s) { state[s.key] = s.seeded ? "done" : "idle"; });

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
    SECTIONS.forEach(function (s, i) {
      if (stub(s.key)) return;
      var p = panel(s.key);
      if (!p) return;

      var el = document.createElement("section");
      el.className = "kw-stub";
      el.setAttribute("data-kw-stub", s.key);
      /* The whole card selects; only the port generates. In the nodes
         view the card is the node, so it has to be clickable as one. */
      el.setAttribute("data-kw-goto", s.key);
      /* Row in the sections column of the nodes grid. Set here rather
         than with :nth-child because the stubs are interleaved with
         their panels in the document — the DOM order of the column is
         not the order of its children. */
      el.style.setProperty("--kw-row", String(i + 1));
      el.innerHTML =
        '<div class="kw-stub__head">' +
        '<span class="kw-stub__icon" aria-hidden="true">' + s.icon + "</span>" +
        '<div class="kw-stub__text">' +
        '<h3 class="kw-stub__title">' + esc(s.label) + "</h3>" +
        '<p class="kw-stub__blurb">' + esc(s.blurb) + "</p>" +
        "</div>" +
        '<span class="kw-stub__tag"></span>' +
        "</div>" +
        '<button type="button" class="kw-stub__cta" data-kw-generate="' + s.key + '">' +
        '<span class="kw-stub__plus" aria-hidden="true">+</span>' +
        "<span>Generate this section</span>" +
        "</button>" +
        '<p class="kw-stub__progress" role="status" aria-live="polite">' +
        '<span class="kw-stub__spinner" aria-hidden="true"></span>' +
        "Generating " + esc(s.label) + "…</p>" +
        /* The port on the node's right edge — the Figma affordance for
           "this branch has something behind it". */
        '<button type="button" class="kw-stub__port" data-kw-generate="' + s.key + '"' +
        ' title="Generate ' + esc(s.label) + '" aria-label="Generate ' + esc(s.label) + '">+</button>';

      /* Immediately before its panel, so every view gets the stub and
         the real section in the same place in the document. */
      p.parentNode.insertBefore(el, p);
    });
  }

  /* ----------------------------------------------------------------
     State
     ---------------------------------------------------------------- */
  function paint() {
    var current = card.getAttribute("data-kw-current") || SEED;

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

      var tag = el.querySelector(".kw-stub__tag");
      if (tag) {
        tag.textContent = TAG[state[s.key]] || "";
        tag.setAttribute("data-kw-tone", state[s.key]);
      }

      var selected = s.key === current;
      p.classList.toggle("is-selected", selected);
      el.classList.toggle("is-selected", selected);
    });

    card.setAttribute("data-kw-generated", String(countDone()));
    paintIndex();
    drawWires();
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

  /* The section the user actually asked for, while it is in flight.

     The agent does not always answer with the section it was asked
     for: handleRisk() in js/d3-kyb-agent.js selects Business Info
     instead of Match Signals when the entity has no risks, which is
     sensible in a tabbed report and wrong here — you asked for one
     node and the canvas opened a different one. Anything the agent
     produces still counts as generated; only the selection is held.

     It is held on a clock rather than until the asked-for section
     arrives, because the override comes *after* the right answer:
     handleTab() selects the requested tab and only then hands off to
     handleRisk(), which selects another. Clearing on the first
     selection would let the second one through. A user click clears
     it outright — their navigation always wins. */
  var pending = null;
  var pendingUntil = 0;

  function holding(key) {
    return pending && pending !== key && Date.now() < pendingUntil;
  }

  function generate(key) {
    var spec = SECTIONS.filter(function (s) { return s.key === key; })[0];
    if (!spec || state[key] !== "idle") return;

    startedAt[key] = Date.now();
    pending = key;
    pendingUntil = Date.now() + 6000;
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
    /* Already generated — this is the agent (or a Findings evidence
       chip) pointing at a section that exists. Honour it as a jump,
       unless a section the user asked for is still on its way. */
    if (state[key] === "done") {
      if (!holding(key)) show(key);
      return;
    }

    var waited = Date.now() - (startedAt[key] || 0);
    if (state[key] === "running" && waited < MIN_RUN_MS) {
      window.setTimeout(function () { finish(key); }, MIN_RUN_MS - waited);
      return;
    }

    setState(key, "done");

    /* A section the agent produced on its own way to answering. It is
       real and it stays generated — it just does not steal the canvas
       from what was asked for. */
    if (holding(key)) return;

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

    /* The open panel changes the canvas's extent, so the wires have to
       be redrawn against the new layout rather than the old one. */
    if (view() === "nodes") window.setTimeout(drawWires, 60);
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
    var current = card.getAttribute("data-kw-current") || SEED;
    Array.prototype.forEach.call(index.querySelectorAll("[data-kw-goto]"), function (btn) {
      var key = btn.getAttribute("data-kw-goto");
      var st = state[key];
      btn.classList.toggle("is-active", key === current);
      btn.setAttribute("data-kw-state", st);
      var label = btn.querySelector(".kw-index__state");
      if (label) {
        label.textContent = st === "done" ? "" : st === "running" ? "…" : "+";
        label.setAttribute(
          "title",
          st === "done" ? "" : st === "running" ? "Generating" : "Generate this section"
        );
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
    resetCam();
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-kw-raxis="view"] [data-kw-ropt]'),
      function (btn) {
        var on = btn.getAttribute("data-kw-ropt") === name;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-pressed", String(on));
      }
    );
    paint();
    /* Let the new layout settle before measuring it to fit. */
    if (name === "nodes") window.setTimeout(fit, 60);
  }

  function reset() {
    SECTIONS.forEach(function (s) { state[s.key] = s.seeded ? "done" : "idle"; });
    card.setAttribute("data-kw-current", SEED);
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
        /* Explicit navigation outranks anything still in flight. */
        pending = null;
        /* The "+" is the shortcut that generates straight from the
           index; the row itself only selects, so an ungenerated
           section shows its offer — with the CTA — rather than being
           generated by the act of looking at it. */
        if (event.target.closest(".kw-index__state") && state[key] === "idle") {
          show(key);
          generate(key);
          return;
        }
        /* The nodes view is the exception: there the card IS the node,
           and clicking a node on a canvas means "open this". With no
           pane to show the offer in, selecting alone would do nothing
           visible. */
        if (view() === "nodes" && state[key] === "idle") {
          show(key);
          generate(key);
          return;
        }
        show(key);
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

  /* ================================================================
     Node canvas — camera and wires

     The layout follows Figma 1804-89084: three columns reading left to
     right. The report is the root on the left, every section is a card
     in a fixed column beside it, and the one you open draws itself in
     a third column further right.

     That column split is what fixes the two faults in the previous
     pass. Nothing in columns one and two moves when a section is
     generated, because generating does not change the layout — it
     fills the third column. And the open panel is the only thing that
     can be tall, so it is the only thing that needs to be bounded.

     The canvas pans in both axes like a FigJam board and zooms from a
     control at the foot. Zoom was an open question last round; the
     Figma answers it (− 100% + Fit), and with the open panel now
     living out to the right there is genuinely more than a screenful
     to move around in.
     ================================================================ */

  /* translate() is applied before scale(), so a drag of n screen pixels
     is n camera pixels regardless of zoom — no division. */
  var cam = { x: 0, y: 0, z: 1, down: false, px: 0, py: 0 };
  var ZOOM_MIN = 0.4;
  var ZOOM_MAX = 1.6;

  function viewport() {
    return card.closest(".d3-workspace__detail");
  }

  function applyCam() {
    if (view() !== "nodes") {
      card.style.transform = "";
      card.style.transformOrigin = "";
      return;
    }
    card.style.transformOrigin = "0 0";
    card.style.transform =
      "translate(" + cam.x + "px," + cam.y + "px) scale(" + cam.z + ")";
    var out = document.querySelector("[data-kw-zoom-level]");
    if (out) out.textContent = Math.round(cam.z * 100) + "%";
  }

  function zoomTo(next) {
    var vp = viewport();
    if (!vp) return;
    next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next));
    var r = vp.getBoundingClientRect();
    /* Hold the point under the viewport centre still, so zooming does
       not also walk the canvas sideways. */
    var cx = r.width / 2;
    var cy = r.height / 2;
    cam.x = cx - (cx - cam.x) * (next / cam.z);
    cam.y = cy - (cy - cam.y) * (next / cam.z);
    cam.z = next;
    applyCam();
  }

  function fit() {
    var vp = viewport();
    if (!vp || !body) return;
    var r = vp.getBoundingClientRect();
    /* Measured unscaled: scrollWidth/Height ignore the transform. */
    var w = body.scrollWidth;
    var h = body.scrollHeight;
    if (!w || !h) return;
    var z = Math.min(1, (r.width - 56) / w, (r.height - 72) / h);
    cam.z = Math.max(ZOOM_MIN, z);
    cam.x = (r.width - w * cam.z) / 2;
    cam.y = Math.max(16, (r.height - h * cam.z) / 2);
    applyCam();
  }

  function resetCam() {
    cam.x = 0;
    cam.y = 0;
    cam.z = 1;
    applyCam();
  }

  function buildZoom() {
    var vp = viewport();
    if (!vp || vp.querySelector("[data-kw-zoom]")) return;
    var el = document.createElement("div");
    el.className = "kw-zoom";
    el.setAttribute("data-kw-zoom", "");
    el.innerHTML =
      '<button type="button" class="kw-zoom__btn" data-kw-zoom-out aria-label="Zoom out">&minus;</button>' +
      '<span class="kw-zoom__level" data-kw-zoom-level>100%</span>' +
      '<button type="button" class="kw-zoom__btn" data-kw-zoom-in aria-label="Zoom in">+</button>' +
      '<button type="button" class="kw-zoom__fit" data-kw-zoom-fit>Fit</button>';
    el.addEventListener("click", function (event) {
      if (event.target.closest("[data-kw-zoom-out]")) zoomTo(cam.z - 0.1);
      else if (event.target.closest("[data-kw-zoom-in]")) zoomTo(cam.z + 0.1);
      else if (event.target.closest("[data-kw-zoom-fit]")) fit();
    });
    vp.appendChild(el);
  }

  function bindPan() {
    var vp = viewport();
    if (!vp) return;

    vp.addEventListener("pointerdown", function (event) {
      if (view() !== "nodes") return;
      /* Let the controls inside a node keep their clicks, and let the
         open panel keep its own scrolling — it is the one thing on the
         canvas tall enough to need it. */
      if (event.target.closest("button, a, input, select, textarea")) return;
      if (event.target.closest(".d3-kyb-panel")) return;
      cam.down = true;
      cam.px = event.clientX;
      cam.py = event.clientY;
      vp.setPointerCapture(event.pointerId);
      vp.classList.add("is-panning");
    });

    vp.addEventListener("pointermove", function (event) {
      if (!cam.down || view() !== "nodes") return;
      cam.x += event.clientX - cam.px;
      cam.y += event.clientY - cam.py;
      cam.px = event.clientX;
      cam.py = event.clientY;
      applyCam();
    });

    function end(event) {
      if (!cam.down) return;
      cam.down = false;
      vp.classList.remove("is-panning");
      try { vp.releasePointerCapture(event.pointerId); } catch (e) {}
    }

    vp.addEventListener("pointerup", end);
    vp.addEventListener("pointercancel", end);
  }

  /* ----------------------------------------------------------------
     Wires

     Drawn into an SVG that is a child of the body, so it shares the
     camera transform and the paths can be computed once in the body's
     own unscaled coordinates — offsetLeft/offsetTop, which the
     transform does not touch.
     ---------------------------------------------------------------- */
  var wires = null;

  function buildWires() {
    if (wires || !body) return;
    wires = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    wires.setAttribute("class", "kw-wires");
    wires.setAttribute("aria-hidden", "true");
    body.insertBefore(wires, body.firstChild);
  }

  function curve(from, to) {
    var dx = Math.max(28, (to.x - from.x) * 0.5);
    return (
      "M" + from.x + "," + from.y +
      "C" + (from.x + dx) + "," + from.y +
      " " + (to.x - dx) + "," + to.y +
      " " + to.x + "," + to.y
    );
  }

  function rightOf(el) {
    return { x: el.offsetLeft + el.offsetWidth, y: el.offsetTop + el.offsetHeight / 2 };
  }

  function leftOf(el) {
    return { x: el.offsetLeft, y: el.offsetTop + el.offsetHeight / 2 };
  }

  function drawWires() {
    if (!wires || !body) return;
    if (view() !== "nodes") { wires.innerHTML = ""; return; }

    var root = card.querySelector(".d3-kyb-resume__identity");
    if (!root) return;

    var w = body.scrollWidth;
    var h = body.scrollHeight;
    wires.setAttribute("viewBox", "0 0 " + w + " " + h);
    wires.setAttribute("width", w);
    wires.setAttribute("height", h);

    var current = card.getAttribute("data-kw-current") || SEED;
    var out = [];

    SECTIONS.forEach(function (s) {
      var el = stub(s.key);
      if (!el || !el.offsetWidth) return;
      var live = s.key === current;
      out.push(
        '<path class="kw-wire' + (live ? " is-live" : "") + '" d="' +
        curve(rightOf(root), leftOf(el)) + '"/>'
      );

      if (!live) return;
      var p = panel(s.key);
      if (p && p.offsetWidth && state[s.key] === "done") {
        out.push('<path class="kw-wire is-live" d="' + curve(rightOf(el), leftOf(p)) + '"/>');
      }
    });

    wires.innerHTML = out.join("");
  }

  /* The card is rendered by the report pipeline after this script
     runs, so wait for it to go live before taking it over. */
  function ready() {
    return card.classList.contains("is-live") && !!panel(SEED);
  }

  function boot(attempt) {
    if (!ready()) {
      if (attempt > 80) return;
      window.setTimeout(function () { boot(attempt + 1); }, 100);
      return;
    }
    buildStubs();
    buildIndex();
    buildWires();
    buildZoom();
    /* The nodes grid needs one explicit row per section — see
       report-views.css. */
    if (body) body.style.setProperty("--kw-rows", String(SECTIONS.length));
    bind();
    bindPan();
    wrapSelectTab();
    card.setAttribute("data-kw-current", SEED);
    paint();

    /* The panels fill in asynchronously (Findings renders from the
       business record, the hero map settles), so the first measurement
       is stale almost immediately. Watch instead of guessing. */
    if (window.ResizeObserver && body) {
      new window.ResizeObserver(function () { drawWires(); }).observe(body);
    }
    window.addEventListener("resize", drawWires);

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
