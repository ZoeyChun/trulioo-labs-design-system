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
  /* run key -> { tx, at } of the Business Risk Horizon transaction */
  var added = {};

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

  /* Once it has been added, the way to see it: a button in the Overview's suggested actions. Nothing opens by itself. */
  function viewHtml() {
    if (!added[current.key] || added[current.key].applied) return "";
    return (
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md" data-d3-brh-view>' +
      "View Business Risk Horizon Score</button>"
    );
  }

  /* In the AI panel's suggested next actions: the same call as a row, and once it has run, the row that opens the score. */
  function nextHtml() {
    if (added[current.key] && !added[current.key].applied) {
      return (
        '<button type="button" class="d3-ai-next__btn" data-d3-brh-view>' +
        '<span class="d3-ai-next__text">View Business Risk Horizon Score</span>' + ARROW_SVG + "</button>"
      );
    }
    if (added[current.key] || !offered()) return "";
    return (
      '<button type="button" class="d3-ai-next__btn" data-d3-brh-run>' +
      '<span class="d3-ai-next__text">Run Business Risk Horizon Score</span>' + ARROW_SVG + "</button>"
    );
  }

  /* The Business Risk Horizon tab shows its own transaction in the score panel: the label, and the ID with Copy on hover. */
  function syncNote() {
    var rec = added[current.key];
    var panel = resume.querySelector('[data-d3-kyb-panel="risk"]');
    if (!panel) return;
    var old = panel.querySelector(".d3-brh-txn");
    if (old) old.remove();
    var score = panel.querySelector(".kyb-tab-summary__score");
    if (!rec || !score) return;
    score.insertAdjacentHTML(
      "beforeend",
      '<div class="d3-brh-txn" tabindex="0" aria-label="Transaction ID of the Business Risk Horizon run">' +
      '<span class="d3-brh-txn__label text-label-sm-uppercase">Transaction ID' +
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1"/><path d="M10.5 5.5V4a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5"/></svg></span>' +
      '<span class="d3-brh-txn__pop"><span class="d3-brh-txn__value text-body-xs" data-d3-brh-txid>' + esc(rec.tx) + "</span>" +
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
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return;
    var node = document.createElement("section");
    node.className = "d1-turn d1-enter";
    node.innerHTML = '<div class="d1-user"><p></p></div>';
    node.querySelector("p").textContent = ASKED;
    thread.appendChild(node);
    if (node.scrollIntoView) node.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  /* The chat answers with what was added: the score, the key findings and the transaction. */
  function postReply(rec, key) {
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
        '<div class="d3-brh-reply__card">' +
        '<div class="d3-brh-reply__section d3-brh-reply__head"><span class="d3-brh-reply__head-copy">' +
        '<span class="d3-rc__label text-label-sm-uppercase">Business Risk Horizon Score</span>' +
        '<span class="d3-rc__scoreval"><b class="d3-rc__score-num">' + esc(gauge.getAttribute("data-score")) + "</b>" +
        '<span class="d3-rc__score-label d3-rc__score-label--' + esc(tone) + '">' + esc(title.textContent.trim()) + "</span></span></span>" +
        '<button type="button" class="tds-btn tds-btn--primary tds-btn--md" data-d3-brh-view>View</button></div>' +
        '<div class="d3-brh-reply__section"><span class="d3-rc__label text-label-sm-uppercase">Key findings</span>' +
        '<ul class="d3-brh-reply__list">' + list + "</ul></div>" +
        '<div class="d3-brh-reply__section d3-brh-reply__txn"><span class="d3-rc__label text-label-sm-uppercase">Transaction ID</span>' +
        '<span class="d3-brh-reply__txid text-body-xs" data-d3-brh-txid>' + esc(rec.tx) + "</span>" +
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

  /* The two results are two transactions: the report as it was run (no Business Risk Horizon) and the one that includes it.
     Opening either loads the whole report again as that version. land = the tab to leave open ("findings" or "risk"). */
  function showVersion(withBrh, land, reload) {
    var rec = added[current.key];
    if (!rec) return;
    var key = current.key;
    var addons = S.get().addons.filter(function (a) { return a !== "risk"; });
    if (withBrh) addons.push("risk");
    if (!!rec.applied === !!withBrh && !reload) {
      if (land) R().selectTab(land);
      return;
    }
    rec.applied = withBrh;
    S.set({ addons: addons }, "addons");
    R().setTier(rec.tier || S.get().package, addons, { offer: false });
    /* The whole Overview loads again. */
    if (window.D3KybFindings && window.D3KybFindings.invalidate && window.D3KybFindings.render) {
      window.D3KybFindings.invalidate();
      window.D3KybFindings.render(resume, bizNow());
    }
    document.querySelectorAll(".d3-ai-next [data-d3-brh-view]").forEach(function (b) { b.remove(); });
    if (withBrh) {
      /* The score tab fills itself when it is first shown; show it for an instant so the chat can quote it. */
      R().selectTab("risk", { silent: true });
      R().selectTab("findings", { silent: true });
      if (!rec.replied) {
        rec.replied = true;
        postReply(rec, key);
      }
      if (land === "risk") R().selectTab("risk");
      else R().selectTab("findings", { silent: true });
    } else {
      R().selectTab("findings", { silent: true });
    }
  }

  function run() {
    if (running || !offered()) return;
    running = true;
    var key = current.key;
    var cta = resume.querySelector("[data-d3-brh-cta]");
    if (cta) {
      cta.setAttribute("aria-disabled", "true");
      cta.innerHTML = '<span class="d3-kyb-pending__spin" aria-hidden="true"></span>Adding Business Risk Horizon…';
    }
    window.setTimeout(function () {
      running = false;
      /* A newer report took the stage while this ran: leave it alone. */
      if (key !== current.key) return;
      added[key] = { tx: uuid(), at: dayLabel(new Date()), applied: false };
      /* The report stays as it was: no tab, no score yet. The suggested actions now offer the score. */
      postLead(key);
      document.querySelectorAll(".d3-ai-next [data-d3-brh-run]").forEach(function (b) {
        b.removeAttribute("data-d3-brh-run");
        b.setAttribute("data-d3-brh-view", "");
        var text = b.querySelector(".d3-ai-next__text");
        if (text) text.textContent = "View Business Risk Horizon Score";
      });
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
    var viewBtn = t.closest("[data-d3-brh-view]");
    if (viewBtn) {
      /* Either way the report that includes Business Risk Horizon is opened as a transaction of its own: the whole report
         loads again, on the Overview. */
      var rec = added[current.key];
      showVersion(true, (rec && rec.land) || "findings", !!viewBtn.closest(".d3-brh-reply__card"));
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
          tx: session.brhRan,
          at: session.date || "",
          applied: false,
          replied: true,
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

  window.D3KybBrhOffer = { buttonHtml: buttonHtml, viewHtml: viewHtml, nextHtml: nextHtml, sync: syncSoon };
})();
