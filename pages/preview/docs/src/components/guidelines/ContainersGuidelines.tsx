import { DoDontPair, GuidelineSection } from "./GuidelineDoDont";

export function AccordionGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="One expanded section at a time"
        lead={
          <p>
            Accordions hide secondary detail until requested. Expand the section users need now;
            collapse others to reduce scroll in KYB result pages.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-accordion tds-accordion--expanded" style={{ maxWidth: 360 }}>
              <button type="button" className="tds-accordion__header" aria-expanded="true">
                Business owners
              </button>
              <div className="tds-accordion__content">Owner details visible here.</div>
            </div>
          }
          doCaption="Expand the most relevant section by default when content is grouped."
          dontPreview={
            <div style={{ maxWidth: 360, fontSize: 14 }}>
              Three sections all expanded with duplicate headings and long scroll.
            </div>
          }
          dontCaption="Don't leave every section open — it defeats the progressive disclosure pattern."
        />
      </GuidelineSection>
    </div>
  );
}
