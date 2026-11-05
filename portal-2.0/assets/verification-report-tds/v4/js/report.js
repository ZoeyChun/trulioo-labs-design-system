/* Verification Module V4 — editorial visual board (independent of V1/V2 UI). */
(function (global) {
  "use strict";

  /* Board cards: Summary + Ownership + Risk + Match + Web */
  var CARD_ORDER = [
    "overview",
    "ownership",
    "signals",
    "match",
    "web"
  ];

  var CARD_LABELS = {
    overview: "Summary",
    ownership: "Ownership",
    signals: "Risk Signals",
    match: "Match Signals",
    web: "Web & Social Insights"
  };

  /* Expand tabs match V2 exactly (labels + section order + detail content). */
  var EXPAND_ORDER = [
    "overview",
    "signals",
    "ownership",
    "match",
    "additional",
    "web"
  ];

  var EXPAND_LABELS = {
    overview: "Overview",
    signals: "Signals",
    ownership: "Owners & UBOs",
    match: "Match Signals & Sources",
    additional: "Additional Data",
    web: "Web & Social Insights"
  };

  /* Board View more still opens into the shared expand strip. */
  var DETAIL_ORDER = EXPAND_ORDER.slice();

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function kybProduct() {
    var products = global.VerificationReport && global.VerificationReport.products;
    return products && products.kyb ? products.kyb : null;
  }

  function getSample() {
    var kyb = kybProduct();
    if (kyb && typeof kyb.sampleData === "function") return kyb.sampleData();
    return null;
  }

  function toBiz(data) {
    var kyb = kybProduct();
    if (kyb && typeof kyb.toBiz === "function") return kyb.toBiz(data);
    return data || {};
  }

  function v1Tabs() {
    return global.D3KybResultTabs || null;
  }

  function initials(name) {
    return String(name || "?")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (part) {
        return part.charAt(0).toUpperCase();
      })
      .join("");
  }

  function tdsTone(tone) {
    var t = String(tone || "positive").toLowerCase();
    if (t === "review" || t === "warn" || t === "warning") return "intermediate";
    if (t === "negative" || t === "error" || t === "no-match") return "negative";
    if (t === "default" || t === "neutral") return "default";
    if (t === "clear" || t === "match" || t === "positive") return "positive";
    return "intermediate";
  }

  function tdsTag(label, tone, size) {
    var sz = size || "sm";
    return (
      '<span class="tds-tag tds-tag--' +
      sz +
      " tds-tag--" +
      tdsTone(tone) +
      '"><span class="tds-tag__label">' +
      esc(label) +
      "</span></span>"
    );
  }

  function tdsDataField(label, value) {
    var v = value == null || value === "" ? "—" : value;
    return (
      '<div class="tds-data-field">' +
      '<div class="tds-data-field__label-row">' +
      '<p class="tds-data-field__label">' +
      esc(label) +
      "</p></div>" +
      '<div class="tds-data-field__content">' +
      '<div class="tds-data-field__value-row">' +
      '<p class="tds-data-field__value">' +
      esc(v) +
      "</p></div></div></div>"
    );
  }

  function tdsSecondaryBtn(attrs, label, size, opts) {
    var sz = size || "sm";
    var trailing =
      opts && opts.trailingChevron
        ? '<span class="tds-btn__trailing-icon" aria-hidden="true">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none">' +
          '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M6 3.5 10.5 8 6 12.5"/>' +
          "</svg></span>"
        : "";
    return (
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--' +
      sz +
      '"' +
      (attrs ? " " + attrs : "") +
      '><span class="tds-btn__label">' +
      label +
      "</span>" +
      trailing +
      "</button>"
    );
  }

  function viewMoreLink(cardId) {
    return (
      '<button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--secondary tds-icon-btn--circular v4-card__more" data-v4-view-more="' +
      esc(cardId) +
      '" aria-label="View more">' +
      '<span class="tds-icon-btn__icon" aria-hidden="true">' +
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none">' +
      '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M6 3.5 10.5 8 6 12.5"/>' +
      "</svg></span></button>"
    );
  }

  function cardHeadHtml(id, title, summary, trailHtml) {
    return (
      '<div class="tds-section-header v4-card__section-header">' +
      '<div class="tds-section-header__left">' +
      '<div class="tds-section-header__title-stack">' +
      '<h2 class="tds-section-header__title" id="v4-title-' +
      esc(id) +
      '">' +
      esc(title) +
      "</h2>" +
      (summary
        ? '<p class="tds-section-header__subtext">' + esc(summary) + "</p>"
        : "") +
      "</div></div>" +
      '<div class="tds-section-header__right">' +
      (trailHtml || viewMoreLink(id)) +
      "</div></div>"
    );
  }

  function riskBandShort(risk) {
    if (risk === "high") return "High";
    if (risk === "low") return "Low";
    return "Medium";
  }

  function riskBandTone(risk) {
    if (risk === "high") return "negative";
    if (risk === "low") return "positive";
    return "intermediate";
  }

  function riskIndicatorsHtml(categories) {
    return (
      '<div class="v4-risk-indicators">' +
      '<p class="v4-section-label">Risk indicators</p>' +
      '<ul class="v4-risk-indicators__list">' +
      categories
        .map(function (item) {
          return (
            '<li class="v4-risk-indicators__row">' +
            '<span class="v4-risk-indicators__name">' +
            esc(item.label) +
            "</span>" +
            '<span class="v4-risk-indicators__meta">' +
            '<span class="v4-risk-indicators__score">' +
            esc(String(item.score)) +
            "/100</span>" +
            tdsTag(riskBandShort(item.risk), riskBandTone(item.risk), "sm") +
            "</span></li>"
          );
        })
        .join("") +
      "</ul></div>"
    );
  }

  function tdsStatCard(label, value, subLabel) {
    return (
      '<div class="tds-stat-card">' +
      '<p class="tds-stat-card__label">' +
      esc(label) +
      "</p>" +
      '<div class="tds-stat-card__value-group">' +
      '<p class="tds-stat-card__value">' +
      esc(value) +
      "</p>" +
      (subLabel
        ? '<p class="tds-stat-card__sub-label">' + esc(subLabel) + "</p>"
        : "") +
      "</div></div>"
    );
  }

  function ownerCardHtml(owner) {
    var flagged = !!(owner.flagged || owner.status === "negative");
    var nested = !!owner.nested;
    var branched = !nested && !!owner.hasBranch;
    var chipText = flagged
      ? owner.screeningLabel || owner.statusLabel || "Flagged"
      : owner.statusLabel ||
        (nested
          ? owner.type === "business"
            ? "Business"
            : "Individual"
          : "Screening clear");
    var metaParts = [
      owner.role || owner.sub || (nested ? (owner.type === "business" ? "Subsidiary" : "Connected") : "Shareholder")
    ];
    if (owner.pct) metaParts.push(owner.pct);
    if (owner.address) metaParts.push(owner.address);
    return (
      '<article class="v4-owner-card' +
      (flagged ? " v4-owner-card--flag" : "") +
      (nested ? " v4-owner-card--nested" : "") +
      (branched ? " v4-owner-card--branch" : "") +
      '" role="listitem">' +
      '<span class="v4-owner-card__avatar" aria-hidden="true">' +
      esc(initials(owner.name)) +
      "</span>" +
      '<div class="v4-owner-card__body">' +
      '<p class="v4-owner-card__name">' +
      esc(owner.name) +
      "</p>" +
      '<p class="v4-owner-card__meta">' +
      esc(metaParts.join(" · ")) +
      "</p></div>" +
      tdsTag(chipText, flagged ? "negative" : nested ? "default" : "positive") +
      "</article>"
    );
  }

  function indexOwnershipGraph(node, map) {
    if (!node) return map || {};
    var out = map || {};
    var key = String(node.name || "").toLowerCase();
    if (key) out[key] = node;
    (node.children || []).forEach(function (child) {
      indexOwnershipGraph(child, out);
    });
    (node.moreHidden || []).forEach(function (child) {
      indexOwnershipGraph(child, out);
    });
    return out;
  }

  function graphNodeToOwner(node, fallbackRole) {
    if (!node) return null;
    var address =
      node.address ||
      ((node.details &&
        node.details.fields &&
        node.details.fields.filter(function (f) {
          return /address/i.test(f.label || "");
        })[0]) ||
        {}).value ||
      "";
    return {
      name: node.name,
      role:
        node.role ||
        node.subtitle ||
        fallbackRole ||
        (node.type === "business" ? "Subsidiary" : "Connected"),
      pct: node.pct || "",
      address: address,
      type: node.type || "person",
      flagged: node.risk === "high",
      statusLabel:
        node.type === "business" ? "Business" : "Individual",
      nested: true
    };
  }

  function subsidiariesForNode(node) {
    if (!node) return [];
    var lists = [
      node.children || [],
      node.moreHidden || [],
      (node.details && node.details.connected) || []
    ];
    var seen = {};
    var out = [];
    lists.forEach(function (list) {
      list.forEach(function (child) {
        var key = String(child.name || "").toLowerCase();
        if (!key || seen[key]) return;
        seen[key] = true;
        var owner = graphNodeToOwner(child);
        if (owner) out.push(owner);
      });
    });
    return out;
  }

  function ownershipBoardGroups(owners, graph, connected) {
    var primary = owners || [];
    var primaryNames = {};
    primary.forEach(function (owner) {
      primaryNames[String(owner.name || "").toLowerCase()] = true;
    });
    var graphIndex = indexOwnershipGraph(graph && graph.tree, {});
    var used = {};
    var groups = primary.map(function (owner) {
      var key = String(owner.name || "").toLowerCase();
      var subs = subsidiariesForNode(graphIndex[key]).filter(function (sub) {
        var subKey = String(sub.name || "").toLowerCase();
        if (!subKey || primaryNames[subKey] || used[subKey]) return false;
        used[subKey] = true;
        return true;
      });
      return { owner: owner, subsidiaries: subs };
    });

    var leftoverNodes = (connected || []).filter(function (node) {
      var subKey = String(node.name || "").toLowerCase();
      return subKey && !primaryNames[subKey] && !used[subKey];
    });

    if (leftoverNodes.length) {
      var target = null;
      for (var i = 0; i < groups.length; i++) {
        var label =
          groups[i].owner.screeningLabel ||
          groups[i].owner.statusLabel ||
          "";
        if (
          groups[i].owner.flagged ||
          groups[i].owner.status === "negative" ||
          /connected|entities/i.test(label)
        ) {
          target = groups[i];
          break;
        }
      }
      if (!target) target = groups[groups.length - 1];
      if (target) {
        leftoverNodes.forEach(function (node) {
          var subKey = String(node.name || "").toLowerCase();
          if (!subKey || used[subKey]) return;
          used[subKey] = true;
          target.subsidiaries.push(
            graphNodeToOwner(node, node.role || "Connected")
          );
          var deeper = subsidiariesForNode(graphIndex[subKey] || node).filter(
            function (child) {
              var childKey = String(child.name || "").toLowerCase();
              if (!childKey || primaryNames[childKey] || used[childKey]) {
                return false;
              }
              used[childKey] = true;
              return true;
            }
          );
          target.subsidiaries = target.subsidiaries.concat(deeper);
        });
      }
    }

    return groups;
  }

  function ownerGroupHtml(group) {
    var owner = group.owner;
    var subsidiaries = group.subsidiaries || [];
    var parent = Object.assign({}, owner, {
      hasBranch: subsidiaries.length > 0
    });
    return (
      '<div class="v4-owner-group' +
      (subsidiaries.length ? " v4-owner-group--branch" : "") +
      '">' +
      ownerCardHtml(parent) +
      (subsidiaries.length
        ? '<div class="v4-owner-group__subs" role="list" aria-label="Connected entities for ' +
          esc(owner.name) +
          '">' +
          subsidiaries.map(ownerCardHtml).join("") +
          "</div>"
        : "") +
      "</div>"
    );
  }

  function matrixCellHtml(row) {
    return (
      '<li class="v4-matrix__row">' +
      '<div class="v4-matrix__main">' +
      '<span class="v4-matrix__label">' +
      esc(row.field) +
      "</span>" +
      '<span class="v4-matrix__meta">' +
      esc(row.input) +
      (row.sources ? " · " + esc(row.sources) : "") +
      "</span></div>" +
      tdsTag(row.status, row.status) +
      "</li>"
    );
  }

  function matrixListHtml(rows) {
    return (
      '<ul class="v4-matrix">' + rows.map(matrixCellHtml).join("") + "</ul>"
    );
  }

  function sourceCardHtml(card) {
    var linked = card.href && card.href !== "#";
    var inner =
      '<span class="v4-source__mark">' +
      esc(card.mark) +
      '</span><p class="v4-source__title">' +
      esc(card.title) +
      '</p><p class="v4-source__meta">' +
      esc(card.meta) +
      "</p>";
    if (!linked) return '<div class="v4-source">' + inner + "</div>";
    return (
      '<a class="v4-source v4-source--link" href="' +
      esc(card.href) +
      '" target="_blank" rel="noopener noreferrer">' +
      inner +
      "</a>"
    );
  }

  function sourceGroupHtml(label, cards, emptyText) {
    return (
      '<p class="v4-section-label">' +
      esc(label) +
      '<span class="v4-section-label__count">' +
      esc(String(cards.length)) +
      "</span></p>" +
      (cards.length
        ? '<div class="v4-source-grid">' + cards.map(sourceCardHtml).join("") + "</div>"
        : '<p class="v4-card__lede">' + esc(emptyText) + "</p>")
    );
  }

  function tdsLinkField(label, href, text) {
    return (
      '<div class="tds-data-field">' +
      '<div class="tds-data-field__label-row">' +
      '<p class="tds-data-field__label">' +
      esc(label) +
      "</p></div>" +
      '<div class="tds-data-field__content">' +
      '<div class="tds-data-field__value-row">' +
      '<a class="tds-data-field__value v4-detail__link" href="' +
      esc(href) +
      '" target="_blank" rel="noopener noreferrer">' +
      esc(text || href) +
      "</a></div></div></div>"
    );
  }

  function mountUboGraph(container, data) {
    if (!container) return false;
    var Graph = global.KybUboGraph;
    var Ubo = global.D3KybUboGraph;
    if (!Graph || typeof Graph.mount !== "function") return false;
    var biz = toBiz(data);
    var graph =
      Ubo && typeof Ubo.graphFromBiz === "function"
        ? Ubo.graphFromBiz(biz)
        : data.ownershipGraph || null;
    if (!graph || !graph.tree) return false;
    if (typeof Graph.unmount === "function") {
      try {
        Graph.unmount(container);
      } catch (err) {
        /* ignore */
      }
    }
    Graph.mount(container, {
      tree: graph.tree,
      riskFilter: graph.riskFilter || null
    });
    return true;
  }

  function unmountUboGraph(container) {
    if (
      !container ||
      !global.KybUboGraph ||
      typeof global.KybUboGraph.unmount !== "function"
    ) {
      return;
    }
    try {
      global.KybUboGraph.unmount(container);
    } catch (err) {
      /* ignore */
    }
  }

  function buildCards(data) {
    var biz = toBiz(data);
    var overview = data.overview || {};
    var ownership = data.ownership || data.ownershipTableRows || [];
    var alerts = overview.alerts || [];
    var graph = data.ownershipGraph || {};
    var rootDetails = (graph.tree && graph.tree.details) || {};
    var graphFindings = rootDetails.findings || [];
    var connected = rootDetails.connected || [];
    var Tabs = v1Tabs();
    var matchData =
      Tabs && typeof Tabs.matchDataForBiz === "function"
        ? Tabs.matchDataForBiz(biz)
        : null;
    var onlineSources =
      data.onlineSources ||
      (Tabs && typeof Tabs.onlineSourcesForBiz === "function"
        ? Tabs.onlineSourcesForBiz(biz)
        : []);
    var truliooCaps =
      Tabs && typeof Tabs.truliooCapabilities === "function"
        ? Tabs.truliooCapabilities()
        : [];
    var social =
      data.socialProfile ||
      (Tabs && typeof Tabs.socialProfileForBiz === "function"
        ? Tabs.socialProfileForBiz(biz)
        : null);

    var verified = data.verified !== false;
    var riskScore = typeof data.riskScore === "number" ? data.riskScore : 87;
    var riskBand =
      riskScore >= 70 ? "high" : riskScore >= 40 ? "medium" : "low";
    var gaugeLabel =
      riskBand === "high" ? "High Risk" : riskBand === "medium" ? "Medium Risk" : "Low Risk";
    var outcome =
      data.outcomeLabel ||
      (riskBand === "high"
        ? "High Risk Entity"
        : riskBand === "medium"
          ? "Medium Risk Entity"
          : data.riskLabel || (verified ? "Verified" : "Review"));
    var flaggedOwners = ownership.filter(function (o) {
      return o.flagged || o.status === "negative";
    });
    var isVirtualOffice = /virtual|formations|agent/i.test(overview.address || "");
    var isZeroEmployees = /^0\s/.test(overview.sizing || "");
    var regYear = (overview.regDate || "").match(/\d{4}/);
    var companyAge = regYear ? (new Date().getFullYear() - parseInt(regYear[0], 10)) : null;
    var matchRows = (matchData && matchData.rows) || [];
    var matchedCount = matchRows.filter(function (r) { return r.status === "match"; }).length;
    var totalFields = matchRows.length;
    var matchPct = totalFields ? Math.round((matchedCount / totalFields) * 100) : 0;
    var ownerDepth =
      data.ownerDepth ||
      ((graph.tree && graph.tree.children) ? "2 layers" : "1 layer");
    var entityName = data.name || "This business";
    var riskCategories = data.riskCategories || [
      { label: "Business Model", score: 84, risk: "high" },
      { label: "Financial Health", score: 68, risk: "high" },
      { label: "Fraud & Financial Crimes", score: 63, risk: "medium" },
      { label: "Governance & Compliance", score: 52, risk: "high" },
      { label: "Third-Party & Market", score: 57, risk: "low" }
    ];
    var emphasizeRisk = riskBand === "high" || riskBand === "medium";
    var markTone = riskBand === "high" ? "negative" : "intermediate";
    function riskMark(text) {
      if (!emphasizeRisk) return esc(text);
      return (
        '<mark class="v4-card__lede-mark v4-card__lede-mark--' +
        markTone +
        '">' +
        esc(text) +
        "</mark>"
      );
    }
    var heroParts = [];
    heroParts.push(
      esc(entityName) +
        " is registered as a " +
        esc(
          overview.legalForm
            ? overview.legalForm.charAt(0).toLowerCase() + overview.legalForm.slice(1)
            : "private limited company"
        ) +
        (companyAge !== null
          ? ", incorporated " + esc(String(companyAge)) + " years ago"
          : "") +
        (data.country ? " in " + esc(data.country) : "") +
        "."
    );
    if (isVirtualOffice || isZeroEmployees) {
      if (isVirtualOffice && isZeroEmployees) {
        heroParts.push(
          "Public registry data shows a " +
            riskMark("virtual / formations-agent office address") +
            " and " +
            riskMark("no reported employees or paid-up operational footprint") +
            "."
        );
      } else if (isVirtualOffice) {
        heroParts.push(
          "Public registry data shows a " +
            riskMark("virtual / formations-agent office address") +
            "."
        );
      } else {
        heroParts.push(
          "Public registry data shows " +
            riskMark("no reported employees or paid-up operational footprint") +
            "."
        );
      }
    }
    if (flaggedOwners.length || graphFindings.length) {
      var ownerBit = flaggedOwners.length
        ? riskMark(
            flaggedOwners.length +
              " of " +
              Math.max(ownership.length, 1) +
              " shareholders flagged for review"
          )
        : riskMark("Ownership links need review");
      var findingBit = graphFindings[0]
        ? ", including " + riskMark(graphFindings[0].replace(/\.$/, ""))
        : "";
      heroParts.push(ownerBit + findingBit + ".");
    } else if (ownership.length) {
      heroParts.push(
        esc(String(ownership.length)) +
          " shareholder" +
          (ownership.length === 1 ? "" : "s") +
          " identified across " +
          esc(ownerDepth) +
          "."
      );
    }
    heroParts.push(
      riskBand === "high"
        ? "Overall risk posture is " +
            riskMark("elevated") +
            " pending deeper identity and presence checks."
        : riskBand === "medium"
          ? "Several " +
            riskMark("signals warrant follow-up") +
            " before treating this entity as low risk."
          : "Registry attributes largely match with limited residual risk."
    );
    /* data.heroLede wins over the derived lede; **phrases** become risk marks. */
    function formatHeroLine(line) {
      return String(line)
        .split("**")
        .map(function (part, i) {
          return i % 2 ? riskMark(part) : esc(part);
        })
        .join("");
    }
    var heroBulletLines =
      data.heroLede && data.heroLede.length
        ? data.heroLede.map(formatHeroLine)
        : heroParts.slice(0, 4);
    var heroBulletsHtml =
      '<ul class="v4-hero__bullets">' +
      heroBulletLines
        .map(function (line) {
          return '<li class="v4-hero__bullet">' + line + "</li>";
        })
        .join("") +
      "</ul>";
    var suggestedActions = data.suggestedActions || [
      { label: "Review ownership", target: "ownership" },
      { label: "Review risk signals", target: "signals" }
    ];
    function riskGaugeHtml(opts) {
      var options = opts || {};
      var showLabel = options.showLabel !== false;
      return (
        '<div class="v4-risk-gauge' +
        (options.extraClass ? " " + options.extraClass : "") +
        '">' +
        '<div class="score-gauge-host" data-score="' +
        esc(String(riskScore)) +
        '" data-risk="' +
        esc(riskBand) +
        '"' +
        (showLabel ? ' data-label="' + esc(gaugeLabel) + '"' : "") +
        ' data-show-percent="false" data-max="100" aria-label="' +
        esc(gaugeLabel + " score " + riskScore) +
        '"></div></div>'
      );
    }
    var mapSrc = data.mapSrc || "../../verification-report/assets/kyb/map.png";
    var countryLabel = data.country || "United States";
    /* The stored address carries a trailing risk note after " - "; the card
       shows the registered address itself. */
    var registeredAddress = String(overview.address || data.addr || "")
      .split(" - ")[0]
      .trim();
    var flagSrc = /united kingdom|\buk\b|england|britain/i.test(countryLabel)
      ? "../../../Demo%201/assets/icons/flag-uk.svg"
      : "../v2/assets/overview/flag-us.svg";

    function entityFactRow(label, value, trailingHtml) {
      return (
        '<div class="v4-entity__fact">' +
        '<div class="v4-entity__fact-text">' +
        '<span class="v4-entity__fact-label">' +
        esc(label) +
        '</span><span class="v4-entity__fact-value">' +
        esc(value == null || value === "" ? "—" : value) +
        "</span></div>" +
        (trailingHtml || "") +
        "</div>"
      );
    }

    return [
      {
        id: "overview",
        span: "hero",
        html: function () {
          return (
            '<img class="v4-hero__map" src="' +
            esc(mapSrc) +
            '" alt="" width="769" height="182" aria-hidden="true">' +
            '<div class="v4-hero__copy">' +
            '<div class="v4-hero__gauge" aria-label="Risk score">' +
            riskGaugeHtml({ showLabel: false }) +
            "</div>" +
            '<div class="v4-hero__headline">' +
            '<h2 class="v4-card__title v4-card__title--hero" id="v4-title-overview">' +
            esc(outcome) +
            "</h2>" +
            heroBulletsHtml +
            "</div>" +
            '<div class="v4-suggested" aria-label="Suggested actions">' +
            '<p class="v4-section-label">Suggested Actions</p>' +
            '<div class="v4-suggested__ctas">' +
            suggestedActions
              .map(function (action) {
                return tdsSecondaryBtn(
                  'data-v4-view-more="' + esc(action.target) + '"',
                  esc(action.label),
                  "md",
                  { trailingChevron: true }
                );
              })
              .join("") +
            "</div></div></div>" +
            '<div class="v4-hero__rail">' +
            '<aside class="v4-entity" aria-label="Entity information">' +
            '<div class="v4-entity__facts">' +
            entityFactRow(
              "Country / Jurisdiction",
              countryLabel,
              '<span class="v4-entity__fact-flag" aria-hidden="true"><img src="' +
                esc(flagSrc) +
                '" alt="" width="18" height="12"></span>'
            ) +
            entityFactRow("Registration status", overview.status || "—") +
            entityFactRow(
              "BRN / Registration number",
              overview.regNumber || "—"
            ) +
            entityFactRow("Business address", registeredAddress) +
            entityFactRow("Industry code", overview.industry || "—") +
            "</div>" +
            '<button type="button" class="v4-entity__more" data-v4-view-more="overview">' +
            "View more details" +
            "</button>" +
            "</aside></div>"
          );
        }
      },
      {
        id: "ownership",
        span: "ownership",
        title: "Ownership",
        summary:
          ownership.length +
          " shareholders identified, " +
          ownerDepth +
          " deep" +
          (flaggedOwners.length
            ? ". " + flaggedOwners.length + " flagged for review"
            : ""),
        ask: "Who are the ultimate beneficial owners?",
        html: function () {
          var owners = ownership.length ? ownership : [];
          var groups = ownershipBoardGroups(owners, graph, connected);
          return (
            cardHeadHtml("ownership", "Ownership", this.summary) +
            '<div class="v4-owners" role="list" aria-label="Ultimate beneficial owners">' +
            groups.map(ownerGroupHtml).join("") +
            "</div>"
          );
        },
        detail: function () {
          var owners = ownership.length ? ownership : [];
          var groups = ownershipBoardGroups(owners, graph, connected);
          return (
            '<div class="v4-ownership-views" data-v4-ownership-views>' +
            '<div class="tds-segmented-control tds-segmented-control--sm v4-view-toggle" role="tablist" aria-label="Ownership view">' +
            '<button type="button" class="tds-segmented-control__item tds-segmented-control__item--selected" role="tab" id="v4-ownership-tab-list" ' +
            'aria-controls="v4-ownership-panel-list" data-v4-ownership-view="list" aria-selected="true" aria-pressed="true">' +
            '<span class="tds-segmented-control__label">List</span></button>' +
            '<button type="button" class="tds-segmented-control__item" role="tab" id="v4-ownership-tab-graph" ' +
            'aria-controls="v4-ownership-panel-graph" data-v4-ownership-view="graph" aria-selected="false" aria-pressed="false">' +
            '<span class="tds-segmented-control__label">Graph</span></button>' +
            "</div>" +
            '<div class="v4-ownership-panel" id="v4-ownership-panel-list" role="tabpanel" ' +
            'aria-labelledby="v4-ownership-tab-list" data-v4-ownership-panel="list">' +
            '<p class="v4-section-label">Shareholders & connected entities</p>' +
            '<div class="v4-owners" role="list">' +
            groups.map(ownerGroupHtml).join("") +
            "</div>" +
            "</div>" +
            '<div class="v4-ownership-panel" id="v4-ownership-panel-graph" role="tabpanel" ' +
            'aria-labelledby="v4-ownership-tab-graph" data-v4-ownership-panel="graph" hidden>' +
            '<div class="v4-ubo-graph kyb-ownership-graph" data-v4-ubo-graph ' +
            'aria-label="Ownership structure graph"></div>' +
            "</div></div>"
          );
        }
      },
      {
        id: "signals",
        span: "signals",
        title: "Risk Signals",
        summary:
          gaugeLabel +
          " · " +
          (alerts.length
            ? alerts.filter(function (a) {
                return /none found/i.test(a);
              }).length +
              "/" +
              alerts.length +
              " screening checks clear"
            : "Risk categories scored across the portfolio"),
        ask: "Which risk signals are driving this score?",
        html: function () {
          return (
            cardHeadHtml("signals", "Risk Signals", this.summary) +
            riskIndicatorsHtml(riskCategories)
          );
        },
        detail: function () {
          return (
            '<div class="v4-metrics">' +
            tdsDataField("Overall score", riskScore + " / 100") +
            tdsDataField("Risk band", gaugeLabel) +
            tdsDataField(
              "Screening",
              alerts.length
                ? alerts.filter(function (a) {
                    return /none found/i.test(a);
                  }).length +
                  "/" +
                  alerts.length +
                  " clear"
                : "—"
            ) +
            "</div>" +
            riskIndicatorsHtml(riskCategories) +
            (alerts.length
              ? '<p class="v4-section-label">Screening checks</p><div class="v4-metrics">' +
                alerts
                  .map(function (alert) {
                    return tdsDataField(
                      alert.split(":")[0] || "Check",
                      /none found/i.test(alert) ? "None found" : alert
                    );
                  })
                  .join("") +
                "</div>"
              : "")
          );
        }
      },
      {
        id: "match",
        span: "match",
        title: "Match Signals",
        summary:
          matchedCount +
          "/" +
          totalFields +
          " fields matched" +
          (matchPct === 100 ? "" : " · " + (totalFields - matchedCount) + " need review"),
        ask:
          matchPct === 100
            ? "Which sources confirmed these match signals?"
            : "Which match signals still need review?",
        html: function () {
          var rows = ((matchData && matchData.rows) || []).slice(0, 4);
          if (!rows.length) {
            rows = alerts.slice(0, 4).map(function (alert) {
              var clear = /none found/i.test(alert);
              return {
                field: alert.split(":")[0] || alert,
                input: clear ? "None found" : alert,
                status: clear ? "clear" : "review",
                sources: ""
              };
            });
          }
          return (
            cardHeadHtml(
              "match",
              "Match Signals",
              this.summary,
              tdsTag(
                matchData && matchData.verified ? "Verified" : "Review",
                matchData && matchData.verified ? "positive" : "review"
              ) + viewMoreLink("match")
            ) +
            matrixListHtml(rows) +
            '<div class="v4-card__foot">' +
            '<span class="v4-card__meta">' +
            esc(
              (matchData && matchData.metrics && matchData.metrics.sources) ||
                "Sources"
            ) +
            "</span>" +
            tdsSecondaryBtn('data-v4-view-more="match"', "Sources") +
            "</div>"
          );
        },
        detail: function () {
          var rows = (matchData && matchData.rows) || [];
          if (!rows.length) {
            rows = alerts.map(function (alert) {
              var clear = /none found/i.test(alert);
              return {
                field: alert.split(":")[0] || alert,
                input: clear ? "None found" : alert,
                status: clear ? "clear" : "review",
                sources: ""
              };
            });
          }
          var metrics = (matchData && matchData.metrics) || {};
          /* Two named groups, as in V2: what Trulioo ran, then the public
             records it read. One mixed "Datasources" list hid the
             difference between them. */
          var truliooCards = (truliooCaps || []).map(function (cap, i) {
            return { mark: String(i + 1), title: cap.title, meta: cap.desc };
          });
          var onlineCards = (onlineSources || []).map(function (src) {
            return {
              mark: "↗",
              title: src.name,
              meta: src.desc,
              href: src.url
            };
          });
          return (
            '<div class="v4-metrics">' +
            tdsDataField("Fields checked", metrics.fields || matchedCount + "/" + totalFields) +
            tdsDataField("Sources", metrics.sources || "—") +
            tdsDataField(
              "Outcome",
              matchData && matchData.verified ? "Verified" : "Not verified"
            ) +
            "</div>" +
            '<p class="v4-section-label">Match matrix</p>' +
            matrixListHtml(rows) +
            sourceGroupHtml(
              "Trulioo sources",
              truliooCards,
              "No Trulioo sources listed."
            ) +
            sourceGroupHtml(
              "Online sources",
              onlineCards,
              "No online sources listed."
            )
          );
        }
      },
      {
        id: "web",
        span: "web",
        title: "Web & Social Insights",
        summary: (function () {
          var presenceLevel = social && social.highRisk ? "Thin" : "Active";
          var domain = (social && social.domain) || "—";
          var companySize = (social && social.companySize) || overview.sizing || "—";
          return domain !== "—"
            ? domain +
                " · " +
                presenceLevel.toLowerCase() +
                " public footprint · " +
                companySize
            : "No domain on file for this business.";
        })(),
        ask: "What web and social insights do we have?",
        html: function () {
          var presenceLevel = social && social.highRisk ? "Thin" : "Active";
          var domain = (social && social.domain) || "—";
          var liFollowers = social ? social.linkedinFollowers || "0" : "—";
          var igPosts = social ? social.instagramPostCount || "0" : "—";
          var twFollowers = social ? social.twitterFollowers || "0" : "—";
          var about =
            (social && social.linkedinAbout) ||
            overview.industryNote ||
            "No public web profile summary on file.";
          var registrar =
            (social && social.domainRegistrar) || "GoDaddy.com, LLC";
          var registered =
            (social && social.domainRegistered) ||
            (social && social.founded) ||
            "1 Feb 2019";
          var expires = (social && social.domainExpires) || "1 Feb 2029";
          return (
            cardHeadHtml("web", "Web & Social Insights", this.summary) +
            '<div class="v4-web-hero">' +
            '<div class="v4-web-hero__top">' +
            '<div class="v4-web-hero__domain">' +
            '<p class="v4-web-hero__kicker">Domain</p>' +
            '<p class="v4-web-hero__value">' +
            esc(domain) +
            '</p><p class="v4-web-hero__note">' +
            esc(String(about).split("\n")[0]) +
            "</p></div>" +
            '<div class="v4-web-hero__status">' +
            tdsTag(
              presenceLevel + " presence",
              social && social.highRisk ? "review" : "positive"
            ) +
            "</div></div>" +
            '<div class="v4-web-hero__divider" aria-hidden="true"></div>' +
            '<div class="v4-web-facts" aria-label="Domain registration">' +
            tdsDataField("Domain Registrar", registrar) +
            tdsDataField("Domain Registered", registered) +
            tdsDataField("Domain Expires", expires) +
            "</div></div>" +
            '<div class="v4-web-channels" aria-label="Social channels">' +
            tdsStatCard("LinkedIn", liFollowers, "followers") +
            tdsStatCard("Instagram", igPosts, "posts") +
            tdsStatCard("X / Twitter", twFollowers, "followers") +
            "</div>"
          );
        },
        detail: function () {
          var presenceLevel = social && social.highRisk ? "Thin" : "Active";
          var domain = (social && social.domain) || "";
          var handle = ((social && social.handle) || "meridian").replace(/^@/, "");
          var companySize = (social && social.companySize) || overview.sizing || "—";
          var hq = (social && social.headquarters) || data.city || "—";
          var about =
            (social && social.linkedinAbout) ||
            overview.industryNote ||
            "No public web profile summary on file.";
          return (
            '<div class="v4-web-hero">' +
            '<div class="v4-web-hero__domain">' +
            '<p class="v4-web-hero__kicker">Domain</p>' +
            '<p class="v4-web-hero__value">' +
            esc(domain || "—") +
            '</p><p class="v4-web-hero__note">' +
            esc(String(about).split("\n")[0]) +
            "</p></div>" +
            '<div class="v4-web-hero__status">' +
            tdsTag(
              presenceLevel + " presence",
              social && social.highRisk ? "review" : "positive"
            ) +
            "</div></div>" +
            '<p class="v4-section-label">Domain record</p>' +
            '<div class="v4-metrics">' +
            tdsDataField(
              "Website status",
              (social && social.websiteStatus) ||
                (social && social.highRisk
                  ? "Unavailable — domain expired or no live site"
                  : "Active")
            ) +
            tdsDataField(
              "Domain registrar",
              (social && social.domainRegistrar) || "GoDaddy.com, LLC"
            ) +
            tdsDataField(
              "Domain registered",
              (social && social.domainRegistered) ||
                (social && social.founded) ||
                "1 Feb 2019"
            ) +
            tdsDataField(
              "Domain Expires",
              (social && social.domainExpires) || "1 Feb 2029"
            ) +
            (domain
              ? tdsLinkField("Website", "https://" + domain, domain)
              : tdsDataField("Website", "—")) +
            "</div>" +
            '<p class="v4-section-label">Social profiles</p>' +
            '<div class="v4-metrics">' +
            tdsLinkField(
              "LinkedIn",
              "https://linkedin.com/company/" + handle,
              "linkedin.com/company/" + handle
            ) +
            tdsLinkField(
              "Instagram",
              "https://instagram.com/" + handle,
              "instagram.com/" + handle
            ) +
            tdsLinkField("Twitter/X", "https://x.com/" + handle, "x.com/" + handle) +
            tdsLinkField(
              "TikTok",
              "https://tiktok.com/" + handle,
              "tiktok.com/" + handle
            ) +
            "</div>" +
            '<p class="v4-section-label">Presence</p>' +
            '<div class="v4-metrics">' +
            tdsDataField("Company size", companySize) +
            tdsDataField("Headquarters", hq) +
            tdsDataField("Founded", (social && social.founded) || "—") +
            tdsDataField(
              "LinkedIn followers",
              (social && social.linkedinFollowers) || "0"
            ) +
            "</div>"
          );
        }
      }
    ];
  }

  function preferReducedMotion() {
    return (
      global.matchMedia &&
      global.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function expandSectionsFor(data) {
    var labels = EXPAND_LABELS;
    var order = EXPAND_ORDER.slice();
    var byId = {};
    var fromLocal = {};

    /* Prefer V4 board card details so full view matches the local design/data. */
    buildCards(data).forEach(function (card) {
      if (card && card.id && typeof card.detail === "function") {
        byId[card.id] = card;
        fromLocal[card.id] = true;
      }
    });

    /* Fill gaps V4 cards don't own yet (Overview, Additional Data) from V2. */
    var V2 = global.VerificationReportV2;
    if (V2 && typeof V2.buildSections === "function") {
      V2.buildSections(data).forEach(function (section) {
        if (
          section &&
          section.id &&
          typeof section.detail === "function" &&
          !byId[section.id]
        ) {
          byId[section.id] = section;
        }
      });
    }

    return order
      .map(function (id) {
        var section = byId[id];
        if (!section || typeof section.detail !== "function") return null;
        var label = labels[id] || section.kicker || id;
        /* V4 cards keep the insight in `summary`; V2 expand sections keep it in `title`. */
        var insight = fromLocal[id]
          ? section.summary || ""
          : section.title || section.summary || "";
        return {
          id: id,
          label: label,
          title: insight,
          summary: label,
          ask: section.ask || "",
          detail: section.detail
        };
      })
      .filter(Boolean);
  }

  function render(host, data) {
    var cards = buildCards(data);
    var expandSections = expandSectionsFor(data);

    var grid = cards
      .map(function (card, index) {
        return (
          '<article class="v4-card v4-card--' +
          esc(card.span || card.id) +
          '" id="v4-card-' +
          esc(card.id) +
          '" data-v4-card="' +
          esc(card.id) +
          '" style="--v4-i:' +
          esc(String(index)) +
          '" tabindex="-1" aria-labelledby="v4-title-' +
          esc(card.id) +
          '">' +
          '<div class="v4-card__inner">' +
          card.html() +
          "</div></article>"
        );
      })
      .join("");

    var chips = expandSections
      .map(function (section, index) {
        return (
          '<button type="button" class="tds-tab-item' +
          (index === 0 ? " tds-tab-item--active" : "") +
          '" role="tab" data-v4-detail-goto="' +
          esc(section.id) +
          '"' +
          (index === 0
            ? ' aria-selected="true" aria-current="true"'
            : ' aria-selected="false"') +
          ">" +
          '<span class="tds-tab-item__content">' +
          esc(section.label) +
          "</span>" +
          '<span class="tds-tab-item__indicator" aria-hidden="true"></span>' +
          "</button>"
        );
      })
      .join("");

    host.innerHTML =
      '<div class="v4-board" data-v4-board data-v4-mode="board" data-v4-layout="overlay">' +
      '<div class="v4-board__chrome">' +
      '<p class="v4-board__eyebrow">' +
      '<span class="v4-board__eyebrow-text">' +
      esc(data.name || "Verification report") +
      "</span></p>" +
      '<label class="v4-board__layout-switch" hidden>' +
      '<span class="v4-board__layout-switch-label">Detail</span>' +
      '<select class="v4-board__layout-select" data-v4-layout-select aria-label="Second-level detail layout">' +
      '<option value="overlay" selected>View more overlay</option>' +
      '<option value="split">Split view</option>' +
      "</select></label>" +
      /* Raw Data / Export / New verification — same three as Demo 3. */
      (global.VerificationReportActions
        ? global.VerificationReportActions.actionsHtml({ size: "md" })
        : "") +
      "</div>" +
      '<div class="v4-board__workspace" data-v4-workspace>' +
      '<div class="v4-board__scroller" data-v4-scroller>' +
      '<div class="v4-board__grid">' +
      grid +
      "</div></div>" +
      '<div class="v4-detail" data-v4-detail hidden>' +
      '<div class="v4-detail__panel" role="dialog" aria-modal="true" aria-label="Expanded report section">' +
      '<header class="v4-detail__header">' +
      '<div class="v4-detail__header-row">' +
      '<button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--secondary tds-icon-btn--circular" data-v4-detail-back aria-label="Back to board">' +
      '<span class="tds-icon-btn__icon" aria-hidden="true">' +
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none">' +
      '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10 3.5 5.5 8 10 12.5"/>' +
      "</svg></span></button>" +
      '<h2 class="v4-detail__header-title">' +
      esc(data.name || "Verification report") +
      "</h2>" +
      '<div class="v4-detail__header-end">' +
      /* Same Raw Data / Export / New verification CTAs as board chrome. */
      (global.VerificationReportActions
        ? global.VerificationReportActions.actionsHtml({ size: "md" })
        : "") +
      "</div>" +
      "</div>" +
      '<div class="tds-tabs v4-detail__tabs">' +
      '<div class="tds-tabs__row">' +
      '<div class="tds-tabs__list" role="tablist" aria-label="Detail sections">' +
      chips +
      "</div></div>" +
      '<div class="tds-tabs__divider" aria-hidden="true"></div>' +
      "</div>" +
      "</header>" +
      '<div class="v4-detail__scroll" data-v4-detail-scroll>' +
      '<div class="v4-detail__intro">' +
      '<div class="v4-detail__intro-copy">' +
      '<p class="v4-detail__kicker" data-v4-detail-kicker></p>' +
      '<h2 class="v4-detail__title" data-v4-detail-title></h2>' +
      '<p class="v4-detail__summary" data-v4-detail-summary></p>' +
      "</div>" +
      '<div class="v4-detail__intro-tools" data-v4-detail-intro-tools hidden></div>' +
      "</div>" +
      '<div class="v4-detail__body" data-v4-detail-body></div>' +
      "</div></div></div></div></div>";

    return { cards: cards, expandSections: expandSections };
  }

  function createController(host, options) {
    var data = (options && options.data) || getSample();
    if (!host || !data) return null;

    var rendered = render(host, data);
    var cards = rendered.cards || [];
    var expandSections = rendered.expandSections || [];
    var board = host.querySelector("[data-v4-board]");
    var scroller = host.querySelector("[data-v4-scroller]");
    var detailRoot = host.querySelector("[data-v4-detail]");
    var detailBody = host.querySelector("[data-v4-detail-body]");
    var detailScroll = host.querySelector("[data-v4-detail-scroll]");
    var detailKicker = host.querySelector("[data-v4-detail-kicker]");
    var detailTitle = host.querySelector("[data-v4-detail-title]");
    var detailSummary = host.querySelector("[data-v4-detail-summary]");
    var detailIntroTools = host.querySelector("[data-v4-detail-intro-tools]");
    var layoutSelect = host.querySelector("[data-v4-layout-select]");
    var cardEls = Array.prototype.slice.call(host.querySelectorAll("[data-v4-card]"));
    var activeId = cards[0] ? cards[0].id : null;
    var expandedId = null;
    var mode = "board";
    var layout = "overlay";
    var flipTimer = null;
    var FLIP_MS = 480;
    var onCardChange = options && options.onCardChange;

    function cardById(id) {
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].id === id) return cards[i];
      }
      return null;
    }

    function expandById(id) {
      for (var i = 0; i < expandSections.length; i++) {
        if (expandSections[i].id === id) return expandSections[i];
      }
      return null;
    }

    function isExpanded() {
      return mode === "detail";
    }

    function currentLayout() {
      return layout === "split" ? "split" : "overlay";
    }

    function clearFlipStyles(el) {
      el.style.transition = "";
      el.style.transform = "";
      el.style.transformOrigin = "";
      el.style.opacity = "";
      el.style.willChange = "";
    }

    function finishFlip() {
      cardEls.forEach(clearFlipStyles);
      if (board) board.classList.remove("is-flipping");
      flipTimer = null;
    }

    /* FLIP: keep the same card nodes moving from board → vertical rail (and reverse). */
    function flipCards(applyLayout, onPlay) {
      if (!board || preferReducedMotion() || !cardEls.length) {
        applyLayout();
        if (typeof onPlay === "function") onPlay();
        return;
      }

      if (flipTimer) {
        global.clearTimeout(flipTimer);
        finishFlip();
      }

      var snapshots = cardEls.map(function (el) {
        return { el: el, first: el.getBoundingClientRect() };
      });

      board.classList.add("is-flipping");
      applyLayout();

      var boardRect = board.getBoundingClientRect();

      snapshots.forEach(function (item) {
        var el = item.el;
        var f = item.first;
        var l = el.getBoundingClientRect();
        clearFlipStyles(el);
        el.style.transition = "none";
        el.style.transformOrigin = "top left";
        el.style.willChange = "transform, opacity";

        var firstOk = f.width >= 2 && f.height >= 2;
        var lastOk = l.width >= 2 && l.height >= 2;

        if (firstOk && !lastOk) {
          /* Leaving the flow (hero on open): keep a fading ghost in place. */
          el.style.display = "flex";
          el.style.position = "absolute";
          el.style.left = f.left - boardRect.left + "px";
          el.style.top = f.top - boardRect.top + "px";
          el.style.width = f.width + "px";
          el.style.height = f.height + "px";
          el.style.margin = "0";
          el.style.zIndex = "6";
          el.style.opacity = "1";
          el.style.transform = "none";
          el.dataset.v3FlipGhost = "exit";
          return;
        }

        if (!firstOk && lastOk) {
          /* Entering the flow (hero on close): fade/rise into place. */
          el.style.opacity = "0";
          el.style.transform = "translateY(-16px) scale(0.96)";
          el.dataset.v3FlipGhost = "enter";
          return;
        }

        if (!firstOk || !lastOk) return;

        var dx = f.left - l.left;
        var dy = f.top - l.top;
        var sx = f.width / l.width;
        var sy = f.height / l.height;
        el.style.transform =
          "translate(" + dx + "px, " + dy + "px) scale(" + sx + ", " + sy + ")";
      });

      void board.offsetWidth;

      global.requestAnimationFrame(function () {
        snapshots.forEach(function (item) {
          var el = item.el;
          el.style.transition =
            "transform " +
            FLIP_MS +
            "ms cubic-bezier(0.22, 1, 0.36, 1), opacity " +
            Math.round(FLIP_MS * 0.7) +
            "ms cubic-bezier(0.22, 1, 0.36, 1)";
          if (el.dataset.v3FlipGhost === "exit") {
            el.style.opacity = "0";
            el.style.transform = "translate(-28px, -8px) scale(0.9)";
          } else {
            el.style.opacity = "";
            el.style.transform = "none";
          }
        });
        if (typeof onPlay === "function") onPlay();
      });

      flipTimer = global.setTimeout(function () {
        snapshots.forEach(function (item) {
          var el = item.el;
          if (el.dataset.v3FlipGhost) {
            el.style.display = "";
            el.style.position = "";
            el.style.left = "";
            el.style.top = "";
            el.style.width = "";
            el.style.height = "";
            el.style.margin = "";
            el.style.zIndex = "";
            delete el.dataset.v3FlipGhost;
          }
          clearFlipStyles(el);
        });
        board.classList.remove("is-flipping");
        flipTimer = null;
      }, FLIP_MS + 40);
    }

    function setLayout(next) {
      layout = next === "split" ? "split" : "overlay";
      if (board) board.setAttribute("data-v4-layout", layout);
      if (layoutSelect && layoutSelect.value !== layout) layoutSelect.value = layout;
      if (isExpanded() && expandedId) {
        openDetail(expandedId, { force: true });
      }
    }

    function ownershipGraphHost() {
      if (!detailBody) return null;
      return (
        detailBody.querySelector("[data-v2-ubo-graph]") ||
        detailBody.querySelector("[data-v4-ubo-graph]")
      );
    }

    function clearOwnershipGraph() {
      unmountUboGraph(ownershipGraphHost());
    }

    function applyOwnershipView(view) {
      if (!detailBody) return;
      var root =
        detailBody.querySelector("[data-v2-ownership-views]") ||
        detailBody.querySelector("[data-v4-ownership-views]");
      if (!root) return;
      var next = view === "graph" ? "graph" : "list";
      /* Toggle may live in the detail header tools slot. */
      host
        .querySelectorAll("[data-v2-ownership-view], [data-v4-ownership-view]")
        .forEach(function (btn) {
          var id =
            btn.getAttribute("data-v2-ownership-view") ||
            btn.getAttribute("data-v4-ownership-view");
          var on = id === next;
          btn.setAttribute("aria-selected", on ? "true" : "false");
          btn.setAttribute("aria-pressed", on ? "true" : "false");
          btn.classList.toggle("tds-segmented-control__item--selected", on);
        });
      root
        .querySelectorAll("[data-v2-ownership-panel], [data-v4-ownership-panel]")
        .forEach(function (panel) {
          var id =
            panel.getAttribute("data-v2-ownership-panel") ||
            panel.getAttribute("data-v4-ownership-panel");
          var on = id === next;
          if (on) panel.removeAttribute("hidden");
          else panel.setAttribute("hidden", "");
        });
      if (next === "graph") {
        global.requestAnimationFrame(function () {
          mountUboGraph(ownershipGraphHost(), data);
        });
      } else {
        clearOwnershipGraph();
      }
    }

    function applySignalImpactFilter(filter, sourceBtn) {
      if (!detailBody) return;
      var signalsRoot = detailBody.querySelector("[data-v2-signals]");
      if (!signalsRoot) return;
      var next = filter || "all";
      signalsRoot.setAttribute("data-v2-signal-filter-active", next);
      signalsRoot.querySelectorAll("[data-v2-signal-filter]").forEach(function (btn) {
        var on = btn.getAttribute("data-v2-signal-filter") === next;
        btn.classList.toggle("tds-filter-tab--selected", on);
        btn.setAttribute("aria-selected", on ? "true" : "false");
      });
      if (sourceBtn) {
        sourceBtn.classList.add("tds-filter-tab--selected");
        sourceBtn.setAttribute("aria-selected", "true");
      }
      signalsRoot.querySelectorAll("[data-v2-signal-row]").forEach(function (row) {
        var impact = row.getAttribute("data-v2-signal-impact");
        var show = next === "all" || impact === next;
        row.hidden = !show;
        var detailRow = row.nextElementSibling;
        if (detailRow && detailRow.hasAttribute("data-v2-signal-detail")) {
          if (!show) {
            row.classList.remove("is-expanded");
            row.setAttribute("aria-expanded", "false");
            detailRow.hidden = true;
            var toggle = row.querySelector("[data-v2-signal-toggle]");
            if (toggle) toggle.setAttribute("aria-expanded", "false");
          }
        }
      });
      signalsRoot.querySelectorAll("[data-v2-signal-category]").forEach(function (cat) {
        var visible = 0;
        cat.querySelectorAll("[data-v2-signal-row]").forEach(function (row) {
          if (!row.hidden) visible += 1;
        });
        cat.hidden = visible === 0;
      });
    }

    function focusSignalCategory(categoryId) {
      if (!detailBody || !categoryId) return;
      var accordion = detailBody.querySelector(
        '[data-v2-signal-category="' + categoryId + '"]'
      );
      if (!accordion) return;
      accordion.classList.add("tds-accordion--expanded");
      var header = accordion.querySelector("[data-v2-signal-accordion]");
      if (header) header.setAttribute("aria-expanded", "true");
      if (typeof accordion.scrollIntoView === "function") {
        accordion.scrollIntoView({
          behavior: preferReducedMotion() ? "auto" : "smooth",
          block: "nearest"
        });
      }
    }

    function syncDetailTabs(id) {
      host.querySelectorAll("[data-v4-detail-goto]").forEach(function (btn) {
        var on = btn.getAttribute("data-v4-detail-goto") === id;
        btn.classList.toggle("tds-tab-item--active", on);
        btn.setAttribute("aria-selected", on ? "true" : "false");
        if (on) btn.setAttribute("aria-current", "true");
        else btn.removeAttribute("aria-current");
      });
    }

    function clearIntroTools() {
      if (!detailIntroTools) return;
      detailIntroTools.innerHTML = "";
      detailIntroTools.hidden = true;
    }

    function parkOwnershipToggle() {
      if (!detailIntroTools || !detailBody) return;
      var toggle =
        detailBody.querySelector(".v2-view-toggle") ||
        detailBody.querySelector(".v4-view-toggle");
      clearIntroTools();
      if (!toggle) return;
      detailIntroTools.appendChild(toggle);
      detailIntroTools.hidden = false;
    }

    function fillDetail(id) {
      var section = expandById(id);
      if (!section || typeof section.detail !== "function" || !detailBody) return;
      clearOwnershipGraph();
      clearIntroTools();
      /* Match V2 expand intro: section tab label as title, insight as summary. */
      if (detailKicker) {
        detailKicker.textContent = "";
        detailKicker.hidden = true;
      }
      /* Page title stays "KYB Report"; intro shows the active section name + insight. */
      if (detailTitle) {
        detailTitle.hidden = false;
        detailTitle.textContent = section.label || id;
      }
      if (detailSummary) {
        detailSummary.textContent = section.title || "";
        detailSummary.hidden = !section.title;
      }
      detailBody.innerHTML = section.detail();
      syncDetailTabs(id);
      if (
        global.ScoreGauge &&
        typeof global.ScoreGauge.renderAll === "function"
      ) {
        global.ScoreGauge.renderAll(detailBody);
      }
      if (detailScroll) detailScroll.scrollTop = 0;
      if (id === "ownership") {
        parkOwnershipToggle();
        applyOwnershipView("list");
      }
    }

    function openDetail(id, opts) {
      if (DETAIL_ORDER.indexOf(id) === -1) return;
      var section = expandById(id);
      if (!section || typeof section.detail !== "function" || !detailRoot || !board) {
        return;
      }

      var fromBoard = !isExpanded();
      var useSplit = currentLayout() === "split";
      var force = !!(opts && opts.force);

      function applyOpen() {
        expandedId = id;
        mode = "detail";
        board.setAttribute("data-v4-mode", "detail");
        board.setAttribute("data-v4-layout", currentLayout());
        fillDetail(id);
        detailRoot.hidden = false;
      }

      function revealDetail() {
        if (!force || !detailRoot.classList.contains("is-open")) {
          global.requestAnimationFrame(function () {
            detailRoot.classList.add("is-open");
          });
        } else {
          detailRoot.classList.add("is-open");
        }
        setActive(id, { scroll: useSplit });
      }

      if (useSplit && fromBoard) {
        flipCards(applyOpen, revealDetail);
        return;
      }

      applyOpen();
      revealDetail();
    }

    function closeDetail() {
      if (!isExpanded() || !detailRoot || !board) return;
      clearOwnershipGraph();
      var wasSplit = currentLayout() === "split";
      var previous = expandedId;

      function hide() {
        detailRoot.hidden = true;
        clearIntroTools();
        if (detailBody) detailBody.innerHTML = "";
      }

      function applyClose() {
        detailRoot.classList.remove("is-open");
        mode = "board";
        board.setAttribute("data-v4-mode", "board");
        expandedId = null;
      }

      if (wasSplit && !preferReducedMotion()) {
        detailRoot.classList.remove("is-open");
        flipCards(function () {
          mode = "board";
          board.setAttribute("data-v4-mode", "board");
          expandedId = null;
        }, null);
        global.setTimeout(hide, FLIP_MS);
        if (previous) setActive(previous, { scroll: false });
        return;
      }

      applyClose();
      if (preferReducedMotion()) hide();
      else global.setTimeout(hide, 280);
      if (previous) setActive(previous, { scroll: true });
    }

    function switchDetail(id) {
      if (DETAIL_ORDER.indexOf(id) === -1) return;
      if (!isExpanded()) {
        openDetail(id);
        return;
      }
      if (id === expandedId) return;
      expandedId = id;
      fillDetail(id);
      setActive(id, { scroll: currentLayout() === "split" });
    }

    function setActive(id, opts) {
      if (!id) return;
      activeId = id;
      cardEls.forEach(function (el) {
        var on = el.getAttribute("data-v4-card") === id;
        el.setAttribute("data-v4-active", on ? "true" : "false");
        el.classList.toggle("is-selected", on && isExpanded() && currentLayout() === "split");
      });
      if (opts && opts.scroll) {
        var target = host.querySelector('[data-v4-card="' + id + '"]');
        if (target && scroller) {
          var top =
            target.getBoundingClientRect().top -
            scroller.getBoundingClientRect().top +
            scroller.scrollTop -
            16;
          scroller.scrollTo({
            top: Math.max(0, top),
            behavior: preferReducedMotion() ? "auto" : "smooth"
          });
        }
      }
      if (typeof onCardChange === "function") onCardChange(id);
    }

    function onScroll() {
      if (isExpanded() || !scroller || !cardEls.length) return;
      var scrollerTop = scroller.getBoundingClientRect().top;
      var best = activeId;
      var bestDist = Infinity;
      cardEls.forEach(function (el) {
        var dist = Math.abs(el.getBoundingClientRect().top - scrollerTop - 24);
        if (dist < bestDist) {
          bestDist = dist;
          best = el.getAttribute("data-v4-card");
        }
      });
      if (best && best !== activeId) setActive(best);
    }

    function onKeydown(event) {
      if (event.key === "Escape" && isExpanded()) {
        event.preventDefault();
        closeDetail();
      }
    }

    if (scroller) scroller.addEventListener("scroll", onScroll, { passive: true });
    global.addEventListener("keydown", onKeydown);

    if (layoutSelect) {
      layoutSelect.addEventListener("change", function () {
        setLayout(layoutSelect.value);
      });
    }

    host.addEventListener("click", function (event) {
      var viewMore = event.target.closest("[data-v4-view-more]");
      if (viewMore) {
        openDetail(viewMore.getAttribute("data-v4-view-more"));
        return;
      }
      var back = event.target.closest("[data-v4-detail-back]");
      if (back) {
        closeDetail();
        return;
      }
      var goto = event.target.closest("[data-v4-detail-goto]");
      if (goto) {
        switchDetail(goto.getAttribute("data-v4-detail-goto"));
        return;
      }
      if (isExpanded() && currentLayout() === "split") {
        var railCard = event.target.closest("[data-v4-card]");
        if (railCard && scroller && scroller.contains(railCard)) {
          var railId = railCard.getAttribute("data-v4-card");
          if (DETAIL_ORDER.indexOf(railId) !== -1 && expandById(railId)) {
            switchDetail(railId);
            return;
          }
        }
      }

      var ownershipView =
        event.target.closest("[data-v2-ownership-view]") ||
        event.target.closest("[data-v4-ownership-view]");
      if (ownershipView && detailBody && detailBody.contains(ownershipView)) {
        applyOwnershipView(
          ownershipView.getAttribute("data-v2-ownership-view") ||
            ownershipView.getAttribute("data-v4-ownership-view")
        );
        return;
      }

      var signalFilter = event.target.closest("[data-v2-signal-filter]");
      if (signalFilter && detailBody && detailBody.contains(signalFilter)) {
        applySignalImpactFilter(
          signalFilter.getAttribute("data-v2-signal-filter") || "all",
          signalFilter
        );
        return;
      }
      var signalGoto = event.target.closest("[data-v2-signal-goto]");
      if (signalGoto && detailBody && detailBody.contains(signalGoto)) {
        focusSignalCategory(signalGoto.getAttribute("data-v2-signal-goto"));
        return;
      }
      var signalAccordion = event.target.closest("[data-v2-signal-accordion]");
      if (signalAccordion && detailBody && detailBody.contains(signalAccordion)) {
        var accordion = signalAccordion.closest("[data-v2-signal-category]");
        if (accordion) {
          var expanded = accordion.classList.toggle("tds-accordion--expanded");
          signalAccordion.setAttribute("aria-expanded", expanded ? "true" : "false");
        }
        return;
      }
      var signalRowClick = event.target.closest("[data-v2-signal-row]");
      if (signalRowClick && detailBody && detailBody.contains(signalRowClick)) {
        var signalDetailRow = signalRowClick.nextElementSibling;
        if (signalDetailRow && signalDetailRow.hasAttribute("data-v2-signal-detail")) {
          var openRow = signalRowClick.classList.toggle("is-expanded");
          signalRowClick.setAttribute("aria-expanded", openRow ? "true" : "false");
          var signalToggle = signalRowClick.querySelector("[data-v2-signal-toggle]");
          if (signalToggle) {
            signalToggle.setAttribute("aria-expanded", openRow ? "true" : "false");
            signalToggle.setAttribute(
              "aria-label",
              openRow ? "Hide signal details" : "Show signal details"
            );
          }
          signalDetailRow.hidden = !openRow;
        }
        return;
      }
      var matchAccordion = event.target.closest("[data-v2-match-accordion]");
      if (matchAccordion && detailBody && detailBody.contains(matchAccordion)) {
        var matchSources = matchAccordion.closest("[data-v2-match-sources]");
        if (matchSources) {
          var matchOpen = matchSources.classList.toggle("tds-accordion--expanded");
          matchAccordion.setAttribute("aria-expanded", matchOpen ? "true" : "false");
        }
        return;
      }
      var matchRowClick = event.target.closest("[data-v2-match-row]");
      if (matchRowClick && detailBody && detailBody.contains(matchRowClick)) {
        var matchDetailRow = matchRowClick.nextElementSibling;
        if (matchDetailRow && matchDetailRow.hasAttribute("data-v2-match-detail")) {
          var matchExpanded = matchRowClick.classList.toggle("is-expanded");
          matchRowClick.setAttribute(
            "aria-expanded",
            matchExpanded ? "true" : "false"
          );
          var matchToggle = matchRowClick.querySelector("[data-v2-match-toggle]");
          if (matchToggle) {
            matchToggle.setAttribute(
              "aria-expanded",
              matchExpanded ? "true" : "false"
            );
            matchToggle.setAttribute(
              "aria-label",
              matchExpanded ? "Hide source details" : "Show source details"
            );
          }
          matchDetailRow.hidden = !matchExpanded;
        }
        return;
      }

    });

    setActive(activeId);

    if (
      global.ScoreGauge &&
      typeof global.ScoreGauge.renderAll === "function"
    ) {
      global.ScoreGauge.renderAll(host);
    }

    /* Raw Data / Export / New verification — same three as Demo 3. */
    if (global.VerificationReportActions) {
      global.VerificationReportActions.bind(host, {
        data: data,
        onNewVerification: function () {
          closeDetail();
          setActive(CARD_ORDER[0], { scroll: true });
          if (options && typeof options.onNewVerification === "function") {
            options.onNewVerification();
          }
        }
      });
    }

    return {
      goToCard: function (id) {
        if (DETAIL_ORDER.indexOf(id) !== -1 && expandById(id)) {
          if (isExpanded()) switchDetail(id);
          else openDetail(id);
          return;
        }
        if (CARD_ORDER.indexOf(id) === -1) return;
        if (isExpanded()) closeDetail();
        setActive(id, { scroll: true });
      },
      openDetail: openDetail,
      closeDetail: closeDetail,
      setLayout: setLayout,
      getActiveCard: function () {
        return isExpanded() ? expandedId : activeId;
      },
      getMode: function () {
        return mode;
      },
      getLayout: function () {
        return currentLayout();
      },
      getCardIds: function () {
        return CARD_ORDER.slice();
      },
      getExpandIds: function () {
        return DETAIL_ORDER.slice();
      },
      destroy: function () {
        if (flipTimer) {
          global.clearTimeout(flipTimer);
          finishFlip();
        }
        clearOwnershipGraph();
        global.removeEventListener("keydown", onKeydown);
        if (scroller) scroller.removeEventListener("scroll", onScroll);
        host.innerHTML = "";
      }
    };
  }

  global.VerificationReportV4 = {
    mount: function (host, options) {
      return createController(host, options || {});
    },
    cardIds: CARD_ORDER.slice(),
    expandIds: EXPAND_ORDER.slice(),
    cardLabels: Object.assign({}, CARD_LABELS),
    expandLabels: Object.assign({}, EXPAND_LABELS)
  };
})(typeof window !== "undefined" ? window : globalThis);
