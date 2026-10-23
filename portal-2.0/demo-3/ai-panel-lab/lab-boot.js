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
  var heroOrb = null;
  var selectorCity = "";
  var selectorPage = 0;
  var selectorKey = "";
  var lastBizName = "";
  var lastBizId = "";
  var lastPlace = { country: "United Kingdom", cc: "GB" };
  var navToken = 0;

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

  function rememberPlace(input) {
    if (!input) return;
    var place = null;
    if (typeof input === "object" && (input.country || input.cc)) {
      place = input;
    } else {
      var map = window.D3KybMapSearch;
      if (map && typeof map.parsePlaceQuery === "function") {
        place = map.parsePlaceQuery(String(input));
      }
      if (!place || !(place.country || place.cc)) {
        var short = shortPlace(input);
        if (short === "US") place = { country: "United States", cc: "US" };
        else if (short === "UK") place = { country: "United Kingdom", cc: "GB" };
      }
    }
    if (place && (place.country || place.cc)) {
      lastPlace = {
        country: place.country || lastPlace.country,
        cc: place.cc || lastPlace.cc
      };
    }
  }

  function placeShort() {
    return shortPlace(lastPlace.country || lastPlace.cc || "UK") || "UK";
  }

  function verifyTitle() {
    return "Verify Meridian in " + placeShort();
  }

  function titleFromText(text) {
    rememberPlace(text);
    var place = shortPlace(text);
    if (!place || (/meridian/i.test(place) && place.length < 24)) {
      var named = String(text || "").match(
        /\b(?:in|from)\s+([A-Za-z][A-Za-z .'-]{1,40})/
      );
      place = named ? shortPlace(named[1]) : shortPlace(text);
    }
    if (lastPlace.country || lastPlace.cc) return verifyTitle();
    if (!place || /meridian/i.test(place)) return "Verify Meridian";
    return "Verify Meridian in " + place;
  }

  function setTitle(text) {
    var el = document.querySelector("[data-d3-lab-title]");
    if (el && text) el.textContent = text;
  }

  var ICON_SEARCH =
    '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.90625 4.46875C7.90625 2.57812 6.35938 1.03125 4.46875 1.03125C2.57812 1.03125 1.03125 2.57812 1.03125 4.46875C1.03125 6.35938 2.57812 7.90625 4.46875 7.90625C6.35938 7.90625 7.90625 6.35938 7.90625 4.46875ZM7.24023 7.9707C6.48828 8.57227 5.52148 8.9375 4.46875 8.9375C1.99805 8.9375 0 6.93945 0 4.46875C0 1.99805 1.99805 0 4.46875 0C6.93945 0 8.9375 1.99805 8.9375 4.46875C8.9375 5.52148 8.57227 6.48828 7.9707 7.24023L10.8496 10.1191C11.043 10.3125 11.043 10.6562 10.8496 10.8496C10.6562 11.043 10.3125 11.043 10.1191 10.8496L7.24023 7.9707Z" fill="currentColor"/></svg>';
  var ICON_FILE =
    '<svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M1.375 1.03125C1.18164 1.03125 1.03125 1.18164 1.03125 1.375V9.625C1.03125 9.81836 1.18164 9.96875 1.375 9.96875H6.875C7.06836 9.96875 7.21875 9.81836 7.21875 9.625V4.46875H5.32812C4.46875 4.46875 3.78125 3.78125 3.78125 2.92188V1.03125H1.375ZM4.8125 1.46094V2.92188C4.8125 3.20117 5.04883 3.4375 5.32812 3.4375H6.78906L4.8125 1.46094ZM1.375 0H4.25391C4.61914 0 4.96289 0.150391 5.2207 0.408203L7.8418 3.0293C8.09961 3.28711 8.25 3.65234 8.25 4.01758V9.625C8.25 10.377 7.62695 11 6.875 11H1.375C0.623047 11 0 10.377 0 9.625V1.375C0 0.623047 0.623047 0 1.375 0ZM2.57812 5.5H5.67188C5.95117 5.5 6.1875 5.73633 6.1875 6.01562C6.1875 6.29492 5.95117 6.53125 5.67188 6.53125H2.57812C2.29883 6.53125 2.0625 6.29492 2.0625 6.01562C2.0625 5.73633 2.29883 5.5 2.57812 5.5ZM2.57812 7.5625H5.67188C5.95117 7.5625 6.1875 7.79883 6.1875 8.07812C6.1875 8.35742 5.95117 8.59375 5.67188 8.59375H2.57812C2.29883 8.59375 2.0625 8.35742 2.0625 8.07812C2.0625 7.79883 2.29883 7.5625 2.57812 7.5625Z" fill="currentColor"/></svg>';

  function activityFromLabel(text) {
    var raw = String(text || "").replace(/[.…]+$/g, "").trim();
    if (/matched registry|pulling business registry|checking registry|business registry/i.test(raw)) {
      return {
        label: "Checking registry",
        busy: true,
        bubble: "acting",
        actingLabel: "Checking registry",
        actingIconHtml: ICON_SEARCH,
        iconHtml: ICON_SEARCH
      };
    }
    if (
      /incorporation and ownership parsed|parsing incorporation|incorporation documents|reading ownership|ownership/i.test(
        raw
      )
    ) {
      return {
        label: "Reading ownership",
        busy: true,
        bubble: "acting",
        actingLabel: "Reading ownership",
        actingIconHtml: ICON_SEARCH,
        iconHtml: ICON_SEARCH
      };
    }
    if (/no sanctions|screening directors|cross-referencing|sanctions|ofac/i.test(raw)) {
      return {
        label: "Screening sanctions",
        busy: true,
        bubble: "acting",
        actingLabel: "Screening sanctions",
        actingIconHtml: ICON_SEARCH,
        iconHtml: ICON_SEARCH
      };
    }
    if (/generating report|writing report/i.test(raw)) {
      return {
        label: "Generating report",
        busy: true,
        bubble: "acting",
        actingLabel: "Generating report",
        actingIconHtml: ICON_FILE,
        iconHtml: ICON_FILE
      };
    }
    if (raw) {
      return {
        label: raw,
        busy: true,
        bubble: "thinking",
        iconHtml: ICON_SEARCH
      };
    }
    return null;
  }

  function currentActivityLabel(block) {
    if (!block) return "";
    var current = block.querySelector(".d1-activity__toggle--current [data-d1-activity-label]");
    if (current && current.textContent.trim()) return current.textContent.trim();
    var labels = block.querySelectorAll("[data-d1-activity-label]");
    if (!labels.length) return "";
    return (labels[labels.length - 1].textContent || "").trim();
  }

  function readPanelActivity() {
    var thread = document.querySelector("[data-d1-thread]");
    var report = thread && thread.querySelector(".d1-report__title, [data-d1-co]");
    var block = realProgressBlock();
    if (!block && choice.step === "investigating" && choice.investigate === "bar") {
      block = document.querySelector("[data-d3-lab-bar]");
    }
    var toolsLabel = block && block.querySelector("[data-d1-tools-label]");
    var toolsText = toolsLabel ? toolsLabel.textContent.trim() : "";
    if (
      choice.step === "investigating" &&
      choice.investigate === "bar" &&
      !barDone &&
      typeof barStep === "number" &&
      typeof barCalls === "function"
    ) {
      var barCall = barCalls()[Math.min(Math.max(barStep, 0), barCalls().length - 1)];
      var fromBarStep = activityFromLabel(barCall && barCall.label);
      if (fromBarStep) return fromBarStep;
    }
    var currentText = currentActivityLabel(block);
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
      if (
        !dotDone &&
        typeof dotStep === "number" &&
        typeof investigateCalls === "function"
      ) {
        var dotCall = investigateCalls()[Math.min(Math.max(dotStep, 0), investigateCalls().length - 1)];
        var fromDotStep = activityFromLabel(dotCall && dotCall.label);
        if (fromDotStep) return fromDotStep;
      }
      var fromDots = activityFromLabel(currentActivityLabel(dotsHost));
      if (fromDots) return fromDots;
    }
    if (/complete/i.test(toolsText) && !report) {
      return {
        label: "Generating report",
        busy: true,
        bubble: "acting",
        actingLabel: "Generating report",
        actingIconHtml: ICON_FILE,
        iconHtml: ICON_FILE
      };
    }
    if (choice.step === "report" && report) {
      var tag = thread && thread.querySelector("[data-d1-report-tag]");
      var review = !!(tag && /review|needs/i.test(tag.textContent || ""));
      return {
        label: review ? "Review findings" : "Report ready",
        busy: false,
        done: true,
        attention: review,
        bubble: review ? "needs-attention" : "completed",
        iconHtml: review ? "" : ICON_FILE
      };
    }
    if (choice.step === "investigating" && (dotDone || barDone) && !report) {
      return {
        label: "Generating report",
        busy: true,
        bubble: "acting",
        actingLabel: "Generating report",
        actingIconHtml: ICON_FILE,
        iconHtml: ICON_FILE
      };
    }
    if (thread && thread.querySelector(".d1-thinking, [data-d3-kyb-starting]")) {
      if (choice.step === "investigating") {
        return {
          label: "Checking registry",
          busy: true,
          bubble: "acting",
          actingLabel: "Checking registry",
          actingIconHtml: ICON_SEARCH,
          iconHtml: ICON_SEARCH
        };
      }
      return {
        label: "Thinking",
        busy: true,
        bubble: "thinking",
        iconHtml: ICON_SEARCH
      };
    }
    if (choice.step === "investigating") {
      return {
        label: "Checking registry",
        busy: true,
        bubble: "acting",
        actingLabel: "Checking registry",
        actingIconHtml: ICON_SEARCH,
        iconHtml: ICON_SEARCH
      };
    }
    return {
      label: "Awaiting input",
      busy: false,
      bubble: "idle",
      iconHtml: ""
    };
  }

  function syncHeaderChrome() {
    try {
      var activity = readPanelActivity();
      setStatus(activity.label, activity.iconHtml || activity.actingIconHtml || "");
      var bubble = {
        state: activity.bubble || "idle",
        actingLabel: activity.actingLabel || "",
        actingIconHtml: activity.actingIconHtml || activity.iconHtml || ""
      };
      if (headerOrb) {
        if (typeof headerOrb.setMode === "function") headerOrb.setMode(bubble.state);
        else if (typeof headerOrb.set === "function") headerOrb.set(bubble);
      }
      if (floatHandle && typeof floatHandle.setMode === "function") {
        floatHandle.setMode(bubble);
      }
      if (heroOrb) {
        if (typeof heroOrb.set === "function") heroOrb.set(bubble);
        else if (typeof heroOrb.setMode === "function") heroOrb.setMode(bubble.state);
      }
    } catch (err) {
      /* Keep investigate timers alive if chrome sync throws. */
    }
  }

  function setStatus(label, iconHtml) {
    var el = document.querySelector("[data-d3-lab-status]");
    var mark = document.querySelector("[data-d3-lab-status-icon]");
    if (el) el.textContent = label;
    if (!mark) return;
    var html = iconHtml || "";
    mark.innerHTML = html;
    mark.hidden = !html;
    mark.classList.toggle("is-empty", !html);
  }

  function chatPaneActive() {
    var pane = document.querySelector(".d3-chat-pane");
    return !!(pane && pane.classList.contains("is-active"));
  }

  function orbForStep() {
    if (choice.step === "landing") {
      if (choice.landing === "float") return "float";
      /* Large orb is empty-state only. Once the chat continues, use the Verify header. */
      if (chatPaneActive()) return choice.verifyOrb === "float" ? "float" : "header";
      return "hero";
    }
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
      if (choice.investigate === "dots") {
        stopBar();
        playDots();
      } else {
        stopDots();
        playBar();
      }
      document.querySelectorAll(".d3-chat-pane [data-d1-input], .d3-chat-pane [data-d3-pane-input]").forEach(function (input) {
        input.setAttribute("placeholder", "Verification in progress…");
      });
    } else if (choice.step === "report") {
      stopDots();
      stopBar();
      hideMatchList();
      document.querySelectorAll(".d3-chat-pane [data-d1-input], .d3-chat-pane [data-d3-pane-input]").forEach(function (input) {
        input.setAttribute("placeholder", "Ask about this verification");
      });
    } else {
      stopDots();
      stopBar();
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
    if (!back) return;
    /* Hide only on the empty landing. Continued large-orb chat uses the Verify header + back. */
    back.hidden = choice.step === "landing" && !chatPaneActive();
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
      if (choice.step === "verify" || (choice.step === "landing" && chatPaneActive())) {
        resetLanding();
      }
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

  function abortLabFlow() {
    navToken += 1;
    if (window.D3KybReport && typeof window.D3KybReport.abort === "function") {
      window.D3KybReport.abort();
    }
    stopDots();
    stopBar();
  }

  function clearThreadChrome() {
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
  }

  function idleOrbs() {
    if (floatHandle && typeof floatHandle.setMode === "function") {
      floatHandle.setMode({ state: "idle" });
    }
    if (headerOrb) {
      if (typeof headerOrb.setMode === "function") headerOrb.setMode("idle");
      else if (typeof headerOrb.set === "function") headerOrb.set({ state: "idle" });
    }
    if (heroOrb) {
      if (typeof heroOrb.set === "function") heroOrb.set({ state: "idle" });
      else if (typeof heroOrb.setMode === "function") heroOrb.setMode("idle");
    }
  }

  function goVerify(text) {
    choice.step = "verify";
    setTitle(titleFromText(text || "Verify Meridian"));
    applyChoice();
  }

  function goInvestigate() {
    choice.step = "investigating";
    setTitle(verifyTitle());
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
    var filter = {
      country: lastPlace.country || "United Kingdom",
      cc: lastPlace.cc || "GB"
    };
    var matches = map.findBusinesses("Meridian", filter);
    if (!matches || !matches.length) return false;
    activateThread();
    agent.showMatches(matches, "Meridian", filter);
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
    setTitle(verifyTitle());
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
    setTitle(verifyTitle());
    /* Set step before activating the pane so large-orb landing watchers
       don't applyChoice() while still on landing and kill the new run. */
    choice.step = "investigating";
    hideMatchList();
    dotDone = false;
    dotStep = 0;
    dotPct = 0;
    barDone = false;
    barStep = 0;
    barRunning = false;
    activateThread();
    applyChoice();
  }

  function reportBiz() {
    var agent = window.D3KybAgent;
    if (agent && typeof agent.selected === "function") {
      var sel = agent.selected();
      if (sel) return sel;
    }
    var map = window.D3KybMapSearch;
    if (!map) return null;
    if (lastBizId && typeof map.findById === "function") {
      var byId = map.findById(lastBizId);
      if (byId) return byId;
    }
    if (lastBizName && typeof map.findByName === "function") {
      var byName = map.findByName(lastBizName);
      if (byName) return byName;
    }
    if (typeof map.findById === "function") {
      var fallbackId = lastPlace && lastPlace.cc === "US" ? "us-cap" : "uk-apex";
      return map.findById(fallbackId) || map.findById("uk-apex") || null;
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
      risks: [{ label: "Virtual office footprint" }],
      report: {
        sumA: "Meridian Apex Consulting is a real, active UK company, but I wouldn’t onboard it yet."
      }
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
      var summary =
        (biz.report && biz.report.sumA) ||
        (biz.country === "United States" || biz.cc === "US"
          ? biz.name + " matched an active US filing with clear sanctions and adverse-media screens."
          : "Meridian Apex Consulting is a real, active UK company, but I wouldn’t onboard it yet.");
      sumA.textContent = summary;
    }
    var sumB = node.querySelector("[data-d1-sum-b]");
    if (sumB) {
      if (biz.country === "United States" || biz.cc === "US") {
        sumB.hidden = true;
        sumB.textContent = "";
      } else {
        sumB.hidden = false;
        sumB.textContent =
          "It has 0 employees, £1 in capital, and a virtual office address. I also found 3 connections to your other transactions that change the picture.";
      }
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
    setTitle(verifyTitle());
    activateThread();
    hideMatchList();
    stopDots();
    choice.step = "report";
    applyChoice();
  }

  function enterStep(step, opts) {
    opts = opts || {};
    var fresh = !!opts.fresh;
    abortLabFlow();
    if (fresh) {
      clearThreadChrome();
      selectorCity = "";
      selectorPage = 0;
      selectorKey = "";
      lastBizName = "";
      lastBizId = "";
      lastPlace = { country: "United Kingdom", cc: "GB" };
      dotDone = false;
      dotStep = 0;
      dotPct = 0;
      barDone = false;
      barStep = 0;
      idleOrbs();
    }
    if (step === "landing") {
      if (fresh) {
        resetLanding();
        seedLandingCards();
        focusPaneInput();
      } else {
        resetLanding();
      }
      return;
    }
    if (step === "verify") {
      if (fresh) {
        /* Seed a clean match list after clearing the thread. */
      }
      enterVerify();
      return;
    }
    if (step === "investigate") {
      enterInvestigate();
      return;
    }
    if (step === "report") enterReport();
  }

  function investigateCalls() {
    var name = String(businessName() || "").replace(/\.+$/, "");
    return [
      {
        label: "Pulling business registry records for " + name + "...",
        done: "Matched registry records",
        detail: [name, "Companies House — status Active"],
        match: /pulling business registry|checking registry|business registry|matched registry/i,
        ms: 1100
      },
      {
        label: "Parsing incorporation documents and ownership structure...",
        done: "Incorporation and ownership parsed",
        detail: ["Legal form confirmed", "Ownership structure mapped"],
        match: /parsing incorporation|ownership|incorporation/i,
        ms: 1200
      },
      {
        label: "Cross-referencing listed directors against OFAC, UN, and EU sanctions lists...",
        done: "No sanctions matches found",
        detail: ["OFAC — clear", "UN / EU — clear"],
        match: /screening directors|cross-referencing|sanctions/i,
        ms: 1300
      }
    ];
  }

  function barCalls() {
    return investigateCalls();
  }

  function stepIndexFromLabel(text) {
    var steps = investigateCalls();
    for (var i = 0; i < steps.length; i += 1) {
      if (steps[i].match.test(String(text || ""))) return i;
    }
    return -1;
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

  function businessName() {
    if (lastBizName) return lastBizName;
    var biz = reportBiz();
    if (biz && biz.name) return biz.name;
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return "Meridian Apex Consulting Ltd.";
    var card = thread.querySelector(".ai-cand__name");
    if (card && card.textContent.trim()) return card.textContent.trim();
    return "Meridian Apex Consulting Ltd.";
  }

  function dotConfig(progressPct) {
    var t = Math.max(0, Math.min(100, Number(progressPct) || 0)) / 100;
    return {
      style: "twinkle",
      formation: "grid",
      spacing: 11,
      size: 1.7,
      sizeVary: 0.15,
      color: "#c5cec8",
      opacity: 0.85,
      shape: "square",
      /* Expand the cloud as investigation advances (Figma loading feel). */
      shapeScale: 0.58 + t * 0.42,
      shapeX: 0.5,
      shapeY: 0.5,
      feather: 0.12,
      clear: 0,
      clearSize: 0,
      fade: 1,
      intensity: 0.85 + t * 0.25,
      speed: 1.1,
      angle: 20
    };
  }

  var dotField = null;
  var dotToken = 0;
  var dotStep = 0;
  var dotDone = false;
  var dotRunning = false;
  var dotPct = 0;

  function stopDots() {
    dotToken += 1;
    dotRunning = false;
  }

  function setDotProgress(pct) {
    dotPct = Math.max(0, Math.min(100, Math.round(pct)));
    var host = document.querySelector("[data-d3-lab-dots]");
    if (!host) return;
    var pctEl = host.querySelector("[data-d3-lab-dots-pct]");
    if (pctEl) pctEl.textContent = dotPct + "%";
    var canvas = host.querySelector("canvas");
    if (canvas && window.TruDotField) {
      if (!canvas.getAttribute("data-mounted")) {
        dotField = window.TruDotField.mount(canvas, dotConfig(dotPct));
        canvas.setAttribute("data-mounted", "1");
      } else if (dotField && typeof dotField.set === "function") {
        dotField.set(dotConfig(dotPct));
      }
    }
    syncHeaderChrome();
  }

  function dotsMarkup() {
    return (
      '<div class="d3-lab-dots__head">' +
      '<div class="d3-lab-dots__steps" data-d3-lab-dots-steps></div>' +
      '<span class="d3-lab-dots__pct" data-d3-lab-dots-pct aria-live="polite">0%</span>' +
      "</div>" +
      '<canvas class="d3-lab-dots__canvas" width="240" height="240" aria-hidden="true"></canvas>'
    );
  }

  function ensureDots() {
    if (choice.investigate !== "dots" || choice.step !== "investigating") return;
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return;
    var host = thread.querySelector("[data-d3-lab-dots]");
    var needsRebuild = false;
    if (!host) {
      host = document.createElement("div");
      host.className = "d3-lab-dots";
      host.setAttribute("data-d3-lab-dots", "");
      host.innerHTML = dotsMarkup();
      thread.appendChild(host);
      needsRebuild = true;
    } else if (
      !host.querySelector("[data-d3-lab-dots-steps]") ||
      !host.querySelector(".d3-lab-dots__head") ||
      !host.querySelector("canvas")
    ) {
      host.innerHTML = dotsMarkup();
      if (dotField && typeof dotField.destroy === "function") dotField.destroy();
      dotField = null;
      needsRebuild = true;
    }
    var tools = thread.querySelector(".d1-progress");
    var block = tools && tools.closest("section, .d1-block");
    if (block && block.parentNode && host.nextSibling !== block) {
      block.parentNode.insertBefore(host, block);
    }
    host.hidden = false;
    if (needsRebuild || !host.querySelector("canvas[data-mounted]")) {
      setDotProgress(dotDone ? 100 : dotPct);
    }
  }

  function playDots() {
    if (choice.investigate !== "dots" || choice.step !== "investigating") return;
    ensureDots();
    var host = document.querySelector("[data-d3-lab-dots]");
    if (!host) return;
    if (dotDone) {
      host.hidden = true;
      dotRunning = false;
      return;
    }
    if (dotRunning) return;

    var stepsHost = host.querySelector("[data-d3-lab-dots-steps]");
    var activityTpl = document.querySelector('[data-d1-tpl="activity"]');
    if (!stepsHost || !activityTpl || !activityTpl.content.firstElementChild) return;

    var token = ++dotToken;
    dotRunning = true;
    host.hidden = false;
    stepsHost.innerHTML = "";
    var calls = investigateCalls();
    var rows = [];
    dotStep = 0;
    setDotProgress(0);

    function alive() {
      return token === dotToken && choice.step === "investigating" && choice.investigate === "dots";
    }

    function collapseRows(except) {
      rows.forEach(function (prev) {
        if (except && prev === except) return;
        if (prev.toggle) {
          prev.toggle.classList.remove("d1-activity__toggle--current");
          prev.toggle.setAttribute("aria-expanded", "false");
        }
        if (prev.body) prev.body.hidden = true;
        var run = prev.row && prev.row.querySelector('[data-d1-mark="run"]');
        var done = prev.row && prev.row.querySelector('[data-d1-mark="done"]');
        if (run) run.hidden = true;
        if (done) done.hidden = false;
      });
    }

    function hide() {
      if (!alive()) {
        dotRunning = false;
        return;
      }
      dotDone = true;
      dotRunning = false;
      setDotProgress(100);
      collapseRows(null);
      var node = document.querySelector("[data-d3-lab-dots]");
      if (node) node.hidden = true;
      syncHeaderChrome();
    }

    function liveComplete() {
      var block = realProgressBlock();
      if (!block) return false;
      var toolsLabel = block.querySelector("[data-d1-tools-label]");
      return !!(toolsLabel && /complete/i.test(toolsLabel.textContent || ""));
    }

    function syncLiveLabel() {
      var block = realProgressBlock();
      if (!block) return;
      var livePct = block.querySelector(".d1-progress__pct");
      var pctNum = livePct
        ? parseInt(String(livePct.textContent || "").replace(/\D/g, ""), 10)
        : NaN;
      if (!isNaN(pctNum)) setDotProgress(pctNum);
      var label = currentActivityLabel(block);
      if (!label) return;
      var mapped = stepIndexFromLabel(label);
      if (mapped >= 0) dotStep = mapped;
      var current = stepsHost.querySelector(
        ".d1-activity__toggle--current [data-d1-activity-label]"
      );
      if (current) current.textContent = label;
    }

    function runStep(index) {
      if (!alive()) {
        dotRunning = false;
        return;
      }
      if (liveComplete()) {
        hide();
        return;
      }
      if (index >= calls.length) {
        if (investigationPending()) {
          syncLiveLabel();
          window.setTimeout(function () {
            if (alive()) runStep(index);
          }, 200);
          return;
        }
        hide();
        return;
      }

      dotStep = index;
      var call = calls[index];
      collapseRows(null);

      var row = activityTpl.content.firstElementChild.cloneNode(true);
      var toggle = row.querySelector(".d1-activity__toggle");
      var body = row.querySelector(".d1-activity__body");
      var detailEl = row.querySelector("[data-d1-activity-detail]");
      var actLabel = row.querySelector("[data-d1-activity-label]");
      if (actLabel) actLabel.textContent = call.label;
      if (!call.detail || !call.detail.length) {
        row.classList.add("is-bare");
        if (body) body.hidden = true;
      } else if (toggle) {
        toggle.setAttribute("aria-expanded", "true");
        if (body) body.hidden = false;
      }
      stepsHost.appendChild(row);
      rows.push({ row: row, toggle: toggle, body: body });
      setDotProgress(Math.round((index / calls.length) * 100));
      syncLiveLabel();

      var lines = call.detail || [];
      var slice = lines.length ? call.ms / (lines.length + 1) : call.ms;
      var line = 0;

      function nextLine() {
        if (!alive()) {
          dotRunning = false;
          return;
        }
        if (liveComplete()) {
          hide();
          return;
        }
        syncLiveLabel();
        if (line < lines.length) {
          var p = document.createElement("p");
          p.textContent = lines[line];
          if (detailEl) detailEl.appendChild(p);
          line += 1;
          window.setTimeout(nextLine, slice);
          return;
        }
        window.setTimeout(function () {
          if (!alive()) {
            dotRunning = false;
            return;
          }
          var running = row.querySelector('[data-d1-mark="run"]');
          var finished = row.querySelector('[data-d1-mark="done"]');
          if (running) running.hidden = true;
          if (finished) finished.hidden = false;
          if (call.done && actLabel) actLabel.textContent = call.done;
          if (toggle) {
            toggle.classList.remove("d1-activity__toggle--current");
            toggle.setAttribute("aria-expanded", "false");
          }
          if (body) body.hidden = true;
          setDotProgress(Math.round(((index + 1) / calls.length) * 100));
          window.setTimeout(function () {
            runStep(index + 1);
          }, 180);
        }, slice);
      }

      window.setTimeout(nextLine, slice);
    }

    runStep(0);
  }

  var barToken = 0;
  var barStep = 0;
  var barDone = false;
  var barRunning = false;

  function stopBar() {
    barToken += 1;
    barRunning = false;
  }

  function removeLabBarPreview() {
    var preview = document.querySelector("[data-d3-lab-bar]");
    if (preview && preview.parentNode) preview.parentNode.removeChild(preview);
  }

  /* Live Meridian investigation and the lab preview both clone tools — keep one. */
  function reconcileProgressBars() {
    if (choice.step !== "investigating" || choice.investigate !== "bar") return;
    var live = realProgressBlock();
    if (!live) return;
    if (document.querySelector("[data-d3-lab-bar]")) {
      stopBar();
      removeLabBarPreview();
    }
  }

  function ensureBar() {
    if (choice.investigate !== "bar" || choice.step !== "investigating") return;
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return;

    reconcileProgressBars();
    if (realProgressBlock()) return;

    /* Confirm / starting live flow will append its own tools block — don't seed a duplicate. */
    if (
      thread.querySelector("[data-d1-confirm-card]") ||
      thread.querySelector("[data-d3-kyb-starting]") ||
      thread.querySelector("[data-d3-kyb-confirm='yes']")
    ) {
      stopBar();
      removeLabBarPreview();
      return;
    }

    var preview = thread.querySelector("[data-d3-lab-bar]");
    var created = false;
    if (!preview) {
      var toolsTpl = document.querySelector('[data-d1-tpl="tools"]');
      if (!toolsTpl || !toolsTpl.content.firstElementChild) return;
      preview = toolsTpl.content.firstElementChild.cloneNode(true);
      preview.setAttribute("data-d3-lab-bar", "");
      thread.appendChild(preview);
      created = true;
    }

    /* Only seed zero-state when mounting or before playBar has started. */
    if (created || (!barRunning && !barDone)) {
      var check = preview.querySelector("[data-d1-tools-check]");
      if (check) check.hidden = true;
      var pct = preview.querySelector(".d1-progress__pct");
      var fill = preview.querySelector(".d1-progress__fill");
      var label = preview.querySelector("[data-d1-tools-label]");
      if (label) label.textContent = "Investigating";
      if (pct) pct.textContent = "0%";
      if (fill) {
        fill.style.width = "0%";
        fill.classList.add("d1-progress__fill--active");
        fill.classList.remove("d1-progress__fill--done");
      }
    }
  }

  function playBar() {
    if (choice.investigate !== "bar" || choice.step !== "investigating") return;
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return;

    reconcileProgressBars();
    /* Live investigation owns the progress UI — don't fight it. */
    if (realProgressBlock()) return;
    if (
      thread.querySelector("[data-d1-confirm-card]") ||
      thread.querySelector("[data-d3-kyb-starting]") ||
      thread.querySelector("[data-d3-kyb-confirm='yes']")
    ) {
      return;
    }

    ensureBar();
    var host = thread.querySelector("[data-d3-lab-bar]");
    if (!host) return;
    var stepsHost = host.querySelector("[data-d1-steps]");
    var activityTpl = document.querySelector('[data-d1-tpl="activity"]');
    if (!stepsHost || !activityTpl || !activityTpl.content.firstElementChild) return;

    /* Finished preview stays put; mid-run must not restart (applyChoice re-enters). */
    if (barDone && stepsHost.children.length) return;
    if (barRunning) return;

    var token = ++barToken;
    barRunning = true;
    barDone = false;
    barStep = 0;
    stepsHost.innerHTML = "";
    var calls = barCalls();
    var rows = [];
    var pct = host.querySelector(".d1-progress__pct");
    var fill = host.querySelector(".d1-progress__fill");
    var label = host.querySelector("[data-d1-tools-label]");
    var check = host.querySelector("[data-d1-tools-check]");
    if (check) check.hidden = true;
    if (label) label.textContent = "Investigating";
    if (pct) pct.textContent = "0%";
    if (fill) {
      fill.style.width = "0%";
      fill.classList.add("d1-progress__fill--active");
      fill.classList.remove("d1-progress__fill--done");
    }

    function alive() {
      return (
        token === barToken &&
        choice.step === "investigating" &&
        choice.investigate === "bar"
      );
    }

    function finish() {
      if (!alive()) {
        barRunning = false;
        return;
      }
      barRunning = false;
      barDone = true;
      if (label) label.textContent = "Investigation complete";
      if (pct) pct.textContent = "100%";
      if (fill) {
        fill.style.width = "100%";
        fill.classList.remove("d1-progress__fill--active");
        fill.classList.add("d1-progress__fill--done");
      }
      if (check) check.hidden = false;
      rows.forEach(function (prev) {
        if (prev.toggle) {
          prev.toggle.classList.remove("d1-activity__toggle--current");
          prev.toggle.setAttribute("aria-expanded", "false");
        }
        if (prev.body) prev.body.hidden = true;
      });
      syncHeaderChrome();
    }

    function runStep(index) {
      if (!alive()) {
        barRunning = false;
        return;
      }
      if (index >= calls.length) {
        if (investigationPending() && realProgressBlock()) {
          window.setTimeout(function () {
            if (alive()) finish();
            else barRunning = false;
          }, 200);
          return;
        }
        finish();
        return;
      }
      barStep = index;
      var call = calls[index];
      rows.forEach(function (prev) {
        if (prev.toggle) {
          prev.toggle.classList.remove("d1-activity__toggle--current");
          prev.toggle.setAttribute("aria-expanded", "false");
        }
        if (prev.body) prev.body.hidden = true;
        var run = prev.row && prev.row.querySelector('[data-d1-mark="run"]');
        var done = prev.row && prev.row.querySelector('[data-d1-mark="done"]');
        if (run) run.hidden = true;
        if (done) done.hidden = false;
      });

      var row = activityTpl.content.firstElementChild.cloneNode(true);
      var toggle = row.querySelector(".d1-activity__toggle");
      var body = row.querySelector(".d1-activity__body");
      var detailEl = row.querySelector("[data-d1-activity-detail]");
      var actLabel = row.querySelector("[data-d1-activity-label]");
      if (actLabel) actLabel.textContent = call.label;
      if (!call.detail || !call.detail.length) {
        row.classList.add("is-bare");
        if (body) body.hidden = true;
      }
      stepsHost.appendChild(row);
      rows.push({ row: row, toggle: toggle, body: body });
      if (pct) pct.textContent = Math.round((index / calls.length) * 100) + "%";
      if (fill) fill.style.width = Math.round((index / calls.length) * 100) + "%";
      syncHeaderChrome();

      var lines = call.detail || [];
      var slice = lines.length ? call.ms / (lines.length + 1) : call.ms;
      var line = 0;

      function nextLine() {
        if (!alive()) {
          barRunning = false;
          return;
        }
        if (line < lines.length) {
          var p = document.createElement("p");
          p.textContent = lines[line];
          if (detailEl) detailEl.appendChild(p);
          line += 1;
          window.setTimeout(nextLine, slice);
          return;
        }
        window.setTimeout(function () {
          if (!alive()) {
            barRunning = false;
            return;
          }
          var running = row.querySelector('[data-d1-mark="run"]');
          var finished = row.querySelector('[data-d1-mark="done"]');
          if (running) running.hidden = true;
          if (finished) finished.hidden = false;
          if (call.done && actLabel) actLabel.textContent = call.done;
          if (pct) pct.textContent = Math.round(((index + 1) / calls.length) * 100) + "%";
          if (fill) fill.style.width = Math.round(((index + 1) / calls.length) * 100) + "%";
          syncHeaderChrome();
          window.setTimeout(function () {
            runStep(index + 1);
          }, 180);
        }, slice);
      }

      window.setTimeout(nextLine, slice);
    }

    runStep(0);
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
      '<span class="d3-lab-ident__status-icon is-empty" data-d3-lab-status-icon aria-hidden="true" hidden></span>' +
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
      heroOrb = window.TruAIBubble.mountPanel(hero, { state: "idle" });
      if (!headerOrb) {
        headerOrb = window.TruAIBubble.mountPanel(ident.querySelector("[data-d3-lab-ident-orb]"), {
          state: "idle"
        });
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
      "</div>" +
      "</div>" +
      '<p class="d3-lab-picker__hint">Pick treatments for each step, then use Go to this step to open that view. Per-step Restart clears the chat first (keeps settings), then opens that step.</p>';

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
        '<div class="d3-lab-picker__step-actions">' +
        '<button type="button" class="d3-lab-picker__restart d3-lab-picker__restart--step" data-lab-restart-goto="' +
        step.id +
        '">Restart</button>' +
        '<button type="button" class="d3-lab-picker__goto" data-lab-goto="' +
        step.id +
        '">Go to this step</button>' +
        "</div>" +
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
      var restartGoto = event.target.closest("[data-lab-restart-goto]");
      if (restartGoto && host.contains(restartGoto)) {
        var stepId = restartGoto.getAttribute("data-lab-restart-goto") || "landing";
        enterStep(stepId, { fresh: true });
        return;
      }
      var jump = event.target.closest("[data-lab-goto]");
      if (jump && host.contains(jump)) {
        enterStep(jump.getAttribute("data-lab-goto"), { fresh: false });
        return;
      }
      var btn = event.target.closest("[data-lab-pick]");
      if (!btn || !host.contains(btn)) return;
      var key = btn.getAttribute("data-lab-pick");
      var value = btn.getAttribute("data-lab-value");
      if (!choice.hasOwnProperty(key)) return;
      if (key === "investigate" && value === "dots" && choice.investigate !== "dots") {
        stopDots();
        dotDone = false;
        dotStep = 0;
        dotPct = 0;
        var staleDots = document.querySelector("[data-d3-lab-dots-steps]");
        if (staleDots) staleDots.innerHTML = "";
      }
      if (key === "investigate" && value === "bar" && choice.investigate !== "bar") {
        stopBar();
        barDone = false;
        barStep = 0;
        var staleBar = document.querySelector("[data-d3-lab-bar] [data-d1-steps]");
        if (staleBar) staleBar.innerHTML = "";
      }
      choice[key] = value;
      if (key === "landing" && value === "float") choice.verifyOrb = "float";
      if (key === "verifyOrb" && value === "float") choice.landing = "float";
      applyChoice();
    });
  }

  function onUserText(text) {
    text = text || "";
    rememberPlace(text);
    if (/verify\s+meridian\b/i.test(text)) {
      goVerify(text);
      return;
    }
    if (choice.step === "landing" && /meridian/i.test(text)) {
      goVerify(text);
      return;
    }
    if (choice.step !== "verify" && choice.step !== "investigating") return;
    if (lastPlace.country || lastPlace.cc) setTitle(verifyTitle());
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
        if (choice.step === "investigating") {
          ensureDots();
          reconcileProgressBars();
        }
        /* Large-orb landing → active chat: swap plain brand for the Verify header. */
        if (choice.step === "landing" && choice.landing === "large") {
          var wantOrb = orbForStep();
          if (shell.getAttribute("data-lab-orb") !== wantOrb) applyChoice();
        }
        syncMatchView();
        syncHeaderChrome();
      } finally {
        syncing = false;
      }
    });
    observer.observe(thread, { childList: true, subtree: true });
  }

  function watchPaneActive() {
    var pane = document.querySelector(".d3-chat-pane");
    if (!pane || typeof MutationObserver === "undefined") return;
    var obs = new MutationObserver(function () {
      if (choice.step !== "landing" || choice.landing !== "large") return;
      var wantOrb = orbForStep();
      if (shell.getAttribute("data-lab-orb") !== wantOrb) applyChoice();
    });
    obs.observe(pane, { attributes: true, attributeFilter: ["class"] });
  }

  function watchFlow() {
    document.addEventListener("d3-kyb:report-ready", function () {
      /* Only auto-advance when a live investigation is underway. */
      if (choice.step !== "investigating") return;
      var biz = reportBiz();
      if (biz) {
        if (biz.name) lastBizName = biz.name;
        if (biz.id) lastBizId = biz.id;
        rememberPlace({ country: biz.country, cc: biz.cc });
      }
      choice.step = "report";
      setTitle(verifyTitle());
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
        var activityToggle = event.target.closest("[data-d1-activity]");
        if (activityToggle) {
          var activity = activityToggle.closest(".d1-activity");
          if (activity && !activity.classList.contains("is-bare")) {
            var body = activity.querySelector(".d1-activity__body");
            var open = activityToggle.getAttribute("aria-expanded") === "true";
            activityToggle.setAttribute("aria-expanded", open ? "false" : "true");
            if (body) body.hidden = open;
          }
          return;
        }
        var reportView = event.target.closest("[data-d1-report-action] .tds-btn");
        if (reportView) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
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
          if (label) {
            rememberPlace(label);
            setTitle(verifyTitle());
          }
        }

        if (event.target.closest("[data-d3-kyb-confirm='yes']")) {
          goInvestigate();
          return;
        }
        var cand = event.target.closest("[data-d3-kyb-cand], .ai-cand, [data-d3-kyb-select]");
        if (!cand) return;
        var candId =
          cand.getAttribute("data-d3-kyb-cand") || cand.getAttribute("data-id") || "";
        if (candId) lastBizId = candId;
        var nameEl = cand.querySelector(".ai-cand__name");
        if (nameEl && nameEl.textContent.trim()) lastBizName = nameEl.textContent.trim();
        var map = window.D3KybMapSearch;
        if (map && lastBizId && typeof map.findById === "function") {
          var picked = map.findById(lastBizId);
          if (picked) rememberPlace({ country: picked.country, cc: picked.cc });
        } else if (lastBizName && map && typeof map.findByName === "function") {
          var named = map.findByName(lastBizName);
          if (named) {
            lastBizId = named.id || lastBizId;
            rememberPlace({ country: named.country, cc: named.cc });
          }
        }
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
  watchPaneActive();
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
