/* TruAIBubble — vanilla port of Misc/Loader TruAIBubble for Demo 4.
   API: window.TruAIBubble.mount(el, { state, actingLabel, onCompletedEnd })
        → { set(props), getState(), destroy() } */
(function (global) {
  "use strict";

  var ORB_SIZE = 64;
  var ORB_BASE = "#9EDFB6";
  var ORB_BLUR_PX = 12;
  var IDLE_BASE_PERIOD_S = 16;
  var SMOOTH_TAU_S = 0.55;
  var COMPLETED_STOP_MS = 600;
  var COMPLETED_POP_MS = 700;
  var COMPLETED_RESUME_MS = 900;
  var DEFAULT_HOLD_MS = 1500;
  var RESIZE_S = 0.4;
  var SUB_OUT_S = 0.22;
  var SUB_SWAP_IN_S = 0.4;
  var SUB_SWAP_OUT_S = 0.34;
  var GROW_CONTENT_AT = 0.55;

  var EASE_IN_OUT = [0.65, 0, 0.35, 1];
  var EASE_OUT_SOFT = [0.22, 1, 0.36, 1];
  var EASE_POP = [0.34, 1.56, 0.64, 1];

  var BLOBS = [
    { color: "#FFD166", size: 0.95, homeX: -0.18, homeY: -0.28, travel: 0.12, ax: 1, ay: 0.9, scaleAmp: 0.035, period: 1, opacity: 0.8 },
    { color: "#9EDFB6", size: 1.15, homeX: 0, homeY: -0.06, travel: 0.11, ax: 0.95, ay: 1, scaleAmp: 0.03, period: 1.37, opacity: 0.75 },
    { color: "#5AC6CA", size: 1.05, homeX: 0.22, homeY: -0.12, travel: 0.13, ax: 0.95, ay: 1.05, scaleAmp: 0.035, period: 1.83, opacity: 0.85 },
    { color: "#166534", size: 0.75, homeX: 0.32, homeY: 0.08, travel: 0.1, ax: 1.05, ay: 0.9, scaleAmp: 0.03, period: 2.17, opacity: 0.45 },
    { color: "#33A68C", size: 1, homeX: 0.06, homeY: 0.2, travel: 0.12, ax: 0.9, ay: 1.05, scaleAmp: 0.035, period: 2.41, opacity: 0.8 },
    { color: "#128AB2", size: 0.95, homeX: 0.26, homeY: 0.28, travel: 0.12, ax: 0.9, ay: 1.1, scaleAmp: 0.03, period: 2.73, opacity: 0.78 },
    { color: "#05D6A1", size: 0.9, homeX: -0.2, homeY: 0.3, travel: 0.11, ax: 1.05, ay: 0.85, scaleAmp: 0.03, period: 2.97, opacity: 0.75 }
  ];

  function prefersReduced() {
    return !!(global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function sampleBezier(t, a, b) {
    var u = 1 - t;
    return 3 * u * u * t * a + 3 * u * t * t * b + t * t * t;
  }

  function sampleBezierDeriv(t, a, b) {
    var u = 1 - t;
    return 3 * u * u * a + 6 * u * t * (b - a) + 3 * t * t * (1 - b);
  }

  function cubicBezier(t, x1, y1, x2, y2) {
    var clamped = Math.min(1, Math.max(0, t));
    var u = clamped;
    for (var i = 0; i < 6; i += 1) {
      var x = sampleBezier(u, x1, x2) - clamped;
      var dx = sampleBezierDeriv(u, x1, x2);
      if (Math.abs(dx) < 1e-6) break;
      u -= x / dx;
    }
    return sampleBezier(u, y1, y2);
  }

  function easeInOut(t) {
    return cubicBezier(t, EASE_IN_OUT[0], EASE_IN_OUT[1], EASE_IN_OUT[2], EASE_IN_OUT[3]);
  }

  function easeOutSoft(t) {
    return cubicBezier(t, EASE_OUT_SOFT[0], EASE_OUT_SOFT[1], EASE_OUT_SOFT[2], EASE_OUT_SOFT[3]);
  }

  function easePop(t) {
    return cubicBezier(t, EASE_POP[0], EASE_POP[1], EASE_POP[2], EASE_POP[3]);
  }

  function targetsForState(state) {
    if (state === "thinking") return { speed: 3, amplitude: 1.6 };
    if (state === "acting") return { speed: 3.4, amplitude: 1.6 };
    if (state === "completed") return { speed: 0, amplitude: 1 };
    return { speed: 1, amplitude: 1 };
  }

  function subForState(state, actingLabel, actingIconHtml) {
    if (state === "thinking") {
      return {
        key: "thinking",
        label: "Thinking...",
        blink: true,
        showDot: false,
        iconHtml: ""
      };
    }
    if (state === "acting") {
      var label = (actingLabel || "").trim();
      return {
        key: "acting:" + label,
        label: label,
        blink: false,
        showDot: false,
        iconHtml: actingIconHtml || ""
      };
    }
    if (state === "completed") {
      return {
        key: "completed",
        label: "Completed",
        blink: false,
        showDot: false,
        iconHtml: ""
      };
    }
    if (state === "needs-attention") {
      return {
        key: "needs-attention",
        label: "Review findings",
        blink: false,
        showDot: true,
        iconHtml: ""
      };
    }
    return null;
  }

  function mount(host, initial) {
    if (!host) return null;
    var props = {
      state: (initial && initial.state) || "idle",
      actingLabel: (initial && initial.actingLabel) || "",
      actingIconHtml: (initial && initial.actingIconHtml) || "",
      completedHoldMs: (initial && initial.completedHoldMs) || DEFAULT_HOLD_MS,
      onCompletedEnd: initial && initial.onCompletedEnd
    };
    var reduced = prefersReduced();
    var settledIdle = false;
    var holdTimer = null;
    var shown = null;
    var isSwap = false;
    var holdSlot = false;
    /** True while waiting to reveal subtext after a grow resize. */
    var growPending = false;
    var timers = [];
    var gen = 0;
    var raf = 0;
    var lastTs = 0;
    var destroyed = false;

    host.innerHTML =
      '<div class="truai-bubble" data-state="idle">' +
      '<div class="truai-bubble__measure" aria-hidden="true"></div>' +
      '<div class="truai-bubble__orb-wrap">' +
      '<div class="truai-bubble__orb" aria-hidden="true">' +
      '<div class="truai-bubble__blur"></div>' +
      '<div class="truai-bubble__ring"></div>' +
      "</div></div>" +
      '<div class="truai-bubble__pill">' +
      '<p class="truai-bubble__title">TruAI</p>' +
      '<div class="truai-bubble__subslot" aria-live="polite" aria-atomic="true"></div>' +
      "</div></div>";

    var root = host.querySelector(".truai-bubble");
    var measureEl = host.querySelector(".truai-bubble__measure");
    var orbEl = host.querySelector(".truai-bubble__orb");
    var blurEl = host.querySelector(".truai-bubble__blur");
    var pillEl = host.querySelector(".truai-bubble__pill");
    var subSlot = host.querySelector(".truai-bubble__subslot");
    var blobEls = [];

    BLOBS.forEach(function (blob) {
      var span = document.createElement("span");
      span.className = "truai-bubble__blob";
      var d = ORB_SIZE * blob.size;
      span.style.width = d + "px";
      span.style.height = d + "px";
      span.style.opacity = String(blob.opacity);
      span.style.background =
        "radial-gradient(circle at 50% 50%, " +
        blob.color +
        " 0%, " +
        blob.color +
        " 35%, transparent 70%)";
      span.style.transform =
        "translate(" + blob.homeX * ORB_SIZE + "px, " + blob.homeY * ORB_SIZE + "px)";
      blurEl.appendChild(span);
      blobEls.push(span);
    });

    var offsets = BLOBS.map(function () {
      return {
        phase: Math.random() * Math.PI * 2,
        scalePhase: Math.random() * Math.PI * 2
      };
    });

    var t0 = targetsForState(props.state);
    var frame = {
      phase: 0,
      speed: props.state === "completed" ? 0 : t0.speed,
      amplitude: t0.amplitude,
      targetSpeed: t0.speed,
      targetAmplitude: t0.amplitude,
      speedTween: null,
      pop: null,
      orbScale: 1,
      atRest: props.state === "completed"
    };

    var BASE_OMEGA = (Math.PI * 2) / IDLE_BASE_PERIOD_S;

    function retargetOrb(state) {
      var t = targetsForState(state);
      var now = performance.now();
      frame.targetAmplitude = t.amplitude;
      frame.atRest = false;
      if (state === "completed") {
        frame.speedTween = {
          from: frame.speed,
          to: 0,
          start: now,
          duration: COMPLETED_STOP_MS
        };
        frame.targetSpeed = 0;
        frame.pop = { start: now };
        return;
      }
      if (Math.abs(frame.speed - t.speed) > 0.02) {
        frame.speedTween = {
          from: frame.speed,
          to: t.speed,
          start: now,
          duration:
            state === "idle" || state === "needs-attention" ? COMPLETED_RESUME_MS : 650
        };
      }
      frame.targetSpeed = t.speed;
      frame.pop = null;
    }

    function smoothToward(current, target, dt, tau) {
      var a = 1 - Math.exp(-dt / Math.max(0.001, tau));
      return current + (target - current) * a;
    }

    function stepOrb(dt, now) {
      if (reduced) {
        frame.speed = 0;
        frame.amplitude = 1;
        frame.orbScale = 1;
        frame.atRest = true;
        BLOBS.forEach(function (blob, i) {
          blobEls[i].style.transform =
            "translate(" +
            (blob.homeX * ORB_SIZE).toFixed(2) +
            "px, " +
            (blob.homeY * ORB_SIZE).toFixed(2) +
            "px) scale(1)";
        });
        orbEl.style.transform = "scale(1)";
        return;
      }

      if (frame.speedTween) {
        var u = Math.min(1, (now - frame.speedTween.start) / frame.speedTween.duration);
        var e = easeInOut(u);
        frame.speed =
          frame.speedTween.from + (frame.speedTween.to - frame.speedTween.from) * e;
        if (u >= 1) {
          frame.speed = frame.speedTween.to;
          frame.speedTween = null;
          if (frame.speed === 0 && !frame.pop) frame.atRest = true;
        }
      } else {
        frame.speed = smoothToward(frame.speed, frame.targetSpeed, dt, SMOOTH_TAU_S);
      }

      frame.amplitude = smoothToward(
        frame.amplitude,
        frame.targetAmplitude,
        dt,
        SMOOTH_TAU_S
      );

      if (frame.pop) {
        var pu = Math.min(1, (now - frame.pop.start) / COMPLETED_POP_MS);
        if (pu < 0.5) frame.orbScale = 1 + 0.06 * easePop(pu / 0.5);
        else frame.orbScale = 1.06 + (1 - 1.06) * easeOutSoft((pu - 0.5) / 0.5);
        if (pu >= 1) {
          frame.orbScale = 1;
          frame.pop = null;
          if (frame.speed < 0.001) frame.atRest = true;
        }
      } else {
        frame.orbScale = 1;
      }

      if (frame.speed > 0.0005) {
        frame.phase += dt * frame.speed * BASE_OMEGA;
        frame.atRest = false;
      }

      BLOBS.forEach(function (blob, i) {
        var off = offsets[i];
        var t1 = frame.phase * blob.period + off.phase;
        var t2 = frame.phase * blob.period * 0.67 + off.scalePhase;
        var max = blob.travel * ORB_SIZE * frame.amplitude;
        var dx = Math.sin(t1) * max * blob.ax;
        var dy = Math.cos(t1 * 0.74 + t2 * 0.2) * max * blob.ay;
        var sc = 1 + Math.sin(t2) * blob.scaleAmp * frame.amplitude;
        sc = Math.min(1.08, Math.max(0.95, sc));
        var x = blob.homeX * ORB_SIZE + dx;
        var y = blob.homeY * ORB_SIZE + dy;
        blobEls[i].style.transform =
          "translate(" + x.toFixed(2) + "px, " + y.toFixed(2) + "px) scale(" + sc.toFixed(4) + ")";
      });
      orbEl.style.transform = "scale(" + frame.orbScale + ")";
    }

    function tick(now) {
      if (destroyed) return;
      var hidden = document.visibilityState === "hidden";
      if (!hidden) {
        var shouldStep =
          reduced ||
          !frame.atRest ||
          !!frame.pop ||
          !!frame.speedTween ||
          frame.speed > 0.0005 ||
          Math.abs(frame.speed - frame.targetSpeed) > 0.001 ||
          Math.abs(frame.amplitude - frame.targetAmplitude) > 0.001;
        if (shouldStep) {
          var dt = lastTs ? (now - lastTs) / 1000 : 1 / 60;
          if (dt > 0.05) dt = 0.05;
          if (dt < 0) dt = 0;
          lastTs = now;
          stepOrb(dt, now);
        } else {
          lastTs = 0;
        }
      } else {
        lastTs = 0;
      }
      raf = requestAnimationFrame(tick);
    }

    function clearTimers() {
      timers.forEach(clearTimeout);
      timers = [];
    }

    function after(ms, fn) {
      var id = setTimeout(function () {
        if (!destroyed) fn();
      }, ms);
      timers.push(id);
    }

    function measureKey(sub) {
      return sub ? sub.key : "idle";
    }

    function ensureMeasureSlots(sub) {
      var keys = ["idle", "thinking", "completed", "needs-attention"];
      if (sub && sub.key.indexOf("acting:") === 0) keys.push(sub.key);
      keys.forEach(function (key) {
        var existing = measureEl.querySelector('[data-measure="' + key + '"]');
        if (existing) {
          /* Refresh acting measure when icon/label change */
          if (sub && key === sub.key && key.indexOf("acting:") === 0) {
            existing.parentNode.removeChild(existing);
          } else {
            return;
          }
        }
        var slot = document.createElement("div");
        slot.className = "truai-bubble__measure-slot";
        slot.setAttribute("data-measure", key);
        var title = document.createElement("p");
        title.className = "truai-bubble__title";
        title.textContent = "TruAI";
        slot.appendChild(title);
        if (key !== "idle") {
          var row = document.createElement("div");
          row.style.display = "flex";
          row.style.alignItems = "center";
          row.style.gap = "4px";
          if (key === "needs-attention") {
            var wrap = document.createElement("span");
            wrap.className = "truai-bubble__icon";
            var dot = document.createElement("span");
            dot.className = "truai-bubble__dot";
            dot.style.animation = "none";
            wrap.appendChild(dot);
            row.appendChild(wrap);
          } else if (sub && key === sub.key && sub.iconHtml) {
            var iconWrap = document.createElement("span");
            iconWrap.className = "truai-bubble__icon";
            iconWrap.innerHTML = sub.iconHtml;
            row.appendChild(iconWrap);
          }
          var label = document.createElement("p");
          label.className = "truai-bubble__label";
          if (key === "thinking") label.textContent = "Thinking...";
          else if (key === "completed") label.textContent = "Completed";
          else if (key === "needs-attention") label.textContent = "Review findings";
          else if (key.indexOf("acting:") === 0) {
            label.textContent = sub && sub.key === key ? sub.label : key.slice(7);
          }
          row.appendChild(label);
          slot.appendChild(row);
        }
        measureEl.appendChild(slot);
      });
    }

    function measure(sub) {
      ensureMeasureSlots(sub);
      var key = measureKey(sub);
      var slot =
        measureEl.querySelector('[data-measure="' + key + '"]') ||
        measureEl.querySelector('[data-measure="idle"]');
      if (!slot) return { w: 0, h: 0 };
      return { w: slot.offsetWidth, h: slot.offsetHeight };
    }

    function setPillSize(size) {
      if (!size.w) return;
      pillEl.style.width = size.w + "px";
      pillEl.style.height = size.h + "px";
    }

    function setSlotOpen(open) {
      subSlot.classList.toggle("is-open", open);
    }

    function buildSubEl(sub, swap) {
      var el = document.createElement("div");
      el.className = "truai-bubble__sub" + (swap ? " is-swap-in" : "");
      el.setAttribute("data-sub-key", sub.key);
      if (sub.showDot) {
        var wrap = document.createElement("span");
        wrap.className = "truai-bubble__icon";
        var dot = document.createElement("span");
        dot.className = "truai-bubble__dot";
        if (reduced) dot.style.animation = "none";
        wrap.appendChild(dot);
        el.appendChild(wrap);
      } else if (sub.iconHtml) {
        var iconWrap = document.createElement("span");
        iconWrap.className = "truai-bubble__icon";
        iconWrap.innerHTML = sub.iconHtml;
        el.appendChild(iconWrap);
      }
      if (sub.label) {
        var p = document.createElement("p");
        p.className = "truai-bubble__label" + (sub.blink && !reduced ? " is-blink" : "");
        p.textContent = sub.label;
        el.appendChild(p);
      }
      return el;
    }

    function collapseToIdle(animate) {
      growPending = false;
      isSwap = false;
      holdSlot = false;
      shown = null;
      var old = subSlot.querySelector(".truai-bubble__sub");
      if (animate && old && !reduced) {
        holdSlot = true;
        setSlotOpen(true);
        old.classList.remove("is-in", "is-swap-in");
        old.classList.add("is-out");
        after(SUB_OUT_S * 1000, function () {
          holdSlot = false;
          subSlot.innerHTML = "";
          setSlotOpen(false);
          setPillSize(measure(null));
        });
        return;
      }
      subSlot.innerHTML = "";
      setSlotOpen(false);
      setPillSize(measure(null));
    }

    function runTransition(next) {
      clearTimers();
      var myGen = ++gen;
      var still = function () {
        return myGen === gen && !destroyed;
      };

      var prev = shown;
      var same =
        (!prev && !next) ||
        (!!prev &&
          !!next &&
          prev.key === next.key &&
          prev.label === next.label &&
          (prev.iconHtml || "") === (next.iconHtml || ""));

      if (same) {
        if (!next) {
          /* Interrupted grow left the slot open with no shown content. */
          if (growPending || holdSlot || subSlot.classList.contains("is-open") || subSlot.children.length) {
            collapseToIdle(false);
          } else {
            setPillSize(measure(null));
          }
        } else {
          setPillSize(measure(next));
        }
        return;
      }

      if (reduced) {
        isSwap = false;
        holdSlot = false;
        growPending = false;
        shown = next;
        subSlot.innerHTML = "";
        if (next) {
          var el = buildSubEl(next, false);
          subSlot.appendChild(el);
          requestAnimationFrame(function () {
            el.classList.add("is-in");
          });
        }
        setSlotOpen(!!next);
        setPillSize(measure(next));
        return;
      }

      var slotOpen = holdSlot || growPending || subSlot.classList.contains("is-open");
      var nextHas = !!next;
      var prevHas = !!prev || (!nextHas && slotOpen);
      var growing = !prev && nextHas && !slotOpen;
      var shrinking = !nextHas && (prevHas || slotOpen);
      var swapping = !!prev && nextHas;

      if (growing) {
        isSwap = false;
        holdSlot = false;
        growPending = true;
        setPillSize(measure(next));
        setSlotOpen(true);
        after(RESIZE_S * GROW_CONTENT_AT * 1000, function () {
          if (!still()) return;
          growPending = false;
          shown = next;
          subSlot.innerHTML = "";
          var elIn = buildSubEl(next, false);
          subSlot.appendChild(elIn);
          requestAnimationFrame(function () {
            elIn.classList.add("is-in");
          });
        });
        return;
      }

      if (shrinking) {
        collapseToIdle(!!prev || !!subSlot.querySelector(".truai-bubble__sub"));
        return;
      }

      if (swapping) {
        growPending = false;
        holdSlot = false;
        isSwap = true;
        setSlotOpen(true);
        after(20, function () {
          if (!still()) return;
          setPillSize(measure(next));
          var exiting = subSlot.querySelector(".truai-bubble__sub");
          if (exiting) {
            exiting.classList.remove("is-in", "is-swap-in");
            exiting.classList.add("is-out", "is-swap-out");
          }
          shown = next;
          var incoming = buildSubEl(next, true);
          subSlot.appendChild(incoming);
          requestAnimationFrame(function () {
            incoming.classList.add("is-in");
          });
          after(Math.max(SUB_SWAP_IN_S, SUB_SWAP_OUT_S) * 1000 + 40, function () {
            if (!still()) return;
            if (exiting && exiting.parentNode) exiting.parentNode.removeChild(exiting);
            isSwap = false;
          });
        });
        return;
      }

      /* Grow was pending (slot open, no shown yet) → reveal new content */
      if (nextHas && slotOpen && !prev) {
        growPending = false;
        shown = next;
        setPillSize(measure(next));
        setSlotOpen(true);
        subSlot.innerHTML = "";
        var elSwap = buildSubEl(next, true);
        subSlot.appendChild(elSwap);
        requestAnimationFrame(function () {
          elSwap.classList.add("is-in");
        });
        return;
      }

      growPending = false;
      shown = next;
      setSlotOpen(!!next);
      setPillSize(measure(next));
    }

    function visualState() {
      if (props.state === "completed" && settledIdle) return "idle";
      return props.state;
    }

    function applyProps(next) {
      var prevState = props.state;
      if (next.state != null) props.state = next.state;
      if (next.actingLabel != null) props.actingLabel = next.actingLabel;
      if (next.actingIconHtml != null) props.actingIconHtml = next.actingIconHtml;
      if (next.completedHoldMs != null) props.completedHoldMs = next.completedHoldMs;
      if (next.onCompletedEnd != null) props.onCompletedEnd = next.onCompletedEnd;

      if (props.state !== prevState) {
        if (holdTimer) {
          clearTimeout(holdTimer);
          holdTimer = null;
        }
        settledIdle = false;
        if (props.state === "completed") {
          holdTimer = setTimeout(function () {
            holdTimer = null;
            settledIdle = true;
            if (props.onCompletedEnd) props.onCompletedEnd();
            /* Only sync if parent left us on completed (no idle handoff). */
            if (props.state === "completed") syncVisual();
          }, props.completedHoldMs);
        }
        retargetOrb(visualState());
      }

      syncVisual();
    }

    function syncVisual() {
      var vs = visualState();
      root.setAttribute("data-state", vs);
      var target = subForState(vs, props.actingLabel, props.actingIconHtml);
      runTransition(target);
    }

    // Initial layout
    ensureMeasureSlots(null);
    var idleSize = measure(null);
    setPillSize(idleSize);
    pillEl.style.width = idleSize.w ? idleSize.w + "px" : "max-content";
    pillEl.style.height = idleSize.h ? idleSize.h + "px" : "auto";
    syncVisual();
    raf = requestAnimationFrame(tick);

    return {
      set: function (next) {
        if (destroyed) return;
        applyProps(next || {});
      },
      getState: function () {
        return props.state;
      },
      destroy: function () {
        destroyed = true;
        clearTimers();
        if (holdTimer) clearTimeout(holdTimer);
        cancelAnimationFrame(raf);
        host.innerHTML = "";
      }
    };
  }

  /**
   * Panel header (Figma 1448:75531) — 80px glowing orb + TruAI + status row.
   * No pill chrome; status is plain icon + description text.
   */
  function mountPanel(host, initial) {
    if (!host) return null;
    var PANEL_ORB = 80;
    var props = {
      state: (initial && initial.state) || "idle",
      actingLabel: (initial && initial.actingLabel) || "",
      actingIconHtml: (initial && initial.actingIconHtml) || "",
      completedHoldMs: (initial && initial.completedHoldMs) || DEFAULT_HOLD_MS,
      onCompletedEnd: initial && initial.onCompletedEnd
    };
    var reduced = prefersReduced();
    var settledIdle = false;
    var holdTimer = null;
    var raf = 0;
    var lastTs = 0;
    var destroyed = false;

    host.innerHTML =
      '<div class="truai-panel" data-state="idle">' +
      '<div class="truai-panel__orb-wrap">' +
      '<div class="truai-panel__orb" aria-hidden="true">' +
      '<div class="truai-panel__blur"></div>' +
      '<div class="truai-panel__ring"></div>' +
      "</div></div>" +
      '<div class="truai-panel__text">' +
      '<p class="truai-panel__title">TruAI</p>' +
      '<div class="truai-panel__status" aria-live="polite" aria-atomic="true" hidden></div>' +
      "</div></div>";

    var root = host.querySelector(".truai-panel");
    var orbEl = host.querySelector(".truai-panel__orb");
    var blurEl = host.querySelector(".truai-panel__blur");
    var statusEl = host.querySelector(".truai-panel__status");
    var blobEls = [];

    BLOBS.forEach(function (blob) {
      var span = document.createElement("span");
      span.className = "truai-panel__blob";
      var d = PANEL_ORB * blob.size;
      span.style.width = d + "px";
      span.style.height = d + "px";
      span.style.opacity = String(blob.opacity);
      span.style.background =
        "radial-gradient(circle at 50% 50%, " +
        blob.color +
        " 0%, " +
        blob.color +
        " 35%, transparent 70%)";
      span.style.transform =
        "translate(" +
        blob.homeX * PANEL_ORB +
        "px, " +
        blob.homeY * PANEL_ORB +
        "px)";
      blurEl.appendChild(span);
      blobEls.push(span);
    });

    var offsets = BLOBS.map(function () {
      return {
        phase: Math.random() * Math.PI * 2,
        scalePhase: Math.random() * Math.PI * 2
      };
    });

    var t0 = targetsForState(props.state);
    var frame = {
      phase: 0,
      speed: props.state === "completed" ? 0 : t0.speed,
      amplitude: t0.amplitude,
      targetSpeed: t0.speed,
      targetAmplitude: t0.amplitude,
      speedTween: null,
      pop: null,
      orbScale: 1,
      atRest: props.state === "completed"
    };
    var BASE_OMEGA = (Math.PI * 2) / IDLE_BASE_PERIOD_S;

    function retargetOrb(state) {
      var t = targetsForState(state);
      var now = performance.now();
      frame.targetAmplitude = t.amplitude;
      frame.atRest = false;
      if (state === "completed") {
        frame.speedTween = {
          from: frame.speed,
          to: 0,
          start: now,
          duration: COMPLETED_STOP_MS
        };
        frame.targetSpeed = 0;
        frame.pop = { start: now };
        return;
      }
      if (Math.abs(frame.speed - t.speed) > 0.02) {
        frame.speedTween = {
          from: frame.speed,
          to: t.speed,
          start: now,
          duration:
            state === "idle" || state === "needs-attention" ? COMPLETED_RESUME_MS : 650
        };
      }
      frame.targetSpeed = t.speed;
      frame.pop = null;
    }

    function smoothToward(current, target, dt, tau) {
      var a = 1 - Math.exp(-dt / Math.max(0.001, tau));
      return current + (target - current) * a;
    }

    function stepOrb(dt, now) {
      if (reduced) {
        frame.orbScale = 1;
        BLOBS.forEach(function (blob, i) {
          blobEls[i].style.transform =
            "translate(" +
            (blob.homeX * PANEL_ORB).toFixed(2) +
            "px, " +
            (blob.homeY * PANEL_ORB).toFixed(2) +
            "px) scale(1)";
        });
        orbEl.style.transform = "scale(1)";
        return;
      }
      if (frame.speedTween) {
        var u = Math.min(1, (now - frame.speedTween.start) / frame.speedTween.duration);
        var e = easeInOut(u);
        frame.speed =
          frame.speedTween.from + (frame.speedTween.to - frame.speedTween.from) * e;
        if (u >= 1) {
          frame.speed = frame.speedTween.to;
          frame.speedTween = null;
          if (frame.speed === 0 && !frame.pop) frame.atRest = true;
        }
      } else {
        frame.speed = smoothToward(frame.speed, frame.targetSpeed, dt, SMOOTH_TAU_S);
      }
      frame.amplitude = smoothToward(
        frame.amplitude,
        frame.targetAmplitude,
        dt,
        SMOOTH_TAU_S
      );
      if (frame.pop) {
        var pu = Math.min(1, (now - frame.pop.start) / COMPLETED_POP_MS);
        if (pu < 0.5) frame.orbScale = 1 + 0.06 * easePop(pu / 0.5);
        else frame.orbScale = 1.06 + (1 - 1.06) * easeOutSoft((pu - 0.5) / 0.5);
        if (pu >= 1) {
          frame.orbScale = 1;
          frame.pop = null;
          if (frame.speed < 0.001) frame.atRest = true;
        }
      } else {
        frame.orbScale = 1;
      }
      if (frame.speed > 0.0005) {
        frame.phase += dt * frame.speed * BASE_OMEGA;
        frame.atRest = false;
      }
      BLOBS.forEach(function (blob, i) {
        var off = offsets[i];
        var t1 = frame.phase * blob.period + off.phase;
        var t2 = frame.phase * blob.period * 0.67 + off.scalePhase;
        var max = blob.travel * PANEL_ORB * frame.amplitude;
        var dx = Math.sin(t1) * max * blob.ax;
        var dy = Math.cos(t1 * 0.74 + t2 * 0.2) * max * blob.ay;
        var sc = Math.min(
          1.08,
          Math.max(0.95, 1 + Math.sin(t2) * blob.scaleAmp * frame.amplitude)
        );
        var x = blob.homeX * PANEL_ORB + dx;
        var y = blob.homeY * PANEL_ORB + dy;
        blobEls[i].style.transform =
          "translate(" + x.toFixed(2) + "px, " + y.toFixed(2) + "px) scale(" + sc.toFixed(4) + ")";
      });
      orbEl.style.transform = "scale(" + frame.orbScale + ")";
    }

    function tick(now) {
      if (destroyed) return;
      if (document.visibilityState !== "hidden") {
        var shouldStep =
          reduced ||
          !frame.atRest ||
          !!frame.pop ||
          !!frame.speedTween ||
          frame.speed > 0.0005 ||
          Math.abs(frame.speed - frame.targetSpeed) > 0.001 ||
          Math.abs(frame.amplitude - frame.targetAmplitude) > 0.001;
        if (shouldStep) {
          var dt = lastTs ? (now - lastTs) / 1000 : 1 / 60;
          if (dt > 0.05) dt = 0.05;
          if (dt < 0) dt = 0;
          lastTs = now;
          stepOrb(dt, now);
        } else {
          lastTs = 0;
        }
      } else {
        lastTs = 0;
      }
      raf = requestAnimationFrame(tick);
    }

    function visualState() {
      if (props.state === "completed" && settledIdle) return "idle";
      return props.state;
    }

    function paintStatus() {
      var vs = visualState();
      root.setAttribute("data-state", vs);
      var sub = subForState(vs, props.actingLabel, props.actingIconHtml);
      if (!sub) {
        statusEl.hidden = true;
        statusEl.innerHTML = "";
        return;
      }
      statusEl.hidden = false;
      var html = "";
      if (sub.showDot) {
        html +=
          '<span class="truai-panel__icon"><span class="truai-bubble__dot"' +
          (reduced ? ' style="animation:none"' : "") +
          "></span></span>";
      } else if (sub.iconHtml) {
        html += '<span class="truai-panel__icon">' + sub.iconHtml + "</span>";
      }
      html +=
        '<p class="truai-panel__label' +
        (sub.blink && !reduced ? " is-blink" : "") +
        '">' +
        sub.label +
        "</p>";
      statusEl.innerHTML = html;
    }

    function applyProps(next) {
      var prevState = props.state;
      if (next.state != null) props.state = next.state;
      if (next.actingLabel != null) props.actingLabel = next.actingLabel;
      if (next.actingIconHtml != null) props.actingIconHtml = next.actingIconHtml;
      if (next.completedHoldMs != null) props.completedHoldMs = next.completedHoldMs;
      if (next.onCompletedEnd != null) props.onCompletedEnd = next.onCompletedEnd;

      if (props.state !== prevState) {
        if (holdTimer) {
          clearTimeout(holdTimer);
          holdTimer = null;
        }
        settledIdle = false;
        if (props.state === "completed") {
          holdTimer = setTimeout(function () {
            holdTimer = null;
            settledIdle = true;
            if (props.onCompletedEnd) props.onCompletedEnd();
            if (props.state === "completed") paintStatus();
          }, props.completedHoldMs);
        }
        retargetOrb(visualState());
      }
      paintStatus();
    }

    paintStatus();
    raf = requestAnimationFrame(tick);

    return {
      set: function (next) {
        if (destroyed) return;
        applyProps(next || {});
      },
      getState: function () {
        return props.state;
      },
      destroy: function () {
        destroyed = true;
        if (holdTimer) clearTimeout(holdTimer);
        cancelAnimationFrame(raf);
        host.innerHTML = "";
      }
    };
  }

  global.TruAIBubble = { mount: mount, mountPanel: mountPanel };
})(typeof window !== "undefined" ? window : this);
