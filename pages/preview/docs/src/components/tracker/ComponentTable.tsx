import { useMemo, useState } from "react";
import type { TrackerComponent } from "../../data/tracker";
import { TrackerShowcase } from "./TrackerShowcase";

type ComponentTableProps = {
  components: TrackerComponent[];
};

type StatusFilter = "all" | "Done" | "Partial" | "Not Started" | "Missing" | "N/A";

function StatusPill({ status }: { status: string }) {
  const slug = status.toLowerCase().replace(/\s+/g, "-");
  return (
    <span className={`tds-preview__tracker-pill tds-preview__tracker-pill--${slug}`}>{status}</span>
  );
}

function UsageCell({ used }: { used: boolean }) {
  return (
    <span
      className={`tds-preview__tracker-use${used ? " is-yes" : ""}`}
      aria-label={used ? "Used" : "Not used"}
    >
      <span className="tds-preview__tracker-use-dot" aria-hidden="true" />
      {used ? "Used" : "—"}
    </span>
  );
}

export function ComponentTable({ components }: ComponentTableProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return components.filter((component) => {
      const matchesQuery =
        !q ||
        component.name.toLowerCase().includes(q) ||
        component.category.toLowerCase().includes(q) ||
        component.cssFile?.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "all" ||
        component.cssStatus === statusFilter ||
        component.figmaStatus === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [components, query, statusFilter]);

  const filters = (
    <div className="tds-preview__tracker-filters">
      <input
        type="search"
        className="tds-preview__tracker-search"
        placeholder="Search components..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Search components"
      />
      <select
        className="tds-preview__tracker-select"
        value={statusFilter}
        onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
        aria-label="Filter by status"
      >
        <option value="all">All statuses</option>
        <option value="Done">CSS Done</option>
        <option value="Partial">Partial</option>
        <option value="Not Started">Not started</option>
        <option value="Missing">Missing</option>
        <option value="N/A">N/A</option>
      </select>
    </div>
  );

  return (
    <TrackerShowcase
      title="Built components"
      desc={`${components.length} components in the library with Figma, CSS, and page adoption status.`}
      actions={filters}
    >
      <div className="tds-preview__tracker-canvas">
        <div className="tds-preview__tracker-table-wrap">
          <table className="tds-preview__tracker-table">
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">Category</th>
                <th scope="col">Figma</th>
                <th scope="col">CSS</th>
                <th scope="col">Preview</th>
                <th scope="col">BV</th>
                <th scope="col">DV</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((component) => (
                <tr key={component.id}>
                  <th scope="row">
                    <span className="tds-preview__tracker-name">{component.name}</span>
                    {component.cssFile && (
                      <code className="tds-preview__tracker-file">{component.cssFile}</code>
                    )}
                  </th>
                  <td>{component.category}</td>
                  <td>
                    <StatusPill status={component.figmaStatus} />
                  </td>
                  <td>
                    <StatusPill status={component.cssStatus} />
                  </td>
                  <td>
                    <UsageCell used={component.usedInPreview} />
                  </td>
                  <td>
                    <UsageCell used={component.usedInBV} />
                  </td>
                  <td>
                    <UsageCell used={component.usedInDV} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="tds-preview__tracker-table-meta">
        Showing {filtered.length} of {components.length} components
      </p>
    </TrackerShowcase>
  );
}
