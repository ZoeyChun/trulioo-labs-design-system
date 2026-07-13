import {
  ICON_ACCEPTED,
  ICON_DECLINED,
  ICON_NOT_DETECTED,
  ICON_REVIEW,
  ICON_RISK,
} from "./icons";
import type {
  DiEvidenceRow,
  HeaderBadge,
  IndicatorGroup,
  StatusKind,
  Tone,
} from "./types";

export function toneClass(tone: Tone, size: "sm" | "md" = "sm"): string {
  return `tds-tag tds-tag--${tone} tds-tag--${size}`;
}

export function kindToStatusClass(kind: StatusKind): string {
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

export function kindIcon(kind: StatusKind): string {
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

export function rowSignalTone(kind: StatusKind): Tone {
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

export function groupTone(group: IndicatorGroup): Tone {
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

/** Panel-header badges for groups that have rows (counts derive from row arrays). */
export function deriveHeaderBadges(groups: IndicatorGroup[]): HeaderBadge[] {
  const badges: HeaderBadge[] = [];
  for (const group of groups) {
    if (group.rows.length === 0) continue;
    const text =
      group.countLabel !== undefined
        ? group.countLabel
        : `${group.rows.length} ${group.label}`;
    badges.push({ text, tone: groupTone(group) });
  }
  return badges;
}

/** Evidence-group count badges: Risk / No Risk / Not Run. */
export function deriveDiGroupBadges(rows: DiEvidenceRow[]): HeaderBadge[] {
  let risk = 0;
  let noRisk = 0;
  let notRun = 0;
  for (const row of rows) {
    if (row.insight === "Risk") risk += 1;
    else if (row.insight === "No Risk") noRisk += 1;
    else notRun += 1;
  }
  const badges: HeaderBadge[] = [];
  if (risk > 0) badges.push({ text: `${risk} Risk`, tone: "negative" });
  if (noRisk > 0) badges.push({ text: `${noRisk} No Risk`, tone: "positive" });
  if (notRun > 0) badges.push({ text: `${notRun} Not Run`, tone: "default" });
  return badges;
}
