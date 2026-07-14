(() => {
  // src/gauge.ts
  var NS = "http://www.w3.org/2000/svg";
  var CX = 113.526;
  var CY = 121.53;
  var R_OUTER = 95.53;
  var R_INNER = 76.43;
  var R_DARK = R_OUTER - 5;
  var POINTER_R = 73;
  var START = 160;
  var SWEEP = 220;
  var TRACK = "#f4f6f4";
  var POINTER = "#004c45";
  var NUMBER = "#172d2d";
  var DURATION = 1400;
  var PAL = {
    high: { fill: "#fff1f1", border: "#db2b2b", tag: "#ba151d" },
    medium: { fill: "#fff4db", border: "#d8a13b", tag: "#775516" },
    low: { fill: "#eaf7f0", border: "#6fb38a", tag: "#166534" }
  };
  function polar(deg, r) {
    const a = deg * Math.PI / 180;
    return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
  }
  function sector(s, e, rO, rI) {
    const sweep = ((e - s) % 360 + 360) % 360;
    if (sweep < 0.05) return "";
    const lg = sweep > 180 ? 1 : 0;
    const o1 = polar(s, rO);
    const o2 = polar(e, rO);
    const i2 = polar(e, rI);
    const i1 = polar(s, rI);
    return `M${o1[0]} ${o1[1]} A${rO} ${rO} 0 ${lg} 1 ${o2[0]} ${o2[1]} L${i2[0]} ${i2[1]} A${rI} ${rI} 0 ${lg} 0 ${i1[0]} ${i1[1]} Z`;
  }
  function mk(tag, attrs, parent) {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, String(v));
    }
    if (parent) parent.appendChild(el);
    return el;
  }
  function renderGauge(container) {
    var _a, _b, _c, _d, _e;
    const score = parseFloat((_a = container.getAttribute("data-score")) != null ? _a : "") || 0;
    const max = parseFloat((_b = container.getAttribute("data-max")) != null ? _b : "") || 100;
    const pal = (_d = PAL[(_c = container.getAttribute("data-risk")) != null ? _c : ""]) != null ? _d : PAL.high;
    const label = (_e = container.getAttribute("data-label")) != null ? _e : "";
    container.innerHTML = "";
    const svg = mk(
      "svg",
      { width: 227, height: 180, viewBox: "0 0 227 180", overflow: "visible" },
      null
    );
    container.appendChild(svg);
    mk("path", { d: sector(START, START + SWEEP, R_OUTER, R_INNER), fill: TRACK }, svg);
    const fl = mk("path", { fill: pal.fill, d: "" }, svg);
    const fd = mk("path", { fill: pal.border, d: "" }, svg);
    const pw = mk(
      "polygon",
      {
        points: "0,-12 8.5,6.5 -8.5,6.5",
        fill: "#fff",
        stroke: "#fff",
        "stroke-width": 4,
        "stroke-linejoin": "round"
      },
      svg
    );
    const pg = mk(
      "polygon",
      {
        points: "0,-7 7,5.5 -7,5.5",
        fill: POINTER,
        "stroke-linejoin": "round"
      },
      svg
    );
    const txt = mk(
      "text",
      {
        x: CX,
        y: 101,
        "text-anchor": "middle",
        "dominant-baseline": "middle",
        style: `font-size:64px;font-weight:400;fill:${NUMBER};font-family:inherit;`
      },
      svg
    );
    txt.textContent = "0";
    const fo = mk(
      "foreignObject",
      { x: CX - 70, y: 125, width: 140, height: 30, overflow: "visible" },
      svg
    );
    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;align-items:center;justify-content:center;height:100%;";
    const badge = document.createElement("span");
    badge.textContent = label;
    badge.style.cssText = `display:inline-flex;align-items:center;background:${pal.fill};border:1px solid ${pal.border};color:${pal.tag};border-radius:9999px;padding:4px 8px;font-size:12px;font-weight:510;white-space:nowrap;line-height:16px;font-family:inherit;`;
    wrap.appendChild(badge);
    fo.appendChild(wrap);
    let t0 = null;
    function anim(now) {
      if (t0 === null) t0 = now;
      const raw = Math.min((now - t0) / DURATION, 1);
      const v = score * (1 - Math.pow(1 - raw, 4));
      if (v > 0.3) {
        const end = START + v / max * SWEEP;
        fl.setAttribute("d", sector(START, end, R_OUTER, R_INNER));
        fd.setAttribute("d", sector(START, end, R_OUTER, R_DARK));
        const p = polar(end, POINTER_R);
        const tf = `translate(${p[0]},${p[1]}) rotate(${end + 90})`;
        pw.setAttribute("transform", tf);
        pg.setAttribute("transform", tf);
        pw.style.display = "";
        pg.style.display = "";
      } else {
        fl.setAttribute("d", "");
        fd.setAttribute("d", "");
        pw.style.display = "none";
        pg.style.display = "none";
      }
      txt.textContent = String(Math.round(v));
      if (raw < 1) requestAnimationFrame(anim);
    }
    requestAnimationFrame(anim);
  }
  function renderGauges(root) {
    const scope = root;
    scope.querySelectorAll(".dv-di-gauge[data-score]").forEach(renderGauge);
  }

  // src/icons.ts
  var ICON_CHEVRON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 4l4 4-4 4"/></svg>';
  var ICON_CHEVRON_DOWN = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6l4 4 4-4"/></svg>';
  var ICON_ACCEPTED = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6.5"/><path d="M5.5 8l1.8 1.8 3.2-3.6"/></svg>';
  var ICON_DECLINED = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6.5"/><path d="M5.8 5.8l4.4 4.4M10.2 5.8l-4.4 4.4"/></svg>';
  var ICON_REVIEW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6.5"/><path d="M8 5v4M8 11h.01"/></svg>';
  var ICON_NOT_DETECTED = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6.5"/><path d="M5 8h6"/></svg>';
  var ICON_RISK = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M8 2L1.5 14h13z"/><path d="M8 6.5v3.3M8 11.7h.01"/></svg>';
  var ICON_EXPAND_ALL = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 4h9M5 8h9M5 12h9M2 4h.01M2 8h.01M2 12h.01"/></svg>';
  var ICON_PLUS = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg>';
  var ICON_MINUS = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 8h10"/></svg>';
  var ICON_SORT = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 6.5L8 3.5l3 3M5 9.5l3 3 3-3"/></svg>';
  var ICON_FLAG = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 14V2.5h7l-1.6 2.6L11 8H4"/></svg>';
  var ICON_NOTE_THUMB = '<svg viewBox="0 0 93 93" aria-hidden="true"><rect width="93" height="93" fill="var(--surface-neutral-03)"/><circle cx="46" cy="38" r="18" fill="var(--border-strong)"/><path d="M16 90c0-17 13-27 30-27s30 10 30 27z" fill="var(--border-strong)"/></svg>';

  // src/badges.ts
  function toneClass(tone, size = "sm") {
    return `tds-tag tds-tag--${tone} tds-tag--${size}`;
  }
  function kindToStatusClass(kind) {
    switch (kind) {
      case "accepted":
      case "exact-match":
      case "partial-match":
      case "match":
      case "no-risk":
      case "clean":
        return "dv-status dv-status--positive";
      case "declined":
      case "risk":
      case "flagged":
        return "dv-status dv-status--negative";
      case "review":
      case "inconclusive":
        return "dv-status dv-status--intermediate";
      case "not-run":
      case "not-detected":
      default:
        return "dv-status";
    }
  }
  function kindIcon(kind) {
    switch (kind) {
      case "accepted":
      case "exact-match":
      case "partial-match":
      case "match":
      case "no-risk":
      case "clean":
        return ICON_ACCEPTED;
      case "declined":
      case "flagged":
        return ICON_DECLINED;
      case "review":
      case "inconclusive":
        return ICON_REVIEW;
      case "risk":
        return ICON_RISK;
      case "not-run":
      case "not-detected":
      default:
        return ICON_NOT_DETECTED;
    }
  }
  function rowSignalTone(kind) {
    switch (kind) {
      case "accepted":
      case "exact-match":
      case "partial-match":
      case "no-risk":
      case "clean":
        return "positive";
      case "declined":
      case "flagged":
      case "risk":
        return "negative";
      case "review":
      case "inconclusive":
        return "intermediate";
      case "match":
        return "positive";
      case "not-run":
      case "not-detected":
      default:
        return "default";
    }
  }
  function groupTone(group) {
    switch (group.key) {
      case "declined":
        return "negative";
      case "review":
        return "intermediate";
      case "accepted":
      case "exact-match":
      case "partial-match":
        return "positive";
      case "known-faces":
        if (group.rows.length === 0) return "default";
        return rowSignalTone(group.rows[0].kind);
      case "not-run":
      case "not-detected":
      default:
        return "default";
    }
  }
  function deriveHeaderBadges(groups) {
    const badges = [];
    for (const group of groups) {
      if (group.rows.length === 0) continue;
      const text = group.countLabel !== void 0 ? group.countLabel : `${group.rows.length} ${group.label}`;
      badges.push({ text, tone: groupTone(group) });
    }
    return badges;
  }
  function deriveDiGroupBadges(rows) {
    let risk2 = 0;
    let noRisk2 = 0;
    let notRun2 = 0;
    for (const row of rows) {
      if (row.insight === "Risk") risk2 += 1;
      else if (row.insight === "No Risk") noRisk2 += 1;
      else notRun2 += 1;
    }
    const badges = [];
    if (risk2 > 0) badges.push({ text: `${risk2} Risk`, tone: "negative" });
    if (noRisk2 > 0) badges.push({ text: `${noRisk2} No Risk`, tone: "positive" });
    if (notRun2 > 0) badges.push({ text: `${notRun2} Not Run`, tone: "default" });
    return badges;
  }

  // src/deep-merge.ts
  function isPlainObject(value) {
    if (value === null || typeof value !== "object") {
      return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
  }
  function deepMerge(base, override) {
    if (Array.isArray(base) || Array.isArray(override)) {
      const source = Array.isArray(override) ? override : Array.isArray(base) ? base : [];
      return source.slice();
    }
    if (!isPlainObject(base) || !isPlainObject(override)) {
      return override === void 0 ? base : override;
    }
    const merged = { ...base };
    for (const [key, overrideValue] of Object.entries(override)) {
      const baseValue = merged[key];
      merged[key] = baseValue !== void 0 && overrideValue !== void 0 ? deepMerge(baseValue, overrideValue) : overrideValue;
    }
    return merged;
  }

  // src/scenario-data.ts
  var accepted = (title, sub) => ({
    title,
    sub,
    result: "Accepted",
    kind: "accepted"
  });
  var notDetected = (title) => ({
    title,
    result: "Not detected",
    kind: "not-detected"
  });
  var exactMatch = (title, value) => ({
    title,
    sub: `Input: ${value} \xB7 Extracted: ${value}`,
    result: "Exact Match",
    kind: "exact-match"
  });
  var noRisk = (title, result) => ({
    title,
    result,
    insight: "No Risk"
  });
  var risk = (title, result = "High") => ({
    title,
    result,
    insight: "Risk"
  });
  var notRun = (title, result = "Not Run") => ({
    title,
    result,
    insight: "Not Run"
  });
  var emptyGroup = (key, label, emptyState, extras = {}) => ({
    key,
    label,
    rows: [],
    emptyState,
    ...extras
  });
  var documentAcceptedRows = [
    accepted("Document status", "Document verification passed"),
    accepted("Expiry check", "Document has not expired"),
    accepted("Security features", "Security features verified"),
    accepted("Barcode integrity", "Barcode validated"),
    accepted("Known document type", "Document type recognized"),
    accepted("Given name cross-check", "Given name matches applicant input"),
    accepted("Surname cross-check", "Surname matches applicant input"),
    accepted("DOB cross-check", "Date of birth matches applicant input"),
    accepted("Document number cross-check", "Document number matches applicant input"),
    accepted("Expiry cross-check", "Expiry date matches extracted data"),
    accepted("Image quality", "Image quality acceptable"),
    accepted("Face match", "Document photo and selfie matched"),
    accepted("Screen replay", "No screen replay detected"),
    accepted("Printout detection", "No printout detected")
  ];
  var withoutAcceptedTitle = (title) => documentAcceptedRows.filter((row) => row.title !== title);
  var documentGroups = (groups, helper) => {
    var _a, _b, _c, _d;
    return {
      helper,
      groups: [
        ((_a = groups.declined) == null ? void 0 : _a.length) ? { key: "declined", label: "Declined", rows: groups.declined } : emptyGroup("declined", "Declined", "No declined checks."),
        ((_b = groups.review) == null ? void 0 : _b.length) ? { key: "review", label: "Review", rows: groups.review } : emptyGroup("review", "Review", "No checks require review."),
        {
          key: "accepted",
          label: "Accepted",
          rows: (_c = groups.accepted) != null ? _c : documentAcceptedRows
        },
        ((_d = groups.notRun) == null ? void 0 : _d.length) ? { key: "not-run", label: "Not Run", rows: groups.notRun } : emptyGroup("not-run", "Not Run", "No checks were skipped.")
      ]
    };
  };
  var biometricAcceptedRows = [
    accepted("Face match verification", "Face Match"),
    accepted("Face liveness", "Liveness & anti-spoof"),
    accepted("Face detected", "Liveness & anti-spoof"),
    accepted("Single face", "Liveness & anti-spoof"),
    accepted("Eyes open", "Image quality"),
    accepted("Face centered", "Image quality"),
    accepted("Lighting sufficient", "Image quality"),
    accepted("Image sharpness", "Image quality"),
    accepted("Pose acceptable", "Image quality"),
    accepted("Occlusion check", "No significant obstruction"),
    accepted("Age consistency", "Document and selfie appear consistent"),
    accepted("Capture integrity", "Valid camera capture")
  ];
  var biometricNotDetectedRows = [
    notDetected("Spoof attempt"),
    notDetected("Injection attack"),
    notDetected("Deepfake indicators")
  ];
  var knownFacesEmpty = (emptyState = "No matching faces were found in previous high-risk or declined transactions.") => emptyGroup("known-faces", "Known Faces", emptyState, {
    countLabel: "No matches"
  });
  var exactMatchRows = [
    exactMatch("First name", "Jane"),
    exactMatch("Last name", "Doe"),
    exactMatch("Date of birth", "1986/03/24"),
    exactMatch("Document number", "D1234567"),
    exactMatch("Expiry date", "2028/03/20"),
    exactMatch("Country", "United States")
  ];
  var partialMatchEmpty = emptyGroup(
    "partial-match",
    "Partial Match",
    "No partial or conflicting data matches were found."
  );
  var happyNiMetrics = [
    { label: "Transactions affected", value: "0" },
    { label: "Identity conflicts", value: "0" },
    { label: "First seen", value: "Current transaction" },
    { label: "Most recent", value: "Current transaction" }
  ];
  var cleanNetworkInsights = (messages) => {
    var _a, _b, _c;
    return {
      headerStatus: "Clean",
      headerTone: "positive",
      flagged: [],
      clean: [
        {
          id: "synthetic-identity",
          title: "Synthetic identity",
          status: "clean",
          primaryMessage: (_a = messages == null ? void 0 : messages.synthetic) != null ? _a : "No evidence that this face has been used with different identity or document data.",
          metrics: happyNiMetrics
        },
        {
          id: "document-conflict",
          title: "Document conflict",
          status: "clean",
          primaryMessage: (_b = messages == null ? void 0 : messages.document) != null ? _b : "No conflicting document numbers or identity attributes were found across previous transactions.",
          metrics: happyNiMetrics
        },
        {
          id: "ip-velocity",
          title: "IP Velocity Anomaly",
          status: "clean",
          primaryMessage: (_c = messages == null ? void 0 : messages.ip) != null ? _c : "No unusual IP, country or transaction velocity patterns were detected.",
          metrics: happyNiMetrics
        }
      ]
    };
  };
  var happyDeviceEvidence = [
    {
      key: "risk-outputs",
      label: "Risk Outputs",
      rows: [
        noRisk("Device Risk Level", "Low"),
        noRisk("Session Risk", "Low"),
        noRisk("Automation", "Not detected"),
        noRisk("Fraud indicators", "None")
      ]
    },
    {
      key: "network-location",
      label: "Network & Location",
      rows: [
        noRisk("VPN", "No"),
        noRisk("Proxy", "No"),
        noRisk("TOR", "No"),
        noRisk("IP reputation", "Clean"),
        noRisk("Location consistency", "Match")
      ]
    },
    {
      key: "integrity-compromise",
      label: "Integrity & Compromise",
      rows: [
        noRisk("Emulator", "No"),
        noRisk("Root or jailbreak", "No"),
        noRisk("Debugging tools", "No")
      ]
    },
    {
      key: "device-identity-history",
      label: "Device Identity & History",
      rows: [
        noRisk("First-party device", "Yes"),
        noRisk("Identity count", "1"),
        noRisk("Stable fingerprint", "Yes"),
        noRisk("Prior fraud", "None")
      ]
    },
    {
      key: "behavioral-biometrics",
      label: "Behavioral Biometrics",
      rows: [
        noRisk("Natural interaction", "Yes"),
        noRisk("Automation pattern", "Not detected")
      ]
    },
    {
      key: "location-history",
      label: "Location History",
      rows: [
        noRisk("Current location consistent", "Yes"),
        noRisk("Impossible travel", "Not detected")
      ]
    }
  ];
  function normalizeDiEvidence(evidence) {
    const byKey = new Map(evidence.map((group) => [group.key, group]));
    return happyDeviceEvidence.map((template) => {
      const match = byKey.get(template.key);
      return match != null ? match : {
        key: template.key,
        label: template.label,
        rows: []
      };
    });
  }
  var happyDeviceDetails = [
    { label: "Device ID", value: "3045489E05849546" },
    { label: "Device model", value: "iPhone 15" },
    { label: "Operating system", value: "iOS 18" },
    { label: "Browser", value: "Mobile Safari" },
    { label: "First seen", value: "05 July 2026, 3:30pm" },
    { label: "Language", value: "en-US" },
    { label: "Timezone", value: "UTC-07" },
    { label: "Battery", value: "68%" }
  ];
  var lowRiskDevice = (summary, score = 1) => ({
    score,
    risk: "low",
    riskLabel: "Low Risk",
    summary,
    indicators: [
      "Trusted browser and operating system",
      "Stable location and timezone",
      "No shared-device activity"
    ],
    deviceId: "3045489E05849546",
    firstSeenLabel: "First seen",
    deviceDetails: happyDeviceDetails,
    evidence: happyDeviceEvidence
  });
  var happySummary = [
    { label: "Document", value: "Accepted", tone: "positive" },
    { label: "Biometrics", value: "Accepted", tone: "positive" },
    { label: "Known Faces", value: "No Match", tone: "default" },
    { label: "Data Match", value: "6 Exact Matches", tone: "positive" },
    { label: "Device Intelligence", value: "Low Risk", tone: "positive" }
  ];
  var happyPath = {
    id: "happy-path",
    label: "Happy path",
    selectDesc: "All checks passed. Clean document and biometrics.",
    overallStatus: "Accepted",
    overallTone: "positive",
    defaultTab: "document",
    transactionId: "8c2f4e7a-19bd-4f02-a6c1-77de42915b3a",
    truAiSummary: "Jane Doe\u2019s identity has been verified. All required checks passed and no additional review is needed.",
    summaryRows: happySummary,
    documentInfo: {
      documentType: "Driver's License",
      documentNumber: "D1234567",
      issuingState: "California",
      expiryDate: "2028/03/20",
      documentStatus: "Valid",
      authenticity: "Verified"
    },
    document: documentGroups({ accepted: documentAcceptedRows }),
    biometrics: {
      groups: [
        { key: "accepted", label: "Accepted", rows: biometricAcceptedRows },
        {
          key: "not-detected",
          label: "Not detected",
          rows: biometricNotDetectedRows
        },
        knownFacesEmpty()
      ]
    },
    dataMatch: {
      groups: [
        { key: "exact-match", label: "Exact Matches", rows: exactMatchRows },
        partialMatchEmpty
      ]
    },
    networkInsights: cleanNetworkInsights(),
    deviceIntelligence: lowRiskDevice(
      "Device activity is consistent with a normal verification session. No suspicious device, network or behavioral indicators were detected.",
      4
    )
  };
  var knownFaceTransactions = [
    {
      date: "14 Sep 2025, 9:14 AM",
      id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
      differences: ["Person", "Document", "DOB"],
      result: "Declined"
    },
    {
      date: "02 Dec 2025, 4:28 PM",
      id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
      differences: ["Person", "Address"],
      result: "Declined"
    },
    {
      date: "19 Mar 2026, 11:06 AM",
      id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
      differences: ["Document", "IP Address"],
      result: "Accepted"
    },
    {
      date: "17 Jun 2026, 2:14 PM",
      id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
      differences: ["Current transaction"],
      result: "Declined"
    }
  ];
  var knownFaceDocumentConflictTransactions = [
    {
      date: "14 Sep 2025, 9:14 AM",
      id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
      differences: ["Document"],
      result: "Declined"
    },
    {
      date: "02 Dec 2025, 4:28 PM",
      id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
      differences: ["Document", "Person"],
      result: "Declined"
    },
    {
      date: "19 Mar 2026, 11:06 AM",
      id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
      differences: [],
      result: "Accepted"
    },
    {
      date: "17 Jun 2026, 2:14 PM",
      id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
      differences: [],
      result: "Accepted"
    }
  ];
  var knownFaceDeviceEvidence = [
    {
      key: "risk-outputs",
      label: "Risk Outputs",
      rows: [
        risk("Device Risk Level"),
        risk("Shared Device Risk"),
        risk("Identity Velocity"),
        risk("Prior Fraud Association")
      ]
    },
    {
      key: "network-location",
      label: "Network & Location",
      rows: [
        risk("IP reputation"),
        risk("Location velocity"),
        noRisk("VPN", "No"),
        noRisk("Proxy", "No"),
        notRun("TOR")
      ]
    },
    {
      key: "integrity-compromise",
      label: "Integrity & Compromise",
      rows: [
        noRisk("Emulator", "No"),
        noRisk("Rooted device", "No"),
        notRun("Debugging tools")
      ]
    },
    {
      key: "device-identity-history",
      label: "Device Identity & History",
      rows: [
        risk("Multiple identities"),
        risk("Previous declined transaction"),
        noRisk("Stable device fingerprint", "Yes"),
        noRisk("Device age", "Normal"),
        notRun("Account linkage")
      ]
    },
    {
      key: "behavioral-biometrics",
      label: "Behavioral Biometrics",
      rows: [
        risk("Repeated identity switching"),
        noRisk("Interaction pattern", "Normal")
      ]
    },
    {
      key: "location-history",
      label: "Location History",
      rows: [
        risk("Rapid country change"),
        noRisk("Current IP-to-timezone consistency", "Match")
      ]
    }
  ];
  var deepfakeDeviceEvidence = [
    {
      key: "risk-outputs",
      label: "Risk Outputs",
      rows: [
        risk("Device Risk Level"),
        risk("Capture Integrity Risk"),
        risk("Virtual Camera Risk"),
        noRisk("IP reputation", "Clean")
      ]
    },
    {
      key: "network-location",
      label: "Network & Location",
      rows: [
        noRisk("VPN", "No"),
        noRisk("Proxy", "No"),
        noRisk("TOR", "No"),
        noRisk("IP reputation", "Clean"),
        notRun("Location history")
      ]
    },
    {
      key: "integrity-compromise",
      label: "Integrity & Compromise",
      rows: [
        risk("Virtual camera interface"),
        risk("Media injection indicators"),
        noRisk("Root or admin compromise", "No")
      ]
    },
    {
      key: "device-identity-history",
      label: "Device Identity & History",
      rows: [
        risk("First-seen device"),
        noRisk("Multiple identities", "No"),
        noRisk("Previous fraud association", "None"),
        noRisk("Device fingerprint stability", "Yes")
      ]
    },
    {
      key: "behavioral-biometrics",
      label: "Behavioral Biometrics",
      rows: [
        risk("Frame timing inconsistency"),
        risk("Unnatural facial motion")
      ]
    },
    {
      key: "location-history",
      label: "Location History",
      rows: [noRisk("Current IP and timezone consistent", "Yes")]
    }
  ];
  var scenarioOverrides = {
    "expired-document": {
      id: "expired-document",
      label: "Expired document",
      selectDesc: "Document expired; auto-decline.",
      overallStatus: "Declined",
      overallTone: "negative",
      defaultTab: "document",
      transactionId: "91e0b2c4-55aa-4c11-9f20-12ab34cd56ef",
      truAiSummary: "Jane Doe\u2019s document is authentic, but it has expired. A valid, non-expired document is required.",
      summaryRows: [
        { label: "Document", value: "Declined", tone: "negative" },
        ...happySummary.slice(1)
      ],
      documentInfo: {
        expiryDate: "2023/01/15",
        expiryNote: "Expired",
        documentStatus: "Expired",
        authenticity: "Verified"
      },
      document: documentGroups({
        declined: [
          {
            title: "Expiry date check",
            sub: "Document expired on 15 January 2023.",
            result: "Declined",
            kind: "declined"
          }
        ],
        accepted: withoutAcceptedTitle("Expiry check")
      }),
      dataMatch: {
        helper: "Data can match exactly even when the document itself is no longer valid."
      },
      deviceIntelligence: {
        score: 11,
        summary: "The device and session appear legitimate. The decline is caused only by the expired document."
      }
    },
    "face-mismatch": {
      id: "face-mismatch",
      label: "Face mismatch",
      selectDesc: "Selfie does not match document portrait.",
      overallStatus: "Declined",
      overallTone: "negative",
      defaultTab: "biometrics",
      transactionId: "b7d1e9f0-22cc-4a88-81de-90fe12ab34cd",
      truAiSummary: "The document is valid, but the selfie does not match the portrait on the document. Liveness passed and no spoofing was detected.",
      summaryRows: [
        { label: "Document", value: "Accepted", tone: "positive" },
        { label: "Biometrics", value: "Declined", tone: "negative" },
        ...happySummary.slice(2)
      ],
      document: documentGroups(
        { accepted: withoutAcceptedTitle("Face match") },
        "Document authenticity passed. Biometric comparison is shown in the Biometrics tab."
      ),
      biometrics: {
        groups: [
          {
            key: "declined",
            label: "Declined",
            rows: [
              {
                title: "Face match",
                sub: "Selfie does not match the document portrait.",
                result: "Declined",
                kind: "declined",
                details: [
                  { label: "Face match score", value: "23%" },
                  { label: "Required threshold", value: "70%" }
                ]
              }
            ]
          },
          {
            key: "accepted",
            label: "Accepted",
            rows: [
              accepted("Face detected", "Liveness & anti-spoof"),
              accepted("Face liveness", "Liveness & anti-spoof"),
              accepted("Single face", "Liveness & anti-spoof"),
              accepted("Eyes open", "Image quality"),
              accepted("Image quality", "Image quality acceptable"),
              accepted("Capture integrity", "Valid camera capture")
            ]
          },
          {
            key: "not-detected",
            label: "Not detected",
            rows: [
              notDetected("Spoof attempt"),
              notDetected("Deepfake indicators")
            ]
          },
          knownFacesEmpty(
            "The selfie did not match the document portrait, but it was not found in known-face records."
          )
        ]
      },
      dataMatch: {
        helper: "Identity data is consistent. The decline is caused by biometric mismatch, not data inconsistency."
      },
      networkInsights: cleanNetworkInsights({
        synthetic: "No evidence that this face has been reused across different identities.",
        document: "No conflicting identity or document records were found.",
        ip: "No unusual IP or transaction velocity was detected."
      }),
      deviceIntelligence: lowRiskDevice(
        "The device and network appear normal. The transaction was declined because of the face mismatch, not device risk.",
        17
      )
    },
    "dob-mismatch": {
      id: "dob-mismatch",
      label: "DOB mismatch",
      selectDesc: "Applicant DOB conflicts with document OCR.",
      overallStatus: "Review",
      overallTone: "intermediate",
      defaultTab: "data-match",
      transactionId: "c0ffee12-3456-4abc-9def-112233445566",
      truAiSummary: "The date of birth entered by the applicant does not match the date extracted from the document. Manual review is recommended.",
      summaryRows: [
        { label: "Document", value: "Review", tone: "intermediate" },
        happySummary[1],
        happySummary[2],
        {
          label: "Data Match",
          value: "5 Exact \xB7 1 Partial",
          tone: "intermediate"
        },
        happySummary[4]
      ],
      document: documentGroups({
        review: [
          {
            title: "DOB cross-check",
            sub: "Applicant input does not match the date of birth extracted from the document.",
            result: "Review",
            kind: "review",
            details: [
              { label: "Applicant input", value: "1988/11/03" },
              { label: "Document OCR", value: "1988/11/30" }
            ]
          }
        ],
        accepted: withoutAcceptedTitle("DOB cross-check")
      }),
      biometrics: {
        helper: "The person appears to be the document holder. The review is caused by a data discrepancy."
      },
      dataMatch: {
        groups: [
          {
            key: "exact-match",
            label: "Exact Matches",
            rows: exactMatchRows.filter(
              (row) => row.title !== "Date of birth"
            )
          },
          {
            key: "partial-match",
            label: "Partial Match",
            rows: [
              {
                title: "Date of birth",
                sub: "The OCR value differs from both the applicant input and barcode data. This may indicate an OCR error or document alteration.",
                result: "Partial Match",
                kind: "partial-match",
                details: [
                  { label: "Applicant input", value: "1988/11/03" },
                  { label: "Document OCR", value: "1988/11/30" },
                  { label: "Barcode / MRZ", value: "1988/11/03" }
                ]
              }
            ]
          }
        ]
      },
      networkInsights: cleanNetworkInsights(),
      deviceIntelligence: {
        score: 23,
        summary: "No suspicious device or network activity was detected. Manual review is required only for the DOB discrepancy."
      }
    },
    "known-face-hit": {
      id: "known-face-hit",
      label: "Known face hit",
      selectDesc: "Face matches a previously declined fraud identity.",
      overallStatus: "Declined",
      overallTone: "negative",
      secondaryStatus: "Fraud detected",
      secondaryTone: "negative",
      defaultTab: "network-insights",
      transactionId: "d4e5f617-8901-4bcd-a123-998877665544",
      truAiSummary: "Jane Doe\u2019s document and selfie passed verification, but the face matches a previously declined identity associated with fraud.",
      summaryRows: [
        { label: "Document", value: "Accepted", tone: "positive" },
        { label: "Biometrics", value: "Accepted", tone: "positive" },
        { label: "Known Faces", value: "Declined", tone: "negative" },
        happySummary[3],
        { label: "Device Intelligence", value: "High Risk", tone: "negative" }
      ],
      document: {
        helper: "The document is authentic and valid. The fraud decision comes from cross-transaction intelligence."
      },
      biometrics: {
        groups: [
          { key: "accepted", label: "Accepted", rows: biometricAcceptedRows },
          {
            key: "known-faces",
            label: "Known Faces",
            countLabel: "1 Match",
            rows: [
              {
                title: "Known face match",
                sub: "This face matches a previously declined identity associated with confirmed fraud.",
                result: "Match",
                kind: "declined",
                hideStatusIcon: true,
                details: [
                  { label: "Similarity", value: "96.8%" },
                  { label: "Previous name", value: "John Smith" },
                  {
                    label: "Previous document",
                    value: "TX Driver\u2019s License"
                  },
                  { label: "Previous decision", value: "Declined" },
                  { label: "Previous event", value: "14 September 2025" },
                  {
                    label: "Reason",
                    value: "Identity fraud \u2014 multiple identities"
                  }
                ]
              }
            ]
          },
          {
            key: "not-detected",
            label: "Not detected",
            rows: biometricNotDetectedRows
          }
        ]
      },
      dataMatch: {
        helper: "Current transaction data is internally consistent. The risk comes from a match to a different historical identity."
      },
      networkInsights: {
        headerStatus: "Flagged",
        headerTone: "negative",
        flagged: [
          {
            id: "synthetic-identity",
            title: "Synthetic identity",
            status: "flagged",
            trendBadge: "Face reused across identities",
            primaryMessage: "This face appears in 4 transactions under 3 different identities and document records.",
            supportingMessage: "The current face matches historical transactions with conflicting names, dates of birth and document numbers.",
            metrics: [
              { label: "Transactions affected", value: "4" },
              { label: "Identity conflicts", value: "3" },
              { label: "First seen", value: "September 2025" },
              { label: "Most recent", value: "June 2026" }
            ],
            showTransactionsLabel: "View transactions",
            transactions: knownFaceTransactions
          },
          {
            id: "document-conflict",
            title: "Document conflict",
            status: "flagged",
            primaryMessage: "The same face has been associated with multiple document numbers and identity records.",
            metrics: [
              { label: "Documents observed", value: "3" },
              { label: "Conflicting names", value: "2" },
              { label: "Conflicting DOBs", value: "2" }
            ],
            showTransactionsLabel: "View transactions",
            transactions: knownFaceDocumentConflictTransactions
          }
        ],
        clean: [
          {
            id: "ip-velocity",
            title: "IP Velocity Anomaly",
            status: "clean",
            primaryMessage: "No abnormal transaction velocity was detected from the current IP address.",
            metrics: happyNiMetrics
          }
        ]
      },
      deviceIntelligence: {
        score: 92,
        risk: "high",
        riskLabel: "High Risk",
        summary: "The device has been linked to multiple identities and previously declined transactions. Immediate review or action is recommended.",
        indicators: [
          "Linked to 3 different identities",
          "Device previously seen in a declined transaction",
          "High identity-switching velocity"
        ],
        deviceId: "3045489E05849546",
        firstSeenLabel: "First seen",
        deviceDetails: [
          { label: "Device ID", value: "3045489E05849546" },
          { label: "Device model", value: "Samsung Galaxy S24" },
          { label: "Operating system", value: "Android 14" },
          { label: "Browser", value: "Chrome Mobile" },
          { label: "First seen", value: "14 September 2025" },
          { label: "Timezone", value: "UTC-07" },
          { label: "Identity count", value: "3" },
          { label: "Transaction count", value: "7" }
        ],
        evidence: knownFaceDeviceEvidence
      }
    },
    "deepfake-detected": {
      id: "deepfake-detected",
      label: "Deepfake detected",
      selectDesc: "Synthetic selfie detected.",
      overallStatus: "Declined",
      overallTone: "negative",
      defaultTab: "biometrics",
      transactionId: "e8f9a0b1-2345-4cde-b678-556677889900",
      truAiSummary: "A synthetic selfie was detected. The document is valid and identity data matches, but the biometric capture cannot be trusted.",
      summaryRows: [
        { label: "Document", value: "Accepted", tone: "positive" },
        { label: "Biometrics", value: "Declined", tone: "negative" },
        happySummary[2],
        happySummary[3],
        { label: "Device Intelligence", value: "High Risk", tone: "negative" }
      ],
      document: {
        helper: "The document is authentic and valid. The decline is caused by the biometric capture."
      },
      biometrics: {
        groups: [
          {
            key: "declined",
            label: "Declined",
            rows: [
              {
                title: "Deepfake detection",
                sub: "Synthetic facial patterns were detected in the submitted selfie.",
                result: "Declined",
                kind: "declined",
                details: [
                  { label: "Deepfake confidence", value: "94%" },
                  {
                    label: "Capture source",
                    value: "Virtual camera pattern detected"
                  }
                ]
              }
            ]
          },
          {
            key: "accepted",
            label: "Accepted",
            rows: [
              accepted("Face match", "91%"),
              accepted("Face detected", "Liveness & anti-spoof"),
              accepted("Single face", "Liveness & anti-spoof"),
              accepted("Eyes open", "Image quality"),
              accepted("Face centered", "Image quality"),
              accepted("Image sharpness", "Image quality"),
              accepted("Document portrait quality", "Portrait quality acceptable")
            ]
          },
          {
            key: "review",
            label: "Review",
            rows: [
              {
                title: "Liveness",
                sub: "Motion was detected, but capture artifacts are consistent with synthetic video generation.",
                result: "Inconclusive",
                kind: "inconclusive"
              }
            ]
          },
          {
            key: "not-detected",
            label: "Not detected",
            rows: [
              notDetected("Printout attack"),
              notDetected("Static photo replay")
            ]
          },
          knownFacesEmpty()
        ]
      },
      dataMatch: {
        helper: "Identity data is consistent. The decline is caused by biometric capture integrity."
      },
      networkInsights: cleanNetworkInsights({
        synthetic: "No cross-transaction identity reuse was found.",
        document: "No conflicting historical documents or identity records were found.",
        ip: "No unusual IP or transaction velocity was detected."
      }),
      deviceIntelligence: {
        score: 88,
        risk: "high",
        riskLabel: "High Risk",
        summary: "Capture-integrity signals indicate that the selfie may have been submitted through a virtual or manipulated camera source.",
        indicators: [
          "Virtual camera characteristics detected",
          "Capture metadata inconsistent with physical camera",
          "Repeated frame-generation artifacts"
        ],
        deviceId: "98AF21C77D4012B",
        firstSeenLabel: "First seen",
        deviceDetails: [
          { label: "Device ID", value: "98AF21C77D4012B" },
          { label: "Device type", value: "Desktop" },
          { label: "Operating system", value: "Windows 11" },
          { label: "Browser", value: "Chrome 126" },
          { label: "Camera source", value: "Virtual camera" },
          { label: "First seen", value: "17 June 2026, 2:14pm" },
          { label: "Screen resolution", value: "1920 \xD7 1080" },
          { label: "Timezone", value: "UTC-07" }
        ],
        evidence: deepfakeDeviceEvidence
      }
    }
  };
  var SCENARIO_ORDER = [
    "happy-path",
    "expired-document",
    "face-mismatch",
    "dob-mismatch",
    "known-face-hit",
    "deepfake-detected"
  ];
  var scenarioData = {
    "happy-path": happyPath,
    "expired-document": deepMerge(happyPath, scenarioOverrides["expired-document"]),
    "face-mismatch": deepMerge(happyPath, scenarioOverrides["face-mismatch"]),
    "dob-mismatch": deepMerge(happyPath, scenarioOverrides["dob-mismatch"]),
    "known-face-hit": deepMerge(happyPath, scenarioOverrides["known-face-hit"]),
    "deepfake-detected": deepMerge(
      happyPath,
      scenarioOverrides["deepfake-detected"]
    )
  };
  function getScenario(id) {
    return scenarioData[id];
  }

  // src/render.ts
  function escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function renderTag(text, tone, size = "sm") {
    return `<span class="${toneClass(tone, size)}">${escapeHtml(text)}</span>`;
  }
  function tableCheckLabel(groupKey) {
    if (groupKey === "exact-match" || groupKey === "partial-match") {
      return "Field";
    }
    if (groupKey === "known-faces") {
      return "Transaction";
    }
    return "Check";
  }
  function collectDetailColumns(rows) {
    var _a;
    const columns = [];
    const seen = /* @__PURE__ */ new Set();
    for (const row of rows) {
      for (const detail of (_a = row.details) != null ? _a : []) {
        if (!seen.has(detail.label)) {
          seen.add(detail.label);
          columns.push(detail.label);
        }
      }
    }
    return columns;
  }
  function tableGridTemplate(detailCount) {
    const detailCols = Array.from(
      { length: detailCount },
      () => "minmax(6.5rem, 1fr)"
    ).join(" ");
    const details = detailCount > 0 ? ` ${detailCols}` : "";
    return `minmax(12rem, 2fr)${details} minmax(9rem, max-content)`;
  }
  function renderTableHead(checkLabel, detailColumns) {
    const detailHeaders = detailColumns.map(
      (col) => `<div class="dv-table__detail-cell dv-table__col-head">${escapeHtml(col)}</div>`
    ).join("");
    return `<div class="dv-table__row dv-table__head" role="row">
  <div class="dv-table__text-cell dv-table__col-head">${escapeHtml(checkLabel)}</div>
  ${detailHeaders}
  <div class="dv-table__label-cell dv-table__col-head">Result</div>
</div>`;
  }
  function renderDetailCells(row, detailColumns) {
    var _a;
    if (detailColumns.length === 0) return "";
    const byLabel = new Map(
      ((_a = row.details) != null ? _a : []).map((detail) => [detail.label, detail.value])
    );
    return detailColumns.map((label) => {
      const value = byLabel.get(label);
      const content = value ? `<span class="dv-cell-title">${escapeHtml(value)}</span>` : "";
      return `<div class="dv-table__detail-cell">${content}</div>`;
    }).join("");
  }
  function renderCheckRow(row, detailColumns = []) {
    const sub = row.sub ? `<span class="dv-cell-sub">${escapeHtml(row.sub)}</span>` : "";
    const icon = row.hideStatusIcon ? "" : `<span class="dv-status__icon">${kindIcon(row.kind)}</span>`;
    return `<div class="dv-table__row" role="row">
  <div class="dv-table__text-cell"><span class="dv-cell-title">${escapeHtml(row.title)}</span>${sub}</div>
  ${renderDetailCells(row, detailColumns)}
  <div class="dv-table__label-cell"><span class="${kindToStatusClass(row.kind)}">${icon}${escapeHtml(row.result)}</span></div>
</div>`;
  }
  function groupCountTag(group) {
    const text = group.countLabel !== void 0 ? group.countLabel : String(group.rows.length);
    return renderTag(text, "default");
  }
  function defaultOpenKeys(groups, options) {
    const open = /* @__PURE__ */ new Set();
    if (options == null ? void 0 : options.defaultOpenKey) {
      open.add(options.defaultOpenKey);
    } else {
      const declined = groups.find((g) => g.key === "declined" && g.rows.length > 0);
      const review = groups.find((g) => g.key === "review" && g.rows.length > 0);
      if (declined) open.add(declined.key);
      else if (review) open.add(review.key);
      else {
        const first = groups.find((g) => g.rows.length > 0);
        if (first) open.add(first.key);
      }
    }
    const knownFaces = groups.find(
      (g) => (g.key === "known-faces" || g.key === "match") && g.rows.length > 0
    );
    if (knownFaces) open.add(knownFaces.key);
    return open;
  }
  var GROUP_SEVERITY_ORDER = {
    declined: 0,
    review: 1,
    accepted: 2,
    "not-detected": 3,
    "not-run": 4,
    "known-faces": 5,
    "exact-match": 6,
    "partial-match": 7
  };
  function groupSeverityRank(key) {
    var _a;
    return (_a = GROUP_SEVERITY_ORDER[key]) != null ? _a : 99;
  }
  function sortIndicatorGroups(groups) {
    return [...groups].sort((a, b) => {
      const aHasRows = a.rows.length > 0 ? 0 : 1;
      const bHasRows = b.rows.length > 0 ? 0 : 1;
      if (aHasRows !== bHasRows) return aHasRows - bHasRows;
      return groupSeverityRank(a.key) - groupSeverityRank(b.key);
    });
  }
  function renderIndicatorGroups(groups, options) {
    const sorted = sortIndicatorGroups(groups);
    const openKeys = defaultOpenKeys(sorted, options);
    return sorted.map((group) => {
      var _a;
      const isOpen = openKeys.has(group.key);
      const detailColumns = collectDetailColumns(group.rows);
      const gridStyle = ` style="--dv-table-cols: ${tableGridTemplate(detailColumns.length)}"`;
      const body = group.rows.length > 0 ? `<div class="dv-table" role="table"${gridStyle}>${renderTableHead(tableCheckLabel(group.key), detailColumns)}${group.rows.map((row) => renderCheckRow(row, detailColumns)).join("")}</div>` : `<p class="dv-empty">${escapeHtml((_a = group.emptyState) != null ? _a : "No items.")}</p>`;
      return `<div class="dv-group dv-collapsible${isOpen ? " dv-collapsible--open" : ""}" data-group-key="${escapeHtml(group.key)}">
  <button class="dv-group__header dv-collapsible__header" type="button" aria-expanded="${isOpen ? "true" : "false"}">
    <span class="dv-chevron" aria-hidden="true">${ICON_CHEVRON}</span>
    <span class="dv-group__label">${escapeHtml(group.label)}</span>
    ${groupCountTag(group)}
  </button>
  <div class="dv-collapsible__body"${isOpen ? "" : " hidden"}>${body}</div>
</div>`;
    }).join("");
  }
  function renderSortableTableHead(variant, columns, defaultCol = 0) {
    const headCls = variant === "ditable" ? "dv-ditable__head" : "dv-txntable__head";
    const chCls = variant === "ditable" ? "dv-ditable__ch" : "dv-txntable__ch";
    const buttons = columns.map((label, index) => {
      const sort = index === defaultCol ? "ascending" : "none";
      return `<button type="button" class="${chCls} dv-datatable__sort" data-sort-col="${index}" aria-sort="${sort}"><span class="dv-datatable__sort-label">${escapeHtml(label)}</span><span class="dv-datatable__sort-icon">${ICON_SORT}</span></button>`;
    }).join("");
    return `<div class="${headCls}">${buttons}</div>`;
  }
  function sortDiEvidenceRows(rows) {
    return [...rows].sort(
      (a, b) => a.title.localeCompare(b.title, void 0, { sensitivity: "base" })
    );
  }
  function renderTxnDiff(differences) {
    if (differences.length === 0) {
      return `<span class="dv-txn-dash">-</span>`;
    }
    return differences.map((d) => renderTag(d, "default")).join("");
  }
  function renderTxnRow(txn) {
    const isDeclined = txn.result === "Declined";
    const icon = isDeclined ? ICON_DECLINED : ICON_ACCEPTED;
    const iconClass = isDeclined ? "dv-txn-result__icon dv-txn-result__icon--negative" : "dv-txn-result__icon dv-txn-result__icon--positive";
    const idHtml = txn.id ? `<span class="dv-txn-id">${escapeHtml(txn.id)}</span>` : "";
    return `<div class="dv-txntable__row">
  <span class="dv-txntable__cell"><span class="dv-txn-tx"><a class="dv-txn-date" href="#">${escapeHtml(txn.date)}</a>${idHtml}</span></span>
  <span class="dv-txntable__cell dv-txn-diff">${renderTxnDiff(txn.differences)}</span>
  <span class="dv-txntable__cell"><span class="dv-txn-result"><span class="${iconClass}">${icon}</span>${escapeHtml(txn.result)}</span></span>
</div>`;
  }
  function txnCountTags(transactions) {
    let declined = 0;
    let accepted2 = 0;
    for (const t of transactions) {
      if (t.result === "Declined") declined += 1;
      else accepted2 += 1;
    }
    const parts = [];
    if (declined > 0) parts.push(renderTag(`${declined} Declined`, "negative"));
    if (accepted2 > 0) parts.push(renderTag(`${accepted2} Accepted`, "positive"));
    return parts.join("");
  }
  function renderNiInsight(insight, options) {
    var _a, _b, _c;
    const isOpen = (options == null ? void 0 : options.open) === true;
    const trendBadge = insight.trendBadge ? renderTag(insight.trendBadge, "default") : "";
    const supporting = insight.supportingMessage ? `<p class="dv-ni2-trend__sub">${escapeHtml(insight.supportingMessage)}</p>` : "";
    const metrics = insight.metrics.map(
      (m) => `<div class="dv-detail-row"><span class="dv-detail-label">${escapeHtml(m.label)}</span><span class="dv-detail-value">${escapeHtml(m.value)}</span></div>`
    );
    const transactions = (_a = insight.transactions) != null ? _a : [];
    const evidenceEmptyMessage = (_b = insight.evidenceEmptyMessage) != null ? _b : "No related transactions were found for this signal.";
    const showLabel = (_c = insight.showTransactionsLabel) != null ? _c : "View transactions";
    const hideLabel = showLabel.replace(/^Show\s+/i, "Hide ").replace(/^View\s+/i, "Hide ");
    const evidenceOpen = transactions.length > 0 && (options == null ? void 0 : options.open) === true;
    const txnRows = transactions.map(renderTxnRow).join("");
    const evidenceSection = transactions.length > 0 ? `<div class="dv-ni2-evidence">
  <span class="dv-ni2-evidence-label">Evidence</span>
  <div class="dv-ni2-txnbar">
    <button class="tds-btn tds-btn--secondary tds-btn--sm dv-ni2-txntoggle" type="button" aria-expanded="${evidenceOpen ? "true" : "false"}">
      <span class="tds-btn__leading-icon dv-ni2-txntoggle__icon">${evidenceOpen ? ICON_MINUS : ICON_PLUS}</span>
      <span class="dv-ni2-txntoggle__label" data-show-label="${escapeHtml(showLabel)}">${escapeHtml(evidenceOpen ? hideLabel : showLabel)}</span>
    </button>
    <span class="dv-ni2-txnbar__tags">${txnCountTags(transactions)}</span>
  </div>
  <div class="dv-txntable"${evidenceOpen ? "" : " hidden"}>
    ${renderSortableTableHead("txntable", [
      "Transaction",
      "Difference from current",
      "Result"
    ])}
    ${txnRows}
  </div>
</div>` : `<div class="dv-ni2-evidence">
  <span class="dv-ni2-evidence-label">Evidence</span>
  <p class="dv-empty dv-ni2-evidence-empty">${escapeHtml(evidenceEmptyMessage)}</p>
</div>`;
    return `<div class="dv-acc dv-collapsible${isOpen ? " dv-collapsible--open" : ""}" data-insight-id="${escapeHtml(insight.id)}">
  <button class="dv-acc__header dv-collapsible__header" type="button" aria-expanded="${isOpen ? "true" : "false"}">
    <span class="dv-acc__title">${escapeHtml(insight.title)}</span>
    <span class="dv-acc__chev" aria-hidden="true">${ICON_CHEVRON_DOWN}</span>
  </button>
  <div class="dv-collapsible__body dv-acc__body"${isOpen ? "" : " hidden"}>
    <div class="dv-acc__trend">
      <div class="dv-acc__trend-head"><span class="dv-acc__trend-title">Trend</span>${trendBadge}</div>
      <div class="dv-ni2-trend__row">
        <div class="dv-ni2-trend__left">
          <span class="dv-ni2-note">${ICON_NOTE_THUMB}</span>
          <div class="dv-ni2-trend__text">
            <p class="dv-ni2-trend__title">${escapeHtml(insight.primaryMessage)}</p>
            ${supporting}
          </div>
        </div>
        <div class="dv-ni2-trend__right">${metrics.join("")}</div>
      </div>
    </div>
    ${evidenceSection}
  </div>
</div>`;
  }
  function niGroupTag(count) {
    return renderTag(String(count), "default");
  }
  function renderNiGroup(label, insights, open) {
    const openFirst = open && insights.length > 0;
    const body = insights.length > 0 ? `<div class="dv-ni2-accs">${insights.map(
      (insight, i) => renderNiInsight(insight, { open: openFirst && i === 0 })
    ).join("")}</div>` : `<p class="dv-empty">No ${escapeHtml(label.toLowerCase())} signals.</p>`;
    return `<div class="dv-group dv-collapsible${open ? " dv-collapsible--open" : ""}" data-group-key="${escapeHtml(label.toLowerCase())}">
  <button class="dv-group__header dv-collapsible__header" type="button" aria-expanded="${open ? "true" : "false"}">
    <span class="dv-chevron" aria-hidden="true">${ICON_CHEVRON}</span>
    <span class="dv-group__label">${escapeHtml(label)}</span>
    ${niGroupTag(insights.length)}
  </button>
  <div class="dv-collapsible__body"${open ? "" : " hidden"}>${body}</div>
</div>`;
  }
  var NI_GROUP_SEVERITY = {
    Flagged: 0,
    Clean: 1
  };
  function sortNiGroups(groups) {
    return [...groups].sort((a, b) => {
      var _a, _b;
      const aHasRows = a.insights.length > 0 ? 0 : 1;
      const bHasRows = b.insights.length > 0 ? 0 : 1;
      if (aHasRows !== bHasRows) return aHasRows - bHasRows;
      return ((_a = NI_GROUP_SEVERITY[a.label]) != null ? _a : 99) - ((_b = NI_GROUP_SEVERITY[b.label]) != null ? _b : 99);
    });
  }
  function renderNetworkInsights(ni) {
    const groups = sortNiGroups([
      { label: "Flagged", insights: ni.flagged },
      { label: "Clean", insights: ni.clean }
    ]);
    const firstWithContent = groups.findIndex((group) => group.insights.length > 0);
    const openIndex = firstWithContent >= 0 ? firstWithContent : 0;
    return groups.map(
      (group, index) => renderNiGroup(group.label, group.insights, index === openIndex)
    ).join("");
  }
  function diInsightMarkup(row) {
    if (row.insight === "Risk") {
      return `<span class="dv-di-insight dv-di-insight--risk"><span class="dv-di-insight__icon">${ICON_RISK}</span>Risk</span>`;
    }
    if (row.insight === "No Risk") {
      return `<span class="dv-di-insight dv-di-insight--norisk"><span class="dv-di-insight__icon">${ICON_ACCEPTED}</span>No Risk</span>`;
    }
    return `<span class="dv-di-insight"><span class="dv-di-insight__icon">${kindIcon("not-run")}</span>Not Run</span>`;
  }
  function renderDiEvidenceGroup(group, open) {
    const badges = deriveDiGroupBadges(group.rows).map((b) => renderTag(b.text, b.tone)).join("");
    const sortedRows = sortDiEvidenceRows(group.rows);
    const tableBody = sortedRows.length > 0 ? `<div class="dv-ditable">
      ${renderSortableTableHead("ditable", ["Signal", "Result", "Insight"])}
      ${sortedRows.map(
      (row) => `<div class="dv-ditable__row">
  <span class="dv-ditable__cell"><span class="dv-txn-tx"><span class="dv-cell-title">${escapeHtml(row.title)}</span></span></span>
  <span class="dv-ditable__cell dv-di-result">${escapeHtml(row.result)}</span>
  <span class="dv-ditable__cell">${diInsightMarkup(row)}</span>
</div>`
    ).join("")}
    </div>` : `<p class="dv-empty">No signals in this category.</p>`;
    return `<div class="dv-group dv-collapsible${open ? " dv-collapsible--open" : ""}" data-group-key="${escapeHtml(group.key)}">
  <button class="dv-group__header dv-collapsible__header" type="button" aria-expanded="${open ? "true" : "false"}">
    <span class="dv-chevron" aria-hidden="true">${ICON_CHEVRON}</span>
    <span class="dv-group__label">${escapeHtml(group.label)}</span>
    <span class="dv-ni2-counts">${badges}</span>
  </button>
  <div class="dv-collapsible__body"${open ? "" : " hidden"}>${tableBody}</div>
</div>`;
  }
  function firstSeenValue(di) {
    var _a;
    const match = di.deviceDetails.find(
      (d) => {
        var _a2;
        return d.label.toLowerCase() === "first seen" || d.label.toLowerCase() === ((_a2 = di.firstSeenLabel) != null ? _a2 : "").toLowerCase();
      }
    );
    return (_a = match == null ? void 0 : match.value) != null ? _a : "";
  }
  function renderDeviceIntelligence(di) {
    var _a;
    const chips = di.indicators.map((c) => `<div class="dv-di-chip">${escapeHtml(c)}</div>`).join("");
    const firstSeenLabel = (_a = di.firstSeenLabel) != null ? _a : "First seen";
    const firstSeen = firstSeenValue(di);
    const detailsRows = di.deviceDetails.map(
      (d) => `<div class="dv-detail-row"><span class="dv-detail-label">${escapeHtml(d.label)}</span><span class="dv-detail-value">${escapeHtml(d.value)}</span></div>`
    ).join("");
    const evidenceGroups = normalizeDiEvidence(di.evidence);
    const defaultOpenIndex = evidenceGroups.findIndex((group) => group.rows.length > 0);
    const openIndex = defaultOpenIndex >= 0 ? defaultOpenIndex : 0;
    const evidence = evidenceGroups.map((group, index) => renderDiEvidenceGroup(group, index === openIndex)).join("");
    return `<div class="dv-di-top">
  <div class="dv-di-summary">
    <div class="dv-di-score">
      <span class="dv-di-score__label">Risk Score</span>
      <div class="dv-di-gauge" data-score="${escapeHtml(String(di.score))}" data-max="100" data-risk="${escapeHtml(di.risk)}" data-label="${escapeHtml(di.riskLabel)}"></div>
    </div>
    <div class="dv-di-detail">
      <p class="dv-di-statement">${escapeHtml(di.summary)}</p>
      <div class="dv-di-meta">
        <div class="dv-di-meta__row"><span class="dv-di-meta__label">Device ID</span><span class="dv-di-meta__value">${escapeHtml(di.deviceId)}</span></div>
        <div class="dv-di-meta__row"><span class="dv-di-meta__label">${escapeHtml(firstSeenLabel)}</span><span class="dv-di-meta__value">${escapeHtml(firstSeen)}</span></div>
      </div>
      <div class="dv-di-chips">${chips}</div>
    </div>
  </div>
  <div class="dv-di-showinfo">
    <button class="tds-btn tds-btn--secondary tds-btn--sm" type="button" aria-expanded="false">
      <span class="tds-btn__leading-icon">${ICON_PLUS}</span>Show Device Information
    </button>
  </div>
  <div class="dv-di-details" id="dv-device-details" hidden>${detailsRows}</div>
</div>
<span class="dv-di-evidence-label">Evidence</span>
${evidence}`;
  }
  function renderSummaryList(rows) {
    return rows.map(
      (row) => `<li class="dv-summary-row"><span class="dv-summary-label">${escapeHtml(row.label)}</span>${renderTag(row.value, row.tone)}</li>`
    ).join("");
  }
  function renderDetailPairs(pairs) {
    return pairs.map(
      (p) => `<div class="dv-detail-row"><span class="dv-detail-label">${escapeHtml(p.label)}</span><span class="dv-detail-value">${escapeHtml(p.value)}</span></div>`
    ).join("");
  }
  function renderDocumentInfo(info) {
    const expiry = info.expiryNote ? `${info.expiryDate} (${info.expiryNote})` : info.expiryDate;
    const rows = [
      { label: "Document Type", value: info.documentType },
      { label: "Document Number", value: info.documentNumber },
      { label: "Issuing State", value: info.issuingState },
      { label: "Expiry Date", value: expiry },
      { label: "Document Status", value: info.documentStatus },
      { label: "Authenticity", value: info.authenticity }
    ];
    return renderDetailPairs(rows);
  }
  function renderHeaderBadges(badges) {
    return badges.map((b) => renderTag(b.text, b.tone)).join("");
  }
  function renderNetworkHeaderBadge(ni) {
    const icon = ni.headerStatus === "Flagged" ? `<span class="dv-tag-icon">${ICON_FLAG}</span>` : "";
    return `${icon}${escapeHtml(ni.headerStatus)}`;
  }
  function diHeaderTone(di) {
    if (di.risk === "high") return "negative";
    if (di.risk === "medium") return "intermediate";
    return "positive";
  }
  function setHtml(el, html) {
    if (el) el.innerHTML = html;
  }
  function setText(el, text) {
    if (el) el.textContent = text;
  }
  function renderTeOptions(selectedId) {
    return SCENARIO_ORDER.map((id) => {
      const s = scenarioData[id];
      const selected = id === selectedId ? ' aria-selected="true"' : ' aria-selected="false"';
      return `<button type="button" class="dv-te-option" role="option" data-id="${escapeHtml(id)}" data-name="${escapeHtml(s.label)}" data-tone="${escapeHtml(s.overallTone)}" data-result="${escapeHtml(s.overallStatus)}"${selected}>
  <span class="dv-te-option__text"><span class="dv-te-option__name">${escapeHtml(s.label)}</span><span class="dv-te-option__desc">${escapeHtml(s.selectDesc)}</span></span>
  ${renderTag(s.overallStatus, s.overallTone)}
</button>`;
    }).join("");
  }
  function isScenarioId(value) {
    return Object.prototype.hasOwnProperty.call(scenarioData, value);
  }
  function applyScenario(root, config) {
    var _a, _b;
    const q = (sel) => root.querySelector(sel);
    setHtml(q("#dv-overall-status"), renderTag(config.overallStatus, config.overallTone, "md"));
    const secondary = q("#dv-secondary-status");
    if (secondary instanceof HTMLElement) {
      if (config.secondaryStatus && config.secondaryTone) {
        secondary.hidden = false;
        secondary.innerHTML = renderTag(
          config.secondaryStatus,
          config.secondaryTone,
          "md"
        );
      } else {
        secondary.hidden = true;
        secondary.innerHTML = "";
      }
    }
    setText(q("#dv-transaction-id"), config.transactionId);
    setText(q("#dv-truai-text"), config.truAiSummary);
    setHtml(q("#dv-summary-list"), renderSummaryList(config.summaryRows));
    setHtml(q("#dv-document-info"), renderDocumentInfo(config.documentInfo));
    const teOptions = q("#dv-te-options");
    setHtml(teOptions, renderTeOptions(config.id));
    const teSelect = q("#dv-te-select");
    if (teSelect) {
      const valueEl = (_a = teSelect.querySelector("#dv-te-value")) != null ? _a : teSelect.querySelector(".dv-te-value");
      const tagEl = (_b = teSelect.querySelector("#dv-te-tag")) != null ? _b : teSelect.querySelector(".dv-te-tag");
      setText(valueEl, config.label);
      if (tagEl) {
        tagEl.className = `${toneClass(config.overallTone)} dv-te-tag`;
        tagEl.textContent = config.overallStatus;
      }
    }
    setHtml(
      q("#dv-document-indicators"),
      renderIndicatorGroups(config.document.groups)
    );
    setHtml(
      q("#dv-document-badges"),
      renderHeaderBadges(deriveHeaderBadges(config.document.groups))
    );
    setHtml(
      q("#dv-biometrics-indicators"),
      renderIndicatorGroups(config.biometrics.groups)
    );
    setHtml(
      q("#dv-biometrics-badges"),
      renderHeaderBadges(deriveHeaderBadges(config.biometrics.groups))
    );
    setHtml(
      q("#dv-datamatch-indicators"),
      renderIndicatorGroups(config.dataMatch.groups)
    );
    setHtml(
      q("#dv-datamatch-badges"),
      renderHeaderBadges(deriveHeaderBadges(config.dataMatch.groups))
    );
    setHtml(q("#dv-network-body"), renderNetworkInsights(config.networkInsights));
    const networkBadge = q("#dv-network-header-badge");
    if (networkBadge instanceof HTMLElement) {
      networkBadge.className = `${toneClass(config.networkInsights.headerTone)} dv-ni-pill`;
      networkBadge.innerHTML = renderNetworkHeaderBadge(config.networkInsights);
    }
    const deviceBody = q("#dv-device-body");
    if (deviceBody instanceof HTMLElement) {
      deviceBody.classList.add("dv-di-body");
    }
    setHtml(
      deviceBody,
      renderDeviceIntelligence(config.deviceIntelligence)
    );
    const deviceBadge = q("#dv-device-header-badge");
    if (deviceBadge instanceof HTMLElement) {
      deviceBadge.className = toneClass(
        diHeaderTone(config.deviceIntelligence)
      );
      deviceBadge.textContent = config.deviceIntelligence.riskLabel;
    }
  }

  // src/app.ts
  var INITIAL_SCENARIO = "happy-path";
  var MORE_VISIBLE_ROWS = 5;
  var SPLIT_DEFAULT_END = 353;
  var SPLIT_MIN_START = 240;
  var SPLIT_MIN_END = 220;
  var SPLIT_STACK_MAX = 1200;
  function selectTab(tabId) {
    const tabs = document.querySelectorAll(".dv-tab");
    const panels = document.querySelectorAll(".dv-tabpanel");
    tabs.forEach((tab) => {
      const active = tab.getAttribute("data-tab") === tabId;
      tab.classList.toggle("dv-tab--active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    panels.forEach((panel) => {
      panel.hidden = panel.getAttribute("data-tab") !== tabId;
    });
  }
  function setCollapsibleOpen(section, open) {
    section.classList.toggle("dv-collapsible--open", open);
    const header = section.querySelector(".dv-collapsible__header");
    const body = section.querySelector(".dv-collapsible__body");
    if (header) header.setAttribute("aria-expanded", String(open));
    if (body instanceof HTMLElement) body.hidden = !open;
  }
  function panelCollapsibles(panel) {
    return [...panel.querySelectorAll(".dv-collapsible")];
  }
  function areAllCollapsiblesOpen(panel) {
    const sections = panelCollapsibles(panel);
    return sections.length > 0 && sections.every((s) => s.classList.contains("dv-collapsible--open"));
  }
  function setExpandAllButtonLabel(btn, allOpen) {
    const label = allOpen ? "Collapse all" : "Expand all";
    btn.innerHTML = `<span class="tds-btn__leading-icon">${ICON_EXPAND_ALL}</span>${label}`;
    btn.setAttribute("aria-pressed", String(allOpen));
  }
  function updateExpandAllButton(btn) {
    if (!(btn instanceof HTMLElement)) return;
    const panel = btn.closest(".dv-tabpanel");
    if (!panel) return;
    setExpandAllButtonLabel(btn, areAllCollapsiblesOpen(panel));
  }
  function syncExpandAllButtons(root = document) {
    root.querySelectorAll(".dv-expand-all").forEach(updateExpandAllButton);
  }
  function expandAllInPanel(panel) {
    panelCollapsibles(panel).forEach((section) => {
      setCollapsibleOpen(section, true);
    });
    expandAllInlineInPanel(panel);
  }
  function collapseAllInPanel(panel) {
    panelCollapsibles(panel).forEach((section) => {
      setCollapsibleOpen(section, false);
    });
    collapseAllInlineInPanel(panel);
  }
  function setTxnToggleOpen(btn, open) {
    var _a;
    const acc = btn.closest(".dv-acc");
    const table = acc == null ? void 0 : acc.querySelector(".dv-txntable");
    if (!(table instanceof HTMLElement)) return;
    table.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    const icon = btn.querySelector(".dv-ni2-txntoggle__icon");
    const label = btn.querySelector(".dv-ni2-txntoggle__label");
    const showLabel = (_a = label == null ? void 0 : label.getAttribute("data-show-label")) != null ? _a : "View transactions";
    const hideLabel = showLabel.replace(/^Show\s+/i, "Hide ").replace(/^View\s+/i, "Hide ");
    if (icon) icon.innerHTML = open ? ICON_MINUS : ICON_PLUS;
    if (label) label.textContent = open ? hideLabel : showLabel;
  }
  function setDeviceInfoOpen(scope, open) {
    var _a;
    const details = (_a = scope.querySelector("#dv-device-details")) != null ? _a : scope.querySelector(".dv-di-details");
    const btn = scope.querySelector(".dv-di-showinfo button");
    if (!(details instanceof HTMLElement) || !(btn instanceof HTMLElement)) return;
    details.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    const iconHtml = open ? ICON_MINUS : ICON_PLUS;
    const label = open ? "Hide Device Information" : "Show Device Information";
    btn.innerHTML = `<span class="tds-btn__leading-icon">${iconHtml}</span>${label}`;
  }
  function applyMoreSection(wrap, open) {
    var _a, _b;
    const table = wrap.previousElementSibling;
    if (!(table instanceof HTMLElement) || !table.classList.contains("dv-table")) {
      return;
    }
    const rows = table.querySelectorAll(".dv-table__row:not(.dv-table__head)");
    const limit = Number.parseInt(
      (_a = wrap.getAttribute("data-visible-limit")) != null ? _a : String(MORE_VISIBLE_ROWS),
      10
    );
    const hiddenN = Math.max(0, rows.length - limit);
    const label = (_b = wrap.getAttribute("data-group-label")) != null ? _b : "";
    const btn = wrap.querySelector("button");
    rows.forEach((row, index) => {
      if (index >= limit && row instanceof HTMLElement) row.hidden = !open;
    });
    if (btn instanceof HTMLElement) {
      btn.innerHTML = `<span class="tds-btn__leading-icon">${open ? ICON_MINUS : ICON_PLUS}</span>` + (open ? "Show less" : `${hiddenN} more ${label}`);
    }
    wrap.setAttribute("data-open", String(open));
  }
  function expandAllInlineInPanel(panel) {
    panel.querySelectorAll(".dv-more").forEach((wrap) => {
      applyMoreSection(wrap, true);
    });
    panel.querySelectorAll(".dv-ni2-txntoggle").forEach((btn) => {
      if (btn instanceof HTMLElement) setTxnToggleOpen(btn, true);
    });
    setDeviceInfoOpen(panel, true);
  }
  function collapseAllInlineInPanel(panel) {
    panel.querySelectorAll(".dv-more").forEach((wrap) => {
      applyMoreSection(wrap, false);
    });
    panel.querySelectorAll(".dv-ni2-txntoggle").forEach((btn) => {
      if (btn instanceof HTMLElement) setTxnToggleOpen(btn, false);
    });
    setDeviceInfoOpen(panel, false);
  }
  function resetInlineExpansions(root = document) {
    var _a;
    root.querySelectorAll(".dv-ni2-txntoggle").forEach((btn) => {
      var _a2;
      const acc = btn.closest(".dv-acc");
      const table = acc == null ? void 0 : acc.querySelector(".dv-txntable");
      if (!(table instanceof HTMLElement) || !(btn instanceof HTMLElement)) return;
      const isOpen = !table.hidden;
      btn.setAttribute("aria-expanded", String(isOpen));
      const icon = btn.querySelector(".dv-ni2-txntoggle__icon");
      const label = btn.querySelector(".dv-ni2-txntoggle__label");
      const showLabel = (_a2 = label == null ? void 0 : label.getAttribute("data-show-label")) != null ? _a2 : "View transactions";
      const hideLabel = showLabel.replace(/^Show\s+/i, "Hide ").replace(/^View\s+/i, "Hide ");
      if (icon) icon.innerHTML = isOpen ? ICON_MINUS : ICON_PLUS;
      if (label) label.textContent = isOpen ? hideLabel : showLabel;
    });
    const details = (_a = root.querySelector("#dv-device-details")) != null ? _a : root.querySelector(".dv-di-details");
    if (details instanceof HTMLElement) details.hidden = true;
    root.querySelectorAll(".dv-di-showinfo button").forEach((btn) => {
      if (!(btn instanceof HTMLElement)) return;
      btn.setAttribute("aria-expanded", "false");
      btn.innerHTML = `<span class="tds-btn__leading-icon">${ICON_PLUS}</span>Show Device Information`;
    });
  }
  function initMoreButtons(root = document) {
    root.querySelectorAll(".dv-group .dv-more").forEach((el) => el.remove());
    root.querySelectorAll(".dv-group .dv-table").forEach((table) => {
      var _a, _b, _c;
      const rows = table.querySelectorAll(
        ".dv-table__row:not(.dv-table__head)"
      );
      if (rows.length <= MORE_VISIBLE_ROWS) return;
      const lblEl = (_a = table.closest(".dv-group")) == null ? void 0 : _a.querySelector(".dv-group__label");
      const label = ((_b = lblEl == null ? void 0 : lblEl.textContent) != null ? _b : "").toLowerCase();
      const hiddenN = rows.length - MORE_VISIBLE_ROWS;
      const wrap = document.createElement("div");
      wrap.className = "dv-more";
      wrap.setAttribute("data-open", "false");
      wrap.setAttribute("data-visible-limit", String(MORE_VISIBLE_ROWS));
      wrap.setAttribute("data-group-label", label);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tds-btn tds-btn--secondary tds-btn--sm";
      btn.innerHTML = `<span class="tds-btn__leading-icon">${ICON_PLUS}</span>${hiddenN} more ${label}`;
      btn.addEventListener("click", () => {
        const open = wrap.getAttribute("data-open") !== "true";
        applyMoreSection(wrap, open);
      });
      wrap.appendChild(btn);
      (_c = table.parentNode) == null ? void 0 : _c.insertBefore(wrap, table.nextSibling);
      applyMoreSection(wrap, false);
    });
  }
  function getDataTableRows(table) {
    const selector = table.classList.contains("dv-ditable") ? ".dv-ditable__row" : ".dv-txntable__row";
    return [...table.querySelectorAll(selector)].filter(
      (row) => row instanceof HTMLElement
    );
  }
  function getRowCellText(row, colIndex) {
    var _a, _b;
    const cell = row.children[colIndex];
    return (_b = (_a = cell == null ? void 0 : cell.textContent) == null ? void 0 : _a.trim()) != null ? _b : "";
  }
  function sortDataTable(table, colIndex, direction) {
    const rows = getDataTableRows(table);
    rows.sort((a, b) => {
      const cmp = getRowCellText(a, colIndex).localeCompare(
        getRowCellText(b, colIndex),
        void 0,
        { sensitivity: "base", numeric: true }
      );
      return direction === "asc" ? cmp : -cmp;
    });
    rows.forEach((row) => table.appendChild(row));
  }
  function updateSortHeaders(table, activeCol, direction) {
    const head = table.querySelector(".dv-ditable__head, .dv-txntable__head");
    if (!head) return;
    head.querySelectorAll(".dv-datatable__sort").forEach((btn) => {
      var _a;
      const col = Number.parseInt((_a = btn.getAttribute("data-sort-col")) != null ? _a : "-1", 10);
      if (col === activeCol) {
        btn.setAttribute(
          "aria-sort",
          direction === "asc" ? "ascending" : "descending"
        );
      } else {
        btn.setAttribute("aria-sort", "none");
      }
    });
  }
  function initDataTableSort(root = document) {
    root.querySelectorAll(".dv-ditable, .dv-txntable").forEach((table) => {
      sortDataTable(table, 0, "asc");
      updateSortHeaders(table, 0, "asc");
    });
  }
  function storeTxnShowLabels(root = document) {
    root.querySelectorAll(".dv-ni2-txntoggle__label").forEach((label) => {
      if (!label.getAttribute("data-show-label") && label.textContent) {
        label.setAttribute("data-show-label", label.textContent);
      }
    });
  }
  function isDeviceIntelligenceTabActive() {
    const panel = document.querySelector(
      '.dv-tabpanel[data-tab="device-intelligence"]'
    );
    return panel instanceof HTMLElement && !panel.hidden;
  }
  function playDeviceGaugeAnimation() {
    if (!isDeviceIntelligenceTabActive()) return;
    renderGauges(document);
  }
  function setScenario(id) {
    const config = getScenario(id);
    applyScenario(document, config);
    selectTab(config.defaultTab);
    resetInlineExpansions(document);
    storeTxnShowLabels(document);
    playDeviceGaugeAnimation();
    initMoreButtons(document);
    initDataTableSort(document);
    syncExpandAllButtons(document);
  }
  function wireTabs() {
    document.querySelectorAll(".dv-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-tab");
        if (!target) return;
        selectTab(target);
        if (target === "device-intelligence") playDeviceGaugeAnimation();
      });
    });
  }
  function wireCollapsibles() {
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const header = target.closest(".dv-collapsible__header");
      if (!header) return;
      const section = header.closest(".dv-collapsible");
      if (!section) return;
      const willOpen = !section.classList.contains("dv-collapsible--open");
      setCollapsibleOpen(section, willOpen);
      const panel = section.closest(".dv-tabpanel");
      const expandBtn = panel == null ? void 0 : panel.querySelector(".dv-expand-all");
      if (expandBtn) updateExpandAllButton(expandBtn);
    });
  }
  function wireExpandAll() {
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const btn = target.closest(".dv-expand-all");
      if (!(btn instanceof HTMLElement)) return;
      const panel = btn.closest(".dv-tabpanel");
      if (!panel) return;
      if (areAllCollapsiblesOpen(panel)) {
        collapseAllInPanel(panel);
      } else {
        expandAllInPanel(panel);
      }
      updateExpandAllButton(btn);
    });
  }
  function wireTxnToggles() {
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const btn = target.closest(".dv-ni2-txntoggle");
      if (!(btn instanceof HTMLElement)) return;
      const acc = btn.closest(".dv-acc");
      const table = acc == null ? void 0 : acc.querySelector(".dv-txntable");
      if (!(table instanceof HTMLElement)) return;
      setTxnToggleOpen(btn, table.hidden);
    });
  }
  function wireDataTableSort() {
    document.addEventListener("click", (event) => {
      var _a;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const btn = target.closest(".dv-datatable__sort");
      if (!(btn instanceof HTMLElement)) return;
      const head = btn.closest(".dv-ditable__head, .dv-txntable__head");
      const table = head == null ? void 0 : head.parentElement;
      if (!(table instanceof HTMLElement)) return;
      const col = Number.parseInt((_a = btn.getAttribute("data-sort-col")) != null ? _a : "0", 10);
      const current = btn.getAttribute("aria-sort");
      const direction = current === "ascending" ? "desc" : "asc";
      sortDataTable(table, col, direction);
      updateSortHeaders(table, col, direction);
    });
  }
  function wireDeviceInfoToggle() {
    document.addEventListener("click", (event) => {
      var _a, _b, _c, _d;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const btn = target.closest(".dv-di-showinfo button");
      if (!(btn instanceof HTMLElement)) return;
      const scope = (_a = btn.closest(".dv-tabpanel")) != null ? _a : document;
      const details = (_d = (_c = scope.querySelector("#dv-device-details")) != null ? _c : (_b = btn.closest(".dv-di-top")) == null ? void 0 : _b.querySelector(".dv-di-details")) != null ? _d : scope.querySelector(".dv-di-details");
      if (!(details instanceof HTMLElement)) return;
      setDeviceInfoOpen(scope, details.hidden);
    });
  }
  function setSidebarCollapsed(collapsed) {
    const columns = document.getElementById("dv-columns");
    const collapseBtn = document.querySelector(".dv-sidebar-toggle--collapse");
    const expandBtn = document.querySelector(".dv-sidebar-toggle--expand");
    if (!columns) return;
    columns.classList.toggle("dv-columns--sidebar-collapsed", collapsed);
    collapseBtn == null ? void 0 : collapseBtn.setAttribute("aria-expanded", String(!collapsed));
    expandBtn == null ? void 0 : expandBtn.setAttribute("aria-expanded", String(collapsed));
  }
  function wireSidebarCollapse() {
    const collapseBtn = document.querySelector(".dv-sidebar-toggle--collapse");
    const expandBtn = document.querySelector(".dv-sidebar-toggle--expand");
    collapseBtn == null ? void 0 : collapseBtn.addEventListener("click", () => setSidebarCollapsed(true));
    expandBtn == null ? void 0 : expandBtn.addEventListener("click", () => setSidebarCollapsed(false));
  }
  function figureImageTitle(figure) {
    var _a, _b, _c, _d;
    const caption = figure.querySelector(".dv-doc-image__caption");
    if (caption) {
      const clone = caption.cloneNode(true);
      if (clone instanceof HTMLElement) {
        clone.querySelectorAll("button").forEach((btn) => btn.remove());
        const text = (_a = clone.textContent) == null ? void 0 : _a.trim();
        if (text) return text;
      }
    }
    const viewerTitle = (_d = (_c = (_b = figure.closest(".dv-viewer")) == null ? void 0 : _b.querySelector(".dv-section-title")) == null ? void 0 : _c.textContent) == null ? void 0 : _d.trim();
    return viewerTitle != null ? viewerTitle : "Image";
  }
  function closeImageModal() {
    const modal = document.getElementById("dv-image-modal");
    const body = document.getElementById("dv-image-modal-body");
    if (!(modal instanceof HTMLElement)) return;
    modal.hidden = true;
    if (body) body.innerHTML = "";
    document.body.style.overflow = "";
  }
  function openImageModal(figure) {
    const modal = document.getElementById("dv-image-modal");
    const title = document.getElementById("dv-image-modal-title");
    const body = document.getElementById("dv-image-modal-body");
    const media = figure.querySelector(".dv-doc-image__media");
    if (!(modal instanceof HTMLElement) || !title || !body || !media) return;
    title.textContent = figureImageTitle(figure);
    body.innerHTML = media.innerHTML;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    const closeBtn = modal.querySelector(".dv-image-modal__close");
    if (closeBtn instanceof HTMLElement) closeBtn.focus();
  }
  function wireImageModal() {
    document.addEventListener("click", (event) => {
      var _a;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-modal-close]")) {
        closeImageModal();
        return;
      }
      const expandBtn = target.closest(".dv-doc-image .dv-icon-btn");
      const media = expandBtn ? null : target.closest(".dv-doc-image__media");
      const figure = (_a = expandBtn != null ? expandBtn : media) == null ? void 0 : _a.closest(".dv-doc-image");
      if (!figure) return;
      event.preventDefault();
      openImageModal(figure);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      const modal = document.getElementById("dv-image-modal");
      if (modal instanceof HTMLElement && !modal.hidden) closeImageModal();
    });
  }
  function isSplitPaneStacked() {
    return window.matchMedia(`(max-width: ${SPLIT_STACK_MAX}px)`).matches;
  }
  function clampSplitEnd(pane, endWidth) {
    const maxEnd = pane.getBoundingClientRect().width - SPLIT_MIN_START - 8;
    return Math.max(SPLIT_MIN_END, Math.min(endWidth, maxEnd));
  }
  function setSplitEndWidth(pane, endWidth) {
    const clamped = clampSplitEnd(pane, endWidth);
    pane.style.setProperty("--dv-split-end", `${clamped}px`);
    pane.style.gridTemplateColumns = `minmax(${SPLIT_MIN_START}px, 1fr) 8px ${clamped}px`;
  }
  function wireSplitPanes() {
    document.querySelectorAll("[data-split-pane]").forEach((pane) => {
      const divider = pane.querySelector(".dv-split-pane__divider");
      if (!divider) return;
      setSplitEndWidth(pane, SPLIT_DEFAULT_END);
      const stopDragging = (pointerId, onMove, onUp) => {
        divider.classList.remove("is-dragging");
        document.body.classList.remove("dv-is-resizing");
        if (divider.hasPointerCapture(pointerId)) {
          divider.releasePointerCapture(pointerId);
        }
        divider.removeEventListener("pointermove", onMove);
        divider.removeEventListener("pointerup", onUp);
        divider.removeEventListener("pointercancel", onUp);
      };
      const startDrag = (clientX) => {
        const rect = pane.getBoundingClientRect();
        setSplitEndWidth(pane, rect.right - clientX);
      };
      divider.addEventListener("pointerdown", (event) => {
        if (isSplitPaneStacked()) return;
        event.preventDefault();
        divider.setPointerCapture(event.pointerId);
        divider.classList.add("is-dragging");
        document.body.classList.add("dv-is-resizing");
        startDrag(event.clientX);
        const onMove = (ev) => {
          startDrag(ev.clientX);
        };
        const onUp = (ev) => {
          stopDragging(ev.pointerId, onMove, onUp);
        };
        divider.addEventListener("pointermove", onMove);
        divider.addEventListener("pointerup", onUp);
        divider.addEventListener("pointercancel", onUp);
      });
      divider.addEventListener("keydown", (event) => {
        if (isSplitPaneStacked()) return;
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const current = Number.parseInt(
          getComputedStyle(pane).getPropertyValue("--dv-split-end") || `${SPLIT_DEFAULT_END}px`,
          10
        );
        const delta = event.key === "ArrowLeft" ? -16 : 16;
        setSplitEndWidth(pane, current + delta);
      });
    });
  }
  function wireAppNavToggle() {
    const shell = document.getElementById("app-shell");
    const toggle = document.getElementById("app-nav-toggle");
    const overlay = document.getElementById("app-sidenav-overlay");
    if (!(shell instanceof HTMLElement) || !(toggle instanceof HTMLElement) || !(overlay instanceof HTMLElement)) {
      return;
    }
    const setOpen = (open) => {
      shell.classList.toggle("app-shell--nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      overlay.hidden = !open;
      overlay.setAttribute("aria-hidden", String(!open));
    };
    toggle.addEventListener("click", () => {
      setOpen(!shell.classList.contains("app-shell--nav-open"));
    });
    overlay.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && shell.classList.contains("app-shell--nav-open")) {
        setOpen(false);
      }
    });
    window.matchMedia("(min-width: 769px)").addEventListener("change", (query) => {
      if (query.matches) setOpen(false);
    });
  }
  function wireTestEntitySelect() {
    const sel = document.getElementById("dv-te-select");
    if (!sel) return;
    const trigger = sel.querySelector(".tds-select__trigger");
    if (!(trigger instanceof HTMLElement)) return;
    const close = () => {
      sel.classList.remove("tds-select--open");
      trigger.setAttribute("aria-expanded", "false");
    };
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = sel.classList.toggle("tds-select--open");
      trigger.setAttribute("aria-expanded", String(open));
    });
    sel.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const opt = target.closest(".dv-te-option");
      if (!(opt instanceof HTMLElement)) return;
      const id = opt.getAttribute("data-id");
      if (id && isScenarioId(id)) {
        setScenario(id);
        close();
      }
    });
    document.addEventListener("click", (e) => {
      if (!(e.target instanceof Node) || !sel.contains(e.target)) close();
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    wireTabs();
    wireCollapsibles();
    wireExpandAll();
    wireTxnToggles();
    wireDataTableSort();
    wireDeviceInfoToggle();
    wireSidebarCollapse();
    wireImageModal();
    wireSplitPanes();
    wireAppNavToggle();
    wireTestEntitySelect();
    setScenario(INITIAL_SCENARIO);
  });
})();
