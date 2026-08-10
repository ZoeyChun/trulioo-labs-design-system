import { isComponentDocPage, type ComponentPageId } from "./navigation";
import synonymData from "./search-synonyms.json";

type SearchSynonyms = {
  components: Partial<Record<ComponentPageId, string[]>>;
};

const SYNONYMS = synonymData as SearchSynonyms;

const COMPONENT_PAGE_DESCRIPTIONS: Partial<Record<ComponentPageId, string>> = {
  button:
    "Buttons let users take action with a single tap. Use them to trigger form submissions, confirm decisions, navigate to the next step, or launch secondary workflows.",
  "icon-button":
    "Icon buttons trigger actions using a recognizable symbol instead of text. Every instance needs an aria-label because there is no visible label for screen readers.",
  "button-group":
    "Button groups combine 2–5 buttons into a segmented control for mutually exclusive choices — like switching between summary, owners, and documents in KYB results.",
  "segmented-control":
    "Segmented controls let users pick one option from a compact row of related choices and apply it immediately — ideal for view modes, date ranges, and sort direction.",
  spinner:
    "Spinners indicate that content is loading or an action is in progress. Size the spinner to its container and announce loading state to assistive technology.",
  "button-menu":
    "ButtonMenu groups secondary actions behind a single trigger. Labels should describe the menu's purpose and each item should read as a clear, specific action.",
  switch:
    "Switches toggle a single setting on or off with immediate effect. Use them for preferences like enabling monitoring or showing advanced fields — not for form submissions.",
  checkbox:
    "Checkboxes let users select zero, one, or many options. Use them for multi-select filters, row selection in tables, and consent confirmations before verification.",
  "dismiss-action":
    "Dismiss actions close modals, drawers, and dismissible panels. Place them in the top-right corner and name what's being closed with an aria-label.",
  "side-nav":
    "SideNav is the persistent workspace rail for Labs and KYB products. It supports expanded labels, collapsed icon mode, nested groups, and a user profile footer.",
  "nav-item":
    "Nav items are interactive rows in sidebar lists and dropdown panels. Size them to the container, mark the current page, and support optional descriptions and trailing icons.",
  "nav-list":
    "Nav lists group related destinations with headings, dividers, and collapsible sections. Use them inside sidebars and dropdown panels to organize long navigation sets.",
  tabs:
    "Tabs switch between related views at the same page level — like Overview, Documents, and Activity on KYB results. Include overflow scroll when the tab count exceeds the available width.",
  "tab-item":
    "Tab items are the individual controls inside a tab bar. Each tab needs role='tab', aria-selected, and an indicator slot for consistent row height.",
  "filter-tab":
    "Filter tabs narrow a list or table in place with pill-shaped controls. One pill is selected at a time; pair counts with CounterLabel when totals help scanning.",
  "filter-tab-2":
    "FilterTabsItem is the atomic pill inside a FilterTabs group. It shares CSS with FilterTabs — toggle selected state with aria-selected or .tds-filter-tab--selected.",
  breadcrumb:
    "Breadcrumbs show where the user is in a hierarchy. Link ancestors in teal, mark the current page with aria-current='page', and keep paths to three or four levels.",
  "text-input":
    "Text inputs collect free-form data in KYB and KYC forms. Pair every field with a label, size it to match adjacent controls, and separate helper captions from validation errors.",
  textarea:
    "Textareas collect multi-line notes, comments, and policy text. They share field label, caption, and validation patterns with TextInput and include a resize grip for longer content.",
  select:
    "Select fields let users choose from predefined options — country, province, verification package. The trigger opens a DropdownPanel menu with single or multi-select modes.",
  "date-picker":
    "Date pickers reduce format errors for incorporation dates, document expiry, and reporting ranges. Single and range modes share calendar day styling and validation states.",
  radio:
    "Radio buttons enforce a single choice from a short list. Group options with a shared name attribute and wrap each row in a label for accessible hit targets.",
  "radio-group":
    "Radio groups stack labeled options with optional captions — ideal for verification type pickers where each choice needs a line of explanation.",
  "radio-card":
    "Radio cards present high-consideration choices as clickable tiles with icon, title, and description. Use for plan tiers and onboarding path selection.",
  "field-label":
    "Field labels identify form inputs. Used by TextInput and Select — pair with FieldCaption and FieldValidation for complete field chrome.",
  "field-caption":
    "Field captions provide helper text below inputs. Used by TextInput and Select — keep captions distinct from validation error messages.",
  "field-validation":
    "Field validation shows inline error or success messages. Used by TextInput and Select — apply error styling only when validation fails.",
  caret:
    "Carets indicate direction for menus and tooltips. Used by Select and Tooltip — mark decorative carets with aria-hidden.",
  "dropdown-panel":
    "Dropdown panels are menu surfaces for selects, filters, and action lists. Supports text, multi-select, icon, and flag item types.",
  tag:
    "Tags are compact labels for status, selection counts, and metadata. Used by Select and Accordion — pick semantic color variants for scanability.",
  "ai-tag":
    "AI tags mark TruAI-generated or AI-assisted content. The sparkles icon is always required alongside the badge label.",
  "data-table":
    "Data tables display sortable, filterable KYB and verification records. Composes column headers, rows, signals, and section headers.",
  "data-field":
    "Data fields show read-only label and value pairs in detail views and accordion content.",
  "counter-label":
    "Counter labels display numeric badges in tabs, filters, and section headers when totals help scanning.",
  "section-header":
    "Section headers group table sections with a title, optional tag, counter, and trailing actions.",
  "dismiss-issue-badge":
    "Dismiss issue badges mark verification issues that were dismissed during review workflows.",
  "flag-icon":
    "Country flag icons cover 255 ISO codes for international data display in selects and tables.",
  "action-list-item":
    "Action list items are rows inside dropdown panels for menu actions and multi-select options.",
  "stat-card":
    "Stat cards summarize a single metric on KYB results dashboards.",
  tooltip:
    "Tooltips provide contextual help on hover or focus. Composes body text with a Caret sub-component.",
  announcement:
    "Announcements are inline banners for status updates, warnings, and system messages.",
  accordion:
    "Accordions expand and collapse dense KYB sections. Composes tags, counters, and data field lists.",
  dialog:
    "Dialogs focus attention for confirmations and multi-step tasks. Supports center modals, drawers, sheets, and full-screen layouts.",
  "progress-indicator":
    "Progress indicators show horizontal step progress through multi-step verification flows.",
  "step-progress":
    "Step progress is a listed variant of verification step tracking. CSS is pending — refer to Figma for structure.",
  "listed-progress-item":
    "Listed progress items are individual step rows in listed progress patterns. CSS is pending — refer to Figma.",
  "score-gauge":
    "Score gauges render SVG risk scores for document verification. Available as CSS, JS, and React variants.",
  "score-card":
    "Score cards wrap a ScoreGauge with supporting context. CSS is pending — refer to Figma for layout.",
  "risk-category-card":
    "Risk category cards summarize a category with title, risk tag, signal count, and score out of 100.",
  "font-awesome-icon":
    "Font Awesome icons are the shared icon system across TDS. No standalone CSS file — apply FA classes directly.",
  "filter-button":
    "Filter buttons open a DropdownPanel for table and list filters. Selected state shows the active value with a clear control.",
  "sort-button":
    "Sort buttons open column sort options in data tables. Selected state shows the active sort with a clear control.",
};

export function getComponentPageDescription(
  pageId: string,
  fallbackLabel: string
): string {
  if (isComponentDocPage(pageId)) {
    const description = COMPONENT_PAGE_DESCRIPTIONS[pageId];
    if (description) return description;
  }

  return `${fallbackLabel} component documentation.`;
}

export function getComponentAlternativeNames(pageId: string): string[] {
  if (!isComponentDocPage(pageId)) return [];
  return SYNONYMS.components[pageId] ?? [];
}
