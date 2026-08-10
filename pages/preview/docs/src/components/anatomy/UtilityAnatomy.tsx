import { AnatomyPinLayer } from "./AnatomyPinLayer";
import { ComponentAnatomyCard } from "./ComponentAnatomyCard";

export function FontAwesomeIconAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Font Awesome icon slot — no standalone TDS CSS."
      api="Font Awesome classes"
      tag="Figma 544:9787"
      parts={[
        { number: 1, name: "Icon", api: "fa-* classes", detail: "Apply Font Awesome utility classes directly on <i> or <span>." },
      ]}
    >
      <p className="tds-preview__template-empty">
        Icons use Font Awesome class names (e.g. <code>fa-solid fa-filter</code>). See Figma for the icon catalog.
      </p>
    </ComponentAnatomyCard>
  );
}

export function FilterButtonAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Filter trigger with dropdown panel, selected value, and clear affordance."
      api=".tds-filter-button"
      tag="Figma 836:13511"
      parts={[
        { number: 1, name: "Wrapper", api: ".tds-filter-button", detail: "Positions trigger and anchored dropdown panel." },
        { number: 2, name: "Trigger", api: ".tds-btn", detail: "Button with default and selected value labels." },
        { number: 3, name: "Clear", api: ".tds-filter-button__clear", detail: "Resets all active filters when visible." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "right", selector: ".tds-filter-button", anchor: { y: 0.3 } },
          { number: 2, direction: "top", selector: ".tds-btn" },
        ]}
        className="ds-anatomy-diagram--inline"
      >
        <div className="tds-filter-button tds-filter-button--selected">
          <button type="button" className="tds-btn tds-btn--sm tds-btn--secondary" aria-expanded="false">
            <span className="tds-filter-button__trigger-value">Ontario</span>
          </button>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function SortButtonAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Sort trigger with dropdown panel and selected sort label."
      api=".tds-sort-button"
      tag="Figma 2191:46183"
      parts={[
        { number: 1, name: "Wrapper", api: ".tds-sort-button", detail: "Positions trigger and right-aligned dropdown panel." },
        { number: 2, name: "Trigger", api: ".tds-btn", detail: "Shows Sort or the active column and direction." },
        { number: 3, name: "Clear", api: ".tds-sort-button__clear", detail: "Resets sort to default when visible." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "right", selector: ".tds-sort-button", anchor: { y: 0.3 } },
          { number: 2, direction: "top", selector: ".tds-btn" },
        ]}
        className="ds-anatomy-diagram--inline"
      >
        <div className="tds-sort-button tds-sort-button--selected">
          <button type="button" className="tds-btn tds-btn--sm tds-btn--secondary" aria-expanded="false">
            <span className="tds-sort-button__trigger-value">Name (A–Z)</span>
          </button>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}
