/* Verification Module V2 — stacked card report (independent of V1). */
(function (global) {
  "use strict";

  /* Stack cards = high-level summaries. Expand tabs = detailed sections. */
  var CARD_ORDER = [
    "overview",
    "signals",
    "ownership",
    "match",
    "additional",
    "web"
  ];

  var EXPAND_ORDER = [
    "overview",
    "signals",
    "ownership",
    "match",
    "additional",
    "web"
  ];

  var CARD_LABELS = {
    overview: "Overview",
    signals: "Signals",
    ownership: "Owners & UBOs",
    match: "Match Signals & Sources",
    additional: "Additional Data",
    web: "Web & Social Insights"
  };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** V1 KYB product only — same entry as report-preview. */
  function kybProduct() {
    var products = global.VerificationReport && global.VerificationReport.products;
    return products && products.kyb ? products.kyb : null;
  }

  function getSample() {
    var kyb = kybProduct();
    if (kyb && typeof kyb.sampleData === "function") {
      return kyb.sampleData();
    }
    return null;
  }

  function toBiz(data) {
    var kyb = kybProduct();
    if (kyb && typeof kyb.toBiz === "function") {
      return kyb.toBiz(data);
    }
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

  function titleCase(str) {
    return String(str || "").replace(/\w\S*/g, function (w) {
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    });
  }

  /* Same demo assets as V1 KYB overview hero. */
  var KYB_ASSET_BASE = "../../verification-report/assets/kyb/";

  function tdsTone(tone) {
    var t = String(tone || "positive");
    if (t === "review" || t === "warn" || t === "warning") return "intermediate";
    if (t === "negative" || t === "error") return "negative";
    if (t === "default" || t === "neutral") return "default";
    return "positive";
  }

  function tdsTag(label, tone) {
    return (
      '<span class="tds-tag tds-tag--sm tds-tag--' +
      tdsTone(tone) +
      '"><span class="tds-tag__label">' +
      esc(label) +
      "</span></span>"
    );
  }

  function iconCheck() {
    return (
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
      '<circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.4"/>' +
      '<path stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="m5.25 8.1 1.85 1.85 3.65-3.9"/>' +
      "</svg>"
    );
  }

  function iconPhone() {
    return (
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
      '<path stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" d="M5.2 2.75h2.1l1 2.35-1.35 1.35a9.2 9.2 0 0 0 3.6 3.6l1.35-1.35 2.35 1v2.1c0 .55-.45 1-1 1A10.75 10.75 0 0 1 2.75 4.75c0-.55.45-1 1-1Z"/>' +
      "</svg>"
    );
  }

  function iconEnvelope() {
    return (
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
      '<rect x="2.25" y="3.75" width="11.5" height="8.5" rx="1.25" stroke="currentColor" stroke-width="1.4"/>' +
      '<path stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="m3.25 5.25 4.75 3.5 4.75-3.5"/>' +
      "</svg>"
    );
  }

  function tdsTagWithIcon(label, tone) {
    return (
      '<span class="tds-tag tds-tag--md tds-tag--' +
      tdsTone(tone || "default") +
      '"><span class="tds-tag__leading-visual" aria-hidden="true">' +
      iconCheck() +
      '</span><span class="tds-tag__label">' +
      esc(label) +
      "</span></span>"
    );
  }

  function tdsDataField(label, value, note) {
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
      "</p></div>" +
      (note
        ? '<p class="tds-data-field__description">' +
          esc(String(note).replace(/\n+/g, " ")) +
          "</p>"
        : "") +
      "</div></div>"
    );
  }

  function tdsDataFieldIcon(label, value, iconHtml, opts) {
    var options = opts || {};
    var v = value == null || value === "" ? "—" : value;
    var valueHtml = options.href
      ? '<a class="v2-web-link" href="' +
        esc(options.href) +
        '"' +
        (options.external
          ? ' target="_blank" rel="noopener noreferrer"'
          : "") +
        '><span class="v2-web-link__text">' +
        esc(v) +
        "</span></a>"
      : '<p class="tds-data-field__value' +
        (options.valueClass ? " " + options.valueClass : "") +
        '">' +
        esc(v) +
        "</p>";
    return (
      '<div class="tds-data-field">' +
      '<div class="tds-data-field__label-row">' +
      '<p class="tds-data-field__label">' +
      esc(label) +
      "</p></div>" +
      '<div class="tds-data-field__content">' +
      '<div class="tds-data-field__value-row">' +
      (iconHtml
        ? '<span class="tds-data-field__leading-icon' +
          (options.iconClass ? " " + options.iconClass : "") +
          '" aria-hidden="true">' +
          iconHtml +
          "</span>"
        : "") +
      valueHtml +
      "</div>" +
      (options.note
        ? '<p class="tds-data-field__description">' +
          esc(String(options.note).replace(/\n+/g, " ")) +
          "</p>"
        : "") +
      "</div></div>"
    );
  }

  function tdsDataFieldTone(label, value, tone) {
    var v = value == null || value === "" ? "—" : value;
    return (
      '<div class="tds-data-field">' +
      '<div class="tds-data-field__label-row">' +
      '<p class="tds-data-field__label">' +
      esc(label) +
      "</p></div>" +
      '<div class="tds-data-field__content">' +
      '<div class="tds-data-field__value-row">' +
      '<p class="tds-data-field__value' +
      (tone === "negative" ? " v2-web-value--negative" : "") +
      '">' +
      esc(v) +
      "</p></div></div></div>"
    );
  }

  function externalLinkIcon() {
    return (
      '<span class="tds-data-field__trailing-icon" aria-hidden="true">' +
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/>' +
      "</svg></span>"
    );
  }

  function tdsLinkField(label, href, display) {
    return (
      '<div class="tds-data-field">' +
      '<div class="tds-data-field__label-row">' +
      '<p class="tds-data-field__label">' +
      esc(label) +
      "</p></div>" +
      '<div class="tds-data-field__content">' +
      '<div class="tds-data-field__value-row">' +
      '<a class="v2-web-link" href="' +
      esc(href) +
      '" target="_blank" rel="noopener noreferrer" title="' +
      esc(display) +
      '">' +
      '<span class="v2-web-link__text">' +
      esc(display) +
      "</span>" +
      externalLinkIcon() +
      "</a></div></div></div>"
    );
  }

  function tdsSecondaryBtn(attrs, label) {
    return (
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--sm"' +
      (attrs ? " " + attrs : "") +
      ">" +
      '<span class="tds-btn__label">' +
      label +
      "</span></button>"
    );
  }

  function askIcon() {

    /* Official TruAI sparkles glyph (assets/icons/ai-sparkles.svg). */
    return (
      '<span class="tds-ai-tag tds-ai-tag--sm" aria-hidden="true"><span class="tds-ai-tag__icon">' +
      '<svg class="icon" viewBox="0 0 12.375 12.375" fill="none">' +
      '<path fill="currentColor" d="M8.42188 1.82617L9.625 1.375L10.0762 0.150391C10.1191 0.0644531 10.2051 0 10.3125 0C10.4199 0 10.5059 0.0644531 10.5488 0.150391L11 1.375L12.2246 1.82617C12.3105 1.86914 12.375 1.95508 12.375 2.0625C12.375 2.16992 12.3105 2.25586 12.2246 2.29883L11 2.75L10.5488 3.97461C10.5059 4.06055 10.4199 4.125 10.3125 4.125C10.2051 4.125 10.1191 4.06055 10.0762 3.97461L9.625 2.75L8.42188 2.29883C8.31445 2.25586 8.25 2.16992 8.25 2.0625C8.25 1.95508 8.31445 1.86914 8.42188 1.82617ZM4.44727 2.25586H4.42578L5.58594 4.72656L8.05664 5.88672C8.16406 5.92969 8.25 6.05859 8.25 6.1875C8.25 6.31641 8.16406 6.44531 8.05664 6.50977L5.58594 7.64844L4.42578 10.1191C4.38281 10.2266 4.25391 10.3125 4.125 10.3125C3.99609 10.3125 3.86719 10.2266 3.80273 10.1191L2.66406 7.64844L0.193359 6.50977C0.0859375 6.44531 0 6.31641 0 6.1875C0 6.05859 0.0859375 5.92969 0.193359 5.86523L2.66406 4.72656L3.82422 2.25586C3.86719 2.14844 3.99609 2.0625 4.125 2.0625C4.25391 2.0625 4.38281 2.14844 4.44727 2.25586ZM8.9375 9.625L9.38867 8.42188C9.43164 8.31445 9.51758 8.25 9.625 8.25C9.73242 8.25 9.81836 8.31445 9.86133 8.42188L10.3125 9.625L11.5371 10.0762C11.623 10.1191 11.6875 10.2051 11.6875 10.3125C11.6875 10.4199 11.623 10.5059 11.5371 10.5488L10.3125 11L9.86133 12.2246C9.81836 12.3105 9.73242 12.375 9.625 12.375C9.51758 12.375 9.43164 12.3105 9.38867 12.2246L8.9375 11L7.73438 10.5488C7.62695 10.5059 7.5625 10.4199 7.5625 10.3125C7.5625 10.2051 7.62695 10.1191 7.73438 10.0762L8.9375 9.625Z"/>' +
      "</svg></span></span>"
    );
  }

  function browserMockHtml(message) {
    return (
      '<aside class="v2-browser-mock" aria-label="Website preview">' +
      '<div class="v2-browser-mock__chrome" aria-hidden="true">' +
      '<span class="v2-browser-mock__dot"></span>' +
      '<span class="v2-browser-mock__dot"></span>' +
      '<span class="v2-browser-mock__dot"></span>' +
      "</div>" +
      '<div class="v2-browser-mock__viewport">' +
      '<p class="v2-browser-mock__placeholder">' +
      esc(message || "No website preview available") +
      "</p></div></aside>"
    );
  }

  function locationHeroHtml(data, compact) {
    var mapSrc = (data && data.mapSrc) || KYB_ASSET_BASE + "map.png";
    var photoSrc = (data && data.buildingSrc) || KYB_ASSET_BASE + "building.png";
    return (
      '<div class="v2-hero' +
      (compact ? " v2-hero--compact" : "") +
      '" aria-hidden="true">' +
      '<img class="v2-hero__map" src="' +
      esc(mapSrc) +
      '" alt="" width="769" height="182">' +
      '<div class="v2-hero__veil"></div>' +
      '<img class="v2-hero__photo" src="' +
      esc(photoSrc) +
      '" alt="" width="238" height="158">' +
      '<span class="v2-hero__pin"></span>' +
      "</div>"
    );
  }

  var EXPAND_ICON_SVG =
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none">' +
    '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M9.5 2.5H13.5V6.5M6.5 13.5H2.5V9.5M13.5 2.5 9 7M2.5 13.5 7 9"/>' +
    "</svg>";

  /* The card preview is a summary; this names what the full view adds and
     says the full view carries every section, so the control is not a bare
     maximise glyph the reader has to guess at. */
  function expandActionHtml(cardId, label, sectionCount) {
    var hint =
      "Opens the full view, with tabs for all " +
      (sectionCount || 6) +
      " report sections";
    return (
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md v2-card__more-btn" data-v2-expand-open="' +
      esc(cardId) +
      '" title="' +
      esc(hint) +
      '">' +
      '<span class="tds-btn__leading-icon" aria-hidden="true">' +
      EXPAND_ICON_SVG +
      "</span>" +
      '<span class="tds-btn__label">' +
      esc(label || "View full details") +
      "</span></button>"
    );
  }

  function askChipHtml(askText, attrs) {
    return (
      '<button type="button" class="tds-ai-tag tds-ai-tag--md v2-ov__ask"' +
      (attrs ? " " + attrs : "") +
      ' data-v2-ask="' +
      esc(askText) +
      '">' +
      '<span class="tds-ai-tag__icon" aria-hidden="true">' +
      '<svg class="icon" viewBox="0 0 12.375 12.375" fill="none">' +
      '<path fill="currentColor" d="M8.42188 1.82617L9.625 1.375L10.0762 0.150391C10.1191 0.0644531 10.2051 0 10.3125 0C10.4199 0 10.5059 0.0644531 10.5488 0.150391L11 1.375L12.2246 1.82617C12.3105 1.86914 12.375 1.95508 12.375 2.0625C12.375 2.16992 12.3105 2.25586 12.2246 2.29883L11 2.75L10.5488 3.97461C10.5059 4.06055 10.4199 4.125 10.3125 4.125C10.2051 4.125 10.1191 4.06055 10.0762 3.97461L9.625 2.75L8.42188 2.29883C8.31445 2.25586 8.25 2.16992 8.25 2.0625C8.25 1.95508 8.31445 1.86914 8.42188 1.82617ZM4.44727 2.25586H4.42578L5.58594 4.72656L8.05664 5.88672C8.16406 5.92969 8.25 6.05859 8.25 6.1875C8.25 6.31641 8.16406 6.44531 8.05664 6.50977L5.58594 7.64844L4.42578 10.1191C4.38281 10.2266 4.25391 10.3125 4.125 10.3125C3.99609 10.3125 3.86719 10.2266 3.80273 10.1191L2.66406 7.64844L0.193359 6.50977C0.0859375 6.44531 0 6.31641 0 6.1875C0 6.05859 0.0859375 5.92969 0.193359 5.86523L2.66406 4.72656L3.82422 2.25586C3.86719 2.14844 3.99609 2.0625 4.125 2.0625C4.25391 2.0625 4.38281 2.14844 4.44727 2.25586ZM8.9375 9.625L9.38867 8.42188C9.43164 8.31445 9.51758 8.25 9.625 8.25C9.73242 8.25 9.81836 8.31445 9.86133 8.42188L10.3125 9.625L11.5371 10.0762C11.623 10.1191 11.6875 10.2051 11.6875 10.3125C11.6875 10.4199 11.623 10.5059 11.5371 10.5488L10.3125 11L9.86133 12.2246C9.81836 12.3105 9.73242 12.375 9.625 12.375C9.51758 12.375 9.43164 12.3105 9.38867 12.2246L8.9375 11L7.73438 10.5488C7.62695 10.5059 7.5625 10.4199 7.5625 10.3125C7.5625 10.2051 7.62695 10.1191 7.73438 10.0762L8.9375 9.625Z"/>' +
      "</svg></span>" +
      '<span class="tds-ai-tag__label">' +
      esc(askText) +
      "</span></button>"
    );
  }

  function cardShell(opts, bodyHtml) {
    /* Shared top layout on every card: eyebrow + headline + expand icon. */
    var header =
      '<header class="v2-card__header">' +
      '<div class="v2-card__heading">' +
      '<p class="v2-card__kicker">' +
      esc(opts.kicker || "") +
      "</p>" +
      '<h2 class="v2-card__title" id="v2-title-' +
      esc(opts.id) +
      '">' +
      (opts.titleHtml || esc(opts.title)) +
      "</h2>" +
      "</div></header>";

    var footer =
      '<footer class="v2-card__footer">' +
      askChipHtml(opts.ask || "Ask TruAI") +
      expandActionHtml(opts.id, null, opts.sectionCount) +
      "</footer>";

    return (
      '<section class="v2-stack__slot" id="v2-slot-' +
      esc(opts.id) +
      '" data-v2-slot="' +
      esc(opts.id) +
      '" data-v2-index="' +
      esc(String(opts.index)) +
      '" style="--v2-index:' +
      esc(String(opts.index)) +
      '">' +
      '<article class="v2-card" data-v2-card="' +
      esc(opts.id) +
      '" tabindex="-1" aria-labelledby="v2-title-' +
      esc(opts.id) +
      '">' +
      '<div class="v2-card__inner">' +
      header +
      '<div class="v2-card__body">' +
      bodyHtml +
      "</div>" +
      footer +
      "</div></article></section>"
    );
  }

  function fieldGrid(fields, opts) {
    var cols = (opts && opts.cols) || 2;
    return (
      '<div class="v2-field-grid' +
      (cols === 3 ? " v2-field-grid--cols-3" : "") +
      '">' +
      fields
        .map(function (field) {
          var html = tdsDataField(field.label, field.value, field.note);
          return field.span === 2
            ? html.replace(
                'class="tds-data-field"',
                'class="tds-data-field v2-field-grid__span-2"'
              )
            : html;
        })
        .join("") +
      "</div>"
    );
  }

  function ownerListHtml(owners, limit) {
    var list = owners || [];
    if (limit) list = list.slice(0, limit);
    return (
      '<ul class="v2-owner-list">' +
      list
        .map(function (owner) {
          var flagged = !!(owner.flagged || owner.status === "negative");
          var screeningText = flagged
            ? (owner.screeningLabel || "Review")
            : "Screening clear";
          return (
            '<li class="v2-owner">' +
            '<span class="v2-owner__avatar' +
            (flagged ? " v2-owner__avatar--flag" : "") +
            '" aria-hidden="true">' +
            esc(initials(owner.name)) +
            "</span>" +
            "<div><p class=\"v2-owner__name\">" +
            esc(owner.name) +
            '</p><p class="v2-owner__meta">' +
            esc(owner.role || owner.sub || "Owner") +
            (owner.pct ? " · " + esc(owner.pct) : "") +
            "</p></div>" +
            tdsTag(screeningText, flagged ? "negative" : "positive") +
            "</li>"
          );
        })
        .join("") +
      "</ul>"
    );
  }

  function buildCards(data) {
    var biz = toBiz(data);
    var overview = data.overview || {};
    var ownership = data.ownership || data.ownershipTableRows || [];
    var officer = data.officer || {};
    var alerts = overview.alerts || [];
    var graph = data.ownershipGraph || {};
    var rootDetails = (graph.tree && graph.tree.details) || {};
    var graphFindings = rootDetails.findings || [];
    var connected = rootDetails.connected || [];
    var tableRows = data.ownershipTableRows || [];
    var owners = ownership.length ? ownership : tableRows;
    var Tabs = v1Tabs();
    var matchData =
      Tabs && typeof Tabs.matchDataForBiz === "function"
        ? Tabs.matchDataForBiz(biz)
        : null;
    var additional =
      Tabs && typeof Tabs.additionalDataForBiz === "function"
        ? Tabs.additionalDataForBiz(biz)
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
    var metrics = (matchData && matchData.metrics) || {};
    var matchRows = (matchData && matchData.rows) || [];

    function overviewWorkingItems() {
      var items = [];
      matchRows.forEach(function (row) {
        if (row.status === "match" || row.status === "clear") {
          items.push(row.field + " matched");
        }
      });
      alerts.forEach(function (alert) {
        if (/none found/i.test(alert)) items.push(alert);
      });
      if (data.verified !== false) items.unshift("KYB verification outcome: Verified");
      if (!items.length) items.push("No clear positives recorded in this package.");
      return items.slice(0, 4);
    }

    function overviewNotWorkingItems() {
      var items = [];
      matchRows.forEach(function (row) {
        if (row.status !== "match" && row.status !== "clear") {
          items.push(row.field + ": " + (row.status || "review"));
        }
      });
      graphFindings.forEach(function (finding) {
        items.push(finding);
      });
      owners.forEach(function (owner) {
        if (owner.flagged || owner.status === "negative") {
          items.push(
            (owner.name || "Owner") +
              " — " +
              (owner.screeningLabel || "Needs review")
          );
        }
      });
      if (!items.length) items.push("No open issues flagged in this package.");
      return items.slice(0, 4);
    }

    function overviewChipsHtml(active) {
      function chip(id, label) {
        var on = active === id;
        return (
          '<button type="button" class="tds-segmented-control__item' +
          (on ? " tds-segmented-control__item--selected" : "") +
          '" role="tab" data-v2-overview-chip="' +
          id +
          '"' +
          (on ? ' aria-selected="true" aria-pressed="true"' : ' aria-selected="false" aria-pressed="false"') +
          '><span class="tds-segmented-control__label">' +
          label +
          "</span></button>"
        );
      }
      return (
        '<div class="tds-segmented-control tds-segmented-control--sm v2-card-chips" role="tablist" aria-label="Overview options">' +
        chip("location", "Location") +
        chip("details", "Details") +
        "</div>"
      );
    }

    function overviewLocationPanel(compact) {
      return (
        '<div class="v2-overview-panel" data-v2-overview-panel="location">' +
        locationHeroHtml(data, !!compact) +
        '<div class="v2-metrics">' +
        tdsDataField("Registration", overview.regNumber || "—") +
        tdsDataField("Tax ID", overview.taxId || "—") +
        tdsDataField("Status", overview.status || "—") + "</div>" +
        '<p class="v2-hero__caption">' +
        esc(overview.address || data.addr || data.country || "") +
        "</p></div>"
      );
    }

    function overviewDetailsPanel(compact) {
      var working = overviewWorkingItems();
      var notWorking = overviewNotWorkingItems();
      return (
        '<div class="v2-overview-panel" data-v2-overview-panel="details" hidden>' +
        '<div class="v2-metrics">' +
        tdsDataField("BRN", overview.regNumber || "—") +
        tdsDataField("Country / jurisdiction", data.country || "—") +
        tdsDataField("Status", overview.status || "—") +
        tdsDataField("Tax ID", overview.taxId || "—") + "</div>" +
        '<div class="v2-split">' +
        '<div class="v2-split__col">' +
        '<p class="v2-section-label v2-section-label--ok">What\'s working</p>' +
        '<ul class="v2-check-list v2-check-list--ok">' +
        working
          .map(function (item) {
            return (
              '<li><span aria-hidden="true">✓</span><span>' +
              esc(item) +
              "</span></li>"
            );
          })
          .join("") +
        "</ul></div>" +
        '<div class="v2-split__col">' +
        '<p class="v2-section-label v2-section-label--warn">What\'s not</p>' +
        '<ul class="v2-check-list v2-check-list--warn">' +
        notWorking
          .map(function (item) {
            return (
              '<li><span aria-hidden="true">!</span><span>' +
              esc(item) +
              "</span></li>"
            );
          })
          .join("") +
        "</ul></div></div>" +
        (compact
          ? ""
          : '<p class="v2-section-label">More details</p>' +
            fieldGrid([
              { label: "Legal form", value: overview.legalForm },
              { label: "Registration date", value: overview.regDate },
              { label: "Business address", value: overview.address || data.addr },
              { label: "Industry", value: overview.industry, note: overview.industryNote }
            ])) +
        "</div>"
      );
    }

    function overviewDetail() {
      /* Figma ADS 8466:56955 — Company Overview + Communication + News & Alerts */
      var status = overview.status || "—";
      var statusOk = /active|verified|clear/i.test(status);
      var phone = overview.phone || "";
      var email = overview.email || "";
      var alerts = overview.alerts && overview.alerts.length
        ? overview.alerts
        : [
            "Adverse Media: None found",
            "Sanctions: None found",
            "Litigation: None found",
            "Positive Press: None found"
          ];
      return (
        '<div class="v2-ov-detail">' +
        overviewIdentityRowHtml() +
        '<section class="v2-ov-detail__section" aria-labelledby="v2-ov-company-heading">' +
        '<h3 class="v2-ov-detail__heading" id="v2-ov-company-heading">Company Overview:</h3>' +
        '<div class="v2-ov-detail__grid">' +
        '<div class="v2-ov-detail__row">' +
        tdsDataField("Registration number", overview.regNumber || "—") +
        tdsDataField("TAX ID", overview.taxId || "—") +
        "</div>" +
        '<div class="v2-ov-detail__row">' +
        tdsDataFieldIcon(
          "Registration status",
          status,
          iconCheck(),
          {
            iconClass: statusOk
              ? "v2-ov-detail__icon--positive"
              : "v2-ov-detail__icon--faint"
          }
        ) +
        tdsDataField("Sizing", overview.sizing || "—") +
        "</div>" +
        '<div class="v2-ov-detail__row">' +
        tdsDataField("Legal form", overview.legalForm || "—") +
        tdsDataField("Business address", overview.address || data.addr || "—") +
        "</div>" +
        '<div class="v2-ov-detail__row">' +
        tdsDataField(
          "Operations and industry",
          overview.industry || "—",
          overview.industryNote || ""
        ) +
        tdsDataField("Registration date", overview.regDate || "—") +
        "</div>" +
        '<div class="v2-ov-detail__row v2-ov-detail__row--raw">' +
        '<div class="tds-data-field v2-ov-detail__raw">' +
        '<div class="tds-data-field__label-row">' +
        '<p class="tds-data-field__label">Raw Data</p></div>' +
        '<div class="tds-data-field__content">' +
        '<div class="tds-data-field__value-row">' +
        '<button type="button" class="v2-ov-detail__raw-link" data-v2-raw-data>' +
        "View raw data</button></div></div></div></div>" +
        "</div></section>" +
        '<hr class="v2-ov-detail__divider" />' +
        '<div class="v2-ov-detail__lower">' +
        '<section class="v2-ov-detail__block" aria-labelledby="v2-ov-comms-heading">' +
        '<h3 class="v2-ov-detail__heading" id="v2-ov-comms-heading">Communication Records:</h3>' +
        '<div class="v2-ov-detail__comms">' +
        tdsDataFieldIcon("Phone", phone || "—", iconPhone(), {
          href: phone ? "tel:" + String(phone).replace(/\s+/g, "") : "",
          iconClass: "v2-ov-detail__icon--faint"
        }) +
        tdsDataFieldIcon("Email", email || "—", iconEnvelope(), {
          href: email ? "mailto:" + email : "",
          iconClass: "v2-ov-detail__icon--faint"
        }) +
        "</div></section>" +
        '<section class="v2-ov-detail__block" aria-labelledby="v2-ov-alerts-heading">' +
        '<h3 class="v2-ov-detail__heading" id="v2-ov-alerts-heading">News &amp; Alerts:</h3>' +
        '<div class="v2-ov-detail__alerts">' +
        alerts
          .map(function (alert) {
            var clear = /none found/i.test(alert);
            return tdsTagWithIcon(alert, clear ? "default" : "intermediate");
          })
          .join("") +
        "</div></section></div></div>"
      );
    }

    function signalsDetail() {
      /* Figma ADS 5970:38750 — impact filters + risk-category accordions */
      function chevronSvg() {
        return (
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>'
        );
      }
      function trendUpSvg() {
        return (
          '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 11.5 6 8l2.5 2L13.5 4"/><path d="M10.5 4H13.5V7"/></svg>'
        );
      }
      function trendDownSvg() {
        return (
          '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 4.5 6 8l2.5-2L13.5 12"/><path d="M10.5 12H13.5V9"/></svg>'
        );
      }
      function yesSvg() {
        return (
          '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M5.5 8.5 7 10l3.5-4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        );
      }

      var categories = [
        {
          id: "business-model",
          title: "Business Model",
          score: 84,
          risk: "high",
          riskLabel: "High Risk",
          blurb:
            "Checks business activity, industry, address, web presence, and submitted information for consistency.",
          rows: [
            {
              impact: "increased",
              signal:
                "The business has an elevated risk of default based on its credit profile.",
              applicable: "Yes",
              data: "Present",
              detail: {
                description:
                  "Credit profile indicators suggest elevated default likelihood for this entity.",
                value: "Increased the risk score",
                source: "DRA"
              }
            },
            {
              impact: "increased",
              signal: "No physical presence or facility information available",
              applicable: "Yes",
              data: "Present",
              detail: {
                description:
                  "No confirmed physical address of type primary, operational, or registered was found for this business.",
                value: "Increased the risk score",
                source: "DRA"
              }
            }
          ]
        },
        {
          id: "financial-health",
          title: "Financial Health",
          score: 68,
          risk: "high",
          riskLabel: "High Risk",
          blurb:
            "Assesses credit, payment, bankruptcy, and financial stability.",
          rows: [
            {
              impact: "increased",
              signal:
                "The business has an elevated risk of default based on its credit profile.",
              applicable: "Yes",
              data: "Present",
              detail: {
                description:
                  "Payment and credit indicators contribute to elevated financial-health risk.",
                value: "Increased the risk score",
                source: "DRA"
              }
            },
            {
              impact: "decreased",
              signal: "No bankruptcy filings were identified for this business.",
              applicable: "Yes",
              data: "Present",
              detail: {
                description: "Bankruptcy screening returned no matches.",
                value: "Decreased the risk score",
                source: "DRA"
              }
            }
          ]
        },
        {
          id: "fraud",
          title: "Fraud & Financial Crimes",
          score: 63,
          risk: "high",
          riskLabel: "High Risk",
          blurb:
            "Identifies fraud, ownership, relationship, adverse media, and shell-company risks.",
          rows: [
            {
              impact: "increased",
              signal:
                "Ownership and relationship patterns are consistent with shell-company risk.",
              applicable: "Yes",
              data: "Present",
              detail: {
                description:
                  "Connected entities and a shared registered address elevate fraud risk.",
                value: "Increased the risk score",
                source: "DRA"
              }
            },
            {
              impact: "decreased",
              signal: "Adverse media screening returned no matches.",
              applicable: "Yes",
              data: "Present",
              detail: {
                description: "No adverse media hits were found for this entity.",
                value: "Decreased the risk score",
                source: "DRA"
              }
            }
          ]
        },
        {
          id: "governance",
          title: "Governance & Compliance",
          score: 52,
          risk: "medium",
          riskLabel: "Medium Risk",
          blurb:
            "Reviews registration, legal standing, filings, sanctions, and compliance indicators.",
          rows: [
            {
              impact: "increased",
              signal: "Registry filings appear incomplete for this entity.",
              applicable: "Yes",
              data: "Present",
              detail: {
                description:
                  "Missing or incomplete filings raise governance and compliance risk.",
                value: "Increased the risk score",
                source: "DRA"
              }
            },
            {
              impact: "decreased",
              signal: "Sanctions screening returned no matches.",
              applicable: "Yes",
              data: "Present",
              detail: {
                description: "No sanctions hits were found for this entity.",
                value: "Decreased the risk score",
                source: "DRA"
              }
            }
          ]
        },
        {
          id: "third-party",
          title: "Third-Party & Market",
          score: 57,
          risk: "medium",
          riskLabel: "Medium Risk",
          blurb:
            "Evaluates address, jurisdiction, connected entities, and relationship risks.",
          rows: [
            {
              impact: "increased",
              signal:
                "Registered address is shared with multiple unrelated entities at the same location.",
              applicable: "Yes",
              data: "Present",
              detail: {
                description:
                  "The registered address is shared with multiple unrelated entities, elevating third-party risk.",
                value: "Increased the risk score",
                source: "DRA"
              }
            },
            {
              impact: "decreased",
              signal: "Jurisdiction is a recognized corporate domicile.",
              applicable: "Yes",
              data: "Present",
              detail: {
                description:
                  "Jurisdiction risk is moderated by recognized corporate domicile status.",
                value: "Decreased the risk score",
                source: "DRA"
              }
            }
          ]
        }
      ];

      var allCount = 0;
      var increasedCount = 0;
      var decreasedCount = 0;
      categories.forEach(function (cat) {
        (cat.rows || []).forEach(function (row) {
          allCount += 1;
          if (row.impact === "increased") increasedCount += 1;
          if (row.impact === "decreased") decreasedCount += 1;
        });
      });

      function conciseSignalHighlight(signal, impact) {
        var text = String(signal || "").trim();
        var lower = text.toLowerCase();
        if (/elevated risk of default|credit profile/.test(lower)) {
          return "Elevated default risk.";
        }
        if (/no physical presence|facility information/.test(lower)) {
          return "No physical presence.";
        }
        if (/shell-company/.test(lower)) {
          return "Shell-company ownership patterns.";
        }
        if (/bankruptcy/.test(lower)) {
          return "No bankruptcy filings.";
        }
        if (/adverse media/.test(lower)) {
          return "No adverse media matches.";
        }
        if (/registry filings|incomplete/.test(lower)) {
          return "Incomplete registry filings.";
        }
        if (/sanctions/.test(lower)) {
          return "Sanctions screening clear.";
        }
        if (/formations-agent|registered-agent|shared with multiple unrelated/.test(lower)) {
          return "Address shared with unrelated entities.";
        }
        if (/recognized corporate domicile|jurisdiction/.test(lower)) {
          return "Recognized corporate domicile.";
        }
        /* Fallback: keep a short phrase ending with a period. */
        var short = text.replace(/\.$/, "");
        if (short.length > 42) short = short.slice(0, 39).replace(/\s+\S*$/, "") + "…";
        if (impact === "decreased" && !/\.$/.test(short)) short += ".";
        else if (!/\.$|\…$/.test(short)) short += ".";
        return short.charAt(0).toUpperCase() + short.slice(1);
      }

      function highlightToneForRow(cat, row) {
        if (row.impact === "decreased") return "positive";
        if (cat.risk === "high") return "negative";
        if (cat.risk === "medium") return "intermediate";
        return "positive";
      }

      var signalHighlights = [];
      var seenHighlights = {};
      categories.forEach(function (cat) {
        (cat.rows || []).forEach(function (row) {
          var label = conciseSignalHighlight(row.signal, row.impact);
          var key = label.toLowerCase();
          if (seenHighlights[key]) return;
          seenHighlights[key] = true;
          signalHighlights.push({
            label: label,
            tone: highlightToneForRow(cat, row),
            categoryId: cat.id,
            impact: row.impact,
            risk: cat.risk || "medium"
          });
        });
      });

      /* Mix high / medium / low (and clear) highlights; show at least 7. */
      function pickHighlightsByTone(pool, tone, limit) {
        var out = [];
        pool.forEach(function (item) {
          if (out.length >= limit) return;
          if (item.tone === tone) out.push(item);
        });
        return out;
      }
      var mixedHighlights = []
        .concat(pickHighlightsByTone(signalHighlights, "negative", 3))
        .concat(pickHighlightsByTone(signalHighlights, "intermediate", 2))
        .concat(pickHighlightsByTone(signalHighlights, "positive", 2));
      /* Fill remaining slots from leftover items if a tone bucket was short. */
      signalHighlights.forEach(function (item) {
        if (mixedHighlights.length >= 7) return;
        var already = mixedHighlights.some(function (picked) {
          return picked.label === item.label;
        });
        if (!already) mixedHighlights.push(item);
      });
      signalHighlights = mixedHighlights.slice(0, Math.max(7, mixedHighlights.length));

      function impactCell(impact) {
        var up = impact === "increased";
        return (
          '<span class="v2-signals__impact v2-signals__impact--' +
          (up ? "up" : "down") +
          '"><span class="v2-signals__impact-icon" aria-hidden="true">' +
          (up ? trendUpSvg() : trendDownSvg()) +
          "</span>" +
          (up ? "Increased" : "Decreased") +
          "</span>"
        );
      }

      function statusCell(label) {
        return (
          '<span class="v2-signals__status"><span class="v2-signals__status-icon" aria-hidden="true">' +
          yesSvg() +
          "</span>" +
          esc(label) +
          "</span>"
        );
      }

      function rowHtml(row, index) {
        var open = !!row.open;
        var detail = row.detail || null;
        var detailValueTone =
          row.impact === "increased" ? "negative" : "positive";
        return (
          '<tr class="v2-signals__row' +
          (open ? " is-expanded" : "") +
          '" data-v2-signal-row data-v2-signal-impact="' +
          esc(row.impact) +
          '" tabindex="0" aria-expanded="' +
          (open ? "true" : "false") +
          '">' +
          "<td>" +
          impactCell(row.impact) +
          "</td>" +
          '<td class="v2-signals__signal-cell">' +
          esc(row.signal) +
          "</td>" +
          "<td>" +
          statusCell(row.applicable || "Yes") +
          "</td>" +
          "<td>" +
          statusCell(row.data || "Present") +
          "</td>" +
          '<td class="v2-signals__actions-cell">' +
          '<button type="button" class="v2-signals__row-toggle" data-v2-signal-toggle tabindex="-1" aria-hidden="true" aria-expanded="' +
          (open ? "true" : "false") +
          '" aria-label="' +
          (open ? "Hide" : "Show") +
          ' signal details">' +
          chevronSvg() +
          "</button></td></tr>" +
          (detail
            ? '<tr class="v2-signals__detail-row"' +
              (open ? "" : " hidden") +
              ' data-v2-signal-detail data-v2-signal-impact="' +
              esc(row.impact) +
              '"><td colspan="5"><div class="v2-signals__detail">' +
              '<p class="v2-signals__detail-copy">' +
              esc(detail.description || "") +
              "</p>" +
              '<hr class="v2-signals__detail-divider" aria-hidden="true" />' +
              '<div class="v2-signals__detail-fields">' +
              '<div class="v2-signals__detail-field">' +
              '<p class="v2-signals__detail-label">Value</p>' +
              '<p class="v2-signals__detail-value v2-signals__detail-value--' +
              detailValueTone +
              '"><span class="v2-signals__impact-icon" aria-hidden="true">' +
              (row.impact === "increased" ? trendUpSvg() : trendDownSvg()) +
              "</span>" +
              esc(detail.value || "") +
              "</p></div>" +
              '<div class="v2-signals__detail-field">' +
              '<p class="v2-signals__detail-label">Source</p>' +
              '<p class="v2-signals__detail-value">' +
              esc(detail.source || "—") +
              "</p></div></div></div></td></tr>"
            : "")
        );
      }

      function categoryHtml(cat) {
        var scoreClass =
          cat.risk === "high"
            ? "v2-signals__score--high"
            : cat.risk === "low"
              ? "v2-signals__score--low"
              : "v2-signals__score--medium";
        var riskTone =
          cat.risk === "high"
            ? "negative"
            : cat.risk === "low"
              ? "positive"
              : "intermediate";
        var open = !!cat.open;
        return (
          '<div class="tds-accordion tds-accordion--md v2-signals__category' +
          (open ? " tds-accordion--expanded" : "") +
          '" data-v2-signal-category="' +
          esc(cat.id) +
          '">' +
          '<button type="button" class="tds-accordion__header" data-v2-signal-accordion aria-expanded="' +
          (open ? "true" : "false") +
          '">' +
          '<span class="tds-accordion__leading"><span class="tds-accordion__title-group">' +
          '<span class="tds-accordion__title">' +
          esc(cat.title) +
          ': <span class="v2-signals__score ' +
          scoreClass +
          '">' +
          esc(String(cat.score)) +
          "</span>/100</span>" +
          '<span class="tds-accordion__subtext">' +
          esc(cat.blurb) +
          "</span></span></span>" +
          '<span class="tds-accordion__trailing">' +
          '<span class="tds-accordion__tags">' +
          tdsTag(cat.riskLabel, riskTone) +
          "</span>" +
          '<span class="tds-accordion__chevron" aria-hidden="true">' +
          chevronSvg() +
          "</span></span></button>" +
          '<div class="tds-accordion__content">' +
          '<div class="v2-signals__table-wrap">' +
          '<table class="v2-signals__table">' +
          "<thead><tr>" +
          "<th>Impact</th><th>Signal</th><th>Applicable</th><th>Data</th>" +
          '<th class="v2-signals__actions-col" aria-hidden="true"></th>' +
          "</tr></thead><tbody>" +
          (cat.rows || []).map(rowHtml).join("") +
          '</tbody></table>' +
          '<p class="v2-signals__empty" hidden>No signals match this filter.</p>' +
          "</div></div></div>"
        );
      }

      var highlightsHtml = signalHighlights
        .map(function (item) {
          return (
            '<li class="v2-ov__highlight">' +
            '<button type="button" class="tds-tag tds-tag--md tds-tag--' +
            tdsTone(item.tone) +
            ' v2-signals__highlight-btn" data-v2-signal-goto="' +
            esc(item.categoryId) +
            '"><span class="tds-tag__label">' +
            esc(item.label) +
            "</span></button></li>"
          );
        })
        .join("");

      return (
        '<div class="v2-signals" data-v2-signals>' +
        '<div class="v2-ov__panel v2-signals__summary">' +
        '<div class="v2-ov__panel-col v2-signals__gauges-col">' +
        '<p class="v2-ov__panel-label">Risk Score</p>' +
        '<div class="v2-signals__gauges">' +
        '<div class="v2-signals__gauge" aria-label="' +
        esc(riskLabel + " score " + riskScore) +
        '">' +
        '<div class="score-gauge-host" data-score="' +
        esc(String(riskScore)) +
        '" data-risk="' +
        esc(riskBand) +
        '" data-label="' +
        esc(riskLabel) +
        '" data-show-percent="false" data-max="100"></div>' +
        "</div></div></div>" +
        '<div class="v2-ov__panel-col">' +
        '<p class="v2-ov__panel-label">Highlights</p>' +
        '<ul class="v2-ov__highlights">' +
        (highlightsHtml ||
          '<li class="v2-ov__highlight"><span class="tds-tag tds-tag--md tds-tag--default"><span class="tds-tag__label">No signal highlights available.</span></span></li>') +
        "</ul></div></div>" +
        '<div class="tds-filter-tabs v2-signals__filters" role="tablist" aria-label="Signal impact filters">' +
        '<button type="button" class="tds-filter-tab tds-filter-tab--selected" role="tab" aria-selected="true" data-v2-signal-filter="all">' +
        'All Impact <span class="tds-counter tds-counter--secondary tds-counter--sm">' +
        esc(String(allCount)) +
        "</span></button>" +
        '<button type="button" class="tds-filter-tab" role="tab" aria-selected="false" data-v2-signal-filter="increased">' +
        'Increased <span class="tds-counter tds-counter--secondary tds-counter--negative tds-counter--sm">' +
        esc(String(increasedCount)) +
        "</span></button>" +
        '<button type="button" class="tds-filter-tab" role="tab" aria-selected="false" data-v2-signal-filter="decreased">' +
        'Decreased <span class="tds-counter tds-counter--secondary tds-counter--positive tds-counter--sm">' +
        esc(String(decreasedCount)) +
        "</span></button>" +
        "</div>" +
        '<div class="v2-signals__categories">' +
        categories.map(categoryHtml).join("") +
        "</div></div>"
      );
    }

    function ownershipDetail() {
      /* Figma ADS 8466:56862 — ownership table + Directors/Officers card */
      var rows = (tableRows && tableRows.length ? tableRows : owners) || [];
      var tableBody = rows
        .map(function (row) {
          var flagged = !!(
            row.flagged ||
            row.status === "negative" ||
            row.status === "review"
          );
          var statusLabel =
            row.statusLabel ||
            row.screeningLabel ||
            (flagged ? "Review" : "Clear");
          var secondary = row.sub || row.role || "";
          var ownership = row.pct || row.role || row.type || "—";
          return (
            "<tr>" +
            '<td class="v2-own__name-cell">' +
            '<p class="v2-own__name">' +
            esc(row.name || "—") +
            "</p>" +
            (secondary
              ? '<p class="v2-own__secondary">' + esc(secondary) + "</p>"
              : "") +
            "</td>" +
            "<td>" +
            esc(ownership) +
            "</td>" +
            "<td>" +
            esc(row.address || "—") +
            "</td>" +
            "<td>" +
            '<span class="tds-tag tds-tag--lg tds-tag--' +
            tdsTone(flagged ? "negative" : "positive") +
            '"><span class="tds-tag__label">' +
            esc(statusLabel) +
            "</span></span>" +
            "</td></tr>"
          );
        })
        .join("");

      var statusIcon =
        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
        '<circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.4"/>' +
        '<path stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="m5.25 8.1 1.85 1.85 3.65-3.9"/>' +
        "</svg>";

      var officerCard = officer.fullName
        ? '<section class="v2-own__officer" aria-label="Directors, Officers and PSCs">' +
          '<h3 class="v2-own__officer-title">Directors, Officers &amp; PSCs</h3>' +
          '<div class="v2-own__officer-grid">' +
          tdsDataField("Given Name", titleCase(officer.givenName)) +
          tdsDataField("Surname", titleCase(officer.surname)) +
          tdsDataField("Full Name", titleCase(officer.fullName)) +
          tdsDataField("National ID Number", officer.nationalId) +
          tdsDataField("Date of Birth", officer.dob) +
          tdsDataField("Position", titleCase(officer.position)) +
          tdsDataField("Designation", officer.designation) +
          tdsDataField("Type", officer.type) +
          tdsDataFieldIcon("Status", officer.status || "—", statusIcon, {
            iconClass: "v2-own__status-icon"
          }) +
          tdsDataField("Begin Date", officer.beginDate) +
          tdsDataField("End Date", officer.endDate) +
          '<div class="v2-own__officer-spacer" aria-hidden="true"></div>' +
          tdsDataField(
            "Address 1",
            officer.address1,
            officer.address1Note || "Primary registered address"
          ) +
          tdsDataField(
            "Address 2",
            officer.address2,
            officer.address2Note || ""
          ) +
          "</div></section>"
        : "";

      var listHtml =
        '<div class="v2-own__table-wrap">' +
        '<table class="v2-own__table">' +
        "<thead><tr>" +
        "<th>Name</th><th>Ownership</th><th>Address</th><th>Screening Status</th>" +
        "</tr></thead><tbody>" +
        (tableBody ||
          '<tr><td colspan="4">No ownership records available.</td></tr>') +
        "</tbody></table></div>" +
        officerCard;

      return (
        '<div class="v2-ownership-views" data-v2-ownership-views>' +
        '<div class="tds-segmented-control tds-segmented-control--sm v2-view-toggle" role="tablist" aria-label="Ownership view">' +
        '<button type="button" class="tds-segmented-control__item tds-segmented-control__item--selected" role="tab" id="v2-ownership-tab-list" ' +
        'aria-controls="v2-ownership-panel-list" data-v2-ownership-view="list" aria-selected="true" aria-pressed="true">' +
        '<span class="tds-segmented-control__label">List</span></button>' +
        '<button type="button" class="tds-segmented-control__item" role="tab" id="v2-ownership-tab-graph" ' +
        'aria-controls="v2-ownership-panel-graph" data-v2-ownership-view="graph" aria-selected="false" aria-pressed="false">' +
        '<span class="tds-segmented-control__label">Graph</span></button>' +
        "</div>" +
        '<div class="v2-ownership-panel" id="v2-ownership-panel-list" role="tabpanel" ' +
        'aria-labelledby="v2-ownership-tab-list" data-v2-ownership-panel="list">' +
        listHtml +
        "</div>" +
        '<div class="v2-ownership-panel" id="v2-ownership-panel-graph" role="tabpanel" ' +
        'aria-labelledby="v2-ownership-tab-graph" data-v2-ownership-panel="graph" hidden>' +
        '<div class="v2-ubo-graph kyb-ownership-graph" data-v2-ubo-graph ' +
        'aria-label="Ownership structure graph"></div>' +
        "</div>" +
        "</div>"
      );
    }

    function matchDetail() {
      /* Figma ADS 8466:57746 — verification banner + match table + source accordions */
      function chevronSvg() {
        return (
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>'
        );
      }
      function iconMatch() {
        return (
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M5.5 8.5 7 10l3.5-4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        );
      }
      function iconNoMatch() {
        return (
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="m5.5 5.5 5 5M10.5 5.5l-5 5" stroke-linecap="round"/></svg>'
        );
      }
      function iconMissing() {
        return (
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M8 2.5 14 13.5H2L8 2.5z"/><path d="M8 6.5v3.5" stroke-linecap="round"/><circle cx="8" cy="11.75" r=".6" fill="currentColor"/></svg>'
        );
      }
      function statusChip(status) {
        var key = String(status || "").toLowerCase();
        var tone =
          key === "match" || key === "clear"
            ? "positive"
            : key === "missing"
              ? "intermediate"
              : "negative";
        var label =
          key === "match" || key === "clear"
            ? "Match"
            : key === "missing"
              ? "Missing"
              : "No Match";
        var icon =
          tone === "positive"
            ? iconMatch()
            : tone === "intermediate"
              ? iconMissing()
              : iconNoMatch();
        return (
          '<span class="v2-match__status v2-match__status--' +
          tone +
          '"><span class="v2-match__status-icon" aria-hidden="true">' +
          icon +
          "</span>" +
          label +
          "</span>"
        );
      }
      function capIcon(index) {
        var icons = [
          '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="5" cy="5" r="2" stroke="currentColor" stroke-width="1.25"/><circle cx="11" cy="5" r="2" stroke="currentColor" stroke-width="1.25"/><path d="M1.75 13c.5-2 1.9-3.25 3.25-3.25S8 11 8.5 13M7.5 13c.5-2 1.9-3.25 3.25-3.25S14 11 14.25 13" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>',
          '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="4.25" stroke="currentColor" stroke-width="1.25"/><path d="m10.5 10.5 3 3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>',
          '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 2.75h6.5L13 5.25V13.25H4V2.75Z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/><path d="M10.5 2.75V5.25H13M6 8h4M6 10.5h3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>',
          '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.75 13.25V6.5L8 2.75l5.25 3.75v6.75H9.5V9.25H6.5v4H2.75Z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/></svg>'
        ];
        return icons[index % icons.length];
      }

      var verified = !!(matchData && matchData.verified);
      var ruleRaw =
        (matchData && matchData.rule) ||
        "Verification Rule: KYB Standard: 1 Records Match (BRN)";
      var ruleValue = ruleRaw.replace(/^Verification Rule:\s*/i, "").trim() || ruleRaw;
      var rows = matchRows && matchRows.length ? matchRows : [];
      var fieldsLabel =
        (metrics && metrics.fields) || rows.length + " fields";
      var matchedLocal = rows.filter(function (r) {
        return r.status === "match" || r.status === "clear";
      }).length;
      var sourcesLabel =
        (metrics && metrics.sources) ||
        matchedLocal + " of " + Math.max(rows.length, 1) + " datasources";
      var caps = truliooCaps && truliooCaps.length ? truliooCaps : [];
      var online = onlineSources && onlineSources.length ? onlineSources : [];

      var rowsHtml = rows
        .map(function (row) {
          var nested = (row.sourceRows || [])
            .map(function (src) {
              return (
                "<tr><td>" +
                esc(src.name || src.source || "Source") +
                "</td><td>" +
                statusChip(src.status) +
                "</td></tr>"
              );
            })
            .join("");
          return (
            '<tr class="v2-match__row" data-v2-match-row="' +
            esc(row.id || row.field || "") +
            '" tabindex="0" aria-expanded="false">' +
            "<td>" +
            esc(row.field || "—") +
            "</td>" +
            "<td>" +
            esc(row.input || "—") +
            "</td>" +
            "<td>" +
            statusChip(row.status) +
            "</td>" +
            "<td>" +
            esc(row.sources || "—") +
            "</td>" +
            '<td class="v2-match__actions-cell">' +
            '<button type="button" class="v2-match__row-toggle" data-v2-match-toggle tabindex="-1" aria-hidden="true" aria-expanded="false" aria-label="Show source details">' +
            chevronSvg() +
            "</button></td></tr>" +
            '<tr class="v2-match__detail-row" hidden data-v2-match-detail>' +
            '<td colspan="5"><div class="v2-match__detail-panel">' +
            (nested
              ? '<table class="v2-match__nested-table"><tbody>' + nested + "</tbody></table>"
              : '<p class="v2-match__detail-empty">No source-level details available.</p>') +
            "</div></td></tr>"
          );
        })
        .join("");

      var truliooBody = caps
        .map(function (cap, index) {
          var tags = (cap.tags || ["Source"])
            .map(function (tag) {
              return tdsTag(tag, "positive");
            })
            .join("");
          return (
            '<li class="v2-match__cap">' +
            '<span class="v2-match__cap-icon" aria-hidden="true">' +
            capIcon(index) +
            "</span>" +
            '<div class="v2-match__cap-text">' +
            '<p class="v2-match__cap-title">' +
            esc(cap.title || "Capability") +
            '</p><p class="v2-match__cap-desc">' +
            esc(cap.desc || "") +
            "</p></div>" +
            '<div class="v2-match__cap-tags">' +
            tags +
            "</div></li>"
          );
        })
        .join("");

      var onlineBody = online
        .map(function (source) {
          var url = source.url || "";
          return (
            "<tr>" +
            "<td>" +
            esc(source.name || "Source") +
            "</td>" +
            "<td>" +
            esc(source.desc || "—") +
            "</td>" +
            "<td>" +
            (url && url !== "#"
              ? '<a class="v2-match__url" href="' +
                esc(url) +
                '" target="_blank" rel="noopener noreferrer">' +
                esc(url) +
                "</a>"
              : "—") +
            "</td></tr>"
          );
        })
        .join("");

      function sourceAccordion(id, title, count, bodyHtml) {
        return (
          '<div class="tds-accordion tds-accordion--md v2-match__sources-accordion" data-v2-match-sources="' +
          esc(id) +
          '">' +
          '<button type="button" class="tds-accordion__header" data-v2-match-accordion aria-expanded="false">' +
          '<span class="tds-accordion__leading"><span class="tds-accordion__title-group">' +
          '<span class="tds-accordion__title">' +
          esc(title) +
          "</span></span></span>" +
          '<span class="tds-accordion__trailing">' +
          '<span class="tds-accordion__counter">' +
          '<span class="tds-counter tds-counter--secondary tds-counter--sm">' +
          esc(String(count)) +
          "</span></span>" +
          '<span class="tds-accordion__chevron" aria-hidden="true">' +
          chevronSvg() +
          "</span></span></button>" +
          '<div class="tds-accordion__content">' +
          bodyHtml +
          "</div></div>"
        );
      }

      return (
        '<div class="v2-match" data-v2-match>' +
        '<div class="v2-match__banner' +
        (verified ? " v2-match__banner--positive" : "") +
        '" role="status">' +
        '<div class="v2-match__banner-main">' +
        '<div class="v2-match__banner-status">' +
        '<span class="v2-match__banner-icon" aria-hidden="true">' +
        (verified ? iconMatch() : iconNoMatch()) +
        "</span>" +
        '<p class="v2-match__banner-title">' +
        (verified ? "Verified" : "Not Verified") +
        "</p></div>" +
        '<div class="v2-match__banner-rule">' +
        '<p class="v2-match__banner-rule-label">Verification Rule:</p>' +
        '<p class="v2-match__banner-rule-value">' +
        esc(ruleValue) +
        "</p></div></div>" +
        '<div class="v2-match__banner-metrics">' +
        tdsDataField("Fields Checked", fieldsLabel) +
        '<span class="v2-match__banner-divider" aria-hidden="true"></span>' +
        tdsDataField("Sources Responded", sourcesLabel) +
        "</div></div>" +
        '<div class="v2-match__table-wrap">' +
        '<table class="v2-match__table">' +
        "<thead><tr><th>Field</th><th>Input</th><th>Result</th><th>Sources</th>" +
        '<th class="v2-match__actions-col" aria-hidden="true"></th></tr></thead>' +
        "<tbody>" +
        (rowsHtml ||
          '<tr><td colspan="5">No match signal rows available.</td></tr>') +
        "</tbody></table></div>" +
        '<div class="v2-match__sources">' +
        sourceAccordion(
          "trulioo",
          "Trulioo Sources",
          caps.length,
          caps.length
            ? '<ul class="v2-match__cap-list">' + truliooBody + "</ul>"
            : '<p class="v2-match__detail-empty">No Trulioo sources listed.</p>'
        ) +
        sourceAccordion(
          "online",
          "Online Sources",
          online.length,
          online.length
            ? '<div class="v2-match__online-wrap"><table class="v2-match__online-table">' +
                "<thead><tr><th>Sources</th><th>Description</th><th>URL</th></tr></thead>" +
                "<tbody>" +
                onlineBody +
                "</tbody></table></div>"
            : '<p class="v2-match__detail-empty">No online sources listed.</p>'
        ) +
        "</div></div>"
      );
    }

    function additionalDetail() {
      /* Figma ADS 8466:57607 — section heads + 3-col data-field grids */
      var titleMap = {
        profile: "Business profile",
        registration: "Registration & filings",
        ownership: "Ownership & key people",
        addresses: "Addresses",
        risk: "Risk & assessment",
        metadata: "Data quality & metadata"
      };
      var order = [
        "profile",
        "registration",
        "ownership",
        "addresses",
        "risk",
        "metadata"
      ];
      var data = additional || {};

      /* Prefer overview registration number when Tabs payload omits it. */
      if (data.profile && overview.regNumber) {
        data.profile = data.profile.map(function (field) {
          if (
            field.label === "Reference ID" &&
            (!field.value || field.value === "—")
          ) {
            return { label: field.label, value: overview.regNumber };
          }
          return field;
        });
      }

      var sections = order
        .map(function (key) {
          var fields = data[key];
          if (!fields || !fields.length) return "";
          return (
            '<section class="v2-additional__section">' +
            '<div class="v2-additional__head">' +
            '<h3 class="v2-additional__title">' +
            esc(titleMap[key] || key) +
            "</h3>" +
            '<hr class="v2-additional__divider" aria-hidden="true" />' +
            "</div>" +
            '<div class="v2-additional__grid">' +
            fields
              .map(function (field) {
                return tdsDataField(field.label, field.value, field.note);
              })
              .join("") +
            "</div></section>"
          );
        })
        .join("");

      return sections
        ? '<div class="v2-additional" data-v2-additional>' + sections + "</div>"
        : '<p class="v2-card__summary">No additional data available.</p>';
    }

    function webDetail() {
      if (!social) return '<p class="v2-card__summary">Web &amp; social data unavailable.</p>';
      var handle = (social.handle || "meridian").replace(/^@/, "");
      return (
        '<p class="v2-section-label">Domain record</p>' +
        '<div class="v2-web-fields">' +
        '<div class="v2-web-fields__grid">' +
        tdsDataField(
          "Website Status",
          social.websiteStatus ||
            (social.highRisk
              ? "Unavailable — domain expired, no live site to render"
              : "Active")
        ) +
        tdsDataField(
          "Domain Registrar",
          social.domainRegistrar || "GoDaddy.com, LLC"
        ) +
        tdsDataField(
          "Domain Registered",
          social.domainRegistered || social.founded || "1 Feb 2019"
        ) +
        (social.highRisk
          ? tdsDataFieldTone("Domain Expired", "1 Feb 2025", "negative")
          : tdsDataField(
              social.domainExpires ? "Domain Expires" : "Domain",
              social.domainExpires || social.domain || "—"
            )) +
        "</div>" +
        '<hr class="v2-web-fields__divider" />' +
        '<p class="v2-section-label">Social profiles</p>' +
        '<div class="v2-web-fields__social">' +
        '<div class="v2-web-fields__social-row">' +
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
        "</div>" +
        '<div class="v2-web-fields__social-row">' +
        tdsLinkField(
          "Twitter/X",
          "https://x.com/" + handle,
          "x.com/" + handle
        ) +
        tdsLinkField(
          "TikTok",
          "https://tiktok.com/" + handle,
          "tiktok.com/" + handle
        ) +
        "</div></div></div>" +
        '<p class="v2-section-label">Profile attributes</p>' +
        fieldGrid([
          { label: "Profile name", value: social.name },
          { label: "Email", value: social.email },
          { label: "Organization type", value: social.orgType },
          { label: "Company size", value: social.companySize },
          { label: "Employees", value: social.employees },
          { label: "Founded", value: social.founded },
          { label: "Headquarters", value: social.headquarters },
          { label: "LinkedIn about", value: social.linkedinAbout },
          { label: "LinkedIn followers", value: social.linkedinFollowers },
          { label: "Instagram followers", value: social.instagramFollowers },
          { label: "X / Twitter followers", value: social.twitterFollowers }
        ]) +
        browserMockHtml()
      );
    }

    /* ── Derived values for richer card content ── */
    var flaggedOwners = owners.filter(function (o) {
      return o.flagged || o.status === "negative";
    });
    var clearOwners = owners.length - flaggedOwners.length;
    var ownerDepth = (graph.tree && graph.tree.children) ? "2 layers" : "1 layer";
    var matchedCount = matchRows.filter(function (r) { return r.status === "match"; }).length;
    var totalFields = matchRows.length;
    var matchPct = totalFields ? Math.round((matchedCount / totalFields) * 100) : 0;
    var isVirtualOffice = /virtual|formations|agent/i.test(overview.address || "");
    var isZeroEmployees = /^0\s/.test(overview.sizing || "");
    var officerTenure = "";
    if (officer.beginDate && officer.endDate) {
      var begin = new Date(officer.beginDate);
      var end = new Date(officer.endDate);
      if (!isNaN(begin) && !isNaN(end)) {
        var months = (end.getFullYear() - begin.getFullYear()) * 12 + (end.getMonth() - begin.getMonth());
        var years = Math.floor(months / 12);
        var rem = months % 12;
        officerTenure = (years > 0 ? years + "y " : "") + rem + "m";
      }
    }
    var officerAddressMatchesBiz = officer.address1 && overview.address &&
      (officer.address1.toLowerCase().indexOf("king street") > -1 ||
       overview.address.toLowerCase().indexOf(officer.address1.split(",")[0].toLowerCase().trim()) > -1);
    var officerDisplayName = officer.fullName ? titleCase(officer.fullName) : "";
    var officerDisplayPosition = officer.position
      ? titleCase(officer.position)
      : "Officer";

    /* ── Screening summary line ── */
    var screeningClearCount = (overview.alerts || []).filter(function (a) {
      return /none found/i.test(a);
    }).length;
    var screeningSummary = screeningClearCount + "/" + (overview.alerts || []).length + " screening checks clear";

    var insightHeadlineParts = [];
    if (isVirtualOffice) insightHeadlineParts.push("virtual office");
    if (isZeroEmployees) insightHeadlineParts.push("no employees");
    insightHeadlineParts.push("incomplete identity records");
    var insightHeadline =
      "High risk entity: " + insightHeadlineParts.join(", ");
    var riskScore = typeof data.riskScore === "number" ? data.riskScore : 87;
    var riskBand =
      riskScore >= 70 ? "high" : riskScore >= 40 ? "medium" : "low";
    var riskLabel =
      riskBand === "high" ? "High Risk" : riskBand === "medium" ? "Medium Risk" : "Low Risk";
    var countryLabel = data.country || "United States";
    var flagSrc = /united kingdom|\buk\b|england|britain/i.test(countryLabel)
      ? "../../../Demo%201/assets/icons/flag-uk.svg"
      : "assets/overview/flag-us.svg";

    /* Portal 2.0 Figma 2039:10529 — Address / Ownership / Contact facts */
    var officeAddressFull = String(data.addr || overview.address || "")
      .split(" - ")[0]
      .trim();
    var officeAddress = officeAddressFull.split(",")[0].trim() || "—";
    var officeMapsHref = officeAddressFull
      ? "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(officeAddressFull)
      : "";
    var connectedEntities =
      (graph.tree && graph.tree.details && graph.tree.details.connected) || [];
    var entitiesRegistered = String(
      1 +
        connectedEntities.filter(function (c) {
          return c.type === "business";
        }).length
    );
    var ownershipDepth = (function countDepth(node, depth) {
      if (!node) return depth;
      var kids = (node.children || []).slice();
      if (!kids.length && node.moreHidden && node.moreHidden.length) {
        kids = node.moreHidden.slice();
      }
      if (!kids.length) return depth;
      return Math.max.apply(
        null,
        kids.map(function (child) {
          return countDepth(child, depth + 1);
        })
      );
    })(graph.tree, 1);
    var ownershipLayerLabel =
      ownershipDepth > 1
        ? ownershipDepth + " (Multi-tiered)"
        : ownershipDepth + " (Single-tier)";
    var beneficialOwners = String(owners.length || 0);
    var contactEmail = overview.email || (data.report && data.report.email) || "";
    var contactWebsite =
      (social && social.domain) ||
      (contactEmail.indexOf("@") > -1
        ? contactEmail.split("@")[1]
        : "") ||
      "meridianapexconsulting.com";

    function factsIcon(kind) {
      /* Stroke SVGs — same d3-fa-line pattern as portal chrome icons */
      if (kind === "location") {
        return (
          '<svg class="d3-fa-line" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
          '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M8 14.25s4.25-3.4 4.25-6.75a4.25 4.25 0 1 0-8.5 0c0 3.35 4.25 6.75 4.25 6.75Z"/>' +
          '<circle cx="8" cy="7.5" r="1.35" stroke="currentColor" stroke-width="1.5"/>' +
          "</svg>"
        );
      }
      if (kind === "owners") {
        return (
          '<svg class="d3-fa-line" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
          '<circle cx="6" cy="5.25" r="2" stroke="currentColor" stroke-width="1.5"/>' +
          '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M2.25 13c.35-2.15 1.85-3.25 3.75-3.25S9.4 10.85 9.75 13"/>' +
          '<circle cx="11.25" cy="5.75" r="1.5" stroke="currentColor" stroke-width="1.5"/>' +
          '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10.1 9.6c1.15.2 2.15.95 2.55 2.4"/>' +
          "</svg>"
        );
      }
      return (
        '<svg class="d3-fa-line" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
        '<circle cx="8" cy="8" r="5.25" stroke="currentColor" stroke-width="1.5"/>' +
        '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M8 2.75v10.5M2.85 6h10.3M2.85 10h10.3"/>' +
        '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M5.35 3.85c-.95 1.2-1.5 2.7-1.5 4.15s.55 2.95 1.5 4.15M10.65 3.85c.95 1.2 1.5 2.7 1.5 4.15s-.55 2.95-1.5 4.15"/>' +
        "</svg>"
      );
    }

    function factsHeading(kind, label) {
      return (
        '<p class="v2-ov__facts-heading">' +
        '<span class="v2-ov__facts-icon" aria-hidden="true">' +
        factsIcon(kind) +
        "</span>" +
        '<span class="v2-ov__facts-title">' +
        esc(label) +
        "</span></p>"
      );
    }

    /* Shared identity strip — card preview + Overview expand detail. */
    function overviewIdentityRowHtml() {
      var label = countryLabel || data.country || "United States";
      var flag =
        flagSrc ||
        (/united kingdom|\buk\b|england|britain/i.test(label)
          ? "../../../Demo%201/assets/icons/flag-uk.svg"
          : "assets/overview/flag-us.svg");
      return (
        '<div class="v2-ov__identity-row">' +
        '<div class="v2-ov__photo-col">' +
        '<img class="v2-ov__office-thumb" src="' +
        esc((data && data.buildingSrc) || KYB_ASSET_BASE + "building.png") +
        '" alt="Office location" width="160" height="126">' +
        "</div>" +
        '<div class="v2-ov__identity">' +
        '<div class="v2-ov__name-row">' +
        '<p class="v2-ov__name">' +
        esc(data.name || "Business") +
        "</p>" +
        tdsTag(
          data.verified !== false ? "Verified" : "Review",
          data.verified !== false ? "positive" : "intermediate"
        ) +
        "</div></div></div>" +
        /* Fields sit full width so their columns line up with the facts
           panel below, instead of being indented past the photo. */
        '<div class="v2-ov__fields">' +
        '<div class="tds-data-field">' +
        '<div class="tds-data-field__label-row"><p class="tds-data-field__label">Country / Jurisdiction</p></div>' +
        '<div class="tds-data-field__content"><div class="tds-data-field__value-row">' +
        '<p class="tds-data-field__value">' +
        esc(label) +
        '</p><span class="tds-data-field__trailing-icon v2-ov__flag" aria-hidden="true">' +
        '<img src="' +
        esc(flag) +
        '" alt="" width="18" height="12"></span></div></div></div>' +
        tdsDataField("Registration status", overview.status || "—") +
        tdsDataField("BRN / Registration number", overview.regNumber || "—") +
        tdsDataField("Industry code", overview.industry || "—") +
        tdsDataField("Tax ID", overview.taxId || "—") +
        "</div>"
      );
    }

    function overviewInsightHtml() {
      return (
        '<div class="v2-ov">' +
        overviewIdentityRowHtml() +
        '<div class="v2-ov__panel v2-ov__facts">' +
        '<div class="v2-ov__panel-col">' +
        factsHeading("location", "Address") +
        '<div class="v2-ov__facts-fields">' +
        (officeMapsHref
          ? '<div class="v2-ov__facts-link v2-ov__facts-link--wrap">' +
            tdsDataFieldIcon("Business address", officeAddressFull, "", {
              href: officeMapsHref,
              external: true
            }) +
            "</div>"
          : tdsDataField("Business address", officeAddressFull || "—")) +
        tdsDataField("Entities registered", entitiesRegistered) +
        "</div></div>" +
        '<div class="v2-ov__panel-col">' +
        factsHeading("owners", "Ownership") +
        '<div class="v2-ov__facts-fields">' +
        tdsDataField("Ownership layer", ownershipLayerLabel) +
        tdsDataField("Beneficial owners", beneficialOwners) +
        "</div></div>" +
        '<div class="v2-ov__panel-col">' +
        factsHeading("globe", "Contact details") +
        '<div class="v2-ov__facts-fields">' +
        '<div class="v2-ov__facts-link">' +
        tdsDataFieldIcon("Website", contactWebsite, "", {
          href: "https://" + contactWebsite,
          external: true
        }) +
        "</div>" +
        (contactEmail
          ? '<div class="v2-ov__facts-link">' +
            tdsDataFieldIcon("Email", contactEmail, "", {
              href: "mailto:" + contactEmail,
              external: false
            }) +
            "</div>"
          : tdsDataField("Email", "—")) +
        "</div></div></div></div>"
      );
    }

    /* All expand sections (detail). Stack cards use a subset via CARD_ORDER. */
    return [
      {
        id: "overview",
        kicker: "Overview",
        title: insightHeadline,
        titleHtml:
          '<span class="v2-card__title-risk">High risk entity</span>: ' +
          esc(insightHeadlineParts.join(", ")),
        summary: CARD_LABELS.overview,
        badge: riskLabel,
        badgeTone: "negative",
        ask: "What are the key risk factors for this business?",
        preview: overviewInsightHtml,
        detail: overviewDetail
      },
      {
        id: "signals",
        kicker: "Signals",
        title:
          "10 risk signals across 5 categories. Business Model (84) and Financial Health (68) drive the overall " +
          riskScore +
          " " +
          riskLabel +
          " score.",
        titleHtml:
          (riskBand === "high"
            ? '<span class="v2-card__title-risk">' + esc(riskLabel) + "</span>"
            : esc(riskLabel)) +
          " · 10 risk signals across 5 categories. Business Model (84) and Financial Health (68) drive the overall " +
          esc(String(riskScore)) +
          " score.",
        summary: CARD_LABELS.signals,
        ask: "Which risk signals are driving this score?",
        preview: function () {
          var indicators = data.riskCategories || [
            { label: "Business Model", score: 84, risk: "high" },
            { label: "Financial Health", score: 68, risk: "high" },
            { label: "Fraud & Financial Crimes", score: 63, risk: "medium" },
            { label: "Governance & Compliance", score: 52, risk: "high" },
            { label: "Third-Party & Market", score: 57, risk: "low" }
          ];
          var riskShort = { high: "High", medium: "Medium", low: "Low" };
          var riskToneMap = {
            high: "negative",
            medium: "intermediate",
            low: "positive"
          };
          var highlights = [
            { label: "Elevated default risk.", tone: "negative" },
            { label: "No physical presence.", tone: "negative" },
            { label: "Shell-company ownership patterns.", tone: "negative" },
            { label: "Incomplete registry filings.", tone: "positive" },
            { label: "Address shared with unrelated entities.", tone: "negative" },
            { label: "No bankruptcy filings.", tone: "positive" },
            { label: "No adverse media matches.", tone: "positive" }
          ];
          return (
            '<div class="v2-match-preview">' +
            '<div class="v2-match-preview__gauge-card">' +
            '<div class="score-gauge-host" data-score="' +
            esc(String(riskScore)) +
            '" data-risk="' +
            esc(riskBand) +
            '" data-label="' +
            esc(riskLabel) +
            '" data-show-percent="false" data-max="100" aria-label="' +
            esc(riskLabel + " score " + riskScore) +
            '"></div>' +
            '<div class="v2-match-preview__highlights">' +
            '<p class="v2-match-preview__label">Highlights</p>' +
            '<ul class="v2-ov__highlights">' +
            highlights
              .map(function (item) {
                return (
                  '<li class="v2-ov__highlight">' +
                  tdsTag(item.label, item.tone) +
                  "</li>"
                );
              })
              .join("") +
            "</ul></div></div>" +
            '<div class="v2-match-preview__indicators">' +
            '<p class="v2-match-preview__label">Risk indicators</p>' +
            '<ul class="v2-match-preview__list">' +
            indicators
              .map(function (item) {
                return (
                  '<li class="v2-match-preview__row">' +
                  '<span class="v2-match-preview__name">' +
                  esc(item.label) +
                  "</span>" +
                  '<span class="v2-match-preview__meta">' +
                  '<span class="v2-match-preview__score">' +
                  esc(String(item.score)) +
                  "/100</span>" +
                  tdsTag(riskShort[item.risk] || "Medium", riskToneMap[item.risk] || "intermediate") +
                  "</span></li>"
                );
              })
              .join("") +
            "</ul></div></div>"
          );
        },
        detail: signalsDetail
      },
      {
        id: "ownership",
        kicker: "Ownership",
        title: (function () {
          var parts = [];
          parts.push(owners.length + " shareholders identified, " + ownerDepth + " deep");
          if (flaggedOwners.length) {
            parts.push(flaggedOwners.length + " flagged for review");
          }
          if (graphFindings.length) {
            parts.push(graphFindings[0]);
          }
          return parts.join(". ") + ".";
        })(),
        summary: CARD_LABELS.ownership,
        badge: flaggedOwners.length
          ? flaggedOwners.length + " flagged"
          : owners.length + " clear",
        badgeTone: flaggedOwners.length ? "review" : "positive",
        ask: flaggedOwners.length
          ? "Explain why " +
            (flaggedOwners[0].name || "this owner") +
            " is flagged and what action is needed."
          : "Summarize the ownership structure and any risks.",
        preview: function () {
          return (
            '<div class="v2-ownership-body">' +
            '<div class="v2-ownership-body__fields">' +
            ownerListHtml(owners, 3) +
            (graphFindings.length > 1
              ? '<p class="v2-card__summary">' +
                esc(graphFindings.slice(0, 2).join(". ")) +
                "</p>"
              : "") +
            "</div>" +
            '<div class="v2-ubo-preview" data-v2-ubo-preview-wrap>' +
            '<div class="v2-ubo-graph v2-ubo-graph--preview kyb-ownership-graph" data-v2-ubo-preview aria-hidden="true"></div>' +
            '<div class="v2-ubo-preview__veil" aria-hidden="true"></div>' +
            '<button type="button" class="tds-btn tds-btn--secondary tds-btn--md v2-ubo-preview__cta" data-v2-open-ownership-graph>' +
            '<span class="tds-btn__label">View Full Graph</span></button>' +
            "</div>" +
            "</div>"
          );
        },
        detail: ownershipDetail
      },
      {
        id: "match",
        kicker: "Match Signals & Sources",
        title: matchedCount + " of " + totalFields + " fields matched (" + matchPct + "%). " +
          (data.verified !== false ? "Verification outcome: Verified." : "Verification outcome: Review required."),
        summary: CARD_LABELS.match,
        badge: data.verified !== false ? "Verified" : "Review",
        badgeTone: data.verified !== false ? "positive" : "review",
        ask: "Which fields could not be verified, and why?",
        preview: function () {
          var statusTone = data.verified !== false ? "positive" : "review";
          var statusLabel = data.verified !== false ? "Verified" : "Review";
          var previewRows = matchRows.slice(0, 5);
          var statusMap = {
            match: { label: "Matched", tone: "positive" },
            clear: { label: "Clear", tone: "positive" },
            mismatch: { label: "Mismatch", tone: "negative" },
            missing: { label: "Missing", tone: "intermediate" },
            review: { label: "Review", tone: "intermediate" }
          };
          var rowsHtml = previewRows.map(function (row) {
            var s = statusMap[row.status] || { label: row.status || "Unknown", tone: "intermediate" };
            return (
              '<tr>' +
              '<td>' + esc(row.field || "---") + '</td>' +
              '<td>' + tdsTag(s.label, s.tone) + '</td>' +
              '</tr>'
            );
          }).join("");
          var remaining = matchRows.length - previewRows.length;
          return (
            '<div class="v2-match-preview v2-match-preview--vertical">' +
            '<div class="v2-match-preview__banner v2-match-preview__banner--' + statusTone + '">' +
            '<span class="v2-match-preview__banner-label">' + esc(statusLabel) + '</span>' +
            '<span class="v2-match-preview__banner-ratio">' +
            esc(matchedCount + '/' + totalFields + ' fields matched') +
            '</span>' +
            '</div>' +
            '<div class="v2-match-preview__table-wrap">' +
            '<table class="v2-match-preview__table">' +
            '<thead><tr><th>Field</th><th>Status</th></tr></thead>' +
            '<tbody>' + rowsHtml + '</tbody>' +
            '</table>' +
            (remaining > 0
              ? '<p class="v2-match-preview__more">+ ' + remaining + ' more fields</p>'
              : '') +
            '</div></div>'
          );
        },
        detail: matchDetail
      },
      {
        id: "additional",
        kicker: "Officers",
        title: (function () {
          if (!officerDisplayName) return "No officers or directors on file.";
          var parts = [];
          parts.push(officerDisplayName + ", " + officerDisplayPosition);
          if (officerTenure) parts.push("tenure: " + officerTenure);
          if (officer.status === "Active") {
            parts.push("currently active");
          } else if (officer.endDate) {
            parts.push("ended " + officer.endDate);
          }
          if (officerAddressMatchesBiz) {
            parts.push("address matches company registered office");
          }
          return parts.join(". ") + ".";
        })(),
        summary: CARD_LABELS.additional,
        badge: officer.status || "Records",
        badgeTone: officer.status === "Active" ? "positive" : "review",
        ask: officerDisplayName
          ? "Does " + officerDisplayName + "'s profile raise any compliance concerns?"
          : "Are there any gaps in the directors and officers records?",
        preview: function () {
          var statusNote =
            officer.status === "Active"
              ? "Currently serving"
              : "No longer active" +
                (officer.endDate ? " (ended " + officer.endDate + ")" : "");
          /* One three-column grid: the counts and the officer's fields share
             the same gutters instead of being 3-up over 2-up. */
          return fieldGrid(
            [
              { label: "Directors", value: "1" },
              { label: "PSCs", value: "0" },
              { label: "Tenure", value: officerTenure || "—" },
              { label: "Name", value: officerDisplayName },
              { label: "Position", value: officerDisplayPosition },
              { label: "Status", value: statusNote },
              {
                label: "National ID",
                value: officer.nationalId ? "On file" : "Not provided"
              },
              {
                label: "Primary address",
                value: officer.address1,
                span: 2,
                note: officerAddressMatchesBiz
                  ? "Matches company registered address"
                  : ""
              }
            ],
            { cols: 3 }
          );
        },
        detail: additionalDetail
      },
      {
        id: "web",
        kicker: "Web & Social",
        title: (function () {
          if (!social) return "No web or social data available.";
          var presence = social.highRisk ? "Low" : "Established";
          var parts = [];
          parts.push(presence + " digital presence");
          var totalFollowers =
            parseInt(social.linkedinFollowers || "0", 10) +
            parseInt(social.instagramFollowers || "0", 10) +
            parseInt(social.twitterFollowers || "0", 10);
          if (totalFollowers === 0) {
            parts.push("no social following detected");
          } else {
            parts.push(totalFollowers + " total followers across platforms");
          }
          if (social.companySize && overview.sizing) {
            var sizeMatch =
              social.companySize.indexOf("0") === 0 &&
              /^0\s/.test(overview.sizing);
            if (!sizeMatch && social.companySize !== overview.sizing) {
              parts.push("employee count conflicts with registry data");
            }
          }
          return parts.join(". ") + ".";
        })(),
        summary: CARD_LABELS.web,
        badge: social && social.highRisk ? "Low presence" : "Established",
        badgeTone: social && social.highRisk ? "review" : "positive",
        ask: social && social.highRisk
          ? "Why is this domain flagged as high risk?"
          : social && social.domain
            ? "Are there any red flags in the online presence for " + social.domain + "?"
            : "What does the web presence reveal about this business?",
        preview: function () {
          if (!social) {
            return (
              '<div class="v2-web-body">' +
              '<div class="v2-web-body__fields">' +
              '<p class="v2-card__summary">Web &amp; social data unavailable.</p>' +
              "</div>" +
              browserMockHtml() +
              "</div>"
            );
          }
          var handle = (social.handle || "meridian").replace(/^@/, "");
          return (
            '<div class="v2-web-body">' +
            '<div class="v2-web-body__fields">' +
            '<div class="v2-web-fields">' +
            '<div class="v2-web-fields__grid">' +
            tdsDataField(
              "Website Status",
              social.websiteStatus ||
                (social.highRisk
                  ? "Unavailable — domain expired, no live site to render"
                  : "Active")
            ) +
            tdsDataField(
              "Domain Registrar",
              social.domainRegistrar || "GoDaddy.com, LLC"
            ) +
            tdsDataField(
              "Domain Registered",
              social.domainRegistered || social.founded || "1 Feb 2019"
            ) +
            (social.highRisk
              ? tdsDataFieldTone("Domain Expired", "1 Feb 2025", "negative")
              : tdsDataField(
                  "Domain Expires",
                  social.domainExpires || "—"
                )) +
            "</div>" +
            '<hr class="v2-web-fields__divider" />' +
            '<div class="v2-web-fields__social">' +
            '<div class="v2-web-fields__social-row">' +
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
            "</div>" +
            '<div class="v2-web-fields__social-row">' +
            tdsLinkField(
              "Twitter/X",
              "https://x.com/" + handle,
              "x.com/" + handle
            ) +
            tdsLinkField(
              "TikTok",
              "https://tiktok.com/" + handle,
              "tiktok.com/" + handle
            ) +
            "</div></div></div></div>" +
            browserMockHtml() +
            "</div>"
          );
        },
        detail: webDetail
      }
    ];
  }

  function reportActions() {
    return global.VerificationReportActions || null;
  }

  function reportActionsHtml(size) {
    var A = reportActions();
    return A ? A.actionsHtml({ size: size || "md" }) : "";
  }

  function render(host, data) {
    var sections = buildCards(data);
    var byId = {};
    sections.forEach(function (card) {
      byId[card.id] = card;
    });
    var stackCards = CARD_ORDER.map(function (id) {
      return byId[id];
    }).filter(Boolean);
    var expandSections = EXPAND_ORDER.map(function (id) {
      return byId[id];
    }).filter(Boolean);

    var dots = stackCards
      .map(function (card, index) {
        return (
          '<button type="button" class="v2-stack__dot" role="tab" data-v2-goto="' +
          esc(card.id) +
          '" aria-label="' +
          esc(CARD_LABELS[card.id] || card.kicker || card.id) +
          '" title="' +
          esc(CARD_LABELS[card.id] || card.kicker || card.id) +
          '" aria-controls="v2-slot-' +
          esc(card.id) +
          '"' +
          (index === 0 ? ' aria-selected="true" aria-current="true"' : ' aria-selected="false"') +
          '><span class="v2-stack__dot-mark" aria-hidden="true"></span></button>'
        );
      })
      .join("");

    var track = stackCards
      .map(function (card, index) {
        return cardShell(
          {
            id: card.id,
            index: index,
            kicker: card.kicker,
            title: card.title,
            titleHtml: card.titleHtml,
            ask: card.ask,
            sectionCount: expandSections.length
          },
          card.preview()
        );
      })
      .join("");

    var chips = expandSections
      .map(function (card, index) {
        var label = CARD_LABELS[card.id] || card.summary || card.kicker || card.title;
        var selected = index === 0;
        return (
          '<button type="button" class="tds-tab-item' +
          (selected ? " tds-tab-item--active" : "") +
          '" role="tab" data-v2-expand-goto="' +
          esc(card.id) +
          '"' +
          (selected
            ? ' aria-selected="true" aria-current="true"'
            : ' aria-selected="false"') +
          ">" +
          '<span class="tds-tab-item__content">' +
          esc(label) +
          "</span>" +
          '<span class="tds-tab-item__indicator" aria-hidden="true"></span>' +
          "</button>"
        );
      })
      .join("");

    host.innerHTML =
      '<div class="v2-stack" data-v2-stack data-v2-mode="stack" style="--v2-card-count:' +
      esc(String(stackCards.length)) +
      '">' +
      '<div class="v2-stack__chrome" data-v2-stack-chrome>' +
      '<div class="v2-stack__eyebrow"><span class="v2-stack__eyebrow-dot" aria-hidden="true"></span>' +
      esc(data.name || "Verification report") +
      "</div>" +
      '<div class="v2-stack__chrome-actions">' +
      reportActionsHtml("md") +
      "</div>" +
      "</div>" +
      '<div class="v2-stack__progress" role="tablist" aria-label="Report sections" aria-orientation="vertical">' +
      '<span class="v2-stack__progress-track" aria-hidden="true"></span>' +
      dots +
      "</div>" +
      '<div class="v2-stack__scroller" data-v2-scroller tabindex="0" aria-label="Stacked verification report">' +
      '<div class="v2-stack__track" style="--v2-card-count:' +
      esc(String(stackCards.length)) +
      '">' +
      track +
      '<div class="v2-stack__end" aria-hidden="true"></div>' +
      "</div>" +
      "</div>" +
      '<div class="v2-expand" data-v2-expand hidden>' +
      '<div class="v2-expand__panel" role="dialog" aria-modal="true" aria-label="Expanded report section">' +
      '<header class="v2-expand__header">' +
      '<div class="v2-expand__header-row">' +
      '<button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--secondary tds-icon-btn--circular" data-v2-collapse aria-label="Back to cards">' +
      '<span class="tds-icon-btn__icon" aria-hidden="true">' +
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none">' +
      '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10 3.5 5.5 8 10 12.5"/>' +
      "</svg></span></button>" +
      "</div>" +
      '<div class="tds-tabs v2-expand__tabs">' +
      '<div class="tds-tabs__row">' +
      '<div class="tds-tabs__list" role="tablist" aria-label="Report sections">' +
      chips +
      "</div></div>" +
      '<div class="tds-tabs__divider" aria-hidden="true"></div>' +
      "</div>" +
      "</header>" +
      '<div class="v2-expand__scroll" data-v2-expand-scroll>' +
      '<div class="v2-expand__intro">' +
      '<h2 class="v2-expand__title" data-v2-expand-title></h2>' +
      '<p class="v2-expand__summary" data-v2-expand-summary></p>' +
      "</div>" +
      '<div class="v2-expand__body" data-v2-expand-body></div>' +
      '<footer class="v2-expand__footer">' +
      askChipHtml("Discuss with TruAI", "data-v2-expand-ask") +
      "</footer>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";

    return sections;
  }

  function preferReducedMotion() {
    return (
      global.matchMedia &&
      global.matchMedia("(prefers-reduced-motion: reduce)").matches
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
        /* ignore stale unmount */
      }
    }
    Graph.mount(container, {
      tree: graph.tree,
      riskFilter: graph.riskFilter || null
    });
    return true;
  }

  function unmountUboGraph(container) {
    if (!container) return;
    if (
      global.KybUboGraph &&
      typeof global.KybUboGraph.unmount === "function"
    ) {
      try {
        global.KybUboGraph.unmount(container);
      } catch (err) {
        /* ignore */
      }
    }
  }

  function createController(host, options) {
    var data = (options && options.data) || getSample();
    if (!host || !data) return null;

    var cards = render(host, data);
    if (global.ScoreGauge && typeof global.ScoreGauge.renderAll === "function") {
      global.ScoreGauge.renderAll(host);
    }
    var stackRoot = host.querySelector("[data-v2-stack]");
    var scroller = host.querySelector("[data-v2-scroller]");
    var expandRoot = host.querySelector("[data-v2-expand]");
    var expandBody = host.querySelector("[data-v2-expand-body]");
    var expandScroll = host.querySelector("[data-v2-expand-scroll]");
    var expandTitle = host.querySelector("[data-v2-expand-title]");
    var expandSummary = host.querySelector("[data-v2-expand-summary]");
    var expandAsk = host.querySelector("[data-v2-expand-ask]");
    var expandChips = Array.prototype.slice.call(
      host.querySelectorAll("[data-v2-expand-goto]")
    );
    var slotEls = Array.prototype.slice.call(host.querySelectorAll("[data-v2-slot]"));
    var cardEls = Array.prototype.slice.call(host.querySelectorAll("[data-v2-card]"));
    var dots = Array.prototype.slice.call(
      host.querySelectorAll(".v2-stack__progress [data-v2-goto]")
    );
    var activeId = cards[0] ? cards[0].id : null;
    var activeIndex = 0;
    var expandedId = null;
    var savedScrollTop = 0;
    var savedActiveId = null;
    var mode = "stack";
    var ownershipViewMode = "list";
    var onCardChange = options && options.onCardChange;
    var onAsk = options && options.onAsk;
    var ticking = false;
    var resizeObserver = null;

    function cardById(id) {
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].id === id) return cards[i];
      }
      return null;
    }

    function isExpanded() {
      return mode === "expand";
    }

    function ownershipGraphHost() {
      return expandBody
        ? expandBody.querySelector("[data-v2-ubo-graph]")
        : null;
    }

    function ownershipPreviewHost() {
      return host.querySelector("[data-v2-ubo-preview]");
    }

    function clearOwnershipGraph() {
      unmountUboGraph(ownershipGraphHost());
    }

    function fitOwnershipPreview() {
      var preview = ownershipPreviewHost();
      if (!preview) return;
      var canvas = preview.querySelector(".kyb-ubo-canvas");
      if (!canvas) return;
      var pad = 4;
      var availW = Math.max(preview.clientWidth - pad * 2, 1);
      var availH = Math.max(preview.clientHeight - pad * 2, 1);
      var naturalW = canvas.offsetWidth || 1;
      var naturalH = canvas.offsetHeight || 1;
      var fit = Math.min(availW / naturalW, availH / naturalH);
      /* 75.5% larger than contain-fit (1.3 × 1.35) — fill more of the preview canvas */
      var scale = fit * 1.755;
      preview.style.setProperty(
        "--v2-ubo-preview-scale",
        String(Math.max(0.35, scale))
      );
    }

    function mountOwnershipPreview() {
      var preview = ownershipPreviewHost();
      if (!preview) return;
      global.requestAnimationFrame(function () {
        if (!mountUboGraph(preview, data)) return;
        global.requestAnimationFrame(function () {
          fitOwnershipPreview();
          global.setTimeout(fitOwnershipPreview, 80);
          global.setTimeout(fitOwnershipPreview, 200);
        });
      });
    }

    function applyOwnershipView(view) {
      var next = view === "graph" ? "graph" : "list";
      ownershipViewMode = next;
      if (!expandBody) return;
      var root = expandBody.querySelector("[data-v2-ownership-views]");
      if (!root) return;

      root.querySelectorAll("[data-v2-ownership-view]").forEach(function (btn) {
        var on = btn.getAttribute("data-v2-ownership-view") === next;
        btn.setAttribute("aria-selected", on ? "true" : "false");
        btn.setAttribute("aria-pressed", on ? "true" : "false");
        btn.tabIndex = on ? 0 : -1;
        btn.classList.toggle("tds-segmented-control__item--selected", on);
      });
      root.querySelectorAll("[data-v2-ownership-panel]").forEach(function (panel) {
        var on = panel.getAttribute("data-v2-ownership-panel") === next;
        panel.hidden = !on;
      });

      if (next === "graph") {
        global.requestAnimationFrame(function () {
          mountUboGraph(ownershipGraphHost(), data);
        });
      } else {
        clearOwnershipGraph();
      }
    }

    function fillExpand(id) {
      var card = cardById(id);
      if (!card || !expandBody) return;
      clearOwnershipGraph();
      expandedId = id;
      /* summary holds short section name; title holds insight headline */
      if (expandTitle) {
        expandTitle.textContent = card.summary || card.kicker || id;
      }
      if (expandSummary) {
        expandSummary.textContent = card.title || "";
        expandSummary.hidden = !card.title;
      }
      expandBody.innerHTML = card.detail ? card.detail() : "";
      if (expandAsk) {
        var askText = card.ask || card.title || "Discuss with TruAI";
        expandAsk.setAttribute("data-v2-ask", askText);
        var askLabel = expandAsk.querySelector(".tds-ai-tag__label");
        if (askLabel) askLabel.textContent = askText;
      }
      expandChips.forEach(function (chip) {
        var current = chip.getAttribute("data-v2-expand-goto") === id;
        chip.classList.toggle("tds-tab-item--active", current);
        chip.setAttribute("aria-selected", current ? "true" : "false");
        if (current) chip.setAttribute("aria-current", "true");
        else chip.removeAttribute("aria-current");
      });
      if (id === "ownership") {
        applyOwnershipView(ownershipViewMode);
      }
      if (
        global.ScoreGauge &&
        typeof global.ScoreGauge.renderAll === "function"
      ) {
        global.ScoreGauge.renderAll(expandBody);
      }
      if (expandScroll) expandScroll.scrollTop = 0;
      if (typeof onCardChange === "function") onCardChange(id);
    }

    function focusSignalCategory(categoryId) {
      if (!expandBody || !categoryId) return;
      var accordion = expandBody.querySelector(
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
      accordion.classList.add("is-flash");
      global.setTimeout(function () {
        accordion.classList.remove("is-flash");
      }, 1200);
    }

    function openExpand(id, opts) {
      var target = id || activeId;
      if (!target || !expandRoot || !stackRoot) return;
      if (EXPAND_ORDER.indexOf(target) === -1) return;
      if (!isExpanded()) {
        savedScrollTop = scroller ? scroller.scrollTop : 0;
        savedActiveId = activeId;
        ownershipViewMode =
          opts && opts.ownershipView === "graph" ? "graph" : "list";
      } else if (opts && opts.ownershipView) {
        ownershipViewMode =
          opts.ownershipView === "graph" ? "graph" : "list";
      }
      mode = "expand";
      stackRoot.setAttribute("data-v2-mode", "expand");
      expandRoot.hidden = false;
      fillExpand(target);
      global.requestAnimationFrame(function () {
        expandRoot.classList.add("is-open");
        var back = expandRoot.querySelector("[data-v2-collapse]");
        if (back) back.focus();
      });
    }

    function closeExpand() {
      if (!isExpanded() || !expandRoot || !stackRoot) return;
      clearOwnershipGraph();
      ownershipViewMode = "list";
      expandRoot.classList.remove("is-open");
      var restoreId = savedActiveId || activeId;
      var finish = function () {
        mode = "stack";
        stackRoot.setAttribute("data-v2-mode", "stack");
        expandRoot.hidden = true;
        expandedId = null;
        if (scroller) {
          scroller.scrollTop = savedScrollTop;
          updateStackFromScroll();
        }
        setActive(restoreId, { force: true });
        savedActiveId = null;
        if (scroller) scroller.focus();
      };
      if (preferReducedMotion()) {
        finish();
        return;
      }
      global.setTimeout(finish, 360);
    }

    function switchExpand(id) {
      if (!isExpanded() || !id || id === expandedId) return;
      if (EXPAND_ORDER.indexOf(id) === -1) return;
      if (!expandBody) return;
      var reduce = preferReducedMotion();
      if (reduce) {
        fillExpand(id);
        return;
      }
      expandBody.classList.add("is-switching");
      global.setTimeout(function () {
        fillExpand(id);
        expandBody.classList.remove("is-switching");
        expandBody.classList.add("is-switched");
        global.setTimeout(function () {
          expandBody.classList.remove("is-switched");
        }, 280);
      }, 140);
    }

    function clamp01(value) {
      return Math.min(1, Math.max(0, value));
    }

    function slotMetrics() {
      var viewH = scroller ? scroller.clientHeight || 1 : 1;
      /* Card must fit under sticky top inside the scrollport, or the whole
         stack gets yanked upward when the track bottom catches the stickies. */
      /* 680 keeps the Overview card's identity fields and facts panel on
         one screen; still clamped to the viewport on short windows. */
      var cardH = Math.min(680, Math.max(420, viewH - 96));
      var stickyTop = Math.max(64, Math.round((viewH - cardH) / 2));
      if (stickyTop + cardH > viewH - 8) {
        stickyTop = Math.max(48, viewH - cardH - 8);
      }
      var peek = Math.min(72, Math.max(48, Math.round(viewH * 0.07)));
      var travel = Math.max(120, Math.round(viewH * 0.28));
      var step = cardH + travel;
      /*
        End spacer must keep the sticky containing block long enough that
        parking on the last card never releases earlier stickies (which
        reads as the whole stack shooting upward).
      */
      var endSpace = Math.max(
        viewH,
        stickyTop + cardH + 48,
        viewH - stickyTop - cardH + stickyTop + 48
      );
      return {
        viewH: viewH,
        cardH: cardH,
        peek: peek,
        stickyTop: stickyTop,
        travel: travel,
        step: step,
        endSpace: endSpace
      };
    }

    function syncViewHeight() {
      if (!scroller) return;
      var m = slotMetrics();
      scroller.style.setProperty("--v2-view-h", m.viewH + "px");
      scroller.style.setProperty("--v2-card-h", m.cardH + "px");
      scroller.style.setProperty("--v2-peek", m.peek + "px");
      scroller.style.setProperty("--v2-sticky-top", m.stickyTop + "px");
      scroller.style.setProperty("--v2-travel", m.travel + "px");
      scroller.style.setProperty("--v2-end-space", m.endSpace + "px");
      host.style.setProperty("--v2-view-h", m.viewH + "px");
      host.style.setProperty("--v2-card-h", m.cardH + "px");
    }

    function maxSafeScroll() {
      if (!scroller) return 0;
      var m = slotMetrics();
      var lastIndex = Math.max(0, slotEls.length - 1);
      /*
        Park exactly when the last card sticks at --v2-sticky-top.
        Scrolling further into the end spacer releases the sticky stack.
      */
      return Math.max(0, lastIndex * m.step - m.stickyTop);
    }

    function setActive(id, opts) {
      if (!id || (id === activeId && !(opts && opts.force))) {
        if (opts && opts.scroll) scrollToCard(id);
        return;
      }
      activeId = id;
      activeIndex = Math.max(0, CARD_ORDER.indexOf(id));
      cardEls.forEach(function (el) {
        el.setAttribute(
          "data-v2-active",
          el.getAttribute("data-v2-card") === id ? "true" : "false"
        );
      });
      slotEls.forEach(function (el) {
        el.setAttribute(
          "data-v2-active",
          el.getAttribute("data-v2-slot") === id ? "true" : "false"
        );
      });
      dots.forEach(function (dot) {
        var current = dot.getAttribute("data-v2-goto") === id;
        if (current) {
          dot.setAttribute("aria-current", "true");
          dot.setAttribute("aria-selected", "true");
        } else {
          dot.removeAttribute("aria-current");
          dot.setAttribute("aria-selected", "false");
        }
      });
      if (opts && opts.scroll) scrollToCard(id);
      if (typeof onCardChange === "function") onCardChange(id);
    }

    function scrollToCard(id) {
      var index = CARD_ORDER.indexOf(id);
      if (!scroller || index < 0) return;
      var m = slotMetrics();
      var lastIndex = Math.max(0, slotEls.length - 1);
      var top =
        index >= lastIndex ? maxSafeScroll() : Math.max(0, index * m.step);
      scroller.scrollTo({
        top: top,
        behavior: preferReducedMotion() ? "auto" : "smooth"
      });
    }

    function updateStackFromScroll() {
      if (!scroller || !slotEls.length) return;
      var m = slotMetrics();
      var safeMax = maxSafeScroll();
      if (scroller.scrollTop > safeMax) {
        scroller.scrollTop = safeMax;
      }
      var reduce = preferReducedMotion();
      var lastIndex = Math.max(0, slotEls.length - 1);
      /*
        Sticky cards share the same top, so getBoundingClientRect distance always
        favors the first card. Drive the active section from scroll progress.
      */
      var bestIndex = Math.round(scroller.scrollTop / Math.max(1, m.step));
      if (bestIndex < 0) bestIndex = 0;
      if (bestIndex > lastIndex) bestIndex = lastIndex;
      /* Clamped last-card park sits slightly before lastIndex * step. */
      if (
        lastIndex > 0 &&
        scroller.scrollTop >= maxSafeScroll() - 2
      ) {
        bestIndex = lastIndex;
      }

      cardEls.forEach(function (card, index) {
        var next = cardEls[index + 1];
        var progress = 0;
        if (!reduce && next) {
          var currentRect = card.getBoundingClientRect();
          var nextRect = next.getBoundingClientRect();
          /* 0 = next still below; 1 = next fully covering at same sticky top */
          var start = currentRect.top + currentRect.height * 0.55;
          var end = currentRect.top + 4;
          progress = clamp01((start - nextRect.top) / Math.max(1, start - end));
        }
        card.style.setProperty("--v2-stack-p", String(progress));
      });

      var bestId = slotEls[bestIndex]
        ? slotEls[bestIndex].getAttribute("data-v2-slot")
        : activeId;
      if (bestId && bestId !== activeId) setActive(bestId);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      global.requestAnimationFrame(function () {
        ticking = false;
        updateStackFromScroll();
      });
    }

    function onResize() {
      var index = Math.max(0, CARD_ORDER.indexOf(activeId));
      syncViewHeight();
      if (scroller) {
        var m = slotMetrics();
        var lastIndex = Math.max(0, slotEls.length - 1);
        scroller.scrollTop =
          index >= lastIndex ? maxSafeScroll() : index * m.step;
      }
      updateStackFromScroll();
    }

    function onWheel(event) {
      if (isExpanded() || !scroller || event.ctrlKey) return;
      if (!event.target.closest || !event.target.closest(".v2-card")) return;
      if (!scroller.contains(event.target)) return;
      var nextTop = scroller.scrollTop + event.deltaY;
      var safeMax = maxSafeScroll();
      scroller.scrollTop = Math.max(0, Math.min(safeMax, nextTop));
      event.preventDefault();
    }

    syncViewHeight();
    if (scroller) {
      scroller.addEventListener("scroll", onScroll, { passive: true });
      scroller.addEventListener("wheel", onWheel, { passive: false });
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(scroller);
      }
    }
    global.addEventListener("resize", onResize);

    function downloadReport() {
      var payload = {
        name: data.name || "Verification report",
        country: data.country || "",
        date: data.date || "",
        verified: data.verified !== false,
        riskLabel: data.riskLabel || "",
        transactionId: data.transactionId || "",
        overview: data.overview || {},
        ownership: data.ownership || data.ownershipTableRows || [],
        sections: CARD_ORDER.slice(),
        exportedAt: new Date().toISOString()
      };
      var blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json"
      });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      var slug = String(data.name || "verification-report")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      link.href = url;
      link.download = (slug || "verification-report") + "-report.json";
      document.body.appendChild(link);
      link.click();
      link.remove();
      global.setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 1000);
    }

    function setOverviewOption(root, option) {
      if (!root || !option) return;
      root.querySelectorAll("[data-v2-overview-chip]").forEach(function (chip) {
        var on = chip.getAttribute("data-v2-overview-chip") === option;
        chip.setAttribute("aria-selected", on ? "true" : "false");
        chip.setAttribute("aria-pressed", on ? "true" : "false");
        chip.classList.toggle("tds-segmented-control__item--selected", on);
      });
      root.querySelectorAll("[data-v2-overview-panel]").forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-v2-overview-panel") !== option;
      });
    }

    function applySignalImpactFilter(filter, activeBtn) {
      if (!expandBody) return;
      var signalsRoot = expandBody.querySelector("[data-v2-signals]");
      if (!signalsRoot) return;
      var next = filter === "increased" || filter === "decreased" ? filter : "all";

      signalsRoot.setAttribute("data-v2-signal-filter-active", next);
      signalsRoot.querySelectorAll("[data-v2-signal-filter]").forEach(function (btn) {
        var on =
          (activeBtn && btn === activeBtn) ||
          btn.getAttribute("data-v2-signal-filter") === next;
        btn.classList.toggle("tds-filter-tab--selected", on);
        btn.setAttribute("aria-selected", on ? "true" : "false");
      });

      signalsRoot.querySelectorAll("[data-v2-signal-row]").forEach(function (row) {
        var impact = row.getAttribute("data-v2-signal-impact");
        var show = next === "all" || impact === next;
        row.classList.toggle("is-filter-hidden", !show);
        row.hidden = !show;
        if (!show) {
          row.classList.remove("is-expanded");
          row.setAttribute("aria-expanded", "false");
          var toggle = row.querySelector("[data-v2-signal-toggle]");
          if (toggle) {
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Show signal details");
          }
        }
        var detail = row.nextElementSibling;
        if (detail && detail.hasAttribute("data-v2-signal-detail")) {
          var open = show && row.classList.contains("is-expanded");
          detail.classList.toggle("is-filter-hidden", !show);
          detail.hidden = !open;
        }
      });

      signalsRoot.querySelectorAll("[data-v2-signal-category]").forEach(function (cat) {
        var visible = 0;
        cat.querySelectorAll("[data-v2-signal-row]").forEach(function (row) {
          if (!row.classList.contains("is-filter-hidden") && !row.hidden) visible += 1;
        });
        var empty = cat.querySelector(".v2-signals__empty");
        if (empty) empty.hidden = visible > 0;
        cat.classList.toggle("is-filter-empty", visible === 0);
        if (visible > 0 && next !== "all") {
          cat.classList.add("tds-accordion--expanded");
          var header = cat.querySelector("[data-v2-signal-accordion]");
          if (header) header.setAttribute("aria-expanded", "true");
        }
      });
    }

    host.addEventListener("click", function (event) {
      var overviewChip = event.target.closest("[data-v2-overview-chip]");
      if (overviewChip) {
        var scope =
          overviewChip.closest(".v2-card__body") ||
          overviewChip.closest("[data-v2-expand-body]") ||
          overviewChip.closest(".v2-expand__scroll");
        if (scope) {
          setOverviewOption(scope, overviewChip.getAttribute("data-v2-overview-chip"));
        }
        return;
      }
      var ownershipViewBtn = event.target.closest("[data-v2-ownership-view]");
      if (ownershipViewBtn && expandBody && expandBody.contains(ownershipViewBtn)) {
        applyOwnershipView(ownershipViewBtn.getAttribute("data-v2-ownership-view"));
        return;
      }
      var signalFilter = event.target.closest("[data-v2-signal-filter]");
      if (signalFilter && expandBody && expandBody.contains(signalFilter)) {
        applySignalImpactFilter(
          signalFilter.getAttribute("data-v2-signal-filter") || "all",
          signalFilter
        );
        return;
      }
      var signalGoto = event.target.closest("[data-v2-signal-goto]");
      if (signalGoto && expandBody && expandBody.contains(signalGoto)) {
        focusSignalCategory(signalGoto.getAttribute("data-v2-signal-goto"));
        return;
      }
      var signalAccordion = event.target.closest("[data-v2-signal-accordion]");
      if (signalAccordion && expandBody && expandBody.contains(signalAccordion)) {
        var accordion = signalAccordion.closest("[data-v2-signal-category]");
        if (accordion) {
          var expanded = accordion.classList.toggle("tds-accordion--expanded");
          signalAccordion.setAttribute("aria-expanded", expanded ? "true" : "false");
        }
        return;
      }
      var signalRowClick = event.target.closest("[data-v2-signal-row]");
      if (signalRowClick && expandBody && expandBody.contains(signalRowClick)) {
        var detailRow = signalRowClick.nextElementSibling;
        if (detailRow && detailRow.hasAttribute("data-v2-signal-detail")) {
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
          detailRow.hidden = !openRow;
        }
        return;
      }
      var matchAccordion = event.target.closest("[data-v2-match-accordion]");
      if (matchAccordion && expandBody && expandBody.contains(matchAccordion)) {
        var matchSources = matchAccordion.closest("[data-v2-match-sources]");
        if (matchSources) {
          var matchOpen = matchSources.classList.toggle("tds-accordion--expanded");
          matchAccordion.setAttribute("aria-expanded", matchOpen ? "true" : "false");
        }
        return;
      }
      var matchRowClick = event.target.closest("[data-v2-match-row]");
      if (matchRowClick && expandBody && expandBody.contains(matchRowClick)) {
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
      var downloadBtn = event.target.closest("[data-v2-download]");
      if (downloadBtn) {
        downloadReport();
        return;
      }
      var openGraphBtn = event.target.closest("[data-v2-open-ownership-graph]");
      if (openGraphBtn) {
        openExpand("ownership", { ownershipView: "graph" });
        return;
      }
      var expandBtn = event.target.closest("[data-v2-expand-open]");
      if (expandBtn) {
        openExpand(expandBtn.getAttribute("data-v2-expand-open"));
        return;
      }
      var collapseBtn = event.target.closest("[data-v2-collapse]");
      if (collapseBtn) {
        closeExpand();
        return;
      }
      var expandGoto = event.target.closest("[data-v2-expand-goto]");
      if (expandGoto) {
        switchExpand(expandGoto.getAttribute("data-v2-expand-goto"));
        return;
      }
      var goto = event.target.closest("[data-v2-goto]");
      if (goto) {
        if (isExpanded()) {
          switchExpand(goto.getAttribute("data-v2-goto"));
        } else {
          setActive(goto.getAttribute("data-v2-goto"), { scroll: true, force: true });
        }
        return;
      }
      var askBtn = event.target.closest("[data-v2-ask]");
      if (askBtn && typeof onAsk === "function") {
        onAsk(
          askBtn.getAttribute("data-v2-ask"),
          isExpanded() ? expandedId : activeId
        );
      }
    });

    host.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isExpanded()) {
        event.preventDefault();
        closeExpand();
        return;
      }
      var signalRowKey =
        event.target.closest && event.target.closest("[data-v2-signal-row]");
      if (
        signalRowKey &&
        expandBody &&
        expandBody.contains(signalRowKey) &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        signalRowKey.click();
        return;
      }
      var matchRowKey =
        event.target.closest && event.target.closest("[data-v2-match-row]");
      if (
        matchRowKey &&
        expandBody &&
        expandBody.contains(matchRowKey) &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        matchRowKey.click();
        return;
      }
      var ownershipTab =
        event.target.closest && event.target.closest("[data-v2-ownership-view]");
      if (
        ownershipTab &&
        expandBody &&
        expandBody.contains(ownershipTab) &&
        (event.key === "ArrowLeft" ||
          event.key === "ArrowRight" ||
          event.key === "Home" ||
          event.key === "End")
      ) {
        var tabs = Array.prototype.slice.call(
          expandBody.querySelectorAll("[data-v2-ownership-view]")
        );
        var tabIdx = tabs.indexOf(ownershipTab);
        if (tabIdx < 0) return;
        var nextIdx = tabIdx;
        if (event.key === "ArrowRight") nextIdx = Math.min(tabs.length - 1, tabIdx + 1);
        else if (event.key === "ArrowLeft") nextIdx = Math.max(0, tabIdx - 1);
        else if (event.key === "Home") nextIdx = 0;
        else if (event.key === "End") nextIdx = tabs.length - 1;
        if (nextIdx !== tabIdx) {
          event.preventDefault();
          applyOwnershipView(tabs[nextIdx].getAttribute("data-v2-ownership-view"));
          tabs[nextIdx].focus();
        }
        return;
      }
      if (isExpanded()) {
        var idxExpand = EXPAND_ORDER.indexOf(expandedId || activeId);
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          if (idxExpand >= 0 && idxExpand < EXPAND_ORDER.length - 1) {
            switchExpand(EXPAND_ORDER[idxExpand + 1]);
          }
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          if (idxExpand > 0) switchExpand(EXPAND_ORDER[idxExpand - 1]);
        }
        return;
      }
      var progressDot = event.target.closest && event.target.closest(".v2-stack__dot");
      if (progressDot && host.contains(progressDot)) {
        var idxDot = CARD_ORDER.indexOf(progressDot.getAttribute("data-v2-goto"));
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          event.preventDefault();
          if (idxDot < CARD_ORDER.length - 1) {
            setActive(CARD_ORDER[idxDot + 1], { scroll: true, force: true });
            var nextDot = host.querySelector(
              '.v2-stack__progress [data-v2-goto="' + CARD_ORDER[idxDot + 1] + '"]'
            );
            if (nextDot) nextDot.focus();
          }
          return;
        }
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          event.preventDefault();
          if (idxDot > 0) {
            setActive(CARD_ORDER[idxDot - 1], { scroll: true, force: true });
            var prevDot = host.querySelector(
              '.v2-stack__progress [data-v2-goto="' + CARD_ORDER[idxDot - 1] + '"]'
            );
            if (prevDot) prevDot.focus();
          }
          return;
        }
        if (event.key === "Home") {
          event.preventDefault();
          setActive(CARD_ORDER[0], { scroll: true, force: true });
          var firstDot = host.querySelector(
            '.v2-stack__progress [data-v2-goto="' + CARD_ORDER[0] + '"]'
          );
          if (firstDot) firstDot.focus();
          return;
        }
        if (event.key === "End") {
          event.preventDefault();
          setActive(CARD_ORDER[CARD_ORDER.length - 1], { scroll: true, force: true });
          var lastDot = host.querySelector(
            '.v2-stack__progress [data-v2-goto="' +
              CARD_ORDER[CARD_ORDER.length - 1] +
              '"]'
          );
          if (lastDot) lastDot.focus();
          return;
        }
      }
      if (!scroller || document.activeElement !== scroller) return;
      var idx = CARD_ORDER.indexOf(activeId);
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        if (idx < CARD_ORDER.length - 1) {
          setActive(CARD_ORDER[idx + 1], { scroll: true, force: true });
        }
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        if (idx > 0) {
          setActive(CARD_ORDER[idx - 1], { scroll: true, force: true });
        }
      } else if (event.key === "Home") {
        event.preventDefault();
        setActive(CARD_ORDER[0], { scroll: true, force: true });
      } else if (event.key === "End") {
        event.preventDefault();
        setActive(CARD_ORDER[CARD_ORDER.length - 1], { scroll: true, force: true });
      } else if (event.key === "Enter") {
        event.preventDefault();
        openExpand(activeId);
      }
    });

    setActive(activeId, { force: true });
    updateStackFromScroll();
    mountOwnershipPreview();

    /* Raw Data / Export / New verification — same three as Demo 3. */
    var Actions = reportActions();
    if (Actions) {
      Actions.bind(host, {
        data: data,
        onExport: downloadReport,
        onNewVerification: function () {
          if (isExpanded()) closeExpand();
          setActive(CARD_ORDER[0], { scroll: true, force: true });
          if (options && typeof options.onNewVerification === "function") {
            options.onNewVerification();
          }
        }
      });
    }

    return {
      goToCard: function (id) {
        if (EXPAND_ORDER.indexOf(id) === -1) return;
        if (isExpanded()) {
          switchExpand(id);
          return;
        }
        if (CARD_ORDER.indexOf(id) !== -1) {
          setActive(id, { scroll: true, force: true });
          return;
        }
        openExpand(id);
      },
      expandCard: openExpand,
      collapseExpand: closeExpand,
      getActiveCard: function () {
        return isExpanded() ? expandedId : activeId;
      },
      getMode: function () {
        return mode;
      },
      getCardIds: function () {
        return CARD_ORDER.slice();
      },
      getExpandIds: function () {
        return EXPAND_ORDER.slice();
      },
      destroy: function () {
        clearOwnershipGraph();
        unmountUboGraph(ownershipPreviewHost());
        if (scroller) {
          scroller.removeEventListener("scroll", onScroll);
          scroller.removeEventListener("wheel", onWheel);
        }
        if (resizeObserver) resizeObserver.disconnect();
        global.removeEventListener("resize", onResize);
        host.innerHTML = "";
      }
    };
  }

  global.VerificationReportV2 = {
    mount: function (host, options) {
      return createController(host, options || {});
    },
    cardIds: CARD_ORDER.slice(),
    cardLabels: Object.assign({}, CARD_LABELS)
  };
})(typeof window !== "undefined" ? window : globalThis);
