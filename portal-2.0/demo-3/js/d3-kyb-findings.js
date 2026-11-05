/* Demo 3 — KYB result "Findings" tab.
 *
 * Renders a verdict-first summary for the business in the report card:
 *   hero (checks complete + one-line conclusion + recommended next step),
 *   Needs attention, What was verified.
 * Everything is derived from the business record (riskLevel, risks, ownership,
 * alerts, report) — nothing here is hard-coded to one company.
 *
 * Claims and source chips are evidence links: they switch to the supporting
 * tab, locate the row by its visible text and highlight it, with a
 * "Back to Findings" bar to return.
 *
 * API:  D3KybFindings.render(resumeCard, biz)
 */
(function () {
  "use strict";

  var statusOverride = null;

  var CHECK_TONE = { pass: "positive", review: "intermediate", fail: "negative", notrun: "default" };
  var CHECK_LABEL = { pass: "Complete", review: "Needs review", fail: "Failed / not found", notrun: "Not checked" };
  var SEG_COLOR = {
    pass: "var(--icon-positive)",
    review: "var(--border-intermediate)",
    fail: "var(--border-negative)",
    notrun: "var(--border-subtle)"
  };
  var ICONS = {
    positive:
      '<svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5"/><path d="m5.25 8.25 1.75 1.75 3.75-3.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    intermediate:
      '<svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true"><path d="M8 2.5 14 13H2L8 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6.5v3M8 11.2v.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    negative:
      '<svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5"/><path d="m5.75 5.75 4.5 4.5M10.25 5.75l-4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    default:
      '<svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2.5 2.5"/></svg>'
  };
  var ARROW =
    '<svg viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function noHit(v) {
    return !v || /^none/i.test(String(v));
  }

  /* ------------------------------------------------------------------ model */

  function build(biz) {
    var r = biz.report || {};
    var a = biz.alerts || {};
    var own = biz.ownership || [];
    var risks = biz.risks || [];
    /* The header tag is the source of truth. On the resume paths (Recent cards,
       Transactions, restored chats) it comes from session.status; on the live
       reveal path it comes from the business's risk data. Findings follows both. */
    var st = statusOverride;
    var level = st
      ? st === "Verified" ? "low" : st === "Review" ? "medium" : "high"
      : biz.riskLevel || "low";
    if (!st && level !== "high" && risks.some(function (x) { return x.severity === "high"; })) level = "high";
    var notVerified = st === "Not Verified";
    var S = window.D3KybSession;
    var registry =
      (S && S.country && biz.cc && S.country(biz.cc) && S.country(biz.cc).registry) || "Registry";

    var verdictTone = level === "low" ? "positive" : level === "medium" ? "intermediate" : "negative";
    /* Same wording as the report header tag; colour still follows the risk level. */
    var verdictLabel = st
      ? st === "Review" ? "Needs review" : st === "Not Verified" ? "Not verified" : st
      : level === "high" ? "Needs review" : level === "medium" ? "Verified · review notes" : "Verified";
    /* "Needs review" is a hold, not a failure: yellow. Red stays for Not verified / Flagged. */
    if (verdictLabel === "Needs review") verdictTone = "intermediate";

    var addrRisk = risks.filter(function (x) {
      return /address/i.test(x.label + " " + x.id);
    }).length > 0;
    var uboRisk = risks.filter(function (x) {
      return /ubo|owner/i.test(x.label + " " + x.id);
    }).length > 0;
    var flagged = own.filter(function (o) {
      return o.flagged;
    });
    var alertHits = [
      ["Adverse media", a.adverseMedia],
      ["Sanctions", a.sanctions],
      ["Litigation", a.litigation]
    ].filter(function (x) {
      return !noHit(x[1]);
    });

    /* gaps */
    var gaps = [];
    /* Every risk gets an evidence row, so every card is clickable. */
    function riskEvidence(x) {
      var key = x.label + " " + x.id + " " + (x.evidence || "");
      if (/address/i.test(key)) {
        return { tab: "overview", find: (r.address || biz.addr || "").split(",")[0], label: "Business address · Business Info" };
      }
      if (/ubo|owner|shareholder|nominee/i.test(key) && own[0]) {
        return { tab: "ownership", find: own[0].name, label: own[0].name + " · Owners & UBOs" };
      }
      if (/media|sanction|litigation|press/i.test(key)) {
        return { tab: "overview", find: "Sanctions", label: "News & Alerts · Business Info" };
      }
      if (/shell|holding|employee|trading|industry|sizing|naics/i.test(key)) {
        return { tab: "overview", find: "Sizing", label: "Sizing and industry · Business Info" };
      }
      return { tab: "overview", find: "Registration number", label: "Registration · Business Info" };
    }
    risks.forEach(function (x) {
      gaps.push({
        caption: x.label,
        tone: x.severity === "high" ? "negative" : "intermediate",
        tagLabel: x.severity === "high" ? "High risk" : "Medium risk",
        metric: x.evidence,
        detail: "",
        ev: riskEvidence(x)
      });
    });
    if (!uboRisk) {
      flagged.forEach(function (o) {
        gaps.push({
          caption: "Ownership & UBO",
          tone: "intermediate",
          tagLabel: "Needs attention",
          metric: o.name + (o.pct && o.pct !== "—" ? " (" + o.pct + ")" : "") + " · " + o.role,
          detail: o.note || "",
          ev: { tab: "ownership", find: o.name, label: o.name + " · Owners & UBOs" }
        });
      });
    }
    alertHits.forEach(function (x) {
      gaps.push({
        caption: x[0],
        tone: "intermediate",
        tagLabel: "Needs attention",
        metric: x[0] + ": " + x[1],
        detail: "",
        ev: { tab: "overview", find: x[0], label: x[0] + " · Business Info" }
      });
    });

    /* verified rows */
    var ver = [];
    if (/active/i.test(biz.status || "Active")) {
      ver.push({
        caption: "Registration",
        text: "Active registration, " + (r.regNumber || biz.reg || "on file") + (r.regDate ? ". " + r.regDate + "." : "."),
        kind: "registry",
        ev: { tab: "overview", find: r.regNumber || biz.reg || "Registration", label: "Registration number · Business Info" },
        src: { label: registry, ev: { tab: "signals", find: "Business Name", label: "Business Name · Match Signals" } }
      });
    }
    if (!addrRisk && (r.address || biz.addr)) {
      ver.push({
        caption: "Address",
        text: "Registered address on file: " + (r.address || biz.addr) + ".",
        kind: "registry",
        ev: { tab: "overview", find: (r.address || biz.addr).split(",")[0], label: "Business address · Business Info" },
        src: { label: registry, ev: { tab: "signals", find: "Business Name", label: "Business Name · Match Signals" } }
      });
    }
    if (!alertHits.length) {
      ver.push({
        caption: "Screening",
        text: "No sanctions, adverse media or litigation found.",
        kind: "screening",
        ev: { tab: "overview", find: "Sanctions", label: "News & Alerts · Business Info" },
        src: { label: "Screening", ev: { tab: "overview", find: "Sanctions", label: "News & Alerts · Business Info" } }
      });
    }
    own
      .filter(function (o) {
        return !o.flagged;
      })
      .slice(0, 2)
      .forEach(function (o) {
        ver.push({
          caption: "Ownership",
          text: o.name + (o.pct && o.pct !== "—" ? " (" + o.pct + ")" : "") + " · " + o.role + ", screened clear.",
          kind: "third-party",
          ev: { tab: "ownership", find: o.name, label: o.name + " · Owners & UBOs" },
          src: { label: "Ownership tree", ev: { tab: "ownership", find: o.name, label: o.name + " · Owners & UBOs" } }
        });
      });
    if (r.industry) {
      ver.push({
        caption: "Business activity",
        text: "Business activity: " + r.industry + ".",
        kind: "self-reported",
        ev: { tab: "overview", find: r.industry.split("(")[0].trim().slice(0, 24), label: "Operations and industry · Business Info" },
        src: { label: "Applicant form", ev: null }
      });
    }

    /* checks (5) */
    var checks = [
      { label: "Registry match", status: /active/i.test(biz.status || "Active") ? "pass" : "fail" },
      { label: "Address", status: addrRisk ? "review" : "pass" },
      { label: "Sanctions & watchlists", status: !noHit(a.sanctions) ? "fail" : "pass" },
      { label: "Adverse media", status: !noHit(a.adverseMedia) || !noHit(a.litigation) ? "review" : "pass" },
      {
        label: "Ownership (UBO)",
        status: !own.length ? "notrun" : uboRisk || flagged.length === own.length ? "fail" : flagged.length ? "review" : "pass"
      }
    ];
    var done = checks.filter(function (c) {
      return c.status === "pass";
    }).length;
    var confidence = level === "low" ? "High" : level === "medium" ? "Medium" : "Low";

    /* conclusion + next step */
    var conclusion =
      r.sumA ||
      biz.name + " is " + String(biz.status || "active").toLowerCase() + " on the registry.";
    var next;
    if (level === "low") {
      next = gaps.length
        ? { title: "Approve, and follow up on the open item", why: gaps[0].metric }
        : { title: "Approve", why: "Registration and screening are clean. No open items." };
    } else if (level === "medium") {
      next = {
        title: "Request more info before deciding",
        why: gaps.length ? "Review: " + gaps.map(function (g) { return g.caption.toLowerCase(); }).join(", ") + "." : "Some checks need review."
      };
    } else {
      next = {
        title: "Escalate for review. Don't approve yet.",
        why: gaps.length
          ? "High-risk signals: " + gaps.map(function (g) { return g.caption.toLowerCase(); }).join(", ") + "."
          : "The record shows high-risk indicators."
      };
    }

    /* Status paths often carry no risk data, so a "bad" status must still read as bad. */
    if (notVerified) {
      checks = [
        { label: "Registry match", status: "fail" },
        { label: "Address", status: "notrun" },
        { label: "Sanctions & watchlists", status: "notrun" },
        { label: "Adverse media", status: "notrun" },
        { label: "Ownership (UBO)", status: "notrun" }
      ];
      done = 0;
      confidence = "Low";
      conclusion = biz.name + " could not be verified against a registry record. The other checks were not run.";
      gaps = [
        {
          caption: "Registry match",
          tone: "negative",
          tagLabel: "Not verified",
          metric: "No matching registry record was confirmed for " + biz.name + ".",
          detail: "Without a match we can't verify the business or run the remaining checks.",
          ev: { tab: "signals", find: "Business Name", label: "Business Name · Match Signals" }
        }
      ];
      ver = [
        {
          caption: "Screening",
          text: "Sanctions and media screening: not run.",
          kind: "not-checked",
          ev: null,
          src: { label: "Not checked", ev: null }
        }
      ];
      next = {
        title: "Request more info. Don't approve yet.",
        why: "Retry with an alternate name or jurisdiction, or ask the applicant for formation documents."
      };
    } else if (st && st !== "Verified" && !gaps.length) {
      gaps = [
        {
          caption: st === "Flagged" ? "Flagged" : "Review",
          tone: st === "Flagged" ? "negative" : "intermediate",
          tagLabel: st === "Flagged" ? "Flagged" : "Needs review",
          metric: biz.name + (st === "Flagged" ? " was flagged during screening." : " was routed to manual review."),
          detail: "Open the tabs for the signals behind this result.",
          ev: { tab: "signals", find: "Business Name", label: "Business Name · Match Signals" }
        }
      ];
      if (st === "Flagged") {
        next = { title: "Escalate for review. Don't approve yet.", why: "The result was flagged. Review the signals before deciding." };
      } else {
        next = { title: "Request more info before deciding", why: "The result needs a manual review before a decision." };
      }
      if (checks.every(function (c) { return c.status === "pass"; })) {
        checks[1].status = "review";
        done = checks.filter(function (c) { return c.status === "pass"; }).length;
      }
    }

    return {
      name: biz.name,
      verdictTone: verdictTone,
      verdictLabel: verdictLabel,
      checks: checks,
      done: done,
      confidence: confidence,
      conclusion: conclusion,
      next: next,
      gaps: gaps,
      ver: ver,
      sources: 4 + (own.length ? 1 : 0) + (risks.length ? 1 : 0)
    };
  }

  /* ------------------------------------------------------------------- html */

  function tag(tone, label) {
    return (
      '<span class="tds-tag tds-tag--md tds-tag--' + tone + '">' +
      '<span class="tds-tag__leading-visual" aria-hidden="true">' + ICONS[tone] + "</span>" +
      esc(label) + "</span>"
    );
  }

  function jumpAttrs(ev, text) {
    if (!ev || !ev.find) return "";
    return (
      ' role="button" tabindex="0" data-kf-jump data-kf-tab="' + esc(ev.tab) +
      '" data-kf-find="' + esc(ev.find) + '" data-kf-label="' + esc(ev.label) +
      '" aria-label="' + esc(text + " Show evidence: " + ev.label) + '"'
    );
  }

  var KIND = {
    registry: ["From registry", "positive"],
    screening: ["Screening", "positive"],
    "third-party": ["Third-party", "positive"],
    "self-reported": ["Self-reported", "default"],
    "not-checked": ["Not checked", "default"]
  };

  /* ------------------------------------------------------- overview (high level) */

  var OV_ICON = {
    location:
      '<svg class="d3-fa-line" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M8 14s4.5-3.9 4.5-7.5a4.5 4.5 0 1 0-9 0C3.5 10.1 8 14 8 14Z"/><circle cx="8" cy="6.5" r="1.5" stroke="currentColor" stroke-width="1.5"/></svg>',
    owners:
      '<svg class="d3-fa-line" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="6" cy="5.25" r="2" stroke="currentColor" stroke-width="1.5"/><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M2.25 13c.35-2.15 1.85-3.25 3.75-3.25S9.4 10.85 9.75 13"/><circle cx="11.25" cy="5.75" r="1.5" stroke="currentColor" stroke-width="1.5"/><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10.1 9.6c1.15.2 2.15.95 2.55 2.4"/></svg>',
    globe:
      '<svg class="d3-fa-line" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="5.25" stroke="currentColor" stroke-width="1.5"/><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M8 2.75v10.5M2.85 6h10.3M2.85 10h10.3"/><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M5.35 3.85c-.95 1.2-1.5 2.7-1.5 4.15s.55 2.95 1.5 4.15M10.65 3.85c.95 1.2 1.5 2.7 1.5 4.15s-.55 2.95-1.5 4.15"/></svg>'
  };

  var SPARKLE =
    '<svg class="icon" viewBox="0 0 12.375 12.375" fill="none" aria-hidden="true"><path d="M8.42188 1.82617L9.625 1.375L10.0762 0.150391C10.1191 0.0644531 10.2051 0 10.3125 0C10.4199 0 10.5059 0.0644531 10.5488 0.150391L11 1.375L12.2246 1.82617C12.3105 1.86914 12.375 1.95508 12.375 2.0625C12.375 2.16992 12.3105 2.25586 12.2246 2.29883L11 2.75L10.5488 3.97461C10.5059 4.06055 10.4199 4.125 10.3125 4.125C10.2051 4.125 10.1191 4.06055 10.0762 3.97461L9.625 2.75L8.42188 2.29883C8.31445 2.25586 8.25 2.16992 8.25 2.0625C8.25 1.95508 8.31445 1.86914 8.42188 1.82617ZM4.44727 2.25586H4.42578L5.58594 4.72656L8.05664 5.88672C8.16406 5.92969 8.25 6.05859 8.25 6.1875C8.25 6.31641 8.16406 6.44531 8.05664 6.50977L5.58594 7.64844L4.42578 10.1191C4.38281 10.2266 4.25391 10.3125 4.125 10.3125C3.99609 10.3125 3.86719 10.2266 3.80273 10.1191L2.66406 7.64844L0.193359 6.50977C0.0859375 6.44531 0 6.31641 0 6.1875C0 6.05859 0.0859375 5.92969 0.193359 5.86523L2.66406 4.72656L3.82422 2.25586C3.86719 2.14844 3.99609 2.0625 4.125 2.0625C4.25391 2.0625 4.38281 2.14844 4.44727 2.25586ZM8.9375 9.625L9.38867 8.42188C9.43164 8.31445 9.51758 8.25 9.625 8.25C9.73242 8.25 9.81836 8.31445 9.86133 8.42188L10.3125 9.625L11.5371 10.0762C11.623 10.1191 11.6875 10.2051 11.6875 10.3125C11.6875 10.4199 11.623 10.5059 11.5371 10.5488L10.3125 11L9.86133 12.2246C9.81836 12.3105 9.73242 12.375 9.625 12.375C9.51758 12.375 9.43164 12.3105 9.38867 12.2246L8.9375 11L7.73438 10.5488C7.62695 10.5059 7.5625 10.4199 7.5625 10.3125C7.5625 10.2051 7.62695 10.1191 7.73438 10.0762L8.9375 9.625Z" fill="currentColor"/></svg>';

  function ovField(label, value, href) {
    var v = value == null || value === "" ? "—" : value;
    var inner = href
      ? '<a class="d3ko__link" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + esc(v) + "</a>"
      : '<p class="tds-data-field__value">' + esc(v) + "</p>";
    return (
      '<div class="tds-data-field"><div class="tds-data-field__label-row"><p class="tds-data-field__label">' + esc(label) +
      '</p></div><div class="tds-data-field__content"><div class="tds-data-field__value-row">' + inner + "</div></div></div>"
    );
  }

  function ovHeading(kind, label) {
    return '<p class="d3ko__heading"><span class="d3ko__heading-icon" aria-hidden="true">' + OV_ICON[kind] + "</span>" + esc(label) + "</p>";
  }

  /* The high-level overview: headline, who the business is, and three short fact
     groups. Everything deeper lives in the other tabs. */
  function overviewHtml(biz, card) {
    var m = build(biz);
    var r = biz.report || {};
    var own = biz.ownership || [];
    var tone = m.verdictTone;
    var lead =
      tone === "negative" ? "High risk entity" : tone === "intermediate" ? "Medium risk entity" : "Low risk entity";
    var reasons = (biz.risks || [])
      .map(function (x) {
        return String(x.label || "").toLowerCase();
      })
      .filter(Boolean)
      .slice(0, 3);
    var tail = reasons.length
      ? reasons.join(", ")
      : tone === "positive"
        ? "active registration, sanctions and adverse media clear"
        : "some checks need review";

    var country = biz.country || (biz.report && biz.report.country) || "United States";
    var reg = biz.reg || r.regNumber || "—";
    var taxId = r.taxId || biz.taxId || "—";
    var addrFull = String(biz.addr || r.address || "").split(" - ")[0].trim();
    var office = addrFull.split(",")[0].trim() || "—";
    var mapsHref = addrFull ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(addrFull) : "";
    var email = r.email || biz.email || "";
    var domain = email.indexOf("@") > 0 ? email.split("@")[1] : "";
    /* Ownership comes from the same data as the Owners & UBOs tab (the graph), and is
       only summarised here when that tab is part of the package. */
    var ownTab = card && card.querySelector('[data-d3-kyb-tab="ownership"]');
    var ownIncluded = !card || (ownTab && !ownTab.hidden);
    var layers = "—";
    var owners = "—";
    if (!ownIncluded) {
      layers = "Not included";
      owners = "Not included";
    } else if (biz.ownershipUndisclosed) {
      layers = "Not disclosed";
      owners = "Not disclosed";
    } else {
      var g = window.D3KybUboGraph && window.D3KybUboGraph.graphFromBiz ? window.D3KybUboGraph.graphFromBiz(biz) : null;
      var depth = 0;
      var persons = 0;
      (function walk(node, d) {
        if (!node) return;
        if (d > depth) depth = d;
        if (d > 0 && node.type !== "business") persons += 1;
        (node.children || []).forEach(function (c) {
          walk(c, d + 1);
        });
      })(g && g.tree, 0);
      if (!persons && own.length) {
        persons = own.filter(function (o) { return o.type !== "corp"; }).length || own.length;
        depth = 1;
      }
      if (persons) {
        layers = depth > 1 ? depth + " (Multi-tiered)" : "1 (Direct)";
        owners = String(persons);
      }
    }

    return (
      '<div class="d3-kyb-findings d3ko">' +
      '<p class="d3ko__kicker">Overview</p>' +
      '<h2 class="d3ko__headline"><span class="d3ko__headline-' + (tone === "positive" ? "ok" : tone === "intermediate" ? "warn" : "risk") + '">' +
      esc(lead) + "</span>: " + esc(tail) + "</h2>" +
      '<hr class="d3ko__rule">' +
      '<div class="d3ko__identity">' +
      '<img class="d3ko__thumb" src="assets/kyb-resume/building.png" alt="Office location" width="120" height="90">' +
      '<div class="d3ko__who"><div class="d3ko__name-row"><p class="d3ko__name">' + esc(biz.name || "Business") + "</p>" + tag(tone, m.verdictLabel) + "</div>" +
      '<div class="d3ko__fields">' +
      '<div class="tds-data-field"><div class="tds-data-field__label-row"><p class="tds-data-field__label">Country / Jurisdiction</p></div>' +
      '<div class="tds-data-field__content"><div class="tds-data-field__value-row"><p class="tds-data-field__value">' + esc(country) +
      '</p><span class="d3ko__flag" aria-hidden="true"><img src="assets/kyb-resume/flag-us.svg" alt="" width="18" height="12"></span></div></div></div>' +
      ovField("BRN / Registration number", reg) +
      ovField("Tax ID", taxId) +
      "</div></div></div>" +
      '<div class="d3ko__facts">' +
      '<div class="d3ko__col">' + ovHeading("location", "Address") + '<div class="d3ko__col-fields">' +
      ovField("Office address", office, mapsHref) + ovField("Entities registered", biz.entitiesRegistered || "1") + "</div></div>" +
      '<div class="d3ko__col">' + ovHeading("owners", "Ownership") + '<div class="d3ko__col-fields">' +
      ovField("Ownership layer", layers) + ovField("Beneficial owners", owners) + "</div></div>" +
      '<div class="d3ko__col">' + ovHeading("globe", "Contact details") + '<div class="d3ko__col-fields">' +
      ovField("Website", domain, domain ? "https://" + domain : "") + ovField("Email", email, email ? "mailto:" + email : "") + "</div></div>" +
      "</div>" +
      '<button type="button" class="tds-ai-tag tds-ai-tag--md d3ko__ask" data-d3ko-ask="What are the key risk factors for this business?">' +
      '<span class="tds-ai-tag__icon" aria-hidden="true">' + SPARKLE + '</span><span class="tds-ai-tag__label">What are the key risk factors for this business?</span></button>' +
      "</div>"
    );
  }

  /* The skeleton matches this layout. */
  function overviewSkeletonHtml() {
    var sk = function (w, h, extra) {
      return '<span class="d3kf-sk' + (extra ? " " + extra : "") + '" style="width:' + w + ";height:" + h + 'px"></span>';
    };
    var col = '<div class="d3ko__col"><div class="d3kf-sk-stack">' + sk("90px", 14) + sk("70%", 14) + sk("60px", 12) + sk("55%", 14) + "</div></div>";
    return (
      '<span class="sr-only">Generating overview…</span><div aria-hidden="true" class="d3-kyb-findings d3ko">' +
      sk("80px", 12) + '<div style="height:12px"></div>' + sk("78%", 24) + '<hr class="d3ko__rule">' +
      '<div class="d3ko__identity">' + sk("120px", 90, "d3ko__thumb") +
      '<div class="d3ko__who"><div class="d3kf-sk-stack">' + sk("240px", 22) + sk("70%", 14) + "</div></div></div>" +
      '<div class="d3ko__facts">' + col + col + col + "</div></div>"
    );
  }

  function html(m) {
    var heroClass = "kyb-summary-hero--" + m.verdictTone;
    var accent = m.verdictTone === "default" ? "" : "dv-summary-card__accent--" + m.verdictTone;
    var segs = m.checks
      .map(function (c) {
        return (
          '<li title="' + esc(c.label + ": " + CHECK_LABEL[c.status]) + '" style="background:' + SEG_COLOR[c.status] + '">' +
          '<span class="sr-only">' + esc(c.label + ": " + CHECK_LABEL[c.status]) + "</span></li>"
        );
      })
      .join("");

    var gaps = m.gaps
      .map(function (g) {
        return (
          '<article id="kf-gap-' + 0 + '"><div class="dv-summary-card"' + jumpAttrs(g.ev, g.metric) + ">" +
          '<div class="dv-summary-card__inner"><div class="dv-summary-card__top">' +
          '<p class="dv-summary-card__caption">' + esc(g.caption) + "</p>" + tag(g.tone, g.tagLabel) + "</div>" +
          '<div class="dv-summary-card__body"><div class="dv-summary-card__copy">' +
          '<p class="dv-summary-card__metric">' + esc(g.metric) + "</p>" +
          (g.detail ? '<p class="dv-summary-card__detail">' + esc(g.detail) + "</p>" : "") +
          "</div></div></div></div></article>"
        );
      })
      .join("");

    var ver = m.ver
      .map(function (v) {
        var k = KIND[v.kind] || KIND["self-reported"];
        var chip = v.src
          ? v.src.ev
            ? '<div class="d3kf-source"><button type="button" class="tds-tag tds-tag--sm d3kf-chip" data-kf-jump data-kf-tab="' +
              esc(v.src.ev.tab) + '" data-kf-find="' + esc(v.src.ev.find) + '" data-kf-label="' + esc(v.src.ev.label) +
              '" aria-label="' + esc(v.src.label + " — show evidence: " + v.src.ev.label) + '">' + esc(v.src.label) + ARROW + "</button></div>"
            : '<div class="d3kf-source"><span class="tds-tag tds-tag--sm">' + esc(v.src.label) + "</span></div>"
          : "";
        return (
          "<li><div class=\"dv-summary-card\"" + jumpAttrs(v.ev, v.text) + ">" +
          '<div class="dv-summary-card__inner"><div class="dv-summary-card__top">' +
          '<p class="dv-summary-card__caption">' + esc(v.caption) + "</p>" + tag(k[1], k[0]) + "</div>" +
          '<div class="dv-summary-card__body"><div class="dv-summary-card__copy">' +
          '<p class="dv-summary-card__metric">' + esc(v.text) + "</p>" + chip + "</div></div></div></div></li>"
        );
      })
      .join("");

    return (
      '<div class="kyb-summary-page d3-kyb-findings">' +
      '<section class="kyb-summary-hero ' + heroClass + '" aria-label="Verdict">' +
      '<div class="kyb-summary-hero__gauge-card"><div class="kyb-summary-hero__gauge-stack">' +
      '<p class="d3kf-count ' + accent + '">' + m.done + "<span>/" + m.checks.length + "</span></p>" +
      '<div class="kyb-summary-hero__gauge-meta"><h2 class="kyb-summary-hero__risk-label">' + esc(m.verdictLabel) + "</h2>" +
      '<ul class="d3kf-segs" aria-label="Check coverage">' + segs + "</ul>" +
      '<p class="dv-summary-card__detail dv-summary-card__detail--nowrap">checks complete · ' + esc(m.confidence) + " confidence</p>" +
      "</div></div></div>" +
      '<div class="kyb-summary-hero__verdict-card"><div class="kyb-summary-hero__verdict-body"><div class="kyb-summary-hero__verdict-intro">' +
      '<p class="kyb-summary-hero__verdict-title">' + esc(m.conclusion) + "</p>" +
      '<div class="kyb-summary-hero__finding-divider" aria-hidden="true"></div>' +
      '<div class="d3kf-next"><p class="dv-summary-card__caption">Recommended next step</p>' +
      '<p class="kyb-summary-hero__verdict-title">' + esc(m.next.title) + "</p>" +
      '<p class="kyb-summary-hero__finding-text">' + esc(m.next.why) + "</p></div>" +
      "</div></div></div></section>" +
      (m.gaps.length
        ? '<section class="dv-summary-evidence" aria-labelledby="kf-gaps-h"><h3 class="dv-summary-evidence__title" id="kf-gaps-h">Needs attention</h3>' +
          '<div class="dv-summary-evidence__grid">' + gaps + "</div></section>"
        : "") +
      '<section class="dv-summary-evidence" aria-labelledby="kf-ver-h"><h3 class="dv-summary-evidence__title" id="kf-ver-h">What was verified</h3>' +
      '<ul class="dv-summary-evidence__grid" aria-labelledby="kf-ver-h">' + ver + "</ul></section>" +
      '<footer class="d3kf-footer"><span>AI-generated summary · based on ' + m.sources + ' sources</span>' +
      '<button type="button" data-kf-tabgo="signals">View sources</button>' +
      '<span class="d3kf-footer__line">Reproducible from the <button type="button" data-kf-tabgo="raw">Raw Data</button>.</span></footer>' +
      "</div>"
    );
  }

  /* ---------------------------------------------------------- evidence jump */

  function visible(el) {
    return el.getClientRects().length > 0;
  }

  function locate(panel, find) {
    var needle = String(find || "").trim().toLowerCase();
    if (!needle) return null;
    function walk(exact, visibleOnly) {
      var w = document.createTreeWalker(panel, NodeFilter.SHOW_TEXT);
      for (var n = w.nextNode(); n; n = w.nextNode()) {
        var t = (n.textContent || "").trim().toLowerCase();
        if (!t || !n.parentElement) continue;
        if (!(exact ? t === needle : t.indexOf(needle) !== -1)) continue;
        if (visibleOnly && !visible(n.parentElement)) continue;
        return n.parentElement;
      }
      return null;
    }
    var el = walk(true, true) || walk(false, true) || walk(true, false) || walk(false, false);
    if (!el) return null;
    var i, p;
    if (!visible(el)) {
      while (el && el !== panel && !visible(el)) el = el.parentElement;
      if (!el || el === panel || (el.textContent || "").length > 900) return null;
      var row = el;
      for (i = 0; i < 4 && row && row !== panel; i += 1, row = row.parentElement) {
        var toggle = row.querySelector('[aria-expanded="false"]');
        if (toggle) {
          toggle.click();
          return row;
        }
      }
      return el;
    }
    for (i = 0; i < 3 && el; i += 1) {
      p = el.parentElement;
      if (!p || p === panel || (p.textContent || "").length > 220) break;
      el = p;
    }
    return el;
  }

  function bind(card) {
    if (card.__d3kfBound) return;
    card.__d3kfBound = true;
    card.addEventListener("click", function (event) {
      var ask = event.target.closest && event.target.closest("[data-d3ko-ask]");
      if (!ask) return;
      document.dispatchEvent(
        new CustomEvent("d3-chat:send", { detail: { text: ask.getAttribute("data-d3ko-ask"), agent: "kyb" }, cancelable: true })
      );
    });
    var savedScroll = 0;

    function body() {
      return card.querySelector(".d3-kyb-resume__body");
    }
    function bar() {
      var b = card.querySelector(".d3kf-back");
      if (b) return b;
      b = document.createElement("div");
      b.className = "d3kf-back";
      b.hidden = true;
      b.setAttribute("role", "status");
      b.innerHTML =
        '<button type="button" data-kf-back>← Back to Findings</button><span data-kf-back-label></span>';
      var first = card.querySelector("[data-d3-kyb-panel]");
      if (first && first.parentNode) first.parentNode.insertBefore(b, first);
      return b;
    }
    function hideBar() {
      var b = card.querySelector(".d3kf-back");
      if (b) b.hidden = true;
    }

    function jump(tab, find, label) {
      var R = window.D3KybReport;
      if (!R || !R.selectTab) return;
      var active = card.querySelector("[data-d3-kyb-tab].is-active");
      var fromFindings = active && active.getAttribute("data-d3-kyb-tab") === "findings";
      if (fromFindings && body()) savedScroll = body().scrollTop;
      if (R.selectTab(tab) === false) return;
      var b = bar();
      if (fromFindings) {
        b.querySelector("[data-kf-back-label]").textContent = "Evidence for: " + label;
        b.hidden = false;
      }
      window.setTimeout(function () {
        var panel = card.querySelector('[data-d3-kyb-panel="' + tab + '"]');
        if (!panel) return;
        card.querySelectorAll(".d3-kyb-evidence-active").forEach(function (n) {
          n.classList.remove("d3-kyb-evidence-active");
        });
        var el = locate(panel, find);
        if (!el) return;
        var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.classList.add("d3-kyb-evidence-active");
        el.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
        el.tabIndex = -1;
        el.focus({ preventScroll: true });
        if (!reduce && el.animate) {
          el.animate(
            [{ boxShadow: "0 0 0 0 rgba(14,138,120,.55)" }, { boxShadow: "0 0 0 10px rgba(14,138,120,0)" }],
            { duration: 1200, easing: "ease-out" }
          );
        }
        window.setTimeout(function () {
          el.classList.remove("d3-kyb-evidence-active");
        }, 6000);
      }, 90);
    }

    card.addEventListener("click", function (e) {
      var t = e.target;
      var j = t.closest && t.closest("[data-kf-jump]");
      if (j && card.contains(j)) {
        e.preventDefault();
        jump(j.getAttribute("data-kf-tab"), j.getAttribute("data-kf-find"), j.getAttribute("data-kf-label"));
        return;
      }
      var go = t.closest && t.closest("[data-kf-tabgo]");
      if (go && window.D3KybReport) {
        window.D3KybReport.selectTab(go.getAttribute("data-kf-tabgo"));
        return;
      }
      if (t.closest && t.closest("[data-kf-back]")) {
        hideBar();
        if (window.D3KybReport) window.D3KybReport.selectTab("findings", { silent: true });
        window.requestAnimationFrame(function () {
          if (body()) body().scrollTop = savedScroll;
        });
        return;
      }
      /* Manual tab clicks end a jump. */
      if (t.closest && t.closest("[data-d3-kyb-tab]")) hideBar();
    });
    card.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var j = e.target.closest && e.target.closest("[data-kf-jump][role=button]");
      if (j && j === e.target) {
        e.preventDefault();
        j.click();
      }
    });
  }

  /* ----------------------------------------------------------- loading state */

  var SKELETON_MS = 2400; /* how long the skeleton plays before the summary appears */
  var instantUntil = 0; /* a finished report is being re-opened: paint at once */
  var held = false; /* live verification holds the skeleton until it finishes */
  var holdTimer = 0;

  function sk(w, h, extra) {
    return '<span class="d3kf-sk' + (extra ? " " + extra : "") + '" style="width:' + w + ";height:" + h + 'px"></span>';
  }

  function skCard(lines) {
    var l = "";
    for (var i = 0; i < lines; i += 1) l += sk(i === lines - 1 ? "62%" : "100%", 14);
    return (
      '<div class="dv-summary-card"><div class="dv-summary-card__inner">' +
      '<div class="dv-summary-card__top">' + sk("96px", 12) + sk("84px", 24, "d3kf-sk--pill") + "</div>" +
      '<div class="d3kf-sk-stack">' + l + "</div>" + sk("120px", 22, "d3kf-sk--pill") +
      "</div></div>"
    );
  }

  /* Same skeleton of the page: hero, a section of cards, a second section. */
  function skeletonHtml() {
    return (
      '<div class="kyb-summary-page d3-kyb-findings d3kf-loading" role="status" aria-live="polite">' +
      '<span class="sr-only">Generating findings…</span><div aria-hidden="true" class="d3kf-sk-wrap">' +
      '<section class="kyb-summary-hero d3kf-sk-hero">' +
      '<div class="kyb-summary-hero__gauge-card"><div class="kyb-summary-hero__gauge-stack d3kf-sk-center">' +
      sk("72px", 48) + sk("118px", 24) + '<span class="d3kf-sk-segs">' + sk("22px", 6, "d3kf-sk--pill") + sk("22px", 6, "d3kf-sk--pill") + sk("22px", 6, "d3kf-sk--pill") + sk("22px", 6, "d3kf-sk--pill") + sk("22px", 6, "d3kf-sk--pill") + "</span>" +
      sk("150px", 12) + "</div></div>" +
      '<div class="kyb-summary-hero__verdict-card"><div class="d3kf-sk-stack d3kf-sk-stack--wide">' +
      sk("100%", 16) + sk("84%", 16) + '<span class="d3kf-sk-rule"></span>' + sk("150px", 12) + sk("46%", 18) + sk("92%", 14) +
      "</div></div></section>" +
      '<section class="dv-summary-evidence">' + sk("170px", 22) +
      '<div class="dv-summary-evidence__grid">' + skCard(2) + skCard(2) + "</div></section>" +
      '<section class="dv-summary-evidence">' + sk("190px", 22) +
      '<div class="dv-summary-evidence__grid">' + skCard(2) + skCard(1) + "</div></section>" +
      "</div></div>"
    );
  }

  /* Model + which evidence links are reachable right now. */
  function buildModel(card, biz) {
    var model = build(biz);
    /* The package decides which tabs exist. An evidence link to a tab that is not
       there would do nothing, so drop it — the card then reads as plain info. */
    var avail = function (ev) {
      if (!ev) return ev;
      var t = card.querySelector('[data-d3-kyb-tab="' + ev.tab + '"]');
      return t && !t.hidden ? ev : null;
    };
    model.gaps.forEach(function (g) {
      g.ev = avail(g.ev);
    });
    model.ver.forEach(function (v) {
      v.ev = avail(v.ev);
      if (v.src) v.src.ev = avail(v.src.ev);
    });
    return model;
  }

  /* ------------------------------------------------------------ overview hero */

  /* Which tab each native jump target opens, so a button never points at a tab the
     package does not include. */
  var HERO_JUMP_TAB = { ownership: "ownership", presence: "web", "match-signals": "signals", signals: "risk", "business-insights": "additional", financial: "additional" };
  var NATIVE_NAME = "Meridian Apex Consulting Inc."; /* the name baked into the native Summary */

  /* The native Summary hero (gauge + verdict card) becomes the report hero from
     verification-report-tds/v3: risk title, a narrative with the key phrases marked,
     Suggested Actions, and an entity card. Text and actions come from the native hero;
     the entity facts come from the business being shown. */
  function upgradeHero(panel, biz, card) {
    var hero = panel.querySelector(".kyb-summary-hero");
    if (!hero || !biz) return;
    var tone = hero.classList.contains("kyb-summary-hero--negative")
      ? "negative"
      : hero.classList.contains("kyb-summary-hero--intermediate")
        ? "intermediate"
        : "positive";
    var name = biz.name || NATIVE_NAME;
    var clean = function (n) {
      return n ? n.textContent.replace(/\s+/g, " ").trim().split(NATIVE_NAME).join(name) : "";
    };
    var title = clean(hero.querySelector(".kyb-summary-hero__risk-label"));
    var lead = clean(hero.querySelector(".kyb-summary-hero__verdict-title"));
    var findings = [].slice.call(hero.querySelectorAll(".kyb-summary-hero__finding-text")).map(clean);

    function mark(t) {
      if (tone === "positive") return esc(t);
      return '<mark class="d3h-card__lede-mark d3h-card__lede-mark--' + tone + '">' + esc(t) + "</mark>";
    }
    var parts = [];
    if (lead) {
      parts.push(
        lead.indexOf(name) === 0 && lead.length > name.length
          ? esc(name) + " " + mark(lead.slice(name.length).trim() + ".")
          : mark(lead + ".")
      );
    }
    findings.forEach(function (f) {
      var cut = f.search(/,| with | and /);
      parts.push(cut > 0 ? mark(f.slice(0, cut)) + esc(f.slice(cut)) : mark(f));
    });

    /* Bullets are short: just the key phrase of each sentence, no narrative. */
    function cap1(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
    var shorts = [];
    if (lead) {
      var phrase = lead.indexOf(name) === 0 && lead.length > name.length ? lead.slice(name.length).trim() : lead;
      shorts.push(esc(cap1(phrase)));
    }
    findings.forEach(function (f) {
      var cut = f.search(/,| with | and /);
      shorts.push(esc(cap1(cut > 0 ? f.slice(0, cut) : f)));
    });

    var buttons = [].slice
      .call(hero.querySelectorAll(".kyb-summary-hero__actions [data-kyb-jump-tab]"))
      .filter(function (b) {
        var t = card && card.querySelector('[data-d3-kyb-tab="' + HERO_JUMP_TAB[b.getAttribute("data-kyb-jump-tab")] + '"]');
        return !card || (t && !t.hidden);
      })
      .map(function (b) {
        return { jump: b.getAttribute("data-kyb-jump-tab"), label: b.textContent.trim() };
      });
    /* The package may leave out the tabs the native buttons point at (Owners & UBOs,
       Web Insights). Offer the tabs it does include instead of an empty block. */
    [
      { jump: "signals", label: "Review Risk Analysis" },
      { jump: "match-signals", label: "Review Match Signals" }
    ].forEach(function (f) {
      var t = card && card.querySelector('[data-d3-kyb-tab="' + HERO_JUMP_TAB[f.jump] + '"]');
      if (buttons.length < 2 && (!card || (t && !t.hidden))) buttons.push(f);
    });
    buttons = buttons
      .map(function (b) {
        return '<button type="button" class="tds-btn tds-btn--secondary tds-btn--sm" data-kyb-jump-tab="' + esc(b.jump) + '">' + esc(b.label) + "</button>";
      })
      .join("");

    var r = biz.report || {};
    var cc = String(biz.cc || biz.countryCode || "US").toLowerCase();
    function fact(label, value, trailing) {
      return (
        '<div class="d3h-entity__fact"><div class="d3h-entity__fact-text">' +
        '<span class="d3h-entity__fact-label">' + esc(label) + "</span>" +
        '<span class="d3h-entity__fact-value">' + esc(value == null || value === "" ? "—" : value) + "</span></div>" +
        (trailing || "") + "</div>"
      );
    }

    var gaugeEl = hero.querySelector(".kyb-summary-hero__gauge");
    var score = gaugeEl ? gaugeEl.getAttribute("data-score") || "" : "";
    var statusText = biz.status || "Active";
    var statusFact =
      '<div class="d3h-entity__fact"><div class="d3h-entity__fact-text">' +
      '<span class="d3h-entity__fact-label">Registration status</span>' +
      '<span class="d3h-entity__fact-value d3h-entity__fact-value--status"><i class="d3h-entity__dot' +
      (/active/i.test(statusText) ? "" : " is-off") + '" aria-hidden="true"></i>' + esc(statusText) + "</span></div></div>";
    hero.outerHTML =
      '<section class="d3h-card d3h-card--hero d3h-card--hero-gauge d3h-card--tone-' + tone + '" aria-label="Verdict"><div class="d3h-card__inner">' +
      '<div class="d3h-hero__main">' +
      '<div class="d3h-hero__top">' +
      (score ? '<div class="d3h-hero__gaugebox"><div class="dv-di-gauge d3h-hero__gauge" data-score="' + esc(score) + '"></div></div>' : "") +
      '<div class="d3h-hero__verdict"><p class="d3h-hero__eyebrow">Risk Analysis</p>' +
      '<h2 class="d3h-card__title d3h-card__title--hero d3h-card__title--' + tone + '">' + esc(title) + "</h2></div>" +
      "</div>" +
      '<ul class="d3h-chips">' + shorts.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>" +
      (buttons
        ? '<div class="d3h-suggested" aria-label="Suggested actions"><p class="d3h-section-label">Suggested Actions</p><div class="d3h-suggested__ctas">' + buttons + "</div></div>"
        : "") +
      "</div>" +
      '<aside class="d3h-entity" aria-label="Entity information">' +
      '<div class="d3h-entity__facts">' +
      fact("Country / Jurisdiction", biz.country || r.country || "United States", '<span class="d3h-entity__fact-flag" aria-hidden="true"><span class="fi fi-' + esc(cc) + '"></span></span>') +
      statusFact +
      fact("BRN / Registration number", r.regNumber || biz.reg) +
      fact("Business address", r.address || biz.addr) +
      fact("Industry code", r.industry) +
      "</div></aside></div></section>";
  }

  /* The cards under the hero are "Highlights": no section question, and the risk tag
     stays only on the Signals card. */
  /* One card per report tab (after Overview), in tab order, named like the tab. A card
     whose tab the package leaves out is dropped. */
  var HIGHLIGHT_CARDS = [
    { jump: "signals", name: "Risk Analysis" },
    { jump: "match-signals", name: "Match Signals" },
    { jump: "ownership", name: "Owners & UBOs" },
    { jump: "presence", name: "Web Insights" },
    { jump: "financial", name: "Additional Data", detail: "Virtual office address" }
  ];

  function tidyHighlights(panel, card) {
    var h = panel.querySelector(".dv-summary-evidence__title");
    if (h) h.textContent = "Highlights";
    var grid = panel.querySelector(".dv-summary-evidence__grid");
    if (!grid) return;
    var cards = [].slice.call(grid.querySelectorAll(".dv-summary-card"));
    var byJump = {};
    cards.forEach(function (c) { byJump[c.getAttribute("data-kyb-jump-tab")] = c; });
    cards.forEach(function (c) { c.remove(); });
    HIGHLIGHT_CARDS.forEach(function (def) {
      var c = byJump[def.jump];
      if (!c) return;
      var tabEl = card && card.querySelector('[data-d3-kyb-tab="' + HERO_JUMP_TAB[def.jump] + '"]');
      if (card && (!tabEl || tabEl.hidden)) return;
      var cap = c.querySelector(".dv-summary-card__caption");
      if (cap) cap.textContent = def.name;
      var det = c.querySelector(".dv-summary-card__detail");
      if (det && def.detail) det.textContent = def.detail;
      /* The risk tag stays only on the Risk Analysis card. */
      if (def.jump !== "signals") {
        c.querySelectorAll(".dv-summary-card__top .tds-tag").forEach(function (n) { n.remove(); });
      }
      grid.appendChild(c);
    });
  }

  function paint(panel, card, biz, animate) {
    try {
      if (window.D3KybPanels && window.D3KybPanels.mount(panel, "summary")) {
        upgradeHero(panel, biz, card); /* native Summary, with the v3 hero */
        panel.querySelectorAll(".d3h-hero__gauge[data-score]").forEach(function (g) {
          var s = parseFloat(g.getAttribute("data-score") || "0");
          g.setAttribute("data-risk", s < 30 ? "low" : s <= 60 ? "medium" : "high");
          g.setAttribute("data-show-percent", "false");
          g.removeAttribute("data-label");
        });
        if (window.ScoreGauge) window.ScoreGauge.renderAll(panel);
        tidyHighlights(panel, card);
      }
      else panel.innerHTML = overviewHtml(biz, card);
      if (animate) {
        var root = panel.firstElementChild;
        if (root) root.classList.add("d3kf-in");
      }
    } catch (err) {
      /* Never leave the tab blank: show a message and keep the cause in the console. */
      if (window.console && console.error) console.error("D3KybFindings render failed", err);
      panel.innerHTML = '<p class="d3-workspace__hint">The overview could not be generated for this result.</p>';
    }
    panel.removeAttribute("aria-busy");
    bind(card);
  }

  function finish(panel) {
    if (!panel.__kfCtx) return;
    panel.dataset.kfState = "ready";
    paint(panel, panel.__kfCtx.card, panel.__kfCtx.biz, true);
  }

  function reducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* First time a business is shown: skeleton, then the summary. Later renders of the
     same business (back from a tab, package change) paint straight away. */
  function render(card, biz) {
    if (!card || !biz) return false;
    var panel = card.querySelector('[data-d3-kyb-panel="findings"]');
    if (!panel) return false;
    var key = biz.name + "|" + (statusOverride || "");
    panel.__kfCtx = { card: card, biz: biz };

    if (panel.dataset.kfKey === key) {
      if (panel.dataset.kfState === "loading") return true; /* timer will paint the latest */
      paint(panel, card, biz, false);
      return true;
    }

    panel.dataset.kfKey = key;
    window.clearTimeout(panel.__kfTimer);
    /* Coming back to a finished report (the View button): no skeleton. */
    if (reducedMotion() || Date.now() < instantUntil) {
      panel.dataset.kfState = "ready";
      paint(panel, card, biz, false);
      return true;
    }
    panel.dataset.kfState = "loading";
    panel.__kfDone = false;
    panel.setAttribute("aria-busy", "true");
    panel.innerHTML = overviewSkeletonHtml();
    panel.__kfTimer = window.setTimeout(function () {
      panel.__kfDone = true;
      if (!held) finish(panel);
    }, SKELETON_MS);
    return true;
  }

  /* Live verification: keep the skeleton up until the report finishes verifying. */
  function hold() {
    held = true;
    window.clearTimeout(holdTimer);
    holdTimer = window.setTimeout(release, 15000); /* never get stuck */
  }
  function release() {
    held = false;
    window.clearTimeout(holdTimer);
    document.querySelectorAll('[data-d3-kyb-panel="findings"]').forEach(function (panel) {
      if (panel.dataset.kfState === "loading" && panel.__kfDone) finish(panel);
    });
  }

  /* Self-heal: some paths open the report without calling render (Recent cards,
     drawers). Findings is the default tab, so if its panel becomes visible while
     empty, fill it from the current business — or from the name in the header. */
  function heal(panel) {
    if (panel.children.length) return;
    var card = panel.closest(".d3-kyb-resume") || panel.closest("article,section");
    var R = window.D3KybReport;
    if (!card || !R) return;
    var biz = R.getCurrent && R.getCurrent();
    if (!biz && R.seedFromName) {
      var nameEl = card.querySelector(".d3-workspace__biz-name") || card.querySelector("[data-d3-kyb-biz-name]");
      var name = nameEl && nameEl.textContent && nameEl.textContent.trim();
      if (name) biz = R.seedFromName(name); /* renders Findings as part of seeding */
    }
    if (biz && !panel.children.length) render(card, biz);
  }

  /* An empty panel has zero height, so IntersectionObserver never fires for it.
     Watch the attributes that show/hide the report and check directly. */
  function check() {
    document.querySelectorAll('[data-d3-kyb-panel="findings"]').forEach(function (panel) {
      if (!panel.children.length && !panel.hidden && panel.getClientRects().length) heal(panel);
    });
  }

  function watch() {
    var queued = false;
    var mo = new MutationObserver(function () {
      if (queued) return;
      queued = true;
      /* setTimeout, not rAF: rAF is paused while the page is in a background tab. */
      window.setTimeout(function () {
        queued = false;
        check();
      }, 30);
    });
    mo.observe(document.documentElement, {
      subtree: true,
      attributes: true,
      attributeFilter: ["hidden", "class", "style", "data-d3-view", "data-d3-chat"]
    });
    check();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", watch);
  else watch();

  window.D3KybFindings = {
    render: render,
    build: build,
    heal: heal,
    /* Pass the session status ("Verified" | "Review" | "Flagged" | "Not Verified"),
       or null to derive the verdict from the business's own risk data. */
    hold: hold,
    release: release,
    /* For the next ms, a business is painted straight away instead of playing the skeleton. */
    instant: function (ms) {
      instantUntil = Date.now() + (ms || 800);
    },
    setStatus: function (v) {
      statusOverride = v || null;
    }
  };
})();
