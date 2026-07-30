import {
  deriveDiGroupBadges,
  deriveHeaderBadges,
  kindIcon,
  kindToStatusClass,
  toneClass,
} from "./badges";
import {
  ICON_ACCEPTED,
  ICON_ARROW_RIGHT,
  ICON_CHEVRON,
  ICON_CHEVRON_DOWN,
  ICON_CIRCLE_CHECK,
  ICON_CIRCLE_INFO,
  ICON_DIAMOND_EXCLAMATION,
  ICON_DECLINED,
  ICON_CLOSE_X,
  ICON_EXPAND_ALL,
  ICON_FILTER,
  ICON_MENU_CHECK,
  ICON_REVIEW,
  ICON_FLAG,
  ICON_MINUS,
  ICON_NOTE_THUMB,
  ICON_PLUS,
  ICON_RISK,
  ICON_SORT,
} from "./icons";
import { SCENARIO_ORDER, scenarioData, normalizeDiEvidence } from "./scenario-data";
import type {
  CheckRow,
  DetailPair,
  DiConfig,
  DiEvidenceGroup,
  DiEvidenceRow,
  DocumentInfo,
  HeaderBadge,
  IndicatorGroup,
  KnownFacesInfo,
  NiConfig,
  NiInsight,
  NiSummary,
  NiSummaryDriver,
  NiTransaction,
  ScenarioConfig,
  ScenarioId,
  SummaryRow,
  Tone,
} from "./types";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderTag(
  text: string,
  tone: Tone,
  size: "sm" | "md" = "sm",
): string {
  return `<span class="${toneClass(tone, size)}">${escapeHtml(text)}</span>`;
}

function tableCheckLabel(groupKey: string): string {
  if (groupKey === "exact-match" || groupKey === "partial-match") {
    return "Field";
  }
  if (groupKey === "known-faces") {
    return "Transaction";
  }
  return "Check";
}

function collectDetailColumns(rows: CheckRow[]): string[] {
  const columns: string[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    for (const detail of row.details ?? []) {
      if (!seen.has(detail.label)) {
        seen.add(detail.label);
        columns.push(detail.label);
      }
    }
  }
  return columns;
}

function tableGridTemplate(detailCount: number): string {
  const detailCols = Array.from(
    { length: detailCount },
    () => "minmax(6.5rem, 1fr)",
  ).join(" ");
  const details = detailCount > 0 ? ` ${detailCols}` : "";
  return `minmax(12rem, 2fr)${details} minmax(9rem, max-content)`;
}

function renderTableHead(
  checkLabel: string,
  detailColumns: string[],
): string {
  const detailHeaders = detailColumns
    .map(
      (col) =>
        `<div class="dv-table__detail-cell dv-table__col-head">${escapeHtml(col)}</div>`,
    )
    .join("");
  return `<div class="dv-table__row dv-table__head" role="row">
  <div class="dv-table__text-cell dv-table__col-head">${escapeHtml(checkLabel)}</div>
  ${detailHeaders}
  <div class="dv-table__label-cell dv-table__col-head">Result</div>
</div>`;
}

function renderDetailCells(
  row: CheckRow,
  detailColumns: string[],
): string {
  if (detailColumns.length === 0) return "";
  const byLabel = new Map(
    (row.details ?? []).map((detail) => [detail.label, detail.value]),
  );
  return detailColumns
    .map((label) => {
      const value = byLabel.get(label);
      const content = value
        ? `<span class="dv-cell-title">${escapeHtml(value)}</span>`
        : "";
      return `<div class="dv-table__detail-cell">${content}</div>`;
    })
    .join("");
}

export function renderCheckRow(
  row: CheckRow,
  detailColumns: string[] = [],
): string {
  const sub = row.sub
    ? `<span class="dv-cell-sub">${escapeHtml(row.sub)}</span>`
    : "";
  const icon = row.hideStatusIcon
    ? ""
    : `<span class="dv-status__icon">${kindIcon(row.kind)}</span>`;
  return `<div class="dv-table__row" role="row">
  <div class="dv-table__text-cell"><span class="dv-cell-title">${escapeHtml(row.title)}</span>${sub}</div>
  ${renderDetailCells(row, detailColumns)}
  <div class="dv-table__label-cell"><span class="${kindToStatusClass(row.kind)}">${icon}${escapeHtml(row.result)}</span></div>
</div>`;
}

/** Colour the group count to match the group's status. */
const GROUP_TAG_TONE: Record<string, Tone> = {
  declined: "negative",
  "partial-match": "negative",
  review: "intermediate",
  inconclusive: "intermediate",
  accepted: "positive",
  "exact-match": "positive",
  "not-detected": "positive",
};

function groupCountTag(group: IndicatorGroup): string {
  const text =
    group.countLabel !== undefined
      ? group.countLabel
      : String(group.rows.length);
  return renderTag(text, GROUP_TAG_TONE[group.key] ?? "default");
}

