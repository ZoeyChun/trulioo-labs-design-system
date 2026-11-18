/* Demo 3 — add Business Risk Horizon to a report that was run without it.

   The Overview hero offers to run it. Running it adds Business Risk Horizon to the business that is already
   there, as its own transaction (its own Transaction ID): the baseline verification, the package and the
   other add-ons are not run again or changed. The report then gains the Business Risk Horizon tab and the score. */
(function () {
  "use strict";

  var S = window.D3KybSession;
  var resume = document.querySelector("[data-d3-kyb-resume]");
  if (!S || !resume || !window.D3KybReport) return;

  var DIALOG_ID = "d3-kyb-brh-dialog";
  var RUN_MS = 3500;
  /* A run key per reveal, so a fresh report of the same business is not mistaken for one that has had it added. */
  var seq = 0;
  var current = { key: "", name: "" };
  var running = false;
  /* run key -> { runs: [{ tx, atLabel, score }], applied, viewing, ... }: every Business Risk Horizon run of that report is
     its own transaction. applied = a version that includes Business Risk Horizon is on screen (viewing = which run). */
  var added = {};
  /* The score of a first run comes from the business's own risk; later runs stay in its band. */
  function baseScore() {
    var F = window.D3KybFindings;
    var b = bizNow();
    return F && F.riskProfile && b ? F.riskProfile(b).score : 87;
  }
  var BANDS = { low: [8, 28], medium: [38, 58], high: [62, 94] };

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function R() {
    return window.D3KybReport;
  }

  function bizNow() {
    return R().getCurrent && R().getCurrent();
  }

  function uuid() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      return (c === "x" ? r : (r & 3) | 8).toString(16);
    });
  }

  function dayLabel(d) {
    var m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return d.getDate() + " " + m[d.getMonth()] + " " + d.getFullYear();
  }

  function timeLabel(d) {
    var m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var h = d.getHours();
    var min = d.getMinutes();
    return d.getDate() + " " + m[d.getMonth()] + ", " + (h % 12 || 12) + ":" + (min < 10 ? "0" : "") + min + " " + (h < 12 ? "AM" : "PM");
  }

  /* A new run of the same business can score a little differently: that is what running it again is for. */
  function nextScore(rec) {
    var prev = rec.runs.length ? rec.runs[rec.runs.length - 1].score : null;
    if (prev == null) return baseScore();
    var band = BANDS[prev < 30 ? "low" : prev <= 60 ? "medium" : "high"];
    var step = 3 + Math.floor(Math.random() * 4);
    var next = prev + (Math.random() < 0.5 ? -step : step);
    return Math.max(band[0], Math.min(band[1], next));
  }

  function shortTx(tx) {
    return String(tx || "").slice(0, 8);
  }

  function deltaOf(rec, i) {
    return i > 0 ? rec.runs[i].score - rec.runs[i - 1].score : null;
  }

  function deltaHtml(rec, i) {
    var d = deltaOf(rec, i);
    if (d == null) return '<span class="d3-brh-delta is-first">first run</span>';
    if (d === 0) return '<span class="d3-brh-delta">no change vs previous</span>';
    return '<span class="d3-brh-delta ' + (d > 0 ? "is-up" : "is-down") + '">' + (d > 0 ? "▲ " : "▼ ") + Math.abs(d) + " vs previous</span>";
  }

  function offered() {
    var b = bizNow();
    return !!(R().offersBrh && R().offersBrh() && b && b.name === current.name);
  }

  /* Beside the verification status in the Overview hero: the button that adds what is missing. Its tooltip says what it is. */
  function buttonHtml() {
    if (!offered()) return "";
    return (
      '<button type="button" class="tds-btn tds-btn--primary tds-btn--md d3-brh-hero-cta" data-d3-brh-cta data-d3-brh-run' +
      ' data-tooltip="A 0–100 risk score and the signals behind it. Not part of this verification yet.">' +
      '<span class="tds-btn__leading-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg></span>' +
      "Run Business Risk Horizon</button>"
    );
  }

  var ARROW_SVG =
    '<span class="d3-ai-next__arrow" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M3 8h10m0 0-3.5-3.5M13 8l-3.5 3.5"/></svg></span>';

  var AGAIN_ICON =
    '<span class="tds-btn__leading-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M13 8a5 5 0 1 1-1.5-3.55M13 2.75v3h-3"/></svg></span>';

  /* The report as it was run, once Business Risk Horizon has been run beside it: the latest run, and a way to run it again. */
  function hasRuns() {
    var rec = added[current.key];
    return !!(rec && rec.runs && rec.runs.length);
  }

  function showingOriginal() {
    var rec = added[current.key];
    return !!rec && !rec.applied;
  }

  var CARET_SVG =
    '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>';

  /* The latest run as one split button: the button opens it, the caret lists every run (with their scores). */
  function splitHtml() {
    var rec = added[current.key];
    var last = rec.runs.length - 1;
    var main =
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md d3-brh-split__main" data-d3-brh-view data-d3-brh-run-idx="' + last + '">' +
      "View latest</button>";
    if (rec.runs.length < 2) return '<div class="d3-brh-split">' + main + "</div>";
    var items = rec.runs
      .map(function (run, i) {
        return (
          '<button type="button" class="d3-brh-menu__item" role="menuitem" data-d3-brh-view data-d3-brh-run-idx="' + i + '" data-d3-brh-menu-pick>' +
          '<span class="d3-brh-menu__when">' + esc(run.atLabel) + (i === last ? ' <span class="d3-brh-menu__latest">Latest</span>' : "") + "</span>" +
          '<span class="d3-brh-menu__score">' + esc(run.score) + "</span>" + deltaHtml(rec, i) + "</button>"
        );
      })
      .reverse()
      .join("");
    return (
      '<div class="d3-brh-split d3-brh-split--menu" data-d3-brh-split>' + main +
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md d3-brh-split__caret" data-d3-brh-menu aria-haspopup="menu" aria-expanded="false" aria-label="All Business Risk Horizon runs">' + CARET_SVG + "</button>" +
      '<div class="d3-brh-menu" role="menu" aria-label="Business Risk Horizon runs" hidden>' + items + "</div></div>"
    );
  }

  function closeMenus() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-d3-brh-split] .d3-brh-menu"), function (m) { m.hidden = true; });
    Array.prototype.forEach.call(document.querySelectorAll("[data-d3-brh-menu]"), function (b) { b.setAttribute("aria-expanded", "false"); });
  }

  /* The Overview's Suggested Actions. A report without Business Risk Horizon offers to run it; once it has been run, the
     report as it was run offers to run it again and shows the latest run. A version that includes it offers nothing. */
  function suggested(brhOn) {
    if (hasRuns() && showingOriginal()) {
      return {
        ctas:
          '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md d3-brh-again" data-d3-brh-cta data-d3-brh-run>' +
          AGAIN_ICON + "Run Business Risk Horizon again</button>" + splitHtml(),
        extra: ""
      };
    }
    var one = !brhOn ? buttonHtml() : "";
    return one ? { ctas: one, extra: "" } : null;
  }

  /* In the AI panel's suggested next actions: run it, or once it has run: see the latest and run it again. */
  function nextHtml() {
    if (hasRuns()) {
      if (!showingOriginal()) return "";
      return (
        '<button type="button" class="d3-ai-next__btn" data-d3-brh-view data-d3-brh-run-idx="' + (added[current.key].runs.length - 1) + '">' +
        '<span class="d3-ai-next__text">View latest Business Risk Horizon</span>' + ARROW_SVG + "</button>" +
        '<button type="button" class="d3-ai-next__btn" data-d3-brh-run data-d3-brh-again>' +
        '<span class="d3-ai-next__text">Run Business Risk Horizon again</span>' + ARROW_SVG + "</button>"
      );
    }
    if (!offered()) return "";
    return (
      '<button type="button" class="d3-ai-next__btn" data-d3-brh-run>' +
      '<span class="d3-ai-next__text">Run Business Risk Horizon Score</span>' + ARROW_SVG + "</button>"
    );
  }

  /* Put the right rows into the AI panel's list again (after a run, or when the version on screen changes). */
  function refreshNext() {
    var host = document.querySelector("[data-d3-ai-next]");
    var list = host && host.querySelector(".d3-ai-next__list");
    if (!list) return;
    Array.prototype.forEach.call(list.querySelectorAll("[data-d3-brh-run], [data-d3-brh-view]"), function (b) { b.remove(); });
    var html = nextHtml();
    if (html) list.insertAdjacentHTML("afterbegin", html);
    host.removeAttribute("data-sig");
  }

  /* The score the version on screen belongs to (each run can score differently), for the Overview and the score tab. */
  function currentScore() {
    var rec = added[current.key];
    if (!rec || !rec.applied || rec.viewing == null || !rec.runs[rec.viewing]) return null;
    return rec.runs[rec.viewing].score;
  }

  /* The Business Risk Horizon tab shows its own transaction in the score panel: the label, and the ID with Copy on hover. */
  function syncNote() {
    var rec = added[current.key];
    var run = rec && rec.runs && rec.runs[rec.viewing != null ? rec.viewing : rec.runs.length - 1];
    var panel = resume.querySelector('[data-d3-kyb-panel="risk"]');
    if (!panel) return;
    var old = panel.querySelector(".d3-brh-txn");
    if (old) old.remove();
    var score = panel.querySelector(".kyb-tab-summary__score");
    if (!score) return;
    /* The score tab shows the score of the run on screen, or this business's own when Business Risk Horizon came with the report. */
    var F = window.D3KybFindings;
    var b = bizNow();
    var shown = run && rec.applied ? run.score : F && F.riskProfile && b ? F.riskProfile(b).score : null;
    if (shown != null) {
      var band = shown < 30 ? "low" : shown <= 60 ? "medium" : "high";
      var changed = false;
      Array.prototype.forEach.call(panel.querySelectorAll(".dv-di-gauge[data-score]"), function (g) {
        if (g.getAttribute("data-score") !== String(shown)) { g.setAttribute("data-score", String(shown)); changed = true; }
        g.setAttribute("data-risk", band);
        /* The badge under the number names the band of this score. */
        var label = band === "high" ? "High Risk" : band === "medium" ? "Medium Risk" : "Low Risk";
        if (g.getAttribute("data-label") !== label) { g.setAttribute("data-label", label); changed = true; }
      });
      if (changed && window.ScoreGauge && window.ScoreGauge.renderAll) window.ScoreGauge.renderAll(panel);
    }
    if (!run) return;
    score.insertAdjacentHTML(
      "beforeend",
      '<div class="d3-brh-txn" tabindex="0" aria-label="Transaction ID of the Business Risk Horizon run">' +
      '<span class="d3-brh-txn__label text-label-sm-uppercase">Transaction ID' +
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1"/><path d="M10.5 5.5V4a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5"/></svg></span>' +
      '<span class="d3-brh-txn__pop"><span class="d3-brh-txn__value text-body-xs" data-d3-brh-txid>' + esc(run.tx) + "</span>" +
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--sm" data-d3-brh-copy>Copy</button></span></div>'
    );
  }

  /* The tab's body mounts a moment after the tab opens, however it was opened: try until the score panel is there. */
  function syncSoon() {
    var tries = 0;
    (function go() {
      var panel = resume.querySelector('[data-d3-kyb-panel="risk"]');
      if (panel && panel.querySelector(".kyb-tab-summary__score")) {
        syncNote();
        return;
      }
      if (++tries < 20) window.setTimeout(go, 150);
    })();
  }

  /* ---- confirm and run ---- */
  function openDialog() {
    var dlg = document.getElementById(DIALOG_ID);
    if (!dlg) return;
    var b = bizNow();
    var name = dlg.querySelector("[data-d3-brh-dialog-name]");
    if (name) name.textContent = (b && b.name) || "this business";
    /* Running it again says that it makes a new transaction and leaves the report as it is. */
    var again = hasRuns();
    var title = dlg.querySelector(".tds-dialog__title");
    if (title) title.textContent = again ? "Run Business Risk Horizon again?" : "Run Business Risk Horizon?";
    var text = dlg.querySelector(".d3-kyb-brh-dialog__text");
    if (text) text.innerHTML = (again ? "This runs Business Risk Horizon again for " : "This runs Business Risk Horizon for ") + "<b>" + esc((b && b.name) || "this business") + "</b>.";
    var list = dlg.querySelector(".d3-kyb-brh-dialog__list");
    if (list) {
      list.innerHTML = again
        ? "<li>It creates a new transaction, with a new Transaction ID. The earlier runs stay as they are.</li><li>Compare the new score with the earlier ones in the list of runs.</li>"
        : "<li>It runs as its own transaction, with a new Transaction ID.</li><li>The verification, package and add-ons already run are not run again or changed.</li>";
    }
    var confirm = dlg.querySelector("[data-d3-brh-confirm]");
    if (confirm) confirm.textContent = again ? "Run again" : "Run Business Risk Horizon";
    var trigger = document.createElement("button");
    trigger.type = "button";
    trigger.hidden = true;
    trigger.setAttribute("data-dialog-open", DIALOG_ID);
    document.body.appendChild(trigger);
    trigger.click();
    trigger.remove();
  }

  function closeDialog() {
    var dlg = document.getElementById(DIALOG_ID);
    var c = dlg && dlg.querySelector("[data-dialog-close]");
    if (c) c.click();
  }

  /* The chat shows what was asked, as a message of the user's. */
  var ASKED = "Run Business Risk Horizon Score";

  function echoAsked() {
    var text = hasRuns() ? "Run Business Risk Horizon again" : ASKED;
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return;
    var node = document.createElement("section");
    node.className = "d1-turn d1-enter";
    node.innerHTML = '<div class="d1-user"><p></p></div>';
    node.querySelector("p").textContent = text;
    thread.appendChild(node);
    if (node.scrollIntoView) node.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  /* The chat answers with what was added: the score, the key findings and the transaction. */
  function postReply(rec, key, run, idx) {
    var tries = 0;
    (function go() {
      if (key !== current.key) return;
      var panel = resume.querySelector('[data-d3-kyb-panel="risk"]');
      var items = panel ? panel.querySelectorAll(".kyb-tab-summary__finding") : [];
      var gauge = panel && panel.querySelector(".dv-di-gauge[data-score]");
      var title = resume.querySelector(".d3h-hero__verdict .d3h-card__title--hero");
      if (!items.length || !gauge || !title) {
        if (++tries < 30) window.setTimeout(go, 400);
        return;
      }
      var tone = (String(title.className).match(/d3h-card__title--(negative|intermediate|positive)/) || [])[1] || "negative";
      var list = Array.prototype.map.call(items, function (li) {
        var icon = li.querySelector(".kyb-tab-summary__finding-icon");
        var text = li.querySelector(".kyb-tab-summary__finding-text");
        return '<li class="kyb-tab-summary__finding"><span class="' + esc(icon ? icon.className : "kyb-tab-summary__finding-icon") + '" aria-hidden="true">' +
          (icon ? icon.innerHTML : "") + '</span><span class="kyb-tab-summary__finding-text">' + esc(text ? text.textContent : li.textContent) + "</span></li>";
      }).join("");
      var thread = document.querySelector("[data-d1-thread]");
      if (!thread) return;
      var node = document.createElement("section");
      node.className = "d1-turn d1-enter";
      node.innerHTML =
        '<div class="d1-ai d1-block d3-brh-reply">' +
        /* The "has run for" line was said when the run finished (postLead), so the answer is just the card. */
        '<div class="d3-brh-reply__card" data-d3-brh-run-idx="' + idx + '">' +
        '<div class="d3-brh-reply__section d3-brh-reply__head"><span class="d3-brh-reply__head-copy">' +
        '<span class="d3-rc__label text-label-sm-uppercase">Business Risk Horizon Score' + (idx > 0 ? " · run " + (idx + 1) : "") + '</span>' +
        '<span class="d3-rc__scoreval"><b class="d3-rc__score-num">' + esc(run.score) + "</b>" +
        '<span class="d3-rc__score-label d3-rc__score-label--' + esc(tone) + '">' + esc(title.textContent.trim()) + "</span></span></span>" +
        '<button type="button" class="tds-btn tds-btn--primary tds-btn--md" data-d3-brh-view data-d3-brh-run-idx="' + idx + '">View</button></div>' +
        '<div class="d3-brh-reply__section"><span class="d3-rc__label text-label-sm-uppercase">Key findings</span>' +
        '<ul class="d3-brh-reply__list">' + list + "</ul></div>" +
        '<div class="d3-brh-reply__section d3-brh-reply__txn"><span class="d3-rc__label text-label-sm-uppercase">Transaction ID</span>' +
        '<span class="d3-brh-reply__txid text-body-xs" data-d3-brh-txid>' + esc(run.tx) + "</span>" +
        '<button type="button" class="tds-btn tds-btn--secondary tds-btn--sm" data-d3-brh-copy>Copy</button></div>' +
        "</div></div>";
      thread.appendChild(node);
      if (node.scrollIntoView) node.scrollIntoView({ block: "nearest", behavior: "smooth" });
    })();
  }

  /* When the run finishes the chat says so, and nothing else: the score is shown when it is asked for. */
  function postLead(key) {
    if (key !== current.key) return;
    var b = bizNow();
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return;
    var node = document.createElement("section");
    node.className = "d1-turn d1-enter";
    node.innerHTML =
      '<div class="d1-ai d1-block d3-brh-reply">' +
      '<p class="d3-brh-reply__lead">Business Risk Horizon has run for <b>' + esc((b && b.name) || "this business") + "</b>.</p></div>";
    thread.appendChild(node);
    if (node.scrollIntoView) node.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  /* The results are separate transactions: the report as it was run (no Business Risk Horizon) and one for each Business
     Risk Horizon run. Opening one loads the whole report again as that version. land = the tab to leave open
     ("findings" or "risk"); idx = which run; reload = load again even when it is the version already on screen. */
  function showVersion(withBrh, land, reload, idx) {
    var rec = added[current.key];
    if (!rec) return;
    var key = current.key;
    var runIdx = withBrh ? (idx == null || !rec.runs[idx] ? rec.runs.length - 1 : idx) : null;
    var addons = S.get().addons.filter(function (a) { return a !== "risk"; });
    if (withBrh) addons.push("risk");
    if (!!rec.applied === !!withBrh && (!withBrh || rec.viewing === runIdx) && !reload) {
      if (land) R().selectTab(land);
      return;
    }
    rec.applied = withBrh;
    rec.viewing = runIdx;
    S.set({ addons: addons }, "addons");
    R().setTier(rec.tier || S.get().package, addons, { offer: false });
    /* The whole Overview loads again. */
    if (window.D3KybFindings && window.D3KybFindings.invalidate && window.D3KybFindings.render) {
      window.D3KybFindings.invalidate();
      window.D3KybFindings.render(resume, bizNow());
    }
    refreshNext();
    if (withBrh) {
      /* The score tab fills itself when it is first shown; show it for an instant so the chat can quote it. */
      R().selectTab("risk", { silent: true });
      R().selectTab("findings", { silent: true });
      var run = rec.runs[runIdx];
      if (!run.replied) {
        run.replied = true;
        postReply(rec, key, run, runIdx);
      }
      if (land === "risk") R().selectTab("risk");
      else R().selectTab("findings", { silent: true });
    } else {
      R().selectTab("findings", { silent: true });
    }
  }

  function run() {
    var existing = added[current.key];
    if (running || (!offered() && !(existing && existing.runs.length))) return;
    running = true;
    var key = current.key;
    var cta = resume.querySelector("[data-d3-brh-cta]");
    var again = !!(existing && existing.runs.length);
    if (cta) {
      cta.setAttribute("aria-disabled", "true");
      cta.innerHTML = '<span class="d3-kyb-pending__spin" aria-hidden="true"></span>' + (again ? "Running Business Risk Horizon…" : "Adding Business Risk Horizon…");
    }
    window.setTimeout(function () {
      running = false;
      /* A newer report took the stage while this ran: leave it alone. */
      if (key !== current.key) return;
      var rec = added[key] || (added[key] = { runs: [], applied: false, viewing: null });
      var now = new Date();
      rec.runs.push({ tx: uuid(), atLabel: timeLabel(now), score: nextScore(rec) });
      /* The report stays as it was: no tab, no score yet. The suggested actions offer the latest run and another run. */
      postLead(key);
      refreshNext();
      if (window.D3KybFindings && window.D3KybFindings.refresh) window.D3KybFindings.refresh();
    }, RUN_MS);
  }

  document.addEventListener("click", function (event) {
    var t = event.target;
    if (!t || !t.closest) return;
    if (t.closest("[data-d3-brh-run]")) {
      openDialog();
      return;
    }
    if (t.closest("[data-d3-brh-confirm]")) {
      closeDialog();
      /* From the AI panel or from the workspace, the chat shows what was asked. */
      echoAsked();
      run();
      return;
    }
    var menuBtn = t.closest("[data-d3-brh-menu]");
    if (menuBtn) {
      var menu = menuBtn.parentNode.querySelector(".d3-brh-menu");
      var open = menu.hidden;
      closeMenus();
      menu.hidden = !open;
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      return;
    }
    if (!t.closest("[data-d3-brh-split]")) closeMenus();
    var viewBtn = t.closest("[data-d3-brh-view]");
    if (viewBtn) {
      /* Each run is opened as a transaction of its own: the whole report loads again, on the Overview. A score card in
         the chat reloads it even when that run is already on screen. */
      var rec = added[current.key];
      var idxAttr = viewBtn.getAttribute("data-d3-brh-run-idx");
      var card = viewBtn.closest(".d3-brh-reply__card");
      if (idxAttr == null && card) idxAttr = card.getAttribute("data-d3-brh-run-idx");
      /* Picking a run from the menu loads that run even when it is the one already on screen. */
      showVersion(true, (rec && rec.land) || "findings", !!card || viewBtn.hasAttribute("data-d3-brh-menu-pick"), idxAttr == null ? null : Number(idxAttr));
      return;
    }
    var copy = t.closest("[data-d3-brh-copy]");
    if (copy) {
      var id = copy.parentNode.querySelector("[data-d3-brh-txid]");
      try {
        if (navigator.clipboard && id) navigator.clipboard.writeText(id.textContent);
      } catch (e) { /* the demo does not depend on it */ }
      copy.textContent = "Copied";
      window.setTimeout(function () { copy.textContent = "Copy"; }, 1600);
      return;
    }
    if (t.closest('[data-d3-kyb-tab="risk"]')) syncSoon();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenus();
  });

  /* The result card of the verification as it was run: View opens the report without Business Risk Horizon. */
  document.addEventListener("click", function (event) {
    var btn = event.target && event.target.closest && event.target.closest(".d1-report-ready__card button");
    if (!btn) return;
    var rec = added[current.key];
    if (!rec || !rec.applied) return;
    var card = btn.closest(".d1-report-ready__card");
    var nameEl = card && card.querySelector(".d1-report-ready__name");
    var b = bizNow();
    if (!nameEl || !b || nameEl.textContent.trim() !== String(b.name).trim()) return;
    showVersion(false);
  }, true);

  /* The Transactions drawer opens a report without running one (the resume
     path, which skips reveal()), so without this the offer would have no
     report to belong to and never show. */
  var RES = window.D3KybResume;
  if (RES && RES.expandToFullReport) {
    var origExpand = RES.expandToFullReport;
    RES.expandToFullReport = function (session) {
      current.key = "r" + (++seq);
      current.name = (session && session.businessName) || "";
      running = false;
      /* brhRan: the score was run beside this verification, as its own row in
         the Transactions table — so nothing is run here and the chat has
         nothing to say. The report simply offers to show it. The tier comes
         along because the session's package is not this report's. */
      if (session && session.brhRan) {
        added[current.key] = {
          runs: [{ tx: session.brhRan, atLabel: session.date || "", score: baseScore(), replied: true }],
          applied: false,
          viewing: null,
          tier: session.tier || "complete",
          land: "risk"
        };
      }
      return origExpand.apply(this, arguments);
    };
  }

  /* Every reveal is a report of its own. */
  var origReveal = R().reveal;
  R().reveal = function (biz) {
    current.key = "r" + (++seq);
    current.name = (biz && biz.name) || "";
    running = false;
    return origReveal.apply(this, arguments);
  };

  window.D3KybBrhOffer = { buttonHtml: buttonHtml, suggested: suggested, nextHtml: nextHtml, currentScore: currentScore, sync: syncSoon };
})();
