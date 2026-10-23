/* Demo 3 — AI panel lab.
   Live Meridian KYB chat on the left. The right rail picks a visual
   treatment for each step. Typing “verify meridian” opens verify;
   choosing a business opens investigating. */
(function () {
  "use strict";

  document.body.classList.add("d1-app-ready", "d3-ai-panel-lab");

  var shell = document.querySelector(".d1-shell");
  if (!shell) return;

  var choice = {
    step: "landing",
    landing: "large",
    verifyOrb: "header",
    verify: "cards",
    investigate: "dots",
    report: "cards"
  };

  var REPORT_NEXT = [
    "Why is this entity high risk?",
    "Who ultimately owns this business?",
    "Has this entity ever traded?"
  ];
  var floatHandle = null;
  var headerOrb = null;
  var selectorCity = "";
  var selectorPage = 0;
  var selectorKey = "";
  var lastBizName = "";

  var STEPS = [
    {
      id: "landing",
      label: "Landing",
      hint: "Where the chat starts.",
      options: [
        { id: "large", label: "Large orb" },
        { id: "float", label: "Floating orb" }
      ]
    },
    {
      id: "verify",
      label: "Verify business",
      hint: "Or type “verify meridian” in the chat.",
      groups: [
        {
          id: "verifyOrb",
          label: "Orb",
          options: [
            { id: "float", label: "Floating orb" },
            { id: "header", label: "Header" }
          ]
        },
        {
          id: "verify",
          label: "Business select",
          options: [
            { id: "cards", label: "Cards" },
            { id: "selector", label: "City selector" }
          ]
        }
      ]
    },
    {
      id: "investigate",
      label: "Investigating",
      hint: "Or choose a business in the cards or city selector.",
      options: [
        { id: "dots", label: "Dots" },
        { id: "bar", label: "Loading bar" }
      ]
    },
    {
      id: "report",
      label: "Report",
      hint: "Shown when the verification finishes.",
      options: [
        { id: "cards", label: "Clickable cards" },
        { id: "list", label: "List" }
      ]
    }
  ];

  function parts() {
    return (window.D3AiPanel && window.D3AiPanel.parts) || {};
  }

  function openLabKyb() {
    if (window.D3Nav && typeof window.D3Nav.openKybChat === "function") {
      window.D3Nav.openKybChat({ resume: true });
    } else {
      shell.setAttribute("data-d3-view", "chat");
      shell.setAttribute("data-d3-chat", "open");
      shell.setAttribute("data-d3-chat-mode", "kyb");
    }
    shell.removeAttribute("data-d3-chat-size");
  }

  function seedLandingCards() {
    var set = document.querySelector('[data-d3-prompt-set="kyb"]');
    if (!set) return;
    var cards = [
      {
        prompt: "What information do I need?",
        agent: "kyb",
        title: "What information do I need?",
        desc: "Run KYB or KYC on a new entity"
      },
      {
        prompt: "Which countries are supported?",
        agent: "kyb",
        title: "Which countries are supported",
        desc: "Find past checks by name or ID"
      },
      {
        prompt: "How does verification work?",
        agent: "kyb",
        title: "How does verification work?",
        desc: "Dig into ownership, alerts, and evidence"
      }
    ];
    var render = parts().promptCard;
    if (typeof render === "function") set.innerHTML = cards.map(render).join("");
    set.hidden = false;
  }

  function paintLandingCopy() {
    var hello = document.querySelector("[data-d3-chat-hello]");
    var sub = document.querySelector("[data-d3-chat-sub]");
    if (hello) hello.textContent = "Hi, I’m your KYB Agent.";
    if (sub) {
      sub.hidden = false;
      sub.textContent = "Let’s find your business.";
    }
    if (choice.step !== "landing") return;
    document.querySelectorAll("[data-d1-input], [data-d3-pane-input]").forEach(function (input) {
      input.setAttribute("placeholder", "Ask about business verification");
    });
  }

  function focusPaneInput() {
    var input =
      document.querySelector(".d3-lab-live [data-d3-pane-input]") ||
      document.querySelector("[data-d1-input]");
    if (!input) return;
    try {
      input.focus({ preventScroll: true });
    } catch (e) {
      try {
        input.focus();
      } catch (e2) {}
    }
  }

  function shortPlace(label) {
    var s = String(label || "");
    if (/united kingdom|\buk\b|britain|england/i.test(s)) return "UK";
    if (/united states|\busa\b|\bu\.s\./i.test(s)) return "US";
    if (/ireland/i.test(s)) return "Ireland";
    if (/singapore/i.test(s)) return "Singapore";
    if (/australia/i.test(s)) return "Australia";
    if (/germany/i.test(s)) return "Germany";
    if (/sweden/i.test(s)) return "Sweden";
    return s.replace(/^in\s+/i, "").trim();
  }

  function titleFromText(text) {
    var place = shortPlace(text);
    if (!place || /meridian/i.test(place) && place.length < 24) {
      var named = String(text || "").match(
        /\b(?:in|from)\s+([A-Za-z][A-Za-z .'-]{1,40})/
      );
      place = named ? shortPlace(named[1]) : shortPlace(text);
    }
    if (!place || /meridian/i.test(place)) return "Verify Meridian";
    return "Verify Meridian in " + place;
  }

  function setTitle(text) {
    var el = document.querySelector("[data-d3-lab-title]");
    if (el && text) el.textContent = text;
  }

  var ICON_SEARCH =
    '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="4.25" stroke="currentColor" stroke-width="1.5"/><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="m10.25 10.25 3 3"/></svg>';
  var ICON_FILE =
    '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M4.5 2.5h5l2 2V13.5h-7z"/><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M9.5 2.5V5h2.5"/></svg>';

  function activityFromLabel(text) {
    var raw = String(text || "").replace(/[.…]+$/g, "").trim();
    if (/pulling business registry|checking registry|business registry/i.test(raw)) {
      return {
        label: "Checking registry",
        icon: "fa-magnifying-glass",
        busy: true,
        bubble: "acting",
        actingLabel: "Checking registry",
        actingIconHtml: ICON_SEARCH
      };
    }
    if (/parsing incorporation|reading ownership|ownership/i.test(raw)) {
      return {
        label: "Reading ownership",
        icon: "fa-magnifying-glass",
        busy: true,
        bubble: "acting",
        actingLabel: "Reading ownership",
        actingIconHtml: ICON_SEARCH
      };
    }
    if (/screening directors|sanctions/i.test(raw)) {
      return {
        label: "Screening sanctions",
        icon: "fa-magnifying-glass",
        busy: true,
        bubble: "acting",
        actingLabel: "Screening sanctions",
        actingIconHtml: ICON_SEARCH
      };
    }
    if (/generating report/i.test(raw)) {
      return {
        label: "Generating report",
        icon: "fa-file-lines",
        busy: true,
        bubble: "acting",
        actingLabel: "Generating report",
        actingIconHtml: ICON_FILE
      };
    }
    if (raw) {
      return {
        label: raw,
        icon: "fa-magnifying-glass",
        busy: true,
        bubble: "thinking"
      };
    }
    return null;
  }

  function readPanelActivity() {
    var thread = document.querySelector("[data-d1-thread]");
    var report = thread && thread.querySelector(".d1-report__title, [data-d1-co]");
    var block = realProgressBlock();
    var toolsLabel = block && block.querySelector("[data-d1-tools-label]");
    var toolsText = toolsLabel ? toolsLabel.textContent.trim() : "";
    var current = block && block.querySelector(".d1-activity__toggle--current [data-d1-activity-label]");
    var currentText = current ? current.textContent.trim() : "";
    if (currentText && !/complete/i.test(toolsText)) {
      var mapped = activityFromLabel(currentText);
      if (mapped) return mapped;
    }
    var dotsHost = document.querySelector("[data-d3-lab-dots]");
    if (
      dotsHost &&
      !dotsHost.hidden &&
      choice.step === "investigating" &&
      choice.investigate === "dots"
    ) {
      var cap = dotsHost.querySelector("[data-d3-lab-dots-caption]");
      var fromDots = activityFromLabel(cap && cap.textContent);
      if (fromDots) return fromDots;
    }
    if (/complete/i.test(toolsText) && !report) {
      return {
        label: "Generating report",
        icon: "fa-file-lines",
        busy: true,
        bubble: "acting",
        actingLabel: "Generating report",
        actingIconHtml: ICON_FILE
      };
    }
    if (choice.step === "report" || (report && choice.step !== "investigating")) {
      var tag = thread && thread.querySelector("[data-d1-report-tag]");
      var review = !!(tag && /review|needs/i.test(tag.textContent || ""));
      return {
        label: review ? "Review findings" : "Report ready",
        icon: review ? "fa-triangle-exclamation" : "fa-circle-check",
        busy: false,
        done: true,
        attention: review,
        bubble: review ? "needs-attention" : "completed"
      };
    }
    if (choice.step === "investigating" && dotDone && !report) {
      return {
        label: "Generating report",
        icon: "fa-file-lines",
        busy: true,
        bubble: "acting",
        actingLabel: "Generating report",
        actingIconHtml: ICON_FILE
      };
    }
    if (thread && thread.querySelector(".d1-thinking, [data-d3-kyb-starting]")) {
      if (choice.step === "investigating") {
        return {
          label: "Checking registry",
          icon: "fa-magnifying-glass",
          busy: true,
          bubble: "acting",
          actingLabel: "Checking registry",
          actingIconHtml: ICON_SEARCH
        };
      }
      return {
        label: "Thinking",
        icon: "fa-magnifying-glass",
        busy: true,
        bubble: "thinking"
      };
    }
    if (choice.step === "investigating") {
      return {
        label: "Checking registry",
        icon: "fa-magnifying-glass",
        busy: true,
        bubble: "acting",
        actingLabel: "Checking registry",
        actingIconHtml: ICON_SEARCH
      };
    }
    return {
      label: "Awaiting input",
      icon: "fa-clock",
      busy: false,
      bubble: "idle"
    };
  }

  function syncHeaderChrome() {
    var activity = readPanelActivity();
    setStatus(activity.label, activity.icon);
    var bubble = {
      state: activity.bubble || "idle",
      actingLabel: activity.actingLabel || "",
      actingIconHtml: activity.actingIconHtml || ""
    };
    if (headerOrb && typeof headerOrb.setMode === "function") {
      headerOrb.setMode(bubble.state);
    }
    if (floatHandle && typeof floatHandle.setMode === "function") {
      floatHandle.setMode(bubble);
    }
  }

  function setStatus(label, icon) {
    var el = document.querySelector("[data-d3-lab-status]");
    var mark = document.querySelector("[data-d3-lab-status-icon]");
    if (el) el.textContent = label;
    if (mark) mark.className = "fa-regular " + icon;
  }

  function orbForStep() {
    if (choice.step === "landing") return choice.landing === "float" ? "float" : "hero";
    return choice.verifyOrb === "float" ? "float" : "header";
  }

  function syncPicker() {
    document.querySelectorAll("[data-lab-pick]").forEach(function (btn) {
      var step = btn.getAttribute("data-lab-pick");
      var value = btn.getAttribute("data-lab-value");
      var on = choice[step] === value;
      btn.classList.toggle("is-selected", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    document.querySelectorAll("[data-lab-step-block]").forEach(function (block) {
      block.classList.toggle("is-current", block.getAttribute("data-lab-step-block") === pickerStep());
    });
    document.querySelectorAll("[data-lab-goto]").forEach(function (btn) {
      var on = btn.getAttribute("data-lab-goto") === pickerStep();
      if (on) btn.setAttribute("aria-current", "step");
      else btn.removeAttribute("aria-current");
    });
  }

  function pickerStep() {
    if (choice.step === "investigating") return "investigate";
    return choice.step;
  }

  function applyChoice() {
    var wasFloat = shell.getAttribute("data-lab-orb") === "float";
    shell.setAttribute("data-lab-step", choice.step);
    shell.setAttribute("data-lab-landing", choice.landing);
    shell.setAttribute("data-lab-verify", choice.verify);
    shell.setAttribute("data-lab-investigate", choice.investigate);
    shell.setAttribute("data-lab-report", choice.report);
    shell.setAttribute("data-lab-orb", orbForStep());
    if (!wasFloat && orbForStep() === "float" && floatHandle) floatHandle.playIntro();
    if (choice.step === "investigating") {
      hideMatchList();
      ensureDots();
      ensureBar();
      if (choice.investigate === "dots") playDots();
      else stopDots();
      document.querySelectorAll(".d3-chat-pane [data-d1-input], .d3-chat-pane [data-d3-pane-input]").forEach(function (input) {
        input.setAttribute("placeholder", "Verification in progress…");
      });
    } else if (choice.step === "report") {
      stopDots();
      hideMatchList();
      document.querySelectorAll(".d3-chat-pane [data-d1-input], .d3-chat-pane [data-d3-pane-input]").forEach(function (input) {
        input.setAttribute("placeholder", "Ask about this verification");
      });
    } else {
      stopDots();
    }
    syncReportView();
    syncHeaderChrome();
    syncPicker();
    syncBack();
    syncMatchView();
    if (choice.step === "landing") paintLandingCopy();
  }

  function syncBack() {
    var back = document.querySelector(".d3-chat-pane [data-d3-chat-back]");
    if (back) back.hidden = choice.step === "landing";
  }

  function showMatchList() {
    document.querySelectorAll(".d3-kyb-cand-panel").forEach(function (el) {
      el.hidden = false;
    });
  }

  function restoreVerifyChrome() {
    var follow = document.querySelector("[data-d1-follow]");
    if (follow) {
      follow.classList.remove("is-on");
      follow.hidden = true;
    }
    document.querySelectorAll(".d1-thinking").forEach(function (node) {
      if (node.parentNode) node.parentNode.removeChild(node);
    });
    document.querySelectorAll(".d3-chat-pane [data-d1-input], .d3-chat-pane [data-d3-pane-input]").forEach(function (input) {
      input.setAttribute("placeholder", "Confirm above, or ask a follow-up");
    });
  }

  function leaveInvestigation() {
    if (window.D3KybReport && typeof window.D3KybReport.abort === "function") {
      window.D3KybReport.abort();
    }
    showMatchList();
    choice.step = "verify";
    applyChoice();
    restoreVerifyChrome();
    window.setTimeout(restoreVerifyChrome, 0);
    window.setTimeout(restoreVerifyChrome, 400);
  }

  function bindBack() {
    var back = document.querySelector(".d3-chat-pane [data-d3-chat-back]");
    if (!back || back.getAttribute("data-lab-bound")) return;
    back.setAttribute("data-lab-bound", "1");
    back.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (choice.step === "report") {
        enterInvestigate();
        return;
      }
      if (choice.step === "investigating") {
        leaveInvestigation();
        return;
      }
      if (choice.step === "verify") resetLanding();
    });
  }

  function resetLanding() {
    if (window.D3Nav && window.D3Nav.markChatIdle) window.D3Nav.markChatIdle();
    var pane = document.querySelector(".d3-chat-pane");
    if (pane) pane.classList.remove("is-active");
    choice.step = "landing";
    setTitle("Verify Meridian");
    applyChoice();
    paintLandingCopy();
  }

  function restartExperience() {
    if (window.D3KybReport && typeof window.D3KybReport.abort === "function") {
      window.D3KybReport.abort();
    }
    stopDots();
    dotDone = false;
    dotStep = 0;
    selectorCity = "";
    selectorPage = 0;
    selectorKey = "";
    lastBizName = "";
    var thread = document.querySelector("[data-d1-thread]");
    if (thread) thread.innerHTML = "";
    document.querySelectorAll(".d1-thinking").forEach(function (node) {
      if (node.parentNode) node.parentNode.removeChild(node);
    });
    var follow = document.querySelector("[data-d1-follow]");
    if (follow) {
      follow.classList.remove("is-on");
      follow.hidden = true;
    }
    document.querySelectorAll("[data-d3-lab-next], [data-d3-kyb-next]").forEach(function (el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    resetLanding();
    if (floatHandle && typeof floatHandle.setMode === "function") {
      floatHandle.setMode({ state: "idle" });
    }
    if (headerOrb && typeof headerOrb.setMode === "function") {
      headerOrb.setMode("idle");
    }
    seedLandingCards();
    focusPaneInput();
  }

  function goVerify(text) {
    choice.step = "verify";
    setTitle(titleFromText(text || "Verify Meridian"));
    applyChoice();
  }

  function goInvestigate() {
    choice.step = "investigating";
    applyChoice();
  }

  function activateThread() {
    document.dispatchEvent(new CustomEvent("d3-kyb:park-composer"));
    if (window.D3Nav && window.D3Nav.markChatActive) window.D3Nav.markChatActive();
    var pane = document.querySelector(".d3-chat-pane");
    if (pane) pane.classList.add("is-active");
  }

  function seedMatchList() {
    var map = window.D3KybMapSearch;
    var agent = window.D3KybAgent;
    if (!map || !agent || typeof map.findBusinesses !== "function" || typeof agent.showMatches !== "function") {
      return false;
    }
    var matches = map.findBusinesses("Meridian", { country: "United Kingdom", cc: "GB" });
    if (!matches || !matches.length) return false;
    activateThread();
    agent.showMatches(matches, "Meridian", { country: "United Kingdom", cc: "GB" });
    return true;
  }

  function enterVerify() {
    if (!document.querySelector("[data-d1-thread] .ai-cands")) {
      seedMatchList();
    } else {
      activateThread();
      showMatchList();
    }
    choice.step = "verify";
    setTitle("Verify Meridian in UK");
    applyChoice();
    syncMatchView();
    document.querySelectorAll(".d3-chat-pane [data-d1-input], .d3-chat-pane [data-d3-pane-input]").forEach(function (input) {
      input.setAttribute("placeholder", "Select a match or refine your search");
    });
  }

  function hideMatchList() {
    document.querySelectorAll(".d3-kyb-cand-panel").forEach(function (el) {
      el.hidden = true;
    });
  }

  function enterInvestigate() {
    setTitle("Verify Meridian in UK");
    activateThread();
    hideMatchList();
    goInvestigate();
  }

  function reportBiz() {
    var map = window.D3KybMapSearch;
    if (map && typeof map.findById === "function") {
      return map.findById("uk-apex") || null;
    }
    return null;
  }

  function formatReportReg(reg) {
    var raw = String(reg || "").trim();
    if (!raw) return "";
    var digits = raw.match(/(\d[\d\s-]*\d|\d+)/);
    if (digits) return "Reg. " + digits[1].replace(/\s+/g, "");
    return raw.replace(/^(companies house|reg\.?)\s*/i, "Reg. ");
  }

  function fillReportReady(node, biz) {
    if (!node || !biz) return;
    var name = node.querySelector("[data-d1-report-ready-name]");
    var addr = node.querySelector("[data-d1-report-ready-addr]");
    var reg = node.querySelector("[data-d1-report-ready-reg]");
    if (name) name.textContent = biz.name || name.textContent;
    if (addr) addr.textContent = biz.addr || biz.address || addr.textContent;
    if (reg) {
      var formatted = formatReportReg(biz.reg || biz.regNumber || "");
      if (formatted) reg.textContent = formatted;
    }
  }

  function seedReportCard() {
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return null;
    var existing = thread.querySelector("[data-d1-co], .d1-report__title");
    if (existing) {
      var existingNode = existing.closest("section, .d1-block") || existing;
      fillReportReady(existingNode, reportBiz());
      return existingNode;
    }
    var tpl = document.querySelector('[data-d1-tpl="report"]');
    if (!tpl || !tpl.content.firstElementChild) return null;
    var biz = reportBiz() || {
      name: "Meridian Apex Consulting Ltd.",
      riskLevel: "high",
      addr: "Suite 400, 1 King Street, London EC2V 8AU",
      reg: "Companies House 08842190",
      risks: [{ label: "Virtual office footprint" }]
    };
    var node = tpl.content.firstElementChild.cloneNode(true);
    var title = node.querySelector("[data-d1-co]");
    if (title) title.textContent = biz.name;
    var tag = node.querySelector("[data-d1-report-tag]");
    if (tag) {
      tag.textContent = biz.riskLevel === "high" ? "Needs review" : "Verified";
      tag.className =
        "d1-tag " + (biz.riskLevel === "high" ? "d1-tag--review" : "d1-tag--positive");
    }
    var sumA = node.querySelector("[data-d1-sum-a]");
    if (sumA) {
      sumA.textContent =
        "Meridian Apex Consulting is a real, active UK company, but I wouldn’t onboard it yet.";
    }
    var sumB = node.querySelector("[data-d1-sum-b]");
    if (sumB) {
      sumB.hidden = false;
      sumB.textContent =
        "It has 0 employees, £1 in capital, and a virtual office address. I also found 3 connections to your other transactions that change the picture.";
    }
    fillReportReady(node, biz);
    thread.appendChild(node);
    return node;
  }

  function syncReportView() {
    var follow = document.querySelector("[data-d1-follow]");
    if (follow) {
      follow.classList.remove("is-on");
      follow.hidden = true;
    }
    document.querySelectorAll("[data-d3-kyb-next]").forEach(function (el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    if (choice.step !== "report") {
      var stale = document.querySelector("[data-d3-lab-next]");
      if (stale && stale.parentNode) stale.parentNode.removeChild(stale);
      return;
    }
    seedReportCard();
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return;
    var host = thread.querySelector("[data-d3-lab-next]");
    if (!host) {
      host = document.createElement("div");
      host.setAttribute("data-d3-lab-next", "");
      thread.appendChild(host);
    }
    var mode = choice.report === "list" ? "list" : "cards";
    var sig = mode + "|" + REPORT_NEXT.join("|");
    host.className = "d3-lab-next d3-lab-next--" + mode;
    host.setAttribute("role", "group");
    host.setAttribute("aria-label", "Continue your investigation");
    if (host.getAttribute("data-sig") === sig) return;
    host.setAttribute("data-sig", sig);
    var arrow =
      '<span class="d3-lab-next__arrow" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M3 8h10m0 0-3.5-3.5M13 8l-3.5 3.5"/></svg></span>';
    host.innerHTML =
      '<p class="d3-lab-next__label">Continue your investigation</p><div class="d3-lab-next__list">' +
      REPORT_NEXT.map(function (q) {
        return (
          '<button type="button" class="d3-lab-next__btn" data-d3-kyb-suggest="' +
          esc(q) +
          '"><span class="d3-lab-next__text">' +
          esc(q) +
          "</span>" +
          arrow +
          "</button>"
        );
      }).join("") +
      "</div>";
    var pane = document.querySelector("[data-d3-chat-thread]");
    var scroller = pane || thread.parentElement;
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }

  function enterReport() {
    setTitle("Verify Meridian in UK");
    activateThread();
    hideMatchList();
    stopDots();
    if (window.D3KybReport && typeof window.D3KybReport.abort === "function") {
      /* Keep a finished report when one exists; abort only stops an in-flight reveal. */
    }
    choice.step = "report";
    applyChoice();
  }

  function enterStep(step) {
    if (step === "landing") {
      resetLanding();
      return;
    }
    if (step === "verify") {
      enterVerify();
      return;
    }
    if (step === "investigate") {
      enterInvestigate();
      return;
    }
    if (step === "report") enterReport();
  }

  function dotConfig() {
    return {
      style: "twinkle",
      formation: "grid",
      spacing: 11,
      size: 1.7,
      sizeVary: 0.4,
      color: "#c5cec8",
      opacity: 0.85,
      shape: "blobs",
      shapeScale: 0.9,
      shapeX: 0.5,
      shapeY: 0.48,
      feather: 0.42,
      clear: 0,
      clearSize: 0,
      fade: 1,
      intensity: 1,
      speed: 1.1,
      angle: 20
    };
  }

  var dotField = null;
  var dotToken = 0;
  var dotStep = 0;
  var dotDone = false;
  var DOT_STEPS = [
    { label: "Pulling business registry records…", ms: 1100 },
    { label: "Parsing incorporation and ownership…", ms: 1200 },
    { label: "Screening directors against OFAC, UN, and EU…", ms: 1300 }
  ];

  function stopDots() {
    dotToken += 1;
  }

  function setDotCaption(text) {
    var cap = document.querySelector("[data-d3-lab-dots-caption]");
    if (!cap || cap.textContent === text) return;
    cap.textContent = text;
    cap.classList.remove("is-blink");
    void cap.offsetWidth;
    cap.classList.add("is-blink");
    syncHeaderChrome();
  }

  function realProgressBlock() {
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return null;
    var blocks = thread.querySelectorAll(".d1-block");
    for (var i = 0; i < blocks.length; i += 1) {
      if (blocks[i].hasAttribute("data-d3-lab-bar")) continue;
      if (blocks[i].querySelector(".d1-progress")) return blocks[i];
    }
    return null;
  }

  function investigationPending() {
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return false;
    return !!(
      thread.querySelector("[data-d1-confirm-card]") ||
      thread.querySelector("[data-d3-kyb-starting]") ||
      thread.querySelector(".d1-thinking") ||
      realProgressBlock()
    );
  }

  function playDots() {
    var host = document.querySelector("[data-d3-lab-dots]");
    if (dotDone) {
      if (host) host.hidden = true;
      return;
    }
    var token = ++dotToken;
    if (host) {
      host.hidden = false;
      var cap = host.querySelector("[data-d3-lab-dots-caption]");
      if (cap) cap.classList.add("is-blink");
    }

    function alive() {
      return token === dotToken && choice.step === "investigating" && choice.investigate === "dots";
    }

    function hide() {
      dotDone = true;
      var node = document.querySelector("[data-d3-lab-dots]");
      if (node) node.hidden = true;
    }

    function frame() {
      if (!alive()) return;
      var block = realProgressBlock();
      if (block) {
        var toolsLabel = block.querySelector("[data-d1-tools-label]");
        var done = toolsLabel && /complete/i.test(toolsLabel.textContent || "");
        if (done) {
          hide();
          return;
        }
        var current = block.querySelector(".d1-activity__toggle--current [data-d1-activity-label]");
        var label = current && current.textContent.trim();
        setDotCaption(label || DOT_STEPS[Math.min(dotStep, DOT_STEPS.length - 1)].label);
        window.setTimeout(frame, 200);
        return;
      }
      if (dotStep >= DOT_STEPS.length) {
        if (investigationPending()) {
          window.setTimeout(frame, 200);
          return;
        }
        hide();
        return;
      }
      setDotCaption(DOT_STEPS[dotStep].label);
      var wait = DOT_STEPS[dotStep].ms;
      window.setTimeout(function () {
        if (token !== dotToken) return;
        dotStep += 1;
        frame();
      }, wait);
    }

    frame();
  }

  function businessName() {
    if (lastBizName) return lastBizName;
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return "this business";
    var card = thread.querySelector(".ai-cand__name");
    if (card && card.textContent.trim()) return card.textContent.trim();
    return "this business";
  }

  function ensureDots() {
    if (choice.investigate !== "dots" || choice.step !== "investigating") return;
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return;
    var host = thread.querySelector("[data-d3-lab-dots]");
    if (!host) {
      host = document.createElement("div");
      host.className = "d3-lab-dots";
      host.setAttribute("data-d3-lab-dots", "");
      host.innerHTML =
        '<p class="d3-lab-dots__caption" data-d3-lab-dots-caption></p>' +
        '<canvas class="d3-lab-dots__canvas" width="240" height="240" aria-hidden="true"></canvas>';
      thread.appendChild(host);
    }
    var tools = thread.querySelector(".d1-progress");
    var block = tools && tools.closest("section, .d1-block");
    if (block && block.parentNode && host.nextSibling !== block) {
      block.parentNode.insertBefore(host, block);
    }
    var canvas = host.querySelector("canvas");
    if (!canvas || !window.TruDotField) return;
    if (!canvas.getAttribute("data-mounted")) {
      dotField = window.TruDotField.mount(canvas, dotConfig());
      canvas.setAttribute("data-mounted", "1");
      return;
    }
    if (dotField && typeof dotField.set === "function") {
      dotField.set({ style: "twinkle", intensity: 1, speed: 1.1 });
    }
  }

  function ensureBar() {
    if (choice.investigate !== "bar" || choice.step !== "investigating") return;
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return;
    var preview = thread.querySelector("[data-d3-lab-bar]");
    var progress = thread.querySelector(".d1-progress");
    if (progress && (!preview || !preview.contains(progress))) {
      if (preview && preview.parentNode) preview.parentNode.removeChild(preview);
      return;
    }
    if (progress) return;
    var toolsTpl = document.querySelector('[data-d1-tpl="tools"]');
    if (!toolsTpl || !toolsTpl.content.firstElementChild) return;
    var tools = toolsTpl.content.firstElementChild.cloneNode(true);
    tools.setAttribute("data-d3-lab-bar", "");
    var pct = tools.querySelector(".d1-progress__pct");
    var fill = tools.querySelector(".d1-progress__fill");
    if (pct) pct.textContent = "33%";
    if (fill) fill.style.width = "33%";
    var steps = tools.querySelector("[data-d1-steps]");
    var activityTpl = document.querySelector('[data-d1-tpl="activity"]');
    if (steps && activityTpl && activityTpl.content.firstElementChild) {
      var row = activityTpl.content.firstElementChild.cloneNode(true);
      var label = row.querySelector("[data-d1-activity-label]");
      var detail = row.querySelector("[data-d1-activity-detail]");
      if (label) label.textContent = "Business registry";
      if (detail) detail.textContent = "Pulling records for " + businessName();
      steps.appendChild(row);
    }
    thread.appendChild(tools);
  }

  function ensureChrome() {
    var head = document.querySelector(".d3-chat-pane__head");
    var empty = document.querySelector(".d3-chat-pane__empty");
    if (!head || head.querySelector("[data-d3-lab-float]")) return;
    var tools = head.querySelector(".d3-chat-pane__tools");

    var floatEl = document.createElement("div");
    floatEl.className = "d3-lab-float";
    floatEl.setAttribute("data-d3-lab-float", "");

    var ident = document.createElement("div");
    ident.className = "d3-lab-ident";
    ident.setAttribute("data-d3-lab-ident", "");
    ident.innerHTML =
      '<span class="d3-lab-ident__orb" data-d3-lab-ident-orb></span>' +
      '<span class="d3-lab-ident__copy">' +
      '<span class="d3-lab-ident__title" data-d3-lab-title>Verify Meridian</span>' +
      '<span class="d3-lab-ident__status">' +
      '<i class="fa-regular fa-clock" data-d3-lab-status-icon aria-hidden="true"></i>' +
      '<span data-d3-lab-status>Awaiting input</span>' +
      "</span></span>";

    if (tools) {
      head.insertBefore(floatEl, tools);
      head.insertBefore(ident, tools);
    } else {
      head.appendChild(floatEl);
      head.appendChild(ident);
    }

    var hero = document.createElement("div");
    hero.className = "d3-lab-hero";
    hero.setAttribute("data-d3-lab-hero", "");
    if (empty) {
      var block = empty.querySelector("[data-d3-chat-hello]");
      var wrap = block && block.parentNode;
      if (wrap && wrap.parentNode === empty) empty.insertBefore(hero, wrap);
      else empty.insertBefore(hero, empty.firstChild);
    }

    if (window.TruAIFloat) {
      floatHandle = window.TruAIFloat.mount(floatEl);
      if (typeof window.TruAIFloat.mountHeader === "function") {
        headerOrb = window.TruAIFloat.mountHeader(ident.querySelector("[data-d3-lab-ident-orb]"));
      }
    }
    if (window.TruAIBubble) {
      window.TruAIBubble.mountPanel(hero, { state: "idle" });
      if (!headerOrb) {
        window.TruAIBubble.mountPanel(ident.querySelector("[data-d3-lab-ident-orb]"), { state: "idle" });
      }
    }
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function cityLabel(city) {
    var label = String(city || "").split(",")[0].trim();
    return label || "Other";
  }

  function readMatches(panel) {
    var map = window.D3KybMapSearch;
    return Array.prototype.map.call(panel.querySelectorAll(".ai-cand"), function (card) {
      var id = card.getAttribute("data-d3-kyb-cand") || card.getAttribute("data-id") || "";
      var biz = map && typeof map.findById === "function" ? map.findById(id) : null;
      var nameEl = card.querySelector(".ai-cand__name");
      return {
        id: id,
        name: nameEl ? nameEl.textContent.trim() : "",
        city: biz && biz.city ? biz.city : "",
        addr: (biz && (biz.addr || biz.city)) || "",
        reg: (biz && biz.reg) || ""
      };
    });
  }

  function syncMatchView() {
    var panels = document.querySelectorAll(".d3-kyb-cand-panel");
    Array.prototype.forEach.call(panels, function (panel) {
      var cands = panel.querySelector(".ai-cands");
      var host = panel.querySelector("[data-d3-lab-selector]");
      if (choice.verify !== "selector" || !cands) {
        if (host && host.parentNode) host.parentNode.removeChild(host);
        return;
      }

      var matches = readMatches(panel);
      var ids = matches
        .map(function (match) {
          return match.id;
        })
        .join("|");
      if (ids !== selectorKey) {
        selectorKey = ids;
        selectorCity = "";
        selectorPage = 0;
      }

      var cityMap = {};
      matches.forEach(function (match) {
        var label = cityLabel(match.city);
        if (!cityMap[label]) cityMap[label] = { label: label, n: 0 };
        cityMap[label].n += 1;
      });
      var chips = Object.keys(cityMap).map(function (key) {
        return cityMap[key];
      });
      chips.sort(function (a, b) {
        if (b.n !== a.n) return b.n - a.n;
        return a.label.localeCompare(b.label);
      });

      var filtered = selectorCity
        ? matches.filter(function (match) {
            return cityLabel(match.city) === selectorCity;
          })
        : matches.slice();
      var pages = Math.max(1, Math.ceil(filtered.length / 3) || 1);
      if (selectorPage > pages - 1) selectorPage = Math.max(0, pages - 1);
      if (selectorPage < 0) selectorPage = 0;
      var start = selectorPage * 3;
      var slice = filtered.slice(start, start + 3);
      var lead = panel.querySelector(".ai-reply__lead");
      var quoted = lead && String(lead.textContent || "").match(/[“"]([^”"]+)[”"]/);
      var query = quoted ? quoted[1] : "Meridian";
      var from = filtered.length ? start + 1 : 0;
      var to = start + slice.length;
      var sig = [ids, selectorCity, selectorPage, query, from, to, filtered.length].join("~");

      if (!host) {
        host = document.createElement("div");
        host.className = "d3-lab-selector";
        host.setAttribute("data-d3-lab-selector", "");
        panel.appendChild(host);
      }
      if (host.getAttribute("data-sig") === sig) return;
      host.setAttribute("data-sig", sig);

      var chipHtml = chips
        .map(function (chip) {
          var on = chip.label === selectorCity;
          return (
            '<button type="button" class="d3-lab-selector__chip' +
            (on ? " is-on" : "") +
            '" data-d3-lab-city="' +
            esc(chip.label) +
            '">' +
            esc(chip.label) +
            '<span class="d3-lab-selector__count">' +
            chip.n +
            "</span></button>"
          );
        })
        .join("");

      var rowHtml = slice
        .map(function (row) {
          return (
            '<button type="button" class="d3-lab-selector__row" data-d3-kyb-cand="' +
            esc(row.id) +
            '" data-id="' +
            esc(row.id) +
            '">' +
            '<span class="d3-lab-selector__mark" aria-hidden="true"><i class="fa-regular fa-building"></i></span>' +
            '<span class="d3-lab-selector__copy">' +
            '<span class="ai-cand__name">' +
            esc(row.name) +
            "</span>" +
            '<span class="d3-lab-selector__addr">' +
            esc(row.addr) +
            "</span>" +
            '<span class="d3-lab-selector__reg">' +
            esc(row.reg) +
            "</span></span></button>"
          );
        })
        .join("");
      if (!slice.length) rowHtml = '<p class="d3-lab-selector__empty">No businesses in this city.</p>';

      host.innerHTML =
        '<p class="d3-lab-selector__title">Which “' +
        esc(query) +
        "” should I investigate?</p>" +
        '<div class="d3-lab-selector__body">' +
        '<div class="d3-lab-selector__chips">' +
        chipHtml +
        "</div>" +
        '<div class="d3-lab-selector__rows">' +
        rowHtml +
        "</div>" +
        '<div class="d3-lab-selector__pager">' +
        "<span>" +
        (filtered.length ? from + "-" + to + " of " + filtered.length : "0 of 0") +
        "</span>" +
        '<span class="d3-lab-selector__pages">' +
        '<button type="button" class="d3-lab-selector__page" data-d3-lab-page="prev"' +
        (selectorPage <= 0 ? " disabled" : "") +
        ' aria-label="Previous businesses"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10 3 5 8l5 5"/></svg></button>' +
        '<button type="button" class="d3-lab-selector__page" data-d3-lab-page="next"' +
        (selectorPage >= pages - 1 ? " disabled" : "") +
        ' aria-label="Next businesses"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M6 3l5 5-5 5"/></svg></button>' +
        "</span></div></div>";
    });
  }

  function buildPicker() {
    var host = document.querySelector("[data-d3-lab-gallery]");
    if (!host) return;
    var html =
      '<div class="d3-lab-picker">' +
      '<div class="d3-lab-picker__top">' +
      '<p class="d3-lab-picker__title">Panel variations</p>' +
      '<div class="d3-lab-picker__actions">' +
      '<a class="d3-lab-picker__link" href="https://zoeychun.github.io/trulioo-labs-design-system/portal-2.0/Misc/Loader/experiments/truai-bubble/" target="_blank" rel="noopener noreferrer">Bubble animation <svg class="d3-lab-picker__ext" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9 0.75C9 0.34375 9.34375 0 9.75 0H15.25C15.6562 0 16 0.34375 16 0.75V6.25C16 6.65625 15.6562 7 15.25 7C14.8438 7 14.5 6.65625 14.5 6.25V2.5625L7.28125 9.78125C7 10.0625 6.53125 10.0625 6.21875 9.78125C5.9375 9.5 5.9375 9 6.21875 8.71875L13.4375 1.5H9.75C9.34375 1.5 9 1.15625 9 0.75ZM2.5 3H5.25C5.65625 3 6 3.34375 6 3.75C6 4.15625 5.65625 4.5 5.25 4.5H2.5C1.9375 4.5 1.5 4.9375 1.5 5.5V13.5C1.5 14.0625 1.9375 14.5 2.5 14.5H10.5C11.0625 14.5 11.5 14.0625 11.5 13.5V10.75C11.5 10.3438 11.8438 10 12.25 10C12.6562 10 13 10.3438 13 10.75V13.5C13 14.875 11.875 16 10.5 16H2.5C1.125 16 0 14.875 0 13.5V5.5C0 4.125 1.125 3 2.5 3Z" fill="currentColor"/></svg></a>' +
      '<button type="button" class="d3-lab-picker__restart" data-lab-restart>Restart</button>' +
      "</div>" +
      "</div>" +
      '<p class="d3-lab-picker__hint">Pick treatments for each step, then use Go to this step to open that view. Settings stay selected when you move around.</p>';

    STEPS.forEach(function (step, index) {
      html +=
        '<section class="d3-lab-picker__step" data-lab-step-block="' +
        step.id +
        '">' +
        '<div class="d3-lab-picker__head">' +
        '<h3 class="d3-lab-picker__label">' +
        (index + 1) +
        " · " +
        step.label +
        "</h3>" +
        '<button type="button" class="d3-lab-picker__goto" data-lab-goto="' +
        step.id +
        '">Go to this step</button>' +
        "</div>" +
        '<p class="d3-lab-picker__note">' +
        step.hint +
        "</p>";
      var groups = step.groups || [{ id: step.id, label: "", options: step.options }];
      groups.forEach(function (group) {
        html += '<div class="d3-lab-picker__group">';
        if (group.label) {
          html += '<p class="d3-lab-picker__group-label">' + group.label + "</p>";
        }
        html +=
          '<div class="d3-lab-picker__options" role="group" aria-label="' +
          (group.label || step.label) +
          '">';
        group.options.forEach(function (opt) {
          html +=
            '<button type="button" class="d3-lab-picker__opt" data-lab-pick="' +
            group.id +
            '" data-lab-value="' +
            opt.id +
            '">' +
            opt.label +
            "</button>";
        });
        html += "</div></div>";
      });
      html += "</section>";
    });

    html += "</div>";
    host.innerHTML = html;

    host.addEventListener("click", function (event) {
      var restart = event.target.closest("[data-lab-restart]");
      if (restart && host.contains(restart)) {
        restartExperience();
        return;
      }
      var jump = event.target.closest("[data-lab-goto]");
      if (jump && host.contains(jump)) {
        enterStep(jump.getAttribute("data-lab-goto"));
        return;
      }
      var btn = event.target.closest("[data-lab-pick]");
      if (!btn || !host.contains(btn)) return;
      var key = btn.getAttribute("data-lab-pick");
      var value = btn.getAttribute("data-lab-value");
      if (!choice.hasOwnProperty(key)) return;
      if (key === "investigate" && value === "dots" && choice.investigate !== "dots") {
        dotDone = false;
        dotStep = 0;
      }
      choice[key] = value;
      if (key === "landing" && value === "float") choice.verifyOrb = "float";
      if (key === "verifyOrb" && value === "float") choice.landing = "float";
      applyChoice();
    });
  }

  function onUserText(text) {
    text = text || "";
    if (/verify\s+meridian\b/i.test(text)) {
      goVerify(text);
      return;
    }
    if (choice.step !== "verify" && choice.step !== "investigating") return;
    var place = shortPlace(text);
    if (place && place !== text.trim()) setTitle("Verify Meridian in " + place);
  }

  function watchThread() {
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return;
    var seenUsers = 0;
    var syncing = false;
    var observer = new MutationObserver(function () {
      if (syncing) return;
      syncing = true;
      try {
        var users = thread.querySelectorAll(".d1-user p");
        if (users.length > seenUsers) {
          var text = users[users.length - 1].textContent || "";
          seenUsers = users.length;
          onUserText(text);
        }
        if (!users.length) seenUsers = 0;
        if (choice.step === "investigating") ensureDots();
        syncMatchView();
        syncHeaderChrome();
      } finally {
        syncing = false;
      }
    });
    observer.observe(thread, { childList: true, subtree: true });
  }

  function watchFlow() {
    document.addEventListener("d3-kyb:report-ready", function () {
      choice.step = "report";
      applyChoice();
    });
    document.addEventListener(
      "d1-composer:submit",
      function (event) {
        var detail = event.detail || {};
        onUserText(detail.text || "");
      },
      true
    );
    document.addEventListener(
      "d3-chat:send",
      function (event) {
        var detail = event.detail || {};
        onUserText(detail.text || "");
      },
      true
    );

    document.addEventListener(
      "click",
      function (event) {
        var cityBtn = event.target.closest("[data-d3-lab-city]");
        if (cityBtn) {
          event.preventDefault();
          event.stopPropagation();
          var label = cityBtn.getAttribute("data-d3-lab-city") || "";
          selectorCity = selectorCity === label ? "" : label;
          selectorPage = 0;
          syncMatchView();
          return;
        }
        var pageBtn = event.target.closest("[data-d3-lab-page]");
        if (pageBtn) {
          event.preventDefault();
          event.stopPropagation();
          if (pageBtn.disabled) return;
          selectorPage += pageBtn.getAttribute("data-d3-lab-page") === "next" ? 1 : -1;
          syncMatchView();
          return;
        }

        var country = event.target.closest("[data-d3-kyb-country-pick]");
        if (country) {
          var label = country.getAttribute("data-d3-kyb-country-label") || "";
          if (label) setTitle("Verify Meridian in " + shortPlace(label));
        }

        if (event.target.closest("[data-d3-kyb-confirm='yes']")) {
          goInvestigate();
          return;
        }
        var cand = event.target.closest("[data-d3-kyb-cand], .ai-cand, [data-d3-kyb-select]");
        if (!cand) return;
        var nameEl = cand.querySelector(".ai-cand__name");
        if (nameEl && nameEl.textContent.trim()) lastBizName = nameEl.textContent.trim();
        goInvestigate();
        window.setTimeout(function () {
          var yes = document.querySelector("[data-d3-kyb-confirm='yes']");
          if (yes) yes.click();
        }, 0);
      },
      false
    );
  }

  ensureChrome();
  bindBack();
  buildPicker();
  watchThread();
  watchFlow();
  openLabKyb();
  seedLandingCards();
  applyChoice();
  paintLandingCopy();

  window.requestAnimationFrame(function () {
    openLabKyb();
    seedLandingCards();
    ensureChrome();
    applyChoice();
    paintLandingCopy();
    focusPaneInput();
  });
})();