function defaultOpenKeys(
  groups: IndicatorGroup[],
  options?: { defaultOpenKey?: string },
): Set<string> {
  // All groups start collapsed, except when there is only a single group
  // (e.g. only Accepted signals) — a lone accordion opens by default.
  const open = new Set<string>();
  if (options?.defaultOpenKey) {
    open.add(options.defaultOpenKey);
  } else if (groups.length === 1 && groups[0]) {
    open.add(groups[0].key);
  }
  return open;
}

const GROUP_SEVERITY_ORDER: Record<string, number> = {
  declined: 0,
  review: 1,
  accepted: 2,
  "not-detected": 3,
  "not-run": 4,
  "known-faces": 5,
  "exact-match": 6,
  "partial-match": 7,
};

function groupSeverityRank(key: string): number {
  return GROUP_SEVERITY_ORDER[key] ?? 99;
}

/** Rows-first, then severity (declined → review → accepted → …). */
export function sortIndicatorGroups(
  groups: IndicatorGroup[],
): IndicatorGroup[] {
  return [...groups].sort((a, b) => {
    const aHasRows = a.rows.length > 0 ? 0 : 1;
    const bHasRows = b.rows.length > 0 ? 0 : 1;
    if (aHasRows !== bHasRows) return aHasRows - bHasRows;
    return groupSeverityRank(a.key) - groupSeverityRank(b.key);
  });
}

/**
 * Keep "Known Faces" even when empty — its "No matches" state is a security
 * confirmation that the face isn't a known fraud identity; hiding it could read
 * as "not checked". Every other group is hidden when it has no rows.
 */
function isVisibleIndicatorGroup(group: IndicatorGroup): boolean {
  return group.rows.length > 0 || group.key === "known-faces";
}

/** Known Faces group body — intro sentence + a table of matched transactions. */
function renderKnownFacesBody(kf: KnownFacesInfo): string {
  const head = `<div class="dv-kf-table__row dv-kf-table__head" role="row">
    <span class="dv-kf-table__cell">#</span>
    <span class="dv-kf-table__cell">Transaction</span>
    <span class="dv-kf-table__cell">Status</span>
    <span class="dv-kf-table__cell">Similarity</span>
    <span class="dv-kf-table__cell">Previous name</span>
  </div>`;
  const rows = kf.matches
    .map((m, i) => {
      const isDeclined = m.status === "Declined";
      const icon = isDeclined ? ICON_DECLINED : ICON_ACCEPTED;
      const iconClass = isDeclined
        ? "dv-txn-result__icon dv-txn-result__icon--negative"
        : "dv-txn-result__icon dv-txn-result__icon--positive";
      const idHtml = m.id
        ? `<span class="dv-txn-id">${escapeHtml(m.id)}</span>`
        : "";
      return `<div class="dv-kf-table__row" role="row">
    <span class="dv-kf-table__cell dv-kf-table__num">${i + 1}</span>
    <span class="dv-kf-table__cell"><span class="dv-txn-tx"><a class="dv-txn-date" href="#">${escapeHtml(m.date)}</a>${idHtml}</span></span>
    <span class="dv-kf-table__cell"><span class="dv-txn-result"><span class="${iconClass}">${icon}</span>${escapeHtml(m.status)}</span></span>
    <span class="dv-kf-table__cell dv-kf-table__num">${escapeHtml(m.similarity)}</span>
    <span class="dv-kf-table__cell">${escapeHtml(m.previousName)}</span>
  </div>`;
    })
    .join("");
  return `<div class="dv-kf">
  <p class="dv-kf__intro">${escapeHtml(kf.message)}</p>
  <div class="dv-kf-table" role="table">${head}${rows}</div>
</div>`;
}

export function renderIndicatorGroups(
  groups: IndicatorGroup[],
  options?: { defaultOpenKey?: string },
): string {
  const sorted = sortIndicatorGroups(groups).filter(isVisibleIndicatorGroup);
  const openKeys = defaultOpenKeys(sorted, options);
  return sorted
    .map((group) => {
      const isOpen = openKeys.has(group.key);
      const detailColumns = collectDetailColumns(group.rows);
      const gridStyle = ` style="--dv-table-cols: ${tableGridTemplate(detailColumns.length)}"`;
      const body = group.knownFaces
        ? renderKnownFacesBody(group.knownFaces)
        : group.rows.length > 0
          ? `<div class="dv-table" role="table"${gridStyle}>${renderTableHead(tableCheckLabel(group.key), detailColumns)}${group.rows.map((row) => renderCheckRow(row, detailColumns)).join("")}</div>`
          : `<p class="dv-empty">${escapeHtml(group.emptyState ?? "No items.")}</p>`;
      return `<div class="dv-group dv-collapsible${isOpen ? " dv-collapsible--open" : ""}" data-group-key="${escapeHtml(group.key)}" data-group-tone="${GROUP_TAG_TONE[group.key] ?? "default"}" data-group-severity="${groupSeverityRank(group.key)}">
  <button class="dv-group__header dv-collapsible__header" type="button" aria-expanded="${isOpen ? "true" : "false"}">
    <span class="dv-chevron" aria-hidden="true">${ICON_CHEVRON}</span>
    <span class="dv-group__label">${escapeHtml(group.label)}</span>
    ${groupCountTag(group)}
  </button>
  <div class="dv-collapsible__body"${isOpen ? "" : " hidden"}>${body}</div>
</div>`;
    })
    .join("");
}

