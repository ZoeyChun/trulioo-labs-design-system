/* Overview hero left-side options — each option uses a different IA. */
(function () {
  "use strict";

  var SHARED = {
    country: "United States",
    status: "Active",
    reg: "—",
    address: "—",
    industry: "—",
    office: "Nanisivik, NU",
    actions: [
      { label: "View Beneficial Owner", primary: true },
      { label: "Review Web Presence", primary: false }
    ],
    verify: {
      status: "Incomplete",
      statusTone: "intermediate",
      submitted: "Oct 28, 2025",
      updated: "Nov 5, 2025",
      reviewer: "Unassigned",
      checksRun: 3,
      checksTotal: 5,
      sources: [
        { name: "Corporate Registry", status: "no-match" },
        { name: "Tax Authority", status: "pending" },
        { name: "Web Presence", status: "checked" },
        { name: "Sanctions List", status: "checked" },
        { name: "Officer ID", status: "pending" }
      ],
      docs: [
        { name: "Articles of incorporation", received: false },
        { name: "Proof of address", received: false },
        { name: "Officer ID", received: true }
      ]
    },
    ownership: {
      layer: "1 (Direct)",
      beneficialOwners: "2",
      owners: [
        { name: "James Morton", role: "COO", pct: "65%", note: "No national ID", tone: "negative" },
        { name: "Steven", role: "Shareholder", pct: "35%", note: "No national ID", tone: "negative" }
      ]
    },
    matchSignals: {
      verified: false,
      rule: "Verification Rule: KYB Standard: 1 Records Match (BRN)",
      metrics: { fields: "4 fields", sources: "4 of 7 datasources" },
      rows: [
        {
          id: "business-name",
          field: "Business Name",
          input: "Harbor Point Capital LLC",
          status: "no-match",
          sources: "1/4 matched"
        },
        {
          id: "jurisdiction",
          field: "Jurisdiction of Incorporation",
          input: "United States",
          status: "match",
          sources: "3/4 matched"
        },
        {
          id: "city",
          field: "City",
          input: "Nanisivik",
          status: "no-match",
          sources: "0/4 matched"
        },
        {
          id: "state-province",
          field: "State Province",
          input: "NU",
          status: "match",
          sources: "3/4 matched"
        }
      ]
    }
  };

  var PROFILES = {
    high: {
      risk: "high",
      tone: "negative",
      score: 87,
      titleOn: "High Risk Entity",
      titleOff: "Not Verified",
      ledeOn:
        "Harbor Point Capital LLC could not clear automated checks and needs manual review before any decision.",
      ledeOff: "No matching registry record was confirmed. Remaining checks were not run.",
      bandOn: "High · manual review",
      bullets: [
        { mark: "Manual review", rest: " is required before any approval decision." },
        { mark: "9 of 16 signals", rest: " raised verification flags." },
        { mark: "18 of 100", rest: " legitimacy score against peer benchmarks.", prefix: "Legitimacy scored " },
        { mark: "Officer IDs", rest: " are missing national identification for both officers." }
      ],
      findings: [
        { short: "Manual review", detail: "Required before approve", tone: "neg" },
        { short: "9 of 16 signals", detail: "Verification flags raised", tone: "neg" },
        { short: "Legitimacy 18", detail: "Out of 100", tone: "neg" },
        { short: "Officer IDs", detail: "Both lack national ID", tone: "neg" }
      ],
      riskSignals: [
        { label: "Business Model", score: 84, risk: "high" },
        { label: "Financial Health", score: 68, risk: "high" },
        { label: "Fraud & Financial Crimes", score: 63, risk: "high" },
        { label: "Third-Party & Market", score: 57, risk: "medium" },
        { label: "Governance & Compliance", score: 52, risk: "medium" }
      ]
    },
    medium: {
      risk: "medium",
      tone: "intermediate",
      score: 58,
      titleOn: "Medium Risk Entity",
      titleOff: "Not Verified",
      ledeOn:
        "Harbor Point Capital LLC cleared most checks, but a few open signals still need analyst review.",
      ledeOff: "Registry match is partial. Remaining verification steps are pending.",
      bandOn: "Medium · review recommended",
      bullets: [
        { mark: "Analyst review", rest: " is recommended before any approval decision." },
        { mark: "4 of 16 signals", rest: " still need follow-up." },
        { mark: "54 of 100", rest: " legitimacy score against peer benchmarks.", prefix: "Legitimacy scored " },
        { mark: "Address match", rest: " is only partial across registry sources." }
      ],
      findings: [
        { short: "Analyst review", detail: "Recommended before approve", tone: "mid" },
        { short: "4 of 16 signals", detail: "Need follow-up", tone: "mid" },
        { short: "Legitimacy 54", detail: "Out of 100", tone: "mid" },
        { short: "Address match", detail: "Partial across sources", tone: "mid" }
      ],
      riskSignals: [
        { label: "Business Model", score: 61, risk: "medium" },
        { label: "Financial Health", score: 55, risk: "medium" },
        { label: "Fraud & Financial Crimes", score: 48, risk: "medium" },
        { label: "Third-Party & Market", score: 42, risk: "low" },
        { label: "Governance & Compliance", score: 39, risk: "low" }
      ]
    },
    low: {
      risk: "low",
      tone: "positive",
      score: 24,
      titleOn: "Low Risk Entity",
      titleOff: "Verified",
      ledeOn:
        "Harbor Point Capital LLC cleared automated checks with no elevated risk signals requiring review.",
      ledeOff: "Registry record confirmed. Remaining checks completed without flags.",
      bandOn: "Low · cleared",
      bullets: [
        { mark: "Checks cleared", rest: " with no manual review required." },
        { mark: "2 of 16 signals", rest: " remain informational only." },
        { mark: "82 of 100", rest: " legitimacy score against peer benchmarks.", prefix: "Legitimacy scored " },
        { mark: "Officer IDs", rest: " are verified for both officers." }
      ],
      findings: [
        { short: "Checks cleared", detail: "No manual review needed", tone: "pos" },
        { short: "2 of 16 signals", detail: "Informational only", tone: "pos" },
        { short: "Legitimacy 82", detail: "Out of 100", tone: "pos" },
        { short: "Officer IDs", detail: "Verified for both officers", tone: "pos" }
      ],
      riskSignals: [
        { label: "Business Model", score: 28, risk: "low" },
        { label: "Financial Health", score: 22, risk: "low" },
        { label: "Fraud & Financial Crimes", score: 19, risk: "low" },
        { label: "Third-Party & Market", score: 31, risk: "low" },
        { label: "Governance & Compliance", score: 26, risk: "low" }
      ]
    }
  };

  var activeRisk = "high";
  var DATA = {};

  function applyProfile(risk) {
    var profile = PROFILES[risk] || PROFILES.high;
    activeRisk = profile.risk;
    Object.keys(SHARED).forEach(function (k) {
      DATA[k] = SHARED[k];
    });
    Object.keys(profile).forEach(function (k) {
      DATA[k] = profile[k];
    });
    if (risk === "low") {
      DATA.verify = {
        status: "Complete",
        statusTone: "positive",
        submitted: "Oct 28, 2025",
        updated: "Nov 5, 2025",
        reviewer: "Assigned",
        checksRun: 5,
        checksTotal: 5,
        sources: [
          { name: "Corporate Registry", status: "checked" },
          { name: "Tax Authority", status: "checked" },
          { name: "Web Presence", status: "checked" },
          { name: "Sanctions List", status: "checked" },
          { name: "Officer ID", status: "checked" }
        ],
        docs: [
          { name: "Articles of incorporation", received: true },
          { name: "Proof of address", received: true },
          { name: "Officer ID", received: true }
        ]
      };
      DATA.ownership = {
        layer: "1 (Direct)",
        beneficialOwners: "2",
        owners: [
          { name: "James Morton", role: "COO", pct: "65%", note: "ID verified", tone: "positive" },
          { name: "Steven", role: "Shareholder", pct: "35%", note: "ID verified", tone: "positive" }
        ]
      };
      DATA.matchSignals = {
        verified: true,
        rule: "Verification Rule: KYB Standard: 1 Records Match (BRN)",
        metrics: { fields: "4 fields", sources: "4 of 4 datasources" },
        rows: [
          {
            id: "business-name",
            field: "Business Name",
            input: "Harbor Point Capital LLC",
            status: "match",
            sources: "4/4 matched"
          },
          {
            id: "jurisdiction",
            field: "Jurisdiction of Incorporation",
            input: "United States",
            status: "match",
            sources: "4/4 matched"
          },
          {
            id: "city",
            field: "City",
            input: "Nanisivik",
            status: "match",
            sources: "3/4 matched"
          },
          {
            id: "state-province",
            field: "State Province",
            input: "NU",
            status: "match",
            sources: "4/4 matched"
          }
        ]
      };
    }
  }

  applyProfile("high");

  function toneClass() {
    return DATA.tone || "negative";
  }

  function titleToneClass() {
    return "oho-title--" + toneClass();
  }

  function tagTone() {
    return toneClass();
  }

  var OPTIONS = [
    { id: "side", name: "1 · Classic side header" },
    { id: "stack", name: "2 · Score billboard" },
    { id: "mosaic", name: "3 · KPI mosaic" },
    { id: "banner", name: "4 · Alert strip" }
  ];

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function mark(t) {
    return (
      '<mark class="oho-mark oho-mark--' +
      toneClass() +
      '">' +
      esc(t) +
      "</mark>"
    );
  }

  function entityHtml() {
    function fact(label, value, trailing) {
      return (
        '<div class="d3h-entity__fact"><div class="d3h-entity__fact-text">' +
        '<span class="d3h-entity__fact-label">' + esc(label) + "</span>" +
        '<span class="d3h-entity__fact-value">' + esc(value) + "</span></div>" +
        (trailing || "") +
        "</div>"
      );
    }
    return (
      '<aside class="d3h-entity oho-hero__entity" aria-label="Entity information">' +
      '<div class="d3h-entity__facts">' +
      fact(
        "Country / Jurisdiction",
        DATA.country,
        '<span class="d3h-entity__fact-flag" aria-hidden="true"><span class="fi fi-us"></span></span>'
      ) +
      '<div class="d3h-entity__fact"><div class="d3h-entity__fact-text">' +
      '<span class="d3h-entity__fact-label">Registration status</span>' +
      '<span class="d3h-entity__fact-value d3h-entity__fact-value--status">' +
      '<i class="d3h-entity__dot" aria-hidden="true"></i>' + esc(DATA.status) +
      "</span></div></div>" +
      fact("BRN / Registration number", DATA.reg) +
      fact("Business address", DATA.address) +
      fact("Industry code", DATA.industry) +
      "</div></aside>"
    );
  }

  function gaugeHtml(size) {
    return (
      '<div class="oho-gaugebox' + (size ? " oho-gaugebox--" + size : "") + '">' +
      '<div class="dv-di-gauge oho-gauge" data-score="' +
      DATA.score +
      '" data-risk="' +
      esc(DATA.risk || "high") +
      '" data-show-percent="false"></div>' +
      "</div>"
    );
  }

  function thumbHtml(cls) {
    return (
      '<img class="' + (cls || "oho-thumb") + '" src="../../demo-3/assets/kyb-resume/building.png" alt="" width="120" height="90">'
    );
  }

  /* ---- BRH-off shared helpers ---- */

  function statusIcon(s) {
    var svgAttrs =
      ' class="oho-src__svg" viewBox="0 0 16 16" fill="none" aria-hidden="true"';
    if (s === "checked") {
      return (
        '<span class="oho-src__icon oho-src__icon--ok" aria-label="Matched">' +
        "<svg" +
        svgAttrs +
        '><circle cx="8" cy="8" r="5.25" stroke="currentColor" stroke-width="1.5"/>' +
        '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m5.25 8.1 1.85 1.85 3.65-3.7"/></svg></span>'
      );
    }
    if (s === "no-match") {
      return (
        '<span class="oho-src__icon oho-src__icon--fail" aria-label="No match">' +
        "<svg" +
        svgAttrs +
        '><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M4 8h8"/></svg></span>'
      );
    }
    return (
      '<span class="oho-src__icon oho-src__icon--wait" aria-label="Pending">' +
      "<svg" +
      svgAttrs +
      '><circle cx="8" cy="8" r="5.25" stroke="currentColor" stroke-width="1.5" stroke-dasharray="10 6" stroke-linecap="round"/></svg></span>'
    );
  }

  function matchSignalCounts() {
    var rows = DATA.matchSignals.rows;
    var matched = rows.filter(function (r) {
      return r.status === "match";
    }).length;
    return { matched: matched, total: rows.length };
  }

  function progressHtml(opts) {
    var v = DATA.verify;
    var mode = (opts && opts.mode) || "checks";
    var hideLabel = opts && opts.hideLabel;
    var counts = matchSignalCounts();
    var matched =
      mode === "signals"
        ? counts.matched
        : v.sources.filter(function (s) {
            return s.status === "checked";
          }).length;
    var total = mode === "signals" ? counts.total : v.checksTotal;
    var run = mode === "signals" ? matched : v.checksRun;
    var pct = Math.round((run / total) * 100);
    var label = mode === "signals" ? "Match signals" : "Verification progress";
    var detail =
      mode === "signals"
        ? matched + " of " + total + " matched"
        : v.checksRun + " of " + v.checksTotal + " checks";
    var tone =
      DATA.risk === "low" || (mode === "signals" && matched === total)
        ? "success"
        : DATA.risk === "high"
          ? "error"
          : "intermediate";
    return (
      '<div class="tds-progress-bar oho-progress tds-progress-bar--' +
      tone +
      '" role="progressbar" aria-valuenow="' +
      pct +
      '" aria-valuemin="0" aria-valuemax="100" aria-label="' +
      esc(label) +
      '">' +
      (hideLabel
        ? ""
        : '<div class="tds-progress-bar__label-row">' +
          '<span class="tds-progress-bar__label">' +
          esc(label) +
          "</span>" +
          '<span class="tds-progress-bar__percentage">' +
          esc(detail) +
          "</span></div>") +
      '<div class="tds-progress-bar__track tds-progress-bar__track--lg">' +
      '<div class="tds-progress-bar__fill" style="width:' +
      pct +
      '%"></div></div></div>'
    );
  }

  function verifyMetaHtml() {
    var v = DATA.verify;
    return (
      '<dl class="oho-vmeta">' +
      '<div><dt>Submitted</dt><dd>' + esc(v.submitted) + '</dd></div>' +
      '<div><dt>Last updated</dt><dd>' + esc(v.updated) + '</dd></div>' +
      '<div><dt>Reviewer</dt><dd>' + esc(v.reviewer) + '</dd></div>' +
      '</dl>'
    );
  }

  function signalStatusLabel(s) {
    if (s === "match" || s === "checked") return "Matched";
    if (s === "no-match") return "No match";
    if (s === "missing") return "Missing";
    return "Pending";
  }

  function matchSignalIcon(status) {
    if (status === "match") return statusIcon("checked");
    if (status === "no-match") return statusIcon("no-match");
    return statusIcon("pending");
  }

  function sourcesHtml(opts) {
    var asSignals = opts && opts.mode === "signals";
    if (asSignals) {
      return (
        '<div class="oho-sources oho-sources--signals">' +
        '<ul class="oho-srclist" aria-label="Match signals">' +
        DATA.matchSignals.rows
          .map(function (row) {
            return (
              '<li class="oho-src">' +
              matchSignalIcon(row.status) +
              '<span class="oho-src__name">' +
              esc(row.field) +
              "</span>" +
              '<span class="oho-src__status">' +
              esc(row.sources) +
              "</span></li>"
            );
          })
          .join("") +
        "</ul></div>"
      );
    }
    var v = DATA.verify;
    return (
      '<div class="oho-sources">' +
      '<p class="oho-section-label">Data sources</p>' +
      '<ul class="oho-srclist" aria-label="Data sources">' +
      v.sources
        .map(function (s) {
          return (
            '<li class="oho-src">' +
            statusIcon(s.status) +
            '<span class="oho-src__name">' +
            esc(s.name) +
            "</span></li>"
          );
        })
        .join("") +
      "</ul></div>"
    );
  }

  function ownershipHtml() {
    var o = DATA.ownership;
    return (
      '<div class="oho-ownership">' +
      '<p class="oho-section-label">Ownership</p>' +
      '<div class="oho-ownership__stats" aria-label="Ownership summary">' +
      '<div class="oho-ownership__stat">' +
      '<span class="oho-ownership__stat-label">Ownership layer</span>' +
      '<span class="oho-ownership__stat-value">' +
      esc(o.layer) +
      "</span></div>" +
      '<div class="oho-ownership__stat">' +
      '<span class="oho-ownership__stat-label">Beneficial owners</span>' +
      '<span class="oho-ownership__stat-value">' +
      esc(o.beneficialOwners) +
      "</span></div></div>" +
      '<ul class="oho-ownership__list" aria-label="Beneficial owners">' +
      o.owners
        .map(function (owner) {
          return (
            '<li class="oho-ownership__card">' +
            '<div class="oho-ownership__card-main">' +
            '<p class="oho-ownership__name">' +
            esc(owner.name) +
            "</p>" +
            '<p class="oho-ownership__role">' +
            esc(owner.role) +
            "</p></div>" +
            '<div class="oho-ownership__card-side">' +
            '<span class="oho-ownership__pct">' +
            esc(owner.pct) +
            "</span>" +
            (owner.note
              ? '<span class="tds-tag tds-tag--sm tds-tag--' +
                esc(owner.tone || "negative") +
                '">' +
                esc(owner.note) +
                "</span>"
              : "") +
            "</div></li>"
          );
        })
        .join("") +
      "</ul></div>"
    );
  }

  function docsHtml() {
    var v = DATA.verify;
    return (
      '<div class="oho-docs">' +
      '<p class="oho-section-label">Documents</p>' +
      '<ul class="oho-doclist">' +
      v.docs.map(function (d) {
        return (
          '<li class="oho-doc">' +
          '<span class="oho-doc__icon' + (d.received ? " oho-doc__icon--ok" : "") + '"></span>' +
          '<span>' + esc(d.name) + '</span>' +
          '<span class="oho-doc__status">' + (d.received ? "Received" : "Pending") + '</span>' +
          '</li>'
        );
      }).join("") +
      '</ul></div>'
    );
  }

  function statusBadgeHtml() {
    var v = DATA.verify;
    return (
      '<span class="tds-tag tds-tag--sm tds-tag--' +
      esc(v.statusTone) +
      '">' +
      esc(v.status) +
      "</span>"
    );
  }

  function findingTagsHtml(items, tone) {
    return (
      '<ul class="oho-chips" aria-label="Findings">' +
      items
        .map(function (f) {
          return (
            '<li><span class="tds-tag tds-tag--sm tds-tag--' +
            (tone || tagTone()) +
            '">' +
            esc(f.short || f.name || f) +
            "</span></li>"
          );
        })
        .join("") +
      "</ul>"
    );
  }

  function sourceTagsHtml() {
    var v = DATA.verify;
    return (
      '<ul class="oho-chips" aria-label="Data sources">' +
      v.sources
        .map(function (s) {
          var tone =
            s.status === "checked"
              ? "positive"
              : s.status === "no-match"
                ? "negative"
                : "intermediate";
          return (
            '<li><span class="tds-tag tds-tag--sm tds-tag--' +
            tone +
            '">' +
            esc(s.name) +
            "</span></li>"
          );
        })
        .join("") +
      "</ul>"
    );
  }

  function btns(kind) {
    /* kind: secondary | stack | links */
    if (kind === "links") {
      return (
        '<div class="oho-links" aria-label="Suggested actions">' +
        DATA.actions
          .map(function (a) {
            return '<button type="button" class="oho-link">' + esc(a.label) + " →</button>";
          })
          .join("") +
        "</div>"
      );
    }
    if (kind === "stack") {
      return (
        '<div class="oho-btnstack" aria-label="Suggested actions">' +
        DATA.actions
          .map(function (a) {
            return (
              '<button type="button" class="tds-btn tds-btn--' +
              (a.primary ? "primary" : "secondary") +
              ' tds-btn--md">' +
              esc(a.label) +
              "</button>"
            );
          })
          .join("") +
        "</div>"
      );
    }
    var chevron =
      '<span class="tds-btn__trailing-icon" aria-hidden="true">' +
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="m6 4 4 4-4 4"/></svg></span>';
    return (
      '<div class="oho-suggested" aria-label="Suggested actions">' +
      '<p class="oho-section-label">Suggested Actions</p>' +
      '<div class="oho-suggested__ctas">' +
      DATA.actions
        .map(function (a) {
          return (
            '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md">' +
            esc(a.label) +
            chevron +
            "</button>"
          );
        })
        .join("") +
      "</div></div>"
    );
  }

  /* —— 1 Classic: vertical marked bullets —— */
  function leftSide(brhOn) {
    /* Full sentences; only the key phrase is marked. */
    var sideSentences = (DATA.bullets || []).map(function (b) {
      return (b.prefix || "") + mark(b.mark) + (b.rest || "");
    });
    var bullets =
      '<ul class="oho-bullets">' +
      sideSentences
        .map(function (s) {
          return "<li>" + s + "</li>";
        })
        .join("") +
      "</ul>";
    if (brhOn) {
      return (
        '<div class="oho-side__top">' +
        gaugeHtml() +
        '<div class="oho-side__verdict">' +
        '<p class="oho-eyebrow">Risk Analysis</p>' +
        '<h2 class="oho-title ' +
        titleToneClass() +
        '">' +
        esc(DATA.titleOn) +
        "</h2>" +
        "</div></div>" +
        bullets +
        btns("secondary")
      );
    }
    return (
      '<div class="oho-side__top">' +
      '<div class="oho-side__verdict">' +
      '<div class="oho-side__titlerow">' +
      '<h2 class="oho-title oho-title--' +
      (DATA.risk === "low" ? "positive" : "intermediate") +
      '">' +
      esc(DATA.titleOff) +
      "</h2>" +
      statusBadgeHtml() +
      "</div></div></div>" +
      '<div class="oho-signals">' +
      progressHtml({ mode: "signals" }) +
      sourcesHtml({ mode: "signals" }) +
      "</div>" +
      btns("secondary")
    );
  }

  function riskBandLabel(risk) {
    if (risk === "high") return "High risk";
    if (risk === "medium") return "Medium risk";
    if (risk === "low") return "Low risk";
    return "Risk";
  }

  /* —— 2 Billboard: giant score + ranked risk-signal rows (no bullets) —— */
  function leftStack(brhOn) {
    if (brhOn) {
      var rows =
        '<ol class="oho-rank">' +
        DATA.riskSignals
          .map(function (s) {
            var w = Math.max(0, Math.min(100, Number(s.score) || 0));
            return (
              '<li class="oho-rank__row">' +
              '<div class="oho-rank__body">' +
              '<div class="oho-rank__line"><strong>' + esc(s.label) + "</strong>" +
              "<span>" +
              esc(s.score + " · " + riskBandLabel(s.risk)) +
              "</span></div>" +
              '<div class="oho-rank__bar oho-rank__bar--' +
              esc(s.risk || "high") +
              '" aria-hidden="true"><i style="width:' +
              w +
              '%"></i></div>' +
              "</div></li>"
            );
          })
          .join("") +
        "</ol>";

      return (
        '<div class="oho-billboard">' +
        '<div class="oho-billboard__score">' +
        '<span class="oho-billboard__num">' + DATA.score + "</span>" +
        '<div class="oho-billboard__meta">' +
        '<p class="oho-eyebrow">Risk score</p>' +
        '<h2 class="oho-title ' +
        titleToneClass() +
        '">' +
        esc(DATA.titleOn) +
        "</h2>" +
        '<p class="oho-billboard__band">' +
        esc(DATA.bandOn) +
        "</p>" +
        "</div></div>" +
        "</div>" +
        rows +
        btns("stack")
      );
    }
    return (
      '<div class="oho-billboard oho-billboard--off">' +
      '<div class="oho-billboard__meta">' +
      '<p class="oho-eyebrow">Verification status</p>' +
      '<h2 class="oho-title oho-title--' +
      (DATA.risk === "low" ? "positive" : "intermediate") +
      '">' +
      esc(DATA.titleOff) +
      "</h2>" +
      "</div></div>" +
      ownershipHtml() +
      btns("stack")
    );
  }

  /* —— 3 Mosaic: tiles ARE the content —— */
  function leftMosaic(brhOn) {
    if (brhOn) {
      return (
        '<div class="oho-mosaic">' +
        '<div class="oho-tile oho-tile--hero">' +
        gaugeHtml() +
        '<div class="oho-tile__verdict">' +
        '<p class="oho-eyebrow">Risk Analysis</p>' +
        '<h2 class="oho-title ' +
        titleToneClass() +
        '">' +
        esc(DATA.titleOn) +
        "</h2></div></div>" +
        DATA.findings
          .map(function (f) {
            return (
              '<div class="oho-tile">' +
              '<p class="oho-tile__label">' +
              esc(f.detail) +
              "</p>" +
              '<p class="oho-tile__value oho-tile__value--' +
              (DATA.tone === "positive"
                ? "pos"
                : DATA.tone === "intermediate"
                  ? "mid"
                  : "neg") +
              ' oho-tile__value--md">' +
              esc(f.short) +
              "</p>" +
              "</div>"
            );
          })
          .join("") +
        "</div>" +
        btns("links")
      );
    }
    return (
      '<div class="oho-mosaic__head">' +
      "<div><p class=\"oho-eyebrow\">Verification status</p>" +
      '<h2 class="oho-title oho-title--' +
      (DATA.risk === "low" ? "positive" : "intermediate") +
      '">' +
      esc(DATA.titleOff) +
      "</h2></div>" +
      statusBadgeHtml() +
      "</div>" +
      '<div class="oho-mosaic">' +
      DATA.matchSignals.rows
        .map(function (row) {
          var isNoMatch = row.status === "no-match";
          var isMatch = row.status === "match";
          var value =
            row.sources || signalStatusLabel(row.status);
          var valueClass =
            "oho-tile__value oho-tile__value--md" +
            (isNoMatch
              ? " oho-tile__value--neg"
              : isMatch
                ? " oho-tile__value--pos"
                : "");
          return (
            '<div class="oho-tile">' +
            '<p class="oho-tile__label">' +
            esc(row.field) +
            "</p>" +
            '<p class="' +
            valueClass +
            '">' +
            esc(value) +
            "</p>" +
            '<p class="oho-tile__hint">' +
            esc(signalStatusLabel(row.status)) +
            (row.input ? " · " + esc(row.input) : "") +
            "</p>" +
            "</div>"
          );
        })
        .join("") +
      "</div>" +
      btns("links")
    );
  }

  /* —— 4 Banner + chips —— */
  function leftBanner(brhOn) {
    if (brhOn) {
      return (
        '<div class="oho-alert">' +
        '<div class="oho-alert__top">' +
        '<div class="oho-alert__copy">' +
        '<p class="oho-eyebrow">Risk Analysis</p>' +
        '<h2 class="oho-alert__title oho-alert__title--' +
        toneClass() +
        '">' +
        esc(DATA.titleOn) +
        "</h2>" +
        '<p class="oho-alert__lede">' +
        esc(DATA.ledeOn) +
        "</p>" +
        "</div>" +
        gaugeHtml("md") +
        "</div>" +
        findingTagsHtml(DATA.findings) +
        '<div class="oho-alert__foot">' +
        btns("secondary") +
        "</div></div>"
      );
    }
    return (
      '<div class="oho-alert__top">' +
      '<div class="oho-alert__copy">' +
      '<p class="oho-eyebrow">Verification status</p>' +
      '<h2 class="oho-alert__title oho-alert__title--neutral">' +
      esc(DATA.titleOff) +
      "</h2>" +
      '<p class="oho-alert__lede">' +
      esc(DATA.ledeOff) +
      "</p>" +
      "</div></div>" +
      sourceTagsHtml() +
      '<div class="oho-alert__foot">' +
      btns("secondary") +
      "</div>"
    );
  }

  /* —— 5 Split panel —— */
  function leftRail(brhOn) {
    var nums =
      '<ol class="oho-nums">' +
      DATA.findings
        .map(function (f) {
          return (
            "<li><strong>" +
            esc(f.short) +
            "</strong>" +
            "<span>" +
            esc(f.detail) +
            "</span></li>"
          );
        })
        .join("") +
      "</ol>";

    if (brhOn) {
      var bandCount = DATA.riskSignals.filter(function (s) {
        return s.risk === DATA.risk;
      }).length;
      var topSignal = DATA.riskSignals[0];
      var bandSummary =
        DATA.risk === "low"
          ? "All " + DATA.riskSignals.length + " categories within low risk"
          : bandCount +
            " of " +
            DATA.riskSignals.length +
            " categories " +
            DATA.risk +
            " risk";
      return (
        '<div class="oho-split">' +
        '<div class="oho-split__panel oho-split__panel--risk">' +
        '<p class="oho-eyebrow">Risk Analysis</p>' +
        gaugeHtml("lg") +
        '<p class="oho-split__signal-line">' +
        esc(bandSummary) +
        "</p>" +
        '<p class="oho-split__signal-line oho-split__signal-line--muted">' +
        esc(topSignal.label + " leads at " + topSignal.score) +
        "</p>" +
        "</div>" +
        '<div class="oho-split__copy">' +
        '<p class="oho-eyebrow">Risk Analysis</p>' +
        '<h2 class="oho-title ' +
        titleToneClass() +
        '">' +
        esc(DATA.titleOn) +
        "</h2>" +
        '<p class="oho-split__lede">' +
        esc(DATA.ledeOn) +
        "</p>" +
        nums +
        btns("stack") +
        "</div></div>"
      );
    }
    var v = DATA.verify;
    return (
      '<div class="oho-split">' +
      '<div class="oho-split__panel oho-split__panel--verify">' +
      '<p class="oho-split__scorelabel">Checks complete</p>' +
      '<p class="oho-split__scoreval oho-split__scoreval--neutral">' +
      v.checksRun +
      "/" +
      v.checksTotal +
      "</p>" +
      progressHtml({ hideLabel: true }) +
      statusBadgeHtml() +
      "</div>" +
      '<div class="oho-split__copy">' +
      '<p class="oho-eyebrow">Verification status</p>' +
      '<h2 class="oho-title oho-title--' +
      (DATA.risk === "low" ? "positive" : "intermediate") +
      '">' +
      esc(DATA.titleOff) +
      "</h2>" +
      '<p class="oho-split__lede">' +
      esc(DATA.ledeOff) +
      "</p>" +
      docsHtml() +
      verifyMetaHtml() +
      btns("stack") +
      "</div></div>"
    );
  }

  var LEFT = {
    side: leftSide,
    stack: leftStack,
    mosaic: leftMosaic,
    banner: leftBanner,
    rail: leftRail
  };

  function cardHtml(opt, brhOn) {
    return (
      '<section class="oho-hero oho-hero--' +
      opt.id +
      '" data-brh="' +
      (brhOn ? "on" : "off") +
      '" data-risk="' +
      esc(DATA.risk || "high") +
      '" data-option="' +
      opt.id +
      '" aria-label="' +
      esc(opt.name) +
      '">' +
      '<div class="oho-hero__inner">' +
      '<div class="oho-hero__main">' +
      LEFT[opt.id](brhOn) +
      "</div>" +
      entityHtml() +
      "</div></section>"
    );
  }

  function mountGauges(root) {
    root.querySelectorAll(".dv-di-gauge[data-score]").forEach(function (el) {
      el.setAttribute("data-risk", DATA.risk || "high");
      el.setAttribute("data-score", String(DATA.score));
      el.setAttribute("data-show-percent", "false");
      el.removeAttribute("data-label");
    });
    if (window.ScoreGauge) window.ScoreGauge.renderAll(root);
  }

  var optionControllers = [];
  var brhOn = true;

  function renderOption(opt) {
    var wrap = document.createElement("article");
    wrap.className = "oho-option";
    wrap.dataset.option = opt.id;
    wrap.innerHTML =
      '<div class="oho-option__head">' +
      '<h2 class="oho-option__name">' +
      esc(opt.name) +
      "</h2></div>" +
      '<div class="oho-option__stage" data-oho-stage></div>';

    var stage = wrap.querySelector("[data-oho-stage]");

    function paint() {
      stage.innerHTML = cardHtml(opt, brhOn);
      mountGauges(stage);
    }

    paint();
    optionControllers.push({ wrap: wrap, paint: paint });
    return wrap;
  }

  function repaintAll() {
    optionControllers.forEach(function (c) {
      c.paint();
    });
  }

  function setRiskFilter(risk) {
    applyProfile(risk);
    document.querySelectorAll("[data-oho-risk]").forEach(function (btn) {
      var on = btn.getAttribute("data-oho-risk") === risk;
      btn.classList.toggle("tds-filter-tab--selected", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    repaintAll();
  }

  function bindRiskFilters() {
    document.querySelectorAll("[data-oho-risk]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setRiskFilter(btn.getAttribute("data-oho-risk") || "high");
      });
    });
  }

  function bindGlobalBrh() {
    var toggle = document.querySelector("[data-oho-brh]");
    if (!toggle) return;
    toggle.setAttribute("aria-checked", brhOn ? "true" : "false");
    toggle.addEventListener("click", function () {
      brhOn = toggle.getAttribute("aria-checked") !== "true";
      toggle.setAttribute("aria-checked", brhOn ? "true" : "false");
      repaintAll();
    });
  }

  function init() {
    var list = document.getElementById("oho-list");
    if (!list) return;
    optionControllers = [];
    OPTIONS.forEach(function (opt) {
      list.appendChild(renderOption(opt));
    });
    bindRiskFilters();
    bindGlobalBrh();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
