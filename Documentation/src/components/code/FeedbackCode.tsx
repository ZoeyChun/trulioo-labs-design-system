import { CodeBlock } from "../CodeBlock";
import { CodeSection, ComponentCodeLayout, PropsTable } from "./CodePageLayout";

type CodePageProps = { basePath: string };

function atomCode(
  cssFile: string,
  componentName: string,
  props: { name: string; description: string; type: string; required?: boolean; default?: string }[],
  example: string,
  basePath: string,
) {
  return (
    <ComponentCodeLayout
      basePath={basePath}
      navItems={[
        { id: "install", label: "Install" },
        { id: "base", label: "Base class" },
      ]}
    >
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/${cssFile}';`} />
        <CodeBlock code={example} />
      </CodeSection>
      <CodeSection title="Base class" id="base">
        <PropsTable title={`${componentName} classes`} props={props} />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function TooltipCode({ basePath }: CodePageProps) {
  return atomCode(
    "tooltip/tooltip.css",
    "Tooltip",
    [
      { name: ".tds-tooltip", description: "Tooltip container with theme and placement modifiers.", type: "<div>", required: true },
      { name: ".tds-tooltip__body", description: "Padded content surface.", type: "<div>" },
      { name: ".tds-tooltip__caret", description: "Directional pointer.", type: "<span>" },
    ],
    `<div class="tds-tooltip tds-tooltip--dark tds-tooltip--bottom" role="tooltip">\n  <div class="tds-tooltip__body">\n    <p class="tds-tooltip__text">Download report</p>\n  </div>\n  <span class="tds-tooltip__caret" aria-hidden="true"></span>\n</div>`,
    basePath,
  );
}

export function AnnouncementCode({ basePath }: CodePageProps) {
  return atomCode(
    "announcement/announcement.css",
    "Announcement",
    [
      { name: ".tds-announcement", description: "Banner container with semantic variant.", type: "<div>", required: true },
      { name: ".tds-announcement__title", description: "Primary headline.", type: "<p>" },
      { name: ".tds-announcement__dismiss", description: "Dismiss button — requires aria-label.", type: "<button>" },
    ],
    `<div class="tds-announcement tds-announcement--info">\n  <p class="tds-announcement__title">Title</p>\n  <button type="button" class="tds-announcement__dismiss" aria-label="Dismiss">×</button>\n</div>`,
    basePath,
  );
}

export function DialogCode({ basePath }: CodePageProps) {
  return (
    <ComponentCodeLayout
      basePath={basePath}
      navItems={[
        { id: "install", label: "Install" },
        { id: "base", label: "Base class" },
        { id: "sizes", label: "Sizes" },
        { id: "positions", label: "Positions" },
      ]}
    >
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/dialog/dialog.css';`} />
      </CodeSection>
      <CodeSection title="Base class" id="base">
        <PropsTable
          title="Dialog classes"
          props={[
            { name: ".tds-dialog", description: "Fixed overlay root with backdrop + panel.", type: "<div>", required: true },
            { name: ".tds-dialog__backdrop", description: "Semi-transparent overlay; positions the panel.", type: "<div>" },
            { name: ".tds-dialog__panel", description: "White surface with elevation-xl shadow.", type: "<div>" },
            { name: ".tds-dialog__header", description: "Title row with optional badge and trailing actions.", type: "<header>" },
            { name: ".tds-dialog__body", description: "Scrollable content area.", type: "<div>" },
            { name: ".tds-dialog__footer", description: "Footer label/caption and up to three buttons.", type: "<footer>" },
          ]}
        />
        <CodeBlock
          code={`<div class="tds-dialog tds-dialog--center tds-dialog--md">
  <div class="tds-dialog__backdrop">
    <div class="tds-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <header class="tds-dialog__header">…</header>
      <div class="tds-dialog__body">…</div>
      <footer class="tds-dialog__footer">…</footer>
    </div>
  </div>
</div>`}
        />
      </CodeSection>
      <CodeSection title="Sizes" id="sizes">
        <PropsTable
          title="Size modifiers"
          props={[
            { name: ".tds-dialog--sm", description: "320px centered modal.", type: "class" },
            { name: ".tds-dialog--md", description: "480px centered modal.", type: "class" },
            { name: ".tds-dialog--lg", description: "640px centered modal.", type: "class" },
            { name: ".tds-dialog--xl", description: "960px centered modal.", type: "class" },
            { name: ".tds-dialog--sm-portrait", description: "320px mobile portrait modal.", type: "class" },
            { name: ".tds-dialog--md-portrait", description: "480px mobile portrait modal.", type: "class" },
          ]}
        />
      </CodeSection>
      <CodeSection title="Positions" id="positions">
        <PropsTable
          title="Position modifiers"
          props={[
            { name: ".tds-dialog--center", description: "Centered modal with 24px viewport padding.", type: "class" },
            { name: ".tds-dialog--left", description: "Left drawer with 8px inset and rounded panel.", type: "class" },
            { name: ".tds-dialog--right", description: "Right drawer with 8px inset and rounded panel.", type: "class" },
            { name: ".tds-dialog--bottom", description: "Bottom sheet with 8px inset and rounded corners.", type: "class" },
            { name: ".tds-dialog--full", description: "Full-viewport takeover.", type: "class" },
            { name: ".tds-dialog--inline", description: "In-flow preview frame for docs/showcases.", type: "class" },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}
