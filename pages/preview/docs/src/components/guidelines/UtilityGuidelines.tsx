import { DoDontPair, GuidelineSection } from "./GuidelineDoDont";

export function FontAwesomeIconGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Use Font Awesome for standard icons"
        lead={
          <p>
            FontAwesome Icon is the shared icon system — no standalone TDS CSS. Apply FA classes
            directly and mark decorative icons <code>aria-hidden="true"</code>.
          </p>
        }
      >
        <div className="tds-preview__section-card">
          <p>Prefer outlined icons for UI chrome; solid icons for emphasis or filled states.</p>
        </div>
      </GuidelineSection>
    </div>
  );
}

export function FilterButtonGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Show active filters on the trigger"
        lead={
          <p>
            FilterButton opens a dropdown panel for filter options. When filters are active, show
            the selected value and a clear affordance to reset.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-filter-button tds-filter-button--selected">
              <button type="button" className="tds-btn tds-btn--sm tds-btn--secondary">
                <span className="tds-filter-button__trigger-value">Ontario</span>
              </button>
            </div>
          }
          doCaption="Selected state surfaces the active filter value on the trigger."
          dontPreview={
            <button type="button" className="tds-btn tds-btn--sm tds-btn--secondary">
              Filter
            </button>
          }
          dontCaption="Don't hide active filters — users won't know results are scoped."
        />
      </GuidelineSection>
    </div>
  );
}

export function SortButtonGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Reflect sort state on the trigger"
        lead={
          <p>
            SortButton controls table column ordering. When a sort is applied, show the column and
            direction on the trigger; clearing resets to the default label.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-sort-button tds-sort-button--selected">
              <button type="button" className="tds-btn tds-btn--sm tds-btn--secondary">
                <span className="tds-sort-button__trigger-value">Name (A–Z)</span>
              </button>
            </div>
          }
          doCaption="Selected state shows which column and direction are active."
          dontPreview={
            <button type="button" className="tds-btn tds-btn--sm tds-btn--secondary">
              Sort
            </button>
          }
          dontCaption="Don't leave the generic Sort label when a sort is already applied."
        />
      </GuidelineSection>
    </div>
  );
}
