import {
  deriveDiGroupBadges,
  deriveHeaderBadges,
  kindIcon,
  kindToStatusClass,
  toneClass,
} from "./badges";
import {
  ICON_ACCEPTED,
  ICON_CHEVRON,
  ICON_CHEVRON_DOWN,
  ICON_DECLINED,
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
  NiConfig,
  NiInsight,
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

function groupCountTag(group: IndicatorGroup): string {
  const text =
    group.countLabel !== undefined
      ? group.countLabel
      : String(group.rows.length);
  return renderTag(text, "default");
}

function defaultOpenKeys(
  groups: IndicatorGroup[],
  options?: { defaultOpenKey?: string },
): Set<string> {
  const open = new Set<string>();
  if (options?.defaultOpenKey) {
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
    (g) =>
      (g.key === "known-faces" || g.key === "match") && g.rows.length > 0,
  );
  if (knownFaces) open.add(knownFaces.key);
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

export function renderIndicatorGroups(
  groups: IndicatorGroup[],
  options?: { defaultOpenKey?: string },
): string {
  const sorted = sortIndicatorGroups(groups);
  const openKeys = defaultOpenKeys(sorted, options);
  return sorted
    .map((group) => {
      const isOpen = openKeys.has(group.key);
      const detailColumns = collectDetailColumns(group.rows);
      const gridStyle = ` style="--dv-table-cols: ${tableGridTemplate(detailColumns.length)}"`;
      const body =
        group.rows.length > 0
          ? `<div class="dv-table" role="table"${gridStyle}>${renderTableHead(tableCheckLabel(group.key), detailColumns)}${group.rows.map((row) => renderCheckRow(row, detailColumns)).join("")}</div>`
          : `<p class="dv-empty">${escapeHtml(group.emptyState ?? "No items.")}</p>`;
      return `<div class="dv-group dv-collapsible${isOpen ? " dv-collapsible--open" : ""}" data-group-key="${escapeHtml(group.key)}">
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
  const evidenceEmptyMessage =
    insight.evidenceEmptyMessage ??
    "No related transactions were found for this signal.";
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
      : `<div class="dv-ni2-evidence">
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

function niGroupTag(count: number): string {
  return renderTag(String(count), "default");
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
  return `<div class="dv-group dv-collapsible${open ? " dv-collapsible--open" : ""}" data-group-key="${escapeHtml(label.toLowerCase())}">
  <button class="dv-group__header dv-collapsible__header" type="button" aria-expanded="${open ? "true" : "false"}">
    <span class="dv-chevron" aria-hidden="true">${ICON_CHEVRON}</span>
    <span class="dv-group__label">${escapeHtml(label)}</span>
    ${niGroupTag(insights.length)}
  </button>
  <div class="dv-collapsible__body"${open ? "" : " hidden"}>${body}</div>
</div>`;
}

const NI_GROUP_SEVERITY: Record<string, number> = {
  Flagged: 0,
  Clean: 1,
};

function sortNiGroups(
  groups: { label: string; insights: NiInsight[] }[],
): { label: string; insights: NiInsight[] }[] {
  return [...groups].sort((a, b) => {
    const aHasRows = a.insights.length > 0 ? 0 : 1;
    const bHasRows = b.insights.length > 0 ? 0 : 1;
    if (aHasRows !== bHasRows) return aHasRows - bHasRows;
    return (NI_GROUP_SEVERITY[a.label] ?? 99) - (NI_GROUP_SEVERITY[b.label] ?? 99);
  });
}

export function renderNetworkInsights(ni: NiConfig): string {
  const groups = sortNiGroups([
    { label: "Flagged", insights: ni.flagged },
    { label: "Clean", insights: ni.clean },
  ]);
  const firstWithContent = groups.findIndex((group) => group.insights.length > 0);
  const openIndex = firstWithContent >= 0 ? firstWithContent : 0;
  return groups
    .map((group, index) =>
      renderNiGroup(group.label, group.insights, index === openIndex),
    )
    .join("");
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
  return `<div class="dv-group dv-collapsible${open ? " dv-collapsible--open" : ""}" data-group-key="${escapeHtml(group.key)}">
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
  const evidenceGroups = normalizeDiEvidence(di.evidence);
  const defaultOpenIndex = evidenceGroups.findIndex((group) => group.rows.length > 0);
  const openIndex = defaultOpenIndex >= 0 ? defaultOpenIndex : 0;
  const evidence = evidenceGroups
    .map((group, index) => renderDiEvidenceGroup(group, index === openIndex))
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
<span class="dv-di-evidence-label">Evidence</span>
${evidence}`;
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
    { label: "Document Type", value: info.documentType },
    { label: "Document Number", value: info.documentNumber },
    { label: "Issuing State", value: info.issuingState },
    { label: "Expiry Date", value: expiry },
    { label: "Document Status", value: info.documentStatus },
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

export function applyScenario(
  root: Document | HTMLElement,
  config: ScenarioConfig,
): void {
  const q = (sel: string): Element | null => root.querySelector(sel);

  setHtml(q("#dv-overall-status"), renderTag(config.overallStatus, config.overallTone, "md"));

  const secondary = q("#dv-secondary-status");
  if (secondary instanceof HTMLElement) {
    if (config.secondaryStatus && config.secondaryTone) {
      secondary.hidden = false;
      secondary.innerHTML = renderTag(
        config.secondaryStatus,
        config.secondaryTone,
        "md",
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
    const valueEl =
      teSelect.querySelector("#dv-te-value") ??
      teSelect.querySelector(".dv-te-value");
    const tagEl =
      teSelect.querySelector("#dv-te-tag") ??
      teSelect.querySelector(".dv-te-tag");
    setText(valueEl, config.label);
    if (tagEl) {
      tagEl.className = `${toneClass(config.overallTone)} dv-te-tag`;
      tagEl.textContent = config.overallStatus;
    }
  }

  setHtml(
    q("#dv-document-indicators"),
    renderIndicatorGroups(config.document.groups),
  );
  setHtml(
    q("#dv-document-badges"),
    renderHeaderBadges(deriveHeaderBadges(config.document.groups)),
  );

  setHtml(
    q("#dv-biometrics-indicators"),
    renderIndicatorGroups(config.biometrics.groups),
  );
  setHtml(
    q("#dv-biometrics-badges"),
    renderHeaderBadges(deriveHeaderBadges(config.biometrics.groups)),
  );

  setHtml(
    q("#dv-datamatch-indicators"),
    renderIndicatorGroups(config.dataMatch.groups),
  );
  setHtml(
    q("#dv-datamatch-badges"),
    renderHeaderBadges(deriveHeaderBadges(config.dataMatch.groups)),
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
