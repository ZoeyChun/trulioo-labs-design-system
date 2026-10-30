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

  /* The KYB flow never shows a map. The right panel is the dotted ground with a
     card on it, following what the user has told us so far:

       no name / no country   "Waiting for …" card         (watchAwaitStage)
       agent working          skeleton of that card
       several matches        "Several businesses share this name"  (Figma 1811:73412)
       one picked, to confirm  the same card for that business
       verifying              skeleton, until the report opens

     Nothing here touches the thread; it only reads it and the agent's state. */
  function watchResolving() {
    var ws = document.querySelector("[data-d3-workspace]");
    var awaitEl = document.querySelector("[data-d3-kyb-map-await]");
    var thread = document.querySelector("[data-d1-thread]");
    var composer = document.querySelector("[data-d1-composer]");
    var panel = document.querySelector("[data-d3-kyb-choice-panel]");
    if (!ws || !awaitEl || !thread) return;

    var busy = false;
    var sawBusy = false;
    var failsafe = 0;
    var RESOLVING = "data-d3-kyb-resolving";
    var CHOICE = "data-d3-kyb-choice";

    function stop() {
      window.clearTimeout(failsafe);
      failsafe = 0;
      ws.removeAttribute(RESOLVING);
    }

    function esc(v) {
      return String(v == null ? "" : v)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    /* "New York, NY" → NY. The match list is one country at a time. */
    function regionOf(biz) {
      var m = /,\s*([A-Za-z]{2,})\s*$/.exec(biz.city || "");
      return m ? m[1].toUpperCase() : biz.city || "";
    }

    /* While the wizard is open the right-hand card says which question it is. */
    var wizTag = null;

    function fill(tag, title, lead, steps) {
      if (!panel) return;
      tag = wizTag || tag;
      var set = function (sel, html) {
        var el = panel.querySelector(sel);
        if (el && el.innerHTML !== html) el.innerHTML = html;
      };
      set("[data-kc-tag]", esc(tag));
      set("[data-kc-title]", esc(title));
      set("[data-kc-lead]", esc(lead));
      set("[data-kc-steps]", steps);
    }

    function showChoice(kind, maps, agentState) {
      wizTag = agentState && agentState.wizard ? "Question " + agentState.wizard.n + " of " + agentState.wizard.m : null;
      var S = window.D3KybSession;
      var picked = function (b) {
        return esc([b.city || b.country, b.reg].filter(Boolean).join(" · "));
      };
      var pkgName = function () {
        return esc((S && S.package(S.get().package) && S.package(S.get().package).name) || "");
      };
      var addonsNote = function () {
        var ids = (S && S.get().addons) || [];
        return ids.length
          ? esc(ids.map(function (id) { return S.addon(id).short; }).join(", "))
          : "None";
      };
      var pending = maps && maps.findById && agentState ? maps.findById(agentState.pendingId) : null;
      /* A hand-entered entity is not in the dataset: describe it from the session. */
      if (!pending && agentState && /^manual:/.test(agentState.pendingId || "") && S) {
        var ent = S.get();
        pending = {
          id: agentState.pendingId,
          name: ent.profile.name || (ent.entity && ent.entity.name) || "",
          reg: ent.profile.regNo,
          city: (S.country(ent.entity && ent.entity.cc) || {}).name || "",
          cc: ent.entity && ent.entity.cc
        };
      }

      /* The package question comes before the search: no business yet. */
      if (kind === "package" && !pending) {
        var gc = S && S.country(S.get().country);
        fill(
          "Waiting for your package",
          (agentState && agentState.queryLabel) || "Business",
          "Choose how much to verify in the chat — then I’ll search" + (gc ? " " + gc.registry : " the registry") + ".",
          step("done", "Name set", esc((agentState && agentState.queryLabel) || "")) +
            step("done", "Country set", esc(gc ? gc.name : "")) +
            step("current", "Package needed", "Choose in the chat") +
            step("todo", "Business matches", "Pick the right entity")
        );
        ws.setAttribute(CHOICE, "package");
        return true;
      }

      if (kind === "finder") {
        var fc = S && S.country(S.get().country);
        fill(
          "Search method",
          (agentState && agentState.queryLabel) || "Business",
          "Choose in the chat whether to search" + (fc ? " " + fc.registry : " the registry") + " or enter the details yourself.",
          step("done", "Name set", esc((agentState && agentState.queryLabel) || "")) +
            step("done", "Country set", esc(fc ? fc.name : "")) +
            step("done", "Package set", pkgName()) +
            step("current", "Business Finder", "Choose in the chat")
        );
        ws.setAttribute(CHOICE, "finder");
        return true;
      }

      if (kind === "profile") {
        var pc = S && S.get().entity ? S.country(S.get().entity.cc) : null;
        fill(
          "Entity details needed",
          pc ? pc.name : "Entity details",
          (pc ? pc.registry : "This registry") + " has no automated search. Enter the entity details in the chat.",
          step("done", "Country set", esc(pc ? pc.name : "")) +
            step("done", "Package set", pkgName()) +
            step("current", "Entity details", "Enter them in the chat")
        );
        ws.setAttribute(CHOICE, "profile");
        return true;
      }

      if (kind === "package" || kind === "addons" || kind === "inputs" || kind === "confirm") {
        if (!pending) return false;
        var r = S ? S.requirements() : { fields: 0, ubo: "none", bank: false };
        var steps =
          step("done", "Name set", esc(pending.name)) +
          step("done", "Business matches", picked(pending));
        var tag, lead;
        if (kind === "package") {
          tag = "Waiting for your package";
          lead = "Choose how much to verify for this business in the chat.";
          steps += step("current", "Package needed", "Choose in the chat") + step("todo", "Add-ons", "Optional risk modules");
        } else if (kind === "addons") {
          tag = "Optional add-ons";
          lead = "Choose any specialized risk modules in the chat, or continue without.";
          steps += step("done", "Package set", pkgName()) + step("current", "Add-ons", "Choose in the chat");
        } else if (kind === "inputs") {
          tag = "Details needed";
          lead = "Only what the registry does not hold is asked for — " + r.fields + (r.fields === 1 ? " detail" : " details") + ". Fill it in the chat.";
          steps +=
            step("done", "Package set", pkgName()) +
            step("done", "Add-ons", addonsNote()) +
            step(
              "current",
              "Missing details",
              [r.ubo === "private" ? "Owner" : r.ubo === "public" ? "UBO email" : "", r.bank ? "Bank account" : ""]
                .filter(Boolean)
                .join(" \u00b7 ") || "Fill in the chat"
            );
        } else {
          tag = "Waiting for your confirmation";
          lead = "Execute the verification in the chat when you are ready.";
          steps += step("done", "Package set", pkgName()) + step("done", "Add-ons", addonsNote());
          if (r.ubo === "public") steps += step("done", "Ownership", "Pulled from " + esc((S.country(pending.cc) || {}).registry || "the registry"));
          else if (r.ubo === "private") steps += step("done", "Ownership", esc(S.get().ubo.name.trim()) + " · " + parseFloat(S.get().ubo.pct) + "%");
          else if (r.ubo === "skipped" || r.ubo === "off") steps += step("done", "Ownership", "Reported as not disclosed");
          steps += step("current", "Ready to verify", "Execute in the chat");
        }
        fill(tag, pending.name, lead, steps);
      } else {
        var list = (maps && maps.getLastResults && maps.getLastResults()) || [];
        var n = list.length;
        var regions = {};
        list.forEach(function (b) {
          regions[regionOf(b)] = true;
        });
        var k = Object.keys(regions).length;
        var us = list.length && list.every(function (b) { return b.cc === "US"; });
        var unit = us ? (k === 1 ? "state" : "states") : k === 1 ? "region" : "regions";
        var name = esc(agentState && agentState.queryLabel) || (n ? esc(list[0].name) : "Business name");
        var where = n ? esc(list[0].country || "") : "";
        if (!n) {
          fill(
            "No matches yet",
            "No businesses match",
            "Try another country or a different name.",
            step("done", "Name set", name) +
              step("current", "Country needed", "Try another country") +
              step("todo", "Business matches", "Pick the right entity")
          );
        } else if (n === 1) {
          fill(
            "Waiting for your choice",
            "One business matches",
            "Select it to continue with the verification.",
            step("done", "Name set", name) +
              step("done", "Country set", where || "\u2014") +
              step("current", "Business matches", "1 match \u00b7 Select it in chat")
          );
        } else {
          fill(
            "Waiting for your choice",
            "Several businesses share this name",
            "Verifying the wrong one would give the wrong result, so a choice is needed.",
            step("done", "Name set", name) +
              step("done", "Country set", where || "\u2014") +
              step("current", "Business matches", n + " matches across " + k + " " + unit + " \u00b7 Pick one")
          );
        }
      }
      ws.setAttribute(CHOICE, kind);
      return true;
    }

    function skeleton(withFailsafe) {
      ws.removeAttribute(CHOICE);
      if (ws.hasAttribute(RESOLVING)) return;
      ws.setAttribute(RESOLVING, "");
      if (!withFailsafe) return;
      /* Never leave the skeleton up for good (e.g. a search with no hits). */
      failsafe = window.setTimeout(function () {
        stop();
        if (window.D3KybMapSearch && window.D3KybMapSearch.setAwaitingCountry) {
          window.D3KybMapSearch.setAwaitingCountry(true, "");
        }
      }, 12000);
    }

    function sync() {
      if (!thread.querySelector(".d1-user")) {
        busy = false;
        sawBusy = false;
        ws.removeAttribute("data-d3-map-ready");
        ws.removeAttribute(CHOICE);
        stop();
        return;
      }
      if (ws.getAttribute("data-d3-kyb-surface") !== "map") {
        ws.removeAttribute(CHOICE);
        return stop();
      }
      if (!awaitEl.hidden) {
        /* The waiting card replaces everything: nothing is ready until matches come. */
        ws.removeAttribute("data-d3-map-ready");
        ws.removeAttribute(CHOICE);
        return stop();
      }
      if (!ws.hasAttribute("data-d3-map-ready")) {
        if (busy || !sawBusy) return skeleton(true);
        /* The agent finished and still knows no business / country (plain Q&A):
           show what it is waiting for. */
        stop();
        ws.removeAttribute(CHOICE);
        if (window.D3KybMapSearch && window.D3KybMapSearch.setAwaitingCountry) {
          window.D3KybMapSearch.setAwaitingCountry(true, "");
        }
        return;
      }
      /* There are matches: what the card says depends on where the agent is. */
      var agent = window.D3KybAgent && window.D3KybAgent.getState ? window.D3KybAgent.getState() : null;
      var maps = window.D3KybMapSearch;
      var mode = agent && agent.mode;
      stop();
      if (mode === "list" && showChoice("matches", maps, agent)) return;
      if (mode === "profile" && showChoice("profile", maps, agent)) return;
      if (mode === "package" && !agent.pendingId && showChoice("package", maps, agent)) return;
      if (mode === "finder" && showChoice("finder", maps, agent)) return;
      if (agent.pendingId && (mode === "package" || mode === "addons" || mode === "inputs" || mode === "confirm") && showChoice(mode, maps, agent)) return;
      /* Verifying (confirmed) or between steps: skeleton until the report opens. */
      skeleton(false);
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
    /* subtree: the candidate panel repaints in place when a chip is toggled or a
       match is picked. */
    new MutationObserver(sync).observe(thread, { childList: true, subtree: true });
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
