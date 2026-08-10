import { CodeBlock } from "../CodeBlock";
import {
  CodeSection,
  ComponentCodeLayout,
  PropsTable,
} from "../code/CodePageLayout";
import { A11yGuide, A11yItem } from "../a11y/A11yGuide";
import { GuidelineSection } from "../guidelines/GuidelineDoDont";
import { findTrackerComponent } from "../../data/component-nav";
import { getComponentPageDescription } from "../../data/component-descriptions";
import type { ComponentPageId } from "../../data/navigation";

const FIGMA_FILE_KEY = "aMXWPoPQ94hxTKOhUngOih";

function cssImportPath(cssFile: string): string {
  return `@import 'trulioo-ds/Components/${cssFile}';`;
}

function figmaUrl(nodeId: string): string {
  const nodeParam = nodeId.replace(":", "-");
  return `https://www.figma.com/design/${FIGMA_FILE_KEY}/trulioo-labs-design-system?node-id=${nodeParam}`;
}

type FallbackProps = {
  componentId: ComponentPageId;
};

export function GenericComponentGuidelines({ componentId }: FallbackProps) {
  const tracker = findTrackerComponent(componentId);
  const label = tracker?.name ?? componentId;
  const description = getComponentPageDescription(componentId, label);

  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title={`About ${label}`}
        lead={<p>{description}</p>}
      >
        <div className="tds-preview__section-card">
          {tracker?.notes && (
            <p>
              <strong>Notes:</strong> {tracker.notes}
            </p>
          )}
          {tracker?.subComponents && (
            <p>
              <strong>Sub-components:</strong> {tracker.subComponents}
            </p>
          )}
          {tracker?.category && (
            <p>
              <strong>Category:</strong> {tracker.category}
            </p>
          )}
          {tracker?.cssStatus && tracker.cssStatus !== "Done" && (
            <p>
              <strong>CSS status:</strong> {tracker.cssStatus}
            </p>
          )}
          {tracker?.figmaNodeId && (
            <p>
              <a href={figmaUrl(tracker.figmaNodeId)} target="_blank" rel="noreferrer">
                View in Figma
              </a>
            </p>
          )}
        </div>
      </GuidelineSection>

      {tracker?.classPrefixes && tracker.classPrefixes.length > 0 && (
        <GuidelineSection
          title="CSS classes"
          lead={
            <p>
              Apply the base class and modifiers documented in the <strong>Code</strong> tab.
              See the <strong>Design</strong> tab for live variants when showcases are available.
            </p>
          }
        >
          <div className="tds-preview__section-card">
            <ul className="tds-preview__a11y-list">
              {tracker.classPrefixes.map((prefix) => (
                <li key={prefix}>
                  <code>{prefix}</code>
                </li>
              ))}
            </ul>
          </div>
        </GuidelineSection>
      )}
    </div>
  );
}

export function GenericComponentA11y({ componentId }: FallbackProps) {
  const tracker = findTrackerComponent(componentId);
  const label = tracker?.name ?? componentId;
  const classList =
    tracker?.classPrefixes && tracker.classPrefixes.length > 0
      ? tracker.classPrefixes.map((c) => `.${c}`).join(", ")
      : null;

  return (
    <A11yGuide>
      <A11yItem title="Keyboard">
        Interactive {label} elements should be reachable with <code>Tab</code> and activated with{" "}
        <code>Enter</code> or <code>Space</code> where appropriate. Dialog and menu patterns
        should support <code>Escape</code> to dismiss.
      </A11yItem>
      <A11yItem title="Focus visible">
        Components use <code>:focus-visible</code> with <code>--border-focus</code> (2px teal
        ring). Do not remove focus outlines in consuming apps.
      </A11yItem>
      <A11yItem title="Labels and roles">
        Provide visible text labels or <code>aria-label</code> for icon-only controls. Use
        semantic roles such as <code>role="dialog"</code>, <code>aria-expanded</code>, and{" "}
        <code>aria-selected</code> as required by the pattern.
        {classList && (
          <>
            {" "}
            Base classes: <code>{classList}</code>.
          </>
        )}
      </A11yItem>
      <A11yItem title="Color contrast">
        Text and interactive colors in {label} meet WCAG AA against{" "}
        <code>--surface-neutral-01</code> when using default token bindings.
      </A11yItem>
      <A11yItem title="Motion">
        Respect <code>prefers-reduced-motion</code> in consuming apps for transitions added
        outside the design system CSS.
      </A11yItem>
    </A11yGuide>
  );
}

type GenericCodeProps = FallbackProps & {
  basePath: string;
};

export function GenericComponentCode({ componentId, basePath }: GenericCodeProps) {
  const tracker = findTrackerComponent(componentId);
  const label = tracker?.name ?? componentId;
  const hasCss = Boolean(tracker?.cssFile);
  const navItems = hasCss
    ? [
        { id: "install", label: "Install" },
        { id: "base", label: "Base class" },
      ]
    : [{ id: "status", label: "Status" }];

  return (
    <ComponentCodeLayout basePath={basePath} navItems={navItems}>
      {hasCss && tracker?.cssFile ? (
        <>
          <CodeSection title="Install" id="install">
            <p className="tds-code-section__desc">
              Import the {label} stylesheet from the design system package.
            </p>
            <CodeBlock code={cssImportPath(tracker.cssFile)} />
          </CodeSection>

          <CodeSection title="Base class" id="base">
            {tracker.classPrefixes && tracker.classPrefixes.length > 0 ? (
              <PropsTable
                title="Class prefixes"
                description={`Apply these classes when building ${label} markup. See the Design tab for full examples.`}
                props={tracker.classPrefixes.map((prefix) => ({
                  name: `.${prefix}`,
                  description: `${label} class prefix. See Figma and preview demos for modifiers.`,
                  type: "class",
                  required: prefix === tracker.classPrefixes?.[0],
                }))}
              />
            ) : (
              <p className="tds-code-section__desc">
                Class prefixes for {label} are documented in Figma. Check the Design tab for
                extracted markup from preview demos.
              </p>
            )}
          </CodeSection>
        </>
      ) : (
        <CodeSection title="Status" id="status">
          <p className="tds-code-section__desc">
            {tracker?.cssStatus === "N/A"
              ? `${label} is an icon utility without standalone CSS — use Font Awesome classes directly.`
              : `${label} CSS is ${tracker?.cssStatus?.toLowerCase() ?? "not yet published"}. Refer to Figma for the intended markup structure.`}
          </p>
          {tracker?.figmaNodeId && (
            <p className="tds-code-section__desc">
              <a href={figmaUrl(tracker.figmaNodeId)} target="_blank" rel="noreferrer">
                Open {label} in Figma
              </a>
            </p>
          )}
        </CodeSection>
      )}
    </ComponentCodeLayout>
  );
}
