import { ChapterHeader } from "./ChapterHeader";

const REDIRECTS = [
  { from: "#buttons", to: "#/components/buttons" },
  { from: "#inputs", to: "#/components/inputs" },
  { from: "#controls", to: "#/components/controls" },
  { from: "#tags", to: "#/components/tags" },
  { from: "#navigation", to: "#/components/navigation" },
  { from: "#disclosure", to: "#/components/disclosure" },
  { from: "#data", to: "#/components/data" },
  { from: "#typography", to: "#/foundations/typography" },
  { from: "#tokens", to: "#/foundations/tokens" },
  { from: "#tracker", to: "#/getting-started/tracker" },
];

export function MigrationPanel() {
  return (
    <div className="tds-preview__panel is-active" role="tabpanel">
      <ChapterHeader
        eyebrow="Getting Started"
        title="Migration Guide"
        desc="Moving from the classic flat-tab preview to the three-section Salesforce-style layout."
      />

      <div className="tds-preview__migration">
        <section className="tds-preview__migration-section">
          <h2>Navigation restructure</h2>
          <p>
            The preview now uses three top-level sections. Typography and Design Tokens moved to{" "}
            <strong>Foundations</strong>. All component families live under <strong>Components</strong>{" "}
            as a flat A–Z list. Overview, tracker, and this guide sit under <strong>Getting Started</strong>.
          </p>
        </section>

        <section className="tds-preview__migration-section">
          <h2>URL redirects</h2>
          <p>Legacy hash links are automatically redirected on load:</p>
          <div className="tds-preview__section-card">
            <div className="tds-preview__redirect-table-wrap">
              <table className="tds-preview__props-table">
              <thead>
                <tr>
                  <th scope="col">Old URL</th>
                  <th scope="col">New URL</th>
                </tr>
              </thead>
              <tbody>
                {REDIRECTS.map((r) => (
                  <tr key={r.from}>
                    <td>
                      <code>{r.from}</code>
                    </td>
                    <td>
                      <code>{r.to}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </section>

        <section className="tds-preview__migration-section">
          <h2>Splitting compound pages</h2>
          <p>
            Chapters like <em>Buttons</em> and <em>Inputs</em> still contain multiple related components
            (Button, IconButton, TextInput, Select, etc.). Each chapter now uses a consistent page template:
          </p>
          <ul className="tds-preview__migration-list">
            <li><strong>Guidelines</strong>: when and how to use the component</li>
            <li><strong>Design</strong>: sizes, states, positions, and configurations</li>
            <li><strong>Accessibility</strong>: keyboard, focus, and ARIA guidance</li>
            <li><strong>Change Log</strong>: version history (placeholder)</li>
            <li><strong>Props</strong> and <strong>Code</strong>: developer reference tabs</li>
          </ul>
          <p>
            Future work: split each sub-component into its own route (e.g.{" "}
            <code>#/components/button</code>, <code>#/components/icon-button</code>) using the component
            tracker as the source of truth.
          </p>
        </section>

        <section className="tds-preview__migration-section">
          <h2>Link updates</h2>
          <ul className="tds-preview__migration-list">
            <li>
              Update internal links from <code>#tab-id</code> to <code>#/section/page</code> format.
            </li>
            <li>
              Classic HTML preview at <code>pages/preview/index.html</code> remains unchanged for authoring.
            </li>
            <li>
              React preview is the canonical docs experience at <code>react-dist/index.html</code>.
            </li>
            <li>
              Search (<kbd>⌘K</kbd>) indexes pages, showcases, and tracker components.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
