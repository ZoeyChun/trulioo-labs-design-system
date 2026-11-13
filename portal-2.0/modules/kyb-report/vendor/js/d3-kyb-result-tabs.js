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
  var ACCORDION_CHEVRON =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg>';

  function webAccField(label, valueHtml, opts) {
    opts = opts || {};
    return (
      '<div class="tds-data-field tds-data-field--horizontal">' +
      '<div class="tds-data-field__label-row"><p class="tds-data-field__label">' +
      esc(label) +
      '</p></div><div class="tds-data-field__content"><div class="tds-data-field__value-row' +
      (opts.tagRow ? " kyb-web-tag-row" : "") +
      '">' +
      valueHtml +
      '</div></div></div><hr class="tds-accordion__data-field-divider">'
    );
  }

  function webAccText(text) {
    return '<p class="tds-data-field__value">' + esc(text) + "</p>";
  }

  function webAccTags(tags) {
    return (tags || [])
      .map(function (t) {
        return '<span class="tds-tag tds-tag--sm tds-tag--default">' + esc(t) + "</span>";
      })
      .join("");
  }

  function webAccBool(yes) {
    var icon = yes ? ICON_MATCH : ICON_NO;
    return (
      '<span class="kyb-web-bool">' + icon + (yes ? "Yes" : "No") + "</span>"
    );
  }

  function webAccColumn(fields) {
    return (
      '<div class="tds-accordion__data-field-list">' +
      fields
        .map(function (f) {
          return webAccField(f.label, f.value, { tagRow: f.tagRow });
        })
        .join("") +
      "</div>"
    );
  }

  function webAccordionHtml(title, left, right) {
    /* Collapsed by default per Demo 3 QA. */
    return (
      '<div class="tds-accordion tds-accordion--md kyb-web-accordion">' +
      '<button type="button" class="tds-accordion__header" aria-expanded="false">' +
      '<span class="tds-accordion__leading"><span class="tds-accordion__title">' +
      esc(title) +
      '</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__chevron" aria-hidden="true">' +
      ACCORDION_CHEVRON +
      "</span></span></button>" +
      '<div class="tds-accordion__content">' +
      '<div class="kyb-web-accordion-columns">' +
      webAccColumn(left) +
      webAccColumn(right) +
      "</div></div></div>"
    );
  }

  function bindWebAccordions(root) {
    root.querySelectorAll(".kyb-web-accordion .tds-accordion__header").forEach(function (header) {
      if (header.dataset.d3Bound) return;
      header.dataset.d3Bound = "1";
      header.addEventListener("click", function () {
        var accordion = header.closest(".tds-accordion");
        if (!accordion) return;
        var open = accordion.classList.toggle("tds-accordion--expanded");
        header.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  function socialProfileForBiz(biz) {
    var name = biz.name || "Business";
    var handle = slugHandle(name).slice(0, 16) || "meridian";
    var domain = domainFromBiz(biz);
    var highRisk = biz.riskLevel === "high";
    var city = (biz.city || "").split(",")[0].trim() || "London";
    var country = biz.country || "United Kingdom";
    var hq = city + ", " + country;
    return {
      name: name,
      handle: handle,
      shortName: name.replace(/\s+(Ltd\.?|LLC|Inc\.?|AB|GmbH|Pty Ltd).*$/i, "").trim() || name,
      domain: domain,
      email: (biz.report && biz.report.email) || "info@" + domain,
      linkedinAbout: highRisk
        ? "Management consultancy services — limited public trading evidence."
        : "Management consultancy services for enterprise clients.",
      instagramAbout: highRisk ? "UK-based management consultancy." : "Professional services.",
      tiktokBiography: highRisk ? "Management consultancy | UK" : "Professional services",
      industries: ["Management Consulting", "Professional Services"],
      specialities: ["Business advisory", "Corporate governance", "Risk consulting"],
      businessCategory: "Management Consulting",
      category: "Professional Services",
      orgType: (biz.report && biz.report.legalForm) || "Private company",
      companySize: highRisk ? "0 employees" : "11–50 employees",
      employees: highRisk ? "0" : "24",
      founded: "2019",
      locations: [hq],
      headquarters: hq,
      countryCodes: [biz.cc === "GB" ? "GBR" : biz.cc || "GBR"],
      linkedinFollowers: highRisk ? "12" : "184",
      instagramFollowers: highRisk ? "0" : "48",
      instagramFollowing: "3",
      instagramPostCount: "0",
      highlightsCount: "0",
      avgEngagement: "0%",
      twitterFollowers: highRisk ? "0" : "7",
      twitterFollowing: "2",
      twitterSubscriptions: "0",
      twitterPostCount: highRisk ? "0" : "3",
      twitterDateJoined: "March 2019",
      tiktokFollowers: "0",
      tiktokFollowing: "0",
      tiktokLikeCount: "0",
      tiktokLikes: "0",
      tiktokPostCount: "0",
      tiktokDateJoined: "Not Available",
      businessAccount: true,
      professionalAccount: false,
      verified: false,
      highRisk: highRisk
    };
  }

  function webAccordionsHtml(s) {
    var siteLink = valueLink("https://" + s.domain, s.domain);
    return (
      webAccordionHtml(
        "LinkedIn",
        [
          { label: "Profile Name", value: webAccText(s.name) },
          { label: "About", value: webAccText(s.linkedinAbout) },
          { label: "Industries", value: webAccTags(s.industries), tagRow: true },
          { label: "Specialities", value: webAccTags(s.specialities), tagRow: true },
          { label: "Website", value: siteLink },
          { label: "Followers", value: webAccText(s.linkedinFollowers) },
          { label: "Founded", value: webAccText(s.founded) }
        ],
        [
          { label: "Organization Type", value: webAccText(s.orgType) },
          { label: "Company Size", value: webAccText(s.companySize) },
          { label: "Locations", value: webAccTags(s.locations), tagRow: true },
          { label: "Headquarters", value: webAccText(s.headquarters) },
          { label: "Country Codes", value: webAccTags(s.countryCodes), tagRow: true },
          { label: "Employees", value: webAccText(s.employees) }
        ]
      ) +
      webAccordionHtml(
        "Instagram",
        [
          { label: "Profile Name", value: webAccText(s.handle) },
          { label: "Name", value: webAccText(s.name) },
          { label: "About", value: webAccText(s.instagramAbout) },
          { label: "Business Category", value: webAccText(s.businessCategory) },
          { label: "Category", value: webAccText(s.category) },
          { label: "Website", value: siteLink },
          { label: "Business Account", value: webAccBool(s.businessAccount) },
          { label: "Professional Account", value: webAccBool(s.professionalAccount) },
          { label: "Verified", value: webAccBool(s.verified) }
        ],
        [
          { label: "Private", value: webAccBool(false) },
          { label: "Joined Recently", value: webAccBool(false) },
          { label: "Locations", value: webAccText(s.locations[0]) },
          { label: "Email", value: valueLink("mailto:" + s.email, s.email) },
          { label: "Followers", value: webAccText(s.instagramFollowers) },
          { label: "Following", value: webAccText(s.instagramFollowing) },
          { label: "Post Count", value: webAccText(s.instagramPostCount) },
          { label: "Highlights Count", value: webAccText(s.highlightsCount) },
          { label: "Avg Engagement", value: webAccText(s.avgEngagement) }
        ]
      ) +
      webAccordionHtml(
        "Twitter/X",
        [
          { label: "Profile Name", value: webAccText(s.shortName) },
          { label: "Name", value: webAccText(s.name) },
          { label: "Category", value: webAccText(s.businessCategory) },
          { label: "Website", value: siteLink },
          { label: "Verified", value: webAccBool(s.verified) },
          { label: "Business Account", value: webAccBool(s.businessAccount) },
          { label: "Government Account", value: webAccBool(false) }
        ],
        [
          { label: "Locations", value: webAccTags(s.locations), tagRow: true },
          { label: "Followers", value: webAccText(s.twitterFollowers) },
          { label: "Following", value: webAccText(s.twitterFollowing) },
          { label: "Subscriptions", value: webAccText(s.twitterSubscriptions) },
          { label: "Date Joined", value: webAccText(s.twitterDateJoined) },
          { label: "Post Count", value: webAccText(s.twitterPostCount) }
        ]
      ) +
      webAccordionHtml(
        "TikTok",
        [
          { label: "Nickname", value: webAccText(s.handle) },
          { label: "Biography", value: webAccText(s.tiktokBiography) },
          { label: "Verified", value: webAccBool(s.verified) },
          { label: "Followers", value: webAccText(s.tiktokFollowers) },
          { label: "Following", value: webAccText(s.tiktokFollowing) },
          { label: "Like Count", value: webAccText(s.tiktokLikeCount) }
        ],
        [
          { label: "Likes", value: webAccText(s.tiktokLikes) },
          { label: "Post Count", value: webAccText(s.tiktokPostCount) },
          { label: "Date Joined", value: webAccText(s.tiktokDateJoined) },
          { label: "Website", value: siteLink },
          { label: "Private", value: webAccBool(false) },
          { label: "Commerce User", value: webAccBool(false) }
        ]
      )
    );
  }

  function renderWebPanel(panel, biz) {
    if (!panel || !biz) return;
    var s = socialProfileForBiz(biz);
    var websiteStatus = s.highRisk
      ? "Unavailable — domain expired, no live site to render"
      : "Active — live site responding";
    var expired = s.highRisk ? "1 Feb 2025" : "1 Feb 2027";
    var linkedIn = s.highRisk
      ? valueLink("https://linkedin.com/meridian", "linkedin.com/meridian")
      : valueLink(
          "https://linkedin.com/company/" + s.handle,
          "linkedin.com/company/" + s.handle
        );

    panel.innerHTML =
      '<div class="d3-kyb-tab-body d3-kyb-web">' +
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
      dataField("Website", valueLink("https://" + s.domain, s.domain)) +
      dataField("Website Status", valueText(websiteStatus)) +
      dataField("Domain Registrar", valueText("GoDaddy.com, LLC")) +
      dataField("Domain Registered", valueText("1 Feb 2019")) +
      dataField("Domain Expired", valueText(expired, s.highRisk)) +
      "</div>" +
      '<hr class="kyb-section-divider">' +
      '<div class="kyb-web-social-row kyb-web-social-row--3">' +
      dataField("LinkedIn", linkedIn) +
      dataField("Instagram", valueText("No profile found")) +
      dataField("Facebook", valueText("No profile found")) +
      "</div></div></div></div>" +
      '<div class="kyb-web-accordions" aria-label="Social media profiles">' +
      webAccordionsHtml(s) +
      "</div></div>";

    bindWebAccordions(panel);
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

    /* Match rows collapsed by default; user expands for source details. */
    var rowsHtml = data.rows
      .map(function (row) {
        var expanded = false;
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
          '"' +
          (expanded ? ' class="kyb-match-row--expanded"' : "") +
          ">" +
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
          '<button type="button" class="tds-data-table__action-icon kyb-match-row__toggle" aria-label="Show source details" aria-expanded="' +
          (expanded ? "true" : "false") +
          '">' +
          '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg>' +
          "</button></span></td></tr>" +
          '<tr class="kyb-match-detail-row"' +
          (expanded ? "" : " hidden") +
          '><td colspan="5">' +
          '<div class="kyb-match-source-panel"><table class="tds-data-table kyb-match-source-table"><tbody>' +
          nested +
          "</tbody></table></div></td></tr>"
        );
      })
      .join("");

    panel.innerHTML =
      '<div class="d3-kyb-tab-body d3-kyb-match">' +
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
      '<div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--comfort">' +
      "<thead><tr><th>Field</th><th>Input</th><th>Result</th><th>Sources</th>" +
      '<th class="tds-data-table__actions-col" aria-hidden="true"></th></tr></thead>' +
      "<tbody>" +
      rowsHtml +
      "</tbody></table></div></div>" +
      sourcesSectionsHtml(biz) +
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
    var cc = String(biz.cc || biz.countryCode || "").toUpperCase();
    var country = String(biz.country || "").toLowerCase();
    var isUk = cc === "GB" || /united kingdom|england|wales|scotland/i.test(country);
    var reg = biz.reg || (biz.report && biz.report.regNumber) || "08842190";
    var file = String(reg).replace(/\D/g, "") || "08842190";
    if (isUk) {
      var ch =
        "https://find-and-update.company-information.service.gov.uk/company/" +
        encodeURIComponent(file);
      return [
        { name: "Companies House", desc: "Company filings", url: ch },
        { name: "Companies House", desc: "Persons with significant control", url: ch + "/persons-with-significant-control" },
        { name: "WHOIS", desc: "Domain registration record", url: "https://who.is/whois/" + encodeURIComponent(domainFromBiz(biz)) },
        {
          name: "UK Gazette",
          desc: "Notices and filings",
          url: "https://www.thegazette.co.uk/all-notices/notice?text=" + encodeURIComponent(biz.name || "")
        },
        { name: "Trulioo Business Verification", desc: "Internal record", url: "#" }
      ];
    }
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

  var CAP_ICONS = {
    ownership:
      '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="5" cy="5" r="2" stroke="currentColor" stroke-width="1.25"/><circle cx="11" cy="5" r="2" stroke="currentColor" stroke-width="1.25"/><path d="M1.75 13c.5-2 1.9-3.25 3.25-3.25S8 11 8.5 13M7.5 13c.5-2 1.9-3.25 3.25-3.25S14 11 14.25 13" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>',
    search:
      '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="4.25" stroke="currentColor" stroke-width="1.25"/><path d="m10.5 10.5 3 3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>',
    policy:
      '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 2.75h6.5L13 5.25V13.25H4V2.75Z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/><path d="M10.5 2.75V5.25H13M6 8h4M6 10.5h3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>',
    kyb:
      '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.75 13.25V6.5L8 2.75l5.25 3.75v6.75H9.5V9.25H6.5v4H2.75Z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/></svg>'
  };

  function sourcesSectionsHtml(biz) {
    var caps = TRULIOO_CAPS.map(function (cap, i) {
      var iconKey = ["ownership", "search", "policy", "kyb"][i] || "kyb";
      var tags = cap.tags
        .map(function (t) {
          return '<span class="tds-tag tds-tag--sm tds-tag--default">' + esc(t) + "</span>";
        })
        .join("");
      return (
        "<tr>" +
        '<td class="tds-data-table__text-cell tds-data-table__text-cell--subtext">' +
        '<span class="tds-data-table__cell-inner">' +
        '<span class="tds-data-table__cell-leading-visual" aria-hidden="true">' +
        (CAP_ICONS[iconKey] || CAP_ICONS.kyb) +
        "</span>" +
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

    return (
      '<div class="kyb-sources-body">' +
      '<h3 class="kyb-subsection-title">Trulioo Sources</h3>' +
      '<div class="tds-data-table-container"><div class="tds-data-table__wrapper">' +
      '<table class="tds-data-table tds-data-table--comfort kyb-sources-capabilities">' +
      "<tbody>" +
      caps +
      "</tbody></table></div></div>" +
      '<h3 class="kyb-subsection-title">Online Sources</h3>' +
      '<div class="tds-data-table-container">' +
      '<div class="tds-data-table__wrapper">' +
      '<table class="tds-data-table tds-data-table--comfort kyb-sources-online">' +
      "<thead><tr><th>Sources</th><th>Description</th><th>URL</th></tr></thead>" +
      "<tbody>" +
      online +
      "</tbody></table></div></div></div>"
    );
  }

  function renderSourcesPanel(panel, biz) {
    if (!panel || !biz) return;
    panel.innerHTML =
      '<div class="d3-kyb-tab-body d3-kyb-sources">' + sourcesSectionsHtml(biz) + "</div>";
  }

  /* ——— Additional Data ——— */
  function parseStreetParts(addr) {
    var raw = String(addr || "").split(",")[0].trim();
    var m = raw.match(/^(\d+)\s+(.+?)(?:\s+(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr))?$/i);
    if (m) {
      return {
        building: m[1],
        street: m[2],
        type: m[3] ? m[3].replace(/^St$/i, "Street").replace(/^Ave$/i, "Avenue") : "Street"
      };
    }
    return { building: "—", street: raw || "—", type: "—" };
  }

  function additionalDataForBiz(biz) {
    var report = biz.report || {};
    var ownership = Array.isArray(biz.ownership) ? biz.ownership : [];
    var ownersLine = ownership
      .map(function (o) {
        return (o.name || "") + (o.pct && o.pct !== "—" ? " (" + o.pct + ")" : "");
      })
      .filter(Boolean)
      .join("; ");
    var officer = biz.officer || {};
    var control =
      officer.fullName ||
      (ownership[0] && ownership[0].name) ||
      "Not provided";
    if (officer.position) {
      control += " (" + officer.position + ")";
    } else if (ownership[0] && ownership[0].role) {
      control += " (" + ownership[0].role + ")";
    }

    var addr = String(biz.addr || report.address || "").split(" - ")[0];
    var parts = addr.split(",").map(function (s) {
      return s.trim();
    }).filter(Boolean);
    var suiteMatch = parts[0] && parts[0].match(/^(Suite\s+\S+)/i);
    var streetSource =
      suiteMatch && parts[1] ? parts[1] : parts[0] || "";
    var streetBits = parseStreetParts(streetSource);
    var cityPart =
      (suiteMatch ? parts[2] : parts[1]) ||
      String(biz.city || "").split(",")[0] ||
      "";
    var city =
      cityPart
        .replace(/\s+[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i, "")
        .replace(/\s+[A-Z]{2}\s+\d{5}(-\d{4})?$/i, "")
        .trim() || "—";
    var postal =
      (addr.match(/\b([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})\b/i) || [])[1] ||
      (addr.match(/\b(\d{5}(?:-\d{4})?)\b/) || [])[1] ||
      "—";
    var isUk =
      biz.cc === "GB" ||
      /united kingdom|england|wales|scotland/i.test(biz.country || "");
    var state = isUk
      ? "England"
      : (parts[parts.length - 1] || "—").replace(/\d.*/, "").trim() || "—";

    var secondAddr = (ownership[0] && ownership[0].address) || officer.address2 || "";
    var secondParts = parseStreetParts(String(secondAddr).split(",")[0] || "");
    var secondState = /san francisco|,\s*ca\b/i.test(secondAddr)
      ? "CA"
      : /calgary|,\s*ab\b/i.test(secondAddr)
        ? "AB"
        : "—";
    var secondPostal =
      (secondAddr.match(/\b(\d{5}(?:-\d{4})?)\b/) || [])[1] ||
      (secondAddr.match(/\b([A-Z]\d[A-Z]\s*\d[A-Z]\d)\b/i) || [])[1] ||
      "—";

    var incDate = report.regDate || "";
    var incMatch = incDate.match(/(\d{1,2}\s+\w+\s+\d{4}|\w+\s+\d{1,2},?\s+\d{4})/i);
    if (incMatch) incDate = incMatch[1].replace(/(\d{1,2})\s+(\w+)\s+(\d{4})/, function (_, d, m, y) {
      return m.slice(0, 3) + " " + d + ", " + y;
    });
    else incDate = "Feb 1, 2019";

    var highRisk = biz.riskLevel === "high";
    var parent = ownership.find(function (o) {
      return o.type === "corp";
    });

    return {
      profile: [
        { label: "Business status", value: biz.status || "Active" },
        { label: "Business legal name", value: biz.name || "—" },
        { label: "Legal form", value: report.legalForm || biz.legalForm || "—" },
        { label: "Reference ID", value: report.regNumber || biz.reg || "—" }
      ],
      registration: [
        { label: "Incorporation date", value: incDate },
        {
          label: "Filings",
          value: highRisk
            ? "Confirmation statement overdue risk; annual accounts filed with £1 capital"
            : "Annual report filed; franchise / confirmation statement current"
        }
      ],
      ownership: [
        {
          label: "Ownership returned",
          value:
            (parent ? parent.name + " (parent); " : "") +
            (ownersLine || "Yes — see Owners & UBOs")
        },
        { label: "Significant control", value: control }
      ],
      addresses: [
        {
          label: "Address line 1",
          value: suiteMatch ? suiteMatch[1] : streetSource || "—"
        },
        { label: "Building number", value: streetBits.building },
        { label: "Street name", value: streetBits.street },
        { label: "Street type", value: streetBits.type },
        { label: "City", value: city },
        { label: "State / Province", value: state },
        { label: "Postal code", value: postal },
        { label: "Address line 1", value: secondAddr || "—" },
        { label: "Building number", value: secondParts.building },
        { label: "Street name", value: secondParts.street },
        { label: "Street type", value: secondParts.type },
        { label: "State", value: secondState },
        { label: "Postal code", value: secondPostal }
      ],
      risk: [
        {
          label: "Risk values",
          value: highRisk
            ? "Overall 87/100; Legitimacy 18; Suspicion 18; Confidence 18"
            : "Overall 32/100; Legitimacy 72; Suspicion 12; Confidence 78"
        }
      ],
      metadata: [
        {
          label: "Matching scores",
          value: highRisk ? "50% field match rate (2 of 4 fields)" : "100% field match rate (4 of 4 fields)"
        },
        {
          label: "Warnings",
          value: highRisk
            ? "Virtual office address; No verifiable national ID for officers"
            : "None"
        },
        {
          label: "Comprehensive view",
          value: highRisk ? "4 of 7 datasources responded" : "7 of 7 datasources responded"
        }
      ]
    };
  }

  function additionalSection(title, fields) {
    var grid = fields
      .map(function (f) {
        return dataField(f.label, valueText(f.value));
      })
      .join("");
    return (
      '<section class="kyb-subsection">' +
      '<div class="kyb-subsection__head">' +
      '<h3 class="kyb-subsection-title">' +
      esc(title) +
      '</h3><hr class="kyb-section-divider" /></div>' +
      '<div class="kyb-field-grid kyb-field-grid--3">' +
      grid +
      "</div></section>"
    );
  }

  function renderAdditionalPanel(panel, biz) {
    if (!panel || !biz) return;
    var data = additionalDataForBiz(biz);
    panel.innerHTML =
      '<div class="d3-kyb-tab-body d3-kyb-additional kyb-additional-data">' +
      additionalSection("Business profile", data.profile) +
      additionalSection("Registration & filings", data.registration) +
      additionalSection("Ownership & key people", data.ownership) +
      additionalSection("Addresses", data.addresses) +
      additionalSection("Risk & assessment", data.risk) +
      additionalSection("Data quality & metadata", data.metadata) +
      "</div>";
  }

  function renderAll(resumeCard, biz) {
    if (!resumeCard || !biz) return;
    renderWebPanel(resumeCard.querySelector('[data-d3-kyb-panel="web"]'), biz);
    renderMatchSignalsPanel(
      resumeCard.querySelector('[data-d3-kyb-panel="signals"]'),
      biz
    );
    renderAdditionalPanel(
      resumeCard.querySelector('[data-d3-kyb-panel="additional"]'),
      biz
    );
    /* Sources are embedded in the Match Signals & Sources tab. */
    var sourcesPanel = resumeCard.querySelector('[data-d3-kyb-panel="sources"]');
    if (sourcesPanel) {
      sourcesPanel.innerHTML =
        '<p class="d3-workspace__hint">Sources are shown under Match Signals &amp; Sources.</p>';
    }
    /* Findings is the first tab — every open path ends up here, so fill it too. */
    if (window.D3KybFindings) window.D3KybFindings.render(resumeCard, biz);
  }

  window.D3KybResultTabs = {
    renderAll: renderAll,
    renderWebPanel: renderWebPanel,
    renderMatchSignalsPanel: renderMatchSignalsPanel,
    renderAdditionalPanel: renderAdditionalPanel,
    renderSourcesPanel: renderSourcesPanel
  };
})();
