import { deepMerge, type DeepPartial } from "./deep-merge";
import type {
  CheckRow,
  DiConfig,
  DiEvidenceGroup,
  DiEvidenceRow,
  IndicatorGroup,
  NiConfig,
  NiInsight,
  NiSummary,
  NiSummaryDriver,
  ScenarioConfig,
  ScenarioId,
  SummaryRow,
} from "./types";

const accepted = (title: string, sub?: string): CheckRow => ({
  title,
  sub,
  result: "Accepted",
  kind: "accepted",
});

const notDetected = (title: string): CheckRow => ({
  title,
  result: "Not detected",
  kind: "not-detected",
});

const exactMatch = (title: string, value: string): CheckRow => ({
  title,
  sub: `Input: ${value} · Extracted: ${value}`,
  result: "Exact Match",
  kind: "exact-match",
});

const noRisk = (title: string, result: string): DiEvidenceRow => ({
  title,
  result,
  insight: "No Risk",
});

const risk = (title: string, result = "High"): DiEvidenceRow => ({
  title,
  result,
  insight: "Risk",
});

const notRun = (title: string, result = "Not Run"): DiEvidenceRow => ({
  title,
  result,
  insight: "Not Run",
});

const emptyGroup = (
  key: string,
  label: string,
  emptyState: string,
  extras: Partial<IndicatorGroup> = {},
): IndicatorGroup => ({
  key,
  label,
  rows: [],
  emptyState,
  ...extras,
});

const documentAcceptedRows: CheckRow[] = [
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
  accepted("Printout detection", "No printout detected"),
];

const withoutAcceptedTitle = (title: string): CheckRow[] =>
  documentAcceptedRows.filter((row) => row.title !== title);

const documentGroups = (
  groups: {
    declined?: CheckRow[];
    review?: CheckRow[];
    accepted?: CheckRow[];
    notRun?: CheckRow[];
  },
  helper?: string,
): ScenarioConfig["document"] => ({
  helper,
  groups: [
    groups.declined?.length
      ? { key: "declined", label: "Declined", rows: groups.declined }
      : emptyGroup("declined", "Declined", "No declined checks."),
    groups.review?.length
      ? { key: "review", label: "Review", rows: groups.review }
      : emptyGroup("review", "Review", "No checks require review."),
    {
      key: "accepted",
      label: "Accepted",
      rows: groups.accepted ?? documentAcceptedRows,
    },
    groups.notRun?.length
      ? { key: "not-run", label: "Not Run", rows: groups.notRun }
      : emptyGroup("not-run", "Not Run", "No checks were skipped."),
  ],
});

const biometricAcceptedRows: CheckRow[] = [
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
  accepted("Capture integrity", "Valid camera capture"),
];

const biometricNotDetectedRows: CheckRow[] = [
  notDetected("Spoof attempt"),
  notDetected("Injection attack"),
  notDetected("Deepfake indicators"),
];

const knownFacesEmpty = (
  emptyState = "No matching faces were found in previous high-risk or declined transactions.",
): IndicatorGroup =>
  emptyGroup("known-faces", "Known Faces", emptyState, {
    countLabel: "No matches",
  });

const exactMatchRows: CheckRow[] = [
  exactMatch("First name", "Jane"),
  exactMatch("Last name", "Doe"),
  exactMatch("Date of birth", "1986/03/24"),
  exactMatch("Document number", "D1234567"),
  exactMatch("Expiry date", "2028/03/20"),
  exactMatch("Country", "United States"),
];

const partialMatchEmpty = emptyGroup(
  "partial-match",
  "Partial Match",
  "No partial or conflicting data matches were found.",
);

const happyNiMetrics: NiInsight["metrics"] = [
  { label: "Transactions affected", value: "0" },
  { label: "Identity conflicts", value: "0" },
  { label: "First seen", value: "Current transaction" },
  { label: "Most recent", value: "Current transaction" },
];

