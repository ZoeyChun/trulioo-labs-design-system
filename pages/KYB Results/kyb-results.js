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

    document.querySelectorAll(".tds-risk-category-strip-card[data-kyb-signal-category]").forEach(function (card) {
      var isTarget = card.getAttribute("data-kyb-signal-category") === categoryId;
      card.classList.toggle("tds-risk-category-strip-card--selected", isTarget);
      if (isTarget) {
        card.setAttribute("aria-current", "true");
      } else {
        card.removeAttribute("aria-current");
      }
    });

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
    document.querySelectorAll("[data-kyb-signal-category].kyb-risk-category-card, [data-kyb-signal-category].kyb-signal-category-card").forEach(function (card) {
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

    setActiveTab(shell.getAttribute("data-active-tab") || "signals");
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

  var SIGNAL_IMPACT_SEVERITY = { positive: 0, neutral: 1, negative: 2 };
  var SIGNAL_APPLICABLE_ORDER = { yes: 0, no: 1, unknown: 2 };
  var SIGNAL_DATA_ORDER = { present: 0, missing: 1 };
  var SIGNALS_DEFAULT_SORT = "impact-low-high";
  var MONITORING_DEFAULT_SORT = "date-newest";

  function createDefaultSignalFilters() {
    return {
      applicable: { yes: true, no: true },
      data: { present: true, missing: true },
      categories: {
        "business-model": true,
        "financial-health": true,
        "fraud-financial-crimes": true,
        "governance-compliance": true,
        "third-party-market": true,
      },
    };
  }

  function getSelectedSignalFilterLabels(section) {
    var labels = [];
    var panel = section.querySelector("[data-kyb-signals-filter] .tds-dropdown-panel");
    if (!panel) return labels;

    var currentGroup = "";
    Array.from(panel.children).forEach(function (child) {
      if (child.classList.contains("tds-dropdown-panel__header")) {
        currentGroup = child.textContent.trim();
        return;
      }
      if (child.classList.contains("tds-dropdown-panel__divider")) return;
      if (!child.classList.contains("tds-action-list-item")) return;

      var input = child.querySelector("input[type='checkbox']");
      if (!input || !input.checked) return;

      var optionNode = child.querySelector("span");
      var optionText = optionNode ? optionNode.textContent.trim() : "";
      if (!optionText) return;

      labels.push(currentGroup ? currentGroup + ": " + optionText : optionText);
    });

    return labels;
  }

  function isDefaultSignalFilters(section) {
    var isDefault = true;
    section.querySelectorAll("[data-kyb-filter-applicable], [data-kyb-filter-data], [data-kyb-filter-category]").forEach(function (input) {
      if (!input.checked) isDefault = false;
    });
    return isDefault;
  }

  function resetSignalFilters(section, state) {
    state.filters = createDefaultSignalFilters();
    section.querySelectorAll("[data-kyb-filter-applicable], [data-kyb-filter-data], [data-kyb-filter-category]").forEach(function (input) {
      input.checked = true;
    });
  }

  function resetSignalSort(section, state) {
    state.sort = SIGNALS_DEFAULT_SORT;
    state.sortActive = false;
    section.querySelectorAll("[data-kyb-signal-sort]").forEach(function (item) {
      var isDefault = item.hasAttribute("data-tds-sort-default");
      item.classList.toggle("tds-action-list-item--selected", isDefault);
      item.setAttribute("aria-checked", isDefault ? "true" : "false");
    });
  }

  function updateSignalsToolbarControls(section, state) {
    var filterButton = section.querySelector("[data-kyb-signals-filter]");
    if (filterButton) {
      var isDefault = isDefaultSignalFilters(section);
      var selectedLabels = isDefault ? [] : getSelectedSignalFilterLabels(section);
      var selectedCount = selectedLabels.length;
      var hasActiveFilters = !isDefault && selectedCount > 0;

      filterButton.classList.toggle("tds-filter-button--selected", hasActiveFilters);
      filterButton.classList.toggle("tds-filter-button--multi", hasActiveFilters && selectedCount > 1);

      var valueLabel = filterButton.querySelector("[data-kyb-filter-value]");
      if (valueLabel) valueLabel.textContent = hasActiveFilters ? selectedLabels[0] : "";

      var counter = filterButton.querySelector("[data-kyb-filter-count]");
      if (counter) {
        counter.textContent = hasActiveFilters && selectedCount > 1 ? "+" + (selectedCount - 1) : "";
      }
    }

    var sortButton = section.querySelector("[data-kyb-signals-sort]");
    if (sortButton) {
      sortButton.classList.toggle("tds-sort-button--selected", state.sortActive);

      var selectedOption = section.querySelector(
        '[data-kyb-signal-sort="' + state.sort + '"] .tds-action-list-item__label'
      );
      var sortLabel = sortButton.querySelector("[data-kyb-sort-label]");
      if (sortLabel) {
        sortLabel.textContent =
          state.sortActive && selectedOption ? selectedOption.textContent.trim() : "";
      }

      section.querySelectorAll("[data-kyb-signal-sort]").forEach(function (item) {
        var selected = state.sortActive && item.getAttribute("data-kyb-signal-sort") === state.sort;
        item.classList.toggle("tds-action-list-item--selected", selected);
        item.setAttribute("aria-checked", selected ? "true" : "false");
      });
    }
  }

  function getSignalImpact(row) {
    var tag = row.querySelector(".tds-tag");
    if (!tag) return "neutral";
    if (tag.classList.contains("tds-tag--negative")) return "negative";
    if (tag.classList.contains("tds-tag--positive")) return "positive";
    return "neutral";
  }

  function getSignalApplicable(row) {
    var cells = row.cells;
    if (!cells || cells.length < 3) return "unknown";
    var text = (cells[2].textContent || "").trim().toLowerCase();
    if (text.indexOf("yes") !== -1) return "yes";
    if (text.indexOf("no") !== -1) return "no";
    return "unknown";
  }

  function getSignalDataStatus(row) {
    var cells = row.cells;
    if (!cells || cells.length < 4) return "missing";
    var text = (cells[3].textContent || "").trim().toLowerCase();
    if (text.indexOf("present") !== -1) return "present";
    return "missing";
  }

  function isCategoryFilterVisible(categoryId, filters) {
    return filters.categories[categoryId] !== false;
  }

  function getCategorySortLabel(accordion) {
    var title = accordion.querySelector(".tds-accordion__title");
    return title ? title.textContent.trim().toLowerCase() : "";
  }

  function rowMatchesSignalFilters(row, state) {
    var applicable = getSignalApplicable(row);
    if (applicable === "yes" && !state.filters.applicable.yes) return false;
    if (applicable === "no" && !state.filters.applicable.no) return false;

    var dataStatus = getSignalDataStatus(row);
    if (dataStatus === "present" && !state.filters.data.present) return false;
    if (dataStatus === "missing" && !state.filters.data.missing) return false;

    return true;
  }

  function rowMatchesImpactFilter(row, impactFilter) {
    if (impactFilter === "all") return true;
    return row.getAttribute("data-kyb-signal-impact") === impactFilter;
  }

  function getSignalRowPairs(tbody) {
    var pairs = [];
    tbody.querySelectorAll("[data-kyb-signal-row]").forEach(function (row) {
      var detail = row.nextElementSibling;
      if (!detail || !detail.classList.contains("kyb-signal-detail-row")) return;
      pairs.push({ row: row, detail: detail });
    });
    return pairs;
  }

  function collapseSignalRow(pair) {
    pair.row.classList.remove("kyb-signal-row--expanded");
    var toggle = pair.row.querySelector(".kyb-signal-row__toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    pair.detail.hidden = true;
  }

  function getCategoryRiskDomainLabel(categoryId) {
    var accordion = document.querySelector(
      '.kyb-signal-category[data-kyb-signal-category="' + categoryId + '"]'
    );
    return getCategorySortLabel(accordion || document.createElement("div"));
  }

  function compareByOrder(valueA, valueB, ascending) {
    if (valueA === valueB) return 0;
    return ascending ? valueA - valueB : valueB - valueA;
  }

  function sortSignalPairs(pairs, sortKey) {
    pairs.sort(function (a, b) {
      var fallback =
        (parseInt(a.row.getAttribute("data-kyb-signal-order"), 10) || 0) -
        (parseInt(b.row.getAttribute("data-kyb-signal-order"), 10) || 0);

      if (sortKey === "category-asc" || sortKey === "category-desc") {
        return fallback;
      }

      if (sortKey === "impact-low-high" || sortKey === "impact-high-low") {
        var impactA = SIGNAL_IMPACT_SEVERITY[a.row.getAttribute("data-kyb-signal-impact") || "neutral"];
        var impactB = SIGNAL_IMPACT_SEVERITY[b.row.getAttribute("data-kyb-signal-impact") || "neutral"];
        return compareByOrder(impactA, impactB, sortKey === "impact-low-high") || fallback;
      }

      if (sortKey === "applicable-yes-no" || sortKey === "applicable-no-yes") {
        var applicableA = SIGNAL_APPLICABLE_ORDER[getSignalApplicable(a.row)];
        var applicableB = SIGNAL_APPLICABLE_ORDER[getSignalApplicable(b.row)];
        return compareByOrder(applicableA, applicableB, sortKey === "applicable-yes-no") || fallback;
      }

      if (sortKey === "data-present-missing" || sortKey === "data-missing-present") {
        var dataA = SIGNAL_DATA_ORDER[getSignalDataStatus(a.row)];
        var dataB = SIGNAL_DATA_ORDER[getSignalDataStatus(b.row)];
        return compareByOrder(dataA, dataB, sortKey === "data-present-missing") || fallback;
      }

      return fallback;
    });
  }

  function updateSignalImpactCounts(section) {
    var counts = { all: 0, negative: 0, positive: 0, neutral: 0 };
    section.querySelectorAll("[data-kyb-signal-row]").forEach(function (row) {
      var impact = row.getAttribute("data-kyb-signal-impact") || getSignalImpact(row);
      row.setAttribute("data-kyb-signal-impact", impact);
      counts.all += 1;
      if (counts[impact] !== undefined) counts[impact] += 1;
    });

    section.querySelectorAll("[data-kyb-impact-count]").forEach(function (counter) {
      var key = counter.getAttribute("data-kyb-impact-count");
      if (counts[key] !== undefined) counter.textContent = String(counts[key]);
    });
  }

  function updateSignalCategoryEmptyState(accordion, visibleCount) {
    var content = accordion.querySelector(".tds-accordion__content");
    if (!content) return;

    var tableContainer = content.querySelector(".tds-data-table-container");
    var empty = content.querySelector(".kyb-signal-category__empty");

    if (visibleCount === 0) {
      if (tableContainer) tableContainer.hidden = true;
      if (!empty) {
        empty = document.createElement("p");
        empty.className = "kyb-signal-category__empty";
        empty.textContent = "No signals match this filter";
        content.appendChild(empty);
      }
      empty.hidden = false;
      return;
    }

    if (tableContainer) tableContainer.hidden = false;
    if (empty) empty.hidden = true;
  }

  function applySignalsView(section, state) {
    var container = section.querySelector(".kyb-signal-categories");
    if (!container) return;

    var categoryEntries = [];

    section.querySelectorAll(".kyb-signal-category[data-kyb-signal-category]").forEach(function (accordion) {
      var categoryId = accordion.getAttribute("data-kyb-signal-category");
      var categoryOrder = parseInt(accordion.getAttribute("data-kyb-category-order"), 10) || 0;
      var domainVisible = isCategoryFilterVisible(categoryId, state.filters);
      var tbody = accordion.querySelector("tbody");
      var visibleCount = 0;

      if (!domainVisible || !tbody) {
        accordion.hidden = true;
        categoryEntries.push({
          accordion: accordion,
          categoryOrder: categoryOrder,
          categoryId: categoryId,
          visibleCount: 0,
        });
        return;
      }

      accordion.hidden = false;

      var pairs = getSignalRowPairs(tbody);
      sortSignalPairs(pairs, state.sort);

      pairs.forEach(function (pair) {
        var visible =
          rowMatchesImpactFilter(pair.row, state.impactFilter) &&
          rowMatchesSignalFilters(pair.row, state);

        pair.row.hidden = !visible;
        if (!visible) {
          collapseSignalRow(pair);
        } else {
          visibleCount += 1;
          if (!pair.row.classList.contains("kyb-signal-row--expanded")) {
            pair.detail.hidden = true;
          }
        }

        tbody.appendChild(pair.row);
        tbody.appendChild(pair.detail);
      });

      updateSignalCategoryEmptyState(accordion, visibleCount);
      categoryEntries.push({
        accordion: accordion,
        categoryOrder: categoryOrder,
        categoryId: categoryId,
        visibleCount: visibleCount,
      });
    });

    categoryEntries.sort(function (a, b) {
      if (state.impactFilter !== "all") {
        var aHasMatches = a.visibleCount > 0;
        var bHasMatches = b.visibleCount > 0;
        if (aHasMatches !== bHasMatches) {
          return aHasMatches ? -1 : 1;
        }
      }

      if (state.sort === "category-asc" || state.sort === "category-desc") {
        var labelA = getCategoryRiskDomainLabel(a.categoryId);
        var labelB = getCategoryRiskDomainLabel(b.categoryId);
        var domainCmp = labelA.localeCompare(labelB);
        if (domainCmp !== 0) {
          return state.sort === "category-desc" ? -domainCmp : domainCmp;
        }
      }

      return a.categoryOrder - b.categoryOrder;
    });

    categoryEntries.forEach(function (entry) {
      container.appendChild(entry.accordion);
    });

    updateSignalsToolbarControls(section, state);
  }

  function setSelectedImpactTab(section, activeTab) {
    section.querySelectorAll("[data-kyb-impact-filter]").forEach(function (tab) {
      var isActive = tab === activeTab;
      tab.classList.toggle("tds-filter-tab--selected", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function initSignalsToolbar() {
    var section = document.getElementById("kyb-signals");
    if (!section) return;

    var state = {
      impactFilter: "all",
      sort: SIGNALS_DEFAULT_SORT,
      sortActive: false,
      filters: createDefaultSignalFilters(),
    };

    var categoryOrder = 0;
    section.querySelectorAll(".kyb-signal-category[data-kyb-signal-category]").forEach(function (accordion) {
      accordion.setAttribute("data-kyb-category-order", String(categoryOrder++));
    });

    var order = 0;
    section.querySelectorAll("[data-kyb-signal-row]").forEach(function (row) {
      row.setAttribute("data-kyb-signal-order", String(order++));
    });

    updateSignalImpactCounts(section);
    applySignalsView(section, state);

    section.querySelectorAll("[data-kyb-impact-filter]").forEach(function (tab) {
      if (tab.dataset.kybBound) return;
      tab.dataset.kybBound = "1";
      tab.addEventListener("click", function () {
        state.impactFilter = tab.getAttribute("data-kyb-impact-filter") || "all";
        setSelectedImpactTab(section, tab);
        applySignalsView(section, state);
      });
    });

    section.querySelectorAll("[data-kyb-filter-applicable]").forEach(function (input) {
      if (input.dataset.kybBound) return;
      input.dataset.kybBound = "1";
      input.addEventListener("change", function () {
        var key = input.getAttribute("data-kyb-filter-applicable");
        if (!key) return;
        state.filters.applicable[key] = input.checked;
        applySignalsView(section, state);
      });
    });

    section.querySelectorAll("[data-kyb-filter-data]").forEach(function (input) {
      if (input.dataset.kybBound) return;
      input.dataset.kybBound = "1";
      input.addEventListener("change", function () {
        var key = input.getAttribute("data-kyb-filter-data");
        if (!key) return;
        state.filters.data[key] = input.checked;
        applySignalsView(section, state);
      });
    });

    section.querySelectorAll("[data-kyb-filter-category]").forEach(function (input) {
      if (input.dataset.kybBound) return;
      input.dataset.kybBound = "1";
      input.addEventListener("change", function () {
        var key = input.getAttribute("data-kyb-filter-category");
        if (!key) return;
        state.filters.categories[key] = input.checked;
        applySignalsView(section, state);
      });
    });

    var signalsFilterButton = section.querySelector("[data-kyb-signals-filter]");
    if (signalsFilterButton && !signalsFilterButton.dataset.kybFilterClearBound) {
      signalsFilterButton.dataset.kybFilterClearBound = "1";
      signalsFilterButton.addEventListener("tds-filter-clear", function () {
        resetSignalFilters(section, state);
        applySignalsView(section, state);
      });
    }

    var signalsSortButton = section.querySelector("[data-kyb-signals-sort]");
    if (signalsSortButton && !signalsSortButton.dataset.kybSortClearBound) {
      signalsSortButton.dataset.kybSortClearBound = "1";
      signalsSortButton.addEventListener("tds-sort-clear", function () {
        resetSignalSort(section, state);
        applySignalsView(section, state);
      });
    }

    section.querySelectorAll("[data-kyb-signal-sort]").forEach(function (item) {
      if (item.dataset.kybBound) return;
      item.dataset.kybBound = "1";
      item.addEventListener("click", function () {
        state.sortActive = true;
        state.sort = item.getAttribute("data-kyb-signal-sort") || SIGNALS_DEFAULT_SORT;
        applySignalsView(section, state);
      });
    });
  }

  var MONITORING_SEVERITY_ORDER = { medium: 2, info: 1, low: 0 };

  function rowMatchesMonitoringFilters(row, state) {
    var category = row.getAttribute("data-kyb-monitoring-category") || "";
    if (state.categoryTab !== "all" && category !== state.categoryTab) return false;

    var status = row.getAttribute("data-kyb-monitoring-status") || "";
    if (state.statusFilter !== "all" && status !== state.statusFilter) return false;

    return true;
  }

  function sortMonitoringRows(rows, sortKey) {
    rows.sort(function (a, b) {
      var fallback =
        (parseInt(a.getAttribute("data-kyb-monitoring-order"), 10) || 0) -
        (parseInt(b.getAttribute("data-kyb-monitoring-order"), 10) || 0);

      if (sortKey === "name-asc" || sortKey === "name-desc") {
        var nameA = ((a.cells[0] && a.cells[0].textContent) || "").trim().toLowerCase();
        var nameB = ((b.cells[0] && b.cells[0].textContent) || "").trim().toLowerCase();
        var nameCmp = nameA.localeCompare(nameB);
        if (nameCmp !== 0) return sortKey === "name-asc" ? nameCmp : -nameCmp;
        return fallback;
      }

      if (sortKey === "date-newest" || sortKey === "date-oldest") {
        var dateA = a.getAttribute("data-kyb-monitoring-date") || "";
        var dateB = b.getAttribute("data-kyb-monitoring-date") || "";
        var dateCmp = dateA.localeCompare(dateB);
        if (dateCmp !== 0) return sortKey === "date-newest" ? -dateCmp : dateCmp;
        return fallback;
      }

      if (sortKey === "risk-level") {
        var severityA = MONITORING_SEVERITY_ORDER[a.getAttribute("data-kyb-monitoring-severity")] || 0;
        var severityB = MONITORING_SEVERITY_ORDER[b.getAttribute("data-kyb-monitoring-severity")] || 0;
        if (severityA !== severityB) return severityB - severityA;
        return fallback;
      }

      return fallback;
    });
  }

  function updateMonitoringTabCounts(section) {
    var counts = { registry: 0, financial: 0, "adverse-media": 0 };
    section.querySelectorAll("[data-kyb-monitoring-row]").forEach(function (row) {
      var category = row.getAttribute("data-kyb-monitoring-category");
      if (counts[category] !== undefined) counts[category] += 1;
    });

    section.querySelectorAll("[data-kyb-monitoring-tab-count]").forEach(function (counter) {
      var key = counter.getAttribute("data-kyb-monitoring-tab-count");
      if (counts[key] !== undefined) counter.textContent = String(counts[key]);
    });
  }

  function updateMonitoringEmptyState(section, visibleCount) {
    var tableContainer = section.querySelector("[data-kyb-monitoring-table]");
    if (!tableContainer) return;

    var tbody = tableContainer.querySelector("tbody");
    if (!tbody) return;

    section.querySelectorAll("p.kyb-monitoring-empty").forEach(function (node) {
      node.remove();
    });

    var emptyRow = tbody.querySelector("[data-kyb-monitoring-empty-row]");
    if (visibleCount === 0) {
      if (!emptyRow) {
        emptyRow = document.createElement("tr");
        emptyRow.setAttribute("data-kyb-monitoring-empty-row", "");
        var cell = document.createElement("td");
        cell.colSpan = 4;
        cell.className = "kyb-monitoring-empty";
        cell.textContent = "No alerts match this filter";
        emptyRow.appendChild(cell);
      }
      emptyRow.hidden = false;
      tbody.appendChild(emptyRow);
      return;
    }

    if (emptyRow) emptyRow.hidden = true;
  }

  function setSelectedMonitoringTab(section, activeTab) {
    section.querySelectorAll("[data-kyb-monitoring-tab]").forEach(function (tab) {
      var isActive = tab === activeTab;
      tab.classList.toggle("tds-filter-tab--selected", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function resetMonitoringFilter(section, state) {
    state.statusFilter = "all";
    section.querySelectorAll("[data-kyb-monitoring-filter] [data-kyb-monitoring-status]").forEach(function (item) {
      var isDefault = item.hasAttribute("data-tds-filter-default");
      item.classList.toggle("tds-action-list-item--selected", isDefault);
      item.setAttribute("aria-checked", isDefault ? "true" : "false");
    });
  }

  function resetMonitoringSort(section, state) {
    state.sort = MONITORING_DEFAULT_SORT;
    state.sortActive = false;
    section.querySelectorAll("[data-kyb-monitoring-sort-option]").forEach(function (item) {
      var isDefault = item.hasAttribute("data-tds-sort-default");
      item.classList.toggle("tds-action-list-item--selected", isDefault);
      item.setAttribute("aria-checked", isDefault ? "true" : "false");
    });
  }

  function updateMonitoringToolbarControls(section, state) {
    var filterButton = section.querySelector("[data-kyb-monitoring-filter]");
    if (filterButton) {
      var isFiltered = state.statusFilter !== "all";
      filterButton.classList.toggle("tds-filter-button--selected", isFiltered);
      filterButton.classList.remove("tds-filter-button--multi");

      var selectedOption = section.querySelector(
        '[data-kyb-monitoring-status="' + state.statusFilter + '"] .tds-action-list-item__label'
      );
      var valueLabel = filterButton.querySelector("[data-kyb-monitoring-filter-value]");
      if (valueLabel) {
        valueLabel.textContent = isFiltered && selectedOption ? selectedOption.textContent.trim() : "";
      }
    }

    section.querySelectorAll("[data-kyb-monitoring-filter] [data-kyb-monitoring-status]").forEach(function (item) {
      var selected = item.getAttribute("data-kyb-monitoring-status") === state.statusFilter;
      item.classList.toggle("tds-action-list-item--selected", selected);
      item.setAttribute("aria-checked", selected ? "true" : "false");
    });

    var sortButton = section.querySelector("[data-kyb-monitoring-sort]");
    if (sortButton) {
      sortButton.classList.toggle("tds-sort-button--selected", state.sortActive);

      var selectedOption = section.querySelector(
        '[data-kyb-monitoring-sort-option="' + state.sort + '"] .tds-action-list-item__label'
      );
      var sortLabel = sortButton.querySelector("[data-kyb-monitoring-sort-label]");
      if (sortLabel) {
        sortLabel.textContent =
          state.sortActive && selectedOption ? selectedOption.textContent.trim() : "";
      }
    }

    section.querySelectorAll("[data-kyb-monitoring-sort-option]").forEach(function (item) {
      var selected = state.sortActive && item.getAttribute("data-kyb-monitoring-sort-option") === state.sort;
      item.classList.toggle("tds-action-list-item--selected", selected);
      item.setAttribute("aria-checked", selected ? "true" : "false");
    });
  }

  function applyMonitoringView(section, state) {
    var tbody = section.querySelector("[data-kyb-monitoring-table] tbody");
    if (!tbody) return;

    var rows = Array.from(section.querySelectorAll("[data-kyb-monitoring-row]"));
    sortMonitoringRows(rows, state.sort);

    var visibleCount = 0;
    rows.forEach(function (row) {
      row.classList.remove("tds-action-list-item--selected");
      var visible = rowMatchesMonitoringFilters(row, state);
      row.hidden = !visible;
      if (visible) visibleCount += 1;
      tbody.appendChild(row);
    });

    updateMonitoringEmptyState(section, visibleCount);
    updateMonitoringToolbarControls(section, state);
  }

  function initMonitoringToolbar() {
    var section = document.getElementById("kyb-monitoring");
    if (!section) return;

    var state = {
      categoryTab: "all",
      statusFilter: "all",
      sort: MONITORING_DEFAULT_SORT,
      sortActive: false,
    };

    var order = 0;
    section.querySelectorAll("[data-kyb-monitoring-row]").forEach(function (row) {
      row.setAttribute("data-kyb-monitoring-order", String(order++));
    });

    updateMonitoringTabCounts(section);
    applyMonitoringView(section, state);

    section.querySelectorAll("[data-kyb-monitoring-tab]").forEach(function (tab) {
      if (tab.dataset.kybBound) return;
      tab.dataset.kybBound = "1";
      tab.addEventListener("click", function () {
        state.categoryTab = tab.getAttribute("data-kyb-monitoring-tab") || "all";
        setSelectedMonitoringTab(section, tab);
        applyMonitoringView(section, state);
      });
    });

    section.querySelectorAll("[data-kyb-monitoring-filter] [data-kyb-monitoring-status]").forEach(function (item) {
      if (item.dataset.kybBound) return;
      item.dataset.kybBound = "1";
      item.addEventListener("click", function () {
        state.statusFilter = item.getAttribute("data-kyb-monitoring-status") || "all";
        applyMonitoringView(section, state);
      });
    });

    var monitoringFilterButton = section.querySelector("[data-kyb-monitoring-filter]");
    if (monitoringFilterButton && !monitoringFilterButton.dataset.kybFilterClearBound) {
      monitoringFilterButton.dataset.kybFilterClearBound = "1";
      monitoringFilterButton.addEventListener("tds-filter-clear", function () {
        resetMonitoringFilter(section, state);
        applyMonitoringView(section, state);
      });
    }

    var monitoringSortButton = section.querySelector("[data-kyb-monitoring-sort]");
    if (monitoringSortButton && !monitoringSortButton.dataset.kybSortClearBound) {
      monitoringSortButton.dataset.kybSortClearBound = "1";
      monitoringSortButton.addEventListener("tds-sort-clear", function () {
        resetMonitoringSort(section, state);
        applyMonitoringView(section, state);
      });
    }

    section.querySelectorAll("[data-kyb-monitoring-sort-option]").forEach(function (item) {
      if (item.dataset.kybBound) return;
      item.dataset.kybBound = "1";
      item.addEventListener("click", function () {
        state.sortActive = true;
        state.sort = item.getAttribute("data-kyb-monitoring-sort-option") || MONITORING_DEFAULT_SORT;
        applyMonitoringView(section, state);
      });
    });
  }

  function init() {
    initHomeNavigation();
    applyEntityContext();
    initTabs();
    initTabsScroll();
    initAccordions(document);
    initSignalRows();
    initSignalsToolbar();
    initMonitoringToolbar();
    if (window.TdsDropdownPanel) TdsDropdownPanel.initMenus(document);
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
