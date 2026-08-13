import { COMPONENT_TRACKER } from "../../data/tracker";
import { ChapterHeader } from "../ChapterHeader";
import { InventoryStats } from "./InventoryStats";
import { InventoryTable } from "./InventoryTable";
import { AdoptionBreakdown } from "./AdoptionBreakdown";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function TrackerPanel() {
  const { summary, pages, components, planned, lastBuiltAt, warnings } = COMPONENT_TRACKER;

  return (
    <div className="tds-preview__panel is-active" role="tabpanel" id="tracker">
      <ChapterHeader
        eyebrow="Build progress"
        title="Component tracker"
        desc={`Full component inventory, build status, and DS adoption across ${pages.length} demo pages. Last updated ${formatDate(lastBuiltAt)}.`}
      />

      <InventoryStats
        summary={summary}
        plannedCount={planned.length}
        plannedHighCount={planned.filter((p) => p.priority === "High").length}
      />

      <AdoptionBreakdown pages={pages} summary={summary} />

      <InventoryTable components={components} planned={planned} pages={pages} />

      {warnings.length > 0 && (
        <aside className="tds-preview__tracker-warnings" aria-label="Tracker warnings">
          <h3 className="tds-preview__tracker-showcase__title">Build warnings</h3>
          <ul>
            {warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