/** Shared "all clear" Key Drivers — one card per network signal, linking to its section. */
const cleanNiDrivers: NiSummaryDriver[] = [
  {
    text: "No synthetic identity reuse: this face has not been seen with other identities",
    targetId: "synthetic-identity",
  },
  {
    text: "No document conflicts across previous transactions",
    targetId: "document-conflict",
  },
  {
    text: "IP and transaction velocity within normal range",
    targetId: "ip-velocity",
  },
];

const cleanNetworkInsights = (
  messages?: Partial<Record<"synthetic" | "document" | "ip", string>>,
  summary?: NiSummary,
): NiConfig => ({
  headerStatus: "Clean",
  headerTone: "positive",
  summary,
  flagged: [],
  clean: [
    {
      id: "synthetic-identity",
      title: "Synthetic identity",
      status: "clean",
      primaryMessage:
        messages?.synthetic ??
        "No evidence that this face has been used with different identity or document data.",
      metrics: happyNiMetrics,
    },
    {
      id: "document-conflict",
      title: "Document conflict",
      status: "clean",
      primaryMessage:
        messages?.document ??
        "No conflicting document numbers or identity attributes were found across previous transactions.",
      metrics: happyNiMetrics,
    },
    {
      id: "ip-velocity",
      title: "IP Velocity Anomaly",
      status: "clean",
      primaryMessage:
        messages?.ip ??
        "No unusual IP, country or transaction velocity patterns were detected.",
      metrics: happyNiMetrics,
    },
  ],
});

const happyDeviceEvidence: DiConfig["evidence"] = [
  {
    key: "risk-outputs",
    label: "Risk Outputs",
    rows: [
      noRisk("Device Risk Level", "Low"),
      noRisk("Session Risk", "Low"),
      noRisk("Automation", "Not detected"),
      noRisk("Fraud indicators", "None"),
    ],
  },
  {
    key: "network-location",
    label: "Network & Location",
    rows: [
      noRisk("VPN", "No"),
      noRisk("Proxy", "No"),
      noRisk("TOR", "No"),
      noRisk("IP reputation", "Clean"),
      noRisk("Location consistency", "Match"),
    ],
  },
  {
    key: "integrity-compromise",
    label: "Integrity & Compromise",
    rows: [
      noRisk("Emulator", "No"),
      noRisk("Root or jailbreak", "No"),
      noRisk("Debugging tools", "No"),
    ],
  },
  {
    key: "device-identity-history",
    label: "Device Identity & History",
    rows: [
      noRisk("First-party device", "Yes"),
      noRisk("Identity count", "1"),
      noRisk("Stable fingerprint", "Yes"),
      noRisk("Prior fraud", "None"),
    ],
  },
  {
    key: "behavioral-biometrics",
    label: "Behavioral Biometrics",
    rows: [
      noRisk("Natural interaction", "Yes"),
      noRisk("Automation pattern", "Not detected"),
    ],
  },
  {
    key: "location-history",
    label: "Location History",
    rows: [
      noRisk("Current location consistent", "Yes"),
      noRisk("Impossible travel", "Not detected"),
    ],
  },
];

export function normalizeDiEvidence(
  evidence: DiConfig["evidence"],
): DiEvidenceGroup[] {
  const byKey = new Map(evidence.map((group) => [group.key, group]));
  return happyDeviceEvidence.map((template) => {
    const match = byKey.get(template.key);
    return (
      match ?? {
        key: template.key,
        label: template.label,
        rows: [],
      }
    );
  });
}

const happyDeviceDetails = [
  { label: "Device ID", value: "3045489E05849546" },
  { label: "Device model", value: "iPhone 15" },
  { label: "Operating system", value: "iOS 18" },
  { label: "Browser", value: "Mobile Safari" },
  { label: "First seen", value: "05 July 2026, 3:30pm" },
  { label: "Language", value: "en-US" },
  { label: "Timezone", value: "UTC-07" },
  { label: "Battery", value: "68%" },
];

