export type ScenarioId =
  | "happy-path"
  | "expired-document"
  | "face-mismatch"
  | "dob-mismatch"
  | "known-face-hit"
  | "deepfake-detected";

export type TabId =
  | "document"
  | "biometrics"
  | "data-match"
  | "network-insights"
  | "device-intelligence";

export type Tone = "positive" | "negative" | "intermediate" | "default";

export type StatusKind =
  | "accepted"
  | "declined"
  | "review"
  | "not-run"
  | "not-detected"
  | "exact-match"
  | "partial-match"
  | "match"
  | "no-risk"
  | "risk"
  | "clean"
  | "flagged"
  | "inconclusive";

export interface DetailPair {
  label: string;
  value: string;
}

export interface CheckRow {
  title: string;
  sub?: string;
  result: string;
  kind: StatusKind;
  details?: DetailPair[];
  /** Omit status icon (e.g. Known Face "Match" — negative context, no X). */
  hideStatusIcon?: boolean;
}

/** A single previously-seen face this capture matched against. */
export interface KnownFaceMatch {
  date: string;
  id?: string;
  status: "Declined" | "Accepted";
  similarity: string;
  previousName: string;
}

/** Structured Known Faces result — renders as a table + a "Matched against N faces" thumbnail grid. */
export interface KnownFacesInfo {
  message: string;
  /** Total faces the selfie was matched against ("Matched against N faces"). */
  matchedCount: number;
  matches: KnownFaceMatch[];
}

export interface IndicatorGroup {
  key: string;
  label: string;
  countLabel?: string;
  rows: CheckRow[];
  emptyState?: string;
  helper?: string;
  /** When set, the group body renders the Known Faces table instead of check rows. */
  knownFaces?: KnownFacesInfo;
}

export interface HeaderBadge {
  text: string;
  tone: Tone;
}

export interface SummaryRow {
  label: string;
  value: string;
  tone: Tone;
}

export interface DocumentInfo {
  documentType: string;
  documentNumber: string;
  issuingState: string;
  expiryDate: string;
  expiryNote?: string;
  documentStatus: string;
  authenticity: string;
}

export interface NiTransaction {
  date: string;
  id?: string;
  differences: string[];
  result: "Accepted" | "Declined";
}

export interface NiInsight {
  id: string;
  title: string;
  status: "clean" | "flagged";
  trendBadge?: string;
  primaryMessage: string;
  supportingMessage?: string;
  metrics: DetailPair[];
  transactions?: NiTransaction[];
  showTransactionsLabel?: string;
  evidenceEmptyMessage?: string;
}

export interface NiSummaryDriver {
  /** Short description of the signal driving the assessment. */
  text: string;
  /** Insight id to open and scroll to when the card is activated. */
  targetId?: string;
  /** Optional visible "Go to section" affordance label. */
  linkLabel?: string;
}

export interface NiSummary {
  /** Visual status variant. clear = all-clear, info = clean but not the pass reason, flagged = network risk. */
  status: "clear" | "info" | "flagged";
  title: string;
  message: string;
  drivers: NiSummaryDriver[];
}

export interface NiConfig {
  headerStatus: "Clean" | "Flagged";
  headerTone: Tone;
  summary?: NiSummary;
  flagged: NiInsight[];
  clean: NiInsight[];
}

export interface DiEvidenceRow {
  title: string;
  result: string;
  insight: "Risk" | "No Risk" | "Not Run";
}

export interface DiEvidenceGroup {
  key: string;
  label: string;
  rows: DiEvidenceRow[];
}

export interface DeviceDetail {
  label: string;
  value: string;
}

export interface DiConfig {
  score: number;
  risk: "low" | "medium" | "high";
  riskLabel: string;
  summary: string;
  indicators: string[];
  deviceId: string;
  firstSeenLabel?: string;
  deviceDetails: DeviceDetail[];
  evidence: DiEvidenceGroup[];
}

export interface ScenarioConfig {
  id: ScenarioId;
  label: string;
  selectDesc: string;
  overallStatus: string;
  overallTone: Tone;
  secondaryStatus?: string;
  secondaryTone?: Tone;
  defaultTab: TabId;
  transactionId: string;
  truAiSummary: string;
  summaryRows: SummaryRow[];
  documentInfo: DocumentInfo;
  document: {
    helper?: string;
    groups: IndicatorGroup[];
  };
  biometrics: {
    helper?: string;
    groups: IndicatorGroup[];
  };
  dataMatch: {
    helper?: string;
    groups: IndicatorGroup[];
  };
  networkInsights: NiConfig;
  deviceIntelligence: DiConfig;
}
