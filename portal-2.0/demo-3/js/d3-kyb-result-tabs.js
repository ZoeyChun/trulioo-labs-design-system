/* Demo 3 — Web & Social, Match Signals, Sources panels
   (detail content ported from pages/KYB Results). */
(function () {
  var EXT_LINK =
    '<span class="kyb-web-link__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/></svg></span>';

  var ICON_MATCH =
    '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M5.5 8.5 7 10l3.5-4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_NO =
    '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="m5.5 5.5 5 5M10.5 5.5l-5 5" stroke-linecap="round"/></svg>';
  var ICON_MISS =
    '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M8 2.5 14 13.5H2L8 2.5z"/><path d="M8 6.5v3.5" stroke-linecap="round"/><circle cx="8" cy="11.75" r=".6" fill="currentColor"/></svg>';

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function slugHandle(name) {
    return String(name || "business")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 28) || "business";
  }

  function domainFromBiz(biz) {
    var email = (biz.report && biz.report.email) || "";
    var at = email.indexOf("@");
    if (at > 0) return email.slice(at + 1).replace(/\.example$/i, ".com");
    return slugHandle(biz.name) + ".com";
  }

  function dataField(label, valueHtml) {
    return (
      '<div class="tds-data-field">' +
      '<p class="tds-data-field__label">' +
      esc(label) +
      "</p>" +
      '<div class="tds-data-field__content"><div class="tds-data-field__value-row">' +
      valueHtml +
      "</div></div></div>"
    );
  }

  function valueText(text, neg) {
    return (
      '<p class="tds-data-field__value' +
      (neg ? " kyb-web-value--negative" : "") +
      '">' +
      esc(text) +
      "</p>"
    );
  }

  function valueLink(href, label) {
    return (
      '<a class="kyb-web-link" href="' +
      esc(href) +
      '" target="_blank" rel="noopener noreferrer">' +
      esc(label) +
      EXT_LINK +
      "</a>"
    );
  }

  function signalChip(status) {
    var tone = "negative";
    var label = "No Match";
    var icon = ICON_NO;
    if (status === "match") {
      tone = "positive";
      label = "Match";
      icon = ICON_MATCH;
    } else if (status === "missing") {
      tone = "intermediate";
      label = "Missing";
      icon = ICON_MISS;
    }
    return (
      '<span class="tds-data-table__signals tds-data-table__signals--' +
      tone +
      '"><span class="tds-data-table__signals-icon" aria-hidden="true">' +
      icon +
      "</span>" +
      label +
      "</span>"
    );
  }

  /* ——— Web & Social Insights ——— */
  function renderWebPanel(panel, biz) {
    if (!panel || !biz) return;
    var name = biz.name || "Business";
    var handle = slugHandle(name);
    var domain = domainFromBiz(biz);
    var highRisk = biz.riskLevel === "high";
    var socialCount = highRisk ? "None found" : "4 profiles found";
    var websiteStatus = highRisk
      ? "Unavailable — domain expired, no live site to render"
      : "Active — live site responding";
    var expired = highRisk ? "Feb 1, 2025" : "Feb 1, 2027";
    var socialHref = {
      LinkedIn: "https://linkedin.com/company/" + handle,
      Instagram: "https://instagram.com/" + handle,
      "Twitter/X": "https://x.com/" + handle,
      TikTok: "https://tiktok.com/@" + handle
    };

    panel.innerHTML =
      '<div class="d3-kyb-tab-body d3-kyb-web">' +
      '<h3 class="d3-kyb-overview__title">Web Insights</h3>' +
      '<div class="kyb-web-intro-panel">' +
      '<h3 class="kyb-web-intro-panel__name">' +
      esc(name) +
      "</h3>" +
      '<div class="kyb-web-intro-panel__strip">' +
      dataField("Description", valueText("No data found")) +
      dataField("Website", valueLink("https://" + domain, domain)) +
      dataField("Social Media Links", valueText(socialCount)) +
      "</div></div>" +
      '<div class="kyb-subsection kyb-web-digital-presence">' +
      '<h3 class="kyb-subsection-title">Digital Presence</h3>' +
      '<div class="kyb-web-layout">' +
      '<div class="kyb-browser-mock">' +
      '<div class="kyb-browser-mock__chrome">' +
      '<span class="kyb-browser-mock__dot"></span><span class="kyb-browser-mock__dot"></span><span class="kyb-browser-mock__dot"></span>' +
      "</div>" +
      '<div class="kyb-browser-mock__viewport">' +
      '<p class="kyb-browser-mock__placeholder">No website preview available</p>' +
      "</div></div>" +
      '<div class="kyb-web-details">' +
      '<div class="kyb-web-details-grid">' +
      dataField("Website Status", valueText(websiteStatus)) +
      dataField("Domain Registrar", valueText("GoDaddy.com, LLC")) +
      dataField("Domain Registered", valueText("Feb 1, 2019")) +
      dataField("Domain Expired", valueText(expired, highRisk)) +
      "</div>" +
      '<hr class="kyb-section-divider">' +
      '<div class="kyb-web-social-rows">' +
      '<div class="kyb-web-social-row">' +
      dataField("LinkedIn", valueLink(socialHref.LinkedIn, "linkedin.com/company/" + handle)) +
      dataField("Instagram", valueLink(socialHref.Instagram, "instagram.com/" + handle)) +
      "</div>" +
      '<div class="kyb-web-social-row">' +
      dataField("Twitter/X", valueLink(socialHref["Twitter/X"], "x.com/" + handle)) +
      dataField("TikTok", valueLink(socialHref.TikTok, "tiktok.com/@" + handle)) +
      "</div></div></div></div></div></div>";
  }

  /* ——— Match Signals ——— */
  function defaultSources(statuses) {
    var names = [
      "Business Documents 323100",
      "Business Insights 344568",
      "Business Insights 773174",
      "Ownership Tree 480052"
    ];
    return names.map(function (name, i) {
      return { name: name, status: statuses[i] || "missing" };
    });
  }

  function matchDataForBiz(biz) {
    if (biz.matchSignals) return biz.matchSignals;
    var city = (biz.city || "").split(",")[0].trim() || "—";
    var state =
      (biz.city || "").split(",")[1] && (biz.city || "").split(",")[1].trim()
        ? (biz.city || "").split(",")[1].trim()
        : biz.cc === "US"
          ? "Delaware"
          : "—";
    var jurisdiction = state !== "—" ? state : biz.country || "—";
    var verified = biz.riskLevel === "low";

    if (verified) {
      return {
        verified: true,
        rule: "Verification Rule: KYB Standard: 1 Records Match (BRN)",
        metrics: { fields: "4 fields", sources: "4 of 4 datasources" },
        rows: [
          {
            id: "business-name",
            field: "Business Name",
            input: biz.name,
            status: "match",
            sources: "4/4 matched",
            sourceRows: defaultSources(["match", "match", "match", "match"])
          },
          {
            id: "jurisdiction",
            field: "Jurisdiction of Incorporation",
            input: jurisdiction,
            status: "match",
            sources: "4/4 matched",
            sourceRows: defaultSources(["match", "match", "match", "match"])
          },
          {
            id: "city",
            field: "City",
            input: city,
            status: "match",
            sources: "3/4 matched",
            sourceRows: defaultSources(["match", "match", "match", "missing"])
          },
          {
            id: "state-province",
            field: "State Province",
            input: state,
            status: "match",
            sources: "4/4 matched",
            sourceRows: defaultSources(["match", "match", "match", "match"])
          }
        ]
      };
    }

    return {
      verified: false,
      rule: "Verification Rule: KYB Standard: 1 Records Match (BRN)",
      metrics: { fields: "4 fields", sources: "4 of 7 datasources" },
      rows: [
        {
          id: "business-name",
          field: "Business Name",
          input: biz.name,
          status: "no-match",
          sources: "1/4 matched",
          sourceRows: defaultSources(["no-match", "match", "no-match", "no-match"])
        },
        {
          id: "jurisdiction",
          field: "Jurisdiction of Incorporation",
          input: jurisdiction,
          status: "match",
          sources: "3/4 matched",
          sourceRows: defaultSources(["missing", "match", "match", "match"])
        },
        {
          id: "city",
          field: "City",
          input: city,
          status: "no-match",
          sources: "0/4 matched",
          sourceRows: defaultSources(["no-match", "no-match", "no-match", "no-match"])
        },
        {
          id: "state-province",
          field: "State Province",
          input: state,
          status: "match",
          sources: "3/4 matched",
          sourceRows: defaultSources(["missing", "match", "match", "match"])
        }
      ]
    };
  }

  function bindMatchToggles(panel) {
    panel.querySelectorAll("[data-d3-match-row]").forEach(function (row) {
      if (row.dataset.d3Bound) return;
      row.dataset.d3Bound = "1";
      var toggle = row.querySelector(".kyb-match-row__toggle");
      var detail = row.nextElementSibling;
      if (!detail || !detail.classList.contains("kyb-match-detail-row")) return;

      function setOpen(open) {
        row.classList.toggle("kyb-match-row--expanded", open);
        detail.hidden = !open;
        if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
      }

      row.addEventListener("click", function (event) {
        if (event.target.closest("a")) return;
        setOpen(detail.hidden);
      });
      if (toggle) {
        toggle.addEventListener("click", function (event) {
          event.stopPropagation();
          setOpen(detail.hidden);
        });
      }
    });
  }

  function renderMatchSignalsPanel(panel, biz) {
    if (!panel || !biz) return;
    var data = matchDataForBiz(biz);
    var bannerClass =
      "kyb-match-verification-banner" +
      (data.verified ? " kyb-match-verification-banner--positive" : "");
    var statusIcon = data.verified ? ICON_MATCH : ICON_NO;
    var statusTitle = data.verified ? "Verified" : "Not Verified";

    var rowsHtml = data.rows
      .map(function (row) {
        var nested = (row.sourceRows || [])
          .map(function (s) {
            return (
              "<tr><td class=\"tds-data-table__text-cell\">" +
              esc(s.name) +
              "</td><td>" +
              signalChip(s.status) +
              "</td></tr>"
            );
          })
          .join("");
        return (
          '<tr data-d3-match-row="' +
          esc(row.id) +
          '">' +
          '<td class="tds-data-table__text-cell">' +
          esc(row.field) +
          "</td>" +
          '<td class="tds-data-table__text-cell">' +
          esc(row.input) +
          "</td>" +
          "<td>" +
          signalChip(row.status) +
          "</td>" +
          '<td class="tds-data-table__text-cell">' +
          esc(row.sources) +
          "</td>" +
          '<td data-align="right"><span class="tds-data-table__actions-cell">' +
          '<button type="button" class="tds-data-table__action-icon kyb-match-row__toggle" aria-label="Show source details" aria-expanded="false">' +
          '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg>' +
          "</button></span></td></tr>" +
          '<tr class="kyb-match-detail-row" hidden><td colspan="5">' +
          '<div class="kyb-match-source-panel"><table class="tds-data-table kyb-match-source-table"><tbody>' +
          nested +
          "</tbody></table></div></td></tr>"
        );
      })
      .join("");

    /* Optional risk callouts under the match table when present. */
    var riskHtml = "";
    var risks = biz.risks || [];
    if (risks.length) {
      riskHtml =
        '<div class="d3-kyb-signals d3-kyb-signals--beneath">' +
        '<h4 class="d3-kyb-overview__title">Elevated risk signals</h4><ul class="d3-kyb-signals__list">';
      risks.forEach(function (r) {
        riskHtml +=
          '<li class="d3-kyb-signals__item d3-kyb-signals__item--' +
          esc(r.severity || "medium") +
          '"><span class="d3-kyb-signals__label">' +
          esc(r.label) +
          '</span><span class="d3-kyb-signals__evidence">' +
          esc(r.evidence) +
          "</span></li>";
      });
      riskHtml += "</ul></div>";
    }

    panel.innerHTML =
      '<div class="d3-kyb-tab-body d3-kyb-match">' +
      '<h3 class="d3-kyb-overview__title">Match Signals</h3>' +
      '<div class="' +
      bannerClass +
      '" role="status">' +
      '<div class="kyb-match-verification-banner__main">' +
      '<div class="kyb-match-verification-banner__status">' +
      '<span class="kyb-match-verification-banner__icon" aria-hidden="true">' +
      statusIcon +
      "</span>" +
      '<p class="kyb-match-verification-banner__title">' +
      statusTitle +
      "</p></div>" +
      '<p class="kyb-match-verification-banner__rule">' +
      esc(data.rule) +
      "</p></div>" +
      '<div class="kyb-match-verification-banner__metrics kyb-field-strip">' +
      '<div class="kyb-field-strip__item">' +
      dataField("Fields Checked", valueText(data.metrics.fields)) +
      "</div>" +
      '<div class="kyb-field-strip__item">' +
      dataField("Sources Responded", valueText(data.metrics.sources)) +
      "</div></div></div>" +
      '<div class="tds-data-table-container kyb-match-table">' +
      '<div class="tds-data-table__wrapper"><table class="tds-data-table">' +
      "<thead><tr><th>Field</th><th>Input</th><th>Result</th><th>Sources</th>" +
      '<th class="tds-data-table__actions-col" aria-hidden="true"></th></tr></thead>' +
      "<tbody>" +
      rowsHtml +
      "</tbody></table></div></div>" +
      riskHtml +
      "</div>";

    bindMatchToggles(panel);
  }

  /* ——— Sources ——— */
  var TRULIOO_CAPS = [
    {
      title: "Ownership & UBO Analysis",
      desc: "Makes complex ownership structures understandable at a glance.",
      tags: ["Ownership", "UBO", "Control"],
      icon: "fa-regular fa-users"
    },
    {
      title: "Business Intelligence Search",
      desc: "Conduct deep, multi-dimensional business research across officer details, address information, and adverse media.",
      tags: ["Signals", "Intelligence", "Media"],
      icon: "fa-regular fa-magnifying-glass"
    },
    {
      title: "Policy Review",
      desc: "Streamline policy management with an AI-powered assistant that helps you review, understand, and manage policies more efficiently.",
      tags: ["Policy", "Decision", "Compliance"],
      icon: "fa-regular fa-file-lines"
    },
    {
      title: "KYB Verification",
      desc: "Gain comprehensive insight into critical business data for confident decision making.",
      tags: ["Verification", "Registration", "Compliance"],
      icon: "fa-regular fa-building"
    }
  ];

  function onlineSourcesForBiz(biz) {
    var reg = biz.reg || (biz.report && biz.report.regNumber) || "11876542";
    var file = String(reg).replace(/\D/g, "") || "11876542";
    var url =
      "https://icis.corp.delaware.gov/ecorp/entitysearch/NameSearch.aspx?fileNumber=" +
      encodeURIComponent(file);
    return [
      { name: "Delaware Division of Corporations", desc: "Company filings", url: url },
      {
        name: "Delaware Division of Corporations",
        desc: "Persons with significant control",
        url: url
      },
      { name: "WHOIS", desc: "Domain registration record", url: url },
      {
        name: "BVI Financial Services Commission",
        desc: "Registry (no public disclosure)",
        url: url
      },
      { name: "Trulioo Business Verification", desc: "Internal record", url: url }
    ];
  }

  function renderSourcesPanel(panel, biz) {
    if (!panel || !biz) return;
    var caps = TRULIOO_CAPS.map(function (cap) {
      var tags = cap.tags
        .map(function (t) {
          return '<span class="tds-tag tds-tag--sm tds-tag--default">' + esc(t) + "</span>";
        })
        .join("");
      return (
        "<tr>" +
        '<td class="tds-data-table__text-cell tds-data-table__text-cell--subtext">' +
        '<span class="tds-data-table__cell-inner">' +
        '<span class="tds-data-table__cell-leading-visual" aria-hidden="true"><i class="' +
        esc(cap.icon) +
        '"></i></span>' +
        '<span class="tds-data-table__cell-text-stack">' +
        "<span>" +
        esc(cap.title) +
        '</span><span class="tds-data-table__cell-subtext">' +
        esc(cap.desc) +
        "</span></span></span></td>" +
        '<td data-align="right"><span class="tds-data-table__label-cell">' +
        tags +
        "</span></td></tr>"
      );
    }).join("");

    var online = onlineSourcesForBiz(biz)
      .map(function (row) {
        return (
          "<tr>" +
          '<td class="tds-data-table__text-cell">' +
          esc(row.name) +
          "</td>" +
          '<td class="tds-data-table__text-cell">' +
          esc(row.desc) +
          "</td>" +
          '<td class="tds-data-table__text-cell"><a class="kyb-sources-url" href="' +
          esc(row.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          esc(row.url) +
          "</a></td></tr>"
        );
      })
      .join("");

    panel.innerHTML =
      '<div class="d3-kyb-tab-body d3-kyb-sources">' +
      '<h3 class="d3-kyb-overview__title">Sources</h3>' +
      '<div class="kyb-sources-body">' +
      '<h3 class="kyb-subsection-title kyb-subsection-title--sm">Trulioo Sources</h3>' +
      '<div class="tds-data-table-container"><div class="tds-data-table__wrapper">' +
      '<table class="tds-data-table tds-data-table--comfort kyb-sources-capabilities">' +
      "<tbody>" +
      caps +
      "</tbody></table></div></div>" +
      '<div class="tds-data-table-container">' +
      '<div class="tds-data-table__header"><div class="tds-data-table__header-text">' +
      '<div class="tds-data-table__header-title">Online Sources</div></div></div>' +
      '<div class="tds-data-table__wrapper">' +
      '<table class="tds-data-table tds-data-table--comfort kyb-sources-online">' +
      "<thead><tr><th>Sources</th><th>Description</th><th>URL</th></tr></thead>" +
      "<tbody>" +
      online +
      "</tbody></table></div></div></div></div>";
  }

  function renderAll(resumeCard, biz) {
    if (!resumeCard || !biz) return;
    renderWebPanel(resumeCard.querySelector('[data-d3-kyb-panel="web"]'), biz);
    renderMatchSignalsPanel(
      resumeCard.querySelector('[data-d3-kyb-panel="signals"]'),
      biz
    );
    renderSourcesPanel(resumeCard.querySelector('[data-d3-kyb-panel="sources"]'), biz);
  }

  window.D3KybResultTabs = {
    renderAll: renderAll,
    renderWebPanel: renderWebPanel,
    renderMatchSignalsPanel: renderMatchSignalsPanel,
    renderSourcesPanel: renderSourcesPanel
  };
})();
