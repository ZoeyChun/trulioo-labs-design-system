/**
 * TdsTapCue — one adaptive tap hint, attached to a target element.
 *
 * TdsTapCue.show(element)
 * TdsTapCue.hide()
 *
 * Optional: add data-tds-tap-cue to a target to auto-show on load.
 * Reads the target’s bounds and border-radius, paints behind its
 * content, and switches between an outline (visible surface) and a
 * circular halo (content-only). Only one cue is active at a time.
 */
(function (global) {
  "use strict";

  var MIN_SIZE = 72;
  var HALO_EXTRA = 32;
  var OUTSET = 4;
  var OUTLINE_GROW_PX = 8;
  var OUTLINE_SCALE_MAX = 1.08;
  var PRESS_MS = 160;
  var HOST = "tds-tap-cue-host";
  var HOST_STATIC = "tds-tap-cue-host--static";
  var HOST_PRESS = "tds-tap-cue-host--press";

  var active = null;

  function prefersReducedMotion() {
    return global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function isTransparent(color) {
    if (!color || color === "transparent") return true;
    var m = color.match(/[\d.]+/g);
    if (!m) return false;
    if ((color.indexOf("rgba") === 0 || color.indexOf("hsla") === 0) && parseFloat(m[3]) === 0) return true;
    return false;
  }

  function hasVisibleSurface(style) {
    var hasImage = style.backgroundImage && style.backgroundImage !== "none";
    var hasFill = hasImage || !isTransparent(style.backgroundColor);
    var sides = ["Top", "Right", "Bottom", "Left"];
    var hasBorder = sides.some(function (side) {
      return (parseFloat(style["border" + side + "Width"]) || 0) > 0
        && !isTransparent(style["border" + side + "Color"]);
    });
    var hasShadow = style.boxShadow && style.boxShadow !== "none";
    return hasFill || hasBorder || hasShadow;
  }

  function isBlocked(el) {
    if (!el || !el.isConnected) return true;
    if (el.disabled || el.getAttribute("aria-disabled") === "true") return true;
    if (el.getAttribute("aria-pressed") === "true") return true;
    if (el.getAttribute("aria-selected") === "true") return true;
    if (el.classList.contains("is-selected") || el.classList.contains("selected")) return true;
    return false;
  }

  function viewportRect(target) {
    var port = target.closest(".screen, [data-tap-cue-bounds]") || document.scrollingElement || document.documentElement;
    return port.getBoundingClientRect();
  }

  function clearActive(press) {
    if (!active) return;
    var entry = active;
    active = null;
    if (entry.ro) entry.ro.disconnect();
    global.removeEventListener("resize", entry.layout);
    global.removeEventListener("scroll", entry.layout, true);
    entry.target.removeEventListener("pointerdown", entry.onActivate);
    entry.target.removeEventListener("click", entry.onActivate);
    entry.target.removeEventListener("keydown", entry.onKey);
    if (entry.cue && entry.cue.parentNode) entry.cue.parentNode.removeChild(entry.cue);

    if (press && !prefersReducedMotion()) {
      entry.target.classList.add(HOST_PRESS);
      global.setTimeout(function () {
        entry.target.classList.remove(HOST_PRESS);
        entry.target.classList.remove(HOST, HOST_STATIC);
      }, PRESS_MS);
    } else {
      entry.target.classList.remove(HOST, HOST_STATIC, HOST_PRESS);
    }
  }

  function expandRadius(value, extra) {
    if (!value || value === "0px") return extra + "px";
    return String(value).replace(/(-?[\d.]+)px/g, function (_, n) {
      return (parseFloat(n) + extra) + "px";
    });
  }

  function layout() {
    if (!active) return;
    var target = active.target;
    var cue = active.cue;
    if (isBlocked(target)) {
      clearActive(false);
      return;
    }

    var style = global.getComputedStyle(target);
    var rect = target.getBoundingClientRect();
    var forced = target.getAttribute("data-tds-tap-cue");
    var surface = forced === "outline" || (forced !== "halo" && hasVisibleSurface(style));
    var pulse = cue.firstElementChild;

    cue.classList.toggle("tds-tap-cue--outline", surface);
    cue.classList.toggle("tds-tap-cue--halo", !surface);

    if (surface) {
      var basis = Math.max(rect.width, rect.height, 1);
      var scaleTo = Math.min(OUTLINE_SCALE_MAX, 1 + (OUTLINE_GROW_PX * 2) / basis);
      cue.style.setProperty("--tap-cue-scale-to", scaleTo.toFixed(4));
      cue.style.left = -OUTSET + "px";
      cue.style.top = -OUTSET + "px";
      cue.style.right = -OUTSET + "px";
      cue.style.bottom = -OUTSET + "px";
      cue.style.width = "auto";
      cue.style.height = "auto";
      cue.style.margin = "0";
      if (pulse) pulse.style.borderRadius = expandRadius(style.borderRadius, OUTSET);
      return;
    }

    cue.style.removeProperty("--tap-cue-scale-to");

    cue.style.right = "";
    cue.style.bottom = "";

    var size = Math.max(MIN_SIZE, rect.width + HALO_EXTRA, rect.height + HALO_EXTRA);
    var view = viewportRect(target);
    var centerX = rect.left + rect.width / 2;
    var centerY = rect.top + rect.height / 2;
    var half = size / 2;
    var minX = view.left + half;
    var maxX = view.right - half;
    var minY = view.top + half;
    var maxY = view.bottom - half;
    if (maxX < minX) {
      minX = maxX = view.left + view.width / 2;
    }
    if (maxY < minY) {
      minY = maxY = view.top + view.height / 2;
    }
    var cueCenterX = Math.min(Math.max(centerX, minX), maxX);
    var cueCenterY = Math.min(Math.max(centerY, minY), maxY);
    var offsetX = cueCenterX - centerX;
    var offsetY = cueCenterY - centerY;

    cue.style.left = "50%";
    cue.style.top = "50%";
    cue.style.width = size + "px";
    cue.style.height = size + "px";
    cue.style.marginLeft = (offsetX - size / 2) + "px";
    cue.style.marginTop = (offsetY - size / 2) + "px";
    if (pulse) pulse.style.borderRadius = "50%";
  }

  function show(target) {
    if (!target) return;
    if (active && active.target === target) {
      layout();
      return;
    }
    clearActive(false);
    if (isBlocked(target)) return;

    var cue = document.createElement("span");
    cue.className = "tds-tap-cue";
    cue.setAttribute("aria-hidden", "true");
    var pulse = document.createElement("span");
    pulse.className = "tds-tap-cue__pulse";
    cue.appendChild(pulse);

    target.classList.add(HOST);
    if (global.getComputedStyle(target).position === "static") {
      target.classList.add(HOST_STATIC);
    }
    target.insertBefore(cue, target.firstChild);

    function onActivate() {
      clearActive(true);
    }
    function onKey(event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      clearActive(true);
    }

    var entry = {
      target: target,
      cue: cue,
      layout: layout,
      onActivate: onActivate,
      onKey: onKey,
      ro: null
    };
    active = entry;

    target.addEventListener("pointerdown", onActivate);
    target.addEventListener("click", onActivate);
    target.addEventListener("keydown", onKey);
    global.addEventListener("resize", layout);
    global.addEventListener("scroll", layout, true);
    if (typeof ResizeObserver !== "undefined") {
      entry.ro = new ResizeObserver(layout);
      entry.ro.observe(target);
    }
    layout();
  }

  function hide() {
    clearActive(false);
  }

  function autoShow() {
    var marked = document.querySelector("[data-tds-tap-cue]");
    if (marked) show(marked);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoShow);
  } else {
    autoShow();
  }

  global.TdsTapCue = {
    show: show,
    hide: hide
  };
})(typeof window !== "undefined" ? window : this);
