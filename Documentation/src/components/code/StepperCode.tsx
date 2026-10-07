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

export function StepperCode({ basePath }: CodePageProps) {
  return (
    <ComponentCodeLayout
      basePath={basePath}
      navItems={[
        { id: "install", label: "Install" },
        { id: "base", label: "Base class" },
      ]}
    >
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/stepper/stepper.css';`} />
        <CodeBlock
          code={`<ol class="tds-stepper tds-stepper--horizontal">\n  <li class="tds-stepper__item tds-stepper__item--current">Step</li>\n</ol>`}
        />
      </CodeSection>
      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Stepper classes"
          props={[
            { name: ".tds-stepper", description: "Step list container.", type: "<ol>", required: true },
            { name: ".tds-stepper__item", description: "Individual step with state modifiers.", type: "<li>" },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function StepProgressCode({ basePath }: CodePageProps) {
  return figmaOnlyCode("step-progress", basePath);
}

export function ListedProgressItemCode({ basePath }: CodePageProps) {
  return figmaOnlyCode("listed-progress-item", basePath);
}
