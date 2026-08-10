import { ComponentAnatomyCard } from "./ComponentAnatomyCard";

export function ProgressIndicatorAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Horizontal or vertical step list with stateful items and connecting lines."
      api=".tds-progress-indicator · __item"
      tag="Figma 1242:22104"
      parts={[
        { number: 1, name: "Indicator list", api: ".tds-progress-indicator", detail: "Ordered list of steps — horizontal or vertical direction modifier." },
        { number: 2, name: "Step item", api: ".tds-progress-indicator__item", detail: "Individual step with incomplete, current, completed, or error state." },
      ]}
    >
      <ol className="tds-progress-indicator tds-progress-indicator--horizontal" style={{ maxWidth: 420 }}>
        <li className="tds-progress-indicator__item tds-progress-indicator__item--completed">
          <span className="tds-progress-indicator__label">Business info</span>
        </li>
        <li className="tds-progress-indicator__item tds-progress-indicator__item--current">
          <span className="tds-progress-indicator__label">Verification</span>
        </li>
        <li className="tds-progress-indicator__item">
          <span className="tds-progress-indicator__label">Review</span>
        </li>
      </ol>
    </ComponentAnatomyCard>
  );
}

export function StepProgressAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Vertical step progress — Figma only until CSS ships."
      api="StepProgress (Figma)"
      tag="Figma 1264:24192"
      parts={[
        { number: 1, name: "Step list", api: "_StepProgressItem", detail: "See Figma for vertical step layout and states." },
      ]}
    >
      <p className="tds-preview__template-empty">Anatomy diagram pending CSS export. Refer to Figma component 1264:24192.</p>
    </ComponentAnatomyCard>
  );
}

export function ListedProgressItemAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="List row with progress status and optional actions — Figma only until CSS ships."
      api="ListedProgressItem (Figma)"
      tag="Figma 1267:24260"
      parts={[
        { number: 1, name: "List item", api: "ListedProgressItem", detail: "Composes Button, Link, IconButton, and Tag sub-components." },
      ]}
    >
      <p className="tds-preview__template-empty">Anatomy diagram pending CSS export. Refer to Figma component 1267:24260.</p>
    </ComponentAnatomyCard>
  );
}
