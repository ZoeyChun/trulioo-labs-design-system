/* Demo 3 — KYB surfaces: centered search landing + full report.
   Agent hub → Verify a business: search hero + recent transaction cards.
   Report surface reuses the resume card chrome (.is-live). */
(function () {
  var STORAGE_KEY = "d3-kyb-incomplete";
  var shell = document.querySelector(".d1-shell");
  var workspace = document.querySelector("[data-d3-workspace]");
  if (!shell || !workspace) return;

  var resumeCard = workspace.querySelector("[data-d3-kyb-resume]");
  var freshHint = workspace.querySelector("[data-d3-kyb-fresh]");
  var detail = workspace.querySelector("[data-d3-kyb-detail]");
  var mapEl = workspace.querySelector("[data-d3-kyb-map]");
  var mapNudge = workspace.querySelector("[data-d3-kyb-map-nudge]");
  var paneInput = document.querySelector("[data-d3-pane-input]");

  var DEFAULT_SESSION = {
    incomplete: true,
    businessName: "Acme Inc.",
    status: "Verified",
    country: "United States",
    transactionId: "8c2f4e7a-19bd-4f02-a6c1-77de42915b3a",
    date: "17 Jun 2026, 2:14 PM",
    messages: [
      {
        role: "user",
        text: "Verify Acme Inc. in the United States"
      },
      {
        role: "assistant",
        text: "I found Acme Inc. (Delaware). Registry status is Active and core identity matched. Overview is ready on the right — we can dig into ownership next, or open the full report."
      }
    ]
  };

  function readSession() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      return data && data.incomplete ? data : null;
    } catch (e) {
      return null;
    }
  }

  function writeSession(data) {
    try {
      if (!data) sessionStorage.removeItem(STORAGE_KEY);
      else sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function ensureDemoSession() {
    if (readSession()) return;
    writeSession(DEFAULT_SESSION);
  }

  function hasIncomplete() {
    return !!readSession();
  }

  function setSurface(mode) {
    workspace.setAttribute("data-d3-kyb-surface", mode);
    if (mapEl) mapEl.setAttribute("aria-hidden", mode === "map" ? "false" : "true");
    if (detail) detail.hidden = mode !== "resume" && mode !== "report";
    setLandingVisible(mode === "resume");
    if (mode !== "report" && resumeCard) resumeCard.classList.remove("is-live");
  }

  function updateMapNudge() {
    /* Resume / continue nudge removed — search landing is the entry. */
    if (mapNudge) mapNudge.hidden = true;
  }

  function setResumeVisible(show) {
    workspace.classList.toggle("has-incomplete", !!show);
    if (resumeCard) resumeCard.hidden = !show;
    if (freshHint) freshHint.hidden = true;
  }

  function setLandingVisible(show) {
    var landing = workspace.querySelector("[data-d3-kyb-landing]");
    if (landing) landing.hidden = !show;
  }

  function clearThread() {
    var thread = document.querySelector("[data-d1-thread]");
    if (thread) thread.innerHTML = "";
  }

  function renderMessages(messages) {
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread || !messages || !messages.length) return;
    thread.innerHTML = "";
    messages.forEach(function (msg) {
      var section = document.createElement("section");
      section.className = "d1-turn d1-enter";
      if (msg.role === "user") {
        section.innerHTML = '<div class="d1-user"><p></p></div>';
        section.querySelector("p").textContent = msg.text;
      } else {
        section.innerHTML = '<div class="d1-ai d1-block"><p></p></div>';
        section.querySelector("p").textContent = msg.text;
      }
      thread.appendChild(section);
    });
  }

  function crumbEl() {
    return detail && (detail.querySelector("[data-d3-kyb-crumb]") || detail.querySelector(".d3-workspace__crumb"));
  }

  function renderCrumbs(mode, bizName) {
    var el = crumbEl();
    if (!el) return;
    if (mode === "report") {
      el.innerHTML =
        '<button type="button" class="d3-workspace__crumb-link" data-d3-crumb="home">Home</button>' +
        '<span class="d3-workspace__crumb-sep" aria-hidden="true"> / </span>' +
        '<button type="button" class="d3-workspace__crumb-link" data-d3-crumb="kyb">Verify a business</button>' +
        '<span class="d3-workspace__crumb-sep" aria-hidden="true"> / </span>' +
        '<span class="d3-workspace__crumb-current" data-d3-kyb-crumb-biz></span>';
      var biz = el.querySelector("[data-d3-kyb-crumb-biz]");
      if (biz) biz.textContent = bizName || "Business";
      return;
    }
    el.innerHTML =
      '<button type="button" class="d3-workspace__crumb-link" data-d3-crumb="labs">Labs</button>' +
      '<span class="d3-workspace__crumb-sep" aria-hidden="true"> / </span>' +
      '<span class="d3-workspace__crumb-current">Verify a business</span>';
  }

  function prepareDetailChrome() {
    if (resumeCard) resumeCard.classList.remove("is-live");
    if (!detail) return;
    var detailsBtn = detail.querySelector("[data-d3-kyb-details]");
    if (detailsBtn) detailsBtn.hidden = true;
    var exportBtn = detail.querySelector("[data-d3-kyb-export]");
    if (exportBtn) exportBtn.hidden = true;
    var title = detail.querySelector(".d3-workspace__title");
    if (title) {
      title.hidden = false;
      title.textContent = "Verify a business";
    }
    renderCrumbs("landing");
  }

  /* Agent hub → KYB: left chat + world map (Find Meridian / Start New). */
  function openMapExperience() {
    ensureDemoSession();
    if (window.D3Nav) {
      window.D3Nav.openKybChat({ map: true });
      window.D3Nav.markChatIdle();
    }
    prepareDetailChrome();
    setSurface("map");
    setResumeVisible(false);
    updateMapNudge();
    clearThread();
    document.dispatchEvent(new CustomEvent("d3-kyb:restore-idle"));
    if (paneInput) {
      paneInput.placeholder = "Ask about business verification";
    }
    document.dispatchEvent(new CustomEvent("d3-kyb:map-ready"));
  }

  /* Agent hub → Verify a business: centered search + recent cards. */
  function openResumeExperience() {
    ensureDemoSession();
    if (window.D3Nav) {
      window.D3Nav.openKybChat({ resume: true });
      window.D3Nav.markChatIdle();
    }
    prepareDetailChrome();
    setSurface("resume");
    setResumeVisible(false);
    clearThread();
    if (paneInput) {
      paneInput.placeholder = "Ask about business verification";
    }
    document.dispatchEvent(new CustomEvent("d3-kyb:restore-idle"));
    document.dispatchEvent(new CustomEvent("d3-kyb:resume-ready"));
  }

  /* Expand the incomplete Acme card into the same full-page report chrome
     used after a live verification (surface=report + .is-live). */
  function expandToFullReport(session) {
    session = session || readSession() || DEFAULT_SESSION;
    var name = session.businessName || "Acme Inc.";

    if (window.D3Nav) window.D3Nav.openKybChat({ resume: true });
    setSurface("report");
    setResumeVisible(true);
    if (resumeCard) resumeCard.classList.add("is-live");

    if (detail) {
      var detailsBtn = detail.querySelector("[data-d3-kyb-details]");
      if (detailsBtn) detailsBtn.hidden = false;
      var exportBtn = detail.querySelector("[data-d3-kyb-export]");
      if (exportBtn) exportBtn.hidden = false;
      var title = detail.querySelector(".d3-workspace__title");
      if (title) title.hidden = true;
      renderCrumbs("report", name);
      detail.classList.remove("is-entering");
      void detail.offsetWidth;
      detail.classList.add("is-entering");
    }

    var bizName = resumeCard && resumeCard.querySelector(".d3-workspace__biz-name");
    if (bizName) bizName.textContent = name;
    var bizTag = resumeCard && resumeCard.querySelector(".d1-tag");
    if (bizTag) {
      var status = session.status || "Verified";
      bizTag.textContent = status;
      bizTag.className =
        "d1-tag " +
        (status === "Review"
          ? "d1-tag--review"
          : status === "Flagged"
            ? "d1-tag--negative"
            : "d1-tag--positive");
    }
    if (resumeCard && detail) {
      var metaBlocks = resumeCard.querySelectorAll(".d3-workspace__meta > div:not(.d3-workspace__meta-divider)");
      if (metaBlocks[0]) {
        var countryDd = metaBlocks[0].querySelector("dd");
        if (countryDd) {
          var flag = countryDd.querySelector("img");
          countryDd.textContent = (session.country || "United States") + " ";
          if (flag) countryDd.appendChild(flag);
        }
      }
      if (metaBlocks[1]) {
        var txDd = metaBlocks[1].querySelector("dd");
        if (txDd && session.transactionId) {
          var tx = session.transactionId;
          txDd.title = tx;
          txDd.textContent = tx.length > 18 ? tx.slice(0, 18) + "..." : tx;
        }
      }
      if (metaBlocks[2]) {
        var dateDd = metaBlocks[2].querySelector("dd");
        if (dateDd && session.date) dateDd.textContent = session.date;
      }
    }
  }

  function resumeConversation() {
    var session = readSession() || DEFAULT_SESSION;
    expandToFullReport(session);
    renderMessages(session.messages);
    document.dispatchEvent(new CustomEvent("d3-kyb:park-composer"));
    if (window.D3Nav) window.D3Nav.markChatActive();
    window.setTimeout(function () {
      var input = document.querySelector("[data-d1-input]");
      if (input) input.focus();
    }, 50);
  }

  function startNew() {
    writeSession(null);
    clearThread();
    setResumeVisible(false);
    updateMapNudge();
    if (resumeCard) resumeCard.classList.remove("is-live");
    if (detail) {
      var detailsBtn = detail.querySelector("[data-d3-kyb-details]");
      if (detailsBtn) detailsBtn.hidden = true;
      var exportBtn = detail.querySelector("[data-d3-kyb-export]");
      if (exportBtn) exportBtn.hidden = true;
      var title = detail.querySelector(".d3-workspace__title");
      if (title) title.hidden = false;
      renderCrumbs("landing");
    }
    if (window.D3Nav) {
      window.D3Nav.openKybChat({ map: true, fresh: true });
      window.D3Nav.markChatIdle();
    }
    setSurface("map");
    document.dispatchEvent(new CustomEvent("d3-kyb:restore-idle"));
    if (paneInput) {
      paneInput.placeholder = "Ask about business verification";
      paneInput.focus();
    }
  }

  document.addEventListener("DOMContentLoaded", ensureDemoSession);
  if (document.body.classList.contains("d1-app-ready")) ensureDemoSession();
  else {
    var readyWatch = new MutationObserver(function () {
      if (document.body.classList.contains("d1-app-ready")) {
        ensureDemoSession();
        readyWatch.disconnect();
      }
    });
    readyWatch.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  }

  workspace.querySelectorAll("[data-d3-kyb-resume-btn]").forEach(function (btn) {
    btn.addEventListener("click", resumeConversation);
  });
  workspace.querySelectorAll("[data-d3-kyb-start-new]").forEach(function (btn) {
    btn.addEventListener("click", startNew);
  });

  workspace.querySelectorAll("[data-d3-kyb-recent-card]").forEach(function (card) {
    card.addEventListener("click", function () {
      var status = card.getAttribute("data-status") || "Verified";
      expandToFullReport({
        incomplete: false,
        businessName: card.getAttribute("data-biz") || "Business",
        status: status,
        country: card.getAttribute("data-country") || "United States",
        transactionId: card.getAttribute("data-txid") || "",
        date: card.getAttribute("data-date") || "",
        messages: []
      });
      var tag = resumeCard && resumeCard.querySelector(".d1-tag");
      if (tag) {
        tag.textContent = status;
        tag.className =
          "d1-tag " +
          (status === "Review"
            ? "d1-tag--review"
            : status === "Flagged"
              ? "d1-tag--negative"
              : "d1-tag--positive");
      }
      document.dispatchEvent(new CustomEvent("d3-kyb:park-composer"));
      if (window.D3Nav) window.D3Nav.markChatActive();
    });
  });

  workspace.querySelectorAll("[data-d3-kyb-tab]").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var id = tab.getAttribute("data-d3-kyb-tab");
      workspace.querySelectorAll("[data-d3-kyb-tab]").forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      workspace.querySelectorAll("[data-d3-kyb-panel]").forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-d3-kyb-panel") !== id;
      });
    });
  });

  if (detail) {
    detail.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-d3-crumb]");
      if (!btn || !detail.contains(btn)) return;
      var go = btn.getAttribute("data-d3-crumb");
      if (go === "home") {
        if (window.D3Nav && window.D3Nav.goHome) window.D3Nav.goHome();
        return;
      }
      if (go === "labs") {
        if (window.D3Labs && window.D3Labs.open) window.D3Labs.open();
        else if (window.D3Nav && window.D3Nav.goAgents) window.D3Nav.goAgents();
        return;
      }
      if (go === "kyb") {
        openResumeExperience();
      }
    });
  }

  window.D3KybResume = {
    hasIncomplete: hasIncomplete,
    openMapExperience: openMapExperience,
    openResumeExperience: openResumeExperience,
    renderCrumbs: renderCrumbs,
    ensureDemoSession: ensureDemoSession,
    startNew: startNew,
    resumeConversation: resumeConversation,
    expandToFullReport: expandToFullReport,
    setSurface: setSurface
  };
})();
