import { ComponentAnatomyCard } from "./ComponentAnatomyCard";

export function StepperAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Horizontal or vertical step list with stateful items and connecting lines."
      api=".tds-stepper · __item"
      tag="Figma 1242:22104"
      parts={[
        { number: 1, name: "Indicator list", api: ".tds-stepper", detail: "Ordered list of steps — horizontal or vertical direction modifier." },
        { number: 2, name: "Step item", api: ".tds-stepper__item", detail: "Individual step with incomplete, current, completed, or error state." },
      ]}
    >
      <ol className="tds-stepper tds-stepper--horizontal" style={{ maxWidth: 420 }}>
        <li className="tds-stepper__item tds-stepper__item--completed">
          <span className="tds-stepper__label">Business info</span>
        </li>
        <li className="tds-stepper__item tds-stepper__item--current">
          <span className="tds-stepper__label">Verification</span>
        </li>
        <li className="tds-stepper__item">
          <span className="tds-stepper__label">Review</span>
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
