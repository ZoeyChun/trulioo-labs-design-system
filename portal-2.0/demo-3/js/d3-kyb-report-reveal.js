/* Demo 3 — Progressive Business Verification Report reveal.
   Selecting a Meridian match fades the map out and reveals the report
   with immediate identity + skeleton fields, filled step-by-step as
   chat investigation progress advances. */
(function () {
  var workspace = document.querySelector("[data-d3-workspace]");
  var detail = document.querySelector("[data-d3-kyb-detail]");
  var mapEl = document.querySelector("[data-d3-kyb-map]");
  var resumeCard = document.querySelector("[data-d3-kyb-resume]");
  if (!workspace || !detail || !resumeCard) return;

  var crumb = detail.querySelector(".d3-workspace__crumb");
  var pageTitle = detail.querySelector(".d3-workspace__title");
  var bizName = resumeCard.querySelector(".d3-workspace__biz-name");
  var bizTag = resumeCard.querySelector(".d1-tag");
  var detailCountry = document.querySelector("[data-d3-kyb-detail-country]");
  var detailTxId = document.querySelector("[data-d3-kyb-detail-txid]");
  var detailDate = document.querySelector("[data-d3-kyb-detail-date]");
  var overview = resumeCard.querySelector(".d3-kyb-overview");
  var lower = resumeCard.querySelector(".d3-kyb-lower");
  var hero = resumeCard.querySelector(".d3-kyb-hero");
  var heroMapHost = resumeCard.querySelector("[data-d3-kyb-hero-map]");
  var heroFallback = resumeCard.querySelector("[data-d3-kyb-hero-fallback]");
  var heroPin = resumeCard.querySelector("[data-d3-kyb-hero-pin]");

  var revealToken = 0;
  var heroMap = null;
  var heroMarker = null;
  var currentBiz = null;
  var FIELD_KEYS = [
    "industry",
    "regDate",
    "legalForm",
    "address",
    "status",
    "sizing",
    "regNumber",
    "taxId"
  ];

  /* Step → which overview fields unlock when that verification call lands. */
  var STEP_FIELDS = [
    ["industry", "regDate", "legalForm", "status"],
    ["address", "sizing", "regNumber", "taxId"],
    [] /* sanctions / alerts */
  ];

  function sleep(ms, token) {
    return new Promise(function (resolve) {
      window.setTimeout(function () {
        if (token !== revealToken) return resolve(false);
        resolve(true);
      }, ms);
    });
  }

  function reportData(biz) {
    var base = biz.report || {};
    return {
      industry: base.industry || "Registered under NAICS 541611",
      industryNote:
        base.industryNote ||
        "(management consulting activities), a catch-all code. No evidence of active trading, clients, or revenue.",
      regDate: base.regDate || "Incorporated Feb 1, 2019 (Delaware)",
      legalForm: base.legalForm || "Private company limited by shares",
      address: base.address || biz.addr,
      status: base.status || biz.status || "Active",
      sizing: base.sizing || "0 employees; $1 authorized / $1 paid-in capital.",
      regNumber: base.regNumber || biz.reg,
      taxId: base.taxId || "EIN 34-1209876",
      phone: base.phone || "+1 (212) 555-0148",
      email: base.email || "info@" + (biz.name || "company").toLowerCase().replace(/[^a-z0-9]+/g, "") + ".com",
      country: base.country || biz.country || "United States",
      sumA:
        base.sumA ||
        biz.name +
          " is an active " +
          (biz.country || "United States") +
          " company at " +
          biz.addr +
          ".",
      calls: base.calls || [
        {
          label: "Pulling business registry records…",
          done: "Matched registry records",
          ms: 1100,
          detail: [
            biz.name,
            biz.reg + " — status " + (biz.status || "Active"),
            biz.city
          ]
        },
        {
          label: "Parsing incorporation and ownership…",
          done: "Incorporation and ownership parsed",
          ms: 1200,
          detail: [biz.addr, "Legal form confirmed"]
        },
        {
          label: "Screening directors against OFAC, UN, and EU…",
          done: "No sanctions matches found",
          ms: 1300,
          detail: ["OFAC — clear", "UN / EU — clear"]
        }
      ]
    };
  }

  function setSurface(mode) {
    if (window.D3KybResume && window.D3KybResume.setSurface) {
      window.D3KybResume.setSurface(mode);
    } else {
      workspace.setAttribute("data-d3-kyb-surface", mode);
    }
  }

  function ensureFieldHooks() {
    if (overview && overview.querySelector("[data-d3-field]")) return;
    /* Map known values into data-d3-field hooks if markup is static. */
    var values = overview ? overview.querySelectorAll(".d3-kyb-overview__value, .d3-kyb-overview__note") : [];
    var map = [
      "industry",
      "industryNote",
      "regDate",
      "legalForm",
      "address",
      "status",
      "sizing",
      "regNumber",
      "taxId"
    ];
    var vi = 0;
    values.forEach(function (el) {
      if (el.getAttribute("data-d3-field")) return;
      if (vi < map.length) {
        el.setAttribute("data-d3-field", map[vi]);
        vi += 1;
      }
    });
  }

  function setFieldSkeleton(on) {
    ensureFieldHooks();
    FIELD_KEYS.concat(["industryNote"]).forEach(function (key) {
      var el = resumeCard.querySelector('[data-d3-field="' + key + '"]');
      if (!el) return;
      if (on) {
        el.classList.add("is-skeleton");
        el.classList.remove("is-revealed");
        if (key === "status") {
          el.classList.remove("d3-kyb-overview__value--ok");
          el.textContent = "";
        } else if (key !== "industryNote") {
          el.textContent = "";
        } else {
          el.textContent = "";
        }
      }
    });
    if (lower) {
      lower.classList.toggle("is-skeleton", on);
      lower.setAttribute("aria-busy", on ? "true" : "false");
    }
  }

  function revealField(key, htmlOrText, asHtml) {
    var el = resumeCard.querySelector('[data-d3-field="' + key + '"]');
    if (!el) return;
    el.classList.remove("is-skeleton");
    el.classList.add("is-revealed");
    if (key === "status") {
      el.classList.add("d3-kyb-overview__value--ok");
      el.innerHTML =
        '<i class="fa-regular fa-circle-check" aria-hidden="true"></i> ' +
        (htmlOrText || "Active");
    } else if (asHtml) {
      el.innerHTML = htmlOrText;
    } else {
      el.textContent = htmlOrText;
    }
  }

  function showHeroMap(biz) {
    if (!heroMapHost || typeof L === "undefined" || !biz || biz.lat == null || biz.lon == null) {
      if (heroFallback) heroFallback.hidden = false;
      if (heroPin) heroPin.hidden = false;
      if (heroMapHost) heroMapHost.hidden = true;
      return;
    }
    if (heroFallback) heroFallback.hidden = true;
    if (heroPin) heroPin.hidden = true;
    heroMapHost.hidden = false;

    if (!heroMap) {
      heroMap = L.map(heroMapHost, {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        tap: false
      });
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 16 }
      ).addTo(heroMap);
    }

    if (heroMarker) {
      try {
        heroMap.removeLayer(heroMarker);
      } catch (e) {}
      heroMarker = null;
    }

    var icon = L.divIcon({
      className: "d3-kyb-biz-icon",
      html:
        '<span class="d3-kyb-biz-marker is-active" aria-hidden="true"></span>',
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    });
    heroMarker = L.marker([biz.lat, biz.lon], {
      icon: icon,
      interactive: false,
      keyboard: false
    }).addTo(heroMap);

    heroMap.setView([biz.lat, biz.lon], 12, { animate: false });
    window.setTimeout(function () {
      if (heroMap) heroMap.invalidateSize({ animate: false });
    }, 60);
    window.setTimeout(function () {
      if (heroMap) heroMap.invalidateSize({ animate: false });
    }, 360);
  }

  function prepareReportChrome(biz) {
    workspace.classList.add("has-incomplete");
    resumeCard.hidden = false;
    resumeCard.classList.add("is-live");
    var fresh = workspace.querySelector("[data-d3-kyb-fresh]");
    if (fresh) fresh.hidden = true;

    if (window.D3KybResume && window.D3KybResume.renderCrumbs) {
      window.D3KybResume.renderCrumbs("report", biz.name);
    } else if (crumb) {
      crumb.hidden = false;
      crumb.innerHTML =
        '<button type="button" class="d3-workspace__crumb-link" data-d3-crumb="kyb">KYB Verification</button>' +
        '<span class="d3-workspace__crumb-sep" aria-hidden="true"> / </span>' +
        '<span class="d3-workspace__crumb-current" data-d3-kyb-crumb-biz></span>';
      var crumbBiz = crumb.querySelector("[data-d3-kyb-crumb-biz]");
      if (crumbBiz) crumbBiz.textContent = biz.name;
    }
    /* Company name appears immediately in the report identity block. */
    if (pageTitle) pageTitle.hidden = true;
    if (bizName) bizName.textContent = biz.name;
    if (bizTag) {
      bizTag.textContent = "Verifying…";
      bizTag.className = "d1-tag d1-tag--review";
    }
    var detailsBtn = detail.querySelector("[data-d3-kyb-details]");
    if (detailsBtn) detailsBtn.hidden = false;
    var exportBtn = detail.querySelector("[data-d3-kyb-export]");
    if (exportBtn) exportBtn.hidden = false;

    var countryName = biz.country || "United States";
    var cc = String(biz.cc || biz.countryCode || "US").toLowerCase();
    var txId =
      biz.transactionId ||
      biz.txId ||
      "8c2f4e7a-19bd-4f02-a6c1-77de42915b3a";
    var dateLabel =
      biz.date ||
      new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
      }).format(new Date());

    if (detailCountry) {
      detailCountry.textContent = countryName + " ";
      var flag = document.createElement("span");
      flag.className = "fi fi-" + cc + " d3-workspace__flag";
      flag.setAttribute("aria-hidden", "true");
      detailCountry.appendChild(flag);
    }
    if (detailTxId) {
      detailTxId.textContent = txId;
      detailTxId.setAttribute("title", txId);
    }
    if (detailDate) detailDate.textContent = dateLabel;

    selectTab("overview", { silent: true });
    renderOwnershipPanel(biz);
    renderRawPanel(biz);
    if (window.D3KybResultTabs && window.D3KybResultTabs.renderAll) {
      window.D3KybResultTabs.renderAll(resumeCard, biz);
    } else {
      renderSignalsPanel(biz);
    }
    renderAlerts(biz);

    if (hero) {
      hero.classList.remove("is-revealed");
      hero.classList.add("is-pending");
    }
    setFieldSkeleton(true);
    ["phone", "email"].forEach(function (key) {
      var el = resumeCard.querySelector('[data-d3-field="' + key + '"]');
      if (!el) return;
      el.classList.add("is-skeleton");
      el.classList.remove("is-revealed", "d3-kyb-overview__value--ok");
      el.textContent = "";
    });
  }

  function appendTurn(role, text) {
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return;
    var section = document.createElement("section");
    section.className = "d1-turn d1-enter";
    if (role === "user") {
      section.innerHTML = '<div class="d1-user"><p></p></div>';
    } else {
      section.innerHTML = '<div class="d1-ai d1-block"><p></p></div>';
    }
    section.querySelector("p").textContent = text;
    thread.appendChild(section);
    thread.scrollTop = thread.scrollHeight;
  }

  function cloneTpl(name) {
    var tpl = document.querySelector('[data-d1-tpl="' + name + '"]');
    if (!tpl) return null;
    return tpl.content.firstElementChild.cloneNode(true);
  }

  async function playInvestigation(biz, data, token) {
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return;

    var tools = cloneTpl("tools");
    if (!tools) return;
    var label = tools.querySelector("[data-d1-tools-label]");
    var pct = tools.querySelector(".d1-progress__pct");
    var fill = tools.querySelector(".d1-progress__fill");
    var check = tools.querySelector("[data-d1-tools-check]");
    var steps = tools.querySelector("[data-d1-steps]");
    label.textContent = "Investigating";
    thread.appendChild(tools);
    thread.scrollTop = thread.scrollHeight;

    var calls = data.calls;
    var rows = [];

    for (var i = 0; i < calls.length; i += 1) {
      if (token !== revealToken) return;
      var call = calls[i];

      rows.forEach(function (prev) {
        prev.toggle.classList.remove("d1-activity__toggle--current");
        prev.toggle.setAttribute("aria-expanded", "false");
        prev.body.hidden = true;
      });

      var row = cloneTpl("activity");
      if (!row) continue;
      var toggle = row.querySelector(".d1-activity__toggle");
      var body = row.querySelector(".d1-activity__body");
      var detailEl = row.querySelector("[data-d1-activity-detail]");
      row.querySelector("[data-d1-activity-label]").textContent = call.label;
      if (!call.detail || !call.detail.length) {
        row.classList.add("is-bare");
        body.hidden = true;
      }
      steps.appendChild(row);
      rows.push({ toggle: toggle, body: body });
      thread.scrollTop = thread.scrollHeight;

      pct.textContent = Math.round((i / calls.length) * 100) + "%";
      fill.style.width = Math.round((i / calls.length) * 100) + "%";

      var lines = call.detail || [];
      var slice = lines.length ? call.ms / (lines.length + 1) : call.ms;
      for (var j = 0; j < lines.length; j += 1) {
        if (!(await sleep(slice, token))) return;
        var p = document.createElement("p");
        p.textContent = lines[j];
        detailEl.appendChild(p);
        thread.scrollTop = thread.scrollHeight;
      }
      if (!(await sleep(slice, token))) return;

      var running = row.querySelector('[data-d1-mark="run"]');
      var finished = row.querySelector('[data-d1-mark="done"]');
      if (running) running.hidden = true;
      if (finished) finished.hidden = false;
      if (call.done) row.querySelector("[data-d1-activity-label]").textContent = call.done;

      pct.textContent = Math.round(((i + 1) / calls.length) * 100) + "%";
      fill.style.width = Math.round(((i + 1) / calls.length) * 100) + "%";

      /* Unlock matching report fields as each verification call completes. */
      revealStepFields(i, data);
      if (i === 0 && hero) {
        hero.classList.remove("is-pending");
        hero.classList.add("is-revealed");
        if (heroMap) {
          window.setTimeout(function () {
            heroMap.invalidateSize({ animate: false });
          }, 40);
        }
      }
    }

    if (token !== revealToken) return;
    label.textContent = "Investigation complete";
    fill.classList.remove("d1-progress__fill--active");
    fill.classList.add("d1-progress__fill--done");
    if (check) check.hidden = false;

    /* Collapse all steps so the chat stays compact after completion. */
    rows.forEach(function (prev) {
      prev.toggle.classList.remove("d1-activity__toggle--current");
      prev.toggle.setAttribute("aria-expanded", "false");
      prev.body.hidden = true;
    });

    if (bizTag) {
      if (biz.riskLevel === "high" || (biz.risks && biz.risks.some(function (r) { return r.severity === "high"; }))) {
        bizTag.textContent = "Needs review";
        bizTag.className = "d1-tag d1-tag--review";
      } else if (biz.riskLevel === "medium") {
        bizTag.textContent = "Verified · review notes";
        bizTag.className = "d1-tag d1-tag--review";
      } else {
        bizTag.textContent = "Verified";
        bizTag.className = "d1-tag d1-tag--positive";
      }
    }
    if (lower) {
      lower.classList.remove("is-skeleton");
      lower.classList.add("is-revealed");
      lower.setAttribute("aria-busy", "false");
      var phone = lower.querySelector(".d3-kyb-comms [data-d3-field=\"phone\"]");
      var email = lower.querySelector(".d3-kyb-comms [data-d3-field=\"email\"]");
      if (phone) {
        phone.classList.remove("is-skeleton");
        phone.innerHTML =
          '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M3.5 2.75c0-.4.3-.75.7-.75h1.6c.3 0 .58.2.68.48l.7 2a.75.75 0 0 1-.2.8L5.9 6.5a9.5 9.5 0 0 0 3.6 3.6l1.22-1.08a.75.75 0 0 1 .8-.2l2 .7c.28.1.48.38.48.68v1.6c0 .4-.35.7-.75.7A10.75 10.75 0 0 1 3.5 2.75Z"/></svg> ' + data.phone;
        phone.classList.add("d3-kyb-overview__value--ok", "is-revealed");
      }
      if (email) {
        email.classList.remove("is-skeleton");
        email.innerHTML =
          '<i class="fa-regular fa-envelope" aria-hidden="true"></i> ' +
          '<a class="d3-kyb-link" href="mailto:' +
          data.email +
          '">' +
          data.email +
          "</a>";
        email.classList.add("d3-kyb-overview__value--ok", "is-revealed");
      }
    }

    appendReportCard(biz, data);
  }

  function appendReportCard(biz, data) {
    var thread = document.querySelector("[data-d1-thread]");
    if (!thread) return;
    var node = cloneTpl("report");
    if (!node) {
      appendTurn(
        "assistant",
        data.sumA ||
          biz.name +
            " is an active United States company at " +
            biz.addr +
            ". Overview is ready on the right."
      );
      return;
    }

    var title = node.querySelector("[data-d1-co]");
    if (title) title.textContent = biz.name;

    var tag = node.querySelector("[data-d1-report-tag]");
    if (tag) {
      if (biz.riskLevel === "high") {
        tag.textContent = "Needs review";
        tag.className = "d1-tag d1-tag--review";
      } else if (biz.riskLevel === "medium") {
        tag.textContent = "Verified · review notes";
        tag.className = "d1-tag d1-tag--review";
      } else {
        tag.textContent = "Verified";
        tag.className = "d1-tag d1-tag--positive";
      }
    }

    var sumA = node.querySelector("[data-d1-sum-a]");
    var sumB = node.querySelector("[data-d1-sum-b]");
    if (sumA) {
      sumA.textContent =
        data.sumA ||
        biz.name + " is an active United States company at " + biz.addr + ".";
    }
    if (sumB) {
      var risks = biz.risks || [];
      if (risks.length) {
        sumB.hidden = false;
        sumB.textContent =
          "Key follow-up: " +
          risks
            .map(function (r) {
              return r.label;
            })
            .join("; ") +
          ".";
      } else {
        sumB.hidden = true;
        sumB.textContent = "";
      }
    }

    var exportBtn = node.querySelector("[data-d1-report-export], .d1-alert__export");
    if (exportBtn) {
      exportBtn.addEventListener("click", function () {
        var pageExport = document.querySelector("[data-d3-kyb-export]");
        if (pageExport && !pageExport.hidden) {
          pageExport.click();
          return;
        }
        document.dispatchEvent(
          new CustomEvent("d3-kyb:export", { detail: { biz: biz } })
        );
      });
    }

    thread.appendChild(node);
    thread.scrollTop = thread.scrollHeight;
  }

  function revealStepFields(stepIndex, data) {
    var keys = STEP_FIELDS[stepIndex] || [];
    keys.forEach(function (key) {
      if (key === "industry") {
        revealField("industry", data.industry);
        revealField("industryNote", data.industryNote);
      } else if (key === "status") {
        revealField("status", data.status);
      } else {
        revealField(key, data[key]);
      }
    });
  }

  async function fadeMapThenShowReport() {
    if (mapEl) {
      mapEl.classList.add("is-fading");
      await new Promise(function (r) {
        window.setTimeout(r, 320);
      });
    }
    setSurface("report");
    detail.hidden = false;
    detail.classList.remove("is-entering");
    void detail.offsetWidth;
    detail.classList.add("is-entering");
    if (mapEl) mapEl.classList.remove("is-fading");
  }

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function selectTab(id, opts) {
    opts = opts || {};
    var tab = resumeCard.querySelector('[data-d3-kyb-tab="' + id + '"]');
    if (!tab) return false;
    resumeCard.querySelectorAll("[data-d3-kyb-tab]").forEach(function (t) {
      var on = t === tab;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    resumeCard.querySelectorAll("[data-d3-kyb-panel]").forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-d3-kyb-panel") !== id;
    });
    if (!opts.silent) {
      var panel = resumeCard.querySelector('[data-d3-kyb-panel="' + id + '"]');
      if (panel) {
        panel.classList.remove("d3-kyb-panel--flash");
        void panel.offsetWidth;
        panel.classList.add("d3-kyb-panel--flash");
      }
    }
    /* Remount when the panel becomes visible so the React graph gets real size. */
    if (id === "ownership" && currentBiz) {
      window.requestAnimationFrame(function () {
        mountOwnershipGraph(currentBiz);
      });
    }
    return true;
  }

  function mountOwnershipGraph(biz) {
    var panel = resumeCard.querySelector('[data-d3-kyb-panel="ownership"]');
    if (!panel || !biz || !window.D3KybUboGraph) return false;
    if (!window.KybUboGraph || !window.KybUboGraph.mount) {
      console.warn("[D3KybReport] KybUboGraph bundle not loaded");
      return false;
    }
    return window.D3KybUboGraph.mountInto(panel, biz);
  }

  function renderOwnershipPanel(biz) {
    var panel = resumeCard.querySelector('[data-d3-kyb-panel="ownership"]');
    if (!panel) return;

    if (window.D3KybUboGraph && window.D3KybUboGraph.unmountFrom) {
      window.D3KybUboGraph.unmountFrom(panel);
    }

    var graph =
      window.D3KybUboGraph && window.D3KybUboGraph.graphFromBiz
        ? window.D3KybUboGraph.graphFromBiz(biz)
        : null;

    if (!graph || !graph.tree) {
      panel.innerHTML =
        '<p class="d3-workspace__hint">No ownership / UBO records are available for this entity in the demo dataset.</p>';
      return;
    }

    panel.innerHTML =
      window.D3KybUboGraph && window.D3KybUboGraph.panelMarkup
        ? window.D3KybUboGraph.panelMarkup("Ownership / UBO")
        : "";

    /*
     * Always mount after markup is in place. Hidden panels get a second
     * remount from selectTab once Ownership / UBO is shown (for real size).
     */
    window.requestAnimationFrame(function () {
      mountOwnershipGraph(biz);
    });
  }

  function formalBusinessName(name) {
    var formal = String(name || "").replace(/\.\s*$/, "");
    return formal.replace(/\binc$/i, "Incorporated").replace(/\bcorp$/i, "Corporation");
  }

  function emailDomainFromBiz(biz) {
    var email = (biz.report && biz.report.email) || biz.email || "";
    var at = email.indexOf("@");
    if (at > 0) return email.slice(at + 1);
    var slug = String(biz.name || "business")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 28);
    return (slug || "business") + ".com";
  }

  function buildRawJsonText(biz) {
    var name = biz.name || "Business";
    var registered = formalBusinessName(name);
    var phone =
      (biz.report && biz.report.phone) || biz.phone || "+1 302 555 0000";
    var email =
      (biz.report && biz.report.email) ||
      biz.email ||
      "info@" + emailDomainFromBiz(biz);
    var block =
      "{\n" +
      '  "StandardizedBusinessNames": { "StandardizedBusinessName": [\n' +
      '    { "Name": ' +
      JSON.stringify(name) +
      ', "Type": "Input Business Name", "UsedForMatching": true },\n' +
      '    { "Name": ' +
      JSON.stringify(registered) +
      ', "Type": "Returned Registered Name", "UsedForMatching": true }\n' +
      "  ]},\n" +
      '  "StandardizedCommunication": { "StandardizedCommunication": [\n' +
      '    { "Value": ' +
      JSON.stringify(phone) +
      ', "Type": "Telephone" },\n' +
      '    { "Value": ' +
      JSON.stringify(email) +
      ', "Type": "Primary business email" }\n' +
      "  ]}\n" +
      "}";
    /* Match KYB Results demo: repeated payload blocks in the raw view. */
    return [block, block, block, block, block].join("\n\n");
  }

  function bindRawCopy(panel) {
    var btn = panel.querySelector("[data-d3-kyb-json-copy]");
    if (!btn || btn.dataset.d3Bound) return;
    btn.dataset.d3Bound = "1";
    btn.addEventListener("click", function () {
      var pre = panel.querySelector("[data-d3-kyb-raw-pre]");
      if (!pre) return;
      var text = pre.textContent || "";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(function () {});
        return;
      }
      var field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      try {
        document.execCommand("copy");
      } catch (e) {
        /* ignore */
      }
      document.body.removeChild(field);
    });
  }

  function renderRawPanel(biz) {
    var panel = resumeCard.querySelector('[data-d3-kyb-panel="raw"]');
    if (!panel || !biz) return;
    var pre = panel.querySelector("[data-d3-kyb-raw-pre]");
    if (!pre) {
      panel.innerHTML =
        '<div class="d3-kyb-raw">' +
        '<h3 class="d3-kyb-overview__title">Raw Data</h3>' +
        '<div class="kyb-json-panel">' +
        '<div class="kyb-json-panel__header">' +
        '<span class="kyb-json-panel__lang">json</span>' +
        '<button class="tds-btn tds-btn--secondary tds-btn--sm" type="button" data-d3-kyb-json-copy aria-label="Copy raw JSON">' +
        '<span class="tds-btn__leading-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="5.5" y="5.5" width="8" height="8" rx="1"/><path d="M10.5 5.5V4a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5"/></svg></span>' +
        "Copy</button></div>" +
        '<div class="kyb-json-panel__body"><pre class="kyb-json-panel__pre" data-d3-kyb-raw-pre></pre></div>' +
        "</div></div>";
      pre = panel.querySelector("[data-d3-kyb-raw-pre]");
    }
    if (pre) pre.textContent = buildRawJsonText(biz);
    bindRawCopy(panel);
  }

  function renderAlerts(biz) {
    var chips = resumeCard.querySelector(".d3-kyb-alerts__chips");
    if (!chips) return;
    var a = biz.alerts || {};
    var rows = [
      ["Adverse Media", a.adverseMedia || "None found"],
      ["Sanctions", a.sanctions || "None found"],
      ["Litigation", a.litigation || "None found"],
      ["Positive Press", a.positivePress || "None found"]
    ];
    chips.innerHTML = rows
      .map(function (row) {
        var warn = row[1] && !/^none/i.test(row[1]);
        return (
          '<span class="d3-kyb-chip' +
          (warn ? " d3-kyb-chip--warn" : "") +
          '"><i class="fa-regular fa-circle-check" aria-hidden="true"></i> ' +
          esc(row[0]) +
          ": " +
          esc(row[1]) +
          "</span>"
        );
      })
      .join("");
  }

  function renderSignalsPanel(biz) {
    var panel = resumeCard.querySelector('[data-d3-kyb-panel="signals"]');
    if (!panel) return;
    var risks = biz.risks || [];
    if (!risks.length) {
      panel.innerHTML =
        '<p class="d3-workspace__hint">No elevated match signals for ' +
        esc(biz.name) +
        " in this demo dataset.</p>";
      return;
    }
    var html =
      '<div class="d3-kyb-signals"><h3 class="d3-kyb-overview__title">Match Signals</h3><ul class="d3-kyb-signals__list">';
    risks.forEach(function (r) {
      html +=
        '<li class="d3-kyb-signals__item d3-kyb-signals__item--' +
        esc(r.severity || "medium") +
        '">' +
        '<span class="d3-kyb-signals__label">' +
        esc(r.label) +
        "</span>" +
        '<span class="d3-kyb-signals__evidence">' +
        esc(r.evidence) +
        "</span></li>";
    });
    html += "</ul></div>";
    panel.innerHTML = html;
  }

  async function reveal(biz) {
    if (!biz) return;
    currentBiz = biz;
    if (window.D3KybMapSearch && window.D3KybMapSearch.setSelected) {
      window.D3KybMapSearch.setSelected(biz);
    }
    revealToken += 1;
    var token = revealToken;
    var data = reportData(biz);

    document.dispatchEvent(new CustomEvent("d3-kyb:park-composer"));
    if (window.D3Nav) window.D3Nav.markChatActive();

    /* Collapse search cards so investigation progress stays in view. */
    document.querySelectorAll(".d3-kyb-similar, .d3-kyb-cand-panel").forEach(function (el) {
      el.hidden = true;
    });

    /* 1) Zoom map to the selected business while still on the map surface. */
    if (window.D3KybMapSearch && window.D3KybMapSearch.focusBusiness) {
      setSurface("map");
      if (mapEl) mapEl.classList.remove("is-fading");
      await window.D3KybMapSearch.focusBusiness(biz, {
        zoom: 12,
        duration: 1.05,
        holdMs: 420
      });
      if (token !== revealToken) return;
    }

    /* 2) Prepare report chrome, fade the map, then reveal. */
    prepareReportChrome(biz);
    await fadeMapThenShowReport();
    if (token !== revealToken) return;
    /* Drop the submit handoff loader once the report chrome is on screen. */
    document.dispatchEvent(
      new CustomEvent("d3-kyb:verify-ui-ready", { detail: { biz: biz } })
    );
    /* Init Leaflet after the report surface is visible so tiles size correctly. */
    showHeroMap(biz);

    await playInvestigation(biz, data, token);
    document.dispatchEvent(
      new CustomEvent("d3-kyb:report-ready", { detail: { biz: biz } })
    );
  }

  /* Bind Copy on the static Raw Data shell before a verify runs. */
  var rawShell = resumeCard.querySelector('[data-d3-kyb-panel="raw"]');
  if (rawShell) bindRawCopy(rawShell);

  window.D3KybReport = {
    reveal: reveal,
    selectTab: selectTab,
    renderOwnershipPanel: renderOwnershipPanel,
    renderRawPanel: renderRawPanel,
    getCurrent: function () {
      return currentBiz;
    }
  };
})();