const lowRiskDevice = (summary: string, score = 1): DiConfig => ({
  score,
  risk: "low",
  riskLabel: "Low Risk",
  summary,
  indicators: [
    "Trusted browser and operating system",
    "Stable location and timezone",
    "No shared-device activity",
  ],
  deviceId: "3045489E05849546",
  firstSeenLabel: "First seen",
  deviceDetails: happyDeviceDetails,
  evidence: happyDeviceEvidence,
});

const happySummary: SummaryRow[] = [
  { label: "Document", value: "Accepted", tone: "positive" },
  { label: "Biometrics", value: "Accepted", tone: "positive" },
  { label: "Known Faces", value: "No Match", tone: "default" },
  { label: "Data Match", value: "6 Exact Matches", tone: "positive" },
  { label: "Device Intelligence", value: "Low Risk", tone: "positive" },
];

const happyNiSummary: NiSummary = {
  status: "clear",
  title: "No network risk detected",
  message:
    "This identity shows no cross-transaction fraud signals. Face, document and IP activity are all consistent with a single, legitimate identity.",
  drivers: cleanNiDrivers,
};

/**
 * Network is clean, but the transaction failed or needs review for reasons in
 * another tab — an informational (not all-clear) state.
 */
const infoNiSummary = (message: string): NiSummary => ({
  status: "info",
  title: "No network risk detected",
  message,
  drivers: cleanNiDrivers,
});

const happyPath: ScenarioConfig = {
  id: "happy-path",
  label: "Happy path",
  selectDesc: "All checks passed. Clean document and biometrics.",
  overallStatus: "Accepted",
  overallTone: "positive",
  defaultTab: "document",
  transactionId: "8c2f4e7a-19bd-4f02-a6c1-77de42915b3a",
  truAiSummary:
    "Jane Doe’s identity has been verified. All required checks passed and no additional review is needed.",
  summaryRows: happySummary,
  documentInfo: {
    documentType: "Driver's License",
    documentNumber: "D1234567",
    issuingState: "California",
    expiryDate: "2028/03/20",
    documentStatus: "Valid",
    authenticity: "Verified",
  },
  document: documentGroups({ accepted: documentAcceptedRows }),
  biometrics: {
    groups: [
      { key: "accepted", label: "Accepted", rows: biometricAcceptedRows },
      {
        key: "not-detected",
        label: "Not detected",
        rows: biometricNotDetectedRows,
      },
      knownFacesEmpty(),
    ],
  },
  dataMatch: {
    groups: [
      { key: "exact-match", label: "Exact Matches", rows: exactMatchRows },
      partialMatchEmpty,
    ],
  },
  networkInsights: cleanNetworkInsights(undefined, happyNiSummary),
  deviceIntelligence: lowRiskDevice(
    "Device activity is consistent with a normal verification session. No suspicious device, network or behavioral indicators were detected.",
    4,
  ),
};

const knownFaceTransactions = [
  {
    date: "14 Sep 2025, 9:14 AM",
    id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
    differences: ["Person", "Document", "DOB"],
    result: "Declined" as const,
  },
  {
    date: "02 Dec 2025, 4:28 PM",
    id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
    differences: ["Person", "Address"],
    result: "Declined" as const,
  },
  {
    date: "19 Mar 2026, 11:06 AM",
    id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
    differences: ["Document", "IP Address"],
    result: "Accepted" as const,
  },
  {
    date: "17 Jun 2026, 2:14 PM",
    id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
    differences: ["Current transaction"],
    result: "Declined" as const,
  },
];

/** Document-conflict evidence list (Flagged) — same shape as Figma / original demo. */
const knownFaceDocumentConflictTransactions = [
  {
    date: "14 Sep 2025, 9:14 AM",
    id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
    differences: ["Document"],
    result: "Declined" as const,
  },
  {
    date: "02 Dec 2025, 4:28 PM",
    id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
    differences: ["Document", "Person"],
    result: "Declined" as const,
  },
  {
    date: "19 Mar 2026, 11:06 AM",
    id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
    differences: [],
    result: "Accepted" as const,
  },
  {
    date: "17 Jun 2026, 2:14 PM",
    id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
    differences: [],
    result: "Accepted" as const,
  },
];

