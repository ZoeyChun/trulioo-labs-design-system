/* Verification Module V3 — Meridian Capital LLC payload.
 *
 * Transcribed from the Demo 3 report for Meridian Capital LLC
 * (portal-2.0/demo-3, business `us-cap`) as it actually renders across the
 * Overview, Risk Analysis, Match Signals, Owners & UBOs, Web Insights and
 * Additional Data tabs. Values here are demo-3's values, not new ones.
 *
 * Loaded AFTER assets/verification-report/products/kyb/data/kyb-sample-data.js
 * so it replaces that sample for this page only — V1 and V2 keep the shared
 * Meridian Apex Consulting Ltd. payload.
 */
(function (global) {
  "use strict";

  var NAME = "Meridian Capital LLC";
  var ADDRESS = "200 Vesey Street, New York, NY 10281";
  var OWNER_ADDRESS = "71 Stevenson St, San Francisco";

  /* Owners & UBOs tab — demo-3 renders this tree for Meridian Capital LLC. */
  var ownershipGraph = {
    riskFilter: { label: "Risk Signals: High", count: 6 },
    tree: {
      id: "root",
      type: "business",
      name: NAME,
      subtitle: "Root Business",
      risk: "high",
      details: {
        status: "Active",
        statusTone: "positive",
        fields: [
          { label: "Country", value: "United States", flag: "US" },
          { label: "Jurisdiction", value: "New York" },
          { label: "Business number", value: "NY DOS 4417762" },
          { label: "Tax ID", value: "13-4417762" },
          { label: "Degree of separation", value: "1st" },
          { label: "Business entity type", value: "Business" }
        ],
        truai:
          NAME +
          " is a New York-registered entity linked to 3 connected entities. Both shareholders use the same San Francisco address, and neither has a verified national ID on file.",
        prompt: "Is this a shell company?",
        findings: [
          "Both shareholders share one address",
          "Walter Decosta linked to 2 unscreened entities",
          "No verifiable national ID for either officer"
        ],
        connected: [
          {
            id: "steven",
            type: "person",
            role: "Shareholder",
            name: "Steven",
            pct: "35%",
            address: OWNER_ADDRESS
          },
          {
            id: "james",
            type: "person",
            role: "COO",
            name: "James Morton",
            pct: "65%",
            address: OWNER_ADDRESS
          },
          {
            id: "apex",
            type: "business",
            role: "Subsidiary Company",
            name: "Apex Financial",
            address: "100 N Riverside Plaza, Chicago"
          }
        ]
      },
      children: [
        {
          id: "steven",
          type: "person",
          name: "Steven",
          subtitle: "Owns 35%",
          moreHidden: [
            {
              id: "patricia",
              type: "person",
              name: "Patricia L.",
              subtitle: "Owns 15%"
            }
          ]
        },
        {
          id: "james",
          type: "person",
          name: "James Morton",
          subtitle: "Owns 65%",
          risk: "high",
          details: {
            status: "Active",
            statusTone: "positive",
            fields: [
              { label: "Ownership %", value: "65%" },
              { label: "Position", value: "Chief Operating Officer" },
              { label: "Country", value: "United States" },
              { label: "Address", value: OWNER_ADDRESS },
              { label: "Appointed", value: "Jan 2023" },
              { label: "Phone", value: "+1 979 323-7166" },
              { label: "Email", value: "mortonj@gmail.com" },
              { label: "Date of Birth", value: "1st Jan, 1990" }
            ],
            truai:
              "Ownership resolves to two shareholders at the same address. Neither officer has a verifiable national ID.",
            prompt: "Who is the UBO?",
            findings: [
              "Both shareholders share one address",
              "Walter Decosta linked to 2 unscreened entities",
              "No verifiable national ID for either officer"
            ],
            connected: [
              {
                id: "walter",
                type: "person",
                role: "Director",
                name: "Walter Decosta",
                address: OWNER_ADDRESS
              }
            ]
          },
          children: [
            {
              id: "walter",
              type: "person",
              name: "Walter Decosta",
              subtitle: "Director",
              risk: "high",
              details: {
                status: "Active",
                statusTone: "positive",
                fields: [
                  { label: "Position", value: "Director" },
                  { label: "Country", value: "United States" },
                  { label: "Address", value: OWNER_ADDRESS }
                ],
                truai:
                  "Director appointed alongside shareholders at the same address with no verifiable national ID on file.",
                prompt: "Who is the UBO?",
                findings: [
                  "No verifiable national ID",
                  "Shares an address with the other shareholder"
                ]
              }
            }
          ]
        }
      ]
    }
  };

  var ownershipTableRows = [
    {
      type: "person",
      name: "James Morton",
      sub: "Shareholder",
      pct: "65%",
      address: OWNER_ADDRESS,
      status: "positive",
      statusLabel: "Clear"
    },
    {
      type: "person",
      name: "Walter Decosta",
      sub: "Shareholder",
      pct: "35%",
      address: OWNER_ADDRESS,
      status: "negative",
      statusLabel: "2 more entities connected"
    }
  ];

  /* Directors, Officers & PSCs — demo-3 Owners & UBOs tab. */
  var officer = {
    givenName: "MARK",
    surname: "WILLIAMSON",
    fullName: "MARK WILLIAMSON",
    nationalId: "123415",
    dob: "1976-02-12",
    position: "CHIEF OPERATING OFFICER",
    designation: "Not provided",
    type: "Individual",
    status: "Active",
    beginDate: "2017-07-18",
    endDate: "2020-01-12",
    address1: "1 SW Bow Street, Portland, OR 97005-6453",
    address1Note: "Primary registered address",
    address2: "22 CALGARY AVENUE, Suite 400, Calgary, AB",
    address2Note: "Second address — partially visible, remainder not available"
  };

  /* Match Signals tab — demo-3 datasource names and per-field results. */
  function sources(status) {
    return [
      { name: "Business Documents 323100", status: status[0] },
      { name: "Business Insights 344568", status: status[1] },
      { name: "Business Insights 773174", status: status[2] },
      { name: "Ownership Tree 480052", status: status[3] }
    ];
  }

  var matchSignals = {
    verified: true,
    rule: "Verification Rule: KYB Standard: 1 Records Match (BRN)",
    metrics: { fields: "4 fields", sources: "4 of 4 datasources" },
    rows: [
      {
        id: "business-name",
        field: "Business Name",
        input: NAME,
        status: "match",
        sources: "4/4 matched",
        sourceRows: sources(["match", "match", "match", "match"])
      },
      {
        id: "jurisdiction",
        field: "Jurisdiction of Incorporation",
        input: "NY",
        status: "match",
        sources: "4/4 matched",
        sourceRows: sources(["match", "match", "match", "match"])
      },
      {
        id: "city",
        field: "City",
        input: "New York",
        status: "match",
        sources: "3/4 matched",
        sourceRows: sources(["match", "match", "match", "missing"])
      },
      {
        id: "state-province",
        field: "State Province",
        input: "NY",
        status: "match",
        sources: "4/4 matched",
        sourceRows: sources(["match", "match", "match", "match"])
      }
    ]
  };

  /* Risk Analysis tab — category scores, bands and the overall 87/100. */
  var riskCategories = [
    { label: "Business Model", score: 84, risk: "high" },
    { label: "Financial Health", score: 68, risk: "high" },
    { label: "Fraud & Financial Crimes", score: 63, risk: "high" },
    { label: "Governance & Compliance", score: 52, risk: "medium" },
    { label: "Third-Party & Market", score: 57, risk: "medium" }
  ];

  /* Web Insights tab. */
  var socialProfile = {
    name: NAME,
    shortName: "Meridian Capital",
    handle: "meridiancapitall",
    domain: "meridiancapital.com",
    email: "compliance@meridiancapital.example",
    linkedinAbout: "Management consultancy services for enterprise clients.",
    instagramAbout: "Professional services.",
    tiktokBiography: "Professional services",
    industries: ["Management Consulting", "Professional Services"],
    specialities: ["Business advisory", "Corporate governance", "Risk consulting"],
    businessCategory: "Management Consulting",
    category: "Professional Services",
    orgType: "Limited liability company",
    companySize: "11–50 employees",
    employees: "24",
    founded: "2019",
    locations: ["New York, United States"],
    headquarters: "New York, United States",
    countryCodes: ["US"],
    linkedinFollowers: "184",
    instagramFollowers: "48",
    instagramFollowing: "3",
    instagramPostCount: "0",
    highlightsCount: "0",
    avgEngagement: "0%",
    twitterFollowers: "7",
    twitterFollowing: "2",
    twitterSubscriptions: "0",
    twitterPostCount: "3",
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
    highRisk: false,
    websiteStatus: "Active — live site responding",
    domainRegistrar: "GoDaddy.com, LLC",
    domainRegistered: "1 Feb 2019",
    domainExpires: "1 Feb 2027"
  };

  var DE_SEARCH =
    "https://icis.corp.delaware.gov/ecorp/entitysearch/NameSearch.aspx?fileNumber=4417762";

  var onlineSources = [
    {
      name: "Delaware Division of Corporations",
      desc: "Company filings",
      url: DE_SEARCH
    },
    {
      name: "Delaware Division of Corporations",
      desc: "Persons with significant control",
      url: DE_SEARCH
    },
    { name: "WHOIS", desc: "Domain registration record", url: DE_SEARCH },
    {
      name: "BVI Financial Services Commission",
      desc: "Registry (no public disclosure)",
      url: DE_SEARCH
    },
    { name: "Trulioo Business Verification", desc: "Internal record", url: DE_SEARCH }
  ];

  var sample = {
    name: NAME,
    country: "United States",
    cc: "US",
    city: "New York, NY",
    addr: ADDRESS,
    transactionId: "8c2f4e7a-19bd-4f02-a6c1-77de42915b3a",
    transactionIdShort: "8c2f4e7a-19bd-4f0...",
    date: "17 Jun 2026, 2:14 PM",
    /* Registry match is Verified in Demo 3; the risk verdict is separate. */
    verified: true,
    riskLevel: "high",
    riskLabel: "High Risk",
    riskScore: 87,
    ownerDepth: "2 layers",
    riskCategories: riskCategories,
    /* Demo 3 Overview verdict. ** ** marks the phrases the board highlights. */
    heroLede: [
      NAME + " **required manual review.**",
      "**9 of 16 verification signals flagged**, including unverified beneficial ownership and incomplete financial records.",
      "**Business legitimacy score 18/100** with $0 reported revenue, 0 employees, and no verifiable operating history.",
      "**Both officers lack national ID verification**, and web presence shows medium risk indicators across social and domain signals."
    ],
    suggestedActions: [
      { label: "View Beneficial Owner", target: "ownership" },
      { label: "Review Web Presence", target: "web" }
    ],
    overview: {
      regNumber: "NY DOS 4417762",
      taxId: "EIN 13-4417762",
      status: "Active",
      sizing: "0 employees; $0 reported revenue.",
      legalForm: "Limited liability company",
      address:
        ADDRESS +
        " - address shared with multiple unrelated entities; no confirmed operating premises.",
      industry: "Management consultancy activities (NAICS 541611)",
      industryNote:
        "A catch-all consultancy code.\nNo evidence of active trading, clients, or revenue.",
      regDate: "Incorporated 1 Feb 2019 (New York)",
      phone: "+1 (212) 946-2100",
      email: "compliance@meridiancapital.example",
      alerts: [
        "Adverse Media: None found",
        "Sanctions: None found",
        "Litigation: None found",
        "Positive Press: None found"
      ]
    },
    ownership: [
      {
        name: "James Morton",
        role: "Shareholder",
        pct: "65%",
        address: OWNER_ADDRESS,
        type: "person",
        statusLabel: "Clear"
      },
      {
        name: "Walter Decosta",
        role: "Shareholder",
        pct: "35%",
        address: OWNER_ADDRESS,
        type: "person",
        flagged: true,
        screeningLabel: "2 more entities connected"
      }
    ],
    ownershipGraph: ownershipGraph,
    ownershipTableRows: ownershipTableRows,
    officer: officer,
    matchSignals: matchSignals,
    socialProfile: socialProfile,
    onlineSources: onlineSources,
    report: {
      legalForm: "Limited liability company",
      regNumber: "NY DOS 4417762",
      taxId: "EIN 13-4417762",
      address: ADDRESS,
      phone: "+1 (212) 946-2100",
      email: "compliance@meridiancapital.example",
      sumA:
        NAME +
        " matched an active New York DOS filing, but ownership, financial and presence signals still require manual review."
    }
  };

  global.VerificationReportKybData = {
    sample: sample,
    ownershipGraph: ownershipGraph,
    ownershipTableRows: ownershipTableRows,
    officer: officer
  };
})(typeof window !== "undefined" ? window : globalThis);