function renderSortableTableHead(
  variant: "ditable" | "txntable",
  columns: string[],
  defaultCol = 0,
): string {
  const headCls = variant === "ditable" ? "dv-ditable__head" : "dv-txntable__head";
  const chCls = variant === "ditable" ? "dv-ditable__ch" : "dv-txntable__ch";
  const buttons = columns
    .map((label, index) => {
      const sort = index === defaultCol ? "ascending" : "none";
      return `<button type="button" class="${chCls} dv-datatable__sort" data-sort-col="${index}" aria-sort="${sort}"><span class="dv-datatable__sort-label">${escapeHtml(label)}</span><span class="dv-datatable__sort-icon">${ICON_SORT}</span></button>`;
    })
    .join("");
  return `<div class="${headCls}">${buttons}</div>`;
}

function sortDiEvidenceRows(rows: DiEvidenceRow[]): DiEvidenceRow[] {
  return [...rows].sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
  );
}

function renderTxnDiff(differences: string[]): string {
  if (differences.length === 0) {
    return `<span class="dv-txn-dash">-</span>`;
  }
  return differences.map((d) => renderTag(d, "default")).join("");
}

function renderTxnRow(txn: NiTransaction): string {
  const isDeclined = txn.result === "Declined";
  const icon = isDeclined ? ICON_DECLINED : ICON_ACCEPTED;
  const iconClass = isDeclined
    ? "dv-txn-result__icon dv-txn-result__icon--negative"
    : "dv-txn-result__icon dv-txn-result__icon--positive";
  const idHtml = txn.id
    ? `<span class="dv-txn-id">${escapeHtml(txn.id)}</span>`
    : "";
  return `<div class="dv-txntable__row">
  <span class="dv-txntable__cell"><span class="dv-txn-tx"><a class="dv-txn-date" href="#">${escapeHtml(txn.date)}</a>${idHtml}</span></span>
  <span class="dv-txntable__cell dv-txn-diff">${renderTxnDiff(txn.differences)}</span>
  <span class="dv-txntable__cell"><span class="dv-txn-result"><span class="${iconClass}">${icon}</span>${escapeHtml(txn.result)}</span></span>
</div>`;
}

function txnCountTags(transactions: NiTransaction[]): string {
  let declined = 0;
  let accepted = 0;
  for (const t of transactions) {
    if (t.result === "Declined") declined += 1;
    else accepted += 1;
  }
  const parts: string[] = [];
  if (declined > 0) parts.push(renderTag(`${declined} Declined`, "negative"));
  if (accepted > 0) parts.push(renderTag(`${accepted} Accepted`, "positive"));
  return parts.join("");
}

