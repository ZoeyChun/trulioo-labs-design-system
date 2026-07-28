/* ============================================================
   Electronic ID — result view
   Shared end-state for both flows (iDIN + simulated). Renders the
   Identity Data table + the Device Intelligence evidence, initialises
   the risk-score gauges, and wires the tabs / accordions / sidebar.
   Reuses the Document Verification result styles (.dv-*). Static
   demo data; wire up real results in your own app.
   ============================================================ */
(function (global) {
  "use strict";

  function byId(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* --- Icons --------------------------------------------------------- */
  var ICON_PASS = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M5.4 8.2l1.8 1.8 3.4-3.8"/></svg>';
  var ICON_RISK = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 2.2l6 10.6H2L8 2.2z"/><path d="M8 6.4v3M8 11.1v.4"/></svg>';
  var ICON_NORISK = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M5.4 8.2l1.8 1.8 3.4-3.8"/></svg>';
  var ICON_NOTRUN = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M5.5 8h5"/></svg>';
  var ICON_CHEVRON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 4l4 4-4 4"/></svg>';
  var ICON_PLUS = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg>';

  /* --- Data ---------------------------------------------------------- */
  var IDENTITY_ROWS = [
    "Name", "Address", "Gender", "Date of Birth", "Email Address", "Phone Number"
  ];

  var DEVICE = {
    score: 8,
    risk: "high",
    riskLabel: "High Risk",
    summary: "Strong indicators of suspicious or fraudulent behavior. Immediate review or action is recommended.",
    deviceId: "3045489E05849546",
    createdLabel: "Created At",
    createdValue: "05 July 2026, 3:30pm",
    indicators: [
      "Persona HIGH - confidence 57/100 - 1 signals - 1 errors",
      "Velocity anomaly across ES → RU → SE",
      "Linked to 3 different identities"
    ],
    deviceDetails: [
      { label: "Operating System", value: "Android 13" },
      { label: "Browser", value: "Chrome 126" },
      { label: "IP Address", value: "185.42.108.14" },
      { label: "Connection", value: "Mobile / Cellular" },
      { label: "Timezone", value: "Europe/Amsterdam" }
    ],
    evidence: [
      {
        key: "risk-outputs", label: "Risk Outputs",
        rows: [
          { title: "Device Risk Level", desc: "Device risk level for the session based on available signals.", result: "High", insight: "Risk" },
          { title: "Device Risk Level", desc: "Device risk level for the session based on available signals.", result: "High", insight: "Risk" },
          { title: "Device Risk Level", desc: "Device risk level for the session based on available signals.", result: "High", insight: "Risk" },
          { title: "Device Risk Level", desc: "Device risk level for the session based on available signals.", result: "High", insight: "Risk" }
        ]
      },
      {
        key: "network-location", label: "Network & Location",
        rows: [
          { title: "IP Reputation", desc: "Reputation of the originating IP address.", result: "Suspicious", insight: "Risk" },
          { title: "Proxy / VPN Detection", desc: "Anonymising network detected on the session.", result: "Detected", insight: "Risk" },
          { title: "Geolocation Consistency", desc: "IP geolocation vs. declared region.", result: "Consistent", insight: "No Risk" },
          { title: "ISP Classification", desc: "Type of network provider.", result: "Residential", insight: "No Risk" },
          { title: "DNS Leak", desc: "DNS resolver leakage check.", result: "Not evaluated", insight: "Not Run" }
        ]
      },
      {
        key: "integrity-compromise", label: "Integrity & Compromise",
        rows: [
          { title: "Emulator Detection", desc: "Signals of a virtualised device.", result: "Detected", insight: "Risk" },
          { title: "Root / Jailbreak", desc: "Elevated OS privileges detected.", result: "Detected", insight: "Risk" },
          { title: "App Tampering", desc: "Integrity of the running application.", result: "Intact", insight: "No Risk" },
          { title: "Debugger Attached", desc: "Active debugging tools on the device.", result: "None", insight: "No Risk" },
          { title: "Hooking Framework", desc: "Runtime instrumentation frameworks.", result: "Not evaluated", insight: "Not Run" }
        ]
      },
      {
        key: "device-identity", label: "Device Identity & History",
        rows: [
          { title: "Device Age", desc: "How long the device has been observed.", result: "New", insight: "Risk" },
          { title: "Identity Linkage", desc: "Distinct identities seen on this device.", result: "3 identities", insight: "Risk" },
          { title: "Device Fingerprint", desc: "Stability of the device fingerprint.", result: "Stable", insight: "No Risk" },
          { title: "Returning Device", desc: "Previously seen for this user.", result: "Recognised", insight: "No Risk" },
          { title: "SIM Swap", desc: "Recent SIM change on the number.", result: "Not evaluated", insight: "Not Run" }
        ]
      },
      {
        key: "behavioral", label: "Behavioral Biometrics",
        rows: [
          { title: "Typing Cadence", desc: "Keystroke dynamics vs. baseline.", result: "Anomalous", insight: "Risk" },
          { title: "Session Velocity", desc: "Speed of progression through the flow.", result: "Too fast", insight: "Risk" },
          { title: "Touch Pattern", desc: "Touch pressure and gesture pattern.", result: "Human-like", insight: "No Risk" },
          { title: "Copy / Paste", desc: "Use of paste on sensitive fields.", result: "Not used", insight: "No Risk" },
          { title: "Motion Sensors", desc: "Accelerometer / gyroscope signals.", result: "Not evaluated", insight: "Not Run" }
        ]
      },
      {
        key: "location-history", label: "Location History",
        rows: [
          { title: "Impossible Travel", desc: "Travel velocity across recent sessions.", result: "Detected", insight: "Risk" },
          { title: "Country Hopping", desc: "Multiple countries in a short window.", result: "ES → RU → SE", insight: "Risk" },
          { title: "Home Location", desc: "Consistency with the usual location.", result: "Consistent", insight: "No Risk" },
          { title: "Location Spoofing", desc: "Signals of falsified GPS.", result: "None", insight: "No Risk" },
          { title: "Travel Corridor", desc: "Known corridor for the account.", result: "Not evaluated", insight: "Not Run" }
        ]
      }
    ]
  };

  /* --- Render: Identity Data table ----------------------------------- */
  function renderIdentityTable() {
    var host = byId("eid-idtable");
    if (!host) return;
    var head =
      '<div class="eid-idtable__row eid-idtable__head">' +
      '<span class="eid-idtable__ch">Signal</span>' +
      '<span class="eid-idtable__ch">Result</span></div>';
    var rows = IDENTITY_ROWS.map(function (label) {
      return '<div class="eid-idtable__row">' +
        '<span class="eid-idtable__signal">' + esc(label) + "</span>" +
        '<span class="eid-idtable__result"><span class="eid-pass"><span class="eid-pass__icon">' +
        ICON_PASS + "</span>Pass</span></span></div>";
    }).join("");
    host.innerHTML = head + rows;
  }

  /* --- Render: Device Intelligence ----------------------------------- */
  function insightMarkup(insight) {
    if (insight === "Risk") {
      return '<span class="dv-di-insight dv-di-insight--risk"><span class="dv-di-insight__icon">' + ICON_RISK + "</span>Risk</span>";
    }
    if (insight === "No Risk") {
      return '<span class="dv-di-insight dv-di-insight--norisk"><span class="dv-di-insight__icon">' + ICON_NORISK + "</span>No Risk</span>";
    }
    return '<span class="dv-di-insight"><span class="dv-di-insight__icon">' + ICON_NOTRUN + "</span>Not Run</span>";
  }

  function groupBadges(rows) {
    var risk = 0, no = 0, notRun = 0;
    rows.forEach(function (r) {
      if (r.insight === "Risk") risk++;
      else if (r.insight === "No Risk") no++;
      else notRun++;
    });
    var out = "";
    if (risk) out += '<span class="tds-tag tds-tag--negative tds-tag--sm">' + risk + " Risk</span>";
    if (no) out += '<span class="tds-tag tds-tag--positive tds-tag--sm">' + no + " No Risk</span>";
    if (notRun) out += '<span class="tds-tag tds-tag--default tds-tag--sm">' + notRun + " Not Run</span>";
    return out;
  }

  function renderGroup(group, open) {
    var rows = group.rows.map(function (row) {
      return '<div class="dv-ditable__row">' +
        '<span class="dv-ditable__cell"><span class="eid-di-signal"><span class="dv-cell-title">' + esc(row.title) + "</span>" +
        '<span class="eid-di-sub">' + esc(row.desc) + "</span></span></span>" +
        '<span class="dv-ditable__cell dv-di-result">' + esc(row.result) + "</span>" +
        '<span class="dv-ditable__cell">' + insightMarkup(row.insight) + "</span></div>";
    }).join("");
    var body =
      '<div class="dv-ditable">' +
      '<div class="dv-ditable__head"><span class="dv-ditable__ch">Signal</span>' +
      '<span class="dv-ditable__ch">Result</span><span class="dv-ditable__ch">Insight</span></div>' +
      rows + "</div>";
    return '<div class="dv-group dv-collapsible' + (open ? " dv-collapsible--open" : "") + '" data-group-key="' + esc(group.key) + '">' +
      '<button class="dv-group__header dv-collapsible__header" type="button" aria-expanded="' + (open ? "true" : "false") + '">' +
      '<span class="dv-chevron" aria-hidden="true">' + ICON_CHEVRON + "</span>" +
      '<span class="dv-group__label">' + esc(group.label) + "</span>" +
      '<span class="dv-ni2-counts">' + groupBadges(group.rows) + "</span></button>" +
      '<div class="dv-collapsible__body"' + (open ? "" : " hidden") + ">" + body + "</div></div>";
  }

  function renderDevice() {
    var host = byId("eid-device-body");
    if (!host) return;
    var chips = DEVICE.indicators.map(function (c) {
      return '<div class="dv-di-chip">' + esc(c) + "</div>";
    }).join("");
    var details = DEVICE.deviceDetails.map(function (d) {
      return '<div class="dv-detail-row"><span class="dv-detail-label">' + esc(d.label) +
        '</span><span class="dv-detail-value">' + esc(d.value) + "</span></div>";
    }).join("");
    var evidence = DEVICE.evidence.map(function (g, i) {
      return renderGroup(g, i === 0);
    }).join("");

    host.innerHTML =
      '<div class="dv-di-top">' +
        '<div class="dv-di-summary">' +
          '<div class="dv-di-score">' +
            '<span class="dv-di-score__label">Risk Score</span>' +
            '<div class="dv-di-gauge" id="eid-device-gauge" data-score="' + DEVICE.score + '" data-max="10" data-risk="' + DEVICE.risk + '" data-label="' + esc(DEVICE.riskLabel) + '" data-show-percent="false"></div>' +
          "</div>" +
          '<div class="dv-di-detail">' +
            '<p class="dv-di-statement">' + esc(DEVICE.summary) + "</p>" +
            '<div class="dv-di-meta">' +
              '<div class="dv-di-meta__row"><span class="dv-di-meta__label">Device ID</span><span class="dv-di-meta__value">' + esc(DEVICE.deviceId) + "</span></div>" +
              '<div class="dv-di-meta__row"><span class="dv-di-meta__label">' + esc(DEVICE.createdLabel) + '</span><span class="dv-di-meta__value">' + esc(DEVICE.createdValue) + "</span></div>" +
            "</div>" +
            '<div class="dv-di-chips">' + chips + "</div>" +
          "</div>" +
        "</div>" +
        '<div class="dv-di-showinfo">' +
          '<button class="tds-btn tds-btn--secondary tds-btn--sm" type="button" aria-expanded="false">' +
          '<span class="tds-btn__leading-icon">' + ICON_PLUS + "</span>Show device information</button>" +
        "</div>" +
        '<div class="dv-di-details" hidden>' + details + "</div>" +
      "</div>" +
      '<span class="dv-di-evidence-label">Evidence</span>' +
      evidence;
  }

  /* --- Gauges -------------------------------------------------------- */
  function renderGauges(scope) {
    if (!global.ScoreGauge) return;
    (scope || document).querySelectorAll(".dv-di-gauge[data-score]").forEach(function (el) {
      global.ScoreGauge.render(el);
    });
  }

  /* --- Interactions -------------------------------------------------- */
  function initTabs(root) {
    var tabs = root.querySelectorAll(".dv-tab");
    var panels = root.querySelectorAll(".dv-tabpanel");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var name = tab.getAttribute("data-tab");
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle("dv-tab--active", on);
          t.setAttribute("aria-selected", String(on));
        });
        panels.forEach(function (p) {
          p.hidden = p.getAttribute("data-tab") !== name;
        });
      });
    });
  }

  function toggleCollapsible(header) {
    var group = header.closest(".dv-collapsible");
    if (!group) return;
    var body = group.querySelector(".dv-collapsible__body");
    var open = !group.classList.contains("dv-collapsible--open");
    group.classList.toggle("dv-collapsible--open", open);
    header.setAttribute("aria-expanded", String(open));
    if (body) body.hidden = !open;
  }

  function setAllGroups(root, open) {
    root.querySelectorAll("#eid-device-body .dv-collapsible").forEach(function (group) {
      var header = group.querySelector(".dv-collapsible__header");
      var body = group.querySelector(".dv-collapsible__body");
      group.classList.toggle("dv-collapsible--open", open);
      if (header) header.setAttribute("aria-expanded", String(open));
      if (body) body.hidden = !open;
    });
  }

  function initInteractions(root) {
    /* Collapsibles (sidebar Overview + DI evidence groups). */
    root.addEventListener("click", function (e) {
      var header = e.target.closest(".dv-collapsible__header");
      if (header && root.contains(header)) { toggleCollapsible(header); return; }

      var expandAll = e.target.closest(".dv-expand-all");
      if (expandAll) {
        var groups = root.querySelectorAll("#eid-device-body .dv-collapsible");
        var allOpen = Array.prototype.every.call(groups, function (g) {
          return g.classList.contains("dv-collapsible--open");
        });
        setAllGroups(root, !allOpen);
        var label = expandAll.childNodes[expandAll.childNodes.length - 1];
        if (label) label.textContent = allOpen ? "Expand all" : "Collapse all";
        return;
      }

      var showInfo = e.target.closest(".dv-di-showinfo button");
      if (showInfo) {
        var details = root.querySelector(".dv-di-details");
        var open = showInfo.getAttribute("aria-expanded") !== "true";
        showInfo.setAttribute("aria-expanded", String(open));
        if (details) details.hidden = !open;
        return;
      }
    });

    /* Sidebar collapse / expand. */
    var columns = byId("eid-result-columns");
    root.querySelectorAll(".dv-sidebar-toggle--collapse").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (columns) columns.classList.add("dv-columns--sidebar-collapsed");
      });
    });
    var expandBtn = root.querySelector(".dv-sidebar-toggle--expand");
    if (expandBtn) {
      expandBtn.addEventListener("click", function () {
        if (columns) columns.classList.remove("dv-columns--sidebar-collapsed");
      });
    }
  }

  /* --- Public API ---------------------------------------------------- */
  var built = false;
  function build() {
    if (built) return;
    built = true;
    renderIdentityTable();
    renderDevice();
    var root = byId("eid-result-view");
    renderGauges(root);
    initTabs(root);
    initInteractions(root);
  }

  function show() {
    build();
    var flow = byId("eid-flow-view");
    var result = byId("eid-result-view");
    if (!flow || !result) return;
    flow.hidden = true;
    result.hidden = false;
    document.title = "Electronic ID Results — Trulioo Labs";
    window.scrollTo(0, 0);
    /* Result view mounts hidden, so gauge/layout measured 0 on first paint. */
    window.dispatchEvent(new Event("resize"));
    renderGauges(result);
  }

  function hide() {
    var flow = byId("eid-flow-view");
    var result = byId("eid-result-view");
    if (!flow || !result) return;
    result.hidden = true;
    flow.hidden = false;
    document.title = "Electronic ID — Trulioo Labs";
    window.scrollTo(0, 0);
  }

  global.EidResult = { show: show, hide: hide, build: build };
})(window);
