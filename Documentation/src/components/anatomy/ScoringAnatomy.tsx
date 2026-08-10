import { AnatomyPinLayer } from "./AnatomyPinLayer";
import { ComponentAnatomyCard } from "./ComponentAnatomyCard";

export function ScoreGaugeAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Semicircular gauge with centered score and optional risk badge."
      api=".score-gauge · __chart · __center"
      parts={[
        { number: 1, name: "Gauge canvas", api: ".score-gauge", detail: "Fixed-size container for chart SVG and centered score." },
        { number: 2, name: "Chart", api: ".score-gauge__chart", detail: "SVG arc rendering score bands." },
        { number: 3, name: "Score stack", api: ".score-gauge__center", detail: "Centered numeric score and badge." },
      ]}
    >
      <div className="score-gauge" style={{ transform: "scale(0.65)", transformOrigin: "top left" }}>
        <svg className="score-gauge__chart" viewBox="0 0 227 180" aria-hidden="true">
          <path d="M20 160 A100 100 0 0 1 207 160" fill="none" stroke="var(--border-subtle)" strokeWidth="12" />
        </svg>
        <div className="score-gauge__center">
          <div className="score-gauge__score">
            <span className="score-gauge__value">72</span>
          </div>
        </div>
      </div>
    </ComponentAnatomyCard>
  );
}

export function ScoreCardAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Summary card composing ScoreGauge — Figma only until CSS ships."
      api="ScoreCard (Figma)"
      tag="Figma 916:9298"
      parts={[
        { number: 1, name: "Card shell", api: "ScoreCard", detail: "Wraps ScoreGauge with summary metrics. See Figma for layout." },
      ]}
    >
      <p className="tds-preview__template-empty">Anatomy diagram pending CSS export. Refer to Figma component 916:9298.</p>
    </ComponentAnatomyCard>
  );
}

export function RiskCategoryCardAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Category summary with risk tag, signal count, and score out of 100."
      api=".tds-risk-category-card"
      tag="Figma 920:9307"
      parts={[
        { number: 1, name: "Card", api: ".tds-risk-category-card", detail: "Bordered card with title row and details row." },
        { number: 2, name: "Title row", api: ".tds-risk-category-card__title-row", detail: "Category name and risk tag." },
        { number: 3, name: "Details row", api: ".tds-risk-category-card__details-row", detail: "Signal count and numeric score." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "right", selector: ".tds-risk-category-card", anchor: { y: 0.4 } },
          { number: 2, direction: "top", selector: ".tds-risk-category-card__title-row" },
          { number: 3, direction: "bottom", selector: ".tds-risk-category-card__details-row" },
        ]}
      >
        <div className="tds-risk-category-card">
          <div className="tds-risk-category-card__title-row">
            <p className="tds-risk-category-card__title">Sanctions</p>
            <span className="tds-tag tds-tag--xl tds-tag--negative">High Risk</span>
          </div>
          <div className="tds-risk-category-card__details-row">
            <p className="tds-risk-category-card__signal-count">3 signals</p>
            <div className="tds-risk-category-card__score-group">
              <p className="tds-risk-category-card__score">82</p>
              <p className="tds-risk-category-card__score-suffix">/100</p>
            </div>
          </div>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}
