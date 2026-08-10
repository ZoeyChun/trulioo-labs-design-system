import { DoDontPair, GuidelineSection } from "./GuidelineDoDont";

export function ProgressIndicatorGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Label every step clearly"
        lead={
          <p>
            Progress indicators show where users are in a multi-step flow. Each step needs a short
            label; mark the current step and completed steps with the correct item states.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <ol className="tds-progress-indicator tds-progress-indicator--horizontal">
              <li className="tds-progress-indicator__item tds-progress-indicator__item--completed">
                Business info
              </li>
              <li className="tds-progress-indicator__item tds-progress-indicator__item--current">
                Verification
              </li>
              <li className="tds-progress-indicator__item">Review</li>
            </ol>
          }
          doCaption="Use descriptive step names users recognize from the flow."
          dontPreview={
            <ol className="tds-progress-indicator tds-progress-indicator--horizontal">
              <li className="tds-progress-indicator__item tds-progress-indicator__item--current">1</li>
              <li className="tds-progress-indicator__item">2</li>
              <li className="tds-progress-indicator__item">3</li>
            </ol>
          }
          dontCaption="Don't use numbers alone — they don't explain what's happening."
        />
      </GuidelineSection>
    </div>
  );
}

export function StepProgressGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Figma reference for step progress"
        lead={
          <p>
            StepProgress is documented in Figma with vertical step layouts. CSS is pending — refer
            to the Design tab showcases when available.
          </p>
        }
      >
        <div className="tds-preview__section-card">
          <p>Use StepProgress for compact vertical flows with fewer than six steps.</p>
        </div>
      </GuidelineSection>
    </div>
  );
}

export function ListedProgressItemGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Figma reference for listed progress"
        lead={
          <p>
            ListedProgressItem combines status, title, and optional actions in a list row. CSS is
            pending — follow Figma for layout and slot usage.
          </p>
        }
      >
        <div className="tds-preview__section-card">
          <p>Pair each row with a clear status and one primary action when needed.</p>
        </div>
      </GuidelineSection>
    </div>
  );
}
