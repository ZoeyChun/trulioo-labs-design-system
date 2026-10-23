/* Floating orb — same TruAI orb as Misc/Loader experiments/truai-bubble.
   Pill chrome stays; the sphere is TruAIOrb (mesh, logo warp, home intro). */
(function (global) {
  "use strict";

  var motion = global.TruAIOrbMotion;
  if (!motion) return;

  var EASE_IN_OUT = [0.65, 0, 0.35, 1];
  var EASE_OUT_SOFT = [0.22, 1, 0.36, 1];
  var THINKING_ORBIT_RATE = 1.35;
  var HOME_INTRO_MS = (motion.LOGO_ORBIT_PERIOD_S / THINKING_ORBIT_RATE) * 1000;
  /* Resolve from this script's URL so it works from the lab and the portal. */
  var SELF_SRC = (document.currentScript && document.currentScript.src) || "";
  var RING = SELF_SRC
    ? new URL("../../../../demo-4/assets/truai-bubble-orb-ring.svg", SELF_SRC).href
    : "../../demo-4/assets/truai-bubble-orb-ring.svg";

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
    var i;
    for (i = 0; i < 6; i += 1) {
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

  function prefersReduced() {
    return !!(global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function mountOrb(host, ringSrc, opts) {
    opts = opts || {};
    var ORB_SIZE = motion.ORB_SIZE;
    var LOGO_STRIPS = motion.LOGO_STRIPS;
    var LOGO_HALF_LON = motion.LOGO_HALF_LON;
    var LOGO_SPHERE_R = motion.LOGO_SPHERE_R;
    var LOGO_PERSPECTIVE = motion.LOGO_PERSPECTIVE;
    var LOGO_W = motion.LOGO_W;
    var LOGO_H = motion.LOGO_H;
    var LOGO_DESIGN_W = motion.LOGO_DESIGN_W;
    var LOGO_DESIGN_H = motion.LOGO_DESIGN_H;
    var STRIP_ANGLE = (2 * LOGO_HALF_LON) / LOGO_STRIPS;
    var WARP_STRIP_W = 2 * LOGO_SPHERE_R * Math.tan(STRIP_ANGLE / 2);
    var WARP_SLICE_W = LOGO_W / LOGO_STRIPS;
    var FLAT_STRIP_W = LOGO_DESIGN_W / LOGO_STRIPS;
    var FLAT_SLICE_W = LOGO_DESIGN_W / LOGO_STRIPS;
    var strips = [];
    var i;

    for (i = 0; i < LOGO_STRIPS; i += 1) {
      strips.push({ i: i, angle: -LOGO_HALF_LON + (i + 0.5) * STRIP_ANGLE });
    }

    var root = document.createElement("div");
    root.setAttribute("aria-hidden", "true");
    root.style.cssText =
      "position:relative;width:" + ORB_SIZE + "px;height:" + ORB_SIZE + "px;border-radius:50%;" +
      "clip-path:circle(50%);transform-origin:50% 50%;isolation:isolate;background:" + motion.ORB_BASE + ";";

    var blur = document.createElement("div");
    blur.style.cssText =
      "position:absolute;inset:0;overflow:hidden;border-radius:50%;pointer-events:none;z-index:1;" +
      "filter:blur(" + motion.ORB_BLUR_PX + "px);transform:scale(1.15);";

    var layers = [];
    motion.ALL_BLOBS.forEach(function (blob, index) {
      var span = document.createElement("span");
      var d = ORB_SIZE * blob.size;
      span.style.cssText =
        "position:absolute;left:0;top:0;display:block;border-radius:50%;pointer-events:none;" +
        "width:" + d + "px;height:" + d + "px;opacity:" + (index >= motion.BASE_BLOB_COUNT ? 0 : blob.opacity) + ";" +
        "background:radial-gradient(circle at 50% 50%, " + blob.color + " 0%, " + blob.color + " 38%, transparent 72%);" +
        "transform:translate(" + blob.homeX * ORB_SIZE + "px, " + blob.homeY * ORB_SIZE + "px);";
      blur.appendChild(span);
      layers.push(span);
    });

    var logoHost = document.createElement("div");
    logoHost.style.cssText =
      "position:absolute;inset:0;pointer-events:none;perspective:" + LOGO_PERSPECTIVE + "px;perspective-origin:50% 50%;z-index:2;";

    var pivot = document.createElement("div");
    pivot.style.cssText =
      "position:absolute;left:50%;top:50%;width:0;height:0;transform-style:preserve-3d;pointer-events:none;";

    var flat = document.createElement("div");
    flat.style.cssText =
      "position:absolute;left:0;top:0;pointer-events:none;background:#004C45;z-index:1;" +
      "width:" + LOGO_DESIGN_W + "px;height:" + LOGO_DESIGN_H + "px;" +
      "transform:translate(-50%, -50%) translateZ(0.5px);" +
      "-webkit-mask-image:url(" + ringSrc + ");mask-image:url(" + ringSrc + ");" +
      "-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;" +
      "-webkit-mask-size:" + LOGO_DESIGN_W + "px " + LOGO_DESIGN_H + "px;" +
      "mask-size:" + LOGO_DESIGN_W + "px " + LOGO_DESIGN_H + "px;" +
      "-webkit-mask-position:0 0;mask-position:0 0;";

    var stripsHost = document.createElement("div");
    stripsHost.style.cssText =
      "position:absolute;left:0;top:0;width:0;height:0;transform-style:preserve-3d;pointer-events:none;";

    var stripEls = [];
    var sliceEls = [];
    strips.forEach(function (strip) {
      var stripEl = document.createElement("div");
      stripEl.style.cssText =
        "position:absolute;left:0;top:0;overflow:hidden;transform-style:preserve-3d;" +
        "backface-visibility:hidden;-webkit-backface-visibility:hidden;pointer-events:none;" +
        "width:" + FLAT_STRIP_W + "px;height:" + LOGO_DESIGN_H + "px;" +
        "transform:translateX(" + (-LOGO_DESIGN_W / 2 + (strip.i + 0.5) * FLAT_STRIP_W).toFixed(2) + "px) translate(-50%, -50%);";
      var sliceEl = document.createElement("div");
      sliceEl.style.cssText =
        "pointer-events:none;background:#004C45;" +
        "width:" + LOGO_DESIGN_W + "px;height:" + LOGO_DESIGN_H + "px;" +
        "margin-left:" + (-strip.i * FLAT_SLICE_W) + "px;" +
        "-webkit-mask-image:url(" + ringSrc + ");mask-image:url(" + ringSrc + ");" +
        "-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;" +
        "-webkit-mask-size:" + LOGO_DESIGN_W + "px " + LOGO_DESIGN_H + "px;" +
        "mask-size:" + LOGO_DESIGN_W + "px " + LOGO_DESIGN_H + "px;" +
        "-webkit-mask-position:0 0;mask-position:0 0;";
      stripEl.appendChild(sliceEl);
      stripsHost.appendChild(stripEl);
      stripEls.push(stripEl);
      sliceEls.push(sliceEl);
    });

    pivot.appendChild(flat);
    pivot.appendChild(stripsHost);
    logoHost.appendChild(pivot);
    root.appendChild(blur);
    root.appendChild(logoHost);
    host.appendChild(root);

    var reduced = prefersReduced();
    var frame = motion.createOrbFrameState("idle", { landing: true });
    var offsets = motion.randomLayerOffsets();
    var raf = 0;
    var lastTs = 0;
    var animating = false;
    var introTimer = 0;
    var hovering = false;
    var intro = false;

    function setWillChange(on) {
      if (animating === on) return;
      animating = on;
      var value = on ? "transform" : "auto";
      layers.forEach(function (el) {
        el.style.willChange = value;
      });
      pivot.style.willChange = value;
      stripEls.forEach(function (el) {
        el.style.willChange = value;
      });
    }

    function applyLogo(pose) {
      logoHost.style.opacity = String(pose.opacity);
      logoHost.style.zIndex = String(pose.zIndex);
      logoHost.style.perspective = pose.warp < 0.02 ? "none" : LOGO_PERSPECTIVE + "px";
      pivot.style.transform = "rotateY(" + (pose.longitude + pose.yaw) + "rad) scale(" + pose.scale + ")";

      var t = pose.warp;
      var useFlat = t < 0.02;
      flat.style.opacity = useFlat ? "1" : "0";
      flat.style.visibility = useFlat ? "visible" : "hidden";
      stripsHost.style.opacity = useFlat ? "0" : "1";
      stripsHost.style.visibility = useFlat ? "hidden" : "visible";
      if (useFlat) return;

      var lift = easeOutSoft(t);
      var fan = easeInOut(t);
      var gather = easeInOut(t);
      var sizeT = easeInOut(t);
      var stripW = FLAT_STRIP_W + (WARP_STRIP_W - FLAT_STRIP_W) * sizeT;
      var markW = LOGO_DESIGN_W + (LOGO_W - LOGO_DESIGN_W) * sizeT;
      var markH = LOGO_DESIGN_H + (LOGO_H - LOGO_DESIGN_H) * sizeT;
      var sliceW = FLAT_SLICE_W + (WARP_SLICE_W - FLAT_SLICE_W) * sizeT;

      for (var n = 0; n < LOGO_STRIPS; n += 1) {
        var angle = strips[n].angle * fan;
        var z = LOGO_SPHERE_R * lift;
        var flatX = -LOGO_DESIGN_W / 2 + (n + 0.5) * FLAT_STRIP_W;
        var x = flatX * (1 - gather);
        stripEls[n].style.width = stripW + "px";
        stripEls[n].style.height = markH + "px";
        stripEls[n].style.transform =
          "translateX(" + x.toFixed(2) + "px) rotateY(" + angle + "rad) translateZ(" + z.toFixed(2) + "px) translate(-50%, -50%)";
        sliceEls[n].style.width = markW + "px";
        sliceEls[n].style.height = markH + "px";
        sliceEls[n].style.marginLeft = (-n * sliceW).toFixed(2) + "px";
        sliceEls[n].style.webkitMaskSize = markW + "px " + markH + "px";
        sliceEls[n].style.maskSize = markW + "px " + markH + "px";
      }
    }

    function apply(result) {
      result.layers.forEach(function (layer, index) {
        var el = layers[index];
        if (!el) return;
        el.style.transform = layer.transform;
        el.style.opacity = String(layer.opacity);
      });
      applyLogo(result.logo);
      root.style.transform = "scale(" + frame.orbScale + ")";
      var swirl = frame.swirl;
      blur.style.filter = "blur(" + (motion.ORB_BLUR_PX * (1 - 0.28 * swirl)).toFixed(2) + "px)";
      blur.style.transform = "scale(" + (1.15 + 0.03 * swirl).toFixed(3) + ")";
    }

    function shouldStep() {
      return (
        reduced ||
        !frame.atRest ||
        frame.pop ||
        frame.speedTween ||
        frame.speed > 0.0005 ||
        frame.logoSpin > 0.0005 ||
        frame.logoOrbit > 0.01 ||
        frame.idleYawNudge ||
        frame.actingNod ||
        frame.attentionShake ||
        Math.abs(frame.idleYaw) > 0.0001 ||
        Math.abs(frame.logoScale - 1) > 0.0005 ||
        Math.abs(frame.orbScale - 1) > 0.0005 ||
        Math.abs(frame.speed - frame.targetSpeed) > 0.001 ||
        Math.abs(frame.amplitude - frame.targetAmplitude) > 0.001 ||
        Math.abs(frame.logoOrbit - frame.targetLogoOrbit) > 0.001 ||
        Math.abs(frame.logoSpin - frame.targetLogoSpin) > 0.001 ||
        Math.abs(frame.swirl - frame.targetSwirl) > 0.001 ||
        frame.swirl > 0.02 ||
        frame.motionState === "acting"
      );
    }

    function tick(now) {
      if (document.visibilityState === "hidden") {
        setWillChange(false);
        lastTs = 0;
        raf = global.requestAnimationFrame(tick);
        return;
      }
      if (!shouldStep()) {
        setWillChange(false);
        lastTs = 0;
        raf = global.requestAnimationFrame(tick);
        return;
      }
      var dt = lastTs ? (now - lastTs) / 1000 : 1 / 60;
      if (dt > 0.05) dt = 0.05;
      if (dt < 0) dt = 0;
      lastTs = now;
      apply(motion.stepOrb(frame, offsets, dt, now, reduced));
      setWillChange(
        !reduced &&
          (frame.speed > 0.001 ||
            frame.logoSpin > 0.001 ||
            frame.logoOrbit > 0.02 ||
            frame.idleYawNudge ||
            frame.actingNod ||
            frame.attentionShake ||
            frame.pop ||
            frame.speedTween)
      );
      raf = global.requestAnimationFrame(tick);
    }

    var driven = false;

    function settleLanding() {
      motion.retargetOrb(frame, "idle", performance.now(), { landing: true, orbitRate: 1 });
      root.setAttribute("data-orb-state", "idle");
    }

    function setThinking() {
      motion.retargetOrb(frame, "thinking", performance.now(), {
        landing: false,
        orbitRate: THINKING_ORBIT_RATE
      });
      root.setAttribute("data-orb-state", "thinking");
    }

    function setActing() {
      motion.retargetOrb(frame, "acting", performance.now(), { landing: false, orbitRate: 1 });
      root.setAttribute("data-orb-state", "acting");
    }

    function setNeedsAttention() {
      motion.retargetOrb(frame, "needs-attention", performance.now(), {
        landing: false,
        orbitRate: 1
      });
      root.setAttribute("data-orb-state", "needs-attention");
    }

    function syncHome() {
      if (driven) return;
      if (intro || hovering) setThinking();
      else settleLanding();
    }

    function setCompleted() {
      motion.retargetOrb(frame, "completed", performance.now(), { landing: false, orbitRate: 1 });
      root.setAttribute("data-orb-state", "completed");
    }

    apply(motion.stepOrb(frame, offsets, 0, performance.now(), reduced));
    raf = global.requestAnimationFrame(tick);

    if (opts.hover !== false) {
      root.addEventListener("pointerenter", function () {
        hovering = true;
        syncHome();
      });
      root.addEventListener("pointerleave", function () {
        hovering = false;
        syncHome();
      });
    }

    return {
      root: root,
      playIntro: function () {
        if (driven) return;
        if (reduced) {
          settleLanding();
          return;
        }
        intro = true;
        hovering = false;
        setThinking();
        global.clearTimeout(introTimer);
        introTimer = global.setTimeout(function () {
          intro = false;
          syncHome();
        }, HOME_INTRO_MS);
      },
      setThinking: setThinking,
      setActing: setActing,
      setNeedsAttention: setNeedsAttention,
      settleLanding: settleLanding,
      setCompleted: setCompleted,
      setDriven: function (on) {
        driven = !!on;
        if (!driven) syncHome();
      },
      destroy: function () {
        global.cancelAnimationFrame(raf);
        global.clearTimeout(introTimer);
      }
    };
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
      var label = String(actingLabel || "").trim();
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

  function mount(host, options) {
    if (!host) return null;
    options = options || {};
    host.innerHTML =
      '<div class="truai-bubble" data-state="idle">' +
      '<div class="truai-bubble__measure" aria-hidden="true"></div>' +
      '<div class="truai-bubble__orb-wrap" data-truai-float-orb></div>' +
      '<div class="truai-bubble__pill">' +
      '<p class="truai-bubble__title">TruAI</p>' +
      '<div class="truai-bubble__subslot" aria-live="polite" aria-atomic="true"></div>' +
      "</div></div>";
    var root = host.querySelector(".truai-bubble");
    var slot = host.querySelector("[data-truai-float-orb]");
    var subSlot = host.querySelector(".truai-bubble__subslot");
    var measureEl = host.querySelector(".truai-bubble__measure");
    var pillEl = host.querySelector(".truai-bubble__pill");
    var orb = mountOrb(slot, options.ringSrc || RING);
    if (orb && orb.root) orb.root.style.pointerEvents = "auto";
    var mode = "idle";
    var actingLabel = "";
    var actingIconHtml = "";
    var completedTimer = null;
    var HOLD_MS = options.completedHoldMs || 1500;

    /* Sub row is position:absolute, so it cannot widen the pill — measure in-flow. */
    function sizePill(sub) {
      if (!measureEl || !pillEl) return;
      measureEl.textContent = "";
      var slotEl = document.createElement("div");
      slotEl.className = "truai-bubble__measure-slot";
      var title = document.createElement("p");
      title.className = "truai-bubble__title";
      title.textContent = "TruAI";
      slotEl.appendChild(title);
      if (sub && sub.label) {
        var row = document.createElement("div");
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.justifyContent = "center";
        row.style.gap = "4px";
        if (sub.iconHtml) {
          var iconWrap = document.createElement("span");
          iconWrap.className = "truai-bubble__icon";
          iconWrap.innerHTML = sub.iconHtml;
          row.appendChild(iconWrap);
        }
        var label = document.createElement("p");
        label.className = "truai-bubble__label";
        label.textContent = sub.label;
        row.appendChild(label);
        if (sub.showDot) {
          var dot = document.createElement("span");
          dot.className = "truai-bubble__dot";
          dot.style.animation = "none";
          row.appendChild(dot);
        }
        slotEl.appendChild(row);
      }
      measureEl.appendChild(slotEl);
      var w = slotEl.offsetWidth;
      var h = slotEl.offsetHeight;
      if (w) pillEl.style.width = w + "px";
      if (h) pillEl.style.height = h + "px";
    }

    function paintSub() {
      if (!subSlot) return;
      var sub = subForState(mode, actingLabel, actingIconHtml);
      if (!sub || !sub.label) {
        subSlot.classList.remove("is-open");
        subSlot.innerHTML = "";
        sizePill(null);
        return;
      }
      subSlot.classList.add("is-open");
      subSlot.innerHTML =
        '<div class="truai-bubble__sub is-in">' +
        (sub.iconHtml
          ? '<span class="truai-bubble__icon">' + sub.iconHtml + "</span>"
          : "") +
        '<p class="truai-bubble__label' +
        (sub.blink ? " is-blink" : "") +
        '">' +
        sub.label +
        "</p>" +
        (sub.showDot ? '<span class="truai-bubble__dot" aria-hidden="true"></span>' : "") +
        "</div>";
      sizePill(sub);
    }

    sizePill(null);

    function applyOrb(state) {
      if (!orb) return;
      if (state === "thinking") orb.setThinking();
      else if (state === "acting") orb.setActing();
      else if (state === "completed") orb.setCompleted();
      else if (state === "needs-attention") orb.setNeedsAttention();
      else orb.settleLanding();
    }

    function setMode(next) {
      next = next || {};
      var state = next.state || "idle";
      var nextLabel = next.actingLabel != null ? String(next.actingLabel) : actingLabel;
      var nextIcon = next.actingIconHtml != null ? String(next.actingIconHtml) : actingIconHtml;
      if (
        state === mode &&
        nextLabel === actingLabel &&
        nextIcon === actingIconHtml &&
        state !== "completed"
      ) {
        return;
      }
      actingLabel = nextLabel;
      actingIconHtml = nextIcon;
      global.clearTimeout(completedTimer);
      completedTimer = null;

      if (state === "idle") {
        mode = "idle";
        if (orb) orb.setDriven(false);
        if (root) root.setAttribute("data-state", "idle");
        paintSub();
        if (orb) orb.settleLanding();
        return;
      }

      mode = state;
      if (orb) orb.setDriven(true);
      if (root) root.setAttribute("data-state", state);
      applyOrb(state);
      paintSub();

      if (state === "completed" && typeof next.onCompletedEnd === "function") {
        completedTimer = global.setTimeout(function () {
          completedTimer = null;
          next.onCompletedEnd();
        }, HOLD_MS);
      }
    }

    return {
      root: root,
      playIntro: function () {
        if (mode !== "idle") return;
        if (orb) orb.playIntro();
      },
      setMode: setMode,
      destroy: function () {
        global.clearTimeout(completedTimer);
        if (orb) orb.destroy();
      }
    };
  }

  function mountHeader(host) {
    if (!host) return null;
    host.textContent = "";
    var scale = document.createElement("div");
    scale.className = "d3-lab-ident__orb-scale d3-ai-ident__orb-scale";
    host.appendChild(scale);
    var orb = mountOrb(scale, RING, { hover: false });
    if (!orb) return null;
    var mode = "idle";
    orb.setDriven(true);
    orb.settleLanding();
    return {
      setMode: function (next) {
        var state = typeof next === "string" ? next : (next && next.state) || "idle";
        if (!state || state === mode) return;
        mode = state;
        if (state === "thinking") orb.setThinking();
        else if (state === "acting") orb.setActing();
        else if (state === "completed") orb.setCompleted();
        else if (state === "needs-attention") orb.setNeedsAttention();
        else orb.settleLanding();
      },
      destroy: orb.destroy
    };
  }

  global.TruAIFloat = { mount: mount, mountHeader: mountHeader };
})(typeof window !== "undefined" ? window : this);
