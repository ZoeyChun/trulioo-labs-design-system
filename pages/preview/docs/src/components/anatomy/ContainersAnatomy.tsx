import { AnatomyPinLayer } from "./AnatomyPinLayer";
import { ComponentAnatomyCard } from "./ComponentAnatomyCard";

export function AccordionAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Expandable panel with clickable header and collapsible content region."
      api=".tds-accordion · __header · __content"
      tag="Figma 810:5659"
      parts={[
        { number: 1, name: "Accordion", api: ".tds-accordion", detail: "Bordered container. Add --expanded when content is visible." },
        { number: 2, name: "Header", api: ".tds-accordion__header", detail: "Button trigger with aria-expanded. Holds title and optional slots." },
        { number: 3, name: "Content", api: ".tds-accordion__content", detail: "Collapsible region revealed when expanded." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "right", selector: ".tds-accordion", anchor: { y: 0.35 } },
          { number: 2, direction: "top", selector: ".tds-accordion__header" },
          { number: 3, direction: "bottom", selector: ".tds-accordion__content" },
        ]}
      >
        <div className="tds-accordion tds-accordion--expanded" style={{ maxWidth: 360 }}>
          <button type="button" className="tds-accordion__header" aria-expanded="true">
            <span>Business documents</span>
          </button>
          <div className="tds-accordion__content">
            <p style={{ margin: 0, padding: "12px 16px", fontSize: 14 }}>Articles of incorporation, proof of address.</p>
          </div>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}
