/**
 * Demo App — state + motion for the single-frame prototype.
 *
 *   Intro          logo + hero → pills → cards left to right (~1.9s)
 *   Tab switch     white pill slides; old cards fade out, new ones fade in, same order
 *   Card select    browse fades out → "Initializing device profile" holds 1s → next screen
 *   Select Flow    industry journey, steps from demo-flows.js
 *   Product flow   eID steps + report, markup from demo-eid.js
 *
 * Products have two entry points: a card on the home Products rail, and the
 * final step of an industry journey (picking a verification method).
 *
 * Durations live in demo-app.css; the few this file needs are mirrored here.
 */
(function () {
  const frame = document.getElementById("da-frame");
  const screen = document.getElementById("da-screen");
  const browse = document.getElementById("da-browse");
  const status = document.getElementById("da-status");
  const thumb = document.getElementById("da-pill-thumb");
  const sheet = document.getElementById("da-sheet");
  const scroll = document.getElementById("da-sheet-scroll");
  const sheetMenu = document.getElementById("da-sheet-menu");

  const tabs = [
    { tab: document.getElementById("tab-industries"), rail: document.getElementById("rail-industries") },
    { tab: document.getElementById("tab-products"), rail: document.getElementById("rail-products") },
  ];

  const INTRO_CARD_DELAY = 950;
  const RAIL_LEAVE = 200;
  const SWAP_OUT = 280;
  const DEVICE_PROFILE_HOLD = 1000;

  let current = 0;
  let busy = false;

  /* ===== Home ============================================================ */

  function moveThumb(pill, animate) {
    if (!animate) thumb.style.transition = "none";
    thumb.style.width = `${pill.offsetWidth}px`;
    thumb.style.transform = `translateX(${pill.offsetLeft - thumb.offsetLeft}px)`;
    if (!animate) {
      void thumb.offsetWidth;
      thumb.style.transition = "";
    }
  }

  function playCards(rail, baseDelay) {
    rail.classList.remove("da-rail--enter");
    void rail.offsetWidth;
    rail.style.setProperty("--da-card-delay", `${baseDelay}ms`);
    rail.classList.add("da-rail--enter");
  }

  function selectTab(index, animate) {
    if (index === current && animate) return;
    const next = tabs[index];
    const prev = tabs[current];

    tabs.forEach((entry, i) => entry.tab.setAttribute("aria-selected", String(i === index)));
    moveThumb(next.tab, animate);

    if (!animate) {
      next.rail.hidden = false;
      prev.rail.hidden = index !== current;
      return;
    }

    busy = true;
    current = index;

    prev.rail.classList.add("da-rail--leave");
    window.setTimeout(() => {
      prev.rail.classList.remove("da-rail--leave", "da-rail--enter");
      prev.rail.hidden = true;
      next.rail.hidden = false;
      next.rail.scrollLeft = 0;
      playCards(next.rail, 0);
      busy = false;
    }, RAIL_LEAVE);
  }

  tabs.forEach((entry, i) => {
    entry.tab.addEventListener("click", () => {
      if (!busy) selectTab(i, true);
    });
    entry.tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const to = (i + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
      if (!busy) selectTab(to, true);
      tabs[to].tab.focus();
    });
  });

  /* ===== Fade swap ======================================================= */

  function swap(out, into, onShown) {
    busy = true;
    [out, into].forEach((el) => el.classList.remove("da-swap-in", "da-swap-out"));
    void out.offsetWidth;
    out.classList.add("da-swap-out");

    window.setTimeout(() => {
      out.classList.remove("da-swap-out");
      out.hidden = true;
      into.hidden = false;
      void into.offsetWidth;
      into.classList.add("da-swap-in");
      busy = false;
      if (onShown) onShown();
    }, SWAP_OUT);
  }

  /* ===== Icons + helpers ================================================= */

  const ICONS = {
    "chevron-left": '<path d="M8 2 4 6l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    "chevron-down": '<path d="M4 6.5 8 10.5l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    mobile:
      '<rect x="4.5" y="1.5" width="7" height="13" rx="1.75" stroke="currentColor" stroke-width="1.2"/>' +
      '<path d="M6.9 12.6h2.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>',
    "credit-card":
      '<rect x="1.5" y="4" width="17" height="12" rx="2.25" stroke="currentColor" stroke-width="1.4"/>' +
      '<path d="M1.5 8.25h17" stroke="currentColor" stroke-width="1.4"/>' +
      '<path d="M4.75 12.75h3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    "id-card":
      '<rect x="1.5" y="4" width="17" height="12" rx="2.25" stroke="currentColor" stroke-width="1.4"/>' +
      '<circle cx="6.9" cy="9.1" r="1.7" stroke="currentColor" stroke-width="1.4"/>' +
      '<path d="M4.1 13.6c.55-1.2 1.6-1.8 2.8-1.8s2.25.6 2.8 1.8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>' +
      '<path d="M12.4 8.4h3.6M12.4 11.6h3.6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    fingerprint:
      '<path d="M3 10.2a7 7 0 0 1 14 0v2.6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>' +
      '<path d="M6.1 10.2a3.9 3.9 0 0 1 7.8 0v4.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>' +
      '<path d="M9 10.2a1 1 0 0 1 2 0v6.1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    wallet:
      '<rect x="1.75" y="4.25" width="16.5" height="12" rx="2.5" stroke="currentColor" stroke-width="1.4"/>' +
      '<path d="M13.9 8.9h4.35v3H13.9a1.5 1.5 0 0 1 0-3Z" stroke="currentColor" stroke-width="1.4"/>' +
      '<circle cx="15.2" cy="10.4" r=".75" fill="currentColor"/>',
    clock:
      '<circle cx="6" cy="6" r="4.75" stroke="currentColor" stroke-width="1"/>' +
      '<path d="M6 3.4V6l1.8 1.1" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>',
    memo:
      '<rect x="2.25" y="1" width="7.5" height="10" rx="1.25" stroke="currentColor" stroke-width="1"/>' +
      '<path d="M4.25 3.75h3.5M4.25 6h3.5M4.25 8.25h2" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>',
    lock:
      '<rect x="3" y="7" width="10" height="7" rx="1.75" stroke="currentColor" stroke-width="1.3"/>' +
      '<path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
    "circle-check":
      '<circle cx="12" cy="12" r="9.25" stroke="currentColor" stroke-width="1.6"/>' +
      '<path d="m7.75 12.25 2.75 2.75 5.75-5.75" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    "circle-exclamation":
      '<circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.3"/>' +
      '<path d="M8 4.75v3.9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>' +
      '<circle cx="8" cy="11.1" r=".8" fill="currentColor"/>',
    "shield-check":
      '<path d="M8 1.6 13.25 3.5v4c0 3.3-2.2 5.9-5.25 6.9C4.95 13.4 2.75 10.8 2.75 7.5v-4L8 1.6Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>' +
      '<path d="m5.9 7.9 1.6 1.6 2.9-2.9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>',
    "circle-info":
      '<circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.3"/>' +
      '<path d="M8 7.4v3.9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>' +
      '<circle cx="8" cy="5.1" r=".8" fill="currentColor"/>',
    "check-double":
      '<path d="M1 6.6 3.3 9l3.4-3.6" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="m5.4 6.6 2.3 2.4L11 5.4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>',
    "arrow-right":
      '<path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>',
    "arrow-left":
      '<path d="M20 12H4M11 5l-7 7 7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    "chevron-right":
      '<path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    "circle-xmark":
      '<circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.3"/>' +
      '<path d="m6 6 4 4M10 6l-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
    "circle-minus":
      '<circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.3"/>' +
      '<path d="M5.4 8h5.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
    smile:
      '<circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.3"/>' +
      '<path d="M5.5 9.4a3 3 0 0 0 5 0" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>' +
      '<circle cx="6" cy="6.4" r=".75" fill="currentColor"/><circle cx="10" cy="6.4" r=".75" fill="currentColor"/>',
    "face-viewfinder":
      '<path d="M1.75 5.5v-2a1.75 1.75 0 0 1 1.75-1.75h2M14.25 5.5v-2a1.75 1.75 0 0 0-1.75-1.75h-2M1.75 10.5v2a1.75 1.75 0 0 0 1.75 1.75h2M14.25 10.5v2a1.75 1.75 0 0 1-1.75 1.75h-2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>' +
      '<circle cx="8" cy="8" r="2.6" stroke="currentColor" stroke-width="1.3"/>',
    plus: '<path d="M8 3.25v9.5M3.25 8h9.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    filter:
      '<path d="M2.5 4.25h11M4.5 8h7M6.5 11.75h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    expand:
      '<path d="M6 1.75H2.75a1 1 0 0 0-1 1V6M10 1.75h3.25a1 1 0 0 1 1 1V6M6 14.25H2.75a1 1 0 0 1-1-1V10M10 14.25h3.25a1 1 0 0 0 1-1V10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  };

  // The grid each glyph above was drawn on. This is the viewBox and has nothing
  // to do with the rendered size — CSS sets that per context, so the same icon
  // can appear at 12, 16, 20 or 24 without being clipped.
  const ICON_BOX = {
    "chevron-left": 12,
    "chevron-down": 16,
    mobile: 16,
    "credit-card": 20,
    "id-card": 20,
    fingerprint: 20,
    wallet: 20,
    clock: 12,
    memo: 12,
    lock: 16,
    "circle-check": 24,
    "circle-exclamation": 16,
    "shield-check": 16,
    "circle-info": 16,
    "check-double": 12,
    "arrow-right": 16,
    "arrow-left": 24,
    "chevron-right": 16,
    "circle-xmark": 16,
    "circle-minus": 16,
    smile: 16,
    "face-viewfinder": 16,
    plus: 16,
    filter: 16,
    expand: 16,
  };

  function icon(name, size) {
    const box = ICON_BOX[name] || size || 16;
    return `<svg viewBox="0 0 ${box} ${box}" fill="none" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  }

  function esc(value) {
    return String(value).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  /* ===== State =========================================================== */

  const countries = window.DA_COUNTRIES || { all: [], byCode: {}, featured: [], detected: "nl" };
  const eid = window.DA_EID;
  const eudi = window.DA_EUDI;
  const doc = window.DA_DOC;

  const state = {
    view: null,          // "flow" | "eid1".."eid3" | "eudi1" | "eudi2" | "report"
    product: null,       // which product owns the report
    flow: null,          // industry journey, when one is running
    step: 0,
    picks: [],
    country: countries.detected,
    bank: "ing",
    reportTab: "product",
    openAccordions: {},
    cameFromFlow: false, // product reached from an industry journey, not the home rail
  };

  const ctx = { icon, esc, state };

  // Which product each verification-method option and each Products card opens.
  const PRODUCTS = {
    eid: { view: "eid1", firstTab: "product" },
    eudi: { view: "eudi1", firstTab: "product" },
    "kyc-docs": { view: "doc1", firstTab: "summary" },
  };

  const REPORTS = { eudi: () => eudi.report(ctx), "kyc-docs": () => doc.report(ctx) };

  // Every screen the sheet can show.
  const VIEWS = {
    flow: () => flowStep(state.step),
    eid1: () => eid.bankStep(ctx),
    eid2: () => eid.consentStep(ctx),
    eid3: () => eid.fallbackStep(ctx),
    eudi1: () => eudi.requestStep(ctx),
    eudi2: () => eudi.shareStep(ctx),
    doc1: () => doc.capture(ctx),
    report: () => (REPORTS[state.product] || (() => eid.report(ctx)))(),
  };

  /**
   * Risk gauge intro — the needle sweeps from the arc's zero point round to its
   * value, the green stroke draws in behind it, and the number counts up.
   * Runs on every render, so re-opening the tab replays it.
   */
  const GAUGE_MS = 1100;

  function playGauge() {
    const box = scroll.querySelector(".da-gauge");
    if (!box) return;

    const value = Number(box.dataset.gauge || 0);
    const sweep = Number(box.dataset.sweep || 0);
    const out = box.querySelector(".da-gauge__value");
    const needle = box.querySelector(".da-gauge__needle");
    const line = box.querySelector(".da-gauge__line");
    const fill = box.querySelector(".da-gauge__fill");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      out.textContent = value;
      return;
    }

    const easing = "cubic-bezier(0.4, 0, 0.2, 1)";
    const opts = { duration: GAUGE_MS, easing: easing, fill: "both" };

    needle.animate([{ transform: `rotate(-${sweep}deg)` }, { transform: "rotate(0deg)" }], opts);
    fill.animate([{ opacity: 0 }, { opacity: 1 }], opts);

    // Negative offset reveals the stroke from its end — the bottom of the arc —
    // so it grows towards the needle rather than away from it.
    const len = line.getTotalLength();
    line.style.strokeDasharray = `${len}`;
    line.animate([{ strokeDashoffset: -len }, { strokeDashoffset: 0 }], opts);

    const start = performance.now();
    (function tick(now) {
      const t = Math.min(1, (now - start) / GAUGE_MS);
      // Same shape as the easing above, so the digits track the needle.
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      out.textContent = Math.round(value * eased);
      if (t < 1) requestAnimationFrame(tick);
      else out.textContent = value;
    })(start);
  }

  function renderSheet(parts) {
    scroll.innerHTML = parts.scroll;
    if (parts.menu) {
      sheetMenu.innerHTML = parts.menu;
      sheetMenu.hidden = false;
    } else {
      sheetMenu.innerHTML = "";
      sheetMenu.hidden = true;
    }
    playGauge();
  }

  /* ===== Select Flow (industry journey) ================================== */

  function pickedIndex(stepIndex) {
    if (state.picks[stepIndex] != null) return state.picks[stepIndex];
    const options = state.flow.steps[stepIndex].options;
    const recommended = options.findIndex((o) => o.recommended);
    return recommended === -1 ? 0 : recommended;
  }

  function headingFor(stepIndex) {
    const step = state.flow.steps[stepIndex];
    if (step.heading) return step.heading;
    const prev = state.flow.steps[stepIndex - 1];
    return prev ? prev.options[pickedIndex(stepIndex - 1)].title : state.flow.label;
  }

  function flowStep(stepIndex) {
    const step = state.flow.steps[stepIndex];
    const backLabel = stepIndex === 0 ? "Home" : headingFor(stepIndex - 1);
    const selected = pickedIndex(stepIndex);
    const country = countries.byCode[state.country] || { code: "nl", name: "Netherlands" };
    // The flap reports what device intelligence found. Pick anything else and
    // it no longer applies, so it comes off.
    const detected = state.country === countries.detected;
    const chosen = step.options[selected];

    const options = step.options
      .map((option, i) => {
        const classes = ["da-check"];
        if (option.recommended) classes.push("da-check--recommended");
        return `
          <button class="${classes.join(" ")}" type="button" aria-pressed="${i === selected}" data-action="option" data-option="${i}">
            ${option.recommended ? '<span class="da-check__ribbon">Recommended</span>' : ""}
            <span class="da-check__icon">${icon(option.icon, 20)}</span>
            <span class="da-check__body">
              <span class="da-check__texts">
                <span class="da-check__title">${esc(option.title)}</span>
                <span class="da-check__desc">${esc(option.body)}</span>
              </span>
              <span class="da-check__tags">${option.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</span>
            </span>
          </button>`;
      })
      .join("");

    return {
      scroll: `
        <div class="da-topbar">
          <button class="da-back" type="button" data-action="back">
            ${icon("chevron-left", 12)}
            ${esc(backLabel)}
          </button>
        </div>

        <div class="da-flow__top">
          <h1 class="da-flow__title">${esc(headingFor(stepIndex))}</h1>

          <div class="da-field">
            <span class="da-field__label">Country</span>
            <div class="da-field__group">
              ${detected ? `<p class="da-field__hint">${icon("mobile", 16)} Detected by device intelligence</p>` : ""}
              <button class="da-select" type="button" data-action="country">
                <span class="da-select__flag fi fi-${country.code}"></span>
                <span class="da-select__value">${esc(country.name)}</span>
                <img class="da-select__caret" src="assets/select-caret.svg" alt="" width="16" height="16">
              </button>
            </div>
          </div>
        </div>

        <div class="da-flow__bottom">
          <div class="da-section">
            <h2 class="da-section__title">${esc(step.section)}</h2>
            <p class="da-section__note">${esc(step.note)}</p>
          </div>
          <div class="da-options">${options}</div>
        </div>`,
      menu: `
        <p class="da-appmenu__note">${icon("clock", 12)}<span>This flow typically takes ${esc(chosen.duration)}</span></p>
        <button class="da-cta" type="button" data-action="continue">Continue</button>`,
    };
  }

  function show(view, options) {
    const opts = options || {};
    state.view = view;
    let parts;

    parts = VIEWS[view] ? VIEWS[view]() : null;
    if (!parts) return;

    if (opts.immediate) {
      renderSheet(parts);
      scroll.scrollTop = 0;
      return;
    }

    busy = true;
    scroll.classList.remove("da-swap-in");
    void scroll.offsetWidth;
    scroll.classList.add("da-swap-out");
    window.setTimeout(() => {
      scroll.classList.remove("da-swap-out");
      renderSheet(parts);
      scroll.scrollTop = 0;
      void scroll.offsetWidth;
      scroll.classList.add("da-swap-in");
      busy = false;
    }, SWAP_OUT);
  }

  // Re-render the current view without the fade — for in-place state changes
  // like selecting a card, a tab or a country.
  function refresh() {
    const keep = scroll.scrollTop;
    show(state.view, { immediate: true });
    scroll.scrollTop = keep;
  }

  /* ===== Navigation ====================================================== */

  function resetProduct(id) {
    state.product = id;
    state.bank = "ing";
    state.reportTab = (PRODUCTS[id] && PRODUCTS[id].firstTab) || "product";
    state.openAccordions = {};
  }

  function startProduct(id, options) {
    const product = PRODUCTS[id];
    if (!product) return false;
    resetProduct(id);
    show(product.view, options);
    return true;
  }

  // Where each step's back arrow goes. A product's first step backs out to
  // whatever opened it — the journey, or home.
  const BACK = {
    eid2: "eid1",
    eid3: "eid1",
    eudi2: "eudi1",
  };

  function goBack() {
    if (busy) return;

    if (state.view === "flow") {
      if (state.step > 0) {
        state.picks.length = state.step;
        state.step -= 1;
        show("flow");
        return;
      }
      goHome();
      return;
    }

    if (BACK[state.view]) {
      show(BACK[state.view]);
      return;
    }

    if (state.cameFromFlow) {
      show("flow");
      return;
    }
    goHome();
  }

  function goHome() {
    if (busy) return;
    drawer.hidden = true;
    drawer.classList.remove("is-closing");
    picker.hidden = true;
    picker.classList.remove("da-swap-in", "da-swap-out");
    status.hidden = true;
    status.classList.remove("da-swap-in", "da-swap-out");
    browse.hidden = false;
    browse.classList.remove("da-swap-in", "da-swap-out");
    state.flow = null;
    state.cameFromFlow = false;
    swap(sheet, screen, () => {
      moveThumb(tabs[current].tab, false);
      playCards(tabs[current].rail, 0);
    });
  }

  function onContinue() {
    if (state.view === "flow") {
      state.picks[state.step] = pickedIndex(state.step);
      const chosen = state.flow.steps[state.step].options[state.picks[state.step]];

      if (state.step < state.flow.steps.length - 1) {
        state.step += 1;
        show("flow");
        return;
      }

      // Last step of the journey: hand off to the product that was picked.
      state.cameFromFlow = true;
      if (!startProduct(chosen.id)) goHome();
      return;
    }

    const NEXT = { eid1: "eid2", eudi1: "eudi2", doc1: "report" };
    if (NEXT[state.view]) {
      show(NEXT[state.view]);
      return;
    }

    goHome();
  }

  /* ===== Sheet interaction (delegated) =================================== */

  sheet.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target || busy) return;
    const action = target.dataset.action;

    if (action === "back") goBack();
    else if (action === "continue") onContinue();
    else if (action === "country") openCountries();
    else if (action === "option") {
      state.picks[state.step] = Number(target.dataset.option);
      refresh();
    } else if (action === "select-bank") {
      state.bank = target.dataset.bank;
      refresh();
    } else if (action === "accept") show("report");
    // eID offers a document fallback on decline; EUDI has no such screen, so
    // declining there just returns to the request.
    else if (action === "decline") show(state.product === "eudi" ? "eudi1" : "eid3");
    else if (action === "retry-eid") show("eid1");
    // The eID fallback hands straight over to document verification.
    else if (action === "use-document") {
      resetProduct("kyc-docs");
      show("doc1");
    }
    else if (action === "other-phone") openDrawer();
    else if (action === "tab") {
      state.reportTab = target.dataset.tab;
      refresh();
    } else if (action === "accordion") {
      const box = target.closest(".da-accordion");
      const id = box.dataset.accordion;
      state.openAccordions[id] = !state.openAccordions[id];
      box.classList.toggle("is-open", state.openAccordions[id]);
      target.setAttribute("aria-expanded", String(!!state.openAccordions[id]));
    }
  });

  /* ===== Bottom drawer (Figma 925:16837) ================================= */

  const drawer = document.getElementById("da-drawer");
  const drawerSheet = document.getElementById("da-drawer-sheet");

  function openDrawer() {
    drawerSheet.innerHTML = eudi.drawer();
    drawer.classList.remove("is-closing");
    drawer.hidden = false;
  }

  function closeDrawer() {
    if (drawer.hidden) return;
    drawer.classList.add("is-closing");
    window.setTimeout(() => {
      drawer.hidden = true;
      drawer.classList.remove("is-closing");
      drawerSheet.innerHTML = "";
    }, 260);
  }

  document.getElementById("da-drawer-scrim").addEventListener("click", closeDrawer);

  /* ===== Choose a country (Figma 1108:14658) ============================= */

  const picker = document.getElementById("da-countries");
  const pickerSearch = document.getElementById("da-countries-search");
  const featuredList = document.getElementById("da-featured");
  const featuredLabel = document.getElementById("da-featured-label");
  const allList = document.getElementById("da-all");

  function countryRow(country) {
    return (
      `<button class="da-country" type="button" data-code="${country.code}">` +
      `<span class="da-country__flag fi fi-${country.code}"></span>` +
      `<span class="da-country__name">${esc(country.name)}</span>` +
      '<svg viewBox="0 0 12 12" fill="none" aria-hidden="true">' +
      '<path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg></button>"
    );
  }

  function renderCountries(query) {
    const term = (query || "").trim().toLowerCase();
    const match = (c) => !term || c.name.toLowerCase().includes(term);

    const featured = countries.featured.filter(match);
    featuredList.innerHTML = featured.map(countryRow).join("");
    featuredList.hidden = featured.length === 0;
    featuredLabel.hidden = featured.length === 0;

    const all = countries.all.filter(match);
    allList.innerHTML = all.length
      ? all.map(countryRow).join("")
      : '<p class="da-countries__empty">No countries match that search.</p>';
  }

  function openCountries() {
    if (busy) return;
    pickerSearch.value = "";
    renderCountries("");
    picker.hidden = false;
    picker.scrollTop = 0;
    picker.classList.remove("da-swap-out");
    void picker.offsetWidth;
    picker.classList.add("da-swap-in");
  }

  function closeCountries() {
    picker.classList.remove("da-swap-in");
    void picker.offsetWidth;
    picker.classList.add("da-swap-out");
    window.setTimeout(() => {
      picker.classList.remove("da-swap-out");
      picker.hidden = true;
    }, SWAP_OUT);
  }

  pickerSearch.addEventListener("input", () => renderCountries(pickerSearch.value));
  document.getElementById("da-countries-close").addEventListener("click", closeCountries);

  picker.addEventListener("click", (event) => {
    const row = event.target.closest(".da-country");
    if (!row) return;
    state.country = row.dataset.code;
    refresh();
    closeCountries();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!drawer.hidden) closeDrawer();
    else if (!picker.hidden) closeCountries();
  });

  /* ===== Home → loading → flow or product ================================ */

  document.querySelectorAll(".da-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      if (busy) return;

      const flow = (window.DA_FLOWS || {})[card.dataset.flow];
      const product = card.dataset.product;

      swap(browse, status, () => {
        if (!flow && !product) return; // nothing built for this card yet
        window.setTimeout(() => {
          state.openAccordions = {};
          if (flow) {
            state.flow = flow;
            state.picks = [];
            state.step = 0;
            state.cameFromFlow = false;
            show("flow", { immediate: true });
          } else {
            state.cameFromFlow = false;
            if (!startProduct(product, { immediate: true })) return;
          }
          swap(screen, sheet);
        }, DEVICE_PROFILE_HOLD);
      });
    });
  });

  document.getElementById("da-home").addEventListener("click", () => {
    if (busy || !browse.hidden) return;
    swap(status, browse, () => {
      moveThumb(tabs[current].tab, false);
      playCards(tabs[current].rail, 0);
    });
  });

  /* ===== Intro =========================================================== */

  moveThumb(tabs[current].tab, false);
  playCards(tabs[current].rail, INTRO_CARD_DELAY);

  // Last card lands at 950 + 2×110 + 700 = 1870ms.
  window.setTimeout(() => frame.classList.remove("da-intro"), 1950);

  window.addEventListener("resize", () => {
    if (!sheet.hidden) return;
    moveThumb(tabs[current].tab, false);
  });
})();
