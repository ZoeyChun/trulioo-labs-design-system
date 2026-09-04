import { CodeBlock } from "../CodeBlock";
import { CodeSection, ComponentCodeLayout, PropsTable } from "./CodePageLayout";

type CodePageProps = { basePath: string };

export function AccordionCode({ basePath }: CodePageProps) {
  return (
    <ComponentCodeLayout
      basePath={basePath}
      navItems={[
        { id: "install", label: "Install" },
        { id: "base", label: "Base class" },
      ]}
    >
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/accordion/accordion.css';`} />
        <CodeBlock
          code={`<div class="tds-accordion tds-accordion--expanded">\n  <button type="button" class="tds-accordion__header" aria-expanded="true">\n    <span class="tds-accordion__leading">\n      <span class="tds-accordion__title-group">\n        <span class="tds-accordion__title">Section title</span>\n        <span class="tds-accordion__subtext">Optional description</span>\n      </span>\n    </span>\n  </button>\n  <div class="tds-accordion__content">Content</div>\n</div>`}
        />
      </CodeSection>
      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Accordion classes"
          props={[
            { name: ".tds-accordion", description: "Bordered expandable container.", type: "<div>", required: true },
            { name: ".tds-accordion__header", description: "Trigger button with aria-expanded.", type: "<button>" },
            { name: ".tds-accordion__title-group", description: "Stacks title and optional subtext (4px gap).", type: "<span>" },
            { name: ".tds-accordion__title", description: "Primary heading — scales by size modifier.", type: "<span>" },
            { name: ".tds-accordion__subtext", description: "Optional description below the title.", type: "<span>" },
            { name: ".tds-accordion__content", description: "Collapsible content region.", type: "<div>" },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}
