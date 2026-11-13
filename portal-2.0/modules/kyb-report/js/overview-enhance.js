/* Overview enhance — port of Demo 3 findings upgradeHero + tidyHighlights.
   Runs after D3KybPanels.mount(panel, "summary"). */
(function (global) {
  "use strict";

  var HERO_JUMP_TAB = {
    ownership: "ownership",
    presence: "web",
    "match-signals": "signals",
    signals: "risk",
    "business-insights": "additional",
    financial: "additional"
  };
  var NATIVE_NAME = "Meridian Apex Consulting Inc.";
  var HIGHLIGHT_CARDS = [
    { jump: "signals", name: "Risk Analysis" },
    { jump: "ownership", name: "Owners & UBOs" },
    { jump: "match-signals", name: "Match Signals" },
    { jump: "presence", name: "Web Insights" },
    { jump: "financial", name: "Additional Data", detail: "Virtual office address" }
  ];

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function assetUrl(api, file) {
    var base = (api && api.assetBase) || "";
    if (base && base.slice(-1) !== "/") base += "/";
    return base + file;
  }

  var STATUS_FLAT_ICON =
    '<svg class="kr-overview-status__svg" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
    '<circle cx="10" cy="10" r="7.25" stroke="currentColor" stroke-width="1.5"/>' +
    '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m6.5 10.2 2.2 2.2 4.6-4.7"/></svg>';

  function markHtml(text, tone) {
    return (
      '<mark class="d3h-card__lede-mark d3h-card__lede-mark--' +
      (tone || "positive") +
      '">' +
      esc(text) +
      "</mark>"
    );
  }

  function parsePct(value) {
    var n = parseFloat(String(value == null ? "" : value).replace(/[^\d.]/g, ""));
    return isNaN(n) ? -1 : n;
  }

  /* Exactly 4 bullets from Owners & UBOs table/graph rows. */
  function ownershipBulletsFromBiz(biz) {
    var rows = Array.isArray(biz && biz.ownership) ? biz.ownership : [];
    var people = rows.filter(function (r) {
      return r && r.type === "person";
    });
    var maxDegree = 0;
    rows.forEach(function (r) {
      var d = parseInt(r.degree, 10);
      if (!isNaN(d) && d > maxDegree) maxDegree = d;
    });
    var layerLabel =
      maxDegree >= 2 ? "2 (Indirect)" : maxDegree === 1 ? "1 (Direct)" : "0 (Root)";
    var ranked = people.slice().sort(function (a, b) {
      var uboA = /ubo/i.test(String(a.sub || a.statusLabel || "")) ? 1 : 0;
      var uboB = /ubo/i.test(String(b.sub || b.statusLabel || "")) ? 1 : 0;
      if (uboA !== uboB) return uboB - uboA;
      return parsePct(b.indirectPct) - parsePct(a.indirectPct);
    });
    var highlight = ranked.slice(0, 2);
    var bullets = [
      "Ownership layer: " + markHtml(layerLabel, "positive") + ".",
      markHtml(String(people.length), "positive") + " beneficial owner(s) identified."
    ];
    highlight.forEach(function (p) {
      var role = p.sub || "Shareholder";
      var share =
        p.indirectPct && p.indirectPct !== "—"
          ? p.indirectPct
          : p.pct || "—";
      var note = p.flagged
        ? markHtml(p.statusLabel || "Ultimate beneficial owner", "positive")
        : markHtml("ID verified", "positive");
      bullets.push(
        markHtml(p.name || "—", "positive") +
          " is " +
          esc(role) +
          " with " +
          markHtml(share, "positive") +
          " ownership — " +
          note +
          "."
      );
    });
    while (bullets.length < 4) {
      bullets.push("Ownership details are available under Owners &amp; UBOs.");
    }
    return bullets.slice(0, 4);
  }

  /* MVP No BRH overview: flat Verified + Ownership bullets (no Risk Analysis). */
  function upgradeHeroFlatVerified(panel, biz, card, api) {
    var hero = panel.querySelector(".kyb-summary-hero");
    if (!hero || !biz) return;
    var bullets = ownershipBulletsFromBiz(biz);

    var buttons = [
      { jump: "match-signals", label: "Review Match Signals" },
      { jump: "ownership", label: "View Beneficial Owner" }
    ]
      .map(function (b) {
        return (
          '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md" data-kyb-jump-tab="' +
          esc(b.jump) +
          '">' +
          esc(b.label) +
          '<span class="tds-btn__trailing-icon" aria-hidden="true">' +
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="m6 4 4 4-4 4"/></svg></span></button>'
        );
      })
      .join("");

    var r = biz.report || {};
    var cc = String(biz.cc || "US").toLowerCase();
    function fact(label, value, trailing) {
      return (
        '<div class="d3h-entity__fact"><div class="d3h-entity__fact-text">' +
        '<span class="d3h-entity__fact-label">' +
        esc(label) +
        "</span>" +
        '<span class="d3h-entity__fact-value">' +
        esc(value == null || value === "" ? "—" : value) +
        "</span></div>" +
        (trailing || "") +
        "</div>"
      );
    }
    var statusText = biz.status || "Active";
    var statusFact =
      '<div class="d3h-entity__fact"><div class="d3h-entity__fact-text">' +
      '<span class="d3h-entity__fact-label">Registration status</span>' +
      '<span class="d3h-entity__fact-value d3h-entity__fact-value--status"><i class="d3h-entity__dot' +
      (/active/i.test(statusText) ? "" : " is-off") +
      '" aria-hidden="true"></i>' +
      esc(statusText) +
      "</span></div></div>";
    var flag =
      cc === "us"
        ? '<img src="' +
          esc(assetUrl(api, "flag-us.svg")) +
          '" alt="" width="18" height="12">'
        : '<span class="fi fi-' + esc(cc) + '"></span>';

    /* Keep the same Overview card shell (hero-gauge + entity aside); only swap left content. */
    hero.outerHTML =
      '<section class="d3h-card d3h-card--hero d3h-card--hero-gauge d3h-card--tone-positive" aria-label="Verdict"><div class="d3h-card__inner">' +
      '<div class="d3h-hero__main">' +
      '<div class="d3h-hero__group">' +
      '<div class="kr-overview-status" role="status">' +
      '<div class="kr-overview-status__title-row">' +
      '<span class="kr-overview-status__icon" aria-hidden="true">' +
      STATUS_FLAT_ICON +
      "</span>" +
      '<span class="kr-overview-status__title">Verified</span></div>' +
      '<span class="kr-overview-status__meta">4/4 signals matched</span></div>' +
      '<div class="kr-overview-ownership">' +
      '<p class="d3h-section-label">Ownership</p>' +
      '<ul class="d3h-bullets">' +
      bullets
        .map(function (x) {
          return "<li>" + x + "</li>";
        })
        .join("") +
      "</ul></div></div>" +
      '<div class="d3h-suggested" aria-label="Suggested actions"><p class="d3h-section-label">Suggested Actions</p><div class="d3h-suggested__ctas">' +
      buttons +
      "</div></div></div>" +
      '<aside class="d3h-entity" aria-label="Entity information">' +
      '<div class="d3h-entity__facts">' +
      fact(
        "Country / Jurisdiction",
        biz.country || "United States",
        '<span class="d3h-entity__fact-flag" aria-hidden="true">' + flag + "</span>"
      ) +
      statusFact +
      fact("BRN / Registration number", r.regNumber || biz.reg) +
      fact("Business address", r.address || biz.addr) +
      fact("Industry code", r.industry) +
      "</div></aside></div></section>";
  }

  function upgradeHero(panel, biz, card, api) {
    var hero = panel.querySelector(".kyb-summary-hero");
    if (!hero || !biz) return;
    var tone = hero.classList.contains("kyb-summary-hero--negative")
      ? "negative"
      : hero.classList.contains("kyb-summary-hero--intermediate")
        ? "intermediate"
        : "positive";
    var name = biz.name || NATIVE_NAME;
    var titleEl = hero.querySelector(".kyb-summary-hero__risk-label");
    var title = titleEl
      ? titleEl.textContent.replace(/\s+/g, " ").trim().split(NATIVE_NAME).join(name)
      : "High Risk Entity";

    function mark(t) {
      if (tone === "positive") return markHtml(t, "positive");
      return markHtml(t, tone);
    }
    function bulletHtml(b) {
      return (b.prefix ? esc(b.prefix) : "") + mark(b.mark) + (b.rest ? esc(b.rest) : "");
    }
    var HERO_BULLETS = {
      negative: [
        { mark: "Manual review", rest: " is required before any approval decision." },
        { mark: "9 of 16 signals", rest: " raised verification flags." },
        {
          mark: "18 of 100",
          rest: " legitimacy score against peer benchmarks.",
          prefix: "Legitimacy scored "
        },
        {
          mark: "Officer IDs",
          rest: " are missing national identification for both officers."
        }
      ],
      intermediate: [
        { mark: "Analyst review", rest: " is recommended before any approval decision." },
        { mark: "4 of 16 signals", rest: " still need follow-up." },
        {
          mark: "54 of 100",
          rest: " legitimacy score against peer benchmarks.",
          prefix: "Legitimacy scored "
        },
        { mark: "Address match", rest: " is only partial across registry sources." }
      ],
      positive: [
        { mark: "Checks cleared", rest: " with no manual review required." },
        { mark: "2 of 16 signals", rest: " remain informational only." },
        {
          mark: "82 of 100",
          rest: " legitimacy score against peer benchmarks.",
          prefix: "Legitimacy scored "
        },
        { mark: "Officer IDs", rest: " are verified for both officers." }
      ]
    };
    var bullets = (HERO_BULLETS[tone] || HERO_BULLETS.negative).map(bulletHtml);

    var buttons = [].slice
      .call(hero.querySelectorAll(".kyb-summary-hero__actions [data-kyb-jump-tab]"))
      .map(function (b) {
        return {
          jump: b.getAttribute("data-kyb-jump-tab"),
          label: b.textContent.trim()
        };
      });
    [
      { jump: "signals", label: "Review Risk Analysis" },
      { jump: "match-signals", label: "Review Match Signals" }
    ].forEach(function (f) {
      if (buttons.length < 2) buttons.push(f);
    });
    buttons = buttons
      .map(function (b) {
        return (
          '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md" data-kyb-jump-tab="' +
          esc(b.jump) +
          '">' +
          esc(b.label) +
          '<span class="tds-btn__trailing-icon" aria-hidden="true">' +
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="m6 4 4 4-4 4"/></svg></span></button>'
        );
      })
      .join("");

    var r = biz.report || {};
    var cc = String(biz.cc || "US").toLowerCase();
    function fact(label, value, trailing) {
      return (
        '<div class="d3h-entity__fact"><div class="d3h-entity__fact-text">' +
        '<span class="d3h-entity__fact-label">' +
        esc(label) +
        "</span>" +
        '<span class="d3h-entity__fact-value">' +
        esc(value == null || value === "" ? "—" : value) +
        "</span></div>" +
        (trailing || "") +
        "</div>"
      );
    }
    var gaugeEl = hero.querySelector(".kyb-summary-hero__gauge");
    var score = gaugeEl ? gaugeEl.getAttribute("data-score") || "" : "";
    var statusText = biz.status || "Active";
    var statusFact =
      '<div class="d3h-entity__fact"><div class="d3h-entity__fact-text">' +
      '<span class="d3h-entity__fact-label">Registration status</span>' +
      '<span class="d3h-entity__fact-value d3h-entity__fact-value--status"><i class="d3h-entity__dot' +
      (/active/i.test(statusText) ? "" : " is-off") +
      '" aria-hidden="true"></i>' +
      esc(statusText) +
      "</span></div></div>";

    var topHtml =
      (score
        ? '<div class="d3h-hero__gaugebox"><div class="dv-di-gauge d3h-hero__gauge" data-score="' +
          esc(score) +
          '"></div></div>'
        : "") +
      '<div class="d3h-hero__verdict"><p class="d3h-hero__eyebrow">Risk Analysis</p>' +
      '<h2 class="d3h-card__title d3h-card__title--hero d3h-card__title--' +
      tone +
      '">' +
      esc(title) +
      "</h2></div>";

    var flag =
      cc === "us"
        ? '<img src="' +
          esc(assetUrl(api, "flag-us.svg")) +
          '" alt="" width="18" height="12">'
        : '<span class="fi fi-' + esc(cc) + '"></span>';

    hero.outerHTML =
      '<section class="d3h-card d3h-card--hero d3h-card--hero-gauge d3h-card--tone-' +
      tone +
      '" aria-label="Verdict"><div class="d3h-card__inner">' +
      '<div class="d3h-hero__main">' +
      '<div class="d3h-hero__group">' +
      '<div class="d3h-hero__top">' +
      topHtml +
      "</div>" +
      '<ul class="d3h-bullets">' +
      bullets
        .map(function (x) {
          return "<li>" + x + "</li>";
        })
        .join("") +
      "</ul></div>" +
      (buttons
        ? '<div class="d3h-suggested" aria-label="Suggested actions"><p class="d3h-section-label">Suggested Actions</p><div class="d3h-suggested__ctas">' +
          buttons +
          "</div></div>"
        : "") +
      "</div>" +
      '<aside class="d3h-entity" aria-label="Entity information">' +
      '<div class="d3h-entity__facts">' +
      fact(
        "Country / Jurisdiction",
        biz.country || "United States",
        '<span class="d3h-entity__fact-flag" aria-hidden="true">' + flag + "</span>"
      ) +
      statusFact +
      fact("BRN / Registration number", r.regNumber || biz.reg) +
      fact("Business address", r.address || biz.addr) +
      fact("Industry code", r.industry) +
      "</div></aside></div></section>";
  }

  function highlightCopyFor(jump, biz, version) {
    var verified = version && (version.id === "mvp-no-brh" || version.hero === "flat-verified");
    var r = (biz && biz.report) || {};

    if (jump === "match-signals") {
      var rows =
        (biz.matchSignals && Array.isArray(biz.matchSignals.rows) && biz.matchSignals.rows) ||
        [];
      var matched = rows.filter(function (row) {
        return row.status === "match" || row.status === "derived";
      }).length;
      var total = rows.length || 4;
      var noMatch = rows
        .filter(function (row) {
          return row.status === "no-match";
        })
        .map(function (row) {
          return row.field;
        });
      if (verified && noMatch.length === 0) {
        return {
          metric: matched + "/" + total + " Signals Matched",
          detail: "All checked fields aligned across sources"
        };
      }
      return {
        metric: matched + "/" + total + " Signals Matched",
        detail: noMatch.length
          ? noMatch.slice(0, 3).join(", ") + " did not match"
          : "Registry fields checked across datasources"
      };
    }

    if (jump === "ownership") {
      var owners = Array.isArray(biz.ownership) ? biz.ownership : [];
      var people = owners.filter(function (o) {
        return o.type === "person";
      });
      var ubo = people.filter(function (o) {
        return /ubo/i.test(String(o.sub || o.statusLabel || ""));
      })[0];
      var uboRisk = (Array.isArray(biz.risks) ? biz.risks : []).filter(function (risk) {
        return risk.id === "ubo";
      })[0];
      if (verified) {
        return {
          metric: people.length + " beneficial owners",
          detail: ubo
            ? ubo.name +
              " · " +
              (ubo.indirectPct && ubo.indirectPct !== "—"
                ? ubo.indirectPct + " beneficial"
                : ubo.pct || "UBO")
            : "Ownership network available"
        };
      }
      if (ubo && ubo.flagged) {
        return {
          metric: "Unverified UBO",
          detail:
            ubo.name +
            " · " +
            (ubo.statusLabel ||
              (ubo.indirectPct && ubo.indirectPct !== "—"
                ? ubo.indirectPct + " beneficial"
                : "Review ownership"))
        };
      }
      if (ubo) {
        return {
          metric: "UBO · " + ubo.name,
          detail:
            ubo.statusLabel ||
            (ubo.indirectPct && ubo.indirectPct !== "—"
              ? ubo.indirectPct + " beneficial ownership"
              : ubo.pct || "Review ownership network")
        };
      }
      return {
        metric: (uboRisk && uboRisk.label) || "Unverified UBO",
        detail:
          (uboRisk && uboRisk.evidence) || "Review Owners & UBOs for full structure"
      };
    }

    if (jump === "presence") {
      var email = (r && r.email) || "";
      var at = email.indexOf("@");
      var domain =
        at > 0
          ? email.slice(at + 1).replace(/\.example$/i, ".com")
          : String(biz.name || "meridiancapital")
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "")
              .slice(0, 18) + ".com";
      var highRisk = biz.riskLevel === "high" && !verified;
      return {
        metric: highRisk
          ? "Domain expired Feb 2025."
          : "Domain active until Feb 2027.",
        detail: highRisk
          ? domain + " · limited social presence"
          : "4 social profiles found"
      };
    }

    if (jump === "financial" || jump === "business-insights") {
      var sizing = r.sizing || "$0 revenue · 0 employees";
      var metric = sizing
        .replace(/;\s*/g, " · ")
        .replace(/\s+reported\s+/i, " ");
      return {
        metric: metric,
        detail: "Virtual office address"
      };
    }

    if (jump === "signals") {
      var risks = Array.isArray(biz.risks) ? biz.risks : [];
      var top = risks[0];
      return {
        metric: top ? top.label : "Risk Analysis",
        detail: top ? top.evidence : "Review risk signals"
      };
    }

    return null;
  }

  function tidyHighlights(panel, card, version, biz) {
    var h = panel.querySelector(".dv-summary-evidence__title");
    if (h) h.textContent = "Highlights";
    var grid = panel.querySelector(".dv-summary-evidence__grid");
    if (!grid) return;
    var cards = [].slice.call(grid.querySelectorAll(".dv-summary-card"));
    var byJump = {};
    cards.forEach(function (c) {
      byJump[c.getAttribute("data-kyb-jump-tab")] = c;
    });
    cards.forEach(function (c) {
      c.remove();
    });
    var allowed = version && version.tabIds ? version.tabIds : null;
    HIGHLIGHT_CARDS.forEach(function (def) {
      var c = byJump[def.jump];
      if (!c) return;
      var mapped = HERO_JUMP_TAB[def.jump];
      if (allowed && mapped && allowed.indexOf(mapped) === -1) return;
      var tabEl =
        card && card.querySelector('[data-d3-kyb-tab="' + mapped + '"]');
      if (card && (!tabEl || tabEl.hidden)) return;
      var cap = c.querySelector(".dv-summary-card__caption");
      if (cap) cap.textContent = def.name;
      var copy = highlightCopyFor(def.jump, biz || {}, version);
      var metric = c.querySelector(".dv-summary-card__metric");
      var det = c.querySelector(".dv-summary-card__detail");
      if (copy) {
        if (metric) metric.textContent = copy.metric;
        if (det) det.textContent = copy.detail;
      } else if (det && def.detail) {
        det.textContent = def.detail;
      }
      if (def.jump !== "signals") {
        c.querySelectorAll(".dv-summary-card__top .tds-tag").forEach(function (n) {
          n.remove();
        });
      }
      grid.appendChild(c);
    });
  }

  function enhance(panel, biz, card, api) {
    var version = (api && api.versionConfig) || { id: "default", brh: true, hero: "gauge", features: { truAi: true } };
    if (version.id === "mvp-no-brh" || version.hero === "flat-verified") {
      upgradeHeroFlatVerified(panel, biz, card, api);
    } else {
      upgradeHero(panel, biz, card, api);
    }
    if (version.features && version.features.truAi === false) {
      panel.querySelectorAll(".tds-ai-tag").forEach(function (n) {
        n.remove();
      });
    }
    panel.querySelectorAll(".d3h-hero__gauge[data-score]").forEach(function (g) {
      var s = parseFloat(g.getAttribute("data-score") || "0");
      g.setAttribute("data-risk", s < 30 ? "low" : s <= 60 ? "medium" : "high");
      g.setAttribute("data-show-percent", "false");
      g.removeAttribute("data-label");
    });
    if (global.ScoreGauge) global.ScoreGauge.renderAll(panel);
    tidyHighlights(panel, card, version, biz);
  }

  global.KybReportOverview = {
    enhance: enhance,
    HERO_JUMP_TAB: HERO_JUMP_TAB
  };
})(typeof window !== "undefined" ? window : globalThis);
