/**
 * KYB Results — demo-only UI interactions (static reference page).
 */
(function () {
  "use strict";

  function toggleAccordion(header) {
    var accordion = header.closest(".tds-accordion");
    if (!accordion || accordion.classList.contains("tds-accordion--disabled")) return;
    var expanded = header.getAttribute("aria-expanded") === "true";
    header.setAttribute("aria-expanded", expanded ? "false" : "true");
    accordion.classList.toggle("tds-accordion--expanded", !expanded);
    var content = accordion.querySelector(".tds-accordion__content");
    if (content) content.hidden = expanded;
  }

  function initAccordions(root) {
    (root || document).querySelectorAll(".tds-accordion__header").forEach(function (header) {
      if (header.dataset.kybBound) return;
      header.dataset.kybBound = "1";
      header.addEventListener("click", function () {
        toggleAccordion(header);
      });
    });
  }

  function initSidebarToggle() {
    var columns = document.getElementById("kyb-columns");
    if (!columns) return;

    columns.querySelectorAll(".dv-sidebar-toggle--collapse").forEach(function (btn) {
      btn.addEventListener("click", function () {
        columns.classList.add("dv-columns--sidebar-collapsed");
        btn.setAttribute("aria-expanded", "false");
      });
    });

    columns.querySelectorAll(".dv-sidebar-toggle--expand").forEach(function (btn) {
      btn.addEventListener("click", function () {
        columns.classList.remove("dv-columns--sidebar-collapsed");
        var collapseBtn = columns.querySelector(".dv-sidebar-toggle--collapse");
        if (collapseBtn) collapseBtn.setAttribute("aria-expanded", "true");
        btn.setAttribute("aria-expanded", "true");
      });
    });
  }

  function initRawCopy() {
    var btn = document.getElementById("kyb-raw-copy");
    var pre = document.getElementById("kyb-raw-pre");
    if (!btn || !pre) return;
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(pre.textContent || "").catch(function () {});
    });
  }

  function setAccordionExpanded(accordion, expanded) {
    var header = accordion.querySelector(".tds-accordion__header");
    var content = accordion.querySelector(".tds-accordion__content");
    if (!header || !content) return;
    header.setAttribute("aria-expanded", expanded ? "true" : "false");
    accordion.classList.toggle("tds-accordion--expanded", expanded);
    content.hidden = !expanded;
  }

  function openSignalCategory(categoryId) {
    setActiveTab("signals");

    document.querySelectorAll(".kyb-signal-category[data-kyb-signal-category]").forEach(function (accordion) {
      var isTarget = accordion.getAttribute("data-kyb-signal-category") === categoryId;
      setAccordionExpanded(accordion, isTarget);
    });

    var target = document.querySelector('.kyb-signal-category[data-kyb-signal-category="' + categoryId + '"]');
    if (!target) return;

    window.requestAnimationFrame(function () {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function initRiskCategoryCards() {
    document.querySelectorAll(".kyb-risk-category-card[data-kyb-signal-category]").forEach(function (card) {
      if (card.dataset.kybBound) return;
      card.dataset.kybBound = "1";

      card.addEventListener("click", function () {
        openSignalCategory(card.getAttribute("data-kyb-signal-category"));
      });
    });
  }

  function initScoreBreakdownLink() {
    document.querySelectorAll("[data-kyb-jump-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setActiveTab(btn.getAttribute("data-kyb-jump-tab") || "signals");
      });
    });
  }

  function setActiveTab(tabId) {
    var shell = document.querySelector(".kyb-panel");
    if (!shell) return;

    shell.setAttribute("data-active-tab", tabId);

    shell.querySelectorAll(".kyb-section[data-kyb-tab]").forEach(function (section) {
      section.hidden = section.getAttribute("data-kyb-tab") !== tabId;
    });

    shell.querySelectorAll(".tds-tab-item[data-kyb-tab]").forEach(function (tab) {
      var isActive = tab.getAttribute("data-kyb-tab") === tabId;
      tab.classList.toggle("tds-tab-item--active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      if (isActive) {
        tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      }
    });
  }

  function initTabs() {
    var shell = document.querySelector(".kyb-panel");
    if (!shell) return;

    shell.querySelectorAll(".tds-tab-item[data-kyb-tab]").forEach(function (tab) {
      tab.addEventListener("click", function () {
        setActiveTab(tab.getAttribute("data-kyb-tab"));
      });
    });

    setActiveTab(shell.getAttribute("data-active-tab") || "ownership");
  }

  function initTabsScroll() {
    document.querySelectorAll(".tds-tabs:has(.tds-tabs__overflow-btn), [data-tabs-scrollable]").forEach(function (tabs) {
      var list = tabs.querySelector(".tds-tabs__list");
      var leftBtn = tabs.querySelector('[data-tabs-scroll="left"]');
      var rightBtn = tabs.querySelector('[data-tabs-scroll="right"]');
      if (!list || !leftBtn || !rightBtn) return;

      function updateOverflowButtons() {
        var canScrollLeft = list.scrollLeft > 1;
        var canScrollRight = list.scrollLeft + list.clientWidth < list.scrollWidth - 1;
        leftBtn.classList.toggle("tds-tabs__overflow-btn--visible", canScrollLeft);
        rightBtn.classList.toggle("tds-tabs__overflow-btn--visible", canScrollRight);
        leftBtn.tabIndex = canScrollLeft ? 0 : -1;
        rightBtn.tabIndex = canScrollRight ? 0 : -1;
      }

      function scrollTabs(direction) {
        list.scrollBy({
          left: direction === "left" ? -list.clientWidth * 0.6 : list.clientWidth * 0.6,
          behavior: "smooth",
        });
      }

      leftBtn.addEventListener("click", function () {
        scrollTabs("left");
      });
      rightBtn.addEventListener("click", function () {
        scrollTabs("right");
      });
      list.addEventListener("scroll", updateOverflowButtons, { passive: true });
      window.addEventListener("resize", updateOverflowButtons);
      if (typeof ResizeObserver !== "undefined") {
        new ResizeObserver(updateOverflowButtons).observe(list);
      }
      updateOverflowButtons();
    });
  }

  function initSignalRows() {
    document.querySelectorAll("[data-kyb-signal-row]").forEach(function (row) {
      if (row.dataset.kybBound) return;
      row.dataset.kybBound = "1";

      var toggle = row.querySelector(".kyb-signal-row__toggle");
      var details = row.nextElementSibling;
      if (!toggle || !details || !details.classList.contains("kyb-signal-detail-row")) return;

      function setExpanded(expanded) {
        row.classList.toggle("kyb-signal-row--expanded", expanded);
        toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
        details.hidden = !expanded;
      }

      row.addEventListener("click", function (event) {
        if (event.target.closest("a, button")) return;
        setExpanded(!row.classList.contains("kyb-signal-row--expanded"));
      });

      toggle.addEventListener("click", function (event) {
        event.stopPropagation();
        setExpanded(!row.classList.contains("kyb-signal-row--expanded"));
      });
    });
  }

  function kybRiskFromScore(score) {
    if (score < 30) return { risk: "low", label: "Low Risk" };
    if (score <= 60) return { risk: "medium", label: "Medium Risk" };
    return { risk: "high", label: "High Risk" };
  }

  var DEFAULT_COMPANY_NAME = "Meridian Apex Consulting Ltd.";
  var DEFAULT_COMPANY_ALT = "Meridian Apex Consulting Limited";
  var DEFAULT_DOMAIN = "meridianapexconsulting.co.uk";

  var ENTITY_PROFILES = {
    standard: {
      score: 28,
      riskLevel: "Low",
      summary: "{name} shows clean US registry records and straightforward ownership with no elevated risk signals detected.",
      insightsSummary: "{name} is an active US services company with verified registration, stable operating history, and baseline risk indicators within normal onboarding thresholds.",
      overallRisk: 28,
      registryMatch: 94,
      operationalFootprint: 72,
      entityType: "Corporation",
      industry: "Business services",
      employees: "45",
      parentEntity: "None identified",
      signalCount: "12",
      ownershipRows: [
        { name: "Sarah Chen", role: "Chief Executive Officer", pct: "100%", status: "Verified", statusTone: "positive" },
      ],
      directorName: "Sarah Chen",
      directorDate: "18 Jun 2018",
      officerNote: "Beneficial owner verified through US state registry filings.",
      officerTone: "positive",
    },
    complex: {
      score: 72,
      riskLevel: "Medium",
      summary: "{name} resolves through nested corporate layers across multiple jurisdictions with inferred offshore ownership links.",
      insightsSummary: "{name} operates through a multi-layer holding structure with cross-border subsidiaries. Ownership tracing surfaced inferred UBOs and limited transparency across intermediate entities.",
      overallRisk: 72,
      registryMatch: 88,
      operationalFootprint: 41,
      entityType: "Private limited",
      industry: "Holding company",
      employees: "12",
      parentEntity: "Helix Meridian Holdings BVI Ltd.",
      signalCount: "31",
      ownershipRows: [
        { name: "Helix Meridian Holdings BVI Ltd.", role: "Parent company", pct: "100%", status: "Inferred", statusTone: "intermediate" },
        { name: "David Okonkwo", role: "Director", pct: "—", status: "Verified", statusTone: "positive" },
      ],
      directorName: "David Okonkwo",
      directorDate: "04 Nov 2020",
      officerNote: "Beneficial owner could not be independently verified from registry sources.",
      officerTone: "warning",
    },
    elevated: {
      score: 81,
      riskLevel: "High",
      summary: "{name} returned elevated AML signals including adverse media indicators and high-risk jurisdiction exposure.",
      insightsSummary: "{name} shows elevated AML and adverse media signals alongside cross-border trading activity. Enhanced screening and ongoing monitoring are recommended before onboarding.",
      overallRisk: 81,
      registryMatch: 86,
      operationalFootprint: 36,
      entityType: "Private limited",
      industry: "Cross-border trading",
      employees: "8",
      parentEntity: "Vantage Pacific Holdings Pte Ltd.",
      signalCount: "38",
      ownershipRows: [
        { name: "Vantage Pacific Holdings Pte Ltd.", role: "Parent company", pct: "100%", status: "Inferred", statusTone: "intermediate" },
        { name: "Mei Lin Tan", role: "Director", pct: "—", status: "Verified", statusTone: "positive" },
      ],
      directorName: "Mei Lin Tan",
      directorDate: "22 Sep 2021",
      officerNote: "Elevated AML and adverse media signals require enhanced due diligence before onboarding.",
      officerTone: "warning",
    },
    default: {
      score: 55,
      riskLevel: "Medium",
      summary: "{name} is an active registered entity with mixed registry signals. Ownership and operational footprint require further review.",
      insightsSummary: "{name} is an active registered entity with available registry data. Additional review of ownership structure and operating footprint is recommended.",
      overallRisk: 55,
      registryMatch: 90,
      operationalFootprint: 48,
      entityType: "Registered business",
      industry: "Not classified",
      employees: "—",
      parentEntity: "Under review",
      signalCount: "24",
      ownershipRows: [
        { name: "Registry parent entity", role: "Parent company", pct: "100%", status: "Inferred", statusTone: "intermediate" },
        { name: "Registered director", role: "Director", pct: "—", status: "Verified", statusTone: "positive" },
      ],
      directorName: "Registered director",
      directorDate: "Under review",
      officerNote: "Additional ownership review recommended based on available registry data.",
      officerTone: "warning",
    },
  };

  function getHomeUrl() {
    try {
      var stored = sessionStorage.getItem("kybHomeUrl");
      if (stored) return stored;
    } catch (e) {
      /* ignore */
    }

    try {
      return new URL("../unified-intelligence-home/index.html", window.location.href).href;
    } catch (e) {
      return "../unified-intelligence-home/index.html";
    }
  }

  function initHomeNavigation() {
    var homeUrl = getHomeUrl();

    document.querySelectorAll(".tds-side-nav__brand").forEach(function (el) {
      el.addEventListener("click", function () {
        window.location.href = homeUrl;
      });
    });

    document.querySelectorAll(".tds-side-nav__nav-item").forEach(function (item) {
      var label = item.querySelector(".tds-side-nav__nav-item-text");
      if (!label || label.textContent.trim() !== "Home") return;
      item.addEventListener("click", function () {
        window.location.href = homeUrl;
      });
    });

    document.querySelectorAll('.tds-side-nav__icon-button[aria-label="Home"]').forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.location.href = homeUrl;
      });
    });
  }

  function parseEntityContext() {
    var params = new URLSearchParams(window.location.search);
    var name = params.get("name");

    if (name) {
      return {
        name: name,
        country: params.get("country") || "",
        countryCode: (params.get("countryCode") || "gb").toLowerCase(),
        brn: params.get("brn") || "",
        sample: params.get("sample") || "",
        address1: params.get("address1") || "",
        city: params.get("city") || "",
        state: params.get("state") || "",
        postal: params.get("postal") || "",
      };
    }

    try {
      var stored = sessionStorage.getItem("kybEntity");
      if (stored) {
        var parsed = JSON.parse(stored);
        if (parsed && parsed.name) return parsed;
      }
    } catch (e) {
      /* ignore malformed session payload */
    }

    return null;
  }

  function fillTemplate(template, entity) {
    return template.replace(/\{name\}/g, entity.name);
  }

  function slugifyDomain(name) {
    return name
      .toLowerCase()
      .replace(/\.(inc\.|ltd\.|pte ltd\.|llc|gmbh|bv)/g, "")
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 28);
  }

  function replaceTextInRoot(root, replacements) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      if (!node.nodeValue) return;
      replacements.forEach(function (pair) {
        if (node.nodeValue.indexOf(pair.from) >= 0) {
          node.nodeValue = node.nodeValue.split(pair.from).join(pair.to);
        }
      });
    });
  }

  function formatRegisteredAddress(entity) {
    if (!entity.address1) return null;
    var parts = [entity.address1];
    var cityLine = [entity.city, entity.state, entity.postal].filter(Boolean).join(", ");
    if (cityLine) parts.push(cityLine);
    return parts.join(", ");
  }

  function setFieldValue(root, label, value) {
    if (!value) return;
    (root || document).querySelectorAll(".tds-data-field").forEach(function (field) {
      var fieldLabel = field.querySelector(".tds-data-field__label");
      if (!fieldLabel || fieldLabel.textContent.trim() !== label) return;
      var valueEl = field.querySelector(".tds-data-field__value");
      if (valueEl) valueEl.textContent = value;
    });
  }

  function setMiniScoreCard(label, value) {
    document.querySelectorAll(".kyb-score-card-mini").forEach(function (card) {
      var cardLabel = card.querySelector(".kyb-score-card-mini__label");
      if (!cardLabel || cardLabel.textContent.trim() !== label) return;
      var valueEl = card.querySelector(".kyb-score-card-mini__value");
      if (valueEl) valueEl.textContent = String(value);
    });
  }

  function renderOwnershipTable(rows) {
    var tbody = document.querySelector(".kyb-ownership-table tbody");
    if (!tbody || !rows || !rows.length) return;

    tbody.innerHTML = rows
      .map(function (row) {
        return (
          "<tr>" +
            '<td class="tds-data-table__text-cell">' + row.name + "</td>" +
            '<td class="tds-data-table__text-cell">' + row.role + "</td>" +
            '<td class="tds-data-table__text-cell" data-align="right">' + row.pct + "</td>" +
            '<td class="tds-data-table__text-cell" data-align="right"><span class="tds-data-table__label-cell"><span class="tds-tag tds-tag--md tds-tag--' +
            row.statusTone +
            '">' +
            row.status +
            "</span></span></td>" +
          "</tr>"
        );
      })
      .join("");
  }

  function updateOfficerBlock(profile) {
    if (profile.directorName) setFieldValue(document, "Director name", profile.directorName);
    if (profile.directorDate) setFieldValue(document, "Appointment date", profile.directorDate);

    var announcement = document.querySelector(".kyb-officer-block .tds-announcement");
    var message = document.querySelector(".kyb-officer-block .tds-announcement__message");
    if (announcement && message && profile.officerNote) {
      message.textContent = profile.officerNote;
      announcement.classList.remove("tds-announcement--warning", "tds-announcement--positive");
      announcement.classList.add(profile.officerTone === "positive" ? "tds-announcement--positive" : "tds-announcement--warning");
    }
  }

  function applyEntityContext() {
    var entity = parseEntityContext();
    if (!entity) return null;

    var profile = ENTITY_PROFILES[entity.sample] || ENTITY_PROFILES.default;
    var summary = fillTemplate(profile.summary, entity);
    var insightsSummary = fillTemplate(profile.insightsSummary, entity);
    var address = formatRegisteredAddress(entity);
    var domainSlug = slugifyDomain(entity.name);
    var domain = domainSlug ? domainSlug + ".com" : DEFAULT_DOMAIN;

    replaceTextInRoot(document.querySelector(".app-main"), [
      { from: DEFAULT_COMPANY_NAME, to: entity.name },
      { from: DEFAULT_COMPANY_ALT, to: entity.name.replace(/\.$/, "") },
      { from: DEFAULT_DOMAIN, to: domain },
      { from: "info@" + DEFAULT_DOMAIN, to: "info@" + domain },
    ]);

    var title = document.querySelector(".dv-title");
    if (title) title.textContent = entity.name;

    document.querySelectorAll(".kyb-insights-intro__name").forEach(function (el) {
      el.textContent = entity.name;
    });

    if (entity.country) {
      setFieldValue(document.getElementById("kyb-identity"), "Country / Jurisdiction", entity.country);
      var flag = document.querySelector("#kyb-identity .fi");
      if (flag) flag.className = "fi fi-" + entity.countryCode;
    }

    if (entity.brn) setFieldValue(document.getElementById("kyb-identity"), "Company Number", entity.brn);

    var txId = "KYB-2026-" + String(Math.floor(Math.random() * 900000 + 100000));
    setFieldValue(document.getElementById("kyb-identity"), "Transaction ID", txId);
    setFieldValue(
      document.getElementById("kyb-identity"),
      "Date",
      new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date())
    );

    var sidebarSummary = document.querySelector(".kyb-sidebar-accordion .tds-accordion__body");
    if (sidebarSummary) sidebarSummary.textContent = summary;

    var insightsSummaryEl = document.querySelector(".kyb-insights-summary");
    if (insightsSummaryEl) insightsSummaryEl.textContent = insightsSummary;

    if (address) setFieldValue(document, "Registered address", address);

    if (profile.entityType) setFieldValue(document, "Entity type", profile.entityType);
    if (profile.industry) setFieldValue(document, "Industry", profile.industry);
    if (profile.employees) setFieldValue(document, "Employees", profile.employees);
    if (profile.parentEntity) setFieldValue(document, "Parent entity", profile.parentEntity);

    setMiniScoreCard("Overall risk", profile.overallRisk);
    setMiniScoreCard("Registry match", profile.registryMatch);
    setMiniScoreCard("Operational footprint", profile.operationalFootprint);

    renderOwnershipTable(profile.ownershipRows);
    updateOfficerBlock(profile);

    document.querySelectorAll(".tds-counter-label__count, .kyb-toolbar .tds-counter-label__count").forEach(function (el) {
      if (profile.signalCount) el.textContent = profile.signalCount;
    });

    var gauge = document.querySelector(".kyb-score-card .dv-di-gauge[data-score]");
    if (gauge) gauge.setAttribute("data-score", String(profile.score));

    var rawPre = document.getElementById("kyb-raw-pre");
    if (rawPre) {
      try {
        var rawData = JSON.parse(rawPre.textContent);
        rawData.StandardizedBusinessNames.StandardizedBusinessName[0].Name = entity.name;
        rawData.StandardizedBusinessNames.StandardizedBusinessName[1].Name = entity.name.replace(/\.$/, "");
        if (rawData.StandardizedCommunication && rawData.StandardizedCommunication.StandardizedCommunication) {
          rawData.StandardizedCommunication.StandardizedCommunication.forEach(function (item) {
            if (item.Type === "Primary business email") item.Value = "info@" + domain;
          });
        }
        rawData.MatchScore = profile.score;
        rawData.RiskLevel = profile.riskLevel;
        rawPre.textContent = JSON.stringify(rawData, null, 2);
      } catch (e) {
        /* ignore malformed demo JSON */
      }
    }

    document.body.setAttribute("data-kyb-entity-applied", entity.sample || "custom");
    document.body.setAttribute("data-kyb-entity-name", entity.name);
    return entity;
  }

  function initKybScoreGauge() {
    document.querySelectorAll(".kyb-score-card .dv-di-gauge[data-score]").forEach(function (el) {
      var score = parseFloat(el.getAttribute("data-score") || "0");
      var tier = kybRiskFromScore(score);
      el.setAttribute("data-risk", tier.risk);
      el.setAttribute("data-label", tier.label);
      el.setAttribute("data-show-percent", "false");
    });
  }

  function init() {
    initHomeNavigation();
    applyEntityContext();
    initTabs();
    initTabsScroll();
    initAccordions(document);
    initSignalRows();
    initRiskCategoryCards();
    initSidebarToggle();
    initScoreBreakdownLink();
    initRawCopy();
    initKybScoreGauge();
    if (window.ScoreGauge) ScoreGauge.renderAll(document);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.toggleAccordion = toggleAccordion;
})();
