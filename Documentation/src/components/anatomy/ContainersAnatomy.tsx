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
        { number: 2, name: "Header", api: ".tds-accordion__header", detail: "Button trigger with aria-expanded. Holds title group and optional slots." },
        { number: 3, name: "Title group", api: ".tds-accordion__title-group", detail: "Stacks title and optional subtext below it." },
        { number: 4, name: "Content", api: ".tds-accordion__content", detail: "Collapsible region revealed when expanded." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "right", selector: ".tds-accordion", anchor: { y: 0.35 } },
          { number: 2, direction: "top", selector: ".tds-accordion__header" },
          { number: 3, direction: "left", selector: ".tds-accordion__title-group" },
          { number: 4, direction: "bottom", selector: ".tds-accordion__content" },
        ]}
      >
        <div className="tds-accordion tds-accordion--expanded" style={{ maxWidth: 360 }}>
          <button type="button" className="tds-accordion__header" aria-expanded="true">
            <span className="tds-accordion__leading">
              <span className="tds-accordion__title-group">
                <span className="tds-accordion__title">Business documents</span>
                <span className="tds-accordion__subtext">Required for verification</span>
              </span>
            </span>
          </button>
          <div className="tds-accordion__content">
            <p className="tds-accordion__body">Articles of incorporation, proof of address.</p>
          </div>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}
