/* Verification Module V3 — editorial visual board (independent of V1/V2 UI). */
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

  /* Sections that open the second-level detail overlay via View more */
  var DETAIL_ORDER = ["ownership", "signals", "match", "web"];

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

  function tdsSecondaryBtn(attrs, label, size) {
    var sz = size || "sm";
    return (
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--' +
      sz +
      '"' +
      (attrs ? " " + attrs : "") +
      '><span class="tds-btn__label">' +
      label +
      "</span></button>"
    );
  }

  function viewMoreLink(cardId) {
    return (
      '<button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--secondary tds-icon-btn--circular v3-card__more" data-v3-view-more="' +
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
      '<div class="tds-section-header v3-card__section-header">' +
      '<div class="tds-section-header__left">' +
      '<div class="tds-section-header__title-stack">' +
      '<h2 class="tds-section-header__title" id="v3-title-' +
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
      '<div class="v3-risk-indicators">' +
      '<p class="v3-section-label">Risk indicators</p>' +
      '<ul class="v3-risk-indicators__list">' +
      categories
        .map(function (item) {
          return (
            '<li class="v3-risk-indicators__row">' +
            '<span class="v3-risk-indicators__name">' +
            esc(item.label) +
            "</span>" +
            '<span class="v3-risk-indicators__meta">' +
            '<span class="v3-risk-indicators__score">' +
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
    var chipText = flagged
      ? owner.screeningLabel || owner.statusLabel || "Flagged"
      : owner.statusLabel || "Screening clear";
    return (
      '<article class="v3-owner-card' +
      (flagged ? " v3-owner-card--flag" : "") +
      '" role="listitem">' +
      '<span class="v3-owner-card__avatar" aria-hidden="true">' +
      esc(initials(owner.name)) +
      "</span>" +
      '<div class="v3-owner-card__body">' +
      '<p class="v3-owner-card__name">' +
      esc(owner.name) +
      "</p>" +
      '<p class="v3-owner-card__meta">' +
      esc(owner.role || owner.sub || "Shareholder") +
      " · " +
      esc(owner.pct || "—") +
      (owner.address ? " · " + esc(owner.address) : "") +
      "</p></div>" +
      tdsTag(chipText, flagged ? "negative" : "positive") +
      "</article>"
    );
  }

  function matrixCellHtml(row) {
    return (
      '<li class="v3-matrix__row">' +
      '<div class="v3-matrix__main">' +
      '<span class="v3-matrix__label">' +
      esc(row.field) +
      "</span>" +
      '<span class="v3-matrix__meta">' +
      esc(row.input) +
      (row.sources ? " · " + esc(row.sources) : "") +
      "</span></div>" +
      tdsTag(row.status, row.status) +
      "</li>"
    );
  }

  function matrixListHtml(rows) {
    return (
      '<ul class="v3-matrix">' + rows.map(matrixCellHtml).join("") + "</ul>"
    );
  }

  function sourceCardHtml(card) {
    return (
      '<div class="v3-source">' +
      '<span class="v3-source__mark">' +
      esc(card.mark) +
      '</span><p class="v3-source__title">' +
      esc(card.title) +
      '</p><p class="v3-source__meta">' +
      esc(card.meta) +
      "</p></div>"
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
      '<a class="tds-data-field__value v3-detail__link" href="' +
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

  function tdsAskBtn(attrs, label) {
    return (
      '<button type="button" class="tds-ai-tag tds-ai-tag--md"' +
      (attrs ? " " + attrs : "") +
      ">" +
      '<span class="tds-ai-tag__icon" aria-hidden="true">' +
      '<svg class="icon" viewBox="0 0 12.375 12.375" fill="none">' +
      '<path fill="currentColor" d="M8.42188 1.82617L9.625 1.375L10.0762 0.150391C10.1191 0.0644531 10.2051 0 10.3125 0C10.4199 0 10.5059 0.0644531 10.5488 0.150391L11 1.375L12.2246 1.82617C12.3105 1.86914 12.375 1.95508 12.375 2.0625C12.375 2.16992 12.3105 2.25586 12.2246 2.29883L11 2.75L10.5488 3.97461C10.5059 4.06055 10.4199 4.125 10.3125 4.125C10.2051 4.125 10.1191 4.06055 10.0762 3.97461L9.625 2.75L8.42188 2.29883C8.31445 2.25586 8.25 2.16992 8.25 2.0625C8.25 1.95508 8.31445 1.86914 8.42188 1.82617ZM4.44727 2.25586H4.42578L5.58594 4.72656L8.05664 5.88672C8.16406 5.92969 8.25 6.05859 8.25 6.1875C8.25 6.31641 8.16406 6.44531 8.05664 6.50977L5.58594 7.64844L4.42578 10.1191C4.38281 10.2266 4.25391 10.3125 4.125 10.3125C3.99609 10.3125 3.86719 10.2266 3.80273 10.1191L2.66406 7.64844L0.193359 6.50977C0.0859375 6.44531 0 6.31641 0 6.1875C0 6.05859 0.0859375 5.92969 0.193359 5.86523L2.66406 4.72656L3.82422 2.25586C3.86719 2.14844 3.99609 2.0625 4.125 2.0625C4.25391 2.0625 4.38281 2.14844 4.44727 2.25586ZM8.9375 9.625L9.38867 8.42188C9.43164 8.31445 9.51758 8.25 9.625 8.25C9.73242 8.25 9.81836 8.31445 9.86133 8.42188L10.3125 9.625L11.5371 10.0762C11.623 10.1191 11.6875 10.2051 11.6875 10.3125C11.6875 10.4199 11.623 10.5059 11.5371 10.5488L10.3125 11L9.86133 12.2246C9.81836 12.3105 9.73242 12.375 9.625 12.375C9.51758 12.375 9.43164 12.3105 9.38867 12.2246L8.9375 11L7.73438 10.5488C7.62695 10.5059 7.5625 10.4199 7.5625 10.3125C7.5625 10.2051 7.62695 10.1191 7.73438 10.0762L8.9375 9.625Z"/>' +
      "</svg></span>" +
      '<span class="tds-ai-tag__label">' +
      label +
      "</span></button>"
    );
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
        '<mark class="v3-card__lede-mark v3-card__lede-mark--' +
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
    var heroLedeHtml = (data.heroLede && data.heroLede.length)
      ? data.heroLede
          .map(function (line) {
            return String(line)
              .split("**")
              .map(function (part, i) {
                return i % 2 ? riskMark(part) : esc(part);
              })
              .join("");
          })
          .join(" ")
      : heroParts.slice(0, 4).join(" ");
    var suggestedActions = data.suggestedActions || [
      { label: "Review ownership", target: "ownership" },
      { label: "Review risk signals", target: "signals" }
    ];
    var buildingSrc =
      data.buildingSrc || "../../verification-report/assets/kyb/building.png";
    var mapSrc = data.mapSrc || "../../verification-report/assets/kyb/map.png";
    var countryLabel = data.country || "United States";
    var flagSrc = /united kingdom|\buk\b|england|britain/i.test(countryLabel)
      ? "../../../Demo%201/assets/icons/flag-uk.svg"
      : "../v2/assets/overview/flag-us.svg";

    function entityFactRow(label, value, trailingHtml) {
      return (
        '<div class="v3-entity__fact">' +
        '<div class="v3-entity__fact-text">' +
        '<span class="v3-entity__fact-label">' +
        esc(label) +
        '</span><span class="v3-entity__fact-value">' +
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
            '<img class="v3-hero__map" src="' +
            esc(mapSrc) +
            '" alt="" width="769" height="182" aria-hidden="true">' +
            '<div class="v3-hero__copy">' +
            '<h2 class="v3-card__title v3-card__title--hero" id="v3-title-overview">' +
            esc(outcome) +
            "</h2>" +
            '<p class="v3-card__lede">' +
            heroLedeHtml +
            "</p>" +
            '<div class="v3-suggested" aria-label="Suggested actions">' +
            '<p class="v3-section-label">Suggested Actions</p>' +
            '<div class="v3-suggested__ctas">' +
            suggestedActions
              .map(function (action) {
                return tdsSecondaryBtn(
                  'data-v3-view-more="' + esc(action.target) + '"',
                  esc(action.label),
                  "md"
                );
              })
              .join("") +
            "</div></div></div>" +
            '<aside class="v3-entity" aria-label="Entity information">' +
            '<div class="v3-entity__top">' +
            '<img class="v3-entity__thumb" src="' +
            esc(buildingSrc) +
            '" alt="" width="56" height="56">' +
            '<div class="v3-entity__identity">' +
            '<p class="v3-entity__name">' +
            esc(entityName) +
            "</p></div></div>" +
            '<div class="v3-entity__facts">' +
            entityFactRow(
              "Country / Jurisdiction",
              countryLabel,
              '<span class="v3-entity__fact-flag" aria-hidden="true"><img src="' +
                esc(flagSrc) +
                '" alt="" width="18" height="12"></span>'
            ) +
            entityFactRow(
              "BRN / Registration number",
              overview.regNumber || "—"
            ) +
            entityFactRow("Tax ID", overview.taxId || "—") +
            "</div></aside>"
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
          var linked = connected
            .map(function (n) {
              return n.name;
            })
            .filter(function (n) {
              return !owners.some(function (o) {
                return o.name === n;
              });
            });
          return (
            cardHeadHtml("ownership", "Ownership", this.summary) +
            '<div class="v3-owners" role="list" aria-label="Ultimate beneficial owners">' +
            owners.slice(0, 2).map(ownerCardHtml).join("") +
            "</div>" +
            (linked.length
              ? '<p class="v3-card__lede">Also linked: ' + esc(linked.join(", ")) + "</p>"
              : "")
          );
        },
        detail: function () {
          var owners = ownership.length ? ownership : [];
          var connectedOwners = connected.map(function (node) {
            return {
              name: node.name,
              role: node.role || node.type || "Connected",
              pct: node.pct || node.type || "Link",
              address: node.address,
              flagged: true,
              statusLabel: node.pct || node.type || "Link"
            };
          });
          return (
            '<div class="v3-ownership-views" data-v3-ownership-views>' +
            '<div class="tds-segmented-control tds-segmented-control--sm v3-view-toggle" role="tablist" aria-label="Ownership view">' +
            '<button type="button" class="tds-segmented-control__item tds-segmented-control__item--selected" role="tab" id="v3-ownership-tab-list" ' +
            'aria-controls="v3-ownership-panel-list" data-v3-ownership-view="list" aria-selected="true" aria-pressed="true">' +
            '<span class="tds-segmented-control__label">List</span></button>' +
            '<button type="button" class="tds-segmented-control__item" role="tab" id="v3-ownership-tab-graph" ' +
            'aria-controls="v3-ownership-panel-graph" data-v3-ownership-view="graph" aria-selected="false" aria-pressed="false">' +
            '<span class="tds-segmented-control__label">Graph</span></button>' +
            "</div>" +
            '<div class="v3-ownership-panel" id="v3-ownership-panel-list" role="tabpanel" ' +
            'aria-labelledby="v3-ownership-tab-list" data-v3-ownership-panel="list">' +
            '<p class="v3-section-label">Shareholders</p>' +
            '<div class="v3-owners" role="list">' +
            owners.map(ownerCardHtml).join("") +
            "</div>" +
            (connectedOwners.length
              ? '<p class="v3-section-label">Connected entities</p>' +
                '<div class="v3-owners" role="list">' +
                connectedOwners.map(ownerCardHtml).join("") +
                "</div>"
              : "") +
            "</div>" +
            '<div class="v3-ownership-panel" id="v3-ownership-panel-graph" role="tabpanel" ' +
            'aria-labelledby="v3-ownership-tab-graph" data-v3-ownership-panel="graph" hidden>' +
            '<div class="v3-ubo-graph kyb-ownership-graph" data-v3-ubo-graph ' +
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
            '<div class="v3-metrics">' +
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
              ? '<p class="v3-section-label">Screening checks</p><div class="v3-metrics">' +
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
            '<div class="v3-card__foot">' +
            '<span class="v3-card__meta">' +
            esc(
              (matchData && matchData.metrics && matchData.metrics.sources) ||
                "Sources"
            ) +
            "</span>" +
            tdsSecondaryBtn('data-v3-view-more="match"', "Sources") +
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
          var sourceCards = [];
          (truliooCaps || []).forEach(function (cap, i) {
            sourceCards.push({ mark: String(i + 1), title: cap.title, meta: cap.desc });
          });
          (onlineSources || []).forEach(function (src) {
            sourceCards.push({ mark: "↗", title: src.name, meta: src.desc });
          });
          return (
            '<div class="v3-metrics">' +
            tdsDataField("Fields checked", metrics.fields || matchedCount + "/" + totalFields) +
            tdsDataField("Sources", metrics.sources || "—") +
            tdsDataField(
              "Outcome",
              matchData && matchData.verified ? "Verified" : "Not verified"
            ) +
            "</div>" +
            '<p class="v3-section-label">Match matrix</p>' +
            matrixListHtml(rows) +
            '<p class="v3-section-label">Datasources</p>' +
            (sourceCards.length
              ? '<div class="v3-source-grid">' +
                sourceCards.map(sourceCardHtml).join("") +
                "</div>"
              : '<p class="v3-card__lede">No additional sources listed.</p>')
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
          var companySize = (social && social.companySize) || overview.sizing || "—";
          var hq = (social && social.headquarters) || data.city || "—";
          var about =
            (social && social.linkedinAbout) ||
            overview.industryNote ||
            "No public web profile summary on file.";
          return (
            cardHeadHtml("web", "Web & Social Insights", this.summary) +
            '<div class="v3-web-hero">' +
            '<div class="v3-web-hero__domain">' +
            '<p class="v3-web-hero__kicker">Domain</p>' +
            '<p class="v3-web-hero__value">' +
            esc(domain) +
            '</p><p class="v3-web-hero__note">' +
            esc(String(about).split("\n")[0]) +
            "</p></div>" +
            '<div class="v3-web-hero__status">' +
            tdsTag(
              presenceLevel + " presence",
              social && social.highRisk ? "review" : "positive"
            ) +
            "</div></div>" +
            '<div class="v3-web-channels" aria-label="Social channels">' +
            tdsStatCard("LinkedIn", liFollowers, "followers") +
            tdsStatCard("Instagram", igPosts, "posts") +
            tdsStatCard("X / Twitter", twFollowers, "followers") +
            "</div>" +
            '<div class="v3-metrics">' +
            tdsDataField("Company size", companySize) +
            tdsDataField("Headquarters", hq) +
            tdsDataField("Founded", (social && social.founded) || "—") +
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
            '<div class="v3-web-hero">' +
            '<div class="v3-web-hero__domain">' +
            '<p class="v3-web-hero__kicker">Domain</p>' +
            '<p class="v3-web-hero__value">' +
            esc(domain || "—") +
            '</p><p class="v3-web-hero__note">' +
            esc(String(about).split("\n")[0]) +
            "</p></div>" +
            '<div class="v3-web-hero__status">' +
            tdsTag(
              presenceLevel + " presence",
              social && social.highRisk ? "review" : "positive"
            ) +
            "</div></div>" +
            '<p class="v3-section-label">Domain record</p>' +
            '<div class="v3-metrics">' +
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
            ((social && social.domainExpires)
              ? tdsDataField("Domain expires", social.domainExpires)
              : "") +
            (domain
              ? tdsLinkField("Website", "https://" + domain, domain)
              : tdsDataField("Website", "—")) +
            "</div>" +
            '<p class="v3-section-label">Social profiles</p>' +
            '<div class="v3-metrics">' +
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
            '<p class="v3-section-label">Presence</p>' +
            '<div class="v3-metrics">' +
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

  function render(host, data) {
    var cards = buildCards(data);
    var detailCards = cards.filter(function (card) {
      return DETAIL_ORDER.indexOf(card.id) !== -1 && typeof card.detail === "function";
    });

    var grid = cards
      .map(function (card, index) {
        return (
          '<article class="v3-card v3-card--' +
          esc(card.span || card.id) +
          '" id="v3-card-' +
          esc(card.id) +
          '" data-v3-card="' +
          esc(card.id) +
          '" style="--v3-i:' +
          esc(String(index)) +
          '" tabindex="-1" aria-labelledby="v3-title-' +
          esc(card.id) +
          '">' +
          '<div class="v3-card__inner">' +
          card.html() +
          "</div></article>"
        );
      })
      .join("");

    var chips = detailCards
      .map(function (card, index) {
        return (
          '<button type="button" class="tds-filter-tab' +
          (index === 0 ? " tds-filter-tab--selected" : "") +
          '" role="tab" data-v3-detail-goto="' +
          esc(card.id) +
          '"' +
          (index === 0
            ? ' aria-selected="true" aria-current="true"'
            : ' aria-selected="false"') +
          ">" +
          esc(card.title || CARD_LABELS[card.id] || card.id) +
          "</button>"
        );
      })
      .join("");

    host.innerHTML =
      '<div class="v3-board" data-v3-board data-v3-mode="board" data-v3-layout="overlay">' +
      '<div class="v3-board__chrome">' +
      '<p class="v3-board__eyebrow"><span class="v3-board__eyebrow-dot" aria-hidden="true"></span>' +
      '<span class="v3-board__eyebrow-text">' +
      esc(data.name || "Verification report") +
      "</span></p>" +
      '<label class="v3-board__layout-switch" hidden>' +
      '<span class="v3-board__layout-switch-label">Detail</span>' +
      '<select class="v3-board__layout-select" data-v3-layout-select aria-label="Second-level detail layout">' +
      '<option value="overlay" selected>View more overlay</option>' +
      '<option value="split">Split view</option>' +
      "</select></label></div>" +
      '<div class="v3-board__workspace" data-v3-workspace>' +
      '<div class="v3-board__scroller" data-v3-scroller>' +
      '<div class="v3-board__grid">' +
      grid +
      "</div></div>" +
      '<div class="v3-detail" data-v3-detail hidden>' +
      '<div class="v3-detail__panel" role="dialog" aria-modal="true" aria-label="Expanded report section">' +
      '<header class="v3-detail__header">' +
      '<div class="v3-detail__header-row">' +
      '<button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--secondary tds-icon-btn--circular" data-v3-detail-back aria-label="Back to board">' +
      '<span class="tds-icon-btn__icon" aria-hidden="true">' +
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none">' +
      '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10 3.5 5.5 8 10 12.5"/>' +
      "</svg></span></button>" +
      "</div>" +
      '<div class="tds-filter-tabs v3-detail__chips" role="tablist" aria-label="Detail sections">' +
      chips +
      "</div>" +
      "</header>" +
      '<div class="v3-detail__scroll" data-v3-detail-scroll>' +
      '<div class="v3-detail__intro">' +
      '<p class="v3-detail__kicker" data-v3-detail-kicker></p>' +
      '<h2 class="v3-detail__title" data-v3-detail-title></h2>' +
      '<p class="v3-detail__summary" data-v3-detail-summary></p>' +
      "</div>" +
      '<div class="v3-detail__body" data-v3-detail-body></div>' +
      '<footer class="v3-detail__footer">' +
      tdsAskBtn("data-v3-detail-ask", "Ask TruAI") +
      "</footer>" +
      "</div></div></div></div></div>";

    return cards;
  }

  function createController(host, options) {
    var data = (options && options.data) || getSample();
    if (!host || !data) return null;

    var cards = render(host, data);
    var board = host.querySelector("[data-v3-board]");
    var scroller = host.querySelector("[data-v3-scroller]");
    var detailRoot = host.querySelector("[data-v3-detail]");
    var detailBody = host.querySelector("[data-v3-detail-body]");
    var detailScroll = host.querySelector("[data-v3-detail-scroll]");
    var detailKicker = host.querySelector("[data-v3-detail-kicker]");
    var detailTitle = host.querySelector("[data-v3-detail-title]");
    var detailSummary = host.querySelector("[data-v3-detail-summary]");
    var layoutSelect = host.querySelector("[data-v3-layout-select]");
    var cardEls = Array.prototype.slice.call(host.querySelectorAll("[data-v3-card]"));
    var activeId = cards[0] ? cards[0].id : null;
    var expandedId = null;
    var mode = "board";
    var layout = "overlay";
    var flipTimer = null;
    var FLIP_MS = 480;
    var onCardChange = options && options.onCardChange;
    var onAsk = options && options.onAsk;

    function cardById(id) {
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].id === id) return cards[i];
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
      if (board) board.setAttribute("data-v3-layout", layout);
      if (layoutSelect && layoutSelect.value !== layout) layoutSelect.value = layout;
      if (isExpanded() && expandedId) {
        openDetail(expandedId, { force: true });
      }
    }

    function ownershipGraphHost() {
      return detailBody
        ? detailBody.querySelector("[data-v3-ubo-graph]")
        : null;
    }

    function clearOwnershipGraph() {
      unmountUboGraph(ownershipGraphHost());
    }

    function applyOwnershipView(view) {
      if (!detailBody) return;
      var root = detailBody.querySelector("[data-v3-ownership-views]");
      if (!root) return;
      var next = view === "graph" ? "graph" : "list";
      root.querySelectorAll("[data-v3-ownership-view]").forEach(function (btn) {
        var on = btn.getAttribute("data-v3-ownership-view") === next;
        btn.setAttribute("aria-selected", on ? "true" : "false");
        btn.setAttribute("aria-pressed", on ? "true" : "false");
        btn.classList.toggle("tds-segmented-control__item--selected", on);
      });
      root.querySelectorAll("[data-v3-ownership-panel]").forEach(function (panel) {
        var on = panel.getAttribute("data-v3-ownership-panel") === next;
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

    function syncDetailTabs(id) {
      host.querySelectorAll("[data-v3-detail-goto]").forEach(function (btn) {
        var on = btn.getAttribute("data-v3-detail-goto") === id;
        btn.classList.toggle("tds-filter-tab--selected", on);
        btn.setAttribute("aria-selected", on ? "true" : "false");
        if (on) btn.setAttribute("aria-current", "true");
        else btn.removeAttribute("aria-current");
      });
    }

    function fillDetail(id) {
      var card = cardById(id);
      if (!card || typeof card.detail !== "function" || !detailBody) return;
      clearOwnershipGraph();
      if (detailKicker) detailKicker.textContent = CARD_LABELS[id] || card.title || id;
      if (detailTitle) detailTitle.textContent = card.title || CARD_LABELS[id] || id;
      if (detailSummary) detailSummary.textContent = card.summary || "";
      detailBody.innerHTML = card.detail();
      syncDetailTabs(id);
      if (detailScroll) detailScroll.scrollTop = 0;
      if (id === "ownership") applyOwnershipView("list");
    }

    function openDetail(id, opts) {
      if (DETAIL_ORDER.indexOf(id) === -1) return;
      var card = cardById(id);
      if (!card || typeof card.detail !== "function" || !detailRoot || !board) return;

      var fromBoard = !isExpanded();
      var useSplit = currentLayout() === "split";
      var force = !!(opts && opts.force);

      function applyOpen() {
        expandedId = id;
        mode = "detail";
        board.setAttribute("data-v3-mode", "detail");
        board.setAttribute("data-v3-layout", currentLayout());
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
        if (detailBody) detailBody.innerHTML = "";
      }

      function applyClose() {
        detailRoot.classList.remove("is-open");
        mode = "board";
        board.setAttribute("data-v3-mode", "board");
        expandedId = null;
      }

      if (wasSplit && !preferReducedMotion()) {
        detailRoot.classList.remove("is-open");
        flipCards(function () {
          mode = "board";
          board.setAttribute("data-v3-mode", "board");
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
        var on = el.getAttribute("data-v3-card") === id;
        el.setAttribute("data-v3-active", on ? "true" : "false");
        el.classList.toggle("is-selected", on && isExpanded() && currentLayout() === "split");
      });
      if (opts && opts.scroll) {
        var target = host.querySelector('[data-v3-card="' + id + '"]');
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
          best = el.getAttribute("data-v3-card");
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
      var viewMore = event.target.closest("[data-v3-view-more]");
      if (viewMore) {
        openDetail(viewMore.getAttribute("data-v3-view-more"));
        return;
      }
      var back = event.target.closest("[data-v3-detail-back]");
      if (back) {
        closeDetail();
        return;
      }
      var goto = event.target.closest("[data-v3-detail-goto]");
      if (goto) {
        switchDetail(goto.getAttribute("data-v3-detail-goto"));
        return;
      }
      if (isExpanded() && currentLayout() === "split") {
        var railCard = event.target.closest("[data-v3-card]");
        if (railCard && scroller && scroller.contains(railCard)) {
          var railId = railCard.getAttribute("data-v3-card");
          if (DETAIL_ORDER.indexOf(railId) !== -1) {
            switchDetail(railId);
            return;
          }
        }
      }
      var ownershipView = event.target.closest("[data-v3-ownership-view]");
      if (ownershipView) {
        applyOwnershipView(ownershipView.getAttribute("data-v3-ownership-view"));
        return;
      }
      var detailAsk = event.target.closest("[data-v3-detail-ask]");
      if (detailAsk && typeof onAsk === "function") {
        var current = cardById(expandedId);
        onAsk(
          (current && current.ask) || "Tell me more about this section",
          expandedId || activeId
        );
        return;
      }
      var ask = event.target.closest("[data-v3-ask]");
      if (ask && typeof onAsk === "function") {
        onAsk(ask.getAttribute("data-v3-ask"), activeId);
      }
    });

    setActive(activeId);

    return {
      goToCard: function (id) {
        if (CARD_ORDER.indexOf(id) === -1) return;
        if (isExpanded() && DETAIL_ORDER.indexOf(id) !== -1) switchDetail(id);
        else {
          if (isExpanded()) closeDetail();
          setActive(id, { scroll: true });
        }
      },
      openDetail: openDetail,
      closeDetail: closeDetail,
      setLayout: setLayout,
      getActiveCard: function () {
        return activeId;
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

  global.VerificationReportV3 = {
    mount: function (host, options) {
      return createController(host, options || {});
    },
    cardIds: CARD_ORDER.slice(),
    cardLabels: Object.assign({}, CARD_LABELS)
  };
})(typeof window !== "undefined" ? window : globalThis);
