import { CodeBlock } from "../CodeBlock";
import { CodeSection, ComponentCodeLayout, PropsTable } from "./CodePageLayout";

type CodePageProps = { basePath: string };

function atomCode(
  basePath: string,
  cssFile: string,
  componentName: string,
  _baseClass: string,
  props: { name: string; description: string; type: string; required?: boolean; default?: string }[],
  example: string,
) {
  const navItems = [
    { id: "install", label: "Install" },
    { id: "base", label: "Base class" },
  ];
  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/${cssFile}';`} />
        <CodeBlock code={example} />
      </CodeSection>
      <CodeSection title="Base class" id="base">
        <PropsTable title={`${componentName} classes`} props={props} />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function AiTagCode({ basePath }: CodePageProps) {
  return atomCode(basePath, "ai-tag/ai-tag.css", "AITag", ".tds-ai-tag", [
    { name: ".tds-ai-tag", description: "TruAI badge container.", type: "<span>", required: true },
    { name: ".tds-ai-tag--{sm|md}", description: "Size modifier.", type: "CSS class" },
    { name: ".tds-ai-tag__icon", description: "Required sparkles icon — aria-hidden.", type: "<span>", required: true },
    { name: ".tds-ai-tag__label", description: "Badge label text.", type: "<span>" },
  ], `<span class="tds-ai-tag tds-ai-tag--sm">\n  <span class="tds-ai-tag__icon" aria-hidden="true"><!-- sparkles SVG --></span>\n  <span class="tds-ai-tag__label">TruAI</span>\n</span>`);
}

export function DataTableCode({ basePath }: CodePageProps) {
  return atomCode(basePath, "data-table/data-table.css", "DataTable", ".tds-data-table", [
    { name: ".tds-data-table-container", description: "Outer table wrapper.", type: "<div>", required: true },
    { name: ".tds-data-table__wrapper", description: "Horizontal scroll container.", type: "<div>" },
    { name: ".tds-data-table", description: "Native table element.", type: "<table>", required: true },
    { name: ".tds-data-table--{compact|comfort}", description: "Row density modifier.", type: "CSS class" },
    { name: ".tds-data-table__header", description: "Optional toolbar above the table.", type: "<div>" },
    { name: ".tds-data-table__text-cell", description: "Primary body cell.", type: "<td>" },
    { name: "th[aria-sort]", description: "Sortable column header.", type: "<th>" },
  ], `<div class="tds-data-table-container">\n  <div class="tds-data-table__wrapper">\n    <table class="tds-data-table">\n      <thead><tr><th aria-sort="none">Name</th></tr></thead>\n      <tbody><tr><td class="tds-data-table__text-cell">Acme Corp</td></tr></tbody>\n    </table>\n  </div>\n</div>`);
}

export function DataFieldCode({ basePath }: CodePageProps) {
  return atomCode(basePath, "data-field/data-field.css", "DataField", ".tds-data-field", [
    { name: ".tds-data-field", description: "Label/value container.", type: "<div>", required: true },
    { name: ".tds-data-field--horizontal", description: "Side-by-side label and value.", type: "CSS class" },
    { name: ".tds-data-field__label", description: "Uppercase field label.", type: "<span>", required: true },
    { name: ".tds-data-field__value", description: "Displayed value.", type: "<span>", required: true },
    { name: ".tds-data-field__description", description: "Optional secondary detail.", type: "<p>" },
    { name: ".tds-data-field__flag", description: "Optional country flag slot.", type: "<span>" },
  ], `<div class="tds-data-field">\n  <span class="tds-data-field__label">Jurisdiction</span>\n  <span class="tds-data-field__value">British Columbia</span>\n</div>`);
}

export function CounterLabelCode({ basePath }: CodePageProps) {
  return atomCode(basePath, "counter-label/counter-label.css", "CounterLabel", ".tds-counter", [
    { name: ".tds-counter", description: "Numeric count badge.", type: "<span>", required: true },
    { name: ".tds-counter--{sm|md|lg}", description: "Size modifier.", type: "CSS class" },
    { name: ".tds-counter--{primary|secondary}", description: "Fill variant.", type: "CSS class" },
    { name: ".tds-counter--{positive|intermediate|negative}", description: "Semantic status color.", type: "CSS class" },
  ], `<span class="tds-counter tds-counter--primary tds-counter--md">12</span>`);
}

export function SectionHeaderCode({ basePath }: CodePageProps) {
  return atomCode(basePath, "section-header/section-header.css", "SectionHeader", ".tds-section-header", [
    { name: ".tds-section-header", description: "Section title bar.", type: "<div>", required: true },
    { name: ".tds-section-header__left", description: "Title cluster with optional tag/counter.", type: "<div>" },
    { name: ".tds-section-header__right", description: "Action button slot.", type: "<div>" },
    { name: ".tds-section-header__title", description: "Primary heading.", type: "<p>", required: true },
    { name: ".tds-section-header__subtext", description: "Optional description.", type: "<p>" },
    { name: ".tds-section-header__icon", description: "Optional leading icon.", type: "<span>" },
  ], `<div class="tds-section-header">\n  <div class="tds-section-header__left">\n    <p class="tds-section-header__title">Open issues</p>\n  </div>\n</div>`);
}

export function DismissIssueBadgeCode({ basePath }: CodePageProps) {
  return atomCode(
    basePath,
    "dismiss-issue-badge/dismiss-issue-badge.css",
    "DismissIssueBadge",
    ".tds-dismiss-badge",
    [
      { name: ".tds-dismiss-badge", description: "Dismiss/close button.", type: "<button>", required: true },
      { name: ".tds-dismiss-badge--{sm|md|lg}", description: "Hit target size.", type: "CSS class" },
      { name: ".tds-dismiss-badge--{black|white}", description: "Icon color for surface contrast.", type: "CSS class" },
    ],
    `<button class="tds-dismiss-badge tds-dismiss-badge--md tds-dismiss-badge--black" aria-label="Dismiss issue">×</button>`,
  );
}

export function FlagIconCode({ basePath }: CodePageProps) {
  return atomCode(basePath, "flag-icon/flag-icon.css", "CountryFlag", ".fi", [
    { name: ".fi", description: "flag-icons base class.", type: "<span>", required: true },
    { name: ".fi-{code}", description: "Two-letter ISO country code, e.g. fi-ca.", type: "CSS class", required: true },
    { name: ".tds-action-list-item__leading-visual .fi", description: "Sized flag in menu rows.", type: "CSS selector" },
  ], `<span class="fi fi-ca" role="img" aria-label="Canada"></span>`);
}

export function ActionListItemCode({ basePath }: CodePageProps) {
  return atomCode(basePath, "action-list-item/action-list-item.css", "ActionListItem", ".tds-action-list-item", [
    { name: ".tds-action-list-item", description: "Menu row button or label.", type: "<button>", required: true },
    { name: ".tds-action-list-item--{sm|md|lg}", description: "Row size.", type: "CSS class" },
    { name: ".tds-action-list-item--selected", description: "Current selection with visible check.", type: "CSS class" },
    { name: ".tds-action-list-item__label", description: "Primary row text.", type: "<span>", required: true },
    { name: ".tds-action-list-item__description", description: "Secondary detail line.", type: "<span>" },
    { name: ".tds-action-list-item__check", description: "Selection checkmark indicator.", type: "<span>" },
    { name: ".tds-action-list-item__leading-visual", description: "Icon or flag prefix.", type: "<span>" },
  ], `<button class="tds-action-list-item" role="menuitem">\n  <span class="tds-action-list-item__label">Ontario</span>\n</button>`);
}

export function StatCardCode({ basePath }: CodePageProps) {
  return atomCode(basePath, "stat-card/stat-card.css", "StatCard", ".tds-stat-card", [
    { name: ".tds-stat-card", description: "Metric card container.", type: "<div>", required: true },
    { name: ".tds-stat-card--{positive|negative}", description: "Footer icon sentiment color.", type: "CSS class" },
    { name: ".tds-stat-card__label", description: "Metric name.", type: "<p>", required: true },
    { name: ".tds-stat-card__value", description: "Headline number.", type: "<p>", required: true },
    { name: ".tds-stat-card__sub-label", description: "Optional time range or unit.", type: "<p>" },
    { name: ".tds-stat-card__footer", description: "Trend row with icon and description.", type: "<div>" },
    { name: ".tds-stat-card__icon", description: "Sentiment icon — aria-hidden.", type: "<span>" },
  ], `<div class="tds-stat-card tds-stat-card--positive">\n  <p class="tds-stat-card__label">Match rate</p>\n  <p class="tds-stat-card__value">94%</p>\n</div>`);
}