const knownFaceDeviceEvidence: DiConfig["evidence"] = [
  {
    key: "risk-outputs",
    label: "Risk Outputs",
    rows: [
      risk("Device Risk Level"),
      risk("Shared Device Risk"),
      risk("Identity Velocity"),
      risk("Prior Fraud Association"),
    ],
  },
  {
    key: "network-location",
    label: "Network & Location",
    rows: [
      risk("IP reputation"),
      risk("Location velocity"),
      noRisk("VPN", "No"),
      noRisk("Proxy", "No"),
      notRun("TOR"),
    ],
  },
  {
    key: "integrity-compromise",
    label: "Integrity & Compromise",
    rows: [
      noRisk("Emulator", "No"),
      noRisk("Rooted device", "No"),
      notRun("Debugging tools"),
    ],
  },
  {
    key: "device-identity-history",
    label: "Device Identity & History",
    rows: [
      risk("Multiple identities"),
      risk("Previous declined transaction"),
      noRisk("Stable device fingerprint", "Yes"),
      noRisk("Device age", "Normal"),
      notRun("Account linkage"),
    ],
  },
  {
    key: "behavioral-biometrics",
    label: "Behavioral Biometrics",
    rows: [
      risk("Repeated identity switching"),
      noRisk("Interaction pattern", "Normal"),
    ],
  },
  {
    key: "location-history",
    label: "Location History",
    rows: [
      risk("Rapid country change"),
      noRisk("Current IP-to-timezone consistency", "Match"),
    ],
  },
];

const deepfakeDeviceEvidence: DiConfig["evidence"] = [
  {
    key: "risk-outputs",
    label: "Risk Outputs",
    rows: [
      risk("Device Risk Level"),
      risk("Capture Integrity Risk"),
      risk("Virtual Camera Risk"),
      noRisk("IP reputation", "Clean"),
    ],
  },
  {
    key: "network-location",
    label: "Network & Location",
    rows: [
      noRisk("VPN", "No"),
      noRisk("Proxy", "No"),
      noRisk("TOR", "No"),
      noRisk("IP reputation", "Clean"),
      notRun("Location history"),
    ],
  },
  {
    key: "integrity-compromise",
    label: "Integrity & Compromise",
    rows: [
      risk("Virtual camera interface"),
      risk("Media injection indicators"),
      noRisk("Root or admin compromise", "No"),
    ],
  },
  {
    key: "device-identity-history",
    label: "Device Identity & History",
    rows: [
      risk("First-seen device"),
      noRisk("Multiple identities", "No"),
      noRisk("Previous fraud association", "None"),
      noRisk("Device fingerprint stability", "Yes"),
    ],
  },
  {
    key: "behavioral-biometrics",
    label: "Behavioral Biometrics",
    rows: [
      risk("Frame timing inconsistency"),
      risk("Unnatural facial motion"),
    ],
  },
  {
    key: "location-history",
    label: "Location History",
    rows: [noRisk("Current IP and timezone consistent", "Yes")],
  },
];

const scenarioOverrides: Record<
  Exclude<ScenarioId, "happy-path">,
  DeepPartial<ScenarioConfig>