export function renderNiInsight(
  insight: NiInsight,
  options?: { open?: boolean },
): string {
  const isOpen = options?.open === true;
  const trendBadge = insight.trendBadge
    ? renderTag(insight.trendBadge, "default")
    : "";
  const supporting = insight.supportingMessage
    ? `<p class="dv-ni2-trend__sub">${escapeHtml(insight.supportingMessage)}</p>`
    : "";
  const metrics = insight.metrics.map(
    (m) =>
      `<div class="dv-detail-row"><span class="dv-detail-label">${escapeHtml(m.label)}</span><span class="dv-detail-value">${escapeHtml(m.value)}</span></div>`,
  );

  // Evidence = static label + +/- inline expansion (not an accordion).
  // When transaction rows exist, start expanded so the list is visible
  // (matches Figma Flagged / Synthetic identity: "Hide transactions" + table).
  const transactions = insight.transactions ?? [];
  const showLabel = insight.showTransactionsLabel ?? "View transactions";
  const hideLabel = showLabel
    .replace(/^Show\s+/i, "Hide ")
    .replace(/^View\s+/i, "Hide ");
  const evidenceOpen = transactions.length > 0 && options?.open === true;
  const txnRows = transactions.map(renderTxnRow).join("");
  const evidenceSection =
    transactions.length > 0
      ? `<div class="dv-ni2-evidence">
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
      "Result",
    ])}
    ${txnRows}
  </div>
</div>`
      : "";

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

function niGroupTag(count: number, tone: Tone): string {
  return renderTag(String(count), tone);
}

function renderNiGroup(
  label: string,
  insights: NiInsight[],
  open: boolean,
): string {
  const openFirst = open && insights.length > 0;
  const body =
    insights.length > 0
      ? `<div class="dv-ni2-accs">${insights
          .map((insight, i) =>
            renderNiInsight(insight, { open: openFirst && i === 0 }),
          )
          .join("")}</div>`
      : `<p class="dv-empty">No ${escapeHtml(label.toLowerCase())} signals.</p>`;
  const flagged = label === "Flagged";
  return `<div class="dv-group dv-collapsible${open ? " dv-collapsible--open" : ""}" data-group-key="${escapeHtml(label.toLowerCase())}" data-group-tone="${flagged ? "negative" : "positive"}" data-group-severity="${flagged ? 0 : 2}">
  <button class="dv-group__header dv-collapsible__header" type="button" aria-expanded="${open ? "true" : "false"}">
    <span class="dv-chevron" aria-hidden="true">${ICON_CHEVRON_DOWN}</span>
    <span class="dv-group__label">${escapeHtml(label)}</span>
    ${niGroupTag(insights.length, flagged ? "negative" : "positive")}
  </button>
  <div class="dv-collapsible__body"${open ? "" : " hidden"}>${body}</div>
</div>`;
}

/** Map the summary status to the design-system Announcement variant + icon. */
const NI_SUMMARY_VARIANT: Record<NiSummary["status"], string> = {
  clear: "success",
  info: "info",
  flagged: "error",
};

const NI_SUMMARY_ICON: Record<NiSummary["status"], string> = {
  clear: ICON_CIRCLE_CHECK,
  info: ICON_CIRCLE_INFO,
  flagged: ICON_DIAMOND_EXCLAMATION,
};

function renderNiSummaryDriver(driver: NiSummaryDriver): string {
  const text = `<span class="dv-ni-summary__driver-text">${escapeHtml(driver.text)}</span>`;
  if (!driver.targetId) {
    return `<div class="dv-ni-summary__driver">${text}</div>`;
  }
  // "Go to section" label is hidden by default and revealed on hover/focus (see CSS).
  const action = `<span class="dv-ni-summary__driver-action"><span class="dv-ni-summary__link">${escapeHtml(driver.linkLabel ?? "Go to section")}</span><span class="dv-ni-summary__arrow" aria-hidden="true">${ICON_ARROW_RIGHT}</span></span>`;
  return `<button type="button" class="dv-ni-summary__driver dv-ni-summary__driver--link" data-ni-target="${escapeHtml(driver.targetId)}" title="${escapeHtml(driver.text)}" aria-label="${escapeHtml(driver.text)} — go to section">${text}${action}</button>`;
}

/** DS Announcement banner; when collapsible, a chevron toggles the message (app.ts). */
function renderNiAnnouncement(summary: NiSummary, collapsible: boolean): string {
  const toggle = collapsible
    ? `<button type="button" class="dv-ni-announce__toggle" aria-expanded="false" aria-label="Toggle details"><span class="dv-chevron dv-ni-announce__chevron" aria-hidden="true">${ICON_CHEVRON_DOWN}</span></button>`
    : "";
  const mod = collapsible
    ? " dv-ni-announce dv-ni-announce--collapsible dv-ni-announce--collapsed"
    : "";
  return `<div class="tds-announcement tds-announcement--${NI_SUMMARY_VARIANT[summary.status]}${mod}">
  <span class="tds-announcement__icon" aria-hidden="true">${NI_SUMMARY_ICON[summary.status]}</span>
  <div class="tds-announcement__content">
    <p class="tds-announcement__title">${escapeHtml(summary.title)}</p>
    <p class="tds-announcement__message">${escapeHtml(summary.message)}</p>
  </div>
  ${toggle}
</div>`;
}

/** Key Drivers grid — only non-clean signals (drivers targeting a clean insight are dropped). */
function renderNiKeyDrivers(summary: NiSummary, cleanIds: Set<string>): string {
  const drivers = summary.drivers.filter(
    (d) => !d.targetId || !cleanIds.has(d.targetId),
  );
  if (drivers.length === 0) return "";
  const cards = drivers.map(renderNiSummaryDriver).join("");
  return `<div class="dv-ni-summary__drivers">
  <p class="dv-ni-summary__drivers-title">Key Drivers</p>
  <div class="dv-ni-summary__grid">${cards}</div>
</div>`;
}

/** Transparency list for the clean case — the categories network intelligence reviewed. */
const NI_CLEAN_CHECKS = [
  "Transactions Checked",
  "Identities Compared",
  "Documents Cross-Referenced",
  "Devices Reviewed",
];

function renderNiWhatWeChecked(): string {
  const rows = NI_CLEAN_CHECKS.map((label, index) => {
    const divider =
      index < NI_CLEAN_CHECKS.length - 1
        ? " tds-action-list-item--divider"
        : "";
    return `<div class="tds-action-list-item tds-action-list-item--md${divider} dv-ni-checked__row">
    <span class="tds-action-list-item__content"><span class="tds-action-list-item__label">${escapeHtml(label)}</span></span>
  </div>`;
  }).join("");
  return `<section class="dv-ni-checked" aria-label="What we checked">
  <p class="dv-ni-checked__header">What we checked</p>
  <div class="dv-ni-checked__list">${rows}</div>
</section>`;
}

export function renderNetworkInsights(ni: NiConfig): string {
  const cleanIds = new Set(ni.clean.map((insight) => insight.id));

  // Flagged entity: collapsible alert + Key Drivers + Signals (Flagged + Clean groups, collapsed).
  if (ni.flagged.length > 0) {
    const announce = ni.summary ? renderNiAnnouncement(ni.summary, true) : "";
    const drivers = ni.summary ? renderNiKeyDrivers(ni.summary, cleanIds) : "";
    // Collapse both groups by default; only open Flagged when it stands alone.
    const flaggedAlone = ni.clean.length === 0;
    const groups =
      renderNiGroup("Flagged", ni.flagged, flaggedAlone) +
      (ni.clean.length > 0 ? renderNiGroup("Clean", ni.clean, false) : "");
    return `${announce}${drivers}${renderSignalsToolbar()}<div class="dv-ni2-groups">${groups}</div>`;
  }

  // Clean entity: alert + "What we checked" transparency list (no expandable sections).
  const announce = ni.summary ? renderNiAnnouncement(ni.summary, false) : "";
  return `${announce}${renderNiWhatWeChecked()}`;
}

function diInsightMarkup(row: DiEvidenceRow): string {
  if (row.insight === "Risk") {
    return `<span class="dv-di-insight dv-di-insight--risk"><span class="dv-di-insight__icon">${ICON_RISK}</span>Risk</span>`;
  }
  if (row.insight === "No Risk") {
    return `<span class="dv-di-insight dv-di-insight--norisk"><span class="dv-di-insight__icon">${ICON_ACCEPTED}</span>No Risk</span>`;
  }
  return `<span class="dv-di-insight"><span class="dv-di-insight__icon">${kindIcon("not-run")}</span>Not Run</span>`;
}

function renderDiEvidenceGroup(
  group: DiEvidenceGroup,
  open: boolean,
): string {
  const badges = deriveDiGroupBadges(group.rows)
    .map((b) => renderTag(b.text, b.tone))
    .join("");
  const sortedRows = sortDiEvidenceRows(group.rows);
  const tableBody =
    sortedRows.length > 0
      ? `<div class="dv-ditable">
      ${renderSortableTableHead("ditable", ["Signal", "Result", "Insight"])}
      ${sortedRows
        .map(
          (row) => `<div class="dv-ditable__row">
  <span class="dv-ditable__cell"><span class="dv-txn-tx"><span class="dv-cell-title">${escapeHtml(row.title)}</span></span></span>
  <span class="dv-ditable__cell dv-di-result">${escapeHtml(row.result)}</span>
  <span class="dv-ditable__cell">${diInsightMarkup(row)}</span>
</div>`,
        )
        .join("")}
    </div>`
      : `<p class="dv-empty">No signals in this category.</p>`;
  const hasRisk = group.rows.some((row) => row.insight === "Risk");
  return `<div class="dv-group dv-collapsible${open ? " dv-collapsible--open" : ""}" data-group-key="${escapeHtml(group.key)}" data-group-tone="${hasRisk ? "negative" : "positive"}" data-group-severity="${hasRisk ? 0 : 2}">
  <button class="dv-group__header dv-collapsible__header" type="button" aria-expanded="${open ? "true" : "false"}">
    <span class="dv-chevron" aria-hidden="true">${ICON_CHEVRON}</span>
    <span class="dv-group__label">${escapeHtml(group.label)}</span>
    <span class="dv-ni2-counts">${badges}</span>
  </button>
  <div class="dv-collapsible__body"${open ? "" : " hidden"}>${tableBody}</div>
</div>`;
}

function firstSeenValue(di: DiConfig): string {
  const match = di.deviceDetails.find(
    (d) =>
      d.label.toLowerCase() === "first seen" ||
      d.label.toLowerCase() === (di.firstSeenLabel ?? "").toLowerCase(),
  );
  return match?.value ?? "";
}

export function renderDeviceIntelligence(di: DiConfig): string {
  const chips = di.indicators
    .map((c) => `<div class="dv-di-chip">${escapeHtml(c)}</div>`)
    .join("");
  const firstSeenLabel = di.firstSeenLabel ?? "First seen";
  const firstSeen = firstSeenValue(di);
  const detailsRows = di.deviceDetails
    .map(
      (d) =>
        `<div class="dv-detail-row"><span class="dv-detail-label">${escapeHtml(d.label)}</span><span class="dv-detail-value">${escapeHtml(d.value)}</span></div>`,
    )
    .join("");
  // Drop evidence categories with no signals; all groups start collapsed.
  const evidenceGroups = normalizeDiEvidence(di.evidence).filter(
    (group) => group.rows.length > 0,
  );
  const evidence = evidenceGroups
    .map((group) => renderDiEvidenceGroup(group, evidenceGroups.length === 1))
    .join("");

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
${renderSignalsToolbar()}
<div class="dv-di-groups">${evidence}</div>`;
}

function renderSummaryList(rows: SummaryRow[]): string {
  return rows
    .map(
      (row) =>
        `<li class="dv-summary-row"><span class="dv-summary-label">${escapeHtml(row.label)}</span>${renderTag(row.value, row.tone)}</li>`,
    )
    .join("");
}

function renderDetailPairs(pairs: DetailPair[]): string {
  return pairs
    .map(
      (p) =>
        `<div class="dv-detail-row"><span class="dv-detail-label">${escapeHtml(p.label)}</span><span class="dv-detail-value">${escapeHtml(p.value)}</span></div>`,
    )
    .join("");
}

function renderDocumentInfo(info: DocumentInfo): string {
  const expiry = info.expiryNote
    ? `${info.expiryDate} (${info.expiryNote})`
    : info.expiryDate;
  const rows: DetailPair[] = [
    { label: "Document type", value: info.documentType },
    { label: "Document number", value: info.documentNumber },
    { label: "Issuing state", value: info.issuingState },
    { label: "Expiry date", value: expiry },
    { label: "Document status", value: info.documentStatus },
    { label: "Authenticity", value: info.authenticity },
  ];
  return renderDetailPairs(rows);
}

function renderHeaderBadges(badges: HeaderBadge[]): string {
  return badges.map((b) => renderTag(b.text, b.tone)).join("");
}

function renderNetworkHeaderBadge(ni: NiConfig): string {
  const icon =
    ni.headerStatus === "Flagged"
      ? `<span class="dv-tag-icon">${ICON_FLAG}</span>`
      : "";
  return `${icon}${escapeHtml(ni.headerStatus)}`;
}

function diHeaderTone(di: DiConfig): Tone {
  if (di.risk === "high") return "negative";
  if (di.risk === "medium") return "intermediate";
  return "positive";
}

function setHtml(el: Element | null, html: string): void {
  if (el) el.innerHTML = html;
}

function setText(el: Element | null, text: string): void {
  if (el) el.textContent = text;
}

function renderTeOptions(selectedId: ScenarioId): string {
  return SCENARIO_ORDER.map((id) => {
    const s = scenarioData[id];
    const selected = id === selectedId ? ' aria-selected="true"' : ' aria-selected="false"';
    return `<button type="button" class="dv-te-option" role="option" data-id="${escapeHtml(id)}" data-name="${escapeHtml(s.label)}" data-tone="${escapeHtml(s.overallTone)}" data-result="${escapeHtml(s.overallStatus)}"${selected}>
  <span class="dv-te-option__text"><span class="dv-te-option__name">${escapeHtml(s.label)}</span><span class="dv-te-option__desc">${escapeHtml(s.selectDesc)}</span></span>
  ${renderTag(s.overallStatus, s.overallTone)}
</button>`;
  }).join("");
}

function isScenarioId(value: string): value is ScenarioId {
  return Object.prototype.hasOwnProperty.call(scenarioData, value);
}


const MATCHED_FACE_PLACEHOLDER =
  '<svg viewBox="0 0 120 132" role="img" aria-label="Matched face placeholder" preserveAspectRatio="xMidYMid meet"><rect width="120" height="132" fill="transparent"/><circle cx="60" cy="52" r="26" fill="var(--border-strong)"/><path d="M18 124c0-22 19-36 42-36s42 14 42 36z" fill="var(--border-strong)"/></svg>';

/** Structured Known Faces info for a scenario, or undefined when there's no match. */
function findKnownFacesInfo(groups: IndicatorGroup[]): KnownFacesInfo | undefined {
  const group = groups.find(
    (g) =>
      (g.key === "known-faces" || g.key === "match") &&
      (g.knownFaces?.matches.length ?? 0) > 0,
  );
  return group?.knownFaces;
}

/** Right-column "Matched against N faces" numbered thumbnail grid (+ overflow cell). */
function renderMatchedFaces(kf: KnownFacesInfo): string {
  const thumbs = kf.matches
    .map(
      (m, i) => `<div class="dv-matched-faces__thumb">
    <span class="dv-matched-faces__badge">${i + 1}</span>
    <div class="dv-matched-faces__media" aria-label="Matched face ${i + 1}, ${escapeHtml(m.similarity)} similar">${MATCHED_FACE_PLACEHOLDER}</div>
  </div>`,
    )
    .join("");
  const remaining = kf.matchedCount - kf.matches.length;
  const more =
    remaining > 0
      ? `<div class="dv-matched-faces__more"><span class="dv-matched-faces__more-icon" aria-hidden="true">${ICON_PLUS}</span>${remaining} more</div>`
      : "";
  return `<p class="dv-matched-faces__label">Matched against ${kf.matchedCount} faces</p>
<div class="dv-matched-faces__grid">${thumbs}${more}</div>`;
}

/* ---- Signal stat tiles (Document / Biometrics / Data Match) ---- */
const STAT_FAIL_KEYS = new Set(["declined", "partial-match"]);
const STAT_REVIEW_KEYS = new Set(["review", "inconclusive"]);
const STAT_PASS_KEYS = new Set(["accepted", "exact-match", "not-detected"]);
const STAT_NOTRUN_KEYS = new Set(["not-run"]);

interface SignalStats {
  signalsChecked: number;
  passRate: number;
  declinedChecks: number;
}

function computeSignalStats(groups: IndicatorGroup[]): SignalStats {
  let pass = 0;
  let fail = 0;
  let review = 0;
  let notRun = 0;
  for (const g of groups) {
    const n = g.rows.length;
    if (STAT_FAIL_KEYS.has(g.key)) fail += n;
    else if (STAT_REVIEW_KEYS.has(g.key)) review += n;
    else if (STAT_PASS_KEYS.has(g.key)) pass += n;
    else if (STAT_NOTRUN_KEYS.has(g.key)) notRun += n;
  }
  const evaluated = pass + fail + review;
  return {
    signalsChecked: evaluated + notRun,
    passRate: evaluated > 0 ? Math.round((pass / evaluated) * 100) : 0,
    declinedChecks: fail,
  };
}

function renderStatRow(stats: SignalStats): string {
  const tile = (label: string, value: string, mod = ""): string =>
    `<div class="dv-stat${mod}"><span class="dv-stat__label">${label}</span><span class="dv-stat__value">${escapeHtml(value)}</span></div>`;
  return `${tile("Signals checked", String(stats.signalsChecked))}${tile(
    "Pass rate",
    `${stats.passRate}%`,
  )}${tile("Declined checks", String(stats.declinedChecks), " dv-stat--negative")}`;
}

/** DS FilterButton — single-select result filter (all / failed / review / passed). */
function renderFilterButton(): string {
  const item = (value: string, label: string, isDefault = false): string =>
    `<button type="button" class="tds-action-list-item${isDefault ? " tds-action-list-item--selected" : ""}"${isDefault ? " data-signals-filter-default" : ""} role="menuitemradio" aria-checked="${isDefault ? "true" : "false"}" data-signals-filter="${value}"><span class="tds-action-list-item__label">${label}</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true">${ICON_MENU_CHECK}</span></button>`;
  return `<div class="tds-filter-button dv-signals-bar__filter">
    <button type="button" class="tds-btn tds-btn--sm tds-btn--secondary" aria-expanded="false" aria-haspopup="menu"><span class="tds-btn__leading-icon" aria-hidden="true">${ICON_FILTER}</span><span class="tds-filter-button__trigger-default">Filter</span><span class="tds-filter-button__trigger-value" data-signals-filter-value></span><span class="tds-btn__trailing-icon tds-filter-button__clear" aria-hidden="true">${ICON_CLOSE_X}</span></button>
    <div class="tds-dropdown-panel" role="menu" hidden>
      ${item("all", "All signals", true)}
      ${item("negative", "Failed")}
      ${item("intermediate", "Needs review")}
      ${item("positive", "Passed")}
    </div>
  </div>`;
}

/** DS SortButton — single-select ordering of the signal groups. */
function renderSortButton(): string {
  const item = (value: string, label: string, isDefault = false): string =>
    `<button type="button" class="tds-action-list-item${isDefault ? " tds-action-list-item--selected" : ""}"${isDefault ? " data-signals-sort-default" : ""} role="menuitemradio" aria-checked="${isDefault ? "true" : "false"}" data-signals-sort="${value}"><span class="tds-action-list-item__label">${label}</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true">${ICON_MENU_CHECK}</span></button>`;
  return `<div class="tds-sort-button dv-signals-bar__sort">
    <button type="button" class="tds-btn tds-btn--sm tds-btn--secondary" aria-expanded="false" aria-haspopup="menu"><span class="tds-btn__leading-icon" aria-hidden="true">${ICON_SORT}</span><span class="tds-sort-button__trigger-default">Sort</span><span class="tds-sort-button__trigger-label"><span class="tds-sort-button__trigger-prefix">Sort:</span><span class="tds-sort-button__trigger-value" data-signals-sort-label></span></span><span class="tds-btn__trailing-icon tds-sort-button__clear" aria-hidden="true">${ICON_CLOSE_X}</span></button>
    <div class="tds-dropdown-panel" role="menu" hidden>
      ${item("severity-desc", "Severity: high to low", true)}
      ${item("severity-asc", "Severity: low to high")}
      ${item("name", "Name: A to Z")}
    </div>
  </div>`;
}

/** "Signals" header + Expand all + DS Filter / Sort controls (shared across tabs). */
export function renderSignalsToolbar(): string {
  return `<div class="dv-signals-bar">
  <h3 class="dv-signals-bar__title">Signals</h3>
  <div class="dv-signals-bar__controls">
    <button class="tds-btn tds-btn--invisible tds-btn--sm dv-expand-all" type="button"><span class="tds-btn__leading-icon">${ICON_EXPAND_ALL}</span>Expand all</button>
    ${renderFilterButton()}
    ${renderSortButton()}
  </div>
</div>`;
}

/** Big summary status shown in the sidebar SUMMARY block (tone-colored label, no icon). */
function renderSummaryStatus(status: string): string {
  return `<span class="dv-summary-status__label">${escapeHtml(status)}</span>`;
}

export function applyScenario(
  root: Document | HTMLElement,
  config: ScenarioConfig,
): void {
  const q = (sel: string): Element | null => root.querySelector(sel);

  // Overall status now lives big in the sidebar SUMMARY block (header tag removed).
  const summaryHeader = q("#dv-summary-header");
  if (summaryHeader instanceof HTMLElement) {
    summaryHeader.className = `dv-summary-status-header dv-summary-status-header--${config.overallTone}`;
  }
  const summaryStatus = q("#dv-summary-status");
  if (summaryStatus instanceof HTMLElement) {
    summaryStatus.className = `dv-summary-status dv-summary-status--${config.overallTone}`;
    summaryStatus.innerHTML = renderSummaryStatus(config.overallStatus);
  }

  setText(q("#dv-transaction-id"), config.transactionId);
  setText(q("#dv-truai-title"), config.truAiTitle);
  setText(q("#dv-truai-text"), config.truAiSummary);
  setHtml(q("#dv-summary-list"), renderSummaryList(config.summaryRows));
  setHtml(q("#dv-document-info"), renderDocumentInfo(config.documentInfo));

  const teOptions = q("#dv-te-options");
  setHtml(teOptions, renderTeOptions(config.id));

  const teSelect = q("#dv-te-select");
  if (teSelect) {
    setText(
      teSelect.querySelector("#dv-te-value") ??
        teSelect.querySelector(".dv-te-value"),
      config.label,
    );
    setText(
      teSelect.querySelector("#dv-te-subtext") ??
        teSelect.querySelector(".dv-te-subtext"),
      config.overallStatus,
    );
  }

  setHtml(
    q("#dv-document-indicators"),
    renderIndicatorGroups(config.document.groups),
  );
  setHtml(
    q("#dv-document-stats"),
    renderStatRow(computeSignalStats(config.document.groups)),
  );

  setHtml(
    q("#dv-biometrics-indicators"),
    renderIndicatorGroups(config.biometrics.groups),
  );
  setHtml(
    q("#dv-biometrics-stats"),
    renderStatRow(computeSignalStats(config.biometrics.groups)),
  );

  const matchedFaces = q("#dv-matched-faces");
  if (matchedFaces instanceof HTMLElement) {
    const kf = findKnownFacesInfo(config.biometrics.groups);
    if (kf && kf.matches.length > 0) {
      matchedFaces.innerHTML = renderMatchedFaces(kf);
      matchedFaces.hidden = false;
    } else {
      matchedFaces.innerHTML = "";
      matchedFaces.hidden = true;
    }
  }

  setHtml(
    q("#dv-datamatch-indicators"),
    renderIndicatorGroups(config.dataMatch.groups),
  );
  setHtml(
    q("#dv-datamatch-stats"),
    renderStatRow(computeSignalStats(config.dataMatch.groups)),
  );

  setHtml(q("#dv-network-body"), renderNetworkInsights(config.networkInsights));
  // Clean entities have no expandable sections — hide the Network Insights "Expand all".
  const niExpandBtn = q(
    '.dv-tabpanel[data-tab="network-insights"] .dv-expand-all',
  );
  if (niExpandBtn instanceof HTMLElement) {
    niExpandBtn.hidden = config.networkInsights.flagged.length === 0;
  }

  const deviceBody = q("#dv-device-body");
  if (deviceBody instanceof HTMLElement) {
    deviceBody.classList.add("dv-di-body");
  }
  setHtml(
    deviceBody,
    renderDeviceIntelligence(config.deviceIntelligence),
  );
  const deviceBadge = q("#dv-device-header-badge");
  if (deviceBadge instanceof HTMLElement) {
    deviceBadge.className = toneClass(
      diHeaderTone(config.deviceIntelligence),
    );
    deviceBadge.textContent = config.deviceIntelligence.riskLabel;
  }
}

export { isScenarioId };
export { ICON_PLUS, ICON_MINUS } from "./icons";
