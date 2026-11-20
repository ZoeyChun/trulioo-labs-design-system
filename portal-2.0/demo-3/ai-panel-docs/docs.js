/* TruAI scenarios — renderer + router.
   One scenario per screen, steps stacked in order: you scroll the flow rather
   than clicking through it. Content comes from catalog.js.

   Route: #s/<scenario-id>
*/
(function () {
  "use strict";

  var DOCS = window.DOCS;
  var nav = document.getElementById("dx-nav");
  var stage = document.getElementById("dx-stage");

  var picks = {};   // scenario id -> { controlIndex: optionIndex }
  var orbs = [];    // mounted orb handles, destroyed on every re-render

  /* ------------------------------------------------------------- helpers --- */

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function find(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function state(sc) {
    if (!picks[sc.id]) {
      picks[sc.id] = {};
      (sc.controls || []).forEach(function (c, i) { picks[sc.id][i] = c.start || 0; });
    }
    return picks[sc.id];
  }

  function branchOf(sc) {
    if (!sc.controls || !sc.controls.length) return null;
    var c = sc.controls[0];
    return (c.options[state(sc)[0]] || c.options[0]).id;
  }

  /* ---------------------------------------------------------------- nav --- */

  function buildNav() {
    var groups = {}, order = [], html = "";
    DOCS.scenarios.forEach(function (sc) {
      var g = sc.group || "Other";
      if (!groups[g]) { groups[g] = []; order.push(g); }
      groups[g].push(sc);
    });
    order.forEach(function (g) {
      html += '<p class="dx-nav__group">' + esc(g) + "</p>";
      groups[g].forEach(function (sc) {
        html += '<button type="button" class="dx-nav__item" data-go="' + sc.id + '">' +
                esc(sc.name) + '<span class="dx-nav__n">' + sc.steps.length + "</span></button>";
      });
    });
    nav.innerHTML = html;
  }

  /* -------------------------------------------------------------- render --- */

  function destroyOrbs() {
    desktopObservers.forEach(function (o) { o.disconnect(); });
    desktopObservers = [];
    orbs.forEach(function (o) { try { o.destroy(); } catch (e) {} });
    orbs = [];
  }

  /* The home hero's dot globe — the same sphere math as js/d3-home-4.js, drawn
     into the specimen's own canvas so it re-renders with the step. */
  function mountGlobe(canvas) {
    var STOPS = [[255, 209, 102], [90, 199, 202], [158, 223, 182], [90, 199, 202]];
    var COUNT = 2000, TILT = 23 * Math.PI / 180, PERSPECTIVE = 2.6, SPEED = 0.00003;
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var golden = Math.PI * (3 - Math.sqrt(5)), dots = [], i;
    function grad(t) {
      var f = Math.min(Math.max(t, 0), 1) * (STOPS.length - 1), k0 = Math.min(Math.floor(f), STOPS.length - 2), k = f - k0;
      return STOPS[k0].map(function (v, c) { return Math.round(v + (STOPS[k0 + 1][c] - v) * k); });
    }
    for (i = 0; i < COUNT; i++) {
      var y = 1 - (i / (COUNT - 1)) * 2, r = Math.sqrt(1 - y * y), th = golden * i;
      dots.push({ x: Math.cos(th) * r, y: y, z: Math.sin(th) * r, c: grad((1 - y) / 2), seed: Math.random() * 6.2832 });
    }
    var ctx = canvas.getContext("2d"), host = canvas.parentNode, w = 0, h = 0, dpr = 1, angle = 0, last = 0, raf = 0;
    var cosT = Math.cos(TILT), sinT = Math.sin(TILT);
    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (!host.offsetParent || document.hidden) { last = now; return; }
      if (Math.abs(host.clientWidth - w) > 1 || Math.abs(host.clientHeight - h) > 1) {
        dpr = Math.min(window.devicePixelRatio || 1, 2); w = host.clientWidth; h = host.clientHeight;
        canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      }
      var dt = last ? now - last : 16; last = now;
      if (!reduced) angle += dt * SPEED;
      var R = Math.min(w * 0.46, h * 0.85), cx = w / 2, cy = h / 2, cosA = Math.cos(angle), sinA = Math.sin(angle);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h); ctx.globalCompositeOperation = "lighter";
      for (var n = 0; n < dots.length; n++) {
        var d = dots[n], x1 = d.x * cosA + d.z * sinA, z1 = -d.x * sinA + d.z * cosA;
        var y2 = d.y * cosT - z1 * sinT, z2 = d.y * sinT + z1 * cosT, p = PERSPECTIVE / (PERSPECTIVE - z2);
        var depth = (z2 + 1) / 2, tw = reduced ? 1 : 0.75 + 0.25 * Math.sin(now * 0.001 + d.seed);
        var rim = Math.sqrt(x1 * x1 + y2 * y2), edge = Math.pow(rim, 0.64);
        ctx.fillStyle = "rgba(" + d.c[0] + "," + d.c[1] + "," + d.c[2] + "," + ((0.02 + 0.98 * edge) * (0.6 + 0.4 * depth) * tw).toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(cx + x1 * R * p, cy + y2 * R * p, (0.6 + 1.3 * edge) * p, 0, 6.2832); ctx.fill();
      }
    }
    raf = requestAnimationFrame(frame);
    return { destroy: function () { cancelAnimationFrame(raf); } };
  }

  /* Scale each desktop frame to the width of its column. */
  var desktopObservers = [];
  function fitDesktops(root) {
    root.querySelectorAll(".dx-desktop-wrap").forEach(function (wrap) {
      var inner = wrap.firstElementChild;
      var fit = function () {
        var k = wrap.clientWidth / 1440;
        inner.style.transform = "scale(" + k + ")";
        wrap.style.height = Math.round(820 * k) + "px";
      };
      fit();
      if (window.ResizeObserver) {
        var ro = new ResizeObserver(fit);
        ro.observe(wrap);
        desktopObservers.push(ro);
      }
    });
  }

  function mountOrbs(root) {
    root.querySelectorAll("[data-dx-globe]").forEach(function (c) { orbs.push(mountGlobe(c)); });
    root.querySelectorAll("[data-orb]").forEach(function (host) {
      if (!window.TruAIFloat || !window.TruAIFloat.mountHeader) return;
      var o = window.TruAIFloat.mountHeader(host);
      if (!o) return;
      var want = host.getAttribute("data-orb");
      if (want && want !== "idle") o.setMode(want);
      orbs.push(o);
    });
    root.querySelectorAll("[data-hero-orb]").forEach(function (host) {
      if (!window.TruAIBubble || !window.TruAIBubble.mountPanel) return;
      var o = window.TruAIBubble.mountPanel(host, { state: host.getAttribute("data-hero-orb") || "idle" });
      if (o) orbs.push(o);
    });
    /* The state picker: one orb the buttons drive. Completed settles back to
       idle on its own, so the buttons follow it rather than lying about it. */
    root.querySelectorAll("[data-orb-player]").forEach(function (host) {
      /* TruAIFloat is the orb the experiments page and the portal share: the logo
         wraps around the sphere while Thinking, and Acting pulses. */
      if (!window.TruAIFloat || !window.TruAIFloat.mount) return;
      var group = host.parentElement;
      var sync = function (state) {
        group.querySelectorAll("[data-dx-orb-state]").forEach(function (b) {
          var on = b.getAttribute("data-dx-orb-state") === state;
          b.classList.toggle("is-on", on);
          b.setAttribute("aria-checked", on ? "true" : "false");
        });
      };
      var o = window.TruAIFloat.mount(host, {});
      if (!o) return;
      orbs.push(o);
      /* The portal shows the orb bare; the title and status sit beside it in the header. */
      var I = window.DOCSX.I;
      var STATUS = { idle: ["", "Awaiting input"], thinking: ["", "Thinking…"],
                     acting: [I.search12, "Checking registry"], completed: [I.file11, "Report ready"] };
      var statusEl = group.querySelector(".dx-orbplay__status");
      var go = function (state) {
        var st = STATUS[state] || STATUS.idle;
        if (statusEl) statusEl.innerHTML = (st[0] ? '<span class="dx-orbplay__status-icon">' + st[0] + "</span>" : "") + "<span>" + st[1] + "</span>";
        o.setMode({
          state: state,
          actingLabel: "Checking registry",
          actingIconHtml: window.DOCSX.I.search12,
          /* Completed holds, then settles back to idle — the buttons follow it. */
          onCompletedEnd: function () { o.setMode({ state: "idle" }); sync("idle"); }
        });
        sync(state);
      };
      group.querySelectorAll("[data-dx-orb-state]").forEach(function (btn) {
        btn.addEventListener("click", function () { go(btn.getAttribute("data-dx-orb-state")); });
      });
      go(host.getAttribute("data-orb-player") || "idle");
    });
  }

  function branchBar(sc) {
    if (!sc.controls || !sc.controls.length) return "";
    var s = state(sc);
    return '<div class="dx-branchbar">' + sc.controls.map(function (c, i) {
      return '<span class="dx-branchbar__label">' + esc(c.label) + "</span>" +
        '<div class="dx-chips">' + c.options.map(function (o, j) {
          return '<button type="button" class="dx-chip' + (s[i] === j ? " is-on" : "") +
                 '" data-ctl="' + i + '" data-opt="' + j + '">' + o.label + "</button>";
        }).join("") + "</div>";
    }).join("") + '<span class="dx-branchbar__hint">the steps below change with it</span></div>';
  }

  function stepHtml(step, n, branch, last) {
    var label = step.num || n;
    var skipped = !!(step.skipOn && branch && step.skipOn.indexOf(branch) !== -1);
    var changes = typeof step.changes === "function" ? step.changes(branch) : (step.changes || []);
    var note = step.note ? (typeof step.note === "function" ? step.note(branch) : step.note) : null;

    var head =
      '<div class="dx-step__head">' +
      '<h2 class="dx-step__title">' + esc(step.title) + "</h2>" +
      (step.demo ? ' <span class="dx-demo">demo only</span>' : "") +
      "</div>" +
      '<p class="dx-step__trigger"><span class="dx-step__actor' +
      (step.actor === "Action" ? "" : " dx-step__actor--sys") + '">' + esc(step.actor) + "</span>" +
      step.trigger + "</p>";

    if (skipped) {
      return '<li class="dx-step dx-step--skip"><span class="dx-step__num' +
        (String(label).length > 2 ? " dx-step__num--wide" : "") + '">' + label + "</span>" +
        '<div class="dx-step__body">' + head +
        '<p class="dx-step__none">This step does not happen on this branch.</p>' +
        (note ? noteHtml(note) : "") + "</div></li>";
    }

    /* Only steps with a reference screenshot carry a visual; the rest are
       described, so nothing on this page is a guess at what the UI looks like. */
    var visual = step.noVisual || !step.view ? "" : '<div class="dx-view">' + step.view(branch) + "</div>";

    return '<li class="dx-step' + (last ? " dx-step--last" : "") + (visual ? "" : " dx-step--text") + '">' +
      '<span class="dx-step__num' + (String(label).length > 2 ? " dx-step__num--wide" : "") + '">' + label + "</span>" +
      '<div class="dx-step__body">' + head + visual +
      (changes.length
        ? '<div class="dx-changes"><p class="dx-changes__k">What changes</p><ul>' +
          changes.map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ul></div>"
        : "") +
      (note ? noteHtml(note) : "") +
      "</div></li>";
  }

  function noteHtml(note) {
    return '<div class="dx-note' + (note.warn ? " dx-note--warn" : "") + '">' +
      '<span class="dx-note__k">' + esc(note.k) + "</span><span>" + note.text + "</span></div>";
  }

  /* Reference notes, not a flow: no numbers and no connector, because these
     are things that are true at any point rather than steps in an order. */
  function noteCardHtml(item) {
    var visual = item.noVisual || !item.view ? "" : '<div class="dx-view">' + item.view() + "</div>";
    return '<section class="dx-card' + (visual ? "" : " dx-card--text") + '">' +
      '<h2 class="dx-card__title">' + esc(item.title) + "</h2>" +
      (item.line ? '<p class="dx-card__line">' + item.line + "</p>" : "") +
      visual +
      ((item.changes || []).length
        ? '<div class="dx-changes"><p class="dx-changes__k">What to know</p><ul>' +
          item.changes.map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ul></div>"
        : "") +
      (item.note ? noteHtml(item.note) : "") +
      "</section>";
  }

  function tableHtml(sc) {
    if (!(sc.props && sc.props.rows && sc.props.rows.length)) return "";
    return '<section class="dx-end"><h2 class="dx-end__title">' + esc(sc.props.name || "Details") + "</h2>" +
      '<table class="dx-table"><tr>' +
      sc.props.head.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") + "</tr>" +
      sc.props.rows.map(function (r) {
        return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>";
      }).join("") + "</table></section>";
  }

  function render() {
    destroyOrbs();
    var id = (location.hash || "").replace(/^#s\//, "");
    var sc = find(DOCS.scenarios, id) || DOCS.scenarios[0];
    var branch = branchOf(sc);

    nav.querySelectorAll(".dx-nav__item").forEach(function (b) {
      b.classList.toggle("is-on", b.getAttribute("data-go") === sc.id);
    });

    stage.innerHTML =
      '<div class="dx-head">' +
      '<p class="dx-head__eyebrow">' + esc(sc.group) + "</p>" +
      '<h1 class="dx-head__title">' + esc(sc.name) + "</h1>" +
      (sc.line ? '<p class="dx-head__line">' + sc.line + "</p>" : "") +
      "</div>" +
      branchBar(sc) +
      (sc.notes
        ? '<div class="dx-cards">' + sc.steps.map(noteCardHtml).join("") + "</div>"
        : '<ol class="dx-flow">' + sc.steps.map(function (st, i) {
            return stepHtml(st, i + 1, branch, i === sc.steps.length - 1);
          }).join("") + "</ol>") +
      tableHtml(sc);

    mountOrbs(stage);
    fitDesktops(stage);
    stage.scrollTop = 0;
  }

  /* -------------------------------------------------------------- events --- */

  document.addEventListener("click", function (e) {
    var go = e.target.closest("[data-go]");
    if (go) {
      var id = go.getAttribute("data-go");
      if (location.hash === "#s/" + id) render();
      else location.hash = "s/" + id;
      return;
    }

    var chip = e.target.closest("[data-ctl]");
    if (chip) {
      var sc = find(DOCS.scenarios, (location.hash || "").replace(/^#s\//, "")) || DOCS.scenarios[0];
      /* Keep the reader where they are: re-render, then restore the scroll. */
      var y = stage.scrollTop;
      state(sc)[+chip.getAttribute("data-ctl")] = +chip.getAttribute("data-opt");
      render();
      stage.scrollTop = y;
    }
  });

  /* Typing in a specimen textarea grows it, same rule the real composer uses. */
  document.addEventListener("input", function (e) {
    var input = e.target.closest(".d1-prompt__input");
    if (!input) return;
    input.style.height = "22px";
    var h = Math.min(input.scrollHeight, 132);
    input.style.height = h + "px";
    input.classList.toggle("is-multiline", h > 22);
  });

  window.addEventListener("hashchange", render);

  buildNav();
  render();
})();