> = {
  "expired-document": {
    id: "expired-document",
    label: "Expired document",
    selectDesc: "Document expired; auto-decline.",
    overallStatus: "Review",
    overallTone: "intermediate",
    defaultTab: "document",
    transactionId: "91e0b2c4-55aa-4c11-9f20-12ab34cd56ef",
    truAiSummary:
      "Jane Doe’s document is authentic, but it has expired. A valid, non-expired document is required.",
    summaryRows: [
      { label: "Document", value: "Declined", tone: "negative" },
      ...happySummary.slice(1),
    ],
    documentInfo: {
      expiryDate: "2023/01/15",
      expiryNote: "Expired",
      documentStatus: "Expired",
      authenticity: "Verified",
    },
    document: documentGroups({
      declined: [
        {
          title: "Expiry date check",
          sub: "Document expired on 15 January 2023.",
          result: "Declined",
          kind: "declined",
        },
      ],
      accepted: withoutAcceptedTitle("Expiry check"),
    }),
    dataMatch: {
      helper:
        "Data can match exactly even when the document itself is no longer valid.",
    },
    networkInsights: cleanNetworkInsights(
      undefined,
      infoNiSummary(
        "Network intelligence found no fraud signals. This transaction was declined because the document has expired — not because of network activity.",
      ),
    ),
    deviceIntelligence: {
      score: 11,
      summary:
        "The device and session appear legitimate. The decline is caused only by the expired document.",
    },
  },

  "face-mismatch": {
    id: "face-mismatch",
    label: "Face mismatch",
    selectDesc: "Selfie does not match document portrait.",
    overallStatus: "Declined",
    overallTone: "negative",
    defaultTab: "biometrics",
    transactionId: "b7d1e9f0-22cc-4a88-81de-90fe12ab34cd",
    truAiSummary:
      "The document is valid, but the selfie does not match the portrait on the document. Liveness passed and no spoofing was detected.",
    summaryRows: [
      { label: "Document", value: "Accepted", tone: "positive" },
      { label: "Biometrics", value: "Declined", tone: "negative" },
      ...happySummary.slice(2),
    ],
    document: documentGroups(
      { accepted: withoutAcceptedTitle("Face match") },
      "Document authenticity passed. Biometric comparison is shown in the Biometrics tab.",
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
                { label: "Required threshold", value: "70%" },
              ],
            },
          ],
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
            accepted("Capture integrity", "Valid camera capture"),
          ],
        },
        {
          key: "not-detected",
          label: "Not detected",
          rows: [
            notDetected("Spoof attempt"),
            notDetected("Deepfake indicators"),
          ],
        },
        knownFacesEmpty(
          "The selfie did not match the document portrait, but it was not found in known-face records.",
        ),
      ],
    },
    dataMatch: {
      helper:
        "Identity data is consistent. The decline is caused by biometric mismatch, not data inconsistency.",
    },
    networkInsights: cleanNetworkInsights(
      {
        synthetic:
          "No evidence that this face has been reused across different identities.",
        document: "No conflicting identity or document records were found.",
        ip: "No unusual IP or transaction velocity was detected.",
      },
      infoNiSummary(
        "Network intelligence found no fraud signals. The decline is caused by a biometric face mismatch, not by network activity.",
      ),
    ),
    deviceIntelligence: lowRiskDevice(
      "The device and network appear normal. The transaction was declined because of the face mismatch, not device risk.",
      17,
    ),
  },

  "dob-mismatch": {
    id: "dob-mismatch",
    label: "DOB mismatch",
    selectDesc: "Applicant DOB conflicts with document OCR.",
    overallStatus: "Declined",
    overallTone: "negative",
    defaultTab: "data-match",
    transactionId: "c0ffee12-3456-4abc-9def-112233445566",
    truAiSummary:
      "The date of birth entered by the applicant does not match the date extracted from the document. Manual review is recommended.",
    summaryRows: [
      { label: "Document", value: "Review", tone: "intermediate" },
      happySummary[1],
      happySummary[2],
      {
        label: "Data Match",
        value: "5 Exact · 1 Partial",
        tone: "intermediate",
      },
      happySummary[4],
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
            { label: "Document OCR", value: "1988/11/30" },
          ],
        },
      ],
      accepted: withoutAcceptedTitle("DOB cross-check"),
    }),
    biometrics: {
      helper:
        "The person appears to be the document holder. The review is caused by a data discrepancy.",
    },
    dataMatch: {
      groups: [
        {
          key: "exact-match",
          label: "Exact Matches",
          rows: exactMatchRows.filter(
            (row) => row.title !== "Date of birth",
          ),
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
                { label: "Barcode / MRZ", value: "1988/11/03" },
              ],
            },
          ],
        },
      ],
    },
    networkInsights: cleanNetworkInsights(
      undefined,
      infoNiSummary(
        "Network intelligence found no fraud signals. This transaction is under manual review for a date-of-birth discrepancy, not for network activity.",
      ),
    ),
    deviceIntelligence: {
      score: 23,
      summary:
        "No suspicious device or network activity was detected. Manual review is required only for the DOB discrepancy.",
    },
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
    truAiSummary:
      "Jane Doe’s document and selfie passed verification, but the face matches a previously declined identity associated with fraud.",
    summaryRows: [
      { label: "Document", value: "Accepted", tone: "positive" },
      { label: "Biometrics", value: "Accepted", tone: "positive" },
      { label: "Known Faces", value: "Declined", tone: "negative" },
      happySummary[3],
      { label: "Device Intelligence", value: "High Risk", tone: "negative" },
    ],
    document: {
      helper:
        "The document is authentic and valid. The fraud decision comes from cross-transaction intelligence.",
    },
    biometrics: {
      groups: [
        { key: "accepted", label: "Accepted", rows: biometricAcceptedRows },
        {
          key: "known-faces",
          label: "Known Faces",
          countLabel: "3 Matches",
          rows: [],
          knownFaces: {
            message:
              "This face matches a previously declined identity associated with confirmed fraud.",
            matchedCount: 5,
            matches: [
              {
                date: "13 Nov 2022, 2:56 PM",
                id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
                status: "Declined",
                similarity: "96.8%",
                previousName: "Jane Doe",
              },
              {
                date: "12 Nov 2022, 2:00 PM",
                id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
                status: "Declined",
                similarity: "90.2%",
                previousName: "Jane Doe",
              },
              {
                date: "12 Nov 2022, 2:00 PM",
                id: "0bbb93aa-4964-457c-8523-62b48b39cc83",
                status: "Declined",
                similarity: "90.2%",
                previousName: "Jane Doe",
              },
            ],
          },
        },
        {
          key: "not-detected",
          label: "Not detected",
          rows: biometricNotDetectedRows,
        },
      ],
    },
    dataMatch: {
      helper:
        "Current transaction data is internally consistent. The risk comes from a match to a different historical identity.",
    },
    networkInsights: {
      headerStatus: "Flagged",
      headerTone: "negative",
      summary: {
        status: "flagged",
        title: "Network fraud signals detected",
        message:
          "This face is linked to multiple identities and a previously declined fraud record. The current transaction matches historical activity associated with confirmed fraud.",
        drivers: [
          {
            text: "Synthetic identity: same face seen across 3 different identities",
            targetId: "synthetic-identity",
          },
          {
            text: "Document conflict: same face linked to multiple document numbers",
            targetId: "document-conflict",
          },
          {
            text: "4 related transactions found — 3 previously declined",
            targetId: "synthetic-identity",
          },
          {
            text: "IP and transaction velocity within normal range",
            targetId: "ip-velocity",
          },
        ],
      },
      flagged: [
        {
          id: "synthetic-identity",
          title: "Synthetic identity",
          status: "flagged",
          trendBadge: "Face reused across identities",
          primaryMessage:
            "This face appears in 4 transactions under 3 different identities and document records.",
          supportingMessage:
            "The current face matches historical transactions with conflicting names, dates of birth and document numbers.",
          metrics: [
            { label: "Transactions affected", value: "4" },
            { label: "Identity conflicts", value: "3" },
            { label: "First seen", value: "September 2025" },
            { label: "Most recent", value: "June 2026" },
          ],
          showTransactionsLabel: "View transactions",
          transactions: knownFaceTransactions,
        },
        {
          id: "document-conflict",
          title: "Document conflict",
          status: "flagged",
          primaryMessage:
            "The same face has been associated with multiple document numbers and identity records.",
          metrics: [
            { label: "Documents observed", value: "3" },
            { label: "Conflicting names", value: "2" },
            { label: "Conflicting DOBs", value: "2" },
          ],
          showTransactionsLabel: "View transactions",
          transactions: knownFaceDocumentConflictTransactions,
        },
      ],
      clean: [
        {
          id: "ip-velocity",
          title: "IP Velocity Anomaly",
          status: "clean",
          primaryMessage:
            "No abnormal transaction velocity was detected from the current IP address.",
          metrics: happyNiMetrics,
        },
      ],
    },
    deviceIntelligence: {
      score: 92,
      risk: "high",
      riskLabel: "High Risk",
      summary:
        "The device has been linked to multiple identities and previously declined transactions. Immediate review or action is recommended.",
      indicators: [
        "Linked to 3 different identities",
        "Device previously seen in a declined transaction",
        "High identity-switching velocity",
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
        { label: "Transaction count", value: "7" },
      ],
      evidence: knownFaceDeviceEvidence,
    },
  },

  "deepfake-detected": {
    id: "deepfake-detected",
    label: "Deepfake detected",
    selectDesc: "Synthetic selfie detected.",
    overallStatus: "Declined",
    overallTone: "negative",
    defaultTab: "biometrics",
    transactionId: "e8f9a0b1-2345-4cde-b678-556677889900",
    truAiSummary:
      "A synthetic selfie was detected. The document is valid and identity data matches, but the biometric capture cannot be trusted.",
    summaryRows: [
      { label: "Document", value: "Accepted", tone: "positive" },
      { label: "Biometrics", value: "Declined", tone: "negative" },
      happySummary[2],
      happySummary[3],
      { label: "Device Intelligence", value: "High Risk", tone: "negative" },
    ],
    document: {
      helper:
        "The document is authentic and valid. The decline is caused by the biometric capture.",
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
                  value: "Virtual camera pattern detected",
                },
              ],
            },
          ],
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
            accepted("Document portrait quality", "Portrait quality acceptable"),
          ],
        },
        {
          key: "review",
          label: "Review",
          rows: [
            {
              title: "Liveness",
              sub: "Motion was detected, but capture artifacts are consistent with synthetic video generation.",
              result: "Inconclusive",
              kind: "inconclusive",
            },
          ],
        },
        {
          key: "not-detected",
          label: "Not detected",
          rows: [
            notDetected("Printout attack"),
            notDetected("Static photo replay"),
          ],
        },
        knownFacesEmpty(),
      ],
    },
    dataMatch: {
      helper:
        "Identity data is consistent. The decline is caused by biometric capture integrity.",
    },
    networkInsights: cleanNetworkInsights(
      {
        synthetic: "No cross-transaction identity reuse was found.",
        document:
          "No conflicting historical documents or identity records were found.",
        ip: "No unusual IP or transaction velocity was detected.",
      },
      infoNiSummary(
        "Network intelligence found no cross-transaction identity reuse. The decline stems from a synthetic (deepfake) capture and device risk — see Device Intelligence for details.",
      ),
    ),
    deviceIntelligence: {
      score: 88,
      risk: "high",
      riskLabel: "High Risk",
      summary:
        "Capture-integrity signals indicate that the selfie may have been submitted through a virtual or manipulated camera source.",
      indicators: [
        "Virtual camera characteristics detected",
        "Capture metadata inconsistent with physical camera",
        "Repeated frame-generation artifacts",
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
        { label: "Screen resolution", value: "1920 × 1080" },
        { label: "Timezone", value: "UTC-07" },
      ],
      evidence: deepfakeDeviceEvidence,
    },
  },
};

export const SCENARIO_ORDER: ScenarioId[] = [
  "happy-path",
  "expired-document",
  "face-mismatch",
  "dob-mismatch",
  "known-face-hit",
  "deepfake-detected",
];

export const scenarioData: Record<ScenarioId, ScenarioConfig> = {
  "happy-path": happyPath,
  "expired-document": deepMerge(happyPath, scenarioOverrides["expired-document"]),
  "face-mismatch": deepMerge(happyPath, scenarioOverrides["face-mismatch"]),
  "dob-mismatch": deepMerge(happyPath, scenarioOverrides["dob-mismatch"]),
  "known-face-hit": deepMerge(happyPath, scenarioOverrides["known-face-hit"]),
  "deepfake-detected": deepMerge(
    happyPath,
    scenarioOverrides["deepfake-detected"],
  ),
};

export function getScenario(id: ScenarioId): ScenarioConfig {
  return scenarioData[id];
}
