/* Chat stage. A send plays the KYB demo as a generated reply:
   the user line, a short pause, the investigation, then the report. */
(function () {
  var stage = document.querySelector("[data-d1-stage]");
  var title = document.querySelector("[data-d1-title]");
  var back = document.querySelector("[data-d1-back]");
  var composer = document.querySelector("[data-d1-composer]");
  var thread = document.querySelector("[data-d1-thread]");
  var typing = document.querySelector("[data-d1-typing]");
  if (!stage || !composer || !thread) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timers = [];
  var titled = false;
  var played = false;

  /* Facts from the KYB verify-business demo (Meridian candidates). */
  var APEX = {
    name: "Meridian Apex Consulting Ltd.",
    lead: "“Meridian” matches multiple unrelated businesses, so I need to resolve the legal entity before running the KYB check; otherwise ownership, registration, and sanctions results could be attached to the wrong company.",
    ask: "I'm using Meridian Apex Consulting Ltd. — Companies House BRN 11876542, incorporated 1 Feb 2019, virtual office at Suite 400, 1 King Street, London.",
    sumA: "Meridian Apex Consulting is a real, active UK company, but I wouldn't onboard it yet.",
    sumB: "It has 0 employees, £1 in capital, and a virtual office address. I also found 3 connections to your other transactions that change the picture.",
    table: "Here's what links Meridian Apex Consulting to your other transactions:",
    links: true
  };

  var TRADE = {
    name: "Meridian Trade Holdings Ltd.",
    lead: "Meridian Trade Holdings Ltd. is a distinct UK company from Meridian Apex. Companies House 11204887, incorporated 2018, at 25 Bank Street, Canary Wharf.",
    ask: "Running the KYB check on this entity. It does not share the shell profile or the transaction links I found on Apex.",
    sumA: "Meridian Trade Holdings Ltd. is active and filed at a Canary Wharf address.",
    sumB: "I didn't find the zero-employee, £1-capital pattern, or the three transaction links that sit on Meridian Apex.",
    table: "",
    links: false
  };

  var NORDIC = {
    name: "Apex Nordic Logistics",
    lead: "I'll verify Apex Nordic Logistics.",
    ask: "This is the United Kingdom company from your demo card. I'm checking the registry now — fictional data only, no live check.",
    sumA: "Registry matched. Apex Nordic Logistics is an active United Kingdom company.",
    sumB: "The registered office matches the application. I also found 3 transactions connected to this business — a KYC document, a device check, and a bank account.",
    table: "",
    links: false,
    tag: "Verified",
    tone: "positive",
    stepA: "Matched Apex Nordic Logistics on the UK registry",
    stepB: "Confirmed the registered office",
    lines: [
      "Registered name matches the application",
      "Jurisdiction is the United Kingdom",
      "Registry matched"
    ],
    suggestions: [
      { q: "Show me transactions connected to this business", a: "link" },
      { q: "Who is the listed director?", a: "The UK filing lists one director for Apex Nordic Logistics. Jane Doe is the person on the connected KYC document, not the named director on that filing." },
      { q: "What should I request before onboarding?", a: "Ask for a recent proof of address, and open the three connected transactions before you onboard. The device check is high risk." }
    ]
  };

  var NORTHSTAR = {
    name: "Northstar Trading Ltd.",
    lead: "Northstar Trading Ltd. is a United States company. The address on the application does not match the registry address.",
    ask: "I'll flag it for review rather than mark it verified.",
    sumA: "Address mismatch. This demo record needs review before onboarding.",
    sumB: "The registry address and the application address are not the same.",
    table: "",
    links: false,
    tag: "Needs review",
    tone: "review"
  };

  var CAPITAL = {
    name: "Meridian Capital LLC",
    lead: "Meridian Capital LLC is a New York entity, NY DOS 4417762, incorporated 2013, at 200 Vesey Street.",
    ask: "This is not the UK consulting company. I'll verify this LLC on its own record.",
    sumA: "Meridian Capital LLC is an active United States company.",
    sumB: "Nothing in your other transactions ties this LLC to Daniel Reyes, the shared device, or account ••4417.",
    table: "",
    links: false,
    tag: "Verified",
    tone: "positive"
  };

  var REPLIES = {
    "Why was Daniel Reyes declined in March?": "Daniel Reyes was declined on 1 Mar 2026 in KYC Documents. The same device, 235252021, and account ••4417 show up on the Meridian Apex application.",
    "Who is behind the BVI holding company?": "The BVI holding company is still unnamed. The filings list a corporate shareholder and no natural person behind it.",
    "What should I request before onboarding?": "Before onboarding, ask for proof of trading, a staffed office, and the identity of the person behind the BVI shareholder."
  };

  function later(fn, ms) {
    if (reduced) {
      fn();
      return;
    }
    timers.push(window.setTimeout(fn, ms));
  }

  function cancel() {
    timers.forEach(window.clearTimeout);
    timers = [];
    if (typing) typing.hidden = true;
  }

  function beat(name) {
    return thread.querySelector('[data-d1-beat="' + name + '"]') ||
      document.querySelector('[data-d1-beat="' + name + '"]');
  }

  function hideAll() {
    document.querySelectorAll("[data-d1-beat]").forEach(function (el) {
      el.classList.remove("is-on");
    });
    thread.querySelectorAll(".d1-progress__fill").forEach(function (fill) {
      fill.style.width = "0";
    });
  }

  function show(name) {
    var el = beat(name);
    if (!el) return;
    el.classList.add("is-on");
    el.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
  }

  function fillTo(name, pct) {
    var el = beat(name);
    if (!el) return;
    var bar = el.querySelector(".d1-progress__fill");
    var label = el.querySelector(".d1-progress__pct");
    if (label) label.textContent = pct + "%";
    window.requestAnimationFrame(function () {
      if (bar) bar.style.width = pct + "%";
    });
  }

  function writeCompany(company) {
    var lead = thread.querySelector("[data-d1-ai-lead]");
    var ask = thread.querySelector("[data-d1-ai-ask]");
    var co = document.querySelector("[data-d1-co]");
    var sumA = document.querySelector("[data-d1-sum-a]");
    var sumB = document.querySelector("[data-d1-sum-b]");
    var tableLead = document.querySelector("[data-d1-table-lead]");
    if (lead) lead.textContent = company.lead;
    if (ask) ask.textContent = company.ask;
    if (co) co.textContent = company.name;
    if (sumA) sumA.textContent = company.sumA;
    if (sumB) sumB.textContent = company.sumB;
    if (tableLead) tableLead.textContent = company.table;
    var tag = document.querySelector("[data-d1-report-tag]");
    if (tag) {
      tag.textContent = company.tag || "Verified";
      tag.className = "d1-tag d1-tag--" + (company.tone === "review" ? "review" : "positive");
    }
  }

  function namedCompany(text) {
    if (/northstar/i.test(text)) return NORTHSTAR;
    if (/trade holdings/i.test(text)) return TRADE;
    if (/apex consulting|meridian apex/i.test(text)) return APEX;
    if (/nordic|\bapex\b/i.test(text)) return NORDIC;
    if (/capital/i.test(text)) return CAPITAL;
    return null;
  }

  function isPerson(text, agent) {
    return agent === "kyc" || /jane doe|daniel|reyes|verify this person|verify a person/i.test(text);
  }

  function hideFollow() {
    var el = beat("follow");
    if (el) el.classList.remove("is-on");
  }

  function appendUser(text) {
    var note = document.createElement("section");
    note.className = "d1-turn d1-extra";
    var wrap = document.createElement("div");
    wrap.className = "d1-user";
    var p = document.createElement("p");
    p.textContent = text;
    wrap.appendChild(p);
    note.appendChild(wrap);
    thread.appendChild(note);
    note.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
  }

  function appendAi(text) {
    var block = document.createElement("div");
    block.className = "d1-ai d1-extra";
    var p = document.createElement("p");
    p.textContent = text;
    block.appendChild(p);
    thread.appendChild(block);
    block.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
  }

  var activeReplies = REPLIES;

  function showFollow() {
    show("follow");
  }

  function paintStory(company) {
    writeCompany(company);
    ["working", "done"].forEach(function (name) {
      var root = beat(name);
      if (!root || !company.stepA) return;
      var a = root.querySelector('[data-d1-step="a"]');
      var b = root.querySelector('[data-d1-step="b"]');
      if (a) a.textContent = company.stepA;
      if (b) b.textContent = company.stepB;
      if (company.lines) {
        company.lines.forEach(function (line, i) {
          var node = root.querySelector('[data-d1-line="' + i + '"]');
          if (!node) return;
          node.textContent = line;
          node.classList.toggle("d1-activity__hit", i === company.lines.length - 1);
        });
      }
    });
    if (company.suggestions) setSuggestions(company.suggestions);
  }

  function setSuggestions(items) {
    var rows = document.querySelectorAll("[data-d1-suggest] span");
    activeReplies = {};
    items.forEach(function (item, i) {
      if (rows[i]) rows[i].textContent = item.q;
      if (item.a !== "link") activeReplies[item.q] = item.a;
    });
  }

  function wantsLinks(text) {
    return /connected transaction|transactions connected/i.test(text);
  }

  var LINK_SUGGESTIONS = [
    { q: "Why is this device high risk?", a: "Device 3045489E05849546 scored 92 out of 100. It is linked to 3 identities and a previously declined transaction. IP reputation is high. VPN and proxy were not detected." },
    { q: "Did Jane Doe's document match?", a: "Yes. Her California driver's license D1234567 is valid through 20 Mar 2028, the selfie matches the portrait, and liveness passed. Open her row for the KYC document result." },
    { q: "What failed on the bank account?", a: "Account ••4417 is a business account and it did not verify. The name on the account does not match Apex Nordic Logistics." }
  ];

  /* First message only asks a question, or starts a check when the user
     already named a record. Later messages answer that one action. */
  var step = "start";

  function askWhich(text) {
    var lead = thread.querySelector("[data-d1-ai-lead]");
    var ask = thread.querySelector("[data-d1-ai-ask]");
    if (/^meridian$/i.test(text.trim()) || /meridian/i.test(text)) {
      if (lead) lead.textContent = "“Meridian” matches multiple unrelated businesses, so I need to resolve the legal entity before running the KYB check; otherwise ownership, registration, and sanctions results could be attached to the wrong company.";
      if (ask) ask.textContent = "Which should I investigate — Meridian Apex Consulting Ltd., Meridian Trade Holdings Ltd., or Meridian Capital LLC?";
    } else {
      if (lead) lead.textContent = "I can run a demo check, but I need the record to use. Nothing here calls a live registry.";
      if (ask) ask.textContent = "Which should I open — Apex Nordic Logistics, Northstar Trading Ltd., or a person such as Jane Doe?";
    }
    later(function () { if (typing) typing.hidden = false; }, 280);
    later(function () {
      if (typing) typing.hidden = true;
      show("ask");
      step = "choose";
    }, 900);
  }

  function runInvestigation(company) {
    paintStory(company);
    hideFollow();
    var late = beat("working") && beat("working").querySelector("[data-d1-late]");
    if (late) late.hidden = true;
    later(function () { if (typing) typing.hidden = false; }, 350);
    later(function () {
      if (typing) typing.hidden = true;
      var lead = thread.querySelector("[data-d1-ai-lead]");
      var ask = thread.querySelector("[data-d1-ai-ask]");
      if (lead) lead.textContent = company.lead;
      if (ask) ask.textContent = company.ask;
      show("ask");
    }, 1100);
    later(function () {
      show("working");
      fillTo("working", 22);
    }, 1900);
    later(function () {
      if (late) late.hidden = false;
      fillTo("working", 70);
    }, 2800);
    later(function () {
      var working = beat("working");
      if (working) working.classList.remove("is-on");
      show("done");
      fillTo("done", 100);
      show("report");
      step = "reported";
      showFollow();
    }, 3900);
  }

  function runLinks() {
    hideFollow();
    step = "linking";
    var block = beat("linking");
    var late = block && block.querySelector("[data-d1-late]");
    if (late) late.hidden = true;
    if (block) {
      var bar = block.querySelector(".d1-progress__fill");
      if (bar) bar.style.width = "0";
    }
    later(function () { if (typing) typing.hidden = false; }, 280);
    later(function () {
      if (typing) typing.hidden = true;
      show("linking");
      fillTo("linking", 28);
    }, 900);
    later(function () {
      if (late) late.hidden = false;
      fillTo("linking", 74);
    }, 1800);
    later(function () {
      if (block) block.classList.remove("is-on");
      var lead = document.querySelector("[data-d1-table-lead]");
      if (lead) lead.textContent = "Three transactions are connected to Apex Nordic Logistics. Open a row for the KYC, device, or bank result.";
      show("table");
      step = "linked";
      setSuggestions(LINK_SUGGESTIONS);
      showFollow();
    }, 2800);
  }

  function runPerson(text) {
    var jane = /jane/i.test(text);
    var reply = jane
      ? "Jane Doe’s document and selfie match. This is fictional KYC demo data for Canada — no live check was run."
      : "Daniel Reyes was declined on 1 Mar 2026 in KYC Documents. The outcome on that transaction is Not Verified.";
    later(function () { if (typing) typing.hidden = false; }, 280);
    later(function () {
      if (typing) typing.hidden = true;
      if (beat("ask").classList.contains("is-on")) {
        appendAi(reply + (jane ? "" : " The same device (235252021) and account ••4417 also appear on Meridian Apex Consulting Ltd."));
      } else {
        var lead = thread.querySelector("[data-d1-ai-lead]");
        var ask = thread.querySelector("[data-d1-ai-ask]");
        if (lead) lead.textContent = reply;
        if (ask) ask.textContent = jane
          ? "Say if you want me to compare her with the Meridian Apex transactions."
          : "The same device (235252021) and account ••4417 also appear on Meridian Apex Consulting Ltd.";
        show("ask");
      }
      step = "reported";
      showFollow();
    }, 1000);
  }

  function onSend(text, agent) {
    hideFollow();
    if (typing) typing.hidden = true;

    if (step === "start") {
      var user = thread.querySelector("[data-d1-user-text]");
      if (user) user.textContent = text;
      show("user");
      var company = namedCompany(text);
      if (isPerson(text, agent) && !company) runPerson(text);
      else if (company) runInvestigation(company);
      else askWhich(text);
      return;
    }

    if (step === "choose") {
      var chosen = namedCompany(text);
      appendUser(text);
      if (isPerson(text, agent) && !chosen) runPerson(text);
      else runInvestigation(chosen || APEX);
      return;
    }

    if (step === "linking") return;

    appendUser(text);
    if (step === "reported" && wantsLinks(text)) {
      runLinks();
      return;
    }
    if (step === "linked" && wantsLinks(text)) {
      later(function () { if (typing) typing.hidden = false; }, 280);
      later(function () {
        if (typing) typing.hidden = true;
        appendAi("Those three are already in the table: Jane Doe's KYC document, device 3045489E05849546, and account ••4417. Open a row to see the result.");
        showFollow();
      }, 800);
      return;
    }
    if (/daniel|declined|transaction/i.test(text) && step !== "reported") {
      later(function () { if (typing) typing.hidden = false; }, 280);
      later(function () {
        if (typing) typing.hidden = true;
        show("table");
        showFollow();
      }, 1000);
      return;
    }
    var reply = activeReplies[text] || REPLIES[text] || "I'll stay on Apex Nordic Logistics. Ask whether the registered office matches, who the director is, or what to request before onboarding.";
    later(function () { if (typing) typing.hidden = false; }, 280);
    later(function () {
      if (typing) typing.hidden = true;
      appendAi(reply);
      showFollow();
    }, 900);
  }

  composer.addEventListener("d1-composer:submit", function (event) {
    var detail = event.detail || {};
    var file = detail.attachments && detail.attachments[0];
    var text = detail.text || (file && file.name) || "";
    stage.setAttribute("data-d1-stage", "chat");
    if (!titled && title) {
      title.textContent = text || "Chat heading/title";
      titled = true;
    }
    hideFollow();
    if (played) onSend(text, detail.agent);
    else {
      played = true;
      onSend(text, detail.agent);
    }
  });

  document.querySelectorAll("[data-d1-activity]").forEach(function (button) {
    button.addEventListener("click", function () {
      var body = button.parentElement.querySelector(".d1-activity__body");
      var open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", open ? "false" : "true");
      if (body) body.hidden = open;
    });
  });

  document.querySelectorAll("[data-d1-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var summary = button.closest(".d1-block");
      var copyText = summary ? summary.innerText : "";
      if (navigator.clipboard && copyText) navigator.clipboard.writeText(copyText);
    });
  });

  document.querySelectorAll("[data-d1-vote]").forEach(function (button) {
    button.addEventListener("click", function () {
      var pressed = button.getAttribute("aria-pressed") === "true";
      button.closest(".d1-actions").querySelectorAll("[data-d1-vote]").forEach(function (other) {
        other.setAttribute("aria-pressed", "false");
      });
      button.setAttribute("aria-pressed", pressed ? "false" : "true");
    });
  });

  document.querySelectorAll("[data-d1-demo]").forEach(function (button) {
    button.addEventListener("click", function () {
      var input = composer.querySelector("[data-d1-input]");
      var form = composer.querySelector("[data-d1-form]");
      var agentId = button.getAttribute("data-agent");
      var option = composer.querySelector('[data-d1-agent-option][data-agent="' + agentId + '"]');
      if (option) option.click();
      if (!input || !form) return;
      input.value = button.getAttribute("data-prompt") || "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      form.requestSubmit();
    });
  });

  document.querySelectorAll("[data-d1-suggest]").forEach(function (row) {
    row.addEventListener("click", function () {
      var input = composer.querySelector("[data-d1-input]");
      var form = composer.querySelector("[data-d1-form]");
      var label = row.querySelector("span");
      if (!input || !form || !label || step === "start" || step === "choose" || step === "linking") return;
      input.value = label.textContent.trim();
      input.dispatchEvent(new Event("input", { bubbles: true }));
      form.requestSubmit();
    });
  });

  document.querySelectorAll("[data-d1-new-chat]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (back) back.click();
    });
  });

  if (back) {
    back.addEventListener("click", function () {
      cancel();
      hideAll();
      played = false;
      step = "start";
      titled = false;
      stage.setAttribute("data-d1-stage", "home");
      var main = document.querySelector(".d1-main");
      if (main) main.setAttribute("data-d1-drawer", "closed");
      if (title) title.textContent = "Chat heading/title";
      thread.querySelectorAll(".d1-extra").forEach(function (extra) { extra.remove(); });
    });
  }
})();
