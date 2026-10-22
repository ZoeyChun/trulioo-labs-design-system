/* Verification Report Module — KYB sample payload (self-contained).
 * Copied/adapted from Demo 3 Meridian demo data so the report does not
 * read live files from demo-3/ or pages/KYB Results.
 */
(function (global) {
  "use strict";

  var ownershipGraph = {
    riskFilter: { label: "Risk Signals: High", count: 6 },
    tree: {
      id: "root",
      type: "business",
      name: "Meridian Apex Consulting Ltd.",
      subtitle: "Root Business",
      risk: "high",
      details: {
        status: "Active",
        statusTone: "positive",
        fields: [
          { label: "Country", value: "United States", flag: "US" },
          { label: "Jurisdiction", value: "Texas" },
          { label: "Business number", value: "11876542" },
          { label: "Tax ID", value: "19498172498" },
          { label: "Ownership percentage", value: "50%" },
          { label: "Degree of separation", value: "1st" },
          { label: "Business entity type", value: "Business" }
        ],
        truai:
          "Meridian Apex Consulting Ltd. is a Texas-registered entity linked to 3 connected entities. Both shareholders use a formations-agent address, and neither has a verified national ID on file.",
        prompt: "Is this a shell company?",
        findings: [
          "Both shareholders share a formations-agent address",
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
            address: "71 Stevenson St, San Francisco"
          },
          {
            id: "james",
            type: "person",
            role: "COO",
            name: "James Morton",
            pct: "65%",
            address: "71 Stevenson St, San Francisco"
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
            { id: "patricia", type: "person", name: "Patricia L.", subtitle: "Owns 15%" }
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
              { label: "Address", value: "71 Stevenson St, San Francisco" },
              { label: "Appointed", value: "Jan 2023" },
              { label: "Phone", value: "+1 979 323-7166" },
              { label: "Email", value: "mortonj@gmail.com" },
              { label: "Date of Birth", value: "1st Jan, 1990" }
            ],
            truai:
              "Ownership resolves to two shareholders at the same registered-agent address. Neither officer has a verifiable national ID.",
            prompt: "Who is the UBO?",
            findings: [
              "Both shareholders share a registered-agent address",
              "Walter Decosta linked to 2 unscreened entities",
              "No verifiable national ID for either officer"
            ],
            connected: [
              {
                id: "walter",
                type: "person",
                role: "Director",
                name: "Walter Decosta",
                address: "71 Stevenson St, San Francisco"
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
                  { label: "Address", value: "71 Stevenson St, San Francisco" }
                ],
                truai:
                  "Director appointed alongside shareholders at a registered-agent address with no verifiable national ID on file.",
                prompt: "Who is the UBO?",
                findings: [
                  "No verifiable national ID",
                  "Shares registered-agent address with shareholders"
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
      name: "James Morton",
      sub: "Shareholder",
      pct: "65%",
      address: "71 Stevenson St, San Francisco",
      status: "positive",
      statusLabel: "Clear"
    },
    {
      name: "Walter Decosta",
      sub: "Shareholder",
      pct: "35%",
      address: "71 Stevenson St, San Francisco",
      status: "negative",
      statusLabel: "2 more entities connected"
    }
  ];

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

  var sample = {
    name: "Meridian Apex Consulting Ltd.",
    country: "United States",
    cc: "US",
    city: "Wilmington, Delaware",
    addr: "Suite 400, 1 King Street, London EC2V 8AU",
    transactionId: "8c2f4e7a-19bd-4f02-a6c1-77de42915b3a",
    transactionIdShort: "8c2f4e7a-19bd-4f0...",
    date: "17 Jun 2026, 2:14 PM",
    verified: true,
    riskLevel: "low",
    riskLabel: "Verified",
    overview: {
      regNumber: "BRN 11876542",
      taxId: "GB341209876",
      status: "Active",
      sizing: "0 employees; $1 authorised / $1 paid-up capital.",
      legalForm: "Private company limited by shares",
      address:
        "Suite 400, 1 King Street, London EC2V 8AU - virtual office at a formations-agent suite; no operational premises.",
      industry: "Registered under SIC 70229",
      industryNote:
        "(management consultancy activities), a catch-all code.\nNo evidence of active trading, clients, or revenue.",
      regDate: "Incorporated 1 Feb 2019 (England & Wales)",
      phone: "+1 280 794 0000",
      email: "info@meridianapexconsulting.co.uk",
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
        address: "71 Stevenson St, San Francisco",
        type: "person"
      },
      {
        name: "Walter Decosta",
        role: "Shareholder",
        pct: "35%",
        address: "71 Stevenson St, San Francisco",
        type: "person",
        flagged: true,
        screeningLabel: "2 more entities connected"
      }
    ],
    ownershipGraph: ownershipGraph,
    ownershipTableRows: ownershipTableRows,
    officer: officer,
    report: {
      email: "info@meridianapexconsulting.co.uk",
      legalForm: "Private company limited by shares"
    }
  };

  global.VerificationReportKybData = {
    sample: sample,
    ownershipGraph: ownershipGraph,
    ownershipTableRows: ownershipTableRows,
    officer: officer
  };
})(typeof window !== "undefined" ? window : globalThis);
