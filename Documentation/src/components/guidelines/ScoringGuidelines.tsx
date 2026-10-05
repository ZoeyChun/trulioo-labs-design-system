import { DoDontPair, GuidelineSection } from "./GuidelineDoDont";

export function ScoreGaugeGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Show score with context"
        lead={
          <p>
            ScoreGauge displays a numeric score on a semicircular chart. Pair the value with a risk
            badge or label so users understand what the number means.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="score-gauge" style={{ transform: "scale(0.6)", transformOrigin: "top left" }}>
              <div className="score-gauge__center">
                <div className="score-gauge__score">
                  <span className="score-gauge__value">72</span>
                </div>
              </div>
            </div>
          }
          doCaption="Display the score prominently with supporting risk context nearby."
          dontPreview={<span style={{ fontSize: 32, fontWeight: 600 }}>72</span>}
          dontCaption="Don't show a raw number without the gauge or risk framing."
        />
      </GuidelineSection>
    </div>
  );
}

export function ScoreCardGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Figma reference for score cards"
        lead={
          <p>
            ScoreCard composes ScoreGauge with summary metrics. CSS is pending — use Figma layouts
            until styles ship.
          </p>
        }
      >
        <div className="tds-preview__section-card">
          <p>Keep one primary score per card; secondary metrics belong in supporting rows.</p>
        </div>
      </GuidelineSection>
    </div>
  );
}

export function RiskCategoryCardGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Align risk tag with score"
        lead={
          <p>
            RiskCategoryCard summarizes a category with a risk tag, signal count, and score out of
            100. Tag severity should match the numeric score band.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-risk-category-card" style={{ maxWidth: 284 }}>
              <div className="tds-risk-category-card__title-row">
                <p className="tds-risk-category-card__title">Sanctions</p>
                <span className="tds-tag tds-tag--xl tds-tag--negative">High Risk</span>
              </div>
            </div>
          }
          doCaption="Category title, risk tag, and score should tell a consistent story."
          dontPreview={
            <div className="tds-risk-category-card" style={{ maxWidth: 284 }}>
              <div className="tds-risk-category-card__title-row">
                <p className="tds-risk-category-card__title">Sanctions</p>
                <span className="tds-tag tds-tag--xl tds-tag--positive">High Risk</span>
              </div>
            </div>
          }
          dontCaption="Don't mismatch tag color and risk level."
        />
      </GuidelineSection>
    </div>
  );
}
