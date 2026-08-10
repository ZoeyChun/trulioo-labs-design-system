import { CodeBlock } from "../CodeBlock";
import { CodeSection, ComponentCodeLayout, PropsTable } from "./CodePageLayout";
import { findTrackerComponent } from "../../data/component-nav";
import type { ComponentPageId } from "../../data/navigation";

type CodePageProps = { basePath: string };

function figmaOnlyCode(componentId: ComponentPageId, basePath: string) {
  const tracker = findTrackerComponent(componentId);
  const label = tracker?.name ?? componentId;

  return (
    <ComponentCodeLayout basePath={basePath} navItems={[{ id: "status", label: "Status" }]}>
      <CodeSection title="Status" id="status">
        <p className="tds-code-section__desc">
          {label} CSS is {tracker?.cssStatus?.toLowerCase() ?? "not yet published"}. Refer to Figma
          for the intended markup structure.
        </p>
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function ScoreGaugeCode({ basePath }: CodePageProps) {
  return (
    <ComponentCodeLayout
      basePath={basePath}
      navItems={[
        { id: "install", label: "Install" },
        { id: "base", label: "Base class" },
      ]}
    >
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/score-gauge/score-gauge.css';`} />
        <CodeBlock
          code={`<div class="score-gauge">\n  <svg class="score-gauge__chart"><!-- arc --></svg>\n  <div class="score-gauge__center">\n    <span class="score-gauge__value">72</span>\n  </div>\n</div>`}
        />
      </CodeSection>
      <CodeSection title="Base class" id="base">
        <PropsTable
          title="ScoreGauge classes"
          props={[
            { name: ".score-gauge", description: "Fixed-size gauge canvas.", type: "<div>", required: true },
            { name: ".score-gauge__chart", description: "SVG arc element.", type: "<svg>" },
            { name: ".score-gauge__center", description: "Centered score and badge stack.", type: "<div>" },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function ScoreCardCode({ basePath }: CodePageProps) {
  return figmaOnlyCode("score-card", basePath);
}

export function RiskCategoryCardCode({ basePath }: CodePageProps) {
  return (
    <ComponentCodeLayout
      basePath={basePath}
      navItems={[
        { id: "install", label: "Install" },
        { id: "base", label: "Base class" },
      ]}
    >
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/risk-category-card/risk-category-card.css';`} />
        <CodeBlock
          code={`<div class="tds-risk-category-card">\n  <div class="tds-risk-category-card__title-row">\n    <p class="tds-risk-category-card__title">Category</p>\n  </div>\n</div>`}
        />
      </CodeSection>
      <CodeSection title="Base class" id="base">
        <PropsTable
          title="RiskCategoryCard classes"
          props={[
            { name: ".tds-risk-category-card", description: "Category summary card.", type: "<div>", required: true },
            { name: ".tds-risk-category-card__title-row", description: "Title and risk tag row.", type: "<div>" },
            { name: ".tds-risk-category-card__details-row", description: "Signals and score row.", type: "<div>" },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}
