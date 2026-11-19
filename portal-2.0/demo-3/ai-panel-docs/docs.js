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
    orbs.forEach(function (o) { try { o.destroy(); } catch (e) {} });
    orbs = [];
  }

  function mountOrbs(root) {
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
      if (!window.TruAIBubble || !window.TruAIBubble.mountPanel) return;
      var group = host.parentElement;
      var sync = function (state) {
        group.querySelectorAll("[data-dx-orb-state]").forEach(function (b) {
          var on = b.getAttribute("data-dx-orb-state") === state;
          b.classList.toggle("is-on", on);
          b.setAttribute("aria-checked", on ? "true" : "false");
        });
      };
      var o = window.TruAIBubble.mountPanel(host, {
        state: host.getAttribute("data-orb-player") || "idle",
        actingLabel: "Searching the registry",
        onCompletedEnd: function () { sync("idle"); }
      });
      if (!o) return;
      orbs.push(o);
      group.querySelectorAll("[data-dx-orb-state]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var state = btn.getAttribute("data-dx-orb-state");
          o.set({ state: state });
          sync(state);
        });
      });
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
