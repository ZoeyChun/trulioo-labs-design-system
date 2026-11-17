/* Demo 3 — the slow verification: a result that can take up to 24 hours.

   The main prototype always answers in seconds. One business, Brightwater Holdings Ltd., stands in for the
   slow case so the team can review it: for that name (from the AI chat, the search, or the manual form)
   the investigation runs for a few seconds and then turns into a "submitted" state instead of a report:

     right panel   a status card: reference, submitted time, "up to 24 hours", the checks and where they are,
                   and what to do next (the user is free to leave)
     AI chat       a message card with the reference and a way back; the composer is free again
     Recent        the verification shows up as In Progress

   In the product the switch from the progress view to this state happens after about 60 seconds; the demo
   shortens it to a few seconds. About 15 seconds after the submission the result comes back, and the user is told
   (see "ready" below): a toast, a dot on the KYB Verification rail button, the page title, and the chat and
   Recent cards turn into the report. Every other business is untouched. */
(function () {
  "use strict";

  var R = window.D3KybReport;
  var resume = document.querySelector("[data-d3-kyb-resume]");
  var thread = document.querySelector("[data-d1-thread]");
  if (!R || !resume) return;

  var DEMO_MS = 5000; // the product waits ~60s before it stops showing live progress
  /* The result comes back this long after the submission (15 seconds). ?pendingMs=8000 shortens it for a quick look. */
  var RESOLVE_MS = (function () {
    var q = parseInt(new URLSearchParams(window.location.search).get("pendingMs"), 10);
    return q > 0 ? q : 15000;
  })();
  var resolved = {}; // business name (lower case) -> the report is no longer "submitted"
  var jobs = {}; // ref -> { ref, biz, at }
  var seq = 0;
  var origReveal = R.reveal;

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function isSlow(biz) {
    return !!biz && /brightwater/i.test(biz.name || "") && !resolved[String(biz.name).toLowerCase()];
  }

  /* The transaction ID: a UUID, stable for a given business so the same one shows everywhere. */
  function refFor(biz) {
    var h = 2166136261;
    String(biz.name).split("").forEach(function (c) { h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0; });
    var hex = "";
    var s = h;
    while (hex.length < 32) {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      hex += ("00000000" + s.toString(16)).slice(-8);
    }
    hex = hex.slice(0, 32).split("");
    hex[12] = "4";
    hex[16] = "89ab".charAt(parseInt(hex[16], 16) % 4);
    var u = hex.join("");
    return u.slice(0, 8) + "-" + u.slice(8, 12) + "-" + u.slice(12, 16) + "-" + u.slice(16, 20) + "-" + u.slice(20);
  }

  function shortRef(ref) {
    return String(ref).slice(0, 8);
  }

  function stamp(d) {
    var m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function p(n) { return n < 10 ? "0" + n : "" + n; }
    return d.getDate() + " " + m[d.getMonth()] + " " + d.getFullYear() + ", " + p(d.getHours()) + ":" + p(d.getMinutes());
  }

  function sleep(ms) {
    return new Promise(function (r) { window.setTimeout(r, ms); });
  }

  /* ---- right panel ---- */
  var CHECK = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.707 7.293-5.5 5.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414L8.5 10.586l4.793-4.793a1 1 0 0 1 1.414 1.414z"/></svg>';

  function step(state, title, caption, n) {
    return (
      '<li class="tds-stepper__item tds-stepper__item--' + state + '"' + (state === "current" ? ' aria-current="step"' : "") + ">" +
      '<div class="tds-stepper__line" aria-hidden="true"></div>' +
      '<div class="tds-stepper__content"><div class="tds-stepper__label-row">' +
      '<span class="tds-stepper__icon" aria-hidden="true">' + (state === "completed" ? CHECK : '<span class="tds-stepper__icon-badge">' + n + "</span>") + "</span>" +
      '<span class="tds-stepper__title">' + esc(title) + "</span></div>" +
      '<span class="tds-stepper__caption">' + esc(caption) + "</span></div></li>"
    );
  }

  /* The checks and where each one is. */
  function stepRows() {
    /* Real progress can't be followed check by check, so everything after the registry is one step. */
    return (
      step("completed", "Registry lookup", "Business found and confirmed", 1) +
      step("current", "Remaining checks", "Sanctions and watchlists, adverse media, ownership and UBOs are in progress", 2)
    );
  }

  /* A row of the Submission card: same markup as the entity card on the other report heroes. */
  function fact(label, value) {
    return (
      '<div class="d3h-entity__fact"><div class="d3h-entity__fact-text">' +
      '<span class="d3h-entity__fact-label">' + esc(label) + "</span>" +
      '<span class="d3h-entity__fact-value">' + esc(value) + "</span></div></div>"
    );
  }

  /* A spinning ring in the tag's own colour: it reads as work in progress. */
  var IN_PROGRESS_HTML = '<span class="d3-kyb-pending__spin" aria-hidden="true"></span>In Progress';

  function panelHtml(job) {
    var mark = function (t) { return '<mark class="d3h-card__lede-mark d3h-card__lede-mark--intermediate">' + esc(t) + "</mark>"; };
    return (
      '<section class="d3-kyb-pending" data-d3-pending aria-live="polite">' +
      /* Right under the business name and status tag. */
      '<div class="tds-announcement tds-announcement--neutral d3-kyb-pending__note" role="status">' +
      '<span class="tds-announcement__icon" aria-hidden="true"><i class="fa-regular fa-bell"></i></span>' +
      '<div class="tds-announcement__content"><p class="tds-announcement__title">You can leave this page</p>' +
      '<p class="tds-announcement__message">We will notify you here as soon as the report is ready.</p></div></div>' +
      /* The hero, built like the Overview hero: the state on the left, the submission on the right. */
      '<section class="d3h-card d3h-card--hero d3h-card--hero-gauge d3h-card--tone-intermediate" aria-label="Verification submitted"><div class="d3h-card__inner">' +
      '<div class="d3h-hero__main"><div class="d3h-hero__group">' +
      '<div class="d3h-hero__top"><div class="d3h-hero__verdict"><p class="d3h-hero__eyebrow">Verification status</p>' +
      '<h2 class="d3h-card__title d3h-card__title--hero d3h-card__title--intermediate">Verification submitted</h2></div></div>' +
      '<ul class="d3h-bullets"><li>' + mark(job.biz.name) + " is being verified.</li><li>This can take up to " + mark("24 hours") + ".</li></ul></div>" +
      '</div>' +
      /* On the right the checks and where each one is. */
      '<aside class="d3h-entity d3-kyb-pending__checks" aria-label="Checks">' +
      '<p class="d3-kyb-pending__card-title text-label-sm-uppercase">Checks</p>' +
      '<ol class="tds-stepper tds-stepper--vertical d3-kyb-pending__steps" aria-label="Checks">' + stepRows() + "</ol></aside></div></section>" +
      '<div class="d3-kyb-pending__actions">' +
      '<button type="button" class="tds-btn tds-btn--md tds-btn--primary" data-d3-pending-new>Start new verification</button>' +
      '<button type="button" class="tds-btn tds-btn--md tds-btn--secondary" data-d3-pending-recent>View in recent transactions</button></div></section>'
    );
  }

  /* The report view itself carries the status: the name gets an In Progress tag, the tabs step aside and the
     content area holds the submitted state. */
  function setHeaderTag(on) {
    var tag = resume.querySelector(".d3-workspace__biz .d1-tag");
    if (!tag) return;
    if (on) {
      if (!tag.hasAttribute("data-d3-pending-was")) tag.setAttribute("data-d3-pending-was", tag.className + "|" + tag.innerHTML);
      tag.className = "d1-tag d1-tag--review";
      tag.innerHTML = IN_PROGRESS_HTML;
    } else if (tag.hasAttribute("data-d3-pending-was")) {
      tag.removeAttribute("data-d3-pending-was");
    }
  }

  var shownRef = "";

  function showPanel(job) {
    shownRef = job.ref;
    var old = resume.querySelector("[data-d3-pending]");
    if (old) old.remove();
    resume.removeAttribute("data-d3-pending-run");
    resume.setAttribute("data-d3-pending", "");
    var tabs = resume.querySelector(".d3-kyb-tabs");
    if (tabs) tabs.insertAdjacentHTML("beforebegin", panelHtml(job));
    else resume.insertAdjacentHTML("beforeend", panelHtml(job));
    setHeaderTag(true);
  }

  function clearPanel() {
    shownRef = "";
    restoreFollow();
    resume.removeAttribute("data-d3-pending-run");
    resume.removeAttribute("data-d3-pending");
    var old = resume.querySelector("[data-d3-pending]");
    if (old) old.remove();
    setHeaderTag(false);
  }

  /* ---- AI chat ---- */
  /* The live "Investigating" block gives way to the submitted message. */
  function dropProgress() {
    if (!thread) return;
    var tools = thread.querySelectorAll("[data-d1-tools-label]");
    var last = tools[tools.length - 1];
    var block = last && last.closest(".d1-block");
    if (block) block.remove();
  }

  function chatCard(job) {
    if (!thread) return;
    dropProgress();
    /* The progress view may already have drawn a result summary; the submitted card replaces it. */
    Array.prototype.forEach.call(thread.querySelectorAll(".d1-block"), function (blk) {
      if (blk.querySelector(".d1-report-ready[data-d3-rc]")) blk.remove();
    });
    var wrap = document.createElement("div");
    wrap.className = "d1-ai d1-enter d3-kyb-agent-wrap";
    wrap.setAttribute("data-d3-pending-msg", job.ref);
    wrap.innerHTML =
      '<div class="d1-report-ready d3-kyb-agent__action">' +
      '<p class="d1-report-ready__title">Verification submitted. This can take up to 24 hours. You can keep working and I will tell you when it is ready.</p>' +
      '<div class="d1-report-ready__card">' +
      '<span class="d1-report-ready__icon" aria-hidden="true"><i class="fa-regular fa-clock"></i></span>' +
      '<div class="d1-report-ready__meta"><p class="d1-report-ready__name">' + esc(job.biz.name) + "</p>" +
      '<p class="d1-report-ready__addr">In progress</p></div>' +
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md" data-d3-pending-open="' + esc(job.ref) + '">View status</button></div></div>';
    thread.appendChild(wrap);
    var scroller = document.querySelector("[data-d3-chat-thread]") || thread.parentElement;
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }

  /* The composer is not held for 24 hours, and the follow-ups are about what to do next. */
  var NEXT = ["Start a new verification", "Show my recent verifications"];

  function freeComposer() {
    var comp = document.querySelector("[data-d1-composer]");
    if (comp) comp.dispatchEvent(new CustomEvent("d1-composer:state", { detail: { busy: false } }));
    var text = "Start another verification or ask a question";
    Array.prototype.forEach.call(document.querySelectorAll(".d3-chat-pane [data-d1-input], .d3-chat-pane [data-d3-pane-input]"), function (el) {
      el.placeholder = text;
      el.setAttribute("aria-label", text);
    });
    var follow = document.querySelector("[data-d1-follow]");
    if (!follow) return;
    Array.prototype.forEach.call(follow.querySelectorAll("[data-d1-suggest]"), function (btn, i) {
      var span = btn.querySelector("span");
      if (NEXT[i] && span) {
        span.textContent = NEXT[i];
        btn.setAttribute("data-d3-kyb-suggest", NEXT[i]);
        btn.hidden = false;
        btn.style.display = "";
      } else {
        btn.hidden = true;
        btn.style.display = "none";
      }
    });
    follow.classList.add("is-on");
    follow.hidden = false;
  }

  function restoreFollow() {
    var follow = document.querySelector("[data-d1-follow]");
    if (!follow) return;
    Array.prototype.forEach.call(follow.querySelectorAll("[data-d1-suggest]"), function (btn) { btn.hidden = false; btn.style.display = ""; });
  }

  /* ---- Recent transactions ---- */
  function addRecent(job) {
    var grid = document.querySelector(".d3-kyb-recent__grid");
    if (!grid || grid.querySelector('[data-d3-pending-card="' + job.ref + '"]')) return;
    var card = document.createElement("button");
    card.type = "button";
    card.className = "d3-kyb-recent__card";
    card.setAttribute("data-d3-pending-card", job.ref);
    card.innerHTML =
      '<span class="d3-kyb-recent__product">Business Insights</span>' +
      '<span class="d3-kyb-recent__name">' + esc(job.biz.name) + "</span>" +
      '<span class="d3-kyb-recent__role">Transaction ' + esc(shortRef(job.ref)) + "</span>" +
      '<span class="d1-tag d1-tag--review">' + IN_PROGRESS_HTML + "</span>" +
      '<span class="d3-kyb-recent__date">' + esc(stamp(job.at)) + "</span>";
    grid.insertBefore(card, grid.firstChild);
  }

  /* ---- the result comes back ---- */
  var ORIGINAL_TITLE = document.title;
  var toastEl = null;
  var toastTimer = 0;

  function railButton() {
    return document.querySelector('[data-d3-nav="kyb"]');
  }

  function setDot(on) {
    var b = railButton();
    if (b) b.classList.toggle("has-notify", !!on);
  }

  function setTitleBadge(on) {
    document.title = on ? "(1) " + ORIGINAL_TITLE : ORIGINAL_TITLE;
  }

  function hideToast() {
    window.clearTimeout(toastTimer);
    if (toastEl) toastEl.remove();
    toastEl = null;
  }

  /* A soft two-note chime with the banner (Web Audio, no file): quiet and short. The audio context is
     unlocked by the first click or key press on the page, which browsers require before any sound. */
  var audioCtx = null;
  function audio() {
    if (audioCtx) return audioCtx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { audioCtx = new AC(); } catch (e) { audioCtx = null; }
    return audioCtx;
  }
  ["pointerdown", "keydown"].forEach(function (type) {
    document.addEventListener(type, function () {
      var c = audio();
      if (c && c.state === "suspended") c.resume();
    }, { once: false, passive: true });
  });

  function chime() {
    var c = audio();
    if (!c || c.state !== "running") return;
    var t0 = c.currentTime + 0.02;
    [[784, 0], [1175, 0.13]].forEach(function (n) {
      var osc = c.createOscillator();
      var g = c.createGain();
      osc.type = "sine";
      osc.frequency.value = n[0];
      var t = t0 + n[1];
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.07, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
      osc.connect(g);
      g.connect(c.destination);
      osc.start(t);
      osc.stop(t + 0.6);
    });
  }

  function showToast(job, withView) {
    hideToast();
    chime();
    var el = document.createElement("div");
    /* A TDS announcement (info), floating over the page. */
    el.className = "d3-toast tds-announcement tds-announcement--info";
    el.setAttribute("role", "status");
    el.innerHTML =
      '<span class="tds-announcement__icon" aria-hidden="true"><i class="fa-regular fa-bell"></i></span>' +
      '<div class="tds-announcement__content"><p class="tds-announcement__title">' + "Verification ready" + "</p>" +
      '<p class="tds-announcement__message">' + esc(job.biz.name) + " · Transaction " + esc(shortRef(job.ref)) + "</p>" +
      (withView
        ? '<div class="tds-announcement__actions"><button type="button" class="tds-btn tds-btn--primary tds-btn--sm" data-d3-ready-view="' + esc(job.ref) + '">View</button></div>'
        : "") +
      "</div>" +
      '<button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--sm tds-announcement__dismiss" aria-label="Dismiss" data-d3-toast-close>' +
      '<span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button>';
    document.body.appendChild(el);
    toastEl = el;
    toastTimer = window.setTimeout(hideToast, withView ? 20000 : 5000);
  }

  /* The Recent card stops saying "In progress": the result has returned, and for this business it is Verified. */
  function markReady(job) {
    var card = document.querySelector('[data-d3-pending-card="' + job.ref + '"]');
    if (!card) return;
    var tag = card.querySelector(".d1-tag");
    if (tag) {
      tag.className = "d1-tag d1-tag--positive";
      tag.textContent = "Verified";
    }
  }

  /* The submitted card in the chat stays as the record of the submission. Its buttons stop working: the
     report is ready, and its own summary is added below. */
  function disableChatCard(job) {
    var msg = thread && thread.querySelector('[data-d3-pending-msg="' + job.ref + '"]');
    if (!msg) return;
    Array.prototype.forEach.call(msg.querySelectorAll("button"), function (btn) {
      btn.disabled = true;
      btn.setAttribute("aria-disabled", "true");
    });
    msg.classList.add("is-done");
  }

  /* Is the KYB page the one on screen (not Home, Transactions, Labs)? */
  function inKybView() {
    var shell = document.querySelector(".d1-shell");
    return !!shell && shell.getAttribute("data-d3-chat-mode") === "kyb" && shell.getAttribute("data-d3-view") === "chat";
  }

  /* Is this job's submitted page the one on show? */
  function onJobPage(job) {
    return shownRef === job.ref && inKybView() && resume.hasAttribute("data-d3-pending") && !resume.hidden;
  }

  function ready(job) {
    if (job.ready) return;
    job.ready = true;
    markReady(job);
    disableChatCard(job);
    /* The same banner wherever the user is, with an action to open the report. */
    var ws = document.querySelector("[data-d3-workspace]");
    var onMap = inKybView() && !!ws && ws.getAttribute("data-d3-kyb-surface") === "map";
    var watching = onJobPage(job) || onMap;
    showToast(job, true);
    if (watching) {
      /* Looking at the submitted page: it updates by itself into the report, as well as the banner. */
      openReport(job, true);
    } else {
      setDot(true);
    }
    if (document.hidden) setTitleBadge(true);
  }

  /* Opening a finished report re-runs the reveal; the chat already had its investigation, so the progress block
     that reveal would add again is dropped as it appears (and the summary stays). */
  var progressWatch = null;

  function skipProgress() {
    if (!thread) return;
    if (progressWatch) progressWatch.disconnect();
    var before = [];
    Array.prototype.forEach.call(thread.querySelectorAll("[data-d1-tools-label]"), function (el) {
      var blk = el.closest(".d1-block");
      if (blk) before.push(blk);
    });
    function sweep() {
      Array.prototype.forEach.call(thread.querySelectorAll("[data-d1-tools-label]"), function (el) {
        var blk = el.closest(".d1-block");
        if (blk && before.indexOf(blk) === -1) blk.remove();
      });
    }
    progressWatch = new MutationObserver(sweep);
    progressWatch.observe(thread, { childList: true, subtree: true });
    var stop = function () {
      if (progressWatch) progressWatch.disconnect();
      progressWatch = null;
      document.removeEventListener("d3-kyb:report-ready", stop);
    };
    document.addEventListener("d3-kyb:report-ready", stop);
    window.setTimeout(stop, 30000);
  }

  /* Open the finished report for a submitted verification, from wherever the user is. */
  function openReport(job, keepToast) {
    /* Pressing View on the banner while the report is already opening changes nothing but the banner. */
    if (job.opening) {
      hideToast();
      return;
    }
    job.opening = true;
    window.setTimeout(function () { job.opening = false; }, 30000);
    skipProgress();
    resolved[String(job.biz.name).toLowerCase()] = true;
    job.opened = true;
    if (!keepToast) hideToast();
    setDot(false);
    setTitleBadge(false);
    /* From the expanded chat, the panel shrinks back so the report shows on the right. */
    var aiNs = window.D3AiPanel;
    if (aiNs && aiNs.isChatFull && aiNs.isChatFull()) aiNs.setChatFull(false, { animate: true });
    var kyb = railButton();
    var inKyb = inKybView();
    if (kyb && !inKyb) kyb.click();
    window.setTimeout(function () {
      /* The report plays its skeleton again, so it and the new summary in the chat arrive together. */
      if (window.D3KybFindings && window.D3KybFindings.invalidate) window.D3KybFindings.invalidate();
      R.reveal(job.biz, { direct: true });
    }, inKyb ? 0 : 600);
  }

  /* Once the real report has painted, the cards carry its verdict. */
  document.addEventListener("d3-kyb:report-ready", function () {
    Object.keys(jobs).forEach(function (ref) {
      var job = jobs[ref];
      if (!job.opened || job.finalized) return;
      var tag = resume.querySelector(".d3-workspace__biz .d1-tag");
      var cur = R.getCurrent && R.getCurrent();
      if (!tag || !cur || cur.name !== job.biz.name || /verifying/i.test(tag.textContent)) return;
      job.finalized = true;
      job.opening = false;
      markReady(job);
    });
  });

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) setTitleBadge(false);
  });

  /* ---- flow ---- */
  var token = 0;

  async function revealSlow(biz) {
    token += 1;
    var mine = token;
    var job = { ref: refFor(biz), biz: biz, at: new Date() };
    jobs[job.ref] = job;
    resume.setAttribute("data-d3-pending-run", "");
    /* The live progress ends at DEMO_MS, or when it would have finished: a slow verification never flashes the finished report. */
    var finish;
    var early = new Promise(function (r) { finish = r; });
    var stopEarly = function (e) {
      if (mine !== token) return;
      e.stopImmediatePropagation();
      finish();
    };
    window.addEventListener("d3-kyb:report-ready", stopEarly, true);
    origReveal(biz);
    await Promise.race([sleep(DEMO_MS), early]);
    window.removeEventListener("d3-kyb:report-ready", stopEarly, true);
    if (mine !== token) return;
    R.abort();
    showPanel(job);
    chatCard(job);
    addRecent(job);
    freeComposer();
    document.dispatchEvent(new CustomEvent("d3-kyb:pending", { detail: { biz: biz, ref: job.ref } }));
    /* The result comes back about 15 seconds later. */
    job.timer = window.setTimeout(function () { ready(job); }, RESOLVE_MS);
  }

  /* Back to a submitted verification (from the chat card or Recent): open the report surface, then the card. */
  function reopen(job) {
    token += 1;
    var mine = token;
    var onReady = function () {
      document.removeEventListener("d3-kyb:verify-ui-ready", onReady);
      if (mine !== token) return;
      window.setTimeout(function () {
        if (mine !== token) return;
        R.abort();
        showPanel(job);
        /* Looking at it again is not a new run: no progress block, and the chat stays free. */
        dropProgress();
        freeComposer();
        document.dispatchEvent(new CustomEvent("d3-kyb:pending", { detail: { biz: job.biz, ref: job.ref } }));
      }, 120);
    };
    document.addEventListener("d3-kyb:verify-ui-ready", onReady);
    resume.setAttribute("data-d3-pending-run", "");
    origReveal(job.biz);
  }

  R.reveal = function (biz, opts) {
    /* Any other verification cancels a slow one that was still on its short progress view. */
    clearPanel();
    if (isSlow(biz)) return revealSlow(biz);
    token += 1;
    return origReveal(biz, opts);
  };

  document.addEventListener("click", function (event) {
    var t = event.target;
    if (!t.closest) return;
    if (t.closest("[data-d3-toast-close]")) {
      hideToast();
      return;
    }
    var view = t.closest("[data-d3-ready-view]");
    if (view) {
      var vj = jobs[view.getAttribute("data-d3-ready-view")];
      if (vj) openReport(vj);
      return;
    }
    var open = t.closest("[data-d3-pending-open]");
    if (open) {
      var job = jobs[open.getAttribute("data-d3-pending-open")];
      if (job) (job.ready ? openReport(job) : reopen(job));
      return;
    }
    var card = t.closest("[data-d3-pending-card]");
    if (card) {
      var j = jobs[card.getAttribute("data-d3-pending-card")];
      if (j) (j.ready ? openReport(j) : reopen(j));
      return;
    }
    if (t.closest("[data-d3-pending-new], [data-d3-pending-recent]")) {
      var toRecent = !!t.closest("[data-d3-pending-recent]");
      clearPanel();
      var nv = document.querySelector("[data-d3-kyb-new]");
      if (nv) nv.click();
      if (toRecent) {
        window.setTimeout(function () {
          var rec = document.querySelector("[data-d3-kyb-recent]");
          if (rec && rec.scrollIntoView) rec.scrollIntoView({ block: "center", behavior: "smooth" });
        }, 400);
      }
    }
  });

  /* A fresh verification leaves the submitted state. */
  document.addEventListener("d3-kyb:restore-idle", clearPanel);

  window.D3KybPending = {
    isSlow: isSlow,
    demoName: "Brightwater Holdings Ltd.",
    job: function (ref) { return jobs[ref] || null; },
    /* For a quick look: the result comes back now (or after ms). */
    resolveNow: function (ms) {
      Object.keys(jobs).forEach(function (ref) {
        var job = jobs[ref];
        window.clearTimeout(job.timer);
        job.timer = window.setTimeout(function () { ready(job); }, ms || 0);
      });
    }
  };
})();
