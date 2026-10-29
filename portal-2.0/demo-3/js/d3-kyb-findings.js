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

  function paint(panel, card, biz, animate) {
    try {
      panel.innerHTML = html(buildModel(card, biz));
      if (animate) {
        var root = panel.firstElementChild;
        if (root) root.classList.add("d3kf-in");
      }
    } catch (err) {
      /* Never leave the tab blank: show a message and keep the cause in the console. */
      if (window.console && console.error) console.error("D3KybFindings render failed", err);
      panel.innerHTML = '<p class="d3-workspace__hint">Findings could not be generated for this result.</p>';
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
    if (reducedMotion()) {
      panel.dataset.kfState = "ready";
      paint(panel, card, biz, false);
      return true;
    }
    panel.dataset.kfState = "loading";
    panel.__kfDone = false;
    panel.setAttribute("aria-busy", "true");
    panel.innerHTML = skeletonHtml();
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
    setStatus: function (v) {
      statusOverride = v || null;
    }
  };
})();
