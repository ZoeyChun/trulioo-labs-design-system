/**
 * Panel width resize + full-canvas expand.
 *
 * - Drag [data-d3-chat-resize] on the pane’s right edge to widen/narrow
 * - Toggle [data-d3-chat-expand] in the header for full-canvas mode
 * - Esc exits full-canvas first (before d3-nav closes the panel)
 * - Docked width persists in sessionStorage across open/close
 */
(function (global) {
  "use strict";

  var ns = (global.D3AiPanel = global.D3AiPanel || {});
  var icons = ns.icons;

  var STORAGE_KEY = "d3-chat-pane-w";
  var DEFAULT_W = 478;
  var MIN_W = 360;
  var MIN_MAIN = 280;
  var PANE_MARGIN = 16; /* 8px each side */

  var bound = false;
  var dragging = false;
  var resizeRaf = 0;

  function fireResize() {
    if (resizeRaf) return;
    resizeRaf = window.requestAnimationFrame(function () {
      resizeRaf = 0;
      window.dispatchEvent(new Event("resize"));
    });
  }

  function shell() {
    return document.querySelector(".d1-shell");
  }

  function pane() {
    return document.querySelector("[data-d3-chat-pane]");
  }

  function expandBtn() {
    return document.querySelector("[data-d3-chat-expand]");
  }

  function canvas() {
    return document.querySelector(".d3-canvas");
  }

  function isFull() {
    var s = shell();
    return !!(s && s.getAttribute("data-d3-chat-size") === "full");
  }

  function readStoredWidth() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      var n = raw ? parseInt(raw, 10) : NaN;
      if (Number.isFinite(n) && n >= MIN_W) return n;
    } catch (e) {
      /* private mode / blocked */
    }
    return DEFAULT_W;
  }

  function writeStoredWidth(w) {
    try {
      sessionStorage.setItem(STORAGE_KEY, String(Math.round(w)));
    } catch (e) {
      /* ignore */
    }
  }

  function maxWidth() {
    var c = canvas();
    if (!c) return 960;
    return Math.max(MIN_W, c.clientWidth - MIN_MAIN - PANE_MARGIN);
  }

  function clampWidth(w) {
    return Math.min(maxWidth(), Math.max(MIN_W, Math.round(w)));
  }

  function applyWidth(w, persist) {
    var el = pane();
    if (!el) return;
    var next = clampWidth(w);
    el.style.setProperty("--d3-chat-pane-w", next + "px");
    if (persist !== false) writeStoredWidth(next);
    fireResize();
  }

  function syncExpandUi() {
    var btn = expandBtn();
    if (!btn || !icons) return;
    var full = isFull();
    var iconHost = btn.querySelector(".tds-icon-btn__icon");
    if (iconHost) {
      iconHost.innerHTML = full ? icons.collapse : icons.expand;
    }
    btn.setAttribute("aria-pressed", full ? "true" : "false");
    var label = full ? "Collapse" : "Expand";
    btn.setAttribute("aria-label", label);
    btn.setAttribute("data-tooltip", label);
  }

  function setFull(full) {
    var s = shell();
    if (!s) return;
    if (full) {
      s.setAttribute("data-d3-chat-size", "full");
    } else {
      s.removeAttribute("data-d3-chat-size");
    }
    syncExpandUi();
    fireResize();
  }

  function toggleFull() {
    setFull(!isFull());
  }

  function exitFull() {
    if (isFull()) setFull(false);
  }

  function onExpandClick(event) {
    var t = event.target;
    if (!t || !t.closest) return;
    if (!t.closest("[data-d3-chat-expand]")) return;
    event.preventDefault();
    toggleFull();
  }

  function onKeydown(event) {
    if (event.key !== "Escape") return;
    if (!isFull()) return;
    if (
      document.querySelector(
        ".tds-select--open, .tds-combobox--open, [role='dialog']:not([hidden])"
      )
    ) {
      return;
    }
    /* Exit full-canvas before d3-nav closes the panel. */
    event.stopImmediatePropagation();
    event.preventDefault();
    exitFull();
  }

  function onShellMutations(mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var m = mutations[i];
      if (m.attributeName === "data-d3-chat") {
        var s = shell();
        if (s && s.getAttribute("data-d3-chat") !== "open") {
          exitFull();
        }
      }
    }
  }

  function onResizeKeydown(event) {
    var t = event.target;
    if (!t || !t.closest || !t.closest("[data-d3-chat-resize]")) return;
    if (isFull()) return;
    var step = event.shiftKey ? 48 : 16;
    var el = pane();
    if (!el) return;
    var cur = el.getBoundingClientRect().width;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      applyWidth(cur - step, true);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      applyWidth(cur + step, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      applyWidth(MIN_W, true);
    } else if (event.key === "End") {
      event.preventDefault();
      applyWidth(maxWidth(), true);
    }
  }

  function onPointerDown(event) {
    var t = event.target;
    if (!t || !t.closest) return;
    var handle = t.closest("[data-d3-chat-resize]");
    if (!handle) return;
    if (isFull()) return;
    if (event.button != null && event.button !== 0) return;

    var el = pane();
    if (!el) return;

    dragging = true;
    event.preventDefault();
    handle.classList.add("is-active");
    document.documentElement.classList.add("d3-chat-pane-resizing");

    var startX = event.clientX;
    var startW = el.getBoundingClientRect().width;

    function onMove(ev) {
      if (!dragging) return;
      var dx = ev.clientX - startX;
      applyWidth(startW + dx, false);
    }

    function onUp() {
      dragging = false;
      handle.classList.remove("is-active");
      document.documentElement.classList.remove("d3-chat-pane-resizing");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onUp);
      var cur = pane();
      if (cur) {
        var w = cur.getBoundingClientRect().width;
        applyWidth(w, true);
      } else {
        fireResize();
      }
    }

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    document.addEventListener("pointercancel", onUp);
  }

  function onWindowResize() {
    if (isFull() || dragging) return;
    var el = pane();
    if (!el) return;
    var raw = el.style.getPropertyValue("--d3-chat-pane-w");
    var n = parseInt(raw, 10);
    if (!Number.isFinite(n)) n = readStoredWidth();
    var clamped = clampWidth(n);
    if (clamped !== n) {
      el.style.setProperty("--d3-chat-pane-w", clamped + "px");
      writeStoredWidth(clamped);
    }
  }

  /**
   * Wire resize + expand after the pane is in the DOM.
   * Safe to call more than once (idempotent).
   */
  function bindSizeControls() {
    var el = pane();
    if (!el) return false;

    applyWidth(readStoredWidth(), false);
    syncExpandUi();

    if (bound) return true;
    bound = true;

    document.addEventListener("click", onExpandClick);
    document.addEventListener("keydown", onKeydown, true);
    document.addEventListener("keydown", onResizeKeydown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onWindowResize);
    document.addEventListener("d3-chat:close", exitFull);

    var s = shell();
    if (s && typeof MutationObserver !== "undefined") {
      var mo = new MutationObserver(onShellMutations);
      mo.observe(s, { attributes: true, attributeFilter: ["data-d3-chat"] });
    }

    return true;
  }

  ns.bindSizeControls = bindSizeControls;
  ns.setChatFull = setFull;
  ns.isChatFull = isFull;
})(typeof window !== "undefined" ? window : this);
