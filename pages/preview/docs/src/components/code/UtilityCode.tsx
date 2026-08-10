import { CodeBlock } from "../CodeBlock";
import { CodeSection, ComponentCodeLayout, PropsTable } from "./CodePageLayout";
import { findTrackerComponent } from "../../data/component-nav";

type CodePageProps = { basePath: string };

export function FontAwesomeIconCode({ basePath }: CodePageProps) {
  const tracker = findTrackerComponent("font-awesome-icon");
  const label = tracker?.name ?? "FontAwesome Icon";

  return (
    <ComponentCodeLayout basePath={basePath} navItems={[{ id: "status", label: "Status" }]}>
      <CodeSection title="Status" id="status">
        <p className="tds-code-section__desc">
          {label} is an icon utility without standalone CSS — use Font Awesome classes directly.
        </p>
        <CodeBlock code={`<span class="fa-solid fa-filter" aria-hidden="true"></span>`} />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function FilterButtonCode({ basePath }: CodePageProps) {
  return (
    <ComponentCodeLayout
      basePath={basePath}
      navItems={[
        { id: "install", label: "Install" },
        { id: "base", label: "Base class" },
      ]}
    >
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/filter-button/filter-button.css';`} />
        <CodeBlock
          code={`<div class="tds-filter-button">\n  <button type="button" class="tds-btn tds-btn--sm tds-btn--secondary" aria-expanded="false">\n    <span class="tds-filter-button__trigger-default">Filter</span>\n  </button>\n</div>`}
        />
      </CodeSection>
      <CodeSection title="Base class" id="base">
        <PropsTable
          title="FilterButton classes"
          props={[
            { name: ".tds-filter-button", description: "Filter trigger and panel wrapper.", type: "<div>", required: true },
            { name: ".tds-filter-button--selected", description: "Shows active filter value on trigger.", type: "CSS class" },
            { name: ".tds-filter-button__clear", description: "Clears all active filters.", type: "<button>" },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}

export function SortButtonCode({ basePath }: CodePageProps) {
  return (
    <ComponentCodeLayout
      basePath={basePath}
      navItems={[
        { id: "install", label: "Install" },
        { id: "base", label: "Base class" },
      ]}
    >
      <CodeSection title="Install" id="install">
        <CodeBlock code={`@import 'trulioo-ds/Components/data-table/sort-button/sort-button.css';`} />
        <CodeBlock
          code={`<div class="tds-sort-button">\n  <button type="button" class="tds-btn tds-btn--sm tds-btn--secondary" aria-expanded="false">\n    <span class="tds-sort-button__trigger-default">Sort</span>\n  </button>\n</div>`}
        />
      </CodeSection>
      <CodeSection title="Base class" id="base">
        <PropsTable
          title="SortButton classes"
          props={[
            { name: ".tds-sort-button", description: "Sort trigger and panel wrapper.", type: "<div>", required: true },
            { name: ".tds-sort-button--selected", description: "Shows active sort on trigger.", type: "CSS class" },
            { name: ".tds-sort-button__clear", description: "Resets sort selection.", type: "<button>" },
          ]}
        />
      </CodeSection>
    </ComponentCodeLayout>
  );
}
