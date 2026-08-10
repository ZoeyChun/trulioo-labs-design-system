import { AnatomyPinLayer } from "./AnatomyPinLayer";
import { ComponentAnatomyCard } from "./ComponentAnatomyCard";

export function AiTagAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="TruAI badge with required sparkles icon and label text."
      api=".tds-ai-tag · __icon · __label · --sm · --md"
      tag="Figma 1821:33907"
      parts={[
        { number: 1, name: "Icon", api: ".tds-ai-tag__icon", detail: "Sparkles SVG — always required. Mark aria-hidden='true'." },
        { number: 2, name: "Label", api: ".tds-ai-tag__label", detail: "Short AI feature name, e.g. TruAI." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "left", selector: ".tds-ai-tag__icon", anchor: { y: 0.5 } },
          { number: 2, direction: "right", selector: ".tds-ai-tag__label", anchor: { y: 0.5 } },
        ]}
        className="ds-anatomy-diagram--inline"
      >
        <span className="tds-ai-tag tds-ai-tag--sm">
          <span className="tds-ai-tag__icon" aria-hidden="true">
            ✦
          </span>
          <span className="tds-ai-tag__label">TruAI</span>
        </span>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function DataTableAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Tabular data with optional header toolbar, sortable columns, and density variants."
      api=".tds-data-table-container · .tds-data-table · __header · __text-cell"
      tag="Figma 884:13685"
      parts={[
        { number: 1, name: "Container", api: ".tds-data-table-container", detail: "Outer wrapper — no outer border; holds header and scrollable table." },
        { number: 2, name: "Table", api: ".tds-data-table", detail: "Native table with compact/default/comfort density modifiers." },
        { number: 3, name: "Column header", api: "th[aria-sort]", detail: "Uppercase column label; aria-sort for sortable columns." },
        { number: 4, name: "Text cell", api: ".tds-data-table__text-cell", detail: "Primary body cell with optional leading visual or placeholder." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "right", selector: ".tds-data-table-container", anchor: { y: 0.25 } },
          { number: 2, direction: "top", selector: ".tds-data-table", anchor: { x: 0.5 } },
          { number: 3, direction: "top", selector: "th", anchor: { x: 0.5 } },
          { number: 4, direction: "right", selector: ".tds-data-table__text-cell", anchor: { y: 0.5 } },
        ]}
      >
        <div className="tds-data-table-container" style={{ width: 320 }}>
          <div className="tds-data-table__header">
            <div className="tds-data-table__header-text">
              <div className="tds-data-table__header-title">Repositories</div>
            </div>
          </div>
          <div className="tds-data-table__wrapper">
            <table className="tds-data-table">
              <thead>
                <tr>
                  <th aria-sort="none">Business name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="tds-data-table__text-cell">Acme Corp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function DataFieldAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Read-only label/value pair with optional description, icons, flag, or tag."
      api=".tds-data-field · __label · __value · __description · --horizontal"
      tag="Figma 856:13029"
      parts={[
        { number: 1, name: "Label", api: ".tds-data-field__label", detail: "Uppercase caption naming the data attribute." },
        { number: 2, name: "Value", api: ".tds-data-field__value", detail: "Primary displayed value at body/sm." },
        { number: 3, name: "Description", api: ".tds-data-field__description", detail: "Optional secondary detail below the value." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "right", selector: ".tds-data-field__label", anchor: { y: 0.5 } },
          { number: 2, direction: "right", selector: ".tds-data-field__value", anchor: { y: 0.5 } },
          { number: 3, direction: "bottom", selector: ".tds-data-field__description", anchor: { x: 0.5 } },
        ]}
        className="ds-anatomy-diagram--inline"
      >
        <div className="tds-data-field" style={{ maxWidth: 260 }}>
          <div className="tds-data-field__label-row">
            <span className="tds-data-field__label">Registration number</span>
          </div>
          <div className="tds-data-field__content">
            <div className="tds-data-field__value-row">
              <span className="tds-data-field__value">123456789</span>
            </div>
            <p className="tds-data-field__description">CRA business number</p>
          </div>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function CounterLabelAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Compact numeric badge with primary/secondary variants and semantic status colors."
      api=".tds-counter · --primary · --secondary · --positive · --sm"
      tag="Figma 409:9115"
      parts={[
        { number: 1, name: "Counter", api: ".tds-counter", detail: "Pill showing a count — pairs with tabs, tags, or section headers." },
      ]}
    >
      <AnatomyPinLayer
        pins={[{ number: 1, direction: "right", selector: ".tds-counter", anchor: { y: 0.5 } }]}
        className="ds-anatomy-diagram--inline"
      >
        <span className="tds-counter tds-counter--primary tds-counter--md">24</span>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function SectionHeaderAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Section title bar with optional icon, subtext, tag, counter, and action slot."
      api=".tds-section-header · __left · __right · __title · __subtext"
      tag="Figma 1816:29234"
      parts={[
        { number: 1, name: "Left cluster", api: ".tds-section-header__left", detail: "Icon, title stack, tag, and counter grouped together." },
        { number: 2, name: "Title", api: ".tds-section-header__title", detail: "Primary section heading at heading/xl." },
        { number: 3, name: "Subtext", api: ".tds-section-header__subtext", detail: "Optional description below the title." },
        { number: 4, name: "Right slot", api: ".tds-section-header__right", detail: "Optional button or action controls." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "right", selector: ".tds-section-header__left", anchor: { y: 0.5 } },
          { number: 2, direction: "top", selector: ".tds-section-header__title", anchor: { x: 0.5 } },
          { number: 3, direction: "bottom", selector: ".tds-section-header__subtext", anchor: { x: 0.5 } },
          { number: 4, direction: "left", selector: ".tds-section-header__right", anchor: { y: 0.5 } },
        ]}
      >
        <div className="tds-section-header" style={{ width: 360 }}>
          <div className="tds-section-header__left">
            <div className="tds-section-header__title-stack">
              <p className="tds-section-header__title">Pending reviews</p>
              <p className="tds-section-header__subtext">Items awaiting analyst action</p>
            </div>
            <span className="tds-counter tds-counter--primary tds-counter--sm">8</span>
          </div>
          <div className="tds-section-header__right">
            <button type="button" className="tds-btn tds-btn--secondary tds-btn--sm">
              View all
            </button>
          </div>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function DismissIssueBadgeAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Inline dismiss control for tags and compact badges."
      api=".tds-dismiss-badge · --sm · --black · --white"
      tag="Figma 331:8174"
      parts={[
        { number: 1, name: "Dismiss button", api: ".tds-dismiss-badge", detail: "Icon-only close — requires aria-label describing what is dismissed." },
      ]}
    >
      <AnatomyPinLayer
        pins={[{ number: 1, direction: "right", selector: ".tds-dismiss-badge", anchor: { y: 0.5 } }]}
        className="ds-anatomy-diagram--inline"
      >
        <button
          type="button"
          className="tds-dismiss-badge tds-dismiss-badge--md tds-dismiss-badge--black"
          aria-label="Dismiss issue"
        >
          ×
        </button>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function FlagIconAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Country flag from flag-icons library, sized for select rows and action lists."
      api=".fi · .fi-{code} · .tds-action-list-item__leading-visual"
      tag="Figma 299:8750"
      parts={[
        { number: 1, name: "Flag", api: ".fi.fi-ca", detail: "Two-letter ISO code class — e.g. fi-ca for Canada." },
        { number: 2, name: "Leading visual slot", api: ".tds-action-list-item__leading-visual", detail: "Wraps flag in menu rows with consistent 18×12 sizing." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "left", selector: ".fi", anchor: { y: 0.5 } },
          { number: 2, direction: "right", selector: ".tds-action-list-item__leading-visual", anchor: { y: 0.5 } },
        ]}
        className="ds-anatomy-diagram--inline"
      >
        <span className="tds-action-list-item__leading-visual">
          <span className="fi fi-ca" role="img" aria-label="Canada" />
        </span>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function ActionListItemAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Interactive menu row for single-select, multi-select, and icon/flag variants."
      api=".tds-action-list-item · __label · __description · __check · --selected"
      parts={[
        { number: 1, name: "Leading visual", api: ".tds-action-list-item__leading-visual", detail: "Optional icon or flag prefix." },
        { number: 2, name: "Label", api: ".tds-action-list-item__label", detail: "Primary row text — truncates with ellipsis." },
        { number: 3, name: "Description", api: ".tds-action-list-item__description", detail: "Optional secondary line at caption/xs." },
        { number: 4, name: "Check", api: ".tds-action-list-item__check", detail: "Selection indicator visible on --selected rows." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "left", selector: ".tds-action-list-item__leading-visual", anchor: { y: 0.5 } },
          { number: 2, direction: "top", selector: ".tds-action-list-item__label", anchor: { x: 0.5 } },
          { number: 3, direction: "bottom", selector: ".tds-action-list-item__description", anchor: { x: 0.5 } },
          { number: 4, direction: "right", selector: ".tds-action-list-item__check", anchor: { y: 0.5 } },
        ]}
      >
        <button
          type="button"
          className="tds-action-list-item tds-action-list-item--selected"
          role="menuitem"
          style={{ width: 280 }}
        >
          <span className="tds-action-list-item__leading-visual" aria-hidden="true">
            🌐
          </span>
          <span className="tds-action-list-item__content">
            <span className="tds-action-list-item__label">Canada</span>
            <span className="tds-action-list-item__description">North America</span>
          </span>
          <span className="tds-action-list-item__check" aria-hidden="true">
            ✓
          </span>
        </button>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function StatCardAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Metric card with label, value group, and sentiment-colored footer."
      api=".tds-stat-card · __label · __value · __footer · --positive"
      tag="Figma 915:9281"
      parts={[
        { number: 1, name: "Label", api: ".tds-stat-card__label", detail: "Metric name at caption/xs." },
        { number: 2, name: "Value", api: ".tds-stat-card__value", detail: "Headline number at heading/2xl." },
        { number: 3, name: "Sub-label", api: ".tds-stat-card__sub-label", detail: "Optional time range or unit below the value." },
        { number: 4, name: "Footer", api: ".tds-stat-card__footer", detail: "Trend icon + description; icon color follows --positive/--negative." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "right", selector: ".tds-stat-card__label", anchor: { y: 0.5 } },
          { number: 2, direction: "right", selector: ".tds-stat-card__value", anchor: { y: 0.5 } },
          { number: 3, direction: "bottom", selector: ".tds-stat-card__sub-label", anchor: { x: 0.5 } },
          { number: 4, direction: "top", selector: ".tds-stat-card__footer", anchor: { x: 0.5 } },
        ]}
      >
        <div className="tds-stat-card tds-stat-card--positive" style={{ maxWidth: 240 }}>
          <p className="tds-stat-card__label">Match rate</p>
          <div className="tds-stat-card__value-group">
            <p className="tds-stat-card__value">94%</p>
            <p className="tds-stat-card__sub-label">Last 30 days</p>
          </div>
          <div className="tds-stat-card__footer">
            <span className="tds-stat-card__icon" aria-hidden="true">
              ↑
            </span>
            <p className="tds-stat-card__description">Up 3% from prior period</p>
          </div>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}
