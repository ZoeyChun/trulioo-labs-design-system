import { useEffect, useMemo, useRef, useState } from "react";
import type { TrackerComponent, TrackerPage, TrackerPlanned } from "../../data/tracker";
import { TrackerShowcase } from "./TrackerShowcase";
import { JiraTicketsTable } from "./JiraTicketsTable";

type InventoryTableProps = {
  components: TrackerComponent[];
  planned: TrackerPlanned[];
  pages: TrackerPage[];
};

type LifecycleFilter = "all" | "Done" | "In Progress" | "Not Started" | "Planned";
type PriorityFilter = "all" | "High" | "Medium" | "Low";

const LIFECYCLE_FILTER_OPTIONS: { value: LifecycleFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "Done", label: "Done" },
  { value: "In Progress", label: "In progress" },
  { value: "Not Started", label: "Not started" },
  { value: "Planned", label: "Planned" },
];

const PRIORITY_FILTER_OPTIONS: { value: PriorityFilter; label: string }[] = [
  { value: "all", label: "All priorities" },
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
];

type FilterTabsProps<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
};

function FilterTabs<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: FilterTabsProps<T>) {
  return (
    <div className="tds-filter-tabs tds-preview__tracker-filter-tabs" role="tablist" aria-label={ariaLabel}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            className={`tds-filter-tab${selected ? " tds-filter-tab--selected" : ""}`}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

const selectCaret = (
  <span className="tds-caret tds-caret--default" aria-hidden="true">
    <svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z"
        fill="currentColor"
      />
      <path
        d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z"
        fill="currentColor"
      />
    </svg>
  </span>
);

function PrioritySelect({
  value,
  onChange,
}: {
  value: PriorityFilter;
  onChange: (value: PriorityFilter) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedLabel =
    PRIORITY_FILTER_OPTIONS.find((option) => option.value === value)?.label ?? "All priorities";

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`tds-select tds-preview__tracker-priority-select${open ? " tds-select--open" : ""}`}
    >
      <label className="tds-field-label" id="tracker-priority-label">
        Priority
      </label>
      <button
        type="button"
        className="tds-select__trigger tds-select__trigger--md"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby="tracker-priority-label"
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <span className={`tds-select__value${value === "all" ? " tds-select__placeholder" : ""}`}>
          {selectedLabel}
        </span>
        <div className="tds-select__trailing-group">{selectCaret}</div>
      </button>
      <div className="tds-select__menu" role="listbox" aria-labelledby="tracker-priority-label" hidden={!open}>
        <div className="tds-dropdown-panel">
          {PRIORITY_FILTER_OPTIONS.map((option) => {
            const selected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                className={`tds-action-list-item${selected ? " tds-action-list-item--selected" : ""}`}
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span className="tds-action-list-item__label">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type UnifiedRow = {
  id: string;
  name: string;
  category: string;
  lifecycle: "Done" | "In Progress" | "Not Started" | "Planned";
  priority?: string;
  figmaStatus?: string;
  cssStatus?: string;
  cssFile?: string;
  dependsOn?: string;
  pagesUsed: number;
  pagesTotal: number;
  isPlanned: boolean;
};

function getLifecycle(component: TrackerComponent): UnifiedRow["lifecycle"] {
  if (component.cssStatus === "Done") return "Done";
  if (component.cssStatus === "Partial") return "In Progress";
  return "Not Started";
}

function buildUnifiedRows(
  components: TrackerComponent[],
  planned: TrackerPlanned[],
  pages: TrackerPage[],
): UnifiedRow[] {
  const builtRows: UnifiedRow[] = components.map((c) => {
    const pagesUsed = Object.values(c.usedInPages).filter(Boolean).length;
    return {
      id: c.id,
      name: c.name,
      category: c.category,
      lifecycle: getLifecycle(c),
      figmaStatus: c.figmaStatus,
      cssStatus: c.cssStatus,
      cssFile: c.cssFile,
      pagesUsed,
      pagesTotal: pages.length,
      isPlanned: false,
    };
  });

  const plannedRows: UnifiedRow[] = planned.map((p) => ({
    id: `planned-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name: p.name,
    category: p.category,
    lifecycle: "Planned",
    priority: p.priority,
    dependsOn: p.dependsOn,
    pagesUsed: 0,
    pagesTotal: pages.length,
    isPlanned: true,
  }));

  return [...builtRows, ...plannedRows];
}

function LifecyclePill({ lifecycle }: { lifecycle: UnifiedRow["lifecycle"] }) {
  const classMap: Record<string, string> = {
    Done: "tds-preview__tracker-pill--done",
    "In Progress": "tds-preview__tracker-pill--partial",
    "Not Started": "tds-preview__tracker-pill--not-started",
    Planned: "tds-preview__tracker-pill--planned",
  };
  return (
    <span className={`tds-preview__tracker-pill ${classMap[lifecycle] || ""}`}>
      {lifecycle}
    </span>
  );
}

function PriorityPill({ priority }: { priority: string }) {
  const slug = priority.toLowerCase();
  return (
    <span className={`tds-preview__tracker-priority tds-preview__tracker-priority--${slug}`}>
      {priority}
    </span>
  );
}

function StatusPill({ status }: { status: string }) {
  const slug = status.toLowerCase().replace(/\s+/g, "-");
  return (
    <span className={`tds-preview__tracker-pill tds-preview__tracker-pill--${slug}`}>{status}</span>
  );
}

type InventoryTab = "inventory" | "jira";

function InventoryContent({ components, planned, pages }: InventoryTableProps) {
  const [query, setQuery] = useState("");
  const [lifecycleFilter, setLifecycleFilter] = useState<LifecycleFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");

  const allRows = useMemo(
    () => buildUnifiedRows(components, planned, pages),
    [components, planned, pages],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allRows.filter((row) => {
      const matchesQuery =
        !q ||
        row.name.toLowerCase().includes(q) ||
        row.category.toLowerCase().includes(q) ||
        row.cssFile?.toLowerCase().includes(q);
      const matchesLifecycle = lifecycleFilter === "all" || row.lifecycle === lifecycleFilter;
      const matchesPriority =
        priorityFilter === "all" || row.priority === priorityFilter;
      return matchesQuery && matchesLifecycle && matchesPriority;
    });
  }, [allRows, query, lifecycleFilter, priorityFilter]);

  const builtRows = filtered.filter((r) => !r.isPlanned);
  const plannedRows = filtered.filter((r) => r.isPlanned);
  const totalInventory = allRows.length;

  return (
    <>
      <div className="tds-preview__tracker-filters">
        <FilterTabs
          options={LIFECYCLE_FILTER_OPTIONS}
          value={lifecycleFilter}
          onChange={setLifecycleFilter}
          ariaLabel="Filter by lifecycle"
        />
        <div className="tds-preview__tracker-filters-tools">
          <input
            type="search"
            className="tds-preview__tracker-search"
            placeholder="Search components..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search components"
          />
          <PrioritySelect value={priorityFilter} onChange={setPriorityFilter} />
        </div>
      </div>

      <div className="tds-preview__tracker-canvas">
        <div className="tds-preview__tracker-table-wrap">
          <table className="tds-preview__tracker-table">
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">Category</th>
                <th scope="col">Lifecycle</th>
                <th scope="col">Priority</th>
                <th scope="col">Figma</th>
                <th scope="col">CSS</th>
                <th scope="col">Pages used</th>
              </tr>
            </thead>
            <tbody>
              {builtRows.length > 0 && (
                <tr className="tds-preview__tracker-group-row">
                  <td colSpan={7}>Built components ({builtRows.length})</td>
                </tr>
              )}
              {builtRows.map((row) => (
                <tr key={row.id}>
                  <th scope="row">
                    <span className="tds-preview__tracker-name">{row.name}</span>
                    {row.cssFile && (
                      <code className="tds-preview__tracker-file">{row.cssFile}</code>
                    )}
                  </th>
                  <td>{row.category}</td>
                  <td><LifecyclePill lifecycle={row.lifecycle} /></td>
                  <td></td>
                  <td>{row.figmaStatus && <StatusPill status={row.figmaStatus} />}</td>
                  <td>{row.cssStatus && <StatusPill status={row.cssStatus} />}</td>
                  <td>
                    <span className="tds-preview__tracker-pages-count">
                      <strong>{row.pagesUsed}</strong>
                      <span className="tds-preview__tracker-pages-total">/ {row.pagesTotal}</span>
                    </span>
                  </td>
                </tr>
              ))}
              {plannedRows.length > 0 && (
                <tr className="tds-preview__tracker-group-row">
                  <td colSpan={7}>Planned ({plannedRows.length})</td>
                </tr>
              )}
              {plannedRows.map((row) => (
                <tr key={row.id} className="tds-preview__tracker-row--planned">
                  <th scope="row">
                    <span className="tds-preview__tracker-name">{row.name}</span>
                    {row.dependsOn && (
                      <span className="tds-preview__tracker-depends">
                        Depends on: {row.dependsOn}
                      </span>
                    )}
                  </th>
                  <td>{row.category}</td>
                  <td><LifecyclePill lifecycle={row.lifecycle} /></td>
                  <td>{row.priority && <PriorityPill priority={row.priority} />}</td>
                  <td></td>
                  <td></td>
                  <td>
                    <span className="tds-preview__tracker-pages-count tds-preview__tracker-pages-count--na">
                      --
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="tds-preview__tracker-table-meta">
        Showing {filtered.length} of {totalInventory} components
      </p>
    </>
  );
}

export function InventoryTable({ components, planned, pages }: InventoryTableProps) {
  const [activeTab, setActiveTab] = useState<InventoryTab>("inventory");

  const allRows = useMemo(
    () => buildUnifiedRows(components, planned, pages),
    [components, planned, pages],
  );

  const totalInventory = allRows.length;

  const tabBar = (
    <div className="tds-preview__tracker-inventory-tabs" role="tablist" aria-label="Inventory view">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "inventory"}
        className={`tds-preview__tracker-inventory-tab${activeTab === "inventory" ? " tds-preview__tracker-inventory-tab--active" : ""}`}
        onClick={() => setActiveTab("inventory")}
      >
        Inventory
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "jira"}
        className={`tds-preview__tracker-inventory-tab${activeTab === "jira" ? " tds-preview__tracker-inventory-tab--active" : ""}`}
        onClick={() => setActiveTab("jira")}
      >
        JIRA tickets
      </button>
    </div>
  );

  return (
    <TrackerShowcase
      title="Component inventory"
      desc={`${totalInventory} components across the full design system lifecycle.`}
      actions={tabBar}
    >
      {activeTab === "inventory" ? (
        <InventoryContent components={components} planned={planned} pages={pages} />
      ) : (
        <JiraTicketsTable />
      )}
    </TrackerShowcase>
  );
}
